# Cursor bundle 7b — a failed call reads the same everywhere — report
Base: 996b9b2e3 (the brief's `Base: dev`; the lane was re-landed on dev 87aa8bfc3 by ruling 1, decision 1) · Final code commit: 5ccc79542 · Brief: docs/governance/briefs/cursor-bundle-7b.md (sha256 30ecb2103b7c9660408c101419d88787875a089fd1445930b4dbebf0aed6e53f)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 5ccc795

CI of the last code commit (5ccc79542): every check green except the E2E preflight, which is the expected red of a migration not yet applied on staging (§11).

## 1. Done / not done, by part and step

- STEP 0 (re-land on dev 87aa8bfc3, ruling 1 decision 1): done.
- STEP 1 (plan, stop 1) and ruling 1: done; ruling 2 (the second migration, the key, the capture on every lane) done.
- Part 1 (the review door asks a reason; DEC-469) — `admin_review_listing(uuid,text,text,text)`, proven in its file; stop 2 (MIGRATION) written and answered by ruling 2.
- Part 1b (ruling 2): `my_listing` / `my_listings` read `staffReason` for a removed AND a rejected ad; one further migration in this push, with no second migration stop (ruling 2, decision 4).
- Part 2 (the client): a deadline on every browser call (INC-1285, DEC-477); retry only what can succeed (INC-1288); the offline state said once (INC-1286); one typed failure from a route (INC-1296); the client trusts the status that arrived and `GONE_CODES` is retired.
- Part 3: Screening's Reject asks a reason and a note (DEC-469, SRD-1..6, SRJ-1..5, SDR-11, SF-8b); a stranger's ad answers as an absent one (INC-1297); the last screens onto the failure notice (INC-1302); the admin gate's light read of the session (INC-1291); the seller's line says why an ad was not approved (`myListings.notApprovedBecause`, ML-U31).
- Part 4: the must-stay-lazy check reads modules (INC-1289, `scripts/bundle-closure.mjs`); the harness's second-factor failure (INC-1303): **the capture was extended, the cause was not shown, no fix was made** (see §10, §12).
- STEP 5 (the gate): done on the pushed tree 034d14a59 (§5); after CI's first run showed two reds of this lane's own (RP-1 and PP-17, §11), one fix commit (5ccc79542) followed, with the checks it can affect. STEP 6 (self-review): done (the line above). STEP 7 (this report): written while CI runs.
- Not done: INC-1303's fix (its cause is unknown; never a retry, G38). Browser tests by `--grep` locally (the staging preflight refuses a tree whose new migration is not applied there; ruling 2, decision 4: expected, not re-run); CI is the proof.

## 2. Files changed

`git diff --name-only 87aa8bfc3..HEAD` (the re-land base; 123 files, 4734 insertions, 459 deletions). Between the brief's base 996b9b2e3 and 87aa8bfc3 dev itself moved 14 files (Lovable's 10c); those are not this lane's and are not listed. The list is pasted from the scratch file `/tmp/ethio-scratch/cursor-bundle-7b/files.txt`:

