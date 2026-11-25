#!/usr/bin/env bash
# INC-1101 (housekeeping turn 3, DEC-366 — amends DEC-276) — THE BROWSER'S SYSTEM LIBRARIES SURVIVE
# ONE APT MIRROR. Every CI site installs them only here (CF-CID-1), as
# `bash scripts/ci/with-deadline.sh 1500 1 -- bash scripts/ci/install-browser-deps.sh`: one deadline
# around the whole script, so the probe's waits and a second run spend what is left of it.
# Before the install it resolves every host apt will use — each line of the runner's mirror list
# when ubuntu.sources names `mirror+file:` (actions/runner-images configure-apt-sources.sh), else
# the host of each deb822 `URIs:` entry and the public archive's two hosts it may be swapped for —
# and prints the table. A host that does not resolve is dropped from the mirror list (in the plain
# `URIs:` case, swapped for the public archive host that resolves), each drop announced. When no
# host resolves, the probe repeats every 30 s, five times at most.
# The install runs once. A failure at apt's fetch stage (a resolve or fetch error and no
# `Unpacking` / `Setting up` line: apt fetches every archive before it unpacks one, so the package
# manager is untouched) gets one re-probe and ONE more run; any other failure, or a second
# fetch-stage failure, is final (INC-943).
# INC-1277 (cursor bundle 6, DEC-462) — A SLOW MIRROR IS LEFT, NOT WAITED ON. A mirror that resolves
# can still serve at 50-90 kB/s (the repeat lane's two 1500 s deadlines, runs 45332415048 and
# 45337319415). After the resolve probe, in the runner's mirror-list form, each remaining host serves
# one small index file (the first suite's InRelease) under a $INSTALL_DEPS_PROBE_SECS (15 s) limit;
# the table prints its speed; a host under $INSTALL_DEPS_MIN_KBPS (150 kB/s) or with no answer is
# dropped for the next in the list, never the last one standing. apt itself gets a per-connection
# stall timeout and retries (apt.conf.d/99ci-mirror-timeouts), so a mirror that stalls mid-download
# is left rather than waited on. No package cache: if the install is red as INFRA twice in seven days
# after this, the cache comes as its own turn (DEC-462's judge).
# INSTALL_DEPS_ROOT (default /), INSTALL_DEPS_PAUSE (default 30 s) and INSTALL_DEPS_THROUGHPUT
# (default 1; 0 skips the speed probe) exist for the test.
# DEC-371 (the pictures turn): the arguments are the browsers whose libraries to install, a list
# (`chromium webkit`); none means chromium. A name beyond chromium and webkit is refused before any
# probe, so a typo never installs nothing quietly. Every browser a job's Playwright projects name
# is installed in that job (CF-CID-8).
set -u
browsers=("$@")
if [ "${#browsers[@]}" -eq 0 ]; then browsers=(chromium); fi
for browser in "${browsers[@]}"; do
  case "$browser" in
    chromium | webkit) ;;
    *)
      echo "::error title=ci-mirror::unknown browser \"$browser\" (chromium or webkit)"
      exit 2
      ;;
  esac
done
echo "ci-mirror browsers: ${browsers[*]}"
root=${INSTALL_DEPS_ROOT:-/}
root=${root%/}
pause=${INSTALL_DEPS_PAUSE:-30}
min_bps=$(( ${INSTALL_DEPS_MIN_KBPS:-150} * 1000 ))
probe_secs=${INSTALL_DEPS_PROBE_SECS:-15}
apt_conf="$root/etc/apt/apt.conf.d/99ci-mirror-timeouts"
waits=5
sources="$root/etc/apt/sources.list.d/ubuntu.sources"
mirrors="$root/etc/apt/apt-mirrors.txt"
public_hosts="archive.ubuntu.com security.ubuntu.com"
log=$(mktemp)
trap 'rm -f "$log"' EXIT

mode=none
if [ -f "$sources" ]; then
  if grep -q 'mirror+file:' "$sources"; then
    if [ -f "$mirrors" ]; then mode=mirrors; fi
  else
    mode=uris
  fi
fi

