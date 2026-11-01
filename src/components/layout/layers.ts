/**
 * U6-C1-R3b-1 STEP 3 — THE LAYER ORDER, in ONE place.
 *
 * At 360 pixels the form's actions are a STICKY BAR at the bottom of the screen
 * (`FormLayout`), and every popover a step opens — the currency list, a select's
 * menu, the writing helper's suggestions — opens UPWARDS into exactly that
 * space. Two components each choosing their own `z-10` decided the winner by
 * source order, and the bar won: a seller tapping a currency hit the Next button
 * underneath it.
 *
 * So the order is declared here and imported, never re-guessed per file:
 *
 *   bar  <  opened phone menu  <  popover / sheet
 *
 * A popover stays in the form's own stacking context (the grid creates none), so
 * a class is enough and no portal is needed; a sheet or a dialog is the one
 * dialog primitive's portal (ui/dialog.tsx), because it covers the page
 * including the bar.
 *
 * INC-124: the opened phone menu is z-40 with its scrim at z-35. It paints
 * over the z-30 top/bottom bars and z-20 strip, but remains below z-50 modal
 * dialogs and sheets.
 */

/** The sticky mobile action bar — the LOWEST of the three. */
export const Z_ACTION_BAR = "z-20";

/** Any popover, listbox or menu a step opens: above the bar. */
export const Z_POPOVER = "z-40";

/** The modal layer: every dialog, sheet and full-screen surface (the buyer's-eye preview, the pin
 *  map) — read only through dialog-look.ts's DIALOG_LAYER.modal (turn S6-4). */
export const Z_SHEET = "z-50";

/** D161 — the full-screen photo viewer, opened from a gallery inside a sheet: above the sheet;
 *  read only through DIALOG_LAYER.viewer (turn S6-4). */
export const Z_VIEWER = "z-[60]";

/** INC-124 — the sensitive-action step-up owns the top layer, above every other dialog; only
 *  DialogContent's `layer="top"` uses it (turn S6-1). */
export const Z_TOP = "z-[100]";
