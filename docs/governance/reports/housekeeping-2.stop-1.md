STOP — housekeeping-2 STEP 1: the census (the brief's planned stop), with seven questions where the census proves a premise wrong or finds a tradeoff
DONE: STEP 0 (brief saved by scripted copy, sha256 equal; roadmap line 3; briefs-allowlist.txt read; CI read); STEP 1 census, complete
LEFT: STEPS 2 → 7 (Parts A, B, C; the checks; the push; the report)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `3e63743cc2535071ee9708d9f5fe3460990ee35e` (short `3e63743`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-11T03:31:22Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42950754366
FILES: (`git diff --name-only 2b11a9d29`, the whole lane; this turn's own files so far are `docs/governance/briefs/housekeeping-2.md`, `roadmap.md` and this report)
bun.lock
docs/features/ci-guards.md
docs/features/ci-status-reporter.md
docs/features/nightly-e2e.md
docs/features/performance-strategy.md
docs/features/posting.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-1-ruling-1.md
docs/governance/briefs/housekeeping-1-ruling-2.md
docs/governance/briefs/housekeeping-1-ruling-3.md
docs/governance/briefs/housekeeping-1-ruling-4.md
docs/governance/briefs/housekeeping-1-ruling-5.md
docs/governance/briefs/housekeeping-1.md
docs/governance/briefs/housekeeping-1b-ruling-1.md
docs/governance/briefs/housekeeping-1b-ruling-2.md
docs/governance/briefs/housekeeping-1b-ruling-3.md
docs/governance/briefs/housekeeping-1b.md
docs/governance/briefs/housekeeping-2.md
docs/governance/briefs/lockfile-ruling-1.md
docs/governance/briefs/lockfile.md
docs/governance/reports/housekeeping-1.report.md
docs/governance/reports/housekeeping-1.stop-1.md
docs/governance/reports/housekeeping-1.stop-2.md
docs/governance/reports/housekeeping-1.stop-3.md
docs/governance/reports/housekeeping-1.stop-4.md
docs/governance/reports/housekeeping-1.stop-5.md
docs/governance/reports/housekeeping-1b.report.md
docs/governance/reports/housekeeping-1b.stop-1.md
docs/governance/reports/housekeeping-1b.stop-2.md
docs/governance/reports/housekeeping-2.stop-1.md
docs/governance/reports/lockfile.report.md
docs/governance/reports/lockfile.stop-1.md
e2e/i18n-sign-in-language.spec.ts
package.json
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/chunk-modules-plugin.d.mts
scripts/chunk-modules-plugin.mjs
scripts/ci/checks-cache.ts
scripts/ci/laws-changed.ts
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/choice-lists.test.ts
scripts/conformance/lockfile-hosts-allowlist.txt
scripts/conformance/lockfile-hosts.test.ts
scripts/conformance/overlays.test.ts
scripts/conformance/press.test.ts
scripts/conformance/visible-area.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
scripts/route-budgets.d.mts
scripts/route-budgets.mjs
src/components/marketplace/feed.tsx
src/components/picker-popup.ts
src/components/searchable-picker.test.tsx
src/components/searchable-picker.tsx
src/components/shell/app-rail.tsx
src/components/shell/block-guide.tsx
src/components/shell/data-table.tsx
src/components/shell/favourite-category.ts
src/components/shell/rail-first-paint.test.tsx
src/components/shell/rail-variant.ts
src/components/shell/submenu/submenu-signal.ts
src/components/shell/theme-toggle.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/badge.tsx
src/components/ui/button-variants.ts
src/components/ui/button.tsx
src/components/ui/calendar.tsx
src/components/ui/choice-list-look.test.tsx
src/components/ui/dialog-look.test.tsx
src/components/ui/form.tsx
src/components/ui/keep-in-strip.ts
src/components/ui/one-line-slot.test.tsx
src/components/ui/one-line-slot.tsx
src/components/ui/overlay-ask.ts
src/components/ui/overlay-facade.tsx
src/components/ui/overlays-impl.ts
src/components/ui/pagination.tsx
src/components/ui/section-notice-state.ts
src/components/ui/section-notice.tsx
src/components/ui/slot-split.ts
src/components/ui/strip-arrows.tsx
src/components/ui/submenu-impl.tsx
src/components/ui/submenu-levels.ts
src/components/ui/toggle-group.tsx
src/components/ui/toggle-variants.ts
src/components/ui/toggle.tsx
src/features/ad-page/share-ad.tsx
src/features/ad-page/share-price-text.ts
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-attributes/attribute-error.ts
src/features/admin-attributes/category-attributes-dialog.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-categories/category-dialogs.test.tsx
src/features/admin-categories/category-dialogs.tsx
src/features/admin-categories/category-form-fields.tsx
src/features/admin-categories/category-form-values.ts
src/features/admin-categories/category-image-dialog.tsx
src/features/admin-categories/category-submit-error.ts
src/features/admin-countries/country-dialog-state.ts
src/features/admin-countries/country-dialogs.test.tsx
src/features/admin-countries/country-dialogs.tsx
src/features/admin-countries/country-editor.tsx
src/features/admin-countries/country-verb-dialogs.tsx
src/features/admin-listings/edit-listing.ts
src/features/admin-locations/location-dialog-state.ts
src/features/admin-locations/location-dialogs.tsx
src/features/admin-locations/location-editor.tsx
src/features/admin-locations/location-form-fields.tsx
src/features/admin-locations/location-form-values.ts
src/features/admin-locations/location-verb-dialogs.tsx
src/features/admin-locations/locations-service.test.ts
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/photo-changes.tsx
src/features/admin-screening/photo-reviews.tsx
src/features/admin/admin-context.tsx
src/features/admin/admin-shell-provider.tsx
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/posting/amount-scale.ts
src/features/posting/edit-step-changes.ts
src/features/posting/field-refusals.ts
src/features/posting/field.test.ts
src/features/posting/field.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/map-snap.ts
src/features/posting/map/outline.test.ts
src/features/posting/phone-number-field.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/listing-section.ts
src/features/posting/preview/photo-gallery.tsx
src/features/posting/same-channels.test.ts
src/features/posting/same-channels.ts
src/features/posting/spec-sentences.ts
src/features/posting/step-details.tsx
src/features/posting/step-photos.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-review.tsx
src/features/posting/step-specifications.test.ts
src/features/posting/step-specifications.tsx
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
src/features/posting/wizard.tsx
src/i18n/i18n-context.ts
src/i18n/index.ts
src/i18n/provider-d239.test.tsx
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/providers/theme-context.ts
src/providers/theme-provider.tsx
src/routes/admin.tsx
src/routes/l.$slug.tsx
src/test/own-key-sites.test.ts
vite.config.ts

The questions follow the census. Every file:line below was read on the lane's head 3e63743cc (`git rev-parse HEAD` and `origin/cursor/housekeeping` both 3e63743cc2535071ee9708d9f5fe3460990ee35e before the STEP 0 commit 97ff6b649). Between the brief's base dev 2b11a9d29 and the lane's head, e2e/ differs in one line (`git diff --stat 2b11a9d29..3e63743cc -- e2e`: e2e/i18n-sign-in-language.spec.ts, 1 deletion).

## STEP 0

- `git fetch origin dev main ci-evidence cursor/housekeeping`; already on `cursor/housekeeping`; `git merge --ff-only origin/cursor/housekeeping` → "Already up to date."; head 3e63743cc; `git status --short` empty before the save.
- The brief: `/Users/tesfayemackbookpro/Downloads/housekeeping-2/housekeeping-2.md`, sha256 6fa54ab7d3a4fa4f8c439771b5d337b1b71096e8444da96c01de5e703268e35a (equal to the stated value). Saved by scripted copy into `docs/governance/briefs/housekeeping-2.md` inside one four-backtick `text` fence (the brief holds no fence of its own: `grep -c '````'` → 0); the fenced text re-hashes to the same sha256. The saved file carries `Base: dev 2b11a9d29` at its line 4.
- Roadmap line 3 written as dictated; `bunx prettier --check roadmap.md docs/governance/briefs/housekeeping-2.md` → "All matched files use Prettier code style!".
- `scripts/conformance/briefs-allowlist.txt`: header only, no line keyed to any brief — none removed (as the brief expected).
- `bunx vitest run scripts/conformance/briefs.test.ts` with this brief in force: 3 passed.
- Commit 97ff6b649 `housekeeping-2: task saved`. The staged diff was read for secret-shaped text: only prose ("key" in "CENSUS-ITEM key" and kin).
- CI for the lane's head: ci-status.md above names 3e63743cc, SUCCESS (both steps of rule 40's read agree). Pull request #34 (draft): `gh pr checks 34` → 41 SUCCESS, 1 SKIPPED, on head 3e63743cc. guards-last-failure.md names run 42950754366 on 3e63743cc; e2e-last-failure.md: "last E2E run 42950754366 passed".

## 1. The COUNT lines, re-run on the lane's head

| COUNT line | brief | measured | hits |
| --- | --- | --- | --- |
| `rg -n "^async function asPerson" e2e \| wc -l` | 7 | 7 | legal-certify :63, my-listings-page :66, my-listings-ad :66, admin-listings :90, ad-page-doors :56, my-listings-doors :94, legal-doors :59 |
| `rg -n "^async function rpcResult" e2e \| wc -l` | 3 | 3 | my-listings-doors :59, admin-screening :76, admin-listings :68 |
| `rg -n "function grantRole" e2e \| wc -l` | 14 | 14 | shared users.ts :418; ten `(userId, roleName)`: rbac :17, shell-table-law :17, shell :46, category-image-routes :49, i18n-coverage :71, admin-users :30, admin-audit :42, auth-signout :51, mfa-stepup :29, admin-roles :41; three `(wanted, person)`: my-listings-ad :281, my-listings-doors :302, ad-page-doors :141 |
| `rg -n "rules-of-hooks" e2e \| wc -l` | 5 | 5 | helpers/categories.ts :252, helpers/translations.ts :282, admin-roles :79, i18n-coverage :115, admin-audit :86 |
| `setAmharicAccount` | one | one | i18n-coverage :108 (declared), :264 and :289 (called) |

(Files are `e2e/<name>.spec.ts` unless a path is given.)

## 2. Copies the COUNT lines do not catch (the floor, not the scope)

The brief covers these ("any copy the census finds beyond the COUNT lines is covered here"). They change the size of Part C, so I list them all before any code.

REST door callers (class 1, the REST side):
- Every `asPerson` copy sits on two more spec-local copies: `restBase()` (legal-certify :40, my-listings-page :43, my-listings-ad :43, admin-listings :80, ad-page-doors :33, my-listings-doors :71, legal-doors :36) and `answerOf(response)` (six of the seven; admin-listings inlines it at :97). The six `answerOf` bodies are identical apart from one blank line; only the error tag in `restBase` differs.
- The seven `asPerson` bodies agree on `rpc` (four default `args` to `{}`, three do not). They differ in what else they return: `select(table, query)` (my-listings-ad :86), `rest(path)` + `insert(path, body)` (ad-page-doors :73–:81), `rest(path, { method, body })` (my-listings-doors :112–:119), `notices(listingId)` + `insertNotice(row)` (admin-listings :121–:133), `userId` (legal-doors :76).
- Two anonymous REST callers of the same shape: `asAnonymous()` (ad-page-doors :86), `asAnon()` (legal-doors :81). The shared `anonRpc` (session.ts :202) answers `{ status, body }`, a different shape.
- A spec-local `bearerClient` (admin-users.spec.ts :47), a copy of session.ts :226's "THE ONE BEARER CLIENT".
- A `restBase` copy in admin-monetisation :379 and in e2e/helpers/seller-name.ts :10 (a helper).
- A raw password grant: legal-admin.spec.ts :702 (`fetch(.../token?grant_type=password)`), while `passwordGrant(…, { fresh: true })` (session.ts :157) exists for exactly that need.

Page-client door callers (class 1, the page side). Two return shapes: `{ data, error: string | null }`, or the error text alone.
- `{ data, error }`: `rpcResult` ×3 (above); `door` (my-listings-levels :148, already on `inBrowserClient`); `rpcAsPage` (posting-routes-dials :42, admin-services :52, both by cast).
- error only: `rpcFromBrowser` (admin-screening :52, admin-audit :69, mfa-stepup :45, admin-roles :57 — by cast; admin-users :56 — on `inBrowserClient`); `doorError` (admin-monetisation :345, on `inBrowserClient`).
- `clientReady` (admin-listings :59, my-listings-doors :50): a hand-written wait for the client, the job `awaitBrowserClient` (browser-client.ts :72) does.

Role grants (class 2):
- `grantAdmin(userId)` (one-line-slots.spec.ts :184) is `grantRole(userId, "admin")` under another name; one-line-slots-admin.spec.ts :64–:77 does the same for super_admin inline.
- The scratch role with permissions, beyond the three `grantRole` copies: `scratchHolder(wanted)` in admin-listings :294, admin-screening :270 and admin-monetisation :494 (the same body, leasing its own holder). Built inline inside a test in admin-screening SC-16 (:378), admin-translations-console TR-10 (:437) and "TR-scope AI" (:920), admin-attributes-import AT-23 (:1190), admin-attributes-library AT-14 (:788), admin-attributes-editor AT-34 (:387), admin-categories-lifecycle CT-22 (:1868), admin-listings AL-31 (:2161), legal-admin LGA-21 (`makeRole`, :1033). door-refusals.spec.ts :49 `grantScopedRole(userId, roleName, country)` is a country-scoped grant: a different act.

Harness helpers named `use…` (class 3): see Q5 — the five disables are two helpers, not five.

Direct `profiles.preferred_language` writes in specs (class 5): see Q7 — four more specs, of two different acts.

## 3. The three other-signature `grantRole` bodies

my-listings-ad :281, my-listings-doors :302 and ad-page-doors :141 are the same function on the passing path: insert a role `e2e_mylistings_role_<token()>`, push its id to the describe's reap list at once, read the permissions by resource, filter to the wanted pairs, `expect(picked).toHaveLength(wanted.length)`, insert `role_permissions`, insert `user_roles` (global), return the person. Differences:
- ad-page-doors throws when the permission read fails (`permsError`, :158); the other two ignore it and fail at the length assertion instead. Only the failure text differs.
- The error tag (`[e2e:mla]`, `[e2e:ml]`, `[e2e:ap]`) and the reap list's name (`roles`, `roles`, `reportRoles`).
- Each spec's afterEach reaps the role (my-listings-ad :193–:200 and my-listings-doors :211–:218: role_permissions, user_roles, roles; ad-page-doors :128–:137: user_roles, role_permissions, roles).
No behaviour difference: DECIDE-AND-NAME (G17) — one `grantScratchRole` with the stricter read (the failing path names its cause). See Q4 for its signature.

The ten same-signature copies match users.ts :418 except for the error tag; category-image-routes :55 uses `.maybeSingle()` where the others use `.single()`, which changes only the message on a missing role. No behaviour difference: they are deleted and their specs import users.ts's (DECIDE-AND-NAME).

## 4. INC-1100 — the reading (product code read only, nothing changed)

- **What "published" means.** A language is published when its `languages` row has `enabled_public OR is_base`. The client's gate list is exactly that query (src/i18n/provider.tsx :116–:121, `fetchPublicLanguages`, anon REST, `cache: "no-store"`), and the door applies the same predicate (supabase/migrations/20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql :98–:104: `l.is_base OR l.enabled_public`, else `languageNotPublished`).
- **The account rule** (provider.tsx :460–:531) runs at every session start: each sign-in and each page load that finds a session. It is latched per user id per mount (:494) and waits for the boot read, the auth settle and the gate (:488). It reads `profiles.preferred_language` through the signed-in client (src/features/auth/preferred-language.ts :68–:72), fresh each time, with no cache. A published code replaces the device's choice: the star, the cookie and the current language (:516–:524). An unpublished code changes nothing. A NULL account RECEIVES THE DEVICE'S CURRENT LANGUAGE through the door, fire-and-forget (:505–:514 → preferred-language.ts :92).
- **How the door writes** (the same migration, :86–:122): `door_context('owner', …, 'account_pref')` (spends the `account_pref` dial; 60 an hour per ui.ts :1017), the publication gate, capture of the old value, `UPDATE profiles SET preferred_language = p_code, updated_at = now() WHERE user_id = <caller>`, `door_audit(… 'profile.preferred_language' …)`, and the answer `{ok: true, language}`. It accepts NULL (the gate only checks a non-NULL code).
- **Is the test's direct write read the same way?** Yes. The rule reads only the column; `updated_at`, the audit row and the dial are never read by it. A service-role write of the column is read at the next session start exactly as the door's write is, provided nothing writes the column after it. `src/i18n/server-shell-language.ts` (named in INC-1100's text) reads no profile: the server always declares the base language (:10–:16), so it is not on this path.
- **What the reading shows about the failure.** It is not a product defect; it is an ordering race in the test.
  - `signIn` (e2e/helpers/ui.ts :524) returns once the session is stored and the account menu shows. It does not wait for the account rule.
  - The leased account starts NULL (users.ts :332 at the reap), so the rule's first run writes the device's English to the account through the door. That takes two round trips after the sign-in: the read, then the door.
  - `setAmharicAccount` writes "am" in one round trip, starting after `signIn` returns.
  - When each round trip crosses the internet (a local run against ethio-staging), the browser's two-trip write of "en" lands after the test's "am". The next load then applies the account's "en" over the device's "am", and the whole chrome turns English, as INC-1100 records.
  - On CI's temporary backend (127.0.0.1), the browser's chain finishes inside `signIn`'s own waits, the test's write lands last, and the test passes.
  - This explains the reported facts (deterministic on staging, in both projects, green on CI), but it is a reading, not a measurement. The new helper's settle step and its assertion will show it on the first local run.
- Two facts beside it. The roles-matrix test (i18n-coverage :277) asserts nothing about `<html lang>` after setting Amharic, so a page that did not take the language fails only at the vocabulary check; the admin-shell test (:256) does assert it at :266. And `resetLanguageBaseline`'s comment (ui.ts :1006–:1007) says the door "cannot express 'unset'", but the door accepts NULL now (finding F5).

## 5. LGA-21 (INC-1073)

- e2e/legal-admin.spec.ts :1012 (the test), :1103–:1117 (the write). The test reads every `enabled_admin` language, drops en, am and `PSEUDO_LANG`, and inserts a `legal_version_texts` row into its own version for each — other workers' scratch fence languages included.
- Why it writes them: its last assertion (:1121–:1123) is that the publisher's in-force card shows NO "Add translation" control (`legal-translate-inforce` count 0) once every language has a text. Any `enabled_admin` language without a text, another worker's scratch language included, keeps that control on the card.
- What its afterEach deletes (:60–:85): `destroy(kind)` for its kinds (acceptances, notices, versions, documents; the texts go with the version by `version_id … ON DELETE CASCADE`, migration 20261021222432 :5); then its own `languages`; then its roles. I did not read whether `legal_version_texts_finality` (the same migration, :21 and :50) lets that cascade through. It deletes nothing it wrote for another worker's language, and does not need to: the rows go with its version.
- The cross-worker harm: `language text NOT NULL REFERENCES public.languages(code)` (:6) has no cascade, so while LGA-21's version holds a text in the other worker's scratch language, that worker's afterEach cannot delete its language.
- The premise conflict: the brief's fix (4), "writes its texts only for its own scratch language(s) and the base", makes the assertion at :1123 fail whenever another worker's scratch language is enabled. See Q6.

## 6. The existing brief laws (Part A's ground)

- scripts/conformance/briefs.test.ts: pure functions `baseFindings` (CF-BRIEF-1), `stopRuleFindings` (CF-BRIEF-2), `scopeFindings` (CF-BRIEF-3) over `(text, file)`, returning `{ file, line, what }`. The brief in force comes from `briefInForce()` (scripts/ci/laws-changed.ts :58–:61) and its rulings from `^<stem>-ruling-\d+\.md$`. Allowlist keys are `<file>:<line> <what>` through kit.ts `readAllowlist`. CF-BRIEF-4 is the self-test on an inline planted brief. Line numbers are those of the saved file (the fence's three header lines shift them by three).
- The move keeps the three functions' behaviour, their allowlist key form and CF-BRIEF-1 → 4's titles. The module adds `law` to each finding (`{ law, file, line, text }`), and the key stays `<file>:<line> <text>` (DECIDE-AND-NAME: the brief's `{ law, line, text }` plus the file the allowlist key needs).

## 7. Test ids, and the lists a new name must join

- Free (`rg -n "<id>\b" src e2e scripts` → 0 each): CF-BRIEF-5 → CF-BRIEF-15, CF-HELPERS-1 → CF-HELPERS-4. CF-E2E-WAIT-1 and CF-E2E-PLACE-1 exist (scripts/conformance/e2e-waits.test.ts), as the brief says.
- `scripts/conformance/wired.test.ts`: its domain takes every `scripts/**/check-*` file, so `scripts/brief/check-go.ts` needs a caller named by basename in a workflow, a package.json script, or a test under scripts/. Both other homes are out of scope (FLAG no-package-change; nothing under .github/), so a test must run it: briefs.test.ts's self-test spawns `bun scripts/brief/check-go.ts` on a planted fixture. wired.test.ts gains named-caller assertions beside its CF-BRIEF lines (:196–:199). `go-laws.ts` is not in the domain by name; the named caller covers it.
- kit.test.ts CF-KIT-7 (:135): a `readAllowlist` caller must hand its census's finding keys. Both new censuses do (`findings.map(keyOf)` / `keys`), so `scripts/conformance/allowlist-keys-allowlist.txt` gains no line.
- scripts/e2e-select.ts: a helper's importers are found through the import graph (the header, :10–:11), and no spec changes area, so a new helper module joins no list. The repeat lane (DEC-283) repeats every spec importing a changed helper, ranked after the changed specs, within its time budget (`REPEAT_MAX_EACH`/`take`, :606–:622). This turn changes e2e/helpers/ui.ts (Q5's rename), which 108 of 117 specs import directly, so the repeat lane will repeat the changed specs first and then only those of the other specs that fit. DEC-364's judge ("the repeat lane green") is met on that partial set.
- CF-DOOR-1 (scripts/conformance/door-answers.ts :147–:171) finds door calls as `x.rpc("<door>")` or a plain identifier call with a door literal (`rpcResult(page, "<door>")`). A shared `asPerson(…).rpc(…)` and a shared identifier-called page helper both stay visible to it, so no list changes.
- CF-BC-1 (scripts/conformance/browser-client.test.ts, allowlist browser-client-allowlist.txt, 18 files, "a count only falls"): every spec that drops a hand-read of `window.__ethioSupabase` must lower or delete its line in the same commit, or CF-BC-1 fails on a stale line. The files this turn would touch there: admin-listings (4), admin-screening (8), admin-audit (4), admin-roles (4), mfa-stepup (4), my-listings-doors (4), posting-routes-dials (2), admin-services (4). The allowlist file is in the standing allowance (`scripts/conformance/*-allowlist.txt`).
- Names read by text outside e2e/ (so a rename leaves them stale): `useJobSuperAdmin` in comments of scripts/check-identity-tags.sh :8, scripts/e2e-leases.ts :18 and the fixture text of scripts/e2e-leases.test.ts :27, :76, :81 (all outside SCOPE — K2, see F3); in docs/features/e2e-harness.md :437, docs/features/step-up-auth.md :184, docs/features/admin-listings.md :134 (in the standing allowance; updated). `rpcResult` in scripts/conformance/door-answers.ts :17 (a comment) and door-answers.test.ts :42, :100 (fixture text) stays valid as an example of a wrapper.

## 8. The first-download table at the lane's head

`bun install --frozen-lockfile` ("Checked 607 installs across 700 packages (no changes)"), then `bun run build` (exit 0) and `node scripts/check-bundle-size.mjs` (exit 0): "JS: 206.0 KiB / 207 KiB — ok", "CSS: 23.1 KiB / 40 KiB — ok", "Bundle budget OK." Each page (first download / ceiling, KiB): / 227.0/228 · /$name 225.0/233 · /account 268.2/269 · /account_/legal 208.6/209 · /account_/legal_/$versionId 209.2/210 · /account_/saved 225.2/233 · /admin 206.9/208 · /admin/ 207.7/209 · /admin/ai 319.5/320 · /admin/attributes 332.8/334 · /admin/audit 292.6/293 · /admin/categories 340.8/342 · /admin/countries 322.3/323 · /admin/images 207.5/208 · /admin/impersonation_/$sessionId 287.7/289 · /admin/legal 278.5/279 · /admin/legal_/$versionId 275.9/277 · /admin/legal_/edit 277.5/278 · /admin/listings 344.1/345 · /admin/listings_/$listingId 346.5/354 · /admin/listings_/$listingId_/edit 405.7/407 · /admin/locations 267.6/269 · /admin/monetisation 330.1/331 · /admin/places 323.9/325 · /admin/roles 289.4/290 · /admin/roles_/$roleId 270.2/271 · /admin/screening 365.5/366 · /admin/translations 300.2/301 · /admin/translations_/$lang 303.8/305 · /admin/users 289.5/290 · /admin/users_/$userId 284.7/286 · /auth 223.2/231 · /auth_/callback 210.0/217 · /auth_/reset 212.0/219 · /c/$slug 227.0/228 · /dev/primitives 227.1/228 · /dev/style 247.9/249 · /dev/tall 206.3/207 · /l/$slug 257.1/265 · /legal/$kind 210.7/212 · /legal/accept 217.6/219 · /legal/publishing 211.4/212 · /my-listings 314.9/316 · /my-listings_/$listingId 322.7/324 · /my-listings_/$listingId_/edit 400.7/402 · /post 400.7/402 · /post_/$listingId 400.6/402 · /privacy 210.7/212 · /settings 276.8/284 · /terms 210.7/212. No src/ change is planned; the table is re-read after the build at STEP 5 and reported "unchanged" only if it is.

## 9. What check-go.ts would print on this brief at the lane's head, as the laws are written (the census's corrections)

- CITED PATH (5): `scripts/brief/go-laws.ts` and `scripts/brief/check-go.ts` (THE SYSTEM A: "built as" — the SCOPE's "new" names them only by bare file name); `docs/governance/reports/housekeeping-2.report.md` (the stem line) and `docs/governance/reports/housekeeping-2.stop-1.md` (STEP 1), the turn's own outputs; `e2e/*.spec.ts`, a glob. Passing by the law's own exception: `docs/governance/go-template.md` (SCOPE "(new)"), `scripts/conformance/e2e-helpers.test.ts` and its allowlist ("new").
- CITED LINE (6): every anchor holds: session.ts :157 `passwordGrant`; browser-client.ts :85 and :94 `inBrowserClient`; door-answer.ts :58 `doorAnswer`, :70 `doorRefusal`; users.ts :418 `grantRole`, :401 `leaseUser`, :12 `adminClient`; my-listings-ad :281, my-listings-doors :302, ad-page-doors :141 `grantRole`; i18n-coverage :108 `setAmharicAccount`; legal-admin :1012 LGA-21; preferred-language.ts :70 (the read), :92 (the door).
- FREE ID (7): `CF-E2E-WAIT-1` and `CF-E2E-PLACE-1` (raw line 31: cited as existing, beside "free"). The backticked examples (`TCK-7`, `CF-LOCK-1`, `BC-14`) are quotations under CF-BRIEF-2's window rule.
- COUNT (10): "±2 lines" (law 6's tolerance, raw line 10) is a bare number before "lines". The four COUNT lines hold (7, 3, 14, 5).
- TITLE (11): `housekeeping-2: task saved`, 26 characters.
- OPTION (8), ASSERT (9): no such lines. ALLOWANCE (13): no line.
- CF-BRIEF-15: see Q1 (b).

## 10. Mechanisms that already serve each concern (read before any proposal)

`passwordGrant`, `anonRpc`, `bearerClient`, `injectSession` (e2e/helpers/session.ts); `awaitBrowserClient`, `inBrowserClient`, `BrowserClient` (browser-client.ts) with CF-BC-1/2; `doorAnswer`, `doorRefusal` (door-answer.ts) with CF-DOOR-1; `leaseUser`, `grantRole`, `adminClient` (users.ts); `useJobSuperAdmin`, `mintPrivateSuperAdmin`, `resetLanguageBaseline`, `signIn`, `switchLanguage`, `watchAccountLanguage`, `consumeAccountLanguage` (ui.ts); `ensureFenceLanguage` (translations.ts :198); for briefs: `briefInForce`, `turnBase` (scripts/ci/laws-changed.ts), kit.ts (`readAllowlist`, `report`, `codeOf`, `walkFiles`).

## Questions (a tradeoff or a premise the census proves wrong; each with my recommendation)

**Q1 — Part A: where the tree laws run (a tradeoff).** Laws 5, 6, 7, 9 and 10 judge the brief against the tree it was written on. `briefs.test.ts` runs on the executor's working tree and in CI's `component-tests` job. That job's checkout is `actions/checkout@v5` with the default depth (.github/workflows/ci.yml :156, no `fetch-depth`), so the brief's base commit is not in its clone, and nothing under .github/ is in scope.
- On the working tree, this turn itself turns those laws red as it lands. After Part C, `COUNT: 7 := rg -n "^async function asPerson" e2e | wc -l` prints 0; the cited `setAmharicAccount` at i18n-coverage :108 is gone; `CF-HELPERS-1` ("new") is used.
- (a) Recommended: `briefs.test.ts` runs the text laws on the brief in force and its rulings: CF-BRIEF-1 → 4 as today, plus TITLE (11), ALLOWANCE (13) and CF-BRIEF-15. It runs every law's code, tree laws included, on planted fixture trees in a scratch directory (the self-test, 14), so CI proves each law can fail. The tree laws run through `check-go.ts` on a named root: the supervisor's lock-exact clone before sending, and mine at STEP 0 on the tree as saved, before any change, with the output pasted into the census. That is "when it is saved", read as the moment of saving.
- (b) Alternative: the tree laws run in `briefs.test.ts` against the working tree, and every line the turn moves gets an allowlist line (churn every turn).
- (c) Alternative: they run against the base through git objects, which needs `fetch-depth: 0` in component-tests (a .github change, a later turn).
- CF-BRIEF-15 has a related gap. Read as "the brief in force's STEP 1 names every key", THIS brief fails it: its STEP 1 names lists, the first-download table, premises and findings, but not consumers, second readers, the chunk graph, the build environments or the existing mechanisms (most appear elsewhere in the brief). I recommend that CF-BRIEF-15 read STEP 1 of the brief AND its rulings, and that ruling 1 carry the line "CENSUS-ITEM <key>: not applicable — <why>" for each key this brief's STEP 1 does not name. The alternative is to widen the law to the whole brief text, where words like "chunks" in law 10's noun list would satisfy keys by accident.

**Q2 — Part C (1), the page side: the class is wider than the brief, and CF-HELPERS-3 duplicates an existing guard (a premise wrong).**
- Beyond the three `rpcResult` and `door()` there are ten more page-client door wrappers: five `rpcFromBrowser`, two `rpcAsPage`, one `doorError`, two `clientReady` (§2).
- CF-HELPERS-3 ("an `as unknown as { __ethioSupabase` cast outside e2e/helpers/browser-client.ts") is the concern CF-BC-1 already guards, with an allowlist of 18 files whose counts only fall. Ten of those files cast inline inside a test body; they are not wrappers and not in the brief's five classes. With an empty allowlist at birth, CF-HELPERS-3 would fail on all of them. A second guard for one concern is a second mechanism (K1).
- Recommended:
  - One shared page door caller over `inBrowserClient`, answering `{ data, error: string | null }`, so the six `{ data, error }` copies call it as they are and the six error-only copies read its `.error`; assertions stay byte for byte.
  - Its home: a new e2e/helpers module beside the REST caller (see Q3), because browser-client.ts is read-only in this turn's SCOPE.
  - Every named copy above moves onto it, and each touched file's CF-BC-1 line falls or goes.
  - CF-HELPERS-3 is dropped in favour of CF-BC-1, and the ids become CF-HELPERS-1 (local declarations), CF-HELPERS-2 (the `rules-of-hooks` disable) and CF-HELPERS-3 (the column write), with the self-test inside each.
  - The inline casts stay on CF-BC-1's allowlist (finding F1).

**Q3 — Part C (1), the REST side: the seven copies return different shapes (DECIDE-AND-NAME unless you rule otherwise).**
- Recommended: one module (I propose `e2e/helpers/door-callers.ts`; the brief offers session.ts or a new `rest-door.ts`) exporting:
  - `asPerson(person)` → `{ rpc(fn, args = {}), rest(path, init?), userId }` over `passwordGrant`, with the shared `answerOf` shape `{ data, error: string | null }`;
  - `asAnonymous()` → `{ rpc, rest }`, the same shape without a bearer;
  - the page caller of Q2.
- Each spec's extra member becomes a `rest` call at its call sites, by hand: `select(t, q)` → `rest(\`${t}?${q}\`)`; `insert(p, b)` → `rest(p, { method: "POST", body: b })`; `notices` / `insertNotice` → `rest`.
- The seven `restBase` and six `answerOf` copies go with them, and admin-users.spec.ts :47's `bearerClient` copy goes onto session.ts's.
- Left as findings: admin-monetisation :379 `restBase`, helpers/seller-name.ts :10 `restBase`, and legal-admin :702's raw grant (F2).

**Q4 — Part C (2), the scratch role (the name and its reach).**
- Recommended signature: `grantScratchRole(userId, wanted, reap: string[])` in users.ts. It pushes the role id onto the spec's own reap list immediately after creating the role (as all three do today, so a later failure still reaps), checks the permission read's error, and names the role `e2e_scratch_role_<letters>`. The brief's `(userId, permissions)` cannot keep the reap order without the list.
- The three `grantRole` copies move onto it, and so do the three `scratchHolder` bodies (§2: each becomes `grantScratchRole(holder.id, wanted, roles)` after its own `leaseUser`).
- `grantAdmin` (one-line-slots :184) moves onto `grantRole`.
- The nine inline in-test builds (§2) and one-line-slots-admin's inline super_admin grant stay as finding F4, unless you want them inside this turn too (each is a hand edit inside a test body).

**Q5 — Part C (3): the five disables are two helpers, not five (a premise wrong).**
- The two `use…` helpers: `useJobSuperAdmin` (e2e/helpers/ui.ts :1054; 168 references in 24 files) and `useAmharic` (i18n-coverage :88; 7 references, 1 file).
- Four of the five disables sit inside four copies of a one-line wrapper, `signInAsSuperAdmin(page) { return useJobSuperAdmin(page) }`: helpers/categories.ts :251 and helpers/translations.ts :281 (exported), admin-audit :85 and admin-roles :78 (local). 22 files name it.
- The name the body earns: `signInJobSuperAdmin` (it injects the pooled super admin's session and lands signed in, or mints a private one under `@private-identity`) and `setDeviceAmharic` (it writes the device's current-language record before the first paint).
- Recommended: rename both; delete the four `signInAsSuperAdmin` wrappers, so their 22 files call `signInJobSuperAdmin` (one act, one name — K1). This makes the rename a 24-file change plus the wrappers' callers, every one a hand edit.
- The alternative is to rename and keep the four wrappers without their disables, leaving two names for one act.

**Q6 — Part C (4), LGA-21: the brief's fix contradicts the test's own assertion (a tolerance: G38 forbids loosening it).**
- Writing only its own languages makes the "no Add translation" assertion (:1123) fail whenever another worker's scratch language is enabled (§5).
- (a) Recommended: J6's form ("invariants … exclude other tests' rows"). LGA-21 writes texts for its own scratch language(s) and the base set only. Its last check becomes: the card offers neither this test's language nor any non-scratch language, and any language it still offers is another test's `e2e-` scratch row. I would read the card's translate control (product code, read only) to find what it exposes for that judgement; if it exposes only the first missing language, this needs a further ruling.
- (b) Alternative: LGA-21 keeps its write and the last assertion, and moves to a serial `@global-state` run (J8, nightly only), which leaves the gating lanes.
- (c) Alternative: the last assertion is deleted. That is a weakened proof, which I do not recommend.

**Q7 — Part C (5), the language helper and CF-HELPERS-4's reach (two acts behind one guard).**
- The helper, on the reading in §4 (no product defect, so no product STOP): `setAccountLanguage(page, userId, code)` in a new e2e/helpers/account-language.ts.
  - First it settles: it polls the account's column (service read, J4) until it is non-NULL, i.e. the session-start save of a NULL account has landed, with a bounded deadline and a named failure.
  - Then it sets the language the way the product does: `switchLanguage(page, code)` (ui.ts :1330), the switcher, which stars, sets the device and saves the account through `user_set_preferred_language` as the signed-in person, and asserts `<html lang>`.
  - It polls the column until it equals `code`.
  - It reloads with `watchAccountLanguage` armed and asserts `<html lang>` and the language control's code before returning (G38).
  - It records the user id for `restoreAccountLanguages()` in the spec's afterEach.
  - The door spends `account_pref` once per call (60 an hour); the job super admin's counters are cleared per borrower (INC-1071) and leases are reaped.
- CF-HELPERS-4 as written ("`.from("profiles").update({ preferred_language` outside the one helper", matched across the line break, because every site splits it) hits five more spec sites of a DIFFERENT act. They seed the stored column BEFORE the session starts, because the test's subject is the D239 rule itself:
  - i18n-sign-in-language :29–:36, a spec-local `setAccountLanguage(userId, code)` that takes NULL and unpublished codes. It has the brief's helper name, so CF-HELPERS-1 also flags it.
  - locale-format :59–:62; shell TR-37 :2479–:2483 and :2503–:2507.
  - Restores: locale-format :35–:38 and page-head :15–:18 put back the "prior" value (INC-377); shell :2527–:2530 and i18n-sign-in-language :86–:89 put back NULL.
- Recommended: the same module also exports `seedAccountLanguage(userId, code)` (a J5 fixture write before the session, any code, no proof by reload — the spec proves the rule) and `restoreAccountLanguages()` (the NULL baseline). Every one of those sites moves, and CF-HELPERS-4 holds with an empty allowlist.
- This changes the restore value in locale-format and page-head from "prior" to NULL. For a lease or the job super admin, "prior" is NULL at the lease (users.ts :332; ui.ts :1019) unless the read landed after the session-start save, which is the race again. NULL is what the next lease writes anyway.
- The alternative is to keep those two restores exact, which means `restoreAccountLanguages()` records the prior value per user.

## Decided and named under the laws (no question)

- D1 (K1, G17): the ten same-signature `grantRole` copies are deleted and their specs import users.ts's; only failure texts differ (§3).
- D2 (G17): `grantScratchRole` takes ad-page-doors' stricter permission-read check (§3).
- D3: briefs.test.ts's finding gains `law`; the allowlist key form stays `<file>:<line> <text>` (§6).
- D4: law 7's id pattern takes whole hyphenated ids (`CF-HELPERS-1`, never its `ELPERS-1` tail), because the brief's `[A-Z]{2,6}-[0-9]+` matches inside longer ids.
- D5: law 5 treats a glob as present when it matches a file.
- D6: the renamed helpers' mentions in docs/features/ are updated; those in scripts/ outside SCOPE are named as finding F3.
- D7: DEC-364's local runs are on desktop-1280, outside the sandbox. The three E2E values are set in this environment (names checked, never values).

## Findings (beyond the task; none is a security hole)

- F1: ten spec files read `window.__ethioSupabase` inline inside test bodies (on CF-BC-1's allowlist: admin-attributes-editor, -import, -library, -links, admin-categories-console, -lifecycle, import-security, post-wizard-bundle2, posting-routes-catalog, and my-listings-page :476/:488). They are not this turn's classes; each leaves CF-BC-1's allowlist when its spec is next touched.
- F2: legal-admin.spec.ts :702 builds its own password grant though `passwordGrant(…, { fresh: true })` exists; admin-monetisation :379 and e2e/helpers/seller-name.ts :10 keep their own `restBase`.
- F3: after Q5's rename, `useJobSuperAdmin` stays named in scripts/check-identity-tags.sh :8, scripts/e2e-leases.ts :18 (comments) and scripts/e2e-leases.test.ts :27, :76, :81 (fixture text) — outside SCOPE (K2).
- F4: nine tests build a scratch role inline, and one-line-slots-admin grants super_admin inline (§2).
- F5: ui.ts :1006–:1007 says the door "cannot express 'unset'"; the door accepts NULL since migration 20261106051900 (:98's gate checks only a non-NULL code). The fixture write is still right under J5; only the stated reason is stale.
- F6: INC-1100 is not yet in docs/tracking/incidental-findings.md (its text is in docs/governance/briefs/housekeeping-1b-ruling-3.md :12); INC-1065, INC-1049 and INC-1073 are (:5913, :5847, :5959).

## Limits

- Playwright does not start inside Cursor's sandbox (rule 20): the DEC-364 local spec runs happen outside it. CI's lanes and repeat lane are the two-project proof.
- The INC-1100 reading (§4) is from code, not from a run; the helper's settle step and its assertion are the measurement, at the first local run of i18n-coverage.spec.ts.
- I did not read `legal_version_texts_finality`'s body (whether it lets the version's cascade through); LGA-21's afterEach has passed in CI, which says it does today.
