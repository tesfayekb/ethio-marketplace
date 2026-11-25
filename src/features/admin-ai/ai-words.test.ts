import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { aiRefusalOf } = await import("./ai-refusals");
const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01" });

/** INC-1280 (10a-2, D56) — the feature door's on/off value has words. */
describe("AI feature words (INC-1280)", () => {
  it("RWA-U1 badValue:enabled, and an unplaced code's generic", () => {
    expect(aiRefusalOf(coded("badValue:enabled")).key).toBe("admin.ai.error.badEnabled");
    expect(aiRefusalOf(coded("noSuchCode")).key).toBe("admin.ai.error.unknown");
  });
});
