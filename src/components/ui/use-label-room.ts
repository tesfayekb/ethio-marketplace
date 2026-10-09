import { useLayoutEffect, type DependencyList, type RefObject } from "react";

/**
 * D105: measure the row, never children whose classes the measurement changes.
 * Optional parts step aside in order: first the labels (sr-only), then the
 * elements matching `thenSelector` (hidden), so names keep the room.
 */
export function useLabelRoom(
  rowRef: RefObject<HTMLElement | null>,
  labelRefs: readonly RefObject<HTMLElement | null>[],
  deps: DependencyList,
  thenSelector?: string,
) {
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const visible: HTMLElement[] = [];
      for (const ref of labelRefs) {
        const label = ref.current;
        if (!label) continue;
        label.classList.remove("sr-only");
        if (getComputedStyle(label).display !== "none") visible.push(label);
      }
      const others = thenSelector
        ? Array.from(row.querySelectorAll<HTMLElement>(thenSelector))
        : [];
      for (const element of others) element.classList.remove("hidden");
      const overflows = () => row.scrollWidth > row.clientWidth + 1;
      if (overflows()) {
        for (const label of visible) label.classList.add("sr-only");
        if (overflows()) {
          for (const element of others) element.classList.add("hidden");
        }
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
    // Names/language explicitly govern layout; refs are stable and are read at layout time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
