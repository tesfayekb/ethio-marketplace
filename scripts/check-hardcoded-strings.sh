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

# --- scan core -------------------------------------------------------------
# Emits the finding lines for the given roots on stdout; no verdict.
scan() {
  local out
  out="$(
    grep -RnE '>[[:space:]]*[A-Za-z][A-Za-z0-9 ,.:;!?%\-]{2,}[[:space:]]*</' \
      --include='*.tsx' --include='*.tsx.txt' "$@" 2>/dev/null
    grep -RnE '(title|label|placeholder|alt|aria-label)="[^"{}]{2,}"' \
      --include='*.tsx' --include='*.tsx.txt' "$@" 2>/dev/null
  )"
  printf '%s' "$out" | sed '/^$/d' | sort -u
}

count() { scan "$@" | grep -c . ; }

# --- IN-SCRIPT SELF-TEST (C2-UI-FIX-3) -------------------------------------
# The guard proves itself before it judges anything: the bad fixture must
# produce at least one finding, the good fixture exactly zero. A guard that
# cannot bite (or that bites a TypeScript generic) is worse than no guard, so
# a mismatch is a hard exit 2 — never a scan verdict.
BAD_FIXTURE="scripts/fixtures/string-scan-bad"
GOOD_FIXTURE="scripts/fixtures/string-scan-good"
if [ -d "$BAD_FIXTURE" ] && [ -d "$GOOD_FIXTURE" ]; then
  bad_n="$(count "$BAD_FIXTURE")"
  good_n="$(count "$GOOD_FIXTURE")"
  echo "self-test: bad fixture findings=$bad_n (expect >=1), good fixture findings=$good_n (expect 0)"
  if [ "$bad_n" -lt 1 ] || [ "$good_n" -ne 0 ]; then
    echo "SELF-TEST FAILED: guard does not discriminate (bad=$bad_n good=$good_n)."
    exit 2
  fi
else
  echo "SELF-TEST FAILED: fixture pair missing ($BAD_FIXTURE / $GOOD_FIXTURE)."
  exit 2
fi

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
report="$(scan "${targets[@]}")"
if [ -n "$report" ]; then
  printf '%s\n' "$report"
  findings=$(printf '%s\n' "$report" | grep -c .)
fi


echo "findings: $findings"
if [ "$findings" -gt 0 ]; then
  echo "FAIL: user-visible strings must use i18n keys (law D1)."
  exit 1
fi
exit 0
