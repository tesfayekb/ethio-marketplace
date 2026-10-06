# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37421084564
- Commit: `d74a1b7ab9daa35248e41c3e64e221cc500e2fa7`
- Attempt: 1
- Written (UTC): 2026-10-06T06:23:23.777Z

## Build, typecheck, lint — failure

### Evidence lines

```text
##[error]promote.needs does not name job 'lint' (scripts/fixtures/ci-promote-needs-bad.yml; DEC-137)
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
Self-test OK: undeclared deletion flagged, marker-declared allowed, additions allowed; manifest door (INC-192): an ADDED path line declares, a pre-existing line does not.
No files deleted in e2e431908c82be565996df51658d0a309dd3bef9..HEAD.
##[group]Run if bash scripts/check-promote-needs.sh scripts/fixtures/ci-promote-needs-bad.yml; then
[36;1mif bash scripts/check-promote-needs.sh scripts/fixtures/ci-promote-needs-bad.yml; then[0m
[36;1m  echo "::error::promote-needs self-test: the bad fixture passed"; exit 1[0m
[36;1mfi[0m
[36;1mbash scripts/check-promote-needs.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
##[error]promote.needs does not name job 'lint' (scripts/fixtures/ci-promote-needs-bad.yml; DEC-137)
Promote-needs guard OK (20 jobs; signal-only: e2e-changed)
##[group]Run tarball="actionlint_${ACTIONLINT_VERSION}_linux_amd64.tar.gz"
[36;1mtarball="actionlint_${ACTIONLINT_VERSION}_linux_amd64.tar.gz"[0m
[36;1mcurl -sSfL -o "$RUNNER_TEMP/$tarball" \[0m
[36;1m  "https://github.com/rhysd/actionlint/releases/download/v${ACTIONLINT_VERSION}/$tarball"[0m
[36;1mecho "$ACTIONLINT_SHA256  $RUNNER_TEMP/$tarball" | sha256sum -c -[0m
[36;1mtar -xzf "$RUNNER_TEMP/$tarball" -C "$RUNNER_TEMP" actionlint[0m
[36;1mif "$RUNNER_TEMP/actionlint" scripts/fixtures/workflow-bad-step.yml; then[0m
[36;1m  echo "::error::actionlint self-test: the bad fixture passed"; exit 1[0m
[36;1mfi[0m
[36;1m"$RUNNER_TEMP/actionlint" .github/workflows/*.yml[0m
shell: /usr/bin/bash -e {0}
env:
  ACTIONLINT_VERSION: 1.7.7
  ACTIONLINT_SHA256: 023070a287cd8cccd71515fedc843f1985bf96c436b7effaecce67290e7e0757
##[endgroup]
/home/runner/work/_temp/actionlint_1.7.7_linux_amd64.tar.gz: OK
scripts/fixtures/workflow-bad-step.yml:11:9: this step is for running shell command since it contains at least one of "run", "shell" keys, but also contains "with" key which is used for running action [syntax-check]
   |
11 |         with:
   |         ^~~~~
.github/workflows/ci.yml:89:9: shellcheck reported issue in this script: SC2038:warning:3:3: Use -print0/-0 or -exec + to allow for non-alphanumeric filenames [shellcheck]
   |
89 |         run: |
   |         ^~~~
.github/workflows/ci.yml:89:9: shellcheck reported issue in this script: SC2038:warning:5:3: Use -print0/-0 or -exec + to allow for non-alphanumeric filenames [shellcheck]
   |
89 |         run: |
   |         ^~~~
.github/workflows/ci.yml:580:9: shellcheck reported issue in this script: SC2086:info:10:15: Double quote to prevent globbing and word splitting [shellcheck]
    |
580 |         run: |
    |         ^~~~
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/5796e16d-c796-4059-8f13-37b16d1338f4' before making global git config changes
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
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message, quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[36;1m  exit "$reporter"[0m
[36;1mfi[0m
[36;1mexit 0[0m
shell: /usr/bin/bash -e {0}
env:
  E2E_RESULTS_DIR: shard-results
  E2E_LOGS_DIR: shard-logs
  E2E_CONTEXT_DIR: shard-contexts
  E2E_EXPECTED_SOURCES: smoke,email,1,2,3,4,5,6,changed?
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37421084564
  E2E_HEAD_COMMIT_MESSAGE: Wired Next names in wizard.tsx

X-Lovable-Edit-ID: edt-08735a5a-94b8-4ad8-bc09-f4299817e591
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
Wrote docs/tracking/e2e-last-failure.md (9/9 source(s) with usable results, 5 context file(s) found).
Flake ledger: appended 2 line(s) to docs/tracking/flake-ledger.md.
Flake ledger: appended 2 line(s) to docs/tracking/flake-ledger.md.
Flake ledger: appended 2 line(s) to docs/tracking/flake-ledger.md.
publish-evidence: published docs/tracking/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
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
Temporarily overriding HOME='/home/runner/work/_temp/b11c002f-e220-425c-8ea1-32f9141824d1' before making global git config changes
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
