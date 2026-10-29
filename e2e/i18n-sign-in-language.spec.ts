import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import {
  describeSwitcher,
  gotoReady,
  signIn,
  signOutViaUi,
  stepUpIfPrompted,
  switchLanguage,
  useJobSuperAdmin,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import { destroyListingsOf, leaseSeller } from "./helpers/posting";

/**
 * D239 — SIGNING IN SWITCHES THE SITE TO THE ACCOUNT'S LANGUAGE.
 *
 * Accounts are pool leases (J9); every `preferred_language` this file writes is
 * put back to NULL — the fresh-user baseline (INC-173b) — in afterEach (J3), a
 * timeout included. Account rows are read with the service client (J4: DB truth).
 */

const STAR_KEY = "ethio.lang.star";
const STAR_COOKIE = "ethio_lang_star";

const touched = new Set<string>();

async function setAccountLanguage(userId: string, code: string | null) {
  touched.add(userId);
  const { error } = await adminClient()
    .from("profiles")
    .update({ preferred_language: code })
    .eq("user_id", userId);
  if (error) throw new Error(`[e2e:d239] seeding preference: ${error.message}`);
}

async function accountLanguage(userId: string): Promise<string | null> {
  const { data, error } = await adminClient()
    .from("profiles")
    .select("preferred_language")
    .eq("user_id", userId)
    .single();
  if (error) throw new Error(`[e2e:d239] reading preference: ${error.message}`);
  return (data?.preferred_language as string | null) ?? null;
}

/** A language row that exists but is not on the publication gate's list. */
async function unpublishedLanguage(): Promise<string> {
  const { data, error } = await adminClient()
    .from("languages")
    .select("code")
    .eq("enabled_public", false)
    .eq("is_base", false)
    .order("sort")
    .limit(1);
  if (error) throw new Error(`[e2e:d239] reading languages: ${error.message}`);
  const code = data?.[0]?.code as string | undefined;
  if (!code) throw new Error("[e2e:d239] the backend has no unpublished language to test with");
  return code;
}

/** Seeds the device the way a returning browser carries a choice: both stores, pre-boot. */
async function seedDevice(page: Page, code: string) {
  await page.addInitScript(
    ({ key, cookie, value }) => {
      if (window.sessionStorage.getItem("e2e-d239-seeded") === "1") return;
      window.sessionStorage.setItem("e2e-d239-seeded", "1");
      window.localStorage.setItem(key, value);
      window.localStorage.setItem("ethio.lang", value);
      document.cookie = `${cookie}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
    },
    { key: STAR_KEY, cookie: STAR_COOKIE, value: code },
  );
}

async function starCookie(page: Page): Promise<string | undefined> {
  const cookies = await page.context().cookies();
  return cookies.find((c) => c.name === STAR_COOKIE)?.value;
}

test.afterEach(async () => {
  const ids = [...touched];
  touched.clear();
  if (ids.length === 0) return;
  const { error } = await adminClient()
    .from("profiles")
    .update({ preferred_language: null })
    .in("user_id", ids);
  if (error) throw new Error(`[e2e:d239] restoring preference: ${error.message}`);
});

test.describe("D239 — the account's language at sign-in", () => {
  test("D239-E1 device am, account en: signing in switches to en; the cookie and an open tab follow", async ({
    page,
  }) => {
    const user = await leaseUser();
    await setAccountLanguage(user.id, "en");
    await seedDevice(page, "am");
    // R7 — the flash measurement: one sample per animation frame of the page's
    // path and <html lang>, kept in the page (sign-in is an in-page transition).
    await page.addInitScript(() => {
      const w = window as unknown as { __d239: Array<[number, string, string]> };
      w.__d239 = [];
      const sample = () => {
        const last = w.__d239[w.__d239.length - 1];
        const now: [number, string, string] = [
          Math.round(performance.now()),
          location.pathname,
          document.documentElement.lang,
        ];
        if (!last || last[1] !== now[1] || last[2] !== now[2]) w.__d239.push(now);
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });

    await gotoReady(page, "/");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    const tab = await page.context().newPage();
    await gotoReady(tab, "/");
    await expect(tab.locator("html")).toHaveAttribute("lang", "am");

    await signIn(page, user.email, user.password);
    await expect(page.locator("html"), await describeSwitcher(page)).toHaveAttribute("lang", "en", {
      timeout: 15000,
    });
    expect(await page.evaluate((k) => window.localStorage.getItem(k), STAR_KEY)).toBe("en");
    expect(await starCookie(page)).toBe("en");
    // The open tab follows the star (R4), without a reload.
    await expect(tab.locator("html")).toHaveAttribute("lang", "en", { timeout: 15000 });
    // The account was not written: it already said en.
    expect(await accountLanguage(user.id)).toBe("en");

    const frames = await page.evaluate(
      () => (window as unknown as { __d239: Array<[number, string, string]> }).__d239,
    );
    console.log(`[e2e:d239] R7 frames (ms, path, lang): ${JSON.stringify(frames)}`);
    await tab.close();
  });

  test("D239-E2 an account with no language takes the device's", async ({ page }) => {
    const user = await leaseUser();
    await setAccountLanguage(user.id, null);
    await seedDevice(page, "am");
    await gotoReady(page, "/");
    await signIn(page, user.email, user.password);
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    await expect.poll(() => accountLanguage(user.id), { timeout: 15000 }).toBe("am");
  });

  test("D239-E3 a signed-out pick leaves the account alone", async ({ page }) => {
    const user = await leaseUser();
    await setAccountLanguage(user.id, "en");
    await gotoReady(page, "/");
    await switchLanguage(page, "am");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    // Refusal: the account row is unchanged after the pick has settled on the device.
    await gotoReady(page, "/");
    expect(await accountLanguage(user.id)).toBe("en");
  });

  test("D239-E4 an unpublished account language is ignored and kept", async ({ page }) => {
    const code = await unpublishedLanguage();
    const user = await leaseUser();
    await setAccountLanguage(user.id, code);
    await seedDevice(page, "am");
    await gotoReady(page, "/");
    await signIn(page, user.email, user.password);
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    await gotoReady(page, "/");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    expect(await page.evaluate((k) => window.localStorage.getItem(k), STAR_KEY)).toBe("am");
    expect(await accountLanguage(user.id)).toBe(code);
  });

  test("D239-E5 sign-out keeps the current language", async ({ page }) => {
    const user = await leaseUser();
    await setAccountLanguage(user.id, "am");
    await gotoReady(page, "/");
    await signIn(page, user.email, user.password);
    await expect(page.locator("html")).toHaveAttribute("lang", "am", { timeout: 15000 });
    await signOutViaUi(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    await gotoReady(page, "/");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
  });

  test(
    "D239-E6 impersonation leaves the staff member's own language as it was, at start and at end",
    { tag: "@private-identity" },
    async ({ page }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks -- a harness helper, not a React hook
      const { secret, user: staff } = await useJobSuperAdmin(page);
      touched.add(staff.id);
      await switchLanguage(page, "am");
      const target = await leaseSeller();
      await setAccountLanguage(target.id, "en");
      try {
        await gotoReady(page, `/admin/users/${target.id}`);
        await page.getByTestId("impersonation-reason").fill("e2e support ticket 1234");
        await page.getByTestId("impersonation-begin").click();
        await stepUpIfPrompted(page, secret);
        await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
        await expect(page.locator("html")).toHaveAttribute("lang", "am");

        await page.getByTestId("impersonation-banner-end").click();
        await expect(page.getByTestId("impersonation-banner")).toHaveCount(0, { timeout: 20000 });
        await expect(page.locator("html")).toHaveAttribute("lang", "am");
        expect(await page.evaluate((k) => window.localStorage.getItem(k), STAR_KEY)).toBe("am");
        expect(await accountLanguage(target.id)).toBe("en");
      } finally {
        await destroyListingsOf(target.id);
      }
    },
  );
});
