import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * D234 speed turn S1 — the date field downloads its calendar on first open; a
 * download that fails says so with "Try again", which asks once more. The page
 * never breaks over it.
 */
let attempts = 0;
vi.mock("./date-calendar", () => {
  attempts += 1;
  throw new Error("offline");
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));

const { DateField } = await import("./date-field");

describe("DateField offline (D234)", () => {
  it("DF-6 a calendar that cannot download offers Try again, which asks once more", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<DateField testid="df" value="" onChange={() => undefined} />);
    fireEvent.click(screen.getByTestId("df"));
    const retry = await screen.findByTestId("df-calendar-retry");
    expect(retry.textContent).toBe("common.tryAgain");
    expect(screen.queryByTestId("df-day-2026-10-11")).toBeNull();
    const before = attempts;
    fireEvent.click(retry);
    expect(await screen.findByTestId("df-calendar-retry")).toBeTruthy();
    expect(attempts).toBeGreaterThan(before);
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the calendar failed to load",
      expect.anything(),
    );
    errors.mockRestore();
  });
});
