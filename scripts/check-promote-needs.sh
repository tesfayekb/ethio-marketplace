#!/usr/bin/env bash
# DEC-137 (INC-453): every job in the workflow gates promotion — `promote.needs`
# names it — unless SIGNAL_ONLY below names it with its decision number; and
# `promote.needs` names no job that does not exist.
# DEC-365 (housekeeping turn 3, ruling 1 Q11): promote's `if:` reads every needed
# job's result by name — `needs.<job>.result == 'success'` — never `success()`,
# and holds `!cancelled()`; `scope` is needed and required to succeed; the jobs in
# DOCS_SKIPPABLE appear only as `(… == 'success' || (… == 'skipped' &&
# needs.scope.outputs.docs_only == 'true'))`, and their own `if:` is exactly
# `!cancelled() && needs.scope.outputs.docs_only != 'true'` (a failed `scope`
# runs them and blocks promotion).
# Usage: bash scripts/check-promote-needs.sh [workflow.yml]
set -euo pipefail
FILE="${1:-.github/workflows/ci.yml}"
# DEC-023-B's fast lane was retired by turn 16 (D228); every CI job now gates main.
SIGNAL_ONLY=()
DOCS_SKIPPABLE=(e2e-lanes bundle-budget)
DOCS_ONLY_OUTPUT="needs.scope.outputs.docs_only"

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
grep -qx promote <<<"$jobs" || { echo "check-promote-needs: no promote job in $FILE" >&2; exit 1; }

fail=0
while IFS= read -r j; do
  [ "$j" = promote ] && continue
  skip=0
  for s in "${SIGNAL_ONLY[@]}"; do [ "$j" = "$s" ] && skip=1; done
  [ "$skip" = 1 ] && continue
  if ! grep -qx "$j" <<<"$needs"; then
    echo "::error::promote.needs does not name job '$j' ($FILE; DEC-137)"; fail=1
  fi
done <<< "$jobs"
while IFS= read -r n; do
  [ -z "$n" ] && continue
  if ! grep -qx "$n" <<<"$jobs"; then
    echo "::error::promote.needs names '$n', which is not a job in $FILE (DEC-137)"; fail=1
  fi
done <<< "$needs"

# A job's own `if:` (one line, or a folded block), whitespace collapsed, `${{ }}` removed.
job_if() {
  awk -v job="$1" '
    $0 ~ "^  " job ":[[:space:]]*$" { injob=1; next }
    injob && /^  [A-Za-z0-9_-]+:/ { injob=0 }
    injob && inif && /^      / { buf=buf " " $0; next }
    injob && inif { inif=0 }
    injob && /^    if:/ { line=$0; sub(/^    if:[[:space:]]*/, "", line); if (line ~ /^[>|]-?$/) line=""; buf=line; inif=1; next }
    END { print buf }
  ' "$FILE" | tr -s ' \t' '  ' | sed -e 's/^ *//' -e 's/ *$//' -e 's/^\${{ *//' -e 's/ *}}$//'
}

promote_if=$(job_if promote)
if [ -z "$promote_if" ]; then
  echo "::error::promote has no if: ($FILE; DEC-365)"; fail=1
fi
if grep -qF -- 'success()' <<<"$promote_if"; then
  echo "::error::promote's if: calls success() — read each needed job's result by name ($FILE; DEC-365)"; fail=1
fi
if ! grep -qF -- '!cancelled()' <<<"$promote_if"; then
  echo "::error::promote's if: does not hold !cancelled() ($FILE; DEC-365)"; fail=1
fi
if ! grep -qx scope <<<"$needs"; then
  echo "::error::promote.needs does not name 'scope' ($FILE; DEC-365)"; fail=1
fi
while IFS= read -r n; do
  [ -z "$n" ] && continue
  skippable=0
  for s in "${DOCS_SKIPPABLE[@]}"; do [ "$n" = "$s" ] && skippable=1; done
  if [ "$skippable" = 1 ]; then
    form="(needs.$n.result == 'success' || (needs.$n.result == 'skipped' && $DOCS_ONLY_OUTPUT == 'true'))"
    mentions=$(grep -oF -- "needs.$n.result" <<<"$promote_if" || true)
    if ! grep -qF -- "$form" <<<"$promote_if" || [ "$(grep -c . <<<"$mentions")" != 2 ]; then
      echo "::error::promote's if: must read '$n' only as $form ($FILE; DEC-365)"; fail=1
    fi
    own_if=$(job_if "$n")
    if [ "$own_if" != "!cancelled() && $DOCS_ONLY_OUTPUT != 'true'" ]; then
      echo "::error::job '$n' must run under if: \${{ !cancelled() && $DOCS_ONLY_OUTPUT != 'true' }} ($FILE; DEC-365)"; fail=1
    fi
  elif ! grep -qF -- "needs.$n.result == 'success'" <<<"$promote_if"; then
    echo "::error::promote's if: does not require needs.$n.result == 'success' ($FILE; DEC-365)"; fail=1
  fi
done <<< "$needs"

[ "$fail" = 0 ] || exit 1
echo "Promote-needs guard OK ($(echo "$jobs" | grep -vcx promote) jobs; signal-only: ${SIGNAL_ONLY[*]})"
