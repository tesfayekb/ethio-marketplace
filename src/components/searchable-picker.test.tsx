import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { chosenFirst } from "@/lib/chosen-first";

import { PickerOption, usePickerKeys } from "./searchable-picker";

function Box({
  count,
  onPick,
  onEscape,
}: {
  count: number;
  onPick: (i: number) => void;
  onEscape: () => void;
}) {
  const { highlight, onKeyDown } = usePickerKeys({ count, onPick, onEscape });
  return <input data-testid="box" data-highlight={highlight} onKeyDown={onKeyDown} readOnly />;
}

describe("bundle 4 step 11 — the shared picker's one keyboard behaviour", () => {
  it("arrows move within the rows, Enter picks the highlighted row, Escape closes", () => {
    const onPick = vi.fn();
    const onEscape = vi.fn();
    render(<Box count={3} onPick={onPick} onEscape={onEscape} />);
    const box = screen.getByTestId("box");
    for (let i = 0; i < 5; i += 1) fireEvent.keyDown(box, { key: "ArrowDown" });
    expect(box.getAttribute("data-highlight")).toBe("2");
    fireEvent.keyDown(box, { key: "ArrowUp" });
    fireEvent.keyDown(box, { key: "Enter" });
    expect(onPick).toHaveBeenCalledWith(1);
    fireEvent.keyDown(box, { key: "Escape" });
    expect(onEscape).toHaveBeenCalledTimes(1);
  });
  it("Enter on an empty list picks nothing", () => {
    const onPick = vi.fn();
    render(<Box count={0} onPick={onPick} onEscape={() => undefined} />);
    fireEvent.keyDown(screen.getByTestId("box"), { key: "Enter" });
    expect(onPick).not.toHaveBeenCalled();
  });
});

describe("bundle 7 B2 — the current choice is first and marked", () => {
  it("marks the selected row with a check and no other row", () => {
    render(
      <div>
        <PickerOption
          selected={true}
          highlighted={false}
          testId="row-a"
          data={{}}
          onPick={() => {}}
        >
          A
        </PickerOption>
        <PickerOption
          selected={false}
          highlighted={false}
          testId="row-b"
          data={{}}
          onPick={() => {}}
        >
          B
        </PickerOption>
      </div>,
    );
    expect(screen.queryByTestId("row-a-check")).not.toBeNull();
    expect(screen.queryByTestId("row-b-check")).toBeNull();
  });
  it("draws the choice first, matching or not, and never twice", () => {
    const same = (a: string, b: string) => a === b;
    expect(chosenFirst(["x", "y"], "z", same)).toEqual(["z", "x", "y"]);
    expect(chosenFirst(["x", "z", "y"], "z", same)).toEqual(["z", "x", "y"]);
    expect(chosenFirst(["x"], null, same)).toEqual(["x"]);
  });
});
