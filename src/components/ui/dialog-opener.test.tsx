import * as React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Dialog, DialogContent, DialogTitle } from "./dialog";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    entities: {},
  }),
}));

/**
 * INC-1126 (the pictures turn, ruling 2) — the opener a screen-sized panel gives the focus back
 * to. jsdom, as Safari, leaves the focus where it was when a button is clicked, so these openings
 * are Safari's: the focus on the page, or on the focusable box around the pressed control.
 */
function Page({
  setOpen,
  mountOnOpen,
}: {
  setOpen: { current: (open: boolean) => void };
  /** As the preview sheet: `<Dialog open>` drawn only while open. */
  mountOnOpen: boolean;
}) {
  const [open, set] = React.useState(false);
  setOpen.current = set;
  return (
    <>
      <div tabIndex={-1} data-testid="box">
        <button type="button" data-testid="opener" onClick={() => set(true)}>
          o
        </button>
      </div>
      <button type="button" data-testid="other">
        x
      </button>
      {open || !mountOnOpen ? (
        <Dialog open={open} onOpenChange={set}>
          <DialogContent variant="screen" aria-describedby={undefined}>
            <DialogTitle>t</DialogTitle>
            <span data-testid="panel-body">p</span>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}

function draw(mountOnOpen = false) {
  const setOpen = { current: (_open: boolean) => {} };
  render(<Page setOpen={setOpen} mountOnOpen={mountOnOpen} />);
  return { setOpen, opener: screen.getByTestId("opener"), other: screen.getByTestId("other") };
}

async function opened() {
  const body = await screen.findByTestId("panel-body");
  await waitFor(() => expect(document.activeElement).not.toBe(document.body));
  return body;
}

async function closeByEscape() {
  fireEvent.keyDown(document.activeElement ?? document.body, { key: "Escape" });
  await waitFor(() => expect(screen.queryByTestId("panel-body")).toBeNull());
}

async function closeByButton() {
  const close = screen.getByText("common.close").closest("button");
  expect(close).not.toBeNull();
  if (close !== null) fireEvent.click(close);
  await waitFor(() => expect(screen.queryByTestId("panel-body")).toBeNull());
}

function blurAll() {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  expect(document.activeElement).toBe(document.body);
}

describe("the dialog's opener (INC-1126)", () => {
  it("DO-1 the focus on the page and a press on the control: closing gives the focus to the control", async () => {
    const { opener } = draw();
    blurAll();
    fireEvent.pointerDown(opener);
    fireEvent.click(opener);
    await opened();
    await closeByEscape();
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("DO-2 the focus on the box around the pressed control: closing gives the focus to the control", async () => {
    const { opener } = draw();
    screen.getByTestId("box").focus();
    fireEvent.pointerDown(opener);
    fireEvent.click(opener);
    await opened();
    await closeByEscape();
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("DO-5 a panel drawn only while open (the preview sheet) hears the press that opened it", async () => {
    const { opener } = draw(true);
    blurAll();
    fireEvent.pointerDown(opener);
    fireEvent.click(opener);
    await opened();
    await closeByButton();
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("DO-3 a keyboard opening is unchanged: the focused control gets the focus back, a press before the key is not used", async () => {
    const { opener, other } = draw();
    fireEvent.pointerDown(other);
    opener.focus();
    fireEvent.keyDown(opener, { key: "Enter" });
    fireEvent.click(opener);
    await opened();
    await closeByEscape();
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("DO-4 a stale press is not used: a key ended its gesture, or an opening already took it", async () => {
    const { setOpen, opener, other } = draw();
    blurAll();
    fireEvent.pointerDown(other);
    fireEvent.keyDown(document.body, { key: "Shift" });
    act(() => setOpen.current(true));
    await opened();
    await closeByEscape();
    expect(other).not.toHaveFocus();

    // Closed by its button with no press and no key: only the opening itself can spend the press.
    blurAll();
    fireEvent.pointerDown(opener);
    fireEvent.click(opener);
    await opened();
    await closeByButton();
    await waitFor(() => expect(opener).toHaveFocus());

    blurAll();
    act(() => setOpen.current(true));
    await opened();
    await closeByButton();
    expect(opener).not.toHaveFocus();
    expect(other).not.toHaveFocus();
  });
});
