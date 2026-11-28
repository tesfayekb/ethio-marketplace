STOP — cursor-bundle-8c-3b STEP 1: the census, and the switch rule to rule on
DONE: STEP 0 (brief saved, sha256 6a5ff009d4b4eacdaea223307f937364f4811505c7abefa9dd15e3600f74dba2 equal to the carrier's; roadmap line 3; `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-3b.md --root .` answered `[check-go] no finding`); STEP 1 (this census)
LEFT: STEPS 2 to 9 (parts A, B and C, the rows, the docs, the checks, the push, the report)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `3dc448dc347f653df4b980a1a56e45af7a097b21` (short `3dc448d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-28T10:15:50Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46133508679
FILES:
docs/governance/briefs/cursor-bundle-8c-3b.md
docs/governance/reports/cursor-bundle-8c-3b.stop-1.md
roadmap.md

The questions for ruling 1 are in §9. Everything below is read from the tree at dev 3dc448dc3 (origin/dev
equals the base; no file moved). `scripts/conformance/briefs-allowlist.txt` held no line keyed to another
brief, so STEP 0's removal changed nothing.

## 1. How the census was read

- Fix A's pairing (65 switches in 20 files) was read by four read-only explorers, each given five or six
  files and asked for the control each switch gates and the door or route the control's call reaches,
  with file:line. I re-read myself: both INC-1310 switches, `mayAssign` over Remove, every pair marked
  "different permission" below, the listing page's switches, the places verb bar's Reorder and the
  countries' rail order. The rest stands as the explorers read it.
- The switch rule was prototyped as a scratch script outside the repository
  (`/tmp/ethio-scratch/cursor-bundle-8c-3b/switch-proto.ts`, the TypeScript checker over `src/`; the
  operator's to remove). Its hits are in §3.
- Fix C's census was prototyped with `rg --pcre2 -U` (§6).
- The first-download numbers come from my own lock-exact build of 3dc448dc3 (`bun install
  --frozen-lockfile`, `bun run build`, `node scripts/check-bundle-size.mjs`: "Bundle budget OK").

## 2. Fix A — the permission read

Readers of `usePermissions(` (tests excluded; `rg -n "usePermissions\(" src`):

- `src/routes/admin.tsx:68` — reads `permissions` and `loading`, never `error`. A failed read leaves
  `permissions` empty, so `allowed` (line 85) is false and line 96 navigates to `SIGN_OUT_LANDING`
  (INC-1345, as the brief says).
- `src/components/app-shell.tsx:97` (`PermissionsLoader`) — reads `error`, hands `failed` to the shell
  (lines 98 to 101). The shell reads `failed` only for the impersonation check (line 779).
- `src/features/permissions/use-may-call.ts:48` — reads `error` and returns it. Its 21 callers (20
  feature files and the edit route) read only `mayCall`; each draws under `AdminGate`.
- Fixtures that name the hook (not app code): `scripts/conformance/door-permissions.test.ts:66` and
  three files under `scripts/fixtures/` (`browse-imports/admin-route-seam/…/admin.roles.ts.txt:8`,
  `browse-imports/admin-seam/…/seam-import-example.ts.txt:8`, `bad-permission-import-example.ts.txt:7`).
  The new census must skip `scripts/` or it would count them.

The query (`usePermissions.ts:30-42`) has `retry: 1` and no read-again in its answer. React Query keeps
`data` when a refetch fails, so "a read that fails while grants are held keeps them" holds at the data
level today; the gate only has to tell a first-read failure (no data) from a later one (data held).

Gate reach: every staff page is a child of `/admin` (`createFileRoute("/admin")`, `component: AdminGate`),
so the landing `/admin`, a section (`/admin/users`) and a deep link (`/admin/users/$userId`) all draw the
same thing on a failed first read: today `AdminChecking` for one frame, then the navigation to the
sign-out landing; after the fix, the notice in the layout's body with Retry, and no navigation. The
shell around it (rail, bands, header) is the shell's and does not change in this lane.

Tests: `src/routes/admin.test.tsx` does not exist (new); `src/features/permissions/use-may-call.test.ts`;
the staff layout's browser specs `e2e/admin-shell.spec.ts` (A-4, A-5, A-6, A-7, A-8, IN-1) and
`e2e/rbac.spec.ts` (R-6, R-7, R-8). Lists a new name must join: `scripts/conformance/wired.test.ts`
(its domain is every `scripts/conformance/*.ts` that is not a test or the kit, so a census module
under `scripts/conformance/` needs a caller), `docs/features/ci-guards.md`.

## 3. Fix A — the switches

Every `mayCall({` switch (`rg -n "mayCall\(\{" src`, tests excluded: 65 in 20 files). "wrong" means at
least one control the switch draws makes a call to another door or route; the permissions of the two are
given when they differ, because those pairs change who sees the control today. A control that only
navigates (an Edit link) is marked by the call its destination makes.

`src/routes/admin.listings_.$listingId_.edit.tsx`
- :83 inline `admin_review_listing` — the edit wizard's Approve / Reject (:121, :153, :168) →
  `admin_review_listing` (`use-screening.ts:287`). paired.

`src/features/admin-listings/listings-page.tsx`
- :120 `mayReadEmail` `admin_list_users` — the seller filter's placeholder words only
  (`src/components/shell/use-seller-filter.ts:20-22`); no call; the seller search itself reaches
  `admin_list_listings`. wrong — a word switch: `profiles:view` against `listings:view`.
- :121 `mayEnforce` `admin_set_listing_policy` — listing settings save → `admin_set_listing_policy`
  (paired); row moves (:294-325), selection and bulk Restore / Remove (:705-741) → `admin_move_listing`;
  row Set tier (:326-332) → `admin_set_listing_tier`. wrong (all `listings:enforce`).
- :122 `mayViewAs` `begin_impersonation` — View as seller → `begin_impersonation`. paired.
- :248 `mayReview` `admin_open_report_counts` — the counts read, its badge, its failure. paired.

`src/features/admin-listings/listing-page.tsx` (a file TWO LANES OPEN gives to Lovable UF-3)
- :139 `mayEnforce` `admin_edit_listing` — Edit (→ the wizard's save `admin_edit_listing`) and photo
  Remove → `admin_edit_listing` (paired); Move (:518-532) → `admin_move_listing`; Set tier (:534-547) →
  `admin_set_listing_tier`; history Undo (:875-890) → `admin_undo_listing_edit`. wrong (all
  `listings:enforce`).
- :140 `mayViewAs` `begin_impersonation`. paired.
- :146 `mayReview` `admin_listing_reports` — the reports read and card. paired.
- :249 `mayAllowPhotos` `admin_allow_listing_photo` — Allow. paired.

`src/features/admin-categories/categories-page.tsx`
- :260 `mayCreate` `admin_create_category` — Create → `admin_create_category` (paired); the same save
  chains `admin_set_country_exclusions` and `admin_reorder_categories`
  (`category-dialogs.tsx:218-228`). wrong — `categories:create` against `categories:update`.
- :261 `mayUpdate` `admin_update_category` — Edit save (paired); Window → `admin_set_category_window`,
  Exclusions → `admin_set_country_exclusions`, Attributes → `admin_link_attribute`,
  `admin_update_attribute_link`, `admin_unlink_attribute`, `admin_set_fact_attributes`,
  `admin_set_card_attributes`, `admin_set_attribute_link_order`. wrong (all `categories:update`).
- :262 `mayReorder` `admin_reorder_categories` — row Up / Down. paired.
- :263 `mayRestructure` `admin_retire_category` — Retire (paired); Pointer → the four pointer doors,
  Reactivate → `admin_reactivate_category`, Delete → `admin_delete_category` (all
  `categories:restructure`); the editor's verb bar Move up / down (:919-936) →
  `admin_reorder_categories`. wrong — the verb bar's Move is `categories:restructure` against
  `categories:update`.
- :264 `mayAssets` `admin_set_category_images` — Generate (route `POST
  /api/admin/categories/generate-image`, then `admin_set_category_images`), Accept →
  `admin_accept_category_image`. wrong (all `categories:assets`).
- :266 `mayImport` `POST /api/admin/categories/import` — Import. paired.

`src/features/admin-attributes/attributes-page.tsx`
- :123 `mayUpdate` `admin_upsert_attribute`, :124 `mayLink` `admin_link_attribute`, :125 `mayUnlink`
  `admin_unlink_attribute`, :126 `mayRestructure` `admin_delete_attribute`, :127 `mayMerge`
  `admin_merge_attributes`, :129 `mayImport` `POST /api/admin/attributes/import` — each its own
  control's door. paired (6).

`src/features/admin-overview/locations-overview.tsx`
- :36 `maySeePlaces` `admin_list_locations`, :37 `maySeeCountries` `admin_list_countries` — the reads'
  `enabled` and their tiles. paired (2).

`src/features/admin-ai/ai-page.tsx`
- :64 `mayManage` `admin_set_ai_feature` — Edit → save. paired.

`src/features/admin-monetisation/monetisation-page.tsx`
- :36 `mayUpdate` `admin_save_package_price` (handed down in `shared`, :55-61) — price create (paired);
  markets → `admin_save_market_settings`, products → `admin_save_listing_package`, price edit / end →
  `admin_edit_package_price` / `admin_end_package_price`, level perks → `admin_save_level_override` /
  `admin_clear_level_override`. wrong (all `packages:update`).

`src/features/admin-screening/screening-page.tsx`
- :141 `mayReview` `admin_review_listing` — row, bulk and preview Approve / Reject (paired);
  `PhotoReviews` → `admin_photo_reviews` (read) and `admin_allow_listing_photo`; `PhotoChanges` →
  `admin_photo_changes` (read) and `admin_review_photo_change`; preview Allow (:894) →
  `admin_allow_listing_photo`; the held-photo note (:903-909) makes no call. wrong (all
  `listings:review`).
- :142 `mayReveal` `admin_reveal_listing_contact` — Show number. paired.
- :143 `mayReadEmail` `admin_list_users` — the seller filter's placeholder words only. wrong — a word
  switch: `profiles:view` against the queue's `listings:review`.
- :145 `mayEnforce` `admin_edit_listing` — preview Edit (→ `admin_edit_listing`) (paired); the preview's
  staff-photos block (:889-898; its read `admin_listing_photos`, its Allow switched by `mayReview`).
  wrong — `listings:enforce` against `listings:review`.
- :149 `mayRename` `admin_name_check_clear` (as `mayClear` into `NameChecks`) — Allow →
  `admin_name_check_clear` (paired); Rename (`name-checks.tsx:273-281`) navigates to the person's page,
  whose save is `admin_update_profile`. wrong by name (both `profiles:update`).
- :150 `mayViewJob` `admin_job_health`, :151 `mayResumeJob` `admin_job_resume`. paired (2).

`src/features/admin-countries/countries-page.tsx`
- :76 `mayUpdate` `admin_upsert_country` — Edit (paired); Rail order (row :270, verb bar
  `country-verb-bar.tsx:87`) → `admin_set_country_root_order`. wrong (both `countries:update`).
- :77 `mayActivate`, :78 `mayImport`, :79 `mayExport` — each its own door or route. paired (3).

`src/features/admin-locations/locations-page.tsx`
- :103 `mayCreate` `admin_upsert_location` — Edit, Create, Create child (row and verb bar). paired.
- :104 `mayUpdate` `admin_set_location_active` — Activate / Retire (paired); the verb bar's Reorder
  (`location-verb-bar.tsx:115`) → `admin_reorder_locations`, while the row's Reorder uses `mayReorder`.
  wrong (both `locations:update`).
- :105 `mayReorder` `admin_reorder_locations` — row Reorder. paired.
- :106 `mayRestructure` `admin_move_location` — Move (paired); Delete (row :362, verb bar :124) →
  `admin_delete_location`. wrong (both `locations:restructure`).
- :107 `mayImport` `POST /api/admin/locations/import`. paired.

`src/features/admin/users/user-detail.tsx`
- :52 `mayUpdate` `admin_update_profile` — the edit form (:172) → `admin_update_profile` (paired); the
  status controls (:208-276) → `admin_set_account_status`. wrong (both `profiles:update`) — INC-1310.
- :53 `mayAssign` `assign_role` — Assign (:337) → `assign_role` (paired); Remove (:317-325) →
  `revoke_role`. wrong (both `roles:assign`) — not named by the brief.
- :184 inline `begin_impersonation` — View as. paired.
- :395 inline `admin_set_translator_languages` — the translator card's save (paired); the card's own
  read `admin_get_translator_scope` (`translator-card.tsx:48`). wrong for the read (both
  `translations:manage`).

`src/features/admin/roles/role-detail.tsx`
- :61 `mayUpdate` `admin_set_role_permission` — the matrix (`readOnly={!mayUpdate}`, :70) → paired; the
  meta card (:66 → `RoleMetaCard`, `editable` :96, `useUpdateRole` :90) → `admin_update_role`. wrong
  (both `roles:update`) — INC-1310.
- :62 `mayDelete` `admin_delete_role`. paired.

`src/features/admin/roles/roles-list.tsx`
- :57 `mayCreate` `admin_create_role`. paired.

`src/features/admin/translations/languages-page.tsx`
- :115 `mayManage` `admin_set_language_flags` — the flags (paired); Delete → `admin_delete_language`,
  order → `admin_set_language_order`, Sync → `admin_sync_ui_keys`, Add → `admin_upsert_language` (all
  `translations:manage`); the pseudo bar (:205) → `admin_machine_translation`. wrong — the pseudo bar is
  `translations:manage` against `translations:machine`.

`src/features/admin/translations/strings-page.tsx`
- :115 `mayUpdate` `admin_save_translation` — save, history restore (paired); the Data tab's entity
  save → `admin_save_entity_translation`. wrong (both `translations:update`).
- :116 `mayApprove` `admin_set_translation_status` — approve / clear (paired); Approve all →
  `admin_approve_all_translations`, the Data tab's → `admin_approve_all_entity_translations` and
  `admin_set_entity_translation_status`. wrong (all `translations:approve`).
- :117 `mayManage` `admin_set_key_context`, :118 `mayMachine` `POST /api/translate`. paired (2).
- :119 `mayReadScope` `admin_get_translator_scope` — the read it enables is
  `get_my_translator_languages` (`translations-service.ts:376`), a signed-in reader that asks no
  permission. wrong — `translations:manage` against none.
- :120 `mayExport`, :121 `mayImport`. paired (2).
- :122 `mayUndoImport` `admin_undo_import` — Undo (`transfer-bar.tsx:236`) → `POST
  /api/admin/translations/import` with `mode: "undo"` (`translations-service.ts:1163`). wrong —
  `translations:manage` against the route's `translations:update`.

`src/features/admin/legal/`
- `legal-page.tsx:75` `mayEdit` `admin_save_legal_draft` — draft and new-version links (→ the editor's
  save, paired); Mark reviewed → `admin_mark_legal_reviewed`. wrong (both `legal:edit`).
- `legal-page.tsx:241` inline `admin_add_legal_translation` — link to the version view, whose save is
  that door. paired.
- `legal-editor-form.tsx:95` `mayEdit` — fields, Save draft (paired); Discard →
  `admin_discard_legal_draft`. wrong (both `legal:edit`).
- `legal-editor-form.tsx:96` `mayPublish`, `legal-facts-card.tsx:169`, `legal-version-view.tsx:300`,
  `:499`, `:561`. paired (5).

Totals: 65 switches; 39 paired; 26 wrong. Of the 26, these 8 differ in permission, so the control shows for a
caller its door would refuse (or hides from one it would allow) today: listings-page :120 and
screening-page :143 (word switches), categories-page :260 (the create chain) and :263 (the verb bar's
Move), screening-page :145, languages-page :115 (the pseudo bar), strings-page :119 and :122. The other
18 name a sibling door that asks the same permission.

K2 — switches that bypass `mayCall` by naming a permission (not a door): `listing-page.tsx:141`
(`profiles:view`), `listing-page.tsx:1002` (`legal:view`), `screening-page.tsx:147` (`listings:view`),
`src/features/admin/legal/user-legal-card.tsx:25` (`legal:view`), `locations-overview.tsx:111` (the
section links, by each section's permission). Navigation's own `src/features/admin/use-admin-sections.ts:13`,
`guide-next.ts:60` and `nav-alerts.ts:32` read the section permissions as the menu's mechanism.

### The switch rule (DECIDE-AND-NAME), proposed

THE RULE: a switch gates regions; each region a switch gates that makes a writing call must reach the
switch's own door or route. A region is what the switch's value decides: the branch of `s ? A : B` (or
B for `!s`), the right side of `s && <A/>`, the rest of a function after `if (!s) return`, the call that
takes `s` (`enabled: s`, an argument), and, for `<Child prop={s}>`, the child's own uses of that prop
(followed into the child, negation kept). An alias (`const editable = s && …`) is followed as the switch.
"Reach" follows the region's calls through the repository's functions, hooks, a hook's returned
property (`const { revoke } = useRoleAssignment()` reaches only `revoke`'s door) and the components it
draws, to `<client>.rpc("<door>")` and `callRoute` / `downloadRoute` / `uploadRoute`. "Writing" is a door
of class `staff` in `scripts/doors/manifest.txt`, or a route method other than GET. A region that
reaches no write (a button that only opens a dialog by state, a word) is quiet.

Its hits on 3dc448dc3 (prototype; 65 switches, 154 regions: 88 quiet, 36 paired, 16 that make a write
and miss the switch's door, 4 read switches whose region reads another door, 10 that reach the switch's
door and also another write). The 16:
- `role-detail.tsx:61` → `RoleMetaCard` (`editable`) reaches `admin_update_role` — INC-1310.
- `user-detail.tsx:52` → the status block (:208) reaches `admin_set_account_status` — INC-1310.
- `user-detail.tsx:53` → Remove (:317) reaches `revoke_role`.
- `categories-page.tsx:263` → Reactivate (:739) reaches `admin_reactivate_category`; the verb bar (:909)
  reaches `admin_reorder_categories` and `admin_reactivate_category`.
- `screening-page.tsx:141` → `PhotoReviews`, `PhotoChanges`, the preview (:882) and `ListingPhotos`
  Allow (`listing-photos.tsx:275`) reach `admin_allow_listing_photo` (and `admin_review_photo_change`).
- `languages-page.tsx:115` → `LanguagesTable`'s order (:698) reaches `admin_set_language_order`.
- `strings-page.tsx:115` → `EntityEditor` (`data-scope.tsx:503`) reaches `admin_save_entity_translation`.
- `strings-page.tsx:116` → `DataScope` (:226, :548) and Approve all (:385) reach the approve-all and
  entity status doors.
- `strings-page.tsx:122` → `TransferBar` Undo (:236) and the bar (:417) reach `POST
  /api/admin/translations/import`.
None of the 16 is on a switch the census marks paired. The 4 read-switch regions are listings :120 and
screening :143 (the word switches), strings :119 (`get_my_translator_languages`), and countries :79 — a
prototype artefact: its export path carries `?file=countries`, which the prototype compared whole; the
guard compares the path without its query. A second check ("a region that reaches the switch's door
reaches no other write") was tried: its 10 hits include four switches the census marks paired
(`legal-version-view.tsx:300`, `legal-editor-form.tsx:96`, `strings-page.tsx:120`,
`screening-page.tsx:150`), because a region that draws a whole child counts the child's other switched
controls. It is not proposed.

What it cannot see (state hops: a control that sets state, a dialog drawn elsewhere that makes the call),
so these wrong pairs from the census are not among its hits: listings-page :121 (moves, tier),
categories-page :260, :261, :264, the remaining parts of :263 (pointer, delete), monetisation :36,
screening :145, :149, countries :76, locations :104, :106, languages :115's delete, sync, add and pseudo
bar, legal-page :75, legal-editor-form :95, user-detail :395. Word switches (listings :120, screening
:143) reach no write, so the rule leaves them alone.

Two ways to close that gap, for the ruling to choose:
(a) the rule as above, plus a second check on dialogs: a component that runs a writing call must sit
under a switch naming that call's door, found through the render site that opens it (`dialog.kind ===
"x" ? <XDialog/>` read as gated by the switch over the control that sets `kind: "x"`). It is a deeper
static trace; I have not prototyped it.
(b) structural pairing: each writing hook says its door (`useUpdateRole` answers `door:
"admin_update_role"`), and a switch takes the door from the hook the control calls (`mayCall({ door:
update.door })`), so the census is "no `mayCall` with a literal door where the hook is in scope". It
catches the dialogs too, but it edits the hooks and services, which are outside SCOPE (only "the
switch" may change in a wrong file).

## 4. Fix B — the filters

Readers of `TableSelectDeclaration` / `choicesReady` (`rg -n "TableSelectDeclaration|choicesReady" src e2e
scripts`): `src/components/shell/table-filters.ts:17, 21, 58, 70, 117, 121, 201`;
`src/components/shell/table-filters.test.tsx:11, 22, 103`; and the nine consumer lines, exactly as the
brief lists them: `listings-page.tsx:179, 192, 206`, `screening-page.tsx:232, 246`,
`audit-page.tsx:123, 132`, `users-list.tsx:128`, `my-listings-page.tsx:196`.

Every select declaration (`rg -n 'kind: "select"' src`, 23): besides the nine above, 14 draw a fixed
list: `ai-calls.tsx:34, 42`, `strings-page.tsx:181`, `data-scope.tsx:130` (only their labels carry
counts, already said per INC-1144), `users-list.tsx:113`, `locations-page.tsx:144, 155`,
`my-listings-page.tsx:207`, `countries-page.tsx:100`, and `dev.style.tsx:1117, 1126, 1138, 1150,
1169` (fixtures).

The reads behind the nine, and what each already offers:
- markets — `useOpenMarkets` (`src/components/shell/location-data.ts:244`): `isLoading`, `failed`,
  `failure`, `retry`.
- categories — `useCategoryTree` (`src/features/categories/category-tree.ts:491`): `isLoading`,
  `error` (a boolean), `failure`, `retry`.
- levels — `useLevelRows` (`src/features/levels/use-level-rows.ts:67`): `isLoading`, `error`, `retry`.
- audit facets — `useAuditFacets` (`src/features/admin/audit/use-audit.ts:26`) and roles —
  `useAdminRoles` (`use-admin-users.ts:81`): React Query (`error`, `refetch`).

None of All listings, Screening, Users or My listings says a failed markets, categories, levels or roles
read anywhere on the page today.

Premise found wrong (INC-1346): Audit already says its failed facets read once, with a Retry, beside the
chips: `audit-page.tsx:376-382` (`FailureNotice`, test id `audit-facets-error`, added by `4c44865ed`,
Bundle 10b ruling 1), proven by `src/features/admin/audit/audit-page.test.tsx:95` (AUD-U3 "a failed
facets read draws the notice with Retry, never silent empty choices"). What stays true: the declaration
carries no failure, so the two filters are "ready" and draw empty choices beside that notice. The
manifest row A11.4 (`scripts/conformance/user-facing-manifest.txt:402`) still words it as silent.

Where a notice can sit: every one of the five pages draws `FilterChips` in its toolbar's `chips` slot
(`listings-page.tsx:701`, `screening-page.tsx:736`, `audit-page.tsx:375`, `users-list.tsx:292`,
`my-listings-page.tsx:796`); the filter panel's rows (`filter-panel-body.tsx`) load on demand inside the
Filters sheet, so a notice there would wait for the sheet. `FailureNotice` is in the entry chunk (my
build: `data-failure-reason` is in `dist/client/assets/index-CFjurYTR.js`), so no page gains a module.

Constraints from the never-list: `src/features/my-listings/my-listings-page-states.test.tsx:37-41`
mocks `useTableFilters` as `{ filters: [], ready: true }`, and `listings-page-states.test.tsx:59-80`,
`screening-page-states.test.tsx:45-51` and `listing-page-states.test.tsx:55-59` mock the reads without
`error` / `retry`. A design that adds a field to the hook's answer, or reads a read's failure as
always present, would change those files' outcome.

The design I propose (DECIDE-AND-NAME): `choicesReady?: boolean` is replaced by a required-when-read
`choices?: { loading: boolean; failure: unknown; retry: () => void; testid: string }` on
`TableSelectDeclaration` (no select can say "ready" without saying its failure); the failure rides into
each `TableFilter` by the existing spread; `FilterChips` draws one `FailureNotice` per failed read, keyed
by `testid` (two filters fed by one read share the testid, so one notice), even when no chip is drawn;
`ready` stays as today (a failed read is settled, so the list still reads). Audit keeps `audit-facets-error`
as its read's testid and its page-local notice goes, so AUD-U3 keeps its words and ids. The census: a
`kind: "select"` declaration whose `options` come from a read (not a constant) and that has no
`choices` key; plant `audit-page.tsx:123` as it stands.

INC-1355 on two pages: `listings-page.tsx:172` and `screening-page.tsx:162` label each row's level as
`admin.listings.level.unknown` when `levels.rows` is empty; the levels notice from the filter covers it,
and no second notice is drawn. The same pages also draw a row's market by `markets.markets.find(…)`
(`listings-page.tsx:159`, `screening-page.tsx:206`), which a failed markets read leaves unnamed; the
markets notice covers that too.

Tests: `table-filters.test.tsx`, `filter-chips.test.tsx` and the filter panel's tests under
`src/components/shell/`; `listings-page.test.tsx`, `listings-page-reports.test.tsx`,
`screening-decisions.test.tsx`, `screening-reject-dialog.test.tsx`, `audit-page.test.tsx`; never-list:
`listings-page-states`, `screening-page-states`, `audit-page-states`, `users-list-states`,
`my-listings-page-states`, `ai-calls-states`. No `users-list.test.tsx` or `my-listings-page.test.tsx`
exists.

## 5. The rows

- A1.3 (`user-facing-manifest.txt:306`, "Permission read fails") — answered by the new
  `src/routes/admin.test.tsx` with `uf:A1.3`.
- A11.4 (`:402`) — answered by a new audit component test with `uf:A11.4`.
- A4.2 (`:327`) — premise found partly wrong: the three states already have tests, none tagged:
  `user-detail-states.test.tsx:156` (UFA-7, loading and not found) and `user-detail-failure.test.tsx:63,
  76` (UD-F1, UD-F2, the failed read). The `*-states` file is on the never-list; `user-detail-failure.test.tsx`
  is the source file's own test, in scope. The states sit at `user-detail.tsx:94-99`, `:100-108` and
  `:109-112`.
- Allowlist lines: `scripts/conformance/user-facing-allowlist.txt:22` (A1.3), `:23` (A4.2), `:32`
  (A11.4); `:31` (A10.2) stays between A11.4 and UF-3's `:30` (A10.1).

## 6. Fix C — the gate reports

`rg --pcre2 -U` for a `useEffect` / `useLayoutEffect` body that calls `onMissing`, `onFields`,
`reportMissing`, `gate.report` or `register` (word-bounded; the brief's pattern also matched
`app-shell.tsx:802`, `reportSessionMissing`):
- passive `useEffect`: `step-details.tsx:123`, `step-pricing.tsx:164`, `step-where.tsx:1400`,
  `step-who.tsx:609` (the brief's four), and two the brief did not name:
  - `src/features/posting/wizard.tsx:531-533` — `reportMissing("category", …)` for step 1's leaf.
  - `src/features/posting/step-specifications.tsx:564-588` — `onFields(…, missing)`, which the wizard
    wires to `reportMissing("spec", …)` (`wizard.tsx:326-338`, drawn at :1573) and
    `reportMissing("price", …)` (`wizard.tsx:314-325`, drawn at :1609).
- layout effect: `src/components/forms/field.tsx:84` (`Field`), the model.
Both new hits are outside fix C's SCOPE ("the four step files and their tests").

Tests: `step-details-assist`, `step-details-limits`, `step-pricing`, `step-where` (and its `-no-map`,
`-order`, `-pin-failure`, `-shop-failure`), `step-who`, `wizard-frame`, `wizard-guide`; for the two new
hits `step-specifications.test.ts`, `-last-answer`, `-retry`, and the never-listed `-states`;
`src/components/forms/use-form-gate.test.tsx`, `field.test.tsx`.

## 7. First download (my build of 3dc448dc3)

Entry JS 209.2 / 210 KiB, CSS 22.7 / 24 KiB. The pages this lane touches: `/admin` 218.1 / 219,
`/admin/` 219.0 / 220, `/admin/audit` 303.0 / 304, `/admin/listings` 340.3 / 341, `/admin/screening`
361.0 / 362, `/admin/users` 302.2 / 303, `/admin/users_/$userId` 303.2 / 304, `/admin/roles_/$roleId`
284.3 / 285, `/my-listings` 315.9 / 317, `/post` 411.2 / 412, `/post_/$listingId` 411.1 / 412,
`/my-listings_/$listingId_/edit` 411.2 / 412, `/admin/listings_/$listingId_/edit` 423.6 / 425. No page
is inside the 0.3 KiB band today. `FilterChips` and `FailureNotice` are shared shell code, so part B
moves every page that draws a table; STEP 7 measures base and tree.

## 8. Findings (§13)

- K2 bypasses of `mayCall` by permission (§3).
- `locations-page.tsx:394` — the places Export calls `GET /api/admin/locations/export` (:199) with no
  switch, while the countries Export has one (`countries-page.tsx:79`).
- `src/components/app-shell.tsx:934` — the shell's `isAdmin` reads `permissions.includes(…)`, so a
  failed permission read hides the Admin tab; the shell is outside SCOPE.
- One more shell finding is in the chat, not here.

## 9. For ruling 1

1. The switch rule: the region rule of §3 (with its hits), and whether to add (a) the dialog trace or
   take (b) the structural pairing (which needs the hooks and services in SCOPE).
2. The pairing's routing: 26 wrong switches. Does every one change in this lane (each control gets a
   switch naming its own door, so one switch becomes several), or only those the rule catches? The eight
   that differ in permission change who sees a control: confirm that as in scope (TOLERANCES: "a screen
   whose words or test ids change beyond the states this GO names is a STOP"; visibility for a role is
   neither, but it is a behaviour change). `listing-page.tsx` :139 is UF-3's file: leave it to UF-3 or a
   later lane? The word switches (:120, :143) and navigation-only controls: exempt by name, or paired by
   the door their words or their destination name?
3. Fix C: `wizard.tsx:531` and `step-specifications.tsx:564` are outside SCOPE; add them (both are the
   same class, and the census refuses them), or allowlist them with an INC?
4. INC-1346: Audit already says the failure (AUD-U3). Confirm that fix B moves Audit onto the
   mechanism with its test id kept, and that A11.4's new test answers the row as the mechanism draws it.
5. A4.2: tag the existing tests (`user-detail-failure.test.tsx` titles gain `uf:A4.2`; UFA-7 sits in a
   never-listed file) or write the new component test the brief asks for?
6. Fix B's design (§4) and fix A's: `usePermissions` gains `retry` (the query's own `refetch`); `AdminGate`
   draws `FailureNotice` (`error` from the read, a new test id `admin-permissions-failed`, no new
   string: the notice's words are its existing kinds) in place of `AdminChecking` when the read failed
   with no grants held, and navigates nowhere; with grants held it keeps them and draws as today.
