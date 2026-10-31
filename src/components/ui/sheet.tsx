"use client";

import * as React from "react";
import * as SheetPrimitive from "./dialog-primitive";
import { X } from "lucide-react";

import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { NoticeOutlet } from "./notice-outlet";
import {
  DIALOG_CLOSE,
  DIALOG_FOOTER,
  DIALOG_GRABBER,
  DIALOG_HEADER,
  DIALOG_LAYER,
  DIALOG_SCRIM,
  DIALOG_TEXT,
  DIALOG_TITLE,
  SHEET_PANEL,
  SHEET_SIDE,
  type SheetSide,
} from "./dialog-look";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(DIALOG_SCRIM, DIALOG_LAYER.modal, className)}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  /** The edge it docks to, in the reading direction: start, end, or the bottom (with the grabber). */
  side?: SheetSide;
  /** The close button's test id, for a surface whose tests press it. */
  closeTestId?: string;
}

/** Turn S6-1 — the dialog's surface on a sheet (dialog-look.ts); the consumer chooses the side. */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "end", className, closeTestId, children, ...props }, ref) => {
  const { t } = useI18n();
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        data-dialog-panel=""
        className={cn(SHEET_PANEL, DIALOG_LAYER.modal, SHEET_SIDE[side], className)}
        {...props}
      >
        {side === "bottom" ? <div aria-hidden="true" className={DIALOG_GRABBER} /> : null}
        {children}
        {/* INC-955 — the shell's notices are drawn here while this sheet is open. */}
        <NoticeOutlet />
        <SheetPrimitive.Close data-testid={closeTestId} className={DIALOG_CLOSE}>
          <X aria-hidden="true" />
          {/* D1 — screen-reader text is user-visible text. */}
          <span className="sr-only">{t("common.close")}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(DIALOG_HEADER, className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(DIALOG_FOOTER, className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn(DIALOG_TITLE, className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn(DIALOG_TEXT, className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
