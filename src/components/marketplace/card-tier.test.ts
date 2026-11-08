import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { MODE_FREE_TOKENS, MODED_TOKENS } from "@/lib/schemas/theme";

import { adPageLookOf, CARD_LOOKS, cardLookOf, placementOf, tierOf } from "./card-tier";

/**
 * Sage S4 (spec §7, §8) — the look mechanism's data: one look per placement and badge, every
 * class a utility the stylesheet maps to a theme token and every reference a theme token.
 * P-2 (c) c2a (DEC-351 §8) — the look is the level's two axes; no level is named.
 */
const css = readFileSync(resolve(__dirname, "../../styles.css"), "utf8");
const themeBlock = css.slice(
  css.indexOf("@theme inline"),
  css.indexOf("\n}", css.indexOf("@theme inline")),
);
const tokens = new Set<string>([...MODED_TOKENS, ...MODE_FREE_TOKENS]);

/** The theme token a utility like `bg-tier-premium` or `shadow-premium` reads. */
function tokenOf(utility: string): string | undefined {
  const m = /^(?:bg|text|border|shadow|ring)-(.+)$/.exec(utility);
  if (m?.[1] === undefined) return undefined;
  const kind = utility.startsWith("shadow-") ? "shadow" : "color";
  const mapped = new RegExp(`--${kind}-${m[1]}:\\s*var\\(\\s*--([\\w-]+)\\s*\\)`).exec(themeBlock);
  return mapped?.[1];
}

const look = (placement: string | null, badge: boolean | null) => ({ placement, badge });

describe("card-tier — one look per placement and badge", () => {
  it("CTR-1 placement picks the frame and its ribbon palette; the badge alone adds the flag (all six)", () => {
    expect(CARD_LOOKS.map(({ id }) => id)).toEqual([
      "standard",
      "standard-badge",
      "boost",
      "boost-badge",
      "top",
      "top-badge",
    ]);
    expect(CARD_LOOKS.map(({ look: l }) => cardLookOf(l).palette)).toEqual([
      "pearl",
      "pearl",
      "sage",
      "sage",
      "gold",
      "gold",
    ]);
    expect(CARD_LOOKS.map(({ look: l }) => cardLookOf(l).badge !== null)).toEqual([
      false,
      true,
      false,
      true,
      false,
      true,
    ]);
    // The frame does not depend on the badge, nor the badge's colours on anything but the frame.
    for (const placement of ["standard", "boost", "top"]) {
      const { badge: _plain, ...frame } = cardLookOf(look(placement, false));
      const { badge, ...same } = cardLookOf(look(placement, true));
      expect(same).toEqual(frame);
      expect(badge).not.toBeNull();
    }
    expect(cardLookOf(look("standard", true)).badge).toEqual(cardLookOf(look("boost", true)).badge);
  });

  it("CTR-1b a NULL or unknown placement is the plain frame; a NULL badge is no flag", () => {
    const plain = cardLookOf(look("standard", false));
    expect(cardLookOf(look(null, null))).toEqual(plain);
    expect(cardLookOf(look("spotlight", false))).toEqual(plain);
    expect(cardLookOf(look("top", null)).badge).toBeNull();
    expect(placementOf(look("Top", null))).toBe("standard");
  });

  it("CTR-2 every class reads a theme token and every reference is one", () => {
    for (const { id, look: l } of CARD_LOOKS) {
      const card = cardLookOf(l);
      const classes = [card.surface, card.place, card.badge?.word, card.badge?.star]
        .join(" ")
        .split(" ")
        .filter(Boolean);
      for (const utility of classes) {
        const token = tokenOf(utility);
        expect(token, `${id}: ${utility}`).toBeDefined();
        expect(tokens.has(token ?? ""), `${id}: ${utility} → --${token}`).toBe(true);
      }
      const flag = card.badge?.flag;
      for (const ref of flag === undefined ? [] : [flag.frame, flag.fold, ...flag.stops]) {
        const name = /^var\(--([\w-]+)\)$/.exec(ref)?.[1] ?? "";
        expect(tokens.has(name), `${id}: ${ref}`).toBe(true);
      }
    }
  });

  it("CTR-3 spec §7: the gold frame flies a 64-unit flag with two stars, the others a 44-unit flag with one", () => {
    expect(cardLookOf(look("top", true)).badge?.flag.length).toBe(64);
    expect(cardLookOf(look("top", true)).badge?.stars).toBe(2);
    for (const placement of ["boost", "standard"]) {
      expect(cardLookOf(look(placement, true)).badge?.flag.length).toBe(44);
      expect(cardLookOf(look(placement, true)).badge?.stars).toBe(1);
    }
  });

  it("CTR-5 the ad page's look: free and unknown alike; the gold frame gold accents; the green the site green; every colour a token (S5)", () => {
    expect(adPageLookOf(null)).toEqual(adPageLookOf(look("standard", false)));
    expect(adPageLookOf(look(null, null))).toEqual(adPageLookOf(null));
    const free = adPageLookOf(null);
    expect([free.titleBox, free.box, free.tab, free.contact, free.negotiable]).toEqual([
      "",
      "",
      "",
      "",
      "",
    ]);
    expect(free.ink).toBe("text-primary");
    const top = adPageLookOf(look("top", true));
    expect(top).toEqual(adPageLookOf(look("top", false)));
    expect(top.titleBox).toBe(cardLookOf(look("top", true)).surface);
    expect(top.box).toBe("shadow-premium");
    expect(top.contact).toContain("bg-gold text-gold-foreground shadow-contact-premium");
    expect(top.ink).toBe("text-tier-premium-ink");
    const boost = adPageLookOf(look("boost", true));
    expect(boost.titleBox).toBe(cardLookOf(look("boost", true)).surface);
    expect(boost.box).toBe("shadow-featured");
    expect([boost.ink, boost.contact, boost.tab]).toEqual([free.ink, "", ""]);
    for (const { id, look: l } of CARD_LOOKS) {
      const page = adPageLookOf(l);
      expect(page.palette).toBe(cardLookOf(l).palette);
      const classes = Object.entries(page)
        .filter(([key]) => key !== "palette")
        .flatMap(([, value]) => String(value).split(" "))
        .filter((utility) => utility !== "" && !/^ring-(?:1|inset)$/.test(utility))
        .map((utility) => utility.replace(/^hover:/, "").replace(/\/\d+$/, ""));
      for (const utility of classes) {
        const token = tokenOf(utility);
        expect(token, `${id}: ${utility}`).toBeDefined();
        expect(tokens.has(token ?? ""), `${id}: ${utility} → --${token}`).toBe(true);
      }
    }
    const rings = ["boost", "top"].map((p) => cardLookOf(look(p, true)).badge?.ring);
    expect(rings).toEqual(["ring-tier-featured-ring", "ring-tier-premium-ring"]);
  });

  it("CTR-4 tierOf takes any level key and answers null for anything that is not one (S5 ruling 1; c2a: levels are rows)", () => {
    for (const key of ["lvl-a", "spotlight", "Top"]) expect(tierOf(key)).toBe(key);
    for (const other of ["", null, undefined, 1, {}]) {
      expect(tierOf(other), String(other)).toBeNull();
    }
  });
});
