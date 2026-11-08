# RULING — P-2 (c) c2a, stop 5: INC-1085 is not reproduced — the next failure must name its cause; then the GO's steps 3–7. Base: cursor/p2-fold fdd1eb4b2.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c2a-ruling-5.md` (INC-1076). It widens c2a's file list by the two files named in §2 and nothing else.

## 1. What stands

INC-1086 is done as ruled: FR-6's list gains `level` and stays exact; your census found no other exact list over the four doors' answers; 22 of 22 on both projects, 0 retries. Accepted.

INC-1085: your reading is accepted and is the record — the dial cannot be the cause (every lease deletes the account's `rate_limits` rows, `e2e/helpers/users.ts:405` and `:257`; two workers never share an account; the alias box appears only after the saved identity has loaded), and 48 repetitions against staging passed. The failure stays unexplained: the body says only that the tick did not show within 20 s, and CI uploaded no context. Of your four ways: not 1 (it drops the finding), not 3 (a fix for a cause nobody has read — G38), not 4 (an hour of staging for a maybe, when CI's repeat lane re-runs this spec on every push that touches it for free). **Option 2, built as a mechanism, is ruled** — the G20 law: evidence must be visible to the instrument that collects it; a failure that says "not visible" when the server has answered something is a reporter gap, not a test gap.

## 2. The fix: one helper, three consumers, a failure that names its cause

- A helper in `e2e/helpers/` — extend the existing alias or wizard helper if one already waits for this check (read the helpers first, K1); otherwise a new `expectAliasAccepted(page, alias)` (name it by what it asserts). It does three things in order: (a) types the alias and waits for the response of the alias route (`/api/listings/alias`, the request the typing triggers) with a deadline no longer than today's 20 s; (b) reads the answer and asserts it says the name is available — when it does not, the assertion's message carries the HTTP status and the answer's body (the refusal code and the door's reason as the envelope gives them — scratch data, nothing personal), so the next red names its cause; (c) then expects `post-who-alias-ok` visible. No timeout is widened; the 20 s stays.
- The three tests that type an alias (PW-27, PW-48, PW-141 in `e2e/post-wizard-category.spec.ts`) call the helper instead of their own fill-and-expect lines. Nothing else in the file changes.
- Positive control (G38 — a flake fix that cannot be shown red): a small unit test of the helper's message builder with a stubbed refused answer proves that the message carries the status and the body; the helper's happy path is proven by the three tests passing (run `post-wizard-category.spec.ts` whole, alone, 0 retries, both projects — G37).
- One read, not a run: open the alias door's rules (the SQL that refuses an alias — its pattern, length and reserved-name checks) and state in the report whether a name of the form `e2e_` + six random letters and digits can ever be refused by them. If a rule can refuse it, change the test names to a form that rule cannot refuse and cite the rule's file:line as the cause; if no rule can, change nothing and say so. This is the only path to a cause tonight; everything else waits for the next occurrence.

## 3. INC-1085's disposition

OPEN, watched: cause not reproduced (48 of 48 against staging, your table); the dial excluded by reading; the capture of §2 lands so the next red carries the route's answer; the flake ledger is read at every verification (three in seven days is already an INC). The report's Records section carries this wording under INC-1085; I number nothing new for it.

## 4. Then — in the same turn

The GO's steps 3–7 as ruling 4 §3.4–§3.6 fixed them (the store, the readers' types from the applied patch, cardLookOf / adPageLookOf on `{placement, badge}`, the tier-word fold from `docs/governance/briefs/p2-fold-strings.json`, W1, the CF-LEVEL-1 empties, the owed tests; G37 local runs; budgets with ruling 1's tolerance; push; END THE TURN; the final report with FINDINGS, K2, Records and the CI line). Stop only for a question none of the rulings answers.
