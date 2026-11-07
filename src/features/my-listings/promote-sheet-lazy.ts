import { resilientLazy } from "@/lib/resilient-lazy";

/**
 * P-2 (b) — the Promote sheet on demand, one wrapper for the list's row menu and
 * the ad page: its code arrives on the first tap, never with either page. A
 * failed download reports through the shell's one notice (INC-911).
 */
export const LazyPromoteSheet = resilientLazy(
  () => import("./promote-sheet").then((module) => module.PromoteSheet),
  "the promote sheet",
  () => null,
);
