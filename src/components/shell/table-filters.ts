import { useTableView } from "./table-view-store";

export interface TableFilterOption {
  value: string;
  label: string;
}
interface FilterBase {
  id: string;
  name: string;
  chipKey: string;
}
export interface TableSelectFilter extends FilterBase {
  kind: "select";
  value: readonly string[];
  onChange: (value: string[]) => void;
  options: readonly TableFilterOption[];
  multiple?: boolean;
  choicesReady?: boolean;
  /** INC-073: a named address choice overrides kept state without writing it. */
  addressValue?: readonly string[];
  allLabel?: string;
  max?: number;
  kept: boolean;
}
export interface TableTextFilter extends FilterBase {
  kind: "text";
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  kept: false;
}
export interface TableDatesFilter extends Omit<FilterBase, "name"> {
  kind: "dates";
  value: { from: string; to: string };
  onChange: (value: { from: string; to: string }) => void;
  fromLabel: string;
  toLabel: string;
  maxDate: string;
  kept: false;
}
export interface TableSwitchFilter extends FilterBase {
  kind: "switch";
  value: boolean;
  onChange: (value: boolean) => void;
  kept: boolean;
}
export type TableFilter =
  | TableSelectFilter
  | TableTextFilter
  | TableDatesFilter
  | TableSwitchFilter;
export interface TableFilterWords {
  all: string;
  search: string;
  none: string;
  max: string;
}

/** DEC-419/420: one declaration drives rows, chips, count, state, clearing and today's offer. */
export function useTableFilters(tableId: string, declarations: readonly TableFilter[]) {
  const offer = Object.fromEntries(
    declarations.flatMap((filter) => {
      if (!filter.kept) return [];
      return [[filter.id, filter.kind === "select" ? filter.options.map((o) => o.value) : ["on"]]];
    }),
  );
  const view = useTableView(tableId, offer);
  const filters: TableFilter[] = declarations.map((filter) => {
    if (!filter.kept) return filter;
    const kept = Object.prototype.hasOwnProperty.call(view.filters, filter.id)
      ? view.filters[filter.id]
      : undefined;
    if (filter.kind === "switch")
      return {
        ...filter,
        value: kept === undefined ? filter.value : kept.includes("on"),
        onChange: (next: boolean) => {
          view.setFilter(filter.id, next ? ["on"] : []);
          filter.onChange(next);
        },
      };
    if (filter.kind === "select") {
      const allowed = filter.options.map((o) => o.value);
      const value = (filter.addressValue?.length ? filter.addressValue : (kept ?? filter.value))
        .filter((v) => allowed.includes(v))
        .slice(0, filter.multiple ? (filter.max ?? 20) : 1);
      return {
        ...filter,
        value,
        onChange: (next: string[]) => {
          const checked = next
            .filter((v) => allowed.includes(v))
            .slice(0, filter.multiple ? (filter.max ?? 20) : 1);
          view.setFilter(filter.id, checked);
          filter.onChange(checked);
        },
      };
    }
    return filter;
  });
  return {
    ready:
      view.ready &&
      declarations.every((filter) => filter.kind !== "select" || filter.choicesReady !== false),
    filters,
  };
}

/** Reader inputs come from the same checked declarations the panel draws. */
export function filterValues(filters: readonly TableFilter[], id: string): readonly string[] {
  const filter = filters.find((f) => f.id === id);
  return filter?.kind === "select" ? filter.value : [];
}
export function filterOn(filters: readonly TableFilter[], id: string): boolean {
  const filter = filters.find((f) => f.id === id);
  return filter?.kind === "switch" && filter.value;
}

export function clearTableFilters(filters: readonly TableFilter[]): void {
  for (const filter of filters) {
    if (filter.kind === "select") filter.onChange([]);
    else if (filter.kind === "switch") filter.onChange(false);
    else if (filter.kind === "dates") filter.onChange({ from: "", to: "" });
    else filter.onChange("");
  }
}

export function tableFilterState(filters: readonly TableFilter[]): string {
  return JSON.stringify(filters.map((filter) => [filter.id, filter.value]));
}
export function tableFilterChips(filters: readonly TableFilter[]) {
  return filters.flatMap((filter): Array<{ key: string; label: string; onRemove: () => void }> => {
    if (filter.kind === "select")
      return filter.value.flatMap((value, index) => {
        const option = filter.options.find((o) => o.value === value);
        return option === undefined
          ? []
          : [
              {
                key:
                  filter.chipKey === ""
                    ? value
                    : index === 0
                      ? filter.chipKey
                      : `${filter.chipKey}-${value}`,
                label: option.label,
                onRemove: () => filter.onChange(filter.value.filter((v) => v !== value)),
              },
            ];
      });
    if (filter.kind === "switch")
      return filter.value
        ? [{ key: filter.chipKey, label: filter.name, onRemove: () => filter.onChange(false) }]
        : [];
    if (filter.kind === "text")
      return filter.value.trim() === ""
        ? []
        : [
            {
              key: filter.chipKey,
              label: `${filter.name}: ${filter.value.trim()}`,
              onRemove: () => filter.onChange(""),
            },
          ];
    return (["from", "to"] as const).flatMap((side) =>
      filter.value[side] === ""
        ? []
        : [
            {
              key: side,
              label: `${side === "from" ? filter.fromLabel : filter.toLabel} ${filter.value[side]}`,
              onRemove: () => filter.onChange({ ...filter.value, [side]: "" }),
            },
          ],
    );
  });
}
