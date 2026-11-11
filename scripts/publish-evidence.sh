#!/usr/bin/env bash
# DEC-098 — publish CI evidence files to branch ci-evidence (never dev, never main).
#
# Usage: bash scripts/publish-evidence.sh "<commit message>" <file> [<file>...]
#   Each <file> is a path under docs/tracking/ in the current checkout and is
#   published on ci-evidence at the path its ref maps it to (DEC-321, below).
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
#
# DEC-321 (housekeeping turn 3) — evidence per ref. Every caller sets
# EVIDENCE_REF to the ref its run tested. For `dev` each file publishes at its
# own path; for any other ref at docs/tracking/branches/<ref>/<basename>, the
# ref sanitised to [A-Za-z0-9._/-]; a ref with `..`, a `.` segment, a leading
# or trailing `/`, or nothing left is refused, so no ref names a path outside
# branches/. The flake ledger (DEC-030, append-only history) stays one file for
# every ref. A missing or refused ref is refused like a path outside
# docs/tracking (a ::warning::, exit 0).
#   bash scripts/publish-evidence.sh --print-path <ref> <file>
# prints the path a file publishes at (exit 2 when the ref is refused).
set -u

BRANCH="ci-evidence"
LEDGER="docs/tracking/flake-ledger.md"
SEED_FILES=(
  docs/tracking/ci-status.md
  docs/tracking/guards-last-failure.md
  docs/tracking/e2e-last-failure.md
  docs/tracking/flake-ledger.md
  docs/tracking/nightly-status.md
  docs/tracking/nightly-last-failure.md
)

# The path <file> publishes at for <ref>; status 1, and nothing printed, when the ref is refused.
evidence_path() {
  local ref=$1 file=$2 clean
  if [ "$ref" = "dev" ] || [ "$file" = "$LEDGER" ]; then
    printf '%s\n' "$file"
    return 0
  fi
  clean=$(printf '%s' "$ref" | LC_ALL=C tr -c 'A-Za-z0-9._/-' '-')
  case "$clean" in '' | /* | */ | *..*) return 1 ;; esac
  case "/$clean/" in *//* | */./*) return 1 ;; esac
  printf 'docs/tracking/branches/%s/%s\n' "$clean" "$(basename "$file")"
}

if [ "${1:-}" = "--print-path" ]; then
  if [ "$#" -ne 3 ]; then
    echo "usage: bash scripts/publish-evidence.sh --print-path <ref> <file>" >&2
    exit 2
  fi
  evidence_path "$2" "$3" || {
    echo "publish-evidence: refusing ref $2" >&2
    exit 2
  }
  exit 0
fi

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
ref="${EVIDENCE_REF:-}"
if [ -z "$ref" ]; then
  echo "::warning::publish-evidence: refusing to publish without EVIDENCE_REF (DEC-321)"
  exit 0
fi
targets=()
for f in "${files[@]}"; do
  if ! target="$(evidence_path "$ref" "$f")"; then
    echo "::warning::publish-evidence: refusing ref $ref (DEC-321)"
    exit 0
  fi
  targets+=("$target")
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

  for i in "${!files[@]}"; do
    f="${files[$i]}"
    t="${targets[$i]}"
    if [ -f "$src_root/$f" ]; then
      mkdir -p "$(dirname "$EVIDENCE_DIR/$t")"
      cp "$src_root/$f" "$EVIDENCE_DIR/$t"
      gitw add -- "$t"
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
    echo "publish-evidence: published ${targets[*]} to $BRANCH."
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
