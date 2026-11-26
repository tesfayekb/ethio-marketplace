# Lovable 10b part 2 — controls follow their door, D19, D41, INC-1307, rate family, one key retired

Branch `lovable/next` = dev `70df93185`. Plan only; nothing changed.

## 1. INC-1281 — 58 lines, 22 files (allowlist lines 38–95)

Each `permissions.includes("x")` becomes `mayCall(<target>)` from `useMayCall()`; a screen that draws the permissions read's failure keeps reading `error` from `usePermissions`. Where one flag today guards controls calling different doors, the flag is split (one `mayCall` per door). "Drawn changes" names who sees a difference; "same" means the door asks the permission the copy compared.

| allowlist line → file:line | control / read | target | resolves to | drawn changes |
|---|---|---|---|---|
| 38 locations-overview.tsx:34 | places tile read switch | door `admin_list_locations` | locations:view | same (D52: tile now follows the read it shows) |
| 39 locations-overview.tsx:35 | countries tile read switch | door `admin_list_countries` | countries:view | same |
| 40 nav-alerts.ts:28 | overdue-review alert read | door `legal_review_overdue` | legal:view | same |
| 41 listings-page.tsx:120 | seller-email filter read | door `admin_list_users` | profiles:view | same |
| 42 screening-page.tsx:140 | seller-email filter read | door `admin_list_users` | profiles:view | same |
| 43 screening-page.tsx:147 | job health read | door `admin_job_health` | services:view | same |
| 46 ai-page.tsx:64 | Edit (row) | door `admin_set_ai_feature` | services:manage | same |
| 47 attributes-page.tsx:123 | Assign, Edit, Create, depend | doors `admin_link_attribute` / `admin_upsert_attribute` | categories:update | same |
| 47 (split) attributes-page.tsx:469 | Remove from category (`-more-remove`) | door `admin_unlink_attribute` | categories:update | **D48: staff with update but not restructure now see it; restructure-only staff no longer do** |
| 48 attributes-page.tsx:124 | Merge, Delete | doors `admin_merge_attributes` / `admin_delete_attribute` | categories:restructure | same |
| 49 attributes-page.tsx:126 | Import | route `/api/admin/attributes/import` POST | categories:import | same |
| 50 categories-page.tsx:260 | Create | door `admin_create_category` | categories:create | same |
| 51 categories-page.tsx:261 | Window, Exclusions, Attributes, editor verbs | doors `admin_set_category_window` / `admin_set_country_exclusions` / `admin_update_category` | categories:update | same |
| 51 (split) categories-page.tsx:~721 | Move up / Move down | door `admin_reorder_categories` | categories:update | **D47: moved from restructure to update** |
| 52 categories-page.tsx:262 | Pointer, Retire, Reactivate, Delete | doors `admin_add_category_pointer` / `admin_retire_category` / `admin_reactivate_category` / `admin_delete_category` | categories:restructure | same |
| 53 categories-page.tsx:263 | Image, bulk generate | door `admin_set_category_images`; route `/api/admin/categories/generate-image` POST | categories:assets | same |
| 54 categories-page.tsx:265 | Import | route `/api/admin/categories/import` POST | categories:import | same |
| 55 countries-page.tsx:76 | Edit, Rail order | doors `admin_upsert_country` / `admin_set_country_root_order` | countries:update | same |
| 56 countries-page.tsx:77 | Open/close country | door `admin_set_country_active` | countries:activate | same |
| 57 countries-page.tsx:78 | Import | route `/api/admin/locations/import` POST | locations:import | same |
| (D53, new gate, no line) countries-page.tsx:~300 | Export (`country-export`) | route `/api/admin/locations/export` GET | locations:view | **hidden for staff without locations:view (today shown, then refused)** |
| 58 listing-page.tsx:137 | Edit, moves, tier, photo remove, undo | doors `admin_edit_listing` / `admin_set_listing_policy` / `admin_set_listing_tier` / `admin_undo_listing_edit` | listings:enforce | same |
| 59 listing-page.tsx:138 | View as | door `begin_impersonation` | impersonation:use | same |
| 60 listing-page.tsx:144 | reports read + panel | door `admin_listing_reports` | listings:review | same |
| 61 listing-page.tsx:238 | Allow photo | door `admin_allow_listing_photo` | listings:review | same |
| 62 listings-page.tsx:121 | moves, tier, bulk | doors `admin_set_listing_policy` / `admin_set_listing_tier` | listings:enforce | same |
| 63 listings-page.tsx:122 | View as | door `begin_impersonation` | impersonation:use | same |
| 64 listings-page.tsx:248 | report counts read | door `admin_open_report_counts` | listings:review | same |
| 65 locations-page.tsx:103 | Add / add child | door `admin_upsert_location` | locations:create | same |
| 66 locations-page.tsx:104 | active toggle, reorder | doors `admin_set_location_active` / `admin_reorder_locations` | locations:update | same (rename via upsert asks create — see note A) |
| 67 locations-page.tsx:105 | Move, Delete | doors `admin_move_location` / `admin_delete_location` | locations:restructure | same |
| 68 locations-page.tsx:106 | Import | route `/api/admin/locations/import` POST | locations:import | same |
| 69 monetisation-page.tsx:36 | every save | door `admin_save_package_price` (and siblings, all packages:update) | packages:update | same |
| 70 screening-page.tsx:139 | Approve/Reject (row, bulk, preview), photo reviews/changes | doors `admin_review_listing` / `admin_review_photo_change` | listings:review | same |
| 70 (split) screening-page.tsx:445 | Show number | door `admin_reveal_listing_contact` | listings:reveal | **D34: follows listings:reveal, not listings:review** |
| 71 screening-page.tsx:142 | preview photos, Edit | door `admin_edit_listing` | listings:enforce | same |
| 72 screening-page.tsx:146 | name-check Clear | door `admin_name_check_clear` | profiles:update | same |
| 73 screening-page.tsx:148 | Resume job | door `admin_job_resume` | services:manage | same |
| 74 legal-editor-form.tsx:95 | Save draft, fields | door `admin_save_legal_draft` | legal:edit | same |
| 75 legal-editor-form.tsx:379 | Publish | door `admin_publish_legal_version` | legal:publish | same |
| 76 legal-editor-form.tsx:392 | save-first caption | door `admin_publish_legal_version` | legal:publish | same |
| 77 legal-facts-card.tsx:169 | facts Edit | door `admin_set_legal_settings` | legal:edit | same |
| 78 legal-page.tsx:75 | New version / edit links | door `admin_save_legal_draft` | legal:edit | same |
| 79 legal-page.tsx:241 | Translate (in force) | door `admin_add_legal_translation` | legal:publish | same |
| 80 legal-version-view.tsx:300 | Add translation | door `admin_add_legal_translation` | legal:publish | same |
| 81 legal-version-view.tsx:499 | Export acceptances | door `admin_export_legal_acceptances` | legal:export | same |
| 82 legal-version-view.tsx:561 | Edit draft | door `admin_save_legal_draft` | legal:edit | same |
| 83 role-detail.tsx:57 | matrix ticks, meta edit | doors `admin_set_role_permission` / `admin_update_role` | roles:update | see D41 |
| 84 role-detail.tsx:58 | Delete | door `admin_delete_role` | roles:delete | same |
| 85 roles-list.tsx:57 | Create | door `admin_create_role` | roles:create | same |
| 86 languages-page.tsx:115 | flags, order, add, delete | doors `admin_set_language_flags` / `admin_set_language_order` / `admin_upsert_language` / `admin_delete_language` | translations:manage | same |
| 87 strings-page.tsx:115 | string editor save, flagged | door `admin_save_translation` | translations:update | same |
| 88 strings-page.tsx:116 | Approve, approve all | doors `admin_set_translation_status` / `admin_approve_all_translations` | translations:approve | same |
| 89 strings-page.tsx:117 | context box (`string-context-*`) | door `admin_set_key_context` | translations:manage | same |
| 89 (split) strings-page.tsx:413 | Transfer bar: Export | door `admin_export_translations` | translations:view | **D44: viewers without manage now see Export** |
| 89 (split) transfer bar: Import / Undo | route `/api/admin/translations/import` POST; door `admin_undo_import` | translations:update / translations:manage | **D44: Import follows update; Undo follows manage** (bar drawn when any of its three is allowed; props passed in, `transfer-bar.tsx` gains three booleans) |
| 89 (split) strings-page.tsx:124/280 | translator-scope read | door `admin_get_translator_scope` | translations:manage | read switch stays a page decision: **named, not moved** (it asks "is this person a manager", not "may this control call") — kept with its allowlist line unless you rule otherwise |
| 90 strings-page.tsx:118 | Machine translate | route `/api/translate` POST | translations:machine | same |
| 91 user-detail.tsx:52 | edit form, status | doors `admin_update_profile` / `admin_set_account_status` | profiles:update | same |
| 92 user-detail.tsx:53 | assign/remove role | doors `assign_role` / `revoke_role` | roles:assign | same |
| 93 user-detail.tsx:181 | View as | door `begin_impersonation` | impersonation:use | same |
| 94 user-detail.tsx:392 | translator languages card | door `admin_set_translator_languages` | translations:manage | same |
| 95 admin.listings_.$listingId_.edit.tsx:83 | Approve/Reject from screening | door `admin_review_listing` | listings:review | same |

