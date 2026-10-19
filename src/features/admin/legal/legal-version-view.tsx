import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { LegalText } from "@/features/legal/legal-text";
import { useI18n } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import { FACT_KEYS, kindKey, versionStatus } from "./legal-service";
import { useLegalDocuments, useLegalSettings, useLegalVersion } from "./use-legal";

export function LegalVersionView({ versionId }: { versionId: string }) {
  const { t, language } = useI18n();
  const { permissions } = useAdminShell();
  const version = useLegalVersion(versionId);
  const settings = useLegalSettings();
  const documents = useLegalDocuments();
  const countries = useCountries();
  const [lang, setLang] = useState<"en" | "am">("en");
  const row = version.data;
  const siblings = documents.data?.find((doc) => doc.document_id === row?.document_id)?.versions;
  const unknown =
    (version.error instanceof Error && version.error.message === "unknownVersion") ||
    (version.error as { message?: string } | null)?.message === "unknownVersion";
  const kind = row ? kindKey(row.kind) : null;
  const facts = row?.status === "published" ? (row.settings_snapshot ?? {}) : (settings.data ?? {});
  const date = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
          dateStyle: "medium",
          timeZone: "UTC",
        }).format(new Date(value))
      : "—";
  return (
    <div data-testid="legal-version-view" className="min-w-0 space-y-4">
      {version.isPending || documents.isPending ? <p role="status">{t("common.loading")}</p> : null}
      {unknown ? (
        <p data-testid="legal-version-not-found">{t("admin.legal.notFound")}</p>
      ) : version.error || settings.error || documents.error ? (
        <p role="alert" className="text-destructive">
          {t("admin.legal.error.load")}
        </p>
      ) : null}
      {row ? (
        <>
          <h1 className="break-words text-lg font-semibold">
            {kind ? t(kind) : row.kind}
            {" · "}
            {row.country_code
              ? (countries.data?.find((c) => c.code === row.country_code)?.nameEn ??
                row.country_code)
              : t("admin.legal.scope.global")}
            {" · "}
            {t("admin.legal.version").replace("{n}", String(row.version))}
            {" · "}
            {row.label}
          </h1>
          {siblings ? (
            <p>
              {t(`admin.legal.status.${versionStatus(row, siblings, Date.now())}`).replace(
                "{date}",
                date(row.effective_at),
              )}
            </p>
          ) : null}
          {row.status === "published" ? (
            <>
              <p>
                {t("admin.legal.publish.effective")}
                {": "}
                {date(row.effective_at)}
              </p>
              <p>{t("admin.legal.publishedOn").replace("{date}", date(row.published_at))}</p>
            </>
          ) : null}
          <section className="space-y-2">
            <h2 className="font-semibold">{t("admin.legal.view.changelog")}</h2>
            <p data-testid="legal-view-changelog" className="whitespace-pre-line break-words">
              {row.changelog}
            </p>
          </section>
          <div className="flex gap-2">
            {(["en", "am"] as const).map((l) => (
              <Button
                key={l}
                data-testid={`legal-view-tab-${l}`}
                variant={l === lang ? "default" : "outline"}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
              >
                {t(`admin.legal.lang.${l}`)}
              </Button>
            ))}
          </div>
          <LegalText text={lang === "en" ? row.body_en : row.body_am} facts={facts} toc />
          {row.status === "published" ? (
            <section data-testid="legal-view-facts" className="space-y-3">
              <h2 className="font-semibold">{t("admin.legal.view.facts")}</h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                {FACT_KEYS.map((key) => (
                  <div key={key} className="min-w-0">
                    <dt className="text-sm font-medium">{t(`admin.legal.fact.${key}`)}</dt>
                    <dd className="whitespace-pre-line break-words text-sm">
                      {String(ownValue(facts, key) ?? t("admin.legal.facts.notSet"))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : (
            <>
              <p>{t("admin.legal.view.draftFacts")}</p>
              {permissions.includes("legal:edit") ? (
                <Button asChild data-testid="legal-edit-draft">
                  <Link
                    to="/admin/legal/edit"
                    search={{
                      kind: row.kind,
                      ...(row.country_code ? { country: row.country_code } : {}),
                    }}
                  >
                    {t("admin.legal.action.editDraft")}
                  </Link>
                </Button>
              ) : null}
            </>
          )}
        </>
      ) : null}
      <Button asChild variant="ghost" data-testid="legal-back">
        <Link to="/admin/legal">{t("admin.legal.action.back")}</Link>
      </Button>
    </div>
  );
}
