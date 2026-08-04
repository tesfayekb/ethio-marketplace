import { useI18n } from "@/i18n";
import { SUPPORTED_LANGUAGES, type Language } from "@/i18n/types";
import { cn } from "@/lib/utils";

const LABEL_KEYS = {
  en: "language.english",
  am: "language.amharic",
} as const;

/** Short codes for the compact top-bar presentation. Same logic, less width. */
const SHORT_KEYS = {
  en: "language.enShort",
  am: "language.amShort",
} as const;

/**
 * `compact` shrinks the PRESENTATION only (short codes, tighter padding, no
 * bounding box). The accessible name stays the full language name in both
 * variants, so assistive tech and tests address the same control either way.
 */
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={cn(
        "inline-flex shrink-0 items-center",
        compact ? "gap-0" : "gap-1 rounded-md border border-border p-1",
      )}
    >
      {SUPPORTED_LANGUAGES.map((code: Language) => {
        const active = code === language;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={t(LABEL_KEYS[code])}
            onClick={() => setLanguage(code)}
            className={cn(
              "min-h-11 rounded text-sm font-medium transition-colors",
              compact ? "px-2" : "min-w-11 px-3",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? compact
                  ? "text-primary"
                  : "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {t(compact ? SHORT_KEYS[code] : LABEL_KEYS[code])}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
