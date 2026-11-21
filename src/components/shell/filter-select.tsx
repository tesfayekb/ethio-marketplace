import { useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { pickerPopClass, usePickerKeys, usePickerPlacement } from "@/components/picker-popup";
import { LIST_SCROLLER, PickerOption } from "@/components/searchable-picker";
import { DIALOG_FIELD } from "@/components/ui/dialog-look";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

/** A list longer than this shows its search box. */
const SEARCH_FROM = 8;

/**
 * Bundle 2 (INC-1146) — a table filter's SELECT, one or several choices (`multiple`), on the one
 * list mechanism (the searchable picker's rows and keys, the picker's placement inside the
 * visible area: picker-popup.ts). It opens under its own row; a long list is searchable.
 * Presentational: a page wires it in a later bundle.
 */
export function FilterSelect({
  id,
  options,
  value,
  onChange,
  multiple = false,
  placeholder,
  searchLabel,
  noneLabel,
  testId,
  defaultOpen = false,
}: {
  id: string;
  options: readonly FilterOption[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  /** Shown while nothing is chosen. */
  placeholder: string;
  /** The search box's name, and the line when nothing matches: the consumer's words. */
  searchLabel: string;
  noneLabel: string;
  testId: string;
  /** Opens on first draw (the board shows one select open). */
  defaultOpen?: boolean;
}) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(defaultOpen);
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
  const pick = (option: FilterOption) => {
    if (!multiple) {
      onChange(value.includes(option.value) ? [] : [option.value]);
      close();
      return;
    }
    onChange(
      value.includes(option.value)
        ? value.filter((chosen) => chosen !== option.value)
        : [...value, option.value],
    );
  };
  const { highlight, setHighlight, onKeyDown } = usePickerKeys({
    count: shown.length,
    onPick: (index) => {
      const option = shown[index];
      if (option !== undefined) pick(option);
    },
    onEscape: close,
    onOpen: () => setOpen(true),
  });
  const placement = usePickerPlacement(wrapRef, open, shown.length + (searchable ? 1 : 0));
  const chosen = options.filter((option) => value.includes(option.value)).map((o) => o.label);
  return (
    <div
      ref={wrapRef}
      className="relative min-w-0"
      onBlur={(event) => {
        if (open && !wrapRef.current?.contains(event.relatedTarget as Node | null)) close();
      }}
    >
      <button
        id={id}
        type="button"
        data-testid={testId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(
          "flex min-h-11 w-full min-w-0 items-center gap-2 rounded-md border border-input px-3 text-start text-sm md:pointer-fine:min-h-9",
          DIALOG_FIELD,
        )}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <span
          className={cn("min-w-0 grow truncate", chosen.length === 0 && "text-muted-foreground")}
        >
          {chosen.length === 0 ? placeholder : chosen.join(", ")}
        </span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      </button>
      {open ? (
        <div data-placement={placement} className={pickerPopClass(placement)}>
          {searchable ? (
            <input
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
                setHighlight(0);
              }}
              onKeyDown={onKeyDown}
            />
          ) : null}
          <ul
            id={listId}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            data-testid={`${testId}-list`}
            className={LIST_SCROLLER}
          >
            {shown.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">{noneLabel}</li>
            ) : null}
            {shown.map((option, index) => (
              <li key={option.value} role="presentation">
                <PickerOption
                  selected={value.includes(option.value)}
                  highlighted={index === highlight}
                  testId={`${testId}-option`}
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
