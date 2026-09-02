import { Check, ChevronDown, Star } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";
import type { Language } from "@/i18n/types";
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
 *
 * U4f (INC-098) — the OPTIONS come from the publication gate's own source (the
 * `languages` table's public RLS SELECT: enabled_public OR is_base), ordered by
 * `sort`, labelled with the native name. A static list is exactly the bug: a
 * consumer of a gated list must read the gate.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage, t, publicLanguages, star, setStar } = useI18n();

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
            className,
          )}
        >
          {/* TWO labels, one visible at a time. They are marked so a test (or
              anything else reading the control) can assert the RENDERED label
              rather than the button's concatenated text content (INC-033). */}
          <span lang={language} data-testid="language-switcher-short" className="md:hidden">
            {shortLabel}
          </span>
          <span lang={language} data-testid="language-switcher-full" className="hidden md:inline">
            {fullLabel}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-1">
        {/* U4g-3 (INC-099b) — (sort, code): the SAME ordering law the admin
            roster applies, so what the operator arranges is what visitors see.
            U4i-4 (c) (INC-123) — DENSITY IS A CONTROL, NOT A CANVAS: one row
            per language on ONE line (check · label · star), ~12rem wide, no
            vertical slack. The star keeps a ≥44px touch target on phones via
            padding and shrinks to an icon-sized hit area from `md` up. */}
        {[...publicLanguages]
          .sort((a, b) => a.sort - b.sort || a.code.localeCompare(b.code))
          .map((row) => {
            const key = LABEL_KEYS[row.code as keyof typeof LABEL_KEYS];
            const starred = star === row.code;
            return (
              <DropdownMenuItem
                key={row.code}
                lang={row.code}
                data-testid={`language-option-${row.code}`}
                // U4i-6 (c) — DENSITY IS A CONTROL (INC-124): rows at half the
                // previous vertical rhythm; the 12rem menu width is unchanged.
                className="flex min-w-0 items-center gap-1 py-0.5 pe-1 ps-2 leading-tight"
                onSelect={() => setLanguage(row.code as Language)}
              >
                <Check
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0",
                    row.code === language ? "opacity-100" : "opacity-0",
                  )}
                />
                <span className="min-w-0 flex-1 truncate">{key ? t(key) : row.name_native}</span>
                {/* U4h — the DEVICE ★. One favourite: `aria-pressed` is true on
                    exactly one row because the provider's setter REPLACES the
                    star rather than appending to a set. The click never reaches
                    the menu item's own select handler — starring already
                    selects, and a double-apply would fight it. */}
                <button
                  type="button"
                  data-testid={`language-star-${row.code}`}
                  aria-pressed={starred}
                  aria-label={t(starred ? "language.starred" : "language.star")}
                  title={t(starred ? "language.starred" : "language.star")}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setStar(row.code as Language);
                  }}
                  className={cn(
                    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md md:h-9 md:w-9",
                    "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    starred ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Star aria-hidden="true" className={cn("h-4 w-4", starred && "fill-current")} />
                </button>
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
