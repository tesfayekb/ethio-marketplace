import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/**
 * DEC-026 — the component-test setup. Three jobs only:
 *  1. jest-dom matchers (`toBeVisible`, `toHaveTextContent`, …);
 *  2. an unmount after every test, so no state leaks between cases;
 *  3. the two browser APIs jsdom does not implement but Radix primitives
 *     (dialog, dropdown, sheet) call on mount. Without them the very first
 *     render of any overlay component throws, which is a jsdom gap and not a
 *     defect in the component under test.
 */

if (!("matchMedia" in window)) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

if (!("ResizeObserver" in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

// jsdom has no PointerEvent, so Radix triggers (which open on `pointerdown`
// and read `button`/`ctrlKey`) never fire. The shim is the smallest thing that
// makes a real user gesture reachable from a test.
if (!("PointerEvent" in globalThis)) {
  class TestPointerEvent extends MouseEvent {
    readonly pointerId: number;
    readonly pointerType: string;
    readonly isPrimary: boolean;
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 1;
      this.pointerType = params.pointerType ?? "mouse";
      this.isPrimary = params.isPrimary ?? true;
    }
  }
  globalThis.PointerEvent = TestPointerEvent as unknown as typeof PointerEvent;
}

// Radix uses these for focus-scoped overlays; jsdom ships neither.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

afterEach(() => {
  cleanup();
});
