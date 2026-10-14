import { expect, test } from "../fixtures";

/**
 * INC-572 / INC-617 — A BURST STAYS IN ONE WINDOW.
 *
 * `consume_rate_limit` counts in fixed windows floored to the epoch
 * (`floor(epoch / window) * window`, supabase/migrations/20260917000149_…):
 * an hour's window begins on the clock hour, a day's at 00:00 UTC. A test that
 * spends a dial and then expects the next call refused must make every call in
 * ONE window; a burst that crosses the edge starts a fresh count, and the call
 * that should be refused is allowed (PR-33 on 2026-10-12, PR-9 on 2026-10-14).
 *
 * Called just before the first counted call: when fewer than `needMs` remain
 * in the current window by this machine's clock, it waits until the next
 * window has begun, and the test's own budget grows by that wait (its named
 * cause — G38). Otherwise it returns at once.
 */
export async function inOneWindow(
  windowSeconds: number,
  needMs: number,
  tag: string,
): Promise<void> {
  const windowMs = windowSeconds * 1000;
  const left = windowMs - (Date.now() % windowMs);
  if (left >= needMs) return;
  const info = test.info();
  if (info.timeout > 0) info.setTimeout(info.timeout + left + 5_000);
  await expect
    .poll(() => windowMs - (Date.now() % windowMs), {
      message: `${tag}: the next ${windowSeconds}-second window did not begin`,
      timeout: left + 5_000,
      intervals: [1_000],
    })
    .toBeGreaterThanOrEqual(needMs);
}
