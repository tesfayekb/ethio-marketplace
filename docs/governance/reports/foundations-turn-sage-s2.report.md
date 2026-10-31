# Report — SAGE-S2, S2-2 and S2-3

## 1. CI first

`398a5859` — FAILURE, run 41148548211, completed 2026-10-31 00:28:46 UTC. Its only failing job was the first-paint page budget; all E2E lanes passed, with 0 flaky results. The failure body was read from immutable ci-evidence commit `5ecd19b30baadff8b179234a7da7aa988606bbf6`. Twelve page ceilings are corrected below from CI's actual sizes, using DEC-296. No feature code changes were made in S2-3.

- `d0b6a4ad`: FAILURE, CI run 41138429380. Three admin-shell A-5/A-6 failures expected the retired `bg-nav-active` menu look. INC-1022: assertions now read ITEM_ACTIVE, the actual shared menu mechanism. Phone-frame was not a remaining failure in that evidence. Both admin lanes and phone-frame lanes passed on 398a5859.
- `536dc66d`: FAILURE, run 41142103894; 2,483 passed, 283 skipped, 2 failed, 0 flaky. Both failures were L4b's long-location-name label-clearance assertion. INC-1024 was fixed in S2-2, without changing its expectation; the later CI E2E run passes.
- `398a5859`: E2E green, page-budget red. This turn changes only the ceilings named by that failure, the ruling/roadmap and this report. CI on the resulting platform commit remains the final judge.

## 2. Step 0

Exact inner fenced-block bytes, including final newline, were independently hashed:

| Ruling | SHA256 |
| --- | --- |
| S2 | `15d18276f02e8ce1341e110121226ab7daa04a1c2d8fb0f0ebaebd9f8292ffbe` |
| S2-2 | `255068960c302b16eec49613d21b26dcb991402352195b6ee94285c4a3621c61` |
| S2-3 | `4138a43f96b1173ed5d189b803be1ed50a35bf504d940e13a48a4b742ed2baa4` |

Roadmap line 3 names all three. `bunx prettier --check roadmap.md` passed.

## 3. Census as built

BAND_ROW remains `h-10 min-h-10 max-h-10 shrink-0`: 40 px, unchanged. BAND_LOOK is the only look source in `src/components/shell/band-row.ts:10`: row `bg-band text-band-label shadow-groove`; stack `bg-band band-drop`; heading 12 px, bold, uppercase, 1.2 px tracking, band-label.

| Consumer | Before S2 | After |
| --- | --- | --- |
| panel-tabs.tsx:43 | independent row surface and old current tint | BAND_ROW + BAND_LOOK.row; CURRENT_PILL for current tab |
| panel-header.tsx:31,46,63 | sidebar-accent/header-specific label | BAND_LOOK.row and BAND_LOOK.heading, including compact header; switch unchanged |
| app-shell.tsx:1080 | sub-band background, own hairline/drop | BAND_LOOK.stack; D261 transfers only its drop |
| app-shell.tsx:1087 | breadcrumb own border/surface | BAND_ROW + BAND_LOOK.row |
| location-selector.tsx:239 | bg-card shadow-bar | BAND_ROW + BAND_LOOK.row |
| location-selector.tsx:275 | separate unframed picker buttons | one 34 px track, 3 px padding, 16 px decorative primary pin |

Segments are 28 px, phone/desktop padding 5/10 px, text 12/13 px, 13 px muted chevron. Only the deepest selected level uses card, lift-segment, nav-ink and weight 600; unset levels are transparent, foreground, weight 500. Menus, failure/loading copy, PlaceNotice, heights and translations are unchanged.

## 4. Conformance

CF-BAND-1's existing height cases remain unchanged. `bandLookFindings` at shell-bands.test.ts:92 checks the same consumer census for BAND_LOOK and refuses local background, border or shadow. Its planted cases at :237 cover bg-card, border-b/border-neutral-soft, shadow-bar, a local BAND interpolation, a missing shared look and a second BAND_LOOK definition. The added D261/current-pill census proves one IntersectionObserver and one pill source. These cases passed in the full 2,352-test suite.

## 5. Proofs and D261

