#!/usr/bin/env bash
# Listing-write seam guard (ENFORCING — non-zero exit on findings).
#
# The ONLY legal listings mutation from client code is the seam RPC:
#   supabase.rpc('submit_listing', ...) / supabase.rpc('transition_listing', ...)
# Direct table writes — from('listings').insert/update/delete/upsert — bypass the
# REQ-021 screening chokepoint and the REQ-022 state machine, so they FAIL here.
# Reads (.select) are fine.
#
# Usage: check-listing-writes.sh [target-dir]   (default: src)
set -uo pipefail

TARGET="${1:-src}"

echo "================================================================"
echo " ENFORCING: listing-write seam guard — direct writes FAIL the run"
echo " target: $TARGET"
echo "================================================================"

if [ ! -e "$TARGET" ]; then
  echo "No target '$TARGET' present; nothing to scan."
  echo "findings: 0"
  exit 0
fi

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

# from('listings') / from("listings") followed (same line, or within a short
# chain across lines) by a mutating method.
grep -RnE "from\(\s*['\"\`]listings['\"\`]\s*\)[^\n]*\.(insert|update|delete|upsert)\s*\(" \
  --include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx' \
  "$TARGET" >>"$tmp" 2>/dev/null || true

# Multi-line chains: a from('listings') line whose next 3 lines start a mutation.
grep -RnA3 -E "from\(\s*['\"\`]listings['\"\`]\s*\)\s*$" \
  --include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx' \
  "$TARGET" 2>/dev/null |
  grep -E "^[^:]+[-:][0-9]+[-:]\s*\.(insert|update|delete|upsert)\s*\(" >>"$tmp" || true

findings=0
if [ -s "$tmp" ]; then
  sort -u "$tmp"
  findings=$(sort -u "$tmp" | wc -l | tr -d ' ')
fi

echo "findings: $findings"
if [ "$findings" -gt 0 ]; then
  echo "FAIL: listings must be mutated only via rpc('submit_listing') / rpc('transition_listing')."
  exit 1
fi
exit 0
