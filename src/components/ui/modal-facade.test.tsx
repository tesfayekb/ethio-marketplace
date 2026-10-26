import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

/**
 * DEC-260 (Foundations turn 32) — the modal facades (the dialog, the alert
 * dialog): a closed modal draws its trigger alone; the first opening draws the
 * real Radix root around the children, open, and Radix's own focus handling
 * takes over. The module is already here (src/test/setup.ts).
 */
function Plain() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="dialog-trigger">Share</Button>
      </DialogTrigger>
      <DialogContent data-testid="dialog">
        <DialogTitle>Share the ad</DialogTitle>
        <Button data-testid="dialog-inside">Copy link</Button>
      </DialogContent>
    </Dialog>
  );
}

describe("the modal facades (DEC-260)", () => {
  it("OVF-11 a closed dialog draws only its trigger, with the closed state's attributes, on the server and at first", () => {
    const html = renderToString(<Plain />);
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('data-state="closed"');
    expect(html).not.toContain("Share the ad");
    render(<Plain />);
    expect(screen.queryByTestId("dialog")).toBeNull();
  });

  it("OVF-12 the first click opens the dialog with the focus inside; Escape closes it and gives the focus back to the trigger", async () => {
    render(<Plain />);
    fireEvent.click(screen.getByTestId("dialog-trigger"));
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId("dialog").contains(document.activeElement)).toBe(true),
    );
    const trigger = screen.getByTestId("dialog-trigger");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(screen.getByTestId("dialog"), { key: "Escape" });
    expect(screen.queryByTestId("dialog")).toBeNull();
    await waitFor(() => expect(screen.getByTestId("dialog-trigger")).toHaveFocus());
  });

  it("OVF-13 a controlled dialog: the trigger asks its owner to open it, and the owner's open draws it", () => {
    const asked: boolean[] = [];
    function Owned() {
      const [open, setOpen] = useState(false);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            asked.push(next);
            setOpen(next);
          }}
        >
          <DialogTrigger asChild>
            <Button data-testid="owned-trigger">Filters</Button>
          </DialogTrigger>
          <DialogContent data-testid="owned-dialog">
            <DialogTitle>Filters</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    render(<Owned />);
    fireEvent.click(screen.getByTestId("owned-trigger"));
    expect(asked).toEqual([true]);
    expect(screen.getByTestId("owned-dialog")).toBeInTheDocument();
  });

  it("OVF-14 the first click opens the alert dialog; Cancel closes it", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button data-testid="alert-trigger">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent data-testid="alert">
          <AlertDialogTitle>Delete the ad?</AlertDialogTitle>
          <AlertDialogCancel data-testid="alert-cancel">Keep it</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>,
    );
    fireEvent.click(screen.getByTestId("alert-trigger"));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("alert-cancel"));
    expect(screen.queryByRole("alertdialog")).toBeNull();
    await waitFor(() => expect(screen.getByTestId("alert-trigger")).toHaveFocus());
  });

  it("OVF-15 an uncontrolled dialog's owner hears the first opening and the closing, as from Radix's", () => {
    const heard: boolean[] = [];
    render(
      <Dialog onOpenChange={(next) => heard.push(next)}>
        <DialogTrigger asChild>
          <Button data-testid="heard-trigger">Report</Button>
        </DialogTrigger>
        <DialogContent data-testid="heard-dialog">
          <DialogTitle>Report the ad</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByTestId("heard-trigger"));
    expect(screen.getByTestId("heard-dialog")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId("heard-dialog"), { key: "Escape" });
    expect(screen.queryByTestId("heard-dialog")).toBeNull();
    expect(heard).toEqual([true, false]);
  });
});
