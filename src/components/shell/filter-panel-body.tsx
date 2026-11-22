import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterRow } from "./filter-row";
import { FilterSelect } from "./filter-select";
import { FilterText } from "./filter-text";
import { FilterDates } from "./filter-dates";
import type { TableFilter, TableFilterWords } from "./table-filters";

/** Only the on-demand overlay imports the real row controls; words arrive from its facade. */
export function FilterPanelBody({
  filters,
  words,
}: {
  filters: readonly TableFilter[];
  words: TableFilterWords;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {filters.map((filter) => (
        <FilterRow
          key={filter.id}
          label={filter.name}
          htmlFor={filter.kind === "dates" ? `${filter.id}-from` : filter.id}
          dates={filter.kind === "dates"}
        >
          {filter.kind === "select" ? (
            <FilterSelect
              id={filter.id}
              testId={filter.id}
              options={filter.options}
              value={filter.value}
              onChange={filter.onChange}
              multiple={filter.multiple ?? false}
              max={filter.max ?? 20}
              placeholder={words.all}
              searchLabel={words.search}
              noneLabel={words.none}
              maxLabel={words.max}
              {...(filter.allLabel === undefined ? {} : { allLabel: filter.allLabel })}
            />
          ) : filter.kind === "text" ? (
            <FilterText
              id={filter.id}
              testId={filter.id}
              value={filter.value}
              onChange={filter.onChange}
              placeholder={filter.placeholder}
            />
          ) : filter.kind === "dates" ? (
            <FilterDates
              id={`${filter.id}-from`}
              testId={filter.id}
              from={filter.value.from}
              to={filter.value.to}
              onChange={filter.onChange}
              fromLabel={filter.fromLabel}
              toLabel={filter.toLabel}
              maxDate={filter.maxDate}
            />
          ) : (
            <Button
              id={filter.id}
              data-testid={filter.id}
              type="button"
              variant="outline"
              role="switch"
              aria-label={filter.name}
              aria-checked={filter.value}
              className="size-11 px-0 md:pointer-fine:size-9"
              onClick={() => filter.onChange(!filter.value)}
            >
              <Check aria-hidden="true" className={filter.value ? "opacity-100" : "opacity-0"} />
            </Button>
          )}
        </FilterRow>
      ))}
    </div>
  );
}
