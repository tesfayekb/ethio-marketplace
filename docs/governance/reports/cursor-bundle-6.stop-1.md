QUESTION — cursor-bundle-6 STEP 1: the census and the plan (PLAN FIRST)
DONE: STEP 0, STEP 1
LEFT: STEP 2 (Part 1), STEP 3 (Part 2), STEP 4 (Part 3), STEP 5 (Part 4), STEPS 6–8
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `1bbfc7dadd4d999a2cc292442a669bfa26680435` (short `1bbfc7d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-24T13:28:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45402760878
FILES: docs/governance/briefs/cursor-bundle-6.md
docs/governance/reports/cursor-bundle-6.stop-1.md
roadmap.md

Base 1bbfc7dad = `origin/dev` 1bbfc7dadd4d999a2cc292442a669bfa26680435 (fetched again before this report: unchanged), CI SUCCESS
on it (above). The brief was saved by scripted copy; its sha256 equals the carrier's
(95a28fe3c380fe130edbe3a3268b17f3dec0c96cc130fe6fa34e06c8d381a258), 108 lines. `scripts/conformance/briefs-allowlist.txt` holds
no entry line, so STEP 0 removed none. Every vendor citation below is from the source in
`/tmp/ethio-scratch/cursor-bundle-6/vendor/auth` (the auth server, v2.197.0 tarball),
`/tmp/ethio-scratch/cursor-bundle-5/vendor/` (the CLI CI pins, 2.120.0 per
`.github/workflows/local-backend-proof.yml:13`) and `node_modules/@supabase/auth-js` 2.110.9 (the lockfile's).
Scratch files of this census live in `/tmp/ethio-scratch/cursor-bundle-6/` (the operator's to remove).

`bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-6.md --root .`:

```
[check-go] no finding
```

# STEP 1 — THE CENSUS

## consumers

Concern 1 (INC-1275). The reader is `src/lib/refusal.ts`. `hear` (:172) reads an error object's `message` as
`code` and its `code` as `provider` (:199–204). `readRefusal` (:216) tries, in order:
- the family's words on the message (:242);
- the door key (:247);
- the door code (:250);
- the sentences (:253);
- only then the provider code (:256–259).

Families with both `words` and `sentences` (`rg -n "sentences:" src`):
- `auth-error-key.ts:69`
- `mfa/mfa-service.ts:138`
- `admin/users/admin-users-service.ts:257`
- `admin/roles/roles-service.ts:167`
- `admin/translations/translations-service.ts:462`
- `admin-ai/ai-refusals.ts:31`
- `admin-countries/country-refusals.ts:32`
- `admin-locations/location-refusals.ts:54`
- `admin-monetisation/monetisation-refusals.ts:112`

Concern 2 (INC-1274). The cure is `reportUnauthorised` (`src/features/auth/session-end.ts:56`), heard by
`onUnauthorised` (:48) in `src/components/app-shell.tsx`; the verdict is `session.expired` (:803), and the
live guard is at :885. The actions are in `src/features/auth/auth-service.ts` and `src/features/auth/mfa/`
(list under definition).

Concern 3 (INC-1276). The files are `supabase/templates/*.html` (six notices) and
`supabase/templates/subjects.json` (six keys).
- `scripts/ci/local-backend-config.toml:56–90` holds six `[auth.email.notification.*]` tables.
- `scripts/ci/prepare-local-backend.sh:152–156` copies `supabase/templates/*.html` into the working copy.
- `scripts/ci/backend-config.py:16–22` drops the notices in its `images` variant.
- `scripts/ci/backend-config.test.ts` (BCFG-1, BCFG-2) holds the exact-list checks.
- `e2e/settings.spec.ts` (ACS-E4) is the only reader of `subjects.json`, through `mailFor` in `e2e/helpers/mail-sink.ts`.
- In `.github/`, `local-backend-proof.yml:42` hashes `local-backend-config.toml` and `backend-config.py`
  into the images' cache key; no workflow reads the templates.

Concern 4 (INC-1268). Three components subscribe to the auth events:
- `src/features/auth/use-auth.ts:127`, the one store, under CF-SESSION-5;
- `src/i18n/provider.tsx:261` (`useAuthIdentity`, :251);
- `src/routes/auth.tsx:244` (the sign-in page; not named by the brief, see findings).

Concern 5 (DEC-434/438/451).
- The gate: `src/features/auth/mfa/staff-factor.ts`, `staff-factor-gate.tsx`, AG-U1..U4, unmounted.
- `AdminGate`: `src/routes/admin.tsx:50–118`.
- `door_context`: `20261120100000_909988ad-….sql:64–135`.
- The staff doors: every manifest line of class `staff` or `staff-reader` (`scripts/doors/manifest.txt`).
- The staff routes through `callerHasPermission` (`src/server/supabase/user-client.ts:144`):
  - `src/routes/api/admin/attributes/export.ts`
  - `src/routes/api/admin/categories/export.ts`
  - `src/routes/api/admin/categories/suggest-icon.ts`
  - `src/routes/api/admin/locations/export.ts`
  - `src/routes/api/translate.ts`
  - `src/server/imports/gate.ts` and `route.ts`, the imports
  - the category image routes
- The sign-in helpers (gate-reach).

Concern 6.
- (a) 80 `if (error) throw error` sites in `src/`, outside `src/integrations` (`raw-throws.txt`):
  - `src/features/admin` 60
  - `features/legal` 6
  - `features/admin-screening` 6
  - `features/admin-listings` 5
  - `src/server/supabase` 1
  - `src/lib/read-all-pages.ts:27`
  - `features/permissions` 1

  The three held readers are among them.
- (b) The impersonation pager: `impersonation-view.tsx:233`. The rest are under findings.
- (c) `scripts/e2e-failure-report.ts`.
- (d) `e2e/admin-users.spec.ts:183`.
- (e) `scripts/ci/install-browser-deps.sh`.

## definition

Concern 1 — every caller that passes an error to `readRefusal`: 48 call sites outside the reader
(`rg -n "readRefusal\(" src`, tests and `refusal.ts` excluded):

- `src/components/forms/field.tsx:102`
- `src/features/ad-page/ad-page-refusals.ts:55,72,88,106`
- `src/features/admin-ai/ai-refusals.ts:51`
- `src/features/admin-attributes/attribute-dialogs.tsx:646`
- `src/features/admin-attributes/attribute-refusals.ts:67`
- `src/features/admin-categories/category-refusals.ts:41`
- `src/features/admin-categories/use-image-failure.ts:26`
- `src/features/admin-countries/country-refusals.ts:45`
- `src/features/admin-listings/edit-listing.ts:260`
- `src/features/admin-listings/listing-policy.ts:49`
- `src/features/admin-listings/move-reasons.ts:60,69`
- `src/features/admin-listings/photo-remove.ts:31`
- `src/features/admin-listings/tier-reasons.ts:108`
- `src/features/admin-listings/undo-edit.ts:45`
- `src/features/admin-locations/location-refusals.ts:77`
- `src/features/admin-monetisation/use-monetisation-error.ts:25`
- `src/features/admin-screening/use-photo-changes.ts:117`
- `src/features/admin-screening/use-photo-reviews.ts:107`
- `src/features/admin-screening/use-screening.ts:291,410,437`
- `src/features/admin/impersonation/impersonation-starter.tsx:80`
- `src/features/admin/import-dialog.tsx:251`
- `src/features/admin/legal/legal-service.ts:146,151`
- `src/features/admin/roles/roles-service.ts:175`
- `src/features/admin/translations/translations-service.ts:492,504`
- `src/features/admin/users/admin-users-service.ts:224,269`
- `src/features/auth/auth-error-key.ts:102`
- `src/features/auth/mfa/mfa-service.ts:158,175,212`
- `src/features/legal/legal-accept-refusals.ts:21`
- `src/features/my-listings/my-listing.ts:293,298`
- `src/features/my-listings/promote-service.ts:223,235`
- `src/features/posting/refusal-text.ts:176,181,190,203,240`

The order change alters an answer only where the error carries BOTH a message that one of the family's
sentences matches AND a `code` the family's words name.
- The provider's own error objects (a `code` beside an English `message`) reach the reader only from the
  auth families: `auth-error-key.ts:102` and `mfa-service.ts:158,175,212`.
- Door errors carry the door's code as their `message` and SQLSTATE as their `code`. The only families
  whose words name a SQLSTATE are `ai-refusals.ts:25` and `monetisation-refusals.ts:75`, both P0009.
  Neither has a sentence matching P0009's message ("Step-up authentication required…", the
  `require_step_up_if_needed` text), so their answer is the same either way.
- `mfa-service.ts:168–179` already reads the provider code first through its own fork (K2 below).

Concern 2 — every auth action that reads the session (`auth-service.ts`):
- `signOutOtherDevices` :265
- `getIdentities` :277
- `changePassword` :314 (with `currentPasswordProof` :348–369, which answers `auth.errorGeneric` when the session has no user)
- `changeEmail` :376
- `pendingEmail` :393
- `hasPassword` :494
- `removeOwnPassword` :507
- the reset page's `updatePassword` :575, with a recovery session
- the two-factor calls in `src/features/auth/mfa/mfa-service.ts`: enrol, challenge, verify, unenroll, list factors and the step-up's `submitCode` (`use-step-up.ts`)

Each reaches the server with the stored session. A missing stored session, or the server's
`session_not_found`, arrives as `AuthSessionMissingError` ("Auth session missing!", name
`AuthSessionMissingError`, no `code`: auth-js `lib/errors.js:100–102`; `lib/fetch.js:68–72` turns the
server's `session_not_found` into it). Today `failure()` reads that as the generic word.

Concern 5 — every sign-in a staff screen or staff door reaches: gate-reach below.

## gate-reach

The census is an AST read of all 1290 tests in `e2e/*.spec.ts` (`gate-reach.ts`). For each test, its body,
the `beforeEach` hooks of its describes and the spec's own functions it calls were followed through; it
recorded the sign-ins (`switchUser`, `signIn`, `signInViaSession`, `asPerson`, `asBearer`, `passwordGrant`,
`signInJobSuperAdmin`, `enrollAndStepUp`), the roles granted, the `/admin` paths opened and the staff doors
named (a manifest line of class `staff` or `staff-reader`).

- 432 tests reach a staff screen or a staff door.
  - 288 of them sign in ONLY through the pooled super admin (`signInJobSuperAdmin`, `e2e/helpers/ui.ts:1061`), which is already a verified-factor session at aal2 (`elevateInBrowser` :799, `freshAal2Session` :933; the pool's factor is minted in `e2e/global-setup.ts:348–401`). They need nothing.
  - By file: admin-categories-lifecycle 23, admin-listings 21, admin-screening 20, admin-translations-console 19, admin-attributes-import 19, admin-attributes-library 18, admin-locations 17, admin-attributes-links 17, admin-attributes-editor 17, admin-monetisation 15, admin-roles 13, legal-admin 11, admin-categories-console 9, admin-translations-governance 8, admin-countries 8, admin-attributes-safety 8, admin-guides 6, import-security 5, admin-translations-data 5, admin-categories-home 5, name-check-queue 4, admin-audit 4, admin-services 3, phone-frame 2, my-listings-promote 2, admin-categories-images 2, and one each in posting-routes, page-head, overlays, my-listings-levels, i18n-sign-in-language, breadcrumbs, admin-ai-calls (33 files).
- 144 tests in 38 spec files sign in another way. The table at the end of this report lists each one (file:line, id, role, sign-ins, /admin paths, staff doors, and what it needs).

The needs:

| need | tests | meaning |
| --- | --- | --- |
| G | 79 | a browser staff sign-in at aal1 then an `/admin` path: moves onto the staff helper's browser form |
| S | 34 | a node or page caller at aal1 calls a staff door: moves onto the helper's aal2 caller (unless the caller is a member asserting `permissionDenied`, which holds: Part 3 checks the factor AFTER the permission) |
| G+S | 1 | both (AU-14: an admin at aal1 on `/admin/users` and `admin_set_account_status`) |
| S+R | 1 | CI-4b: staff doors and a staff route at aal1 |
| R | 4 | CI-2, CI-2b, CI-3, TR-scope: a staff server route at aal1; changes only if the routes join Part 3 (question 2) |
| P | 3 | MF-4, CT-7, IMP-5 assert the server's refusal of an aal1 staff call: they keep their subject if the new refusal is P0009 (question 1), else they assert the new code |
| none | 22 | member pages, owner doors, `has_permission` asked directly (DRF-1/2/5/6), or the pool at aal2 beside a member's grant |

34 spec files move onto the helper (the 31 of bundle 5's census, whose count was screens only, plus
`legal-doors`, `my-listings-doors` and `ad-page-doors` for doors).

The step-up modal's own subjects on admin screens (`e2e/mfa-stepup.spec.ts` MF-2, MF-3, MF-6, MF-7, MF-7b,
MF-7c, MF-8; G in the table) open `/admin` at aal1 today. Once the gate is mounted, they first meet the gate.
The plan signs them in through the helper (aal2, factor used) and then makes the step-up's window stale with
`staleStepUpOnClient` (`ui.ts:1143`, the path MF-7 already uses), so the dialog is still their subject.

The helpers that sign staff in:
- `e2e/helpers/ui.ts`: `signIn` :529, `signInViaSession` :649, `switchUser` :671, `enrollAndStepUp` :711, `mintPrivateSuperAdmin` :887, `signInJobSuperAdmin` :1061, `expectAal2` :1246
- `e2e/helpers/session.ts`: `passwordGrant` :159, `injectSession` :276
- `e2e/helpers/door-callers.ts`: `asBearer` :72, `asPerson` :81, `pageDoor` :95
- `e2e/helpers/users.ts`: `createUser` :58, `leaseUser` :402, `grantRole` :419, `grantScratchRole` :462

`rg -o "grantRole\(" e2e | wc -l` = 87: 86 in specs plus the definition.

Spec-local copies:
- `e2e/legal-doors.spec.ts:48` `pooledSuperAdminCredentials`: a password grant of the pool, so aal1; its stale-session checks are at :296, :719 and :1284.
- `e2e/legal-admin.spec.ts:206` `rpcAs`: a local `asPerson`. Its `rpcAs(staff, "legal_review_overdue")` at :845 and :857 is a pool password grant at aal1 against a staff-reader door, so Part 3 refuses it (S).

Which roles are staff by the gate's definition (holding `admin_panel:access`,
`src/features/permissions/service.ts:21`)?
- The seed grants it to `admin` (`20260809010130_05add65c-….sql:439`) and `moderator` (:449).
- `super_admin` passes every `has_permission`.
- Any role made in the Roles console that holds it is staff too.

For the doors, the definition is the class: every role that holds a staff or staff-reader door's permission.

## tests

Concern 1:
- `src/lib/refusal.test.ts`: RFR-1..10; the order cases are at :131–141.
- `src/features/auth/auth-error-key.test.ts`: the table at :101.
- `src/features/auth/auth-client.test.ts`: ACS-U2 at :383–396, every refusal mocked as `message: "refused"`.
- MFA's in `mfa-service.test.ts`.
- The browser specs that read the auth words: `e2e/settings.spec.ts` (ACS-E1..E4), `e2e/auth*.spec.ts`, `e2e/mfa-stepup.spec.ts`.

Under provider-first reading only `same_password` changes its word (premises (a)). No spec asserts
`auth.errorWeakPassword` for a same-password change (`rg -n "errorWeakPassword|errorSamePassword" e2e src --glob "*.test.*"`).

Concern 2, the tests that assert today's generic answer for a missing session: `auth-client.test.ts:194`,
:247 and :446. `src/test/settings-messages.test.tsx:226` (`pendingEmail`) and `src/routes/auth-forms.test.tsx:109`
(`signInWithPassword`) mock the service's generic answer to test the screens' drawing of it. Concern 2 does not
change them.

`session.expired` is asserted in `e2e/auth-signout.spec.ts:784` and :820. The session-end unit tests are
SEN-1..7 (`session-end.test.ts`); `use-auth.test.tsx` holds UA-1, UA-2, ACS-U5 and ACS-U6.

Concern 3: BCFG-1 and BCFG-2 (`scripts/ci/backend-config.test.ts`) and ACS-E4.

Concern 4: `src/i18n/provider.test.tsx` (ILA-1..4), `provider-layers.test.tsx` and `provider-d239.test.tsx`
each mock the door. `scripts/conformance/session-reads.test.ts` holds `SESSION_STORE_CALLERS` at :161 and
CF-SESSION-5 at :287.

Concern 5:
- AG-U1..U4 (the gate);
- `e2e/mfa-stepup.spec.ts` MF-1..11;
- `e2e/door-refusals.spec.ts` DRF-1..6;
- `scripts/doors/check-doors.test.ts`;
- every spec in gate-reach.

Concern 6:
- `scripts/conformance/refusal-readers.test.ts` (CFRR-1..8);
- `scripts/e2e-failure-report.test.ts` (EFR-1..5, CAP-1);
- `scripts/ci/install-browser-deps.test.ts`, which has no ids today;
- AU-3.

## lists

- **Door manifest** (`scripts/doors/manifest.txt`): `door_context` is not a door line. Part 3 changes its body only, so no line changes.
  - `scripts/doors/judge.ts` `opt-out-over-step-up` (:29–33) reads `requires_step_up` per permission through `scripts/doors/step-ups.ts`, and its meaning stays: freshness.
  - The new staff-class check is a session-assurance check. The manifest's `step-up` cell does not describe it, so no cell changes.
- **Public-surface allowlist**: Part 3 restates `door_context`'s REVOKE and its grant as they stand. No new surface, no line.
- **Briefs allowlist**: empty (STEP 0).
- **CF-SESSION-STORE**: `SESSION_STORE_CALLERS` (`session-reads.test.ts:161`). The provider's subscription is not a `useAuth(` call, so CF-SESSION-5 (:287) does not see it. The plan adds CF-SESSION-7, "no `onAuthChange(` outside the one store and its listed callers". Its list starts with `use-auth.ts` and `src/routes/auth.tsx:244` (question 5).
- **E2E selector groups** (`scripts/e2e-select.ts`):
  - The new helper file `e2e/helpers/staff-factor.ts` selects every spec that imports it, by the import graph.
  - Part 3's migration carries `-- e2e-areas:` naming the staff areas. Without the header it selects ALL. The plan writes no header (every staff spec is touched), so it selects ALL.
- **`scripts/conformance/wired.test.ts`**: new kit censuses join it: CF-TPL-1, CF-NUM-1, CF-SESSION-7. CF-REFUSAL-5 lives inside the refusal-readers census, which is already wired.
- **Go-template**: the items are `<!-- CENSUS-ITEM: key -->` lines in `docs/governance/go-template.md:62–92`, and CF-BRIEF-15 (`scripts/conformance/briefs.test.ts:105`) is their reader. `gate-reach` joins as an item, and this brief already answers it. The law joins `scripts/brief/go-laws.ts` as CF-BRIEF-22 (`go-laws.ts` ids run CF-BRIEF-1..21).
- **CF-HELPERS-1's name list** (`scripts/conformance/e2e-helpers.test.ts:70–92`): the staff helper's exported names join it.
- **`scripts/check-identity-tags.sh` TOKENS** (:20–33): it names `enrollAndStepUp`, `mfa.enroll(` and `admin.mfa.deleteFactor`. The helper enrols through `authFetch('/factors')` on a leased account, not the pool, so no token or tag changes. The DEFERRED line :38 (AU-3/4/5/9/10 "inline staff mints") shrinks as those tests move onto the helper.
- **CF-BCFG-1's exact list** (`backend-config.test.ts`): the images variant's dropped tables gain the three template tables.
- **Exact-list assertions over a door's answer keys**: none change, since no door's answer shape changes.
- **The refusal codes** (`DOOR_CODES`, `src/lib/door-codes.ts`; `door_refusal_status`; CF-REFUSAL-4) gain a code only if question 1 picks a new one.
- **`scripts/conformance/refusal-readers-allowlist.txt`** gains the raw re-throw lines (concern 6 a).

## old-file-readers

The bundle renames nothing. The things it moves or adds that a reader names:
- The gate's usage-map entries move back from "component: staff-factor-gate" to `/admin` when it mounts (bundle 5's report :330). The readers are `docs/generated/i18n-usage.json` and `public/i18n-usage.json`, both rewritten by `bun run i18n:usage`.
- `staff-factor-gate.tsx`'s header line "nothing mounts it until bundle 6" is read by nothing but people, and is rewritten.
- `docs/features/step-up-auth.md:230` ("built, not mounted") and `docs/features/account.md:27` are rewritten.
- `e2e/helpers/staff-factor.ts` is new, so it has no old reader. `check-identity-tags.sh` DEFERRED (:38) names AU-3/4/5/9/10 by text.

## second-readers

- `vi.mock` of `auth-service`: `src/test/settings-messages.test.tsx:58` and `src/routes/auth-forms.test.tsx:37`.
- Dynamic imports:
  - `src/features/auth/session-end.test.ts:13`
  - `src/features/auth/use-auth.test.tsx:21`
  - `src/features/auth/auth-client.test.ts:40`
  - `src/features/auth/mfa/staff-factor-gate.test.tsx:25`
- Nothing mocks `@/lib/refusal`, `session-end`, `use-auth` or `@/i18n/provider` (`rg -n "vi.mock\(.*(refusal|session-end|use-auth|i18n/provider)" src scripts`).

## chunk-graph

- **The refusal reader** (`src/lib/refusal.ts`) is its own on-demand chunk (`refusal.js`). Swapping two branches changes a few bytes there and nothing in the entry.
- **The gate's mount** adds to the admin layout's chunk (`admin.tsx`, on every `/admin` page) the `resilientLazy` wrapper, `AdminChecking`, the `Suspense` and the in-place failure piece (`LoadFailedHere`). `resilient-lazy` and `on-demand-notice` are already in shared chunks.
  - The gate itself (`staff-factor-gate.tsx`, `staff-factor.ts` and its `mfa-service` import) is a chunk fetched after the permission read.
  - Nothing joins `ENTRY_CLOSURE` (bundle-mjs, jsx-runtime, not-found, preload-helper, react-dom, rolldown-runtime, shared-shell). `/admin` has 0.1 KiB of room today, so its ceiling moves by DEC-296 with the measured cause.
- **Concerns 2 and 4** change entry-carried code (`session-end.ts`, `app-shell.tsx`, `use-auth.ts`, `src/i18n/provider.tsx`, and `supabase-door.ts` if ruled). That moves every page: the gate step runs the check on the base and on the tree and raises every page left inside the band (rule 10, INC-1031). Concern 4 option B should shrink the entry (one subscription fewer).

## environments

`scripts/ci/local-backend-config.toml` gains three `[auth.email.template.<kind>]` tables (`confirmation`,
`recovery`, `email_change`), each with `subject` and `content_path = "supabase/templates/<kind>.html"`.
- The CLI resolves an action template's `content_path` against the folder ABOVE `supabase/` (`cli-config.go:957–963`, its FIXME), unlike a notification's (:966–969). In the working copy that is `$root/supabase/templates/<kind>.html`, where `prepare-local-backend.sh:154–155` already copies every `*.html`.
- On CI's temporary backends (the e2e lanes, the local-backend proof, `bun run db:proof`) the auth server then sends these bodies and subjects in place of its defaults. The readers are the mail sink (`e2e/helpers/mail-sink.ts`) and ACS-E4 for subjects. The e2e links come from `generateLink` (`e2e/helpers/users.ts`), so no test depends on a mail body's link.
- The CLI's `validate` reads every template's `content_path` with no enabled flag (`cli-config.go:1348–1358`); notifications are read only when enabled (:1363). The images job starts the stack without the templates folder, so `backend-config.py`'s `images` variant must drop the three template tables as it drops the notices.
- `local-backend-proof.yml:42` hashes the toml and `backend-config.py`, so the images' cache key changes once.

## mechanisms (read before anything is proposed)

- **`readRefusal`**: `src/lib/refusal.ts:172–261` (above).
- **`reportUnauthorised`**: `session-end.ts:56`, with `onUnauthorised` (:48) and the shell's verdict (`app-shell.tsx:803`, `session.expired`). The live guard is `app-shell.tsx:885`.
  - The door's storage listener (`src/lib/supabase-door.ts:340–343`) returns early on `event.newValue === null`, so a removal is dropped.
  - `forgetStoredSession` (:170–181) removes the keys without any broadcast.
- **The gate**: `staff-factor.ts` (`readStaffFactor`: failed, setupNeeded, codeNeeded or ready) and `staff-factor-gate.tsx`, unit-tested by AG-U1..U4. The mount bundle 5 wrote and held back is in `ed1d088d6:src/routes/admin.tsx`: `resilientLazy(…, "the staff screens' two-factor check", StaffFactorUnreachable, { inPlace: true })` inside `<Suspense fallback={<AdminChecking/>}>`.
- **`door_context`'s staff path** (`20261120100000_909988ad-….sql`):
  - class check :78–85;
  - the service role passes every gate :96–98;
  - not signed in :101–102;
  - deactivation :105–106;
  - permission with scope through `has_permission_scoped` :108–113;
  - step-up through `require_step_up_if_needed` unless the class is staff-reader :116–118;
  - dial :122–127.
- **The step-up gate**: `require_step_up_if_needed`, newest body in `20260817100845_ddd63395….sql:26–89`. It acts only when `permissions.requires_step_up`. It raises P0009 when there is no verified totp factor (:49–60), when `auth.jwt()->>'aal'` is not aal2 (:65–67), or when there is no `auth.mfa_amr_claims` totp row on this session within 10 minutes.
- **The harness**:
  - `grantRole` (`users.ts:419`) and the account pool (`global-setup.ts`; the pool's verified factor at :348–401, reset by `pool-reset-map.ts:81` "every MFA factor deleted").
  - `freshAal2Session` (`ui.ts:933`) mints aal2 in node for the pool.
  - `injectSession`, `assertInjectedIdentity` and `expectAal2` put it in a page.
- **The templates' check**: none exists (premises).

## first-download (my lock-exact build at the base, `bun run build && node scripts/check-bundle-size.mjs`; `build.log`)

The entry is JS 201.8 / 203 KiB and CSS 22.7 / 24 KiB. The check FAILS at the base on one page:
`/admin/roles_/$roleId: 274.6 KiB + 0.1 KiB local allowance sits within the NEAR band (0.3 KiB) of its ceiling of 275 KiB — DEC-296: set it to ceilingForLocal(size) = 276`.

Room to the NEAR band, computed as ceiling − 0.3 − (size + 0.1), for the pages the plan touches and every page an entry change moves within 0.3:

| page | size / ceiling (KiB) | room |
| --- | --- | --- |
| /admin/roles_/$roleId | 274.6 / 275 | −0.0 (fails at the base) |
| /dev/primitives | 227.6 / 228 | 0.0 |
| /admin | 206.5 / 207 | 0.1 |
| /settings | 277.5 / 278 | 0.1 |
| /privacy, /terms, /legal/$kind | 206.5 / 207 | 0.1 |
| /account_/legal | 204.4 / 205 | 0.2 |
| /admin/impersonation_/$sessionId | 235.4 / 236 | 0.2 |
| /admin/translations_/$lang | 310.4 / 311 | 0.2 |
| /post, /post_/$listingId, /my-listings_/$listingId_/edit | 402.4 / 403 | 0.2 |
| / | 223.3 / 224 | 0.3 |
| /$name | 221.3 / 222 | 0.3 |
| /admin/ | 207.3 / 208 | 0.3 |
| /admin/listings | 329.3 / 330 | 0.3 |
| /admin/screening | 349.3 / 350 | 0.3 |
| /admin/users | 292.3 / 293 | 0.3 |
| /admin/users_/$userId | 291.3 / 292 | 0.3 |
| /auth_/reset | 212.9 / 214 | 0.7 |
| /auth | 219.7 / 221 | 0.9 |
| /auth_/callback | 203.1 / 206 | 2.5 |

The base's `/admin/roles_/$roleId` failure is an earlier turn's red. Rule 00 step 1 says it is fixed first: 275 → 276 by `ceilingForLocal(274.6)`, in its own commit, named in §10 and §11. CI on the base passed it (CI reads about 0.1 KiB under a local build).

## premises (OPEN (a)–(d), from the vendor's source)

**(a) The auth server's message for each code `AUTH_REFUSALS` names** (auth v2.197.0, `internal/api/`; the
answer of each order through `readRefusal`):

| code | message (file:line) | sentence match today | word today → provider first |
| --- | --- | --- | --- |
| email_not_confirmed | "Email not confirmed" (token.go:182, passkey_authentication.go:159); "Please verify your email first." (reauthenticate.go:31); "Unverified email with %v. A confirmation email has been sent to your %v email" (identity.go:210) | /email not confirmed/ or none | errorEmailNotConfirmed → same |
| invalid_credentials | `InvalidLoginMessage` "Invalid login credentials" (token.go:111,117,178); "unsupported_grant_type" (:60); a hook's own message (:174); "Invalid client credentials: …" (middleware.go:148) | /invalid login credentials/ or none | errorInvalidCredentials → same |
| user_already_exists | "User already registered" (signup.go:294) | /already registered/ | errorEmailInUse → same |
| single_identity_not_deletable | "User must have at least 1 identity after unlinking" (identity.go:41) | /at least 1 identity/ | errorLastMethod → same |
| weak_password | the joined reasons "Password should be at least %d characters." / "Password should contain at least one character of each: …" (password.go:43,49; sent by errors.go:121,138); the HIBP reason "Password is known to be weak…" (password.go:66), which `heardOf` reads as leaked first | /password should be/ | errorWeakPassword → same |
| email_address_not_authorized | "Email address %q cannot be used as it is not authorized" (mail.go:775,781,789) | `heardOf` reads it first (MAIL_NOT_AUTHORIZED) | errorMailSend → same |
| validation_failed | "Invalid email format" (verify.go:77); "Verify requires …" (verify.go:54,59,65,81); "Invalid Refresh Token: Not Issued By This Server" (tokens/service.go:485) | /invalid email/ or none | errorInvalidEmail → same |
| over_request_rate_limit | "Request rate limit reached" (middleware.go:117,126) | /rate limit/ | errorRateLimited → same |
| over_email_send_rate_limit | "email rate limit exceeded" (mail.go:29; :342 …:557) | /rate limit/ | errorRateLimited → same |
| current_password_required | "Current password required when setting new password." (user.go:177) | none | errorWrongCurrentPassword → same |
| current_password_invalid | "Current password required when setting new password." (user.go:184) | none | errorWrongCurrentPassword → same |
| **same_password** | **"New password should be different from the old password." (user.go:197)** | **/password should be/** | **errorWeakPassword → errorSamePassword** |
| reauthentication_needed | "Password update requires reauthentication" (user.go:159) | none | errorReauthNeeded → same |

The only answer that changes is the INC-1275 one; the reset page (`src/routes/auth_.reset.tsx`, through
`failure()`) reads the same word.

**(b) How a tab hears another tab's removal, and what auth-js does on a refused renewal** (auth-js 2.110.9,
`dist/module/`):
- **The cross-tab channel.** Each client opens `new BroadcastChannel(storageKey)` (GoTrueClient.js:255), posts every event it emits with `broadcast = true` (:4269), and replays a received one to its own subscribers (:260–272).
- **A refused renewal** (`_callRefreshToken`, catch at :4206–4227) that is not a network failure:
  - If the access token has already expired, it runs `_removeSession` (:4332–4349). That removes the three storage keys and emits `SIGNED_OUT`, which is broadcast.
  - If the access token is still valid (a proactive refresh), it keeps the stored session.
- **Notifications during the client's init** are queued and fired later (:4255–4262).
- **The server's `session_not_found`** becomes `AuthSessionMissingError` (lib/fetch.js:68–72).
- **Our own `forgetStoredSession`** (`supabase-door.ts:170–181`) removes the keys without any broadcast.
- **Hearing every path.** A removal by any of these paths reaches every OTHER same-origin tab as a `storage` event with `key` = the stored session key and `newValue === null` (the DOM's `StorageEvent.newValue: string | null`, lib.dom.d.ts:31388). That is the one signal that covers all of them. The door's listener (:340–343) discards it today.
- **The action itself.** Whichever path emptied the store, the walking tab's next auth action finds no session (`AuthSessionMissingError`), so the action can report it even when no event was heard.

**(c) Which action templates the pinned CLI takes, and which the hosted projects send.**
- CLI 2.120.0's `[auth.email.template.<kind>]` takes `invite`, `confirmation`, `recovery`, `magic_link`, `email_change` and `reauthentication`, each with `subject` and `content_path` (`cli-auth.go:711–751`; Management fields `MailerSubjects<Kind>` / `MailerTemplates<Kind>Content`).
- The app sends:
  - `confirmation`: `signUp`, `auth-service.ts:76`; `resend`, :248;
  - `recovery`: `resetPasswordForEmail`, :549;
  - `email_change`: `updateUser({ email })`, :379. With `double_confirm_changes = true` (toml :52) it goes to both addresses.
- No code in `src/` calls `signInWithOtp`, `reauthenticate` or `inviteUserByEmail`, so `magic_link`, `reauthentication` and `invite` are the EXCEPTIONS. `generateLink` exists only in the harness (`e2e/helpers/users.ts`) and `scripts/deny-tests/p1f-identity-unlink.ts`.
- PREMISE WRONG: the brief says the list comes from "the hosted settings' list in the report of bundle 5". That list (bundle 5 report §12, :319–325) names the notices only, so the send list above comes from the app's callers.

**(d) Where a session's assurance level sits in the claims `door_context` can read.**
- The access token carries `aal`, `amr` and `session_id` (auth `internal/tokens/service.go:86–88`).
- `aal2` is issued only when the session holds a factor verification (`models/sessions.go:384` `CalculateAALAndAMR`). In SQL it is `auth.jwt() ->> 'aal'`.
- The session's factor verifications are rows of `auth.mfa_amr_claims` keyed by `session_id`; the factor's status is in `auth.mfa_factors`.
- `require_step_up_if_needed` reads all three (`20260817100845_…sql:49–67`), so `door_context` (SECURITY DEFINER) can read them the same way.

Further premises the census finds wrong:
- **Concern 3's guard** says "the check the notices already have, extended". No check of the templates exists: the only reader is ACS-E4's one subject. The guard is new (CF-TPL-1).
- **Concern 6 (a)** reads as a new guard, but CF-REFUSAL-3 (`scripts/conformance/refusal-readers.ts:146–178`, DEC-429) already judges thrown failures on exactly the client side the brief names (`NOT_CLIENT_SIDE`: `src/server/`, `src/routes/api/`, `src/integrations/`). By K1 the raw re-throw is a new finding of that census (CF-REFUSAL-5), with its lines in `refusal-readers-allowlist.txt`.
- **The scope does not name three files the brief's behaviour needs:**
  - `src/lib/supabase-door.ts`, for hearing a removal. The brief's `src/lib/` is "the refusal reader and its tests".
  - `src/server/supabase/user-client.ts`, if the staff routes join Part 3.
  - `src/features/admin/nav-alerts.ts`, the rail's staff reader. It runs outside `AdminGate`, and `src/features/admin/` is in scope only for `impersonation/`.

## callee-codes (`door_context` after Part 3)

| refusal | where | callers do |
| --- | --- | --- |
| `notSignedIn` (door_refuse) | :101–102 | the door's family reads `door.notSignedIn`; the route layer answers 401 → `reportUnauthorised` |
| `accountDeactivated` | :105–106 | family word; the account-status read ends the session (bundle 5) |
| `permissionDenied` (+ detail) | :108–113 | family word; `has_permission` failures on screens render as errors |
| **the second factor not used (new, staff and staff-reader classes)** | after permission, before step-up | question 1: (i) P0009 `stepUpRequired`: every guarded staff action's `useStepUp().guard` (`use-step-up.ts:107–130`) opens the step-up dialog, verifies, and retries; server routes answer 428 through `door_refusal_status`; readers outside a guard surface it as their typed failure. (ii) a new code, e.g. `secondFactorRequired`: joins `DOOR_CODES`, `door_refusal_status`, CF-REFUSAL-4's list, a word in each staff family, and no caller cures it without new code |
| P0009 step-up (raise, not door_refuse) | :116–118 | `guard` opens the dialog; unchanged |
| `rateLimited` (+ resets_at) | :122–127 | family word with the reset instant; unchanged |
| `door_context: unknown class` / `a staff class names its permission` / `a reader spends no dial` | :78–85 | programming errors (exceptions), unreachable from a correct body |

Readers that call a staff-reader door outside `AdminGate`:
- the rail's `legal_review_overdue` alert (`src/features/admin/nav-alerts.ts:27–29`, called through `useNavAlerts` from `src/components/shell/app-rail.tsx:758`);
- any staff reader a member-side page calls for a staff account (none other found: `rg -n "rpc\(\"(admin_|legal_review_overdue)" src --glob '!src/features/admin*/**' --glob '!src/routes/admin*'`).

`nav-alerts.ts:28` throws its error. After Part 3 an aal1 staff session on a member page would show the alert
read as failed (question 3).

## cell-meaning

Not applicable: no dial changes.

## findings

1. **DLG-E12 on WebKit at the base, run once, never retried** (`bun run e2e:local -- e2e/dialogs.spec.ts --grep "DLG-E12" --project webkit-1280 --retries 0`, `dlg-e12-webkit.log`):
   `✘ 1 [webkit-1280] › e2e/dialogs.spec.ts:775:3 › a Filters panel in rows (Lovable bundle 3) › DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel @webkit (13.0s)`. Then
   `Error: expect(locator).toBeVisible() failed` / `element(s) not found` (the `style-filters-size-list` list, `dialogs.spec.ts:833`), and the result line `1 failed`.
   It is the same failure bundle 5's §13 recorded on this Mac's WebKit 26, and it persists with Lovable bundle 8's fix in the base. CI's webkit lane passed it then. Reported, not retried.
2. **The base's NEAR band failure**: `/admin/roles_/$roleId`, above. It is an earlier turn's red, fixed first in Part 1's ceilings commit.
3. **Staff authority outside `door_context`** (scope, question 2).
   - The staff server routes authorise through `callerHasPermission` (`src/server/supabase/user-client.ts:144`, `src/server/route.ts:207–236`).
   - 56 `CREATE POLICY` statements across `supabase/migrations` name `has_permission(` (`rg -U -c "CREATE POLICY[^;]*has_permission\(" supabase/migrations`, every declaration, not only the last).
   - The brief's Part 3 names `door_context`'s staff classes. Whether DEC-434's server half also reaches these two mechanisms is question 2; the detail is in the chat.
4. **K2 siblings that bypass a mechanism:**
   - `src/features/auth/mfa/mfa-service.ts:168–179` forks the reader's order (code first) locally; with RFR-11 it folds into the one reader.
   - `src/routes/auth.tsx:244` subscribes to the auth events on its own (concern 4's class; not named by the brief).
   - `e2e/legal-admin.spec.ts:206` `rpcAs` and `e2e/legal-doors.spec.ts:48` `pooledSuperAdminCredentials` are spec-local copies of `asPerson` and the pool's credentials whose names CF-HELPERS-1 does not list.
5. **LAW-NUM-1 hits beyond the brief's one line:**
   - `src/features/admin/audit/audit-page.tsx:261,269,277` pass `?? 0` reads to the audit tiles (`stat-card.tsx:22` `value: ReactNode`). These are outside scope (`src/features/admin/` is in scope for `impersonation/` only).
   - `src/features/admin-attributes/attributes-service.ts:236` `total: Number(row.options_total ?? 0)` is a service, not a screen. It feeds the attributes table's count, and the census reads it as the same class.
   - The in-scope line is `impersonation-view.tsx:233`. The pager (`data-table.tsx:358`, `total: number | undefined`) already takes `undefined`.
6. **AU-3 (INC-1269): cause unproven.**
   - The flake ledger has two entries: 2026-09-04 (a timeout), and 2026-11-23 run 45110205977 (`cursor/bundle-4`, lane 16, desktop-1280; `au3/`).
   - The red is at `admin-users.spec.ts:229`. The status stayed "Deactivated" and the page showed `admin.users.status.failed` (`user-detail.tsx:272`, from `setAccountStatus`, `admin-users-service.ts:127–138`). That followed Reactivate and the step-up, with `expectAal2` passing.
   - The run's client errors hold no 4xx for `admin_set_account_status`. They hold only the scratch account's 403 `accountDeactivated` and one URL-less `net::ERR_FAILED`.
   - No gating AU-3 red on bundle 5's runs: 45214184929 failed on the gate mount, and 45187492568 on DLG-E12.
   - The proposal: the test records failed requests and the status door's answer (status and body) beside its assertion, so the next red names its cause. INC-1269 is left open with that instrument.
7. **INC-1277: the browser libraries' install.**
   - Runs 45332415048 (`lovable/next`) and 45337319415 (attempt 1), both on the repeat lane: chromium plus webkit, 181 packages, 126 MB.
   - The region mirror `us-east-2.ec2.archive.ubuntu.com` resolved but served at about 50–90 kB/s, with `Ign` entries. The 1500 s deadline hit at package 115 and at package 151.
   - `install-browser-deps.sh`'s probe checks DNS only.
   - The fix in scope (`scripts/ci/`): the probe measures each mirror's throughput on one small index file and drops a slow region mirror for the next in the list. apt gets a per-mirror `Acquire::http::Timeout` and `Acquire::Retries`, so a stalled mirror is left rather than waited on.
   - A package cache would need `.github/workflows/**`, which is outside scope and out of bounds without the brief naming it (question 9).
8. **A census-tool slip, corrected before this report**: the first gate-reach pass matched `signIn` inside `signInJobSuperAdmin` and counted pool rows as browser sign-ins. The table below is from the exact-token pass.

No security hole was found.

## queued (`queued.txt`, 53 lines, the brief's `rg`)

| queued item | where | here |
| --- | --- | --- |
| the gate's mount, STAFF-E1, STAFF-E2, `e2e/helpers/staff-factor.ts` | bundle-5 report :17, :29, :294; ruling 3 item 1 (DEC-451); stop-3 :128 | built here, Parts 2 and 4 |
| DEC-434's server half | ruling 1 :15, :56 (DEC-438); report :339 | built here, Part 3 |
| the usage map's gate words back to /admin | bundle-5 report :330 | built here, Part 4 (`bun run i18n:usage`) |
| INC-1268 the provider's own subscription | report :254, :342; ruling 1 :59 | built here, Part 1 |
| INC-1272 gating failures first | ruling 3 :17, :55; report :345 | built here, Part 2 |
| INC-1266 three held readers | ruling 3 :33–34, :56; report :31, :346 | the guard with their three lines, Part 2 |
| INC-1269 AU-3 | ruling 3 :38; report :347 | instrumented, left (cause unproven) |
| the staff harness, 31 spec files | report :257 | built here, 34 files (gate-reach) |
| `docs/features/account.md:27`, `docs/features/step-up-auth.md:230` | docs | rewritten in Parts 1 and 4 |
| roadmap :340, :356 ("bundle 6" of an older numbering) | roadmap | not this bundle |
| `foundations-turn-2.md:16` ("since bundle 6") | brief | not this bundle |

# THE PLAN

Order: Part 1 (no database) → Part 2 → Part 3 (MIGRATION STOP) → Part 4. One commit an item.

## Part 1 — concerns 1 to 4 (+ the base's red first)

0. The base's red: `scripts/route-budgets.mjs` `/admin/roles_/$roleId` 275 → 276 (`ceilingForLocal(274.6)`, DEC-296 line).
1. Concern 1:
   - `src/lib/refusal.ts`: the provider code a family's words name is read before the family's sentences, after the door code. `doorCode` is never a provider code, so their order is free.
   - `src/lib/refusal.test.ts` gains RFR-11 (the order) and RFR-12, the unit census. For every code that `AUTH_REFUSALS` and `MFA_REFUSALS` name and the auth server sends with English, the code and its real message, quoted with file:line from (a), read through `readRefusal`, give the family's word. Planted: a family whose sentence matches a coded message, ordered first, fails.
   - `src/features/auth/auth-client.test.ts`: ACS-U2's cases carry the real messages.
   - `src/features/auth/auth-error-key.test.ts`: `same_password` → `auth.errorSamePassword`.
   - `src/features/auth/mfa/mfa-service.ts`: its local fork (:168–179) is folded onto the one reader if its answers stay equal, which its tests prove. Otherwise it is named and left (K2).
2. Concern 2:
   - `src/features/auth/auth-service.ts`: `failure()`'s callers report an `AuthSessionMissingError` (by `isAuthSessionMissingError`), a missing user in `currentPasswordProof`, `session_not_found` and a refused renewal through `reportUnauthorised`. They answer a typed `{ ok: false, errorKey: "session.expired" }`.
   - `src/features/auth/session-end.ts` and its test gain SEN-8.
   - The mfa service's session-reading calls report the same way.
   - `src/lib/supabase-door.ts` (question 4): the storage listener hears a removal of the stored session key (`newValue === null`) and tells the shell's live guard. `onStoredSessionRemoved` in `supabase-door.ts`, tested by SBD-23.
   - `src/components/app-shell.tsx`: the live guard ends the session with `session.expired`.
   - Unit tests ACS-U8 (no session), ACS-U9 (`session_not_found`) and ACS-U10 (a refused renewal), in `auth-client.test.ts`. The tests that assert the generic answer for a missing session (`auth-client.test.ts:194,247,446`) are re-pointed and named under §10.
   - ACS-E5 in `e2e/settings.spec.ts`: two pages of one context; the other page signs out (store emptied); Change password and Change email answer `session.expired`, and the page goes to `/auth`.
   - New words: none (`session.expired` exists).
3. Concern 3, `supabase/templates/confirmation.html`, `recovery.html` and `email_change.html` in the notices' form (`<div lang="en">…</div><hr /><div lang="am">…</div>`):
   - `subjects.json` gains three keys.
   - `scripts/ci/local-backend-config.toml` gains three `[auth.email.template.<kind>]` tables.
   - `scripts/ci/backend-config.py` drops them in `images`, with BCFG-1's list and the new BCFG-3.
   - The new guard `scripts/conformance/auth-templates.test.ts` (CF-TPL-1, through `kit.ts`, wired):
     - every html has its subject and its toml table, and every subject has its html;
     - the en / hr / am form holds;
     - an action template holds `{{ .ConfirmationURL }}` exactly once and no other `href` or `http`, and a notice holds none;
     - the planted cases are a template with no subject and a subject with no template.
   - The Amharic comes from the supervisor's file; until then the AM halves are not written.
4. Concern 4, `src/i18n/provider.tsx` (question 5):
   - (B, recommended) the provider owns the identity state, and the shell's one `useAuth()` writes it through a setter the provider gives in its context. The boundaries that render the provider without the shell (`__root.tsx:245`, :290) keep the device's stored language. One subscription fewer in the entry.
   - (A) a module-level subscribed store read by both, which changes `use-auth.ts`'s form.
   - Tests ILA-6 (the provider follows the shell's identity, loading included) and the three provider test files' mocks.
   - CF-SESSION-7 (`session-reads.test.ts`): no `onAuthChange(` outside its listed callers. Planted.
5. Docs:
   - `docs/features/account.md` §"The status read and the session store" (:27): the auth actions that report an ended session, and the provider on the one store.
   - `docs/features/auth-email-door.md` §"The six security notices" (:299): every sign-in mail, with the three action templates.
   - `docs/features/doors.md` (`door_context`, :14) gets the staff classes' factor step in Part 3.

## Part 2 — the staff helper, the law, concern 6

1. `e2e/helpers/staff-factor.ts` (new) is the one staff sign-in. For a leased or created account holding a staff role (`grantRole` / `grantScratchRole`):
   - it enrols a TOTP factor through `authFetch('/factors')` in node, challenges and verifies it with `totp()`;
   - the verify's answer is the aal2 session;
   - for a browser test: `injectSession` → `assertInjectedIdentity` → `expectAal2`;
   - for a node test: an `asPerson`-shaped aal2 caller.

   The node mint is shared with `freshAal2Session` (`ui.ts:933`), extended by a parameter (K1). The pool's reset already deletes every factor (`pool-reset-map.ts:81`). Leased accounts are reaped with their factors. One TOTP step per enrolment; no new lease per test (the leases law).
2. The 34 spec files of gate-reach move onto it, test by test, per the table's need column. CF-HELPERS-1's list gains the helper's names. `check-identity-tags.sh` DEFERRED :38 loses the AU rows that move.
3. The law: `scripts/brief/go-laws.ts` CF-BRIEF-22, with BRIEF-22 in `scripts/conformance/briefs.test.ts`: a brief whose concern adds a gate (an `AdminGate`-, `door_context`- or route-caller change) answers `gate-reach`. The item goes in `docs/governance/go-template.md` (`<!-- CENSUS-ITEM: gate-reach -->`).
4. Concern 6:
   - (a) CF-REFUSAL-5 in `scripts/conformance/refusal-readers.ts` `failureThrowFindings`: `if (error) throw error;` (a raw re-throw of a failed call's error) on the client side, with CFRR-9 planted. The scope is question 7. The allowlist gains INC-1266's three lines (`src/features/admin/nav-alerts.ts:28`, `src/features/posting/use-price-unit-labels.ts:20`, `src/features/auth/account-status.ts`) `| INC-1266 …`.
   - (b) CF-NUM-1 (`scripts/conformance/read-numbers.ts`, through the kit, wired): no `?? 0` of a read passed to `resultCount`, `total` or a tile's `value`. Planted. `impersonation-view.tsx:233` passes `undefined` until the read answers.
   - (c) `scripts/e2e-failure-report.ts`: a "Gating failures" section written first, ahead of the flake, outside, start, ssr, a11y, timing and post-test sections. Tested by EFR-6.
   - (d) AU-3's instrument: on failure, the failed requests and the status door's answer are attached.
   - (e) `scripts/ci/install-browser-deps.sh`: the throughput probe and the apt timeouts, tested by IBD-1 in `install-browser-deps.test.ts`.

## Part 3 — the migration (MIGRATION STOP)

Files, in order:

1. `supabase/migrations/<timestamp>_<uuid>.sql`, with no `e2e-areas` header, so the selector takes ALL. It declares `public.door_context` WHOLE (DEC-383) from its last body (`20261120100000_909988ad-….sql:64–135`).
   - Between permission (:108–113) and step-up (:116–118), for `p_class IN ('staff', 'staff-reader')`, it refuses unless `COALESCE(auth.jwt() ->> 'aal', 'aal1') = 'aal2'` AND `auth.mfa_factors` holds a verified `totp` factor of `v_ctx.uid`. The code is per question 1.
   - The service role still passes first (:96–98).
   - The function's `COMMENT` gains the step. Its REVOKE … FROM PUBLIC and its grants are restated as they stand.
   - In-file proofs on scratch rows:
     - a staff call with an aal1 claim is refused;
     - an aal2 claim with no verified factor is refused;
     - aal2 with a verified factor is admitted;
     - a caller without the permission still reads `permissionDenied` (the order);
     - a staff-reader is refused at aal1.
   - The mark and the md5 table. The pre-check md5s: `door_context` 1136caf7…, `door_refused` 990719…, `door_refuse` 55f9bf…; the full values go in stop 2.
   - If question 1 picks a new code, the same file declares `door_refusal_status`'s row and the refusal codes' list (CF-REFUSAL-4) whole.
   - If question 2 rules the routes in: `src/server/supabase/user-client.ts` `callerHasPermission` reads the same claim (no SQL).
   - If question 2 rules the policies in: a second file, every staff policy's `has_permission` behind a `staff_session_ok()` helper, born closed with its REVOKE.
2. `bun run db:proof --fresh` (its last line in stop 2), then `docs/governance/reports/cursor-bundle-6.stop-2.md` with the pairing line. Push; STOP.

## Part 4 — the gate mounted

- `src/routes/admin.tsx`: `AdminGate` takes bundle 5's mount by scripted copy of the lines from `ed1d088d6:src/routes/admin.tsx` (ruling 3 item 1), adapted to the base's file.
- The allowlist line the gate's in-place failure needs ("holds its box", `on-demand-failure-allowlist.txt`) comes from the same commit.
- STAFF-E1 and STAFF-E2 in `e2e/mfa-stepup.spec.ts`:
  - E1: a staff account with no factor meets the setup panel and no staff screen.
  - E2: an account with a factor whose session has not used it is asked for its code before any staff screen draws.
- `bun run i18n:usage`; both maps committed.
- `docs/features/step-up-auth.md:230` rewritten: mounted, with the server half.
- The `/admin` pages' ceilings by DEC-296, with the chunk named.

## Templates' English (the Amharic from the supervisor's file)

- `confirmation`. Subject: "Confirm your ethio.com account".
  - Heading "Confirm your ethio.com account".
  - Body: "Someone signed up for ethio.com with this email address. To finish, open this link:" `<a href="{{ .ConfirmationURL }}">Confirm my email address</a>`. "If you did not sign up, ignore this email; no account is made without the confirmation."
- `recovery`. Subject: "Reset your ethio.com password".
  - Heading "Reset your ethio.com password".
  - Body: "Someone asked to reset the password of your ethio.com account. To choose a new one, open this link:" `<a href="{{ .ConfirmationURL }}">Choose a new password</a>`. "If you did not ask, ignore this email; your password stays as it is."
- `email_change`. Subject: "Confirm your new ethio.com email address".
  - Heading "Confirm the change of your ethio.com email address".
  - Body: "Someone asked to change the email address of your ethio.com account from {{ .Email }} to {{ .NewEmail }}. To confirm, open this link:" `<a href="{{ .ConfirmationURL }}">Confirm the change</a>`. "If you did not ask, ignore this email and reset your password; the address stays as it is."
  - The server sends it to both addresses (`double_confirm_changes`), each with its own link.
- The exceptions (not sent by the app): `invite`, `magic_link`, `reauthentication`. They stay at the hosted defaults, with no repository file, so CF-TPL-1's list names the three sent kinds.

## Ids proposed (each free at the base: `rg -l -w` across `src`, `e2e`, `scripts` and the go-template)

- Concern 1: RFR-11, RFR-12.
- Concern 2: SEN-8; SBD-23 (if question 4 says yes); ACS-U8, ACS-U9, ACS-U10; ACS-E5.
- Concern 4: ILA-6 (ILA-5 is taken by `server-shell-language.test.ts`); CF-SESSION-7.
- Concern 3: CF-TPL-1; BCFG-3 (CF-BCFG-3).
- Concern 6: CF-REFUSAL-5 with CFRR-9; CF-NUM-1; EFR-6; IBD-1.
- The gate-reach law: CF-BRIEF-22 with BRIEF-22.
- Part 4: STAFF-E1, STAFF-E2 (the brief's).

## The hosted settings and templates (the operator's, after Publish; ethio-staging first, then ethio-prod)

1. Authentication → Emails, the "Email Templates" page, by the dashboard's labels:
   - "Confirm signup": the subject from `subjects.json` `confirmation`, the body from `supabase/templates/confirmation.html`.
   - "Reset Password": `recovery`.
   - "Change Email Address": `email_change`.

   By the Management API, these are the fields `MailerSubjectsConfirmation`, `MailerTemplatesConfirmationContent`, `MailerSubjectsRecovery`, `MailerTemplatesRecoveryContent`, `MailerSubjectsEmailChange` and `MailerTemplatesEmailChangeContent` (`cli-auth.go:720–744`; the API's key is each field's snake_case form, read back by the operator). Each is read back after it is set.
2. "Invite user", "Magic Link" and "Reauthentication" are unchanged (exceptions).
3. No other hosted setting. Part 3 is a migration: the supervisor applies it on ethio-staging, and the operator on ethio-prod after being told that staff holders without a verified factor will meet the setup on their next staff screen, and the staff doors refuse them until a factor is used (EXISTING ROWS).

# QUESTIONS FOR RULING 1

1. **The staff-class refusal's code**:
   - (i) reuse P0009 / `stepUpRequired`, recommended. Every guarded staff action already cures it with the step-up dialog, which makes the session aal2. Server routes already answer 428. MF-4, CT-7, IMP-5 and legal-doors' aal1 checks (:296, :719, :1284) keep their subjects.
   - (ii) a new code (`secondFactorRequired`): `DOOR_CODES`, `door_refusal_status`, CF-REFUSAL-4 and every staff family gain it.
2. **The staff server routes** (`callerHasPermission`, `src/server/supabase/user-client.ts:144`, outside SCOPE) and the 56 `has_permission` RLS and storage policy statements: inside Part 3, or named and left?
3. **The rail's `legal_review_overdue` alert** (`src/features/admin/nav-alerts.ts:27–29` via `app-rail.tsx:758`, outside SCOPE) runs for a staff account outside `AdminGate`. After Part 3 an aal1 staff session's alert read is refused. Choices:
   - move the read under the admin layout;
   - read it only when the session's `aal` is aal2, as a convenience;
   - or show it as failed.
4. **`src/lib/supabase-door.ts` in scope** for hearing the store's removal (the brief's `src/lib/` names only the refusal reader)?
5. **Concern 4's form**: (B) the shell writes the identity into the provider's context, recommended; or (A) a module-level store. And `src/routes/auth.tsx:244`'s own subscription: joined to the same fix (in scope: `src/routes/`), or listed as a CF-SESSION-7 exception with its reason?
6. **LAW-NUM-1's hits outside scope**: `audit-page.tsx:261,269,277` and `attributes-service.ts:236`. Allowlisted with an INC and expiry, or fixed here by a widening?
7. **The raw re-throw guard's reach**: 80 sites today. The brief allowlists three, which would leave 77 findings. Choices:
   - every client file, with 77 more allowlist lines under one INC;
   - only the files that sit on a first download, which is INC-1266's law;
   - or the brief's three readers and every new site, with the rest a census line.
8. **The step-up modal's admin tests** (MF-2/3/6/7/7b/7c/8): signed in through the helper and staled with `staleStepUpOnClient`, as planned, or another subject?
9. **INC-1277's fix**: the throughput probe and apt timeouts in `scripts/ci/` (in scope), or also a package cache, which needs `.github/workflows/**` (outside scope; AGENTS and rule 50)?
10. **AU-3 (INC-1269)**: left with its cause unproven and the instrument added, as proposed?
11. **The Amharic** of three subjects and three bodies (the English above) is needed from the supervisor's file before Part 1's concern 3 commit.

# GATE-REACH TABLE (144 tests outside the pool-only 288; `gate-table.md`, generated from `gate-reach-needs.tsv`)

| file:line | id | staff role | sign-in | /admin paths | staff doors named | needs |
| --- | --- | --- | --- | --- | --- | --- |
| e2e/admin-attributes-editor.spec.ts:380 | AT-34 | scratch | switchUser | 1 | admin_upsert_attribute | G |
| e2e/admin-screening.spec.ts:297 | SC-16 | scratch | switchUser | 0 | admin_review_listing | S (staff door from the page at aal1) |
| e2e/admin-screening.spec.ts:409 | SC-17 | scratch | switchUser | 0 | admin_reveal_listing_contact, admin_screening_facts | S (staff doors from the page at aal1) |
| e2e/admin-screening.spec.ts:720 | SC-15 | scratch | switchUser | 1 | - | G |
| e2e/admin-screening.spec.ts:985 | SC-21 | scratch | passwordGrant,signInJobSuperAdmin | 1 | - | none (the pool at aal2; the grant is a seller's) |
| e2e/admin-screening.spec.ts:1543 | SC-28 | scratch | asPerson | 0 | admin_screening_queue | S |
| e2e/admin-screening.spec.ts:1587 | SC-29 | scratch | asPerson | 0 | admin_screening_queue | S |
| e2e/admin-screening.spec.ts:1614 | SC-30 | scratch | asPerson | 0 | admin_screening_queue | S |
| e2e/shell.spec.ts:1079 | RL-1 | admin | switchUser | 1 | - | G |
| e2e/shell.spec.ts:1921 | md+ | admin | signIn | 1 | - | G |
| e2e/admin-listings.spec.ts:217 | AL-1 | scratch | asPerson,signInJobSuperAdmin | 0 | admin_list_listings | S (pool too) |
| e2e/admin-listings.spec.ts:342 | AL-24 | scratch | asPerson | 0 | admin_edit_listing | S |
| e2e/admin-listings.spec.ts:355 | AL-25 | scratch | asPerson | 0 | admin_edit_listing | S |
| e2e/admin-listings.spec.ts:468 | AL-5 | scratch | asPerson,signInJobSuperAdmin | 0 | admin_edit_listing | S (pool too) |
| e2e/admin-listings.spec.ts:599 | AL-8 | scratch | asPerson,enrollAndStepUp,signInJobSuperAdmin,signInViaSession | 0 | admin_move_listing | S (pool too) |
| e2e/admin-listings.spec.ts:665 | AL-9 | scratch | asPerson,signInJobSuperAdmin | 0 | admin_move_listing | S (pool too) |
| e2e/admin-listings.spec.ts:812 | AL-11 | scratch | signInViaSession | 1 | - | G |
| e2e/admin-listings.spec.ts:1059 | AL-16 | scratch | asPerson,signInJobSuperAdmin | 0 | admin_listing_detail, admin_move_listing | S (pool too) |
| e2e/admin-listings.spec.ts:1229 | AL-18 | scratch | signInViaSession | 1 | - | G |
| e2e/admin-listings.spec.ts:1969 | AL-29 | scratch | asPerson,signInJobSuperAdmin | 0 | admin_edit_listing | S (pool too) |
| e2e/admin-listings.spec.ts:2012 | AL-30 | scratch | signInViaSession | 1 | - | G |
| e2e/admin-listings.spec.ts:2081 | AL-31 | scratch | asPerson,signInViaSession | 2 | - | G |
| e2e/admin-listings.spec.ts:2171 | AL-32 | scratch | asPerson | 0 | admin_list_listings | S |
| e2e/admin-listings.spec.ts:2371 | ATR-3 | scratch | signInViaSession | 1 | admin_set_listing_tier | G |
| e2e/admin-listings.spec.ts:2403 | ATR-4 | scratch | signInViaSession | 0 | admin_set_listing_tier | S (staff door from the page at aal1) |
| e2e/admin-listings.spec.ts:2553 | ATR-7 | scratch | signInViaSession | 1 | admin_set_listing_tier | G |
| e2e/admin-categories-lifecycle.spec.ts:1845 | CT-22 | scratch | switchUser | 1 | - | G |
| e2e/admin-categories-lifecycle.spec.ts:1889 | CT-23 | scratch | switchUser | 1 | - | G |
| e2e/shell-table-law.spec.ts:18 | admin | admin | switchUser | 1 | - | G |
| e2e/legal-doors.spec.ts:261 | LG-2 | admin | asBearer,asPerson,signInJobSuperAdmin | 0 | admin_publish_legal_version, admin_save_legal_draft | S (pool too) |
| e2e/legal-doors.spec.ts:360 | LG-3 | scratch | asBearer,signInJobSuperAdmin | 0 | admin_discard_legal_draft, admin_save_legal_draft | S (pool too) |
| e2e/legal-doors.spec.ts:684 | LG-6 | admin | asBearer,asPerson,signInJobSuperAdmin | 0 | admin_legal_settings, admin_set_legal_settings | S (pool too) |
| e2e/legal-doors.spec.ts:743 | LG-7 | admin | asBearer,asPerson,signInJobSuperAdmin | 0 | admin_user_legal_history | S (pool too) |
| e2e/legal-doors.spec.ts:905 | LG-9 | admin | asBearer,asPerson,signInJobSuperAdmin | 0 | admin_legal_documents, admin_legal_version | S (pool too) |
| e2e/legal-doors.spec.ts:955 | LG-10 | scratch | asBearer,asPerson,signInJobSuperAdmin | 0 | admin_legal_documents, admin_publish_legal_version, admin_save_legal_draft | S (pool too) |
| e2e/legal-doors.spec.ts:1010 | LG-11 | scratch | asBearer,asPerson,signInJobSuperAdmin | 0 | admin_user_legal_history | S (pool too) |
| e2e/legal-doors.spec.ts:1120 | LG-13 | scratch | asBearer,signInJobSuperAdmin | 0 | admin_set_legal_settings | S (pool too) |
| e2e/legal-doors.spec.ts:1152 | LG-14 | scratch | asBearer,signInJobSuperAdmin | 0 | admin_publish_legal_version, admin_save_legal_draft | S (pool too) |
| e2e/legal-doors.spec.ts:1253 | LG-24 | admin | asBearer,asPerson,signInJobSuperAdmin | 0 | admin_export_legal_acceptances | S (pool too) |
| e2e/sage-ad-page.spec.ts:349 | SAP-3 | scratch | signIn,signInJobSuperAdmin | 1 | - | G (pool too) |
| e2e/admin-monetisation.spec.ts:555 | MON-2 | scratch | signInViaSession | 2 | admin_list_monetisation, admin_save_listing_package, admin_save_market_settings | G |
| e2e/admin-countries.spec.ts:62 | CO-1 | admin | switchUser | 1 | - | G |
| e2e/auth-signout.spec.ts:61 | SO-1 | super_admin | signIn | 1 | - | G |
| e2e/auth-signout.spec.ts:97 | SO-3 | super_admin | signIn | 1 | - | G |
| e2e/auth-signout.spec.ts:116 | SO-3b | super_admin | signIn | 1 | - | G |
| e2e/auth-signout.spec.ts:135 | SO-4 | super_admin | signIn | 1 | - | G |
| e2e/auth-signout.spec.ts:450 | SP-4 | super_admin | signIn | 1 | - | G |
| e2e/auth-signout.spec.ts:473 | SP-6 | super_admin | signIn | 0 | - | none (member pages; the subject is the session's end) |
| e2e/auth-signout.spec.ts:764 | SO-14 | super_admin | passwordGrant,signIn | 0 | - | none (member pages; the subject is the session's end) |
| e2e/auth-signout.spec.ts:808 | SO-15 | super_admin | signIn | 0 | - | none (member pages; the subject is the session's end) |
| e2e/auth-signout.spec.ts:844 | SO-16 | super_admin | signIn | 0 | - | none (member pages; the subject is the session's end) |
| e2e/admin-users.spec.ts:144 | AU-1 | moderator,admin | switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:165 | AU-2 | admin | switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:183 | AU-3 | admin | enrollAndStepUp,passwordGrant,switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:235 | AU-7 | admin | switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:252 | AU-8 | admin | switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:265 | AU-4 | super_admin | enrollAndStepUp,switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:293 | AU-5 | admin | enrollAndStepUp,passwordGrant,switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:350 | AU-9 | admin | enrollAndStepUp,switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:378 | AU-10 | admin | enrollAndStepUp,switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:418 | AU-12 | admin | enrollAndStepUp,switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:481 | AU-11 | admin | switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:499 | AU-13 | admin | switchUser | 1 | - | G |
| e2e/admin-users.spec.ts:562 | AU-14 | admin | enrollAndStepUp,passwordGrant,switchUser | 1 | admin_set_account_status | G+S |
| e2e/admin-shell.spec.ts:90 | A-6 | admin | signIn | 1 | - | G |
| e2e/admin-shell.spec.ts:193 | A-7 | moderator | signIn | 5 | - | G |
| e2e/admin-shell.spec.ts:255 | A-4 | admin | signIn | 0 | - | G (opens /admin through the panel) |
| e2e/admin-shell.spec.ts:295 | A-5 | admin,moderator | signIn,switchUser | 2 | - | G |
| e2e/admin-shell.spec.ts:414 | IN-1 | admin | signIn | 0 | - | G (opens an admin section path) |
| e2e/submenu.spec.ts:236 | SMN-E11 | admin | signIn | 1 | - | G |
| e2e/admin-audit.spec.ts:48 | AS-1 | moderator | switchUser | 1 | - | G |
| e2e/admin-audit.spec.ts:113 | AS-3 | moderator | switchUser | 1 | - | G |
| e2e/admin-audit.spec.ts:320 | IMP-5 | admin | switchUser | 0 | begin_impersonation | P (asserts the server's refusal of an aal1 staff call) |
| e2e/admin-audit.spec.ts:345 | IMP-6 | scratch | signInJobSuperAdmin,switchUser | 0 | - | none (the pool, then a member) |
| e2e/my-listings-doors.spec.ts:259 | ML-1 | scratch | asPerson | 0 | admin_list_listings | S |
| e2e/my-listings-doors.spec.ts:321 | ML-2 | scratch | asPerson | 0 | - | none (owner doors; the staff permission is not asked) |
| e2e/my-listings-doors.spec.ts:637 | ML-9 | scratch | asPerson,signInJobSuperAdmin | 0 | admin_edit_listing | S (pool too) |
| e2e/my-listings-doors.spec.ts:694 | ML-10 | scratch | asPerson,signInJobSuperAdmin | 0 | admin_set_listing_policy | S (pool too) |
| e2e/auth-caller-gates.spec.ts:80 | CG-1 | admin | enrollAndStepUp,passwordGrant,switchUser | 1 | - | G |
| e2e/my-listings-ad.spec.ts:659 | MLA-8 | scratch | asPerson | 0 | - | none (transition_listing is an owner door) |
| e2e/admin-categories-console.spec.ts:104 | CT-1 | admin | switchUser | 1 | - | G |
| e2e/admin-categories-console.spec.ts:122 | CT-2 | admin | switchUser | 1 | - | G |
| e2e/admin-categories-console.spec.ts:464 | CT-7 | super_admin | enrollAndStepUp,switchUser | 0 | - | P (asserts the server's refusal of an aal1 staff call) |
| e2e/admin-categories-console.spec.ts:490 | CT-7b | super_admin | signInJobSuperAdmin,switchUser | 1 | - | G (pool too) |
| e2e/admin-categories-console.spec.ts:615 | CT-9a | admin | switchUser | 1 | - | G |
| e2e/admin-categories-console.spec.ts:656 | CT-9b | admin | switchUser | 1 | - | G |
| e2e/admin-categories-console.spec.ts:717 | CT-11 | admin | switchUser | 1 | - | G |
| e2e/admin-categories-console.spec.ts:772 | CT-29 | admin | switchUser | 1 | - | G |
| e2e/legal-admin.spec.ts:246 | LGA-1 | admin | signInJobSuperAdmin,switchUser | 1 | - | G (pool too) |
| e2e/legal-admin.spec.ts:507 | LGA-7 | scratch | passwordGrant,signInJobSuperAdmin | 1 | - | none (the pool at aal2; the grants are members') |
| e2e/legal-admin.spec.ts:541 | LGA-8 | scratch | passwordGrant,signInJobSuperAdmin | 1 | - | none (the pool at aal2; the grants are members') |
| e2e/legal-admin.spec.ts:556 | LGA-9 | scratch | passwordGrant,signInJobSuperAdmin | 1 | - | none (the pool at aal2; the grants are members') |
| e2e/legal-admin.spec.ts:638 | LGA-13 | scratch | passwordGrant,signInJobSuperAdmin | 1 | - | none (the pool at aal2; the grants are members') |
| e2e/legal-admin.spec.ts:691 | LGA-15 | scratch | passwordGrant,signInJobSuperAdmin | 1 | - | none (the pool at aal2; the grants are members') |
| e2e/legal-admin.spec.ts:733 | LGA-16 | scratch | passwordGrant,signInJobSuperAdmin | 1 | admin_mark_legal_reviewed | S (pool too) |
| e2e/legal-admin.spec.ts:786 | LGA-17 | scratch | passwordGrant,signInJobSuperAdmin | 1 | legal_review_overdue | S (pool too) |
| e2e/legal-admin.spec.ts:1006 | LGA-21 | scratch | signInJobSuperAdmin,switchUser | 2 | - | G (pool too) |
| e2e/legal-admin.spec.ts:1135 | LGA-22 | scratch | passwordGrant | 0 | base_languages | S |
| e2e/admin-guides.spec.ts:279 | AG-6 | moderator | signIn | 1 | - | G |
| e2e/door-refusals.spec.ts:126 | DRF-1 | moderator | passwordGrant | 0 | - | none (has_permission asked directly, not door_context) |
| e2e/door-refusals.spec.ts:147 | DRF-2 | moderator,super_admin | passwordGrant | 0 | - | none (has_permission asked directly, not door_context) |
| e2e/door-refusals.spec.ts:222 | DRF-5 | moderator | - | 0 | - | none (has_permission_scoped asked by the service role) |
| e2e/door-refusals.spec.ts:253 | DRF-6 | moderator | - | 0 | - | none (has_permission_scoped asked by the service role) |
| e2e/mfa-stepup.spec.ts:82 | MF-1 | admin | switchUser | 0 | - | none (/settings only) |
| e2e/mfa-stepup.spec.ts:99 | MF-2 | admin | switchUser | 1 | - | G |
| e2e/mfa-stepup.spec.ts:134 | MF-3 | admin | switchUser | 1 | - | G |
| e2e/mfa-stepup.spec.ts:149 | MF-8 | admin | switchUser | 1 | - | G |
| e2e/mfa-stepup.spec.ts:186 | MF-4 | admin | switchUser | 0 | admin_set_account_status | P (asserts the server's refusal of an aal1 staff call) |
| e2e/mfa-stepup.spec.ts:218 | MF-5 | admin | switchUser | 0 | - | none (/settings only) |
| e2e/mfa-stepup.spec.ts:255 | MF-6 | admin | switchUser | 1 | - | G |
| e2e/mfa-stepup.spec.ts:283 | MF-7 | admin | switchUser | 1 | - | G |
| e2e/mfa-stepup.spec.ts:331 | MF-7b | admin | switchUser | 1 | - | G |
| e2e/mfa-stepup.spec.ts:362 | MF-7c | admin | switchUser | 1 | - | G |
| e2e/mfa-stepup.spec.ts:394 | MF-9 | scratch | signInJobSuperAdmin,switchUser | 1 | - | G (pool too) |
| e2e/category-image-routes.spec.ts:103 | CI-2 | super_admin | - | 0 | - | R (staff route at aal1, if routes join Part 3) |
| e2e/category-image-routes.spec.ts:144 | CI-2b | super_admin | - | 0 | - | R (staff route at aal1, if routes join Part 3) |
| e2e/category-image-routes.spec.ts:160 | CI-4b | super_admin | - | 0 | admin_accept_category_image, admin_get_category_images, admin_set_category_images | S+R (staff doors and route at aal1) |
| e2e/category-image-routes.spec.ts:242 | CI-3 | super_admin | - | 0 | - | R (staff route at aal1, if routes join Part 3) |
| e2e/legal-certify.spec.ts:647 | LGC-3 | scratch | asPerson,signInJobSuperAdmin,signInViaSession | 1 | - | G (pool too) |
| e2e/admin-attributes-import.spec.ts:1191 | AT-23 | scratch | switchUser | 1 | - | G |
| e2e/ad-page-doors.spec.ts:917 | AP-28 | scratch | asPerson | 0 | admin_listing_reports, admin_open_report_counts | S |
| e2e/one-line-slots.spec.ts:99 | OLS-3 | admin | signIn | 0 | - | none (member page /) |
| e2e/admin-roles.spec.ts:133 | RP-1 | moderator,admin | switchUser | 2 | - | G |
| e2e/menu-rows.spec.ts:173 | ROWS-E2 | admin | signIn | 1 | - | G |
| e2e/admin-translations-console.spec.ts:102 | TR-1 | scratch | signInJobSuperAdmin,switchUser | 1 | - | G (pool too) |
| e2e/admin-translations-console.spec.ts:321 | TR-7b | scratch | signInJobSuperAdmin,switchUser | 1 | admin_sync_ui_keys | G (pool too) |
| e2e/admin-translations-console.spec.ts:375 | TR-9 | scratch | enrollAndStepUp,signInJobSuperAdmin | 1 | admin_translation_stats | none (the pool at aal2; its own enrolment is its subject) |
| e2e/admin-translations-console.spec.ts:890 | TR-scope | scratch | switchUser | 0 | - | R (/api/translate at aal1, if routes join Part 3) |
| e2e/i18n-coverage.spec.ts:209 | the | admin | signIn | 1 | - | G |
| e2e/i18n-coverage.spec.ts:230 | the | admin | signIn | 1 | - | G |
| e2e/import-security.spec.ts:797 | (untitled) | super_admin | signInJobSuperAdmin,switchUser | 1 | - | G (pool too) |
| e2e/admin-attributes-library.spec.ts:52 | AT-1 | admin | switchUser | 1 | - | G |
| e2e/admin-attributes-library.spec.ts:788 | AT-14 | scratch | switchUser | 1 | admin_delete_attribute, admin_link_attribute, admin_upsert_attribute | G |
| e2e/admin-locations.spec.ts:113 | LT-1 | admin | switchUser | 1 | - | G |
| e2e/admin-locations.spec.ts:516 | LT-6 | super_admin | enrollAndStepUp,switchUser | 1 | - | G |
| e2e/admin-locations.spec.ts:1330 | LT-17 | scratch | asPerson | 0 | admin_list_locations | S |
| e2e/admin-locations.spec.ts:1368 | LT-19 | scratch | asPerson | 0 | admin_list_locations | S |
| e2e/rbac.spec.ts:44 | R-8 | admin | signIn | 1 | - | G |
| e2e/photo-pipeline.spec.ts:630 | PP-13 | scratch | signInJobSuperAdmin,signInViaSession | 0 | - | none (the pool, then a seller) |
| e2e/one-line-slots-admin.spec.ts:76 | OLS-6 | super_admin | signIn | 0 | - | G (a hook signs a super admin in; admin paths) |
| e2e/one-line-slots-admin.spec.ts:80 | OLS-7 | super_admin | signIn | 0 | - | G (a hook signs a super admin in; admin paths) |
| e2e/one-line-slots-admin.spec.ts:84 | OLS-8 | super_admin | signIn | 0 | - | G (a hook signs a super admin in; admin paths) |
| e2e/one-line-slots-admin.spec.ts:88 | OLS-9 | super_admin | signIn | 0 | - | G (a hook signs a super admin in; admin paths) |
| e2e/one-line-slots-admin.spec.ts:92 | OLS-10 | super_admin | signIn | 0 | - | G (a hook signs a super admin in; admin paths) |
