# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42021898732
- Commit: `4b9bb7bb7a3e554dca4755dd99d22f600e554867`
- Attempt: 1
- Written (UTC): 2026-11-05T12:08:00.491Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Build, typecheck, lint — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
##[endgroup]
##[group]Determining the checkout info
##[endgroup]
[command]/usr/bin/git sparse-checkout disable
[command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
##[group]Checking out the ref
[command]/usr/bin/git checkout --progress --force refs/remotes/pull/23/merge
Note: switching to 'refs/remotes/pull/23/merge'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 87485deb2 Merge 4b9bb7bb7a3e554dca4755dd99d22f600e554867 into c89271ca29a83e76e5f18dfccfdd0284289ad8a9
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
87485deb217b1e62fd1f6559201a4c6ffaba1946
##[group]Run SELF_TEST=1 bash scripts/check-deletions.sh
[36;1mSELF_TEST=1 bash scripts/check-deletions.sh[0m
[36;1mbash scripts/check-deletions.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GITHUB_EVENT_BEFORE: 3d80d4b57dbb1ecc731f37241afbd3bbce265c3e
##[endgroup]
Self-test OK: undeclared deletion flagged, marker-declared allowed, additions allowed; manifest door (INC-192): an ADDED path line declares, a pre-existing line does not.
No files deleted in 3d80d4b57dbb1ecc731f37241afbd3bbce265c3e..HEAD.
##[group]Run SELF_TEST=1 bash scripts/check-shell-pipes.sh
[36;1mSELF_TEST=1 bash scripts/check-shell-pipes.sh[0m
[36;1mbash scripts/check-shell-pipes.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
scripts/db-proof.sh:114:has_data() { docker volume ls -q --filter "name=$CONTAINER" | grep -qx "$CONTAINER"; }
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/bfdf6e68-92a0-4b04-a1b6-9c115b64f5ae' before making global git config changes
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
