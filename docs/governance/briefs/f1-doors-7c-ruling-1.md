RULING — f1-doors-7c, stop 1: the cut accepted, the session's cause read from production, the reader's mark guarded. Base: cursor/f1-doors-7c 3ae7c28ac.

PREVENTION (G70)
- Class 1 (the supervisor's): the GO folded three mechanisms of different sizes into one turn (the database's status, the client's reader, the session) and set the cut without the typed `Result`'s count. Changed here: the cut below. In force now: a GO that holds more than one mechanism gives each its own cut, counted by the census before the GO is written when the supervisor can count it (`rg -c` of the call shape).
- Class 2 (the supervisor's): the GO's session hypothesis was written from the auth log alone, without the edge log's per-request token. Changed here: the supervisor read the edge log (below). In force now: a session finding names, per failing request, which session its token carried.
- Class 3: a predicate that marks doors from readers ("spends a dial") is true today by the census's count, and nothing keeps it true. Changed here: decision 3, a standing check (G74 (3)).
Repository: decision 3's check lands in this turn. Cursor rules: not needed. Knowledge: not needed.

THE SESSION'S CAUSE, READ BY THE SUPERVISOR (ethio-prod's edge and auth logs, 2026-11-20; for F1-7d's census, recorded here):
- 07:00:56Z: `/auth/v1/logout`, sent by session `a352ce3f…`, which was valid until 07:22Z. Every call before it answered 200 under that session.
- 07:01:20Z: a password sign-in; new session `cfe7a770…`. From 07:01:21Z every call carried `cfe7a770…` and answered 200.
- 07:01:22.067Z: `/auth/v1/token` answered 200 with no API key's role. 07:01:22.102Z: `/auth/v1/token` (grant `refresh_token`) answered 400 `refresh_token_not_found`, carrying the anon key.
- From 07:01:22.174Z: `get_my_permissions`, `get_active_impersonation` and `my_legal_status` answered 401 carrying the ANON role, with no user token at all.
- In the same second, `/rest/v1/profiles` kept answering 200 under `cfe7a770…`.
So the browser held at least two auth clients with separate state. One saw the sign-out and the new sign-in. The other kept the signed-out session's refresh token, refreshed with it, was refused, and dropped to anon, so every call made through it answered 401. The edge log does not record which client made which call. F1-7d's census finds, from the code, every place a Supabase client is constructed in the browser (`createClient`, the door seam, the platform client) and the auth state each holds. The fix makes one auth state for the page.

THE RULINGS
1. THE CUT, accepted as you propose.
   - F1-7c, this lane: the status table and the reader's path; `reader-failure.ts` in the same Publish; `e2e/legal-certify.spec.ts:1343` (500 → 401) and every other spec the census found reading a reader's 500; INC-1214 (`src/server/door.ts`); INC-1215 (`src/server/answer.ts`); `assign_role` (INC-1217); the location comment; the guards' retirement reading with the seven drops; `isDeactivatedRefusal` removed with its test (decision 6).
   - F1-7d, a NEW lane after F1-7c merges: the one refusal reader and its census (INC-1189, including `src/lib/door-codes.ts`'s second parser and `src/server/imports/route.ts`'s second status table); the reset-time words; the session's end (INC-1218), its polls and its words. Its GO comes from the supervisor and names `src/components/app-shell.tsx`, `src/routes/auth.tsx`, `src/router.tsx` and the client construction in SCOPE.
   - The typed `Result` (117 raw `.rpc(` sites in 25 browser files): ACT-027, its own turn, after F1-7d.
2. THE SIGNAL: `PGRST`, accepted. The body keeps `code: P0D01` and `message: <code>[:<detail>]`, so no parser changes for it. The status comes from the one table, which `door_refused` also reads. Prove it in the migration with a call that reads the raised SQLSTATE and its detail JSON. The HTTP status is proven by the e2e ids the census names (legal-certify's reader test among them).
3. THE MARK: `door_context` marks the outermost call transaction-locally. A door with a dial marks "door" first, and a reader with no dial marks "reader" only when nothing is marked yet. `door_refuse` raises `PGRST` only when the mark is "reader"; unmarked (a job, a trigger, a migration) it raises P0D01 as today. Because the dial predicate is true only by today's count (124 doors on the shell, each with a dial; 83 readers on the gate, none with one), `check-doors` gains a static judgement in this turn: a manifest line with a dial cell has the P0D01 shell in its last body, and a line on the gate with no dial has none. Give it a planted case in `scripts/doors/check-doors.test.ts`, and name the finding kind at the migration stop. If one line breaks the rule, STOP and name it.
4. THE DROPS: the seven are accepted (`edit_listing`, `relist_listing`, `set_listing_price`, `get_browse_tree`, `get_category_attributes`, `get_ui_bundle`, `package_price_for`). They go in the last file, each with its RETIRED line leaving. The supervisor read ethio-prod's edge log for the 24 hours to 2026-11-20 09:50Z: no call to any of the seven.
5. THE MODELS: STEP 2 in THIS chat (Claude Opus 5.5). STEPS 3 to 7 of F1-7c, which are now small (`reader-failure.ts`, the two log lines, the tests), in a NEW chat on Claude Sonnet 5.5 (DEC-387) after the migration stop's ruling.
6. THE PREMISES you found wrong:
   - `deactivated.ts` stays; only `isDeactivatedRefusal` and its test go (INC-1188's record says so).
   - `signed-in-reader` is the manifest's class, and `door_context` sees `reader`; the mark reads `door_context`'s own argument and the dial, never the manifest.
   - The second status table and the second parser are F1-7d's.
7. SCOPE for F1-7c: the brief's SCOPE, narrowed by decision 1. No widening.

RECORDS (word for word into §14, beside the GO's; the bracketed parts are filled at F1-7c's report)
INC-1218 — the cause, read by the supervisor from ethio-prod's edge log (2026-11-20): two browser auth clients with separate state. One kept a signed-out session's refresh token, was refused at 07:01:22Z, and its calls went out as anon (401), while the other client's calls carried the new session (200). Owner: F1-7d.
ACT-027 — the typed `Result` for every browser `rpc()` call (INC-849, INC-942): the raw `.rpc(` sites F1-7c's census counted in browser files. Its own turn after F1-7d.
roadmap — under Foundations 1: "F1-7d — the one refusal reader (INC-1189), the reset-time words, the session's end (INC-1218); a new lane after F1-7c." and "ACT-027 — the typed Result, after F1-7d."