SGB-1/2 cover 360, 390, 834 and 1440 px in light/dark; SGB-3 covers 360 px English/Amharic, light/dark, a scratch deepest four-level chain selected through the real menus. Prior S2 execution recorded 40 px rows, four 28 px segments, one line per segment and zero row/track overflow. S2-2's corrected whole sage-bands run was 36 passed, 36 skipped, 0 failed; the skipped counterpart uses the other pointer project. Current CI's E2E lanes all passed, including the Sage cases.

D261 uses one IntersectionObserver (`app-shell.tsx:593–621`) against the sticky stack boundary; ResizeObserver reconfigures it when sticky height changes. No per-row observer or scroll listener. Adjacent rows meet at zero gap with one groove. The drop is under location while visible and transfers to sticky rows when covered. SGB-4 at :104 measures every adjacent visible pair at scroll 0 and 180, asserting upper bottom equals lower top exactly, zero bottom border, groove equality and one last-row drop. It logs boxes and screenshots. The corrected run passed these measurements; the previous turn's numeric box logs are not retained in this sandbox, so exact historical coordinates are not claimed here. The asserted and passed gap is 0 px.

## 6. One pill, clearance and INC-1024

CURRENT_PILL in band-row.ts is `rounded-full bg-nav-pill shadow-pill text-nav-ink`, consumed by panel tabs and bottom bar. `--nav-active` is removed from CSS registration, light/dark theme data and strict schema. Theme tests refuse its return. SGB-5 verifies the three P-S3 token values in both modes.

INC-1024: the new track could shrink before useLabelRoom saw the names' intrinsic demand, so L4b's short label was not moved aside. `min-w-min` on the track and picker buttons preserves that demand; the existing label-room mechanism yields the labels first. L4b's sr-only expectation stays unchanged.

ActionMessage's separate bar + 1rem clearance now reads bar + `--bar-rise` (14 px). AGENTS.md and its allowlist are byte-identical to d0b6a4ad; the unauthorized S2 allowance raise and added rule were reverted in S2-2. Architecture is recorded in the existing mechanisms register, not an extra constitution rule.

## 7. G38 inventory

- Admin-shell A-5/A-6: old `/bg-nav-active/`, new `new RegExp(ITEM_ACTIVE)`; shared menu chosen look, no weakened criterion.
- SGB-5 documents old current tab `rounded-full bg-nav-active font-medium text-primary` → shared nav-pill/lift-pill/nav-ink. It is a new assertion, not a relaxed old test.
- BND-E1–E4 and existing CF-BAND height cases unchanged. L4b unchanged. No other existing assertion was changed in the cumulative diff.
- Shadow helper moved without semantic change: removes only the exact leading transparent zero-size Tailwind composition layer. sage-shell reads that same helper.

## 8. Growth and CI correction

All pages share S2's band/current-pill classes, track and intrinsic-width fix, plus D261's single drop-transfer observer. The stylesheet contains the shared track/segment utilities and D261 drop rule. This finishing turn adds no browser code; comparison against its 398a5859 base is unchanged to the checks' measured precision, including 11 NEAR pages with none growing. Entry is 208.7/209 KiB; CSS is 22.5/40 KiB (S1 report baseline 22.3: approximately +0.2 KiB). No entry or CSS ceiling changed.

The first S2 run's production entry was recorded as 208.4 KiB; final entry 208.7 includes S2-2's observer and width correction. Exact d0b6a4ad per-page baseline output is not retained; therefore the table below measures final download and this finishing turn's delta against 398a5859, not invented exact cumulative per-page deltas. S1's recorded entry was 208.2 KiB, making rounded cumulative entry growth approximately +0.5 KiB. No new first-download module or dependency was introduced.

