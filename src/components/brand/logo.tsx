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
      {/* Inner gold diamond */}
      <path d="M16 11.5 20.5 16 16 20.5 11.5 16Z" className="fill-accent" />
    </svg>
  );
}

export function Logo({
  variant = "full",
  className,
}: {
  /** "mark" = the woven diamond alone; "full" = mark + wordmark. */
  variant?: "mark" | "full";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <WovenMark />
      {variant === "full" ? (
        <span className="font-display text-lg font-semibold tracking-tight">
          <span className="text-primary">ethio</span>
          <span className="text-muted-foreground">.com</span>
        </span>
      ) : null}
    </span>
  );
}

export default Logo;
