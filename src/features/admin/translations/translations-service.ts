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
  }));
}

export interface TranslationFilters {
  lang: string;
  status?: string;
  flagged?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

function asStatus(value: string): TranslationStatus {
  return value === "machine" || value === "edited" || value === "approved"
    ? value
    : "untranslated";
}

export async function listTranslations({
  lang,
  status = "all",
  flagged,
  search = "",
  limit = 25,
  offset = 0,
}: TranslationFilters): Promise<TranslationPage> {
  const { data, error } = await supabase.rpc("admin_list_translations", {
    p_lang: lang,
    p_status: status,
    ...(flagged === undefined ? {} : { p_flagged: flagged }),
    p_search: search,
    p_limit: limit,
    p_offset: offset,
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

export async function upsertLanguage(input: {
  code: string;
  nameEn: string;
  nameNative: string;
  rtl: boolean;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_upsert_language", {
    p_code: input.code,
    p_name_en: input.nameEn,
    p_name_native: input.nameNative,
    p_rtl: input.rtl,
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
