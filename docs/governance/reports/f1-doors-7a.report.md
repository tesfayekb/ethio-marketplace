# F1-7a — the shell's rate limit and the readers on the door mechanism — report
Base: dev 470135181 · Final commit: 9aa72d351 (the last code commit; the report commit follows it) · Brief: docs/governance/briefs/f1-doors-7a.md (rulings: f1-doors-7a-ruling-1.md; f1-doors-7a-ruling-2.md, sha256 a627614fc2a4ec6ba775a44d25cdc861155f7d6789287a198f399b95719904de, proved by `sha256sum` after the scripted copy; the types patch sha256 b4f137da7a70e9f63979d10a3ebcda85b075f9f6884ee86c3ed9f103daf1b22d, applied by `git apply`)
Review: READY · 0 BLOCKER · 1 MAJOR · 3 MINOR · on 9aa72d3

The two halves of this turn ran in two chats (DEC-387): the first wrote the census, the ten migration files and
the checker's judgements and stopped at the migration stop (`f1-doors-7a.stop-2.md`); this chat (the second half)
wrote STEPS 3 to 7. Commits of the second half: `014ab2045 f1-doors-7a: ruling 2 saved`,
`bb44ba184 f1-doors-7a: the readers' clients and the reset time`, `9aa72d351 f1-doors-7a: the family's tests`.

## 1. Done / not done, by part and step
- STEP 0, STEP 1, STEP 2 (first chat): the census, the ten migration files, the checker's two judgements — see
  `f1-doors-7a.census.md`, `.stop-1.md`, `.stop-2.md`.
- Ruling 2 saved by scripted copy; its sha256 equals the stated value.
- STEP 3 done (commit `bb44ba184`): the types patch by `git apply` (four entries added, `listing_saved` removed; the
  file never edited by hand); the three routes on the `_read` names; the ad page's owner fact from
  `listing_viewer_state`; `reader-failure.ts` and `door-error.ts` (ruling 2, decision 11); the two `not your listing`
  sentence readers on the code; `doorAnswer`'s mapping retired; the INC-1170 comments rewritten; `price-basis.test.ts`
  (decision 10); the four `grant-without-caller` lines left the allowlist in this commit (decision 6).
- STEP 4 done (commit `9aa72d351`): the e2e ids of the census, PR-7 / AP-25 / AP-27 / VP-4 reading the reset time,
  `DR-RL-1`, LGC-6 on the gate's code from a real run.
