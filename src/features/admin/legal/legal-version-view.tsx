import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useLanguages } from "@/features/admin/translations/use-translations";
import { PSEUDO_LANG } from "@/features/admin/translations/pseudo";
import { unknownTokens } from "@/features/legal/legal-markdown";
import { Button } from "@/components/ui/button";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { LegalText } from "@/features/legal/legal-text";
import { useI18n, type MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import {
  legalErrorKey,
  legalErrorName,
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
import { useLegalWrites, useLegalDocuments, useLegalSettings, useLegalVersion } from "./use-legal";
import { errorText } from "@/lib/error-text";
import { formatLocale } from "@/lib/format-locale";

/** Bundle 22 turn 13 — Compare: this version's text against the previous version's, line by line. */
function CompareText({
  previousId,
  previousNumber,
  text,
  lang,
  languageName,
}: {
  previousId: string;
  previousNumber: number;
  text: string;
  lang: string;
  languageName: string;
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
  const previousText =
    lang === "en"
      ? previous.data.body_en
      : lang === "am"
        ? previous.data.body_am
        : (ownValue(previous.data.texts, lang) ?? "");
  const lines = lineDiff(previousText, text);
  const changed = lines.some((line) => line.kind !== "same");
  return (
    <section data-testid="legal-diff" className="min-w-0 space-y-2">
      <h2 className="font-semibold">
        {t("admin.legal.compare.title")
          .replace("{n}", String(previousNumber))
          .replace("{language}", languageName)}
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
  const languages = useLanguages();
  const writes = useLegalWrites();
  const [lang, setLang] = useState("en");
  const [comparing, setComparing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState<number | null>(null);
  const [exportFailed, setExportFailed] = useState(false);
  const [addingTranslation, setAddingTranslation] = useState(false);
  const [translationLanguage, setTranslationLanguage] = useState("");
  const [translationBody, setTranslationBody] = useState("");
  const [translationError, setTranslationError] = useState<MessageKey | null>(null);
  const [translationErrorName, setTranslationErrorName] = useState("");
  const [translationSaved, setTranslationSaved] = useState(false);
  const [translationSaving, setTranslationSaving] = useState(false);
  const [importedFile, setImportedFile] = useState<string | null>(null);
  const row = version.data;
  const availableLanguages =
    languages.data?.filter(
      (l) =>
        l.enabledAdmin &&
        l.code !== "en" &&
        l.code !== "am" &&
        l.code !== PSEUDO_LANG &&
        (!row || ownValue(row.texts, l.code) === undefined),
    ) ?? [];
  const languageName = (l: string) =>
    l === "en" || l === "am"
      ? t(`admin.legal.lang.${l}`)
      : (languages.data?.find((item) => item.code === l)?.nameEn ?? l);
  const siblings = documents.data?.find((doc) => doc.document_id === row?.document_id)?.versions;
  const previous = row
    ? siblings?.filter((v) => v.version < row.version).sort((a, b) => b.version - a.version)[0]
    : undefined;
  const unknown = version.error != null && errorText(version.error) === "unknownVersion";
  const kind = row ? kindKey(row.kind) : null;
  const facts = row?.status === "published" ? (row.settings_snapshot ?? {}) : (settings.data ?? {});
  const text = row
    ? lang === "en"
      ? row.body_en
      : lang === "am"
        ? row.body_am
        : (ownValue(row.texts, lang) ?? "")
    : "";
  const tokens = unknownTokens(translationBody, facts);
  const emptyFacts = [
    ...new Set([...translationBody.matchAll(/\{\{([a-z_]+)\}\}/g)].map((m) => m[1] ?? "")),
  ].filter((name) => {
    const fact = ownValue(facts, name);
    return fact === null || (fact !== undefined && String(fact).trim() === "");
  });
  const date = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat(formatLocale(language), {
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
                  {["en", "am", ...Object.keys(row.texts)].map((l) => (
                    <Button
                      key={l}
                      data-testid={`legal-view-tab-${l}`}
                      variant={l === lang ? "default" : "outline"}
                      aria-pressed={lang === l}
                      onClick={() => setLang(l)}
                    >
                      {languageName(l)}
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
                      languageName={languageName(lang)}
                    />
                  </div>
                ) : null}
                <LegalText text={text} facts={facts} toc />
              </div>
              {row.status === "published" && permissions.includes("legal:publish") ? (
                <section className="min-w-0 space-y-3 print:hidden">
                  <Button
                    data-testid="legal-translation-add"
                    variant="outline"
                    aria-expanded={addingTranslation}
                    onClick={() => {
                      setAddingTranslation((open) => !open);
                      setTranslationSaved(false);
                      setTranslationError(null);
                    }}
                  >
                    {t("admin.legal.translation.add")}
                  </Button>
                  {addingTranslation ? (
                    <div data-testid="legal-translation-panel" className="min-w-0 space-y-3">
                      {languages.error ? (
                        <p role="alert" className="text-destructive">
                          {t("admin.legal.error.load")}
                        </p>
                      ) : languages.isPending ? (
                        <p role="status">{t("common.loading")}</p>
                      ) : null}
                      <label htmlFor="legal-translation-language">{t("language.label")}</label>
                      <select
                        id="legal-translation-language"
                        data-testid="legal-translation-language"
                        className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-base"
                        value={translationLanguage}
                        disabled={translationSaving}
                        onChange={(e) => {
                          setTranslationLanguage(e.target.value);
                          setTranslationSaved(false);
                          setTranslationError(null);
                        }}
                      >
                        <option value="">{t("language.label")}</option>
                        {availableLanguages.map((l) => (
                          <option key={l.code} value={l.code}>
                            {l.nameEn}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="legal-translation-body">
                        {t("admin.legal.field.textOptional").replace(
                          "{language}",
                          languageName(translationLanguage),
                        )}
                      </label>
                      <Textarea
                        id="legal-translation-body"
                        data-testid="legal-translation-body"
                        className="min-h-72 text-base"
                        value={translationBody}
                        disabled={translationSaving}
                        onChange={(e) => {
                          setTranslationBody(e.target.value);
                          setTranslationSaved(false);
                          setTranslationError(null);
                        }}
                      />
                      <p className="text-sm text-muted-foreground">
                        {t("admin.legal.count")
                          .replace("{count}", String(translationBody.length))
                          .replace("{max}", "200000")}
                      </p>
                      <label htmlFor="legal-translation-import" className="block text-sm">
                        {t("admin.legal.import.label")}
                      </label>
                      <input
                        id="legal-translation-import"
                        data-testid="legal-translation-import"
                        type="file"
                        accept=".md,.txt,text/markdown,text/plain"
                        className="block w-full min-w-0 text-sm"
                        disabled={translationSaving}
                        onChange={(e) => {
                          const input = e.currentTarget;
                          const file = input.files?.[0];
                          input.value = "";
                          if (!file) return;
                          setImportedFile(null);
                          setTranslationError(null);
                          setTranslationSaved(false);
                          void file
                            .text()
                            .then((body) => {
                              if (body.length > 200000) {
                                setTranslationError("admin.legal.import.tooBig");
                                return;
                              }
                              setTranslationBody(body);
                              setImportedFile(file.name);
                            })
                            .catch((failure: unknown) => {
                              console.error("[client-error] legal translation import", failure);
                              setTranslationError("admin.legal.import.failed");
                            });
                        }}
                      />
                      {importedFile ? (
                        <p role="status">
                          {t("admin.legal.import.done").replace("{file}", importedFile)}
                        </p>
                      ) : null}
                      {tokens.length ? (
                        <p data-testid="legal-unknown-tokens">
                          {t("admin.legal.unknownTokens").replace("{tokens}", tokens.join(", "))}
                        </p>
                      ) : null}
                      {emptyFacts.length ? (
                        <p data-testid="legal-empty-facts">
                          {t("admin.legal.emptyFacts").replace("{tokens}", emptyFacts.join(", "))}
                        </p>
                      ) : null}
                      <LegalText text={translationBody} facts={facts} />
                      <p className="text-sm text-muted-foreground">
                        {t("admin.legal.translation.hint")}
                      </p>
                      <Button
                        data-testid="legal-translation-save"
                        disabled={
                          translationSaving ||
                          !translationLanguage ||
                          !translationBody.trim() ||
                          languages.isPending ||
                          Boolean(languages.error)
                        }
                        onClick={() => {
                          setTranslationError(null);
                          setTranslationSaved(false);
                          if (translationBody.length > 200000) {
                            setTranslationError("admin.legal.error.tooLong");
                            return;
                          }
                          const input = {
                            versionId: row.version_id,
                            language: translationLanguage,
                            body: translationBody,
                          };
                          setTranslationSaving(true);
                          void guard(() => writes.translation.mutateAsync(input))
                            .then(() => {
                              setLang(input.language);
                              setTranslationSaved(true);
                              setAddingTranslation(false);
                              setTranslationLanguage("");
                              setTranslationBody("");
                              setImportedFile(null);
                            })
                            .catch((failure: unknown) => {
                              console.error("[client-error] legal translation save", failure);
                              setTranslationErrorName(legalErrorName(failure));
                              setTranslationError(legalErrorKey(failure));
                            })
                            .finally(() => setTranslationSaving(false));
                        }}
                      >
                        {t("admin.legal.translation.save")}
                      </Button>
                      {translationError ? (
                        <p role="alert" className="text-destructive">
                          {t(translationError)
                            .replace("{max}", "200000")
                            .replace("{name}", translationErrorName)}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {translationSaved ? (
                    <p role="status">{t("admin.legal.translation.saved")}</p>
                  ) : null}
                </section>
              ) : null}
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
