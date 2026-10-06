#!/usr/bin/env bash
# DEC-137 (INC-453): every job in the workflow gates promotion — `promote.needs`
# names it — unless SIGNAL_ONLY below names it with its decision number; and
# `promote.needs` names no job that does not exist.
# Usage: bash scripts/check-promote-needs.sh [workflow.yml]
set -euo pipefail
FILE="${1:-.github/workflows/ci.yml}"
# DEC-023-B: the changed-spec fast lane is signal-only; it never holds main back.
SIGNAL_ONLY=(e2e-changed)

[ -f "$FILE" ] || { echo "check-promote-needs: no such file $FILE" >&2; exit 2; }

jobs=$(awk '
  /^jobs:[[:space:]]*$/ { injobs=1; next }
  injobs && /^[^[:space:]#]/ { injobs=0 }
  injobs && /^  [A-Za-z0-9_-]+:[[:space:]]*$/ { sub(/^  /,""); sub(/:.*/,""); print }
' "$FILE")

needs=$(awk '
  /^  promote:[[:space:]]*$/ { inp=1; next }
  inp && /^  [A-Za-z0-9_-]+:/ { inp=0 }
  inp && /^    needs:/ { inn=1; line=$0; sub(/^    needs:/,"",line); buf=line; if (line ~ /\]/ || (line !~ /\[/ && line ~ /[A-Za-z]/)) { print buf; inn=0 } ; next }
  inn { buf=buf" "$0; if ($0 ~ /\]/) { print buf; inn=0 } }
' "$FILE" | tr '[],' '   ' | tr -s ' \t' '\n' | grep -v '^$' || true)

[ -n "$jobs" ] || { echo "check-promote-needs: no jobs found in $FILE" >&2; exit 2; }
echo "$jobs" | grep -qx promote || { echo "check-promote-needs: no promote job in $FILE" >&2; exit 1; }

fail=0
while IFS= read -r j; do
  [ "$j" = promote ] && continue
  skip=0
  for s in "${SIGNAL_ONLY[@]}"; do [ "$j" = "$s" ] && skip=1; done
  [ "$skip" = 1 ] && continue
  if ! echo "$needs" | grep -qx "$j"; then
    echo "::error::promote.needs does not name job '$j' ($FILE; DEC-137)"; fail=1
  fi
done <<< "$jobs"
while IFS= read -r n; do
  [ -z "$n" ] && continue
  if ! echo "$jobs" | grep -qx "$n"; then
    echo "::error::promote.needs names '$n', which is not a job in $FILE (DEC-137)"; fail=1
  fi
done <<< "$needs"

[ "$fail" = 0 ] || exit 1
echo "Promote-needs guard OK ($(echo "$jobs" | grep -vcx promote) jobs; signal-only: ${SIGNAL_ONLY[*]})"
