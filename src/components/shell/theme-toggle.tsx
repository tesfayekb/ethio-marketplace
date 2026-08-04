import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/providers/theme-provider";
import { useI18n } from "@/i18n";

/**
 * Sun/moon theme toggle. Both icons are always in the DOM and swapped by the
 * `dark:` variant, so the button renders identically on the server and the
 * client — no hydration mismatch, no flash, no mode-dependent SSR markup.
 */
export function ThemeToggle() {
  const { t } = useI18n();
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("shell.themeToggle")}
      data-testid="theme-toggle"
      className="inline-flex min-h-11 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Sun className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
