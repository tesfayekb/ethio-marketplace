/**
 * INC-452 — a list read is never silently cut at the server's row cap.
 *
 * The data API answers at most PAGE_ROWS rows per request; a reader that asks
 * once sees only the first page and drops the rest without an error. This
 * walks pages in a stable order until a short page arrives. A failed page
 * throws (F4: no phantom success).
 */
export const PAGE_ROWS = 1000;

export async function readAllPages<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
  pageRows: number = PAGE_ROWS,
): Promise<T[]> {
  const all: T[] = [];
  for (let from = 0; ; from += pageRows) {
    const { data, error } = await fetchPage(from, from + pageRows - 1);
    if (error) throw error;
    const page = data ?? [];
    all.push(...page);
    if (page.length < pageRows) return all;
  }
}
