Source: supervisor thread, turn 905, Mon 2026-09-28 10:29 New York.
Status at 2026-10-05: rulings made by the supervisor on 2026-09-28 10:29 (149 + 14 definer warnings by design; pg_trgm accepted until the scale phase; leaked-password protection to be turned on — the operator did so, per turn 961); the R1 prompt was built (run 36494534782 green, main 4e2a9aad); the promised read-only audit "to prove no function skips its permission check" has not been run; the repo holds the census facts in docs/tracking/security-scan-2026-09-28.md but not these rulings.
Related: DEC-083, DEC-084, INC-326, INC-325, INC-324, INC-320, W2, REQ-039, security-scan-2026-09-28.md.

INC-321 is verified. The board is red for a formatting reason in the other change (DEC-083/084), and this run also exposed a real gap in that change. One correction prompt fixes both.

**Verdicts**
- **INC-321 is verified.** Every browser test passed in CI on `694689f6`, including PW-73 and PR-14. The only change to the database function is the new currency line in its answer. The client copies the currency without triggering another save. Staging has both migrations (the pre-test check passed). It closes once the board is green.
  - The extra "healer" migration was my fault: I gave a version number that was earlier than the file's own UTC timestamp (logged as S66). Lovable fixed it the same way an earlier case was fixed. From now on I'll only give version numbers later than the current UTC time.
- **Red board (INC-326):** the format check fails on the new `ssr-error-allowlist.txt` because it has no parser. The same thing happened once before with another `.txt` file, so this becomes a class rule.
- **DEC-083/084 need correcting.** This green run shows the gap: both new sections say "No … lines (or no log was uploaded)". That's because CI uploads the browser-test logs only when a job fails. On a green run the new check is blind but reads as clean, which is exactly the silent-failure case it was built to catch.
- **The first seeded list already found three problems:**
  - **INC-323:** a "listing not found" message nobody could attribute to a test. My guess, not yet confirmed: an autosave fires after the test's cleanup has already deleted the listing.
  - **INC-324:** a "null value in listing_revisions" database error. The save function checks that the draft exists without locking it. If the draft is deleted at the same moment, the update matches nothing and the history write fails. A seller deleting a draft while it autosaves could hit this.
  - **INC-325:** accessibility — on a phone, the scrollable category list on step 1 can't be reached with the keyboard. This goes into W2, which already changes that list.

**Security warnings (my rulings):**
- **The 149 + 14 "users/public can run protected functions" warnings are by design.** Every function checks permissions itself, and the 14 public ones are catalog, location and screen-text reads. One read-only audit follows to prove no function skips its permission check.
- **`pg_trgm` in the public schema:** accepted for now; I'll move it in the scale phase.
- **Leaked-password protection:** turn it on (steps below, after the fix is green).

## 1 — Paste this into Lovable now

---
```
DEC-083/084 R1 — the red (INC-326) and the blind census. Tier B (harness; the workflow change is named by DEC-083/084 under G22). No migration.

SCOPE — you may touch only: .prettierignore; .github/workflows/ci.yml (the three log-capture conditions and the shard --grep-invert, nothing else); e2e/a11y.spec.ts (tags only); scripts/e2e-failure-report.ts (+ its self-test); docs/features/e2e-harness.md; docs/_changelog.md.

PART 0 — the red (run 36435962253, Build job): prettier's "docs/**" glob reaches docs/tracking/ssr-error-allowlist.txt → "No parser could be inferred" → exit 2. Add it to .prettierignore beside the INC-192 entry (:66–67) with the comment "# DEC-083 / INC-326: the ssr-error allowlist is a plain pattern list (no parser)." Class rule (second parser-less file after INC-192), for the docs: a new parser-less file under a prettier glob lands with its .prettierignore line in the same turn; format:check runs on the WHOLE tree before reporting, never only on changed files.

PART 1 — logs on every outcome. The smoke (ci.yml:396–397), shard (:660–661) and email (:806–807) log-capture steps run `if: always()`; artifact names (e2e-log-*), paths, overwrite and retention unchanged. One comment line on each: "DEC-083/084 — the census and the a11y summary read every source's log on every outcome." Evidence: run 36435962253 was green and both new sections read "No … lines (or no log was uploaded)".

PART 2 — the a11y pass runs once. Tag both a11y tests "@a11y"; the shard command's --grep-invert becomes "@global-state|@a11y" (the smoke tier still runs the file by name). The changed lane is untouched.

PART 3 — each section states its own coverage (G20 self-report law). First line of both sections: "Logs read: <sources> · unavailable: <sources or none>", computed from the expected sources. Replace the combined sentences: zero lines with every expected log read → "No [ssr-error] lines in any source (all <N> logs read)." / "No [a11y] lines in any source (all <N> logs read)."; any expected log unavailable → name those sources "log unavailable" and never state zero for them. Self-test with real captures: (a) the census fixture as one source plus one expected source with no log → the missing source is named and the "No [ssr-error] lines" sentence is absent; (b) every expected log present, none carrying the tag → the "all N logs read" sentence; the same pair for the a11y section.

DOCS: e2e-harness.md — under DEC-083, one paragraph: every source uploads its log on every outcome, and each section states which logs it read. One changelog line naming INC-326 and R1.

INVARIANTS: whole-tree format:check, lint, typecheck, the reporter self-test and a local run all green before reporting; nothing outside scope; limitations before the end.
COMPLETION REPORT: the three conditions and the grep-invert as landed; the coverage line from your local run; the self-test lines.
```
---

Nothing to attach, and no Publish needed; this change is CI tooling only.

## 2 — After R1 is green: turn on leaked-password protection, staging first

1. Supabase → **ethio-staging** → Authentication → Email provider settings → switch on **"Prevent use of leaked passwords"** → Save. This is a Pro-plan feature; if the switch is greyed out, tell me.
2. Wait for the next CI run. If it's green, do step 3. If a sign-up test fails with a password refusal, tell me and I'll fix the test.
3. Do the same on **ethio-prod**.

After R1, the queue is: W2 (the model field showing "Choose", auto-scroll to the first missing field, the red border on the category list, and INC-325) → the draft-save locking fix (INC-324) → the importer fixes → the installable-app setup (REQ-039) → the records update and handoff.

Sources: [Supabase — Password security](https://supabase.com/docs/guides/auth/password-security) · [Supabase discussion on the leaked-password warning](https://github.com/orgs/supabase/discussions/39101)
