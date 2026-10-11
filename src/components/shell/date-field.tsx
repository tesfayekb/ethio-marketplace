import { CalendarDays, X } from "lucide-react";
import { useId, useState } from "react";
import type { Matcher } from "react-day-picker";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import { isoDay, parseDay } from "./date-day";

/**
 * Bundle 11, turn L1b (INC-549) — THE HOUSE DATE FIELD.
 *
 * A phone's own date picker ignores a field's `min` and `max`: it offers days the
 * field then refuses, and its month moves past the last allowed day. This field
 * opens the app's own calendar instead, the same on every device: days outside
 * the bounds are greyed and cannot be chosen, the month arrows stop at the
 * bounds, and the month and weekday names follow the page's language. The value
 * is a calendar day, "YYYY-MM-DD" (or "" for none), read and written in the
 * person's own calendar — never through UTC, so a day never shifts.
 *
 * The calendar opens inline, under the field, so it lives inside whatever holds
 * the field (a Filters sheet, a form) and never opens a second layer over it.
 */

function firstOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export interface DateFieldProps {
  /** The field's id, for a <label htmlFor>. */
  id?: string;
  testid: string;
  /** "YYYY-MM-DD", or "" for no date. */
  value: string;
  onChange: (next: string) => void;
  /** The earliest day that may be chosen ("YYYY-MM-DD"). */
  min?: string;
  /** The latest day that may be chosen ("YYYY-MM-DD"). */
  max?: string;
  /** Shows the clear button when a day is set (default true). */
  clearable?: boolean;
  className?: string;
}

export function DateField({
  id,
  testid,
  value,
  onChange,
  min,
  max,
  clearable = true,
  className,
}: DateFieldProps) {
  const { t, language } = useI18n();
  const calendarId = useId();
  const [open, setOpen] = useState(false);
  const locale = language === "am" ? "am-ET" : "en-GB";
  const selected = parseDay(value);
  const earliest = min === undefined ? null : parseDay(min);
  const latest = max === undefined ? null : parseDay(max);
  const disabled: Matcher[] = [];
  if (earliest) disabled.push({ before: earliest });
  if (latest) disabled.push({ after: latest });
  // The calendar opens on the chosen day, else on today, kept inside the bounds.
  let shown = selected ?? new Date();
  if (latest && shown > latest) shown = latest;
  if (earliest && shown < earliest) shown = earliest;

  const dayLabel = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const fullLabel = new Intl.DateTimeFormat(locale, { dateStyle: "full" });
  const captionLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const weekdayLabel = new Intl.DateTimeFormat(locale, { weekday: "narrow" });

  return (
    <div className={cn("min-w-0 space-y-2", className)}>
      <div className="flex min-w-0 items-center gap-1">
        <button
          id={id}
          type="button"
          data-testid={testid}
          aria-expanded={open}
          aria-controls={calendarId}
          onClick={() => setOpen((current) => !current)}
          className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 text-start text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          <span
            data-testid={`${testid}-value`}
            className={cn("min-w-0 truncate", selected ? "" : "text-muted-foreground")}
          >
            {selected ? dayLabel.format(selected) : t("prim.date.pick")}
          </span>
        </button>
        {clearable && selected ? (
          <button
            type="button"
            data-testid={`${testid}-clear`}
            aria-label={t("prim.date.clear")}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="flex size-10 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>
      {open ? (
        <div id={calendarId} data-testid={`${testid}-calendar`} className="min-w-0">
          <Calendar
            mode="single"
            selected={selected ?? undefined}
            defaultMonth={shown}
            disabled={disabled}
            showOutsideDays={false}
            {...(earliest ? { startMonth: firstOfMonth(earliest) } : {})}
            {...(latest ? { endMonth: firstOfMonth(latest) } : {})}
            onSelect={(day) => {
              if (!day) return;
              onChange(isoDay(day));
              setOpen(false);
            }}
            formatters={{
              formatCaption: (month) => captionLabel.format(month),
              formatWeekdayName: (day) => weekdayLabel.format(day),
            }}
            labels={{
              labelNext: () => t("prim.date.next"),
              labelPrevious: () => t("prim.date.previous"),
              labelDayButton: (day) => fullLabel.format(day),
            }}
            components={{
              DayButton: (props) => (
                <CalendarDayButton
                  {...props}
                  data-testid={`${testid}-day-${isoDay(props.day.date)}`}
                />
              ),
            }}
            className="rounded-md border border-border"
          />
        </div>
      ) : null}
    </div>
  );
}

export default DateField;
