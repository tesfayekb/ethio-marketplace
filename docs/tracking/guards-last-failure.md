# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42508660761
- Commit: `a69bb24a0e2856d969194463628f6058ab9b80f4`
- Attempt: 1
- Written (UTC): 2026-11-08T18:34:28.793Z

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
    285.0 / 288 KiB  /admin/legal
    282.4 / 285 KiB  /admin/legal_/$versionId
    284.0 / 292 KiB  /admin/legal_/edit
    351.3 / 351 KiB  /admin/listings
    352.8 / 353 KiB  /admin/listings_/$listingId
    413.2 / 414 KiB  /admin/listings_/$listingId_/edit
    273.6 / 276 KiB  /admin/locations
    338.6 / 341 KiB  /admin/monetisation
    330.8 / 333 KiB  /admin/places
    296.2 / 299 KiB  /admin/roles
    276.6 / 279 KiB  /admin/roles_/$roleId
    372.3 / 373 KiB  /admin/screening
    307.1 / 310 KiB  /admin/translations
    310.7 / 313 KiB  /admin/translations_/$lang
    295.9 / 299 KiB  /admin/users
    291.2 / 294 KiB  /admin/users_/$userId
    229.6 / 231 KiB  /auth
    216.0 / 217 KiB  /auth_/callback
    218.0 / 219 KiB  /auth_/reset
    233.2 / 235 KiB  /c/$slug
    233.5 / 236 KiB  /dev/primitives
    254.2 / 256 KiB  /dev/style
    212.2 / 215 KiB  /dev/tall
    263.4 / 265 KiB  /l/$slug
    216.6 / 219 KiB  /legal/$kind
    223.6 / 226 KiB  /legal/accept
    217.4 / 220 KiB  /legal/publishing
    321.5 / 322 KiB  /my-listings
    329.7 / 329 KiB  /my-listings_/$listingId
    407.8 / 408 KiB  /my-listings_/$listingId_/edit
    407.8 / 408 KiB  /post
    407.7 / 408 KiB  /post_/$listingId
    216.6 / 219 KiB  /privacy
    283.2 / 284 KiB  /settings
    216.6 / 219 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/listings: 351.3 KiB, over its ceiling of 351 KiB
  /my-listings_/$listingId: 329.7 KiB, over its ceiling of 329 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/9e6395c2-1955-4673-991c-733d94de1692' before making global git config changes
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
