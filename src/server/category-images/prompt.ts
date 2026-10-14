/**
 * C5a — the master prompt, verbatim in code (never assembled from the console,
 * never editable by a caller beyond the appended `customPrompt` line, which the
 * console no longer sends — C5c PART C made the house prompt uniform).
 *
 * Palette lines are the ethio.com house style: #1E5A43 primary, #C98A2B accent.
 *
 * D166 — the category's names enter as quoted strings through
 * src/lib/untrusted-text.ts, and the shared rule closes the house prompt. The
 * `customPrompt` line is the one exception: it is staff's own direction (a
 * person holding categories:assets), so it is cleaned and cut but read as
 * direction; the console no longer sends it.
 */
import { cleanUntrusted, untrustedLine, withUntrustedRule } from "@/lib/untrusted-text";

export const MASTER_PROMPT = [
  "Create a single flat vector illustration icon for an online marketplace category.",
  "Subject: {SUBJECT}.",
  "Context: it belongs to the marketplace section {PARENT}.",
  "Style: flat vector, bold simple geometry, clean even line weight, no gradients,",
  "no shadows, no 3D, no photographic texture, no perspective.",
  "Palette: primary #1E5A43 (deep green), accent #C98A2B (warm gold); use only these",
  "two colours plus their tints, on a pure white background (#FFFFFF).",
  // C5g PART B — COLOUR LAW, verbatim.
  "Colour roles: the deep green #1E5A43 is the dominant colour of the main subject;",
  "the warm gold #C98A2B appears as ONE small accent element only (at most ~15% of",
  "the inked area); never alternate the two colours across similar elements; never",
  "split one object between the two colours.",
  "Composition: one centred subject filling about 85% of the square frame,",
  "generous even margins, perfectly centred, square 1:1 aspect.",
  "Absolutely no text, no letters, no numbers, no watermark, no logo, no border,",
  "no frame, no drop shadow, no background scenery.",
].join(" ");

export function buildPrompt(input: {
  nameEn: string;
  parentName?: string | null;
  customPrompt?: string | null;
}): string {
  const parent = cleanUntrusted(input.parentName, 120);
  const base = withUntrustedRule(
    MASTER_PROMPT.replace("{SUBJECT}", untrustedLine(input.nameEn, 120)).replace(
      "{PARENT}",
      parent !== "" ? untrustedLine(parent, 120) : "the marketplace root",
    ),
  );
  const extra = cleanUntrusted(input.customPrompt, 500);
  return extra === "" ? base : `${base} Additional direction: ${extra}`;
}
