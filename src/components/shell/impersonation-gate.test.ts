import { describe, expect, it } from "vitest";

import { impersonationCheckOn, type ImpersonationGateState } from "./impersonation-gate";

/**
 * DEC-372 (INC-1116) — the gate's census: every case the decision names, each with the answer it
 * owes. A gate is judged by the cases it gets wrong; the planted gate is the old shell's
 * unconditional mount (`<ImpersonationBanner enabled />` for every signed-in person).
 */
type Gate = (state: ImpersonationGateState) => boolean;

const SETTLED: ImpersonationGateState = {
  signedIn: true,
  signingOut: false,
  loading: false,
  failed: false,
  staff: false,
};

const CASES: { name: string; state: ImpersonationGateState; on: boolean }[] = [
  { name: "a member", state: SETTLED, on: false },
  { name: "staff", state: { ...SETTLED, staff: true }, on: true },
  { name: "the read failed", state: { ...SETTLED, failed: true }, on: true },
  { name: "the read is loading", state: { ...SETTLED, loading: true }, on: false },
  {
    name: "staff, the read loading again",
    state: { ...SETTLED, staff: true, loading: true },
    on: false,
  },
  { name: "signed out", state: { ...SETTLED, signedIn: false, staff: true }, on: false },
  { name: "signing out", state: { ...SETTLED, signingOut: true, staff: true }, on: false },
];

function wrongCases(gate: Gate): string[] {
  return CASES.filter((c) => gate(c.state) !== c.on).map((c) => c.name);
}

describe("the impersonation gate (DEC-372)", () => {
  it("IMPG-1 a member is off; staff is on", () => {
    expect(impersonationCheckOn(SETTLED)).toBe(false);
    expect(impersonationCheckOn({ ...SETTLED, staff: true })).toBe(true);
  });

  it("IMPG-2 a failed permission read is treated as staff", () => {
    expect(impersonationCheckOn({ ...SETTLED, failed: true })).toBe(true);
  });

  it("IMPG-3 off while the permission read is loading, and for a signed-out or signing-out shell", () => {
    expect(impersonationCheckOn({ ...SETTLED, loading: true })).toBe(false);
    expect(impersonationCheckOn({ ...SETTLED, signedIn: false, staff: true })).toBe(false);
    expect(impersonationCheckOn({ ...SETTLED, signingOut: true, failed: true })).toBe(false);
  });

  it("IMPG-4 the census: the gate answers every case; the old unconditional mount fails it", () => {
    expect(wrongCases(impersonationCheckOn)).toEqual([]);
    const planted: Gate = (state) => state.signedIn && !state.signingOut;
    expect(wrongCases(planted)).toEqual([
      "a member",
      "the read is loading",
      "staff, the read loading again",
    ]);
  });
});
