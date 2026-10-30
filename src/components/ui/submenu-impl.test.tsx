import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SUBMENU_SIGNALS, submenuTriggerProps } from "@/components/shell/submenu/submenu-signal";

import {
  PANEL_INSET,
  SUBMENU_CLOSE_MS,
  SUBMENU_OPEN_MS,
  inSafeTriangle,
  placePanel,
} from "./submenu-geometry";
import type { SubmenuLevel } from "./submenu-impl";

const { SubmenuLayer } = await import("./submenu-impl");

/**
 * SMN-1…SMN-6 (DEC-288, turn R1b) — the sub-menu mechanism: placement, the safe
 * triangle, the hover intent's 150/300 ms timings (D98), the keys, and a tap.
 */
const LEVELS: Record<string, SubmenuLevel> = {
  vehicles: {
    header: "Vehicles",
    items: [
      {
        key: "cars",
        label: "Cars",
        testid: "rail-category-cars",
        to: "/c/$slug",
        hasChildren: true,
      },
      {
        key: "trucks",
        label: "Trucks",
        testid: "rail-category-trucks",
        to: "/c/$slug",
        hasChildren: false,
      },
    ],
  },
  cars: {
    header: "Cars",
    items: [
      {
        key: "sedans",
        label: "Sedans",
        testid: "rail-category-sedans",
        to: "/c/$slug",
        hasChildren: false,
      },
    ],
  },
};

function Harness() {
  return (
    <aside>
      <button type="button" data-testid="opener" {...submenuTriggerProps("vehicles", false)}>
        Vehicles
      </button>
      <SubmenuLayer
        itemsOf={(key) => LEVELS[key] ?? null}
        edgeOf={(el) => el.closest("aside") ?? el}
        showHeader={false}
        signals={SUBMENU_SIGNALS}
      />
    </aside>
  );
}

async function mount() {
  const rootRoute = createRootRoute({ component: Harness });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  render(<RouterProvider router={router} />);
  const opener = await screen.findByTestId("opener");
  vi.useFakeTimers();
  return opener;
}

const panels = () => screen.queryAllByTestId("submenu-panel");

describe("the sub-menu mechanism (DEC-288)", () => {
  afterEach(() => vi.useRealTimers());

  it("SMN-1 the panel's first row is level with its trigger, flips at the edge and is clamped when tall", () => {
    const base = {
      anchor: { left: 0, top: 200, right: 224, bottom: 240 },
      edge: { left: 0, top: 56, right: 224, bottom: 800 },
      viewport: { width: 1280, height: 800 },
      rtl: false,
      minTop: 56,
    };
    const level = placePanel({ ...base, size: { width: 240, height: 300 } });
    expect(level).toEqual({ left: 224, top: 200 - PANEL_INSET, maxHeight: 736, flipped: false });
    const flipped = placePanel({
      ...base,
      edge: { left: 1000, top: 56, right: 1100, bottom: 800 },
      size: { width: 240, height: 300 },
    });
    expect(flipped.flipped).toBe(true);
    expect(flipped.left).toBe(760);
    const tall = placePanel({ ...base, size: { width: 240, height: 2000 } });
    expect(tall.top).toBe(56);
    expect(tall.maxHeight).toBe(736);
    const rtl = placePanel({
      ...base,
      rtl: true,
      edge: { left: 1056, top: 56, right: 1280, bottom: 800 },
      size: { width: 240, height: 300 },
    });
    expect(rtl.left).toBe(816);
  });

  it("SMN-2 the safe triangle holds a diagonal move to the panel and nothing outside it", () => {
    const panel = { left: 224, top: 100, right: 464, bottom: 500 };
    const apex = { x: 200, y: 220 };
    expect(inSafeTriangle({ x: 215, y: 260 }, apex, panel, false)).toBe(true);
    expect(inSafeTriangle({ x: 210, y: 400 }, apex, panel, false)).toBe(false);
    expect(
      inSafeTriangle(
        { x: 1065, y: 260 },
        { x: 1080, y: 220 },
        { ...panel, left: 816, right: 1056 },
        true,
      ),
    ).toBe(true);
  });

  it("SMN-3 a hover opens after 150 ms, never before, and closes 300 ms after the pointer leaves", async () => {
    const opener = await mount();
    fireEvent.pointerEnter(opener, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(SUBMENU_OPEN_MS - 1));
    expect(panels()).toHaveLength(0);
    act(() => vi.advanceTimersByTime(1));
    expect(panels()).toHaveLength(1);
    expect(screen.getByTestId("rail-category-cars")).toBeTruthy();
    fireEvent.pointerLeave(opener, { pointerType: "mouse", clientX: 5000, clientY: 5000 });
    act(() => vi.advanceTimersByTime(SUBMENU_CLOSE_MS - 1));
    expect(panels()).toHaveLength(1);
    act(() => vi.advanceTimersByTime(1));
    expect(panels()).toHaveLength(0);
  });

  it("SMN-4 entering the panel keeps it open; a second-level row opens the third level beside it", async () => {
    const opener = await mount();
    fireEvent.pointerEnter(opener, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(SUBMENU_OPEN_MS));
    fireEvent.pointerLeave(opener, { pointerType: "mouse", clientX: 5000, clientY: 5000 });
    const [panel] = panels();
    if (!panel) throw new Error("SMN-4 no panel");
    fireEvent.pointerEnter(panel, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(SUBMENU_CLOSE_MS * 2));
    expect(panels()).toHaveLength(1);
    fireEvent.pointerEnter(screen.getByTestId("rail-category-cars"), { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(SUBMENU_OPEN_MS));
    expect(panels().map((p) => p.dataset["level"])).toEqual(["2", "3"]);
    expect(screen.getByTestId("rail-category-sedans")).toBeTruthy();
  });

  it("SMN-5 the arrow key enters the panel's first row; Escape closes it and focus returns to the opener", async () => {
    const opener = await mount();
    opener.focus();
    fireEvent.keyDown(opener, { key: "ArrowRight" });
    act(() => vi.advanceTimersByTime(20));
    expect(document.activeElement).toBe(screen.getByTestId("rail-category-cars"));
    fireEvent.keyDown(document.activeElement as Element, { key: "ArrowDown" });
    expect(document.activeElement).toBe(screen.getByTestId("rail-category-trucks"));
    fireEvent.keyDown(document.activeElement as Element, { key: "Escape" });
    expect(panels()).toHaveLength(0);
    expect(document.activeElement).toBe(opener);
  });

  it("SMN-6 a tap opens the panel at once; a mouse hover alone never opens on touch", async () => {
    const opener = await mount();
    fireEvent.pointerEnter(opener, { pointerType: "touch" });
    act(() => vi.advanceTimersByTime(SUBMENU_OPEN_MS * 2));
    expect(panels()).toHaveLength(0);
    fireEvent.pointerDown(opener, { pointerType: "touch" });
    fireEvent.click(opener);
    expect(panels()).toHaveLength(1);
    expect(panels()[0]?.className).toContain("motion-safe:");
  });
});
