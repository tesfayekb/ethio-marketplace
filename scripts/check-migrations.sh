#!/usr/bin/env bash
# Migration guard: every migration containing CREATE TABLE must also enable RLS,
# create at least one policy, and grant privileges. Includes a self-test against
# a known-bad fixture so a broken guard cannot silently pass.
#
# Definer law (INC-074): re-declaring an existing SECURITY DEFINER function
# requires restating its REVOKE/GRANT lines in the same file (CREATE OR REPLACE
# preserves live grants, but the file must be self-describing).

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FIXTURE_DIR="$SCRIPT_DIR/fixtures"
BAD_FIXTURE="$FIXTURE_DIR/bad-migration-example.sql"
MIGRATIONS_DIR="supabase/migrations"

RLS_ALLOWLIST_FILE="${RLS_ALLOWLIST_FILE:-$SCRIPT_DIR/migration-guard-rls-allowlist.txt}"

rls_closer() {
  # $1 = basename. Prints the cited closer fragment when allowlisted.
  [ -f "$RLS_ALLOWLIST_FILE" ] || return 0
  awk -F'|' -v base="$1" '
    /^[[:space:]]*#/ || /^[[:space:]]*$/ { next }
    { n = $1; gsub(/^[[:space:]]+|[[:space:]]+$/, "", n)
      if (n == base) { c = $3; gsub(/^[[:space:]]+|[[:space:]]+$/, "", c); print c } }
  ' "$RLS_ALLOWLIST_FILE"
}

rls_closer_ok() {
  # $1 = flagged file, $2 = closer fragment, $3 = migrations dir.
  # OK only when the closer file exists and holds CREATE POLICY ... ON <table>
  # for EVERY table the flagged file creates.
  local file="$1" frag="$2" dir="$3" closer tbl
  [ -n "$frag" ] || return 1
  closer=$(find "$dir" -type f -name "*${frag}*.sql" | head -1)
  [ -n "$closer" ] || return 1
  local flat
  flat=$(tr '\n' ' ' < "$closer")
  while IFS= read -r tbl; do
    [ -z "$tbl" ] && continue
    printf '%s' "$flat" | grep -qiE "create[[:space:]]+policy[^;]*[[:space:]]on[[:space:]]+(public\.)?${tbl}([[:space:]]|$)" \
      || return 1
  done < <(grep -oiE 'create[[:space:]]+table[[:space:]]+(if[[:space:]]+not[[:space:]]+exists[[:space:]]+)?(public\.)?[a-z0-9_]+' "$file" \
    | sed -E 's/.*[[:space:].]([a-zA-Z0-9_]+)$/\1/' | sort -u)
  return 0
}

