import { expect } from "../fixtures";

import { adminClient } from "./users";

/**
 * C3d — TWIN-SCOPED LOCATORS (J5). Every per-row element resolves inside its
 * own row, in whichever twin the viewport renders: the DataTable primitive's
 * default boundary is 768 (cards below it, a table at and above it).
 */
// C3-UX-1 PART A — the library is a DENSE table, so it keeps cards through the
// tablet band (`cardUntil="lg"`): the twin boundary here is 1024, not 768.
export const TWIN_BOUNDARY = 1024;

export function isCardTwin(page: import("@playwright/test").Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

export function librarySurface(page: import("@playwright/test").Page) {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

/** The row's ACTIONS region — a card sibling below md, a cell at md and up. */
export function libraryRows(page: import("@playwright/test").Page) {
  return librarySurface(page).locator(
    isCardTwin(page)
      ? "[data-testid^='attribute-row-'][data-testid$='-card']:not([data-testid$='-expanded'])"
      : // INC-172 — the options expansion injects a `<tr>` whose testid shares the
        // row prefix (`…-expanded-row`); the page window is the DATA rows alone.
        "tbody tr[data-testid^='attribute-row-']:not([data-testid$='-expanded-row'])",
  );
}

export function attributeActions(page: import("@playwright/test").Page, key: string) {
  return librarySurface(page).getByTestId(
    isCardTwin(page) ? `attribute-row-${key}-actions` : `attribute-row-${key}-actions-cell`,
  );
}

/**
 * C3-UX-1c — the row carries ONE \u22ef trigger and every verb lives in its menu
 * (a portal, so the menu is addressed at the page, never inside the row).
 */
export async function openAttributeMenu(page: import("@playwright/test").Page, key: string) {
  await attributeActions(page, key).getByTestId(`attribute-actions-${key}`).click();
  const menu = page.getByTestId("attribute-actions-menu");
  await expect(menu).toBeVisible({ timeout: 20000 });
  return menu;
}

/**
 * DEC-050 L3b — THE OPTION ROW EDITOR. Rows are addressed structurally: the
 * group is the parent value (or `flat`), the row is its stored value.
 */
export function optionGroup(page: import("@playwright/test").Page, parent: string) {
  return page.getByTestId(`option-group-${parent === "" ? "flat" : parent}`);
}

export function optionRow(page: import("@playwright/test").Page, parent: string, value: string) {
  return optionGroup(page, parent).getByTestId(`option-row-${value}`);
}

export async function addOptionRow(
  page: import("@playwright/test").Page,
  parent: string,
  value: string,
  labels?: { en?: string; am?: string },
) {
  const group = optionGroup(page, parent);
  await group.getByTestId(`option-add-${parent === "" ? "flat" : parent}`).click();
  const row = group.locator('[data-testid^="option-row-new-"]').last();
  /* The labels first: typing the value re-keys the row's own testid. */
  if (labels?.en !== undefined) await row.getByTestId("option-label-en").fill(labels.en);
  if (labels?.am !== undefined) await row.getByTestId("option-label-am").fill(labels.am);
  await row.getByTestId("option-value").fill(value);
}

/** A scratch definition, minted straight through the service client (J3). */

export async function seedAttribute(key: string, type = "text") {
  const { data, error } = await adminClient()
    .from("attributes")
    .insert({ attr_key: key, name_en: key, attr_type: type })
    .select("id")
    .single();
  if (error) throw new Error(`seedAttribute failed: ${error.message}`);
  return data.id as string;
}

export async function readAttribute(key: string) {
  const { data } = await adminClient()
    .from("attributes")
    .select("id, attr_key, name_en, attr_type, options, depends_on")
    .eq("attr_key", key)
    .maybeSingle();
  return data;
}

export async function readLinks(categoryId: string) {
  const { data } = await adminClient()
    .from("category_attribute_links")
    .select("id, attribute_id, is_required, display_order, card_rank")
    .eq("category_id", categoryId)
    .order("display_order");
  return data ?? [];
}

export async function destroyAttribute(key: string) {
  const row = await readAttribute(key);
  if (!row) return;
  // INC-383 — every step checks its error; a failed reap is loud.
  const fail = (step: string, error: { message: string } | null) => {
    if (error) throw new Error(`[e2e:reap] ${step} of ${key} failed: ${error.message}`);
  };
  const links = await adminClient()
    .from("category_attribute_links")
    .delete()
    .eq("attribute_id", row.id);
  fail("links", links.error);
  // IE-4b — a scratch definition can now own an am translation row; it leaves
  // with the fixture (J3), because entity_translations carries no FK cascade.
  const translations = await adminClient()
    .from("entity_translations")
    .delete()
    .eq("entity_type", "attribute")
    .eq("entity_id", row.id);
  fail("translations", translations.error);
  const deleted = await adminClient().from("attributes").delete().eq("id", row.id);
  fail("attribute", deleted.error);
}
