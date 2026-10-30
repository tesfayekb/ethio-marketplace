import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

type FooterColumn = { headingKey: MessageKey; items: MessageKey[] };

const ROUTED: Partial<Record<MessageKey, { to: "/terms" | "/privacy"; testid: string }>> = {
  "footer.terms": { to: "/terms", testid: "footer-terms" },
  "footer.privacy": { to: "/privacy", testid: "footer-privacy" },
};

/**
 * D116 / D135: full-width footer with a brand block and three link columns. D257 (R1d-c):
 * from 768 px the four blocks are sized to their content and spread evenly across the
 * middle column (justify-evenly): the same space before the first, between each pair and
 * after the last. Phones keep three equal centred tracks.
 * Bundle 22 turn 3: Terms and Privacy have routes (/terms, /privacy) and are links;
 * About, Contact and Safety have no routes yet and remain non-navigating text with a
 * 44px target.
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
    <footer className="w-full bg-sidebar shadow-footer">
      <div
        data-testid="footer-columns"
        className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-x-4 gap-y-0 px-4 py-1 md:flex md:max-w-none md:justify-evenly md:gap-x-0 md:px-0 md:py-2"
      >
        <div
          data-testid="footer-brand"
          className="hidden col-span-3 min-w-0 text-center md:block md:text-start"
        >
          <div className="inline-flex flex-col">
            <Link
              to="/"
              data-testid="footer-home"
              aria-label={t("nav.home")}
              className="inline-flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Logo variant="full" />
            </Link>
            <p
              data-testid="footer-tagline"
              className="self-stretch ms-10 text-center text-sm text-muted-foreground"
            >
              {t("app.tagline")}
            </p>
          </div>
        </div>
        {COLUMNS.map((column) => (
          <nav
            key={column.headingKey}
            aria-label={t(column.headingKey)}
            data-testid="footer-column"
            className="min-w-0 text-center md:text-start"
          >
            <h2 className="flex h-7 items-center justify-center text-sm font-semibold text-foreground md:justify-start">
              {t(column.headingKey)}
            </h2>
            <ul className="flex flex-col items-center md:items-start">
              {column.items.map((item) => {
                const route = ROUTED[item];
                return (
                  <li key={item} className="-my-2">
                    {route ? (
                      <Link to={route.to} data-testid={route.testid} className={LINK}>
                        {t(item)}
                      </Link>
                    ) : (
                      <span className={LINK}>{t(item)}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto w-full max-w-5xl shadow-groove-top px-4 py-1 text-center md:px-10 md:py-2">
        <p data-testid="footer-copyright" className="text-sm text-muted-foreground">
          © {year} {t("app.name")} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

export default AppFooter;
