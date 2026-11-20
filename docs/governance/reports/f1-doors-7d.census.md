# f1-doors-7d — the census (STEP 1)

Base: dev a21c95595 (`origin/dev` at the census: `a21c95595`, unmoved). Branch `cursor/f1-doors-7d`
at `643c9fb26` (`f1-doors-7d: task saved`). CI for the base, read from `origin/ci-evidence`
`docs/tracking/ci-status.md`: commit `a21c955`, **SUCCESS**, completed 2026-11-20T12:12:33Z, run
44730229750. Every line number below is the tree at `a21c95595`. Read whole before the census, as the
brief asks: F1-7c's census, stop-1, report and rulings 1 and 2.

## consumers

### The server's readers of a refusal or a status (system 2)

| File:line | What it reads today | Through |
| --- | --- | --- |
| `src/server/imports/route.ts:94-101` | `CODE_WORD`, `CODE_DETAIL`, `CODE_STATUS` (a second status table: notSignedIn 401, accountDeactivated 403, permissionDenied 403, rateLimited 429) | `splitRefusal` (imported from `@/lib/refusal-tail`, the re-export) at :112 and :141; the status from `CODE_STATUS` at :119 |
| `src/server/imports/route.ts:130-149` | `relay`: `IMPORT_REFUSALS` exact matches (`message === entry.match`, `startsWith(\`${entry.match}:\`)`) | a whole-message compare |
| `src/server/answer.ts:231-237` | `readFailure`: `readerFailure(error).status ?? 500`; a 4xx refusal with no 5xx status reaches `serverError` (500) — INC-1221 | `readerFailure` |
| `src/routes/api/translate.ts:64-77` | `WRITER_REASONS` keyed by whole messages (`permissionDenied:language`, `badValue:field`, `required:value` …); `message.startsWith("step-up required")` | a whole-message compare |
| `src/routes/api/translate.ts:115` | `readFailure(PATH, "translation_scope_ok_read", scopeError)` | `readFailure` |
| `src/routes/api/feed.ts:52-58, 79-84` | NOT_FOUND / BAD maps keyed by the sentence `feed_page: <code>`, matched with `includes` | a sentence match |
| `src/routes/api/feed.ts:85` | `readFailure(…, readFailed(error, status))` | `readFailure` |
| `src/routes/api/seller.ts:37-39, 59, 62-65` | `seller_feed_page: unknownSeller / badCursor / badSize`, matched with `includes` | a sentence match |
| `src/routes/api/seller.ts:65` | `readFailure(…, readFailed(error, status))` | `readFailure` |
| `src/server/seller-page.ts:28` | `error.message.startsWith("seller_feed_page: unknownSeller")` | a sentence prefix |
| `src/routes/api/attributes.$id.options.ts:44-45` | `message.includes("attributeNotFound")`, `includes("rateLimited")` | a text match |
| `src/routes/api/attributes.$id.options.ts:59` | `readFailure` | `readFailure` |
| `src/server/jobs/route.ts:70` | `message.startsWith("refused:")` (`job_run_claim` raises `refused:replay`, migration `20261029073342_cba46fd4…`, CL-1/CL-2) | a prefix match — **new versus F1-7c's list** |
| `src/server/imports/csv.ts:71-72` | `splitRefusal(error.message.trim()).key === unknownScope` | already the one reader |
| `src/routes/api/categories.tree.ts:119`, `i18n.$lang.ts:70`, `locations.ts:88`, `locations.$country.ts:107`, `admin/locations/export.ts:46`, `admin/attributes/export.ts:45`, `admin/categories/export.ts:42` | `readFailure` | `readFailure` (each inherits INC-1221's fix) |
| `src/server/door.ts` (`doorCall`; callers `listings/alias.ts:58`, `draft.ts:162`, `identity.ts:137,206`, `photos.$id.ts:99,156`, `publish.ts:52`, `upload/photo.ts:449`) | `doorRefusal` from `src/lib/door-error.ts` | L21's file (SIDE BY SIDE); door.ts itself holds no split |

Not refusal readers, by reading: `src/routes/api/upload/photo.ts:362` (`verdict.code === "providerUnavailable"`, the AI gateway's typed verdict, not a door's text); `src/routes/api/listings/draft.ts:104,107` (constraint names of a unique-violation, not refusals).

### Readers of `REFUSAL_STATUS` and `CODE_STATUS`

- `REFUSAL_STATUS`: declared `src/lib/reader-failure.ts:22-28`; read by `refusalStatus` (:31-33), which `readerFailure` reads at :77; `src/lib/reader-failure.test.ts:112-114` (RF-5). No other reader.
- `CODE_STATUS`: declared and read only in `src/server/imports/route.ts:96-101, 119`.

### Session readers, listeners and polls (system 1)

Every `onAuthStateChange`, `setSession`, `refreshSession` and `signOut` caller under `src/`:

| File:line | Call | When |
| --- | --- | --- |
| `src/lib/supabase-door.ts:182-206` | `onAuthChange` → `client.auth.onAuthStateChange` | the door every listener goes through |
| `src/features/auth/use-auth.ts:118` | listener → `applyUser` (a profiles read per event, per hook instance) | every `useAuth()` caller (about eleven), each its own subscription |
| `src/routes/auth.tsx:244` | listener (check-email view) | `markConfirmed` |
| `src/i18n/provider.tsx:261` | listener | no Supabase call inside (hops a macrotask) |
| `src/features/auth/sign-out.ts:23` | `supabase.auth.signOut()` — no scope, so **global** | the account menu, the rail, `hardReset` (`app-shell.tsx:700`), `use-auth.ts:99` (deactivated) |
| `src/features/auth/sign-out.ts:20, 25` | `forgetStoredSession()` | the client did not load, or signOut answered an error |
| `src/features/auth/auth-service.ts:175-184` | `evictExpiredSession`: `signOut({ scope: "local" })`, else `forgetStoredSession()` | before a password grant (:205); after a refused rehydration refresh (:467) |
| `src/features/auth/auth-service.ts:266, 345, 591, 652` | `signOut({ scope: "others" })` | password change, e-mail change, reset, enrolment paths |
| `src/features/auth/auth-service.ts:387` | `verifier.auth.signOut({ scope: "local" })` | the password verifier's own non-persisting client (:378) |
| `src/features/auth/auth-service.ts:459` | `refreshSession({ refresh_token: tokens.refresh_token })` — the tokens read from `window.localStorage` by `storedSession()` (:131-158) | `rehydrate`, only when `currentSession()` answered no session and the stored access token is expired (10 s skew, :161-166) |
| `src/features/auth/auth-service.ts:473` | `setSession(stored tokens)` | `rehydrate`, the same condition, stored token not expired |
| `src/features/auth/auth-service.ts:526` | `setSession` (callback tokens) | `/auth/callback` |
| `src/features/auth/mfa/mfa-service.ts:256` | `refreshSession()` (the current session's own token) | after an unenrolment |
| `src/lib/supabase-door.ts:168-179` | `forgetStoredSession`: removes the key, `-code-verifier` and `-user` from `localStorage` with **no SIGNED_OUT**; a no-op when framed | see above |
| `src/lib/supabase-door.ts:337-340` | `storage` event listener: loads the client when another tab writes the key | never reads or writes a session |

`rehydrate` (`sessionRehydration`, `hasSessionRehydrating`) is reached from `src/routes/auth.tsx:193` (sign-in view mount), `:204` (Already confirmed), `:240` (check-email rechecks: focus, pageshow, the 5 s poll) and `src/routes/auth_.reset.tsx:93,96`.

Polls, with their stop conditions (`rg refetchInterval|setInterval` under `src/`, tests excluded):

| File:line | Poll | Network | Stops when |
| --- | --- | --- | --- |
| `src/features/admin/impersonation/use-impersonation.ts:31` | `refetchInterval: 30_000` on `get_active_impersonation`, plus a re-read on every route change (:39-42); default retry (3) | yes | only when `enabled` falls (`impersonationCheckOn`, `app-shell.tsx:758`: `user !== null && !signingOut`) — **never on a 401** |
| `src/routes/auth.tsx:256` | 5 s `recheck` on the check-email view | yes (session read; a signed-out visitor) | leaving the view |
| `src/features/posting/step-review.tsx:270` | 10 s `readMyListing` | yes | 12 reads, any error (`stop()` in the catch), `notYours`, or the ad live |
| `src/features/session/session-policy.ts:324` | the idle/absolute tick | no | — |
| `src/features/admin/impersonation/use-impersonation.ts:89` | a 1 s clock | no | — |

Repeaters that are not polls: `src/features/admin/nav-alerts.ts:22-31` (`legal_review_overdue`, `staleTime` 5 min, default retry 3 and refetch on focus — INC-1218's "again and again"); `src/features/legal/use-legal-gate.ts:59` (`refetchOnWindowFocus: true`). Query client: `src/router.tsx:6` `new QueryClient()` with no options — three retries with back-off and a refetch on focus for every query; 88 query call sites under `src/`; 18 files set their own `retry`.

So: ONE `refetchInterval` poll. By the brief, no poll census: the query client's retry-rule unit test, plus the impersonation poll's own stop (its unit test), is the guard; a second `refetchInterval` would make the census due.

## definition

`rg` across `src/` (tests excluded) for a hand split of `code:detail`, a door sentence's match and a
whole-message compare (`.message.(includes|startsWith|endsWith)(`, `message ===`, `errorText(…) ===`,
`.split(":")`, `.indexOf(":")`, the code regexes):

- Server (`src/server`, `src/routes/api`): the table above.
- Client, Lovable L21's files (SIDE BY SIDE, allowlisted `until L21`): `src/features/admin-categories/use-image-failure.ts:10`; `src/features/admin-countries/country-verb-dialogs.tsx:54, 166`; `src/features/admin-locations/location-verb-dialogs.tsx:253`; `src/features/admin/impersonation/impersonation-service.ts:143`; `src/features/admin/import-dialog.tsx:203`; `src/features/legal/legal-reader.ts:101`; `src/features/my-listings/my-listing.ts:595`; `src/features/posting/posting-service.ts:1149, 1151`; `src/features/posting/refusal-text.ts:17`; `src/lib/door-codes.ts:59`.
- Client, in no lane: `src/features/admin/legal/legal-version-view.tsx:160` — `errorText(version.error) === "unknownVersion"`, a whole-message compare. **New versus F1-7c's census; not in L21's list; outside this turn's scope** (not a poll or a session reader).
- The mechanism itself: `src/lib/reader-failure.ts:94` — the class fallback regex `^(?:rateLimited|permissionDenied|…)(?::|$)` over a message with no status.
- Matched by the pattern but not refusals: `src/features/admin-attributes/attributes-service.ts:745` (an option token's `kind:arg`), `src/lib/route-client.ts:227` (an event-stream line's `field:value`), `src/features/auth/mfa/mfa-service.ts:100` (the auth provider's sentence, not a door's), `src/server/supabase/user-client.ts:149` (a permission slug `resource:action`), `src/server.ts:83` (the framework's `HTTPError`). The census's pattern is drawn to leave these out or names them with their reason.

Difference from F1-7c's list (`docs/governance/reports/f1-doors-7c.census.md`, grepped): new here —
`src/server/jobs/route.ts:70`, `src/routes/api/upload/photo.ts:362` (read and excluded),
`src/features/admin/legal/legal-version-view.tsx:160`. Every other server consumer is in F1-7c's list.

## tests

Unit tests of each consumer (file — id families, highest id in use):

- `src/server/answer.test.ts` — ANS-1…12, DLA; `src/server/door.test.ts` — DC-1…4; `src/server/imports/route.test.ts` — IMR-1…16; `src/server/imports/csv.test.ts` — CSV-1…8.
- `src/routes/api/translate.test.ts` (INC-829), `src/routes/api/translate.route.test.ts` — TRR-1…10, RFL-2.
- `src/routes/api/feed.test.ts` — FD-1…5, FDR-1…3; `src/routes/api/seller.test.ts` — SLR-1…5; `src/routes/seller-name.test.ts` — SNAME-2 (reads `seller-page.ts`); `src/features/seller/seller-page.test.tsx`.
- `src/routes/api/attributes.options.test.ts` — ATO-1…7; `src/routes/api/public/jobs.test.ts` — JRF-1…6, NCJ-1…21.
- `src/routes/api/categories.tree.test.ts` — TREE-1…4; `i18n.lang.test.ts` — I18B-1…5; `locations.test.ts` — LOC-1…4; `locations.country.test.ts`; `src/routes/api/admin/exports.test.ts`.
- `src/lib/reader-failure.test.ts` — RF-1…5; `src/lib/refusal.test.ts` — RFR-1…10; `src/lib/supabase-door.test.ts` — SBD-1…21.
- `src/features/auth/use-auth.test.tsx` — UA-1…2; `src/features/auth/auth-client.test.ts` — ASC-1…9; `src/routes/auth-forms.test.tsx` — KAU-1…8; `src/features/session/session-policy.test.ts` — SPK-1…3.
- No unit test today: `src/components/app-shell.tsx`, `src/router.tsx`, `src/routes/auth.tsx` (beyond `auth-forms.test.tsx`), `src/features/admin/impersonation/use-impersonation.ts`, `src/server/seller-page.ts` (by its own file).

E2E ids on the session's end (`e2e/auth-signout.spec.ts`): SO-1…4, SO-3b, SO-8…13, SP-1…4, SP-6…8; `e2e/supabase-door.spec.ts`: SBE-1…6; MLP-3 (`e2e/my-listings-page.spec.ts:395`).

Every e2e assertion of a route's status or refusal this turn changes: **none.** The answers of feed,
seller, translate, attribute options and the import routes keep their statuses and codes (the readers
change how they read, not what they answer). `readFailure`'s change moves a reader's refusal from 500
to its code's status; no spec asserts a 500 from a `readFailure` route (`rg '\b500\b' e2e`: the hits
are route stubs `photo-pipeline.spec.ts:506`, `admin-attributes-safety.spec.ts:256`, and F1-7c's
`legal-certify.spec.ts:1339` comment). `e2e/fixtures.ts:196` captures every 4xx of `/api/…` for a
failed test's evidence only; `:66` and `:242` react to 5xx — fewer 5xx, never more.

Next free ids (grepped across `src`, `e2e`, `scripts`, TI-1's rule): SO-14 (and SO-15), SBE-7,
RF-6, ANS-13, IMR-17, TRR-11, FD-6, SLR-6, ATO-8, JRF-7, SBD-22, UA-3, KAU-9, ASC-10, CSV-9, RFR-11.
Unused families for the new tests: `CF-REFUSAL-` (0 uses), `RTR-` (router, 0), `SHELL-` (app shell, 0).
`CF-STATUS-1` is taken (`scripts/conformance/status-map.test.ts:85`), so the status census needs another
name: `CF-REFUSAL-2`.

## lists

- Conformance allowlists: 63 under `scripts/conformance/*-allowlist.txt`; none holds a refusal reader. New: `scripts/conformance/refusal-readers-allowlist.txt`. Read and unchanged: `session-reads-allowlist.txt` (CF-SESSION), `error-text-allowlist.txt`, `on-demand-failure-allowlist.txt` (a new session-end module is not an on-demand loader).
- `scripts/conformance/wired.test.ts`: names each census's caller (`status-map.test.ts` at :320-321 is the pattern); CF-REFUSAL-1 and CF-REFUSAL-2 join it.
- The register (`docs/governance/mechanisms.md`, records turn only): row 27 (`readerFailure`), row 50 (the Supabase client), row 54 (session unknown), row 161 (the one refusal reader), row 20/119 (the doors). The brief's two register lines go to §14.
- The e2e selector (`scripts/e2e-select.ts`): `src/features/auth/**` and `src/routes/auth.tsx` select the "auth" group (`e2e/auth-*.spec.ts`, `door-refusals`, `mfa-stepup`, `smoke-auth-i18n`, `supabase-door`, nightly); `src/components/app-shell.tsx` selects "settings" and "feed"; `src/router.tsx`, `src/lib/**`, `src/server/answer.ts` and `src/server/imports/route.ts` match no area, so the selector prints ALL (`:12`, `:557`). This turn runs every spec; no selector line is needed.
- `scripts/conformance/briefs-allowlist.txt`: emptied of other briefs at STEP 0.

## old-file-readers

- `src/lib/reader-failure.test.ts:94-115` (RF-5) reads `supabase/migrations/*.sql`, takes the last file declaring `door_refusal_status(`, and checks every `WHEN 'code' THEN 'nnn'` row against `refusalStatus`. It checks ONE direction: a code added to the mirror alone passes. The new census (CF-REFUSAL-2) compares both directions; RF-5 stays as the module's own test, or moves into the census (the plan keeps it).
- `CODE_STATUS` by path or text: no test or script reads it (`rg CODE_STATUS src scripts e2e` → `route.ts` only). `src/server/imports/route.test.ts` asserts the statuses through `relay` (IMR), not the table.

## second-readers

`vi.mock` / dynamic `import()` / `loadOnce` of a module this turn may change:

- `@/lib/supabase-door` is mocked by 32 unit tests (`vi.mock("@/lib/supabase-door", …)` with a factory) — among them L21's `legal-reader.test.ts` and out-of-scope service tests. **A new export of `supabase-door.ts` that a module under those tests reads would break their factories**, so the session-end signal does not live in `supabase-door.ts`; a change there keeps its exports (the plan adds a field to an existing answer, not an export).
- `@/features/auth/use-auth` mocked by `staff-form-gates.test.tsx`, `settings-messages.test.tsx`; `@/features/auth/auth-service` mocked by `auth-forms.test.tsx`, `settings-messages.test.tsx`.
- `@/lib/reader-failure`: `import()` / `loadOnce` in `src/features/auth/preferred-language.ts:31`; `import()` in `src/features/seller/seller-review.test.ts`.
- `@/server/answer`: `import()` in `src/server.test.ts`, `src/server/route.test.ts`.
- `src/features/auth/auth-service.ts:30` loads `@supabase/supabase-js` by `loadOnce`; `src/lib/supabase-door.ts:80` loads the client by `loadOnce`.
- No test mocks `@/router`, `@/components/app-shell`, `@/lib/refusal` or `@/server/imports/route`.

## chunk-graph

From the lock-exact build at the base (`/tmp/ethio-scratch/f1-doors-7d/base-build.log`, exit 0):

- `src/router.tsx` (the query client) is in the entry `index-BkBOfJnE.js` (478,562 bytes raw) — every page.
- `src/components/app-shell.tsx` is in `shared-shell-dYoNz-IN.js` (90,473 bytes raw), imported statically by the entry — every page.
- `src/lib/reader-failure.ts` is its own chunk `reader-failure-Dj2lWKht.js` (1,507 bytes raw), imported by the pages that read a failure (`wizard`, `my-listings`, `admin.monetisation`, `legal.publishing`, `admin.ai`, `admin.screening`, `posting-service`, `legal-page-data`, …), not by the entry.
- `src/lib/supabase-door.ts` rides the entry (the door, never the client: `MUST_NOT_CARRY` holds).
- `src/routes/auth.tsx` is the `/auth` page's own chunk.
- The server files (`src/server/**`, `src/routes/api/**`) reach no client chunk.

After: measured at STEP 5 from the final tree. A change to the router, the shell or the door moves
every page; the report lists each page's change chunk by chunk (DEC-355).

## environments

- **The published site** (ethio-prod): `brokeredPreviewStorage()` answers `localStorage` (not a preview zone, or not framed — `previewAuthStorage.ts:41-57`). auth-js reads the stored session on every call (`persistSession`), refreshes within 90 s of expiry and on its 30 s tick, and tells other tabs by BroadcastChannel. `hasStoredSession` reads the key; `forgetStoredSession` removes it with no event.
- **The preview frame** (a `lovableproject.com` / `lovable.app` host framed in `lovable.dev`; it reads ethio-prod too, `docs/governance/briefs/foundations-turn-sage-s0.md:11`): the storage is the editor's broker. Every `getItem` is a `postMessage` round trip (2 s timeout; the first is retried once after 250 ms, `:70, :97-111`) that **prefers the editor's copy over the local one** (`:115-125`); the editor's tombstone `''` removes the local copy and answers null **with no SIGNED_OUT** (`:116-118`); `setItem` writes local, then replaces it with the editor's answer, or removes it on `''` (`:128-135`). `hasStoredSession` answers true for any framed page (`supabase-door.ts:147-149`); `forgetStoredSession` does nothing (`:168-169`).
- **The E2E build** (127.0.0.1:4173 against ethio-staging or CI's temporary backend): plain `localStorage`; non-auth specs inject the session (`e2e/helpers/session.ts`, DEC-029); `e2e/auth-*.spec.ts` drive the real door (`@private-identity`); `app-shell.tsx`'s `isE2E` hook fires a real same-tab SIGNED_OUT (SO-3).

## mechanisms

Read whole: `src/lib/refusal.ts` (`splitRefusal` :86, `readRefusal`); `src/lib/refusal-tail.ts` (re-exports `splitRefusal`, `DOOR_KEY`, `ADMIN_REFUSALS`); `src/lib/reader-failure.ts` (`REFUSAL_STATUS` :22, `refusalStatus` :31, `readerFailure` :67-105, `readFailed` :117); `src/server/answer.ts` (`readFailure` :231); `src/components/app-shell.tsx` (`hardReset` :681-742 — signOut, the purge of `[AUTH_DERIVED_ROOT]` and `["me"]`, `clearSessionClocks`, `setSessionNotice`, navigate to `SIGN_OUT_LANDING`; `onExpire` :766 with `session.signedOutIdle` / `session.expired`; the live guard :827-846, which acts only when `user` turns null; the session notice :978-998); `src/router.tsx` (`new QueryClient()` :6); `src/integrations/supabase/client.ts` (one persisting client: implicit flow, `detectSessionInUrl`, `storage: brokeredPreviewStorage()`, `autoRefreshToken`); `src/integrations/supabase/previewAuthStorage.ts` (read only); `src/features/auth/use-auth.ts` (ticketed `applyUser`); `src/features/auth/auth-service.ts` (`storedSession`, `evictExpiredSession`, `awaitSessionCommit`, `signInWithPassword`, `rehydrate`); `src/features/auth/sign-out.ts`; `src/lib/supabase-door.ts` (`currentSession` :219 — a refused refresh reads as null, not failed; `rpc()` :309 returns no HTTP status); the server clients (`src/server/supabase/user-client.ts`, `auth-attacher.ts`, `auth-middleware.ts`: `persistSession: false`, `autoRefreshToken: false` — they never refresh). auth-js 2.110.9 (lock-exact): `_callRefreshToken` (GoTrueClient.js:4140-4245), `_removeSession` (:4335-4353, which always emits SIGNED_OUT), `signOut()` defaults to `scope: 'global'` (:3347).

The words the session's end needs exist: `session.expired` ("Session expired — please sign in again", `en-base.ts:429`), `session.signedOutIdle`, `auth.signIn`. No new key (FLAGS: no-new-string).

## first-download

From `/tmp/ethio-scratch/f1-doors-7d/base-budget.log` (`node scripts/check-bundle-size.mjs`, exit 0):
entry JS 200.8 / 205 KiB; CSS 22.5 / 40 KiB; admin code in the entry 0 modules. Per page (first
download / ceiling, KiB): `/` 221.7/227; `/$name` 219.7/225; `/account` 264.2/268; `/account_/legal`
203.4/208; `/account_/legal_/$versionId` 204.1/209; `/account_/saved` 220.4/225; `/admin` 205.2/210;
`/admin/` 206.0/211; `/admin/ai` 299.6/303; `/admin/attributes` 313.6/318; `/admin/audit` 290.8/295;
`/admin/categories` 344.3/348; `/admin/countries` 303.0/309; `/admin/images` 205.8/210;
`/admin/impersonation_/$sessionId` 288.7/293; `/admin/legal` 281.1/285; `/admin/legal_/$versionId`
277.8/282; `/admin/legal_/edit` 279.9/284; `/admin/listings` 325.1/329; `/admin/listings_/$listingId`
325.4/330; `/admin/listings_/$listingId_/edit` 406.5/412; `/admin/locations` 266.4/271;
`/admin/monetisation` 310.4/313; `/admin/places` 303.5/310; `/admin/roles` 291.5/295;
`/admin/roles_/$roleId` 271.5/275; `/admin/screening` 341.7/348; `/admin/translations` 302.8/307;
`/admin/translations_/$lang` 305.4/309; `/admin/users` 288.9/293; `/admin/users_/$userId` 288.7/293;
`/auth` 217.3/223; `/auth_/callback` 204.3/209; `/auth_/reset` 210.4/214; `/c/$slug` 221.7/227;
`/dev/primitives` 224.5/228; `/dev/style` 244.1/248; `/dev/tall` 201.1/206; `/l/$slug` 247.2/250;
`/legal/$kind` 205.5/210; `/legal/accept` 211.8/217; `/legal/publishing` 207.6/211; `/my-listings`
308.0/315; `/my-listings_/$listingId` 317.9/323; `/my-listings_/$listingId_/edit` 398.7/404; `/post`
398.7/404; `/post_/$listingId` 398.7/404; `/privacy` 205.5/210; `/settings` 275.4/279; `/terms`
205.5/210. Least room: `/admin/monetisation` 2.6 KiB, `/l/$slug` 2.8 KiB. No page is inside the
0.3 KiB band.

## premises

1. **THE CAUSE OF THE 07:01:22 REFRESH — not provable from the code; the one path the code holds that fits is the platform's storage adapter.**
   - auth-js sends, from its own machinery, only the refresh token of the session it reads from storage at that moment (`__loadSession` within the 90 s margin, the 30 s tick, `_recoverAndRefresh`); the app sends a passed-in token only at `auth-service.ts:459` (`refreshSession`) and `:473` (`setSession`), both reading `window.localStorage` (`storedSession`, :131-158) and both reached only when the client answered no session (`rehydrate`, :442-448).
   - From 07:01:21.299Z to 07:01:22.044Z every call carried `cfe7a770…`, so the storage the client reads held the new session (and `awaitSessionCommit`, :192-200, had read it before the sign-in reported success). On a page whose storage is plain `localStorage` (the published site, the E2E build), nothing in this tree writes an older session back into that key after a sign-in, and a refused refresh keeps a stored session whose access token is still valid (GoTrueClient.js:4224-4232; its read-path mirror :2528-2533). So on such a page, in one tab, no code path sends a token other than `cfe7a770…`'s 1.3 s after the grant. A second same-origin tab reads the same key.
   - In the preview frame the storage is the editor's broker, and it can answer an OLDER session after a sign-in: `getItem` prefers the editor's copy (`previewAuthStorage.ts:115-125`), each read an asynchronous round trip whose answer can differ from the local copy the sign-in just wrote; `setItem` replaces the local copy with the editor's answer (`:130-134`). An older session read that way (its access token expired, its refresh token revoked by the 07:00:56 global sign-out) is refreshed by auth-js at once (one `refresh_token`, 400 `refresh_token_not_found`). The same broker explains the rest of THE FACTS: reads in flight got different answers (the anon 401s at 22.174, then thirteen profile reads still carrying `cfe7a770…` at 22.197–22.277), and its tombstone path removes the local session **with no SIGNED_OUT** (`:116-118`), so `useAuth` kept its user and the polls that run only while a user is on screen (`get_active_impersonation`, `legal_review_overdue`) answered 401 "again and again" (an auth-js removal always emits SIGNED_OUT, `:4335-4353`, which the live guard would have acted on).
   - What would find it: the Origin / Referer, User-Agent and IP of the 07:01:22.102Z refresh and of the 07:01:22.174Z 401s in ethio-prod's edge log (a preview host framed in `lovable.dev` means the broker; `ethio.com` means another browsing context, which the IP and User-Agent then name); the same three fields for the 07:00:56Z logout (which surface sent the global sign-out); and a reproduction on the preview with the network panel and the Local Storage key in view: sign out, sign in, watch for a `refresh_token` within two seconds.
   - By the brief: "If the cause is in the platform's adapter, STOP and say so. If the census cannot find it from the code, STOP and say what would find it." Both are said here; the fix for (a) waits for the ruling (TOLERANCES: a fix for a cause the census did not find is a STOP). The adapter is read only and platform-generated; the app cannot change it.
2. **What the code proves regardless of the cause** — a session that ends without a SIGNED_OUT is not an ended session to the app: `useAuth` keeps the user (`use-auth.ts:118-131` changes it only on an event or at mount), the live guard (`app-shell.tsx:827-846`) waits for `user === null`, every reader then answers 401 and the screens show "could not be loaded", and the query client retries each 401 three times (`router.tsx:6`) while the one poll keeps its 30 s beat (`use-impersonation.ts:31`). Silent removals in this tree: the broker's tombstone (`previewAuthStorage.ts:116-118, 132`), `forgetStoredSession` (`supabase-door.ts:168-179`, from `sign-out.ts:20,25` and `auth-service.ts:179,181`), auth-js's post-save undo (GoTrueClient.js:4185-4190, a successful refresh only). (b) and (c) close this whatever the cause.
3. **The 07:00:56 global sign-out** is `sign-out.ts:23` (`signOut()` with no scope; auth-js's default `'global'`, GoTrueClient.js:3350), kept deliberately by U0j (`app-shell.tsx:664-666`). Every sign-out on any surface (the preview, the published site, a phone) revokes every other surface's refresh token, and each of those surfaces then fails its next refresh: the precondition of INC-1218 on any surface that still holds the old session. Changing it is a behaviour change beyond (a)–(d); named for the ruling, not built.
4. `rpc()` (`supabase-door.ts:309-327`) drops the HTTP status: a browser reader's 401 reaches `readerFailure` with `code` `42501` / `PGRST301` and no status. The end-of-session rule (b) reads "401 or `notSignedIn`" from a reader's error, so `rpc()` must carry the status it got (a field of the existing answer, no new export).
5. `feed_page` and `seller_feed_page` (last declarations `20261108070502_6ea5ac5b…`, `20261108070503_ff2ee3b9…`) raise plain sentences `'<function>: <code>'` (P0001), not `code[:detail]`. Read through `splitRefusal`, the code is the TAIL (`{ key: "feed_page", tail: " unknownCategory" }`). FLAGS forbid the migration that would move them onto `door_refuse`. The plan reads them as `splitRefusal(message)` with the function's name as the key and the trimmed tail as the code; the alternative is an allowlist line until a migration turn.
6. INC-1223's premise holds and is narrower than "only its own test": RF-5 already reads the migration, but in one direction only (an extra mirror code passes).
7. INC-1221's premise holds: `readFailure` (`answer.ts:231-237`) answers 500 for any failure without a 5xx status that `upstreamFailed` does not claim; a reader's `P0D01` refusal at 401/403/429 reaches `serverError`.
8. THE FACTS' reading of the thirteen profile reads ("built before the session was dropped") is one reading; on the preview the broker answers each read on its own, which explains the order (anon 401s at 22.174, then `cfe7a770…` at 22.197–22.277) without a request built earlier. Either way, not a second client.
9. THE CUT holds (below); SCOPE holds for every planned file except one finding outside it (`legal-version-view.tsx:160`, findings).

## callee-codes

CENSUS-ITEM callee-codes: not applicable — no door, reader or migration changes in this turn (FLAGS: no-migration); the server readers keep every answer's code and status.

## findings

- `src/features/admin/legal/legal-version-view.tsx:160` — `errorText(version.error) === "unknownVersion"`, a whole-message compare outside L21's files and this turn's scope; CF-REFUSAL-1 needs a line for it (proposed `| a whole-message compare outside L21's files and F1-7d's scope | until ACT-027`) or a scope ruling.
- `src/lib/reader-failure.test.ts:94-115` (RF-5) compares one direction (premise 6).
- `src/features/auth/use-auth.ts:118` — every `useAuth()` caller opens its own subscription and its own profiles read per auth event (about eleven callers): the thirteen profile reads at 22.197–22.277 for one event. Fewer calls is the performance lens; not in this turn's numbered changes.
- `src/features/auth/auth-service.ts:161-166` — `storedSessionIsExpired` uses 10 s of skew, auth-js refreshes within 90 s: a stored session 10–90 s from expiry is not evicted before a grant (DEC-076's step 1), and auth-js may refresh it while the grant runs. Not the 07:01:22 refresh (that ran 1.3 s after the grant), named for the ruling.
- `src/features/auth/sign-out.ts:23` — the global scope (premise 3).
- `src/routes/api/listings/draft.ts:162` — `supabase!` (a non-null assertion; CF-NN-1's count governs it; not in this turn's change).
- No security hole found.

## queued

`rg -n "F1-7d" docs/governance/briefs docs/governance/reports roadmap.md scripts` (this brief excluded):

| Item (source) | Mark |
| --- | --- |
| The one refusal reader and CF-REFUSAL-1 (INC-1189; `f1-doors-7c-ruling-1.md:20`, `f1-doors-7c.report.md:17,216`) | built here (server half and the census); the client parsers Lovable's L21 |
| `src/lib/door-codes.ts`'s second parser (`f1-doors-7c-ruling-1.md:20`, report :120, :202) | Lovable's L21 |
| `src/server/imports/route.ts` `CODE_STATUS` (report :118, :202) | built here |
| `REFUSAL_STATUS` guarded only by RF-5 (report :119, :205) | built here (CF-REFUSAL-2) |
| `readFailure` 4xx as 500 (report :121) | built here (INC-1221) |
| `door-error.ts` `doorRefusal` (report :203) | Lovable's L21 |
| The reset-time words (`f1-doors-7c.stop-1.md:47`, report :5, :17) | left — not in this brief (FLAGS: no-new-string); Lovable's L21 draws `rateLimited` screens |
| INC-1218, the session's end, its polls, SO-14, `client.test.ts` (report :17, :220) | built here (SO-14; `client.test.ts` only if the cause is in `client.ts`, which it is not) |
| The typed `Result` for every browser `rpc()` (ACT-027; ruling 1 :21, :34) | left — ACT-027, its own turn after F1-7d |
| `supabase-door.ts` `rpc()` drops the status (report :202) | built here (premise 4), only as far as (b) needs |
| The doors' and the clients' register rows (report :221) | built here (§14, records turn) |

## THE CUT and the plan, for the ruling

**The session's end** — about nine source files, inside fifteen:
`src/router.tsx` (the query client: no retry of a 401 or `notSignedIn`; a query or mutation error that
ends the session tells the one signal), `src/features/auth/session-end.ts` (new: `endsSession(error)`
and the one signal, once per session), `src/components/app-shell.tsx` (listens: `hardReset` with
`session.expired`, the queries cleared, the polls unmounted; the sign-in offer is the existing notice
and `/auth`), `src/features/auth/sign-out.ts` (a session already ended signs out locally: its global
logout would answer 401), `src/lib/supabase-door.ts` (`rpc()` keeps the status), `src/lib/reader-failure.ts`
(a 401 reads as `auth`), `src/features/admin/impersonation/use-impersonation.ts` (the poll stops on an
error), `src/routes/auth.tsx` (only if the ruling's (a) lands there), plus the cause's fix where the
ruling puts it. Tests: `src/router.test.ts` (new, RTR-), `src/components/app-shell.test.tsx` (new,
SHELL-), `src/features/auth/session-end.test.ts` (new), `supabase-door.test.ts` (SBD-22+),
`reader-failure.test.ts` (RF-6+), `src/routes/auth.test.tsx` (new) only if `auth.tsx` changes.

**The server readers and the censuses** — about twelve:
`src/server/answer.ts`, `src/server/imports/route.ts`, `src/routes/api/translate.ts`,
`src/routes/api/feed.ts`, `src/routes/api/seller.ts`, `src/server/seller-page.ts`,
`src/routes/api/attributes.$id.options.ts`, `src/server/jobs/route.ts`, `src/lib/reader-failure.ts`
(shared with the session's end), `scripts/conformance/refusal-readers.ts` + `.test.ts` (CF-REFUSAL-1,
CF-REFUSAL-2) + `refusal-readers-allowlist.txt`, `scripts/conformance/wired.test.ts`.

**DECIDE-AND-NAME, proposed:**
- The status mirror stays in `src/lib/reader-failure.ts` (`REFUSAL_STATUS`, `refusalStatus`): its importers are `readerFailure` and two server modules (`answer.ts`, `imports/route.ts`), no feature — no new module.
- Allowlist lines (`key | reason | until`): one per L21 file listed under definition, `| a client parser Lovable's L21 folds | until L21`; `src/features/admin/legal/legal-version-view.tsx | a whole-message compare outside both lanes | until ACT-027` (or a ruling); `src/lib/reader-failure.ts | the class fallback for a message with no status | until ACT-027`. Feed and seller read by `splitRefusal` (premise 5), no line.
- The browser test (SO-14, `e2e/auth-signout.spec.ts`, `@private-identity`, a scratch account through the real door): sign in through the form; from node, the account's own password grant and `/logout?scope=global` (the helper `e2e/helpers/users.ts:388-394` already does this for the pool) revoke every refresh token; the page's stored session gets `expires_at` in the past (its access token unchanged), so the next read refreshes with a revoked token; then a navigation. Asserted: the session-end notice (`session.expired`), the sign-in offer, no `common.loadFailed`, no request after the end to `get_active_impersonation`, and a second sign-in that sticks. SO-15: the silent drop — the stored key removed in the page (no event), then a reader's 401 ends the session the same way. No token is printed; the tokens stay in node and the page.
- The commits follow the brief's STEP 2 / 3 / 4.
