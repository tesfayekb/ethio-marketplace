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
# line in another form (a trailing comment), a removed or second comment, a rename or a patch the
# guard cannot read refuses (the `js:` line is DEC-468's, below).
#
# DEC-468 (cursor-bundle-6) extends the fourth exception to the entry's limit line of the same
# block, on the same terms: exactly one removed and one added `  js: <n>,` line and at most one added
# DEC-296 comment line naming JS (`<old> → <new> = ceilingFor(Local)?(<size>); was <old>.`, agreeing
# with the js lines). A patch that changes both limits is judged line by line by the same rule, each
# limit with its own comment; a comment that names both, a second comment for one limit and every
# other changed line of the file stay refused. DEC-425 and DEC-468 stay named beside each other in
# every refusal of this file.
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
#
# A fifth exception, DEC-432 (cursor-bundle-5): THE RECORDS EXCEPTION. The weekly records turn runs in
# Lovable and lands only what the supervisor's package holds, byte for byte. A ledger path (roadmap.md,
# docs/tracking/**, docs/governance/mechanisms.md, docs/_changelog.md, docs/spec/**) is admitted when
# the pull request's body states the sha256 of a committed expected list and the head's content of that
# path hashes to the list's line for it:
#   body line   Records list: docs/governance/briefs/<stem>.records.sha256 sha256 <64 hex>
#   the list    one line per ledger path, `<64 hex>  <path>` (two spaces), in the head
# The body line is read at run time (`gh api repos/$REPO/pulls/$PR_NUMBER`, the token the step already
# holds) and parsed by ONE anchored pattern (RECORDS_LINE); neither of its groups reaches a shell
# unquoted and nothing in the body is evaluated. The list is read from the head by `git cat-file blob`
# (the two commits come from fetch_sides, DEC-398), must hash to the body's value, and must hold only
# well-formed lines; each ledger file's head content must hash to its one line. Anything else — no body
# line, two body lines, an unreadable body or list, a list whose hash differs, a path with no line or
# two, a content one byte off, a deleted file — leaves the refusal of rule_for as it stands. Only the
# five ledger paths are ever admitted: no other path rule (supabase/**, scripts/**, …) reads the list.
# TRUST BASIS: the pull request's body is written only by the supervisor when it opens the pull request
# (G76: the supervisor opens every Lovable pull request), and Lovable has no path to it; the list is
# pinned by the sha256 in that body, so a list the branch itself writes admits nothing the supervisor's
# line does not name.
set -euo pipefail

readonly DELETIONS="docs/tracking/intentional-deletions.txt"
readonly CEILINGS="scripts/route-budgets.mjs"
readonly BUNDLE_SIZE="scripts/check-bundle-size.mjs"
# The shape of every route line of scripts/route-budgets.mjs, read from the file.
readonly CEILING_LINE='^  "[^"]+": \{ ceiling: [0-9]+, public: (true|false) \}, // .+$'
# DEC-425 and DEC-468: the shape of the stylesheet's and the entry's limit lines, and of DEC-296's
# comment for each (groups: the measuring place, the old limit, the new limit, `Local`, the `was`
# value).
readonly CSS_LINE='^  css: ([0-9]+),$'
readonly JS_LINE='^  js: ([0-9]+),$'
readonly CSS_COMMENT='^  // DEC-296 \(.+\): .*CSS (local|CI) [0-9.]+ KiB.*; ([0-9]+) → ([0-9]+) = ceilingFor(Local)?\([0-9.]+\); was ([0-9]+)\.$'
readonly JS_COMMENT='^  // DEC-296 \(.+\): .*JS (local|CI) [0-9.]+ KiB.*; ([0-9]+) → ([0-9]+) = ceilingFor(Local)?\([0-9.]+\); was ([0-9]+)\.$'

# DEC-432 — the body's one line, and one line of the list it names (groups: the list's path and its
# sha256; a line's sha256 and its path).
readonly RECORDS_LINE='^Records list: (docs/governance/briefs/[a-z0-9-]+\.records\.sha256) sha256 ([0-9a-f]{64})$'
readonly RECORDS_ENTRY='^([0-9a-f]{64})  ([A-Za-z0-9._/-]+)$'

# A conformance allowlist (DEC-396): `scripts/conformance/` + one name ending `-allowlist.txt`. The
# `case` glob alone would let `*` cross a slash, so a nested path is ruled out beside it.
is_allowlist() {
  case "$1" in
    scripts/conformance/*-allowlist.txt) [[ "${1#scripts/conformance/}" != */* ]] ;;
    *) return 1 ;;
  esac
}

