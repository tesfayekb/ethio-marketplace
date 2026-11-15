# f1-doors-4a — the census (STEP 1)

Base: dev 1350b00db (the merge of pull request #44); the lane began from `origin/dev` 1350b00db, so `<BASE>` and
`<HEAD>` are equal. Every reading below is of that tree.

How each reading was made (scratch tools under `/tmp/ethio-scratch/f1-doors-4a/`):

- **Bodies** — the last literal declaration of each function by a scratch reader over `scripts/doors/catalogue.ts`
  (`census.ts`, `one.ts`); the four import doors' LIVE bodies rebuilt from their computed declarations
  (`m6c.ts`: the literal body plus the INC-951 3c dial block inserted after its step-up line).
- **md5 on the local proof stack** — a scratch probe migration (never committed, removed after the run) made
  `bun run db:proof --fresh` raise `md5(replace(prosrc, chr(13), ''))` and the length of every function of the
  family, its helpers, cores and planners (62 functions). 61 of the 62 equal the md5 of the text between the dollar
  tags of the file this census names (the four computed import doors equal their rebuilt live text). The one that
  differs is `attr_import_plan`, whose live body is assembled at run time (COMPUTED_BY_HAND): stack md5
  `7a2cb3062a843c2d16ce1b5be5be90ef`, 66,916 bytes. This turn does not redeclare it.
- **Callers** — every `rpc("<name>"` / quoted name under `src/`, `e2e/`, `scripts/` (`callers.txt`, 98 hits); SQL
  callers by a scan of every function's last body and every policy, trigger and view (`sql-callers.ts`).

## consumers

"Gates today" is the body; "line" is `scripts/doors/manifest.txt` (line number). Every door of the family today:
`has_permission(auth.uid(), 'categories', <action>)` then `require_step_up_if_needed('categories', <action>)` (except
`admin_reorder_categories`, C2h), sentences or console keys by plain `RAISE`; none calls `door_context`, none has the
shell, every codes cell is `-`. "→ gate" means the sentence is answered by `door_context` (permissionDenied; stepUp
P0009 kept; rateLimited). A code marked **new** does not exist in the repository today (`door-codes.ts`, the landed
manifest codes cells); the others exist and are reused. Every code is a literal `door_refuse('<code>'`, so the judge
reads it; a helper's finite reasons are mapped to literals by `IF`/`CASE`.

### The category doors

| Door (live: file :line, md5) | Gates today → line | Returns | Sentence or key → code (detail) | Callers (what they read) |
|---|---|---|---|---|
| `admin_create_category(text,text,text,uuid,boolean,boolean,integer,timestamptz,timestamptz)` 20261029001111 :108, acd25c60bb2f04cba651d32cb67d8346 | permission create + step-up + `rate_gate('staff_config')` → `_core` → line 29: categories:create, row, staff_config, global | uuid → **jsonb** `{ok:true, id}` | 'permission denied' → gate; its core's (below) | `categories-service.ts:112` (`data` as the new id; error) |
| `admin_create_category_core(…)` 20261029001111 :60, md5 by stack in `probe-md5.txt` | its own permission + step-up (D1 M6a), no browser role | uuid (kept) | 'permission denied' → `permissionDenied`; `admin.categories.error.slugTaken` → **slugTaken**; `assert_parent_not_catchall` → `catchallParent` | the door; `admin_commit_category_import`, `admin_undo_category_import` |
| `admin_update_category(uuid,text,text,integer,boolean,boolean,integer)` 20260903025501 :276, md5 stack = file | permission update + step-up, no dial → line 142: categories:update, row, staff_config | void → **jsonb** `{ok:true}` | 'category not found' → **unknownCategory** | `categories-service.ts:138` (error); both category import doors (PERFORM) |
| `admin_delete_category(uuid,text)` 20261007033719 :161 | permission restructure + step-up, no dial → line 32: categories:restructure, row, staff_config | void → **jsonb** | 'category not found' → unknownCategory; `admin.categories.error.delete_active` → **deleteActive**; `…delete_slug_mismatch` → **deleteSlugMismatch**; `…delete_has_listings:%` → **deleteHasListings** (count); `…delete_has_children:%` → **deleteHasChildren** (count) | `categories-service.ts:342`; both category imports (PERFORM) |
| `admin_retire_category(uuid,uuid)` 20260903025501 :393 | restructure + step-up, no dial → line 100 | void → **jsonb** | not found → unknownCategory; `admin.categories.error.reassign_required` → **reassignRequired**; `…reassign_target_invalid` → **reassignTargetInvalid** | `categories-service.ts:178`; both category imports |
| `admin_reactivate_category(uuid)` 20260903052438 :26 | restructure + step-up, no dial → line 96 | void → **jsonb** | not found → unknownCategory; `admin.categories.error.already_active` → **alreadyActive** | `categories-service.ts:337`; both category imports |
| `admin_reorder_categories(uuid,uuid[])` 20260903073853 :16 | permission update only (C2h: no step-up), no dial → line 98: categories:update, **none:C2h**, staff_config | void → **jsonb** | 'permission denied' → gate (no other raise) | `categories-service.ts:251`; both category imports |
| `admin_set_category_window(uuid,timestamptz,timestamptz)` 20260903025501 :319 | update + step-up, no dial → line 116 | void → **jsonb** | not found → unknownCategory; 'invalid visibility window' (until ≤ from) → `badValue` (detail `visible_until`) | `categories-service.ts:155`; both category imports |
| `admin_set_country_exclusions(uuid,text[])` 20261029001111 :161 | update + step-up + `rate_gate('staff_config')` → `_core` → line 118 | void → **jsonb** | gate; its core's | `categories-service.ts:167` |
| `admin_set_country_exclusions_core(uuid,text[])` 20261029001111 :127 | own permission + step-up, no browser role | void (kept) | 'permission denied' → permissionDenied; 'category not found' → unknownCategory | the door; both category imports |
| `admin_add_category_pointer(uuid,uuid)` 20261029001111 :41 | restructure + step-up + `rate_gate('staff_config')` → `_core` → line 14 | uuid → **jsonb** `{ok:true, id}` | gate; its core's | `categories-service.ts:189` (error) |
| `admin_add_category_pointer_core(uuid,uuid)` 20261029001111 :14 | own permission + step-up | uuid (kept) | 'permission denied' → permissionDenied; `catchallParent` (helper) | the door; both category imports |
| `admin_move_category_pointer(uuid,uuid)` 20260928002133 :159 | restructure + step-up, no dial → line 85 | void → **jsonb** | 'pointer not found' → **unknownPointer**; `catchallParent` (helper) | `categories-service.ts:227`; both category imports |
| `admin_remove_category_pointer(uuid)` 20260928002133 :257 | restructure + step-up, no dial → line 97: …, **staff_moderation** | void → **jsonb** | 'pointer not found' → unknownPointer | `categories-service.ts:241`; both category imports |
| `admin_set_primary_pointer(uuid)` 20260928002133 :213 | restructure + step-up, no dial → line 129 | void → **jsonb** | 'pointer not found' → unknownPointer; 'parent not active' → **parentInactive** | `categories-service.ts:236` |
| `admin_set_category_images(uuid,text,text,text,text)` 20260904050152 :55 | assets + step-up, no dial → line 115 | void → **jsonb** | 'category not found' → unknownCategory | `category-images-service.ts:153` (error; `null as unknown as string` casts, INC-942); `e2e/category-image-routes.spec.ts:189` (CI-4b: error null) |
| `admin_accept_category_image(uuid)` 20260904050152 :10 | assets + step-up, no dial → line 13 | timestamptz → **jsonb** `{ok:true, accepted_at}` | 'category not found' → unknownCategory; `admin.categories.error.acceptNoImage` (P0011) → **acceptNoImage** | `category-images-service.ts:214` (`data` as the stamp); `e2e/category-image-routes.spec.ts:207` (CI-4b: `accepted` not null) |
| `assert_parent_not_catchall(uuid)` 20260903064413 :10 (helper line 151, authenticated, invoker-chain) | none (a check) | void | `admin.categories.error.catchallParent` → **catchallParent** | SQL: move door, add-pointer core, create core; `e2e/admin-categories-lifecycle.spec.ts:249` (CT-14, service role: the message) |

### The attribute doors

| Door (live: file :line) | Gates today → line | Returns | Sentence or key → code (detail) | Callers (what they read) |
|---|---|---|---|---|
| `admin_upsert_attribute(uuid,text,…,text)` 20261029013346 :93, 0a8ecf076448436e9e8e713a74fe44ec | update + step-up + `rate_gate('staff_config')` → line 145 | uuid → **jsonb** `{ok:true, id}` | `admin.attributes.error.keyRequired` → `required` (detail `attr_key`); `…keyTaken` → `duplicateKey`; `…notFound` → **unknownAttribute**; `…dependsUnknown:k`, `dependsNotSelect:k`, `dependsSelf`, `dependsCycle:k`, `parentWithoutDepends:v`, `parentNotInParent:v`, `badCell:msg`, `badOption:msg`, `boundsTargetNotNumber:a\|b`, `boundsTargetNotColinked:a\|b` → the same names as codes (**new**, detail kept); `attr_allowed_check`'s reasons (dynamic `'admin.attributes.error.%:%'`) → a literal CASE over **allowedTargetCircular**, **allowedTargetNotSelect**, **allowedTargetNotColinked**, **allowedUnknownValue** (detail kept) | `attributes-service.ts:291` (`data` as id; `null as unknown` casts :300 :303); AT-33/34 (`e2e/admin-attributes-editor.spec.ts:306-409`), AT-14 (`…library.spec.ts:836`) |
| `admin_delete_attribute(uuid,text)` 20260908041703 :153 | restructure + step-up, no dial → line 31 | void → **jsonb** | notFound → unknownAttribute; `…confirmMismatch` → **confirmMismatch**; `…deleteHasDependents:<keys>` → **deleteHasDependents**; `…deleteHasLinks:n` → **deleteHasLinks** | `attributes-service.ts:318`; AT-33 (`…editor.spec.ts:355`), AT-14 (`…library.spec.ts:851`) |
| `admin_merge_attributes(uuid,uuid[])` 20261007033719 :88 | restructure + step-up, no dial → line 84 | jsonb (counts; kept, no DROP) | `…mergeAcrossDependency:<keys>` → **mergeAcrossDependency**; `…mergeHasHolders:n` → **mergeHasHolders**; its impl's | `attributes-service.ts:335` |
| `merge_attributes_impl(uuid,uuid[])` 20260906043420 :211 (no browser role) | none | jsonb | notFound → unknownAttribute; `…mergeNoSources` → **mergeNoSources**; `…mergeTargetInSources` → **mergeTargetInSources** | the merge door only |
| `admin_link_attribute(uuid,uuid,boolean,boolean,integer,text[],jsonb,jsonb)` 20261029013346 :16 | update + step-up + `rate_gate('staff_config')` → line 58 | uuid → **jsonb** `{ok:true, id}` | `admin.categories.error.notFound` → unknownCategory; `admin.attributes.error.notFound` → unknownAttribute; `…alreadyLinked` → **alreadyLinked**; `attr_link_cells_refusal`'s answers → CASE: **badAllowedOption**, **badDefault**, **badVisibleWhen** (detail kept), its notFound → unknownAttribute; `priceBasisDuplicate: %` → **priceBasisDuplicate** (detail) | `attributes-service.ts:430` (`data` as id; casts :436 :463-:468 are the update call's); AT-14 (`…library.spec.ts:844`), `…import.spec.ts:1138/1146` (error null) |
| `admin_update_attribute_link(uuid,boolean,boolean,text[],jsonb,jsonb,text[])` 20260919134523 :702 | update + step-up, no dial → line 141 | void → **jsonb** | `badClearCell:%` → **badClearCell**; notFound → **unknownLink**; the cells' codes as above | `attributes-service.ts:461`; AT-42 (`…links.spec.ts:601`, error null) |
| `admin_unlink_attribute(uuid)` 20260908041703 :197 | update + step-up, no dial → line 140 | void → **jsonb** | `…linkNotFound` → unknownLink; `…unlinkHasDependents:<keys>` → **unlinkHasDependents** | `attributes-service.ts:502` |
| `admin_set_card_attributes(uuid,uuid[])` 20260911223202 :842 | update + step-up, no dial → line 114 | void → **jsonb** | `…cardLimit` → **cardLimit**; `…linkNotFound` → unknownLink; `…rankInherited` + DETAIL → **rankInherited** (detail `category=<id> rank=<n> attribute=<key> inherited_from=<slug> inherited_attribute=<key>`, the DETAIL moved into the tail) | `attributes-service.ts:521`; AT-46 (`…import.spec.ts:1003/1008`), AT-19 (`…library.spec.ts:1273`) |
| `admin_set_fact_attributes(uuid,uuid[])` 20261017091410 :277 | update + step-up, no dial → line 121 | void → **jsonb** | `…factLimit` → **factLimit**; `…linkNotFound` → unknownLink | `attributes-service.ts:510` |
| `admin_set_attribute_link_order(uuid,uuid[])` 20260906043646 :7 | update + step-up, no dial → line 113 | void → **jsonb** | `…orderMismatch` → **orderMismatch** | `attributes-service.ts:554`; AT-19 (`…library.spec.ts:1269`) |