# The host of a URI: http://azure.archive.ubuntu.com/ubuntu/ → azure.archive.ubuntu.com.
host_of() {
  local rest=${1#*://}
  rest=${rest%%/*}
  printf '%s\n' "${rest%%:*}"
}

# Every host apt will use, once each, in the order apt reads them.
hosts() {
  if [ "$mode" = mirrors ]; then
    local line
    while IFS= read -r line; do
      case "$line" in '' | '#'*) continue ;; esac
      host_of "${line%%[[:space:]]*}"
    done < "$mirrors"
  elif [ "$mode" = uris ]; then
    local uri
    sed -n 's/^URIs:[[:space:]]*//p' "$sources" | tr ' \t' '\n\n' | while IFS= read -r uri; do
      case "$uri" in *://*) host_of "$uri" ;; esac
    done
    printf '%s\n' "$public_hosts" | tr ' ' '\n'
  fi | awk '!seen[$0]++'
}

# Resolves each host; sets `good` and `bad` (space-separated) and prints the table.
probe() {
  good=""
  bad=""
  local host
  while IFS= read -r host; do
    if getent hosts "$host" > /dev/null 2>&1; then
      good="${good:+$good }$host"
      echo "ci-mirror probe: $host → ok"
    else
      bad="${bad:+$bad }$host"
      echo "ci-mirror probe: $host → no address"
    fi
  done < <(hosts)
  if [ -z "$good$bad" ]; then
    echo "ci-mirror probe: no Ubuntu archive host in $sources — nothing probed"
  fi
}

# Writes a root-owned apt file from a temporary copy.
replace() {
  if [ -w "$1" ]; then cat "$2" > "$1"; else sudo cp "$2" "$1"; fi
}

# Drops (or swaps) every host the last probe could not resolve.
drop() {
  [ -n "$bad" ] || return 0
  local tmp host line keep public pattern
  tmp=$(mktemp)
  if [ "$mode" = mirrors ]; then
    while IFS= read -r line; do
      keep=1
      case "$line" in
        '' | '#'*) ;;
        *)
          host=$(host_of "${line%%[[:space:]]*}")
          case " $bad " in *" $host "*) keep=0 ;; esac
          ;;
      esac
      if [ "$keep" = 1 ]; then printf '%s\n' "$line"; fi
    done < "$mirrors" > "$tmp"
    replace "$mirrors" "$tmp"
    for host in $bad; do
      echo "::warning title=ci-mirror::$host does not resolve — dropped"
    done
  else
    cp "$sources" "$tmp"
    for host in $bad; do
      case " $public_hosts " in *" $host "*) continue ;; esac
      case "$host" in
        *security*) public=security.ubuntu.com ;;
        *) public=archive.ubuntu.com ;;
      esac
      case " $good " in
        *" $public "*) ;;
        *)
          for public in $public_hosts ""; do
            case " $good " in *" $public "*) break ;; esac
          done
          ;;
      esac
      if [ -z "$public" ]; then
        echo "::warning title=ci-mirror::$host does not resolve — kept (no public archive host resolves)"
        continue
      fi
      pattern=$(printf '%s' "$host" | sed 's/\./\\./g')
      sed -E "s#://${pattern}([/[:space:]]|\$)#://${public}\\1#g" "$tmp" > "$tmp.next"
      mv "$tmp.next" "$tmp"
      echo "::warning title=ci-mirror::$host does not resolve — swapped for $public"
    done
    if ! cmp -s "$sources" "$tmp"; then replace "$sources" "$tmp"; fi
  fi
  rm -f "$tmp"
}

# The first suite ubuntu.sources names (the index file's directory); noble when it names none.
first_suite() {
  local suite
  suite=$(sed -n 's/^Suites:[[:space:]]*//p' "$sources" 2> /dev/null | head -n 1 | awk '{print $1}')
  printf '%s\n' "${suite:-noble}"
}

