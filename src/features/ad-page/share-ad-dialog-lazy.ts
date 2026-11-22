import { resilientLazy } from "@/lib/resilient-lazy";

/** Share content is requested only when opened; failed downloads reach the shell notice. */
export const LazyShareAdDialog = resilientLazy(
  () => import("./share-ad-dialog").then((module) => module.ShareAdDialog),
  "the share dialog",
  () => null,
);
