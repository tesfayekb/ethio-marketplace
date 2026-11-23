import { useId } from "react";
import { SelectList, type SelectListOption, type SelectListProps } from "@/components/select-list";
import { FilterRow } from "./filter-row";

export type FilterOption = SelectListOption;
export type FilterSelectProps = Omit<
  SelectListProps,
  "label" | "labelId" | "renderControl" | "countLabel" | "disabled" | "control"
> & { rowLabel?: string };

/** Filters keep their own names-only line, chips and badge; forms alone show a count. */
export function FilterSelect({ rowLabel, ...props }: FilterSelectProps) {
  const labelId = useId();
  return (
    <div data-filter-select={props.id}>
      <SelectList
        {...props}
        allLabel={props.allLabel ?? props.placeholder}
        {...(rowLabel === undefined
          ? {}
          : {
              labelId,
              renderControl: (control) => (
                <FilterRow label={rowLabel} labelId={labelId}>
                  {control}
                </FilterRow>
              ),
            })}
      />
    </div>
  );
}
