# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40815397630
- Commit: `f1b4b404a2fe397b493458a391bb446e07b33c10`
- Attempt: 1
- Written (UTC): 2026-10-29T04:24:23.664Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Build, typecheck, lint — failure

### Evidence lines

```text
##[error]Unexplained deletions in 5f2c53965d91bc49644449706498b34771b558bb..HEAD (INC-076).
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
 * [new branch]          lovable-backup-dev-1788419378 -> origin/lovable-backup-dev-1788419378
 * [new branch]          lovable-sync            -> origin/lovable-sync
 * [new branch]          lovable-sync-1788322342 -> origin/lovable-sync-1788322342
 * [new branch]          lovable-sync-1788764600 -> origin/lovable-sync-1788764600
 * [new branch]          lovable-sync-1789741128 -> origin/lovable-sync-1789741128
 * [new branch]          lovable-sync-1790153551 -> origin/lovable-sync-1790153551
 * [new branch]          lovable-sync-1790668701 -> origin/lovable-sync-1790668701
 * [new branch]          lovable-sync-1790806349 -> origin/lovable-sync-1790806349
 * [new branch]          lovable-sync-1790807903 -> origin/lovable-sync-1790807903
 * [new branch]          lovable-sync-1790881191 -> origin/lovable-sync-1790881191
 * [new branch]          lovable-sync-1790889145 -> origin/lovable-sync-1790889145
 * [new branch]          main                    -> origin/main
[command]/usr/bin/git branch --list --remote origin/dev
  origin/dev
[command]/usr/bin/git rev-parse refs/remotes/origin/dev
f1b4b404a2fe397b493458a391bb446e07b33c10
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
f1b4b404a2fe397b493458a391bb446e07b33c10
##[group]Run SELF_TEST=1 bash scripts/check-deletions.sh
[36;1mSELF_TEST=1 bash scripts/check-deletions.sh[0m
[36;1mbash scripts/check-deletions.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GITHUB_EVENT_BEFORE: 5f2c53965d91bc49644449706498b34771b558bb
##[endgroup]
Self-test OK: undeclared deletion flagged, marker-declared allowed, additions allowed; manifest door (INC-192): an ADDED path line declares, a pre-existing line does not.
##[error]Unexplained deletions in 5f2c53965d91bc49644449706498b34771b558bb..HEAD (INC-076).
The following files were deleted with no [intentional-delete] marker in any commit
message and no path line added to docs/tracking/intentional-deletions.txt by this range:
docs/tracking/local-backend-proof.md
If the removal is intended, say so in the commit message or add the path to
docs/tracking/intentional-deletions.txt in the same push; otherwise you are pushing from a stale
checkout and are about to erase someone's work.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/d356c053-a0c2-4820-8110-41f8e2c4b0b4' before making global git config changes
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
