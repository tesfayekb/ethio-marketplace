import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TierDialog } from "./tier-dialog";
import { TIER_REASONS, TIERS } from "./tier-reasons";

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

function open(current: string | null, onConfirm = vi.fn(), refusal: string | null = null) {
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
  it("TD-1 the three tiers and the door's reasons are offered; the listing's tier is pressed", () => {
    open("featured");
    for (const tier of TIERS) expect(screen.getByTestId(`listings-tier-pick-${tier}`)).toBeTruthy();
    expect(screen.getByTestId("listings-tier-pick-featured").getAttribute("aria-pressed")).toBe(
      "true",
    );
    for (const reason of TIER_REASONS) {
      expect(screen.getByTestId(`listings-tier-reason-${reason}`)).toBeTruthy();
    }
    expect(screen.queryByTestId("listings-tier-reason-prohibited")).toBeNull();
    expect((screen.getByTestId("listings-tier-note") as HTMLTextAreaElement).maxLength).toBe(500);
  });

  it("TD-2 the unchanged tier is not sent", () => {
    const onConfirm = open("regular");
    fireEvent.click(screen.getByTestId("listings-tier-reason-promotion"));
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.tier.error.same",
    );
  });

  it("TD-3 nothing is sent without a reason", () => {
    const onConfirm = open("regular");
    fireEvent.click(screen.getByTestId("listings-tier-pick-premium"));
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.move.pickReason",
    );
  });

  it("TD-4 Other needs a note; with one, the tier, the reason and the note are sent", () => {
    const onConfirm = open("regular");
    fireEvent.click(screen.getByTestId("listings-tier-pick-premium"));
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
      "premium",
      "other",
      "A week on the front, agreed with the seller.",
      null,
    );
  });

  it("TD-5 the door's refusal is shown in the dialog", () => {
    open("premium", vi.fn(), "A removed ad takes no tier.");
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "A removed ad takes no tier.",
    );
  });

  it("TD-6 Days: blank sends open-ended, a whole number sends its days, a bad value or days on the baseline is refused at the field (P-2 (b))", () => {
    const onConfirm = open("regular");
    fireEvent.click(screen.getByTestId("listings-tier-pick-premium"));
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
    expect(onConfirm).toHaveBeenLastCalledWith("premium", "promotion", "", 14);
    cleanup();

    const toBaseline = open("premium");
    fireEvent.click(screen.getByTestId("listings-tier-pick-regular"));
    fireEvent.click(screen.getByTestId("listings-tier-reason-promotion_ended"));
    fireEvent.change(screen.getByTestId("listings-tier-days"), { target: { value: "7" } });
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(toBaseline).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.level.error.baselineDays",
    );
    fireEvent.change(screen.getByTestId("listings-tier-days"), { target: { value: "" } });
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(toBaseline).toHaveBeenCalledWith("regular", "promotion_ended", "", null);
  });

  it("TD-7 a listing whose level the door did not answer opens with none pressed and takes any level", () => {
    const onConfirm = open(null);
    for (const tier of TIERS)
      expect(screen.getByTestId(`listings-tier-pick-${tier}`).getAttribute("aria-pressed")).toBe(
        "false",
      );
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "admin.listings.tier.error.unknown",
    );
    fireEvent.click(screen.getByTestId("listings-tier-pick-regular"));
    fireEvent.click(screen.getByTestId("listings-tier-reason-promotion"));
    fireEvent.click(screen.getByTestId("listings-tier-confirm"));
    expect(onConfirm).toHaveBeenCalledWith("regular", "promotion", "", null);
  });
});
