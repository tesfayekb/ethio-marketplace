MIGRATION — f1-doors-3 part STEP 2: the family's doors on the shell (twelve files, one stop)
DONE: STEP 0 (task saved), STEP 1 (the census; stop 1), ruling 1 saved (2a983cd6e), STEP 2 (the migration, 900c2149a)
LEFT: STEPS 3–7 (the client, the tests and ruling 1 item 5's guard, the gate, the push, the report) — after the supervisor's ruling (types patch; no Amharic is needed) and the answer to the question below
CI: not yet read for 900c2149a — its pull request run started on this push (16 pass, 24 pending at the time of writing); origin/dev a67a3fbda (the base) has not moved since STEP 0
FILES:
docs/governance/briefs/f1-doors-3-ruling-1.md
docs/governance/briefs/f1-doors-3.md
docs/governance/reports/f1-doors-3.census.md
docs/governance/reports/f1-doors-3.stop-1.md
roadmap.md
scripts/conformance/migration-reader.test.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
supabase/migrations/20261114113500_1dd7586c-5155-4362-9ac6-c0dc51f5f822.sql
supabase/migrations/20261114113600_c0e4a4ff-376e-4a62-ab9a-25d6f2a8a0fb.sql
supabase/migrations/20261114113700_607adce0-991b-45c1-acef-22f458b534dc.sql
supabase/migrations/20261114113800_d7031bb9-7f2e-4fbb-bf54-6f5e5870ba13.sql
supabase/migrations/20261114113900_a501b0a5-9fcf-43c1-a389-d140de5bdf92.sql
supabase/migrations/20261114114000_337ffc64-88cc-4dc7-91a4-bb8c9c004293.sql
supabase/migrations/20261114114100_c2dc755f-2fd5-4da6-acd2-d9bd4ee5193d.sql
supabase/migrations/20261114114200_0165890e-7570-4489-a6ca-c4799a469b3c.sql
supabase/migrations/20261114114300_a0caf727-f58a-419d-9480-1ff877dc1e67.sql
supabase/migrations/20261114114400_6eff6f7d-471f-4392-bb50-ae2dd53fa274.sql
supabase/migrations/20261114114500_fedfce7d-18b0-409e-9ba2-d7f465ce3d2b.sql
supabase/migrations/20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql

## The pairing (apply in this order on ethio-staging; each file's pre-check refuses to run before the one above it)

apply 1dd7586c → expect mark 20261114130000
apply c0e4a4ff → expect mark 20261114130100
apply 607adce0 → expect mark 20261114130200
apply d7031bb9 → expect mark 20261114130300
apply a501b0a5 → expect mark 20261114130400
apply 337ffc64 → expect mark 20261114130500
apply c2dc755f → expect mark 20261114130600
apply 0165890e → expect mark 20261114130700
apply a0caf727 → expect mark 20261114130800
apply 6eff6f7d → expect mark 20261114130900
apply fedfce7d → expect mark 20261114131000
apply c82190dd → expect mark 20261114131100

The marks: the commit 900c2149a was made at 11:48 UTC, so the commit-hour value is 20261114130000 (the hour
rounded up, plus one), +100 for each further part; every mark is above the ledger's newest (20261114100000, F1-2
part 5) and the file stamps (20261114113500 … 20261114114600) are below the marks, in the same order.

Third step of the pairing, after the twelve marks read back: regenerate the client types
(`src/integrations/supabase/types.ts`). Eleven doors change `Returns: undefined` to `Json`:
admin_save_translation, admin_machine_translation, admin_save_entity_translation,
admin_machine_entity_translation, admin_set_translation_status, admin_set_entity_translation_status,
admin_set_key_context, admin_set_translator_languages, admin_set_language_flags, admin_upsert_language,
admin_set_language_order. One function is new: `language_code(p_role text) RETURNS text` (service_role only;
the generator lists it whatever its grants). Every other redeclared function keeps its shape (`CREATE OR REPLACE`).

The proofs' first run on a shared database is the staging apply: until then they have run only on the throwaway
local stack (`bun run db:proof --fresh`) and will run on CI's temporary backends on this push.

