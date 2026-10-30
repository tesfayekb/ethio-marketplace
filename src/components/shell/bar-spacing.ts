/**
 * D256 (Foundations turn R1d-c) — ONE SPACING SCALE FOR THE TOP BAR from 768 px: the same
 * gap between neighbours (the menu toggle and the logo; the bar's controls) and the same
 * inset at both ends, never a negative margin. The logo cell and AppHeader read these;
 * CF-BAR-1 (scripts/conformance/shell-bands.test.ts) refuses another gap or a negative margin.
 */
export const BAR_GAP = "md:gap-2";
export const BAR_INSET = "md:px-2";
