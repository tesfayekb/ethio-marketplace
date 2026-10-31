import type { Locator, Page } from "@playwright/test";
import { THEMES } from "../src/lib/themes";
import { expect, test } from "./fixtures";
import { gotoReady, signIn } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { openMarketCodes } from "./helpers/locations";
import { withoutEmptyLayers } from "./helpers/shadows";
import { adPageFixtures } from "./helpers/ad-page";

/**
 * Turn B2 (Sage S3, DEC-314; D262 candidate C; D269) — the feed heading and the listing card.
 * SC-1: at 390, 834 and 1440, light and dark, computed styles of the heading (§5), the card's
 *   body padding, price, Negotiable pill, place-line divider and ink, the empty picture well
 *   and its separator, and the card's surface and ring (§6), each against its token.
 * SC-2: the place line's ink measured in the page against the card and both tier fills
 *   (≥ 4.5 : 1; the Featured fill takes its own ink, D269), in both themes.
 * OL-1: at 360, in English and Amharic, every open market's name fits the heading whole.
 * OL-2: a 60-character planted name cuts; the fixed words stay whole, on one line.
 * Measurement for OL-1/OL-2: the live heading is cloned beside itself (the same fonts, width
 * and classes) with only its slot's text replaced; the page is never edited otherwise.
 */
type Mode = "light" | "dark";
type Token = keyof typeof THEMES.sage.light;
const MODES: Mode[] = ["light", "dark"];
const WIDTHS = [390, 834, 1440];

async function tokenStyle(page: Page, mode: Mode, token: Token, property: string) {
  const tokens = { ...THEMES.sage.light, ...THEMES.sage[mode] };
  return page.evaluate(
    ({ value, property }) => {
      const probe = document.createElement("div");
      probe.style.setProperty(property, value);
      document.body.append(probe);
      const result = getComputedStyle(probe).getPropertyValue(property);
      probe.remove();
      return result;
    },
    { value: tokens[token], property },
  );
}

async function style(locator: Locator, property: string) {
  const value = await locator.evaluate(
    (el, property) => getComputedStyle(el).getPropertyValue(property),
    property,
  );
  return property === "box-shadow" ? withoutEmptyLayers(value) : value;
}

/** WCAG contrast of two CSS colours, each resolved to sRGB through a canvas pixel. */
async function contrast(page: Page, ink: string, fill: string) {
  return page.evaluate(
    ([ink, fill]) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx === null) throw new Error("no 2d context");
      const lum = (color: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3), (v) => {
          const c = v / 255;
          return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const [lo, hi] = [lum(ink), lum(fill)].sort((a, b) => a - b);
      return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
    },
    [ink, fill],
  );
}

