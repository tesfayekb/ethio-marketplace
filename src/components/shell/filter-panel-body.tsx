import { useState } from "react";
import { Switch } from "@/components/ui/switch";
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
              // INC-1253: the product's one switch, named by the row's label (which presses it
              // too); its press area is 44 px tall on touch and 36 on a fine pointer.
              <div className="flex min-h-11 items-center md:pointer-fine:min-h-9">
                <Switch
                  id={filter.id}
                  data-testid={filter.id}
                  checked={filter.value}
                  onCheckedChange={filter.onChange}
                  className="relative after:absolute after:inset-x-0 after:-inset-y-3 after:content-[''] md:pointer-fine:after:-inset-y-2"
                />
              </div>
            )}
          </FilterRow>
        ),
      )}
    </div>
  );
}
