import type { Locator, Page } from "@playwright/test";
import { listingPath } from "../src/features/ad-page/address";
import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { THEMES } from "../src/lib/themes";
import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import { layoutOf } from "./helpers/layout";
import { expectPicturesFit } from "./helpers/pictures";
import { withoutEmptyLayers } from "./helpers/shadows";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  layoutBoxes,
  settled,
  signIn,
  signInViaSession,
  switchLanguage,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import { updateListingRow } from "./helpers/listing-seed";
import { levelNameFor } from "./helpers/level-overrides";

/**
 * Turn SAGE-S4 (spec §7, §8, §9; rulings 1–6) — the Premium and Featured cards, the satin
 * status ribbon and the invite card, measured in the page. Scratch rows on ethio-staging
 * through the harness (ruling 6; J3: removed in afterEach): a regular, a Premium and a Featured
 * ad, each Reserved, so each carries a ribbon.
 * STG-1: at 390, 834 and 1440, light and dark — each card's fill and shadow layers (the tier's
 *   1.5 px frame), its divider, the flag (by role, named by its tier, its stars, its size by
 *   card width, its fold past the card's edge), the tier word (size, weight, case, ink), the
 *   ribbon's palette (all six stops), its ink and caps; every card one height (ruling 3).
 * STG-2: contrast where a person reads it (ruling 2) — the tier word on its fill, and the ribbon's
 *   ink under each ribbon word's own box at its worst point, for every ribbon word in every public
 *   language: ≥ 4.5 : 1, light and dark. The satin's stops, position and size are the band's
 *   computed style; colours between stops are mixed by the browser in oklab, as it paints the
 *   gradient, and read as 8-bit sRGB through a canvas pixel.
 * STG-3: at 390, the Amharic tier word shows whole, at 9 px or more.
 * STG-4: the same Premium card looks the same in similar ads and on the saved page.
 * STG-6: the invite card on /dev/style (the real InviteCard): border, fill, corner, shadow, the
 *   star disc (24 / 36 / 46 px), the sentence (12 / 13 / 18 px, bold wider) and the button.
 */
type Mode = "light" | "dark";
type Token = keyof typeof THEMES.sage.light;
type Tier = "regular" | "premium" | "featured";
const MODES: Mode[] = ["light", "dark"];
const WIDTHS = [390, 834, 1440];
const TIERS: Tier[] = ["regular", "premium", "featured"];
const PALETTE: Record<Tier, "pearl" | "gold" | "sage"> = {
  regular: "pearl",
  premium: "gold",
  featured: "sage",
};
/** A card narrower than 11rem is compact (D123). */
const COMPACT_PX = 176;
const RIBBON_KEYS = [
  "feed.ribbon.sold",
  "feed.ribbon.rented",
  "feed.ribbon.filled",
  "feed.ribbon.closed",
  "feed.reserved",
  "feed.priceReduced",
] as const;

/**
 * P-2 (c) c2a — a level row's names, which the card's flag and word draw (the row's, never a
 * catalog key); the spec's own read of the row it seeded by key.
 */
/** A value as the page resolves it inside `scope` (the body unless named): a probe's computed style. */
async function resolvedIn(scope: Locator, property: string, value: string) {
  return scope.evaluate(
    (el, { property, value }) => {
      const probe = document.createElement("div");
      probe.style.setProperty(property, value);
      el.append(probe);
      const result = getComputedStyle(probe).getPropertyValue(property);
      probe.remove();
      return result;
    },
    { property, value },
  );
}

async function tokenStyle(
  page: Page,
  mode: Mode,
  token: Token,
  property: string,
  scope = page.locator("body"),
) {
  const tokens = { ...THEMES.sage.light, ...THEMES.sage[mode] };
  return resolvedIn(scope, property, tokens[token]);
}

async function style(locator: Locator, property: string) {
  const value = await locator.evaluate(
    (el, property) => getComputedStyle(el).getPropertyValue(property).trim(),
    property,
  );
  return property === "box-shadow" ? withoutEmptyLayers(value) : value;
}

