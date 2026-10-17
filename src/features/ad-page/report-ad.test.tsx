import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
const reportListing = vi.fn();
vi.mock("./report", async (original) => ({
  ...(await original<typeof import("./report")>()),
  reportListing: (...args: unknown[]) => reportListing(...args),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key }) }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    search,
    children,
    ...rest
  }: {
    to: string;
    search: { return: string };
    children: React.ReactNode;
  }) => (
    <a href={`${to}?return=${encodeURIComponent(search.return)}`} {...rest}>
      {children}
    </a>
  ),
}));
const { ReportAd } = await import("./report-ad");
const props = {
  publicId: "2345678923",
  signInTo: { to: "/auth" as const, search: { return: "/l/scratch-2345678923#report" } },
  onOwn: vi.fn(),
};
beforeEach(() => {
  reportListing.mockReset();
  props.onOwn.mockReset();
});
describe("RD-5 Report dialog", () => {
  it("signed out has the sign-in return; unknown has nothing", () => {
    const { rerender } = render(<ReportAd {...props} viewer="signedOut" />);
    expect(screen.getByTestId("listing-report-sign-in").getAttribute("href")).toBe(
      "/auth?return=%2Fl%2Fscratch-2345678923%23report",
    );
    rerender(<ReportAd {...props} viewer="unknown" />);
    expect(screen.queryByTestId("listing-report-sign-in")).toBeNull();
    expect(screen.queryByTestId("listing-report-open")).toBeNull();
  });
  it.each(["sent", "already", "rateLimited", "failed", "ownListing"])(
    "shows %s and preserves the required form",
    async (state) => {
      reportListing.mockResolvedValue(
        state === "sent"
          ? { ok: true }
          : { ok: false, reason: state === "already" ? "alreadyReported" : state },
      );
      render(<ReportAd {...props} viewer="signedIn" />);
      fireEvent.click(screen.getByTestId("listing-report-open"));
      expect(screen.getByTestId("listing-report-send")).toBeDisabled();
      const reasons = within(screen.getByTestId("listing-report-reasons")).getAllByRole("radio");
      expect(reasons.map((node) => node.getAttribute("data-testid"))).toEqual(
        [
          "spam",
          "scam",
          "prohibited",
          "wrongCategory",
          "duplicate",
          "alreadySold",
          "under18",
          "copyright",
          "other",
        ].map((reason) => `listing-report-reason-${reason}`),
      );
      fireEvent.click(screen.getByTestId("listing-report-reason-spam"));
      expect(screen.getByTestId("listing-report-send")).not.toBeDisabled();
      expect(screen.getByTestId("listing-report-note")).toHaveAttribute("maxlength", "500");
      fireEvent.change(screen.getByTestId("listing-report-note"), {
        target: { value: "scratch note" },
      });
      fireEvent.click(screen.getByTestId("listing-report-send"));
      await waitFor(() =>
        expect(reportListing).toHaveBeenCalledWith(props.publicId, "spam", "scratch note"),
      );
      if (state === "ownListing") {
        await waitFor(() => expect(props.onOwn).toHaveBeenCalledTimes(1));
        expect(screen.queryByRole("dialog")).toBeNull();
      } else {
        await waitFor(() =>
          expect(screen.getByTestId("listing-report-status")).toHaveAttribute("data-state", state),
        );
        expect(screen.queryByTestId("listing-report-send") !== null).toBe(
          state === "rateLimited" || state === "failed",
        );
        if (state === "sent") {
          expect(screen.getByTestId("listing-report-status")).toHaveTextContent(
            en["adPage.report.thanks"],
          );
          fireEvent.click(
            within(screen.getByRole("dialog")).getAllByRole("button", {
              name: en["common.close"],
            })[0] as HTMLElement,
          );
          fireEvent.click(screen.getByTestId("listing-report-open"));
          expect(screen.queryByTestId("listing-report-status")).toBeNull();
          expect(screen.getByTestId("listing-report-send")).toBeDisabled();
        }
      }
    },
  );
});
