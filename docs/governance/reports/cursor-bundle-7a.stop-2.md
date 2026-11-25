MIGRATION — cursor-bundle-7a part 5: five migrations written, none applied anywhere but the throwaway local stack
DONE: parts 1 to 5 (STEP 2), STEP 0, STEP 1
LEFT: STEP 3 (D6 `use-step-up.ts` and its tests; the `HELPER_REASONS` comment; CT-23 edits; CF-ADVISOR-1 script, test and the `ci.yml` step), STEP 4, STEP 5, STEP 6
CI: not yet run for this branch (the last CI read is stop 1's: dev at `db0b43c`, SUCCESS)
FILES: `git diff --name-only db0b43c9c` (the base) — 37 paths, of which 5 are migrations; the full list is in the pull request.

The five migrations, in apply order (each self-marks through `migration_marks`):

| file | mark | part | what it does |
| --- | --- | --- | --- |
| `20261125151400_ecbd4912-36c3-445a-8e87-fdd9be29801a.sql` | `20261125170000` | 1 | deletes the unasked `manage` permissions by name (D1); the cores read a grant exactly |
| `20261125152000_286755de-95bf-40d1-9a73-899616a4061d.sql` | `20261125170100` | 2 | refusal classes: GONE 404, CHANGED 409, the rest 400 (D3) |
| `20261125152600_bf53d881-dbd5-408f-8001-db3309d68222.sql` | `20261125170200` | 3 | `ALTER POLICY` with `(SELECT auth.uid())` (D7) |
| `20261125153200_9f0f29cd-88bb-44d5-a2d5-cee20409752e.sql` | `20261125170300` | 3 | drops `profiles_alias_unique`, `idx_ctp_child`, `category_tree_pointers_parent_idx` (D8) |
| `20261125153800_524263da-d7e5-4146-84cc-a45bce039137.sql` | `20261125170400` | 5 | `user_set_preferred_language`: an unchanged save writes nothing (D5) |

Proof: `bun run db:proof --fresh` on the final tree: `db:proof PASS — applied 561/561, CLI 2.120.0, cold, 58 s`.
Red-first on E: with the unchanged-value early return removed (and the pinned md5 moved to match the planted body), `db:proof --fresh` failed: `proof (b2): an unchanged save answered {"ok": true, "language": "en"} with 2 audit rows, meter 2, row version (2,50) -> (2,51)`. The planted file was restored byte for byte (`cmp`). The red run on C (a wrong expected count) and the first red of CF-RLS-1a on the real tree (nine bare policies, green after C) were run earlier.

Also green on this tree: `bun run typecheck`, `bun run lint`, `bunx vitest run scripts --maxWorkers=2` (137 files, 771 passed, 1 skipped), `bash scripts/check-migrations.sh` (Migration guard OK). `bun run checks` is the gate of STEP 4 and has not run yet.

Client type signatures: none changes. `user_set_preferred_language` keeps `RETURNS jsonb` and its envelope `{ok, language}`; the dropped indexes and the changed policies have no client type.

Plan evidence (D8), from the throwaway stack:
- `category_tree_pointers`, lookup by `parent_id`: `Index Scan using idx_ctp_parent … Index Cond: (parent_id = …)`, with and without `ORDER BY display_order`; no Seq Scan; the dropped `category_tree_pointers_parent_idx` is not named. The planner may use either `idx_ctp_parent` or the unique index's leading column; the proof asserts "an index scan, not the dropped one", not one index by name.
- `listings` (migration C): the seller's own read holds `InitPlan 1` and `InitPlan 2` (`auth.uid()` planned once), `Index Scan using listings_seller_idx`.
- Reader census for the three dropped names: across `src/`, `scripts/` and `e2e/` no file names any of them; only migrations (their creation, and D's drop) do. No query hints and no `ON CONFLICT ON CONSTRAINT` use them. `profiles_seller_alias_lower_key` stays and still refuses a second `lower(seller_alias)` (proof b of D, 23505).

Setter census (D5): of the owner-setter doors that write a profile column, only `user_set_preferred_language` audited an unchanged value; its audit is now written only on a change. It still spends `account_pref` and locks the row `FOR UPDATE` on every call.

Apply order: A, B, C, D, E in the table's order, after Lovable's #104 merges; the operator pastes them from one message of links (DEC-384). Nothing was applied to staging or production.

Scratch copies live under `/tmp/ethio-scratch/cursor-bundle-7a/` (the operator's to remove).

To be reported again in the final report: stale `docs/features/admin-shell.md:32-34` (`categories:manage`); F2 → INC-1297, F4 → INC-1298, F6 accepted; the routes' own 403/409 statuses are left for bundle 7b; the four `storage.objects` category-assets policies are wrapped but unchanged, for the supervisor to check on the advisor.
