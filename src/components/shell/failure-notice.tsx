import { Link } from "@tanstack/react-router";
import { Suspense, useEffect, useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useI18n, type MessageKey } from "@/i18n";
import { refusalText } from "@/lib/refusal";
import { cn } from "@/lib/utils";

import { failureKind, isRetryable, KINDS, rateRead } from "./failure-reason";
import { LoadFailedHere } from "./on-demand-notice";
import { resilientLazy } from "@/lib/resilient-lazy";
import { signInReturn } from "./sign-in-return";

/**
 * DEC-464 / INC-1279 — THE ONE FAILURE NOTICE. Every failed load or action on a screen draws
 * here: words that name the reason and one next step that works for it. Never silent, never
 * the failure's class or status as words (they ride `data-failure-*` and the console), never a
 * Retry that cannot succeed. `role="alert"`, never takes focus, 44 px targets. It is not lazy: a
 * network failure must still be able to show its words. failure-notice.census.test.ts judges.
 */
export interface FailureNoticeProps {
  error: unknown;
  /** The failure element's existing test id (its contract with the tests). */
  testid: string;
  /** The Retry's test id; `${testid}-retry` when omitted. */
  retryTestid?: string;
  /** The caller's own refetch. */
  onRetry?: () => void;
  /** The way out for a gone answer (Go home when omitted). */
  exit?: { label: MessageKey; to?: string; onPress?: () => void };
  /** What failed, in the caller's words, drawn before the reason. */
  subject?: ReactNode;
  size?: "block" | "tile" | "line";
  className?: string;
}

/** DEC-464 — the step-up Retry, on demand: the gate never rides a public page's first download. */
function StepUpUnavailable({ testid }: { testid: string; onRetry: () => void }) {
  return <LoadFailedHere testid={`${testid}-unavailable`} refreshTestid={`${testid}-refresh`} />;
}
const StepUpRetry = resilientLazy(
  () => import("./failure-step-up").then((mod) => mod.FailureStepUp),
  "the step-up retry",
  StepUpUnavailable,
  { inPlace: true },
);

function useNow(until: string | undefined): number {
  const at = until === undefined ? Number.NaN : Date.parse(until);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!(at > Date.now())) return;
    const id = window.setTimeout(
      () => setNow(Date.now()),
      Math.min(at - Date.now() + 50, 2 ** 31 - 1),
    );
    return () => window.clearTimeout(id);
  }, [at]);
  return now;
}

export function FailureNotice({
  error,
  testid,
  retryTestid,
  onRetry,
  exit,
  subject,
  size = "block",
  className,
}: FailureNoticeProps) {
  const { t, language } = useI18n();
  const reading = useMemo(() => failureKind(error), [error]);
  const row = KINDS[reading.kind];
  const now = useNow(reading.until);
  const [path, setPath] = useState("/");
  useEffect(() => {
    if (reading.kind === "signedOut")
      setPath(`${window.location.pathname}${window.location.search}`);
  }, [reading.kind]);
  useEffect(() => {
    console.warn("failure-notice", testid, reading.diagnostic);
  }, [testid, reading.diagnostic]);

  const words =
    reading.kind === "rateLimited"
      ? refusalText(rateRead(error), t, undefined, language)
      : t(row.words);
  const waiting = reading.until !== undefined && Date.parse(reading.until) > now;
  const retryId = retryTestid ?? `${testid}-retry`;
  const touch = "min-h-11";

  const step = (() => {
    switch (row.step) {
      case "retry":
      case "retryLater":
        return onRetry && (isRetryable(reading.kind) || row.step === "retryLater") ? (
          <Button
            type="button"
            variant="outline"
            size="touch"
            className={touch}
            data-testid={retryId}
            disabled={row.step === "retryLater" && waiting}
            onClick={onRetry}
          >
            {t("common.retry")}
          </Button>
        ) : null;
      case "exit":
        if (exit?.onPress)
          return (
            <Button
              type="button"
              variant="outline"
              size="touch"
              className={touch}
              data-testid={`${testid}-exit`}
              onClick={exit.onPress}
            >
              {t(exit.label)}
            </Button>
          );
        return (
          <Button asChild variant="outline" size="touch" className={touch}>
            <Link to={exit?.to ?? "/"} data-testid={`${testid}-exit`}>
              {t(exit?.label ?? "common.goHome")}
            </Link>
          </Button>
        );
      case "reload":
        return onRetry ? (
          <Button
            type="button"
            variant="outline"
            size="touch"
            className={touch}
            data-testid={`${testid}-reload`}
            onClick={onRetry}
          >
            {t("failure.reload")}
          </Button>
        ) : null;
      case "stepUp":
        return onRetry ? (
          <Suspense fallback={null}>
            <StepUpRetry testid={retryId} onRetry={onRetry} />
          </Suspense>
        ) : null;
      case "back":
        return (
          <Button
            type="button"
            variant="outline"
            size="touch"
            className={touch}
            data-testid={`${testid}-back`}
            onClick={() => window.history.back()}
          >
            {t("failure.goBack")}
          </Button>
        );
      case "signIn":
        return (
          <Button asChild variant="outline" size="touch" className={touch}>
            <Link to="/auth" search={signInReturn(path)} data-testid={`${testid}-sign-in`}>
              {t("auth.signIn")}
            </Link>
          </Button>
        );
    }
  })();

  return (
    <div
      role="alert"
      data-testid={testid}
      data-failure-reason={reading.kind}
      data-failure-class={reading.diagnostic}
      className={cn(
        "flex min-w-0 max-w-full flex-wrap items-center gap-2 break-words",
        size === "line" ? "text-sm" : "flex-col items-start text-sm",
        className,
      )}
    >
      {subject ? <div className="min-w-0 text-foreground">{subject}</div> : null}
      <p className="min-w-0 text-muted-foreground">{words}</p>
      {step}
    </div>
  );
}

export default FailureNotice;
