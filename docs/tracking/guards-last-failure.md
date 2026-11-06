# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42185001386
- Commit: `1ec4ea6ae3b8aec92769ff9030d99ab071e54122`
- Attempt: 1
- Written (UTC): 2026-11-06T08:28:42.900Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261106051500_6d2f0f3e-7b7a-4c0e-9a4e-1f8e1c2a0d01.sql
  - 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql
  - 20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql
  - 20261106051800_f3b8d2a1-6c4e-4d7b-9a1f-5e2c8b0d4a04.sql
  - 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql
  - 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql
STAGING BEHIND: apply 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 25 of 28)
STAGING BEHIND: apply 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261106051500_6d2f0f3e-7b7a-4c0e-9a4e-1f8e1c2a0d01.sql
  - 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql
  - 20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql
  - 20261106051800_f3b8d2a1-6c4e-4d7b-9a1f-5e2c8b0d4a04.sql
  - 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql
  - 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql
STAGING BEHIND: apply 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 26 of 28)
STAGING BEHIND: apply 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261106051500_6d2f0f3e-7b7a-4c0e-9a4e-1f8e1c2a0d01.sql
  - 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql
  - 20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql
  - 20261106051800_f3b8d2a1-6c4e-4d7b-9a1f-5e2c8b0d4a04.sql
  - 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql
  - 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql
STAGING BEHIND: apply 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 27 of 28)
STAGING BEHIND: apply 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261106051500_6d2f0f3e-7b7a-4c0e-9a4e-1f8e1c2a0d01.sql
  - 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql
  - 20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql
  - 20261106051800_f3b8d2a1-6c4e-4d7b-9a1f-5e2c8b0d4a04.sql
  - 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql
  - 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql
STAGING BEHIND: apply 20261106052000_b2c6e8d1-4f7a-4c3e-8d9b-6a1e0f3c5d06.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 28 of 28)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/e16ee915-608f-489d-9335-dca44242ab56' before making global git config changes
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
NEAR band failed (DEC-296):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    286.9 / 288 KiB  /admin/legal
    284.2 / 285 KiB  /admin/legal_/$versionId
    291.1 / 292 KiB  /admin/legal_/edit
    350.8 / 351 KiB  /admin/listings
    352.2 / 353 KiB  /admin/listings_/$listingId
    413.2 / 414 KiB  /admin/listings_/$listingId_/edit
    275.6 / 276 KiB  /admin/locations
    340.4 / 341 KiB  /admin/monetisation
    332.7 / 333 KiB  /admin/places
    298.2 / 299 KiB  /admin/roles
    278.6 / 279 KiB  /admin/roles_/$roleId
    372.2 / 373 KiB  /admin/screening
    309.1 / 310 KiB  /admin/translations
    312.6 / 313 KiB  /admin/translations_/$lang
    297.8 / 299 KiB  /admin/users
    293.1 / 294 KiB  /admin/users_/$userId
    228.6 / 229 KiB  /auth
    215.0 / 216 KiB  /auth_/callback
    216.9 / 218 KiB  /auth_/reset
    234.0 / 235 KiB  /c/$slug
    235.4 / 236 KiB  /dev/primitives
    254.9 / 256 KiB  /dev/style
    214.2 / 215 KiB  /dev/tall
    263.9 / 265 KiB  /l/$slug
    218.5 / 219 KiB  /legal/$kind
    225.6 / 226 KiB  /legal/accept
    219.3 / 220 KiB  /legal/publishing
    321.3 / 322 KiB  /my-listings
    328.2 / 329 KiB  /my-listings_/$listingId
    407.8 / 408 KiB  /my-listings_/$listingId_/edit
    407.8 / 408 KiB  /post
    407.7 / 408 KiB  /post_/$listingId
    218.5 / 219 KiB  /privacy
    282.1 / 283 KiB  /settings
    218.5 / 219 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

NEAR band failed (DEC-296):
  /admin/categories: 349.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 350 KiB — DEC-296: set it to ceilingFor(size) = 351
  /admin/listings: 350.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 351 KiB — DEC-296: set it to ceilingFor(size) = 352
  /my-listings_/$listingId_/edit: 407.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 408 KiB — DEC-296: set it to ceilingFor(size) = 409
  /post: 407.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 408 KiB — DEC-296: set it to ceilingFor(size) = 409
  /post_/$listingId: 407.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 408 KiB — DEC-296: set it to ceilingFor(size) = 409
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/aa959efe-9ab4-42dd-b27e-8814ac57f9ee' before making global git config changes
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
[36;1mfi[0m
[36;1mif [ "$reporter" -ne 0 ]; then[0m
[36;1m  echo "::error::E2E failure reporter crashed (exit ${reporter}) — see docs/tracking/e2e-last-failure.md"[0m
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
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42185001386
  E2E_HEAD_COMMIT_MESSAGE: 
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
Wrote docs/tracking/e2e-last-failure.md (18/19 source(s) with usable results, 1 context file(s) found).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
Flake ledger: appended 0 line(s) to docs/tracking/flake-ledger.md; 1 already there for this run (INC-495).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
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
Temporarily overriding HOME='/home/runner/work/_temp/2c0558db-a295-4b87-992c-271c202f96c4' before making global git config changes
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
