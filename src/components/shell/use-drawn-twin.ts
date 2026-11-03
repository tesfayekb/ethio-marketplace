import { useCallback, useEffect, useRef, useState } from "react";

/**
 * P-1c (D313) — WHICH TWIN THE PAGE DRAWS. DataTable keeps two renderings of
 * its rows — the cards and the table — and the stylesheet shows one at a time
 * (`cardUntil`). A row's expansion (U3a) used to mount in both, which is fine
 * for plain detail but not for a region with an identity: the inner tables a
 * product opens carry an `id` (a next-link's hash lands on it) and their own
 * controls, and the hidden copy answered `getElementById` first and doubled
 * every test id.
 *
 * The hook reads the two twins' computed `display` and says which is drawn:
 * `"cards"`, `"table"`, or `"both"` while it cannot tell (before the first
 * measurement; a unit render without the stylesheet, where both display and
 * the test reads either). A ResizeObserver on both wrappers tells it when the
 * breakpoint (or the rail, for `tbl-md`) flips one hidden; the write is
 * equality-guarded and the hook never changes what it observes, so mounting
 * the expansion inside a wrapper settles in one pass.
 */
export type DrawnTwin = "cards" | "table" | "both";

type Refs = {
  readonly cards: (node: HTMLElement | null) => void;
  readonly table: (node: HTMLElement | null) => void;
};

function shown(node: HTMLElement | null): boolean {
  return node !== null && node.ownerDocument.defaultView?.getComputedStyle(node).display !== "none";
}

export function useDrawnTwin(): { drawn: DrawnTwin; refs: Refs } {
  const [drawn, setDrawn] = useState<DrawnTwin>("both");
  const cardsNode = useRef<HTMLElement | null>(null);
  const tableNode = useRef<HTMLElement | null>(null);
  const measure = useCallback(() => {
    const cards = shown(cardsNode.current);
    const table = shown(tableNode.current);
    const next: DrawnTwin = cards && !table ? "cards" : table && !cards ? "table" : "both";
    setDrawn((current) => (current === next ? current : next));
  }, []);
  // The wrappers are measured once mounted; a node that leaves is forgotten.
  const cards = useCallback(
    (node: HTMLElement | null) => {
      cardsNode.current = node;
      measure();
    },
    [measure],
  );
  const table = useCallback(
    (node: HTMLElement | null) => {
      tableNode.current = node;
      measure();
    },
    [measure],
  );
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    if (cardsNode.current) observer.observe(cardsNode.current);
    if (tableNode.current) observer.observe(tableNode.current);
    return () => observer.disconnect();
  }, [measure]);
  return { drawn, refs: { cards, table } };
}