| Page | Final JS KiB | S2-3 delta vs 398a5859 KiB | Final ceiling |
| --- | --- | --- | --- |
| `/` | 222.8 | +0.0 | 223 |
| `/$name` | 221.5 | +0.0 | 222 |
| `/account` | 269.4 | +0.0 | 270 |
| `/account_/legal` | 211.3 | +0.0 | 212 |
| `/account_/legal_/$versionId` | 212.0 | +0.0 | 213 |
| `/account_/saved` | 221.6 | +0.0 | 222 |
| `/admin` | 209.7 | +0.0 | 210 |
| `/admin/` | 210.5 | +0.0 | 211 |
| `/admin/ai` | 337.2 | +0.0 | 338 |
| `/admin/attributes` | 350.4 | +0.0 | 351 |
| `/admin/audit` | 310.3 | +0.0 | 311 |
| `/admin/categories` | 358.5 | +0.0 | 359 |
| `/admin/countries` | 340.0 | +0.0 | 341 |
| `/admin/coverage` | 332.7 | +0.0 | 333 |
| `/admin/images` | 210.3 | +0.0 | 211 |
| `/admin/impersonation_/$sessionId` | 310.9 | +0.0 | 311 |
| `/admin/legal` | 279.9 | +0.0 | 281 |
| `/admin/legal_/$versionId` | 279.2 | +0.0 | 280 |
| `/admin/legal_/edit` | 284.8 | +0.0 | 285 |
| `/admin/listings` | 356.6 | +0.0 | 357 |
| `/admin/listings_/$listingId` | 381.6 | +0.0 | 382 |
| `/admin/listings_/$listingId_/edit` | 403.6 | +0.0 | 404 |
| `/admin/locations` | 271.3 | +0.0 | 272 |
| `/admin/places` | 341.5 | +0.0 | 342 |
| `/admin/roles` | 307.9 | +0.0 | 308 |
| `/admin/roles_/$roleId` | 309.6 | +0.0 | 310 |
| `/admin/screening` | 381.9 | +0.0 | 382 |
| `/admin/translations` | 414.3 | +0.0 | 415 |
| `/admin/translations_/$lang` | 323.1 | +0.0 | 324 |
| `/admin/users` | 306.8 | +0.0 | 307 |
| `/admin/users_/$userId` | 287.2 | +0.0 | 288 |
| `/auth` | 221.4 | +0.0 | 222 |
| `/auth_/callback` | 209.7 | +0.0 | 210 |
| `/auth_/reset` | 211.8 | +0.0 | 212 |
| `/c/$slug` | 222.8 | +0.0 | 223 |
| `/dev/primitives` | 224.6 | +0.0 | 225 |
| `/dev/style` | 244.4 | +0.0 | 245 |
| `/dev/tall` | 209.0 | +0.0 | 210 |
| `/l/$slug` | 252.4 | +0.0 | 253 |
| `/legal/$kind` | 213.4 | +0.0 | 214 |
| `/legal/accept` | 220.3 | +0.0 | 221 |
| `/legal/publishing` | 214.1 | +0.0 | 215 |
| `/my-listings` | 330.0 | +0.0 | 331 |
| `/my-listings_/$listingId` | 319.2 | +0.0 | 320 |
| `/my-listings_/$listingId_/edit` | 398.1 | +0.0 | 399 |
| `/post` | 398.0 | +0.0 | 399 |
| `/post_/$listingId` | 398.0 | +0.0 | 399 |
| `/privacy` | 213.4 | +0.0 | 214 |
| `/settings` | 273.0 | +0.0 | 274 |
| `/terms` | 213.4 | +0.0 | 214 |

CI failure corrections: each new ceiling is floor(CI size + 0.3) + 1; each line names the shared shell growth cause.

| Page | CI KiB | Old → new |
| --- | --- | --- |
| `/account_/legal_/$versionId` | 212.1 | 212 → 213 |
| `/admin/ai` | 337.2 | 337 → 338 |
| `/admin/countries` | 340.0 | 340 → 341 |
| `/admin/legal` | 280.0 | 280 → 281 |
| `/admin/translations_/$lang` | 323.2 | 323 → 324 |
| `/dev/tall` | 209.1 | 209 → 210 |
| `/legal/publishing` | 214.2 | 214 → 215 |
| `/my-listings` | 330.1 | 330 → 331 |
| `/my-listings_/$listingId_/edit` | 398.2 | 398 → 399 |
| `/post` | 398.2 | 398 → 399 |
| `/post_/$listingId` | 398.1 | 398 → 399 |
| `/settings` | 273.1 | 273 → 274 |

## 9. Checks and first-run failures

Full run: `env -u VITE_E2E CHECKS_BASE=398a5859 bun run checks`, whole, one invocation this turn. The permitted CI-budget correction landed while the suite was still running, before the budget step; its final budget step read the corrected file. Format was additionally checked on that file. Unit suite: **2,352 passed / 2,352**, 390 files.

