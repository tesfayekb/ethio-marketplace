import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LIST_ROW, LIST_ROW_WRAP } from "@/components/shell/menu-row";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "./alert-dialog";
import { buttonVariants } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  DIALOG_CLOSE,
  DIALOG_FIELD,
  DIALOG_FOOTER,
  DIALOG_GRABBER,
  DIALOG_PANEL,
  DIALOG_SCRIM,
  DIALOG_TEXT,
  DIALOG_TITLE,
  SHEET_PANEL,
  SHEET_SIDE,
} from "./dialog-look";
import { Input } from "./input";
import { Sheet, SheetContent, SheetTitle } from "./sheet";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

/**
 * Turn S6-1 (Sage §14, D268) — the three primitives draw dialog-look.ts's constants and nothing
 * of their own; a consumer picks a variant (size, fit, phone, layer; tone; side).
 */
function classesOf(look: string): string[] {
  return look.split(/\s+/).filter(Boolean);
}

function expectLook(element: Element | null, look: string) {
  expect(element).not.toBeNull();
  const have = new Set(element?.className.split(/\s+/));
  expect(classesOf(look).filter((cls) => !have.has(cls))).toEqual([]);
}

describe("one dialog look (turn S6-1)", () => {
  it("DG-U1 a dialog's parts render the constants; its variants choose size, layer and the phone sheet", async () => {
    render(
      <Dialog open>
        <DialogContent data-testid="panel" size="wide" phone="sheet" layer="top" closeTestId="x">
          <DialogHeader>
            <DialogTitle data-testid="title">t</DialogTitle>
            <DialogDescription data-testid="text">d</DialogDescription>
          </DialogHeader>
          <Input data-testid="field" />
          <DialogFooter data-testid="footer">f</DialogFooter>
        </DialogContent>
      </Dialog>,
    );
    const panel = await waitFor(() => screen.getByTestId("panel"));
    expectLook(panel, DIALOG_PANEL);
    expect(panel).toHaveAttribute("data-dialog-panel");
    expect(panel.className).toContain("max-w-4xl");
    expect(panel.className).toContain("z-[100]");
    expect(panel.className).toContain("max-md:bottom-0");
    expectLook(panel.querySelector(".bg-hairline.rounded-full"), DIALOG_GRABBER);
    const scrim = document.querySelector(".bg-scrim");
    expectLook(scrim, DIALOG_SCRIM);
    expect(scrim?.className).toContain("z-[100]");
    expectLook(screen.getByTestId("title"), DIALOG_TITLE);
    expectLook(screen.getByTestId("text"), DIALOG_TEXT);
    expectLook(screen.getByTestId("footer"), DIALOG_FOOTER);
    expectLook(screen.getByTestId("x"), DIALOG_CLOSE);
    expect(screen.getByTestId("x")).toHaveTextContent("common.close");
    expectLook(screen.getByTestId("field"), DIALOG_FIELD);
  });

  it("DG-U2 an alert dialog has no close button; its action takes the destructive tone, its cancel the outline", async () => {
    render(
      <AlertDialog open>
        <AlertDialogContent data-testid="alert">
          <AlertDialogTitle>t</AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="cancel">c</AlertDialogCancel>
            <AlertDialogAction data-testid="act" tone="destructive">
              a
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const alert = await waitFor(() => screen.getByTestId("alert"));
    expectLook(alert, DIALOG_PANEL);
    expect(alert).toHaveAttribute("data-dialog-panel");
    expect(alert.querySelector('[class*="size-11"]')).toBeNull();
    expectLook(
      screen.getByTestId("act"),
      buttonVariants({ variant: "destructive", size: "touch" }),
    );
    expectLook(screen.getByTestId("cancel"), buttonVariants({ variant: "outline", size: "touch" }));
  });

  it.each(["start", "end", "bottom"] as const)(
    "DG-U3 a sheet from the %s edge takes its logical edge, no physical side, and the grabber only at the bottom",
    async (side) => {
      render(
        <Sheet open>
          <SheetContent data-testid="sheet" side={side}>
            <SheetTitle>t</SheetTitle>
          </SheetContent>
        </Sheet>,
      );
      const sheet = await waitFor(() => screen.getByTestId("sheet"));
      expectLook(sheet, SHEET_PANEL);
      expectLook(sheet, SHEET_SIDE[side]);
      expect(sheet).toHaveAttribute("data-dialog-panel");
      expect(sheet.className).not.toMatch(/(?:^|\s)(?:left|right)-|rounded-[lr]-/);
      const grabber = sheet.querySelector(".bg-hairline.rounded-full");
      expect(grabber !== null).toBe(side === "bottom");
    },
  );

  it("DG-U4 the wrap option drops LIST_ROW's single line and its cut", () => {
    const merged = classesOf(cn(LIST_ROW, LIST_ROW_WRAP));
    expect(merged).not.toContain("whitespace-nowrap");
    expect(merged).not.toContain("[&>span]:truncate");
    expect(merged).toContain("whitespace-normal");
    expect(merged).toContain("[&>span]:whitespace-normal");
  });
});
