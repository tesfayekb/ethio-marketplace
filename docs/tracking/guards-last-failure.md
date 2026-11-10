# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42801234816
- Commit: `bd095897c48f144def17ff67023e658432d1a8da`
- Attempt: 1
- Written (UTC): 2026-11-10T11:08:41.559Z

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
    414.8 / 414 KiB  /admin/listings_/$listingId_/edit
    274.5 / 276 KiB  /admin/locations
    338.6 / 341 KiB  /admin/monetisation
    331.8 / 333 KiB  /admin/places
    297.2 / 299 KiB  /admin/roles
    277.5 / 279 KiB  /admin/roles_/$roleId
    373.7 / 374 KiB  /admin/screening
    308.1 / 310 KiB  /admin/translations
    311.7 / 313 KiB  /admin/translations_/$lang
    296.9 / 299 KiB  /admin/users
    292.2 / 294 KiB  /admin/users_/$userId
    230.6 / 231 KiB  /auth
    217.0 / 217 KiB  /auth_/callback
    219.0 / 219 KiB  /auth_/reset
    234.5 / 235 KiB  /c/$slug
    234.5 / 236 KiB  /dev/primitives
    255.4 / 256 KiB  /dev/style
    213.2 / 215 KiB  /dev/tall
    264.8 / 265 KiB  /l/$slug
    217.6 / 219 KiB  /legal/$kind
    224.6 / 226 KiB  /legal/accept
    218.3 / 220 KiB  /legal/publishing
    322.9 / 323 KiB  /my-listings
    330.9 / 331 KiB  /my-listings_/$listingId
    409.3 / 409 KiB  /my-listings_/$listingId_/edit
    409.3 / 409 KiB  /post
    409.3 / 409 KiB  /post_/$listingId
    217.6 / 219 KiB  /privacy
    284.2 / 284 KiB  /settings
    217.6 / 219 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/listings_/$listingId: 354.2 KiB, over its ceiling of 354 KiB
  /admin/listings_/$listingId_/edit: 414.8 KiB, over its ceiling of 414 KiB
  /auth_/callback: 217.0 KiB, over its ceiling of 217 KiB
  /my-listings_/$listingId_/edit: 409.3 KiB, over its ceiling of 409 KiB
  /post: 409.3 KiB, over its ceiling of 409 KiB
  /post_/$listingId: 409.3 KiB, over its ceiling of 409 KiB
  /settings: 284.2 KiB, over its ceiling of 284 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/28c902da-c55c-4016-9b2d-9154d64ff63b' before making global git config changes
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
