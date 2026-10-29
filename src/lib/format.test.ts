import { describe, expect, it } from "vitest";
import { dateFormatter, formatDate, formatNumber, formatRelative, numberFormatter } from "./format";

/** INC-985 (Foundations turn L-1, B1/B5) — one formatter per intent, on formatLocale. */
const OCTOBER = new Date("2026-10-29T10:05:00Z");

describe("formatters by intent (INC-985)", () => {
  it("FMT-1 English keeps its CLDR styles (day, full, digits, day-month, month-year)", () => {
    expect(formatDate("day", OCTOBER, "en", "UTC")).toBe("29 Oct 2026");
    expect(formatDate("dayFull", OCTOBER, "en", "UTC")).toBe("Thursday, 29 October 2026");
    expect(formatDate("dayNumeric", OCTOBER, "en", "UTC")).toBe("29/10/2026");
    expect(formatDate("dayMonth", OCTOBER, "en", "UTC")).toBe("29 Oct");
    expect(formatDate("monthYear", OCTOBER, "en", "UTC")).toBe("October 2026");
  });

  it("FMT-2 English times: to the minute, digits, seconds and with the zone's name", () => {
    expect(formatDate("dayTime", OCTOBER, "en", "UTC")).toBe("29 Oct 2026, 10:05");
    expect(formatDate("dayTimeNumeric", OCTOBER, "en", "UTC")).toBe("29/10/2026, 10:05");
    expect(formatDate("moment", OCTOBER, "en", "UTC")).toBe("29/10/2026, 10:05:00");
    expect(formatDate("dayTimeZone", OCTOBER, "en", "UTC")).toBe("29 Oct 2026, 10:05:00 UTC");
  });

  it("FMT-3 Amharic writes the month in full, never the cut CLDR short month", () => {
    for (const intent of [
      "day",
      "dayFull",
      "dayMonth",
      "dayTime",
      "dayTimeZone",
      "monthYear",
    ] as const) {
      const text = formatDate(intent, OCTOBER, "am", "UTC");
      expect(text, intent).toContain("ኦክቶበር");
      expect(`${text} `, intent).not.toMatch(/ኦክቶ /);
    }
    expect(formatDate("day", OCTOBER, "am", "UTC")).toBe("29 ኦክቶበር 2026");
  });

  it("FMT-4 Amharic never uses dateStyle medium/short", () => {
    for (const intent of ["day", "dayNumeric", "dayTime", "dayTimeNumeric", "moment"] as const) {
      const options = dateFormatter(intent, "am").resolvedOptions();
      expect(options.dateStyle, intent).toBeUndefined();
    }
  });

  it("FMT-5 a time zone is honoured (the viewer's own zone for legal moments)", () => {
    expect(formatDate("dayTime", OCTOBER, "en", "Africa/Addis_Ababa")).toBe("29 Oct 2026, 13:05");
  });

  it("FMT-6 numbers: a count groups, an exact number keeps every decimal", () => {
    expect(formatNumber(1234567, "en")).toBe("1,234,567");
    expect(formatNumber(1.23456789, "en", "exact")).toBe("1.23456789");
    expect(formatNumber(1.23456789, "en")).toBe("1.235");
  });

  it("FMT-7 an unknown or malformed language formats in English", () => {
    expect(formatDate("day", OCTOBER, "zz-not-a-tag!", "UTC")).toBe("29 Oct 2026");
    expect(formatRelative(-1, "day", "!!")).toBe("yesterday");
    expect(formatRelative(-1, "day", "am")).toBe(
      new Intl.RelativeTimeFormat("am", { numeric: "auto" }).format(-1, "day"),
    );
  });

  it("FMT-8 one cached instance per intent and resolved locale", () => {
    expect(dateFormatter("day", "en")).toBe(dateFormatter("day", "en"));
    expect(dateFormatter("day", "en")).not.toBe(dateFormatter("day", "am"));
    expect(dateFormatter("day", "en", "UTC")).not.toBe(dateFormatter("day", "en"));
    expect(numberFormatter("count", "am")).toBe(numberFormatter("count", "am"));
  });
});
