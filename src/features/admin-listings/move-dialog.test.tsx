import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MoveDialog } from "./move-dialog";
import { MOVE_REASONS } from "./move-reasons";

/**
 * Bundle 11, turn L2b — the move dialog asks for the move's own reasons and a
 * note, and sends nothing until both are as the door wants them.
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
  kind: "remove" | "restore" | "send_back",
  onConfirm = vi.fn(),
  refusal: string | null = null,
) {
  render(
    <MoveDialog
      kind={kind}
      count={1}
      busy={false}
      refusal={refusal}
      onCancel={() => {}}
      onConfirm={onConfirm}
    />,
  );
  return onConfirm;
}

describe("MoveDialog (turn L2b)", () => {
  it("MD-1 nothing is sent without a reason", () => {
    const onConfirm = open("remove");
    fireEvent.click(screen.getByTestId("listings-move-confirm"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-move-problem").textContent).toBe(
      "admin.listings.move.pickReason",
    );
  });

  it("MD-2 Other needs a note; with one, the reason and the note are sent", () => {
    const onConfirm = open("send_back");
    fireEvent.click(screen.getByTestId("listings-move-reason-other"));
    fireEvent.click(screen.getByTestId("listings-move-confirm"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("listings-move-problem").textContent).toBe(
      "admin.listings.move.noteRequired",
    );
    fireEvent.change(screen.getByTestId("listings-move-note"), {
      target: { value: "  The price is per day, not per month.  " },
    });
    fireEvent.click(screen.getByTestId("listings-move-confirm"));
    expect(onConfirm).toHaveBeenCalledWith("other", "The price is per day, not per month.");
  });

  it("MD-3 each move offers its own reasons only", () => {
    open("restore");
    for (const reason of MOVE_REASONS.restore) {
      expect(screen.getByTestId(`listings-move-reason-${reason}`)).toBeTruthy();
    }
    expect(screen.queryByTestId("listings-move-reason-prohibited")).toBeNull();
    expect((screen.getByTestId("listings-move-note") as HTMLTextAreaElement).maxLength).toBe(500);
  });

  it("MD-4 the door's refusal is shown in the dialog", () => {
    open("remove", vi.fn(), "This listing no longer exists.");
    expect(screen.getByTestId("listings-move-problem").textContent).toBe(
      "This listing no longer exists.",
    );
  });
});
