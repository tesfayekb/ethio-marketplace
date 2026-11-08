import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const tableAnswers: Array<{ data: unknown; error: unknown }> = [];
vi.mock("@/lib/supabase-door", () => ({
  getSupabase: async () => {
    const query = {
      select: () => query,
      eq: () => query,
      order: () => query,
      gt: () => query,
      limit: () =>
        tableAnswers.length > 0 ? Promise.resolve(tableAnswers.shift()) : new Promise(() => {}),
    };
    return { from: () => query };
  },
}));

import { parseLevelRows, resetLevelRows, seedLevelRows } from "@/features/levels/levels-store";

import { TierDialog } from "./tier-dialog";
import { TIER_REASONS } from "./tier-reasons";

/** P-2 (c) c2a — the enabled level rows, as a card answer seeds them (fixture keys). */
const KEYS = ["lvl-base", "lvl-a", "lvl-b"] as const;
const ROWS =
  parseLevelRows(
    KEYS.map((key, sort) => ({
      key,
      sort,
      name_en: `Level ${key}`,
      name_am: null,
      is_baseline: key === "lvl-base",
    })),
  ) ?? [];
beforeEach(() => {
  resetLevelRows();
  tableAnswers.length = 0;
});

/**
 * Turn T1 part B — the tier dialog opens on the listing's tier, asks for a
 * change, the door's reasons and a note, and sends nothing until all are as
 * the door wants them.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

function open(
  current: string | null,
  onConfirm = vi.fn(),
  refusal: string | null = null,
  seeded = true,
) {
  if (seeded) seedLevelRows(ROWS);
  render(
    <TierDialog
      current={current}
      busy={false}
      refusal={refusal}
      onCancel={() => {}}
      onConfirm={onConfirm}
    />,
  );
  return onConfirm;
}

describe("TierDialog (turn T1)", () => {
  it("TD-1 every enabled level row, by its name, and the door's reasons are offered; the listing's level is pressed", () => {
    open("lvl-a");
    for (const key of KEYS)
      expect(screen.getByTestId(`listings-tier-pick-${key}`).textContent).toBe(`Level ${key}`);
    expect(screen.getByTestId("listings-tier-pick-lvl-a").getAttribute("aria-pressed")).toBe(
      "true",
    );
    for (const reason of TIER_REASONS) {
      expect(screen.getByTestId(`listings-tier-reason-${reason}`)).toBeTruthy();
    }
    expect(screen.queryByTestId("listings-tier-reason-prohibited")).toBeNull();
    expect((screen.getByTestId("listings-tier-note") as HTMLTextAreaElement).maxLength).toBe(500);
  });

  it("TD-2 the unchanged level is not sent", () => {
    const onConfirm = open("lvl-base");
    fireEvent.click(screen.getByTestId("listings-tier-reason-promotion"));
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.level.error.same",
    );
  });

  it("TD-3 nothing is sent without a reason", () => {
    const onConfirm = open("lvl-base");
    fireEvent.click(screen.getByTestId("listings-tier-pick-lvl-b"));
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.move.pickReason",
    );
  });

  it("TD-4 Other needs a note; with one, the tier, the reason and the note are sent", () => {
    const onConfirm = open("lvl-base");
    fireEvent.click(screen.getByTestId("listings-tier-pick-lvl-b"));
    fireEvent.click(screen.getByTestId("listings-tier-reason-other"));
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.move.noteRequired",
    );
    fireEvent.change(screen.getByTestId("listings-tier-note"), {
      target: { value: "  A week on the front, agreed with the seller.  " },
    });
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).toHaveBeenCalledWith(
      "lvl-b",
      "other",
      "A week on the front, agreed with the seller.",
      null,
    );
  });

  it("TD-5 the door's refusal is shown in the dialog", () => {
    open("lvl-b", vi.fn(), "A removed ad takes no level.");
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "A removed ad takes no level.",
    );
  });

  it("TD-6 Days: blank sends open-ended, a whole number sends its days, a bad value or days on the baseline is refused at the field (P-2 (b))", () => {
    const onConfirm = open("lvl-base");
    fireEvent.click(screen.getByTestId("listings-tier-pick-lvl-b"));
    fireEvent.click(screen.getByTestId("listings-tier-reason-promotion"));
    const days = screen.getByTestId("listings-tier-days");
    fireEvent.change(days, { target: { value: "0" } });
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.level.error.days",
    );
    expect(days.getAttribute("aria-invalid")).toBe("true");
    expect(days.getAttribute("aria-describedby")).toBe("listings-tier-problem");
    fireEvent.change(days, { target: { value: "14" } });
    expect(days.getAttribute("aria-invalid")).toBeNull();
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).toHaveBeenLastCalledWith("lvl-b", "promotion", "", 14);
    cleanup();

    const toBaseline = open("lvl-b");
    fireEvent.click(screen.getByTestId("listings-tier-pick-lvl-base"));
    fireEvent.click(screen.getByTestId("listings-tier-reason-promotion_ended"));
    fireEvent.change(screen.getByTestId("listings-tier-days"), { target: { value: "7" } });
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(toBaseline).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.level.error.baselineDays",
    );
    fireEvent.change(screen.getByTestId("listings-tier-days"), { target: { value: "" } });
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(toBaseline).toHaveBeenCalledWith("lvl-base", "promotion_ended", "", null);
  });

  it("TD-7 a listing whose level the door did not answer opens with none pressed and takes any level", () => {
    const onConfirm = open(null);
    for (const key of KEYS)
      expect(screen.getByTestId(`listings-tier-pick-${key}`).getAttribute("aria-pressed")).toBe(
        "false",
      );
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.level.error.unknown",
    );
    fireEvent.click(screen.getByTestId("listings-tier-pick-lvl-base"));
    fireEvent.click(screen.getByTestId("listings-tier-reason-promotion"));
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).toHaveBeenCalledWith("lvl-base", "promotion", "", null);
  });

  it("TD-8 while the level rows load, the dialog says so and sends nothing; a failed read is its error (P-2 (c) c2a)", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    tableAnswers.push({ data: null, error: { message: "permission denied", code: "42501" } });
    const onConfirm = open("lvl-a", vi.fn(), null, false);
    expect((await screen.findByTestId("listings-tier-levels-error")).textContent).toBe(
      "common.error",
    );
    expect(screen.getByTestId("listings-tier-confirm")).toHaveProperty("disabled", true);
    cleanup();
    resetLevelRows();
    open("lvl-a", vi.fn(), null, false);
    expect(screen.getByTestId("listings-tier-levels-loading").textContent).toBe("common.loading");
    expect(screen.getByTestId("listings-tier-confirm")).toHaveProperty("disabled", true);
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
