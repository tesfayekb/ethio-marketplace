# Foundations turn D1 — stop 8 (M5a, INC-951 3b: the boundary/core split)

## 1. What landed

- Migration `supabase/migrations/20261028233839_7aad90ab-4b74-453d-99a2-59426ac3206e.sql`, mark
  `20261029050000`. **apply 7aad90ab → expect mark 20261029050000** (after 23f4ae4e and fd0c7d09).
- Three `rate_dials` rows: `staff_moderation` 600/3600, `staff_translation` 2000/3600,
  `staff_machine_translation` 12000/3600.
- Eight `public.<door>_core` functions: the live body (read 23:26 UTC) byte for byte, the same
  arguments, defaults and return type; plpgsql, VOLATILE, SECURITY INVOKER, search_path public; no gate;
  `REVOKE ALL … FROM PUBLIC, anon, authenticated, service_role`.
- Eight doors redeclared whole, name, header and grants unchanged (restated): authority checks copied in
  today's order, then `rate_gate('<dial>')`, then `RETURN`/`PERFORM` of the core.

## 2. Insertion lines (live line numbers in the read body)

| door | the door's checks (live lines) | dial |
| --- | --- | --- |
| admin_allow_listing_photo | 9–17 (signed in, permission, deactivated, step-up) | staff_moderation |
| admin_review_photo_change | 9–12 (signed in, permission; no step-up) | staff_moderation |
| admin_edit_listing | 23–32 (signed in, permission, deactivated, step-up) | staff_moderation |
| admin_move_listing | 13–21 (signed in, permission, deactivated) — see §5 | staff_moderation |
| admin_save_translation | 17–20 (permission, step-up) | staff_translation |
| admin_save_entity_translation | 12–15 (permission, step-up) | staff_translation |
| admin_machine_translation | 13–16 (permission, step-up) | staff_machine_translation |
| admin_machine_entity_translation | 12–15 (permission, step-up) | staff_machine_translation |

## 3. Read-back (ethio-prod)

- Mark `20261029050000`: 1 row. The three dials as above.
- Every core: ACL `postgres=X/postgres` only; md5(prosrc) equals the live door's before the change:
  allow_listing_photo `04b61455…`, edit_listing `07cd57b9…`, machine_entity_translation `99dd2893…`,
  machine_translation `4baa491f…`, move_listing `59c64012…`, review_photo_change `93e17988…`,
  save_entity_translation `66c953cd…`, save_translation `05ae8429…`.

## 4. Proofs (in-file, scratch rows, sentinel rollback) — passed

1. Each core: md5 equals the live body; INVOKER, VOLATILE, search_path public; anon, authenticated and
   service_role cannot execute. Each door: DEFINER; anon cannot, authenticated can, service_role as before
   (save_translation and machine_translation had none and still have none); its body names its dial's
   `rate_gate` before its `_core(` call and holds no INSERT INTO / UPDATE public. / DELETE FROM.
2. Every door, the caller's window full (override 1): the next direct call answers `rateLimited`; no
   audit_log row, no rate_limits count, no listing title/status change, no photo-change review, no
   ui_translations or entity_translations write.
3. Full cycles: admin_review_photo_change and admin_save_translation — call 1 writes its row and audit
   row; call 2 is refused, its change stays unreviewed, the value stays `One`, no revision row.

Two failed attempts before the clean apply, each rolled back whole (proof text only; no function text
changed between attempts): (i) `syntax error at or near "uuid"` — the door's ACL check built a type list
from `pg_get_function_identity_arguments`, which carries names; it now checks by oid. (ii) the door-body
text check matched the permission word `'update'` case-insensitively; it now matches write statements
only (`INSERT INTO|UPDATE public\.|DELETE FROM`, case-sensitive).

## 5. Departures (for the ruling)

- **admin_move_listing:** its step-up sits after its validations on purpose (D137: the severe-restore
  refusal is read before the second factor is asked). Its door therefore carries signed in, permission
  and deactivated, then the gate; the step-up stays in its place inside the core. A move refused at the
  step-up has spent one dial.
- **The cores keep the body's own checks**: "byte for byte" was read as the whole body, so each core re-runs
  the permission and step-up checks after the door. They are reads; it keeps M5b's bulk callers exactly as
  checked as today when they switch to the cores.
- **The press dial's size is my choice:** `machineTranslatePress` 20/3600 (action
  `machine-translate:press` — route dials take the hyphen shape, dials.test.ts), so
  `staff_machine_translation` = 600 × 20 = 12000/3600. DMT-1 holds the product. Please confirm 20.
- **Until M5b lands, the six bulk callers still reach the doors**, so on ethio-prod an import of more than
  2000 translated rows is refused (the whole commit rolls back) for this window.

## 6. App changes (with M5a)

- `src/lib/dials.ts`: `machineTranslatePress` (route), `staffModeration`, `staffTranslation`,
  `staffMachineTranslation` (`countedBy: "door"`).
- `src/routes/api/translate.ts`: `spend(DIALS.machineTranslatePress, userId)` after the scope and target
  checks, before the first AI call; spent → 429 `rateLimited` (with `resetsAt` when known), nothing
  translated or written; a failed count → 503, logged.
- Tests: TRR-10 (a spent press refuses the whole request before any provider call, spend, audit or write;
  one press spends once and writes all 150 keys); `src/lib/dials-machine.test.ts` DMT-1 (the product),
  DMT-2 (the ruled sizes).
- **Strings — finding:** the translations screen shows a refused machine press through its existing
  generic `admin.translations.ai.error` (the error is thrown, never silent). There is no
  translations-specific "rate limited" key; the plan called that a STOP. I did not add one (no Amharic of my
  own). Screening and listings show the existing `admin.listings.move.error.rateLimited` path. A dedicated
  key is for the ruling.

## 7. Checks run

- `bunx vitest run src/routes/api/translate.route.test.ts src/lib/dials-machine.test.ts
  src/server/dials.test.ts scripts/conformance`: 163 passed, 4 timed out under parallel load
  (CF-SL-1/3/6, EXH-21); run alone, 31/31 pass.
- eslint and prettier on the four touched source files: clean.
- Not run: the browser suite (staging lacks M4, M4b and M5a; the operator's apply is pending).

## 8. Next

M5b: the six bulk callers call the cores (each redeclared whole, only the callee name changes), with the
3-row translations import proof under `staff_translation` = 1.
