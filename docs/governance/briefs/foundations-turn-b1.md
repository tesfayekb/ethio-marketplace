```text
RULING — turn B1: CI's two reds and the laws first (INC-1030), then the dark-card choice (D262). Base: dev 060d4d60 (d04eb489 plus the plan file). Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-b1.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-b1.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

CI FIRST. The run on d04eb489 (41187423575, 09:29Z):
- DEC-313's start worked on every lane: restored "on on 1"; PostgREST serves job_runs; the hook answered 200. E2E: 2,493 passed, 0 failed. DEC-313 run 1 of 20; DEC-309 run 8 of 10, 0 refusals.
- Two component-test reds, both CI-4's own, fixed first:
  - TI-1 (scripts/test-ids.test.ts): CI-4's new ids are already in use. SF-1…5 clash with src/features/admin-screening/use-screening.test.ts :40, :80, :96, :153, :161, and PK-1 with e2e/shell.spec.ts :3961. Rename CI-4's (for example CSF-1…5 and MPK-1), with every reference.
  - CF-ADOPT-1 (scripts/conformance/kit-adoption.test.ts :86): scripts/conformance/migration-proof-keys.test.ts :1 imports its own tree enumerator. It walks through the conformance kit (kit.ts) like every other census.
- The run on 060d4d60 may still be running: read it again before your push (S502).

1. INC-1030, the laws first:
   - Three turns running pushed a new test or guard that broke a repository-wide law: F (e2e-select, BX-1, PPF-1) and CI-4 (TI-1, CF-ADOPT-1). Each time the local checks hit the time limit before the unit suite that holds those laws.
   - `bun run checks` (scripts/ci/turn-checks.ts) runs the scripts/ tests first, inside the fast line (DEC-311): the conformance and id laws, about a minute, so they are never the part a time limit cuts off. No step is dropped and the final verdict is unchanged.
   - TC-E3: the scripts/ tests run before any other unit test, and their failure shows in the fast line.

YOUR B PLAN, RULED (G17, overridable; DEC-314). Approved:
- the three dark candidates and their measured ratios;
- B provisional in `.dark`;
- the /dev/style grid scoped by `data-card-candidate`;
- the photo well at #303C35;
- the ring moving to the candidate edge on `--lift-card*`;
- the census;
- ONE_LINE_SLOT with CutText;
- the split into B1 and B2.

Rulings:
2. B1 builds the dark-card choice only:
   - the candidate tokens;
   - B in `.dark`;
   - the /dev/style grid (A, B, C; plain, Premium, Featured and no-photo cards each), off every public path;
   - the token tests under G38, old and new;
   - in-page contrast checks of each candidate against the targets (surface ≥ 1.25, edge ≥ 1.8, text ≥ 4.5).
   The operator then picks on /dev/style after Publish, and his pick lands in B2 as a one-line token change.
3. For B2, written now so nothing waits:
   - The Negotiable pill's ink is a success-ink token (#17503A light, #7FC9A6 dark) beside `--success-soft`, never a tier token: a tier colour on a non-tier label couples two concerns.
   - ONE_LINE_SLOT keeps the fixed words whole and cuts only the place name. The common case must not cut. OL-1 also asserts that every market name in the e2e catalogue shows whole at 360 in every public language. If one would cut at the §5 phone size, the phone heading size steps down (one token) until it fits; only a name longer than any real one cuts (OL-2).

TESTS
- TC-E3. The renamed ids and the kit walk.
- The token and contrast tests.
- The touched specs whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.
- A page whose JS first download crosses the NEAR band follows DEC-296's form, with its cause.

SCOPE (by area):
- scripts/ci/ (turn-checks.ts and its test; classify-start-failure.test.ts ids);
- scripts/conformance/ (migration-proof-keys.test.ts, its allowlist if the walk changes a path);
- src/styles.css, src/lib/themes.ts, src/lib/schemas/theme.ts and their tests;
- src/routes/dev.style.tsx (the candidate grid) and its tests;
- e2e/ for the contrast checks, added to scripts/e2e-select.ts;
- scripts/route-budgets.mjs for named ceilings;
- docs/features/design-foundation.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- Write the report, docs/governance/reports/foundations-turn-b1.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI lines for d04eb489 and 060d4d60;
  - the two reds' fixes and item 1;
  - each candidate's tokens with their ratios as measured in-page;
  - the G38 list;
  - growth;
  - the unit count;
  - K2;
  - git diff --name-only 060d4d60.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
