import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  aiTranslate,
  aiTranslateEntities,
  approveAllTranslations,
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
  setLanguageOrder,
  setTranslationStatus,
  setTranslatorLanguages,
  syncUiKeys,
  upsertLanguage,
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
