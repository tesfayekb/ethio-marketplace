# Turn C plan — a press shows at once (D263)

## CI first
- Evidence page at 12:19Z still names e1e736df (FAILURE; its only red was the nine staff-page ceilings, raised in F4b). No completed run on 53aaccf3 yet. Read again before the build turn's push; any red that is not infrastructure goes first.

## What the operator will see
- Any tap or click on a link, button, menu row, card, tab or segment darkens at once, before the page or action answers.
- A chosen menu item (rail, side panel, phone bottom bar, panel switch, lists) becomes the current item the moment it is chosen, while the menu closes and the page loads. If the move is cancelled or fails, the old item comes back.

## The conflict to rule (G17, overridable)
INC-581 (`use-shown-pathname.ts`) deliberately makes the frame follow the *committed* page, so the bands and panel never switch before the body. Concern 2 asks the reverse for the chosen item. Proposed reconciliation: two layers.
- The **frame** (which panel, bands, breadcrumbs, location band) stays on `useShownPathname` — INC-581 holds.
- The **chosen mark** on menu items reads a new `useMenuAt()`: the pending location while a navigation is in flight, else the shown path. Only the item's look and `aria-current` move early.

## Census (by definition; build turn pastes the full file:line table)
Current-item marks:
- `menu-current.ts` isCurrentAt — readers app-rail.tsx :621, :640, :663, :817 (via `useShownPathname` :589, :806); submenu-impl.tsx :95/:435.
- bottom-bar.tsx :96, :112, :136, :160 (`activePanel`, the frame — the tab mark moves to the chosen layer).
- breadcrumbs.tsx (frame; stays), data-table.tsx :362 and pagination.tsx :36 (page numbers, local state — out of domain), wizard.tsx :987/:1070, mobile-step-strip.tsx :60, step-category.tsx :99/:449, photo-gallery.tsx :284, listing-detail.tsx :1051 (local state, already instant — out of domain, listed).
- Dropdown lists: radio/current rows already flip on select (local state) — in domain only for their pressed look.

Pressables:
- Button (button.tsx: no pressed state today), IconButton, menu rows (menu-row.ts ITEM_CORE / LIST_ROW), card link (listing-card.tsx with CARD_SURFACE), band segments (app-shell bands), Tabs (tabs.tsx), sidebar.tsx :504/:706 (the only `active:` classes in src today; shadcn's own).

## Mechanisms
1. **Pressed style — one token, one constant.** `--press` overlay token in styles.css (light/dark), and `PRESSED` in `src/components/shell/menu-row.ts` (beside the row constants): `active:bg-press data-[pressed]:bg-press` plus a 0ms-in / 120ms-out transition (none under reduced motion). `:active` covers pointerdown on fine pointers; on coarse Android, `:active` arrives late or not at all under a scroll-capable parent, so a tiny delegated listener in the root (`src/lib/press.ts`, ~0.25 KiB) sets `data-pressed` on the nearest `[data-pressable]` at pointerdown/keydown (Enter/Space) and clears it on pointerup/cancel/scroll-start/blur. Primitives carry `data-pressable` + `PRESSED`; screens never.
2. **Chosen item — one reader.** `useMenuAt()` in `src/components/shell/menu-current.ts`: `useRouterState` selects `state.pendingMatches`' leaf (or `state.location` when `status === "pending"`) else `useShownPathname`. A cancelled/failed navigation clears pending, so the mark returns by itself. isCurrentAt stays the one rule.

## Guard — CF-PRESS-1 (scripts/conformance/press.test.ts, kit.ts census, wired.test.ts)
- Rule 1: every pressable primitive (button.tsx, icon-button.tsx, tabs.tsx, menu-row.ts row constants, listing-card.tsx link, band segments) carries `PRESSED`/`data-pressable`.
- Rule 2: no `active:` class or own pressed colour outside menu-row.ts (sidebar.tsx gets an allowlist line `key | reason | until` or moves to PRESSED — proposed: moves).
- Rule 3: `aria-current` / isCurrentAt in a menu file reads `useMenuAt`, never `useRouterState`/`useShownPathname` directly.
- Planted PR-1…3. Allowlist starts empty except as ruled.

## Tests
- Unit: PR-U1…4 (press.ts sets/clears on pointerdown, keydown, cancel, scroll); MA-U1…3 (useMenuAt pending → chosen, settled → shown, cancelled → previous).
- Browser `e2e/press.spec.ts`:
  - PS-1 pressed visible within one frame of pointerdown (computed background changes in the next rAF) on a link, a button, a menu row and a card, at 360 coarse and 1440 fine, light and dark.
  - PS-2 a rail item and a bottom-bar item current before the next page's data arrives (route-held via `whilePageLives` holding the loader's read).
  - PS-3 a cancelled navigation (second tap elsewhere / held read aborted) restores the old current item.
  - PS-4 reduced motion: no transition, pressed still shows.
- Touched specs whole, both projects, retries 0.

## G38 list (specs that may assert the old timing)
- shell.spec.ts and rail/bottom-bar specs asserting `aria-current` only after navigation settles; INC-581's frame spec stays untouched (the frame does not move). Build turn greps `aria-current` across e2e/ and names each.

## Growth
- press.ts in the root bundle ≈ +0.25 KiB; PRESSED classes ≈ +0.1 KiB CSS; useMenuAt ≈ +0.05 KiB. Estimate ≤ +0.4 KiB per public page; DEC-296 form for any ceiling crossed.

## Turns
- One turn (C). If it overruns: C1 the pressed style + CF-PRESS-1 rules 1–2 + PS-1/PS-4; C2 the chosen item + rule 3 + PS-2/PS-3.

## Technical scope (build turn)
src/lib/press.ts (+test), src/routes/__root.tsx (one listener mount), src/styles.css (`--press`), themes.ts, menu-current.ts (+test), menu-row.ts, button.tsx, icon-button.tsx, tabs.tsx, sidebar.tsx, listing-card.tsx, app-shell.tsx bands, app-rail.tsx, bottom-bar.tsx, submenu-impl.tsx, scripts/conformance/, e2e/press.spec.ts, route-budgets.mjs, docs. AGENTS.md not in scope.
