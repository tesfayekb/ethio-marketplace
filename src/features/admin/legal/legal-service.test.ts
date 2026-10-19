import { expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { legalErrorKey, validDocument, versionStatus, type LegalVersion } from "./legal-service";
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

const versions: LegalVersion[] = [
  {
    version_id: "old",
    version: 1,
    status: "published",
    label: "old",
    material: false,
    effective_at: "2026-10-18T00:00:00Z",
    published_at: "2026-10-18T00:00:00Z",
    created_at: "2026-10-18T00:00:00Z",
  },
  {
    version_id: "current",
    version: 2,
    status: "published",
    label: "current",
    material: false,
    effective_at: "2026-10-19T00:00:00Z",
    published_at: "2026-10-19T00:00:00Z",
    created_at: "2026-10-19T00:00:00Z",
  },
  {
    version_id: "future",
    version: 3,
    status: "published",
    label: "future",
    material: true,
    effective_at: "2026-11-19T00:00:00Z",
    published_at: "2026-10-19T00:00:00Z",
    created_at: "2026-10-19T00:00:00Z",
  },
];
it("classifies an older published version as replaced from the full version list", () => {
  const row = versions.find((v) => v.version_id === "old");
  if (!row) throw new Error("missing old fixture");
  expect(versionStatus(row, versions, Date.parse("2026-10-19T08:09:00Z"))).toBe("replaced");
});
it("classifies the highest effective published version as in force", () => {
  const row = versions.find((v) => v.version_id === "current");
  if (!row) throw new Error("missing current fixture");
  expect(versionStatus(row, versions, Date.parse("2026-10-19T08:09:00Z"))).toBe("inForce");
});
it("keeps a future published version scheduled until its effective instant", () => {
  const row = versions.find((v) => v.version_id === "future");
  if (!row) throw new Error("missing future fixture");
  expect(versionStatus(row, versions, Date.parse("2026-10-19T08:09:00Z"))).toBe("scheduled");
});
