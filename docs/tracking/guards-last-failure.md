# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40781098009
- Commit: `3b7df2396e86640ebf81d63577ae1557186b7b68`
- Attempt: 1
- Written (UTC): 2026-10-28T22:59:43.808Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Migration linter (with self-test) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard: allowlisted files (each cites its healer)
  - 20261007150540_e41a9cb4-6d28-4fd3-9757-82a8a35777ca.sql (comment-only file applied in error before M14 (executes nothing); its ledger row 20261007150540 is recorded by M14 | 20261007222234)
  - 20261004072852_d59800cd-96f3-4a6a-a010-597b97e29208.sql (comment-only file applied in error before M5 (executes nothing); its ledger row 20261004072852 is recorded by M5 | 20261004144146)
  - 20261003215042_bb808e1a-2900-4781-941f-6143829efb93.sql (M1 follow-up (deny-all policies only); M1 (b9aa66a4) carries the bundle's mark 20261003220000)
  - 20260924084842_391d5884-a3d5-4669-8d73-f604da2e5002.sql (D37-1 declared mark 20260924027000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260917210459_0aa17784-c9c2-4f20-9b60-61ef643484c2.sql (M-MAINT proof P1 declared mark 20260917151000 precedes its filename stamp; ledger row healed to 20260917210459 by the corrective | 20260917210704)
  - 20261004055007_5118f016-fe53-417c-8b4a-05ed5604676d.sql (M4b landed without its self-mark; its ledger row 20261004055007 is recorded by the M4c healer (756bcd49, mark 20261004070000) | 20261004055819)
  - 20260923070512_caeccd7a-5fa0-4298-afa0-beea1a4d7023.sql (INC-268 (the memoised attr_allowed_check) omitted its own self-marking INSERT; a tool-written file cannot be edited afterwards, so the ledger rows 20260923070000 and 20260923071000 are recorded by the first corrective (48cab075) and this file's own filename row 20260923070512 — the row parity keys on — by the second | 20260923072520)
  - 20260920151236_fa43c991-291b-4197-b7c7-0dc8bbfc8fec.sql (M-ORDER part 2 (commit + export) declared mark 20260920120002, which precedes its filename stamp; the ledger row 20260920151236 is recorded by the corrective | 20260920151351)
  - 20260928135721_6b0f6ae1-97f5-4fa4-aee8-4603737dbcae.sql (INC-321 declared mark 20260928100000, which precedes its filename stamp; the ledger row 20260928135721 is recorded by the corrective | 20260928140742)
  - 20260909140408_c8656a8a-8a87-4218-9141-f8518195f117.sql (FIX-SCAN-1 ISSUE 1 landed without its self-mark; the marks 20260909140408 and 20260909150000 are recorded by the corrective | 20260909142634)
  - 20260921092130_872f21f4-7e65-4643-8d4b-eeed116a6e37.sql (M-SHAPE planner guard: its proofs anchored on the live `voltage` definition, so the file can only apply where that row exists (staging raised "PROOF setup: voltage definition absent", INC-255); the identical planner body with scratch-row proofs, and the ledger row 20260922090000, are recorded by the corrective | 20260921094000)
  - 20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql (D37-1 declared mark 20260924028000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260924084745_adeb37e6-5164-49ac-b95c-ae8602bcd8fa.sql (D37-1 declared mark 20260924026000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql (D37-1 declared mark 20260924020000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260909054432_c9699f59-7f36-4fbc-a49c-2511eb4bc369.sql (IMPORT-GATE part B landed without its self-mark; the marks 20260909054432 and 20260909060000 are recorded by the corrective | 20260909054514)
  - 20260924084606_531073a7-5fb5-4c80-b98a-3aae0f35c7c1.sql (D37-1 declared mark 20260924022000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260924084727_4b3cc41e-32b7-4537-83e1-9ddbb2585784.sql (D37-1 declared mark 20260924025000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql (bundle 2 declared mark 20261003000000, which precedes its filename stamp; the ledger row 20261003005802 is recorded by the corrective | 20261003012503)
  - 20260911223202_ee224de0-47c7-47de-9a97-bdec0b70f360.sql (DEC-050 L2a declared mark 20260911223000 precedes its filename stamp; ledger row healed to 20260911223202 by the corrective | 20260911224612)
  - 20260917205429_b76587b4-ed9b-4ec7-bc08-42da95caf653.sql (M-MAINT part A declared mark 20260917140000 precedes its filename stamp; ledger row healed to 20260917205429 by the corrective | 20260917210704)
  - 20260924084544_34d30f0a-b0e9-449e-b33d-d4bd50d08747.sql (D37-1 declared mark 20260924021000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260924084639_97e1fedd-eee6-4f72-af8b-e62e25ae8425.sql (D37-1 declared mark 20260924023000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260917210349_c23b6c76-b29b-4cfe-b559-0d4abc728a9f.sql (M-MAINT proofs P3/P4 declared mark 20260917150500 precedes its filename stamp; ledger row healed to 20260917210349 by the corrective | 20260917210704)
  - 20260917214504_776e63d7-3511-4fb8-a2c0-a57cb33b7e05.sql (M-MAINT proofs P3/P4 corrective run (operator resolved from the database) declared mark 20260917214500 precedes its filename stamp; ledger row healed to 20260917214504 by the corrective | 20260917214536)
  - 20261004010309_60b466e2-a6fd-4b69-9029-d8f067fbe437.sql (comment-only file applied in error before M2 (executes nothing); its ledger row 20261004010309 is recorded by M2 | 20261004011235)
  - 20260920150901_bd008b3e-1ac4-44f6-8143-1441cc365b81.sql (M-ORDER part 1 (the planner) declared mark 20260920120000, which precedes its filename stamp; the ledger row 20260920150901 is recorded by the corrective | 20260920151351)
  - 20260917210006_86c1bbd7-b80c-4563-b57c-83d4def31bf7.sql (M-MAINT part B declared mark 20260917150000 precedes its filename stamp; ledger row healed to 20260917210006 by the corrective | 20260917210704)
  - 20260924091805_37a1e9bc-3840-4190-a88c-28f4b8f9346a.sql (D37-1 declared mark 20260924091500, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20260924084700_6c11435c-c46b-4f2d-8c15-9b5cea7a5573.sql (D37-1 declared mark 20260924024000, which precedes its filename stamp; the ledger row is recorded by the D37-1 closer (mark 20260924100000) | b318bbba)
  - 20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql (M5 declares mark 20261004090000, earlier than its filename stamp; the M5b healer (02084273, mark 20261004160000) writes a mark after it | 20261004144628)
  - 20260920035859_59a77c4c-ef00-4c57-9bce-79a4284a01d4.sql (Part 2b readers declared mark 20260920000008, which precedes its filename stamp; the ledger rows 20260920035859 and 20260920040000 are recorded by the R-MARK corrective | 20260920072310)
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard self-test OK (the bad fixture is refused).
Real-row proof guard self-test OK (an allowlisted statement is skipped and printed; the other statement of its file and the bad fixture are still refused).
Real-row proof guard: allowlisted statements (each cites its reason)
  - 20261019063635_0e901b95-3cfb-4daf-bb72-6a6d3f691897.sql | -- the acceptance and notice rows below are deleted by the rollback) SELECT p.user_id INTO v_uid FROM public.profiles p | INC-760: a real profile borrowed by the proof (banned: real rows in a proof, G27). The file was applied on ethio-prod and ethio-staging before this guard ran and cannot be edited; every statement that used the row ran in the sub-block that rolled itself back, so nothing was kept. Not a precedent: every other statement and every later file is still refused; read by the supervisor 2026-10-19
  - 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql | UPDATE public.attributes SET depends_on = v_p WHERE id = v_c | the row is the proof's own scratch attribute: v_c is returned by the INSERT of the e2e-mig- key two statements above (M11 :509-510); read by the supervisor 2026-10-07
Real-row proof guard FAILED: a proof reads a real row (use an e2e-mig- scratch row):
supabase/migrations/20261028223430_631c8680-d4a9-4b2f-bab9-8c83d604a445.sql: SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/38524f43-970c-415d-9a19-3ecfd56ab16f' before making global git config changes
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
