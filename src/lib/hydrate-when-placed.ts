/**
 * DEC-266 (INC-913) — THE BROWSER HYDRATES THE SERVER'S FIRST SCREEN ONCE IT IS PLACED.
 *
 * React 19.2 streams a Suspense boundary that finishes after the shell as a hidden segment,
 * `<div hidden id="S:n">` at the end of the body, and reveals it on a timer (no sooner than
 * 300 ms after the first paint; at 2.3 s when it lands between 2.0 and 2.3 s). A boundary
 * still waiting when the browser hydrates is drawn again by React the moment any state above
 * it changes (the auth answer, a strings layer, a shell choice): the server's nodes are
 * replaced (AP-54), and until React's timer fires the page holds two copies, the browser's and
 * the server's hidden one (PP-21, PW-94). So the client entry (src/client.tsx) hydrates once
 * the document has been read and no segment waits: every boundary is then complete, and
 * React hydrates it before it applies any update. A page with no late boundary hydrates as
 * soon as the document has been read.
 */

/** A streamed segment React has not placed yet (pinned against react-dom by HWP-5). */
export const WAITING_SEGMENT = 'div[hidden][id^="S:"]';

/** After the document has been read, how long hydration waits for React to place the segments. */
export const PLACED_DEADLINE_MS = 1500;

export type PlacedOutcome = "placed" | "deadline";

/** The document has been read and React has placed every segment it streamed. */
export function streamPlaced(doc: Document): boolean {
  return doc.readyState !== "loading" && doc.querySelector(WAITING_SEGMENT) === null;
}

/**
 * Resolves "placed" once the first screen is placed, or "deadline" when a segment still waits
 * PLACED_DEADLINE_MS after the document was read (the caller hydrates anyway and says so).
 */
export function whenStreamPlaced(
  doc: Document = document,
  deadlineMs: number = PLACED_DEADLINE_MS,
): Promise<PlacedOutcome> {
  return new Promise((resolve) => {
    if (streamPlaced(doc)) {
      resolve("placed");
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = (outcome: PlacedOutcome) => {
      observer.disconnect();
      doc.removeEventListener("DOMContentLoaded", check);
      if (timer !== undefined) clearTimeout(timer);
      resolve(outcome);
    };
    function check() {
      if (streamPlaced(doc)) finish("placed");
      else if (doc.readyState !== "loading" && timer === undefined)
        timer = setTimeout(() => finish("deadline"), deadlineMs);
    }
    const observer = new MutationObserver(check);
    observer.observe(doc, { childList: true, subtree: true });
    doc.addEventListener("DOMContentLoaded", check);
    check();
  });
}
