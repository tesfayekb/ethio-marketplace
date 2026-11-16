# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43861627088  **PLATFORM-ORIGIN?**
- Commit: `52fa7d58c5bdc9ceb1a935aa10e89d78a7482df6`
- Attempt: 1
- Written (UTC): 2026-11-16T12:08:25.179Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Scope (docs-only push, DEC-365) — failure

### Evidence lines

```text
##[error]1 change(s) outside what a Lovable branch may change (DEC-394)
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +13d0ed4c7e888bd64e550a05281ab1c11be4191a:refs/remotes/pull/55/merge
From https://github.com/tesfayekb/ethio-marketplace
 * [new ref]         13d0ed4c7e888bd64e550a05281ab1c11be4191a -> pull/55/merge
##[endgroup]
##[group]Determining the checkout info
##[endgroup]
[command]/usr/bin/git sparse-checkout disable
[command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
##[group]Checking out the ref
[command]/usr/bin/git checkout --progress --force refs/remotes/pull/55/merge
Note: switching to 'refs/remotes/pull/55/merge'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 13d0ed4 Merge 52fa7d58c5bdc9ceb1a935aa10e89d78a7482df6 into 84e5f45fb1cf085b95fbdf8aa54fee2e61e7c6b9
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
13d0ed4c7e888bd64e550a05281ab1c11be4191a
##[group]Run set -o pipefail
[36;1mset -o pipefail[0m
[36;1mgh api --paginate "repos/${REPO}/pulls/${PR_NUMBER}/files" | bash scripts/ci/lovable-branch-guard.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GH_TOKEN: ***
  REPO: tesfayekb/ethio-marketplace
  PR_NUMBER: 55
##[endgroup]
##[error]1 change(s) outside what a Lovable branch may change (DEC-394)
  scripts/route-budgets.mjs — the API carries no patch for it (a binary or a very large diff), so DEC-390's exception cannot be read
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/ac6240a4-53eb-4362-9fbc-6a5746112f7f' before making global git config changes
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
