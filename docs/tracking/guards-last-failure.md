# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41163450560
- Commit: `3d94bd6b610f8401f9ccbf30bd442e117ceb0862`
- Attempt: 1
- Written (UTC): 2026-10-31T03:33:00.279Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
NEAR band failed (DEC-296):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    285.2 / 286 KiB  /admin/legal_/edit
    356.8 / 358 KiB  /admin/listings
    381.7 / 383 KiB  /admin/listings_/$listingId
    403.9 / 405 KiB  /admin/listings_/$listingId_/edit

NEAR band failed (DEC-296):
  /account: 269.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 270 KiB — DEC-296: set it to ceilingFor(size) = 271
  /admin/attributes: 350.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 351 KiB — DEC-296: set it to ceilingFor(size) = 352
  /admin/categories: 358.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 359 KiB — DEC-296: set it to ceilingFor(size) = 360
  /admin/places: 341.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 342 KiB — DEC-296: set it to ceilingFor(size) = 343
  /dev/style: 244.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 245 KiB — DEC-296: set it to ceilingFor(size) = 246
  /l/$slug: 252.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 253 KiB — DEC-296: set it to ceilingFor(size) = 254
  /legal/$kind: 213.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 214 KiB — DEC-296: set it to ceilingFor(size) = 215
  /privacy: 213.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 214 KiB — DEC-296: set it to ceilingFor(size) = 215
  /terms: 213.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 214 KiB — DEC-296: set it to ceilingFor(size) = 215
    271.7 / 272 KiB  /admin/locations
    341.8 / 342 KiB  /admin/places
    308.2 / 309 KiB  /admin/roles
    309.8 / 311 KiB  /admin/roles_/$roleId
    382.1 / 383 KiB  /admin/screening
    414.2 / 415 KiB  /admin/translations
    323.5 / 324 KiB  /admin/translations_/$lang
    307.2 / 308 KiB  /admin/users
    287.6 / 288 KiB  /admin/users_/$userId
    221.7 / 222 KiB  /auth
    210.0 / 211 KiB  /auth_/callback
    212.1 / 213 KiB  /auth_/reset
    223.2 / 224 KiB  /c/$slug
    224.9 / 226 KiB  /dev/primitives
    244.8 / 245 KiB  /dev/style
    209.4 / 210 KiB  /dev/tall
    252.7 / 253 KiB  /l/$slug
    213.7 / 214 KiB  /legal/$kind
    220.6 / 221 KiB  /legal/accept
    214.5 / 215 KiB  /legal/publishing
    330.3 / 331 KiB  /my-listings
    319.5 / 320 KiB  /my-listings_/$listingId
    398.4 / 399 KiB  /my-listings_/$listingId_/edit
    398.4 / 399 KiB  /post
    398.4 / 399 KiB  /post_/$listingId
    213.7 / 214 KiB  /privacy
    273.4 / 274 KiB  /settings
    213.7 / 214 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/1e1e699f-bcb2-4e38-af5b-b47bfaf3a047' before making global git config changes
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
[36;1mfi[0m
[36;1mif [ "$reporter" -ne 0 ]; then[0m
[36;1m  echo "::error::E2E failure reporter crashed (exit ${reporter}) — see docs/tracking/e2e-last-failure.md"[0m
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
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41163450560
  E2E_HEAD_COMMIT_MESSAGE: Fixed lint, added S2b, fixed tabs

X-Lovable-Edit-ID: edt-aea56006-a883-409e-9d26-3c0113f5a66f
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
Wrote docs/tracking/e2e-last-failure.md (19/19 source(s) with usable results, 4 context file(s) found).
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
Temporarily overriding HOME='/home/runner/work/_temp/775ce9ea-7287-4391-8288-80ade5582f84' before making global git config changes
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
