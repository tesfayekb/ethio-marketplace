import { type Locator, type Page } from "@playwright/test";

import { expect } from "../fixtures";
import { assertNoStringifiedLeak } from "./ui";
import { adminClient } from "./users";

/**
 * LOCATIONS ERA L2b-C1 — SHARED COUNTRIES-CONSOLE HELPERS.
 *
 * Mirrors e2e/helpers/locations.ts 1:1 (B3): twin-aware locators, the fixture
 * law (a scratch market → destroyCountry, places before the anchor), DB truth
 * through the service client (J4) and a dump on every failure path.
 *
 * IDENTITY (J1) — a scratch market's CODE is drawn from the ISO 3166-1
 * USER-ASSIGNED ranges (QM–QZ, XA–XZ), which the standard will never assign to
 * a real country, so a fixture can never collide with a market the product
 * cares about; its NAME carries the `E2E-Scratch-` prefix the reaper and the
 * human eye both read.
 */

/** Every code the standard leaves to private use — the whole scratch universe. */
export function userAssignedCodes(): string[] {
  const letters = (from: string, to: string) => {
    const out: string[] = [];
    for (let code = from.charCodeAt(0); code <= to.charCodeAt(0); code += 1) {
      out.push(String.fromCharCode(code));
    }
    return out;
  };
  return [
    ...letters("M", "Z").map((second) => `Q${second}`),
    ...letters("A", "Z").map((second) => `X${second}`),
  ];
}

export function isUserAssigned(code: string): boolean {
  return userAssignedCodes().includes(code.toUpperCase());
}

/** A free user-assigned code, asserted ABSENT from `countries` before use. */
export async function scratchCountryCode(): Promise<string> {
  const pool = userAssignedCodes();
  const { data, error } = await adminClient().from("countries").select("code").in("code", pool);
  if (error) throw new Error(`[e2e:l2b] reading the scratch pool failed: ${error.message}`);
  const taken = new Set((data ?? []).map((row) => row.code));
  const free = pool.filter((code) => !taken.has(code));
  if (free.length === 0) throw new Error("[e2e:l2b] every user-assigned code is taken");
  const picked = free[Math.floor(Math.random() * free.length)] as string;
  return picked;
}

/** The scratch market's name — what the reaper's predicate reads. */
export function scratchCountryName(code: string): string {
  const run = process.env["E2E_SHARD"] ?? "local";
  const worker = process.env["TEST_WORKER_INDEX"] ?? "0";
  return `E2E-Scratch-${code}-${run}-${worker}`;
}

/** Seed a scratch market before navigation; creation in the UI is file-only. */
export async function seedCountry(code: string) {
  if (!isUserAssigned(code)) throw new Error(`[e2e:l2c] refusing to seed ${code}`);
  const { error } = await adminClient().from("countries").insert({
    code,
    name_en: scratchCountryName(code),
    is_active: false,
    unit_system: "metric",
    currency_code: "USD",
    display_order: 0,
  });
  if (error) throw new Error(`[e2e:l2c] seeding ${code} failed: ${error.message}`);
}

/** The roster keeps cards through `lg`, exactly as the places roster does. */
export const TWIN_BOUNDARY = 1024;

