#!/usr/bin/env bash
# DEC-035 — THE AUDIT GATE, WITH RETRIES.
#
# Second-strike class rule: a single unreachable advisory service turned the
# dependency gate red twice without any vulnerability existing. Transport
# flakiness is not a finding and not a clean bill of health (law F4), so the
# gate now RETRIES the transport — three attempts, 20s apart — and only calls
# the service unreachable after the third. A real high/critical finding still
# fails immediately: retries never soften a verdict, only a transport error.
# DEC-405 — THE EXCEPTION LIST. An advisory this gate does not fail on is a line of
# scripts/audit-exceptions.txt (its GHSA id, reason, expiry and DEC), read by
# scripts/audit-exceptions.ts before the audit: an expired, malformed or undecided line
# fails the gate here, and each valid line becomes one `--ignore=ID` and a warning.
# Any finding that is not listed still fails at once.
set -uo pipefail

ATTEMPTS=3
BACKOFF=20
OUT=/tmp/audit.txt
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EXCEPTIONS_FILE="${AUDIT_EXCEPTIONS_FILE:-$ROOT/scripts/audit-exceptions.txt}"

if ! IGNORE_IDS="$(bun "$ROOT/scripts/audit-exceptions.ts" "$EXCEPTIONS_FILE")"; then
  echo "::error::The audit exception list is not valid; this gate did NOT run. See above."
  exit 1
fi
IGNORES=()
for id in $IGNORE_IDS; do
  IGNORES+=("--ignore=$id")
done

for attempt in $(seq 1 "$ATTEMPTS"); do
  bun audit --audit-level=high ${IGNORES[@]+"${IGNORES[@]}"} >"$OUT" 2>&1
  STATUS=$?
  cat "$OUT"

  if grep -qi "audit request failed" "$OUT"; then
    if [ "$attempt" -lt "$ATTEMPTS" ]; then
      echo "::warning::'bun audit' transport failure (attempt ${attempt}/${ATTEMPTS}); retrying in ${BACKOFF}s."
      sleep "$BACKOFF"
      continue
    fi
    echo "::error::'bun audit' could not reach the advisory service. This gate did NOT run."
    exit 1
  fi

  if [ "$STATUS" -ne 0 ]; then
    # A real finding: fail closed on the first attempt, never retried away.
    echo "::error::High or critical vulnerabilities reported by 'bun audit'."
    echo "Review docs/features/dependency-audit.md, then remediate or record a ruling."
    exit 1
  fi

  if [ "${#IGNORES[@]}" -gt 0 ]; then
    echo "No high or critical advisories beyond the recorded exceptions."
  else
    echo "No high or critical advisories."
  fi
  exit 0
done

echo "::error::'bun audit' could not reach the advisory service. This gate did NOT run."
exit 1
