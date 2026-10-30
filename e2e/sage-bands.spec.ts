import type { Locator, Page } from "@playwright/test";
import { THEMES } from "../src/lib/themes";
import { expect, test } from "./fixtures";
import { gotoReady, layoutBoxes, signIn, switchLanguage } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import { destroyLocation, openMarketCodes, seedScratchChain, waitForTreeSlug } from "./helpers/locations";
import { withoutEmptyLayers } from "./helpers/shadows";

type Mode = "light" | "dark";
type Token = keyof typeof THEMES.sage.light;
const MODES: Mode[] = ["light", "dark"];
const WIDTHS = [360, 390, 834, 1440];

async function tokenStyle(page: Page, mode: Mode, token: Token, property: string) {
  const tokens = { ...THEMES.sage.light, ...THEMES.sage[mode] };
  return page.evaluate(({ value, property }) => {
    const probe = document.createElement("div");
    probe.style.setProperty(property, value);
    document.body.append(probe);
    const result = getComputedStyle(probe).getPropertyValue(property);
    probe.remove();
    return result;
  }, { value: tokens[token], property });
}

async function style(locator: Locator, property: string) {
  const value = await locator.evaluate((el, property) => getComputedStyle(el).getPropertyValue(property), property);
  return property === "box-shadow" ? withoutEmptyLayers(value) : value;
}

async function open(page: Page, width: number, mode: Mode) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  await page.evaluate((mode) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })), mode);
  await gotoReady(page, "/");
  await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
  await expect(page.getByTestId("location-track")).toBeVisible();
}

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`Sage bands at ${width}, ${mode}`, () => {
      test.beforeEach(async ({ page }, testInfo) => {
        test.skip((width < 768) !== (testInfo.project.name === "mobile-360"), "each width uses its pointer project");
        await open(page, width, mode);
      });

      test(`SGB-1 four band rows share the Sage look (${width}, ${mode})`, async ({ page }) => {
        const user = await leaseUser();
        await signIn(page, user.email, user.password);
        await gotoReady(page, "/");
        await expect(page.getByTestId("panel-tabs")).toBeAttached();
        if (width >= 768) await expect(page.getByTestId("panel-tabs")).toBeVisible();
        const want = {
          surface: await tokenStyle(page, mode, "band", "background-color"),
          label: await tokenStyle(page, mode, "band-label", "color"),
          groove: await tokenStyle(page, mode, "lift-groove", "box-shadow"),
        };
        // Hidden phone counterparts still read the same band tokens; geometry is checked only when drawn.
        for (const id of ["panel-tabs", "panel-header", "shell-breadcrumb-row", "location-row"]) {
          const rows = page.getByTestId(id);
          expect(await rows.count(), `${id} exists`).toBeGreaterThan(0);
          for (const row of await rows.all()) {
            expect(await style(row, "background-color"), `${id} surface`).toBe(want.surface);
            expect(await style(row, "color"), `${id} label`).toBe(want.label);
            expect(await style(row, "border-bottom-width"), `${id} no own border`).toBe("0px");
            expect(await style(row, "box-shadow"), `${id} groove`).toBe(want.groove);
          }
        }
        expect(await style(page.getByTestId("shell-subband"), "box-shadow")).toBe(await tokenStyle(page, mode, "lift-subband", "box-shadow"));
        for (const title of await page.getByTestId("panel-header-title").all()) {
          expect(await style(title, "font-size")).toBe("12px");
          expect(await style(title, "font-weight")).toBe("700");
          expect(await style(title, "text-transform")).toBe("uppercase");
          expect(await style(title, "letter-spacing")).toBe("1.2px");
          expect(await style(title, "color")).toBe(want.label);
        }
      });

      test(`SGB-2 track and segments keep their geometry (${width}, ${mode})`, async ({ page }) => {
        const row = page.getByTestId("location-row");
        const track = page.getByTestId("location-track");
        const { row: r, track: t } = await layoutBoxes({ row, track });
        expect(r.height).toBe(40);
        expect(t.height).toBe(34);
        expect(await style(track, "padding-top")).toBe("3px");
        expect(await style(track, "background-color")).toBe(await tokenStyle(page, mode, "track", "background-color"));
        expect(await style(track, "box-shadow")).toBe(await tokenStyle(page, mode, "lift-track", "box-shadow"));
        expect(await style(track, "border-top-left-radius")).toBe(await tokenStyle(page, mode, "radius-track", "border-top-left-radius"));
        const pin = track.locator("svg[aria-hidden='true']").filter({ hasNot: page.locator("[data-row-arrow]") });
        const { pin: p } = await layoutBoxes({ pin: track.locator(":scope > svg") });
        expect(p.width).toBe(16);
        expect(p.height).toBe(16);
        expect(await style(pin.locator(".. > svg").first(), "color")).toBe(await tokenStyle(page, mode, "primary", "color"));
        for (const segment of await track.locator("button[data-location-raised]").all()) {
          const { segment: s } = await layoutBoxes({ segment });
          expect(s.height).toBe(28);
          expect(await style(segment, "padding-left")).toBe(width < 768 ? "5px" : "10px");
          expect(await style(segment, "padding-right")).toBe(width < 768 ? "5px" : "10px");
          expect(await style(segment, "font-size")).toBe(width < 768 ? "12px" : "13px");
          expect(await style(segment, "border-top-left-radius")).toBe(await tokenStyle(page, mode, "radius-segment", "border-top-left-radius"));
          const raised = await segment.getAttribute("data-location-raised") === "true";
          expect(await style(segment, "font-weight")).toBe(raised ? "600" : "500");
          expect(await style(segment, "color")).toBe(await tokenStyle(page, mode, raised ? "nav-ink" : "foreground", "color"));
          if (raised) {
            expect(await style(segment, "background-color")).toBe(await tokenStyle(page, mode, "card", "background-color"));
            expect(await style(segment, "box-shadow")).toBe(await tokenStyle(page, mode, "lift-segment", "box-shadow"));
          } else {
            expect(await style(segment, "background-color")).toBe("rgba(0, 0, 0, 0)");
          }
          const arrow = segment.locator("[data-row-arrow]");
          expect(await style(arrow, "width")).toBe("13px");
          expect(await style(arrow, "color")).toBe(await tokenStyle(page, mode, "muted-foreground", "color"));
        }
      });
    });
  }
}

