# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40845931124
- Commit: `7583664d69905a81dd1c9aadc1379f5e77b537d7`
- Attempt: 1
- Written (UTC): 2026-10-29T09:22:44.373Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Migration linter (with self-test) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  - 20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql (M5 declares mark 20261004090000, earlier than its filename stamp; the M5b healer (02084273, mark 20261004160000) writes a mark after it | 20261004144628)
  - 20260920035859_59a77c4c-ef00-4c57-9bce-79a4284a01d4.sql (Part 2b readers declared mark 20260920000008, which precedes its filename stamp; the ledger rows 20260920035859 and 20260920040000 are recorded by the R-MARK corrective | 20260920072310)
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard self-test OK (the bad fixture is refused).
Real-row proof guard self-test OK (an allowlisted statement is skipped and printed; the other statement of its file and the bad fixture are still refused).
Real-row proof guard self-test OK (a head containing '||' is refused without its line, skipped by its sha256 line, and a stale sha256 line does not skip it).
Real-row proof guard: allowlisted statements (each cites its reason)
  - 20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | the proof uses it. SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable
  - 20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | IF v_anc IS NULL OR (SELECT count(*) FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country') <> 1 | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable
  - 20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | UPDATE public.locations SET is_active = true WHERE id = v_anc | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable
  - 20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql | -- R2 is switched off after its city is placed (the ancestry guard refuses an active -- city under an inactive region), | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3); recorded in D1 stop 12, file applied and not editable
  - 20261019063635_0e901b95-3cfb-4daf-bb72-6a6d3f691897.sql | -- the acceptance and notice rows below are deleted by the rollback) SELECT p.user_id INTO v_uid FROM public.profiles p | INC-760: a real profile borrowed by the proof (banned: real rows in a proof, G27). The file was applied on ethio-prod and ethio-staging before this guard ran and cannot be edited; every statement that used the row ran in the sub-block that rolled itself back, so nothing was kept. Not a precedent: every other statement and every later file is still refused; read by the supervisor 2026-10-19
  - 20261029044433_175bb84e-0bb9-4d2e-aa3c-40dd1045d387.sql | UPDATE public.profiles SET display_name=v_feature WHERE user_id=v_uid | updates only the proof's scratch user inserted directly above; rolled back on A2 sentinel
  - 20261029044433_175bb84e-0bb9-4d2e-aa3c-40dd1045d387.sql | IF EXISTS(SELECT 1 FROM public.ai_features WHERE feature=v_feature) OR EXISTS(SELECT 1 FROM auth.users WHERE id=v_uid) T | confirms rollback of only the proof's own scratch feature and user
  - 20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql | sha256:ec6ba245d821b3ec | reads the proof's own scratch rows (v_tag slugs)
  - 20261029001111_b124ab89-23bf-4bdb-9836-ae9dbe20a538.sql | sha256:671c34e1f9b50ab7 | reads the proof's own scratch rows (v_tag slugs)
  - 20261029043847_4a7e258a-9b47-419b-8d1b-7910ab9cd56e.sql | UPDATE public.profiles SET display_name=v_feature WHERE user_id=v_uid | updates only the proof's scratch user inserted directly above; rolled back on A2 sentinel
  - 20261029043847_4a7e258a-9b47-419b-8d1b-7910ab9cd56e.sql | IF EXISTS(SELECT 1 FROM public.ai_features WHERE feature=v_feature) OR EXISTS(SELECT 1 FROM auth.users WHERE id=v_uid) T | confirms rollback of only the proof's own scratch feature and user
  - 20261028224333_4ce633e9-2d61-433c-a543-6f7dc00cb769.sql | UPDATE public.user_directory SET home_country_code = v_home WHERE user_id = v_uid | the directory row is the proof's own scratch user (v_uid, inserted in the proof) (D1 M2); recorded in D1 stop 12, file applied and not editable
  - 20261028224333_4ce633e9-2d61-433c-a543-6f7dc00cb769.sql | -- (b) step 2, fixed with an amount and no home market: price_currency/required. UPDATE public.user_directory SET home_c | the directory row is the proof's own scratch user (v_uid, inserted in the proof) (D1 M2); recorded in D1 stop 12, file applied and not editable
  - 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql | IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u1) OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u1 | the proof's rollback check: reads only its own scratch e2e-n1b user (v_u1), scratch job runs (v_run, v_old) and scratch lease holders (v_h1, v_h2), all created in the proof (INC-980)
  - 20261007033719_9f7deb8a-e850-4fc3-bfc0-9693f6994666.sql | UPDATE public.attributes SET depends_on = v_p WHERE id = v_c | the row is the proof's own scratch attribute: v_c is returned by the INSERT of the e2e-mig- key two statements above (M11 :509-510); read by the supervisor 2026-10-07
  - 20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | -- u1: a legacy alias with no row (upper case, to prove the lower-cased text). UPDATE public.profiles SET seller_alias = | reads or writes only the proof's own scratch e2e-n1b users (v_u1/v_u2/v_u3, inserted in the proof); rolled back on the M1 sentinel
  - 20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | -- u2: an alias whose row is already 'clean' (must stay untouched). UPDATE public.profiles SET seller_alias = v_a2 WHERE | reads or writes only the proof's own scratch e2e-n1b users (v_u1/v_u2/v_u3, inserted in the proof); rolled back on the M1 sentinel
  - 20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | -- u3: no alias (must get no row). UPDATE public.profiles SET seller_alias = NULL WHERE user_id = v_u3 | reads or writes only the proof's own scratch e2e-n1b users (v_u1/v_u2/v_u3, inserted in the proof); rolled back on the M1 sentinel
  - 20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | INSERT INTO public.name_checks(profile_id, subject, checked_text, state, since, home_country_code) SELECT p.user_id, 'al | INC-979: the backfill statement under test (and its no-alias-left check) spans every profile by design; inside the proof it ran in the sub-block that rolled itself back, so nothing was kept; file applied on ethio-prod and not editable
  - 20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | nothing changes (idempotent). INSERT INTO public.name_checks(profile_id, subject, checked_text, state, since, home_count | INC-979: the backfill statement under test (and its no-alias-left check) spans every profile by design; inside the proof it ran in the sub-block that rolled itself back, so nothing was kept; file applied on ethio-prod and not editable
  - 20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.seller_alias IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.name_ch | INC-979: the backfill statement under test (and its no-alias-left check) spans every profile by design; inside the proof it ran in the sub-block that rolled itself back, so nothing was kept; file applied on ethio-prod and not editable
  - 20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_u1,v_u2,v_u3)) OR EXISTS (SELECT 1 FROM public.name_checks WHERE prof | reads or writes only the proof's own scratch e2e-n1b users (v_u1/v_u2/v_u3, inserted in the proof); rolled back on the M1 sentinel
  - 20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql | BEGIN IF EXISTS (SELECT 1 FROM public.profiles p WHERE p.seller_alias IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.n | the post-apply read-back outside the proof (INC-979): asserts no alias is left without a name_checks row; reads, never writes
  - 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql | IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_target) THEN RAISE EXCEPTION 'INC-951 3a proof: the scrat | the profile is the proof's own scratch target user (v_target, inserted in the proof) (D1 M4); recorded in D1 stop 12, file applied and not editable
  - 20261028223430_631c8680-d4a9-4b2f-bab9-8c83d604a445.sql | SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid | the profile is the proof's own scratch user (v_uid, inserted in the proof) (D1 M1); recorded in D1 stop 12, file applied and not editable
  - 20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | SELECT a.id INTO v_anc FROM public.locations a WHERE a.country_code = v_code AND a.level = 'country' | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable
  - 20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | UPDATE public.locations SET is_active = true WHERE id = v_anc | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable
  - 20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql | UPDATE public.locations SET is_active = false WHERE id = v_r2 | the rows are the proof's own scratch country (v_code) and its auto-created anchor and places (D1 M3b); recorded in D1 stop 12, file applied and not editable
  - 20261029063150_560e36c8-6f0f-4ab9-a021-bfe1582a9431.sql | IF (v_r->>'ok')::boolean IS NOT TRUE OR v_c.state IS DISTINCT FROM 'unchecked' OR v_c.checked_text<>v_a1 OR (SELECT sell | reads only the proof's own scratch e2e-n1 users (v_u1/v_u2, inserted in the proof) and their scratch role; rolled back on the N1a sentinel
  - 20261029063150_560e36c8-6f0f-4ab9-a021-bfe1582a9431.sql | IF (SELECT seller_alias FROM public.profiles WHERE user_id=v_u1)<>v_a2 OR EXISTS (SELECT 1 FROM public.alias_history WHE | reads only the proof's own scratch e2e-n1 users (v_u1/v_u2, inserted in the proof) and their scratch role; rolled back on the N1a sentinel
  - 20261029063150_560e36c8-6f0f-4ab9-a021-bfe1582a9431.sql | IF v_c.state<>'clean' OR v_c.checked_text<>v_a4 OR (SELECT seller_alias FROM public.profiles WHERE user_id=v_u1)<>v_a4 T | reads only the proof's own scratch e2e-n1 users (v_u1/v_u2, inserted in the proof) and their scratch role; rolled back on the N1a sentinel
  - 20261029063150_560e36c8-6f0f-4ab9-a021-bfe1582a9431.sql | IF EXISTS (SELECT 1 FROM auth.users WHERE id IN (v_u1,v_u2)) OR EXISTS (SELECT 1 FROM public.roles WHERE id=v_role) OR E | reads only the proof's own scratch e2e-n1 users (v_u1/v_u2, inserted in the proof) and their scratch role; rolled back on the N1a sentinel
Real-row proof guard FAILED: a proof reads a real row (use an e2e-mig- scratch row):
supabase/migrations/20261029085507_709fb25b-c8da-47f0-b50f-c1e6a5ab9b80.sql: IF (SELECT seller_alias FROM public.profiles WHERE user_id = v_u) IS DISTINCT FROM v_a THEN RAISE EXCEPTION 'SPA-1c colu
supabase/migrations/20261029085507_709fb25b-c8da-47f0-b50f-c1e6a5ab9b80.sql: IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u) OR EXISTS (SELECT 1 FROM public.alias_history WHERE user_id = v_u) T
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/315b8f24-3823-433d-9286-8fd8b2a70ef0' before making global git config changes
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
