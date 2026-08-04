import { cn } from "@/lib/utils";

/**
 * The ethio.com brand mark: a tibeb-inspired woven diamond — a diamond within a
 * diamond, green outer, gold inner. PURE GEOMETRY.
 *
 * HARD RULE (docs/features/panels.md): the motif carries no cross and no
 * religious iconography of any tradition. It must stay religiously neutral.
 *
 * TRADEMARK: this is a WORKING mark. It has NOT been through professional
 * trademark clearance; clearance is a launch-gate item and must happen before
 * commercial use. Do not represent it as cleared.
 */
export function WovenMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("h-7 w-7", className)}
    >
      {/* Outer woven diamond */}
      <path
        d="M16 2 30 16 16 30 2 16Z"
        className="fill-none stroke-primary"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      {/* Lattice cross-weave (two chevrons, no intersecting bars) */}
      <path
        d="M8 16 16 8 24 16"
        className="fill-none stroke-primary"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M8 16 16 24 24 16"
        className="fill-none stroke-primary"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Inner gold diamond — one of only TWO sanctioned gold placements. */}
      <path d="M16 11.5 20.5 16 16 20.5 11.5 16Z" className="fill-gold" />
    </svg>
  );
}

/** The sub-line letters. Brand typography, not user-facing copy. */
const SUBLINE = "MARKETPLACE".split("");

/**
 * The two-line lockup.
 *
 * FIT RULE: "MARKETPLACE" must render EXACTLY as wide as "ethio.com" above it —
 * not wider, not narrower — at every logo size.
 *
 * How the fit is exact rather than hand-tuned: the lockup is a flex COLUMN, so
 * both lines share one measured width — the width of the wider line, which is
 * always the wordmark (the sub-line is set small enough that its natural width
 * is shorter). The sub-line is then a flex ROW of individual letters with
 * `justify-between`, so the browser distributes the leftover space as tracking
 * and the row fills the column edge-to-edge. Scale the wordmark and the
 * tracking recomputes itself; no magic letter-spacing constant exists to drift.
 */
function Lockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        data-testid="logo-wordmark"
        className="font-display text-xl font-semibold tracking-tight"
      >
        <span className="text-primary">ethio</span>
        <span className="text-gold">.</span>
        <span className="text-primary">com</span>
      </span>
      <span
        aria-hidden="true"
        data-testid="logo-subline"
        className="mt-1 flex w-full justify-between text-[0.6875rem] font-medium uppercase text-muted-foreground"
      >
        {SUBLINE.map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </span>
    </span>
  );
}

export function Logo({
  variant = "full",
  className,
}: {
  /** "icon" = the woven diamond alone (collapsed rail); "full" = mark + lockup. */
  variant?: "icon" | "full";
  className?: string;
}) {
  if (variant === "icon") {
    return <WovenMark className={cn("h-7 w-7", className)} />;
  }
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <WovenMark className="h-8 w-8 shrink-0" />
      <Lockup />
    </span>
  );
}

export default Logo;
