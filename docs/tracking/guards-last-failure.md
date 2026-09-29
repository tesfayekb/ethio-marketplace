# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36533275066
- Commit: `425039fa9ff3bc4d47d350fe9edad6df3863acab`
- Attempt: 1
- Written (UTC): 2026-09-29T07:08:20.910Z

## Build, typecheck, lint — failure

### Evidence lines

```text
##[error]Unexplained deletions in aad99c57457db58684638639c4ac8e5c2e4bdb20..HEAD (INC-076).
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
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
425039fa9ff3bc4d47d350fe9edad6df3863acab
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
425039fa9ff3bc4d47d350fe9edad6df3863acab
##[group]Run SELF_TEST=1 bash scripts/check-deletions.sh
[36;1mSELF_TEST=1 bash scripts/check-deletions.sh[0m
[36;1mbash scripts/check-deletions.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GITHUB_EVENT_BEFORE: aad99c57457db58684638639c4ac8e5c2e4bdb20
##[endgroup]
Self-test OK: undeclared deletion flagged, marker-declared allowed, additions allowed; manifest door (INC-192): an ADDED path line declares, a pre-existing line does not.
##[error]Unexplained deletions in aad99c57457db58684638639c4ac8e5c2e4bdb20..HEAD (INC-076).
The following files were deleted with no [intentional-delete] marker in any commit
message and no path line added to docs/tracking/intentional-deletions.txt by this range:
e2e/admin-attributes.spec.ts
e2e/post-wizard.spec.ts
If the removal is intended, say so in the commit message or add the path to
docs/tracking/intentional-deletions.txt in the same push; otherwise you are pushing from a stale
checkout and are about to erase someone's work.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/a0b0fdf5-2a20-4528-a84c-453c4ce5503b' before making global git config changes
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
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message, quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36533275066
  E2E_HEAD_COMMIT_MESSAGE: Fixed CI-2 and CI-3 timing

X-Lovable-Edit-ID: edt-2edf20c7-d120-4536-b5b8-1532a6bbe172
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
Wrote docs/tracking/e2e-last-failure.md (8/8 source(s) with usable results, 0 context file(s) found).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md.
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md.
From https://github.com/tesfayekb/ethio-marketplace
 * branch            dev        -> FETCH_HEAD
HEAD is now at 425039f Fixed CI-2 and CI-3 timing
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md.
[dev b79be05] ci: e2e failure report + flake ledger [skip ci]
 2 files changed, 241 insertions(+), 53 deletions(-)
To https://github.com/tesfayekb/ethio-marketplace
   425039f..b79be05  HEAD -> dev
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
Temporarily overriding HOME='/home/runner/work/_temp/46333cb6-47e0-44fc-9539-307758894501' before making global git config changes
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
