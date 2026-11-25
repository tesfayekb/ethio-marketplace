import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { useShell } from "@/components/shell-context";
import { useI18n } from "@/i18n";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import { legalDocName } from "./legal-kinds";
import { legalRefusal, legalTextFor, myLegalVersion } from "./legal-reader";
import { LegalText } from "./legal-text";
import { FailureNotice } from "@/components/shell/failure-notice";
import { UUID_RE } from "@/lib/uuid";

/** Bundle 22 turn 3 — one version the person accepted or was sent. */
export function MyLegalVersion({ versionId }: { versionId: string }) {
  const { t, language } = useI18n();
  const { user } = useShell();
  const version = useQuery({
    queryKey: [AUTH_DERIVED_ROOT, "legal", "version", user?.id ?? "", versionId],
    queryFn: () => myLegalVersion(versionId),
    // D28 — an address that is not an id is not found, by its shape: no read, no database sentence.
    enabled: user !== null && UUID_RE.test(versionId),
    retry: false,
  });
  const back = (
    <Button asChild variant="outline" className="min-h-11">
      <Link to="/account/legal" data-testid="my-legal-back">
        {t("myLegal.back")}
      </Link>
    </Button>
  );
  const selected = version.data ? legalTextFor(version.data, language) : null;
  const refusal = version.error ? legalRefusal(version.error) : "";
  return (
    <PageShell as="main" width="wide" data-testid="my-legal-version">
      <div className="min-w-0 space-y-4">
        {!UUID_RE.test(versionId) ? (
          <p data-testid="my-legal-not-found">{t("myLegal.notFound")}</p>
        ) : version.isPending ? (
          <p role="status">{t("common.loading")}</p>
        ) : version.error ? (
          refusal === "notYours" ? (
            <p data-testid="my-legal-not-found">{t("myLegal.notFound")}</p>
          ) : (
            <FailureNotice
              error={version.error}
              testid="my-legal-version-failed"
              subject={t("myLegal.loadError")}
              onRetry={() => void version.refetch()}
            />
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
              {selected?.fallback ? (
                <p data-testid="legal-fallback-note" className="text-sm text-muted-foreground">
                  {t("legal.fallbackNote")}
                </p>
              ) : null}
              <LegalText
                toc
                text={selected?.text ?? ""}
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
