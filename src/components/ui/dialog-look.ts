import { Z_SHEET, Z_TOP, Z_VIEWER } from "@/components/layout/layers";
import { PRESSED } from "@/components/shell/menu-row";

/**
 * Turn S6-1 (Sage §14, the operator's D268) — ONE DIALOG LOOK. Every dialog, alert dialog and
 * sheet draws its scrim, panel, title, text, close button, footer and fields from here
 * (ui/dialog.tsx, ui/alert-dialog.tsx, ui/sheet.tsx; CF-DIALOG-1 judges). A consumer passes a
 * variant (size, fit, phone, layer, side), never its own look. Its own module, not menu-row.ts:
 * the dialog's strings stay off pages that draw no dialog, beyond the two the top bar reads.
 * Logical properties only (right-to-left), no scale on open (D264 ruling 2).
 */

/**
 * Sage §1 (turn SAGE-S1) — ONE CONTROL LOOK for the top bar's controls (the language and
 * theme controls, the phone search button, the account trigger) and the dialog's close button:
 * the card surface, a hairline edge, the control lift, 12 px corners. 44 px for a coarse
 * pointer (C2); 36 px for a fine one.
 */
export const CONTROL_LOOK = `${PRESSED.button} min-h-11 md:pointer-fine:min-h-9 rounded-md border border-hairline bg-card text-foreground shadow-control hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`;
/** Sage §1 — the search pill: the field fill and its pressed-in lift, no border. */
export const SEARCH_FIELD =
  "min-h-11 w-full rounded-full bg-field shadow-field ps-10 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** The layer a dialog paints on (INC-124): every modal on one, a viewer above it, the step-up on top. */
export const DIALOG_LAYER = { modal: Z_SHEET, viewer: Z_VIEWER, top: Z_TOP } as const;
export type DialogLayer = keyof typeof DIALOG_LAYER;

const FADE =
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0";

/** The scrim behind a dialog or sheet: the page green at 55 % (dark: black at 62 %). */
export const DIALOG_SCRIM = `fixed inset-0 bg-scrim ${FADE}`;

/** The panel: the popover surface, 22 × 24 px padding, 20 px corners, the dialog lift whose first
 *  layer is the ring. Centred by its insets and auto margins, never by a physical translate. */
export const DIALOG_PANEL = `fixed inset-0 m-auto grid h-fit w-[calc(100%-2rem)] gap-4 bg-popover px-6 py-5.5 text-popover-foreground rounded-dialog shadow-dialog outline-none duration-200 ${FADE}`;
export const DIALOG_SIZE = { narrow: "max-w-sm", default: "max-w-lg", wide: "max-w-4xl" } as const;
export type DialogSize = keyof typeof DIALOG_SIZE;
/** bounded: as tall as its content, scrolling inside the screen less 16 px a side; fill: a tall
 *  panel whose last child takes the room (a map). */
export const DIALOG_FIT = {
  bounded: "max-h-[calc(100dvh-2rem)] overflow-y-auto",
  fill: "flex h-[calc(100dvh-2rem)] flex-col md:h-[70vh]",
} as const;
export type DialogFit = keyof typeof DIALOG_FIT;
/** Below md, float keeps the centred card; sheet docks it to the bottom edge, with the grabber. */
export const DIALOG_PHONE = {
  float: "",
  sheet:
    "max-md:inset-x-0 max-md:bottom-0 max-md:top-auto max-md:m-0 max-md:w-full max-md:max-w-none max-md:rounded-b-none max-md:pb-[calc(1.375rem+env(safe-area-inset-bottom))] max-md:data-[state=open]:slide-in-from-bottom max-md:data-[state=closed]:slide-out-to-bottom",
} as const;
export type DialogPhone = keyof typeof DIALOG_PHONE;
/** The bottom sheet's grabber (ruling 11): a short bar on the panel's top edge. */
export const DIALOG_GRABBER = "mx-auto -mt-2 h-1 w-10 shrink-0 rounded-full bg-hairline";

/** The close button: the control look, 44 px below md and on a coarse pointer, 40 px on a fine
 *  pointer from md (ruling 5), on the panel's top end corner. */
export const DIALOG_CLOSE = `absolute end-4 top-4 inline-flex size-11 md:pointer-fine:size-10 cursor-pointer items-center justify-center ${CONTROL_LOOK} [&_svg]:size-4`;
/** The header clears the close button at its end. */
export const DIALOG_HEADER = "flex min-w-0 flex-col gap-1.5 pe-10 text-start";
/** The title: the display face, 20 px, weight 800. */
export const DIALOG_TITLE =
  "font-display text-xl font-extrabold leading-tight text-popover-foreground";
/** The description and body text: 14 px, muted. */
export const DIALOG_TEXT = "text-sm text-muted-foreground";
/** The footer: the rule across the panel above it, then the buttons — stacked below sm with the
 *  primary on top, in a row at the end from sm. */
export const DIALOG_FOOTER =
  "-mx-6 flex flex-col-reverse gap-2 px-6 pt-4 shadow-rule-top sm:flex-row sm:justify-end";

/** A text field, text area or select inside a dialog, a sheet or the filter panel (ruling 2):
 *  pressed in — the field fill and its inset lift, no edge. The posting form keeps the form kit's. */
export const DIALOG_FIELD =
  "in-data-[dialog-panel]:border-transparent in-data-[dialog-panel]:bg-field in-data-[dialog-panel]:shadow-field";

/** A sheet: the same surface and lift, docked to the start, the end or the bottom edge. */
export const SHEET_PANEL = `fixed flex flex-col gap-4 bg-popover px-6 py-5.5 text-popover-foreground shadow-dialog outline-none duration-300 ${FADE}`;
export const SHEET_SIDE = {
  start:
    "inset-y-0 start-0 h-full w-full overflow-y-auto sm:max-w-md sm:rounded-e-dialog data-[state=open]:slide-in-from-start data-[state=closed]:slide-out-to-start",
  end: "inset-y-0 end-0 h-full w-full overflow-y-auto sm:max-w-md sm:rounded-s-dialog data-[state=open]:slide-in-from-end data-[state=closed]:slide-out-to-end",
  bottom:
    "inset-x-0 bottom-0 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-t-dialog pb-[calc(1.375rem+env(safe-area-inset-bottom))] data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
} as const;
export type SheetSide = keyof typeof SHEET_SIDE;
