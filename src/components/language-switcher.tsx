import { Check, ChevronDown, Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";
import { SUPPORTED_LANGUAGES, type Language } from "@/i18n/types";
import { cn } from "@/lib/utils";

const LABEL_KEYS = {
  en: "language.english",
  am: "language.amharic",
} as const;

const SHORT_KEYS = {
  en: "language.enShort",
  am: "language.amShort",
} as const;

/**
 * ONE language affordance at EVERY width: a compact "EN ▾" control whose menu
 * lists all languages INCLUDING the current one (ticked), so users recognise
 * the same control on a phone and on a desktop and can always see which
 * language they are in. There is deliberately no second, wider variant.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-testid="language-switcher"
          aria-label={t("language.label")}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm font-medium",
            "text-muted-foreground hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
        >
          <Languages className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span lang={language}>{t(SHORT_KEYS[language])}</span>
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGUAGES.map((code: Language) => (
          <DropdownMenuItem key={code} lang={code} onSelect={() => setLanguage(code)}>
            <Check
              aria-hidden="true"
              className={cn("me-2 h-4 w-4", code === language ? "opacity-100" : "opacity-0")}
            />
            {t(LABEL_KEYS[code])}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
