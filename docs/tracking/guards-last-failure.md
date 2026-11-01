# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41301746037
- Commit: `813f973135d8a66ad063a8be55e55185fa1f6f72`
- Attempt: 1
- Written (UTC): 2026-11-01T11:43:53.400Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## i18n used-on map is fresh (U4i ②) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
with:
  bun-version: latest
  no-cache: false
  token: ***
##[endgroup]
Downloading a new version of Bun: https://github.com/oven-sh/bun/releases/download/bun-v1.4.4/bun-linux-x64.zip
[command]/usr/bin/unzip -o -q /home/runner/work/_temp/5e4b113f-86b6-4c50-ab88-c8036a39e819.zip
[command]/home/runner/.bun/bin/bun --revision
1.4.4+38afee6c8
##[group]Run bun run i18n:usage
[36;1mbun run i18n:usage[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ bun run scripts/i18n-usage-map.ts
i18n usage map: 1780 keys across 636 files (408 dynamic call sites)
##[group]Run git diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json
[36;1mgit diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
diff --git a/docs/generated/i18n-usage.json b/docs/generated/i18n-usage.json
index a9fec7d..cf12f43 100644
--- a/docs/generated/i18n-usage.json
+++ b/docs/generated/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 635,
+  "scanned": 636,
   "dynamicCallSites": 408,
   "keys": {
     "account.deactivatedBanner": [
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index a9fec7d..cf12f43 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 635,
+  "scanned": 636,
   "dynamicCallSites": 408,
   "keys": {
     "account.deactivatedBanner": [
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/82eb5d0f-f909-4736-91e2-9311abab3193' before making global git config changes
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
    282.1 / 284 KiB  /admin/legal_/$versionId
    289.0 / 290 KiB  /admin/legal_/edit
    343.4 / 344 KiB  /admin/listings
    384.7 / 387 KiB  /admin/listings_/$listingId
    407.5 / 410 KiB  /admin/listings_/$listingId_/edit
    274.4 / 275 KiB  /admin/locations
    328.2 / 329 KiB  /admin/places
    293.7 / 294 KiB  /admin/roles
    312.7 / 314 KiB  /admin/roles_/$roleId

Per-page budget failed (D234):
  /: 228.8 KiB, over its ceiling of 227 KiB
  /$name: 227.1 KiB, over its ceiling of 225 KiB
  /account_/saved: 227.2 KiB, over its ceiling of 226 KiB
  /c/$slug: 228.8 KiB, over its ceiling of 227 KiB
  /l/$slug: 259.0 KiB, over its ceiling of 257 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
    366.4 / 369 KiB  /admin/screening
    399.7 / 400 KiB  /admin/translations
    308.1 / 309 KiB  /admin/translations_/$lang
    293.4 / 294 KiB  /admin/users
    291.0 / 292 KiB  /admin/users_/$userId
    224.5 / 225 KiB  /auth
    212.7 / 214 KiB  /auth_/callback
    214.8 / 216 KiB  /auth_/reset
    228.8 / 227 KiB  /c/$slug
    229.2 / 230 KiB  /dev/primitives
    237.3 / 238 KiB  /dev/style
    212.0 / 213 KiB  /dev/tall
    259.0 / 257 KiB  /l/$slug
    216.4 / 217 KiB  /legal/$kind
    223.4 / 224 KiB  /legal/accept
    217.2 / 218 KiB  /legal/publishing
    316.5 / 317 KiB  /my-listings
    323.2 / 324 KiB  /my-listings_/$listingId
    402.2 / 404 KiB  /my-listings_/$listingId_/edit
    402.2 / 404 KiB  /post
    402.2 / 404 KiB  /post_/$listingId
    216.4 / 217 KiB  /privacy
    278.1 / 279 KiB  /settings
    216.4 / 217 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/c15ac7e7-ae45-4924-bd7d-1fe23071d138' before making global git config changes
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
