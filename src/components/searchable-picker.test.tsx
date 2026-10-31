import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { chosenFirst } from "@/lib/chosen-first";

import { useRef } from "react";
import {
  PickerOption,
  pickerGeometry,
  placeList,
  usePickerKeys,
  usePickerPlacement,
} from "./searchable-picker";

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

describe("F3 shared picker horizontal placement", () => {
  it("uses the control's start when its content fits the 16px gutter", () => {
    expect(pickerGeometry({ left: 32, right: 232, width: 200 }, 240, 360)).toEqual({
      align: "start",
      anchorWidth: 200,
      availableWidth: 312,
    });
  });

  it("opens from the phone-code control's end when start would cross the gutter", () => {
    expect(pickerGeometry({ left: 70, right: 166, width: 96 }, 288, 360)).toEqual({
      align: "end",
      anchorWidth: 96,
      availableWidth: 150,
    });
  });

  it("uses logical edges in RTL and caps width to the viewport less 32px", () => {
    expect(pickerGeometry({ left: 194, right: 290, width: 96 }, 400, 360, true)).toEqual({
      align: "end",
      anchorWidth: 96,
      availableWidth: 150,
    });
  });

  it("the placement mechanism exposes open and closed state on its owned control", () => {
    function OwnedPicker({ open }: { open: boolean }) {
      const ref = useRef<HTMLDivElement>(null);
      const placement = usePickerPlacement(ref, open, 2);
      return (
        <div ref={ref}>
          <button aria-haspopup="listbox" data-testid="owned-control" />
          {open && <div data-placement={placement} />}
        </div>
      );
    }
    const { rerender } = render(<OwnedPicker open />);
    expect(screen.getByTestId("owned-control")).toHaveAttribute("data-state", "open");
    rerender(<OwnedPicker open={false} />);
    expect(screen.getByTestId("owned-control")).toHaveAttribute("data-state", "closed");
  });
});

describe("D267 — placeList: an open list stays inside the visible area", () => {
  const area = { top: 140, bottom: 700 };
  it("PL-U1: room below opens down at once, no scroll", () => {
    expect(placeList({ top: 200, bottom: 244 }, 256, area, 1000)).toEqual({
      side: "down",
      maxHeight: 256,
      scrollBy: 0,
    });
  });
  it("PL-U2: short below with room to scroll scrolls first, then opens down whole", () => {
    const plan = placeList({ top: 400, bottom: 444 }, 300, area, 1000);
    expect(plan.side).toBe("down");
    expect(plan.scrollBy).toBe(44);
    expect(plan.maxHeight).toBe(300);
  });
  it("PL-U3: a page that cannot scroll opens on the larger side, bounded", () => {
    const plan = placeList({ top: 600, bottom: 644 }, 600, area, 0);
    expect(plan).toEqual({ side: "up", maxHeight: 460, scrollBy: 0 });
  });
  it("PL-U4: a tiny area bounds the height both ways", () => {
    const tiny = { top: 140, bottom: 300 };
    const down = placeList({ top: 150, bottom: 194 }, 256, tiny, 0);
    expect(down).toEqual({ side: "down", maxHeight: 106, scrollBy: 0 });
    const up = placeList({ top: 250, bottom: 294 }, 256, tiny, 0);
    expect(up).toEqual({ side: "up", maxHeight: 110, scrollBy: 0 });
  });
  it("PL-U5: the scroll never lifts the control above the area's top", () => {
    const plan = placeList({ top: 160, bottom: 204 }, 900, area, 1000);
    expect(plan.scrollBy).toBe(20);
    expect(plan.side).toBe("down");
    expect(plan.maxHeight).toBe(700 - 204 + 20);
  });
});
