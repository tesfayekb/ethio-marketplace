import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { cardLookOf, type PaidLook, type PaidTier } from "./card-tier";
import { TIER_STAR_PATH, TierFlag, TierWord } from "./tier-flag";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));

function paid(tier: PaidTier): { tier: PaidTier; look: PaidLook } {
  const look = cardLookOf(tier).paid;
  if (look === null) throw new Error(`${tier} is not paid`);
  return look;
}

/** Sage S4 (spec §7) — the mini flag and the tier word. */
describe("TierFlag and TierWord", () => {
  it("TFL-1 the flag names its tier, is one image and keeps its own gradient id per instance", () => {
    render(
      <>
        <TierFlag {...paid("premium")} />
        <TierFlag {...paid("premium")} />
      </>,
    );
    const flags = screen.getAllByTestId("listing-card-tier");
    expect(flags).toHaveLength(2);
    const ids = flags.map((flag) => {
      expect(flag).toHaveAttribute("role", "img");
      expect(flag).toHaveAttribute("aria-label", "tier.premium");
      expect(flag).toHaveAttribute("data-tier", "premium");
      const id = flag.querySelector("linearGradient")?.getAttribute("id") ?? "";
      expect(id).toMatch(/^[a-zA-Z0-9_-]+$/);
      for (const star of flag.querySelectorAll(`path[d="${TIER_STAR_PATH}"]`))
        expect(star.getAttribute("style")).toBe(`fill: url("#${id}");`);
      return id;
    });
    expect(new Set(ids).size).toBe(2);
  });

  it("TFL-2 every colour in the drawing is a token: stops, fold, body and frame", () => {
    render(<TierFlag {...paid("featured")} />);
    const flag = screen.getByTestId("listing-card-tier");
    const stops = [...flag.querySelectorAll("stop")].map((stop) => stop.getAttribute("style"));
    expect(stops).toEqual([
      "stop-color: var(--flag-featured-1);",
      "stop-color: var(--flag-featured-2);",
      "stop-color: var(--flag-featured-3);",
    ]);
    const [fold, body] = [...flag.querySelectorAll("path")];
    expect(fold?.getAttribute("style")).toBe("fill: var(--tier-featured-fold);");
    expect(body?.getAttribute("style")).toBe(
      "fill: var(--flag-body); stroke: var(--tier-featured-frame);",
    );
    expect(flag.getAttribute("style")).toContain("drop-shadow(0 2px 2px var(--flag-shade))");
    for (const node of flag.querySelectorAll("*"))
      for (const name of ["fill", "stroke", "stop-color"])
        expect(node.getAttribute(name), `${node.tagName} ${name}`).toBeNull();
  });

  it("TFL-3 Premium's body is 64 units long with two stars; Featured's 44 with one", () => {
    const { unmount } = render(<TierFlag {...paid("premium")} />);
    let flag = screen.getByTestId("listing-card-tier");
    expect(flag.querySelectorAll("path")[1]?.getAttribute("d")).toBe(
      "M0 16 L64 16 L52 36 L64 56 L0 56 Z",
    );
    expect(flag.querySelectorAll(`path[d="${TIER_STAR_PATH}"]`)).toHaveLength(2);
    unmount();
    render(<TierFlag {...paid("featured")} />);
    flag = screen.getByTestId("listing-card-tier");
    expect(flag.querySelectorAll("path")[1]?.getAttribute("d")).toBe(
      "M0 16 L44 16 L32 36 L44 56 L0 56 Z",
    );
    expect(flag.querySelectorAll(`path[d="${TIER_STAR_PATH}"]`)).toHaveLength(1);
  });

  it("TFL-4 the word is the tier's name with its stars, silent to a screen reader (the flag speaks)", () => {
    const { unmount } = render(<TierWord {...paid("premium")} className="basis-full" />);
    const word = screen.getByTestId("listing-card-tier-word");
    expect(word).toHaveAttribute("aria-hidden", "true");
    expect(word).toHaveTextContent("tier.premium");
    const classes = word.className.split(" ");
    for (const c of [
      "uppercase",
      "font-extrabold",
      "tracking-[0.6px]",
      "text-[9px]",
      "md:@max-[11rem]:text-[10px]",
      "@min-[11rem]:text-[11px]",
      "text-tier-premium-ink",
      "basis-full",
    ])
      expect(classes).toContain(c);
    expect(word.querySelectorAll("svg")).toHaveLength(2);
    expect(word.firstElementChild?.className).toContain("text-tier-premium-star");
    unmount();
    render(<TierWord {...paid("featured")} />);
    expect(screen.getByTestId("listing-card-tier-word").querySelectorAll("svg")).toHaveLength(1);
  });
});
