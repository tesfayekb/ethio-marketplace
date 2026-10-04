# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37181051989
- Commit: `2c252e8a63ccdb6dd72e86abaeb0147ce58268eb`
- Attempt: 2
- Written (UTC): 2026-10-04T05:54:30.937Z

## Migration linter (with self-test) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  - /tmp/tmp.mwaGhc7a1M (SECURITY DEFINER without in-file REVOKE: self_test_definer)
Self-test OK: allowlisted file skipped and printed:
Definer guard: allowlisted files (each cites its closer)
  - 29990101000000_allowlisted-sample.sql (self-test: tool split placed the REVOKE in the next file | closed by deadbeef)
Self-test OK: unmarked-migration sample correctly flagged:
  - /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/fixtures/bad-unmarked-migration-example.sql (no INSERT INTO public.migration_marks)
SELF_TEST mode: self-tests passed; skipping real scan.
##[group]Run bash scripts/check-migrations.sh
[36;1mbash scripts/check-migrations.sh[0m
[36;1mbun run scripts/e2e-migration-preflight.ts --self-test[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
Self-test OK: bad fixture correctly flagged.
Self-test OK: closer-cited exemption fails without the cited policy, passes with it.
Policies closed later (allowlisted): 20261003215007_b9aa66a4-fa1e-4ef5-910b-31bbfc65b211.sql | closed by bb808e1a
Policies closed later (allowlisted): 20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql | closed by 37a1e9bc
Policies closed later (allowlisted): 20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql | closed by 37a1e9bc
Self-test OK: definer-without-revoke sample correctly flagged:
  - /tmp/tmp.9YKSnfShYz (SECURITY DEFINER without in-file REVOKE: self_test_definer)
Self-test OK: allowlisted file skipped and printed:
Definer guard: allowlisted files (each cites its closer)
  - 29990101000000_allowlisted-sample.sql (self-test: tool split placed the REVOKE in the next file | closed by deadbeef)
Self-test OK: unmarked-migration sample correctly flagged:
  - /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/fixtures/bad-unmarked-migration-example.sql (no INSERT INTO public.migration_marks)
Definer guard: grandfathered files skipped (pre-20260810000000):
  - 20260804133231_85cf6673-6143-4591-ba21-1bf72eb32b9f.sql (grandfathered)
  - 20260730094625_8d30a5fc-2ce1-4a0a-b4c1-931911a09076.sql (grandfathered)
  - 20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql (grandfathered)
  - 20260804174739_0ce87c13-1bf0-4cc8-8d61-8dd8212d961c.sql (grandfathered)
  - 20260809010922_edef5653-e1b6-40a8-b8a0-920ada89db08.sql (grandfathered)
  - 20260803075756_47bf56ca-eb85-4c8b-8e62-1f95cb9af2a6.sql (grandfathered)
  - 20260803100407_e0cb3ef4-5240-48db-8a73-d6f983137eab.sql (grandfathered)
  - 20260809061244_e2830ce7-06c8-4720-af53-4009336c4c86.sql (grandfathered)
  - 20260730015333_87dbf472-b8ca-4e8d-b9d9-d48fd13278e8.sql (grandfathered)
Definer guard: allowlisted files (each cites its closer)
  - 20260908041703_62e6566c-a1c9-4212-a78b-c68e0bf95169.sql (DEC-045a redeclared admin_delete_attribute, admin_unlink_attribute and admin_merge_attributes without restating their REVOKE/GRANT; window closed by the DEC-045a-fix corrective (ACL read-back loop in file) | closed by d9267b5f)
  - 20260903044526_7e14ce39-76a6-4095-845b-e5d6e83d772c.sql (admin_create_category REVOKE restated in C2e corrective | closed by 63df0b68)
  - 20260831064939_4a00896e-bc69-4919-bb1e-8181a7e65034.sql (tool split placed the REVOKE in the next file; window closed by paired apply | closed by f18f1883)
  - 20261004011235_18556a32-8f3e-4da5-a645-e73223e74e13.sql (M2 restates every closer in-file through a format() loop the literal scan cannot read; ACL read-back asserted in its own proof block | closed by 18556a32)
  - 20260907050122_84bead12-f50a-4e83-b3e5-e7bc34a0ec21.sql (C3-UX-2 redeclared five entity-translation definers without restating their grants; window closed by the C3-UX-2b corrective (read-back in file) | closed by 2dcafad6)
Definer guard OK.
Self-marking guard FAILED: 1 file(s) do not self-mark into public.migration_marks:
  - supabase/migrations/20261004055007_5118f016-fe53-417c-8b4a-05ed5604676d.sql (no INSERT INTO public.migration_marks)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/143884bc-b209-40ca-b0c5-cabfc9323e58' before making global git config changes
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

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+ @tanstack/react-router@1.170.41
+ @tanstack/react-start@1.168.60
+ @tanstack/router-plugin@1.168.42
+ @types/pngjs@6.0.5
+ class-variance-authority@0.7.1
+ clsx@2.1.1
+ cmdk@1.1.1
+ date-fns@4.1.0
+ embla-carousel-react@8.6.0
+ input-otp@1.4.2
+ jpeg-js@0.4.4
+ leaflet@1.9.4
+ libphonenumber-js@1.11.18
+ lucide-react@0.575.0
+ pngjs@7.0.0
+ react@19.2.5
+ react-day-picker@9.14.0
+ react-dom@19.2.5
+ react-hook-form@7.73.1
+ react-resizable-panels@4.10.0
+ recharts@2.15.4
+ sonner@2.0.7
+ tailwind-merge@3.5.0
+ tailwindcss@4.2.4
+ tw-animate-css@1.4.0
+ vaul@1.1.2
+ vite-tsconfig-paths@6.1.1
+ zod@3.25.76

550 packages installed [859.00ms]
##[group]Run bun scripts/e2e-migration-preflight.ts
[36;1mbun scripts/e2e-migration-preflight.ts[0m
shell: /usr/bin/bash -e {0}
env:
  E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
  E2E_SUPABASE_PUBLISHABLE_KEY: ***
  E2E_SUPABASE_SERVICE_ROLE_KEY: ***
##[endgroup]
STAGING BEHIND: apply 20261004055007_5118f016-fe53-417c-8b4a-05ed5604676d.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261004055007_5118f016-fe53-417c-8b4a-05ed5604676d.sql
STAGING BEHIND: apply 20261004055007_5118f016-fe53-417c-8b4a-05ed5604676d.sql to ethio-staging before E2E can pass
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/dcee5e10-68c3-4047-9d68-6a50c85d203a' before making global git config changes
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
##[error]INC-100 BROKEN ARTIFACT CONTRACT — attempt 2 downloaded ZERO results.json files; the report's zeros describe the download, not the suite.
[36;1m  || echo "::warning::DEC-030 flake-ledger pass failed"[0m
[36;1mPUBLISH_EVIDENCE_PREPARE='if [ -f "$EVIDENCE_DIR/docs/tracking/flake-ledger.md" ]; then cp "$EVIDENCE_DIR/docs/tracking/flake-ledger.md" docs/tracking/flake-ledger.md && { E2E_FLAKE_ONLY=1 bun scripts/e2e-failure-report.ts || echo "::warning::DEC-030 flake-ledger re-append failed"; }; fi' \[0m
[36;1m  echo "::error::E2E failure reporter self-test failed (exit ${selftest})"[0m
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message, quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).
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
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37181051989
  E2E_HEAD_COMMIT_MESSAGE: Applied M4b migration file

X-Lovable-Edit-ID: edt-ca262936-7890-4693-bb47-61c837ac8655
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
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message, quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).
context download: 0 context files found.
  glob: shard-contexts/**/error-context.md
  searched: shard-contexts (unreadable or absent)
Wrote docs/tracking/e2e-last-failure.md (0/8 source(s) with usable results, 0 context file(s) found).
publish-evidence: published docs/tracking/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "smoke=skipped email=skipped shards=skipped"
[36;1mecho "smoke=skipped email=skipped shards=skipped"[0m
[36;1mif [ "skipped" != "success" ] || [ "skipped" != "success" ] || [ "skipped" != "success" ]; then[0m
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "All E2E shards and the smoke tier passed."[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
smoke=skipped email=skipped shards=skipped
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/7e817b54-60b3-43f6-9362-5d10011bd07e' before making global git config changes
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
