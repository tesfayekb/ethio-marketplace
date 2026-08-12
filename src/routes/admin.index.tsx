import { createFileRoute } from "@tanstack/react-router";

import { useAdminShell } from "@/features/admin/admin-context";
import { AdminNav } from "@/features/admin/admin-nav";
import { useAdminSections } from "@/features/admin/use-admin-sections";
import { useI18n } from "@/i18n";

/**
 * The admin landing: the permitted-sections grid, or an honest empty state.
 *
 * U0d (INC-070) — STANDING DESIGN RULE: a panel's landing page presents its
 * items as clickable cards in the body (AdminNav), permission-filtered, each
 * card carrying the section title and its "arrives in Un" description. This
 * theme is applied to every panel as it is built.
 */
export const Route = createFileRoute("/admin/")({
  component: AdminLanding,
});

function AdminLanding() {
  const { t } = useI18n();
  const { accessDenied } = useAdminShell();
  const { sections } = useAdminSections();

  return (
    <div data-testid="admin-landing">
      <h1 className="text-lg font-semibold text-foreground">{t("admin.landing.title")}</h1>

      {accessDenied ? (
        <p
          role="alert"
          data-testid="admin-access-notice"
          className="mt-3 rounded-md border border-border bg-muted p-3 text-sm text-foreground"
        >
          {t("admin.accessDenied")}
        </p>
      ) : null}

      {sections.length === 0 ? (
        <section
          data-testid="admin-no-sections"
          className="mt-4 rounded-lg border border-dashed border-border bg-card p-6"
        >
          <h2 className="text-sm font-semibold text-foreground">{t("admin.noSections.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("admin.noSections.body")}</p>
        </section>
      ) : (
        <>
          <p className="mt-2 text-sm text-muted-foreground">{t("admin.landing.body")}</p>
          <div className="mt-4">
            <AdminNav />
          </div>
        </>
      )}
    </div>
  );
}
