/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE OVERLAY PRIMITIVES' OWN CODE.
 * The tooltip and the dropdown menu (Radix, floating-ui and their layers) are
 * fetched on demand through src/components/ui/overlay-loader.ts, never on the
 * first download. Only the facades in tooltip.tsx and dropdown-menu.tsx reach
 * this module, and only through the loader.
 */
export * as menu from "./dropdown-menu-impl";
export * as tooltip from "./tooltip-impl";
