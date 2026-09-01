import type { MessageKey } from "@/i18n/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * U4b — the Translations console's client seam.
 *
 * Every read and write is a definer RPC registered by the U4a foundation
 * migration (20260829050332) and its U4b read companion (20260829060103).
 * The browser never touches `ui_translations`, `languages` or
 * `translator_languages` directly.
 *
 * Law F3 — these results decide what RENDERS; `has_permission` →
 * `require_step_up_if_needed` → `translation_scope_ok` on the server is the
 * only authorization authority.
 * Law F4 — every failure is thrown, never swallowed.
 */

export interface LanguageRow {
  code: string;
  nameEn: string;
  nameNative: string;
  rtl: boolean;
  isBase: boolean;
  enabledAdmin: boolean;
  enabledPublic: boolean;
  sort: number;
}

export interface TranslationStats {
  langCode: string;
  total: number;
  untranslated: number;
  machineCount: number;
  edited: number;
  approved: number;
  flagged: number;
  /** U4g — keys the code no longer ships; excluded from every other count. */
  orphaned: number;
  /** U4g — machine+edited, unflagged, live: exactly what approve-all touches. */
  reviewable: number;
}

export type TranslationStatus = "untranslated" | "machine" | "edited" | "approved";

export interface TranslationRow {
  key: string;
  langCode: string;
  value: string | null;
  sourceValue: string | null;
  status: TranslationStatus;
  machine: boolean;
  flagged: boolean;
  flagNote: string | null;
  updatedBy: string | null;
  updatedAt: string;
  approvedBy: string | null;
  approvedAt: string | null;
  /** U4g — the key is absent from the compiled catalog the console last synced. */
  orphaned: boolean;
}

export interface TranslationPage {
  rows: TranslationRow[];
  totalCount: number;
}

export interface SyncResult {
  inserted: number;
  seeded: number;
  languages: number;
}

export async function listLanguages(): Promise<LanguageRow[]> {
  const { data, error } = await supabase.rpc("admin_list_languages");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    code: row.code,
    nameEn: row.name_en,
    nameNative: row.name_native,
    rtl: row.rtl,
    isBase: row.is_base,
    enabledAdmin: row.enabled_admin,
    enabledPublic: row.enabled_public,
    sort: row.sort,
  }));
}

export async function listTranslationStats(lang?: string): Promise<TranslationStats[]> {
  const { data, error } = await supabase.rpc("admin_translation_stats", {
    ...(lang ? { p_lang: lang } : {}),
  });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    langCode: row.lang_code,
    total: Number(row.total),
    untranslated: Number(row.untranslated),
    machineCount: Number(row.machine_count),
    edited: Number(row.edited),
    approved: Number(row.approved),
    flagged: Number(row.flagged),
    orphaned: Number(row.orphaned),
    reviewable: Number(row.reviewable),
  }));
}

export interface TranslationFilters {
  lang: string;
  status?: string;
  flagged?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  /** U4g — undefined/false = the live catalog; true = the orphaned set only. */
  orphaned?: boolean;
}

function asStatus(value: string): TranslationStatus {
  return value === "machine" || value === "edited" || value === "approved" ? value : "untranslated";
}

export async function listTranslations({
  lang,
  status = "all",
  flagged,
  search = "",
  limit = 25,
  offset = 0,
  orphaned = false,
}: TranslationFilters): Promise<TranslationPage> {
  const { data, error } = await supabase.rpc("admin_list_translations", {
    p_lang: lang,
    p_status: status,
    ...(flagged === undefined ? {} : { p_flagged: flagged }),
    p_search: search,
    p_limit: limit,
    p_offset: offset,
    p_orphaned: orphaned,
  });
  if (error) throw error;
  const rows = data ?? [];
  const first = rows[0];
  return {
    rows: rows.map((row) => ({
      key: row.key,
      langCode: row.lang_code,
      value: row.value ?? null,
      sourceValue: row.source_value ?? null,
      status: asStatus(row.status),
      machine: row.machine,
      flagged: row.flagged,
      flagNote: row.flag_note ?? null,
      updatedBy: row.updated_by ?? null,
      updatedAt: row.updated_at,
      approvedBy: row.approved_by ?? null,
      approvedAt: row.approved_at ?? null,
      orphaned: row.orphaned,
    })),
    totalCount: first ? Number(first.total_count) : 0,
  };
}

