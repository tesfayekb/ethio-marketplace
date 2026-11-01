import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DIALOG_LAYER, SCREEN_PANEL } from "@/components/ui/dialog-look";

import type { ListingDetailView } from "./listing-detail";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    entities: {},
  }),
}));

// The listing itself is not under test here: the sheet's focus and its Escape are.
vi.mock("./listing-detail", () => ({
  ListingDetail: () => <p data-testid="listing-detail-stub" />,
}));

import { PreviewSheet } from "./preview-sheet";

const VIEW = {} as ListingDetailView;

/** The sheet, and the step-up's dialog over it when `over` (INC-618's page). */
function Page({ onClose, over = false }: { onClose: () => void; over?: boolean }) {
  return (
    <>
      <PreviewSheet view={VIEW} onClose={onClose} />
      {over ? (
        <Dialog open>
          <DialogContent layer="top" aria-describedby={undefined}>
            <DialogTitle>t</DialogTitle>
            <input data-testid="step-up-code" />
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}

/** INC-618 — the step-up's code typed inside Screening's preview lost its focus after one character. */
describe("PreviewSheet (INC-618, turn S6-4)", () => {
  it("PSH-1 the sheet is the one dialog's screen and takes the focus once, when it opens — a new onClose on a later render leaves the focus in the dialog opened over it", async () => {
    const { rerender } = render(<Page onClose={() => {}} />);
    const sheet = await screen.findByTestId("post-preview-sheet");
    expect(sheet).toHaveAttribute("role", "dialog");
    expect(sheet).toHaveClass(...SCREEN_PANEL.split(/\s+/).filter(Boolean), DIALOG_LAYER.modal);
    await waitFor(() => expect(sheet).toHaveFocus());

    rerender(<Page onClose={() => {}} over />);
    const code = await screen.findByTestId("step-up-code");
    code.focus();
    expect(code).toHaveFocus();
    // The parent re-renders (a keystroke in the step-up dialog) with a new function.
    rerender(<Page onClose={() => {}} over />);
    expect(code).toHaveFocus();
  });

  it("PSH-2 Escape, through the primitive's layer stack, calls the newest onClose, once", async () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<Page onClose={first} />);
    rerender(<Page onClose={second} />);
    const sheet = await screen.findByTestId("post-preview-sheet");
    await waitFor(() => expect(sheet).toHaveFocus());
    fireEvent.keyDown(sheet, { key: "Escape" });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
