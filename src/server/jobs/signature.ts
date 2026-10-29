import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * N1b-1 (INC-977, S1/S2, A1) — THE JOB CALL'S SIGNATURE. The database's
 * `job_call` sends `X-Job-Timestamp` (epoch seconds) and `X-Job-Signature`
 * = hex(HMAC-SHA256(job + "." + timestamp, job_secret)); the secret never
 * travels. The server recomputes it with JOB_SECRET and compares SHA-256
 * digests of both hex strings with timingSafeEqual, so neither the length nor
 * the content leaks (A1). A missing secret, a missing or malformed header, a
 * timestamp more than 300 s old or 60 s ahead: all refused alike. The secret's
 * value is never logged, echoed or returned.
 */
export const WINDOW_PAST_S = 300;
export const WINDOW_AHEAD_S = 60;

const digest = (text: string): Buffer => createHash("sha256").update(text, "utf8").digest();

export function signJob(job: string, ts: number, secret: string): string {
  return createHmac("sha256", secret).update(`${job}.${ts}`, "utf8").digest("hex");
}

/** INC-1000 — why a call was refused; logged by name, never with a value. */
export type JobRefusal = "secret_missing" | "bad_signature" | "stale";

/** The timestamp when the request is genuine and in the window; the refusal's reason otherwise. */
export function jobSignatureVerdict(input: {
  job: string;
  timestamp: string | null;
  signature: string | null;
  secret: string | undefined;
  nowSeconds: number;
}): { ok: true; ts: number } | { ok: false; reason: JobRefusal } {
  const secret = (input.secret ?? "").trim();
  const given = input.signature ?? "";
  // Always compute and compare, so a missing secret or header costs the same work.
  const ts = /^\d{1,12}$/.test(input.timestamp ?? "") ? Number(input.timestamp) : -1;
  const expected = signJob(input.job, ts, secret === "" ? "\u0000missing" : secret);
  const same = timingSafeEqual(digest(expected), digest(given.toLowerCase()));
  if (secret === "") return { ok: false, reason: "secret_missing" };
  if (ts < 0 || !same) return { ok: false, reason: "bad_signature" };
  if (ts < input.nowSeconds - WINDOW_PAST_S || ts > input.nowSeconds + WINDOW_AHEAD_S)
    return { ok: false, reason: "stale" };
  return { ok: true, ts };
}

/** The timestamp when the request is genuine and in the window; null otherwise. */
export function verifyJobSignature(
  input: Parameters<typeof jobSignatureVerdict>[0],
): number | null {
  const verdict = jobSignatureVerdict(input);
  return verdict.ok ? verdict.ts : null;
}
