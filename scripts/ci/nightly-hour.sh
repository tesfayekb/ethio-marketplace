#!/usr/bin/env bash
# DEC-277 (Foundations turn K3) — THE NIGHTLY STARTS AT 11:30 IN NEW YORK, ALL YEAR.
# Usage: bash scripts/ci/nightly-hour.sh <event name> [<cron> [<UTC day YYYY-MM-DD>]]
# GitHub's schedules are in UTC, so the nightly carries two: 15:30 UTC (New York on summer
# time) and 16:30 UTC (winter time). Each scheduled run asks this script whether ITS cron, on
# the run's UTC day, falls at 11 o'clock in New York; only that one goes on. The answer reads
# the schedule that fired (github.event.schedule), never the clock: a run GitHub starts late is
# judged by the hour it was due, so a delay can never skip both. A run started by hand
# (workflow_dispatch) always goes on. Prints "go=true|false" (and writes it to $GITHUB_OUTPUT
# when GitHub provides one); a cron it cannot read, or a New York zone this machine cannot
# resolve (INC-962), is an error (exit 2), never a silent skip.
set -euo pipefail

readonly WANT_HOUR=11
# INC-998 — the zone's name. CI uses the named zone; a test pins its own zone with New York's
# rule written out (NIGHTLY_ZONE="EST5EDT,M3.2.0,M11.1.0"), so it passes on any machine.
readonly ZONE="${NIGHTLY_ZONE:-America/New_York}"
event="${1:-}"
cron="${2:-}"
day="${3:-$(date -u +%F)}"

say() {
  echo "go=$1"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then echo "go=$1" >>"$GITHUB_OUTPUT"; fi
}

if [ -z "$event" ]; then
  echo "::error title=nightly-hour::usage: nightly-hour.sh <event name> [<cron> [<UTC day>]]" >&2
  exit 2
fi
if [ "$event" != "schedule" ]; then
  echo "nightly-hour: started by ${event} — runs now"
  say true
  exit 0
fi
# INC-962 — the zone must resolve: on a machine without the time-zone files `date` reads
# America/New_York as UTC without a word, and both schedules would stand down silently.
if [ "$(TZ="$ZONE" date -d 2026-01-15T12:00:00Z +%z 2>/dev/null)" != "-0500" ] ||
  [ "$(TZ="$ZONE" date -d 2026-07-15T12:00:00Z +%z 2>/dev/null)" != "-0400" ]; then
  echo "::error title=nightly-hour::the America/New_York time zone does not resolve on this machine (no time-zone files?)" >&2
  exit 2
fi
if ! [[ "$cron" =~ ^([0-9]{1,2})\ ([0-9]{1,2})\ \*\ \*\ \*$ ]]; then
  echo "::error title=nightly-hour::cannot read the schedule \"${cron}\" (expected \"M H * * *\")" >&2
  exit 2
fi
minute=$((10#${BASH_REMATCH[1]}))
hour=$((10#${BASH_REMATCH[2]}))
if [ "$minute" -gt 59 ] || [ "$hour" -gt 23 ]; then
  echo "::error title=nightly-hour::cannot read the schedule \"${cron}\" (minute 0-59, hour 0-23)" >&2
  exit 2
fi
if ! [[ "$day" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "::error title=nightly-hour::cannot read the day \"${day}\" (expected YYYY-MM-DD)" >&2
  exit 2
fi
due=$(printf '%sT%02d:%02d:00Z' "$day" "$hour" "$minute")
if ! local_time=$(TZ="$ZONE" date -d "$due" +%H:%M 2>/dev/null); then
  echo "::error title=nightly-hour::cannot read the day \"${day}\"" >&2
  exit 2
fi
if [ "$((10#${local_time%%:*}))" -eq "$WANT_HOUR" ]; then
  echo "nightly-hour: \"${cron}\" on ${day} is ${local_time} in New York — this is the nightly's run"
  say true
else
  echo "nightly-hour: \"${cron}\" on ${day} is ${local_time} in New York — the other schedule runs today"
  say false
fi
