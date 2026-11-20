MIGRATION — f1-doors-7c parts 1–4: readers' status, assign_role, the comment, the drops
DONE: STEP 0 (7f976b478), STEP 1 (the census, 50b98d211; stop 1, 3ae7c28ac), ruling 1 saved (d45b468f9), STEP 2 (the check-doors judgement fcbfd89cf; the migration 5fbf4a5ef)
LEFT: STEPS 3–7 (a new chat, after this stop's ruling — ruling 1, decision 5)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `3ae7c28ac104bdb208ec59bf35f2cf4d2e7633c4` (short `3ae7c28`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T09:49:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44713054454
FILES:
docs/governance/briefs/f1-doors-7c-ruling-1.md
docs/governance/briefs/f1-doors-7c.md
docs/governance/reports/f1-doors-7c.census.md
docs/governance/reports/f1-doors-7c.stop-1.md
docs/governance/reports/f1-doors-7c.stop-2.md
roadmap.md
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/public-surface-allowlist.txt
supabase/migrations/20261120100000_909988ad-e5cb-4942-9f99-4ec49d32a179.sql
supabase/migrations/20261120100100_c4559f10-ecd5-41c4-9ace-35e4b37973f9.sql
supabase/migrations/20261120100200_9dbc0091-9f5c-4eab-89dd-ed34e5f1abdd.sql
supabase/migrations/20261120100300_819eeda3-bead-426b-b48e-7d9878ffcd2d.sql

`origin/dev` moved during the turn: 7e7040c99 → 70533e559 (Lovable's L19 table cards, pull request #80; its CI
SUCCESS at 2026-11-20T09:59:19Z). Its seven files (`e2e/admin-monetisation.spec.ts`,
`src/components/shell/data-table.tsx` and its test, `src/features/admin-ai/ai-page.tsx`, three
`src/features/admin-monetisation/` screens) touch no file of this lane's scope, add no migration and name none of
the seven dropped functions, no reader-failure path and no reader's status (read by `git diff --name-only
7e7040c99 origin/dev` and a grep of each file at `origin/dev`). Not merged; the supervisor rules.

## The pairing lines (apply in this order)

```
apply 909988ad → expect mark 20261120120000
apply c4559f10 → expect mark 20261120120100
apply 9dbc0091 → expect mark 20261120120200
apply 819eeda3 → expect mark 20261120120300
```

Each file's pre-check refuses to run before the previous mark (the first reads 20261120050700, the ledger's
newest at the base). Marks: the commit's hour (10:06 UTC) rounded up, plus one hour, plus 100 per further part;
file-name order equals mark order.

## db:proof

`db:proof PASS — applied 544/544, CLI 2.120.0, cold, 63 s` (`bun run db:proof --fresh` on the final migration
tree; the working copy is `supabase/migrations/*.sql` — 538 files — plus the stack's seed and named patches).

## Per file

### 1. `20261120100000_909988ad-e5cb-4942-9f99-4ec49d32a179.sql` — the readers' status (19,758 bytes)

- sha256 `bb1777d089b2fcee4d16f230f1f5989c8688379576cfc6dc7a4cea4de7ab09e1`; declared mark `20261120120000`; no
  `-- e2e-areas:` line (every spec: the gate is under every reader).
- Creates `door_refusal_status(text)` (sql, STABLE, invoker, `SET search_path = public`; REVOKE ALL FROM PUBLIC,
  anon, authenticated; GRANT ALL TO service_role).
- Redeclares whole: `door_context` (the outermost call's kind, marked transaction-locally), `door_refuse` (a
  refusal raised under a reader's mark is SQLSTATE `PGRST`), `door_refused` (its status from the one table).
  Comments restated; grants as live.
- Pre-check: mark 20261120050700; `door_refusal_status` absent; the three live md5s below.
- Proofs, one block, sentinel `f1-7c-part-1-proof-ok`: (a) the four bodies' md5, volatility, definer,
  search_path and closed grants; (b) the table, named codes and any other; (c) a scratch reader on the gate
  (`e2e_mig_f17c_reader`) raises `PGRST` with message `{"code":"P0D01","message":"<code>[:<detail>]"}` and detail
  `{"status":N,"headers":{}}` — signed in 400 / 403 / 429 with its instant, signed out 401 (notSignedIn), the
  service role 400 — and the mark does not outlive the call; (d) a scratch door spending the `save` dial
  (`e2e_mig_f17c_door`, a scratch `rate_overrides` row) that calls the reader answers through its shell
  `{ok:false, code:'P0D01'}` at 400 and 403, the 403 case with the transaction already marked `reader` before the
  door ran; (e) an unmarked `door_refuse` raises `P0D01` as before. Scratch keys `e2e-mig-f17c1-<stem>`, one draw.

### 2. `20261120100100_c4559f10-ecd5-41c4-9ace-35e4b37973f9.sql` — assign_role's scope upper-cased (10,000 bytes)

- sha256 `715e0185f642d5c5e12796d5a95d22e0c9dc2a088e5563917a1683f9cfcfaa8f`; declared mark `20261120120100`;
  `-- e2e-areas: admin-users, admin-roles`.
- Redeclares `assign_role(uuid,text,character)` whole from F1-7b's body; the change: `upper(p_scope_country)` in
  the stored row and in the audit line's `scope_country` (INC-1217). Comment restated; grants as live (REVOKE ALL
  FROM PUBLIC, anon; GRANT EXECUTE TO authenticated; GRANT ALL TO service_role).
- Pre-check: mark 20261120120000; the live md5 below.
- Proofs, sentinel `f17c2-proof-ok`: (a) md5 and header; (b) a scratch global holder of `roles:assign` at aal2
  (totp) assigns a scratch `e2e-mig-f17c2-` role: `'xz'` is stored `XZ` (row and `audit_log.meta`), `'XZ'` again
  adds no second row, a NULL scope stores a global row. Every read of `user_roles` is keyed to the scratch role
  (the real-row guard's form, as 20261120030500 does).

### 3. `20261120100200_9dbc0091-9f5c-4eab-89dd-ed34e5f1abdd.sql` — admin_set_location_active's comment (2,900 bytes)

- sha256 `7c52aafd1d745ff177cd7bd453c51cc4501fef2556ca3ba00bde3b0ea3cb7a1a`; declared mark `20261120120200`;
  `-- e2e-areas: admin-locations`.
- Restates `COMMENT ON FUNCTION admin_set_location_active(uuid, boolean)`: "the ancestry trigger's parentInactive
  passes unchanged" becomes "the ancestry trigger's refusals (parentInactive among them) answer through the shell
  as codes, metered (F1-7b)". The body is not redeclared.
- Pre-check: mark 20261120120100; the live body md5 `80e42fb16ab528da01e3178ec495f666` (unchanged); the live comment
  holds the sentence it replaces.
- Proof: the comment holds the new sentence and not the old; the body md5 is unchanged.

### 4. `20261120100300_819eeda3-bead-426b-b48e-7d9878ffcd2d.sql` — the seven drops (5,527 bytes, the last file)

- sha256 `3307e58990ca501a3d319e2cca3f1487d28eb26d02f2b01e35d1b9b5bba1525c`; declared mark `20261120120300`;
  `-- e2e-areas: auth-caller-gates, my-listings, posting, admin-listings, legal`.
- `DROP FUNCTION` (no CASCADE): `edit_listing(uuid,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp
  with time zone,uuid[],jsonb,integer,boolean)`, `relist_listing(uuid)`,
  `set_listing_price(uuid,text,numeric,character,text,integer,boolean)`, `get_browse_tree(text)`,
  `get_category_attributes(uuid,boolean)`, `get_ui_bundle(text)`, `package_price_for(uuid,text)`.
- Pre-check, on the database it runs on, for each: mark 20261120120200; it exists with one overload; it is not
  browser-callable (anon, authenticated, PUBLIC); no other function body in `public` names it as a call
  (`\m<name>\s*\(`, comments included); no policy's USING or WITH CHECK names it; no `cron.job` command names it.
- Proof: none of the seven names a function of `public`; `product_price_for` (the resolver) stands, closed to
  browser roles.
- Their seven RETIRED lines leave `scripts/public-surface-allowlist.txt` in the same commit.

### Guard lines (`bash scripts/check-migrations.sh`, final tree)

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard self-test OK (a grant whose object a later file drops is no offender; without the drop it is).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Spanning-literal guard OK (floor 20261109000000).
Random-text guard OK (floor 20261118160000).
Migration guard OK.
```

The first run refused three of file 2's proof statements (reads of `user_roles` without the scratch namespace);
each now carries `role_id IN (SELECT r.id FROM public.roles r WHERE r.name LIKE 'e2e-mig-%')`, which narrows
nothing the proof judges (its grant role is an `e2e-mig-f17c2-` role).

`bun scripts/doors/check-doors.ts`:

```
check-doors self-test OK: 13 finding kinds fired on their planted fixtures, the clean pair fired nothing
check-doors static OK: 220 manifest lines reconcile with the migrations' catalogue
```

`bunx vitest run scripts --maxWorkers=2`: 124 files, 669 passed, 1 skipped. `bun run typecheck` and `bun run lint`
(`eslint . --max-warnings 0`): exit 0 on the final tree. `bun run checks` (the pre-push gate) belongs to STEP 6 and
was not run at this stop.

pre-stop scan: 7 of 7, 909988ad c4559f10 9dbc0091 819eeda3

## Redeclared bodies (prosrc md5, CR stripped)

| function | old (live, its last declaration) | new |
| --- | --- | --- |
| `door_refusal_status(text)` | — (new) | `4be1958d30d962ec9e39d956c1a922b8` |
| `door_context(text,text,text,text,character,text)` | `1136caf7f43e38e4ee9a1852635333f8` | `aa7e8bc66d8a6698a851cc3843c4cabc` |
| `door_refuse(text,text)` | `55f9bf0a6c4c4b2cc57d304df779e7fc` | `8c9807e7f9d220ba2693e24a5dd1bb56` |
| `door_refused(text,text,text)` | `990719366502e9e9f0e92a62692cb3f8` | `dcb6ae0125ce2f9da12a33b266171b03` |
| `assign_role(uuid,text,character)` | `28ba9888b3e7973c692d0c84fa805efb` | `c3ebab1053ab8977c6b87754d7893110` |
| `admin_set_location_active(uuid,boolean)` | `80e42fb16ab528da01e3178ec495f666` | unchanged (comment only) |

## The dropped functions and the grep that proves no caller

```
$ rg -n -w "edit_listing|relist_listing|set_listing_price|get_browse_tree|get_category_attributes|get_ui_bundle|package_price_for" src e2e scripts --glob "!src/integrations/supabase/types.ts"
```

Every hit is a comment, a test that a call is NOT made, or a pattern — none calls one:
- comments: `e2e/posting-routes-dials.spec.ts:31,107`, `e2e/my-listings-page.spec.ts:220,480`,
  `e2e/legal-certify.spec.ts:384,1024,1039`, `e2e/admin-listings.spec.ts:474,1963,1986`,
  `e2e/my-listings-doors.spec.ts:227,410`, `e2e/auth-caller-gates.spec.ts:213`,
  `scripts/conformance/package-price.ts:10,16,21`, `scripts/conformance/package-price.test.ts:12,114`;
- the census pattern and its planted call: `scripts/conformance/package-price.ts:53`,
  `scripts/conformance/package-price.test.ts:61`, `scripts/conformance/package-price-allowlist.txt:1`;
- `src/routes/api/i18n.lang.test.ts:111` asserts `get_ui_bundle` is NOT called;
- `src/lib/supabase-door.test.ts:120,124` (SBD-3) builds the URL `rpc/get_ui_bundle` against a mocked fetch —
  no request leaves; unaffected;
- `scripts/public-surface-allowlist.txt:147` is `get_ui_bundle_parts` (a different function, `-w` matches the
  stem);
- `e2e/auth-caller-gates.spec.ts:236–239` CALLS `relist_listing`, `set_listing_price` and `edit_listing` (CG-2,
  the closure proof): it asserts a refusal, and after the drop the answer is PostgREST's "no such function" — the
  expected red below.

Every last-declared SQL body of the repository (comments kept): no body names any of the seven as a call. The
published client (`origin/main` 7e7040c99 at the census) calls none; the supervisor's read of ethio-prod's edge
log for 24 hours found no call. `src/integrations/supabase/types.ts` still names them (7 lines); it is
platform-generated and changes only by the supervisor's patch.

## The status table (`door_refusal_status`)

| code | HTTP status |
| --- | --- |
| `notSignedIn` | 401 |
| `permissionDenied` | 403 |
| `accountDeactivated` | 403 |
| `stepUpRequired` | 428 |
| `rateLimited` | 429 |
| any other | 400 |

`door_refused` (a door's shell, unchanged in behaviour) reads the same table for `response.status`.

## New string keys

None.

## Decisions

1. The signal is `RAISE SQLSTATE 'PGRST'` (ruling 1, decision 2): message `{"code":"P0D01","message":"<code>[:<detail>]"}`,
   detail `{"status":N,"headers":{}}`. The body a client reads is the one it read at 500; only the status changes.
   Proven in file 1 by `GET STACKED DIAGNOSTICS` (RETURNED_SQLSTATE, MESSAGE_TEXT, PG_EXCEPTION_DETAIL). The HTTP
   status itself is proven by the e2e ids (STEP 3 onward).
2. The mark (decision 3): `door_context` sets `door.outer` transaction-locally from its own argument and dial — a
   call with a dial marks `door` always; one without marks `reader` only when unmarked. `door_refuse` raises
   `PGRST` only under `reader`; unmarked (a job, a trigger, a direct core call) keeps `P0D01`. A subtransaction's
   rollback reverts the mark (proof (c): it does not outlive the refused call).
3. The new finding kind is `dial-shell-mismatch` (`scripts/doors/judge.ts`): a manifest line with a dial whose
   body has no `P0D01` shell, or a gate line with no dial whose body has one. Planted in
   `scripts/doors/check-doors.ts` (`e2e_planted_reader`) and judged by DOORS-15 in
   `scripts/doors/check-doors.test.ts`. No live line breaks the rule (static OK over 220 lines: 124 shell doors
   with a dial, 83 gate readers without).
4. The guards' retirement reading is already built (DEC-357: `droppedObjects` in
   `scripts/conformance/migration-reader.ts`, read by `scripts/public-surface.ts --migration`; the live lint fails
   only on a stale line): a drop with its line leaving satisfies both. No guard code changed for the drops.
5. `assign_role` folds the scope at storage; the gate already folds it (`has_permission_scoped` compares
   upper-case), so the fold changes what is stored and audited, not who passes.
6. `admin_set_location_active`'s comment is restated alone; its body is not redeclared.
7. The seven drops are the last file, without CASCADE, each with its RETIRED line leaving (decision 4). The 19
   RETIRED lines that stay keep their reason; their tail "until F1-7c (DEC-347: the guards learn a retirement
   there)" — false once this turn lands — is restated as "it stays while a SQL caller runs it (F1-7c census: not
   dropped, DEC-347)" (`product_price_for`'s "until F1-7" likewise). Named here as an edit beyond the seven lines.

## Expected reds (by id)

- CG-2 (`e2e/auth-caller-gates.spec.ts:214`): `edit_listing`, `relist_listing` and `set_listing_price` now answer
  PostgREST's "no such function" (PGRST202, 404), not `42501`. STEP 3 rewrites the closure proof.
- LGC-6 (`e2e/legal-certify.spec.ts:1323`, the assertion at `:1343`): a signed-out reader's refusal answers 401, not
  500; the body (`:1344`, `{code:'P0D01', message:'notSignedIn'}`) holds.
- Possibly a UI spec whose screen classes a reader's refusal by status (`src/lib/reader-failure.ts` judges status
  first: a 403 now classes `auth`, a 429 `refused`, other 400s `malformed`) — STEP 3 changes `reader-failure.ts`
  in the same Publish. Not reds: `auth-caller-gates.spec.ts:295` and `legal-admin.spec.ts:1186` assert
  `error.code === "P0D01"`, which the body keeps; `e2e/fixtures.ts:66`'s `>= 500` reads page documents, not
  database calls.

The pull request's CI builds its temporary backends from every migration, so these files' proofs run there; its
preflight reports "STAGING BEHIND" until ethio-staging holds mark 20261120120300 — expected. The proofs' first run
on a shared database is the staging apply.

## Slips

- Two scratch files under `/tmp/ethio-scratch/f1-doors-7c/` were written by a shell heredoc (`body.ts`) and
  file 1's md5 placeholders were filled by `perl -pi`, not the editing tools (rule: files are edited with the
  editing tools). Every later edit used them; the values were re-read after (the table above, `prosrc.ts`).

## Records

Ruling 1's RECORDS (`docs/governance/briefs/f1-doors-7c-ruling-1.md`, lines 33–35) go word for word into the
final report's §14, copied from that file by script; none is restated here.
