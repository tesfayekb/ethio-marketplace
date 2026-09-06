#!/usr/bin/env bash
# L4b PART C — DECLARED IDENTITY LAW guard.
#
# A test that MUTATES its own auth state (impersonation start/end, TOTP
# enrol/unenrol, or the admin factor APIs) may not borrow the job-scoped
# pooled super admin: its mutation would poison every sibling test that
# shares that identity. Such a test declares itself with the Playwright tag
# "@private-identity" (see e2e/helpers/ui.ts), and `useJobSuperAdmin` reads
# that tag to hand out a private mint instead of the pool.
#
# This guard fails when a test body touches one of the auth-mutating tokens
# without carrying the tag. Usage:
#   scripts/check-identity-tags.sh [dir]        # default: e2e
#   scripts/check-identity-tags.sh --self-test  # fixture proof
set -uo pipefail

TAG='@private-identity'

# Auth-state mutators. Read-only factor reads are NOT in this list.
TOKENS=(
  'begin_impersonation'
  'end_impersonation'
  'impersonation-begin'
  'impersonation-end'
  'impersonation-banner-end'
  'mfa-enroll'
  'mfa-remove-confirm'
  'mfa[.]enroll[(]'
  'mfa[.]unenroll[(]'
  'admin[.]mfa[.]deleteFactor'
  'enrollAndStepUp'
  'enrollThroughSettings'
)

# Sites convicted by the census but OUTSIDE the L4b scope (they mint their own
# identity today and are tagged in a follow-up landing). Named, never hidden.
DEFERRED=(
  'e2e/admin-categories-console.spec.ts:CT-7 step-up'
  'e2e/admin-translations-console.spec.ts:TR-1 sync'
)

scan_file() {
  # $1 = file. Walks the file, tracking the current test title, its tags and
  # whether the body used a mutating token.
  awk -v tag="$TAG" -v file="$1" -v tokens="$(IFS='|'; echo "${TOKENS[*]}")" '
    function flush() {
      if (title != "" && used && !tagged) {
        printf "%s:%d  %s  [missing %s]\n", file, line, title, tag
        bad = 1
      }
      title = ""; used = 0; tagged = 0
    }
    /^[[:space:]]*(test|test\.only)\(/ {
      flush()
      line = NR
      if (match($0, /"[^"]+"/)) title = substr($0, RSTART + 1, RLENGTH - 2)
      header = $0
      getline_ok = 1
    }
    { if (title != "") { if ($0 ~ tag) tagged = 1; if ($0 ~ tokens) used = 1 } }
    END { flush(); exit bad ? 1 : 0 }
  '
}

self_test() {
  tmp="$(mktemp -d)"
  cat >"$tmp/violation.spec.ts" <<'EOF'
import { test } from "./fixtures";

test("X-1 untagged test that unenrols its factor", async ({ page }) => {
  await page.getByTestId("mfa-remove-confirm").click();
});

test("X-2 tagged test that unenrols its factor", { tag: "@private-identity" }, async ({ page }) => {
  await page.getByTestId("mfa-remove-confirm").click();
});
EOF
  echo "[identity-tags] self-test fixture: one untagged violation + one tagged control"
  out="$(scan_file "$tmp/violation.spec.ts" <"$tmp/violation.spec.ts")"
  status=$?
  echo "$out"
  rm -rf "$tmp"
  if [ "$status" -eq 0 ] || ! echo "$out" | grep -q "X-1"; then
    echo "[identity-tags] SELF-TEST FAILED: the guard did not flag the violation"
    exit 1
  fi
  if echo "$out" | grep -q "X-2"; then
    echo "[identity-tags] SELF-TEST FAILED: the guard flagged the tagged control"
    exit 1
  fi
  echo "[identity-tags] self-test OK (flagged X-1 only)"
}

if [ "${1:-}" = "--self-test" ]; then
  self_test
  exit 0
fi

DIR="${1:-e2e}"
fail=0
while IFS= read -r file; do
  out="$(scan_file "$file" <"$file")"
  [ -z "$out" ] && continue
  skip=0
  for entry in "${DEFERRED[@]}"; do
    [ "${entry%%:*}" = "$file" ] && skip=1
  done
  if [ "$skip" -eq 1 ]; then
    echo "[identity-tags] deferred (outside L4b scope): $out"
  else
    echo "$out"
    fail=1
  fi
done < <(find "$DIR" -name '*.spec.ts' | sort)

if [ "$fail" -ne 0 ]; then
  echo "[identity-tags] FAIL — tag the tests above with $TAG (see e2e/helpers/ui.ts)."
  exit 1
fi
echo "[identity-tags] OK — every auth-state-mutating test declares $TAG."
for entry in "${DEFERRED[@]}"; do
  echo "[identity-tags] deferred, named: $entry"
done
