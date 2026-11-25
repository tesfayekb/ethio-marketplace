import { describe, expect, it } from "vitest";

import { readRefusal } from "@/lib/refusal";

import { END_REFUSALS, endRefusalKey } from "./impersonation-end-refusals";
import { BEGIN_REFUSALS } from "./impersonation-refusals";

const refused = (message: string) => ({ code: "P0001", message });

describe("View as refusal words (bundle 10b, D31/D39)", () => {
  it("IMRF-1 each code begin_impersonation can answer reads its own words", () => {
    const cases: ReadonlyArray<readonly [string, string]> = [
      ["impersonateSelf", "impersonation.error.self"],
      ["impersonateSuperAdmin", "impersonation.error.superAdmin"],
      ["unknownUser", "admin.users.error.unknownUser"],
      ["badLength:reason", "impersonation.reasonTooShort"],
      ["sessionActive", "impersonation.error.sessionActive"],
    ];
    for (const [code, key] of cases)
      expect(readRefusal(refused(code), BEGIN_REFUSALS).key, code).toBe(key);
  });

  it("IMRF-2 end_impersonation's noActiveSession reads no session is active", () => {
    expect(endRefusalKey(refused("noActiveSession"))).toBe("impersonation.noneActive");
  });

  it("IMRF-3 a code no family names reads each family's generic", () => {
    expect(readRefusal(refused("noSuchCode"), BEGIN_REFUSALS).key).toBe("impersonation.failed");
    expect(readRefusal(refused("noSuchCode"), END_REFUSALS).key).toBe(
      "impersonation.error.endFailed",
    );
  });
});
