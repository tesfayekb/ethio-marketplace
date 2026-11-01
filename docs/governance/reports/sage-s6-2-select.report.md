# Task: sage-s6-2-select. Base: dev a0461df3. — report

Base: a0461df3 · Final commit: 8f87ec830 · Brief: docs/governance/briefs/sage-s6-2-select.md (no sha256 given)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 8f87ec8

CI on the base: a0461df3, **SUCCESS** (run 41264908090); `origin/dev` is still a0461df3.

## 1. Done / not done, by part and step

Every part is done.

- **Stop 1 (the census) and its ruling.**
  - The stop is `docs/governance/reports/sage-s6-2-select.stop-1.md`.
  - The ruling is saved as `docs/governance/briefs/sage-s6-2-select.ruling-1.md`.
- **Part A, commit 1e6f9f502.** NativeSelect takes `look`.
  - `control` is the default: 44 px, 36 px on a fine pointer from md, the card surface, pressed in inside a panel through `DIALOG_FIELD`.
  - `form` adds nothing of its own, so the posting step's class is drawn whole (ruling 4).
  - Tests NSL-U1 and NSL-U2.
- **Part B, commit 8ee0e4578.**
  - The 31 admin selects in 16 files moved onto `look="control"`.
  - SELECT_CLASS is retired (its definition and its re-export).
  - The 16 admin CF-LIST-1 lines are gone.
  - New tests AID-7, CNF-1 and LVD-1.
- **Part C, commit 8f549e0b7.**
  - The 11 posting selects in 4 steps moved onto `look="form"`, each keeping today's class and refusal state (ruling 1).
  - The 4 posting allowlist lines are gone.
  - Each step with a select has a refusal test: SWR-1 (step-where), SWO-1 (step-who), SSP-1 (step-specifications) and SPR-1 (step-pricing, in its new test file).
- **Part D, commit d13dc0d95.**
  - CF-LIST-1 refuses a `<select>` outside `src/components/ui/native-select.tsx`, planted as CL-11.
  - NativeSelect's own allowlist line is gone, making 21 removed in the turn.
- **Part E, commit f66a6f758.**
  - The `as unknown as` in `category-dialogs.tsx` is gone. The dialog sends a plain `null` target.
  - `retireCategory` and `useRetireCategory` take `reassignTo: string | null`. The rpc arguments are passed `as never`, with the reason inline, as `report.ts:30` does (ruling 2).
  - New tests CDR-2 and CDR-3.
- **Part F, commit 55956224d.**
  - Docs: design-foundation's "One select (turn S6-2)" section, register row 87 (CF-LIST-1; the brief calls it row 84, see section 10), one changelog line, one roadmap line.
  - i18n maps: no key moved; `bun run i18n:usage` left both maps byte-identical, and THE CHECKS' drift step passed.
- **Growth, commit 8f87ec830.** Nine page ceilings were raised by DEC-296's form, each with its cause on its line (section 3).
- **THE CHECKS, THE BROWSER CHECK and THE SELF-REVIEW** were run on 8f87ec830 (section 5).

## 2. Files changed

`git diff --name-only a0461df3` (this report added by its own commit):

```
docs/_changelog.md
docs/features/design-foundation.md
docs/governance/briefs/sage-s6-2-select.md
docs/governance/briefs/sage-s6-2-select.ruling-1.md
docs/governance/mechanisms.md
docs/governance/reports/sage-s6-2-select.report.md
docs/governance/reports/sage-s6-2-select.stop-1.md
roadmap.md
scripts/conformance/choice-lists-allowlist.txt
scripts/conformance/choice-lists.test.ts
scripts/route-budgets.mjs
src/components/ui/native-select.test.tsx
src/components/ui/native-select.tsx
src/features/admin-ai/ai-spend-days.test.tsx
src/features/admin-ai/ai-spend-days.tsx
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-attributes/category-attributes-dialog.tsx
src/features/admin-attributes/components/attribute-allowed-values.tsx
src/features/admin-attributes/components/attribute-link-cells.tsx
src/features/admin-attributes/components/attribute-option-row.tsx
src/features/admin-attributes/components/attribute-option-rows.tsx
src/features/admin-attributes/components/attribute-v2-fields.tsx
src/features/admin-categories/categories-service.ts
src/features/admin-categories/category-dialogs.test.tsx
src/features/admin-categories/category-dialogs.tsx
src/features/admin-categories/category-form-fields.tsx
src/features/admin-categories/use-categories.ts
src/features/admin-countries/country-dialogs.test.tsx
src/features/admin-countries/country-dialogs.tsx
src/features/admin-locations/location-dialogs.tsx
src/features/admin-locations/location-verb-dialogs.test.tsx
src/features/admin-locations/location-verb-dialogs.tsx
src/features/admin/legal/legal-page.tsx
src/features/admin/legal/legal-version-view.tsx
src/features/admin/users/user-detail.tsx
src/features/posting/step-pricing.test.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-specifications-last-answer.test.tsx
src/features/posting/step-specifications.tsx
src/features/posting/step-where.test.tsx
src/features/posting/step-where.tsx
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
```

