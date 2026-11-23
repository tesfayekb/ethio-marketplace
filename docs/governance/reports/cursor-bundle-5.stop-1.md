STOP — cursor-bundle-5 STEP 1: the census and the plan (PLAN FIRST)
DONE: STEP 0 (branch, brief saved, roadmap line 3, briefs allowlist, check-go), STEP 1 (this census)
LEFT: STEPS 2 → 8 (Parts 1, 2, 3, 4; the gate; the push; the report)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `a14f032b6a5047ae0f5bd7e58e6a7b2fc64bec6e` (short `a14f032`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-23T10:53:05Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45159199801
FILES:
docs/governance/briefs/cursor-bundle-5.md
roadmap.md
docs/governance/reports/cursor-bundle-5.stop-1.md
scripts/conformance/briefs-allowlist.txt

# The census and the plan — read on the base

Base `a14f032b6` = `origin/dev` at the fetch (no file moved between them). Branch `cursor/bundle-5`, task-saved commit
`6b13e347f` (not pushed alone; this report rides with it). The brief was saved by `cp` from the carrier folder:
`112274e7f46705cc0d102b04633eea0395269584defaa2322bc91b7a9285d08b  docs/governance/briefs/cursor-bundle-5.md`, equal to
the carrier's value. CI on the base: SUCCESS on `a14f032b6` (both steps of the SHA check agree; lanes skipped, the tree proven
by run 45154868271); `guards-last-failure.md`: no failed job; `e2e-last-failure.md`: no lane ran; nothing red to fix first.

STEP 0's allowlist: `scripts/conformance/briefs-allowlist.txt` held five lines, all keyed to
`docs/governance/briefs/cursor-bundle-4-ruling-1.md:71` with `until INC-1260`; all five removed (none keyed to this brief).
`bunx vitest run scripts/conformance/briefs.test.ts`: 16 passed.

`bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-5.md --root .`:

```
[check-go] no finding
```

Lovable's lane: `origin/lovable/next` at `dace9272b` differs from the base in `.lovable/plan.md` only. Its plan (read as
data) is its bundle 7 (INC-1256): `categories-service.ts`, `category-images-service.ts`, `attributes-service.ts`,
`locations-service.ts`, `countries-service.ts`, `ai-service.ts`, `src/features/admin/nav-alerts.ts`,
`src/features/posting/use-price-unit-labels.ts`, their tests, and `src/lib/refusal.ts` only if its ruling (e) says so. No
file of this plan is among them; this plan does not edit `src/lib/refusal.ts`.

Vendor sources were read at the pinned versions, never from memory, into `/tmp/ethio-scratch/cursor-bundle-5/vendor/` (the
operator's to remove): the CLI `supabase/cli` tag `v2.120.0` (`.github/workflows/local-backend-proof.yml:13`
`SUPABASE_CLI_VERSION: 2.120.0`), whose `apps/cli-go/pkg/config/templates/Dockerfile` pins `supabase/gotrue:v2.197.0`; the
auth server `supabase/auth` tag `v2.197.0` (commit `4eee58f2`); the installed client `@supabase/auth-js` 2.110.9; Supabase's
docs pages "Email Templates", "Passwords", "Identity Linking"; the Management API's OpenAPI (`api.supabase.com/api/v1-json`).
Also in that folder: `build.log`, `budget.log` (the first-download table below).

## consumers

### Concern 1 — a credential changes only after the server's check

By definition (every call that sets a password or a sign-in method), `rg "updateUser\(|linkIdentity\(|unlinkIdentity\(|
remove_own_password|mfa\.(enroll|unenroll)\(" src --glob '!*.test.*'`:

| Call | Where | Server's own check today |
| --- | --- | --- |
| `updateUser({ password })` in `changePassword` | `src/features/auth/auth-service.ts:340` | none of its own unless `security_update_password_require_current_password` is on; the throwaway verifier `currentPasswordProof` (:367–388) runs first, in the browser |
| `updateUser({ password })` in `completePasswordReset` | `:579` | the recovery session (the server exempts it, OPEN (a)) |
| `linkIdentity({ provider: "google" })` in `linkGoogleIdentity` | `:294` | manual linking must be on (`requireManualLinkingEnabled`, OPEN (b)) |
| `unlinkIdentity(identity)` in `unlinkProviderIdentity` | `:316` | the same middleware; `single_identity_not_deletable` for the last one |
| `rpc("remove_own_password")` in `removeOwnPassword` | `:519` | `require_recent_password()` (DEC-242) on the verifier's fresh password session (`:515`) |
| `updateUser({ email })` in `changeEmail` | `:398` | double confirmation (`double_confirm_changes`) |
| `mfa.enroll`, `mfa.unenroll` | `src/features/auth/mfa/mfa-service.ts:309`, `:296`, `:362` | the server's own (a verified factor's unenrol needs aal2) |

