import { describe, expect, it } from "vitest";

import type { SessionTier } from "@/features/session/session-policy";

import { sessionTierFor, type SessionTierState } from "./session-tier";

/**
 * INC-1358 — the tier's census: every case the decision names, each with the answer it owes. The
 * planted decision is the shell's old one: staff only while loading or when the admin-panel
 * permission is held (the decision before INC-1358).
 */
type Tier = (state: SessionTierState) => SessionTier;

const SETTLED: SessionTierState = { loading: false, failed: false, held: false, staff: false };

const CASES: { name: string; state: SessionTierState; tier: SessionTier }[] = [
  { name: "a member whose read settled", state: { ...SETTLED, held: true }, tier: "regular" },
  { name: "a member with no grants", state: SETTLED, tier: "regular" },
  { name: "staff", state: { ...SETTLED, held: true, staff: true }, tier: "staff" },
  { name: "the read is loading", state: { ...SETTLED, loading: true }, tier: "staff" },
  { name: "the read failed, no grant held", state: { ...SETTLED, failed: true }, tier: "staff" },
  {
    name: "the read failed while a member's grants are held",
    state: { ...SETTLED, failed: true, held: true },
    tier: "regular",
  },
  {
    name: "the read failed while staff grants are held",
    state: { ...SETTLED, failed: true, held: true, staff: true },
    tier: "staff",
  },
];

function wrongCases(decide: Tier): string[] {
  return CASES.filter((c) => decide(c.state) !== c.tier).map((c) => c.name);
}

describe("the session tier (INC-1358)", () => {
  it("SESS-TIER-1 a failed read with no grant held takes the strict tier, as a loading read does", () => {
    expect(sessionTierFor({ ...SETTLED, failed: true })).toBe("staff");
    expect(sessionTierFor({ ...SETTLED, loading: true })).toBe("staff");
  });

  it("SESS-TIER-2 a settled member takes the regular tier; held grants decide after a failed refetch", () => {
    expect(sessionTierFor({ ...SETTLED, held: true })).toBe("regular");
    expect(sessionTierFor({ ...SETTLED, failed: true, held: true })).toBe("regular");
    expect(sessionTierFor({ ...SETTLED, failed: true, held: true, staff: true })).toBe("staff");
  });

  it("SESS-TIER-3 the decision answers every case, and the old decision is caught", () => {
    expect(wrongCases(sessionTierFor)).toEqual([]);
    const old: Tier = (s) => (s.loading || s.staff ? "staff" : "regular");
    expect(wrongCases(old)).toEqual(["the read failed, no grant held"]);
  });
});
