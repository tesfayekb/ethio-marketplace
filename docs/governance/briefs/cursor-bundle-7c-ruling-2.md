RULING — cursor-bundle-7c, stop 2: option (a), the retry and the capture's cause field; the browse-path guard admits the hook from admin folders. Base: cursor/bundle-7c 88334f2ed

**MODEL — Claude Opus 5.5 (High), in the SAME Cursor chat (it is stopped at Part 4).**

Save this ruling as `docs/governance/briefs/cursor-bundle-7c-ruling-2.md` (new), by scripted copy (sha256 in the carrier).

PREVENTION (G70)

- Class — a premise about an outside system copied from a summary of a filtered capture (S807, mine; S800's class, second occurrence). The GO said the auth server "logged no cause beyond 'request completed'". That came from 7b's §15, which read a capture that keeps only `error_code` and `msg`. The server writes the cause in an `error` field on the same line, and the capture drops it.
  - Instructions, in force now (a class rule at the second occurrence): a premise about an outside system's behaviour cites the vendor's source at the pinned version, or a raw log line. It never cites a report's summary of a filtered capture.
  - Repository: decision 1 (the capture keeps the `error` field).
  - Cursor rules: not needed. Knowledge: not needed.

Your reading of the source is accepted: the challenge handler's only failure path is one database transaction, each worker holds its own factor, and the CLI exposes no auth log level. So no source line names a cause the harness controls, and the frozen rule's branch (B) applies. DEC-414's count: this stop is counted against the lane, because its premise was mine.

DECISIONS

1. Option (a).
   - Rule (B), as the GO froze it: a 500 on the challenge joins the attempt loop, and the next attempt makes a fresh challenge. The helper prints `[e2e:setup] challenge 500 on attempt <n> for <label>` for each one.
   - The capture (`scripts/ci/auth-log-capture.py`) also keeps a 500 line's `error` field: cut to 200 characters, ids masked as it masks them today, and passed through the one redaction rule set (`scripts/ci/redaction-rules.json`, DEC-368). Never a header, a token or a body.
   - Its test (`scripts/ci/auth-log-capture.test.ts`) gains a planted 500 line with an `error` field, and asserts the field is kept, cut and redacted.
   - The workflow file does not change.
   - DEC-480 goes in the Records word for word: "DEC-480 (the supervisor's) — the sign-in server's 500 on a second-factor challenge in test setup is retried once inside `aal2Session` with a fresh challenge, each retry printed in the lane log and counted by the auth capture, which now keeps the server's `error` field; when a capture names a cause the harness controls, it is fixed at that cause in the lane that next owns the harness."
2. THE BROWSE-PATH GUARD (your finding), in this lane: Lovable 10b part 2 can edit no file under `scripts/`. So `scripts/check-browse-imports.sh` now admits an import of `src/features/permissions/use-may-call.ts` from a module in `src/features/admin/` or in any `src/features` folder whose name starts with `admin-` (for example `src/features/admin-screening/`).
   - It still refuses every other importer of the permissions folder.
   - The bundle closure's must-stay-lazy rule still keeps the generated module out of the entry.
   - Planted cases beside the guard's existing fixture (`scripts/fixtures/bad-permission-import-example.ts.txt`): a browse-path module importing the hook fails, and an admin-folder module importing it passes. The proof runs where the guard runs today (its step in `.github/workflows/ci.yml`), or in a unit test you name.
   - Name the guard's change under §10.
3. Then Part 4 and STEP 6 onward, as the brief says. Read run 45838095211 (the stop push, the tree of Parts 1–3) before the final push. A red whose failure names a path this lane changed is fixed in that push.

NUMBERS ASSIGNED (G66): DEC-480 (the supervisor's, text in decision 1); S807 (the supervisor's).
