import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { LANGUAGE_STORAGE_KEY } from "../src/i18n/provider";

import { gotoReady, openRailScope, signIn } from "./helpers/ui";
import { ANY_MENU_ROW, catalogueRows, isScratchSlug, slugOfRow } from "./helpers/category-menu";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * U0h PART 2 / U0i PART 3 — I18N CHROME COVERAGE GUARD.
 *
 * Law D1 says no user-visible literal strings; this guard proves the stronger
 * runtime property: with Amharic selected, the SHELL CHROME contains
 *   (a) no English value of a key that HAS a distinct Amharic value (i.e. no
 *       key silently fell back to en through `messages[key] ?? en[key]`),
 *   (b) no raw dot-notation key name (a missing catalog entry rendered bare),
 *   (c) no category row still showing its English `name_en` (U0i part 1 gave
 *       every category a provisional `name_am`, so data-driven rows are now IN
 *       scope — they used to be excluded as a seed gap).
 */

/** Keys whose Amharic value is intentionally identical to English. */
const INTENTIONALLY_IDENTICAL = new Set<string>([
  "app.name", // brand wordmark — never translated
  "language.amharic", // the language's own endonym, shown in both catalogs
  "language.enShort",
  "language.amShort",
  "auth.emailPlaceholder", // a sample address, not prose
]);

/**
 * U0i(a) — BRAND/PRODUCT LITERALS ARE NEVER FALLBACKS. Anything whose English
 * and Amharic values are identical is by definition untranslated on purpose,
 * plus the literal brand wordmark and any dotted brand string derived from it.
 */
const ALLOW = new Set<string>(["ethio.com"]);
for (const key of Object.keys(en) as (keyof typeof en)[]) {
  const value = en[key];
  if (typeof value !== "string") continue;
  if (am[key] === value || INTENTIONALLY_IDENTICAL.has(key as string)) ALLOW.add(value.trim());
}

/** English strings that MUST NOT appear once Amharic is active, value -> key. */
const ENGLISH_FALLBACKS = new Map<string, string>();
for (const key of Object.keys(en) as (keyof typeof en)[]) {
  const enValue = en[key];
  const amValue = am[key];
  if (INTENTIONALLY_IDENTICAL.has(key as string)) continue;
  if (typeof enValue !== "string" || enValue.trim().length < 2) continue;
  if (amValue === enValue) continue;
  if (ALLOW.has(enValue.trim())) continue;
  ENGLISH_FALLBACKS.set(enValue.trim(), key as string);
}

const KEY_NAMES = new Set<string>(Object.keys(en));

/**
 * U0i(a) — a raw key must start with a namespace the catalog actually owns
 * (shell., auth., admin., …), so brand text such as "ethio.com" can never be
 * mistaken for a rendered key name.
 */
const NAMESPACES = Array.from(
  new Set(Object.keys(en).map((key) => key.split(".")[0] ?? "")),
).filter(Boolean);
const RAW_KEY_RE = new RegExp(`^(${NAMESPACES.join("|")})(\\.[A-Za-z0-9_]+)+$`);

