import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { fill } from "@/features/posting/refusal-text";
import { useI18n, type MessageKey } from "@/i18n";
import { dateFormatter } from "@/lib/format";
import { refreshAfterWrite } from "@/lib/refresh-after-write";

import { OUTCOME_KEY, PAUSE_KEY, resumeJob, useJobLine, type JobLine } from "./use-name-checks";
import { ADMIN_SCREENING_KEY } from "./use-screening";

/**
 * N1b-3c (INC-977) — THE SELLER-NAME RE-CHECK'S HEALTH, one line in Admin ›
 * Screening for staff with services:view (admin_job_health). It says the last
 * run and when; "the site did not answer" for a run sent over two minutes ago
 * that never arrived; the pause and its reason, with Resume for services:manage
 * (admin_job_resume, under the page's second factor); "Not set up yet" before
 * the Vault entries exist. A failed or out-of-shape read says so — never a
 * healthy line, never a count.
 *
 * Testids: `admin-job-line` (data-state = the line's kind, or `error`),
 * Resume `admin-job-resume`.
 */
export function JobHealthLine({
  mayView,
  mayResume,
  guard,
  onNotice,
}: {
  mayView: boolean;
  mayResume: boolean;
  guard: GuardFn;
  onNotice: (key: MessageKey, tone: "ok" | "error") => void;
}) {
  const { t, language } = useI18n();
  const queryClient = useQueryClient();
  const health = useJobLine(mayView);
  const [busy, setBusy] = useState(false);

  if (!mayView || health.isLoading) return null;

  const when = (iso: string) =>
    dateFormatter("dayTimeNumeric", language).format(new Date(iso));

  const sentence = (line: JobLine): string => {
    switch (line.kind) {
      case "paused":
        return fill(t("admin.screening.job.paused"), {
          time: when(line.since),
          reason: t(PAUSE_KEY[line.reason]),
        });
      case "noAnswer":
        return fill(t("admin.screening.job.noAnswer"), { time: when(line.sentAt) });
      case "notConfigured":
        return t("admin.screening.job.notConfigured");
      case "lastRun":
        return fill(t("admin.screening.job.lastRun"), {
          outcome: t(OUTCOME_KEY[line.outcome]),
          time: when(line.at),
        });
    }
  };

  const resume = async () => {
    setBusy(true);
    let answer: "done" | "notPaused";
    try {
      answer = await guard(() => resumeJob());
    } catch (error) {
      setBusy(false);
      const abort = stepUpAbortKey(error);
      if (abort === null) return;
      console.error("[screening] resume failed", error);
      onNotice(abort ?? "common.error", "error");
      return;
    }
    setBusy(false);
    await refreshAfterWrite(queryClient, { queryKey: ADMIN_SCREENING_KEY });
    onNotice(
      answer === "done"
        ? "admin.screening.job.resume.done"
        : "admin.screening.job.resume.notPaused",
      "ok",
    );
  };

  const line = health.error === null && health.data !== undefined ? health.data : null;

  return (
    <div
      data-testid="admin-job-line"
      data-state={line === null ? "error" : line.kind}
      className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm"
    >
      <span className="font-medium">{t("admin.screening.job.title")}</span>
      {line === null ? (
        <span role="alert" className="text-destructive">
          {t("admin.screening.job.error")}
        </span>
      ) : (
        <span className="min-w-0 break-words">{sentence(line)}</span>
      )}
      {line?.kind === "paused" && mayResume ? (
        <Button
          type="button"
          variant="outline"
          size="touch"
          disabled={busy}
          data-testid="admin-job-resume"
          onClick={() => void resume()}
        >
          {t("admin.screening.job.action.resume")}
        </Button>
      ) : null}
    </div>
  );
}

export default JobHealthLine;
