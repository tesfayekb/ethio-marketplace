"use client";

import * as React from "react";
import * as DialogPrimitive from "./dialog-primitive";
import { X } from "lucide-react";

import { useI18n } from "@/i18n";
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
  type DialogFit,
  type DialogLayer,
  type DialogPhone,
  type DialogSize,
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
    className={cn(DIALOG_SCRIM, DIALOG_LAYER.modal, className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /** narrow 24rem, default 32rem, wide 56rem — never wider than the screen less 16 px a side. */
  size?: DialogSize;
  /** bounded: as tall as the content, scrolling inside; fill: a tall panel for a map. */
  fit?: DialogFit;
  /** Below md: float (the centred card) or sheet (docked to the bottom, with the grabber). */
  phone?: DialogPhone;
  /** U4i-6 (a), INC-124 — the STACKING LAW: every dialog paints on `modal`; the sensitive-action
   *  step-up alone takes `top`, so it always owns the top layer whatever mounted last. */
  layer?: DialogLayer;
  /** The close button's test id, for a surface whose tests press it. */
  closeTestId?: string;
};

/** Turn S6-1 — the one dialog panel (dialog-look.ts); the consumer chooses variants, never a look. */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      size = "default",
      fit = "bounded",
      phone = "float",
      layer = "modal",
      closeTestId,
      children,
      ...props
    },
    ref,
  ) => {
    const { t } = useI18n();
    return (
      <DialogPortal>
        <DialogOverlay className={DIALOG_LAYER[layer]} />
        <DialogPrimitive.Content
          ref={ref}
          data-dialog-panel=""
          className={cn(
            DIALOG_PANEL,
            DIALOG_LAYER[layer],
            DIALOG_SIZE[size],
            DIALOG_FIT[fit],
            DIALOG_PHONE[phone],
            className,
          )}
          {...props}
        >
          {phone === "sheet" ? (
            <div aria-hidden="true" className={cn(DIALOG_GRABBER, "md:hidden")} />
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
