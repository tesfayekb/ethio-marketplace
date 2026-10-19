# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39211965526
- Commit: `0c7d5c75ee9604037eb909b089e24b8626e815b7`
- Attempt: 1
- Written (UTC): 2026-10-19T08:05:15.785Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Migration linter (with self-test) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  - 20260907050122_84bead12-f50a-4e83-b3e5-e7bc34a0ec21.sql (C3-UX-2 redeclared five entity-translation definers without restating their grants; window closed by the C3-UX-2b corrective (read-back in file) | closed by 2dcafad6)
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard: allowlisted files (each cites its healer)
  - 20260917214504_776e63d7-3511-4fb8-a2c0-a57cb33b7e05.sql (M-MAINT proofs P3/P4 corrective run (operator resolved from the database) declared mark 20260917214500 precedes its filename stamp; ledger row healed to 20260917214504 by the corrective | 20260917214536)
  - 20260924084700_6c11435c-c46b-4f2d-8c15-9b5cea7a5573.sql (D37-1 declared mark 20260924024000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260924084639_97e1fedd-eee6-4f72-af8b-e62e25ae8425.sql (D37-1 declared mark 20260924023000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql (M5 declares mark 20261004090000, earlier than its filename stamp; the M5b healer (02084273, mark 20261004160000) writes a mark after it | 20261004144628)
  - 20260924091805_37a1e9bc-3840-4190-a88c-28f4b8f9346a.sql (D37-1 declared mark 20260924091500, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260911223202_ee224de0-47c7-47de-9a97-bdec0b70f360.sql (DEC-050 L2a declared mark 20260911223000 precedes its filename stamp; ledger row healed to 20260911223202 by the corrective | 20260911224612)
  - 20260920035859_59a77c4c-ef00-4c57-9bce-79a4284a01d4.sql (Part 2b readers declared mark 20260920000008, which precedes its filename stamp; the ledger rows 20260920035859 and 20260920040000 are recorded by the R-MARK corrective | 20260920072310)
  - 20261004010309_60b466e2-a6fd-4b69-9029-d8f067fbe437.sql (comment-only file applied in error before M2 (executes nothing); its ledger row 20261004010309 is recorded by M2 | 20261004011235)
  - 20260909140408_c8656a8a-8a87-4218-9141-f8518195f117.sql (FIX-SCAN-1 ISSUE 1 landed without its self-mark; the marks 20260909140408 and 20260909150000 are recorded by the corrective | 20260909142634)
  - 20260924084842_391d5884-a3d5-4669-8d73-f604da2e5002.sql (D37-1 declared mark 20260924027000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260923070512_caeccd7a-5fa0-4298-afa0-beea1a4d7023.sql (INC-268 (the memoised attr_allowed_check) omitted its own self-marking INSERT; a tool-written file cannot be edited afterwards, so the ledger rows 20260923070000 and 20260923071000 are recorded by the first corrective (48cab075) and this file's own filename row 20260923070512 — the row parity keys on — by the second | 20260923072520)
  - 20261004072852_d59800cd-96f3-4a6a-a010-597b97e29208.sql (comment-only file applied in error before M5 (executes nothing); its ledger row 20261004072852 is recorded by M5 | 20261004144146)
  - 20261007150540_e41a9cb4-6d28-4fd3-9757-82a8a35777ca.sql (comment-only file applied in error before M14 (executes nothing); its ledger row 20261007150540 is recorded by M14 | 20261007222234)
  - 20260917210349_c23b6c76-b29b-4cfe-b559-0d4abc728a9f.sql (M-MAINT proofs P3/P4 declared mark 20260917150500 precedes its filename stamp; ledger row healed to 20260917210349 by the corrective | 20260917210704)
  - 20260928135721_6b0f6ae1-97f5-4fa4-aee8-4603737dbcae.sql (INC-321 declared mark 20260928100000, which precedes its filename stamp; the ledger row 20260928135721 is recorded by the corrective | 20260928140742)
  - 20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql (bundle 2 declared mark 20261003000000, which precedes its filename stamp; the ledger row 20261003005802 is recorded by the corrective | 20261003012503)
  - 20260924084745_adeb37e6-5164-49ac-b95c-ae8602bcd8fa.sql (D37-1 declared mark 20260924026000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql (D37-1 declared mark 20260924028000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260920151236_fa43c991-291b-4197-b7c7-0dc8bbfc8fec.sql (M-ORDER part 2 (commit + export) declared mark 20260920120002, which precedes its filename stamp; the ledger row 20260920151236 is recorded by the corrective | 20260920151351)
  - 20260921092130_872f21f4-7e65-4643-8d4b-eeed116a6e37.sql (M-SHAPE planner guard: its proofs anchored on the live `voltage` definition, so the file can only apply where that row exists (staging raised "PROOF setup: voltage definition absent", INC-255); the identical planner body with scratch-row proofs, and the ledger row 20260922090000, are recorded by the corrective | 20260921094000)
  - 20260924084727_4b3cc41e-32b7-4537-83e1-9ddbb2585784.sql (D37-1 declared mark 20260924025000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260924084544_34d30f0a-b0e9-449e-b33d-d4bd50d08747.sql (D37-1 declared mark 20260924021000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20261004055007_5118f016-fe53-417c-8b4a-05ed5604676d.sql (M4b landed without its self-mark; its ledger row 20261004055007 is recorded by the M4c healer (756bcd49, mark 20261004070000) | 20261004055819)
  - 20260924084606_531073a7-5fb5-4c80-b98a-3aae0f35c7c1.sql (D37-1 declared mark 20260924022000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260917210006_86c1bbd7-b80c-4563-b57c-83d4def31bf7.sql (M-MAINT part B declared mark 20260917150000 precedes its filename stamp; ledger row healed to 20260917210006 by the corrective | 20260917210704)
  - 20260917205429_b76587b4-ed9b-4ec7-bc08-42da95caf653.sql (M-MAINT part A declared mark 20260917140000 precedes its filename stamp; ledger row healed to 20260917205429 by the corrective | 20260917210704)
  - 20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql (D37-1 declared mark 20260924020000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260909054432_c9699f59-7f36-4fbc-a49c-2511eb4bc369.sql (IMPORT-GATE part B landed without its self-mark; the marks 20260909054432 and 20260909060000 are recorded by the corrective | 20260909054514)
  - 20260917210459_0aa17784-c9c2-4f20-9b60-61ef643484c2.sql (M-MAINT proof P1 declared mark 20260917151000 precedes its filename stamp; ledger row healed to 20260917210459 by the corrective | 20260917210704)
  - 20261003215042_bb808e1a-2900-4781-941f-6143829efb93.sql (M1 follow-up (deny-all policies only); M1 (b9aa66a4) carries the bundle's mark 20261003220000)
  - 20260920150901_bd008b3e-1ac4-44f6-8143-1441cc365b81.sql (M-ORDER part 1 (the planner) declared mark 20260920120000, which precedes its filename stamp; the ledger row 20260920150901 is recorded by the corrective | 20260920151351)
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard self-test OK (the bad fixture is refused).
Real-row proof guard self-test OK (an allowlisted statement is skipped and printed; the other statement of its file and the bad fixture are still refused).
Real-row proof guard: allowlisted statements (each cites its reason)
  - 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql | UPDATE public.attributes SET depends_on = v_p WHERE id = v_c | the row is the proof's own scratch attribute: v_c is returned by the INSERT of the e2e-mig- key two statements above (M11 :509-510); read by the supervisor 2026-10-07
Real-row proof guard FAILED: a proof reads a real row (use an e2e-mig- scratch row):
supabase/migrations/20261019063635_0e901b95-3cfb-4daf-bb72-6a6d3f691897.sql: -- the acceptance and notice rows below are deleted by the rollback) SELECT p.user_id INTO v_uid FROM public.profiles p 
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/36643336-27aa-49f1-849f-5ac0085a7e40' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
[command]/usr/bin/git config --global --add safe.directory /home/runner/work/ethio-marketplace/ethio-marketplace
[command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
[command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
[command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
[command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
Cleaning up orphan processes

```

## E2E (Playwright, ethio-staging) — failure

### Evidence lines

```text
[36;1m  || echo "::warning::DEC-030 flake-ledger pass failed"[0m
[36;1mPUBLISH_EVIDENCE_PREPARE='if [ -f "$EVIDENCE_DIR/docs/tracking/flake-ledger.md" ]; then cp "$EVIDENCE_DIR/docs/tracking/flake-ledger.md" docs/tracking/flake-ledger.md && { E2E_FLAKE_ONLY=1 bun scripts/e2e-failure-report.ts || echo "::warning::DEC-030 flake-ledger re-append failed"; }; fi' \[0m
[36;1m  echo "::error::E2E failure reporter self-test failed (exit ${selftest})"[0m
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[36;1m  exit "$reporter"[0m
[36;1mfi[0m
[36;1mexit 0[0m
shell: /usr/bin/bash -e {0}
env:
  E2E_RESULTS_DIR: shard-results
  E2E_LOGS_DIR: shard-logs
  E2E_CONTEXT_DIR: shard-contexts
  E2E_EXPECTED_SOURCES: smoke,email,1,2,3,4,5,6,changed?
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39211965526
  E2E_HEAD_COMMIT_MESSAGE: Applied legal doors and marks

X-Lovable-Edit-ID: edt-a9370006-4dd5-4e30-b1ef-5a41524ee5cd
Co-authored-by: tesfayekb <tesfayekb@me.com>
##[endgroup]
  layout OK — per-artifact subdir: 1 context file(s), report rendered.
  layout OK — merged flat: 1 context file(s), report rendered.
  layout OK — zero artifacts: 0 context file(s), report rendered.
  layout OK — missing directory: 0 context file(s), report rendered.
DEC-078: flaky body rendered after the ledger; ledger line byte-identical; cap flip of 11 rendered 10 bodies + 1 "body omitted: cap".
DEC-078 part 2: green form carries passed → Flake ledger → Flaky bodies → the flipped first line; a clean green renders non-gating): 0 and no flake section.
ok — R1a census names the missing log
ok — R1a a11y never states zero with a gap
ok — R1b census: all N logs read
ok — R1b a11y: all N logs read
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
Wrote docs/tracking/e2e-last-failure.md (9/9 source(s) with usable results, 21 context file(s) found).
Flake ledger: appended 9 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
Flake ledger: appended 0 line(s) to docs/tracking/flake-ledger.md; 9 already there for this run (INC-495).
Flake ledger: appended 9 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
publish-evidence: published docs/tracking/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "smoke=failure email=success shards=failure"
[36;1mecho "smoke=failure email=success shards=failure"[0m
[36;1mif [ "failure" != "success" ] || [ "failure" != "success" ] || [ "success" != "success" ]; then[0m
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "All E2E shards and the smoke tier passed."[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
smoke=failure email=success shards=failure
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/52fdc468-2cd8-4a4d-86d5-78dbcc97dfea' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
[command]/usr/bin/git config --global --add safe.directory /home/runner/work/ethio-marketplace/ethio-marketplace
[command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
[command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
[command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
[command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
Cleaning up orphan processes

```
