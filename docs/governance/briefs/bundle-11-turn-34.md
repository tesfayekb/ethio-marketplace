# Bundle 11 — turn C5: two pooled accounts a test at most (INC-555, DEC-174); two guards that ran nowhere (INC-563): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C5 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change. No app code: tests, checks and docs only.
Base: dev 2fb73b85. Tier B: e2e specs, unit-test checks, a shell guard, docs. No door, no database change, nothing under src/.

ANSWERS TO THE LAST TURN
- Turn C4: verified (dev 2fb73b85 holds the delivered tree and the brief as sent). Its CI run is read by the supervisor when it finishes; a fix it needs comes in the next turn.
- Turn C3: CI SUCCESS on 07c1e2b6; main = 07c1e2b6.

WHY THIS TURN
- INC-555's class at its third occurrence (L1b, L2, L4b): a test that leased three pooled accounts ran past its 60 s budget. A pooled lease resets its account with about 21 calls one after another (the lease study of turn 26), so a test's leases are most of its time. Four tests still lease three: IMP-3, SC-4, SC-8, PR-24. The class becomes a guard, under DEC-174.
- INC-563 (found while building this turn): two enforcing guards ran nowhere — no CI job and no unit test calls scripts/check-identity-tags.sh or scripts/check-datatable-minwidth.sh. Run on the tree, the identity-tag guard refuses LT-6; and it, like the test-id check, reads a test's title only on the line that opens `test(`, so a title the formatter wrapped onto the next line is not read.

WHAT THIS TURN BUILDS
- DEC-174 — an e2e test (or a `beforeAll`) leases at most two pooled accounts:
  - scripts/e2e-leases.ts (NEW) — reads every .ts file under e2e/ with the TypeScript parser (already a dependency). `leaseUser` is one lease; every other function — a helper exported from e2e/helpers/ or a file's own — counts the leases its body makes, through any depth; a test counts its body plus the `beforeEach` hooks of the describes around it; a lease in a loop or an array method's callback (`map`, `forEach`, …, `poll`, `toPass`) is refused; both arms of an `if` count. `useJobSuperAdmin` and `createUser` are not pooled leases.
  - scripts/e2e-leases.test.ts (NEW) — EL-1..EL-3 on planted files; EL-4 on the tree. On the base EL-4 fails with exactly: IMP-3, SC-4, SC-8, PR-24 (754 tests and hooks counted: 351 lease none, 370 one, 29 two, 4 three).
  - The four split, every assertion kept, each part seeding its own rows:
    - e2e/admin-audit.spec.ts — IMP-3 (the self target, a super-admin target) and IMP-5 (a caller who is not a super admin). IMP-4 is not used: an older comment in use-impersonation.ts already says IMP-4.
    - e2e/admin-screening.spec.ts — SC-4 (a person with no role cannot decide) and SC-16 (a reviewer without a fresh second factor cannot decide); SC-8 (a person who is not a reviewer reads nothing, reveals nothing, no row written) and SC-17 (a reviewer without a second factor reads the facts and reveals a shown number, logged once — D129). Each keeps its 180 s timeout as before (none raised).
    - e2e/posting-routes.spec.ts — PR-24 (refused without a public name; a person without a first name refused) and PR-44 (a business with its name and no personal names publishes).
- INC-563:
  - scripts/check-identity-tags.sh — reads a title wrapped onto the line after `test(`; its self-test plants one (X-3) and fails if it is not flagged.
  - e2e/admin-locations.spec.ts — LT-6 enrols a factor on its own leased account, so it carries `{ tag: "@private-identity" }` (the tag changes only what `useJobSuperAdmin` hands out; LT-6 does not call it). The formatter re-indents the test's body: no other change in it.
  - scripts/shell-guards.test.ts (NEW) — GW-1: the identity-tag guard's self-test, then the tree; GW-2: the DataTable min-width guard on its planted file (one finding, exit 1), then the tree (findings: 0). No workflow change: the unit tests already run on every commit.
  - scripts/test-ids.ts — the whole text is read at once, so a wrapped title is read (seventeen were not; none collided). scripts/test-ids.test.ts gains TI-5.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- DEC-174: the limit is two pooled accounts a test. JUDGE, frozen before the numbers: over the ten CI runs after this landing, count the matrix-lane timeouts of tests that lease two pooled accounts; 0–1 the limit stays; 2 or more, the parallel reset becomes the next harness item under its own DEC (G22), the limit unchanged until it lands. The reset itself and the pool's size are not changed in this turn.
- The new ids: IMP-5, SC-16, SC-17, PR-44.
- The two unwired guards run from the unit tests, not from a new CI job (no workflow change).

TESTS
- Unit: EL-1..EL-4 (NEW), TI-5 (NEW), GW-1, GW-2 (NEW).
- E2E: IMP-3, IMP-5, SC-4, SC-16, SC-8, SC-17, PR-24, PR-44 as above; LT-6 tagged, its body unchanged.
- Not edited: every other test.

