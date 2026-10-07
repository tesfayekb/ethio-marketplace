# Bundle 8, turn 3 — ruling 2 (the placeholder migration; rebuild M14)

```text
RULING 2 — bundle 8, turn 3: rebuild M14 and finish the turn. THIS REPLACES THE FIRST RULING WHOLE. Base: dev 181b8db8.

YOUR QUESTION: option 1 — rebuild M14 in this turn and apply it. The lost draft was never reviewed by the supervisor; the brief is the specification, and the supervisor reads M14 in the repository before the operator's staging apply, as for every migration. Your stop was right.
THE BASE: the two commits after 6c2cd60 are the platform's own — it set @lovable.dev/vite-tanstack-config back from 2.26.0 to 2.25.3 (package.json, bun.lock). Leave it; name it in your report's first lines.

0. KEEP THIS RULING. Save this text unchanged as docs/governance/briefs/bundle-8-ruling-turn-3.md (one fenced text block under a one-line heading). If the turn is continued, read it after the brief.

1. M14, REBUILT FROM THE BRIEF — written, checked and applied in ONE sitting.
   a. Read again on ethio-prod (SELECT only): the brief's query (3) for the fifteen names and their identity arguments, and pg_get_functiondef of public.validate_listing_attributes (it must still equal M13's file — say so).
   b. Write the file in a scratch path, exactly as the brief specifies: step B7's function whole with its three privilege lines (B7.1, B7.2); Part A's statements (A2 — the three default-privilege lines, the three trigger functions, the twelve others each with its GRANT to service_role); ONE DO block of proofs (B7.4 and A3); then, directly before its own self-mark, this ONE extra statement:
      INSERT INTO public.migration_marks (version) VALUES ('20261007150540') ON CONFLICT (version) DO NOTHING;
      then its own self-mark, 20261008050000 — if at apply time that is no longer later than now() AT TIME ZONE 'utc' on ethio-prod, choose it again by the brief's rule (above 20261008040000).
   c. Check it before the tool sees it: copy the migrations folder and the draft into a scratch folder, run scripts/check-migrations.sh on it, and paste "Born-closed guard OK", "Self-marking guard OK" and "Migration guard OK" (the placeholder file is still flagged there until step d's allowlist line exists — add that line in the scratch copy too, with the stamp you expect, to see the whole check pass).
   d. Hand the database tool the FINAL text in ONE call — never a stub, a comment or a draft. If the platform ends the turn before that call, the scratch draft may be lost again: say so, and on the next turn rebuild and check it again before any call.
   e. After the apply, scripts/migration-mark-allowlist.txt gains ONE line at its end, in the form of the lines for 20261004010309 and 20261004072852:
      20261007150540_e41a9cb4-6d28-4fd3-9757-82a8a35777ca.sql | comment-only file applied in error before M14 (executes nothing); its ledger row 20261007150540 is recorded by M14 | <M14's file stamp>
   f. Read back on ethio-prod and paste: select version from public.migration_marks where version in ('20261007150540', '<M14's mark>') order by 1 — two rows; the function's four header facts; the reads A5 names. Then run scripts/check-migrations.sh on the real folder and paste its line for the allowlisted file and its three "OK" lines. In the report give M14's file name, its line count and its sha256.
   g. The placeholder file is NOT applied on ethio-staging (it executes nothing). The stop report's staging line is: apply <M14's uuid fragment> → expect marks 20261007150540 and <M14's mark>.

2. THE CLASS RULE (third comment-only file applied in error). AGENTS.md gains ONE line beside its migration lines:
   - The database tool applies the text it is handed, in the same call: write and check a migration in a scratch path, then hand the tool the FINAL text once — never a stub, a comment or a draft to replace later; a scratch draft does not outlive the turn (three comment-only files were applied in error: 2026-10-04 twice, 2026-10-07).

3. CI — what is yours and what is not. The run on 181b8db is red in two places only: the migration linter (the placeholder — repaired by step 1 e) and the E2E preflight (the placeholder's ledger row — repaired by M14 and the operator's staging apply). The Semgrep red on 6c2cd60 was a failed upload during a GitHub incident (15:06–15:16 UTC) and is green again: nothing to fix.

4. R-4 (e2e/auth-reset.spec.ts :129) — find the cause before the turn ends; press no "Sync keys" anywhere. The test setup itself resets every English row of ethio-staging's store to the compiled catalog on each run (e2e/global-setup.ts :1201–1250, INC-175), so an old English text on the page is not expected. Do, in this order, and paste each result: (i) with the E2E credentials, read on ethio-staging the row of public.ui_translations where key = 'auth.resendCooldown' and lang_code = 'en' — value, status, updated_at; (ii) run e2e/auth-reset.spec.ts whole, alone, both projects, 2 workers, 0 retries, and paste its `[e2e:setup] healed … stale EN rows (INC-175; …)` line and its result; (iii) read the row again. If the row holds the old text after a setup that says "probe complete", that is a defect of the reset: report it, change nothing. If R-4 passes, say that it passed and that the earlier red is unexplained — do not call it fixed.

5. NOTED, no action: the third read of the published site's language list (the brief allowed two). The title of commit 6c2cd60 says M14 was applied; it was not.

6. THEN FINISH THE TURN as the brief says: A5 (the baseline; expected 12), A6, one changelog line for the repair (it names no function), the roadmap ticks, the STOP REPORT with the full `key | en | am` list; END THE TURN. Files this ruling adds to the turn's scope: scripts/migration-mark-allowlist.txt, AGENTS.md (the one line), docs/governance/briefs/bundle-8-ruling-turn-3.md.```
