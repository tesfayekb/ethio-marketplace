import { afterEach, describe, expect, it, vi } from "vitest";
import { installInputModality } from "./input-modality";

afterEach(() => {
  installInputModality()();
  delete document.documentElement.dataset.input;
});
describe("input modality", () => {
  it("leaves the initial marker unset", () => {
    installInputModality();
    expect(document.documentElement.dataset.input).toBeUndefined();
  });
  it("marks pointer input", () => {
    installInputModality();
    document.dispatchEvent(new PointerEvent("pointerdown"));
    expect(document.documentElement.dataset.input).toBe("pointer");
  });
  it("marks keyboard input", () => {
    installInputModality();
    document.dispatchEvent(new KeyboardEvent("keydown"));
    expect(document.documentElement.dataset.input).toBe("keyboard");
  });
  it("removes both capture listeners", () => {
    const remove = installInputModality();
    document.dispatchEvent(new PointerEvent("pointerdown"));
    remove();
    document.dispatchEvent(new KeyboardEvent("keydown"));
    expect(document.documentElement.dataset.input).toBe("pointer");
    delete document.documentElement.dataset.input;
    document.dispatchEvent(new PointerEvent("pointerdown"));
    expect(document.documentElement.dataset.input).toBeUndefined();
  });
  it("a second install adds no second listener", () => {
    const add = vi.spyOn(document, "addEventListener");
    const remove = installInputModality();
    expect(installInputModality()).toBe(remove);
    expect(add.mock.calls.filter(([type]) => type === "pointerdown" || type === "keydown")).toEqual([
      ["pointerdown", expect.any(Function), true], ["keydown", expect.any(Function), true],
    ]);
  });
});
