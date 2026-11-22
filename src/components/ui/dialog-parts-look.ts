import { CONTROL_LOOK } from "@/components/shell/menu-row";

/** The anatomy's looks travel with its on-demand implementation, not with fields. */
export const BANDS_STILL = "rounded-dialog shadow-dialog text-popover-foreground";
export const BANDS_HEAD =
  "relative flex shrink-0 flex-col gap-2 bg-card px-6 py-5.5 pb-4 pe-16 shadow-band";
export const BANDS_BODY =
  "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4";
export const BANDS_FOOT =
  "relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1";
export const BANDS_GRABBER = "hidden max-md:in-data-[phone=sheet]:block -mt-2 mb-1 mx-auto";
export const DIALOG_CARD = "rounded-card bg-card p-4 shadow-card";
export const DIALOG_TILE =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-xl [&_svg]:size-5";
export const DIALOG_TONE = {
  plain: "bg-muted text-foreground",
  confirm: "bg-primary text-primary-foreground",
  danger: "bg-destructive text-destructive-foreground",
} as const;
export const CUE_WRAP =
  "pointer-events-none absolute inset-x-0 bottom-0 flex justify-center cue-fade px-6 py-4 pb-2";
export const CUE_BUTTON = `pointer-events-auto inline-flex min-h-11 md:pointer-fine:min-h-9 items-center gap-1 rounded-full px-4 text-sm font-medium ${CONTROL_LOOK}`;
export const STEP_TRACK = "flex min-w-0 items-center gap-2 text-xs text-muted-foreground";
export const STEP_MARK =
  "inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold [&_svg]:size-4";
export const CLOSED_PRIMARY =
  "data-[closed=1]:border data-[closed=1]:border-input data-[closed=1]:bg-secondary data-[closed=1]:text-secondary-foreground data-[closed=1]:hover:bg-secondary/80";
