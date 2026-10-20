# Local backend proof (non-gating)

- Commit: `cf1dc2ed8fc702943c5595bbe61a6db1b6651761`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39380756583
- CLI version: 2.120.0
- Seconds — checkout: 1
- Seconds — install: 5
- Seconds — CLI install: 5
- Seconds — working copy: 0
- Seconds — start (migrations included): 62
- Seconds — build: not run
- Seconds — browser install: not run
- Seconds — tests: not run
- Migrations: not confirmed; backend failure

## Migration/start failure
Last migration line: Applying migration 20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql...
```text
d0b84d5f07f5: Pull complete
2271b8d67cdb: Pull complete
92c57cef4d95: Pull complete
9bad77f51394: Pull complete
6d07fafc16fc: Pull complete
02b1eb22dea5: Pull complete
95e2e129052b: Pull complete
3bc958d77632: Pull complete
c91d81325bd0: Pull complete
434c95230705: Pull complete
4bc1415e9b24: Pull complete
8d0d2729c399: Pull complete
0b67f6a8a496: Pull complete
Digest: sha256:b15d862126dd2dac02da524696ccfde2dcce2ceaee0a58973b2727befe492706
Status: Downloaded newer image for public.ecr.aws/supabase/postgres:17.11.0.004
public.ecr.aws/supabase/postgres:17.11.0.004
23af072915d6: Pull complete
9f5e13364d13: Pull complete
4c76576d4885: Pull complete
fb9dd83d9835: Pull complete
Digest: sha256:6a32896ae2d1ae2ea2d05ecaf6ed6c8a6b091739b469a8cf860ee89b2604d28f
Status: Downloaded newer image for public.ecr.aws/supabase/storage-api:v1.79.36
public.ecr.aws/supabase/storage-api:v1.79.36
Starting database...
Initialising schema...
Seeding globals from roles.sql...
Applying migration 00000000000000_ci_local_buckets.sql...
Applying migration 20260729110912_c29de7fc-14ab-4e01-846d-923809a3cb09.sql...
Applying migration 20260730015333_87dbf472-b8ca-4e8d-b9d9-d48fd13278e8.sql...
Applying migration 20260730021240_a0dbaf49-19a0-4761-a3f3-2a1f85117528.sql...
Applying migration 20260730094625_8d30a5fc-2ce1-4a0a-b4c1-931911a09076.sql...
Applying migration 20260803075756_47bf56ca-eb85-4c8b-8e62-1f95cb9af2a6.sql...
Applying migration 20260803100407_e0cb3ef4-5240-48db-8a73-d6f983137eab.sql...
Applying migration 20260804133231_85cf6673-6143-4591-ba21-1bf72eb32b9f.sql...
Applying migration 20260804150657_2590f763-40da-4c2e-b27b-0682d8c1bbbd.sql...
Applying migration 20260804152522_4390ce57-1901-4239-8e26-301f70df3ed5.sql...
Applying migration 20260804174739_0ce87c13-1bf0-4cc8-8d61-8dd8212d961c.sql...
Applying migration 20260804213701_568c7e33-e5e6-4700-b3a4-b3ab731ecf32.sql...
Applying migration 20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql...
Stopping containers...
ERROR: bootstrap failed: no auth.users row for tesfayekb@gmail.com (SQLSTATE P0001)
At statement: 74
-- BOOTSTRAP: operator becomes super_admin, or the migration fails loudly.
DO $bootstrap$
DECLARE v_uid uuid;
BEGIN
  SELECT id INTO v_uid FROM auth.users WHERE email = 'tesfayekb@gmail.com';
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'bootstrap failed: no auth.users row for tesfayekb@gmail.com';
  END IF;

  INSERT INTO public.user_roles (user_id, role_id, scope_type)
  VALUES (v_uid, (SELECT id FROM public.roles WHERE name = 'super_admin'), 'global')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (NULL, 'role.bootstrap_super_admin', 'user_roles', v_uid::text,
          jsonb_build_object('role','super_admin','source','migration bootstrap'));
END $bootstrap$
Try rerunning the command with --debug to troubleshoot the error.
```
- Smoke: 0 passed · 0 failed · 0 flaky · 0 skipped · total 0
- Job conclusion before evidence publication: failure
- Backend/build/smoke: failure/skipped/skipped

## Failing/flaky tests and setup errors
- No JSON results; smoke skipped

DEC-209: compare with staging CI on this same commit; two consecutive dev proofs required. No automatic proceed verdict.
