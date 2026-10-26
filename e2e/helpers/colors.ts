import type { Locator } from "@playwright/test";

/**
 * Bundle 11 A3 — a button's fill as a person sees it (the browser's computed
 * background colour), and whether that fill is the destructive red. The app's
 * red is oklch(0.5 0.182 29.5) in light and oklch(0.704 0.191 22.216) in dark
 * (src/styles.css); the primary green sits near hue 163. A browser reports the
 * colour as oklch(), as oklab() — every colour Tailwind mixes, such as a hovered
 * `bg-destructive/90` (INC-910) — or as rgb(); all three are read.
 */
export async function fillOf(locator: Locator): Promise<string> {
  return locator.evaluate((element) => getComputedStyle(element).backgroundColor);
}

/** A colour as OKLCH's chroma and hue (degrees, 0–360) with its alpha (0–1). */
export interface OkLch {
  chroma: number;
  hue: number;
  alpha: number;
}

function alphaOf(raw: string | undefined): number {
  if (raw === undefined) return 1;
  return raw.endsWith("%") ? Number(raw.slice(0, -1)) / 100 : Number(raw);
}

/**
 * INC-910 — oklch() and oklab() read as chroma, hue and alpha (oklab's a and b
 * are the same chroma and hue in Cartesian form); null for any other form.
 */
export function okLchOf(color: string): OkLch | null {
  const lch = /^oklch\(\s*[\d.]+%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i.exec(color);
  if (lch) return { chroma: Number(lch[1]), hue: Number(lch[2]), alpha: alphaOf(lch[3]) };
  const lab = /^oklab\(\s*[\d.]+%?\s+(-?[\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i.exec(
    color,
  );
  if (lab) {
    const a = Number(lab[1]);
    const b = Number(lab[2]);
    const degrees = (Math.atan2(b, a) * 180) / Math.PI;
    return {
      chroma: Math.hypot(a, b),
      hue: degrees < 0 ? degrees + 360 : degrees,
      alpha: alphaOf(lab[3]),
    };
  }
  return null;
}

/** A fill a person sees as its colour is at least half opaque (a 10% wash is not). */
const SEEN_ALPHA = 0.5;

/**
 * D163 — whether a colour is the system's gold: oklch(0.681 0.13 72.5) in light
 * and oklch(0.769 0.128 78.3) in dark (src/styles.css; #C98A2B and #E0A94A).
 */
export function isGoldFill(color: string): boolean {
  const lch = okLchOf(color);
  if (lch) return lch.alpha >= SEEN_ALPHA && lch.chroma >= 0.08 && lch.hue >= 60 && lch.hue <= 95;
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
  if (rgb) {
    const [red, green, blue] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return red >= 150 && red > green && green >= 100 && green - blue >= 40;
  }
  return false;
}

export function isRedFill(color: string): boolean {
  const lch = okLchOf(color);
  if (lch) return lch.alpha >= SEEN_ALPHA && lch.chroma >= 0.1 && (lch.hue <= 45 || lch.hue >= 340);
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
  if (rgb) {
    const [red, green, blue] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return red >= 150 && red - green >= 60 && red - blue >= 60;
  }
  return false;
}