```
.github/workflows/local-backend-proof.yml
docs/features/admin-screening.md
docs/features/admin-shell.md
docs/features/ci-guards.md
docs/features/doors.md
docs/features/my-listings.md
docs/features/route-client.md
docs/features/step-up-auth.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-7b-ruling-1.md
docs/governance/briefs/cursor-bundle-7b-ruling-2.md
docs/governance/briefs/cursor-bundle-7b-words-2.json
docs/governance/briefs/cursor-bundle-7b-words.json
docs/governance/briefs/cursor-bundle-7b.md
docs/governance/reports/cursor-bundle-7b.stop-1.md
docs/governance/reports/cursor-bundle-7b.stop-2.md
e2e/admin-attributes-safety.spec.ts
e2e/admin-screening-reject.spec.ts
e2e/admin-screening.spec.ts
e2e/my-listings-page.spec.ts
e2e/offline.spec.ts
e2e/photo-pipeline.spec.ts
e2e/posting-routes.spec.ts
public/i18n-usage.json
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/bundle-closure.d.mts
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/ci/auth-log-capture.py
scripts/ci/auth-log-capture.test.ts
scripts/ci/lane-weights.json
scripts/conformance/briefs-allowlist.txt
scripts/conformance/call-deadline-allowlist.txt
scripts/conformance/call-deadline.test.ts
scripts/conformance/on-demand-failure-allowlist.txt
scripts/conformance/provider-errors-allowlist.txt
scripts/conformance/query-retry.test.ts
scripts/conformance/refusal-readers-allowlist.txt
scripts/conformance/route-client-allowlist.txt
scripts/conformance/route-client.test.ts
scripts/conformance/route-status-allowlist.txt
scripts/conformance/route-status.test.ts
scripts/conformance/wired.test.ts
scripts/doors/manifest.txt
scripts/doors/staff-rules.txt
scripts/e2e-select.ts
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/components/shell/failure-notice.census.test.ts
src/components/shell/failure-reason.test.ts
src/components/shell/failure-reason.ts
src/components/shell/location-data.test.ts
src/components/shell/location-data.ts
src/components/shell/offline-line.test.tsx
src/components/shell/offline-line.tsx
src/components/shell/on-demand-notice.tsx
src/components/shell/rail-first-paint.test.tsx
src/components/shell/use-offline-paused.ts
src/components/shell/use-retry-failed.test.tsx
src/components/shell/use-retry-failed.ts
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-attributes/use-attributes.ts
src/features/admin-categories/category-images-service.test.ts
src/features/admin-categories/category-images-service.ts
src/features/admin-screening/screening-decisions.test.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin-screening/screening-reject-dialog.test.tsx
src/features/admin-screening/screening-reject-dialog.tsx
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/admin/nav-alerts.test.tsx
src/features/admin/nav-alerts.ts
src/features/auth/auth-service.ts
src/features/auth/mfa/mfa-refusals.ts
src/features/auth/mfa/mfa-service.ts
src/features/auth/mfa/session-level.test.ts
src/features/auth/mfa/session-level.ts
src/features/auth/mfa/staff-factor-gate.test.tsx
src/features/auth/mfa/staff-factor-gate.tsx
src/features/auth/mfa/staff-factor.ts
src/features/auth/session-query-client.test.ts
src/features/auth/session-query-client.ts
src/features/categories/category-tree.ts
src/features/feed/use-card-photos.ts
src/features/feed/use-feed.ts
src/features/my-listings/my-listing.test.ts
src/features/my-listings/my-listings.test.ts
src/features/my-listings/my-listings.ts
src/features/my-listings/state-line.ts
src/features/posting/catalog-finder.ts
src/features/posting/photo-editor.test.tsx
src/features/posting/photo-editor.tsx
src/features/posting/step-photos.tsx
src/features/posting/types.ts
src/features/posting/use-photo-links.test.ts
src/features/posting/use-photo-links.ts
src/i18n/bundle.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/i18n/provider.tsx
src/integrations/supabase/client.ts
src/integrations/supabase/types.ts
src/lib/call-deadline.test.ts
src/lib/call-deadline.ts
src/lib/first-reads.test.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/lib/route-client.test.ts
src/lib/route-client.ts
src/lib/supabase-door.ts
src/routes/admin.listings_.$listingId_.edit.tsx
src/routes/api/listings/background.ts
src/routes/api/listings/photos.$id.ts
src/routes/api/listings/photos.test.ts
src/routes/api/upload/photo.ts
src/routes/settings.tsx
src/server/media/background-route.test.ts
supabase/migrations/20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql
supabase/migrations/20261126023616_e0902645-e85d-4914-92f1-fb0e9d60f08c.sql
```

New files are those this lane's commits add (the deadline module `src/lib/call-deadline.ts`, `src/features/auth/mfa/session-level.ts`, `src/features/admin-screening/screening-reject-dialog.tsx`, the two migrations, the new specs and tests, the briefs and stop reports); `git ls-files` lists each. Outside the lane's areas by name, each by a ruling: `.github/workflows/local-backend-proof.yml` (ruling 1 decision 15 and ruling 2: the capture runs on every lane), `src/integrations/supabase/client.ts` (ruling 1 Q1, DEC-477: the one named exception to "never hand-edited"), `src/integrations/supabase/types.ts` (the supervisor's patch), `scripts/route-budgets.mjs` and `scripts/check-bundle-size.mjs` (DEC-296's form), `scripts/ci/lane-weights.json` (CF-LANES-2 for the new spec).

