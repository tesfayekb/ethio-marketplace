# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44894986213
- Commit: `3be465ac31ca38439923ec5061a9fb83bfd459e1`
- Attempt: 1
- Written (UTC): 2026-11-21T10:50:55.200Z

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
    304.9 / 306 KiB  /admin/countries
    206.8 / 208 KiB  /admin/images
    289.6 / 290 KiB  /admin/impersonation_/$sessionId
    282.3 / 283 KiB  /admin/legal
    279.0 / 280 KiB  /admin/legal_/$versionId
    281.7 / 283 KiB  /admin/legal_/edit
    326.5 / 327 KiB  /admin/listings
    327.1 / 328 KiB  /admin/listings_/$listingId
    408.2 / 409 KiB  /admin/listings_/$listingId_/edit
    267.3 / 268 KiB  /admin/locations
    311.8 / 313 KiB  /admin/monetisation
    305.4 / 306 KiB  /admin/places
    293.4 / 294 KiB  /admin/roles
    273.4 / 274 KiB  /admin/roles_/$roleId
    343.3 / 344 KiB  /admin/screening
    304.7 / 306 KiB  /admin/translations
    306.4 / 307 KiB  /admin/translations_/$lang
    290.0 / 291 KiB  /admin/users
    289.9 / 291 KiB  /admin/users_/$userId
    219.2 / 220 KiB  /auth
    205.3 / 206 KiB  /auth_/callback
    212.3 / 213 KiB  /auth_/reset
    222.9 / 224 KiB  /c/$slug
    226.4 / 227 KiB  /dev/primitives
    245.3 / 246 KiB  /dev/style
    202.1 / 203 KiB  /dev/tall
    248.8 / 249 KiB  /l/$slug
    206.5 / 207 KiB  /legal/$kind
    213.7 / 215 KiB  /legal/accept
    207.5 / 208 KiB  /legal/publishing
    309.4 / 310 KiB  /my-listings
    319.6 / 320 KiB  /my-listings_/$listingId
    400.3 / 401 KiB  /my-listings_/$listingId_/edit
    400.3 / 401 KiB  /post
    400.3 / 401 KiB  /post_/$listingId
    206.5 / 207 KiB  /privacy
    276.3 / 277 KiB  /settings
    206.5 / 207 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

NEAR band failed (DEC-296):
  /account_/saved: 221.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 222 KiB — DEC-296: set it to ceilingFor(size) = 223
  /l/$slug: 248.8 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 249 KiB — DEC-296: set it to ceilingFor(size) = 250
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/56a7f552-049b-43e9-83a0-04b1f8825e0a' before making global git config changes
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
