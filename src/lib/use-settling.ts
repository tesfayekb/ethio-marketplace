import { useIsFetching, useIsMutating, type QueryKey } from "@tanstack/react-query";

/**
 * Bundle 11, turn G3c (INC-558's class, G29) — TRUE WHILE A READ IS SETTLING:
 * a read under `key` is re-reading, or a write that names `key` as its
 * mutation key (the order, a whole record, a set computed from that read) is
 * still in flight.
 *
 * An admin control that sends values computed from that read — a whole
 * record, an ordered list, a set — or that opens a form seeded from it, waits
 * while this is true. Otherwise a second press (or a form opened before the
 * re-read arrived) is computed from the old read and writes it back, undoing
 * the change just made (INC-558: the listing's Edit; the census found the
 * categories' Move, the category's editor and its attributes' order and cards,
 * the attributes', countries', coverage and places' editors, the rail order,
 * Move and Reorder, and the translation editors' Save).
 * Writes that do not name the key (an image, a status) do not hold it.
 */
export function useSettling(key: QueryKey): boolean {
  const fetching = useIsFetching({ queryKey: key });
  const mutating = useIsMutating({ mutationKey: key });
  return fetching > 0 || mutating > 0;
}
