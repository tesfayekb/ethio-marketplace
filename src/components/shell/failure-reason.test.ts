import { onlineManager } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { failureKind, isRetryable, loadFailureReader, useFailureKind } from "./failure-reason";

const reports = vi.hoisted(() => ({ report: vi.fn() }));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: reports.report }));

const withStatus = (status: number, message = "x") => Object.assign(new Error(message), { status });
const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01" });

describe("failureKind before the reader arrives (INC-864)", () => {
  it("FR-U14 a TypeError is network, status 404 is gone, anything else is server", () => {
    expect(failureKind(new TypeError("offline")).kind).toBe("network");
    expect(failureKind(withStatus(404)).kind).toBe("gone");
    expect(failureKind(coded("listingNotFound")).kind).toBe("server");
    expect(failureKind("x").kind).toBe("server");
  });

  it("FR-U17 a refusal the first reading takes for the server's is never reported, before or after the reader arrives (DEC-474 Part F)", async () => {
    reports.report.mockClear();
    const refusal = coded("somethingElse");
    const { result } = renderHook(() => useFailureKind(refusal));
    expect(result.current.kind).toBe("server");
    await waitFor(() => expect(result.current.kind).toBe("refused"));
    expect(reports.report).not.toHaveBeenCalled();
  });
});

describe("failureKind (DEC-464, status first)", () => {
  beforeAll(async () => {
    await loadFailureReader();
  });
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
  it("FR-U9 no list of codes decides a kind: the status that arrived does (400 a refusal, 404 gone); with none, the table's own row for the code (INC-1296)", () => {
    expect(failureKind(coded("listingNotAvailable")).kind).toBe("gone");
    expect(
      failureKind(Object.assign(new Error("listingNotFound"), { code: "P0D01", status: 400 })).kind,
    ).toBe("refused");
    expect(
      failureKind(Object.assign(new Error("listingNotFound"), { code: "P0D01", status: 404 })).kind,
    ).toBe("gone");
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
  describe("while the device is offline (INC-1286)", () => {
    afterEach(() => onlineManager.setOnline(true));
    it("FR-U15 a failure read offline says the network's words; a refusal stays a refusal", () => {
      expect(failureKind(withStatus(500)).kind).toBe("server");
      onlineManager.setOnline(false);
      expect(failureKind(withStatus(500)).kind).toBe("network");
      expect(failureKind(withStatus(500)).diagnostic).toContain("offline");
      expect(failureKind("x").kind).toBe("network");
      expect(failureKind(withStatus(403)).kind).toBe("noAccess");
      expect(failureKind(withStatus(404)).kind).toBe("gone");
      onlineManager.setOnline(true);
      expect(failureKind(withStatus(500)).kind).toBe("server");
    });
  });
});

describe("the rate family (INC-1280)", () => {
  it("FR-U16 RATE_FAMILY words only the gate code rateLimited, with its until words", async () => {
    const { RATE_FAMILY } = await import("./failure-reason");
    expect(RATE_FAMILY).toEqual({
      words: { rateLimited: "failure.rateLimitedSoon" },
      when: { rateLimited: "failure.rateLimited" },
    });
  });
});

describe("the notice's report (DEC-474 Part F)", () => {
  beforeAll(async () => {
    await loadFailureReader();
  });
  afterEach(() => {
    onlineManager.setOnline(true);
    reports.report.mockClear();
  });

  it("FR-U18 the notice's server reading is reported once, with its status; a refusal or an offline reading never is", () => {
    const failed = withStatus(503, "upstream unavailable");
    const { rerender } = renderHook(() => useFailureKind(failed));
    rerender();
    expect(reports.report).toHaveBeenCalledTimes(1);
    expect(reports.report).toHaveBeenCalledWith({ kind: "notice", code: "503", error: failed });

    reports.report.mockClear();
    for (const refusal of [withStatus(401), withStatus(403), withStatus(404), withStatus(429)])
      renderHook(() => useFailureKind(refusal));
    renderHook(() => useFailureKind(coded("permissionDenied")));
    expect(reports.report).not.toHaveBeenCalled();

    onlineManager.setOnline(false);
    renderHook(() => useFailureKind(withStatus(500, "upstream unavailable")));
    expect(reports.report).not.toHaveBeenCalled();
  });

  it("FR-U19 a failure whose fields throw when read is reported by its reading, never thrown into the screen", () => {
    const unreadable = {
      get message(): string {
        throw new Error("x");
      },
    };
    const { result } = renderHook(() => useFailureKind(unreadable));
    expect(result.current.kind).toBe("server");
    expect(reports.report).toHaveBeenCalledTimes(1);
    expect(reports.report).toHaveBeenCalledWith({
      kind: "notice",
      code: null,
      error: "unreadable",
    });
  });
});
