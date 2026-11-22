import { useEffect, useState } from "react";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { loadOnce } from "@/lib/load-once";
import type { TableFilter, TableFilterWords } from "./table-filters";

const panel = loadOnce(() => import("./filter-panel-body"));

/** Warm only this table's rows, not the global overlay implementation. */
export function preloadFilterPanel(): void {
  void panel.load().catch((error: unknown) => {
    reportOnDemandFailure("table filter controls", error);
  });
}

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
  return implementation === null ? (
    <div aria-busy="true" data-filter-loading="" className="flex min-w-0 flex-col gap-3">
      {props.filters.map((filter) => (
        <div
          key={filter.id}
          data-filter-placeholder={filter.id}
          aria-hidden="true"
          className={
            filter.kind === "dates" ? "h-24 md:pointer-fine:h-22" : "h-11 md:pointer-fine:h-9"
          }
        />
      ))}
    </div>
  ) : (
    <implementation.FilterPanelBody {...props} />
  );
}
