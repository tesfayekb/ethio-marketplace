import { Check } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Bundle 11 V2 (D132, INC-543) — ONE FILTER, ONE TAP. A filter inside the
 * Filters panel is a row of pills, one per choice, the chosen one filled with a
 * tick: no dropdown inside a panel, so nothing has to open over something that
 * is already open (a phone could not open the native list inside the panel,
 * INC-543). Choosing a pill applies it at once.
 *
 * Testids: the group `testid`; each pill `${testid}-${value}`, and the empty
 * value ("all") `${testid}-all`. `aria-pressed` carries the choice.
 */
export interface FilterChoice {
  value: string;
  label: string;
}

export function FilterChoices({
  testid,
  label,
  value,
  options,
  onChange,
}: {
  testid: string;
  label: string;
  value: string;
  options: FilterChoice[];
  onChange: (value: string) => void;
}) {
  const labelId = useId();
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span id={labelId} className="text-sm font-semibold text-foreground">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={labelId}
        data-testid={testid}
        className="flex min-w-0 flex-wrap gap-2"
      >
        {options.map((option) => {
          const chosen = option.value === value;
          return (
            <button
              key={option.value === "" ? "all" : option.value}
              type="button"
              aria-pressed={chosen}
              data-testid={`${testid}-${option.value === "" ? "all" : option.value}`}
              onClick={() => onChange(option.value)}
              className={cn(
                "inline-flex h-10 min-w-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                chosen
                  ? "border-primary bg-primary font-semibold text-primary-foreground shadow-tile-on"
                  : "border-input bg-card font-medium text-foreground shadow-xs hover:bg-accent",
              )}
            >
              {chosen ? <Check aria-hidden="true" className="size-4 shrink-0" /> : null}
              <span className="min-w-0 truncate">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FilterChoices;
