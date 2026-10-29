# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40878793849
- Commit: `a7c3639c5a5adf8654190df53872f3cc3630525b`
- Attempt: 1
- Written (UTC): 2026-10-29T13:24:06.819Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
dist/server/_ssr/app-rail-CEoduwn9.mjs                           57.40 kB │ gzip:  16.99 kB
dist/server/_ssr/server-DCkvNgtz.mjs                             59.33 kB │ gzip:  15.46 kB
dist/server/_ssr/category-dialogs-CbS-gXjW.mjs                   60.30 kB │ gzip:  14.04 kB
dist/server/_libs/@radix-ui/react-dropdown-menu+[...].mjs        62.30 kB │ gzip:  12.29 kB
dist/server/_ssr/admin.screening-Rf4RDAjQ.mjs                    63.30 kB │ gzip:  14.55 kB
dist/server/index.mjs                                            67.67 kB │ gzip:  15.36 kB
dist/server/_ssr/admin.categories-BmNJCHTq.mjs                   73.80 kB │ gzip:  17.55 kB
dist/server/_libs/tanstack__query-core.mjs                       74.06 kB │ gzip:  15.48 kB
dist/server/_libs/supabase__realtime-js+unenv.mjs                79.24 kB │ gzip:  20.28 kB
dist/server/_ssr/admin.translations_._lang-adE2BjuS.mjs          82.53 kB │ gzip:  18.77 kB
dist/server/_ssr/listing-detail-Dk1tod4t.mjs                     85.21 kB │ gzip:  21.83 kB
dist/server/_libs/tailwind-merge.mjs                             85.65 kB │ gzip:  15.21 kB
dist/server/_ssr/attribute-dialogs-D5ZBhuJe.mjs                  87.59 kB │ gzip:  19.87 kB
dist/server/_libs/@radix-ui/react-alert-dialog+[...].mjs         87.72 kB │ gzip:  20.51 kB
dist/server/_libs/date-fns.mjs                                  104.02 kB │ gzip:  18.42 kB
dist/server/_libs/supabase__postgrest-js.mjs                    105.44 kB │ gzip:  21.67 kB
dist/server/_ssr/provider-BJ3TLuuq.mjs                          105.75 kB │ gzip:  32.72 kB
dist/server/_libs/lucide-react.mjs                              117.13 kB │ gzip:  22.88 kB
dist/server/_ssr/en-admin-DFZgjivY.mjs                          117.50 kB │ gzip:  26.78 kB
dist/server/_libs/@supabase/storage-js+[...].mjs                119.52 kB │ gzip:  22.35 kB
dist/server/_libs/react-day-picker.mjs                          135.36 kB │ gzip:  26.50 kB
dist/server/_ssr/am-admin-B1Hvg14M.mjs                          154.39 kB │ gzip:  32.97 kB
dist/server/_libs/zod.mjs                                       182.57 kB │ gzip:  40.37 kB
dist/server/_libs/leaflet.mjs                                   242.42 kB │ gzip:  54.53 kB
dist/server/_libs/supabase__auth-js.mjs                         312.24 kB │ gzip:  62.80 kB
dist/server/_libs/libphonenumber-js.mjs                         317.38 kB │ gzip:  62.73 kB
dist/server/_ssr/router-CRB0Psof.mjs                            426.02 kB │ gzip: 122.40 kB
dist/server/_ssr/wizard-DkS0OzVr.mjs                            495.60 kB │ gzip: 125.23 kB
dist/server/_libs/@tanstack/react-router+[...].mjs              756.01 kB │ gzip: 160.41 kB

[32m✓ built in 750ms[39m
[info] [nitro] Using auto generated worker name: `tesfayekb-ethio-marketplace`
[info] Generated [36mdist/server/wrangler.json[39m
[info] Generated [36m.wrangler/deploy/config.json[39m
[info] Generated [36mdist/client/_headers[39m
[info] Generated [36mdist/nitro.json[39m
[success] [nitro] You can preview this build using `npx vite preview`
[success] [nitro] You can deploy this build using `npx nitro deploy --prebuilt`
##[group]Run node scripts/check-bundle-size.mjs
[36;1mnode scripts/check-bundle-size.mjs[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
Bundle budget: reader-failure-Cnr5tLrW.js must stay lazy (INC-864) but sits in the first-paint closure of index-xG-jSjVh.js.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/f7746a0a-c9f0-4265-8d36-fe4c090bdff2' before making global git config changes
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

## Hardcoded string scan (enforcing) — failure

### Evidence lines

```text
 ENFORCING: hardcoded string scan — findings FAIL the run
FAIL: user-visible strings must use i18n keys (law D1).
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
Initialized empty Git repository in /home/runner/work/ethio-marketplace/ethio-marketplace/.git/
[command]/usr/bin/git remote add origin https://github.com/tesfayekb/ethio-marketplace
##[endgroup]
##[group]Disabling automatic garbage collection
[command]/usr/bin/git config --local gc.auto 0
##[endgroup]
##[group]Setting up auth
[command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
[command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
[command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
[command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
##[endgroup]
##[group]Fetching the repository
[command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +a7c3639c5a5adf8654190df53872f3cc3630525b:refs/remotes/origin/dev
From https://github.com/tesfayekb/ethio-marketplace
 * [new ref]         a7c3639c5a5adf8654190df53872f3cc3630525b -> origin/dev
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
a7c3639c5a5adf8654190df53872f3cc3630525b
##[group]Run bash scripts/check-hardcoded-strings.sh
[36;1mbash scripts/check-hardcoded-strings.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
================================================================
 ENFORCING: hardcoded string scan — findings FAIL the run
================================================================
self-test: bad fixture findings=1 (expect >=1), good fixture findings=0 (expect 0)
src/features/admin-screening/name-checks.test.tsx:45:  of: "<b>Coca-Cola</b>",
src/features/admin-screening/name-checks.test.tsx:77:    expect(lines).toContain("admin.screening.names.of".replace("{of}", "<b>Coca-Cola</b>"));
findings: 2
FAIL: user-visible strings must use i18n keys (law D1).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/fcb35bdf-87ce-49ad-836d-b4ea5f74bd8d' before making global git config changes
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
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
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
  E2E_EXPECTED_SOURCES: smoke,email,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,repeat?
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40878793849
  E2E_HEAD_COMMIT_MESSAGE: Fixed CF-LANG-1 guard failure

X-Lovable-Edit-ID: edt-4be43b2a-456a-4ad6-9eae-c2436e316b87
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
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), DEC-028 verdict split (quarantined excluded, ordinary red still gating), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
Wrote docs/tracking/e2e-last-failure.md (19/19 source(s) with usable results, 8 context file(s) found).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
Flake ledger: appended 0 line(s) to docs/tracking/flake-ledger.md; 1 already there for this run (INC-495).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
publish-evidence: published docs/tracking/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "lanes=failure"
[36;1mecho "lanes=failure"[0m
[36;1mif [ "failure" != "success" ]; then[0m
[36;1m  echo "::error::E2E failed — see docs/tracking/e2e-last-failure.md"[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "Every temporary-backend lane passed (the email lane included)."[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
lanes=failure
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/b910d073-7fd6-4716-bc6c-f2d3927375b3' before making global git config changes
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