### The imports and the rebuild

| Door (live) | Gates today → line | Returns | Sentence → code | Callers |
|---|---|---|---|---|
| `admin_commit_category_import(jsonb,text,text)` literal 20261029001111 :180 + computed 20261029022748; live md5 c94a815cb615b4fe32270642423c6815 (15,331 B) | import + step-up + `rate_gate('import_commit')` → line 27: …, **staff_config** | jsonb (kept) | 'permission denied' → gate; 'import already running' → **importRunning**; `unknownParent: %` → `unknownParent` (detail the slug; today's relay key row); the planner's 'unknown category scope' — kept (decision 4); the cores' and `admin_save_entity_translation_core`'s codes pass through the shell | `src/routes/api/admin/categories/import.ts:21` via the relay; `route.test.ts` (IMR) |
| `admin_undo_category_import(uuid)` literal 20261029001111 :514 + computed 20261029024207; live 9a2f2192ba818430a5b979c2ae94dd84 (11,626 B) | import + step-up + `rate_gate('import_undo')` → line 136: …, **staff_config**, audit `entity_translation.undo_restore` | jsonb (kept) | 'unknown import batch' → `unknownBatch` | `categories/import.ts:22` |
| `admin_commit_attribute_import(jsonb,jsonb,text,text)` literal 20261028235443 :700 + computed 20261029024340; live 2872c54d63664ce53df08c44183be3b1 (18,939 B) | import + step-up + `rate_gate('import_commit')` → line 26: …, **staff_config** | jsonb (kept) | 'permission denied' → gate; 'import already running' → importRunning; planner sentence kept (decision 4) | `attributes/import.ts:18` |
| `admin_undo_attribute_import(uuid)` literal 20261017093325 :30 + computed 20261029024420; live 301fb4da41a13aff94df86ba2739b5c2 (13,133 B) | import + step-up + `rate_gate('import_undo')` → line 135: …, **staff_config**, audit `entity_translation.undo_remove` | jsonb (kept) | 'batch id required' → `required` (detail `batch`, F1-3's form); 'unknown import batch' → unknownBatch | `attributes/import.ts:19` |
| `catalog_find_rebuild()` 20260924104238 :71, ebd2e9cb25c2c13e0b0f9b0853deb016 | `has_permission` import OR update OR translations:update, no step-up, no dial → line 178: categories:import, row, staff_config | integer → **jsonb** `{ok:true, entries}` | 'permissionDenied' (42501) → gate | `e2e/helpers/posting.ts:172` (service role; error only) — no `src/` caller, no SQL caller |

The two category imports PERFORM eight doors of the family directly (update, delete, retire, reactivate, reorder,
window, move pointer, remove pointer) and call the three D1 M6a cores and F1-3's
`admin_save_entity_translation_core`. No import body catches an exception. No other SQL caller reaches a door of the
family; no reader has an SQL caller.

### The readers (the reader form; no shell)

Every reader today: `has_permission(view | assets | import | update)` raising 'permission denied'; becomes
`PERFORM public.door_context('staff-reader', 'categories', '<action>', NULL, NULL, 'global');` (F1-3's form;
'permission denied' → `permissionDenied`). Return types kept, no DROP.

| Reader (line) | Action | Callers |
|---|---|---|
| `admin_list_categories()` (63) | view | `categories-service.ts:61` |
| `admin_list_category_pointers(uuid)` (65) | view | `categories-service.ts:209` |
| `admin_list_category_attribute_links(uuid)` (64) | view | `attributes-service.ts:382`; `…import.spec.ts:1157` |
| `admin_list_effective_category_links(uuid)` (67) | view | `attributes-service.ts:650`; `…import.spec.ts:1160` |
| `admin_list_attributes()` (61) | view | `attributes-service.ts:182` |
| `admin_list_attribute_categories()` (60) | view | `attributes-service.ts:589` |
| `admin_attribute_holders(uuid,uuid,text)` (21) | view | `attributes-service.ts:480` |
| `admin_attribute_option_coverage()` (22) | update | `attributes-service.ts:225` |
| `admin_get_category_images(uuid)` (47) | assets | `category-images-service.ts:233`; CI-4b |
| `admin_export_categories(text)` (43) | view (+ 'unknown category scope' kept) | `src/routes/api/admin/categories/export.ts:35` (`p_scope: scope as unknown as string`, :36) |
| `admin_export_attributes(text)` (42) | view (+ `attr_export_payload`'s scope sentence kept) | `attributes/export.ts:40` |
| `admin_export_attributes()` (41) | see definition | `attributes/export.ts:41` |
| `admin_preview_category_import(jsonb,text)` (93) | import | `categories/import.ts:20` |
| `admin_preview_attribute_import(jsonb,jsonb,text)` (92) | import | `attributes/import.ts:17` |

## decisions named (numbered at the migration stop)

1. **The eight doors the category imports call split into door + closed core** (D1 M6a's pattern, as F1-3 did
   for the translation doors): `admin_update_category_core`, `admin_delete_category_core`,
   `admin_retire_category_core`, `admin_reactivate_category_core`, `admin_reorder_categories_core`,
   `admin_set_category_window_core`, `admin_move_category_pointer_core`, `admin_remove_category_pointer_core` —
   SECURITY INVOKER, REVOKE ALL FROM PUBLIC, anon, authenticated, service_role (as the three M6a cores), each keeping
   its door's own permission and step-up check (refusing `permissionDenied` by `door_refuse`) and every refusal as
   a literal code. The door is `door_context` + the core + `{ok:true}` + the shell; the two category imports call
   the cores. Why: a door on the shell RETURNS its refusal (and sets the response status) instead of raising, so an
   import that PERFORMed it would discard the refusal and apply the rest of a refused file; and every row would
   spend the door's dial. The three M6a cores and `assert_parent_not_catchall` move to `door_refuse` codes.
   A core-split door's codes cell is `-` (its codes are its core's), as F1-3's `admin_save_translation` line is.
2. **Dial cells** (cell-meaning below): the four import cells become the dials the bodies spend; every other door
   spends its line's `staff_config`; `admin_remove_category_pointer` is proposed `staff_config` (alternative: keep
   `staff_moderation` under DEC-380's exit rule).
3. **`admin_reorder_categories` keeps `none:C2h` through the row**: `door_context` has no step-up opt-out; it asks
   `require_step_up_if_needed('categories', 'update')`, and `categories:update`'s `requires_step_up` is false
   (20260903025501 :80-88; no later migration flips it outside a rolled-back proof), so no step-up is asked, as
   today. A future flip of that row would make reorder ask step-up with every other update door.
4. **The planners' 'unknown category scope' stays a sentence this turn** (`cat_import_plan`, `attr_import_plan`,
   service role only; `attr_export_payload`, helper line 162). The shell catches only P0D01, so the sentence still
   reaches the relay's row (404) and `exportRefusal` unchanged. Turning it into a code means rewriting two planners
   outside the family's definition, one of them the 66,916-byte body assembled at run time (COMPUTED_BY_HAND).
   The relay row `unknown category scope` and `exportRefusal(error, "unknown category scope")` stay; queued to F1-7.
5. **No new string key.** Each code with words today maps to its existing key in the family's `RefusalFamily`
   (STEP 3); a code with no key today (unknownCategory, unknownPointer, unknownLink, alreadyActive,
   reassignTargetInvalid, slugTaken, parentInactive, importRunning, badAllowedOption, badDefault, badVisibleWhen,
   priceBasisDuplicate, badClearCell) reads as the screen's generic line. Today those print raw text (a sentence or
   a bare code); `reassignRequired` gains its words (the door raised `reassign_required`, the key is
   `reassignRequired`).
