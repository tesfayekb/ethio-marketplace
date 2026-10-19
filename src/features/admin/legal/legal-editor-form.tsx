import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n, type MessageKey } from "@/i18n";
import { LegalText } from "@/features/legal/legal-text";
import { unknownTokens } from "@/features/legal/legal-markdown";
import { ownValue } from "@/lib/own-key";
import {
  kindKey,
  legalErrorKey,
  type DraftInput,
  type LegalSettings,
  type LegalVersionDetail,
} from "./legal-service";
import { LegalPublishDialog } from "./legal-publish-dialog";
import { useLegalWrites } from "./use-legal";

export function LegalEditorForm({
  kind,
  country,
  facts,
  source,
  draft,
  first,
}: {
  kind: string;
  country?: string;
  facts: LegalSettings;
  source?: LegalVersionDetail;
  draft: boolean;
  first: boolean;
}) {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const countries = useCountries();
  const navigate = useNavigate();
  const writes = useLegalWrites();
  const initial: DraftInput = {
    kind,
    country: country ?? null,
    label: draft ? (source?.label ?? "") : "",
    body_en: source?.body_en ?? "",
    body_am: source?.body_am ?? "",
    changelog: draft ? (source?.changelog ?? "") : "",
  };
  const [values, setValues] = useState(initial);
  const [savedValues, setSavedValues] = useState<DraftInput | null>(draft ? initial : null);
  const [savedId, setSavedId] = useState(draft ? source?.version_id : undefined);
  const [version, setVersion] = useState(
    draft ? (source?.version ?? 1) : (source?.version ?? 0) + 1,
  );
  const [lang, setLang] = useState<"en" | "am">("en");
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [error, setError] = useState<MessageKey | null>(null);
  const [limit, setLimit] = useState(0);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const document = `${kindKey(kind) ? t(kindKey(kind) as MessageKey) : kind} · ${country ? (countries.data?.find((c) => c.code === country)?.nameEn ?? country) : t("admin.legal.scope.global")}`;
  const changed = JSON.stringify(values) !== JSON.stringify(savedValues);
  const mayEdit = permissions.includes("legal:edit");
  const tokens = unknownTokens(lang === "en" ? values.body_en : values.body_am, facts);
  // Bundle 22 turn 3 — tokens whose fact is empty today: publishing refuses them (factMissing).
  const emptyFacts = [
    ...new Set(
      [...(lang === "en" ? values.body_en : values.body_am).matchAll(/\{\{([a-z_]+)\}\}/g)].map(
        (m) => m[1] ?? "",
      ),
    ),
  ].filter((name) => {
    const fact = ownValue(facts, name);
    return fact === null || (fact !== undefined && String(fact).trim() === "");
  });
  const count = (value: string, max: number) =>
    t("admin.legal.count").replace("{count}", String(value.length)).replace("{max}", String(max));
  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="legal-editor" className="min-w-0 space-y-4">
          <h1 className="break-words text-lg font-semibold">
            {t(savedId ? "admin.legal.editor.titleDraft" : "admin.legal.editor.titleNew").replace(
              "{document}",
              document,
            )}
          </h1>
          {!draft && source ? (
            <p data-testid="legal-prefilled-note" className="text-sm text-muted-foreground">
              {t("admin.legal.prefilled").replace("{n}", String(source.version))}
            </p>
          ) : null}
          <div className="space-y-2">
            <label htmlFor="legal-label">{t("admin.legal.field.label")}</label>
            <Input
              id="legal-label"
              data-testid="legal-field-label"
              value={values.label}
              disabled={!mayEdit || saving || writes.save.isPending}
              onChange={(e) => {
                setValues((v) => ({ ...v, label: e.target.value }));
                setSaved(false);
              }}
            />
            <p className="text-sm text-muted-foreground">{t("admin.legal.field.labelHelp")}</p>
          </div>
          <div role="group" className="flex flex-wrap gap-2">
            {(["en", "am"] as const).map((l) => (
              <Button
                key={l}
                variant={lang === l ? "default" : "outline"}
                data-testid={`legal-tab-${l}`}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
              >
                {t(`admin.legal.lang.${l}`)}
              </Button>
            ))}
            <span className="grow" />
            {(["write", "preview"] as const).map((m) => (
              <Button
                key={m}
                variant={mode === m ? "default" : "outline"}
                data-testid={`legal-mode-${m}`}
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
              >
                {t(`admin.legal.action.${m}`)}
              </Button>
            ))}
          </div>
          {mode === "write" ? (
            <>
              {(["en", "am"] as const).map((l) => (
                <div key={l} hidden={lang !== l} className="space-y-2">
                  <label htmlFor={`legal-body-${l}`}>
                    {t(l === "en" ? "admin.legal.field.bodyEn" : "admin.legal.field.bodyAm")}
                  </label>
                  <Textarea
                    id={`legal-body-${l}`}
                    data-testid={`legal-field-body-${l}`}
                    className="min-h-72 text-base"
                    value={l === "en" ? values.body_en : values.body_am}
                    disabled={!mayEdit || saving || writes.save.isPending}
                    onChange={(e) => {
                      setValues((v) => ({
                        ...v,
                        [l === "en" ? "body_en" : "body_am"]: e.target.value,
                      }));
                      setSaved(false);
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    {count(l === "en" ? values.body_en : values.body_am, 200000)}
                  </p>
                </div>
              ))}
              <p className="text-sm text-muted-foreground">{t("admin.legal.field.bodyHelp")}</p>
            </>
          ) : (
            <div data-testid="legal-preview" className="min-w-0 space-y-3">
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
              <LegalText text={lang === "en" ? values.body_en : values.body_am} facts={facts} />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="legal-changelog">{t("admin.legal.field.changelog")}</label>
            <Textarea
              id="legal-changelog"
              data-testid="legal-field-changelog"
              value={values.changelog}
              disabled={!mayEdit || saving || writes.save.isPending}
              onChange={(e) => {
                setValues((v) => ({ ...v, changelog: e.target.value }));
                setSaved(false);
              }}
            />
            <p className="text-sm text-muted-foreground">{t("admin.legal.field.changelogHelp")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {mayEdit ? (
              <>
                <Button
                  data-testid="legal-save-draft"
                  disabled={saving || writes.save.isPending}
                  onClick={() => {
                    setError(null);
                    setSaved(false);
                    const exceeded =
                      values.label.length > 60
                        ? 60
                        : values.body_en.length > 200000 || values.body_am.length > 200000
                          ? 200000
                          : values.changelog.length > 10000
                            ? 10000
                            : 0;
                    if (exceeded) {
                      setLimit(exceeded);
                      setError("admin.legal.error.tooLong");
                      return;
                    }
                    const submitted = { ...values };
                    setSaving(true);
                    void guard(() => writes.save.mutateAsync(submitted))
                      .then((result) => {
                        setSavedId(result.version_id);
                        setVersion(result.version);
                        setSavedValues(submitted);
                        setSaved(true);
                      })
                      .catch((failure: unknown) => setError(legalErrorKey(failure)))
                      .finally(() => setSaving(false));
                  }}
                >
                  {t("admin.legal.action.saveDraft")}
                </Button>
                {savedId ? (
                  <Button
                    variant="outline"
                    data-testid="legal-discard-draft"
                    disabled={saving || writes.save.isPending}
                    onClick={() => setDiscarding(true)}
                  >
                    {t("admin.legal.action.discardDraft")}
                  </Button>
                ) : null}
              </>
            ) : null}
            {permissions.includes("legal:publish") ? (
              <Button
                data-testid="legal-publish"
                disabled={!savedId || changed || saving || writes.save.isPending}
                onClick={() => setPublishing(true)}
              >
                {t("admin.legal.action.publish")}
              </Button>
            ) : null}
            <Button asChild variant="ghost" data-testid="legal-back">
              <Link to="/admin/legal">{t("admin.legal.action.back")}</Link>
            </Button>
          </div>
          {permissions.includes("legal:publish") && (!savedId || changed) ? (
            <p className="text-sm text-muted-foreground">{t("admin.legal.saveFirst")}</p>
          ) : null}
          {saved && !changed ? <p role="status">{t("admin.legal.saved")}</p> : null}
          {error ? (
            <p role="alert" className="text-destructive">
              {t(error).replace("{max}", String(limit))}
            </p>
          ) : null}
          <AlertDialog open={discarding} onOpenChange={setDiscarding}>
            <AlertDialogContent>
              <AlertDialogTitle>{t("admin.legal.discardTitle")}</AlertDialogTitle>
              <AlertDialogDescription>{t("admin.legal.discardBody")}</AlertDialogDescription>
              <div className="flex flex-wrap gap-2">
                <Button
                  data-testid="legal-discard-confirm"
                  disabled={writes.discard.isPending}
                  onClick={() => {
                    if (!savedId) return;
                    void guard(() => writes.discard.mutateAsync(savedId))
                      .then(() => {
                        setDiscarding(false);
                        void navigate({ to: "/admin/legal", search: { outcome: "discarded" } });
                      })
                      .catch((failure: unknown) => setError(legalErrorKey(failure)));
                  }}
                >
                  {t("admin.legal.action.discardDraft")}
                </Button>
                <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          {publishing && savedId ? (
            <LegalPublishDialog
              id={savedId}
              version={version}
              document={document}
              first={first}
              noticeDays={facts.notice_days}
              guard={guard}
              onClose={() => setPublishing(false)}
              onPublished={() => {
                setPublishing(false);
                void navigate({ to: "/admin/legal", search: { outcome: "published", version } });
              }}
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}
