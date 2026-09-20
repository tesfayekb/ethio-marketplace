# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35490612089
- Commit: `389249326547ab106631559e51c9aeb196fcfbc4`
- Attempt: 1
- Written (UTC): 2026-09-20T05:18:46.115Z

## Migration linter (with self-test) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[36;1mSELF_TEST=1 bash scripts/check-migrations.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
Self-test OK: bad fixture correctly flagged.
Self-test OK: definer-without-revoke sample correctly flagged:
  - /tmp/tmp.9JrBn1T8UM (SECURITY DEFINER without in-file REVOKE: self_test_definer)
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
Self-test OK: definer-without-revoke sample correctly flagged:
  - /tmp/tmp.MsoYCNs3N7 (SECURITY DEFINER without in-file REVOKE: self_test_definer)
Self-test OK: allowlisted file skipped and printed:
Definer guard: allowlisted files (each cites its closer)
  - 29990101000000_allowlisted-sample.sql (self-test: tool split placed the REVOKE in the next file | closed by deadbeef)
Self-test OK: unmarked-migration sample correctly flagged:
  - /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/fixtures/bad-unmarked-migration-example.sql (no INSERT INTO public.migration_marks)
Definer guard: grandfathered files skipped (pre-20260810000000):
  - 20260809010922_edef5653-e1b6-40a8-b8a0-920ada89db08.sql (grandfathered)
  - 20260804174739_0ce87c13-1bf0-4cc8-8d61-8dd8212d961c.sql (grandfathered)
  - 20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql (grandfathered)
  - 20260730015333_87dbf472-b8ca-4e8d-b9d9-d48fd13278e8.sql (grandfathered)
  - 20260809061244_e2830ce7-06c8-4720-af53-4009336c4c86.sql (grandfathered)
  - 20260803100407_e0cb3ef4-5240-48db-8a73-d6f983137eab.sql (grandfathered)
  - 20260804133231_85cf6673-6143-4591-ba21-1bf72eb32b9f.sql (grandfathered)
  - 20260730094625_8d30a5fc-2ce1-4a0a-b4c1-931911a09076.sql (grandfathered)
  - 20260803075756_47bf56ca-eb85-4c8b-8e62-1f95cb9af2a6.sql (grandfathered)
Definer guard: allowlisted files (each cites its closer)
  - 20260908041703_62e6566c-a1c9-4212-a78b-c68e0bf95169.sql (DEC-045a redeclared admin_delete_attribute, admin_unlink_attribute and admin_merge_attributes without restating their REVOKE/GRANT; window closed by the DEC-045a-fix corrective (ACL read-back loop in file) | closed by d9267b5f)
  - 20260907050122_84bead12-f50a-4e83-b3e5-e7bc34a0ec21.sql (C3-UX-2 redeclared five entity-translation definers without restating their grants; window closed by the C3-UX-2b corrective (read-back in file) | closed by 2dcafad6)
  - 20260903044526_7e14ce39-76a6-4095-845b-e5d6e83d772c.sql (admin_create_category REVOKE restated in C2e corrective | closed by 63df0b68)
  - 20260831064939_4a00896e-bc69-4919-bb1e-8181a7e65034.sql (tool split placed the REVOKE in the next file; window closed by paired apply | closed by f18f1883)
Definer guard OK.
Self-marking guard FAILED: 1 file(s) do not self-mark into public.migration_marks:
  - supabase/migrations/20260920035859_59a77c4c-ef00-4c57-9bce-79a4284a01d4.sql (declared mark '20260920000008' precedes its filename stamp '20260920035859')
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/6e5553a1-42d9-40f4-86de-374e77d4537b' before making global git config changes
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
[36;1m    || echo "::warning::DEC-030 flake-ledger re-append failed"[0m
[36;1m  echo "::warning::E2E failure report push failed after retries"[0m
[36;1m  echo "::error::E2E failure reporter self-test failed (exit ${selftest})"[0m
Self-test OK: DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[36;1m  echo "::error::E2E failure reporter crashed (exit ${reporter}) — see docs/tracking/e2e-last-failure.md"[0m
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
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35490612089
  E2E_HEAD_COMMIT_MESSAGE: Changes

Co-authored-by: tesfayekb <tesfayekb@me.com>
##[endgroup]
  layout OK — per-artifact subdir: 1 context file(s), report rendered.
  layout OK — merged flat: 1 context file(s), report rendered.
  layout OK — zero artifacts: 0 context file(s), report rendered.
  layout OK — missing directory: 0 context file(s), report rendered.
Self-test OK: DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).
Wrote docs/tracking/e2e-last-failure.md (8/8 source(s) with usable results, 3 context file(s) found).
Flake ledger: appended 3 line(s) to docs/tracking/flake-ledger.md.
Flake ledger: appended 3 line(s) to docs/tracking/flake-ledger.md.
From https://github.com/tesfayekb/ethio-marketplace
 * branch            dev        -> FETCH_HEAD
HEAD is now at 3892493 Changes
Flake ledger: appended 3 line(s) to docs/tracking/flake-ledger.md.
[dev 69f955a] ci: e2e failure report + flake ledger [skip ci]
 2 files changed, 44 insertions(+), 118 deletions(-)
To https://github.com/tesfayekb/ethio-marketplace
   3892493..69f955a  HEAD -> dev
##[group]Run echo "smoke=success email=success shards=failure"
[36;1mecho "smoke=success email=success shards=failure"[0m
[36;1mif [ "success" != "success" ] || [ "failure" != "success" ] || [ "success" != "success" ]; then[0m
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "All E2E shards and the smoke tier passed."[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
smoke=success email=success shards=failure
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/ad4e2877-ee07-47d7-bd57-54f9b47be0e6' before making global git config changes
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
