# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41184135622
- Commit: `0e6f8a96a8d4f299782074a528394bdc95241549`
- Attempt: 1
- Written (UTC): 2026-10-31T08:41:33.368Z

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
    311.1 / 312 KiB  /admin/audit
    359.2 / 360 KiB  /admin/categories
    340.7 / 341 KiB  /admin/countries
    333.5 / 334 KiB  /admin/coverage
    211.0 / 212 KiB  /admin/images
    311.6 / 312 KiB  /admin/impersonation_/$sessionId
    280.6 / 281 KiB  /admin/legal
    279.9 / 281 KiB  /admin/legal_/$versionId
    285.5 / 286 KiB  /admin/legal_/edit
    357.2 / 358 KiB  /admin/listings
    382.2 / 383 KiB  /admin/listings_/$listingId
    404.8 / 405 KiB  /admin/listings_/$listingId_/edit
    272.0 / 273 KiB  /admin/locations
    342.2 / 343 KiB  /admin/places
    308.6 / 309 KiB  /admin/roles
    310.2 / 311 KiB  /admin/roles_/$roleId

NEAR band failed (DEC-296):
  /admin/listings_/$listingId_/edit: 404.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 405 KiB — DEC-296: set it to ceilingFor(size) = 406
    382.5 / 383 KiB  /admin/screening
    414.6 / 416 KiB  /admin/translations
    323.9 / 325 KiB  /admin/translations_/$lang
    307.6 / 308 KiB  /admin/users
    288.1 / 289 KiB  /admin/users_/$userId
    222.2 / 223 KiB  /auth
    210.4 / 211 KiB  /auth_/callback
    212.5 / 213 KiB  /auth_/reset
    223.5 / 224 KiB  /c/$slug
    225.4 / 226 KiB  /dev/primitives
    245.2 / 246 KiB  /dev/style
    209.7 / 211 KiB  /dev/tall
    253.0 / 254 KiB  /l/$slug
    214.1 / 215 KiB  /legal/$kind
    221.1 / 222 KiB  /legal/accept
    214.8 / 216 KiB  /legal/publishing
    330.7 / 332 KiB  /my-listings
    320.0 / 321 KiB  /my-listings_/$listingId
    399.3 / 400 KiB  /my-listings_/$listingId_/edit
    399.2 / 400 KiB  /post
    399.2 / 400 KiB  /post_/$listingId
    214.1 / 215 KiB  /privacy
    273.7 / 275 KiB  /settings
    214.1 / 215 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/b0f22c1c-6a39-4d04-a48d-dc0910bee549' before making global git config changes
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
