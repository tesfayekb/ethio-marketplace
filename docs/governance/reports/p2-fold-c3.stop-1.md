QUESTION — p2-fold-c3 step 1: the census, before any change
DONE: step 1 (census, read only; no repository file changed but this one)
LEFT: every part (the Reach section, the housekeeping, the siblings, the usage maps, the checks,
the budgets, the self-review, the report)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `588690676bd6a01ba62af361b54ff27cd48384c2` (short `5886906`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-09T08:05:31Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42581039358
FILES:
docs/governance/reports/p2-fold-c3.stop-1.md

Base: cursor/p2-fold at 588690676 (HEAD = origin/cursor/p2-fold = 588690676; dev f2d558467 merged
in at d5d6796c4). Every line number below is at 588690676.

CI as read (raw ci-evidence, run 42581039358 on 588690676, a report-only commit): two reds, both
GitHub 504s while fetching tools — "i18n used-on map is fresh" (`Error: Unexpected HTTP response:
504` at setup) and "Gitleaks secrets scan" (`curl: (22) … error: 504` on the download); 34 jobs
success, promote skipped. e2e-last-failure: "last E2E run 42581039358 passed". local-backend-proof
(commit 4c86f89e5, the PR's merge ref): the smoke, email and repeat lanes each applied 436/436,
Failed 0, Flaky 0. The code
is judged on 0f906f25c (run 42578592846, SUCCESS, every job, Flaky 0), as the GO states. No other
red; nothing re-run.

Scratch: /tmp/ethio-scratch/p2-fold-c3/ (build.log, budget.log, page-chunks.mjs, all-pages.mjs,
aip.ts, strings-candidate*.json, ci-*.md), the operator's to remove; also a stray empty
/tmp/ethio-scratch-sn.ts made by mistake (outside the repository; my tool refuses `rm`).

## 1. The Reach section

**The doors.**
- `promote_options` (20261107125357_cf82e13d…): `'reach'` = {key (listing_effective_reach), until,
  source, included}; `'reaches'` = every enabled self_serve reach row {key, name_en, name_am, sort,
  current, below, days, amount, currency, availability}. Availability, in order: includedReach (key
  = market.included_reach) → unknownReach (the ad's reach sort NULL) → sameReach → lowerReach (sort
  ≤ current) → notOffered (no price) → available. creditsNotAvailable is never an availability; it
  is the setter's answer.
- `set_listing_reach` (20261104153959_307e79c4…, its only declaration), refusal order: notSignedIn →
  assert_caller_active ('account is deactivated') → listingNotFound (FOR UPDATE) → notLive →
  rateLimited (rate_gate 'promote') → unknownReach → listingNotPlaced → market_settings_for
  (marketNotSet) → includedReach → unknownReach (current row missing) → sameReach (USING DETAIL
  reach_until) → lowerReach → notOffered → creditsNotAvailable. Success writes reach, reach_until =
  now() + days, reach_source 'launch', used_count + 1, a revision and the audit 'listing.reach_set';
  answers {ok, reach, until, source}.

**The sheet as built.**
- promote-service.ts (179 lines): LEVEL_AVAILABILITY :20; parseLevel :63; parsePromoteOptions :94
  (reads levels only, ignores reach and reaches); readPromoteOptions :128; REFUSAL_KEY :137–151;
  promoteRefusalKey :154; availabilityKey :160; setListingLevel :167.
- promote-sheet.tsx (233 lines): PromoteSheet :40 (useQuery `authKey("promote-options",
  listingId)`, `onDone(until)`); LevelList :90 — the sameLevel refusal from the fresh read's
  level.until :106–111, `choosable` :138, `promote-empty` :143–144, rows :150–163 (CARD_SURFACE,
  `aria-current` :156 with LIST_ROW_CURRENT on the same `<li>`), `promote-until` :173; LevelEnd
  :192 (promote-current-/promote-reason-/promote-choose-, the button min-h-11); readErrorKey :230.
- promote-sheet-lazy.ts: `resilientLazy(() => import("./promote-sheet"), "the promote sheet",
  () => null)`.
- The callers draw the done notice with the level's words: my-listing-page.tsx:326
  (`fill(t("myListings.promote.done"), {date})`, sheet :849–853) and my-listings-page.tsx:436
  (sheet :943–949).
- levels-store.ts / level-table-read.ts read `.eq("kind","level")` (:31): no reach rows anywhere in
  the browser. `levelNameOf(names, language)` (level-fields.ts) takes {nameEn, nameAm} and fits a
  reach row unchanged.

**The strings** (landed in c1, no callers yet, not in the usage maps): en-member.ts :668–701 /
am-member.ts :645–676 — `myListings.promote.reach.{title,hint,current,included,choose,done,empty}`
and `myListings.promote.error.{sameReach,lowerReach,unknownReach,includedReach,reachNotOffered}`.
The generic `myListings.error.{rateLimited,deactivated,notYours,failed}` and `door.refused` sit in
en-base/am-base.

**door-codes.ts.** `DOOR_CODES` lacks unknownReach, sameReach, lowerReach and includedReach, so
`doorCode` answers null for all four today. `doorCode` reads the message `code[:detail]` only; a
RAISE's DETAIL arrives in PostgREST `details`, which it does not read.

**Tests and exact lists that pin the sheet.**
- promote-sheet.test.tsx PMS-1…8: the fixture `options()` has no reach/reaches; PMS-7 asserts
  `[...document.querySelectorAll('[aria-current="true"]')]` `toEqual([current])` — a second current
  row (the reach) breaks it.
- promote-service.test.ts PMV-1…6: ANSWER has no reach/reaches; PMV-2 `parsePromoteOptions(ANSWER)`
  not null; PMV-4 is the exact list of REFUSAL_KEY's codes.
- door-codes.test.ts: DRC-4 the first five and uniqueness; DRC-6 the family by `toContain` (not an
  exact list).
- e2e/my-listings-promote.spec.ts (544 lines) LVP-1…4: a local scratchMarket on the default included
  reach; DESIGNATION lacks the reach columns; the trace is row + revisions + audits.
- e2e/my-listings-levels.spec.ts: LDR-7 (:610–663) exact `toEqual` on answer.reach and the scratch
  reaches; the scratch reach rows are local — `REACH_PREFIX = "e2e_lvl_r"` :65, `scratchReaches`
  :279–320 (self-serve rows, the included reach set to the middle one), `selfServeAbove`,
  `includedReach`.
- e2e/my-listings-page.spec.ts:693–701: the row menu's exact list (unchanged by c3).
- holds-its-box-allowlist.txt: three LazyPromoteSheet lines (unchanged while the sheet stays put).
- choice-lists-allowlist.txt: only the location-selector line; the reach rows' mark must be
  LIST_ROW_CURRENT + aria-current on one element (CF-LIST-1).
- docs/features/my-listings.md:223 names PMV-1…6, PMS-1…6, LVP-1 (stale against PMS-7/8 already).

## 2. The housekeeping

**INC-1037.** scripts/admin-tables.test.ts:246, TBS-2: `GOOD.replace("<ColumnsButton />",
"<ColumnsButton />")` is a no-op; the plant is the second `.replace`. One-line removal.

**INC-1040.** scripts/check-migrations.sh :686–837, the real-row guard: tables auth.users and
public.(user_roles|profiles|user_directory|locations|categories|attributes) — no countries,
languages or currencies; REAL_ROW_FLOOR 20261007000000; allowlist (49 lines) keyed per statement
`file | head-or-sha256:<16 hex of the head> | reason | until`; fixture
scripts/fixtures/bad-real-row-proof-example.sql, self-tests :755–814. A scan for SELECT … FROM
public.(countries|languages|currencies) … ORDER BY … LIMIT 1 inside DO blocks finds 25 statements in
22 files from the 20261007 floor (the two 20261009 hits are false positives: they pick an unused
code via unnest). From 20261102 on, nine sites in eight files:

| File | Line(s) | sha256 of the file |
| --- | --- | --- |
| 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql | :296 (currencies) | 79e44a3fe5977c1be603ebb395ecbd42c35b2d0d3038124aeeefecf7b9fccc91 |
| 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql | :244 (currencies) | 551f722777c90c7076039eb319fc2366243f512e2a055b566cf89d754130bc98 |
| 20261104124958_c072fd66-6ee4-46cd-a459-3e6fd577cff3.sql | :255 | 47f1535e45bdb3db5cbd71a24583490e6aa25e125912839006a2458ff37716be |
| 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql | :139 | dfa3b07c8207823804c1f39a71fcb688ac290ba1a0952305c198fbfc9d7dfd42 |
| 20261104153959_307e79c4-b771-411a-a3da-a71a16bd26bd.sql | :161 | 0a3002ce14643ee562b984f6f51b93483f4c90f0be534fc25ec15129fb59dcd5 |
| 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql | :286, :297 (WHERE enabled_public) | ee41722c2d69cbaf4700b7ae82a0886b286781c76879ec9683c66b4dae42ad25 |
| 20261105080111_811e9980-bd23-4b73-bb84-b1d8eeb5a3d4.sql | :145 | f8e3f88d2a72942aa18d411f9d9287ac8d891be6e3d2601dd431390fe83a6560 |
| 20261106233808_bc86fa74-d073-4c1d-8250-f767b6251152.sql | :123 | 75a6bd836b9733768d57da148f7834a567905e51bf9de466f14ccffb4aa899a2 |

INC-1040's own entry (incidental-findings.md:5797) says "files stamped after 20261102", tables
"countries, languages, categories or locations without a scratch-key predicate (no allowlist: new
files only)".

**#431** (Semgrep detect-non-literal-regexp): scripts/check-outbound-calls.ts:60,
``new RegExp(`^\\s*${key}\\s*=\\s*\\[([^\\]]*)\\]`, "m")``, called with "schemas" and
"extra_search_path" only — two literal RegExps replace it.

**#432** (Semgrep unsafe-dynamic-method): src/server/jobs/route.ts:69 `await JOBS[job](admin, run)`,
after `job_run_claim` (:60). JOBS is `Readonly<Record<JobName, Core>>`; `ownValue<V>(map, key):
V | undefined` (src/lib/own-key.ts). Tests: src/routes/api/public/jobs.test.ts NCJ-1…9.

**PR #11's regex** (Semgrep #439, detect-non-literal-regexp): scripts/conformance/perm-vocabulary.ts
:59 (dev's :47), ``const insertOpener = (table: string) => new RegExp(`insert\\s+into\\s+public\\.
${table}\\b`, "gi")``, used for "resources" (:107) and "permissions" (:123); `insertStatements(sql,
table)` is exported (tests :89–90, PV-1…7). `DELETE_RESOURCES` (:60) is already literal.

**INC-1083** (computed bodies). scripts/conformance/migration-reader.ts `lastDeclarations` :203
blanks DO blocks, so a function whose last event is an `EXECUTE format('CREATE OR REPLACE FUNCTION
public.<fn>(%s)…')` inside a DO block keeps its previous (stale) body. seller-names.test.ts
`latestBodies` (:24–33) uses its own regex over the whole text and takes the template's `%s` as the
body. The functions whose last event is computed:
- template naming the function: admin_import_translations, admin_undo_import (20261029024619);
  admin_commit_attribute_import (20261029024340); admin_undo_attribute_import (20261029024420);
  admin_commit_category_import (20261029022748); admin_undo_category_import (20261029024207);
  admin_commit_location_import, admin_undo_location_import (20261029024515); edit_my_listing
  (20261107125359:60; also 20261105080108:253);
- `%I` with a literal argument: public_listing_json (20261108070505:69, 20261108112436:73);
- a built string no template names: attr_import_plan — 20260908111546:53, 20260909034642:44,
  20260910042749:41, 20260910045047:65 patch the live text (`pg_get_functiondef` → replace →
  `EXECUTE v_src`/`v_new`), and 20261017093039:415 assembles it from `migration_text_parts` chunks
  (`EXECUTE v_text`). The reader returns attr_import_plan from 20261017092635 (line 52, 17,910
  chars), not the assembled body: an eleventh stale body (premise 9.4).
Simulation (scratch, no file changed): both readers find the same 19 seller-name readers today;
giving the ten template-named functions an empty body changes no finding of designationFindings,
admittedWriters, sqlWriteFindings, envelopeDoors (20), stableRaisers (89) or statusMapFindings.
Outside the reader: scripts/doors/catalogue.ts reads per-file `declarationsOf`, and judge.ts
:104–154 reads bodies for gates and door_refuse codes; manifest.txt names all nine doors. The
reader has 11+ importers; MGR-1…5 are its tests.

**FE-13.** e2e/feed-index.spec.ts:426–435: the key list lacks `listings_with_wrong_look`
(feed_index_check redeclared at 20261108070501) and `sold_shown`. The sweep answers
feed_index_check(NULL) || {queued, sold_left_feed} (20261019223105:163).

## 3. The siblings

**The alias helpers.** e2e/helpers/alias-check.ts: `scratchAlias()` :52, `expectAliasAccepted(page,
alias)` :100 (fills, waits for POST /api/listings/alias, then the tick).
- post-wizard-place.spec.ts: waits :447, :565, :739, :1441; names :443, :564, :737, :1440 (moved from
  the brief's lines; same four sites).
- post-wizard-bundle2.spec.ts: waits :525, :592, :663, :774, :800, :848, :937, :972, :1698, :1744;
  names :503, :773, :936, :971 (unchanged). Fit the helper: :774, :800 (cocacola_), :937, :972,
  :1698, :1744 (eseller…). Do not fit: :525 (after typeNames()), :592 and :663 (a suggestion
  click), :848 (pressSequentially, delay 40, typed key by key on purpose).

**marketName.** src/features/admin-monetisation/use-monetisation-names.ts:31 `if (!market) return
code;`; tests MNN-1…3. The new key `admin.monetisation.market.unknown` joins en-admin/am-admin
beside `admin.monetisation.market.*` (en-admin ≈ :1883). The strings file: no attachment reached the
disk; the chat text, extracted to /tmp/ethio-scratch/p2-fold-c3/strings-candidate.json with its
final newline, hashes to 749d6a48f732ff85c6688be77dc4520990543e759331e4ab719c22191a9b33e1, the
stated value. It is saved into docs/governance/briefs/ by scripted copy at STEP 0 of the build.

**INC-1091.** Bare `Control+A`, 11 presses in 4 files: my-listings-page.spec.ts:669;
admin-screening.spec.ts:1401, :1462; my-listings-ad.spec.ts:1008, :1024, :1044;
admin-listings.spec.ts:1462, :1475, :1567, :1685, :2136. `ControlOrMeta+A` is already used in three
byte-identical local `typePhone` copies (my-listings-ad.spec.ts:171, post-wizard-bundle2.spec.ts:83,
post-wizard-place.spec.ts:89). Guard model: scripts/conformance/layout-reads.test.ts on kit.ts (a
`.test.ts` census needs no wired.test.ts line).

## 4. Every list a new or retired name must join

- `DOOR_CODES` (src/lib/door-codes.ts) + door-codes.test.ts (new DRC-7): the four reach codes.
- `REFUSAL_KEY` (promote-service.ts:137) + PMV-4's exact list: the reach codes and
  reachNotOffered.
- PMS-7's single-current assertion; PMS/PMV fixtures gain reach and reaches.
- LDR-7's exact `toEqual` if the scratch reach helper moves (Q4).
- en-admin.ts / am-admin.ts: `admin.monetisation.market.unknown` (from the strings file).
- docs/generated/i18n-usage.json and public/i18n-usage.json: the twelve reach keys gain callers, the
  new admin key.
- check-migrations.sh's real-row allowlist (Q5) and its self-tests; a new fixture beside
  bad-real-row-proof-example.sql.
- seller-names (and the reader's skip list, Q6); MGR-6… in migration-reader.test.ts.
- e2e/feed-index.spec.ts:426–435's key list (FE-13).
- The select-all census's allowlist (new, kit.ts grammar; expected empty).
- scripts/test-ids.ts: ids free — PMS-9, PMV-7, LVP-5, MGR-6, MNN-4, NCJ-10, PV-8, DRC-7, SAC-1.
- docs/features/my-listings.md:223 and docs/features/e2e-harness.md (the select-all line).
- No route, door manifest, budget or holds-its-box line changes.

## 5. First-download numbers (lock-exact build at 588690676, `bun install` no changes)

| Page | Reading / ceiling (KiB) |
| --- | --- |
| /my-listings | 321.8 / 323 |
| /my-listings_/$listingId | 329.8 / 331 |
| /l/$slug | 263.7 / 265 |

"Bundle budget OK." Computed with scripts/bundle-closure.mjs: none of the three carries the sheet,
door-codes.ts or auth-service in its first download — only promote-sheet-lazy.js. door-codes.ts is
its own chunk (557 B gzipped), in the first download of exactly four pages through auth-service:
/auth 229.6 / 231, /auth_/callback 216.1 / 217, /auth_/reset 218.0 / 219, /settings 283.2 / 284.
Four new codes grow those four by a few bytes (0.8 KiB or more from each ceiling, so no band is
reached), the one first-download growth this turn would make (Q2).

## 6. Premises found wrong

1. The sameReach refusal's date cannot come from the RAISE's DETAIL: `doorCode` reads the message
   only. The sheet takes the fresh read's `reach.until`, as LevelList does for sameLevel.
2. On the real catalogue the included reach (`city`) is not self_serve, so it is absent from
   `reaches`: a fresh ad's sheet lists no current reach row, and its name is known nowhere in the
   browser (the levels store holds levels only). Naming it needs a door change (a migration).
3. The done notice is drawn by the two callers with the level's key, not by the sheet.
4. INC-1083's "a function whose last event is computed" is not detectable for attr_import_plan (a
   built string); a marker over templates leaves it stale.
5. The 20261102 floor reaches nine sites in eight files, all from the P-1/P-2 turns; the brief's
   table set (countries, languages, currencies) differs from INC-1040's text (countries, languages,
   categories, locations — the last two already in the old rule).

## 7. Questions no ruling answers

- **Q1 — the done notice.** Proposal: `onDone(until, doneKey: MessageKey)`; my-listing-page.tsx:326
  and my-listings-page.tsx:436 pass it to `fill(t(doneKey), {date})`. Two files outside the named
  files (their own tests ML-U*, the page specs, unchanged in assertions).
- **Q2 — DOOR_CODES.** Add the four reach codes to src/lib/door-codes.ts and DRC-7, with the few
  bytes on /auth, /auth_/callback, /auth_/reset and /settings named. Yes?
- **Q3 — the refusal words.** One mapper with a kind: reach overrides notOffered →
  `error.reachNotOffered`; creditsNotAvailable ("Paid levels are not open yet.") and marketNotSet
  stay level-worded for the reach (no reach key exists; no-new-string beyond the strings file).
  Accept?
- **Q4 — the current reach not in `reaches`.** For c3: the section marks a current row only when
  the door lists it, and draws no current row otherwise; a records line asks the door to answer
  the current reach's names (a migration turn). Accept, or STOP for the door?
- **Q5 — the row marks.** Proposed: current → "Current reach" with "Until {date}" (`promote-until`
  form); availability includedReach → "Included" (wins over below); below → "Not available";
  unknownReach/notOffered → their reason keys; available → "Choose reach" (min-h-11). Test ids
  `promote-reach-${key}`, `promote-reach-choose-`, `promote-reach-empty`. Accept?
- **Q6 — INC-1083's design.** Proposal: `lastDeclarations` gives a function whose last event is a
  template (`public.<fn>(` in a format() string, or `%I` with a literal argument) `computed: true`
  and body ""; one named list in migration-reader.ts (name → reason; stale names fail, MGR-6…)
  holds attr_import_plan by hand; seller-names moves onto the reader and skips computed names with
  the reason; the other consumers inherit the empty body (simulation: no finding changes).
  scripts/doors/catalogue.ts and judge.ts (`declarationsOf`, outside scope) stay as K2 with
  check-doors --live the authority. Accept, and is seller-names-allowlist the place instead?
- **Q7 — the scratch reach rows.** Move `scratchReaches` and `REACH_PREFIX` from
  my-listings-levels.spec.ts:65/:279–320 into e2e/helpers/ (new file) and re-point LDR-7 (that spec
  run whole), or a second local copy in my-listings-promote.spec.ts? Proposal: move.
- **Q8 — INC-1040's allowlist and rule.** The ruling's by-file line (`<sha256 of the file> | reason |
  INC-1040`) is a new key form beside the per-statement grammar. Options: (a) nine per-statement
  lines in today's grammar; (b) a `sha256-file:<64 hex>` key read by real_row_split only for the new
  rule, self-tested. And the rule: SELECT … FROM public.(countries|languages|currencies) … ORDER BY …
  LIMIT 1, files from 20261102000000, no `e2e-mig-` key in the statement. Which form and tables?
- **Q9 — the four alias waits** (:525, :592, :663, :848) that do not fit `expectAliasAccepted`:
  leave them named, or a variant `waitAliasAccepted(page)` (no fill)?
- **Q10 — #432's unknown job.** The lookup moves before `job_run_claim`; `ownValue(JOBS, job)`
  undefined answers the route's existing refusal (its constant 401) with `[job-refused] unknown`,
  nothing claimed (NCJ-10). Accept?
- **Q11 — FE-13** also adds `sold_shown`. Yes?

## 8. K2 (reported, not touched)

- scripts/doors/rows.ts:137, :139 — Semgrep #443, #445 (detect-non-literal-regexp); 99 interpolated
  RegExps in the tree.
- screening-page.tsx:184–186 and listings-page.tsx:202–204: byte-identical marketName copies.
- The three `typePhone` copies (my-listings-ad.spec.ts:171, post-wizard-bundle2.spec.ts:83,
  post-wizard-place.spec.ts:89).
- set_listing_reach :59–64 resolves `coalesce(v_row.reach, v_market.included_reach)` inline (c1
  report :191, for M-3c-b).
- scripts/doors/catalogue.ts / judge.ts read stale bodies for the nine computed doors (Q6).

## 9. Limits

- The run on 588690676 completed during the census (read above); no run exists for this report's
  commit yet.
- The browser tests were not run (a census turn). The three E2E names are set (tested by name).
- No ruling file for c3 yet; the strings file is checked against its sha256 but not yet saved.
