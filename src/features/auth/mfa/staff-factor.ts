import { getAal, listFactors } from "./mfa-service";

/**
 * DEC-434 — what the staff gate (staff-factor-gate.tsx) needs to know of the signed-in account:
 * `setupNeeded` (no verified factor), `codeNeeded` (a factor, and a session that has not used it:
 * its assurance level is below aal2), `ready`, or `failed` (a read that failed — never a default that
 * lets a staff screen open).
 */
export type StaffFactorPhase = "failed" | "setupNeeded" | "codeNeeded" | "ready";

/** The staff gate's one read: the verified factors, then the session's level. Both are typed reads. */
export async function readStaffFactor(): Promise<StaffFactorPhase> {
  const factors = await listFactors();
  if (!factors.ok) return "failed";
  if (factors.factors.length === 0) return "setupNeeded";
  const level = await getAal();
  if (!level.ok) return "failed";
  return level.current === "aal2" ? "ready" : "codeNeeded";
}
