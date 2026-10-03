# Guards & build — last failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37084410165
- Commit: `47f961411a59885e0acd7a33b1fe7f6298b895c7`
- Attempt: 1
- Written (UTC): 2026-10-03T01:18:45.676Z

## Migration linter (with self-test) — failure

### Evidence lines

```text
##[error]Process completed with exit code 1.
```

### Tail (last 60 lines)

```text
Policies closed later (allowlisted): 20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql | closed by 37a1e9bc
Self-test OK: definer-without-revoke sample correctly flagged:
  - /tmp/tmp.UyA8TvPOPs (SECURITY DEFINER without in-file REVOKE: self_test_definer)
Self-test OK: allowlisted file skipped and printed:
Definer guard: allowlisted files (each cites its closer)
  - 29990101000000_allowlisted-sample.sql (self-test: tool split placed the REVOKE in the next file | closed by deadbeef)
Self-test OK: unmarked-migration sample correctly flagged:
  - /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/fixtures/bad-unmarked-migration-example.sql (no INSERT INTO public.migration_marks)
SELF_TEST mode: self-tests passed; skipping real scan.
##[group]Run bash scripts/check-migrations.sh
[36;1mbash scripts/check-migrations.sh[0m
[36;1mbun run scripts/e2e-migration-preflight.ts --self-test[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
Self-test OK: bad fixture correctly flagged.
Self-test OK: closer-cited exemption fails without the cited policy, passes with it.
Policies closed later (allowlisted): 20260924090042_ac3b25ed-08df-471d-8bb8-c36ef06be517.sql | closed by 37a1e9bc
Policies closed later (allowlisted): 20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql | closed by 37a1e9bc
Self-test OK: definer-without-revoke sample correctly flagged:
  - /tmp/tmp.80PdwgCfvJ (SECURITY DEFINER without in-file REVOKE: self_test_definer)
Self-test OK: allowlisted file skipped and printed:
Definer guard: allowlisted files (each cites its closer)
  - 29990101000000_allowlisted-sample.sql (self-test: tool split placed the REVOKE in the next file | closed by deadbeef)
Self-test OK: unmarked-migration sample correctly flagged:
  - /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/fixtures/bad-unmarked-migration-example.sql (no INSERT INTO public.migration_marks)
Definer guard: grandfathered files skipped (pre-20260810000000):
  - 20260804133231_85cf6673-6143-4591-ba21-1bf72eb32b9f.sql (grandfathered)
  - 20260730094625_8d30a5fc-2ce1-4a0a-b4c1-931911a09076.sql (grandfathered)
  - 20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql (grandfathered)
  - 20260804174739_0ce87c13-1bf0-4cc8-8d61-8dd8212d961c.sql (grandfathered)
  - 20260809010922_edef5653-e1b6-40a8-b8a0-920ada89db08.sql (grandfathered)
  - 20260803075756_47bf56ca-eb85-4c8b-8e62-1f95cb9af2a6.sql (grandfathered)
  - 20260803100407_e0cb3ef4-5240-48db-8a73-d6f983137eab.sql (grandfathered)
  - 20260809061244_e2830ce7-06c8-4720-af53-4009336c4c86.sql (grandfathered)
  - 20260730015333_87dbf472-b8ca-4e8d-b9d9-d48fd13278e8.sql (grandfathered)
Definer guard: allowlisted files (each cites its closer)
  - 20260908041703_62e6566c-a1c9-4212-a78b-c68e0bf95169.sql (DEC-045a redeclared admin_delete_attribute, admin_unlink_attribute and admin_merge_attributes without restating their REVOKE/GRANT; window closed by the DEC-045a-fix corrective (ACL read-back loop in file) | closed by d9267b5f)
  - 20260903044526_7e14ce39-76a6-4095-845b-e5d6e83d772c.sql (admin_create_category REVOKE restated in C2e corrective | closed by 63df0b68)
  - 20260831064939_4a00896e-bc69-4919-bb1e-8181a7e65034.sql (tool split placed the REVOKE in the next file; window closed by paired apply | closed by f18f1883)
  - 20260907050122_84bead12-f50a-4e83-b3e5-e7bc34a0ec21.sql (C3-UX-2 redeclared five entity-translation definers without restating their grants; window closed by the C3-UX-2b corrective (read-back in file) | closed by 2dcafad6)
Definer guard OK.
Self-marking guard FAILED: 1 file(s) do not self-mark into public.migration_marks:
  - supabase/migrations/20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql (declared mark '20261003000000' precedes its filename stamp '20261003005802')
##[error]Process completed with exit code 1.
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/30d4ba4f-5982-4dc4-9a59-84352afce7dc' before making global git config changes
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
