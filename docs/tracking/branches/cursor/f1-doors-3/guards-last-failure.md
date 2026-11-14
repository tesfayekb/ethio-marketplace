# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43592099375
- Commit: `9c82af68702f96e3bb8823be78edc1109016d521`
- Attempt: 1
- Written (UTC): 2026-11-14T12:18:52.900Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  - 20261114114000_337ffc64-88cc-4dc7-91a4-bb8c9c004293.sql
  - 20261114114100_c2dc755f-2fd5-4da6-acd2-d9bd4ee5193d.sql
  - 20261114114200_0165890e-7570-4489-a6ca-c4799a469b3c.sql
  - 20261114114300_a0caf727-f58a-419d-9480-1ff877dc1e67.sql
  - 20261114114400_6eff6f7d-471f-4392-bb50-ae2dd53fa274.sql
  - 20261114114500_fedfce7d-18b0-409e-9ba2-d7f465ce3d2b.sql
  - 20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql
STAGING BEHIND: apply 20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 26 of 28)
STAGING BEHIND: apply 20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261114113500_1dd7586c-5155-4362-9ac6-c0dc51f5f822.sql
  - 20261114113600_c0e4a4ff-376e-4a62-ab9a-25d6f2a8a0fb.sql
  - 20261114113700_607adce0-991b-45c1-acef-22f458b534dc.sql
  - 20261114113800_d7031bb9-7f2e-4fbb-bf54-6f5e5870ba13.sql
  - 20261114113900_a501b0a5-9fcf-43c1-a389-d140de5bdf92.sql
  - 20261114114000_337ffc64-88cc-4dc7-91a4-bb8c9c004293.sql
  - 20261114114100_c2dc755f-2fd5-4da6-acd2-d9bd4ee5193d.sql
  - 20261114114200_0165890e-7570-4489-a6ca-c4799a469b3c.sql
  - 20261114114300_a0caf727-f58a-419d-9480-1ff877dc1e67.sql
  - 20261114114400_6eff6f7d-471f-4392-bb50-ae2dd53fa274.sql
  - 20261114114500_fedfce7d-18b0-409e-9ba2-d7f465ce3d2b.sql
  - 20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql
STAGING BEHIND: apply 20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 27 of 28)
STAGING BEHIND: apply 20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261114113500_1dd7586c-5155-4362-9ac6-c0dc51f5f822.sql
  - 20261114113600_c0e4a4ff-376e-4a62-ab9a-25d6f2a8a0fb.sql
  - 20261114113700_607adce0-991b-45c1-acef-22f458b534dc.sql
  - 20261114113800_d7031bb9-7f2e-4fbb-bf54-6f5e5870ba13.sql
  - 20261114113900_a501b0a5-9fcf-43c1-a389-d140de5bdf92.sql
  - 20261114114000_337ffc64-88cc-4dc7-91a4-bb8c9c004293.sql
  - 20261114114100_c2dc755f-2fd5-4da6-acd2-d9bd4ee5193d.sql
  - 20261114114200_0165890e-7570-4489-a6ca-c4799a469b3c.sql
  - 20261114114300_a0caf727-f58a-419d-9480-1ff877dc1e67.sql
  - 20261114114400_6eff6f7d-471f-4392-bb50-ae2dd53fa274.sql
  - 20261114114500_fedfce7d-18b0-409e-9ba2-d7f465ce3d2b.sql
  - 20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql
STAGING BEHIND: apply 20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 28 of 28)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/2cac0ca3-59b1-42f2-a210-a04795b64059' before making global git config changes
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
[36;1m      echo "::error::E2E: ${lanes} lane(s) died in infrastructure before any test (${steps}) — re-run the failed jobs"[0m
[36;1m      echo "::error::E2E failed — see ${evidence}"[0m
##[error]E2E failed — see docs/tracking/branches/cursor/f1-doors-3/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
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
Wrote docs/tracking/e2e-last-failure.md (19/19 source(s) with usable results, 24 context file(s) found).
Verdict class: TESTS (e2e-verdict-class.txt).
publish-evidence: published docs/tracking/branches/cursor/f1-doors-3/e2e-last-failure.md docs/tracking/flake-ledger.md to ci-evidence.
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
  LANES_LINE: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-5d4f49494191… (1 read)
  EVIDENCE_REF: cursor/f1-doors-3
##[endgroup]
lanes=failure
##[error]E2E failed — see docs/tracking/branches/cursor/f1-doors-3/e2e-last-failure.md
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/661eed14-cd5c-424f-a7d0-c634474b4fbb' before making global git config changes
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