# Mirror-list form only: measures each host's speed on one small index file, prints the table, and
# drops a host that is slow or does not answer for the next in the list — never the last one standing.
throughput() {
  [ "$mode" = mirrors ] || return 0
  [ "${INSTALL_DEPS_THROUGHPUT:-1}" = 1 ] || return 0
  local suite line base host bps tmp slow="" fast=0
  suite=$(first_suite)
  tmp=$(mktemp)
  while IFS= read -r line; do
    case "$line" in '' | '#'*) continue ;; esac
    base=${line%%[[:space:]]*}
    base=${base%/}
    host=$(host_of "$base")
    bps=$(curl -fsS -m "$probe_secs" -o /dev/null -w '%{speed_download}' "$base/dists/$suite/InRelease" 2> /dev/null) || bps=0
    bps=${bps%%.*}
    bps=${bps:-0}
    if [ "$bps" -ge "$min_bps" ]; then
      fast=$((fast + 1))
      echo "ci-mirror throughput: $host → $((bps / 1000)) kB/s ok"
    else
      slow="${slow:+$slow }$host"
      echo "ci-mirror throughput: $host → $((bps / 1000)) kB/s slow or no answer (under $((min_bps / 1000)) kB/s)"
    fi
  done < "$mirrors"
  if [ -z "$slow" ]; then
    rm -f "$tmp"
    return 0
  fi
  if [ "$fast" -eq 0 ]; then
    echo "::warning title=ci-mirror::no mirror is fast enough ($slow) — all kept"
    rm -f "$tmp"
    return 0
  fi
  while IFS= read -r line; do
    case "$line" in
      '' | '#'*) ;;
      *)
        host=$(host_of "${line%%[[:space:]]*}")
        case " $slow " in *" $host "*) continue ;; esac
        ;;
    esac
    printf '%s\n' "$line"
  done < "$mirrors" > "$tmp"
  replace "$mirrors" "$tmp"
  rm -f "$tmp"
  for host in $slow; do
    echo "::warning title=ci-mirror::$host is slow or does not answer — dropped for the next mirror"
  done
}

# apt leaves a mirror that stalls: a per-connection stall timeout and retries for the install.
apt_timeouts() {
  local tmp
  tmp=$(mktemp)
  printf '%s\n' 'Acquire::http::Timeout "20";' 'Acquire::https::Timeout "20";' 'Acquire::Retries "2";' > "$tmp"
  local dir
  dir=$(dirname "$apt_conf")
  if [ -w "$dir" ]; then
    cat "$tmp" > "$apt_conf"
  elif ! sudo cp "$tmp" "$apt_conf"; then
    echo "::warning title=ci-mirror::apt's stall timeouts could not be written to $apt_conf"
  fi
  rm -f "$tmp"
}

# Probes, waits while nothing resolves (at most $1 more probes), then drops what does not.
prepare() {
  local more=$1 n=0
  probe
  while [ -n "$bad" ] && [ -z "$good" ] && [ "$n" -lt "$more" ]; do
    n=$((n + 1))
    echo "::warning title=ci-mirror::no apt mirror resolves ($bad) — probing again in ${pause}s ($n of $more)"
    sleep "$pause"
    probe
  done
  if [ -n "$bad" ] && [ -z "$good" ]; then
    echo "::error title=ci-mirror::no apt mirror resolves ($bad)"
    return 1
  fi
  drop
  throughput
  apt_timeouts
}

install() {
  bunx playwright install-deps "${browsers[@]}" 2>&1 | tee "$log"
  return "${PIPESTATUS[0]}"
}

# apt failed before it unpacked anything: a resolve or fetch error, no unpack line.
fetch_stage() {
  grep -Eq "Temporary failure resolving|E: Unable to fetch some archives" "$log" &&
    ! grep -Eq "^(Unpacking|Setting up) " "$log"
}

prepare "$waits" || exit 1
install
code=$?
if [ "$code" -eq 0 ]; then exit 0; fi
if ! fetch_stage; then
  echo "::error title=ci-mirror::the install failed (exit $code) after apt's fetch stage — final, never run twice (DEC-276)"
  exit "$code"
fi
echo "::warning title=ci-mirror::the install failed at apt's fetch stage (exit $code) — probing again, one more run"
prepare 0 || exit 1
install
code=$?
if [ "$code" -eq 0 ]; then exit 0; fi
if fetch_stage; then
  echo "::error title=ci-mirror::the install failed at apt's fetch stage twice (exit $code; hosts: $good) — final"
else
  echo "::error title=ci-mirror::the install failed (exit $code) on its second run — final"
fi
exit "$code"
