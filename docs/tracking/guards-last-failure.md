# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40858084623
- Commit: `69339baf4ff27167fb3b9dea7f410d37ef2d3588`
- Attempt: 1
- Written (UTC): 2026-10-29T10:58:32.304Z

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
    276.7 / 277 KiB  /admin/legal
    276.0 / 277 KiB  /admin/legal_/$versionId
    282.2 / 283 KiB  /admin/legal_/edit
    353.1 / 353 KiB  /admin/listings
    377.0 / 379 KiB  /admin/listings_/$listingId
    400.4 / 403 KiB  /admin/listings_/$listingId_/edit
    268.6 / 270 KiB  /admin/locations
    338.1 / 339 KiB  /admin/places
    305.2 / 306 KiB  /admin/roles
    305.8 / 306 KiB  /admin/roles_/$roleId
    375.0 / 377 KiB  /admin/screening
    408.5 / 409 KiB  /admin/translations
    319.9 / 320 KiB  /admin/translations_/$lang
    303.6 / 304 KiB  /admin/users
    284.0 / 285 KiB  /admin/users_/$userId
    218.7 / 219 KiB  /auth
    207.1 / 208 KiB  /auth_/callback
    209.2 / 210 KiB  /auth_/reset
    219.6 / 220 KiB  /c/$slug
    222.0 / 223 KiB  /dev/primitives
    241.1 / 242 KiB  /dev/style
    206.4 / 207 KiB  /dev/tall
    249.1 / 251 KiB  /l/$slug
    210.0 / 211 KiB  /legal/$kind
    217.7 / 218 KiB  /legal/accept
    210.7 / 212 KiB  /legal/publishing
    326.7 / 327 KiB  /my-listings
    316.0 / 316 KiB  /my-listings_/$listingId
    394.9 / 397 KiB  /my-listings_/$listingId_/edit
    394.8 / 397 KiB  /post
    394.8 / 397 KiB  /post_/$listingId
    210.0 / 211 KiB  /privacy
    269.9 / 271 KiB  /settings
    210.0 / 211 KiB  /terms

Per-page budget failed (D234):
  /account: 266.1 KiB, over its ceiling of 266 KiB
  /admin/ai: 333.8 KiB, over its ceiling of 333 KiB
  /admin/attributes: 347.1 KiB, over its ceiling of 347 KiB
  /admin/listings: 353.1 KiB, over its ceiling of 353 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/6e237bb2-a7ab-41c2-b9c7-fd031669e6a5' before making global git config changes
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
