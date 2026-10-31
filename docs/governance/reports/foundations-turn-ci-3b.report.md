# Foundations turn CI-3b — report

**CI line: d79810764599d3ce607b657ec4aff9405808200e, SUCCESS** — run 41169833292, completed 2026-10-31 05:07:06Z. First DEC-309 run, cache miss; all jobs succeeded. No red to classify or fix. Evidence read from all four raw ci-evidence addresses before edits.

## Step 0

The ruling is saved as one fenced block in `docs/governance/briefs/foundations-turn-ci-3b.md`. SHA256 of the inner text, including final newline: `e022b2009582de6320f3861718d1fa8d3df772393de03de7b767270ea65b3268`, verified equal to the operator's value. Roadmap line 3 names it; `prettier --check roadmap.md` passed. No app code, migration, dependency or string changed; AGENTS.md and the spec ledger untouched. Platform manages the commit/push; no stateful git command used.

## Concern, mechanism and census

Concern: what browser roles may run/read. Mechanism: one `scripts/public-surface-allowlist.txt`, `name | roles | reason`, with the one parser `scripts/public-surface.ts`. Register row 8 updated; row 9 retains only the other count-based lints.

Census by definition (allowlist readers and browser-grant counts/lists in scripts/, .github/, supabase/):

| Consumer | Before | After |
| --- | --- | --- |
| scripts/check-migrations.sh:619–667 | independent awk and Perl name/reason readers | shared parser CLI for validation and whole-statement/FOREACH grants, roles required |
| scripts/security-lints.ts:40 (at base) | anon function count compared with baseline | pure compareSurface uses the same parsed entries and live catalogue, no anon count baseline |
| scripts/security-lints-baseline.json:4 (at base) | anon count 20 | removed, four other counts retained |
| .github/workflows/local-backend-proof.yml:715–726 (at base) | smoke TSV count comparison, names/ACL failure artifact | query exported by lint, catalogue TSV under RUNNER_TEMP, same compareSurface; no failure names artifact |
| .github/workflows/nightly-e2e.yml:250 | REST count consumer | same script, four counts; explicitly NOT RUN for live catalogue comparison (not available via REST) |
| scripts/conformance/wired.test.ts | generic caller census | additionally names smoke lint, migration parser caller and lint parser import |
| supabase/migrations/20261005152120* (security_lints definition; precise source below) | service-only count reader | unchanged, still returns anon count, script deliberately ignores that retired baseline item |

Security-lint SQL definition sites (immutable, no migration this turn):

```text
supabase/migrations/20261010055801_866d39cd-554b-492d-99de-362601f15f0d.sql:19:CREATE OR REPLACE FUNCTION public.security_lints()
supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql:357:CREATE OR REPLACE FUNCTION public.security_lints()
```

Other browser-role ACL readers/censuses (K2, not duplicate allowlist authorities): `scripts/check-caller-gates.ts` and smoke caller-gates query; `scripts/check-acceptance-doors.ts`; `scripts/check-outbound-calls.ts`; migration definer/default-privilege checks and self-test SQL; temporary-backend parity/default-grant fixture; literal GRANT/REVOKE statements in append-only migrations. The raw SQL ACL census is evidence only, not a second stored policy list.

## List before/after and role evidence

Before: 154 physical lines, 149 entries, 148 unique names. After: 164 physical lines, 159 entries, 158 unique names. The existing duplicate `transition_listing` entries retain their separate historical reasons; no already-listed anonymous function is duplicated.

Every entry below cites browser roles read from the newest migration granting that name (union of separate grant lines in that same file). This is permission for migration grants, not an assertion that every historical grant remains live. `import_gate_audit` retains its historical authenticated allowance for append-only migrations; its replacement is service-only. No entry was unplaceable. No roles were inferred from naming.

