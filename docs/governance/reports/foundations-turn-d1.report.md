# Foundations turn D1 — final report

CI line read at turn start: run 40806575887, commit `0807f82c` — **FAILURE** (migration linter, component tests, first-paint bundle budget, every E2E lane's backend start; completed 2026-10-29T02:33:32Z). The fixes for all four reds landed in 8e63c20f, whose run had not completed at report time; CI is the judge.

The replay failure, proven: M4's proof (`20261028230748_23f4ae4e`, original :299–305) SELECTed two real published in-force `legal_versions` and raised `two versions in force are needed` when absent; a fresh replay backend has none, so the replay died at M4 and all nineteen lanes failed with zero tests from 573368b on. What changed: the M4 proof now creates its own scratch document and two published versions (function bodies byte-identical); the duplicate test id GML-4 became GML-6; the /my-listings/$listingId ceiling rose 315 → 316 with the cause named; failed backend starts now upload a redacted start-failure sidecar the merged report quotes.

## 1. Scope

The brief's five concerns, as ruled: INC-963 (pin precision refusal), INC-793 (listing price pair + commission range at every step), INC-949 (shared active-place predicate), INC-951 (rate gating, split 3a/3b/3c), INC-939 (bucket allowlists) + INC-969 (the category-assets list policy, stop-14 addendum). Seven ordered migrations became twenty files after the ruled splits (M3b, M4b, M5a/M5b, M6a, M6b-legal, M6b-cat1/cat2a/cat2b, M6c-1…6, M7).

## 2. The red board (INC-970…973)

- **INC-970** — proven as above. Fix (ruling option a): the proof creates its own rows; prod/staging not re-applied (a proof is not state). New file sha256 `049423b32d8c79ccc0af67fd4e5a7792872d2920ec57a4e4627fc7127e57a4fe`. Proof census (proof blocks only): M1 :21 and M2 :24 read seeded countries (replay-safe); M5a :105–106 and M5b :57–58 read seeded languages (replay-safe); M3, M3b, M4b, M6a, M6b-legal, cat1, cat2a, cat2b, M6c-1…6, M7 create every row they read or read seeded roles only.
- **INC-971** — `maps-links.test.ts:78` GML-4 → GML-6 (grep-checked across src/, e2e/, scripts/). TI-1 green.
- **INC-972** — measured with the lock-exact build: 315.1 KiB vs 315 (CI: 315.2). Named cause: INC-949's `mapsPathQuery` (first-paint — the Maps address no longer waits for the tree) plus the six INC-951 dial entries riding the one eager registry `src/lib/dials.ts`, which no page may split. Ceiling 315 → 316 with the reason in the line; `Bundle budget OK`.
- **INC-973** — lanes upload `local-backend-start-failure.txt` (failing migration + last twenty ERROR/FATAL lines, redacted) in the `e2e-log-*` artifact; the reporter renders `## Backend start failure (INC-973)` from the first carrier, naming all. Planted self-test proven red when the section is removed, green restored.
- Register: INC-968…973 in `docs/tracking/incidental-findings.md`; next free INC-974. AGENTS.md gained the operator's CI-first line under the CI evidence line (within the budget check).

## 3. Migrations — file, bytes, sha256, mark, prod read-back

| part | file | bytes | sha256 (16) | mark | prod read-back |
|---|---|---|---|---|---|
| M1 | 20261028223430_631c8680 | 9,168 | 445b0fcaeee089e1 | 20261029000000 | mark + refusal inside the sent-pin branch (stop 1) |
| M2 | 20261028224333_4ce633e9 | 30,322 | 13d8675db21f9159 | 20261029010000 | mark + price-pair/bp checks at every step (stop 2) |
| M3 | 20261028225001_e419d062 | 22,129 | 5a4edf50ee387e9e | 20261029020000 | mark + place_is_shown + filtered lists (stop 3) |
| M3b | 20261028225628_e2358bd4 | 8,861 | 55e0f61bcd672994 | 20261029030000 | mark + shown_locations view + one-anchor index (stop 4) |
| M4 | 20261028230748_23f4ae4e | 21,622 | 049423b32d8c79cc | 20261029040000 | mark + five 3a gates (stop 5); proof corrected in place under INC-970, not re-applied |
| M4b | 20261028231519_fd0c7d09 | 6,726 | 364e4384b4b58806 | 20261029041000 | mark + import_gate_audit(p_actor) service-role-only (stop 6) |
| M5a | 20261028233839_7aad90ab | 48,433 | 772a9f2b9d5245c7 | 20261029050000 | mark + five 3b doors gated (stop 8) |
| M5b | 20261028235443_3e3ea913 | 76,536 | 7b9359bdc92feaae | 20261029060000 | mark + six bulk callers on the cores (stop 9) |
| M6a | 20261029001111_b124ab89 | 43,719 | 400e1920225cd1ea | 20261029070000 | mark + three category cores + two bulk callers (stop 11) |
| M6b-legal | 20261029002140_5a30bc87 | 33,756 | deafb82035553cd4 | 20261029080000 | mark + six legal doors gated (stop 12) |
| M6b-cat1 | 20261029013346_0780a3a2 | 24,849 | 4472f8db3bc55705 | 20261029090000 | mark + nine catalogue doors gated (stop 13) |
| M6b-cat2a | 20261029015441_88c7da1c | 23,829 | 4f4a98b31530e78e | 20261029100000 | mark + five catalogue doors gated (stop 14) |
| M6b-cat2b | 20261029015903_c9372052 | 25,040 | c07be7bce59ab0e0 | 20261029110000 | mark + four catalogue doors gated (stop 15) |
| M6c-1 | 20261029022748_3b9ead33 | 10,093 | f8e2b768dec52936 | 20261029120000 | mark + import_commit/import_undo dials + category commit gated; body md5 c94a815cb615b4fe32270642423c6815 (stop 17) |
| M6c-2 | 20261029024207_4f6a133e | 9,523 | 95a3ae3196a273b1 | 20261029130000 | mark + admin_undo_category_import body md5 9a2f2192ba818430a5b979c2ae94dd84 |
| M6c-3 | 20261029024340_4eb166c1 | 9,737 | 1bb4586b6792e696 | 20261029140000 | mark + admin_commit_attribute_import body md5 2872c54d63664ce53df08c44183be3b1 |
| M6c-4 | 20261029024420_357d93d5 | 9,657 | 1382738a1589e988 | 20261029150000 | mark + admin_undo_attribute_import body md5 301fb4da41a13aff94df86ba2739b5c2 |
| M6c-5 | 20261029024515_a34b87bb | 13,207 | 33910d7e18e7bb71 | 20261029160000 | mark + location commit 01365b40f7c61055d5389d267da9a09f, undo c4168e1ff2402a72509cb643441f97dc |
| M6c-6 | 20261029024619_b8c031b9 | 13,040 | 8da063a0e3deaf0e | 20261029170000 | mark + admin_import_translations 1a043985654770be62cdf12358c7b269, admin_undo_import 9f49201faa7c3284707c3e51a41b9f40 |
| M7 | 20261029025242_89f5cbc9 | 4,917 | 554b06953dcf838f | 20261029180000 | mark + policy {authenticated} with has_permission qual; zero scratch rows left |

Staging apply lines (operator, in order; staging holds everything through M6c-1): M6c-2 4f6a133e → 20261029130000; M6c-3 4eb166c1 → 20261029140000; M6c-4 357d93d5 → 20261029150000; M6c-5 a34b87bb → 20261029160000; M6c-6 b8c031b9 → 20261029170000; M7 89f5cbc9 → 20261029180000. M4's corrected proof file is not re-applied anywhere (proof is not state).

## 4. M7 detail (INC-939 + INC-969)

- Census of every `storage.list` / `from('category-assets')` caller: `src/features/admin-categories/category-images-service.ts:165` (the staff prune — the only browser caller, covered by the narrowed policy); `e2e/category-image-routes.spec.ts:104,106,146-147,193,214-215`, `e2e/global-setup.ts:916,1219-1231`, `e2e/helpers/photos.ts:295,301`, `e2e/legal-certify.spec.ts:121,125`, `e2e/posting-routes.spec.ts:1238,1242` — all service-role (admin) clients, which bypass RLS and are unaffected.
- The read-back proof refuses on any difference from: category-assets 10,485,760 bytes {image/png,image/webp} public; listing-photos 1,048,576 bytes {image/jpeg,image/png,image/webp} private. CI's bucket seed (`00000000000000_ci_local_buckets.sql`) now carries the same values, so the proof judges the same law on every backend.
- The policy proof: anon list → 0 rows; authenticated without the permission → 0 rows; scratch staff → the scratch object. Scratch rows rolled back with the proof's subtransaction (storage.protect_delete forbids a direct DELETE; the first attempt's cleanup DELETE was refused and the migration rolled back whole — verified: no mark, old policy intact, no scratch rows).

