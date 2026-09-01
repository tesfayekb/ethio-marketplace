import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import { PSEUDO_LANG } from "./pseudo";

import {
  aiTranslate,
  aiTranslateEntities,
  approveAllEntityTranslations,
  approveAllTranslations,
  ensurePseudoLanguage,
  importTranslations,
  listEntityTranslations,
  listEntityTranslationStats,
  listLanguages,
  listProviderLanguages,
  listTranslationStats,
  listTranslationRevisions,
  listTranslations,
  myTranslatorLanguages,
  saveEntityTranslation,
  saveTranslation,
  setEntityTranslationStatus,
  setLanguageFlags,
  setKeyContext,
  setLanguageOrder,
  setTranslationStatus,
  setTranslatorLanguages,
  syncUiKeys,
  upsertLanguage,
  writePseudoRow,
  type AiEntityItem,
  type AiTranslateItem,
  type EntityTranslationFilters,
  type EntityType,
  type TranslationFilters,
} from "./translations-service";

/**
 * U1g-3 purge law: every key starts at AUTH_DERIVED_ROOT, so one
 * removeQueries() on sign-out drops the whole console's cache.
 */
export const ADMIN_TRANSLATIONS_KEY = [AUTH_DERIVED_ROOT, "admin", "translations"] as const;

export function useLanguages() {
  return useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "languages"],
    queryFn: listLanguages,
    staleTime: 30_000,
  });
}

export function useTranslationStats(lang?: string) {
  return useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "stats", lang ?? "all"],
    queryFn: () => listTranslationStats(lang),
    staleTime: 15_000,
  });
}

export function useTranslations(filters: TranslationFilters) {
  return useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "rows", filters],
    queryFn: () => listTranslations(filters),
    staleTime: 10_000,
  });
}

/**
 * The caller's OWN translator scope. INFORMED CONTROLS ONLY (law F3): a
 * `translations:manage` holder is scope-EXEMPT server-side and their explicit
 * row set is usually empty, so callers must consult the PERMISSION, never this
 * list, before concluding somebody is unassigned.
 */
export function useMyTranslatorLanguages(enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "my-scope"],
    queryFn: myTranslatorLanguages,
    enabled,
    staleTime: 60_000,
  });
}

function useInvalidateTranslations() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ADMIN_TRANSLATIONS_KEY });
}

export function useSaveTranslation(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (input: { key: string; value: string }) => saveTranslation({ lang, ...input }),
    // Refetch is the truth (F4): a refusal never leaves an optimistic value up.
    onSettled: invalidate,
  });
}

export function useTranslationStatusAction(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (input: { key: string; action: "approve" | "clear" }) =>
      setTranslationStatus({ lang, ...input }),
    onSettled: invalidate,
  });
}

export function useUpsertLanguage() {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: upsertLanguage,
    onSettled: invalidate,
  });
}

export function useSetLanguageFlags() {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: setLanguageFlags,
    onSettled: invalidate,
  });
}

/** U4g — approve every reviewed (machine|edited, unflagged) row of a language. */
export function useApproveAllTranslations(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: () => approveAllTranslations(lang),
    onSettled: invalidate,
  });
}

/** U4k — approve every machine|edited CONTENT NAME of a language. */
export function useApproveAllEntityTranslations(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: () => approveAllEntityTranslations(lang),
    onSettled: invalidate,
  });
}

/** U4g — roster order; the same sort the public switcher reads. */
export function useSetLanguageOrder() {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (codes: string[]) => setLanguageOrder(codes),
    onSettled: invalidate,
  });
}

export function useSyncUiKeys() {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: syncUiKeys,
    onSettled: invalidate,
  });
}

export function useSetTranslatorLanguages(userId: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (langs: string[]) => setTranslatorLanguages({ userId, langs }),
    onSettled: invalidate,
  });
}

/**
 * U4c — AI translation. One mutation for both surfaces (per-row and bulk); the
 * caller does the chunking so it can report progress honestly.
 */
export function useAiTranslate(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (items: AiTranslateItem[]) => aiTranslate({ lang, items }),
    onSettled: invalidate,
  });
}

/**
 * U4d — the DATA scope. Entity rows share ADMIN_TRANSLATIONS_KEY, so one
 * invalidation refreshes both scopes and the coverage meters together.
 */
export function useEntityTranslations(filters: EntityTranslationFilters, enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "entity-rows", filters],
    queryFn: () => listEntityTranslations(filters),
    enabled,
    staleTime: 10_000,
  });
}

export function useSaveEntityTranslation(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (input: { type: EntityType; id: string; field: string; value: string }) =>
      saveEntityTranslation({ lang, ...input }),
    onSettled: invalidate,
  });
}

