# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44863862231
- Commit: `accfbb44192dd86c49acb8b8802547b2c76332a0`
- Attempt: 1
- Written (UTC): 2026-11-21T04:03:04.787Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

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
Temporarily overriding HOME='/home/runner/work/_temp/9269ad17-35d6-40d6-b6f1-7d7becf1dffd' before making global git config changes
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

## Scope (docs-only push, DEC-365) — failure

### Evidence lines

```text
##[error]3 change(s) outside what a Lovable branch may change (DEC-394)
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 7ad2d0d Merge accfbb44192dd86c49acb8b8802547b2c76332a0 into 6e34d60d3f6dcb4450a9d0f0638231bb7752f5e6
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
7ad2d0d862da0fde39076010e76a4ea5a6dfc38e
##[group]Run set -o pipefail
[36;1mset -o pipefail[0m
[36;1mgh api --paginate "repos/${REPO}/pulls/${PR_NUMBER}/files" | bash scripts/ci/lovable-branch-guard.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GH_TOKEN: ***
  REPO: tesfayekb/ethio-marketplace
  PR_NUMBER: 86
  PR_BASE_SHA: 6e34d60d3f6dcb4450a9d0f0638231bb7752f5e6
  PR_HEAD_SHA: accfbb44192dd86c49acb8b8802547b2c76332a0
##[endgroup]
##[error]3 change(s) outside what a Lovable branch may change (DEC-394)
  package.json — modified: package.json — dependencies (DEC-386)
  src/integrations/supabase/previewAuthStorage.ts — modified: src/integrations/supabase/** — the platform's client (INC-1168, DEC-386)
  src/integrations/supabase/types.ts — modified: src/integrations/supabase/** — the platform's client (INC-1168, DEC-386)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/f33535f7-6c80-40b6-9a45-f730abf16da0' before making global git config changes
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
Evaluate and set job outputs
Cleaning up orphan processes

```

## Dependency vulnerability audit (enforcing on high/critical) — failure

### Evidence lines

```text
##[warning]bun install --frozen-lockfile failed with exit 1 on try 1 of 2; trying again
##[error]bun install --frozen-lockfile failed with exit 1 on try 2 of 2
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  token: ***
##[endgroup]
Cache hit for: bun-fR4r1tsFeXfPQkusQwkKD2kGnsE=
Received 33843767 of 33843767 (100.0%), 52.0 MBs/sec
Cache Size: ~32 MB (33843767 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/8eef1025-c79e-4496-a74a-d86d9494e971/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
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
Temporarily overriding HOME='/home/runner/work/_temp/993d59d4-0b34-4906-a085-0bffadff1c57' before making global git config changes
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
  token: ***
##[endgroup]
Cache hit for: bun-fR4r1tsFeXfPQkusQwkKD2kGnsE=
Received 33843767 of 33843767 (100.0%), 33.8 MBs/sec
Cache Size: ~32 MB (33843767 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/7dd8f88e-a773-416c-950f-732ee80bdd2b/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
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
Temporarily overriding HOME='/home/runner/work/_temp/c9c1bb63-e632-4918-8088-24c7d69f6ac3' before making global git config changes
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
Temporarily overriding HOME='/home/runner/work/_temp/e331b754-859a-4bc3-9d2e-1b5c08be9813' before making global git config changes
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
##[endgroup]
Cache hit for: bun-fR4r1tsFeXfPQkusQwkKD2kGnsE=
Received 0 of 33843767 (0.0%), 0.0 MBs/sec
Received 33843767 of 33843767 (100.0%), 18.8 MBs/sec
Cache Size: ~32 MB (33843767 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/f0bd2dbc-4e3e-4e8b-a26a-cfa73fd04c6f/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
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
Temporarily overriding HOME='/home/runner/work/_temp/6d727b1d-6ed1-4892-aebd-d34c60d4724b' before making global git config changes
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
  DOCS_ONLY: 
  LANES_LINE: 
  EVIDENCE_REF: lovable/reset-words
##[endgroup]
lanes=failure
##[error]E2E: 19 lane(s) died in infrastructure before any test (install-dependencies) — re-run the failed jobs
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/978844a7-e25a-45a6-bbe4-ed398f72bb81' before making global git config changes
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
