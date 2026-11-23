import { describe, expect, it, vi } from "vitest";

const door = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: door.rpc }));

const client = vi.hoisted(() => ({ rpc: vi.fn(), list: vi.fn(), remove: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    rpc: client.rpc,
    storage: { from: () => ({ list: client.list, remove: client.remove }) },
  },
}));

import { ReaderError, readerFailure } from "@/lib/reader-failure";
import {
  acceptCategoryImage,
  loadCategoryImages,
  pruneStaleAssets,
} from "./category-images-service";

describe("the picture accept door's answer (F1-4a)", () => {
  it("CIS-1 an accept answers the door's stamp; a refusal is the door's own error; no stamp is a failure", async () => {
    door.rpc.mockResolvedValueOnce({
      data: { ok: true, accepted_at: "2026-11-15T03:00:00+00:00" },
      error: null,
    });
    await expect(acceptCategoryImage("c-1")).resolves.toBe("2026-11-15T03:00:00+00:00");
    expect(door.rpc).toHaveBeenLastCalledWith("admin_accept_category_image", { p_id: "c-1" });
    const refusal = { message: "acceptNoImage", code: "P0D01", details: "", hint: "" };
    door.rpc.mockResolvedValueOnce({ data: null, error: refusal });
    await expect(acceptCategoryImage("c-1")).rejects.toBe(refusal);
    door.rpc.mockResolvedValueOnce({ data: { ok: true }, error: null });
    await expect(acceptCategoryImage("c-1")).rejects.toThrow(
      "admin_accept_category_image answered without a stamp",
    );
  });
});

describe("the stored assets' read fails as one typed failure (DEC-429)", () => {
  it("CIS-2 a refused admin_get_category_images is a ReaderError classed by the door's mark", async () => {
    for (const [error, failureClass] of [
      [{ message: "permissionDenied", code: "P0D01", status: 403 }, "refused"],
      [{ message: "notSignedIn", code: "P0D01", status: 401 }, "auth"],
    ] as const) {
      client.rpc.mockResolvedValueOnce({ data: null, error });
      const thrown = await loadCategoryImages("c-1").catch((caught: unknown) => caught);
      expect(thrown).toBeInstanceOf(ReaderError);
      expect(readerFailure(thrown)).toMatchObject({ class: failureClass, message: error.message });
    }
  });
});

describe("the prune of older asset sets throws nothing (DEC-429)", () => {
  const storage = { list: client.list, remove: client.remove };
  const keep = new Set(["card.webp", "thumb.webp", "og.webp"]);

  it("CIS-3 a failed list or a failed remove writes the prune's one log line and ends; a good prune removes only the stale names", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      client.list.mockResolvedValueOnce({ data: null, error: { message: "list down" } });
      await expect(pruneStaleAssets(storage, "cat-1", keep)).resolves.toBeUndefined();
      expect(client.remove).not.toHaveBeenCalled();
      client.list.mockResolvedValueOnce({
        data: [{ name: "card.webp" }, { name: "old.webp" }],
        error: null,
      });
      client.remove.mockResolvedValueOnce({ data: null, error: { message: "remove down" } });
      await expect(pruneStaleAssets(storage, "cat-1", keep)).resolves.toBeUndefined();
      expect(client.remove).toHaveBeenLastCalledWith(["cat-1/old.webp"]);
      client.list.mockRejectedValueOnce(new Error("offline"));
      await expect(pruneStaleAssets(storage, "cat-1", keep)).resolves.toBeUndefined();
      expect(logged.mock.calls.map(([line]) => line)).toEqual([
        "[category-images] image_prune_failed list down",
        "[category-images] image_prune_failed remove down",
        "[category-images] image_prune_failed offline",
      ]);
      // Nothing stale: no remove call at all.
      client.remove.mockClear();
      client.list.mockResolvedValueOnce({ data: [{ name: "card.webp" }], error: null });
      await pruneStaleAssets(storage, "cat-1", keep);
      expect(client.remove).not.toHaveBeenCalled();
    } finally {
      logged.mockRestore();
    }
  });
});