| Name | Roles | Grant evidence |
| --- | --- | --- |
| accept_legal | authenticated | supabase/migrations/20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql:117 |
| admin_add_category_pointer | authenticated | supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql:57 |
| admin_add_legal_translation | authenticated | supabase/migrations/20261029002140_5a30bc87-f056-4c92-bc22-14656fdceeb8.sql:53 |
| admin_ai_features | authenticated | supabase/migrations/20261013184636_ddaa7759-f545-43eb-bf25-27d41c04fab9.sql:248 |
| admin_ai_spend_days | authenticated | supabase/migrations/20261014103719_ff659d97-f576-4881-95e7-01290b58c825.sql:48 |
| admin_allow_listing_photo | authenticated | supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql:87 |
| admin_attribute_holders | authenticated | supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql:49 |
| admin_commit_attribute_import | authenticated | supabase/migrations/20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql:1037 |
| admin_commit_category_import | authenticated | supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql:510 |
| admin_commit_location_import | authenticated | supabase/migrations/20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql:696 |
| admin_create_category | authenticated | supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql:124 |
| admin_delete_category | authenticated | supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql:210 |
| admin_discard_legal_draft | authenticated | supabase/migrations/20261029002140_5a30bc87-f056-4c92-bc22-14656fdceeb8.sql:83 |
| admin_edit_listing | authenticated | supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql:339 |
| admin_entity_translation_stats | authenticated | supabase/migrations/20261022023137_e74aeb54-2bcb-4488-a137-67c8898c12ca.sql:54 |
| admin_export_legal_acceptances | authenticated | supabase/migrations/20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql:264 |
| admin_export_translations | authenticated | supabase/migrations/20261012101642_241cc49a-39e5-4fa0-843d-db74955dcbcb.sql:50 |
| admin_import_translations | authenticated | supabase/migrations/20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql:124 |
| admin_job_health | authenticated | supabase/migrations/20261029110745_2a2066ed-e6fe-4216-9de0-aab433a869cd.sql:56 |
| admin_job_resume | authenticated | supabase/migrations/20261029110745_2a2066ed-e6fe-4216-9de0-aab433a869cd.sql:79 |
| admin_legal_documents | authenticated | supabase/migrations/20261024045415_fce0ec68-3190-41bf-bee9-5883c1e8c4c0.sql:63 |
| admin_legal_settings | authenticated | supabase/migrations/20261019063635_0e901b95-3cfb-4daf-bb72-6a6d3f691897.sql:283 |
| admin_legal_version | authenticated | supabase/migrations/20261024045415_fce0ec68-3190-41bf-bee9-5883c1e8c4c0.sql:106 |
| admin_link_attribute | authenticated | supabase/migrations/20261029013346_0780a3a2-a07d-44c4-ac84-2ebeec7d3897.sql:89 |
| admin_list_ai_calls | authenticated | supabase/migrations/20261029044433_175bb84e-0bb9-4d2e-aa3c-40dd1045d387.sql:57 |
| admin_list_attributes | authenticated | supabase/migrations/20261005172453_59b6772e-37ec-4205-bca4-ebe7174789e9.sql:1146 |
| admin_list_category_attribute_links | authenticated | supabase/migrations/20261017091410_d5ba7deb-ca97-4d4f-b68b-93b423855226.sql:240 |
| admin_list_category_pointers | authenticated | supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql:234 |
| admin_list_effective_category_links | authenticated | supabase/migrations/20261017091410_d5ba7deb-ca97-4d4f-b68b-93b423855226.sql:273 |
| admin_list_entity_translations | authenticated | supabase/migrations/20261022023137_e74aeb54-2bcb-4488-a137-67c8898c12ca.sql:115 |
| admin_list_listings | authenticated | supabase/migrations/20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql:656 |
| admin_listing_certifications | authenticated | supabase/migrations/20261019115742_844b64b2-424a-47fe-97d5-5523663fdba3.sql:267 |
| admin_listing_detail | authenticated | supabase/migrations/20261011124548_db211b18-cd71-4144-9838-0bf3af0fdfe1.sql:149 |
| admin_listing_reports | authenticated | supabase/migrations/20261017115807_1c740888-9a8e-4b2f-9784-56d9cc879c99.sql:131 |
| admin_machine_entity_translation | authenticated | supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql:766 |
| admin_machine_translation | authenticated | supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql:685 |
| admin_mark_legal_reviewed | authenticated | supabase/migrations/20261029002140_5a30bc87-f056-4c92-bc22-14656fdceeb8.sql:119 |
| admin_merge_attributes | authenticated | supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql:131 |
| admin_move_listing | authenticated | supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql:437 |
| admin_name_check_clear | authenticated | supabase/migrations/20261029233828_4aaa2474-7352-440f-8e24-935179180f55.sql:165 |
| admin_name_check_list | authenticated | supabase/migrations/20261029104632_2673141c-b91c-4ec9-b8c7-208f895362cf.sql:72 |
| admin_name_check_summary | authenticated | supabase/migrations/20261029063150_560e36c8-6f0f-4ab9-a021-bfe1582a9431.sql:308 |
| admin_open_report_counts | authenticated | supabase/migrations/20261017115807_1c740888-9a8e-4b2f-9784-56d9cc879c99.sql:155 |
| admin_preview_attribute_import | authenticated | supabase/migrations/20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql:157 |
| admin_publish_legal_version | authenticated | supabase/migrations/20261029002140_5a30bc87-f056-4c92-bc22-14656fdceeb8.sql:186 |
| admin_reveal_listing_contact | authenticated | supabase/migrations/20261010145454_392f2c82-27b1-44ca-bb28-321a16652847.sql:62 |
| admin_review_photo_change | authenticated | supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql:132 |
| admin_save_entity_translation | authenticated | supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql:603 |
| admin_save_legal_draft | authenticated | supabase/migrations/20261029002140_5a30bc87-f056-4c92-bc22-14656fdceeb8.sql:266 |
| admin_save_translation | authenticated | supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql:527 |
| admin_screening_facts | authenticated | supabase/migrations/20261010103356_7ed3323f-15d8-463c-bd24-47e39986647a.sql:67 |
| admin_set_ai_feature | authenticated | supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql:80 |
| admin_set_country_active | authenticated | supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql:140 |
| admin_set_country_exclusions | authenticated | supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql:177 |
| admin_set_country_root_order | authenticated | supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql:194 |
| admin_set_coverage_plan | authenticated | supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql:256 |
| admin_set_fact_attributes | authenticated | supabase/migrations/20261017091410_d5ba7deb-ca97-4d4f-b68b-93b423855226.sql:326 |
| admin_set_legal_settings | authenticated | supabase/migrations/20261029002140_5a30bc87-f056-4c92-bc22-14656fdceeb8.sql:423 |
| admin_set_listing_policy | authenticated | supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql:293 |
| admin_sync_ui_keys | authenticated | supabase/migrations/20261031013352_e1fda8f7-ae33-4f90-a76e-508db50f026f.sql:145 |
| admin_undo_attribute_import | authenticated | supabase/migrations/20261017093325_78a1bda9-58b1-4318-ad62-c85beb84891d.sql:283 |
| admin_undo_category_import | authenticated | supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql:749 |
| admin_undo_listing_edit | authenticated | supabase/migrations/20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql:1362 |
| admin_update_profile | authenticated | supabase/migrations/20261029092611_0cd49f0d-bdbc-4c3d-b789-f1fbe20db2c7.sql:264 |
| admin_upsert_attribute | authenticated | supabase/migrations/20261029013346_0780a3a2-a07d-44c4-ac84-2ebeec7d3897.sql:314 |
| admin_upsert_country | authenticated | supabase/migrations/20261029015903_c9372052-a28e-4b34-832f-c91b218dcaac.sql:169 |
| admin_upsert_language | authenticated | supabase/migrations/20261029015903_c9372052-a28e-4b34-832f-c91b218dcaac.sql:215 |
| admin_upsert_location | authenticated | supabase/migrations/20261029015903_c9372052-a28e-4b34-832f-c91b218dcaac.sql:328 |
| admin_user_legal_history | authenticated | supabase/migrations/20261019103558_df2b6472-8b61-4c4b-a074-94b1e69e3724.sql:345 |
| attr_cell_check | authenticated | supabase/migrations/20261005171442_6c825c7e-7b30-495c-b373-582990c28ac4.sql:93 |
| attr_export_payload | authenticated | supabase/migrations/20261017091554_d45cdd2f-c946-4bb9-9f4d-007229e5865d.sql:444 |
| attr_link_cells_refusal | authenticated | supabase/migrations/20261004212627_e44f20e5-6ff8-46c6-bd2f-75bb6075dee1.sql:481 |
| attr_option_shape | authenticated | supabase/migrations/20261004212627_e44f20e5-6ff8-46c6-bd2f-75bb6075dee1.sql:366 |
| attr_visible_when_met | authenticated | supabase/migrations/20261004212627_e44f20e5-6ff8-46c6-bd2f-75bb6075dee1.sql:91 |
| attr_visible_when_ok | authenticated | supabase/migrations/20261004212627_e44f20e5-6ff8-46c6-bd2f-75bb6075dee1.sql:62 |
| begin_impersonation | authenticated | supabase/migrations/20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql:197 |
| catalog_find_version | anon,authenticated | supabase/migrations/20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql:49 |
| change_home_country | authenticated | supabase/migrations/20261004034256_2f361c07-bf81-4d67-ae9d-b088f25d2858.sql:410 |
| check_seller_alias | authenticated | supabase/migrations/20261004011235_18556a32-8f3e-4da5-a645-e73223e74e13.sql:1141 |
| clear_seller_place | authenticated | supabase/migrations/20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql:307 |
| copy_my_listing | authenticated | supabase/migrations/20261015081040_5d969342-dc7d-4eb6-8bc6-4ba2a48747e9.sql:230 |
| coverage_plans | anon,authenticated | supabase/migrations/20261013142425_e5c32a76-bce8-4b3f-bffb-c78db7fa06b2.sql:17 |
| edit_listing | authenticated | supabase/migrations/20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql:429 |
| edit_my_listing | authenticated | supabase/migrations/20261019115951_9e3ecfc4-409a-4c68-ae90-9b85964f5e91.sql:307 |
| end_impersonation | authenticated | supabase/migrations/20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql:408 |
| entity_source_value | authenticated | supabase/migrations/20261022013727_00da12a2-034a-4684-9981-9aa7ea6c6233.sql:260 |
| feed_page | anon,authenticated | supabase/migrations/20261019223222_b947bfda-3636-493b-b9b5-8a0225eb0f21.sql:194 |
| get_attribute_options | authenticated | supabase/migrations/20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql:432 |
| get_browse_tree | anon,authenticated | supabase/migrations/20260903025501_f90d7b5a-e159-4084-9982-cb5e4f42a96b.sql:202 |
| get_category_attributes | anon,authenticated | supabase/migrations/20260810065832_aa5446b7-988d-4ba3-823b-759ed735f3eb.sql:54 |
| get_category_tree_version | anon,authenticated | supabase/migrations/20260928002133_f98b5cf0-bb5a-4842-ac89-7bad2fc31517.sql:312, supabase/migrations/20260928002133_f98b5cf0-bb5a-4842-ac89-7bad2fc31517.sql:313 |
| get_entity_bundle | anon,authenticated | supabase/migrations/20260830080548_da0dfee5-6066-4087-b96b-dacfbac5c2a2.sql:51 |
| get_location_tree | anon,authenticated | supabase/migrations/20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql:62 |
| get_location_tree_version | anon,authenticated | supabase/migrations/20260915190024_efbee3c4-309b-49b1-8292-aa8a946dc188.sql:100 |
| get_open_countries | anon,authenticated | supabase/migrations/20260917113152_479720fb-c520-42df-a685-4460bea6d037.sql:287 |
| get_posting_schema | authenticated | supabase/migrations/20261017091410_d5ba7deb-ca97-4d4f-b68b-93b423855226.sql:210 |
| get_ui_bundle | anon,authenticated | supabase/migrations/20260831062918_568b441b-23f1-41c1-afa0-cba4867c4844.sql:96 |
| get_ui_bundle_parts | anon,authenticated | supabase/migrations/20261031013352_e1fda8f7-ae33-4f90-a76e-508db50f026f.sql:47 |
| get_ui_bundle_version | anon,authenticated | supabase/migrations/20260901234603_74ae387b-d985-4079-802e-9597270ac7c6.sql:225 |
| has_permission | authenticated | supabase/migrations/20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql:103 |
| import_gate_audit | authenticated | supabase/migrations/20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql:59 |
| legal_in_force | anon,authenticated | supabase/migrations/20261024065107_5e8d01eb-edf3-4456-93e4-96ad2c7cee6f.sql:49 |
| legal_review_overdue | authenticated | supabase/migrations/20261021092329_96f2e2c2-39d5-4af6-9917-ee87ec00a472.sql:152 |
| legal_scheduled | anon,authenticated | supabase/migrations/20261024065107_5e8d01eb-edf3-4456-93e4-96ad2c7cee6f.sql:87 |
| listing_counts | authenticated | supabase/migrations/20261017105751_e6d71c12-f4b2-4cda-a556-79b0432c369f.sql:299 |
| listing_history | authenticated | supabase/migrations/20261014230715_3853703f-4ef3-46a1-b2b8-4129c05ac9f5.sql:149 |
| listing_photo_changes | authenticated | supabase/migrations/20261014084432_09976425-7faa-4b77-8682-f135b6e369a5.sql:68 |
| listing_photo_reviews | authenticated | supabase/migrations/20261015113334_76db3ae0-4f91-4ab3-be63-0a6b9a5937b3.sql:52 |
| listing_photo_warnings | authenticated | supabase/migrations/20261014084432_09976425-7faa-4b77-8682-f135b6e369a5.sql:39 |
| listing_policy | authenticated | supabase/migrations/20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql:88 |
| listing_reports | authenticated | supabase/migrations/20261017115807_1c740888-9a8e-4b2f-9784-56d9cc879c99.sql:47 |
| listing_saved | authenticated | supabase/migrations/20261017105713_a18879b5-2c1e-4878-bb89-2644c6675be4.sql:127 |
| listings | anon,authenticated | supabase/migrations/20261015023155_3600a562-cf32-4d54-9319-940dfc144aeb.sql:450 |
| mark_sold | authenticated | supabase/migrations/20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql:462 |
| move_listing_photo | authenticated | supabase/migrations/20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql:193 |
| my_last_listing_private | authenticated | supabase/migrations/20261003221958_2a467fcc-6190-4aec-9112-78d63f638d71.sql:145 |
| my_legal_history | authenticated | supabase/migrations/20261019103558_df2b6472-8b61-4c4b-a074-94b1e69e3724.sql:289 |
| my_legal_status | authenticated | supabase/migrations/20261020041607_c88f99d5-b2cd-495f-93c1-8c9de328a1db.sql:70 |
| my_legal_version | authenticated | supabase/migrations/20261021222622_b1ecffc0-4aab-4eeb-9a5e-eb2f304061ee.sql:147 |
| my_listing | authenticated | supabase/migrations/20261017060602_19df1767-c3a4-4ccf-8c50-791d9f43b45b.sql:423 |
| my_listing_certification | authenticated | supabase/migrations/20261019140533_709c3922-984d-4e4d-a62a-a89543f08e83.sql:117 |
| my_listing_private | authenticated | supabase/migrations/20261003221958_2a467fcc-6190-4aec-9112-78d63f638d71.sql:112 |
| my_listings | authenticated | supabase/migrations/20261017060602_19df1767-c3a4-4ccf-8c50-791d9f43b45b.sql:334 |
| my_recent_categories | authenticated | supabase/migrations/20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql:735 |
| my_saved_listings | authenticated | supabase/migrations/20261019223222_b947bfda-3636-493b-b9b5-8a0225eb0f21.sql:427 |
| my_seller_line | authenticated | supabase/migrations/20261029091909_85de2619-cec0-459c-b6c0-4e58f4e906b8.sql:181 |
| my_seller_place | authenticated | supabase/migrations/20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql:409 |
| my_viewing_location | authenticated | supabase/migrations/20261010065637_01da330c-2189-4927-bc80-ef6c6f0ed58f.sql:105 |
| price_shape_for_basis | anon,authenticated | supabase/migrations/20260928034942_247a3ed0-ff97-43f9-9e8d-3c2071c810df.sql:93 |
| price_unit_labels | anon,authenticated | supabase/migrations/20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql:286 |
| public_listing | anon,authenticated | supabase/migrations/20261019223105_fee22f72-e321-4aa2-9f6a-9c2a066e9e7a.sql:206 |
| publish_listing | authenticated | supabase/migrations/20261019115951_9e3ecfc4-409a-4c68-ae90-9b85964f5e91.sql:90 |
| relist_listing | authenticated | supabase/migrations/20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql:493 |
| remove_listing_photo | authenticated | supabase/migrations/20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql:154 |
| remove_own_password | authenticated | supabase/migrations/20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql:490 |
| renew_listing | authenticated | supabase/migrations/20261019115951_9e3ecfc4-409a-4c68-ae90-9b85964f5e91.sql:371 |
| report_listing | authenticated | supabase/migrations/20261019223105_fee22f72-e321-4aa2-9f6a-9c2a066e9e7a.sql:363 |
| reveal_flags | authenticated | supabase/migrations/20261017103843_8a66e174-f584-454e-8bc7-8e51f8c97cf3.sql:45 |
| reveal_listing_contact | authenticated | supabase/migrations/20261019224505_a93ea697-cdf9-4d5a-b3b9-e1e65e0549f6.sql:114 |
| save_listing | authenticated | supabase/migrations/20261019223105_fee22f72-e321-4aa2-9f6a-9c2a066e9e7a.sql:314 |
| save_posting_identity | authenticated | supabase/migrations/20261029092611_0cd49f0d-bdbc-4c3d-b789-f1fbe20db2c7.sql:154 |
| save_seller_place | authenticated | supabase/migrations/20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql:707 |
| seller_feed_page | anon,authenticated | supabase/migrations/20261029091909_85de2619-cec0-459c-b6c0-4e58f4e906b8.sql:141 |
| seller_notices | authenticated | supabase/migrations/20261011085637_3c0e90be-87cd-4103-9264-d4fcdc2beb99.sql:44 |
| set_cover_photo | authenticated | supabase/migrations/20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql:140 |
| set_listing_photos_soon | authenticated | supabase/migrations/20261016150556_19d4f9d4-882a-4812-82ca-abd412070915.sql:48 |
| set_listing_pin | authenticated | supabase/migrations/20261028223430_631c8680-d4a9-4b2f-bab9-8c83d604a445.sql:113 |
| set_listing_price | authenticated | supabase/migrations/20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql:770 |
| set_listing_reserved | authenticated | supabase/migrations/20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql:698 |
| sold_cutoff | anon,authenticated | supabase/migrations/20261019222105_f4f10b49-3bcb-44a4-a847-4c7ac1e202bc.sql:49 |
| sold_visible_days | anon,authenticated | supabase/migrations/20261019222105_f4f10b49-3bcb-44a4-a847-4c7ac1e202bc.sql:37 |
| submit_listing | authenticated | supabase/migrations/20261006225254_626282eb-da6f-45aa-ac32-ef03407502a5.sql:577 |
| suggest_seller_aliases | authenticated | supabase/migrations/20261004055007_5118f016-fe53-417c-8b4a-05ed5604676d.sql:285 |
| transition_listing | authenticated | supabase/migrations/20261015012743_a5300c28-14fb-4318-8450-bd900cf5c527.sql:743 |
| unsave_listing | authenticated | supabase/migrations/20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql:335 |
| user_set_preferred_language | authenticated | supabase/migrations/20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql:381 |
| user_set_viewing_location | authenticated | supabase/migrations/20261010065637_01da330c-2189-4927-bc80-ef6c6f0ed58f.sql:67 |
| validate_listing_attributes | authenticated | supabase/migrations/20261007222234_fc6110fd-d52f-4aae-803b-576741e9288f.sql:422 |

