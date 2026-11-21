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
# ACT-023 (the tests and CI turn 2): any `minWidth` switches the table off its
# fixed layout, so a value that is not a min-width — `w-fit`, `max-w-40`, two
# classes — buys the switch and leaves the width unhonoured (a table cell's
# max-width is not honoured by table layout; INC-1211's class). Every
# `minWidth:` value is one `min-w-*` class, read from the file's syntax tree by
# scripts/datatable-minwidth.ts. The showcase is judged too: only
# `data-table.tsx`, which declares the prop, is not.
#
# Usage: check-datatable-minwidth.sh [target-dir-or-file]   (default: src)
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
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

declared="$(grep -RnHE "^[[:space:]]*minWidth[[:space:]]*:" \
  --include='*.ts' --include='*.tsx' --include='*.ts.txt' --include='*.tsx.txt' \
  "$TARGET" 2>/dev/null)"

printf '%s\n' "$declared" |
  grep -v "^src/components/shell/data-table.tsx:" |
  grep -v "^src/routes/dev.primitives.tsx:" |
  grep -v "// C7-dense:" |
  grep -v "^$" >>"$tmp" || true

files=()
while IFS= read -r file; do
  case "$file" in "" | src/components/shell/data-table.tsx) continue ;; esac
  files+=("$file")
done < <(printf '%s\n' "$declared" | cut -d: -f1 | sort -u)
if [ "${#files[@]}" -gt 0 ]; then
  if ! one_class="$(bun "$SCRIPT_DIR/datatable-minwidth.ts" "${files[@]}")"; then
    echo "FAIL: the min-width reader (scripts/datatable-minwidth.ts) did not finish."
    exit 1
  fi
  [ -z "$one_class" ] || printf '%s\n' "$one_class" >>"$tmp"
fi

findings=0
if [ -s "$tmp" ]; then
  sort -u "$tmp"
  findings=$(sort -u "$tmp" | wc -l | tr -d ' ')
fi

echo "findings: $findings"
if [ "$findings" -gt 0 ]; then
  echo "FAIL: declare a column tier + proportional width, or justify the"
  echo "      min-width on the same line with '// C7-dense: <reason>';"
  echo "      a minWidth holds exactly one min-w-* class (ACT-023)."
  exit 1
fi
exit 0
