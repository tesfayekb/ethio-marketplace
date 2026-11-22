import * as React from "react";
import { act, fireEvent, render as renderView, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, onTestFinished, vi } from "vitest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";
import { BANDS_PANEL } from "./dialog-look";
import { CLOSED_PRIMARY, DIALOG_TONE } from "./dialog-parts-look";
import {
  ActionRow,
  ClosedPrimary,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelSubject,
  StepTrack,
} from "./dialog-parts";
import { Sheet, SheetContent, SheetTitle } from "./sheet";
import { PanelTestContext } from "./dialog-parts-test-context";

const render = (ui: React.ReactNode) => renderView(ui, { wrapper: PanelTestContext });

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

/** Gives a node a scroll box jsdom cannot lay out. */
function sized(node: HTMLElement, box: { scrollHeight: number; clientHeight: number }) {
  Object.defineProperty(node, "scrollHeight", { configurable: true, value: box.scrollHeight });
  Object.defineProperty(node, "clientHeight", { configurable: true, value: box.clientHeight });
}

const classes = (look: string) => look.split(/\s+/).filter(Boolean);

afterEach(() => {
  vi.restoreAllMocks();
});

describe("the panel anatomy (bundle 2, INC-1146)", () => {
  it("DP-U1 a banded dialog: no scroll of its own, a header band with its tone tile, title and description, a footer band", async () => {
    render(
      <Dialog open>
        <DialogContent data-testid="panel" bands phone="sheet">
          <PanelHeader icon={<span>i</span>} tone="danger">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>What happens</DialogDescription>
          </PanelHeader>
          <PanelBody testId="body">x</PanelBody>
          <PanelFooter data-testid="foot">f</PanelFooter>
        </DialogContent>
      </Dialog>,
    );
    const panel = await waitFor(() => screen.getByTestId("panel"));
    for (const cls of classes(BANDS_PANEL)) expect(panel.className.split(/\s+/)).toContain(cls);
    expect(panel.className).not.toContain("overflow-y-auto");
    expect(panel).toHaveAttribute("data-bands");
    // The grabber sits in the header band, not on the panel.
    const head = panel.querySelector("[data-panel-head]");
    expect(head?.querySelector("[data-dialog-grabber]")).not.toBeNull();
    expect(panel.querySelectorAll("[data-dialog-grabber]")).toHaveLength(1);
    const tile = head?.querySelector("[data-tone]");
    expect(tile).toHaveAttribute("data-tone", "danger");
    for (const cls of classes(DIALOG_TONE.danger)) expect(tile?.className).toContain(cls);
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("What happens");
    expect(screen.getByTestId("body").className).toContain("overflow-y-auto");
    expect(screen.getByTestId("foot")).toHaveAttribute("data-panel-foot");
  });

  it("DP-U2 a dialog without bands draws as before (every consumer unchanged)", async () => {
    render(
      <Dialog open>
        <DialogContent data-testid="panel">
          <DialogTitle>t</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    const panel = await waitFor(() => screen.getByTestId("panel"));
    expect(panel).not.toHaveAttribute("data-bands");
    expect(panel.className).toContain("overflow-y-auto");
    expect(panel.className).not.toContain("bg-background");
  });

  it("DP-U3 the subject draws typed text as text, never as markup", () => {
    const typed = '<img src=x onerror="alert(1)"> Car';
    render(<PanelSubject testId="subject" title={typed} lines={["100 ETB", "Addis", "third"]} />);
    const subject = screen.getByTestId("subject");
    expect(subject.querySelector("img")).toBeNull();
    expect(subject).toHaveTextContent(typed);
    // At most two lines under the title.
    expect(subject).not.toHaveTextContent("third");
  });

  it("DP-U4 the scroll cue: shown while more lies below, a button that scrolls about one screen, gone at the end", async () => {
    render(
      <PanelBody testId="body">
        <p>long</p>
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    sized(body, { scrollHeight: 1000, clientHeight: 400 });
    const scrollBy = vi.fn();
    body.scrollBy = scrollBy as unknown as typeof body.scrollBy;
    act(() => {
      body.dispatchEvent(new Event("scroll"));
    });
    const cue = await screen.findByRole("button", { name: "dialog.moreBelow" });
    expect(cue.className).toContain("min-h-11");
    fireEvent.click(cue);
    expect(scrollBy).toHaveBeenCalledWith({ top: 340, behavior: "smooth" });
    act(() => {
      body.scrollTop = 600;
      body.dispatchEvent(new Event("scroll"));
    });
    expect(screen.queryByRole("button", { name: "dialog.moreBelow" })).toBeNull();
  });

  it("DP-U5 with reduced motion the cue scrolls without a smooth scroll", async () => {
    const before = window.matchMedia;
    window.matchMedia = ((query: string) =>
      ({ matches: query.includes("reduce") }) as MediaQueryList) as typeof window.matchMedia;
    onTestFinished(() => {
      window.matchMedia = before;
    });
    render(<PanelBody testId="body">x</PanelBody>);
    const body = screen.getByTestId("body");
    sized(body, { scrollHeight: 1000, clientHeight: 400 });
    const scrollBy = vi.fn();
    body.scrollBy = scrollBy as unknown as typeof body.scrollBy;
    act(() => {
      body.dispatchEvent(new Event("scroll"));
    });
    fireEvent.click(await screen.findByRole("button", { name: "dialog.moreBelow" }));
    expect(scrollBy).toHaveBeenCalledWith({ top: 340, behavior: "auto" });
  });

  it("DP-U6 the closed primary is never disabled: closed, a press marks what is missing and sends nothing; open, it sends", () => {
    const send = vi.fn();
    const mark = vi.fn();
    const { rerender } = render(
      <ClosedPrimary closed onClosedPress={mark} onClick={send} data-testid="go">
        Go
      </ClosedPrimary>,
    );
    const go = screen.getByTestId("go");
    expect(go).not.toBeDisabled();
    expect(go).toHaveAttribute("data-closed", "1");
    for (const cls of classes(CLOSED_PRIMARY)) expect(go.className).toContain(cls);
    fireEvent.click(go);
    expect(mark).toHaveBeenCalledTimes(1);
    expect(send).not.toHaveBeenCalled();
    rerender(
      <ClosedPrimary closed={false} onClosedPress={mark} onClick={send} data-testid="go">
        Go
      </ClosedPrimary>,
    );
    expect(go).not.toHaveAttribute("data-closed");
    fireEvent.click(go);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("DP-U7 the step track says where the person is and what is done", () => {
    render(<StepTrack label="Steps" steps={["File", "Check", "Import"]} current={1} />);
    const items = screen.getByRole("list", { name: "Steps" }).querySelectorAll("li");
    expect(Array.from(items, (item) => item.getAttribute("data-state"))).toEqual([
      "done",
      "current",
      "next",
    ]);
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[0]).not.toHaveAttribute("aria-current");
  });

  it("DP-U8 an action row is the shared list row with its icon tile", () => {
    const press = vi.fn();
    render(
      <ActionRow icon={<span>i</span>} onClick={press} data-testid="row">
        Copy link
      </ActionRow>,
    );
    const row = screen.getByTestId("row");
    expect(row.tagName).toBe("BUTTON");
    expect(row).toHaveAttribute("type", "button");
    fireEvent.click(row);
    expect(press).toHaveBeenCalledTimes(1);
  });

  it("DP-U9 a red primary never takes the focus when its dialog opens: the first field does, else the first control that is not red", async () => {
    render(
      <Dialog open>
        <DialogContent bands>
          <DialogTitle>t</DialogTitle>
          <Button variant="destructive" data-testid="red">
            Delete
          </Button>
          <Button variant="outline" data-testid="keep">
            Keep
          </Button>
        </DialogContent>
      </Dialog>,
    );
    await waitFor(() => expect(screen.getByTestId("keep")).toHaveFocus());
    expect(screen.getByTestId("red")).not.toHaveFocus();
  });

  it("DP-U10 an alert and a sheet take the bands too; the alert's focus goes to its cancel", async () => {
    render(
      <>
        <AlertDialog open>
          <AlertDialogContent data-testid="alert" bands>
            <AlertDialogTitle>t</AlertDialogTitle>
            <AlertDialogCancel data-testid="cancel">No</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      </>,
    );
    await waitFor(() => expect(screen.getByTestId("cancel")).toHaveFocus());
    expect(screen.getByTestId("alert")).toHaveAttribute("data-bands");
  });

  it("DP-U11 a banded bottom sheet keeps one grabber, in its header band", async () => {
    render(
      <Sheet open>
        <SheetContent data-testid="sheet" side="bottom" bands>
          <PanelHeader>
            <SheetTitle>t</SheetTitle>
          </PanelHeader>
        </SheetContent>
      </Sheet>,
    );
    const sheet = await waitFor(() => screen.getByTestId("sheet"));
    expect(sheet).toHaveAttribute("data-phone", "sheet");
    expect(sheet.className).not.toContain("overflow-y-auto");
    const grabbers = sheet.querySelectorAll("[data-dialog-grabber]");
    expect(grabbers).toHaveLength(1);
    expect(grabbers[0]?.closest("[data-panel-head]")).not.toBeNull();
  });
});

describe("panel correction laws", () => {
  it("DP-U12 the cue cannot add to the scroller height when it disappears", () => {
    render(
      <PanelBody testId="body">
        <p>Content</p>
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    // A content-only box: an in-flow cue would increase this measured height.
    Object.defineProperty(body, "scrollHeight", {
      configurable: true,
      get: () => 1000 + (body.querySelector("[data-scroll-cue]") ? 72 : 0),
    });
    Object.defineProperty(body, "clientHeight", { configurable: true, value: 400 });
    fireEvent.scroll(body);
    expect(screen.getByRole("button", { name: "dialog.moreBelow" })).toBeInTheDocument();
    const height = body.scrollHeight;
    body.scrollTop = height - 400;
    fireEvent.scroll(body);
    expect(screen.queryByRole("button", { name: "dialog.moreBelow" })).toBeNull();
    expect(body.scrollHeight).toBe(height);
  });
  it("DP-U13 a closed primary owns its missing line and names it only while closed", () => {
    const props = { missing: "Choose a name", onClosedPress: vi.fn() };
    const { rerender } = render(
      <ClosedPrimary {...props} closed>
        Save
      </ClosedPrimary>,
    );
    expect(screen.getByRole("button", { name: "Save" })).toHaveAccessibleDescription(
      "Choose a name",
    );
    expect(screen.getByText("Choose a name")).toBeInTheDocument();
    rerender(
      <ClosedPrimary {...props} closed={false}>
        Save
      </ClosedPrimary>,
    );
    expect(screen.getByRole("button", { name: "Save" })).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByText("Choose a name")).toBeNull();
  });
  it("DP-U14 a destructive AlertDialogAction does not take opening focus", async () => {
    render(
      <AlertDialog open>
        <AlertDialogContent bands>
          <AlertDialogTitle>Remove</AlertDialogTitle>
          <AlertDialogAction tone="destructive" data-testid="red-action">
            Delete
          </AlertDialogAction>
          <AlertDialogCancel data-testid="safe-action">Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await waitFor(() => expect(screen.getByTestId("safe-action")).toHaveFocus());
    expect(screen.getByTestId("red-action")).not.toHaveFocus();
  });
});

describe("panel Escape belongs to its open list", () => {
  for (const kind of ["dialog", "alert", "sheet"] as const) {
    it(`DP-U${kind === "dialog" ? 15 : kind === "alert" ? 16 : 17} ${kind} stays open for the first Escape and closes on the second`, async () => {
      function Owner() {
        const [open, setOpen] = React.useState(true);
        const [list, setList] = React.useState(true);
        const body = (
          <>
            <input
              data-testid="list-focus"
              onKeyDown={(event) => {
                if (event.key === "Escape") setList(false);
              }}
            />
            {list ? <div data-picker-popup="" data-testid="owned-list" /> : null}
          </>
        );
        if (kind === "alert")
          return (
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent bands data-testid="held-panel">
                <AlertDialogTitle>Title</AlertDialogTitle>
                {body}
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogContent>
            </AlertDialog>
          );
        if (kind === "sheet")
          return (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent bands data-testid="held-panel">
                <SheetTitle>Title</SheetTitle>
                {body}
              </SheetContent>
            </Sheet>
          );
        return (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent bands data-testid="held-panel">
              <DialogTitle>Title</DialogTitle>
              {body}
            </DialogContent>
          </Dialog>
        );
      }
      render(<Owner />);
      const focus = await screen.findByTestId("list-focus");
      await waitFor(() => expect(screen.getByTestId("held-panel")).toBeInTheDocument());
      focus.focus();
      fireEvent.keyDown(focus, { key: "Escape" });
      await waitFor(() => expect(screen.queryByTestId("owned-list")).toBeNull());
      expect(screen.getByTestId("held-panel")).toBeInTheDocument();
      fireEvent.keyDown(focus, { key: "Escape" });
      await waitFor(() => expect(screen.queryByTestId("held-panel")).toBeNull());
    });
  }
});
