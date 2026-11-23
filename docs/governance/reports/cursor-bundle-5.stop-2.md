MIGRATION — cursor-bundle-5 part 2: the list doors read after a key
DONE: Part 1 (items 1–7: INC-1260, INC-1262, INC-1261, INC-1140, DG-12/DG-13, ACT-032, DEC-432), Part 2 (the migration), steps 1–5
LEFT: Part 3 (bulk-translate collectors by key, BT-U1), Part 4 (account security), the gate (step 6), the browser check (step 7), the self-review (step 8), the final push and the report
CI: last COMPLETED run read, for `a14f032b6` (dev's head, this branch's base): SUCCESS, 2026-11-23T10:53:05Z, run 45159199801. This branch has no run yet (first push is this stop's).
FILES: `git diff --name-only a14f032b6..HEAD` (40 files; the list is the command's output at the commit that adds this report, not retyped here)

## The migration

- File: `supabase/migrations/20261123131500_ee2c7dee-14da-4f27-8122-068afc226a75.sql`
- sha256: `6f2891c9f28894c0e2e229297eb7844d878d2af7f84c6c3e807f3f999975accb`
- First line: `-- e2e-areas: admin-translations`
- Declared mark (last line, `migration_marks`): `20261123150000` (hour of commit rounded up, plus one hour; the clock read 13:45 UTC)
- Pairing line: `apply ee2c7dee → expect mark 20261123150000`
- It DROPs two functions and CREATEs two with one more argument each, so the operator applies it (DEC-384).

## What it redeclares

| Function (new signature) | Change |
|---|---|
| `public.admin_list_translations(text,text,boolean,text,integer,integer,boolean,text)` | new last argument `p_after text DEFAULT NULL`; the body is the old body plus one line, `AND (p_after IS NULL OR t.key > p_after)`, after `WHERE t.lang_code = p_lang` (checked by script: new body = old body + that one line) |
| `public.admin_list_entity_translations(text,text,text,integer,integer,jsonb)` | new last argument `p_after jsonb DEFAULT NULL` (`{etype, elabel, eid, efield}`); validated after `door_context` (object, exactly four keys, string etype/eid/efield, string-or-null elabel, eid a uuid) and any failure is `door_refuse('badValue','after')`; the `filtered` CTE adds a row comparison `(etype, COALESCE(elabel,''), eid, efield) > (…)`; `efield` is the last tie-breaker in the order (ruling 1) |

Both: `REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO authenticated; GRANT ALL … TO service_role`, restated after the CREATE (DEC-392). The old signatures are dropped.

## Body md5 (over `replace(prosrc, E'\r', '')`, as the pre-check and the proof compute them)

| Function | Old | New |
|---|---|---|
| `admin_list_translations` | `b1b67b4d8589cf6df88a3c5b930cafd7` | `00cf17ed29fdeecbd8139e983c7aa036` |
| `admin_list_entity_translations` | `efdd33f153ee14cf3e83e86aea13e31b` | `f2c1a07a86f940c679875f2a14ffdbef` |

The `$pre$` block refuses to run unless mark `20261123050100` exists and the live bodies equal the old md5s; the `$proof$` block asserts the new md5s.

## Privileges (asserted by proof (a), read from the catalogue on the local stack)

| Function | anon | authenticated | PUBLIC (`aclexplode` grantee 0) | service_role |
|---|---|---|---|---|
| `admin_list_translations(…, text)` | no EXECUTE | EXECUTE | no entry | EXECUTE |
| `admin_list_entity_translations(…, jsonb)` | no EXECUTE | EXECUTE | no entry | EXECUTE |

Also asserted: `prosecdef`, `STABLE`, the pinned `search_path`, and that the two old signatures are gone.

## Proofs (scratch rows under a sentinel rollback; every scratch key starts `e2e-mig-`)

- (a) catalogue facts above.
- (b) gate answers first: `notSignedIn` and `permissionDenied` arrive as SQLSTATE `PGRST` with the JSON body `{"code":"P0D01","message":"…"}` (the reader form; `door.outer` reset per call); twelve malformed `p_after` values answer `badValue:after`; well-formed values, including a null label, pass.
- (c) strings door walked by key with rows inserted before and after the cursor: no repeat, no skip; `total_count` is the remaining count (4); an OFFSET page over the same moving set repeats a row; `EXPLAIN` asserts a language index condition and no sequential scan.
- (d) entity door walked over scratch categories: `total_count` 3; an OFFSET page repeats; a tie between an attribute and its option is read across page edges.

## Guard lines

- `bash scripts/check-migrations.sh`: `Migration guard OK`
- `bun scripts/doors/check-doors.ts` (static): OK, 226 manifest lines, 21 finding kinds
- pre-stop scan (rule 30): 7 of 7, `ee2c7dee`
- `bun run db:proof --fresh`: PASS (applied 553/553, CLI 2.120.0, cold)
- `bunx vitest run scripts --maxWorkers=2` on this tree: 129 files, 724 passed, 1 skipped
- STAGING BEHIND is expected until the operator applies the file.

## Disclosures, questions and departures

1. DEPARTURE (scope): `scripts/public-surface-allowlist.txt` gained one line, `admin_list_translations | authenticated | restated grant …`. It is outside the brief's SCOPE and the stop-1 plan said no allowlist change would be needed; the public-surface guard in `check-migrations.sh` failed without it (the new signature is a new function to the guard). Please rule: keep, or give the guard another route.
2. QUESTION (index): proof (c)'s `EXPLAIN` shows the planner uses `ui_translations_orphaned_idx` (Index Cond on `lang_code`, Filter `key > after`, then a Sort), not the primary key `(key, lang_code)`. The assertion is therefore "language index condition, no sequential scan". No index was added (none in SCOPE). A `(lang_code, key)` index would give a true keyset seek; do you want it as its own migration?
3. `total_count` with an `after` is the number of rows after the key ("remaining"); without `after` it is unchanged. The per-page window COUNT still reads the language's rows, as OFFSET did.
4. A NULL entity label reads as `''` in both the order and the comparison. This moves NULL labels only; `name_en` is NOT NULL and option labels are non-empty, so it does not occur on real rows.
5. Callers (`src/routes/api/translate.ts`, the e2e specs) pass no `after`, so they need no change. `src/integrations/supabase/types.ts` is yours to patch with ruling 2, as ruling 1 says.
6. Scratch files from this turn are under `/tmp/ethio-scratch/cursor-bundle-5/` (the operator's to remove).

Next: after the operator applies the file and sends ruling 2, Part 3 (BT-U1) and Part 4 follow.
