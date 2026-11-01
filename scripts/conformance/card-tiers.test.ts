import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

import { CARD_PAGES, TIER_FLAG_MARKER, tierFlagViolations } from "../route-budgets.mjs";
import { codeOf, readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * Turn SAGE-S4 (spec §7, §8; rulings 1 and 2) — A CARD'S TIER AND ITS RIBBON ARE DRAWN BY ONE
 * MECHANISM EACH. The tier's look (fill and frame, divider, word and star ink) lives in
 * src/components/marketplace/card-tier.ts, the flag and the word in tier-flag.tsx; the satin
 * ribbon's internals (its classes, the --rb-* palette variables, the satin's span) in
 * listing-picture.tsx and ribbon-geometry.ts, its rules in src/styles.css.
 *
 * CF-TIER-1 reads every source file under src/ (tests aside) for a second copy: a tier look
 * class, the flag's test id, a screen file comparing a tier to a paid tier's name, a ribbon
 * internal, an SVG gradient or drop shadow, or the flag's own references (--flag-*, the tier
 * frame and fold), outside its mechanism; inside tier-flag.tsx every stop colour is a token
 * reference. A recorded exception is a line in card-tiers-allowlist.txt keyed
 * `<file> (<findings>)` | reason | until. CF-TIER-2 proves each rule on planted files.
 * CF-TIER-3 proves the build judge (route-budgets.mjs tierFlagViolations, run by
 * check-bundle-size.mjs on every page's first download): the flag rides card pages only.
 */
type Finding = { file: string; line: number; what: string };

const LOOK = "src/components/marketplace/card-tier.ts";
const FLAG = "src/components/marketplace/tier-flag.tsx";
const RIBBON = [
  "src/components/marketplace/listing-picture.tsx",
  "src/components/marketplace/ribbon-geometry.ts",
];
const RULE = "(S4: one mechanism per tier look, flag and ribbon)";
const ALLOWLIST = "scripts/conformance/card-tiers-allowlist.txt";

const TIER_CLASS =
  /(?<![\w-])(?:bg-tier-(?:premium|featured)|shadow-(?:premium|featured)|border-tier-(?:premium|featured)-rule|text-tier-(?:premium|featured)-(?:ink|star))(?![\w-])/;
const FLAG_REF = /--flag-|--tier-(?:premium|featured)-(?:frame|fold)\b/;
const TIER_COMPARE =
  /\btier\s*[!=]==?\s*["'](?:premium|featured)["']|["'](?:premium|featured)["']\s*[!=]==?\s*[\w.?]*tier\b|\bcase\s+["'](?:premium|featured)["']/i;
const RIBBON_INTERNAL = /\bribbon-(?:band|ends|cap-end|cap-foot)\b|--rb-|--ribbon-|--satin-/;
const SVG_PAINT = /<(?:linearGradient|radialGradient)\b|drop-shadow\(/;
/** A stop colour is a `var(--…)` written in place, or `stop`: card-tier.ts's references (CTR-2). */
const STOP_LITERAL = /\bstop-?[cC]olor\s*=|\bstopColor\s*:(?!\s*(?:`var\(--|"var\(--|stop\b))/;
const SCREEN = /^src\/(?:components|features|routes)\//;

/** Every second copy of a tier's look, the flag or the ribbon in these files. */
export function tierFindings(files: string[], root: string): Finding[] {
  const found: Finding[] = [];
  for (const file of files) {
    const name = relative(root, file).split(sep).join("/");
    const code = codeOf(readFileSync(file, "utf8")).split("\n");
    code.forEach((text, index) => {
      const line = index + 1;
      const hit = (what: string) => found.push({ file: name, line, what: `${what} ${RULE}` });
      if (name !== LOOK && TIER_CLASS.test(text))
        hit(`draws a tier's look outside ${LOOK}; read cardLookOf`);
      if (name !== FLAG && /listing-card-tier\b/.test(text))
        hit(`draws a tier mark outside ${FLAG}; render TierFlag`);
      if (name !== FLAG && name !== LOOK && FLAG_REF.test(text))
        hit(`paints with the flag's tokens outside ${FLAG}`);
      if (name !== FLAG && name !== LOOK && SCREEN.test(name) && TIER_COMPARE.test(text))
        hit(`decides a paid tier's look by its name outside ${LOOK}; read cardLookOf`);
      if (!RIBBON.includes(name) && RIBBON_INTERNAL.test(text))
        hit(`reaches the ribbon's internals outside ${RIBBON.join(" and ")}; render ListingRibbon`);
      if (name !== FLAG && SVG_PAINT.test(text))
        hit(`paints an SVG gradient or drop shadow outside ${FLAG}`);
      if (name === FLAG && STOP_LITERAL.test(text))
        hit("sets a stop colour that is not a token reference");
    });
  }
  return found;
}

const ROOT = process.cwd();

