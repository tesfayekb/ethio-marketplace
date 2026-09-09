/**
 * C5a — the lucide icon allowlist.
 *
 * FIX-SCAN-1 ISSUE 4 — the list itself now lives in `src/lib/category-icon-names.ts`,
 * shared with the rail, the roster and the editor, so a suggested name always
 * has a glyph and a stored name is never rendered as a generic box.
 *
 * CENSUS VERDICT (step 0b): there was NO allowlist anywhere in the repo before
 * this landing. `categories.icon` is a free-text column and the console's
 * create/edit dialogs render a plain text input (`category-create-icon`,
 * `category-edit-icon`). The suggester therefore needs a constraint of its own,
 * and this file is it: the single server-side authority the model's answer is
 * validated against. The console UI is NOT touched by C5a (that is C5b).
 */
import { CATEGORY_ICON_NAMES } from "@/lib/category-icon-names";

export const ICON_ALLOWLIST = CATEGORY_ICON_NAMES;

export type AllowedIcon = (typeof ICON_ALLOWLIST)[number];

/** The refusal-proof fallback: always a valid lucide name. */
export const FALLBACK_ICON = "Package";

const NORMALISED = new Map<string, string>(
  ICON_ALLOWLIST.map((name) => [name.toLowerCase(), name]),
);

/** Server-side validation: anything not on the list becomes the fallback. */
export function validateIcon(candidate: unknown): string {
  if (typeof candidate !== "string") return FALLBACK_ICON;
  return NORMALISED.get(candidate.trim().toLowerCase()) ?? FALLBACK_ICON;
}
