import { useEffect, useState } from "react";
import { loadFilterPanel, readyFilterPanel } from "./filter-panel-loader";
import type { TableFilter, TableFilterWords } from "./table-filters";

/** The overlay preload evaluates neither the calendar nor the failure reporter. */
export function FilterPanelBody(props: {
  filters: readonly TableFilter[];
  words: TableFilterWords;
}) {
  const [implementation, setImplementation] = useState(readyFilterPanel);
  useEffect(() => {
    if (implementation !== null) return;
    let mounted = true;
    void loadFilterPanel().then((loaded) => {
      if (mounted) setImplementation(loaded);
    });
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