6. **Return types**: every void door → `{ok:true}`; the four uuid doors → `{ok:true, id}`; accept image →
   `{ok:true, accepted_at}`; `catalog_find_rebuild` → `{ok:true, entries}`. DROP + CREATE, grants restated.
7. **Audit cells**: `admin_undo_attribute_import`'s and `admin_undo_category_import`'s cells name
   `entity_translation.undo_*`, but the bodies write `attribute.import_undo` and `category_import.undo`; audit stays
   `log_audit` (F1-3's pattern), and the judge reads only `door_audit`, so the cells are corrected to `-`. The
   same holds for the `-` cells of create, add pointer and exclusions (their `log_audit` is in the core).
8. **K4**: the four import bodies name `'am'` 16 times (entity_translations lang_code, audit `lang`); written
   out whole, each becomes `public.language_code('pair')` (F1-3's form; same value).
9. **`admin_export_attributes()`** gains the reader form (`categories:view`) before it delegates; its line becomes
   `staff-reader | authenticated | categories:view | - | - | - | global | - | -` (it passes that gate today
   through its delegate, so nobody's access changes).
10. **`catalog_find_rebuild`**: `door_context('staff', 'categories', 'import', 'staff_config', NULL, 'global')` +
    shell; it loses the OR of update and translations:update and gains step-up (ruling 1 item 6). Its only caller
    is the service role, which passes every gate.

## cell-meaning

- **staff_config** (600 an hour per person, "staff settings and catalogue saves, one every 6 seconds for an hour",
  `src/lib/dials.ts:167`): one category or attribute save. The busiest honest work is a list reordered by dragging
  (one call per drop: reorder, link order), a link edited row by row (update link, card, fact), a tree reshaped
  pointer by pointer; a curator does a few dozen of these an hour, at most low hundreds — under 600. It fits every
  door of the family below.
- **import_commit / import_undo** (120 an hour each, the route's twin dial, `dials.ts:152-159`): one file applied
  or undone. A curator applies a handful of files an hour. The four import cells change from `staff_config` to
  these, the dials the bodies spend today (THE LAWS).
- **staff_moderation** (600 an hour, "listing photo allow/review, admin edit and move — one decision every 6
  seconds"): moderation of listings. `admin_remove_category_pointer`'s cell names it, its siblings `staff_config`,
  its body spends none; its work is a catalogue save, so `staff_config` is proposed.
- **DEC-380, the exits** ("a door that only closes what another door opened spends a dial other than its
  opener's"): remove pointer closes add pointer; unlink closes link; delete category and delete attribute remove
  what create and upsert made; the undos close their commits (`import_undo` ≠ `import_commit`, holds). INC-1152's
  class was a live state that harmed while held (an impersonation session that could not be ended). None of the
  catalogue exits ends such a state: each is one catalogue save, and at the ceiling (one save every 6 seconds for
  an hour) the curator waits as for every other save, as F1-3 decided for `admin_delete_language` and
  `admin_discard_legal_draft` (both `staff_config`). Proposed: every catalogue exit spends `staff_config`;
  the alternative the supervisor may rule is `staff_moderation` on remove pointer and unlink (decision 2).
- **Readers** spend none.
- **Country**: every line of the family is global, and global holds door by door: a category, a pointer, an
  attribute, a link, a picture and an import batch are the whole catalogue's rows; `admin_set_country_exclusions`
  writes a list of country codes on a global category row (the codes are values, never the scope); no door reads a
  row by a country column.
- **`catalog_find_rebuild`**: one caller, `e2e/helpers/posting.ts:172` (`adminClient()`, the service role — passes
  every gate, spends nothing). No `src/` caller (the server refreshes through `catalog_find_refresh`, service role)
  and no SQL caller. The line's one permission with step-up refuses no caller it serves today: stop (a) does not
  fire.
- **Permission and step-up cells**: every door keeps its line's permission and its row's step-up flag
  (create/update/assets false, restructure/import true); no cell change narrows or widens who may call a door
  (stop (a) does not fire).

## definition

The family by the concern's definition: the 42 manifest lines whose permission names `categories` (41) plus
`admin_export_attributes()` (line 41, no permission), and the browser-executable functions their bodies call:
`assert_parent_not_catchall` (151), `attr_allowed_check` (153), `attr_cell_check` (160), `attr_link_cells_refusal`
(164), `attr_option_shape` (166), `attr_rank_conflict` (169), `attr_export_payload` (162) — helpers; only
`assert_parent_not_catchall` raises, the others return a reason the door maps.

Against this GO's list: equal for the doors and readers. Not on the list, added by the definition:
`assert_parent_not_catchall` (redeclared: its key becomes a code) and the cores (no browser role; redeclared or new
as decision 1). `merge_attributes_impl`, `price_basis_conflict`, `attribute_holders`, `cat_import_plan`,
`attr_import_plan` are service-only or closed and only SQL calls them. No door of the list no longer exists.
Against the plan's §5 row (`f1-doors.stop-1.md:477`, "≈60"): 42 lines + 4 revoked helpers + 11 cores = 57.

`admin_export_attributes()` is a STABLE SECURITY DEFINER wrapper, `RETURN public.admin_export_attributes(NULL::text);`
— it passes the delegate's `categories:view` gate; its line (signed-in-reader, no permission) understates it
(decision 9).

The four import helpers `import_is_slug`, `import_norm_bool`, `import_norm_date`, `import_norm_pipe` (lines 210-213,
reason `none`): no code, policy or body names them (sql-callers, callers) — revoked from authenticated; their lines
and their four `grant-without-caller` lines in `scripts/doors/check-doors-allowlist.txt` (:4-:7) leave.

## tests

The family's e2e ids: CT-1…46 (`admin-categories-console`, `-home`, `-lifecycle`, `-images`), AT-1…84
(`admin-attributes-library`, `-editor`, `-import`, `-links`, `-safety`), CI-1…5 (`category-image-routes`,
`admin-categories-images`), IG-1…6 (import gate), DRF-1…6; unit: `src/server/imports/route.test.ts` (IMR-1…13),
`csv.test.ts` (CSV-1…6), `gate.test.ts`, `categories-service.test.ts`, `category-dialogs.test.tsx`,
`category-image-dialog.test.tsx`, `category-image-variants.test.ts`, `generate-image.test.ts`, `refusal.test.ts`
(RFR-1…10), `refusal-tail.test.ts`, `door-codes.test.ts` (DRC-1…7); the manifest's: `scripts/doors/check-doors.test.ts`
(DOORS-1…8), `migration-reader.test.ts` (MGR-1…7), `import-doors.test.ts` (IMD-1…7). There are no attributes unit
tests.

Each id that reads a sentence that becomes a code, a changed answer shape or a new effect, with its new expectation
(from the body):

- **AT-14** (`admin-attributes-library.spec.ts:863-865`): upsert, link and delete as a view-only user —
  `toContain("permission denied")` ×3 → `toContain("permissionDenied")` (door_context's code is the first refusal;
  the message is `permissionDenied`, no detail).
- **CT-14** (`admin-categories-lifecycle.spec.ts:249-252`): `assert_parent_not_catchall` as the service role —
  `toContain("admin.categories.error.catchallParent")` → `toBe("catchallParent")` (the helper raises P0D01 with no
  shell; supabase-js surfaces the message).
- **AT-46** (`admin-attributes-import.spec.ts:1019-1021`): `toContain("admin.attributes.error.rankInherited")` →
  `toBe("rankInherited:category=<child id> rank=2 attribute=<direct key> inherited_from=<parent slug>
  inherited_attribute=<inherited key>")` (the test's own scratch ids).
- **AT-33** (`…editor.spec.ts:314-362`): holds — contains-checks on `parentNotInParent`, `dependsNotSelect`,
  `dependsCycle`, `HasDependents` and the dependent's key (`deleteHasDependents:<keys>`); `rpcAs` reads the error
  body's `message`, which `door_refused` sets to `code[:detail]` at status 400.
- **AT-34, AT-19**: hold (they assert only that a refusal came).
- **CI-4b** (`category-image-routes.spec.ts:189-214`): set images error null — holds; accept image `accepted` not
  null — holds (`{ok:true, accepted_at}` is not null); the `null as unknown as string` at :194 is in `e2e/`
  (CF-DOOR-ARGS reads `src/` only).
- **AT-42** (`…links.spec.ts:601`), `…import.spec.ts:1138-1160`: error null — hold.
- `e2e/helpers/posting.ts:172` (`rebuildFinderIndex`): error null — holds (service role).
- Import relay: `unknownParent` answers 400 (the shell's code) instead of 409 (the key row); no e2e asserts its
  status (CT-36 reads preview refusal rows; :823 and :1255 are `fileChanged`). The relay's `import already running`
  row stays (locations); the category and attribute commits answer `importRunning` 400 — the import dialog's busy
  line (`import-dialog.tsx`, `status === 409 && named === "import already running"`) reads the code too in STEP 3.
- IMR-8 (`unknownParent: shoes` key row) and IMR-10 (`import already running`) hold: the rows stay for the
  location imports (F1-4b).

The next ids: CT-47, AT-85, CI-6, IMR-14, DOORS-9, RFR-11; CF-DOOR-ARGS's own test ids **DARGS-1…** (new prefix).

## lists

- **The manifest** (`scripts/doors/manifest.txt`): every family line's codes cell (the door's literal codes), the
  dial cells of lines 26, 27, 135, 136 (`import_commit` / `import_undo`) and 97 (decision 2), the audit cells of 135
  and 136 (decision 7), line 41 (decision 9); lines 210-213 leave (revoked).
- **The forms allowlist** (`scripts/conformance/forms-allowlist.txt`): CF-FORM-3 lines 59-63 (`attribute-dialogs.tsx`,
  `attribute-error.ts`, `category-dialogs.tsx`, `category-image-dialog.tsx`, `category-submit-error.ts`) leave as the
  mappers retire (STEP 3); the CF-FORM-1 lines 8-16 stay (wave 3).
- **public-surface** (`scripts/public-surface-allowlist.txt`): lines exist for upsert (36), merge (44), delete
  category (46), set fact (87), add pointer (136), create (137), exclusions (138), link (139); each other DROP +
  CREATE door that restates `GRANT … TO authenticated` gains a `restated grant (not a new surface)` line (F1-3's
  form) as the check demands. The cores and the revoked helpers grant nothing.
- **acceptance-doors** (`scripts/acceptance-doors-allowlist.txt`): lines 7, 8, 16, 18, 19, 27, 31, 32, 36-38, 40,
  48-51, 53, 56, 64, 74-76, 79, 85 — the guard judges the grammar only; a re-created door's key (its signature) is
  unchanged; line 85's reason (three permissions) becomes "categories:import with step-up".
- **The door check's allowlist** (`scripts/doors/check-doors-allowlist.txt`): lines 4-7 leave.
- **The import gate's registry** (`src/server/imports/registry.ts:197`, `:313`): unchanged (the doors keep their
  names and arguments). **The relay's rows** (`src/server/imports/route.ts:60-72`): `batch id required` (only the
  attribute undo raised it) leaves; every other row stays for locations and countries, and `unknown category
  scope` for decision 4. `IMPORT_WORDS`'s `batch id required` (the factory's own word) stays.
- **The computed-declaration list** (`scripts/conformance/migration-reader.test.ts:198-209`, MGR-7): the four
  import doors leave (written out whole); `attr_import_plan` stays (MGR-6's COMPUTED_BY_HAND, untouched).
- **Shared-value tables** (`scripts/conformance/shared-value-tables.txt:8-10`: categories, category_attribute_links,
  entity_translations — read, not shared, by `catalog_find_rebuild()`): unchanged.
- **The register** (`docs/governance/mechanisms.md`): through the report's Records (DEC-346).

## old-file-readers

- `docs/features/imports.md:457-462` (the relay's rows: `permission denied`, `unknown import batch`, `unknownParent`
  409, `batch id required`) — updated in STEP 3/4 for this family.
- `docs/features/categories.md:160-161` (`assert_parent_not_catchall` raises `admin.categories.error.catchallParent`),
  `:563` (delete's four refusals by key), `:101` (create's signature).
- `docs/features/attributes.md:169` (`permission denied`).
- `src/lib/refusal.test.ts:18-95`, `refusal-tail.test.ts:7-68`: fixtures that NAME console keys
  (`admin.categories.error.delete_has_children`, `parentAfterChild`) to test the reader's key branch; they test
  the reader, not a door — they stay (the key branch stays for the trigger and other families).
- `src/server/imports/csv.ts:60-62` `exportRefusal` ('permission denied' → forbidden): the export readers raise
  `permissionDenied` (P0D01) now — the export routes read the code (STEP 3).
- `src/server/imports/route.test.ts:296-368` (IMR-8, IMR-10): hold (locations).
- `scripts/conformance/import-doors.test.ts:194` (IMD-4): a planted string — holds.

## second-readers

- `src/features/admin-countries/country-verb-dialogs.test.tsx:29-30`: `vi.mock` of `categories-service` spreading
  `importOriginal` — follows any export the service keeps; the services' export names do not change.
- `src/features/admin-categories/category-images-service.ts:108`: `import("./category-image-variants")` (the
  allowlisted on-demand piece) — unchanged.
- `src/server/imports/route.test.ts:31-97`: `vi.mock` of user-client, catalog-find, dials and the admin client, then
  `import("./route")`, `./csv`, `./gate`, `./registry` — the relay's rows it reads are named above.
- No `loadOnce` reaches a service of this family.

## chunk-graph

CENSUS-ITEM chunk-graph: `DoorArgs` (new, `src/lib/`) is a type only — erased at build, no runtime module joins the
entry; no client module moves. Measured at STEP 5 by comparison with the base build kept at
`/tmp/ethio-scratch/f1-doors-4a/base-dist/`.

## environments

The migration reaches: the local proof stack (you, `bun run db:proof --fresh`); ethio-staging (the supervisor's
side, at the migration stop); ethio-prod (after the merge, the operator's publish). The proofs' first run on a
shared database is the staging apply.

## mechanisms

- `door_context` (20261106051600 :39, read whole): class → notSignedIn → accountDeactivated →
  `has_permission_scoped` (permissionDenied[:detail]) → `require_step_up_if_needed(res, act)` (not for
  `staff-reader`; P0009 kept) → `rate_gate(dial)` (rateLimited); the service role passes every gate and spends
  nothing; no step-up opt-out argument.
- The shell: `EXCEPTION WHEN SQLSTATE 'P0D01' THEN RETURN public.door_refused('<door>', '<dial>', SQLERRM);` —
  `door_refused` counts the dial again (INC-844), meters `door_refusals`, sets the response status
  (401/403/428/429, else 400) and returns `{ok:false, code:'P0D01', message:'code[:detail]', refusals:[{reason,
  detail}]}`, which supabase-js surfaces as `error.message`. `door_refuse(code, detail)`: code `^[a-z][A-Za-z]*$`.
- `readRefusal` (`src/lib/refusal.ts`, read whole): stepUp → `family.words[head]` → a DOOR_KEY when known → a door
  code → `family.generic` or `door.refused` → sentences → provider → `common.error`.
- The relay's `codedRefusal` (`src/server/imports/route.ts:113-135`, read whole): a P0D01 answers its code with
  `CODE_STATUS` (permissionDenied 403, rateLimited 429, notSignedIn 401, accountDeactivated 403, else 400), a
  `stepUpRequired` 428, a detail only when it matches `^[A-Za-z0-9_.:+ -]{1,64}$`.
- F1-3's two families: `TRANSLATION_REFUSALS` (passed as the reader's argument in `translations-service.ts:482`)
  and the languages' — each code a screen reads → its existing key; the rest generic.
- The judge (`scripts/doors/judge.ts`): codes cell = the literal `door_refuse('<code>'` set; the `door_context`
  literals; the shell; `door_audit` only; a door VOLATILE, a reader not.

## first-download

From my own lock-exact build at the base (`bun run build && node scripts/check-bundle-size.mjs`, exit 0, "Bundle
budget OK."); the entry 203.6 / 205 KiB JS, 22.6 / 40 KiB CSS. The family's pages: `/admin/categories` 344.9 / 346
(room 1.1), `/admin/attributes` 336.9 / 338 (room 1.1), `/admin/images` 208.7 / 210 (1.3). The tightest pages (room
≤ 0.6): `/admin/users_/$userId` 289.5 / 290, `/admin/translations_/$lang` 307.5 / 308, `/admin/countries` 326.5 /
327, `/admin/roles_/$roleId` 273.4 / 274, `/admin/listings_/$listingId_/edit` 410.4 / 411. The full table (50 pages)
is `/tmp/ethio-scratch/f1-doors-4a/bundle-base.log`; the base client build is kept at
`/tmp/ethio-scratch/f1-doors-4a/base-dist/` for the chunk-by-chunk comparison at STEP 5.

## premises

- The GO and the plan's §4.3 say INC-942 has **two** casts in `src/features/admin-locations/locations-service.ts`;
  the tree has **three** (`:97`, `:99`, `:100`). CF-DOOR-ARGS's allowlist holds that file's three (F1-4b).
- CF-DOOR-ARGS "enumerates every cast of `null` to a non-null type in a database function call's arguments under
  `src/`": beyond this family and locations it finds `src/routes/api/listings/draft.ts:124` (country) and
  `src/server/supabase/user-client.ts:318` (`p_batch`), and this family's `src/routes/api/admin/categories/export.ts:36`
  (`p_scope: scope as unknown as string`). The family's three files are cleared here; the two outside SCOPE need
  allowlist lines with their owners' turns (a premise for the supervisor: the GO says "the two locations lines only").
- The GO names `attributes-service.ts` and `category-images-service.ts` as the family's casts; `categories/export.ts:36`
  is a third file of the family with one.
- The relay's rows "for this family gone": only `batch id required` is this family's alone; `unknown category scope`
  stays by decision 4; the others are shared with locations and countries.
- `admin_remove_category_pointer`'s `staff_moderation` is consistent with DEC-380's exit rule as written (decision 2).

## findings

- `admin_retire_category` raises `admin.categories.error.reassign_required` and `…reassign_target_invalid`;
  `en-admin.ts` has `reassignRequired` and no `reassign_target_invalid` — the console has printed the raw key.
- `admin_reactivate_category` raises `admin.categories.error.already_active`; `admin_create_category_core` raises
  `admin.categories.error.slugTaken`; neither key exists — printed raw today.
- The category console prints a raw English sentence for 'category not found', 'pointer not found' and 'parent
  not active' (`category-submit-error.ts` falls back to the raw message).
- The undo doors' audit cells name another family's actions (decision 7).
- No security hole found.

## queued

- `docs/governance/reports/f1-doors.stop-1.md:477` (the plan's §5 row): the categories and attributes doors and
  readers, the imports' previews, commits and undos for both; INC-942's `DoorArgs` + CF-DOOR-ARGS — **built here**
  (locations casts left → F1-4b).
- `docs/governance/reports/f1-doors-1.stop-1.md:114` (five import helpers → F1-4a): four lines are on the allowlist
  today (`import_is_slug`, `import_norm_bool`, `import_norm_date`, `import_norm_pipe`) — **built here** (revoked);
  the fifth, `import_norm_text`, is `invoker-chain` (named by a body) and stays.
- `docs/governance/reports/f1-doors-3.census.md:52, :309-310` (`admin_save_entity_translation_core`'s codes reach
  the four import doors' callers through the relay; their own sentences are F1-4a's) — **built here**.
- `docs/governance/reports/f1-doors-3.census.md:337` (the rest left, F1-4a → F1-7) — the planners' scope sentence
  **left** (F1-7, decision 4).
- `docs/governance/briefs/f1-doors-ruling-1.md:25` (CF-DOOR-ARGS emptied in F1-4a) — superseded by the plan's §5
  (the GO's LEFT: locations → F1-4b); **built here** with the locations lines.