# DEC-432 — the five ledger paths the records exception may admit (the same paths rule_for names as
# ledgers). A path under any other rule is never read against the list.
is_ledger() {
  case "$1" in
    roadmap.md | docs/tracking/* | docs/governance/mechanisms.md | docs/_changelog.md | docs/spec/*) return 0 ;;
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
    scripts/*) echo "scripts/** — the guards and tools (DEC-386; the three exceptions: a ceiling line, DEC-390; a removed allowlist line, DEC-396; the stylesheet's limit line, DEC-425; the entry's limit line, DEC-468)" ;;
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

# DEC-432 — the sha256 of stdin, as 64 hex digits (GNU's tool on the runner, the BSD one on a laptop).
sha256_stdin() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum | awk '{ print $1 }'
  else
    shasum -a 256 | awk '{ print $1 }'
  fi
}

# DEC-432 — the records list in force, read once in the main shell. `records_state` is `none` (the body
# states no list, or there is no pull request to read: the old refusals stand, silently), `error` (a list
# was stated and cannot be had: `records_error` says why) or `listed` (`records_list` holds the list's
# lines, `<sha256> <path>`, each already well-formed).
records_state="unset"
records_error=""
records_list=""
load_records() {
  if [ "$records_state" != "unset" ]; then return; fi
  records_state="none"
  local repo="${REPO:-}" number="${PR_NUMBER:-}" body line list_path="" want="" matches=0
  local blob="" digest entry sha path
  if [ -z "$repo" ] || [ -z "$number" ]; then return; fi
  if ! [[ "$repo" =~ ^[A-Za-z0-9._-]+/[A-Za-z0-9._-]+$ && "$number" =~ ^[0-9]+$ ]]; then
    records_state="error"
    records_error="REPO and PR_NUMBER are not an owner/name and a number"
    return
  fi
  if ! body="$(gh api "repos/${repo}/pulls/${number}" --jq '.body // ""' </dev/null 2>/dev/null)"; then
    records_state="error"
    records_error="the pull request's body could not be read"
    return
  fi
  while IFS= read -r line; do
    line="${line%$'\r'}"
    if [[ "$line" =~ $RECORDS_LINE ]]; then
      matches=$((matches + 1))
      list_path="${BASH_REMATCH[1]}"
      want="${BASH_REMATCH[2]}"
    fi
  done <<<"$body"
  if [ "$matches" = "0" ]; then return; fi
  records_state="error"
  if [ "$matches" != "1" ]; then
    records_error="the body states more than one records list"
    return
  fi
  fetch_sides
  if [ -n "$sides_error" ]; then
    records_error="the head's commit could not be had: $sides_error"
    return
  fi
  blob="$(git cat-file blob "${PR_HEAD_SHA}:${list_path}" 2>/dev/null && printf x)" || true
  if [ "${blob: -1}" != "x" ]; then
    records_error="the list ${list_path} cannot be read from the head"
    return
  fi
  blob="${blob%x}"
  digest="$(printf '%s' "$blob" | sha256_stdin)"
  if [ "$digest" != "$want" ]; then
    records_error="the list ${list_path} does not hash to the body's sha256"
    return
  fi
  while IFS= read -r entry; do
    if [ -z "$entry" ]; then continue; fi
    if ! [[ "$entry" =~ $RECORDS_ENTRY ]]; then
      records_error="the list ${list_path} holds a line that is not '<sha256>  <path>'"
      return
    fi
    sha="${BASH_REMATCH[1]}"
    path="${BASH_REMATCH[2]}"
    records_list+="${sha} ${path}"$'\n'
  done <<<"$blob"
  records_state="listed"
}

# DEC-432 — exit 0 when the records list admits the ledger path (its head content hashes to the list's one
# line for it), else exit 1 with `records_why` the reason (empty when no list was stated). Runs in the main
# shell: it reads the memo load_records set.
records_why=""
records_admits() {
  local path="$1" status="$2" sha entry want="" matches=0 got
  records_why=""
  load_records
  case "$records_state" in
    none) return 1 ;;
    error)
      records_why="$records_error"
      return 1
      ;;
  esac
  if [ "$status" = "removed" ]; then
    records_why="a deleted ledger file has no content to prove"
    return 1
  fi
  while IFS=' ' read -r sha entry; do
    if [ "$entry" = "$path" ]; then
      matches=$((matches + 1))
      want="$sha"
    fi
  done <<<"$records_list"
  if [ "$matches" != "1" ]; then
    records_why="the list holds ${matches} lines for it, not one"
    return 1
  fi
  if ! got="$(git cat-file blob "${PR_HEAD_SHA}:${path}" 2>/dev/null | sha256_stdin)"; then
    records_why="its content cannot be read from the head"
    return 1
  fi
  if [ "$got" != "$want" ]; then
    records_why="its head content is not the list's line for it"
    return 1
  fi
  return 0
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

# DEC-425 and DEC-468 — the stylesheet's (`css:`) and the entry's (`js:`) limit lines, judged by
# content: empty when the patch holds, for each limit it changes, exactly one removed and one added
# line of that limit and at most one added DEC-296 comment line naming that limit (agreeing with its
# lines, placed in the block above the limits of the base's own file), and for the limit it does not
# change nothing; else the reason. At least one limit must change.
bundle_size_refusal() {
  local path="$1" patch="$2" line text arrows start="" js="" kind
  local new_no=0 comments=0 comment_at=0 hits_css hits_js
  local rem_css=0 add_css=0 old_css="" new_css="" new_css_at=0 com_css=0 ca_css=""
  local rem_js=0 add_js=0 old_js="" new_js="" new_js_at=0 com_js=0 ca_js=""
  local c_old="" c_new="" c_was="" c_css_old="" c_css_new="" c_css_was="" c_js_old="" c_js_new="" c_js_was=""
  local why="${path} — a changed line that is not the entry's or the stylesheet's limit line; DEC-425 (css) and DEC-468 (js) admit those two numbers and their DEC-296 comments only"
  local comment_why="${path} — a second comment line for one limit; DEC-425 and DEC-468 admit one DEC-296 comment for each limit"
  while IFS= read -r line; do
    case "$line" in
      "") continue ;;
      "@@"*)
        if [[ "$line" =~ ^@@\ -[0-9]+(,[0-9]+)?\ \+([0-9]+)(,[0-9]+)?\ @@ ]]; then
          new_no="${BASH_REMATCH[2]}"
        else
          echo "${path} — a hunk header the guard cannot read; DEC-425 and DEC-468 refuse what they cannot judge"
          return
        fi
        ;;
      "\\"*) ;;
      " "*) new_no=$((new_no + 1)) ;;
      "-"*)
        text="${line:1}"
        if [[ "$text" =~ $CSS_LINE ]]; then
          rem_css=$((rem_css + 1))
          old_css="${BASH_REMATCH[1]}"
        elif [[ "$text" =~ $JS_LINE ]]; then
          rem_js=$((rem_js + 1))
          old_js="${BASH_REMATCH[1]}"
        else
          echo "$why"
          return
        fi
        ;;
      "+"*)
        text="${line:1}"
        arrows="$(printf '%s' "$text" | grep -o '→' | wc -l || true)"
        hits_css=0
        hits_js=0
        if [[ "$text" =~ $CSS_COMMENT ]]; then
          hits_css=1
          c_css_old="${BASH_REMATCH[2]}"
          c_css_new="${BASH_REMATCH[3]}"
          c_css_was="${BASH_REMATCH[5]}"
        fi
        if [[ "$text" =~ $JS_COMMENT ]]; then
          hits_js=1
          c_js_old="${BASH_REMATCH[2]}"
          c_js_new="${BASH_REMATCH[3]}"
          c_js_was="${BASH_REMATCH[5]}"
        fi
        if [[ "$text" =~ $CSS_LINE ]]; then
          add_css=$((add_css + 1))
          new_css="${BASH_REMATCH[1]}"
          new_css_at=$new_no
        elif [[ "$text" =~ $JS_LINE ]]; then
          add_js=$((add_js + 1))
          new_js="${BASH_REMATCH[1]}"
          new_js_at=$new_no
        elif [ "$((hits_css + hits_js))" = "1" ] && [ "${arrows//[[:space:]]/}" = "1" ]; then
          comments=$((comments + 1))
          if [ "$hits_css" = "1" ]; then
            com_css=$((com_css + 1))
            ca_css=$new_no
          else
            com_js=$((com_js + 1))
            ca_js=$new_no
          fi
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
  if [ "$rem_css" = "0" ] && [ "$add_css" = "0" ] && [ "$rem_js" = "0" ] && [ "$add_js" = "0" ]; then
    echo "${path} — DEC-425 and DEC-468 admit a limit as one removed and one added \`css:\` or \`js:\` line (0 removed, 0 added)"
    return
  fi
  for kind in css js; do
    local rem add
    if [ "$kind" = "css" ]; then rem=$rem_css; add=$add_css; else rem=$rem_js; add=$add_js; fi
    if { [ "$rem" != "0" ] || [ "$add" != "0" ]; } && { [ "$rem" != "1" ] || [ "$add" != "1" ]; }; then
      echo "${path} — DEC-425 and DEC-468 admit a limit as one removed and one added \`${kind}:\` line (${rem} removed, ${add} added)"
      return
    fi
  done
  if [ "$com_css" -gt 1 ] || [ "$com_js" -gt 1 ]; then
    echo "$comment_why"
    return
  fi
  if [ "$com_css" = "1" ] && { [ "$rem_css" = "0" ] || [ "$c_css_new" != "$new_css" ] || [ "$c_css_was" != "$old_css" ] || [ "$c_css_old" != "$old_css" ]; }; then
    echo "${path} — the comment says ${c_css_old} → ${c_css_new}, was ${c_css_was}; the css lines say ${old_css:-none} → ${new_css:-none} (DEC-425, DEC-468)"
    return
  fi
  if [ "$com_js" = "1" ] && { [ "$rem_js" = "0" ] || [ "$c_js_new" != "$new_js" ] || [ "$c_js_was" != "$old_js" ] || [ "$c_js_old" != "$old_js" ]; }; then
    echo "${path} — the comment says ${c_js_old} → ${c_js_new}, was ${c_js_was}; the js lines say ${old_js:-none} → ${new_js:-none} (DEC-425, DEC-468)"
    return
  fi
  start="$(awk '$0 == "const BUDGET_KIB = {" { print NR; exit }' "$BUNDLE_SIZE" 2>/dev/null || true)"
  js="$(awk '/^  js: [0-9]+,$/ { print NR; exit }' "$BUNDLE_SIZE" 2>/dev/null || true)"
  if ! [[ "$start" =~ ^[0-9]+$ && "$js" =~ ^[0-9]+$ ]] || [ "$start" -ge "$js" ]; then
    echo "${path} — the base's own file holds no BUDGET_KIB block above its \`js:\` line to place the change in; DEC-425 and DEC-468 refuse what they cannot judge"
    return
  fi
  # Each comment falls above the base's `js:` line: its new line number is after the block's opening
  # and before the limits, which the added comments pushed down.
  for at in "$ca_css" "$ca_js"; do
    if [ -n "$at" ] && { [ "$at" -le "$start" ] || [ "$at" -ge "$((js + comments))" ]; }; then
      echo "${path} — the comment is outside the block above the two limits (after line ${start}, before line $((js + comments))); DEC-425, DEC-468"
      return
    fi
  done
  if [ "$add_js" = "1" ] && [ "$new_js_at" != "$((js + comments))" ]; then
    echo "${path} — the \`js:\` line moved from its place; DEC-425, DEC-468"
    return
  fi
  if [ "$add_css" = "1" ] && [ "$new_css_at" != "$((js + 1 + comments))" ]; then
    echo "${path} — the \`css:\` line moved from its place under the \`js:\` limit; DEC-425, DEC-468"
    return
  fi
}

# An exception's verdict: empty when its patch holds only what DEC-390, DEC-396, DEC-425 or DEC-468 allows,
# else the reason. The patch is the API's or, when the API carried none, git's (DEC-398);
# `unreadable` is why neither could be had.
exception_refusal() {
  local path="$1" has_patch="$2" patch="$3" status="$4" unreadable="${5:-}" line dec="DEC-390"
  if is_allowlist "$path"; then dec="DEC-396"; fi
  if [ "$path" = "$BUNDLE_SIZE" ]; then dec="DEC-425, DEC-468"; fi
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
      echo "${path} — ${status}; a Lovable branch may only move the stylesheet's or the entry's limit line of the existing file — DEC-425, DEC-468"
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
    if [ -n "$rule" ]; then
      records_why=""
      if is_ledger "$filename" && records_admits "$filename" "$status"; then
        :
      elif [ -n "$records_why" ]; then
        refusals+=("${filename} — ${status}: ${rule}; the records list (DEC-432) does not admit it: ${records_why}")
      else
        refusals+=("${filename} — ${status}: ${rule}")
      fi
    fi
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