/** A shadow token as the page resolves it now (its layers step up at md and lg). */
async function liftOf(page: Page, token: string, scope = page.locator("body")) {
  return withoutEmptyLayers(await resolvedIn(scope, "box-shadow", `var(--${token})`));
}

/** WCAG contrast of two CSS colours, each resolved to 8-bit sRGB through a canvas pixel. */
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
      return (hi + 0.05) / (lo + 0.05);
    },
    [ink, fill],
  );
}

/**
 * Ruling 1, answer 2 — the ribbon's ink against the satin where a person reads it: under each
 * word's own box, at its worst point. The word's box is an invisible copy of the band's text,
 * holding the word, inside the band (the same fonts, size and container); its run is centred
 * where the text is. At each half pixel along it that the picture shows (the band is turned and
 * clipped by the picture), the satin's colour (the band's computed second background layer: its
 * stops, position and size) with the gloss layer over it is painted on a canvas and read back,
 * at the top, middle and bottom of the text's content box, where its letters are; the lowest
 * ratio is the word's. The same at the edges of its padding box is returned as `padWorst`.
 */
async function ribbonContrast(ribbon: Locator, words: string[]) {
  return ribbon.evaluate((wrapper, words) => {
    const band = wrapper.firstElementChild;
    const text = band?.firstElementChild;
    if (!(band instanceof HTMLElement) || !(text instanceof HTMLElement))
      throw new Error("the ribbon has no band or text");
    const computed = getComputedStyle(band);
    const split = (value: string) => {
      const out: string[] = [];
      let depth = 0;
      let start = 0;
      for (let i = 0; i < value.length; i += 1) {
        const c = value[i];
        if (c === "(") depth += 1;
        else if (c === ")") depth -= 1;
        else if (c === "," && depth === 0) {
          out.push(value.slice(start, i).trim());
          start = i + 1;
        }
      }
      out.push(value.slice(start).trim());
      return out;
    };
    type Stop = { color: string; at: number | null };
    // A stop is in % or (the stylesheet's minifier writes a bare 0) px along the gradient's length.
    const stopsOf = (layer: string, length: number): Array<{ color: string; at: number }> => {
      const parts = split(layer.slice(layer.indexOf("(") + 1, layer.lastIndexOf(")")));
      if (parts[0] !== undefined && /^(?:-?[\d.]+deg|to\s)/.test(parts[0])) parts.shift();
      const raw: Stop[] = [];
      for (const part of parts) {
        // The colour is the stop's first token: a word, or a function to its own closing bracket.
        let end = part.search(/\s|$/);
        if (/^[\w-]+\(/.test(part)) {
          let depth = 0;
          for (let i = part.indexOf("("); i < part.length; i += 1) {
            if (part[i] === "(") depth += 1;
            else if (part[i] === ")" && (depth -= 1) === 0) {
              end = i + 1;
              break;
            }
          }
        }
        const color = part.slice(0, end);
        const term = (p: string) => {
          if (p.endsWith("%")) return Number(p.slice(0, -1)) / 100;
          if (p.endsWith("px")) return Number(p.slice(0, -2)) / length;
          throw new Error(`a stop position neither in % nor px: ${p}`);
        };
        // A position is a length, or calc() of lengths added and taken away.
        const at = (part.slice(color.length).match(/calc\([^)]*\)|\S+/g) ?? []).map((p) => {
          if (!p.startsWith("calc(")) return term(p);
          const terms = p.slice(5, -1).trim().split(/\s+/);
          let sum = term(terms[0] ?? "");
          for (let i = 1; i + 1 < terms.length; i += 2)
            sum += (terms[i] === "-" ? -1 : 1) * term(terms[i + 1] ?? "");
          return sum;
        });
        if (at.length === 0) raw.push({ color, at: null });
        for (const p of at) raw.push({ color, at: p });
      }
      const first = raw[0];
      const last = raw[raw.length - 1];
      if (first === undefined || last === undefined) throw new Error("a gradient with no stop");
      if (first.at === null) first.at = 0;
      if (last.at === null) last.at = 1;
      for (let i = 1; i < raw.length - 1; i += 1) {
        const stop = raw[i];
        if (stop === undefined || stop.at !== null) continue;
        let j = i;
        while (raw[j]?.at === null) j += 1;
        const before = raw[i - 1]?.at ?? 0;
        const after = raw[j]?.at ?? 1;
        for (let k = i; k < j; k += 1) {
          const missing = raw[k];
          if (missing) missing.at = before + ((after - before) * (k - i + 1)) / (j - i + 1);
        }
      }
      let floor = 0;
      return raw.map((stop) => {
        floor = Math.max(floor, stop.at ?? 0);
        return { color: stop.color, at: floor };
      });
    };
    const colorAt = (stops: Array<{ color: string; at: number }>, f: number) => {
      for (let i = 0; i < stops.length - 1; i += 1) {
        const a = stops[i];
        const b = stops[i + 1];
        if (a === undefined || b === undefined) break;
        if (f < a.at) return a.color;
        if (f < b.at || (f === b.at && i === stops.length - 2)) {
          if (b.at === a.at) return b.color;
          const t = (f - a.at) / (b.at - a.at);
          return `color-mix(in oklab, ${a.color} ${((1 - t) * 100).toFixed(3)}%, ${b.color})`;
        }
      }
      return stops[stops.length - 1]?.color ?? "transparent";
    };
    const px = (value: string | undefined, what: string) => {
      const m = /^(-?[\d.]+)px$/.exec((value ?? "").trim().split(/\s+/)[0] ?? "");
      if (m === null) throw new Error(`the satin's ${what} is not in px: ${value}`);
      return Number(m[1]);
    };
    const satinX = px(split(computed.backgroundPosition)[1], "position");
    const satinLen = px(split(computed.backgroundSize)[1], "size");
    const layers = split(computed.backgroundImage);
    if (layers.length !== 2)
      throw new Error(`the band paints ${layers.length} layers, not the gloss and the satin`);
    // Fractional lengths throughout: offset* round to whole pixels, a twelfth of a narrow band.
    const size = (el: Element, property: "width" | "height" | "paddingTop" | "paddingBottom") =>
      parseFloat(getComputedStyle(el)[property]);
    const bandLength = size(band, "width");
    const height = size(band, "height");
    const gloss = stopsOf(layers[0] ?? "", height);
    const satin = stopsOf(layers[1] ?? "", satinLen);
    const probe = document.createElement("div");
    document.body.append(probe);
    const resolve = (color: string) => {
      probe.style.color = "";
      probe.style.color = color;
      return getComputedStyle(probe).color;
    };
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx === null) throw new Error("no 2d context");
    const lum = (layers: string[]) => {
      ctx.clearRect(0, 0, 1, 1);
      for (const color of layers) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
      }
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3), (v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ink = lum([computed.color]);
    // The band is turned: three zero-size marks at its corners map a band point to the screen.
    const mark = (left: number, top: number) => {
      const dot = document.createElement("div");
      dot.style.cssText = `position:absolute;left:${left}px;top:${top}px;width:0;height:0`;
      band.append(dot);
      const { x, y } = dot.getBoundingClientRect();
      dot.remove();
      return { x, y };
    };
    const origin = mark(0, 0);
    const along = mark(bandLength, 0);
    const across = mark(0, height);
    const clip = wrapper.getBoundingClientRect();
    const shown = (x: number, y: number) => {
      const sx =
        origin.x + ((along.x - origin.x) * x) / bandLength + ((across.x - origin.x) * y) / height;
      const sy =
        origin.y + ((along.y - origin.y) * x) / bandLength + ((across.y - origin.y) * y) / height;
      return sx >= clip.left && sx <= clip.right && sy >= clip.top && sy <= clip.bottom;
    };
    // The text is the band's one block child, its whole length and height (no band padding).
    if (getComputedStyle(text).boxSizing !== "border-box" || size(band, "paddingTop") !== 0)
      throw new Error("the band's text is not the band's own border box");
    const centre = bandLength / 2;
    const top = size(text, "paddingTop");
    const bottom = size(text, "height") - size(text, "paddingBottom");
    // Judged: the text's content box, where its letters are. Reported: its padding box too.
    const rows = [top, (top + bottom) / 2, bottom];
    const padRows = [0, size(text, "height")];
    const ratioAt = (back: string, y: number) => {
      const over = resolve(colorAt(gloss, Math.min(1, Math.max(0, y / height))));
      const l = lum([back, over]);
      const [lo, hi] = [ink, l].sort((a, b) => a - b);
      return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
    };
    const out = words.map((word) => {
      const copy = text.cloneNode(false) as HTMLElement;
      copy.removeAttribute("data-testid");
      copy.textContent = word;
      copy.style.display = "inline-block";
      copy.style.position = "absolute";
      copy.style.visibility = "hidden";
      band.append(copy);
      const width = size(copy, "width");
      copy.remove();
      let worst = { ratio: Infinity, f: 0, y: 0 };
      let padWorst = Infinity;
      for (let x = centre - width / 2; x <= centre + width / 2; x += 0.5) {
        const f = (x - satinX) / satinLen;
        const seen = [...rows, ...padRows].filter((y) => shown(x, y));
        if (seen.length === 0) continue;
        if (f < 0 || f > 1)
          throw new Error(`"${word}" shows past the satin's span (${f.toFixed(3)})`);
        const back = resolve(colorAt(satin, f));
        for (const y of rows) {
          if (!shown(x, y)) continue;
          const ratio = ratioAt(back, y);
          if (ratio < worst.ratio) worst = { ratio, f, y: y / height };
        }
        for (const y of padRows) if (shown(x, y)) padWorst = Math.min(padWorst, ratioAt(back, y));
      }
      if (worst.ratio === Infinity) throw new Error(`"${word}" shows nowhere on the picture`);
      return { word, width, ...worst, padWorst };
    });
    probe.remove();
    return out;
  }, words);
}