db:proof: `db:proof PASS — applied 455/455, CLI 2.120.0, cold, 60 s`

pre-stop scan: 7 of 7, 1dd7586c, c0e4a4ff, 607adce0, d7031bb9, a501b0a5, 337ffc64, c2dc755f, 0165890e, a0caf727, 6eff6f7d, fedfce7d, c82190dd

## The files

| # | File | sha256 | Mark | Concern |
|---|---|---|---|---|
| 1 | `20261114113500_1dd7586c-5155-4362-9ac6-c0dc51f5f822.sql` | `d46acbf88bc5b855aaa7e6bf80c5308a41231e7c01a3d41b1cf2839678fe0b96` | 20261114130000 | `language_code` (new) and the interface-text writers: admin_save_translation, admin_machine_translation and their cores |
| 2 | `20261114113600_c0e4a4ff-376e-4a62-ab9a-25d6f2a8a0fb.sql` | `a4d06f59cb8bc4c613dd22db16bc2affc67d1f928faca289456a9df6031518d2` | 20261114130100 | the entity writers: admin_save_entity_translation, admin_machine_entity_translation and their cores |
| 3 | `20261114113700_607adce0-991b-45c1-acef-22f458b534dc.sql` | `fe540f4cebb59133f0e8b465fe6ada002f350b3e327198c23d65d22f0ec61dca` | 20261114130200 | status: admin_set_translation_status, admin_set_entity_translation_status |
| 4 | `20261114113800_d7031bb9-7f2e-4fbb-bf54-6f5e5870ba13.sql` | `b5df11ebaed137e98260711e64bff8273e0b58da1fa4eea23109adbe9ccca025` | 20261114130300 | approve-all: the two doors and their two impls |
| 5 | `20261114113900_a501b0a5-9fcf-43c1-a389-d140de5bdf92.sql` | `286fed1c8db52eae870a15d3bc2ca71c68bea420495099e50f4342ffd03704e5` | 20261114130400 | import and undo: admin_import_translations (dial import_commit), admin_undo_import (dial import_undo) |
| 6 | `20261114114000_337ffc64-88cc-4dc7-91a4-bb8c9c004293.sql` | `1669bcd7b7cd8d1a0f57826b4f1974068c88665055f2c8617dd6ff239340d8d2` | 20261114130500 | keys and translators: admin_sync_ui_keys, admin_set_key_context, admin_set_translator_languages |
| 7 | `20261114114100_c2dc755f-2fd5-4da6-acd2-d9bd4ee5193d.sql` | `19f4bf419a13fe707bce9800a9034850213dfcbe03d2e7614594d4f429462afe` | 20261114130600 | languages: admin_set_language_flags, admin_upsert_language (global, ruling 1 item 1), admin_delete_language, admin_set_language_order and its impl |
| 8 | `20261114114200_0165890e-7570-4489-a6ca-c4799a469b3c.sql` | `118564cd028ec2b7153f911dcc838612580b42353d2caf06bb0a5fc92964f94b` | 20261114130700 | the legal drafts: admin_save_legal_draft, admin_discard_legal_draft, admin_publish_legal_version |
| 9 | `20261114114300_a0caf727-f58a-419d-9480-1ff877dc1e67.sql` | `5c820509d9cefe3c422dd568dca18aec761f031814aa245457c651c9f9f5f968` | 20261114130800 | the legal rows: admin_add_legal_translation, admin_mark_legal_reviewed, admin_export_legal_acceptances (match on `legal_documents.country_code`) |
| 10 | `20261114114400_6eff6f7d-471f-4392-bb50-ae2dd53fa274.sql` | `ad8b9b04f84fdd385559da4493e8c3072e0aef2bd948f7b9232ffc23c2a44860` | 20261114130900 | admin_set_legal_settings, written out whole (ruling 1 item 3) |
| 11 | `20261114114500_fedfce7d-18b0-409e-9ba2-d7f465ce3d2b.sql` | `39d64a6d6862f35c05ed01abded7abfedf074fd919805d383c21d4e256ca689f` | 20261114131000 | the nine translation readers |
| 12 | `20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql` | `daef9ed10259776bafdaf292682775c954b5d0d13e4a8df85bfb3856980d7de3` | 20261114131100 | the six legal readers; `user_has_translation_permission` revoked (D-8) |

