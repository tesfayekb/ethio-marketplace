import { Link } from "@tanstack/react-router";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

type FooterColumn = { headingKey: MessageKey; items: MessageKey[] };

/**
 * Plain, functional footer. Flat surface, no woven band, no gradient
 * (see the motif rule in docs/features/panels.md).
 *
 * TODO(footer-links): About / How it works / Safety / Terms / Privacy / Contact
 * have no routes yet; they render as plain text until those pages land.
 */
const COLUMNS: FooterColumn[] = [
  { headingKey: "footer.sectionCompany", items: ["footer.about", "footer.howItWorks"] },
  { headingKey: "footer.sectionHelp", items: ["footer.safety", "footer.contact"] },
  { headingKey: "footer.sectionLegal", items: ["footer.terms", "footer.privacy"] },
];

export function AppFooter() {
  const { t } = useI18n();
  const year = new Date().getUTCFullYear();

  return (
    <footer className="mt-8 w-full border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map((column) => (
          <nav key={column.headingKey} aria-label={t(column.headingKey)}>
            <h2 className="text-sm font-semibold text-foreground">{t(column.headingKey)}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {column.items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  {t(item)}
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="flex flex-col items-start gap-3">
          <LanguageSwitcher />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            {t("nav.home")}
          </Link>
          <p className="text-sm text-muted-foreground">
            © {year} {t("app.name")} — {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
