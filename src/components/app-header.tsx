import { Link } from "@tanstack/react-router";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/i18n";

export function AppHeader() {
  const { t } = useI18n();

  return (
    <header className="w-full border-b border-border bg-background">
      <nav
        aria-label={t("nav.home")}
        className="mx-auto flex min-h-14 w-full max-w-5xl flex-wrap items-center justify-between gap-2 ps-4 pe-4 py-2"
      >
        <Link
          to="/"
          className="text-base font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("app.name")}
        </Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}

export default AppHeader;
