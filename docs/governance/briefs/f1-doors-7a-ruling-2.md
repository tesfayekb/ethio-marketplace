RULING — f1-doors-7a, stop 2: the migration stop — staging holds the ten files; STEPS 3 to 7 follow in this new chat. Base: cursor/f1-doors-7a 6013d4415.

PREVENTION (G70)
- Class 1: a test that finds a function's declaration by a loose text match over the migrations (`src/features/posting/price-basis.test.ts`: "the newest file that mentions `FUNCTION public.price_shape_for_basis`" — a REVOKE mentions it too). The census's `old-file-readers` item asked for readers of names and sentences under `src/`, `e2e/` and `scripts/`, and did not ask for a test that reads `supabase/migrations/` by a function's name. Changed here: decision 10, with its class census. Instructions and the GO template: in force now and for the rules turn — `old-file-readers` gains "every test or script that reads `supabase/migrations/` for a function this turn redeclares, closes or drops". Cursor rules: with the template, at the rules turn. Knowledge: not needed.
- Class 2: a client reader that judges the HTTP status before it reads the refusal's code (`src/lib/reader-failure.ts`), and one that takes a code's detail by a pattern narrower than the detail (`src/lib/door-error.ts`, its `REASON_CODE`). The GO changed what a reader raises and what `rateLimited` carries without naming the two client readers' own parsing rules as consumers. Changed here: decision 11. Instructions: in force now — "a GO that changes a refusal's status, code or detail lists every client parser of refusals with the rule each applies (status first or code first; what a detail may hold)". The one reader that replaces them is F1-7c's.
- Class 3: a gate refusal from a reader answers HTTP 500 (PostgREST's reading of the gate's own error class), on every reader on the shell since F1-1. Not changed here: INC-1213 below, owner F1-7c — it needs one mechanism for every reader, not twenty-five handlers.
- Class 4 (the supervisor's, for the production apply): this turn closes three names and drops one that the PUBLISHED client still calls, so between the production apply and the Publish those four calls fail. Before launch this is a window of minutes the operator closes by applying the last four files and publishing back to back; from launch on, a turn that closes or drops a name the published client calls lands in two applies — add, publish, then close. Recorded as a rule in force; nothing for you to build.

THE STAGING READ-BACK (the supervisor's, 2026-11-19): the ten marks `20261119170000` → `20261119170900`, newest `20261119170900`; the twenty-one redeclared bodies and the four new functions at the md5 of your table and of the files; `listing_saved` gone; none of the forty-one closed names executable by anon or authenticated; the new readers executable by authenticated and the service role, not by anon; scratch rows, tables and functions at zero. Before the apply both databases held every body the files expect.

THE TYPES PATCH: `f1-doors-7a-types.patch` (attached; its sha256 in the carrier) — four entries added (`get_attribute_options_version_read`, `listing_contact_refusals_read`, `translation_scope_ok_read`, `listing_viewer_state`), `listing_saved` removed. Apply it with `git apply` as STEP 3's first act; never edit that file by hand.

THE RULINGS (your numbering)
1. Policies read statically, the same reading in `--live`; DOORS-13 — accepted.
2. The helper reason grammar `policy <name>, <name>, …`, refused when a policy does not call the function (`helper-reason-unproven`) — accepted.
3. A `helper` line may name `anon` — accepted (`sold_cutoff`'s policies run as the visitor).
4. `reader-off-gate` and the closure for `public-data` at any depth (DOORS-12) — accepted.
5. A dynamic grant whose literal target opens on `pg_temp.` is no `grant-unseen` (DOORS-14) — accepted; the skip stays that narrow.
6. The four `grant-without-caller` lines — accepted until STEP 3 only: each leaves in the commit that moves its caller; none is in the tree at the final push.
7. The names — accepted.
8. A deactivated signed-in caller of the two legal readers is refused — as ruled; noted as the behaviour change it is.
9. The RETIRED lines' tail names F1-7c — accepted.
10. `src/features/posting/price-basis.test.ts` — accepted, and by its class: SCOPE gains that file. Its filter reads a DECLARATION (`CREATE FUNCTION` or `CREATE OR REPLACE FUNCTION public.price_shape_for_basis`), shown red on the tree before the change. Then the class: `rg -n "supabase/migrations" src e2e --glob '*.test.*' --glob '*.spec.*'` and `rg -n "FUNCTION public\\." src --glob '*.test.*'` — for every hit that picks a file by a function's name this turn redeclared, closed or dropped, the same correction; the commands and their hits pasted in §10. A hit for a name this turn did not touch is §13, not changed.
11. THE CLIENT'S TWO PARSERS AND LGC-6 — STEP 3 and STEP 4, in SCOPE:
   - `src/lib/reader-failure.ts` reads a gate refusal's code BEFORE its status test: `notSignedIn` and `accountDeactivated` class `auth`; `notYourListing`, `notYours`, `badValue`, `badSize` class `refused`, as their sentences did; anything else as today. Its test names every code and the status each arrives with.
   - `src/lib/door-error.ts` takes a refusal as code and detail by the FIRST colon, through `splitRefusal` of `src/lib/refusal.ts` — the code keeps its strict pattern, the detail may hold any character. `rateLimited:<instant>` reads as `rateLimited` with its detail. Unit tests for a detail with `:` and `+`.
   - For every site the census listed as comparing `rateLimited` exactly: say in §10 whether it compares the code or the whole message; a whole-message compare reads the code through the same splitter. No new reader module is built (INC-1189 is F1-7c's).
   - LGC-6 reads what the body now gives: the gate's `notSignedIn` with the error code the response carries, read from a real run, not assumed. MLA-6 and PR-7 follow from the two parsers.
12. A reader's refusal at HTTP 500 — NOT changed in this turn: INC-1213, owner F1-7c.

ALSO RULED
- THE `[object Object]` LINES (44, the translate route's shards): read the source line in STEP 3. If it is in a file this turn changes — the translate route or a helper it calls — the log names the refusal's code and message; a test for it. If it is elsewhere, §13.
- The viewer's state on the ad page (ruling 1, decision 12) and the reset time's four tests stand as ruled. `DR-RL-1` as the GO has it.
- THE PRODUCTION ORDER, for §9 of your report: the ten pairing lines in file order, with one sentence — "files 7 to 10 and the Publish are done back to back: between them the published client calls three closed names and one dropped one".
- The second half's commits, gate, one push and report are the GO's STEPS 3 to 7 unchanged. If GitHub reports a conflict with dev at the final push (Lovable's #76 merges into `src/features/admin-monetisation/`, the strip, `en-admin.ts`, `am-admin.ts`, `en-guide.ts`, `am-guide.ts` and the usage maps), STOP and say so.

RECORDS (word for word into §14, beside the GO's and ruling 1's)
INC-1213 — a reader's gate refusal (`door_refuse`, SQLSTATE P0D01, raised with no shell handler) reaches a browser through PostgREST as HTTP 500, on every reader on the gate since F1-1 (`e2e/legal-admin.spec.ts`'s reader test shows it). The client reads the code first from F1-7a on, so no screen misreads it; the status still says server error to a log or a monitor. Class: a refusal's status left to the transport. Owner: F1-7c — one mechanism for every reader's refusal status.
INC-1212, INC-1162, INC-1158 — the lines of ruling 1, with the brackets your stop report filled.
DEC-408, DEC-409 — the lines of ruling 1.
roadmap — under Foundations 1, F1-7c: "A reader's refusal answers its own HTTP status, by one mechanism (INC-1213)."
