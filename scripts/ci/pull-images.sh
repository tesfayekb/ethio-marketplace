#!/usr/bin/env bash
# DEC-309 (Foundations turn CI-3a) — PULL THE BACKEND IMAGES, SURVIVING THE REGISTRY'S LIMIT.
# Usage: bash scripts/ci/pull-images.sh <images.txt>   (one image reference a line)
# An image already present is skipped. Each missing image is pulled at most 4 times, each try under
# scripts/ci/with-deadline.sh (300 s, one try), with a jittered backoff between tries: 5, 15 and 45 s,
# each times a random factor in [0.7, 1.3]. Each wait is announced as a GitHub warning, never silent.
# When an image's 4th try fails, the script prints "registry refusal — infrastructure" and exits 3,
# so the caller fails BEFORE `supabase start`: no migration has run, so there is nothing to replay.
# Test seams: PULL_IMAGES_DOCKER (the docker command), PULL_IMAGES_SLEEP=0 (print the waits, do not sleep).
# Guard: scripts/ci/pull-images.test.ts (PIM-1…4).
set -u
if [ "$#" -ne 1 ] || [ ! -f "$1" ]; then
  echo "usage: pull-images.sh <images.txt>" >&2
  exit 2
fi
here=$(cd "$(dirname "$0")" && pwd)
docker_cmd=${PULL_IMAGES_DOCKER:-docker}
tries=4
bases=(5 15 45)

while IFS= read -r image || [ -n "$image" ]; do
  [ -n "$image" ] || continue
  if "$docker_cmd" image inspect "$image" > /dev/null 2>&1; then
    continue
  fi
  attempt=1
  while :; do
    if bash "$here/with-deadline.sh" 300 1 -- "$docker_cmd" pull --quiet "$image" > /dev/null; then
      break
    fi
    if [ "$attempt" -ge "$tries" ]; then
      echo "::error::pull-images: $image failed $tries tries"
      echo "registry refusal — infrastructure"
      exit 3
    fi
    base=${bases[$((attempt - 1))]}
    # base × [0.70, 1.30], in whole seconds
    wait=$(( (base * (70 + RANDOM % 61) + 50) / 100 ))
    echo "::warning::pull-images: $image try $attempt of $tries failed; waiting ${wait}s"
    if [ "${PULL_IMAGES_SLEEP:-1}" != "0" ]; then sleep "$wait"; fi
    attempt=$((attempt + 1))
  done
done < "$1"
exit 0