No other caller in `src/`, no server route sets a password (`rg "admin\.updateUserById" src` empty). Test-only:
`e2e/helpers/users.ts:377`, `e2e/auth-signup.spec.ts:262`, `:326` (`admin.updateUserById`, the harness's service client).
Their caller `src/routes/settings.tsx`: `:305` unlink, `:340` link, `:361` change password, `:376` change e-mail, `:382`
sign out others (all as the brief says). The CI backend's auth settings: `scripts/ci/local-backend-config.toml` `[auth]`
(:38–45), `[auth.email]` (:47–50) — no `secure_password_change`, no `enable_manual_linking`, no notification table.

### Concern 2 — the person hears of every security change

- The three best-effort sign-outs of other devices that only write to the console: `auth-service.ts:345–346`
  (`changePassword`), `:522–523` (`removeOwnPassword`), `:583–584` (`completePasswordReset`). Their callers:
  `src/routes/settings.tsx:361`, `:322`, and `src/routes/auth_.reset.tsx` (the reset page — outside the routes SCOPE names;
  premises P6).
- The e-mail change's pending state: `settings.tsx:376` sets `settings.emailChangeSent` once; nothing reads `new_email` back
  (INC-1258). The page reads the session locally (`currentSession()`, `:213`), never `getUser()`.
- `scripts/ci/local-backend-config.toml` `[auth.email]`: no `notification` table, so no notice is sent on CI's backends.
- A second status reader on the page: `settings.tsx:216–222` reads `profiles.account_status` for the deactivation banner
  and drops its error (`profile.data?.account_status`) — INC-1264's class (findings 2).

### Concern 3 — a staff screen needs a second factor (DEC-434)

- Admin routes: 26 children of the layout `src/routes/admin.tsx` (every `src/routes/admin.*.tsx`: ai, attributes, audit,
  categories, countries, coverage, images, impersonation_.$sessionId, index, legal, legal_.$versionId, legal_.edit,
  listings, listings_.$listingId, listings_.$listingId_.edit, locations, monetisation, packages, places, roles,
  roles_.$roleId, screening, translations, translations_.$lang, users, users_.$userId), all drawn through `AdminGate`'s
  `<Outlet />` (`admin.tsx:113–115`).
- `AdminGate` (`admin.tsx:50–118`): `useShell()` (`:53`) → `usePermissions({ enabled: user !== null })` (`:54`); staff =
  `permissions.includes(ADMIN_PANEL_PERMISSION)` (`:71`; `"admin_panel:access"`, `src/features/permissions/service.ts:21`);
  the section's own permission (`:73`); not allowed → `navigate({ to: SIGN_OUT_LANDING })` (`:78–83`); pending →
  `t("admin.loading")` (`:96–106`). No factor or assurance read anywhere in it.
- The two-factor service `src/features/auth/mfa/mfa-service.ts`: `getAal()` `:221–225` answers `{ current: null, next: null }`
  on an error (not typed — findings 3); `listFactors()` `:272–284` typed (`MfaFailure`); `enrollTotp` `:306–321`;
  `stepUpWithCode` `:347–353`; `isStepUpFresh` `:242–255`. The step-up gate `step-up-gate.tsx:34–57` (render-prop `guard`,
  the dialog `step-up-dialog.tsx` loaded on demand). Setup lives on `/settings` (section 3, `settings.tsx:158`, `useMfa()`,
  `data-testid="mfa-enroll"` `:771`).
- `door_context` newest: `supabase/migrations/20261120100000_909988ad-e5cb-4942-9f99-4ec49d32a179.sql:64–130`. Classes
  `owner | staff | public | reader | staff-reader` (`:78`); `require_step_up_if_needed` only when `p_class <>
  'staff-reader'` (`:116–118`, comment "a staff reader owes its permission, never a second factor (a read changes
  nothing)"). `require_step_up_if_needed` newest: `20260817100845_ddd63395-….sql:26–89` (verified TOTP factor, `auth.jwt()
  ->> 'aal' = 'aal2'`, a `totp` row in `auth.mfa_amr_claims` within 10 minutes, only for permissions with
  `requires_step_up`).
- `door_context` callers with a staff class, from `scripts/doors/manifest.txt` (format at `:8–9`): 90 `staff`, 61
  `staff-reader` — 151 doors; each one's newest body is the manifest's (`check-doors` static agrees on the base). Staff
  table rules still standing (DOORS-19's static census, `scripts/doors/check-doors.test.ts:884–911`): four
  `storage.objects` rules that call `has_permission(` and never pass `door_context`.
- Specs and helpers that sign a staff account in:

| How | Where | Factor today | If the SCREEN needs a used factor | If the SERVER needs one |
| --- | --- | --- | --- | --- |
| the pool, `signInJobSuperAdmin` | `e2e/helpers/ui.ts:1061–1088` (40 spec files) | verified TOTP at setup (`e2e/global-setup.ts:299–412`), session minted at aal2 (`freshAal2Session`, `ui.ts:933–998`) | nothing | nothing |
| `@private-identity` `mintPrivateSuperAdmin` | `ui.ts:887–908` (1 file) | enrolled by the UI (`enrollAndStepUp`, `:711–728`) | nothing | nothing |
| scratch staff, `leaseUser()` + `grantScratchRole` | `e2e/helpers/users.ts:462`; 42 calls in 13 specs (admin-listings 14, admin-screening 7, my-listings-doors 4, legal-admin 4, admin-translations-console 2, admin-monetisation 2, admin-locations 2, admin-categories-lifecycle 2, my-listings-ad 1, admin-attributes-library 1, -import 1, -editor 1, ad-page-doors 1) | none | the 20 grants that include `["admin_panel", "access"]` (8 specs: admin-listings 8, legal-admin 4, admin-categories-lifecycle 2, admin-monetisation 2, admin-attributes-editor 1, -import 1, -library 1, admin-screening 1) need a TOTP enrolled in node and an aal2 session | all 42, and the SC-* tests that use a reviewer without a factor on purpose (`admin-screening.spec.ts:297–312`) change premise |
| a pooled admin at aal1 by password | `e2e/legal-doors.spec.ts:296`, `:719`, `:1284` (`asPerson(pooledSuperAdminCredentials())`) | the pool's | none (API only) | change premise |
| a fresh `super_admin` without a factor | `e2e/door-refusals.spec.ts:153–156` | none | none (API only) | change premise |

  Spec files that visit `/admin`: 41 (`rg -l '"/admin' e2e/*.spec.ts`).

### Concern 4 — one session store

`rg -n "useAuth\(" src --glob '!*.test.*'`: ten callers — the shell (`src/components/app-shell.tsx:138`) and the nine the
brief names, each at the brief's line (`settings.tsx:133`, `l.$slug.tsx:134`, `account-overview.tsx:72`,
`my-legal-version.tsx:16`, `my-legal-page.tsx:24`, `admin-listings/listings-page.tsx:122`, `listing-page.tsx:139`,
`posting/wizard.tsx:219`, `admin/users/user-detail.tsx:47`). Each reads only `user` (and `loading` in settings, l.$slug and
the wizard). `ShellValue` carries `user` and `authLoading` (`app-shell.tsx:921–923`), not `hadSession` or `signOut`
(the shell's own effects keep those, `:865–887`; sign-out is `requestSignOut`). Every caller renders under `<AppShell>`
(`src/routes/__root.tsx:457–462`), so `useShell()` is available to all nine.

The status read: `src/features/auth/use-auth.ts:80–91` — `getSupabase().then(s => s.from("profiles").select("display_name,
account_status").eq("user_id", userId).maybeSingle())`, only `{ data }` destructured, the error dropped; a client that
did not load resolves `{ data: null }`. It runs from the auth listener (`:122–127`, synchronously inside
`onAuthStateChange`'s callback, `src/lib/supabase-door.ts:188`) and after `currentSession()` (`:129–139`).

Outside the brief's list: `src/i18n/provider.tsx:251–278` (`useAuthIdentity`) subscribes to `onAuthChange` on its own; it
wraps `<AppShell>`, so it cannot read the shell (K2).

### Concern 5 — the tests-and-CI queue

- INC-1260: `scripts/brief/go-laws.ts:103–109` `scopeOf` takes the first paragraph opening `^SCOPE\b`;
  `recordScopeFindings` (`:393–424`) judges each file alone (`scripts/conformance/briefs.test.ts:105–112` loops brief and
  rulings), so a ruling's own `SCOPE…` paragraph replaces its brief's. Ruling 2 of bundle 4 (`cursor-bundle-4-ruling-2.md:6`,
  `:42`) moved widenings to the heading "THE BRIEF'S SCOPE GROWS BY", which no law reads yet. Callers: `briefs.test.ts`,
  `scripts/brief/check-go.ts:920`.
- INC-1262: `scripts/public-surface.ts:66–72` reads `grant … to …` statements and nothing else; a `REVOKE` after it in the
  same file is never read (drops are honoured, `:49–58`). Its self-test: `scripts/check-migrations.sh:642–707` with
  `scripts/fixtures/bad-public-grant*.sql`; its unit test `scripts/public-surface.test.ts`; the live lint
  `scripts/security-lints.ts:224` reads the same allowlist.
- INC-1261: `SelectList` (`src/components/select-list.tsx`, body `select-list-body.tsx`): trigger `data-testid={testId}`
  (`select-list.tsx:154`), list `{testId}-list` (`select-list-body.tsx:160`), search box `{testId}-search` only above
  `SEARCH_FROM = 8` options (`:35`, `:57`), each option `{testId}-{value}` (`:189`). Consumers: `FilterSelect` in
  `filter-panel-body.tsx:36–53` (test id = the filter's id), `FieldSelect` in `category-form-fields.tsx:373`,
  `category-dialogs.tsx:607`, `language-picker.tsx:36`, `translator-card.tsx:112`, `languages-page.tsx:1023`. How specs
  choose today (premises P5): `chooseFilter` (`e2e/helpers/filters.ts:28–49`) presses `<filter>` and then `<filter>-<value>`
  when the choice is not in view; the five form selects are pressed by hand, trigger then option —
  `admin-translations-console.spec.ts:967–968`, `:974–975`, `admin-categories-console.spec.ts:342–343`,
  `admin-categories-lifecycle.spec.ts:749–750`. No spec fills a `SelectList`'s `-search` box (every `-search` fill in e2e
  is a toolbar find, a searchable picker or a plain input).
- ACT-032: DOORS-19's static half judges `declaredRoleRules(ROOT)` from migrations (`scripts/doors/check-doors.test.ts:884–911`,
  `scripts/doors/staff-rules.ts:4–22`, `staff-rules.txt`); `check-doors --live` (`scripts/doors/check-doors.ts:639–652`) reads
  `pg_proc` (`live-query.sql:8–18`) and the open-rule grants, never `pg_policies`. The smoke lane's step:
  `.github/workflows/local-backend-proof.yml:685–695` (`docker exec "$DATABASE_CONTAINER" psql …` into TSV files, then
  `bun scripts/doors/check-doors.ts --live …`).

### Concern 6 — two app laws

- INC-1140: `src/components/marketplace/feed.tsx:206` `onRetry={() => window.location.reload()}` (the category-failed
  view); `refreshPage` is `src/lib/on-demand-failure.ts:59–61`. CF-STALE-1's own list
  (`scripts/conformance/stale-reload.test.ts:65–69`) names `feed.tsx`, `error-page.ts`, `on-demand-failure.ts`; its
  allowlist line `scripts/conformance/stale-reload-allowlist.txt:4` is keyed `INC-1140`. The feed has no unit test file;
  `e2e/feed-screens.spec.ts:395–400` presses `feed-retry` (the other path, `:214`).
- INC-1141: `collectUi` / `collectEntities` (`src/features/admin/translations/ai-bulk-bar.tsx:120–167`) page by `offset +=
  rows.length` until `offset >= totalCount`, `AI_CHUNK_SIZE = 100` (`translations-service.ts:532`), through
  `listTranslations` → `admin_list_translations` (`translations-service.ts:201–210`) and `listEntityTranslations` →
  `admin_list_entity_translations` (`:709–715`). Both doors' newest bodies:
  `20261114114500_fedfce7d-18b0-409e-9ba2-d7f465ce3d2b.sql:40–86` (`ORDER BY f.key`, `LIMIT/OFFSET`) and `:196–250`
  (`ORDER BY f.etype, f.elabel, f.eid` — not a total order, findings 8). Other callers: `src/routes/api/translate.ts:225`
  (flag read-back), `translate.route.test.ts:60` (mock), `e2e/admin-translations-data.spec.ts:800–807`, `:841–847` (the
  RPC by named arguments). The existing keyset form in the same family: `admin_export_translations(p_lang, p_after text,
  p_limit)` (`:162–190`, `t.key > p_after`, INC-568).

### Concern 7 — two dialog laws

- `PanelFooter` (`src/components/ui/dialog-parts.tsx:187–190`) and its three `footer` hosts: `CategoryModal`
  (`category-modal.tsx:81`, about 30 `footer=` callers), `ToolbarPanel` (`toolbar-panel.tsx:76–78`), `PreviewSheet`
  (`preview-sheet.tsx:69`). Every direct `PanelFooter` (24 production sites) holds buttons, `AlertDialogAction/Cancel`,
  `DialogClose`, `ClosedPrimary` or an action-styled `Link` — except the gallery viewer: `photo-gallery.tsx:442–460`
  (`<Thumbs/>` and `<StripArrows/>`, a thumbnail strip). `ClosedPrimary` (`dialog-parts.tsx:274–311`) may add its own
  missing-choice line beside the primary (`map-pin-dropper.tsx:590–621`, `dev.style.tsx:667–682`) — question 12.
- Switches: the product Switch is Radix (`src/components/ui/switch.tsx:2`, `:10–22`), its seven importers
  (`filter-panel-body.tsx:77`, `columns-button.tsx:132`, `settings.tsx:1067`, `listing-settings.tsx:187`,
  `step-review.tsx:779`, `languages-page.tsx:503`, `:558`, `:1013`). No `role="switch"`, no `@radix-ui/react-switch` import
  and no hand-drawn knob anywhere else in `src/` outside tests (`filter-row.test.tsx:20`'s test double is a test).
  `aria-pressed` toggles (`step-pricing.tsx:418`, `listing-detail.tsx:926`, `filter-choices.tsx:52`,
  `legal-editor-form.tsx:169`, `password-input.tsx:25`, …) are segmented choices or buttons, not on/off switches.
- The guard: `scripts/conformance/dialogs.test.ts` (TypeScript AST, DG-1 → DG-11), allowlist
  `scripts/conformance/dialogs-allowlist.txt` (`file#rule | reason | until`, comment lines only today).

### Concern 8 — the records exception (DEC-432)

`scripts/ci/lovable-branch-guard.sh` `rule_for` (`:76–96`) refuses `roadmap.md`, `docs/tracking/*`,
`docs/governance/mechanisms.md`, `docs/_changelog.md`, `docs/spec/*`. Exceptions: DEC-390 (`:262–268`), DEC-396
(`:247–261`), DEC-398 (patchless, `:99–115`, `:285–297`), DEC-425 (`:148–229`). Input: the pull request's files from
`gh api …/pulls/<n>/files` on stdin (`.github/workflows/lovable-branch-guard.yml:44`); the body is not read today; the
job runs on `pull_request_target` from the base with `GH_TOKEN`, `REPO`, `PR_NUMBER`, `PR_BASE_SHA`, `PR_HEAD_SHA` (`:36–41`),
`pull-requests: read`. Tests: `scripts/ci/lovable-branch-guard.test.ts` (planted JSON pages; temp git remote for DEC-398).

## definition

- Concern 1, by what a call does (above): six calls set a password or a sign-in method, two more enrol or remove a second
  factor; signing up (`auth-service.ts:74`) creates an account and is not a change.
- Concern 7, by what a child does: actions = `Button`, `AlertDialogAction`, `AlertDialogCancel`, `DialogClose`,
  `ClosedPrimary`, `DialogActions` and an action-styled `Link`, alone or in a fragment or a conditional; content = anything
  else (an image, a list, a strip, text outside a button). By that reading DG-12 refuses one site today
  (`photo-gallery.tsx:442–460`, the named exception) and DG-13 refuses none.

## tests

- Concern 1/2: `src/features/auth/auth-client.test.ts` (names `linkGoogleIdentity`, `unlinkProviderIdentity` at `:49–50`,
  `:76`), `auth-error-key.test.ts`, `src/test/settings-messages.test.tsx` (mocks the service, `:22–23`, `:59–70`, and
  `useAuth`, `:40–42`), `e2e/settings.spec.ts` S-1 → S-4 (S-2 asserts the disabled Unlink button `:67–70`; S-3 already
  proves a wrong current password refused and the session intact, `:108–120`), `e2e/shell.spec.ts:4493`
  (`#current-password` visible), `e2e/auth-reset.spec.ts`.
- Concern 3: `src/routes/admin.tsx` has no unit test; `e2e/mfa-stepup.spec.ts`, every `/admin` spec (41).
- Concern 4: `src/features/auth/use-auth.test.tsx`; the second readers below; each moved caller's own specs (settings,
  ad page `e2e/ad-page*.spec.ts`, account, my-legal, admin-listings, posting, admin-users).
- Concern 6: `scripts/conformance/stale-reload.test.ts`; `e2e/feed-screens.spec.ts:395–400`;
  `src/features/admin/translations/ai-bulk-bar.test.tsx` (counts only); `e2e/admin-translations-console.spec.ts:565+`
  (TR-12), `e2e/admin-translations-data.spec.ts:351–505`.

## lists

- `scripts/doors/manifest.txt:68` and `:76` — the two list doors' argument types change (Part 2).
- `scripts/public-surface-allowlist.txt` — no line changes (no new browser grant; Part 2 restates the doors' grants).
- `scripts/conformance/briefs-allowlist.txt` — 5 → 0 (STEP 0).
- `scripts/conformance/dialogs-allowlist.txt` — 0 → 1 (`src/components/listing/photo-gallery.tsx#DG-12`).
- `scripts/conformance/stale-reload-allowlist.txt` — 1 → 0; CF-STALE-1's `toEqual` (`stale-reload.test.ts:65–69`) loses
  `src/components/marketplace/feed.tsx`.
- `scripts/conformance/session-reads-allowlist.txt` (CF-SESSION-3) — one line (`auth-service.ts currentPasswordProof |
  … | DEC-274`); a `getUser()` for `new_email` needs a new line with its DEC (question 5).
- `scripts/conformance/e2e-helpers.test.ts:89` — CF-HELPERS-1's names gain the select helper's name.
- `scripts/conformance/wired.test.ts` — every new guard file's caller; no new script file is planned (the new laws join
  existing test files), so no new line unless the ruling places one.
- E2E selector groups: the spec areas of a changed spec are its own; the migration's `-- e2e-areas:` line names
  `admin-translations`.
- Exact-list assertions a new name joins or leaves: CF-STALE-1's (above); `src/features/auth/auth-error-key.test.ts:100`'s
  table (the new provider codes join); `auth-client.test.ts:49–50` (the removed exports leave). `rg "toEqual\(\[" -g
  '*admin_list_*'` and the two door names across `e2e/` and `src/**/*.test.ts`: no exact list of their arguments.

## old-file-readers

`linkGoogleIdentity` / `linkIdentity`: `auth-service.ts:291–300`, `settings.tsx:25–28`, `:336–346`, `:609–617` (the button,
no test id — role and the key `settings.linkGoogle`), `auth-client.test.ts:49–50`, `settings-messages.test.tsx:22–23`;
`settings.linkGoogle` in `en-member.ts:33`, `am-member.ts:35` and both i18n usage maps (`:8597`);
`docs/features/settings-surface.md` (the `linkIdentity` notes). `useAuth()` by text: `deactivated.ts:6` (a comment),
`docs/features/admin-users.md`, `admin-shell.md`, `auth-email-door.md`; no guard names it (`rg useAuth scripts` empty).

## second-readers

`vi.mock("@/features/auth/use-auth")`: `src/features/admin-listings/listings-page.test.tsx:22`,
`src/test/settings-messages.test.tsx:40–42`, `src/features/admin/users/staff-form-gates.test.tsx:29` — each re-points to
`@/components/shell-context`. `vi.mock(…auth-service)`: `settings-messages.test.tsx:59–70`, `src/routes/auth-forms.test.tsx:37–41`.
Dynamic imports: `use-auth.test.tsx:18`, `auth-client.test.ts:36`. `vi.mock("@/components/shell-context")` already in four
files (`legal-accept-screen.test.tsx:16`, `breadcrumbs.test.tsx:40`, `rail-first-paint.test.tsx:36`,
`location-selector-order.test.tsx:48`).

## chunk-graph

- `useShell()` in the nine: `use-auth.ts` stays in the shell's code (`app-shell.tsx`), so no chunk gains or loses a module;
  each caller's chunk loses one import edge. Measured after the change, page by page.
- The admin gate's factor read: `mfa-service` is its own chunk (`mfa-service-B_JjBPnu.js`, 1,624 bytes gzipped), importing
  the client chunk and the refusal reader; the layout `admin-BT7XXUAj.js` (2,393 bytes gzipped) does not import it today.
  A static import would grow every `/admin` page and cross `/admin`'s ceiling (206.2 / 207). The plan loads it with
  `loadOnce` inside the gate (only after the permissions say staff): the layout grows by the loader only, and nothing
  reaches a member page.

## environments

`scripts/ci/local-backend-config.toml` is read by CI's temporary backends (`local-backend-proof.yml`, copied whole by
`scripts/ci/prepare-local-backend.sh`; its text is part of the backend image cache key, `local-backend-proof.yml:42`, so
a change costs one image-cache miss) and by `bun run db:proof` (`scripts/db-proof.sh:30`). Per setting, at CLI 2.120.0:

| Setting | What it does there | Mapped by the CLI? |
| --- | --- | --- |
| `[auth] enable_manual_linking = false` | `GOTRUE_SECURITY_MANUAL_LINKING_ENABLED=false` (`gotrue.service.ts:396`); already the CLI's default (`config.toml` template `:182`), so CI runs with it off today | yes |
| `[auth.email.notification.<kind>] enabled = true` | `GOTRUE_MAILER_NOTIFICATIONS_<KIND>_ENABLED=true` (`gotrue.service.ts:470–474`); the server's default template unless `content_path` is set; Mailpit (`[inbucket]`) catches them | yes, for `password_changed`, `email_changed`, `phone_changed`, `identity_linked`, `identity_unlinked`, `mfa_factor_enrolled`, `mfa_factor_unenrolled` (`auth.go:756–810`) |
| `content_path` of a notice | read relative to `<workdir>/supabase/` (`config.go:968`), so the files would have to be copied there by `prepare-local-backend.sh` | yes |
| the current-password requirement | — | NO: the env builder sets `GOTRUE_SECURITY_UPDATE_PASSWORD_REQUIRE_REAUTHENTICATION` from `secure_password_change` (`gotrue.service.ts:397–399`) and nothing sets `…REQUIRE_CURRENT_PASSWORD`; the config struct has no key for it (`auth.go:159` manual linking, `:246` `secure_password_change`, the only password key) |

## mechanisms

- The server's password check (`supabase/auth` v2.197.0 `internal/api/user.go:152–196`): with
  `UpdatePasswordRequireCurrentPassword` (`internal/conf/configuration.go:906`), when the user already has a password and the
  session is not a recovery session, a missing `current_password` answers `current_password_required` and a wrong one
  `current_password_invalid` (`internal/api/apierrors/errorcode.go:75–76`), before anything is written. With the setting off
  the field is read and ignored. The client sends it as `UserAttributes.current_password`
  (`node_modules/@supabase/auth-js/dist/module/lib/types.d.ts:385`; docs "Passwords" § Verifying the current password,
  supabase-js 2.102.0+).
- Notices (`internal/conf/configuration.go:543–550`, all default false): password changed (`user.go:231`), email changed,
  phone changed, identity linked (`identity.go:229`, manual linking only), identity unlinked (`identity.go:98`), factor
  enrolled, factor unenrolled. A notice the server cannot send is logged and does not fail the change (`user.go:232–235`).
- Manual linking and unlinking: `internal/api/api.go:285–288` puts BOTH `GET /user/identities/authorize` (link) and
  `DELETE /user/identities/{id}` (unlink) behind `requireManualLinkingEnabled`, which answers 404
  `manual_linking_disabled`. Automatic linking (`internal/models/linking.go:63`
  `DetermineAccountLinking`, verified e-mail) reads no manual-linking setting; its `LinkAccount` branch
  (`internal/api/external.go:319–338`) writes an audit row and sends no notice.
- `getAal` and the step-up gate, `door_context`, `require_step_up_if_needed`: above (concern 3).
- `useShell`: `src/components/shell-context.ts:71–74` (throws outside the shell).
- `refreshPage`: `src/lib/on-demand-failure.ts:59–61`.
- The list doors' ordering and matching lines: above (concern 6).
- The branch guard's exception form: above (concern 8).
- The auth refusal reader: `src/features/auth/auth-error-key.ts:48–74` (`AUTH_REFUSALS`, read by `readRefusal`); it has no
  word for `current_password_invalid`, `current_password_required`, `same_password`, `reauthentication_needed` or
  `manual_linking_disabled` (findings 4).

## first-download

My lock-exact build on the base (`bun install --frozen-lockfile`, `bun run build`, `node scripts/check-bundle-size.mjs`:
"Bundle budget OK."; entry JS 201.6 / 203, CSS 22.7 / 24). The pages the plan touches, with their room to the NEAR band
(ceiling − size − 0.3):

| Page | Size / ceiling (KiB) | Room to NEAR | Why touched |
| --- | --- | --- | --- |
| `/settings` | 277.2 / 278 | 0.5 | Part 4 |
| `/l/$slug` | 248.5 / 250 | 1.2 | `useShell` |
| `/account` | 264.0 / 265 | 0.7 | `useShell` |
| `/account_/legal` | 204.1 / 205 | 0.6 | `useShell` |
| `/account_/legal_/$versionId` | 204.8 / 206 | 0.9 | `useShell` |
| `/post`, `/post_/$listingId` | 402.1 / 403 | 0.6 | `useShell` (wizard) |
| `/my-listings_/$listingId_/edit` | 402.2 / 403 | 0.5 | wizard |
| `/admin/listings_/$listingId_/edit` | 410.5 / 411 | 0.2 | wizard + the gate |
| `/`, `/c/$slug` | 223.1 / 224 | 0.6 | the feed's retry |
| `/$name` | 221.1 / 222 | 0.6 | the feed |
| `/admin` | 206.2 / 207 | 0.5 | the gate |
| `/admin/` | 207.1 / 208 | 0.6 | the gate |
| `/admin/ai` | 303.8 / 305 | 0.9 | the gate |
| `/admin/attributes` | 317.7 / 319 | 1.0 | the gate |
| `/admin/audit` | 291.3 / 293 | 1.4 | the gate |
| `/admin/categories` | 352.4 / 353 | 0.3 | the gate |
| `/admin/countries` | 308.6 / 309 | 0.1 | the gate |
| `/admin/images` | 206.9 / 208 | 0.8 | the gate |
| `/admin/impersonation_/$sessionId` | 235.0 / 236 | 0.7 | the gate |
| `/admin/legal` | 283.8 / 285 | 0.9 | the gate |
| `/admin/legal_/$versionId` | 280.0 / 281 | 0.7 | the gate |
| `/admin/legal_/edit` | 283.7 / 285 | 1.0 | the gate |
| `/admin/listings` | 328.9 / 330 | 0.8 | the gate + `useShell` |
| `/admin/listings_/$listingId` | 329.9 / 331 | 0.8 | the gate + `useShell` |
| `/admin/locations` | 268.6 / 270 | 1.1 | the gate |
| `/admin/monetisation` | 313.2 / 315 | 1.5 | the gate |
| `/admin/places` | 310.6 / 312 | 1.1 | the gate |
| `/admin/roles` | 294.0 / 296 | 1.7 | the gate |
| `/admin/roles_/$roleId` | 274.4 / 275 | 0.3 | the gate |
| `/admin/screening` | 349.0 / 350 | 0.7 | the gate |
| `/admin/translations` | 308.4 / 309 | 0.3 | the gate + the collectors |
| `/admin/translations_/$lang` | 310.0 / 311 | 0.7 | the gate + the collectors |
| `/admin/users` | 292.0 / 293 | 0.7 | the gate |
| `/admin/users_/$userId` | 291.0 / 292 | 0.7 | the gate + `useShell` |

The admin layout is on every `/admin` page, so the gate moves all of them; `/admin/countries`, `/admin/categories`,
`/admin/roles_/$roleId`, `/admin/translations` and `/admin/listings_/$listingId_/edit` have 0.3 KiB or less before the band,
and their ceilings will move by DEC-296's form in the part that causes it, each with its cause.

## premises

- P1 — "CI's backend turns on the same settings the hosted projects will have, so CI proves them": not for the current
  password. CLI 2.120.0 cannot set `GOTRUE_SECURITY_UPDATE_PASSWORD_REQUIRE_CURRENT_PASSWORD` (environments). With the
  browser's verifier removed, CI's backend would accept any current password and ACS-E1 (and S-3) would fail there.
- P2 — "the throwaway verifier stays only where the server has no check of its own" + "a server that does not yet require
  the field must still work": until the operator sets the hosted key, the server has no check of its own on ANY password
  change; removing the verifier at Publish leaves a window in which nothing checks the current password (question 1).
- P3 — "what happens to unlinking under manual linking off is read from the vendor": the vendor refuses unlinking too
  (`api.go:285–288`); the Settings "Unlink" control stops working the day the key is off (question 2). Automatic linking of
  a same-e-mail Google sign-in still happens, without a notice.
- P4 — "the person hears of every change": automatic linking sends no notice (`external.go:319–338`); with manual linking
  off it is the only way a sign-in method is added (findings 6).
- P5 — INC-1261 ("specs type into a search box that shows only above eight options"; "no shared step chooses in a select
  list"): at the base no spec types into a `SelectList`'s search box, and `chooseFilter` already chooses a filter's list by
  value whether or not the box shows; what is missing is the shared step for the five form selects (question 10). "By the
  option's name" would anchor on words; J5 anchors on structure (the option's `{list}-{value}` test id).
- P6 — SCOPE: INC-1262's files are `scripts/public-surface.ts`, `scripts/public-surface.test.ts`, `scripts/check-migrations.sh`
  (its self-test) and a planted fixture under `scripts/fixtures/` — at the `scripts/` root, which the brief grants only for
  page ceilings; the reset page `src/routes/auth_.reset.tsx` (the third failed sign-out's caller) is not among the routes
  SCOPE names (questions 6, 7).
- P7 — a notice in the person's language: the templates are Go templates fed `.Data` = `user_metadata` (subject and body,
  `internal/mailer/templatemailer/templatemailer.go:216`, `"Data": user.UserMetaData`; docs "Email Templates" § Terminology, § Customization), so one
  template can branch on a metadata field; but the app writes no current language there — only `legal_accept.language` at
  sign-up (`auth-service.ts:82–88`) (question 4).
- P8 — `getUser()` for `new_email`: CF-SESSION-3 refuses `.auth.getUser()` in browser code outside its allowlist
  (`scripts/conformance/session-reads.test.ts:107`, `:125`) (question 5).
- P9 — concern 3's server half: the harness cannot carry it inside this bundle (the table above: 42 scratch-staff grants in
  13 specs, the aal1 tokens of `legal-doors.spec.ts` and `door-refusals.spec.ts`, the SC-* tests whose subject is a reviewer
  without a factor), and the four staff storage rules never pass `door_context`, so the class alone would not close it
  (question 8).
- P10 — the brief's "Sign out other devices": the action's label is `settings.signOutOthers` = "Sign out others"
  (`en-member.ts:49`); the plan names it by its key.

OPEN, from the vendor:
- (a) Yes: with the setting on, a recovery session sets a password without `current_password` (`user.go:175`
  `if !session.IsRecovery()`). The server's reading of "recovery" has a second half that bears on this concern; it is
  given to the supervisor in the chat only (rule 50, the public repository).
- (b) Unlinking stops (404 `manual_linking_disabled`); automatic linking of a same-e-mail Google sign-in still happens
  (`linking.go:63`, docs "Identity Linking" § Automatic linking).
- (c) `[auth.email.notification.<kind>]` with `enabled`, `subject`, `content_path` for the seven kinds above; template files
  relative to the `supabase/` folder; `content` inline is refused ("please use content_path instead", `config.go:1369`).
- (d) A template can read a metadata field and send one language (`{{ if eq .Data.<field> … }}`), subject included; no
  field holds the person's language today.
- (e) Yes: the token's `aal` is `auth.jwt() ->> 'aal'`, already read by `require_step_up_if_needed`
  (`20260817100845_…:65–69`), and the session's factor use is `auth.mfa_amr_claims` by the token's `session_id` (`:77–88`).

## callee-codes

The two list doors (Part 2). Every refusal: `door_context`'s `notSignedIn`, `accountDeactivated`, `permissionDenied`
(`20261120100000_…:100–115`; no step-up for `staff-reader`, no dial); new: `badValue` with field `after` for a malformed key
(the entity door's key is a four-part record). Callers and what each does:
- `listTranslations` / `listEntityTranslations` (`translations-service.ts:201`, `:709`) → the strings and data pages
  (their readers' error states, through the one reader) and the bulk collectors (a page that fails stops the collection
  with its typed failure; the bar shows its failure).
- `src/routes/api/translate.ts:225` (flag read-back) passes no `after`: unchanged answers.
- `e2e/admin-translations-data.spec.ts:800–807`, `:841–847` (named arguments, no `after`): unchanged.
`door_context` is not changed by this plan (question 8).

## findings

1. `src/features/auth/use-auth.ts:122–127` — the auth listener calls `applyUser`, and through it Supabase (`:80–86`),
   synchronously inside `onAuthStateChange`'s callback; the runtime-stability law says an auth-state callback never calls
   Supabase without a macrotask hop. A plausible cause of INC-1264's session-less reads (a hypothesis, not proven).
2. `src/routes/settings.tsx:216–222` — a second account-status read that drops its error (INC-1264's class).
3. `src/features/auth/mfa/mfa-service.ts:221–225` — `getAal` answers "no level" for a failed read (a success-shaped
   absence); the gate needs a typed failure.
4. `src/features/auth/auth-error-key.ts:48–60` — five provider codes this concern meets have no word and read generic.
5. `scripts/ci/local-backend-config.toml` sets no `enable_manual_linking`, so CI has run with manual linking off (the CLI's
   default); no test presses Link Google (S-2 asserts Unlink only).
6. `supabase/auth` `internal/api/external.go:319–338` — an automatic link sends no notice (vendor).
7. `20261120100000_…:116–118` — a staff reader never needs a second factor, and the staff storage rules never pass
   `door_context` (concern 3's server half).
8. `20261114114500_…:247` — `admin_list_entity_translations` orders by `(etype, elabel, eid)`; an attribute's label row
   and its option rows can tie there (same `eid`, different `efield`), so even its offset pages are not stable.
9. `src/i18n/provider.tsx:251–278` — its own auth subscription beside the shell's (K2, outside SCOPE).
10. INC-564 → INC-567: their content is withheld by design (`docs/tracking/incidental-findings.md:3802–3804`, G51); this
    census cannot say which of Part 4's items closes which; the closure lines wait for the supervisor's word.

## queued

`rg "cursor-bundle-5|account security|account-security|ACT-020|INC-1247|INC-1258|INC-1260|INC-1261|INC-1262|ACT-032|INC-1140|INC-1141|DEC-432"`
across `docs/governance/briefs`, `docs/governance/reports`, `docs/features`, `roadmap.md`:

| Item | Where queued | Here |
| --- | --- | --- |
| INC-1260 | `cursor-bundle-4-ruling-2.md:6`, `:46`; `cursor-bundle-4.report.md:155` | built, Part 1 |
| INC-1262 | `cursor-bundle-4-ruling-3.md:37`, `:57`; `cursor-bundle-4.report.md:239` | built, Part 1, if question 7 widens SCOPE |
| ACT-032 | `cursor-bundle-4.report.md:223`; `docs/features/doors.md:332` | built, Part 1 |
| INC-1140 | `app-fixes-ruling-1.md:51`; `app-fixes.report.md:231`, `:356`; `roadmap.md:92` | built, Part 1 |
| INC-1141 | `app-fixes-ruling-1.md:52`; `app-fixes.report.md:233`, `:358`; `roadmap.md:93` | built, Parts 2 and 3 |
| INC-1142, INC-1144, INC-1145 (`roadmap.md:93`) | the same line | left (INC-1142 under its dated exception; the others not in this brief) |
| INC-1258 | `cursor-bundle-4-ruling-1.md:58` | built, Part 4 |
| ACT-020, the account-security phase | `roadmap.md:86`, `:474`; `cursor-bundle-4.md:35`; `forms.md:252` | Part 4 is its next piece; INC-1147 classes 2 and 3 (`forms.md:252`) stay with the phase |
| INC-1247, INC-1261, INC-1264, DEC-432 | this brief only (not yet in the ledgers) | built, Parts 1 and 4 |

## cell-meaning

- `admin_list_translations` / `admin_list_entity_translations`: no dial (manifest `-`, a `staff-reader` spends none). Honest
  use by one staff member in an hour: one page per view or filter change on the strings and data pages (tens), and one
  bulk run of ⌈untranslated ÷ 100⌉ pages (2,000 untranslated strings: 20 calls). Country cell `global` for both: the rows
  they read (`ui_translations`, `entity_translations` over categories, locations, attributes) name no country.

# THE PLAN

Each part: its tests, `bun run typecheck`, `bun run lint`, the touched unit tests, the laws; one commit an item.

## Part 1 — STEP 2 (no database)

1. INC-1260 — `scripts/brief/go-laws.ts`: `recordScopeFindings` takes the brief's SCOPE joined with the ruling's widening
   (its "THE BRIEF'S SCOPE GROWS BY" paragraph, and a paragraph opening `SCOPE` read as a widening, never a replacement);
   `scripts/conformance/briefs.test.ts` and `scripts/brief/check-go.ts` pass the brief's text with each ruling. Planted:
   a ruling that widens by "GROWS BY" and names a RECORDS id in a file the brief grants → no finding; the same id in a file
   neither grants → the finding.
2. INC-1262 (question 7) — `scripts/public-surface.ts` reads `GRANT` and `REVOKE` in the file's statement order (a later
   `REVOKE … FROM anon/authenticated/PUBLIC` closes the earlier grant); `scripts/public-surface.test.ts` planted: GRANT
   then REVOKE → closed; REVOKE then GRANT → open; a fixture `scripts/fixtures/public-grant-revoked-example.sql` for
   `check-migrations.sh`'s self-test.
3. INC-1261 (question 10) — `e2e/helpers/filters.ts` gains `chooseInList(page, list, value)`: presses `{list}` when
   `{list}-list` is not open, presses `{list}-{value}`, and for a single choice expects the list closed; `chooseFilter`'s
   step 2 calls it; the five hand-written sites move onto it; CF-HELPERS-1's names gain it. Planted (browser): a list of
   seven and one of nine options (the search box absent and present), on screens question 10 names.
4. ACT-032 — `scripts/doors/check-doors.ts --live-staff-rules-query` prints the `pg_policies` read; `--live` takes its TSV
   and judges it by `scripts/doors/staff-rules.ts` against `staff-rules.txt`; `check-doors.test.ts` planted (a live rule
   not declared, a declared rule gone); one smoke-lane step in `.github/workflows/local-backend-proof.yml` (the query, the
   `docker exec … psql`, the TSV to `--live`).
5. INC-1140 — `feed.tsx:206` calls `refreshPage`; CF-STALE-1's list loses `feed.tsx`; the allowlist line goes;
   FD-U1 (new, `src/components/marketplace/feed.test.tsx`): the category-failed retry calls `refreshPage`.
6. DG-12 and DG-13 — `scripts/conformance/dialogs.test.ts` (the kit's census, planted both ways); allowlist line
   `src/components/listing/photo-gallery.tsx#DG-12 | the gallery's thumbnail strip is the viewer's own navigation, drawn
   in its footer band | <the ruling's until>`.
7. DEC-432 — `scripts/ci/lovable-branch-guard.sh`: when the body (read at run time, `gh api repos/$REPO/pulls/$PR_NUMBER
   --jq .body`) carries the line `Records list: <path> sha256 <64 hex>`, the list at `<path>` in the head (lines
   `<64 hex>  <ledger path>`) must hash to that value, and each changed ledger path is admitted only when its head content
   hashes to its line; anything else is refused as today; a list that cannot be read is a refusal.
   `scripts/ci/lovable-branch-guard.test.ts` planted: equal → pass; one byte off → fail; the list's sha256 differs → fail;
   a ledger path missing from the list → fail; no body line → the old refusal. The list's place: question 11.

## Part 2 — STEP 3 (the database half; a MIGRATION STOP)

One file, `supabase/migrations/<stamp>_<uuid>.sql` (`-- e2e-areas: admin-translations`), from the live definitions the
supervisor hands over:
- `admin_list_translations(p_lang, p_status, p_flagged, p_search, p_limit, p_offset, p_orphaned, p_after text DEFAULT NULL)`
  — DROP + CREATE (the argument list changes), `AND (p_after IS NULL OR f.key > p_after)`, order unchanged, REVOKE and
  GRANTs restated.
- `admin_list_entity_translations(p_lang, p_status, p_search, p_limit, p_offset, p_after jsonb DEFAULT NULL)` — DROP + CREATE;
  `p_after` = `{etype, elabel, eid, efield}` (malformed → `door_refuse('badValue', 'after')`); order gains `efield` as the
  last tie-breaker (question 9); `(f.etype, f.elabel, f.eid, f.efield) > (…)` with the label's NULL read as `''`.
- The proof: scratch `e2e-` keys and a scratch category; a page by `after`, a row inserted between two pages, the next page
  neither skips nor repeats it; privileges by `has_function_privilege`; EXPLAIN.
- `scripts/doors/manifest.txt:68`, `:76` — the new argument types. `bun run db:proof --fresh`; the stop with the pairing line
  and every body's md5. A file with a DROP: the operator's paste (DEC-384). The client types by the supervisor's patch.

## Part 3 — STEP 4

`collectUi` / `collectEntities` read by key: `after` = the last row's key; stop on a page shorter than the chunk; a failed
page stops with its typed failure. `translations-service.ts` passes `after`. BT-U1 (new, in `ai-bulk-bar.test.tsx`): a row
added while collecting is neither skipped nor read twice (a fake door over a list that grows between calls). The screen's
specs pass unchanged or are named.

## Part 4 — STEP 5 (the account; concerns 1–4)

- `src/features/auth/auth-service.ts`: `changePassword` sends `current_password` (and keeps or drops the verifier by
  question 1); `linkGoogleIdentity` goes (DEC-433); `unlinkProviderIdentity` by question 2; the three sign-outs of other
  devices answer `{ ok: true, othersSignedOut: false }` when theirs fails (typed), never only a console line;
  `pendingEmail()` reads `new_email` (question 5). `src/features/auth/types.ts` (the answer's field).
  `auth-error-key.ts`: `current_password_invalid`, `current_password_required` → `auth.errorWrongCurrentPassword`;
  `same_password`, `reauthentication_needed`, `manual_linking_disabled` → by question 13.
- `src/routes/settings.tsx`: no Link Google (and Unlink by question 2); a failed sign-out of other devices says so beside
  the action with `settings.signOutOthers`; the e-mail section reads the pending address on load; the page's own status
  read (findings 2) is typed or goes to the shell's (question 9). Tests: `src/test/settings-messages.test.tsx`
  (re-pointed mocks), ACS-U1 → ACS-U6 (new, `auth-client.test.ts`): the current password sent; a failed sign-out of other
  devices returned typed (three sites); the pending address read; the status read only with a session; a failed status
  read typed.
- `src/features/auth/use-auth.ts`: the listener hops a macrotask before any read (findings 1); the status read goes out
  only with a session from `currentSession()` (none → no read; failed → typed); its error read into a typed
  `ReaderError` (INC-1264); the deactivated sign-out unchanged when the status is read. `use-auth.test.tsx` gains the
  branches.
- The nine callers onto `useShell()` (`user`, `authLoading`); their tests re-pointed (`listings-page.test.tsx:22`,
  `staff-form-gates.test.tsx:29`, `settings-messages.test.tsx:40`). CF-SESSION-5 (new, `session-reads.test.ts`, the
  proposed id for CF-SESSION-STORE): `useAuth(` only in `src/components/app-shell.tsx`; planted: a feature calling it fails.
- `src/routes/admin.tsx` `AdminGate` (DEC-434): once the permissions say staff, the factor read arrives by `loadOnce`;
  `getAal` and `listFactors` answer typed (`mfa-service.ts`); no verified factor → a setup panel (to `/settings`'s
  two-factor section) and no staff screen; a factor and `aal1` → the code prompt (`stepUpWithCode`, the step-up dialog's
  parts) before the `Outlet`; a failed read → the failure through the one reader, no staff screen. New
  `src/routes/admin-gate.test.tsx` (AG-U1 → AG-U4).
- CF-AUTH-1 (new, `scripts/conformance/auth-credentials.test.ts`, caller named in `wired.test.ts`; allowlist
  `scripts/conformance/auth-credentials-allowlist.txt`, `file function | reason | until`): every `updateUser(` that sets a
  password passes `current_password` except `completePasswordReset`; no `linkIdentity(` in `src/`. Planted both ways.
- `scripts/ci/local-backend-config.toml`: `enable_manual_linking = false` written out; the notices by question 4.
- E2E: ACS-E1 (wrong current password refused, the old password still signs in), ACS-E2 (no Link Google), ACS-E3 (the
  pending e-mail change survives a reload) in `e2e/settings.spec.ts` (S-2 re-pointed by question 2); STAFF-E1, STAFF-E2 in
  `e2e/mfa-stepup.spec.ts` or a new `e2e/admin-gate.spec.ts`; a node helper that enrols a TOTP for a scratch staff account
  and returns an aal2 session (beside the pool's code in `e2e/helpers/ui.ts`), used by the 20 `admin_panel` grants in the
  8 specs listed above.
- Docs: `docs/features/settings-surface.md`, `docs/features/admin-shell.md`, `docs/features/doors.md`,
  `docs/features/forms.md` (the helper), `docs/features/e2e-harness.md` (the staff factor helper).

## The words (English; the Amharic from the supervisor's file)

| Key | Layer | English |
| --- | --- | --- |
| `admin.factorNeeded.title` | admin | Two-step sign-in needed |
| `admin.factorNeeded.body` | admin | Staff screens open only for an account with two-step sign-in. Set it up in Settings, then come back. |
| `admin.factorNeeded.action` | admin | Set it up |
| `admin.factorCode.body` | admin | Enter the code from your authenticator app to open staff screens. |
| `admin.factorReadFailed` | admin | We couldn't check your two-step sign-in. Refresh the page to try again. |
| `settings.othersStillSignedIn` | member | Done, but other devices are still signed in. Use Sign out others below. |
| `settings.emailChangePending` | member | A change to {email} is waiting for both confirmation links. |

The code prompt's other words reuse the step-up dialog's keys. Question 2 may add one help line for the methods list.

## The hosted settings (for §12, after Publish; ethio-staging first, then ethio-prod)

By the Management API's key (`api.supabase.com/api/v1-json`); the dashboard places as the docs name them:
1. `security_update_password_require_current_password` = true — Authentication → Sign In / Providers → Email (the
   dashboard label to be read there by the operator); only after the code that sends `current_password` is live.
2. `security_manual_linking_enabled` = false — Authentication → Sign In / Providers ("Allow manual linking"); only after
   the code without Link Google (and Unlink by question 2) is live.
3. `mailer_notifications_password_changed_enabled`, `…email_changed…`, `…identity_linked…`, `…identity_unlinked…`,
   `…mfa_factor_enrolled…`, `…mfa_factor_unenrolled…` = true, with their subjects and templates — Authentication → Emails
   (the "Email Templates" page, § Security notifications); the text by question 4. `…phone_changed…` stays off (no phone
   sign-in).

# QUESTIONS for ruling 1

1. The current password (P1, P2): (a) send `current_password` AND keep the browser's verifier until the operator confirms
   both hosted keys are on, a later turn removing it — CI proves the verifier, the hosted server proves itself on staging
   (recommended); (b) remove the verifier now and accept the window and a CI that cannot prove ACS-E1; (c) another form.
2. Unlinking under manual linking off (P3): (a) the Unlink control goes with Link Google, the methods list reads only, the
   server's `remove_own_password` stays (recommended); (b) manual linking stays on at the server and only the button goes
   (against DEC-433's words); (c) another form.
3. The second half of OPEN (a), given in the chat only: how it is ruled and where it is recorded.
4. The notices (P4, P7): which kinds; CI with the server's default templates (no files) or with files under
   `supabase/templates/` copied by `scripts/ci/prepare-local-backend.sh`; the hosted text in one language, two in one
   mail, or by a metadata field the app would start writing (a new write, a new scope).
5. `getUser()` for the pending address (P8): a CF-SESSION-3 allowlist line under which DEC, or another read.
6. The reset page (P6): add `src/routes/auth_.reset.tsx` and its tests to SCOPE for the third failed sign-out, or leave
   that site to the console with a named reason.
7. INC-1262 (P6): add `scripts/public-surface.ts`, `scripts/public-surface.test.ts`, `scripts/check-migrations.sh` and
   `scripts/fixtures/` to SCOPE, or move INC-1262 to another turn.
8. DEC-434's server half (P9): its own number and turn (recommended), this bundle naming the gap under §10; the client gate
   and its 20 harness sites here.
9. The entity door's order gains `efield` as its last tie-breaker (findings 8): an order change for tied rows only. Agree?
   And the status read's failure (INC-1264): the user stays signed in with the failure named and reported to the shell's
   one notice (recommended), or the signed-in screen waits on it.
10. INC-1261 (P5): `chooseInList` by the option's value test id (J5), not its words; its planted cases on which screens
    (one list of seven and one of nine options; `/dev/style` is a candidate, `src/routes/dev.style.tsx` is not in SCOPE).
11. The records list (DEC-432): its place (proposed `docs/governance/briefs/<records stem>.records.sha256`, a path Lovable
    may write) and the body line (`Records list: <path> sha256 <64 hex>`).
12. DG-12: is `ClosedPrimary` with its own missing-choice line an action (recommended: yes, the line belongs to the
    button)? And the gallery line's `until`.
13. The words for `same_password`, `reauthentication_needed`, `manual_linking_disabled` (findings 4): existing keys, new
    keys, or out of this bundle. (The hosted projects require re-authentication after 24 hours if P1-c's "secure password
    change" is still on — `auth-service.ts:323–325` — and the page has no answer for it today.)
14. Ids: CF-AUTH-1, CF-SESSION-5 (for CF-SESSION-STORE), DG-12, DG-13, FD-U1, BT-U1, ACS-U1 → U6, ACS-E1 → E3, STAFF-E1,
    STAFF-E2, AG-U1 → U4, the select helper's planted cases SLH-1, SLH-2 — all free (`rg` over `it(`/`test(` titles in
    `src/`, `e2e/`, `scripts/`).
