import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Cursor bundle 4 (INC-1147, class 2) — THE SETTINGS CARD OFFERS A HALF-DONE SETUP BACK. The service
 * is replaced by scripted answers, so each state below is the hook's own reading of them: an unfinished
 * setup the provider holds is `unfinished` (and never `pending`, which is the setup this screen started),
 * a start clears through the service and then holds the new setup, and a factor list that failed is
 * `readFailed` with no factors — never an empty list the card would read as "off".
 */
const service = vi.hoisted(() => ({
  listFactors: vi.fn(),
  getAal: vi.fn(),
  enrollTotp: vi.fn(),
  unenrollFactor: vi.fn(),
  verifyFactor: vi.fn(),
}));

vi.mock("./mfa-service", () => ({
  ...service,
  MFA_ENROLL_REFUSALS: { generic: "mfa.errorGeneric" },
}));

const { useMfa } = await import("./use-mfa");

const factor = { id: "p-1", friendlyName: "Authenticator app", createdAt: "2026-11-23T00:00:00Z" };

beforeEach(() => {
  for (const fn of Object.values(service)) fn.mockReset();
  service.getAal.mockResolvedValue({ current: "aal1", next: "aal1" });
});

describe("the settings card's two-factor state (INC-1147 class 2)", () => {
  it("MFH-1 an unfinished setup the provider holds is offered back on load: unfinished, with nothing pending and no verified factor", async () => {
    service.listFactors.mockResolvedValue({ ok: true, factors: [], pending: [factor] });
    const { result } = renderHook(() => useMfa());
    await waitFor(() => expect(result.current.factors).toEqual([]));
    expect(result.current.unfinished).toBe(true);
    expect(result.current.pending).toBeNull();
    expect(result.current.readFailed).toBe(false);
  });

  it("MFH-2 starting again goes through the service's clear-then-enrol and holds the new setup", async () => {
    service.listFactors.mockResolvedValue({ ok: true, factors: [], pending: [factor] });
    service.enrollTotp.mockResolvedValue({
      ok: true,
      factorId: "new-1",
      qrCode: "qr",
      secret: "secret",
      uri: "uri",
    });
    const { result } = renderHook(() => useMfa());
    await waitFor(() => expect(result.current.unfinished).toBe(true));
    let started = false;
    await act(async () => {
      started = await result.current.startEnrollment("Authenticator app");
    });
    expect(started).toBe(true);
    expect(service.enrollTotp).toHaveBeenCalledWith("Authenticator app");
    expect(result.current.unfinished).toBe(false);
    expect(result.current.pending?.factorId).toBe("new-1");
    expect(result.current.errorKey).toBeNull();
  });

  it("MFH-3 a start whose clear failed shows its words and holds no setup; the unfinished one stays offered", async () => {
    service.listFactors.mockResolvedValue({ ok: true, factors: [], pending: [factor] });
    service.enrollTotp.mockResolvedValue({
      ok: false,
      errorKey: "mfa.errorClearFailed",
      refusal: { field: "code", reason: "clearFailed" },
    });
    const { result } = renderHook(() => useMfa());
    await waitFor(() => expect(result.current.unfinished).toBe(true));
    await act(async () => {
      await result.current.startEnrollment("Authenticator app");
    });
    expect(result.current.errorKey).toBe("mfa.errorClearFailed");
    expect(result.current.pending).toBeNull();
    expect(result.current.unfinished).toBe(true);
  });

  it("MFH-4 a factor list that failed is an error with no factors and nothing offered, never an empty list read as off", async () => {
    service.listFactors.mockResolvedValue({
      ok: false,
      errorKey: "mfa.errorGeneric",
      refusal: { field: "code", reason: "unknown" },
    });
    const { result } = renderHook(() => useMfa());
    await waitFor(() => expect(result.current.readFailed).toBe(true));
    expect(result.current.factors).toBeNull();
    expect(result.current.unfinished).toBe(false);
    expect(result.current.errorKey).toBe("mfa.errorGeneric");
  });
});
