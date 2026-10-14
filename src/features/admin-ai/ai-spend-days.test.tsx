import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { AiSpendDay } from "./ai-service";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

const read = vi.hoisted(() => ({
  data: [] as AiSpendDay[] | undefined,
  isLoading: false,
  error: null as unknown,
  refetch: vi.fn(),
}));
vi.mock("./use-ai-features", () => ({
  useAiSpendDays: () => read,
}));

import { AiSpendDays } from "./ai-spend-days";

const DAYS: AiSpendDay[] = [
  { feature: "photo_screen", day: "2026-10-14", calls: 3, units: 3, costMicrousd: 6000 },
  { feature: "background_removal", day: "2026-10-14", calls: 1, units: 1, costMicrousd: 20000 },
  { feature: "photo_screen", day: "2026-10-12", calls: 2, units: 2, costMicrousd: 4000 },
];

beforeEach(() => {
  read.data = DAYS;
  read.isLoading = false;
  read.error = null;
  read.refetch = vi.fn();
});

/** Bundle 13 turn 14 — the spend of each day, for every feature or one. */
describe("AiSpendDays (bundle 13 turn 14)", () => {
  it("AID-4 every feature together: one row a day, newest first, with its calls and spend, and the total", () => {
    render(<AiSpendDays />);
    const rows = screen.getAllByTestId("ai-days-row");
    expect(rows.map((row) => row.getAttribute("data-day"))).toEqual(["2026-10-14", "2026-10-12"]);
    expect(within(rows[0]!).getByTestId("ai-days-calls").textContent).toBe("4");
    expect(within(rows[0]!).getByTestId("ai-days-cost").textContent).toBe("$0.03");
    expect(within(rows[1]!).getByTestId("ai-days-cost").textContent).toBe("<$0.01");
    expect(screen.getByTestId("ai-days-total").textContent).toBe("admin.ai.days.total");
  });

  it("AID-5 the picker lists every feature by name and shows one feature's days", () => {
    render(<AiSpendDays />);
    const picker = screen.getByTestId("ai-days-feature");
    const options = within(picker)
      .getAllByRole("option")
      .map((option) => option.textContent);
    expect(options).toEqual([
      "admin.ai.days.all",
      "admin.ai.feature.photo_screen",
      "admin.ai.feature.writing_helper",
      "admin.ai.feature.name_check",
      "admin.ai.feature.category_images",
      "admin.ai.feature.category_icons",
      "admin.ai.feature.translations",
      "admin.ai.feature.background_removal",
    ]);
    fireEvent.change(picker, { target: { value: "background_removal" } });
    const rows = screen.getAllByTestId("ai-days-row");
    expect(rows).toHaveLength(1);
    expect(within(rows[0]!).getByTestId("ai-days-cost").textContent).toBe("$0.02");
    fireEvent.change(picker, { target: { value: "writing_helper" } });
    expect(screen.queryAllByTestId("ai-days-row")).toHaveLength(0);
    expect(screen.getByTestId("ai-days-empty").textContent).toBe("admin.ai.days.empty");
  });

  it("AID-6 a failed read says so with a retry and shows no numbers (F4)", () => {
    read.data = undefined;
    read.error = new Error("permission denied");
    render(<AiSpendDays />);
    expect(screen.getByRole("alert").textContent).toBe("admin.ai.days.error");
    expect(screen.queryByTestId("ai-days-table")).toBeNull();
    expect(screen.queryByTestId("ai-days-empty")).toBeNull();
    fireEvent.click(screen.getByText("common.retry"));
    expect(read.refetch).toHaveBeenCalledTimes(1);
  });
});
