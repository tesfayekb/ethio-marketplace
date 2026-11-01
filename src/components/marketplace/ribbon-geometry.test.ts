import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { WATERMARK_ANGLE } from "@/lib/brand-mark";
import { MODE_FREE_TOKENS, MODED_TOKENS } from "@/lib/schemas/theme";

import {
  CAP_END,
  CAP_FOOT,
  RIBBON_BAND_STYLE,
  RIBBON_LENGTH_CQW,
  RIBBON_PALETTES,
  RIBBON_TEXT_STYLE,
  SATIN_LENGTH,
  SATIN_SHOWN,
  SATIN_START,
  SATIN_STRIPS,
  TAPE_INSET_X,
  TAPE_INSET_Y,
  TAPE_REACH,
  ribbonPaletteVars,
  spanCss,
  spanPx,
} from "./ribbon-geometry";

/**
 * Sage S4 (spec §8; rulings 1 and 2) — the ribbon's geometry, checked against the band's own
 * rectangle worked out here from the brand angle: the place, angle and size stay as they were
 * (D122, INC-670), the satin shows only its 7 % to 92 % stretch inside the picture, and the
 * caps sit exactly where the band's edges cross the picture's right and bottom edges.
 */
const RAD = (Math.abs(WATERMARK_ANGLE) * Math.PI) / 180;
/** Picture widths in px: three and five a row on a phone, a tablet card, the ad page. */
const WIDTHS = [103, 180, 250, 400];

function picture(width: number) {
  const unit = width / 100;
  const letters = Math.min(Math.max(0.05 * width, 9), 20);
  const thick = letters + 2 * 1.4 * unit;
  const height = width * 0.75;
  const centre = {
    x: width - TAPE_REACH * Math.cos(RAD) * unit,
    y: height - TAPE_REACH * Math.sin(RAD) * unit,
  };
  const along = { x: Math.cos(RAD), y: -Math.sin(RAD) };
  /** Away from the corner: the band's far edge. */
  const across = { x: -Math.sin(RAD), y: -Math.cos(RAD) };
  /** Where an edge line (offset `v` across the band) meets x = width and y = height. */
  const crossings = (v: number) => {
    const ox = centre.x + v * across.x;
    const oy = centre.y + v * across.y;
    return {
      right: { s: (width - ox) / along.x, y: oy + ((width - ox) / along.x) * along.y },
      bottom: { s: (height - oy) / along.y, x: ox + ((height - oy) / along.y) * along.x },
    };
  };
  return { unit, thick, height, crossings };
}

