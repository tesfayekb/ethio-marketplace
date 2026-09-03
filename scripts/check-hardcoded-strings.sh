#!/usr/bin/env bash
# Hardcoded user-facing string scan (ENFORCING — non-zero exit on findings).
# Scans .tsx files under the given roots (default: src/routes and src/features)
# for JSX text content and common user-facing string props (title, label,
# placeholder, alt, aria-label).
#
# INC-133 — the JSX-text rule's CLOSING ANCHOR IS A CLOSING TAG. The original
# pattern ended at a bare `<`, so a TypeScript generic on a value expression —
# `() => Promise<unknown>` — read as ">…<" and was reported as user-visible
# copy. That false positive is worse than a miss: it teaches the operator to
# ignore the scanner. The anchor is now `</`, which only a real element's
# closing tag can supply.
#
# Usage:  bash scripts/check-hardcoded-strings.sh [<root> ...]
# Fixtures (guard proof, same discipline as check-listing-writes.sh):
#   scripts/fixtures/string-scan-bad   -> must FAIL
#   scripts/fixtures/string-scan-good  -> must PASS
set -uo pipefail

echo "================================================================"
echo " ENFORCING: hardcoded string scan — findings FAIL the run"
echo "================================================================"

targets=()
if [ "$#" -gt 0 ]; then
  targets=("$@")
else
  [ -d "src/routes" ] && targets+=("src/routes")
  [ -d "src/features" ] && targets+=("src/features")
fi

if [ ${#targets[@]} -eq 0 ]; then
  echo "No target directories present; nothing to scan."
  echo "findings: 0"
  exit 0
fi

findings=0
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

# JSX text content: >Some Text</   (letters only; the closing anchor is a real
# closing tag, so generics such as Promise<unknown> cannot match).
grep -RnE '>[[:space:]]*[A-Za-z][A-Za-z0-9 ,.:;!?%\-]{2,}[[:space:]]*</' \
  --include='*.tsx' --include='*.tsx.txt' "${targets[@]}" >>"$tmp" 2>/dev/null || true

# Common user-facing string props with literal string values.
grep -RnE '(title|label|placeholder|alt|aria-label)="[^"{}]{2,}"' \
  --include='*.tsx' --include='*.tsx.txt' "${targets[@]}" >>"$tmp" 2>/dev/null || true

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
