import type { RouteContext } from "@/server/route";
import { aiCall } from "@/server/ai/gateway";
import { logRouteError } from "@/server/supabase/user-client";

/**
 * N1b-1 (INC-977, concern B) — THE SELLER-NAME CATCH-UP. Runs only after the
 * jobs route verified the signature and claimed the run (src/server/jobs/route.ts).
 *
 *   1  the pause (the circuit breaker's stored reason) → 'paused', nothing asked
 *   2  the lease (single-flight; held longer than a run) → 'busy' when taken
 *   3  the batch: at most BATCH unchecked names, LEAST RECENTLY TRIED FIRST
 *      (never tried first), then the oldest `since` — so a few names that keep
 *      failing never block the rest (stop 7 ruling 1)
 *   4  each name through aiCall("name_check") — the gateway's switch and budget
 *      answer first (gate: true), so a switched-off or spent feature ends the
 *      run with its reason and marks nothing; an answer is marked through the
 *      service-only name_check_mark for the exact text asked; a failed call is
 *      'unavailable' (attempts + 1, state unchanged, A3)
 *   5  402 → pause 'credits'; 403 → pause 'policy'; a second 429 → 'rate_limit'
 *   6  no new name starts after STOP_NEW_AFTER_MS (M6: pg_net waits 60 s)
 *   7  the lease is released and job_run_finish writes the counts once
 *
 * The answer is counts only: pg_net's response table is readable at the SQL
 * level (INC-981), so no name or model text ever leaves in it.
 */
export const JOB = "name-check-catchup";
export const BATCH = 20;
export const STOP_NEW_AFTER_MS = 40_000;
export const LEASE_SECONDS = 120;
const PATH = "/api/public/jobs/name-check-catchup";

export type RunOutcome = "ok" | "busy" | "paused" | "switch_off" | "budget_spent" | "failed";
export type RunCounts = { asked: number; clean: number; imitates: number; unavailable: number };
export type RunResult = { outcome: RunOutcome; reason: string | null } & RunCounts;

type Admin = Awaited<ReturnType<RouteContext["service"]>>;
type PauseReason = "credits" | "policy" | "rate_limit";

export async function runNameCheckCatchup(
  admin: Admin,
  run: string,
  deps: { now?: () => number; holder?: string } = {},
): Promise<RunResult> {
  const now = deps.now ?? Date.now;
  const started = now();
  const counts: RunCounts = { asked: 0, clean: 0, imitates: 0, unavailable: 0 };
  let outcome: RunOutcome = "ok";
  let reason: string | null = null;
  let leased = false;
  const holder = deps.holder ?? crypto.randomUUID();

  try {
    const pause = await admin.rpc("job_pause_read", { p_job: JOB });
    if (pause.error) throw new Error(`job_pause_read: ${pause.error.message}`);
    const paused = pause.data as { paused?: unknown; reason?: unknown } | null;
    if (paused?.paused === true) {
      outcome = "paused";
      reason = typeof paused.reason === "string" ? paused.reason : "unknown";
      return { outcome, reason, ...counts };
    }

    const lease = await admin.rpc("job_lease_take", {
      p_job: JOB,
      p_holder: holder,
      p_seconds: LEASE_SECONDS,
    });
    if (lease.error) throw new Error(`job_lease_take: ${lease.error.message}`);
    if (lease.data !== true) {
      outcome = "busy";
      return { outcome, reason, ...counts };
    }
    leased = true;

    const batch = await admin
      .from("name_checks")
      .select("profile_id, subject, checked_text")
      .eq("state", "unchecked")
      .order("last_attempt_at", { ascending: true, nullsFirst: true })
      .order("since", { ascending: true })
      .limit(BATCH);
    if (batch.error) {
      outcome = "failed";
      reason = "read_failed";
      logRouteError(PATH, `name_checks read: ${batch.error.message}`);
      return { outcome, reason, ...counts };
    }

    let tooMany = 0;
    let pauseWith: PauseReason | null = null;
    for (const row of batch.data ?? []) {
      if (now() - started > STOP_NEW_AFTER_MS) {
        reason = "time_cap";
        break;
      }
      const answer = await aiCall(
        "name_check",
        { alias: row.checked_text },
        { actorId: null, path: PATH },
      );
      if (!answer.ok && answer.reason !== "reserved" && answer.gate === true) {
        // The gate answered before any spend: nothing is marked.
        if (answer.reason === "featureOff") outcome = "switch_off";
        else if (answer.reason === "budget") outcome = "budget_spent";
        else {
          outcome = "failed";
          reason = "gate_unreadable";
        }
        break;
      }
      counts.asked += 1;
      let state: "clean" | "imitates" | "unavailable" | "unusable";
      // N1b-3 (R3): what the model says the name imitates, kept on the hold only
      // (name_checks' CHECK refuses it on any other state; the door bounds it to 80).
      let of: string | undefined;
      if (answer.ok) {
        state = answer.value.imitates === true ? "imitates" : "clean";
        const said = answer.value.of?.trim();
        if (state === "imitates" && said) of = said;
      } else {
        // J-1 (INC-1002): an answer out of shape counts toward staff review (N = 5, in SQL);
        // every other failure is ours or the provider's and never moves the name.
        state = answer.reason === "unusableAnswer" ? "unusable" : "unavailable";
        const status = answer.reason === "providerError" ? answer.status : undefined;
        if (status === 402) pauseWith = "credits";
        else if (status === 403) pauseWith = "policy";
        else if (status === 429 && ++tooMany >= 2) pauseWith = "rate_limit";
      }
      const mark = await admin.rpc("name_check_mark", {
        p_profile: row.profile_id,
        p_subject: row.subject,
        p_text: row.checked_text,
        p_state: state,
        ...(of === undefined ? {} : { p_of: of }),
      });
      if (mark.error) logRouteError(PATH, `name_check_mark: ${mark.error.message}`);
      else if (mark.data === true) counts[state === "unusable" ? "unavailable" : state] += 1;
      // J-1: the run keeps four figures; an unusable answer counts under unavailable (follow-up: its own count).
      // false: the name changed since it was read; the door already reset its row.
      if (pauseWith !== null) {
        const set = await admin.rpc("job_pause_set", { p_job: JOB, p_reason: pauseWith });
        if (set.error) logRouteError(PATH, `job_pause_set: ${set.error.message}`);
        outcome = "paused";
        reason = pauseWith;
        break;
      }
    }
    return { outcome, reason, ...counts };
  } catch (error) {
    logRouteError(PATH, error);
    outcome = "failed";
    reason = "server_error";
    return { outcome, reason, ...counts };
  } finally {
    if (leased) {
      const released = await admin.rpc("job_lease_release", { p_job: JOB, p_holder: holder }).then(
        (r) => r.error,
        (error: unknown) => error,
      );
      if (released) logRouteError(PATH, `job_lease_release failed`);
    }
    const finish = await admin
      .rpc("job_run_finish", {
        p_run: run,
        p_outcome: outcome,
        p_reason: reason as string,
        p_asked: counts.asked,
        p_clean: counts.clean,
        p_imitates: counts.imitates,
        p_unavailable: counts.unavailable,
      })
      .then(
        (r) => r.error,
        (error: unknown) => error,
      );
    if (finish) logRouteError(PATH, `job_run_finish failed`);
  }
}
