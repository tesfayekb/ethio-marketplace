#!/usr/bin/env bash
# Hardcoded user-facing string scan (ENFORCING — non-zero exit on findings).
# Scans .tsx files under src/routes and src/features for JSX text content and
# common user-facing string props (title, label, placeholder, alt, aria-label).
set -uo pipefail

echo "================================================================"
echo " ENFORCING: hardcoded string scan — findings FAIL the run"
echo "================================================================"

targets=()
[ -d "src/routes" ] && targets+=("src/routes")
[ -d "src/features" ] && targets+=("src/features")

if [ ${#targets[@]} -eq 0 ]; then
  echo "No target directories present; nothing to scan."
  echo "findings: 0"
  exit 0
fi

findings=0
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

# JSX text content: >Some Text<   (letters only, avoids code/expressions)
grep -RnE '>[[:space:]]*[A-Za-z][A-Za-z0-9 ,.:;!?%\-]{2,}[[:space:]]*<' \
  --include='*.tsx' "${targets[@]}" >> "$tmp" 2>/dev/null || true

# Common user-facing string props with literal string values.
grep -RnE '(title|label|placeholder|alt|aria-label)="[^"{}]{2,}"' \
  --include='*.tsx' "${targets[@]}" >> "$tmp" 2>/dev/null || true

if [ -s "$tmp" ]; then
  sort -u "$tmp"
  findings=$(sort -u "$tmp" | wc -l | tr -d ' ')
fi

echo "findings: $findings"
if [ "$findings" -gt 0 ]; then
  echo "FAIL: user-visible strings must use i18n keys (law D1)."
  exit 1
fi
exit 0
