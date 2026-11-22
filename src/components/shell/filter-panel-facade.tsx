import { useEffect, useState } from "react";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { loadOnce } from "@/lib/load-once";
import type { TableFilter, TableFilterWords } from "./table-filters";

const panel = loadOnce(() => import("./filter-panel-body"));

/** The overlay preload evaluates neither the calendar nor the failure reporter. */
export function FilterPanelBody(props: {
  filters: readonly TableFilter[];
  words: TableFilterWords;
}) {
  const [implementation, setImplementation] = useState(() => panel.ready());
  useEffect(() => {
    if (implementation !== null) return;
    let mounted = true;
    void panel.load().then(
      (loaded) => {
        if (mounted) setImplementation(loaded);
      },
      (error: unknown) => {
        reportOnDemandFailure("table filter controls", error);
      },
    );
    return () => {
      mounted = false;
    };
  }, [implementation]);
  return implementation === null ? null : <implementation.FilterPanelBody {...props} />;
}
