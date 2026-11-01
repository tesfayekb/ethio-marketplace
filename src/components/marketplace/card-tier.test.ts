import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { MODE_FREE_TOKENS, MODED_TOKENS } from "@/lib/schemas/theme";

import { CARD_TIERS, cardLookOf } from "./card-tier";

/**
 * Sage S4 (spec §7, §8) — the tier mechanism's data: one look per tier, every class a utility
 * the stylesheet maps to a theme token and every reference a theme token.
 */
const css = readFileSync(resolve(__dirname, "../../styles.css"), "utf8");
const themeBlock = css.slice(
  css.indexOf("@theme inline"),
  css.indexOf("\n}", css.indexOf("@theme inline")),
);
const tokens = new Set<string>([...MODED_TOKENS, ...MODE_FREE_TOKENS]);

/** The theme token a utility like `bg-tier-premium` or `shadow-premium` reads. */
function tokenOf(utility: string): string | undefined {
  const m = /^(?:bg|text|border|shadow)-(.+)$/.exec(utility);
  if (m?.[1] === undefined) return undefined;
  const kind = utility.startsWith("shadow-") ? "shadow" : "color";
  const mapped = new RegExp(`--${kind}-${m[1]}:\\s*var\\(\\s*--([\\w-]+)\\s*\\)`).exec(themeBlock);
  return mapped?.[1];
}

describe("card-tier — one look per tier", () => {
  it("CTR-1 the ribbon's palette follows the tier: regular pearl, Premium gold, Featured sage", () => {
    expect(CARD_TIERS.map((tier) => cardLookOf(tier).palette)).toEqual(["pearl", "gold", "sage"]);
    expect(cardLookOf("regular").paid).toBeNull();
    expect(cardLookOf("premium").paid?.tier).toBe("premium");
    expect(cardLookOf("featured").paid?.tier).toBe("featured");
  });

  it("CTR-2 every class reads a theme token and every reference is one", () => {
    for (const tier of CARD_TIERS) {
      const look = cardLookOf(tier);
      const classes = [look.surface, look.place, look.paid?.look.word, look.paid?.look.star]
        .join(" ")
        .split(" ")
        .filter(Boolean);
      for (const utility of classes) {
        const token = tokenOf(utility);
        expect(token, `${tier}: ${utility}`).toBeDefined();
        expect(tokens.has(token ?? ""), `${tier}: ${utility} → --${token}`).toBe(true);
      }
      const flag = look.paid?.look.flag;
      for (const ref of flag === undefined ? [] : [flag.frame, flag.fold, ...flag.stops]) {
        const name = /^var\(--([\w-]+)\)$/.exec(ref)?.[1] ?? "";
        expect(tokens.has(name), `${tier}: ${ref}`).toBe(true);
      }
    }
  });

  it("CTR-3 spec §7: Premium flies a 64-unit flag with two stars, Featured a 44-unit flag with one", () => {
    expect(cardLookOf("premium").paid?.look.flag.length).toBe(64);
    expect(cardLookOf("premium").paid?.look.stars).toBe(2);
    expect(cardLookOf("featured").paid?.look.flag.length).toBe(44);
    expect(cardLookOf("featured").paid?.look.stars).toBe(1);
  });
});
