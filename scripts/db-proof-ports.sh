# shellcheck shell=bash
# DEC-343, INC-1063 — THE STACK IS REACHABLE ONLY FROM THIS COMPUTER. Sourced by scripts/db-proof.sh.
# The pinned CLI publishes every service port with no host address, so Docker binds it on the address
# its engine's "ip" setting names (every interface when unset). db:proof reads what Docker published
# for the project's containers after every start and before any migration applies; one mapping on
# anything but 127.0.0.1 or ::1 refuses the run. db:proof never edits Docker's settings.

PORTS_OPEN_REFUSAL="the stack's ports are open beyond this computer: set Docker Desktop → Settings → Docker Engine \"ip\": \"127.0.0.1\", then run db:proof again"

# Every published port of the project's containers, from Docker itself: one line per container,
# "<name> <port>/<proto>=<host address>:<host port> …" (names and ports only).
stack_ports() {
  local ids
  ids=$(docker ps -q --filter "name=_${1}\$") || return 1
  [ -n "$ids" ] || return 1
  # shellcheck disable=SC2086
  docker inspect --format '{{.Name}}{{range $port, $binds := .NetworkSettings.Ports}}{{range $binds}} {{$port}}={{.HostIp}}:{{.HostPort}}{{end}}{{end}}' $ids
}

# Reads stack_ports' lines on stdin; prints the refusal when any mapping binds beyond this computer,
# nothing otherwise.
ports_refusal() {
  local name rest mapping address open=""
  while read -r name rest; do
    for mapping in $rest; do
      address=${mapping#*=}
      address=${address%:*}
      case "$address" in 127.0.0.1 | ::1) ;; *) open=1 ;; esac
    done
  done
  [ -z "$open" ] || echo "$PORTS_OPEN_REFUSAL"
}
