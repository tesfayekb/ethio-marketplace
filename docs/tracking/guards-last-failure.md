# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42570464470
- Commit: `0f99800a72144d51fc7b2bd1d07d03d6a94171be`
- Attempt: 1
- Written (UTC): 2026-11-09T06:23:00.535Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## i18n used-on map is fresh (U4i ②) — failure

### Evidence lines

```text
##[error]Error: Unexpected HTTP response: 504
```

### Tail (last 60 lines)

```text
##[group]Determining the checkout info
##[endgroup]
[command]/usr/bin/git sparse-checkout disable
[command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
##[group]Checking out the ref
[command]/usr/bin/git checkout --progress --force refs/remotes/pull/30/merge
Note: switching to 'refs/remotes/pull/30/merge'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at b5eb048 Merge 0f99800a72144d51fc7b2bd1d07d03d6a94171be into f2d55846764b3847f9787388b013e6977f782c2e
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
b5eb048425b43cfbccbe49489af38120c6157095
##[group]Run oven-sh/setup-bun@v2
with:
  bun-version: latest
  no-cache: false
  token: ***
##[endgroup]
Downloading a new version of Bun: https://github.com/oven-sh/bun/releases/download/bun-v1.4.4/bun-linux-x64.zip
Unexpected HTTP response: 504
Waiting 17 seconds before trying again
Unexpected HTTP response: 504
Waiting 17 seconds before trying again
##[error]Error: Unexpected HTTP response: 504
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/3c8db445-9100-4364-9b42-759e81c9c8b0' before making global git config changes
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

## Gitleaks secrets scan — failure

### Evidence lines

```text
##[warning]curl -sSfL -o /home/runner/work/_temp/gitleaks_8.24.3_linux_x64.tar.gz https://github.com/gitleaks/gitleaks/releases/download/v8.24.3/gitleaks_8.24.3_linux_x64.tar.gz failed with exit 22 on try 1 of 2; trying again
##[error]curl -sSfL -o /home/runner/work/_temp/gitleaks_8.24.3_linux_x64.tar.gz https://github.com/gitleaks/gitleaks/releases/download/v8.24.3/gitleaks_8.24.3_linux_x64.tar.gz failed with exit 22 on try 2 of 2
##[error]Process completed with exit code 22.
```

### Tail (last 60 lines)

```text

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at b5eb04842 Merge 0f99800a72144d51fc7b2bd1d07d03d6a94171be into f2d55846764b3847f9787388b013e6977f782c2e
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
b5eb048425b43cfbccbe49489af38120c6157095
##[group]Run tarball="gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz"
[36;1mtarball="gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz"[0m
[36;1mbash scripts/ci/with-deadline.sh 120 2 -- curl -sSfL -o "$RUNNER_TEMP/$tarball" \[0m
[36;1m  "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/$tarball"[0m
[36;1mecho "$GITLEAKS_SHA256  $RUNNER_TEMP/$tarball" | sha256sum -c -[0m
[36;1mtar -xzf "$RUNNER_TEMP/$tarball" -C "$RUNNER_TEMP" gitleaks[0m
[36;1mif git rev-parse --verify --quiet origin/main >/dev/null; then[0m
[36;1m  range="origin/main..HEAD"[0m
[36;1melse[0m
[36;1m  range="HEAD"[0m
[36;1mfi[0m
[36;1mcommits="$(git rev-list --count "$range")"[0m
[36;1mecho "Secrets scan: $commits commits in $range"[0m
[36;1mset +e[0m
[36;1m"$RUNNER_TEMP/gitleaks" git --redact --no-banner --exit-code=2 \[0m
[36;1m  --log-opts="--diff-merges=first-parent $range" . > "$RUNNER_TEMP/gitleaks.log" 2>&1[0m
[36;1mcode=$?[0m
[36;1mset -e[0m
[36;1mgrep -E 'commits scanned|leaks found|no leaks found' "$RUNNER_TEMP/gitleaks.log" | sed -E 's/^.*(INF|WRN|ERR) //'[0m
[36;1mif [ "$code" -ne 0 ]; then echo "::error::secrets scan exit $code"; exit "$code"; fi[0m
shell: /usr/bin/bash -e {0}
env:
  GITLEAKS_VERSION: 8.24.3
  GITLEAKS_SHA256: 9991e0b2903da4c8f6122b5c3186448b927a5da4deef1fe45271c3793f4ee29c
##[endgroup]
curl: (22) The requested URL returned error: 504
##[warning]curl -sSfL -o /home/runner/work/_temp/gitleaks_8.24.3_linux_x64.tar.gz https://github.com/gitleaks/gitleaks/releases/download/v8.24.3/gitleaks_8.24.3_linux_x64.tar.gz failed with exit 22 on try 1 of 2; trying again
curl: (22) The requested URL returned error: 504
##[error]curl -sSfL -o /home/runner/work/_temp/gitleaks_8.24.3_linux_x64.tar.gz https://github.com/gitleaks/gitleaks/releases/download/v8.24.3/gitleaks_8.24.3_linux_x64.tar.gz failed with exit 22 on try 2 of 2
##[error]Process completed with exit code 22.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/b5bca228-a9a5-4a32-882a-65ec35d7b832' before making global git config changes
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
    353.1 / 354 KiB  /admin/listings_/$listingId
    413.4 / 414 KiB  /admin/listings_/$listingId_/edit
    273.7 / 276 KiB  /admin/locations
    337.3 / 341 KiB  /admin/monetisation
    330.8 / 333 KiB  /admin/places
    296.2 / 299 KiB  /admin/roles
    276.6 / 279 KiB  /admin/roles_/$roleId
    372.6 / 373 KiB  /admin/screening
    307.1 / 310 KiB  /admin/translations
    310.7 / 313 KiB  /admin/translations_/$lang
    296.0 / 299 KiB  /admin/users
    291.3 / 294 KiB  /admin/users_/$userId
    229.6 / 231 KiB  /auth
    216.1 / 217 KiB  /auth_/callback
    218.0 / 219 KiB  /auth_/reset
    233.5 / 235 KiB  /c/$slug
    233.5 / 236 KiB  /dev/primitives
    254.4 / 256 KiB  /dev/style
    212.3 / 215 KiB  /dev/tall
    263.7 / 265 KiB  /l/$slug
    216.7 / 219 KiB  /legal/$kind
    223.6 / 226 KiB  /legal/accept
    217.4 / 220 KiB  /legal/publishing
    321.8 / 322 KiB  /my-listings
    329.8 / 330 KiB  /my-listings_/$listingId
    408.0 / 409 KiB  /my-listings_/$listingId_/edit
    407.9 / 408 KiB  /post
    407.9 / 408 KiB  /post_/$listingId
    216.6 / 219 KiB  /privacy
    283.2 / 284 KiB  /settings
    216.6 / 219 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

NEAR band failed (DEC-296):
  /my-listings: 321.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 322 KiB — DEC-296: set it to ceilingFor(size) = 323
  /my-listings_/$listingId: 329.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 330 KiB — DEC-296: set it to ceilingFor(size) = 331
  /post: 407.9 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 408 KiB — DEC-296: set it to ceilingFor(size) = 409
  /post_/$listingId: 407.9 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 408 KiB — DEC-296: set it to ceilingFor(size) = 409
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/7469ffa8-a1f4-41e6-8bd8-f39ffe210848' before making global git config changes
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

## Build, typecheck, lint — failure

### Evidence lines

```text
[36;1m  *) echo "::error::promote-needs self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
##[error]Process completed with exit code 22.
```

### Tail (last 60 lines)

```text
##[group]Run bun scripts/doors/check-doors.ts
[36;1mbun scripts/doors/check-doors.ts[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
check-doors self-test OK: 7 finding kinds fired on their planted fixtures, the clean pair fired nothing
check-doors static OK: 265 manifest lines reconcile with the migrations' catalogue
##[group]Run SELF_TEST=1 bun scripts/check-outbound-calls.ts
[36;1mSELF_TEST=1 bun scripts/check-outbound-calls.ts[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
Outbound-calls self-test OK: the planted caller and both exposures refused
##[group]Run tarball="actionlint_${ACTIONLINT_VERSION}_linux_amd64.tar.gz"
[36;1mtarball="actionlint_${ACTIONLINT_VERSION}_linux_amd64.tar.gz"[0m
[36;1mcurl -sSfL --retry 5 --retry-delay 5 --retry-all-errors -o "$RUNNER_TEMP/$tarball" \[0m
[36;1m  "https://github.com/rhysd/actionlint/releases/download/v${ACTIONLINT_VERSION}/$tarball"[0m
[36;1mecho "$ACTIONLINT_SHA256  $RUNNER_TEMP/$tarball" | sha256sum -c -[0m
[36;1mtar -xzf "$RUNNER_TEMP/$tarball" -C "$RUNNER_TEMP" actionlint[0m
[36;1mlint() { "$RUNNER_TEMP/actionlint" -shellcheck= -pyflakes= "$@"; }[0m
[36;1mif out="$(lint scripts/fixtures/workflow-bad-step.yml 2>&1)"; then[0m
[36;1m  echo "::error::actionlint self-test: the bad fixture passed"; exit 1[0m
[36;1mfi[0m
[36;1mcase "$out" in[0m
[36;1m  *'also contains "with" key'*) echo "actionlint self-test OK: the bad fixture was refused" ;;[0m
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1mesac[0m
[36;1mlint .github/workflows/*.yml[0m
[36;1mecho "Workflow lint OK (actionlint ${ACTIONLINT_VERSION}; shell and Python checks off, DEC-141)"[0m
shell: /usr/bin/bash -e {0}
env:
  ACTIONLINT_VERSION: 1.7.7
  ACTIONLINT_SHA256: 023070a287cd8cccd71515fedc843f1985bf96c436b7effaecce67290e7e0757
##[endgroup]
curl: (22) The requested URL returned error: 504
curl: (22) The requested URL returned error: 504
curl: (22) The requested URL returned error: 504
curl: (22) The requested URL returned error: 504
curl: (22) The requested URL returned error: 504
curl: (22) The requested URL returned error: 504
##[error]Process completed with exit code 22.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/a4ffbca4-7474-47f5-9a73-ea4a9d2a9d7a' before making global git config changes
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
[e2e:preflight] missing migration file(s):
  - 20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql
  - 20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql
  - 20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql
  - 20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql
  - 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql
STAGING BEHIND: apply 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 25 of 28)
STAGING BEHIND: apply 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql
  - 20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql
  - 20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql
  - 20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql
  - 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql
STAGING BEHIND: apply 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 26 of 28)
STAGING BEHIND: apply 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql
  - 20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql
  - 20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql
  - 20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql
  - 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql
STAGING BEHIND: apply 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 27 of 28)
STAGING BEHIND: apply 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql
  - 20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql
  - 20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql
  - 20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql
  - 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql
STAGING BEHIND: apply 20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 28 of 28)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/dad7cfd2-00e2-4ec6-8be0-e9686423bf3e' before making global git config changes
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
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42570464470
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
Wrote docs/tracking/e2e-last-failure.md (19/19 source(s) with usable results, 6 context file(s) found).
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
Temporarily overriding HOME='/home/runner/work/_temp/849e2a1f-6e10-4836-bd3b-8506ee4f9120' before making global git config changes
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
