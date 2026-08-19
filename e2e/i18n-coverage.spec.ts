import { expect, test, type Page } from "@playwright/test";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { LANGUAGE_STORAGE_KEY } from "../src/i18n/provider";

import { gotoReady, openRailScope, signIn } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

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

/** The chrome regions this guard owns. Absent regions are simply skipped. */
const CHROME_TESTIDS = [
  "shell-topbar",
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

/** U0i(b) — the mobile drawer is the Sheet DIALOG, not the md+ aside. */
const drawerTexts = (page: Page) => textsWithin(page, ['[role="dialog"]']);

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
  const labels = await page.evaluate(
    ([sel, catLabel]) => {
      const nav = document.querySelector(`${sel} nav[aria-label="${catLabel}"]`);
      if (!nav) return [];
      return Array.from(nav.querySelectorAll("li button, li a, li span[aria-disabled]"))
        .map((el) => (el.textContent ?? "").trim())
        .filter(Boolean);
    },
    [scope, am["shell.categoriesLabel"]] as const,
  );

  expect(labels.length, `${where}: no category rows rendered`).toBeGreaterThan(0);
  const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
  expect(english, `${where}: category labels still in English`).toEqual([]);
}

test.describe("i18n chrome coverage (Amharic)", () => {
  test("the marketplace shell renders no English fallback", async ({ page, viewport }) => {
    await useAmharic(page);
    await gotoReady(page, "/");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");

    assertAmharicChrome(await chromeTexts(page), "marketplace shell");
    if ((viewport?.width ?? 0) >= 768) {
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

    assertAmharicChrome(await drawerTexts(page), "mobile drawer");
    await assertAmharicCategories(page, '[role="dialog"]', "mobile drawer categories");
  });

  test("the admin shell renders no English fallback", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");

    // Sign in FIRST in English: the signIn helper addresses controls by their
    // English labels. The init script then applies Amharic to every following
    // navigation, so /admin is measured entirely in Amharic.
    await signIn(page, staff.email, staff.password);
    await useAmharic(page);
    await gotoReady(page, "/admin");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");

    assertAmharicChrome(await chromeTexts(page), "admin shell");
  });
});