export async function saveTranslation(input: {
  key: string;
  lang: string;
  value: string;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_save_translation", {
    p_key: input.key,
    p_lang: input.lang,
    p_value: input.value,
  });
  if (error) throw error;
}

export async function setTranslationStatus(input: {
  key: string;
  lang: string;
  action: "approve" | "clear";
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_translation_status", {
    p_key: input.key,
    p_lang: input.lang,
    p_action: input.action,
  });
  if (error) throw error;
}

/**
 * U4g — BULK APPROVAL. Flagged rows are SKIPPED server-side (U4f law), every
 * approved row captures its own revision, and the summary is the server's own
 * count, never an optimistic guess (F4).
 */
export interface ApproveAllResult {
  approved: number;
  skippedFlagged: number;
}

export async function approveAllTranslations(lang: string): Promise<ApproveAllResult> {
  const { data, error } = await supabase.rpc("admin_approve_all_translations", { p_lang: lang });
  if (error) throw error;
  const record =
    data !== null && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : {};
  return {
    approved: Number(record["approved"] ?? 0),
    skippedFlagged: Number(record["skipped_flagged"] ?? 0),
  };
}

/** U4g — roster order; the public language switcher follows `languages.sort`. */
export async function setLanguageOrder(codes: string[]): Promise<void> {
  const { error } = await supabase.rpc("admin_set_language_order", { p_codes: codes });
  if (error) throw error;
}

export async function upsertLanguage(input: {
  code: string;
  nameEn: string;
  nameNative: string;
  rtl: boolean;
  /** U4j — ISO country codes this language is spoken in; validated server-side. */
  countryCodes?: string[];
}): Promise<void> {
  const { error } = await supabase.rpc("admin_upsert_language", {
    p_code: input.code,
    p_name_en: input.nameEn,
    p_name_native: input.nameNative,
    p_rtl: input.rtl,
    p_country_codes: input.countryCodes ?? [],
  });
  if (error) throw error;
}

export async function setLanguageFlags(input: {
  code: string;
  enabledAdmin: boolean;
  enabledPublic: boolean;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_language_flags", {
    p_code: input.code,
    p_enabled_admin: input.enabledAdmin,
    p_enabled_public: input.enabledPublic,
  });
  if (error) throw error;
}

export async function syncUiKeys(input: {
  en: Record<string, string>;
  am: Record<string, string>;
}): Promise<SyncResult> {
  const { data, error } = await supabase.rpc("admin_sync_ui_keys", {
    p_en: input.en,
    p_am: input.am,
  });
  if (error) throw error;
  const record =
    data !== null && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : {};
  return {
    inserted: Number(record["inserted"] ?? 0),
    seeded: Number(record["seeded"] ?? 0),
    languages: Number(record["languages"] ?? 0),
  };
}

export async function setTranslatorLanguages(input: {
  userId: string;
  langs: string[];
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_translator_languages", {
    p_user: input.userId,
    p_langs: input.langs,
  });
  if (error) throw error;
}

/** The caller's OWN assigned language codes (U4b read seam). */
export async function myTranslatorLanguages(): Promise<string[]> {
  const { data, error } = await supabase.rpc("get_my_translator_languages");
  if (error) throw error;
  return (data ?? []).map((row) => row.lang_code);
}

/**
 * PART C (D3) — the shipped bundle for a language: approved rows only.
 * Anon-callable; a language that is neither public nor base returns `{}`, and
 * the caller then keeps the compiled catalog (never a blank UI).
 */
export async function fetchUiBundle(lang: string): Promise<Record<string, string>> {
  const { data, error } = await supabase.rpc("get_ui_bundle", { p_lang: lang });
  if (error) throw error;
  if (data === null || typeof data !== "object" || Array.isArray(data)) return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (typeof value === "string" && value.length > 0) out[key] = value;
  }
  return out;
}

/**
 * Maps every refusal these RPCs can raise onto a translation key. The server's
 * own message is the authority; this only chooses how to SAY it. Law F4 — an
 * unmapped failure still surfaces, through the generic key, never silently.
 */