async function setMode(page: Page, mode: Mode) {
  await page.evaluate(
    (mode) => window.localStorage.setItem("ethio.theme", JSON.stringify({ name: "sage", mode })),
    mode,
  );
}

/** The ribbon words of every public language: the compiled en and am, and every row the database holds. */
async function ribbonWords() {
  const { data: languages, error } = await adminClient()
    .from("languages")
    .select("code")
    .eq("enabled_public", true);
  if (error) throw new Error(`[e2e:stg] reading the public languages failed: ${error.message}`);
  const codes = (languages ?? []).map((row) => String(row.code));
  expect(codes, "the public languages include en").toContain("en");
  const { data: rows, error: rowsError } = await adminClient()
    .from("ui_translations")
    .select("key,lang_code,value")
    .in("key", [...RIBBON_KEYS])
    .in("lang_code", codes);
  if (rowsError) throw new Error(`[e2e:stg] reading the ribbon words failed: ${rowsError.message}`);
  const words = new Set<string>();
  for (const key of RIBBON_KEYS) {
    words.add(en[key]);
    words.add(am[key]);
  }
  for (const row of rows ?? [])
    if (typeof row.value === "string" && row.value) words.add(row.value);
  return { codes, words: [...words] };
}

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`Sage tiers at ${width}, ${mode}`, () => {
      const feed = adPageFixtures();
      test.afterEach(async () => {
        await feed.cleanup();
      });
      test.beforeEach(async ({ page }) => {
        test.skip(
          width < 768 !== (layoutOf(page) === "mobile"),
          "each width uses its pointer project",
        );
        await page.setViewportSize({ width, height: 900 });
      });

      /** A regular, a Premium and a Featured ad, each Reserved, on the seller's category page. */
      async function openTiers(page: Page) {
        const seller = await feed.scratchSeller();
        const ids: Record<Tier, string> = { regular: "", premium: "", featured: "" };
        for (const tier of TIERS) {
          const row = await feed.seed(seller);
          await updateListingRow(
            row.id,
            { tier, reserved_at: new Date().toISOString() },
            { tag: "stg" },
          );
          ids[tier] = row.id;
        }
        await page.goto("/");
        await setMode(page, mode);
        await signIn(page, seller.email, seller.password);
        await gotoReady(page, `/c/${seller.leafSlug}`);
        await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
        await expect(page.getByTestId("listing-card")).toHaveCount(3);
        const card = (tier: Tier) =>
          page.locator(`[data-testid="listing-card"][data-listing="${ids[tier]}"]`);
        return { card };
      }

      test(
        `STG-1 each tier's card reads its tokens, flag and ribbon (${width}, ${mode})`,
        { tag: "@webkit" },
        async ({ page }) => {
          const { card } = await openTiers(page);
          const tokens = { ...THEMES.sage.light, ...THEMES.sage[mode] };
          const fills: Record<Tier, Token> = {
            regular: "card",
            premium: "tier-premium",
            featured: "tier-featured",
          };
          const lifts: Record<Tier, string> = {
            regular: "lift-card",
            premium: "lift-premium",
            featured: "lift-featured",
          };
          const rules: Record<Tier, Token> = {
            regular: "rule",
            premium: "tier-premium-rule",
            featured: "tier-featured-rule",
          };
          for (const tier of TIERS) {
            const at = `${tier} card`;
            const c = card(tier);
            expect(await style(c, "background-color"), at).toBe(
              await tokenStyle(page, mode, fills[tier], "background-color"),
            );
            const lift = await liftOf(page, lifts[tier]);
            expect(await style(c, "box-shadow"), at).toBe(lift);
            if (tier !== "regular") expect(lift, `${at}: the tier's frame`).toContain("1.5px");
            expect(await style(c.getByTestId("listing-card-place"), "border-top-color"), at).toBe(
              await tokenStyle(page, mode, rules[tier], "border-top-color"),
            );

            // §8 — the ribbon's palette by tier: its six stops, its ink, its caps.
            const ribbon = c.getByTestId("listing-ribbon");
            const palette = PALETTE[tier];
            await expect(ribbon).toHaveAttribute("data-ribbon", palette);
            for (const part of ["1", "2", "3", "4", "5", "6"]) {
              // The built stylesheet rewrites a colour's text, so both sides are compared resolved.
              const name = `ribbon-${palette}-${part}` as Token;
              expect(
                await resolvedIn(ribbon, "color", `var(--rb-${part})`),
                `${at}: stop ${part}`,
              ).toBe(await tokenStyle(page, mode, name, "color"));
            }
            expect(await style(ribbon.locator(".ribbon-band"), "color"), at).toBe(
              await tokenStyle(page, mode, `ribbon-${palette}-ink` as Token, "color"),
            );
            const ends = c.getByTestId("listing-ribbon-ends");
            await expect(ends).toHaveAttribute("data-ribbon", palette);
            // INC-1121 — the photo-less well: no failed picture, and any picture inside fits.
            await expectPicturesFit(page, c.getByTestId("listing-card-picture"), { atLeast: 0 });
            const boxes = await layoutBoxes({
              card: c,
              frame: c.getByTestId("listing-card-picture"),
              capEnd: ends.locator(".ribbon-cap-end"),
              capFoot: ends.locator(".ribbon-cap-foot"),
            });
            expect(boxes.capEnd.x, `${at}: the end cap past the picture`).toBeGreaterThanOrEqual(
              boxes.frame.x + boxes.frame.width - 0.5,
            );
            expect(boxes.capFoot.y, `${at}: the foot cap below it`).toBeGreaterThanOrEqual(
              boxes.frame.y + boxes.frame.height - 0.5,
            );

            // §7 — the flag and the word, on paid cards only.
            const compact = boxes.card.width < COMPACT_PX;
            if (tier === "regular") {
              await expect(c.getByTestId("listing-card-tier")).toHaveCount(0);
              await expect(c.getByTestId("listing-card-tier-word")).toHaveCount(0);
              continue;
            }
            const name = await levelNameFor(tier, "en");
            const flag = c.getByRole("img", { name });
            await expect(flag).toHaveCount(1);
            await expect(flag.locator("path")).toHaveCount(tier === "premium" ? 4 : 3);
            const scale = compact ? (width < 768 ? 1.6 : 1.25) : 1;
            const flagBox = (await layoutBoxes({ flag, card: c })).flag;
            expect(flagBox.width, `${at}: the flag's size`).toBeCloseTo(
              scale * 0.19 * boxes.card.width,
              0,
            );
            expect(flagBox.x, `${at}: the fold past the card's edge`).toBeCloseTo(
              boxes.card.x - scale * 0.0225 * boxes.card.width,
              0,
            );
            const word = c.getByTestId("listing-card-tier-word");
            await expect(word).toHaveText(name);
            expect(await style(word, "font-size"), at).toBe(
              compact ? (width < 768 ? "9px" : "10px") : "11px",
            );
            expect(await style(word, "font-weight"), at).toBe("800");
            expect(await style(word, "text-transform"), at).toBe("uppercase");
            expect(await style(word, "color"), at).toBe(
              await tokenStyle(page, mode, `tier-${tier}-ink` as Token, "color"),
            );
            await expect(word.locator("svg")).toHaveCount(tier === "premium" ? 2 : 1);
          }
          // Ruling 3 (LL-1) — one card shape, paid or not.
          const heights = await layoutBoxes({
            regular: card("regular"),
            premium: card("premium"),
            featured: card("featured"),
          });
          const tall = Object.values(heights).map((box) => box.height);
          expect(
            Math.max(...tall) - Math.min(...tall),
            "every card one height",
          ).toBeLessThanOrEqual(0.5);
          await expectNoHorizontalOverflow(page);
        },
      );

      test(`STG-2 the tier word and every ribbon word meet 4.5 : 1 where they are read (${width}, ${mode})`, async ({
        page,
      }) => {
        const { codes, words } = await ribbonWords();
        const { card } = await openTiers(page);
        await settled(page);
        const floor = (ratio: number) => Math.floor(ratio * 1000) / 1000;
        // Every word is measured before the judge, so a failure names them all.
        const tierWords: Record<string, number> = {};
        const ribbons: Record<string, [number, number]> = {};
        const under: string[] = [];
        for (const tier of TIERS) {
          const c = card(tier);
          if (tier !== "regular") {
            const word = c.getByTestId("listing-card-tier-word");
            const ratio = await contrast(
              page,
              await style(word, "color"),
              await style(c, "background-color"),
            );
            tierWords[tier] = floor(ratio);
            if (ratio < 4.5) under.push(`${tier}: the tier word on its fill ${floor(ratio)}`);
          }
          for (const measured of await ribbonContrast(c.getByTestId("listing-ribbon"), words)) {
            const key = `${PALETTE[tier]}/${measured.word}`;
            ribbons[key] = [floor(measured.ratio), floor(measured.padWorst)];
            if (measured.ratio < 4.5)
              under.push(
                `${key} ${floor(measured.ratio)} at ${measured.f.toFixed(3)} of the satin, ${measured.y.toFixed(2)} down the band`,
              );
          }
        }
        console.log(
          `[sage-tiers] ${width} ${mode} ${codes.join(",")} words ${JSON.stringify(tierWords)} ribbons [content, padding] ${JSON.stringify(ribbons)}`,
        );
        expect(under, "every word reads at 4.5 : 1 or more").toEqual([]);
      });
    });
  }
}

