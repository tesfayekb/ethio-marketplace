#!/usr/bin/env bash
# DEC-375 (b), cursor-ci-speed (ruling 1, decision 3) — THE LANE WEIGHTS, READ ONCE A RUN.
# Run by local-backend-proof.yml's backend-images job, the job every lane already waits for. It pins
# one ci-evidence commit, lists the weights files under docs/tracking/ there (the root's and every
# docs/tracking/branches/<ref>/lane-weights.json), and answers the one from the newest run (its
# `source.run`) as the job's outputs:
#   weights=<the file, one line>      weights_source=<where it came from>
# Every lane writes that one copy to a file and plans from it (scripts/ci/lane-plan.ts --weights),
# so every lane computes the same plan. The read never fails the run: a failed call, no file or an
# unreadable answer gives an empty `weights` and a `weights_source` naming the reason, and the lanes
# then plan from the committed scripts/ci/lane-weights.json. Only what the runner image carries
# (gh, jq); every call under scripts/ci/with-deadline.sh; GH_TOKEN is the run's own read token
# (DEC-116: it works while the repository is private).
#   REPO=<owner/name> GH_TOKEN=<token> bash scripts/ci/lane-weights-read.sh
set -u
out="${GITHUB_OUTPUT:-/dev/stdout}"
notice='^::(warning title=ci-retry|error title=ci-deadline)::'

# One call under its deadline: the answer on stdout; with-deadline's own notices (it prints them on
# stdout) go to the log as plain lines, never an annotation, since the read never fails the run.
call() {
  local said code
  said=$(bash scripts/ci/with-deadline.sh 60 2 -- "$@" 2> /dev/null)
  code=$?
  printf '%s\n' "$said" | grep -E "$notice" | sed -E "s/$notice/lane-weights: /" >&2
  printf '%s\n' "$said" | grep -Ev "$notice"
  return "$code"
}

answer() {
  {
    echo "weights=$1"
    echo "weights_source=$2"
  } >> "$out"
  echo "lane-weights: $2"
  exit 0
}
fallback() {
  answer "" "$1"
}

[ -n "${REPO:-}" ] || fallback "no repository named"
sha=$(call gh api "repos/$REPO/commits/ci-evidence" --jq .sha) ||
  fallback "the evidence branch could not be read"
case "$sha" in
  *[!0-9a-f]* | '') fallback "the evidence branch answered no commit" ;;
esac
tree=$(call gh api "repos/$REPO/git/trees/$sha?recursive=1") ||
  fallback "the evidence tree at ${sha:0:9} could not be read"
[ "$(printf '%s' "$tree" | jq -r '.truncated' 2> /dev/null)" = "false" ] ||
  fallback "the evidence tree at ${sha:0:9} came back cut or unreadable"
paths=$(printf '%s' "$tree" | jq -r '.tree[] | select(.type == "blob") | .path
  | select(test("^docs/tracking/(branches/.+/)?lane-weights\\.json$"))')
[ -n "$paths" ] || fallback "no weights file at evidence ${sha:0:9}"

best=""
best_run=0
best_path=""
unread=0
while IFS= read -r path; do
  text=$(call gh api -H "Accept: application/vnd.github.raw" "repos/$REPO/contents/$path?ref=$sha") || {
    unread=$((unread + 1))
    continue
  }
  run=$(printf '%s' "$text" | jq -r '.source.run | numbers' 2> /dev/null)
  case "$run" in
    '' | *[!0-9]*)
      unread=$((unread + 1))
      continue
      ;;
  esac
  if [ "$run" -gt "$best_run" ]; then
    best=$(printf '%s' "$text" | jq -c .)
    best_run=$run
    best_path=$path
  fi
done <<< "$paths"

[ -n "$best" ] || fallback "no readable weights file at evidence ${sha:0:9}"
answer "$best" "$best_path at evidence ${sha:0:9} (run $best_run; $unread of $(printf '%s\n' "$paths" | wc -l | tr -d ' ') files unread)"