export function translationErrorKey(error: unknown): MessageKey {
  const message = (error as { message?: string } | null)?.message ?? "";
  if (/step-up required/i.test(message)) return "admin.translations.error.stepUp";
  if (/flagged rows cannot be approved/i.test(message))
    return "admin.translations.error.flaggedApprove";
  if (/not assigned to this language/i.test(message)) return "admin.translations.error.scope";
  if (/not fully approved/i.test(message)) return "admin.translations.error.coverage";
  if (/base language|sync-owned/i.test(message)) return "admin.translations.error.baseLocked";
  if (/permission denied/i.test(message)) return "admin.translations.error.permission";
  if (/language code/i.test(message)) return "admin.translations.error.codeInvalid";
  return "admin.translations.error.generic";
}

/** The server's own refusal text, surfaced verbatim beneath the translated line. */
export function serverMessage(error: unknown): string | null {
  const message = (error as { message?: string } | null)?.message ?? "";
  return message.trim() === "" ? null : message;
}

/**
 * U4c — AI TRANSLATION SEAM.
 *
 * The endpoint is the app server's `/api/translate` route (INC-096: new
 * Supabase Edge Functions are rejected by the executor, so the transport moved
 * to the app server; the contract is unchanged). The session bearer is attached
 * explicitly — this is a raw HTTP call, not a serverFn RPC, so the global
 * function middleware does not apply.
 *
 * Law F3: this call decides NOTHING. The route re-checks
 * `translations:machine` + scope, and `admin_machine_translation` re-gates
 * again as the single writer.
 */
export interface AiTranslateItem {
  key: string;
  source: string;
}

export interface AiTranslateResult {
  done: number;
  flagged: number;
  failed: { key: string; reason: string }[];
}

/** The route's own hard cap; the caller chunks to this size. */
export const AI_CHUNK_SIZE = 100;

async function postTranslate(body: unknown): Promise<AiTranslateResult> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("not signed in");

  const response = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as
    | (Partial<AiTranslateResult> & { error?: string })
    | null;

  // F4 — a refusal is thrown with the SERVER's own words, never swallowed.
  if (!response.ok) {
    throw new Error(payload?.error ?? `translation request failed (${response.status})`);
  }
  return {
    done: Number(payload?.done ?? 0),
    flagged: Number(payload?.flagged ?? 0),
    failed: payload?.failed ?? [],
  };
}

export async function aiTranslate(input: {
  lang: string;
  items: AiTranslateItem[];
}): Promise<AiTranslateResult> {
  return postTranslate({ scope: "ui", target_lang: input.lang, items: input.items });
}

/**
 * U4j — the DATA scope's AI seam. Same route, same gates; `scope: 'entity'`
 * switches the route's single writer to `admin_machine_entity_translation`.
 * `key` is the reporting handle only (`<type>:<id>`); the writer addresses the
 * row by type/id/field.
 */
export interface AiEntityItem {
  key: string;
  source: string;
  type: EntityType;
  id: string;
  field: string;
}

export async function aiTranslateEntities(input: {
  lang: string;
  items: AiEntityItem[];
}): Promise<AiTranslateResult> {
  return postTranslate({ scope: "entity", target_lang: input.lang, items: input.items });
}

/**
 * U4j — the PROVIDER's supported target list, for the guided language picker.
 * Served by `GET /api/translate` (see the route's path ruling), gated on
 * `translations:manage`.
 */
export interface ProviderLanguage {
  code: string;
  name: string;
}

export async function listProviderLanguages(): Promise<ProviderLanguage[]> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("not signed in");

  const response = await fetch("/api/translate", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const payload = (await response.json().catch(() => null)) as {
    languages?: ProviderLanguage[];
    error?: string;
  } | null;
  if (!response.ok) {
    throw new Error(payload?.error ?? `language list failed (${response.status})`);
  }
  return (payload?.languages ?? []).filter(
    (entry) => typeof entry?.code === "string" && typeof entry?.name === "string",
  );
}

/**
 * U4d — ENTITY (DATA) TRANSLATIONS.
 *
 * Same seam discipline as the UI trio: definer RPCs only, every failure
 * thrown. U4j: machine translation is NO LONGER deferred — the AI route's
 * `entity` scope writes through `admin_machine_entity_translation`.
 */

export type EntityType = "category" | "location";

