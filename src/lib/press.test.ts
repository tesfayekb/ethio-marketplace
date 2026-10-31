// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { installPress, PRESS_SLOP } from "./press";

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

  it("PR-U6: a disabled button and an aria-disabled link are never marked", () => {
    fire($("off"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    fire($("aoff"), "pointerdown", { button: 0, clientX: 0, clientY: 0 });
    fire($("off"), "keydown", { key: "Enter" });
    expect(document.querySelectorAll("[data-pressed]").length).toBe(0);
  });
});
