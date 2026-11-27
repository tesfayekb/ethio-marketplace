import type { BrowserKind } from "@/lib/error-clean";
import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";

/**
 * DEC-474 Part F — A FAILURE IN THE BROWSER IS REPORTED, BY ONE TRIGGER. The failure notice's
 * `server` reading (src/components/shell/failure-reason.ts), the crash boundary
 * (src/routes/__root.tsx) and the page's unhandled errors and rejections (`listenForFailures`, from
 * the client entry) call `reportBrowserFailure`; nothing else does (the reporter census,
 * scripts/conformance/error-reports.ts). The sender, the cleaner and the report's shape download
 * only when a failure happens. The reporter failing is silent to the person and never loops: a
 * failed download or send is logged once as `[error-report] send failed` and never retried.
 */
export type BrowserFailure = {
  kind: BrowserKind;
  /** A typed failure's code or status; null for a crash or an unhandled error. */
  code: string | null;
  error: unknown;
};

const sender = loadOnce(() => import("@/lib/error-report-send"));

export function reportBrowserFailure(failure: BrowserFailure): void {
  if (typeof window === "undefined") return;
  try {
    void sender.load().then(
      (module) => module.sendReport(failure),
      (error: unknown) => console.error("[error-report] send failed", errorText(error)),
    );
  } catch (error) {
    console.error("[error-report] send failed", errorText(error));
  }
}

/**
 * The page's own unhandled errors and rejections. An `error` event with no error object (a script
 * from another origin, which the browser hides) carries nothing of ours and is not reported.
 */
export function listenForFailures(target: Window): void {
  target.addEventListener("error", (event) => {
    if (event.error === undefined || event.error === null) return;
    reportBrowserFailure({ kind: "unhandled", code: null, error: event.error });
  });
  target.addEventListener("unhandledrejection", (event) => {
    reportBrowserFailure({ kind: "unhandled", code: null, error: event.reason });
  });
}