test.describe("Sage deepest chain at 360", () => {
  const regions: string[] = [];
  test.afterEach(async () => {
    for (const slug of regions.splice(0)) await destroyLocation(slug);
  });
  for (const language of ["en", "am"] as const) {
    for (const mode of MODES) {
      test(`SGB-3 deepest chain stays on one line (360, ${language}, ${mode})`, async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== "mobile-360", "360 px proof");
        test.setTimeout(90_000);
        const codes = await openMarketCodes({ realOnly: true });
        const code = codes[0];
        if (code === undefined) throw new Error("SGB-3 no open market for a scratch chain");
        // J3: only scratch descendants are fixtures; the anchor is read-only, never edited.
        const chain = await seedScratchChain(code);
        regions.push(chain.region.slug);
        await waitForTreeSlug(page, code, chain.subCity.slug);
        await open(page, 360, mode);
        // Choose through the actual pickers, not through a session/cookie stand-in.
        const response = await page.request.get("/api/locations");
        expect(response.status()).toBe(200);
        const markets = await response.json() as { countries: { code: string; name_en: string }[] };
        const market = markets.countries.find((m) => m.code === code);
        if (!market) throw new Error(`SGB-3 market ${code} not served`);
        for (const [level, name] of [["country", market.name_en], ["region", chain.region.name_en], ["city", chain.city.name_en], ["subCity", chain.subCity.name_en]]) {
          const picker = page.getByTestId(`location-level-${level}`);
          await expect(picker).toBeVisible();
          await picker.click();
          await page.getByRole("menuitem", { name, exact: true }).click();
          await expect(picker).toHaveAttribute("title", name);
        }
        await switchLanguage(page, language);
        const track = page.getByTestId("location-track");
        await expect(track.locator("button[data-location-raised]")).toHaveCount(4);
        await expect(track.locator("button[data-location-raised='true']")).toHaveCount(1);
        await expect(page.getByTestId("location-level-subCity")).toHaveAttribute("data-location-raised", "true");
        const { row } = await layoutBoxes({ row: page.getByTestId("location-row") });
        expect(row.height).toBe(40);
        const measurements = await page.getByTestId("location-row").evaluate((row) => {
          const outer = row.getBoundingClientRect();
          const track = row.querySelector<HTMLElement>("[data-testid='location-track']");
          if (!track) throw new Error("SGB-3 track absent");
          return {
            rowOverflow: row.scrollWidth - row.clientWidth,
            trackOverflow: track.scrollWidth - track.clientWidth,
            segments: [...track.querySelectorAll<HTMLElement>("button[data-location-raised]")].map((segment) => {
              const box = segment.getBoundingClientRect();
              const text = segment.querySelector<HTMLElement>("[data-cut-text]");
              if (!text) throw new Error("SGB-3 cut text absent");
              return { id: segment.dataset.testid, height: box.height, inside: box.left >= outer.left && box.right <= outer.right, nowrap: getComputedStyle(text).whiteSpace, textHeight: text.getBoundingClientRect().height, lineHeight: parseFloat(getComputedStyle(text).lineHeight) };
            }),
          };
        });
        expect(measurements.rowOverflow, JSON.stringify(measurements)).toBeLessThanOrEqual(1);
        expect(measurements.trackOverflow, JSON.stringify(measurements)).toBeLessThanOrEqual(1);
        for (const segment of measurements.segments) {
          expect(segment.inside, JSON.stringify(segment)).toBe(true);
          expect(segment.height).toBe(28);
          expect(segment.nowrap).toBe("nowrap");
          expect(segment.textHeight).toBe(segment.lineHeight);
        }
        await page.screenshot({ path: testInfo.outputPath(`SGB-3-${language}-${mode}.png`) });
        console.log(`SGB-3 ${language} ${mode}: ${JSON.stringify(measurements)}`);
      });
    }
  }
});