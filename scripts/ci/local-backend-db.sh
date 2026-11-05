# shellcheck shell=bash
# DEC-343 — THE TEMPORARY BACKEND'S DATABASE STEPS, ONE COPY FOR CI AND db:proof. Sourced (never run) by
# local-backend-proof.yml's "Start backend and apply all migrations" step and by scripts/db-proof.sh,
# after DATABASE_CONTAINER names the stack's database container. Each caller keeps its own order
# (DEC-313: hold → apply → capture on failure → restore → ledger); a function that refuses writes its
# line to $LOCAL_BACKEND_FAILURE and returns 1. Lines for the evidence go to $LOCAL_BACKEND_STATUS.
LOCAL_BACKEND_STATUS="${LOCAL_BACKEND_STATUS:-local-backend-status.txt}"
LOCAL_BACKEND_FAILURE="${LOCAL_BACKEND_FAILURE:-local-backend-failure.txt}"

# The database's own superuser, inside the container; the temporary backend only.
admin_sql() { docker exec "$DATABASE_CONTAINER" psql -U supabase_admin -d postgres -v ON_ERROR_STOP=1 -Atc "$1"; }

# DEC-313 — the database's own superuser changes two reloadable settings for this temporary backend
# only (production and staging are never touched): pg_cron's jobs and autovacuum are held while the
# migrations apply, so nothing else writes or locks.
hold_background_work() {
  local cron_setting cron_version
  cron_setting=$(admin_sql "select count(*) from pg_settings where name = 'cron.launch_active_jobs'")
  cron_version=$(admin_sql "select coalesce((select default_version from pg_available_extensions where name = 'pg_cron'), 'absent')")
  echo "pg_cron: available $cron_version; cron.launch_active_jobs settings: $cron_setting" >> "$LOCAL_BACKEND_STATUS"
  if [ "$cron_setting" != "1" ]; then
    echo "STOP (DEC-313): this pg_cron ($cron_version) has no cron.launch_active_jobs; the jobs cannot be held" >> "$LOCAL_BACKEND_FAILURE"
    return 1
  fi
  admin_sql "alter system set cron.launch_active_jobs = off" > /dev/null
  admin_sql "alter system set autovacuum = off" > /dev/null
  admin_sql "select pg_reload_conf()" > /dev/null
}

