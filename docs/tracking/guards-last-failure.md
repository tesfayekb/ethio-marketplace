# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41196381346
- Commit: `e1e736dfe15a8c92bc3aa0e864197cd87934129f`
- Attempt: 1
- Written (UTC): 2026-10-31T11:38:45.462Z

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
    285.6 / 286 KiB  /admin/legal_/edit

Per-page budget failed (D234):
  /admin/countries: 341.3 KiB, over its ceiling of 341 KiB
  /admin/coverage: 334.0 KiB, over its ceiling of 334 KiB
  /admin/impersonation_/$sessionId: 312.2 KiB, over its ceiling of 312 KiB
  /admin/roles: 309.2 KiB, over its ceiling of 309 KiB
  /admin/screening: 383.1 KiB, over its ceiling of 383 KiB
  /admin/users: 308.2 KiB, over its ceiling of 308 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
    357.8 / 358 KiB  /admin/listings
    382.3 / 383 KiB  /admin/listings_/$listingId
    405.7 / 406 KiB  /admin/listings_/$listingId_/edit
    272.1 / 273 KiB  /admin/locations
    342.8 / 343 KiB  /admin/places
    309.2 / 309 KiB  /admin/roles
    310.3 / 311 KiB  /admin/roles_/$roleId
    383.1 / 383 KiB  /admin/screening
    415.2 / 416 KiB  /admin/translations
    324.5 / 325 KiB  /admin/translations_/$lang
    308.2 / 308 KiB  /admin/users
    288.2 / 289 KiB  /admin/users_/$userId
    222.2 / 223 KiB  /auth
    210.5 / 211 KiB  /auth_/callback
    212.5 / 213 KiB  /auth_/reset
    223.6 / 224 KiB  /c/$slug
    225.5 / 226 KiB  /dev/primitives
    246.0 / 246 KiB  /dev/style
    209.8 / 211 KiB  /dev/tall
    253.1 / 254 KiB  /l/$slug
    214.2 / 215 KiB  /legal/$kind
    221.2 / 222 KiB  /legal/accept
    214.9 / 216 KiB  /legal/publishing
    331.3 / 332 KiB  /my-listings
    320.1 / 321 KiB  /my-listings_/$listingId
    400.2 / 401 KiB  /my-listings_/$listingId_/edit
    400.1 / 401 KiB  /post
    400.1 / 401 KiB  /post_/$listingId
    214.1 / 215 KiB  /privacy
    273.8 / 275 KiB  /settings
    214.1 / 215 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/52276e00-ee23-4c61-a9cd-d05f1faf8895' before making global git config changes
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
