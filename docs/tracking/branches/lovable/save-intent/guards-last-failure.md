# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44194618990
- Commit: `8e1cd9051d9d138bd31259588956336fe9855a1b`
- Attempt: 1
- Written (UTC): 2026-11-17T23:21:32.307Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Dependency vulnerability audit (enforcing on high/critical) — failure

### Evidence lines

```text
##[error]High or critical vulnerabilities reported by 'bun audit'.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+ lucide-react@0.575.0
+ pngjs@7.0.0
+ qrcode-generator@2.0.4
+ react@19.2.5
+ react-day-picker@9.14.0
+ react-dom@19.2.5
+ react-hook-form@7.73.1
+ react-resizable-panels@4.10.0
+ recharts@2.15.4
+ sonner@2.0.7
+ tailwind-merge@3.5.0
+ tailwindcss@4.2.4
+ tw-animate-css@1.4.0
+ vaul@1.1.2
+ vite-tsconfig-paths@6.1.1
+ zod@4.6.7

542 packages installed [2.05s]
##[group]Run bash scripts/audit-gate.sh
[36;1mbash scripts/audit-gate.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.06ms] ".env"
[0m[1mbun audit [0m[2mv1.3.14 (0d9b296a)[0m
picomatch  <=4.0.7
  vite › tinyglobby › fdir › picomatch
  vitest › tinyglobby › fdir › picomatch
  @lovable.dev/vite-tanstack-config › @tanstack/devtools-vite › picomatch
  @tanstack/react-start › @tanstack/start-plugin-core › picomatch
  @tanstack/router-plugin › @tanstack/router-utils › tinyglobby › fdir › picomatch
  typescript-eslint › @typescript-eslint/utils › @typescript-eslint/typescript-estree › tinyglobby › fdir › picomatch
  high: picomatch vulnerable to ReDoS through single-branch repeated extglobs - https://github.com/advisories/GHSA-fc5q-39xc-vjpf

1 vulnerabilities (1 high)

To update all dependencies to the latest compatible versions:
  bun update

To update all dependencies to the latest versions (including breaking changes):
  bun update --latest

##[error]High or critical vulnerabilities reported by 'bun audit'.
Review docs/features/dependency-audit.md, then remediate or record a ruling.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/ff03bdae-b3b1-4f9a-aa76-343f9c8112b4' before making global git config changes
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
[command]/usr/bin/unzip -o -q /home/runner/work/_temp/b17ce719-c5a4-4089-8510-322dcd7582a2.zip
[command]/home/runner/.bun/bin/bun --revision
1.4.4+38afee6c8
##[group]Run bun run i18n:usage
[36;1mbun run i18n:usage[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ bun run scripts/i18n-usage-map.ts
i18n usage map: 1848 keys across 732 files (426 dynamic call sites)
##[group]Run git diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json
[36;1mgit diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
diff --git a/docs/generated/i18n-usage.json b/docs/generated/i18n-usage.json
index 26e94b6..3f0ef39 100644
--- a/docs/generated/i18n-usage.json
+++ b/docs/generated/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 731,
+  "scanned": 732,
   "dynamicCallSites": 426,
   "keys": {
     "account.deactivatedBanner": [
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index 26e94b6..3f0ef39 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -1,6 +1,6 @@
 {
   "generator": "scripts/i18n-usage-map.ts",
-  "scanned": 731,
+  "scanned": 732,
   "dynamicCallSites": 426,
   "keys": {
     "account.deactivatedBanner": [
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/0a55fb0a-a541-4df8-b2b9-8bd2e7f2509d' before making global git config changes
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
NEAR band failed (DEC-296):
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
    347.1 / 348 KiB  /admin/categories
    305.7 / 309 KiB  /admin/countries
    208.7 / 210 KiB  /admin/images
    291.4 / 293 KiB  /admin/impersonation_/$sessionId
    284.2 / 285 KiB  /admin/legal
    280.8 / 282 KiB  /admin/legal_/$versionId
    282.9 / 284 KiB  /admin/legal_/edit
    328.1 / 329 KiB  /admin/listings
    329.1 / 330 KiB  /admin/listings_/$listingId
    411.1 / 412 KiB  /admin/listings_/$listingId_/edit
    269.3 / 271 KiB  /admin/locations
    312.3 / 313 KiB  /admin/monetisation
    306.2 / 310 KiB  /admin/places
    294.4 / 295 KiB  /admin/roles
    274.6 / 275 KiB  /admin/roles_/$roleId
    345.1 / 348 KiB  /admin/screening
    305.7 / 306 KiB  /admin/translations
    308.4 / 309 KiB  /admin/translations_/$lang
    291.6 / 293 KiB  /admin/users
    291.7 / 293 KiB  /admin/users_/$userId
    219.8 / 223 KiB  /auth
    207.2 / 209 KiB  /auth_/callback
    209.2 / 211 KiB  /auth_/reset
    225.0 / 227 KiB  /c/$slug
    227.3 / 228 KiB  /dev/primitives
    247.4 / 248 KiB  /dev/style
    204.0 / 206 KiB  /dev/tall
    256.2 / 257 KiB  /l/$slug
    208.4 / 210 KiB  /legal/$kind
    214.8 / 217 KiB  /legal/accept
    209.2 / 211 KiB  /legal/publishing
    311.0 / 315 KiB  /my-listings
    321.7 / 323 KiB  /my-listings_/$listingId
    403.3 / 404 KiB  /my-listings_/$listingId_/edit
    403.2 / 404 KiB  /post
    403.2 / 404 KiB  /post_/$listingId
    208.4 / 210 KiB  /privacy
    274.3 / 277 KiB  /settings
    208.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok

NEAR band failed (DEC-296):
  /admin/translations: 305.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 306 KiB — DEC-296: set it to ceilingFor(size) = 307
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/c1fada6c-b8c9-45a6-ae9b-dd57d194a3aa' before making global git config changes
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
