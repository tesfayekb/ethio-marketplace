-- Foundations 1 (DEC-333 / DEC-334, INC-1070) — THE LIVE CATALOGUE check-doors judges on the
-- smoke lane. `bun scripts/doors/check-doors.ts --live-query` prints this file as it is; the
-- workflow (local-backend-proof.yml, step "Door guard, live") runs it through psql -At -F tab and
-- hands the TSV to `--live <tsv>` (rows.ts liveRows: one row per function of schema public —
-- key, volatility, definer, anon, authenticated, trigger, definition with comments stripped and
-- whitespace folded to one space). A query is a file read verbatim, never a string code
-- assembles (INC-1070: fragments joined without their boundaries died on the first execution).
select p.oid::regprocedure::text,
       p.provolatile,
       case when p.prosecdef then 't' else 'f' end,
       case when has_function_privilege('anon', p.oid, 'EXECUTE') then 't' else 'f' end,
       case when has_function_privilege('authenticated', p.oid, 'EXECUTE') then 't' else 'f' end,
       case when p.prorettype in ('trigger'::regtype, 'event_trigger'::regtype) then 't' else 'f' end,
       regexp_replace(regexp_replace(regexp_replace(pg_get_functiondef(p.oid), '/\*.*?\*/', ' ', 'g'), '--[^' || chr(10) || ']*', ' ', 'g'), '\s+', ' ', 'g')
from pg_proc p
where p.pronamespace = 'public'::regnamespace and p.prokind = 'f'
  and not exists (select 1 from pg_depend d where d.classid = 'pg_proc'::regclass and d.objid = p.oid and d.deptype = 'e')
order by 1;
