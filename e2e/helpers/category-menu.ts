import type { Locator } from "@playwright/test";

/**
 * INC-170's class (INC-170, INC-170b, INC-561 — the third occurrence; bundle 11
 * turn C3) — THE ONE READER OF THE PUBLIC CATEGORY MENU'S ROWS.
 *
 * Other tests' scratch roots (slugs `e2e-…`, J1) share the public rail and
 * drawer while a test reads them. A test that judges "the first category", a
 * row's label or the catalogue's rows reads the catalogue's own rows only
 * (`catalogueRows`); a test that checks an absence, or the order of its own
 * scratch roots, reads every row (`anyMenuRows`). No e2e file builds a row
 * selector of its own: scripts/e2e-menu-readers.ts refuses one anywhere but
 * here. An exact row (`rail-category-<slug>`, `rail-category-all`) is read by
 * its own testid as before.
 */
export const MENU_ROW_PREFIX = "rail-category-";

/** Every row of the menu, scratch roots included: for an absence, or a test's own scratch roots. */
export const ANY_MENU_ROW = `[data-testid^="${MENU_ROW_PREFIX}"]`;

/** The catalogue's own rows: never another test's scratch root. */
export const CATALOGUE_MENU_ROW = `${ANY_MENU_ROW}:not([data-testid^="${MENU_ROW_PREFIX}e2e-"])`;

/** The catalogue's own rows inside `scope`; `element` narrows them (e.g. "nav li > a"). */
export function catalogueRows(scope: Locator, element = ""): Locator {
  return scope.locator(`${element}${CATALOGUE_MENU_ROW}`);
}

/** Every row inside `scope`, scratch roots included. */
export function anyMenuRows(scope: Locator): Locator {
  return scope.locator(ANY_MENU_ROW);
}

/** A row's slug from its testid. */
export function slugOfRow(testid: string): string {
  return testid.startsWith(MENU_ROW_PREFIX) ? testid.slice(MENU_ROW_PREFIX.length) : testid;
}

/** True for another test's scratch root (J1). */
export function isScratchSlug(slug: string): boolean {
  return slug.startsWith("e2e-");
}
