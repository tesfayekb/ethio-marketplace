STOP — cursor-bundle-4 STEP 1: the census and the plan (PLAN FIRST)
DONE: STEP 0 (branch, brief saved, roadmap line 3, check-go), STEP 1 (this census)
LEFT: STEPS 2 → 9 (Parts 1, 2, 3; the gate; the records part; the push; the report)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `ce25a77513c7aed2ce500159dacb54f2c813545d` (short `ce25a77`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-22T23:44:00Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45084055511
FILES:
docs/governance/briefs/cursor-bundle-4.md
roadmap.md

# The census and the plan — read on the base

Base `ce25a7751` = `origin/dev` at the fetch (no files moved between them). Branch `cursor/bundle-4`, task-saved commit
`127359e1d` (not pushed alone; this report rides with it). The brief was saved by `cp` from the carrier folder:
`4c7dcf91a4561fbc15f53de8e500320adf5a2f8f09bd72105216289b44d6c40e  docs/governance/briefs/cursor-bundle-4.md`, equal to
the carrier's value. CI on the base: SUCCESS on `ce25a7751` (both steps of the SHA check agree; the run skipped its lanes,
the code tree being proven by run 45081574208), `guards-last-failure.md`: no failed job; nothing red to fix first.

`bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-4.md --root .`:

```
[check-go] no finding
```

Lovable's lane: `origin/lovable/next` at `0d0860242` differs from the base in `.lovable/plan.md` only. Its plan (read as
data) names the files its bundle 4 edits: the 12 pages that call `useTableFilters` (`ai-calls.tsx`, `categories-page.tsx`,
`countries-page.tsx`, `listings-page.tsx`, `locations-page.tsx`, `screening-page.tsx`, `audit-page.tsx`, `data-scope.tsx`,
`strings-page.tsx`, `users-list.tsx`, `my-listings-page.tsx`, `src/routes/dev.style.tsx`), `src/components/shell/**`, the
switch, the dialog parts, a new form select and the five named forms. None of this plan's files is among them (below).

