-- Cursor bundle 1, item 6 (INC-1166, second half) — THE LIVE GRANTS check-doors judges beside the
-- open rules of scripts/doors/open-rules.txt on the smoke lane. `bun scripts/doors/check-doors.ts
-- --live-open-rules-query` prints this file as it is; the workflow (local-backend-proof.yml, step
-- "Door guard, live") runs it through psql -At -F tab and hands the TSV to `--live <doors tsv>
-- <this tsv>` (open-rules.ts liveGrants: one row per table of schema public, browser role and
-- privilege the role holds — table, role, privilege, then `*` for the table's own privilege or the
-- columns it holds the privilege on, comma-joined and sorted). A privilege held by column alone shows
-- its columns: has_table_privilege alone would read such a table as closed (INC-1166's second half;
-- level_overrides and market_settings hold column-level SELECT and no table-level one). A query is a
-- file read verbatim, never a string code assembles (INC-1070).
select c.relname,
       r.rolname,
       g.priv,
       x.cols
from pg_class c
cross join (values ('anon'), ('authenticated')) as r(rolname)
cross join (values ('DELETE'), ('INSERT'), ('REFERENCES'), ('SELECT'), ('TRIGGER'), ('TRUNCATE'), ('UPDATE')) as g(priv)
cross join lateral (
  select case
    when has_table_privilege(r.rolname, c.oid, g.priv) then '*'
    when g.priv in ('INSERT', 'REFERENCES', 'SELECT', 'UPDATE') then (
      select string_agg(a.attname, ',' order by a.attname)
      from pg_attribute a
      where a.attrelid = c.oid and a.attnum > 0 and not a.attisdropped
        and has_column_privilege(r.rolname, c.oid, a.attnum, g.priv))
  end as cols) as x
where c.relnamespace = 'public'::regnamespace and c.relkind in ('p', 'r') and x.cols is not null
order by 1, 2, 3;
