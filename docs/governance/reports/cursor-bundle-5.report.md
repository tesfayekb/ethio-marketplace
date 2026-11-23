# CURSOR BUNDLE 5 — account security, one session store, the tests-and-CI queue, two app laws, two dialog laws, the records exception — report
Base: a14f032b6 · Final commit: 9b179de17 · Brief: docs/governance/briefs/cursor-bundle-5.md (rulings 1, 2 and 3 beside it; ruling 3 sha256 256aa4671a23ec675ee21a9cfa3dd6cd96303ddb6220e4b84739a8ccdb07b565, proved by `sha256sum` of the saved file)
Review: READY · 0 BLOCKER · 1 MAJOR · 2 MINOR · on 9b179de

(The self-review, rule 80, read the whole diff against the eight headings. MAJOR: DLG-E12 is not proven green on webkit-1280 on this computer (§1, §12); CI's webkit lane judges it. MINOR 1: a comment in src/features/auth/use-auth.ts runs past 100 columns (prettier accepts it); left, not worth a second run. MINOR 2: ACS-E3 and ACS-E4 ran nowhere locally (no mail sink); CI's lanes are their proof.)

THE CI LINE (rule 40, the base): 92fee7d1a (dev's head, SUCCESS, run 45186382529, 2026-11-23T13:47:25Z). This lane's last COMPLETED run before this push was 45214184929 on 67331d799 (the stop-3 tree: the gate mounted, dev not yet merged): red in 14 jobs, every one a consequence of that tree (the first-paint budget's ENTRY_CLOSURE, ruling 3 item 3; the staff lanes meeting the gate, stop 3; DLG-E12, ruling 3 item 2). All three are fixed or removed on the final tree below.

## 1. Done / not done, by part and step

- STEP 0, saved the brief; roadmap line 3 names it (`6b13e347f`, `70be7366e`, `43bc4a2dd`, `70ac65652` save the brief and rulings 1–3). STEP 1, the census and plan: `cursor-bundle-5.stop-1.md`.
- PART 1 (no database), done: INC-1260 (a ruling's widening joins its brief's SCOPE), INC-1262 (the public-surface guard reads REVOKE), INC-1261 (`chooseInList`, the one step to choose in a select list; SLH-1, SLH-2; the specs moved onto it), INC-1140 (the feed's retry calls `refreshPage`; its allowlist line is gone), DG-12 (footer actions only) and DG-13 (one switch), ACT-032 (the live staff-rule read), DEC-432 (the records exception, `scripts/ci/lovable-branch-guard.sh`).
- PART 2 (the database half), done: the list doors read after a key (INC-1141), `supabase/migrations/20261123131500_ee2c7dee-14da-4f27-8122-068afc226a75.sql` (sha256 6f2891c9f28894c0e2e229297eb7844d878d2af7f84c6c3e807f3f999975accb), applied on ethio-staging by the supervisor; the client types arrived as ruling 2's patch (`3312d4951`). `cursor-bundle-5.stop-2.md` holds the pairing line, the body md5s and the proofs.
- PART 3, done: the bulk translate collects by key (INC-1141; BT-U1, FD-U1).
- PART 4 (account security), done except the gate's mount, which ruling 3 item 1 (DEC-451) moves to bundle 6:
  - concern 1: a credential changes only after the server's check (`current_password` rides with the change, DEC-436; Link Google and Unlink leave, DEC-435; CF-AUTH-1); concern 2: the six security notices (templates, subjects, the CI backend's settings, DEC-437); concern 4: one session store (the nine `useShell` callers, CF-SESSION-5, INC-1247); the pending e-mail read (INC-1258, DEC-439); the status read (INC-1264).
  - concern 3, the staff gate (DEC-434): BUILT and unit-tested (AG-U1..AG-U4), NOT MOUNTED (DEC-451).
- RULING 3 in this order: (1) the merge of dev 92fee7d1a, one `git merge --no-ff --no-commit origin/dev`, `0551eed86`; (2) decision 2, `25e02df8f`; (3) decision 1, `cc6e8c80b`; (4) decision 3, `004191de3`; (5) the ceilings `dddbcb2c7`, the docs `701219218`, the usage maps `9b179de17`; step 6 whole, the browser check, the self-review, ONE push.

Step 1's printed lines (ruling 3): `git rev-parse HEAD origin/cursor/bundle-5` printed 67331d799763475cc5a3f914cf06d56429d25dbe twice; `git rev-parse origin/dev` printed 92fee7d1a4df49feeee9d3879946fdef44a33317; `git diff --name-only --diff-filter=U` printed nothing; `git diff --cached --name-only HEAD` printed the ruling's 15 files, equal to the list byte for byte (compared with `diff` against `git diff --name-only a14f032b6 origin/dev`); `bun run typecheck` clean. The merge commit: 0551eed86e8f89baac7323bd29b77badd4e71963 ("Merge dev 92fee7d1a into cursor/bundle-5 (ruling 3: no conflict)").

DECISION 2's proof (the red run 45187492568 was DLG-E12):
- Red first, before any edit: with the section "Select lists" after "Filters" as it stood, `bun run e2e:local -- e2e/dialogs.spec.ts --grep "DLG-E12" --project=desktop-1280 --retries=0` failed at e2e/dialogs.spec.ts:816, "the choices a person sees @ 834 x 900", expected >= 6, received 2; `webkit-1280` failed at :816, received 3 (CI: 2 and 3). The hypothesis holds.
- The move (`src/routes/dev.style.tsx`: "Select lists" sits just before "Filters", which is the board's last section again; nothing in the panel, the test or a helper changed): `desktop-1280` and `mobile-360`, 0 retries: DLG-E12, DLG-E13, HS-29, SLH-1, SLH-2 green (HS-5 green on desktop-1280).
- `webkit-1280`: DLG-E13 green; DLG-E12 now passes :816 and FAILS at :833 ("style-filters-size-list" not visible after `pressClear(size)`), 3 runs of 3. The same :833 failure happens on a scratch copy of origin/dev 92fee7d1a (no "Select lists" section at all, `/tmp/ethio-scratch/cursor-bundle-5/dev-base`), so it is this computer's WebKit (playwright webkit v2248, WebKit 26.0, installed here by `bunx playwright install webkit`, the browser guard's own remedy), not this bundle's change. I did not STOP on it (the ruling's STOP is for a fix that does not hold; the CI-judged assertion is the one the move fixes). It is a MAJOR below and the CI webkit lane is the proof.

DECISION 1: what left and what stayed.
- Left: the gate's mount in `src/routes/admin.tsx` (the whole file is byte-for-byte its text at adb10b7c3, which equals the base: nothing else in Part 4 had changed it); the line `src/routes/admin.tsx#StaffFactorGate` in `scripts/conformance/holds-its-box-allowlist.txt`; STAFF-E1, STAFF-E2 (back to `e2e/mfa-stepup.spec.ts` at adb10b7c3) and `e2e/helpers/staff-factor.ts` (deleted: `[intentional-delete]` in `cc6e8c80b` and its line in `docs/tracking/intentional-deletions.txt`). Their ids stay assigned.
- Stayed, unmounted: `src/features/auth/mfa/staff-factor.ts`, `src/features/auth/mfa/staff-factor-gate.tsx` (its header says in one line that nothing mounts it until bundle 6, DEC-451), AG-U1..AG-U4 and their words (`admin.factorNeeded.*`, `admin.factorCode.body`, `admin.factorReadFailed`, still used by the gate). No law refused the unimported module (`bunx vitest run scripts` and `bun run checks` green). No word's only user left, so none was removed (the three removed earlier are `settings.linkGoogle`, `settings.unlink`, `settings.unlinked`, ruling 1). The usage maps changed because the gate's keys now read "component: staff-factor-gate" instead of "/admin" (`9b179de17`). Nothing of options (a) or (b) is built.

DECISION 3 (INC-1266): `src/features/auth/account-status.ts` imports nothing from `@/lib/reader-failure`; its `failed` answer is `{ kind: "failed", error: unknown }` with the error as it arrived; `use-auth.ts` hands it to `reportOnDemandFailure("the account's status", error)`; the header names INC-1266; ACS-U7 added (`src/features/auth/account-status.test.ts`). This amends ruling 1 item 9's word "typed" for this one reader. The entry check's output (below, §5) prints no ENTRY_CLOSURE line.

## 2. Files changed

`git diff --name-only a14f032b6` (124 paths; 15 of them are dev's, brought by the merge and written by Lovable's bundle 7, and are named under §10):

```
.github/workflows/local-backend-proof.yml
docs/features/account.md
docs/features/auth-email-door.md
docs/features/auth-password-recovery.md
docs/features/ci-guards.md
docs/features/doors.md
docs/features/e2e-harness.md
docs/features/settings-surface.md
docs/features/step-up-auth.md
docs/features/translations.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-5-ruling-1.md
docs/governance/briefs/cursor-bundle-5-ruling-2.md
docs/governance/briefs/cursor-bundle-5-ruling-3.md
docs/governance/briefs/cursor-bundle-5.md
docs/governance/reports/cursor-bundle-5.stop-1.md
docs/governance/reports/cursor-bundle-5.stop-2.md
docs/governance/reports/cursor-bundle-5.stop-3.md
docs/tracking/intentional-deletions.txt
e2e/admin-categories-console.spec.ts
e2e/admin-categories-lifecycle.spec.ts
e2e/admin-translations-console.spec.ts
e2e/helpers/filters.ts
e2e/helpers/mail-sink.ts
e2e/house-style.spec.ts
e2e/settings.spec.ts
public/i18n-usage.json
roadmap.md
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/check-migrations.sh
scripts/ci/backend-config.py
scripts/ci/backend-config.test.ts
scripts/ci/local-backend-config.toml
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/ci/prepare-local-backend.sh
scripts/conformance/auth-credentials-allowlist.txt
scripts/conformance/auth-credentials.test.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/dialogs-allowlist.txt
scripts/conformance/dialogs.test.ts
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/on-demand-failure-allowlist.txt
scripts/conformance/session-reads-allowlist.txt
scripts/conformance/session-reads.test.ts
scripts/conformance/stale-reload-allowlist.txt
scripts/conformance/stale-reload.test.ts
scripts/conformance/wired.test.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/live-staff-rules.sql
scripts/doors/manifest.txt
scripts/doors/rows.ts
scripts/doors/staff-rules.ts
scripts/fixtures/public-grant-revoked-example.sql
scripts/public-surface-allowlist.txt
scripts/public-surface.test.ts
scripts/public-surface.ts
scripts/route-budgets.mjs
src/components/marketplace/feed.test.tsx
src/components/marketplace/feed.tsx
src/features/account/account-overview.tsx
src/features/admin-ai/ai-service.test.ts
src/features/admin-ai/ai-service.ts
src/features/admin-attributes/attributes-service.test.ts
src/features/admin-attributes/attributes-service.ts
src/features/admin-categories/categories-service.test.ts
src/features/admin-categories/categories-service.ts
src/features/admin-categories/category-images-service.test.ts
src/features/admin-categories/category-images-service.ts
src/features/admin-countries/countries-service.test.ts
src/features/admin-countries/countries-service.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page.test.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-locations/locations-service.test.ts
src/features/admin-locations/locations-service.ts
src/features/admin/translations/ai-bulk-bar.test.tsx
src/features/admin/translations/ai-bulk-bar.tsx
src/features/admin/translations/bulk-collect.ts
src/features/admin/translations/translations-service.ts
src/features/admin/users/staff-form-gates.test.tsx
src/features/admin/users/user-detail.tsx
src/features/auth/account-status.test.ts
src/features/auth/account-status.ts
src/features/auth/auth-client.test.ts
src/features/auth/auth-error-key.ts
src/features/auth/auth-service.ts
src/features/auth/mfa/mfa-service.ts
src/features/auth/mfa/staff-factor-gate.test.tsx
src/features/auth/mfa/staff-factor-gate.tsx
src/features/auth/mfa/staff-factor.ts
src/features/auth/mfa/use-mfa.ts
src/features/auth/types.ts
src/features/auth/use-auth.test.tsx
src/features/auth/use-auth.ts
src/features/legal/my-legal-page.tsx
src/features/legal/my-legal-version.tsx
src/features/posting/wizard.tsx
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/routes/auth-forms.test.tsx
src/routes/auth_.reset.tsx
src/routes/dev.style.tsx
src/routes/l.$slug.tsx
src/routes/settings.tsx
src/test/settings-messages.test.tsx
supabase/migrations/20261123131500_ee2c7dee-14da-4f27-8122-068afc226a75.sql
supabase/templates/email_changed.html
supabase/templates/identity_linked.html
supabase/templates/identity_unlinked.html
supabase/templates/mfa_factor_enrolled.html
supabase/templates/mfa_factor_unenrolled.html
supabase/templates/password_changed.html
supabase/templates/subjects.json
```

The merge's 15 (`git diff --name-only a14f032b6 92fee7d1a4df49feeee9d3879946fdef44a33317`):

```
scripts/route-budgets.mjs
src/features/admin-ai/ai-service.test.ts
src/features/admin-ai/ai-service.ts
src/features/admin-attributes/attributes-service.test.ts
src/features/admin-attributes/attributes-service.ts
src/features/admin-categories/categories-service.test.ts
src/features/admin-categories/categories-service.ts
src/features/admin-categories/category-images-service.test.ts
src/features/admin-categories/category-images-service.ts
src/features/admin-countries/countries-service.test.ts
src/features/admin-countries/countries-service.ts
src/features/admin-locations/locations-service.test.ts
src/features/admin-locations/locations-service.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
```

New files (`git ls-files` proof of each, checked below):

```
tracked  docs/governance/briefs/cursor-bundle-5-ruling-1.md
tracked  docs/governance/briefs/cursor-bundle-5-ruling-2.md
tracked  docs/governance/briefs/cursor-bundle-5-ruling-3.md
tracked  docs/governance/briefs/cursor-bundle-5.md
tracked  docs/governance/reports/cursor-bundle-5.stop-1.md
tracked  docs/governance/reports/cursor-bundle-5.stop-2.md
tracked  docs/governance/reports/cursor-bundle-5.stop-3.md
tracked  e2e/helpers/mail-sink.ts
tracked  scripts/conformance/auth-credentials-allowlist.txt
tracked  scripts/conformance/auth-credentials.test.ts
tracked  scripts/doors/live-staff-rules.sql
tracked  scripts/fixtures/public-grant-revoked-example.sql
tracked  src/components/marketplace/feed.test.tsx
tracked  src/features/admin/translations/bulk-collect.ts
tracked  src/features/auth/account-status.test.ts
tracked  src/features/auth/account-status.ts
tracked  src/features/auth/mfa/staff-factor-gate.test.tsx
tracked  src/features/auth/mfa/staff-factor-gate.tsx
tracked  src/features/auth/mfa/staff-factor.ts
tracked  supabase/migrations/20261123131500_ee2c7dee-14da-4f27-8122-068afc226a75.sql
tracked  supabase/templates/email_changed.html
tracked  supabase/templates/identity_linked.html
tracked  supabase/templates/identity_unlinked.html
tracked  supabase/templates/mfa_factor_enrolled.html
tracked  supabase/templates/mfa_factor_unenrolled.html
tracked  supabase/templates/password_changed.html
tracked  supabase/templates/subjects.json
```

## 3. Behaviour contract — answer tables before → after

| Touched | At the base (a14f032b6) | Now |
| --- | --- | --- |
| Settings, Link Google / Unlink | two controls, `linkGoogleIdentity`, `unlinkProviderIdentity`, `settings.lastMethodGuard` hint | neither exists (DEC-435); the methods list is read-only; S-2 names the password row; ACS-E2 |
| `changePassword` | `updateUser({ password })` after a throwaway-client proof; returned `{ ok: true }`; a failed sign-out of the others was a `console.warn` | `updateUser({ password, current_password })` beside the same proof (DEC-436); returns `{ ok: true, othersSignedOut }`; a refused `reauthentication_needed` and `same_password` have their own words (INC-1267); ACS-U1..U4 |
| `removeOwnPassword`, `completePasswordReset` | `{ ok: true }`, a console warning on a failed sign-out of the others | `{ ok: true, othersSignedOut }`; the reset is the one CF-AUTH-1 exception (no `current_password`, a recovery session); the page says `auth.resetOthersStillSignedIn` when the others stayed (ARP-1, ARP-2) |
| Settings, e-mail section | no read of a waiting change | `pendingEmail()` (one `getUser()`, on load and after a change) says `settings.emailChangePending`; a failed read says so (DEC-439) |
| Who is signed in (nine screens) | each called `useAuth()` itself | each reads `useShell()` (INC-1247); CF-SESSION-5 |
| `useAuth` status read | read the profile inside the auth listener, dropped its error | waits one macrotask, reads through `currentSession`, no session means no read, a failure is named through `reportOnDemandFailure`; the read carries no typed failure (INC-1264, INC-1266; ACS-U5, ACS-U6, ACS-U7) |
| The staff gate | none | built and unit-tested, NOT mounted: `/admin` draws exactly as at the base (DEC-451) |
| `admin_list_translations`, `admin_list_entity_translations` | OFFSET paging | an optional `p_after` key; without it the answer is the base's (stop 2's table) |
| The bulk translate | collected by position | collects by key (BT-U1) |
| `/dev/style` | "Filters" the last section | "Filters" still the last section; "Select lists" sits before it |

