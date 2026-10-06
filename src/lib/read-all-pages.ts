/**
 * INC-452 — a list read is never silently cut at the server's row cap, and a
 * page is asked for by KEY, never by position.
 *
 * The data API answers at most PAGE_ROWS rows per request; a reader that asks
 * once sees only the first page and drops the rest without an error. This
 * walks pages ordered by a unique key: each next page is asked for after the
 * last key it already has, so another writer moving the list between two
 * requests can neither repeat nor drop a row that was there throughout. It
 * ends on a short page. A failed page throws (F4: no phantom success); a page
 * that makes no progress throws (never an endless loop).
 */
export const PAGE_ROWS = 1000;

export async function readAllPages<T>(
  fetchPage: (
    after: string | null,
    limit: number,
  ) => PromiseLike<{ data: T[] | null; error: unknown }>,
  keyOf: (row: T) => string,
  pageRows: number = PAGE_ROWS,
): Promise<T[]> {
  const all: T[] = [];
  let after: string | null = null;
  for (;;) {
    const { data, error } = await fetchPage(after, pageRows);
    if (error) throw error;
    const page = data ?? [];
    all.push(...page);
    if (page.length < pageRows) return all;
    const last = keyOf(page[page.length - 1] as T);
    if (last === after) {
      throw new Error(`readAllPages: no progress after key ${String(after)}`);
    }
    after = last;
  }
}
