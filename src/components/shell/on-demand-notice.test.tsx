import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * INC-911 — the shell's one notice: nothing until a piece fails to download; then the words
 * and Refresh page; closed by the person, shown again by the next failure.
 */
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async () => {
  const real =
    await vi.importActual<typeof import("@/lib/on-demand-failure")>("@/lib/on-demand-failure");
  return { ...real, refreshPage: refreshed };
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));

const { OnDemandNotice } = await import("./on-demand-notice");
const { NoticeOutlet } = await import("@/components/ui/notice-outlet");
const { reportOnDemandFailure } = await import("@/lib/on-demand-failure");

describe("OnDemandNotice (INC-911)", () => {
  it("ODN-1 nothing shows until a failure; a failure shows the words and Refresh page; Close hides it; the next failure shows it again", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<OnDemandNotice />);
    expect(screen.queryByTestId("on-demand-failed")).toBeNull();
    act(() => {
      reportOnDemandFailure("a menu's code", new Error("offline"));
    });
    expect(screen.getByTestId("on-demand-failed").textContent).toContain("common.loadFailed");
    fireEvent.click(screen.getByTestId("on-demand-refresh"));
    expect(refreshed).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId("on-demand-close"));
    expect(screen.queryByTestId("on-demand-failed")).toBeNull();
    act(() => {
      reportOnDemandFailure("the map", new Error("offline"));
    });
    expect(screen.getByTestId("on-demand-failed")).toBeTruthy();
    errors.mockRestore();
  });

  it("ODN-2 the notice adds no role to the page, quiet or shown: a page's own status stays the only one", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <>
        <p role="status">the page's own answer</p>
        <OnDemandNotice />
      </>,
    );
    expect(screen.getAllByRole("status")).toHaveLength(1);
    act(() => {
      reportOnDemandFailure("a menu's code", new Error("offline"));
    });
    expect(screen.getByTestId("on-demand-failed")).toBeTruthy();
    expect(screen.getAllByRole("status")).toHaveLength(1);
    errors.mockRestore();
  });

  it("ODN-3 while an overlay is open the notice is drawn inside its outlet (the topmost of two), and back in the shell when it closes", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const page = (overlays: number) => (
      <>
        <OnDemandNotice />
        {overlays >= 1 ? (
          <div data-testid="first-overlay">
            <NoticeOutlet />
          </div>
        ) : null}
        {overlays >= 2 ? (
          <div data-testid="second-overlay">
            <NoticeOutlet />
          </div>
        ) : null}
      </>
    );
    const { rerender } = render(page(2));
    act(() => {
      reportOnDemandFailure("the large map", new Error("offline"));
    });
    const inSecond = screen.getByTestId("second-overlay");
    expect(inSecond.querySelector("[data-testid='on-demand-failed']")).not.toBeNull();
    expect(screen.getAllByTestId("on-demand-failed")).toHaveLength(1);
    const outlet = inSecond.querySelector("[data-notice-outlet]");
    expect(outlet?.getAttribute("aria-live")).toBe("polite");
    expect(outlet?.getAttribute("role")).toBeNull();
    rerender(page(1));
    expect(
      screen.getByTestId("first-overlay").querySelector("[data-testid='on-demand-failed']"),
    ).not.toBeNull();
    rerender(page(0));
    const shown = screen.getByTestId("on-demand-failed");
    expect(shown.closest("[data-notice-outlet]")).toBeNull();
    fireEvent.click(screen.getByTestId("on-demand-close"));
    expect(screen.queryByTestId("on-demand-failed")).toBeNull();
    errors.mockRestore();
  });
});
