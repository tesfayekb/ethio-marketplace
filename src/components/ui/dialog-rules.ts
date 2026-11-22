import { DESTRUCTIVE_FILL } from "./button-variants";

/** Each panel's rules arrive with its modal; the opener object is its stable lifetime key. */
const panels = new WeakMap<object, HTMLElement>();

export function recordPanel(event: Event, opener: object): void {
  if (event.target instanceof HTMLElement) panels.set(opener, event.target);
}

/** Radix asks on document capture; leave Escape for the panel's open list first. */
export function keepOpenList(event: KeyboardEvent, opener: object): void {
  if (panels.get(opener)?.querySelector("[data-picker-popup]")) event.preventDefault();
}

const isRed = (element: Element) => element.classList.contains(DESTRUCTIVE_FILL);
const FOCUSABLE =
  'input:not([type=hidden]):not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/** Preserve the opening-focus law without carrying it on a page's first download. */
export function focusAwayFromRed(event: Event): void {
  const panel = event.currentTarget ?? event.target;
  if (!(panel instanceof HTMLElement)) return;
  const all = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
  const first = all[0];
  if (first === undefined || !isRed(first)) return;
  const field = all.find((element) => element.matches("input, textarea, select"));
  const target = field ?? all.find((element) => !isRed(element));
  if (target === undefined) return;
  event.preventDefault();
  target.focus({ preventScroll: true });
}
