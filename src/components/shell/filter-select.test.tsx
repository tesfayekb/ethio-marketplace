import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FilterSelect } from "./filter-select";

const few = [
  { value: "a", label: "Open" },
  { value: "b", label: "Closed" },
];
const many = Array.from({ length: 12 }, (_, index) => ({
  value: `v${index}`,
  label: `Place ${index}`,
}));

function draw(props: Partial<Parameters<typeof FilterSelect>[0]> = {}) {
  const change = vi.fn();
  render(
    <FilterSelect
      id="s"
      options={few}
      value={[]}
      onChange={change}
      placeholder="All"
      searchLabel="Search"
      noneLabel="None"
      testId="sel"
      {...props}
    />,
  );
  return change;
}

describe("FilterSelect (bundle 2)", () => {
  it("FP-U4 one choice: it opens under its own row on the picker's rows, a pick closes it", () => {
    const change = draw();
    const control = screen.getByTestId("sel");
    expect(control).toHaveTextContent("All");
    fireEvent.click(control);
    expect(control).toHaveAttribute("aria-expanded", "true");
    const list = screen.getByTestId("sel-list");
    expect(list.closest("[data-placement]")).not.toBeNull();
    expect(screen.queryByTestId("sel-search")).toBeNull();
    fireEvent.click(within(list).getByText("Closed"));
    expect(change).toHaveBeenCalledWith(["b"]);
    expect(screen.queryByTestId("sel-list")).toBeNull();
  });

  it("FP-U5 several choices: a pick adds or removes and the list stays open", () => {
    const change = draw({ multiple: true, value: ["a"] });
    fireEvent.click(screen.getByTestId("sel"));
    const list = screen.getByTestId("sel-list");
    expect(list).toHaveAttribute("aria-multiselectable", "true");
    fireEvent.click(within(list).getByText("Closed"));
    expect(change).toHaveBeenCalledWith(["a", "b"]);
    fireEvent.click(within(list).getByText("Open"));
    expect(change).toHaveBeenLastCalledWith([]);
    expect(screen.getByTestId("sel-list")).toBeInTheDocument();
  });

  it("FP-U6 a long list is searchable; nothing matching says so", () => {
    draw({ options: many });
    fireEvent.click(screen.getByTestId("sel"));
    const search = screen.getByTestId("sel-search");
    fireEvent.change(search, { target: { value: "Place 1" } });
    expect(screen.getAllByTestId("sel-option").map((row) => row.textContent)).toEqual([
      "Place 1",
      "Place 10",
      "Place 11",
    ]);
    fireEvent.change(search, { target: { value: "zzz" } });
    expect(screen.getByTestId("sel-list")).toHaveTextContent("None");
  });
});