async function setMode(page: Page, mode: Mode) {
  await page.evaluate(
    (mode) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })),
    mode,
  );
}

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`Sage cards at ${width}, ${mode}`, () => {
      const feed = adPageFixtures();
      test.afterEach(async () => {
        await feed.cleanup();
      });
      test.beforeEach(async ({ page }, testInfo) => {
        test.skip(
          width < 768 !== (testInfo.project.name === "mobile-360"),
          "each width uses its pointer project",
        );
        await page.setViewportSize({ width, height: 900 });
      });

      test(`SC-1 heading and card read their tokens (${width}, ${mode})`, async ({ page }) => {
        const seller = await feed.scratchSeller();
        const plain = await feed.seed(seller);
        const negotiable = await feed.seed(seller);
        const marked = await adminClient()
          .from("listings")
          .update({ price_negotiable: true })
          .eq("id", negotiable.id as string);
        if (marked.error)
          throw new Error(`[e2e:sc] marking negotiable failed: ${marked.error.message}`);
        await page.goto("/");
        await setMode(page, mode);
        await signIn(page, seller.email, seller.password);
        await gotoReady(page, `/c/${seller.leafSlug}`);
        await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
        await expect(page.getByTestId("listing-card")).toHaveCount(2);

        // §5 — the heading.
        const heading = page.getByTestId("feed-heading");
        const size = width < 768 ? "21px" : width < 1024 ? "25px" : "30px";
        expect(await style(heading, "font-size")).toBe(size);
        expect(await style(heading, "font-weight")).toBe("800");
        expect(await style(heading, "letter-spacing")).toBe("-0.9px");
        const slot = heading.locator("[data-one-line-slot]");
        if ((await slot.count()) > 0)
          expect(await style(slot, "color")).toBe(await tokenStyle(page, mode, "primary", "color"));

        // §6 — the card.
        const card = page.locator(`[data-testid="listing-card"][data-listing="${negotiable.id}"]`);
        const other = page.locator(`[data-testid="listing-card"][data-listing="${plain.id}"]`);
        expect(await style(card, "background-color")).toBe(
          await tokenStyle(page, mode, "card", "background-color"),
        );
        // The ring and shadow: the live --lift-card (its layers step up at md and lg).
        const lift = await page.evaluate(() => {
          const probe = document.createElement("div");
          probe.style.boxShadow = "var(--lift-card)";
          document.body.append(probe);
          const value = getComputedStyle(probe).boxShadow;
          probe.remove();
          return value;
        });
        expect(await style(card, "box-shadow")).toBe(withoutEmptyLayers(lift));
        if (mode === "dark") expect(lift).toContain("oklch(0.417 0.02 167.6)"); // C's edge, #42504A
        const cardWidth = await card.evaluate((el) => el.getBoundingClientRect().width);
        const compact = cardWidth < 176;
        const body = card.locator("h3").locator("..");
        const pad = compact
          ? width < 768
            ? ["6px", "7px", "6px"]
            : ["8px", "9px", "8px"]
          : ["13px", "14px", "14px"];
        expect(await style(body, "padding-top")).toBe(pad[0]);
        expect(await style(body, "padding-left")).toBe(pad[1]);
        expect(await style(body, "padding-right")).toBe(pad[1]);
        expect(await style(body, "padding-bottom")).toBe(pad[2]);

        const price = card.getByTestId("listing-card-price").locator("..");
        expect(await style(price, "font-size")).toBe(
          compact ? (width < 768 ? "12px" : "13px") : "16px",
        );
        expect(await style(price, "font-weight")).toBe("700");
        expect(await style(price, "min-height")).toBe(compact ? "58px" : "44px");

        const pill = card.getByTestId("price-negotiable-badge");
        expect(await style(pill, "background-color")).toBe(
          await tokenStyle(page, mode, "success-soft", "background-color"),
        );
        expect(await style(pill, "color")).toBe(await tokenStyle(page, mode, "success", "color"));
        expect(await style(pill, "font-size")).toBe("11px");
        expect(await style(pill, "font-weight")).toBe("600");
        expect(await style(pill, "border-top-width")).toBe("0px");

        const place = card.getByTestId("listing-card-place");
        const rule = await tokenStyle(page, mode, "rule", "border-top-color");
        expect(await style(place, "border-top-width")).toBe("1px");
        expect(await style(place, "border-top-color")).toBe(rule);
        expect(await style(place, "padding-top")).toBe(compact ? "6px" : "9px");
        const leaf = await tokenStyle(page, mode, "leaf-ink", "color");
        expect(await style(place, "color")).toBe(leaf);
        const fill = await style(card, "background-color");
        expect(await contrast(page, leaf, fill)).toBeGreaterThanOrEqual(4.5);

        const well = card.getByTestId("listing-card-picture");
        expect(await style(well, "background-color")).toBe(
          await tokenStyle(page, mode, "photo-empty", "background-color"),
        );
        const wellBox = well.locator("..");
        expect(await style(wellBox, "border-bottom-width")).toBe("1px");
        expect(await style(wellBox, "border-bottom-color")).toBe(rule);

        // LL-1 / one card shape: the two cards are the same height (auto-rows-fr).
        const heights = await Promise.all(
          [card, other].map((c) => c.evaluate((el) => el.getBoundingClientRect().height)),
        );
        expect(Math.abs(heights[0] - heights[1])).toBeLessThanOrEqual(0.5);
      });

      test(`SC-2 the place line's ink meets 4.5 : 1 on every card fill (${width}, ${mode})`, async ({
        page,
      }) => {
        test.skip(
          width !== 1440 && width !== 390,
          "a colour pair, not a width: two widths suffice",
        );
        await page.goto("/");
        await setMode(page, mode);
        await gotoReady(page, "/");
        await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
        const leaf = await tokenStyle(page, mode, "leaf-ink", "color");
        const results: Record<string, number> = {};
        for (const [fill, ink] of [
          ["card", "leaf-ink"],
          ["tier-premium", "leaf-ink"],
          ["tier-featured", "tier-featured-ink"],
        ] as const) {
          const back = await tokenStyle(page, mode, fill, "background-color");
          const used = await tokenStyle(page, mode, ink, "color");
          results[`${fill}/leaf`] = await contrast(page, leaf, back);
          results[`${fill}/${ink}`] = await contrast(page, used, back);
          expect(results[`${fill}/${ink}`], `${fill} with ${ink}`).toBeGreaterThanOrEqual(4.5);
        }
        console.log(`[sage-cards] ${mode} ${JSON.stringify(results)}`);
      });
    });
  }
}

