# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36757197211
- Commit: `6de849445b10eb5f28d87b067a0b6401d2ef15c9`
- Attempt: 1
- Written (UTC): 2026-09-30T18:30:12.563Z

## Dependency vulnerability audit (enforcing on high/critical) — failure

### Evidence lines

```text
##[error]High or critical vulnerabilities reported by 'bun audit'.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+ embla-carousel-react@8.6.0
+ input-otp@1.4.2
+ jpeg-js@0.4.4
+ leaflet@1.9.4
+ lucide-react@0.575.0
+ pngjs@7.0.0
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
+ zod@3.25.76

519 packages installed [3.79s]
##[group]Run bash scripts/audit-gate.sh
[36;1mbash scripts/audit-gate.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.03ms] ".env"
[0m[1mbun audit [0m[2mv1.3.14 (0d9b296a)[0m
brace-expansion  <1.1.19
  eslint › @eslint/eslintrc › minimatch › brace-expansion
  typescript-eslint › @typescript-eslint/utils › @typescript-eslint/typescript-estree › minimatch › brace-expansion
  high: brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack exhaustion - https://github.com/advisories/GHSA-6j4f-fj2g-mc7p
  high: brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion - https://github.com/advisories/GHSA-qhr7-859c-m2p7

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
Temporarily overriding HOME='/home/runner/work/_temp/5a39956a-248e-494b-ab83-d33cf83fd6ce' before making global git config changes
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
