import { useEffect, useState } from "react";

/** The footer wrapper AppShell renders below the grid (U0h). */
const FOOTER_SELECTOR = '[data-testid="shell-footer-wrapper"]';
/** U0j-3 — content whose height changes without a scroll (locale switch). */
const CONTENT_SELECTORS = ["#main", "main"];


/**
 * U0i — HOW FAR THE FOOTER INTRUDES INTO THE VIEWPORT.
 *
 * `inset = max(0, innerHeight - footerRect.top)`: zero while the footer is
 * below the fold, growing to the footer's height once it is fully in view.
 * The fixed rail uses it as its `bottom`, so the rail's box ENDS at the
 * footer's top edge instead of continuing underneath it — which is what makes
 * the rail's last items and its scrollbar reachable at the page bottom.
 *
 * SSR-safe: the first render always returns 0 (the same value the server
 * produced), and the real measurement lands in an effect after hydration.
 * Listeners are passive; a ResizeObserver catches footer height changes that
 * no scroll or resize event would report.
 */
export function useFooterInset(): number {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const footer = document.querySelector(FOOTER_SELECTOR);
    if (!footer) return;

    let frame = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const measure = () => {
      frame = 0;
      const top = footer.getBoundingClientRect().top;
      const next = Math.max(0, Math.round(window.innerHeight - top));
      // U0i-3: publish the applied inset for tests/settle polling.
      const aside = document.querySelector('[data-testid="app-rail"]');
      if (aside) aside.setAttribute("data-rail-inset", String(next));
      setInset((prev) => (prev === next ? prev : next));
    };
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };
    /**
     * U0i-3 — SETTLE. rAF coalescing can leave the inset one frame behind the
     * final scroll position. `scrollend` flushes synchronously; a 120ms
     * debounce covers browsers without it.
     */
    const flush = () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      measure();
    };
    const scheduleSettle = () => {
      schedule();
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(flush, 120);
    };

    measure();
    window.addEventListener("scroll", scheduleSettle, { passive: true });
    window.addEventListener("scrollend", flush, { passive: true });
    window.addEventListener("resize", scheduleSettle, { passive: true });
    const observer = new ResizeObserver(schedule);
    observer.observe(footer);

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      if (settleTimer) clearTimeout(settleTimer);
      window.removeEventListener("scroll", scheduleSettle);
      window.removeEventListener("scrollend", flush);
      window.removeEventListener("resize", scheduleSettle);
      observer.disconnect();
    };
  }, []);

  return inset;
}
