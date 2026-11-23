import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { usePickerKeys } from "@/components/picker-popup";
import { PickerOption } from "@/components/searchable-picker";
import { FLOW_LIST_SCROLLER } from "./shell/menu-row";
import type { SelectListProps, SelectListOption } from "./select-list";

export type SelectListKeys = (event: KeyboardEvent<HTMLElement>) => void;
export type SelectListBodyProps = Pick<
  SelectListProps,
  | "options"
  | "value"
  | "onChange"
  | "searchLabel"
  | "noneLabel"
  | "allLabel"
  | "label"
  | "labelId"
  | "placeholder"
  | "testId"
> & {
  multiple: boolean;
  max: number;
  listId: string;
  onClose: () => void;
  keysRef: RefObject<SelectListKeys | null>;
  rowRef: RefObject<HTMLDivElement | null>;
};
const SEARCH_FROM = 8;

/** Only an intent-fetched module owns search, rows, picker keys and panel scrolling. */
export function SelectListBody({
  options,
  value,
  onChange,
  multiple,
  max,
  searchLabel,
  noneLabel,
  allLabel,
  label,
  labelId,
  placeholder,
  testId,
  listId,
  onClose,
  keysRef,
  rowRef,
}: SelectListBodyProps) {
  const [query, setQuery] = useState("");
  const searchable = options.length > SEARCH_FROM;
  const shown = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return needle === ""
      ? options
      : options.filter((option) => option.label.toLocaleLowerCase().includes(needle));
  }, [options, query]);
  const closeToControl = onClose;
  const unavailable = (option: SelectListOption) =>
    multiple && !value.includes(option.value) && value.length >= max;
  const pick = (option: SelectListOption) => {
    if (unavailable(option)) return;
    if (!multiple) {
      onChange(value.includes(option.value) ? [] : [option.value]);
      closeToControl();
      return;
    }
    onChange(
      value.includes(option.value)
        ? value.filter((chosen) => chosen !== option.value)
        : [...value, option.value],
    );
  };
  const { highlight, setHighlight, onKeyDown } = usePickerKeys({
    count: shown.length + (allLabel === undefined ? 0 : 1),
    onPick: (index) => {
      if (allLabel !== undefined && index === 0) {
        onChange([]);
        if (!multiple) closeToControl();
        return;
      }
      const option = shown[index - (allLabel === undefined ? 0 : 1)];
      if (option !== undefined) pick(option);
    },
    onEscape: closeToControl,
  });
  const keys = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeToControl();
      return;
    }
    // Reuse the picker's arrows and selection; Space is Enter outside the text search.
    if (event.key === " " && !(event.target instanceof HTMLInputElement)) {
      event.preventDefault();
      onKeyDown({
        ...event,
        key: "Enter",
        preventDefault: () => event.preventDefault(),
      } as KeyboardEvent<HTMLInputElement>);
      return;
    }
    onKeyDown(event as KeyboardEvent<HTMLInputElement>);
  };

  useLayoutEffect(() => {
    keysRef.current = keys;
    return () => {
      keysRef.current = null;
    };
  });
  useEffect(() => {
    const row = rowRef.current;
    const body = row?.closest<HTMLElement>("[data-panel-body]");
    if (row === null) return;
    if (body && row.getBoundingClientRect().height > body.clientHeight) {
      body.scrollTop += row.getBoundingClientRect().top - body.getBoundingClientRect().top;
    } else if (typeof row.scrollIntoView === "function") row.scrollIntoView({ block: "nearest" });
  }, [rowRef]);
  return (
    <>
      <div
        data-picker-popup=""
        data-placement="flow"
        className="mt-3 w-full min-w-0 overflow-hidden rounded-md border border-border bg-popover shadow-control"
      >
        {searchable ? (
          <input
            type="search"
            autoFocus
            data-testid={`${testId}-search`}
            role="combobox"
            aria-expanded={true}
            aria-controls={listId}
            aria-label={searchLabel}
            placeholder={searchLabel}
            autoComplete="off"
            className="mb-1 min-h-11 w-full rounded-list-row border-b border-border bg-popover px-3 text-base text-foreground focus-visible:outline-none"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlight(allLabel === undefined ? 0 : 1);
            }}
            onKeyDown={keys}
          />
        ) : null}
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          aria-label={labelId === undefined ? (label ?? placeholder) : undefined}
          aria-multiselectable={multiple || undefined}
          data-testid={`${testId}-list`}
          className={FLOW_LIST_SCROLLER}
          onKeyDown={keys}
        >
          {allLabel !== undefined ? (
            <li role="presentation">
              <PickerOption
                selected={value.length === 0}
                highlighted={highlight === 0}
                testId={`${testId}-all`}
                data={{ value: "" }}
                onPick={() => {
                  onChange([]);
                  if (!multiple) closeToControl();
                }}
              >
                <span className="min-w-0 grow truncate">{allLabel ?? placeholder}</span>
              </PickerOption>
            </li>
          ) : null}
          {shown.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">{noneLabel}</li>
          ) : null}
          {shown.map((option, index) => (
            <li key={option.value} role="presentation">
              <PickerOption
                selected={value.includes(option.value)}
                highlighted={index + (allLabel === undefined ? 0 : 1) === highlight}
                unavailable={unavailable(option)}
                testId={`${testId}-${option.value}`}
                data={{ value: option.value }}
                onPick={() => pick(option)}
              >
                <span className="min-w-0 grow truncate">{option.label}</span>
              </PickerOption>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
