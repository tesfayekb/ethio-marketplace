import { expect, test, type Page } from "@playwright/test";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { LANGUAGE_STORAGE_KEY } from "../src/i18n/provider";

import { gotoReady, signIn } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * U0h PART 2 — I18N CHROME COVERAGE GUARD.
 *
 * Law D1 says no user-visible literal strings; this guard proves the stronger
 * runtime property: with Amharic selected, the SHELL CHROME contains
 *   (a) no English value of a key that HAS a distinct Amharic value (i.e. no
 *       key silently fell back to en through `messages[key] ?? en[key]`), and
 *   (b) no raw dot-notation key name (a missing catalog entry rendered bare).
 *
 * DATA-DRIVEN CATEGORY ROWS ARE EXCLUDED ON PURPOSE. Category names come from
 * public.categories (name_en / name_am); their Amharic coverage is a DATA
 * concern tracked by its own launch-gate item (U5), not a chrome-string
 * concern. Including them here would make a seed gap look like a translation
 * bug and would make this guard un-actionable.
 */

/** Keys whose Amharic value is intentionally identical to English. */
const INTENTIONALLY_IDENTICAL = new Set<string>([
  "app.name", // brand wordmark — never translated
  "language.amharic", // the language's own endonym, shown in both catalogs
  "language.enShort",
  "language.amShort",
  "auth.emailPlaceholder", // a sample address, not prose
]);

/** English strings that MUST NOT appear once Amharic is active, value -> key. */
const ENGLISH_FALLBACKS = new Map<string, string>();
for (const key of Object.keys(en) as (keyof typeof en)[]) {
  const enValue = en[key];
  const amValue = am[key];
  if (INTENTIONALLY_IDENTICAL.has(key as string)) continue;
  if (typeof enValue !== "string" || enValue.trim().length < 2) continue;
  if (amValue === enValue) continue;
  ENGLISH_FALLBACKS.set(enValue.trim(), key as string);
}

const KEY_NAMES = new Set<string>(Object.keys(en));

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

/**
 * Every trimmed TEXT NODE inside the chrome, with the data-driven category
 * rows pruned out of the clone first.
 */
async function chromeTexts(page: Page, categoriesLabel: string): Promise<string[]> {
  return page.evaluate(
    ([ids, catLabel]) => {
      const out: string[] = [];
      for (const id of ids as string[]) {
        for (const region of Array.from(document.querySelectorAll(`[data-testid="${id}"]`))) {
          const clone = region.cloneNode(true) as HTMLElement;
          // EXCLUDED: category rows are database rows (name_en / name_am), not
          // chrome strings — their coverage is a data/U5 launch-gate item.
          for (const nav of Array.from(
            clone.querySelectorAll(`nav[aria-label="${catLabel as string}"]`),
          )) {
            nav.remove();
          }
          const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
          let node = walker.nextNode();
          while (node) {
            const text = (node.textContent ?? "").trim();
            if (text) out.push(text);
            node = walker.nextNode();
          }
        }
      }
      return out;
    },
    [CHROME_TESTIDS, categoriesLabel] as const,
  );
}

function assertAmharicChrome(texts: string[], where: string) {
  const fellBack = texts
    .filter((text) => ENGLISH_FALLBACKS.has(text))
    .map((text) => `${ENGLISH_FALLBACKS.get(text)!} => "${text}"`);
  expect(fellBack, `${where}: keys fell back to English`).toEqual([]);

  const rawKeys = texts.filter((text) => KEY_NAMES.has(text) || /^[a-z][\w]*(\.[\w]+)+$/.test(text));
  expect(rawKeys, `${where}: raw translation keys rendered`).toEqual([]);
}

test.describe("i18n chrome coverage (Amharic)", () => {
  test("the marketplace shell renders no English fallback", async ({ page }) => {
    await useAmharic(page);
    await gotoReady(page, "/");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");

    assertAmharicChrome(await chromeTexts(page, am["shell.categoriesLabel"]), "marketplace shell");
  });

  test("the mobile drawer renders no English fallback", async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) >= 768, "mobile only");
    await useAmharic(page);
    await gotoReady(page, "/");
    await page.getByTestId("nav-toggle").click();
    await expect(page.getByTestId("app-rail")).toBeVisible();

    assertAmharicChrome(await chromeTexts(page, am["shell.categoriesLabel"]), "mobile drawer");
  });

  test("the admin shell renders no English fallback", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");

    await useAmharic(page);
    await signIn(page, staff.email, staff.password);
    await gotoReady(page, "/admin");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");

    assertAmharicChrome(await chromeTexts(page, am["shell.categoriesLabel"]), "admin shell");
  });
});
