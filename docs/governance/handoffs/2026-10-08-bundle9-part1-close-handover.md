# HANDOVER — 2026-10-08 — bundle 9's first half built (the house style: tokens, shared blocks, the frame at every width); the feed engine approved and next; what is in flight

Written by the supervisor thread that wrote the handovers of 2026-10-05 to 2026-10-08, at the close of bundle 9's first half. It SUPPLEMENTS `docs/governance/handoffs/2026-10-08-bundle8-close-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those sections still hold and are not repeated. Everything that changed between 2026-10-08 00:40Z and 22:50Z is in spec-ledger block S58 (the settled form) and in `docs/governance/handoffs/2026-10-08-bundle9-running-record.md` (the detail, word for word). A successor reads, in this order: this file, `docs/governance/system-state.md`, the tail of `docs/spec/spec-ledger.md`, the root `roadmap.md`, `docs/governance/feed-engine-spec.md`, the ci-evidence branch, the tail of `docs/tracking/incidental-findings.md`.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = main = `2d5c4d85` (turn 14's commit, 2026-10-08 21:59:58Z; CI run 37850621757 SUCCESS at 22:27:29Z, promoted) when this record was built. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 9's brief (`docs/governance/briefs/bundle-9.md`; the saved copy is version 14, 4,097 bytes, sha256 `6d678b4638ff2bb90e92d040cb81e8f11737a477ae3dd82031cce5843abbfc26`): FIRST HALF BUILT in fourteen executor turns, 2026-10-08 01:38Z → 21:59Z (§2.1); its last code commit is `2d5c4d85`; every turn verified against its diff (G30). The second half is not built (§4).
- Published site: `2d5c4d85`, by the operator between 22:30Z and 22:42Z (taken from his re-check, which read the new build); his re-check of the three changed items at 22:42Z — all three yes, with one finding on the first (a short name cut to one letter: D104, INC-508, and INC-509 found by its census) and a question on the third (the focus ring that stays on a place box after a tap), both for bundle 9 version 15.
- The walk of `43307e70` (eight lines, on the published site): yes to all but three, which became D102 and D103 and were built in turn 12. Their re-check: on the published `2d5c4d85` at 22:42Z, all three yes — with one finding on the first (a short name cut to one letter: D104; INC-508, and INC-509 found by its census) and a question on the third (the focus ring after a tap); both go to bundle 9 version 15.
- No brief is in force until bundle 10's step 0.
- Highest test ids: PW-177, PR-42, AT-77 (with AT-73b and AT-76b), CT-42, IB-3, LT-15, TR-35, IG-5, CO-8, LS-13, AU-12, HS-5.

### 1.2 Databases

- Unchanged in the period: no migration, no database write. ethio-prod and ethio-staging both hold M14; the newest mark by value is `20261008050000`, so bundle 10's first migration takes a mark above it and above the current time (G39).
- Leaked-password protection: ON on ethio-prod, OFF on ethio-staging (DEC-155).
- The live text store: seven keys were added in the code and one removed (§2.3). Their compiled texts show without a store step; "Sync keys" once lists them in the Translations console (harmless to press again).

### 1.3 Catalogue and curator

