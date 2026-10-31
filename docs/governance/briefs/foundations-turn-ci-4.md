```text
RULING — turn CI-4: the CI backend's migrations apply with nothing else running (INC-1028, DEC-313). Base: dev 4a4ee518 (0e6f8a96 plus the plan file). Tier B (CI infrastructure). No migration, no new dependency, no new string, no app code. Lovable. Saved as docs/governance/briefs/foundations-turn-ci-4.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-ci-4.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

CI FIRST:
- The run on 0e6f8a96 (41184135622, 08:41Z) failed only the first-paint budget. One page sits in the NEAR band by CI's size: /admin/listings_/$listingId_/edit 404.8 / 405.
- Raise it to ceilingFor(404.8) = 406 in DEC-296's form. Its cause is F3's picker placement code on the edit page, which carries the pickers.
- Everything else was green: 2,493 passed, 0 failed, 0 flaky; every lane's backend started; DEC-309 run 6 of 10 with 0 registry refusals.
- The run on 4a4ee518 may still be running: read it again before your push (S502).

F3: CLEAN, apart from that one ceiling. The operator published the site at 08:50Z, after F3.

YOUR PLAN, RULED (G17, overridable; DEC-313):
- Approved: the cause analysis, honest as written; the chosen mechanism (start on a working copy with no migrations, cron held with `cron.launch_active_jobs = off`, `supabase migration up --local` in one session, restore and prove); the version check and its STOP; the classifier CF-CI-START-1 with SF-1…5; DEC-313's frozen rule; the proofs census as an allowlist; one turn.
1. The evidence for the cause is read now, not in a later lane. The four fact-1 runs and the deadlock run, at their ci-evidence commits:
   - aed7904b: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/9fad723ea65b94420b57c226243e3027b925b3d6/docs/tracking/local-backend-proof.md
   - e195034e: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/0dcba0dc42cf4de5d137067ff9a45c21b0778eb3/docs/tracking/local-backend-proof.md
   - b3e8dba2: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/517a7ad85f69734141eae2a118b919092fa2ab98/docs/tracking/local-backend-proof.md
   - fc918fbb: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/cc7dea1860f10d01248b91eafe7df6bf0b0098ef/docs/tracking/local-backend-proof.md
   - d2e9bb36 (the deadlock): https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/7f6569ea607cb835b5c71ca08df0272bcbf63cdc/docs/tracking/local-backend-proof.md
   The report says what their session samples show: cron sessions, appliers, other sessions. No repro lane in flake-check.yml: it needs the operator's dispatch, and from now on the classifier records the same evidence at the next failure.
2. The new start must prove, before the lane's tests, everything the old start gave:
   - "applied N/N" and the migration history equal to what `supabase start` records today;
   - PostgREST serving the final schema: a REST read of a table created by a late migration, after a `NOTIFY pgrst, 'reload schema'` if the schema cache needs it;
   - the auth hook (before_user_created) answering: global setup's sign-ups already exercise it, so a hook failure fails as infrastructure in the start step, not later in a test;
   - cron restored and its scheduler session present, as your plan says.
   The INC-944 session sampler moves to the apply step, where the migrations now run.
3. The images job (DEC-309) and CF-CI-IMG-1 stay true. The start still runs once per lane, never in a loop, and the apply step is not retried. CF-CI-IMG-1 reads the new shape; its definition changes only if it must, named under G38.
4. The proofs census:
   - a conformance test over supabase/migrations by definition: a proof that keys a row on the current second (clock_timestamp() or now() turned into a key), or uses a fixed key, in a shared table without its own scratch key;
   - every landed hit is an allowlist line `file | reason | until`, with until "landed; G39";
   - a new migration file with such a proof fails;
   - planted case.

SCOPE (by area):
- .github/workflows/local-backend-proof.yml (the start step and the sampler);
- scripts/ci/ (classify-start-failure.ts and its test);
- scripts/conformance/ (the proofs census, its allowlist, ci-images.test.ts only if item 3 needs it, wired.test.ts);
- scripts/route-budgets.mjs (the one ceiling);
- docs/features/e2e-harness.md and docs/features/ci-local-backend.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope. No landed migration file is edited (G39).

HOW TO WORK: K1–K6.
- Write the report, docs/governance/reports/foundations-turn-ci-4.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI lines for 0e6f8a96 and 4a4ee518;
  - item 1's reading of the five runs;
  - the start as built, step by step, and item 2's proofs;
  - the pg_cron version read;
  - CF-CI-START-1 and SF-1…5;
  - the census and its allowlist;
  - DEC-313's rule;
  - the unit count;
  - K2;
  - git diff --name-only 4a4ee518.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
