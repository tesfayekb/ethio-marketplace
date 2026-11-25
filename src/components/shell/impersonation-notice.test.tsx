import { fireEvent, render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ImpersonationNotice, LazyImpersonationBanner } from "./impersonation-notice";

const service = vi.hoisted(() => ({
  getActiveImpersonation: vi.fn(),
  endImpersonation: vi.fn(),
}));

vi.mock("@/features/admin/impersonation/impersonation-service", () => service);
vi.mock("@/features/admin/impersonation/impersonation-banner", () => {
  throw new Error("Failed to fetch dynamically imported module");
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

const SESSION = {
  id: "5b0f3a3e-6f0e-4a59-9d0c-0a1b2c3d4e5f",
  targetId: "7c1e2d3f-0000-4000-8000-000000000001",
  targetName: null,
  expiresAt: "2026-11-13T12:15:00Z",
};

/**
 * DEC-372 — the plain notice staff see when the impersonation banner's module could not load.
 * Seams: the impersonation service (its two door calls), the banner's module (its download
 * fails) and `@/i18n` (identity `t`, so the assertions read keys).
 */
describe("ImpersonationNotice (DEC-372)", () => {
  beforeEach(() => {
    service.getActiveImpersonation.mockReset();
    service.endImpersonation.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("IMPN-1 a failed download of the banner's module shows the notice in its place", async () => {
    render(
      <Suspense fallback={null}>
        <LazyImpersonationBanner />
      </Suspense>,
    );
    const notice = await screen.findByTestId("impersonation-notice");
    expect(notice).toHaveTextContent("impersonation.mayBeActive");
    expect(screen.getByTestId("impersonation-banner-end")).toHaveTextContent(
      "impersonation.endNow",
    );
  });

  it("IMPN-2 End now reads the caller's active session and ends it; the notice leaves", async () => {
    service.getActiveImpersonation.mockResolvedValue(SESSION);
    service.endImpersonation.mockResolvedValue(undefined);
    render(<ImpersonationNotice />);
    fireEvent.click(screen.getByTestId("impersonation-banner-end"));
    await vi.waitFor(() => expect(screen.queryByTestId("impersonation-notice")).toBeNull());
    expect(service.endImpersonation).toHaveBeenCalledWith(SESSION.id);
  });

  it("IMPN-3 no active session: it says so, ends nothing and offers no button", async () => {
    service.getActiveImpersonation.mockResolvedValue(null);
    render(<ImpersonationNotice />);
    fireEvent.click(screen.getByTestId("impersonation-banner-end"));
    await screen.findByText("impersonation.noneActive");
    expect(service.endImpersonation).not.toHaveBeenCalled();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("IMPN-4 a refused call says so in the door's words and offers Refresh page; a code with no words reads the end's generic", async () => {
    service.getActiveImpersonation.mockResolvedValue(SESSION);
    service.endImpersonation.mockRejectedValue({ code: "P0001", message: "noSuchCode" });
    render(<ImpersonationNotice />);
    fireEvent.click(screen.getByTestId("impersonation-banner-end"));
    const failed = await screen.findByTestId("impersonation-notice-failed");
    expect(failed).toHaveTextContent("impersonation.error.endFailed");
    expect(screen.getByTestId("impersonation-notice-refresh")).toHaveTextContent(
      "common.refreshPage",
    );
    expect(screen.getByTestId("impersonation-notice")).toBeInTheDocument();
  });

  it("IMPN-5 the door's noActiveSession says no session is active and offers no button", async () => {
    service.getActiveImpersonation.mockResolvedValue(SESSION);
    service.endImpersonation.mockRejectedValue({ code: "P0001", message: "noActiveSession" });
    render(<ImpersonationNotice />);
    fireEvent.click(screen.getByTestId("impersonation-banner-end"));
    await screen.findByText("impersonation.noneActive");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("IMPN-6 a network failure offers Retry, which ends the session again in place", async () => {
    service.getActiveImpersonation.mockResolvedValue(SESSION);
    service.endImpersonation
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(undefined);
    render(<ImpersonationNotice />);
    fireEvent.click(screen.getByTestId("impersonation-banner-end"));
    const failed = await screen.findByTestId("impersonation-notice-failed");
    expect(failed).toHaveTextContent("failure.network");
    fireEvent.click(screen.getByTestId("impersonation-notice-retry"));
    await vi.waitFor(() => expect(screen.queryByTestId("impersonation-notice")).toBeNull());
    expect(service.endImpersonation).toHaveBeenCalledTimes(2);
  });
});
