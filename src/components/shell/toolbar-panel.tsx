import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { IconButtonBare } from "@/components/ui/icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useI18n } from "@/i18n";

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
 * footer staying in view, as the phone's sheet already does (max-h 85dvh). A
 * long panel — every top category in My listings' Filters — ran past the
 * window's bottom, where nothing could reach it (MLP-6, desktop-1280).
 */
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
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [openedWith, setOpenedWith] = useState(state);
  const onOpenChange = (next: boolean) => {
    if (next) setOpenedWith(state);
    setOpen(next);
  };
  const close = () => setOpen(false);
  const foot = footer?.(close, state !== openedWith) ?? null;

  if (isMobile) {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/45" />
          <DialogPrimitive.Content
            data-testid={`${testid}-panel`}
            aria-describedby={undefined}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl bg-card text-card-foreground shadow-sheet focus:outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom"
          >
            <span
              aria-hidden="true"
              className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-input"
            />
            <div className="flex min-w-0 items-center gap-2 border-b border-border/70 py-1.5 pe-1 ps-4">
              <DialogPrimitive.Title className="min-w-0 flex-1 truncate text-lg font-bold text-foreground">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close asChild>
                <IconButtonBare
                  data-testid={`${testid}-close`}
                  label={t("common.close")}
                  size="touch"
                  icon={<X />}
                />
              </DialogPrimitive.Close>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
            {foot !== null ? (
              <div className="flex min-w-0 items-center gap-3 border-t border-border/70 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
                {foot}
              </div>
            ) : null}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={align}
        collisionPadding={16}
        data-testid={`${testid}-panel`}
        className="flex max-h-(--radix-popover-content-available-height) w-80 max-w-[calc(100vw-2rem)] flex-col p-0"
      >
        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
        {foot !== null ? (
          <div className="flex min-w-0 shrink-0 items-center gap-3 border-t border-border/70 px-4 py-3">
            {foot}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

export default ToolbarPanel;
