/**
 * D252 (Foundations turn R1d-b) — ONE HOME FOR THE MENU'S WIDTH. From 768 px the open
 * menu is 14rem (16rem from lg) and the folded menu 4rem. The rail and the logo cell
 * take it as a width; the page column and the footer take it as their start margin.
 * Nothing else writes these numbers (CF-WIDTH-1, scripts/conformance/menu-rows.test.ts).
 */
export const MENU_WIDTH = "md:w-56 lg:w-64 rail-icons:w-16";
export const MENU_INSET = "md:ms-56 lg:ms-64 rail-icons:ms-16";
