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
  PANEL_FADE_MS,
  PANEL_INSET,
  PANEL_OVERLAP,
  SUBMENU_CLOSE_MS,
  SUBMENU_OPEN_MS,
  inSafeTriangle,
  placePanel,
  snapToGrid,
} from "./submenu-geometry";
import { loadOverlays } from "./overlay-loader";

// Reached as the app reaches it: through the overlay loader (CF-OV-1).
const { SubmenuLayer } = (await loadOverlays()).submenu;
type SubmenuLevel = Parameters<typeof SubmenuLayer>[0] extends { itemsOf: (key: string) => infer L }
  ? NonNullable<L>
  : never;

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
      <button type="button" data-testid="opener" {...submenuTriggerProps("vehicles")}>
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
    // D245: flush, the 1 px border overlapping the rail's edge.
    expect(level).toEqual({
      left: 224 - PANEL_OVERLAP,
      top: 200 - PANEL_INSET,
      maxHeight: 736,
      flipped: false,
    });
    const flipped = placePanel({
      ...base,
      edge: { left: 1000, top: 56, right: 1100, bottom: 800 },
      size: { width: 240, height: 300 },
    });
    expect(flipped.flipped).toBe(true);
    expect(flipped.left).toBe(760 + PANEL_OVERLAP);
    const tall = placePanel({ ...base, size: { width: 240, height: 2000 } });
    expect(tall.top).toBe(56);
    expect(tall.maxHeight).toBe(736);
    const rtl = placePanel({
      ...base,
      rtl: true,
      edge: { left: 1056, top: 56, right: 1280, bottom: 800 },
      size: { width: 240, height: 300 },
    });
    expect(rtl.left).toBe(816 + PANEL_OVERLAP);
  });

  it("SMG-1 a low opener's panel rises just enough that its last row is inside (D244)", () => {
    const placed = placePanel({
      anchor: { left: 0, top: 540, right: 224, bottom: 580 },
      edge: { left: 0, top: 56, right: 224, bottom: 600 },
      viewport: { width: 1280, height: 600 },
      rtl: false,
      minTop: 56,
      size: { width: 256, height: 300 },
    });
    expect(placed.top + 300).toBe(600 - 8);
    expect(placed.top).toBeGreaterThanOrEqual(56);
  });

  it("SMG-2 a deeper panel never rises under the top bar (D244)", () => {
    const placed = placePanel({
      anchor: { left: 256, top: 70, right: 512, bottom: 106 },
      edge: { left: 256, top: 56, right: 512, bottom: 592 },
      viewport: { width: 1280, height: 600 },
      rtl: false,
      minTop: 56,
      size: { width: 256, height: 900 },
    });
    expect(placed.top).toBe(56);
    expect(placed.maxHeight).toBe(600 - 8 - 56);
  });

  it("SNP-1 the panel's first row sits on the opener's row, at the menu's row height (D248)", () => {
    const snap = snapToGrid({
      openerTop: 136,
      rowHeight: 36,
      menuTop: 64,
      menuBottom: 568,
      count: 5,
    });
    expect(snap).toEqual({ top: 136, rowHeight: 36, height: 180, scrolls: false });
  });

  it("SNP-2 a panel that would end below the menu's last row moves up by whole rows (D248)", () => {
    // The opener is the 12th of 14 rows (64 + 11 × 36 = 460); 6 rows would end at 676 > 568.
    const snap = snapToGrid({
      openerTop: 460,
      rowHeight: 36,
      menuTop: 64,
      menuBottom: 568,
      count: 6,
    });
    expect(snap.top).toBe(460 - 3 * 36);
    expect(snap.top + snap.height).toBe(568);
    expect((460 - snap.top) % 36).toBe(0);
  });

  it("SNP-3 a panel taller than the menu takes the menu's whole rows at its row height and scrolls (D254, replaces D248's shrink)", () => {
    const menu = { openerTop: 100, rowHeight: 36, menuTop: 64, menuBottom: 568 };
    // 504 px of menu holds exactly 14 rows of 36; 15 rows never shrink to share it.
    expect(snapToGrid({ ...menu, count: 15 })).toEqual({
      top: 64,
      rowHeight: 36,
      height: 504,
      scrolls: true,
    });
    expect(snapToGrid({ ...menu, count: 21 }).rowHeight).toBe(36);
  });

  it("SNP-4 a panel with one row more than the menu holds keeps the row height and scrolls (D254)", () => {
    const menu = { openerTop: 64, rowHeight: 48, menuTop: 64, menuBottom: 64 + 15 * 48 };
    const fits = snapToGrid({ ...menu, count: 15 });
    expect(fits.scrolls).toBe(false);
    const over = snapToGrid({ ...menu, count: 16 });
    expect(over).toEqual({ top: 64, rowHeight: 48, height: 15 * 48, scrolls: true });
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

  it("SMN-7 a closed panel fades for 300 ms, aria-hidden and inert, then goes; none under reduced motion (D245)", async () => {
    // jsdom has no matchMedia: the test lends one and takes it back.
    const motion = (reduce: boolean) => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: (query: string) =>
          ({ matches: reduce && query.includes("reduce"), media: query }) as MediaQueryList,
      });
      return { mockRestore: () => Reflect.deleteProperty(window, "matchMedia") };
    };
    const spy = motion(false);
    const opener = await mount();
    fireEvent.pointerEnter(opener, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(SUBMENU_OPEN_MS));
    expect(panels()[0]?.className).toContain("duration-300");
    fireEvent.pointerLeave(opener, { pointerType: "mouse", clientX: 5000, clientY: 5000 });
    act(() => vi.advanceTimersByTime(SUBMENU_CLOSE_MS));
    expect(panels()).toHaveLength(0);
    const fading = screen.getByTestId("submenu-panel-closing");
    expect(fading.getAttribute("aria-hidden")).toBe("true");
    expect(fading.hasAttribute("inert")).toBe(true);
    expect(fading.style.opacity).toBe("0");
    act(() => vi.advanceTimersByTime(PANEL_FADE_MS - 1));
    expect(screen.queryByTestId("submenu-panel-closing")).not.toBeNull();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByTestId("submenu-panel-closing")).toBeNull();
    spy.mockRestore();
    const still = motion(true);
    fireEvent.pointerEnter(opener, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(SUBMENU_OPEN_MS));
    fireEvent.pointerLeave(opener, { pointerType: "mouse", clientX: 5000, clientY: 5000 });
    act(() => vi.advanceTimersByTime(SUBMENU_CLOSE_MS));
    expect(screen.queryByTestId("submenu-panel-closing")).toBeNull();
    still.mockRestore();
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
    // A tap's click carries its pointer's kind (Chromium dispatches a PointerEvent).
    const tap = new MouseEvent("click", { bubbles: true, cancelable: true });
    Object.defineProperty(tap, "pointerType", { value: "touch" });
    act(() => {
      opener.dispatchEvent(tap);
    });
    expect(panels()).toHaveLength(1);
    expect(panels()[0]?.className).toContain("motion-reduce:transition-none");
  });
});
