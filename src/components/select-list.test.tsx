import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { SelectList } from "./select-list";
const options = Array.from({ length: 12 }, (_, n) => ({ value: `v${n}`, label: `Choice ${n}` }));
function draw(multiple = false, max = 12) {
  const answer = vi.fn();
  function Fixture() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <SelectList
        id="pick"
        testId="pick"
        options={options}
        value={value}
        onChange={(next) => {
          setValue(next);
          answer(next);
        }}
        multiple={multiple}
        max={max}
        placeholder="Choose"
        searchLabel="Search"
        noneLabel="None"
        countLabel="{n} chosen"
      />
    );
  }
  render(<Fixture />);
  fireEvent.click(screen.getByTestId("pick"));
  return answer;
}
describe("the shared flow list", () => {
  it("LSP-U1 one choice answers immediately and closes; Escape also closes", () => {
    const answer = draw();
    fireEvent.click(screen.getByTestId("pick-v1"));
    expect(answer).toHaveBeenLastCalledWith(["v1"]);
    expect(screen.queryByTestId("pick-list")).toBeNull();
    expect(screen.getByTestId("pick")).toHaveFocus();
    fireEvent.click(screen.getByTestId("pick"));
    fireEvent.keyDown(screen.getByTestId("pick-search"), { key: "Escape" });
    expect(screen.queryByTestId("pick-list")).toBeNull();
    expect(screen.getByTestId("pick")).toHaveFocus();
  });
  it("LSP-U2 several choices add and remove in one holder, with a cap", () => {
    const answer = draw(true, 2);
    fireEvent.click(screen.getByTestId("pick-v1"));
    fireEvent.click(screen.getByTestId("pick-v2"));
    expect(answer).toHaveBeenLastCalledWith(["v1", "v2"]);
    fireEvent.click(screen.getByTestId("pick-v3"));
    expect(answer).toHaveBeenCalledTimes(2);
    fireEvent.click(screen.getByTestId("pick-v1"));
    expect(answer).toHaveBeenLastCalledWith(["v2"]);
  });
  it("LSP-U3 a search finds every matching catalogue choice without a forty-row truncation", () => {
    const answer = draw();
    fireEvent.change(screen.getByTestId("pick-search"), { target: { value: "Choice 11" } });
    expect(screen.getAllByRole("option")).toHaveLength(1);
    fireEvent.click(screen.getByTestId("pick-v11"));
    expect(answer).toHaveBeenCalledWith(["v11"]);
  });
  it("LSP-U4 keyboard picks the first real choice when there is no All row", () => {
    const answer = draw();
    fireEvent.keyDown(screen.getByTestId("pick-search"), { key: "Enter" });
    expect(answer).toHaveBeenCalledWith(["v0"]);
  });
});

it("LSP-U5 a sibling opens on the landed click or key, not the preceding focus change", () => {
  render(
    <div>
      {["first", "second"].map((id) => (
        <SelectList
          key={id}
          id={id}
          testId={id}
          options={options.slice(0, 2)}
          value={[]}
          onChange={vi.fn()}
          placeholder="Choose"
          searchLabel="Search"
          noneLabel="None"
        />
      ))}
    </div>,
  );
  fireEvent.click(screen.getByTestId("first"));
  fireEvent.blur(screen.getByTestId("first"), { relatedTarget: screen.getByTestId("second") });
  expect(screen.getByTestId("first-list")).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("second"));
  expect(screen.queryByTestId("first-list")).toBeNull();
  expect(screen.getByTestId("second-list")).toBeInTheDocument();
  fireEvent.keyDown(screen.getByTestId("first"), { key: "ArrowDown" });
  expect(screen.queryByTestId("second-list")).toBeNull();
  expect(screen.getByTestId("first-list")).toBeInTheDocument();
});