/** The home feed with Ethiopia chosen (the area cookie), so the heading names a place. */
async function openWithMarket(page: Page, base: string) {
  const { data, error } = await adminClient()
    .from("locations")
    .select("id")
    .eq("level", "country")
    .eq("country_code", "ET")
    .single();
  if (error || !data) throw new Error(`[e2e:ol] reading ET's root failed: ${error?.message}`);
  await page.context().addCookies([{ name: "ethio_area", value: `ET:${data.id}`, url: base }]);
  await gotoReady(page, "/");
}

/** The live heading cloned beside itself with its slot's text replaced; the line's measures. */
async function measureHeading(page: Page, name: string) {
  return page.getByTestId("feed-heading").evaluate((h1, name) => {
    const clone = h1.cloneNode(true) as HTMLElement;
    clone.removeAttribute("data-testid");
    const text = clone.querySelector("[data-cut-text]");
    const full = clone.querySelector(".cut-full");
    if (text === null || full === null) throw new Error("the heading has no slot");
    text.textContent = name;
    full.setAttribute("data-full", name);
    h1.after(clone);
    const fixed = Array.from(clone.querySelectorAll<HTMLElement>("[data-one-line-fixed]"));
    const lineHeight = parseFloat(getComputedStyle(clone).lineHeight);
    const out = {
      cut: (text as HTMLElement).scrollWidth > (text as HTMLElement).clientWidth + 0.5,
      fixedWhole: fixed.every((el) => el.scrollWidth <= el.getBoundingClientRect().width + 0.5),
      oneLine: clone.getBoundingClientRect().height < lineHeight * 1.5,
    };
    clone.remove();
    return out;
  }, name);
}

test.describe("One line with one slot at 360 (§5)", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360", "the phone width");
    await page.setViewportSize({ width: 360, height: 800 });
  });

  // G0.6 (turn C1) — the languages are the app's public ones, read from its switcher, so a
  // language added later is checked too.
  test("OL-1 every open market's name shows whole in every public language", async ({
    page,
    baseURL,
  }) => {
    const codes = await openMarketCodes({ realOnly: true });
    const { data, error } = await adminClient()
      .from("locations")
      .select("*")
      .eq("level", "country")
      .in("country_code", codes);
    if (error) throw new Error(`[e2e:ol] reading market names failed: ${error.message}`);
    const rows = (data ?? []) as Array<Record<string, unknown>>;
    expect(rows.length).toBeGreaterThan(0);
    await openWithMarket(page, baseURL ?? "");
    await expect(page.getByRole("menu")).toHaveCount(0);
    await page.getByTestId("language-switcher").click();
    const languages = await page
      .locator('[data-testid^="language-option-"]')
      .evaluateAll((els) =>
        els.map((el) => (el.getAttribute("data-testid") ?? "").replace("language-option-", "")),
      );
    await page.keyboard.press("Escape");
    expect(languages, "the switcher lists the public languages").toContain("en");
    for (const language of languages) {
      await expect(page.getByRole("menu")).toHaveCount(0);
      await page.getByTestId("language-switcher").click();
      await page.getByTestId(`language-option-${language}`).click();
      await expect(page.locator("html")).toHaveAttribute("lang", language, { timeout: 15000 });
      await expect(page.getByRole("menu")).toHaveCount(0);
      await expect(page.getByTestId("feed-heading").locator("[data-one-line-slot]")).toBeVisible();
      for (const row of rows) {
        const own = row[`name_${language}`];
        const name = typeof own === "string" && own !== "" ? own : String(row["name_en"]);
        const m = await measureHeading(page, name);
        expect(m, `${language}: "${name}"`).toEqual({
          cut: false,
          fixedWhole: true,
          oneLine: true,
        });
      }
    }
  });

  test("OL-2 a 60-character name cuts; the fixed words stay whole on one line", async ({
    page,
    baseURL,
  }) => {
    await openWithMarket(page, baseURL ?? "");
    await expect(page.getByTestId("feed-heading").locator("[data-one-line-slot]")).toBeVisible();
    const m = await measureHeading(page, "Q".repeat(30) + " " + "W".repeat(29));
    expect(m).toEqual({ cut: true, fixedWhole: true, oneLine: true });
  });
});
