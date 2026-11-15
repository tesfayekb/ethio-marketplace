/**
 * DOORS-6 (F1-4b, ruling 1 item 5) — THE MIGRATION TREE IS READ ONCE PER PROCESS FOR A GIVEN ROOT.
 * Every reader of check-doors that walks `supabase/migrations/` (the catalogue's rows, the tree's
 * callers, the declared columns) keeps its answer here, so DOORS-4, DOORS-6, `staticFindings`,
 * `liveFindings` and the checking script share one read; the tree only grows, and a run that read
 * it four times outgrew the default test time limit twice. A caller that changes a root between two
 * reads asks for a fresh read with `{ fresh: true }`; nothing reads a stale tree silently. The
 * answer is never mutated by its callers.
 */
const kept = new Map<string, unknown>();

export type OnceOptions = { fresh?: boolean };

export function readOnce<T>(
  kind: string,
  root: string,
  read: () => T,
  options: OnceOptions = {},
): T {
  const key = `${kind}\u0000${root}`;
  if (options.fresh !== true && kept.has(key)) return kept.get(key) as T;
  const answer = read();
  kept.set(key, answer);
  return answer;
}
