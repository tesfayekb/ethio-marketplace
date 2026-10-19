import { useState } from "react";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useAdminShell } from "@/features/admin/admin-context";
import { useI18n, type MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import { FACT_KEYS, legalErrorKey, type FactKey, type LegalSettings } from "./legal-service";
import { FACT_BOUNDS, validateLegalFacts } from "./facts-validation";
import { useLegalWrites } from "./use-legal";

export function LegalFactsCard({ facts, guard }: { facts: LegalSettings; guard: GuardFn }) {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const { facts: save } = useLegalWrites();
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState<MessageKey | null>(null);
  const [saved, setSaved] = useState(false);
  const errors = validated ? validateLegalFacts(values) : {};
  const label = (key: FactKey) => t(`admin.legal.fact.${key}`);
  return (
    <PageCard testid="legal-facts" className="space-y-4">
      <h2 className="text-lg font-semibold">{t("admin.legal.facts.title")}</h2>
      <p className="text-sm text-muted-foreground">{t("admin.legal.facts.help")}</p>
      <dl className="grid min-w-0 gap-4 sm:grid-cols-2">
        {FACT_KEYS.map((key) => {
          const bounds = ownValue(FACT_BOUNDS, key);
          const fieldError = ownValue(errors, key);
          const value = ownValue(facts, key);
          const multiline = ["operator_address", "operator_details", "copyright_agent"].includes(
            key,
          );
          const fieldProps = {
            id: `legal-fact-${key}`,
            "data-testid": `legal-fact-input-${key}`,
            value: ownValue(values, key) ?? "",
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              setValues((prev) => ({ ...prev, [key]: event.target.value })),
            "aria-invalid": Boolean(fieldError),
            className: "min-h-11 w-full",
            ...(bounds
              ? { type: "number", min: bounds[0], max: bounds[1], step: 1 }
              : { type: key.endsWith("email") ? "email" : key === "legal_phone" ? "tel" : "text" }),
          };
          return (
            <div key={key} className="min-w-0 space-y-1">
              <dt>
                <label
                  htmlFor={editing ? fieldProps.id : undefined}
                  className="text-sm font-medium"
                >
                  {label(key)}
                </label>
              </dt>
              <dd>
                {editing ? (
                  <>
                    {multiline ? <Textarea {...fieldProps} /> : <Input {...fieldProps} />}
                    {fieldError ? (
                      <p
                        role="alert"
                        data-testid={`legal-fact-error-${key}`}
                        className="text-sm text-destructive"
                      >
                        {t(
                          fieldError.type === "tooLong"
                            ? "admin.legal.error.tooLong"
                            : `admin.legal.facts.${fieldError.type}`,
                        )
                          .replace("{min}", String(fieldError.min ?? 0))
                          .replace("{max}", String(fieldError.max ?? 0))}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <span
                    data-testid={`legal-fact-${key}`}
                    className="block whitespace-pre-line break-words text-sm"
                  >
                    {value === null || value === undefined || value === ""
                      ? t("admin.legal.facts.notSet")
                      : String(value)}
                  </span>
                )}
              </dd>
              <dd>
                <code className="break-words text-xs text-muted-foreground">{`{{${key}}}`}</code>
              </dd>
            </div>
          );
        })}
      </dl>
      {editing ? (
        <div className="flex flex-wrap gap-2">
          <Button
            data-testid="legal-facts-save"
            disabled={save.isPending}
            onClick={() => {
              setValidated(true);
              setError(null);
              setSaved(false);
              if (Object.keys(validateLegalFacts(values)).length) return;
              const payload = Object.fromEntries(
                FACT_KEYS.map((key) => [
                  key,
                  ownValue(FACT_BOUNDS, key)
                    ? Number(ownValue(values, key))
                    : (ownValue(values, key) ?? ""),
                ]),
              );
              void guard(() => save.mutateAsync(payload))
                .then(() => {
                  setEditing(false);
                  setSaved(true);
                })
                .catch((failure: unknown) => setError(legalErrorKey(failure)));
            }}
          >
            {t("admin.legal.action.saveFacts")}
          </Button>
          <Button
            variant="outline"
            data-testid="legal-facts-cancel"
            onClick={() => {
              setEditing(false);
              setError(null);
            }}
          >
            {t("common.cancel")}
          </Button>
        </div>
      ) : permissions.includes("legal:edit") ? (
        <Button
          variant="outline"
          data-testid="legal-facts-edit"
          onClick={() => {
            setValues(
              Object.fromEntries(FACT_KEYS.map((key) => [key, String(ownValue(facts, key) ?? "")])),
            );
            setValidated(false);
            setEditing(true);
            setSaved(false);
          }}
        >
          {t("admin.legal.action.editFacts")}
        </Button>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {t(error)}
        </p>
      ) : null}
      {saved ? <p role="status">{t("admin.legal.facts.saved")}</p> : null}
    </PageCard>
  );
}
