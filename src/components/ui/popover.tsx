"use client";

import * as React from "react";

import { OverlayContent, OverlayRoot, OverlayTrigger } from "./overlay-facade";
import type * as Impl from "./popover-impl";

/**
 * Turn S6-3 (DEC-259's row 48) — THE POPOVER, ITS CODE ON DEMAND. The same parts as before;
 * Radix's popover, the visible area and the list surface (popover-impl.tsx) arrive on the
 * trigger's first click — replayed on the same element once they are here — or once the page
 * is idle (overlay-facade.tsx); a hover or a focus on the trigger starts the download. A
 * controlled `open` is passed through: an owner that opens it has it drawn once the module is
 * here.
 */
function Popover({ children, ...rootProps }: React.ComponentProps<typeof Impl.Popover>) {
  return (
    <OverlayRoot
      kind="popover"
      openAtStart={rootProps.open === true || rootProps.defaultOpen === true}
      real={(impl, { collector, content }) => (
        <impl.popover.Popover {...rootProps}>
          <impl.popover.PopoverTrigger asChild>{collector}</impl.popover.PopoverTrigger>
          {content !== null ? <impl.popover.PopoverContent {...content} /> : null}
        </impl.popover.Popover>
      )}
    >
      {children}
    </OverlayRoot>
  );
}

/** Always asChild: the consumer's own element is the trigger. */
function PopoverTrigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.PopoverTrigger> & { asChild: true }) {
  return <OverlayTrigger kind="popover" part="PopoverTrigger" {...props} />;
}

function PopoverContent(props: React.ComponentProps<typeof Impl.PopoverContent>) {
  return <OverlayContent kind="popover" part="PopoverContent" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent };
