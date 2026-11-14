/**
 * W4 D2 — MOVE THE PERSON TO A CONTROL. Its field's box (label included) is
 * scrolled into view, smoothly unless they asked for reduced motion; the box's
 * `scroll-mt-20` keeps the label below the fixed header. Then the control
 * takes focus without a second jump.
 */
export function revealControl(target: HTMLElement, box?: HTMLElement): void {
  const container = box ?? target.closest<HTMLElement>("[data-form-field]") ?? target;
  const reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  container.scrollIntoView?.({ block: "start", behavior: reduced ? "auto" : "smooth" });
  target.focus?.({ preventScroll: true });
}

/** The first of these fields' controls in document order, revealed; by id unless `find` says. */
export function revealFirst(
  fields: readonly string[],
  find: (field: string) => HTMLElement | null = (field) => document.getElementById(field),
): void {
  const targets = fields
    .map((field) => find(field))
    .filter((target): target is HTMLElement => target !== null);
  if (targets.length === 0) return;
  const first = targets.reduce((best, next) =>
    best.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_PRECEDING ? next : best,
  );
  revealControl(first);
}
