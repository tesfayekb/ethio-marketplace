import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { undoErrorKey } = await import("./undo-edit");

/** INC-1280 (10a-2, D33) — the undo door's codes have words. */
describe("undo words (INC-1280)", () => {
  it("RWX-U1 a removed photo is final; a gone listing; an unplaced code", () => {
    expect(undoErrorKey("photoRemovalFinal")).toBe("admin.listings.undo.photoFinal");
    expect(undoErrorKey("listingNotFound")).toBe("admin.listings.move.error.notFound");
    expect(undoErrorKey("noSuchCode")).toBe("common.error");
  });
});
