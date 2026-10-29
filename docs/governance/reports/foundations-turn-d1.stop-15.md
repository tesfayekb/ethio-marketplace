# Foundations turn D1 — stop 15 (M6b-cat2b: staff_config gate, sync/country/language/location doors)

## 1. What this stop covers

Ruling of stop 14, item 3: apply M6b-cat2b (admin_sync_ui_keys, admin_upsert_country,
admin_upsert_language, admin_upsert_location; mark 20261029110000), read the mark back,
compare sha256s, stop. M6c follows, sized at or under 25 KB from the start.

## 2. One safety fix before the apply (scripted patch, not retyped)

The build script's first-call proof for admin_sync_ui_keys was
`admin_sync_ui_keys('{}'::jsonb, '{}'::jsonb)`. That call PASSES the gate and then runs a
real sync of an empty catalogue: ui_sync_mark_orphans('{}') would mark every existing
ui_translations key orphaned on ethio-prod — a real data change from a proof. Patched by
script to `admin_sync_ui_keys('[]'::jsonb, NULL)`, which passes the gate and is then
refused by the door's own validation ('p_en must be a json object') without writing
anything. The other three calls were checked for the same hazard: each is refused by the
door's own validation on scratch arguments (nameRequired / language names required) before
any write.

The other two doors with defaults (sync_ui_keys p_am, upsert_language p_rtl and
p_country_codes) carry them in the CREATE statements (pg_get_function_arguments), the
42P13 lesson from cat2a.

## 3. Apply — CLEAN, first attempt

Applied on ethio-prod as
supabase/migrations/20261029015903_c9372052-a28e-4b34-832f-c91b218dcaac.sql.

The in-migration proof passed: all four doors are the live body plus exactly the gate line
(CR-normalised md5s, old and new; admin_upsert_location carries two gates, one per branch),
the gate after the step-up line and before the first write, header (SECURITY DEFINER,
search_path public) and ACL unchanged (anon cannot execute; authenticated and service_role
can); with staff_config overridden to 1, each door's first call passed the gate and its
next call was refused rateLimited and wrote nothing (catalogue tables, audit_log,
rate_limits unchanged across the refused calls).

Mark read back on ethio-prod: 20261029110000.

## 4. sha256 comparison

- Scratch part (/tmp/m6b/m6b-cat2b.sql): c07be7bce59ab0e03749d589f8f0c9f9481df625119d1393398686c99a6f8188
- Committed file (supabase/migrations/20261029015903_c9372052-a28e-4b34-832f-c91b218dcaac.sql):
  c07be7bce59ab0e03749d589f8f0c9f9481df625119d1393398686c99a6f8188

EQUAL — no drift.

## 5. Linter

The migration tool notes the same 232 pre-existing findings; this migration introduced
none (grants restated, not added).

## 6. IG-6

Not run. Per the stop-14 ruling it runs after the supervisor confirms staging is level
through cat2b. Apply lines for staging:
- apply 20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql → expect mark 20261029100000
- apply 20261029015903_c9372052-a28e-4b34-832f-c91b218dcaac.sql → expect mark 20261029110000

## 7. Registered for M7

INC-969 (stop-14 ruling, item 5): the storage policy category_assets_public_read (SELECT,
anon and authenticated, bucket_id = 'category-assets') lets any client list the bucket.
In M7 it narrows to authenticated callers with has_permission(auth.uid(), 'categories',
'assets'), with a proof that an anon list returns nothing and a staff list still works.
Before writing it: census every storage.list and from('category-assets') caller in src/,
e2e/ and scripts/, and name each in the stop report. The one lister known so far:
src/features/admin-categories/category-images-service.ts:165 (staff prune); e2e uses the
admin client.

## 8. Files modified this turn

- supabase/migrations/20261029015903_c9372052-a28e-4b34-832f-c91b218dcaac.sql (new, applied)
- docs/governance/reports/foundations-turn-d1.stop-15.md (this report)

Scratch (not landed): /tmp/m6b/build-cat2.py, /tmp/m6b/m6b-cat2b.sql.

## 9. Next

M6c (INC-951 3c, the seven import commit/undo doors gated with import_commit / import_undo
in the database, plus the import_undo rate_dials row at 120/3600), sized at or under 25 KB
from the start and split by concern if needed. IG-6 runs once staging is level through
cat2b.
