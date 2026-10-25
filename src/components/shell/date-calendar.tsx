import type { Matcher } from "react-day-picker";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

import { isoDay } from "./date-day";

/**
 * D234 speed turn S1 — the house date field's calendar, in its own module so
 * react-day-picker downloads only when a field opens it (date-field.tsx loads
 * this lazily). Every choice it draws is the field's: the bounds, the language's
 * month and weekday names, the labels and the day test ids.
 */
export interface DateCalendarProps {
  testid: string;
  selected: Date | undefined;
  defaultMonth: Date;
  disabled: Matcher[];
  startMonth: Date | undefined;
  endMonth: Date | undefined;
  onPick: (day: Date) => void;
  formatCaption: (month: Date) => string;
  formatWeekdayName: (day: Date) => string;
  labelNext: string;
  labelPrevious: string;
  labelDayButton: (day: Date) => string;
}

export default function DateCalendar({
  testid,
  selected,
  defaultMonth,
  disabled,
  startMonth,
  endMonth,
  onPick,
  formatCaption,
  formatWeekdayName,
  labelNext,
  labelPrevious,
  labelDayButton,
}: DateCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={selected}
      defaultMonth={defaultMonth}
      disabled={disabled}
      showOutsideDays={false}
      {...(startMonth ? { startMonth } : {})}
      {...(endMonth ? { endMonth } : {})}
      onSelect={(day) => {
        if (!day) return;
        onPick(day);
      }}
      formatters={{ formatCaption, formatWeekdayName }}
      labels={{
        labelNext: () => labelNext,
        labelPrevious: () => labelPrevious,
        labelDayButton,
      }}
      components={{
        DayButton: (props) => (
          <CalendarDayButton {...props} data-testid={`${testid}-day-${isoDay(props.day.date)}`} />
        ),
      }}
      className="rounded-md border border-border"
    />
  );
}
