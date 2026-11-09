# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42581039358
- Commit: `588690676bd6a01ba62af361b54ff27cd48384c2`
- Attempt: 1
- Written (UTC): 2026-11-09T08:05:43.139Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## i18n used-on map is fresh (U4i ②) — failure

### Evidence lines

```text
##[error]Error: Unexpected HTTP response: 504
```

### Tail (last 60 lines)

```text
##[group]Fetching the repository
[command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +4c86f89e5cbb66e0ed4c3576764cd4668810e930:refs/remotes/pull/30/merge
From https://github.com/tesfayekb/ethio-marketplace
 * [new ref]         4c86f89e5cbb66e0ed4c3576764cd4668810e930 -> pull/30/merge
##[endgroup]
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

HEAD is now at 4c86f89 Merge 588690676bd6a01ba62af361b54ff27cd48384c2 into f2d55846764b3847f9787388b013e6977f782c2e
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
4c86f89e5cbb66e0ed4c3576764cd4668810e930
##[group]Run oven-sh/setup-bun@v2
with:
  bun-version: latest
  no-cache: false
  token: ***
##[endgroup]
Downloading a new version of Bun: https://github.com/oven-sh/bun/releases/download/bun-v1.4.4/bun-linux-x64.zip
Unexpected HTTP response: 504
Waiting 19 seconds before trying again
Unexpected HTTP response: 504
Waiting 12 seconds before trying again
##[error]Error: Unexpected HTTP response: 504
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/cf2c0a56-f8c5-4020-8d2d-07843144aa18' before making global git config changes
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
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 4c86f89e5 Merge 588690676bd6a01ba62af361b54ff27cd48384c2 into f2d55846764b3847f9787388b013e6977f782c2e
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
4c86f89e5cbb66e0ed4c3576764cd4668810e930
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
Temporarily overriding HOME='/home/runner/work/_temp/cf40c19e-355a-45fa-bd83-7716c91d69b9' before making global git config changes
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
