import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";

/**
 * D234 speed turn S1 — THE CATEGORY GLYPH MAP LOADS AFTER THE FIRST PAINT.
 *
 * category-glyphs.ts imports some 170 lucide icons (14.5 KiB gzipped); the rail
 * reached it statically, so every page's first download carried every glyph,
 * though the rail draws a category only once the tree has arrived from
 * /api/categories/tree after hydration. This hook starts the map's download on
 * mount — beside the tree read, so it is usually in hand before the rows can
 * draw — and reports `settled` once it has arrived or failed; the rail keeps its
 * skeleton until then, so a row never draws without its glyph and never shifts.
 * One download per visit (src/lib/load-once.ts); a later mount reads it at once.
 * A failed download draws the rows without glyphs and is reported to the shell's
 * one notice (INC-911), which offers to refresh the page — the browser keeps a
 * failed download for the page's life (INC-918). The bundle budget guard keeps the map off every public page's
 * first download (PUBLIC_MUST_STAY_LAZY "category-glyphs").
 */
export type GlyphReader = (name: string | null | undefined) => LucideIcon | null;

const NO_GLYPH: GlyphReader = () => null;

const GLYPHS = loadOnce(() =>
  import("@/components/shell/category-glyphs").then((module) => module.categoryGlyphOrNull),
);

export function useCategoryGlyphs(): { glyphOf: GlyphReader; settled: boolean } {
  const [state, setState] = useState<{ glyphOf: GlyphReader; settled: boolean }>(() => {
    const ready = GLYPHS.ready();
    return ready === null
      ? { glyphOf: NO_GLYPH, settled: false }
      : { glyphOf: ready, settled: true };
  });
  useEffect(() => {
    if (state.settled) return;
    let live = true;
    GLYPHS.load().then(
      (glyphOf) => {
        if (live) setState({ glyphOf, settled: true });
      },
      (error: unknown) => {
        reportOnDemandFailure("the category glyphs", error);
        if (live) setState({ glyphOf: NO_GLYPH, settled: true });
      },
    );
    return () => {
      live = false;
    };
  }, [state.settled]);
  return state;
}
