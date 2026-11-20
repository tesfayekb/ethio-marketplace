# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44669438676
- Commit: `0d414b54aaac414665b6635cd37167b16489b1e9`
- Attempt: 1
- Written (UTC): 2026-11-20T03:59:29.543Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  - 20261120030600_002796c4-63a2-4cd4-bc6f-490a2eae9207.sql
  - 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql
STAGING BEHIND: apply 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 25 of 28)
STAGING BEHIND: apply 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261120030000_74954b0b-69a8-477c-b386-22a02c7f9e96.sql
  - 20261120030100_e6a3d930-2cda-4e6e-a225-f2ed40682e86.sql
  - 20261120030200_888c0aec-7982-478b-bafb-cfac71707068.sql
  - 20261120030300_6e8a509c-22c6-4ab5-b2a4-eb4fa6bf6f9e.sql
  - 20261120030400_b2c15e1f-1190-4407-af35-f3f5b8aef264.sql
  - 20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql
  - 20261120030600_002796c4-63a2-4cd4-bc6f-490a2eae9207.sql
  - 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql
STAGING BEHIND: apply 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 26 of 28)
STAGING BEHIND: apply 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261120030000_74954b0b-69a8-477c-b386-22a02c7f9e96.sql
  - 20261120030100_e6a3d930-2cda-4e6e-a225-f2ed40682e86.sql
  - 20261120030200_888c0aec-7982-478b-bafb-cfac71707068.sql
  - 20261120030300_6e8a509c-22c6-4ab5-b2a4-eb4fa6bf6f9e.sql
  - 20261120030400_b2c15e1f-1190-4407-af35-f3f5b8aef264.sql
  - 20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql
  - 20261120030600_002796c4-63a2-4cd4-bc6f-490a2eae9207.sql
  - 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql
STAGING BEHIND: apply 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 27 of 28)
STAGING BEHIND: apply 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261120030000_74954b0b-69a8-477c-b386-22a02c7f9e96.sql
  - 20261120030100_e6a3d930-2cda-4e6e-a225-f2ed40682e86.sql
  - 20261120030200_888c0aec-7982-478b-bafb-cfac71707068.sql
  - 20261120030300_6e8a509c-22c6-4ab5-b2a4-eb4fa6bf6f9e.sql
  - 20261120030400_b2c15e1f-1190-4407-af35-f3f5b8aef264.sql
  - 20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql
  - 20261120030600_002796c4-63a2-4cd4-bc6f-490a2eae9207.sql
  - 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql
STAGING BEHIND: apply 20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 28 of 28)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.1
Temporarily overriding HOME='/home/runner/work/_temp/eed2391a-1a82-4f00-9d20-c81b0d848bfe' before making global git config changes
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
