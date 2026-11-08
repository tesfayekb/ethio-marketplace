import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { cardLookOf, type BadgeLook } from "./card-tier";
import { TIER_STAR_PATH, TierFlag, TierTag, TierWord } from "./tier-flag";

/** P-2 (c) c2a — a badged look on a frame, with a level row's key and name (no level by name). */
function badged(placement: "top" | "boost" | "standard"): {
  levelKey: string;
  name: string;
  look: BadgeLook;
} {
  const look = cardLookOf({ placement, badge: true }).badge;
  if (look === null) throw new Error(`${placement} carries no badge`);
  return { levelKey: `lvl-${placement}`, name: `Level ${placement}`, look };
}
const wordOf = (placement: "top" | "boost") => {
  const { name, look } = badged(placement);
  return { name, look };
};

/** Sage S4 (spec §7) — the mini flag and the tier word. */
describe("TierFlag and TierWord", () => {
  it("TFL-1 the flag names its level (the row's name and key), is one image and keeps its own gradient id per instance", () => {
    render(
      <>
        <TierFlag {...badged("top")} />
        <TierFlag {...badged("top")} />
      </>,
    );
    const flags = screen.getAllByTestId("listing-card-tier");
    expect(flags).toHaveLength(2);
    const ids = flags.map((flag) => {
      expect(flag).toHaveAttribute("role", "img");
      expect(flag).toHaveAttribute("aria-label", "Level top");
      expect(flag).toHaveAttribute("data-tier", "lvl-top");
      const id = flag.querySelector("linearGradient")?.getAttribute("id") ?? "";
      expect(id).toMatch(/^[a-zA-Z0-9_-]+$/);
      for (const star of flag.querySelectorAll(`path[d="${TIER_STAR_PATH}"]`))
        expect(star.getAttribute("style")).toBe(`fill: url("#${id}");`);
      return id;
    });
    expect(new Set(ids).size).toBe(2);
  });

  it("TFL-2 every colour in the drawing is a token: stops, fold, body and frame", () => {
    render(<TierFlag {...badged("boost")} />);
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

  it("TFL-3 the gold frame's body is 64 units long with two stars; the green's 44 with one", () => {
    const { unmount } = render(<TierFlag {...badged("top")} />);
    let flag = screen.getByTestId("listing-card-tier");
    expect(flag.querySelectorAll("path")[1]?.getAttribute("d")).toBe(
      "M0 16 L64 16 L52 36 L64 56 L0 56 Z",
    );
    expect(flag.querySelectorAll(`path[d="${TIER_STAR_PATH}"]`)).toHaveLength(2);
    unmount();
    render(<TierFlag {...badged("boost")} />);
    flag = screen.getByTestId("listing-card-tier");
    expect(flag.querySelectorAll("path")[1]?.getAttribute("d")).toBe(
      "M0 16 L44 16 L32 36 L44 56 L0 56 Z",
    );
    expect(flag.querySelectorAll(`path[d="${TIER_STAR_PATH}"]`)).toHaveLength(1);
  });

  it("TFL-4 the word is the level's name with its stars, silent to a screen reader (the flag speaks)", () => {
    const { unmount } = render(<TierWord {...wordOf("top")} className="basis-full" />);
    const word = screen.getByTestId("listing-card-tier-word");
    expect(word).toHaveAttribute("aria-hidden", "true");
    expect(word).toHaveTextContent("Level top");
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
    render(<TierWord {...wordOf("boost")} />);
    expect(screen.getByTestId("listing-card-tier-word").querySelectorAll("svg")).toHaveLength(1);
  });

  it("TFL-5 on the ad page's photo the flag keeps its drawing and name, ×1.15 then ×0.72 from 32rem (S5)", () => {
    render(<TierFlag {...badged("top")} on="photo" />);
    expect(screen.queryByTestId("listing-card-tier")).toBeNull();
    const flag = screen.getByTestId("listing-detail-tier");
    expect(flag).toHaveAttribute("role", "img");
    expect(flag).toHaveAttribute("aria-label", "Level top");
    expect(flag).toHaveAttribute("data-tier", "lvl-top");
    const classes = flag.getAttribute("class")?.split(/\s+/) ?? [];
    for (const c of ["[--flag-scale:1.15]", "@min-[32rem]:[--flag-scale:0.72]", "rtl:-scale-x-100"])
      expect(classes).toContain(c);
    expect(classes).not.toContain("[--flag-scale:1.6]");
    expect(flag.querySelectorAll(`path[d="${TIER_STAR_PATH}"]`)).toHaveLength(2);
  });

  it("TFL-6 the tier tag is the word and its stars in a pill ringed in the tier colour, silent (S5)", () => {
    const { unmount } = render(<TierTag {...badged("top")} />);
    const tag = screen.getByTestId("listing-detail-tier-tag");
    expect(tag).toHaveAttribute("aria-hidden", "true");
    expect(tag).toHaveAttribute("data-tier", "lvl-top");
    expect(tag).toHaveTextContent("Level top");
    const classes = tag.getAttribute("class")?.split(/\s+/) ?? [];
    for (const c of [
      "bg-card",
      "rounded-full",
      "text-xs",
      "font-extrabold",
      "uppercase",
      "ring-1",
      "text-tier-premium-ink",
      "ring-tier-premium-ring",
    ])
      expect(classes).toContain(c);
    expect(tag.querySelectorAll("svg")).toHaveLength(2);
    expect(tag.firstElementChild?.className).toContain("text-tier-premium-star");
    unmount();
    render(<TierTag {...badged("boost")} />);
    const featured = screen.getByTestId("listing-detail-tier-tag");
    expect(featured.getAttribute("class")).toContain("ring-tier-featured-ring");
    expect(featured.getAttribute("class")).toContain("text-tier-featured-ink");
    expect(featured.querySelectorAll("svg")).toHaveLength(1);
  });
});
