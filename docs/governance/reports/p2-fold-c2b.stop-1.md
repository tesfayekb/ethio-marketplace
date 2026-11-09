QUESTION — p2-fold-c2b step 1: the census, before any change
DONE: step 1 (census, read only; no repository file changed but this one)
LEFT: every part (the app parts, M-3c-b, the checks, the report)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `d5d6796c409e34d6fee00144e9fd1778d0692858` (short `d5d6796`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T03:09:02Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42552369072
FILES:
docs/governance/reports/p2-fold-c2b.stop-1.md

Base: cursor/p2-fold at d5d6796c4 (HEAD = origin/cursor/p2-fold = d5d6796c4; origin/dev
f2d558467). guards-last-failure: "No failed build/guard jobs in this run" (run 42552369072);
e2e-last-failure: "last E2E run 42552369072 passed". Every line number below is at d5d6796c4.
Scratch: /tmp/ethio-scratch/p2-fold-c2b/ (census.ts, census2.ts, md5.ts, capskeys.txt,
build.log, budget.log), the operator's to remove.

## 1. The c2b file list (by part)

**Caps block retired** (deleted, each declared):
- src/features/admin-monetisation/caps-editor.tsx (140 lines), caps-forms.ts (82),
  caps-section.tsx (260).

Edited:
- monetisation-page.tsx:
  - :9 the import;
  - :18–28 the header comment;
  - :39–40 maySeeCaps/mayUpdateCaps on coverage:view/update;
  - :58 `{ withCaps: maySeeCaps }`;
  - :93–95 the CapsSection render.
- use-monetisation.ts:
  - imports :10, :16, :21;
  - `useCoveragePlans` :41–49;
  - `useSetCoveragePlan` :95–97.
- monetisation-service.ts:
  - comments :31–33, :40;
  - `CoveragePlanRow` :88–101;
  - `listCoveragePlans` :103–124 (`.from("coverage_plans")` :107);
  - `SetCoveragePlanInput` :282–292;
  - `setCoveragePlan` :294–313;
  - DOOR_MESSAGE_KEYS caps ids :359–364.
- monetisation-order.ts:
  - comments :10, :20;
  - `MONETISATION_ANCHORS.caps` :26;
  - `options.withCaps` :68;
  - the caps step :111–118.
- monetisation-forms.ts:22 (a comment naming caps-forms.ts).
- src/routes/admin.monetisation.tsx:9 (a comment naming coverage:update).

Tests:
- monetisation-forms.test.ts: :3, GOOD_CAPS :71, MNF-10 :367–410.
- monetisation-order.test.ts: MNO-1 :93–113, MNO-2 :116–136, :163.
- monetisation-page.test.tsx: :84, :96, :135, :148.
- monetisation-service.test.ts: :39, :46, CAPS_IDS :66–67, :210, MNS-4 :364–400, MNS-6 :417–460.
- e2e/admin-monetisation.spec.ts:
  - header :35, :49;
  - readPlan :288–298, destroyPlan :346–350, seedPlan :524–545;
  - MON-1 :614 and :618 (the "caps" entry leaves);
  - MON-2 :706–708;
  - MON-15 :1524–1620 (leaves whole).
- scripts/conformance/admin-guides.test.ts:317–343 (exact prefix list; `"admin.monetisation.caps"`
  leaves, and its "six guides" comment).
- scripts/e2e-select.ts:136–144 (stale comment "and the posting caps"; the mapping of
  src/routes/admin.coverage.tsx stays, since MON-3 :734 keeps the redirect).

**The edit reader's caps (INC-1080):**
- src/features/posting/use-edit-draft.ts (the seller reads `readDraft`, posting-service.ts:379–440,
  table + `my_listing_private` through `readOwnPrivate` :364; staff read `readForStaff` →
  `readAdminListing`, which is admin_listing_detail).
- wizard.tsx:
  - :462 `planCaps`;
  - :570–582 `setPlanCaps(schema?.plan ?? null)`;
  - :1537, :1650–1652, :1688 (where the caps are read).
- posting-service.ts:803–816 `PlanCaps` (with the stale comment "through `seller_plan()`").
- Tests: use-edit-draft.test.ts (mocks :4, :7, :74, :200), posting-service.test.ts PSV-7 :229–264.
- **Census hit:** src/features/my-listings/my-listing-page.tsx:237–264, the owner's ad page photo
  box, reads the same schema `plan` for a LIVE ad. It is the same defect as INC-1080, outside the
  brief's list (see Q1).

**Step 6's NULL (INC-1084):**
- step-where.tsx:
  - :134–137 the comment ("nothing shows when the plan is not known");
  - props :736–738 (default null) and types :764–766;
  - :1127 `.slice(0, maxCities ?? 1)`;
  - :1350–1352 room `maxCities !== null && citiesUsed < maxCities`, the same for regions and
    countries;
  - :1700–1730 the plan line (`post.where.planLineUnknown` when null, `post-where-plan-count`
    data-max, `post.where.reachCaption`).
- Tests:
  - step-where.test.tsx (its defaults pass no caps, meaning "unknown");
  - e2e/post-wizard-place.spec.ts PW-82 :1143–1205 (the comment and the room expressions assume
    null = no room; both change);
  - e2e/post-wizard-where.spec.ts PW-90 :527–530 (the plan line).
- Proposed shape: one prop `caps: {cities, regions, countries} | null`. The outer null means
  unknown, as today; an inner null means no limit. step-where.test.tsx's defaults then keep their
  meaning.

**The plan seam's reader moves (CF-PLAN-1 retires):**
- scripts/conformance/plan-seam.ts (166 lines):
  - the reader is :42–147 (`functionCodeOf` :54, `Declaration` :59, `declarationsOf` :71,
    `dropsOf` :114, `LastDeclaration` :122, `lastDeclarations` :125; it imports `sqlCodeOf` from
    perm-vocabulary);
  - the guard is :27–51 and :150–166.
- The reader moves to a new scripts/conformance/migration-reader.ts. Then plan-seam.ts,
  plan-seam.test.ts (122) and plan-seam-allowlist.txt (4) are deleted and declared, and
  wired.test.ts:134–135 leaves.
- **Importers: 11, not the seven the ruling counts** (Q9):
  - modules listing-designation.ts:4, sql-writes.ts:3, status-map.ts:6, proof-readers.ts:6,
    door-answers.ts:4, scripts/doors/catalogue.ts:5;
  - tests listing-designation.test.ts:15, proof-readers.test.ts:8, sql-writes.test.ts:8,
    status-map.test.ts:8, door-answers.test.ts:7.
- The landed comment 20261103040808:11 names CF-PLAN-1; landed migrations are never edited.

**The product editor's reach caps (G54 c):**
- product-editor.tsx (199 lines; it uses `FormField` from src/components/shell/form-section and
  `NumberField`/`Toggle`/`MonetisationErrorLine`, monetisation-dialogs.tsx:86–118).
- monetisation-forms.ts `productFormInput` :89–130.
- monetisation-rows.ts `readProduct` :180–197 (it gains the three fields).
- monetisation-service.ts `saveProduct` (and the three trailing params).
- Tests: monetisation-forms.test.ts, monetisation-service.test.ts (saveProduct toEqual :229, :258;
  MNS-6's file map is re-pointed to the new migration), and the products-section tests.
- See Q5.

**The two c2a siblings:**
- src/features/promote/promote-sheet.tsx:165 `{catalogText(level.nameEn, level.nameAm, language)}`
  → `levelNameOf` (src/features/levels/level-fields.ts:63, `string | null`).
- src/features/admin-monetisation/use-monetisation-names.ts:55 `productName` returns the key when
  the product is missing. Its callers:
  - products-section:149, :306;
  - price-dialog:117, :128;
  - monetisation-page:55;
  - override-dialog:109, :128, :139;
  - monetisation-order.ts:36, :105;
  - market-dialog:129;
  - level-overrides-table:204;
  - markets-section:96;
  - mocks monetisation-page.test.tsx:118 and monetisation-order.test.ts:80.
- See Q6.

**Strings:** en-admin.ts:203 and am-admin.ts:199 `admin.roles.perm.resource.coverage`; the caps
block's keys (§7); docs/generated/i18n-usage.json and public/i18n-usage.json.

**M-3c-b:**
- one new migration file;
- scripts/doors/manifest.txt :106 (admin_save_listing_package's line) and :120
  (admin_set_coverage_plan leaves);
- scripts/acceptance-doors-allowlist.txt :55 (leaves) and :119 (wording);
- scripts/public-surface-allowlist.txt :61, :144 (leave), :169 (wording), and the INC-443 adds
  (§6);
- scripts/conformance/perm-vocabulary.ts and its test (CF-PERM-1 learns DELETE).

**docs/features naming the retired objects:**

| Doc | Mentions |
|---|---|
| plans.md | 9 |
| coverage-console.md | 12 |
| geography.md | 4 |
| listings.md | 3 |
| posting.md | 3 |
| admin-guide.md | 1 |
| ci-local-backend.md | 1 |

## 2. Readers of the dropped objects

These are plan_photo_cap, seller_plan, plan_caps, admin_set_coverage_plan and coverage_plans
(`rg` over src/, e2e/, scripts/):
- src/ (the app parts empty these):
  - monetisation-service.ts :31, :40, :107, :300, :359;
  - monetisation-service.test.ts :66, :210, :376;
  - posting-service.ts:805 (a comment).
- e2e/ (MON-15 and its helpers empty these):
  - admin-monetisation.spec.ts :290, :348, :531.
  - **e2e/pool-reset-map.ts:54 `coverage_plans`** is the exception. src/test/pool-reset-map.test.ts
    derives its table list from types.ts, so the line can leave only with the types patch, after
    "continue", not in M-3c-b's commit. The ruling's §10 premise is corrected (Q8).
- scripts/:
  - public-surface :61, :144;
  - acceptance-doors :55;
  - manifest :120;
  - plan-seam.ts, plan-seam.test.ts, plan-seam-allowlist.txt :4 `reads:admin_set_coverage_plan`.
- src/integrations/supabase/types.ts (the types patch removes these): :901, :5170, :6226, :6227,
  :6372.
- SQL, by the file reader's last declarations:
  - plan_photo_cap and plan_caps (20260919054044 :86, :101) read coverage_plans; both drop
    together;
  - admin_set_coverage_plan (20261102081500:52) drops;
  - validate_listing_draft's file view (20261103040808:22) still names them. The live body after
    M-3b (20261107125358, a computed insertion) does not. The file reader cannot see computed
    insertions (INC-1083), so M-3c-b's proof reads pg_proc.prosrc for the five names before the
    DROPs and refuses if any live body other than the dropped functions names one.
- No foreign key, view or trigger references coverage_plans; its policy coverage_plans_public_read
  drops with the table.
- `has_permission(…'coverage'…)` appears only in the declarations of admin_set_coverage_plan
  (20260915162505, 20260919134523, 20261029015441, 20261102081500). The other `'coverage'` matches
  in validate_listing_draft, save_seller_place, public_listing_json, edit_my_listing and
  designation_sweep_core are refusal-field and JSON-key literals. They are not permission checks.

## 3. admin_save_listing_package, live

The last declaration is 20261103040805:200:

```
admin_save_listing_package(p_key text, p_kind text, p_name_en text, p_days integer,
  p_enabled boolean, p_self_serve boolean, p_extends_lifetime boolean,
  p_name_am text DEFAULT NULL, p_max_photos smallint DEFAULT NULL,
  p_placement text DEFAULT NULL, p_badge boolean DEFAULT NULL, p_sort integer DEFAULT NULL)
plpgsql VOLATILE SECURITY DEFINER SET search_path = public
REVOKE … FROM PUBLIC, anon; GRANT EXECUTE … TO authenticated, service_role
```

Its body md5 (from the file, 3703 characters) is **11d4e1b1b79202d395134f2cb6cfed40**. M-3c-b's
pre-check asserts this value against pg_proc before the DROP+CREATE.

What it does today:
- perks follow NULL-keeps-stored;
- `perks on reach` is refused;
- it upserts with an explicit SET list, so the stored caps are kept on every save;
- it audits `package.saved` via to_jsonb.

The argument list grows, so it is DROP+CREATE with REVOKE/GRANT restated and three trailing
`p_max_cities smallint DEFAULT NULL, p_max_regions …, p_max_countries …` (see Q2). The CHECK by
kind (listing_packages_caps_by_kind_check, M-3a 20261107111340:30–61) is restated in the body as
the door's refusal.

admin_list_monetisation (20261103040807:142) already answers the caps through `to_jsonb(k)`. No
SQL change is needed there; only the client's `readProduct` learns them (a premise of ruling 1 §7
that holds trivially).

## 4. admin_list_listings, live, and its literal set

- The last declaration is 20261105080110:32: `(text,text,text,uuid,text,date,date,text,integer,integer)`,
  plpgsql STABLE SECURITY DEFINER.
- Its md5 is **901086604a4975acd5073b63a5dccea6**, equal to its own landed proof (:295).
- The literal is at :76: `IF p_tier IS NOT NULL AND p_tier NOT IN ('premium','featured','regular')
  THEN RAISE EXCEPTION 'unknown tier'`.
- The client maps it at src/features/admin-listings/tier-reasons.ts:93. The e2e caller is
  admin-listings.spec.ts:399 (`p_tier: "featured"`).
- The argument list is unchanged, so this is CREATE OR REPLACE. The proposal is to refuse a
  p_tier that is not a `listing_packages` row of kind 'level', keeping the message `unknown tier`
  so tier-reasons.ts:93 holds (see Q11).

## 5. The coverage permission rows and CF-PERM-1's DELETE

- Seeded at 20260915162505:39–90: resource `coverage`; actions `view` (no step-up) and `update`
  (step-up).
- role_permissions are granted to every role holding locations:manage, with is_core = false.
- The trigger role_permissions_core_lock (20260809010130:285–298) refuses DELETE of an is_core
  row. The FKs to permissions and resources are ON DELETE CASCADE.
- The DO block (ii):
  1. counts the coverage role_permissions rows with is_core and RAISEs if any (it never disables
     the trigger);
  2. `DELETE FROM public.resources WHERE name = 'coverage'` (the cascade takes permissions and
     role_permissions);
  3. counts the remaining rows of permissions and role_permissions under `coverage` and RAISEs
     if any is left.
- The proof (sentinel rollback, scratch only): the counts before and after, and `has_permission`
  for a scratch staff caller answering false for coverage:view.
- CF-PERM-1 (scripts/conformance/perm-vocabulary.ts) reads INSERTs into resources and permissions
  today. It learns `DELETE FROM public.resources|permissions WHERE name = '<n>'`, top level and
  inside a DO block. A deleted name leaves the vocabulary, and a deleted name whose
  `admin.roles.perm.resource.<n>` key is still in en-admin or am-admin fails the guard.
- The planted proof has three cases:
  - a DELETE of a resource whose key stays fails;
  - the same DELETE with the key gone passes;
  - a DELETE inside a DO block is read.
- perm-vocabulary.test.ts PV-4 :135 lists "coverage" and loses it.

## 6. Allowlist lines that leave, and INC-443's adds

Leave:
- public-surface-allowlist.txt :61 (coverage_plans) and :144 (admin_set_coverage_plan);
  plan_caps, plan_photo_cap and seller_plan have no line in public-surface, acceptance-doors or
  the manifest;
- acceptance-doors-allowlist.txt :55;
- manifest.txt :120;
- plan-seam-allowlist.txt (the whole file).

Wording:
- manifest :106 and acceptance :119 (admin_save_listing_package's new signature);
- public-surface :169;
- public-surface :166, the listing_packages line, is stale for the caps columns (a finding; its
  words are brought up to date in (iv)).

INC-443's adds are nine, each absent from public-surface today:

| Name | Manifest class | Last grant |
|---|---|---|
| listing_reveal_count | signed-in-reader | 20261003215007 |
| cat_primary_pointer | helper | 20260928002133 |
| cat_primary_parent | helper | 20260928002133 |
| admin_list_categories | staff-reader categories:view | 20260928002133 |
| impersonated_list_listings | signed-in-reader | 20260928034942 |
| attr_answer_tokens | helper | 20261002013936 |
| attr_answer_other_text | helper | 20261002013936 |
| attr_contact_like | helper | 20261003005802 |
| listing_contact_refusals | signed-in-reader | 20261003005802 |

Two premises are wrong. roadmap :681 counts eleven, but get_category_tree_version and
price_shape_for_basis are already present. Also found:
- public-surface :52 (admin_reveal_listing_contact) still says "with a fresh second factor"; D129
  removed it, so its words lose the phrase;
- transition_listing has two lines (:22, and :54 "restated grant (not a new surface)"). I
  propose no change to them.

## 7. Every list a retired name must leave

**The caps block's keys:** 65 in all, 53 in en-admin/am-admin and 12 in en-guide/am-guide; the
list is in capskeys.txt. **Five have callers outside the block and stay:**
- `admin.coverage.error.reason` (monetisation-dialogs.tsx:35);
- `admin.coverage.everywhere.yes` and `admin.coverage.everywhere.no` (monetisation-dialogs.tsx:208–209,
  level-overrides-table.tsx:134);
- `admin.coverage.field.photos` and `admin.coverage.field.photosHint` (product-editor.tsx:137,
  override-dialog.tsx:190).

So **60 leave** by script, EN+AM, with `admin.roles.perm.resource.coverage` making 61. The c2a
ruling §8's 65 is corrected.

The other lists a retired name leaves:
- the doors manifest, acceptance-doors, public-surface and plan-seam allowlists (§6);
- wired.test.ts:134–135;
- admin-guides.test.ts:317–343;
- MONETISATION_ANCHORS and the order steps;
- DOOR_MESSAGE_KEYS :359–364 (badPlan, belowMinimum, badMaxPhotos, badDefaultDays,
  badMaxActiveAds);
- types.ts (the patch);
- pool-reset-map.ts:54 (after the patch);
- docs/features (§1);
- docs/tracking/intentional-deletions.txt gains the deleted paths.

## 8. Exact-list assertions

- monetisation-order.test.ts MNO-1 :109 `["caps","set"]` and :113 `steps[3]`; MNO-2 :123, :136.
- MON-1 :614 `["markets","products","prices","caps"]` and :618 `["markets","levels","reach","caps"]`.
- admin-guides.test.ts:317–343 (the prefix list).
- perm-vocabulary.test.ts PV-4 :135.
- monetisation-service.test.ts:
  - saveProduct's call arguments at :229 and :258 (they gain the three p_max_* fields);
  - MNS-6 :417–460, every RAISE of the migration file it maps has a key. It is re-pointed to the
    new file, so every new RAISE needs a DOOR_MESSAGE_KEYS entry (Q3). Its `belowMinimum` →
    `admin.coverage.error.belowMinimum` assertion leaves with the caps ids.
- posting-service.test.ts PSV-7 :229–264 (readDraft's answer, if it gains `caps`).
- use-edit-draft.test.ts (the readDraft and readAdminListing mocks gain `caps`).

## 9. Premises found wrong

1. MON-16 (:1639) is the order strip's "Needs a row" test and has no caps content. It stays.
2. There are 11 plan-seam importers, not seven (§1).
3. 60 caps keys leave, not 65 (§7).
4. pool-reset-map.ts:54 cannot leave in M-3c-b's commit (§2).
5. admin_list_monetisation needs no SQL change (§3).
6. INC-443 is nine names, not eleven (§6).
7. No door answers `caps` today. my_listing_private (last 20261003221958:86), admin_listing_detail
   (last 20261105080110:133) and promote_options (20261107125357) answer none. INC-1080 needs a
   door change M-3c-b's list does not name (Q1).
8. The file reader's view of validate_listing_draft is stale (INC-1083); the drop proof reads live
   bodies instead (§2).

## 10. Questions ruling 1 does not answer

- **Q1 — the door that answers `caps`.** Ruling 1 §3 has the edit reader carry `caps: {photos,
  cities, regions, countries}`, but no door answers it. Options:
  - (a) M-3c-b redeclares my_listing_private (seller) and admin_listing_detail (staff), each
    answering `caps` from the ad's own level and reach rows;
  - (b) one new caller-scoped reader `listing_caps(p_listing_id)`, gated by ownership or
    listings:view.

  Either way the app part that reads it lands after "continue", once the types patch is in, not
  before M-3c-b. Is my-listing-page.tsx:237–264, the same defect on the owner's ad page, in c2b or
  K2?
- **Q2 — NULL on the three new params.** Ruling 1 §5/§6 say NULL = no limit, but the door's perks
  follow NULL-keeps-stored. If NULL means no limit, any caller that omits them (an old client
  during the apply window, the e2e helpers) clears a reach product's caps on save. Options:
  - (a) NULL = no limit as ruled, every caller passing all three;
  - (b) keep-stored plus an explicit `p_clear_caps boolean DEFAULT false`.
- **Q3 — refusal keys for the new RAISEs.** A cap on a level and a cap below 1 or breaking the
  by-kind CHECK need keys (MNS-6). Proposed EN, with the AM to be supplied:
  - `admin.monetisation.error.capsOnLevel` "A level carries no place limits."
  - `admin.monetisation.error.badCap` "A limit is a whole number, 1 or more, or blank for no
    limit."

  Or do they reuse existing keys? Any new string is a STOP until its text is given.
- **Q4 — step 6's "no limit" words.** When a cap is NULL (no limit), does the plan line reuse
  `post.where.planLineUnknown` ("{regions} region(s)", no new string), or get a new key?
- **Q5 — G54 (c) in the console.** The product editor's fields are the console's
  `FormField`/`NumberField` with `MonetisationErrorLine`, through `monetisationErrorKey`, a
  per-feature mapper. The posting `Field` (src/features/posting/field.tsx; register row 14, "NONE
  YET as the form kit for every form") is used outside posting only by
  src/features/legal/agree-to-document.tsx. Options:
  - (a) the three fields alone through posting's `Field`, with the door's field names as ids and
    the refusal through `refusalFor`, inside a dialog whose other fields stay FormField;
  - (b) the console's NumberField like their siblings, with the G54 (c) gap of the whole editor
    reported K2 for the form-kit turn.
- **Q6 — the null words for the siblings.** `levelNameOf` → null in promote-sheet (a member page):
  the only "unknown level" key is `admin.listings.level.unknown` (admin layer). Options: a new
  member/base key, hiding the name, or moving the key to base. Also, what does `productName` show
  when the product is missing, once the key-as-fallback leaves (e.g. `admin.listings.level.unknown`,
  already in the admin layer)?
- **Q7 — the schema's `plan` key** (posting-service.ts:803–816, and its stale comment). Once the
  wizard reads caps from the door, does the schema's `plan` leave in c2b, or is it K2 for c3?
- **Q8 — pool-reset-map.ts:54** leaves with the types patch after "continue" (§2). Confirm.
- **Q9 — the reader's new home.** Is it scripts/conformance/migration-reader.ts, with all 11
  importers re-pointed?
- **Q10 — the legacy doors.** Do the redeclared admin_save_listing_package and admin_list_listings
  stay on their own gates, or move onto door_context/door_refuse (DEC-333)? I assume they stay
  (a behaviour change beyond the brief).
- **Q11 — admin_list_listings.** Should the check refuse by the rows (`listing_packages` kind
  'level', `unknown tier` kept), or drop the check (an unknown level then answers no rows)?

## 11. First-download numbers (lock-exact build at d5d6796c4)

`bun install --frozen-lockfile` reported no changes; the build log said "Bundle budget OK".
Readings and ceilings in KiB:

| Page | Reading / ceiling |
|---|---|
| /admin/monetisation | 338.7 / 341 |
| /my-listings_/$listingId_/edit | 407.6 / 409 |
| /admin/listings_/$listingId_/edit | 413.1 / 414 |
| /post | 407.6 / 408 (inside the band) |
| /post_/$listingId | 407.6 / 408 (inside the band) |
| /my-listings_/$listingId | 329.5 / 330 |
| /my-listings | 321.6 / 322 |
| /admin/listings | 351.4 / 352 |
| /admin/listings_/$listingId | 352.9 / 354 |
| /admin/roles | 296.2 / 299 |
| /admin/roles_/$roleId | 276.6 / 279 |
| / and /c/$slug (entry) | 233.2 / 235 |

/post and /post_/$listingId sit within 0.4 KiB of their ceiling. Step 6's change touches them, so
any growth there is a STOP under the brief.

## 12. K2 (c3, not touched)

The Promote Reach section, the W1 reach row, INC-1037, INC-1040, #431, #432, PR #11's regex,
INC-1083, FE-13's key, and the alias-tick siblings.

Nothing else is changed until the ruling.