test.describe("The Amharic tier word at 390 (§7)", () => {
  const feed = adPageFixtures();
  test.afterEach(async () => {
    await feed.cleanup();
  });
  test.beforeEach(async ({ page }) => {
    test.skip(layoutOf(page) !== "mobile", "the phone width");
    await page.setViewportSize({ width: 390, height: 900 });
  });

  test("STG-3 the Amharic tier word shows whole at 9 px or more", async ({ page }) => {
    const seller = await feed.scratchSeller();
    const ids: string[] = [];
    for (const tier of ["premium", "featured"] as const) {
      const row = await feed.seed(seller);
      await updateListingRow(row.id, { tier }, { tag: "stg" });
      ids.push(row.id);
    }
    // Signed out: the pick is this device's alone, and no account's stored language moves (D239).
    await gotoReady(page, `/c/${seller.leafSlug}`);
    await expect(page.getByTestId("listing-card")).toHaveCount(2);
    await switchLanguage(page, "am");
    try {
      for (const [index, id] of ids.entries()) {
        const card = page.locator(`[data-testid="listing-card"][data-listing="${id}"]`);
        const word = card.getByTestId("listing-card-tier-word");
        await expect(word).toHaveText(
          await levelNameFor(index === 0 ? "premium" : "featured", "am"),
        );
        expect(parseFloat(await style(word, "font-size"))).toBeGreaterThanOrEqual(9);
        const fit = await word.evaluate((el) => ({
          whole: el.scrollWidth <= el.clientWidth + 0.5,
          inside:
            el.getBoundingClientRect().right <=
            (el.closest("article")?.getBoundingClientRect().right ?? 0) + 0.5,
        }));
        expect(fit, `card ${index}`).toEqual({ whole: true, inside: true });
      }
    } finally {
      await switchLanguage(page, "en");
    }
  });
});

