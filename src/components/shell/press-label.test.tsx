import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PressLabel } from "./press-label";

/** Bundle 11 V2 (D132) — an icon tile says its name while a finger holds it. */
describe("PressLabel", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("HS-17 a held finger shows the name and swallows that press; a short tap and a mouse act as before", () => {
    const onClick = vi.fn();
    render(
      <PressLabel label="Download places">
        <button type="button" data-testid="tile" onClick={onClick} />
      </PressLabel>,
    );
    const tile = screen.getByTestId("tile");

    fireEvent.pointerDown(tile, { pointerType: "touch" });
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Download places");
    fireEvent.pointerUp(tile, { pointerType: "touch" });
    fireEvent.click(tile);
    expect(onClick).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole("tooltip")).toBeNull();

    fireEvent.pointerDown(tile, { pointerType: "touch" });
    act(() => vi.advanceTimersByTime(100));
    fireEvent.pointerUp(tile, { pointerType: "touch" });
    fireEvent.click(tile);
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.pointerDown(tile, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(800));
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.click(tile);
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
