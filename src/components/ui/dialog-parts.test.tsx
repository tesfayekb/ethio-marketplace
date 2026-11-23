import * as React from "react";
import { act, fireEvent, render as renderView, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, expectTypeOf, it, onTestFinished, vi } from "vitest";

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
import { CLOSED_PRIMARY, CUE_MIN_BODY_REM, CUE_ROOM, DIALOG_TONE } from "./dialog-parts-look";
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
          <PanelBody cueLabel="dialog.moreBelow" testId="body">
            x
          </PanelBody>
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
    render(
      <PanelSubject
        testId="subject"
        title={typed}
        lines={["100 ETB", "Addis", "third", "fourth"]}
      />,
    );
    const subject = screen.getByTestId("subject");
    expect(subject.querySelector("img")).toBeNull();
    expect(subject).toHaveTextContent(typed);
    expect(subject).toHaveTextContent("third");
    expect(subject).not.toHaveTextContent("fourth");
  });

  it("DP-U4 the plain hint shows while more lies below, never takes a press and goes at the end", async () => {
    render(
      <PanelBody cueLabel="dialog.moreBelow" testId="body">
        <p>long</p>
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    sized(body, { scrollHeight: 1000, clientHeight: 400 });
    const scrollBy = vi.fn();
    Object.defineProperty(body, "scrollBy", { configurable: true, value: scrollBy });
    act(() => {
      body.dispatchEvent(new Event("scroll"));
    });
    const cue = await screen.findByText("dialog.moreBelow");
    expect(cue.closest("[aria-hidden=true]")).not.toBeNull();
    expect(body.querySelector("[data-scroll-cue] button")).toBeNull();
    fireEvent.click(cue);
    expect(scrollBy).not.toHaveBeenCalled();
    act(() => {
      body.scrollTop = 600;
      body.dispatchEvent(new Event("scroll"));
    });
    expect(screen.queryByText("dialog.moreBelow")).toBeNull();
  });

  it("DP-U32 while the cue shows the body keeps its room as scroll padding; at the end and in the fill form none", async () => {
    const { unmount } = render(
      <PanelBody cueLabel="dialog.moreBelow" testId="body">
        <p>long</p>
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    sized(body, { scrollHeight: 1000, clientHeight: 400 });
    act(() => {
      body.dispatchEvent(new Event("scroll"));
    });
    await screen.findByText("dialog.moreBelow");
    expect(body.style.scrollPaddingBottom).toBe(CUE_ROOM);
    act(() => {
      body.scrollTop = 600;
      body.dispatchEvent(new Event("scroll"));
    });
    expect(screen.queryByText("dialog.moreBelow")).toBeNull();
    expect(body.style.scrollPaddingBottom).toBe("");
    unmount();
    render(
      <PanelBody fill cueLabel="dialog.moreBelow" testId="fill">
        <div />
      </PanelBody>,
    );
    const fill = screen.getByTestId("fill");
    sized(fill, { scrollHeight: 1000, clientHeight: 400 });
    fireEvent.scroll(fill);
    expect(fill.style.scrollPaddingBottom).toBe("");
  });

  it("DP-U5 with reduced motion the hint still never scrolls on press", async () => {
    const before = window.matchMedia;
    window.matchMedia = ((query: string) =>
      ({ matches: query.includes("reduce") }) as MediaQueryList) as typeof window.matchMedia;
    onTestFinished(() => {
      window.matchMedia = before;
    });
    render(
      <PanelBody cueLabel="dialog.moreBelow" testId="body">
        x
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    sized(body, { scrollHeight: 1000, clientHeight: 400 });
    const scrollBy = vi.fn();
    Object.defineProperty(body, "scrollBy", { configurable: true, value: scrollBy });
    act(() => {
      body.dispatchEvent(new Event("scroll"));
    });
    fireEvent.click(await screen.findByText("dialog.moreBelow"));
    expect(scrollBy).not.toHaveBeenCalled();
  });

  it("DP-U33 below 5rem the body has no hint or padding; at 5rem both appear", () => {
    render(
      <PanelBody cueLabel="Hint" testId="threshold">
        Content
      </PanelBody>,
    );
    const body = screen.getByTestId("threshold");
    expect(CUE_MIN_BODY_REM).toBe(5);
    expect(CUE_ROOM).toBe("clamp(0px, 100% - 3rem, 2rem)");
    sized(body, { scrollHeight: 1000, clientHeight: 79 });
    fireEvent.scroll(body);
    expect(body.querySelector("[data-scroll-cue]")).toBeNull();
    expect(body.style.scrollPaddingBottom).toBe("");
    sized(body, { scrollHeight: 1000, clientHeight: 80 });
    fireEvent.scroll(body);
    const hint = body.querySelector("[data-scroll-cue]");
    expect(hint).not.toBeNull();
    expect(hint?.closest("[aria-hidden=true]")).not.toBeNull();
    expect(hint?.querySelector("button, a, input, [tabindex]")).toBeNull();
    expect(hint?.className).toContain("pointer-events-none");
    expect(body.style.scrollPaddingBottom).toBe(CUE_ROOM);
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

  it("DP-U18 an action row can keep an external link and its channel handler on the link", () => {
    const press = vi.fn();
    render(
      <ActionRow asChild icon={<span>i</span>} data-testid="action-link">
        <a href="https://example.test/share" onClick={press}>
          Share
        </a>
      </ActionRow>,
    );
    const link = screen.getByTestId("action-link");
    expect(link).toHaveAttribute("href", "https://example.test/share");
    link.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(link);
    expect(press).toHaveBeenCalledTimes(1);
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
  it("DP-U31 busy disables the closed primary, names the busy state and admits no disabled prop", () => {
    expectTypeOf<
      Extract<keyof React.ComponentProps<typeof ClosedPrimary>, "disabled">
    >().toEqualTypeOf<never>();
    const closed = vi.fn();
    const submit = vi.fn();
    const { rerender } = render(
      <ClosedPrimary closed busy onClosedPress={closed} onClick={submit}>
        Save
      </ClosedPrimary>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(closed).not.toHaveBeenCalled();
    expect(submit).not.toHaveBeenCalled();
    rerender(
      <ClosedPrimary closed onClosedPress={closed} onClick={submit}>
        Save
      </ClosedPrimary>,
    );
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(closed).toHaveBeenCalledTimes(1);
    expect(submit).not.toHaveBeenCalled();
    rerender(
      <ClosedPrimary closed={false} onClosedPress={closed} onClick={submit}>
        Save
      </ClosedPrimary>,
    );
    fireEvent.click(button);
    expect(submit).toHaveBeenCalledTimes(1);
  });
  it("DP-U12 the cue is a zero-height anchor stuck to the scroller's end, so it adds no height", () => {
    render(
      <PanelBody cueLabel="dialog.moreBelow" testId="body">
        <p>Content</p>
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    sized(body, { scrollHeight: 1000, clientHeight: 400 });
    fireEvent.scroll(body);
    const pill = screen.getByText("dialog.moreBelow");
    const anchor = pill.closest("[data-scroll-cue]")?.parentElement as HTMLElement;
    // The anchor is the scroller's own last child, after the content; it is zero tall and sticks
    // to the bottom edge, so the content does not move when it comes or goes (the browser proof
    // is DLG-E10).
    expect(anchor.parentElement).toBe(body);
    expect(body.lastElementChild).toBe(anchor);
    expect(classes(anchor.className)).toEqual(
      expect.arrayContaining(["sticky", "bottom-0", "h-0", "pointer-events-none"]),
    );
    body.scrollTop = 600;
    fireEvent.scroll(body);
    expect(screen.queryByText("dialog.moreBelow")).toBeNull();
    expect(body.children).toHaveLength(1);
  });
  it("DP-U27 the body is one element and a block scroller; its content is never its flex item", () => {
    render(
      <PanelBody cueLabel="dialog.moreBelow" testId="body">
        <p data-testid="first">Content</p>
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    expect(body).toHaveAttribute("data-panel-body");
    // A flex scroller squeezes a fixed-height child and, wrapped, does not scroll in WebKit.
    expect(classes(body.className)).not.toContain("flex");
    // `grow`, never `flex-1`: with a zero basis WebKit gives the body no height in a panel
    // that fits its content. `relative`: the scroller holds its absolutely placed descendants.
    expect(classes(body.className)).not.toContain("flex-1");
    expect(classes(body.className)).toEqual(
      expect.arrayContaining(["relative", "min-h-0", "grow", "overflow-y-auto", "px-6"]),
    );
    const flow = body.firstElementChild as HTMLElement;
    expect(flow).toContainElement(screen.getByTestId("first"));
    expect(classes(flow.className)).toEqual(
      expect.arrayContaining(["flex", "flex-col", "gap-3", "py-4"]),
    );
    // The top and bottom inset is the content's: the cue sticks to the body's true bottom edge.
    expect(classes(body.className)).not.toContain("py-4");
  });
  it("DP-U28 a fill body gives its one child the room: no scroll, no cue, no inset", () => {
    render(
      <PanelBody fill cueLabel="dialog.moreBelow" testId="body">
        <div data-testid="map" />
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    sized(body, { scrollHeight: 1000, clientHeight: 400 });
    fireEvent.scroll(body);
    expect(screen.queryByText("dialog.moreBelow")).toBeNull();
    expect(screen.getByTestId("map").parentElement).toBe(body);
    expect(classes(body.className)).toEqual(
      expect.arrayContaining(["flex", "flex-col", "min-h-0", "flex-1", "overflow-hidden"]),
    );
    expect(classes(body.className)).not.toContain("px-6");
    expect(classes(body.className)).not.toContain("overflow-y-auto");
  });
  it("DP-U29 a flush body has no inset; the last band carries the bottom inset", () => {
    const inset = "pb-[calc(1.375rem+env(safe-area-inset-bottom))]";
    const { rerender } = render(
      <PanelBody flush cueLabel="dialog.moreBelow" testId="body">
        <p>Content</p>
      </PanelBody>,
    );
    let body = screen.getByTestId("body");
    expect(classes(body.className)).not.toContain("px-6");
    expect(classes((body.firstElementChild as HTMLElement).className)).not.toContain("py-4");
    rerender(
      <PanelBody end cueLabel="dialog.moreBelow" testId="body">
        <p>Content</p>
      </PanelBody>,
    );
    body = screen.getByTestId("body");
    expect(classes((body.firstElementChild as HTMLElement).className)).toContain(inset);
    expect(classes(body.className)).not.toContain(inset);
    rerender(
      <PanelBody fill end cueLabel="dialog.moreBelow" testId="body">
        <p>Content</p>
      </PanelBody>,
    );
    expect(classes(screen.getByTestId("body").className)).toContain(inset);
  });
  it("DP-U30 a banded panel docked on a phone has no inset of its own; an unbanded one keeps it", async () => {
    const inset = "max-md:pb-[calc(1.375rem+env(safe-area-inset-bottom))]";
    for (const phone of ["sheet", "full"] as const) {
      for (const bands of [true, false]) {
        const view = render(
          <Dialog open>
            <DialogContent phone={phone} bands={bands} data-testid="panel">
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Text</DialogDescription>
            </DialogContent>
          </Dialog>,
        );
        const panel = await screen.findByTestId("panel");
        expect(classes(panel.className).includes(inset), `${phone} bands=${bands}`).toBe(!bands);
        view.unmount();
      }
    }
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

describe("Part D body and subject rules", () => {
  it("DP-U19 nothing produces no body, including after content leaves", () => {
    const { container, rerender } = render(<PanelBody cueLabel="More">{null}</PanelBody>);
    expect(container).toBeEmptyDOMElement();
    rerender(<PanelBody cueLabel="More">Content</PanelBody>);
    expect(container).toHaveTextContent("Content");
    rerender(<PanelBody cueLabel="More">{[null, false, undefined]}</PanelBody>);
    expect(container).toBeEmptyDOMElement();
  });

  it("DP-U20 the subject retains three held lines and discards only subsequent lines", () => {
    render(
      <PanelSubject testId="subject" title="Held" lines={["First", "Second", "Third", "Fourth"]} />,
    );
    expect(screen.getByTestId("subject").textContent).toBe("HeldFirstSecondThird");
  });

  it("DP-U21 the real body uses the supplied cue words without app state", () => {
    render(
      <PanelBody cueLabel="Supplied cue" testId="body">
        Content
      </PanelBody>,
    );
    const body = screen.getByTestId("body");
    sized(body, { scrollHeight: 1000, clientHeight: 400 });
    fireEvent.scroll(body);
    expect(screen.getByText("Supplied cue")).toBeInTheDocument();
  });
});
