import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * D234 speed turn S1 — the date field downloads its calendar on first open; a
 * download that fails says so in the calendar's place and (INC-911) offers to
 * refresh the page — the browser keeps a failed download for the page's life, so
 * asking again cannot help. The page never breaks over it.
 */
vi.mock("./date-calendar", () => {
  throw new Error("offline");
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ refreshPage: refreshed }));

const { DateField } = await import("./date-field");

describe("DateField offline (D234)", () => {
  it("DF-6 a calendar that cannot download says so and offers a refresh (INC-911)", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<DateField testid="df" value="" onChange={() => undefined} />);
    fireEvent.click(screen.getByTestId("df"));
    const failed = await screen.findByTestId("df-calendar-failed");
    expect(failed.textContent).toContain("common.loadFailed");
    expect(screen.queryByTestId("df-day-2026-10-11")).toBeNull();
    const refresh = screen.getByTestId("df-calendar-refresh");
    expect(refresh.textContent).toBe("common.refreshPage");
    fireEvent.click(refresh);
    expect(refreshed).toHaveBeenCalledTimes(1);
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the calendar failed to load",
      expect.anything(),
    );
    errors.mockRestore();
  });
});