## 3. Behaviour contract — answer tables before → after

| Surface | Before (at the base) | After |
| --- | --- | --- |
| Every browser call (database, route, upload, download) | no deadline | a deadline by class: read 15 s, write 30 s, auth 20 s, upload 30 s stall inside a 300 s cap, download 60 s, model 60 s; a run-out reads as the network kind; the caller's own abort stays an abort |
| A query's retry | the query's own count, also for a refusal | a refusal is asked once; a network and a server failure keep the count; a rate refusal whose named time has passed is read again |
| A browser offline with a read waiting | nothing said | the shell's line `shell.offline`, once, above the download notice |
| A route's answer that is not ok | each consumer built its own `Error` | one typed failure with the status and the code (`routeFailure` in `route-client.ts`); an unreachable call is the network kind |
| A marked refusal whose status the client's table does not hold | read as malformed, or by `GONE_CODES` | read at the status's own kind (400 a refusal; 404/410 gone); a marked failure at 500 and above stays `server` |
| `admin_review_listing` | `(uuid,text)`: no reason | `(uuid,text,text,text)`: a rejection needs a reason of the Remove list, a note only for `other` (≤ 500); an approval or a hold given either is `badValue`; one `listing.rejected` audit row and one `admin_reject` notice |
| Screening, Reject | sent at once | a dialog asks the reason and the note; a bulk Reject asks once and sends one reason and note per ad (one door call per ad) |
| A stranger's ad id (doors and routes) | `notYourListing` / `notYours` at 403; two routes `photoGone` at 409 | the code and the status of a missing ad (`listingNotFound`, 404); each route answers each code at the table's status |
| `my_listing` / `my_listings` | `removedReason` for a removed ad | `staffReason` for a removed AND a rejected ad (latest notice of the kind); the line reads `myListings.notApprovedBecause` for a rejected one |
| The staff factor gate | reads the Supabase client's session and factors | reads the level from the token and the factors by one light request; a failed read draws the notice with Retry, never "set up an authenticator" |
| The last screens (attributes, settings, staff gate, and the others the census names) | their own alert text | the one failure notice; their census lines are removed |
| The build's must-stay-lazy check | by chunk name | by module (`dist/.chunk-modules.json`); a planted fold fails |

Everything else is the base's; each change above is a numbered change of the brief or a ruling.

## 4. Censuses

