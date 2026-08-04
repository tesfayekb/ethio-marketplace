import { cn } from "@/lib/utils";

/**
 * The woven-diamond loading spinner. Same motif as the logo, rotating.
 * Pure SVG + CSS — no image, no extra bytes over the wire.
 *
 * prefers-reduced-motion: the rotation is replaced by a gentle opacity pulse
 * (motion-safe / motion-reduce variants), never a hard spin.
 *
 * The label is supplied by the caller as an already-translated string (law D1:
 * this component never holds a literal).
 */
export function Spinner({ label, className }: { label: string; className?: string }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="h-6 w-6 motion-safe:animate-spin motion-reduce:animate-pulse"
      >
        <path
          d="M16 2 30 16 16 30 2 16Z"
          className="fill-none stroke-border"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 2 30 16"
          className="fill-none stroke-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M16 12.5 19.5 16 16 19.5 12.5 16Z" className="fill-gold" />
      </svg>
      <span className="text-sm text-muted-foreground">{label}</span>
    </span>
  );
}

export default Spinner;
