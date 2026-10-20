# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39504891051
- Commit: `54dbf7ad3f573f92870033d3044cdc9e19287965`
- Attempt: 1
- Written (UTC): 2026-10-20T22:57:58.807Z

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
+ react-resizable-panels@4.10.0
+ recharts@2.15.4
+ sonner@2.0.7
+ tailwind-merge@3.5.0
+ tailwindcss@4.2.4
+ tw-animate-css@1.4.0
+ vaul@1.1.2
+ vite-tsconfig-paths@6.1.1
+ zod@3.25.76

543 packages installed [3.79s]
##[group]Run bash scripts/audit-gate.sh
[36;1mbash scripts/audit-gate.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.03ms] ".env"
[0m[1mbun audit [0m[2mv1.3.14 (0d9b296a)[0m
vite  >=8.0.0 <=8.1.5
  (direct dependency)
  @lovable.dev/vite-tanstack-config › vite
  @tailwindcss/vite › vite
  @tanstack/react-start › vite
  @tanstack/router-plugin › vite
  @vitejs/plugin-react › vite
  nitro › vite
  vite-tsconfig-paths › vite
  vitest › @vitest/mocker › vite
  high: launch-editor: `fs.existsSync()` existence check can be bypassed on Windows - https://github.com/advisories/GHSA-587h-7wmj-h5pm

launch-editor  <=2.14.1
  @lovable.dev/vite-tanstack-config › @tanstack/devtools-vite › launch-editor
  high: launch-editor: `fs.existsSync()` existence check can be bypassed on Windows - https://github.com/advisories/GHSA-587h-7wmj-h5pm

2 vulnerabilities (2 high)

To update all dependencies to the latest compatible versions:
  bun update

To update all dependencies to the latest versions (including breaking changes):
  bun update --latest

##[error]High or critical vulnerabilities reported by 'bun audit'.
Review docs/features/dependency-audit.md, then remediate or record a ruling.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/10234289-38af-41e8-9443-7ea1ed5eccf0' before making global git config changes
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
