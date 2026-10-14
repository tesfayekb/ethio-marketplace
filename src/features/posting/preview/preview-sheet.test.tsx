import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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

/** A page with a field outside the sheet, as a dialog opened over the sheet has. */
function Page({ onClose }: { onClose: () => void }) {
  return (
    <>
      <input data-testid="outside-code" />
      <PreviewSheet view={VIEW} onClose={onClose} />
    </>
  );
}

/** INC-618 — the step-up's code typed inside Screening's preview lost its focus after one character. */
describe("PreviewSheet (INC-618)", () => {
  it("PSH-1 the sheet moves the focus to Close once, when it opens — a new onClose on a later render leaves the focus where it is", () => {
    const { rerender } = render(<Page onClose={() => {}} />);
    expect(document.activeElement).toBe(screen.getByTestId("post-preview-close"));
    const field = screen.getByTestId("outside-code");
    field.focus();
    expect(document.activeElement).toBe(field);
    // The parent re-renders (a keystroke in the step-up dialog) with a new function.
    rerender(<Page onClose={() => {}} />);
    expect(document.activeElement).toBe(field);
  });

  it("PSH-2 Escape calls the newest onClose, once", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<Page onClose={first} />);
    rerender(<Page onClose={second} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
