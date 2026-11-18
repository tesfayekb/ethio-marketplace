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
const dialogLoaded = vi.fn();
vi.mock("./report-ad-dialog", async (original) => {
  dialogLoaded();
  return original<typeof import("./report-ad-dialog")>();
});
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
      expect(await screen.findByTestId("listing-report-send")).toBeDisabled();
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
          expect(await screen.findByTestId("listing-report-send")).toBeDisabled();
          expect(screen.queryByTestId("listing-report-status")).toBeNull();
        }
      }
    },
  );
});

describe("KRA Report dialog on demand", () => {
  it("KRA-1 nothing of the dialog module loads before the tap; it arrives after", async () => {
    vi.resetModules();
    dialogLoaded.mockReset();
    vi.doMock("./report-ad-dialog", async (original) => {
      dialogLoaded();
      return original<typeof import("./report-ad-dialog")>();
    });
    const fresh = await import("./report-ad");
    render(<fresh.ReportAd {...props} viewer="signedIn" />);
    expect(dialogLoaded).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByTestId("listing-report-reasons")).toBeNull();
    fireEvent.click(screen.getByTestId("listing-report-open"));
    expect(await screen.findByTestId("listing-report-reasons")).toBeInTheDocument();
    expect(dialogLoaded).toHaveBeenCalledTimes(1);
  });
  it("KRA-2 both controls sit inside a Field with their ids; reasons are required", async () => {
    render(<ReportAd {...props} viewer="signedIn" />);
    fireEvent.click(screen.getByTestId("listing-report-open"));
    const note = await screen.findByTestId("listing-report-note");
    const noteBox = note.closest("[data-form-field]");
    expect(noteBox).not.toBeNull();
    expect(noteBox?.getAttribute("data-field")).toBe(note.id);
    expect(note).not.toHaveAttribute("aria-required");
    expect(noteBox).toHaveTextContent(en["post.optional"]);
    const spam = screen.getByTestId("listing-report-reason-spam");
    const spamBox = spam.closest("[data-form-field]");
    expect(spamBox?.getAttribute("data-field")).toBe(spam.id);
    expect(spam).toHaveAttribute("aria-required", "true");
    expect(spam).toHaveAttribute("type", "radio");
  });
  it("KRA-3 the send stays disabled with no reason and sends nothing", async () => {
    render(<ReportAd {...props} viewer="signedIn" />);
    fireEvent.click(screen.getByTestId("listing-report-open"));
    const send = await screen.findByTestId("listing-report-send");
    fireEvent.change(screen.getByTestId("listing-report-note"), { target: { value: "x" } });
    expect(send).toBeDisabled();
    fireEvent.click(send);
    expect(reportListing).not.toHaveBeenCalled();
  });
});
