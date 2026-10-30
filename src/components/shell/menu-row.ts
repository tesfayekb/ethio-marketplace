/**
 * D248 (Foundations turn R1d-a) — ONE MENU LOOK. A side panel's rows are the main
 * menu's rows: the persistent rail, the phone menu and every side panel import their
 * row classes from here, never their own (CF-ROWS-1 judges). Heights come from the list
 * (src/styles.css `.menu-fit`, `.menu-snap`), never the row.
 */
export const ITEM_CORE =
  "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "ps-[var(--rail-pad)]";
/** Sage §2 (turn SAGE-S1): hover is the card surface at 70 % over the sidebar, never a
 *  content grey (INC-042). */
export const ITEM_IDLE = "font-medium text-foreground hover:bg-card/70";
/** Sage §2: the selected row is raised — the card surface, its lift and the nav ink
 *  (P-S1). `menu-on` marks it for its tile (ITEM_TILE_ON). */
export const ITEM_ACTIVE = "menu-on bg-card font-semibold text-nav-ink shadow-row-on";
/**
 * Sage §2/§3 (turn SAGE-S1) — ONE TILE for every menu icon: the rail, the strip, the phone
 * menu, the side panels, D259's Home row and D255's back item read it (CF-ROWS-1). 30 px on
 * the rail and in panels; ITEM_TILE_SM (28 px) on the phone's compact rows. The icon inside
 * takes ITEM_TILE_ICON (16 px) or ITEM_TILE_ICON_SM (15 px). The 30 px tile starts 5 px
 * before the row's padding so its centre stays on the menu's icon column (TB-1: the collapse
 * toggle and the row icons line up), and in the folded rail's icon column it sits on the row's padding, centred under
 * the toggle; the phone's 28 px tile sits in its own centred column.
 */
export const ITEM_TILE_ON =
  "in-[.menu-on]:border-primary in-[.menu-on]:bg-primary in-[.menu-on]:text-primary-foreground in-[.menu-on]:shadow-tile-on";
export const ITEM_TILE = `relative -ms-1.25 rail-icons:in-[[data-testid=app-rail]]:ms-0 inline-flex size-7.5 shrink-0 items-center justify-center rounded-full border border-hairline bg-card text-primary shadow-tile ${ITEM_TILE_ON}`;
export const ITEM_TILE_SM = "ms-0 size-7";
export const ITEM_TILE_ICON = "size-4 shrink-0";
export const ITEM_TILE_ICON_SM = "size-3.75 shrink-0";
