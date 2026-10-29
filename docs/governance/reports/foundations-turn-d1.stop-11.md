# Foundations turn D1 — stop 11 (M6a, INC-951 3c: three category cores and the two category bulk callers)

## 1. What landed

- Migration `supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql`, applied on
  ethio-prod. **apply b124ab89 → expect mark 20261029070000.** Mark read back on ethio-prod:
  `20261029070000`. `rate_dials` `staff_config` reads back as 600/3600.
- `src/lib/dials.ts`: `staffConfig` (`staff_config`, 600/3600, countedBy "door"). The `importCommit` and
  `importUndo` entries now each have a comment naming their database twin (ruling 3).

## 2. The split (live bodies read at write time)

| Function | Live md5 used | After (read back) | ACL (read back) |
|---|---|---|---|
| admin_add_category_pointer_core | 73ea122d818f3dc2d88cf213a5542c42 (= door's live body) | same | {postgres=X/postgres} |
| admin_create_category_core | c07851c720fb9a0da28fac81e25bf88a | same | {postgres=X/postgres} |
| admin_set_country_exclusions_core | 2ab9bf2f2876bbd4d6f2ce5ea69d11e3 | same | {postgres=X/postgres} |
| admin_add_category_pointer (door) | — | 438b205a914020e03f3951f27d4f76db | unchanged, with service_role |
| admin_create_category (door) | — | acd25c60bb2f04cba651d32cb67d8346 | unchanged, with service_role |
| admin_set_country_exclusions (door) | — | 8a9c85ddec5d1e146d781824a9ddb379 | unchanged, no service_role (as live) |
| admin_commit_category_import | a161c8df3e24550d1962fd6a9430c7a8 | 7c2eb7f578e6563202030ef98395edbc | unchanged |
| admin_undo_category_import | 31d6df7d11b66a4ce09c1ec293630181 | 47e09d29028884df55c32f4d5ccc48cf | unchanged |

The live md5 of each of the three doors equals its latest migration file's body, so the cores were taken
from that text.

**Where the gate goes in each door:** right after `PERFORM public.require_step_up_if_needed(...)`, which
is line 5 of the old body. The live body's next line was the first real work (the
`assert_parent_not_catchall` or category-exists check) and is now in the core. Each door is now: the
permission check, the step-up check, `rate_gate('staff_config')`, then RETURN or PERFORM of the core.

**The two bulk callers:** each is redeclared whole, and only the callee names change:

- **commit**, 5 calls:
  - `admin_create_category` ×1
  - `admin_set_country_exclusions` ×2
  - `admin_add_category_pointer` ×2
- **undo**, 3 calls, one of each.

The rewrite was done by a script with a length check (+5 characters per call). The migration file matches
the reviewed scratch copy except for the final newline.

## 3. Proofs (in the DO block, all passed on ethio-prod)

1. **Each core:** its md5 is the door's live body; it is INVOKER with `search_path=public`; anon,
   authenticated and service_role cannot execute it.
2. **Each door:** it has its written md5. Its body contains `rate_gate('staff_config')` before the core
   call and no INSERT, UPDATE or DELETE. It is still DEFINER, and its ACL text is unchanged.
3. **The two bulk callers:** each has its written md5 and no longer calls any of the three doors.
4. **Behaviour:** a scratch super_admin with step-up and `staff_config` overridden to 1 committed a
   2-row category file, one `create-root` row and one child row.
   - Both categories were created, and the user's rate window held 0.
   - A direct `admin_create_category` call then succeeded once. The next one was refused with
     `rateLimited`, and its category does not exist.
   - Everything rolled back (sentinel exception).

The first apply attempt failed in proof (4), and nothing was applied (read back: no `_core` function
existed). The cause was in my scratch file: its root row said `upsert`, and the planner wants
`create-root` for a row with no parent (`unknownSlug`). I fixed only that word with a patch. The
structural proofs (1)–(3) had already passed on that attempt.

## 4. Needs a ruling: no "rate limited" message on the category screens

`categories-service.ts` is the only app caller of the three doors. It has no `rateLimited` mapping, and
there is no `admin.categories.*rateLimited` key. A refused save today shows the generic
`admin.categories.error.saveFailed` ("The change could not be saved."). The same was true for
translations in M5a, so I wrote no string and added no mapping. If you want a dedicated key, as ruling 4
gave translations, please send the EN and AM text. The same question will come up for every console in
M6b.

## 5. IG-6 (e2e/import-security.spec.ts, whole, both projects, 0 retries)

**Not run: blocked because staging is behind.** The run passed map-guard, port-guard, browser-guard and
the build. The preflight then stopped it before any test ran. Staging is missing three files:
`20261028233839_7aad90ab…` (M5a), `20261028235443_3e3ea913…` (M5b) and `20261029001111_b124ab89…`
(M6a, this stop):

```
Error: STAGING BEHIND: apply 20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql to ethio-staging before E2E can pass
```

There are no counts to paste. The run happens again once the operator has applied all three.

## 6. Checks

- `src/server/imports/` and `scripts/conformance/dials.test.ts`: 48 tests passed.
- eslint and prettier clean on `src/lib/dials.ts`.

## 7. Files touched

- `supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql` (new)
- `src/lib/dials.ts`
- this report

Next after "continue": M6b. Its size will be checked against the 60 KB line before it is written, and it
will be split by concern if it goes over.