check_file() {
  # Returns 0 = OK, 1 = violation. Prints reason on violation.
  local file="$1"
  if ! grep -qiE 'create[[:space:]]+table' "$file"; then
    return 0
  fi
  local missing=()
  grep -qiE 'enable[[:space:]]+row[[:space:]]+level[[:space:]]+security' "$file" \
    || missing+=("ENABLE ROW LEVEL SECURITY")
  # Closer-cited exemption (D37-1): a file whose tables gained their policies
  # in a LATER corrective migration is listed in
  # scripts/migration-guard-rls-allowlist.txt as
  #   <filename> | <reason> | <closer uuid-fragment>
  # and passes the CREATE POLICY rule only if that closer exists and creates a
  # policy ON every table the file creates. RLS and GRANT are still required.
  if ! grep -qiE 'create[[:space:]]+policy' "$file"; then
    local frag
    frag="$(rls_closer "$(basename "$file")")"
    if [ -n "$frag" ] && rls_closer_ok "$file" "$frag" "${RLS_CLOSER_DIR:-$MIGRATIONS_DIR}"; then
      echo "Policies closed later (allowlisted): $(basename "$file") | closed by $frag" >&2
    else
      missing+=("CREATE POLICY")
    fi
  fi
  grep -qiE '(^|[[:space:]])grant[[:space:]]' "$file" \
    || missing+=("GRANT")
  if [ ${#missing[@]} -gt 0 ]; then
    echo "  - $file (missing: ${missing[*]})"
    return 1
  fi
  return 0
}

# --- Self-test ---
if [ ! -f "$BAD_FIXTURE" ]; then
  echo "GUARD SELF-TEST FAILED: fixture $BAD_FIXTURE not found"
  exit 1
fi
if check_file "$BAD_FIXTURE" >/dev/null 2>&1; then
  echo "GUARD SELF-TEST FAILED: bad fixture was not flagged"
  exit 1
fi
echo "Self-test OK: bad fixture correctly flagged."

# Self-test: an allowlist line citing a closer WITHOUT the table's policy fails,
# and one citing a closer WITH it passes.
RLS_TEST_DIR="$(mktemp -d)"
cat > "$RLS_TEST_DIR/29990101000000_aaaa1111.sql" <<'SQL'
CREATE TABLE public.self_test_t (id int);
ALTER TABLE public.self_test_t ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.self_test_t TO service_role;
SQL
cat > "$RLS_TEST_DIR/29990101000001_bbbb2222.sql" <<'SQL'
CREATE POLICY other_p ON public.some_other_table FOR SELECT USING (false);
SQL
cat > "$RLS_TEST_DIR/29990101000002_cccc3333.sql" <<'SQL'
CREATE POLICY self_test_deny ON public.self_test_t FOR SELECT TO anon USING (false);
SQL
printf '%s\n' '29990101000000_aaaa1111.sql | self-test | bbbb2222' > "$RLS_TEST_DIR/bad.txt"
printf '%s\n' '29990101000000_aaaa1111.sql | self-test | cccc3333' > "$RLS_TEST_DIR/good.txt"
if RLS_ALLOWLIST_FILE="$RLS_TEST_DIR/bad.txt" RLS_CLOSER_DIR="$RLS_TEST_DIR" \
  check_file "$RLS_TEST_DIR/29990101000000_aaaa1111.sql" >/dev/null 2>&1; then
  echo "GUARD SELF-TEST FAILED: allowlist citing a closer without the policy passed"
  rm -rf "$RLS_TEST_DIR"; exit 1
fi
if ! RLS_ALLOWLIST_FILE="$RLS_TEST_DIR/good.txt" RLS_CLOSER_DIR="$RLS_TEST_DIR" \
  check_file "$RLS_TEST_DIR/29990101000000_aaaa1111.sql" >/dev/null 2>&1; then
  echo "GUARD SELF-TEST FAILED: allowlist citing a valid closer was flagged"
  rm -rf "$RLS_TEST_DIR"; exit 1
fi
rm -rf "$RLS_TEST_DIR"
echo "Self-test OK: closer-cited exemption fails without the cited policy, passes with it."

# --- Real scan ---
if [ ! -d "$MIGRATIONS_DIR" ]; then
  echo "No $MIGRATIONS_DIR directory; nothing to scan."
  exit 0
fi

violations=0
offenders=""
while IFS= read -r -d '' file; do
  if ! out=$(check_file "$file"); then
    violations=$((violations + 1))
    offenders+="$out"$'\n'
  fi
done < <(find "$MIGRATIONS_DIR" -type f -name '*.sql' -print0)

if [ "$violations" -gt 0 ]; then
  echo "Migration guard FAILED: $violations file(s) missing RLS/policy/grant:"
  printf '%s' "$offenders"
  exit 1
fi

# --- INC-062-class guard: SECURITY DEFINER functions must be revoked in-file ---
# Every migration defining a function with SECURITY DEFINER must, in the SAME file,
# contain at least one REVOKE naming that function. Grandfathered: only files whose
# timestamp prefix is >= $DEFINER_GUARD_FLOOR are scanned.
DEFINER_GUARD_FLOOR="20260810000000"

check_definer_file() {
  # Returns 0 = OK, 1 = violation. Prints reason on violation.
  local file="$1"
  local fns
  fns=$(awk '
    tolower($0) ~ /create[ \t]+(or[ \t]+replace[ \t]+)?function/ {
      line = $0
      if (match(line, /[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn][ \t]+[A-Za-z0-9_."]+/)) {
        name = substr(line, RSTART, RLENGTH)
        sub(/^[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn][ \t]+/, "", name)
        gsub(/"/, "", name)
        sub(/^public\./, "", name)
        current = name
      }
      capture = 1
      body = ""
    }
    capture == 1 { body = body " " tolower($0) }
    capture == 1 && body ~ /security[ \t]+definer/ {
      print current; capture = 0; body = ""
    }
    /\$\$;/ { capture = 0; body = "" }
  ' "$file" | sort -u)

  [ -z "$fns" ] && return 0

  local missing=()
  local fn
  while IFS= read -r fn; do
    [ -z "$fn" ] && continue
    if ! grep -iE "revoke[^;]*\b${fn}\b" "$file" >/dev/null 2>&1; then
      missing+=("$fn")
    fi
  done <<< "$fns"

  if [ ${#missing[@]} -gt 0 ]; then
    echo "  - $file (SECURITY DEFINER without in-file REVOKE: ${missing[*]})"
    return 1
  fi
  return 0
}

# --- DEC-022-B allowlist -------------------------------------------------
# scripts/migration-guard-allowlist.txt holds one entry per line:
#   <filename> | <reason> | <closing migration uuid-fragment>
# The authoring tool can split a DEFINER declaration from its REVOKE across two
# files. Such a file is SKIPPED by the definer scan and PRINTED on every run
# citing its closer — nothing is silently skipped.
ALLOWLIST_FILE="${ALLOWLIST_FILE:-$SCRIPT_DIR/migration-guard-allowlist.txt}"

allowlist_entry() {
  # $1 = basename. Prints "reason | closer" when allowlisted; empty otherwise.
  local base="$1"
  [ -f "$ALLOWLIST_FILE" ] || return 0
  awk -F'|' -v base="$base" '
    /^[[:space:]]*#/ { next }
    /^[[:space:]]*$/ { next }
    {
      name = $1
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", name)
      if (name == base) {
        reason = $2; closer = $3
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", reason)
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", closer)
        print reason " | closed by " closer
      }
    }
  ' "$ALLOWLIST_FILE"
}

scan_definer_dir() {
  # $1 = directory. Prints the allowlist block; returns 1 on violations.
  local dir="$1"
  local violations=0 offenders="" skipped="" allowlisted=""
  local file base stamp out entry
  while IFS= read -r -d '' file; do
    base="$(basename "$file")"
    stamp="${base%%_*}"
    entry="$(allowlist_entry "$base")"
    if [ -n "$entry" ]; then
      allowlisted+="  - $base ($entry)"$'\n'
      continue
    fi
    if ! [[ "$stamp" =~ ^[0-9]{14}$ ]] || [[ "$stamp" < "$DEFINER_GUARD_FLOOR" ]]; then
      if grep -qi 'security[[:space:]]\+definer' "$file"; then
        skipped+="  - $base (grandfathered)"$'\n'
      fi
      continue
    fi
    if ! out=$(check_definer_file "$file"); then
      violations=$((violations + 1))
      offenders+="$out"$'\n'
    fi
  done < <(find "$dir" -type f -name '*.sql' -print0)

  if [ -n "$skipped" ]; then
    echo "Definer guard: grandfathered files skipped (pre-$DEFINER_GUARD_FLOOR):"
    printf '%s' "$skipped"
  fi
  if [ -n "$allowlisted" ]; then
    echo "Definer guard: allowlisted files (each cites its closer)"
    printf '%s' "$allowlisted"
  fi
  if [ "$violations" -gt 0 ]; then
    echo "Definer guard FAILED: $violations file(s) define SECURITY DEFINER functions without an in-file REVOKE:"
    printf '%s' "$offenders"
    return 1
  fi
  return 0
}

# Self-test: an embedded bad sample must be flagged.
DEFINER_BAD_SAMPLE="$(mktemp)"
cat > "$DEFINER_BAD_SAMPLE" <<'SQL'
CREATE OR REPLACE FUNCTION public.self_test_definer()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN NEW;
END;
$$;
SQL
if definer_out=$(check_definer_file "$DEFINER_BAD_SAMPLE"); then
  echo "GUARD SELF-TEST FAILED: definer sample was not flagged"
  rm -f "$DEFINER_BAD_SAMPLE"
  exit 1
fi
echo "Self-test OK: definer-without-revoke sample correctly flagged:"
printf '%s\n' "$definer_out"
rm -f "$DEFINER_BAD_SAMPLE"

# Self-test: an allowlisted file is SKIPPED by the scan AND PRINTED.
ALLOW_TEST_DIR="$(mktemp -d)"
ALLOW_TEST_LIST="$ALLOW_TEST_DIR/allowlist.txt"
cat > "$ALLOW_TEST_DIR/29990101000000_allowlisted-sample.sql" <<'SQL'
CREATE OR REPLACE FUNCTION public.self_test_allowlisted()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN NEW;
END;
$$;
SQL
cat > "$ALLOW_TEST_LIST" <<'TXT'
# self-test allowlist
29990101000000_allowlisted-sample.sql | self-test: tool split placed the REVOKE in the next file | deadbeef
TXT
allow_out=$(ALLOWLIST_FILE="$ALLOW_TEST_LIST" scan_definer_dir "$ALLOW_TEST_DIR")
allow_rc=$?
if [ "$allow_rc" -ne 0 ]; then
  echo "GUARD SELF-TEST FAILED: allowlisted file was not skipped"
  printf '%s\n' "$allow_out"
  rm -rf "$ALLOW_TEST_DIR"
  exit 1
fi
if ! printf '%s' "$allow_out" | grep -q 'allowlisted files (each cites its closer)'; then
  echo "GUARD SELF-TEST FAILED: allowlisted file was skipped but not printed"
  rm -rf "$ALLOW_TEST_DIR"
  exit 1
fi
echo "Self-test OK: allowlisted file skipped and printed:"
printf '%s\n' "$allow_out"
rm -rf "$ALLOW_TEST_DIR"



# --- Self-marking law (U1f-3, re-based by INC-094) ---
# The SQL editor (how ethio-staging is applied) writes no tool ledger, so the
# mark IS the ledger there: each migration at or after $MARK_GUARD_FLOOR must
# contain `INSERT INTO public.migration_marks` carrying a 14-digit version.
#
# INC-094 — DECLARED-MARK LAW. The mark can NOT be required to equal the file's
# own filename stamp: the migration tool assigns that stamp when it WRITES the
# file, after the SQL was authored, and tool-managed migration files cannot be
# edited afterwards. Requiring the filename stamp made every landing red and the
# "fix" recursive (each corrective migration inherits the same problem).
# The law is therefore: a migration DECLARES a 14-digit mark, at or after its own
# filename stamp (so marks stay monotonic and no file recycles an older stamp),
# and the tooling reads the DECLARED literal out of the file — see
# scripts/e2e-migration-preflight.ts, which compares declared marks against the
# ledger instead of assuming filename equality.
MARK_GUARD_FLOOR="20260817054246"

check_mark_file() {
  # $1 = file, $2 = filename stamp. Returns 0 = OK, 1 = violation.
  local file="$1" version="$2"
  if ! grep -qiE "insert[[:space:]]+into[[:space:]]+public\.migration_marks" "$file"; then
    echo "  - $file (no INSERT INTO public.migration_marks)"
    return 1
  fi
  local best
  # The statement may be written across several lines (the migration tool
  # formats the SQL it writes and the file cannot be edited afterwards), so the
  # file is flattened to ONE line before the mark literal is read — otherwise a
  # correctly self-marking migration reads as unmarked (M-MAINT-2 Part A).
  best=$(tr '\n' ' ' < "$file" | grep -oE "migration_marks[^;]*'[0-9]{14}'" \
    | grep -oE "'[0-9]{14}'" | tr -d "'" | sort | tail -1)
  if [ -z "$best" ]; then
    echo "  - $file (mark carries no 14-digit version literal)"
    return 1
  fi
  if [[ "$best" < "$version" ]]; then
    echo "  - $file (declared mark '$best' precedes its filename stamp '$version')"
    return 1
  fi
  return 0
}


MARK_BAD_FIXTURE="$FIXTURE_DIR/bad-unmarked-migration-example.sql"
if [ ! -f "$MARK_BAD_FIXTURE" ]; then
  echo "GUARD SELF-TEST FAILED: fixture $MARK_BAD_FIXTURE not found"
  exit 1
fi
if mark_out=$(check_mark_file "$MARK_BAD_FIXTURE" "29990101000000"); then
  echo "GUARD SELF-TEST FAILED: unmarked migration sample was not flagged"
  exit 1
fi
echo "Self-test OK: unmarked-migration sample correctly flagged:"
printf '%s\n' "$mark_out"


if [ "${SELF_TEST:-0}" = "1" ]; then
  echo "SELF_TEST mode: self-tests passed; skipping real scan."
  exit 0
fi

if ! scan_definer_dir "$MIGRATIONS_DIR"; then
  exit 1
fi


echo "Definer guard OK."

# MARK ALLOWLIST (same discipline as the definer allowlist): a file that landed
# without its self-mark cannot be edited afterwards (append-only law), so the
# mark is healed by a LATER migration and the file is listed here citing that
# healer. Allowlisted files are SKIPPED and PRINTED — nothing is silently
# skipped.
MARK_ALLOWLIST_FILE="${MARK_ALLOWLIST_FILE:-$SCRIPT_DIR/migration-mark-allowlist.txt}"
mark_allowlist_entry() {
  [ -f "$MARK_ALLOWLIST_FILE" ] || return 1
  local line
  line="$(grep -F "$1 |" "$MARK_ALLOWLIST_FILE" 2>/dev/null | head -n1 || true)"
  [ -n "$line" ] || return 1
  printf '%s' "${line#*| }"
}

mark_violations=0
mark_offenders=""
mark_allowlisted=""
while IFS= read -r -d '' file; do
  base="$(basename "$file")"
  stamp="${base%%_*}"
  if ! [[ "$stamp" =~ ^[0-9]{14}$ ]] || [[ "$stamp" < "$MARK_GUARD_FLOOR" ]]; then
    continue
  fi
  if entry="$(mark_allowlist_entry "$base")"; then
    mark_allowlisted+="  - $base ($entry)"$'\n'
    continue
  fi
  if ! out=$(check_mark_file "$file" "$stamp"); then
    mark_violations=$((mark_violations + 1))
    mark_offenders+="$out"$'\n'
  fi
done < <(find "$MIGRATIONS_DIR" -type f -name '*.sql' -print0)

if [ "$mark_violations" -gt 0 ]; then
  echo "Self-marking guard FAILED: $mark_violations file(s) do not self-mark into public.migration_marks:"
  printf '%s' "$mark_offenders"
  exit 1
fi

if [ -n "$mark_allowlisted" ]; then
  echo "Self-marking guard: allowlisted files (each cites its healer)"
  printf '%s' "$mark_allowlisted"
fi

echo "Self-marking guard OK (floor $MARK_GUARD_FLOOR)."

echo "Migration guard OK."