## Twenty anonymous functions: body-grounded reasons

The read-only live public non-extension catalogue returned exactly 20 anon-executable functions. Running the production pure comparison on that captured catalogue: **0 unlisted anon functions; 0 stale lines; failed=false**. Tables/columns were included in the same live catalogue.

| Function | Latest body | Reason checked against body |
| --- | --- | --- |
| feed_page | supabase/migrations/20261019223222_b947bfda-3636-493b-b9b5-8a0225eb0f21.sql:15 | Public card pagination (size 1..50), category/place widening and cursor validation; active listings or sold within sold_cutoff; stripped, screened cover photos. |
| seller_feed_page | supabase/migrations/20261029091909_85de2619-cec0-459c-b6c0-4e58f4e906b8.sql:8 | Read-only public seller feed; active account and seller_public_alias required, held alias treated as unknown; validated page/cursor, active or recently sold cards. |
| public_listing | supabase/migrations/20261019223105_fee22f72-e321-4aa2-9f6a-9c2a066e9e7a.sql:177 | Validates public-id shape; listing_read gate; active or recently sold row only; delegates field projection to public_listing_json(row, auth.uid()). |
| get_browse_tree | supabase/migrations/20260903025501_f90d7b5a-e159-4084-9982-cb5e4f42a96b.sql:158 | Read-only active/time-visible country-filtered category tree; catchall only with an active listing. |
| get_category_tree_version | supabase/migrations/20260928002133_f98b5cf0-bb5a-4842-ac89-7bad2fc31517.sql:290 | Read-only hash of category timestamps/counts and pointer ordering; no catalogue rows returned. |
| get_category_attributes | supabase/migrations/20260810065832_aa5446b7-988d-4ba3-823b-759ed735f3eb.sql:26 | Legacy SECURITY DEFINER read of category_attributes with inherited parent traversal (depth <10). No caller or permission check in body; public approval is not inferred. |
| catalog_find_version | supabase/migrations/20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql:36 | Read-only hash of category version, attribute/link counts and timestamps, approved translation count and enabled languages; exposes a change token, not rows. |
| get_location_tree | supabase/migrations/20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql:44 | Read-only place tree from shown_locations for uppercased country; visible-tree rule delegated to that view. |
| get_location_tree_version | supabase/migrations/20260915190024_efbee3c4-309b-49b1-8292-aa8a946dc188.sql:78 | Read-only location change/version hash scoped by country. |
| get_open_countries | supabase/migrations/20260917113152_479720fb-c520-42df-a685-4460bea6d037.sql:259 | Read-only open-market country information; inspect full body for exact predicate and returned fields. |
| get_ui_bundle | supabase/migrations/20260831060745_c719360f-757c-4a00-b2ba-71e4bc2bbf0a.sql:255 | Approved public/base-language UI translations, no orphaned/non-null excluded rows; empty fallback for unavailable language. |
| get_ui_bundle_version | supabase/migrations/20260901234603_74ae387b-d985-4079-802e-9597270ac7c6.sql:202 | Read-only UI translation version/change token; inspect full body for language/status filters. |
| get_ui_bundle_parts | supabase/migrations/20261031013352_e1fda8f7-ae33-4f90-a76e-508db50f026f.sql:23 | Approved, non-null, non-orphaned UI translations for public/base language, separated into written/copied via ui_text_written; empty maps otherwise. |
| get_entity_bundle | supabase/migrations/20260830080548_da0dfee5-6066-4087-b96b-dacfbac5c2a2.sql:16 | Approved non-null entity translations only, for enabled-public or base language; otherwise empty object. |
| legal_in_force | supabase/migrations/20261024065107_5e8d01eb-edf3-4456-93e4-96ad2c7cee6f.sql:14 | Published currently effective legal version for kind/country; legal_kind_signed_in_only denies anon for restricted kinds. |
| legal_scheduled | supabase/migrations/20261024065107_5e8d01eb-edf3-4456-93e4-96ad2c7cee6f.sql:52 | Published future legal version for kind/country; same signed-in-only-kind check. |
| price_unit_labels | supabase/migrations/20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql:266 | Read-only price-unit labels; inspect full body for catalogue bounds. |
| price_shape_for_basis | supabase/migrations/20260928034942_247a3ed0-ff97-43f9-9e8d-3c2071c810df.sql:70 | Pure immutable strict mapping from basis token to mode/period; no table access. |
| sold_cutoff | supabase/migrations/20261019222105_f4f10b49-3bcb-44a4-a847-4c7ac1e202bc.sql:39 | Shared sold-listing visibility cutoff helper; no write. |
| sold_visible_days | supabase/migrations/20261019222105_f4f10b49-3bcb-44a4-a847-4c7ac1e202bc.sql:27 | Shared sold-listing visibility duration helper; no write. |

