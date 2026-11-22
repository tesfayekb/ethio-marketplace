#!/usr/bin/env bash
# DEC-394 (the tests and CI turn, Part C) — A LOVABLE BRANCH'S PULL REQUEST CHANGES ONLY SCREEN
# FILES. Usage, in .github/workflows/lovable-branch-guard.yml on a pull request from a `lovable/*`
# branch, judged from the base (DEC-413: pull_request_target, the base checked out, the head read as
# data only):
#   gh api --paginate repos/<owner>/<repo>/pulls/<number>/files | bash scripts/ci/lovable-branch-guard.sh
# The input is the pull request's files as GitHub computes them against the merge base: one JSON
# array per page, each entry carrying `filename`, `status`, `previous_filename` (a rename) and
# `patch`. The verdict is that input's, with one reading of git (DEC-398, below): a file under an
# exception whose `patch` the API omits.
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
# A fourth exception, DEC-425 (cursor-bundle-3): the stylesheet's limit line of
# scripts/check-bundle-size.mjs (`css:` in its BUDGET_KIB block) is admitted as DEC-390 admits a
# page's ceiling line of scripts/route-budgets.mjs: its number may move, with ONE added comment line
# in DEC-296's form in the block above the two limits (`js:` and `css:`). The changed lines must be
# exactly one removed and one added `  css: <n>,` line and at most one added comment line that names
# CSS, one `<old> → <new> = ceilingFor(Local)?(<size>); was <old>.` and agrees with the css lines;
# the comment's line falls between `const BUDGET_KIB = {` and the `js:` line of the base checkout's
# own file (this script runs in the base, DEC-413). Any other changed line of that file, the same
# line in another form (a trailing comment, a changed `js:`), a removed or second comment, a rename
# or a patch the guard cannot read refuses.
#
# Every offending path is listed with its rule; then exit 1. The four exceptions are judged by
# content: the deletions file takes added lines only; every changed line of the ceilings file is a
# ceiling line; an allowlist takes removed lines only; the bundle-size file takes its css limit and
# that one comment. Input that is not the API's JSON arrays is an error (exit 2), never a pass.
#
# A patchless exception file, DEC-398 (INC-1185): GitHub's files API drops `patch` for a file whose
# diff is too large to carry (the ceilings file's long lines: pull request #55's nine changed lines
# of about 4 KB each) and for a binary one. For a file under one of the three exceptions the script
# then reads the file's two sides from git — the pull request's base and head commits, named by
# PR_BASE_SHA and PR_HEAD_SHA (forty hex digits each), fetched once from `origin`, shallow and
# without blobs (git then fetches the two blobs of the one file it diffs; the whole trees of two
# commits took minutes on a slow link, the commits alone about one second) — and
# judges the changed lines of `git diff` by the very rule it applies to an API patch. A side that
# cannot be read (no shas, a refused fetch, a failed or binary diff) refuses; it is never a pass.
# A patchless file under no exception keeps its path rule, unchanged; git is not read for it.
set -euo pipefail

