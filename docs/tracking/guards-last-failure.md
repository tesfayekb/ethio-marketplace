# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42590473841
- Commit: `d96c341fe430983bdb3581f8bdcb86718b6d0330`
- Attempt: 1
- Written (UTC): 2026-11-09T09:29:49.800Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 21 of 28)
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 22 of 28)
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 23 of 28)
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 24 of 28)
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 25 of 28)
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 26 of 28)
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 27 of 28)
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql
STAGING BEHIND: apply 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 28 of 28)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/dcf5a2b3-6360-4daa-b4d7-8ae8b353b2a5' before making global git config changes
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
