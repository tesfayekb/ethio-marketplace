import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";
import { supabase } from "@/integrations/supabase/client";
import { authKey } from "@/lib/query-keys";

import { translationErrorKey } from "./translations-service";
import { useLanguages, useSetTranslatorLanguages } from "./use-translations";

/**
 * U4b PART C — TRANSLATOR SCOPE on the user detail page.
 *
 * SCOPE, NOT AUTHORITY (U4a model): a `translations:*` role says what a person
 * may DO; this roster says WHICH LANGUAGES they may touch. Rendering is gated
 * on `translations:manage`; the RPC re-checks it server-side (law F3).
 *
 * U4b-7 (INC-095 l–n) — ONE gated definer read, `admin_get_translator_scope`,
 * answers BOTH questions: is the target eligible, and which languages are
 * ALREADY assigned. Two defects closed:
 *   (l) the empty-selection branch rendered a line INSTEAD of the checkbox
 *       list, so an eligible-but-unassigned target had no controls at all —
 *       the empty state is now a CAPTION ABOVE the list, never a replacement.
 *   (n) the card never read existing assignments, so the replace-set save
 *       could silently WIPE a target's scope. `selected` now initializes from
 *       server truth and re-syncs on every refetch.
 *
 * INC-095(m) SUPERVISOR CORRECTION: the U4b-6 "invoker-blind" mechanism was a
 * misdiagnosis from a truncated grep — `has_permission` was SECURITY DEFINER
 * throughout. The gated scope RPC stands on its own merits: ONE read, no
 * client-side enumeration of an arbitrary target's permissions.
 *
 * INC-078 root: the key lives under `authKey(...)` so the sign-out purge sees
 * it — the previous ad-hoc key sat outside the tripwire's sight.
 */
type TranslatorScope = { eligible: boolean; languages: string[] };

function useTranslatorScope(userId: string) {
  return useQuery<TranslatorScope>({
    queryKey: authKey("admin", "translator-scope", userId),
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_get_translator_scope", {
        p_target: userId,
      });
      // Law F4 — an errored check is an error, never "no permission".
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      return {
        eligible: row?.eligible === true,
        languages: row?.languages ?? [],
      };
    },
  });
}

export function TranslatorLanguagesCard({ userId, guard }: { userId: string; guard: GuardFn }) {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const languages = useLanguages();
  const save = useSetTranslatorLanguages(userId);
  const scope = useTranslatorScope(userId);
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  const serverLanguages = scope.data?.languages;
  // Server truth seeds the control set, and re-seeds it on every refetch, so a
  // replace-set save always starts from what the server actually holds.
  useEffect(() => {
    if (!serverLanguages) return;
    setSelected([...serverLanguages]);
  }, [serverLanguages]);

  const assignable = (languages.data ?? []).filter((row) => !row.isBase && row.enabledAdmin);
  const eligible = scope.data?.eligible === true;

  const toggle = (code: string, checked: boolean) => {
    setSaved(false);
    setSelected((current) =>
      checked ? [...new Set([...current, code])] : current.filter((item) => item !== code),
    );
  };

  return (
    <PageCard className="space-y-3" testid="user-translator-card">
      <h2 className="text-sm font-semibold text-foreground">
        {t("admin.translations.translator.title")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t("admin.translations.translator.scopeNote")}
      </p>

      {scope.isLoading || languages.isLoading ? (
        <p className="text-sm text-muted-foreground">{t("admin.translations.loading")}</p>
      ) : scope.isError ? (
        /* Law F4 — a failed check surfaces; it never impersonates absence. */
        <p
          role="alert"
          data-testid="translator-check-error"
          className="text-sm text-muted-foreground"
        >
          {t("admin.translations.translator.checkError")}
        </p>
      ) : !eligible ? (
        /* No translations:* permission via any role: scoping has nothing to
           attach to. One muted line, no controls. */
        <p data-testid="translator-no-role" className="text-sm text-muted-foreground">
          {t("admin.translations.translator.noRole")}
        </p>
      ) : assignable.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("admin.translations.translator.none")}</p>
      ) : (
        <>
          {/* INC-095(l): the empty state is a CAPTION above the controls —
              never a replacement for them. */}
          {(serverLanguages?.length ?? 0) === 0 ? (
            <p
              data-testid="translator-empty-caption"
              className="text-sm text-muted-foreground"
            >
              {t("admin.translations.translator.empty")}
            </p>
          ) : null}
          <ul className="flex flex-wrap gap-3">
            {assignable.map((row) => (
              <li key={row.code} className="flex min-h-11 items-center gap-2">
                <Checkbox
                  id={`translator-lang-${row.code}`}
                  data-testid={`translator-lang-${row.code}`}
                  checked={selected.includes(row.code)}
                  onCheckedChange={(checked) => toggle(row.code, checked === true)}
                />
                <label className="text-sm text-foreground" htmlFor={`translator-lang-${row.code}`}>
                  {`${row.nameNative} (${row.code})`}
                </label>
              </li>
            ))}
          </ul>
        </>
      )}

      {eligible ? (
        <>
          <Button
            className="min-h-11 w-full sm:w-auto"
            data-testid="translator-save"
            disabled={save.isPending || languages.isLoading}
            onClick={() => {
              setSaved(false);
              setErrorKey(null);
              void guard(() => save.mutateAsync(selected))
                .then(async () => {
                  setSaved(true);
                  // Server truth, not the optimistic set (law F4).
                  await queryClient.invalidateQueries({
                    queryKey: authKey("admin", "translator-scope", userId),
                  });
                })
                .catch((failure: unknown) => setErrorKey(translationErrorKey(failure)));
            }}
          >
            {t("admin.translations.translator.save")}
          </Button>

          <p className="text-xs text-muted-foreground">
            {t("admin.translations.translator.audit")}
          </p>

          {saved ? (
            <p
              role="status"
              data-testid="translator-saved"
              className="text-sm text-muted-foreground"
            >
              {t("admin.translations.translator.saved")}
            </p>
          ) : null}
          {errorKey ? (
            <p role="alert" data-testid="translator-error" className="text-sm text-destructive">
              {t(errorKey)}
            </p>
          ) : null}
        </>
      ) : null}
    </PageCard>
  );
}
