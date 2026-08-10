import { Link } from "@tanstack/react-router";

import { useI18n } from "@/i18n";

import { useAdminSections } from "./use-admin-sections";

const activeClass = "bg-accent text-accent-foreground";
const idleClass = "text-foreground hover:bg-accent/60";

/**
 * The section nav. Two renderings of ONE list:
 *  - "cards"   → 360px landing: tappable full-width cards (≥44px targets)
 *  - "sidebar" → md+ left pane
 * Section names never appear in this file (law B1/D1) — they come from config.
 */
export function AdminNav({ variant }: { variant: "cards" | "sidebar" }) {
  const { t } = useI18n();
  const { sections } = useAdminSections();

  if (sections.length === 0) return null;

  if (variant === "cards") {
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

  return (
    <nav aria-label={t("admin.nav.label")} data-testid="admin-nav-sidebar">
      <ul className="flex flex-col gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              to={section.path}
              data-testid={`admin-nav-link-${section.id}`}
              activeProps={{ className: activeClass }}
              inactiveProps={{ className: idleClass }}
              className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t(section.titleKey)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
