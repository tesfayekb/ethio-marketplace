import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";

const list = loadOnce(() => import("./select-list-body"));

export function readySelectList() {
  return list.ready();
}
/** Intent callers share one download and the shell's one failure notice. */
export function loadSelectList() {
  return list.load().catch((error: unknown) => {
    reportOnDemandFailure("select list choices", error);
    return null;
  });
}
export function preloadSelectList(): void {
  void loadSelectList();
}