export function isCardTwin(page: Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

export function surface(page: Page): Locator {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

export function countryRow(page: Page, code: string): Locator {
  const id = `country-${code}`;
  return surface(page).getByTestId(isCardTwin(page) ? `${id}-card` : id);
}

export function actionsOf(page: Page, code: string): Locator {
  const id = `country-${code}`;
  return surface(page).getByTestId(isCardTwin(page) ? `${id}-actions` : `${id}-actions-cell`);
}

export function editButton(page: Page, code: string): Locator {
  return actionsOf(page, code).getByTestId(`country-edit-${code}`);
}

/** A verb of the OPEN editor's bar — exactly one match per name (J5). */
export function verb(page: Page, name: string): Locator {
  return page.getByTestId("country-verb-bar").getByTestId(`country-verb-${name}`);
}

export async function dialogDump(page: Page, label: string): Promise<string> {
  const open = await page.evaluate(() =>
    [...document.querySelectorAll('[data-testid$="-dialog"],[data-testid="country-editor"]')].map(
      (node) => ({
        testid: node.getAttribute("data-testid"),
        openedBy: node.getAttribute("data-opened-by"),
      }),
    ),
  );
  const rendered =
    open.length === 0
      ? "none"
      : open.map((entry) => `${entry.testid} opened-by=${entry.openedBy ?? "?"}`).join(" | ");
  return `[dialog-dump ${label}] open dialogs: ${rendered}`;
}

/** SEARCH IS THE ANCHOR — never page position (the places precedent). */
export async function findRow(page: Page, code: string, needle?: string): Promise<Locator> {
  await page.getByTestId("country-search").fill(needle ?? code);
  const row = countryRow(page, code);
  try {
    await expect(row).toBeVisible({ timeout: 20000 });
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${await dialogDump(page, `findRow(${code})`)}`,
    );
  }
  await assertNoStringifiedLeak(page, `findRow(${code})`);
  return row;
}

/** Opens a row's EDITOR — the one surface every verb hangs off (CT-8 mirror). */
export async function openEditor(page: Page, code: string) {
  await editButton(page, code).click();
  try {
    await expect(page.getByTestId("country-editor")).toBeVisible({ timeout: 20000 });
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${await dialogDump(page, `openEditor(${code})`)}`,
    );
  }
}

/** Opens the editor of `code` and clicks one of its verbs. */
export async function openVerb(page: Page, code: string, name: string, needle?: string) {
  await findRow(page, code, needle);
  await openEditor(page, code);
  await verb(page, name).click();
}

/** DB truth (J4): the country row read through the service client. */
export async function readCountry(code: string) {
  const { data, error } = await adminClient()
    .from("countries")
    .select("code, name_en, is_active, unit_system, currency_code, display_order")
    .eq("code", code)
    .maybeSingle();
  if (error) throw new Error(`[e2e:l2b] reading ${code} failed: ${error.message}`);
  return data;
}

/** DB truth (J4): the market's anchor place, born inactive at L2b-M. */
export async function readAnchor(code: string) {
  const { data, error } = await adminClient()
    .from("locations")
    .select("id, slug, name_en, level, is_active, parent_id")
    .eq("country_code", code)
    .eq("level", "country")
    .maybeSingle();
  if (error) throw new Error(`[e2e:l2b] reading the anchor of ${code} failed: ${error.message}`);
  return data;
}

/** DB truth (J4): the market's rail order rows, in position order. */
export async function readRootOrder(code: string) {
  const { data, error } = await adminClient()
    .from("country_root_order")
    .select("category_id, position")
    .eq("country_code", code)
    .order("position");
  if (error)
    throw new Error(`[e2e:l2b] reading the rail order of ${code} failed: ${error.message}`);
  return data ?? [];
}

/**
 * Destroys a scratch market: its places (deepest first), then its rail order,
 * then the row. Only ever called on a USER-ASSIGNED code.
 */
export async function destroyCountry(code: string) {
  if (!isUserAssigned(code)) throw new Error(`[e2e:l2b] refusing to destroy ${code}`);
  const supabase = adminClient();
  const { data: places } = await supabase
    .from("locations")
    .select("id, level")
    .eq("country_code", code);
  const rank: Record<string, number> = { sub_city: 0, city: 1, region: 2, country: 3 };
  for (const place of [...(places ?? [])].sort(
    (a, b) => (rank[a.level] ?? 9) - (rank[b.level] ?? 9),
  )) {
    await supabase
      .from("entity_translations")
      .delete()
      .eq("entity_type", "location")
      .eq("entity_id", place.id);
    await supabase.from("locations").delete().eq("id", place.id);
  }
  await supabase.from("country_root_order").delete().eq("country_code", code);
  await supabase.from("countries").delete().eq("code", code);
}
