import { Link } from "@tanstack/react-router";

import { useI18n } from "@/i18n";

import { useAdminSections } from "./use-admin-sections";

/**
 * The landing's section grid: tappable full-width cards (≥44px targets), the
 * index content of /admin on 360px and the card grid on md+.
 *
 * U0b (INC-069): the md+ sidebar variant is GONE — section navigation belongs
 * to the shell rail/drawer, the same seam Account and My Listings use. Section
 * names never appear in this file (law B1/D1) — they come from config.
 */
export function AdminNav() {
  const { t } = useI18n();
  const { sections } = useAdminSections();

  if (sections.length === 0) return null;

  return (
    <nav aria-label={t("admin.nav.label")} data-testid="admin-nav-cards">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              to={section.path}
              data-testid={`admin-section-link-${section.id}`}
              className="flex min-h-16 flex-col justify-center rounded-lg border border-border bg-card p-4 text-start transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-sm font-semibold text-foreground">{t(section.titleKey)}</span>
              <span className="mt-1 text-xs text-muted-foreground">{t(section.bodyKey)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
