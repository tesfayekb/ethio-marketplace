import { Z_NOTICE } from "@/components/layout/layers";

/**
 * Turn W3 (the operator's walk, 2026-11-01) — A NOTICE PINNED TO THE BOTTOM OF A PHONE'S SCREEN
 * IS DOCKED ON THE BOTTOM BAR. Below md it runs from the phone strip's end edge (the strip is
 * `w-12`, app-rail.tsx `rail-strip`; CF-DOCK-1 NDK-4 holds the two equal) to the screen's end
 * edge, its bottom edge on the bar's top edge, under the bar's layer (Z_NOTICE) so the Post
 * disc stays painted and tappable over it. From md (no bar) every class here is off and each
 * notice keeps its own placement and look. No other file computes a fixed bottom from
 * `--bottom-bar` (scripts/conformance/notice-dock.test.ts, CF-DOCK-1).
 */
export const NOTICE_DOCK = `max-md:inset-s-12 max-md:inset-e-0 max-md:bottom-[var(--bottom-bar)] max-md:mx-0 max-md:max-w-none ${Z_NOTICE}`;

/**
 * The docked notice's surface below md: square where it meets the strip, the bar's radius at its
 * end-top corner, the bar's lift turned up, and a bottom padding that clears the disc's rise.
 */
export const NOTICE_DOCK_SURFACE =
  "max-md:max-w-none max-md:rounded-none max-md:rounded-se-bar max-md:shadow-bar-up max-md:p-3 max-md:pb-[calc(var(--bar-rise)+0.75rem)]";
