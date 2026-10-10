# Bundle 11 — turn 1: INC-536, a test id is assigned once: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 11 — TURN 1 (2026-10-10). ONE TURN. No migration, no database change, no new string, no package change.
Base: dev 9c40c53f. This file is public: it is written as build instructions. Tier C (test records) with a new unit check.

ANSWERS TO D127
- Verified by diff of 2c986991..9c40c53f: the eight carrier paths, the two usage maps and the brief, each byte-identical to the supervisor's copy.
- CI on 9c40c53f (run 38038561003) is GREEN and promoted: main = dev. The operator walked the headings and the place on the account.

WHAT THIS TURN DOES (INC-536)
- A test id is the record of a test: the flake ledger, the incident ledger and the docs name tests by it. 19 ids are each used on two tests today: 15 in two files, 4 on two tests of one file.
- The renames — only the titles, the assertion messages that quote the id, and the comments that name it; no assertion, timeout, retry or test body changes:
  - e2e/admin-shell.spec.ts: A-1, A-2, A-3 → A-6, A-7, A-8;
  - e2e/category-nav.spec.ts: C-1..C-4 → C-6..C-9;
  - e2e/rbac.spec.ts: R-1..R-3 → R-6..R-8;
  - e2e/auth-reset.spec.ts: "R-4: recovery leaves an email identity in place" → R-9;
  - src/lib/return-path.test.ts: RP-1..RP-3 → RP-13..RP-15;
  - e2e/post-wizard-specs.spec.ts: PW-58 (a year under Amharic) → PW-183;
  - e2e/post-wizard-where.spec.ts: PW-101 (the location details) → PW-184;
  - e2e/admin-attributes-import.spec.ts: AT-21 (a links file sets the two per-link cells) → AT-78;
  - e2e/shell.spec.ts: TR-18 (the header renders while the read is in flight) → TR-36; TR-28 (the account carries onto a starless device) → TR-37.
  The docs that name a renamed test follow: admin-shell.md, rbac-client-seam.md, posting.md, attributes.md, imports.md, translations.md.
