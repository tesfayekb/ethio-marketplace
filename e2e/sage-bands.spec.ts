import type { Locator, Page } from "@playwright/test";
import { THEMES } from "../src/lib/themes";
import { expect, test } from "./fixtures";
import { gotoReady, layoutBoxes, signIn, switchLanguage } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import {
  destroyLocation,
  openMarketCodes,
  seedScratchChain,
  waitForTreeSlug,
} from "./helpers/locations";
import { withoutEmptyLayers } from "./helpers/shadows";
import { adPageFixtures } from "./helpers/ad-page";
import { seedCategoryBranch, destroyCategoryBranch } from "./helpers/posting";

type Mode = "light" | "dark";
type Token = keyof typeof THEMES.sage.light;
const MODES: Mode[] = ["light", "dark"];
const WIDTHS = [360, 390, 834, 1440];

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

async function open(page: Page, width: number, mode: Mode) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  await page.evaluate(
    (mode) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })),
    mode,
  );
  await gotoReady(page, "/");
  await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
  await expect(page.getByTestId("location-track")).toBeVisible();
}

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`Sage bands at ${width}, ${mode}`, () => {
      const feed = adPageFixtures();
      test.afterEach(async () => {
        await feed.cleanup();
      });
      test.beforeEach(async ({ page }, testInfo) => {
        test.skip(
          width < 768 !== (testInfo.project.name === "mobile-360"),
          "each width uses its pointer project",
        );
        await open(page, width, mode);
      });

      test(`SGB-1 content bands share Sage; panel header belongs to rail (${width}, ${mode})`, async ({
        page,
      }) => {
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
        for (const id of ["panel-tabs", "shell-breadcrumb-row", "location-row"]) {
          const rows = page.getByTestId(id);
          expect(await rows.count(), `${id} exists`).toBeGreaterThan(0);
          for (const row of await rows.all()) {
            expect(await style(row, "background-color"), `${id} surface`).toBe(want.surface);
            expect(await style(row, "color"), `${id} label`).toBe(want.label);
            expect(await style(row, "border-bottom-width"), `${id} no own border`).toBe("0px");
            expect(await style(row, "box-shadow"), `${id} groove`).toBe(want.groove);
          }
        }
        // G38 D266: panel header's band fill becomes the rail surface; height/groove stay.
        for (const header of await page.getByTestId("panel-header").all()) {
          expect(await style(header, "background-color")).toBe(
            await tokenStyle(page, mode, "sidebar", "background-color"),
          );
          expect(await style(header, "box-shadow")).toBe(want.groove);
          expect(await style(header, "height")).toBe("40px");
          expect(await style(header, "border-bottom-width")).toBe("0px");
        }
        if (width >= 768) {
          const rail = page.getByTestId("app-rail");
          const header = rail.getByTestId("panel-header");
          expect(await style(header, "background-color")).toBe(
            await style(rail, "background-color"),
          );
          const { header: h } = await layoutBoxes({ header });
          expect(h.height).toBe(40);
        }
        expect(await style(page.getByTestId("shell-location-band"), "box-shadow")).toBe(
          await tokenStyle(page, mode, "lift-subband", "box-shadow"),
        );
        for (const title of await page.getByTestId("panel-header-title").all()) {
          expect(await style(title, "font-size")).toBe("12px");
          expect(await style(title, "font-weight")).toBe("700");
          expect(await style(title, "text-transform")).toBe("uppercase");
          expect(await style(title, "letter-spacing")).toBe("1.2px");
          expect(await style(title, "color")).toBe(want.label);
        }
      });

      test(`SGB-4 adjacent bands meet with one groove and one last-row drop (${width}, ${mode})`, async ({
        page,
      }, testInfo) => {
        // J3: a scratch category feed supplies real scroll height at every width.
        const seller = await feed.scratchSeller();
        const ids = [];
        for (let i = 0; i < 15; i++) ids.push(await feed.seed(seller));
        await signIn(page, seller.email, seller.password);
        await gotoReady(page, `/c/${seller.leafSlug}`);
        await expect(page.getByTestId("listing-card")).toHaveCount(ids.length);
        await expect(page.getByTestId("panel-tabs")).toBeAttached();
        const sticky = page.getByTestId("shell-subband");
        const locationBand = page.getByTestId("shell-location-band");
        const groove = await tokenStyle(page, mode, "lift-groove", "box-shadow");
        const drop = await tokenStyle(page, mode, "lift-subband", "box-shadow");
        for (const scrolled of [false, true]) {
          await page.evaluate((scrolled) => window.scrollTo(0, scrolled ? 180 : 0), scrolled);
          await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrolled ? 180 : 0);
          if (scrolled) await expect(sticky).toHaveAttribute("data-location-covered", "");
          else await expect(sticky).not.toHaveAttribute("data-location-covered");
          const rows = page.locator(
            '[data-testid="panel-tabs"]:visible, [data-testid="shell-breadcrumb-row"]:visible, [data-testid="location-row"]:visible',
          );
          const boxes = [];
          for (const row of await rows.all()) {
            const { row: box } = await layoutBoxes({ row });
            const { sticky: top } = await layoutBoxes({ sticky });
            if (
              (await row.getAttribute("data-testid")) === "location-row" &&
              box.y + box.height <= top.y + top.height
            )
              continue;
            boxes.push(box);
            expect(await style(row, "box-shadow")).toBe(groove);
            expect(await style(row, "border-bottom-width")).toBe("0px");
          }
          for (let i = 1; i < boxes.length; i++) {
            const upper = boxes[i - 1];
            const lower = boxes[i];
            if (!upper || !lower) throw new Error("SGB-4 adjacent box absent");
            expect(upper.y + upper.height).toBe(lower.y);
          }
          expect(await style(sticky, "box-shadow")).toBe(scrolled ? drop : "none");
          expect(await style(locationBand, "box-shadow")).toBe(scrolled ? "none" : drop);
          console.log(
            `SGB-4 ${width} ${mode} ${scrolled ? "scrolled" : "top"}: ${JSON.stringify(boxes)}`,
          );
          await page.screenshot({
            path: testInfo.outputPath(`SGB-4-${width}-${mode}-${scrolled}.png`),
          });
        }
      });

      test(`SGB-5 current tab and crumb share the location raised segment (${width}, ${mode})`, async ({
        page,
      }) => {
        const user = await leaseUser();
        await signIn(page, user.email, user.password);
        await gotoReady(page, "/");
        await expect(page.getByTestId("panel-tabs")).toBeAttached();
        const tab = page.locator('[role="tab"][aria-selected="true"]');
        // G38 D265: nav-pill/lift-pill becomes card/lift-segment/nav-ink.
        expect(await style(tab, "background-color")).toBe(
          await tokenStyle(page, mode, "card", "background-color"),
        );
        expect(await style(tab, "box-shadow")).toBe(
          await tokenStyle(page, mode, "lift-segment", "box-shadow"),
        );
        expect(await style(tab, "color")).toBe(await tokenStyle(page, mode, "nav-ink", "color"));
        await expect(page.getByTestId("location-level-country")).toHaveAttribute(
          "data-location-raised",
          "true",
        );
        const chosen = page.locator("[data-location-raised='true']");
        const currentCrumb = page.getByTestId("breadcrumbs").locator("[aria-current='page']");
        await expect(currentCrumb).toHaveCount(1);
        for (const segment of [tab, currentCrumb]) {
          for (const property of [
            "background-color",
            "box-shadow",
            "color",
            "border-top-left-radius",
            "height",
            "font-weight",
          ])
            expect(await style(segment, property), property).toBe(await style(chosen, property));
        }
        const track = page.getByTestId("location-track");
        for (const id of ["panel-track", "breadcrumb-track"]) {
          for (const property of [
            "background-color",
            "box-shadow",
            "padding-top",
            "padding-bottom",
            "border-top-left-radius",
            "height",
          ])
            expect(await style(page.getByTestId(id), property), `${id} ${property}`).toBe(
              await style(track, property),
            );
        }
      });

      test(`SGB-2 track and segments keep their geometry (${width}, ${mode})`, async ({ page }) => {
        const row = page.getByTestId("location-row");
        const track = page.getByTestId("location-track");
        const { row: r, track: t } = await layoutBoxes({ row, track });
        expect(r.height).toBe(40);
        expect(t.height).toBe(34);
        expect(await style(track, "padding-top")).toBe("3px");
        expect(await style(track, "background-color")).toBe(
          await tokenStyle(page, mode, "track", "background-color"),
        );
        expect(await style(track, "box-shadow")).toBe(
          await tokenStyle(page, mode, "lift-track", "box-shadow"),
        );
        expect(await style(track, "border-top-left-radius")).toBe(
          await tokenStyle(
            page,
            mode,
            width < 768 ? "track-radius" : "track-radius-md",
            "border-top-left-radius",
          ),
        );
        const pin = track.locator(":scope > svg[aria-hidden='true']");
        const { pin: p } = await layoutBoxes({ pin });
        expect(p.width).toBe(16);
        expect(p.height).toBe(16);
        expect(await style(pin, "color")).toBe(await tokenStyle(page, mode, "primary", "color"));
        for (const segment of await track.locator("button[data-location-raised]").all()) {
          const { segment: s } = await layoutBoxes({ segment });
          expect(s.height).toBe(28);
          expect(await style(segment, "padding-left")).toBe(width < 768 ? "5px" : "10px");
          expect(await style(segment, "padding-right")).toBe(width < 768 ? "5px" : "10px");
          expect(await style(segment, "font-size")).toBe(width < 768 ? "12px" : "13px");
          expect(await style(segment, "border-top-left-radius")).toBe(
            await tokenStyle(
              page,
              mode,
              width < 768 ? "segment-radius" : "segment-radius-md",
              "border-top-left-radius",
            ),
          );
          const raised = (await segment.getAttribute("data-location-raised")) === "true";
          expect(await style(segment, "font-weight")).toBe(raised ? "600" : "500");
          expect(await style(segment, "color")).toBe(
            await tokenStyle(page, mode, raised ? "nav-ink" : "foreground", "color"),
          );
          if (raised) {
            expect(await style(segment, "background-color")).toBe(
              await tokenStyle(page, mode, "card", "background-color"),
            );
            expect(await style(segment, "box-shadow")).toBe(
              await tokenStyle(page, mode, "lift-segment", "box-shadow"),
            );
          } else {
            expect(await style(segment, "background-color")).toBe("rgba(0, 0, 0, 0)");
          }
          const arrow = segment.locator("[data-row-arrow]");
          expect(await style(arrow, "width")).toBe("13px");
          expect(await style(arrow, "color")).toBe(
            await tokenStyle(page, mode, "muted-foreground", "color"),
          );
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
      test(`SGB-3 deepest chain stays on one line (360, ${language}, ${mode})`, async ({
        page,
      }, testInfo) => {
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
        const markets = (await response.json()) as {
          countries: { code: string; name_en: string }[];
        };
        const market = markets.countries.find((m) => m.code === code);
        if (!market) throw new Error(`SGB-3 market ${code} not served`);
        for (const [level, name] of [
          ["country", market.name_en],
          ["region", chain.region.name_en],
          ["city", chain.city.name_en],
          ["subCity", chain.subCity.name_en],
        ]) {
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
        await expect(page.getByTestId("location-level-subCity")).toHaveAttribute(
          "data-location-raised",
          "true",
        );
        const { row } = await layoutBoxes({ row: page.getByTestId("location-row") });
        expect(row.height).toBe(40);
        const measurements = await page.getByTestId("location-row").evaluate((row) => {
          const outer = row.getBoundingClientRect();
          const track = row.querySelector<HTMLElement>("[data-testid='location-track']");
          if (!track) throw new Error("SGB-3 track absent");
          return {
            rowOverflow: row.scrollWidth - row.clientWidth,
            trackOverflow: track.scrollWidth - track.clientWidth,
            segments: [...track.querySelectorAll<HTMLElement>("button[data-location-raised]")].map(
              (segment) => {
                const box = segment.getBoundingClientRect();
                const text = segment.querySelector<HTMLElement>("[data-cut-text]");
                if (!text) throw new Error("SGB-3 cut text absent");
                return {
                  id: segment.dataset.testid,
                  height: box.height,
                  inside: box.left >= outer.left && box.right <= outer.right,
                  nowrap: getComputedStyle(text).whiteSpace,
                  textHeight: text.getBoundingClientRect().height,
                  lineHeight: parseFloat(getComputedStyle(text).lineHeight),
                };
              },
            ),
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

test.describe("Sage crumb chain at 360", () => {
  const branches: string[][] = [];
  test.afterEach(async () => {
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
  });
  for (const language of ["en", "am"] as const) {
    test(`SGB-6 deep crumb trail stays on one line (360, ${language})`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== "mobile-360", "360 px proof");
      const { parent, leaf } = await seedCategoryBranch();
      branches.push([parent.slug as string, leaf.slug as string]);
      await open(page, 360, "light");
      await gotoReady(page, `/c/${leaf.slug}`);
      await switchLanguage(page, language);
      await expect(page.getByTestId("breadcrumb-category")).toBeVisible();
      const trail = page.getByTestId("breadcrumbs");
      const measures = await trail.evaluate((nav) => {
        const row = nav.closest<HTMLElement>("[data-band-row]");
        if (!row) throw new Error("SGB-6 crumb row absent");
        const box = row.getBoundingClientRect();
        return {
          height: box.height,
          overflow: nav.scrollWidth - nav.clientWidth,
          slots: [...nav.querySelectorAll<HTMLElement>("[data-cut-text]")].map((text) => {
            const b = text.getBoundingClientRect();
            const c = getComputedStyle(text);
            return {
              height: b.height,
              lineHeight: parseFloat(c.lineHeight),
              nowrap: c.whiteSpace,
              inside:
                b.left >= box.left &&
                b.right <= box.right &&
                b.top >= box.top &&
                b.bottom <= box.bottom,
            };
          }),
        };
      });
      expect(measures.height).toBe(40);
      expect(measures.overflow, JSON.stringify(measures)).toBeLessThanOrEqual(1);
      expect(measures.slots).toHaveLength(3);
      for (const slot of measures.slots) {
        expect(slot.inside, JSON.stringify(measures)).toBe(true);
        expect(slot.nowrap).toBe("nowrap");
        expect(slot.height).toBe(slot.lineHeight);
      }
      await trail.screenshot({ path: testInfo.outputPath(`SGB-6-${language}.png`) });
    });
  }
});
