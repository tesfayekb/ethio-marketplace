# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39712610532
- Commit: `b313b06d98ac0706cda5ecf026f8a4cfeaac0511`
- Attempt: 2
- Written (UTC): 2026-10-22T03:26:48.909Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Promote to main (fast-forward on green) — failure

### Evidence lines

```text
##[error]MAIN DIVERGED — fast-forward impossible; manual reconcile per DEC-020 (ff-only law, never merge/rebase here); run the sync-main dispatch after confirming main's extra commits are tracking-only
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
 * [new branch]        lovable-sync            -> origin/lovable-sync
 * [new branch]        lovable-sync-1788322342 -> origin/lovable-sync-1788322342
 * [new branch]        lovable-sync-1788764600 -> origin/lovable-sync-1788764600
 * [new branch]        lovable-sync-1789741128 -> origin/lovable-sync-1789741128
 * [new branch]        lovable-sync-1790153551 -> origin/lovable-sync-1790153551
 * [new branch]        lovable-sync-1790668701 -> origin/lovable-sync-1790668701
 * [new branch]        lovable-sync-1790806349 -> origin/lovable-sync-1790806349
 * [new branch]        lovable-sync-1790807903 -> origin/lovable-sync-1790807903
 * [new branch]        lovable-sync-1790881191 -> origin/lovable-sync-1790881191
 * [new branch]        lovable-sync-1790889145 -> origin/lovable-sync-1790889145
 * [new branch]        main                    -> origin/main
[command]/usr/bin/git branch --list --remote origin/dev
  origin/dev
[command]/usr/bin/git rev-parse refs/remotes/origin/dev
c4fdffcc3a73443f11f76378ece74c3f7d585539
[command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules origin +b313b06d98ac0706cda5ecf026f8a4cfeaac0511:refs/remotes/origin/dev
From https://github.com/tesfayekb/ethio-marketplace
 + c4fdffcc...b313b06d b313b06d98ac0706cda5ecf026f8a4cfeaac0511 -> origin/dev  (forced update)
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
b313b06d98ac0706cda5ecf026f8a4cfeaac0511
##[group]Run git config user.name "github-actions[bot]"
[36;1mgit config user.name "github-actions[bot]"[0m
[36;1mgit config user.email "41898282+github-actions[bot]@users.noreply.github.com"[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
##[group]Run git fetch origin main
[36;1mgit fetch origin main[0m
[36;1mgit merge-base --is-ancestor origin/main HEAD || { echo "::error::MAIN DIVERGED — fast-forward impossible; manual reconcile per DEC-020 (ff-only law, never merge/rebase here); run the sync-main dispatch after confirming main's extra commits are tracking-only"; exit 1; }[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
From https://github.com/tesfayekb/ethio-marketplace
 * branch              main       -> FETCH_HEAD
##[error]MAIN DIVERGED — fast-forward impossible; manual reconcile per DEC-020 (ff-only law, never merge/rebase here); run the sync-main dispatch after confirming main's extra commits are tracking-only
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/06d342c1-603f-4a78-928d-865abecd90f6' before making global git config changes
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
