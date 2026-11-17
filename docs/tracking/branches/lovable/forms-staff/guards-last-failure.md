# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44115491649
- Commit: `5cc2187695539810b274b38157c4911bb3fd7942`
- Attempt: 1
- Written (UTC): 2026-11-17T15:46:54.233Z

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
    284.2 / 285 KiB  /admin/legal
    280.8 / 282 KiB  /admin/legal_/$versionId
    282.9 / 284 KiB  /admin/legal_/edit
    328.1 / 329 KiB  /admin/listings
    329.1 / 330 KiB  /admin/listings_/$listingId
    411.1 / 412 KiB  /admin/listings_/$listingId_/edit
    269.3 / 271 KiB  /admin/locations
    312.3 / 313 KiB  /admin/monetisation
    306.2 / 310 KiB  /admin/places
    294.4 / 294 KiB  /admin/roles
    274.6 / 274 KiB  /admin/roles_/$roleId
    345.1 / 348 KiB  /admin/screening
    305.7 / 306 KiB  /admin/translations
    308.4 / 309 KiB  /admin/translations_/$lang
    291.6 / 293 KiB  /admin/users
    291.7 / 292 KiB  /admin/users_/$userId
    219.7 / 223 KiB  /auth
    207.2 / 209 KiB  /auth_/callback
    209.2 / 211 KiB  /auth_/reset
    225.0 / 227 KiB  /c/$slug
    227.3 / 228 KiB  /dev/primitives
    247.4 / 248 KiB  /dev/style
    204.0 / 206 KiB  /dev/tall
    256.0 / 257 KiB  /l/$slug
    208.4 / 210 KiB  /legal/$kind
    214.8 / 217 KiB  /legal/accept
    209.2 / 211 KiB  /legal/publishing
    311.0 / 315 KiB  /my-listings
    321.6 / 323 KiB  /my-listings_/$listingId
    403.2 / 404 KiB  /my-listings_/$listingId_/edit
    403.2 / 404 KiB  /post
    403.2 / 404 KiB  /post_/$listingId
    208.4 / 210 KiB  /privacy
    274.3 / 277 KiB  /settings
    208.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/roles: 294.4 KiB, over its ceiling of 294 KiB
  /admin/roles_/$roleId: 274.6 KiB, over its ceiling of 274 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/22375060-9649-4944-8d41-b6dd975f1dcf' before making global git config changes
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
