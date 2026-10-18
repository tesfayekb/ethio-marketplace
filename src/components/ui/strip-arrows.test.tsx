import { fireEvent, render, screen } from "@testing-library/react";
import { createRef, type RefObject } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { StripArrows } from "./strip-arrows";

/**
 * INC-717's second half (bundle 19 turn 25) — a strip that hides its scrollbar
 * shows double-chevron arrows only at the ends where more lies, and a tap
 * scrolls the strip only. jsdom measures nothing, so the strip's sizes and
 * scroll positions are given by Object.defineProperty and its axis by the
 * style attribute.
 */
function renderStrip(vertical: boolean) {
  const stripRef = createRef<HTMLDivElement>() as RefObject<HTMLDivElement | null>;
  render(
    <div style={{ position: "relative" }}>
      <div
        ref={stripRef}
        data-testid="strip"
        style={{ display: "flex", flexDirection: vertical ? "column" : "row", overflow: "auto" }}
      >
        <span data-testid="item">one</span>
        <span>two</span>
        <span>three</span>
      </div>
      <StripArrows stripRef={stripRef} backLabel="Back" moreLabel="More" testIdPrefix="sa" />
    </div>,
  );
  return stripRef.current!;
}

/** The strip's measured sizes and scroll position, as a real browser reports them. */
function measure(
  strip: HTMLElement,
  vertical: boolean,
  { size, client, at }: { size: number; client: number; at: number },
) {
  const [sizeProp, clientProp, atProp] = vertical
    ? (["scrollHeight", "clientHeight", "scrollTop"] as const)
    : (["scrollWidth", "clientWidth", "scrollLeft"] as const);
  Object.defineProperty(strip, sizeProp, { configurable: true, value: size });
  Object.defineProperty(strip, clientProp, { configurable: true, value: client });
  Object.defineProperty(strip, atProp, { configurable: true, writable: true, value: at });
}

describe("StripArrows (INC-717)", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("SA-1 a row: nothing when it fits; » only with more after; both in the middle; « only at the end", () => {
    const strip = renderStrip(false);
    // It fits: no arrow at all.
    measure(strip, false, { size: 300, client: 300, at: 0 });
    fireEvent.scroll(strip);
    expect(screen.queryByTestId("sa-back")).toBeNull();
    expect(screen.queryByTestId("sa-more")).toBeNull();

    // More after only: the start has none.
    measure(strip, false, { size: 900, client: 300, at: 0 });
    fireEvent.scroll(strip);
    expect(screen.queryByTestId("sa-back")).toBeNull();
    expect(screen.getByTestId("sa-more")).toHaveAccessibleName("More");

    // In the middle: both.
    measure(strip, false, { size: 900, client: 300, at: 300 });
    fireEvent.scroll(strip);
    expect(screen.getByTestId("sa-back")).toHaveAccessibleName("Back");
    expect(screen.getByTestId("sa-more")).toHaveAccessibleName("More");

    // At the end: the start only.
    measure(strip, false, { size: 900, client: 300, at: 600 });
    fireEvent.scroll(strip);
    expect(screen.getByTestId("sa-back")).toHaveAccessibleName("Back");
    expect(screen.queryByTestId("sa-more")).toBeNull();
  });

  it("SA-2 a column: the same by top and bottom", () => {
    const strip = renderStrip(true);
    measure(strip, true, { size: 300, client: 300, at: 0 });
    fireEvent.scroll(strip);
    expect(screen.queryByTestId("sa-back")).toBeNull();
    expect(screen.queryByTestId("sa-more")).toBeNull();

    measure(strip, true, { size: 900, client: 300, at: 0 });
    fireEvent.scroll(strip);
    expect(screen.queryByTestId("sa-back")).toBeNull();
    expect(screen.getByTestId("sa-more")).toHaveAccessibleName("More");

    measure(strip, true, { size: 900, client: 300, at: 300 });
    fireEvent.scroll(strip);
    expect(screen.getByTestId("sa-back")).toHaveAccessibleName("Back");
    expect(screen.getByTestId("sa-more")).toHaveAccessibleName("More");

    measure(strip, true, { size: 900, client: 300, at: 600 });
    fireEvent.scroll(strip);
    expect(screen.getByTestId("sa-back")).toHaveAccessibleName("Back");
    expect(screen.queryByTestId("sa-more")).toBeNull();
  });

  it("SA-3 a tap scrolls the strip by its visible length less one item, along its axis; nothing else scrolls", () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const strip = renderStrip(false);
    measure(strip, false, { size: 900, client: 300, at: 0 });
    Object.defineProperty(strip.firstElementChild!, "offsetWidth", {
      configurable: true,
      value: 60,
    });
    const scrollBy = vi.fn();
    strip.scrollBy = scrollBy;
    fireEvent.scroll(strip);

    fireEvent.click(screen.getByTestId("sa-more"));
    expect(scrollBy).toHaveBeenCalledTimes(1);
    expect(scrollBy).toHaveBeenCalledWith({ left: 300 - 60, behavior: "smooth" });
    expect(scrollIntoView).not.toHaveBeenCalled();

    // A column scrolls on its own axis instead.
    vi.unstubAllGlobals();
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    const column = renderStrip(true);
    measure(column, true, { size: 900, client: 200, at: 0 });
    Object.defineProperty(column.firstElementChild!, "offsetHeight", {
      configurable: true,
      value: 50,
    });
    const columnScrollBy = vi.fn();
    column.scrollBy = columnScrollBy;
    fireEvent.scroll(column);
    fireEvent.click(screen.getAllByTestId("sa-more")[1]!);
    expect(columnScrollBy).toHaveBeenCalledWith({ top: 200 - 50, behavior: "smooth" });
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
