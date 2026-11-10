# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42846505952
- Commit: `e94b42d9a2dae374e8d1d8bdcd0d9c8f99769fc9`
- Attempt: 1
- Written (UTC): 2026-11-10T16:03:30.470Z

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
    275.9 / 277 KiB  /admin/legal_/$versionId
    277.5 / 278 KiB  /admin/legal_/edit
    344.1 / 345 KiB  /admin/listings
    346.5 / 354 KiB  /admin/listings_/$listingId
    405.7 / 407 KiB  /admin/listings_/$listingId_/edit
    267.6 / 269 KiB  /admin/locations
    330.1 / 331 KiB  /admin/monetisation
    323.9 / 325 KiB  /admin/places
    289.4 / 290 KiB  /admin/roles
    270.2 / 271 KiB  /admin/roles_/$roleId
    365.5 / 366 KiB  /admin/screening
    300.2 / 301 KiB  /admin/translations
    303.8 / 305 KiB  /admin/translations_/$lang
    289.5 / 290 KiB  /admin/users
    284.7 / 286 KiB  /admin/users_/$userId
    223.2 / 231 KiB  /auth
    210.0 / 217 KiB  /auth_/callback
    212.0 / 219 KiB  /auth_/reset
    227.0 / 235 KiB  /c/$slug
    227.1 / 228 KiB  /dev/primitives
    247.9 / 256 KiB  /dev/style
    206.3 / 207 KiB  /dev/tall
    257.1 / 265 KiB  /l/$slug
    210.7 / 212 KiB  /legal/$kind
    217.6 / 219 KiB  /legal/accept
    211.4 / 212 KiB  /legal/publishing
    314.9 / 316 KiB  /my-listings
    322.7 / 324 KiB  /my-listings_/$listingId
    400.7 / 402 KiB  /my-listings_/$listingId_/edit
    400.7 / 402 KiB  /post
    400.6 / 402 KiB  /post_/$listingId
    210.7 / 212 KiB  /privacy
    276.8 / 284 KiB  /settings
    210.7 / 212 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /: 227.0 KiB, 8 KiB or more under its ceiling of 235 KiB (ratchet: lower the ceiling to 230)
  /c/$slug: 227.0 KiB, 8 KiB or more under its ceiling of 235 KiB (ratchet: lower the ceiling to 230)
  /dev/style: 247.9 KiB, 8 KiB or more under its ceiling of 256 KiB (ratchet: lower the ceiling to 251)

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/4e736655-6040-4745-b642-0866487fe895' before making global git config changes
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
