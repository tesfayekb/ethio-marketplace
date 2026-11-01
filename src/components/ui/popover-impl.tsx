"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { LIST_MOTION, LIST_SURFACE } from "@/components/shell/menu-row";
import { cn } from "@/lib/utils";
import { collisionPaddingNow } from "@/lib/visible-area";

/**
 * Turn S6-3 (DEC-259's row 48) — THE POPOVER'S OWN CODE: Radix's popover, the visible area it
 * keeps clear (D267) and the open list's surface (D264). It arrives with the other overlay
 * primitives through overlay-loader.ts; popover.tsx is its facade.
 */
const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

/** list: a small surface of its own content; panel: a toolbar's panel from md — a bounded
 *  column with the dialog's 22 × 24 px padding, so the dialog footer (DIALOG_FOOTER) spans it,
 *  and the dialog's field look inside (data-dialog-panel). */
const POPOVER_VARIANT = {
  list: "w-72 p-4",
  panel:
    "flex max-h-(--radix-popover-content-available-height) w-80 max-w-[calc(100vw-2rem)] flex-col gap-4 px-6 py-5.5",
} as const;
export type PopoverVariant = keyof typeof POPOVER_VARIANT;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & { variant?: PopoverVariant }
>(
  (
    { className, variant = "list", align = "center", sideOffset = 0, collisionPadding, ...props },
    ref,
  ) => {
    // D267 (F4a-2) — mounts on open, so this reads the visible area at that moment.
    const [area] = React.useState(() => collisionPaddingNow());
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding ?? area}
          data-dialog-panel={variant === "panel" ? "" : undefined}
          className={cn(
            // D264 (turn F): the open list's surface and motion; the variant sets size and padding.
            "z-50 outline-none",
            LIST_SURFACE,
            LIST_MOTION,
            POPOVER_VARIANT[variant],
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  },
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
