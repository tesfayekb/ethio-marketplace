# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41073847634
- Commit: `22f5151f51869d236638547c5643c66e37d692e3`
- Attempt: 1
- Written (UTC): 2026-10-30T15:01:54.384Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Build, typecheck, lint — failure

### Evidence lines

```text
[36;1m  *) echo "::error::promote-needs self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/shell-bands.test.ts
   82:22  error  Replace `·file:·file.name,·line:·1,·what:·"a·second·source·of·the·band·row's·height·(D258)"` with `⏎········file:·file.name,⏎········line:·1,⏎········what:·"a·second·source·of·the·band·row's·height·(D258)",⏎·····`                  prettier/prettier
   92:22  error  Replace `·file:·file.name,·line:·1,·what:·"a·second·source·of·the·bar's·spacing·(D256)"` with `⏎········file:·file.name,⏎········line:·1,⏎········what:·"a·second·source·of·the·bar's·spacing·(D256)",⏎·····`                          prettier/prettier
  105:24  error  Replace `·file:·file.name,·line:·base·+·index,·what:·"a·negative·margin·in·the·top·bar·(D256)"` with `⏎··········file:·file.name,⏎··········line:·base·+·index,⏎··········what:·"a·negative·margin·in·the·top·bar·(D256)",⏎·······`    prettier/prettier
  133:8   error  Replace `·name:·"src/components/planted.tsx",·text:·'export·const·BAND_ROW·=·"h-10·min-h-10·max-h-10";'` with `⏎········name:·"src/components/planted.tsx",⏎········text:·'export·const·BAND_ROW·=·"h-10·min-h-10·max-h-10";',⏎·····`  prettier/prettier
✖ 48 problems (4 errors, 44 warnings)
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/admin-locations/location-form-fields.tsx
  36:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  49:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/admin/admin-context.tsx
  32:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/field.tsx
  108:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  133:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  272:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  281:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  312:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/map/map-preview.tsx
  44:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/preview/listing-detail.tsx
  151:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components                                                                                                                                react-refresh/only-export-components
  336:3   warning  React Hook useEffect contains a call to 'setContactHighlight'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [view.contact.focusOnReturn, view.contact.viewer] as a second argument to the useEffect Hook  react-hooks/exhaustive-deps

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/step-pricing.tsx
  84:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/step-specifications.tsx
  1941:14  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/features/posting/step-who.tsx
  127:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/i18n/provider.tsx
   81:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  791:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  805:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/home/runner/work/ethio-marketplace/ethio-marketplace/src/providers/theme-provider.tsx
  27:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

✖ 48 problems (4 errors, 44 warnings)
  4 errors and 1 warning potentially fixable with the `--fix` option.

error: script "lint" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/d9e8638f-d9c1-4e9f-817e-c7b59b332c3b' before making global git config changes
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
Per-page budget failed (D234):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    307.1 / 307 KiB  /admin/roles

Per-page budget failed (D234):
  /: 222.0 KiB, over its ceiling of 222 KiB
  /account_/legal_/$versionId: 211.2 KiB, over its ceiling of 211 KiB
  /admin/impersonation_/$sessionId: 310.1 KiB, over its ceiling of 310 KiB
  /admin/legal: 279.1 KiB, over its ceiling of 279 KiB
  /admin/legal_/edit: 284.0 KiB, over its ceiling of 284 KiB
  /admin/roles: 307.1 KiB, over its ceiling of 307 KiB
  /admin/users: 306.1 KiB, over its ceiling of 306 KiB
  /c/$slug: 222.0 KiB, over its ceiling of 222 KiB
  /dev/tall: 208.2 KiB, over its ceiling of 208 KiB
  /post: 397.3 KiB, over its ceiling of 397 KiB
  /post_/$listingId: 397.2 KiB, over its ceiling of 397 KiB
  /settings: 272.2 KiB, over its ceiling of 272 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
    308.7 / 309 KiB  /admin/roles_/$roleId
    381.0 / 381 KiB  /admin/screening
    413.1 / 414 KiB  /admin/translations
    322.4 / 323 KiB  /admin/translations_/$lang
    306.1 / 306 KiB  /admin/users
    286.5 / 287 KiB  /admin/users_/$userId
    220.5 / 221 KiB  /auth
    208.9 / 209 KiB  /auth_/callback
    211.0 / 211 KiB  /auth_/reset
    222.0 / 222 KiB  /c/$slug
    223.8 / 224 KiB  /dev/primitives
    242.9 / 243 KiB  /dev/style
    208.2 / 208 KiB  /dev/tall
    251.6 / 252 KiB  /l/$slug
    212.6 / 213 KiB  /legal/$kind
    219.5 / 220 KiB  /legal/accept
    213.3 / 214 KiB  /legal/publishing
    329.2 / 330 KiB  /my-listings
    318.4 / 319 KiB  /my-listings_/$listingId
    397.3 / 398 KiB  /my-listings_/$listingId_/edit
    397.3 / 397 KiB  /post
    397.2 / 397 KiB  /post_/$listingId
    212.6 / 213 KiB  /privacy
    272.2 / 272 KiB  /settings
    212.6 / 213 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/b8dbe1c8-e233-4bd4-a080-aa0e9c73bebf' before making global git config changes
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
  E2E_RUN_URL: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41073847634
  E2E_HEAD_COMMIT_MESSAGE: Verified R1d-c changes

X-Lovable-Edit-ID: edt-11b364f0-110a-4034-b045-2255f0541d19
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
Wrote docs/tracking/e2e-last-failure.md (19/19 source(s) with usable results, 2 context file(s) found).
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
Temporarily overriding HOME='/home/runner/work/_temp/97a27a43-a39b-4e0e-bde5-afa9951d4624' before making global git config changes
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
