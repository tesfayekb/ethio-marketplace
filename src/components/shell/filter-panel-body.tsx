import { useState } from "react";
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
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  return (
    <div
      data-filter-rows=""
      className="flex min-w-0 flex-col gap-3"
      onClickCapture={(event) => {
        // Decision M: never move in-flow rows on pointer-down; close on the landed click.
        if (event.target instanceof Element && !event.target.closest("[data-filter-select]"))
          setOpenSelect(null);
      }}
    >
      {filters.map((filter) =>
        filter.kind === "select" ? (
          <FilterSelect
            key={filter.id}
            id={filter.id}
            testId={filter.id}
            rowLabel={filter.name}
            open={openSelect === filter.id}
            onOpenChange={(open) => setOpenSelect(open ? filter.id : null)}
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
        ) : filter.kind === "dates" ? (
          <FilterDates
            key={filter.id}
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
          <FilterRow key={filter.id} label={filter.name} htmlFor={filter.id}>
            {filter.kind === "text" ? (
              <FilterText
                id={filter.id}
                testId={filter.id}
                value={filter.value}
                onChange={filter.onChange}
                placeholder={filter.placeholder}
              />
            ) : (
              <Button
                id={filter.id}
                data-testid={filter.id}
                type="button"
                variant="ghost"
                aria-label={filter.name}
                aria-pressed={filter.value}
                className="size-11 px-0 md:pointer-fine:size-9"
                onClick={() => filter.onChange(!filter.value)}
              >
                <span
                  aria-hidden="true"
                  className={`inline-flex h-6 w-10 items-center rounded-full p-1 ${filter.value ? "bg-primary" : "bg-input"}`}
                >
                  <span
                    className={`size-4 rounded-full bg-card shadow-control transition-transform motion-reduce:transition-none ${filter.value ? "translate-x-4 rtl:-translate-x-4" : "translate-x-0"}`}
                  />
                </span>
              </Button>
            )}
          </FilterRow>
        ),
      )}
    </div>
  );
}
