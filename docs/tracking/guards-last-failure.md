# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40063139450
- Commit: `34c0fa5a4f64a0b0e4f58605269cd5b0af30038c`
- Attempt: 1
- Written (UTC): 2026-10-24T04:59:26.064Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Dependency vulnerability audit (enforcing on high/critical) — failure

### Evidence lines

```text
##[error]High or critical vulnerabilities reported by 'bun audit'.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+ pngjs@7.0.0
+ qrcode-generator@2.0.4
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

543 packages installed [5.04s]
##[group]Run bash scripts/audit-gate.sh
[36;1mbash scripts/audit-gate.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.03ms] ".env"
[0m[1mbun audit [0m[2mv1.3.14 (0d9b296a)[0m
zod  <4.6.6
  (direct dependency)
  @tanstack/router-plugin › @tanstack/router-generator › zod
  @tanstack/react-start › @tanstack/start-plugin-core › @tanstack/router-generator › zod
  high: Zod can exhaust memory while validating oversized constrained collections - https://github.com/advisories/GHSA-mrhx-c7xc-m3w5

undici  >=8.0.0 <8.12.2
  jsdom › undici
  high: undici vulnerable to Denial of Service via unhandled error on excessive content-encodings - https://github.com/advisories/GHSA-xjj6-f33q-929c

2 vulnerabilities (2 high)

To update all dependencies to the latest compatible versions:
  bun update

To update all dependencies to the latest versions (including breaking changes):
  bun update --latest

##[error]High or critical vulnerabilities reported by 'bun audit'.
Review docs/features/dependency-audit.md, then remediate or record a ruling.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/80a11304-9d46-4ce3-bae0-f7e17fc0ff3e' before making global git config changes
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

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
       2.4 KiB  dist/client/assets/dist-YtJwCAQJ.js
       2.3 KiB  dist/client/assets/useSelector-Dl1uomi4.js
       1.7 KiB  dist/client/assets/useMutation-Vjzo8Nv2.js
       1.6 KiB  dist/client/assets/dist-DYw4uv7F.js
       1.5 KiB  dist/client/assets/lazyRouteComponent-5Sx92n0r.js
       1.4 KiB  dist/client/assets/category-tree-BBLk8_DS.js
       1.3 KiB  dist/client/assets/react-dom-DR_LbxJG.js
       1.1 KiB  dist/client/assets/mfa-service-Bms3ePxN.js

First-paint budget exceeded. Either code-split the addition behind a dynamic import,
or raise the ceiling in scripts/check-bundle-size.mjs in a commit that states why.
       1.0 KiB  dist/client/assets/legal-reader-eR6H1y1d.js
       1.0 KiB  dist/client/assets/dist-DrSBnlwU.js
       0.8 KiB  dist/client/assets/use-legal-gate-CFGhgNrd.js
       0.8 KiB  dist/client/assets/post-prefill-dfGn6zft.js
       0.7 KiB  dist/client/assets/createLucideIcon-BsMeATGv.js
       0.6 KiB  dist/client/assets/legal-kinds-BFxPaQAq.js
       0.5 KiB  dist/client/assets/reader-failure-Cnr5tLrW.js
       0.5 KiB  dist/client/assets/visible-when-DE7p_70p.js
       0.5 KiB  dist/client/assets/cut-text-D0LtYeF5.js
       0.4 KiB  dist/client/assets/rolldown-runtime-QTnfLwEv.js
       0.4 KiB  dist/client/assets/error-text-URNEoF6b.js
       0.4 KiB  dist/client/assets/useMatch-B5ZNUzEn.js
       0.4 KiB  dist/client/assets/dist-BRxzimgZ2.js
       0.3 KiB  dist/client/assets/package-BDSxYVC-.js
       0.2 KiB  dist/client/assets/shield-check-N--Z-1xf.js
       0.2 KiB  dist/client/assets/map-pin-Ci9J_Lp2.js
       0.2 KiB  dist/client/assets/heart-D3fTVRoM.js
       0.2 KiB  dist/client/assets/useNavigate-qTs2HIr2.js
       0.2 KiB  dist/client/assets/format-locale-C2bnaryd.js
       0.2 KiB  dist/client/assets/useRouterState-Cea3xWwZ.js
       0.2 KiB  dist/client/assets/useSearch-DgB0e1ZZ.js
       0.2 KiB  dist/client/assets/ellipsis-Wf-Pjs9W.js
       0.2 KiB  dist/client/assets/useRouter-CNWE4PNO.js
       0.1 KiB  dist/client/assets/chevron-right-B6kFZruf.js
       0.1 KiB  dist/client/assets/check-DHuU2kT4.js
       0.1 KiB  dist/client/assets/not-found-i5RsCZif.js
       0.1 KiB  dist/client/assets/own-key-Dmr7B1jV.js
       0.1 KiB  dist/client/assets/refresh-after-write-BCMPRWUC.js
       0.1 KiB  dist/client/assets/query-keys-DQ_pMCo4.js
       0.1 KiB  dist/client/assets/root-DLTE-HSj.js
JS: 305.7 KiB / 305 KiB — OVER BUDGET
CSS: 20.5 KiB / 40 KiB — ok
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/c9bf2b47-c299-42db-889e-33a7b235cf22' before making global git config changes
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
  E2E_EXPECTED_SOURCES: smoke,email,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
  E2E_GREEN: 0
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40063139450
  E2E_HEAD_COMMIT_MESSAGE: Fixed LGC-1 row-count assertion

X-Lovable-Edit-ID: edt-b63bf0f8-717a-4267-8bc8-6fb513c00914
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
Wrote docs/tracking/e2e-last-failure.md (18/18 source(s) with usable results, 4 context file(s) found).
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
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/2ccfdc67-888c-40d6-aca4-d0589d8cdb42' before making global git config changes
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
