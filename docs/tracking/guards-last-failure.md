# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36801729573
- Commit: `b960ae3c1ec4d994bfb3004b3ae4aab3dfaf2437`
- Attempt: 1
- Written (UTC): 2026-10-01T01:52:06.682Z

## Component tests — failure

### Evidence lines

```text
 [31m❯[39m src/features/posting/step-where.test.tsx [2m([22m[2m11 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 654[2mms[22m[39m
[41m[1m FAIL [22m[49m src/features/posting/step-where.test.tsx[2m > [22mStepWhere — the ad's places and the item tick (W6b-1)[2m > [22mputs each add button in its own box (R2)
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m22 passed[39m[22m[90m (23)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m132 passed[39m[22m[90m (133)[39m
##[error]AssertionError: expected <button type="button" …(3)></button> to be <button type="button" …(3)></button> // Object.is equality
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[2m  >[22m
[32m-   post.where.addCity[39m
[31m+   post.where.addRegion[39m
[2m  </button>[22m

[36m [2m❯[22m src/features/posting/step-where.test.tsx:[2m215:37[22m[39m
    [90m213|[39m     [35mconst[39m region [33m=[39m [34mregionBox[39m([32m"r1"[39m)[33m;[39m
    [90m214|[39m     [35mconst[39m addCity [33m=[39m [34mwithin[39m(region)[33m.[39m[34mgetByTestId[39m([32m"post-where-add-city"[39m)[33m;[39m
    [90m215|[39m     [34mexpect[39m(region[33m.[39mlastElementChild)[33m.[39m[34mtoBe[39m(addCity)[33m;[39m
    [90m   |[39m                                     [31m^[39m
    [90m216|[39m     const addRegion = within(primaryBox()).getByTestId("post-where-add…
    [90m217|[39m     [34mexpect[39m(region[33m.[39m[34mcontains[39m(addRegion))[33m.[39m[34mtoBe[39m([35mfalse[39m)[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m22 passed[39m[22m[90m (23)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m132 passed[39m[22m[90m (133)[39m
[2m   Start at [22m 01:34:32
[2m   Duration [22m 12.57s[2m (transform 1.23s, setup 4.27s, import 3.54s, tests 3.69s, environment 20.46s)[22m


##[error]AssertionError: expected <button type="button" …(3)></button> to be <button type="button" …(3)></button> // Object.is equality

- Expected
+ Received

  <button
    class="inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm font-medium text-foreground hover:bg-muted"
-   data-region="r1"
-   data-testid="post-where-add-city"
+   data-country="ET"
+   data-testid="post-where-add-region"
    type="button"
  >
-   post.where.addCity
+   post.where.addRegion
  </button>

 ❯ src/features/posting/step-where.test.tsx:215:37


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/2c147e17-5e07-42ae-9f88-ccd934292cef' before making global git config changes
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
shell: /usr/bin/bash -e {0}
env:
  E2E_RESULTS_DIR: shard-results
  E2E_LOGS_DIR: shard-logs
  E2E_CONTEXT_DIR: shard-contexts
  E2E_EXPECTED_SOURCES: smoke,email,1,2,3,4,5,6,changed?
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36801729573
  E2E_HEAD_COMMIT_MESSAGE: Restored PW-99 dev layout

X-Lovable-Edit-ID: edt-fc5352db-c743-4296-82ec-0a3a56f4d162
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
Wrote docs/tracking/e2e-last-failure.md (9/9 source(s) with usable results, 2 context file(s) found).
From https://github.com/tesfayekb/ethio-marketplace
 * branch            dev        -> FETCH_HEAD
HEAD is now at b960ae3 Restored PW-99 dev layout
[dev 31e147f] ci: e2e failure report + flake ledger [skip ci]
 1 file changed, 215 insertions(+), 68 deletions(-)
To https://github.com/tesfayekb/ethio-marketplace
   b960ae3..31e147f  HEAD -> dev
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
Temporarily overriding HOME='/home/runner/work/_temp/38667000-1b56-4fe2-8058-b12d68c6d47a' before making global git config changes
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
