STOP — f1-doors-7c STEP 1: the census meets THE CUT (a), the session's cause (b) and SCOPE (d)
DONE: STEP 0 (7f976b478), STEP 1 (the census, 50b98d211)
LEFT: STEPS 2–7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `7e7040c991e532477436d239344261ba20760027` (short `7e7040c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T09:02:58Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44706314775
FILES:
docs/governance/briefs/f1-doors-7c.md
docs/governance/reports/f1-doors-7c.census.md
roadmap.md

The brief's STOP-after-the-census conditions that hold (each argued in
`docs/governance/reports/f1-doors-7c.census.md`):

(a) THE CUT. The typed `Result` reaches 117 raw `.rpc(` calls in 25 browser files besides
`supabase-door.ts`'s own (the cut: about thirty). The fold and the session reach about 41 source files:
13 parsers of PREVENTION (1), 14 more by definition, the folded `doorCode`'s importers, and about 9
session files (the cut: about forty).

(b) The session's cause cannot be found from the code. auth-js 2.110.9 keeps a fresh session against a
stale refresh by three guards: proactive-preserve, the commit guard and the failure cooldown. PostgREST
answers a valid JWT whatever the session's state. So neither the 07:01:22 refusal nor the 401s after
it follow from the hypothesis. The tab never received a `SIGNED_OUT`. What would find it: ethio-prod's
auth audit log for that user at 07:01:21–22Z (a `logout` or `token_revoked` row, and the session the
refresh named), and the edge log's 401 bodies (`42501` versus `PGRST303`).

(d) The one session-end state lives in `src/components/app-shell.tsx` (`hardReset`, the live guard),
`src/routes/auth.tsx` (the sign-in offer) and `src/router.tsx` (the query client's retry on a 401). No
clause of SCOPE reaches them.

Not stops: (c) the seven drops (`edit_listing`, `relist_listing`, `set_listing_price`,
`get_browse_tree`, `get_category_attributes`, `get_ui_bundle`, `package_price_for`) have no SQL,
policy, route or published-client caller; nineteen RETIRED lines stay, each with its SQL callers. (e)
The reader's status keeps every shell: `door_context` marks the outermost call by its dial
(transaction-local); `door_refuse` raises SQLSTATE `PGRST` with the `P0D01` body and the table's
status for a reader, and P0D01 inside a door. `PGRST` is chosen over the brief's `PT`, which would
rewrite the body's `code`.

QUESTION — the supervisor's ruling on the split (the census's last section):
1. F1-7c, this lane: the database half and the status (the status table and the reader's path,
   `assign_role`, the location comment, the guards' retirement reading and the seven drops), with
   `reader-failure.ts` in the same Publish, `legal-certify.spec.ts:1343` (500 → 401), and the two
   server log lines (INC-1214 `door.ts`, INC-1215 `answer.ts`).
2. F1-7d, the same lane after it: the one refusal reader and CF-REFUSAL-1, the reset-time words, and
   the session's end-state with its polls and SO-14. Its SCOPE names `app-shell.tsx`, `auth.tsx` and
   `router.tsx`. The cause is found first from the audit log, or ruled out with the end-state built
   regardless.
3. The typed `Result` (117 sites): its own turn.

Slip: one scratch file (`/tmp/ethio-scratch/f1-doors-7c/body.ts`) was written by a shell heredoc
rather than the file tool. It is outside the repository, and nothing in the tree depends on it.
