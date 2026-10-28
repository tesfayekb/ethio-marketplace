# Turn C1-2 — turn C1 completed: a map says its own failures in place, Leaflet's too (INC-956); DEC-281; the posting pages' ceilings; the records
Base: 24815c467d781a9b7781d174561258f86231fd05 · Final commit: 9170aea · Brief: docs/governance/briefs/foundations-turn-c1-2.md (sha256 5983d31fd5af64212159d4ae414915b851b9849c7eed2ea967ebd7cac7e06dde)
Review: READY · 0 BLOCKER · 1 MAJOR · 11 MINOR · on 9170aea

## 1. Done / not done, by part and step

- Part A — done. `git rev-parse HEAD origin/dev`: both `24815c467d781a9b7781d174561258f86231fd05` (= BASE; no diff to list). CI on BASE: FAILURE, the first-paint bundle budget only, its three over-budget lines as the brief states (§11).
- STEP 0 — done (91a9a36): sha256 `5983d31fd5af64212159d4ae414915b851b9849c7eed2ea967ebd7cac7e06dde`, 93632 bytes, equal to the carrying message; roadmap.md line 3 names the brief.
- Part B — done (32b4f43), red first (§5).
- Parts C and D — done (2f2702e), red first (§5).
- Part E — done (6dae82c), AP-55 green on both projects.
- Part F — done (58b63d3).
- Part G — done (a22af22).
- THE CHECKS — first run green; then `check-bundle-size` red on five pages → STOP 1 (09fd6cf). Ruling 1 (R1–R2: 20826a3) → still four pages over → STOP 2 (16ca17e). Ruling 2 (R7: cdb8c5a) and ruling 1's R5 (9170aea, S465) → THE CHECKS green.
- THE END-TO-END CHECK — run; one red (PW-13 at mobile-360) → STOP 3 (4658634). Ruling 3: continue, named under Limits.
- THE INDEPENDENT REVIEW — done on cdb8c5a, then again on 9170aea, the last code commit as land.ts counts it (see §10).
- THE COMPLETION REPORT — this file.

## 2. Files changed  (verbatim `git diff --name-only <BASE>`; new files with `git ls-files` proof)

```text
docs/_changelog.md
docs/features/posting.md
docs/governance/briefs/foundations-turn-c1-2.md
docs/governance/instructions-amendments.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-c1-2.stop-1.md
docs/governance/reports/foundations-turn-c1-2.stop-2.md
docs/governance/reports/foundations-turn-c1-2.stop-3.md
docs/tracking/incidental-findings.md
e2e/ad-page.spec.ts
roadmap.md
scripts/conformance/kit.ts
scripts/conformance/on-demand-failure.test.ts
scripts/conformance/resilient-fallbacks.test.ts
scripts/route-budgets.mjs
src/features/posting/map/map-frame.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-offline.test.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-where.tsx
src/i18n/locales/am-base.ts
```

Plus this report (docs/governance/reports/foundations-turn-c1-2.report.md), committed on its own. New files, `git ls-files`: docs/governance/briefs/foundations-turn-c1-2.md, docs/governance/reports/foundations-turn-c1-2.stop-1.md, …stop-2.md, …stop-3.md, src/features/posting/map/map-offline.test.tsx — each listed. No file deleted.

## 3. Behaviour contract — answer tables before → after

| Surface | BASE (24815c46) | Now |
| --- | --- | --- |
| Still map (map-preview.tsx), Leaflet or tile plan fails | `reportOnDemandFailure("the map", …)` — the shell's notice; the box stays empty | one `[client-error] the map failed to load: …` line; the box draws `LoadFailedHere` with `map-failed` / `map-refresh` (MAP_FAILED_IDS.still); no shell notice (MOF-1) — CHANGE (a) |
| Large map (map-large.tsx), the same | `reportOnDemandFailure("the large map", …)` | one `[client-error] the large map failed to load: …` line; `LoadFailedHere` with `map-large-failed` / `map-large-refresh` over the map inside its dialog; no shell notice (MOF-2, AP-55) — CHANGE (a) |
| The maps' own chunk fails (listing-detail.tsx, step-where.tsx fallbacks) | `LoadFailedHere` with `listing-map-failed`/`-refresh`, `listing-map-large-failed`/`-refresh`, `post-where-map-failed`/`-refresh` | `MapFailedHere` (map-frame.tsx): `map-failed`/`map-refresh` for every still map, `map-large-failed`/`map-large-refresh` for the large map (LDF-1) — CHANGE (a); the words and Refresh unchanged |
| am-base.ts `feed.headingIn` | `በ{location} ውስጥ ያሉ ማስታወቂያዎች` | `የ{location} ማስታወቂያዎች` — CHANGE (b) |
| scripts/route-budgets.mjs | the three posting pages at 393 | 397 — CHANGE (c); and, by ruling 2, /admin/listings_/$listingId 375 → 379, /admin/listings_/$listingId_/edit 399 → 403, /admin/screening 373 → 377, /l/$slug 247 → 251 |
| Records | — | turn C1's and C1-2's (INC-962, INC-963, later words of INC-955/956/957/958/961, S462–S465, register rows 52, 57, 64, roadmap, changelog) — CHANGE (d) |

