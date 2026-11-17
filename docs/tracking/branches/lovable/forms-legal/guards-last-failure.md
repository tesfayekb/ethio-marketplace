# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44051590383
- Commit: `76a03c842b308fed4d0f6b838706b8f01e5c93a2`
- Attempt: 1
- Written (UTC): 2026-11-17T09:15:20.768Z

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
    282.9 / 282 KiB  /admin/legal_/edit
    327.4 / 329 KiB  /admin/listings
    328.0 / 330 KiB  /admin/listings_/$listingId
    410.7 / 412 KiB  /admin/listings_/$listingId_/edit
    269.3 / 271 KiB  /admin/locations
    309.8 / 313 KiB  /admin/monetisation
    306.2 / 310 KiB  /admin/places
    292.7 / 294 KiB  /admin/roles
    273.5 / 274 KiB  /admin/roles_/$roleId
    344.7 / 348 KiB  /admin/screening
    305.7 / 306 KiB  /admin/translations
    308.3 / 309 KiB  /admin/translations_/$lang
    291.6 / 293 KiB  /admin/users
    290.7 / 291 KiB  /admin/users_/$userId
    219.7 / 223 KiB  /auth
    207.2 / 209 KiB  /auth_/callback
    209.2 / 211 KiB  /auth_/reset
    225.0 / 227 KiB  /c/$slug
    227.2 / 226 KiB  /dev/primitives
    247.4 / 248 KiB  /dev/style
    204.0 / 206 KiB  /dev/tall
    255.6 / 257 KiB  /l/$slug
    208.4 / 210 KiB  /legal/$kind
    214.7 / 217 KiB  /legal/accept
    209.2 / 211 KiB  /legal/publishing
    311.0 / 315 KiB  /my-listings
    321.2 / 323 KiB  /my-listings_/$listingId
    402.8 / 404 KiB  /my-listings_/$listingId_/edit
    402.8 / 404 KiB  /post
    402.8 / 404 KiB  /post_/$listingId
    208.4 / 210 KiB  /privacy
    274.3 / 277 KiB  /settings
    208.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/legal: 284.1 KiB, over its ceiling of 283 KiB
  /admin/legal_/$versionId: 280.8 KiB, over its ceiling of 280 KiB
  /admin/legal_/edit: 282.9 KiB, over its ceiling of 282 KiB
  /dev/primitives: 227.2 KiB, over its ceiling of 226 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/6fc0a634-231e-4bdf-91fa-aa8b71a994f7' before making global git config changes
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
