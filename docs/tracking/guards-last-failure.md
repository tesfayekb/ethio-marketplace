# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41981330085
- Commit: `32554d24e29038f98e02b259e555ffb78fe857cd`
- Attempt: 1
- Written (UTC): 2026-11-05T06:56:22.356Z

## Warnings (non-gating steps that ran, INC-492)

No warning step ran in this run.

## E2E preflight (migration parity, staging) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
  - 20261104154000_fbffa284-2047-41f6-9229-daffa927fc77.sql
  - 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql
STAGING BEHIND: apply 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 25 of 28)
STAGING BEHIND: apply 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261104124957_71cb9d01-2d90-4d9a-8462-ba9de37f34ee.sql
  - 20261104124958_c072fd66-6ee4-46cd-a459-3e6fd577cff3.sql
  - 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql
  - 20261104153957_8816b4c0-d9ac-4624-bd16-3ff4b778ebae.sql
  - 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql
  - 20261104153959_307e79c4-b771-411a-a3da-a71a16bd26bd.sql
  - 20261104154000_fbffa284-2047-41f6-9229-daffa927fc77.sql
  - 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql
STAGING BEHIND: apply 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 26 of 28)
STAGING BEHIND: apply 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261104124957_71cb9d01-2d90-4d9a-8462-ba9de37f34ee.sql
  - 20261104124958_c072fd66-6ee4-46cd-a459-3e6fd577cff3.sql
  - 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql
  - 20261104153957_8816b4c0-d9ac-4624-bd16-3ff4b778ebae.sql
  - 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql
  - 20261104153959_307e79c4-b771-411a-a3da-a71a16bd26bd.sql
  - 20261104154000_fbffa284-2047-41f6-9229-daffa927fc77.sql
  - 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql
STAGING BEHIND: apply 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 27 of 28)
STAGING BEHIND: apply 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql to ethio-staging before E2E can pass
[e2e:preflight] mechanism: public.e2e_migration_ledger() definer RPC (public.migration_marks)
[e2e:preflight] missing migration file(s):
  - 20261104124957_71cb9d01-2d90-4d9a-8462-ba9de37f34ee.sql
  - 20261104124958_c072fd66-6ee4-46cd-a459-3e6fd577cff3.sql
  - 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql
  - 20261104153957_8816b4c0-d9ac-4624-bd16-3ff4b778ebae.sql
  - 20261104153958_12091168-8822-44f3-af3b-e4934de63e2b.sql
  - 20261104153959_307e79c4-b771-411a-a3da-a71a16bd26bd.sql
  - 20261104154000_fbffa284-2047-41f6-9229-daffa927fc77.sql
  - 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql
STAGING BEHIND: apply 20261104154001_0ce62d98-eed1-4485-a3dc-ffa3a9149785.sql to ethio-staging before E2E can pass
[e2e:preflight] staging is behind; waiting 30 s for the operator's apply (attempt 28 of 28)
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.56.0
Temporarily overriding HOME='/home/runner/work/_temp/82c2fd2b-6fbc-4587-bb9b-6480bb93879d' before making global git config changes
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
