import type { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";

/**
 * INC-579 (bundle 13 turn 13) — AFTER A WRITE, A NEW READ.
 *
 * TanStack Query hands a refetch the read that is already in flight when the
 * query holds no data yet: "If a fetch is already in flight, returns its
 * promise instead of starting a new one, unless `fetchOptions.cancelRefetch`
 * is set and the query already has data" (@tanstack/query-core 5.104.1,
 * build/modern/query.js, `fetch`). So when a write settles while a screen's
 * FIRST read is still on its way — a console opened and used at once — an
 * invalidation keeps that first read, whose answer may have been taken before
 * the write; the written row stays missing until the next read (a 30-second
 * staleTime, or a reload). The catalogue console's `[roster-dump]` showed it
 * twice (2026-10-14): no read in flight, the roster held, the new row in the
 * database and not on the page, 21 s after the create.
 *
 * Cancelling the reads in flight first makes the invalidation start a new read
 * after the write, whether the query had data or not. Every invalidation in
 * the app goes through here; RAW-3 (refresh-after-write.test.ts) fails on any
 * other call.
 */
export async function refreshAfterWrite(
  queryClient: QueryClient,
  filters: InvalidateQueryFilters,
): Promise<void> {
  await queryClient.cancelQueries(filters);
  await queryClient.invalidateQueries(filters);
}
