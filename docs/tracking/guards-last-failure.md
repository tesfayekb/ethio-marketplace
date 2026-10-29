# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40825655591
- Commit: `7063a72703d92c1420ec06e5a4bc63327a0b1810`
- Attempt: 1
- Written (UTC): 2026-10-29T06:10:15.444Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Build, typecheck, lint — failure

### Evidence lines

```text
[36;1m  *) echo "::error::promote-needs self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+ @types/pngjs@6.0.5
+ class-variance-authority@0.7.1
+ clsx@2.1.1
+ cmdk@1.1.1
+ date-fns@4.1.0
+ embla-carousel-react@8.6.0
+ input-otp@1.4.2
+ jpeg-js@0.4.4
+ leaflet@1.9.4
+ libphonenumber-js@1.11.18
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

542 packages installed [8.77s]
##[group]Run bun run typecheck
[36;1mbun run typecheck[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ tsc --noEmit
##[group]Run bun run format:check
[36;1mbun run format:check[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ prettier --check "src/**" "e2e/**" "docs/**" "*.{json,js,ts,md}"
Checking formatting...
[[33mwarn[39m] src/routes/__root.tsx
[[33mwarn[39m] src/server/first-screen.test.ts
[[33mwarn[39m] Code style issues found in 2 files. Run Prettier with --write to fix.
error: script "format:check" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/5635da7c-a4b0-40e6-9574-045bdbc4326d' before making global git config changes
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
    307.6 / 308 KiB  /admin/impersonation_/$sessionId
    276.6 / 277 KiB  /admin/legal
    276.0 / 277 KiB  /admin/legal_/$versionId
    282.2 / 283 KiB  /admin/legal_/edit
    352.9 / 353 KiB  /admin/listings
    376.3 / 379 KiB  /admin/listings_/$listingId
    399.7 / 403 KiB  /admin/listings_/$listingId_/edit

Per-page budget failed (D234):
  /admin/ai: 332.4 KiB, over its ceiling of 331 KiB
  /admin/places: 338.0 KiB, over its ceiling of 338 KiB
  /admin/translations: 408.2 KiB, over its ceiling of 408 KiB

Code-split the addition behind a dynamic import, or change the page's line in
scripts/route-budgets.mjs in a commit that states why (a saving lowers it).
    268.6 / 270 KiB  /admin/locations
    338.0 / 338 KiB  /admin/places
    305.1 / 306 KiB  /admin/roles
    305.7 / 306 KiB  /admin/roles_/$roleId
    374.2 / 377 KiB  /admin/screening
    408.2 / 408 KiB  /admin/translations
    319.8 / 320 KiB  /admin/translations_/$lang
    303.5 / 304 KiB  /admin/users
    284.0 / 285 KiB  /admin/users_/$userId
    218.7 / 219 KiB  /auth
    207.0 / 208 KiB  /auth_/callback
    209.1 / 210 KiB  /auth_/reset
    219.5 / 220 KiB  /c/$slug
    221.9 / 223 KiB  /dev/primitives
    241.0 / 242 KiB  /dev/style
    206.4 / 207 KiB  /dev/tall
    247.8 / 251 KiB  /l/$slug
    209.9 / 211 KiB  /legal/$kind
    217.6 / 218 KiB  /legal/accept
    210.6 / 212 KiB  /legal/publishing
    326.6 / 327 KiB  /my-listings
    315.5 / 316 KiB  /my-listings_/$listingId
    394.4 / 397 KiB  /my-listings_/$listingId_/edit
    394.4 / 397 KiB  /post
    394.3 / 397 KiB  /post_/$listingId
    209.9 / 211 KiB  /privacy
    269.8 / 271 KiB  /settings
    209.9 / 211 KiB  /terms
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/13b0f534-7433-4bb8-b651-07ef9de0b73c' before making global git config changes
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
[36;1mgit diff --exit-code -- docs/generated/i18n-usage.json public/i18n-usage.json[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
diff --git a/docs/generated/i18n-usage.json b/docs/generated/i18n-usage.json
index 1be244a..7f6b0ee 100644
--- a/docs/generated/i18n-usage.json
+++ b/docs/generated/i18n-usage.json
@@ -4754,7 +4754,6 @@
     ],
     "common.loadFailed": [
       "(every page)",
-      "/admin/ai",
       "/admin/audit",
       "/admin/listings",
       "/admin/listings/$listingId",
@@ -4795,7 +4794,6 @@
     ],
     "common.refreshPage": [
       "(every page)",
-      "/admin/ai",
       "/admin/audit",
       "/admin/listings",
       "/admin/listings/$listingId",
diff --git a/public/i18n-usage.json b/public/i18n-usage.json
index 1be244a..7f6b0ee 100644
--- a/public/i18n-usage.json
+++ b/public/i18n-usage.json
@@ -4754,7 +4754,6 @@
     ],
     "common.loadFailed": [
       "(every page)",
-      "/admin/ai",
       "/admin/audit",
       "/admin/listings",
       "/admin/listings/$listingId",
@@ -4795,7 +4794,6 @@
     ],
     "common.refreshPage": [
       "(every page)",
-      "/admin/ai",
       "/admin/audit",
       "/admin/listings",
       "/admin/listings/$listingId",
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/9b680db4-8824-4ab6-9b41-7b0aadc43f74' before making global git config changes
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
