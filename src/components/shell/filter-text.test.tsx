import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FilterText } from "./filter-text";

describe("FilterText (bundle 2)", () => {
  it("FP-U2 a search box 44 px on touch that reports each keystroke", () => {
    const change = vi.fn();
    render(<FilterText id="q" value="" onChange={change} testId="q" />);
    const box = screen.getByTestId("q");
    expect(box).toHaveAttribute("type", "search");
    expect(box.className).toContain("min-h-11");
    fireEvent.change(box, { target: { value: "car" } });
    expect(change).toHaveBeenCalledWith("car");
  });
});
