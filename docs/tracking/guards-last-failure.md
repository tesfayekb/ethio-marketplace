# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41148548211
- Commit: `398a5859cff9090edb796b12ccbf7ce05837ed3d`
- Attempt: 1
- Written (UTC): 2026-10-31T00:28:57.307Z

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
    308.0 / 308 KiB  /admin/roles
    309.6 / 310 KiB  /admin/roles_/$roleId
    381.9 / 382 KiB  /admin/screening
    414.0 / 415 KiB  /admin/translations
    323.2 / 323 KiB  /admin/translations_/$lang
    307.0 / 307 KiB  /admin/users
    287.3 / 288 KiB  /admin/users_/$userId
    221.4 / 222 KiB  /auth
    209.8 / 210 KiB  /auth_/callback
    211.8 / 212 KiB  /auth_/reset
    222.9 / 223 KiB  /c/$slug
    224.7 / 225 KiB  /dev/primitives
    244.5 / 245 KiB  /dev/style
    209.1 / 209 KiB  /dev/tall
    252.4 / 253 KiB  /l/$slug
    213.4 / 214 KiB  /legal/$kind
    220.3 / 221 KiB  /legal/accept
    214.2 / 214 KiB  /legal/publishing
    330.1 / 330 KiB  /my-listings
    319.3 / 320 KiB  /my-listings_/$listingId
    398.2 / 398 KiB  /my-listings_/$listingId_/edit
    398.2 / 398 KiB  /post
    398.1 / 398 KiB  /post_/$listingId
    213.4 / 214 KiB  /privacy
    273.1 / 273 KiB  /settings
    213.4 / 214 KiB  /terms

Per-page budget failed (D234):
  /account_/legal_/$versionId: 212.1 KiB, over its ceiling of 212 KiB
  /admin/ai: 337.2 KiB, over its ceiling of 337 KiB
  /admin/countries: 340.0 KiB, over its ceiling of 340 KiB
  /admin/legal: 280.0 KiB, over its ceiling of 280 KiB
  /admin/translations_/$lang: 323.2 KiB, over its ceiling of 323 KiB
  /dev/tall: 209.1 KiB, over its ceiling of 209 KiB
  /legal/publishing: 214.2 KiB, over its ceiling of 214 KiB
  /my-listings: 330.1 KiB, over its ceiling of 330 KiB
  /my-listings_/$listingId_/edit: 398.2 KiB, over its ceiling of 398 KiB
  /post: 398.2 KiB, over its ceiling of 398 KiB
  /post_/$listingId: 398.1 KiB, over its ceiling of 398 KiB
  /settings: 273.1 KiB, over its ceiling of 273 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/9eadeab0-940f-471a-bc08-2e2efb868e70' before making global git config changes
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
