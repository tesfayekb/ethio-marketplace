# Task: sage-s6-3-popover. Base: dev cc77e93e. — report

Base: cc77e93e · Final commit: 7ac4819c2 · Brief: docs/governance/briefs/sage-s6-3-popover.md (no sha256 given)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 7ac4819

CI on the base: cc77e93e, **SUCCESS** (run 41275709062); `origin/dev` is still cc77e93e.

## 1. Done / not done, by part and step

Every item is done.

- **Stop 1 (the census) and its ruling.**
  - The stop is `docs/governance/reports/sage-s6-3-popover.stop-1.md` (60e8a3c5a).
  - The ruling is saved as `docs/governance/briefs/sage-s6-3-popover.ruling-1.md` (538eed26f).
- **Item 1, commit 469a22508.** The popover joins the overlay facade.
  - `popover-impl.tsx` (new) holds Radix's popover, `collisionPaddingNow` (taken once on open) and the list surface. `PopoverContent` takes `variant`: `list` (the default, today's `w-72 p-4`) or `panel`.
  - `overlays-impl.ts` re-exports it as `popover`.
  - `popover.tsx` is a facade on `OverlayRoot` with `kind="popover"`:
    - closed: `type="button"`, `aria-haspopup="dialog"`, `aria-expanded="false"`, `data-state="closed"`;
    - the first click is the intent, replayed on the same element; the consumer's own click handler (on the part or on its child) hears the person's click once, never the replay;
    - a prevented click opens nothing, as on Radix's trigger;
    - a controlled `open` is passed through.
  - `PopoverAnchor` had no consumer and is retired. CF-OV-3 holds: the facade's exports equal the impl's (`Popover`, `PopoverContent`, `PopoverTrigger`).
  - `dropdown-menu.tsx`'s `as unknown as` is gone: `inside(name, (m) => m.X)` reads the part from the module, so its props are the real part's own.
  - The facade reports a failed download as "a panel's code" for the popover (INC-911).
  - Tests: OVF-23…26; CL-U7 re-pointed.
- **Item 2, commit 23e8822a9.** The toolbar panel.
  - Phone: `Sheet` with `SheetContent side="bottom"`. The primitive draws the scrim, the grabber, the title (`SheetHeader`/`SheetTitle`), the close (`closeTestId={`${testid}-close`}`) and the notices.
  - From md: the popover facade with `PopoverContent variant="panel"`.
  - Both draw the footer in `SheetFooter` with `flex-row items-center` (ruling 5: the link and Done stay in one row).
  - The panel's own backdrop, panel, grabber, header, title, close and footer are gone.
  - The allowlist line `toolbar-panel.tsx#PopoverContent` is gone.
  - Tests: HS-16 re-pointed; HS-24 unchanged and passing.
