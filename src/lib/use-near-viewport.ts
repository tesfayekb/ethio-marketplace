import { useEffect, useState, type RefObject } from "react";

/**
 * D234 speed turn S1 — BELOW-THE-FOLD WORK STARTS WHEN ITS PLACE NEARS THE SCREEN.
 *
 * A part of a public page that a visitor may never scroll to (the ad page's map,
 * its similar ads) downloads nothing — no library, no read, no picture — until
 * its box comes within `margin` of the screen; then it latches true and stays
 * true. On a phone on a slow network this keeps those bytes and round trips off
 * the page's first seconds, and off the bill of a visitor who leaves first.
 *
 * `enabled: false` answers true at once (a surface that wants its work now, such
 * as the seller's own preview inside the wizard). Without IntersectionObserver
 * (very old browsers) it answers true at once: the work is never lost, only
 * early. The server render and the hydrating render both start from the same
 * answer (false when enabled), so hydration never differs.
 */
export const NEAR_VIEWPORT_MARGIN = "400px";

export function useNearViewport(
  ref: RefObject<Element | null>,
  { enabled = true, margin = NEAR_VIEWPORT_MARGIN }: { enabled?: boolean; margin?: string } = {},
): boolean {
  const [near, setNear] = useState(!enabled);
  useEffect(() => {
    if (near) return;
    if (!enabled) {
      setNear(true);
      return;
    }
    const box = ref.current;
    if (box === null) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${margin} 0px ${margin} 0px` },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [near, enabled, margin, ref]);
  return near;
}
