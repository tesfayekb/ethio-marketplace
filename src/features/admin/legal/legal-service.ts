import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { ownValue } from "@/lib/own-key";
import type { LegalFacts } from "@/features/legal/legal-markdown";

export const LEGAL_KINDS = ["terms", "privacy", "publishing"] as const;
export type LegalVersion = {
  version_id: string;
  version: number;
  status: "draft" | "published";
  label: string;
  material: boolean | null;
  effective_at: string | null;
  published_at: string | null;
  published_by_name?: string | null;
  acceptances?: number;
  created_at: string;
};
export type LegalDocument = {
  document_id: string;
  kind: string;
  country_code: string | null;
  versions: LegalVersion[];
};
export type LegalVersionDetail = LegalVersion & {
  document_id: string;
  kind: string;
  country_code: string | null;
  body_en: string;
  body_am: string;
  changelog: string;
  settings_snapshot: LegalFacts | null;
};
export const FACT_KEYS = [
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
] as const;
export type FactKey = (typeof FACT_KEYS)[number];
export type LegalSettings = LegalFacts & { notice_days: number };
export type DraftInput = {
  kind: string;
  country: string | null;
  label: string;
  body_en: string;
  body_am: string;
  changelog: string;
};
export type DraftResult = { document_id: string; version_id: string; version: number };
export type LegalHistoryRow = {
  version_id: string;
  kind: string;
  country_code: string | null;
  version: number;
  label?: string;
  accepted_at?: string;
  language?: string;
  method?: string;
  adult_confirmed?: boolean;
  data_consent?: boolean;
  sent_at?: string;
  status?: string;
};
export type LegalHistory = { acceptances: LegalHistoryRow[]; notices: LegalHistoryRow[] };

