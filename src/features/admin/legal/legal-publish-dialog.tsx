import { TriangleAlert } from "lucide-react";
import {
  PanelHeader,
  PanelBody,
  PanelFooter,
  PanelSubject,
} from "@/components/ui/dialog-parts-facade";
import { useState } from "react";
import { Field } from "@/components/forms/field";
import { useFormGate } from "@/components/forms/use-form-gate";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";
import { LEGAL_REFUSALS, legalRefusalKey, legalRefusalName } from "./legal-service";
import { earliestLegalDate, legalPublishDate } from "./publish-date";
import { useLegalWrites } from "./use-legal";

export function LegalPublishDialog({
  id,
  version,
  document,
  first,
  noticeDays,
  guard,
  onClose,
  onPublished,
}: {
  id: string;
  version: number;
  document: string;
  first: boolean;
  noticeDays: number;
  guard: GuardFn;
  onClose: () => void;
  onPublished: () => void;
}) {
  const { t } = useI18n();
  const { publish } = useLegalWrites();
  const [now] = useState(() => new Date());
  const [choice, setChoice] = useState<"material" | "correction" | null>(null);
  const earliest = earliestLegalDate(now, noticeDays);
  const [date, setDate] = useState(earliest);
  const [error, setError] = useState<MessageKey | null>(null);
  const [errorName, setErrorName] = useState("");
  const gate = useFormGate(choice ?? "");
  const request = legalPublishDate(first, choice, date, now, noticeDays);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !publish.isPending) onClose();
      }}
    >
      <DialogContent data-testid="legal-publish-dialog" bands size="narrow">
        <PanelHeader tone={"confirm"} icon={<TriangleAlert />}>
          <DialogTitle>
            {t("admin.legal.publish.title")
              .replace("{document}", document)
              .replace("{n}", String(version))}
          </DialogTitle>
          <DialogDescription>{t("admin.legal.publish.final")}</DialogDescription>
        </PanelHeader>
        <PanelBody>
          <PanelSubject
            title={document}
            lines={[t("admin.legal.version").replace("{n}", String(version))]}
          />
          {first ? (
            <p data-testid="legal-publish-first-note">{t("admin.legal.publish.first")}</p>
          ) : (
            <fieldset className="space-y-3">
              <legend className="mb-2 font-medium">{t("admin.legal.publish.question")}</legend>
              <Field
                id="legal-change-material"
                field="material"
                label={
                  <span>
                    <span className="block font-medium">{t("admin.legal.change.material")}</span>
                    <span className="text-sm text-muted-foreground">
                      {t("admin.legal.publish.materialHelp").replace("{days}", String(noticeDays))}
                    </span>
                  </span>
                }
                required
                marked={false}
                refusal={null}
                layout="choice"
              >
                {(control) => (
                  <input
                    {...control}
                    type="radio"
                    name="legal-change"
                    data-testid="legal-publish-material"
                    checked={choice === "material"}
                    onChange={() => setChoice("material")}
                    className="mt-1 size-5 accent-primary"
                  />
                )}
              </Field>
              <Field
                id="legal-change-correction"
                field="material"
                label={
                  <span>
                    <span className="block font-medium">{t("admin.legal.change.correction")}</span>
                    <span className="text-sm text-muted-foreground">
                      {t("admin.legal.publish.correctionHelp")}
                    </span>
                  </span>
                }
                required
                marked={false}
                refusal={null}
                layout="choice"
              >
                {(control) => (
                  <input
                    {...control}
                    type="radio"
                    name="legal-change"
                    data-testid="legal-publish-correction"
                    checked={choice === "correction"}
                    onChange={() => setChoice("correction")}
                    className="mt-1 size-5 accent-primary"
                  />
                )}
              </Field>
              {choice === "material" ? (
                <Field
                  id="legal-effective-date"
                  field="effective_at"
                  label={t("admin.legal.publish.effective")}
                  required
                  gate={gate}
                  blank={!date}
                  refusal={gate.marks.find((mark) => mark.field === "effective_at") ?? null}
                  family={LEGAL_REFUSALS}
                  hint={t("admin.legal.publish.earliest").replace("{date}", earliest)}
                >
                  {(control) => (
                    <Input
                      {...control}
                      data-testid="legal-publish-date"
                      type="date"
                      min={earliest}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  )}
                </Field>
              ) : null}
            </fieldset>
          )}
          {error ? (
            <p role="alert" className="text-destructive">
              {t(error).replace("{date}", earliest).replace("{name}", errorName)}
            </p>
          ) : null}
        </PanelBody>
        <PanelFooter>
          <Button variant="outline" size="touch" disabled={publish.isPending} onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            size="touch"
            data-testid="legal-publish-confirm"
            disabled={!request || publish.isPending}
            onClick={() => {
              if (!gate.try() || !request) return;
              setError(null);
              void guard(() => publish.mutateAsync({ id, ...request }))
                .then(onPublished)
                .catch((failure: unknown) => {
                  setErrorName(legalRefusalName(failure));
                  setError(legalRefusalKey(failure));
                });
            }}
          >
            {t("admin.legal.action.publish")}
          </Button>
        </PanelFooter>
      </DialogContent>
    </Dialog>
  );
}
