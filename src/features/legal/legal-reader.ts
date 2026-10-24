import { supabase } from "@/integrations/supabase/client";
import type { LegalFacts } from "./legal-markdown";
import { ownValue } from "@/lib/own-key";

/** Bundle 22 turn 3 — the browser's legal reads; every answer is shape-checked (a wrong shape throws). */
export type LegalStatusRow = {
  kind: string;
  country_code: string | null;
  version_id: string;
  version: number;
  label: string;
  material: boolean | null;
  effective_at: string | null;
  adult_confirmed: boolean;
};
export type MyLegalAcceptance = {
  version_id: string;
  kind: string;
  country_code: string | null;
  version: number;
  label: string;
  accepted_at: string;
  language: string;
  method: string;
  adult_confirmed: boolean;
  data_consent: boolean;
};
export type MyLegalNotice = {
  version_id: string;
  kind: string;
  country_code: string | null;
  version: number;
  label: string;
  channel: string;
  status: string;
  sent_at: string;
};
export type MyLegalHistory = { acceptances: MyLegalAcceptance[]; notices: MyLegalNotice[] };
export type PublicLegalVersion = {
  version_id: string;
  kind: string;
  country_code: string | null;
  version: number;
  label: string;
  body_en: string;
  body_am: string;
  texts: Record<string, string>;
  material: boolean | null;
  effective_at: string;
  published_at: string | null;
  settings_snapshot: LegalFacts | null;
};

function record(value: unknown, door: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${door}: invalid answer`);
  return value as Record<string, unknown>;
}
function versionRow(value: unknown, door: string): Record<string, unknown> {
  const row = record(value, door);
  if (
    typeof row.version_id !== "string" ||
    typeof row.kind !== "string" ||
    typeof row.version !== "number"
  )
    throw new Error(`${door}: invalid version`);
  return row;
}
export function parseLegalVersion(value: unknown, door: string): PublicLegalVersion {
  const row = versionRow(value, door);
  if (typeof row.body_en !== "string" || typeof row.body_am !== "string")
    throw new Error(`${door}: invalid text`);
  parseLegalTexts(row.texts, door);
  if (row.settings_snapshot !== null && typeof row.settings_snapshot !== "object")
    throw new Error(`${door}: invalid facts`);
  return row as PublicLegalVersion;
}

function parseLegalTexts(value: unknown, door: string): void {
  const texts = record(value, door);
  if (Object.values(texts).some((text) => typeof text !== "string"))
    throw new Error(`${door}: invalid texts`);
}

export function legalTextFor(
  version: { body_en: string; body_am: string; texts: Record<string, string> },
  language: string,
): { text: string; shown: string; fallback: boolean } {
  if (language === "en") return { text: version.body_en, shown: "en", fallback: false };
  if (language === "am") return { text: version.body_am, shown: "am", fallback: false };
  const text = ownValue(version.texts, language);
  return text === undefined
    ? { text: version.body_en, shown: "en", fallback: true }
    : { text, shown: language, fallback: false };
}

/** The refusal's word: the door's message up to its first colon. */
export function legalRefusal(error: unknown): string {
  const message =
    typeof error === "string" ? error : ((error as { message?: string } | null)?.message ?? "");
  return message.trim().split(":")[0] ?? "";
}

export async function myLegalStatus(kinds: string[]): Promise<LegalStatusRow[]> {
  const { data, error } = await supabase.rpc("my_legal_status", { p_kinds: kinds });
  if (error) throw error;
  if (!Array.isArray(data)) throw new Error("my_legal_status: invalid answer");
  for (const raw of data) {
    if (typeof versionRow(raw, "my_legal_status").adult_confirmed !== "boolean")
      throw new Error("my_legal_status: invalid answer");
  }
  return data as unknown as LegalStatusRow[];
}
export async function acceptLegal(input: {
  versionIds: string[];
  language: string;
  adult: boolean;
  dataConsent: boolean;
}): Promise<void> {
  const { error } = await supabase.rpc("accept_legal", {
    p_version_ids: input.versionIds,
    p_language: input.language,
    p_adult: input.adult,
    p_data_consent: input.dataConsent,
  });
  if (error) throw error;
}
export async function myLegalHistory(): Promise<MyLegalHistory> {
  const { data, error } = await supabase.rpc("my_legal_history");
  if (error) throw error;
  const row = record(data, "my_legal_history");
  if (!Array.isArray(row.acceptances) || !Array.isArray(row.notices))
    throw new Error("my_legal_history: invalid history");
  for (const a of row.acceptances) {
    const r = versionRow(a, "my_legal_history");
    if (typeof r.data_consent !== "boolean")
      throw new Error("my_legal_history: invalid acceptance");
  }
  for (const n of row.notices) {
    const r = versionRow(n, "my_legal_history");
    if (typeof r.label !== "string") throw new Error("my_legal_history: invalid notice");
  }
  return row as unknown as MyLegalHistory;
}
/**
 * Bundle 22 turn 32 (D230) — the ids of the versions in force for the gate's kinds, read anonymously for the
 * sign-up form's tick; a null answer contributes nothing. The signup trigger records only those it can prove.
 */
export async function legalInForceIds(kinds: string[]): Promise<string[]> {
  const answers = await Promise.all(
    kinds.map(async (kind) => {
      const { data, error } = await supabase.rpc("legal_in_force", { p_kind: kind });
      if (error) throw error;
      return data == null ? null : parseLegalVersion(data, "legal_in_force").version_id;
    }),
  );
  return answers.filter((id): id is string => id !== null);
}
export async function myLegalVersion(id: string): Promise<PublicLegalVersion> {
  const { data, error } = await supabase.rpc("my_legal_version", { p_version_id: id });
  if (error) throw error;
  return parseLegalVersion(data, "my_legal_version");
}

/** Bundle 22 turn 4 — the publishing statements that apply to the seller's ad, and whether an acceptance is owed. */
export type CertifyStatement = {
  version_id: string;
  kind: string;
  country_code: string | null;
  version: number;
  label: string;
  body_en: string;
  body_am: string;
  texts: Record<string, string>;
  settings_snapshot: LegalFacts | null;
};
export type ListingCertification = {
  statements: CertifyStatement[];
  acceptance_pending: boolean;
};
export async function myListingCertification(listingId: string): Promise<ListingCertification> {
  const { data, error } = await supabase.rpc("my_listing_certification", {
    p_listing_id: listingId,
  });
  if (error) throw error;
  const row = record(data, "my_listing_certification");
  if (!Array.isArray(row.statements) || typeof row.acceptance_pending !== "boolean")
    throw new Error("my_listing_certification: invalid answer");
  for (const s of row.statements) {
    const r = versionRow(s, "my_listing_certification");
    parseLegalTexts(r.texts, "my_listing_certification");
    if (
      typeof r.body_en !== "string" ||
      typeof r.body_am !== "string" ||
      typeof r.label !== "string"
    )
      throw new Error("my_listing_certification: invalid statement");
    if (r.settings_snapshot !== null && typeof r.settings_snapshot !== "object")
      throw new Error("my_listing_certification: invalid facts");
  }
  return row as unknown as ListingCertification;
}
