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
    // INC-085i — measurement is allowed to run often, but a stable result must
    // be a no-op for BOTH React state and the diagnostic DOM attribute.
    let lastApplied = -1;
    const measure = () => {
      frame = 0;
      const top = footer.getBoundingClientRect().top;
      /**
       * U0j-3 — ROUND UP, THEN ADD 1px. Sub-pixel footer tops used to leave the
       * aside's bottom edge fractionally BELOW the footer's top, so the footer
       * painted over the rail's last row (Sign out). Ceil + 1 guarantees the
       * aside always ends strictly above the footer. The margin is only applied
       * while the footer actually intrudes, so the no-footer case stays exactly 0.
       */
      const raw = Math.ceil(window.innerHeight - top);
      const next = raw > 0 ? raw + 1 : 0;
      if (next === lastApplied) return;
      lastApplied = next;
      // U0i-3: publish the applied inset for tests/settle polling.
      const aside = document.querySelector('[data-testid="app-rail"]');
      if (aside && aside.getAttribute("data-rail-inset") !== String(next)) {
        aside.setAttribute("data-rail-inset", String(next));
      }
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
    /**
     * U0j-3 — CONTENT-HEIGHT CHANGES. Switching locale (or any re-render that
     * shortens the page) moves the footer into view WITHOUT a scroll or resize
     * event, so observing the footer alone left the rail clamped at a stale
     * inset. Observing the main content region re-clamps immediately.
     *
     * INC-085h — NEVER OBSERVE document.body HERE. The measured inset is
     * applied to the rail, and the rail is a child of the body: whenever the
     * rail is not taken out of flow (any state where its `fixed` positioning
     * is not in effect — e.g. the stylesheet failed to load), writing the
     * inset changes the body's height, which fires this very observer, which
     * measures a new inset. That is a self-feeding render loop and it is what
     * React reports as "Maximum update depth exceeded" (#185). The observed
     * set must never contain an ancestor whose box the inset can move.
     *
     * INC-085i — the same rule applies to the footer itself. In an unstyled or
     * partially styled first frame the rail is in flow; changing it can move
     * the footer, so observing the footer closes the same feedback loop even
     * after the body observer was removed. Observe content only.
     */
    for (const selector of CONTENT_SELECTORS) {
      const node = document.querySelector(selector);
      if (node) {
        observer.observe(node);
        break;
      }
    }

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
