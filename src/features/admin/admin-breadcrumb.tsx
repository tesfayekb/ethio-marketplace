import { Link } from "@tanstack/react-router";

import { useI18n } from "@/i18n";

import type { AdminSection } from "./sections";

/** Breadcrumb: Admin / <Section>. Root is always a link back to the landing. */
export function AdminBreadcrumb({ section }: { section: AdminSection | null }) {
  const { t } = useI18n();
  return (
    <nav aria-label={t("admin.breadcrumb.root")} data-testid="admin-breadcrumb">
      <ol className="flex min-w-0 flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <li className="min-w-0">
          <Link
            to="/admin"
            className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("admin.breadcrumb.root")}
          </Link>
        </li>
        {section ? (
          <>
            <li aria-hidden="true">/</li>
            <li className="min-w-0 truncate font-medium text-foreground">{t(section.titleKey)}</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
