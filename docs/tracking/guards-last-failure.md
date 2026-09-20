# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35498102136
- Commit: `a1d91ef735df1f93604e1eb6e18923f5c530904f`
- Attempt: 2
- Written (UTC): 2026-09-20T08:17:44.445Z

## Gitleaks secrets scan — failure

### Evidence lines

```text
(no matching lines)
```

### Tail (last 60 lines)

```text
Email:       159125892+gpt-engineer-app[bot]@users.noreply.github.com
Date:        2026-09-20T07:52:19Z
Fingerprint: a082ce8756bdf6d828f1ff7ba2fb04a6cfb5899a:supabase/migrations/20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql:generic-api-key:815
Link:        https://github.com/tesfayekb/ethio-marketplace/blob/a082ce8756bdf6d828f1ff7ba2fb04a6cfb5899a/supabase/migrations/20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql#L815

Finding:     'attribute_key', '[1;3;mREDACTED[0m'
Secret:      [1;3;mREDACTED[0m
RuleID:      generic-api-key
Entropy:     3.681881
File:        supabase/migrations/20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql
Line:        828
Commit:      a082ce8756bdf6d828f1ff7ba2fb04a6cfb5899a
Author:      gpt-engineer-app[bot]
Email:       159125892+gpt-engineer-app[bot]@users.noreply.github.com
Date:        2026-09-20T07:52:19Z
Fingerprint: a082ce8756bdf6d828f1ff7ba2fb04a6cfb5899a:supabase/migrations/20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql:generic-api-key:828
Link:        https://github.com/tesfayekb/ethio-marketplace/blob/a082ce8756bdf6d828f1ff7ba2fb04a6cfb5899a/supabase/migrations/20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql#L828

Finding:     WHERE x.value->>'attribute_key' = '[1;3;mREDACTED[0m'
Secret:      [1;3;mREDACTED[0m
RuleID:      generic-api-key
Entropy:     3.681881
File:        supabase/migrations/20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql
Line:        848
Commit:      a082ce8756bdf6d828f1ff7ba2fb04a6cfb5899a
Author:      gpt-engineer-app[bot]
Email:       159125892+gpt-engineer-app[bot]@users.noreply.github.com
Date:        2026-09-20T07:52:19Z
Fingerprint: a082ce8756bdf6d828f1ff7ba2fb04a6cfb5899a:supabase/migrations/20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql:generic-api-key:848
Link:        https://github.com/tesfayekb/ethio-marketplace/blob/a082ce8756bdf6d828f1ff7ba2fb04a6cfb5899a/supabase/migrations/20260920075213_f01ed897-05cf-475c-aa33-49b8e849e23b.sql#L848

[90m8:00AM[0m [32mINF[0m [1m3 commits scanned.[0m
[90m8:00AM[0m DBG Note: this number might be smaller than expected due to commits with no additions
[90m8:00AM[0m [32mINF[0m [1mscanned ~109992 bytes (109.99 KB) in 117ms[0m
[90m8:00AM[0m [33mWRN[0m [1mleaks found: 11[0m
Artifact name is valid!
Root directory input is valid!
Beginning upload of artifact content to blob storage
Uploaded bytes 7473
Finished uploading artifact content to blob storage!
SHA256 digest of uploaded artifact zip is 70ebfa7e920b1ac06525c79b37d90334e31907c7dcbefdc6b5378c5640ddcb06
Finalizing artifact upload
Artifact gitleaks-results.sarif.zip successfully finalized. Artifact ID 10601088779
##[warning]🛑 Leaks detected, see job summary for details
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/b61dd2a0-0092-4a1b-a3be-6c2d2df88a81' before making global git config changes
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
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35498102136
  E2E_HEAD_COMMIT_MESSAGE: Changes

Co-authored-by: tesfayekb <tesfayekb@me.com>
##[endgroup]
  layout OK — per-artifact subdir: 1 context file(s), report rendered.
  layout OK — merged flat: 1 context file(s), report rendered.
  layout OK — zero artifacts: 0 context file(s), report rendered.
  layout OK — missing directory: 0 context file(s), report rendered.
Self-test OK: DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival and the REPORTER ERROR path verified (real captured fixtures).
Wrote docs/tracking/e2e-last-failure.md (8/8 source(s) with usable results, 3 context file(s) found).
Flake ledger: appended 3 line(s) to docs/tracking/flake-ledger.md.
Flake ledger: appended 3 line(s) to docs/tracking/flake-ledger.md.
From https://github.com/tesfayekb/ethio-marketplace
 * branch            dev        -> FETCH_HEAD
   a1d91ef..69e229e  dev        -> origin/dev
HEAD is now at 69e229e ci: update CI status report [skip ci]
Flake ledger: appended 3 line(s) to docs/tracking/flake-ledger.md.
[dev 55c7576] ci: e2e failure report + flake ledger [skip ci]
 2 files changed, 43 insertions(+), 117 deletions(-)
To https://github.com/tesfayekb/ethio-marketplace
   69e229e..55c7576  HEAD -> dev
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
Temporarily overriding HOME='/home/runner/work/_temp/a10a8242-08e1-4644-9f30-8b70db0f3eb7' before making global git config changes
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
