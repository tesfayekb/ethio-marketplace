import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { legalRefusalKey } = await import("./legal-service");
const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01" });

/** INC-1280 (10a-2, D45) — the legal doors' codes have words. */
describe("legal words (INC-1280)", () => {
  it("RWL-U1 a text over the limit", () => {
    expect(legalRefusalKey(coded("tooLong"))).toBe("admin.legal.error.tooLong");
  });
  it("RWL-U2 a value not taken, with or without its field", () => {
    expect(legalRefusalKey(coded("badValue:body"))).toBe("post.refusal.badValue");
    expect(legalRefusalKey(coded("badValue"))).toBe("post.refusal.badValue");
  });
  it("RWL-U3 an unpublished or unknown version, and an unknown account", () => {
    expect(legalRefusalKey(coded("notPublished"))).toBe("admin.legal.error.notPublished");
    expect(legalRefusalKey(coded("unknownVersion"))).toBe("admin.legal.error.unknownVersion");
    expect(legalRefusalKey(coded("unknownUser"))).toBe("admin.users.error.unknownUser");
  });
  it("RWL-U4 a code with no line still draws the family's generic (Export included)", () => {
    expect(legalRefusalKey(coded("noSuchCode"))).toBe("admin.legal.error.generic");
  });
});
