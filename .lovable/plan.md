# Foundations turn D1 — DRAFT of the seven migrations (plan mode; nothing saved or applied)

Ruling 13f9f6a2 is folded in (C1–C5, ORDER). Every redeclaration below comes from `pg_get_functiondef` read today on ethio-prod.

**One limit.** `validate_listing_draft` (20,614 characters live) and `public_listing_json` (11,563) would push the plan past its 50K hard limit if written whole, and so would 3b/3c's 39 doors. They are drafted here as exact hunks against the live text: the migration file is the live definition, byte for byte, with only these hunks applied. Each migration's file will be the whole redeclaration, re-read live at write time. A changed live body at write time is a STOP.

**Marks.** The G39 rule: now() UTC on ethio-prod, rounded up to the next hour, plus one hour, and above the ledger's newest mark (today 20261025150000). Each mark is re-derived when its file is written. The provisional marks, in ORDER:

| # | Concern | Provisional mark |
|---|---|---|
| M1 | INC-963 pin | 20261029000000 |
| M2 | INC-793 price pair | 20261029010000 |
| M3 | INC-949 place predicate | 20261029020000 |
| M4 | INC-951 3a | 20261029030000 |
| M5 | INC-951 3b | 20261029040000 |
| M6 | INC-951 3c | 20261029050000 |
| M7 | INC-939 buckets | 20261029060000 |

**Closers.** Every redeclared function keeps its live ACL and restates it in the file. The member and staff doors get `REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO authenticated, service_role`. The service-only doors (`public_listing_json`, `validate_listing_draft`) get `REVOKE ALL … FROM PUBLIC, anon, authenticated; GRANT EXECUTE … TO service_role`. Each file ends with a definition and ACL read-back that RAISEs on a difference. There is no DROP anywhere, because no argument list changes.

**Proofs.** Proofs follow the existing scratch pattern (20261005172453 :1163–:1214). Everything runs inside one inner `BEGIN … EXCEPTION`:
- a scratch `auth.users` row (`@example.invalid`), roles when needed and `request.jwt.claims`;
- the assertions, each a `RAISE EXCEPTION` on failure;
- a final `RAISE EXCEPTION '<tag>-proof-ok'`, which rolls back every scratch row. Any other message re-raises.

## STOP before the build: C4 cannot be done as ruled

The storage-bucket tool takes only `public`, `file_size_limit` and `remove_file_size_limit`. It has **no allowed_mime_types parameter**, and SQL writes to `storage.buckets` are rejected by the platform. So I can set the sizes on ethio-prod, but **not the mime lists**. A ruling is needed. One option: the operator sets the mime lists on ethio-prod in the dashboard (as on staging), and M7's proof RAISEs until both settings match.

A second point for M7: the tool's size argument is written with a unit. Whether "1MB" stores 1,000,000 or 1,048,576 is unproven. After the call, the stored number is read back, and anything other than 1048576 gets the next try or a STOP.

## M1 — INC-963: the pin door refuses a missing precision

**Live header:** `set_listing_pin(p_listing_id uuid, p_lat numeric DEFAULT NULL, p_lng numeric DEFAULT NULL, p_precision text DEFAULT NULL, p_street text DEFAULT NULL, p_zoom smallint DEFAULT NULL, p_directions text DEFAULT NULL)`, plpgsql, provolatile v, prosecdef true, proconfig `{search_path=public}`. Execute is granted to authenticated and service_role.

**Change:** the whole live body, with one hunk. The defaults stay, so a call that sends no pin at all (lat/lng NULL) still clears the pin as today. Only a pin sent without a precision is refused.

```sql
-    v_prec := lower(btrim(coalesce(p_precision, 'exact')));
+    -- INC-963 — a pin's precision is known before it is stored: none sent is refused.
+    IF p_precision IS NULL OR btrim(p_precision) = '' THEN
+      RAISE EXCEPTION 'badPrecision:missing';
+    END IF;
+    v_prec := lower(btrim(p_precision));
```

