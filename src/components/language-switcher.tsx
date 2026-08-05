import { Check, ChevronDown } from "lucide-react";

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
 * ONE language affordance at EVERY width, in two presentations split at `md`:
 * phones get the compact code ("EN ▾") because the bar is minimized there;
 * tablets and up get the language NAME ("English ▾"), so nothing has to be
 * decoded. Either way the menu lists all languages INCLUDING the current one
 * (ticked). There is deliberately no second control.
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
            "inline-flex min-h-11 shrink-0 items-center gap-0.5 rounded-md px-1.5 text-sm font-medium",
            "text-muted-foreground hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
        >
          {/* TWO labels, one visible at a time. They are marked so a test (or
              anything else reading the control) can assert the RENDERED label
              rather than the button's concatenated text content (INC-033). */}
          <span lang={language} data-testid="language-switcher-short" className="md:hidden">
            {t(SHORT_KEYS[language])}
          </span>
          <span lang={language} data-testid="language-switcher-full" className="hidden md:inline">
            {t(LABEL_KEYS[language])}
          </span>
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
