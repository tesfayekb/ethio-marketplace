/**
 * D263/D270 (turn C1, DEC-317) — A PRESS SHOWS AT ONCE. One delegated listener, mounted once
 * in the root (src/routes/__root.tsx), marks the pressed element `data-pressed` the moment a
 * pointer goes down on it (or Enter/Space on the focused one); each primitive's raised look
 * reads that mark through PRESSED (src/components/shell/menu-row.ts). `:active` is not used:
 * on a phone it arrives late or never under a scrolling parent.
 *
 * Turn C2: a cleared mark leaves `data-released` on the element for RELEASE_MS, and only
 * that mark carries the fade (PRESS_MOTION), so no other change of look ever fades.
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

/**
 * D272 (turn C2, DEC-317 item 5) — THE TAP TICK. What ticks: menu items, tabs, segments, the
 * bottom bar, list rows and buttons — by role, or by a primitive's `data-tick` (the menu rows,
 * breadcrumb segments and bottom-bar items, which are links). Plain text links and cards do
 * not tick. A primitive that must stay silent carries `data-tick="off"`.
 */
export const TICKABLE =
  '[data-tick]:not([data-tick="off"]),button:not([data-tick="off"]),[role=button],[role=menuitem],[role=menuitemradio],[role=menuitemcheckbox],[role=option],[role=tab],[role=switch],[role=radio]';

/** The tick's length (ms): one light tick. */
export const TICK_MS = 10;

/** The device's choice (the Settings switch, "This device"); on unless turned off. */
export const TAP_TICK_KEY = "ethio.tapTick";

const tickListeners = new Set<() => void>();

/** Whether this device ticks on a tap. Storage that cannot be read keeps the default (on). */
export function tapTickOn(): boolean {
  try {
    return globalThis.localStorage?.getItem(TAP_TICK_KEY) !== "off";
  } catch {
    // A blocked storage has no stored choice: the default stands (nothing to report).
    return true;
  }
}

/** Keeps this device's choice; a storage that refuses the write keeps it for this page only. */
let tickHeld: boolean | null = null;
export function setTapTick(on: boolean): void {
  tickHeld = on;
  try {
    if (on) globalThis.localStorage?.removeItem(TAP_TICK_KEY);
    else globalThis.localStorage?.setItem(TAP_TICK_KEY, "off");
  } catch (error) {
    console.warn("[tap-tick] the choice is kept for this page only", error);
  }
  for (const fn of tickListeners) fn();
}

/** The switch's store (useSyncExternalStore). */
export function subscribeTapTick(fn: () => void): () => void {
  tickListeners.add(fn);
  return () => tickListeners.delete(fn);
}
export function tapTickSnapshot(): boolean {
  return tickHeld ?? tapTickOn();
}

/** The element an activation at `target` ticks for, or null. */
export function tickTarget(target: EventTarget | null): Element | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest(TICKABLE);
  if (el === null || isDisabled(el)) return null;
  // A plain link or a card inside a tickable region is still a link: it does not tick.
  const press = target.closest(PRESSABLE);
  if (press !== null && press !== el && el.contains(press)) return null;
  return el;
}

/** How long a released element keeps `data-released` (its 120 ms fade, with a frame to spare). */
export const RELEASE_MS = 160;

export function installPress(doc: Document = document): () => void {
  const timers = new Map<Element, ReturnType<typeof setTimeout>>();
  const released = (el: Element) => {
    const prior = timers.get(el);
    if (prior !== undefined) clearTimeout(prior);
    el.setAttribute("data-released", "");
    timers.set(
      el,
      setTimeout(() => {
        el.removeAttribute("data-released");
        timers.delete(el);
      }, RELEASE_MS),
    );
  };
  let pressed: Element | null = null;
  let lastPointer = "";
  let startX = 0;
  let startY = 0;

  const clear = () => {
    if (pressed !== null) {
      pressed.removeAttribute("data-pressed");
      released(pressed);
    }
    pressed = null;
  };
  // A new press ends every earlier release's fade at once: what the new press changes (a
  // chosen option making its opener current) is never drawn mid-fade.
  const settle = () => {
    for (const [el, timer] of timers) {
      clearTimeout(timer);
      el.removeAttribute("data-released");
    }
    timers.clear();
  };
  const mark = (el: Element | null) => {
    clear();
    settle();
    if (el === null) return;
    el.setAttribute("data-pressed", "");
    pressed = el;
  };

  const onDown = (event: Event) => {
    const e = event as PointerEvent;
    if (typeof e.button === "number" && e.button > 0) return;
    lastPointer = e.pointerType ?? "";
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

  // Focus leaving the pressed element ends its press; a press that moves focus away from
  // another element (the one focused before) keeps its own mark.
  const onFocusOut = (event: Event) => {
    if (pressed === null) return;
    const from = event.target;
    if (from instanceof Node && (from === pressed || pressed.contains(from))) clear();
  };

  // D272 — one tick per activation, only after a touch (the coarse pointer), only when the
  // device's switch is on and the browser can vibrate.
  const onClick = (event: Event) => {
    const touched = lastPointer === "touch";
    lastPointer = "";
    if (!touched || !tapTickSnapshot()) return;
    if (tickTarget(event.target) === null) return;
    const nav = doc.defaultView?.navigator;
    if (nav === undefined || typeof nav.vibrate !== "function") return;
    nav.vibrate(TICK_MS);
  };

  const listeners: Array<[string, (event: Event) => void]> = [
    ["click", onClick],
    ["pointerdown", onDown],
    ["pointermove", onMove],
    ["pointerup", clear],
    ["pointercancel", clear],
    ["keydown", onKeyDown],
    ["keyup", clear],
    ["scroll", clear],
    ["focusout", onFocusOut],
    ["dragstart", clear],
  ];
  for (const [name, fn] of listeners)
    doc.addEventListener(name, fn, { capture: true, passive: true });
  const win = doc.defaultView;
  win?.addEventListener("blur", clear);
  return () => {
    clear();
    settle();
    for (const [name, fn] of listeners) doc.removeEventListener(name, fn, { capture: true });
    win?.removeEventListener("blur", clear);
  };
}
