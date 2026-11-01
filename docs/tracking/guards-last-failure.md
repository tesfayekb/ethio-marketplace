# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41289759262
- Commit: `3f221b8febdbd03a5c9917a4ff91b21a1a99639c`
- Attempt: 1
- Written (UTC): 2026-11-01T09:00:03.009Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
NEAR band failed (DEC-296):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    345.1 / 346 KiB  /admin/categories
    326.6 / 327 KiB  /admin/countries
    319.3 / 320 KiB  /admin/coverage
    213.2 / 214 KiB  /admin/images
    297.4 / 298 KiB  /admin/impersonation_/$sessionId
    284.6 / 285 KiB  /admin/legal
    282.0 / 284 KiB  /admin/legal_/$versionId
    288.9 / 289 KiB  /admin/legal_/edit
    343.1 / 344 KiB  /admin/listings
    386.1 / 387 KiB  /admin/listings_/$listingId
    408.6 / 410 KiB  /admin/listings_/$listingId_/edit
    274.2 / 275 KiB  /admin/locations
    328.1 / 329 KiB  /admin/places
    293.6 / 294 KiB  /admin/roles
    312.6 / 314 KiB  /admin/roles_/$roleId
    367.8 / 369 KiB  /admin/screening
    399.6 / 400 KiB  /admin/translations
    308.0 / 309 KiB  /admin/translations_/$lang
    293.3 / 294 KiB  /admin/users
    290.8 / 292 KiB  /admin/users_/$userId
    224.4 / 225 KiB  /auth
    212.6 / 214 KiB  /auth_/callback
    214.7 / 216 KiB  /auth_/reset
    226.2 / 227 KiB  /c/$slug
    229.0 / 230 KiB  /dev/primitives
    237.2 / 238 KiB  /dev/style
    211.9 / 213 KiB  /dev/tall
    256.5 / 257 KiB  /l/$slug
    216.3 / 217 KiB  /legal/$kind
    223.3 / 224 KiB  /legal/accept
    217.0 / 218 KiB  /legal/publishing
    316.4 / 317 KiB  /my-listings
    323.0 / 324 KiB  /my-listings_/$listingId
    403.3 / 404 KiB  /my-listings_/$listingId_/edit
    403.3 / 404 KiB  /post
    403.2 / 404 KiB  /post_/$listingId
    216.3 / 217 KiB  /privacy
    278.0 / 279 KiB  /settings
    216.3 / 217 KiB  /terms

NEAR band failed (DEC-296):
  /admin/ai: 323.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 324 KiB — DEC-296: set it to ceilingFor(size) = 325
  /admin/legal_/edit: 288.9 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 289 KiB — DEC-296: set it to ceilingFor(size) = 290
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/c68c9aa1-d4df-463f-8ca3-fa5d0e5e0844' before making global git config changes
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