## 5. Method notes ruled this turn

- Computed insertion (stop-16 ruling): a door body over ~10 KB is redeclared by computed insertion with md5 guards, never retyped — recorded in `docs/features/ci-guards.md` beside INC-968, with the 25 KB inline ceiling (stop-14 ruling). The M6c builder was verified end-to-end: its regenerated M6c-1 is byte-identical to the committed, applied file.
- M6c-1's 64-byte scratch delta (stop-17 ruling item 5): the applied text is the committed file (10,093 bytes, sha256 f8e2b768…, body md5 c94a815c… read back). The 10,157-byte scratch was the first generator run — it carried the dead `v_dial text;` declaration and the pre-fix gate form (plpgsql concatenation instead of one E-literal, strip without the trailing newline). That scratch was never applied (its two attempts rolled back whole); it was overwritten by the corrected builder, so the byte-level diff is no longer reproducible — the md5 read-back is the proof of what was applied.
- The born-closed allowlist's third column accepts the "INC-951 closed" form (the guard passed); the M2-precedent lines stand.
- IG-6: green last turn — 36 passed (18 tests × 2 projects), 0 retries, whole file.

## 6. THE CHECKS

- `bash scripts/check-migrations.sh`: Real-row proof guard OK; Migration guard OK (with the five M6c born-closed allowlist lines and M6a/M6c-1's).
- `bunx vitest run src/features/ad-page/maps-links.test.ts scripts/test-ids.test.ts scripts/conformance/dials.test.ts`: 17 passed (3 files).
- Reporter self-test (`SELF_TEST=1 bun scripts/e2e-failure-report.ts`): green, including the planted INC-973 case (proven red when broken).
- `bunx eslint` on the touched TS files: clean. `bunx prettier --check` on every touched file: clean. `actionlint -shellcheck= -pyflakes= .github/workflows/local-backend-proof.yml`: exit 0.
- `/tmp/observability/build-errors.log`: build OK (2026-10-29T02:53:58Z).
- Bundle budget: `Bundle budget OK` (315.1 / 316 KiB on the page).

## 7. Limits

- The 8e63c20f CI run had not completed at report time; the four reds on 0807f82c are the four INCs fixed in 8e63c20f, and CI judges the fixes.
- The corrected M4 proof was not run end-to-end against current prod (M4b changed a function signature after M4); its scratch inserts were validated piecemeal in a rolled-back statement. CI's replay is the judge.
- M7's public-URL serving check is not in the migration: a scratch object has no stored bytes, so its public URL is not a valid probe, and real objects are off-limits to proofs. The public flag is read back (true); URL serving is observed in the app.
- The linter's 232 findings predate this turn's migrations and are unchanged by them.
- Rolled-back attempts this turn, each caught by the in-migration proof or a storage trigger with a whole rollback (verified clean each time): M6c-2 (hand-typed catalog error), M6c-3 (transcription drift), M7 (protect_delete on the cleanup DELETE).
