import type { Locator } from "@playwright/test";

/**
 * Bundle 11 A3 — a button's fill as a person sees it (the browser's computed
 * background colour), and whether that fill is the destructive red. The app's
 * red is oklch(0.5 0.182 29.5) in light and oklch(0.704 0.191 22.216) in dark
 * (src/styles.css); the primary green sits near hue 163. A browser reports the
 * colour as oklch() or as rgb(); both are read.
 */
export async function fillOf(locator: Locator): Promise<string> {
  return locator.evaluate((element) => getComputedStyle(element).backgroundColor);
}

export function isRedFill(color: string): boolean {
  const lch = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/i.exec(color);
  if (lch) {
    const chroma = Number(lch[2]);
    const hue = Number(lch[3]);
    return chroma >= 0.1 && (hue <= 45 || hue >= 340);
  }
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
  if (rgb) {
    const [red, green, blue] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    return red >= 150 && red - green >= 60 && red - blue >= 60;
  }
  return false;
}
