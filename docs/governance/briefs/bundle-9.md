# Bundle 9 — the house style: brief, version 3 (saved unchanged, 2026-10-08)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 3 (2026-10-08). THIS FILE REPLACES VERSION 2. Turn 1 (Part A, the tokens) landed at accdd3fe and turn 2 (Part B, the shared blocks) at 1fbea895; both are verified. This version specifies TURN 3 = PART C1 — THE FRAME FROM md: the top band 56 px, the panel tabs and the breadcrumbs as one band that stays, one page padding, menu rows 36 px with a mouse. NOTHING BELOW md CHANGES ITS POSITION IN THIS TURN: phones keep today's in-flow bar, hidden menu and drawer until Part C2. Parts C2, D and E are named at the end; the supervisor replaces this file with version 4 while turn 3 runs — if version 4 has not arrived when turn 3 is done, END THE TURN with the report. Tier B; no database change, no migration.
Line numbers are as of commit 1fbea895 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 2
- Turn 2 is verified against the diff of accdd3fe..1fbea895 (read in the repository, before your report reached the supervisor): the brief and the strings table byte for byte; the five strings exact in both catalogs and nothing else changed in them; IconButton and its bare twin; RowActions with the tooltip outside the menu trigger; the pager's three zones with `pageWindow` and its tests; NativeSelect; FilterChips and FiltersButton; the selection bar's slot; /dev/style; HS-3 to HS-5; the selector's list; the docs. src/components/shell/data-table.test.tsx is unchanged and no file under src/features was touched.
- The optional `tooltip` prop you gave IconButton (the tooltip shows the label alone while the name carries the row): accepted.
- The pager's root became a grid for every caller, as version 2's B3 said; below md the two arrows now sit under the range, not beside it. That comes from the brief (its "byte for byte as before" was too strong for that one class) and it stays.
- Whatever your turn-2 report says that this file does not answer is answered with the next version; a test you left red in turn 2, if any, is named again in this turn's first lines.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-9.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first. roadmap.md line 3 stays as it is; tick no roadmap line in this turn.

HOW TO WORK
- Order of the turn: step 0; C1.1 to C1.5 with their tests and docs; the local runs of C1.6; push; the report; END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for a question this brief cannot answer, for the one STOP this brief names (C1.4), or the end. If the platform ends the turn early, stop at a clean point (typecheck, format:check, lint and every spec file you touched green), report three lines — done, left, CI — and the operator sends "continue".
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address (you cannot git-fetch that branch). Paste the first six lines of ci-status.md. A red that is not a cancelled run is named in your report's first lines and fixed first.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Nothing signs in to, or runs a test against, ethio-prod or the published site.
- THE FRAME IS THE MOST-TESTED SURFACE OF THE APP. Census first (the rule of every turn that changes an existing surface): before the first edit, read whole src/components/app-shell.tsx, src/components/shell/app-header.tsx, app-rail.tsx, panel-tabs.tsx, breadcrumbs.tsx, panel-header.tsx, use-footer-inset.ts and src/components/layout/page-shell.tsx, and say in the report's first lines if any line this brief cites reads differently from what it says. Their comments record past incidents (INC-032, INC-037, INC-046, INC-052, INC-085h and i, INC-089, INC-134): no class those comments call load-bearing is removed — `min-w-0` on the bar cell and on the content region, logical `start-`/`end-` offsets, the document as the only page scroller from md (no overflow-y and no height cap on the stack or its ancestors), the footer as a sibling below the content region, what use-footer-inset observes.
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. THE TESTS THIS BRIEF NAMES are changed in this turn exactly as it says — they pin a number or an order the operator has changed. ANY OTHER test that fails is not edited: name it in the report with its line and what it asserts — the supervisor rules on it.
- Test ids are kept: every data-testid of the frame that exists today exists after the turn, on the element that plays the same part (`shell-band`, `shell-logo-cell`, `shell-topbar`, `shell-stack`, `app-rail`, `rail-scroll`, `rail-sign-out`, `panel-tabs`, `panel-tab-<id>`, `breadcrumbs`, `location-row`, `shell-footer-wrapper` and the rest). One id is new: `shell-subband`.
- Local runs: C1.6 lists them. "A file that is not fully green is not committed" — with the one exception this brief's rule above gives (a test you did not edit, named and left red). CI on the turn's final commit is the full proof; a local run never writes "CI green". Unit and component tests (vitest) run whole.
- No migration, no database write, no package change (name a platform bump in your first lines and leave it), no new dependency, no new string. Colours and shadows: tokens only.
- Scope: only the files a step names, plus the generated files the scripts regenerate. A file you create or change outside a step's list is named in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, the migration check and e2e/global-setup.ts are not touched. e2e/helpers/ui.ts is not touched.
- Records: you write the changelog lines; the decision and incident ledgers are the supervisor's.
- The commit that is judged by CI ends the turn: push, END THE TURN, send nothing after it.

