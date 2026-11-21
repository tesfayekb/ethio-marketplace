import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FilterDates } from "./filter-dates";

describe("FilterDates (bundle 2)", () => {
  it("FP-U3 two named date boxes; each keeps the other's value and bounds it", () => {
    const change = vi.fn();
    render(
      <FilterDates
        id="d"
        from="2026-01-01"
        to="2026-02-01"
        onChange={change}
        fromLabel="From"
        toLabel="To"
        testId="d"
      />,
    );
    const from = screen.getByLabelText("From");
    const to = screen.getByLabelText("To");
    expect(from).toHaveAttribute("max", "2026-02-01");
    expect(to).toHaveAttribute("min", "2026-01-01");
    fireEvent.change(to, { target: { value: "2026-03-01" } });
    expect(change).toHaveBeenCalledWith({ from: "2026-01-01", to: "2026-03-01" });
  });
});
