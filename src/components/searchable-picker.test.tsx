import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { usePickerKeys } from "./searchable-picker";

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
