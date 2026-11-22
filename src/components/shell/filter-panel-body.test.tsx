import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { FilterPanelBody } from "./filter-panel-body";
import type { TableFilter, TableFilterWords } from "./table-filters";

const words: TableFilterWords = { all: "All", search: "Search", none: "None", max: "Up to {n}" };
const options = Array.from({ length: 10 }, (_, i) => ({ value: `v${i}`, label: `Choice ${i}` }));
const choices = (id: string, onChange = vi.fn()): TableFilter => ({
  kind: "select",
  id,
  chipKey: id,
  name: id,
  kept: true,
  value: [],
  multiple: true,
  onChange,
  options,
});

describe("a small panel's filter lists", () => {
  it("FP-U22 opening another row closes the first list and preserves search and choice contracts", () => {
    const change = vi.fn();
    render(
      <FilterPanelBody filters={[choices("first", change), choices("second")]} words={words} />,
    );
    fireEvent.click(screen.getByTestId("first"));
    expect(screen.getByTestId("first")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("first-search")).toHaveAttribute("role", "combobox");
    expect(screen.getByTestId("first-list")).toHaveAttribute("role", "listbox");
    expect(screen.getAllByRole("option")).toHaveLength(11);
    fireEvent.click(screen.getByTestId("first-v0"));
    expect(change).toHaveBeenCalledWith(["v0"]);
    fireEvent.click(screen.getByTestId("second"));
    expect(screen.queryByTestId("first-list")).toBeNull();
    expect(screen.getByTestId("first")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("second-list")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("second-all"));
    expect(screen.getByTestId("second-list")).toBeInTheDocument();
  });
  it("FP-U23 opening a list requests nearest scrolling for that list", () => {
    const original = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollIntoView");
    const scroll = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scroll,
    });
    try {
      render(<FilterPanelBody filters={[choices("scroll")]} words={words} />);
      act(() => fireEvent.click(screen.getByTestId("scroll")));
      expect(scroll).toHaveBeenCalledWith({ block: "nearest" });
      expect(scroll.mock.instances[0]).toBe(screen.getByTestId("scroll-list").parentElement);
    } finally {
      if (original) Object.defineProperty(HTMLElement.prototype, "scrollIntoView", original);
      else Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
    }
  });
  it("FP-U27 the missing-picture switch keeps its id, test id and pressed-state behavior", () => {
    function Harness() {
      const [value, onChange] = useState(false);
      return (
        <FilterPanelBody
          words={words}
          filters={[
            {
              kind: "switch",
              id: "category-missing-filter",
              chipKey: "missing",
              name: "Missing picture",
              kept: true,
              value,
              onChange,
            },
          ]}
        />
      );
    }
    render(<Harness />);
    const control = screen.getByTestId("category-missing-filter");
    expect(control).toHaveAttribute("id", "category-missing-filter");
    expect(control).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(control);
    expect(control).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(control);
    expect(control).toHaveAttribute("aria-pressed", "false");
  });
});
