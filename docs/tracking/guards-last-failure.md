# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37516268594
- Commit: `1c1c9e6b34b4deeed018bdf838784f2b7cad9776`
- Attempt: 1
- Written (UTC): 2026-10-06T19:31:55.990Z

## Dependency vulnerability audit (enforcing on high/critical) — failure

### Evidence lines

```text
##[error]High or critical vulnerabilities reported by 'bun audit'.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+ date-fns@4.1.0
+ embla-carousel-react@8.6.0
+ input-otp@1.4.2
+ jpeg-js@0.4.4
+ leaflet@1.9.4
+ libphonenumber-js@1.11.18
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

542 packages installed [4.50s]
##[group]Run bash scripts/audit-gate.sh
[36;1mbash scripts/audit-gate.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.02ms] ".env"
[0m[1mbun audit [0m[2mv1.3.14 (0d9b296a)[0m
shell-quote  >=1.8.4 <1.11.0
  @lovable.dev/vite-tanstack-config › @tanstack/devtools-vite › launch-editor › shell-quote
  critical: shell-quote: `quote()` command injection via a line terminator in a token after a `{ comment }` token - https://github.com/advisories/GHSA-pqg4-j6r4-53mv

1 vulnerabilities (1 critical)

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
Temporarily overriding HOME='/home/runner/work/_temp/41543624-d95e-4612-a31b-b283683ff22d' before making global git config changes
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
