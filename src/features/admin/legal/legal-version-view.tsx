import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { LegalText } from "@/features/legal/legal-text";
import { useI18n } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import {
  FACT_KEYS,
  acceptancesCsv,
  exportLegalAcceptances,
  fillFacts,
  kindKey,
  legalFileName,
  lineDiff,
  saveTextFile,
  versionStatus,
} from "./legal-service";
import { useLegalDocuments, useLegalSettings, useLegalVersion } from "./use-legal";
import { errorText } from "@/lib/error-text";

/** Bundle 22 turn 13 — Compare: this version's text against the previous version's, line by line. */
function CompareText({
  previousId,
  previousNumber,
  text,
  lang,
}: {
  previousId: string;
  previousNumber: number;
  text: string;
  lang: "en" | "am";
}) {
  const { t } = useI18n();
  const previous = useLegalVersion(previousId);
  if (previous.isPending) return <p role="status">{t("common.loading")}</p>;
  if (previous.error)
    return (
      <p role="alert" className="text-destructive">
        {t("admin.legal.error.load")}
      </p>
    );
  const lines = lineDiff(lang === "en" ? previous.data.body_en : previous.data.body_am, text);
  const changed = lines.some((line) => line.kind !== "same");
  return (
    <section data-testid="legal-diff" className="min-w-0 space-y-2">
      <h2 className="font-semibold">
        {t("admin.legal.compare.title")
          .replace("{n}", String(previousNumber))
          .replace("{language}", t(`admin.legal.lang.${lang}`))}
      </h2>
      {changed ? (
        <div className="space-y-0.5 rounded-md border border-border p-2 font-mono text-sm">
          {lines.map((line, index) =>
            line.kind === "same" ? (
              <p key={index} className="whitespace-pre-wrap break-words text-muted-foreground">
                {line.text || " "}
              </p>
            ) : (
              <p
                key={index}
                data-testid={line.kind === "added" ? "legal-diff-added" : "legal-diff-removed"}
                className={
                  line.kind === "added"
                    ? "whitespace-pre-wrap break-words bg-success-soft text-foreground"
                    : "whitespace-pre-wrap break-words bg-destructive-soft text-foreground line-through"
                }
              >
                <span className="sr-only">
                  {t(
                    line.kind === "added"
                      ? "admin.legal.compare.added"
                      : "admin.legal.compare.removed",
                  )}
                  {": "}
                </span>
                <span aria-hidden="true">{line.kind === "added" ? "+ " : "− "}</span>
                {line.text || " "}
              </p>
            ),
          )}
        </div>
      ) : (
        <p data-testid="legal-diff-none">{t("admin.legal.compare.none")}</p>
      )}
    </section>
  );
}

export function LegalVersionView({ versionId }: { versionId: string }) {
  const { t, language } = useI18n();
  const { permissions } = useAdminShell();
  const version = useLegalVersion(versionId);
  const settings = useLegalSettings();
  const documents = useLegalDocuments();
  const countries = useCountries();
  const [lang, setLang] = useState<"en" | "am">("en");
  const [comparing, setComparing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState<number | null>(null);
  const [exportFailed, setExportFailed] = useState(false);
  const row = version.data;
  const siblings = documents.data?.find((doc) => doc.document_id === row?.document_id)?.versions;
  const previous = row
    ? siblings?.filter((v) => v.version < row.version).sort((a, b) => b.version - a.version)[0]
    : undefined;
  const unknown = version.error != null && errorText(version.error) === "unknownVersion";
  const kind = row ? kindKey(row.kind) : null;
  const facts = row?.status === "published" ? (row.settings_snapshot ?? {}) : (settings.data ?? {});
  const text = row ? (lang === "en" ? row.body_en : row.body_am) : "";
  const date = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
          dateStyle: "medium",
        }).format(new Date(value))
      : "—";
  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="legal-version-view" className="min-w-0 space-y-4">
          {version.isPending || documents.isPending ? (
            <p role="status">{t("common.loading")}</p>
          ) : null}
          {unknown ? (
            <p data-testid="legal-version-not-found">{t("admin.legal.notFound")}</p>
          ) : version.error || settings.error || documents.error ? (
            <p role="alert" className="text-destructive">
              {t("admin.legal.error.load")}
            </p>
          ) : null}
          {row ? (
            <>
              <div data-print-root className="min-w-0 space-y-4">
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
                <section className="space-y-2 print:hidden">
                  <h2 className="font-semibold">{t("admin.legal.view.changelog")}</h2>
                  <p data-testid="legal-view-changelog" className="whitespace-pre-line break-words">
                    {row.changelog}
                  </p>
                </section>
                <div className="flex flex-wrap gap-2 print:hidden">
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
                  <span className="grow" />
                  <Button
                    variant="outline"
                    data-testid="legal-download"
                    onClick={() =>
                      saveTextFile(
                        legalFileName(row.kind, row.country_code, row.version, `${lang}.md`),
                        fillFacts(text, facts),
                        "text/markdown;charset=utf-8",
                      )
                    }
                  >
                    {t("admin.legal.action.download")}
                  </Button>
                  <Button
                    variant="outline"
                    data-testid="legal-print"
                    onClick={() => window.print()}
                  >
                    {t("admin.legal.action.print")}
                  </Button>
                  {previous ? (
                    <Button
                      variant="outline"
                      data-testid="legal-compare"
                      aria-expanded={comparing}
                      onClick={() => setComparing((open) => !open)}
                    >
                      {t("admin.legal.action.compare")}
                    </Button>
                  ) : null}
                </div>
                {comparing && previous ? (
                  <div className="print:hidden">
                    <CompareText
                      previousId={previous.version_id}
                      previousNumber={previous.version}
                      text={text}
                      lang={lang}
                    />
                  </div>
                ) : null}
                <LegalText text={text} facts={facts} toc />
              </div>
              {row.status === "published" && permissions.includes("legal:export") ? (
                <section data-testid="legal-export-section" className="space-y-2 print:hidden">
                  <Button
                    variant="outline"
                    data-testid="legal-export"
                    disabled={exporting}
                    onClick={() => {
                      setExporting(true);
                      setExported(null);
                      setExportFailed(false);
                      void guard(() => exportLegalAcceptances(row.version_id))
                        .then((answer) => {
                          saveTextFile(
                            legalFileName(
                              row.kind,
                              row.country_code,
                              row.version,
                              "acceptances.csv",
                            ),
                            acceptancesCsv(answer.rows),
                            "text/csv;charset=utf-8",
                          );
                          setExported(answer.rows.length);
                        })
                        .catch((failure: unknown) => {
                          console.error("[client-error] legal export", failure);
                          setExportFailed(true);
                        })
                        .finally(() => setExporting(false));
                    }}
                  >
                    {t("admin.legal.action.export")}
                  </Button>
                  {exported !== null ? (
                    <p role="status" data-testid="legal-export-done">
                      {t("admin.legal.export.done").replace("{count}", String(exported))}
                    </p>
                  ) : null}
                  {exportFailed ? (
                    <p role="alert" className="text-destructive">
                      {t("admin.legal.error.generic")}
                    </p>
                  ) : null}
                </section>
              ) : null}
              {row.status === "published" ? (
                <section data-testid="legal-view-facts" className="space-y-3 print:hidden">
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
      )}
    </StepUpGate>
  );
}
