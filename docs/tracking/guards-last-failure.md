# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40084153912
- Commit: `eefd1141f3d031bd9112baec2fc88b308421f395`
- Attempt: 1
- Written (UTC): 2026-10-24T10:17:50.236Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## First-paint bundle budget (gzipped ceiling) — failure

### Evidence lines

```text
[warn] `inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
dist/server/_ssr/app-rail-CT_osGPB.mjs                           55.87 kB │ gzip:  16.56 kB
dist/server/_ssr/server-BuSttrNZ.mjs                             59.33 kB │ gzip:  15.46 kB
dist/server/_libs/@radix-ui/react-dropdown-menu+[...].mjs        61.73 kB │ gzip:  12.23 kB
dist/server/_ssr/category-dialogs-v0DGeRji.mjs                   62.23 kB │ gzip:  14.79 kB
dist/server/index.mjs                                            62.32 kB │ gzip:  14.23 kB
dist/server/_libs/tanstack__query-core.mjs                       74.06 kB │ gzip:  15.48 kB
dist/server/_ssr/admin.categories-Cmdsw8uA.mjs                   74.27 kB │ gzip:  17.74 kB
dist/server/_libs/supabase__realtime-js+unenv.mjs                78.40 kB │ gzip:  20.05 kB
dist/server/_ssr/listing-detail-CYxIMvdE.mjs                     79.61 kB │ gzip:  19.88 kB
dist/server/_ssr/admin.translations_._lang-DivKrGk2.mjs          81.93 kB │ gzip:  18.66 kB
dist/server/_libs/tailwind-merge.mjs                             85.65 kB │ gzip:  15.21 kB
dist/server/_libs/@radix-ui/react-alert-dialog+[...].mjs         86.50 kB │ gzip:  20.34 kB
dist/server/_ssr/attribute-dialogs-Bat65sSI.mjs                  87.51 kB │ gzip:  19.84 kB
dist/server/_libs/date-fns.mjs                                  104.02 kB │ gzip:  18.42 kB
dist/server/_libs/supabase__postgrest-js.mjs                    105.41 kB │ gzip:  21.66 kB
dist/server/_ssr/am-base-WWIbIc47.mjs                           106.02 kB │ gzip:  25.23 kB
dist/server/_ssr/en-admin-H-7Pr_EA.mjs                          111.92 kB │ gzip:  25.34 kB
dist/server/_libs/lucide-react.mjs                              117.13 kB │ gzip:  22.88 kB
dist/server/_libs/@supabase/storage-js+[...].mjs                119.50 kB │ gzip:  22.34 kB
dist/server/_libs/react-day-picker.mjs                          135.36 kB │ gzip:  26.50 kB
dist/server/_ssr/provider-BaFFr07Q.mjs                          137.28 kB │ gzip:  41.15 kB
dist/server/_ssr/am-admin-NOQx8WIR.mjs                          146.71 kB │ gzip:  31.15 kB
dist/server/_libs/zod.mjs                                       156.76 kB │ gzip:  35.67 kB
dist/server/_libs/leaflet.mjs                                   242.42 kB │ gzip:  54.53 kB
dist/server/_libs/supabase__auth-js.mjs                         302.37 kB │ gzip:  60.33 kB
dist/server/_libs/libphonenumber-js.mjs                         317.38 kB │ gzip:  62.73 kB
dist/server/_ssr/router-D9PyKCw_.mjs                            425.89 kB │ gzip: 112.62 kB
dist/server/_ssr/wizard-D_gbJi79.mjs                            493.39 kB │ gzip: 124.46 kB
dist/server/_libs/@tanstack/react-router+[...].mjs              752.27 kB │ gzip: 159.42 kB

[32m✓ built in 985ms[39m
[info] [nitro] Using auto generated worker name: `tesfayekb-ethio-marketplace`
[info] Generated [36mdist/server/wrangler.json[39m
[info] Generated [36m.wrangler/deploy/config.json[39m
[info] Generated [36mdist/client/_headers[39m
[info] Generated [36mdist/nitro.json[39m
[success] [nitro] You can preview this build using `npx vite preview`
[success] [nitro] You can deploy this build using `npx nitro deploy --prebuilt`
##[group]Run node scripts/check-bundle-size.mjs
[36;1mnode scripts/check-bundle-size.mjs[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
Bundle budget: reader-failure-Cnr5tLrW.js must stay lazy (INC-864) but sits in the first-paint closure of index-DK3l1Tks.js.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/71bf3c63-4edc-4e31-9e35-d1f25284527a' before making global git config changes
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

## Build, typecheck, lint — failure

### Evidence lines

```text
##[error]Unexplained deletions in ee0cdc5629a1c641e17b6c3134de65b073d60104..HEAD (INC-076).
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
 * [new branch]        lovable-backup-dev-1788419378 -> origin/lovable-backup-dev-1788419378
 * [new branch]        lovable-sync            -> origin/lovable-sync
 * [new branch]        lovable-sync-1788322342 -> origin/lovable-sync-1788322342
 * [new branch]        lovable-sync-1788764600 -> origin/lovable-sync-1788764600
 * [new branch]        lovable-sync-1789741128 -> origin/lovable-sync-1789741128
 * [new branch]        lovable-sync-1790153551 -> origin/lovable-sync-1790153551
 * [new branch]        lovable-sync-1790668701 -> origin/lovable-sync-1790668701
 * [new branch]        lovable-sync-1790806349 -> origin/lovable-sync-1790806349
 * [new branch]        lovable-sync-1790807903 -> origin/lovable-sync-1790807903
 * [new branch]        lovable-sync-1790881191 -> origin/lovable-sync-1790881191
 * [new branch]        lovable-sync-1790889145 -> origin/lovable-sync-1790889145
 * [new branch]        main                    -> origin/main
[command]/usr/bin/git branch --list --remote origin/dev
  origin/dev
[command]/usr/bin/git rev-parse refs/remotes/origin/dev
eefd1141f3d031bd9112baec2fc88b308421f395
##[endgroup]
##[group]Determining the checkout info
##[endgroup]
[command]/usr/bin/git sparse-checkout disable
[command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
##[group]Checking out the ref
[command]/usr/bin/git checkout --progress --force -B dev refs/remotes/origin/dev
Switched to a new branch 'dev'
branch 'dev' set up to track 'origin/dev'.
##[endgroup]
[command]/usr/bin/git log -1 --format=%H
eefd1141f3d031bd9112baec2fc88b308421f395
##[group]Run SELF_TEST=1 bash scripts/check-deletions.sh
[36;1mSELF_TEST=1 bash scripts/check-deletions.sh[0m
[36;1mbash scripts/check-deletions.sh[0m
shell: /usr/bin/bash -e {0}
env:
  GITHUB_EVENT_BEFORE: ee0cdc5629a1c641e17b6c3134de65b073d60104
##[endgroup]
Self-test OK: undeclared deletion flagged, marker-declared allowed, additions allowed; manifest door (INC-192): an ADDED path line declares, a pre-existing line does not.
##[error]Unexplained deletions in ee0cdc5629a1c641e17b6c3134de65b073d60104..HEAD (INC-076).
The following files were deleted with no [intentional-delete] marker in any commit
message and no path line added to docs/tracking/intentional-deletions.txt by this range:
src/features/legal/legal-page-data.test.ts
If the removal is intended, say so in the commit message or add the path to
docs/tracking/intentional-deletions.txt in the same push; otherwise you are pushing from a stale
checkout and are about to erase someone's work.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/1389b641-e911-4295-a9de-73bd5d2f2343' before making global git config changes
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