# DEC-340 (INC-1051) — the database server's own error record. The CLI prints pgconn's one
# line (and DETAIL when set); HINT, CONTEXT (the PL/pgSQL stack) and STATEMENT reach only the
# server's log, which this image writes to the container's stderr (logging_collector off).
# This function only CAPTURES, raw, into <dir>: CI's evidence step redacts every file
# and scripts/ci/start-failure-excerpt.mjs cuts the one record (the boundary rule lives there).
# Two channels, both labelled in meta.txt: the stream (`docker logs`), and the log file the
# server's live settings name, when it writes one.
# Usage: db_error_capture <dir> <apply-began, UTC, as `docker logs --since` reads it> <container>
db_error_capture() {
  local dir="$1" apply_began="$2" container="$3" settings collector log_dir data_dir newest
  mkdir -p "$dir"
  {
    echo "began=$apply_began"
    echo "container=$container"
  } > "$dir/meta.txt"
  timeout 60 docker logs --since "$apply_began" --tail 20000 "$container" > "$dir/stream.log" 2>&1
  echo "stream=exit $?, $(wc -l < "$dir/stream.log" | tr -d ' ') lines (docker logs --since $apply_began --tail 20000)" >> "$dir/meta.txt"
  settings=$(timeout 30 docker exec "$container" psql -U supabase_admin -d postgres -AtF '|' -c "select current_setting('logging_collector'), current_setting('log_directory'), current_setting('data_directory')" 2>&1)
  if [ $? -ne 0 ]; then
    echo "file=the server did not answer: $(printf '%s' "$settings" | head -c 300 | tr '\n' ' ')" >> "$dir/meta.txt"
    return 0
  fi
  IFS='|' read -r collector log_dir data_dir <<< "$settings"
  case "$log_dir" in /*) ;; *) log_dir="$data_dir/$log_dir" ;; esac
  if [ "$collector" != "on" ]; then
    echo "file=not written (logging_collector $collector; $log_dir)" >> "$dir/meta.txt"
    return 0
  fi
  newest=$(timeout 30 docker exec "$container" sh -c "ls -t '$log_dir'/* 2>/dev/null | head -n 1")
  if [ -z "$newest" ]; then
    echo "file=no log file in $log_dir (collector on)" >> "$dir/meta.txt"
    return 0
  fi
  timeout 60 docker exec "$container" tail -c 4194304 "$newest" > "$dir/file.log" 2>&1
  echo "file=exit $?, $(wc -l < "$dir/file.log" | tr -d ' ') lines ($newest, last 4 MiB)" >> "$dir/meta.txt"
  return 0
}

# DEC-313 — the held settings back to their defaults, and the scheduler running again: "on on 1".
restore_background_work() {
  local restored=""
  admin_sql "alter system reset cron.launch_active_jobs" > /dev/null
  admin_sql "alter system reset autovacuum" > /dev/null
  admin_sql "select pg_reload_conf()" > /dev/null
  for _ in $(seq 1 15); do
    restored=$(admin_sql "select current_setting('cron.launch_active_jobs') || ' ' || current_setting('autovacuum') || ' ' || (select count(*) from pg_stat_activity where backend_type = 'pg_cron launcher' or application_name = 'pg_cron scheduler')")
    [ "$restored" = "on on 1" ] && break
    sleep 1
  done
  echo "Restored (cron.launch_active_jobs, autovacuum, scheduler sessions): $restored" >> "$LOCAL_BACKEND_STATUS"
  if [ "$restored" != "on on 1" ]; then
    echo "restore (DEC-313): expected 'on on 1', read '$restored'" >> "$LOCAL_BACKEND_FAILURE"
    return 1
  fi
}

# DEC-313 — every ledger row named, and every repository migration version (less the skipped one,
# plus the working copy's fixtures) in the local ledger. Writes "applied N/N" or "missing: …" to
# <result-file>. Usage (from the repository root): ledger_check <workdir> <result-file>
ledger_check() {
  local unnamed
  unnamed=$(admin_sql "select count(*) from supabase_migrations.schema_migrations where name is null or name = '' or statements is null")
  if [ "$unnamed" != "0" ]; then
    echo "history (DEC-313): $unnamed ledger rows without a name or statements" >> "$LOCAL_BACKEND_FAILURE"
    return 1
  fi
  python3 - "$1" "$2" "$LOCAL_BACKEND_FAILURE" <<'PY'
import os
import subprocess
import sys
from pathlib import Path
workdir, result_file, failure_file = sys.argv[1], sys.argv[2], sys.argv[3]
def fail(message):
    with open(failure_file, 'a') as out:
        out.write('ledger check: ' + message + '\n')
    raise SystemExit(message)
command = ['docker', 'exec', os.environ['DATABASE_CONTAINER'], 'psql', '-U', 'postgres', '-d', 'postgres', '-Atc', 'select version from supabase_migrations.schema_migrations order by version']
result = subprocess.run(command, capture_output=True, text=True)
if result.returncode != 0:
    fail('docker exec exit ' + str(result.returncode) + ': ' + result.stderr[:300])
applied = set(result.stdout.splitlines())
expected = {p.name.split('_', 1)[0] for p in Path('supabase/migrations').glob('*.sql')} - {'20260922120000'}
expected |= {p.name.split('_', 1)[0] for p in Path(workdir, 'supabase/migrations').glob('*_ci_local_*.sql')}
missing = sorted(expected - applied)
Path(result_file).write_text('applied ' + str(len(expected)) + '/' + str(len(expected)) if not missing else 'missing: ' + ', '.join(missing))
if missing:
    fail('repository migration versions missing from local ledger: ' + ', '.join(missing))
PY
}