Scratch for this census: `/tmp/ethio-scratch/cursor-bundle-4/` (the operator's to remove): `staff-rules.ts`,
`staff-rules-text.ts`, `by-table.ts`, `grants.ts`, `invokers.ts` (the policy and function reads, all through the
repository's own readers `scripts/doors/policies.ts` and `scripts/conformance/migration-reader.ts`), `page-carry.mjs` (bundle
1's measure, copied, wants widened), `carry-strings.mjs`, `base-size.log`, `base-page-carry.tsv`, `rooms.tsv`.

## consumers

### Concern 1 — a failed read reaches its page as one typed failure

The COUNT at the base: `rg -n "throw new Error\([A-Za-z.]*[eE]rror\.message\)" src --glob "!**/*.test.*" | wc -l` →
**26**, equal to the brief. Each, with the call above it:

| # | file:line | call | kind |
| - | --------- | ---- | ---- |
| 1 | src/features/posting/use-edit-draft.ts:138 | `.from("listing_photos").select` (staff path `readForStaff`) | read |
| 2 | src/features/posting/pricing-data.ts:68 | `.from("currencies").select` | read |
| 3 | src/features/posting/posting-service.ts:355 | `rpc my_listing_private` (after `notYourListing`) | read |
| 4 | src/features/posting/posting-service.ts:381 | `.from("listings").select` (`readDraft`) | read |
| 5 | src/features/posting/posting-service.ts:394 | `.from("listing_photos").select` | read |
| 6 | src/features/posting/posting-service.ts:406 | `.from("listing_locations").select` | read |
| 7 | src/features/posting/posting-service.ts:665 | `rpc my_seller_place` | read |
| 8 | src/features/posting/posting-service.ts:732 | `rpc my_last_listing_private` | read |
| 9 | src/features/posting/posting-service.ts:954 | `rpc my_seller_line` | read |
| 10 | src/features/posting/posting-service.ts:1090 | `.from("countries").select` | read |
| 11 | src/features/posting/posting-service.ts:1232 | `.from("listings").select` (`readPlaceText`) | read |
| 12 | src/features/my-listings/my-listing.ts:89 | `rpc my_listing` | read |
| 13 | src/features/my-listings/my-listing.ts:150 | `rpc listing_history` | read |
| 14 | src/features/my-listings/my-listing.ts:174 | `rpc listing_counts` | read |
| 15 | src/features/ad-page/save.ts:117 | `rpc my_saved_listings` | read |
| 16 | src/features/admin-screening/use-photo-reviews.ts:71 | `.from("listing_photo_reviews").select` (concern 2 moves it) | read |
| 17 | src/features/admin-screening/use-photo-changes.ts:75 | `.from("listing_photo_changes").select` (concern 2 moves it) | read |
| 18 | src/features/admin-screening/use-photo-changes.ts:114 | `.from("listing_photo_warnings").select` (concern 2 moves it) | read |
| 19 | src/features/admin-categories/category-images-service.ts:167 | `storage.list` inside the prune's `try`, caught and logged at :177 | storage, not a page read |
| 20 | src/features/admin-categories/category-images-service.ts:175 | `storage.remove`, same `try` | storage write, not a page read |
| 21 | src/features/admin-categories/category-images-service.ts:239 | `rpc admin_get_category_images` | read |
| 22 | src/features/admin-listings/listing-settings.tsx:45 | `.from("listing_policy").select` | read |
| 23 | src/features/admin-listings/use-admin-listing.ts:179 | `rpc admin_listing_detail` | read |
| 24 | src/features/admin-listings/use-admin-listing.ts:355 | `rpc admin_listing_certifications` | read |
| 25 | src/features/admin-listings/use-listing-reports.ts:14 | `rpc admin_open_report_counts` | read |
| 26 | src/features/admin-listings/use-listing-reports.ts:43 | `rpc admin_listing_reports` | read |

None of the 26 is in a file SIDE BY SIDE gives to Lovable. Two are readers a Lovable table page calls:
`use-listing-reports.ts` (the Listings console, `listings-page.tsx`) and `use-photo-*.ts` (drawn by the Screening page's
sections). Part 1 keeps their exported names and answer shapes; only the thrown value's type changes (a `ReaderError`
carries the same `message`).

### Concern 2 — the standing staff rules

Read from the migrations' last declarations through `scripts/doors/policies.ts` (`policiesOf`, the reader DOORS-16 uses):
146 standing policies; **22 name `has_permission(`** — 18 on public tables, 4 on `storage.objects`. No policy is built
by dynamic SQL with `has_permission` (`rg -U "format\([^;]*CREATE POLICY[^;]*has_permission"`: none). The LIVE catalogue of
the local stack was NOT read: `bun run db:proof` has no read mode, and psql or `docker exec` into its stack is forbidden
(rule 50); see Limits. Every one of the 18 tables gives `authenticated` a SELECT path in the migrations' grant order
(table grant, or column grants on `listings`, `listing_packages`, `package_prices`), so every rule is in force for the
browser role. No table forces row security (`rg -i "FORCE ROW LEVEL SECURITY" supabase/migrations`: one comment, no
statement), so a definer door keeps its reads when a rule goes.

| table | rule | command | roles | permission | direct readers under src/ that this rule serves | door that serves these rows |
| ----- | ---- | ------- | ----- | ---------- | ----------------------------------------------- | --------------------------- |
| audit_log | audit_log_read | SELECT | authenticated | audit_logs:view | no reader (`.from("audit_log")`: none in src/) | admin_list_audit, admin_audit_facets, admin_audit_stats |
| listing_locations | listing_locations_admin_read | SELECT | authenticated | listings:view | no reader (posting-service.ts:400, :554 are the owner's, served by `listing_locations_owner_read`) | admin_listing_detail |
| listing_packages | listing_packages_staff_read | SELECT | authenticated | packages:view | no reader (level-table-read.ts:29 reads `enabled` rows, served by `listing_packages_public_read`) | the monetisation console's doors |
| listing_photo_changes | listing_photo_changes_admin_read | SELECT | authenticated | listings:review | use-photo-changes.ts:68 (`listPhotoChanges`) | none yet |
| listing_photo_reviews | listing_photo_reviews_admin_read | SELECT | authenticated | listings:review | use-photo-reviews.ts:63 (`listPhotoReviews`) | none yet |
| listing_photo_warnings | listing_photo_warnings_admin_read | SELECT | authenticated | listings:view | use-photo-changes.ts:111 (`listWarnedListings`) | none yet |
| listing_photos | listing_photos_admin_read | SELECT | authenticated | listings:view | use-screening.ts:259 (`listScreeningPhotos`); use-edit-draft.ts:134 (`readForStaff`) and :320 (the photo reload, staff path); src/server/media/links.ts:100 through `POST /api/media/photo-links` (src/routes/api/media/photo-links.ts:76, read as the caller) for the staff screens' photos: screening-page.tsx:284, photo-reviews.tsx:56, photo-changes.tsx:52, admin-listings/listing-photos.tsx:85 | none yet |
| listing_reports | listing_reports_staff_read | SELECT | authenticated | listings:review | no reader | admin_listing_reports, admin_open_report_counts |
| listings | listings_admin_read | SELECT | authenticated | listings:view | the embedded `listing:listings(...)` of use-photo-changes.ts:70 and use-photo-reviews.ts:65 (the owner reads of posting-service.ts, pricing-data.ts:235, photo.ts:235 and own-listing.ts:25 are keyed by `seller_id` and served by `listings_seller_read`) | none yet (moves with the two readers) |
| listings | listings_admin_update | UPDATE | authenticated | listings:update | no reader (no `.from("listings").update` under src/) | admin_edit_listing, admin_move_listing, admin_set_listing_tier |
| package_prices | package_prices_staff_read | SELECT | authenticated | packages:view | no reader | the monetisation console's doors |
| permissions | permissions_rbac_select | SELECT | authenticated | roles:view | no reader | admin_get_role, admin_list_roles_detailed |
| profiles | profiles_admin_read | SELECT | authenticated | profiles:view | no reader (settings.tsx:217, account-overview.tsx:85, preferred-language.ts:69, posting-service.ts:975, use-auth.ts:83, pricing-data.ts:155, user-client.ts:118 all filter `user_id` = the caller, served by `profiles_owner_read`) | admin_get_user, admin_list_users |
| resources | resources_rbac_select | SELECT | authenticated | roles:view | no reader | the roles doors |
| reveal_flags | reveal_flags_staff_read | SELECT | authenticated | listings:view | no reader | none needed (no screen reads it) |
| role_permissions | role_permissions_rbac_select | SELECT | authenticated | roles:view | no reader | the roles doors |
| roles | roles_rbac_select | SELECT | authenticated | roles:view | no reader | the roles doors |
| user_roles | user_roles_read | SELECT | authenticated | user_roles:view, OR the person's own rows (`user_id = auth.uid()`) | no reader of either half (permissions come from `get_my_permissions`, a definer) | admin_get_user |
| storage.objects | category_assets_public_read | SELECT | authenticated | categories:assets | category-images-service.ts:166 (`storage.list`) | outside the concern's definition (not a public table) |
| storage.objects | category_assets_assets_insert | INSERT | authenticated | categories:assets | the category image upload (category-images-service.ts) | outside the definition |
| storage.objects | category_assets_assets_update | UPDATE | authenticated | categories:assets | same | outside the definition |
| storage.objects | category_assets_assets_delete | DELETE | authenticated | categories:assets | category-images-service.ts:174 (`storage.remove`) | outside the definition |

Counts: of the 18 public-table rules, **5 have readers** (`listing_photos_admin_read` 4 reader sites + the photo-links
route; `listing_photo_changes_admin_read` 1; `listing_photo_reviews_admin_read` 1; `listing_photo_warnings_admin_read` 1;
`listings_admin_read` 2 embedded joins, moving with those two readers) and **13 have none**. No rule's readers are too
many for this bundle: the moving readers are 6 sites in 4 files plus the photo-links route (whose scope is QUESTION 4).

Functions that run as the caller and read these tables (18, by `lastDeclarations`, no SECURITY DEFINER): `cat_export_rows`,
`attribute_holders`, `attributes_type_lists`, `admin_allow_listing_photo_core`, `admin_review_photo_change_core`,
`admin_edit_listing_core`, `admin_move_listing_core`, `admin_list_ai_calls_core`, `name_check_queue_page`,
`level_perks_for`, `product_price_for`, `baseline_level_key`, `seller_regular_live`, `listing_photo_cap`,
`listing_effective_reach`, `listing_caps`, `admin_retire_category_core`, `admin_delete_category_core`. None has a manifest
line (none is browser-callable); each runs inside a definer door, as the owner. One view, `shown_locations`
(`security_invoker = true`), reads `locations` only. Dropping a rule changes none of them.

The staff edit's place step: `readPlaceText` (posting-service.ts:1224, a `listings` read by id) would be served by
`listings_admin_read` for a staff caller; step 6 (place) is locked for staff (`lockedSteps`, edit-step-changes.ts:55,
`[1, 2, 6, 7]`). To be confirmed in STEP 4 by the admin-listings edit spec, not assumed.

### Concern 3 — an account action held half-done on the server

| flow | middle state on the server | what a reload / a second tab / another device does today |
| ---- | -------------------------- | -------------------------------------------------------- |
| two-factor setup (settings.tsx:741-830, use-mfa.ts, mfa-service.ts) | an unverified TOTP factor | forgotten: `listFactors` (mfa-service.ts:244) returns `data.totp`, the VERIFIED factors only; the hook keeps the pending setup in `useState` (use-mfa.ts:27); the page offers "Set up two-factor" again and the second enrolment is refused (INC-1147) |
| email change (settings.tsx:376, auth-service.ts:398 `changeEmail`) | the user's `new_email` until both links are opened (auth-js `User.new_email`, `node_modules/@supabase/auth-js/dist/module/lib/types.d.ts:357`) | forgotten: the page says `settings.emailChangeSent` once; no code under src/ reads `new_email` (`rg new_email src`: none) |
| sign-up awaiting confirmation (auth.tsx) | an unconfirmed user | kept in the tab's `sessionStorage` (`ethio.auth.pendingEmail`, auth.tsx:44, :182, :315); a second tab or device has no session to read it from |
| impersonation (staff) | an impersonation session row | read back on load (`get_active_impersonation`, impersonation-service.ts:82) |
| Google link (auth-service.ts:294), password reset (auth-service.ts:555), home-country change (identity.ts:137) | none the page can hold half-done (a redirect; an e-mailed link read by its own page; one door call) | not applicable |

## definition

Concern 1: every place a failed database call becomes a thrown value, by shape, at the base:

| shape | count | where | difference from the COUNT |
| ----- | ----- | ----- | ------------------------- |
| A `throw new Error(<x>.message)` | 26 | above | the COUNT itself (24 reads, 2 storage calls in a caught prune) |
| B `if (error) throw error;` — the raw Supabase error thrown as it came | 117 one-line throws: **45 after a read**, 72 after a write; plus use-price-unit-labels.ts:20 (a read, in a block) | e.g. legal-reader.ts:107, :131, :154, :162, :186; read-all-pages.ts:27; permissions/service.ts:17; countries-service.ts:47; categories-service.ts:217; audit-service.ts:64, :88, :106; roles-service.ts:53, :67; admin-users-service.ts:88, :106, :145, :159, :205; legal-service.ts:174, :211, :218, :226, :304, :407; impersonation-service.ts:82, :95, :118; translations-service.ts:119, :136, :211, :367, :378, :716, :823, :855, :1209; ai-service.ts:166, :211; use-screening.ts:507; nav-alerts.ts:28; attributes-service.ts:486; locations-service.ts:228; use-price-unit-labels.ts:20 (a `{…}` block); translator-card.tsx:53 (Lovable's); server user-client.ts:159 | not a bare `Error`: the thrown value keeps `code` and `message`, so `readerFailure` classes it when the screen reads it; but it is not the typed failure either |
| C `new ReaderError(readerFailure(error))` | 14 | monetisation-service.ts:57, use-admin-listings.ts:83, ai-service.ts:409, legal-page-data.ts:41, seller-review.ts:12, promote-service.ts:173, my-listings.ts:255, posting-service.ts:525, :981, use-screening.ts:201, :263, :356, use-name-checks.ts:120, :238 | already typed — but a second form of "the one factory" (K1): `readFailed` (reader-failure.ts:146) always writes class `server` and drops the code, so the client readers built their own |
| D `new Error(\`<what>: ${error.message}\`)` on the server | 12 | photo.ts:140, photos.$id.ts:58, :61, links.ts:103, storage.ts:138, :262, :280, name-check-catchup.ts:54, :67, catalog-find.server.ts:74, user-client.ts:286, :345, plus seller-page.ts:31 and ad-page.ts:32 with `errorText` | server-side: each reaches a client only through `serverError` / `readFailure` (answer.ts), which log `[ssr-error]` and answer the envelope; the gate's code survives in the message |
| E re-throws of an already-thrown value | 11 | pricing-data.ts:85, preferred-language.ts:41, category-tree.ts:379, levels-store.ts:133, location-data.ts:228, :239 (Lovable's), ad-page.ts:43, use-screening.ts:464, use-step-up.ts:125, listings-page.tsx:412 (Lovable's), load-once.ts:34 | not an origin: the value was typed (or not) where it was first thrown |

Concern 2: the rules above were read by their text (`has_permission\s*\(` anywhere in the policy's statement), not by a
name pattern; the four `*_rbac_select`, `audit_log_read` and `user_roles_read` have no "admin"/"staff" in their names.

## tests

- Concern 1 readers' own tests: `use-edit-draft.test.ts`, `pricing-data.test.ts`, `posting-service.test.ts` (PSV-10 at
  :334-336 asserts `rejects.toThrow(message)` — a bare message, DECIDE-AND-NAME), `my-listing.test.ts`, `save.test.ts`
  (:99 `rejects.toThrow("boom")` — a bare message), `use-photo-reviews.test.ts`, `use-photo-changes.test.ts`,
  `category-images-service.test.ts` (:20 asserts a `CategoryImageError`, not one of the 26), `listing-settings.test.tsx`,
  `use-admin-listing.test.ts`; `use-listing-reports.ts` has no test file. The mechanism's: `src/lib/reader-failure.test.ts`,
  `src/server/answer.test.ts` (:216, :232 call `readFailed`), `scripts/conformance/refusal-readers.test.ts` (CFRR-1 → 4).
- Concern 2 readers' own tests: `use-photo-changes.test.ts`, `use-photo-reviews.test.ts`, `photo-changes.test.tsx`,
  `photo-reviews.test.tsx`, `screening-decisions.test.tsx`, `use-screening` tests, `use-edit-draft.test.ts`,
  `src/server/media/links` and photo-links route tests. Specs that read a screen a moved reader feeds:
  `e2e/admin-screening.spec.ts` (photo changes, photo reviews, the queue's photos), `e2e/admin-listings.spec.ts` (the staff
  edit and its photos), `e2e/photo-pipeline.spec.ts` (photo links, photo reviews/changes), `e2e/legal-certify.spec.ts`
  (photo changes). E2E reads of these tables are made by `adminClient()` (the service role; spot-read at
  name-check-queue.spec.ts:101, legal-certify.spec.ts:259, post-wizard-category.spec.ts:616, admin-shell.spec.ts:42,
  admin-guides.spec.ts:82): a dropped rule does not change them.
- Concern 3: `mfa-service.test.ts` (MSV-1 → MSV-5), `step-up-*.test.tsx`, `e2e/mfa-stepup.spec.ts` (MF-1 → MF-9, 11
  `test(` blocks), `e2e/settings.spec.ts` (4).

## lists

- `scripts/doors/manifest.txt`: one line per new door (THE PLAN); line 178 (`has_permission(uuid,text,text) | helper |
  authenticated | … | policy audit_log_read, category_assets_*, …, user_roles_read`) names all 22 rules as the reason its
  browser grant stands; every dropped rule leaves that list (else `helper-reason-unproven`, DOORS-13). `has_permission`
  keeps a browser caller besides the rules: `callerHasPermission` (src/server/supabase/user-client.ts:159) calls it as the
  caller — QUESTION 6.
- `scripts/doors/open-rules.txt`: 4 lines; none is a rule this bundle drops; unchanged.
- `scripts/public-surface-allowlist.txt`: one line per new door (EXECUTE to authenticated). Lines whose reason TEXT names a
  staff read by policy: 64 `listing_photo_warnings`, 65 `listing_photo_changes`, 68 `listing_photo_reviews`, 87
  `reveal_flags` ("staff read (listings.view by policy)"), 91 `listing_reports` ("staff (listings:review) read all, by
  policy") — their reasons are rewritten in the drop's commit (the grants they allow stay: sellers and reporters still read
  their own rows).
- `scripts/conformance/refusal-readers-allowlist.txt`: 1 line (`src/lib/door-error.ts:22 | … | INC-1189`); Part 1 adds the
  prune's two storage lines only if ruled (QUESTION 2).
- The e2e selector (`scripts/e2e-select.ts`): `admin-screening` (:126, specs admin-screening, name-check-queue),
  `admin-listings` (:148), `auth` (:194, holds `src/features/auth/**` → mfa-stepup.spec.ts), `settings` (:243). A new
  migration's `-- e2e-areas:` header names `admin-screening, admin-listings`.
- Exact-list assertions a dropped rule changes: `scripts/doors/check-doors.test.ts:583` (DOORS-13) asserts on the real tree
  `tree("user_roles_read", "has_permission")` is true — it moves to a rule that stands. No `Object.keys(...).toEqual` over a
  new door's answer exists yet (new doors). `DOOR_CLASSES` length 7 (check-doors.test.ts:159) is unchanged.

## old-file-readers

Every file outside the migrations and the governance records that names a rule this bundle would drop:

| rule | named in |
| ---- | -------- |
| every one of the 18 | scripts/doors/manifest.txt:178 |
| user_roles_read | scripts/doors/check-doors.test.ts:583 |
| listing_photos_admin_read | src/server/media/links.ts:15 (comment), src/features/admin-screening/use-screening.ts:28 (comment), docs/features/admin-screening.md:11 |
| listings_admin_read | src/routes/admin.screening.tsx:9 (comment), src/features/admin-screening/screening-page.tsx:90 (comment; Lovable's file — not touched, QUESTION 7), docs/features/admin-screening.md:11, docs/spec/spec-ledger.md |
| profiles_admin_read | docs/spec/spec-ledger.md, docs/features/identity-schema.md |

## second-readers

Not applicable: no module moves. The new doors are new functions; the moved readers keep their files and exported names.

## chunk-graph

On the lock-exact base build (`bun install --frozen-lockfile`: no changes; `bun run build`; the closure read by
`scripts/bundle-closure.mjs`):

- `src/lib/reader-failure.ts` does NOT reach `src/lib/door-codes.ts` today. Its chunk `reader-failure-duogybqi.js` (944 B
  gzipped) takes `splitRefusal`, `ownValue` and `errorText` from the shared shell; `DOOR_CODES` lives in
  `refusal-B7alVN0r.js` (1,791 B gzipped), with `readRefusal`.
- 14 pages carry the reader-failure chunk; 12 of them already carry `refusal-*.js`. `/account` and `/legal/publishing`
  carry the reader without the list (bundle 1's finding 1 holds on this base). Importing `DOOR_CODES` into the reader would
  put the list (bundle 1's trial A: 564 B gzipped, not re-measured here) on those two pages. Hence Part 1 takes the guard
  form (CF-REFUSAL-4 proves the sets equal to the list by reading both files), not the import.
- The entry's closure does not change in either form (the reader is not on the entry: `JS: 201.4 KiB / 203 KiB`).
- Part 1 can move pages a second way: a converted reader whose module already rides a first download that does not carry
  the reader-failure chunk would bring it (944 B). Measured (`carry-strings.mjs`): `/account_/saved` carries `save.ts`'s
  `my_saved_listings` without the chunk (room 1.19 KiB → 0.27 after, inside the NEAR band); `/admin/categories` carries
  `admin_get_category_images` without the chunk (room 0.87 KiB → over its ceiling). QUESTION 3.

## environments

Not applicable: no build option changes.

## mechanisms

- `readFailed` — src/lib/reader-failure.ts:145-148: `new ReaderError({ class: "server", status, message })`. Callers: 7
  server route files (attributes.$id.options.ts:36, :48; locations.$country.ts:77, :90; feed.ts:85; seller.ts:64;
  locations.ts:79; i18n.$lang.ts:50, :58; categories.tree.ts:39, :52), and tests. CF guard `routes.test.ts:153` refuses a
  second declaration of it.
- `readerFailure` — reader-failure.ts:77-112 (the classing: gate code before status; the three sets at :49-70);
  `gateRefusal` — :124-134; `refusalStatus` — :32-34, mirrored against `door_refusal_status` by CFRR-3.
- The refusal reader — src/lib/refusal.ts:217-261 (`readRefusal`, seven dialects); `doorCode` — src/lib/door-codes.ts:88-95.
- `door_context` — 20261120100000_909988ad…sql: classes `owner, staff, public, reader, staff-reader`; a staff class names
  its permission; a reader class may spend no dial (it raises); `has_permission_scoped(uid, resource, action, country,
  scope_mode)` gives `allowed`, `countries`, `detail`; `staff-reader` skips the step-up. Helpers `door_refuse`,
  `door_refused`, `door_audit`, `door_refusal_status` (same file), `door_filter_countries`, `door_filter_categories`
  (20261122023100). The model one-listing staff reader: `admin_screening_facts(uuid)` (20261118012800): `door_context(
  'staff-reader','listings','review',NULL,NULL,'filter')`, then a row out of reach (`home_country_code` not in
  `v_ctx.countries`) answers `listingNotFound`, the same answer as a missing row.
- The declared-rules check — scripts/doors/open-rules.ts (DOORS-16; kinds `open-rule-undeclared`, `-gone`, `-computed`,
  `-grants`), its file `open-rules.txt`, its live query `live-open-rules.sql` (smoke lane, `check-doors --live`); the policy
  reader scripts/doors/policies.ts (`policiesOf`, `openRulesOf`, `policyCallsOf`).
- The two-factor service — src/features/auth/mfa/mfa-service.ts: `listFactors` :244-255 (verified only, failure →
  `refusalOf("unknown")`), `enrollTotp` :257-270, `verifyFactor` :277-288, `unenrollFactor` :306-312, `MFA_REFUSALS`
  :120-135 (already maps `mfa_factor_name_conflict` → `mfa.errorSetupPending`); the hook use-mfa.ts (`pending` in state
  :27; `refresh` :32-37 sets `factors` to `[]` on a failed read; `cancelEnrollment` :62-68 drops a failed unenroll).

## first-download

The base's table, from this lock-exact build (`node scripts/check-bundle-size.mjs`: `JS: 201.4 KiB / 203 KiB — ok`, `CSS:
22.7 KiB / 24 KiB — ok`, `Bundle budget OK.`; every page in `/tmp/ethio-scratch/cursor-bundle-4/base-size.log`). The pages
Parts 1 and 3 touch, with their room to the ceiling and to the NEAR band (room − 0.3 KiB):

| page | KiB | ceiling | room | to NEAR | carries |
| ---- | --- | ------- | ---- | ------- | ------- |
| /account | 263.83 | 265 | 1.17 | 0.87 | reader-failure |
| /account_/saved | 221.81 | 223 | 1.19 | 0.89 | refusal (and save.ts) |
| /admin/ai | 302.85 | 304 | 1.15 | 0.85 | refusal, mfa-service, reader-failure |
| /admin/categories | 348.13 | 349 | 0.87 | 0.57 | refusal, mfa-service (and category-images-service) |
| /admin/listings | 328.15 | 330 | 1.85 | 1.55 | refusal, mfa-service, reader-failure |
| /admin/listings_/$listingId | 329.56 | 331 | 1.44 | 1.14 | same |
| /admin/listings_/$listingId_/edit | 410.04 | 411 | 0.96 | 0.66 | same |
| /admin/monetisation | 312.59 | 315 | 2.41 | 2.11 | same |
| /admin/screening | 347.91 | 349 | 1.09 | 0.79 | same |
| /l/$slug | 248.35 | 250 | 1.65 | 1.35 | refusal, reader-failure |
| /legal/publishing | 207.23 | 209 | 1.77 | 1.47 | reader-failure |
| /my-listings | 308.90 | 310 | 1.10 | 0.80 | refusal, reader-failure |
| /my-listings_/$listingId | 319.78 | 321 | 1.22 | 0.92 | same |
| /my-listings_/$listingId_/edit | 401.54 | 403 | 1.46 | 1.16 | refusal, mfa-service, reader-failure |
| /post | 401.53 | 403 | 1.47 | 1.17 | same |
| /post_/$listingId | 401.49 | 403 | 1.51 | 1.21 | same |
| /settings | 276.81 | 278 | 1.19 | 0.89 | refusal, mfa-service, auth-service, settings |

## premises

1. "the three sets are derived from the one list, or a guard proves them equal to it in both directions" — the sets are
   NOT equal to `DOOR_CODES` today, in either direction. In the sets, not on the list: `notYourListing`, `notYours`,
   `badValue`, `badSize`, `acceptancePending`, `legalAcceptancePending`, `notInForce`. On the list, in no set: the 17 family
   codes (`lastSignInMethod` … `includedReach`, door-codes.ts:32-54), e.g. `listingNotFound` — so a reader that meets
   `listingNotFound` today classes it `malformed` (reader-failure.ts:104-105), not `refused`. A guard of equality needs a
   ruling on what the one list holds — QUESTION 1.
2. "the one factory `readFailed`" — it writes class `server` for every input (reader-failure.ts:147) and takes a required
   status; a client reader cannot use it without misclassing a refusal, which is why 14 client sites build
   `new ReaderError(readerFailure(error))` (shape C). Part 1 makes `readFailed` the one factory by classing through
   `readerFailure` with an optional status (THE PLAN); the 7 server route files and answer.test.ts keep their answers (answer.ts
   reads the code and status, never the class).
3. The COUNT counts two storage calls (category-images-service.ts:167, :175) inside a best-effort prune caught and logged
   on the spot (:176-179); neither reaches a page — QUESTION 2.
4. "one more read on the Settings page" — none is needed: `listFactors` already reads every factor (auth-js `_listFactors`
   calls `getUser()` once and fills `all`, then `totp` with verified ones only — `node_modules/@supabase/auth-js/dist/
   module/GoTrueClient.js:4898-4922`, auth-js 2.110.9); the service drops the pending one. Part 3 reads `all`.
5. "offered back — continue it or clear it": a pending TOTP setup cannot be CONTINUED after a reload: its secret and QR are
   answered once, at enrolment (`Factor.Secret` is `json:"-"`, supabase/auth `internal/models/factor.go`), and
   `listFactors` carries neither. Only "clear it and start again" is possible; Part 3 builds that (the brief's own Part 3
   says "Start again").
6. The sign-in service and a pending factor, from the vendor's source (supabase/auth, branch `master`, read 2026-11-22;
   `internal/api/mfa.go`, `internal/models/factor.go`, `internal/conf/configuration.go`):
   - a second enrolment under the same name is REFUSED while any factor of that name stands, pending or verified:
     `validateFactors` → `mfa_factor_name_conflict` (422), mfa.go:110-115;
   - a pending factor CAN be removed without a second factor: `UnenrollFactor` asks for AAL2 only when
     `factor.IsVerified()`, mfa.go:1073-1075 (MF-5 stands for a verified one);
   - its life: an unverified factor with NO challenge is deleted by `DeleteExpiredFactors` once older than
     `FactorExpiryDuration` (default and minimum 300 s, configuration.go:26, :219, :1305-1306) — and only when that sweep
     runs, at the start of the next enrolment (`validateFactors`, mfa.go:101); an unverified factor that HAS a challenge
     (the person reached "Verify") is never deleted by it (factor.go `DeleteExpiredFactors`: `not exists (select … from
     mfa_challenges …)`); a successful verify deletes the person's other unverified factors of its type (mfa.go:735);
   - every factor, pending or verified, counts toward `max_enrolled_factors` (10 here: scripts/ci/local-backend-config.toml
     :55-56; mfa.go:122).
   OPEN: the auth server version ethio-staging and ethio-prod run (the reading above is `master`, not a pinned tag).
   OPEN: the code a verify answers when its factor was removed by another tab (`mfa_factor_not_found` is expected from the
   source's middleware; MF-11 reads the real code, and its words are mapped to it, before any line claims it).
7. INC-1242's text is not in the repository (G51); this census describes only what is built.

## callee-codes

For every door a moved reader calls (the new doors of THE PLAN, all on `door_context('staff-reader', …, 'filter')`):

| code | status | from | the reader (`readFailed`, then the screen's `readRefusal`) |
| ---- | ------ | ---- | ---------------------------------------------------------- |
| notSignedIn | 401 | door_context | class `auth`; the screen's sign-in state |
| accountDeactivated | 403 | door_context | class `auth` |
| permissionDenied | 403 | door_context (`has_permission_scoped`; detail when it names one) | class `refused`; the section's no-permission words (an errored check renders as an error, never "no permission") |
| listingNotFound | 400 | `admin_listing_photos` (missing, or out of the caller's countries — one answer) | class `refused` once QUESTION 1 puts it on the list (today `malformed`); the screen's "gone" words |
| badSize | 400 | `admin_warned_listings`, `admin_photo_link_rows` (more ids than the door's ceiling) | class `refused`; never reached by the screens (they ask at most their page size) |

A staff reader's out-of-reach ROWS (the two queue doors) are absent, not refused: the queue shows what the caller may see.

## findings

1. `src/features/posting/posting-service.ts:552` and `:560`, `src/features/posting/pricing-data.ts:242` — a failed read
   answers `null` (`if (error …) return null`): the seller's last place and last currency hints. A phantom default (rule 10,
   No phantom success). Not in this brief's census definition (no throw); in scope by area (Part 1's readers) — QUESTION 2.
2. `src/features/posting/use-edit-draft.ts:320-325` — the photo reload drops a failed read (`if (!cancelled && !error)`,
   then `catch {}`): the photos stay stale with no word. Same class; it is a reader Part 2 moves.
3. `src/features/auth/mfa/use-mfa.ts:34` — a failed factor read sets the list to `[]`, so the card says "Two-factor
   authentication is off" for an unknown state; `:62-68` — a failed clear of a pending setup is dropped. Both are Part 3's
   (built there).
4. `src/features/auth/mfa/mfa-service.ts:120-135` — `insufficient_aal` (enrolling a second factor at AAL1, mfa.go:130) has
   no words: the generic line. Part 3 maps it only if ruled (the page offers no second factor today).
5. Stale comments naming `listings_admin_read` as the screening queue's authority — admin.screening.tsx:9,
   screening-page.tsx:90 (Lovable's), docs/features/admin-screening.md:11 — the queue moved to `admin_screening_queue` in
   cursor-bundle-2.
6. Shape B (46 raw throws after a read, 72 after a write) is the larger remainder of the class INC-1241 names — QUESTION 2.
7. No security hole found. `has_permission` (20261106051700) answers false for another person's id unless the caller is a
   super admin, so its browser grant reveals nothing beyond the caller's own permissions.

## queued

`rg "cursor-bundle-4|account security|account-security"` across docs/governance/briefs, docs/governance/reports,
docs/features and roadmap.md (this brief excluded), plus the INC numbers:

| item | where queued | here |
| ---- | ------------ | ---- |
| INC-1235 — the reader's own code sets | cursor-bundle-1-ruling-1.md:36; cursor-bundle-1.report.md:361, :392; cursor-bundle-2.md:19 ("with the account-security bundle, which owns /account") | built here, Part 1 |
| INC-1241 — bare-`Error` readers | cursor-bundle-2-ruling-1.md:29, :46; cursor-bundle-2.report.md:195, :292, :312 | built here, Part 1 (its extent: QUESTION 2) |
| roadmap.md:86 — the account-security phase, INC-1147 class 2 | roadmap.md:86; docs/features/forms.md:252; forms-kit.md:19 | built here, Part 3 (the roadmap tick by the ruling's words, records) |
| roadmap.md:85 — INC-1147 class 1 (a refusal shown as a generic failure) | roadmap.md:85 | left: built by the form kit's wave 2 (docs/features/forms.md:249, `MFA_REFUSALS`) but unticked — the records turn |
| roadmap.md:87 — INC-1147 class 3 (the authenticator's stored name from translated text) | roadmap.md:87 | left (the messages mechanism, Foundations 4); Part 3 clears every unverified TOTP factor before a start, by status, not by name, so a language change no longer blocks a start |
| ACT-020 / the account-security phase's forward-scan | f1-doors.md:18 | Part 3 is its first piece; the rest (re-checks, notices) follows |

## cell-meaning

Every new door is a `staff-reader`: it spends NO dial (`door_context` raises for a reader class that names one), so no dial
rations it; a reviewer working the queue reads each list a few dozen times an hour (each opening, each decision's refetch,
`staleTime` 10 s), and the photo links once per photo shown. The country cell is `filter` for each: the row's country is
the LISTING's `listings.home_country_code` (as `admin_screening_facts`), joined from the photo, change, review or warning
row by `listing_id`; a caller whose `has_permission_scoped` answers `countries` NULL (global) sees every row.

# THE PLAN

## Part 1 (concern 1) — STEP 2, one commit

- `src/lib/reader-failure.ts`: `readFailed(error: unknown, status?: number): ReaderError` becomes the one factory — the
  failure classed by `readerFailure` (the status, when given, read with it); the three sets as QUESTION 1 rules them; a
  header line pointing at CF-REFUSAL-4. `src/lib/door-codes.ts`: as QUESTION 1 rules.
- The 24 reads of the COUNT (above) throw `readFailed(error)`; the 14 shape-C sites move onto `readFailed(error)` (one form);
  shape B and the two storage calls as QUESTION 2 rules.
- `scripts/conformance/refusal-readers.ts` + `.test.ts`: CF-REFUSAL-3 — CFRR-5 (the census: no file under src/ throws
  `new Error(<x>.message)` / `new Error(errorText(<x>))` after a failed call, nor builds `new ReaderError(readerFailure(…))`
  outside the mechanism; held lines in the allowlist) and CFRR-6 (planted: a bare throw fails, `readFailed` passes);
  CF-REFUSAL-4 — CFRR-7 (the sets in reader-failure.ts, read from its text, equal the list in door-codes.ts in both
  directions; FALLBACK a subset) and CFRR-8 (planted: a code in one and not the other is named). Ids CFRR-5 → 8, MSV-6 → 8,
  MF-10, MF-11, DOORS-19 and DOORS-20 are free (`rg "CFRR-[5-8]|MSV-[678]|MF-1[01]\b|DOORS-19|DOORS-20" scripts src e2e`: 0).
- Each changed reader's test asserts the failure's class (`readerFailure(error).class`), PSV-10 and save.test.ts:99 among
  them (DECIDE-AND-NAME). `src/lib/reader-failure.test.ts` gains the factory's cases (a gate code with and without status).
- First download: QUESTION 3.

## Part 2 (concern 2) — STEPS 3 and 4

Migration files, in order (rule 30; G74 law 6 — no core changes, so the doors, then the drops; QUESTION 5 on their apply):

1. `supabase/migrations/<stamp>_<uuid>.sql` — THE STAFF READERS' DOORS (`-- e2e-areas: admin-screening, admin-listings`):
   `admin_listing_photos(uuid)`, `admin_photo_changes()`, `admin_photo_reviews()`, `admin_warned_listings(uuid[])`, and
   `admin_photo_link_rows(uuid[])` if QUESTION 4 puts the route in scope; each `SECURITY DEFINER`, `door_context(
   'staff-reader', …, 'filter')`, `REVOKE ALL … FROM PUBLIC`, `GRANT EXECUTE … TO authenticated`; proofs on scratch rows:
   the caller without the permission is refused `permissionDenied`; a caller holding it for another country reads none of
   the rows (and `listingNotFound` for the one-listing door); a caller in reach reads exactly the scratch rows.
2. `supabase/migrations/<stamp>_<uuid>.sql` — THE STAFF RULES DROPPED: `DROP POLICY` for the 18 public-table rules (or the
   set ruling 1 keeps), `user_roles_read` dropped whole (no reader of either half) unless ruled to stand as the owner's
   read; proofs: as a browser role holding each permission, a direct read of another person's row in each table answers
   no row (the owner's and the public rules still answer theirs), and `listings_admin_update` refuses an update by row
   count 0.

Manifest lines proposed (the grammar of manifest.ts; reasons to be finalised in the file):

```
admin_listing_photos(uuid) | staff-reader | authenticated | listings:view | - | - | - | filter | - | listingNotFound | -
admin_photo_changes() | staff-reader | authenticated | listings:review | - | - | - | filter | - | - | -
admin_photo_reviews() | staff-reader | authenticated | listings:review | - | - | - | filter | - | - | -
admin_warned_listings(uuid[]) | staff-reader | authenticated | listings:view | - | - | - | filter | - | badSize | -
admin_photo_link_rows(uuid[]) | staff-reader | authenticated | listings:view | - | - | - | filter | - | badSize | -
```

`has_permission`'s line 178 keeps only the policies that stand (the four `category_assets_*` if QUESTION 8 keeps them), and
its grant's other reason (QUESTION 6). DOORS-13's real-tree line (check-doors.test.ts:583) points at a rule that stands.

The standing check (ids for ruling 1): **DOORS-19** (the census: every standing policy whose text names `has_permission(`
is a line of `scripts/doors/staff-rules.txt` — `<table> <policy> | <command> to <roles> | reader <file:line, or none> |
<reason>` — and every line's policy stands) and **DOORS-20** (its planted cases: an undeclared rule fails
`staff-rule-undeclared`, a line whose rule is gone fails `staff-rule-gone`), in `scripts/doors/staff-rules.ts` beside
open-rules.ts, judged by check-doors (static) and its self-test (DEC-334). `rg "DOORS-19|DOORS-20" scripts src e2e`: none.
A live half (the smoke lane reading `pg_policies`) only if ruled.

STEP 4 readers: `use-screening.ts:259` and `use-edit-draft.ts:134`, `:320` → `admin_listing_photos`; `use-photo-changes.ts:68`
→ `admin_photo_changes`; `:111` → `admin_warned_listings`; `use-photo-reviews.ts:63` → `admin_photo_reviews`; the photo-links
route per QUESTION 4. Exported names and answer shapes kept. Docs: `docs/features/doors.md`, `docs/features/admin-screening.md`.

## Part 3 (concern 3) — STEP 5

- `mfa-service.ts`: `listFactors` answers `{ factors (verified), pending (unverified TOTP, from data.all) }`;
  `clearPendingFactors()` unenrolls every unverified TOTP factor and answers a failure through `MFA_REFUSALS`; `enrollTotp`
  clears first, then enrols; the verify's "factor gone" code mapped once MF-11 reads it.
- `use-mfa.ts`: the pending state read from the service on load; a failed read is an error, never `[]`; a failed clear is
  shown. `src/routes/settings.tsx`: the in-progress line and "Start again" in the two-factor card.
- Tests: MSV-6 (a pending factor listed apart from the verified), MSV-7 (cleared before a new start, in that order), MSV-8 (a
  failed clear shown, no enrolment made) in mfa-service.test.ts; MF-10 and MF-11 in `e2e/mfa-stepup.spec.ts` (11 → 13
  tests), `@private-identity` (J9: they change their own account's factors). Ids free (`rg "MF-1[01]\b|MSV-[678]"`: none).
- Words (layer `member`, beside the `mfa.*` keys in en-member.ts / am-member.ts; English from me, Amharic from the
  supervisor's file):
  - `mfa.setupInProgress` — "A two-factor setup was started and not finished."
  - `mfa.startAgain` — "Start again"
  - `mfa.errorSetupReplaced` — "This setup was replaced by a newer one. Start again to get a new code."
  - `mfa.errorClearFailed` — "We couldn't clear the unfinished setup. Please try again."
- `bun run i18n:usage`, both maps. Docs: `docs/features/step-up-auth.md`, `docs/features/settings-surface.md`.
- A static guard: possible only in a narrow form (every call of `auth.mfa.enroll` under src/ sits in mfa-service.ts after a
  clear of the pending factors); not proposed — the tests carry it.

# QUESTIONS for ruling 1

1. THE ONE LIST (premise 1). Proposed: `DOOR_CODES` is the one list; it gains the seven codes the reader names today;
   the reader's sets become AUTH = {notSignedIn, accountDeactivated}, REFUSED = every other code on the list, FALLBACK ⊂
   REFUSED; CF-REFUSAL-4 proves it by text. Consequences: the 17 family codes reach a reader as `refused` (today
   `malformed`); `doorCode` recognises the seven, so `readRefusal`'s branch 5 answers `door.refused` (or the family's
   generic) for them where a family names no words — a screen's words may change for those seven codes. Or: rule another
   list.
2. THE EXTENT. Proposed: the 24 reads of the COUNT and the 14 shape-C sites are built; the two prune calls
   (category-images-service.ts:167, :175) become allowlist lines (`a best-effort prune caught and logged on the spot`);
   shape B's 46 read sites and findings 1-2 get their own number. Or rule them in.
3. FIRST DOWNLOAD. Proposed: `save.ts` and `category-images-service.ts` take the factory on the failure path through
   `loadOnce` (the pattern of preferred-language.ts:36-41), so no page grows; else `/admin/categories` and
   `/account_/saved` raise by DEC-296's form, named.
4. SCOPE — the photo-links route. `src/routes/api/media/photo-links.ts` (and `src/server/media/links.ts`) is a reader
   `listing_photos_admin_read` serves for four staff screens, but SCOPE allows `src/routes/` for the Settings page only.
   Proposed: in scope, with a staff path that asks `admin_photo_link_rows` for the ids the caller's own read did not answer,
   only when the request says it is a staff screen's (so a buyer's card path is unchanged); or `listing_photos_admin_read`
   stands as a declared line until a turn that owns the route.
5. THE APPLY ORDER. The doors file can be applied while dev still reads by the rules; the drops file breaks dev's staff
   screens on ethio-staging from its apply until this pull request merges. Proposed: two files, and the drops file's
   staging apply waits for the supervisor's release line (or is applied last, after STEP 4's readers are proven on CI's
   temporary backend).
6. `has_permission`'s browser grant: its reason becomes `callerHasPermission` (user-client.ts:159) besides any rule that
   stands — the manifest grammar for a helper reason other than `policy …` to be confirmed.
7. Lovable's `screening-page.tsx:90` comment names `listings_admin_read`: left for Lovable's lane, or a byte edit here after
   its merge.
8. The four `storage.objects` rules (`category_assets_*`): outside "a public table"; proposed declared lines in
   staff-rules.txt with their reason (the category image upload's storage writes), not dropped here.
