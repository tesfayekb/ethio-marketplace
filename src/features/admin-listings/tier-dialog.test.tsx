import { fireEvent, render, screen } from "@testing-library/react";
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

function open(current: string, onConfirm = vi.fn(), refusal: string | null = null) {
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
    );
  });

  it("TD-5 the door's refusal is shown in the dialog", () => {
    open("premium", vi.fn(), "A removed ad takes no tier.");
    expect(screen.getByTestId("listings-tier-problem").textContent).toBe(
      "A removed ad takes no tier.",
    );
  });
});
