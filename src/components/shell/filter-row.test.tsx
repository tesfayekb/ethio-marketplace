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

  it("FP-U53 the row is as tall as a row control: 44 px on touch, 36 on a fine pointer, whatever its control", () => {
    render(
      <FilterRow label="Missing picture" htmlFor="m" testId="row">
        <button id="m" type="button" role="switch" aria-checked="false" />
      </FilterRow>,
    );
    const classes = screen.getByTestId("row").className.split(/\s+/);
    expect(classes).toEqual(expect.arrayContaining(["min-h-11", "md:pointer-fine:min-h-9"]));
  });
});
