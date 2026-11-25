import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { roleRefusalKey } = await import("./roles-service");
const { TRANSLATION_REFUSALS } = await import("../translations/translations-service");
const { readRefusal } = await import("@/lib/refusal");
const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01" });
const tr = (code: string) => readRefusal(coded(code), TRANSLATION_REFUSALS).key;

/** INC-1280 (10a-2) — the roles' and translations' codes have words. */
describe("roles and translations words (INC-1280)", () => {
  it("RWR-U1 a role or a permission gone meanwhile", () => {
    expect(roleRefusalKey(coded("unknownRole"), "common.error")).toBe("admin.users.roles.unknown");
    expect(roleRefusalKey(coded("unknownPermission"), "common.error")).toBe(
      "admin.roles.error.unknownPermission",
    );
  });
  it("RWR-U2 a role code with no line draws the caller's generic", () => {
    expect(roleRefusalKey(coded("noSuchCode"), "common.error")).toBe("common.error");
  });
  it("RWR-U3 translations: a language, a text and a translation not on record", () => {
    expect(tr("badLanguage")).toBe("admin.translations.error.badLanguage");
    expect(tr("unknownKey")).toBe("admin.translations.error.unknownKey");
    expect(tr("unknownTranslation")).toBe("admin.translations.error.unknownTranslation");
  });
  it("RWR-U4 translations: an account and a length", () => {
    expect(tr("unknownUser")).toBe("admin.users.error.unknownUser");
    expect(tr("tooLong:context")).toBe("post.refusal.tooLong");
  });
});
