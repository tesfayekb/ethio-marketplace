import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { LIST_MOTION, LIST_SURFACE } from "@/components/shell/menu-row";
import { cn } from "@/lib/utils";
import { collisionPaddingNow } from "@/lib/visible-area";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 0, collisionPadding, ...props }, ref) => {
  // D267 (F4a-2) — mounts on open, so this reads the visible area at that moment.
  const [area] = React.useState(() => collisionPaddingNow());
  return (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding ?? area}
      className={cn(
        // D264 (turn F): the open list's surface and motion; a popover keeps its own padding.
        "z-50 w-72 outline-none",
        LIST_SURFACE,
        LIST_MOTION,
        "p-4",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
