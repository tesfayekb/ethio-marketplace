# Task W3 — the walk's last three: notices docked on the phone's bar, the panel tab marked at the press, the iPhone tick — report

Base: bd97c81c · Final commit: 459248c1b · Brief: docs/governance/briefs/walk-w3.md (the task gave no sha256; the file's is 6ce1b6b14e9247b31836506b282350f0eaadb36a8d265d20e665b10af98fe24b)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 459248c

CI on the base: bd97c81c (run 41376387738) — SUCCESS, completed 2026-11-02T02:31:47Z.

## 1. Done / not done, by part and step

Every part is done. Nothing is left.

- Orient and record: branch `cursor/walk-w3` from `origin/dev` = bd97c81c = BASE, so no file moved between the base and the head. The task and the ruling are saved in `docs/governance/briefs/walk-w3.md`, and roadmap line 3 names it (e19c88fb3).
- Part A (33eb20923): notices pinned to the bottom of a phone screen are docked on the bottom bar.
  - `NOTICE_DOCK` and `NOTICE_DOCK_SURFACE` in `src/components/shell/notice-dock.ts`, with the layer `Z_NOTICE` in `src/components/layout/layers.ts` (ruling 5).
  - Three users: the session idle warning, the session notice and `OnDemandNotice`'s own region.
  - Guard CF-DOCK-1, with its allowlist and NDK-1…4. Tests ODN-4 and SP-8.
- Part B (47ca386b2): the panel tab's current mark follows the press.
  - `panelAt` in `menu-current.ts`. `panelChoice` is on the shell's context (ruling 2).
  - `panel-tabs.tsx` reads `panelAt(useMenuAt().pathname, panelChoice)`.
  - CF-PRESS-1 is extended: the menu files include `panel-tabs.tsx`, `aria-selected` marks are read, and PRP-9 covers it (ruling 6).
  - Tests PO-U3 and PS-7; PS-7 runs at 768×1024 in the phone project (ruling 3).
- Part C (c26c395e6): the iPhone tick. Where `navigator.vibrate` is absent, `press.ts` clicks one hidden switch checkbox through its own label. Test PR-U10.
- Size (6dce55964): sixteen page ceilings raised by DEC-296's form (ruling 4; section 10).
- Docs (459248c1b): `design-foundation.md`, `panels.md`, the register's PRESSED row and a new NOTICE_DOCK row, and one changelog line.
- The checks, the browser check, the self-review and this report: below.

### Walk lines for the operator

1. **The notice on a phone.** At phone width (under 768 px), sign in and let the session time out, or wait for the idle warning. The notice sits on the bottom bar, from the edge of the left strip to the screen's right edge. Its top-left corner is square and its top-right corner rounded like the bar. The Post disc stays drawn over it and opens the post page when tapped. Check light and dark, English and Amharic. From 768 px the notice is unchanged: a centred card at the bottom.
2. **The tab on a desktop.** Signed in with more than one panel, on `/`, click the Account tab. Account is marked at once, before its page has drawn, and Marketplace is not. Click Marketplace: it is marked at once.
3. **The tick on an iPhone.** On your iPhone, turn Settings → This device → "Vibrate on tap" on, then tap a menu row: a short tick. Turn it off: no tick.
   - The iPhone tick depends on iOS 18 or later. It also depends on Apple keeping that behaviour: Safari ticks when a switch checkbox is toggled, which is Apple's behaviour and not a web standard.
   - This walk is its only proof. An older iOS, or a later Apple change, gives no tick and no error.

## 2. Files changed

`git diff --name-only bd97c81c`:

```
docs/_changelog.md
docs/features/design-foundation.md
docs/features/panels.md
docs/generated/i18n-usage.json
docs/governance/briefs/walk-w3.md
docs/governance/mechanisms.md
e2e/auth-signout.spec.ts
e2e/press.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/notice-dock-allowlist.txt
scripts/conformance/notice-dock.test.ts
scripts/conformance/press.test.ts
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/components/layout/layers.ts
src/components/shell-context.ts
src/components/shell/menu-current.test.ts
src/components/shell/menu-current.ts
src/components/shell/notice-dock.ts
src/components/shell/on-demand-notice.test.tsx
src/components/shell/on-demand-notice.tsx
src/components/shell/panel-tabs.tsx
src/lib/press.test.ts
src/lib/press.ts
```

The new files are tracked. `git ls-files` lists each of them:

```
docs/governance/briefs/walk-w3.md
scripts/conformance/notice-dock-allowlist.txt
scripts/conformance/notice-dock.test.ts
src/components/shell/notice-dock.ts
```

Each path is in SCOPE or the standing allowance:

- `src/components/layout/layers.ts`: ruling 5.
- `src/components/shell-context.ts`: ruling 2.
- `scripts/route-budgets.mjs`: ruling 4.

`scripts/check-bundle-size.mjs` (ruling 4) and `src/styles.css` did not need a change. `src/components/ui/` is unchanged.

## 3. Behaviour contract — answer tables before → after

**The session idle warning and the session notice** (`app-shell.tsx`):

| Width | Before | After |
| --- | --- | --- |
| < 768 px | `fixed inset-x-2`, bottom = `--bottom-bar` + `--bar-rise` + 0.5rem, `z-50`, `max-w-md`, `rounded-card`, `shadow-lg`, `p-3` | start = 3rem (the strip's `w-12`), end 0, bottom = `--bottom-bar` (the bar's top), `z-[25]` (`Z_NOTICE`), no max width, start-top corner square, end-top corner `--radius-bar`, `shadow-bar-up`, `p-3` with bottom padding `--bar-rise` + 0.75rem |
| ≥ 768 px | the same classes; both variables are 0 there, so bottom is 0.5rem | `bottom-2` (0.5rem). Every dock class is `max-md:`. Identical |

Words, roles, live regions, buttons and timers are unchanged.

**`OnDemandNotice`**:

| Where | Before | After |
| --- | --- | --- |
| Its own region, < 768 px | `fixed inset-x-0`, bottom as above, `px-4`, `z-50`; a `CARD_SURFACE` card | the region takes `NOTICE_DOCK` (as above, `z-[25]`), `md:px-4`; the card takes `NOTICE_DOCK_SURFACE` and `max-md:w-full` |
| Its own region, ≥ 768 px | `md:bottom-6`, `px-4`, `z-50` | `md:bottom-6 md:px-4`, `z-50`. Identical |
| Inside a `NoticeOutlet` (INC-955) | the card portalled into the topmost overlay | unchanged: the card takes no dock class (ODN-4) |

**The panel tabs** (`panel-tabs.tsx`):

| Moment | Before | After |
| --- | --- | --- |
| A tab pressed, its page not drawn yet | the old tab is `aria-selected` until the shown page changes | the pressed tab is `aria-selected` at once (`panelAt(useMenuAt().pathname, panelChoice)`) |
| Settled | `panel.id === activePanel` | the same panel, because `panelAt` on the shown path is `activePanel` |

Activation (`useSwitchPanel`) is unchanged, and so is the rule for when the tabs show.

**The shell** (`app-shell.tsx`):

- `activePanel` was `panelOf(pathname) ?? panelChoice`. It is now `panelAt(pathname, panelChoice)`, which returns the same value.
- The context also carries `panelChoice`. Nothing else is added to it.

**`press.ts` `onClick`**:

| Case | Before | After |
| --- | --- | --- |
| touch, switch on, tickable, `vibrate` present | `vibrate(10)` | `vibrate(10)`; no label made |
| touch, switch on, tickable, `vibrate` absent | nothing | the one hidden label (created on first use) is clicked |
| mouse, switch off, or not tickable | nothing | nothing |
| uninstall | listeners removed | the same, and the label is removed |

The label's own click arrives with the touch already spent, so it never ticks again (PR-U10).

## 4. Censuses

Part A, by definition: anything `fixed` whose bottom comes from `--bottom-bar`, and every notice pinned to the bottom, across `src/`, `e2e/` and `scripts/` (the plan's census, re-read this turn).

- `app-shell.tsx` `session-idle-warning` and `session-notice`, and `shell/on-demand-notice.tsx`'s region: bypassed the dock, now take it.
- `app-rail.tsx` `rail-strip`, `rail-menu-scrim` and `rail-menu`: the phone menu, not notices. They have allowlist lines (ruling 5).
- `ui/fading-notice.tsx` is drawn in place, and `ui/action-message.tsx` has only a scroll margin. Neither is pinned, so both are outside the definition.
- `shell/form-section.tsx`, `layout/page-header.tsx` and `layout/form-layout.tsx` are sticky action bars, not fixed: outside the definition.
- `ui/sonner.tsx`: the Toaster is mounted nowhere.

CF-DOCK-1's tree scan agrees with this. On the base's files it reported six findings:

- `session-idle-warning` (`:939`)
- `session-notice` (`:960`)
- `on-demand-notice.tsx#67`
- `rail-strip` (`:1112`)
- `rail-menu-scrim` (`:1134`)
- `rail-menu` (`:1144`)

Part B: every place a menu mark reads the panel.

- `panel-tabs.tsx:56` (base) read `activePanel`. Now fixed.
- `panel-header.tsx:43` and `:75` (section 6).

Part C: `rg -n 'vibrate\(|setAttribute\("switch"' src --glob '!*.test.*'` finds only `press.ts:109` (the switch) and `press.ts:200` (vibrate), as CF-PRESS-1 rule 4 requires.

Document click listeners (the tick's synthetic click): `rg "addEventListener\(\s*[\"']click[\"']" src` finds none outside tests. The only `"click"` listener is `press.ts`'s own.

## 5. Tests

**Added:**

| Id | File | What it covers |
| --- | --- | --- |
| NDK-1 | `scripts/conformance/notice-dock.test.ts` | the tree, the allowlist, the strip tie |
| NDK-2 | same | planted bypasses: the old session notice, a split `cn`, a fixed style object, a fixed CSS rule |
| (unnamed) | same | the passing case: a sticky bar, the owner, a notice using the constant, `scroll-padding-bottom` |
| NDK-3 | same | stale and expired allowlist lines |
| NDK-4 | same | `w-12` passes, `w-14` fails (ruling 1) |
| ODN-4 | `on-demand-notice.test.tsx` | docked in the shell's region; card look kept inside an outlet |
| PO-U3 | `menu-current.test.ts` | `panelAt` |
| PRP-9 | `scripts/conformance/press.test.ts` | three findings on the old tab shape; the new shape passes |
| PR-U10 | `press.test.ts` | the iPhone path |
| SP-8 | `e2e/auth-signout.spec.ts` | the docked notice on a phone, in four theme and language passes |
| PS-7 | `e2e/press.spec.ts` | the chosen tab marked before its page lands |

No existing test changed shape.

**Red-first:**

- PS-7 failed on both projects against the base's `panel-tabs.tsx` (at `press.spec.ts:388`, the pressed tab not selected while the page was held). The file was then restored.
- CF-DOCK-1 was red on the base's files with the six findings in section 4.
- PRP-9 reports three findings on the old shape.

**Typecheck:** `bun run typecheck` (`tsc --noEmit`) passed with no output.

**THE CHECKS**, on 459248c1b:

```
checks (fast): 17 PASS · 4 FAIL · 250s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, p…
checks: 24 PASS · 4 FAIL · 30 NOT RUN · 305s
```

The four FAILs and every NOT RUN are in section 12. They are this Mac, not the diff:

- The scripts run: 1 failed | 423 passed (424), and the failure is NH-6.
- The full unit run: 1 failed | 2623 passed (2624), 420 files, and the failure is NH-6.
- The bundle-budget job printed `Bundle budget OK.`

The steps skipped behind a FAIL were run by hand on the same tree:

| Step | Result |
| --- | --- |
| `bun run format:check` | exit 0 |
| `bun run lint` | exit 0; 46 warnings, none in a file this turn touched |
| `bun run scripts/e2e-select.ts --self-test` | `e2e-select self-test OK` |
| `bun run scripts/check-root-routes.ts --self-test` and the check | `59 entries; every root segment is safe` |
| `bun scripts/ci/laws-changed.ts units` | 336 passed (65 files) |
| `bun scripts/ci/laws-changed.ts semgrep` | `Ran 45 rules on 16 files: 0 findings` |
| `bun run build && node scripts/check-bundle-size.mjs` | exit 0 |

**THE BROWSER CHECK** (ethio-staging, `bun run e2e:local`, both projects, 0 retries).

Run 1 covered nine whole files:

- the changed specs: `auth-signout`, `press`;
- `on-demand-failure`;
- the callers of the panel helpers whose tab mark changed: `admin-shell`, `my-listings-page`, `rbac`, `layout`, `submenu-look`, `shell`.

```
  6 failed
  79 skipped
  261 passed (15.1m)
[ssr-error]: 0
```

SP-8 (mobile-360; skipped at 1280 by design), PS-7 (both projects), PS-2, PS-3 and ODE-1 (both projects) all passed. The six failures:

| Test | Project | Cause | Verdict |
| --- | --- | --- | --- |
| MLP-6 | both | the clear-search step: the same Mac select-all failure the W2 report recorded | not this diff; unchanged test |
| BB-1 | mobile-360 | the shared language switch never stored `am` (INC-173b) | passed on rerun |
| "the posting wizard keeps the frame" | mobile-360 | BB-1 failed before its own reset to English, so the next test found the pool account in Amharic and no English "Open menu" | passed on rerun |
| HM-2 | mobile-360 | in RTL the menu measured at 256 (expected > 300) | identical on the base's files |
| "footer never covers the rail's Sign out" | desktop-1280 | the language record never reached `am` | identical on the base's files |

Run 2, the four `shell.spec.ts` failures by `--grep`: 2 failed | 4 skipped | 2 passed, `[ssr-error]` 0. BB-1 and the wizard test passed; HM-2 and the footer test failed again.

The base probe for those two:

- The seven changed `src` files were set to their base text (`git show bd97c81c:<file>`), the same two tests were run, then each file was set back from `git show HEAD:<file>`. `git status --short` was empty afterwards.
- Result: 2 failed | 2 skipped, with the same errors: `Received: 256` and `the device language record never reached am`.
- So neither failure comes from this turn.

**J-audit** (e2e/** changed):

- SP-8 signs in a `leaseUser()` and sets the policy through the spec's own `overridePolicy`. It measures with `layoutBoxes` and switches language with `switchLanguage`.
- PS-7 signs in `feed.scratchSeller()` and holds the page's code with the file's `holdCode` (built on `whilePageLives`).
- Neither uses a real row, `.first()`, `waitForTimeout`, `test.only` or a retry. Their 15 s waits match the file's existing ones; no timeout was raised.

## 6. K2 — siblings that bypass the mechanism

Greps run: the Part A census in section 4; `rg -n "activePanel" src/components/shell`; the Part C grep in section 4.

- `src/components/shell/panel-header.tsx:43` (`panels.find((p) => p.id === activePanel)`) and `:75` (`<DropdownMenuRadioGroup value={activePanel}>`): the panel header's title and radio list read the frame's panel. Left untouched by ruling 6. Its title is the frame, and the radio list closes on a pick, so a late mark is rarely seen.
- The other `activePanel` readers are frame reads (INC-581), not marks, and are correct as they are:
  - `app-rail.tsx:535`, `:799–:821`, `:940`, `:999–:1035` and `:1141`: which panel's rail, items and alerts to draw.
  - `breadcrumbs.tsx:117–:131` and `:389`: the trail's panel segment and home.
- Notices: nothing else bypasses the dock. The three phone-menu surfaces are allowlisted; the rest are out of the definition (section 4).
- Tick: none. Only `press.ts` vibrates or clicks a switch.

## 7. Allowlists and guards

- `scripts/conformance/notice-dock-allowlist.txt`: 0 → 3 (a new file). Every line expires 2027-06-30 (ruling 5):
  - `src/components/shell/app-rail.tsx#rail-strip | the phone menu's strip, not a notice: it runs from the top band to the bottom bar's top edge (turn W3) | 2027-06-30`
  - `src/components/shell/app-rail.tsx#rail-menu-scrim | the open phone menu's scrim, not a notice: it covers the page down to the bottom bar's top edge (turn W3) | 2027-06-30`
  - `src/components/shell/app-rail.tsx#rail-menu | the open phone menu, not a notice: it runs from the top band to the bottom bar's top edge (turn W3) | 2027-06-30`
- No other allowlist changed. `non-null-allowlist.txt` is untouched, and the diff adds no `!`.
- Guard self-tests run in `bunx vitest run scripts` and in the checks: NDK-2, NDK-3, NDK-4 and PRP-9.
- CF-DOCK-1 is a `.test.ts` census over `kit.ts`, like `press.test.ts`. It sits outside `wired.test.ts`'s domain, which excludes test files, and it runs in CI's unit job, because `vitest.config` includes `scripts/**/*.test.ts`.

## 8. Strings

None (FLAG no-new-string).

- No key was added or changed. Over the diff's added lines in `src/` and `e2e/`, `rg -o 't\("[^"]+"\)|en\["[^"]+"\]'` finds only the selector tails of `querySelector("input")`, `querySelector("label")` and `closest("[data-notice-outlet]")`: no key.
- The SP-8 and PS-7 names come from existing keys.
- Both i18n usage maps were regenerated because one more file is scanned (636 → 637).

## 9. Migrations

None (FLAG no-migration).

## 10. Departures

**Rulings applied:**

- Ruling 1: (b), the notice starts at the strip's edge. NDK-4 ties the strip's `w-12` to the dock's `inset-s-12`. SP-8 was reworded as ruled.
- Ruling 2: `shell-context.ts` gains `panelChoice`. There is no literal fallback.
- Ruling 3: PS-7 resizes to 768×1024 in the phone project.
- Ruling 4: sixteen ceilings in `scripts/route-budgets.mjs` were raised by one KiB each, in DEC-296's local form, `ceilingForLocal(size)`. Each line names its cause.
- Ruling 5: `Z_NOTICE` is in `layers.ts`, between `Z_ACTION_BAR` and `Z_POPOVER`, with its reason.
- Ruling 6: the CF-PRESS-1 extension; `panel-header.tsx` is in K2.
- Ruling 7: PR-U10, and the iOS 18 walk wording above.

**The sixteen ceiling raises (ruling 4):**

- Every page grew +0.3 to +0.4 KiB, all of it in the entry that every page carries. The cause is the turn's shared root growth: `press.ts`'s switch path, the dock classes on the shell's notices, and `panelAt` with the tabs' `useMenuAt`.
- The entry went from 211.9 to 212.3 KiB (ceiling 213) and the stylesheet from 22.9 to 23.0 KiB (ceiling 40). Both stay outside the band, so `check-bundle-size.mjs` is unchanged.
- No page grew by 1 KiB, and every growth has its cause.
- The pages raised:

| Page | Size (KiB) | Ceiling | Why |
| --- | --- | --- | --- |
| `/legal/$kind` | 216.9 | 217 → 218 | over 217 with the local allowance |
| `/legal/accept` | 223.9 | 224 → 225 | over 224 with the local allowance |
| `/privacy` | 216.9 | 217 → 218 | over 217 with the local allowance |
| `/terms` | 216.9 | 217 → 218 | inside the NEAR band |
| `/account` | 272.9 | 273 → 274 | inside the NEAR band |
| `/account_/legal` | 214.8 | 215 → 216 | inside the NEAR band |
| `/admin/attributes` | 337.6 | 338 → 339 | inside the NEAR band |
| `/admin/categories` | 345.6 | 346 → 347 | inside the NEAR band |
| `/admin/coverage` | 319.8 | 320 → 321 | inside the NEAR band |
| `/admin/images` | 213.9 | 214 → 215 | inside the NEAR band |
| `/admin/listings` | 343.8 | 344 → 345 | inside the NEAR band |
| `/admin/locations` | 274.9 | 275 → 276 | inside the NEAR band |
| `/admin/users` | 293.8 | 294 → 295 | inside the NEAR band |
| `/l/$slug` | 260.9 | 261 → 262 | inside the NEAR band |
| `/legal/publishing` | 217.7 | 218 → 219 | inside the NEAR band |
| `/my-listings_/$listingId` | 324.8 | 325 → 326 | inside the NEAR band |

`/admin/attributes` and `/admin/categories` were found on the second measure: their unrounded sizes sit on the band's edge.

**The self-review's three MINORs, left as they are:**

1. On a phone, a popover (`Z_POPOVER`, z-40) opened near the bottom now draws over a docked notice. Before, the notices were z-50 and drew over popovers. This follows from the ruled layer below the bar (z-30), because popovers sit above the bar. Modal dialogs were z-50 and drawn later, so they covered the notices before as well.
2. CF-DOCK-1's definition is a fixed surface placed from `--bottom-bar`. A future notice pinned at `bottom-0` on a phone would sit under the bar without a finding. That is the plan's definition, left as ruled.
3. PRP-9 follows a mark through `const x = … activePanel …` written on one line. A mark derived over several lines or through a function would pass.

**Other:**

- On a phone, the on-demand region's `px-4` became `md:px-4` (the docked card runs edge to edge). From md the classes are unchanged.
- No STOP was raised in the build.

## 11. CI

The base's CI: `git fetch origin ci-evidence dev`, then `git show origin/ci-evidence:docs/tracking/ci-status.md`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `bd97c81cbe05d472890d538ca82f43239eb5c64c` (short `bd97c81`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-02T02:31:47Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41376387738
```

The two-step SHA check: the file's commit is bd97c81c, `git rev-parse origin/dev` is bd97c81cb, and the task's base is bd97c81c. All three agree. `gh run list --branch dev` shows run 41376387738 completed, success.

When the turn started that run was still queued. The last completed run was then 6edb57ae (SUCCESS). No red from an earlier turn was waiting.

This pull request's runs: none yet at the time of writing. Any red is recorded here in the commit that fixes it.

## 12. Limits

The local `bun run checks` ended `24 PASS · 4 FAIL · 30 NOT RUN · 305s`. The four FAILs are this Mac (Darwin), not the diff. The W2 report recorded the same four.

- `laws-first › scripts/ tests first` and `component-tests › Component tests`: NH-6 (`scripts/ci/nightly-hour.test.ts`, `expected +0 to be 2`). The test and its script are unchanged from the base, and CI passes them on Linux.
- `build-and-check › Workflow lint`: the pinned `actionlint_1.7.7_linux_amd64.tar.gz` passed its checksum. The binary is a Linux ELF (`file`: ELF 64-bit LSB executable, x86-64), which this Mac cannot run, so its self-test printed `the bad fixture failed for another reason`. No workflow changed this turn.
- `secrets-scan`: the pinned `gitleaks_8.24.3_linux_x64.tar.gz` is also a Linux ELF. The scan named `6 commits in bd97c81c..HEAD` and printed no leak line. Before each commit I read `git diff --cached` for key-, secret-, token- and password-shaped text and found none. CI's gitleaks judges again.

NOT RUN because an earlier step failed:

- laws-first: the changed folders' unit tests and Semgrep.
- build-and-check: Typecheck, Format check, Lint, the e2e selector, Root routes, Build and Bundle report.

Each was run by hand (section 5), except the Bundle report. Its budget check was run by hand, and the bundle-budget job built and checked the budget itself.

NOT RUN for the checks script's own reasons:

- Install dependencies: already installed.
- dependency-audit: the advisory service is not reachable from the sandbox.
- e2e-preflight: it needs staging credentials, which the script never holds.
- The e2e merge and verdict steps: they need GitHub's lane artifacts.
- promote: only CI promotes.
- Semgrep's SARIF upload: only GitHub can receive it.

**The browser runs:**

- They needed `PLAYWRIGHT_BROWSERS_PATH` pointed at the installed Playwright cache. The sandbox's default path holds no browser.
- MLP-6, BB-1 and the wizard test are explained in section 5.
- HM-2 and the footer test fail on this Mac with the base's files as well. CI on the base passed them, so CI on this pull request is their proof.

**The iPhone tick** cannot be proven here: jsdom and Chromium have no switch haptics. PR-U10 proves the code path. Whether it ticks rests on walk line 3, on iOS 18 or later, and on Apple keeping that behaviour.

The repeat lane (DEC-283) on CI proves the changed specs' repeatability. No local repeats were run for that purpose.
