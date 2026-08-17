#!/usr/bin/env bash
# U1e PART 3 — NO-UNEXPLAINED-DELETIONS GUARD (INC-076 item 4, ratified).
#
# INC-076: a push from a stale checkout silently DELETED a whole phase's
# committed work. Nothing in CI noticed, because every remaining check was
# green on the (smaller) tree. This guard makes a deletion a deliberate,
# labelled act: any commit range that removes files must say so with the
# marker "[intentional-delete]" in one of its commit messages.
#
# Note on docs/tracking/*.md: the reporters REGENERATE those files (modify,
# never delete), so they need no exemption here — a deletion of one is a real
# finding, not noise.
#
# Usage:  bash scripts/check-deletions.sh [<before-sha>] [<head-sha>]
#         SELF_TEST=1 bash scripts/check-deletions.sh   # synthetic repo proof
set -uo pipefail

MARKER="[intentional-delete]"

run_guard() {
  local before="${1:-}" head="${2:-HEAD}"

  # A missing or zero "before" (first push, force-push, tag) has no usable
  # range: compare against the parent commit instead of guessing.
  if [ -z "$before" ] || [ "$before" = "0000000000000000000000000000000000000000" ] \
     || ! git cat-file -e "${before}^{commit}" 2>/dev/null; then
    before="${head}^"
    if ! git cat-file -e "${before}^{commit}" 2>/dev/null; then
      echo "No parent commit to compare against; nothing to check."
      return 0
    fi
  fi

  local deleted
  deleted="$(git diff --diff-filter=D --name-only "${before}..${head}")"

  if [ -z "$deleted" ]; then
    echo "No files deleted in ${before}..${head}."
    return 0
  fi

  if git log --format=%B "${before}..${head}" | grep -qF "$MARKER"; then
    echo "Deletions declared with ${MARKER}:"
    echo "$deleted"
    return 0
  fi

  echo "::error::Unexplained deletions in ${before}..${head} (INC-076)."
  echo "The following files were deleted with no ${MARKER} marker in any commit message:"
  echo "$deleted"
  echo "If the removal is intended, say so in the commit message; otherwise you are"
  echo "pushing from a stale checkout and are about to erase someone's work."
  return 1
}

self_test() {
  local tmp
  tmp="$(mktemp -d)"
  (
    set -e
    cd "$tmp"
    git init -q .
    git config user.email t@t.t
    git config user.name t
    mkdir -p src
    echo a >src/a.txt
    echo b >src/b.txt
    git add -A
    git commit -qm "base"
    local base
    base="$(git rev-parse HEAD)"

    # Direction 1: an undeclared deletion must FAIL.
    git rm -q src/b.txt
    git commit -qm "drop b"
    if SELF_TEST= bash "$OLDPWD/scripts/check-deletions.sh" "$base" HEAD >/dev/null 2>&1; then
      echo "SELF-TEST FAILED: undeclared deletion was not flagged." >&2
      exit 1
    fi

    # Direction 2: the same deletion, declared, must PASS.
    git commit -q --amend -m "drop b [intentional-delete]"
    if ! SELF_TEST= bash "$OLDPWD/scripts/check-deletions.sh" "$base" HEAD >/dev/null 2>&1; then
      echo "SELF-TEST FAILED: declared deletion was rejected." >&2
      exit 1
    fi

    # Direction 3: a pure addition must PASS.
    local mid
    mid="$(git rev-parse HEAD)"
    echo c >src/c.txt
    git add -A
    git commit -qm "add c"
    if ! SELF_TEST= bash "$OLDPWD/scripts/check-deletions.sh" "$mid" HEAD >/dev/null 2>&1; then
      echo "SELF-TEST FAILED: an addition-only range was rejected." >&2
      exit 1
    fi
  )
  local status=$?
  rm -rf "$tmp"
  if [ "$status" -ne 0 ]; then
    echo "Deletion-guard self-test FAILED."
    return 1
  fi
  echo "Self-test OK: undeclared deletion flagged, declared deletion allowed, additions allowed."
  return 0
}

if [ "${SELF_TEST:-}" = "1" ]; then
  self_test
  exit $?
fi

run_guard "${1:-${GITHUB_EVENT_BEFORE:-}}" "${2:-HEAD}"
exit $?
