# P-2 (a) — the ad's level and reach: ruling 14, the last build turn — report

Base: 038a04c3d (ruling 14's base on cursor/p2-plan; the turn's dev base is cfecc476f) · Final commit: 4e876c33a · Brief: docs/governance/briefs/p2-level-reach-ruling-14.md (sha256 of the saved file 18c1e4ed…; the attachments compared before use: `p2-m1c-types.patch` 1ae08163…, `p2-ruling14-strings.json` 3acc3db2…, both matched)
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on 4e876c33a

Rulings 1–13 of this turn are reported in `docs/governance/reports/p2-level-reach.stop-1.md` … `stop-4.md` (one § per ruling). This report covers ruling 14, whose file list is taken from 038a04c3d as the ruling asks.

## 1. Done / not done, by part and step

| Item | What | Commit |
| ---- | ---- | ------ |
| — | Brief saved; roadmap line 3 names it | 13fe06a05 |
| 3a | The supervisor's types patch for M-1c (`git apply --check` first; sha256 matched) | f1c58a6ce |
| 1 | INC-1061: `updateListingRow` (e2e/helpers/listing-seed.ts), the one service-role writer of status / tier on an existing row; 25 sites in 15 specs moved; LG-29's fourth ad takes the level above the baseline while a draft; CF-SEED-1 judges UPDATEs (CFS-1…4) | 6ce9362b0 |
| 2 | INC-1062: `doorAnswer` / `doorRefusal` (e2e/helpers/door-answer.ts); CF-DOOR-1 derives the envelope doors from the last declarations and judges every e2e call; 14 sites moved, 1 allowlisted | cab8ddf76 |
| 3b–g | Typed level / reach readers (list, ad, admin detail); `setAdminListingTier` passes `p_days` and reads `status`; the paused ad with Resume; `levelEnding` on a live row; noFreeSlot in words in the four mappers; the sweep's history labels; nine strings applied by script from the attachment | 39e521f33 |
| 4 | CF-TIER-5 (`scripts/conformance/listing-designation.ts`, DSG-1…3), wired | 23c37228d |
| 5 | `e2e/my-listings-levels.spec.ts`: LDR-1…6 (LDR-6 the two-tab race), SWP-1…4, FSL-1…3 (FSL-3 through the Resume button) | 8d6933d73 |
| 6 | Records: INC-1061, INC-1062; register row 114 widened to UPDATE, rows 115 (CF-DOOR-1) and 116 (CF-TIER-5); my-listings.md §the paused ad; e2e-harness.md (the UPDATE writer, reading a door's answer); one changelog line | 9d7084f4f |
| 7 | Self-review fixes (the doc names the staff's history and its keys; the level spec's three 20 s waits brought to the house's 15 s); THE CHECKS; the browser check; this report; push; PR ready | 4e876c33a, this commit |

Not done: nothing the ruling lists. No migration was needed or written.

## 2. Files changed

`git diff --name-only 038a04c3d` at 4e876c33a (59 paths; this report adds itself):

```
docs/_changelog.md
docs/features/e2e-harness.md
docs/features/my-listings.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-level-reach-ruling-14.md
docs/governance/mechanisms.md
docs/tracking/incidental-findings.md
e2e/account-saved.spec.ts
e2e/ad-page-doors.spec.ts
e2e/ad-page.spec.ts
e2e/admin-screening.spec.ts
e2e/feed-index.spec.ts
e2e/feed-route.spec.ts
e2e/feed-screens.spec.ts
e2e/helpers/door-answer.ts
e2e/helpers/listing-seed.ts
e2e/legal-certify.spec.ts
e2e/my-listings-doors.spec.ts
e2e/my-listings-levels.spec.ts
e2e/my-listings-page.spec.ts
e2e/one-line-slots.spec.ts
e2e/post-wizard-bundle2.spec.ts
e2e/post-wizard-where.spec.ts
e2e/sage-ad-page.spec.ts
e2e/sage-tiers.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/door-answers-allowlist.txt
scripts/conformance/door-answers.test.ts
scripts/conformance/door-answers.ts
scripts/conformance/listing-designation-allowlist.txt
scripts/conformance/listing-designation.test.ts
scripts/conformance/listing-designation.ts
scripts/conformance/listing-seed-allowlist.txt
scripts/conformance/listing-seed.test.ts
scripts/conformance/wired.test.ts
src/features/admin-listings/change-listing-tier.test.ts
src/features/admin-listings/change-listing-tier.ts
src/features/admin-listings/history.test.ts
src/features/admin-listings/history.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/move-reasons.test.ts
src/features/admin-listings/move-reasons.ts
src/features/admin-listings/tier-reasons.test.ts
src/features/admin-listings/tier-reasons.ts
src/features/admin-listings/use-admin-listing.ts
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listing.test.ts
src/features/my-listings/my-listing.ts
src/features/my-listings/my-listings.test.ts
src/features/my-listings/my-listings.ts
src/features/my-listings/state-line.ts
src/features/posting/refusal-text.test.ts
src/features/posting/refusal-text.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
```

New files (`git diff --name-only 038a04c3d --diff-filter=A`, each listed by `git ls-files`): `docs/governance/briefs/p2-level-reach-ruling-14.md`, `e2e/helpers/door-answer.ts`, `e2e/my-listings-levels.spec.ts`, `scripts/conformance/door-answers-allowlist.txt`, `scripts/conformance/door-answers.test.ts`, `scripts/conformance/door-answers.ts`, `scripts/conformance/listing-designation-allowlist.txt`, `scripts/conformance/listing-designation.test.ts`, `scripts/conformance/listing-designation.ts`, `src/features/posting/refusal-text.test.ts`. No deletion.

## 3. Behaviour contract — answer tables before → after

| Function / screen | At 038a04c3d | Now |
| ----------------- | ------------ | --- |
| `setAdminListingTier` (use-admin-listing.ts) | `(id, tier, reason, note) → void`; error thrown | `(id, tier, reason, note, days: number \| null) → { status }`; `p_days` sent only when not null; an answer without `ok: true` and a string `status` throws "malformed answer" (3c) |
| `changeListingTier` | `{ ok: true }` | `{ ok: true, status }`; passes `days = null` (no UI yet, 3c); refusals unchanged |
| `detailOf` (admin detail) | no clock fields | adds `tierUntil`, `tierSource`, `reach`, `reachUntil`, `reachSource` as `string \| null` (3b) |
| `parseRow` (my_listings and my_listing) | — | requires `level: string`, `levelUntil`, `levelSource`, `reach`, `reachUntil: string \| null`; a missing or mistyped field refuses the row (3b: typed absences, no defaults) |
| `offerFor` / `primaryOf` | paused not offered | paused → `["resume","sell","delete"]`, Resume primary first; `EDITABLE_STATUSES` gains `paused` (3d) |
| `runAction("resume")` | — | `resume_listing({ p_listing_id })`; done line `myListings.done.reopen` |
| `actionErrorKey` | noFreeSlot → `common`-class fallback | `noFreeSlot` → `post.refusal.noFreeSlot`; `listingNotFound` → `myListings.error.notYours`; `notPaused` → `myListings.error.changed` (3e) |
| `stateLine` | live: days left; no paused case | live with `levelUntil`: `… · Level ends <date>` (date through `dateFormatter`); paused: `Paused: no free slot[ · Days kept: N]` (3d) |
| My listing page | — | `my-listing-paused-help` (`myListings.pausedHelp`) when paused (3d) |
| `DRAFT_REASONS` (refusal-text.ts) | noFreeSlot → fallback | `noFreeSlot` → `post.refusal.noFreeSlot` (3e) |
| `tierErrorKey` / `moveErrorKey` | noFreeSlot → `common.error` | → `admin.listings.error.noFreeSlot` (3e) |
| `summarize` (history.ts) + listing page | a system revision reads as a status change or an edit | a system (`by: "system"`) revision to `paused` → "Paused: no slot"; an edit clearing `tier_until` → "Level ended"; clearing `reach_until` → "Reach ended" (3f); a person's revisions unchanged |

Everything else answers as at the base: the diff of every other touched function is the ruling's numbered change or a test.

## 4. Censuses

- INC-1061 (by the law's definition: service-role `.update(…)` / `.upsert(…)` of `listings` naming status or tier, or an unreadable payload, in `e2e/`): 25 sites in 15 spec files at 038a04c3d, all moved onto `updateListingRow` (`git diff 038a04c3d -- 'e2e/*.spec.ts'` shows 26 `updateListingRow(` call lines in 15 files: the 25 moved, plus LG-29's new levelling call at `e2e/legal-certify.spec.ts` in the LG-29 body). Per file: account-saved 2, ad-page-doors 3, ad-page 1, admin-screening 1, feed-index 1, feed-route 1, feed-screens 1, legal-certify 5 (one new), my-listings-doors 1, my-listings-page 2, one-line-slots 1, post-wizard-bundle2 1, post-wizard-where 1, sage-ad-page 2, sage-tiers 3. After: 0 sites outside the helper (CF-SEED-1 CFS-1 on the real tree).
- INC-1062 (CF-DOOR-1's derivation): 19 envelope doors (admin_job_resume, admin_name_check_clear, admin_reveal_listing_contact, alias_verdict, change_home_country, check_seller_alias, publish_listing, renew_listing, report_listing, reveal_listing_contact, save_listing, save_posting_identity, save_seller_place, set_listing_photos_soon, submit_listing, suggest_seller_aliases, user_set_viewing_location, validate_listing_attributes, validate_listing_draft); 75 e2e call sites; 14 read no `ok` and moved (ad-page-doors 4, legal-certify 8, my-listings-doors 2); 1 allowlisted (section 7).
- CF-TIER-5: the five designation columns are written, in last declarations, only by `set_listing_level`, `set_listing_reach`, `admin_set_listing_tier`, `transition_listing`, `designation_sweep_core` (DSG-1 asserts `admittedWriters` equals the five); 0 other writers; `src/` (outside `src/integrations`) writes none of them.
- New test ids grep-checked free before use: LDR-1…6, SWP-1…4, FSL-1…3, DSG-1…3, CFD-1…3, CFS-4 (CFS-1…3 existed and were widened), ML-U24…27, LH-5, MR-5, TIR-6, CLT-4, PRT-1 (TI-1 passes in the laws).

## 5. Tests

- Unit and conformance (THE CHECKS, final run): `scripts/` `Tests 1 failed | 477 passed (478)`; component tests `Tests 1 failed | 2749 passed (2750)` — NH-6 alone in each (section 12); the checks' last line is in section 11.
- `bun run typecheck`: clean (`tsc --noEmit`, exit 0) on 4e876c33a.
- Red-first, on the real tree, planted and removed, never committed:
  - CF-SEED-1: a planted `e2e/helpers/zz-planted-bypass.ts` with makeState's conditional UPDATE → CFS-1 `1 failed | 3 passed`, naming `:3 a listings UPDATE of status or tier outside …`; removed.
  - CF-DOOR-1: a planted LG-29-shaped call → CFD-1 failed naming `:3 publish_listing`; removed.
  - CF-TIER-5: `supabase/migrations/29991231000000_planted-dsg.sql` (`UPDATE listings SET reach, reach_source`) → DSG-1 failed `planted_dsg:…:3 writes reach, reach_source`; `src/lib/planted-dsg.ts` (`.from("listings").update({ tier_until })`) → DSG-1 failed `src/lib/planted-dsg.ts:2 a data-API update of tier_until…`; both removed, `git status` clean for `src/` and `supabase/`.
- THE BROWSER CHECK (ethio-staging, `env -u PLAYWRIGHT_BROWSERS_PATH bun run e2e:local -- <25 specs> --retries=0`, both projects): the 18 specs this ruling changed or added, every spec importing `listing-seed.ts` or `door-answer.ts`, and the my-listings / admin-listings specs whose screens changed — `840 tests: 767 passed, 32 failed, 41 skipped (2.1h)`; 0 `[ssr-error]` lines. `e2e/my-listings-levels.spec.ts` 26/26 and `e2e/legal-certify.spec.ts` 43/43 (LG-29 included). The 32 reds, each read:
  - 16 on mobile-360 only (AL-27, AL-29, AL-31, ATR-1, ATR-2, ATR-4, SC-12…SC-15, SC-18…SC-22, SC-24): `TypeError: fetch failed (ENOTFOUND) after 4 attempts` or its consequence (a pooled account not created, a sign-in marker never shown) — this machine lost DNS mid-run. Re-run of those plus AL-30 and PP-8, both projects (`--grep "AL-2[79] |AL-3[01] |ATR-[124] |SC-1[2-9] |SC-2[0-4] |PP-8 "`): `38 passed, 4 failed (5.2m)` — the 4 are AL-30 and PP-8 below.
  - AL-20, AL-23, AL-30, SC-25, SC-26, MLA-13, MLP-6 (both projects): the spec presses `Control+A` to select a field (admin-listings :1470/:1483/:1693/:2154, admin-screening :1396/:1457, my-listings-ad :1008, my-listings-page :663); on macOS Chromium it moves the caret to the start instead, so the typed text is prepended ("Corrected listing X" + the old title; 90 + "100" = 90100; "0" + "30" = 030 → a valid 30 that reaches the step-up). None of these lines is in this turn's diff; CI's Linux runners select all. A finding (section 10).
  - PP-8 (both projects): a deleted photo's `cover.webp` still in storage after the photo route's DELETE answered ok. Nothing on its path changed in this pull request (`git diff c89271ca2...HEAD -- src/server src/routes src/lib e2e/helpers/photos.ts` is empty; PP-8's lines are untouched); PP-8 passed in CI run 42014967372 on 038a04c3d (2752 passed, LG-29 the one red). A local-environment red; CI is its proof.
- J-audit (e2e/** changed): the new spec's scratch rows are its own (a user-assigned scratch country through `seedSingleOptionMarket`, leased sellers, its own prices, branches and postable categories), removed in `afterEach` in FK order (prices, listings, the sellers' listings, `market_settings` then `destroyCountry`, regions, branches, categories); truth read through the service client; test-id anchors only; at most two pooled leases per test (EL-4); no `.first()`, `waitForTimeout` or `test.only` (grep of the added lines).
- Assertions that changed shape: every moved `.update(...)` keeps its filters (`where:` carries the old `.eq` chain where there was one) and its intent; every door site moved to `doorAnswer` / `doorRefusal` is strictly stronger (a refusal now also proves a null transport error, a success also proves `ok: true`).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "^(async )?function (asPerson|rpcResult|offeredAbove|selfServeAbove)" e2e`; `rg -n "Control\+A" e2e`.

- Spec-local REST sign-in helpers `asPerson`: `e2e/legal-doors.spec.ts:59`, `e2e/my-listings-page.spec.ts:66`, `e2e/my-listings-ad.spec.ts:66`, `e2e/my-listings-doors.spec.ts:93`, `e2e/legal-certify.spec.ts:63`, `e2e/ad-page-doors.spec.ts:56`, `e2e/admin-listings.spec.ts:89` — one concern, seven copies, no shared helper; not touched.
- Spec-local page-client calls `rpcResult` reaching `window.__ethioSupabase` with an `as unknown as` cast instead of `inBrowserClient` (CF-BC-1): `e2e/my-listings-doors.spec.ts:58`, `e2e/admin-screening.spec.ts:75`, `e2e/admin-listings.spec.ts:67`. The new spec's `door()` (`e2e/my-listings-levels.spec.ts`) goes through `inBrowserClient` but repeats the same `{ data, error: message }` shaping — a fourth shaper of one concern.
- Package lookups: `e2e/legal-certify.spec.ts:338` `offeredAbove` beside the new spec's `selfServeAbove` (:163) and `levelAboveBaseline` (e2e/helpers/listing-seed.ts:70) — three readers of "the package above"; they differ in filter (self-serve, kind, relative key) but share the concern.
- `Control+A` as select-all in specs (section 5), where `my-listings-ad.spec.ts:171` already uses `ControlOrMeta+A`.

## 7. Allowlists and guards

| Allowlist | 038a04c3d → now |
| --------- | ---------------- |
| `scripts/conformance/listing-seed-allowlist.txt` | 2 → 2 (the two AP-15 lines re-pointed :450/:455 → :452/:457 by the import line; header widened to UPDATE) |
| `scripts/conformance/door-answers-allowlist.txt` | new, 0 → 1: `e2e/posting-routes-dials.spec.ts:171 \| PR-29 hands renew_listing to twice(), which reaches .rpc by a variable and asserts the second call is the revise dial's raised refusal (isRateRefusal): the answer is the transport's error, out of the census's reach \| INC-1062` |
| `scripts/conformance/listing-designation-allowlist.txt` | new, 0 → 0 |
| `scripts/conformance/non-null-allowlist.txt` | 143 → 143 |

Guards: CF-SEED-1 widened (CFS-1…4), CF-DOOR-1 new (CFD-1…3), CF-TIER-5 new (DSG-1…3); each proven red on a planted bypass (section 5) and named in `scripts/conformance/wired.test.ts`. `bun run scripts/e2e-select.ts --self-test`: "every spec is reachable; every area glob matches". `scripts/check-root-routes.ts --self-test`: 12 allowed, 5 refused; the tree: 61 entries, every root segment safe.

## 8. Strings

Nine keys, applied by script from `p2-ruling14-strings.json` (sha256 3acc3db2…, matched); `am-script.test.ts` passes; `bun run i18n:usage` regenerated both maps.

| Key | Layer | EN | AM |
| --- | ----- | -- | -- |
| `myListings.ad.resume` | base | Resume ad | ማስታወቂያውን ቀጥል |
| `myListings.paused` | base | Paused: no free slot | ቆሟል፦ ነጻ ቦታ የለም |
| `post.refusal.noFreeSlot` | base | All your free ads in this country are in use. Mark one as sold or no longer available, or wait for one to end, then try again. | በዚህ አገር ያሉ ነጻ ማስታወቂያዎችዎ ሁሉም በአገልግሎት ላይ ናቸው። አንዱን እንደተሸጠ ወይም ከእንግዲህ እንደማይገኝ ምልክት ያድርጉ፣ ወይም አንዱ እስኪያበቃ ይጠብቁ፤ ከዚያ እንደገና ይሞክሩ። |
| `myListings.levelEnding` | member | Level ends {date} | ደረጃው የሚያበቃው፦ {date} |
| `myListings.pausedHelp` | member | Your level ended and all your free ads are in use. Resume this ad when one of them ends, or after you mark one as sold or no longer available. | ደረጃዎ አብቅቷል፤ ነጻ ማስታወቂያዎችዎም ሁሉም በአገልግሎት ላይ ናቸው። ከእነሱ አንዱ ሲያበቃ፣ ወይም አንዱን እንደተሸጠ ወይም ከእንግዲህ እንደማይገኝ ምልክት ሲያደርጉ፣ ይህን ማስታወቂያ ይቀጥሉ። |
| `admin.listings.action.levelEnded` | member | Level ended | ደረጃው አብቅቷል |
| `admin.listings.action.levelPaused` | member | Paused: no slot | ቆሟል፦ ቦታ የለም |
| `admin.listings.action.reachEnded` | member | Reach ended | ተደራሽነቱ አብቅቷል |
| `admin.listings.error.noFreeSlot` | member | The seller's free ads in this country are all in use, so this ad cannot be shown at the free level. | የሻጩ ነጻ ማስታወቂያዎች በዚህ አገር ሁሉም በአገልግሎት ላይ ናቸው፤ ስለዚህ ይህ ማስታወቂያ በነጻው ደረጃ ሊታይ አይችልም። |

No other key added or changed.

## 9. Migrations

None (`git diff --name-only 038a04c3d -- supabase/migrations` is empty). The nine M-1c pairing lines stand as in stop-4 §13.

## 10. Departures

- The level-door spec is `e2e/my-listings-levels.spec.ts`, not the plan's `e2e/level-doors.spec.ts`: the e2e selector's areas are `scripts/e2e-select.ts` globs (the my-listings area is `e2e/my-listings*.spec.ts`), and a new name outside every area fails the selector's self-test unless that script (outside scope) gains an area. Its ids sit under free prefixes (LDR, SWP, FSL).
- Register row 116 (CF-TIER-5) added beside the two rows item 6 names: a new guard is a mechanism, and a mechanism not in the register does not exist (rule 10).
- `docs/tracking/incidental-findings.md` is outside the standing allowance; item 6 names the INC rows, and that file is the register they live in.
- LDR-2's anonymous call meets the role's revoke (`permission denied`) before the door's own `notSignedIn`; the test accepts either and asserts nothing written.
- `notOffered` and `seasonEnded` of `set_listing_level` are not driven in e2e (a scratch market cannot make the real catalog's season or offer state without writing real rows); M-1c's in-file proofs cover them.
- `docs/features/e2e-harness.md` gained the UPDATE writer and §Reading a door's answer — the feature guide of the two mechanisms items 1 and 2 changed (rule 10, Documentation).
- The level spec's three 20 s waits became 15 s in the self-review (the house's value for the same locators: ten uses at the base); the full browser run above ran with 15 s.
- Findings (not fixed; outside this ruling):
  - `docs/tracking/incidental-findings.md`'s last line still says "Numbering: next free INC-1046." while INC-1046…1049 and INC-1051…1062 are in use elsewhere in `docs/` (INC-1050 is not); left as it stands — the records turn's.
  - `Control+A` as select-all in eight spec lines (section 5) fails on macOS; `ControlOrMeta+A` is the portable form already used at `e2e/my-listings-ad.spec.ts:171`.
  - Publish order: the app's readers now require M-1c's columns (`level`, `levelUntil`, … in `my_listings` / `my_listing`, the five clock columns in `admin_listing_detail`); the app must not be published on ethio-prod before M-1c is applied there, or My listings refuses its rows (a typed failure, not a blank).
- Self-review MINORs (none blocking): the fourth result shaper and the three package readers (section 6); the stale numbering line; the `Control+A` portability.

## 11. CI

- The base: ci-evidence `ci-status.md` (read with `git fetch origin ci-evidence`):

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `4746c6bd65733be8f3679642f9e5aa1413df68d3` (short `4746c6b`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-05T12:33:44Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42025215386
  ```

  Two-step check: 4746c6b is not 038a04c3d — STALE for the base. The base's own run is `gh run list --branch cursor/p2-plan`: run 42014967372 on 038a04c3d, FAILURE — LG-29 on both projects (`[e2e:certify] making active: noFreeSlot`, e2e/legal-certify.spec.ts:283 from :1206), the earlier-turn red this ruling fixes at its root (INC-1061, INC-1062). `origin/dev` is c89271ca2, unmoved since ruling 8's merge.
- THE CHECKS (local, run whole on 4e876c33a, the final code tree; the four FAILs are section 12's machine reds — `scripts/` 477/478 and component 2749/2750, NH-6 the one red in each):

  ```
  checks (fast): 17 PASS · 4 FAIL · 266s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
  checks: 24 PASS · 4 FAIL · 30 NOT RUN · 321s
  ```
- This pull request's own runs: read after the push with `gh pr checks 19`; each red, if any, is classified (rule 40) and answered in a new commit that updates this section.

## 12. Limits

- THE CHECKS on this arm64 Mac: four FAILs are machine reds, each read in its log — `laws-first › scripts/ tests first` and `component-tests` fail NH-6 alone (`scripts/ci/nightly-hour.test.ts`, the machine cannot resolve New York's zone); `build-and-check › Workflow lint` (the pinned linux_amd64 actionlint: "the bad fixture failed for another reason") and `secrets-scan` (the pinned linux_x64 gitleaks; its log holds the checksum OK and the commit range, no finding) cannot execute here. The steps the actionlint FAIL skipped were run by hand: typecheck clean; `bun run lint` 0 errors, 46 warnings, none in a touched file; `bun run format:check` clean; the e2e selector self-test OK; root route names OK; `bundle-budget` built and passed (every page under its ceiling; the NEAR band "0 NEAR, none grew" against cfecc476f). Pages that moved since cfecc476f by more than 0.1 KiB: `/post`, `/my-listings_/$listingId_/edit`, `/admin/screening`, `/my-listings_/$listingId` +0.3; `/post_/$listingId`, `/my-listings`, `/admin/listings_/$listingId_/edit` +0.2 (earlier rulings' pages fell: `/admin/translations` −122.9, `/admin/roles_/$roleId` −48.5, `/admin/listings_/$listingId` −48.2); the tightest headroom is 0.5 KiB (`/post`, `/my-listings_/$listingId_/edit`, `/admin/listings`), none inside the 0.3 KiB band, so no ceiling moved. NOT RUN by the runner, each with its reason in its line: dependency-audit (the advisory service is not reachable), e2e-preflight and the e2e merge (staging credentials / the browser lanes), promote (CI only), the SARIF upload (GitHub only), the installs (no package change).
- `scripts/check-acceptance-doors.ts` and `scripts/check-caller-gates.ts` need a live catalogue TSV: CI's smoke lane judges them.
- The browser check's local reds that are not this turn's (section 5: 14 from `Control+A` on macOS, 2 from PP-8's storage) leave CI as the proof for AL-20, AL-23, AL-30, SC-25, SC-26, MLA-13, MLP-6 and PP-8.
