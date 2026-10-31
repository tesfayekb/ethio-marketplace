import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LIST_CHOICE_ON, LIST_ROW, LIST_ROW_WRAP } from "@/components/shell/menu-row";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";
import { legalErrorKey, legalErrorName } from "./legal-service";
import { earliestLegalDate, legalPublishDate } from "./publish-date";
import { useLegalWrites } from "./use-legal";

/** A choice row holds a radio and a two-line label: aligned to the first line. */
const CHOICE = "cursor-pointer items-start gap-3";

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
  const request = legalPublishDate(first, choice, date, now, noticeDays);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !publish.isPending) onClose();
      }}
    >
      <DialogContent data-testid="legal-publish-dialog">
        <DialogHeader>
          <DialogTitle>
            {t("admin.legal.publish.title")
              .replace("{document}", document)
              .replace("{n}", String(version))}
          </DialogTitle>
          <DialogDescription>{t("admin.legal.publish.final")}</DialogDescription>
        </DialogHeader>
        {first ? (
          <p data-testid="legal-publish-first-note">{t("admin.legal.publish.first")}</p>
        ) : (
          <fieldset className="space-y-3">
            <legend className="mb-2 font-medium">{t("admin.legal.publish.question")}</legend>
            <label className={cn(LIST_ROW, LIST_ROW_WRAP, LIST_CHOICE_ON, CHOICE)}>
              <input
                type="radio"
                name="legal-change"
                data-testid="legal-publish-material"
                checked={choice === "material"}
                onChange={() => setChoice("material")}
                className="mt-1 size-5 accent-primary"
              />
              <span>
                <span className="block font-medium">{t("admin.legal.change.material")}</span>
                <span className="text-sm text-muted-foreground">
                  {t("admin.legal.publish.materialHelp").replace("{days}", String(noticeDays))}
                </span>
              </span>
            </label>
            <label className={cn(LIST_ROW, LIST_ROW_WRAP, LIST_CHOICE_ON, CHOICE)}>
              <input
                type="radio"
                name="legal-change"
                data-testid="legal-publish-correction"
                checked={choice === "correction"}
                onChange={() => setChoice("correction")}
                className="mt-1 size-5 accent-primary"
              />
              <span>
                <span className="block font-medium">{t("admin.legal.change.correction")}</span>
                <span className="text-sm text-muted-foreground">
                  {t("admin.legal.publish.correctionHelp")}
                </span>
              </span>
            </label>
            {choice === "material" ? (
              <div className="space-y-2">
                <label htmlFor="legal-effective-date">{t("admin.legal.publish.effective")}</label>
                <Input
                  id="legal-effective-date"
                  data-testid="legal-publish-date"
                  type="date"
                  min={earliest}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  {t("admin.legal.publish.earliest").replace("{date}", earliest)}
                </p>
              </div>
            ) : null}
          </fieldset>
        )}
        {error ? (
          <p role="alert" className="text-destructive">
            {t(error).replace("{date}", earliest).replace("{name}", errorName)}
          </p>
        ) : null}
        <DialogFooter>
          <Button variant="outline" size="touch" disabled={publish.isPending} onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            size="touch"
            data-testid="legal-publish-confirm"
            disabled={!request || publish.isPending}
            onClick={() => {
              if (!request) return;
              setError(null);
              void guard(() => publish.mutateAsync({ id, ...request }))
                .then(onPublished)
                .catch((failure: unknown) => {
                  setErrorName(legalErrorName(failure));
                  setError(legalErrorKey(failure));
                });
            }}
          >
            {t("admin.legal.action.publish")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
