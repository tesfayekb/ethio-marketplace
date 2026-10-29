# Foundations turn D1 — stop 18: red board fixed; M6c-2…M6c-6 applied

## The red board (INC-970…973)

- **INC-970 (proven, not assumed):** M4's proof (`20261028230748_23f4ae4e`, original :299–305) SELECTed two real published in-force `legal_versions` and raised `two versions in force are needed` when absent. A fresh replay backend has none — every earlier legal proof creates its own scratch document — so the replay raised at M4 and all 19 E2E lanes died from 573368b on. Countries/currencies/languages/roles are seeded by earlier migrations, so M1/M2/M5a/M5b's seeded reads replay; `legal_versions` is not seeded. Fix (ruling option a): the proof now creates its own scratch document (`e2e-d1-m4-proof`) and two published in-force versions inside the block; the function bodies are byte-identical, only the proof's DO block changed. New file sha256 `049423b32d8c79ccc0af67fd4e5a7792872d2920ec57a4e4627fc7127e57a4fe` (21,622 bytes). Prod/staging are not re-applied (a proof is not state). The scratch inserts were validated against the live constraints and triggers on ethio-prod in a rolled-back statement. Proof census (proof blocks only): M1 :21 and M2 :24 read seeded countries (replay-safe); M5a :105–106 and M5b :57–58 read seeded languages (replay-safe); M3, M3b, M4b, M6a, M6b-legal, cat1, cat2a, cat2b, M6c-1 create their own rows or read seeded roles only. The M6c/M7 files' proofs create every row they read.
- **INC-971:** the second GML-4 in `src/features/ad-page/maps-links.test.ts` (:78) is now GML-6 (grep-checked: GML-1…5 were the only GML ids in src/, e2e/, scripts/). TI-1 green.
- **INC-972:** measured with the lock-exact build (`bun run build` + `node scripts/check-bundle-size.mjs`): 315.1 KiB locally against the 315 ceiling (CI saw 315.2 — build wobble). The addition, named: INC-949's `mapsPathQuery` (`src/features/ad-page/maps-links.ts`, ~31 lines) is first-paint — the Maps address no longer waits for the country tree; the six INC-951 dial entries (~0.15 KiB gz) ride the one eager registry `src/lib/dials.ts`, which no page may split (one mechanism per concern; a split registry is a second mechanism). Per the file's own rule the page's line in `scripts/route-budgets.mjs` rose 315 → 316 with the reason in the line. `Bundle budget OK.`
- **INC-973:** the lane's evidence step now writes `local-backend-start-failure.txt` (the failing migration's name + the last twenty ERROR/FATAL lines, redacted like the rest) into the `e2e-log-*` artifact; `scripts/e2e-failure-report.ts` reads it (`Source.startFailure`) and renders a `## Backend start failure (INC-973)` section — one lane's lines, named, standing for every lane that failed the same way. Planted self-test: a source with start-failure lines renders the section (proven RED when the section is removed: `SELF-TEST FAILED — … INC-973 a failed start's lines reach the report`), a source without keeps the bare gap. Self-test green.
- Register: INC-968…973 are in `docs/tracking/incidental-findings.md`; next free INC-974.
- Touched tests: `bunx vitest run src/features/ad-page/maps-links.test.ts scripts/test-ids.test.ts scripts/conformance/dials.test.ts` — **17 passed (3 files)**.

## M6c-2…M6c-6 — applied on ethio-prod, read back

| part | file | bytes | sha256 (16) | mark | body md5 read-back |
|---|---|---|---|---|---|
| M6c-2 | 20261029024207_4f6a133e-4917-4651-a1c5-a3a45dc385e5.sql | 9,523 | 95a3ae3196a273b1 | 20261029130000 | admin_undo_category_import = 9a2f2192ba818430a5b979c2ae94dd84 |
| M6c-3 | 20261029024340_4eb166c1-9395-449e-8353-f42bdfded58b.sql | 9,737 | 1bb4586b6792e696 | 20261029140000 | admin_commit_attribute_import = 2872c54d63664ce53df08c44183be3b1 |
| M6c-4 | 20261029024420_357d93d5-c90f-4030-b5bd-046675f4aee2.sql | 9,657 | 1382738a1589e988 | 20261029150000 | admin_undo_attribute_import = 301fb4da41a13aff94df86ba2739b5c2 |
| M6c-5 | 20261029024515_a34b87bb-1a15-4ad7-ae8a-ea6c38c5d939.sql | 13,207 | 33910d7e18e7bb71 | 20261029160000 | admin_commit_location_import = 01365b40f7c61055d5389d267da9a09f; admin_undo_location_import = c4168e1ff2402a72509cb643441f97dc |
| M6c-6 | 20261029024619_b8c031b9-9f2e-4a7f-86c6-4361375d2fa0.sql | 13,040 | 8da063a0e3deaf0e | 20261029170000 | admin_import_translations = 1a043985654770be62cdf12358c7b269; admin_undo_import = 9f49201faa7c3284707c3e51a41b9f40 |

All five marks read back on ethio-prod; all seven body md5s equal the expected new md5s. Each committed file differs from its scratch copy only by the trailing newline the tool strips (verified by diff on M6c-2); the committed file is the applied text. Each file carries its own born-closed allowlist line (computed insertion; the in-migration proof asserts the ACL byte-for-byte). `bash scripts/check-migrations.sh`: **Real-row proof guard OK; Migration guard OK.**

Failed attempts, each caught by the in-migration proof with a whole rollback (verified: no mark, old body md5 after each): M6c-2 first attempt — a hand-typed `unnest(p.proacl) a.acl` column error (I then submitted the generated file's exact text); M6c-3 first attempt — my transcription drift (the v_after fingerprint named the category table; the first call read `permission denied`), caught, rolled back, and the file's exact text applied clean.

## Staging apply lines (operator, in order)

M6c-2 4f6a133e → mark 20261029130000; M6c-3 4eb166c1 → 20261029140000; M6c-4 357d93d5 → 20261029150000; M6c-5 a34b87bb → 20261029160000; M6c-6 b8c031b9 → 20261029170000. On staging the old-md5 checks will read the CR-normalised bodies (INC-968), so the hand-applied CRLF bodies pass.

## Remaining in D1

M7 (INC-939 + INC-969: census every `storage.list` / `from('category-assets')` caller first; narrow `category_assets_public_read` to authenticated callers with `has_permission(auth.uid(), 'categories', 'assets')` with the anon-list/staff-list proof; listing-photos size 1,048,576 via the bucket tool with read-back; the operator sets the MIME lists in the dashboard on both projects), then THE CHECKS, the reviewer and the final report.

## Limits

- The corrected M4 proof was not run end-to-end against current prod (M4b changed a function signature after M4); its scratch inserts were validated piecemeal in a rolled-back statement. CI's replay is the judge.
- The latest completed CI run read remains 40804618009 at 1c8dda2 (FAILURE); the fixes land with this turn's commits and CI judges them.
- The linter's 232 findings predate this turn's migrations and are unchanged by them.
