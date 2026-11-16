#!/usr/bin/env bash
# DEC-394 (the tests and CI turn, Part C) — A LOVABLE BRANCH'S PULL REQUEST CHANGES ONLY SCREEN
# FILES. Usage, in ci.yml's scope job on a pull request from a `lovable/*` branch:
#   gh api --paginate repos/<owner>/<repo>/pulls/<number>/files | bash scripts/ci/lovable-branch-guard.sh
# The input is the pull request's files as GitHub computes them against the merge base: one JSON
# array per page, each entry carrying `filename`, `status`, `previous_filename` (a rename) and
# `patch`. The script is pure over that input; it reads no git history.
#
# The rules are Knowledge v3.14's ROLE paragraph (DEC-386), which binds Lovable, word for word:
#   "NEVER touch: supabase/** or any SQL; sign-in, permission or personal-data code
#   (src/features/auth, src/lib/supabase-door.ts, src/server/**, src/routes/api/**); .github/**,
#   scripts/**, e2e helpers and global setup; package.json, bun.lock; roadmap.md and the ledgers
#   (docs/tracking/**, docs/governance/mechanisms.md, docs/_changelog.md, docs/spec/**). Two
#   exceptions, with the supervisor's exact text copied byte for byte and proven by sha256: your
#   deletion's line in docs/tracking/intentional-deletions.txt; a ceiling line in
#   scripts/route-budgets.mjs your change grows (DEC-390)."
# and the platform's own paths (INC-1168): src/integrations/supabase/**, .lovable/**.
#
# A third exception, DEC-396 (amends DEC-390): a conformance allowlist (scripts/conformance/
# <name>-allowlist.txt, directly under that folder) may LOSE lines — the form kit's wave 3 retires the
# CF-FORM-1 lines its own change makes stale. Removing an allowance narrows, never widens, so only
# `-` lines pass; an added or changed line, a rename, a new or deleted allowlist file refuses, and so
# does any other file under scripts/ (kit.ts, scripts/doors/manifest.txt, …).
#
# Every offending path is listed with its rule; then exit 1. The three exceptions are judged by
# content: the deletions file takes added lines only; every changed line of the ceilings file is a
# ceiling line; an allowlist takes removed lines only. A patch the API does not carry (a binary or a
# very large diff) under any exception refuses. Input that is not the API's JSON arrays is an error
# (exit 2), never a pass.
set -euo pipefail

readonly DELETIONS="docs/tracking/intentional-deletions.txt"
readonly CEILINGS="scripts/route-budgets.mjs"
# The shape of every route line of scripts/route-budgets.mjs, read from the file.
readonly CEILING_LINE='^  "[^"]+": \{ ceiling: [0-9]+, public: (true|false) \}, // .+$'

# A conformance allowlist (DEC-396): `scripts/conformance/` + one name ending `-allowlist.txt`. The
# `case` glob alone would let `*` cross a slash, so a nested path is ruled out beside it.
is_allowlist() {
  case "$1" in
    scripts/conformance/*-allowlist.txt) [[ "${1#scripts/conformance/}" != */* ]] ;;
    *) return 1 ;;
  esac
}

