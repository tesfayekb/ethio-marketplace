#!/usr/bin/env bash
# INC-935 (Foundations turn 34e, DEC-275) — EVERY OUTSIDE CALL IN CI CARRIES A DEADLINE.
# Usage: bash scripts/ci/with-deadline.sh <seconds> <tries> -- <command> [args...]
# Runs the command under coreutils `timeout` (its whole process group is signalled; a
# command that ignores TERM is killed 15 s later). A failed or overdue try is retried
# after a 10-second pause, at most <tries> times in all, each retry announced as a
# GitHub warning so a retry is never silent; the last try's exit code is the step's.
# Only for steps that can be run again safely (installs, downloads).
set -u
if [ "$#" -lt 4 ] || [ "$3" != "--" ]; then
  echo "usage: with-deadline.sh <seconds> <tries> -- <command> [args...]" >&2
  exit 2
fi
seconds=$1
tries=$2
shift 3
case "$seconds$tries" in
  *[!0-9]*)
    echo "with-deadline.sh: <seconds> and <tries> are whole numbers" >&2
    exit 2
    ;;
esac
if [ "$seconds" -lt 1 ] || [ "$tries" -lt 1 ]; then
  echo "with-deadline.sh: <seconds> and <tries> are at least 1" >&2
  exit 2
fi
pause=${WITH_DEADLINE_PAUSE:-10}
attempt=1
while :; do
  timeout --kill-after=15 "$seconds" "$@"
  code=$?
  if [ "$code" -eq 0 ]; then
    exit 0
  fi
  if [ "$code" -eq 124 ] || [ "$code" -eq 137 ]; then
    what="ran past its ${seconds}s deadline"
  else
    what="failed with exit ${code}"
  fi
  if [ "$attempt" -ge "$tries" ]; then
    echo "::error title=ci-deadline::$* ${what} on try ${attempt} of ${tries}"
    exit "$code"
  fi
  echo "::warning title=ci-retry::$* ${what} on try ${attempt} of ${tries}; trying again"
  attempt=$((attempt + 1))
  sleep "$pause"
done
