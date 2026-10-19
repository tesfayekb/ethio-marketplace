import { Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import { LEGAL_KINDS, kindKey, versionStatus, type LegalDocument } from "./legal-service";
import { LegalFactsCard } from "./legal-facts-card";
import { useLegalDocuments, useLegalSettings } from "./use-legal";

export function LegalPage() {
  const { t, language } = useI18n();
  const feedback = useSearch({ from: "/admin/legal" });
  const { permissions } = useAdminShell();
  const documents = useLegalDocuments();
  const settings = useLegalSettings();
  const countries = useCountries();
  const [history, setHistory] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Record<string, string>>({});
  const mayEdit = permissions.includes("legal:edit");
  const now = Date.now();
  const date = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
          dateStyle: "medium",
          timeZone: "UTC",
        }).format(new Date(value))
      : "—";
  const scope = (code: string | null) =>
    code
      ? (countries.data?.find((c) => c.code === code)?.nameEn ?? code)
      : t("admin.legal.scope.global");
  const editorLink = (kind: string, country: string | null, testid: string, draft = false) => (
    <Button asChild variant="outline" data-testid={testid}>
      <Link to="/admin/legal/edit" search={{ kind, ...(country ? { country } : {}) }}>
        {t(draft ? "admin.legal.action.editDraft" : "admin.legal.action.newVersion")}
      </Link>
    </Button>
  );
  const renderDocument = (doc: LegalDocument) => {
    const draft = doc.versions.find((v) => v.status === "draft");
    return (
      <div
        key={doc.document_id}
        data-testid={`legal-doc-${doc.kind}-${doc.country_code ?? "global"}`}
        className="min-w-0 space-y-3"
      >
        <h3 className="font-semibold">{scope(doc.country_code)}</h3>
        {doc.versions
          .filter((v) =>
            ["inForce", "scheduled", "draft"].includes(versionStatus(v, doc.versions, now)),
          )
          .map((v) => {
            const status = versionStatus(v, doc.versions, now);
            return (
              <div
                key={v.version_id}
                data-testid={
                  status === "draft"
                    ? "legal-draft"
                    : status === "inForce"
                      ? "legal-in-force"
                      : "legal-scheduled"
                }
                className="space-y-1 text-sm"
              >
                <p className="break-words font-medium">
                  {t("admin.legal.version").replace("{n}", String(v.version))}
                  {" · "}
                  {v.label}
                </p>
                <p>
                  {t(
                    status === "scheduled"
                      ? "admin.legal.status.scheduled"
                      : status === "draft"
                        ? "admin.legal.status.draft"
                        : "admin.legal.status.inForce",
                  ).replace("{date}", date(v.effective_at))}
                </p>
                {v.status === "published" ? (
                  <>
                    <p>
                      {t(
                        v.material
                          ? "admin.legal.change.material"
                          : "admin.legal.change.correction",
                      )}
                    </p>
                    <p>
                      {t(
                        v.published_by_name ? "admin.legal.publishedBy" : "admin.legal.publishedOn",
                      )
                        .replace("{date}", date(v.published_at))
                        .replace("{name}", v.published_by_name ?? "")}
                    </p>
                    <p>
                      {t("admin.legal.acceptedBy").replace("{count}", String(v.acceptances ?? 0))}
                    </p>
                  </>
                ) : mayEdit ? (
                  editorLink(doc.kind, doc.country_code, "legal-edit-draft", true)
                ) : null}
              </div>
            );
          })}
        {!draft && mayEdit ? editorLink(doc.kind, doc.country_code, "legal-new-version") : null}
        <Button
          variant="ghost"
          data-testid="legal-history-toggle"
          aria-expanded={history.has(doc.document_id)}
          onClick={() =>
            setHistory((prev) => {
              const next = new Set(prev);
              if (next.has(doc.document_id)) next.delete(doc.document_id);
              else next.add(doc.document_id);
              return next;
            })
          }
        >
          {t("admin.legal.action.history")}
        </Button>
        {history.has(doc.document_id) ? (
          <ul className="space-y-2">
            {doc.versions.map((v) => (
              <li
                key={v.version_id}
                data-testid="legal-history-row"
                data-version={v.version}
                className="flex min-w-0 flex-wrap items-center gap-2 text-sm"
              >
                <span className="break-words">
                  {t("admin.legal.version").replace("{n}", String(v.version))}
                  {" · "}
                  {v.label}
                  {" · "}
                  {t(`admin.legal.status.${versionStatus(v, doc.versions, now)}`).replace(
                    "{date}",
                    date(v.effective_at),
                  )}
                  {" · "}
                  {date(v.published_at ?? v.created_at)}
                </span>
                <Button asChild variant="ghost" data-testid="legal-view-link">
                  <Link to="/admin/legal/$versionId" params={{ versionId: v.version_id }}>
                    {t("admin.legal.action.view")}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };
  const scratch =
    documents.data?.filter((doc) => !(LEGAL_KINDS as readonly string[]).includes(doc.kind)) ?? [];
  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="legal-page" className="min-w-0 space-y-4">
          <h1 className="text-lg font-semibold">{t("admin.section.legal.title")}</h1>
          {feedback.outcome ? (
            <p role="status">
              {feedback.outcome === "discarded"
                ? t("admin.legal.discarded")
                : t("admin.legal.published").replace("{n}", String(feedback.version))}
            </p>
          ) : null}
          {documents.isPending || settings.isPending ? (
            <p role="status">{t("common.loading")}</p>
          ) : null}
          {documents.error || settings.error || countries.error ? (
            <p role="alert" className="text-destructive">
              {t("admin.legal.error.load")}
            </p>
          ) : null}
          {LEGAL_KINDS.map((kind) => {
            const docs = (documents.data ?? [])
              .filter((doc) => doc.kind === kind)
              .sort((a, b) => (a.country_code ?? "").localeCompare(b.country_code ?? ""));
            const available = (countries.data ?? []).filter(
              (c) => !docs.some((doc) => doc.country_code === c.code),
            );
            const picked = ownValue(selected, kind) ?? "";
            return (
              <PageCard key={kind} testid={`legal-kind-${kind}`} className="space-y-4">
                <h2 className="text-lg font-semibold">
                  {t(kindKey(kind) ?? "admin.legal.otherDocuments")}
                </h2>
                {docs.map(renderDocument)}
                {docs.length === 0 ? (
                  <div className="space-y-2">
                    <p>{t("admin.legal.none")}</p>
                    {mayEdit ? editorLink(kind, null, "legal-new-version") : null}
                  </div>
                ) : null}
                {mayEdit ? (
                  <div className="space-y-2">
                    <label className="block text-sm" htmlFor={`legal-country-${kind}`}>
                      {t("admin.legal.addCountry.label")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <select
                        id={`legal-country-${kind}`}
                        data-testid="legal-add-country-select"
                        className="min-h-11 min-w-0 grow rounded-md border border-input bg-background px-3"
                        value={picked}
                        onChange={(e) =>
                          setSelected((prev) => ({ ...prev, [kind]: e.target.value }))
                        }
                      >
                        <option value="">—</option>
                        {available.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.nameEn}
                          </option>
                        ))}
                      </select>
                      <Button
                        asChild
                        disabled={!picked}
                        variant="outline"
                        data-testid="legal-add-country"
                      >
                        <Link
                          to="/admin/legal/edit"
                          search={{ kind, ...(picked ? { country: picked } : {}) }}
                          aria-disabled={!picked}
                          onClick={(e) => {
                            if (!picked) e.preventDefault();
                          }}
                        >
                          {t("admin.legal.addCountry.action")}
                        </Link>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("admin.legal.addCountry.help")}
                    </p>
                  </div>
                ) : null}
              </PageCard>
            );
          })}
          {scratch.length ? (
            <PageCard testid="legal-kind-other" className="space-y-4">
              <h2 className="text-lg font-semibold">{t("admin.legal.otherDocuments")}</h2>
              {scratch.map((doc) => (
                <div key={doc.document_id} className="space-y-2">
                  <h3 className="break-words font-medium">{doc.kind}</h3>
                  {renderDocument(doc)}
                </div>
              ))}
            </PageCard>
          ) : null}
          {settings.data ? <LegalFactsCard facts={settings.data} guard={guard} /> : null}
        </div>
      )}
    </StepUpGate>
  );
}
