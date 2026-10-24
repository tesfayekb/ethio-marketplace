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

/**
 * INC-792 — AN IMPORT PREVIEW HONOURS THE DOOR'S BUDGET.
 *
 * The import route allows 30 previews a minute per user and family through
 * the family's registry dial (src/lib/dials.ts `import<Family>`, counted by
 * `consume_rate_limit` in clock-aligned 60 s windows, shared by every server);
 * a spec on one pooled identity can send more in under a minute on a fast
 * backend. The budget is never raised for a test (G38): the test waits it out
 * as a person would; the 65 s poll outlasts one window. A re-sent refused
 * preview costs nothing — the door refuses it before the plan.
 *
 * Sends once; any answer but a 429 `rateLimited` returns at once. On that
 * answer the test's own budget grows by 70 s (the wait's named cause) and the
 * same request is sent again every 5 s, at most 65 s, until another answer
 * comes; the last answer is returned.
 */
export async function withinPreviewBudget<
  T extends { status: number; payload: Record<string, unknown> },
>(send: () => Promise<T>, tag: string): Promise<T> {
  let answer = await send();
  const refused = (value: T) => value.status === 429 && value.payload["error"] === "rateLimited";
  if (!refused(answer)) return answer;
  const info = test.info();
  if (info.timeout > 0) info.setTimeout(info.timeout + 70_000);
  await expect
    .poll(
      async () => {
        answer = await send();
        return refused(answer);
      },
      {
        message: `${tag}: the import door's preview budget never freed`,
        timeout: 65_000,
        intervals: [5_000],
      },
    )
    .toBe(false);
  return answer;
}
