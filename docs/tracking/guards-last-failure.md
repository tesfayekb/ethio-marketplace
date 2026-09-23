# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35856634856
- Commit: `ecc9a36878cb322be3ccf49a5952c92dd3c9e0b3`
- Attempt: 1
- Written (UTC): 2026-09-23T12:01:17.375Z

## Build, typecheck, lint — failure

### Evidence lines

```text
##[error]Unexplained deletions in 50c7ee1610783a5c31e19fd5f6f61963afde384c..HEAD (INC-076).
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
##[endgroup]
##[group]Fetching the repository
[command]/usr/bin/git -c protocol.version=2 fetch --prune --no-recurse-submodules origin +refs/heads/*:refs/remotes/origin/* +refs/tags/*:refs/tags/*
From https://github.com/tesfayekb/ethio-marketplace
 * [new branch]        dev                     -> origin/dev
 * [new branch]        lovable-backup-dev-1788419378 -> origin/lovable-backup-dev-1788419378
 * [new branch]        lovable-sync            -> origin/lovable-sync
 * [new branch]        lovable-sync-1788322342 -> origin/lovable-sync-1788322342
 * [new branch]        lovable-sync-1788764600 -> origin/lovable-sync-1788764600
 * [new branch]        lovable-sync-1789741128 -> origin/lovable-sync-1789741128
 * [new branch]        lovable-sync-1790153551 -> origin/lovable-sync-1790153551
 * [new branch]        main                    -> origin/main
[command]/usr/bin/git branch --list --remote origin/dev
  origin/dev
[command]/usr/bin/git rev-parse refs/remotes/origin/dev
ecc9a36878cb322be3ccf49a5952c92dd3c9e0b3
##[endgroup]
##[group]Determining the checkout info
##[endgroup]
[command]/usr/bin/git sparse-checkout disable
[command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
##[group]Checking out the ref
[command]/usr/bin/git checkout --progress --force -B dev refs/remotes/origin/dev
Switched to a new branch 'dev'
branch 'dev' set up to track 'origin/dev'.
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
ecc9a36878cb322be3ccf49a5952c92dd3c9e0b3
##[group]Run SELF_TEST=1 bash scripts/check-deletions.sh
[36;1mSELF_TEST=1 bash scripts/check-deletions.sh[0m
[36;1mbash scripts/check-deletions.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GITHUB_EVENT_BEFORE: 50c7ee1610783a5c31e19fd5f6f61963afde384c
##[endgroup]
Self-test OK: undeclared deletion flagged, marker-declared allowed, additions allowed; manifest door (INC-192): an ADDED path line declares, a pre-existing line does not.
##[error]Unexplained deletions in 50c7ee1610783a5c31e19fd5f6f61963afde384c..HEAD (INC-076).
The following files were deleted with no [intentional-delete] marker in any commit
message and no path line added to docs/tracking/intentional-deletions.txt by this range:
roadmap.md
If the removal is intended, say so in the commit message or add the path to
docs/tracking/intentional-deletions.txt in the same push; otherwise you are pushing from a stale
checkout and are about to erase someone's work.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/9425317f-2bfe-41a1-947b-19d4c1e2cb28' before making global git config changes
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
[36;1mfi[0m
[36;1mexit 0[0m
shell: /usr/bin/bash -e {0}
env:
  E2E_RESULTS_DIR: shard-results
  E2E_LOGS_DIR: shard-logs
  E2E_CONTEXT_DIR: shard-contexts
  E2E_EXPECTED_SOURCES: smoke,email,1,2,3,4,5,6,changed?
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35856634856
  E2E_HEAD_COMMIT_MESSAGE: Fixed PW-50 data drift

X-Lovable-Edit-ID: edt-05920625-a0b0-4288-8d18-ed8a20e1aea0
Co-authored-by: tesfayekb <tesfayekb@me.com>
##[endgroup]
  layout OK — per-artifact subdir: 1 context file(s), report rendered.
  layout OK — merged flat: 1 context file(s), report rendered.
  layout OK — zero artifacts: 0 context file(s), report rendered.
  layout OK — missing directory: 0 context file(s), report rendered.
Self-test OK: DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).
context download: 0 context files found.
  glob: shard-contexts/**/error-context.md
  searched: shard-contexts (unreadable or absent)
Wrote docs/tracking/e2e-last-failure.md (7/9 source(s) with usable results, 0 context file(s) found).
From https://github.com/tesfayekb/ethio-marketplace
 * branch            dev        -> FETCH_HEAD
   ecc9a36..ad565a3  dev        -> origin/dev
HEAD is now at ad565a3 Re-declared roadmap.md deletion
[dev 3ef673b] ci: e2e failure report + flake ledger [skip ci]
 1 file changed, 22 insertions(+), 130 deletions(-)
To https://github.com/tesfayekb/ethio-marketplace
   ad565a3..3ef673b  HEAD -> dev
##[group]Run echo "smoke=success email=success shards=cancelled"
[36;1mecho "smoke=success email=success shards=cancelled"[0m
[36;1mif [ "success" != "success" ] || [ "cancelled" != "success" ] || [ "success" != "success" ]; then[0m
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "All E2E shards and the smoke tier passed."[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
smoke=success email=success shards=cancelled
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/9d84abf0-6e2e-40d6-9de9-026865a98ad7' before making global git config changes
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
