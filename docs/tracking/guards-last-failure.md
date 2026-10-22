# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39711964713
- Commit: `122343deafca749e637ee6c7ff03028d2aec90ec`
- Attempt: 1
- Written (UTC): 2026-10-22T02:50:14.650Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Dependency vulnerability audit (enforcing on high/critical) — failure

### Evidence lines

```text
ConnectionClosed: audit request failed
Timeout: audit request failed
ConnectionClosed: audit request failed
##[error]'bun audit' could not reach the advisory service. This gate did NOT run.
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
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
+ zod@3.25.76

543 packages installed [3.41s]
##[group]Run bash scripts/audit-gate.sh
[36;1mbash scripts/audit-gate.sh[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
[0.02ms] ".env"
[0m[1mbun audit [0m[2mv1.3.14 (0d9b296a)[0m
ConnectionClosed: audit request failed
##[warning]'bun audit' transport failure (attempt 1/3); retrying in 20s.
[0.03ms] ".env"
[0m[1mbun audit [0m[2mv1.3.14 (0d9b296a)[0m
Timeout: audit request failed
##[warning]'bun audit' transport failure (attempt 2/3); retrying in 20s.
[0.03ms] ".env"
[0m[1mbun audit [0m[2mv1.3.14 (0d9b296a)[0m
ConnectionClosed: audit request failed
##[error]'bun audit' could not reach the advisory service. This gate did NOT run.
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/01cd20dc-5734-405a-a33d-1e39fe30b46c' before making global git config changes
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
