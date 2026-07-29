#!/usr/bin/env bash
# Migration guard: every migration containing CREATE TABLE must also enable RLS,
# create at least one policy, and grant privileges. Includes a self-test against
# a known-bad fixture so a broken guard cannot silently pass.
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

echo "Migration guard OK."
