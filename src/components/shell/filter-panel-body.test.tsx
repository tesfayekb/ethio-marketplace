import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { FilterPanelBody } from "./filter-panel-body";
import type { TableSelectFilter, TableFilterWords } from "./table-filters";

const words: TableFilterWords = { all: "All", search: "Search", none: "None", max: "Up to {n}" };
const options = Array.from({ length: 10 }, (_, i) => ({ value: `v${i}`, label: `Choice ${i}` }));
const choices = (id: string, onChange = vi.fn()): TableSelectFilter => ({
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
  it("FP-U28 sibling pointer-down keeps the flow stable until one click opens the other select", () => {
    render(<FilterPanelBody filters={[choices("first"), choices("second")]} words={words} />);
    fireEvent.click(screen.getByTestId("first"));
    const search = screen.getByTestId("first-search");
    const second = screen.getByTestId("second");
    fireEvent.pointerDown(second);
    fireEvent.blur(search, { relatedTarget: second });
    expect(screen.getByTestId("first-list")).toBeInTheDocument();
    fireEvent.click(second);
    expect(screen.queryByTestId("first-list")).toBeNull();
    expect(screen.getByTestId("second-list")).toBeInTheDocument();
    fireEvent.blur(screen.getByTestId("second-search"), { relatedTarget: document.body });
    expect(screen.queryByTestId("second-list")).toBeNull();
  });

  it("FP-U29 Escape and a single choice return focus to their select control", () => {
    render(<FilterPanelBody filters={[{ ...choices("focus"), multiple: false }]} words={words} />);
    const control = screen.getByTestId("focus");
    fireEvent.click(control);
    expect(screen.getByTestId("focus-search")).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId("focus-search"), { key: "Escape" });
    expect(control).toHaveFocus();
    expect(screen.queryByTestId("focus-list")).toBeNull();
    fireEvent.click(control);
    fireEvent.click(screen.getByTestId("focus-v0"));
    expect(control).toHaveFocus();
    expect(screen.queryByTestId("focus-list")).toBeNull();
  });

  it("FP-U30 a row taller than the body scrolls its row to the body's top, not its list", () => {
    const { container } = render(
      <div data-panel-body="">
        <FilterPanelBody filters={[choices("tall")]} words={words} />
      </div>,
    );
    const body = container.querySelector<HTMLElement>("[data-panel-body]");
    const row = screen.getByTestId("tall").closest<HTMLElement>(".relative");
    if (!body || !row) throw new Error("missing row or body");
    Object.defineProperty(body, "clientHeight", { configurable: true, value: 200 });
    body.scrollTop = 40;
    vi.spyOn(body, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 100, 300, 200));
    vi.spyOn(row, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 170, 300, 400));
    fireEvent.click(screen.getByTestId("tall"));
    expect(body.scrollTop).toBe(110);
  });
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
  it("FP-U23 opening a list requests nearest scrolling for its row and list", () => {
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
      expect(scroll.mock.instances[0]).toBe(screen.getByTestId("scroll").closest(".relative"));
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
