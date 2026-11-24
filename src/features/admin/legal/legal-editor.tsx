import { useI18n } from "@/i18n";
import { validDocument } from "./legal-service";
import { LegalEditorForm } from "./legal-editor-form";
import { useLegalDocuments, useLegalSettings, useLegalVersion } from "./use-legal";
import { FailureNotice } from "@/components/shell/failure-notice";
import { useRetryFailed } from "@/components/shell/use-retry-failed";

export function LegalEditor({ kind, country }: { kind: string; country?: string }) {
  const { t } = useI18n();
  const retryFailed = useRetryFailed();
  const documents = useLegalDocuments();
  const settings = useLegalSettings();
  const doc = documents.data?.find((d) => d.kind === kind && d.country_code === (country ?? null));
  const draft = doc?.versions.find((v) => v.status === "draft");
  const published = doc?.versions
    .filter((v) => v.status === "published")
    .sort((a, b) => b.version - a.version)[0];
  const sourceId = draft?.version_id ?? published?.version_id;
  const source = useLegalVersion(sourceId);
  if (!validDocument(kind, country))
    return <p data-testid="legal-bad-document">{t("admin.legal.badDocument")}</p>;
  return (
    <div className="min-w-0 space-y-4">
      {documents.isPending || settings.isPending || (sourceId && source.isPending) ? (
        <p role="status">{t("common.loading")}</p>
      ) : null}
      {documents.error || settings.error || source.error ? (
        <FailureNotice
          error={documents.error ?? settings.error ?? source.error}
          testid="legal-editor-failed"
          subject={t("admin.legal.error.load")}
          onRetry={retryFailed}
        />
      ) : null}
      {documents.data && settings.data && (!sourceId || source.data) ? (
        <LegalEditorForm
          key={`${kind}-${country ?? "global"}`}
          kind={kind}
          country={country}
          facts={settings.data}
          source={source.data}
          draft={Boolean(draft)}
          first={!published}
        />
      ) : null}
    </div>
  );
}
