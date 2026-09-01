import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

import type { ProviderLanguage } from "./translations-service";
import { useProviderLanguages } from "./use-translations";

/**
 * U4j — THE GUIDED LANGUAGE PICKER.
 *
 * The list is the PROVIDER's own supported-target list (GET /api/translate,
 * `translations:manage`-gated), so a language the console offers is a language
 * the AI can actually fill. Law F4: a list failure is SAID, not hidden — the
 * caller then reveals the manual form rather than pretending nothing exists.
 *
 * FENCE LANGUAGES (J2) are test-owned scratch codes (`zxx-*`, `zxy-*`); they
 * are never offered here even if a provider ever returned such a subtag.
 */
const FENCE_RE = /^zx[a-z]/i;
const MAX_VISIBLE = 40;

export function LanguagePicker({
  onSelect,
  onManual,
}: {
  onSelect: (language: ProviderLanguage) => void;
  onManual: () => void;
}) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const list = useProviderLanguages(true);

  const needle = query.trim().toLowerCase();
  const all = (list.data ?? []).filter((entry) => !FENCE_RE.test(entry.code));
  const matches = all
    .filter(
      (entry) =>
        needle === "" ||
        entry.code.toLowerCase().includes(needle) ||
        entry.name.toLowerCase().includes(needle),
    )
    .slice(0, MAX_VISIBLE);

  return (
    <div className="min-w-0 space-y-2" data-testid="translations-add-picker">
      <Input
        data-testid="translations-add-search"
        value={query}
        aria-label={t("admin.translations.add.pickPlaceholder")}
        placeholder={t("admin.translations.add.pickPlaceholder")}
        onChange={(event) => setQuery(event.target.value)}
      />

      {list.isLoading ? (
        <p className="text-sm text-muted-foreground" data-testid="translations-add-picker-loading">
          {t("admin.translations.add.pickLoading")}
        </p>
      ) : null}

      {list.error ? (
        <p
          role="alert"
          className="text-sm text-destructive"
          data-testid="translations-add-picker-error"
        >
          {t("admin.translations.add.pickError")}
        </p>
      ) : null}

      {!list.isLoading && !list.error ? (
        <ul
          className="max-h-64 min-w-0 space-y-1 overflow-y-auto"
          data-testid="translations-add-options"
        >
          {matches.map((entry) => (
            <li key={entry.code}>
              <Button
                type="button"
                variant="outline"
                className="min-h-11 w-full justify-start"
                data-testid={`translations-add-option-${entry.code}`}
                onClick={() => onSelect(entry)}
              >
                <span className="truncate">{entry.name}</span>
                <span className="ms-2 font-mono text-xs text-muted-foreground">{entry.code}</span>
              </Button>
            </li>
          ))}
          {matches.length === 0 ? (
            <li className="text-sm text-muted-foreground" data-testid="translations-add-no-match">
              {t("admin.translations.add.pickEmpty")}
            </li>
          ) : null}
        </ul>
      ) : null}

      <Button
        type="button"
        variant="ghost"
        className="min-h-11"
        data-testid="translations-add-manual"
        onClick={onManual}
      >
        {t("admin.translations.add.manual")}
      </Button>
    </div>
  );
}

export default LanguagePicker;