## Comparison rules / DEC-310

- Anon execute without an anon/PUBLIC entry fails. PUBLIC is inherited by browser roles; authenticated-only does not cover anon. Overloads share the list's unqualified name.
- Unlisted output is count-only plus the read-only catalogue query, not names, hashes or artifacts. Catalogue TSV stays under RUNNER_TEMP.
- A list name absent from the entire live catalogue fails as stale and prints its already-public name. Live relations/columns are never mistaken for missing functions.
- Empty or malformed catalogue TSV and malformed/old-format role lines throw, never pass as empty.
- Other four lint counts retain their baselines. The database's old anon count is ignored; no migration or new database reader was introduced.
- The migration guard validates the parser before command substitutions, then judges roles in direct and existing FOREACH format grants.

## Tests

- SLB-1: planted unlisted anon function fails.
- SLB-2: planted stale line fails naming `retired`.
- SLB-3: exact set passes; live table not stale.
- SLB-4: planted private function name absent from all verdict lines; query present.
- SLB-5: authenticated-only line cannot cover anon execute of same name.
- SLB-6: CLI used by migration guard parses the planted roles line exactly like lint's import; allowed anon/authenticated grant passes, PUBLIC grant is refused.
- Additional parser tests reject malformed roles/two-field lines and prove PUBLIC inheritance plus format-loop role mismatch.
- Targeted tests: 4 files, **22/22 passed** (security-lints, public-surface, wired, ci-images).
- Full check-migrations.sh and self-tests: **Migration guard OK** on the three-field format.

