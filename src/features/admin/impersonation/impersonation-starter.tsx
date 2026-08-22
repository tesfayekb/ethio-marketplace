import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { FormField, FormSection } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";

import { useBeginImpersonation } from "./use-impersonation";

const MIN_REASON = 5;

/**
 * U3 / DEC-016 — the ONLY entry point into an impersonation session.
 *
 * A reason is mandatory (it lands in the dual-actor audit row), the action
 * runs through the step-up guard, and the server refuses self-targets,
 * super-admin targets, short reasons, aal1 callers and a second concurrent
 * session regardless of what this form allows.
 */
export function ImpersonationStarter({ userId, guard }: { userId: string; guard: GuardFn }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const begin = useBeginImpersonation();
  const [reason, setReason] = useState("");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  return (
    <FormSection
      testid="impersonation-starter"
      title={t("impersonation.viewAs")}
      description={t("impersonation.readOnlyNote")}
      columns={1}
      actions={
        <>
          <Button
            variant="secondary"
            className="min-h-11 w-full sm:w-auto"
            data-testid="impersonation-begin"
            disabled={begin.isPending}
            onClick={() => {
              if (reason.trim().length < MIN_REASON) {
                setErrorKey("impersonation.reasonTooShort");
                return;
              }
              setErrorKey(null);
              let sessionId: string | null = null;
              void guard(async () => {
                const session = await begin.mutateAsync({
                  targetId: userId,
                  reason: reason.trim(),
                });
                sessionId = session.sessionId;
              })
                .then(() => {
                  if (sessionId === null) return;
                  void navigate({
                    to: "/admin/impersonation/$sessionId",
                    params: { sessionId },
                  });
                })
                .catch(() => setErrorKey("impersonation.failed"));
            }}
          >
            {t("impersonation.start")}
          </Button>
          {errorKey ? (
            <p role="alert" data-testid="impersonation-error" className="text-sm text-destructive">
              {t(errorKey)}
            </p>
          ) : null}
        </>
      }
    >
      <FormField label={t("impersonation.reasonLabel")} htmlFor="impersonation-reason">
        <Input
          id="impersonation-reason"
          data-testid="impersonation-reason"
          value={reason}
          placeholder={t("impersonation.reasonPlaceholder")}
          onChange={(event) => {
            setReason(event.target.value);
            setErrorKey(null);
          }}
        />
      </FormField>
    </FormSection>
  );
}

export default ImpersonationStarter;
