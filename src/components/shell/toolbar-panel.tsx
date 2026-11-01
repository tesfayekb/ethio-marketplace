import { useState, type ReactNode } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Bundle 11 V2 (D132, INC-543) — THE PANEL OF A TOOLBAR BUTTON (Filters,
 * Columns). From md it is a popover under its button. On a phone it is a
 * BOTTOM SHEET (Filament's mobile panels, the agreed board): a grabber, the
 * panel's name with a 44 px close, the content, and its own footer — a modal
 * that a focus change can never close (INC-543: the phone's native list, opened
 * inside the old popover, took the focus away and the popover closed under it).
 *
 * Testid: the content is `${testid}-panel` in both forms; Escape closes both.
 * `footer` receives `close` for its primary button ("Done", "Show 12 results").
 *
 * Bundle 11 V2c (the operator's walk, 2026-10-11) — `state` is the panel's
 * choices written as one string. The panel keeps the string it opened with,
 * and `footer` receives `changed`: true only while the choices differ from
 * that string (a choice set back is no change). The primary button is
 * enabled only then; the close (×), Escape and a tap outside always close.
 *
 * Bundle 16 turn R3 (INC-633) — from md the popover is never taller than the
 * room the window leaves it: its height is bounded by Radix's available height
 * (16 px kept from the window's edge) and its content scrolls inside it, the
 * footer staying in view, as the phone's sheet already does. A long panel —
 * every top category in My listings' Filters — ran past the window's bottom,
 * where nothing could reach it (MLP-6, desktop-1280).
 *
 * Turn S6-3 (row 48) — the panel draws no look of its own: on a phone it is
 * the sheet's bottom side (the scrim, the grabber, the title, the close and
 * the notices come with it), from md the popover's panel variant (fetched on
 * the first press); both lay the footer's link and its primary in the shared
 * footer part, in one row.
 */
const BODY = "-mx-6 -my-1 min-h-0 flex-1 overflow-y-auto px-6 py-1";
const FOOT = "flex-row items-center";

export function ToolbarPanel({
  testid,
  title,
  trigger,
  children,
  footer,
  state,
  align = "start",
}: {
  testid: string;
  title: string;
  trigger: ReactNode;
  children: ReactNode;
  footer?: (close: () => void, changed: boolean) => ReactNode;
  state: string;
  align?: "start" | "end";
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [openedWith, setOpenedWith] = useState(state);
  const onOpenChange = (next: boolean) => {
    if (next) setOpenedWith(state);
    setOpen(next);
  };
  const close = () => setOpen(false);
  const foot = footer?.(close, state !== openedWith) ?? null;
  const body = <div className={BODY}>{children}</div>;
  const footPart = foot !== null ? <SheetFooter className={FOOT}>{foot}</SheetFooter> : null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="bottom"
          data-testid={`${testid}-panel`}
          closeTestId={`${testid}-close`}
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          {body}
          {footPart}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent variant="panel" align={align} data-testid={`${testid}-panel`}>
        {body}
        {footPart}
      </PopoverContent>
    </Popover>
  );
}

export default ToolbarPanel;
