import { DateField } from "./date-field";

/** Bundle 2 (INC-1146) — a table filter's pair of DATE boxes, from and to (ISO yyyy-mm-dd). */
export function FilterDates({
  id,
  from,
  to,
  onChange,
  fromLabel,
  toLabel,
  testId,
  maxDate,
}: {
  id: string;
  from: string;
  to: string;
  onChange: (next: { from: string; to: string }) => void;
  /** The two boxes' names, the consumer's words. */
  fromLabel: string;
  toLabel: string;
  testId?: string;
  maxDate?: string;
}) {
  return (
    <div data-testid={testId} className="grid min-w-0 grid-cols-2 gap-2">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm text-muted-foreground">
          {fromLabel}
        </label>
        <DateField
          id={id}
          testid={`${testId ?? id}-from`}
          value={from}
          {...((to === "" ? maxDate : maxDate && maxDate < to ? maxDate : to) === undefined
            ? {}
            : { max: to !== "" && (!maxDate || to < maxDate) ? to : maxDate })}
          onChange={(next) => onChange({ from: next, to })}
        />
      </div>
      <div className="min-w-0">
        <label htmlFor={`${testId ?? id}-to`} className="text-sm text-muted-foreground">
          {toLabel}
        </label>
        <DateField
          id={`${testId ?? id}-to`}
          testid={`${testId ?? id}-to`}
          value={to}
          {...(maxDate === undefined ? {} : { max: maxDate })}
          {...(from === "" ? {} : { min: from })}
          onChange={(next) => onChange({ from, to: next })}
        />
      </div>
    </div>
  );
}
