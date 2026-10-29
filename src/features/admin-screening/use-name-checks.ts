import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { MessageKey } from "@/i18n";
import { rpc } from "@/lib/supabase-door";
import { ReaderError, readerFailure } from "@/lib/reader-failure";

import { ADMIN_SCREENING_KEY } from "./use-screening";

/**
 * N1b-3c (INC-977) — THE STAFF QUEUE FOR HELD SELLER NAMES AND THE RE-CHECK'S
 * HEALTH, the browser's side of four doors (migrations 2673141c and 2a2066ed):
 *
 *   admin_name_check_list   listings:view; the name, its checked text and the
 *                           model's `of` only with profiles:view (the door nulls
 *                           them otherwise and says `name_hidden`)
 *   admin_name_check_clear  profiles:update → step-up → the row FOR UPDATE; a
 *                           stale text answers `stale` and writes nothing
 *   admin_job_health        services:view; the job's newest run and its pause
 *   admin_job_resume        services:manage → step-up → the pause FOR UPDATE;
 *                           no pause answers `notPaused` and writes nothing
 *
 * The calls go through the browser's one door to the client (DEC-261,
 * src/lib/supabase-door.ts), never the client module itself (DEC-250).
 *
 * F4 / INC-885: every read that fails, or answers out of shape, is a thrown
 * typed ReaderError — never an empty queue, never a healthy line.
 */

export const NAME_JOB = "name-check-catchup";
export const NAME_QUEUE_LIMIT = 50;

export type NameQueueCursor = { since: string; profileId: string };

export interface NameQueueRow {
  profileId: string;
  subject: "alias";
  /**
   * J-1 (INC-1002): 'imitates' (hidden from buyers) or 'needs_review' (the AI could not check it;
   * buyers still see it). A door from before J-1 names no state and lists only 'imitates'.
   */
  state: NameQueueState;
  /** null when the reader lacks profiles:view (`nameHidden`). */
  name: string | null;
  checkedText: string | null;
  of: string | null;
  nameHidden: boolean;
  since: string;
  attempts: number;
}

export const NAME_QUEUE_STATES = ["imitates", "needs_review"] as const;
export type NameQueueState = (typeof NAME_QUEUE_STATES)[number];

export interface NameQueuePage {
  rows: NameQueueRow[];
  next: NameQueueCursor | null;
}

const isDate = (value: unknown): value is string =>
  typeof value === "string" && Number.isFinite(Date.parse(value));
const optionalText = (value: unknown): value is string | null =>
  value === null || typeof value === "string";

export function nameQueuePageOf(raw: unknown): NameQueuePage {
  const malformed = () =>
    new ReaderError({ class: "malformed", message: "admin_name_check_list: answer out of shape" });
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) throw malformed();
  const page = raw as Record<string, unknown>;
  const list = page["rows"];
  if (!Array.isArray(list)) throw malformed();
  const rows = list.map((value): NameQueueRow => {
    if (value === null || typeof value !== "object" || Array.isArray(value)) throw malformed();
    const row = value as Record<string, unknown>;
    const profileId = row["profile_id"];
    const name = row["name"] ?? null;
    const checkedText = row["checked_text"] ?? null;
    const of = row["of"] ?? null;
    const hidden = row["name_hidden"];
    const attempts = row["attempts"];
    const state = row["state"] ?? "imitates";
    if (typeof profileId !== "string" || profileId === "") throw malformed();
    if (!(NAME_QUEUE_STATES as readonly unknown[]).includes(state)) throw malformed();
    if (row["subject"] !== "alias") throw malformed();
    if (!optionalText(name) || !optionalText(checkedText) || !optionalText(of)) throw malformed();
    if (typeof hidden !== "boolean") throw malformed();
    // A hidden row carries no name; a shown row always carries its checked text.
    if (hidden && (name !== null || checkedText !== null || of !== null)) throw malformed();
    if (!hidden && checkedText === null) throw malformed();
    if (!isDate(row["since"])) throw malformed();
    if (typeof attempts !== "number" || !Number.isInteger(attempts) || attempts < 0)
      throw malformed();
    return {
      profileId,
      subject: "alias",
      state: state as NameQueueState,
      name,
      checkedText,
      of,
      nameHidden: hidden,
      since: row["since"] as string,
      attempts,
    };
  });
  const next = page["next"] ?? null;
  if (next === null) return { rows, next: null };
  if (typeof next !== "object" || Array.isArray(next)) throw malformed();
  const cursor = next as Record<string, unknown>;
  if (!isDate(cursor["since"]) || typeof cursor["profile_id"] !== "string") throw malformed();
  return {
    rows,
    next: { since: cursor["since"] as string, profileId: cursor["profile_id"] as string },
  };
}

export async function fetchNameQueue(after: NameQueueCursor | null): Promise<NameQueuePage> {
  const { data, error } = await rpc("admin_name_check_list", {
    ...(after ? { p_after_since: after.since, p_after_profile: after.profileId } : {}),
    p_limit: NAME_QUEUE_LIMIT,
  });
  if (error) throw new ReaderError(readerFailure(error));
  return nameQueuePageOf(data);
}

export function useNameQueue(after: NameQueueCursor | null, enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "nameQueue", after],
    queryFn: () => fetchNameQueue(after),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });
}

export type ClearAnswer = "done" | "stale";