- 169 categories · 570 definitions; nothing imported in the period.
- The curator message of 2026-10-07 (the C35 note's answers and ONE plan asked — "C36 — phone locks and SIMs", research and plan only, no rows) is the operator's to paste; no answer from the curator has been brought.
- Held as before: the two "Made in" questions (D75), the rent and hire periods, the Tigrinya finder words.

### 1.4 Security (DEC-132)

- Unchanged from the bundle-8 handover: layer A on, push protection OFF until the supervisor's call of 2026-10-09; layer B's lint baseline 0 / 0 / 12 / 0 / 0 and the born-closed rule; layer C's first weekly review 2026-10-12.
- Bundle 9 opened no new database surface. One auth path changed (C2e.2): the client-only guards of `/post`, `/post/<id>` and `/account` read the session the shell already holds (`getSession()`) instead of asking the auth server (`getUser()`); the redirect is unchanged and row-level security and the server routes stay the authority over the data — decided by a judge frozen before the measurement (Tier A).
- Bundle 10 opens one: a public read (`/api/feed` and the page function) and triggers on listings. Its brief carries G39's rules and the public-surface allowlist.

### 1.5 CI and platform

- Run 37850621757 on `2d5c4d85`: SUCCESS, promoted; one retried pass (PW-144, INC-449's class). Every turn's run is in §2.1.
- DEC-160 STANDS after five runs (DEC-162's reading of its timing clause). Its end-to-end proof — an existing English label changed and the first run green in every lane — is still owed: bundle 9 added and removed keys but changed none.
- The executor cannot start a browser since turn 10 (INC-506: the browser at its resolved path fails on a missing system library and `apt-get` is not available). Until it starts again, each turn says "local browser runs unavailable" and CI on the turn's final commit is the browser proof. Bundle 10's first turn tries it once.
- The platform's intermediate "Changes" pushes do not start or cancel a CI run; a turn's final push does. The platform pushes a turn's work even when the executor writes that it will not.
- The nightly of 2026-10-08: RED, three (S-3 fixed after its commit; PW-137 — INC-449; CT-41 — first seen, watched). INC-487's rule waits for a nightly with no CI beside it. The next nightly is read on 2026-10-09 about 10:30Z.
- The package `@lovable.dev/vite-tanstack-config` stays at 2.25.3 (DEC-156).
- The server-error census carries one standing message off the allowlist: "listing not found" (INC-398).

### 1.6 Records

- This landing: spec-ledger block S58 (DEC-161–162; D87–D104; slips S123–S132; the class rules), incidental-findings INC-495–509 with the reconciliation and the watch list, `system-state.md`, `docs/tracking/action-tracker.md` (ACT-015, ACT-016, ACT-009), the root `roadmap.md`, `docs/governance/feed-engine-spec.md` (the approved spec), the running record of the period, this handover and its manifest, one changelog line.
- Numbering after this landing: next free INC-510; DEC-163; D-rulings D105; slips S133.
- Project docs (private, the supervisor's): `claude/running-record-2026-10-05-thread2-part3.md` (the source of block S58); `claude/feed-engine-spec-v1.md` (the spec as approved — the repository's copy adds only the approval line); the plan document "ethio.com — what to build next, and why"; the design canvas "ethio.com house style — proposal" (the boards the operator approved on 2026-10-07; the phone board was read again for Part C2).

## 2. BUNDLE 9'S FIRST HALF IN TABLES (compiled by the supervisor from the repository)

### 2.1 The turns

| Turn | Brief | What | Commits | Last commit (UTC, 10-08) | CI on the last commit |
| --- | --- | --- | ---: | --- | --- |
| 1 | v1 | Part A — the tokens, corners, shadows, badges, `/dev/style`, the token test, HS-1/HS-2; the reset's duration in the setup line | 11 | `accdd3fe` 01:58 | 37715570406 CANCELLED by turn 2's push; everything that finished green |
| 2 | v2 | Part B — IconButton, RowActions, the footer's three zones, NativeSelect, FilterChips, the selection slot; five strings; HS-3 to HS-5 | 14 | `1fbea895` 02:19 | 37717277215 SUCCESS, promoted |
| 3 | v3 | C1 — the 56 px band and the breadcrumbs band from 768; one page padding; 36 px rows with a mouse | 4 | `4bfa6aa0` 03:24 | 37722581822 SUCCESS, promoted |
| 4 | v4 | C2a — the fixed phone bar and band; the strip; the 312 px sweep; HS-2's wait (INC-498); `pageWindow` in its own module | 3 | `65ada9f6` 04:31 | 37727935299 FAILURE — PW-99 (INC-499) |
| 5 | v5 + a ruling | C2b — stopped on two conflicts (`e605e6ff`, 05:07, its run FAILURE on PW-99 as expected); then the bottom bar, the tabs and account picture off phones, `--bottom-bar`, the helpers by width | 3 + 2 | `50a2ab57` 06:25 | 37737532508 CANCELLED by turn 6's push; one red among the finished (S-3 — INC-500) |
| 6 | v6 | C2c — the footer under the bar and beside the strip; one » / « control; the strip's fitted rows; Admin in the bar; the location row on one line; the password eye; then the capacity rule and the footer's balance (`2b6a06ed`, 07:35) | 10 + 2 | `03f41795` 06:50 | 37739830404 FAILURE — three (the footer's balance, S-3); `2b6a06ed`'s run 37744355270 CANCELLED, no verdict |
| 7 | v7 | C2d.0 — S-3 on the sign-in marker; the smoke test on its own account; STOP at the census (over thirty lines) | 3 | `b7a4a151` 07:43 | 37745210593 SUCCESS, promoted |
| 8 | v8 | C2e — the posting form keeps the frame; PW-99's floor by the form's own padding; the guards on the session (measured); INC-501's tests; the smoke test's real sign-in restored | 4 | `01c25da1` 09:32 | 37757408597 SUCCESS, promoted |
| 9 | v9 | C2f — the opened menu `rail-menu` in place of the drawer; INC-501's code put back (S128) | 2 | `aec5bc82` 10:37 | 37764735022 SUCCESS, promoted |
| 10 | v10 | C2g, C2h — 768–1023 px the icon rail; `rail-icons`; the width walk; the selected look (`--nav-active`, the pill, 24 px icons) | 11 | `f4bae585` 11:15 | 37768908534 FAILURE — the width walk's timeout (S129) and PW-58 beside it |
| 11 | v11 | C2i — the width walk split; the browser tried once (INC-506) | 3 | `43307e70` 12:05 | 37774427456 SUCCESS, promoted; PUBLISHED and WALKED |
| 12 | v12 | C2j — the walk's three changes (D102, D103) | 6 | `17f4e9ac` 14:37 | 37794083090 FAILURE — eighteen (S130; PW-173 — INC-507) |
| 13 | v13 | C2k — the three test fixes; PW-173 read | 4 | `df6d3ef4` 18:15 | 37822924309 FAILURE — the smoke test at 360 (S131) |
| 14 | v14 | C2l — the smoke test's stale width guard removed | 3 | `2d5c4d85` 21:59 | 37850621757 SUCCESS, promoted |

85 commits and 78 files from `c46aa32b` to `2d5c4d85`; +3,497 / −586 lines; no migration.

### 2.2 The frame by width, as built

| Width | Top | Navigation | Left | Bottom |
| --- | --- | --- | --- | --- |
| below 768 | a fixed 52 px top bar: » / «, the wordmark, the search icon (it opens a search row), language, theme, the account picture (signed in) | the bottom bar is the section switcher: Home · My listings · Post · Account (+ Admin for admins); signed out Home · Post · Sign in; the current item on a pill | the 48 px icon strip (the section's items only, rows 28–44 px); » widens it in place to the named menu (256 px) | the bottom bar (60 px plus the safe area); the footer at the page's end beside the strip |
| 768 to 1023 | the 56 px band; the panel tabs and the breadcrumbs band stay under it | the panel tabs | the icon rail (tooltips); » opens the menu with the rail's content | the footer |
| 1024 and up | the 56 px band and the breadcrumbs band | the panel tabs | the full rail, or the icon rail when the user collapses it (the collapse toggle) | the footer |

At every width: one page padding owned by the shell (8 px below 768, 16 px from 768); Sign out in the account menu at the top right (and at the rail's foot from 768); the frame follows the window's width only (D88).

### 2.3 The files (the groups; `git diff --stat c46aa32b..2d5c4d85` has every line)

- The frame: `src/components/app-shell.tsx`, `src/components/shell/app-header.tsx`, `app-rail.tsx`, `bottom-bar.tsx` (new), `breadcrumbs.tsx`, `panel-tabs.tsx`, `panel-header.tsx`, `location-selector.tsx`, `form-section.tsx`; `src/components/layout/` (`form-layout.tsx`, `layers.ts`, `page-header.tsx`, `page-shell.tsx`, `section.tsx`, `split-layout.tsx`); `src/components/searchable-picker.tsx`; `src/config/panels.ts`; `src/styles.css`.
- The shared blocks: `src/components/ui/icon-button.tsx`, `native-select.tsx`, `password-input.tsx`, `badge.tsx`, `button.tsx`; `src/components/shell/row-actions.tsx`, `filter-chips.tsx`, `page-window.ts`, `data-table.tsx`, `page-card.tsx`; each new block with its component test.
- The pages: `src/routes/dev.style.tsx` (new), `auth.tsx`, `auth_.reset.tsx`, `settings.tsx`, `account.tsx`, `post.tsx`, `post_.$listingId.tsx`; `src/features/posting/step-category.tsx`, `wizard.tsx`; `src/features/admin-categories/categories-page.tsx`; `src/features/admin/translations/strings-page.tsx`; `src/routeTree.gen.ts` (regenerated).
- Tests: `e2e/house-style.spec.ts` and `e2e/phone-frame.spec.ts` (new); `e2e/shell.spec.ts` (the frame's tests); `e2e/helpers/ui.ts` (the helpers by width); `admin-shell`, `auth-signout`, `category-nav`, `i18n-coverage`, `layout`, `post-wizard-category`, `post-wizard-recent`, `rbac`, `settings`, `smoke-auth-i18n` specs; `e2e/global-setup.ts` (the reset's duration); `src/styles.tokens.test.ts`; `scripts/e2e-select.ts` (the `house-style` area).
- Docs: `docs/features/design-foundation.md`, `display-primitives.md`, `admin-shell.md`, `panels.md`, `posting.md`, `location-scoping.md`, `e2e-harness.md`; `docs/governance/layout-primitives.md`; the generated usage maps; the brief and its strings table; thirteen changelog lines.

### 2.4 The strings (each read on dev `2d5c4d85` by script; the Amharic of the five `prim.table.*` keys was built only from words the catalog already used, and the location labels are the operator's words, D103)

| Key | English | Amharic | Change |
| --- | --- | --- | --- |
| `prim.table.pageSize` | Rows per page | በአንድ ገጽ ረድፎች | added |
| `prim.table.page` | Page {n} | ገጽ {n} | added |
| `prim.table.filters` | Filters | ማጣሪያዎች | added |
| `prim.table.clearAll` | Clear all | ሁሉንም አጽዳ | added |
| `prim.table.removeFilter` | Remove filter | ማጣሪያውን አስወግድ | added |
| `location.rowLabel` | Showing listings in | ማስታወቂያዎች በ | added |
| `location.rowLabelShort` | Listings in | ማስታወቂያዎች በ | added |
| `location.guessAreaCaption` | Showing listings near {area} — change? | ከ{area} አቅራቢያ ያሉ ማስታወቂያዎች ይታያሉ — ይቀይሩ? | removed |

## 3. IN FLIGHT AT HANDOVER

- Executor: idle after this records turn. Next is one short turn, bundle 9 version 15 (C2m): every name cut with "…" keeps its first five characters (D104 — INC-508 "Used before", INC-509 the place boxes, and every other cut name the census finds) and the focus ring after keyboard use only; it is delivered after this turn is verified (G41). Then bundle 10's brief (E1, the index migration), written from the spec and the supervisor's own read of the write doors at that commit.
- Curator: one message waits with the operator (§1.3); its answer is a plan, not rows.
- Operator steps owed (none blocks the executor): the Amharic words for the bar's short labels — "Advertise" for Post and, if the measurement asks for it, a short "My listings" — before the subcategory turn; paste the curator message; press "Sync keys" once; at his next look at GitHub's Security tab, say whether the code-scanning list is empty; apply bundle 10's migration on ethio-staging when its stop report says the production apply succeeded (D86); optional, as before — the Claude GitHub App install, a usage budget at the map provider, the mailboxes legal@ and privacy@ and a native reader of the Amharic legal text before stage 1's texts go live, the sending domain for e-mail before stage 6.
- Supervisor's dated duties: 2026-10-09 about 10:30Z read the nightly (S-3 green, CT-41, PW-137, INC-487's rule, DEC-148's third run, INC-439's count); 2026-10-09 the push-protection call; 2026-10-12 the weekly reviewer's first scheduled run and DEC-083's date; the E2E account pool before 2026-11-01.

## 4. THE PLAN AHEAD, IN ORDER

1. This records turn (documents only) → verified by sha256 against the manifest → CI green.
1a. Bundle 9 version 15 (C2m) — the five-character floor on cut names (D104; INC-508, INC-509) and the focus ring after keyboard use only; one turn; its walk is two lines.
2. Bundle 10, the feed engine (`docs/governance/feed-engine-spec.md`, its §7): E1 the `feed_index` table, `feed_index_refresh`, the backfill of today's active listings and the consistency check (Tier A, one migration — G39); E2 the write doors call the refresh, the tree-change re-index job with its heartbeat, `feed_page` and `/api/feed` with cursor paging, the cache headers and the widening ladder (Tier A, a second migration and the route); E3 the feed on the route, subcategory addresses resolved through the whole tree, the breadcrumbs, and the performance job that measures the frozen targets at 100,000 scratch listings on staging (Tier B). ESTIMATE three turns.
3. Bundle 9's second half: the subcategory menus (D98: below 1024 a category opens its page behind the menu and the menu its subcategories; from 1024 a hover panel at 150 / 300 ms with the safe triangle, a › button and the keyboard) with the bar's short labels (D97); the scroll area from 768 px (D93, D96); Part D1 the pattern console (Admin › Categories), then every other screen; Part E the rules and checks; the public marketplace pages designed under the same rules.
4. Stage 1, the rules; then the tidy-up round (ACT-009) and the order of work in the root `roadmap.md`.
5. Beside the executor's turns: the rulebooks (instructions v1.14 and Knowledge v3.11, delivered whole — they carry §5 below and the rules of blocks S55 to S57); the plan document brought level with this close.

## 5. RULES ADOPTED IN THIS PERIOD, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- The next file for an agent is prepared while that agent works; a bundle's records sources are written while its last code turn runs (D87; S123).
- A file for the operator goes first, as one action line; the explanation follows it.
- The frame is chosen by the window's width only; no width between two frames may break (D88).
- A frame change that takes width from pages is checked against every minimum width a test pins (INC-499).
- A census searches a changed element's test id, accessible name and string key (INC-500, S130).
- Before a brief changes a shared helper's behaviour at a width, every caller's surrounding lines are read (S130, S131).
- Shell helpers are locale-agnostic: by test id, never by an English name (INC-121).
- A width walk resizes one loaded page; a test is sized by its page loads against its timeout and the request limits (S129).
- A test of a shared roster asserts the rule, not one database's count.
- A colour check waits for transitions to settle (INC-498).
- An auth-path guard changes only on a measurement read against a judge frozen first, its redirect unchanged (C2e.2).
- While the executor's browser cannot start, CI on the turn's final commit is the browser proof, reported as "local browser runs unavailable" (INC-506).
- Flake ledger lines are counted by run and test (INC-495).

## 6. WHAT THE OPERATOR SAID IN THIS PERIOD (his words; block S58 and the running record have each at its time)

- On waiting: "These are taking too long while you compiling and also ci running. i wish you had prepared it when idel rather that after lovable is completed and idel waiting for the next prompt."
- On the bottom bar and sizes: "… WE WANT TO GIVE BEST FUNCTIONALITY AND USER FRIENDLYNESS, LOOK, LIGHTWEIGHT SECURE." — then "OK FOR NOW. ITS NOT JUST IPAD. ANY IPAD SIZE DEVICE AND AS WE MINIMIZA NEED TO CHANGE, DONT WANT TO SEE BREAK IN BETWEEN DEVICES."
- On the posting form: "… most of the work we did is gone, no left sidebar, no bottom bar, etc … so need to make all pages same"
- On the scroll area: "ok i will go with your recomendation. CI is green"
- On the bottom bar's labels: "ok, i think amharic meaning of Advertise is ok for post a listing"
- On subcategories: "… in large screen i want hover to open subcatgeory, and moving away closes it, clicking will close subcategoy by opening its page." and "current ethio.com page is much quicker, I dont think it waits that long."
- On the filters: "… THE MAIN CATEGORY SHOWS ALL LISTED UNDER ITS SUBCATEGORY … ALL SHOULD FILTER. THE RASK IS HOW TO MAKE THESE FILTERS BE SUPER FAST. THAT IS OUR MAIN TASK. VERY VERY IMPORTANT"
- On the feed-engine spec: "Agree with all,"
- At the walk: "INSIDE WIZARD THE USED BEFORE SHOULD REMAIN IN ONE ROW …"; "… OR KEEP IT AT TOP RIGHT WHERE SIGNIN USED TO BE."; "Showing listings in \" \" rather"; "ማስታወቂያዎች በ its same for both".
