import { expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import {
  FACT_KEYS,
  legalErrorKey,
  legalErrorName,
  validDocument,
  versionStatus,
  type LegalVersion,
} from "./legal-service";
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
it("maps the publish fact refusals and reads the fact they name", () => {
  expect(legalErrorKey({ message: "unknownFact:nope_fact" })).toBe("admin.legal.error.unknownFact");
  expect(legalErrorKey({ message: "factMissing:legal_phone" })).toBe(
    "admin.legal.error.factMissing",
  );
  expect(legalErrorName({ message: "factMissing:legal_phone" })).toBe("legal_phone");
  expect(legalErrorName({ message: "notDraft" })).toBe("");
});
it("lists the 18 facts in order, without providers", () => {
  expect(FACT_KEYS).toEqual([
    "operator_name",
    "operator_details",
    "operator_address",
    "legal_email",
    "privacy_email",
    "security_email",
    "legal_phone",
    "governing_law",
    "copyright_agent",
    "liability_limit_usd",
    "notice_days",
    "response_days",
    "response_extra_days",
    "listed_ad_keep_months",
    "deleted_ad_keep_months",
    "dispute_keep_years",
    "account_keep_months",
    "technical_keep_months",
  ]);
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
