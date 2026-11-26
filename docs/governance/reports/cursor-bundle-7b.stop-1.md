QUESTION — cursor-bundle-7b STEP 1: the census and the plan (PLAN FIRST)
DONE: STEP 0, STEP 1
LEFT: STEP 2 (Part 1), STEP 3 (Parts 2 and 3), STEP 4 (Part 4), STEP 5, STEP 6, STEP 7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `996b9b2e336819eef2005c987fa0401d1a47697c` (short `996b9b2`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-25T22:27:24Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45712435050
FILES: docs/governance/briefs/cursor-bundle-7b.md
docs/governance/reports/cursor-bundle-7b.stop-1.md
roadmap.md
scripts/conformance/briefs-allowlist.txt

The questions for ruling 1 are at the end (Q1 to Q14). Nothing outside the files above was changed.

## STEP 0

- `origin/dev` = `996b9b2e336819eef2005c987fa0401d1a47697c` = the brief's base (fetched again just before this report); `git status --short` was empty; branch `cursor/bundle-7b`.
- The brief was saved by `cp` from the carrier's folder; `sha256sum` = `30ecb2103b7c9660408c101419d88787875a089fd1445930b4dbebf0aed6e53f`, equal to the carrier's value.
- Roadmap line 3 names `docs/governance/briefs/cursor-bundle-7b.md`; `bunx prettier --check roadmap.md` passed.
- `scripts/conformance/briefs-allowlist.txt`: the one `cursor-bundle-7a-ruling-1.md:61` line removed; the header stays.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-7b.md --root .` (run again just before this report):

```
[check-go] no finding
```

- CI of dev at `996b9b2`: SUCCESS (above); `guards-last-failure.md` names the same run and commit (attempt 1); `e2e-last-failure.md`: "last E2E run 45712435050 ran no lanes — the code tree was proven by run 45705204730"; `local-backend-proof.md` names commit `8df5d28db` (run 44756753510, non-gating). No red to fix first.

## mechanisms (read before anything is proposed)

- Route client — `src/lib/route-client.ts`: `RouteAnswer` :7; `timeoutMs` opt-in :26, armed at :96–101; the fetch transport :116; `reported()` :162; `downloadRoute` :175; `uploadRoute` :187, an XHR at :211 with its timer at :266–272 (only when `timeoutMs` is given).
- Generated client — `src/integrations/supabase/client.ts`: `createSupabaseFetch` :10–31 calls the global `fetch(input, {...init, headers})` at :29 with no signal; `createClient` :50 passes it as `global.fetch`. The file is platform-generated (rule 10, Vendors: "never hand-edited").
- Door client — `src/lib/supabase-door.ts`: `door` (`loadOnce` of the generated client) :83; `getSupabase` :92; `currentSession` :240 (loads the client only when a session is stored); `anonymousRpc` fetch :300, no deadline; `callDoor` → `client.rpc` :361; the client starts at module evaluation when a session is stored (:370).
- Query client — `src/features/auth/session-query-client.ts`: `retries()` :15–20 (3 in the browser); the wrap :46 `retry: (count, error) => !endsSession(error) && retries(own, count, error)`; `fetchQuery` `retry: false` :64; the caches' subscriptions call `reportUnauthorised`. No test file exists for it.
- Failure reading — `src/components/shell/failure-reason.ts`: `KINDS` :27; `GONE_CODES` :43–50 (`listingNotFound`, `listingNotAvailable`, `unknownPlace`, `unknownCategory`, `notYours`, `notYourListing`); `isRetryable` :53 (network | server); the reader through `loadOnce` :74; `decide` :89–103 (status first, then `cls`, then `GONE_CODES` at :100); `failureKind` :115; `useFailureKind` :142.
- Reader — `src/lib/reader-failure.ts`: `REFUSAL_STATUS` :26–94 (`notYourListing`, `notYours`, `photoGone` are 404); `refusalStatus` :97 (default 400); `GATE_REFUSED_CODES` :127; `classify` :156 (`agrees = status === undefined || status === refusalStatus(gate)`); `gateRefusal` :206 (null when the status disagrees, :213); `ReaderError` :220; `readFailed` :238.
- Server reader — `src/server/answer.ts:262–280` `readFailure` re-answers at the table's status through `gateRefusal`; `src/server/media/links.ts:105`.
- Retry hook — `src/components/shell/use-retry-failed.ts`: refetches every active query whose `status === "error"`, whatever its kind.
- Failure notice — `src/components/shell/failure-notice.tsx:64` (`subject` drawn before the kind's words; Retry only when `isRetryable` or `retryLater`); its census `failure-notice.census.test.ts`: `trips()` :67, `UNTIL_10B` :90, `ALLOW` :91–109.
- Move door — `admin_move_listing` (`20261118012400…sql:34`) → `admin_move_listing_core` (`20261118012100…sql:111`): reason lists per kind, `noteRequired` only for `other`, `noteTooLong` over 500, an `audit_log` row `listing.<kind>` with meta `{from, to, reason, note}` and a `seller_notices` row. Client pieces: `src/features/admin-listings/move-reasons.ts` (`MOVE_REASONS` :26 — remove: prohibited, misleading, duplicate, contact_in_text, photo, rules, other; `NOTE_MAX` 500; `moveProblem` :51 needs a note only for `other`), `reason-note.tsx` (`ReasonNote`, the note required only when the reason is `other`).
- Review door — last declaration `20261118013000_3d2071ff-9fcb-4ad9-bf37-b366172e9c69.sql` (~:238) `admin_review_listing(p_listing_id uuid, p_new_status text)`: `door_context` staff `listings:review` `staff_moderation` scope row; `badValue` on status; → `transition_listing_core`; EXCEPTION → `door_refused`; grants `authenticated`, `service_role`. It writes no `audit_log` row (the core writes `listing_revisions`).
- Staff helper — `e2e/helpers/ui.ts`: `stepsUsed` (per worker) :936; `aal2Session` :959; the challenge at :977 is inside the attempt loop but outside its `try`, so a challenge 500 throws at once and only the verify is retried (8 s wait). Pool slot = `parallelIndex % pool.length` (:767–790); the pool's size equals `E2E_WORKERS` (`e2e/global-setup.ts:504–512`), which equals the lane's workers (`.github/workflows/local-backend-proof.yml:179`). `e2e/helpers/staff-factor.ts` keeps a per-worker factors map.
- Lazy check — `scripts/bundle-closure.mjs`: `MUST_STAY_LAZY` by chunk-name prefix (reader-failure, legal-page-data, zod, posting-service, overlays-impl); `mustStayLazyViolation` :81 compares names only; `MUST_NOT_CARRY = ["GoTrueClient"]`; caller `scripts/check-bundle-size.mjs:147`, the entry closure only. Module record: `scripts/chunk-modules-plugin.mjs` writes `dist/.chunk-modules.json` as `{chunk: [moduleKey…]}`.
- Vendor source read (lock-exact `node_modules`): supabase-js 2.110.9 passes `settings.global.fetch` to auth, postgrest, storage, functions and realtime; postgrest builders take `.abortSignal()`; auth-js has no per-call signal. In auth-js 2.110.9 `_listFactors` calls `getUser()` (`GoTrueClient.js:4900`) and `_getAuthenticatorAssuranceLevel` decodes the token's `aal` and calls `getUser(jwt)` (`:4930–4936`): today's factor read makes two `GET /auth/v1/user` requests. TanStack Query 5.101.1: `networkMode: 'online'` pauses a query while offline; the retryer also waits on `focusManager`.

## definition and consumers, by concern

### Concern 1 — every `fetch(` and client constructor under `src/` that reaches our backend

Browser:
- `src/integrations/supabase/client.ts:29` (the generated client's fetch, every door, PostgREST, auth and storage call) — bypasses (no deadline).
- `src/lib/supabase-door.ts:300` `anonymousRpc` — bypasses.
- `src/lib/route-client.ts:116` (fetch) and `:211` (XHR) — uses only when the caller passes `timeoutMs`; `posting-service.ts:100` (`SAVE_TIMEOUT_MS` 30 s), `:194` (`BACKGROUND_TIMEOUT_MS` 60 s) and `category-images-service.ts:51` pass one; the photo upload (`posting-service.ts:166`) and every other caller do not.
- `src/i18n/provider.tsx:143` (the languages gate, `no-store`, retried once) — bypasses.
- `src/i18n/bundle.ts:158` (the bundle route, with an rpc fallback) — bypasses.
- `src/features/auth/auth-service.ts:367–368` (the password verifier's second `createClient`) — bypasses.
- `src/features/posting/photo-editor.tsx:129` (the stored photo) — bypasses.
- `src/features/admin/translations/use-translations.ts:396` (`/i18n-usage.json`) — bypasses; Lovable's folder (SIDE BY SIDE): an allowlist line, not an edit.
- `src/features/posting/map/leaflet.ts:177` — the tile host, not our backend: an allowlist line.

Server (the census's EXCEPTIONS): `src/integrations/supabase/client.server.ts`, `src/integrations/supabase/auth-middleware.ts` (generated), `src/server/supabase/user-client.ts`, `src/server/upstream.ts` (already deadlined per call).

### Concern 2 — every query and mutation with its own `retry`

- No query sets `retry` to a function (grep `retry:\s*\(` and `retry:\s*[a-z]` over `src/`).
- `retry: false`: `src/routes/auth.tsx:176`; my-legal-page :30; use-attributes :143, :163; my-legal-version :24; legal-accept-screen :25, :70; certify-block :31; use-legal-gate :60; use-legal :36; saved-page :41; use-impersonation :71, :91; use-admin-listing :310, :375 — each inherits the rule unchanged (no retry).
- Numbers: use-translations :402 (1, Lovable's folder), use-card-photos :63 (2), use-photo-links :44 (2), usePermissions :40 (1) — each bounded by the new rule (its count still caps).
- `useRetryFailed` callers: users-list :74, languages-page :220 (Lovable), legal-page :67, legal-editor :10, products-section :82, roles-list :54, locations-page :95, legal-version-view :123, categories-page :200, markets-section :58.

### Concern 3 — paused/offline

- ASSERT-ABSENT confirmed: nothing under `src/` reads `onlineManager`, `isPaused` or `fetchStatus`.
- Loading states: 183 sites in 69 `.tsx` files. `OnDemandNotice` is mounted once at `src/components/app-shell.tsx:1205`.

### Concern 4 — every caller of the three route transports

22 files, 32 calls. Hand-built failures (bypasses):
- `src/components/shell/category-tree.ts:332`; `use-card-photos.ts:31`; `use-photo-links.ts:16`; `catalog-finder.ts:66–67`; `src/features/feed/use-feed.ts:42–47` (`Object.assign(new Error, {status})`); `src/components/shell/location-data.ts:185–188`, `:214–217` (through its local `failed()` :170–181, which loads the reader on demand — the pattern the new function takes); `src/features/admin-categories/category-images-service.ts:54–63` (its own class).
- Out of this lane: `src/features/admin/translations/translations-service.ts:568–574`, `:639–642`, `:1062–1073` (Lovable's folder); `src/features/admin/import-dialog.tsx:287–299` (bundle 7c, INC-1280). Both contradict "LEFT: none" (Q8).
- Silent fallbacks (an answer that is not ok becomes a default, no failure): `similar.ts:28`, `pricing-data.ts:217`, `:276`, `step-where.tsx:228`, `attribute-options.ts:176`, `leaflet.ts:103–104`, `geocode.ts` — named under K2; the brief's concern is the throw, these are findings (F3).

### Concern 5 — readers of `failureKind`, `readerFailure`, `gateRefusal`

- `failureKind` / `useFailureKind`: `impersonation-notice.tsx:64`, `impersonation-view.tsx:60`, `impersonation-banner.tsx:28`, `failure-notice.tsx:76`.
- `readerFailure`: about ten feature files (each reads the class the reader returns; none re-checks the status).
- `gateRefusal`: `reader-failure.ts` `classify`, `src/server/answer.ts:262–280` (the server re-answers at the table's status), `src/server/media/links.ts:105`. Changing `gateRefusal` to trust the arrived 400–499 status therefore also changes the server's `readFailure` answers: it would answer the database's status (the truth) rather than null → `server`.

### Concern 6 — the review door and its screens

- Door, manifest `scripts/doors/manifest.txt:106` `admin_review_listing(uuid,text)`; public-surface allowlist :231; acceptance-doors allowlist :42 (keyed `admin_review_listing(uuid,text)`); refusal classes already hold `noteRequired` (:53) and `noteTooLong` (:61).
- Hook `src/features/admin-screening/use-screening.ts:273` `decideListing(listingId, next)`.
- `screening-page.tsx` (1007 lines): row menu :489, bulk :757 (`admin-screening-bulk-reject`), preview :955 (`admin-screening-preview-reject`); confirm dialog :810–861 (`admin-screening-confirm`, `-confirm-go`, `-confirm-problem`); decide loop :580–615.
- Edit page `src/routes/admin.listings_.$listingId_.edit.tsx:86–162`: its own confirm with `decideListing`.
- SF-8 `use-screening.test.ts:218`; specs that reject through the UI: SC-3 (:257), SC-14 (:685), SC-26 (:1394); specs that call the door with two arguments: SC-4, SC-16, SC-19.

### Concern 7 — every last declaration and route that answers `notYourListing`, `notYours` or `photoGone`

Last declarations raising `notYourListing` (every one at 404 through `door_refusal_status`): copy_my_listing, edit_my_listing, listing_counts, listing_history, mark_sold, move_listing_photo, my_listing, my_listing_certification, my_listing_private, publish_listing, remove_listing_photo, renew_listing, resume_listing, save_seller_place, set_cover_photo, set_listing_level, set_listing_photos_soon, set_listing_pin, set_listing_reach, set_listing_reserved, submit_listing, transition_listing, transition_listing_core. `notYours`: my_legal_version. Every one folds "missing" and "not yours" into one code (DEC-391): a stranger gets the same code for a row that does not exist. `listingNotFound` appears only after ownership is proven (an owner's deleted ad in copy/edit; submit's race at :129), for the service role (transition_listing_core :56), or in admin doors. `promote_options` answers `listingNotFound` for both. `replace_listing_photo` is service-only.

Routes (status answered → the table's):
- `src/routes/api/upload/photo.ts:188` `notYourListing` 403 → 404; `:260` `photoGone` 409 → 404.
- `src/routes/api/listings/photos.$id.ts:66` `notYourListing` 403 → 404 (null for a missing photo and a stranger's alike).
- `src/routes/api/listings/background.ts:115` `notYourListing` 403 → 404; `:136` `photoGone` 409 → 404.
- `src/routes/api/listings/assist.ts:194` answers a verdict at 200 (not a refusal).

Route-status census (scratch script over every `clientError(code, status)` pair under `src/routes/` and `src/server/`): 30 explicit pairs, 18 differ from `refusalStatus`. Five are the table codes above. Thirteen are route-only codes, for which `refusalStatus` answers its default 400: background.ts :119 `listingNotOpenForPhotos` 409, :140 `notCover` 409; `locations.$country.ts:99` `closedOrUnknownMarket` 404; `seller.ts:61` `unknownSeller` 404; photo.ts :190, :207 `acceptanceRequired` 409, :220 `certificationRequired` 409; `answer.ts:135` `modelRateLimited` 429; `imports/route.ts:272` `fileChanged` 409; `jobs/route.ts:34` `unauthorized` 401; `route.ts:238` `forbidden` 403, :279 and :282 `unsupportedMediaType` 415 (Q7).

Words that claim the row exists: `en-base.ts:575` `post.photo.refusal.notYourListing` and `:601` `post.refusal.notYourListing` ("This listing belongs to another account."; am-base :532, :556); `en-member.ts:296` `post.error.notYours` ("This draft belongs to another account."). `en-base.ts:157` `myListings.error.notYours` already reads "This ad could not be found." Mappings: `src/lib/refusal-text.ts:54`, `:147`, `:152`.

### Concern 8 — the census lines of this lane and why each trips

- `src/features/admin-attributes/attribute-dialogs.tsx` — branch at :606 and :1150 (`AttributeDialogAlert message={t("admin.attributes.links.error")}`, its own `<p role="alert">` at :80–87).
- `src/features/auth/mfa/staff-factor-gate.tsx` — :171 (`StaffFactorFailed`).
- `src/routes/settings.tsx` — :232 (`if (profile.error) reportOnDemandFailure(...)`), which draws no words in place.
- `src/components/app-shell.tsx` :291, :541, :922 and `src/routes/auth.tsx` :156 — false positives: `${errorText(` inside a `console.warn` template matches RAW `/\{\s*errorText\(/` (Q11).
- `src/features/posting/step-photos.tsx` :192, :676, :695; `src/features/posting/photo-editor.tsx` :246.
- Left as the brief says: import-dialog (7c), the four translations/forms lines (Lovable), the two `INC-1279 permanent` lines.

### Concern 9 — the second-factor mint and the lazy check

- `aal2Session` is reached by 55 of the 118 spec files: through `signInStaff` (29 specs), `signInJobSuperAdmin` (39, via `freshAal2Session` `ui.ts:1029`), `asStaff` (6) and `staffSession` (4) (`e2e/helpers/staff-factor.ts:118–151`).
- Lazy check consumers: `scripts/check-bundle-size.mjs:147`; `scripts/bundle-closure.test.ts` BC-1 → BC-16.

## premises (found wrong) and OPEN (a)–(e)

Premises found wrong:
- P1 (INC-1297): no door or route tells a stranger an ad exists. Every door folds a missing row and a stranger's row into `notYourListing` (one code, 404), and `photos.$id.ts:66` answers both alike. 7a's F2 example (`set_listing_level`) folds too. What remains true: five route statuses disagree with the table, and three strings claim the row exists ("belongs to another account"). So concern 7 needs no door body for the code (Q6).
- P2 (concern 8, INC-1291): the factor gate is not what carries the Supabase client onto the four pages; it already arrives on demand (`staff-factor-gate-lazy.tsx`). The carrier is `src/features/admin/nav-alerts.ts:3`, `import { getAal } from "@/features/auth/mfa/mfa-service"`, which is in the `/admin` layout's own chunk (`admin-67lyVEYO.js`, with admin.tsx, admin-shell-provider, nav-layer, rail-items, staff-factor-gate-lazy). `mfa-service-tb7QCvkj.js` imports `client-CVYRkgaY.js` (generated client) → `dist-CE1baibP.js` (GoTrueClient) statically. Read from my base build's route manifest and `dist/.chunk-modules.json`. `nav-alerts.ts` is outside SCOPE (Q12). It uses `getAal` only to gate `legal_review_overdue` on aal2 (:31–33), and its `throw new Error("the session's assurance level could not be read")` (:32) is a hand-built failure.
- P3 (INC-1303): the record says the challenge is "outside the attempt loop"; it is inside the loop and outside its `try` (`ui.ts:977`). The two-workers-on-one-factor hypothesis contradicts the pool's design: each worker has its own slot (`parallelIndex % pool.length`, pool size = the lane's workers).
- P4 (DEC-469): "both required" conflicts with "exactly as … All listings does", where the note is required only for `other` (`move-reasons.ts:51`, `reason-note.tsx`, `admin_move_listing_core`) (Q2).
- P5 (concern 4): "LEFT: none" conflicts with SIDE BY SIDE and 7c's ownership: `translations-service.ts` and `import-dialog.tsx` build failures by hand (Q8).

OPEN:
- (a) Where a deadline can live that the platform's regeneration of `client.ts` cannot remove. Answer from the vendor's source: yes, `global.fetch` is the only fetch supabase-js 2.110.9 gives auth, postgrest, storage, functions and realtime (realtime's socket aside). It is set only in the generated `client.ts`, a file rule 10 says is never hand-edited. Its fetch reads the global `fetch` at call time, so the only other injection point is patching `globalThis.fetch`, which would deadline every fetch on the page, the tile host included: rejected. Proposal: the deadline lives in the new module and is applied per call by our seams. `supabase-door.ts` `callDoor` uses `.abortSignal(deadline(cls))` on the rpc builder (a real abort) and `anonymousRpc` passes the same signal. The route client takes its default from the module. The two `fetch(` paths in `src/i18n/` and `photo-editor.tsx` take the signal. The password verifier's `createClient` (`auth-service.ts:367`) gets `global.fetch` from the module (it is our constructor, not the generated one). Auth-js calls on the generated client have no per-call signal: the seams that call them (auth-service, mfa-service) race them against the auth deadline and answer the network kind, but the request itself is not freed. A real abort for those needs either a ruling that `client.ts` may carry one import (the census guard then fails CI the moment a regeneration drops it) or the platform's own option (Q1).
- (b) Deadline values (the module `src/lib/call-deadline.ts`, one row per class):
  - read 15 s — a page of rows (20–60 KB) at 2G's ~8 KB/s takes about 8 s; 15 s leaves twice that.
  - write 30 s — the value in force for draft saves since DEC-135 / INC-439 (`SAVE_TIMEOUT_MS`).
  - auth 20 s — a sign-in hashes a password and a token refresh blocks every call behind it.
  - upload: a stall deadline of 30 s without a progress event, inside a ceiling of 300 s — the photo form's ceiling is 2 MiB (`photo.ts:501`), about 260 s at 8 KB/s, so a fixed total would fail a slow but working phone.
  - download (staff CSV) 60 s; model (the background tool) 60 s — `BACKGROUND_TIMEOUT_MS`, kept.
- (c) INC-1303's cause. CI keeps no auth server log: the lane's artifacts are the lane JSON, results, log and error-context (`local-backend-proof.yml` ~:1050–1110). The database container is found by its `supabase_db_*` prefix (:528); the auth server's is `supabase_auth_<project_id>` (`project_id` zwmvxvzzvjvtdcfcwiuf). Two workers challenging one factor at once is ruled out by the pool (P3). Proposal: a capture step on a failed lane in `local-backend-proof.yml` (in SCOPE for this only), listed in `wired.test.ts`. It writes only counts of `/factors/*/challenge` and `/verify` lines by status, plus each 500's `error_code`/`msg` field, with no header, token or body. Read the cause before the fix (Q13).
- (d) Proposal: the shell says it once. With 183 loading sites in 69 files, per-screen words would touch every screen. The shell's one notice dock shows the network words while `onlineManager` is offline and a query is paused, and clears on the browser's `online` event (no polling). Each screen's loading state stays. `failureKind` reads a paused query as the network kind, so a screen that draws a failure while paused draws the network words (Q4).
- (e) Proposal: yes. `useRetryFailed` re-reads only queries whose reading `isRetryable`, plus `rateLimited` after its time. A refused read keeps its notice and its exit, and is not re-sent (Q5).

## tests (each consumer's own; every test that asserts what changes)

- Query client: none today → `src/features/auth/session-query-client.test.ts` (new).
- `failure-reason.test.ts`: FR-U9 (:52) asserts `GONE_CODES` → re-pointed to "a 404 reads gone by status".
- `reader-failure.test.ts`: :43–44, :87–88, :208 pin a disagreeing status as malformed → re-pointed to the trusted class (500+ stays `server`).
- `refusal-readers.test.ts`: :101–102, :291–293, :325, :331 (CF-REFUSAL-2 / -6 hold).
- Route tests: `photos.test.ts` :129, :152–153; `background-route.test.ts` :188, :208–211; `assist.test.ts` :182–187; `draft.test.ts` :164, :177; `publish.test.ts` :112; `door.test.ts` :50–55; several my-listings and posting unit tests asserting `notYourListing` words.
- Browser: `e2e/photo-pipeline.spec.ts` :311, :422, :1646 (PP-26), :2024; `e2e/posting-routes.spec.ts` :969, :1275, :1282, :1297 (PR-49), :1505; `my-listings-doors.spec.ts` :331–356, :878, :1013; `my-listings-ad.spec.ts` :314, :346, :624; `ad-page-doors.spec.ts:185`; `legal-certify.spec.ts:439`; `my-listings-levels.spec.ts:415`; `legal-doors.spec.ts:903`; `auth-caller-gates.spec.ts:235`.
- AT-73b `e2e/admin-attributes-safety.spec.ts:266–268`: `toHaveText(en["admin.attributes.links.error"])` changes with the notice (subject + the kind's words).
- Screening: SF-8 `use-screening.test.ts:218`; SC-3, SC-14, SC-26 (UI reject), SC-4, SC-16, SC-19 (two-argument calls). `e2e/admin-screening.spec.ts` holds 30 tests already: the new Reject tests go in a new spec file (below).
- Factor gate: `staff-factor-gate.test.tsx` (mocks `./mfa-service` with `importActual`), `staff-factor-gate-lazy.test.tsx`, `mfa-service.test.ts`.
- Lazy check: `scripts/bundle-closure.test.ts` BC-1 → BC-16.
- A retried refusal: 30 unit test files name `retry`; their multi-call assertions (`toHaveBeenCalledTimes(2|3|4)`: category-tree.test :103 CTR-U1 and :117, location-verb-dialogs.test :114, :123, use-step-up.test :62, background-dialog.test :156, impersonation-notice.test :103, router.test :57, :81) are explicit retries or re-reads by the caller, not the query client's background retry; none was found relying on a refusal being retried. Each is re-read at Part 2; the new tests assert one request.

## lists

- Manifest `scripts/doors/manifest.txt:106` → the review door's key becomes `admin_review_listing(uuid,text,text,text)`, its codes column gains `noteRequired`, `noteTooLong` (and `badValue` for the reason).
- `scripts/public-surface-allowlist.txt:231` and `scripts/acceptance-doors-allowlist.txt:42` → the new key.
- Briefs allowlist: done at STEP 0.
- `scripts/conformance/wired.test.ts`: its domain is scripts files (check-*, *.sh, census modules); the failure-notice census is a `src/` test, so it joins only when it moves under `scripts/conformance/` (Q10). The new censuses (`call-deadline`, `query-retry`, `route-status`) join it.
- Conformance register: `docs/features/ci-guards.md` (and `docs/features/doors.md` for CF-REFUSAL-n; `doors.md:366` names "until bundle 7b aligns them").
- Refusal classes `scripts/conformance/refusal-classes.txt`: `noteRequired`, `noteTooLong` exist; no new code unless Q2 adds `reasonRequired`.
- Route-client allowlist (11 lines): the light read's token reader and its `GET /auth/v1/user` need a line or sit in `supabase-door.ts` (already listed).
- Failure-notice census `ALLOW`: this lane removes attribute-dialogs, staff-factor-gate, settings, app-shell, auth, step-photos, photo-editor (seven lines).
- E2E selector `scripts/e2e-select.ts`: every spec must be reachable from an area (the test at :97); the new `e2e/admin-screening-reject.spec.ts` joins the admin-screening area (:126); `e2e/offline.spec.ts` needs an area.
- Exact-list assertions: the 15 route-client mocks below; `REFUSAL_STATUS`'s keys are held equal to `door_refusal_status` by CF-REFUSAL-2 (unchanged unless Q6 removes codes).

## old-file-readers

- `GONE_CODES`: `failure-reason.ts:43–50`, `:100`; FR-U9 (:52). No guard, script or document reads it beyond that and the roadmap/brief lines.
- `notYourListing` / `notYours`: the doors and routes above, `reader-failure.ts` (`REFUSAL_STATUS`, `GATE_REFUSED_CODES`), `refusal-text.ts:54`, `:147`, `:152`, the locale keys above, `refusal-classes.txt`, the manifest's codes columns, `docs/features/doors.md`, and the tests above.
- The census lines this lane removes: only `failure-notice.census.test.ts` itself (its stale-line rule).

## second-readers

- `@/lib/reader-failure`: no `vi.mock`; dynamic imports at `preferred-language.ts:31`, `failure-reason.ts:74`, `location-data.ts:170`.
- `@/lib/route-client`: mocked in 15 test files, every one a factory without the original, so a new export must be added to each: first-reads.test, location-data.test, rail-first-paint.test, use-photo-links.test, country-import-dialog.test, category-images-service.test, use-feed.test, posting-service-reads.test, posting-service.test, geocode.test, translations-service.test (Lovable's folder — Q8), import-dialog.test (7c — Q8), attributes-page.test, use-seller-feed.test, location-import-dialog.test.
- `@/lib/supabase-door`: mocked in 36 files; `@/integrations/supabase/client`: mocked in 42; the client is imported dynamically only at `supabase-door.ts:84`.

## chunk-graph (my base build; the after is the build's)

- Entry closure today: no reader-failure, no GoTrueClient (MUST_NOT_CARRY passes). The typed route failure loads the reader on demand, as `location-data.ts:170` does, so `src/lib/reader-failure.ts` stays off the entry (INC-864). The deadline module is a table of numbers plus `AbortSignal.timeout`; its weight in the entry is measured at the build (expected well under 1 KiB, not yet measured).
- The four pages carry `mfa-service` → generated client → GoTrueClient through `nav-alerts.ts:3` (P2). The light read takes them off only if nav-alerts moves too (Q12).

## environments

CENSUS-ITEM environments: not applicable — OPEN (a)'s answer changes no build option.

## first-download (before; my lock-exact build of `996b9b2` + the task-saved commit, docs only)

`bun install --frozen-lockfile`: "Checked 607 installs … (no changes)"; `bun run build && node scripts/check-bundle-size.mjs`: "Bundle budget OK". JS 206.9 / 208 KiB; CSS 22.7 / 24 KiB; admin code in the entry: 0 modules. The pages this lane moves (size / ceiling, KiB; NEAR band 0.3 KiB):

| page | before | room |
| --- | --- | --- |
| `/` | 226.3 / 227 | 0.7 |
| `/admin` | 268.2 / 269 | 0.8 |
| `/admin/` | 269.0 / 270 | 1.0 |
| `/admin/images` | 268.9 / 270 | 1.1 |
| `/admin/impersonation_/$sessionId` (view-as) | 296.9 / 298 | 1.1 |
| `/admin/attributes` | 323.2 / 324 | 0.8 |
| `/admin/listings_/$listingId_/edit` | 415.6 / 416 | 0.4 |
| `/admin/screening` | 353.6 / 354 | 0.4 |
| `/settings` | 280.2 / 281 | 0.8 |
| `/post` | 406.4 / 407 | 0.6 |
| `/l/$slug` | 251.8 / 253 | 1.2 |
| `/auth` | 222.5 / 223 | 0.5 |

Every page of the 50 reads OK. The deadline module and the retry rule ride the root/shell (every page); their cost is measured at the build and every page then in the band is raised by `ceilingForLocal` with its cause (rule 10, Speed). The light read is expected to lower the four admin pages by the client's chunks.

## callee-codes (doors whose body changes)

- `admin_review_listing` after Part 1, every refusal and its class: from `door_context` the staff gate's (`notSignedIn` 401, `permissionDenied` 403, `accountDeactivated` 403, `stepUpRequired` 428, the scope's refusal); `badValue` (status, reason) 400; `noteRequired` 400; `noteTooLong` 400; from `transition_listing_core`: `listingNotFound` 404, `illegalTransition`, `reviewerOnly`, `ownerDeleted`, `enforcementOnly`, `severeRestore`, `severeRemove` at their classes. Callers: Screening's dialog (each code's words through `MOVE_REFUSALS`/the screening refusals, the dialog stays open on a refusal and shows `admin-screening-confirm-problem`), the edit page's confirm (same words), SC specs.
- Concern 7's doors: none change if Q6 is answered as proposed.

## cell-meaning

CENSUS-ITEM cell-meaning: not applicable — no dial changes.

## gate-reach (the factor gate's change)

- Specs and helpers: the 55 specs through `signInStaff` / `signInJobSuperAdmin` / `asStaff` / `staffSession` — inherit (the gate's rule is unchanged; only its read). `staff-factor-gate.test.tsx` — moves (it mocks `listFactors`/`getAal`; it will mock the light read). `e2e/helpers/staff-factor.ts` — inherits.
- Paths the gate guards: every `/admin/*` page under `src/routes/admin.tsx` — inherit.

## user-cases → test ids

- Screening Reject, en and am, 360 / 768 / 1280: the reason missing (Go disabled, `-confirm-problem`), the note missing (per Q2) or over 500, the door's `noteRequired`/`noteTooLong`/`badValue`/`listingNotFound`/`illegalTransition` words, the sign-in ending (the step-up dialog) → SRJ-1 → SRJ-5 in `e2e/admin-screening-reject.spec.ts` (new) and SF-8 widened; the door's own proofs in its migration file.
- A read that runs out → CDL-1 → CDL-4 (unit, fake timers; door, anonymous call, route, upload stall); browser: NONE (a 15 s wait in a spec is not proposed).
- Offline and back → OFF-1 (`e2e/offline.spec.ts`, `context.setOffline`), FR-U15.
- A refused read not retried → SQC-1 → SQC-3, and RRF-1 for `useRetryFailed` skipping a refusal.
- A stranger's ad id at each route concern 7 changes → PP-26, PR-49 and the photo/background unit tests re-pointed to 404 and the gone words.
- The factor gate's failed read → SFG-1 → SFG-3 (`staff-factor-gate.test.tsx`: the notice with Retry, never "set up an authenticator").
- Doors' stranger cases: unchanged (P1); their existing specs keep asserting `notYourListing` at 404 unless Q6 says otherwise.

## findings

- F1 — `src/features/admin/nav-alerts.ts:3` brings the Supabase client onto every `/admin` page's first download through `getAal` (P2); `:32` throws a hand-built `Error`.
- F2 — failure-notice census false positives on `console.warn` templates (`app-shell.tsx:291`, `:541`, `:922`; `auth.tsx:156`): the RAW rule `/\{\s*errorText\(/` matches `${errorText(`.
- F3 — silent fallbacks on a route answer that is not ok: `similar.ts:28`, `pricing-data.ts:217`, `:276`, `step-where.tsx:228`, `attribute-options.ts:176`, `leaflet.ts:103–104`, `geocode.ts`.
- F4 — `docs/features/admin-shell.md:32` still names `categories:manage` (in SCOPE; fixed with Part 4's docs).
- F5 — today's factor read makes two `GET /auth/v1/user` requests (auth-js 2.110.9 `GoTrueClient.js:4900`, `:4936`); the light read makes one.
- F6 — the photo upload (`posting-service.ts:166`) has no deadline at all; an XHR on a dead network waits forever.
- No security hole found.

## queued (rg across docs/governance/briefs, docs/governance/reports, docs/features, roadmap.md)

- INC-1291 (`cursor-bundle-6-ruling-3.md:41`, `cursor-bundle-6.report.md:540`) — built here (Part 3), subject to Q12.
- INC-1296 (`cursor-bundle-7a-ruling-1.md:12–13`, `:35`; 7a report :180, :189) — built here (Part 2).
- INC-1297 (`cursor-bundle-7a-ruling-1.md:69`; 7a report :186) — built here (Part 3), subject to Q6.
- The routes' own 403/409 statuses (7a report :122, :190; 7a stop-2 :35; `docs/features/doors.md:366`) — built here (Part 3).
- `docs/features/admin-shell.md:32–34` `categories:manage` (7a stop-2 :35) — built here (Part 4 docs).
- INC-1298 (7a report :187, :211: "bundle 7b … INC-1298 stays open") — translator targets in SQL, not named by this brief, the translations area: left (for the ruling to place).
- INC-1301 (`roadmap.md:40` lists it under bundle 7b) — the brief gives it to 7c: left (bundle 7c).
- INC-1299 — built in 7a.
- `roadmap.md:43` (records turn R18) — not this lane's.

## THE PLAN

### Parts and files

- Part 1 (STEP 2, migration stop) — `supabase/migrations/<ts>_<uuid>.sql` (one file): the review door. `scripts/doors/manifest.txt`, `scripts/public-surface-allowlist.txt`, `scripts/acceptance-doors-allowlist.txt` (the new key), `scripts/conformance/refusal-classes.txt` only if Q2 adds a code. `bun run db:proof --fresh`; stop-2.
- Part 2 (STEP 3) — `src/lib/call-deadline.ts` (new) + test (CDL); `src/lib/supabase-door.ts` (callDoor signal, anonymousRpc), `src/lib/route-client.ts` (default by class; `routeFailure(answer)` → `ReaderError`, reader on demand) + RCL tests; `src/i18n/provider.tsx`, `src/i18n/bundle.ts`, `src/features/auth/auth-service.ts`, `src/features/posting/photo-editor.tsx` (the signal); `scripts/conformance/call-deadline.test.ts` (new) + allowlist; `src/features/auth/session-query-client.ts` + test (SQC); `scripts/conformance/query-retry.test.ts` (new); `src/components/shell/use-retry-failed.ts` + test; `src/components/shell/failure-reason.ts` (GONE_CODES gone, paused read) + FR tests; `src/lib/reader-failure.ts` (trust the class) + RF tests; the shell's offline line in `src/components/app-shell.tsx`/`notice-dock`; `e2e/offline.spec.ts` (new); concern 4's bypasses (category-tree, use-card-photos, use-photo-links, catalog-finder, use-feed, location-data, category-images-service) + the 13 in-lane route-client mocks; `scripts/conformance/route-client.test.ts` RCG-5.
- Part 3 (STEP 3) — `use-screening.ts`, `screening-page.tsx` (split: the reject dialog into `screening-reject-dialog.tsx`, on `ReasonNote`), the edit page; SF-8; `e2e/admin-screening-reject.spec.ts` (new) + `scripts/e2e-select.ts`; SC-3/14/26 and SC-4/16/19 re-pointed. The three routes' statuses; `scripts/conformance/route-status.test.ts` (new); the gone words (new keys); PP-26, PR-49 and the tests above. Concern 8: attribute-dialogs (+ AT-73b), staff-factor-gate with the light read (`src/features/auth/mfa/session-level.ts` new, through `supabase-door.ts`), settings, step-photos, photo-editor; the census's RAW rule per Q11; the seven `ALLOW` lines.
- Part 4 (STEP 4) — `e2e/helpers/ui.ts` `aal2Session` at the cause per Q13; `.github/workflows/local-backend-proof.yml` capture step + `wired.test.ts`; `scripts/bundle-closure.mjs` by module from `dist/.chunk-modules.json` + BC-17 planted fold; `docs/features/` (route client, failure notice, admin-shell :32, ci-guards register).

### Migration files, in order

1. `admin_review_listing`: `DROP FUNCTION public.admin_review_listing(uuid, text);` then `CREATE FUNCTION public.admin_review_listing(p_listing_id uuid, p_new_status text, p_reason text DEFAULT NULL, p_note text DEFAULT NULL)` written out whole from its last declaration: for `rejected`, the reason required from the list Q2 names (`badValue` with detail `reason` off the list), the note as Q2 rules (`noteRequired`, `noteTooLong` over 500), then `transition_listing_core`, then one `audit_log` row `listing.rejected` with meta `{from, to, reason, note}`; for `active`/`reduced`, a reason or note given is `badValue`. `REVOKE … FROM PUBLIC`; grants `authenticated`, `service_role` as today. Proofs on scratch rows in the file. The DROP makes it a file for the operator's paste (DEC-384). Concern 7 adds no file if Q6 is answered as proposed.

### New keys (English; the ruling supplies both languages)

- `shell.offline.title` "You're offline", `shell.offline.body` "What you open will load when you're back online."
- `admin.screening.reject.title` "Reject this ad", `admin.screening.reject.reason` "Reason", `admin.screening.reject.go` "Reject ad" — or the move dialog's own keys if Q3 says reuse.
- Gone words replacing the three existence-claiming strings (renamed strings are new keys): `post.photo.refusal.listingGone`, `post.refusal.listingGone`, `post.error.draftGone`, "This listing could not be found." / "This draft could not be found."

### The guards' ids (each checked unused by `rg` over scripts/, src/, e2e/, docs/)

CF-DEADLINE-1 (`scripts/conformance/call-deadline.test.ts`), CDL-1 → (the module), CF-RETRY-1 (`scripts/conformance/query-retry.test.ts`), SQC-1 → (the query client), RRF-1 → (the retry hook), OFF-1 (`e2e/offline.spec.ts`), CF-ROUTE-STATUS-1 (`scripts/conformance/route-status.test.ts`), RCG-5 (the typed failure), RCL-20 → (route client), FR-U15 →, RF-15 →, SF-18 →, SRJ-1 → (`e2e/admin-screening-reject.spec.ts`), SFG-1 →, BC-17, FNC-4, AT-73b kept by id.

## Questions for ruling 1

- Q1 (OPEN a) — per-call deadlines through our seams (a real abort for doors, the anonymous call and routes; a raced deadline for auth-js calls), or may `src/integrations/supabase/client.ts` carry one import of the deadline module (rule 10, Vendors: "platform-generated; never hand-edited"), the census guard catching a regeneration?
- Q2 (DEC-469) — Reject's reason list: the remove list (`MOVE_REASONS.remove`)? The note: required always (the brief's "both required") or only for `other` (All listings)? Does a reject write a `seller_notices` row as a move does? Does Hold ask a reason?
- Q3 — Reject's words: reuse All listings' move dialog keys, or new `admin.screening.reject.*` keys from the vetted file?
- Q4 (OPEN d) — the shell says offline once (proposed), or each screen's loading state?
- Q5 (OPEN e) — `useRetryFailed` skips a failed refusal (proposed)?
- Q6 (INC-1297, P1) — the doors already fold missing and stranger into one code at 404: keep `notYourListing` and `notYours` (no door file), change only the three routes' statuses and the three existence-claiming strings (proposed); or rename both to `listingNotFound` in the 24 bodies?
- Q7 — the route-status guard: table codes only (proposed), or the thirteen route-only codes gain rows (a migration for `door_refusal_status`, CF-REFUSAL-2)?
- Q8 — concern 4's two out-of-lane bypasses (`translations-service.ts`, Lovable; `import-dialog.tsx`, 7c) and their two route-client mocks: allowlist lines with `until` Lovable 10b part 2 / bundle 7c (proposed)?
- Q9 — a bulk reject: one reason and note for every selected ad (proposed), or per ad?
- Q10 — the failure-notice census moves to `scripts/conformance/failure-notice.test.ts` so it can join `wired.test.ts` and the register (proposed), or stays and the register names it?
- Q11 — the RAW rule's false positives on `console.warn` templates: narrow the rule to JSX text (proposed), or change the four warn lines?
- Q12 (P2) — `src/features/admin/nav-alerts.ts` (outside SCOPE) moves onto the light read with the gate; without it the client stays on the four pages. In scope?
- Q13 (OPEN c) — the auth log capture step lands with the stop-2 push so its first failed lane is read before Part 4's fix (against "ONE final push"), or with the final push and the fix is the diagnostic only?
- Q14 — the deadline values in OPEN (b).
