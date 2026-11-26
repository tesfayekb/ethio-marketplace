STOP — cursor-bundle-7c part 2: a family's codes come from more than its doors' `door_refuse` codes
DONE: STEP 0 (brief saved, sha256 0cdb28e2…32ec9 equal), the census, part 1 (e30ebddd6)
LEFT: parts 2, 3, 4; STEP 6 onward
CI: dev's last completed run, read from ci-evidence before any edit —
# CI Status (auto-generated — do not edit by hand)

- Commit: `72fb1d4709bdfe8848a457c5ecbcdf7c93f26c8d` (short `72fb1d4`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-26T06:32:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45767751214
(this branch: not yet run)
FILES:
docs/features/doors.md
docs/governance/briefs/cursor-bundle-7c.md
roadmap.md
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/doors/manifest.ts
scripts/doors/manifest.txt

## Part 1, done

The judge now walks every public function a door's body calls, by key, transitively and across
overloads. It does not follow the gate (`door_context`, `door_refuse`, `door_refused`). It strips the
live definition's `CREATE … AS $function$` header, so static and live agree. Two new finding kinds:
- `callee-code-missing`: a callee refuses a code the line lacks.
- `callee-unread`: a callee's code is not a literal, or it runs dynamic SQL.

Both kinds fire on planted fixtures in the self-test: SELF_TEST OK, 23 kinds. A clean callee case
passes too. 39 manifest lines were widened by script, the export doors at :41 and :42 included, and
`check-doors --static` reads 227 lines OK. DOORS-22 proves the walk two calls deep, the overload,
the gate exclusion, live/static parity, and both `admin_export_attributes` overloads reaching
`unknownCategory` from `attr_export_payload(text)` (20261120030200 :171).

What the judge does not follow: triggers. `locations_ancestry_guard` (migration 20260916215832 :96)
refuses through `door_refuse` from a trigger on `locations`, so a door that writes `locations` does
not get its codes. The walk also reads text, not branches. For example, `admin_review_listing` gains
`transition_listing_core`'s `ownerOnly`, `serviceOnly` and `enforcementOnly`, which its fixed caller
mode never reaches.

## The premise that does not hold

The brief: "its `words` are typed over exactly those doors' codes minus the codes the shared words
already carry … an extra word for a code no listed door answers is a type error too."

The census shows a family's words also cover codes that reach people by other paths. None of these
paths is a `door_refuse` literal, so none is in a door's codes:
1. A plain `RAISE EXCEPTION '<code>'`: 13 doors (`baselineMissing`, `marketNotSet`,
   `acceptanceRequired`, `certificationRequired`, `badLanguage`, …).
2. Returned refusals (`{ok:false, refusals:[{reason}]}`): 23 doors (the posting contract, the import
   plans and commits).
3. The trigger above: `crossCountry`, `levelMismatch`, `notAChild`, `cannotMoveCountry`, … in
   `LOCATION_REFUSALS` (src/features/admin-locations/location-refusals.ts:22).
4. A route's `clientError` literal (`forbidden`, `badScope`, `wrongFile`, `badHeader`, `fileTooLarge`,
   …): `ATTRIBUTE_EXPORT_REFUSALS`, `CATEGORY_REFUSALS`, `COUNTRY_REFUSALS`, `TRANSLATION_REFUSALS`,
   `FLAG_REFUSALS`.
5. Client codes:
   - the form gate's `required`: `ROLE_REFUSALS`, `LEGAL_REFUSALS`, `REASON_REFUSALS`,
     `MONETISATION_REFUSALS`, `SETTINGS_FORM_REFUSALS`, `AUTH_FORM_REFUSALS`;
   - the parser's `badType`;
   - `contact` and `long` in step-where.tsx:166 and :170;
   - `tooShort` in auth_.reset.tsx:52.
6. Families that call no door: `AUTH_REFUSALS` (auth-error-key.ts:57), `MFA_REFUSALS`
   (mfa-refusals.ts:17), `MFA_ENROLL_REFUSALS` (mfa-service.ts:96).
7. Words whose source the census could not find: `noFreeSlot` in `DECISION_REFUSALS`
   (use-screening.ts:293), `MOVE_REFUSALS` and `EDIT_REFUSALS` (listing-refusals.ts:30 and :38),
   `TIER_REFUSALS`, `UNDO_REFUSALS` and `PHOTO_REMOVE_REFUSALS`; `resume_listing`'s RAISE of it
   (20261104153959 :128) is not its last declaration.

The census attributed doors to each family by the doors its own module calls. On that heuristic, 34
families hold a word that the strict type would call extra. Typing "exactly" would delete words
people see today, which is a behaviour change, or would fail the build at once.

## Codes with no words at all

These codes are answered by doors that `src/` calls, and no family anywhere words them. This is a
floor: the per-family missing list is longer, because a code worded in one family can be missing from
another.

- `accept_legal`: `adultRequired`, `notApplicable`
- `admin_reactivate_category`: `alreadyActive`
- `get_attribute_options`: `attributeNotFound`
- `report_listing`: `badReason`
- `admin_open_report_counts`, `admin_photo_link_rows`, `admin_warned_listings`, `my_saved_listings`:
  `badSize`
- `admin_edit_listing`, `admin_undo_listing_edit`: `categoryFixed`
- `admin_move_listing`, `admin_review_listing`, `resume_listing`, `set_listing_level`,
  `transition_listing` (through `transition_listing_core`): `enforcementOnly`, `ownerDeleted`,
  `reviewerOnly`, `serviceOnly`
- `user_set_preferred_language`: `languageNotPublished`
- `remove_own_password`: `lastSignInMethod`
- `user_set_preferred_language`, `user_set_viewing_location`: `noProfile`
- `user_set_viewing_location`: `placeNotOpen`
- `my_legal_version`: `notYours`
- `admin_retire_category`: `reassignTargetInvalid`
- `admin_create_category`: `slugTaken`

Under FLAGS no-new-string, these need the supervisor's EN + AM text, or a ruling that names the
existing key each one reuses. The brief's own clause covers this: "the report names it as a STOP
with the code and its door, and the supervisor supplies both languages".

## The questions

Q1 — Which codes does the family type cover?
- (A) The generator reads every source it can: `door_refuse` codes as Part 1 has them, plus
  code-shaped plain RAISEs, `'reason', '<code>'` literals in returned refusals, the codes of
  triggers on tables a door writes, and each declared route's `clientError` literals. The form
  gate's and the parser's codes become shared optional words. Families that call no door get a
  census allowlist line (`| provider family, no door | until …`). An extra word is an error against
  these sources.
- (B), recommended: the type requires every door code (a missing word is a type error). It allows
  other keys only from a list the family declares, each with its source (`also: […]`). The census
  refuses an `also` code that a listed door already answers, and lists every `also` code in the
  report. This is smaller, reads no second source, and keeps every word shown today.
- (C) The type as written. Extra words are deleted where they break the build. This changes what
  people see.

Q2 — The 18 codes above: their EN + AM text, or the existing key each one reuses. Also, for the
four `transition_listing_core` codes that fixed-mode callers cannot reach, may a family declare a
door's code unreachable (an allowlist line with its reason), rather than word it?

Q3 — Should the trigger walk join Part 1 (the judge follows a door's writes to the triggers on that
table), or stay outside it?

Note on the push: the brief says ONE push (DEC-414). Rule 00 §Stopping says a stop is committed,
pushed and opened as a draft. I followed rule 00, which binds first, so the final push will be this
lane's second. Parts 3 and 4 do not depend on Q1 (Part 3 uses Part 2's generator only for the door
list), so `continue` with the rulings can carry all three parts.
