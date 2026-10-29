# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40827819679
- Commit: `31d5fb6b131e43d4a5a3345f3a267021d1321bf1`
- Attempt: 1
- Written (UTC): 2026-10-29T06:34:00.730Z

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
    329.3 / 330 KiB  /admin/coverage
    207.6 / 209 KiB  /admin/images
    307.5 / 308 KiB  /admin/impersonation_/$sessionId
    276.6 / 277 KiB  /admin/legal
    275.9 / 277 KiB  /admin/legal_/$versionId
    282.1 / 283 KiB  /admin/legal_/edit
    352.8 / 353 KiB  /admin/listings
    376.3 / 379 KiB  /admin/listings_/$listingId
    399.7 / 403 KiB  /admin/listings_/$listingId_/edit
    268.5 / 270 KiB  /admin/locations
    338.0 / 338 KiB  /admin/places
    305.1 / 306 KiB  /admin/roles
    305.6 / 306 KiB  /admin/roles_/$roleId
    374.2 / 377 KiB  /admin/screening
    408.1 / 409 KiB  /admin/translations
    319.8 / 320 KiB  /admin/translations_/$lang

Per-page budget failed (D234):
  /admin/places: 338.0 KiB, over its ceiling of 338 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
    303.5 / 304 KiB  /admin/users
    283.9 / 285 KiB  /admin/users_/$userId
    218.6 / 219 KiB  /auth
    207.0 / 208 KiB  /auth_/callback
    209.1 / 210 KiB  /auth_/reset
    219.5 / 220 KiB  /c/$slug
    221.9 / 223 KiB  /dev/primitives
    241.0 / 242 KiB  /dev/style
    206.3 / 207 KiB  /dev/tall
    247.8 / 251 KiB  /l/$slug
    209.9 / 211 KiB  /legal/$kind
    217.5 / 218 KiB  /legal/accept
    210.6 / 212 KiB  /legal/publishing
    326.6 / 327 KiB  /my-listings
    315.5 / 316 KiB  /my-listings_/$listingId
    394.4 / 397 KiB  /my-listings_/$listingId_/edit
    394.3 / 397 KiB  /post
    394.3 / 397 KiB  /post_/$listingId
    209.9 / 211 KiB  /privacy
    269.7 / 271 KiB  /settings
    209.9 / 211 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/1cdea40b-8ff0-4d32-8663-a8ec165d2c45' before making global git config changes
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
