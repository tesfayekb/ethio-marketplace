# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43735396286
- Commit: `13379a0ccedcdb278a2fb8dbb1b1a11ea47f78c2`
- Attempt: 1
- Written (UTC): 2026-11-15T16:42:20.004Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Hardcoded string scan (enforcing) — failure

### Evidence lines

```text
 ENFORCING: hardcoded string scan — findings FAIL the run
FAIL finding: src/features/admin/import-dialog.test.tsx:48:      title="Import"
FAIL: user-visible strings must use i18n keys (law D1).
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
##[group]Fetching the repository
[command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +c2a1161896e691543ef69f8f7a66d3834834a294:refs/remotes/pull/47/merge
From https://github.com/tesfayekb/ethio-marketplace
 * [new ref]         c2a1161896e691543ef69f8f7a66d3834834a294 -> pull/47/merge
##[endgroup]
##[group]Determining the checkout info
##[endgroup]
[command]/usr/bin/git sparse-checkout disable
[command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
##[group]Checking out the ref
[command]/usr/bin/git checkout --progress --force refs/remotes/pull/47/merge
Note: switching to 'refs/remotes/pull/47/merge'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at c2a1161 Merge 13379a0ccedcdb278a2fb8dbb1b1a11ea47f78c2 into ece9eae77491d6ed641e3a7f956b1ae96347bbb4
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
c2a1161896e691543ef69f8f7a66d3834834a294
##[group]Run bash scripts/check-hardcoded-strings.sh
[36;1mbash scripts/check-hardcoded-strings.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
================================================================
 ENFORCING: hardcoded string scan — findings FAIL the run
================================================================
self-test: bad fixture findings=1 (expect >=1), good fixture findings=0 (expect 0)
FAIL finding: src/features/admin/import-dialog.test.tsx:48:      title="Import"
findings: 1
FAIL: user-visible strings must use i18n keys (law D1).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/4719c218-734d-4301-a94b-0cc05d8957db' before making global git config changes
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
