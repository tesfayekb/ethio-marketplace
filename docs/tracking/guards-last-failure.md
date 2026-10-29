# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40870507628
- Commit: `9b8a8cdcf1dfe03792079617f875804955e8338f`
- Attempt: 1
- Written (UTC): 2026-10-29T12:25:53.728Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

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
[command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +9b8a8cdcf1dfe03792079617f875804955e8338f:refs/remotes/origin/dev
From https://github.com/tesfayekb/ethio-marketplace
 * [new ref]         9b8a8cdcf1dfe03792079617f875804955e8338f -> origin/dev
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
9b8a8cdcf1dfe03792079617f875804955e8338f
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
Temporarily overriding HOME='/home/runner/work/_temp/3adff223-6610-4908-91b9-301c44df7ef5' before making global git config changes
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
    276.8 / 277 KiB  /admin/legal
    276.1 / 277 KiB  /admin/legal_/$versionId
    282.3 / 283 KiB  /admin/legal_/edit

Per-page budget failed (D234):
  /admin/roles_/$roleId: 306.4 KiB, over its ceiling of 306 KiB
  /admin/screening: 378.2 KiB, over its ceiling of 377 KiB
  /admin/translations: 409.8 KiB, over its ceiling of 409 KiB
  /my-listings_/$listingId: 316.0 KiB, over its ceiling of 316 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
    353.2 / 354 KiB  /admin/listings
    377.6 / 379 KiB  /admin/listings_/$listingId
    400.4 / 403 KiB  /admin/listings_/$listingId_/edit
    268.7 / 270 KiB  /admin/locations
    338.2 / 339 KiB  /admin/places
    305.2 / 306 KiB  /admin/roles
    306.4 / 306 KiB  /admin/roles_/$roleId
    378.2 / 377 KiB  /admin/screening
    409.8 / 409 KiB  /admin/translations
    319.9 / 320 KiB  /admin/translations_/$lang
    303.6 / 304 KiB  /admin/users
    284.1 / 285 KiB  /admin/users_/$userId
    218.8 / 219 KiB  /auth
    207.1 / 208 KiB  /auth_/callback
    209.2 / 210 KiB  /auth_/reset
    219.6 / 220 KiB  /c/$slug
    222.0 / 223 KiB  /dev/primitives
    241.1 / 242 KiB  /dev/style
    206.5 / 207 KiB  /dev/tall
    249.1 / 251 KiB  /l/$slug
    210.1 / 211 KiB  /legal/$kind
    217.7 / 218 KiB  /legal/accept
    210.7 / 212 KiB  /legal/publishing
    326.7 / 327 KiB  /my-listings
    316.0 / 316 KiB  /my-listings_/$listingId
    394.9 / 397 KiB  /my-listings_/$listingId_/edit
    394.9 / 397 KiB  /post
    394.8 / 397 KiB  /post_/$listingId
    210.0 / 211 KiB  /privacy
    269.9 / 271 KiB  /settings
    210.0 / 211 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/4960a987-d560-4b95-9fc0-b05dd2c58979' before making global git config changes
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
