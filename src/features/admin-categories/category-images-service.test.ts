import { describe, expect, it, vi } from "vitest";

const door = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: door.rpc }));

const route = vi.hoisted(() => ({ callRoute: vi.fn() }));
vi.mock("@/lib/route-client", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/route-client")>()),
  callRoute: route.callRoute,
}));

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
  CategoryImageError,
  generateCategoryImage,
  loadCategoryImages,
  pruneStaleAssets,
} from "./category-images-service";

describe("the picture accept door's answer (F1-4a)", () => {
  it("CIS-1 an accept answers the door's stamp; a refusal is the door's own error, typed (INC-1256); no stamp is a failure", async () => {
    door.rpc.mockResolvedValueOnce({
      data: { ok: true, accepted_at: "2026-11-15T03:00:00+00:00" },
      error: null,
    });
    await expect(acceptCategoryImage("c-1")).resolves.toBe("2026-11-15T03:00:00+00:00");
    expect(door.rpc).toHaveBeenLastCalledWith("admin_accept_category_image", { p_id: "c-1" });
    const refusal = { message: "acceptNoImage", code: "P0D01", details: "", hint: "" };
    door.rpc.mockResolvedValueOnce({ data: null, error: refusal });
    await expectTypedRefusal(acceptCategoryImage("c-1"), refusal);
    door.rpc.mockResolvedValueOnce({ data: { ok: true }, error: null });
    await expect(acceptCategoryImage("c-1")).rejects.toThrow(
      "admin_accept_category_image answered without a stamp",
    );
  });
});

describe("an ended sign-in is the signed-out state (INC-1274)", () => {
  it("CIS-4 the no-session answer and a 401 are one 401 error for the failure line, never a step's failure", async () => {
    route.callRoute.mockResolvedValueOnce({ kind: "signedOut" });
    const none = await generateCategoryImage({ categoryId: "c-1" }).catch((e: unknown) => e);
    expect(none).toBeInstanceOf(CategoryImageError);
    expect(none).toMatchObject({ message: "notSignedIn", status: 401, stage: "auth" });
    route.callRoute.mockResolvedValueOnce({
      kind: "answered",
      status: 401,
      ok: false,
      payload: { error: "notSignedIn" },
      error: "notSignedIn",
      detail: null,
      headers: new Headers(),
      bytes: null,
    });
    const refused = await generateCategoryImage({ categoryId: "c-1" }).catch((e: unknown) => e);
    expect(refused).toMatchObject({ message: "notSignedIn", status: 401 });
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

/** INC-1256 — a refusal rejects as the typed failure, carrying the door's message and code. */
async function expectTypedRefusal(
  pending: Promise<unknown>,
  refusal: { message: string; code: string },
): Promise<void> {
  const thrown: unknown = await pending.then(
    () => null,
    (error: unknown) => error,
  );
  expect(thrown).toBeInstanceOf(ReaderError);
  expect(thrown).toMatchObject({
    message: refusal.message,
    code: refusal.code,
    failure: { code: refusal.code },
  });
}

describe("a failed accept is the typed failure (INC-1256)", () => {
  it("RFT-U2 a failed accept rejects as a ReaderError with the database's code and message", async () => {
    const raw = { message: "duplicate key", code: "23505", details: "d", hint: "h" };
    door.rpc.mockResolvedValueOnce({ data: null, error: raw });
    await expectTypedRefusal(acceptCategoryImage("c-1"), raw);
  });
});
