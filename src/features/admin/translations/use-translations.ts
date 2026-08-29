import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  listLanguages,
  listTranslationStats,
  listTranslations,
  myTranslatorLanguages,
  saveTranslation,
  setLanguageFlags,
  setTranslationStatus,
  setTranslatorLanguages,
  syncUiKeys,
  upsertLanguage,
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
