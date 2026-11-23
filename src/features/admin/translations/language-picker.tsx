import { FieldSelect } from "@/components/forms/field-select";

import { Button } from "@/components/ui/button";
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

export function LanguagePicker({
  onSelect,
  onManual,
}: {
  onSelect: (language: ProviderLanguage) => void;
  onManual: () => void;
}) {
  const { t } = useI18n();
  const list = useProviderLanguages(true);

  const all = (list.data ?? []).filter((entry) => !FENCE_RE.test(entry.code));

  return (
    <div className="min-w-0 space-y-2" data-testid="translations-add-picker">
      <FieldSelect
        id="translations-add-option"
        field="code"
        label={t("admin.translations.add.pick")}
        required={false}
        refusal={null}
        options={all.map((entry) => ({
          value: entry.code,
          label: `${entry.name} (${entry.code})`,
        }))}
        value={[]}
        onChange={(next) => {
          const entry = all.find((language) => language.code === next[0]);
          if (entry !== undefined) onSelect(entry);
        }}
        placeholder={t("admin.translations.add.pickPlaceholder")}
        state={list.error ? "failed" : list.isLoading ? "loading" : "ready"}
        loadingLabel={t("admin.translations.add.pickLoading")}
        failedLabel={t("admin.translations.add.pickError")}
        statusTestId={
          list.error ? "translations-add-picker-error" : "translations-add-picker-loading"
        }
      />

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
