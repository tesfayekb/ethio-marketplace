# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43859278786
- Commit: `c9dab7a584eac4227589d508e1947ed7874110b8`
- Attempt: 1
- Written (UTC): 2026-11-16T11:49:44.492Z

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
    269.3 / 271 KiB  /admin/locations
    309.9 / 334 KiB  /admin/monetisation
    306.2 / 332 KiB  /admin/places
    292.7 / 294 KiB  /admin/roles
    273.5 / 274 KiB  /admin/roles_/$roleId
    344.8 / 370 KiB  /admin/screening
    303.9 / 305 KiB  /admin/translations
    307.3 / 308 KiB  /admin/translations_/$lang
    291.6 / 293 KiB  /admin/users
    289.6 / 291 KiB  /admin/users_/$userId
    219.7 / 223 KiB  /auth
    207.2 / 209 KiB  /auth_/callback
    209.2 / 211 KiB  /auth_/reset
    225.0 / 227 KiB  /c/$slug
    225.1 / 226 KiB  /dev/primitives
    246.2 / 248 KiB  /dev/style
    204.0 / 206 KiB  /dev/tall
    255.6 / 257 KiB  /l/$slug
    208.4 / 210 KiB  /legal/$kind
    214.7 / 217 KiB  /legal/accept
    209.2 / 211 KiB  /legal/publishing
    311.0 / 315 KiB  /my-listings
    321.2 / 323 KiB  /my-listings_/$listingId
    403.3 / 404 KiB  /my-listings_/$listingId_/edit
    403.3 / 404 KiB  /post
    403.2 / 404 KiB  /post_/$listingId
    208.4 / 210 KiB  /privacy
    274.3 / 277 KiB  /settings
    208.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/ai: 299.3 KiB, 8 KiB or more under its ceiling of 325 KiB (ratchet: lower the ceiling to 303)
  /admin/attributes: 314.6 KiB, 8 KiB or more under its ceiling of 338 KiB (ratchet: lower the ceiling to 318)
  /admin/countries: 305.7 KiB, 8 KiB or more under its ceiling of 330 KiB (ratchet: lower the ceiling to 309)
  /admin/listings: 326.0 KiB, 8 KiB or more under its ceiling of 350 KiB (ratchet: lower the ceiling to 329)
  /admin/listings_/$listingId: 326.7 KiB, 8 KiB or more under its ceiling of 354 KiB (ratchet: lower the ceiling to 330)
  /admin/monetisation: 309.9 KiB, 8 KiB or more under its ceiling of 334 KiB (ratchet: lower the ceiling to 313)
  /admin/places: 306.2 KiB, 8 KiB or more under its ceiling of 332 KiB (ratchet: lower the ceiling to 310)
  /admin/screening: 344.8 KiB, 8 KiB or more under its ceiling of 370 KiB (ratchet: lower the ceiling to 348)

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/de0f0b2a-4603-4da0-b2b5-9fa811b6a13c' before making global git config changes
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
