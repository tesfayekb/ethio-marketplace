import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { isoDay, parseDay } from "./date-day";
import { DateField } from "./date-field";

/**
 * Bundle 11, turn L1b (INC-549) — the house date field. The phone's own picker
 * offered days its field refused; this calendar never offers them: days outside
 * the bounds are disabled, and the month arrows stop at the bounds.
 */
const language = { current: "en" };
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: language.current,
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

function Harness(props: {
  initial?: string;
  min?: string;
  max?: string;
  onChange?: (next: string) => void;
}) {
  const [value, setValue] = useState(props.initial ?? "");
  return (
    <DateField
      testid="df"
      value={value}
      min={props.min}
      max={props.max}
      onChange={(next) => {
        setValue(next);
        props.onChange?.(next);
      }}
    />
  );
}

describe("DateField (INC-549)", () => {
  // D234 S1 — the field loads its calendar lazily; transform it once up front so
  // the first test's wait is the field's, not the test runner compiling the module.
  beforeAll(async () => {
    await import("./date-calendar");
  });
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 11, 10, 0, 0));
    language.current = "en";
  });
  afterEach(() => vi.useRealTimers());

  it("DF-1 a day after the latest bound is disabled, and the month cannot move past it", async () => {
    render(<Harness max="2026-10-11" />);
    fireEvent.click(screen.getByTestId("df"));
    expect(screen.getByTestId("df-calendar")).toBeTruthy();
    // D234 S1 — the calendar arrives on first open (date-calendar.tsx, lazy).
    expect(((await screen.findByTestId("df-day-2026-10-11")) as HTMLButtonElement).disabled).toBe(
      false,
    );
    expect((screen.getByTestId("df-day-2026-10-12") as HTMLButtonElement).disabled).toBe(true);
    const next = screen.getByRole("button", { name: "prim.date.next" }) as HTMLButtonElement;
    expect(next.disabled || next.getAttribute("aria-disabled") === "true").toBe(true);
    const previous = screen.getByRole("button", {
      name: "prim.date.previous",
    }) as HTMLButtonElement;
    expect(previous.disabled || previous.getAttribute("aria-disabled") === "true").toBe(false);
  });

  it("DF-2 a day before the earliest bound is disabled, and the month cannot move before it", async () => {
    render(<Harness min="2026-10-11" max="2026-11-30" />);
    fireEvent.click(screen.getByTestId("df"));
    expect(((await screen.findByTestId("df-day-2026-10-10")) as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect((screen.getByTestId("df-day-2026-10-11") as HTMLButtonElement).disabled).toBe(false);
    const previous = screen.getByRole("button", {
      name: "prim.date.previous",
    }) as HTMLButtonElement;
    expect(previous.disabled || previous.getAttribute("aria-disabled") === "true").toBe(true);
  });

  it("DF-3 choosing a day writes it as YYYY-MM-DD, shows it and closes the calendar; clear empties it", async () => {
    const onChange = vi.fn();
    render(<Harness max="2026-10-11" onChange={onChange} />);
    expect(screen.getByTestId("df-value").textContent).toBe("prim.date.pick");
    fireEvent.click(screen.getByTestId("df"));
    fireEvent.click(await screen.findByTestId("df-day-2026-10-09"));
    expect(onChange).toHaveBeenLastCalledWith("2026-10-09");
    expect(screen.queryByTestId("df-calendar")).toBeNull();
    expect(screen.getByTestId("df-value").textContent).toBe(
      new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(2026, 9, 9)),
    );
    fireEvent.click(screen.getByTestId("df-clear"));
    expect(onChange).toHaveBeenLastCalledWith("");
    expect(screen.getByTestId("df-value").textContent).toBe("prim.date.pick");
  });

  it("DF-4 the month is named in the page's language", async () => {
    language.current = "am";
    render(<Harness initial="2026-10-09" />);
    fireEvent.click(screen.getByTestId("df"));
    await screen.findByTestId("df-day-2026-10-09");
    const month = new Intl.DateTimeFormat("am-ET", { month: "long", year: "numeric" }).format(
      new Date(2026, 9, 1),
    );
    expect(screen.getByTestId("df-calendar").textContent).toContain(month);
  });

  it("DF-5 a calendar day survives the round trip; a day the calendar lacks is refused", () => {
    expect(isoDay(parseDay("2026-10-11") as Date)).toBe("2026-10-11");
    expect(parseDay("2026-02-31")).toBeNull();
    expect(parseDay("11/10/2026")).toBeNull();
    expect(parseDay("")).toBeNull();
  });
});
