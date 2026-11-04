# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41786315373
- Commit: `7d917cdbb96b6ac441f51b5611ffca760b355579`
- Attempt: 1
- Written (UTC): 2026-11-04T06:55:33.079Z

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
    284.0 / 285 KiB  /admin/legal_/$versionId
    290.8 / 292 KiB  /admin/legal_/edit
    350.4 / 351 KiB  /admin/listings
    400.2 / 396 KiB  /admin/listings_/$listingId
    412.7 / 414 KiB  /admin/listings_/$listingId_/edit
    275.4 / 276 KiB  /admin/locations
    340.2 / 341 KiB  /admin/monetisation
    332.4 / 333 KiB  /admin/places
    297.9 / 299 KiB  /admin/roles
    326.8 / 322 KiB  /admin/roles_/$roleId
    371.6 / 373 KiB  /admin/screening
    431.7 / 420 KiB  /admin/translations
    312.3 / 313 KiB  /admin/translations_/$lang
    297.6 / 299 KiB  /admin/users
    292.8 / 294 KiB  /admin/users_/$userId
    228.3 / 229 KiB  /auth
    214.7 / 216 KiB  /auth_/callback
    216.7 / 218 KiB  /auth_/reset
    233.8 / 235 KiB  /c/$slug
    235.2 / 236 KiB  /dev/primitives
    254.7 / 256 KiB  /dev/style
    214.0 / 215 KiB  /dev/tall
    263.6 / 265 KiB  /l/$slug
    218.3 / 219 KiB  /legal/$kind
    225.3 / 226 KiB  /legal/accept
    219.1 / 220 KiB  /legal/publishing
    320.9 / 322 KiB  /my-listings
    327.6 / 329 KiB  /my-listings_/$listingId
    407.2 / 408 KiB  /my-listings_/$listingId_/edit
    407.2 / 408 KiB  /post
    407.2 / 408 KiB  /post_/$listingId
    218.3 / 219 KiB  /privacy
    281.8 / 283 KiB  /settings
    218.3 / 219 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/listings_/$listingId: 400.2 KiB, over its ceiling of 396 KiB
  /admin/roles_/$roleId: 326.8 KiB, over its ceiling of 322 KiB
  /admin/translations: 431.7 KiB, over its ceiling of 420 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/ad672d4b-69c7-46f9-b5ce-5c356b9844f2' before making global git config changes
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