`checks: 34 PASS · 0 FAIL · 21 NOT RUN · 1170s`

S2's first full run's two failures and answers:

1. Component suite / AGL: unauthorized AGENTS addition made the recorded byte allowance stale. S2-2 reverted AGENTS and allowance to d0b6a4ad; verified with an empty git diff on both. Full unit suite now passes.
2. Bundle budget: browser-test unminified output was judged against production limits (374.1/209 KiB). Final checks explicitly unset VITE_E2E and use their production build. Genuine later CI page overruns are separately corrected above; they were not dismissed as test output.

NOT RUN steps are listed verbatim below; no independent manual build or typecheck ran. The harness log has build OK, including the ceiling change. Browser suite was not rerun in this checks/report-only turn: current CI supplies the full-suite result. Earlier simultaneous browser/build attempt was invalid due to replaced assets and is not counted as a proof.

```text
NOT RUN  build-and-check › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
NOT RUN  component-tests › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
NOT RUN  bundle-budget › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
NOT RUN  semgrep › Upload SARIF  (0s) — GitHub's code-scanning upload, only GitHub can receive it
NOT RUN  semgrep › Warn: the SARIF upload failed  (0s) — answers the GitHub-only upload above
NOT RUN  dependency-audit › Install dependencies  (0s) — the advisory service it asks is not reachable from the sandbox; CI's verdict is the judge
NOT RUN  dependency-audit › Audit  (0s) — the advisory service it asks is not reachable from the sandbox; CI's verdict is the judge
NOT RUN  e2e-preflight › Cache bun install  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
NOT RUN  e2e-preflight › Bun cache hit?  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
NOT RUN  e2e-preflight › Install dependencies  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
NOT RUN  e2e-preflight › Migration parity preflight (staging)  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
NOT RUN  e2e › Download shard results  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Download job log tails  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Download error contexts  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Verify the downloaded artifacts belong to this attempt  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Publish merged E2E report  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Verdict  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  promote › Promote token present (DEC-210)  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
NOT RUN  promote › Configure the actions bot  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
NOT RUN  promote › Fast-forward guard (ff-only law — never merge/rebase here)  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
NOT RUN  promote › Promote dev to main  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
```

## 10. K2 and limits

- S1's ActionMessage clearance bypass is now resolved through bar-rise.
- No additional band consumer bypass was found in the band-row census; the full guard passed. Existing brand-green repetitions in brand-mark.ts and server/ai/tasks.ts remain outside Part 2, assigned by the supervisor to records; not touched.
- Historical local box logs and exact d0b6a4ad page-size baseline are unavailable in this fresh sandbox; the report separates prior recorded observations, current CI results and current measurable sizes.
- CI direct job-log access returned 403; the failure body was obtained instead from immutable raw ci-evidence, without guessing.
- No migrations, dependencies, strings, routes, features or height changes. Platform manages commit/push; no stateful Git command was used, and promotion remains CI-only.

## 11. Files — git diff --name-only d0b6a4ad

```text
docs/_changelog.md
docs/features/design-foundation.md
docs/governance/briefs/foundations-turn-sage-s2-2.md
docs/governance/briefs/foundations-turn-sage-s2-3.md
docs/governance/briefs/foundations-turn-sage-s2.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-sage-s2.report.md
e2e/admin-shell.spec.ts
e2e/helpers/shadows.ts
e2e/sage-bands.spec.ts
e2e/sage-shell.spec.ts
roadmap.md
scripts/conformance/shell-bands.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/components/shell/band-row.ts
src/components/shell/bottom-bar.tsx
src/components/shell/location-selector.tsx
src/components/shell/panel-header.tsx
src/components/shell/panel-tabs.tsx
src/components/ui/action-message.tsx
src/lib/schemas/theme.ts
src/lib/themes.test.ts
src/lib/themes.ts
src/styles.css
```

## 12. Close

S2 work, its continuation, final CI correction, checks and report are complete. This turn modified only S2-3's brief, roadmap, CI-named route ceilings and this report. No further work started.

J-audit: scratch descendants/listings with cleanup, no production fixture writes; existing assertions unchanged except documented G38 menu look; no retries or manual repeats added; cleanup-survives-timeout uses the existing fixtures/afterEach mechanism (no new timeout cleanup mechanism claimed).