Everything else is the base's: `git diff` of every changed `src/` file was read against these rows in the self-review.

## 4. Censuses

- The staff-gate census (ruling 3 CLASS 1), my own commands at the final head: `grep -rnF "grantRole(" e2e | grep -c -e admin -e moderator` → 86 (the ruling's 88 counted STAFF-E1 and STAFF-E2, now removed); `grep -l -e "grantRole([^)]*admin" -e "grantRole([^)]*moderator" -e admin_panel e2e/*.spec.ts | wc -l` → 31; the specs that load `/dev/style`: `grep -lE "/dev/style" e2e/*.spec.ts | wc -l` → 6 (choice-lists, phone-frame, house-style, dialogs, dark-cards, sage-tiers); `git diff --name-only a14f032b6 92fee7d1a4df49feeee9d3879946fdef44a33317 | wc -l` → 15.
- The bundle's other censuses are in `cursor-bundle-5.stop-1.md` (consumers, definition, tests, lists, old-file readers, second readers, chunk graph, first download, premises, callee codes) and were read on the base; none was re-run for ruling 3 beyond the three above and the first-download measure in §5.
- The first-paint chain (ruling 3 item 3): `src/features/auth/use-auth.ts` → `account-status.ts` → `@/lib/reader-failure` → `refusal.ts` → `door-refused-key.ts`; after the fix `account-status.ts` imports only `@/lib/supabase-door`.

## 5. Tests

- Added or changed ids: CF-AUTH-1, CF-AUTH-2 (planted), CF-SESSION-5, CF-SESSION-6 (planted); DG-12, DG-13; FD-U1, BT-U1; ACS-U1..U4 (`auth-client.test.ts`), ACS-U5, ACS-U6 (`use-auth.test.tsx`, ACS-U6's title now says "named and reported"), ACS-U7 (`account-status.test.ts`, new); ACS-E1..E4 (`e2e/settings.spec.ts`), S-2 re-pointed (its last-method assertion became the password row, since the control it asserted is gone by DEC-435); AG-U1..U4; SETM-5..8; ARP-1, ARP-2; SLH-1, SLH-2; CF-BCFG-1 (its expected section list now holds the six notices). STAFF-E1 and STAFF-E2 left (DEC-451), ids still assigned.
- Red first: DLG-E12 (above), on `desktop-1280` and `webkit-1280`, before the move.
- `bun run typecheck`: clean (`tsc --noEmit` for the app and for `tsconfig.scripts.json`) on 9b179de17; `bun run lint`: clean (`eslint . --max-warnings 0`).
- Unit and law runs on the final tree: `bunx vitest run src/features/auth scripts --maxWorkers=2` → 143 files, 807 passed, 1 skipped (before ACS-U7's file; `bunx vitest run src/features/auth` after it → 14 files, 80 passed); the laws ran again inside `bun run checks`.
- `bun run checks` (once whole, after its one FAIL, the i18n usage maps, was fixed at its root in `9b179de17`): last line `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 617s`; fast line `checks (fast): 26 PASS · 0 FAIL · 555s`. The first run's line was `checks: 34 PASS · 1 FAIL · 25 NOT RUN · 609s` (i18n-usage-map, the maps changed because the gate left the layout). NOT RUN, with their reasons as the script prints them: scope (the Actions API's artifacts exist only in a GitHub run, two steps); workflow lint (the pinned actionlint is linux/x64, this machine darwin/arm64); install dependencies (three jobs: dependencies are already installed; a package change is its own turn); secrets scan (the pinned gitleaks is linux/x64); dependency audit (the advisory service is not reachable, two steps); e2e preflight (needs staging credentials the script never holds, four steps); the merged e2e (needs the lanes' artifacts, six steps); promote (CI only); semgrep's SARIF warning step (GitHub-only upload); plus the remaining steps of those jobs. 25 in all.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-5.md --at a14f032b6`: "no finding".
- The first-download check (`bun run build && node scripts/check-bundle-size.mjs`), on the final tree after the merge and the three fixes (ruling 3 item 4): exit 0, no ENTRY_CLOSURE line; `JS: 201.8 KiB / 203 KiB — ok`, `CSS: 22.7 KiB / 24 KiB — ok`, `Admin code in the entry's closure: 0 module(s), each allowlisted (BC-16) — ok`, `Bundle budget OK.` Against a build of origin/dev 92fee7d1a (`/tmp/ethio-scratch/cursor-bundle-5/dev-base`, same machine): the entry's JS 201.5 → 201.8; every one of the 50 pages grew 0.1 to 0.3 KiB (the status read on every first download); six pages came inside the NEAR band and their ceilings moved by DEC-296's form (`ceilingForLocal`): `/admin/categories` 352.457 → 352.617, 353 → 354; `/admin/countries` 309.572 → 309.746, 310 → 311; `/admin/listings_/$listingId_/edit` 410.537 → 410.693, 411 → 412; `/admin/places` 311.597 → 311.769, 312 → 313; `/admin/translations` 308.434 → 308.658, 309 → 310; `/auth` 219.509 → 219.693, 220 → 221. The one line of the six that bundle 7 had moved (`/admin/countries`) now carries this bundle's sentence in front of bundle 7's, with dev's figure as the base; `/admin/attributes` and `/admin/locations`, also moved by bundle 7, are untouched. The base figures are my own measure of dev (the 3-decimal copy of the check in scratch).
- Browser, by id, 0 retries, through `bun run e2e:local` (staging; E2E_SUPABASE_URL, E2E_SUPABASE_PUBLISHABLE_KEY, E2E_SUPABASE_SERVICE_ROLE_KEY are set): `mobile-360` and `desktop-1280`: CT-5, CT-17, TR-10, TR-25, HS-29, SLH-1, SLH-2, DLG-E12, DLG-E13 green; S-2, S-3, S-4, ACS-E1, ACS-E2 green (the settings spec runs in `mobile-360`); the run's count line `22 passed · 3 skipped` (TR-25 in mobile is skipped by its tag; ACS-E3 and ACS-E4 skip without the temporary backend's mail sink: CI is their proof). `webkit-1280`: see §1 and §12. `[ssr-error]` counts: not read from these local runs.
- J-audit: not run as a separate command this turn; the CF-HELPERS laws that judge `e2e/**` ran green inside `bun run checks` and `bunx vitest run scripts`.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "useAuth\(" src` (the callers of the session store; CF-SESSION-5 holds the list: only the shell's one), `rg -n "linkIdentity|unlinkIdentity|updateUser" src` (CF-AUTH-1 holds them), `rg -n "reader-failure" src/features/auth src/lib` (INC-1266), `rg -n "subscribe|onAuthStateChange" src/i18n`.
- `src/i18n/provider.tsx` (`useAuthIdentity`) subscribes to the auth state on its own, beside the shell's one store: INC-1268 (ruling 1), owner bundle 6; left.
- `src/features/auth/use-auth.ts` itself is the one store's feeder; the first-download law (INC-1266) now names three held readers: `account-status.ts` is the third.
- The unmounted gate's file imports `useShell`; nothing else reaches it.
- The staff harness: 31 spec files meet any staff gate; bundle 6's one helper answers them (DEC-451).

## 7. Allowlists and guards

Counts of lines (comments excluded), base → now:
- `scripts/conformance/auth-credentials-allowlist.txt` 0 → 1 (`auth-service.ts completePasswordReset`, the recovery exemption, until DEC-436).
- `scripts/conformance/session-reads-allowlist.txt` 1 → 2 (`auth-service.ts pendingEmail`, the Settings page's one `getUser()`, until DEC-439).
- `scripts/conformance/on-demand-failure-allowlist.txt` 5 → 6 (`src/features/auth/account-status.ts`, until INC-1264; its reason now says the error arrives as it arrived, INC-1266).
- `scripts/conformance/holds-its-box-allowlist.txt`: the gate's line was added by Part 4 and removed by decision 1; net 0 against the base.
- `scripts/conformance/briefs-allowlist.txt` 5 → 0 (STEP 0: the five lines keyed to other briefs went with INC-1260's cause).
- `scripts/conformance/dialogs-allowlist.txt` 0 → 1 (`photo-gallery.tsx#DG-12`, the viewer's own navigation in the footer band, until 2027-05-23).
- `scripts/conformance/stale-reload-allowlist.txt` 3 → 2 (INC-1140's feed line left).
- `scripts/public-surface-allowlist.txt` 235 → 236 (`admin_list_translations | authenticated | restated grant`, Part 2; stop 2 asked, ruling 2 answered).
- Guards added, each proven on a planted bypass: CF-AUTH-1/CF-AUTH-2 (auth-credentials.test.ts), CF-SESSION-5/CF-SESSION-6 (session-reads.test.ts); both named in `scripts/conformance/wired.test.ts`. Self-tests of the changed guards ran inside `bunx vitest run scripts`.

## 8. Strings

New keys, English then Amharic, each copied from the supervisor's `words.json` (sha256 b524dce4…e554 by ruling 1) by script, never retyped; layers per DEC-258:
- `admin.factorNeeded.title` (admin) — Two-factor authentication needed — ባለ ሁለት ደረጃ ማረጋገጫ ያስፈልጋል
- `admin.factorNeeded.body` (admin) — Staff screens open only for an account with two-factor authentication. Set it up in Settings, then come back. — የሠራተኞች ገጾች የሚከፈቱት ባለ ሁለት ደረጃ ማረጋገጫ ላለው አካውንት ብቻ ነው። በቅንብሮች ውስጥ ያዋቅሩት፣ ከዚያ ይመለሱ።
- `admin.factorNeeded.action` (admin) — Set it up — ያዋቅሩት
- `admin.factorCode.body` (admin) — Enter the code from your authenticator app to open staff screens. — የሠራተኞች ገጾችን ለመክፈት ከማረጋገጫ መተግበሪያዎ ኮዱን ያስገቡ።
- `admin.factorReadFailed` (admin) — We couldn't check your two-factor authentication. Refresh the page to try again. — ባለ ሁለት ደረጃ ማረጋገጫዎን መፈተሽ አልቻልንም። እንደገና ለመሞከር ገጹን ያድሱ።
- `auth.errorSamePassword` — Choose a password different from your current one. — አሁን ካለው የይለፍ ቃልዎ የተለየ የይለፍ ቃል ይምረጡ።
- `auth.errorReauthNeeded` — For your safety, sign out and sign in again, then change your password. — ለደህንነትዎ ሲባል ይውጡና እንደገና ይግቡ፣ ከዚያ የይለፍ ቃልዎን ይቀይሩ።
- `auth.resetOthersStillSignedIn` — Your password is changed, but other devices are still signed in. Open Settings and use Sign out others. — የይለፍ ቃልዎ ተቀይሯል፣ ነገር ግን ሌሎች መሣሪያዎች አሁንም እንደገቡ ናቸው። ቅንብሮችን ከፍተው ከሌሎች መሣሪያዎች ይውጡ የሚለውን ይጠቀሙ።
- `settings.othersStillSignedIn` (member) — Done, but other devices are still signed in. Use Sign out others below. — ተጠናቋል፣ ነገር ግን ሌሎች መሣሪያዎች አሁንም እንደገቡ ናቸው። ከታች ያለውን ከሌሎች መሣሪያዎች ይውጡ የሚለውን ይጠቀሙ።
- `settings.emailChangePending` (member) — A change to {email} is waiting for both confirmation links. — ወደ {email} የሚደረገው ለውጥ ሁለቱንም የማረጋገጫ አገናኞች እየጠበቀ ነው።
Removed keys: `settings.linkGoogle`, `settings.unlink`, `settings.unlinked`. Both usage maps (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`) regenerated after the last key or file moved (`9b179de17`). The six notice texts and subjects are the supervisor's templates (`supabase/templates/`, sha256 as ruling 1 lists, copied by script).

## 9. Migrations

One, applied by the supervisor on ethio-staging before Part 3: `supabase/migrations/20261123131500_ee2c7dee-14da-4f27-8122-068afc226a75.sql`, sha256 6f2891c9f28894c0e2e229297eb7844d878d2af7f84c6c3e807f3f999975accb, declared mark `20261123150000`, pairing line `apply ee2c7dee → expect mark 20261123150000`. It is unchanged since stop 2; this turn ran no `db:proof`, so there is no new last line to paste (stop 2 pasted `bun run db:proof --fresh` PASS, applied 553/553, CLI 2.120.0, cold).

## 10. Departures

- The merge of dev (15 files, Lovable's bundle 7: six console services and their tests, `reader-failure.ts` and its test, `route-budgets.mjs`) is the operator's word in ruling 3, one `git merge --no-ff --no-commit origin/dev`, no conflict; those 15 paths are in §2 but are not this lane's work.
- Ruling 3 item 1 (DEC-451): the staff gate is not mounted; STAFF-E1, STAFF-E2 and `e2e/helpers/staff-factor.ts` left; the brief's "a staff screen needs a second factor" is built but not live after this bundle. The server half is DEC-438 (bundle 6).
- Ruling 3 item 3 amends ruling 1 item 9: the status read's failure is not a `ReaderError` but the error as it arrived.
- `scripts/public-surface-allowlist.txt` gained one line (Part 2), outside the brief's SCOPE; stop 2 asked and ruling 2 kept it.
- A mechanical consequence of my own change, named per the brief's DECIDE-AND-NAME: `e2e/settings.spec.ts` S-2 and the nine screens' unit tests' shell-context mocks (`importOriginal` spread) assert the new behaviour; `settings-messages.test.tsx` has a default `pendingEmail` mock.
- `bunx playwright install webkit` was run once to give this computer the WebKit its browser guard names as the remedy; rule 50 names `bunx playwright install chromium` only. It downloads a browser and installs no package.
- Ceilings: six lines moved (§5); the sentence on each starts with this bundle's and keeps the earlier text after it.
- Stops and rulings in the turn: stop 1 (the plan; ruling 1), stop 2 (the migration; ruling 2), stop 3 (the staff gate's harness census; ruling 3).

## 11. CI

- The base: `92fee7d1a`, SUCCESS, run 45186382529 (the first six lines are at the top of this report's CI line).
- Red of an earlier turn on this base: none.
- This pull request's earlier runs: 45187492568 on adb10b7c3 was red in Lane 10 and Lane webkit: DLG-E12 (ruling 3 item 2: it is this lane's, fixed by `25e02df8f`); the evidence names it at the END of the lane's `e2e-last-failure.md` (I read only its top and the job logs first, ruling 3 CLASS 4). Run 45214184929 on 67331d799 was red in 14 jobs (the budget's ENTRY_CLOSURE and the staff lanes meeting the gate and DLG-E12), all fixed or removed by ruling 3's three decisions. No re-run was made.
- This run, 45226805289 on 9b179de17, the last code commit: every check passed (`gh pr checks 100`: 43 pass, 2 skipping — Promote to main, which runs only on `dev`, and the Lovable branch guard, which skips a lane that is not Lovable's; 0 fail), including Lane 10 and Lane webkit, so DLG-E12 is green on CI's webkit lane (the proof §1 and §12 left to CI), and Lane repeat. `branches/cursor/bundle-5/ci-status.md` for this commit, first six lines: `# CI Status (auto-generated — do not edit by hand)` · Commit `9b179de17871b81a6523e5020fdfe6c19d38802c` · Conclusion **SUCCESS** · Completed (UTC) 2026-11-23T17:51:22Z · Run https://github.com/tesfayekb/ethio-marketplace/actions/runs/45226805289 · Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-5eab8acab125… (0 read). Repeat: 30 of 232 tests repeated; flaky 0. AU-3 (INC-1269) was not red, so it is not named as one.

## 12. Limits

- `webkit-1280`: DLG-E12 is red on this computer's WebKit at e2e/dialogs.spec.ts:833 (after passing :816), on origin/dev's own tree too; the CI webkit lane is the proof, and it passed (§11). DLG-E12's `listFacts` after the move, at :816, pass on `desktop-1280` and `mobile-360`.
- ACS-E3 and ACS-E4 need the temporary backend's mail sink (E2E_LOCAL_BACKEND=1); staging has none; CI's lanes are their proof.
- The six notices go through the auth service's shared `email_sent` limiter (30); I did not exercise the limit.
- `[ssr-error]` counts were not read from the local browser runs; `bun run checks` does not run browsers.
- `bun run checks` NOT RUN steps: §5, each with its reason.
- Not mine, not run: the hosted projects' settings, the staging and production applies, the read-backs.
- Scratch copies under `/tmp/ethio-scratch/cursor-bundle-5/` (the base build in `dev-base/`, the 3-decimal size check in `sz/`, the logs and edit scripts) are the operator's to remove.

THE OPERATOR'S SETTINGS — per hosted project, ethio-staging first and then ethio-prod, AFTER Publish, in this order (by the Management API's key, or the dashboard places as the docs name them):
1. `security_update_password_require_current_password` = true. Authentication → Sign In / Providers → Email (the dashboard's label is read there by the operator). Only after this bundle's code, which sends `current_password`, is live (DEC-436).
2. `security_manual_linking_enabled` = false. Authentication → Sign In / Providers ("Allow manual linking"). Only after the code without Link Google and Unlink is live (DEC-435).
3. The six notices on: `mailer_notifications_password_changed_enabled`, `mailer_notifications_email_changed_enabled`, `mailer_notifications_identity_linked_enabled`, `mailer_notifications_identity_unlinked_enabled`, `mailer_notifications_mfa_factor_enrolled_enabled`, `mailer_notifications_mfa_factor_unenrolled_enabled` = true, each with its subject from `supabase/templates/subjects.json` and its template from `supabase/templates/<kind>.html` (Authentication → Emails, the "Email Templates" page, security notifications). The phone-changed notice stays off (no phone sign-in).
4. "Secure password change" stays ON (the hosted setting INC-1267's refusal comes from).
Each setting is read back after it is set; INC-564, INC-566 and INC-567 close when its setting is read back.

## 13. Findings

- DLG-E12 fails on this computer's WebKit at e2e/dialogs.spec.ts:833 on origin/dev's own tree (a press on another row's select does not open that row's list after `pressClear`), while CI's webkit lane passed it on dev: a difference between this computer's WebKit and CI's, or a latent race; unproven which. CI's webkit lane passed DLG-E12 on the final tree, which points at this computer's WebKit. Raised for the supervisor.
- INC-1271's cause is the panel's room (below); the test gains its mid-window case in Lovable's next bundle.
- The usage map's "/admin" entries for the gate's words moved to "component: staff-factor-gate" while the gate is unmounted; bundle 6's mount moves them back.
- Otherwise none beyond the K2 list: the census greps in §6 were read.

## 14. Records

DEC — the supervisor (G17), 2026-11-23, by the operator's paste: the staff second-factor gate (DEC-434) is wired in Cursor bundle 6, with its one harness helper and the server half (DEC-438); bundle 5 keeps the gate's component and unit tests unmounted. Reason: the gate reaches the staff sign-ins of thirty-one spec files; a change of that size is its own turn. (DEC-451)
DEC — the operator, 2026-11-23: the Unlink control goes with Link Google; the Settings methods list reads only; manual linking off at the server in both projects (widens DEC-433). (DEC-435)
DEC — the operator, 2026-11-23: the in-app current-password check stays beside the server's; the "password changed" notice on; the remaining gap is held in the private register; ACT-033 is its later turn. (DEC-436)
DEC — the operator, 2026-11-23: one security notice mail per kind, English then Amharic, from the repository's templates (CI and both hosted projects). (DEC-437)
DEC — the operator, 2026-11-23: DEC-434's server half is Cursor bundle 6, right after bundle 5. (DEC-438)
DEC — the supervisor (G17): the Settings page reads the server's user for the pending e-mail address, once on load and once after a change (CF-SESSION-3, one line). (DEC-439)
INC — a password change in a session older than 24 hours is refused with `reauthentication_needed` (hosted "Secure password change") and the page showed the generic line; fixed by `auth.errorReauthNeeded` (cursor-bundle-5). Class: a provider refusal with no word. Mechanism: `AUTH_REFUSALS` (`src/features/auth/auth-error-key.ts`). (INC-1267)
INC — `src/i18n/provider.tsx` (`useAuthIdentity`) subscribes to the auth state on its own, beside the shell's one store. Class: one session store (INC-1247). Owner: Cursor bundle 6. (INC-1268)
ACT — move the e-mail links (sign-up confirmation, e-mail change, reset) to the code flow, and name the vendor's silent automatic link (DEC-436). Owner: a later Cursor turn; its spec and the operator's yes first. (ACT-033)
INC — the Filters panel shows fewer than six choices when its button sits at the middle of a 900-pixel-tall window: DLG-E12 went red on run 45187492568 once the style board grew below the panel's button. Class: an anchored panel's room. Mechanism: the Filters panel (Lovable bundle 3). Owner: Lovable's next bundle; its test gains the mid-window case, red first. (INC-1271; my proof of decision 2 holds: red first on the unmoved board, green after, §1)
INC — the lane's `e2e-last-failure.md` lists its gating failures after the post-test sections, so a reader of its top sees none. Class: evidence a reader must scroll for. Mechanism: the failure reporter. Owner: Cursor bundle 6. (INC-1272)
INC — INC-1266 gains a third held reader: `src/features/auth/account-status.ts`, the signed-in person's status read, which sits on every page's first download.
INC — AU-3 (`e2e/admin-users.spec.ts`) is intermittent, owner bundle 6 (INC-1269); named here only if it is the one red on the final run.
Closures (each with what was built): INC-1260 (a ruling's widening joins its brief's SCOPE), INC-1261 (`chooseInList`, SLH-1, SLH-2), INC-1262 (the public-surface guard reads REVOKE), ACT-032 (the live staff-rule read), INC-1140 (the feed's retry calls `refreshPage`), INC-1141 (the list doors read after a key, Parts 2 and 3), INC-1247 (the nine callers on the shell's one store, CF-SESSION-5), INC-1258 (the pending e-mail read, DEC-439), INC-1264 (the status read, named and reported, INC-1266's shape); DEC-432 built (the records exception); DEC-433 built; DEC-434 built, not mounted (DEC-451), the server half named DEC-438.
INC-564, INC-566, INC-567: code half built (cursor-bundle-5); closes with the hosted setting.
register row — `src/features/auth/account-status.ts`: the signed-in person's status read, session first, named failure, carrying no typed failure (INC-1264, INC-1266); `scripts/conformance/auth-credentials.test.ts`: CF-AUTH-1 (a password is set with the current one; no link or unlink from the browser); `src/features/auth/mfa/staff-factor-gate.tsx`: the staff second-factor gate, built, unmounted until bundle 6 (DEC-434, DEC-451); `e2e/helpers/mail-sink.ts`: the temporary backend's mail sink, read (DEC-437).
changelog — Cursor bundle 5: a password changes only with the current one checked by the server (Link Google and Unlink leave Settings), the person is told when the other devices stayed signed in and when an e-mail change still waits, six security notices exist in the repository's templates, one session store feeds the nine screens, the status read is named and carries no typed failure, the list doors read after a key, and the staff second-factor gate is built and waits for bundle 6.
roadmap — the account-security line: built except the staff gate's mount (DEC-451, bundle 6 with DEC-438); the hosted settings are the operator's (§12).
slip — none.
