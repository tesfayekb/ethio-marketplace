/**
 * DEC-259 (Foundations turn 31; D234 speed S8) and DEC-260 (turn 32; S9) — THE
 * OVERLAY PRIMITIVES' OWN CODE. The tooltip, the dropdown menu, the dialog and the
 * alert dialog (Radix, floating-ui and their layers) are fetched on demand through
 * src/components/ui/overlay-loader.ts, never on the first download. Only the
 * facades (tooltip.tsx, dropdown-menu.tsx, dialog-primitive.tsx,
 * alert-dialog-primitive.tsx, over overlay-facade.tsx) use it, and only through
 * the loader.
 */
export * as alertDialog from "./alert-dialog-impl";
export * as dialog from "./dialog-impl";
export * as menu from "./dropdown-menu-impl";
export * as tooltip from "./tooltip-impl";