export function validDocument(kind: string, country?: string): boolean {
  return (
    ((LEGAL_KINDS as readonly string[]).includes(kind) || /^e2e-[a-z0-9-]{1,40}$/.test(kind)) &&
    (country === undefined || /^[A-Z]{2}$/.test(country))
  );
}
export function kindKey(kind: string): MessageKey | null {
  const keys: Record<string, MessageKey> = {
    terms: "legal.kind.terms",
    privacy: "legal.kind.privacy",
    publishing: "legal.kind.publishing",
  };
  return ownValue(keys, kind) ?? null;
}
const refusals: Record<string, MessageKey> = {
  labelRequired: "admin.legal.error.labelRequired",
  labelTaken: "admin.legal.error.labelTaken",
  bothLanguages: "admin.legal.error.bothLanguages",
  changelogRequired: "admin.legal.error.changelogRequired",
  noticeTooShort: "admin.legal.error.noticeTooShort",
  notDraft: "admin.legal.error.notDraft",
  unknownFact: "admin.legal.error.unknownFact",
  factMissing: "admin.legal.error.factMissing",
};
export function legalErrorKey(error: unknown): MessageKey {
  const message =
    typeof error === "string" ? error : ((error as { message?: string } | null)?.message ?? "");
  return ownValue(refusals, message.trim().split(":")[0] ?? "") ?? "admin.legal.error.generic";
}
/** The part of a refusal after its first colon (the fact a publish refusal names), or "". */
export function legalErrorName(error: unknown): string {
  const message =
    typeof error === "string" ? error : ((error as { message?: string } | null)?.message ?? "");
  const at = message.indexOf(":");
  return at < 0 ? "" : message.slice(at + 1).trim();
}
function objectOf(data: unknown, door: string): Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data))
    throw new Error(`${door}: invalid answer`);
  return data as Record<string, unknown>;
}
export async function listLegalDocuments(): Promise<LegalDocument[]> {
  const { data, error } = await supabase.rpc("admin_legal_documents");
  if (error) throw error;
  if (!Array.isArray(data)) throw new Error("admin_legal_documents: invalid answer");
  for (const raw of data) {
    const row = objectOf(raw, "admin_legal_documents");
    if (
      typeof row.kind !== "string" ||
      typeof row.document_id !== "string" ||
      !Array.isArray(row.versions)
    )
      throw new Error("admin_legal_documents: invalid document");
  }
  return data as unknown as LegalDocument[];
}
export async function getLegalSettings(): Promise<LegalSettings> {
  const { data, error } = await supabase.rpc("admin_legal_settings");
  if (error) throw error;
  const row = objectOf(data, "admin_legal_settings");
  if (typeof row.notice_days !== "number")
    throw new Error("admin_legal_settings: invalid notice period");
  return row as LegalSettings;
}
export async function getLegalVersion(id: string): Promise<LegalVersionDetail> {
  const { data, error } = await supabase.rpc("admin_legal_version", { p_version_id: id });
  if (error) throw error;
  const row = objectOf(data, "admin_legal_version");
  if (
    typeof row.version_id !== "string" ||
    typeof row.version !== "number" ||
    typeof row.kind !== "string"
  )
    throw new Error("admin_legal_version: invalid version");
  return row as LegalVersionDetail;
}
export async function saveLegalDraft(input: DraftInput): Promise<DraftResult> {
  const { data, error } = await supabase.rpc("admin_save_legal_draft", {
    p_kind: input.kind,
    p_country: input.country as string,
    p_label: input.label,
    p_body_en: input.body_en,
    p_body_am: input.body_am,
    p_changelog: input.changelog,
  });
  if (error) throw error;
  const row = objectOf(data, "admin_save_legal_draft");
  if (typeof row.version_id !== "string" || typeof row.version !== "number")
    throw new Error("admin_save_legal_draft: invalid result");
  return row as DraftResult;
}
export async function discardLegalDraft(id: string): Promise<void> {
  const { error } = await supabase.rpc("admin_discard_legal_draft", { p_version_id: id });
  if (error) throw error;
}
export async function publishLegalVersion(input: {
  id: string;
  material: boolean;
  effective_at?: string;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_publish_legal_version", {
    p_version_id: input.id,
    p_material: input.material,
    ...(input.effective_at ? { p_effective_at: input.effective_at } : {}),
  });
  if (error) throw error;
}
export async function setLegalSettings(facts: LegalFacts): Promise<void> {
  const { error } = await supabase.rpc("admin_set_legal_settings", { p_settings: facts });
  if (error) throw error;
}
export async function getUserLegalHistory(userId: string): Promise<LegalHistory> {
  const { data, error } = await supabase.rpc("admin_user_legal_history", { p_user_id: userId });
  if (error) throw error;
  const row = objectOf(data, "admin_user_legal_history");
  if (!Array.isArray(row.acceptances) || !Array.isArray(row.notices))
    throw new Error("admin_user_legal_history: invalid history");
  return row as LegalHistory;
}
export function versionStatus(
  version: LegalVersion,
  versions: LegalVersion[],
  now: number,
): "draft" | "scheduled" | "inForce" | "replaced" {
  if (version.status === "draft") return "draft";
  if (new Date(version.effective_at ?? "").getTime() > now) return "scheduled";
  const inForce = versions
    .filter((v) => v.status === "published" && new Date(v.effective_at ?? "").getTime() <= now)
    .sort((a, b) => b.version - a.version)[0];
  return inForce?.version_id === version.version_id ? "inForce" : "replaced";
}

/** Bundle 22 turn 13 — a version's text with its facts filled in, for Download (an unknown or empty fact stays as written). */
export function fillFacts(text: string, facts: LegalFacts): string {
  return text.replace(/\{\{([a-z_]+)\}\}/g, (raw: string, name: string) => {
    const fact = ownValue(facts, name);
    return fact === undefined || fact === null || String(fact).trim() === "" ? raw : String(fact);
  });
}

