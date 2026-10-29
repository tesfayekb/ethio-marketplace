#!/usr/bin/env bash
# INC-992 (Foundations turn N1b-3) — the lane job's run shell. It runs the step's script exactly as
# GitHub's default bash shell does (`bash --noprofile --norc -eo pipefail {0}`) and keeps a copy of
# its output under $RUNNER_TEMP/step-logs/<step id>.log, so "Name failed steps" can put a failed
# step's last lines into local-backend-failure.txt. GITHUB_ACTION is the step's id.
set -u
dir="${RUNNER_TEMP:-/tmp}/step-logs"
mkdir -p "$dir"
log="$dir/${GITHUB_ACTION:-unnamed}.log"
set -o pipefail
bash --noprofile --norc -eo pipefail "$1" 2>&1 | tee -a "$log"
exit "${PIPESTATUS[0]}"
