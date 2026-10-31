/**
 * D263/D270 (turn C1, DEC-317) — A PRESS SHOWS AT ONCE. One delegated listener, mounted once
 * in the root (src/routes/__root.tsx), marks the pressed element `data-pressed` the moment a
 * pointer goes down on it (or Enter/Space on the focused one); each primitive's raised look
 * reads that mark through PRESSED (src/components/shell/menu-row.ts). `:active` is not used:
 * on a phone it arrives late or never under a scrolling parent.
 *
 * The mark clears on pointerup, pointercancel, keyup, blur, a scroll, and a touch that moves
 * past PRESS_SLOP (a scroll never flashes a press). A disabled element (`disabled`, or
 * `aria-disabled="true"` on it or above it) is never marked.
 */

/** What can be pressed: a primitive's explicit opt-in, or an element that is tappable by role. */
export const PRESSABLE =
  "[data-pressable],a[href],button,summary,[role=button],[role=link],[role=menuitem],[role=menuitemradio],[role=menuitemcheckbox],[role=option],[role=tab]";

/** A touch that moves farther than this (px) is a scroll, not a press. */
export const PRESS_SLOP = 10;

function isDisabled(el: Element): boolean {
  if ((el as HTMLButtonElement).disabled === true) return true;
  return el.closest('[aria-disabled="true"],[data-disabled]') !== null;
}

/** The element a press at `target` marks, or null. */
export function pressTarget(target: EventTarget | null): Element | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest(PRESSABLE);
  if (el === null || isDisabled(el)) return null;
  return el;
}

export function installPress(doc: Document = document): () => void {
  let pressed: Element | null = null;
  let startX = 0;
  let startY = 0;

  const clear = () => {
    if (pressed !== null) pressed.removeAttribute("data-pressed");
    pressed = null;
  };
  const mark = (el: Element | null) => {
    clear();
    if (el === null) return;
    el.setAttribute("data-pressed", "");
    pressed = el;
  };

  const onDown = (event: Event) => {
    const e = event as PointerEvent;
    if (typeof e.button === "number" && e.button > 0) return;
    startX = e.clientX ?? 0;
    startY = e.clientY ?? 0;
    mark(pressTarget(e.target));
  };
  const onMove = (event: Event) => {
    if (pressed === null) return;
    const e = event as PointerEvent;
    if (Math.hypot((e.clientX ?? 0) - startX, (e.clientY ?? 0) - startY) > PRESS_SLOP) clear();
  };
  const onKeyDown = (event: Event) => {
    const e = event as KeyboardEvent;
    if (e.repeat || (e.key !== "Enter" && e.key !== " ")) return;
    mark(pressTarget(e.target));
  };

  const listeners: Array<[string, (event: Event) => void]> = [
    ["pointerdown", onDown],
    ["pointermove", onMove],
    ["pointerup", clear],
    ["pointercancel", clear],
    ["keydown", onKeyDown],
    ["keyup", clear],
    ["scroll", clear],
    ["focusout", clear],
    ["dragstart", clear],
  ];
  for (const [name, fn] of listeners) doc.addEventListener(name, fn, { capture: true, passive: true });
  const win = doc.defaultView;
  win?.addEventListener("blur", clear);
  return () => {
    clear();
    for (const [name, fn] of listeners) doc.removeEventListener(name, fn, { capture: true });
    win?.removeEventListener("blur", clear);
  };
}
