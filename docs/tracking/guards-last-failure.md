# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41202111497
- Commit: `9155df662e19ef8739d6a1a5d14647b6c4cb2639`
- Attempt: 1
- Written (UTC): 2026-10-31T13:07:53.001Z

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
NEAR band failed (DEC-296):
  /dev/style: 245.9 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 246 KiB — DEC-296: set it to ceilingFor(size) = 247
    351.6 / 352 KiB  /admin/attributes
    311.5 / 312 KiB  /admin/audit
    359.6 / 360 KiB  /admin/categories
    341.2 / 342 KiB  /admin/countries
    333.9 / 335 KiB  /admin/coverage
    211.0 / 212 KiB  /admin/images
    312.1 / 313 KiB  /admin/impersonation_/$sessionId
    280.6 / 281 KiB  /admin/legal
    279.9 / 281 KiB  /admin/legal_/$versionId
    285.5 / 286 KiB  /admin/legal_/edit
    357.7 / 359 KiB  /admin/listings
    382.1 / 383 KiB  /admin/listings_/$listingId
    405.5 / 407 KiB  /admin/listings_/$listingId_/edit
    272.0 / 273 KiB  /admin/locations
    342.7 / 344 KiB  /admin/places
    309.1 / 310 KiB  /admin/roles
    310.2 / 311 KiB  /admin/roles_/$roleId
    383.0 / 384 KiB  /admin/screening
    415.1 / 416 KiB  /admin/translations
    324.4 / 325 KiB  /admin/translations_/$lang
    308.1 / 309 KiB  /admin/users
    288.1 / 289 KiB  /admin/users_/$userId
    222.1 / 223 KiB  /auth
    210.4 / 211 KiB  /auth_/callback
    212.4 / 213 KiB  /auth_/reset
    223.5 / 224 KiB  /c/$slug
    225.4 / 226 KiB  /dev/primitives
    245.9 / 246 KiB  /dev/style
    209.7 / 211 KiB  /dev/tall
    253.0 / 254 KiB  /l/$slug
    214.0 / 215 KiB  /legal/$kind
    221.0 / 222 KiB  /legal/accept
    214.8 / 216 KiB  /legal/publishing
    331.2 / 332 KiB  /my-listings
    320.0 / 321 KiB  /my-listings_/$listingId
    400.1 / 401 KiB  /my-listings_/$listingId_/edit
    400.0 / 401 KiB  /post
    400.0 / 401 KiB  /post_/$listingId
    214.0 / 215 KiB  /privacy
    273.7 / 275 KiB  /settings
    214.0 / 215 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/6ac50f43-cf6c-43ed-8306-1d99c349c11f' before making global git config changes
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
