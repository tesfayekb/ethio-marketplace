import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";

import { usePickerKeys } from "@/components/picker-popup";
import { PickerOption } from "@/components/searchable-picker";
import { DIALOG_FIELD } from "@/components/ui/dialog-look";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterRow } from "./filter-row";

export interface FilterOption {
  value: string;
  label: string;
}

/** A list longer than this shows its search box. */
const SEARCH_FROM = 8;

/**
 * Bundle 2 (INC-1146) — a table filter's SELECT, one or several choices (`multiple`), on the one
 * list mechanism (the searchable picker's rows and keys). The list is in the body's flow,
 * full-row width in a panel, never positioned over its footer. Seven rows include All plus
 * six choices; longer lists scroll inside themselves. A long list is searchable.
 */
export function FilterSelect({
  id,
  options,
  value,
  onChange,
  multiple = false,
  max = 20,
  placeholder,
  searchLabel,
  noneLabel,
  maxLabel,
  allLabel,
  testId,
  defaultOpen = false,
  rowLabel,
  open: controlledOpen,
  onOpenChange,
}: {
  id: string;
  options: readonly FilterOption[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  max?: number;
  /** Shown while nothing is chosen. */
  placeholder: string;
  /** The search box's name, and the line when nothing matches: the consumer's words. */
  searchLabel: string;
  noneLabel: string;
  maxLabel?: string;
  allLabel?: string;
  testId: string;
  /** Opens on first draw (the board shows one select open). */
  defaultOpen?: boolean;
  /** A panel select owns its whole row, including the full-width list below it. */
  rowLabel?: string;
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
}) {
  const listId = useId();
  const rowLabelId = useId();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLButtonElement | null>(null);
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? localOpen;
  const setOpen = (next: boolean) => {
    if (onOpenChange) onOpenChange(next);
    else setLocalOpen(next);
  };
  const popupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const row = wrapRef.current;
    const body = row?.closest<HTMLElement>("[data-panel-body]");
    if (row === null) return;
    if (body && row.getBoundingClientRect().height > body.clientHeight) {
      body.scrollTop += row.getBoundingClientRect().top - body.getBoundingClientRect().top;
    } else if (typeof row.scrollIntoView === "function") {
      row.scrollIntoView({ block: "nearest" });
    }
  }, [open]);
  const [query, setQuery] = useState("");
  const searchable = options.length > SEARCH_FROM;
  const shown = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return needle === ""
      ? options
      : options.filter((option) => option.label.toLocaleLowerCase().includes(needle));
  }, [options, query]);
  const close = () => {
    setOpen(false);
    setQuery("");
  };
  const closeToControl = () => {
    close();
    controlRef.current?.focus({ preventScroll: true });
  };
  const unavailable = (option: FilterOption) =>
    multiple && !value.includes(option.value) && value.length >= max;
  const pick = (option: FilterOption) => {
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
    count: shown.length + 1,
    onPick: (index) => {
      if (index === 0) {
        onChange([]);
        if (!multiple) closeToControl();
        return;
      }
      const option = shown[index - 1];
      if (option !== undefined) pick(option);
    },
    onEscape: closeToControl,
    onOpen: () => setOpen(true),
  });
  const keys = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      closeToControl();
      return;
    }
    if (!open) {
      if (["ArrowDown", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        setHighlight(0);
        setOpen(true);
      }
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
  const chosen = options.filter((option) => value.includes(option.value)).map((o) => o.label);
  const trigger = (
    <Button
      ref={controlRef}
      variant="outline"
      id={id}
      type="button"
      data-testid={testId}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      aria-labelledby={rowLabel === undefined ? undefined : `${rowLabelId} ${id}`}
      className={cn(
        "flex min-h-11 w-full min-w-0 items-center gap-2 rounded-md border border-input px-3 text-start text-sm md:pointer-fine:min-h-9",
        DIALOG_FIELD,
      )}
      onKeyDown={keys}
      onClick={() => (open ? close() : setOpen(true))}
    >
      <span className={cn("min-w-0 grow truncate", chosen.length === 0 && "text-muted-foreground")}>
        {chosen.length === 0 ? placeholder : chosen.join(", ")}
      </span>
      <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
    </Button>
  );
  return (
    <div
      ref={wrapRef}
      data-filter-select={id}
      className="relative min-w-0"
      onBlur={(event) => {
        const rows = wrapRef.current?.closest("[data-filter-rows]") ?? wrapRef.current;
        if (open && !rows?.contains(event.relatedTarget as Node | null)) close();
      }}
    >
      {rowLabel === undefined ? (
        trigger
      ) : (
        <FilterRow label={rowLabel} labelId={rowLabelId}>
          {trigger}
        </FilterRow>
      )}
      {multiple && value.length >= max && maxLabel ? (
        <p className="mt-1 text-sm text-muted-foreground">{maxLabel.replace("{n}", String(max))}</p>
      ) : null}
      {open ? (
        <div
          data-picker-popup=""
          ref={popupRef}
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
                setHighlight(1);
              }}
              onKeyDown={keys}
            />
          ) : null}
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={rowLabel === undefined ? undefined : rowLabelId}
            aria-multiselectable={multiple || undefined}
            data-testid={`${testId}-list`}
            className="max-h-77 overflow-y-auto overscroll-contain md:pointer-fine:max-h-63"
            onKeyDown={keys}
          >
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
            {shown.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">{noneLabel}</li>
            ) : null}
            {shown.map((option, index) => (
              <li key={option.value} role="presentation">
                <PickerOption
                  selected={value.includes(option.value)}
                  highlighted={index + 1 === highlight}
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
      ) : null}
    </div>
  );
}
