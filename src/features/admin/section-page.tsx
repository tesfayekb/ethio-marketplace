import { Link } from "@tanstack/react-router";

import { useI18n } from "@/i18n";

import { AdminBreadcrumb } from "./admin-breadcrumb";
import { sectionById, type AdminSectionId } from "./sections";

/**
 * Every U0 section page: breadcrumb, a back affordance (the only nav on 360px
 * once inside a section) and an i18n'd empty-state card naming its epoch step.
 * No fake UI ships this phase.
 */
export function AdminSectionPage({ id }: { id: AdminSectionId }) {
  const { t } = useI18n();
  const section = sectionById(id);

  return (
    <div data-testid={`admin-section-${id}`}>
      <AdminBreadcrumb section={section} />

      <div className="mt-3 flex min-w-0 items-center justify-between gap-3">
        <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
          {t(section.titleKey)}
        </h1>
        <Link
          to="/admin"
          data-testid="admin-section-back"
          className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-border px-3 text-sm text-foreground hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        >
          {t("admin.back")}
        </Link>
      </div>

      <section className="mt-4 rounded-lg border border-dashed border-border bg-card p-6">
        <h2 className="text-sm font-semibold text-foreground">{t("admin.comingSoon")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t(section.bodyKey)}</p>
      </section>
    </div>
  );
}
