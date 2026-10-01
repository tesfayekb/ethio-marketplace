#!/usr/bin/env bash
# DEC-098 — publish CI evidence files to branch ci-evidence (never dev, never main).
#
# Usage: bash scripts/publish-evidence.sh "<commit message>" <file> [<file>...]
#   Each <file> is a path under docs/tracking/ in the current checkout and is
#   published at the same path on ci-evidence.
#
# Law:
#   - Works in a separate worktree; the current checkout is never changed.
#   - Pushes only refs/heads/ci-evidence.
#   - Missing origin/ci-evidence → created as an orphan seeded with the six
#     evidence files as they are on origin/dev (the flake ledger keeps history).
#   - Three attempts (fetch, reset, copy, commit-if-changed, push); after three
#     rejections a ::warning:: and exit 0 — bookkeeping never reddens a job.
#
# Optional hook: PUBLISH_EVIDENCE_PREPARE is a shell command run from the
# caller's directory on EVERY attempt, after the worktree is reset to the
# freshly fetched ci-evidence and before the files are copied in. It sees
# EVIDENCE_DIR (the worktree root). ci.yml uses it to re-run the DEC-030 flake
# pass against the published ledger, so the ledger stays append-only.
set -u

BRANCH="ci-evidence"
SEED_FILES=(
  docs/tracking/ci-status.md
  docs/tracking/guards-last-failure.md
  docs/tracking/e2e-last-failure.md
  docs/tracking/flake-ledger.md
  docs/tracking/nightly-status.md
  docs/tracking/nightly-last-failure.md
)

if [ "$#" -lt 2 ]; then
  echo "usage: bash scripts/publish-evidence.sh \"<commit message>\" <file> [<file>...]" >&2
  exit 2
fi
message="$1"
shift
files=("$@")
for f in "${files[@]}"; do
  case "$f" in
    docs/tracking/*) ;;
    *)
      echo "::warning::publish-evidence: refusing $f (not under docs/tracking/)"
      exit 0
      ;;
  esac
done

src_root="$(pwd)"
work="$(mktemp -d)"
export EVIDENCE_DIR="$work/tree"
cleanup() {
  git -C "$src_root" worktree remove --force "$EVIDENCE_DIR" >/dev/null 2>&1 || true
  git -C "$src_root" worktree prune >/dev/null 2>&1 || true
  rm -rf "$work"
}
trap cleanup EXIT

# Same bot identity as before DEC-098, scoped to the worktree commits only.
gitw() {
  git -C "$EVIDENCE_DIR" \
    -c user.name="github-actions[bot]" \
    -c user.email="41898282+github-actions[bot]@users.noreply.github.com" "$@"
}

pushed=0
for attempt in 1 2 3; do
  git -C "$src_root" worktree remove --force "$EVIDENCE_DIR" >/dev/null 2>&1 || true
  rm -rf "$EVIDENCE_DIR"

  if git -C "$src_root" fetch --quiet origin "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH" 2>/dev/null; then
    git -C "$src_root" worktree add --quiet --detach "$EVIDENCE_DIR" "origin/$BRANCH" || break
  else
    # First publication: orphan branch seeded from origin/dev.
    git -C "$src_root" fetch --quiet origin "+refs/heads/dev:refs/remotes/origin/dev" || break
    git -C "$src_root" worktree add --quiet --detach "$EVIDENCE_DIR" "origin/dev" || break
    gitw checkout --quiet --orphan "evidence-seed-$$-$attempt"
    gitw rm -rf --quiet . >/dev/null
    mkdir -p "$EVIDENCE_DIR/docs/tracking"
    for s in "${SEED_FILES[@]}"; do
      if git -C "$src_root" cat-file -e "origin/dev:$s" 2>/dev/null; then
        git -C "$src_root" show "origin/dev:$s" >"$EVIDENCE_DIR/$s"
        gitw add -- "$s"
      fi
    done
    gitw commit --quiet --allow-empty -m "ci: seed ci-evidence from dev [skip ci]"
  fi

  if [ -n "${PUBLISH_EVIDENCE_PREPARE:-}" ]; then
    bash -c "$PUBLISH_EVIDENCE_PREPARE" ||
      echo "::warning::publish-evidence: prepare hook failed (attempt ${attempt}/3)"
  fi

  for f in "${files[@]}"; do
    if [ -f "$src_root/$f" ]; then
      mkdir -p "$(dirname "$EVIDENCE_DIR/$f")"
      cp "$src_root/$f" "$EVIDENCE_DIR/$f"
      gitw add -- "$f"
    fi
  done

  if gitw diff --cached --quiet; then
    if gitw rev-parse --verify --quiet "refs/remotes/origin/$BRANCH" >/dev/null &&
      [ "$(gitw rev-parse HEAD)" = "$(gitw rev-parse "refs/remotes/origin/$BRANCH")" ]; then
      echo "publish-evidence: no change; nothing to commit."
      pushed=1
      break
    fi
  else
    gitw commit --quiet -m "$message"
  fi

  if gitw push --quiet origin "HEAD:refs/heads/$BRANCH"; then
    echo "publish-evidence: published ${files[*]} to $BRANCH."
    pushed=1
    break
  fi
  echo "publish-evidence: push rejected (attempt ${attempt}/3); refetching."
  sleep "${PUBLISH_EVIDENCE_RETRY_SLEEP:-5}"
done

if [ "$pushed" -ne 1 ]; then
  echo "::warning::publish-evidence: push to $BRANCH failed after retries"
fi
exit 0
