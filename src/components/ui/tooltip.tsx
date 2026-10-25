"use client";

import * as React from "react";

import { OverlayContent, OverlayRoot, OverlayTrigger } from "./overlay-facade";
import type * as Impl from "./tooltip-impl";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE TOOLTIP, ITS CODE ON DEMAND.
 * The same four parts as before; the Radix tooltip itself (tooltip-impl.tsx)
 * arrives on the trigger's first hover or keyboard focus, or once the page is
 * idle (overlay-facade.tsx). Every tooltip's real root carries its own Radix
 * provider; TooltipProvider keeps the group's timing — once one tooltip in the
 * group has opened, the next opens at once until the skip delay has passed, as
 * Radix's shared provider does.
 */
interface Group {
  delayDuration: number;
  skipDelayDuration: number;
  disableHoverableContent?: boolean;
  /** A tooltip of the group is open, or closed less than the skip delay ago. */
  warm: boolean;
  opened(): void;
  closed(): void;
}

const DEFAULT_GROUP: Group = {
  delayDuration: 700,
  skipDelayDuration: 300,
  warm: false,
  opened: () => undefined,
  closed: () => undefined,
};

const GroupContext = React.createContext<Group>(DEFAULT_GROUP);

function TooltipProvider({
  children,
  delayDuration = 700,
  skipDelayDuration = 300,
  disableHoverableContent,
}: React.ComponentProps<typeof Impl.TooltipProvider>) {
  const [warm, setWarm] = React.useState(false);
  const cool = React.useRef<number | null>(null);
  React.useEffect(
    () => () => {
      if (cool.current !== null) window.clearTimeout(cool.current);
    },
    [],
  );
  const group = React.useMemo<Group>(
    () => ({
      delayDuration,
      skipDelayDuration,
      disableHoverableContent,
      warm,
      opened: () => {
        if (cool.current !== null) window.clearTimeout(cool.current);
        cool.current = null;
        setWarm(true);
      },
      closed: () => {
        if (cool.current !== null) window.clearTimeout(cool.current);
        cool.current = window.setTimeout(() => {
          cool.current = null;
          setWarm(false);
        }, skipDelayDuration);
      },
    }),
    [delayDuration, skipDelayDuration, disableHoverableContent, warm],
  );
  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>;
}

function Tooltip({
  children,
  onOpenChange,
  ...rootProps
}: React.ComponentProps<typeof Impl.Tooltip>) {
  const group = React.useContext(GroupContext);
  return (
    <OverlayRoot
      kind="tooltip"
      openAtStart={rootProps.open === true || rootProps.defaultOpen === true}
      real={(impl, { collector, content }) => (
        <impl.tooltip.TooltipProvider
          delayDuration={group.warm ? 0 : group.delayDuration}
          skipDelayDuration={group.skipDelayDuration}
          disableHoverableContent={group.disableHoverableContent}
        >
          <impl.tooltip.Tooltip
            {...rootProps}
            onOpenChange={(open) => {
              onOpenChange?.(open);
              if (open) group.opened();
              else group.closed();
            }}
          >
            <impl.tooltip.TooltipTrigger asChild>{collector}</impl.tooltip.TooltipTrigger>
            {content !== null ? <impl.tooltip.TooltipContent {...content} /> : null}
          </impl.tooltip.Tooltip>
        </impl.tooltip.TooltipProvider>
      )}
    >
      {children}
    </OverlayRoot>
  );
}

/** Always asChild: the consumer's own element is the trigger. */
function TooltipTrigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.TooltipTrigger> & { asChild: true }) {
  return <OverlayTrigger kind="tooltip" part="TooltipTrigger" {...props} />;
}

function TooltipContent(props: React.ComponentProps<typeof Impl.TooltipContent>) {
  return <OverlayContent kind="tooltip" part="TooltipContent" {...props} />;
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
