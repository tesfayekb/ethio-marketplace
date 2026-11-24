"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { LIST_MOTION, LIST_SURFACE } from "@/components/shell/menu-row";
import { cn } from "@/lib/utils";
import { collisionPaddingNow, visibleArea } from "@/lib/visible-area";

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

/**
 * Lovable bundle 8 (INC-1271, ruling 2) — A PANEL'S PLACE BY ITS ROOM. `room.from` is the
 * button the panel opens from and `room.floor` the panel's height with six choices in view.
 * Read once, as the panel mounts, inside the visible area (D267): below the button when the room
 * there holds the floor; else above it when that room does; else the panel covers its button,
 * its top at the visible area's top edge (a virtual anchor there, at the button's horizontal
 * place). The max-height is always the room the placement gives, so Radix never flips it.
 */
export type PanelRoom = { from: { readonly current: HTMLElement | null }; floor: number };
type Place = { side: "top" | "bottom"; maxHeight: number; anchor: DOMRect | null };

function placeByRoom(
  button: { top: number; bottom: number; left: number; width: number },
  area: { top: number; bottom: number },
  floor: number,
): Place {
  const below = area.bottom - button.bottom;
  const above = button.top - area.top;
  if (below >= floor) return { side: "bottom", maxHeight: below, anchor: null };
  if (above >= floor) return { side: "top", maxHeight: above, anchor: null };
  return {
    side: "bottom",
    maxHeight: area.bottom - area.top,
    anchor: new DOMRect(button.left, area.top, button.width, 0),
  };
}

function placeNow(room: PanelRoom | undefined): Place | null {
  const button = room?.from.current ?? null;
  if (room === undefined || button === null) return null;
  return placeByRoom(button.getBoundingClientRect(), visibleArea(), room.floor);
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    variant?: PopoverVariant;
    room?: PanelRoom;
  }
>(
  (
    {
      className,
      variant = "list",
      align = "center",
      sideOffset = 0,
      collisionPadding,
      room,
      side,
      style,
      ...props
    },
    ref,
  ) => {
    // D267 (F4a-2) — mounts on open, so this reads the visible area at that moment.
    const [area] = React.useState(() => collisionPaddingNow());
    const [place] = React.useState(() => placeNow(room));
    const anchor = React.useMemo(
      () =>
        place?.anchor == null
          ? null
          : { current: { getBoundingClientRect: () => place.anchor as DOMRect } },
      [place],
    );
    return (
      <>
        {anchor === null ? null : <PopoverPrimitive.Anchor virtualRef={anchor} />}
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={ref}
            align={align}
            side={place?.side ?? side}
            style={place === null ? style : { ...style, maxHeight: place.maxHeight }}
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
      </>
    );
  },
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
