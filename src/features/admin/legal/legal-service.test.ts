import { expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { supabase } from "@/integrations/supabase/client";
import {
  FACT_KEYS,
  acceptancesCsv,
  exportLegalAcceptances,
  fillFacts,
  getLegalVersion,
  listLegalDocuments,
  legalErrorKey,
  legalErrorName,
  legalFileName,
  lineDiff,
  reviewState,
  validDocument,
  versionStatus,
  type AcceptanceExportRow,
  type LegalReview,
  type LegalVersion,
} from "./legal-service";
it.each([
  "labelRequired",
  "labelTaken",
  "bothLanguages",
  "changelogRequired",
  "noticeTooShort",
  "notDraft",
  "translationExists",
  "badLanguage",
])("maps refusal %s", (message) => {
  expect(legalErrorKey({ message })).toBe(`admin.legal.error.${message}`);
});
it.each([null, undefined, [], "text", { om: 42 }])(
  "staff version parser refuses invalid texts %j",
  async (texts) => {
    const rpc = vi.fn().mockResolvedValue({
      data: {
        version_id: "e2e-version",
        kind: "e2e-texts",
        version: 1,
        body_en: "en",
        body_am: "am",
        settings_snapshot: {},
        texts,
        missing_languages: [],
      },
      error: null,
    });
    (supabase as unknown as { rpc: unknown }).rpc = rpc;
    await expect(getLegalVersion("e2e-version")).rejects.toThrow();
  },
);
it("maps the publish fact refusals and reads the fact they name", () => {
  expect(legalErrorKey({ message: "unknownFact:nope_fact" })).toBe("admin.legal.error.unknownFact");
  expect(legalErrorKey({ message: "factMissing:legal_phone" })).toBe(
    "admin.legal.error.factMissing",
  );
  expect(legalErrorName({ message: "factMissing:legal_phone" })).toBe("legal_phone");
  expect(legalErrorName({ message: "notDraft" })).toBe("");
});
it.each([undefined, null, "om", [42], {}])(
  "M22 list refuses missing or malformed languages %j",
  async (languages) => {
    (supabase as unknown as { rpc: unknown }).rpc = vi.fn().mockResolvedValue({
      data: [{ document_id: "e2e-doc", kind: "e2e-list", versions: [{ languages }] }],
      error: null,
    });
    await expect(listLegalDocuments()).rejects.toThrow("invalid languages");
  },
);
it("M22 list preserves every language returned by the door, including the empty set", async () => {
  const data = [
    {
      document_id: "e2e-doc",
      kind: "e2e-list",
      versions: [
        { languages: ["om", "ti"], missing_languages: [] },
        { languages: [], missing_languages: [] },
      ],
    },
  ];
  (supabase as unknown as { rpc: unknown }).rpc = vi.fn().mockResolvedValue({ data, error: null });
  expect(await listLegalDocuments()).toEqual(data);
});
it.each([undefined, null, "om", [42], [{}], [{ code: "om" }], [{ code: 1, name_en: "Oromo" }]])(
  "M23 both legal doors refuse missing or malformed missing_languages %j",
  async (missing_languages) => {
    const rpc = vi.fn();
    (supabase as unknown as { rpc: unknown }).rpc = rpc;
    rpc.mockResolvedValue({
      data: [{ document_id: "e2e-doc", kind: "e2e-list", versions: [{ languages: [], missing_languages }] }],
      error: null,
    });
    await expect(listLegalDocuments()).rejects.toThrow("invalid missing_languages");
    rpc.mockResolvedValue({
      data: { version_id: "e2e-version", version: 1, kind: "e2e-list", body_en: "English", body_am: "Amharic", texts: {}, settings_snapshot: {}, missing_languages },
      error: null,
    });
    await expect(getLegalVersion("e2e-version")).rejects.toThrow("invalid missing_languages");
  },
);
it.each([[], [{ code: "e2e-language", name_en: "Scratch language" }]])(
  "M23 both legal doors preserve the missing-language answer %j",
  async (missing_languages) => {
    const rpc = vi.fn();
    (supabase as unknown as { rpc: unknown }).rpc = rpc;
    rpc.mockResolvedValue({ data: [{ document_id: "e2e-doc", kind: "e2e-list", versions: [{ languages: [], missing_languages }] }], error: null });
    expect((await listLegalDocuments())[0]?.versions[0]?.missing_languages).toEqual(missing_languages);
    rpc.mockResolvedValue({ data: { version_id: "e2e-version", version: 1, kind: "e2e-list", body_en: "English", body_am: "Amharic", texts: {}, settings_snapshot: {}, missing_languages }, error: null });
    expect((await getLegalVersion("e2e-version")).missing_languages).toEqual(missing_languages);
  },
);
it("lists the 24 facts in order, without providers", () => {
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
    "sold_visible_days",
    "appeal_months",
    "claims_limit_months",
    "talk_first_days",
    "complaint_ack_days",
    "review_months",
  ]);
});
const NOW = Date.parse("2026-10-21T09:00:00Z");
const review = (due_at: string | null): LegalReview => ({
  at: "2026-04-21T09:00:00Z",
  kind: "publish",
  by_name: null,
  note: null,
  due_at,
});
it("reads a document's review state", () => {
  expect(reviewState(null, NOW)).toBe("none");
  expect(reviewState(review(null), NOW)).toBe("none");
  expect(reviewState(review(new Date(NOW + 60_000).toISOString()), NOW)).toBe("due");
  expect(reviewState(review(new Date(NOW).toISOString()), NOW)).toBe("overdue");
  expect(reviewState(review(new Date(NOW - 86_400_000).toISOString()), NOW)).toBe("overdue");
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
    languages: [],
    missing_languages: [],
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
    languages: [],
    missing_languages: [],
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
    languages: [],
    missing_languages: [],
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
it("fills the facts for Download and keeps an unknown or empty fact as written (turn 13)", () => {
  expect(
    fillFacts("Write to {{legal_email}} at {{operator_name}} {{nope}} {{legal_phone}}.", {
      legal_email: "legal@example.invalid",
      operator_name: "Ethio.com LLC",
      legal_phone: "",
    }),
  ).toBe("Write to legal@example.invalid at Ethio.com LLC {{nope}} {{legal_phone}}.");
});
it("compares two texts line by line (turn 13)", () => {
  expect(lineDiff("a\nb\nc", "a\nc\nd")).toEqual([
    { kind: "same", text: "a" },
    { kind: "removed", text: "b" },
    { kind: "same", text: "c" },
    { kind: "added", text: "d" },
  ]);
  expect(lineDiff("same", "same")).toEqual([{ kind: "same", text: "same" }]);
});
it("pages the export through next and stops when next is null (turn 13)", async () => {
  const row = (id: string): AcceptanceExportRow => ({
    account_id: id,
    accepted_at: "2026-10-20T03:24:26Z",
    language: "en",
    method: "email",
    home_country: "ET",
    adult_confirmed: true,
    data_consent: false,
  });
  const rpc = vi
    .fn()
    .mockResolvedValueOnce({
      data: {
        version: 2,
        kind: "terms",
        country_code: null,
        rows: [row("a")],
        next: { at: "t1", id: "i1" },
      },
      error: null,
    })
    .mockResolvedValueOnce({
      data: { version: 2, kind: "terms", country_code: null, rows: [row("b")], next: null },
      error: null,
    });
  (supabase as unknown as { rpc: unknown }).rpc = rpc;
  const answer = await exportLegalAcceptances("v2");
  expect(answer.rows.map((r) => r.account_id)).toEqual(["a", "b"]);
  expect(answer.kind).toBe("terms");
  expect(rpc).toHaveBeenNthCalledWith(1, "admin_export_legal_acceptances", {
    p_version_id: "v2",
    p_limit: 1000,
  });
  expect(rpc).toHaveBeenNthCalledWith(2, "admin_export_legal_acceptances", {
    p_version_id: "v2",
    p_limit: 1000,
    p_after_at: "t1",
    p_after_id: "i1",
  });
});
it("writes the export as CSV, quoting commas and quotes and defusing formula starts (turn 13)", () => {
  expect(
    acceptancesCsv([
      {
        account_id: "u1",
        accepted_at: "2026-10-20T03:24:26Z",
        language: "am",
        method: '=cmd,"x"',
        home_country: null,
        adult_confirmed: false,
        data_consent: false,
      },
    ]),
  ).toBe(
    "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent\r\n" +
      'u1,2026-10-20T03:24:26Z,am,"\'=cmd,""x""",,false,false\r\n',
  );
});
it("names a download file (turn 13)", () => {
  expect(legalFileName("terms", null, 3, "en.md")).toBe("ethio-terms-all-v3-en.md");
  expect(legalFileName("privacy", "ET", 1, "acceptances.csv")).toBe(
    "ethio-privacy-et-v1-acceptances.csv",
  );
});
