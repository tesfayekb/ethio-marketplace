MIGRATION — p2-fold-c2b M-3c-b (again, ruling 3): the proofs judge the same however the file is carried; the public-surface file judge learns drops
DONE: ruling 3 §3 (parts (i)–(iii) rewritten in place, the spanning-literal guard), §4 (droppedObjects, the drop-aware file judge, :61 and :144 removed); two CI reds of 77014b9c0 fixed at their root (PW-193's scratch reach, the live lint's two stale lines)
LEFT: after the operator's re-paste and "continue" — the types patch; the product editor's three fields and `p_caps` sent (MNS-3, and with it MON-5 and MON-18); `e2e/helpers/pool-reset-map.ts:54` leaves; the specs run; THE CHECKS; the budgets (four pages in the NEAR band, below); the self-review; the final report
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `0f99800a72144d51fc7b2bd1d07d03d6a94171be` (short `0f99800`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-09T06:22:49Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42570464470
FILES (since stop 3, `git diff --name-only 77014b9c0`):
docs/governance/briefs/p2-fold-c2b-ruling-3.md
e2e/post-wizard-place.spec.ts
scripts/check-migrations.sh
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/wired.test.ts
scripts/fixtures/bad-spanning-literal-example.sql
scripts/fixtures/good-spanning-literal-example.sql
scripts/public-surface-allowlist.txt
scripts/public-surface.test.ts
scripts/public-surface.ts
supabase/migrations/20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql
supabase/migrations/20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql
supabase/migrations/20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql

(stop 3 lists every file since the base d5d6796c4; this stop adds the files above.)

## The apply pairing (unchanged; the operator re-pastes every part from this commit, DEC-323)

```
apply bddc8991 → expect mark 20261109070000
apply b2f1fad4 → expect mark 20261109070100
apply 68fda306 → expect mark 20261109070200
apply 5c76824a → expect mark 20261109070300
apply 96b91fc3 → expect mark 20261109070400
```

## The files (three new sha256s; parts (iv) and (v) unchanged)

| Part | File | sha256 | Mark |
| ---- | ---- | ------ | ---- |
| (i) | `20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql` | `a8183416a00cd90d801d63d92829a5521cc1ab57776acea1d4a83af512a13b20` | 20261109070000 |
| (ii) | `20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql` | `2e2711dd7d1da40a6faa44eba91a3c06dfd0c4cbb96da6ee0a3db62846f901ce` | 20261109070100 |
| (iii) | `20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql` | `26206be8df54525ff570f50e44e3dbb04eb98f0f83b857df0987893bfb6b1002` | 20261109070200 |
| (iv) | `20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql` | `02aa440dbef49af89d4bbbd35fcd9cb778a3ab6143e3a3f4f5c7a24b64d85d1f` | 20261109070300 |
| (v) | `20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql` | `0447d396a156fff77e1522a56fae3901142c859f0e5b28f33716e2ebe639c06a` | 20261109070400 |

What changed in (i)–(iii), and only that (commit 49dbb6e89):

- **(i)** Proof (b)'s fragment is one variable built on one line,
  `v_frag := replace(',' || chr(10) || '    ''caps'', public.listing_caps(v_row.id)', chr(13), '')`,
  and both the count and the md5 compare the chr(13)-stripped body with it.
- **(ii)** Proof (b)'s six fragment pairs (twelve literals) are each written as one-line pieces joined by
  `|| chr(10)`; the loop already stripped chr(13) from both sides.
- **(iii)** Proof (b)'s one pair, the same way.

The bodies the files declare, their marks, their pre-checks and every other proof are unchanged
byte for byte. The rewrite was scripted (`/tmp/ethio-scratch/p2-fold-c2b/oneline.py`, the guard's
own tokenising). It is proven equal by each proof's own md5 check, which fails on any change to a
fragment's text.

## The carrier, proven on db:proof

`db:proof` applies the files' bytes, so I gave it the paste path's bytes: the files rewritten to
CRLF in place, run, then written back and checked against their LF sha256s.

- **Red first.** Part (i) as it was at 77014b9c0, in CRLF, stops exactly as staging did:
  `ERROR: P-2 (c) M-3c-b part 1 proof (b): the caps key occurs 0 times in my_listing_private` →
  `db:proof FAIL — 20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql failed`.
- **Green.** All five rewritten files, in CRLF: `db:proof PASS — applied 436/436, CLI 2.120.0,
  cold, 49 s`. Parts (ii)–(v)'s pre-checks there read bodies applied with CR in `prosrc`.
- **Written back.** `sha256sum -c` OK for all five; no CR in any of them. The one migration file
  that holds a CR is the landed `20261006225254_626282eb` (history, below both floors, untouched).
- **The files as committed (LF):**

```
db:proof PASS — applied 436/436, CLI 2.120.0, cold, 50 s
```

## The pre-stop scan (7 of 7)

1. The statement order holds: readers move first (parts (i)–(iii)), then the resource delete
   (part (iv)), then the drops (part (v)).
2. Every scratch key fits its CHECK `^[a-z][a-z0-9_]{1,31}$` (the longest is 21 characters).
3. The literals are typed (`5::smallint` where the door takes a smallint).
4. No proof expects a real row's value; the scratch sorts are derived.
5. Every random draw is its own `gen_random_uuid()`; XZ and XTS are the K4 exception named
   inline.
6. The pre-checks chain the marks (20261108130000, then 070000 to 070300) and the live md5s.
7. No compared literal spans a line break, and both sides are chr(13)-stripped. The guard reads no
   spanning literal in the five files, and the CRLF run above passes.

## The guards (ruling 3 §3 and §4)

- **The spanning-literal guard (INC-1089).** `spanningLiterals(sql)` in
  `scripts/conformance/migration-reader.ts` blanks comments and one-line literals with the
  reader's own grammar; every `'` left marks a spanning literal's line. `check-migrations.sh` runs
  it from `SPANNING_LITERAL_FLOOR=20261109000000` and fails with
  `<file>:<line>: a string literal spans a line break — write chr(10) or E'\n' (INC-1089)`.
  - MGR-4 covers a planted spanning literal (found on its two lines), a doubled quote, a comment's
    apostrophe, a backslash pair (`E'\n'`, `'--[^\n]*'`) and a dollar-quoted block (no finding).
  - The fixtures are `scripts/fixtures/bad-spanning-literal-example.sql` and
    `good-spanning-literal-example.sql`.
  - `wired.test.ts` names the caller (`conformance/migration-reader.ts" --spanning`).
  - Red first: part (i) as it was at 77014b9c0 gives four lines (141, 143, 147, 148).
- **The drop-aware file judge (DEC-357).** `dropsOf` reads `DROP TABLE` beside `DROP FUNCTION`,
  with a kind on each event (`{ name, kind, offset }`; `lastDeclarations` forgets functions only).
  `droppedObjects(root)` answers every name whose last event is a drop, with no live object of
  either kind by that name (MGR-5: a function and a table dropped; one of each re-created after
  its drop; a commented drop and a drop inside a DO block not read).
  - `public-surface.ts --migration <allowlist> <file> [<root>]` lets a grant on a dropped name
    through. It reads the drops only when the file has an offender, and loads the reader on
    demand, so `security-lints.ts` (which imports this file) carries nothing new.
  - SLB-7 runs the CLI on a planted root: both grants are offenders, then none once a later file
    drops them.
  - The guard's own planted pair is in `check-migrations.sh`.
  - :61 (`coverage_plans`) and :144 (`admin_set_coverage_plan`) have left the allowlist.

The guard's lines on this tree (`bash scripts/check-migrations.sh`, 25 s):

```
Public-surface guard self-test OK (a grant whose object a later file drops is no offender; without the drop it is).
Public-surface guard OK (floor 20261003215043).
Spanning-literal guard self-test OK (the bad fixture is refused, the good one passes).
Spanning-literal guard OK (floor 20261109000000).
Migration guard OK.
```

- `SELF_TEST=1 bash scripts/check-migrations.sh`: `SELF_TEST mode: self-tests passed; skipping
  real scan.`
- `bun scripts/doors/check-doors.ts`: `check-doors static OK: 265 manifest lines reconcile with the
  migrations' catalogue`.
- `bunx vitest run scripts --maxWorkers=2`: 499 passed, 1 failed of 500 (98 files). The one red is
  NH-6, this machine's time-zone database, as before.
- `bun run typecheck` and lint on the touched files: clean.

**Departure (for the ruling).** The reader's one-line-literal grammar now reads a backslash pair
as one unit (`'(?:[^'\\\n]|''|\\[^\n])*'`; before, a literal holding a backslash was not seen
as one). Without this, the guard would refuse the `E'\n'` its own message recommends, and part
(v)'s `'--[^\n]*'`. `sqlCodeOf` is the same function for its five other readers (the door
catalogue, door rows, proof readers, the permission vocabulary, the status map): their laws and
`check-doors` pass unchanged on this tree.

