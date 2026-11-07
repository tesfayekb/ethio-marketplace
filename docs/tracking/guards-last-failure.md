# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42350853426
- Commit: `016cfe272d029ead2dc71d9cc8e30bc2a2fcb664`
- Attempt: 1
- Written (UTC): 2026-11-07T07:41:21.844Z

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
    282.5 / 285 KiB  /admin/legal_/$versionId
    284.1 / 292 KiB  /admin/legal_/edit
    352.9 / 351 KiB  /admin/listings
    354.4 / 353 KiB  /admin/listings_/$listingId
    411.4 / 414 KiB  /admin/listings_/$listingId_/edit
    273.7 / 276 KiB  /admin/locations
    339.2 / 341 KiB  /admin/monetisation
    330.9 / 333 KiB  /admin/places
    296.3 / 299 KiB  /admin/roles
    276.6 / 279 KiB  /admin/roles_/$roleId
    374.0 / 373 KiB  /admin/screening
    307.2 / 310 KiB  /admin/translations
    310.8 / 313 KiB  /admin/translations_/$lang
    296.0 / 299 KiB  /admin/users
    291.3 / 294 KiB  /admin/users_/$userId
    229.7 / 230 KiB  /auth
    216.1 / 217 KiB  /auth_/callback
    218.0 / 219 KiB  /auth_/reset
    232.2 / 235 KiB  /c/$slug
    233.5 / 236 KiB  /dev/primitives
    253.1 / 256 KiB  /dev/style
    212.3 / 215 KiB  /dev/tall
    262.0 / 265 KiB  /l/$slug
    216.7 / 219 KiB  /legal/$kind
    223.7 / 226 KiB  /legal/accept
    217.4 / 220 KiB  /legal/publishing
    320.7 / 322 KiB  /my-listings
    327.7 / 329 KiB  /my-listings_/$listingId
    406.0 / 408 KiB  /my-listings_/$listingId_/edit
    405.9 / 408 KiB  /post
    405.9 / 408 KiB  /post_/$listingId
    216.7 / 219 KiB  /privacy
    283.3 / 284 KiB  /settings
    216.7 / 219 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/listings: 352.9 KiB, over its ceiling of 351 KiB
  /admin/listings_/$listingId: 354.4 KiB, over its ceiling of 353 KiB
  /admin/screening: 374.0 KiB, over its ceiling of 373 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/3272ef3c-efdc-4b5c-8419-0ae75d9cb8db' before making global git config changes
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
