import type { MessageKey } from "@/i18n";

import { errorText } from "./error-text";
import { ownValue } from "./own-key";
import { splitRefusal } from "./refusal";

/**
 * F1-6b (ruling 2, decision 1) — THE LINE A `badValue:<field>` REFUSAL DRAWS,
 * by its detail: the one code names many fields, and the reader's words
 * (`readRefusal`, `src/lib/refusal.ts`) are by code alone. Null for any other
 * refusal and for a field with no words of its own (the family's generic line
 * follows through `readRefusal`). The split is the reader's (`splitRefusal`).
 *
 * It holds no string and imports only the reader's shapes, so it carries no
 * layer's key: only the pages whose readers import it pay for it. It lives
 * here, not in a console's file or in `refusal-tail.ts`, because one of its
 * readers (`admin-listings/edit-listing.ts`) rides the posting wizard on
 * member routes (CF-SL-1, DEC-258).
 */
export function badValueWords(
  refusal: unknown,
  badValues: Readonly<Record<string, MessageKey>>,
): MessageKey | null {
  const { key, tail } = splitRefusal(errorText(refusal).trim());
  if (key !== "badValue" || tail === undefined) return null;
  return ownValue(badValues, tail) ?? null;
}