export interface EntityTranslationRow {
  entityType: EntityType;
  entityId: string;
  field: string;
  label: string;
  sourceValue: string | null;
  value: string | null;
  status: TranslationStatus;
  machine: boolean;
  flagged: boolean;
  flagNote: string | null;
  updatedBy: string | null;
  updatedAt: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
}

export interface EntityTranslationPage {
  rows: EntityTranslationRow[];
  totalCount: number;
}

export interface EntityTranslationFilters {
  lang: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function listEntityTranslations({
  lang,
  status = "all",
  search = "",
  limit = 25,
  offset = 0,
}: EntityTranslationFilters): Promise<EntityTranslationPage> {
  const { data, error } = await supabase.rpc("admin_list_entity_translations", {
    p_lang: lang,
    p_status: status,
    p_search: search,
    p_limit: limit,
    p_offset: offset,
  });
  if (error) throw error;
  const rows = data ?? [];
  const first = rows[0];
  return {
    rows: rows.map((row) => ({
      entityType: row.entity_type === "category" ? "category" : "location",
      entityId: row.entity_id,
      field: row.field,
      label: row.label,
      sourceValue: row.source_value ?? null,
      value: row.value ?? null,
      status: asStatus(row.status),
      machine: row.machine,
      flagged: row.flagged,
      flagNote: row.flag_note ?? null,
      updatedBy: row.updated_by ?? null,
      updatedAt: row.updated_at ?? null,
      approvedBy: row.approved_by ?? null,
      approvedAt: row.approved_at ?? null,
    })),
    totalCount: first ? Number(first.total_count) : 0,
  };
}

export async function saveEntityTranslation(input: {
  type: EntityType;
  id: string;
  field: string;
  lang: string;
  value: string;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_save_entity_translation", {
    p_type: input.type,
    p_id: input.id,
    p_field: input.field,
    p_lang: input.lang,
    p_value: input.value,
  });
  if (error) throw error;
}

export async function setEntityTranslationStatus(input: {
  type: EntityType;
  id: string;
  field: string;
  lang: string;
  action: "approve" | "clear";
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_entity_translation_status", {
    p_type: input.type,
    p_id: input.id,
    p_field: input.field,
    p_lang: input.lang,
    p_action: input.action,
  });
  if (error) throw error;
}

/**
 * U4e — TRANSLATION HISTORY (READ ONLY).
 *
 * `admin_list_translation_revisions` is the gated definer read over the
 * append-only revision table; client roles have no direct access to it.
 * There is NO history WRITER: a restore is a plain `saveTranslation` call, so
 * the restore itself is captured as a revision like any other edit.
 */
export interface TranslationRevision {
  id: string;
  action: string;
  prevValue: string | null;
  prevStatus: string | null;
  prevMachine: boolean;
  changedBy: string | null;
  changedByName: string | null;
  changedAt: string;
}

export async function listTranslationRevisions(input: {
  key: string;
  lang: string;
  limit?: number;
}): Promise<TranslationRevision[]> {
  const { data, error } = await supabase.rpc("admin_list_translation_revisions", {
    p_key: input.key,
    p_lang: input.lang,
    p_limit: input.limit ?? 20,
  });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    action: row.action,
    prevValue: row.prev_value ?? null,
    prevStatus: row.prev_status ?? null,
    prevMachine: row.prev_machine,
    changedBy: row.changed_by ?? null,
    changedByName: row.changed_by_name ?? null,
    changedAt: row.changed_at,
  }));
}

/**
 * U4j — the DATA coverage meter. Same universe as
 * `admin_list_entity_translations` (active categories + active locations,
 * field `name`), so the meter and the list can never disagree.
 */
export interface EntityTranslationStats {
  langCode: string;
  total: number;
  approved: number;
  machineCount: number;
  edited: number;
  untranslated: number;
}

export async function listEntityTranslationStats(lang?: string): Promise<EntityTranslationStats[]> {
  const { data, error } = await supabase.rpc("admin_entity_translation_stats", {
    ...(lang ? { p_lang: lang } : {}),
  });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    langCode: row.lang_code,
    total: Number(row.total),
    approved: Number(row.approved),
    machineCount: Number(row.machine_count),
    edited: Number(row.edited),
    untranslated: Number(row.untranslated),
  }));
}
