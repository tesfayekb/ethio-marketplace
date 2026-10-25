"use client";

import * as React from "react";

import type * as Impl from "./dropdown-menu-impl";
import { OverlayContent, OverlayRoot, OverlayTrigger } from "./overlay-facade";
import { useOverlays, type OverlaysImpl } from "./overlay-loader";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE DROPDOWN MENU, ITS CODE ON
 * DEMAND. The same parts as before; the Radix menu itself
 * (dropdown-menu-impl.tsx) arrives on the trigger's first press or opening key,
 * or once the page is idle (overlay-facade.tsx); a hover or a focus on the
 * trigger starts the download. The parts drawn inside the content (items,
 * labels, groups, separators, sub-menus) exist only once the real content is
 * drawn, so each is the real part or nothing.
 */
function DropdownMenu({ children, ...rootProps }: React.ComponentProps<typeof Impl.DropdownMenu>) {
  return (
    <OverlayRoot
      kind="menu"
      openAtStart={rootProps.open === true || rootProps.defaultOpen === true}
      real={(impl, { collector, content }) => (
        <impl.menu.DropdownMenu {...rootProps}>
          <impl.menu.DropdownMenuTrigger asChild>{collector}</impl.menu.DropdownMenuTrigger>
          {content !== null ? <impl.menu.DropdownMenuContent {...content} /> : null}
        </impl.menu.DropdownMenu>
      )}
    >
      {children}
    </OverlayRoot>
  );
}

/** Always asChild: the consumer's own element is the trigger. */
function DropdownMenuTrigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.DropdownMenuTrigger> & { asChild: true }) {
  return <OverlayTrigger kind="menu" part="DropdownMenuTrigger" {...props} />;
}

function DropdownMenuContent(props: React.ComponentProps<typeof Impl.DropdownMenuContent>) {
  return <OverlayContent kind="menu" part="DropdownMenuContent" {...props} />;
}

type Part = keyof OverlaysImpl["menu"];

/** A part drawn inside the real content: the real part once the module is here, else nothing. */
function inside<K extends Part>(name: K) {
  type P = React.ComponentProps<OverlaysImpl["menu"][K]>;
  function Inside(props: P) {
    const impl = useOverlays();
    if (impl === null) return null;
    const Real = impl.menu[name] as unknown as React.ComponentType<Record<string, unknown>>;
    return <Real {...(props as Record<string, unknown>)} />;
  }
  Inside.displayName = name;
  return Inside;
}

const DropdownMenuItem = inside("DropdownMenuItem");
const DropdownMenuCheckboxItem = inside("DropdownMenuCheckboxItem");
const DropdownMenuRadioItem = inside("DropdownMenuRadioItem");
const DropdownMenuLabel = inside("DropdownMenuLabel");
const DropdownMenuSeparator = inside("DropdownMenuSeparator");
const DropdownMenuShortcut = inside("DropdownMenuShortcut");
const DropdownMenuGroup = inside("DropdownMenuGroup");
const DropdownMenuPortal = inside("DropdownMenuPortal");
const DropdownMenuSub = inside("DropdownMenuSub");
const DropdownMenuSubContent = inside("DropdownMenuSubContent");
const DropdownMenuSubTrigger = inside("DropdownMenuSubTrigger");
const DropdownMenuRadioGroup = inside("DropdownMenuRadioGroup");

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
