import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { MessageKey } from "@/i18n";
import { NOTE_MAX } from "@/features/admin-listings/move-reasons";

import { ScreeningRejectDialog } from "./screening-reject-dialog";

/**
 * DEC-469 (cursor bundle 7b) — Screening's Reject asks the Remove list's reason and a note
 * for the seller, and sends nothing until both are as the door wants them.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

function open(over: { count?: number; refusal?: MessageKey | null; busy?: boolean } = {}) {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  render(
    <ScreeningRejectDialog
      testid="rj"
      open
      count={over.count ?? 1}
      busy={over.busy ?? false}
      refusal={over.refusal ?? null}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />,
  );
  return { onConfirm, onCancel };
}

describe("ScreeningRejectDialog (DEC-469)", () => {
  it("SRD-1 nothing is sent without a reason", () => {
    const { onConfirm } = open();
    fireEvent.click(screen.getByTestId("rj-go"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("rj-problem").textContent).toBe("admin.listings.move.pickReason");
  });

  it("SRD-2 Other needs a note; a trimmed note goes with the reason", () => {
    const { onConfirm } = open();
    fireEvent.click(screen.getByTestId("rj-reason-other"));
    fireEvent.click(screen.getByTestId("rj-go"));
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId("rj-problem").textContent).toBe("admin.listings.move.noteRequired");
    fireEvent.change(screen.getByTestId("rj-note"), { target: { value: "  Not an ad.  " } });
    fireEvent.click(screen.getByTestId("rj-go"));
    expect(onConfirm).toHaveBeenCalledExactlyOnceWith("other", "Not an ad.");
  });

  it("SRD-3 a reason from the list needs no note and sends an empty one", () => {
    const { onConfirm } = open();
    fireEvent.click(screen.getByTestId("rj-reason-duplicate"));
    fireEvent.click(screen.getByTestId("rj-go"));
    expect(onConfirm).toHaveBeenCalledExactlyOnceWith("duplicate", "");
  });

  it("SRD-4 a note over the ceiling is not sent", () => {
    const { onConfirm } = open();
    fireEvent.click(screen.getByTestId("rj-reason-rules"));
    fireEvent.change(screen.getByTestId("rj-note"), {
      target: { value: "x".repeat(NOTE_MAX + 1) },
    });
    fireEvent.click(screen.getByTestId("rj-go"));
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("SRD-5 the reasons are the Remove list's, and the door's refusal is shown in the dialog", () => {
    open({ refusal: "admin.screening.error.ownListing" });
    for (const reason of ["prohibited", "misleading", "duplicate", "contact_in_text", "photo"]) {
      expect(screen.getByTestId(`rj-reason-${reason}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId("rj-reason-removed_in_error")).toBeNull();
    expect(screen.getByTestId("rj-problem").textContent).toBe("admin.screening.error.ownListing");
  });

  it("SRD-6 the ticked ones say their number, and a busy dialog cannot be sent twice", () => {
    open({ count: 3, busy: true });
    expect(screen.getByText("admin.screening.confirm.titleRejectMany")).toBeInTheDocument();
    expect(screen.getByTestId("rj-go")).toBeDisabled();
  });
});
