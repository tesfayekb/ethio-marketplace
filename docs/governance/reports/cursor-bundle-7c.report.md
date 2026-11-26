# CURSOR BUNDLE 7c — every code a door answers has words, checked at build (INC-1280, INC-1301); each control can read the permission its door asks (INC-1281, the mechanism); the sign-in server's 500 in test setup (INC-1303) — report

Base: 72fb1d470 · Final commit: 26a007cfc · Brief: docs/governance/briefs/cursor-bundle-7c.md (sha256 0cdb28e2bffbd160573b7467394910ccdf9a1c46e9f22e4329fe0fd3bce32ec9)
Review: READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on 26a007c

CI (dev at the base, read from ci-evidence before any edit): `72fb1d4709bdfe8848a457c5ecbcdf7c93f26c8d` — **SUCCESS** (run 45767751214). This pull request's last code commit 26a007cfc: see §11.

## 1. Done / not done, by part and step

- STEP 0 — done. Branch `cursor/bundle-7c` from `origin/dev` at 72fb1d470 (dev had not moved). Brief saved by scripted copy, sha256 equal to the carrier's. Roadmap line 3 names the brief. `scripts/conformance/briefs-allowlist.txt` held no line at the base (`git show 72fb1d470:scripts/conformance/briefs-allowlist.txt` has no key line), so nothing was removed. `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-7c.md --root .` at STEP 0: `[check-go] no finding`.
- STEP 1 — the census: §2 and §4.
- STEP 2, Part 1 (INC-1301) — done (e30ebddd6, 88ed321cd). The judge walks every public function a door's last declaration calls, transitively and across overloads, and (ruling 1, decision 3) the triggers on every table the door writes. 48 manifest lines changed by script.
- STEP 3, Part 2 (INC-1280) — done (ea5494dee, 26a007cfc). The generator, the types-only module, the drift check, every family typed over its doors (ruling 1, decision 1 (B)), the census of door calls, the import dialog.
- STEP 4, Part 3 (INC-1281, the mechanism) — done (885bb5bf8). Generated permissions, `useMayCall`, the permission census with its allowlist. No control moved.
- STEP 5, Part 4 (INC-1303) — done by branch (B) under ruling 2, decision 1 (a) (b1ec003a4).
- Ruling 2, decision 2 — done (d8289b0b4): the browse-path guard admits the hook from admin folders.
- STEP 6 — done: §5.
- STEP 7 — one push of the final tree (the turn's pushes: §10). CI: §11.
- STEP 8 — this report.

## 2. Files changed

`git diff --name-only 72fb1d470` (90 files):

```
docs/features/ci-guards.md
docs/features/doors.md
docs/features/e2e-harness.md
docs/features/rbac-client-seam.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-7c-ruling-1.md
docs/governance/briefs/cursor-bundle-7c-ruling-2.md
docs/governance/briefs/cursor-bundle-7c.md
docs/governance/reports/cursor-bundle-7c.stop-1.md
docs/governance/reports/cursor-bundle-7c.stop-2.md
e2e/helpers/ui.ts
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-browse-imports.sh
scripts/check-browse-imports.test.ts
scripts/ci/auth-log-capture.py
scripts/ci/auth-log-capture.test.ts
scripts/conformance/door-permissions-allowlist.txt
scripts/conformance/door-permissions.test.ts
scripts/conformance/door-permissions.ts
scripts/conformance/door-words-allowlist.txt
scripts/conformance/door-words.test.ts
scripts/conformance/door-words.ts
scripts/conformance/kit.test.ts
scripts/conformance/kit.ts
scripts/conformance/package-price.ts
scripts/conformance/refusal-readers-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/catalogue.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/door-types.ts
scripts/doors/judge.ts
scripts/doors/live-query.sql
scripts/doors/manifest.ts
scripts/doors/manifest.txt
scripts/doors/rows.ts
scripts/fixtures/browse-imports/admin-dir-hook/src/features/admin/hook-import-example.ts.txt
scripts/fixtures/browse-imports/admin-hook/src/features/admin-screening/hook-import-example.ts.txt
scripts/fixtures/browse-imports/admin-seam/src/features/admin-screening/seam-import-example.ts.txt
scripts/fixtures/browse-imports/browse-hook/src/features/feed/hook-import-example.ts.txt
scripts/route-budgets.mjs
src/components/shell/failure-notice.census.test.ts
src/features/account/saved-remove-refusals.ts
src/features/ad-page/ad-page-refusals.ts
src/features/admin-ai/ai-feature-form.tsx
src/features/admin-ai/ai-refusals.ts
src/features/admin-attributes/attribute-refusals.ts
src/features/admin-categories/category-refusals.ts
src/features/admin-countries/country-refusals.ts
src/features/admin-listings/listing-policy.ts
src/features/admin-listings/listing-refusals.ts
src/features/admin-listings/photo-remove.ts
src/features/admin-listings/tier-reasons.ts
src/features/admin-listings/undo-edit.ts
src/features/admin-locations/location-refusals.test.tsx
src/features/admin-locations/location-refusals.ts
src/features/admin-monetisation/monetisation-refusals.ts
src/features/admin-screening/use-photo-changes.ts
src/features/admin-screening/use-photo-reviews.ts
src/features/admin-screening/use-screening.ts
src/features/admin/impersonation/impersonation-end-refusals.ts
src/features/admin/impersonation/impersonation-refusals.ts
src/features/admin/impersonation/impersonation-starter.tsx
src/features/admin/import-dialog.test.tsx
src/features/admin/import-dialog.tsx
src/features/admin/legal/legal-service.ts
src/features/admin/roles/roles-service.ts
src/features/admin/translations/languages-page.tsx
src/features/admin/translations/translations-service.ts
src/features/admin/users/access-refusals.ts
src/features/admin/users/admin-users-service.ts
src/features/legal/legal-accept-refusals.ts
src/features/my-listings/my-listing.ts
src/features/my-listings/promote-service.test.ts
src/features/my-listings/promote-service.ts
src/features/permissions/door-permissions.generated.ts
src/features/permissions/use-may-call.test.ts
src/features/permissions/use-may-call.ts
src/features/posting/field-refusals.ts
src/features/posting/refusal-text.ts
src/features/posting/step-where.tsx
src/lib/door-codes.generated.ts
src/lib/door-family.ts
src/lib/refusal-tail.ts
src/routes/auth.tsx
src/routes/auth_.reset.tsx
src/routes/settings.tsx
```

New files (`git ls-files --error-unmatch` tracks each; `git cat-file -e 72fb1d470:<path>` fails for each): `src/lib/door-family.ts`, `src/lib/door-codes.generated.ts`, `src/features/permissions/door-permissions.generated.ts`, `src/features/permissions/use-may-call.ts`, `src/features/permissions/use-may-call.test.ts`, `scripts/doors/door-types.ts`, `scripts/conformance/door-words.ts`, `scripts/conformance/door-words.test.ts`, `scripts/conformance/door-permissions.ts`, `scripts/conformance/door-permissions.test.ts`, `scripts/check-browse-imports.test.ts`, the two allowlists, the four fixtures, the rulings and the stop reports.

Every path is in the brief's SCOPE or the standing allowance, except `scripts/check-browse-imports.sh`, its test and its fixtures, which ruling 2 decision 2 names (§10). No file was deleted.

Names the brief asked to be proposed: the generator `scripts/doors/door-types.ts`; the types-only module `src/lib/door-codes.generated.ts` with the family type in `src/lib/door-family.ts` (`DoorFamily`); the generated permissions `src/features/permissions/door-permissions.generated.ts`; the hook `useMayCall` in `src/features/permissions/use-may-call.ts`; the guards' ids DW-1…7 (door words) and DPM-1…4 (door permissions).

### The census (STEP 1)

- **consumers / definition, fix 1a.** Every one of the manifest's lines was judged against its door's own `door_refuse` codes, the codes of every public function its last declaration calls (by `scripts/conformance/migration-reader.ts`'s last declarations), and the triggers on the tables it writes. `check-doors --static` reads every line OK. The export doors (:41, :42) gain `unknownCategory` from `attr_export_payload(text)` (20261120030200 :171). 48 lines changed (`git diff --numstat` 48/48 on `scripts/doors/manifest.txt`). The walk reads text, not branches: a core called in a fixed mode lends codes its caller never reaches (`transition_listing_core`'s `ownerOnly`, `serviceOnly`, `enforcementOnly` on `admin_review_listing`), and those are each family's `unreachable` lines (§10).
- **consumers / definition, fix 1b.** 47 objects are typed as `DoorFamily` (listed in §10 with their doors, from the census's own reader `readDoorWords`). Six families no `DoorFamily` types carry allowlist lines (§7). Every door named under `src/` is listed by a typed family, answers only gate codes, or carries a `door` line (25 lines, §7).
- **consumers / definition, fix 2.** Every literal permission comparison under `src/` (DPM-1's census: call forms `.includes` / `.has` / `has(` with a slug or a `*PERMISSION*` constant; equality with a slug the manifest names; `permission:` props). 80 found, each with its allowlist line: 24 permanent (4 `ADMIN_PANEL_PERMISSION` uses, 14 `sections.ts` section gates, 6 link gates: `locations-overview` LINKS ×2, the listing page's `mayOpenSeller` and `mayViewLegal`, `user-legal-card`, screening's `mayOpenListing`), 56 `until INC-1281` (the read switches and the control comparisons Lovable 10b part 2 moves onto the hook).
- **consumers / definition, fix 3.** Callers of `aal2Session`: the pool's fresh session (`e2e/helpers/ui.ts`) and the staff helper (`e2e/helpers/staff-factor.ts`), and through them every spec that signs staff in. No spec changed.
- **tests.** Each consumer's own tests: §5. The tests that assert a manifest line or a family's open record: `scripts/doors/check-doors.test.ts`, `src/features/admin-locations/location-refusals.test.tsx` (LRF-7 re-pointed), `src/features/my-listings/promote-service.test.ts`, `src/features/admin/import-dialog.test.tsx` (IRW-6 re-pointed).
- **lists.** Changed: the manifest; `wired.test.ts` (DW, DPM, DPM-4, BPG-4 callers); `docs/features/ci-guards.md` (DW, DPM, BC-17, CF-AUTHLOG-5, BPG rows); `MUST_STAY_LAZY_MODULES` (gains `src/features/permissions/door-permissions.generated.ts`); the failure-notice census allowlist (its `INC-1280 until bundle 7c` line removed). Unchanged: `scripts/doors/check-doors-allowlist.txt` (the walk needed no exception), `scripts/conformance/refusal-classes.txt`, the briefs allowlist (empty at the base). `scripts/conformance/refusal-readers-allowlist.txt` changed only by line numbers its keyed files moved (§7).
- **old-file-readers.** `DOOR_CODES` (`src/lib/door-codes.ts`) is unchanged and still read by the reader. The codes column is read by `judge.ts`, CF-REFUSAL-6's classes and the new generator. The removed census line was read only by `failure-notice.census.test.ts`.
- **second-readers.** `vi.mock` of `@/features/permissions/usePermissions` in `use-may-call.test.ts` (new). No `vi.mock` of `@/lib/door-codes` or `@/lib/refusal` was added. `@/lib/route-client` is partly mocked in `import-dialog.test.tsx`, as at the base.
- **chunk-graph.** From the build's chunk record (`dist/.chunk-modules.json`, 270 chunks in both builds): `src/lib/door-family.ts`, `src/lib/door-codes.generated.ts`, `src/features/permissions/door-permissions.generated.ts` and `src/features/permissions/use-may-call.ts` are in no chunk, base or final. The types-only modules add zero bytes, and the generated permissions are nowhere near the entry, because no screen imports the hook yet. The entry closure and two admin pages' closures hold the same modules in both builds (`/` 418, `/admin/translations` 528, `/admin/places` 541; none added, none removed). BC-17 passes.
- **environments.** Not applicable: no build option changes.
- **mechanisms read.** The judge and its reader, the manifest grammar, `readRefusal` and `RefusalFamily`, `doorCode`, `ADMIN_REFUSALS`, `usePermissions`, `sections.ts`, `aal2Session`, the auth capture, `routeFailure`.
- **first-download.** §5.
- **premises.** Two premises were wrong, and each was a stop. Stop 1: a family's words come from more than its doors' codes; ruled by ruling 1. Stop 2: the auth server writes a 500's cause on the request line; ruled by ruling 2. The OPEN questions:
  - (a) Answered in stop 2 from the vendor's source at the pinned versions: the CLI 2.120.0 runs gotrue v2.197.0. The TOTP challenge fails only through its one transaction (`internal/api/mfa.go` :428–459, `internal/models/factor.go` :392–405). A 500's cause is written to the request line's `error` field (`internal/api/errors.go` :160, :231). The CLI exposes no auth log level (`gotrue.service.ts` `buildGotrueEnv` :337; no key in `config.toml`).
  - (b) Yes. A family names its doors in its type alone (`satisfies DoorFamily<{doors: …}>`), with no screen-side change beyond the import line.
  - (c) The routes a control calls, from DPM-4's census of every API path browser code writes: 35 generated routes. 9 declare a staff permission (the import routes' from `FAMILIES` in `src/server/imports/registry.ts`, the others from `defineRoute`'s `auth.staff`). The other 22 are OPEN: every member and public route (`/api/feed`, `/api/locations`, `/api/listings/draft`, `/api/upload/photo`, …), none of them called from admin code (DPM-4). Their narrowest declaration is a `defineRoute` `auth.staff` field, which none of them needs today. The import routes' codes are words of `IMPORT_REFUSALS` and the consoles' families (§10).
- **callee-codes.** For each widened line, the codes and their callee are what DOORS-22's walk reads. Each door raises them, except where a family's `unreachable` line says the door's fixed mode cannot reach the code (§10).
- **gate-reach.** The hook decides drawing only. Every control and read the 56 `until INC-1281` lines name calls a door that checks through `door_context`, or a route that checks its declared staff permission. Each inherits; no door, route or policy check changed in this lane.
- **user-cases.** The import dialog's refusals, by code, both languages through the existing keys:

  | code | words (key) | test |
  |---|---|---|
  | `planHasRefusals` | `admin.import.reason.planHasRefusals` | IRW-1 |
  | `batchAlreadyUndone` | `admin.import.reason.batchAlreadyUndone` | IRW-2 |
  | `undoBlocked` | `admin.import.reason.undoBlocked` | IRW-3 |
  | `unknownBatch` | `admin.import.reason.unknownBatch` | IRW-4 |
  | 403 / 428 / `wrongFile` / `fileChanged` / `importRunning` / 413 / `tooManyRows` / `badHeader` / `emptyFile` | the dialog's own error lines | IRW-5 |
  | a code no family words | the general line, no reason line | IRW-6 |
  | a dialog's own word | its own key wins | IRW-7 |
  | the sign-in ending (`signedOut`, 401, `notSignedIn`) | `session.expired` | IRW-8 |
  | a door key with a row-naming detail | the console's key, its `{detail}` filled | IRW-9 |
  | a failed network | the general line, no reason line | NONE (the unreachable answer reads no family, as at the base) |

  No family gained a word for a code people meet: the type moved words, it added none (FLAGS no-new-string). The codes with no words are the words-owed list (§10).
- **queued.** `rg "bundle 7c|7c|INC-1280|INC-1281|INC-1301|INC-1303"` across the briefs, reports, `docs/features` and `roadmap.md`:
  - the failure-notice census line `INC-1280 until bundle 7c`: built (removed);
  - INC-1301: built;
  - INC-1280: built, except `RATE_FAMILY` (§10, §13);
  - INC-1281: the mechanism built; the controls to Lovable 10b part 2;
  - INC-1303: built under (B).
- **findings.** §13.

## 3. Behaviour contract — answer tables before → after

The import dialog (`src/features/admin/import-dialog.tsx`):

| the route's answer | at 72fb1d470 | now |
|---|---|---|
| a code a family words, or a door key the catalogue holds | the reason line in words, the detail as its tail | the same (the code read from `routeFailure`'s typed failure, the detail from the route's answer; IRW-1…4, 7, 9) |
| a code no family words | a reason line with the raw code and its detail (`code — detail`) | no reason line, the general failure line alone (the brief's numbered change; IRW-6) |
| signed out, 401, `notSignedIn` | `session.expired`, no reason line | the same (IRW-8) |
| an own-line code or status | its own error line, no reason line | the same (IRW-5) |
| unreachable | the general line, no reason line | the same |

Families: every word a person saw at the base for a code a door answers stays the same, with the same key. What moved:
- a spread became a spelled-out subset: `FLAG_REFUSALS` in `languages-page.tsx`, `SELLER_DRAFT_COPY_REFUSALS`, `REACH_REFUSALS`;
- the listings words were split (`SHARED_REFUSAL_WORDS`, `STATE_REFUSAL_WORDS`, `SLOT_REFUSAL_WORDS`), and `MOVE_REFUSALS` keeps all three;
- a few words were dropped for codes no listed door answers:
  - `screeningPaused` from `refusal-text.ts`, which no door, route or migration answers (`rg screeningPaused src supabase/migrations scripts/doors/manifest.txt` finds only its two locale keys);
  - `unknownBatch` and `undoBlocked` from `LOCATION_REFUSALS`, which the import dialog words.

Doors, routes and policies: none changed. Screens: the import line and the family's declaration only (`git diff` of the six screen files).

`aal2Session`: a challenge that answers 500 is retried once with a fresh challenge and printed; any other refusal, or a second 500, throws as before. The auth capture's output line gains `: <cause>` for a line that carries an `error` field.

## 4. Censuses

All in §2, with these greps:
- the manifest walk: `check-doors --static`;
- the families: `readDoorWords` (`scripts/conformance/door-words.ts`);
- the door calls: DW-2;
- the permission comparisons: DPM-1;
- the API paths: DPM-4;
- `aal2Session`: `rg -n "aal2Session" e2e`;
- the queued items: `rg "bundle 7c|7c|INC-1280|INC-1281|INC-1301|INC-1303"`.

## 5. Tests

Added:
- DOORS-22 (`scripts/doors/check-doors.test.ts`);
- DW-1…7 (`scripts/conformance/door-words.test.ts`);
- DPM-1…4 (`scripts/conformance/door-permissions.test.ts`);
- MAYC-1…5 (`src/features/permissions/use-may-call.test.ts`);
- CF-KIT-9 (`scripts/conformance/kit.test.ts`): `permanent` is an until only for a census that allows it;
- CF-AUTHLOG-5 (`scripts/ci/auth-log-capture.test.ts`);
- BPG-1…4 (`scripts/check-browse-imports.test.ts`);
- IRW-9 (`src/features/admin/import-dialog.test.tsx`);
- BC-17's list check for the generated module (`scripts/bundle-closure.test.ts`).

Re-pointed:
- IRW-6: was "an unknown code draws as data"; now "draws no reason line" (the brief's numbered change).
- LRF-7: the undo's batch codes are the import dialog's words, not the console's.
- `promote-service.test.ts`: the typed families.

Red-first:
- IRW-9 against the dialog as it stood at 8563412b0 (Part 2's): `Received: "Reason: Order refused in {detail}: …"`, the same as CI's AT-77 (§11).
- CF-AUTHLOG-5 against the old capture.
- BPG-1 against the old guard.
- DOORS-22: the check-doors self-test finds its planted `callee-code-missing` and `callee-unread` cases (SELF_TEST OK, 23 kinds), and a clean callee case passes.
- DW-6, DW-7, DPM-2 and DPM-3 are planted cases by construction.

Each changed test file run alone (`bunx vitest run <file>`, INC-1306):

```
scripts/bundle-closure.test.ts: Tests 17 passed (17)
scripts/check-browse-imports.test.ts: Tests 4 passed (4)
scripts/ci/auth-log-capture.test.ts: Tests 5 passed (5)
scripts/conformance/door-permissions.test.ts: Tests 4 passed (4)
scripts/conformance/door-words.test.ts: Tests 7 passed (7)
scripts/conformance/kit.test.ts: Tests 15 passed (15)
scripts/conformance/wired.test.ts: Tests 5 passed (5)
scripts/doors/check-doors.test.ts: Tests 22 passed (22)
src/components/shell/failure-notice.census.test.ts: Tests 3 passed (3)
src/features/admin-locations/location-refusals.test.tsx: Tests 8 passed (8)
src/features/admin/import-dialog.test.tsx: Tests 19 passed (19)
src/features/my-listings/promote-service.test.ts: Tests 8 passed (8)
src/features/permissions/use-may-call.test.ts: Tests 5 passed (5)
```

After IRW-9 joined: `src/features/admin/import-dialog.test.tsx: Tests 20 passed (20)`.

The laws (`bunx vitest run scripts --maxWorkers=2`) on the final tree: `Test Files 145 passed (145)`, `Tests 812 passed | 1 skipped (813)`. `bun run typecheck`: exit 0. `bun run lint`: exit 0.

`bun run checks` on 26a007cfc, the final code tree:
- `checks (fast): 26 PASS · 0 FAIL · 623s`
- last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 687s`, then `checks exit 0`.

Its NOT RUNs, each with the gate's own reason:
- scope × 2: the Actions API's artifacts exist only in a GitHub run;
- actionlint and gitleaks: pinned linux/x64 binaries, and this machine is darwin/arm64;
- the four "Install dependencies" steps: already installed;
- dependency-audit × 2: the advisory service is unreachable from the sandbox;
- e2e-preflight × 4: needs the staging credentials;
- e2e × 6: merges the lanes' artifacts on GitHub;
- promote × 4: CI alone promotes;
- the semgrep SARIF upload and its warning: GitHub-only.

`bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-7c.md --at 72fb1d470` (run outside the sandbox, whose temp folder refused its `tar -x`):

```
[check-go] at 72fb1d4709bdfe8848a457c5ecbcdf7c93f26c8d (--at 72fb1d470): the tree laws and every other COUNT read its snapshot /var/folders/xb/_xhx_v4j7gl2v3y34657ymq00000gn/T/check-go-at-3zQh6N; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace
[check-go] no finding
```

(`--root .` on today's tree finds the two anchors this lane moved: `judge.ts :324` and `ui.ts :959`.)

The browser check, on ethio-staging. No test id was added or changed in `e2e/`. The helper's change reaches every staff sign-in, so one staff test was run, and AT-77 was run for the fix:
- `bun run e2e:local -- e2e/legal-doors.spec.ts --grep "LG-10 " --project mobile-360 --project desktop-1280 --retries 0`: `2 passed (15.6s)`. Both slots minted a fresh second-factor session, and no challenge 500 occurred, so the retry path did not run locally.
- `bun run e2e:local -- e2e/admin-attributes-safety.spec.ts --grep "AT-77 " --project mobile-360 --project desktop-1280 --retries 0`: `2 passed (27.8s)`.
- No spec file ran whole locally. The J-audit: `e2e/helpers/ui.ts` changes the setup helper only, with no locator, wait or assertion. CI's repeat lane runs the specs that import it.

First download (local, lock-exact). The base was built in `/tmp/ethio-scratch/cursor-bundle-7c/base`; the final tree is 26a007cfc. "Room" is the ceiling − 0.3 − (size + 0.1):

| page | base KiB | final KiB | change | ceiling | room to the NEAR band |
|---|---:|---:|---:|---:|---:|
| `/` | 227.675 | 227.652 | -0.023 | 229 | 0.948 |
| `/$name` | 225.604 | 225.578 | -0.026 | 227 | 1.022 |
| `/account` | 270.637 | 270.613 | -0.024 | 272 | 0.987 |
| `/account_/legal` | 210.289 | 210.271 | -0.018 | 211 | 0.329 |
| `/account_/legal_/$versionId` | 211.657 | 211.640 | -0.017 | 213 | 0.960 |
| `/account_/saved` | 227.943 | 227.913 | -0.030 | 229 | 0.687 |
| `/admin` | 215.022 | 215.012 | -0.010 | 216 | 0.588 |
| `/admin/` | 215.834 | 215.822 | -0.012 | 217 | 0.778 |
| `/admin/ai` | 311.077 | 311.081 | +0.004 | 312 | 0.519 |
| `/admin/attributes` | 326.395 | 326.390 | -0.005 | 327 | 0.210 |
| `/admin/audit` | 299.808 | 299.794 | -0.014 | 301 | 0.806 |
| `/admin/categories` | 360.807 | 360.798 | -0.009 | 362 | 0.802 |
| `/admin/countries` | 316.953 | 316.954 | +0.001 | 318 | 0.646 |
| `/admin/images` | 215.665 | 215.652 | -0.013 | 217 | 0.948 |
| `/admin/impersonation_/$sessionId` | 243.802 | 243.783 | -0.019 | 245 | 0.817 |
| `/admin/legal` | 292.399 | 292.385 | -0.014 | 293 | 0.215 |
| `/admin/legal_/$versionId` | 288.563 | 288.550 | -0.013 | 289 | 0.050 |
| `/admin/legal_/edit` | 292.233 | 292.222 | -0.011 | 293 | 0.378 |
| `/admin/listings` | 336.739 | 336.739 | +0.000 | 338 | 0.861 |
| `/admin/listings_/$listingId` | 337.633 | 337.605 | -0.028 | 339 | 0.995 |
| `/admin/listings_/$listingId_/edit` | 419.773 | 419.782 | +0.009 | 421 | 0.818 |
| `/admin/locations` | 279.036 | 279.012 | -0.024 | 280 | 0.588 |
| `/admin/monetisation` | 320.866 | 320.856 | -0.010 | 322 | 0.744 |
| `/admin/places` | 319.313 | 319.285 | -0.028 | 320 | 0.315 |
| `/admin/roles` | 301.229 | 301.223 | -0.006 | 302 | 0.377 |
| `/admin/roles_/$roleId` | 281.106 | 281.090 | -0.016 | 282 | 0.510 |
| `/admin/screening` | 357.537 | 357.530 | -0.007 | 358 | 0.070 |
| `/admin/translations` | 317.565 | 317.620 | +0.055 | 319 | 0.980 |
| `/admin/translations_/$lang` | 318.533 | 318.532 | -0.001 | 319 | 0.068 |
| `/admin/users` | 299.003 | 299.001 | -0.002 | 300 | 0.599 |
| `/admin/users_/$userId` | 300.060 | 300.034 | -0.026 | 301 | 0.566 |
| `/auth` | 224.051 | 224.038 | -0.013 | 225 | 0.562 |
| `/auth_/callback` | 209.736 | 209.724 | -0.012 | 211 | 0.876 |
| `/auth_/reset` | 217.151 | 217.139 | -0.012 | 218 | 0.461 |
| `/c/$slug` | 227.675 | 227.652 | -0.023 | 229 | 0.948 |
| `/dev/primitives` | 232.210 | 232.183 | -0.027 | 233 | 0.417 |
| `/dev/style` | 267.275 | 267.271 | -0.004 | 268 | 0.329 |
| `/dev/tall` | 208.690 | 208.677 | -0.013 | 210 | 0.923 |
| `/l/$slug` | 253.444 | 253.414 | -0.030 | 254 | 0.186 |
| `/legal/$kind` | 212.676 | 212.655 | -0.021 | 214 | 0.945 |
| `/legal/accept` | 218.336 | 218.320 | -0.016 | 219 | 0.280 |
| `/legal/publishing` | 213.996 | 213.978 | -0.018 | 215 | 0.622 |
| `/my-listings` | 314.894 | 314.908 | +0.014 | 316 | 0.692 |
| `/my-listings_/$listingId` | 325.347 | 325.326 | -0.021 | 326 | 0.274 |
| `/my-listings_/$listingId_/edit` | 409.657 | 409.661 | +0.004 | 411 | 0.939 |
| `/post` | 409.637 | 409.638 | +0.001 | 411 | 0.962 |
| `/post_/$listingId` | 409.603 | 409.603 | +0.000 | 411 | 0.997 |
| `/privacy` | 212.463 | 212.442 | -0.021 | 213 | 0.158 |
| `/settings` | 283.271 | 283.247 | -0.024 | 284 | 0.353 |
| `/terms` | 212.458 | 212.438 | -0.020 | 213 | 0.162 |

Growth by cause, chunk by chunk:
- `/admin/translations` +0.055: `admin.translations.js`, where `FLAG_REFUSALS`, typed over `admin_set_language_flags`, spells its eight words instead of spreading the shared family. Its modules are the same as at the base. Its ceiling moved 318 → 319 (§10).
- Every other change is under ±0.03 KiB. The closures hold the same modules (§2 chunk-graph), so these are chunk-name hashes and gzip rounding.

`node scripts/check-bundle-size.mjs`: `Bundle budget OK.` The gate's NEAR band: `0 NEAR`.

## 6. K2 — siblings that bypass the mechanism

- `scripts/conformance/choice-lists.test.ts:199–208` parses its own `key | reason | until` allowlist, with its own `permanent` rule, beside `kit.ts`'s `readAllowlist` (out of scope; reported).
- `src/components/shell/failure-notice.census.test.ts:105` parses its allowlist by its own split (in scope for its one line only; left).
- The refusal readers: none outside `readRefusal`. Grep: `rg -n "readRefusal|refusalText" src` against the families; the census's DW-2 reads every door call.
- Permission comparisons outside the hook: the 80 allowlisted lines (§7). That is the mechanism's own census, and Lovable 10b part 2 moves the 56 `until INC-1281` lines.
- `routeFailure` callers that draw a reason from the failure: only the import dialog. Its other callers (`category-images-service.ts:63`, `use-card-photos.ts:30`, `use-feed.ts:42`, `catalog-finder.ts:66`, `category-tree.ts:331`, `use-photo-links.ts:15`, `location-data.ts:172`, `:198`) throw it into a reader or carry its message, and draw no door-key sentence (`rg -n "routeFailure\(" src`).

## 7. Allowlists and guards

- `scripts/conformance/door-words-allowlist.txt` (new): 0 → 41 lines.
  - 25 `door` lines, each permanent with its reason: readers that only fail, background calls, readers by name.
  - 6 `family` lines:
    - the three provider families: `| provider family, no door | permanent` (ruling 1, decision 1);
    - `MONETISATION_REFUSALS`, the form judge's family: permanent;
    - the import dialog's merged family at its call: permanent;
    - `RATE_FAMILY` (`src/components/shell/failure-reason.ts`): `| … outside cursor bundle 7c's scope … | INC-1280` (§10).
  - 10 `owed` lines: `| words owed | INC-1307` (ruling 1, decision 2, class d).
- `scripts/conformance/door-permissions-allowlist.txt` (new): 0 → 80 lines, 24 permanent and 56 `INC-1281`.
- `scripts/conformance/refusal-readers-allowlist.txt`: 44 → 44. Fourteen keys follow their files' lines, moved by one import line each (`use-photo-changes.ts` 106 → 107, `use-photo-reviews.ts` 93 → 94, `roles-service.ts` ×6 and `admin-users-service.ts` ×9, each +1). Each is a mechanical edit a standing guard demands (DECIDE-AND-NAME).
- The failure-notice census allowlist: its `src/features/admin/import-dialog.tsx | … | INC-1280 until bundle 7c` line removed.
- Guards new or changed, each run on its planted case:
  - DW (drift, census, planted compile);
  - DPM (census, planted, compile, routes);
  - DOORS-22 (the walk; the check-doors self-test, SELF_TEST OK, 23 kinds);
  - BC-17's list (`MUST_STAY_LAZY_MODULES` gains the generated permissions);
  - CF-KIT-9;
  - CF-AUTHLOG-5;
  - the browse-path guard (BPG-1…4; its fixtures run under CI's self-test, BPG-4).
- `scripts/conformance/package-price.ts` skips `*.generated.ts`: the generated types name every function and are not a consumer (the same reason as `src/integrations/supabase/**`).
- Each new census is named in `wired.test.ts`.

## 8. Strings

None (FLAGS no-new-string). No key was added, renamed or changed. `docs/generated/i18n-usage.json` and `public/i18n-usage.json` were regenerated (`bun run i18n:usage`) because the scan counts the hook's file (798 → 799 files scanned).

## 9. Migrations

None (FLAGS no-migration).

## 10. Departures

- **The pushes.** The brief says ONE push (DEC-414). The turn pushed at stop 1 (f7ede957a), at stop 2 (88334f2ed) and once with the final tree (26a007cfc), as rule 00 §Stopping requires. Ruling 1 accepted the second and counted stop 1 against the lane; ruling 2 counted stop 2 against it.
- **A red naming a lane path, fixed in the push (ruling 2, decision 3).** The brief's TOLERANCES make such a red a STOP; ruling 2 says "Read run 45838095211 before the final push; a red naming a path this lane changed is fixed in that push".
  - What failed: lane 5 of run 45838095211 (stop 2's tree), AT-77 in both projects. The attribute import's reason read `Order refused in {detail}: …`.
  - The cause: Part 2 moved the dialog's reason onto `routeFailure`'s typed failure, and that failure keeps only a short-code detail (`REFUSAL_DETAIL`). A commit's detail names its rows (`cat: parent → child`), so it was dropped.
  - The fix (26a007cfc): `reasonOf` keeps the typed failure for the code and takes the route's own detail as the tail. IRW-9 covers it, shown red first.
  - The run's other red, the i18n map job, was fixed in cb6066bc7.
- **The gate's order.** STEP 6's gate first ran before that fix. After the fix, the laws, typecheck, lint, the dialog's tests and AT-77 ran again, and then the whole gate (§5).
- **Ruling 2, decision 2.** `scripts/check-browse-imports.sh` (outside the brief's SCOPE, named by the ruling) admits an import of `src/features/permissions/use-may-call.ts` from `src/features/admin/` and `src/features/admin-*/`, and refuses every other importer of the seam. Four fixtures and BPG-1…4 prove it.
- **Ruling 2, decision 1 (a).** Part 4 by rule (B), and the capture keeps a 500 line's `error` field: ids masked, redacted through `scripts/ci/redaction-rules.json`, then cut to 200 characters. Redaction runs before the cut, so a cut never splits a secret. The workflow file did not change: the CLI has no auth log level.
- **A ceiling moved (DEC-296).** `/admin/translations` 318 → 319 (8563412b0), its cause on its line: `FLAG_REFUSALS` spelled out, +0.07 KiB gzip in `admin.translations.js`, 317.609 local against 317.565 = `ceilingForLocal(317.609)`. The final tree measures 317.620, inside the same ceiling.
- **`RATE_FAMILY` is not typed.** `src/components/shell/failure-reason.ts` is outside the brief's SCOPE, so `RATE_FAMILY` carries a `family` line until INC-1280. INC-1280 is therefore fixed for every family in scope, and this one family waits for the turn that next holds that file (§13).
- **Manifest lines corrected (DECIDE-AND-NAME):** 48 lines, by script, from the walk's findings (Part 1, and the trigger walk under ruling 1, decision 3).
- **The census in §2.** The brief puts the census in §2, beside rule 60's file list. §2 holds both, the verbatim list first.
- **The lists ruling 1 asks for** (decision 4: `also`, `generic`, `unreachable`, words owed), read from the families by `readDoorWords`.

### The families (47)

- `src/features/admin/impersonation/impersonation-end-refusals.ts` `END_REFUSALS`: doors end_impersonation; words 1
- `src/features/posting/refusal-text.ts` `DRAFT_REFUSALS`: doors change_home_country, check_seller_alias, get_posting_schema, my_listing_private, publish_listing, save_posting_identity, save_seller_place, set_listing_photos_soon, set_listing_pin, submit_listing; words 78
- `src/features/posting/refusal-text.ts` `PHOTO_REFUSALS`: doors move_listing_photo, my_listing_certification, remove_listing_photo, set_cover_photo; words 23
- `src/features/posting/refusal-text.ts` `BACKGROUND_REFUSALS`: doors none; words 26
- `src/features/my-listings/my-listing.ts` `SELLER_DOOR_REFUSALS`: doors copy_my_listing, edit_my_listing, mark_sold, renew_listing, resume_listing, set_listing_reserved, transition_listing; words 25
- `src/features/my-listings/my-listing.ts` `SELLER_DRAFT_COPY_REFUSALS`: doors copy_my_listing; words 6
- `src/features/ad-page/ad-page-refusals.ts` `SAVE_REFUSALS`: doors save_listing, unsave_listing; words 1
- `src/features/ad-page/ad-page-refusals.ts` `REPORT_REFUSALS`: doors report_listing; words 4
- `src/features/ad-page/ad-page-refusals.ts` `CONTACT_REFUSALS`: doors reveal_listing_contact; words 3
- `src/features/admin/translations/translations-service.ts` `TRANSLATION_REFUSALS`: doors admin_approve_all_entity_translations, admin_approve_all_translations, admin_delete_language, admin_export_translations, admin_import_translations, admin_language_delete_preview, admin_list_entity_translations, admin_machine_entity_translation, admin_machine_translation, admin_save_entity_translation, admin_save_translation, admin_set_entity_translation_status, admin_set_key_context, admin_set_language_flags, admin_set_language_order, admin_set_translation_status, admin_set_translator_languages, admin_sync_ui_keys, admin_undo_import, admin_upsert_language; words 41
- `src/features/admin/roles/roles-service.ts` `ROLE_REFUSALS`: doors admin_create_role, admin_delete_role, admin_set_role_permission, admin_update_role; words 11
- `src/features/admin/users/admin-users-service.ts` `PROFILE_EDIT_REFUSALS`: doors admin_update_profile; words 7
- `src/routes/auth.tsx` `AUTH_FORM_REFUSALS`: doors none; words 1
- `src/features/my-listings/promote-service.ts` `LEVEL_REFUSALS`: doors promote_options, set_listing_level; words 14
- `src/features/my-listings/promote-service.ts` `REACH_REFUSALS`: doors set_listing_reach; words 11
- `src/features/posting/field-refusals.ts` `SPECS_RATE`: doors none; words 1
- `src/features/posting/step-where.tsx` `DIRECTIONS_REFUSALS`: doors none; words 2
- `src/features/posting/step-where.tsx` `DETAILS_REFUSALS`: doors none; words 2
- `src/features/admin-listings/listing-refusals.ts` `MOVE_REFUSALS`: doors admin_move_listing; words 9
- `src/features/admin-listings/listing-refusals.ts` `EDIT_REFUSALS`: doors admin_edit_listing; words 8
- `src/routes/settings.tsx` `SETTINGS_FORM_REFUSALS`: doors none; words 1
- `src/features/account/saved-remove-refusals.ts` `SAVED_REMOVE_REFUSALS`: doors unsave_listing; words 1
- `src/lib/refusal-tail.ts` `ADMIN_REFUSALS`: doors none; words 1
- `src/features/admin-ai/ai-refusals.ts` `AI_DOOR_REFUSALS`: doors admin_set_ai_feature; words 8
- `src/features/admin-ai/ai-feature-form.tsx` `AI_FORM_REFUSALS`: doors none; words 2
- `src/features/admin-attributes/attribute-refusals.ts` `ATTRIBUTE_REFUSALS`: doors admin_commit_attribute_import, admin_delete_attribute, admin_link_attribute, admin_merge_attributes, admin_preview_attribute_import, admin_set_attribute_link_order, admin_set_card_attributes, admin_set_fact_attributes, admin_undo_attribute_import, admin_unlink_attribute, admin_update_attribute_link, admin_upsert_attribute; words 39
- `src/features/admin-attributes/attribute-refusals.ts` `ATTRIBUTE_EXPORT_REFUSALS`: doors admin_export_attributes; words 3
- `src/features/admin/import-dialog.tsx` `IMPORT_REFUSALS`: doors admin_commit_location_import, admin_preview_location_import, admin_undo_location_import; words 4
- `src/features/admin-categories/category-refusals.ts` `CATEGORY_REFUSALS`: doors admin_accept_category_image, admin_add_category_pointer, admin_commit_category_import, admin_create_category, admin_delete_category, admin_export_categories, admin_move_category_pointer, admin_preview_category_import, admin_reactivate_category, admin_remove_category_pointer, admin_reorder_categories, admin_retire_category, admin_set_category_images, admin_set_category_window, admin_set_country_exclusions, admin_set_primary_pointer, admin_undo_category_import, admin_update_category; words 14
- `src/features/admin-countries/country-refusals.ts` `COUNTRY_REFUSALS`: doors admin_export_locations, admin_set_country_active, admin_set_country_root_order, admin_upsert_country; words 13
- `src/features/admin/legal/legal-service.ts` `LEGAL_REFUSALS`: doors admin_add_legal_translation, admin_discard_legal_draft, admin_export_legal_acceptances, admin_legal_version, admin_mark_legal_reviewed, admin_publish_legal_version, admin_save_legal_draft, admin_set_legal_settings, admin_user_legal_history; words 17
- `src/features/admin-screening/use-screening.ts` `DECISION_REFUSALS`: doors admin_review_listing; words 8
- `src/features/admin-screening/use-screening.ts` `REVEAL_REFUSALS`: doors admin_reveal_listing_contact; words 3
- `src/features/admin-screening/use-photo-changes.ts` `PHOTO_CHANGE_REFUSALS`: doors admin_review_photo_change; words 1
- `src/features/admin/impersonation/impersonation-refusals.ts` `BEGIN_REFUSALS`: doors begin_impersonation; words 7
- `src/features/admin/impersonation/impersonation-starter.tsx` `REASON_REFUSALS`: doors none; words 1
- `src/features/admin-listings/listing-policy.ts` `POLICY_REFUSALS`: doors admin_set_listing_policy; words 0
- `src/features/admin-listings/tier-reasons.ts` `TIER_REFUSALS`: doors admin_set_listing_tier; words 10
- `src/features/admin-monetisation/monetisation-refusals.ts` `MONETISATION_DOOR_REFUSALS`: doors admin_clear_level_override, admin_edit_package_price, admin_end_package_price, admin_save_level_override, admin_save_listing_package, admin_save_market_settings, admin_save_package_price; words 35
- `src/features/admin-locations/location-refusals.ts` `LOCATION_REFUSALS`: doors admin_delete_location, admin_export_locations, admin_move_location, admin_reorder_locations, admin_set_location_active, admin_upsert_location; words 26
- `src/features/admin-screening/use-photo-reviews.ts` `PHOTO_ALLOW_REFUSALS`: doors admin_allow_listing_photo; words 2
- `src/features/admin-listings/photo-remove.ts` `PHOTO_REMOVE_REFUSALS`: doors admin_edit_listing; words 9
- `src/features/admin-listings/undo-edit.ts` `UNDO_REFUSALS`: doors admin_undo_listing_edit; words 11
- `src/features/admin/translations/languages-page.tsx` `FLAG_REFUSALS`: doors admin_set_language_flags; words 8
- `src/routes/auth_.reset.tsx` `RESET_REFUSALS`: doors none; words 2
- `src/features/legal/legal-accept-refusals.ts` `LEGAL_ACCEPT_REFUSALS`: doors accept_legal; words 1
- `src/features/admin/users/access-refusals.ts` `ACCESS_REFUSALS`: doors admin_set_account_status, assign_role, revoke_role; words 5

### also (157), each with its source

- `DRAFT_REFUSALS` (`src/features/posting/refusal-text.ts`:174), returned: `required`, `badShape`, `tooLong`, `mustBeEmpty`, `unknownKey`, `unknownCurrency`, `unknownPlace`, `periodLocked`, `periodFollowsBasis`, `modeFollowsBasis`, `commissionNotOffered`, `priceBasisAmbiguous`, `commissionRange`, `commissionRequired`, `residencyUnknown`, `noFreeSlot`, `coverageExceedsPlan`, `messagesRequired`, `badType`, `badPreset`, `badDecimals`, `outOfBounds`, `badMulti`, `dependentMissing`, `inactiveOption`, `otherNeedsText`, `contactInText`, `unknownOption`, `unknownAttribute`, `notPositive`, `priceNotAllowed`, `posterExpiryTooSoon`, `posterExpiryTooLate`, `cityRequired`, `aliasReserved`, `aliasTaken`, `aliasShape`, `aliasEthio`, `aliasRole`, `aliasClaim`, `aliasTooSoon`, `businessEthio`, `businessReserved`, `businessClaim`, `badLength`, `badHandle`, `showNeedsValue`, `unknownCountry`, `countryAlreadyConfirmed`, `countryTooSoon`, `optionNotAllowed`; route: `doorError`, `providerUnavailable`, `assistBudgetSpent`, `featureOff`, `aliasImitatesBrand`; formGate: `aliasLatinOnly`, `belowModelYear`, `aboveModelYear`
- `PHOTO_REFUSALS` (`src/features/posting/refusal-text.ts`:254), route: `certificationRequired`, `acceptanceRequired`, `nudity`, `violence`, `weapon`, `drugs`, `hate_symbol`, `personal_document`, `contact_in_image`, `stock_watermark`, `not_a_photo`, `providerUnavailable`, `unsupportedFormat`, `corruptImage`, `tooLarge`, `stripFailed`, `tooManyPhotos`, `listingNotOpenForPhotos`, `publishFirst`, `levelNotAvailable`
- `BACKGROUND_REFUSALS` (`src/features/posting/refusal-text.ts`:291), route: `certificationRequired`, `acceptanceRequired`, `nudity`, `violence`, `weapon`, `drugs`, `hate_symbol`, `personal_document`, `contact_in_image`, `stock_watermark`, `not_a_photo`, `providerUnavailable`, `unsupportedFormat`, `corruptImage`, `tooLarge`, `stripFailed`, `tooManyPhotos`, `notYourListing`, `listingNotOpenForPhotos`, `photoGone`, `publishFirst`, `levelNotAvailable`, `featureOff`, `backgroundSpent`, `notCover`
- `SELLER_DOOR_REFUSALS` (`src/features/my-listings/my-listing.ts`:267), returned: `noFreeSlot`, `renewOff`, `renewNeedsExpired`
- `CONTACT_REFUSALS` (`src/features/ad-page/ad-page-refusals.ts`:46), returned: `sellersCapReached`
- `TRANSLATION_REFUSALS` (`src/features/admin/translations/translations-service.ts`:424), route: `forbidden`, `machineTranslateRateLimited`, `fileTooLarge`, `invalidEncoding`, `nulByte`, `badHeader`, `wrongFile`, `unknownColumn`, `duplicateColumn`, `emptyFile`, `providerUnavailable`, `providerNoText`, `permission`, `stepUp`, `scope`, `unknownTarget`, `emptyValue`, `writerFailed`
- formGate `required`: `ROLE_REFUSALS` (`roles-service.ts`:156), `PROFILE_EDIT_REFUSALS` (`admin-users-service.ts`:248), `AUTH_FORM_REFUSALS` (`src/routes/auth.tsx`:90), `SETTINGS_FORM_REFUSALS` (`src/routes/settings.tsx`:96), `CATEGORY_REFUSALS` (`category-refusals.ts`:14), `COUNTRY_REFUSALS` (`country-refusals.ts`:16), `LEGAL_REFUSALS` (`legal-service.ts`:126), `BEGIN_REFUSALS` (`impersonation-refusals.ts`:10), `REASON_REFUSALS` (`impersonation-starter.tsx`:21), `LOCATION_REFUSALS` (`location-refusals.ts`:23), `AI_FORM_REFUSALS` (`ai-feature-form.tsx`:23), `RESET_REFUSALS` (`src/routes/auth_.reset.tsx`:53)
- formGate, other: `DIRECTIONS_REFUSALS` (`step-where.tsx`:166) and `DETAILS_REFUSALS` (`step-where.tsx`:170): `long`, `contact`; `AI_FORM_REFUSALS`: `badBudget`; `RESET_REFUSALS`: `tooShort`
- parser `badType`: `ATTRIBUTE_REFUSALS` (`attribute-refusals.ts`:16), `CATEGORY_REFUSALS`, `COUNTRY_REFUSALS`, `LOCATION_REFUSALS`
- route `forbidden`: `ATTRIBUTE_EXPORT_REFUSALS` (`attribute-refusals.ts`:93, with `badScope`), `CATEGORY_REFUSALS`, `COUNTRY_REFUSALS`, `LOCATION_REFUSALS`
- trigger `noFreeSlot`: `MOVE_REFUSALS` (`listing-refusals.ts`:41), `TIER_REFUSALS` (`tier-reasons.ts`:92)
- raise `P0009`: `AI_DOOR_REFUSALS` (`ai-refusals.ts`:18), `MONETISATION_DOOR_REFUSALS` (`monetisation-refusals.ts`:67)

### generic (22), each with its reason

- `PHOTO_REFUSALS` `badValue` — met only when the ad's photos changed while the step was open: the step sends a place inside its own list
- `SELLER_DOOR_REFUSALS` `reviewerOnly`, `ownListing` — met only when the ad left closed or paused while the page was open, so Reopen became a review
- `SAVE_REFUSALS` `listingNotAvailable` — met only when the ad went away while its page was open
- `PROFILE_EDIT_REFUSALS` `unknownUser` — met only when the account was deleted while its page was open
- `MOVE_REFUSALS` `ownerDeleted` — the seller deleted the ad: no staff answer mends it, and the general line says it failed
- `ATTRIBUTE_REFUSALS` `importRunning`, `CATEGORY_REFUSALS` `importRunning` — another import of this console is still running: the general line asks to try again
- `IMPORT_REFUSALS` `badCoordinates`, `badSlug`, `crossCountry`, `levelMismatch`, `missingCoordinates`, `parentInactive`, `parentMissing`, `rootMustBeCountry` — the commit refuses a plan with refusals before it writes; the undo restores the rows it wrote, and meets these only when places changed after the import
- `IMPORT_REFUSALS` `importRunning` — the dialog's own busy line words it by name before the reader
- `IMPORT_REFUSALS` `unknownCountry` — met only when the market chosen as the scope was removed while the dialog was open
- `CATEGORY_REFUSALS` `alreadyActive` — Reactivate is drawn on a retired row alone: only someone else's reactivation first meets it
- `DECISION_REFUSALS` `notYourListing` — met only when the ad was deleted between the queue's read and the decision
- `DECISION_REFUSALS` `ownerOnly` — met only when the seller paused or closed the ad between the queue's read and the decision
- `LEGAL_ACCEPT_REFUSALS` `badLanguage` — met only when the person's language was withdrawn while the screen was open

### unreachable (64), each with its reason

- `SELLER_DOOR_REFUSALS` (`my-listing.ts`:267): `enforcementOnly` — the seller's actions send closed, removed or the ad's own resume status, as its owner; `ownerDeleted`, `severeRestore` — the seller's actions never send screening; `serviceOnly` — the seller's actions never send paused
- `SAVE_REFUSALS` `ownListing` — handled elsewhere: the ad page reads it by name and stops offering Save on the person's own ad
- `REPORT_REFUSALS` `badReason` — the dialog sends only a reason from REPORT_REASONS; `ownListing` — handled elsewhere: the report dialog reads it by name, and the page then stops offering Report
- `CONTACT_REFUSALS` `acceptanceRequired` — handled elsewhere: the ad page sends the person to the acceptance screen (certifyRefusal)
- `LEVEL_REFUSALS` (`promote-service.ts`:209) `badValue`, `ownListing`, `enforcementOnly`, `illegalTransition`, `ownerDeleted`, `ownerOnly`, `reviewerOnly`, `serviceOnly`, `severeRemove`, `severeRestore` — the level door enters the state machine only for its owner's paused ad, to that ad's resume status
- `MOVE_REFUSALS` (`listing-refusals.ts`:41): `badValue` — the dialog sends the two verbs' targets and each verb's own reasons (MOVE_REASONS); `enforcementOnly` — the move core admits only a caller holding listings:enforce; `notYourListing` — the move core refuses a missing ad as listingNotFound first, for a caller holding listings:enforce; `ownerOnly`, `reviewerOnly`, `serviceOnly` — the move core sends the state machine only removed or screening; `severeRemove` — met only by the ad's owner, whom the move core refuses as ownListing first
- `EDIT_REFUSALS` (`listing-refusals.ts`:64): `badValue` — handled elsewhere: EDIT_BAD_VALUES words the reason; every other key is one editChanges writes from the door's list; `photoNotFound` — the edit never sends remove_photos: the photo removal reads its own family
- `AI_DOOR_REFUSALS` `badValue` — handled elsewhere: aiRefusalOf words each of the door's three fields (enabled, unitCost, budget) through AI_BAD_VALUES before this family
- `ATTRIBUTE_REFUSALS`: `unknownBatch` — handled elsewhere: the import dialog words it with its shared import words; `badValue`, `baseLocked`, `unknownEntity` — the commit saves only the pair language's label of the row just written
- `IMPORT_REFUSALS` `badValue`, `baseLocked`, `unknownEntity` — the commit saves only the pair language's name of a row it wrote
- `CATEGORY_REFUSALS`: `unknownBatch` — handled elsewhere: the import dialog words it with its shared import words; `unknownParent` — the commit's plan, read in the same transaction, refuses the same row first; `baseLocked`, `unknownEntity` — the import doors save only the pair language's name of the row just written
- `COUNTRY_REFUSALS` `badCoordinates`, `badSlug`, `crossCountry`, `levelMismatch`, `missingCoordinates`, `parentInactive`, `parentMissing`, `rootMustBeCountry` — the doors write only the market's root place (level country, no parent, a slug location_slug_candidate builds), which the ancestry trigger passes
- `DECISION_REFUSALS` (`use-screening.ts`:297): `badValue` — the decisions send the door's four targets, and the reject dialog only the remove reasons; `enforcementOnly` — the door's targets are active, reduced, rejected and held, never screening or removed; `ownerDeleted` — … never screening; `reviewerOnly` — the door's gate admits only a caller holding listings:review; `serviceOnly` — … never paused; `severeRemove` — … never removed
- `POLICY_REFUSALS` `badValue` — handled elsewhere: POLICY_BAD_VALUES words the door's one field, renew_days
- `TIER_REFUSALS` `badValue` — handled elsewhere: TIER_BAD_VALUES words the door's two fields, tier and reason
- `PHOTO_REMOVE_REFUSALS` (`photo-remove.ts`:25): `badValue` — handled elsewhere: EDIT_BAD_VALUES words the reason, and remove_photos is always the one photo's list; `categoryFixed` — the photo removal sends only remove_photos, never category_id
- `UNDO_REFUSALS` (`undo-edit.ts`:35): `badValue` — the undo door replays a revision's stored keys with its own reason, undo; `categoryFixed` — the undo door turns app.listing_undo on for its own call, which lets a category back; `photoNotFound` — a photo removal is never offered for undo, and its door refuses it as photoRemovalFinal
- `LEGAL_ACCEPT_REFUSALS` (`legal-accept-refusals.ts`:15): `emptyList` — the screen's Accept is disabled while no version waits; `adultRequired` — the screen sends adult whenever a waiting version has no adult confirmation; `notApplicable` — the screen sends only the versions my_legal_status returned for this person
- `ACCESS_REFUSALS` `badValue` — the status block sends an AccountStatus, the door's own statuses

### Words owed (ruling 1, decision 2, class d) — `| words owed | INC-1307`

Each draws its family's generic line today.

| code | door | screen | what the person can do |
|---|---|---|---|
| `slugTaken` | `admin_create_category`, `admin_commit_category_import`, `admin_undo_category_import` | the categories console and its import (`CATEGORY_REFUSALS`) | choose another slug, or fix the file's slug |
| `reassignTargetInvalid` | `admin_retire_category`, `admin_commit_category_import`, `admin_undo_category_import` | the categories console and its import | choose an active category to move the listings to |
| `badValue` | `admin_set_category_window`, `admin_commit_category_import`, `admin_undo_category_import` | the categories console and its import | correct the value the console or the file sent |
| `categoryFixed` | `admin_edit_listing` | the listing editor (`EDIT_REFUSALS`) | keep the ad's category, or move the ad instead |

## 11. CI

- **The base:** `72fb1d4709bdfe8848a457c5ecbcdf7c93f26c8d`, **SUCCESS**, completed 2026-11-26T06:32:27Z, run 45767751214. It was read from ci-evidence `docs/tracking/ci-status.md` before any edit; its commit is the base by `git rev-parse 72fb1d470`. No earlier turn's red was open.
- **Stop 1's push** (f7ede957a, run 45772935453): FAILURE.
  - The smoke source had no results: the live door check's red. That class was the lane's own; 88ed321cd fixed it at its root (the live bodies rebuilt for the walk).
  - Four flaky tests, three of them `POST /factors/[account id]/challenge failed (500)`: INC-1303 itself.
- **Stop 2's push** (88334f2ed, run 45838095211): FAILURE, completed 2026-11-26T14:50:16Z.
  - The i18n map job was red: the scan counted 799 files against the map's 798. Class: the lane's own. Fixed in cb6066bc7.
  - Lane 5 was red, gating: AT-77 in mobile-360 and desktop-1280, `Received string: "Reason: Order refused in {detail}: …"`. Class: the lane's own code (Part 2). Fixed in 26a007cfc (§10).
  - That run had no flaky tests and no challenge 500 gating.
- **This pull request's run on 26a007cfc, the last code commit:** run 45847929830, **SUCCESS**, completed 2026-11-26T15:48:56Z. Its ci-status names commit `26a007cfc0d731b8fb7a689283552c193f1b12f8`, and `gh pr view 112 --json headRefOid` names the same sha: the two-step check holds. `gh pr checks 112`: 43 pass, 2 skipping (the promote job and the Lovable branch guard, which do not run on a pull request), 0 fail.
  - The E2E summary: `last E2E run 45847929830 passed`, 0 flaky.
  - Repeat: 34 of 1500 tests repeated — specs directly changed 0/0, importers of a changed helper 7/116; budget 656 s; the time cap left 36 test runs.
  - Errors outside any test: repeat (2), `Timed out waiting 776s for the test suite to run` and `… for the teardown …`. This is the repeat lane's time cap (DEC-283), and the lane is green.
  - Server errors census: 62 lines, 27 messages, 0 off the allowlist.
  - The flake ledger has no "challenge failed (500)" line. The run's job logs (`gh run view 45847929830 --log`) hold no `challenge 500 on attempt` line and no capture line of a challenge 500. So no 500 occurred where those logs show it, and the retry did not fire. The lanes' own Playwright logs are artifacts, not read.

No re-run was made.

## 12. Limits

- **The auth server's log on a CI lane** is CI's and the capture's. The capture's new cause field is proven by CF-AUTHLOG-5 on a planted line, not yet on a real 500. The local staff runs met no challenge 500, and no unit test drives `aal2Session`, so the retry branch has not run: CI's lanes, where the 500s occur, are its proof.
- **WebKit and the merged tree's first download** are CI's and the supervisor's.
- **Local runs.** `actionlint`, `gitleaks` and the dependency audit could not run here (§5). The E2E values were set: the browser checks ran on ethio-staging by test id.
- **CI evidence.** The lanes' logs were read from ci-evidence (`branches/cursor/bundle-7c/`) and from `gh run view --log-failed`. A lane's own Playwright log lives in its artifact, which was not downloaded.

## 13. Findings

- **`routeFailure` keeps only a short-code detail.** `src/lib/route-client.ts:96–97` applies `REFUSAL_DETAIL` (`src/lib/reader-failure.ts:205`). A door key whose sentence holds `{detail}` loses its row names when it is read only from the failure. The import dialog now reads the detail from the answer (§10). No other caller draws a door-key sentence today (§6). A future consumer that does must take the answer's detail the same way, or the reader gains a typed detail: planned work for the reader's owner.
- **`RATE_FAMILY` is untyped.** `src/components/shell/failure-reason.ts` is outside this lane's scope, so its family carries a `family` line until INC-1280. INC-1280 stays open for that one family, for the turn that next holds the file.
- **An orphan string.** `post.photo.refusal.screeningPaused` (`src/i18n/locales/en-base.ts:561`, `am-base.ts:521`) is no longer read by any family, and no door, route or migration answers its code. Under no-new-string the key was not removed. The i18n usage map shows it unused.
- **A second allowlist parser.** `scripts/conformance/choice-lists.test.ts:199–208` parses its own `key | reason | until` grammar, with its own `permanent` rule, beside `kit.ts`'s `readAllowlist` (K2). `src/components/shell/failure-notice.census.test.ts:105` does the same.
- **check-go and the sandbox.** `check-go --at` writes its snapshot under the system temp folder, which this executor's sandbox refuses (`tar -x … exited 1; nothing judged`). It ran outside the sandbox.
- **Security:** none found. The capture's new field passes through the one redaction before the cut (CF-AUTHLOG-5 proves no planted id, address or token survives).

## 14. Records

INC — INC-1301 fixed: the door judge (`scripts/doors/judge.ts`) adds to each door's own codes those of every public function its last declaration calls, transitively and across overloads, and those of the triggers on every table it writes; a chain it cannot read is named (`callee-unread`), never skipped; 48 manifest lines were corrected by script, the export doors' `unknownCategory` among them (DOORS-22, the self-test's planted callee and trigger cases).

INC — INC-1280 fixed for every family in cursor bundle 7c's scope: one generator (`scripts/doors/door-types.ts`) emits from the manifest the types-only `src/lib/door-codes.generated.ts`; a family is typed `DoorFamily<{doors; also?; generic?; unreachable?; owed?}>` (`src/lib/door-family.ts`), so a code of a listed door without words, or a word for a code no listed door answers and no `also` entry names, does not compile; DW-1 fails on drift, DW-2 on a door named under `src/` that no family lists and no allowlist line excuses; the import dialog's not-ok answer reads the route client's typed failure and a code no family words draws only the general failure line; `RATE_FAMILY` (`src/components/shell/failure-reason.ts`) remains, by its allowlist line, for the turn that next holds that file.

INC — INC-1281's mechanism built: the generator emits each door's permission and step-up and each route's per-method permission (`src/features/permissions/door-permissions.generated.ts`, admin chunks only, BC-17); `useMayCall` (`src/features/permissions/use-may-call.ts`) answers whether the person may call a named door or route, and answers no while loading or after a failed read; DPM-1 lists every literal permission comparison under `src/` with its allowlist line (24 permanent gates, 56 `until INC-1281`); the controls move onto the hook in Lovable 10b part 2.

INC — INC-1303 by branch (B): the auth server CI runs (gotrue v2.197.0, CLI 2.120.0) fails a TOTP challenge only through its one database transaction (`internal/api/mfa.go` :428–459, `internal/models/factor.go` :392–405) and writes the cause into the request line's `error` field (`internal/api/errors.go` :160, :231); the CLI sets no auth log level; no source line names a cause the harness controls; `aal2Session` retries a challenge's 500 once with a fresh challenge and prints `[e2e:setup] challenge 500 on attempt <n> for <label>`; the auth capture keeps a 500 line's `error` field, ids masked, redacted, cut to 200 characters.

DEC — DEC-480 (the supervisor's) — the sign-in server's 500 on a second-factor challenge in test setup is retried once inside `aal2Session` with a fresh challenge, each retry printed in the lane log and counted by the auth capture, which now keeps the server's `error` field; when a capture names a cause the harness controls, it is fixed at that cause in the lane that next owns the harness.

register row — the door manifest's row gains: codes include callees and the triggers on the tables a door writes (`scripts/doors/judge.ts`, DOORS-22).

register row — a code a door answers has words → the generated door codes (`src/lib/door-codes.generated.ts`, `scripts/doors/door-types.ts`) and the typed family (`DoorFamily`, `src/lib/door-family.ts`) → the drift check and the census (`scripts/conformance/door-words.test.ts`, DW-1…7) → exceptions: `scripts/conformance/door-words-allowlist.txt`.

register row — a control shows what its door allows → `useMayCall` (`src/features/permissions/use-may-call.ts`) over the generated permissions (`src/features/permissions/door-permissions.generated.ts`) → the census (`scripts/conformance/door-permissions.test.ts`, DPM-1…4; the browse-path guard admits the hook from admin folders only, BPG-1…4) → exceptions: `scripts/conformance/door-permissions-allowlist.txt`.

register row — the staff helper's row gains: a challenge's 500 is retried once inside `aal2Session` with a fresh challenge, printed and counted (DEC-480; CF-AUTHLOG-5 keeps the server's cause).

changelog — Cursor bundle 7c: the door judge reads each door's callees and triggers, so the manifest names every code a door can answer (INC-1301); every refusal family is typed over its doors' codes from a generated types-only module, so a code without words fails the build (INC-1280); a generated permission map and `useMayCall` let a control read its door's own permission, with a census of every literal comparison for Lovable 10b part 2 to move (INC-1281); test setup retries the sign-in server's 500 on a challenge once, visibly, and the auth capture keeps the server's cause (INC-1303, DEC-480).

roadmap — none dictated by the brief.

slip — cursor bundle 7c Part 2 moved the import dialog's reason onto the route client's typed failure without a case for a detail that is not a short code; CI's lane 5 (AT-77) found it before the final push, and IRW-9 now covers it.