describe("the ribbon's geometry (spec §8)", () => {
  it("RBN-1 the band's place, angle and size are unchanged (D122, INC-670)", () => {
    expect(TAPE_INSET_X).toBe("25.72cqw");
    expect(TAPE_INSET_Y).toBe("14.85cqw");
    expect(RIBBON_BAND_STYLE.width).toBe("84cqw");
    expect(RIBBON_BAND_STYLE.left).toBe("calc(100% - 25.72cqw)");
    expect(RIBBON_BAND_STYLE.top).toBe("calc(100% - 14.85cqw)");
    expect(RIBBON_BAND_STYLE.transform).toBe("translate(-50%, -50%) rotate(-30deg)");
    expect(RIBBON_TEXT_STYLE).toEqual({
      fontSize: "clamp(9px, 5cqw, 20px)",
      letterSpacing: "0.06em",
      padding: "1.4cqw 0",
    });
  });

  it.each(WIDTHS)(
    "RBN-2 at %i px the picture shows the satin from its 7 %% stop to its 92 %% stop (ruling 2)",
    (width) => {
      const { unit, thick, crossings } = picture(width);
      const far = crossings(thick / 2);
      const start = spanPx(SATIN_START, unit, thick);
      const length = spanPx(SATIN_LENGTH, unit, thick);
      const half = (RIBBON_LENGTH_CQW / 2) * unit;
      // The band's local x runs from its start edge; its centre is half its length along.
      expect(start + SATIN_SHOWN.from * length).toBeCloseTo(half + far.bottom.s, 6);
      expect(start + SATIN_SHOWN.to * length).toBeCloseTo(half + far.right.s, 6);
      // Every other row of the band crosses the edges inside that stretch.
      for (const v of [-thick / 2, 0, thick / 4]) {
        const row = crossings(v);
        expect(half + row.bottom.s).toBeGreaterThanOrEqual(start + SATIN_SHOWN.from * length);
        expect(half + row.right.s).toBeLessThanOrEqual(start + SATIN_SHOWN.to * length);
      }
      // The dark end stops lie beyond the picture.
      expect(start).toBeLessThan(half + far.bottom.s);
      expect(start + length).toBeGreaterThan(half + far.right.s);
    },
  );

  it.each(WIDTHS)(
    "RBN-3 at %i px each rolled cap spans the band's crossing of its edge",
    (width) => {
      const { unit, thick, height, crossings } = picture(width);
      const near = crossings(-thick / 2);
      const far = crossings(thick / 2);
      const top = Math.min(near.right.y, far.right.y);
      expect(height - spanPx(CAP_END.above, unit, thick)).toBeCloseTo(top, 6);
      expect(spanPx(CAP_END.height, unit, thick)).toBeCloseTo(
        Math.abs(near.right.y - far.right.y),
        6,
      );
      const left = Math.min(near.bottom.x, far.bottom.x);
      expect(width - spanPx(CAP_FOOT.before, unit, thick)).toBeCloseTo(left, 6);
      expect(spanPx(CAP_FOOT.width, unit, thick)).toBeCloseTo(
        Math.abs(near.bottom.x - far.bottom.x),
        6,
      );
    },
  );

  it("RBN-4 a span reads the same as CSS and as pixels", () => {
    expect(spanCss({ cqw: 7.5, t: -0.25 })).toBe(
      "calc(7.5000cqw - 0.2500 * (clamp(9px, 5cqw, 20px) + 2.8cqw))",
    );
    expect(RIBBON_BAND_STYLE["--satin-x"]).toBe(spanCss(SATIN_START));
    expect(RIBBON_BAND_STYLE["--satin-len"]).toBe(spanCss(SATIN_LENGTH));
    expect(spanPx({ cqw: 7.5, t: -0.25 }, 2, 20)).toBe(10);
  });

  it.each(WIDTHS)(
    "RBN-7 at %i px the gloss and the shade stay inside the text's padding, never under a letter",
    (width) => {
      const { unit, thick } = picture(width);
      const pad = 1.4 * unit;
      expect(SATIN_STRIPS.gloss * unit).toBeLessThan(pad);
      expect(SATIN_STRIPS.shade * unit).toBeLessThan(pad);
      expect(RIBBON_BAND_STYLE["--satin-gloss"]).toBe(`${SATIN_STRIPS.gloss.toFixed(3)}cqw`);
      expect(RIBBON_BAND_STYLE["--satin-shade"]).toBe(`${SATIN_STRIPS.shade.toFixed(3)}cqw`);
      // Where the letters are 5cqw (the band at its own size), the strips are 12 % and 14 % of it.
      if (0.05 * width >= 9 && 0.05 * width <= 20) {
        expect((SATIN_STRIPS.gloss * unit) / thick).toBeCloseTo(0.12, 6);
        expect((SATIN_STRIPS.shade * unit) / thick).toBeCloseTo(0.14, 6);
      }
    },
  );

  it("RBN-8 the stylesheet draws the strips from the geometry's two lengths", () => {
    const css = readFileSync(resolve(__dirname, "../../styles.css"), "utf8");
    const band = css.slice(css.indexOf(".ribbon-band {"), css.indexOf(".ribbon-ends {"));
    expect(band).toMatch(/var\(--ribbon-gloss\)\s+var\(--satin-gloss\)/);
    expect(band).toMatch(/calc\(100%\s*-\s*var\(--satin-shade\)\)/);
    expect(band).not.toMatch(/\b(?:12|86)%/);
  });

  it("RBN-5 every palette names a theme token for each part the stylesheet's ribbon rules read", () => {
    const css = readFileSync(resolve(__dirname, "../../styles.css"), "utf8");
    const rules = css.slice(css.indexOf(".ribbon-band {"), css.indexOf(".ribbon-cap-foot"));
    const read = new Set([...css.matchAll(/var\(--(rb-[\w-]+)\)/g)].map((m) => `--${m[1]}`));
    expect(rules.length).toBeGreaterThan(0);
    expect(read.size).toBe(11);
    const tokens = new Set<string>([...MODED_TOKENS, ...MODE_FREE_TOKENS]);
    for (const palette of RIBBON_PALETTES) {
      const vars = ribbonPaletteVars(palette);
      expect(new Set(Object.keys(vars))).toEqual(read);
      for (const value of Object.values(vars)) {
        const name = /^var\(--([\w-]+)\)$/.exec(value)?.[1] ?? "";
        expect(tokens.has(name), `${palette}: ${value}`).toBe(true);
      }
    }
    // Pearl changes with the mode; gold and sage hold in both.
    expect(MODED_TOKENS).toContain("ribbon-pearl-1");
    expect(MODE_FREE_TOKENS).toContain("ribbon-gold-1");
    expect(MODE_FREE_TOKENS).toContain("ribbon-sage-1");
  });
});