- STEP 5 done: the gate (section 5); `check-go` no finding; the self-review (Review line above).
- STEP 6: one push of `cursor/f1-doors-7a` (no force) at `9aa72d351`; CI in section 11.
- STEP 7: this report.
- Not done, by rulings: INC-1213 (a reader's refusal at HTTP 500) and every file of F1-7c (`door.ts`, `answer.ts`,
  the one refusal reader); the words that draw the reset time (F1-7c's).

## 2. Files changed
`git diff --name-only 470135181 HEAD` at `9aa72d351` (64 files; `--shortstat`: 5534 insertions, 260 deletions):

```
docs/features/ad-page.md
docs/features/doors.md
docs/governance/briefs/f1-doors-7a-ruling-1.md
docs/governance/briefs/f1-doors-7a-ruling-2.md
docs/governance/briefs/f1-doors-7a.md
docs/governance/reports/f1-doors-7a.census.md
docs/governance/reports/f1-doors-7a.stop-1.md
docs/governance/reports/f1-doors-7a.stop-2.md
e2e/ad-page-doors.spec.ts
e2e/ad-page.spec.ts
e2e/auth-caller-gates.spec.ts
e2e/door-refusals.spec.ts
e2e/legal-certify.spec.ts
e2e/my-listings-ad.spec.ts
e2e/my-listings-doors.spec.ts
e2e/my-listings-page.spec.ts
e2e/posting-routes.spec.ts
e2e/viewing-place.spec.ts
roadmap.md
scripts/conformance/listing-seed-allowlist.txt
scripts/doors/catalogue.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/doors/manifest.ts
scripts/doors/manifest.txt
scripts/doors/policies.ts
scripts/public-surface-allowlist.txt
src/features/ad-page/save.test.ts
src/features/ad-page/save.ts
src/features/ad-page/use-saved-state.test.ts
src/features/ad-page/use-saved-state.ts
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/my-listings/my-listing-read.test.ts
src/features/my-listings/my-listing.ts
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/price-basis.test.ts
src/integrations/supabase/types.ts
src/lib/door-error.test.ts
src/lib/door-error.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/routes/api/attributes.$id.options.ts
src/routes/api/attributes.options.test.ts
src/routes/api/listings/identity.test.ts
src/routes/api/listings/identity.ts
src/routes/api/translate.route.test.ts
src/routes/api/translate.ts
src/routes/l.$slug.tsx
src/server/supabase/user-client.test.ts
src/server/supabase/user-client.ts
supabase/migrations/20261119150000_1b7e8a6b-7a49-469b-918b-36a244454c88.sql
supabase/migrations/20261119150100_7865816d-4bf9-4a6b-9070-a44199ee9c6e.sql
supabase/migrations/20261119150200_77d5acc2-e3af-4635-b249-05b712af1070.sql
supabase/migrations/20261119150300_89938bbb-1658-40d6-baac-74cb470ba6fd.sql
supabase/migrations/20261119150400_3f213ee5-6d1e-45c1-8f46-ab60d46d9c5b.sql
supabase/migrations/20261119150500_b7fcfe88-667d-405f-9018-bed6552edafb.sql
supabase/migrations/20261119150600_57fbc734-01db-4382-b05b-300b81dad61c.sql
supabase/migrations/20261119150700_1df56bcd-5038-457b-ab0f-07edd66ad4c1.sql
supabase/migrations/20261119150800_d09dae74-5af5-44b3-999b-6f297359409e.sql
supabase/migrations/20261119150900_3e96e1ab-64c5-47f3-8232-30f8fa1d2007.sql
```

New files (`git diff --name-only --diff-filter=A 470135181 HEAD`, migrations aside): the three briefs, the census, the two
stop reports, `scripts/doors/policies.ts`, `src/features/my-listings/my-listing-read.test.ts`; all tracked
(`git ls-files --error-unmatch` answered for the last and for ruling 2). The report is added after this list.
Of this half, `git diff --shortstat 014ab2045 HEAD`: 38 files, 587 insertions, 153 deletions. `origin/dev` moved
to `6c53e5062` (Lovable's #76) during the turn: section 10.

## 3. Behaviour contract — answer tables before → after
Database side (the migration, first half; details in `stop-2.md`): `rateLimited` from the gate is
`rateLimited:<resets_at>` (was bare `rateLimited`); a call refused for its rate limit no longer counts a second time
(`door_refused`); nineteen readers are on `door_context` (their gate codes `notSignedIn`, `accountDeactivated`,
`notYourListing`, `badValue:<field>`, `badSize`, `badValue:cursor` replace their sentences); three `_read` readers
and `listing_viewer_state` are new; `listing_saved` is dropped; seven readers and thirty-one helpers are closed.

Client side (this half):

| function / screen | at the base | now |
|---|---|---|
| `readerFailure` (`src/lib/reader-failure.ts`) | status first: any 5xx is `server`; sentences `not authenticated` → `auth`, `not your listing`/`unknown group`… → `refused` | the gate's code first: `notSignedIn`, `accountDeactivated` → `auth`; `notYourListing`, `notYours`, `badValue`, `badSize` → `refused` (also at status 500, which is how a reader's gate refusal arrives); the old chain for everything else; the trailing code list now cut at the first colon |
| `doorRefusal` (`src/lib/door-error.ts`) | `code[:token]` kept whole; any other message → `doorError` with the constraint detail | unchanged for a plain-token detail (`tooManyPhotos:10`, `rateLimited`); a head matching `[a-z][A-Za-z]*` with a non-empty tail cut at the first colon becomes `{ reason: head, detail: tail }` (`rateLimited:2026-11-19T21:00:00+00:00` → `rateLimited` + the instant); a sentence is still `doorError` |
| `readMyListing`, `readOwnPrivate` | `message.includes("not your listing")` | the code `notYourListing` cut by `splitRefusal` |
| `/api/attributes/$id/options`, `/api/translate`, `/api/listings/identity` | `get_attribute_options_version`, `translation_scope_ok`, `listing_contact_refusals` | the `_read` names; the answers the routes give are unchanged (their tests: names only, plus one `rateLimited:<instant>` case each where it can occur) |
| `listingSaved` (`save.ts`) | `listing_saved` → boolean | `listingViewerState` → `{ saved, owner }` or `null` (a refusal, a malformed answer or a transport failure is logged and unknown) |
| ad page (`l.$slug.tsx`, `use-saved-state.ts`) | the seller saw the heart on a reload and learned they owned the ad from a refused Save | the one signed-in read says `owner`: the seller is offered no Save and no Report on load; unknown (failed read) stays as it was |
| `doorAnswer` (`user-client.ts`) | mapped a returned `refusals[].resets_at` to `detail` | identity (section 10, item 2) |
| `use-screening.ts` `revealContact` | comment only | comment only (INC-1170) |

## 4. Censuses
- The refusal parsers (ruling 2, class 2 of its PREVENTION): `rg -n "includes\(\"not your listing\"\)|not your listing" src e2e` → at the base
  `src/features/my-listings/my-listing.ts:81`, `src/features/posting/posting-service.ts:353` (both moved onto the
  code) and the e2e sites in section 5; `rg -n "readerFailure\(" src --glob '!*.test.*'` lists the readers through
  `reader-failure.ts` (unchanged call shape).
- Every site that compares `rateLimited` exactly (ruling 2, decision 11): section 10, item 3.
- Decision 10's class census, the two commands as ruled:
  `rg -n "supabase/migrations" src e2e --glob '*.test.*' --glob '*.spec.*'` → `src/features/legal/legal-kinds.test.ts:18`,
  `src/features/admin-monetisation/monetisation-service.test.ts:40,43,47,51`,
  `src/features/admin-listings/tier-reasons.test.ts:30,32`, `src/features/admin-listings/history.test.ts:18`,
  `src/features/admin-listings/move-reasons.test.ts:12`, `src/features/posting/alias-rules.test.ts:40`;
  `rg -n "FUNCTION public\." src --glob '*.test.*'` → `tier-reasons.test.ts:36,37` (`admin_set_listing_tier`,
  `admin_set_listing_policy`), `monetisation-service.test.ts:370` (the seven monetisation doors by name),
  `legal-kinds.test.ts:20` (`legal_kind_signed_in_only`). Judged by function name against the ten files
  (`rg -l <name> supabase/migrations/2026111915*`): `admin_set_listing_tier` 0 files, `admin_set_listing_policy` 0,
  `legal_kind_signed_in_only` 1 (part 4 CALLS it three times, never declares or revokes it, so the test's
  `FUNCTION public.legal_kind_signed_in_only` filter still finds its own declaration); the seven monetisation doors
  are no function of this turn. The one hit that picked a file by a function this turn closed was
  `price-basis.test.ts` (`price_shape_for_basis`, part 9's REVOKE): corrected, red first. Then
  `bunx vitest run src/features/legal/legal-kinds.test.ts src/features/admin-listings src/features/admin-monetisation/monetisation-service.test.ts src/features/posting/alias-rules.test.ts src/features/posting/price-basis.test.ts`
  → 19 files, 151 tests passed.
- `listing_saved` / `listingSaved` after the change: `rg -n "listing_saved|listingSaved" e2e src scripts docs/features -g '!*.sql'` → comments naming it as the replaced
  function (`e2e/ad-page-doors.spec.ts:614`, `docs/features/doors.md:220`, `docs/features/ad-page.md:53,55`) and the
  allowlist line of `listing_viewer_state`; no call.
- `doorAnswer` producers: scanned the last declaration of every function for a body that names both `rateLimited` and
  `resets_at` and returns them in a `refusals` entry: none (section 10, item 2).

## 5. Tests
Ids added or changed, with the reason:
- Unit, added: `RF-1` (the ten gate codes at status 500 and code P0D01), `RF-2` (`badValue:a:b+c`), `RF-3` (non-gate
  codes keep their class) in `reader-failure.test.ts`; `DE-1` (instant detail), `DE-2` (first colon, whitespace),
  `DE-3` (strict head; sentences stay `doorError`) in `door-error.test.ts`; `MLR-1` (`my-listing-read.test.ts`, new
  file); `PSV-10` (`posting-service.test.ts`); `DAN-1` (`user-client.test.ts`, the identity; named `DAN-1` because
  `DA-1` is taken by `src/features/auth/deactivated.test.ts:16`, caught by TI-1); `SVS-1…SVS-8` (`use-saved-state.test.ts`,
  rewritten for the viewer's state).
- Unit, changed: `SAVE-4` (now `listingViewerState`: twelve logged failures and three valid states);
  `attributes.options.test.ts` (names; one `rateLimited:<instant>` 429 case); `translate.route.test.ts` (name);
  `IDT-5` in `identity.test.ts` (a `rateLimited:<instant>` case); `SF-9` in `use-screening.test.ts`; `price-basis.test.ts`
  (reads a declaration).
- Red-first, shown on the tree before the change: RF-1/RF-2 (the 500s classed `server`), DE-1/DE-2 (the instant became
  `doorError`), MLR-1 and PSV-10 (the sentence reader), `price-basis.test.ts` ("expected two CASE arms, found 0" at the
  head because part 9's REVOKE is the newest file that names the function). Not shown red: `DR-RL-1` — the red state
  is the base's `door_context` and `door_refused`, which ethio-staging no longer holds (I may apply nothing), so its
  proof is the green run on the new bodies and the first half's migration proof (b), which asserts the same facts.
- E2E changed or added (`bun run e2e:local`, outside Cursor's sandbox, 0 retries, `mobile-360` and `desktop-1280`):
  PR-7 (the `detail` is an instant still to come), PR-21, AP-4, LG-15, ML-2, MLA-1, MLA-2, MLA-6, MLA-7 (the code
  `notYourListing`), MLP-1, MLP-5 (`badValue:group|page|search|mark`), CG-2 (its not-pattern gains the two codes),
  AP-24 (the buyer's `{saved, owner}`, and the seller's `{saved:false, owner:true}`, replace `listing_saved`), AP-25
  (`listing_viewer_state` closed to anon; both refusals read the code, an instant still to come, and
  `saveRefusal`), AP-26 (the seller's reloaded page asks `listing_viewer_state` once, the answer is
  `{saved:false, owner:true}` and no heart is drawn; the old click-then-refused tail is covered at the door by AP-24),
  AP-27 (same reading through `reportRefusal`, and the meter reads 8 where it read 10: the two calls the dial refused no
  longer count — INC-1196; the title says so), VP-4 (the instant), LGC-6 (below), and `DR-RL-1` (new, `door-refusals.spec.ts`).
  Assertions that changed shape: LGC-6's status 401 → 500 and body code `42501` → `P0D01` with message `notSignedIn`
  (read from the run: the log of the first CI attempt showed `Received: 500`, and the run here matched it: status 500,
  `{ code: "P0D01", message: "notSignedIn" }`); AP-27's meter 10 → 8; AP-26's tail.
- AP-20 was in the census's list and is NOT changed: `reveal_listing_contact` has no `anon` grant, a signed-out call
  is `permission denied` before the gate, and the test passed in the previous CI run (it is absent from
  `e2e-last-failure.md`).
- The browser runs: `bun run e2e:local -- <the ten specs> --project mobile-360 --project desktop-1280 --retries 0
  --grep "(PR-7 |PR-21 |AP-4 |AP-24 |AP-25 |AP-26 |AP-27 |VP-4 |LG-15 |LGC-6 |CG-2 |ML-2 |MLA-1 |MLA-2 |MLA-6 |MLA-7 |MLP-1 |MLP-5 |DR-RL-1 )"`
  → `Running 38 tests`, 36 passed and 2 failed (AP-27, both projects: the meter 10 → 8 above); after the fix, AP-27
  alone in both projects: `2 passed (22.7s)`. Nothing else ran, and no changed spec file ran whole. `[ssr-error]`
  lines in the first run: 2, both `/api/listings/draft rateLimited:<instant>` (PR-7, one per project) — section 13.
  The first attempt to start the runner failed (no Playwright browser in this machine's cache): I ran
  `bunx playwright install chromium` as the rules name it; one orphaned server from an interrupted background start
  held port 4173 and I stopped that process (my own) before the real run.
- J-audit (for `e2e/**`): J1 `DR-RL-1` makes its own fresh account and its `rate_overrides` row is removed in the file's
  `afterEach` (a line added there) with the account; J3 no real row touched; J4 the dial's count and `door_refusals`
  are read through the service client, per user for the dial and at-least for the shared refusal row (as DRF-4); J5 no
  `.first()`, no `waitForTimeout`; J7 the window helper `inOneWindow(3600, …)` keeps the dial's calls in one hour; the
  AP-26 response wait is armed before the navigation.
- Totals: `bunx vitest run scripts --maxWorkers=2` → 124 files, 668 passed, 1 skipped; `bunx vitest run src --maxWorkers=2`
  → 406 files, 2806 passed; `bun run typecheck` and `bun run lint` clean; `check-doors` static: `check-doors static OK: 220 manifest lines reconcile with the migrations' catalogue`.
- `bun run checks` last line: `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 530s`; fast part: `laws-first › scripts/ tests first (INC-1030)` 95 s,
  `changed folders' unit tests` 51 s, `Semgrep ERROR on changed files` 8 s, all PASS. NOT RUN, each by its own reason in the log:
  scope › Lovable branch guard, Decide whether the lanes run, Index the code tree the lanes prove (GitHub's
  Actions API); build-and-check › Workflow lint (pinned linux/x64 binary), Install dependencies; bundle-budget,
  component-tests, e2e-preflight, dependency-audit › Install dependencies (the sandbox's dependencies are
  installed; a package change is its own turn); dependency-audit › Audit (the advisory service is not reachable);
  secrets-scan › gitleaks (linux/x64 binary); e2e-preflight › Cache bun install, Bun cache hit?, Migration parity
  preflight (it asks ethio-staging with credentials the script never holds); e2e › the five artifact and verdict
  steps (GitHub's); promote › four steps (only CI promotes); semgrep › Upload SARIF and its warning (GitHub's).
- First download (`bun run build && node scripts/check-bundle-size.mjs`, my machine's build, compared with the same
  build of `014ab2045`, the tree before STEP 3, in `/tmp/ethio-scratch/f1-doors-7a/base`, which is the operator's to
  remove). Entry `index` 141.7 KiB before and after. Every page's figure is in the tables I kept
  (`/tmp/ethio-scratch/f1-doors-7a/table.txt`); the pages that moved: `/account` 262.9 → 264.1 (+1.2), `/legal/publishing`
  206.3 → 207.5 (+1.2), `/l/$slug` 246.9 → 247.1 (+0.2), and +0.1 / −0.1 at `/account_/saved`, `/admin/ai`, `/admin/audit`,
  `/admin/listings`, `/admin/listings_/$listingId`, `/admin/listings_/$listingId_/edit`, `/admin/monetisation`,
  `/admin/screening`, `/admin/translations`, `/admin/translations_/$lang`, `/dev/primitives`, `/my-listings`,
  `/my-listings_/$listingId`, `/my-listings_/$listingId_/edit`, `/post`, `/post_/$listingId`; every other of the 50
  pages is unchanged to a tenth. Causes, chunk by chunk (gzip bytes of the built chunks, base → now): `reader-failure`
  635 → 728 (+93: the code-first classification) and it now statically imports the `refusal` chunk (1155 B, shared
  already by most pages), which `/account` and `/legal/publishing` did not carry before: that is their +1.2 KiB (1155 + 93 ≈ 1.2);
  `save` 817 → 870 (+53) and `l._slug` +37 are the ad page's +0.2 (with `use-saved-state`); `my-listing` +17,
  `my-listings` +5, `my-listings_._listingId` +5, `posting-service` +5 are the +0.1 of the my-listings pages; the
  admin pages' ±0.1 is `reader-failure`'s +93 B where it is carried, and the hash text of the chunk names the rest.
  No page is inside the 0.3 KiB band of its ceiling (the least room after the change: `/l/$slug` 2.9 KiB, then
  `/admin/roles_/$roleId` 3.5 and `/legal/publishing` 3.5), so no ceiling line changed.
- `check-go`: `bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-7a.md --at 470135181` → `[check-go] no finding`.

## 6. K2 — siblings that bypass the mechanism
Greps run: `rg -n "not your listing" src --glob '!*.test.*'` (sentence readers: none left in `src/`; `e2e/auth-caller-gates.spec.ts:259`
keeps the sentence in its not-pattern beside the code), `rg -n "isDeactivatedRefusal" src --glob '!*.test.*'`,
`rg -n '=== "rateLimited"' src --glob '!*.test.*'` (exact compares: section 10, item 3),
`rg -n "error instanceof Error \? error.stack : error" src/server`.
- `src/features/auth/deactivated.ts:37` `isDeactivatedRefusal` reads the sentence `account is deactivated`; the gate now says the
  code `accountDeactivated`. It has no caller outside its test (`rg -n "isDeactivatedRefusal" src --glob '!*.test.*'` →
  its own declaration only). Left (F1-7c's refusal reader replaces such readers); INC-1188 is the open record.
- `src/server/answer.ts:164` writes `${error instanceof Error ? error.stack : error}`: an error that is a plain object
  (a Supabase error value) becomes the text `[object Object]` (the 44 lines of the translate shards; the literal
  text is nowhere in the source, so `rg "\[object Object\]"` finds nothing). The file is not in this turn's scope
  (ruling 2's "ALSO RULED": elsewhere → §13). Left.
- `src/server/door.ts:50` compares `refusal.reason === error.message.trim()` to decide a refusal is known: section 13.
- Other readers of `readerFailure`'s old classes: none found outside `reader-failure.ts` and its callers.

## 7. Allowlists and guards
- `scripts/doors/check-doors-allowlist.txt`: the four `grant-without-caller` lines left (decision 6), in the commit that moved
  their callers; `check-doors static OK` after. Count before → after: 4 lines → 0 of that kind (header comment updated).
- `scripts/conformance/listing-seed-allowlist.txt`: two lines re-pointed (`e2e/ad-page-doors.spec.ts:325` → `:338` and `:330` → `:343`,
  the lines the two inserts moved; reason and until unchanged); CFS-1 failed on the stale pair and passes now. Count 2 → 2.
- No other allowlist line added, removed or re-aimed in this half. Guard self-tests: `check-doors self-test OK: 12 finding kinds fired on their planted fixtures, the clean pair fired nothing`.
- The i18n usage maps: no `t(` key moved (`i18n:map-guard` printed "usage maps match the tree" in every `e2e:local` start); no map committed.

## 8. Strings
None: `git diff --name-only 470135181 HEAD | rg "src/i18n"` → 0 paths. The words that draw the reset time are F1-7c's.

## 9. Migrations
The ten files are unchanged since the migration stop (`git diff --name-only 106b62b49 HEAD -- supabase/migrations` is empty);
their sha256, recomputed here with `shasum -a 256`, equal the stop report's table. The ledger marks are the files' own
`migration_marks` values (the file names carry the earlier timestamps; the stop report has both):

```
apply 1b7e8a6b → expect mark 20261119170000   (b61cef9b6a829e25947a795d4fecfe76be795fee31ad05b1b7b83058e36464cf)
apply 7865816d → expect mark 20261119170100   (7395fcc2cf3eee7a162d24538954c7d980b812f61f358461d9b499e9cc936543)
apply 77d5acc2 → expect mark 20261119170200   (e8b092415ac78a6ba9c1c7278262c622d70c0039e021c6550b64c2de8f7d1de3)
apply 89938bbb → expect mark 20261119170300   (95ecf5404f2d3ea0ded107f45c8154755fa9ca886ee2e5af3db0919c2db11d6b)
apply 3f213ee5 → expect mark 20261119170400   (96b8249d71337237dffa39f4d5912528ee175882721576cc9e07212fd656e545)
apply b7fcfe88 → expect mark 20261119170500   (19a3e802dfd63a4bc5a58601ef4dc63df6a8227ca548b3dced30a354e38bc7bc)
apply 57fbc734 → expect mark 20261119170600   (637485cce2673a77365af5a2a5fb038a7c2a4c7bc01869d491fa1c286e8409bb)
apply 1df56bcd → expect mark 20261119170700   (d049246d6267c504b149616d72f0f06f95a6e35b4a8069cef909044d6e1b0fe3)
apply d09dae74 → expect mark 20261119170800   (10113983f0158b3eccf06dfc5ab3fa423fe0266ade1c7fd2d76891990ee17b2d)
apply 3e96e1ab → expect mark 20261119170900   (e68f8d832ad16ed663b78b18f7ca5cf256f3516b80fcc5ae476f24b877b81f2b)
```

Full file names are in section 2. ethio-staging holds all ten (the supervisor's read-back, ruling 2). The same pairing lines
are the production apply's, in this order; the production order, as ruled: files 7 to 10 and the Publish are done back to
back: between them the published client calls three closed names and one dropped one.

`bun run db:proof --fresh` from the final tree, its last line: `db:proof PASS — applied 532/532, CLI 2.120.0, cold, 57 s`.

## 10. Departures
Every STOP and ruling of the turn: stop 1 (over forty bodies; the cut by class) → ruling 1; stop 2 (the migration stop) →
ruling 2; no STOP in this half. Decide-and-name items of this half:
1. **doorRefusal keeps its joined form for a plain-token detail and splits only where the old strict pattern refused.**
   Ruling 2 says "takes a refusal as code and detail by the FIRST colon". Splitting every `code:detail` would have changed
   `door.test.ts` DC-2 and `door.ts`'s no-log compare (`door.ts` is F1-7c's, outside SCOPE) and the screens that read
   `reason === "rateLimited"` with a bare `rateLimited` (`use-draft.ts:425`, PR-49, PW-41). Result: `tooManyPhotos:10`
   and a bare `rateLimited` are byte-identical to the base; `rateLimited:<instant>` and any other tail the old
   pattern refused become `{ reason: head, detail: tail }`, the head under the strict pattern `[a-z][A-Za-z]*`, the tail any
   character. The consequence is section 13's first item.
2. **`doorAnswer`'s mapping retired, not re-aimed.** A scan of every function's last declaration for a body naming both
   `rateLimited` and `resets_at` finds the gate and `reveal_listing_contact`, whose flat `{ ok, reason, resets_at }` is no `refusals`
   entry and is read by the ad page itself. The shell raises the detail in the message. The function stays as the
   identity because `door.ts` and `answer.ts` call it (F1-7c's); its test `DAN-1` pins the identity.
3. **Every site that compares `rateLimited` exactly, code or whole message** (the census's list): PR-7 compares the
   route's `reason` (the code) and now also reads its `detail`; PR-49 and PW-41 compare `reason` (the code), unchanged;
   AP-25, AP-27 and VP-4 compared the whole message and now cut it with `splitRefusal` and compare the code (AP-25 and AP-27 also read it through
   `saveRefusal` / `reportRefusal`, the family's own reader); `use-screening.ts` `revealContact` reads the code through `readRefusal`;
   the draft route's wizard (`use-draft.ts:425`) reads `reason` and `detail`, unchanged; `import-security.spec.ts:834`
   compares a route body's `error` (a route's own dial, not the shell's), unchanged; the returned flat answer of
   `reveal_listing_contact` (AP-22) carries `reason: "rateLimited"` and `resets_at`, unchanged. The `src/` compares
   found by `rg -n '=== "rateLimited"' src --glob '!*.test.*'`: `l.$slug.tsx:166`, `use-screening.ts:364,396`,
   `use-draft.ts:425`, `geocode.ts:44`, `report-ad-dialog.tsx:73`, `listing-detail.tsx:794,1522`, `step-where.tsx:2129–2230`
   compare a route's or hook's own `reason`/state (the code, never the message); `refusal-tail.ts:38` and
   `admin-listings/listings-page.tsx:317` compare a code that `splitRefusal` / `doorCode` cut at the first colon,
   so a detail after it changes nothing there.
4. **The reader-failure placement.** The gate's code is read first, before the status test: `gateCodeOf` cuts the message at the first
   colon with `splitRefusal`; the two `auth` codes and four `refused` codes are named sets; the old chain is kept below
   them as it was. No new reader module (INC-1189 is F1-7c's).
5. **The ad page's `ownAd` kept.** `ownsAd = ownAd || viewerOwns`: a refusal that proved ownership first still hides the
   controls; the viewer's state does it on load. A failed read is unknown, never "not the owner".
6. **Per-screen, the generic line appears nowhere new** (the claim, with its proof): every code the readers raise that a screen reads by
   class is in `RF-1`'s list at status 500; a code with no words of its own draws the family's generic line as before
   (`ARF-*` in `ad-page-refusals.test.ts`, unchanged). Between the production apply and the next Publish the published
   pages may draw the generic line for a refusal of this family: expected, ruling 2, class 4.
7. **AP-20 left as it stands** (section 5). **AP-27's meter 10 → 8** and **LGC-6's status** are listed there.
8. **`origin/dev` moved** from `470135181` to `6c53e5062` (Lovable's #76, `monetisation-price-path`) during the turn.
   `git diff --name-only 470135181..origin/dev` (26 files: the monetisation admin, the order strip, the locale files, the
   two usage maps, `sections.test.ts`) shares no path with this lane's diff (`comm -12` of the two sorted lists is empty),
   `gh pr view 75` says `MERGEABLE`, and I merged nothing.
9. **Process lapses, disclosed:** a one-off `python3` heredoc script for two edits, `sed -i` and one `perl -0pi` call for
   mechanical line edits of test and allowlist files, and one `cat >>` heredoc that appended `DR-RL-1` to its spec,
   where the edit and write tools were the right ones. Each result was read back and is in the diff above; I
   used the edit tools for everything after.

## 11. CI
Base (dev) at the start of the second half: the previous run on this lane, `cda0840` (first half), concluded SUCCESS
(`ci-status.md`, run 44527801180, completed 2026-11-19T12:59:36Z) — the lane's own migration-stop run; the reds expected
on it were the ids of this half (section 5). The runs listed by `gh run list --branch cursor/f1-doors-7a` before the
push were `44552590552` and `44593520490`, both `failure`, the migration stop's.
This pull request's run on `9aa72d351` (my last code commit), run 44607286456, attempt 1:
`gh run view 44607286456 --json conclusion,headSha,status` → `success`, headSha `9aa72d3512092a5533e1193f61b5036ec8ce2ed4`, `completed`;
`gh pr checks 75` → 43 pass, 1 skipping (`Promote to main (fast-forward on green)`, which runs only on dev); no red, so no
re-run and no further code commit. The lane's `ci-status.md` on `ci-evidence`: Commit `9aa72d3512092a5533e1193f61b5036ec8ce2ed4`
(short `9aa72d3`), Conclusion SUCCESS, Completed 2026-11-19T20:34:34Z, the same run (the two-step check: conclusion, then the
commit equals the one judged). `e2e-last-failure.md`: "last E2E run 44607286456 passed"; the repeat lane repeated 26 of 194
tests (specs directly changed 3 of 10, importers of a changed helper 0 of 0; budget 643 s) — the other changed specs ran in
their lanes once at 0 retries, and I cannot say from the file which three were repeated (its spec table names `repeat`
among the lanes of `ad-page-doors.spec.ts`, `auth-caller-gates.spec.ts` and `door-refusals.spec.ts`). Two flaky passes on retry (DEC-030, non-gating), both
outside this lane's paths: `submenu-look.spec.ts › SMN-E13` (`desktop-1280`, shard 2: five lines in `flake-ledger.md` since
2026-11-12, so it is already past the 3-in-7-days line and is a finding for the supervisor) and
`legal-admin.spec.ts › LGA-1` (shard 7: the harness's own setup call `POST /factors/<account>/challenge` answered 500
`unexpected_failure`, an infrastructure error; one ledger line). The server-error census (non-gating) carries
`[ssr-error] /api/listings/draft rateLimited:2026-11-19T21:00:00+00:00` (section 13, item 1).
The final "every check green" line is in the pull request's comment, not here.

## 12. Limits
- I did not run the repeat lane's repeats, the other fourteen lanes, `webkit` (no WebKit on this machine; `e2e:local`'s
  guard named it), the actionlint and gitleaks binaries (linux/x64 only), the dependency audit (no reachable advisory
  service), the migration-parity preflight (staging credentials the script never holds): CI is their proof.
- `DR-RL-1` could not be shown red (section 5).
- The e2e runs were local, on ethio-staging, by test id; the 19 ids ran in both Chromium projects, nothing else.
- I read CI's evidence through `gh` and the `ci-evidence` files; I did not read the raw job logs of the green run (the
  census section of `e2e-last-failure.md` is where the `[ssr-error]` line was read).

## 13. Findings
1. **A rate-limited call now writes a server-error line.** `src/server/door.ts:50` treats a refusal as known only when
   `refusal.reason === error.message.trim()`. With the reset time in the message (`rateLimited:<instant>`) the reason
   (`rateLimited`) no longer equals the message, so every normal rate-limited call on the posting routes logs
   `[ssr-error] /api/listings/draft rateLimited:2026-11-19T21:00:00+00:00` (seen twice in the local PR-7 run). The server-error
   census counts it (the gating rule is for SQL-class lines only, `docs/features/e2e-harness.md` DEC-083); production logs get a line per
   limited call. One-line fix, in `door.ts` (F1-7c's file): log only when `refusal.reason === "doorError"`, and keep
   the no-log for every recognised code. Not done here (out of scope, and DC-2 pins the current compare).
2. `src/server/answer.ts:164` writes `[object Object]` for a plain-object error (section 6). The fix is `errorText`
   (`src/lib/error-text.ts`) in place of the template; the file is out of scope.
3. The gate's refusals still arrive as HTTP 500 through PostgREST (INC-1213), so a log or monitor reads them as server
   errors; the client reads the code first now.
4. `src/features/auth/deactivated.ts:37`: dead sentence reader (section 6).
5. A deactivated signed-in caller of a reader now gets `accountDeactivated` (ruling 2's decision 8) where a number of
   readers answered their own data; the screens read it as `auth`. Noted as the behaviour change it is.
6. `viewerStateOf` (`src/features/ad-page/save.ts`) narrows an object by one cast to `Record<string, unknown>` after
   its `typeof`/`Array.isArray` checks, then checks each field; no `as unknown as`. A MINOR in the review.
7. The first half's mark numbers (`…1700xx`) and the files' timestamps (`…1500xx`) differ by design (the ledger's
   marks are the database tool's); stated in section 9 so the production apply reads both.

## 14. Records
DEC — 333: status line: turn F1-7a BUILT — the gate's `rateLimited` names its reset time and a rate-limited call is counted once; the readers classified: on the gate `listing_counts`, `listing_history`, `my_listing`, `my_listing_certification`, `my_listing_private`, `my_listings`, `my_last_listing_private`, `my_recent_categories`, `my_legal_history`, `my_legal_status`, `my_legal_version`, `my_saved_listings`, `my_seller_line`, `my_seller_place`, `my_viewing_location`, `impersonated_get_profile`, `impersonated_list_listings`, `legal_in_force`, `legal_scheduled` (public form) and the new `get_attribute_options_version_read`, `listing_contact_refusals_read`, `translation_scope_ok_read`, `listing_viewer_state`; behind a core: none (the SQL callers keep the old names by DEC-409); helpers by a named caller: `has_permission(uuid,text,text)` (22 policies), `sold_cutoff()` (3 public-read policies); kept for a route no person's token reaches: `get_attribute_options_version`, `listing_contact_refusals`, `translation_scope_ok` (SQL callers, closed to the browser); closed to the browser: `catalog_find_version`, `get_browse_tree`, `get_category_attributes`, `get_ui_bundle`, `level_perks_for`, `price_shape_for_basis`, `impersonation_target` and thirty-one helpers; public readers off the gate with the reason `public-data`: `feed_page`, `get_category_tree_version`, `get_entity_bundle`, `get_location_tree`, `get_location_tree_version`, `get_open_countries`, `get_ui_bundle_parts`, `get_ui_bundle_version`, `price_unit_labels`, `seller_feed_page`, `sold_visible_days`; return type changed: none (`listing_saved(text)` boolean is dropped and `listing_viewer_state(text)` → jsonb `{saved, owner}` replaces it); the migration files `20261119150000_1b7e8a6b…` to `20261119150900_3e96e1ab…` with the marks `20261119170000` → `20261119170900`. LEFT: F1-7b (the queued door corrections), F1-7c (the typed result, the folds, the guards' retirements).
INC — 838: status line: the readers' rule holds for every browser-callable function — the manifest's reader lines off the gate are the eleven `public-data` readers above (proved by the checker on every push: the last body and every public function it names read no `auth.` call and no `request.` setting) and the seven closed readers; `bun scripts/doors/check-doors.ts` → `check-doors static OK: 220 manifest lines reconcile with the migrations' catalogue`.
INC — 1170: status line: CLOSED for the gate — `door_context`'s `rateLimited` carries the reset instant as `rateLimited:<resets_at>`; PR-7, AP-25, AP-27 and VP-4 read it; `doorAnswer`'s mapping retired (identity; its callers are F1-7c's); the words that draw the time are F1-7c's.
INC — 1196: status line: CLOSED — `door_refused` counts nothing more for `rateLimited`; proven by the migration's proof (b) in part 1 (the count stays at its value, and the refusal is metered once) and by `DR-RL-1` (the dial's count stays at 1 over two refused calls; `door_refusals` moves by at least two) and by AP-27's meter at 8.
INC — 1162: status line: CLOSED — `assert_parent_not_catchall` is executable by no browser role; the same class in the other helpers: the thirty-one helpers closed in part 10, and the two kept — `has_permission(uuid,text,text)` (22 policies) and `sold_cutoff()` (3 public-read policies) — each by the policy that proves it; the class was the whole helper list.
INC — 1158: status line: the readers' cells — `translation_scope_ok`'s cell `translations:manage` did not hold; the browser's reader is `translation_scope_ok_read`, a signed-in reader with no permission cell; every other cell held. With this, no cell of the manifest is unread.
INC — 1191: status line: the ad page reads the viewer's ownership from `listing_viewer_state` (`src/features/ad-page/save.ts`, `use-saved-state.ts`, `src/routes/l.$slug.tsx`); the seller is offered no Save and no Report on reload; fixed in `bb44ba184` and proven by SVS-1…SVS-8, SAVE-4, AP-24 and AP-26.
INC — 1212: thirteen `helper` lines of the door manifest gave `policy` as their reason and no policy named them; no check read the reason. Class: a declaration nobody reads against the thing it describes. Fixed in F1-7a: every helper's grant judged by its caller (the helper list closed: thirty-one; kept: two); the checker refuses a `helper` line whose policy does not name it (static and `--live`; `helper-reason-unproven`). CLOSED with the turn.
INC — 1213: a reader's gate refusal (`door_refuse`, SQLSTATE P0D01, raised with no shell handler) reaches a browser through PostgREST as HTTP 500, on every reader on the gate since F1-1 (`e2e/legal-admin.spec.ts`'s reader test shows it). The client reads the code first from F1-7a on, so no screen misreads it; the status still says server error to a log or a monitor. Class: a refusal's status left to the transport. Owner: F1-7c — one mechanism for every reader's refusal status.
INC — new: a normal rate-limited call on the posting routes writes `[ssr-error] <path> rateLimited:<instant>` because `src/server/door.ts:50` compares the reason to the whole message; one-line fix in F1-7c (log only `doorError`).
INC — new: `src/server/answer.ts:164` writes `[object Object]` for a plain-object error; use `errorText`. F1-7c.
DEC — 408: a public reader that reads nothing of its caller is not put on the gate: it answers a deactivated account what it answers a visitor, and the manifest says so by the reason `public-data`, which the door checker proves on every push (the last body and every public function it names read no `auth.` call and no `request.` setting). A public reader that reads its caller passes the gate's public form. This amends ruling 1's decision 9, which named every public reader. Decided by the supervisor at F1-7a's stop 1 (G17): it keeps today's behaviour for public data and adds a standing check.
DEC — 409: where a function a browser calls is also called by SQL, the name the SQL callers use stays, with its body and header, and closes to the browser; the browser's reader is a new function `<name>_read` on the gate. No caller is redeclared for a name: the side with fewer bodies takes the new name. First used for `get_attribute_options_version`, `listing_contact_refusals` and `translation_scope_ok` (F1-7a).
register row — the doors' row gains "the gate's `rateLimited` names its reset time; a rate-limited call is counted once (INC-1170, INC-1196)" and "every browser-callable function is a reader on the gate, a named helper, or closed (F1-7a)".
changelog — 2026-11-19 turn F1-7a (Opus 5.5 and Sonnet 5.5): a call refused for its rate limit says when the limit resets and is counted once; every function a browser may call is a reader on the one gate, a helper named by the caller that needs it, or closed; the ad page knows its own seller.
roadmap — the Foundations 1 line gains "F1-7a DONE (pull request #75, marks 20261119170000 → 20261119170900)"; LEFT: F1-7b, F1-7c.
roadmap — under Foundations 1, F1-7b: "`impersonation_target`'s sentence `impersonation session expired` becomes a code, with its reader in `src/features/admin/impersonation/impersonation-service.ts` (F1-7a, decision 6)."
roadmap — under Foundations 1, F1-7c: "A reader's refusal answers its own HTTP status, by one mechanism (INC-1213)."
