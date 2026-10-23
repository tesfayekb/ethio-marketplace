# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39936643724
- Commit: `6bc6498607fe42d2c5a4ac2827bfd10968cc5516`
- Attempt: 1
- Written (UTC): 2026-10-23T10:34:40.937Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 43 of 50)
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 44 of 50)
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 45 of 50)
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 46 of 50)
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 47 of 50)
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 48 of 50)
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 49 of 50)
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql
STAGING BEHIND: apply 20261023100132_a09c454f-65ba-4170-805d-eda4921dacbe.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 50 of 50)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/575d5b95-2343-44ad-a5ea-edf9495130a1' before making global git config changes
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
