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
 *   bar  <  popover  <  sheet
 *
 * A popover stays in the form's own stacking context (the grid creates none), so
 * a class is enough and no portal is needed; the SHEET is a portal, because it
 * covers the page including the bar.
 */

/** The sticky mobile action bar — the LOWEST of the three. */
export const Z_ACTION_BAR = "z-20";

/** Any popover, listbox or menu a step opens: above the bar. */
export const Z_POPOVER = "z-40";

/** A full-screen sheet (the buyer's-eye preview): above everything. */
export const Z_SHEET = "z-50";