test.describe("The same Premium card on every card surface (§7)", () => {
  const feed = adPageFixtures();
  const saved: Array<{ user: string; listing: string }> = [];
  test.afterEach(async () => {
    for (const { user, listing } of saved.splice(0)) {
      const removed = await adminClient()
        .from("saved_listings")
        .delete()
        .eq("user_id", user)
        .eq("listing_id", listing);
      if (removed.error)
        throw new Error(`[e2e:stg] saved row reap failed: ${removed.error.message}`);
    }
    await feed.cleanup();
  });
  test.beforeEach(async ({ page }) => {
    test.skip(layoutOf(page) !== "desktop", "one width: the look, not the layout");
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test("STG-4 the Premium card looks the same in similar ads and on the saved page", async ({
    page,
  }) => {
    const seller = await feed.scratchSeller();
    const shown = await feed.seed(seller);
    const other = await feed.seed(seller);
    for (const id of [shown.id, other.id]) {
      await updateListingRow(
        id,
        { tier: "premium", reserved_at: new Date().toISOString() },
        { tag: "stg" },
      );
    }
    const buyer = await leaseUser();
    const added = await adminClient()
      .from("saved_listings")
      .insert({ user_id: buyer.id, listing_id: shown.id });
    if (added.error) throw new Error(`[e2e:stg] saving failed: ${added.error.message}`);
    saved.push({ user: buyer.id, listing: shown.id });
    const otherPath = listingPath(other.title, await feed.publicIdOf(other.id));

    const premiumName = await levelNameFor("premium", "en");
    const look = async (card: Locator) => ({
      fill: await style(card, "background-color"),
      shadow: await style(card, "box-shadow"),
      rule: await style(card.getByTestId("listing-card-place"), "border-top-color"),
      flag: await card.getByRole("img", { name: premiumName }).count(),
      word: (await card.getByTestId("listing-card-tier-word").textContent()) ?? "",
      ribbon: await card.getByTestId("listing-ribbon").getAttribute("data-ribbon"),
    });
    await signInViaSession(page, buyer.email, buyer.password);
    await gotoReady(page, "/");
    const expected = {
      fill: await tokenStyle(page, "light", "tier-premium", "background-color"),
      shadow: await liftOf(page, "lift-premium"),
      rule: await tokenStyle(page, "light", "tier-premium-rule", "border-top-color"),
      flag: 1,
      word: premiumName,
      ribbon: "gold",
    };

    await gotoReady(page, otherPath);
    const anchor = page.getByTestId("listing-similar-anchor");
    await anchor.scrollIntoViewIfNeeded();
    await expect(anchor).toHaveAttribute("data-similar", "shown", { timeout: 15000 });
    const similar = page
      .getByTestId("listing-similar")
      .locator(`[data-testid="listing-card"][data-listing="${shown.id}"]`);
    await expect(similar).toHaveCount(1);
    expect(await look(similar), "similar ads").toEqual(expected);

    await gotoReady(page, "/account/saved");
    const savedCard = page.locator(`[data-testid="listing-card"][data-listing="${shown.id}"]`);
    await expect(savedCard).toHaveCount(1);
    expect(await look(savedCard), "saved ads").toEqual(expected);
  });
});

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`The invite card at ${width}, ${mode} (§9)`, () => {
      test.beforeEach(async ({ page }) => {
        test.skip(
          width < 768 !== (layoutOf(page) === "mobile"),
          "each width uses its pointer project",
        );
        await page.setViewportSize({ width, height: 900 });
      });

      test(`STG-6 the invite card's border, fill, corner, shadow, disc, sentence and button (${width}, ${mode})`, async ({
        page,
      }) => {
        await page.goto("/");
        await setMode(page, mode);
        await gotoReady(page, "/dev/style");
        await expect(page.locator("html")).toHaveAttribute("data-mode", mode);
        const cell = page.getByTestId(`style-card-invite-${mode}`);
        await cell.scrollIntoViewIfNeeded();
        const surface = cell.getByTestId("feed-invite-surface");
        await expect(surface).toBeVisible();
        const boxes = await layoutBoxes({
          surface,
          star: cell.getByTestId("feed-invite-star"),
        });
        const compact = boxes.surface.width < COMPACT_PX;
        const at = `${width} ${mode} ${compact ? "compact" : "wide"}`;
        // The panel scopes its theme's tokens on itself (D250): every value is read inside it.
        expect(await style(surface, "background-color"), at).toBe(
          await tokenStyle(page, mode, "invite", "background-color", cell),
        );
        expect(await style(surface, "border-top-width"), at).toBe("2px");
        expect(await style(surface, "border-top-color"), at).toBe(
          await tokenStyle(page, mode, "gold", "border-top-color", cell),
        );
        expect(await style(surface, "border-top-left-radius"), at).toBe(
          await resolvedIn(cell, "border-top-left-radius", "var(--card-radius)"),
        );
        expect(await style(surface, "box-shadow"), at).toBe(await liftOf(page, "lift-card", cell));
        const disc = compact ? (width < 768 ? 24 : 36) : 46;
        expect(boxes.star.width, at).toBeCloseTo(disc, 0);
        expect(await style(cell.getByTestId("feed-invite-star"), "box-shadow"), at).toBe(
          await liftOf(page, "lift-badge", cell),
        );
        const sentence = cell.getByTestId("feed-invite-text");
        expect(await style(sentence, "font-size"), at).toBe(
          compact ? (width < 768 ? "12px" : "13px") : "18px",
        );
        expect(await style(sentence, "font-weight"), at).toBe(compact ? "600" : "700");
        const ratio = await contrast(
          page,
          await style(sentence, "color"),
          await style(surface, "background-color"),
        );
        expect(ratio, `${at}: the sentence on the fill`).toBeGreaterThanOrEqual(4.5);
        const button = cell.getByTestId("feed-invite-post");
        expect(await style(button, "border-top-left-radius"), at).toBe(
          width < 768 ? "10px" : "12px",
        );
        expect(await style(button, "font-weight"), at).toBe("600");
        expect(await style(button, "box-shadow"), at).toBe(await liftOf(page, "lift-button", cell));
      });
    });
  }
}
