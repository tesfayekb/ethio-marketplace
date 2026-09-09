#!/usr/bin/env bash
# IMPORT-GATE PART E — ONE DOOR, PROVED BY A GUARD.
#
# 1. Every import/export route under src/routes/api MUST enter through the
#    shared gate (`openImportGate` / `openExportGate`). A route that builds its
#    own Supabase client, or reads the Authorization header itself, is a second
#    door and fails here.
# 2. Every registered family MUST declare a class for every column.
# 3. The guard proves itself against a fixture that must fail (A7).
set -euo pipefail
cd "$(dirname "$0")/.."

fail=0
routes=$(git ls-files 'src/routes/api/**/import.ts' 'src/routes/api/**/export.ts' || true)

check_route() {
  local file="$1"
  if ! grep -qE 'open(Import|Export)Gate' "$file"; then
    echo "IMPORT-GATE: $file does not call the shared gate"
    return 1
  fi
  if grep -qE 'createClient<' "$file"; then
    echo "IMPORT-GATE: $file builds its own Supabase client (second door)"
    return 1
  fi
  if grep -q 'headers.get("Authorization")' "$file"; then
    echo "IMPORT-GATE: $file reads the bearer itself (second door)"
    return 1
  fi
  return 0
}

for file in $routes; do
  check_route "$file" || fail=1
done

# 4. IMPORT WRITERS ARE REACHED THROUGH THE DOOR. A console that calls an
#    import RPC directly is a second door with no cap, no hygiene and no meter.
direct=$(grep -rEn 'rpc\("(admin_import_translations|admin_preview_category_import|admin_commit_category_import|admin_preview_attribute_import|admin_commit_attribute_import)"' src/features src/lib 2>/dev/null || true)
if [ -n "$direct" ]; then
  echo "IMPORT-GATE: an import writer is called outside the route:"
  echo "$direct"
  fail=1
fi

# Column classes are total for every registered family.
missing=$(bun -e '
  import { familiesMissingColumnClasses } from "./src/server/imports/registry";
  const bad = familiesMissingColumnClasses();
  if (bad.length > 0) console.log(bad.join(", "));
')
if [ -n "$missing" ]; then
  echo "IMPORT-GATE: columns without a declared class: $missing"
  fail=1
fi

# SELF-TEST — the guard must reject the bad example.
fixture=scripts/fixtures/bad-import-route-example.ts.txt
if [ -f "$fixture" ]; then
  if check_route "$fixture" >/dev/null 2>&1; then
    echo "IMPORT-GATE: the guard accepted its own bad fixture"
    fail=1
  fi
else
  echo "IMPORT-GATE: missing self-test fixture $fixture"
  fail=1
fi

if [ "$fail" -ne 0 ]; then exit 1; fi
echo "IMPORT-GATE: ok ($(echo "$routes" | wc -w | tr -d ' ') routes through the gate)"
