import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";

/**
 * D234 speed turn S1 — THE CATEGORY GLYPH MAP LOADS AFTER THE FIRST PAINT.
 * INC-974 (register row 60, "a late part holds its box") — THE NAMES NEVER WAIT FOR IT.
 *
 * category-glyphs.ts imports some 170 lucide icons (14.5 KiB gzipped), so it stays
 * off every public page's first download (PUBLIC_MUST_STAY_LAZY "category-glyphs").
 * The rail's names draw in the first paint (the server's first-rail seed, then the
 * tree read); until this map has arrived, each row holds its glyph's fixed-size box
 * (`glyphPending`), and the glyph fills that box when `settled` turns true — no row
 * moves. One download per visit (src/lib/load-once.ts); a later mount reads it at
 * once. A failed download keeps the names, draws no glyphs, and is reported once to
 * the shell's one notice (INC-911), which offers to refresh the page — the browser
 * keeps a failed download for the page's life (INC-918).
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
