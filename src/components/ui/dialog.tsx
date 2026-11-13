"use client";

import * as React from "react";
import * as DialogPrimitive from "./dialog-primitive";
import { X } from "lucide-react";

import { useI18n } from "@/i18n";
import { pressTarget } from "@/lib/press";
import { cn } from "@/lib/utils";
import { NoticeOutlet } from "./notice-outlet";
import {
  DIALOG_CLOSE,
  DIALOG_FIT,
  DIALOG_FOOTER,
  DIALOG_GRABBER,
  DIALOG_HEADER,
  DIALOG_LAYER,
  DIALOG_PANEL,
  DIALOG_PHONE,
  DIALOG_SCRIM,
  DIALOG_SIZE,
  DIALOG_TEXT,
  DIALOG_TITLE,
  SCREEN_PANEL,
  type DialogFit,
  type DialogLayer,
  type DialogPhone,
  type DialogSize,
  type DialogVariant,
} from "./dialog-look";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-dialog-scrim=""
    className={cn(DIALOG_SCRIM, DIALOG_LAYER.modal, className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /** panel: the card; screen: the whole screen at every width (turn S6-4) — size, fit and phone
   *  shape the card only. */
  variant?: DialogVariant;
  /** narrow 24rem, default 32rem, wide 56rem — never wider than the screen less 16 px a side. */
  size?: DialogSize;
  /** bounded: as tall as the content, scrolling inside; fill: a tall panel for a map. */
  fit?: DialogFit;
  /** Below md: float (the centred card), sheet (docked to the bottom, with the grabber) or full
   *  (the whole screen). */
  phone?: DialogPhone;
  /** U4i-6 (a), INC-124 — the STACKING LAW: every dialog paints on `modal`; the sensitive-action
   *  step-up alone takes `top`, so it always owns the top layer whatever mounted last. */
  layer?: DialogLayer;
  /** The close button's test id, for a surface whose tests press it. */
  closeTestId?: string;
};

/**
 * INC-1126 — the press that may open a panel. Safari leaves the focus on the page (or on the
 * focusable box around the control) after a click, so the opener is then the control the press
 * landed on, as press.ts names it (`pressTarget`); press.ts's own mark ends at the pointer's
 * release, before the click opens anything. The next press or key ends the gesture; an opening
 * takes the record and empties it.
 */
let pressed: HTMLElement | null = null;
let hearingPresses = false;

function hearPresses(doc: Document) {
  if (hearingPresses) return;
  hearingPresses = true;
  doc.addEventListener(
    "pointerdown",
    (event) => {
      const control = pressTarget(event.target);
      pressed = control instanceof HTMLElement ? control : null;
    },
    true,
  );
  doc.addEventListener(
    "keydown",
    () => {
      pressed = null;
    },
    true,
  );
}

// From the module's first evaluation: a panel mounted only on its opening (`<Dialog open>`) is
// opened by a press that came before any panel's own effect could hear it.
if (typeof document !== "undefined") hearPresses(document);

/** What held the focus when a panel opened, or the gesture's press when the focus sat around it. */
function openerOf(held: Element | null): HTMLElement | null {
  const press = pressed;
  pressed = null;
  const page = held === null || held === held.ownerDocument.body;
  const around = held !== null && held !== press && press !== null && held.contains(press);
  if (press !== null && press.isConnected && (page || around)) return press;
  return held instanceof HTMLElement ? held : null;
}

/** Turn S6-1 — the one dialog panel (dialog-look.ts); the consumer chooses variants, never a look. */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      variant = "panel",
      size = "default",
      fit = "bounded",
      phone = "float",
      layer = "modal",
      closeTestId,
      onOpenAutoFocus,
      onCloseAutoFocus,
      children,
      ...props
    },
    ref,
  ) => {
    const { t } = useI18n();
    const screen = variant === "screen";
    // Turn S6-4 — a screen-sized surface opens from a tap its owner hears, never from a
    // DialogTrigger, and Radix returns the focus to a trigger only: it takes the focus on the panel
    // itself (a phone's keyboard does not rise over it) and gives it back to what held it.
    const screenSized = screen || phone === "full";
    const opener = React.useRef<HTMLElement | null>(null);
    return (
      <DialogPortal>
        <DialogOverlay className={DIALOG_LAYER[layer]} />
        <DialogPrimitive.Content
          ref={ref}
          data-dialog-panel=""
          className={cn(
            screen
              ? SCREEN_PANEL
              : [DIALOG_PANEL, DIALOG_SIZE[size], DIALOG_FIT[fit], DIALOG_PHONE[phone]],
            DIALOG_LAYER[layer],
            className,
          )}
          onOpenAutoFocus={(event) => {
            const panel = event.target;
            if (panel instanceof HTMLElement) {
              const held = openerOf(panel.ownerDocument.activeElement);
              if (screenSized) opener.current = held;
            }
            onOpenAutoFocus?.(event);
            if (!screenSized || event.defaultPrevented || !(panel instanceof HTMLElement)) return;
            event.preventDefault();
            panel.focus({ preventScroll: true });
          }}
          onCloseAutoFocus={(event) => {
            onCloseAutoFocus?.(event);
            const back = opener.current;
            opener.current = null;
            if (event.defaultPrevented || back === null || !back.isConnected) return;
            if (back === back.ownerDocument.body) return;
            event.preventDefault();
            back.focus({ preventScroll: true });
          }}
          {...props}
        >
          {!screen && phone === "sheet" ? (
            <div
              aria-hidden="true"
              data-dialog-grabber=""
              className={cn(DIALOG_GRABBER, "md:hidden")}
            />
          ) : null}
          {children}
          {/* INC-955 — the shell's notices are drawn here while this dialog is open. */}
          <NoticeOutlet />
          <DialogPrimitive.Close data-testid={closeTestId} className={DIALOG_CLOSE}>
            <X aria-hidden="true" />
            {/* D1 — screen-reader text is user-visible text. */}
            <span className="sr-only">{t("common.close")}</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(DIALOG_HEADER, className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(DIALOG_FOOTER, className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn(DIALOG_TITLE, className)} {...props} />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn(DIALOG_TEXT, className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