- **New files:** `native-select.test.tsx`, `step-pricing.test.tsx`, the ruling, the stop and this report. Each is in `git ls-files` on the final commit.
- **Deleted files:** none.
- **Scope:**
  - `categories-service.ts` and `use-categories.ts` joined the scope by ruling 2.
  - `scripts/route-budgets.mjs` is the brief's Growth step ("DEC-296's form for any ceiling crossed and its cause written on its line"), listed under Departures.
  - `field.tsx` is untouched.
  - No `e2e/**` file changed.

## 3. Behaviour contract — before → after

| What | Base a0461df3 | Now |
|---|---|---|
| The 25 SELECT_CLASS selects (11 files) | `h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground`; no panel look | NativeSelect control look + `w-full`: 44 px, 36 px on a fine pointer from md, `bg-card`, `shadow-xs`, focus ring; pressed in (`DIALOG_FIELD`) inside a dialog, sheet or filter panel |
| `location-move-parent` | `min-h-11 w-full … bg-background px-3 text-sm` | control look + `w-full` |
| `legal-add-country-select` | `min-h-11 min-w-0 grow … bg-background px-3` | control look + `grow` |
| `assign-role-select` | `mt-1 h-11 w-full … text-sm` | control look + `mt-1 w-full` |
| `edit-country` | `h-11 w-full … text-sm` | control look + `w-full` |
| `ai-days-feature` | `h-11 min-w-0 max-w-full … text-sm` | control look + `max-w-full` |
| `legal-translation-language` | `min-h-11 w-full … text-base` (16 px) | control look + `w-full` (`text-sm`, 14 px; a MINOR finding) |
| The 11 posting selects | `<select className={controlClass(…) / fieldClass / own}>` | `<NativeSelect look="form" className={the same}>`: the same element and the same class string (NSL-U2 and the four step tests). Every value, option, `aria-invalid`, `disabled` and handler is unchanged |
| `retireCategory(input)` | `reassignTo: string`; the dialog passed `null as unknown as string` | `reassignTo: string \| null`; the dialog passes `null`. The same rpc and the same arguments on the wire (`p_reassign_to: null`) |
| Words, keys, routes, doors | — | unchanged; no string added or changed |

Page ceilings (`scripts/route-budgets.mjs`). Each was within the 0.3 KiB band on the tree, so each rose by one under `ceilingForLocal`:

| Page | Ceiling | Size, base → tree (local KiB) | Cause written on its line |
|---|---|---|---|
| `/admin/attributes` | 355 → 356 | 354.3 → 354.6 | NativeSelect's own chunk draws the page's selects |
| `/admin/categories` | 363 → 364 | 362.3 → 362.6 | the same |
| `/admin/legal` | 284 → 285 | 283.3 → 283.7 | the same |
| `/admin/legal_/$versionId` | 283 → 284 | 282.3 → 282.8 | the same |
| `/admin/coverage` | 337 → 338 | 336.6 → 336.9 | through `category-dialogs` (CategoryModal) |
| `/admin/listings` | 361 → 362 | 360.4 → 360.7 | through `category-dialogs` and DataTable's page-size picker |
| `/admin/listings_/$listingId_/edit` | 409 → 410 | 408.2 → 408.7 | the posting wizard's 11 selects |
| `/admin/impersonation_/$sessionId` | 316 → 317 | 315.3 → 315.6 | DataTable's page-size picker, now in a chunk of its own |
| `/dev/primitives` | 229 → 230 | 228.5 → 228.8 | the same |

