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
          htmlFor={filter.id}
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
              aria-pressed={filter.value}
              className="min-h-11 w-full md:pointer-fine:min-h-9"
              onClick={() => filter.onChange(!filter.value)}
            >
              {filter.name}
            </Button>
          )}
        </FilterRow>
      ))}
    </div>
  );
}