Every other status, word, id and signature is BASE's.

## 4. Censuses

K1, `grep -rn "reportOnDemandFailure(" src --include=*.ts --include=*.tsx | grep -v "\.test\." | wc -l`: before Part D `12`; after `10`. The ten remaining: overlay-facade.tsx:138, :459; use-category-glyphs.ts:46; use-auth.ts:80, :121; resilient-lazy.ts:34; on-demand-failure.ts:27 (the definition); i18n/provider.tsx:611, :641; settings.tsx:176 — none an in-place piece's module.

## 5. Tests

- B1 (BASE's tree, `bun run build` then `node scripts/check-bundle-size.mjs`, exit 1): `JS: 205.7 KiB / 207 KiB — ok`, `CSS: 20.5 KiB / 40 KiB — ok`; `Per-page budget failed (D234):` `/my-listings_/$listingId_/edit: 393.2 KiB, over its ceiling of 393 KiB`, `/post: 393.1 KiB, over its ceiling of 393 KiB`, `/post_/$listingId: 393.1 KiB, over its ceiling of 393 KiB`; no other page over.
- B2: `EDIT scripts/route-budgets.mjs #1` · `applied 1 block(s) to 1 file(s)`; `JS: 205.7 KiB / 207 KiB — ok`; `393.2 / 397 KiB  /my-listings_/$listingId_/edit`, `393.1 / 397 KiB  /post`, `393.1 / 397 KiB  /post_/$listingId`; `Bundle budget OK.`
- C1 (red against BASE's maps): `Test Files  3 failed | 1 passed (4)`, `Tests  4 failed | 7 passed (11)`; failing: CF-RLF-1 (findings `listing-detail.tsx:55 …map-preview.tsx is fetched in place but raises the shell's notice`, `listing-detail.tsx:61 …map-large.tsx …`, `step-where.tsx:57 …map-preview.tsx …`), MOF-1 (`Unable to find an element by: [data-testid="map-failed"]`), MOF-2 (`… [data-testid="map-large-failed"]`), LDF-1 (`… [data-testid="map-failed"]`); ODC-1…6 passed.
- D1: `Test Files  128 passed (128)`, `Tests  758 passed (758)`; typecheck exit 0; lint `✖ 39 problems (0 errors, 39 warnings)`; `bun run i18n:usage` → `1736 keys across 600 files`; `git diff --stat` of both maps: empty.
- Ruling 1 R4c (after R1–R2): `Test Files  128 passed (128)`, `Tests  758 passed (758)`; R4d: typecheck 0, lint 0 errors / 39 warnings, prettier `All matched files use Prettier code style!`.
- E1: `bun run e2e:local -- e2e/ad-page.spec.ts --grep "AP-55 "` → `2 passed (33.9s)` (mobile-360 and desktop-1280); `[ssr-error]`: 0.
- F1: `bunx vitest run src/i18n` → `Test Files  9 passed (9)`, `Tests  29 passed (29)`; i18n maps unchanged.
- Unit totals (`bun run test:unit` on cdb8c5a's tree + S465): `Test Files  341 passed (341)`, `Tests  2051 passed (2051)` — photo.test.ts's five pass in this lock-exact install.
- THE END-TO-END CHECK: `bun run e2e:local -- e2e/ad-page.spec.ts e2e/on-demand-failure.spec.ts` → `5 skipped`, `75 passed (7.3m)` (the five are AP-37 at 1280, AP-42/45/50 at 360, OVW-1 at 1280 — their own viewport skips); `[ssr-error]`: 0. `bun run e2e:local -- --grep "PW-13 |PW-39 |PW-96 |PW-100 |ALS-1 |FS-3 |FS-4 |FS-11 |FS-13"` → `1 failed`, `17 passed (2.6m)`: every id green on both projects but PW-13 at mobile-360 (§12); `[ssr-error]`: 1 — `/api/listings/draft` (`residency: Internal server error.`).
- New ids: MOF-1, MOF-2, ODC-6, AP-55 (grep of titles before: no collision). Re-pointed: LDF-1's two test ids (the brief's blocks). Changed: CF-RLF-2 (six planted calls, the loud in-place module). Turn C1's tests whose mocks changed shape (one `pin` value in place of three fields; behaviour asserted unchanged — named by the reviewer, turn C1 having no report of its own): LD-21 and LD-24 (src/features/posting/preview/listing-detail.test.tsx:659, :911), src/features/posting/preview/listing-detail-map.test.tsx:93, src/features/ad-page/public-listing.test.ts:158, src/features/posting/use-edit-draft.test.ts:59.
- J-audit (e2e/ad-page.spec.ts): AP-55 seeds a scratch seller and ad (J1, J3), seeds before it navigates (J7), locates by test id (J5), no `waitForTimeout`, no `.first()`, one project-neutral test.

## 6. K2 — siblings that bypass the mechanism

`grep -rn "inPlace: true" src` → step-where.tsx:61, :67; listing-detail.tsx:58, :64 (the four in-place calls). `grep -rnE "loadLeaflet\(|loadTilePlan\(" src` → map-pin-dropper.tsx:196 (in place since 34b-3), map-large.tsx:46, map-preview.tsx:88 — all three now say their failure in place. Every on-demand download of an in-place piece outside the brief's lists: none. The reviewer's K2 note (MINOR-4): the in-place "log only" line is hand-written at map-preview.tsx:125, map-large.tsx:80, listing-detail.tsx:444 and the siblings map-pin-dropper.tsx:271, step-who.tsx:219 — no shared function; left (no block names one), listed under §10.

## 7. Allowlists and guards

`git diff --stat <BASE>..HEAD -- scripts/conformance/*-allowlist.txt`: empty; on-demand-failure-allowlist.txt 4 → 4 lines, non-null-allowlist.txt 144 → 144. No new line. CF-RLF-1 on BASE's maps: 3 findings (§5 C1); on the final tree: 0 (D1 and R4c green). ODC-1/ODC-6 green. Bundle lines (`node scripts/check-bundle-size.mjs` at THE CHECKS): `JS: 205.7 KiB / 207 KiB — ok`, `219.2 / 220 KiB  /`, `247.3 / 251 KiB  /l/$slug`, `393.7 / 397 KiB  /post`, `Bundle budget OK.`; ruling 2's four: `375.6 / 379 KiB  /admin/listings_/$listingId`, `399.1 / 403 KiB  /admin/listings_/$listingId_/edit`, `373.5 / 377 KiB  /admin/screening`, `247.3 / 251 KiB  /l/$slug`.

## 8. Strings

No new key, no key removed (both i18n maps unchanged). One Amharic value changes, by the applier: am-base.ts `feed.headingIn` = `የ{location} ማስታወቂያዎች`; code points (`iconv -t UTF-32LE | od -tx4`): `U+12E8`, `{location}` (U+007B … U+007D), `U+0020`, `U+121B U+1235 U+1273 U+12C8 U+1242 U+12EB U+12CE U+127D` — the Ethiopic ones exactly the brief's expected list.

## 9. Migrations

none (`git diff <BASE> --stat -- supabase`: empty).

## 10. Departures

- STOP 1 (THE CHECKS: five pages over their ceiling after Part D — map-frame.tsx became a chunk of its own) → RULING 1: map-preview.tsx and map-large.tsx draw `LoadFailedHere {...MAP_FAILED_IDS.*}` (R1, R2, applied by hand as the ruling words them — 20826a3); map-frame.tsx unchanged (R3); S465 recorded (R5 — 9170aea). R4a's grep printed one line, the docblock the ruling dictates (accepted by ruling 2).
- STOP 2 (R4b: four pages still over, 0.6–0.7 KiB above Part B) → RULING 2: four ceilings by the ratchet's rule (R7 — cdb8c5a): /admin/listings_/$listingId 379, /admin/listings_/$listingId_/edit 403, /admin/screening 377, /l/$slug 251; the chunk class goes to its own turn (INC-964, the supervisor's).
- STOP 3 (PW-13 red at mobile-360 in THE END-TO-END CHECK) → RULING 3: continue, named under Limits; no re-run.
- The hash list prints FAILED for exactly four files, the two rulings changing them after the hashes were written: src/features/posting/map/map-preview.tsx, src/features/posting/map/map-large.tsx (ruling 1 R1–R2), scripts/route-budgets.mjs (ruling 2 R7), docs/governance/instructions-amendments.md (ruling 1 R5). Every other line OK.
- Commit titles: the ruling commits carry the rulings' subjects (20826a3's title says four pages remained over, since R4b failed; R5 had no title in the ruling — `turn C1-2, stop 1 ruling R5: S465 recorded`). Commits were made with `git commit -F <file>`: the Bash guard refused an inline message containing the word "at".
- The review: requested in the foreground (`run_in_background: false`) both times; the platform started it in the background, and the turn waited for each final line. The first ran on cdb8c5a (`READY · 0 BLOCKER · 1 MAJOR · 9 MINOR · on cdb8c5a`); land.ts then refused this report ("the review ran on cdb8c5a, not on the last code commit 9170aea"), since it counts the S465 commit as code, so the reviewer ran again on 9170aea — its line is this report's third line.
- The reviewer's findings on 9170aea, none fixed (no text of the brief or the rulings allows it), for the supervisor's ruling:
  - MAJOR-1: route-budgets.mjs :45, :46, :51, :63 cite INC-964, which the ledger does not hold yet ("Numbering: next free INC-964", incidental-findings.md:5437); no changelog or roadmap line records the four raises (the changelog's C1-2 line names 393 → 397 only); one is public (/l/$slug 247 → 251); the comment names a cause whose bytes are unproven — and error-text.ts is not it: it is already in the entry, through `__root.tsx` and on-demand-failure.ts:3.
  - MINOR-1: the two id pairs exist twice — MapFailedHere (map-frame.tsx:16–21) and MAP_FAILED_IDS (map-preview.tsx:49–52), by R1–R3; still-map.ts (already imported by both) could hold one copy, by a ruling.
  - MINOR-2: texts still say MapFailedHere draws the Leaflet/tile-plan failures: map-frame.tsx:9–14, docs/_changelog.md:1155, docs/governance/mechanisms.md:62, docs/tracking/incidental-findings.md:5433, e2e/ad-page.spec.ts:1150.
  - MINOR-3: the `[client-error] <label> failed to load: …` line is written by hand at map-preview.tsx:125, map-large.tsx:80, listing-detail.tsx:444, copying reportOnDemandFailure's format with no shared log-only function (siblings map-pin-dropper.tsx:271, step-who.tsx:219 — §6).
  - MINOR-4: the links effect at listing-detail.tsx:449 is keyed on `[pin]`'s identity; correct only while every caller passes a stable object (l.$slug.tsx:176's `useMemo` among them) — keying on lat, lng and precision would remove the hazard (turn C1).
  - MINOR-5: CF-RLF-1's `raisesNotice` (resilient-fallbacks.test.ts:93) reads only the module an in-place call names, not that module's imports.
  - MINOR-6: AP-55 (ad-page.spec.ts:1176) asserts no `on-demand-failed` as soon as the dialog shows; a notice raised later would go unseen (MOF-1/2 cover it at unit level).
  - MINOR-7: src/test/e2e-route-guard.test.ts:31 keeps one `as unknown as Route` (moved, not added; turn C1).
  - MINOR-8: `routePageClosed` (e2e/helpers/route-guard.ts:35) has no caller outside its test; docs/features/e2e-harness.md:573 still names it as the rule; docs/features/nightly-e2e.md:23 omits INC-962's zone check and NH-6 — those docs outside this brief's allowance.
  - MINOR-9: map-frame.tsx now holds two components (MapFailedHere, MapFrame) against docs/conventions.md's "one component per file" — the brief's block.
  - MINOR-10: e2e/ad-page.spec.ts holds 39 tests (38 at BASE), over the ~25 rule.
  - MINOR-11: no unit test draws the wizard's NoMap fallback (step-where.tsx:75–81) for `map-failed` (CF-RLF-1 covers it structurally only); turn C1's changed-shape tests were missing from §5 — now listed there.

## 11. CI

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (read just before this report's last commit):

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `4658634311f0ee5b47c9d1102ab579513ced1c36` (short `4658634`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T11:52:23Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40680789056
```

Two-step check: the reported commit is 4658634, stop 3's landing — the last landed commit; it holds this report's final code commit 9170aea and adds only stop-3.md, so CI green on 4658634 covers this turn's code. This report's own landing has not run yet. The run before it, 40677294392 on 16ca17e, failed only the first-paint bundle budget (the four pages ruling 2 raised: 375.6, 399.1, 373.5, 247.3 KiB), with every E2E lane passing.

## 12. Limits

- PW-13 at mobile-360 failed locally on ethio-staging at the photos step (`getByTestId('post-step-4')` not visible within 10 s, e2e/post-wizard-place.spec.ts:266), before any map or pin is drawn: the server log shows `[slow-rpc] residency_country_for 10049` and `[ssr-error] /api/listings/draft residency: Internal server error.` at that moment; no file this turn changed is on that path. Not re-run (DEC-184, ruling 3); CI's temporary backends run PW-13 on both projects (runs 40677294392 and 40680789056: every lane green). The draft route's raw 500 on a slow lookup is the supervisor's INC-965.
- The cause of the remaining 0.6–0.7 KiB on the map pages is not proven: the comparison build of Part B's tree could not be made (the Bash guard refused the copy into the scratchpad). Stop 2's candidate, error-text.ts, is refuted by the reviewer (already in the entry); the cause is INC-964's turn.
- THE CHECKS cache prints step verdicts, not totals; the unit totals in §5 come from a separate `bun run test:unit` on the same tree.
- This report's landing's CI run has not completed (§11).
