import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-434 (cursor bundle 5, part 4) — a staff screen opens only for a staff account with a second
 * factor, in a session that used it. Seams (DEC-026): the light reads (session-level.ts: the token's
 * level, the account's factors), the shell's session store, the router link and i18n (identity `t`)
 * are mocked; nothing reaches the network.
 */
const mfa = vi.hoisted(() => ({ readSessionLevel: vi.fn(), readVerifiedFactors: vi.fn() }));

vi.mock("./session-level", () => mfa);
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ user: { id: "staff-1", email: "staff@example.test", displayName: null } }),
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: unknown }) => <a>{children as never}</a>,
}));

const { StaffFactorGate } = await import("./staff-factor-gate");

function draw() {
  return render(
    <StaffFactorGate>
      <p data-testid="staff-screen" />
    </StaffFactorGate>,
  );
}

describe("the staff second-factor gate (DEC-434)", () => {
  beforeEach(() => {
    for (const fn of Object.values(mfa)) fn.mockReset();
  });

  it("AG-U1 an account with no verified factor meets the setup panel and no staff screen", async () => {
    mfa.readSessionLevel.mockResolvedValue({ ok: true, token: "t", current: "aal1" });
    mfa.readVerifiedFactors.mockResolvedValue({ ok: true, verified: 0 });
    draw();
    expect(await screen.findByTestId("admin-factor-setup")).toBeTruthy();
    expect(screen.queryByTestId("staff-screen")).toBeNull();
  });

  it("AG-U2 a factor and a session that has not used it is asked for its code, and no staff screen draws", async () => {
    mfa.readSessionLevel.mockResolvedValue({ ok: true, token: "t", current: "aal1" });
    mfa.readVerifiedFactors.mockResolvedValue({ ok: true, verified: 1 });
    draw();
    expect(await screen.findByTestId("admin-factor-code-panel")).toBeTruthy();
    expect(screen.queryByTestId("staff-screen")).toBeNull();
  });

  it("AG-U3 a read that failed or threw draws the failure notice (a server failure with Retry), never the setup panel, and no staff screen", async () => {
    mfa.readSessionLevel.mockResolvedValue({ ok: true, token: "t", current: "aal1" });
    mfa.readVerifiedFactors.mockResolvedValue({
      ok: false,
      error: { status: 503 },
    });
    const failed = draw();
    const notice = await screen.findByTestId("admin-factor-read-failed");
    expect(notice).toHaveAttribute("data-failure-reason", "server");
    expect(screen.getByTestId("admin-factor-read-failed-retry")).toBeTruthy();
    expect(screen.queryByTestId("admin-factor-setup")).toBeNull();
    expect(screen.queryByTestId("staff-screen")).toBeNull();
    failed.unmount();

    mfa.readSessionLevel.mockRejectedValue(new Error("offline"));
    draw();
    expect(await screen.findByTestId("admin-factor-read-failed")).toBeTruthy();
    expect(screen.queryByTestId("staff-screen")).toBeNull();
  });

  it("AG-U3b Retry reads again and a read that then answers opens the staff screen", async () => {
    mfa.readSessionLevel.mockResolvedValue({ ok: true, token: "t", current: "aal2" });
    mfa.readVerifiedFactors
      .mockResolvedValueOnce({ ok: false, error: { status: 503 } })
      .mockResolvedValue({ ok: true, verified: 1 });
    draw();
    fireEvent.click(await screen.findByTestId("admin-factor-read-failed-retry"));
    await waitFor(() => expect(screen.getByTestId("staff-screen")).toBeTruthy());
  });

  it("AG-U4 a session that used its factor (aal2) draws the staff screen; nothing draws before the read answers", async () => {
    mfa.readSessionLevel.mockResolvedValue({ ok: true, token: "t", current: "aal2" });
    mfa.readVerifiedFactors.mockResolvedValue({ ok: true, verified: 1 });
    draw();
    expect(screen.queryByTestId("staff-screen")).toBeNull();
    expect(screen.getByTestId("admin-factor-checking")).toBeTruthy();
    await waitFor(() => expect(screen.getByTestId("staff-screen")).toBeTruthy());
  });
});
