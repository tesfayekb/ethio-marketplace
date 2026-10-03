# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37156441384
- Commit: `39f19b2bae30dd7991cb0aab6a564bf11482c966`
- Attempt: 1
- Written (UTC): 2026-10-03T21:52:50.819Z

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+ @tanstack/react-router@1.170.16
+ @tanstack/react-start@1.168.26
+ @tanstack/router-plugin@1.168.18
+ @types/pngjs@6.0.5
+ class-variance-authority@0.7.1
+ clsx@2.1.1
+ cmdk@1.1.1
+ date-fns@4.1.0
+ embla-carousel-react@8.6.0
+ input-otp@1.4.2
+ jpeg-js@0.4.4
+ leaflet@1.9.4
+ lucide-react@0.575.0
+ pngjs@7.0.0
+ react@19.2.5
+ react-day-picker@9.14.0
+ react-dom@19.2.5
+ react-hook-form@7.73.1
+ react-resizable-panels@4.10.0
+ recharts@2.15.4
+ sonner@2.0.7
+ tailwind-merge@3.5.0
+ tailwindcss@4.2.4
+ tw-animate-css@1.4.0
+ vaul@1.1.2
+ vite-tsconfig-paths@6.1.1
+ zod@3.25.76

519 packages installed [757.00ms]
##[group]Run bun scripts/e2e-migration-preflight.ts
[36;1mbun scripts/e2e-migration-preflight.ts[0m
shell: /usr/bin/bash -e {0}
env:
  E2E_SUPABASE_URL: https://jatpuhfdjfzctjipklmk.supabase.co
  E2E_SUPABASE_PUBLISHABLE_KEY: ***
  E2E_SUPABASE_SERVICE_ROLE_KEY: ***
##[endgroup]
STAGING BEHIND: apply 20261003215042_bb808e1a-2900-4781-941f-6143829efb93.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261003215007_b9aa66a4-fa1e-4ef5-910b-31bbfc65b211.sql
  - 20261003215042_bb808e1a-2900-4781-941f-6143829efb93.sql
STAGING BEHIND: apply 20261003215042_bb808e1a-2900-4781-941f-6143829efb93.sql to ethio-staging before E2E can pass
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/90c7b37d-c072-4ea7-813a-412acfc19883' before making global git config changes
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

## Migration linter (with self-test) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
[command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
##[endgroup]
##[group]Fetching the repository
[command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +39f19b2bae30dd7991cb0aab6a564bf11482c966:refs/remotes/origin/dev
From https://github.com/tesfayekb/ethio-marketplace
 * [new ref]         39f19b2bae30dd7991cb0aab6a564bf11482c966 -> origin/dev
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
39f19b2bae30dd7991cb0aab6a564bf11482c966
##[group]Run oven-sh/setup-bun@v2
with:
  bun-version: 1.3.14
  no-cache: false
  token: ***
##[endgroup]
Cache hit for: bun-fR4r1tsFeXfPQkusQwkKD2kGnsE=
Received 33843767 of 33843767 (100.0%), 60.4 MBs/sec
Cache Size: ~32 MB (33843767 B)
[command]/usr/bin/tar -xf /home/runner/work/_temp/51c6f9c9-e8ea-4329-b141-d21aadab7b11/cache.tzst -P -C /home/runner/work/ethio-marketplace/ethio-marketplace --use-compress-program unzstd
Cache restored successfully
[command]/home/runner/.bun/bin/bun --revision
1.3.14+0d9b296af
Using a cached version of Bun: 1.3.14+0d9b296af
##[group]Run SELF_TEST=1 bash scripts/check-migrations.sh
[36;1mSELF_TEST=1 bash scripts/check-migrations.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
Self-test OK: bad fixture correctly flagged.
Self-test OK: closer-cited exemption fails without the cited policy, passes with it.
Policies closed later (allowlisted): 20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql | closed by 37a1e9bc
Policies closed later (allowlisted): 20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql | closed by 37a1e9bc
Migration guard FAILED: 1 file(s) missing RLS/policy/grant:
  - supabase/migrations/20261003215007_b9aa66a4-fa1e-4ef5-910b-31bbfc65b211.sql (missing: CREATE POLICY)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/87d728c8-5245-4a69-972b-e94f4ce75bdf' before making global git config changes
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

## Build, typecheck, lint — failure

### Evidence lines

```text
##[error]Process completed with exit code 2.
```

### Tail (last 60 lines)

```text
+ @tanstack/react-router@1.170.16
+ @tanstack/react-start@1.168.26
+ @tanstack/router-plugin@1.168.18
+ @types/pngjs@6.0.5
+ class-variance-authority@0.7.1
+ clsx@2.1.1
+ cmdk@1.1.1
+ date-fns@4.1.0
+ embla-carousel-react@8.6.0
+ input-otp@1.4.2
+ jpeg-js@0.4.4
+ leaflet@1.9.4
+ lucide-react@0.575.0
+ pngjs@7.0.0
+ react@19.2.5
+ react-day-picker@9.14.0
+ react-dom@19.2.5
+ react-hook-form@7.73.1
+ react-resizable-panels@4.10.0
+ recharts@2.15.4
+ sonner@2.0.7
+ tailwind-merge@3.5.0
+ tailwindcss@4.2.4
+ tw-animate-css@1.4.0
+ vaul@1.1.2
+ vite-tsconfig-paths@6.1.1
+ zod@3.25.76

519 packages installed [2.97s]
##[group]Run bun run typecheck
[36;1mbun run typecheck[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ tsc --noEmit
##[group]Run bun run format:check
[36;1mbun run format:check[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ prettier --check "src/**" "e2e/**" "docs/**" "*.{json,js,ts,md}"
Checking formatting...
[[33mwarn[39m] docs/_changelog.md
[[31merror[39m] No parser could be inferred for file "/home/runner/work/ethio-marketplace/ethio-marketplace/docs/data/reserved-names-v3.csv".
Error occurred when checking code style in the above file.
##[error]Process completed with exit code 2.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/d5adc4fa-7b24-41db-9326-e56771cc480b' before making global git config changes
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

## Component tests — failure

### Evidence lines

```text
 [31m❯[39m src/test/pool-reset-map.test.ts [2m([22m[2m2 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[32m 20[2mms[22m[39m
[41m[1m FAIL [22m[49m src/test/pool-reset-map.test.ts[2m > [22mDEC-099 pool reset map[2m > [22mdeclares every user-id table as RESET or EXEMPT, never both
[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m32 passed[39m[22m[90m (33)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m217 passed[39m[22m[90m (218)[39m
##[error]AssertionError: expected [ 'rate_overrides' ] to deeply equal []
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text

[41m[1m FAIL [22m[49m src/test/pool-reset-map.test.ts[2m > [22mDEC-099 pool reset map[2m > [22mdeclares every user-id table as RESET or EXEMPT, never both
[31m[1mAssertionError[22m: expected [ 'rate_overrides' ] to deeply equal [][39m

[32m- Expected[39m
[31m+ Received[39m

[32m- [][39m
[31m+ [[39m
[31m+   "rate_overrides",[39m
[31m+ ][39m

[36m [2m❯[22m src/test/pool-reset-map.test.ts:[2m31:24[22m[39m
    [90m 29|[39m     const undeclared = tablesWithUserColumn().filter((t) => !reset.has…
    [90m 30|[39m     [35mconst[39m both [33m=[39m [[33m...[39mreset][33m.[39m[34mfilter[39m((t) [33m=>[39m exempt[33m.[39m[34mhas[39m(t))[33m;[39m
    [90m 31|[39m     [34mexpect[39m(undeclared)[33m.[39m[34mtoEqual[39m([])[33m;[39m
    [90m   |[39m                        [31m^[39m
    [90m 32|[39m     [34mexpect[39m(both)[33m.[39m[34mtoEqual[39m([])[33m;[39m
    [90m 33|[39m   })[33m;[39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m32 passed[39m[22m[90m (33)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m217 passed[39m[22m[90m (218)[39m
[2m   Start at [22m 21:52:18
[2m   Duration [22m 19.98s[2m (transform 1.53s, setup 7.55s, import 4.52s, tests 4.55s, environment 35.02s)[22m


##[error]AssertionError: expected [ 'rate_overrides' ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "rate_overrides",
+ ]

 ❯ src/test/pool-reset-map.test.ts:31:24


error: script "test:unit" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/31da2b99-90a4-44c5-9b10-7f91b61ca9e6' before making global git config changes
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
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37156441384
  E2E_HEAD_COMMIT_MESSAGE: Added Test Selector, Part 0 done

X-Lovable-Edit-ID: edt-bec23f63-2b06-4df0-838b-c479660a8ebb
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
context download: 0 context files found.
  glob: shard-contexts/**/error-context.md
  searched: shard-contexts (unreadable or absent)
Wrote docs/tracking/e2e-last-failure.md (0/8 source(s) with usable results, 0 context file(s) found).
publish-evidence: published docs/tracking/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "smoke=skipped email=skipped shards=skipped"
[36;1mecho "smoke=skipped email=skipped shards=skipped"[0m
[36;1mif [ "skipped" != "success" ] || [ "skipped" != "success" ] || [ "skipped" != "success" ]; then[0m
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "All E2E shards and the smoke tier passed."[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
smoke=skipped email=skipped shards=skipped
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/d4e000fc-d616-4317-b507-22a949fcf246' before making global git config changes
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
