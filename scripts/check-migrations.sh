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

check_file() {
  # Returns 0 = OK, 1 = violation. Prints reason on violation.
  local file="$1"
  if ! grep -qiE 'create[[:space:]]+table' "$file"; then
    return 0
  fi
  local missing=()
  grep -qiE 'enable[[:space:]]+row[[:space:]]+level[[:space:]]+security' "$file" \
    || missing+=("ENABLE ROW LEVEL SECURITY")
  grep -qiE 'create[[:space:]]+policy' "$file" \
    || missing+=("CREATE POLICY")
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

# --- Self-marking law (U1f-3): every migration ends with its own mark ---
# The SQL editor (how ethio-staging is applied) writes no tool ledger, so the
# mark IS the ledger there: each migration at or after $MARK_GUARD_FLOOR must
# contain `INSERT INTO public.migration_marks` carrying its OWN version string.
MARK_GUARD_FLOOR="20260817054246"

check_mark_file() {
  # $1 = file, $2 = version. Returns 0 = OK, 1 = violation.
  local file="$1" version="$2"
  if ! grep -qiE "insert[[:space:]]+into[[:space:]]+public\.migration_marks" "$file"; then
    echo "  - $file (no INSERT INTO public.migration_marks)"
    return 1
  fi
  if ! grep -qE "migration_marks[^;]*'${version}'" "$file"; then
    echo "  - $file (mark does not carry its own version '${version}')"
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

definer_violations=0
definer_offenders=""
definer_skipped=""
while IFS= read -r -d '' file; do
  base="$(basename "$file")"
  stamp="${base%%_*}"
  if ! [[ "$stamp" =~ ^[0-9]{14}$ ]] || [[ "$stamp" < "$DEFINER_GUARD_FLOOR" ]]; then
    if grep -qi 'security[[:space:]]\+definer' "$file"; then
      definer_skipped+="  - $base (grandfathered)"$'\n'
    fi
    continue
  fi
  if ! out=$(check_definer_file "$file"); then
    definer_violations=$((definer_violations + 1))
    definer_offenders+="$out"$'\n'
  fi
done < <(find "$MIGRATIONS_DIR" -type f -name '*.sql' -print0)

if [ -n "$definer_skipped" ]; then
  echo "Definer guard: grandfathered files skipped (pre-$DEFINER_GUARD_FLOOR):"
  printf '%s' "$definer_skipped"
fi

if [ "$definer_violations" -gt 0 ]; then
  echo "Definer guard FAILED: $definer_violations file(s) define SECURITY DEFINER functions without an in-file REVOKE:"
  printf '%s' "$definer_offenders"
  exit 1
fi

echo "Definer guard OK."

echo "Migration guard OK."