- **Item 3, commit de1649fcc** (plus 82ae09af3 from the review). The step-up gate's dialog loads on demand.
  - The dialog moved to `src/features/auth/mfa/step-up-dialog.tsx` (ruling 3a). The gate fetches it through `resilientLazy` when `mode` is not `closed`.
  - It keeps the top layer (`layer="top"`), `size="narrow"`, every test id and the focus on the code field.
  - A failed download reports through `reportOnDemandFailure` ("the step-up dialog") and ends the guarded action as `StepUpUnavailable`.
  - None of the 19 mounting files changed.
  - Tests:
    - SUG-2 (the failed download);
    - SUG-3 (the gate's own imports);
    - MF-8 (browser: the chunk absent before the press, fetched once on it, z-index 100).
- **Item 4, commit 198552875.** CF-DIALOG-1's DG-1 also reads:
  - the parts of a namespace imported from `dialog-primitive`, outside the primitives, skipping a `<NS.Root modal={false}>` subtree (the phone menu, plan ruling 9);
  - `PopoverContent` outside `popover.tsx` and `popover-impl.tsx`.

  It is planted as DG-7. CF-OV-1 watches `@radix-ui/react-popover`, with `popover-impl.tsx` as its one reader (ruling 4), planted as CF-OV-6. `check-marketplace-imports.mjs` forbids the package.
- **Item 5, commit 7bda245cc.** Page ceilings follow the tree by DEC-296's form (section 3).
- **Docs, commit 759055f69:**
  - register rows 48 and 88;
  - design-foundation's "The popover on demand (turn S6-3)";
  - one changelog line and one roadmap line;
  - both i18n usage maps (630 → 632 files scanned; no key moved).
- **Review fixes:**
  - 82ae09af3: the dialog's unused default export removed;
  - 82a7dbcee: DLG-E4's title, and the allowlist's last newline;
  - b2851611e and 7ac4819c2: DLG-E4 made able to fail (section 5).
- **THE CHECKS, THE BROWSER CHECK and THE SELF-REVIEW** were run (section 5).

## 2. Files changed

`git diff --name-only cc77e93e` (this report added by its own commit):

```
docs/_changelog.md
docs/features/design-foundation.md
docs/generated/i18n-usage.json
docs/governance/briefs/sage-s6-3-popover.md
docs/governance/briefs/sage-s6-3-popover.ruling-1.md
docs/governance/mechanisms.md
docs/governance/reports/sage-s6-3-popover.report.md
docs/governance/reports/sage-s6-3-popover.stop-1.md
e2e/mfa-stepup.spec.ts
e2e/overlays.spec.ts
public/i18n-usage.json
roadmap.md
scripts/check-bundle-size.mjs
scripts/check-marketplace-imports.mjs
scripts/conformance/choice-lists-allowlist.txt
scripts/conformance/choice-lists.test.ts
scripts/conformance/dialogs.test.ts
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/notice-outlet.test.ts
scripts/conformance/overlays.test.ts
scripts/conformance/visible-area.test.ts
scripts/route-budgets.mjs
src/components/shell/toolbar-panel.test.tsx
src/components/shell/toolbar-panel.tsx
src/components/ui/choice-list-look.test.tsx
src/components/ui/dialog-look.ts
src/components/ui/dropdown-menu.tsx
src/components/ui/overlay-facade.tsx
src/components/ui/overlays-impl.ts
src/components/ui/popover-impl.tsx
src/components/ui/popover.test.tsx
src/components/ui/popover.tsx
src/features/auth/mfa/step-up-dialog.tsx
src/features/auth/mfa/step-up-gate-offline.test.tsx
src/features/auth/mfa/step-up-gate.tsx
```

- **New files:** `popover-impl.tsx`, `popover.test.tsx`, `step-up-dialog.tsx`, `step-up-gate-offline.test.tsx`, the ruling, the stop and this report. Each is in `git ls-files` on the final commit.
- **Deleted files:** none.
- **Scope:**
  - `visible-area.test.ts` and `notice-outlet.test.ts` joined by rulings 1 and 2; `step-up-dialog.tsx` by ruling 3.
  - `holds-its-box-allowlist.txt` is under the standing allowance (`scripts/conformance/*-allowlist.txt`). Its guard, HB-1, is one whose list a move changes: the ruling's "standing" clause.
  - Named in scope but not changed:
    - `overlay-loader.ts` (the popover rides the same loader);
    - `src/lib/visible-area.ts` (its readers changed, not the module);
    - `scripts/e2e-select.ts` (no new spec);
    - the place that mounts the gate (no mounting file needed a change).
  - AGENTS.md is untouched.

## 3. Behaviour contract — before → after

| What | Base cc77e93e | Now |
|---|---|---|
| The popover's code | `popover.tsx` imported `@radix-ui/react-popover` statically; it rode the first download of every page with a toolbar panel | Radix's popover is in the overlay chunk (`overlays-impl`), fetched when the page is idle or on the first press |
| The popover trigger, closed | Radix's trigger: `type="button"`, `aria-haspopup="dialog"`, `aria-expanded="false"`, `aria-controls`, `data-state="closed"` | the same, without `aria-controls` until the real trigger draws (MINOR, as the menu kind's closed trigger) |
| The popover trigger, first click | Radix opens | the facade asks for the module, then replays the click on the same element; the consumer's click is heard once (OVF-24) |
| `PopoverContent` | one look: `w-72 p-4` on the list surface | `variant` `list` (the default, the same `w-72 p-4`) or `panel` (`w-80`, bounded by Radix's available height, `px-6 py-5.5`, `data-dialog-panel`) |
| `PopoverAnchor` | exported, no consumer | retired |
| Toolbar panel, phone | its own `DialogPrimitive` sheet: `bg-foreground/45` scrim, `max-h-[85dvh]`, its own grabber, a bordered header with the title (`text-lg font-bold`) and the close first, `p-4` body, a bordered footer | `Sheet side="bottom"`: the dialog scrim, panel, grabber, heading and close (`${testid}-close`, drawn after the content), the body scrolling inside, the footer in `SheetFooter` (its top rule, one row) |
| Toolbar panel, phone, focus on open | the close (the first focusable) | the panel's first control: a choice list (`FilterChoices`) or column toggle, never a text field in today's panels (MINOR) |
| Toolbar panel, md | `PopoverContent` with `p-0`, the body `p-4`, a bordered footer `px-4 py-3` | `PopoverContent variant="panel"`; the body scrolls inside it, the footer in `SheetFooter` (the dialog footer's top rule) |
| Test ids | `${testid}`, `-panel`, `-close` (phone), `-done`, `-clear`, `-all` | unchanged |
| The step-up dialog | drawn by `step-up-gate.tsx` in the page's first download | fetched on the first step-up (`step-up-dialog-*.js`, 0.97 KiB gzip -9), then drawn the same: top layer, narrow, the code field focused, every test id and key unchanged; the code typed is held by the dialog, cleared when it closes as before |
| A failed dialog download | — | the shell's notice ("the step-up dialog"); the guarded action rejects with `StepUpUnavailable` and never runs (SUG-2) |
| `dropdown-menu.tsx` parts | `impl.menu[name] as unknown as …` | `real(impl.menu)`: the same parts, props typed from the part |
| Words, keys, routes, doors | — | unchanged; no string added or changed |

Page ceilings (`scripts/route-budgets.mjs`, DEC-296's form, local sizes; the entry in `scripts/check-bundle-size.mjs`).

Each line carries its cause. The sizes are from `node scripts/check-bundle-size.mjs` on the base's build and on the tree's.

**Lowered** (the ratchet: each was 8 KiB or more under its ceiling once Radix's popover left):

| Page | Base → tree (KiB) | Ceiling |
|---|---|---|
| `/admin/ai` | 341.3 → 323.4 | 342 → 324 |
| `/admin/attributes` | 354.6 → 336.7 | 356 → 338 |
| `/admin/audit` | 314.9 → 296.6 | 316 → 298 |
| `/admin/categories` | 362.6 → 344.8 | 364 → 346 |
| `/admin/countries` (F4b) | 344.1 → 326.2 | 345 → 327 |
| `/admin/coverage` (F4b) | 336.9 → 319.0 | 338 → 320 |
| `/admin/impersonation_/$sessionId` (F4b) | 315.6 → 297.4 | 317 → 298 |
| `/admin/listings` (F4b) | 360.7 → 342.8 | 362 → 344 |
| `/admin/places` (F4b) | 345.6 → 327.7 | 346 → 329 |
| `/admin/roles` (F4b) | 312.1 → 293.5 | 313 → 294 |
| `/admin/screening` (F4b) | 385.9 → 368.1 | 387 → 369 |
| `/admin/translations` | 418.1 → 399.5 | 419 → 400 |
| `/admin/translations_/$lang` | 327.2 → 307.9 | 328 → 309 |
| `/admin/users` (F4b) | 311.5 → 293.2 | 312 → 294 |
| `/dev/style` | 256.4 → 236.9 | 257 → 238 |
| `/my-listings` | 334.3 → 316.1 | 335 → 317 |

**Raised:**

| Page | Base → tree (KiB) | Ceiling | Cause |
|---|---|---|---|
| `/admin/listings_/$listingId` | 385.4 → 385.9 | 386 → 387 | over its ceiling; the bundler's preload list for the step-up dialog's import rides the gate's chunk, and this page keeps its own dialogs |
| `/account_/saved` | 224.5 → 224.7 | 225 → 226 | inside the 0.3 KiB band; the entry's +0.2 |
| `/auth_/callback` | 212.4 → 212.6 | 213 → 214 | the same |
| `/auth_/reset` | 214.5 → 214.7 | 215 → 216 | the same |
| the entry (`js`) | 211.4 → 211.6 | 212 → 213 | inside the band; `overlay-facade.tsx` (the popover's closed state and the click replayed once, on every page) |

**The ninth F4b page:** `/admin/listings_/$listingId_/edit` measures 408.7 → 408.9 and stays at 410, which is what `ceilingForLocal(408.86)` gives: the posting wizard's searchable picker keeps `visible-area.ts` there.

**Every other page** moved by the entry's +0.1 to +0.2 KiB, except the step-up pages:
- `/admin/legal` +0.6 and `/admin/legal_/edit` +0.6: they keep their own dialogs and gain the preload list;
- `/admin/legal_/$versionId` −0.9, `/admin/users_/$userId` −0.4 and `/admin/roles_/$roleId` −0.4: their only dialog was the gate's.

None of those is inside the band.

**The final tree (7ac4819c2):** the build and `check-bundle-size` report "Bundle budget OK", and all 50 pages are clear of the band (`0 NEAR, none grew` in THE CHECKS). Five pages read +0.1 KiB over the part-5 build after the review commits (`/admin/attributes`, `/admin/countries`, `/admin/listings_/$listingId`, `/admin/places`, `/my-listings_/$listingId_/edit`); none comes within 0.3 KiB of its ceiling.

**Chunks, gzip -9, final build:**
- `toolbar-panel` 1.88 KiB (3.68 at the base, with Radix's popover);
- `step-up-gate` 1.75 KiB (1.36 at the base): the dialog left it, but the preload list of its import (56 chunk names) came in;
- `step-up-dialog` 0.97 KiB.

## 4. Censuses

- **Radix's popover:** `rg -n "@radix-ui/react-popover" src scripts` finds `src/components/ui/popover-impl.tsx:4` and the weight guard's list (`check-marketplace-imports.mjs:61`). There are no others.
- **The popover facade's consumers:** `rg -n 'from "@/components/ui/popover"' src` finds `toolbar-panel.tsx:3` (and the facade's own test).
- **`PopoverAnchor`:** `rg -n PopoverAnchor src scripts e2e` finds none.
- **`dialog-primitive` importers** (`rg -ln` without tests): `dialog.tsx` and `sheet.tsx` (the primitives), and `app-rail.tsx`. Its `<DialogPrimitive.Root … modal={false}>` at :1129 is non-modal, so DG-1 skips it (ruling 9).
- **`visible-area.ts` readers:** `searchable-picker.tsx:6`, `dropdown-menu-impl.tsx:19` and `popover-impl.tsx:8`.
- **`step-up-dialog` importers:** only `step-up-gate.tsx` (a type import, :5, and the on-demand `import()`, :17).
- **`as unknown as` in the touched folders** (`src/components/ui`, `toolbar-panel.tsx`, `src/features/auth/mfa`): only `mfa-service.ts:66` (section 6).
- **`StepUpGate` mounts:** the 19 page files named in stop 1; none changed.
- **NoticeOutlet:** CF-NO-1 reads 3 modal contents (dialog, sheet, alert dialog), floor 3 (ruling 2).

## 5. Tests

- **New test ids**, each checked free before use; TI-1 passes in the laws:
  - OVF-23, OVF-24, OVF-25, OVF-26 (`popover.test.tsx`);
  - SUG-2, SUG-3 (`step-up-gate-offline.test.tsx`);
  - CF-OV-6 (`overlays.test.ts`), DG-7 (`dialogs.test.ts`), VA-4 (`visible-area.test.ts`);
  - MF-8 (`e2e/mfa-stepup.spec.ts`), DLG-E4+OVE-4 (`e2e/overlays.spec.ts`).
- **Re-pointed, old → new:**
  - **HS-16 (`toolbar-panel.test.tsx`).** Before: "a modal bottom sheet with a named close; a wide one a popover". Now it also asserts:
    - on phones: `data-dialog-panel`, the grabber, the scrim, and the footer's `flex-row shadow-rule-top`;
    - from md: the trigger's `aria-haspopup="dialog"`, `data-dialog-panel`, no grabber and no scrim.

    Escape, Done and the named close are asserted as before.
  - **CL-U7:** the facade's line is now `inside("DropdownMenuIcon", (m) => m.DropdownMenuIcon)`.
  - **CF-OV-1:** the title names the popover.
  - **CF-OV-3:** gains the popover's exports.
  - **CF-LIST-1's owner test:** `popover-impl.tsx`.
  - **CF-AREA-1's reader set:** `popover-impl.tsx`.
  - **CF-NO-1's floor:** 4 → 3.

  No assertion was loosened. HS-24 is unchanged.
- **Red-first for DLG-E4+OVE-4.**
  - Its first form read the live document's preload links. The page's own idle download writes those, so it failed on the tree (both projects, in THE BROWSER CHECK).
  - The second form read the server's HTML. It could not fail on the base: there Radix's popover arrived with the route's own chunk, which the HTML does not name.
  - The final form (7ac4819c2) reads every script fetched before the load event. None may be the overlay chunk, and none may carry the string `PopoverPortal`, a name only Radix's popover carries (`rg PopoverPortal src` finds none).
  - With the base's `popover.tsx` and `toolbar-panel.tsx` written into the tree, it failed on both projects with `[".../assets/dist-CZI16R-k.js"]`, the Radix popover chunk fetched before load. Both files were then restored from HEAD; `git status` then showed only the spec's own change.
  - On the tree it passes on both projects.
- **MF-8** can fail on the base: there is no `step-up-dialog` chunk to fetch after the press.
- **Unit totals** (THE CHECKS on 7ac4819c2):
  - component tests: Test Files 1 failed | 411 passed (412); Tests 1 failed | 2512 passed (2513);
  - the scripts laws: Test Files 1 failed | 81 passed (82); Tests 1 failed | 410 passed (411).

  The one failure in each is NH-6, the macOS time-zone case (Limits).
- **`bun run typecheck`:** 0 errors on 7ac4819c2.
- **`bun run lint`:** 0 errors, 46 warnings, the same total as S6-2's end.
- **THE CHECKS** (`bun run checks` on 7ac4819c2):
  - fast line: `checks (fast): 17 PASS · 4 FAIL · 233s`;
  - last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 284s`.

  The FAILs:
  - laws-first and component-tests fail on NH-6 only;
  - actionlint and gitleaks fail because the runner downloads Linux x64 binaries, which do not run on this Mac.

  Run by hand behind the actionlint FAIL, all OK:
  - `bun run format:check`;
  - `bun run lint` (above);
  - `scripts/e2e-select.ts --self-test`;
  - `check-root-routes` (self-test: 12 allowed, 5 refused; 59 entries);
  - the build and the bundle check ("Bundle budget OK"; THE CHECKS' own run: "0 NEAR, none grew").

  NOT RUN because an earlier step failed:
  - the changed folders' unit tests (the component tests cover them);
  - Semgrep on changed files (the whole Semgrep scan passed);
  - the build-and-check steps behind actionlint: typecheck, format, lint, the e2e-select self-test, root route names, build and bundle report (each run by hand, above).

  NOT RUN by design:
  - the installs (dependencies are present);
  - the dependency audit (its service is unreachable);
  - the e2e preflight (staging credentials);
  - the e2e merge and Verdict, and promote;
  - the SARIF upload and its warning.
- **THE BROWSER CHECK.** `bun run e2e:local -- <30 specs> --retries=0`, against ethio-staging, both projects, built from 759055f69's source.
  - The specs:
    - the two changed: `overlays`, `mfa-stepup`;
    - the 18 that open a toolbar panel (the G38 list; `rg` over `-filters`, `-columns`, `-panel` test ids and the panel helpers in `e2e/helpers/{categories,countries,locations}.ts`): `admin-ai-calls`, `admin-attributes-library`, `admin-audit`, `admin-categories-console`, `admin-categories-images`, `admin-countries`, `admin-coverage`, `admin-listings`, `admin-locations`, `admin-roles`, `admin-screening`, `admin-translations-console`, `admin-translations-data`, `admin-translations-governance`, `admin-users`, `house-style`, `my-listings-page`, `shell`;
    - the plan's two: `overlay-shift`, `choice-lists`;
    - the eight other specs that reach the step-up gate (`rg step-up-modal|stepUpIfPrompted`): `admin-attributes-editor`, `admin-attributes-links`, `admin-attributes-safety`, `admin-categories-home`, `admin-categories-lifecycle`, `auth-caller-gates`, `i18n-sign-in-language`, `name-check-queue`.
  - The result: **819 passed, 22 failed, 141 skipped** (1.1 h). The 22:
    - **DLG-E4+OVE-4, both projects** (2): this turn's own test in its first form, fixed (above).
    - **The Control+A specs on macOS, both projects** (12): AL-20, AL-23, AL-30, SC-25, SC-26 and MLP-6. Each typed its text after the old value instead of replacing it ("Corrected e2e-screen-local-…e2e-screen-local-…"); MLP-6 stops at its search clear (`my-listings-page.spec.ts:664`), before its Filters part. S6-1's ruling 3 named this class.
    - **The language switch never takes** (`<html lang>` stays `en`), AT-12's symptom (5): AT-12 both projects, RP-8 both projects, and "footer never covers the rail's Sign out" (desktop-1280, in `switchLanguage`).
    - **HM-2 and HM-3, mobile-360** (2): the language provider's race named in S6-1's ruling 3.
    - **TR-30, desktop-1280 only** (`@global-state`) (1): it timed out at 240 s mid-write. The progress line read "2465 of 2963" and the button "Generating…". The gate let the action run, and the writes from this machine to ethio-staging are slower than CI's (the nightly ran it in 83.1 s).
  - MF-3 and MF-8 passed on both projects; HS-tests and every Filters/Columns test outside those named passed.
  - **Re-run on the fixed spec:** `bun run e2e:local -- e2e/overlays.spec.ts --retries=0` on 7ac4819c2's source: **7 passed, 1 skipped** (OVE-3 is phone-only).
  - The review commit 82ae09af3, which removed an unused export, came after the long run's build. It changes no behaviour.
- **[ssr-error]:** 4 lines, all `/api/admin/categories/import` (the specs' planted bad files).
- **The J-audit** (`e2e/**` changed):
  - MF-8 makes its own scratch users (J1, J3);
  - DLG-E4+OVE-4 reads only and signs in the pooled job super admin (J9);
  - no `.first()`, `waitForTimeout` or `test.only`;
  - the one explicit wait (15 s on `step-up-no-factor`) matches MF-3's.

## 6. K2 — siblings that bypass the mechanism

| Where | What | Left because |
|---|---|---|
| `src/components/shell/filter-chips.tsx:121` (Clear all), `src/components/shell/columns-button.tsx:75` (Show all) | the footer's link buttons carry their own height and colour classes in the shared footer row | ruling 5: out of scope, named |
| `src/components/shell/app-rail.tsx:1129` | the phone menu draws `DialogPrimitive.Root modal={false}` with its own content | plan ruling 9: non-modal content; DG-1 skips it |
| `src/features/auth/mfa/mfa-service.ts:66` | `window as unknown as { __ethioStepUp?: … }`, a window hook | out of scope (S6-2's K2 lists the window hooks) |

Greps run for this concern:
- hand-drawn sheets outside the primitives (`fixed inset-x-0 bottom-0` outside `components/ui`): only the bottom bar (`bottom-bar.tsx:109`), which is not a sheet;
- Radix popover or dialog packages outside the impls: none;
- popover consumers: only the toolbar panel.

The S6-1 K2 line for S6-4 (the three hand-drawn surfaces skipping NoticeOutlet) stands unchanged.

## 7. Allowlists and guards

- **`scripts/conformance/choice-lists-allowlist.txt`:** 3 lines → 2 (header plus one entry). `toolbar-panel.tsx#PopoverContent` is removed; `location-selector.tsx#DropdownMenuContent` (permanent) remains.
- **`scripts/conformance/holds-its-box-allowlist.txt`:** 12 lines → 13. The new line:
  - `src/features/auth/mfa/step-up-gate.tsx#StepUpDialog | the step-up dialog draws in a portal on the top layer, out of the page's flow (turn S6-3): while it downloads, or when it cannot, the page has no box of it to keep | 2027-05-01`

  It follows the `MapLarge` dialog's line.
- **`non-null-allowlist.txt`:** unchanged. No `!` was added (CF-NN-1 passes).
- **Guards changed and their self-tests:**
  - CF-OV-1 (watched list and `MAY_REACH`), planted by CF-OV-6;
  - CF-OV-3 (the popover's exports);
  - CF-DIALOG-1 DG-1, planted by DG-7: a namespace part and `PopoverContent` with a look fail; a `modal={false}` subtree, `variant` and the popover's own files pass;
  - CF-LIST-1's owner (`popover-impl.tsx`);
  - CF-AREA-1's reader set, planted by VA-4;
  - CF-NO-1's floor (3);
  - the weight guard's FORBIDDEN list.

  All are already wired (`wired.test.ts` unchanged and passing).

## 8. Strings

None. No key was added or changed. `bun run i18n:usage` reports 1781 keys across 632 files; the maps changed only in their scanned-file count (630 → 632, the two new source files).

## 9. Migrations

None.

## 10. Departures

- **Stop 1 (the census)** and ruling 1, items 1–5, all followed:
  - `visible-area.test.ts` with `popover-impl.tsx` as its reader;
  - `notice-outlet.test.ts`'s floor 4 → 3, with its reason;
  - `step-up-dialog.tsx` through `resilientLazy`, a failed download ending as unavailable;
  - the popover on CF-OV-1's watched list, with DLG-E4+OVE-4 in `overlays.spec.ts` and the step-up test beside MF-3;
  - the footer's one row on phones.
- **`holds-its-box-allowlist.txt` gains a line.** HB-1 refuses a `resilientLazy` component without a box to hold. The step-up dialog draws in a portal, so there is none to hold. This is the ruling's "standing" clause: a guard whose list a move changes.
- **Ceilings beyond the nine.**
  - Item 5 names the nine F4b pages. Sixteen pages came down, because the ratchet fails any page 8 KiB or more under its ceiling: Radix's popover left every toolbar page.
  - Four pages and the entry rose (section 3). Each line carries its cause.
  - The F4b page `/admin/listings_/$listingId_/edit` stays at 410, the ceiling its size gives.
- **The step-up split's cost.** The bundler's preload list for the dialog's import (0.8 KiB) rides the gate's chunk:
  - a page that keeps its own dialogs pays about +0.4 KiB net, and `/admin/listings_/$listingId` crossed its ceiling;
  - a page whose only dialog was the gate's saves 0.6–1.1 KiB.

  The brief asked for the dialog on demand; the cost is named, not avoided.
- **Behaviour beyond the items, from the mandated primitives:**
  - the phone panel's close sits after the content, so the first focus is the panel's first control (MINOR);
  - the closed popover trigger has no `aria-controls` until the real trigger draws (MINOR);
  - the dialog appears once its chunk is here (item 3's purpose).
- **DLG-E4+OVE-4 changed form twice after THE BROWSER CHECK** (section 5). Its final form was proven red on the base's files and green on the tree.

## 11. CI

- **The base's CI**, two-step check: the commit line names `cc77e93e39cf160b7f2a9de579d97326a1d96b56`, and `origin/dev` is cc77e93e. Read from ci-evidence commit 6fc564582:

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `cc77e93e39cf160b7f2a9de579d97326a1d96b56` (short `cc77e93`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-01T05:29:10Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41275709062
  ```

- **The latest ci-status** names 60e8a3c (this pull request's stop-1 commit): SUCCESS, run 41276887107.
- **Earlier reds fixed:** none; the base was green.
- **This pull request's runs on the final code:** none yet at the time of this report. It is updated in the same commit as any fix.

## 12. Limits

- **NH-6** (`scripts/ci/nightly-hour.test.ts`) fails on macOS, whose C library ignores TZDIR. CI on Linux is its proof.
- **actionlint and gitleaks** cannot run here: the runner fetches Linux x64 binaries. CI judges both.
- **Specs that cannot be proven locally:**
  - the Control+A specs (AL-20, AL-23, AL-30, SC-25, SC-26, MLP-6). MLP-6's Filters part is not reached locally;
  - the language-switch specs (AT-12, RP-8, the rail's Sign out);
  - HM-2 and HM-3;
  - TR-30 (the write rate from this machine).

  CI's lanes are their proof.
- **The local browser check** ran with `PLAYWRIGHT_BROWSERS_PATH` pointed at the installed Playwright browsers (`~/Library/Caches/ms-playwright`). The sandbox's default path held none; nothing was installed.
- **Rendered look:** checked by unit tests and structure only. The phone sheet and the md panel at 360, 768, 1024 and 1280 px are for the operator's walk.
