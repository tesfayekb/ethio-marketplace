# Foundations turn D1 — stop 9 (M5b, INC-951 part 3b: the six bulk callers move to the cores)

## 1. What landed

- Migration `supabase/migrations/20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql`, applied on
  ethio-prod. **apply 3e3ea913 → expect mark 20261029060000.** Mark read back on ethio-prod: `20261029060000`.
- The new string key `admin.translations.ai.rateLimited` (ruling 4) and the route's 429 wired to it.

## 2. M5b — the six callers

Each body was taken from ethio-prod at write time; its `md5(prosrc)` equals the body in its latest
migration file, so the file text is the live text. Each is redeclared whole; the only change is the
callee name. Header (DEFINER, VOLATILE, `search_path=public`) and ACL unchanged.

| Caller | Live md5 (before) | Calls changed | md5 after (read back) |
|---|---|---|---|
| admin_import_translations | 8b49fa8c5e078c995eceff13e12a8271 | 1 × admin_save_translation → _core | d9480129cde6ed8ccf23a4b8fb249d77 |
| admin_commit_category_import | ff02453732c277dfe713d74ea86450b1 | 2 × admin_save_entity_translation → _core | a161c8df3e24550d1962fd6a9430c7a8 |
| admin_commit_location_import | 58ec37ee8531e7469a85360cd4946368 | 2 × admin_save_entity_translation → _core | ff6537cbe59100921b3bc263a783db46 |
| admin_commit_attribute_import | 6e14f510363ef8d7851cf372d085e0a6 | 1 × admin_save_entity_translation → _core | d5d95e418ce4cec746a1bf10a0d33b2b |
| admin_undo_category_import | c91e117b0dcc39cbd36b7caf42347aeb | 1 × admin_save_entity_translation → _core | 31d6df7d11b66a4ce09c1ec293630181 |
| admin_undo_listing_edit | 2c7f4f98e5f51b9f6456198918b0080b | 1 × admin_edit_listing → _core | ca70dc4662e277b6040246a4c2428eae |

The rewrite was done by a script (each match of `public.<door>(` was replaced, and the new length was
checked to be exactly 5 × the number of calls longer). The migration file matches the reviewed scratch
copy except for the final newline.

ACL restated exactly as it is today: `admin_import_translations` is
`{postgres=X/postgres,authenticated=X/postgres}`. It has no service_role grant today and gets none here,
because ruling 3 allows only the callee name to change. The other five keep their service_role grant.
**Note for ruling:** rule E2 says a redeclaration should restate `GRANT ALL … TO service_role`. I left
that out here because of "only the callee name". Adding it would be a separate, small migration.

`admin_undo_listing_edit` still sets `app.listing_undo` around the call. `admin_edit_listing_core` is
the door's old body byte for byte, so it reads that flag the same way.

## 3. Proofs (in the migration's DO block, all passed on ethio-prod)

1. Each of the six callers: the body's md5 is the one written; there is no `public.<door>(` call left and
   at least one `public.<door>_core(` call; DEFINER/VOLATILE/search_path and ACL text are unchanged.
1b. `admin_save_translation_core`, `admin_save_entity_translation_core`, `admin_edit_listing_core`: not
   executable by authenticated or service_role.
2. Ruling 5: a scratch super_admin with step-up and `staff_translation` overridden to 1 imported 3 rows
   through `admin_import_translations`. Result: imported = 3, 3 rows stored, and the user's
   `rate_limits` window held 0 (the bulk path spends nothing on the door dial). After that, one direct
   `admin_save_translation` call succeeded, the next was refused with `rateLimited`, and its row kept its
   import value. All scratch rows rolled back (sentinel exception).

## 4. Ruling 4 — the dedicated message

- `admin.translations.ai.rateLimited` added to `src/i18n/locales/en-admin.ts` and `am-admin.ts`, right
  after `admin.translations.ai.error`. Both lines were written by a script from the ruling's text, not
  retyped.
- am value read back from the file: 51 characters, sha256 prefix **d2b92bcb0486c2b2** (matches the
  ruling). Every character is U+1200–U+137F or a space (checked by the script).
- `src/features/admin/translations/translations-service.ts`: `postTranslate` throws
  `MACHINE_TRANSLATE_RATE_LIMITED` when the route answers 429. `translationErrorKey` maps that to the new
  key. This check runs before the import's `rateLimited` → `fileTooMany` match, so an import refusal
  keeps its own key. `serverMessage` shows no detail line for it.
- Test TRS-6 (translations-service.test.ts): a 429 `{error:"rateLimited"}` shows
  `admin.translations.ai.rateLimited` with no detail line, and a plain `rateLimited` error still maps to
  `admin.translations.error.fileTooMany`.
- `bun run i18n:usage` was run and the maps regenerated. `i18n:map-guard` passes.

## 5. IG-6 run (e2e/import-security.spec.ts, whole, both projects, 0 retries)

**Not run: blocked because staging is behind.** `bun run e2e:local -- e2e/import-security.spec.ts` (with
`E2E_CHROMIUM_PATH=/bin/chromium`, the guard's remedy 2; the managed Chromium in this sandbox is a
different build) passed map-guard, port-guard, browser-guard and the build. The parity check then stopped
it before any test ran:

```
Error: STAGING BEHIND: apply 20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql to ethio-staging before E2E can pass
```

That file is M5a, which the operator applies next. M5b (this stop) has to follow it to staging too. So
there are no counts to paste. The run happens once both are on staging.

## 6. Checks this stop

- vitest `translations-service.test.ts` + `translate.route.test.ts`: 2 files, 15 tests passed.
- eslint and prettier `--check` clean on the four touched source files.

## 7. Files touched

- `supabase/migrations/20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql` (new)
- `src/i18n/locales/en-admin.ts`, `src/i18n/locales/am-admin.ts`
- `src/features/admin/translations/translations-service.ts`, `translations-service.test.ts`
- the i18n usage maps (regenerated)
- this report

## 8. K2 / open

- Ruled (stop 9): E2 means restate the existing grants, not add new ones; `admin_import_translations` keeps its live ACL with no service_role, because a new grant would be a new surface with no reason.

- E2 service_role grant on `admin_import_translations` (section 2): needs a ruling.
- The bulk callers have no dial of their own until M6 (commit/undo dials). Until then they are bounded
  only by their own permission and step-up checks. This was expected by ruling 3.
- The linter's 232 warnings were already there before this migration (SECURITY DEFINER executable by
  signed-in users ×213 / public ×18, extension in public ×1). M5b added none.

Next after "continue": M6.
