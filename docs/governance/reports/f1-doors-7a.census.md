# f1-doors-7a — the census (STEP 1)

Base: dev 470135181 (the lane `cursor/f1-doors-7a` from origin/dev at 470135181, the merge of pull request #73). Every
live fact below comes from two read-only probes run on the local proof stack (`bun run db:proof --fresh`, DEC-343), a
scratch migration that raised its readings and was moved out of the tree after each run (`git status --short` empty
after each); the probes' text is kept under `/tmp/ethio-scratch/f1-doors-7a/` (probe1.sql, probe2.sql), the operator's
to remove. Static facts come from the last declarations in `supabase/migrations/` and from `rg` over `src/`, `e2e/`,
`scripts/`. The newest migration mark on the stack: 20261119050600.

## consumers

### The shell (the rate limit)

The shell's three bodies on the local stack, md5 of `replace(prosrc, chr(13), '')`, against the brief's staging read:

| function | live md5 (local) | brief's first 12 (staging) | CR in the local body |
|---|---|---|---|
| `door_context(text,text,text,text,character,text)` | `5a05ee77766181a4256d5b7efce36c41` | 5a05ee777661 — equal | no |
| `door_refused(text,text,text)` | `1a94a1b3ad3446749a1d08d9c096df02` | 1a94a1b3ad34 — equal | no |
| `rate_gate(text)` | `ee56a11fdbe5fe70d9ce8ba176b9ba62` | ee56a11fdbe5 — equal | no (staging's has CR line ends, per the brief; the stripped md5 agrees) |

All three are VOLATILE SECURITY DEFINER, `search_path=public`, executable by `service_role` only (anon, authenticated
and PUBLIC false). `door_refuse(text,text)` md5 `55f9bf0a6c4c4b2cc57d304df779e7fc`, INVOKER, service_role only;
`account_is_deactivated(uuid)` md5 `ab1a62340b48b3ce2704d20ad20cb8fa`, SQL DEFINER, service_role only;
`has_permission_scoped(uuid,text,text,character,text)` md5 `3825186312d23eb61175be8134b624f8`, service_role only.

Every door that names a dial: 124 manifest lines carry a dial cell other than `-` (an `awk` over
`scripts/doors/manifest.txt`'s sixth cell): staff_config 63, staff_moderation 10, revise 9, draft 5, import_commit 4,
import_undo 4, staff_translation 4, alias_check 2, identity 2, account_pref 2, save 2, promote 2,
staff_machine_translation 2, and one each for contact_reveal, options_read, password_remove, photo_remove,
viewing_place, listing_read, schema_read, impersonation, legal_export, legal_accept, post, report, review_reveal.
`rate_dials` on the stack holds 27 rows (the 26 above and `contact_reveal_sellers`, which a door spends inside its body).
Each door on the shell whose dial cell is not `-` reaches `door_context`'s dial branch and so `rateLimited`; none of
this family's readers names a dial (a reader class refuses one).

Every reader of the message `rateLimited`: `rg -F 'rateLimited' src e2e scripts` (locales and generated types aside)
→ 274 hits in 122 files. The ones that compare it exactly (the ones a detail could break):
`src/routes/l.$slug.tsx:161`, `src/features/admin-screening/use-screening.ts:364,395`,
`src/server/supabase/user-client.ts:370` (`doorAnswer`), `src/lib/refusal-tail.ts:38`,
`src/features/posting/preview/listing-detail.tsx:794,1522`, `src/features/posting/step-where.tsx:2129,2136,2223,2230`,
`src/features/posting/use-draft.ts:425`, `src/features/posting/map/geocode.ts:44`,
`src/features/admin-listings/listings-page.tsx:317` (`doorCode(message).code` — reads the head, so a detail is safe),
`src/features/ad-page/report-ad-dialog.tsx:73`, `src/lib/error-text.test.ts:19`; e2e PR-7 (`posting-routes.spec.ts:563`,
`entry.reason`), PR-49 (`:1311`), PW-41 (`post-wizard-place.spec.ts:1540`), VP-4 (`viewing-place.spec.ts:184`,
`refusedPlace` returns the head), AP-25 (`ad-page-doors.spec.ts:752,756`, `.error` exact), AP-27 (`:855,860`, `.error`
exact), `e2e/helpers/rate-window.ts:57` and `import-security.spec.ts:834` (a route's own `error` field — not the gate).
Every one of them that reads the refusal's `reason` or the head before `:` is unchanged by a detail; the two that compare
the whole `error` string (AP-25, AP-27) read a route answer (`ad-page-refusals`), whose form is read under `tests`.

### The readers — one row per function of the family

The `class after` column is this census's proposal (THE LAWS (a) → (e)); the `refusal today → code` column is the
live body's own sentences (probe 2 read every `RAISE EXCEPTION '…'` of the family) and the code each would become from
codes that already exist (`door_refuse` codes counted across `supabase/migrations/`: `notYourListing` 21, `badValue` 65,
`badSize` 1; `notYours` is raised today by `my_legal_version` and read by `src/lib/reader-failure.ts`; `door-codes.ts`
does not grow).

| function | manifest | last declaration | live md5 (local stack) | lang · vol · mode | grants today | callers (client) | SQL callers | refusal today → code | class after | reason |
|---|---|---|---|---|---|---|---|---|---|---|
| `get_attribute_options_version(uuid)` | signed-in-reader (manifest:191) | `20260916235955_fd11c7ab-d2b3-4fb9-b3a5-7e4bfc68b0f7.sql:266` | `aa19b177393e2622497490154b9cc07c` | sql · s · DEFINER | authenticated,service_role | route `attributes.$id.options.ts` (user client, the person's token) | get_attribute_options [D] | none | **(b)** | a person's token reaches it; a DEFINER door calls it → closed core + reader |
| `has_permission(uuid,text,text)` | signed-in-reader (manifest:207) | `20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql:42` | `c633eae927473b96a4e228a7bdd1356a` | sql · s · DEFINER | authenticated,service_role | `user-client.ts:154` callerHasPermission (the person's client); e2e admin-users, DRF-1 | 22 policies (authenticated), 28 functions, `has_permission_scoped` | none (boolean) | **(c)** | helper: policy `user_roles_read` and 21 more need the grant; INC-409's branch kept; body untouched |
| `impersonated_get_profile(uuid)` | signed-in-reader (manifest:208) | `20260822073000_d748b282-1618-4d54-8c58-88f9e194130c.sql:235` | `b39a3d18661a80b0ed30ccf7de74e1ab` | plpgsql · s · DEFINER | authenticated,service_role | `impersonation-service.ts:93` (supabase-door rpc, the person's token) | none | via impersonation_target: 'impersonation session expired' (kept, see decisions) | **(a)** | entry |
| `impersonated_list_listings(uuid,integer,integer)` | signed-in-reader (manifest:209) | `20260928034942_247a3ed0-ff97-43f9-9e8d-3c2071c810df.sql:994` | `a27491a4009fe4a05e43a57423ac169e` | plpgsql · s · DEFINER | authenticated,service_role | `impersonation-service.ts:112` (the person's token) | none | as above | **(a)** | entry |
| `impersonation_target(uuid)` | signed-in-reader (manifest:210) | `20260822073000_d748b282-1618-4d54-8c58-88f9e194130c.sql:219` | `a50583be2e3d2768b10b9cefd04a06d3` | plpgsql · s · DEFINER | authenticated,service_role | none (no quoted name in src/ or e2e/) | impersonated_get_profile [D], impersonated_list_listings [D] (both run it as owner) | 'impersonation session expired' (untouched) | **(e)** | no browser caller |
| `listing_contact_refusals(jsonb)` | signed-in-reader (manifest:217) | `20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql:835` | `d8b57864116db16570058346b4a9e04e` | plpgsql · i · INVOKER | authenticated,service_role | route `listings/identity.ts:175` (user client) | save_posting_identity [D], validate_listing_draft [D, COMPUTED] | none (jsonb list) | **(b)** | entry with SQL callers; SECURITY INVOKER today — the reader must be DEFINER to call the closed gate (decision) |
| `listing_counts(uuid)` | signed-in-reader (manifest:218) | `20261017105751_e6d71c12-f4b2-4cda-a556-79b0432c369f.sql:267` | `717b7d1e73be25900600f7a7c6c491ce` | plpgsql · s · DEFINER | authenticated,service_role | `my-listings` service (the person's token); e2e ML/MLA | none | 'not authenticated' → notSignedIn (gate); 'not your listing' → notYourListing | **(a)** | entry |
| `listing_history(uuid)` | signed-in-reader (manifest:219) | `20261014230715_3853703f-4ef3-46a1-b2b8-4129c05ac9f5.sql:103` | `8b71b1c3368284e598e18d6f29c2cda7` | plpgsql · s · DEFINER | authenticated,service_role | my-listings (the person's token); e2e ML-2 | none | 'not authenticated' → gate; 'not your listing' → notYourListing | **(a)** | entry |
| `listing_saved(text)` | signed-in-reader (manifest:220) | `20261017105713_a18879b5-2c1e-4878-bb89-2644c6675be4.sql:110` | `0480877ae73fee3a60e82d950b246335` | plpgsql · s · DEFINER | authenticated,service_role | `ad-page/save.ts:47` (the person's token) | none | 'not authenticated' → gate | **(a) → viewer's state** | replaced by the viewer's-state reader (DROP + CREATE, INC-1191) |
| `my_last_listing_private(uuid)` | signed-in-reader (manifest:224) | `20261003221958_2a467fcc-6190-4aec-9112-78d63f638d71.sql:115` | `7319e9bab115b8681131ed524cb1ab1b` | plpgsql · s · DEFINER | authenticated,service_role | posting (the person's token) | none | 'not authenticated' → gate | **(a)** | entry |
| `my_legal_history()` | signed-in-reader (manifest:225) | `20261019103558_df2b6472-8b61-4c4b-a074-94b1e69e3724.sql:242` | `3903d96295286e083e84a045475a53b7` | plpgsql · s · DEFINER | authenticated,service_role | account legal page (the person's token) | none | 'not authenticated' → gate | **(a)** | entry |
| `my_legal_status(text[])` | signed-in-reader (manifest:226) | `20261020041607_c88f99d5-b2cd-495f-93c1-8c9de328a1db.sql:15` | `6310784b019a6f57f6596e199d0349ad` | plpgsql · s · DEFINER | authenticated,service_role | legal gate, auth forms (the person's token) | none | 'not authenticated' → gate | **(a)** | entry |
| `my_legal_version(uuid)` | signed-in-reader (manifest:227) | `20261021222622_b1ecffc0-4aab-4eeb-9a5e-eb2f304061ee.sql:111` | `47d5a78440bfa5f51399153e3d06db11` | plpgsql · s · DEFINER | authenticated,service_role | account legal version page (the person's token) | none | 'not authenticated' → gate; 'notYours' → notYours (kept) | **(a)** | entry |
| `my_listing(uuid)` | signed-in-reader (manifest:230) | `20261105080109_cef94b0d-43de-406a-8a52-787b326f6435.sql:194` | `bd071192f16c2c21ad1ec12932ab9c7d` | plpgsql · s · DEFINER | authenticated,service_role | `my-listing.ts` (the person's token); e2e MLA | none (the word in `my_listings` is a comment) | 'not authenticated' → gate; 'not your listing' → notYourListing | **(a)** | entry |
| `my_listing_certification(uuid)` | signed-in-reader (manifest:228) | `20261019140533_709c3922-984d-4e4d-a62a-a89543f08e83.sql:89` | `bfcddd0a948b320e9947d1d053bbe8be` | plpgsql · s · DEFINER | authenticated,service_role | my-listings; route `upload/photo.ts:194` (user client) | none | 'not authenticated' → gate; 'not your listing' → notYourListing | **(a)** | entry |
| `my_listing_private(uuid)` | signed-in-reader (manifest:229) | `20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql:55` | `b7332e5c36a8300aa73ba6084a43110b` | plpgsql · s · DEFINER | authenticated,service_role | posting (the person's token) | none | 'not authenticated' → gate; 'not your listing' → notYourListing | **(a)** | entry |
| `my_listings(text,integer,integer,text,uuid,text)` | signed-in-reader (manifest:231) | `20261105080109_cef94b0d-43de-406a-8a52-787b326f6435.sql:61` | `8eeba7bbb45afe77623d4f2d6dd898af` | plpgsql · s · DEFINER | authenticated,service_role | my-listings service (the person's token); e2e MLP | none (the word in `listing_group_of` is its message text) | 'not authenticated' → gate; 'unknown group' / 'bad page' / 'bad search' / 'unknown mark' → badValue:<field> | **(a)** | entry |
| `my_recent_categories()` | signed-in-reader (manifest:232) | `20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql:709` | `b309bc46855d34842419b1ca4b5bd500` | plpgsql · s · DEFINER | authenticated,service_role | posting category step (the person's token) | none | 'not authenticated' → gate | **(a)** | entry |
| `my_saved_listings(jsonb,integer)` | signed-in-reader (manifest:233) | `20261108070504_5e07ef82-a019-4294-95c9-bc6f44d4335b.sql:28` | `a97294ca81edeeafb02688d1afced62a` | plpgsql · s · DEFINER | authenticated,service_role | saved page (the person's token) | none | 'not authenticated' → gate; 'my_saved_listings: badSize' → badSize; '…: badCursor' → badValue:cursor | **(a)** | entry |
| `my_seller_line()` | signed-in-reader (manifest:234) | `20261029091909_85de2619-cec0-459c-b6c0-4e58f4e906b8.sql:144` | `3f047866c6606f435e19116b176076de` | plpgsql · s · DEFINER | authenticated,service_role | posting identity (the person's token) | none (the word in `seller_public_previous_alias` is a comment) | 'not authenticated' → gate | **(a)** | entry |
| `my_seller_place()` | signed-in-reader (manifest:235) | `20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql:391` | `207a62507515108ecbb5028f08e62df0` | plpgsql · s · DEFINER | authenticated,service_role | posting place (the person's token) | none | 'not authenticated' → gate | **(a)** | entry |
| `my_viewing_location()` | signed-in-reader (manifest:236) | `20261010065637_01da330c-2189-4927-bc80-ef6c6f0ed58f.sql:71` | `1bb879fd3701485cf77e99fd499be486` | plpgsql · s · DEFINER | authenticated,service_role | place carry (the person's token) | none | 'not signed in' → gate | **(a)** | entry |
| `catalog_find_version()` | public-reader (manifest:180) | `20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql:36` | `1b5e2af66273a0c6354ae408b5edaf30` | sql · s · DEFINER | anon,authenticated,service_role | none | catalog_find_refresh [D], catalog_find_sweep [D], catalog_search [D] | none | **(e)** | no browser caller |
| `feed_page(uuid,uuid,jsonb,integer)` | public-reader (manifest:189) | `20261108070502_6ea5ac5b-1a2f-4a63-8c3a-a69b6443e755.sql:28` | `c2bd59a8d545bd1b4e45964785996c89` | plpgsql · s · DEFINER | anon,authenticated,service_role | route `feed.ts` (anonymous client); e2e AP/feed-route anonymous, SC `buyer()` anonymous | feed_bench [I, service only], feed_index_check_sweep / seller_feed_page (comments only) | sentences kept | **(d)** | no person's token reaches it; `authenticated` held for no caller → revoked |
| `get_browse_tree(text)` | public-reader (manifest:193) | `20260903025501_f90d7b5a-e159-4084-9982-cb5e4f42a96b.sql:158` | `f2f15bba0a10fd29d49ecec7498a90fe` | sql · s · DEFINER | anon,authenticated | none | none | none | **(e)** | no caller (check-doors allowlist line leaves) |
| `get_category_attributes(uuid,boolean)` | public-reader (manifest:194) | `20260810065832_aa5446b7-988d-4ba3-823b-759ed735f3eb.sql:26` | `8a2b9e09355e4c9a27977d98fbfcf65f` | sql · s · DEFINER | anon,authenticated | none | none | none | **(e)** | no caller (check-doors allowlist line leaves) |
| `get_category_tree_version()` | public-reader (manifest:195) | `20260928002133_f98b5cf0-bb5a-4842-ac89-7bad2fc31517.sql:290` | `50986b875c4a21713000147f166c3dc0` | sql · s · DEFINER | anon,authenticated,service_role | route `categories.tree.ts` (anonymous client) | catalog_find_version [D] | none | **(d)** | SQL; no person's token; `authenticated` revoked |
| `get_entity_bundle(text)` | public-reader (manifest:196) | `20260830080548_da0dfee5-6066-4087-b96b-dacfbac5c2a2.sql:16` | `4705b3271682868c4d91356a3cc77e2b` | plpgsql · s · DEFINER | anon,authenticated | `i18n/bundle.ts:93` (supabase-door rpc: the person's token when signed in) | none | none | **(a)** | entry (public class) |
| `get_location_tree(text)` | public-reader (manifest:198) | `20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql:44` | `cea6ecf180ea0913de58b8a36fe98b6c` | sql · s · DEFINER | anon,authenticated,service_role | route `locations.$country.ts` (anonymous client) | my_viewing_location [D], user_set_viewing_location [D] | none | **(d)** | SQL; no person's token; `authenticated` revoked |
| `get_location_tree_version(text)` | public-reader (manifest:197) | `20260915190024_efbee3c4-309b-49b1-8292-aa8a946dc188.sql:78` | `c85e0fab324fa4bb38509bcda55d0129` | sql · s · DEFINER | anon,authenticated,service_role | route `locations.$country.ts` (anonymous client) | none | none | **(d)** | SQL; no person's token; `authenticated` revoked |
| `get_open_countries()` | public-reader (manifest:201) | `20260917113152_479720fb-c520-42df-a685-4460bea6d037.sql:259` | `898d8d778aaf8906b4db575d6b665382` | sql · s · DEFINER | anon,authenticated,service_role | route `locations.ts` (anonymous client) | none | none | **(d)** | SQL; no person's token; `authenticated` revoked |
| `get_ui_bundle(text)` | public-reader (manifest:205) | `20260831060745_c719360f-757c-4a00-b2ba-71e4bc2bbf0a.sql:255` | `c0228102995224952a4b7fac3f41cc97` | plpgsql · s · DEFINER | anon,authenticated | none (unit-test mocks only) | none | none | **(e)** | no caller |
| `get_ui_bundle_parts(text)` | public-reader (manifest:203) | `20261031013352_e1fda8f7-ae33-4f90-a76e-508db50f026f.sql:23` | `afb591c106a49c3976be17840574eccd` | plpgsql · s · DEFINER | anon,authenticated,service_role | `i18n/bundle.ts:172` (the person's token when signed in); `translations-service.ts:377`; route `i18n.$lang.ts` (anonymous) | none | none | **(a)** | entry (public class) |
| `get_ui_bundle_version(text)` | public-reader (manifest:204) | `20260901234603_74ae387b-d985-4079-802e-9597270ac7c6.sql:202` | `5eb896d862489c1d7e40e4c52bb9b93d` | plpgsql · s · DEFINER | anon,authenticated | route `i18n.$lang.ts` (anonymous client) | none | none | **(d)** | no person's token; `authenticated` revoked |
| `legal_in_force(text,character)` | public-reader (manifest:213) | `20261024065107_5e8d01eb-edf3-4456-93e4-96ad2c7cee6f.sql:14` | `ff27d5272e924e6a26131189b87e4ce1` | plpgsql · s · DEFINER | anon,authenticated,service_role | `legal-reader.ts:152` (the person's token); `legal-page-data.ts` (anonymous on the server, the person's in `legal.publishing.tsx`) | none | 'permission denied' 42501 (signed-in-only kind, signed out) → notSignedIn | **(a)** | entry (public class) |
| `legal_scheduled(text,character)` | public-reader (manifest:215) | `20261024065107_5e8d01eb-edf3-4456-93e4-96ad2c7cee6f.sql:52` | `3973a5a0c000ac502cb327142b8a05bc` | plpgsql · s · DEFINER | anon,authenticated,service_role | `legal-page-data.ts` (as above) | none | as legal_in_force | **(a)** | entry (public class) |
| `level_perks_for(text,uuid,character)` | public-reader (manifest:216) | `20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql:131` | `662e1195e9779ac614ac4c929f4e51f3` | sql · s · INVOKER | anon,authenticated,service_role | e2e `adminClient()` only (service) | 9 DEFINER bodies; listing_photo_cap [I, service only] | none | **(e)** | SECURITY INVOKER; no browser role runs a caller → browser grants revoked, service kept |
| `price_shape_for_basis(text)` | public-reader (manifest:237) | `20260928034942_247a3ed0-ff97-43f9-9e8d-3c2071c810df.sql:70` | `cdae788c71d87c7e04fb1265ebde2142` | sql · i · INVOKER | anon,authenticated,service_role | none | validate_listing_draft [D] | none | **(e)** | SECURITY INVOKER IMMUTABLE; no browser caller |
| `price_unit_labels()` | public-reader (manifest:238) | `20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql:266` | `e5b8d0396107810b2bb28e28d5207c7c` | sql · s · DEFINER | anon,authenticated,service_role | `use-price-unit-labels.ts:17` (the person's token when signed in) | public_listing_json [D, COMPUTED] | none | **(b)** | entry with an SQL caller; SQL stays SQL in the core |
| `seller_feed_page(text,jsonb,integer)` | public-reader (manifest:252) | `20261108070503_ff2ee3b9-0e37-46b4-9214-e35bec6b61a2.sql:28` | `f982846d4bfbaca9e620e9be62988eee` | plpgsql · s · DEFINER | anon,authenticated,service_role | route `seller.ts` and `server/seller-page.ts` (anonymous client) | none | sentences kept | **(d)** | no person's token; `authenticated` revoked |
| `sold_cutoff()` | public-reader (manifest:259) | `20261019222105_f4f10b49-3bcb-44a4-a847-4c7ac1e202bc.sql:39` | `4a40715dc2d953a3fff5321d463546fd` | sql · s · DEFINER | anon,authenticated,service_role | none | policies `listings_public_read`, `listing_photos_public_read`, `listing_locations_public_read` (anon, authenticated); 11 DEFINER bodies | none | **(c)** | helper: the three policies need the grant; body untouched |
| `sold_visible_days()` | public-reader (manifest:260) | `20261019222105_f4f10b49-3bcb-44a4-a847-4c7ac1e202bc.sql:27` | `d866b678e0fa17db9955cca6782fcf79` | sql · s · DEFINER | anon,authenticated,service_role | `my-listing.ts:364` (the person's token); e2e LG-22 anonymous | sold_cutoff [D] (policy-run); the word in `admin_set_legal_settings` is a key literal; CHECK `legal_settings_sold_visible_days_check` is a column name | none | **(b)** | entry with a policy-run SQL caller → closed core; `sold_cutoff` onto the core |
| `translation_scope_ok(text)` | staff-reader (manifest:264) | `20260829050332_d4f5cd34-655c-4781-9a7b-e70bbc268142.sql:182` | `df925ba6ca44fe98a2f67eea830e4d26` | sql · s · DEFINER | authenticated | route `translate.ts:105` (user client, staff `translations:machine`) | 6 DEFINER doors + 4 INVOKER cores (no browser grant) | none (boolean) | **(b)** | entry with SQL callers; cell proposed `-` as a signed-in reader (cell-meaning) |

`(a)` = 21 bodies (17 signed-in, 4 public), plus `listing_saved` replaced; `(b)` = 5 readers; `(c)` = 2; `(d)` = 7;
`(e)` = 7 readers (and every helper below).

### The helpers — every manifest line of class `helper` (31)

Every helper's grant was judged against the caller that would need it. Probe 1 read every caller by a word match over
`pg_proc`, `pg_policies`, `pg_views`, CHECK constraints, column defaults, index expressions, trigger definitions and
`cron.job`; probe 2 read each caller's mode, grants and trigger use, and the browser roles' direct write rights on the
tables a CHECK or trigger of the family sits on. Findings: no policy, view, default, index or cron job names any helper;
every function caller is a DEFINER body, an INVOKER core with no browser grant (reached only from DEFINER doors), or an
INVOKER helper of the same chain whose own callers are DEFINER; the CHECKs (`attributes_bounds_check`,
`attributes_preset_check`, `category_attribute_links_visible_when_shape`) and the triggers (`listings_search_tsv_refresh`
on `listings`, `countries_anchor_on_insert` on `countries`) sit on tables `anon` and `authenticated` may neither INSERT
nor UPDATE (`has_table_privilege` false for `listings`, `attributes`, `category_attribute_links`, `legal_settings`,
`countries`). The only quoted calls under `src/` and `e2e/` are `assert_parent_not_catchall`
(`e2e/admin-categories-lifecycle.spec.ts:249`, CT-14) and `cat_primary_parent` (`:2616`, CT-33), both on
`adminClient()` (service role, which keeps its grant). So every helper's browser grant has no caller: all 31 are
class (e) by THE HELPERS' rule ("a helper whose every caller now runs as its owner loses its browser grant"). The
manifest's reason word `policy` on 13 of these lines names no policy.

| helper | manifest line | last declaration | live md5 | lang · vol · mode | grants today | SQL callers (live) | class after |
|---|---|---|---|---|---|---|---|
| `assert_parent_not_catchall(uuid)` | manifest:152 | `20261115021600_dd8b1b55-77e5-4907-b0e8-75b6119d6365.sql:47` | `7479a4f6b855e105f48f2b7de207c96f` | plpgsql · s · INVOKER | authenticated,service_role | fn admin_add_category_pointer_core[I],admin_create_category_core[I],admin_move_category_pointer_core[I]; policies -; CHECK - | **(e)** |
| `attr_allowed_check(text,jsonb,jsonb,jsonb)` | manifest:154 | `20260923070512_caeccd7a-5fa0-4298-afa0-beea1a4d7023.sql:35` | `ccdcbfc822c0f7e356f3d3c8059a10cb` | plpgsql · s · INVOKER | authenticated,service_role | fn admin_upsert_attribute[D]+a,attr_import_plan[D]; policies -; CHECK - | **(e)** |
| `attr_answer_other_text(jsonb)` | manifest:155 | `20261002013936_a35e45fa-1bd1-4eae-a750-01bc675230f1.sql:23` | `8668ad50a65437852135e702afd6a051` | sql · i · INVOKER | authenticated,service_role | fn edit_my_listing[D]+a,listings_search_tsv_refresh[I],validate_listing_attributes[D]+a,validate_listing_draft[D]; policies -; CHECK - | **(e)** |
| `attr_answer_tokens(jsonb)` | manifest:156 | `20261002013936_a35e45fa-1bd1-4eae-a750-01bc675230f1.sql:6` | `26d39934698be9051e18e1a6eebebc71` | sql · i · INVOKER | authenticated,service_role | fn attr_visible_when_met[I]+a,attribute_holders[I],validate_listing_attributes[D]+a; policies -; CHECK - | **(e)** |
| `attr_bound_ok(text)` | manifest:157 | `20260911193208_d42d6246-d70e-43af-a175-bd359b96f353.sql:45` | `8c6bd1891746cd863d4ebfd844cb372f` | sql · i · INVOKER | authenticated,service_role | fn attr_cell_check[I]+a,attr_option_shape[I]+a; policies -; CHECK attributes.attributes_bounds_check | **(e)** |
| `attr_bound_value(text)` | manifest:158 | `20260911193208_d42d6246-d70e-43af-a175-bd359b96f353.sql:62` | `84b9d00295619e2a15c0896bc2692071` | sql · s · INVOKER | authenticated,service_role | fn validate_listing_attributes[D]+a; policies -; CHECK - | **(e)** |
| `attr_bounds_targets(jsonb)` | manifest:159 | `20260911193208_d42d6246-d70e-43af-a175-bd359b96f353.sql:308` | `b08e84acc432452a3976d0d21c574739` | sql · i · INVOKER | authenticated,service_role | fn admin_upsert_attribute[D]+a,attr_import_plan[D]; policies -; CHECK - | **(e)** |
| `attr_cats_expand(uuid[])` | manifest:160 | `20260911193208_d42d6246-d70e-43af-a175-bd359b96f353.sql:359` | `062033660213b4966e150f75387c5408` | sql · s · INVOKER | authenticated,service_role | fn admin_upsert_attribute[D]+a,attr_allowed_check[I]+a,attr_import_plan[D],price_basis_conflict[I]; policies -; CHECK - | **(e)** |
| `attr_cell_check(text,text,text,text,integer,text,text,integer,text,text,text)` | manifest:161 | `20261005171442_6c825c7e-7b30-495c-b373-582990c28ac4.sql:14` | `8ed535c02a2724e034488e020cf227e9` | plpgsql · s · INVOKER | authenticated,service_role | fn admin_upsert_attribute[D]+a,attr_import_plan[D]; policies -; CHECK - | **(e)** |
| `attr_contact_like(text)` | manifest:162 | `20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql:19` | `cb434d3c889594980d08fd4fe665675c` | plpgsql · i · INVOKER | authenticated,service_role | fn edit_my_listing[D]+a,set_listing_pin[D]+a,validate_listing_attributes[D]+a,validate_listing_draft[D]; policies -; CHECK - | **(e)** |
| `attr_export_payload(text)` | manifest:163 | `20261017091554_d45cdd2f-c946-4bb9-9f4d-007229e5865d.sql:265` | `5cec4c6a3f3b2fdf68a739722bba05be` | plpgsql · s · INVOKER | authenticated,service_role | fn admin_export_attributes[D]+a,import_readonly_ignored[D]; policies -; CHECK - | **(e)** |
| `attr_inherited_ranks(uuid,jsonb)` | manifest:164 | `20260911223202_ee224de0-47c7-47de-9a97-bdec0b70f360.sql:19` | `4eef07248ad243dff5a06737616d2d47` | sql · s · INVOKER | authenticated,service_role | fn attr_rank_conflict[I]+a; policies -; CHECK - | **(e)** |
| `attr_link_cells_refusal(uuid,uuid,text[],jsonb,jsonb)` | manifest:165 | `20261004212627_e44f20e5-6ff8-46c6-bd2f-75bb6075dee1.sql:370` | `2ca0e4f4bd4072bbe728c09003853c60` | plpgsql · s · INVOKER | authenticated,service_role | fn admin_link_attribute[D]+a,admin_update_attribute_link[D]+a,attr_import_plan[D]; policies -; CHECK - | **(e)** |
| `attr_option_norm_v2(jsonb)` | manifest:166 | `20260922001023_ff92c5b8-4215-4ea7-8150-50ceabae05d0.sql:226` | `b01b465f9a1965fa1c853dc6c3644634` | sql · i · INVOKER | authenticated,service_role | fn attr_import_plan[D]; policies -; CHECK - | **(e)** |
| `attr_option_shape(text,jsonb)` | manifest:167 | `20261004212627_e44f20e5-6ff8-46c6-bd2f-75bb6075dee1.sql:172` | `2df33bb0ea435190f95f67f83ba9e07e` | plpgsql · i · INVOKER | authenticated,service_role | fn admin_upsert_attribute[D]+a,attr_import_plan[D]; policies -; CHECK - | **(e)** |
| `attr_postplan_cats(text,jsonb)` | manifest:168 | `20260911193208_d42d6246-d70e-43af-a175-bd359b96f353.sql:329` | `879db8e9bdce96aab6f9cc181a7a5df5` | sql · s · INVOKER | authenticated,service_role | fn admin_upsert_attribute[D]+a,attr_allowed_check[I]+a,attr_import_plan[D],price_basis_conflict[I]; policies -; CHECK - | **(e)** |
| `attr_preset_ok(text)` | manifest:169 | `20260911193208_d42d6246-d70e-43af-a175-bd359b96f353.sql:18` | `1377013128760da20a28c4afe74a5f69` | sql · i · INVOKER | authenticated,service_role | fn attr_cell_check[I]+a; policies -; CHECK attributes.attributes_preset_check | **(e)** |
| `attr_rank_conflict(uuid,integer,text,jsonb)` | manifest:170 | `20260911223202_ee224de0-47c7-47de-9a97-bdec0b70f360.sql:94` | `1e1965ccee3bedd0440adebc74c7db62` | sql · s · INVOKER | authenticated,service_role | fn admin_set_card_attributes[D]+a,attr_import_plan[D]; policies -; CHECK - | **(e)** |
| `attr_split_option_cell(text)` | manifest:171 | `20260924002531_f6a0ec50-444f-40e7-9252-9e6cdcab4252.sql:13` | `d6fc93b76a34868ff7a2cc43a63291d7` | plpgsql · i · INVOKER | authenticated,service_role | fn attr_import_plan[D]; policies -; CHECK - | **(e)** |
| `attr_visible_when_met(jsonb,jsonb,jsonb)` | manifest:172 | `20261004212627_e44f20e5-6ff8-46c6-bd2f-75bb6075dee1.sql:66` | `5ab8255b201c43104ef02414578f0e81` | sql · i · INVOKER | authenticated,service_role | fn price_basis_in_force[I],validate_listing_attributes[D]+a,validate_listing_draft[D]; policies -; CHECK - | **(e)** |
| `attr_visible_when_ok(jsonb)` | manifest:173 | `20261004212627_e44f20e5-6ff8-46c6-bd2f-75bb6075dee1.sql:27` | `20a83804a1b8c68109d97292927fca9b` | sql · i · INVOKER | authenticated,service_role | fn attr_import_plan[D],attr_link_cells_refusal[I]+a; policies -; CHECK category_attribute_links.category_attribute_links_visible_when_shape | **(e)** |
| `cat_primary_parent(uuid)` | manifest:176 | `20260928002133_f98b5cf0-bb5a-4842-ac89-7bad2fc31517.sql:139` | `2afedddceaa8735b686e17eb947f85f4` | sql · s · INVOKER | authenticated,service_role | fn admin_list_categories[D]+a,attr_cats_expand[I]+a,attr_export_payload[I]+a,attr_import_plan[D],attr_inherited_ranks[I]+a,attr_link_origin[I],attr_link_path[I],cat_import_plan[D],catalog_find_path[D],catalog_find_refresh[D],effective_category_links[D],public_listing_json[D]; policies -; CHECK - | **(e)** |
| `cat_primary_pointer(uuid)` | manifest:177 | `20260928002133_f98b5cf0-bb5a-4842-ac89-7bad2fc31517.sql:123` | `905b137a0805e9b9df6d850a491ec38d` | sql · s · INVOKER | authenticated,service_role | fn admin_commit_category_import[D]+a,admin_undo_category_import[D]+a,cat_export_rows[I]; policies -; CHECK - | **(e)** |
| `catalog_find_norm(text)` | manifest:178 | `20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql:5` | `fa72eaf330d105b782fc634a730f0b86` | sql · i · INVOKER | authenticated,service_role | fn catalog_find[D],catalog_find_refresh[D]; policies -; CHECK - | **(e)** |
| `category_slug_candidate(text)` | manifest:181 | `20260903044526_7e14ce39-76a6-4095-845b-e5d6e83d772c.sql:9` | `1dd9c063550b2dfa5c341b0459736f72` | plpgsql · s · DEFINER | authenticated | fn admin_create_category_core[I]; policies -; CHECK - | **(e)** |
| `entity_source_value(text,uuid,text)` | manifest:188 | `20261022013727_00da12a2-034a-4684-9981-9aa7ea6c6233.sql:239` | `3d3a8a78d59cd6d31254282fee8c4d66` | sql · s · DEFINER | authenticated,service_role | fn admin_machine_entity_translation_core[I],admin_save_entity_translation_core[I]; policies -; CHECK - | **(e)** |
| `import_norm_text(text)` | manifest:211 | `20260909054432_c9699f59-7f36-4fbc-a49c-2511eb4bc369.sql:10` | `59cf9a336b3a3c4ae025c73a24c67665` | plpgsql · i · INVOKER | authenticated,service_role | fn import_norm_bool[I],import_norm_date[I],import_norm_pipe[I],import_sanitize[I]+a; policies -; CHECK - | **(e)** |
| `import_sanitize(jsonb)` | manifest:212 | `20260909054432_c9699f59-7f36-4fbc-a49c-2511eb4bc369.sql:118` | `76d31599961c0a86a30825c83cc84405` | plpgsql · i · INVOKER | authenticated,service_role | fn import_gate_audit[D]; policies -; CHECK - | **(e)** |
| `location_slug_candidate(text,uuid)` | manifest:221 | `20260915162505_55ecfe24-edca-49f8-b3c9-703f1e52e2e8.sql:143` | `b18e9221331c48277753077d6298defd` | plpgsql · s · DEFINER | authenticated,service_role | fn admin_commit_location_import[D]+a,admin_set_country_active[D]+a,admin_upsert_location[D]+a,countries_anchor_on_insert[D]; policies -; CHECK - | **(e)** |
| `ui_translation_reviewable(text,boolean,boolean)` | manifest:265 | `20260901143032_69016403-aef5-4cae-ab53-cba3cc2836c6.sql:10` | `4bec401735b1d6a176542aa78e8d2118` | sql · i · INVOKER | authenticated,service_role | fn admin_translation_stats[D]+a,approve_all_translations_impl[D]; policies -; CHECK - | **(e)** |
| `validate_listing_attributes(uuid,jsonb,jsonb,text[])` | manifest:269 | `20261007222234_fc6110fd-d52f-4aae-803b-576741e9288f.sql:3` | `b8de9ceddf7e181034d60507363eda5e` | plpgsql · s · DEFINER | authenticated,service_role | fn validate_listing_draft[D]; policies -; CHECK - | **(e)** |

## callee-codes

- `door_context` (as the readers would call it — `reader`, `public`, or `staff-reader` with a permission): for a
  `reader` class, `notSignedIn` (no caller) then `accountDeactivated`; for `public`, `accountDeactivated` only when a
  signed-in caller is deactivated (a signed-out call passes); for `staff-reader`, those two then
  `permissionDenied[:<detail>]` from `has_permission_scoped`, and never a step-up (the body skips it for a staff reader);
  its own `RAISE EXCEPTION 'door_context: …'` lines are programming errors (unknown class, a staff class with no
  permission, a reader with a dial) that a correct call never meets. The service role passes every gate. A reader
  passes each code up unhandled (no shell): the client meets SQLSTATE P0D01 with the message `code[:detail]`.
- `account_is_deactivated(uuid)`: a boolean, never a refusal.
- `has_permission_scoped`: a row (`allowed`, `countries`, `detail`), never a raise; `door_context` turns a false into
  `permissionDenied` with the detail.
- the proposed cores (a closed copy of each (b) reader's body): the same answers as the reader's body today; none raises.
- the helpers this family's readers call (`sold_cutoff`, `get_location_tree`, `level_perks_for`, `impersonation_target`):
  only `impersonation_target` raises — `'impersonation session expired'` (P0001) — and the two impersonation readers pass
  it up; `src/features/admin/impersonation/impersonation-service.ts:138` reads it by `includes`.
- `door_context` after the change: a spent dial raises `rateLimited:<resets_at>` where `<resets_at>` is
  `rate_gate`'s own `resets_at` text (`v_gate ->> 'resets_at'`), the same text the routes put in `detail`
  (`src/server/route.ts:253`, `detail: spent.resetsAt` from `consumeRate`'s `resets_at`); a NULL time gives
  `rateLimited` alone (`door_refuse`'s `coalesce(':' || p_detail, '')`). `door_refused` then returns
  `refusals: [{reason: 'rateLimited', detail: '<resets_at>'}]` and the message `rateLimited:<resets_at>`.

## cell-meaning

Every line of the family carries `-` in its permission and country cells except `translation_scope_ok`
(`translations:manage`, `global`).

- The signed-in readers' `-`: no staff right; each guards the caller's own rows, read by the caller id (after the turn,
  the gate's record). `impersonated_get_profile` / `impersonated_list_listings`: the right was checked when the session
  started (`start_impersonation`'s line); these readers guard the session's own staff member (`impersonation_target`
  reads the session by `auth.uid()`); `-` fits.
- The public readers' `-`: no right; they read published reference data; `-` fits.
- `translation_scope_ok`'s `translations:manage` / `global` does NOT fit: the body answers `has_permission(auth.uid(),
  'translations','manage') OR` the caller holds a `translator_languages` row for the language; its one browser caller is
  `src/routes/api/translate.ts:105`, a route gated on `translations:machine`. A gate demanding `translations:manage`
  would refuse a translator who holds only the machine right and the language — a person who passes today. Proposed
  cell: `-`, class `signed-in-reader` (`door_context('reader')`), the body's own check kept byte for byte. (Decision 2.)
- `has_permission` and `sold_cutoff` become `helper` lines; their cells stay `-`.

## definition

The family by the concern's definition — every manifest line of class `signed-in-reader`, `public-reader`,
`staff-reader` or `helper` whose last declaration does not call `door_context` — read by a scan of the last declarations
(scratch `census.ts`): 74 functions = 22 signed-in readers + 20 public readers + 1 staff reader + 31 helpers. The brief's
lists hold the same 74 names: no difference. The plan's §5 row F1-7 names the readers by family, not by name; nothing
in it is outside the 74.

The functions with no caller, by grep (a scan of every quoted name under `src/` and `e2e/`, generated types aside —
`rg -n "[\"'\`]<name>[\"'\`]" src e2e`, run by script for all 74; dynamic names read at their call sites:
`rpcResult(…)` and `rpc(name, …)` tables name none of these):
`catalog_find_version` 0 hits; `get_browse_tree` 0; `get_category_attributes` 0; `impersonation_target` 0;
`price_shape_for_basis` 0; `sold_cutoff` 0; `get_ui_bundle` 2 (`src/routes/api/i18n.lang.test.ts:111`, asserting it is
NOT called; `src/lib/supabase-door.test.ts:120`, a mocked fetch); `level_perks_for` 8 (comments, and two
`adminClient()` calls at `e2e/admin-monetisation.spec.ts:347` and `e2e/my-listings-levels.spec.ts:343`, service role).
Of the 31 helpers, 18 have no quoted occurrence at all; the other 13 are comments, except the two service-role calls
named under consumers.

## tests

The family's e2e ids that read a sentence that becomes a code, the message `rateLimited`, or an answer whose shape
changes (id found by script as the enclosing `test("<ID> …"` of each assertion line):

| id | file:line | reads today | after (from the body) |
|---|---|---|---|
| PR-7 | `e2e/posting-routes.spec.ts:563` | `entry.reason` `rateLimited`; its `detail` lost to INC-1170 | `detail` = the reset instant again |
| PR-21 | `posting-routes.spec.ts:964` | `rpc/my_listing_private` as another seller: body contains `not your listing` | contains `notYourListing` |
| PR-49 | `posting-routes.spec.ts:1311` | refusal `reason === "rateLimited"` | unchanged (reason only) |
| AP-4 | `e2e/ad-page-doors.spec.ts:171` | `listing_counts` as another person: `.error` = `not your listing` | `notYourListing` |
| AP-20 | `ad-page-doors.spec.ts:442` | `.error` matches `/permission denied\|not authenticated/` | the gate's `notSignedIn` |
| AP-21, AP-22 | `ad-page-doors.spec.ts:477,550` | a door's `resets_at` field | unchanged (a door's own answer, not the gate) |
| AP-25, AP-27 | `ad-page-doors.spec.ts:752,756,855,860` | `.error` = `rateLimited` exactly | INC-1170's tests: the time read again (`rateLimited:<instant>` where the door is on the shell) |
| VP-4 | `e2e/viewing-place.spec.ts:184` | `refusedPlace(...)` = `rateLimited` | the head unchanged; the time read again |
| LG-15 | `e2e/legal-certify.spec.ts:438` | `.error` contains `not your listing` | `notYourListing` |
| LG-22 | `legal-certify.spec.ts:858` | `sold_visible_days` read anonymously | unchanged answer (the public form passes a signed-out call) |
| CG-2 | `e2e/auth-caller-gates.spec.ts:259` | `/only a super admin\|not your listing\|not authenticated\|illegal transition/` | gains `notYourListing\|notSignedIn` |
| ML-2 | `e2e/my-listings-doors.spec.ts:333,335` | `listing_history` `.error` = `not your listing` | `notYourListing` |
| MLP-1 | `e2e/my-listings-page.spec.ts:301,303` | `unknown group`, `bad page` | `badValue:group`, `badValue:page` |
| MLP-5 | `my-listings-page.spec.ts:568,575` | `bad search`, `unknown mark` | `badValue:search`, `badValue:mark` |
| MLA-1, MLA-2, MLA-7 | `e2e/my-listings-ad.spec.ts:313,345,623` | `not your listing` | `notYourListing` |
| CT-14 | `e2e/admin-categories-lifecycle.spec.ts:249` | `assert_parent_not_catchall` on the service client | unchanged (service keeps its grant) |
| PW-41 | `e2e/post-wizard-place.spec.ts:1540` | `refusal.reason` `rateLimited` | unchanged |
| DRF-1…6 | `e2e/door-refusals.spec.ts` | the shell's refusals | DR-RL-1 joins (free: `rg -w 'DR-RL-1' src e2e scripts` → 0 hits) |

Unit tests of the client files: `src/features/my-listings/my-listing.test.ts:159` (`not your listing`),
`src/lib/reader-failure.test.ts` (each code it classes), `src/features/seller/seller-review.test.ts:23` (a mocked
`not authenticated`), `src/features/auth/deactivated.test.ts:31`, `src/features/admin/impersonation/impersonation-service.test.ts:6`,
`src/server/supabase/user-client.test.ts` (`doorAnswer`), `src/features/ad-page/ad-page-refusals.test.ts:88,91`,
`src/features/ad-page/contact.test.ts:56,61`, `src/routes/api/attributes.options.test.ts`, `src/routes/api/i18n.lang.test.ts`,
`src/routes/api/locations.country.test.ts`, `src/features/admin/translations/translations-service.test.ts:314`,
`src/lib/supabase-door.test.ts:146-250` (`price_unit_labels` as the door's sample name).

Every code a function of this family can answer after the turn, and what reaches it (PREVENTION (5)): `notSignedIn` and
`accountDeactivated` — the migration's proofs for every (a) and (b) reader (signed-out and deactivated scratch callers);
`notYourListing` — ML-2, MLA-1/2/7, LG-15 and the proofs (another scratch person's listing); `notYours` — the proof for
`my_legal_version`; `badValue:<field>` and `badSize` — MLP-1, MLP-5 and the proofs; `permissionDenied` — none for a
`signed-in-reader` class (Decision 2 removes the only staff cell); `rateLimited:<instant>` — the shell proof and DR-RL-1.
The next ids: DR-RL-1 (door-refusals), and none other added.

## lists

- `scripts/doors/manifest.txt`: under the full build, 38 lines leave ((e): 7 readers + 31 helpers); 7 (d) lines narrow
  their roles cell to `anon` and carry the reason word (Decision 9); `has_permission`, `sold_cutoff` → `helper` with the
  policy's name; `translation_scope_ok` → `signed-in-reader`, `-`; `listing_saved(text)` → the viewer's-state reader's line.
- `scripts/doors/check-doors-allowlist.txt`: `grant-without-caller get_browse_tree(text)` and
  `grant-without-caller get_category_attributes(uuid,boolean)` leave.
- `scripts/public-surface-allowlist.txt`: 20 of the 38 closed functions hold a line (each becomes RETIRED, DEC-347);
  the 18 without one: `impersonation_target`, `attr_allowed_check`, `attr_bound_ok`, `attr_bound_value`,
  `attr_bounds_targets`, `attr_cats_expand`, `attr_inherited_ranks`, `attr_option_norm_v2`, `attr_postplan_cats`,
  `attr_preset_ok`, `attr_rank_conflict`, `attr_split_option_cell`, `catalog_find_norm`, `category_slug_candidate`,
  `import_norm_text`, `import_sanitize`, `location_slug_candidate`, `ui_translation_reviewable` (the census reads at
  STEP 2 why the allowlist does not hold them today — the test reads only some grant forms, or they are allowlisted by
  pattern).
- The migration reader's computed-declaration list: `scripts/conformance/migration-reader.test.ts:173`
  (`COMPUTED_BY_HAND` = `["attr_import_plan"]`) and `:230` (`["attr_import_plan", "public_listing_json",
  "validate_listing_draft"]`): `public_listing_json` and `validate_listing_draft` are computed declarations; a turn that
  redeclares them (the (b) cores' callers) changes what that list reads.
- `scripts/conformance/door-args-allowlist.txt:5` (`user-client.ts:318`, INC-942): F1-7c, untouched.
- Shared-value tables this family's tests write: `rate_overrides` (DR-RL-1 and the shell proof, a scratch user's own row);
  none other.
- The register (`docs/governance/mechanisms.md`): the doors' row — two lines go to Records (the brief's REGISTER lines).

## old-file-readers

The commands, run across `src/`, `e2e/`, `scripts/` (locales and generated types aside), and their counts:
`rg -F 'rateLimited'` 274 hits / 122 files (the exact compares listed under consumers); `rg -F 'resets_at'` 12 / 4
(`src/server/supabase/user-client.ts:287,290,346,348,358,369` — `consumeRate`/`peekRate` read `rate_gate`'s own answer,
and `doorAnswer`; `e2e/ad-page-doors.spec.ts:477,550`; `src/features/ad-page/ad-page-refusals.test.ts:88,91`;
`src/features/ad-page/contact.test.ts:56,61`); `rg -F 'not authenticated'` 5 / 5 (`src/lib/reader-failure.ts:25` — its
`auth` class; `e2e/ad-page-doors.spec.ts:442`; `e2e/auth-caller-gates.spec.ts:259`; `src/features/auth/deactivated.test.ts:31`;
`src/features/seller/seller-review.test.ts:23`); `rg -F 'not signed in'` 13 / 7 (all the routes' own 401 wording and
tests — `user-client.ts`, `translations-service.ts`, `category-images-service.ts`, `route.test.ts`, `upstream.test.ts`,
`posting-service.ts:35` — none reads `my_viewing_location`'s sentence); `rg -F 'not your listing'` 14 / 10
(`src/features/my-listings/my-listing.ts:81`, `src/features/posting/posting-service.ts:353`, the tests above,
`scripts/public-surface-allowlist.txt:6`); `rg -F 'notYours'` 30 / 14; `rg -F 'unknown group'` 1, `'bad page'` 1,
`'bad search'` 1, `'unknown mark'` 2 (MLP-1, MLP-5 and the mark's own words); `rg -F 'my_saved_listings: bad'` 0;
`rg -F 'impersonation session expired'` 2 (`impersonation-service.ts:138` and its test); `rg -F 'permission denied'`
35 / 20 (the legal readers' 42501 is read through `reader-failure.ts`'s `42501 → auth`).
`src/lib/reader-failure.ts:31` classes `rateLimited`, `notYours`, `notYourListing`, `permissionDenied`,
`accountDeactivated` as `refused` and `/JWT|not authenticated/` or 42501 as `auth`; it does not know `notSignedIn` nor the
code `P0D01`: a reader's `notSignedIn` would class as `malformed` (or `server` by status) until it learns them (STEP 3,
in scope).

## second-readers

`vi.mock` / dynamic `import()` / `loadOnce` of the client modules the family's callers live in (scan by script):
`src/lib/reader-failure.ts` — `src/features/seller/seller-review.test.ts`, `src/features/auth/preferred-language.ts`;
`src/server/supabase/user-client.ts` — 32 route and server tests mock it (none reads `doorAnswer`'s mapping but
`user-client.test.ts`); `src/features/my-listings/my-listing.ts` — `src/features/posting/step-review.test.tsx`,
`src/features/posting/use-edit-draft.test.ts`; `src/features/posting/posting-service.ts` — `src/routes/post_.$listingId.tsx`;
`src/features/admin/impersonation/impersonation-service.ts` — `src/components/shell/impersonation-notice.tsx` and its test;
`src/features/legal/legal-reader.ts` — `src/routes/auth-forms.test.tsx`, `src/features/posting/step-review.test.tsx`;
`src/features/legal/legal-page-data.ts` — `src/routes/legal.publishing.tsx`; `src/features/posting/use-price-unit-labels.ts`
— four component tests; `src/features/ad-page/save.ts`, `src/lib/refusal.ts`, `src/i18n/bundle.ts` — none. No client
module is moved or split by this family.

## chunk-graph

Before (my lock-exact build at the base: `bun install --frozen-lockfile` → 0, `bun run build` → 0,
`node scripts/check-bundle-size.mjs` → "Bundle budget OK."), first download in gzip KiB against the ceiling, for the
pages whose client files this family would change: `/l/$slug` 246.9 / 250; `/my-listings` 307.6 / 315;
`/my-listings_/$listingId` 317.7 / 323; `/post` 398.5 / 404; `/post_/$listingId` 398.4 / 404;
`/my-listings_/$listingId_/edit` 398.5 / 404; `/legal/$kind` 205.5 / 210; `/legal/publishing` 206.3 / 211;
`/account_/legal` 203.4 / 208; `/account_/legal_/$versionId` 204.1 / 209; `/account_/saved` 220.3 / 225; `/` 221.7 / 227
(the place carry). After: no client file changes before STEP 3 (a later chat); the per-chunk after-numbers belong to it.

## environments

The local proof stack: me, by `bun run db:proof`. ethio-staging: the operator's paste from the supervisor's message of
links (a DROP + CREATE — `listing_saved` → the viewer's state — rules out the connector's one-or-two-file path, DEC-384).
ethio-prod: after the merge. How the readers are called: `supabase-js` `rpc()` is a POST unless `get: true`; PostgREST
runs a STABLE function in a read-only transaction. A STABLE reader that PERFORMs the VOLATILE `door_context` is the
pattern the five readers on the shell already run; for a reader class `door_context` writes nothing (no dial), so the
read-only transaction never meets a write. The first run of this turn's proofs on a shared database is the staging apply.

## mechanisms

Read whole at their last declarations: `door_context`, `door_refused`
(`20261106051600_8b7c2e41-…sql:39,128`), `door_refuse` (`20261106051500_6d2f0f3e-…sql:31`), `rate_gate` and
`account_is_deactivated` (`20261023100132_a09c454f-…sql:34,19`). The pattern readers: `has_password`,
`get_my_permissions`, `get_my_translator_languages` (`20261106051800_f3b8d2a1-…`), `get_active_impersonation`
(`20261114070700_e30e4335-…:131`), `promote_options` (`20261109085715_a63f48fe-…:29`): `PERFORM` / `SELECT … INTO` of
`door_context('reader')` first, the caller from the record, refusals by `door_refuse`, no shell handler.
`readRefusal` (`src/lib/refusal.ts`) and `readerFailure` (`src/lib/reader-failure.ts`) read whole (above).
`src/server/dials.ts`: `spend` / `peek` over `consumeRate` / `peekRate`; the route refusal's form is
`{ reason: 'rateLimited', detail: <resets_at text> }` (`src/server/route.ts:253`). The Feed bench
(`scripts/feed-bench.ts`, `.github/workflows/feed-bench.yml`) times `feed_page` through `feed_bench`; `feed_page` is
class (d) here — its body is not touched, so no bench shape moves.

## first-download

Every page from my build at the base (gzip KiB / ceiling): the entry closure 200.8 / 205 JS, 22.6 / 40 CSS; the
pages' table is in `/tmp/ethio-scratch/f1-doors-7a/bundle.out` (50 pages, all inside their ceilings — the tightest
rooms: `/l/$slug` 3.1, `/admin/categories` 3.9, `/admin/attributes` 4.6, `/admin/listings_/$listingId` 4.8, `/` 5.3).

## premises

1. The cost bar. Ruling 1's decision 9 sets 0.1 ms; F1-1's ruling 7 §1 (DEC-345) made it a 5 ms tripwire and called the
   0.1 ms a slip. Measured here (1000 calls each, the median, on scratch callers): `door_context('reader')` 0.0080 ms;
   `('public')` signed in 0.0080 ms, signed out 0.0040 ms; `('staff-reader', 'translations', 'manage')` 0.0800 ms.
   Every class is under 0.1 ms, so the conflict changes nothing in practice. The timed readers before any change (200
   calls each, the scratch seller with one live ad): `my_listings('live')` 0.1790 ms, `my_listing` 0.0320,
   `listing_saved` 0.0060, `my_saved_listings` 0.0340, `listing_counts` 0.0170.
2. The brief's staging read says `rate_gate`'s live body has CR line ends; the local stack's has none. The stripped md5
   agrees on both; the carrier law handles it.
3. `door_context` is closed to `authenticated`, so a SECURITY INVOKER reader cannot call it. `listing_contact_refusals`
   (INVOKER) needs a DEFINER reader around it (Decision 3); `level_perks_for` and `price_shape_for_basis` are (e), so
   their INVOKER mode is moot.
4. The brief's premise "SQL bodies name `feed_page`": true by text, but both are comments (`seller_feed_page`,
   `feed_index_check_sweep`); its one function caller is `feed_bench` (INVOKER, service only).
5. The 31 helpers' reasons (`policy` on 13, `invoker-chain` on 18) are unproven: none is needed by a browser role (see
   the helpers' table). INC-1162's class is the whole helper list, not `assert_parent_not_catchall` alone.
6. `door_context('public')` refuses a signed-in deactivated caller `accountDeactivated`. The four public (a) readers are
   called with the person's token when one exists (`src/lib/supabase-door.ts:309` `rpc`, used by `src/i18n/bundle.ts:93,172`
   and `src/features/legal/legal-reader.ts:152`): a deactivated session reading the UI bundle or a legal text would be
   refused until `useAuth` signs it out (`src/features/auth/use-auth.ts:92-99`). (Decision 4.)

## findings

- `src/features/auth/deactivated.ts:37` — `isDeactivatedRefusal` matches the sentence `account is deactivated`, which the
  gate's code `accountDeactivated` does not contain (INC-1188, already queued for F1-7c).
- `scripts/doors/manifest.txt:154-173` — 13 helper lines give `policy` as their reason and no policy names them (premise 5).
- No security hole found.

## queued

`rg -n "F1-7" docs/governance/briefs docs/governance/reports roadmap.md scripts/conformance scripts/doors
scripts/public-surface-allowlist.txt` (this brief aside) → 206 lines in 50 files; the distinct items they queue:

| item | where queued | here |
|---|---|---|
| `rateLimited` carries its reset time; PR-7's detail; `doorAnswer`'s mapping (INC-1170) | roadmap.md:23, :49, :51; f1-doors-5a ruling 1 | built here |
| a rate-limited refusal counted once (INC-1196) | roadmap.md:28; f1-doors-6b reports | built here |
| the signed-in and public readers onto the gate; INC-1158's last cells | roadmap.md:28, :43, :60, :62; f1-doors-ruling-1 | built here (by the ruling's cut) |
| `assert_parent_not_catchall` leaves the browser roles (INC-1162) | roadmap.md:68 | built here |
| `get_browse_tree`, `get_category_attributes` revoked or named | `scripts/doors/check-doors-allowlist.txt:4-5` | built here |
| `translation_scope_ok` (left by F1-3) | roadmap.md:62 | built here (by the ruling's cut) |
| `impersonation_target` (left by F1-2) | roadmap.md:60 | built here ((e)) |
| the ad page's owner fact (INC-1191) | f1-doors-6b ruling 2 | built here |
| `assign_role`'s unknown user (INC-1156); the country doors' code check (INC-1163); INC-1164; INC-1166; coordinates without a range check (INC-1179) | roadmap.md:12, :30, :71 | left (F1-7b) |
| the ancestry trigger's seven sentences; `unknown category scope`; `unknown country scope`; the translation right named by a refused commit | roadmap.md:67, :72-74 | left (F1-7b) |
| every door call's `Result` typed (INC-942); `isDeactivatedRefusal` (INC-1188); one refusal reader (INC-1189); the words that draw the time; retirement in the guards (DEC-347); `door-args-allowlist.txt:5` | roadmap.md:28, :30; `scripts/conformance/door-args-allowlist.txt:5`; public-surface RETIRED lines (F1-1, F1-6b) | left (F1-7c) |
| ACT-022 (the advertiser column) | roadmap.md:37 | after F1-7 |

The full hit list is kept at `/tmp/ethio-scratch/f1-doors-7a/queued.txt`.

## The count, and the stop (STEP 1, stop (e))

Bodies a full build would redeclare (CREATE OR REPLACE of an existing function):

| group | bodies |
|---|---|
| the shell: `door_context`, `door_refused` | 2 |
| (a) signed-in readers | 17 |
| (a) public readers | 4 |
| (b) readers onto the gate | 5 |
| (b) SQL callers moved onto the cores: `get_attribute_options` (2,696 B); `sold_cutoff` (69 B, policy-run); `save_posting_identity` (6,513 B); `validate_listing_draft` (22,679 B, computed); `public_listing_json` (13,479 B, computed); the ten translation callers (`admin_approve_all_entity_translations` 429, `admin_approve_all_translations` 415, `admin_import_translations` 3,901, `admin_undo_import` 2,735, `admin_set_translation_status` 1,654, `admin_set_entity_translation_status` 1,815, `admin_save_translation_core` 2,559, `admin_machine_translation_core` 2,437, `admin_save_entity_translation_core` 2,066, `admin_machine_entity_translation_core` 2,229) | 15 |
| **total redeclared** | **43** |

Plus 6 new functions (5 cores, the viewer's-state reader), `listing_saved(text)` dropped, and grants only for (c), (d)
and (e) (47 functions: 2 helpers by policy keep theirs, 7 narrowed, 38 closed). 43 is over "about forty": stop (e). The
proposed cut by class is in `docs/governance/reports/f1-doors-7a.stop-1.md`. No other stop applies: (a) no
classification above takes a grant a caller uses or gives a reader to someone who cannot call it today (the (d) and (e)
grants are held for no caller; the `authenticated` grant on the (d) readers is used by no route, since an `anon` route
always uses `anonymousClient()` — `src/server/route.ts:211-212`); (b) the one return type that changes
(`listing_saved` → the viewer's state) has its callers in `src/features/ad-page/save.ts` and `src/routes/l.$slug.tsx`,
inside SCOPE; (c) every file named sits inside a SCOPE clause; (d) every class is under ruling 1's bar.
