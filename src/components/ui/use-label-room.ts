import { useLayoutEffect, type DependencyList, type RefObject } from "react";

/** D105: measure the row, never children whose classes the measurement changes. */
export function useLabelRoom(
  rowRef: RefObject<HTMLElement | null>,
  labelRefs: readonly RefObject<HTMLElement | null>[],
  deps: DependencyList,
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
      if (row.scrollWidth > row.clientWidth + 1) {
        for (const label of visible) label.classList.add("sr-only");
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
