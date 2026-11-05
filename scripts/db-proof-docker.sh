#!/usr/bin/env bash
# DEC-343, INC-1063 — THE STACK'S MAPPINGS ON 127.0.0.1. db:proof links this file as `docker` first on
# PATH for the pinned CLI's `start` only (the one CLI call that creates containers). The CLI spawns the
# container CLI by name and writes each port as `<hostPort>:<containerPort>[/<protocol>]` with no
# address, and this engine honours only an explicit host address (measured: neither a network's
# host_binding_ipv4 nor the daemon's ip). Each `-p` / `--publish` value without an address gains
# 127.0.0.1; every other argument passes untouched. Then the real docker runs, by the absolute path
# db:proof resolved before it changed PATH ($DB_PROOF_REAL_DOCKER). The arguments carry the stack's
# local keys: they are never printed, logged or stored.
set -u

real="${DB_PROOF_REAL_DOCKER:-}"
if [ -z "$real" ] || [ "${real#/}" = "$real" ] || [ ! -x "$real" ] || [ "$real" -ef "$0" ]; then
  echo "db-proof docker wrapper: the real docker's absolute path is missing (DB_PROOF_REAL_DOCKER)" >&2
  exit 127
fi

# A mapping with no host address — `<hostPort>:<containerPort>[/<protocol>]`, ranges included — gains
# 127.0.0.1; anything else is returned as it is.
local_mapping() {
  if [[ $1 =~ ^[0-9]+(-[0-9]+)?:[0-9]+(-[0-9]+)?(/[a-z]+)?$ ]]; then
    printf '127.0.0.1:%s' "$1"
  else
    printf '%s' "$1"
  fi
}

# Only `run` and `create` publish ports; every other docker command passes as it came.
case "${1:-} ${2:-}" in
  "run "* | "create "* | "container run" | "container create") ;;
  *) exec "$real" ${1+"$@"} ;;
esac

args=()
publish_value=0
for arg in "$@"; do
  if [ "$publish_value" = 1 ]; then
    args+=("$(local_mapping "$arg")")
    publish_value=0
    continue
  fi
  case "$arg" in
    -p | --publish) publish_value=1 && args+=("$arg") ;;
    -p=*) args+=("-p=$(local_mapping "${arg#-p=}")") ;;
    --publish=*) args+=("--publish=$(local_mapping "${arg#--publish=}")") ;;
    *) args+=("$arg") ;;
  esac
done
exec "$real" ${args[@]+"${args[@]}"}
