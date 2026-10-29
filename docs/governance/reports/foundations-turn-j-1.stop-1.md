# Foundations turn J-1 — stop 1 (migration applied on ethio-prod)

- Step 0: brief sha256 0d6d61964a6f95ea00f4f034d717f1cc7ad98f3a30440bddc8cc1fd51aea2733 (proven); STRINGS sha256 d33412143ce04b792cb047339ff4c72b429eb80b220353fcc9543d3491520796, 663 bytes (proven).
- INC-1003: 24 ceilings set to floor(CI size + 0.3) + 1. The 16 named pages match the ruling. The other 8 use local + 0.1. The platform commits on its own schedule, so the ceilings went in with the platform's next commit and may not be a commit of their own.
- Migration: apply 4aaa2474 → expect mark 20261030050000. Prod read-back:
  - mark present;
  - name_checks state CHECK includes needs_review;
  - job_runs outcome CHECK includes lost;
  - unusable_streak present;
  - ACLs: job_call, name_check_mark and name_check_queue_page are service_role only; admin_name_check_clear is authenticated + service_role.
  - Proofs NCAP-1…7 and JLOST-1…3 passed in the apply.
  - 2 stale 'dispatched' rows remain; they close as 'lost' on the next job_call.
- File equals the checked draft except for its final newline; check-migrations.sh: Migration guard OK.
- Landed before the stop:
  - Part A: providerSchemaOf derivation; the gateway's parse | shape sub-reason; name_check accepts a null "of"; the ARS census;
  - Part B: [job-refused] lines with JRF-1…6;
  - the queue and health UI (tolerant of the old door) and the strings;
  - docs.
- Still open, after "continue": the job's mapping of an unusable answer to the 'unusable' verdict needs the new function. The admin-screening E2E row has not been added. bun run checks has not been run. The final report is not written.