readonly DELETIONS="docs/tracking/intentional-deletions.txt"
readonly CEILINGS="scripts/route-budgets.mjs"
readonly BUNDLE_SIZE="scripts/check-bundle-size.mjs"
# The shape of every route line of scripts/route-budgets.mjs, read from the file.
readonly CEILING_LINE='^  "[^"]+": \{ ceiling: [0-9]+, public: (true|false) \}, // .+$'
# DEC-425: the shape of the stylesheet's limit line, and of DEC-296's comment for it (groups: the
# measuring place, the old limit, the new limit, `Local`, the `was` value).
readonly CSS_LINE='^  css: ([0-9]+),$'
readonly CSS_COMMENT='^  // DEC-296 \(.+\): .*CSS (local|CI) [0-9.]+ KiB.*; ([0-9]+) → ([0-9]+) = ceilingFor(Local)?\([0-9.]+\); was ([0-9]+)\.$'

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
    scripts/*) echo "scripts/** — the guards and tools (DEC-386; the three exceptions: a ceiling line, DEC-390; a removed allowlist line, DEC-396; the stylesheet's limit line, DEC-425)" ;;
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

# DEC-398 — the two sides of a patchless exception file, read from git. `fetch_sides` runs in the
# main shell (a `$(...)` would lose its memo) and sets `sides_error` to the reason the sides cannot
# be had, or leaves it empty.
sides_state="unset"
sides_error=""
fetch_sides() {
  if [ "$sides_state" != "unset" ]; then return; fi
  sides_state="done"
  local base="${PR_BASE_SHA:-}" head="${PR_HEAD_SHA:-}" out
  if ! [[ "$base" =~ ^[0-9a-f]{40}$ && "$head" =~ ^[0-9a-f]{40}$ ]]; then
    sides_error="PR_BASE_SHA and PR_HEAD_SHA are not both a commit's forty hex digits"
    return
  fi
  if ! out="$(git fetch --no-tags --depth=1 --filter=blob:none --quiet origin "$base" "$head" 2>&1)"; then
    sides_error="git fetch of the base and head commits failed: ${out//$'\n'/ }"
  fi
}

# The patch of one file between the two sides, in the API's shape: the hunks of `git diff`, the
# file header lines before the first hunk dropped. Exit 1 with the reason on stdout when git cannot
# give it; an empty patch (the two sides hold the file alike) is a patch with no changed line.
patch_from_git() {
  local path="$1" diff patch="" line in_hunk=0
  if ! diff="$(git diff --no-color --no-ext-diff --no-textconv --no-renames --unified=0 \
    "$PR_BASE_SHA" "$PR_HEAD_SHA" -- "$path" 2>&1)"; then
    echo "git diff of the two sides failed: ${diff//$'\n'/ }"
    return 1
  fi
  while IFS= read -r line; do
    if [ "${line:0:2}" = "@@" ]; then in_hunk=1; fi
    if [ "$in_hunk" = "1" ]; then patch+="${line}"$'\n'; fi
  done <<<"$diff"
  if [ -n "$diff" ] && [ "$in_hunk" = "0" ]; then
    echo "git holds no text hunk for it (a binary file)"
    return 1
  fi
  printf '%s' "$patch"
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

# DEC-425 — the stylesheet's limit line, judged by content: empty when the patch holds exactly one
# removed and one added `css:` line and at most one added DEC-296 comment line (agreeing with them,
# placed in the block above the limits of the base's own file), else the reason.
bundle_size_refusal() {
  local path="$1" patch="$2" line text arrows start="" js=""
  local new_no=0 removed=0 added=0 comments=0 old_css="" new_css="" new_css_at=0 comment_at=0
  local c_old="" c_new="" c_was=""
  local why="${path} — a changed line that is not the stylesheet's limit line; DEC-425 admits one \`css:\` number and one DEC-296 comment only"
  while IFS= read -r line; do
    case "$line" in
      "") continue ;;
      "@@"*)
        if [[ "$line" =~ ^@@\ -[0-9]+(,[0-9]+)?\ \+([0-9]+)(,[0-9]+)?\ @@ ]]; then
          new_no="${BASH_REMATCH[2]}"
        else
          echo "${path} — a hunk header the guard cannot read; DEC-425 refuses what it cannot judge"
          return
        fi
        ;;
      "\\"*) ;;
      " "*) new_no=$((new_no + 1)) ;;
      "-"*)
        text="${line:1}"
        if [[ "$text" =~ $CSS_LINE ]]; then
          removed=$((removed + 1))
          old_css="${BASH_REMATCH[1]}"
        else
          echo "$why"
          return
        fi
        ;;
      "+"*)
        text="${line:1}"
        arrows="$(printf '%s' "$text" | grep -o '→' | wc -l || true)"
        if [[ "$text" =~ $CSS_LINE ]]; then
          added=$((added + 1))
          new_css="${BASH_REMATCH[1]}"
          new_css_at=$new_no
        elif [[ "$text" =~ $CSS_COMMENT ]] && [ "${arrows//[[:space:]]/}" = "1" ]; then
          comments=$((comments + 1))
          c_old="${BASH_REMATCH[2]}"
          c_new="${BASH_REMATCH[3]}"
          c_was="${BASH_REMATCH[5]}"
          comment_at=$new_no
        else
          echo "$why"
          return
        fi
        new_no=$((new_no + 1))
        ;;
      *)
        echo "$why"
        return
        ;;
    esac
  done <<<"$patch"
  if [ "$removed" != "1" ] || [ "$added" != "1" ]; then
    echo "${path} — DEC-425 admits the stylesheet's limit as one removed and one added \`css:\` line (${removed} removed, ${added} added)"
    return
  fi
  if [ "$comments" -gt 1 ]; then
    echo "${path} — a second comment line; DEC-425 admits one DEC-296 comment for the stylesheet's limit"
    return
  fi
  if [ "$comments" = "1" ] && { [ "$c_new" != "$new_css" ] || [ "$c_was" != "$old_css" ] || [ "$c_old" != "$old_css" ]; }; then
    echo "${path} — the comment says ${c_old} → ${c_new}, was ${c_was}; the css lines say ${old_css} → ${new_css} (DEC-425)"
    return
  fi
  start="$(awk '$0 == "const BUDGET_KIB = {" { print NR; exit }' "$BUNDLE_SIZE" 2>/dev/null || true)"
  js="$(awk '/^  js: [0-9]+,$/ { print NR; exit }' "$BUNDLE_SIZE" 2>/dev/null || true)"
  if ! [[ "$start" =~ ^[0-9]+$ && "$js" =~ ^[0-9]+$ ]] || [ "$start" -ge "$js" ]; then
    echo "${path} — the base's own file holds no BUDGET_KIB block above its \`js:\` line to place the change in; DEC-425 refuses what it cannot judge"
    return
  fi
  if [ "$comments" = "1" ] && { [ "$comment_at" -le "$start" ] || [ "$comment_at" -gt "$js" ]; }; then
    echo "${path} — the comment is outside the block above the two limits (after line ${start}, up to line ${js}); DEC-425"
    return
  fi
  if [ "$new_css_at" != "$((js + 1 + comments))" ]; then
    echo "${path} — the \`css:\` line moved from its place under the \`js:\` limit; DEC-425"
    return
  fi
}

# An exception's verdict: empty when its patch holds only what DEC-390, DEC-396 or DEC-425 allows,
# else the reason. The patch is the API's or, when the API carried none, git's (DEC-398);
# `unreadable` is why neither could be had.
exception_refusal() {
  local path="$1" has_patch="$2" patch="$3" status="$4" unreadable="${5:-}" line dec="DEC-390"
  if is_allowlist "$path"; then dec="DEC-396"; fi
  if [ "$path" = "$BUNDLE_SIZE" ]; then dec="DEC-425"; fi
  if [ "$has_patch" != "1" ]; then
    echo "${path} — the API carries no patch for it (a binary or a very large diff) and its two sides could not be read from git: ${unreadable}, so ${dec}'s exception cannot be read"
    return
  fi
  if is_allowlist "$path" && [ "$status" != "modified" ]; then
    echo "${path} — ${status}; a Lovable branch may only remove lines of an existing allowlist — DEC-396; a new, renamed or deleted allowlist is refused"
    return
  fi
  if [ "$path" = "$BUNDLE_SIZE" ]; then
    if [ "$status" != "modified" ]; then
      echo "${path} — ${status}; a Lovable branch may only move the stylesheet's limit line of the existing file — DEC-425"
      return
    fi
    bundle_size_refusal "$path" "$patch"
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
  if [ "$filename" = "$DELETIONS" ] || [ "$filename" = "$CEILINGS" ] || [ "$filename" = "$BUNDLE_SIZE" ] || is_allowlist "$filename"; then
    patch="$(jq -r --arg f "$filename" '.[] | select(.filename == $f) | .patch // ""' <<<"$input")"
    unreadable=""
    if [ "$has_patch" != "1" ]; then
      fetch_sides
      if [ -n "$sides_error" ]; then
        unreadable="$sides_error"
      elif patch="$(patch_from_git "$filename")"; then
        has_patch=1
      else
        unreadable="$patch"
      fi
    fi
    reason="$(exception_refusal "$filename" "$has_patch" "$patch" "$status" "$unreadable")"
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
