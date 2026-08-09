#!/usr/bin/env bash
# Browse-path guard (Phase R3, performance strategy).
#
# The RBAC permission seam (src/features/permissions) must never be reachable
# from the marketplace browse path: a visitor scrolling listings pays nothing
# for admin machinery. Only the admin chunk and the single shell gate that
# decides whether the Admin TAB renders may import it.
#
# Usage: bash scripts/check-browse-imports.sh [dir]   (default: src)
set -uo pipefail

TARGET="${1:-src}"

# Allowlist — deliberate, short, and reviewed. Anything else is a violation.
#   1. the seam itself
#   2. the admin route chunk
#   3. the shell gate (app-shell.tsx): the Admin tab cannot be revealed without
#      knowing the permission. Its read is `enabled` only when signed in, so a
#      logged-out marketplace visitor still issues zero RBAC requests.
is_allowed() {
  case "$1" in
    */features/permissions/*) return 0 ;;
    */routes/admin.tsx) return 0 ;;
    */components/app-shell.tsx) return 0 ;;
    *) return 1 ;;
  esac
}

violations=0
offenders=""
while IFS= read -r -d '' file; do
  is_allowed "$file" && continue
  if grep -qE "(from|import)[[:space:]]*\(?[\"']([^\"']*)features/permissions" "$file"; then
    offenders+="  - $file"$'\n'
    violations=$((violations + 1))
  fi
done < <(find "$TARGET" -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.ts.txt' \) -print0)

if [ "$violations" -gt 0 ]; then
  echo "Browse-path guard FAILED: $violations file(s) import the RBAC permission seam outside the allowlist:"
  printf '%s' "$offenders"
  echo "The permission seam belongs to the admin chunk. Do not pull it onto the browse path."
  exit 1
fi

echo "Browse-path guard OK: no RBAC imports outside the allowlist ($TARGET)."
exit 0
