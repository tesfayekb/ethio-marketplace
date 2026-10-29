import { Link } from "@tanstack/react-router";
import { PageCard } from "@/components/shell/page-card";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { useI18n, type MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import { kindKey, type LegalHistoryRow } from "./legal-service";
import { useUserLegalHistory } from "./use-legal";
import { languageRowName } from "@/lib/format-locale";
import { dateFormatter } from "@/lib/format";

export function UserLegalCard({ userId }: { userId: string }) {
  const { t, language, publicLanguages } = useI18n();
  const { permissions } = useAdminShell();
  const history = useUserLegalHistory(userId);
  const countries = useCountries();
  const date = (value?: string) =>
    value ? dateFormatter("dayTimeZone", language).format(new Date(value)) : "—";
  const caption = (row: LegalHistoryRow) => {
    const key = kindKey(row.kind);
    return `${key ? t(key) : row.kind} · ${row.country_code ? (countries.data?.find((c) => c.code === row.country_code)?.nameEn ?? row.country_code) : t("admin.legal.scope.global")} · ${t("admin.legal.version").replace("{n}", String(row.version))}${row.label ? ` · ${row.label}` : ""}`;
  };
  const document = (row: LegalHistoryRow) =>
    permissions.includes("legal:view") ? (
      <Link
        className="break-words text-primary underline underline-offset-4"
        to="/admin/legal/$versionId"
        params={{ versionId: row.version_id }}
      >
        {caption(row)}
      </Link>
    ) : (
      <span className="break-words">{caption(row)}</span>
    );
  const statusKeys: Record<string, MessageKey> = {
    sent: "admin.users.legal.status.sent",
    failed: "admin.users.legal.status.failed",
    bounced: "admin.users.legal.status.bounced",
  };
  return (
    <PageCard testid="user-legal-card" className="space-y-3">
      <h2 className="text-sm font-semibold">{t("admin.users.legal.title")}</h2>
      {history.isPending ? (
        <p role="status">{t("common.loading")}</p>
      ) : history.error ? (
        <p role="alert" className="text-destructive">
          {t("admin.legal.error.load")}
        </p>
      ) : null}
      <h3 className="text-sm font-medium">{t("admin.users.legal.accepted")}</h3>
      <ul className="space-y-2 text-sm">
        {history.data?.acceptances.map((row) => (
          <li
            key={row.version_id}
            data-testid="user-legal-acceptance"
            className="min-w-0 space-y-1"
          >
            {document(row)}
            <p className="break-words text-muted-foreground">
              {t("admin.users.legal.acceptedAt")
                .replace("{date}", date(row.accepted_at))
                .replace(
                  "{language}",
                  row.language === "en" || row.language === "am"
                    ? t(`admin.legal.lang.${row.language}`)
                    : row.language
                      ? languageRowName(row.language, publicLanguages)
                      : "",
                )
                .replace("{method}", row.method ?? "")}
            </p>
            {row.adult_confirmed ? (
              <p data-testid="user-legal-adult" className="text-muted-foreground">
                {t("admin.users.legal.adult")}
              </p>
            ) : null}
            {row.data_consent ? (
              <p data-testid="user-legal-consent" className="text-muted-foreground">
                {t("admin.users.legal.consent")}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      {history.data && !history.data.acceptances.length ? (
        <p data-testid="user-legal-no-acceptances" className="text-sm text-muted-foreground">
          {t("admin.users.legal.noAcceptances")}
        </p>
      ) : null}
      <h3 className="text-sm font-medium">{t("admin.users.legal.notices")}</h3>
      <ul className="space-y-2 text-sm">
        {history.data?.notices.map((row, index) => {
          const key = ownValue(statusKeys, row.status ?? "");
          return (
            <li
              key={`${row.version_id}-${index}`}
              data-testid="user-legal-notice"
              className="min-w-0 space-y-1"
            >
              {document(row)}
              <p className="text-muted-foreground">
                {t("admin.users.legal.noticeMeta")
                  .replace("{date}", date(row.sent_at))
                  .replace("{status}", key ? t(key) : (row.status ?? ""))}
              </p>
            </li>
          );
        })}
      </ul>
      {history.data && !history.data.notices.length ? (
        <p data-testid="user-legal-no-notices" className="text-sm text-muted-foreground">
          {t("admin.users.legal.noNotices")}
        </p>
      ) : null}
    </PageCard>
  );
}
