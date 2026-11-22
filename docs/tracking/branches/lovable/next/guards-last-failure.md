# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45008717910
- Commit: `3ee0a1e0bfce3062ab0da1d9aa153305624d30da`
- Attempt: 1
- Written (UTC): 2026-11-22T09:44:38.503Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Dependency vulnerability audit (enforcing on high/critical) — failure

### Evidence lines

```text
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
HEAD is now at 4173e97 Merge 3ee0a1e0bfce3062ab0da1d9aa153305624d30da into 0156ca877bdfbcd5b7ad5dc520e63b14c75f8fb4
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
4173e9762dda2f7711605b5ba4b4dfe878df9e72
##[group]Run oven-sh/setup-bun@v2
with:
  bun-version: 1.3.14
  no-cache: false
  token: ***
##[endgroup]
Cache hit for: bun-fR4r1tsFeXfPQkusQwkKD2kGnsE=
Received 0 of 33843767 (0.0%), 0.0 MBs/sec
Received 33843767 of 33843767 (100.0%), 16.9 MBs/sec
Cache Size: ~32 MB (33843767 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/5e3378da-fd7a-4cdc-9070-c00fd3a9b633/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
Cache restored successfully
[command]/home/runner/.bun/bin/bun --revision
1.3.14+0d9b296af
Using a cached version of Bun: 1.3.14+0d9b296af
##[group]Run bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
[36;1mbash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.03ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [8]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
[0.02ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [0]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/acb32aed-9564-4ec1-92d9-9aca3a38f628' before making global git config changes
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

## Component tests — failure

### Evidence lines

```text
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text

HEAD is now at 4173e97 Merge 3ee0a1e0bfce3062ab0da1d9aa153305624d30da into 0156ca877bdfbcd5b7ad5dc520e63b14c75f8fb4
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
4173e9762dda2f7711605b5ba4b4dfe878df9e72
##[group]Run oven-sh/setup-bun@v2
with:
  bun-version: 1.3.14
  no-cache: false
  token: ***
