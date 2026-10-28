# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40677294392
- Commit: `16ca17ebeda2137a47f2ac61a73b56a5eeb08924`
- Attempt: 1
- Written (UTC): 2026-10-28T11:24:37.522Z

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
    207.5 / 209 KiB  /admin/
    330.2 / 331 KiB  /admin/ai
    346.5 / 347 KiB  /admin/attributes
    306.5 / 308 KiB  /admin/audit
    354.7 / 356 KiB  /admin/categories
    336.2 / 337 KiB  /admin/countries
    328.8 / 330 KiB  /admin/coverage
    207.3 / 209 KiB  /admin/images
    307.1 / 308 KiB  /admin/impersonation_/$sessionId
    276.3 / 277 KiB  /admin/legal
    275.6 / 277 KiB  /admin/legal_/$versionId
    281.7 / 283 KiB  /admin/legal_/edit
    352.4 / 353 KiB  /admin/listings
    375.6 / 375 KiB  /admin/listings_/$listingId
    399.1 / 399 KiB  /admin/listings_/$listingId_/edit
    268.2 / 270 KiB  /admin/locations
    337.5 / 338 KiB  /admin/places
    304.7 / 306 KiB  /admin/roles
    305.1 / 306 KiB  /admin/roles_/$roleId
    373.5 / 373 KiB  /admin/screening
    407.0 / 408 KiB  /admin/translations
    319.2 / 320 KiB  /admin/translations_/$lang
    303.1 / 304 KiB  /admin/users
    283.5 / 285 KiB  /admin/users_/$userId
    218.1 / 219 KiB  /auth
    206.7 / 208 KiB  /auth_/callback
    208.7 / 210 KiB  /auth_/reset
    219.2 / 220 KiB  /c/$slug
    221.4 / 223 KiB  /dev/primitives
    240.6 / 242 KiB  /dev/style
    206.0 / 207 KiB  /dev/tall
    247.3 / 247 KiB  /l/$slug
    209.6 / 211 KiB  /legal/$kind
    217.1 / 218 KiB  /legal/accept
    210.3 / 212 KiB  /legal/publishing
    326.0 / 327 KiB  /my-listings
    314.9 / 315 KiB  /my-listings_/$listingId
    393.8 / 397 KiB  /my-listings_/$listingId_/edit
    393.7 / 397 KiB  /post
    393.7 / 397 KiB  /post_/$listingId
    209.6 / 211 KiB  /privacy
    269.4 / 271 KiB  /settings
    209.6 / 211 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/3a68e505-60c1-43ce-a50a-8ddaa88a4145' before making global git config changes
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
