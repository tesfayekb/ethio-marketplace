import { useState } from "react";

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
/** INC-1251: a select's value is the hook's alone; the declaration carries none of its own. */
export interface TableSelectDeclaration extends FilterBase {
  kind: "select";
  options: readonly TableFilterOption[];
  multiple?: boolean;
  choicesReady?: boolean;
  /** INC-073: a named address choice overrides the held value without writing it. */
  addressValue?: readonly string[];
  /** INC-073: a choice writes the address too (the held value is written as well). */
  onAddress?: (next: string[]) => void;
  allLabel?: string;
  max?: number;
  kept: boolean;
}
export interface TableSwitchDeclaration extends FilterBase {
  kind: "switch";
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
export type TableFilterDeclaration =
  | TableSelectDeclaration
  | TableSwitchDeclaration
  | TableTextFilter
  | TableDatesFilter;

/** What the hook answers: every filter with its one value, its setter and a silent clear. */
interface Answered {
  /** Empties this filter without saying "the first page" (Clear all says it once). */
  clear: () => void;
  /** The table's one "a filter changed" (the first page); a no-op when the page names none. */
  changed: () => void;
}
export interface TableSelectFilter extends TableSelectDeclaration, Answered {
  value: readonly string[];
  onChange: (value: string[]) => void;
}
export interface TableSwitchFilter extends TableSwitchDeclaration, Answered {
  value: boolean;
  onChange: (value: boolean) => void;
}
export type TableFilter =
  | TableSelectFilter
  | TableSwitchFilter
  | (TableTextFilter & Answered)
  | (TableDatesFilter & Answered);
export interface TableFilterWords {
  all: string;
  search: string;
  none: string;
  max: string;
}
export interface TableFiltersOptions {
  /** Said once a table: a filter change (or Clear all) shows the first page. */
  onAnyChange?: () => void;
}

const has = (record: Readonly<Record<string, readonly string[]>>, id: string) =>
  Object.prototype.hasOwnProperty.call(record, id);

/**
 * DEC-419/420, INC-1251: one declaration drives rows, chips, count, state, clearing and today's
 * offer. ONE PLACE A FILTER: a kept filter's value lives only in the kept view (signed out, in the
 * view's own memory); a select or switch that is not kept lives only in this hook's map. Nothing is
 * copied from one to the other. Text and dates stay the page's own (never kept, never stored).
 */
export function useTableFilters(
  tableId: string,
  declarations: readonly TableFilterDeclaration[],
  options: TableFiltersOptions = {},
) {
  const offer = Object.fromEntries(
    declarations.flatMap((filter) => {
      if (!filter.kept) return [];
      return [[filter.id, filter.kind === "select" ? filter.options.map((o) => o.value) : ["on"]]];
    }),
  );
  const view = useTableView(tableId, offer);
  const [local, setLocal] = useState<Readonly<Record<string, readonly string[]>>>({});
  const changed = () => options.onAnyChange?.();
  const held = (filter: TableSelectDeclaration | TableSwitchDeclaration): readonly string[] => {
    const source = filter.kept ? view.filters : local;
    return (has(source, filter.id) ? source[filter.id] : undefined) ?? [];
  };
  const hold = (filter: TableSelectDeclaration | TableSwitchDeclaration, next: string[]) => {
    if (filter.kept) view.setFilter(filter.id, next);
    else setLocal((current) => ({ ...current, [filter.id]: next }));
  };
  const filters: TableFilter[] = declarations.map((filter): TableFilter => {
    if (filter.kind === "switch") {
      const set = (next: boolean) => hold(filter, next ? ["on"] : []);
      return {
        ...filter,
        value: held(filter).includes("on"),
        onChange: (next: boolean) => {
          set(next);
          changed();
        },
        clear: () => set(false),
        changed,
      };
    }
    if (filter.kind === "select") {
      const allowed = filter.options.map((o) => o.value);
      const cap = filter.multiple ? (filter.max ?? 20) : 1;
      const check = (values: readonly string[]) =>
        values.filter((v) => allowed.includes(v)).slice(0, cap);
      const set = (next: readonly string[]) => {
        const checked = check(next);
        hold(filter, checked);
        filter.onAddress?.(checked);
      };
      return {
        ...filter,
        value: check(filter.addressValue?.length ? filter.addressValue : held(filter)),
        onChange: (next: string[]) => {
          set(next);
          changed();
        },
        clear: () => set([]),
        changed,
      };
    }
    if (filter.kind === "text")
      return {
        ...filter,
        onChange: (next: string) => {
          filter.onChange(next);
          changed();
        },
        clear: () => filter.onChange(""),
        changed,
      };
    return {
      ...filter,
      onChange: (next: { from: string; to: string }) => {
        filter.onChange(next);
        changed();
      },
      clear: () => filter.onChange({ from: "", to: "" }),
      changed,
    };
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

/** Clear all empties every filter, then says "the first page" ONCE (ruling 1, decision 4). */
export function clearTableFilters(filters: readonly TableFilter[]): void {
  for (const filter of filters) filter.clear();
  filters[0]?.changed();
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