Sizes: 31.2, 29.4, 23.4, 24.0, 25.5, 25.3, 31.3, 32.1, 36.2, 25.9, 27.0 and 21.8 KB. The census planned files by
concern (D-1); at about 45–55 KB each they were over rule 30's "about 25 KB", so each is split again by concern into
the twelve above, a body never split. File 9 stays at 36.2 KB: its three doors' whole bodies and their proofs are one
concern (the legal rows), and splitting it would split the export's page proof from its door.

Each file: an `e2e-areas` header (`admin-translations`; file 5 adds `admin-imports`; files 8, 9, 10 and 12
`legal`), a `$pre$` block (the previous mark — file 1 reads 20261114100000 and that `language_code` does not exist
yet and the two translation dials; files 2–12 the previous part's mark — and the live md5 of every body it
redeclares), the whole redeclarations, each door's COMMENT, its closers, one `$proof$` block on scratch rows under a
sentinel rollback, and the mark last.

## Every redeclared body — previous and new md5 (`md5(replace(prosrc, chr(13), ''))`)

| Function | File | Previous md5 | New md5 |
|---|---|---|---|
| language_code(text) | 1 | (new) | asserted by file 1's proof |
| admin_save_translation_core(text,text,text) | 1 | 05ae84291234466d01b27dde965b71af | aedffc40aed2e0f07ffae8b4c65a13a6 |
| admin_machine_translation_core(text,text,text) | 1 | 4baa491f62e3f5d4599e278292c82556 | 81e2d89b7b89c8746aa1d22a04bb53e7 |
| admin_save_translation(text,text,text) | 1 | dfe3fb22da9e7965df47af8754a78163 | 6abd99593724d674b35cfb4abcbb24e4 |
| admin_machine_translation(text,text,text) | 1 | 078c76480929687fa8369518c556f990 | f4d4637aac17e1c5bac162fe8723c077 |
| admin_save_entity_translation_core(text,uuid,text,text,text) | 2 | 66c953cd0ef9f4c53d194a525342bc4c | 2a931fe0328dc630c657d52ab3b99d5e |
| admin_machine_entity_translation_core(text,uuid,text,text,text) | 2 | 99dd2893c7d979f9a0703dcf6272a8ee | 2fa9342262182b06b4747da06bb76bc5 |
| admin_save_entity_translation(text,uuid,text,text,text) | 2 | 7fed0cc8b27463facfb0c4ba412dc9fa | 35979e378d3440271844b3a2b2267726 |
| admin_machine_entity_translation(text,uuid,text,text,text) | 2 | 8202e632832fcfba35e6b22053c65328 | eabe7f068cf5710ebb1cfb62ebe05050 |
| admin_set_translation_status(text,text,text) | 3 | 6f430f356cd353f02cdddbf8656d16fb | 7b1cb2095a22b839276e83af65314bc0 |
| admin_set_entity_translation_status(text,uuid,text,text,text) | 3 | d14d2fdc386d554002d6f25791c2a4c0 | c8bb2c5dd06997bac73d4db520470931 |
| admin_approve_all_translations(text) | 4 | e5831ae1657d8279970b49e8232e9394 | 22d02c3e88079eef90b0bd9f95efc5bd |
| admin_approve_all_entity_translations(text) | 4 | dbd476290f459afaffdc6f16f05ee8ca | fe7769aef5c96edd6426c08c896cda20 |
| approve_all_translations_impl(text) | 4 | b6654d89a6a21953267dad2fafeeaf5d | 34eae52826ecc67f15ab82db256a827e |
| approve_all_entity_translations_impl(text) | 4 | c868b270737586931dd5bb59eb987822 | 22eadb3c700c5ad8a305be3d778c4381 |
| admin_import_translations(text,jsonb) | 5 | 1a043985654770be62cdf12358c7b269 | 5ab86adfc00ce78217add81b565380de |
| admin_undo_import(uuid) | 5 | 9f49201faa7c3284707c3e51a41b9f40 | 37891ecd7a6c1c63dca4ae2d1c369dd0 |
| admin_sync_ui_keys(jsonb,jsonb) | 6 | f45a0dae70eb71b3458d6c4be445f7ab | 82ce774ba1e27217c63921ff09e4a86d |
| admin_set_key_context(text,text) | 6 | 9cc2dcf68408c39139a77e28e911f93a | 501894bc242cc6beec55c7bd74e5cc86 |
| admin_set_translator_languages(uuid,text[]) | 6 | 89ed6c228c5d95d252b44c5b730d20fd | e4986105eca53d8dca258a7938cb5dee |
| admin_set_language_flags(text,boolean,boolean) | 7 | 7fd039e6acd98c3192c8b5524c5a3eb5 | ab7993b06e8f156b6bd4599322bf1d9d |
| admin_upsert_language(text,text,text,boolean,text[]) | 7 | e5f0383974332ee98bd1e4b7da8fdeb1 | b1304a766a88f64b00822b93f7017876 |
| admin_delete_language(text) | 7 | 4270f579415c587bf64505d7b5dc4b4e | e0b17f0abad66980849d14f497f2bedb |
| admin_set_language_order(text[]) | 7 | 2cee1d7fcc888468bca66e73c523e2ba | df9fdf14a3f1dc05e84da2275b9e73bc |
| set_language_order_impl(text[]) | 7 | 56ab6d2e38647d1e45c7e729d0293d50 | cb7d4f1c45b93b483551842b74c20f1f |
| admin_save_legal_draft(text,character,text,text,text,text,jsonb) | 8 | baf0a1bb63062668a0335b1f9647db0f | cb68d37406f87ffcfe46d0c675a6dbe8 |
| admin_discard_legal_draft(uuid) | 8 | d2e79240e6784b25781c9c6cdc6dfd99 | 6290b36d609eea4ccefc6c770d3ea437 |
| admin_publish_legal_version(uuid,boolean,timestamptz) | 8 | 61baef330e15b4f8fc829e0f519a22e0 | 25c0ccef4d171c47212d3f12265a0f4a |
| admin_add_legal_translation(uuid,text,text) | 9 | dcc64aace95421a2ee96b27af948b744 | 074a321525e6a6eef0da4888282e6847 |
| admin_mark_legal_reviewed(uuid,text) | 9 | 390bb8aaa7135d8808845d562c9fa0fe | 9a80c828651a2a0d189e95b68f1d53da |
| admin_export_legal_acceptances(uuid,timestamptz,uuid,integer) | 9 | 628e71d63aef14abf983de2e330d7b82 | ab4feb71a682d3caf98c37f54170a5f7 |
| admin_set_legal_settings(jsonb) | 10 | cf9f949f3122bb41efec8a8993a9a8b4 | ca3ed7fac797ae2a78e4320ec02ebcdc |
| admin_list_translations(text,text,boolean,text,integer,integer,boolean) | 11 | 882c6e623d38124c7c8179956f132a76 | b1b67b4d8589cf6df88a3c5b930cafd7 |
| admin_translation_stats(text) | 11 | 4021e145e95e5954635564944cc8eade | 4ced09a1557c7ceaf20b52b216326507 |
| admin_list_translation_revisions(text,text,integer) | 11 | e7472929223744af768e65cf89e7d0b3 | 63f3b46ab4074162471db1255c1a0f3c |
| admin_export_translations(text,text,integer) | 11 | 308dda363dd2a19c7bc9856a52463d9b | 1295522d513b527064c41d758cadfd7b |
| admin_list_entity_translations(text,text,text,integer,integer) | 11 | 0c8841fd4ed3f933b6a0936c875d01de | efdd33f153ee14cf3e83e86aea13e31b |
| admin_entity_translation_stats(text) | 11 | 15242eeb983391385e39cbd99c9ff566 | 3edca765531b315e4794a4c591edce3d |
| admin_list_languages() | 11 | 273f4db5d774f239b7bbf68dab74b8b3 | 73cf6ce46ae354b2d0e2e54fafed9d5b |
| admin_language_delete_preview(text) | 11 | eab7ddcfd4236f42c50bf7266e1749b9 | 24927e8ace52480ccff29ed2300264ba |
| admin_get_translator_scope(uuid) | 11 | ed9a9dc89de1c3d273cf76f936d6a9a9 | 359117388d1182dc2729180bc1bbf2cc |
| admin_legal_documents() | 12 | 2c888cc34f8d72b5749d05bd87755378 | bbe23b21d66be2fd09a33d628029d744 |
| admin_legal_version(uuid) | 12 | 3c3ca58a5432ef2867639eafcccada65 | 13e24935339f7ecf462716e64ad5bbc6 |
| admin_legal_settings() | 12 | 2d59432c2527e7429d99ba293655f3b1 | 9113cb9b2c96217d2479042b5e66a233 |
| legal_review_overdue() | 12 | f76983a0bfe12e3ae5a7289dd7a3d37c | 355639b6e6d810f078e9e56e82432453 |
| admin_user_legal_history(uuid) | 12 | 37ff6b882a31735bf2f1ba18ad33456d | d4f32debd3e4e6b1d7e970018de71d21 |
| base_languages() | 12 | 973e515da2826cb33ca4f3d339bb70e8 | 4b8a0ab32c1d68f85622d0dfe52a140d |

