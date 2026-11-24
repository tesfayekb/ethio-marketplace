import { describe, expect, it } from "vitest";

import { failureKind, isRetryable } from "./failure-reason";

const withStatus = (status: number, message = "x") => Object.assign(new Error(message), { status });
const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01", status: 400 });

describe("failureKind (DEC-464, status first)", () => {
  it("FR-U1 401 or notSignedIn → signedOut", () => {
    expect(failureKind(withStatus(401)).kind).toBe("signedOut");
    expect(failureKind(coded("notSignedIn")).kind).toBe("signedOut");
  });
  it("FR-U2 428 or stepUpRequired → stepUp", () => {
    expect(failureKind(withStatus(428)).kind).toBe("stepUp");
    expect(failureKind(coded("stepUpRequired")).kind).toBe("stepUp");
  });
  it("FR-U3 429 or rateLimited → rateLimited", () => {
    expect(failureKind(withStatus(429)).kind).toBe("rateLimited");
    expect(failureKind(coded("rateLimited")).kind).toBe("rateLimited");
  });
  it("FR-U4 403, permissionDenied or accountDeactivated → noAccess", () => {
    expect(failureKind(withStatus(403)).kind).toBe("noAccess");
    expect(failureKind(coded("permissionDenied")).kind).toBe("noAccess");
    expect(failureKind(coded("accountDeactivated")).kind).toBe("noAccess");
  });
  it("FR-U5 404 or 410 → gone", () => {
    expect(failureKind(withStatus(404)).kind).toBe("gone");
    expect(failureKind(withStatus(410)).kind).toBe("gone");
  });
  it("FR-U6 409 → changed", () => {
    expect(failureKind(withStatus(409)).kind).toBe("changed");
  });
  it("FR-U7 a network failure → network", () => {
    expect(failureKind(new TypeError("Failed to fetch")).kind).toBe("network");
  });
  it("FR-U8 500 or more → server", () => {
    expect(failureKind(withStatus(500)).kind).toBe("server");
    expect(failureKind(withStatus(503)).kind).toBe("server");
  });
  it("FR-U9 a refusal whose code is in GONE_CODES → gone", () => {
    expect(failureKind(coded("listingNotAvailable")).kind).toBe("gone");
  });
  it("FR-U10 any other refusal → refused", () => {
    expect(failureKind(coded("somethingElse")).kind).toBe("refused");
  });
  it("FR-U11 anything else, or a read that throws → server", () => {
    expect(failureKind(undefined).kind).toBe("server");
    const unreadable = {
      get message(): string {
        throw new Error("x");
      },
    };
    expect(failureKind(unreadable).kind).toBe("server");
  });
  it("FR-U12 a status wins over a code", () => {
    expect(failureKind(Object.assign(new Error("rateLimited"), { status: 401 })).kind).toBe(
      "signedOut",
    );
    expect(failureKind(Object.assign(new Error("listingNotAvailable"), { status: 409 })).kind).toBe(
      "changed",
    );
  });
  it("FR-U13 Retry is drawn at once only for network and server", () => {
    expect(isRetryable("network")).toBe(true);
    expect(isRetryable("server")).toBe(true);
    for (const kind of [
      "gone",
      "changed",
      "noAccess",
      "signedOut",
      "stepUp",
      "rateLimited",
      "refused",
    ] as const)
      expect(isRetryable(kind)).toBe(false);
  });
});
