import { PageCard } from "@/components/shell/page-card";
import { useI18n } from "@/i18n";

import { sectionById, type AdminSectionId } from "./sections";

/**
 * Every U0 section page: a title and an i18n'd empty-state card naming its
 * epoch step. No fake UI ships this phase.
 *
 * U0c: the breadcrumb (shell-owned, src/components/shell/breadcrumbs.tsx) is
 * the single navigation row on admin routes — this page carries no breadcrumb
 * of its own and no "Back to Admin" button; the breadcrumb's Admin segment is
 * the way back on every viewport.
 */
export function AdminSectionPage({ id }: { id: AdminSectionId }) {
  const { t } = useI18n();
  const section = sectionById(id);

  return (
    <div data-testid={`admin-section-${id}`}>
      <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
        {t(section.titleKey)}
      </h1>

      <PageCard dashed className="mt-4">
        <h2 className="text-sm font-semibold text-foreground">{t("admin.comingSoon")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t(section.bodyKey)}</p>
      </PageCard>
    </div>
  );
}
