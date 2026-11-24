import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { DIALOG_FIELD } from "@/components/ui/dialog-look";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { loadSelectList, readySelectList } from "./select-list-loader";
import type { SelectListKeys } from "./select-list-body";

export interface SelectListOption {
  value: string;
  label: string;
}

/**
 * DEC-427 — the shared in-flow SELECT, one or several choices (`multiple`), on the one
 * list mechanism (the searchable picker's rows and keys). The list is in the body's flow,
 * full-row width in a panel, never positioned over its footer. Seven rows include All plus
 * six choices; longer lists scroll inside themselves. A long list is searchable.
 */
export type SelectListProps = {
  id: string;
  options: readonly SelectListOption[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  max?: number;
  placeholder: string;
  searchLabel: string;
  noneLabel: string;
  maxLabel?: string;
  allLabel?: string;
  testId: string;
  defaultOpen?: boolean;
  label?: string;
  labelId?: string;
  renderControl?: (control: ReactNode) => ReactNode;
  countLabel?: string;
  disabled?: boolean;
  control?: {
    "aria-invalid"?: true | undefined;
    "aria-describedby"?: string | undefined;
    "aria-required"?: true | undefined;
  };
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
};

export function SelectList({
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
  label,
  labelId,
  renderControl,
  countLabel,
  disabled = false,
  control,
  open: controlledOpen,
  onOpenChange,
}: SelectListProps) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLButtonElement | null>(null);
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = !disabled && (controlledOpen ?? localOpen);
  const setOpen = (next: boolean) => {
    if (next && disabled) return;
    if (onOpenChange) onOpenChange(next);
    else setLocalOpen(next);
  };
  const keysRef = useRef<SelectListKeys | null>(null);
  const [implementation, setImplementation] = useState(readySelectList);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const warm = () => {
    if (disabled || implementation !== null) return;
    void loadSelectList().then((loaded) => {
      if (mounted.current) setImplementation(loaded);
    });
  };
  useEffect(() => {
    if (!open || implementation !== null) return;
    let active = true;
    void loadSelectList().then((loaded) => {
      if (active) setImplementation(loaded);
    });
    return () => {
      active = false;
    };
  }, [open, implementation]);
  // A form sibling changes the flow only on its landed click, never on blur/pointer-down.
  useEffect(() => {
    if (!open || controlledOpen !== undefined) return;
    const landed = (event: Event) => {
      if (event instanceof window.KeyboardEvent && !["Enter", " ", "ArrowDown"].includes(event.key))
        return;
      if (event.target instanceof Node && !wrapRef.current?.contains(event.target)) {
        setLocalOpen(false);
      }
    };
    document.addEventListener("click", landed, true);
    document.addEventListener("keydown", landed, true);
    return () => {
      document.removeEventListener("click", landed, true);
      document.removeEventListener("keydown", landed, true);
    };
  }, [open, controlledOpen]);
  const close = () => setOpen(false);
  const closeToControl = () => {
    close();
    controlRef.current?.focus({ preventScroll: true });
  };
  const keys = (event: KeyboardEvent<HTMLElement>) => {
    if (open) {
      if (keysRef.current !== null) keysRef.current(event);
      else if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeToControl();
      }
      return;
    }
    if (["ArrowDown", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      warm();
      setOpen(true);
    }
  };
  const chosen = options.filter((option) => value.includes(option.value)).map((o) => o.label);
  const trigger = (
    <Button
      {...control}
      disabled={disabled}
      ref={controlRef}
      variant="outline"
      id={id}
      type="button"
      data-testid={testId}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      aria-labelledby={labelId === undefined ? undefined : `${labelId} ${id}`}
      aria-label={
        labelId === undefined && label !== undefined
          ? `${label}: ${chosen.length === 0 ? placeholder : chosen.join(", ")}`
          : undefined
      }
      className={cn(
        "flex min-h-11 w-full min-w-0 items-center gap-2 rounded-md border border-input px-3 text-start text-sm md:pointer-fine:min-h-9",
        DIALOG_FIELD,
      )}
      onKeyDown={keys}
      onMouseEnter={warm}
      onFocus={warm}
      onClick={() => {
        warm();
        if (open) close();
        else setOpen(true);
      }}
    >
      <span className={cn("min-w-0 grow truncate", chosen.length === 0 && "text-muted-foreground")}>
        {chosen.length === 0 ? placeholder : chosen.join(", ")}
      </span>
      {countLabel && value.length > 1 ? (
        <span className="shrink-0 whitespace-nowrap text-sm" data-testid={`${testId}-count`}>
          {countLabel.replace("{n}", String(value.length))}
        </span>
      ) : null}
      <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
    </Button>
  );
  return (
    <div
      ref={wrapRef}
      data-select-list={id}
      className="relative min-w-0"
      onBlur={(event) => {
        // INC-1273 (Decision M): a press on an engine that does not focus a pressed button
        // (macOS WebKit) blurs with no relatedTarget on pointer-DOWN; closing then would move the
        // rows before the press lands. Only focus that moves to an element outside the rows closes.
        const rows = wrapRef.current?.closest("[data-filter-rows]") ?? wrapRef.current;
        const next = event.relatedTarget;
        if (controlledOpen !== undefined && open && next instanceof Node && !rows?.contains(next))
          close();
      }}
    >
      {renderControl === undefined ? trigger : renderControl(trigger)}
      {multiple && value.length >= max && maxLabel ? (
        <p className="mt-1 text-sm text-muted-foreground">{maxLabel.replace("{n}", String(max))}</p>
      ) : null}
      {open ? (
        implementation === null ? (
          <div
            aria-busy="true"
            data-select-list-loading=""
            data-testid={`${testId}-loading`}
            className="mt-3 h-11 w-full md:pointer-fine:h-10"
          />
        ) : (
          <implementation.SelectListBody
            options={options}
            value={value}
            onChange={onChange}
            multiple={multiple}
            max={max}
            searchLabel={searchLabel}
            noneLabel={noneLabel}
            placeholder={placeholder}
            testId={testId}
            listId={listId}
            onClose={closeToControl}
            keysRef={keysRef}
            rowRef={wrapRef}
            {...(allLabel === undefined ? {} : { allLabel })}
            {...(label === undefined ? {} : { label })}
            {...(labelId === undefined ? {} : { labelId })}
          />
        )
      ) : null}
    </div>
  );
}
