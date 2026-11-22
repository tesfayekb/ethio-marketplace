import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { FilterDates } from "./filter-dates";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

describe("FilterDates (bundle 2)", () => {
  beforeAll(async () => {
    await import("./date-calendar");
  }, 30_000);
  it("FP-U3 the two house calendars preserve the other bound and value", async () => {
    const change = vi.fn();
    render(
      <FilterDates
        id="d"
        from="2026-02-10"
        to="2026-02-20"
        onChange={change}
        fromLabel="From"
        toLabel="To"
        testId="d"
      />,
    );
    fireEvent.click(screen.getByTestId("d-from"));
    expect(await screen.findByTestId("d-from-day-2026-02-21")).toBeDisabled();
    expect(screen.getByTestId("d-from-day-2026-02-20")).toBeEnabled();
    expect(screen.getByRole("button", { name: "prim.date.next" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    fireEvent.click(screen.getByTestId("d-from"));
    fireEvent.click(screen.getByTestId("d-to"));
    expect(await screen.findByTestId("d-to-day-2026-02-09")).toBeDisabled();
    expect(screen.getByTestId("d-to-day-2026-02-10")).toBeEnabled();
    expect(screen.getByRole("button", { name: "prim.date.previous" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    fireEvent.click(screen.getByTestId("d-to-day-2026-02-15"));
    expect(change).toHaveBeenCalledWith({ from: "2026-02-10", to: "2026-02-15" });
  });
});
