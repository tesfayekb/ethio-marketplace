# Turn 32b — INC-908: a modal whose code fails to download tells its owner it did not open; ruling 1: D1's proof inside SCOPE and INC-910 (the E2E colour reader reads oklab)
Base: fe0ceeea8b280cb10947d5499d52acd54d9ca6e1 (the turn's START; ruling 1's BASE ba37841d81e43ec78123c49eb27f6fcd1f849e05) · Final commit: e1597fe (the last commit before this report, land.ts's "last code commit"; the last commit that touches code is 2fba44d) · Brief: docs/governance/briefs/foundations-turn-32b.md (sha256 dbffb3ff686d5943b5575033f9e1606339097850160eff6b46b7869ccdac119c) and docs/governance/briefs/foundations-turn-32b-r1.md (sha256 b449165e871294e9fa822445c7c9b9ed2f54c03b5deea49048aa5ec2e6075c84)

## 1. Done / not done, by part and step

| Part / step | State | Commit |
| --- | --- | --- |
| A1 orient: `git rev-parse HEAD origin/dev` → both fe0ceeea8b280cb10947d5499d52acd54d9ca6e1 = BASE; `git diff --name-only BASE..origin/dev` empty; CI read (section 11) | done | — |
| STEP 0 — brief saved, sha256 dbffb3ff…ac119c (= the carrying message's value); roadmap line 3 and the turn-32b line | done | 3a49feb |
| B1, B2 — OVF-17, OVF-18; the double cast out of the mock; OVF-12 reads the focus without a cast | done | e0354a3 |
| B3 — red first against BASE's facade (section 5) | done | — |
| C1 — the five facade edits | done | e0354a3 |
| D1 — the weight guard's FORBIDDEN gains vaul and cmdk | done | 3bc4a92 |
| D1's planted proof in src/components/app-shell.tsx | not done: scope guard refused → STOP 1 (docs/governance/reports/foundations-turn-32b.stop-1.md) | ba37841 (stop, landed) |
| Ruling 1 STEP 0 — saved, sha256 b449165e…75c84 (= the carrying message's value); roadmap line 3 | done | 3c29211 |
| R1 — D1's proof planted in src/components/ui/overlay-facade.tsx (never committed) | done (section 7) | — |
| R2a — NEW src/test/e2e-colors.test.ts, red first against BASE's reader | done (section 5) | 2fba44d |
| R2b — e2e/helpers/colors.ts whole text | done | 2fba44d |
| R2c — the reader's nine tests by id | done (section 5) | — |
| E1–E4 — performance-strategy, mechanisms row 48, display-primitives, ci-guards, changelog; roadmap's turn-32b line ticked | done | e1597fe |
| THE CHECKS (R3) | done, all green (section 5, 7) | — |
| THE END-TO-END CHECK (with R2c) | done, all green (section 5) | — |
| Independent review | done (section 10) | — |

## 2. Files changed  (verbatim `git diff --name-only <BASE>`; new files with `git ls-files` proof)

`git diff --name-only fe0ceeea8b280cb10947d5499d52acd54d9ca6e1` (before this report's commit):

```
docs/_changelog.md
docs/features/ci-guards.md
docs/features/display-primitives.md
docs/features/performance-strategy.md
docs/governance/briefs/foundations-turn-32b-r1.md
docs/governance/briefs/foundations-turn-32b.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-32b.stop-1.md
e2e/helpers/colors.ts
roadmap.md
scripts/check-marketplace-imports.mjs
src/components/ui/modal-facade.test.tsx
src/components/ui/overlay-facade-failure.test.tsx
src/components/ui/overlay-facade.tsx
src/test/e2e-colors.test.ts
```

plus this report, docs/governance/reports/foundations-turn-32b-r1.report.md.

New files, `git ls-files -- <each>`:

```
docs/governance/briefs/foundations-turn-32b-r1.md
docs/governance/briefs/foundations-turn-32b.md
docs/governance/reports/foundations-turn-32b.stop-1.md
src/test/e2e-colors.test.ts
```

No file deleted. `git diff fe0ceee --stat -- src/features src/routes src/components/shell`: empty (no consumer changed).

## 3. Behaviour contract — answer tables before → after  (every touched route/function/screen)

`ModalRoot` (src/components/ui/overlay-facade.tsx; under Dialog, Sheet, AlertDialog). When the code arrives, every row is unchanged (OVF-11…16 and the E2E dialogs below pass as at BASE). Only a failed download differs:

| Root, failed download | Before (BASE, fe0ceee) | After |
| --- | --- | --- |
| Uncontrolled (`<Dialog>`; the trigger's click) | the root resets its own flags; trigger stays closed (`aria-expanded="false"`, `data-state="closed"`); the owner heard `onOpenChange(true)` from the trigger only; next click asks again and opens (OVF-16) | the same, and the owner (if it passed `onOpenChange`) also hears `onOpenChange(false)`: `byTrigger` is true. The trigger and the drawn state are unchanged, and OVF-16 passes as before |
| Controlled (`open={false}` + the trigger's click) | the owner heard `true`, keeps `open` true; the effect on `ownerOpens` never runs again; nothing drawn; the next click sends the same `true` and nothing happens (OVF-17 red: `heard` = `[true]`) | the owner hears `onOpenChange(false)`, sets `open` false; the next click sends `true`, the effect re-arms, the module is asked again and the dialog opens (OVF-17: `heard` = `[true, false, true]`, asked 2) |
| Owner-opened (`open={true}` at mount; e.g. step-up-gate.tsx :43) | the owner is told nothing, keeps `open` true; the dialog never appears and a later `setOpen(true)` changes nothing (OVF-18 red: `heard` = `[]`) | the owner hears `onOpenChange(false)` (step-up-gate cancels, as on Escape); its next opening asks again and draws the dialog (OVF-18: `heard` = `[false]`, asked 2) |

`ModalRoot` / `ModalTrigger` read the real root and trigger by `ownValue(real, "Root")` / `ownValue(real, "Trigger")` instead of `real.Root` / `real.Trigger`; for Radix's parts both return the same component, so nothing a person sees changes (OVF-11…15, CF-OV-3 green).

`scripts/check-marketplace-imports.mjs`: FORBIDDEN gains `vaul`, `cmdk`. Before: an import of either from a first-paint module passed; after: it is a finding (R1's proof). Today's tree: `findings: 0` both before and after.

`e2e/helpers/colors.ts` (test code): 

| Input | Before | After |
| --- | --- | --- |
| `oklch(0.5 0.182 29.5)`, `oklch(0.704 0.191 22.216)` | red | red |
| `oklab(0.5 0.158405 0.0896211 / 0.9)` (hovered bg-destructive/90) | not red (unknown form) | red |
| `oklab(0.681 0.039091 0.123986 / 0.9)` | not gold | gold |
| `oklab(0.5 0.158405 0.0896211 / 0.1)` (10% wash) | not red | not red (alpha < 0.5) |
| an `oklch(... / a)` with a < 0.5 | read as its colour (alpha ignored) | not that colour — the one deliberate change of R2 (SEEN_ALPHA) |
| rgb()/rgba() inputs | as before | as before (EC-4) |
| `color(srgb 1 0 0)` | false | false (EC-3) |
| `okLchOf` | absent | new export: oklch()/oklab() → { chroma, hue, alpha }, else null |

## 4. Censuses  (every grep the brief asked for, with file:line; "none found" only after the grep)

The modal roots, re-located (Grep `<(Dialog|AlertDialog|Sheet)($|\s)` over src/ with 3 lines after; the working tree equals START for src/features, src/routes and src/components/shell — the `--stat` above is empty). The brief's 22 controlled roots, each found where it says:
src/features/ad-page/report-ad.tsx:67, src/features/ad-page/share-ad.tsx:118, src/features/admin-categories/category-dialogs.tsx:76 (`open` literal), src/features/admin-screening/screening-page.tsx:637, src/features/admin/legal/legal-editor-form.tsx:348, src/features/admin/legal/legal-page.tsx:395, src/features/admin/legal/legal-publish-dialog.tsx:40 (`open` literal), src/features/admin/translations/ai-bulk-bar.tsx:339, src/features/admin/translations/approve-bar.tsx:144, src/features/admin/translations/delete-language-dialog.tsx:81 (`open` literal), src/features/admin/translations/history-drawer.tsx:126 (Sheet), src/features/admin/translations/pseudo-bar.tsx:95, src/features/auth/mfa/step-up-gate.tsx:43 (`open` literal), src/features/legal/certify-confirm.tsx:60, src/features/my-listings/my-listing-page.tsx:757, src/features/my-listings/my-listings-page.tsx:854, src/features/posting/background-dialog.tsx:152, src/features/posting/category-move-dialog.tsx:32, src/features/posting/photo-editor.tsx:231, src/features/posting/preview/listing-detail.tsx:1167 and :1233, src/routes/admin.listings_.$listingId_.edit.tsx:118.
Through the primitive directly: src/components/shell/app-rail.tsx:933 (`<DialogPrimitive.Root open={navOpen} … modal={false}>`), src/components/shell/toolbar-panel.tsx:64 (`<DialogPrimitive.Root open={open} …>`). Uncontrolled: src/routes/dev.style.tsx:186 (`<Dialog>`).
Two more roots the brief does not list: src/components/ui/sidebar.tsx:191 (`<Sheet open={openMobile} …>`, controlled) and src/components/ui/command.tsx:28 (`<Dialog {...props}>`, CommandDialog). Grep `ui/(sidebar|command)["']|from "\./(sidebar|command)"` over the repository: the only hit is a handoff document (docs/governance/handoffs/2026-10-09-bundle9-fixes-running-record.md:40). Nothing imports either file, so neither root reaches a page. Both sit on ModalRoot and are covered by the same fix with no change (section 10).
Tests: src/components/ui/modal-facade.test.tsx:70, :114; src/components/ui/overlay-facade-failure.test.tsx:125, :167.

Tooltips and menus opened by their owner (multiline Grep `<(Tooltip|DropdownMenu)\b[^>]*\b(open|defaultOpen)\b` over src/): one hit, src/components/ui/overlay-facade.test.tsx:162 (OVF-10's test menu); in app code none found.

`loadOnce(` callers (Grep over src/): src/i18n/compiled-catalog.ts:19, :37, :38, :39, :40; src/components/shell/use-category-glyphs.ts:25; src/features/posting/phone-parse.ts:31; src/components/ui/overlay-loader.ts:21; src/features/posting/map/leaflet.ts:31; src/features/posting/preview/listing-detail.tsx:47 (and the mechanism and its test, src/lib/load-once.ts, src/lib/load-once.test.ts). Their failure paths are in section 6.

The colour reader's consumers, at ruling 1's BASE (Grep `\b(isRedFill|isGoldFill)\(` over e2e/): e2e/admin-categories-lifecycle.spec.ts:188 (CT-13); e2e/admin-categories-home.spec.ts:154 (CT-39); e2e/admin-locations.spec.ts:479 (LT-5); e2e/photo-pipeline.spec.ts:1007, :1013, :1022 (PP-19); e2e/admin-screening.spec.ts:631, :635, :641 (SC-12), :749, :759 (SC-14); e2e/admin-attributes-library.spec.ts:325 (AT-6), :552, :567 (AT-79); e2e/admin-translations-governance.spec.ts:1188 (TR-31). That is the ruling's list. All of them call through the reader.

vaul and cmdk importers (grep `from ['"](vaul|cmdk)['"]|import ['"](vaul|cmdk)['"]` over src/): src/components/ui/drawer.tsx:2 (vaul), src/components/ui/command.tsx:5 (cmdk). Nothing imports either wrapper (grep `ui/(drawer|command)['"]|\./(drawer|command)['"]` over src, e2e, scripts: no hit), so neither package reaches a page today. This corrects the first brief's "neither has an importer today", and ruling 1 R1 accepted it.

## 5. Tests  (ids added/changed/re-pointed with reasons; red-first evidence; unit totals; the E2E count lines and [ssr-error] counts; the J-audit line when e2e/** changed)

Added: OVF-17, OVF-18 (src/components/ui/overlay-facade-failure.test.tsx); EC-1…EC-5 (NEW src/test/e2e-colors.test.ts). Changed without changing what they assert: the overlay-facade-failure mock's `real as unknown as OverlaysImpl` became `real` (B1 #1); OVF-12's `toContainElement(document.activeElement as HTMLElement)` became `.contains(document.activeElement)).toBe(true)` (B2). Both changes take out a cast and assert the same thing. Id collisions: the brief assigned OVF-17/18 and EC-1…5. Grep `(it|test)\(\s*["'`](OVF-1[78]|EC-[1-5]) ` over src/, e2e/ and scripts/ after the change finds only overlay-facade-failure.test.tsx:117 and :157 and e2e-colors.test.ts:12, :18, :25, :33, :39. There is no collision. The grep ran after the change, not before (section 12).

B3 — red first, `bunx vitest run src/components/ui/overlay-facade-failure.test.tsx --reporter=verbose` against BASE's overlay-facade.tsx (`git diff --quiet fe0ceee -- src/components/ui/overlay-facade.tsx` held):

```
 ✓ … OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu 254ms
 ✓ … OVF-16 a failed download keeps the closed dialog; the next click asks again and opens it 48ms
 × … OVF-17 a controlled dialog whose download fails: its owner hears the closing, and the next click asks again and opens it (INC-908) 13ms
 × … OVF-18 a dialog its owner opens whose download fails: the owner hears the closing, and its next opening asks again (INC-908) 4ms
AssertionError: expected [ true ] to deeply equal [ true, false ]
AssertionError: expected [] to deeply equal [ false ]
 Test Files  1 failed (1)
      Tests  2 failed | 2 passed (4)
```

After C1 — `bunx vitest run src/components/ui/overlay-facade-failure.test.tsx src/components/ui/modal-facade.test.tsx src/components/ui/overlay-facade.test.tsx scripts/conformance/overlays.test.ts --reporter=verbose`: OVF-1, OVF-2, OVF-3, OVF-4, OVF-5, OVF-6, OVF-7, OVF-8, OVF-9, OVF-10, OVF-11, OVF-12, OVF-13, OVF-14, OVF-15, OVF-16, OVF-17, OVF-18, CF-OV-1, CF-OV-2, CF-OV-3 each ✓; `Test Files  4 passed (4)`, `Tests  21 passed (21)`.

R2a — red first, `bunx vitest run src/test/e2e-colors.test.ts --reporter=verbose` against BASE's reader (`git diff --quiet ba37841 -- e2e/helpers/colors.ts` held):

```
 × EC-1
 × EC-2
 ✓ EC-3
 ✓ EC-4
 × EC-5
AssertionError: expected false to be true // Object.is equality
AssertionError: expected false to be true // Object.is equality
TypeError: okLchOf is not a function
 Test Files  1 failed (1)
      Tests  3 failed | 2 passed (5)
```

R2b — green: `bunx vitest run src/test/e2e-colors.test.ts` → `Test Files  1 passed (1)`, `Tests  5 passed (5)`.

Unit (THE CHECKS), `bun run test:unit`: `Test Files  306 passed (306)`, `Tests  1904 passed (1904)`. That matches R3's 306 / 1904. No EXH test timed out.

THE END-TO-END CHECK and R2c — `bun run e2e:local -- <spec> [--grep]`, against ethio-staging, fake mode, 2 workers, 0 retries, both projects. Each spec ran alone. `[ssr-error]` lines counted in each run's full log:

| Run | Count line | Per project | [ssr-error] |
| --- | --- | --- | --- |
| e2e/overlays.spec.ts (whole) | `Running 6 tests using 2 workers` · `1 skipped` · `5 passed (22.7s)` | OVE-1, OVE-2 both projects; OVE-3 mobile-360 passed, desktop-1280 skipped (the phone menu) | 0 seen in the run's output¹ |
| e2e/ad-page.spec.ts `--grep "AP-29 \|AP-30 "` | `Running 4 tests using 2 workers` · `4 passed (41.2s)` | AP-29, AP-30 × mobile-360, desktop-1280 | 0 |
| e2e/my-listings-ad.spec.ts `--grep "MLA-5 "` | `Running 2 tests using 2 workers` · `2 passed (17.9s)` | MLA-5 × both | 0 |
| e2e/admin-translations-governance.spec.ts `--grep "TR-31 "` | `Running 2 tests using 2 workers` · `2 passed (23.9s)` | TR-31 × both | 0 |
| e2e/admin-attributes-library.spec.ts `--grep "AT-6 \|AT-79 "` | `Running 4 tests using 2 workers` · `4 passed (33.4s)` | AT-6, AT-79 × both | 0 |
| e2e/admin-screening.spec.ts `--grep "SC-12 \|SC-14 "` | `Running 4 tests using 2 workers` · `4 passed (42.6s)` | SC-12, SC-14 × both | 0 |
| e2e/admin-categories-home.spec.ts `--grep "CT-39 "` | `Running 2 tests using 2 workers` · `2 passed (19.9s)` | CT-39 × both | 0 |
| e2e/photo-pipeline.spec.ts `--grep "PP-19 "` | `Running 2 tests using 2 workers` · `2 passed (21.2s)` | PP-19 × both | 0 |
| e2e/admin-locations.spec.ts `--grep "LT-5 "` | `Running 2 tests using 2 workers` · `2 passed (22.5s)` | LT-5 × both | 0 |
| e2e/admin-categories-lifecycle.spec.ts `--grep "CT-13 "` | `Running 2 tests using 2 workers` · `2 passed (24.9s)` | CT-13 × both | 0 |

¹ The first run's output was read through a filtered tail and not saved to a file. Every later run's whole log was saved in the scratchpad and counted with `grep -c '[ssr-error]'` (section 12).

J-audit (e2e/** changed: e2e/helpers/colors.ts only, a pure reader): docs/features/e2e-harness.md §Authoring laws read before the change. J1, J3, J4, J6, J7 and J9 do not arise: no fixture, no row, no seed, no identity. J2 and J8 do not arise: no global sweep, no `@global-state`. J5 does not arise: no locator. No spec file was edited. The nine consumer tests ran green on both projects at 0 retries.

## 6. K2 — siblings that bypass the mechanism  (file:line, in scope or not; what was left and why)

Roots of a facade that their owner opens:
- Modal (ModalRoot, covered by this fix): src/features/auth/mfa/step-up-gate.tsx:43, src/features/admin-categories/category-dialogs.tsx:76, src/features/admin/legal/legal-publish-dialog.tsx:40, src/features/admin/translations/delete-language-dialog.tsx:81 (`open` literal), and every controlled root in section 4 whose state can start true. Nothing is left.
- Tooltip and menu (OverlayRoot), app code: none (section 4's grep). Test only: src/components/ui/overlay-facade.test.tsx:162 (OVF-10). OverlayRoot's failure path (src/components/ui/overlay-facade.tsx:127, `activate`'s catch, re-armed only by the `openAtStart` effect at :138) does not tell an owner. An owner-opened menu or tooltip whose download failed would stay undrawn until its `open` flips. Left as the brief says ("a K2 line, not built today"): no consumer exists.

Places where a failed `loadOnce` download could leave a caller believing it succeeded. I read each caller's failure path:
- src/components/ui/overlay-loader.ts:27-33 logs `[overlays] … failed` and rethrows; its callers are the facades (this fix) and the idle warm-up at :64 (`.catch(() => undefined)` after the loader's own warning). Nothing believes it succeeded.
- src/i18n/compiled-catalog.ts:84-85 — warming logs `[i18n] warming … failed`; the loaders at :21, :45, :46 return the rejecting promise to the strings-layer gate. Nothing believes it succeeded.
- src/components/shell/use-category-glyphs.ts:39-45 — logs `[client-error]` and settles on NO_GLYPH (a declared absence). Nothing believes it succeeded.
- src/features/posting/step-who.tsx:210-217 (loadPhoneLib) — logs `[phone-lib] load failed` and sets `phoneLibFailed`; `loadLib` retries. Nothing believes it succeeded.
- src/features/posting/preview/listing-detail.tsx:401-412 (MAP_PREVIEW for an approximate pin) — logs `[listing-maps]` and leaves the maps links unset (absent); there is no retry until the effect runs again. Reported, not fixed: out of scope.
- src/features/posting/map/map-pin-dropper.tsx:261 (loadLeaflet) — shows the notice `post.pin.geocodeUnavailable`. Nothing believes it succeeded.
- src/features/posting/map/map-large.tsx:73 (loadLeaflet) — logs `[map-large]`, and the large map's box stays empty with no message to the person. Reported, not fixed: out of scope.
- src/features/posting/map/map-preview.tsx:108 (loadLeaflet) — `.catch(() => { /* the caption stands */ })` logs nothing: a catch-and-continue without a log (AGENTS.md "No silent catch-and-continue"). The person sees the caption, not a false success. Reported, not fixed: out of scope (K2).
None of these leaves a caller believing the download succeeded. The two map paths above (map-large.tsx:73, map-preview.tsx:108) are failures surfaced weakly or not logged. Both are outside SCOPE and are for the supervisor to rule on.

The colour reader: no spec parses oklch() or oklab() itself. Grep `okl(ch|ab)\(` over e2e/ (files): only e2e/helpers/colors.ts. The ruling's census names the like-with-like comparisons (e2e/post-wizard-where.spec.ts :52-:54, :564-:566, :640; e2e/shell.spec.ts :950-:979; e2e/my-listings-ad.spec.ts :934; e2e/post-wizard-specs.spec.ts :1996, :2011, :2071; e2e/photo-pipeline.spec.ts :1023; e2e/admin-attributes-library.spec.ts :550, :566), left as K2 per the ruling.

## 7. Allowlists and guards  (each allowlist's count before → after; every new line with reason and until; guard self-tests run)

`git diff --stat fe0ceee -- 'scripts/conformance/*-allowlist.txt' supabase/migrations src/i18n`: empty. No allowlist moved. Counts now (`grep -vc '^#'`), unchanged: ai-gateway 0, has-permission 0, kit-adoption 11, on-demand-imports 3, photo-signing 2, route-client 8, routes 1, signed-in-routes 0, vendor-seams 66.

The weight guard (scripts/check-marketplace-imports.mjs): FORBIDDEN gains `vaul`, `cmdk`. R1's planted proof, never committed. I added `import "vaul";` as the first line of src/components/ui/overlay-facade.tsx and ran `node scripts/check-marketplace-imports.mjs`:

```
modules walked: 106
findings: 1
  src/components/ui/overlay-facade.tsx imports vaul
```

Then `git checkout -- src/components/ui/overlay-facade.tsx` → `41fe33c859ce982bfef8097ab93d3392ccbaaff7c0fb68ab2c7fa090ca1d919e  src/components/ui/overlay-facade.tsx`; the guard again → `modules walked: 106`, `findings: 0`. At THE CHECKS: `findings: 0`.

The hash lists (THE CHECKS): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-32b.md | sha256sum -c` → src/components/ui/overlay-facade-failure.test.tsx: OK, src/components/ui/modal-facade.test.tsx: OK, src/components/ui/overlay-facade.tsx: OK, scripts/check-marketplace-imports.mjs: OK, docs/features/performance-strategy.md: OK, docs/governance/mechanisms.md: OK, docs/features/display-primitives.md: OK, docs/features/ci-guards.md: OK, docs/_changelog.md: OK. `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-32b-r1.md | sha256sum -c` → e2e/helpers/colors.ts: OK, src/test/e2e-colors.test.ts: OK.

THE CHECKS, the rest: `bun run lint` → `✖ 39 problems (0 errors, 39 warnings)`. `bun run typecheck` (tsc --noEmit) → clean. `bun run i18n:usage` → `i18n usage map: 1736 keys across 586 files (395 dynamic call sites)`, the maps did not move. `bun run i18n:map-guard` → `[i18n:map-guard] usage maps match the tree.` `bun run build` → exit 0. `node scripts/check-bundle-size.mjs` → `Bundle budget OK.` `bun run format:check` → `All matched files use Prettier code style!` The conformance guards CF-OV-1…3 are green (section 5). No other guard's self-test was touched.

## 8. Strings  (every new or changed key with EN and AM text; "none" when the brief says No new string)

None. The flag is no-new-string. `git diff --stat fe0ceee -- src/i18n` is empty and the i18n maps did not move (section 7).

## 9. Migrations  (file, sha256, mark, apply pairing line; or "none")

None. The flag is no-migration. `git diff --stat fe0ceee -- supabase/migrations` is empty.

## 10. Departures  (every difference from the brief with its reason; every STOP and ruling in the turn)

- STOP 1 (ba37841): D1's planted proof in src/components/app-shell.tsx was refused by the scope guard. Ruling 1 (docs/governance/briefs/foundations-turn-32b-r1.md) moved the proof into src/components/ui/overlay-facade.tsx (R1, done) and accepted the correction on vaul and cmdk importers.
- INC-910, added by ruling 1 (R2): turn 33's run 40259346793 on fe0ceee failed TR-31 ("TR-31: the delete confirmation is not red", mobile-360). My stop landing's run 40260842584 on ba37841 failed the same TR-31 the same way (section 11), because the reader's fix landed after it. Fixed at its root in e2e/helpers/colors.ts (2fba44d) with EC-1…5, red first. TR-31 is green on both projects locally (section 5). CI judges this landing.
- Census beyond the brief's list: src/components/ui/sidebar.tsx:191 (a controlled Sheet) and src/components/ui/command.tsx:28 (CommandDialog) are modal roots the first brief did not name. Neither has an importer, so neither reaches a page. Both are covered by the fix inside ModalRoot with no file changed. I report them here instead of stopping, because the work and the behaviour contract are unchanged by them.
- "Final commit": land.ts requires the report to name the last commit outside docs/governance/reports, which is e1597fe (Part E, docs). The roadmap's turn-32b tick names 2fba44d, the last commit that changes code, as foundations-turn-32b.md's "the last code commit" asks. This report's second line names both.
- The roadmap tick also carries the unit totals 306 / 1904 from THE CHECKS (R3's expectation), not the first brief's 305 / 1899.
- The independent reviewer (the `reviewer` subagent, run on `git diff fe0ceee..HEAD` at e1597fe, told nothing of what to expect) found 0 BLOCKER, 2 MAJOR, 5 MINOR. Neither MAJOR is fixed in this turn. Fixing either would change hash-pinned files the briefs give as exact text, or a file outside SCOPE, or need a new string. That would be unspecified work, so each is listed here for a ruling:
  - MAJOR 1 — a failed download looks to the owner exactly like the person closing the dialog (src/components/ui/overlay-facade.tsx:433-440). The step-up gate (src/features/auth/mfa/step-up-gate.tsx:45-47) calls `cancel()`, so the guarded action is rejected as `StepUpCancelled` (use-step-up.ts:75), not the existing `StepUpUnavailable` (use-step-up.ts:89). The person sees no message; only the loader's warning is logged (overlay-loader.ts:33), while F4 asks that failures surface as translated messages. This is the brief's design ("its owner hears the closing and cancels, as it does on Escape"), and it replaces a dialog that stayed stuck. Closing the gap would need step-up-gate.tsx (outside SCOPE) and likely a string (no-new-string). Left for the supervisor.
  - MAJOR 2 — the uncontrolled-root branch of the new tell has no test: overlay-facade.tsx:439 `byTrigger ||`. An uncontrolled root's `onOpenChange` listener now hears `[true, false]` on a failed download where it heard `[true]`. OVF-16 passes no `onOpenChange`, and OVF-17/18 are controlled, so removing `byTrigger ||` fails no test. A test would change overlay-facade-failure.test.tsx, whose text and sha256 the brief pins. Proposed for the next brief: an OVF-19 of OVF-16's shape with an `onOpenChange` listener asserting `[true, false]` and then `[true, false, true]`.
  - MINOR — a late rejection can tell an owner a stale `false` (overlay-facade.tsx:438-439, no still-mounted or still-wanted check). Reached through step-up-gate's `cancel()` and app-rail.tsx:878 `changeMenu(false)`, only when the owner closed or reopened before the download failed.
  - MINOR — OVF-17/18 do not re-assert the trigger's `aria-expanded="false"` / `data-state="closed"` after the failure, and OVF-18 does not assert `heard` after its reopen (OVF-16 makes the first check). These are the brief's verbatim tests.
  - MINOR — register row 48's guard column (docs/governance/mechanisms.md:58) still reads "OVF-1…16". The brief's E2 edit changed only the notes column. Not changed: it would break E2's pinned hash.
  - MINOR — INC-910 has no docs record (no changelog or feature-doc line, no EC-1…5 entry). The ruling says "REGISTER: none (a test helper; the records turn lists it)", and its Part E blocks carry no INC-910 text, so none was added. H1 asks for a changelog line; left for the records turn as the ruling says.
  - MINOR — the colour reader still ignores alpha for rgb()/rgba() (e2e/helpers/colors.ts:60, :71): `rgba(180, 35, 24, 0.1)` reads red while the oklab 10% wash does not. This is the ruling's verbatim R2b text; the alpha rule is applied to oklch()/oklab() only.
  - The reviewer said the CI evidence did not name the gating failure. It does: e2e-last-failure.md has a TR-31 section (section 11). The reviewer also could not run red-first itself, because the bash guard refused its scratch copy. My red-first lines are in section 5.

## 11. CI  (the first six lines of ci-status.md for the last landed commit you can read, with the two-step SHA check; "this landing's run has not completed" when it has not)

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, read before this report:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `ba37841d81e43ec78123c49eb27f6fcd1f849e05` (short `ba37841`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T03:09:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40260842584
```

Two-step check: the reported commit ba37841 is origin/dev (`git rev-parse origin/dev` → ba37841d81e43ec78123c49eb27f6fcd1f849e05), my last landed commit, so the read is current for it. Classified (40-ci-evidence.md (e)): e2e-last-failure.md has `Passed: 2200 · Skipped: 155 · Failed: 1`. The one gating failure is admin-translations-governance.spec.ts › TR-31 (shard 3, mobile-360): "TR-31: the delete confirmation is not red … Timeout 10000ms exceeded while waiting on the predicate". That is INC-910, which R2 fixes in this landing. Separately, one flaky pass was ledgered (DEC-030, non-gating): post-wizard-pricing.spec.ts › PW-94 (shard 6, mobile-360), a strict-mode violation (two listing-card prices for one listing id). flake-ledger.md has one PW-94 line (2026-10-26), below the 3-in-7-days threshold. It is not this turn's code, and I did not touch it. guards-last-failure.md lists only the E2E job. Earlier reads: at Part A the newest completed run was c38e953 SUCCESS (stale for fe0ceee); fe0ceee's own run 40259346793 later reported FAILURE (INC-910). This landing's run has not completed.

## 12. Limits  (what you could not run or prove, and why — logs unavailable, no browser, no secret)

- I did not save e2e/overlays.spec.ts's run to a file. Its `[ssr-error]` count comes from reading the run's filtered output, which showed none, not from a `grep -c` over the whole log. The other nine runs were counted over their whole logs (/tmp/claude-0/-home-user-ethio-marketplace/d3d5be42-7279-5cf0-bacc-a4bda29b4e4c/scratchpad/e2e-*.log, not in the repository).
- The local E2E runs used ethio-staging, not CI's temporary backend. CI on this landing runs every test.
- The Bash guard refused one read-only census command: its echo label contained the word "at", which the guard read as the scheduler. I ran the census with the Grep tool on the working tree instead. For src/features, src/routes and src/components/shell the tree is identical to START (the `--stat` is empty), so the result is START's.
- 20-tests.md asks for the id-collision grep before an id is assigned. I ran it after: the ids were the brief's, and the grep shows no collision (section 5).
- I could not watch CI for this landing: the turn ends at LANDED, and the supervisor reads the run.