describe("a card's tier and its ribbon have one mechanism each (S4)", () => {
  it(
    "CF-TIER-1 no source file under src/ draws a tier's look, the flag or the ribbon's internals outside its mechanism",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).map((file) =>
        join(ROOT, file),
      );
      console.log(`[CF-TIER-1] files read: ${files.length}`);
      expect(files.length).toBeGreaterThanOrEqual(500);
      const findings = tierFindings(files, ROOT);
      const counts = new Map<string, number>();
      for (const hit of findings) counts.set(hit.file, (counts.get(hit.file) ?? 0) + 1);
      const keyOf = (file: string) => `${file} (${counts.get(file) ?? 0})`;
      const allowed = readAllowlist(ALLOWLIST, [...counts.keys()].map(keyOf));
      console.log(`[CF-TIER-1] findings: ${findings.length}; allowlist: ${allowed.size}`);
      expect(report(findings.filter((hit) => !allowed.has(keyOf(hit.file))))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-TIER-2 planted: each second copy fails; the mechanism files pass", () => {
    const dir = join(ROOT, "node_modules/.cache/card-tiers-census");
    mkdirSync(join(dir, "src/features/x"), { recursive: true });
    mkdirSync(join(dir, "src/components/marketplace"), { recursive: true });
    try {
      writeFileSync(
        join(dir, "src/features/x/bad.tsx"),
        [
          'export const a = "bg-tier-premium shadow-featured";',
          'export const b = <span data-testid="listing-card-tier" />;',
          'export const c = { fill: "var(--flag-premium-1)" };',
          'export const d = (tier: string) => (tier === "featured" ? 1 : 0);',
          'export const e = { "--rb-ink": "var(--ribbon-gold-ink)" };',
          'export const f = <svg><linearGradient id="g" /></svg>;',
          "// a comment naming bg-tier-premium or --rb-ink paints nothing",
        ].join("\n"),
      );
      writeFileSync(
        join(dir, FLAG),
        [
          "export const ok = <stop style={{ stopColor: `var(--flag-${tier}-1)` }} />;",
          'export const bad = <stop stopColor="#E0A94A" />;',
          'export const bad2 = <stop style={{ stopColor: "oklch(0.7 0.1 80)" }} />;',
          'export const fine = <linearGradient id="x" />;',
        ].join("\n"),
      );
      writeFileSync(
        join(dir, LOOK),
        'export const look = { surface: "bg-tier-premium shadow-premium", frame: "var(--tier-premium-frame)" };\nswitch (tier) { case "premium": }\n',
      );
      const files = walkFiles([join(dir, "src")], { ext: ["ts", "tsx"] });
      const where = `${RIBBON.join(" and ")}`;
      expect(report(tierFindings(files, dir))).toBe(
        [
          `src/components/marketplace/tier-flag.tsx:2 sets a stop colour that is not a token reference ${RULE}`,
          `src/components/marketplace/tier-flag.tsx:3 sets a stop colour that is not a token reference ${RULE}`,
          `src/features/x/bad.tsx:1 draws a tier's look outside ${LOOK}; read cardLookOf ${RULE}`,
          `src/features/x/bad.tsx:2 draws a tier mark outside ${FLAG}; render TierFlag ${RULE}`,
          `src/features/x/bad.tsx:3 paints with the flag's tokens outside ${FLAG} ${RULE}`,
          `src/features/x/bad.tsx:4 decides a paid tier's look by its name outside ${LOOK}; read cardLookOf ${RULE}`,
          `src/features/x/bad.tsx:5 reaches the ribbon's internals outside ${where}; render ListingRibbon ${RULE}`,
          `src/features/x/bad.tsx:6 paints an SVG gradient or drop shadow outside ${FLAG} ${RULE}`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CF-TIER-3 the build judge: the flag rides card pages only, its marker is the drawing's, and check-bundle-size runs it", () => {
    const flag = readFileSync(FLAG, "utf8");
    const star = /TIER_STAR_PATH\s*=\s*"([^"]+)"/.exec(flag);
    expect(star?.[1]).toBe(TIER_FLAG_MARKER);
    expect(CARD_PAGES).toEqual([
      "/",
      "/c/$slug",
      "/account_/saved",
      "/$name",
      "/l/$slug",
      "/dev/style",
    ]);
    const text = (name: string) => (name === "card.js" ? `x="${TIER_FLAG_MARKER}"` : "y");
    expect(
      tierFlagViolations(
        [
          { id: "/", closure: ["entry.js", "card.js"] },
          { id: "/post", closure: ["entry.js", "wizard.js"] },
        ],
        text,
      ),
    ).toEqual([]);
    expect(
      tierFlagViolations(
        [
          { id: "/", closure: ["entry.js", "card.js"] },
          { id: "/post", closure: ["entry.js", "card.js"] },
        ],
        text,
      ),
    ).toEqual(["/post: card.js carries the tier flag, which only card pages download"]);
    expect(tierFlagViolations([{ id: "/", closure: ["entry.js"] }], text)).toEqual([
      "no page carries the tier flag's marker; it no longer matches tier-flag.tsx",
    ]);
    const check = readFileSync("scripts/check-bundle-size.mjs", "utf8");
    expect(check).toContain("tierFlagViolations(");
    expect(check).toContain("routePreloads(routes, id)");
  });
});
