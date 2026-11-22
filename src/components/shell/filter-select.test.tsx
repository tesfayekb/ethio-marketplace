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
    expect(
      within(screen.getByTestId("sel-list"))
        .getAllByRole("option")
        .slice(1)
        .map((row) => row.textContent),
    ).toEqual(["Place 1", "Place 10", "Place 11"]);
    fireEvent.change(search, { target: { value: "zzz" } });
    expect(screen.getByTestId("sel-list")).toHaveTextContent("None");
  });
});

describe("filter select corrections", () => {
  it("FP-U7 short-list trigger supports Down, arrows and Enter", () => {
    const change = draw();
    const trigger = screen.getByTestId("sel");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(screen.getByTestId("sel-list")).toBeInTheDocument();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "ArrowUp" });
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(change).toHaveBeenCalledWith(["a"]);
  });
  it("FP-U8 list handles Space and stops Escape before the panel", () => {
    const escaped = vi.fn();
    const change = vi.fn();
    render(
      <div onKeyDown={escaped}>
        <FilterSelect
          id="s"
          options={few}
          value={[]}
          onChange={change}
          placeholder="All"
          searchLabel="Search"
          noneLabel="None"
          testId="sel"
          defaultOpen
        />
      </div>,
    );
    const list = screen.getByTestId("sel-list");
    fireEvent.keyDown(list, { key: "ArrowDown" });
    fireEvent.keyDown(list, { key: " " });
    expect(change).toHaveBeenCalledWith(["a"]);
    fireEvent.click(screen.getByTestId("sel"));
    escaped.mockClear();
    fireEvent.keyDown(screen.getByTestId("sel-list"), { key: "Escape" });
    expect(screen.queryByTestId("sel-list")).toBeNull();
    expect(escaped).not.toHaveBeenCalled();
  });
  it("FP-U9 option ids preserve values and All clears every choice", () => {
    const change = draw({ multiple: true, value: ["a", "b"], defaultOpen: true });
    expect(screen.getByTestId("sel-a")).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getByTestId("sel-all"));
    expect(change).toHaveBeenCalledWith([]);
  });
  it("FP-U10 the twenty-choice cap exposes unavailable rows and still allows removal", () => {
    const options = Array.from({ length: 21 }, (_, i) => ({ value: `v${i}`, label: `Value ${i}` }));
    const change = draw({
      options,
      multiple: true,
      value: options.slice(0, 20).map((o) => o.value),
      defaultOpen: true,
    });
    const unavailable = screen.getByTestId("sel-v20");
    expect(unavailable).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(unavailable);
    expect(change).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId("sel-v0"));
    expect(change).toHaveBeenCalledWith(options.slice(1, 20).map((o) => o.value));
  });
});

describe("filter keyboard boundaries", () => {
  it("FP-U11 trigger Escape closes only its list", () => {
    const outside = vi.fn();
    render(
      <div onKeyDown={outside}>
        <FilterSelect
          id="s"
          options={few}
          value={[]}
          onChange={vi.fn()}
          placeholder="All"
          searchLabel="Search"
          noneLabel="None"
          testId="sel"
          defaultOpen
        />
      </div>,
    );
    fireEvent.keyDown(screen.getByTestId("sel"), { key: "Escape" });
    expect(screen.queryByTestId("sel-list")).toBeNull();
    expect(outside).not.toHaveBeenCalled();
  });
  it("FP-U12 search Escape closes only its list", () => {
    const outside = vi.fn();
    render(
      <div onKeyDown={outside}>
        <FilterSelect
          id="s"
          options={many}
          value={[]}
          onChange={vi.fn()}
          placeholder="All"
          searchLabel="Search"
          noneLabel="None"
          testId="sel"
          defaultOpen
        />
      </div>,
    );
    fireEvent.keyDown(screen.getByTestId("sel-search"), { key: "Escape" });
    expect(screen.queryByTestId("sel-list")).toBeNull();
    expect(outside).not.toHaveBeenCalled();
  });
  it("FP-U13 a configured cap refuses keyboard additions while exposing the unavailable row", () => {
    const change = draw({ multiple: true, max: 1, value: ["a"], defaultOpen: true });
    expect(screen.getByTestId("sel-b")).toHaveAttribute("aria-disabled", "true");
    const list = screen.getByTestId("sel-list");
    fireEvent.keyDown(list, { key: "ArrowDown" });
    fireEvent.keyDown(list, { key: "ArrowDown" });
    fireEvent.keyDown(list, { key: "Enter" });
    expect(change).not.toHaveBeenCalled();
  });
});