- The check: scripts/test-ids.ts reads every it( / test( title that opens with an id and refuses an id in two files, or on two tests of one file unless the file declares a case group (PW-61, PW-110, PW-162). Its unit tests scripts/test-ids.test.ts: TI-1 (the repository has no repeat — red on the base with exactly these 19), TI-2, TI-3, TI-4.
- Docs: docs/features/test-ids.md (new: the rule, the check, the rename table), the changelog, the roadmap (line 3 names this brief; the INC-536 line ticked; a D128 line).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-1.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 9c40c53 with SUCCESS). If it shows FAILURE, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier;
  5. the hashes;
  6. the checks;
  7. the browser run;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited. Titles are edited only through the carrier, never by search-and-replace.
- Scope — these files only: the carrier's paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 16 files → each equal to:
  d44e217daad084b97add34c0907f4cd5f65e793363a970c8146af2a23f1a214e  docs/features/admin-shell.md
  b3f2644a974042089b10193fc2c81c056afaba88d71eb7d02f286b5eb3acfe22  docs/features/attributes.md
  83f322524c4ba2b9a5ac1218ba3b2b0347a02bfb1370c5ebda2532976854976d  docs/features/imports.md
  889d9b9d1c7ceca31148f08a28951febc2aa419f417eb35f91c00c0bb3b7622d  docs/features/posting.md
  2c3163f4dbda868d9b320d4f04c6924e97460557c8fd10e19694c1e4d0b591bd  docs/features/rbac-client-seam.md
  89b916c2e3b6b101dff473973efca5c752c351aad4dc22d8381c7ecbcbfde447  docs/features/translations.md
  9ea4442d632b755d9a55b9ac2453efac6bf87b221c9911185072ce1cb801efa7  e2e/admin-attributes-import.spec.ts
  1c41487c33ce272073d1de531c422de241061ca19c231011a1f7cdde8bb83a2f  e2e/admin-shell.spec.ts
  54f8902158154c0e0483b8d07994b80820fa773ae311fa8e44e6c8aa047bb7eb  e2e/auth-reset.spec.ts
  59532dfac52e14437636c4fb8f49aa61c533815e5adacf820280cbb90dab7c27  e2e/category-nav.spec.ts
  c6473e370923b420354d51ff95ea747a9a2a3110e2ebdc4accdb0802bcb302dd  e2e/post-wizard-specs.spec.ts
  efe9f04c0ad9449c8426fc1917e136be3454a2e728ee5aa6e56297b2e0d9e42b  e2e/post-wizard-where.spec.ts
  903cc9558b910a098f4f13fecd39d2c562643077dbbc3418a934ea70f05e9bcc  e2e/rbac.spec.ts
  2e2cef8bb570e592191f107b60e187d8dbfc9b7bc3358bc519e46cf1546ba2fd  e2e/shell.spec.ts
  477a6df3be5b07b46e0776f4536f51dc82e9f7f84a623f2ad38a6c877483d1e3  roadmap.md
  bd2d79641a9d0f27b8974e1779c0fc42c2012244d4f6911948aecaabf0136723  src/lib/return-path.test.ts
- (c) `ls scripts/test-ids.ts docs/features/test-ids.md` → both "No such file or directory".

THE CARRIER — INC536-TURN1-CARRIER-2026-10-10.md (44,934 bytes; sha256 cd3c1300013e9676fe79ac8625be51ba9c1c6dc2a6c5524ce84e9f9ef778c4e5; 52 sections)
- Its first line starts "INC536 TURN 1 CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE (the whole file);
  - NEW (a file that must not exist yet);
  - APPEND (added at the end of the file);
  - REPLACE-LINES <a>-<b>: replace lines a through b of the file — both included, counted from 1 — with the section's lines. The section ends with a newline; that newline ends its last line and adds no empty line. Every REPLACE-LINES section in this carrier replaces lines one for one, so a file's line numbers never move: a file with several sections takes them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 20 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  d9b426ceca156333599af9c78654741d0c98e307739f548ee24d7070e30cc637  docs/_changelog.md
  a8a4c0bbd823157a3d89b25ea103664867b8a0b4a610c026d2d83c8a6ca60c9a  docs/features/admin-shell.md
  2f3a7fbd649669d7c82ca77c3fb67456be7a8a21de88e48b165e12e21ca27ffa  docs/features/attributes.md
  ee1aeeb653ffa653c4e1cd87247e12d954103eb286ad566c9afe88eadd5e38a1  docs/features/imports.md
  46a1e0d12c7abb1e5be3b611f6ff6c850b8c83198ad1a57f6126bd6716bc19ed  docs/features/posting.md
  31e638acef5bb3ef800ae169664be76e51cc4f4fb168373d04f9dc26e20665ae  docs/features/rbac-client-seam.md
  aa4adafaf5e75be2969e85925aff3bdfd49a36cce4aa18310726dda2a4296d66  docs/features/test-ids.md
  3ab6cb84c36cbe8ca2bde85ec56cadb4e09c72357db506005bfac1f9323ce1cd  docs/features/translations.md
  783239b57d3d936ae5cb5a1261dd9fa5cbe1f09ed3740a137b4fb5bf2b9e7169  e2e/admin-attributes-import.spec.ts
  11e5068f600699898f7e8e5608dec5842495ccf938bb1acd779bda34eb9339c3  e2e/admin-shell.spec.ts
  701324596faca6ec46bd42b0cd99eaa9eef9e88861f534a87d3858e636f5878a  e2e/auth-reset.spec.ts
  4bc2a544729a387895d4ae9fc3ec8a5d09e802bfb0d959fe90ec13c777777f22  e2e/category-nav.spec.ts
  6f87a2542451f16df7cb9edda65cf5ce09be9c7e80a25eb27a07d98dff26017f  e2e/post-wizard-specs.spec.ts
  103c291f74f5709d0b28994535054b5be54640586b90dbb66e776df8105a5187  e2e/post-wizard-where.spec.ts
  a5ca1127e761666fd535efe5e6ac89aa69206b9b45d6992e4b80a5a64c5d2799  e2e/rbac.spec.ts
  804c411d83cdb65d759eae2c1988e0001cffdbda17e07bd2943b414da47e01c4  e2e/shell.spec.ts
  0756f0390f9ff9269403393a47dee329e93173fe4e376aa66094dcc6039cfaaa  roadmap.md
  fd8161985330de2e5272710202eee5b55c6d09fb47136486c70d46b64b92d82a  scripts/test-ids.test.ts
  0a5c21c6c7c5ef1c73d2be7d98e9725a54a5b947499103d8a2d25e7181264777  scripts/test-ids.ts
  88c1d5635a241ad50dfd654e7dba132e61e48d23320bfb9e520e1db4729b33c1  src/lib/return-path.test.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 605 passed (92 files) — TI-1..TI-4 among them;
- `bun run i18n:map-guard` "usage maps match the tree." (no source string changes);
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/rbac.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 20 sha256sum lines and the brief's.
- `git diff --name-only 9c40c53f` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 9c40c53f HEAD` too. Expect 21 paths.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs. Nothing to Publish or walk: the site does not change.
```
