import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FilterRow } from "./filter-row";

describe("FilterRow (bundle 2)", () => {
  it("FP-U1 its name labels its control, beside it", () => {
    render(
      <FilterRow label="Status" htmlFor="s" testId="row">
        <input id="s" />
      </FilterRow>,
    );
    expect(screen.getByLabelText("Status").id).toBe("s");
    expect(screen.getByTestId("row")).toHaveAttribute("data-filter-row");
  });
});