export function useEntityTranslationStatusAction(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (input: {
      type: EntityType;
      id: string;
      field: string;
      action: "approve" | "clear";
    }) => setEntityTranslationStatus({ lang, ...input }),
    onSettled: invalidate,
  });
}

/**
 * U4e — one key's revision history, newest first. Fetched only while the
 * drawer is open (`enabled`), and invalidated with every translation mutation
 * because the mutations ARE what history records — including a restore.
 */
export function useTranslationRevisions(input: { key: string; lang: string }, enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "revisions", input.lang, input.key],
    queryFn: () => listTranslationRevisions(input),
    enabled,
    staleTime: 0,
  });
}

/**
 * U4j — the DATA coverage meter, per language (or all languages when `lang`
 * is omitted). Shares ADMIN_TRANSLATIONS_KEY, so every translation mutation
 * refreshes it alongside the interface meter.
 */
export function useEntityTranslationStats(lang?: string) {
  return useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "entity-stats", lang ?? "all"],
    queryFn: () => listEntityTranslationStats(lang),
    staleTime: 15_000,
  });
}

/** U4j — data-layer AI. One mutation for the per-row and bulk surfaces. */
export function useAiTranslateEntities(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (items: AiEntityItem[]) => aiTranslateEntities({ lang, items }),
    onSettled: invalidate,
  });
}

/**
 * U4j — the provider's supported target list for the guided language picker.
 * Fetched only while the picker is open (`enabled`); a failure surfaces so the
 * operator can fall back to the manual form (F4), never a silent empty list.
 */
export function useProviderLanguages(enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "provider-languages"],
    queryFn: listProviderLanguages,
    enabled,
    staleTime: 60 * 60_000,
  });
}

/* ========================= U4i — CONTEXT · IMPORT · PSEUDO · USED-ON ======== */

/** U4i ① — write the key's translator note (manage-gated server-side). */
export function useSetKeyContext() {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (input: { key: string; context: string }) => setKeyContext(input),
    onSettled: invalidate,
  });
}

/** U4i ⑤ — import parsed rows; the server writes them EDITED and audits each. */
export function useImportTranslations(lang: string) {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: (rows: { key: string; value: string }[]) => importTranslations({ lang, rows }),
    onSettled: invalidate,
  });
}

/**
 * U4i ⑦ — generate the pseudo catalog.
 *
 * The base rows are read page by page through the ordinary list RPC (no new
 * read seam), and each row is written by `admin_machine_translation`. Progress
 * is reported honestly per row, and a per-row refusal is COUNTED rather than
 * aborting the run — the summary states both numbers (F4).
 */
export function usePseudoGenerate() {
  const invalidate = useInvalidateTranslations();
  return useMutation({
    mutationFn: async (input: {
      transform: (source: string) => string;
      onProgress?: (done: number, total: number) => void;
    }) => {
      await ensurePseudoLanguage();

      const pageSize = 200;
      let offset = 0;
      let total = 0;
      let written = 0;
      let failed = 0;

      for (;;) {
        const page = await listTranslations({
          lang: PSEUDO_LANG,
          status: "all",
          limit: pageSize,
          offset,
        });
        total = page.totalCount;
        if (page.rows.length === 0) break;
        for (const row of page.rows) {
          const source = row.sourceValue ?? "";
          if (source === "") {
            failed += 1;
          } else {
            try {
              await writePseudoRow({ key: row.key, value: input.transform(source) });
              written += 1;
            } catch {
              // A single refused row must not lose the other 400 (F4: counted).
              failed += 1;
            }
          }
          input.onProgress?.(written + failed, total);
        }
        offset += page.rows.length;
        if (offset >= total) break;
      }

      return { written, failed, total };
    },
    onSettled: invalidate,
  });
}

/**
 * U4i ② — the build-time "used on" map, served as a static asset
 * (`/i18n-usage.json`, written by scripts/i18n-usage-map.ts). No RPC, no auth:
 * it is derived from the public source tree and contains no data.
 *
 * A fetch failure leaves the chips absent rather than claiming a key is unused
 * — `undefined` and "nowhere" are different answers (E6).
 */
export function useUsageMap() {
  return useQuery({
    queryKey: ["i18n-usage-map"],
    queryFn: async (): Promise<Record<string, string[]>> => {
      const response = await fetch("/i18n-usage.json", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`usage map ${response.status}`);
      const payload = (await response.json()) as { keys?: Record<string, string[]> };
      return payload.keys ?? {};
    },
    staleTime: 60 * 60_000,
    retry: 1,
  });
}