Every page was measured on the base (a0461df3's build) and on the tree. The other 41 pages each moved +0.0 to +0.5 KiB and none is inside the band; `check-bundle-size` reports "Bundle budget OK".

- **The new chunk:** `native-select-*.js` is 449 bytes gzipped.
- **The public pages** (`/`, `/c/$slug`, `/l/$slug`, `/privacy`, `/terms`) moved +0.0 to +0.1 KiB. The only cause is the entry's `__vite__mapDeps` list, which now names the new chunk.
- **Which imports list the chunk** (checked in the built entry): only the admin, my-listings and post route components. No public route's code changed.
- **CI's reading:** CI reads about 0.1 KiB above local, which the check's local allowance already covers.

## 4. Censuses

- **The selects:**
  - `rg -n "<select\b" src -g '!**/*.test.*'` finds only `src/components/ui/native-select.tsx:27`. The other two hits are text: the file's doc comment at line 7, and a JSON shape in a comment at `attributes-service.ts:58`.
  - At the base there were 42 selects in the 20 consumer files: 25 SELECT_CLASS selects plus 6 hand-drawn admin selects (31 admin), and 11 posting selects.
- **SELECT_CLASS:** `rg -n "SELECT_CLASS" src scripts e2e` finds only cause text in `scripts/route-budgets.mjs`, with no code use.
- **The allowlist:** `choice-lists-allowlist.txt` holds 2 lines, down from 23 at the base.
- **The census:** CF-LIST-1's tree scan passes with no select finding.
- **The NativeSelect importers** (`rg -l native-select src`) are the 20 consumers, plus `data-table.tsx`, `locations-toolbar.tsx`, `attributes-page.tsx` and `categories-page.tsx`. Those four already used it at the base.
- **The where-step boxes** (`rg -n "<NativeSelect" step-where.tsx`) are at lines 422, 502, 536, 588, 690 and 1522.

## 5. Tests

- **New test ids**, each checked free with `rg` before use, with TI-1 passing in the laws:
  - NSL-U1, NSL-U2 (`native-select.test.tsx`);
  - AID-7 (`ai-spend-days.test.tsx`);
  - CNF-1 (`country-dialogs.test.tsx`);
  - LVD-1 (`location-verb-dialogs.test.tsx`);
  - SWR-1 (`step-where.test.tsx`);
  - SWO-1 (`step-who.test.tsx`);
  - SSP-1 (`step-specifications-last-answer.test.tsx`);
  - SPR-1 (`step-pricing.test.tsx`, new file);
  - CL-11 (`choice-lists.test.ts`);
  - CDR-2 and CDR-3 (`category-dialogs.test.tsx`).

  No existing assertion was changed or loosened. CDR-1 is the same text, placed under the file's new mocks.
- **Proof that the posting tests can fail:**
  - With NativeSelect's `form` look temporarily set to the control look (uncommitted, then restored), SWR-1, SWO-1, SSP-1 and SPR-1 all failed (4 failed, 22 passed in those files).
  - With the real look, all four pass.
- **CL-11:** a planted `<select>` in `src/x.tsx` fails; NativeSelect's own `<select>` and a `<NativeSelect>` consumer pass. CF-LIST-1 runs 13 tests, all passing.
- **CDR-3** proves the call: with no listings, the submit sends `{ id: "cat-a", reassignTo: null }`.
- **`bun run typecheck`:** 0 errors on 8f87ec830.
- **`bun run lint`:** 0 errors, 46 warnings, the same total as S6-1's end.
- **Unit totals**, from THE CHECKS' logs on 8f87ec830:
  - component tests: Test Files 1 failed | 409 passed (410); Tests 1 failed | 2503 passed (2504);
  - the scripts laws: Test Files 1 failed | 81 passed (82); Tests 1 failed | 407 passed (408).

  The one failure in each is NH-6, the macOS time-zone case (Limits). Separately, `src/features/posting` ran 67 files and 471 tests and `src/features/admin-categories` 3 files and 14 tests, all passing.
- **THE CHECKS** (`bun run checks` on 8f87ec830):
  - fast line: `checks (fast): 17 PASS · 4 FAIL · 234s`;
  - last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 292s`.

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
- **THE BROWSER CHECK.** `bun run e2e:local -- <the 26 G38 specs> --retries=0`, against ethio-staging, both projects, on 8f87ec830. The specs:
  - `admin-attributes-editor`, `admin-attributes-import`, `admin-attributes-library`, `admin-attributes-links`, `admin-attributes-safety`;
  - `admin-categories-console`, `admin-categories-lifecycle`, `admin-countries`, `admin-listings`, `admin-locations`, `admin-services`, `admin-users`;
  - `post-wizard-bundle2`, `post-wizard-category`, `post-wizard-details`, `post-wizard-finder`, `post-wizard-place`, `post-wizard-pricing`, `post-wizard-resets`, `post-wizard-specs`, `post-wizard-units`, `post-wizard-where`;
  - `choice-lists`, `import-security`, `legal-admin`, `my-listings-ad`.

  The result: **917 passed, 12 failed, 69 skipped** (1.3 h). The 12 failures:
  - **8 from Control+A on macOS** (AL-20, AL-23, AL-30, MLA-13, both projects). The text was typed after the old value instead of replacing it ("Corrected listing …E2E admin listing …", `90100`). These are the same specs S6-1 named.
  - **AT-12, both projects.** `<html lang>` stays `en`; it fails on the base locally (S6-1).
  - **PW-140, mobile-360 only.** The title edit is typed after `End`, which on macOS Chromium ends the wrapped visual line at 360 px ("e2e_… owncjo08 narrow"). It fails the same way at 360 px on the base's src. It passed on desktop-1280.
  - **PW-155, mobile-360 only.** The Amharic pick on the home page never takes (`<html lang>` stays `en`), AT-12's symptom. It passed on desktop-1280. At 360 px over separate runs:
    - the tree passed 3 of 7 (1 of 3, then 2 of 3);
    - the base's src passed 9 of 10 (1 of 1, 3 of 3, 5 of 6), failing once the same way.

    The switch happens on "/", which this turn does not change (above). CI is its proof.
- **[ssr-error]:** 62 lines, all from the import routes, the specs' planted bad files: `/api/admin/locations/import` 20, `/api/admin/attributes/import` 16, `/api/admin/categories/import` 14, `/api/admin/translations/import` 12.
- **The J-audit:** no `e2e/**` file changed, so it does not apply.

## 6. K2 — siblings that bypass the mechanism

| Where | What | Left because |
|---|---|---|
| `src/features/posting/step-where.tsx:422, 502, 536, 588, 690, 1522` (the region, city, two sub-city, row-market and market boxes) | no `aria-invalid` and no `aria-describedby` on a refused select. Field's message has no id to point at | ruling 1: filed for the form-kit turn |
| `src/features/posting/step-pricing.tsx` (`post-price-period`), `step-specifications.tsx` | the same gap: no `aria-invalid` or `aria-describedby` | ruling 1, form-kit turn |
| `src/features/admin-categories/categories-service.ts:181` | `as never` on the rpc arguments, because the generated uuid type omits SQL NULL. The other three such casts are at `src/features/ad-page/report.ts:30`, `src/features/ad-page/contact.ts:39` and `src/routes/api/seller.ts:53` | ruling 2: the typed shape is the real fix, not this turn's |
| `src/features/posting/step-where.tsx:151`, `step-who.tsx:86`, `src/routes/auth.tsx:80`, `auth_.reset.tsx:44`, `settings.tsx:83` | the five local `fieldClass` constants beside the form kit's `fieldControlClass` (`field.tsx:119`) | the form-kit turn (S6-1 ruling) |
| `src/features/admin-categories/category-images-service.ts:159` | `p_generation_prompt: null as unknown as string`, the same NULL-through-the-generated-type cast this turn removed from the retire dialog | out of scope |
| `as unknown as` elsewhere in src (`rg -n "as unknown as" src -g '!**/*.test.*' -g '!src/integrations/**'`, 55 lines) | the same NULL cast in `attributes-service.ts:300, 303, 436, 463–465, 468`, `locations-service.ts:97–100`, `user-client.ts:318`, `admin/categories/export.ts:36`, `listings/draft.ts:124`. Row casts in `use-screening.ts`, `legal-reader.ts`, `legal-service.ts`, `save.ts`, `ad-page.ts`, `ad-photo.ts`, `own-listing.ts`, `roles-service.ts`. Window hooks in `app-shell.tsx`, `session-policy.ts`, `mfa-service.ts`, `i18n/provider.tsx`. `dropdown-menu.tsx:55` (S6-3) | out of scope; `dropdown-menu.tsx` is S6-3's |

The S6-1 K2 lines (the three hand-drawn surfaces skipping NoticeOutlet for S6-4, and the toolbar panel for S6-3) stand unchanged.

## 7. Allowlists and guards

- **`scripts/conformance/choice-lists-allowlist.txt`:** 23 lines → 2, so 21 removed:
  - the 16 admin `#select` lines (part B);
  - the 4 posting `#select` lines (part C);
  - `native-select.tsx#select` (part D).

  What remains: `location-selector.tsx#DropdownMenuContent` (permanent) and `toolbar-panel.tsx#PopoverContent` (until SAGE-S6, for S6-3). No line was added.
- **The guard:** CF-LIST-1 gains the select rule, with `SELECT_OWNER` exported. It was proven on a planted bypass (CL-11), and CF-LIST-1 was already named in `wired.test.ts`. CL-1…11 and the tree scan were run.
- **`non-null-allowlist.txt`:** unchanged. A `!` written in SWR-1 was replaced by a narrowing before the commit; CF-NN-1 passes.

## 8. Strings

None. No key was added or changed. `bun run i18n:usage` reports 1781 keys across 630 files, and both maps are unchanged.

## 9. Migrations

None.

## 10. Departures

- **Stop 1 (the census)** and ruling 1, items 1–4, all followed:
  - refusal states kept as today, one test per step;
  - `categories-service.ts` and `use-categories.ts` in scope, with `as never`;
  - the 7 existing test files gain a case each, and step-pricing gets its own file;
  - `look="form"`, both looks named in the register row.
- **"Row 84's note."** The register's CF-LIST-1 row was the duplicate 84 that S6-1 renumbered to 87 (S6-1 ruling: "the second becomes 87"). Row 84 today is the CI backend's migrations row, so the note went on row 87. Row 84 is unchanged.
- **`scripts/route-budgets.mjs`.** This file is not in SCOPE's list. It is the brief's Growth step, with nine lines changed by DEC-296's form (section 3).
- **The 7 existing test files.** Ruling 3 said they gain a case each. Six of the seven did:
  - `ai-spend-days`, `country-dialogs`, `location-verb-dialogs`, `step-where`, `step-who` and `step-specifications-last-answer` got one each;
  - `category-dialogs` got two (CDR-2 for the select, CDR-3 for the cast), because part E's cast is proven in the same file.

## 11. CI

- **The base's CI**, read at the start of the turn (stop 1), two-step check: the commit line names `a0461df3fc677ecb0b92233360fa4b7ca5add3db`, and `origin/dev` is a0461df3.

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `a0461df3fc677ecb0b92233360fa4b7ca5add3db` (short `a0461df`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-01T02:43:29Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41264908090
  ```

- **Earlier reds fixed:** none; the base was green.
- **This pull request's runs:** none yet at the time of this report. It is updated in the same commit as any fix.

## 12. Limits

- **NH-6** (`scripts/ci/nightly-hour.test.ts`) fails on macOS, whose C library ignores TZDIR. CI on Linux is its proof.
- **actionlint and gitleaks** cannot run here: the runner fetches Linux x64 binaries. CI judges both.
- **Specs that cannot be proven locally:**
  - the Control+A specs (AL-20, AL-23, AL-30, MLA-13);
  - AT-12;
  - PW-140 at 360 px (the End key);
  - PW-155 at 360 px (the language pick, flaky on the base too).

  CI's lanes are their proof.
- **The local browser check** ran with `PLAYWRIGHT_BROWSERS_PATH` pointed at the installed Playwright browsers (`~/Library/Caches/ms-playwright`). The sandbox's default path held none; nothing was installed.
- **Rendered look:** checked by unit tests and structure only. The look at 360, 768, 1024 and 1280 px is for the operator's walk.
