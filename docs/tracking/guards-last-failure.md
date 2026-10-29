# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40969787998
- Commit: `5dfe52341b167f2ad4e9e999bc2d03486ae756d9`
- Attempt: 1
- Written (UTC): 2026-10-29T23:19:44.489Z

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
    379.4 / 380 KiB  /admin/listings_/$listingId
    401.7 / 402 KiB  /admin/listings_/$listingId_/edit
    269.4 / 270 KiB  /admin/locations
    339.5 / 340 KiB  /admin/places
    306.0 / 306 KiB  /admin/roles
    307.5 / 308 KiB  /admin/roles_/$roleId
    379.8 / 380 KiB  /admin/screening
    411.8 / 413 KiB  /admin/translations

Per-page budget failed (D234):
  /account_/legal_/$versionId: 210.1 KiB, over its ceiling of 210 KiB
  /admin/legal: 278.0 KiB, over its ceiling of 278 KiB
  /dev/tall: 207.1 KiB, over its ceiling of 207 KiB
  /my-listings: 328.1 KiB, over its ceiling of 328 KiB
  /my-listings_/$listingId_/edit: 396.2 KiB, over its ceiling of 396 KiB
  /post: 396.1 KiB, over its ceiling of 396 KiB
  /post_/$listingId: 396.1 KiB, over its ceiling of 396 KiB
  /settings: 271.1 KiB, over its ceiling of 271 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
    321.2 / 322 KiB  /admin/translations_/$lang
    305.0 / 305 KiB  /admin/users
    285.3 / 286 KiB  /admin/users_/$userId
    219.4 / 220 KiB  /auth
    207.8 / 208 KiB  /auth_/callback
    209.8 / 210 KiB  /auth_/reset
    220.9 / 221 KiB  /c/$slug
    222.6 / 223 KiB  /dev/primitives
    241.8 / 242 KiB  /dev/style
    207.1 / 207 KiB  /dev/tall
    250.4 / 251 KiB  /l/$slug
    211.4 / 212 KiB  /legal/$kind
    218.3 / 219 KiB  /legal/accept
    212.2 / 213 KiB  /legal/publishing
    328.1 / 328 KiB  /my-listings
    317.3 / 318 KiB  /my-listings_/$listingId
    396.2 / 396 KiB  /my-listings_/$listingId_/edit
    396.1 / 396 KiB  /post
    396.1 / 396 KiB  /post_/$listingId
    211.4 / 212 KiB  /privacy
    271.1 / 271 KiB  /settings
    211.4 / 212 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/cd578517-5902-4c85-9113-ad6f8fd90e9c' before making global git config changes
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
