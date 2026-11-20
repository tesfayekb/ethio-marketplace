import { splitRefusal } from "@/lib/refusal";

/**
 * F1-7d (INC-1224) — `feed_page` and `seller_feed_page` raise `<function>: <code>` (P0001), not
 * the door law's `code[:detail]`. Their refusals are read through the one reader twice: the outer
 * key is the function's name, the code is the inner key of the trimmed tail. Null when the
 * message is not that function's refusal.
 */
export function functionRefusalCode(message: string, fn: string): string | null {
  const outer = splitRefusal(message.trim());
  if (outer.key !== fn || outer.tail === undefined) return null;
  const code = splitRefusal(outer.tail.trim()).key;
  return code === "" ? null : code;
}
