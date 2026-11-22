import { Suspense } from "react";
import { resilientLazy } from "@/lib/resilient-lazy";
import type { TableFilter, TableFilterWords } from "./table-filters";

const Empty = () => null;
const Body = resilientLazy(
  () => import("./filter-panel-body").then((module) => module.FilterPanelBody),
  "table filter controls",
  Empty,
);

/** Loading the overlay alone must not evaluate the calendar's language reader. */
export function FilterPanelBody(props: {
  filters: readonly TableFilter[];
  words: TableFilterWords;
}) {
  return (
    <Suspense fallback={null}>
      <Body {...props} />
    </Suspense>
  );
}
