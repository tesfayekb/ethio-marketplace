-- Cursor bundle 5, ACT-032 — THE LIVE ROLE RULES check-doors judges beside scripts/doors/staff-rules.txt
-- on the smoke lane. `bun scripts/doors/check-doors.ts --live-staff-rules-query` prints this file as it
-- is; the workflow (local-backend-proof.yml, step "Door guard, live") runs it through psql -At -F tab
-- and hands the TSV to `--live <doors tsv> <grants tsv> <this tsv>` (staff-rules.ts liveRoleRules: one
-- row per standing policy of ANY schema whose condition calls has_permission(, has_permission_scoped(
-- or is_super_admin( — schema, table, policy, command, the roles it names sorted and comma-joined). The
-- same definition as the migrations' census (policies.ts roleRulesOf), read from pg_policies, so a rule
-- the files cannot show (one created by computed text, one a migration's EXECUTE wrote) is judged too.
-- A query is a file read verbatim, never a string code assembles (INC-1070).
select p.schemaname,
       p.tablename,
       p.policyname,
       p.cmd,
       (select string_agg(lower(r), ',' order by lower(r)) from unnest(p.roles) as r)
from pg_policies p
where coalesce(p.qual, '') || ' ' || coalesce(p.with_check, '') ~* '\m(has_permission|has_permission_scoped|is_super_admin)\s*\('
order by 1, 2, 3;
