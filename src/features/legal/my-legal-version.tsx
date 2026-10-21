import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import { legalDocName } from "./legal-kinds";
import { legalRefusal, myLegalVersion } from "./legal-reader";
import { LegalText } from "./legal-text";

/** Bundle 22 turn 3 — one version the person accepted or was sent. */
export function MyLegalVersion({ versionId }: { versionId: string }) {
  const { t, language } = useI18n();
  const { user } = useAuth();
  const version = useQuery({
    queryKey: [AUTH_DERIVED_ROOT, "legal", "version", user?.id ?? "", versionId],
    queryFn: () => myLegalVersion(versionId),
    enabled: user !== null,
    retry: false,
  });
  const back = (
    <Button asChild variant="outline" className="min-h-11">
      <Link to="/account/legal" data-testid="my-legal-back">
        {t("myLegal.back")}
      </Link>
    </Button>
  );
  const refusal = version.error ? legalRefusal(version.error) : "";
  return (
    <PageShell as="main" width="wide" data-testid="my-legal-version">
      <div className="min-w-0 space-y-4">
        {version.isPending ? (
          <p role="status">{t("common.loading")}</p>
        ) : version.error ? (
          refusal === "notYours" || refusal === "invalid input syntax for type uuid" ? (
            <p data-testid="my-legal-not-found">{t("myLegal.notFound")}</p>
          ) : (
            <p role="alert" className="text-destructive">
              {t("myLegal.loadError")}
            </p>
          )
        ) : (
          // Bundle 22 turn 20 — the site's language only (C8), on the house card surface (C9).
          <Section>
            <div data-print-root className="min-w-0 space-y-3">
              <h1 className="break-words text-2xl font-semibold text-foreground">
                {legalDocName(version.data, t, language)}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("legal.accept.version")
                  .replace("{n}", String(version.data.version))
                  .replace("{label}", version.data.label)}
              </p>
              <LegalText
                toc
                text={language === "am" ? version.data.body_am : version.data.body_en}
                facts={version.data.settings_snapshot ?? {}}
              />
            </div>
          </Section>
        )}
        {back}
      </div>
    </PageShell>
  );
}
