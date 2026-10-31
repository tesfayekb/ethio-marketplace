import { compareCodes } from "@/lib/reader-locale";
import { CutText } from "@/components/ui/cut-text";
import { ChevronDown, Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";
import type { Language } from "@/i18n/types";
import { cn } from "@/lib/utils";
import { LIST_ROW_CURRENT, OPEN_CONTROL } from "@/components/shell/menu-row";

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
 * (checked). There is deliberately no second control.
 *
 * U4f (INC-098) — the OPTIONS come from the publication gate's own source (the
 * `languages` table's public RLS SELECT: enabled_public OR is_base), ordered by
 * `sort`, labelled with the native name. A static list is exactly the bug: a
 * consumer of a gated list must read the gate.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, t, publicLanguages, setStar } = useI18n();

  const shortKey = SHORT_KEYS[language as keyof typeof SHORT_KEYS];
  const fullKey = LABEL_KEYS[language as keyof typeof LABEL_KEYS];
  const activeRow = publicLanguages.find((row) => row.code === language);
  const shortLabel = shortKey ? t(shortKey) : language.toUpperCase();
  const fullLabel = fullKey ? t(fullKey) : (activeRow?.name_native ?? language);

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
            OPEN_CONTROL,
            className,
          )}
        >
          {/* TWO labels, one visible at a time. They are marked so a test (or
              anything else reading the control) can assert the RENDERED label
              rather than the button's concatenated text content (INC-033). */}
          <Globe className="me-1 h-4 w-4 shrink-0 text-leaf-ink" aria-hidden="true" />
          <span lang={language} data-testid="language-switcher-short" className="md:hidden">
            {shortLabel}
          </span>
          <span lang={language} data-testid="language-switcher-full" className="hidden md:inline">
            {fullLabel}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* D237 — one choice per device: the pick stars (localStorage + cookie,
            read by every tab and by SSR) and saves the account preference; no
            separate star control. (sort, code) is the SAME ordering law the
            admin roster applies (U4g-3, INC-099b); one row per language on ONE
            line (U4i-4 (c), INC-123). */}
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(code) => setStar(code as Language)}
        >
          {[...publicLanguages]
            .sort((a, b) => a.sort - b.sort || compareCodes(a.code, b.code))
            .map((row) => {
              const key = LABEL_KEYS[row.code as keyof typeof LABEL_KEYS];
              return (
                <DropdownMenuRadioItem
                  key={row.code}
                  value={row.code}
                  lang={row.code}
                  data-testid={`language-option-${row.code}`}
                  // D264 (turn F) — the menu's own row (LIST_ROW, 44 px to tap);
                  // the current language takes the shell's selected look.
                  className={cn(row.code === language && LIST_ROW_CURRENT)}
                >
                  <CutText className="flex-1" text={key ? t(key) : row.name_native} />
                </DropdownMenuRadioItem>
              );
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