PART C1 — THE FRAME FROM md
C1.1 — THE TOP BAND IS 56 PX FROM md (it is 64 px). Every place that assumes 64:
- src/components/app-shell.tsx :684 the band wrapper `md:h-16` → `md:h-14`; :688 the logo cell `md:h-16` → `md:h-14`; :715 the bar cell `md:h-16` → `md:h-14`; :733 the stack `md:pt-16` → `md:pt-14`; the comments that state the number (:81, :84, :678–680) follow.
- src/components/shell/app-rail.tsx :511 the rail `md:top-16` → `md:top-14`; the comment at :507 follows.
- src/components/shell/app-header.tsx :99–101 — the comment only (the bar is `md:h-full`).
- NOT in this turn: the phone bar's `h-14` (app-header.tsx :111) and the drawer's logo block `h-14` (app-rail.tsx :539).
- The two tests that pin 64 are changed to 56, with their messages and comments: e2e/shell.spec.ts :111 (`railLaw`: "rail top is not pinned at 64") and :1254 (`const ROW1 = 64`, used at :1311, :1347, :1449); the comment at :1170 follows.
- Docs: docs/features/admin-shell.md :217–228 (the band's classes, "logo 0/256×64", the rail's `md:top-16`, the stack's `md:pt-16`) and docs/features/design-foundation.md :184–187 ("FILLS grid row 1 (4rem)").

C1.2 — THE PANEL TABS AND THE BREADCRUMBS ARE ONE BAND THAT STAYS UNDER THE TOP BAND (from md).
- src/components/app-shell.tsx, inside `shell-stack` (:731–751). The order of the stack's children becomes: (1) a NEW wrapper `<div data-testid="shell-subband" className="bg-card md:sticky md:top-14 md:z-20 md:shadow-bar">` that holds `<PanelTabs />` and, under it, the breadcrumbs inside their own strip `<div className="flex min-h-8 min-w-0 items-center border-b border-border px-2 md:px-4">`; (2) the location row, on exactly the condition it has today (:741); (3) `<main id="main">`. `<Breadcrumbs />` leaves `<main>` (:744).
- src/components/shell/breadcrumbs.tsx — the `mb-3` of the four returns (:68, :94, :139, :219) is removed; nothing else in the file changes (the list still wraps when a path is long).
- src/components/shell/panel-tabs.tsx :51 — a tab's `min-h-11` becomes `min-h-11 md:pointer-fine:min-h-10`. The row's own classes (:37) change only as C1.3 says.
- Layers: `md:z-20` puts the band above a table's pinned column (z-10) and below the top band (z-30), the footer wrapper (z-40) and the in-page popovers (z-40). The wrapper adds no transform, no overflow and no height: `<main>` must not become a stacking context or a scroller.
- What assumed that only the top band stays, and now has a second band under it: src/styles.css :259–264 — `scroll-padding-top: 4rem` → `8.5rem` (the top band's 56 px, the band's 74 px — tabs 40, breadcrumbs 32, two hairlines — and 6 px of air), its comment updated; src/components/layout/split-layout.tsx :28 — `lg:[inset-block-start:6rem]` → `lg:[inset-block-start:9rem]`. The wizard's `scroll-mt-20` targets are NOT changed.
- So on the feed the vertical order becomes: top bar, [panel tabs], breadcrumbs, location row, body. e2e/shell.spec.ts :225–243 ("the vertical stack is ordered: top bar, location row, breadcrumbs, body") is REWRITTEN to the new order — bar above crumbs, crumbs above the location row, the location row above the heading — with its title.
- NEW test in e2e/shell.spec.ts, inside `desktop layout laws (U0g)`, on /dev/tall, md and up (the describe's own skip): before scrolling, `shell-subband`'s top equals `shell-topbar`'s bottom (± 1 px); after `window.scrollTo(0, 600)` (polled as :1313–1316 does) the subband's top has not moved (± 1 px) and `breadcrumbs` is inside the viewport. Read rects with getBoundingClientRect, as the describe's own `rect` helper does.

C1.3 — ONE PAGE PADDING, OWNED BY THE SHELL: 8 px below md, 16 px from md.
- src/components/app-shell.tsx :743 — `<main id="main" className="min-w-0 flex-1 px-3 py-4 md:px-4">` becomes `min-w-0 flex-1 p-2 md:p-4`.
- src/components/layout/page-shell.tsx :29 — the class string loses `px-4 py-4 md:px-6 md:py-6 xl:px-8` and keeps `mx-auto w-full min-w-0` and its width; the four widths (:5–10) stay as they are.
- The two pages that cancel PageShell's padding by hand lose that override and keep the rest: src/features/admin-categories/categories-page.tsx :821 and src/features/admin/translations/strings-page.tsx :231 — `className="space-y-4 p-0 md:p-0 xl:p-0"` becomes `className="space-y-4"`.
- The strips that line up with main's inline padding move with it — `px-3 md:px-4` becomes `px-2 md:px-4` at src/components/shell/panel-tabs.tsx :37, src/components/shell/location-selector.tsx :200 and src/components/shell/app-header.tsx :55 (the phone search row).
- Left as they are: the hand-written pages /auth/callback and /auth/reset; Section's and PageCard's own inner padding; the two action bars that bleed against their own card (form-layout.tsx :23, form-section.tsx :95).
- These must pass UNCHANGED: LY-1 and LY-2 (e2e/layout.spec.ts) and the feed's equal-gutter assertions (e2e/shell.spec.ts :396–412).
- Docs: docs/governance/layout-primitives.md :14 and :26 — the shell owns the one gutter (8 px / 16 px); PageShell owns the width only.

C1.4 — MENU ROWS ARE 36 PX WITH A MOUSE FROM md, 44 PX EVERYWHERE ELSE.
- src/components/shell/app-rail.tsx :43 `ITEM_BASE` — `min-h-11` becomes `min-h-11 md:pointer-fine:min-h-9`; :348 the skeleton rows the same (their height is the row's height — INC-050); src/components/shell/panel-header.tsx :60 the panel switcher's button the same. The switcher's menu options (:77) stay `min-h-11`. The drawer's rows are below md and keep 44 px.
- NEW test in e2e/shell.spec.ts, inside `desktop layout laws (U0g)`, md and up: on "/", once `rail-category-skeleton` has count 0 inside `app-rail`, the first link inside `app-rail`'s `rail-scroll` measures 36 px high (± 1). (Both test projects use a fine pointer; the 44 px of a coarse pointer is not measured by a test in this turn.)
- e2e/shell.spec.ts :1153–1191 (at 1280 × 360 the Admin menu must overflow its scroll region) must pass UNCHANGED. If its items now fit: STOP — change nothing in the test, report the measured heights (the viewport, the band, the panel header, each row, the foot) and END THE TURN.

C1.5 — ONE HAIRLINE SHADOW: it is the `md:shadow-bar` of `shell-subband` (C1.2), the lowest bar that stays. The top band gets none.

C1.6 — LOCAL RUNS, each file whole, alone, both projects where the configuration runs it in both, 2 workers, 0 retries, fake mode: e2e/shell.spec.ts, e2e/admin-shell.spec.ts, e2e/layout.spec.ts, e2e/primitives-law.spec.ts, e2e/shell-table-law.spec.ts, e2e/a11y.spec.ts, e2e/house-style.spec.ts. (`bun run e2e:changed` maps the frame's files to one of these only — the list above is by hand.) If a run is cut by your command's time limit, say so and run the file again; a cut run is not a result. The wizard's specs that read scroll positions are judged by CI on this turn's commit.
- One changelog line. docs as each step names them.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- PART C2 — phones: the top bar and the band stay in place; the left menu as an icon strip that opens to the full menu; the bottom bar; what already sits at the bottom edge of a phone moved above it.
- PART D — the pattern console (Admin › Categories), then every other screen.
- PART E — one written rule and one automatic check per element, with a baseline that only shrinks.

REPORT. First lines: done or not done for step 0, C1.1 to C1.6; any cited line that read differently; any platform bump; any file outside this brief's lists; every test left red that you did not edit (file, line, what it asserts). Then: the six ci-status lines; the measured numbers at 1280 × 800 — the top band's height, `shell-subband`'s top and height signed in and signed out, a rail row's height, main's padding; at 360 × 740 — main's padding; each local browser run (file, project, passed/failed/skipped, retries); the unit suite (count); typecheck, format:check, lint; the file list from `git diff --name-only 1fbea895`; "Logs read: … · unavailable: …"; limitations. Never "CI green" from a local run.
```
