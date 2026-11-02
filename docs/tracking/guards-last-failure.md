# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41428972721
- Commit: `137d0956671d96c76744ace8ef15ca54fced8c65`
- Attempt: 1
- Written (UTC): 2026-11-02T10:49:17.527Z

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
    213.8 / 215 KiB  /admin/images
    291.9 / 298 KiB  /admin/impersonation_/$sessionId
    285.1 / 286 KiB  /admin/legal
    282.5 / 284 KiB  /admin/legal_/$versionId
    289.3 / 290 KiB  /admin/legal_/edit
    346.5 / 345 KiB  /admin/listings
    387.3 / 388 KiB  /admin/listings_/$listingId
    409.1 / 410 KiB  /admin/listings_/$listingId_/edit
    274.8 / 276 KiB  /admin/locations
    328.5 / 329 KiB  /admin/places
    294.0 / 295 KiB  /admin/roles
    313.5 / 314 KiB  /admin/roles_/$roleId
    368.2 / 369 KiB  /admin/screening
    400.9 / 401 KiB  /admin/translations
    308.4 / 309 KiB  /admin/translations_/$lang
    293.7 / 295 KiB  /admin/users
    291.3 / 292 KiB  /admin/users_/$userId
    225.0 / 226 KiB  /auth
    213.2 / 214 KiB  /auth_/callback
    215.3 / 216 KiB  /auth_/reset
    230.4 / 231 KiB  /c/$slug
    229.5 / 230 KiB  /dev/primitives
    250.2 / 251 KiB  /dev/style
    212.5 / 213 KiB  /dev/tall
    260.8 / 262 KiB  /l/$slug
    216.9 / 218 KiB  /legal/$kind
    223.9 / 225 KiB  /legal/accept
    217.6 / 219 KiB  /legal/publishing
    317.0 / 318 KiB  /my-listings
    324.8 / 326 KiB  /my-listings_/$listingId
    403.7 / 405 KiB  /my-listings_/$listingId_/edit
    403.7 / 405 KiB  /post
    403.6 / 405 KiB  /post_/$listingId
    216.9 / 218 KiB  /privacy
    278.5 / 279 KiB  /settings
    216.8 / 218 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/listings: 346.5 KiB, over its ceiling of 345 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/ffe99402-e529-40e3-8cd5-1f5b03b8d356' before making global git config changes
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
