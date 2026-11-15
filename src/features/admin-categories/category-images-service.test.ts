import { describe, expect, it, vi } from "vitest";

const door = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: door.rpc }));

import { acceptCategoryImage } from "./category-images-service";

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
