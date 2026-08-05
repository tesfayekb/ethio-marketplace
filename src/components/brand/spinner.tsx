import { cn } from "@/lib/utils";

/**
 * The woven-diamond loading spinner — SELF-DRAWING (operator's choice), not
 * rotating: the diamond's outline draws itself edge by edge and loops.
 *
 * Implemented with a dash-offset sweep. The keyframes and the reduced-motion
 * rule are scoped inside this component so the spinner stays self-contained —
 * no global stylesheet edit, no extra bytes on pages that never render it.
 *
 * prefers-reduced-motion: the animation is dropped entirely and the mark HOLDS
 * fully drawn and static (never a spin, never a flash).
 *
 * The label arrives already translated (law D1: no literals in here).
 */
const DRAW_CSS = `
@keyframes ethio-draw {
  0%   { stroke-dashoffset: 80; }
  55%  { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -80; }
}
.ethio-draw { stroke-dasharray: 80; animation: ethio-draw 1.6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .ethio-draw { animation: none; stroke-dashoffset: 0; }
}
`;

export function Spinner({ label, className }: { label: string; className?: string }) {
  return (
    <span
      role="status"
      aria-live="polite"
      data-testid="spinner"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <style>{DRAW_CSS}</style>
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className="h-6 w-6">
        {/* The unlit track keeps the shape legible while the stroke sweeps. */}
        <path
          d="M16 2 30 16 16 30 2 16Z"
          className="fill-none stroke-border"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 2 30 16 16 30 2 16Z"
          data-testid="spinner-draw"
          className="ethio-draw fill-none stroke-primary"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-sm text-muted-foreground">{label}</span>
    </span>
  );
}

export default Spinner;
