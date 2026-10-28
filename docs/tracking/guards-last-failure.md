# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40674860289
- Commit: `09fd6cf536ea58618d40ceb6d4ba7910e313af43`
- Attempt: 1
- Written (UTC): 2026-10-28T11:05:36.687Z

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
    275.6 / 277 KiB  /admin/legal_/$versionId
    281.7 / 283 KiB  /admin/legal_/edit
    352.3 / 353 KiB  /admin/listings
    375.7 / 375 KiB  /admin/listings_/$listingId
    399.3 / 399 KiB  /admin/listings_/$listingId_/edit
    268.2 / 270 KiB  /admin/locations
    337.5 / 338 KiB  /admin/places
    304.7 / 306 KiB  /admin/roles
    305.1 / 306 KiB  /admin/roles_/$roleId
    373.7 / 373 KiB  /admin/screening
    407.0 / 408 KiB  /admin/translations
    319.2 / 320 KiB  /admin/translations_/$lang
    303.0 / 304 KiB  /admin/users
    283.5 / 285 KiB  /admin/users_/$userId
    218.1 / 219 KiB  /auth
    206.7 / 208 KiB  /auth_/callback
    208.7 / 210 KiB  /auth_/reset
    219.2 / 220 KiB  /c/$slug
    221.4 / 223 KiB  /dev/primitives
    240.6 / 242 KiB  /dev/style
    206.0 / 207 KiB  /dev/tall
    247.5 / 247 KiB  /l/$slug
    209.6 / 211 KiB  /legal/$kind
    217.1 / 218 KiB  /legal/accept
    210.3 / 212 KiB  /legal/publishing
    325.9 / 327 KiB  /my-listings
    315.0 / 315 KiB  /my-listings_/$listingId
    394.0 / 397 KiB  /my-listings_/$listingId_/edit
    393.9 / 397 KiB  /post
    393.9 / 397 KiB  /post_/$listingId
    209.6 / 211 KiB  /privacy
    269.4 / 271 KiB  /settings
    209.6 / 211 KiB  /terms

Per-page budget failed (D234):
  /admin/listings_/$listingId: 375.7 KiB, over its ceiling of 375 KiB
  /admin/listings_/$listingId_/edit: 399.3 KiB, over its ceiling of 399 KiB
  /admin/screening: 373.7 KiB, over its ceiling of 373 KiB
  /l/$slug: 247.5 KiB, over its ceiling of 247 KiB
  /my-listings_/$listingId: 315.0 KiB, over its ceiling of 315 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/eb460c89-0f4d-43ff-bd09-f4f65ed44a43' before making global git config changes
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
