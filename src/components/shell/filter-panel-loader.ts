import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { loadOnce } from "@/lib/load-once";

import { loadSelectList } from "../select-list-loader";

const panel = loadOnce(() => import("./filter-panel-body"));

export function readyFilterPanel() {
  return panel.ready();
}

/** The loader owns the failure answer; callers never receive an unhandled rejection. */
export function loadFilterPanel() {
  return Promise.all([panel.load(), loadSelectList()])
    .then(([loaded]) => loaded)
    .catch((error: unknown) => {
      reportOnDemandFailure("table filter controls", error);
      return null;
    });
}

/** Warm only this table's rows, not the global overlay implementation. */
export function preloadFilterPanel(): void {
  void loadFilterPanel();
}
