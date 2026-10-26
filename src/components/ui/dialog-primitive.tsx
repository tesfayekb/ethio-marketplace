import * as React from "react";

import type * as Impl from "./dialog-impl";
import { ModalPart, ModalRoot, ModalTrigger } from "./overlay-facade";

/**
 * DEC-260 (Foundations turn 32; D234 speed S9) — THE DIALOG, ITS CODE ON DEMAND.
 * Radix's dialog parts by the same names, for ui/dialog.tsx, ui/sheet.tsx and
 * the shell's own panels; the Radix code (dialog-impl.ts) arrives with the other
 * overlay primitives (overlay-loader.ts), and the parts wait for it as
 * overlay-facade.tsx's ModalRoot says.
 */

/** Radix's part names: a name that is not one of them fails the typecheck. */
type Part = keyof typeof Impl;

function Root(props: React.ComponentProps<typeof Impl.Root>) {
  return <ModalRoot kind="dialog" {...props} />;
}

/** Always asChild: the consumer's own element is the trigger. */
function Trigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.Trigger> & { asChild: true }) {
  return <ModalTrigger kind="dialog" part={"Trigger" satisfies Part} {...props} />;
}

function Portal(props: React.ComponentProps<typeof Impl.Portal>) {
  return <ModalPart kind="dialog" part={"Portal" satisfies Part} {...props} />;
}

function Overlay(props: React.ComponentProps<typeof Impl.Overlay>) {
  return <ModalPart kind="dialog" part={"Overlay" satisfies Part} {...props} />;
}
Overlay.displayName = "DialogOverlay";

function Content(props: React.ComponentProps<typeof Impl.Content>) {
  return <ModalPart kind="dialog" part={"Content" satisfies Part} {...props} />;
}
Content.displayName = "DialogContent";

function Title(props: React.ComponentProps<typeof Impl.Title>) {
  return <ModalPart kind="dialog" part={"Title" satisfies Part} {...props} />;
}
Title.displayName = "DialogTitle";

function Description(props: React.ComponentProps<typeof Impl.Description>) {
  return <ModalPart kind="dialog" part={"Description" satisfies Part} {...props} />;
}
Description.displayName = "DialogDescription";

function Close(props: React.ComponentProps<typeof Impl.Close>) {
  return <ModalPart kind="dialog" part={"Close" satisfies Part} {...props} />;
}

export { Root, Trigger, Portal, Overlay, Content, Title, Description, Close };