/** Grants a named role via the service role — the staff fixture. */
async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:i18n] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:i18n] granting ${roleName} failed: ${error.message}`);
}

/** Amharic before the first paint, so no English frame is ever measured. */
async function useAmharic(page: Page) {
  await page.addInitScript(
    ([storageKey, lang]) => {
      try {
        window.localStorage.setItem(storageKey as string, lang as string);
      } catch {
        /* private mode: the test's own assertion below will catch it */
      }
    },
    [LANGUAGE_STORAGE_KEY, "am"] as const,
  );
}

/**
 * INC-996 — under D239 a signed-in page shows the ACCOUNT's published language at
 * session start, so a signed-in test that needs Amharic sets its own leased account's
 * language (service client, J5 fixture write) as well as the device; afterEach puts
 * the fresh-user baseline (NULL, INC-173b) back.
 */
const accountsSet = new Set<string>();
async function setAmharicAccount(page: Page, userId: string) {
  accountsSet.add(userId);
  const { error } = await adminClient()
    .from("profiles")
    .update({ preferred_language: "am" })
    .eq("user_id", userId);
  if (error) throw new Error(`[e2e:i18n] setting the account language failed: ${error.message}`);
  // eslint-disable-next-line react-hooks/rules-of-hooks -- a harness helper, not a React hook
  await useAmharic(page);
}

test.afterEach(async () => {
  const ids = [...accountsSet];
  accountsSet.clear();
  if (ids.length === 0) return;
  const { error } = await adminClient()
    .from("profiles")
    .update({ preferred_language: null })
    .in("user_id", ids);
  if (error) throw new Error(`[e2e:i18n] restoring the account language failed: ${error.message}`);
});

/** The chrome regions this guard owns. Absent regions are simply skipped. */
const CHROME_TESTIDS = [
  "shell-topbar",
  "bottom-bar",
  "panel-tabs",
  "panel-header",
  "breadcrumbs",
  "shell-footer-wrapper",
  "app-rail",
  "admin-nav-cards",
];

/** Every trimmed TEXT NODE inside the given root elements. */
async function textsWithin(page: Page, selectors: string[]): Promise<string[]> {
  return page.evaluate((sels) => {
    const out: string[] = [];
    for (const sel of sels) {
      for (const region of Array.from(document.querySelectorAll(sel))) {
        const walker = document.createTreeWalker(region, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          const text = (node.textContent ?? "").trim();
          if (text) out.push(text);
          node = walker.nextNode();
        }
      }
    }
    return out;
  }, selectors);
}

const chromeTexts = (page: Page) =>
  textsWithin(
    page,
    CHROME_TESTIDS.map((id) => `[data-testid="${id}"]`),
  );

/** C2f — the phone menu is the in-place rail menu, not the md+ aside. */
const drawerTexts = (page: Page) => textsWithin(page, ['[data-testid="rail-menu"]']);

function assertAmharicChrome(texts: string[], where: string) {
  const fellBack = texts
    .filter((text) => !ALLOW.has(text) && ENGLISH_FALLBACKS.has(text))
    .map((text) => `${ENGLISH_FALLBACKS.get(text)!} => "${text}"`);
  expect(fellBack, `${where}: keys fell back to English`).toEqual([]);

  const rawKeys = texts.filter(
    (text) => !ALLOW.has(text) && (KEY_NAMES.has(text) || RAW_KEY_RE.test(text)),
  );
  expect(rawKeys, `${where}: raw translation keys rendered`).toEqual([]);
}

/**
 * U0i(c) — CATEGORY ROWS. Read purely from the DOM (no DB access here): a
 * label made only of Latin letters is `name_en` leaking through the
 * `nameAm ?? nameEn` fallback.
 */
const LATIN_ONLY = /^[A-Za-z][A-Za-z\s&'’\-.,()/]*$/;

async function assertAmharicCategories(page: Page, scope: string, where: string) {
  const rows = await page.evaluate(
    ([sel, catLabel, anyRow]) => {
      const nav = document.querySelector(`${sel} nav[aria-label="${catLabel}"]`);
      if (!nav) return [];
      return Array.from(nav.querySelectorAll("li button, li a, li span[aria-disabled]"))
        .map((el) => ({
          label: (el.textContent ?? "").trim(),
          testid: el.closest(anyRow)?.getAttribute("data-testid") ?? "",
        }))
        .filter((row) => row.label !== "");
    },
    [scope, am["shell.categoriesLabel"], ANY_MENU_ROW] as const,
  );
  const labels = rows.map((row) => ({ label: row.label, slug: slugOfRow(row.testid) || "?" }));
  /**
   * INC-561 (INC-170's class) — other tests' scratch roots (`e2e-…` slugs, J1)
   * share the public rail while this test reads it; their names are the
   * fixtures', not the catalogue's (PW-171 names one by its slug's last three
   * letters). Only the catalogue's own rows are judged, as every other rail
   * reader does — through e2e/helpers/category-menu.ts (turn C3: the class's guard).
   */
  const catalogue = labels.filter((row) => !isScratchSlug(row.slug));

  expect(catalogue.length, `${where}: no category rows rendered`).toBeGreaterThan(0);
  const english = catalogue.filter((row) => !ALLOW.has(row.label) && LATIN_ONLY.test(row.label));
  // INC-361 — the message names the slug of each English label.
  expect(
    english.map((row) => `${row.slug} => "${row.label}"`),
    `${where}: category labels still in English`,
  ).toEqual([]);
}

test.describe("i18n chrome coverage (Amharic)", () => {
  test("the marketplace shell renders no English fallback", async ({ page, viewport }) => {
    await useAmharic(page);
    await gotoReady(page, "/");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");

    assertAmharicChrome(await chromeTexts(page), "marketplace shell");
    if ((viewport?.width ?? 0) >= 768) {
      const rail = page.getByTestId("app-rail");
      await expect(rail.getByTestId("rail-category-skeleton")).toHaveCount(0);
      await expect(rail.getByTestId("rail-category-electronics")).toBeVisible();
      await assertAmharicCategories(
        page,
        '[data-testid="app-rail"]',
        "marketplace rail categories",
      );
    }
  });

  test("the mobile drawer renders no English fallback", async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) >= 768, "mobile only");
    await useAmharic(page);
    await gotoReady(page, "/");
    // INC-082: the drawer is opened ONLY through openRailScope (locale-agnostic
    // hamburger + the one open contract), never inline.
    const drawer = await openRailScope(page);
    await expect(drawer).toBeVisible();

    await expect(drawer.getByTestId("rail-category-skeleton")).toHaveCount(0);
    await expect(drawer.getByTestId("rail-category-electronics")).toBeVisible();
    assertAmharicChrome(await drawerTexts(page), "mobile drawer");
    await assertAmharicCategories(page, '[data-testid="rail-menu"]', "mobile drawer categories");
  });

  test("the admin shell renders no English fallback", async ({ page }) => {
    const staff = await leaseUser();
    await grantRole(staff.id, "admin");

    // Sign in FIRST in English: the signIn helper addresses controls by their
    // English labels. Then the account and the device are set to Amharic (INC-996:
    // the account decides at session start, D239), so /admin is measured in Amharic.
    await signIn(page, staff.email, staff.password);
    await setAmharicAccount(page, staff.id);
    await gotoReady(page, "/admin");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");

    assertAmharicChrome(await chromeTexts(page), "admin shell");
  });

  /**
   * U2a / INC-084(b) — MATRIX VOCABULARY. `permissions.action` and
   * `resources.name` are finite admin-owned chrome, so under Amharic no matrix
   * action label or resource heading may be pure Latin: that is the raw DB
   * value leaking through the component's dev-warn fallback.
   */
  test("the roles permission matrix renders no raw English vocabulary", async ({ page }) => {
    const staff = await leaseUser();
    await grantRole(staff.id, "admin");

    const { data: role, error } = await adminClient()
      .from("roles")
      .select("id")
      .eq("name", "super_admin")
      .single();
    if (error || !role) throw new Error(`[e2e:i18n] super_admin role not found`);

    await signIn(page, staff.email, staff.password);
    await setAmharicAccount(page, staff.id);
    await gotoReady(page, `/admin/roles/${role.id}`);
    await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });

    const labels = await textsWithin(page, [
      '[data-testid^="role-resource-heading-"]',
      '[data-testid="role-permission-action"]',
    ]);
    expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
    const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
    expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
    assertAmharicChrome(labels, "roles permission matrix");
  });
});

test("B21SC-3 SC-3 the phone category level and Main menu are Amharic", async ({
  page,
  viewport,
}, testInfo) => {
  test.skip((viewport?.width ?? 0) >= 768, "mobile only");
  // INC-742 — the level is judged against the tree's own names (read only):
  // a real row with no Amharic name is catalogue data, named, not judged.
  const response = await page.request.get("/api/categories/tree");
  expect(response.status()).toBe(200);
  const tree = (await response.json()) as {
    nodes: { slug: string; name_am: string | null }[];
  };
  const hasAmharic = new Map(
    tree.nodes.map((node) => [node.slug, (node.name_am ?? "").trim() !== ""]),
  );
  await useAmharic(page);
  await gotoReady(page, "/c/electronics");
  await expect(page.locator("html")).toHaveAttribute("lang", "am");
  const menu = await openRailScope(page);
  await expect(menu.getByTestId("rail-category-skeleton")).toHaveCount(0);
  await expect(menu.getByTestId("rail-category-electronics")).toBeVisible();
  await menu.getByTestId("rail-category-electronics").click();
  await expect(menu.getByTestId("rail-menu-back")).toHaveText(am["shell.mainMenu"]);
  await expect(menu.getByTestId("rail-category-phones-tablets")).toBeVisible();
  assertAmharicChrome(await drawerTexts(page), "SC-3 category level");
  const rows = await catalogueRows(menu).evaluateAll((els) =>
    els.map((el) => ({
      testid: el.getAttribute("data-testid") ?? "",
      label: (el.textContent ?? "").trim(),
    })),
  );
  const judged = rows
    .map((row) => ({ slug: slugOfRow(row.testid), label: row.label }))
    .filter((row) => row.label !== "" && hasAmharic.get(row.slug) === true);
  const unnamed = rows
    .map((row) => slugOfRow(row.testid))
    .filter((slug) => hasAmharic.get(slug) !== true);
  if (unnamed.length > 0) {
    testInfo.annotations.push({
      type: "no Amharic name in the catalogue",
      description: unnamed.join(", "),
    });
  }
  expect(judged.length, "SC-3 no row of the level has an Amharic name").toBeGreaterThan(0);
  const english = judged.filter((row) => !ALLOW.has(row.label) && LATIN_ONLY.test(row.label));
  expect(
    english.map((row) => `${row.slug} => "${row.label}"`),
    "SC-3 category labels still in English",
  ).toEqual([]);
});

// Read-only catalogue places: no translation row is created or changed.
test("PN-AM-1 the different-place notice and place name are Amharic", async ({ page, baseURL }) => {
  if (!baseURL) throw new Error("PN-AM-1 needs the staging base URL");
  const response = await page.request.get("/api/locations/ET");
  expect(response.status()).toBe(200);
  const body = (await response.json()) as {
    nodes: {
      id: string;
      parent_id: string | null;
      level: string;
      slug: string;
      name_en: string | null;
    }[];
  };
  const cities = body.nodes.filter(
    (node) =>
      node.level === "city" &&
      !node.slug.startsWith("e2e-") &&
      /^[A-Za-z ]+$/.test(node.name_en ?? ""),
  );
  const { data: translations, error } = await adminClient()
    .from("entity_translations")
    .select("entity_id, value")
    .eq("entity_type", "location")
    .eq("field", "name")
    .eq("lang_code", "am")
    .eq("status", "approved")
    .in(
      "entity_id",
      cities.map((node) => node.id),
    );
  if (error) throw new Error(`PN-AM-1 reading approved place names failed: ${error.message}`);
  const guessed = cities.find((city) =>
    translations?.some((row) => row.entity_id === city.id && /[\u1200-\u137f]/.test(row.value)),
  );
  const saved = cities.find((city) => city.id !== guessed?.id);
  const translated = translations?.find((row) => row.entity_id === guessed?.id)?.value;
  if (!guessed || !saved || !translated || !guessed.name_en)
    throw new Error("PN-AM-1 needs two curated cities and an approved Amharic name");
  await page.context().setExtraHTTPHeaders({ "cf-ipcountry": "ET", "cf-ipcity": guessed.name_en });
  await page.context().addCookies([
    {
      name: "ethio_area",
      value: `ET:${saved.id}:${Date.now() - 48 * 60 * 60 * 1000}`,
      url: baseURL,
    },
  ]);
  await useAmharic(page);
  await gotoReady(page, "/");
  await expect(page.locator("html")).toHaveAttribute("lang", "am");
  const notice = page.getByTestId("place-notice");
  await expect(notice).toBeVisible();
  await expect(notice).toContainText(am["location.noticeAsk"].replace("{place}", translated));
  await expect(page.getByTestId("place-notice-switch")).toHaveText(am["location.noticeSwitch"]);
  await expect(page.getByTestId("place-notice-keep")).toHaveText(am["location.noticeKeep"]);
  const text = await notice.innerText();
  expect(text).not.toMatch(/[A-Za-z]/);
  assertAmharicChrome(
    await textsWithin(page, ['[data-testid="place-notice"]']),
    "PN-AM-1 place notice",
  );
});

// Read-only catalogue: electronics is found by slug; no translation row is touched.
test("FV-AM-1 the ☆'s fine print is Amharic", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-360", "the fine print shows without a mouse");
  await useAmharic(page);
  await gotoReady(page, "/c/electronics");
  await expect(page.locator("html")).toHaveAttribute("lang", "am");
  const hint = page.getByTestId("category-favourite-hint");
  await expect(hint).toBeVisible();
  const tail = (am["shell.favouriteHint"].split("{category}")[1] ?? "").trim();
  expect(tail, "FV-AM-1 the Amharic hint has no words after the category").not.toBe("");
  await expect(hint).toContainText(tail);
  expect(await hint.innerText()).not.toMatch(/[A-Za-z]/);
});
