# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37448727855
- Commit: `d766520fed8d1d5c22e11a3b8ee729b021d6a91a`
- Attempt: 1
- Written (UTC): 2026-10-06T10:39:40.920Z

## Build, typecheck, lint — failure

### Evidence lines

```text
[36;1m  *) echo "::error::promote-needs self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
##[error]Process completed with exit code 22.
```

### Tail (last 60 lines)

```text
[36;1mSELF_TEST=1 bash scripts/check-deletions.sh[0m
[36;1mbash scripts/check-deletions.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GITHUB_EVENT_BEFORE: 0f5d2f82017d8f584f5c1f929c880e80949b7c2b
##[endgroup]
Self-test OK: undeclared deletion flagged, marker-declared allowed, additions allowed; manifest door (INC-192): an ADDED path line declares, a pre-existing line does not.
No files deleted in 0f5d2f82017d8f584f5c1f929c880e80949b7c2b..HEAD.
##[group]Run if out="$(bash scripts/check-promote-needs.sh scripts/fixtures/ci-promote-needs-bad.yml 2>&1)"; then
[36;1mif out="$(bash scripts/check-promote-needs.sh scripts/fixtures/ci-promote-needs-bad.yml 2>&1)"; then[0m
[36;1m  echo "::error::promote-needs self-test: the bad fixture passed"; exit 1[0m
[36;1mfi[0m
[36;1mcase "$out" in[0m
[36;1m  *"does not name job 'lint'"*) echo "promote-needs self-test OK: the bad fixture was refused" ;;[0m
[36;1m  *) echo "::error::promote-needs self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1mesac[0m
[36;1mbash scripts/check-promote-needs.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
promote-needs self-test OK: the bad fixture was refused
Promote-needs guard OK (20 jobs; signal-only: e2e-changed)
##[group]Run tarball="actionlint_${ACTIONLINT_VERSION}_linux_amd64.tar.gz"
[36;1mtarball="actionlint_${ACTIONLINT_VERSION}_linux_amd64.tar.gz"[0m
[36;1mcurl -sSfL -o "$RUNNER_TEMP/$tarball" \[0m
[36;1m  "https://github.com/rhysd/actionlint/releases/download/v${ACTIONLINT_VERSION}/$tarball"[0m
[36;1mecho "$ACTIONLINT_SHA256  $RUNNER_TEMP/$tarball" | sha256sum -c -[0m
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
curl: (22) The requested URL returned error: 500
##[error]Process completed with exit code 22.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/0fea2857-a36d-4ab0-b4dd-9a439f4a1566' before making global git config changes
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
