# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40134574429
- Commit: `258db9490eef2b14f94f9d82039b14470d6719f2`
- Attempt: 1
- Written (UTC): 2026-10-24T21:50:58.669Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## Build, typecheck, lint — failure

### Evidence lines

```text
[36;1m  *) echo "::error::promote-needs self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
[36;1m  *) echo "::error::actionlint self-test: the bad fixture failed for another reason"; exit 1 ;;[0m
src/server/imports/route.ts(225,29): error TS2345: Argument of type 'Dial | undefined' is not assignable to parameter of type 'Dial'.
src/server/imports/route.ts(227,56): error TS18048: 'dial' is possibly 'undefined'.
##[error]Process completed with exit code 2.
```

### Tail (last 60 lines)

```text
+ @radix-ui/react-tooltip@1.2.8
+ @supabase/supabase-js@2.110.9
+ @tailwindcss/vite@4.2.4
+ @tanstack/react-query@5.101.1
+ @tanstack/react-router@1.170.41
+ @tanstack/react-start@1.168.60
+ @tanstack/router-plugin@1.168.42
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

542 packages installed [13.18s]
##[group]Run bun run typecheck
[36;1mbun run typecheck[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
$ tsc --noEmit
src/server/imports/route.ts(225,29): error TS2345: Argument of type 'Dial | undefined' is not assignable to parameter of type 'Dial'.
  Type 'undefined' is not assignable to type 'Dial'.
src/server/imports/route.ts(227,56): error TS18048: 'dial' is possibly 'undefined'.
##[error]Process completed with exit code 2.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/f6f9a428-b7e9-4ddb-894f-a1e09a25aa2f' before making global git config changes
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
