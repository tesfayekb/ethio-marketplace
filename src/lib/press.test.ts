// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  installPress,
  PRESS_SLOP,
  RELEASE_MS,
  setTapTick,
  TAP_TICK_KEY,
  tapTickOn,
  TICK_MS,
} from "./press";

function fire(target: EventTarget, type: string, props: Record<string, unknown> = {}) {
  const event = Object.assign(new Event(type, { bubbles: true, cancelable: true }), props);
  target.dispatchEvent(event);
}

describe("press.ts (D263/D270, turn C1)", () => {
  let uninstall: () => void;
  beforeEach(() => {
    document.body.innerHTML = `
      <a href="/x" id="link"><span id="inner">Cars</span></a>
      <button id="btn">Save</button>
      <button id="off" disabled>Off</button>
      <div aria-disabled="true"><a href="/y" id="aoff">No</a></div>
      <p id="text">plain</p>`;
    uninstall = installPress(document);
  });
  afterEach(() => uninstall());
  const $ = (id: string) => document.getElementById(id) as HTMLElement;

  it("PR-U1: pointerdown marks the nearest pressable at once; pointerup clears it", () => {
    fire($("inner"), "pointerdown", { button: 0, clientX: 5, clientY: 5 });
    expect($("link").hasAttribute("data-pressed")).toBe(true);
    expect($("inner").hasAttribute("data-pressed")).toBe(false);
    fire($("inner"), "pointerup");
    expect($("link").hasAttribute("data-pressed")).toBe(false);
  });

  it("PR-U2: Enter and Space mark the focused element; keyup clears it", () => {
    fire($("btn"), "keydown", { key: "Enter" });
    expect($("btn").hasAttribute("data-pressed")).toBe(true);
    fire($("btn"), "keyup", { key: "Enter" });
    expect($("btn").hasAttribute("data-pressed")).toBe(false);
    fire($("btn"), "keydown", { key: " " });
    expect($("btn").hasAttribute("data-pressed")).toBe(true);
    fire($("btn"), "keydown", { key: "a" });
    expect($("btn").hasAttribute("data-pressed")).toBe(true);
  });

  it("PR-U3: pointercancel, a scroll and focus leaving clear the mark", () => {
    for (const end of ["pointercancel", "scroll", "focusout"]) {
      fire($("btn"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
      expect($("btn").hasAttribute("data-pressed")).toBe(true);
      fire(end === "scroll" ? document : $("btn"), end);
      expect($("btn").hasAttribute("data-pressed"), end).toBe(false);
    }
  });

  it("PR-U3b: focus leaving another element (the one focused before) keeps the new press", () => {
    fire($("link"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    fire($("btn"), "focusout");
    expect($("link").hasAttribute("data-pressed")).toBe(true);
  });

  it("PR-U4: one mark at a time; a press on plain text marks nothing", () => {
    fire($("btn"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    fire($("link"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    expect(document.querySelectorAll("[data-pressed]").length).toBe(1);
    expect($("link").hasAttribute("data-pressed")).toBe(true);
    fire($("text"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    expect(document.querySelectorAll("[data-pressed]").length).toBe(0);
  });

  it("PR-U5: a touch that moves past the slop (a scroll) leaves no press", () => {
    fire($("link"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    fire($("link"), "pointermove", { clientX: 0, clientY: PRESS_SLOP - 2 });
    expect($("link").hasAttribute("data-pressed")).toBe(true);
    fire($("link"), "pointermove", { clientX: 0, clientY: PRESS_SLOP + 5 });
    expect($("link").hasAttribute("data-pressed")).toBe(false);
  });

  it("PR-U8: only the release fades — data-released for RELEASE_MS, never before the press ends", () => {
    vi.useFakeTimers();
    try {
      fire($("btn"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
      expect($("btn").hasAttribute("data-released")).toBe(false);
      fire($("btn"), "pointerup");
      expect($("btn").hasAttribute("data-released")).toBe(true);
      // A new press elsewhere ends the earlier fade at once.
      fire($("link"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
      expect($("btn").hasAttribute("data-released")).toBe(false);
      fire($("link"), "pointerup");
      expect($("link").hasAttribute("data-released")).toBe(true);
      vi.advanceTimersByTime(RELEASE_MS + 1);
      expect($("link").hasAttribute("data-released")).toBe(false);
      expect($("btn").hasAttribute("data-released")).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it("PR-U6: a disabled button and an aria-disabled link are never marked", () => {
    fire($("off"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    fire($("aoff"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    fire($("off"), "keydown", { key: "Enter" });
    expect(document.querySelectorAll("[data-pressed]").length).toBe(0);
  });
});

describe("the tap tick (D272, turn C2)", () => {
  let uninstall: () => void;
  let ticks: unknown[];
  beforeEach(() => {
    window.localStorage.clear();
    setTapTick(true);
    ticks = [];
    Object.defineProperty(window.navigator, "vibrate", {
      configurable: true,
      value: (pattern: unknown) => {
        ticks.push(pattern);
        return true;
      },
    });
    document.body.innerHTML = `
      <button id="btn">Save</button>
      <a href="/x" id="link">Terms</a>
      <a href="/r" id="row" data-tick="">Cars</a>
      <div role="tab" id="tab">One</div>
      <button id="quiet" data-tick="off">Quiet</button>`;
    uninstall = installPress(document);
  });
  afterEach(() => {
    uninstall();
    window.localStorage.clear();
    setTapTick(true);
  });
  const $ = (id: string) => document.getElementById(id) as HTMLElement;
  const tap = (el: HTMLElement, pointerType = "touch") => {
    fire(el, "pointerdown", { button: 0, clientX: 0, clientY: 0, pointerType });
    fire(el, "pointerup");
    fire(el, "click");
  };

  it("PR-U7: a touch on a button, a menu row or a tab ticks once (10 ms); plain links, a mouse, keys and the switch turned off never", () => {
    tap($("btn"));
    tap($("row"));
    tap($("tab"));
    expect(ticks).toEqual([TICK_MS, TICK_MS, TICK_MS]);
    expect(TICK_MS).toBe(10);
    tap($("link"));
    tap($("quiet"));
    tap($("btn"), "mouse");
    fire($("btn"), "keydown", { key: "Enter" });
    fire($("btn"), "click");
    expect(ticks).toHaveLength(3);
    setTapTick(false);
    expect(window.localStorage.getItem(TAP_TICK_KEY)).toBe("off");
    expect(tapTickOn()).toBe(false);
    tap($("btn"));
    expect(ticks).toHaveLength(3);
    setTapTick(true);
    expect(tapTickOn()).toBe(true);
    tap($("btn"));
    expect(ticks).toHaveLength(4);
  });
});
