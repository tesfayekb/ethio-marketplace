import { Button } from "@/components/ui/button";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n } from "@/i18n";

/**
 * DEC-464 — the failure notice's Retry after a step-up refusal. A plain Retry cannot succeed, so
 * it runs through the existing gate: the code is asked first, then the read runs again; an
 * account with no factor sees the gate's own explanation. Loaded on demand (failure-notice.tsx),
 * so the gate never rides a public page's first download.
 */
export function FailureStepUp({ testid, onRetry }: { testid: string; onRetry: () => void }) {
  const { t } = useI18n();
  return (
    <StepUpGate>
      {(guard) => (
        <Button
          type="button"
          variant="outline"
          size="touch"
          className="min-h-11"
          data-testid={testid}
          onClick={() => void guard(onRetry).catch(() => undefined)}
        >
          {t("common.retry")}
        </Button>
      )}
    </StepUpGate>
  );
}

export default FailureStepUp;