Note A: rename of a location calls `admin_upsert_location` (locations:create); today it sits under `mayUpdate`. At build I read the editor's call and follow the door; if it is upsert, the rename control moves to locations:create (drawn change for update-only staff). Same check for countries' editor.

Not moved (no door): comparisons at listing-page.tsx:139 `profiles:view`, :991 `legal:view`, screening-page.tsx:144 `listings:view` are link gates to other pages and are not `| INC-1281` lines; untouched. Line 89's scope read as above.

DPM-1's floor (≥70) will fail after the move (INC-1308, Cursor 8a); every other DPM assertion, stale-line and unlisted check must be clean.

## 2. D19 — Write for me after `featureOff`
- `step-details.tsx`: a wizard-session flag `assistOff` set when the assist answer's code is `featureOff`; while set, `post-assist` is not drawn and `post-assist-refusal` keeps its existing `featureOff` words. Held where the wizard session lives (the step's parent state if the step remounts; read at build — if it needs a file outside my list, I stop).
- Test SDA-U1..U3 (free): each of `featureOff`, `providerUnavailable`, `assistBudgetSpent` draws its words in `post-assist-refusal`; SDA-U1 also proves the button is gone after `featureOff`, and SDA-U2 that it stays after `providerUnavailable`.
- Not screen-only: hiding before any press needs a read of the switch (yours to record).

