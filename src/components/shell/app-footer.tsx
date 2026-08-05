import { Link } from "@tanstack/react-router";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

type FooterColumn = { headingKey: MessageKey; items: MessageKey[] };

/**
 * Three COMPACT columns, centred as a group AND centred within themselves,
 * with the © line on its own centred row below. Flat surface, no woven band,
 * no gradient (see the motif rule in docs/features/panels.md).
 *
 * Compactness without losing the target: the rows are visually tight
 * (leading-tight, no row gap) while each link keeps its 44px tap height.
 *
 * TODO(footer-links): About / How it works / Safety / Terms / Privacy /
 * Contact have no routes yet; they render as non-navigating text buttons so
 * they are still keyboard-reachable and correctly sized.
 */
const COLUMNS: FooterColumn[] = [
  { headingKey: "footer.sectionCompany", items: ["footer.about", "footer.howItWorks"] },
  { headingKey: "footer.sectionHelp", items: ["footer.safety", "footer.contact"] },
  { headingKey: "footer.sectionLegal", items: ["footer.terms", "footer.privacy"] },
];

const LINK =
  "inline-flex min-h-11 items-center justify-center text-sm leading-tight text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded";

export function AppFooter() {
  const { t } = useI18n();
  const year = new Date().getUTCFullYear();

  return (
    <footer className="w-full border-t border-border bg-card">
      <div
        data-testid="footer-columns"
        className="mx-auto flex w-full max-w-3xl justify-center gap-6 px-4 py-3"
      >
        {COLUMNS.map((column, index) => (
          <nav
            key={column.headingKey}
            aria-label={t(column.headingKey)}
            className="min-w-0 flex-1 text-center"
          >
            <h2 className="text-sm font-semibold leading-tight text-foreground">
              {t(column.headingKey)}
            </h2>
            <ul className="flex flex-col items-center">
              {index === 0 ? (
                <li>
                  <Link to="/" className={LINK}>
                    {t("nav.home")}
                  </Link>
                </li>
              ) : null}
              {column.items.map((item) => (
                <li key={item}>
                  <span className={LINK}>{t(item)}</span>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border px-4 py-2 text-center">
        <p data-testid="footer-copyright" className="text-sm text-muted-foreground">
          © {year} {t("app.name")} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

export default AppFooter;
