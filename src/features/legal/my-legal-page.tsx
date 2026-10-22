import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n, type MessageKey } from "@/i18n";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import { ownValue } from "@/lib/own-key";
import { legalMoment } from "./legal-kinds";
import { legalDocName } from "./legal-kinds";
import { myLegalHistory } from "./legal-reader";
import { languageRowName } from "@/lib/format-locale";

const STATUS_KEYS: Record<string, MessageKey> = {
  sent: "myLegal.status.sent",
  failed: "myLegal.status.failed",
  bounced: "myLegal.status.bounced",
};

/** Bundle 22 turn 3 — the person's legal documents: what he accepted and the legal e-mails sent to him. */
export function MyLegalPage() {
  const { t, language } = useI18n();
  const { user } = useAuth();
  const history = useQuery({
    queryKey: [AUTH_DERIVED_ROOT, "legal", "history", user?.id ?? ""],
    queryFn: myLegalHistory,
    enabled: user !== null,
    retry: false,
  });
  const newest = <T,>(rows: T[], at: (row: T) => string) =>
    [...rows].sort((a, b) => Date.parse(at(b)) - Date.parse(at(a)));
  const open = (id: string) => (
    <Button asChild variant="outline" className="min-h-11">
      <Link to="/account/legal/$versionId" params={{ versionId: id }} data-testid="my-legal-open">
        {t("myLegal.open")}
      </Link>
    </Button>
  );
  const version = (row: { version: number; label: string }) =>
    t("legal.accept.version").replace("{n}", String(row.version)).replace("{label}", row.label);
  return (
    <PageShell as="main" width="wide" data-testid="my-legal-page">
      <div className="min-w-0 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">{t("myLegal.title")}</h1>
        {history.isPending ? (
          <p role="status">{t("common.loading")}</p>
        ) : history.error ? (
          <p role="alert" className="text-destructive">
            {t("myLegal.loadError")}
          </p>
        ) : (
          <>
            <Section title={t("myLegal.accepted")} className="space-y-3">
              {history.data.acceptances.length === 0 ? (
                <p data-testid="my-legal-no-acceptances" className="text-muted-foreground">
                  {t("myLegal.noAcceptances")}
                </p>
              ) : (
                <ul className="space-y-3">
                  {newest(history.data.acceptances, (a) => a.accepted_at).map((row) => (
                    <li
                      key={row.version_id}
                      data-testid="my-legal-acceptance"
                      data-version-id={row.version_id}
                      className="min-w-0 space-y-1"
                    >
                      <p className="break-words font-medium">
                        {legalDocName(row, t, language)} · {version(row)}
                      </p>
                      <p className="break-words text-sm text-muted-foreground">
                        {t("myLegal.acceptedMeta")
                          .replace("{date}", legalMoment(row.accepted_at, language))
                          .replace(
                            "{language}",
                            row.language === "en" || row.language === "am"
                              ? t(`legal.lang.${row.language}`)
                              : languageRowName(row.language, publicLanguages),
                          )}
                      </p>
                      {row.adult_confirmed ? (
                        <p className="text-sm text-muted-foreground">{t("myLegal.adult")}</p>
                      ) : null}
                      {row.data_consent ? (
                        <p data-testid="my-legal-consent" className="text-sm text-muted-foreground">
                          {t("myLegal.consent")}
                        </p>
                      ) : null}
                      {open(row.version_id)}
                    </li>
                  ))}
                </ul>
              )}
            </Section>
            <Section title={t("myLegal.notices")} className="space-y-3">
              {history.data.notices.length === 0 ? (
                <p data-testid="my-legal-no-notices" className="text-muted-foreground">
                  {t("myLegal.noNotices")}
                </p>
              ) : (
                <ul className="space-y-3">
                  {newest(history.data.notices, (n) => n.sent_at).map((row, index) => {
                    const status = ownValue(STATUS_KEYS, row.status);
                    return (
                      <li
                        key={`${row.version_id}-${index}`}
                        data-testid="my-legal-notice"
                        className="min-w-0 space-y-1"
                      >
                        <p className="break-words font-medium">
                          {legalDocName(row, t, language)} · {version(row)}
                        </p>
                        <p className="break-words text-sm text-muted-foreground">
                          {t("myLegal.noticeMeta")
                            .replace("{status}", status ? t(status) : row.status)
                            .replace("{date}", legalMoment(row.sent_at, language))}
                        </p>
                        {open(row.version_id)}
                      </li>
                    );
                  })}
                </ul>
              )}
            </Section>
          </>
        )}
      </div>
    </PageShell>
  );
}