## CI at 77014b9c0 (stop 3's head), read and answered

- **Build, typecheck, lint; Gitleaks:** infrastructure. Each tool download (actionlint, gitleaks)
  got HTTP 504 on every try. The new head's run is their re-run; no rerun was asked.
- **E2E preflight; E2E (ethio-staging):** STAGING BEHIND, the five files missing (staging rolled
  part (i) back).
- **Smoke lane:** `public surface: stale line coverage_plans` and `stale line
  admin_set_coverage_plan`. This is the disagreement ruling 3 §4 names (INC-1090); fixed by
  72c56c7a2.
- **PW-193** (lanes 6 and 14, both projects): `new row for relation "listings" violates check
  constraint "listings_reach_with_source_check"`. My spec set the scratch ad's `reach` without
  `reach_source`; fixed in 0f99800a7 (`reach_source: "staff"`, the one source with no end).
- **MON-5** (lanes 2 and 10, and the repeat lane, both projects; six of the eight gating
  failures): the console's new reach row never appears. Part (ii) refuses a reach row born
  without caps (`bad caps`, ruling 1), and the editor sends no `p_caps` until the types patch
  (ruling 2 §2, departure 8). So MON-5 is red with MON-18 until the editor's three fields land
  after "continue". A finding the stop-1 census did not name.
