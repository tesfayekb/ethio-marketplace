import { useId, type CSSProperties } from "react";

import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import type { PaidLook, PaidTier } from "./card-tier";

/**
 * Sage S4 (spec §7; ruling 1) — THE MINI FLAG AND THE TIER WORD, drawn here only, from the
 * tier's look (card-tier.ts). The flag is a small SVG on the picture's top-start corner: a white
 * body with a notched tail framed in the tier colour, its fold just past the card's edge, and
 * its stars filled from three token stops; it carries the tier word as its accessible name. Its
 * drawing is in the picture's 400 × 300 units, a quarter of a cqw each, scaled ×1.6 on a phone
 * card, ×1.25 on a compact tablet card and ×1 on a wider one. This module rides only the pages
 * that draw cards (CF-TIER-3 reads TIER_STAR_PATH in the build).
 */
export const TIER_STAR_PATH =
  "M11 0l3.2 6.6 7.3 1-5.3 5.1 1.3 7.2L11 16.5 4.5 19.9l1.3-7.2L.5 7.6l7.3-1z";
const STAR_X = [9, 29];
/** The drawing's box, in picture units: x −9 to 67, y 12 to 64. */
const VIEW = { x: -9, y: 12, width: 76, height: 52 };
const UNIT = 0.25;

const FLAG_STYLE: CSSProperties = {
  insetInlineStart: `calc(var(--flag-scale) * ${VIEW.x * UNIT}cqw)`,
  top: `calc(var(--flag-scale) * ${VIEW.y * UNIT}cqw)`,
  width: `calc(var(--flag-scale) * ${VIEW.width * UNIT}cqw)`,
  height: `calc(var(--flag-scale) * ${VIEW.height * UNIT}cqw)`,
  filter: "drop-shadow(0 2px 2px var(--flag-shade))",
};
const FLAG_CLASS =
  "pointer-events-none absolute [--flag-scale:1.6] rtl:-scale-x-100 md:@max-[11rem]:[--flag-scale:1.25] @min-[11rem]:[--flag-scale:1]";
/** Sage S5 (spec §12) — on the ad page's main photo: ×1.15 on a phone's photo, ×0.72 from 32rem. */
const PHOTO_FLAG_CLASS =
  "pointer-events-none absolute z-10 [--flag-scale:1.15] rtl:-scale-x-100 @min-[32rem]:[--flag-scale:0.72]";

function useTierName(tier: PaidTier): string {
  const { t } = useI18n();
  return tier === "premium" ? t("tier.premium") : t("tier.featured");
}

/**
 * The flag, absolutely placed: its parent is the picture's own box, inside the card's container
 * (`on="card"`), or the ad page's main photo box, its own container (`on="photo"`).
 */
export function TierFlag({
  tier,
  look,
  on = "card",
}: {
  tier: PaidTier;
  look: PaidLook;
  on?: "card" | "photo";
}) {
  const name = useTierName(tier);
  const fill = `tier-stars-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { length, frame, fold, stops } = look.flag;
  return (
    <svg
      data-testid={on === "photo" ? "listing-detail-tier" : "listing-card-tier"}
      data-tier={tier}
      role="img"
      aria-label={name}
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}
      overflow="visible"
      className={on === "photo" ? PHOTO_FLAG_CLASS : FLAG_CLASS}
      style={FLAG_STYLE}
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="1" y2="1">
          {stops.map((stop, index) => (
            <stop key={stop} offset={index / 2} style={{ stopColor: stop }} />
          ))}
        </linearGradient>
      </defs>
      <path d="M0 16 L-7 21 L-7 61 L0 56 Z" style={{ fill: fold }} />
      <path
        d={`M0 16 L${length} 16 L${length - 12} 36 L${length} 56 L0 56 Z`}
        strokeWidth={2.2}
        strokeLinejoin="round"
        style={{ fill: "var(--flag-body)", stroke: frame }}
      />
      {STAR_X.slice(0, look.stars).map((x) => (
        <path
          key={x}
          d={TIER_STAR_PATH}
          transform={`translate(${x} 27.5) scale(0.82)`}
          style={{ fill: `url(#${fill})` }}
        />
      ))}
    </svg>
  );
}

/** The tier word beside the place, its stars before it; the flag speaks for it. */
export function TierWord({
  tier,
  look,
  className,
}: {
  tier: PaidTier;
  look: PaidLook;
  className?: string;
}) {
  const name = useTierName(tier);
  return (
    <span
      data-testid="listing-card-tier-word"
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 text-[9px] leading-4 font-extrabold tracking-[0.6px] uppercase md:@max-[11rem]:text-[10px] @min-[11rem]:text-[11px]",
        look.word,
        className,
      )}
    >
      <TierStars look={look} />
      {name}
    </span>
  );
}

/**
 * Sage S5 (spec §12) — the ad page's tier tag above the title: the tier word and its stars in a
 * white pill ringed in the tier colour; the photo's flag speaks for it.
 */
export function TierTag({ tier, look }: { tier: PaidTier; look: PaidLook }) {
  const name = useTierName(tier);
  return (
    <span
      data-testid="listing-detail-tier-tag"
      data-tier={tier}
      aria-hidden="true"
      className={cn(
        "inline-flex items-center gap-1 self-start rounded-full bg-card px-2.5 py-0.5 text-xs leading-5 font-extrabold tracking-[0.6px] uppercase ring-1 ring-inset",
        look.word,
        look.ring,
      )}
    >
      <TierStars look={look} />
      {name}
    </span>
  );
}

function TierStars({ look }: { look: PaidLook }) {
  return (
    <span className={cn("inline-flex", look.star)}>
      {STAR_X.slice(0, look.stars).map((x) => (
        <svg key={x} viewBox="0 0 22 21" className="size-[1em]">
          <path d={TIER_STAR_PATH} fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}
