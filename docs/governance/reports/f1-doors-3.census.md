# f1-doors-3 — the census (STEP 1)

Base: dev a67a3fbda (the merge of pull request #43); the lane began from `origin/dev` a67a3fbda, so `<BASE>` and
`<HEAD>` are equal. Every reading below is of that tree. A body's md5 is `md5` of the text between the dollar tags of
its LAST literal declaration with carriage returns removed (the form a migration's pre-check reads from
`pg_proc.prosrc`), by a scratch reader over `scripts/doors/catalogue.ts` (`/tmp/ethio-scratch/f1-doors-3/census.ts`);
callers by a scratch scan of every `rpc("<name>"` / `rpc<…>("<name>"` and every name in a `for … of [...]` list under
`src/`, `e2e/` and `scripts/` (`callers.ts`); SQL callers by a scan of every function's last body and every
`CREATE POLICY` / `CREATE TRIGGER` / `CREATE VIEW` statement (`sql-callers.ts`).

Two bodies are not their last literal declaration: `admin_import_translations` and `admin_undo_import` were
redeclared by computed insertion in `20261029024619_b8c031b9…` (D1 M6c-6), which added one dial block after each
step-up line. Their live bodies are the literal ones below plus that block: `admin_import_translations` live md5
`1a043985654770be62cdf12358c7b269` (literal `d9480129cde6ed8ccf23a4b8fb249d77` + `rate_gate('import_commit')`),
`admin_undo_import` live md5 `9f49201faa7c3284707c3e51a41b9f40` (literal `ee0e979fa9b96654b5329ede136d0711` +
`rate_gate('import_undo')`). The pre-check of this turn's migration reads the live values.

## consumers

"Gates today" is the body; "promise" is the manifest line (`scripts/doors/manifest.txt`, line number). Every door of
the family today: `has_permission(<resource>, <action>)` (any scope), then `require_step_up_if_needed`, sentences by
plain `RAISE`; none calls `door_context`, none has the shell, every codes cell is `-`. "→ door_context" means the
sentence is answered by the gate (notSignedIn / permissionDenied / stepUp P0009 kept / rateLimited). A code marked
**new** does not exist in the repository today; every other code exists (`door-codes.ts`, the legal family, F1-2).

### The translation doors

| Door (last declaration, md5) | Gates today → promise | Returns | Sentences → code | Callers (what they read) |
|---|---|---|---|---|
| `admin_save_translation(text,text,text)` 20261028233839 :511, dfe3fb22da9e7965df47af8754a78163 | permission + step-up + `rate_gate('staff_translation')` → `_core` → line 109: translations:update, staff_translation, global | void → **jsonb** `{ok:true}` | 'permission denied', 'rateLimited' → door_context; the core's (below) | `translations-service.ts:225` (error), `:942` (comment); `transfer-bar.tsx:36`, `history-drawer.tsx:36`, `io-formats.ts:11` (comments) |
| `admin_machine_translation(text,text,text)` same :669, 078c76480929687fa8369518c556f990 | as above, `staff_machine_translation` → line 82: translations:machine, global | void → **jsonb** | as above; the core's | `src/routes/api/translate.ts:195` (error through `WRITER_REASONS`); `translate.route.test.ts:55-56`; `e2e/admin-translations-console.spec.ts:490` (comment) |
| `admin_save_entity_translation(text,uuid,text,text,text)` same :587, 7fed0cc8b27463facfb0c4ba412dc9fa | as `admin_save_translation` → line 103 | void → **jsonb** | as above; the core's | `translations-service.ts:726` (error); `e2e/admin-translations-data.spec.ts:779` (TR-42 reads 'unknown entity'), `:813` (TR-42 reads 'unknown entity field') |
| `admin_machine_entity_translation(text,uuid,text,text,text)` same :750, 8202e632832fcfba35e6b22053c65328 | as machine → line 81 | void → **jsonb** | as above; the core's | `translate.ts:188` (error, `WRITER_REASONS`); `e2e/admin-translations-data.spec.ts:813` (TR-42 'unknown entity field') |
| `admin_set_translation_status(text,text,text)` 20260831052750 :5, 6f430f356cd353f02cdddbf8656d16fb | permission + step-up + `translation_scope_ok`; **no dial** → line 131: translations:approve, staff_config, translation.status, global | void → **jsonb** | 'permission denied' → door_context; 'not assigned to this language' → **permissionDenied:language** (below, D-3); 'unknown translation action' → badValue:action; 'translation row not found' → **unknownTranslation** (new); 'flagged rows cannot be approved — fix the placeholder first' → **translationFlagged** (new) | `translations-service.ts:238` (error) |
| `admin_set_entity_translation_status(text,uuid,text,text,text)` 20260830080548 :141, d14d2fdc386d554002d6f25791c2a4c0 | as above, no dial → line 120 | void → **jsonb** | as above minus the flagged one | `translations-service.ts:743` (error) |
| `admin_approve_all_translations(text)` 20260831060745 :78, e5831ae1657d8279970b49e8232e9394 | permission + step-up + scope; no dial → `approve_all_translations_impl` → line 20: translations:approve, staff_config, global | jsonb `{approved, skipped}`, kept | 'permission denied' → door_context; 'not assigned…' → permissionDenied:language; the impl's 'unknown language' → badLanguage, 'base language rows are sync-owned' → **baseLocked** (new) | `translations-service.ts:257` (data, error); `approve-bar.tsx:26` (comment) |
| `admin_approve_all_entity_translations(text)` 20260901205020 :65, dbd476290f459afaffdc6f16f05ee8ca | as above → line 19 | jsonb, kept | as above | `translations-service.ts:281`; `approve-bar.tsx:32` (comment) |
| `admin_import_translations(text,jsonb)` 20261028235443 :10 (computed after, see above) | permission + step-up + **`rate_gate('import_commit')`** (M6c-6) + scope → line 51: translations:update, **staff_config**, translation.import, global | jsonb `{imported, flagged, unchanged, skipped, batch_id}`, kept | 'permission denied' → door_context; 'not assigned…' → permissionDenied:language; 'p_items must be a json array' → badValue:items; 'too many rows (max 5000)' → tooManyRows (exists: the import gate's word); 'base language rows are sync-owned' → baseLocked; the save core's | `src/routes/api/admin/translations/import.ts:6,17` through `defineImportRoute` → `src/server/imports/route.ts` relay (`IMPORT_REFUSALS` :54-68 reads the sentences); `e2e/admin-translations-governance.spec.ts:932` (comment) |
| `admin_undo_import(uuid)` 20260902031954 :133 (computed after) | permission + step-up + **`rate_gate('import_undo')`** + scope → line 137: translations:manage, **staff_config**, translation.undo_import, global | jsonb `{restored, conflicted}`, kept | 'permission denied' → door_context; 'batch id required' → required:batch; 'unknown import batch' → **unknownBatch** (new); 'not assigned…' → permissionDenied:language | the same import route (`rpcs.undo`); `route.test.ts:145,426` (IMR fixtures name it) |
| `admin_sync_ui_keys(jsonb,jsonb)` 20261031013352 :50, f45a0dae70eb71b3458d6c4be445f7ab | permission + step-up + `rate_gate('staff_config')` → line 133: translations:manage, translation.sync, global | jsonb, kept | 'permission denied', 'rateLimited' → door_context; 'p_en must be a json object' → badValue:en. K4: literal `t.lang_code = 'am'` | `translations-service.ts:333`; `e2e/admin-translations-console.spec.ts:301,334` (TR-7 through the UI), `:1175` (TR-40 reads data/error text loosely) |
| `admin_set_key_context(text,text)` 20260901234603 :14, 9cc2dcf68408c39139a77e28e911f93a | permission + step-up; no dial → line 122: translations:manage, staff_config, translation.context, global | void → **jsonb** | 'context too long (max 500)' → tooLong:context; 'unknown translation key' → **unknownKey** (new) | `translations-service.ts:933` |
| `admin_set_translator_languages(uuid,text[])` 20260829050332 :534, 89ed6c228c5d95d252b44c5b730d20fd | permission + step-up; no dial → line 132: translations:manage, staff_config, translation.translator_scope, global | void → **jsonb** | 'user not found' → unknownUser; 'unknown language' → badLanguage | `translations-service.ts:358` |

The cores and helpers (owner-only or service-role only; no manifest line; called only by SQL). They re-check
permission, step-up and the language scope and raise the sentences their doors' callers read, so each is redeclared
whole with the same codes (`door_refuse`; a P0D01 from a core is caught by the calling door's shell):

| Helper (last declaration, md5) | Sentences → code | SQL callers |
|---|---|---|
| `admin_save_translation_core(text,text,text)` 20261028233839 :440, 05ae84291234466d01b27dde965b71af | 'permission denied' → permissionDenied; 'not assigned…' → permissionDenied:language; 'base language rows are sync-owned' → baseLocked; 'unknown translation key' → unknownKey | `admin_save_translation`, `admin_import_translations` |
| `admin_machine_translation_core(text,text,text)` same :606, 4baa491f62e3f5d4599e278292c82556 | as above | `admin_machine_translation` |
| `admin_save_entity_translation_core(text,uuid,text,text,text)` same :530, 66c953cd0ef9f4c53d194a525342bc4c | + 'unknown entity' → **unknownEntity** (new); 'unknown entity field' → badValue:field. K4: `p_lang IS DISTINCT FROM 'am'` | `admin_save_entity_translation`; and F1-4a's `admin_commit_attribute_import` (20261028235443 :700), `admin_commit_location_import` (:461), `admin_commit_category_import` and `admin_undo_category_import` (20261029001111 :180, :514; computed after) — their callers then hear the codes through the import relay |
| `admin_machine_entity_translation_core(text,uuid,text,text,text)` same :688, 99dd2893c7d979f9a0703dcf6272a8ee | + 'empty machine value' → required:value | `admin_machine_entity_translation` |
| `approve_all_translations_impl(text)` 20260901143032 :64, b6654d89a6a21953267dad2fafeeaf5d | 'unknown language' → badLanguage; 'base language rows are sync-owned' → baseLocked | `admin_approve_all_translations` |
| `approve_all_entity_translations_impl(text)` 20260901205020 :26, c868b270737586931dd5bb59eb987822 | as above | `admin_approve_all_entity_translations` |
| `set_language_order_impl(text[])` 20260831060745 :97, 56ab6d2e38647d1e45c7e729d0293d50 | 'no language codes given' → emptyList; 'unknown language' → badLanguage | `admin_set_language_order` |

### The language doors

| Door | Gates today → promise | Returns | Sentences → code | Callers |
|---|---|---|---|---|
| `admin_upsert_language(text,text,text,boolean,text[])` 20261029015903 :173, e5f0383974332ee98bd1e4b7da8fdeb1 | permission + step-up + `rate_gate('staff_config')` → line 147: translations:manage, translation.language_upsert, **`row:languages_country_codes.country_code`** (see cell-meaning) | void → **jsonb** | 'invalid language code' → badValue:code; 'language names are required' → nameRequired | `translations-service.ts:306` |
| `admin_delete_language(text)` 20260902021248 :48, 4270f579415c587bf64505d7b5dc4b4e | permission + step-up; no dial → line 33: translations:manage, staff_config, translation.language_delete, global | jsonb, kept | 'unknown language' → badLanguage; 'the base language cannot be deleted' → **baseLanguage** (new); 'language is published — unpublish it first, then delete' → **languagePublished** (new) | `translations-service.ts:1135,1167`; `delete-language-dialog.tsx:28` (comment) |
| `admin_set_language_flags(text,boolean,boolean)` 20260901234603 :230, 7fd039e6acd98c3192c8b5524c5a3eb5 | permission + step-up; no dial → line 123: translations:manage, staff_config, translation.language_flags, global | void → **jsonb** | 'unknown language' → badLanguage; 'pseudo-localization language is never publishable' → **pseudoLanguage** (new); 'catalog empty — sync keys before publishing a language' → **catalogEmpty** (new); 'language not fully approved: % of % remaining' → **notFullyApproved**:<remaining> (new). K4: literal `'zxa'` | `translations-service.ts:321`, `:53`, `:1039` (comments); `pseudo-bar.tsx:32` (comment); `languages-page.tsx:239` reads `/catalog empty/i` from the raw message; `e2e/admin-translations-console.spec.ts:257` (TR-6 reads `/catalog empty/i` :281 and `/not fully approved/i` :291) |
| `admin_set_language_order(text[])` 20260831060745 :143, 2cee1d7fcc888468bca66e73c523e2ba | permission + step-up; no dial → `set_language_order_impl` → line 124: translations:manage, staff_config, audit `-`, global | void → **jsonb** | the impl's | `translations-service.ts:294`; `e2e/admin-translations-governance.spec.ts:441` (TR-20 restores the order; reads error only to throw) |

### The legal doors

Their refusals are already code-shaped plain RAISEs; they become `door_refuse` with the same codes. Each writes its own
`audit_log` row (no `log_audit`).

| Door | Gates today → promise | Returns | Sentences → code | Callers |
|---|---|---|---|---|
| `admin_save_legal_draft(text,character,text,text,text,text,jsonb)` 20261029002140 :190, baf0a1bb63062668a0335b1f9647db0f | auth.uid + permission(legal,edit) + step-up + staff_config → line 104: `arg:country` | jsonb, kept | 'not authenticated' → notSignedIn; 'permission denied', 'rateLimited' → door_context; badValue:texts, badLanguage, tooLong, badValue:kind, badValue:country, labelRequired, labelTaken → the same codes. K4: literal `('en', 'am')` | `legal-service.ts:229,239`; e2e LG-2 (`legal-doors.spec.ts:284` reads 'permission denied' :285; `:297` not.toContain :302), LG-3 `:321-336` (codes, kept) |
| `admin_discard_legal_draft(uuid)` same :57, d2e79240e6784b25781c9c6cdc6dfd99 | as above → line 36: global | jsonb, kept | unknownVersion, notDraft | `legal-service.ts:257`; `legal-doors.spec.ts:419,424` (LG-4 reads notDraft, kept) |
| `admin_add_legal_translation(uuid,text,text)` same :13, dcc64aace95421a2ee96b27af948b744 | permission(legal,publish) + step-up + staff_config → line 15: `row:legal_documents.country` | jsonb, kept | unknownVersion, notPublished, badLanguage, badValue:body, tooLong, translationExists; `RAISE '%', v_problem` → unknownFact:<name> / factMissing:<name> (`legal_text_fact_problem`'s two codes, each a literal `door_refuse`). K4: literal `('en', 'am')` | `legal-service.ts:249` |
| `admin_mark_legal_reviewed(uuid,text)` same :87, 390bb8aaa7135d8808845d562c9fa0fe | permission(legal,edit) + step-up + staff_config → line 83: `row:legal_documents.country` | jsonb, kept | nothingToReview, badValue:note | `legal-service.ts:281`; `e2e/legal-admin.spec.ts:778` (LGA-16 reads `JSON.stringify(body)` containing "permission denied" :783) |
| `admin_publish_legal_version(uuid,boolean,timestamptz)` same :123, 61baef330e15b4f8fc829e0f519a22e0 | permission(legal,publish) + step-up + staff_config → line 95: global | jsonb `{version_id, effective_at}`, kept | badValue:material, unknownVersion, notDraft, labelRequired, bothLanguages, changelogRequired, unknownFact / factMissing, noticeTooShort | `legal-service.ts:265`; LG-2 `:286` (reads 'permission denied' :290), LG-3 `:315-353` (codes, kept), `:97x` |
| `admin_set_legal_settings(jsonb)` same :270, cf9f949f3122bb41efec8a8993a9a8b4 (**10,409 bytes**) | permission(legal,edit) + step-up + staff_config → line 125: global | jsonb `{ok:true}`, kept | badValue:settings / :<key> / :operator_details / :legal_phone / :security_email / :account_keep_months / :email / :operator_name / :operator_address / :governing_law / :providers / :copyright_agent → `door_refuse('badValue', …)` | `legal-service.ts:273`; LG-6 `legal-doors.spec.ts:710` (reads 'permission denied' :713, not.toContain :724), `:720-735` (badValue codes, kept); `:1143` |
| `admin_export_legal_acceptances(uuid,timestamptz,uuid,integer)` 20261028230748 :199, 628e71d63aef14abf983de2e330d7b82 | permission(legal,export) + step-up; `rate_gate('legal_export')` **only when `p_after_at IS NULL`** (the first page, the audited one), after its reads → line 44: dial legal_export, `row:legal_documents.country` | jsonb, kept | badValue:limit, badValue:after, unknownVersion | `legal-service.ts:385,391`; LG-24 `legal-doors.spec.ts:1279` ('permission denied'), `:1286` (not.toContain), `:1284-1313` (pages) |

### The readers

| Reader (last declaration, md5) | Gates today → promise | Sentences → code | Callers |
|---|---|---|---|
| `admin_list_translations(…7)` 20260901234603 :61, 882c6e623d38124c7c8179956f132a76 | permission(translations,view) → line 75 | → door_context 'staff-reader' | `translations-service.ts:201,928`; `translate.ts:217` |
| `admin_translation_stats(text)` 20260901143032 :30, 4021e145e95e5954635564944cc8eade | → line 134 | as above | `translations-service.ts:133`; `e2e/admin-translations-console.spec.ts:383` (TR-9, data) |
| `admin_list_translation_revisions(text,text,integer)` 20260830113828 :11, e7472929223744af768e65cf89e7d0b3 | → line 76 | as above | `translations-service.ts:756,777` |
| `admin_export_translations(text,text,integer)` 20261012101642 :12, 308dda363dd2a19c7bc9856a52463d9b | 'not signed in' + permission → line 46 | 'limit out of range' → badValue:limit | `translations-service.ts:171,1084,1100` |
| `admin_list_entity_translations(…5)` 20261022023137 :57, 0c8841fd4ed3f933b6a0936c875d01de | → line 69 | → door_context | `translations-service.ts:670,797`; TR-42 `:796,:837` (data) |
| `admin_entity_translation_stats(text)` same :3, 15242eeb983391385e39cbd99c9ff566 | → line 40 | → door_context | `translations-service.ts:811,822,862,864` |
| `admin_list_languages()` 20260831064939 :100, 273f4db5d774f239b7bbf68dab74b8b3 | → line 68 | → door_context | `translations-service.ts:118`; `strings-page.tsx:192` (comment) |
| `admin_language_delete_preview(text)` 20260902021248 :7, eab7ddcfd4236f42c50bf7266e1749b9 | permission(translations,manage) → line 54 | 'unknown language' → badLanguage | `translations-service.ts:1161` |
| `admin_get_translator_scope(uuid)` 20260830041754 :9, ed9a9dc89de1c3d273cf76f936d6a9a9 | → line 49 | → door_context | `translator-card.tsx:24,48` |
| `translation_scope_ok(text)` 20260829050332 :182, df925ba6ca44fe98a2f67eea830e4d26 | a `LANGUAGE sql` boolean: manage OR an assignment → line 270 | none | ten family bodies (`IF NOT translation_scope_ok(…)`), `translate.ts:104` (route pre-check, reads `data === true`) — stays (D-6) |
| `user_has_translation_permission(uuid)` 20260830034154 :7, 7613facbc865e4bf1b71b2e35e7369c9 | → line 273 | — | **none** (superseded by `admin_get_translator_scope`); `check-doors-allowlist.txt:12` says F1-3 revokes it or names its caller |
| `admin_legal_documents()` 20261024045415 :7, 2c888cc34f8d72b5749d05bd87755378 | 'not authenticated' + permission(legal,view) → line 55 | → door_context. K4: `missing_languages` literal `NOT IN ('en', 'am', 'zxa')` | `legal-service.ts:163,167,175`; LG-9 `legal-doors.spec.ts:914` (service role: 'not authenticated' :915), `:929` ('permission denied' :930) |
| `admin_legal_version(uuid)` same :66, 3c3ca58a5432ef2867639eafcccada65 | → line 57 | unknownVersion kept. K4: the same literal | `legal-service.ts:215,217,224`; LG-9 `:916` (:919 'not authenticated'), `:931` (:934) |
| `admin_legal_settings()` 20261019063635 :267, 2d59432c2527e7429d99ba293655f3b1 | → line 56 | → door_context | `legal-service.ts:207,209`; LG-6 `:697,708` (:709 'permission denied') |
| `legal_review_overdue()` 20261021092329 :133, f76983a0bfe12e3ae5a7289dd7a3d37c | returns **false** for no caller / no legal:view → line 217: staff-reader legal:view | none today → door_context (D-6) | `nav-alerts.ts:27` (only for a legal:view holder); `e2e/legal-admin.spec.ts:845,857` (LGA-17), `:859` (a person reads `false` → becomes the refusal) |
| `admin_user_legal_history(uuid)` 20261019103558 :294, 37ff6b882a31735bf2f1ba18ad33456d | 'not authenticated' + permission(profiles,view) → line 150 | unknownUser kept | `legal-service.ts:293,295`; LG-7 `legal-doors.spec.ts:800,812` (:813 'permission denied'), `:817`, `:1052,1056` |
| `base_languages()` 20261106051700 :77, 973e515da2826cb33ca4f3d339bb70e8 | already door_context staff-reader legal:edit (F1-1) | — K4: literal `NOT IN ('am', 'zxa')` with its inline exception | `legal-service.ts:200`; LGA-22 `legal-admin.spec.ts:1166,1183` (already "permissionDenied") |

No family function is called by a policy, a trigger or a view.

## decisions named (for the report's §10; the stop asks only the three it must)

- D-1 Files by concern: the translation doors and their cores; the language doors and their helpers with the
  constants function; the legal doors; the readers and the retirement — each under about 25 KB, a body never split.
- D-2 `RETURNS jsonb` (DROP + CREATE, grants restated): the eleven void doors named above answer `{ok:true}` (F1-2's
  form); every jsonb door keeps its success answer exactly.
- D-3 The translator's language check (`translation_scope_ok` false) refuses `permissionDenied:language`: a scope
  refusal of the permission, as `has_permission_scoped`'s `permissionDenied:scope` — 403, and `door_refused` counts
  no dial for it (a code outside its gate list would re-count `staff_translation` for a language the caller is not
  assigned — the tolerance). The client tells it from a plain permissionDenied by its tail.
- D-4 The sentence → code table above; new codes: baseLocked, unknownKey, unknownEntity, unknownTranslation,
  translationFlagged, unknownBatch, pseudoLanguage, catalogEmpty, notFullyApproved, baseLanguage, languagePublished.
  No new English string: each code a family screen reads has words today (`admin.translations.error.scope`,
  `baseLocked`, `flaggedApprove`, `coverage`, `deleteBase`, `deletePublished`, `codeInvalid`, `permission`,
  `admin.translations.syncFirstTooltip`; the legal family's `admin.legal.error.*`); the rest fall to the generic
  line, as today.
- D-5 Audit stays each door's own `log_audit` / `audit_log` insert (F1-2 kept it).
- D-6 Readers: every staff reader takes `door_context`'s staff-reader form (no SQL caller reads them).
  `legal_review_overdue` takes it too (its one client reads it only for a legal:view holder; a person's call now
  refuses instead of answering `false` — LGA-17 `:859`). `translation_scope_ok` stays for F1-7: ten bodies and
  the translate route read its `false`, which the reader form would turn into a raise.
- D-7 The K4 constants function: `public.language_code(p_role text) RETURNS text` IMMUTABLE (roles `base`, `pair`,
  `pseudo`; service_role only), read by `base_languages()`, both `missing_languages` reads, and every redeclared
  family body that names a language code today.
- D-8 `user_has_translation_permission` revoked from `authenticated` (no caller).

## cell-meaning

- `admin_save_legal_draft` `arg:country` — the country of the `legal_documents` row the door creates or whose draft
  `legal_versions` row it writes (`p_country`; NULL = the global document). It names which document, not a new value
  of a document's country. **Holds.**
- `admin_add_legal_translation` `row:legal_documents.country` — the country of the document whose published version
  the door adds a `legal_version_texts` row to (it creates the text row; the document and version it only reads).
  The meaning holds; the column is `legal_documents.country_code` (`20261019063500_1bb93282…` :34, `char(2) NULL`,
  NULL = a global document). Proposed cell `row:legal_documents.country_code` — a name correction; a global
  document (NULL) and an unknown version both refuse a country holder `permissionDenied:scope`, exactly as a
  foreign one.
- `admin_mark_legal_reviewed` `row:legal_documents.country` — the document `p_document_id` names; the door creates a
  `legal_reviews` row for it. Holds; the same column correction.
- `admin_export_legal_acceptances` `row:legal_documents.country` — the document of the version `p_version_id`; the
  door only reads its acceptances and writes one audit row. Holds; the same column correction.
- `admin_upsert_language` `row:languages_country_codes.country_code` — **does not hold.** No table
  `languages_country_codes` exists (the name is the trigger function `languages_country_codes_valid()`); the
  `languages` row has a `country_codes text[]` column that this door itself WRITES from its `p_country_codes`
  argument (a new value of an existing row's country, which DEC-380 says an `arg:` never names, and a row cell
  cannot name either), a language may name several countries, and a new language has no row. Proposed cell:
  `global` (the plan's §3.3 lists languages among the configuration doors that are `global`). This changes who may
  call the door against the line's promise (a country holder of translations:manage whose country a language names
  would pass a `match`; under `global` none does) — **STOP (a)**, stop-1.
- Doors that end or undo what another opened: `admin_discard_legal_draft` (ends `admin_save_legal_draft`'s draft)
  and `admin_undo_import` (undoes `admin_import_translations`). `staff_config` is the shared family dial at its
  ordinary ceiling (600/h) — not a ration. `import_undo` (below) is the import family's own dial — not a ration of
  open imports either: it meters undo presses, and the commit is metered by `import_commit`.
- Dial cells that do not hold (they do not change who may call): `admin_import_translations` and
  `admin_undo_import` spend `import_commit` and `import_undo` today (M6c-6, the D1 stop-10 ruling), not the line's
  `staff_config`. Proposed cells: `import_commit`, `import_undo` (kept as live; reason cell "census F1-3: the D1
  M6c-6 import dials, kept"). `admin_export_legal_acceptances` spends `legal_export` on its first page only
  (`dials.ts:217` "first pages only (the audited write)"): kept so, by two `door_context` forms (the first page names
  the dial; a later page names none) — the line's dial cell holds.

## definition

The family by the concern's definition (a browser-callable function whose body or callers belong to translations,
languages or the legal admin texts) against the plan's §5 row (`f1-doors.stop-1.md:476`: "admin_save/set/approve/
import/undo/machine translation doors, languages doors, admin_sync_ui_keys, admin_set_key_context, the legal admin
doors (`row` for texts), the legal readers (≈38)") and this GO's list (24 doors + 16 readers = 40):

- **Added by the definition:** `admin_undo_import(uuid)` (manifest :137, translations:manage) — the plan's "undo";
  the GO's list does not name it. Built here.
- **Already on the mechanism:** `base_languages()` (F1-1); here it only reads the constants function (queued).
- **Only SQL calls:** the seven cores and helpers above (no manifest line, not browser-callable); redeclared with
  codes because their sentences are their doors' answers. `translation_scope_ok` is browser-callable but its
  real callers are SQL bodies and the translate route's pre-check (stays, D-6).
- **No caller:** `user_has_translation_permission(uuid)` — revoked from `authenticated` here (DEC-347's retire form;
  its grant predates the public-surface floor, so no RETIRED line is owed), its manifest line and its
  `check-doors-allowlist.txt:12` line leave.
- **Left:** `get_my_translator_languages` (F1-7, already on door_context), `accept_legal` (F1-5b), the public and
  signed-in legal readers (F1-7), as the GO says.
- **No door of the list is gone.**

## tests

E2E (ids by their real names; "reads" = the assertion that changes):

| Spec | Ids of the family | Reads a folded sentence or a changed answer |
|---|---|---|
| `e2e/admin-translations-console.spec.ts` | TR-1, TR-2…TR-13, TR-16, TR-23, TR-33, TR-35, TR-38, TR-39, TR-40, "TR-scope AI" | TR-6 `:281` `/catalog empty/i` → catalogEmpty, `:291` `/not fully approved/i` → notFullyApproved. "TR-scope AI" `:928` reads the translate ROUTE's own 403 `not assigned to this language` (the route's word from `translation_scope_ok` = false, unchanged — kept) |
| `e2e/admin-translations-data.spec.ts` | TR-14, TR-24, TR-26, TR-34, TR-42 | TR-42 `:790` 'unknown entity' → unknownEntity; `:828` 'unknown entity field' → badValue:field |
| `e2e/admin-translations-governance.spec.ts` | TR-19, TR-20, TR-20m, TR-22, TR-29, TR-31, TR-32 | none (TR-20 `:441` throws on any error; TR-29 through the UI) |
| `e2e/legal-doors.spec.ts` | LG-1…LG-14, LG-23, LG-24, LG-32 | LG-2 `:285,:290` 'permission denied' → permissionDenied (`:302` not.toContain keeps its meaning with the code); LG-6 `:709,:713` (`:724`); LG-7 `:813` (`:796` is `record_legal_notice`, not this family — kept); LG-9 `:915,:919` the service role now passes the reader (door_context's service-role pass) → the answer, `:930,:934` → permissionDenied; LG-24 `:1279` (`:1286`) |
| `e2e/legal-admin.spec.ts` | LGA-1…LGA-22 | LGA-16 `:783` "permission denied" in the route body → permissionDenied; LGA-17 `:859` a person's `legal_review_overdue` → the reader's refusal instead of `false` |
| `e2e/legal-certify.spec.ts` (LG-25…LG-31, LG-33, LGC), `legal-accept`, `legal-history`, `legal-pages` (LAC, LGH, LGP) | the acceptance guard, public/own readers and `accept_legal` | none (not this family's doors) |
| `e2e/i18n-*.spec.ts` | public bundles | none |

The manifest's tests: `scripts/doors/check-doors.test.ts` (planted kinds, unchanged). Unit tests: `translations-service.test.ts`
(`:76-80` translationErrorKey / serverMessage on the scope sentence, `:108-109` the translate route's 403 — kept),
`legal-service.test.ts` (`:25-61` the code list and `legalErrorName`, `:239` 'permission denied' → generic, `:47-116`
missing_languages fixtures, `:171` base_languages), `history-drawer.test.tsx:92`, `export-all.test.ts:114`,
`pseudo-generate.test.tsx:126,164` (mocked 'permission denied', any error), `approve-bar.test.tsx`, `ai-bulk-bar.test.tsx`,
`translate.route.test.ts` (TRR-2 `:216` route's 403 kept; `:320-329` the `WRITER_REASONS` sentence table → codes;
`:354-355`), `src/server/imports/route.test.ts` (IMR-1…12; the relay's sentence table gains the codes),
`facts-validation.test.ts`, `publish-date.test.ts`, `io-formats.test.ts`, `pseudo.test.ts`,
`coverage-against-base.test.ts`, `translate.test.ts` (no refusal reading). Next ids: TR-43, LG-34, LGA-23, TRR (next
by file), IMR-13 — the turn adds e2e ids only if STEP 4 needs one (the GO adds none).

## lists

- **Manifest** (`scripts/doors/manifest.txt`): the 40 lines named above, each gaining its codes cell; corrections:
  `admin_upsert_language` (country cell — STOP), the three `row:legal_documents.country` → `.country_code`,
  `admin_import_translations` / `admin_undo_import` dial cells → `import_commit` / `import_undo`; the line
  `user_has_translation_permission` leaves (revoked).
- **Forms allowlist** (`scripts/conformance/forms-allowlist.txt`): `:81` CF-FORM-3 `legal-service.ts (1)` and `:82`
  CF-FORM-3 `translations-service.ts (1)` leave with the two mappers; `:33-45` CF-FORM-1 (wave 3, forms) stay.
- **Public-surface allowlist** (`scripts/public-surface-allowlist.txt`): a DROP + CREATE restates a grant; the
  re-created functions with lines today: `:124` admin_save_entity_translation, `:125` admin_machine_entity_translation,
  `:132` admin_save_translation, `:133` admin_machine_translation, `:144` admin_upsert_language (each "restated
  grant"). The other void doors that become jsonb (`admin_set_translation_status`, `admin_set_entity_translation_status`,
  `admin_set_language_order`, `admin_set_key_context`, `admin_set_translator_languages`, `admin_set_language_flags`)
  gain a "restated grant (not a new surface), F1-3" line each — the migration guard reads every GRANT after the floor.
- **Acceptance-doors allowlist** (`scripts/acceptance-doors-allowlist.txt`): lines `:9,11,12,20,23,25,26,28,29,30,35,
  43,44,45,55,57,58,59,60,66,67,68,71,81` describe this family's doors ("rejects callers lacking … before") — the
  meaning holds; a line changes only if its signature changes (none does).
- **Import gate's list:** `src/server/imports/route.ts` `IMPORT_REFUSALS` :54-68 (sentences of this family :59, :64-68
  and `permission denied` :54, shared with categories/locations/attributes) and `IMPORT_WORDS` :73-83;
  `scripts/check-import-gate.sh` (unchanged).
- **Shared-value tables** (`scripts/conformance/shared-value-tables.txt`): `languages` (its sanctioned helper
  `ensureFenceLanguage`) — no test of this turn writes a new `languages` row; TR-6 flips the real `om` row's flags
  and is refused before any write in both reads; `entity_translations` (read, not shared).
- **Exact-list assertions:** `scripts/conformance/migration-reader.test.ts:194-210` lists every function whose last
  declaration is computed — `admin_import_translations` and `admin_undo_import` leave it when redeclared whole
  (and `admin_set_legal_settings` joins it if it is redeclared by computed insertion) — **a file outside SCOPE**
  (SCOPE names only `scripts/conformance/`'s allowlists), STOP (c), stop-1. `check-doors-allowlist.txt:12` leaves.
- **Register:** `docs/governance/mechanisms.md` (the doors' row; the form kit's reader row) — words into §14 only.

## old-file-readers

- `scripts/migration-guard-allowlist.txt:15` names `20261029024619` (the computed file; unchanged).
- `scripts/migration-real-row-allowlist.txt:8,19` name `20261019063635`, `20261028230748` (landed proofs; unchanged).
- `docs/features/translations.md` `:19,46,92,98,117,165,322,778,964` quote this family's sentences ('not assigned to
  this language', 'language not fully approved: N of M remaining', 'catalog empty — …', 'sync-owned', 'permission
  denied') and `translationErrorKey` — updated with the codes (`:322` is the route's own word, kept).
- `docs/features/legal.md:58,62` — `:58` is `record_legal_notice` (not this family); `:62` "permission denied or the
  step-up refusal" for the staff doors → permissionDenied.
- `docs/features/ci-local-backend.md` lists landed file stamps (unchanged).
- Comments naming migration stamps: `translations-service.ts:16,1040`, `pseudo-bar.tsx:33` (unchanged).
- `src/server/imports/route.ts` `IMPORT_REFUSALS`, `src/routes/api/translate.ts` `WRITER_REASONS` :63-71 (sentences →
  route words), `languages-page.tsx:239` (`/catalog empty/i`) — read the sentences; they change in STEP 3.

## second-readers

`vi.mock("./translations-service", …importOriginal)` in `history-drawer.test.tsx:26`, `approve-bar.test.tsx:31`,
`pseudo-generate.test.tsx:32`, `ai-bulk-bar.test.tsx:27` (each spreads the real module and overrides calls, so a
removed export `translationErrorKey` / `serverMessage` must not be one they override — they override none). No
`import()` or `loadOnce` of either service; no `vi.mock` of `legal-service.ts` or `nav-alerts.ts`.

## chunk-graph

CENSUS-ITEM chunk-graph: not applicable — no client module moves; the services gain a static import of
`src/lib/refusal.ts` (the chunk `refusal-*.js`, 1.11 KiB gzipped at the base), which `/admin/legal`,
`/admin/legal_/$versionId`, `/admin/legal_/edit` and `/admin/translations` already carry and
`/admin/translations_/$lang` does not (scratch `closures.mjs` over the base build).

## environments

This turn's migration reaches: the local proof stack (`bun run db:proof --fresh`, applied by me); ethio-staging
(applied by the supervisor after the migration stop); ethio-prod (after the merge, by the operator's publish, with
the report's pairing lines). I hold no staging or production credential.

## mechanisms

Read whole at their last declarations: `door_refuse(text,text)` 20261106051500 :31 (md5 55f9bf0a…; P0D01,
`code[:detail]`, code `^[a-z][A-Za-z]*$`); `has_permission_scoped(…)` same :60 (3825186…); `door_context(…)`
20261106051600 :39 (5a05ee77…; class → deactivation → scoped permission → step-up (P0009 kept) → dial; service_role
passes and spends nothing; a reader names no dial); `door_refused(text,text,text)` same :128 (1a94a1b3…; re-counts
the dial unless the code is notSignedIn / accountDeactivated / permissionDenied / stepUpRequired; 401/403/428/429
else 400; one `refusals` row); `door_audit` same :172 (1e74cfe9…); `log_audit` 20260809010130 :170. The client's
`readRefusal` (`src/lib/refusal.ts`) read whole: family words keyed by the code's head, then a door key, then a
door code → the family's generic, then sentences, then provider, then generic. F1-2's two families
(`ROLE_REFUSALS` in `roles-service.ts`, `PROFILE_EDIT_REFUSALS` in `admin-users-service.ts`) read as the pattern.

## first-download

From my own lock-exact build at the base (`bun run build && node scripts/check-bundle-size.mjs`, exit 0; JS entry
203.7 / 205 KiB, CSS 22.6 / 40). The family's pages and their room: `/admin/legal` 282.1 / 283 (0.9),
`/admin/legal_/$versionId` 279.1 / 280 (0.9), `/admin/legal_/edit` 281.1 / 282 (0.9), `/admin/translations` 304.0 /
305 (1.0), `/admin/translations_/$lang` 306.3 / 307 (0.7 — it does not carry `refusal-*.js` (1.11 KiB) today, so the
client step will cross its ceiling: a named cause, its line moved by DEC-296's form in that commit), `/admin` 208.1 /
210, `/admin/` 208.9 / 211. Every other page: unchanged by this family (the full table is in `bundle-base.log`,
pasted into the report's §10 with the after table).

## premises

1. The manifest's `admin_upsert_language` cell names a table that does not exist and a multi-valued column the door
   writes (cell-meaning) — STOP (a).
2. The manifest's `row:legal_documents.country` names a column that is `country_code`.
3. The manifest's dial `staff_config` for `admin_import_translations` / `admin_undo_import` — they spend
   `import_commit` / `import_undo` (M6c-6).
4. The GO's list omits `admin_undo_import` (in by the definition).
5. The GO counts `translation_scope_ok` among the staff readers: it is a boolean predicate ten bodies call — its
   reader form would raise where they read `false` (stays, D-6).
6. Rule 30's ">10 KB by computed insertion" meets `admin_set_legal_settings` (10,409 bytes): a computed body is
   invisible to `check-doors` static (`scripts/doors/catalogue.ts` reads literal declarations only, `declarationsOf`),
   which the GO names as this family's guard, and joins `migration-reader.test.ts`'s exact list — STOP, stop-1.
7. `admin_save_entity_translation_core` is also called by four F1-4a import doors: its codes reach their callers
   through the import relay (which gains the codes in STEP 3; their own sentences are F1-4a's).

## findings

- F-1 `admin_set_legal_settings` (20261029002140 :270) writes the `UPDATE` before its last validations (lines
  134-145 of the body); a refusal there rolls the update back (the raise, and under the shell the block's
  sub-transaction) — not a hole, named for the record.
- F-2 A country-scoped legal editor may create a draft for its country (`arg:country`) but neither discard nor
  publish it (`global` lines 36, 95) — the manifest's choice (stricter), named for the supervisor.
- F-3 `languages-page.tsx:237-243` shows the server's raw message beneath the translated line
  (`serverMessage`); with codes that line would show a code — STEP 3 drops it for a door code.
- F-4 `door_refused` re-counts the dial on a `rateLimited` refusal (it is not in its gate list) — F1-1's choice, named.
- F-5 TR-6 flips the real language row `om` (a shared-value table row) — refused before any write in both reads;
  it carries no `@global-state` tag. Named; not this turn's to change unless its assertion changes (it does: its
  two reads become codes), then it stays refused-only.

No security hole found.

## queued

- `f1-doors-ruling-4.md:18` item 5 (3): the SQL constants function for language codes; `base_languages()` and
  `missing_languages` read it — **built here**.
- `f1-doors-2.report.md:143`: `admin_user_legal_history` to F1-3 — **built here**.
- `f1-doors-1.stop-1.md:114` / `check-doors-allowlist.txt:12`: `user_has_translation_permission` → F1-3 — **built
  here** (revoked).
- `f1-doors.stop-1.md:476` (the plan's F1-3 row) — **built here**, with the definition's differences above.
- `f1-doors-2.census.md:75,242`, `f1-doors-2.md:15,19`: the legal family and F1-3 → F1-7 — this family built here;
  the rest **left** (F1-4a → F1-7).