The refusal comes after the door's existing gates: auth, `rate_gate('revise')` at live :371, ownership, and `contactInNote`. Its place in the order is unchanged.

**C1, existing key:** `posting-service.ts:1142 pinAnswer` maps any message other than `contactInNote` or `rateLimited` to `"failed"`. That is the wizard's existing failed-save message on the Where step, so there is no new string and no app change. Both app callers already send a precision (`posting-service.ts:1186` and `:1242`), as does `e2e/legal-certify.spec.ts:341`.

**Proof (M1):**
- Set up a scratch user and claims, a scratch category and a scratch draft listing owned by that user. The listing columns are copied from the live `listings` NOT NULL set at write time.
- (a) `set_listing_pin(v_listing, 9.03, 38.74, NULL)` must raise `badPrecision:missing`. Afterwards `pin_lat`, `pin_lng` and `pin_precision` must still be NULL, and `listing_revisions` for the listing must count 0.
- (b) The same call with `''` behaves the same.
- (c) The positive control: with `'approx'` it stores `pin_precision = 'approx'`.

**App/test changes:** none required. `pin.ts` gets a unit test that the door's argument always carries a precision (rule test, red-first is not possible since it already holds; stated).

## M2 — INC-793: the draft door keeps the price pair at every step

**Live header:** `validate_listing_draft(p_uid uuid, p_step smallint, p_category_id uuid, p_title text, p_description text, p_video_url text, p_attributes jsonb, p_price_mode text, p_price_amount numeric, p_price_currency character, p_price_period text, p_poster_expires_at timestamptz, p_coverage uuid[], p_contact_pref jsonb, p_prior jsonb, p_price_bp integer DEFAULT NULL, p_price_negotiable boolean DEFAULT false)`, plpgsql, provolatile v, prosecdef true, proconfig `{search_path=public}`. Execute is granted to service_role only.

