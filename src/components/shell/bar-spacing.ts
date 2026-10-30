/**
 * D256 (Foundations turn R1d-c) — ONE SPACING SCALE FOR THE TOP BAR from 768 px: the same
 * gap between neighbours (the menu toggle and the logo; the bar's controls) and the same
 * inset at both ends, never a negative margin. The logo cell and AppHeader read these;
 * CF-BAR-1 (scripts/conformance/shell-bands.test.ts) refuses another gap or a negative margin.
 */
export const BAR_GAP = "md:gap-2";
export const BAR_INSET = "md:px-2";
/**
 * AppHeader's own padding: its end is the bar's end inset (BAR_INSET's 8 px); its start is
 * an inner edge, kept on the page column's inset (the breadcrumb row's md:px-4), so the
 * folded wordmark stands over the breadcrumb's "Home" (TB-1).
 */
export const BAR_HEADER_INSET = "md:ps-4 md:pe-2";
