QUESTION — f1-doors-5a STEP 2 Part A: the grants guard fires on four landed files, and the brief allows no allowlist line
DONE: STEP 0, STEP 1 (the census), ruling 1 saved (`020523f44`)
LEFT: STEP 2 (Part A, Part B, the migration and its stop), STEPS 3 to 7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `3a3dd2d9df4814ef3e433474e63e29165ba5c059` (short `3a3dd2d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-15T20:17:37Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43756554192
(the lane's `branches/cursor/f1-doors-5a/ci-status.md` on `origin/ci-evidence`, the census stop's push — a records
push. Dev: `bdb2fc555`, **SUCCESS**, run 43753052995; `origin/dev` is still `bdb2fc555`, the base.)
FILES:
docs/governance/briefs/f1-doors-5a-ruling-1.md
docs/governance/briefs/f1-doors-5a.md
docs/governance/reports/f1-doors-5a.census.md
docs/governance/reports/f1-doors-5a.stop-1.md
docs/governance/reports/f1-doors-5a.stop-2.md
roadmap.md

## What happened

Part A's finding kind was built as the brief words it: for a file that DROPs a function and re-creates the same name
later in that file, every role the function held just before the drop (the catalogue's grant state) must be GRANTed
again or REVOKEd by name in that file. The draft (kept outside the tree, `/tmp/ethio-scratch/f1-doors-5a/part-a-catalogue.diff`,
84 lines; `scripts/doors/catalogue.ts` is back to its committed text and the tree is clean) records each drop's roles
inside `catalogueOf` and judges them at the end of each file. Run over the repository's own migrations, it finds four
losses, all of the service role, all in landed files:

| Function | The file that dropped it (DROP line) | Restated there | Today (the catalogue's last state) |
|---|---|---|---|
| `admin_list_translations(text,text,boolean,text,integer,integer,boolean)` | `20260901234603_74ae387b…sql:59` | `authenticated` | `authenticated` only — still lost (last declaration `20261114114500_fedfce7d…sql:40`, CREATE OR REPLACE) |
| `admin_list_categories()` | `20260906043420_0459b757…sql:25` | `authenticated` | `authenticated`, `service_role` — given back by `20261115023100_4bce8e61…sql` |
| `admin_list_effective_category_links(uuid)` | `20260908041703_62e6566c…sql:329` | `authenticated` | `authenticated`, `service_role` — given back by `20261115023200_b65cc53c…sql` |
| `admin_upsert_language(text,text,text,boolean,text[])` | `20261114114100_c2dc755f…sql:38` (F1-3) | `authenticated` | `authenticated` only — still lost |

Nothing calls the two that are still lost as the service role: `src/routes/api/translate.ts:218` reads
`admin_list_translations` through the staff member's own client (`handler: async ({ body, supabase, userId })`, `:100`),
and `src/features/admin/translations/translations-service.ts:201`, `:304` call from the browser. A lost service-role
grant closes a door; it opens none. This is not a security hole.

The brief says Part A lands "with its planted proof in `scripts/doors/check-doors.test.ts` and no allowlist line", and
DOORS-4 asserts that the tree has no finding left after the allowlist. Landed files are never edited. So the kind as
worded cannot be green on this tree without an allowlist line or a change of shape. Rule 00 makes a census hit the
task did not anticipate a stop, so I stopped before committing Part A.

## What I need — one of these, or another ruling

1. The shape as worded, with four allowlist lines in `scripts/doors/check-doors-allowlist.txt`
   (`grant-dropped <key> | landed file <file>, cannot be edited; <restored by <file> | still lost> | <until>`). The
   kit fails a line once it is stale or past its date; for a landed file it never goes stale, so the `until` is a
   date the supervisor sets.
2. The shape judged on the result: a role the function held before a file's DROP + CREATE that the same file does not
   restate, AND that no later file gives back. The two repaired losses then fire nothing. This turn's migration
   restores the service role on the two still lost (`GRANT EXECUTE ON FUNCTION public.admin_list_translations(…)` and
   `public.admin_upsert_language(…) TO service_role`, each the grant its earlier declaration gave). No allowlist
   line, and the debt is fixed. The cost: two GRANT lines on staff doors outside this family, a change outside the
   task's numbered changes, which is why I am asking.
3. The shape as worded, judging only files above a mark frozen in the guard. I do not recommend it: it is an
   exemption written in code where the kit's allowlist would show it.

My reading: option 2 keeps the brief's "no allowlist line" and the law's "a dropped function's grants are restated",
and it closes the two losses. With either option 1 or option 2, a file this turn writes that loses a grant still
fires, because no later file exists to restore it.

Whatever the ruling, Part A's planted proof (DOORS-10) plants a bad file that drops a function and restates only
`authenticated` where `authenticated` and `service_role` were held, a good file that restates both, a good file that
REVOKEs the role by name, and a drop with no re-creation that is not judged. The self-test gains the kind's fixture,
so DOORS-1's "every kind fires on its planted fixture" counts nine.

For the records: `INC — the service role's EXECUTE on admin_list_translations (lost 2026-09-01, 20260901234603) and
admin_upsert_language (lost 2026-11-14, F1-3, 20261114114100) was dropped by a DROP + CREATE that restated only
authenticated; found by F1-5a's grant-dropped guard on its first run over the tree; no caller uses it`.