**Census (listings price checks against the door's output):**

| Constraint | Step 4 and above (live) | Below step 4 (live) | After M2 |
|---|---|---|---|
| price_pair_check: amount with currency | the currency falls back to the home market; a missing one is refused `required` | the amount is output when fixed; `v_cur := upper(p_price_currency)` is NULL when not sent, which **breaks the pair** (INC-793). A currency with no amount also breaks it | the pair is kept or refused at every step |
| price_pair_check: commission means amount and currency NULL, otherwise bp NULL | the output CASEs null them | the output CASEs null them | unchanged (holds) |
| free_has_no_price | the amount is output only when fixed | same | holds |
| price_mode_check | checked as `badValue` | **not checked**: an unknown mode reaches the table | `badValue` at every step |
| price_period_check | checked as `badValue` | **not checked** | `badValue` at every step |
| price_bp_check 1–10000 | **not checked** at any step | not checked | `badValue` at every step (the brief's census finding; ruling invited) |
| currency is a known currency | `unknownCurrency` | not checked | `unknownCurrency` at every step |

Item 6 (bp at step 4 and above) needs its hunk in the step-4 branch too. The plan below adds it in both places. If the supervisor prefers, only the below-step-4 part ships, and step 4's bp is filed as an incidental finding.

**Hunk 1** (the live `ELSE` branch of `IF p_step >= 4`):

```sql
   ELSE
     v_period := coalesce(p_price_period, v_cat.default_price_period);
     v_cur := upper(p_price_currency);
+    -- INC-793 — below the price page the door's output still meets every listings
+    -- price constraint: a known mode and period, the amount paired with its currency.
+    IF v_mode NOT IN ('fixed','free','contact','commission') THEN
+      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_mode','reason','badValue','detail',v_mode));
+    END IF;
+    IF v_period IS NOT NULL AND v_period NOT IN ('once','hour','day','week','month','year') THEN
+      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_period','reason','badValue','detail',v_period));
+    END IF;
+    IF v_mode = 'fixed' AND p_price_amount IS NULL THEN
+      v_cur := NULL;
+    ELSIF v_mode = 'fixed' THEN
+      IF v_cur IS NULL THEN
+        SELECT d.home_country_code INTO v_home FROM public.user_directory d WHERE d.user_id = p_uid;
+        v_cur := (SELECT k.currency_code FROM public.countries k WHERE k.code = v_home);
+      END IF;
+      IF v_cur IS NULL THEN
+        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','required'));
+      ELSIF NOT EXISTS (SELECT 1 FROM public.currencies c WHERE c.code = v_cur) THEN
+        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_currency','reason','unknownCurrency','detail',v_cur));
+        v_cur := NULL;
+      END IF;
+    END IF;
+    IF v_mode = 'commission' AND p_price_bp IS NOT NULL AND (p_price_bp < 1 OR p_price_bp > 10000) THEN
+      v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','badValue','detail',p_price_bp::text));
+    END IF;
   END IF;
```

**Hunk 2** (step 4 and above, inside `ELSIF v_mode = 'commission'`, after the live `p_price_bp IS NULL → required` line):

```sql
       IF p_price_bp IS NULL THEN
         v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','required'));
+      ELSIF p_price_bp < 1 OR p_price_bp > 10000 THEN
+        v_ref := v_ref || jsonb_build_array(jsonb_build_object('field','price_bp','reason','badValue','detail',p_price_bp::text));
       END IF;
```

**C1, existing keys:** these refusals reuse the door's own field+reason pairs (`price_currency/required`, `price_currency/unknownCurrency`, `price_mode/badValue`, `price_period/badValue`) that the step-4 branch already returns, and the wizard already maps them. `price_bp/badValue` is new as a pair. At build, `rg` confirms that the field-refusal mapper (`src/features/posting/field.ts`) has a key for `price_bp` with `badValue`, or a field-level fallback key. If none exists, that is a STOP (no new string). The app always sends a paired price (`use-draft.ts:256–257` sends no currency without an amount), so no app change is expected.

**Proof (M2):**
- Set up a scratch user, a `user_directory` row with a home country whose currency exists, and a scratch price-enabled category.
- (a) At step 2, a fixed mode with amount 100 and no currency is answered `ok` with `price_currency` = the home currency, and inserting that output into a scratch listing raises no 23514.
- (b) The same with no home currency is answered with `price_currency/required`, and nothing is stored.
- (c) Mode `'bogus'` at step 2 is answered with `price_mode/badValue`.
- (d) Period `'fortnight'` at step 2 is answered with `price_period/badValue`.
- (e) A currency with no amount at step 2 outputs a NULL currency.
- (f) At steps 2 and 4, commission with bp 0 is answered with `price_bp/badValue`.
- For each refusal, the scratch listing's price columns must be unchanged.

## M3 — INC-949: one place predicate for every public read of places

**New function** `public.place_is_shown(p_id uuid) RETURNS boolean`, language sql, STABLE, SECURITY INVOKER, `SET search_path = public`:

```sql
CREATE FUNCTION public.place_is_shown(p_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY INVOKER
 SET search_path TO 'public'
AS $function$
  -- INC-949 — the location tree's one rule (get_location_tree, 20260915190024):
  -- an active place in an open market whose country anchor and ancestors are active.
  SELECT EXISTS (
    SELECT 1 FROM public.locations l
     WHERE l.id = p_id
       AND l.is_active
       AND EXISTS (SELECT 1 FROM public.countries k
                    WHERE k.code = l.country_code AND k.is_active)
       AND EXISTS (SELECT 1 FROM public.locations a
                    WHERE a.country_code = l.country_code
                      AND a.level = 'country' AND a.is_active)
       AND (
            l.level = 'country'
         OR l.level = 'region'
         OR (l.level = 'city'
             AND EXISTS (SELECT 1 FROM public.locations r
                          WHERE r.id = l.region_id AND r.is_active))
         OR (l.level = 'sub_city'
             AND EXISTS (SELECT 1 FROM public.locations c
                          WHERE c.id = l.city_id AND c.is_active)
             AND EXISTS (SELECT 1 FROM public.locations r
                          WHERE r.id = l.region_id AND r.is_active))
       ));
$function$;
REVOKE ALL ON FUNCTION public.place_is_shown(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.place_is_shown(uuid) TO service_role;
```

It has no browser grant, so no allowlist line. Its callers are SECURITY DEFINER doors owned by postgres, so an INVOKER predicate runs as their owner.

**Indexes:** all existing, and none added.
- `locations_pkey (id)` serves `l.id`, `r.id` and `c.id`.
- `countries` primary key serves `k.code`.
- `locations_country_idx (country_code)` serves the anchor, and `locations_active_idx … WHERE is_active` sits beside it.

**`get_location_tree(p_country_code text)`:** language sql, STABLE, DEFINER, `{search_path=public}`, execute granted to anon, authenticated and service_role. The whole live text, with its WHERE reduced to the shared rule. It is equivalent because `l.country_code = upper(p_country_code)` makes the market and anchor checks the same rows.

```sql
-   WHERE l.country_code = upper(p_country_code)
-     -- the market must be OPEN …
-     AND EXISTS (SELECT 1 FROM public.countries k ... AND k.is_active)
-     ... (live :12–:31, the anchor, l.is_active and the level/ancestor block)
+   WHERE l.country_code = upper(p_country_code)
+     -- INC-949 — the tree's one rule, shared with every public read of places.
+     AND public.place_is_shown(l.id)
```

The ORDER BY is unchanged. Performance: one predicate call per row of one country's places (the same EXISTS probes as today, on the same indexes). The read is version-cached on the public path.

**`public_listing_json(l listings, p_viewer uuid)`:** plpgsql, STABLE, DEFINER, `{search_path=public}`, execute granted to service_role. The whole live text with one hunk in the places select (live :205–:214). `v_coverage` stays unfiltered, because it is the ad's coverage record and not a displayed list (ruling invited).

```sql
-  SELECT coalesce(jsonb_agg(jsonb_build_object('id', loc.id, 'name_en', loc.name_en, 'name_am', loc.name_am,
-                                               'level', loc.level, 'slug', loc.slug, 'country_code', loc.country_code,
-                                               'position', ll.position, 'map_visible', ll.map_visible)
-                            ORDER BY ll.position), '[]'::jsonb),
+  -- INC-949 — the list names only places the tree shows, each with its ancestor
+  -- path (country first) for the Maps address (turn 34f-2's review, MAJOR 3).
+  SELECT coalesce(jsonb_agg(jsonb_build_object('id', loc.id, 'name_en', loc.name_en, 'name_am', loc.name_am,
+                                               'level', loc.level, 'slug', loc.slug, 'country_code', loc.country_code,
+                                               'position', ll.position, 'map_visible', ll.map_visible,
+                                               'path', (SELECT coalesce(jsonb_agg(jsonb_build_object(
+                                                          'id', a.id, 'name_en', a.name_en, 'name_am', a.name_am,
+                                                          'level', a.level, 'slug', a.slug)
+                                                        ORDER BY CASE a.level WHEN 'country' THEN 0
+                                                                              WHEN 'region' THEN 1 ELSE 2 END),
+                                                        '[]'::jsonb)
+                                                  FROM public.locations a
+                                                 WHERE a.id <> loc.id
+                                                   AND (a.id = loc.region_id OR a.id = loc.city_id
+                                                        OR (a.level = 'country' AND a.country_code = loc.country_code))))
+                            ORDER BY ll.position) FILTER (WHERE public.place_is_shown(loc.id)), '[]'::jsonb),
          coalesce(jsonb_agg(to_jsonb(loc.id) ORDER BY ll.position), '[]'::jsonb)
```

The path query uses `locations_pkey` and `locations_country_idx`. Ancestor names in other languages go through the app's existing `entityName` over `id`, as the place names do today.

**App changes landing with M3 (order matters):** the ad-page reader's place shape (in `src/lib/schemas/…`; `.strict()`) gains `path` as an array of `{ id, name_en, name_am, level, slug }`, and the Maps address builder reads it. Because the shape is strict, the app change must reach dev **before** M3 is applied on staging and prod. Otherwise the readers refuse the new key. The build turn lands the app change first, as an optional `path`, and the migration next. The Maps address uses existing strings only.

**Proof (M3):**
- Set up a scratch market: a `countries` row with an unused code (the proof RAISEs if it already exists), its country anchor, regions R1 (active) and R2 (switched off), city C1 under R1 (active), city C2 under R1 (switched off) and city C3 under R2 (active).
- Set up a scratch seller and listing, with `listing_locations` on C1, C2 and C3.
- (a) `get_location_tree(code)` contains C1 and contains neither C2 nor C3.
- (b) `public_listing_json(listing, NULL)->'places'->'list'` contains C1 only.
- (c) C1's `path` lists the country anchor, then R1.
- (d) `place_is_shown(C2)` and `place_is_shown(C3)` are false; C1's is true.

## M4 — INC-951 3a: five doors, each with its own dial

**The gate line:** each door uses the shape the member doors already use (`set_listing_pin` :371):
`IF NOT coalesce((public.rate_gate('<dial>')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;`

It is placed after the door's permission and step-up gates and before its first write (F5). `rate_gate` also calls `assert_caller_active()`, so a deactivated staff caller now meets that refusal first. That is a new refusal on these doors, and the build's census names each door's callers in the order they reach it.

**New dials:** five rows in `public.rate_dials (action, max_count, window_seconds)`, all `countedBy: "door"`, each declared in `src/lib/dials.ts`:

| Dial (action) | Limit / window | Reason |
|---|---|---|
| `import_audit` | 600 / 3600 | about 2 events per import (preview, then commit or refusal). The route allows 30 per minute per family, and a real staff day runs dozens of imports, not hundreds an hour |
| `legal_accept` | 60 / 3600 | a person accepts at most the few documents in force, once each |
| `photo_remove` | 100 / 86400 | equal to the route's own day dial `photoRemoveDay` (`dials.ts`), so the route answers first and the door is the last line |
| `impersonation` | 30 / 86400 | sessions last 15 minutes and one may be open at a time. 30 a day is far beyond a support shift |
| `legal_export` | 60 / 3600 | it counts only first pages (the audited write). Ten documents times a few exports an hour stays under it |

**The five redeclarations:** each is the whole live text with one inserted line.
- **import_gate_audit** (plpgsql, volatile, DEFINER, `{search_path=public}`, authenticated + service_role): `IF … rate_gate('import_audit') …` after the permission check (live :24–:26), before `INSERT INTO public.audit_log`.
- **accept_legal** (`p_version_ids uuid[], p_language text, p_adult boolean, p_data_consent boolean DEFAULT false`; plpgsql, volatile, DEFINER, `{search_path=public}`, authenticated + service_role): after `PERFORM public.assert_caller_active();`, before the list checks. One call counts once, however many documents it accepts.
- **remove_listing_photo** (`p_listing_id uuid, p_photo_id uuid`; same header attributes and grants): after the "photo not found on this listing" check, before the UPDATE, DELETE and INSERT.
- **begin_impersonation** (`p_target uuid, p_reason text`; RETURNS TABLE; same header attributes and grants): after `PERFORM public.require_step_up_if_needed('impersonation', 'use');`, before the INSERT and `log_audit`.
- **admin_export_legal_acceptances** (`p_version_id uuid, p_after_at timestamptz DEFAULT NULL, p_after_id uuid DEFAULT NULL, p_limit integer DEFAULT 1000`; same header attributes and grants): inside `IF p_after_at IS NULL THEN`, before its INSERT. Only the first page writes, so only the first page counts.

**Proof (M4):** set up a scratch super_admin user (the 20261005172453 pattern, including aal2 and totp so step-up passes), scratch documents, a version and a listing as each door needs, and a `rate_overrides` row of max 1 for the scratch user on each of the five actions. For each door:
- call 1 succeeds and writes its row;
- call 2 raises `rateLimited`;
- the door's table count for the scratch keys is unchanged after call 2 (audit_log, legal_acceptances, listing_photo_changes, impersonation_sessions, audit_log).

**App changes:**
- `src/lib/dials.ts` gets five entries (`countedBy: "door"`, with action names snake_case as `scripts/conformance/dials.test.ts:82` requires).
- `src/server/imports/gate.ts` maps `rateLimited` from the audit call to the gate's existing rate refusal, whose key the import route already shows for its own budget.
- Admin legal/impersonation callers map `rateLimited` to the existing rate-limited key. `rg` at build lists each. A caller with no existing key is a STOP.

## M5 — INC-951 3b: staff moderation and translation, two shared dials

| Dial | Doors | Limit / window | Reason |
|---|---|---|---|
| `staff_moderation` | admin_allow_listing_photo, admin_review_photo_change, admin_edit_listing, admin_move_listing | 600 / 3600 | one decision about every 6 seconds for an hour, beyond any human queue |
| `staff_translation` | admin_save_translation, admin_save_entity_translation, admin_machine_translation, admin_machine_entity_translation | 2000 / 3600 | per-key saves. The machine buttons are pressed per key (callers re-checked at build; a bulk loop found there sets the limit from its batch size instead) |

**Per door:** the whole live text, re-read at write time, with the gate line placed after its permission (and step-up where present) check and before its first INSERT or UPDATE. The exact insertion point is named per door in the stop report with its live line number.

**Proof (M5):** a scratch super_admin, an override of max 1 on both actions, and one representative door per dial on scratch rows: a scratch listing photo change, and a scratch `ui_translations` key `e2e-d1-…`. Call 2 raises `rateLimited` and writes no audit_log or revision row. A text read-back over all eight doors RAISEs if any body lacks its gate before its first write. That check is on the definition text, not the planner.

**App changes:** the four consoles' callers map `rateLimited` to the existing key (screening and listings already have it; translations are checked at build, and no key means a STOP). `dials.ts` gets two entries.

## M6 — INC-951 3c: staff config writers and import commit/undo

| Dial | Doors | Limit / window | Reason |
|---|---|---|---|
| `staff_config` | admin_add_category_pointer, admin_add_legal_translation, admin_commit_category_import's sibling writers listed live: admin_create_category, admin_create_role, admin_discard_legal_draft, admin_link_attribute, admin_mark_legal_reviewed, admin_publish_legal_version, admin_save_legal_draft, admin_set_ai_feature, admin_set_country_active, admin_set_country_exclusions, admin_set_country_root_order, admin_set_coverage_plan, admin_set_legal_settings, admin_set_listing_policy, admin_set_role_permission, admin_set_translator_languages, admin_sync_ui_keys, admin_update_profile, admin_upsert_attribute, admin_upsert_country, admin_upsert_language, admin_upsert_location, assign_role | 600 / 3600 | a console editor's busiest hour is tens of saves. 600 is one every 6 seconds |
| `import_commit` | admin_commit_attribute_import, admin_commit_category_import, admin_commit_location_import, admin_undo_attribute_import, admin_undo_category_import, admin_undo_location_import, admin_undo_import | 120 / 3600 | each commit is a whole file. The route already allows 30 per minute per family for previews; commits and undos are a handful a day |

**Per door:** the same as M5, with the whole live text and the gate after the permission and step-up checks, before the first write. `admin_sync_ui_keys` is run by the platform's key sync. Its caller is checked at build, and if it is a service-role job, `rate_gate` returns allowed with a NULL uid, so nothing changes for it.

**Proof (M6):** an override of max 1 on both actions. A representative config door (`admin_upsert_language` on an `e2e-d1` code) and a representative import door (`admin_commit_location_import` on a scratch market), each refused on call 2 with no row written. Plus the same text read-back over all 31 doors.

**App changes:** the admin consoles' save errors map `rateLimited` to the existing key (checked per console at build; none means a STOP). `dials.ts` gets two entries.

## M7 — INC-939: buckets allow only what their doors allow

**Tool calls on ethio-prod (not SQL):**
- `supabase--storage_update_bucket(name="listing-photos", file_size_limit="1MB")`, then read back `file_size_limit = 1048576`.
- `category-assets`: the size stays at its live 10,485,760, so no call is made.

**Mime lists:** see the STOP above. `listing-photos` needs `{image/jpeg,image/png,image/webp}` (`photo.ts:124–128`) and `category-assets` needs `{image/png,image/webp}` (`category-image-variants.ts:179, :211`).

**The migration (marks only plus the proof):**

```sql
DO $proof$
DECLARE v_size bigint; v_types text[];
BEGIN
  SELECT file_size_limit, allowed_mime_types INTO v_size, v_types
    FROM storage.buckets WHERE id = 'listing-photos';
  IF v_size IS DISTINCT FROM 1048576
     OR v_types IS NULL
     OR NOT (v_types @> ARRAY['image/jpeg','image/png','image/webp']
             AND v_types <@ ARRAY['image/jpeg','image/png','image/webp']) THEN
    RAISE EXCEPTION 'INC-939: listing-photos is % / %', v_size, v_types;
  END IF;
  SELECT file_size_limit, allowed_mime_types INTO v_size, v_types
    FROM storage.buckets WHERE id = 'category-assets';
  IF v_size IS DISTINCT FROM 10485760
     OR v_types IS NULL
     OR NOT (v_types @> ARRAY['image/png','image/webp']
             AND v_types <@ ARRAY['image/png','image/webp']) THEN
    RAISE EXCEPTION 'INC-939: category-assets is % / %', v_size, v_types;
  END IF;
END;
$proof$;
INSERT INTO public.migration_marks (version) VALUES ('<M7 mark>');
```

**App change (C3):** `src/routes/api/upload/photo.ts` exports `PHOTO_BUCKET_BYTES = 1024 * 1024`, the cover's default. Every variant's limit becomes `Math.min(envDial(env, bytes), PHOTO_BUCKET_BYTES)`. Every variant is capped, not only the cover, because a raised `MAX_MID_BYTES` could also pass the bucket's limit. A route test (in the existing `photo` route tests) sets `MAX_COVER_BYTES=5000000` and shows that a 1,048,577-byte cover is refused as `tooLarge` with detail `1048576`. That is the route half of "a stored file is what its door allowed".

## Files (the approved list, as drafted)

- `supabase/migrations/`: seven files, M1–M7, written by the migration tool, one at a time.
- `src/lib/dials.ts`: nine door dials.
- `src/routes/api/upload/photo.ts` and its test (C3).
- `src/lib/schemas/…`: the ad-page place shape gains `path`, and the Maps address reader uses it (M3; lands before M3 is applied).
- `src/server/imports/gate.ts` and `route.test.ts` (M4).
- The admin and member callers' `rateLimited` mapping, where it is not already present (M4–M6; existing keys only).
- `src/features/posting/map/pin.ts` test (M1).
- `e2e/`: only specs whose door answer changes (`import-security`, `post-wizard-place`); none expected otherwise.
- `docs/features/`: posting, locations, media, imports and dials, plus `_changelog.md`.
- `docs/tracking/incidental-findings.md`: the bp-at-step-4 finding if the supervisor does not take it into M2.
- `docs/governance/reports/foundations-turn-d1.report.md` and `.stop-N.md`.

## Questions for the ruling

1. C4: who sets the mime lists on ethio-prod, since the tool cannot?
2. M2: does the bp range check at step 4 and above ship in M2, or go to the incidental findings?
3. M3: should `v_coverage` stay unfiltered?
4. M3: the app shape lands before the migration. Is that acceptable?
5. M5/M6: are the whole bodies to be read live at write time, with insertion lines named in each stop report?
