import { Badge } from "@/components/ui/badge";

/**
 * L2a-R — THE LIFTED TONE BADGE (B3).
 *
 * The categories console grew this helper locally; the locations console needs
 * the same three tones, so the markup moves HERE instead of being copied. One
 * primitive, one tone vocabulary:
 *
 *   secondary   — a live, unremarkable state (active)
 *   destructive — a state that stops something working (retired)
 *   outline     — a classification, never a state (level, catch-all)
 *
 * `data-tone` is the tone as STRUCTURE, so a test asserts the meaning and never
 * a colour class or an English word (J5).
 *
 * Bundle 11 V2 (D132) — each tone is drawn as a soft pill with its own edge:
 * a live state green, a stopping state red, a classification grey. The tone
 * names (and `data-tone`) are unchanged.
 */
const DRAWN = {
  secondary: "success",
  destructive: "danger",
  outline: "neutral",
} as const;

export function TipBadge({
  variant,
  label,
  tip,
  className,
  testid,
}: {
  variant: "secondary" | "destructive" | "outline";
  label: string;
  /** The sentence behind the word — rendered as the title and the aria label. */
  tip: string;
  className?: string;
  testid?: string;
}) {
  return (
    <Badge
      variant={DRAWN[variant]}
      className={className}
      title={tip}
      aria-label={`${label}: ${tip}`}
      data-testid={testid}
      data-tone={variant}
    >
      {label}
    </Badge>
  );
}

export default TipBadge;