export type DiffLine = { kind: "same" | "added" | "removed"; text: string };
/** Turn 13 — Compare: a line diff of two texts by their longest common run of lines. */
export function lineDiff(before: string, after: string): DiffLine[] {
  const a = before.split(/\r?\n/);
  const b = after.split(/\r?\n/);
  const n = a.length;
  const m = b.length;
  if (n * m > 9_000_000) {
    return [
      ...a.map((text): DiffLine => ({ kind: "removed", text })),
      ...b.map((text): DiffLine => ({ kind: "added", text })),
    ];
  }
  const width = m + 1;
  const run = new Uint32Array((n + 1) * width);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      run[i * width + j] =
        a[i] === b[j]
          ? (run[(i + 1) * width + j + 1] ?? 0) + 1
          : Math.max(run[(i + 1) * width + j] ?? 0, run[i * width + j + 1] ?? 0);
    }
  }
  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push({ kind: "same", text: a[i] ?? "" });
      i++;
      j++;
    } else if ((run[(i + 1) * width + j] ?? 0) >= (run[i * width + j + 1] ?? 0)) {
      out.push({ kind: "removed", text: a[i] ?? "" });
      i++;
    } else {
      out.push({ kind: "added", text: b[j] ?? "" });
      j++;
    }
  }
  while (i < n) out.push({ kind: "removed", text: a[i++] ?? "" });
  while (j < m) out.push({ kind: "added", text: b[j++] ?? "" });
  return out;
}

export type AcceptanceExportRow = {
  account_id: string;
  accepted_at: string;
  language: string;
  method: string;
  home_country: string | null;
  adult_confirmed: boolean;
  data_consent: boolean;
};
export type AcceptanceExport = {
  version: number;
  kind: string;
  country_code: string | null;
  rows: AcceptanceExportRow[];
};
/** Turn 13 — every acceptance of a published version, page by page through the export door (D226). */
export async function exportLegalAcceptances(versionId: string): Promise<AcceptanceExport> {
  const rows: AcceptanceExportRow[] = [];
  let after: { at: string; id: string } | null = null;
  for (let page = 0; page < 1000; page++) {
    const { data, error } = await supabase.rpc("admin_export_legal_acceptances", {
      p_version_id: versionId,
      p_limit: 1000,
      ...(after ? { p_after_at: after.at, p_after_id: after.id } : {}),
    });
    if (error) throw error;
    const answer = objectOf(data, "admin_export_legal_acceptances");
    if (
      !Array.isArray(answer.rows) ||
      typeof answer.version !== "number" ||
      typeof answer.kind !== "string"
    )
      throw new Error("admin_export_legal_acceptances: invalid answer");
    rows.push(...(answer.rows as AcceptanceExportRow[]));
    const next = answer.next as { at?: unknown; id?: unknown } | null | undefined;
    if (!next)
      return {
        version: answer.version,
        kind: answer.kind,
        country_code: typeof answer.country_code === "string" ? answer.country_code : null,
        rows,
      };
    if (typeof next.at !== "string" || typeof next.id !== "string")
      throw new Error("admin_export_legal_acceptances: invalid next");
    after = { at: next.at, id: next.id };
  }
  throw new Error("admin_export_legal_acceptances: too many pages");
}
const CSV_COLUMNS = [
  "account_id",
  "accepted_at",
  "language",
  "method",
  "home_country",
  "adult_confirmed",
  "data_consent",
] as const;
/** Turn 13 — the export as CSV: a header row, then one row per acceptance; a cell that a spreadsheet could read as a formula is quoted with a leading apostrophe. */
export function acceptancesCsv(rows: AcceptanceExportRow[]): string {
  const cell = (value: unknown) => {
    let text = value === null || value === undefined ? "" : String(value);
    if (/^[=+\-@]/.test(text)) text = `'${text}`;
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return (
    [
      CSV_COLUMNS.join(","),
      ...rows.map((row) => CSV_COLUMNS.map((key) => cell(row[key])).join(",")),
    ].join("\r\n") + "\r\n"
  );
}
/** Turn 13 — a download's file name: ethio-<kind>-<country or all>-v<n>-<what>.<ext>. */
export function legalFileName(
  kind: string,
  country: string | null,
  version: number,
  what: string,
): string {
  const part = (s: string) => s.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  return `ethio-${part(kind)}-${part(country ?? "all")}-v${version}-${what}`;
}
/** Turn 13 — saves text as a file in the browser. */
export function saveTextFile(name: string, text: string, type: string): void {
  const href = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
}
