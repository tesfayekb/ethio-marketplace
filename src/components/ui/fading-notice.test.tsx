import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FADING_NOTICE_MS, FadingNotice } from "./fading-notice";

/**
 * D192 (the operator, 2026-10-16: "a dialog box or a toast message that shows
 * for few seconds then goes away") — the in-place notice that shows its words
 * for a few seconds and fades; the same words again (a new nonce) show again.
 */
describe("FadingNotice", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("FN-1 shows nothing until told, then the words for a few seconds, then nothing", () => {
    const { rerender } = render(<FadingNotice testid="n" nonce={0} text={null} />);
    const notice = screen.getByTestId("n");
    // S446 — drawn always, so no role: the polite live region alone is heard.
    expect(notice).not.toHaveAttribute("role");
    expect(notice).toHaveAttribute("aria-live", "polite");
    expect(notice).toHaveAttribute("data-shown", "false");
    expect(notice).toHaveTextContent("");

    rerender(<FadingNotice testid="n" nonce={1} text="Your changes are saved." />);
    expect(notice).toHaveAttribute("data-shown", "true");
    expect(notice).toHaveTextContent("Your changes are saved.");

    act(() => vi.advanceTimersByTime(FADING_NOTICE_MS - 1));
    expect(notice).toHaveAttribute("data-shown", "true");
    act(() => vi.advanceTimersByTime(1));
    expect(notice).toHaveAttribute("data-shown", "false");
    expect(notice).toHaveTextContent("");
  });

  it("FN-2 the same words with a new nonce show again; a nonce of zero never shows", () => {
    const { rerender } = render(<FadingNotice testid="n" nonce={1} text="Saved." ms={100} />);
    const notice = screen.getByTestId("n");
    act(() => vi.advanceTimersByTime(100));
    expect(notice).toHaveAttribute("data-shown", "false");
    rerender(<FadingNotice testid="n" nonce={2} text="Saved." ms={100} />);
    expect(notice).toHaveAttribute("data-shown", "true");
    rerender(<FadingNotice testid="n" nonce={0} text="Saved." ms={100} />);
    act(() => vi.advanceTimersByTime(100));
    expect(notice).toHaveAttribute("data-shown", "false");
  });
});