- **First-paint bundle budget:** four pages in DEC-296's NEAR band. CI's own numbers (KiB, run
  42552369072 at the base d5d6796c4, run 42562258710 at 68b5a8bcc, run 42567023039 at
  77014b9c0):

| Page                       | Base  | 68b5a8b | 77014b9 | Ceiling |
| -------------------------- | ----- | ------- | ------- | ------- |
| `/my-listings`             | 321.6 | 321.6   | 321.8   | 322     |
| `/my-listings_/$listingId` | 329.5 | 329.5   | 329.8   | 330     |
| `/post`                    | 407.6 | 407.7   | 407.9   | 408     |
| `/post_/$listingId`        | 407.6 | 407.7   | 407.9   | 408     |

  The fold was expected to shrink these pages; c2b grew each by 0.2–0.3 KiB. That is a STOP with
  its cause (the P-2 brief's TOLERANCES). The cause is not yet measured: it is the budgets step's
  base-and-tree build, by chunk. The candidates by file are part 6's `promote-sheet.tsx` (both
  my-listings pages) and part 3's step-6 no-limit line with its member strings (`/post`). No
  ceiling has moved. The budgets step (after "continue") measures the cause and proposes the
  DEC-296 lines (`ceilingFor`: 323, 331, 409, 409 from these numbers), or the shrink.

## CI at 0f99800a7 (this head's code)

Run https://github.com/tesfayekb/ethio-marketplace/actions/runs/42570464470, read on the pull
request's checks and at the raw ci-evidence addresses: 32 pass, 9 fail, 1 skipped (promote).

- **Green now:** the smoke lane (the live lint, with :61 and :144 gone), lanes 6 and 14 (PW-193),
  and every temporary-backend lane but three. AG-1 and MLA-19 pass on both projects. The e2e
  file: 2796 passed, 6 failed.
- **MON-5** (lanes 2 and 10, and the repeat lane): all six gating failures, the cause above;
  open until the editor sends `p_caps` after "continue".
- **First-paint bundle budget:** the same four pages at the same sizes (the table above).
- **Build, typecheck, lint; Gitleaks; i18n used-on map:** infrastructure again. Each tool or
  action download got HTTP 504 on every try (`curl: (22) … 504`,
  `Unexpected HTTP response: 504`). This report's push starts a fresh run; no rerun was asked.
- **E2E preflight; E2E (ethio-staging):** STAGING BEHIND, as expected until the re-paste.

## Limits

- MLA-19, PW-193, MON-5, MON-18 and AG-1 were not run here: ethio-staging is behind until the
  re-paste, so the preflight stops every local browser run. CI's temporary-backend lanes run
  them.
- The live acceptance-doors check needs CI's catalogue; only its self-test ran.
- NH-6 fails on this machine only.

## Records owed (for the final report §14, unnumbered)

Stop 3's list, plus ruling 3 §6 word for word: INC-1089, INC-1090, DEC-357, the migration
reader's register row gaining `spanningLiterals`, `droppedObjects` and its two new consumers, and
the changelog line "the migration guard refuses a compared literal that spans a line break
(INC-1089); the public-surface file judge learns drops (DEC-357)".

`origin/dev` is at f2d558467; this lane's base is cursor/p2-fold at d5d6796c4, not merged or
rebased (rule 00). PR #30 stays a draft.
