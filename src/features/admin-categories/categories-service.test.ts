import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

const door = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: door.rpc }));

import { ReaderError } from "@/lib/reader-failure";
import {
  createCategory,
  retireCategory,
  ROSTER_COLUMN_PRIORITIES,
  reactivateCategory,
} from "./categories-service";

describe("the categories doors' answers and arguments (F1-4a)", () => {
  it("CSD-1 a create answers the door's `{ ok: true, id }`; an answer without one is a failure, never a phantom id", async () => {
    door.rpc.mockResolvedValueOnce({ data: { ok: true, id: "c-1" }, error: null });
    await expect(
      createCategory({ nameEn: "Probe", icon: "Package", parentId: null, allowListings: true }),
    ).resolves.toBe("c-1");
    expect(door.rpc).toHaveBeenLastCalledWith("admin_create_category", {
      p_name_en: "Probe",
      p_icon: "Package",
      p_parent_id: null,
      p_allow_listings: true,
      p_price_enabled: true,
      p_expiry_days: null,
      p_visible_from: null,
      p_visible_until: null,
    });
    door.rpc.mockResolvedValueOnce({ data: { ok: true }, error: null });
    await expect(
      createCategory({ nameEn: "Probe", icon: "Package", parentId: null, allowListings: true }),
    ).rejects.toThrow("admin_create_category answered without an id");
  });

  it("CSD-2 a retire with nothing to move sends NULL; a refusal is the door's own error, typed (INC-1256)", async () => {
    door.rpc.mockResolvedValueOnce({ data: { ok: true }, error: null });
    await retireCategory({ id: "c-1", reassignTo: null });
    expect(door.rpc).toHaveBeenLastCalledWith("admin_retire_category", {
      p_id: "c-1",
      p_reassign_to: null,
    });
    const refusal = { message: "reassignRequired", code: "P0D01", details: "", hint: "" };
    door.rpc.mockResolvedValueOnce({ data: null, error: refusal });
    await expectTypedRefusal(retireCategory({ id: "c-1", reassignTo: null }), refusal);
  });
});

/**
 * C2-UI-FIX-5 / INC-139 — CONFORMANCE IS MACHINE-CHECKED. The roster may not
 * re-introduce per-column widths, a `cardUntil` override or a pinned column:
 * the primitive owns width behaviour for every console table (law C7), so the
 * consumer declares priorities and nothing else.
 */
const PAGE = readFileSync(
  path.join(process.cwd(), "src/features/admin-categories/categories-page.tsx"),
  "utf8",
);

describe("categories roster column contract", () => {
  it("declares priorities only — no minWidth anywhere in the roster", () => {
    expect(PAGE).not.toMatch(/minWidth/);
  });

  it("uses the primitive's default card breakpoint and no pinned column", () => {
    expect(PAGE).not.toMatch(/cardUntil/);
    expect(PAGE).not.toMatch(/stickyFirstColumn/);
  });

  it("keeps the audit-shaped priority split", () => {
    expect(ROSTER_COLUMN_PRIORITIES).toEqual({
      name: "primary",
      status: "primary",
      flags: "primary",
      parent: "secondary",
      order: "detail",
      listings: "detail",
      exclusions: "detail",
    });
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

describe("a failed door call is the typed failure (INC-1256)", () => {
  it("RFT-U1 a failed reactivate rejects as a ReaderError with the database's code and message", async () => {
    const raw = { message: "duplicate key", code: "23505", details: "d", hint: "h" };
    door.rpc.mockResolvedValueOnce({ data: null, error: raw });
    await expectTypedRefusal(reactivateCategory({ id: "c-1" }), raw);
  });
});