## 3. D41 — role matrix
- `permission-matrix.tsx` gains `readOnly: boolean`; `isSystem` draws only `admin.roles.systemLockedNote`; `readOnly && !isSystem` draws `admin.roles.readOnlyNote` (`role-readonly-note`); ticks disabled when `isSystem || readOnly`.
- `role-detail.tsx`: `isSystem={role.isSystem}`, `readOnly={!mayUpdate}`, `mayUpdate`/`mayDelete` from `mayCall` (lines 83, 84).
- Tests RD-5 (system role → system note only), RD-6 (custom, no right → read-only note, no system note, ticks disabled), RD-7 (custom, with right → neither note). IDs free.

## 4. INC-1307 words
- `category-refusals.ts`: `slugTaken` → `admin.categories.error.slugTaken`, `reassignTargetInvalid` → `…reassignTargetInvalid`, `badValue` → `…windowOrder`; `owed` removed. `listing-refusals.ts`: `categoryFixed` → `admin.listings.edit.error.categoryFixed`; `owed` removed. Ten `| INC-1307` lines removed.
- Tests CRF-4, CRF-5, CRF-6, LRF-8 (free), one per word, exact text.

## 5. Rate family
`RATE_FAMILY = { … } as const satisfies DoorFamily<{ doors: never }>` — expressible today (`rateLimited` is a `GateCode`, optional; nine families already use `doors: never`). No `src/lib/` change. Its `| INC-1280` line removed. FR-U16 (free) asserts the family's two keys unchanged.

## 6. Retire `post.photo.refusal.screeningPaused`
Search `rg screeningPaused src e2e scripts`: only `en-base.ts:561` and `am-base.ts:521`. Both entries deleted.

## Words
Script writes the five keys into `en-admin.ts` / `am-admin.ts` from the JSON after checking sha256 `903eb05a…1135e`; then a byte comparison of each written value against the JSON.

## Tests that read what changes
- Unit: existing tests of screening, attributes, categories, countries, strings/transfer bar, role detail that mock `usePermissions` with a permissions list keep passing when the list holds the door's permission; any mocking the old permission for Show number / Move up / Remove / Export is updated to the door's permission (named at build with file:line).
- Browser (not mine): `e2e/admin-screening.spec.ts:630–746` (Show number) and `e2e/admin-attributes-library.spec.ts:562–651, 821` and `e2e/admin-categories-console.spec.ts:1098–1100` assert these controls; they pass only if their signed-in staff hold listings:reveal / categories:update. I could not read the fixture roles' permission sets in this turn — please confirm or give to Cursor. `e2e/post-wizard-specs.spec.ts:436, 1282` press `post-assist` with writing help on: unaffected.

## Not screen-only
D19 pre-press hiding (switch read). Nothing else.

## Build checks
Typecheck; eslint + prettier on touched files; `bunx vitest run src`; door-permissions.test.ts (only DPM-1 floor may fail), door-words.test.ts, forms guard, locale guards; `bun run i18n:usage` with maps committed; final write-back from `70df93185` of platform paths. Sandbox `git init` limits on some conformance tests will be named.
