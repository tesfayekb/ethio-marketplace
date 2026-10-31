/**
 * D248 (Foundations turn R1d-a) — ONE MENU LOOK. A side panel's rows are the main
 * menu's rows: the persistent rail, the phone menu and every side panel import their
 * row classes from here, never their own (CF-ROWS-1 judges). Heights come from the list
 * (src/styles.css `.menu-fit`, `.menu-snap`), never the row.
 */
/**
 * D263/D270 (turn C1, DEC-317) — ONE PRESSED LOOK. A press is the raised look, at once:
 * src/lib/press.ts marks the pressed element `data-pressed` at pointerdown (or Enter/Space)
 * and each primitive reads its own raised state from here, never its own (CF-PRESS-1).
 * Only a shadow, a fill and the ink change — never the size or the place. It comes on with
 * no transition and leaves within 120 ms; under reduced motion it neither fades nor moves.
 */
// Turn C2 (INC-1031's SGB-5 red): the fade belongs to the RELEASE alone — press.ts marks the
// released element `data-released` for RELEASE_MS — so a current mark that moves for another
// reason (a chosen location, a selected tab) changes at once, never mid-fade.
export const PRESS_MOTION =
  "data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none";
export const PRESSED = {
  /** A menu row: the raised current row (ITEM_ACTIVE's card, lift-row-on, nav ink). */
  row: `data-[pressed]:bg-card data-[pressed]:text-nav-ink data-[pressed]:shadow-row-on ${PRESS_MOTION}`,
  /** A list row: the current list row (LIST_ROW_CURRENT's nav pill and ink). */
  list: `data-[pressed]:bg-nav-pill data-[pressed]:text-nav-ink ${PRESS_MOTION}`,
  /** A tab or a band segment: the current segment (BAND_SEGMENT_CURRENT's card and lift-segment). */
  segment: `data-[pressed]:bg-card data-[pressed]:text-nav-ink data-[pressed]:shadow-segment ${PRESS_MOTION}`,
  /** A button: one step higher, to lift-row-on; its fill and ink stay. */
  button: `data-[pressed]:shadow-row-on ${PRESS_MOTION}`,
  /** A card (on the card's surface): its link pressed lifts the card to lift-row-on. */
  card: "has-[[data-released]]:transition-shadow has-[[data-released]]:duration-120 has-[[data-released]]:ease-out has-[[data-pressed]]:shadow-row-on motion-reduce:transition-none",
  /** A bottom-bar item (turn C2, D270): its ink turns to the nav ink at once… */
  bar: `group/bar data-[pressed]:text-nav-ink ${PRESS_MOTION}`,
  /** …and its icon takes the current pill (CURRENT_PILL's fill and lift), on its own box. */
  barIcon: `group-data-[pressed]/bar:bg-nav-pill group-data-[pressed]/bar:shadow-pill group-data-[pressed]/bar:text-nav-ink ${PRESS_MOTION}`,
  /** The card's own link has no surface: the card lifts, the link takes no pill. */
  cardLink: "data-[pressed]:bg-transparent",
} as const;

export const ITEM_CORE =
  `${PRESSED.row} flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ` +
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

/**
 * D264 (Foundations turn F, Sage §14) — ONE OPEN LIST. Every list of choices that opens
 * from a control (the dropdown facade's panels and rows, the searchable picker, the
 * popover's surface) reads these, never its own (CF-LIST-1 judges).
 * LIST_ROW: 44 px to tap below md and on any coarse pointer; Sage §14's 40 px row with a
 * 10 px radius from md on a fine pointer; one line, cut by D105's rule.
 */
export const LIST_ROW =
  `${PRESSED.list} relative flex min-h-11 md:pointer-fine:min-h-10 md:pointer-fine:h-10 w-full min-w-0 cursor-default select-none items-center gap-2 rounded-list-row px-3 text-start text-sm text-popover-foreground outline-none whitespace-nowrap [&>span]:truncate ` +
  "focus:bg-nav-pill focus:text-nav-ink data-[highlighted]:bg-nav-pill data-[highlighted]:text-nav-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset " +
  "data-[state=checked]:bg-nav-pill data-[state=checked]:font-semibold data-[state=checked]:text-nav-ink " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0";
/** The shell's one selected look (ruling 1): the nav pill and the nav ink. */
export const LIST_ROW_CURRENT = "bg-nav-pill font-semibold text-nav-ink";
/** The row a keyboard is on in a hand-driven list: the same surface as focus. */
export const LIST_ROW_HIGHLIGHT = "bg-nav-pill text-nav-ink";
/** The tick at the end of the current row, in the nav ink. */
export const LIST_TICK = "ms-auto size-4 shrink-0 text-nav-ink";
/** The panel's surface: white (dark #1D2621), 14 px, 6 px padding, the menu shadow whose
 *  first layer is the ring — no border, no zoom (ruling 2). */
export const LIST_SURFACE = "bg-popover text-popover-foreground rounded-menu p-1.5 shadow-menu";
/** The opening: a short fade with a 2 px slide from the control's side, never a scale. */
export const LIST_MOTION =
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-0.5 data-[side=top]:slide-in-from-bottom-0.5 data-[side=left]:slide-in-from-right-0.5 data-[side=right]:slide-in-from-left-0.5";
/** Width (ruling 3): at least the control, at most the viewport less a 16 px gutter each side. */
export const LIST_PANEL = `z-50 ${LIST_SURFACE} max-w-[calc(100vw-2rem)] overflow-x-hidden ${LIST_MOTION}`;
/** D267 (F4a-2) — a picker's row scroller: fills the panel's bounded column under any search
 *  box, so the rows scroll inside the room the visible area leaves. */
export const LIST_SCROLLER = "min-h-0 flex-1 overflow-y-auto";
/** The control while its list is open: one style, from here (ruling 1). */
export const OPEN_CONTROL =
  "data-[state=open]:bg-nav-pill data-[state=open]:text-nav-ink aria-expanded:bg-nav-pill aria-expanded:text-nav-ink";
/** D268 (F4b) — a list's parts beyond its rows, the one primitive's (CF-LIST-1 rules 8, 9);
 *  S6's dialog parts reuse them.
 *  LIST_LABEL: a non-interactive header row on the row's padding, muted, semibold, cut by
 *  CutText. LIST_SEPARATOR: the one rule, in the hairline. LIST_ICON: a row's icon, spaced by
 *  LIST_ROW's gap only, in the row's own ink. */
export const LIST_LABEL =
  "flex min-h-9 min-w-0 items-center px-3 text-sm font-semibold text-muted-foreground";
export const LIST_SEPARATOR = "-mx-1.5 my-1 h-px bg-hairline";
export const LIST_ICON = "size-4 shrink-0 text-current";
