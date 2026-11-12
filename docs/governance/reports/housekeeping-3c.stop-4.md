STOP — housekeeping-3c part B: lane 1's maintenance pass fails at the photo reaper's proof upload
DONE: parts A, B, C, D; ruling 3's commit (0c511d9f1, the last code commit); STEP 6 on 0c511d9f1 (`bun run typecheck` exit 0, `bun run lint` exit 0, `bunx vitest run scripts --maxWorkers=2` 110 files 568 passed 1 skipped, `checks: 35 PASS · 0 FAIL · 24 NOT RUN · 470s`, `check-go --at 611ade039` the one expected CF-BRIEF-16 finding); the self-review read
LEFT: the fix this stop asks for; the pull request's CI green; the report; the docs-only report push
CI: the pull request's runs on the lane:
- 43220268168 (b29387ba3, stop 3's push — Parts A → D): completed, **failure** — `E2E lanes / Lane 1 on temporary Supabase` failure, and the merged `E2E (Playwright, ethio-staging)` verdict failure after it.
- 43222749146 (0c511d9f1, the judged run): in progress when read; `E2E lanes / Lane 1 on temporary Supabase` completed **failure** with the same error.
- Root `ci-status.md` on ci-evidence still names ab9670e32 SUCCESS, run 43191935076 (the newest completed run before these).
FILES: this turn's, `git diff --name-only 611ade039` on 0c511d9f1, plus this file:
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/ci-status-reporter.md
docs/features/e2e-harness.md
docs/features/nightly-e2e.md
docs/features/security-scanning.md
docs/governance/briefs/housekeeping-3c-ruling-1.md
docs/governance/briefs/housekeeping-3c-ruling-2.md
docs/governance/briefs/housekeeping-3c-ruling-3.md
docs/governance/briefs/housekeeping-3c.md
docs/governance/go-template.md
docs/governance/reports/housekeeping-3c.stop-1.md
docs/governance/reports/housekeeping-3c.stop-2.md
docs/governance/reports/housekeeping-3c.stop-3.md
docs/governance/reports/housekeeping-3c.stop-4.md
e2e/global-setup.ts
package.json
roadmap.md
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/on-demand-failure.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-failure-report.ts
scripts/fixtures/local-backend-repeat.43144538685.txt
tsconfig.scripts.json

## The red (class e, rule 40: this turn's; not re-run)

Both runs' lane 1, its log `1.log` (artifact `e2e-log-1`, read by `gh run download`), with `E2E_MAINTENANCE: 1` on the proof step (Part B):

```text
[e2e:setup] healed 0 stale EN rows (INC-175; probe complete; 112 ms)
[e2e:setup] reaped 0 stale scratch role(s)
[e2e:setup] reaped 0 stale scratch listing(s)
Error: [e2e:setup] photo reaper proof upload failed: mime type text/plain is not supported
   at global-setup.ts:973
```

The pass's photo-reaper proof (DEC-077 part 2, `e2e/global-setup.ts` :963 → :982) uploads `card.txt` as `text/plain` into `listing-photos` (:967 → :971). That bucket allows `image/jpeg`, `image/png` and `image/webp` only, on every backend. The temporary backend's seed (`scripts/ci/prepare-local-backend.sh` :23 → :26) and ethio-staging carry the same list: the operator set it on both projects on 2026-10-28, and migration `20261029025242_89f5cbc9-…` (M7, INC-939) reads it back and refuses on any difference. So the upload fails on staging too: with Part B merged, the nightly's first Playwright run would throw in its setup every night, and DEC-369's judge ("reverted … if the pass fails a setup twice") would revert it.

Why nobody saw it: the proof's `text/plain` upload dates from 2ce339607 (2026-09-25). The pass's last CI owner went with cc93140c2 (2026-10-21), and the allowlist arrived on 2026-10-28. The proof has not run in CI since the bucket was restricted. Census (`rg -n "card\.txt|text/plain|reaper proof" e2e scripts src`): the proof is the only bucket upload of a disallowed type; the other `text/plain` hits are Playwright attachments and route answers.

My Part B premise was wrong. I took "the temporary backend has both buckets and the prune doors, so lane 1's pass should run" from the seed's existence, and never ran the pass to see. Nothing later in the pass (the photo sweep, the category-assets sweep, the tripwire) has been seen to run on either backend since 2026-10-21, so the next run may meet a second failure.

## Why a STOP

The fix is a code change in `e2e/global-setup.ts`, whose SCOPE is "the global setup's maintenance-owner comment … a comment line only". The red names a path this turn changed (lane 1's step in `local-backend-proof.yml`), so the brief's TOLERANCES make it a STOP.

## QUESTION

Which form?
(a) SCOPE gains `e2e/global-setup.ts` :967 → :971: the proof object becomes a type the bucket allows (`card.png`, `image/png`; the proof only needs an object to delete, so its bytes stay a one-byte body). Parts B's lines stay. The next run of lane 1 proves the rest of the pass on the temporary backend, and a second failure there is a further stop. (My recommendation: this is the one thing between DEC-369 and its judge, and lane 1 would find any later failure before the nightly does.)
(b) Withdraw Part B's two `E2E_MAINTENANCE` lines this turn (CF-CID-7 then holds that nothing sets it, or leaves with them), keep the comment's history, and record the proof's type as an INC for its own turn; DEC-369 waits.
Either way the pull request is not green until the ruling's change lands: lanes run on every code push, and lane 1 meets this error on each.
