# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43743803112
- Commit: `c04dd8e0e35e1cbb97e5cdaee814b0689d96d08b`
- Attempt: 1
- Written (UTC): 2026-11-15T18:10:20.905Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## i18n used-on map is fresh (U4i ②) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
       "/post/$listingId"
     ],
     "post.field.required": [
+      "/admin/countries",
       "/admin/listings/$listingId",
       "/admin/listings/$listingId/edit",
       "/admin/screening",
@@ -6659,6 +6660,7 @@
       "/post/$listingId"
     ],
     "post.optional": [
+      "/admin/countries",
       "/admin/listings/$listingId",
       "/admin/listings/$listingId/edit",
       "/admin/screening",
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index c106332..b2f94f0 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 727,
+  "scanned": 726,
   "dynamicCallSites": 425,
   "keys": {
     "account.deactivatedBanner": [
@@ -6539,6 +6539,7 @@
       "/post/$listingId"
     ],
     "post.field.required": [
+      "/admin/countries",
       "/admin/listings/$listingId",
       "/admin/listings/$listingId/edit",
       "/admin/screening",
@@ -6659,6 +6660,7 @@
       "/post/$listingId"
     ],
     "post.optional": [
+      "/admin/countries",
       "/admin/listings/$listingId",
       "/admin/listings/$listingId/edit",
       "/admin/screening",
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/299894fa-c1a8-4cde-8e04-8dcb871b5f3c' before making global git config changes
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

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
Per-page budget failed (D234):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    292.8 / 294 KiB  /admin/impersonation_/$sessionId
    282.0 / 283 KiB  /admin/legal
    279.1 / 280 KiB  /admin/legal_/$versionId
    281.1 / 282 KiB  /admin/legal_/edit
    348.1 / 349 KiB  /admin/listings
    352.5 / 353 KiB  /admin/listings_/$listingId
    411.0 / 411 KiB  /admin/listings_/$listingId_/edit
    269.3 / 271 KiB  /admin/locations
    333.1 / 334 KiB  /admin/monetisation
    328.4 / 329 KiB  /admin/places
    294.1 / 295 KiB  /admin/roles
    273.5 / 274 KiB  /admin/roles_/$roleId
    369.1 / 370 KiB  /admin/screening
    305.3 / 306 KiB  /admin/translations
    308.7 / 310 KiB  /admin/translations_/$lang
    293.0 / 294 KiB  /admin/users
    289.6 / 290 KiB  /admin/users_/$userId
    219.7 / 223 KiB  /auth
    207.2 / 209 KiB  /auth_/callback
    209.1 / 211 KiB  /auth_/reset
    225.0 / 227 KiB  /c/$slug
    225.1 / 226 KiB  /dev/primitives
    246.2 / 248 KiB  /dev/style
    204.0 / 206 KiB  /dev/tall
    255.6 / 257 KiB  /l/$slug
    208.4 / 210 KiB  /legal/$kind
    214.7 / 217 KiB  /legal/accept
    209.1 / 211 KiB  /legal/publishing
    312.4 / 315 KiB  /my-listings
    319.9 / 323 KiB  /my-listings_/$listingId
    403.1 / 404 KiB  /my-listings_/$listingId_/edit
    403.1 / 404 KiB  /post
    403.1 / 404 KiB  /post_/$listingId
    208.4 / 210 KiB  /privacy
    274.3 / 277 KiB  /settings
    208.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

Per-page budget failed (D234):
  /admin/countries: 328.9 KiB, over its ceiling of 328 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/952eb4fd-46c7-42c2-b4fa-3b7ad9afcbe8' before making global git config changes
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
