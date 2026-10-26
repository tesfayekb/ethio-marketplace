import * as React from "react";

import type * as Impl from "./alert-dialog-impl";
import { ModalPart, ModalRoot, ModalTrigger } from "./overlay-facade";

/**
 * DEC-260 (Foundations turn 32; D234 speed S9) — THE ALERT DIALOG, ITS CODE ON
 * DEMAND. Radix's alert-dialog parts by the same names, for ui/alert-dialog.tsx;
 * the Radix code (alert-dialog-impl.ts) arrives with the other overlay
 * primitives (overlay-loader.ts), and the parts wait for it as
 * overlay-facade.tsx's ModalRoot says.
 */

/** Radix's part names: a name that is not one of them fails the typecheck. */
type Part = keyof typeof Impl;

/** INC-911 — `onUnavailable`: the modal's code did not download (overlay-facade.tsx ModalRoot). */
function Root(props: React.ComponentProps<typeof Impl.Root> & { onUnavailable?: () => void }) {
  return <ModalRoot kind="alertDialog" {...props} />;
}

/** Always asChild: the consumer's own element is the trigger. */
function Trigger({
  asChild: _asChild,
  ...props
}: React.ComponentProps<typeof Impl.Trigger> & { asChild: true }) {
  return <ModalTrigger kind="alertDialog" part={"Trigger" satisfies Part} {...props} />;
}

function Portal(props: React.ComponentProps<typeof Impl.Portal>) {
  return <ModalPart kind="alertDialog" part={"Portal" satisfies Part} {...props} />;
}

function Overlay(props: React.ComponentProps<typeof Impl.Overlay>) {
  return <ModalPart kind="alertDialog" part={"Overlay" satisfies Part} {...props} />;
}
Overlay.displayName = "AlertDialogOverlay";

function Content(props: React.ComponentProps<typeof Impl.Content>) {
  return <ModalPart kind="alertDialog" part={"Content" satisfies Part} {...props} />;
}
Content.displayName = "AlertDialogContent";

function Title(props: React.ComponentProps<typeof Impl.Title>) {
  return <ModalPart kind="alertDialog" part={"Title" satisfies Part} {...props} />;
}
Title.displayName = "AlertDialogTitle";

function Description(props: React.ComponentProps<typeof Impl.Description>) {
  return <ModalPart kind="alertDialog" part={"Description" satisfies Part} {...props} />;
}
Description.displayName = "AlertDialogDescription";

function Action(props: React.ComponentProps<typeof Impl.Action>) {
  return <ModalPart kind="alertDialog" part={"Action" satisfies Part} {...props} />;
}
Action.displayName = "AlertDialogAction";

function Cancel(props: React.ComponentProps<typeof Impl.Cancel>) {
  return <ModalPart kind="alertDialog" part={"Cancel" satisfies Part} {...props} />;
}
Cancel.displayName = "AlertDialogCancel";

export { Root, Trigger, Portal, Overlay, Content, Title, Description, Action, Cancel };
