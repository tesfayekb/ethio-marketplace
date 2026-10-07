import { describe, expect, it } from "vitest";

import { toErrorKey } from "./auth-error-key";

const weak = (reasons?: string[]) => ({
  message: "Password is known to be weak and easy to guess",
  code: "weak_password",
  status: 422,
  reasons,
});

describe("toErrorKey — weak and leaked passwords", () => {
  it("(i) the leaked reason alone answers the leaked key", () => {
    expect(toErrorKey(weak(["pwned"]))).toBe("auth.errorLeakedPassword");
  });
  it("(ii) a length reason answers the weak key", () => {
    expect(toErrorKey(weak(["length"]))).toBe("auth.errorWeakPassword");
  });
  it("(iii) the leaked reason with another answers the weak key", () => {
    expect(toErrorKey(weak(["pwned", "characters"]))).toBe("auth.errorWeakPassword");
  });
  it("(iv) no reasons answer the weak key", () => {
    expect(toErrorKey(weak())).toBe("auth.errorWeakPassword");
    expect(toErrorKey(weak([]))).toBe("auth.errorWeakPassword");
  });
  it("(v) the old message test still answers the weak key", () => {
    expect(toErrorKey({ message: "Password should be at least 8 characters" })).toBe(
      "auth.errorWeakPassword",
    );
  });
});

describe("toErrorKey — other branches unchanged by the move", () => {
  it("(vi) invalid credentials", () => {
    expect(toErrorKey({ message: "x", code: "invalid_credentials", status: 400 })).toBe(
      "auth.errorInvalidCredentials",
    );
  });
  it("(vi) e-mail in use", () => {
    expect(toErrorKey({ message: "User already registered" })).toBe("auth.errorEmailInUse");
  });
  it("(vi) the 429 status", () => {
    expect(toErrorKey({ message: "slow down", status: 429 })).toBe("auth.errorRateLimited");
  });
});
