# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45494230491
- Commit: `7958b605bd545828167bb41ac9f7ea517f417773`
- Attempt: 1
- Written (UTC): 2026-11-24T22:47:20.082Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
Per-page budget failed (D234):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    411.2 / 412 KiB  /admin/listings_/$listingId_/edit
    274.3 / 271 KiB  /admin/locations
    313.9 / 315 KiB  /admin/monetisation
    312.3 / 313 KiB  /admin/places
    294.7 / 296 KiB  /admin/roles
    275.1 / 276 KiB  /admin/roles_/$roleId
    349.7 / 350 KiB  /admin/screening
    309.2 / 310 KiB  /admin/translations
    310.8 / 312 KiB  /admin/translations_/$lang
    294.3 / 293 KiB  /admin/users
    291.7 / 293 KiB  /admin/users_/$userId
    220.1 / 221 KiB  /auth
    203.4 / 206 KiB  /auth_/callback
    213.3 / 214 KiB  /auth_/reset
    223.6 / 224 KiB  /c/$slug
    227.9 / 229 KiB  /dev/primitives
    263.1 / 264 KiB  /dev/style
    202.4 / 203 KiB  /dev/tall
    249.0 / 250 KiB  /l/$slug
    206.8 / 208 KiB  /legal/$kind
    214.4 / 215 KiB  /legal/accept
    207.9 / 209 KiB  /legal/publishing
    310.4 / 311 KiB  /my-listings
    320.6 / 321 KiB  /my-listings_/$listingId
    402.7 / 404 KiB  /my-listings_/$listingId_/edit
    402.7 / 404 KiB  /post
    402.7 / 404 KiB  /post_/$listingId
    206.8 / 208 KiB  /privacy
    277.9 / 279 KiB  /settings
    206.8 / 208 KiB  /terms

Tier flag: card pages only (CF-TIER-3) — ok
Per-page budget failed (D234):
  /admin: 265.2 KiB, over its ceiling of 208 KiB
  /admin/: 266.0 KiB, over its ceiling of 208 KiB
  /admin/audit: 295.3 KiB, over its ceiling of 293 KiB
  /admin/images: 265.9 KiB, over its ceiling of 208 KiB
  /admin/impersonation_/$sessionId: 293.4 KiB, over its ceiling of 236 KiB
  /admin/locations: 274.3 KiB, over its ceiling of 271 KiB
  /admin/users: 294.3 KiB, over its ceiling of 293 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/9746cb75-aeb1-47d8-9b8f-98989dda6d9c' before making global git config changes
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
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), INC-1175 STAGING-SINK label (the spliced capture's failure labelled, its sibling and the unspliced capture not), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
[36;1m      echo "::error::E2E: ${lanes} lane(s) died in infrastructure before any test (${steps}) — re-run the failed jobs"[0m
[36;1m      echo "::error::E2E failed — see ${evidence}"[0m
##[error]E2E failed — see docs/tracking/branches/cursor/bundle-6/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
DEC-078: flaky body rendered after the ledger; ledger line byte-identical; cap flip of 11 rendered 10 bodies + 1 "body omitted: cap".
DEC-078 part 2: green form carries passed → Flake ledger → Flaky bodies → the flipped first line; a clean green renders non-gating): 0 and no flake section.
ok — R1a census names the missing log
ok — R1a a11y never states zero with a gap
ok — R1b census: all N logs read
ok — R1b a11y: all N logs read
Self-test OK: DEC-087 timing census (real local capture: wall time, per-file sums, 15 slowest, coverage gap, both forms), DEC-083 server-error census and DEC-084 a11y line (real local capture: 54 lines counted uncapped, one off-allowlist message named with the tests that finished next (INC-398), quiet line, both forms), DEC-059 post-test band (real shard-6 capture: the [e2e:teardown] fetch-failed line and the trailing Error: block extracted and rendered under 'Post-test errors: shard 6', no test line leaked, no count changed, green form names its warning count), DEC-030 flake ledger (flaky leaves the failure list, is rendered and ledgered; a clean red renders no ledger), INC-1175 STAGING-SINK label (the spliced capture's failure labelled, its sibling and the unspliced capture not), attempt line (INC-100), failures, quoted error-context, missing-context branch, source labels, crash quoting, redaction, all three artifact layouts, describe-nested titlePath matching, the [ssr-error] and [client-error] tag-greps, the containment fallback (switcher slug + its refusal of a foreign directory), the zero-test wipeout case (real empty capture), malformed-results survival, the REPORTER ERROR path, Playwright's exact output-directory name (INC-429: two real captures, two names computed by Playwright 1.58.1) and the flake ledger's one line per test, source and run (INC-495) and the errors outside any test, from the results file and from the log's summary, on both forms (INC-589: a real capture whose two tests passed and whose run exited 1) verified (real captured fixtures).
Wrote docs/tracking/e2e-last-failure.md (20/20 source(s) with usable results, 41 context file(s) found).
Verdict class: TESTS (e2e-verdict-class.txt).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
Flake ledger: appended 0 line(s) to docs/tracking/flake-ledger.md; 1 already there for this run (INC-495).
Flake ledger: appended 1 line(s) to docs/tracking/flake-ledger.md; 0 already there for this run (INC-495).
publish-evidence: published docs/tracking/branches/cursor/bundle-6/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
##[group]Run echo "lanes=failure"
[36;1mecho "lanes=failure"[0m
[36;1mif [ "failure" = "skipped" ] && [ "$DOCS_ONLY" = "true" ]; then[0m
[36;1m  echo "Lanes: ${LANES_LINE}"[0m
[36;1m  exit 0[0m
[36;1mfi[0m
[36;1mif [ "failure" != "success" ]; then[0m
[36;1m  class=$(head -n 1 e2e-verdict-class.txt 2>/dev/null || echo TESTS)[0m
[36;1m  case "$class" in[0m
[36;1m    "INFRA "*)[0m
[36;1m      read -r _ lanes steps <<< "$class"[0m
[36;1m      echo "::error::E2E: ${lanes} lane(s) died in infrastructure before any test (${steps}) — re-run the failed jobs"[0m
[36;1m      ;;[0m
[36;1m    *)[0m
[36;1m      evidence=$(bash scripts/publish-evidence.sh --print-path "$EVIDENCE_REF" docs/tracking/e2e-last-failure.md) ||[0m
[36;1m        evidence="no evidence file (publish-evidence.sh refused the ref)"[0m
[36;1m      echo "::error::E2E failed — see ${evidence}"[0m
[36;1m      ;;[0m
[36;1m  esac[0m
[36;1m  exit 1[0m
[36;1mfi[0m
[36;1mecho "Every temporary-backend lane passed (the email lane included)."[0m
shell: /usr/bin/bash -e {0}
env:
  DOCS_ONLY: false
  LANES_LINE: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-17e1476d18bc… (0 read)
  EVIDENCE_REF: cursor/bundle-6
##[endgroup]
lanes=failure
##[error]E2E failed — see docs/tracking/branches/cursor/bundle-6/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/ded90761-382f-461d-8935-68a4448544e8' before making global git config changes
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