# One path rule per line: the path's pattern, then the rule and its DEC.
rule_for() {
  case "$1" in
    supabase/*) echo "supabase/** — the database (DEC-386)" ;;
    *.sql) echo "*.sql — SQL anywhere (DEC-386)" ;;
    src/features/auth/*) echo "src/features/auth/** — sign-in code (DEC-386)" ;;
    src/lib/supabase-door.ts) echo "src/lib/supabase-door.ts — sign-in code (DEC-386)" ;;
    src/server/*) echo "src/server/** — server code (DEC-386)" ;;
    src/routes/api/*) echo "src/routes/api/** — server routes (DEC-386)" ;;
    src/integrations/supabase/*) echo "src/integrations/supabase/** — the platform's client (INC-1168, DEC-386)" ;;
    .github/*) echo ".github/** — workflows (DEC-386)" ;;
    scripts/*) echo "scripts/** — the guards and tools (DEC-386; the two exceptions: a ceiling line, DEC-390; a removed allowlist line, DEC-396)" ;;
    e2e/helpers/*) echo "e2e/helpers/** — e2e helpers (DEC-386)" ;;
    e2e/global-setup.ts | e2e/global-teardown.ts | e2e/fixtures.ts) echo "$1 — e2e global setup (DEC-386)" ;;
    package.json | bun.lock) echo "$1 — dependencies (DEC-386)" ;;
    roadmap.md) echo "roadmap.md — a ledger (DEC-386)" ;;
    docs/tracking/*) echo "docs/tracking/** — a ledger (DEC-386; the one exception: a deletion's line, DEC-390)" ;;
    docs/governance/mechanisms.md | docs/_changelog.md) echo "$1 — a ledger (DEC-386)" ;;
    docs/spec/*) echo "docs/spec/** — a ledger (DEC-386)" ;;
    .lovable/*) echo ".lovable/** — the platform's notes (INC-1168, DEC-386)" ;;
    *) echo "" ;;
  esac
}

# The changed lines of a patch (`+` or `-`, never the hunk headers or the no-newline marker).
changed_lines() {
  local line
  while IFS= read -r line; do
    case "$line" in
      +* | -*) printf '%s\n' "$line" ;;
    esac
  done <<<"$1"
}

# An exception's verdict: empty when its patch holds only what DEC-390 or DEC-396 allows, else the
# reason.
exception_refusal() {
  local path="$1" has_patch="$2" patch="$3" status="$4" line dec="DEC-390"
  if is_allowlist "$path"; then dec="DEC-396"; fi
  if [ "$has_patch" != "1" ]; then
    echo "${path} — the API carries no patch for it (a binary or a very large diff), so ${dec}'s exception cannot be read"
    return
  fi
  if is_allowlist "$path" && [ "$status" != "modified" ]; then
    echo "${path} — ${status}; a Lovable branch may only remove lines of an existing allowlist — DEC-396; a new, renamed or deleted allowlist is refused"
    return
  fi
  while IFS= read -r line; do
    if [ -z "$line" ]; then continue; fi
    if is_allowlist "$path"; then
      if [ "${line:0:1}" != "-" ]; then
        echo "${path} — a Lovable branch may only remove an allowance — DEC-396; an added or changed line is refused"
        return
      fi
    elif [ "$path" = "$DELETIONS" ]; then
      if [ "${line:0:1}" = "-" ]; then
        echo "${path} — a removed or changed line; DEC-390 allows added lines only"
        return
      fi
    elif ! [[ "${line:1}" =~ $CEILING_LINE ]]; then
      echo "${path} — a changed line that is not a ceiling line; DEC-390 allows ceiling lines only"
      return
    fi
  done <<<"$(changed_lines "$patch")"
}

input="$(cat)"
if ! jq -e -s 'length > 0 and all(.[]; type == "array")' >/dev/null 2>&1 <<<"$input"; then
  echo "::error title=lovable-branch-guard::the input is not the pull request's files from the GitHub API (JSON arrays)" >&2
  exit 2
fi

refusals=()
count=0
# Fields joined by the unit separator: a tab is whitespace to `read`, so an empty field would shift.
while IFS=$'\x1f' read -r filename previous status has_patch; do
  count=$((count + 1))
  if [ "$filename" = "$DELETIONS" ] || [ "$filename" = "$CEILINGS" ] || is_allowlist "$filename"; then
    patch="$(jq -r --arg f "$filename" '.[] | select(.filename == $f) | .patch // ""' <<<"$input")"
    reason="$(exception_refusal "$filename" "$has_patch" "$patch" "$status")"
    if [ -n "$reason" ]; then refusals+=("$reason"); fi
  else
    rule="$(rule_for "$filename")"
    if [ -n "$rule" ]; then refusals+=("${filename} — ${status}: ${rule}"); fi
  fi
  if [ -n "$previous" ]; then
    rule="$(rule_for "$previous")"
    if [ -n "$rule" ]; then refusals+=("${previous} — renamed to ${filename}: ${rule}"); fi
  fi
done < <(jq -r '.[] | [.filename, (.previous_filename // ""), .status, (if .patch == null then "0" else "1" end)] | join("\u001f")' <<<"$input")

if [ "${#refusals[@]}" -gt 0 ]; then
  echo "::error title=lovable-branch-guard::${#refusals[@]} change(s) outside what a Lovable branch may change (DEC-394)" >&2
  for refusal in "${refusals[@]}"; do echo "  ${refusal}" >&2; done
  exit 1
fi
echo "lovable-branch-guard: ${count} file(s), none outside what a Lovable branch may change (DEC-394)."
