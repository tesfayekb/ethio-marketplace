import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FilterChoices } from "./filter-choices";

/** Bundle 11 V2 (INC-543) — a filter is a row of pills, never a dropdown. */
describe("FilterChoices", () => {
  it("HS-15 one pill per choice, the chosen one pressed, a tap reports its value, the empty value is the all pill", () => {
    const onChange = vi.fn();
    render(
      <FilterChoices
        testid="lvl"
        label="Level"
        value="city"
        onChange={onChange}
        options={[
          { value: "", label: "All" },
          { value: "region", label: "Region" },
          { value: "city", label: "City" },
        ]}
      />,
    );
    expect(screen.getByRole("group", { name: "Level" })).toBe(screen.getByTestId("lvl"));
    expect(screen.getByTestId("lvl-all")).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTestId("lvl-city")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("lvl").querySelector("select")).toBeNull();
    fireEvent.click(screen.getByTestId("lvl-region"));
    expect(onChange).toHaveBeenCalledWith("region");
    fireEvent.click(screen.getByTestId("lvl-all"));
    expect(onChange).toHaveBeenLastCalledWith("");
  });
});
