# Next five — plan (A budget, B S3 cards/D262, C press D263, D INC-1023, E one-line fit)

## CI first
The latest completed run in ci-evidence is still 398a5859 (FAILURE, budget only, run 41148548211; S2-3 answered it). The run on d2e9bb36 has not been published yet. Turn A starts by reading it again; any red is fixed first, from its failure body.

## Premises the census finds different (report first)
1. menu-current.ts consumers in app-rail.tsx are at :21 (import), :339 and :438 (`MENU_LINK_ACTIVE`), plus submenu-impl.tsx :430 — not :621/:640/:663/:816. Turn C opens with a full census (isCurrentAt, MENU_LINK_ACTIVE, CURRENT_PILL, ITEM_ACTIVE).
2. Dark `--border` in src/styles.css :436 is #2F3B34, not #26302B. Turn B first identifies which token draws the card's edge today (border, a card-edge class or a ring) and measures the real pair before setting targets.
3. The check-bundle-size.mjs comments state DEC-296 as floor(size + 0.1 + 0.3) + 1 at :44 and floor(size + 0.3 + 0.3) + 1 at :45. Turn A fixes the NEAR band at one value in one constant before the guard reads it; the plan proposes 0.3 KiB (DEC-296), to be confirmed in the ruling.

## Order
A → D → B → C → E. A first (every later piece grows pages). D next: it touches no page weight, and it is Tier A (a migration that waits for apply), so moving it ahead lets the apply run while B and C build. B before C: C's pressed style applies to the card links that B restyles. E last: its census measures the final labels.

## A. The budget instrument (1 turn)
- Concern: a ceiling never sits inside the NEAR band of the size it judges.
- Mechanism: scripts/check-bundle-size.mjs (the entry) and scripts/route-budgets.mjs (pages). Add `NEAR_KIB` (DEC-296) and `ceilingFor(size)` = floor(size + NEAR) + 1 in one place, read by both.
- Guard: the check refuses any ceiling where ceiling − measured < NEAR, naming DEC-296 and the page. Planted case: a fixture ceiling 0.1 KiB over size must fail; unit test in scripts/conformance.
- One-time census: every page and the entry reset to ceilingFor(CI 398a5859 size, or d2e9bb36 if published), each with a cause line. Known near: /admin/roles, /admin/users, /admin/screening, /c/$slug, /auth_/callback, /auth_/reset, entry.
- G38: none (no browser test).
- Growth: 0 JS, 0 CSS.

## D. INC-1023, shipped strings win over copies (1 turn + apply)
- Concern: a ui_translations row that only copies the code never overrides the build's text.
- Mechanism: get_ui_bundle (latest migration redeclaring it) + src/i18n/bundle.ts :115 overlay; admin_sync_ui_keys writes origin 'sync'.
- Change: migration redeclares get_ui_bundle whole (G39, from the live definition): returns a row only if origin ≠ 'sync' or a 'save'/'machine' revision exists. get_ui_bundle_version follows the same filter. Closers, read-back, self-mark.
- Proofs on scratch rows: stale sync row excluded; person-saved row included; machine row included.
- Test: unit test on the overlay: a bundle lacking the sync row leaves the compiled text; a person row wins.
- Stop after the migration report for staging apply; production on `apply <fragment> on ethio-prod`.
- Growth: 0.

## B. S3, feed and card surface + D262 (2 turns)
- B1: tokens. New dark `--card` and its edge to measured targets (card ≥ 1.25:1, edge ≥ 1.8:1 vs page); every text pair ≥ 4.5:1; Featured/Premium dark fills, popover and photo well re-checked against the new card. Contrast test extended; /dev/style shows old and new swatches for the operator. G38: any contrast/value assertion naming #1A221E.
- B2: spec §5/§6 card and feed look per redesign-part-2.md §6 S3 row, through the existing card mechanism (CARD_SURFACE); CF-LOOK-1 lines retired; new SGC spec at 390/834/1440 light/dark.
- Growth ESTIMATE: +0.1–0.3 KiB JS feed pages, CSS +0.3 KiB.

## C. D263, a press shows at once (1 turn)
- Mechanism: menu-current.ts reads `useRouterState` pending location (`location` of the pending match) so isCurrentAt raises the target at navigation start; CURRENT_PILL/ITEM_ACTIVE unchanged. A failed or cancelled navigation clears pending, so the resolved location returns the selection.
- One pressed style `PRESSED` (active: scale/tint, motion-reduce: tint only) in one module, read by menu rows, Button, CONTROL_LOOK, card links; CF-PRESS census with planted bypass.
- Proof: e2e on phone and desktop projects: paint changes within one rAF of pointerdown; a delayed route keeps the pill on the chosen item; an aborted navigation restores it.
- Growth ESTIMATE: +0.2 KiB JS entry, CSS +0.1 KiB.

## E. One-line fit in every language and font (1 turn)
- Mechanism NONE YET: a `data-one-line` marker (one constant) on headings, buttons, tabs, bottom-bar labels, chips, band labels; census lists the slots (36 files carry nowrap/truncate today; each is classified).
- Guard: e2e census at 360 px over every shipped language, measuring scrollWidth ≤ clientWidth × 0.90 (10% headroom for Kefa vs Noto); planted overflowing label must fail. Unit census: a nowrap slot without the marker is refused or allowlisted.
- G38: none expected; any slot that fails is listed and fixed by its own string, never a new string.
- Growth: marker attributes only, ~0.

## Technical details
- Each turn: CI read, step 0, change, touched specs whole (both projects, retries 0), one `bun run checks`, report. Sizes kept small so checks and report fit one turn.
- No new dependency; no new strings; D is the only migration.
