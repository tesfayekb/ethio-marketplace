#!/usr/bin/env bash
# Register row 58: a brief's FILE and EDIT blocks reach the tree exactly, applied by scripts/brief/apply-blocks.ts
# (never retyped). Usage: bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]
set -euo pipefail
exec bun "$(dirname "$0")/apply-blocks.ts" "$@"
