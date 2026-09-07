#!/usr/bin/env bash
# C7 AMENDMENT GUARD (ENFORCING — non-zero exit on findings).
#
# C3-UX-1d: a DataTable column must express its share of the row as a TIER
# (`priority`) plus a proportional `width`, never as a `minWidth`. Min-widths
# are floors: they add up, and the sum pushes the last column off the scroller
# in the 1024–1279 band (INC-173 lineage).
#
# A genuinely dense column may still declare one, but it must say why on the
# SAME line:
#     minWidth: "min-w-[12rem]", // C7-dense: fixed-width money ledger
#
# `src/routes/dev.primitives.tsx` is the primitive's own showcase — it exists to
# exercise the prop, so it is exempt by name (E5: per-file, never a glob).
#
# Usage: check-datatable-minwidth.sh [target-dir]   (default: src)
set -uo pipefail

TARGET="${1:-src}"

echo "================================================================"
echo " ENFORCING: DataTable min-width guard — tiers, not min-widths"
echo " target: $TARGET"
echo "================================================================"

if [ ! -e "$TARGET" ]; then
  echo "No target '$TARGET' present; nothing to scan."
  echo "findings: 0"
  exit 0
fi

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

grep -RnE "^[[:space:]]*minWidth[[:space:]]*:" \
  --include='*.ts' --include='*.tsx' --include='*.ts.txt' --include='*.tsx.txt' \
  "$TARGET" 2>/dev/null |
  grep -v "^src/components/shell/data-table.tsx:" |
  grep -v "^src/routes/dev.primitives.tsx:" |
  grep -v "// C7-dense:" >>"$tmp" || true

findings=0
if [ -s "$tmp" ]; then
  sort -u "$tmp"
  findings=$(sort -u "$tmp" | wc -l | tr -d ' ')
fi

echo "findings: $findings"
if [ "$findings" -gt 0 ]; then
  echo "FAIL: declare a column tier + proportional width, or justify the"
  echo "      min-width on the same line with '// C7-dense: <reason>'."
  exit 1
fi
exit 0
