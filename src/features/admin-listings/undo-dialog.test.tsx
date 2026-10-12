import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { UndoDialog } from "./undo-dialog";

/**
 * Bundle 11, turn L4d (D141) — the undo dialog: the note is optional and sent
 * trimmed; the door's refusal is shown in the dialog.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

describe("UndoDialog (turn L4d)", () => {
  it("UD-1 Undo with no note sends none; a note is sent trimmed; Cancel closes", () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<UndoDialog busy={false} problem={null} onCancel={onCancel} onConfirm={onConfirm} />);
    expect(screen.getByTestId("listing-undo-dialog").textContent).toContain(
      "admin.listings.undo.hint",
    );
    fireEvent.click(screen.getByTestId("listing-undo-confirm"));
    expect(onConfirm).toHaveBeenLastCalledWith("");
    fireEvent.change(screen.getByTestId("listing-undo-note"), {
      target: { value: "  The old title was right.  " },
    });
    fireEvent.click(screen.getByTestId("listing-undo-confirm"));
    expect(onConfirm).toHaveBeenLastCalledWith("The old title was right.");
    expect((screen.getByTestId("listing-undo-note") as HTMLTextAreaElement).maxLength).toBe(500);
    fireEvent.click(screen.getByTestId("listing-undo-cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("UD-2 the door's refusal is shown; nothing is pressed while busy", () => {
    const onConfirm = vi.fn();
    render(
      <UndoDialog
        busy
        problem="The listing has changed since this edit, so it cannot be undone."
        onCancel={() => {}}
        onConfirm={onConfirm}
      />,
    );
    expect(screen.getByTestId("listing-undo-problem").textContent).toBe(
      "The listing has changed since this edit, so it cannot be undone.",
    );
    expect((screen.getByTestId("listing-undo-confirm") as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByTestId("listing-undo-cancel") as HTMLButtonElement).disabled).toBe(true);
  });
});
