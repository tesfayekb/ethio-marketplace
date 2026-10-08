import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * BUNDLE 9 A4 — the house-style tokens judged from src/styles.css itself:
 * WCAG contrast of every pair of the brief's CONTRAST table in both modes,
 * every registered colour declared in both modes, no hex or rgb() values.
 */

const css = readFileSync(resolve(__dirname, "styles.css"), "utf8").replace(
  /\/\*[\s\S]*?\*\//g,
  "",
);

function block(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`no ${selector} block`);
  return css.slice(start, css.indexOf("}", start));
}

function props(body: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) out.set(m[1]!, m[2]!.trim());
  return out;
}

const root = props(block(":root"));
const dark = props(block(".dark"));
const theme = block("@theme inline");

function oklchToSrgb(value: string): [number, number, number] {
  const m = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/.exec(value);
  if (!m) throw new Error(`not oklch: ${value}`);
  const L = Number(m[1]);
  const C = Number(m[2]);
  const h = (Number(m[3]) * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  return lin.map((c) => Math.min(1, Math.max(0, c))) as [number, number, number];
}

function luminance(value: string): number {
  const [r, g, b] = oklchToSrgb(value);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg: string, bg: string): number {
  const a = luminance(fg);
  const b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const PAIRS: ReadonlyArray<[string, string]> = [
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["destructive", "card"],
  ["destructive", "destructive-soft"],
  ["destructive-foreground", "destructive"],
  ["success", "card"],
  ["success", "success-soft"],
  ["warning", "card"],
  ["warning", "warning-soft"],
  ["info", "card"],
  ["info", "info-soft"],
  ["neutral", "card"],
  ["neutral", "neutral-soft"],
];

describe.each([
  ["light", root],
  ["dark", dark],
] as const)("house-style contrast, %s mode", (mode, tokens) => {
  it.each(PAIRS)("%s on %s is at least 4.5:1", (fg, bg) => {
    const f = tokens.get(fg);
    const b = tokens.get(bg);
    expect(f, `${mode} declares --${fg}`).toBeDefined();
    expect(b, `${mode} declares --${bg}`).toBeDefined();
    const ratio = contrast(f!, b!);
    console.log(`[tokens] ${mode} ${fg} on ${bg} ${ratio.toFixed(2)}:1`);
    expect(ratio, `${mode} ${fg} ${f} on ${bg} ${b} = ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(
      4.5,
    );
  });
});

describe("house-style registration", () => {
  it("every --color-<name>: var(--<name>) is declared in :root and .dark", () => {
    const names = [...theme.matchAll(/--color-[\w-]+:\s*var\(--([\w-]+)\)/g)].map((m) => m[1]!);
    expect(names.length).toBeGreaterThan(0);
    const missing = names.filter((n) => !root.has(n) || !dark.has(n));
    expect(missing).toEqual([]);
  });

  it("no colour in :root or .dark is written as hex or rgb()", () => {
    const bad = [...root, ...dark].filter(([, v]) => /#[0-9a-f]{3,8}\b|rgba?\(/i.test(v));
    expect(bad).toEqual([]);
  });
});
