import { readSessionLevel, readVerifiedFactors } from "./session-level";

/**
 * DEC-434 — what the staff gate (staff-factor-gate.tsx) needs to know of the signed-in account:
 * `setupNeeded` (no verified factor), `codeNeeded` (a factor, and a session that has not used it:
 * its assurance level is below aal2), `ready`, or `failed` (a read that failed — never a default that
 * lets a staff screen open; it carries the typed failure the gate draws through the failure notice).
 */
export type StaffFactorRead =
  | { phase: "setupNeeded" | "codeNeeded" | "ready" }
  | { phase: "failed"; error: unknown };

export type StaffFactorPhase = StaffFactorRead["phase"];

/**
 * The staff gate's one read (INC-1291, the light read): the session's level from its token, then
 * the verified factors by one request to the auth server — neither carries the database client.
 */
export async function readStaffFactor(): Promise<StaffFactorRead> {
  const level = await readSessionLevel();
  if (!level.ok) return { phase: "failed", error: level.error };
  const factors = await readVerifiedFactors(level.token);
  if (!factors.ok) return { phase: "failed", error: factors.error };
  if (factors.verified === 0) return { phase: "setupNeeded" };
  return { phase: level.current === "aal2" ? "ready" : "codeNeeded" };
}
