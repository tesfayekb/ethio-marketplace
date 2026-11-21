import { Input } from "@/components/ui/input";

/** Bundle 2 (INC-1146) — a table filter's pair of DATE boxes, from and to (ISO yyyy-mm-dd). */
export function FilterDates({
  id,
  from,
  to,
  onChange,
  fromLabel,
  toLabel,
  testId,
}: {
  id: string;
  from: string;
  to: string;
  onChange: (next: { from: string; to: string }) => void;
  /** The two boxes' names, the consumer's words. */
  fromLabel: string;
  toLabel: string;
  testId?: string;
}) {
  const box = "min-h-11 md:pointer-fine:min-h-9";
  return (
    <div data-testid={testId} className="grid min-w-0 grid-cols-2 gap-2">
      <Input
        id={id}
        type="date"
        aria-label={fromLabel}
        data-testid={testId === undefined ? undefined : `${testId}-from`}
        className={box}
        value={from}
        max={to === "" ? undefined : to}
        onChange={(event) => onChange({ from: event.target.value, to })}
      />
      <Input
        type="date"
        aria-label={toLabel}
        data-testid={testId === undefined ? undefined : `${testId}-to`}
        className={box}
        value={to}
        min={from === "" ? undefined : from}
        onChange={(event) => onChange({ from, to: event.target.value })}
      />
    </div>
  );
}