- `rg "GONE_CODES" src scripts e2e`: none left (retired).
- `rg "new Error\(.*(answer|result)\.status" src --glob '!*.test.*'`: none outside the allowlist (RCG-5/6 judge; `translations-service.ts` is allowlisted `until INC-1304`).
- `rg "notYourListing|notYours" supabase/migrations src`: the code stays in the database's list for a staff answer (ruling 1); callers who are not the owner answer the missing-row code (the migrations' last declarations, written whole; CF-REFUSAL-2/6 hold).
- Browser fetch outside the deadline module: CF-DEADLINE-1 census; three allowlist lines (§7).
- Silent fallbacks on a route answer that is not ok (INC-1305, owner Cursor bundle 8's crawl; see §6).

## 5. Tests

- `bun run typecheck`: pass (`tsc --noEmit` and the scripts project).
- `bun run lint`: pass (`eslint . --max-warnings 0`).
- `bunx vitest run src --maxWorkers=2 --testTimeout=120000`: 498 files, 3399 tests passed.
- `bunx vitest run scripts --maxWorkers=2 --testTimeout=120000`: 142 files, 794 passed, 1 skipped. (`--testTimeout=120000` because the tree-walking laws take 8–34 s on this machine; at the 5 s default nine of them time out under load.)
- `bun run checks` last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 662s`. Its first lines: `PASS laws-first › scripts/ tests first (INC-1030) (117s)`, `PASS laws-first › changed folders' unit tests (INC-1030) (87s)`.
- NOT RUN, named by their reason: scope (Decide whether the lanes run; Index the code tree) — Actions API artifacts; build-and-check Workflow lint (actionlint is a linux/x64 binary; this is darwin/arm64) and Install dependencies; component-tests Install dependencies; secrets-scan gitleaks (linux/x64 binary); dependency-audit Install and Audit (the advisory service is unreachable); e2e-preflight (five steps; staging credentials never held); e2e downloads, merge and verdict (GitHub artifacts, backend and browsers); promote (only CI promotes); semgrep SARIF upload (two lines; only GitHub receives it). The full list is in `/tmp/ethio-scratch/cursor-bundle-7b/checks2.txt`.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-7b.md --at 996b9b2e3`: `[check-go] no finding`.
- `bun run build && node scripts/check-bundle-size.mjs`: `Bundle budget OK.` (entry JS 208.4 / 209 KiB).
- `bun run db:proof --fresh` on the final tree (034d14a59, after the PRF-5 edit of the first migration): `db:proof PASS — applied 563/563, CLI 2.120.0, cold, 57 s`.
- After the fix commit 5ccc79542: `bun run typecheck` pass; `bun run lint` pass; `bunx vitest run src/features/auth src/features/admin scripts/conformance`: 229 files, 1287 tests passed; `bunx vitest run scripts`: 142 files, 794 passed, 1 skipped; `bun run build && node scripts/check-bundle-size.mjs`: `Bundle budget OK.` `bun run checks` was run once, whole, on 034d14a59 (above), not again for this one fix (rule 00 step 8).
- Test ids added (units): SRD-1..6, SDR-11, SF-8b, SRJ-1..5 (spec), SLV-1..7 (SLV-6 and SLV-7 after CI's first run), ML-U31 (and the ML-U29 renamed: both ids were taken), PED-10, UPL-2/3, CDL-1..7, RCL-20..24, RCL-15f, RF-4 (changed), RF-14, FR-U9, FR-U15, OFL-1/2, RRF-1/2, SQC-1..4, NAV-ALERT-2b, AG-U3/3b, PHT-3, PP-6 (spec), OFF-1 (spec), CF-DEADLINE-2/3/4, CF-RETRY-2/3, RCG-5/6, CF-ROUTE-STATUS-0/2, CF-AUTHLOG-1..4, and the budget check's tests for modules. Changed: AT-73b (re-pointed with its file).
- Browser tests: **not run locally** — the staging preflight answers `STAGING BEHIND` for the new migration (ruling 2, decision 4: expected, not re-run). The E2E values were otherwise set; earlier in the turn the tests of parts 2 and 3 ran green by `--grep` before the second migration existed. CI on the pull request is the proof, including the repeat lane (DEC-283): on 5ccc79542 the E2E verdict is `last E2E run 45754134703 passed`.
- Red-first: the guards' planted bypasses each fail (CF-DEADLINE-3, CF-RETRY-3, RCG-6, CF-ROUTE-STATUS-2, bundle-closure's planted fold).
- J-audit: no `waitForTimeout`, `.first()` or `test.only` added in `e2e/**` (grep of the diff's added lines).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg "answer\.ok" src`, `rg "new Error\(" src/features src/components`, `rg "\bfetch\(" src --glob '!*.test.*'`, `rg "retry:" src`.

- INC-1305 (silent fallbacks on a route answer that is not ok; not fixed here; owner Cursor bundle 8's crawl): `src/features/posting/pricing-data.ts:217` (`FALLBACK_CURRENCY`) and `:276` (`[]`); `src/features/ad-page/similar.ts:28` (empty); `src/features/posting/step-photos.tsx:262` (`photoId` null on a not-ok answer); `src/features/posting/posting-service.ts:963` and `:1120` (a null on a not-ok answer); `src/features/posting/map/geocode.ts:39` (`reason: "unavailable"`); `src/routes/settings.tsx` (candidate: its `result.ok` branches at :247–:310 read by the next lane's crawl; not proven a fallback by me).
- `src/features/admin/import-dialog.tsx:296–299` (INC-1280, bundle 7c): a route answer's not-ok branch drawn by its own text; the census line stays (the brief's census said it left; the tree still trips it).
- `src/features/admin/translations/translations-service.ts` builds its failures by hand (INC-1304, Lovable's folder; allowlisted).
- `src/features/admin/translations/use-translations.ts` fetches a static asset without the deadline (allowlisted, INC-1304).
- Stale comments: `src/routes/post_.$listingId.tsx` and other consumers of `mfa-service` still describe the client as read on first paint (report only).
- `src/integrations/supabase/client.ts` also runs on server render (the fetch wrapper's environments), noted for the register.
- On-demand failure census: `session-level.ts` returns its own failed download unreported (allowlisted; its callers draw it).

## 7. Allowlists and guards

| Allowlist | Before → after | Lines |
| --- | --- | --- |
| `scripts/conformance/call-deadline-allowlist.txt` | new → 2 lines and a header | `leaflet.ts | the tile host is an outside host, not our backend | INC-875`; `use-translations.ts | a static asset in Lovable's translations folder; the deadline moves in with its next bundle | INC-1304` |
| `route-status-allowlist.txt` | 0 → 1 | the CF-ROUTE-STATUS-1 header line only |
| `route-client-allowlist.txt` | −3 +2 | `photo-editor.tsx`, `bundle.ts` and `provider.tsx` leave (they use the deadline module); `session-level.ts` (`INC-1291`, until 2027-04-24) and `translations-service.ts` (`INC-1304`) join |
| `on-demand-failure-allowlist.txt` | +1 | `src/features/auth/mfa/session-level.ts | the typed failure's own failed download is returned with the error as it arrived; its callers draw it where they are | INC-1291` |
| `provider-errors-allowlist.txt` | 2 lines re-numbered | `category-images-service.test.ts` :86/:93 → :89/:96 (INC-1278, moved by the edit) |
| `refusal-readers-allowlist.txt` | 1 line re-numbered | `nav-alerts.ts:35` → `:37` |
| `briefs-allowlist.txt` | −1 | a line naming `docs/governance/briefs/cursor-bundle-7a-ruling-1.md:61` is removed |
| `failure-notice.census.test.ts` `ALLOW` | 5 lines added, 9 removed in the diff (numstat) | the lane's own lines go with their files; `import-dialog.tsx` stays (INC-1280) |

Guards added or widened: CF-DEADLINE-1..4, CF-RETRY-1..3, RCG-5/6, CF-ROUTE-STATUS-0..2 (wired in `wired.test.ts`), CF-AUTHLOG-1..4, bundle-closure's module check (its planted fold fails). Every allowlist's stale/expired rule held in `bunx vitest run scripts`.

## 8. Strings

New (member layer): `myListings.notApprovedBecause` — EN "Not approved: {reason}" · AM "አልጸደቀም፦ {reason}" (copied by key from `cursor-bundle-7b-words-2.json`).
New (base layer): `shell.offline` — EN "You're offline. What you open will load when you're back online." · AM "ከኢንተርኔት ጋር አልተገናኙም። የሚከፍቱት ነገር ግንኙነትዎ ሲመለስ ይጫናል።" (words file).
Changed values (the ruling's words, copied by key): `post.photo.refusal.notYourListing`, `post.refusal.notYourListing` — EN "This listing could not be found." · AM "ይህ ማስታወቂያ አልተገኘም።"; `post.error.notYours` — EN "This draft could not be found." · AM "ይህ ረቂቅ አልተገኘም።". (Per the strings law a changed meaning is a new key; the ruling kept these keys because their callers' codes became the missing-row code; the supervisor ruled it. I wrote no Amharic.)
`bun run i18n:usage` was run; `docs/generated/i18n-usage.json` and `public/i18n-usage.json` are committed. The Reject dialog reuses the Remove list's existing keys.

## 9. Migrations

1. `supabase/migrations/20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql` — sha256 `e0e55412baa70191a6f4a2db3936df2e567cfee7d56fa188044aa7f121ec4b6d` (stop 2 recorded `3d07df11…`: see §10), mark `20261126020000`, header `-- e2e-areas: admin-listings, admin-screening`. Applied to staging already (the supervisor, after stop 2). Body md5 of `admin_review_listing(uuid,text,text,text)`: `9e69c9abd328441324310bf9a17a7dc9`.
2. `supabase/migrations/20261126023616_e0902645-e85d-4914-92f1-fb0e9d60f08c.sql` — sha256 `65a6ada5979a6a9f87dcf4cad9663f21d2f26c3a2d46721c65f6eaefd26be4c1`, mark `20261126040000`, header `-- e2e-areas: my-listings`. Redeclares `my_listings(text,integer,integer,text,uuid[],text)` and `my_listing(uuid)` whole; `removedReason` → `staffReason`, read for `removed` (kind `admin_remove`) and `rejected` (kind `admin_reject`) from the latest notice of the seller's own ad; REVOKE/GRANT restated; md5 pre- and post-checks; proofs on six scratch ads and nine notices (latest wins; another seller's notice is never read; a kind mismatch reads none; an ad in review reads none), scratch country `XZ`, tag `e2e-mig-b7b2-`, rolled back by a sentinel.
   Apply pairing line: `apply e0902645-e85d-4914-92f1-fb0e9d60f08c → expect mark 20261126040000`.
- `bun run db:proof --fresh` last line (the tree with both migrations): `db:proof PASS — applied 563/563, CLI 2.120.0, cold, 57 s` (`/tmp/ethio-scratch/cursor-bundle-7b/dbproof-final.txt`, the stack stopped afterwards).

## 10. Departures

- INC-1303 (the harness's second-factor challenge): the first capture showed 12 failures on one lane (1 challenge, 11 `GET /user`) with the request line only "request completed", so the cause is not known. The capture was extended (CF-AUTHLOG-4: the server's own error entries counted with their message) and runs on every lane (ruling 2). **No fix and no retry** (G38). INC-1303 stays open; the next CI's `e2e-log` files name the cause.
- The part-1 migration's proof was edited after stop 2: its catalog check no longer matches `pg_get_*def` by `LIKE` (PRF-5 fails a proof that does); proof (g) and the catalog-only check changed; the function body's md5 is unchanged. Staging already holds the mark, so the file's sha moved from `3d07df11…` to `e0e55412…` with no change to what ran there. The supervisor should read this before the production apply.
- The part-1 migration is about 26 KB (rule 30's split line is 25 KB); one concern, as ruled.
- An intermediate commit was red: `7049a8fa2` (the module check) had no `.d.mts` declarations; `9b900f43e` fixed typecheck. Not pushed alone (the push is one).
- Vitest's 5 s default timed out nine tree-walking laws under a loaded machine; they pass at `--testTimeout=120000` (all 142 script files pass).
- Four more page ceilings moved in the fix commit 5ccc79542 (`/admin/images` 216 → 217, `/admin/listings_/$listingId` 338 → 339, `/post` 410 → 411, `/post_/$listingId` 410 → 411), the cause on each line: the light read's report of an ended sign-in joins the chunk those pages carry through `mfa-service.ts`.
- Two page ceilings moved in the gate-fix commit 034d14a59 (`/$name` 226 → 227, the my-listings edit page 410 → 411) because removing `reportOnDemandFailure` from `session-level.ts` changed the sizes by a few bytes and left them inside the NEAR band; DEC-296's form, cause on each line. Earlier ceilings (the entry 208 → 209 and 50 page lines) are in commit `ebca375eb`, each with its cause.
- Browser tests by `--grep` not run locally (§5).
- CDL-1..7 and the other test ids differ from the plan's working labels in a few places (two ids were already taken: ML-U29 → ML-U31, SL-1..4 → SLV-1..5).
- PP-17 (`e2e/photo-pipeline.spec.ts`, a file the plan's census of 403 assertions missed): another seller's photo move answers the missing ad's 404 now (INC-1297); the assertion and its comment follow.
- Rulings in this turn: ruling 1 (decisions 1–15) and ruling 2 (decisions 1–4), saved with their sha256 equal to the carriers'.

## 11. CI

- Base's CI: dev `87aa8bfc32a3cd9c1f9343b7418a8b1d6d20bb14` SUCCESS (run 45727250754; its lanes were skipped, the code tree proven by run 45720941766), read at the ci-evidence addresses at stop 2.
- Reds of earlier turns fixed: none read as red.
- Run 45749553190 on `034d14a59` (FAILURE): 
  1. E2E preflight (migration parity, staging): class (a), `STAGING BEHIND: apply 20261126023616_e0902645-e85d-4914-92f1-fb0e9d60f08c.sql` — expected after a migration push (ruling 2, decision 4); not re-run; not mine to clear.
  2. `admin-roles.spec.ts` RP-1 (shard 9, both projects, with the retry): class (e), mine. The signed-out deep link stayed on `/admin/roles/<id>`; the lane's log held the browser's `HTTP 403 GET /auth/v1/user … session_not_found` four times (once per attempt) and nowhere else in the 16 lanes. Cause: the staff gate's light read (INC-1291) asked the auth server for the user with a token whose session the server no longer holds, and nothing ended the session — the client library used to remove the stored session on that very answer (`auth-js` `GoTrueClient._getUser` removes it on `session_not_found`) and the shell then ended it. Fixed in `5ccc79542`: the read forgets the stored session through the door (`forgetStoredSession`) and reports the ended sign-in (`reportEndedSignIn`), SLV-6/SLV-7.
  3. `photo-pipeline.spec.ts` PP-17 (shard 16, both projects): class (e), mine. The spec asserted 403 for another seller's photo move; the route answers the missing ad's 404 now (INC-1297). Fixed in `5ccc79542`.
- Run 45754134703 on `5ccc79542` (FAILURE, the preflight alone): `ci-status.md` names commit `5ccc79542afcc1cedc2cd8b16114248cd134bcc7`, `e2e-last-failure.md` reads `last E2E run 45754134703 passed` (its commit line names the merged ref `8e7775d1f…`, so the two-step SHA check reads the status file's commit); every other job is green, the repeat lane (27 of 136 tests) included. The "errors outside any test" the repeat lane lists (a 776 s wait for the suite and its teardown) are the same two lines as in the first run and the lane is green.
- No re-run was made. `CF-BRIEF-6` named at stop 2: the brief is not edited; `check-go --at 996b9b2e3` has no finding.
- The preflight turns green when the supervisor applies the second migration on staging (§9, §12); the pull request stays a draft until then.

## 12. Limits

- No browser test ran locally after the second migration (the staging preflight); CI proves.
- Not run here: actionlint, gitleaks, the dependency audit, the e2e lanes (§5's NOT RUN list, with reasons).
- The self-review read: the scope against the list in §2, a grep of the diff's added lines for the banned patterns (no `any`, `as unknown as`, `!`, `@ts-*`, no sentinel on identity or geography; two `?? 0` on counts of ticked ads and paused queries), the allowlist lines, the migrations' structure, and each part's diff as it was written. It was not a second line-by-line reading of all 123 files in one sitting.
- INC-1303's cause is unknown (§10).
- INC-1303's capture (run 45749553190, lane 9) read: no failed auth call of the kind INC-1303 names; the only auth refusals were the four `GET /user -> 403` above (now fixed) and template-mailer lines. The cause of INC-1303 is therefore still unseen; it did not recur in either run.

THE OPERATOR'S STEPS (production), in order:
1. Apply the first migration (`20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql`, mark `20261126020000`) — it drops `admin_review_listing(uuid,text)`: between this apply and the Publish the published Reject fails, so the apply and the Publish are one sitting.
2. Apply the second migration (`20261126023616_e0902645-e85d-4914-92f1-fb0e9d60f08c.sql`, expect mark `20261126040000`); the supervisor applies it on staging first at the final report so the e2e preflight turns green.
3. Publish in the same sitting.
4. Before step 1: the website's old client calls the two-argument door; do not leave the gap open.

## 13. Findings

- INC-1305: the silent fallbacks listed in §6 (`pricing-data.ts:217,276`, `similar.ts:28`, `step-photos.tsx:262`, `posting-service.ts:963,1120`, `geocode.ts:39`, `settings.tsx` candidate).
- `src/integrations/supabase/client.ts` runs on server render as well as in the browser; its deadline applies on both (the module reads no browser-only API).
- RP-1 and PP-17 were this lane's own reds, found only by CI: the plan's census did not list `e2e/admin-roles.spec.ts`'s signed-out deep link (a path the light read changed) or PP-17's 403. The browser tests by `--grep` could not run locally after the second migration (§12), and the first ones ran before these paths were touched.
- A budget ceiling inside the NEAR band moves with any few-byte change to a shared module (§10): the band catches it only at the final build.
- A rule that misled me: rule 00 names `Base: dev <sha>` for `git diff`, and a re-land on a moved dev makes `git diff <BASE>..HEAD` include dev's own commits (14 files); I listed from the re-land base.

## 14. Records

DEC — The deadline of every database call lives at the one fetch the generated client shares (`src/integrations/supabase/client.ts`, `createSupabaseFetch`), through `src/lib/call-deadline.ts`; `client.ts` is the one named exception to "never hand-edited", and CF-DEADLINE-1 fails when a regeneration drops it. Deadlines by class: read 15 s, write 30 s, auth 20 s, upload 30 s stall inside a 300 s cap, download 60 s, model 60 s. A run-out reads as the network kind; the caller's own abort stays an abort. (Assigned by ruling 1 as DEC-477.)

INC — INC-1285 (a deadline on every browser call): fixed by DEC-477. INC-1286 (the offline state unsaid): fixed, `shell.offline` once above the download notice. INC-1288 (a retry for what cannot succeed): fixed, a refusal is asked once. INC-1289 (the must-stay-lazy check by chunk name): fixed, by module. INC-1291 (the admin gate loads the Supabase client on first download): fixed, the level from the token and the factors by one light request. INC-1296 (a refusal whose status moved read as malformed; `GONE_CODES`): fixed, the client trusts the status class. INC-1297 (a refusal told a stranger an ad exists): fixed, doors and routes answer the missing-row code. INC-1302 (the last screens' own alerts): fixed, the failure notice (`import-dialog.tsx`, INC-1280, remains for 7c). INC-1303 (the second-factor sign-in failing for a moment): OPEN; the capture shows the server's own error entries from this push on; no fix without the cause.

INC — INC-1304: `src/features/admin/translations/translations-service.ts` builds a route failure by hand in three places and `use-translations.ts` fetches without the deadline; owner Lovable's next translations bundle; allowlist lines `until INC-1304`.

INC — INC-1305: silent fallbacks on a route answer that is not ok: `pricing-data.ts:217` and `:276`, `similar.ts:28`, `step-photos.tsx:262`, `posting-service.ts:963` and `:1120`, `map/geocode.ts:39`, and `settings.tsx` (candidate); owner Cursor bundle 8's failure crawl.

register row — route mechanism (`src/lib/route-client.ts`): gains the typed failure — a route's answer that is not ok becomes one `ReaderError` with its status and code (`routeFailure`), an unreachable call the network kind; guard `route-client.test.ts` (RCG-5/6).

register row — the call deadline (`src/lib/call-deadline.ts`): one deadline by class for every browser call; guard `scripts/conformance/call-deadline.test.ts` (CF-DEADLINE-1..4).

register row — the refusal-status row: a stranger's row is a missing row, and the client trusts the status class; guards `route-status.test.ts` (CF-ROUTE-STATUS-0..2), CF-REFUSAL-2/6.

register row — the review door: `admin_review_listing(uuid,text,text,text)` asks a reason of the Remove list and a note for `other`; the move door's row names it; SF-8b, SRD-1..6.

register row — the failure notice: the census (`failure-notice.census.test.ts`) registered and joined to `wired.test.ts`.

register row — the budget check: "by module" (`scripts/bundle-closure.mjs`, `entryLazyModules`).

changelog — Cursor bundle 7b: every browser call has a deadline (DEC-477), a refusal is asked once, the offline state is said once, a route's failure is one typed failure, Screening's Reject asks a reason (DEC-469), a stranger's ad answers as an absent one, and the seller's line says why an ad was not approved.

roadmap — tick Cursor bundle 7b (parts 1–4; INC-1303 stays open).

slip — S799–S802 are the supervisor's (ruling 1 and ruling 2); none of mine.

Scratch folder (the operator removes it): `/tmp/ethio-scratch/cursor-bundle-7b/` (a base-tree copy, size and chunk scripts, the gate's outputs and the downloaded CI artifacts).
