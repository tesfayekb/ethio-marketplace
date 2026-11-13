import * as React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "./alert-dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { Sheet, SheetContent, SheetTitle } from "./sheet";

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

type Kind = "dialog" | "sheet" | "alert";

/** A small panel of each primitive, opened from state by a button that is not its trigger. */
function Small({
  kind,
  ownerBack,
  dropOpener,
}: {
  kind: Kind;
  /** The owner's own onCloseAutoFocus: it sends the focus to "other". */
  ownerBack?: boolean;
  /** The opener leaves the page while the panel is open. */
  dropOpener?: boolean;
}) {
  const [open, set] = React.useState(false);
  const onCloseAutoFocus = ownerBack
    ? (event: Event) => {
        event.preventDefault();
        document.querySelector<HTMLElement>("[data-testid=other]")?.focus();
      }
    : undefined;
  const body = <span data-testid="panel-body">p</span>;
  return (
    <>
      {dropOpener && open ? null : (
        <button type="button" data-testid="opener" onClick={() => set(true)}>
          o
        </button>
      )}
      <button type="button" data-testid="other">
        x
      </button>
      {kind === "dialog" ? (
        <Dialog open={open} onOpenChange={set}>
          <DialogContent aria-describedby={undefined} onCloseAutoFocus={onCloseAutoFocus}>
            <DialogTitle>t</DialogTitle>
            {body}
          </DialogContent>
        </Dialog>
      ) : kind === "sheet" ? (
        <Sheet open={open} onOpenChange={set}>
          <SheetContent aria-describedby={undefined} onCloseAutoFocus={onCloseAutoFocus}>
            <SheetTitle>t</SheetTitle>
            {body}
          </SheetContent>
        </Sheet>
      ) : (
        <AlertDialog open={open} onOpenChange={set}>
          <AlertDialogContent aria-describedby={undefined} onCloseAutoFocus={onCloseAutoFocus}>
            <AlertDialogTitle>t</AlertDialogTitle>
            {body}
            <AlertDialogCancel>c</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

async function openSmall() {
  const opener = screen.getByTestId("opener");
  opener.focus();
  fireEvent.pointerDown(opener);
  fireEvent.click(opener);
  await opened();
  return opener;
}

describe("every panel gives the focus back to its opener (INC-1130)", () => {
  it("DO-6 a small dialog opened from state gives the focus back to the control that opened it", async () => {
    render(<Small kind="dialog" />);
    const opener = await openSmall();
    await closeByEscape();
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it.each(["sheet", "alert"] as const)(
    "DO-7 the %s gives the focus back to the control that opened it, through the same function",
    async (kind) => {
      render(<Small kind={kind} />);
      const opener = await openSmall();
      await closeByEscape();
      await waitFor(() => expect(opener).toHaveFocus());
    },
  );

  it("DO-8 a panel opened by its own library trigger is left to the library", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" data-testid="trigger">
            o
          </button>
        </DialogTrigger>
        <DialogContent variant="screen" aria-describedby={undefined}>
          <DialogTitle>t</DialogTitle>
          <span data-testid="panel-body">p</span>
        </DialogContent>
      </Dialog>,
    );
    // The first opening swaps the facade's stand-in trigger for the library's own.
    fireEvent.click(screen.getByTestId("trigger"));
    await opened();
    await closeByEscape();
    const trigger = screen.getByTestId("trigger");
    trigger.focus();
    fireEvent.pointerDown(trigger);
    fireEvent.click(trigger);
    const body = await opened();
    const panel = body.closest("[data-dialog-panel]");
    expect(panel?.id).not.toBe("");
    expect(trigger).toHaveAttribute("aria-controls", panel?.id);
    const focus = vi.spyOn(trigger, "focus");
    await closeByEscape();
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(focus).not.toHaveBeenCalledWith({ preventScroll: true });
  });

  it("DO-9 an owner's own onCloseAutoFocus wins over the opener", async () => {
    render(<Small kind="dialog" ownerBack />);
    await openSmall();
    await closeByEscape();
    await waitFor(() => expect(screen.getByTestId("other")).toHaveFocus());
  });

  it("DO-10 an opener that left the page is not used: the focus goes where it went before", async () => {
    render(<Small kind="dialog" dropOpener />);
    await openSmall();
    expect(screen.queryByTestId("opener")).toBeNull();
    await closeByEscape();
    expect(screen.getByTestId("other")).not.toHaveFocus();
    expect(document.activeElement).toBe(document.body);
  });
});