## CI-3a correction

Only the specified header comment changes: a start is never retried. One correction line under “The replay's cause” points to the operator's correction: job_run_claim's first-claim refusal, not a repeated migration; with all images local a migration failure is its own finding, not DEC-309's registry counter. The historical report's earlier text is not silently rewritten.

## K2 / Limits

- Same live comparison for authenticated is deferred by ruling 7, now a separate roadmap line. Existing caller-gates/acceptance checks are different concerns, not its replacement.
- Nightly REST cannot read the live catalogue; explicit NOT RUN in output, smoke remains the gating surface caller. Nightly workflow is outside scope.
- .github/workflows/local-backend-proof.yml:987 still has a dormant upload path for the old anon-functions TSV. No step now creates that file; changing the upload step is outside the scoped smoke lint step. No name artifact is produced by the new lint path.
- Static research briefly derived 21 candidates because a named-argument signature obscured geo_distance_km's later revoke; live catalogue shows 20, and geo_distance_km is service-only (20261007222234 :451–452), not added.
- Initial local list comparison found get_category_tree_version's anon grant and authenticated grant on separate lines in the newest file; evidence extraction corrected to include both before checks. Final read-only comparison passes.
- No browser run: no app code changes; no browser-dependent flow. Live database reads only, no writes.

## Files changed (git diff --name-only d7981076)

```text
.github/workflows/local-backend-proof.yml
docs/_changelog.md
docs/features/security-scanning.md
docs/governance/briefs/foundations-turn-ci-3b.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-ci-3a.report.md
roadmap.md
scripts/check-migrations.sh
scripts/conformance/ci-images.test.ts
scripts/conformance/wired.test.ts
scripts/public-surface-allowlist.txt
scripts/public-surface.test.ts
scripts/public-surface.ts
scripts/security-lints-baseline.json
scripts/security-lints.test.ts
scripts/security-lints.ts
docs/governance/reports/foundations-turn-ci-3b.report.md
```

## Unit count and full checks

Report written **before** bun run checks. Targeted count above; full unit count pending the full run.

slow steps: not finished — CI judges
