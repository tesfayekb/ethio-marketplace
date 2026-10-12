import { describe, expect, it } from "vitest";

import { passwordPairProblem } from "./password-pair";

/** Bundle 11 turn C4 (D143) — a new password typed twice must match. */
describe("passwordPairProblem", () => {
  it("PPR-1 the same password twice passes; any difference is a mismatch, spaces and case included", () => {
    expect(passwordPairProblem("Kebede-2026!", "Kebede-2026!")).toBeNull();
    expect(passwordPairProblem("Kebede-2026!", "kebede-2026!")).toBe("auth.errorPasswordMismatch");
    expect(passwordPairProblem("Kebede-2026!", "Kebede-2026! ")).toBe("auth.errorPasswordMismatch");
    expect(passwordPairProblem("Kebede-2026!", "")).toBe("auth.errorPasswordMismatch");
  });
});
