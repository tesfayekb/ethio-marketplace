# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36124555614
- Commit: `f56b79c1270125a0d15c891628cb0670dce7d72d`
- Attempt: 2
- Written (UTC): 2026-09-25T11:19:08.130Z

## Build, typecheck, lint — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
+ @tanstack/react-router@1.170.16
+ @tanstack/react-start@1.168.26
+ @tanstack/router-plugin@1.168.18
+ @types/pngjs@6.0.5
+ class-variance-authority@0.7.1
+ clsx@2.1.1
+ cmdk@1.1.1
+ date-fns@4.1.0
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

517 packages installed [2.60s]
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
[[33mwarn[39m] docs/tracking/incidental-findings.md
[[33mwarn[39m] Code style issues found in the above file. Run Prettier with --write to fix.
error: script "format:check" exited with code 1
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/ff6ee5cf-014d-4f47-84a8-ba03922db923' before making global git config changes
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
