import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

type FooterColumn = { headingKey: MessageKey; items: MessageKey[] };

/**
 * D116 / D135: full-width footer with a brand block and three equal link columns.
 * TODO(footer-links): About / Safety / Terms / Privacy / Contact have no routes
 * yet; they remain non-navigating text with a 44px target.
 */
const COLUMNS: FooterColumn[] = [
  { headingKey: "footer.sectionCompany", items: ["footer.about", "footer.contact"] },
  { headingKey: "footer.sectionHelp", items: ["footer.safety"] },
  { headingKey: "footer.sectionLegal", items: ["footer.terms", "footer.privacy"] },
];

const LINK =
  "inline-flex min-h-11 items-center justify-center rounded text-sm leading-tight text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:justify-start";

export function AppFooter() {
  const { t } = useI18n();
  const year = new Date().getUTCFullYear();

  return (
    <footer className="w-full bg-card shadow-bar-up">
      <div
        data-testid="footer-columns"
        className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-x-4 gap-y-0 px-4 py-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-x-8 md:px-10 md:py-8"
      >
        <div
          data-testid="footer-brand"
          className="hidden col-span-3 min-w-0 text-center md:block md:col-span-1 md:text-start"
        >
          <Link
            to="/"
            data-testid="footer-home"
            aria-label={t("nav.home")}
            className="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo variant="full" />
          </Link>
          <p className="text-sm text-muted-foreground">{t("app.tagline")}</p>
        </div>
        {COLUMNS.map((column) => (
          <nav
            key={column.headingKey}
            aria-label={t(column.headingKey)}
            className="min-w-0 text-center md:text-start"
          >
            <h2 className="flex h-7 items-center justify-center text-sm font-semibold text-foreground md:justify-start">
              {t(column.headingKey)}
            </h2>
            <ul className="flex flex-col items-center md:items-start">
              {column.items.map((item) => (
                <li key={item} className="-my-2">
                  <span className={LINK}>{t(item)}</span>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto w-full max-w-5xl border-t border-neutral-soft px-4 py-1.5 text-center md:px-10 md:py-2 md:text-start">
        <p data-testid="footer-copyright" className="text-sm text-muted-foreground">
          © {year} {t("app.name")} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

export default AppFooter;
