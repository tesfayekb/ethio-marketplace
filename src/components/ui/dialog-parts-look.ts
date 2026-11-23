/** The anatomy's looks travel with its on-demand implementation, not with fields. */
export const BANDS_STILL = "rounded-dialog shadow-dialog text-popover-foreground";
export const BANDS_HEAD =
  "relative flex shrink-0 flex-col gap-2 bg-card px-6 py-5.5 pb-4 pe-16 shadow-band";
/** The body is ONE element, a direct child of the panel: a block scroller that starts as tall as
 *  its content (`grow`, never `flex-1`) and shrinks when the panel's height limit binds. With a
 *  zero basis, or behind a wrapper, WebKit gives it no height in a panel that fits its content;
 *  as a flex column it squeezes a fixed-height child in Chromium (a map collapsed to its border).
 *  `relative`: an absolutely placed descendant (a screen-reader-only label, a hidden native
 *  control) is held by the scroller; without it the panel itself gains hidden room below its
 *  footer, and a scroll to a control can push the header out of the panel. */
export const BANDS_BODY = "relative min-h-0 grow overflow-y-auto overscroll-contain";
/** The body's content: as tall as it is, never squeezed; the body scrolls. Its top and bottom
 *  inset is the content's, not the scroller's, so the cue sticks to the body's true bottom edge. */
export const BANDS_FLOW = "flex flex-col gap-3";
/** The body's insets; a `flush` body has none (its content brings its own box). */
export const BANDS_INSET_X = "px-6";
export const BANDS_INSET_Y = "py-4";
/** A body whose one child fills the panel's room (a photo, a map): no scroll, no cue. */
export const BANDS_FILL = "flex min-h-0 flex-1 flex-col overflow-hidden";
/** The panel's last band carries the bottom inset: the footer does; a body with no footer says so. */
export const BANDS_END = "pb-[calc(1.375rem+env(safe-area-inset-bottom))]";
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
/** The cue's anchor: the last thing in the scroller, stuck to its bottom edge, zero tall. */
export const CUE_ANCHOR = "pointer-events-none sticky bottom-0 h-0";
/** The anchor spans the body's side insets, so the fade runs edge to edge. */
export const CUE_SPAN = "-mx-6";
/**
 * The hint's room as the body's scroll padding (INC-1254, WCAG 2.2 2.4.11): 2rem;
 * less in a body too short to keep 3rem clear of it; none below that
 * (the percentage is the scrolling body's own height). No calc() inside: the DOM returns it as is.
 */
export const CUE_ROOM = "clamp(0px, 100% - 3rem, 2rem)";
export const CUE_MIN_BODY_REM = 5;
export const CUE_WRAP =
  "pointer-events-none absolute inset-x-0 bottom-0 flex h-8 items-center justify-center gap-1 cue-fade px-6 text-sm font-medium text-foreground";
export const STEP_TRACK = "flex min-w-0 items-center gap-2 text-xs text-muted-foreground";
export const STEP_MARK =
  "inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold [&_svg]:size-4";
export const CLOSED_PRIMARY =
  "data-[closed=1]:border data-[closed=1]:border-input data-[closed=1]:bg-secondary data-[closed=1]:text-secondary-foreground data-[closed=1]:hover:bg-secondary/80";
