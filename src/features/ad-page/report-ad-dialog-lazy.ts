import { resilientLazy } from "@/lib/resilient-lazy";

/**
 * L12 — the "Report this ad" dialog on demand: its code (the kit's Field, the
 * textarea, the report service) arrives on the first tap, never with the ad page.
 * A failed download reports through the shell's one notice (INC-911).
 */
export const LazyReportAdDialog = resilientLazy(
  () => import("./report-ad-dialog").then((module) => module.ReportAdDialog),
  "the report dialog",
  () => null,
);
