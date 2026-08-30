import { useState } from "react";

import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";

import { translationErrorKey } from "./translations-service";
import { useLanguages, useSetTranslatorLanguages } from "./use-translations";

/**
 * U4b PART C — TRANSLATOR SCOPE on the user detail page.
 *
 * SCOPE, NOT AUTHORITY (U4a model): a `translations:*` role says what a person
 * may DO; this roster says WHICH LANGUAGES they may touch. Rendering is gated
 * on `translations:manage`; the RPC re-checks it server-side (law F3).
 *
 * HONEST LIMITATION: U4a exposes a SELF read only (`get_my_translator_languages`),
 * so this card cannot display another user's current assignment. It is a
 * REPLACE control — the submitted set becomes the user's whole scope — and the
 * copy says so rather than implying a merge.
 */
export function TranslatorLanguagesCard({ userId, guard }: { userId: string; guard: GuardFn }) {
  const { t } = useI18n();
  const languages = useLanguages();
  const save = useSetTranslatorLanguages(userId);
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  const assignable = (languages.data ?? []).filter((row) => !row.isBase && row.enabledAdmin);

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

      {languages.isLoading ? (
        <p className="text-sm text-muted-foreground">{t("admin.translations.loading")}</p>
      ) : assignable.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("admin.translations.translator.none")}</p>
      ) : selected.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {t("admin.translations.translator.empty")}
        </p>
      ) : (
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
      )}

      <Button
        className="min-h-11 w-full sm:w-auto"
        data-testid="translator-save"
        disabled={save.isPending || languages.isLoading}
        onClick={() => {
          setSaved(false);
          setErrorKey(null);
          void guard(() => save.mutateAsync(selected))
            .then(() => setSaved(true))
            .catch((failure: unknown) => setErrorKey(translationErrorKey(failure)));
        }}
      >
        {t("admin.translations.translator.save")}
      </Button>

      <p className="text-xs text-muted-foreground">{t("admin.translations.translator.audit")}</p>

      {saved ? (
        <p role="status" data-testid="translator-saved" className="text-sm text-muted-foreground">
          {t("admin.translations.translator.saved")}
        </p>
      ) : null}
      {errorKey ? (
        <p role="alert" data-testid="translator-error" className="text-sm text-destructive">
          {t(errorKey)}
        </p>
      ) : null}
    </PageCard>
  );
}