/** Allow (the door re-checks everything, F3). The reason is optional: trimmed, ≤500, null when empty. */
export async function clearNameCheck(row: NameQueueRow, reason: string): Promise<ClearAnswer> {
  if (row.checkedText === null) throw new Error("clearNameCheck: no checked text to match");
  const trimmed = reason.trim();
  const { data, error } = await rpc("admin_name_check_clear", {
    p_profile: row.profileId,
    p_subject: row.subject,
    p_text: row.checkedText,
    ...(trimmed === "" ? {} : { p_reason: trimmed.slice(0, 500) }),
  });
  if (error) throw error;
  const answer = data as { ok?: unknown; reason?: unknown } | null;
  if (answer?.ok === true) return "done";
  if (answer?.ok === false && answer.reason === "stale") return "stale";
  throw new ReaderError({ class: "malformed", message: "admin_name_check_clear: out of shape" });
}

/* ------------------------------ the job's health ------------------------------ */

export const JOB_OUTCOMES = [
  "dispatched",
  "not_configured",
  "ok",
  "busy",
  "paused",
  "switch_off",
  "budget_spent",
  "failed",
  "lost",
] as const;
export type JobOutcome = (typeof JOB_OUTCOMES)[number];
export const PAUSE_REASONS = ["credits", "policy", "rate_limit"] as const;
export type PauseReason = (typeof PAUSE_REASONS)[number];

/** The words for an outcome a finished or sent run carries (not_configured has its own line). */
export const OUTCOME_KEY: Record<Exclude<JobOutcome, "not_configured">, MessageKey> = {
  dispatched: "admin.screening.job.outcome.dispatched",
  ok: "admin.screening.job.outcome.ok",
  busy: "admin.screening.job.outcome.busy",
  paused: "admin.screening.job.outcome.paused",
  switch_off: "admin.screening.job.outcome.switch_off",
  budget_spent: "admin.screening.job.outcome.budget_spent",
  failed: "admin.screening.job.outcome.failed",
  lost: "admin.screening.job.outcome.lost",
};

export const PAUSE_KEY: Record<PauseReason, MessageKey> = {
  credits: "admin.screening.job.pause.credits",
  policy: "admin.screening.job.pause.policy",
  rate_limit: "admin.screening.job.pause.rate_limit",
};

/** What the line says, decided from the door's answer alone. */
export type JobLine =
  | { kind: "paused"; reason: PauseReason; since: string }
  | { kind: "noAnswer"; sentAt: string }
  | { kind: "notConfigured" }
  | { kind: "lastRun"; outcome: Exclude<JobOutcome, "not_configured">; at: string };

export function jobLineOf(raw: unknown): JobLine {
  const malformed = () =>
    new ReaderError({ class: "malformed", message: "admin_job_health: answer out of shape" });
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) throw malformed();
  const answer = raw as Record<string, unknown>;
  if (answer["job"] !== NAME_JOB) throw malformed();
  const unclaimed = answer["dispatched_unclaimed"];
  if (typeof unclaimed !== "boolean") throw malformed();
  const paused = answer["paused"] ?? null;
  const last = answer["last"] ?? null;

  let run: { outcome: JobOutcome; startedAt: string; finishedAt: string | null } | null = null;
  if (last !== null) {
    if (typeof last !== "object" || Array.isArray(last)) throw malformed();
    const row = last as Record<string, unknown>;
    const outcome = row["outcome"];
    const finished = row["finished_at"] ?? null;
    if (!JOB_OUTCOMES.includes(outcome as JobOutcome)) throw malformed();
    if (!isDate(row["started_at"])) throw malformed();
    if (finished !== null && !isDate(finished)) throw malformed();
    run = {
      outcome: outcome as JobOutcome,
      startedAt: row["started_at"] as string,
      finishedAt: finished,
    };
  }
  if (unclaimed && run?.outcome !== "dispatched") throw malformed();

  if (paused !== null) {
    if (typeof paused !== "object" || Array.isArray(paused)) throw malformed();
    const pause = paused as Record<string, unknown>;
    const reason = pause["reason"];
    if (!PAUSE_REASONS.includes(reason as PauseReason) || !isDate(pause["since"]))
      throw malformed();
    return { kind: "paused", reason: reason as PauseReason, since: pause["since"] as string };
  }
  if (run === null || run.outcome === "not_configured") return { kind: "notConfigured" };
  if (unclaimed) return { kind: "noAnswer", sentAt: run.startedAt };
  return { kind: "lastRun", outcome: run.outcome, at: run.finishedAt ?? run.startedAt };
}

export async function fetchJobLine(): Promise<JobLine> {
  const { data, error } = await rpc("admin_job_health", { p_job: NAME_JOB });
  if (error) throw new ReaderError(readerFailure(error));
  return jobLineOf(data);
}

export function useJobLine(enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "jobHealth", NAME_JOB],
    queryFn: fetchJobLine,
    enabled,
    staleTime: 30_000,
  });
}

export type ResumeAnswer = "done" | "notPaused";

export async function resumeJob(): Promise<ResumeAnswer> {
  const { data, error } = await rpc("admin_job_resume", { p_job: NAME_JOB });
  if (error) throw error;
  const answer = data as { ok?: unknown; reason?: unknown } | null;
  if (answer?.ok === true) return "done";
  if (answer?.ok === false && answer.reason === "notPaused") return "notPaused";
  throw new ReaderError({ class: "malformed", message: "admin_job_resume: out of shape" });
}
