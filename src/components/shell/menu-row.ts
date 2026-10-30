/**
 * D248 (Foundations turn R1d-a) — ONE MENU LOOK. A side panel's rows are the main
 * menu's rows: the persistent rail, the phone menu and every side panel import their
 * row classes from here, never their own (CF-ROWS-1 judges). Heights come from the list
 * (src/styles.css `.menu-fit`, `.menu-snap`), never the row.
 */
export const ITEM_CORE =
  "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "ps-[var(--rail-pad)]";
/** Hover stays on the SIDEBAR token family — bg-muted is a content-surface
 *  token and read as a foreign grey against bg-sidebar (INC-042). */
export const ITEM_IDLE =
  "text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground";
/** Selection is GREEN, never a cream tint — the one emphasis surface (C2h.2). */
export const ITEM_ACTIVE = "bg-nav-active font-semibold text-primary";
