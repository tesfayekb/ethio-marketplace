#!/usr/bin/env bash
# INC-832: shell guards capture producers before an early-exiting grep.
set -euo pipefail

scan() {
  local dir="$1"
  awk '/^[[:space:]]*#/ { next } /\| *grep -q/ { print FILENAME ":" FNR ":" $0; bad=1 } END { exit bad ? 1 : 0 }' "$dir"/*.sh
}

if [ "${SELF_TEST:-}" = "1" ]; then
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  printf 'producer |%s\n' ' grep -q needle' > "$tmp/bad.sh"
  if scan "$tmp" > "$tmp/refused"; then
    echo "Shell-pipes self-test FAILED: planted pipe passed"; exit 1
  fi
  grep -q 'bad.sh:1:' "$tmp/refused" || { echo "Shell-pipes self-test FAILED: wrong refusal"; exit 1; }
  scan scripts
  echo "Shell-pipes self-test OK: planted pipe refused; scripts clean."
fi
scan scripts
echo "Shell-pipes guard OK."