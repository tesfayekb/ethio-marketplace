# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40794666365
- Commit: `17ef198fac52c555fa14851a92d2d659237b5fcb`
- Attempt: 1
- Written (UTC): 2026-10-29T01:18:50.194Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Component tests — failure

### Evidence lines

```text
[90mstdout[2m | scripts/conformance/on-demand-failure.test.ts[2m > [22m[2ma piece fetched on demand that fails to download tells the person (INC-911)[2m > [22m[2mODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure)
     [33m[2m✓[22m[39m ODC-7 one log line for a failure: no console.error starts `[client-error]` and says `failed to load` outside on-demand-failure.ts (logOnDemandFailure) [33m 773[2mms[22m[39m
[90mstdout[2m | src/routes/api/translate.route.test.ts[2m > [22m[2mPOST /api/translate on defineRoute and aiCall (Foundations turn 19)[2m > [22m[2mTRR-5 a failed chunk marks only its keys providerUnavailable, writes nothing for them and writes the other chunk
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[22m[39m[seller-place] read failed Error: [vitest] No "readSellerPlace" export is defined on the "./posting-service" mock. Did you forget to return it from "vi.mock"?
[90mstderr[2m | src/components/ui/overlay-facade-failure.test.tsx[2m > [22m[2mthe overlay facades when the module fails to arrive (DEC-259, DEC-260)[2m > [22m[2mOVF-16 a failed download keeps the closed dialog; the next click asks again and opens it
[90mstdout[2m | scripts/conformance/session-reads.test.ts[2m > [22m[2ma session that could not be read is unknown, never signed out (INC-914)[2m > [22m[2mCF-SESSION-1 every reader of currentSession() reads its `failed`
[22m[39m[session-reads] currentSession() calls: 19; without failed: 0
     [33m[2m✓[22m[39m CF-SESSION-1 every reader of currentSession() reads its `failed` [33m 1432[2mms[22m[39m
[90mstderr[2m | src/server/first-screen.test.ts[2m > [22m[2mreadFirstFeedPage (D234 S5)[2m > [22m[2mFSP-5 a refused or failed feed read: no first page (the browser reads as before)
[90mstderr[2m | scripts/ci/repeat-cap.test.ts[2m > [22m[2mthe repeat lane's cap reader (INC-966)[2m > [22m[2mRCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped
[22m[39m[feed-links] /api/feed signing failed
[22m[39m[ssr-error] /api/feed [incident 3bf906d4-e4c5-4833-865b-081ff9f8a372] ReaderError: feed_page: marker-text-that-must-not-travel
[22m[39m[ssr-error] /api/example Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}     at Module.normalizeCatastrophicSsrResponse (/home/runner/work/ethio-marketplace/ethio-marketplace/src/server.ts:70:47)
Error: h3 swallowed SSR error: {"unhandled":true,"message":"HTTPError"}
[22m[39m[screening] review of a photo change failed { message: [32m'changeGone'[39m }
[90mstderr[2m | src/features/ad-page/report-ad.test.tsx[2m > [22m[2mRD-5 Report dialog[2m > [22m[2mshows failed and preserves the required form
 [32m✓[39m src/features/posting/preview/listing-detail-map-failed.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 348[2mms[22m[39m
 [31m❯[39m scripts/test-ids.test.ts [2m([22m[2m6 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 299[2mms[22m[39m
[22m[39m[save-error] unsave_listing Error: transport
[22m[39m[save-error] listing_saved Error: transport
     [33m[2m✓[22m[39m RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary [33m 305[2mms[22m[39m
[90mstderr[2m | src/features/ad-page/report.test.ts[2m > [22m[2mreportListing[2m > [22m[2mRD-4 an error is failed
[41m[1m FAIL [22m[49m scripts/test-ids.test.ts[2m > [22mtest ids (INC-536)[2m > [22mTI-1 no test id is used twice in the repository
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m352 passed[39m[22m[90m (353)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2116 passed[39m[22m[90m (2117)[39m
##[error]AssertionError: expected [ Array(1) ] to deeply equal []
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text

[41m[1m FAIL [22m[49m scripts/test-ids.test.ts[2m > [22mtest ids (INC-536)[2m > [22mTI-1 no test id is used twice in the repository
[31m[1mAssertionError[22m: expected [ Array(1) ] to deeply equal [][39m

[32m- Expected[39m
[31m+ Received[39m

[32m- [][39m
[31m+ [[39m
[31m+   "GML-4: src/features/ad-page/maps-links.test.ts:39, src/features/ad-page/maps-links.test.ts:78",[39m
[31m+ ][39m

[36m [2m❯[22m scripts/test-ids.test.ts:[2m12:19[22m[39m
    [90m 10|[39m       ([id, places]) => `${id}: ${places.map((p) => `${p.file}:${p.lin…
    [90m 11|[39m     )[33m;[39m
    [90m 12|[39m     [34mexpect[39m(found)[33m.[39m[34mtoEqual[39m([])[33m;[39m
    [90m   |[39m                   [31m^[39m
    [90m 13|[39m   })[33m;[39m
    [90m 14|[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m352 passed[39m[22m[90m (353)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m2116 passed[39m[22m[90m (2117)[39m
[2m   Start at [22m 00:32:22
[2m   Duration [22m 199.06s[2m (transform 8.52s, setup 120.84s, import 52.07s, tests 99.02s, environment 268.29s)[22m


##[error]AssertionError: expected [ Array(1) ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "GML-4: src/features/ad-page/maps-links.test.ts:39, src/features/ad-page/maps-links.test.ts:78",
+ ]

 ❯ scripts/test-ids.test.ts:12:19


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/d6d89a52-598b-4299-8753-97448057e28a' before making global git config changes
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

## Migration linter (with self-test) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
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
  - 20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | the proof uses it. SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable
  - 20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country') <> 1 | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable
  - 20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | UPDATE public.locations SET is_active = true WHERE id = v_anc | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable
  - 20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | -- R2 is switched off after its city is placed (the ancestry guard refuses an active -- city under an inactive region), | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable
  - 20261019063635_0e901b95-3cfb-4daf-bb72-6a6d3f691897.sql | -- the acceptance and notice rows below are deleted by the rollback) SELECT p.user_id INTO v_uid FROM public.profiles p | INC-760: a real profile borrowed by the proof (banned: real rows in a proof, G27). The file was applied on ethio-prod and ethio-staging before this guard ran and cannot be edited; every statement that used the row ran in the sub-block that rolled itself back, so nothing was kept. Not a precedent: every other statement and every later file is still refused; read by the supervisor 2026-10-19
  - 20261028224333_4ce633e9-2d61-433c-a543-6f7dc00cb769.sql | UPDATE public.user_directory SET home_country_code = v_home WHERE user_id = v_uid | the directory row is the proof's own scratch user (v_uid, inserted in the proof) (D1 M2); recorded in D1 stop 12, file applied and not editable
  - 20261028224333_4ce633e9-2d61-433c-a543-6f7dc00cb769.sql | -- (b) step 2, fixed with an amount and no home market: price_currency/required. UPDATE public.user_directory SET home_c | the directory row is the proof's own scratch user (v_uid, inserted in the proof) (D1 M2); recorded in D1 stop 12, file applied and not editable
  - 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql | UPDATE public.attributes SET depends_on = v_p WHERE id = v_c | the row is the proof's own scratch attribute: v_c is returned by the INSERT of the e2e-mig- key two statements above (M11 :509-510); read by the supervisor 2026-10-07
  - 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql | IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_target) THEN RAISE EXCEPTION 'INC-951 3a proof: the scrat | the profile is the proof's own scratch target user (v_target, inserted in the proof) (D1 M4); recorded in D1 stop 12, file applied and not editable
  - 20261028223430_631c8680-d4a9-4b2f-bab9-8c83d604a445.sql | SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid | the profile is the proof's own scratch user (v_uid, inserted in the proof) (D1 M1); recorded in D1 stop 12, file applied and not editable
  - 20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable
  - 20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | UPDATE public.locations SET is_active = true WHERE id = v_anc | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable
  - 20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | UPDATE public.locations SET is_active = false WHERE id = v_r2 | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable
Real-row proof guard FAILED: a proof reads a real row (use an e2e-mig- scratch row):
supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql: IF (SELECT count(*) FROM public.categories WHERE slug LIKE v_tag || '-%') <> 2 OR (SELECT coalesce(sum(count), 0) FROM p
supabase/migrations/20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql: IF v_id IS NULL OR v_msg IS DISTINCT FROM 'rateLimited' OR EXISTS (SELECT 1 FROM public.categories WHERE slug = v_tag ||
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/20424418-3fd8-4563-b633-5fa9f308b3a1' before making global git config changes
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

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
Per-page budget failed (D234):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    354.7 / 356 KiB  /admin/categories
    336.3 / 337 KiB  /admin/countries
    328.9 / 330 KiB  /admin/coverage
    207.3 / 209 KiB  /admin/images
    307.1 / 308 KiB  /admin/impersonation_/$sessionId
    276.3 / 277 KiB  /admin/legal
    275.6 / 277 KiB  /admin/legal_/$versionId
    281.8 / 283 KiB  /admin/legal_/edit
    352.4 / 353 KiB  /admin/listings
    375.8 / 379 KiB  /admin/listings_/$listingId
    399.4 / 403 KiB  /admin/listings_/$listingId_/edit
    268.2 / 270 KiB  /admin/locations
    337.6 / 338 KiB  /admin/places
    304.7 / 306 KiB  /admin/roles
    305.1 / 306 KiB  /admin/roles_/$roleId
    373.7 / 377 KiB  /admin/screening
    407.1 / 408 KiB  /admin/translations
    319.3 / 320 KiB  /admin/translations_/$lang
    303.1 / 304 KiB  /admin/users
    283.6 / 285 KiB  /admin/users_/$userId
    218.3 / 219 KiB  /auth
    206.7 / 208 KiB  /auth_/callback
    208.8 / 210 KiB  /auth_/reset
    219.2 / 220 KiB  /c/$slug
    221.5 / 223 KiB  /dev/primitives
    240.6 / 242 KiB  /dev/style
    206.0 / 207 KiB  /dev/tall
    247.5 / 251 KiB  /l/$slug
    209.6 / 211 KiB  /legal/$kind
    217.3 / 218 KiB  /legal/accept
    210.3 / 212 KiB  /legal/publishing
    326.2 / 327 KiB  /my-listings
    315.2 / 315 KiB  /my-listings_/$listingId
    394.1 / 397 KiB  /my-listings_/$listingId_/edit
    394.1 / 397 KiB  /post
    394.0 / 397 KiB  /post_/$listingId
    209.6 / 211 KiB  /privacy
    269.5 / 271 KiB  /settings
    209.6 / 211 KiB  /terms
  /my-listings_/$listingId: 315.2 KiB, over its ceiling of 315 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/358addba-8f7a-4b05-967c-0d89634d8f34' before making global git config changes
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
  E2E_EXPECTED_SOURCES: smoke,email,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,repeat?
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40794666365
  E2E_HEAD_COMMIT_MESSAGE: Fixed M6a proof md5 guard

X-Lovable-Edit-ID: edt-ddbe4abe-b59d-4629-a082-58bc9bf21ec4
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
context download: 0 context files found.
  glob: shard-contexts/**/error-context.md
  searched: shard-contexts (unreadable or absent)
Wrote docs/tracking/e2e-last-failure.md (0/18 source(s) with usable results, 0 context file(s) found).
publish-evidence: published docs/tracking/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "lanes=failure"
[36;1mecho "lanes=failure"[0m
[36;1mif [ "failure" != "success" ]; then[0m
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "Every temporary-backend lane passed (the email lane included)."[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
lanes=failure
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/3ff232d2-9b1d-4d2b-8d4b-e2b520cadbaf' before making global git config changes
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
