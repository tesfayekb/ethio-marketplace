import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

import type { PackagesRefusal } from "./packages-service";

/**
 * P-1 — ADMIN › PACKAGES: the pieces every write surface shares (the plans
 * console's shape, B2/B3). Every submit runs through the page's step-up `guard`;
 * the door behind it re-checks the permission AND the step-up server-side (F3),
 * so a refusal here is a translated sentence naming the door's own message,
 * never a silent no-op (F4). Nothing closes on failure. The refusal state is
 * `usePackagesError` (use-packages-error.ts).
 */

export function PackagesErrorLine({
  refusal,
  testid,
}: {
  refusal: PackagesRefusal | null;
  testid: string;
}) {
  const { t } = useI18n();
  if (refusal === null) return null;
  return (
    <>
      <p role="alert" data-testid={testid} className="text-sm text-destructive">
        {t(refusal.key)}
      </p>
      {refusal.raw === null ? null : (
        <p className="text-sm break-words text-muted-foreground" data-testid={`${testid}-reason`}>
          {t("admin.coverage.error.reason").replace("{reason}", refusal.raw)}
        </p>
      )}
    </>
  );
}

export function PackagesDialogActions({
  onCancel,
  onSubmit,
  busy,
  cancelTestId,
  submitTestId,
  submitLabel,
  destructive = false,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  busy: boolean;
  cancelTestId: string;
  submitTestId: string;
  submitLabel: string;
  destructive?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid={cancelTestId}
        onClick={onCancel}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="button"
        size="touch"
        variant={destructive ? "destructive" : "default"}
        data-testid={submitTestId}
        disabled={busy}
        onClick={onSubmit}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