DOCS
- e2e-harness.md (the rule, the check, DEC-174's judge), ci-guards.md (INC-563), test-ids.md (TI-5), admin-screening.md, admin-audit-security.md, the changelog, the roadmap (line 3; the C5 line replaces the queued INC-555 line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C4 applied)
- typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 696 unit tests (117 files), the usage maps (they match: no key moved), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard: all clean. Red first on the base: EL-4 refused the four tests above; GW-1 failed on LT-6; the base guard did not flag a wrapped untagged title.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-34.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 2fb73b85, any conclusion). If it shows another commit, STOP and report; whatever its conclusion, go on (the supervisor reads that run, and a fix it needs comes in the next turn). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 17 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-34.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 14 files → each equal to:
  a4cb6cb4cb05c3712938d0b72efe084ebc00ab965527f53419602df9eeaa3910  docs/_changelog.md
  2a5560b3a0fbd7ee753923582d693f13c265f6273cf6cbe91604bd6751e3db46  docs/features/admin-audit-security.md
  0ac349336bcaee52e2453d8adc0dfe90112044197ba429cf4a4377ab8b21f11a  docs/features/admin-screening.md
  55557f17e2e7d89719478f9a8c598b26890f2e73f38988a76d20ece68ea6a7ce  docs/features/ci-guards.md
  ef03ddfafe776bb9d8c74a40eb888ca39bf1afb2d06290eff02158e207a382c6  docs/features/e2e-harness.md
  aa4adafaf5e75be2969e85925aff3bdfd49a36cce4aa18310726dda2a4296d66  docs/features/test-ids.md
  b82dd25641071c5429fa88f9f19679a5591284cb5907be69f887617fc8dcb434  e2e/admin-audit.spec.ts
  38ba15ed71ec17cdb16afb41bca33f1f5c348f146906bba5ff6e1a7ea24e0cfd  e2e/admin-locations.spec.ts
  4971b657d67f428199f33f1b4e21f4a1ffbc39f119b5085cea2726f13dc09970  e2e/admin-screening.spec.ts
  e591281c2b6e7a41ac5c4525c6c8fd9aa9cb87e6f6a24a08de6b7d438be4880b  e2e/posting-routes.spec.ts
  8c9d04397badcafec8e087b0b66ca0ed5c96c6588532ac81126d079776c5270e  roadmap.md
  907f6f80d89a7c8eabc899d06d6ce8418b84314ce11b682b0790a3ac19783466  scripts/check-identity-tags.sh
  fd8161985330de2e5272710202eee5b55c6d09fb47136486c70d46b64b92d82a  scripts/test-ids.test.ts
  0a5c21c6c7c5ef1c73d2be7d98e9725a54a5b947499103d8a2d25e7181264777  scripts/test-ids.ts
- (c) `ls scripts/e2e-leases.test.ts scripts/e2e-leases.ts scripts/shell-guards.test.ts` → "No such file or directory" for each.

THE CARRIER — C5-TURN-CARRIER-2026-10-12.md (38,177 bytes; sha256 c5773018058f70bdeae57525138beef5e4f9e8fec1346a19265a2348620f70b7; 46 sections)
- Its first line starts "C5 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. Keep scripts/check-identity-tags.sh executable (write its contents in place; do not recreate the file). The carrier is never committed.

THE HASHES — `sha256sum` each of the 17 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  65bc4e98682b318d1d6b3d46a168b4d9646ed02179ffe631267ab1edd6e6dcb3  docs/_changelog.md
  8891dc10f0651ee2fc0da7b6314d38e7b73013b64f707995727fbfb0769a85cf  docs/features/admin-audit-security.md
  598a01f5ca31247f3cae6a465d1b990d2ece4e5844067ab308ed3fa78d47d7e1  docs/features/admin-screening.md
  befc27b354074c5fb5e29e940a17553c449cd194fe40617803f93addd8c1261c  docs/features/ci-guards.md
  f7af81fc86b3bcda691bd3be0325f75cc7029671caea4f964a0f400fdbb9f379  docs/features/e2e-harness.md
  c106d909a4cb5d9e6887cf95982b7403c7e6cb6d399bba645c2ef3a6d8302638  docs/features/test-ids.md
  5f4c81d3953e6df8abf758ca4aedbfb1331575f73e86320f5e64f58a4aae330b  e2e/admin-audit.spec.ts
  7ae2d30f096d8d825f658a9838d44dc1ce8036866542188a085e912dd6fe1a78  e2e/admin-locations.spec.ts
  2d8ac10fd6cdad7fb8319db653a9b82018d770dc950bf406362d8cdabdcb2c56  e2e/admin-screening.spec.ts
  c8dfbcdcd52e0f830d8d0a47460882e00d4094ddf0434774dc9ab242bc525ecd  e2e/posting-routes.spec.ts
  8976294e5c3b2143efc4682096700e9ac8c0b1b583abe076bb6d107d41cafa26  roadmap.md
  a62f1a1b5bf2a30bc5e9f9dbe05e0a8bc826744409729b160e442cb45c8a5f2f  scripts/check-identity-tags.sh
  a3263b8475522443c2b44ae8a5b210fe86f8d7dbbaa2db05f8dae56d77fa4d22  scripts/e2e-leases.test.ts
  c3e1d323ce4ece6ad297e370a841782bdecc5d55e85920f27be561a422495c8c  scripts/e2e-leases.ts
  e1a8e2b56c4e3b47585921a0fb1f4addd60059536f996c20cdae8158b0df6ed9  scripts/shell-guards.test.ts
  03c0ebf9d7d5d05f3abc424ce06d25dacb948a108bfc52a265211dd75294a7de  scripts/test-ids.test.ts
  35f4438fb13ab2982affb78284780b3aec3699934025723412f710dd27f0a69e  scripts/test-ids.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 696 passed (117 files);
- `bun run i18n:map-guard` "usage maps match the tree." (no rewrite expected this turn);
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` "OK — every auth-state-mutating test declares @private-identity.";
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only 2fb73b85` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 2fb73b85 HEAD` too. Expect the 17 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply and nothing to Publish (no app code changed). Send the executor nothing until the supervisor reads CI on the final commit.
```
