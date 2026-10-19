import { expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { legalErrorKey, validDocument } from "./legal-service";
it.each([
  "labelRequired",
  "labelTaken",
  "bothLanguages",
  "changelogRequired",
  "noticeTooShort",
  "notDraft",
])("maps refusal %s", (message) => {
  expect(legalErrorKey({ message })).toBe(`admin.legal.error.${message}`);
});
it("maps all other failures to the generic sentence", () => {
  expect(legalErrorKey({ message: "permission denied" })).toBe("admin.legal.error.generic");
  expect(legalErrorKey({ message: "constructor" })).toBe("admin.legal.error.generic");
});
it("validates kind and optional uppercase country", () => {
  expect(validDocument("terms")).toBe(true);
  expect(validDocument("privacy", "ET")).toBe(true);
  expect(validDocument("publishing")).toBe(true);
  expect(validDocument("e2e-one", "US")).toBe(true);
  expect(validDocument("constructor")).toBe(false);
  expect(validDocument("terms", "et")).toBe(false);
  expect(validDocument("e2e-")).toBe(false);
});