Each previous md5 is the pre-check's value (the live body must carry it or the file refuses to apply); each new md5
is asserted by the file's own proof (a) against the body it just declared. Every body is written out whole from its
last declaration, generated by script and guarded by md5 (DEC-383's wording in ruling 1 item 7) — admin_import_translations
and admin_undo_import included, which were declared by computed insertion until now; the static door check reads
written-out declarations, so `scripts/conformance/migration-reader.test.ts` (in scope by ruling 1 item 2) drops both
names from its list of computed declarations.

## Each dropped and re-created function, with its grants

The eleven doors returned `void`, which cannot carry the shell's answer, so each is `DROP FUNCTION` + `CREATE
FUNCTION … RETURNS jsonb` (`{ok:true}` on success), the same argument list and defaults, then restated:

```
REVOKE ALL ON FUNCTION public.<name>(<args>) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.<name>(<args>) TO authenticated;
GRANT ALL ON FUNCTION public.<name>(<args>) TO service_role;
```

for: admin_save_translation(text, text, text) and admin_machine_translation(text, text, text) (file 1);
admin_save_entity_translation(text, uuid, text, text, text) and admin_machine_entity_translation(text, uuid, text,
text, text) (file 2); admin_set_translation_status(text, text, text) and admin_set_entity_translation_status(text,
uuid, text, text, text) (file 3); admin_set_key_context(text, text) and admin_set_translator_languages(uuid, text[])
(file 6); admin_set_language_flags(text, boolean, boolean), admin_upsert_language(text, text, text, boolean, text[])
and admin_set_language_order(text[]) (file 7). Each proof (a) asserts SECURITY DEFINER, VOLATILE,
`search_path=public`, RETURNS jsonb, no PUBLIC or anon EXECUTE, and EXECUTE for authenticated and service_role.

Every other function is `CREATE OR REPLACE` (same shape; its ACL carries over) with its REVOKE restated for the
born-closed guard: the doors and readers `FROM PUBLIC, anon` with EXECUTE for authenticated kept; the four writer
cores `FROM PUBLIC, anon, authenticated` (they stay closed to browser roles); the two approve impls and
set_language_order_impl as before. `language_code(text)` is born closed: `REVOKE ALL … FROM PUBLIC, anon,
authenticated; GRANT ALL … TO service_role`. File 12 adds `REVOKE ALL ON FUNCTION
public.user_has_translation_permission(uuid) FROM PUBLIC, anon, authenticated;` (D-8: no caller), so its manifest
line and its `grant-without-caller` line in `scripts/doors/check-doors-allowlist.txt` leave in the same commit.

`scripts/public-surface-allowlist.txt` gains ten `restated grant (not a new surface)` lines, the ones the guard's own
census named (admin_set_translation_status, admin_set_entity_translation_status, admin_approve_all_translations,
admin_approve_all_entity_translations, admin_undo_import, admin_set_key_context, admin_set_translator_languages,
admin_delete_language, admin_set_language_flags, admin_set_language_order); the others already had theirs.
`scripts/doors/manifest.txt`: the family's codes cells move from `-` to the codes their bodies refuse (the judge pairs
the cell with the body's `door_refuse` literals, so the cells change in the migration's commit), plus ruling 1's
corrections — admin_upsert_language `global` with its reason, the three legal `row:legal_documents.country_code`
cells, the import and undo dials `import_commit` and `import_undo`. `scripts/acceptance-doors-allowlist.txt` needs no
change: every family door keeps its signature, and CI's smoke lane judges it live.

## The codes (no new or changed string key)

Every new or changed string key with its English: **none**. The doors refuse codes; the client turn (STEP 3) maps
them to the family's existing keys through `readRefusal` (D-4).

Codes reused (already declared by other families): badValue (details: account_keep_months, action, after, body,
code, copyright_agent, country, email, en, field, governing_law, items, kind, legal_phone, limit, material, note,
operator_address, operator_details, operator_name, providers, security_email, settings, texts, and the settings key
read from the input), nameRequired, required (batch, value), unknownUser. New codes: badLanguage, baseLanguage,
baseLocked, bothLanguages, catalogEmpty, changelogRequired, factMissing (the fact's name), labelRequired, labelTaken,
languagePublished, notDraft, notFullyApproved (the count), notPublished, nothingToReview, noticeTooShort,
pseudoLanguage, tooLong (context), tooManyRows, translationExists, translationFlagged, unknownBatch, unknownFact (the
token), unknownKey, unknownTranslation, unknownVersion, unknownEntity, emptyList, and the gate-shaped
`permissionDenied:language` (ruling 1 item 4(b); `door_refused` counts no dial for it). Gate codes from door_context:
notSignedIn, accountDeactivated, permissionDenied, permissionDenied:scope, stepUpRequired.

## The proofs (each file)

(a) catalog facts and the md5 of every body (file 1 also reads `language_code`'s three answers and an unknown role
raising, under an inline K4 exception); (b) the gates of files 1–10 — a deactivated account →
accountDeactivated, a caller without the permission → permissionDenied, neither spending the dial nor writing (no
caller is the readers' case, files 11 and 12); files 8 and 9 also a country holder of the legal permission refused
another country's document `permissionDenied:scope` and served on its own, file 10 a country holder refused the
global settings `permissionDenied:scope`; (c) every code of every door with each earlier check cleared, the exact message and status 400,
nothing written or audited, each success with its row, audit line and answer, the dial counted once per call past the
gates and `door_refusals` metered. Calls past the gates and refusals metered, by file: 1 — staff_translation 3,
staff_machine_translation 3, refusals 5 and 4; 2 — 5 and 3, refusals 5 and 6; 3 — staff_config 8, refusals 5 and 6;
4 — staff_config 6 (the approve-all answers `{"approved":2,"skipped_flagged":1}` and `{"approved":2}`), refusals 5 and
4; 5 — import_commit 4, import_undo 3, refusals 5 and 5; 6 — staff_config 7, refusals 5 and 5; 7 — staff_config 13,
refusals 5 and 10; 8 — staff_config 24, refusals 6 and 17, the country holder 1; 9 — staff_config 12, legal_export
3 → 4 → 5 with its audit lines 1 → 2 (the first page and a later page each count once and write one line naming the
page's cursor and its row count; ruling 1 item 4(a)), refusals 8 and 13, the country holder staff_config 2 and
legal_export 1; 10 — staff_config 8, refusals 3 and 8, the settings row unchanged and no audit line after every
refusal; 11 and 12 — every reader refuses no caller (notSignedIn) and a person without the permission
(permissionDenied) and answers its holder (readers take no dial; the proofs do not read one).

Guard lines (`bash scripts/check-migrations.sh`, exit 0):

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Spanning-literal guard OK (floor 20261109000000).
Migration guard OK.
```

`bun scripts/doors/check-doors.ts`: `check-doors self-test OK: 7 finding kinds fired on their planted fixtures, the
clean pair fired nothing` and `check-doors static OK: 264 manifest lines reconcile with the migrations' catalogue`.
`bun run typecheck` and `bun run lint` exit 0. `bunx vitest run scripts --maxWorkers=2`: 119 files, 616 passed,
1 skipped.

## Decisions taken in the files (for the ruling)

1. Twelve files by concern instead of the census's four (D-1), each with its own mark, proofs and pre-check chain;
   file 9 stays at 36.2 KB (above).
2. Rule 30's departure by ruling 1 item 3 (admin_set_legal_settings written out whole, own file 10) is applied to
   every redeclared body, as DEC-383's text in the same ruling words it; admin_import_translations and
   admin_undo_import leave the computed-declaration list of `migration-reader.test.ts`.
3. Codes a proof cannot reach on a real schema, named rather than weakened: `catalogEmpty` (the proof's own base and
   pair rows make no catalogue empty) and `labelRequired` on publish (the table's CHECK holds every stored label to
   1–60, so a draft without one cannot be built); both are proven present in the body by the manifest's codes cell.
   The whole-table doors (admin_sync_ui_keys, admin_set_language_order, admin_set_legal_settings) are proven on their
   refusals only: rule 30 forbids a proof to call a whole-table statement's live wrapper.
4. Two literals that look like language codes remain in redeclared bodies: admin_sync_ui_keys refuses
   `badValue:en`, where `en` names its argument `p_en`, not a language; admin_set_language_flags keeps an existing
   comment naming the pseudo language's code. Every executable language code in the family now reads
   `language_code(…)`.
5. `legal_review_overdue()` takes the staff-reader gate (D-6): a person's call is now refused instead of answering
   `false` (LGA-17 `:859`, below).
6. The writer cores keep raising through `door_refuse`; their doors are the shell, so a core's refusal reaches the
   client in the door's answer and a `permissionDenied:language` spends no dial (ruling 1 item 4(b)).

## The question (ruling 1 item 5)

Item 5's guard (a `row:<table.column>` cell must name a column the migrations declare) is built in scratch and lists
the migrations' columns reliably (801 columns from `CREATE TABLE` and `ALTER TABLE … ADD COLUMN`). With item 4(d)'s
three legal cells fixed, it still fails one line, outside this family and outside my scope ("the manifest's lines of
this family"): `admin_end_package_price(uuid,timestamp with time zone)` names `row:package_prices.country`, and the
table's column is `package_prices.country_code` (the F1-6 family's doors). Which of these should the guard land with
in STEP 4: the one cell corrected in this turn (scope widened to that manifest line), or an allowlist line
`key | reason | until` naming F1-6, or the roadmap line item 5 allows instead of the guard?

## Expected CI reds on this push (until STEPS 3–4)

The pull request's CI builds its temporary backends from every migration, so the shell's answers are live there
while the client and the tests still read sentences and `error`:

- the refusal-reading test ids: LG-2 (`e2e/legal-doors.spec.ts:285`, `:291`), LG-6 (`:709`, `:714`), LG-7 (`:814`),
  LG-9 (`:915`, `:920` — the service role now passes the readers; `:930`, `:934`), LG-24 (`:1280`), LGA-16
  (`e2e/legal-admin.spec.ts:783`), LGA-17 (`:859`), TR-6 (`e2e/admin-translations-console.spec.ts:281`, `:291`),
  TR-42 (`e2e/admin-translations-data.spec.ts:790`, `:828`);
- every family flow that reads a refusal from `error` on the eleven doors that now answer `{ok:false}` in their
  data, and the two route tables of sentences (`IMPORT_REFUSALS`, `src/server/imports/route.ts:53`; `WRITER_REASONS`,
  `src/routes/api/translate.ts`), until STEP 3;
- LGA-13 if its export spans more than one page before the client asks pages of 5000 (STEP 3);
- the preflight job's "STAGING BEHIND" until ethio-staging holds mark 20261114131100.

## Scratch

`/tmp/ethio-scratch/f1-doors-3/` (the operator's to remove): the previous bodies, the generator, the proofs, the
assembler, the manifest edit, the parked column guard, and the db:proof, check-migrations and script-law logs.
