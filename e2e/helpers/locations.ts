import { type Locator, type Page } from "@playwright/test";

import { expect } from "../fixtures";
import { assertNoStringifiedLeak } from "./ui";
import { adminClient } from "./users";

/**
 * LOCATIONS ERA L2a — SHARED LOCATIONS-CONSOLE HELPERS.
 *
 * Mirrors e2e/helpers/categories.ts 1:1 (B3): twin-aware locators, the fixture
 * law (scratch slug → destroyLocation, child-first), DB truth through the
 * service client (J4) and a dump on every failure path.
 *
 * IDENTITY (J1) — every scratch row's SLUG starts `e2e-` and carries run ×
 * job (E2E_SHARD) × worker × tag, and its NAME carries the `E2E-Scratch-`
 * prefix the reaper and the human eye both read. The console's row key is the
 * SLASH PATH of slugs, because a slug is only unique among its siblings.
 */

export const RUN = process.env["E2E_SHARD"] ?? "local";

export function rand() {
  return Math.random().toString(36).slice(2, 8);
}

/** A scratch slug: `e2e-loc-<run>-<worker>-<tag>-<rand>` (J1). */
export function scratchSlug(tag: string) {
  const worker = process.env["TEST_WORKER_INDEX"] ?? "0";
  return `e2e-loc-${RUN}-${worker}-${tag}-${rand()}`.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

/**
 * The name the console types. The door derives the slug from the name, and the
 * derivation is the identity map on `[a-z0-9-]`, so a lower-cased scratch slug
 * used AS the name keeps the fixture namespaced without guessing the server.
 * `E2E-Scratch-` is prepended only where a test needs the human-readable form;
 * the reaper's predicate is the SLUG prefix (DEC-062 delta, L2a).
 */
export function scratchName(tag: string) {
  return scratchSlug(tag);
}

/** The Tree tab's twin boundary: the roster keeps cards through `lg`. */
export const TWIN_BOUNDARY = 1024;

export function isCardTwin(page: Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

export function surface(page: Page): Locator {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

/** The console's row id is the slash key with `/` → `__`. */
export function keyTestId(key: string) {
  return key.replace(/\//g, "__");
}

export function locationRow(page: Page, key: string): Locator {
  const id = `location-${keyTestId(key)}`;
  return surface(page).getByTestId(isCardTwin(page) ? `${id}-card` : id);
}

/** The actions REGION differs per twin: card sibling vs table cell. */
export function actionsOf(page: Page, key: string): Locator {
  const id = `location-${keyTestId(key)}`;
  return surface(page).getByTestId(isCardTwin(page) ? `${id}-actions` : `${id}-actions-cell`);
}

/**
 * L2a-R — THE ROW CARRIES ONE VERB: the 44px pencil that opens the editor (the
 * categories convention). Everything else is reached through the editor's verb
 * bar, so `verb()` below replaces the old per-row `action()` helper.
 */
export function editButton(page: Page, key: string): Locator {
  return actionsOf(page, key).getByTestId(`location-edit-${keyTestId(key)}`);
}

/** A verb of the OPEN editor's bar — exactly one match per name (J5). */
export function verb(page: Page, name: string): Locator {
  return page.getByTestId("location-verb-bar").getByTestId(`location-verb-${name}`);
}

export async function dialogDump(page: Page, label: string): Promise<string> {
  const open = await page.evaluate(() =>
    [...document.querySelectorAll('[data-testid$="-dialog"],[data-testid="location-editor"]')].map(
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

/**
 * L2b-C1 — THE PICKER OPENS ON "ALL COUNTRIES". A test about ONE market's tree
 * therefore names its market first; the default itself is asserted by LT-13.
 */
export async function selectMarket(page: Page, code: string) {
  const picker = page.getByTestId("location-country-filter");
  await expect(picker).toBeVisible({ timeout: 20000 });
  await picker.selectOption(code);
}

/** SEARCH IS THE ANCHOR — never page position (the categories precedent). */
export async function findRow(page: Page, key: string, needle?: string): Promise<Locator> {
  const leaf = key.split("/").slice(-1)[0] ?? key;
  await page.getByTestId("location-search").fill(needle ?? leaf);
  const row = locationRow(page, key);
  try {
    await expect(row).toBeVisible({ timeout: 20000 });
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${await dialogDump(page, `findRow(${key})`)}`,
    );
  }
  await assertNoStringifiedLeak(page, `findRow(${key})`);
  return row;
}

/** Opens a row's EDITOR — the one surface every verb hangs off (CT-8 mirror). */
export async function openEditor(page: Page, key: string) {
  await editButton(page, key).click();
  try {
    await expect(page.getByTestId("location-editor")).toBeVisible({ timeout: 20000 });
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${await dialogDump(page, `openEditor(${key})`)}`,
    );
  }
}

/** Opens the editor of `key` and clicks one of its verbs. */
export async function openVerb(page: Page, key: string, name: string, needle?: string) {
  await findRow(page, key, needle);
  await openEditor(page, key);
  await verb(page, name).click();
}

/** DB truth (J4): the scratch location row read through the service client. */
export async function readLocation(slug: string) {
  const { data, error } = await adminClient()
    .from("locations")
    .select(
      "id, parent_id, level, country_code, region_id, city_id, slug, name_en, iso_3166_2, aliases, display_order, center_lat, center_lng, is_active, source",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`[e2e:l2a] reading ${slug} failed: ${error.message}`);
  return data;
}

/** DB truth (J4): the entity translations of a location row. */
export async function readLocationTranslations(locationId: string) {
  const { data, error } = await adminClient()
    .from("entity_translations")
    .select("field, lang_code, value, status")
    .eq("entity_type", "location")
    .eq("entity_id", locationId);
  if (error) throw new Error(`[e2e:l2a] reading translations failed: ${error.message}`);
  return data ?? [];
}

/**
 * Destroys a scratch row CHILD-FIRST, translations before rows, so a nested
 * chain never fails on its own descendants. Only ever called on `e2e-` slugs.
 */
export async function destroyLocation(slug: string) {
  if (!slug.startsWith("e2e-")) throw new Error(`[e2e:l2a] refusing to destroy ${slug}`);
  const supabase = adminClient();
  const row = await readLocation(slug);
  if (!row) return;

  const descendants: string[] = [];
  let frontier = [row.id];
  for (let depth = 0; depth < 4 && frontier.length > 0; depth += 1) {
    const { data } = await supabase.from("locations").select("id").in("parent_id", frontier);
    frontier = (data ?? []).map((child) => child.id);
    descendants.push(...frontier);
  }
  // Deepest first: the ancestry guard refuses a parent while a child stands.
  for (const id of [...descendants.reverse(), row.id]) {
    await supabase
      .from("entity_translations")
      .delete()
      .eq("entity_type", "location")
      .eq("entity_id", id);
    await supabase.from("locations").delete().eq("id", id);
  }
}

/**
 * An ACTIVE seeded region of a market, to parent scratch rows onto — a real
 * reference row, read never written (J3).
 */
export async function regionUnder(countryCode: string) {
  const { data, error } = await adminClient()
    .from("locations")
    .select("id, slug, name_en")
    .eq("country_code", countryCode)
    .eq("level", "region")
    .eq("is_active", true)
    .not("slug", "like", "e2e-%")
    .order("display_order")
    .limit(1)
    .maybeSingle();
  if (error || !data) {
    throw new Error(`[e2e:l2a] no active region in ${countryCode}: ${error?.message ?? "no row"}`);
  }
  return data;
}

/** The market anchor row (level `country`) of a market. */
export async function anchorOf(countryCode: string) {
  const { data, error } = await adminClient()
    .from("locations")
    .select("id, slug, name_en")
    .eq("country_code", countryCode)
    .eq("level", "country")
    .maybeSingle();
  if (error || !data) {
    throw new Error(`[e2e:l2a] no anchor in ${countryCode}: ${error?.message ?? "no row"}`);
  }
  return data;
}

/** The public tree's version, so a poll waits on a CHANGE, never on a clock. */
export async function treeVersion(page: Page, countryCode: string): Promise<string | null> {
  const response = await page.request.get(`/api/locations/${countryCode}`);
  if (!response.ok()) return null;
  const body = (await response.json()) as { version?: string };
  return body.version ?? null;
}

/** The public tree's slugs, in the route's own order. */
export async function treeSlugs(page: Page, countryCode: string): Promise<string[]> {
  const response = await page.request.get(`/api/locations/${countryCode}`);
  if (!response.ok()) return [];
  const body = (await response.json()) as { nodes?: { slug: string }[] };
  return (body.nodes ?? []).map((node) => node.slug);
}
