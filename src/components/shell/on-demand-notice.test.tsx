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
});
