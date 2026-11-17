import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Field } from "@/components/forms/field";
import { useFormGate } from "@/components/forms/use-form-gate";
import { FormSection } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";

import { useBeginImpersonation } from "./use-impersonation";

const MIN_REASON = 5;

/** L9 (DEC-339) — the reason field's words for the one Field: the kit's blank mark. */
const REASON_REFUSALS: RefusalFamily = {
  words: { required: "post.refusal.required" },
  generic: "impersonation.failed",
};

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
  const gate = useFormGate();
  const blankMark = gate.marks.find((mark) => mark.field === "reason") ?? null;
  const tooShort = errorKey === "impersonation.reasonTooShort";

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
              if (!gate.try()) return;
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
                .catch((failure: unknown) => {
                  const read = readRefusal(failure, { generic: "impersonation.failed" });
                  setErrorKey(read.silent ? null : read.key);
                });
            }}
          >
            {t("impersonation.start")}
          </Button>
          {errorKey ? (
            <p
              id="impersonation-error"
              role="alert"
              data-testid="impersonation-error"
              className="text-sm text-destructive">
              {t(errorKey)}
            </p>
          ) : null}
        </>
      }
    >
      <Field
        id="impersonation-reason"
        field="reason"
        label={t("impersonation.reasonLabel")}
        required
        gate={gate}
        blank={reason.trim() === ""}
        refusal={blankMark}
        family={REASON_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            aria-invalid={control["aria-invalid"] ?? (tooShort || undefined)}
            aria-describedby={tooShort ? "impersonation-error" : control["aria-describedby"]}
            data-testid="impersonation-reason"
            value={reason}
            placeholder={t("impersonation.reasonPlaceholder")}
            onChange={(event) => {
              setReason(event.target.value);
              setErrorKey(null);
            }}
          />
        )}
      </Field>
    </FormSection>
  );
}

export default ImpersonationStarter;