##[endgroup]
Cache hit for: bun-fR4r1tsFeXfPQkusQwkKD2kGnsE=
Received 33843767 of 33843767 (100.0%), 144.7 MBs/sec
Cache Size: ~32 MB (33843767 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/1a0d14ca-b92b-44ea-bd95-5ae6d965bd64/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
Cache restored successfully
[command]/home/runner/.bun/bin/bun --revision
1.3.14+0d9b296af
Using a cached version of Bun: 1.3.14+0d9b296af
##[group]Run bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
[36;1mbash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.02ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [8]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
[0.02ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [0]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/4c08fac3-bd61-4b5c-8bb2-b4547aefc421' before making global git config changes
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
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
Received 67108864 of 128002975 (52.4%), 32.0 MBs/sec
Received 128002975 of 128002975 (100.0%), 48.4 MBs/sec
Cache Size: ~122 MB (128002975 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/07b58e56-19b5-405e-a74f-91d8adac50c2/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
Cache restored successfully
Cache restored from key: bun-Linux-f41ac6b387538405b8a131bee8da032cee5b032e9fb11c3bd241b1a5a5cf9fdc
##[group]Run echo "bun cache-hit=true"
[36;1mecho "bun cache-hit=true"[0m
shell: /usr/bin/bash -e {0}
env:
  E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
  E2E_SUPABASE_PUBLISHABLE_KEY: ***
  E2E_SUPABASE_SERVICE_ROLE_KEY: ***
##[endgroup]
bun cache-hit=true
##[group]Run bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
[36;1mbash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile[0m
shell: /usr/bin/bash -e {0}
env:
  E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
  E2E_SUPABASE_PUBLISHABLE_KEY: ***
  E2E_SUPABASE_SERVICE_ROLE_KEY: ***
##[endgroup]
[0.02ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [8]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
[0.02ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [0]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/468d0154-aee9-4966-8c2b-ee256bccc4e5' before making global git config changes
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
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
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
/home/runner/work/_temp/actionlint_1.7.7_linux_amd64.tar.gz: OK
actionlint self-test OK: the bad fixture was refused
Workflow lint OK (actionlint 1.7.7; shell and Python checks off, DEC-141)
##[group]Run bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
[36;1mbash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.02ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [8]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
[0.02ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [0]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/42856d07-098e-4bf0-b0a5-15bec5b720ad' before making global git config changes
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
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
HEAD is now at 4173e97 Merge 3ee0a1e0bfce3062ab0da1d9aa153305624d30da into 0156ca877bdfbcd5b7ad5dc520e63b14c75f8fb4
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
4173e9762dda2f7711605b5ba4b4dfe878df9e72
##[group]Run oven-sh/setup-bun@v2
with:
  bun-version: 1.3.14
  no-cache: false
  token: ***
##[endgroup]
Cache hit for: bun-fR4r1tsFeXfPQkusQwkKD2kGnsE=
Received 16777216 of 33843767 (49.6%), 16.0 MBs/sec
Received 33843767 of 33843767 (100.0%), 29.8 MBs/sec
Cache Size: ~32 MB (33843767 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/9b412218-b68c-42ea-8355-8197adaca351/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
Cache restored successfully
[command]/home/runner/.bun/bin/bun --revision
1.3.14+0d9b296af
Using a cached version of Bun: 1.3.14+0d9b296af
##[group]Run bash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile
[36;1mbash scripts/ci/with-deadline.sh 300 2 -- bun install --frozen-lockfile[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.03ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [8]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
[0.03ms] ".env"
bun install v1.3.14 (0d9b296a)
Resolving dependencies
Resolved, downloaded and extracted [0]
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/af814915-e1b9-411c-8704-0cdde8333c6a' before making global git config changes
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
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), INC-1175 STAGING-SINK label (the spliced capture's failure labelled, its sibling and the unspliced capture not), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
[36;1m      echo "::error::E2E: ${lanes} lane(s) died in infrastructure before any test (${steps}) — re-run the failed jobs"[0m
[36;1m      echo "::error::E2E failed — see ${evidence}"[0m
##[error]E2E: 19 lane(s) died in infrastructure before any test (install-dependencies) — re-run the failed jobs
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), INC-1175 STAGING-SINK label (the spliced capture's failure labelled, its sibling and the unspliced capture not), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
context download: 0 context files found.
  glob: shard-contexts/**/error-context.md
  searched: shard-contexts (unreadable or absent)
Wrote docs/tracking/e2e-last-failure.md (0/19 source(s) with usable results, 0 context file(s) found).
Verdict class: INFRA 19 install-dependencies (e2e-verdict-class.txt).
publish-evidence: published docs/tracking/branches/lovable/next/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "lanes=failure"
[36;1mecho "lanes=failure"[0m
[36;1mif [ "failure" = "skipped" ] && [ "$DOCS_ONLY" = "true" ]; then[0m
[36;1m  echo "Lanes: ${LANES_LINE}"[0m
[36;1m  exit 0[0m
[36;1mfi[0m
[36;1mif [ "failure" != "success" ]; then[0m
[36;1m  class=$(head -n 1 e2e-verdict-class.txt 2>/dev/null || echo TESTS)[0m
[36;1m  case "$class" in[0m
[36;1m    "INFRA "*)[0m
[36;1m      read -r _ lanes steps <<< "$class"[0m
[36;1m      echo "::error::E2E: ${lanes} lane(s) died in infrastructure before any test (${steps}) — re-run the failed jobs"[0m
[36;1m      ;;[0m
[36;1m    *)[0m
[36;1m      evidence=$(bash scripts/publish-evidence.sh --print-path "$EVIDENCE_REF" docs/tracking/e2e-last-failure.md) ||[0m
[36;1m        evidence="no evidence file (publish-evidence.sh refused the ref)"[0m
[36;1m      echo "::error::E2E failed — see ${evidence}"[0m
[36;1m      ;;[0m
[36;1m  esac[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "Every temporary-backend lane passed (the email lane included)."[0m
shell: /usr/bin/bash -e {0}
env:
  DOCS_ONLY: false
  LANES_LINE: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-c47f9e8dfbb0… (0 read)
  EVIDENCE_REF: lovable/next
##[endgroup]
lanes=failure
##[error]E2E: 19 lane(s) died in infrastructure before any test (install-dependencies) — re-run the failed jobs
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/a547cf59-380c-4adf-be32-15b2bdca7bdb' before making global git config changes
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
