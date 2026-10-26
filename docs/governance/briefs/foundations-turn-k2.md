# Foundations — turn K2: the kit's non-null assertions out, and the platform rule's guard — the non-null census with its ratchet (INC-932): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN K2 (2026-10-26; INC-932; anchors located at 83badbbaa0fb59ee1485ccfcc173d61a162907ed). Your platform rule — "Never use TypeScript non-null assertions (`!`) — narrow with an early-return guard or optional chaining instead. Sole exception: process.env['X']! reads inside server handlers." — has no guard: a census of the tree counts 979 of them in 143 files (src 296, e2e 619, scripts 64), and 22 in the kit itself (.claude/hooks/lib.ts 21, land.ts 1), the ones turn K1 left. This turn takes the kit's 22 out and lands the guard: a census that counts every non-null assertion and a ratchet allowlist that holds each older file at its count, so none can be added and a file's count only falls. Tier B (the kit; a conformance guard; no product code). No migration. No string. No package change. AGENTS.md: one clause added to its Guards line (EDIT below). No file deleted. Base: dev 83badbbaa0fb59ee1485ccfcc173d61a162907ed (turn 34c-3's landing). The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the kit and the census; D — docs and the roadmap; THE CHECKS; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 83badbbaa0fb59ee1485ccfcc173d61a162907ed
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
.claude/hooks/land.ts
.claude/hooks/lib.ts
scripts/conformance/non-null-allowlist.txt
scripts/conformance/non-null.test.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: no code gains a TypeScript non-null assertion — the platform rule, enforced by a guard, not by a reviewer's eye (register row 56, new).
MECHANISM: NONE YET — built in Part C as scripts/conformance/non-null.test.ts: `nonNullCensus(files)` reads each file's syntax tree and counts its NonNullExpression nodes, a `process.env.X!` / `process.env["X"]!` read excepted (the rule's one exception); `nonNullKeys` names each file that holds one as `<file> (<count>)`; the allowlist scripts/conformance/non-null-allowlist.txt (the kit's `key | reason | until` form, read by `readAllowlist`: a stale or expired line fails) holds one line per file at its count — so a file that sheds one must lower its line, and a file that gains one is named. The kit (.claude/) is never allowed a line.
CONSUMERS (the census's own reading of BASE, every one): the kit — .claude/hooks/land.ts :219 `(finalReport ?? stopReport)!` → the report path read once and narrowed by `fail` (which returns never); .claude/hooks/lib.ts :64 `g[i]!`, :464 `cmd[i]!`, :570 `cmd[j]!` → `charAt` (the same string, "" past the end); :157 `m[1]!`, :183 `b[1]!` → optional chaining with `?? null`; :177 `m[1]!`, :187 `f[1]!` → `?? ""`; :760 `toks[k]!` → a guard that skips an undefined token; :792–:802 `words[w]!` (six) → one `wordAt(index)` reader; :926 `args[t + 1]!`, :927 `p[p.length - 1]!` → named locals checked first; :956 `args[i]!`, :960 `a.split("=")[1]!` → `?? ""`; :969 `args[c + 1]!`, :974 `args[d + 1]!` → a named local, "." when empty or absent (as today); :983 `args[i]!` → a guard. Each keeps its behaviour (EXH-1…24 unchanged). The other 143 files: allowlisted at their counts with INC-932.
COVERED HERE: the kit (to zero) and the guard. LEFT: the 979 older assertions, file by file, as later turns touch those files (each such turn lowers its file's line); INC-921 (the kit's tree-scan time budget) to the kit's next turn.
CONFORMANCE GUARD: CF-NN-1 (every file at or under its allowlist line; the kit at zero) — red on BASE (it names the kit's 22); CF-NN-2 (planted: two assertions named; a guard, optional chaining and an environment read passed — the planted source spells the mark by its character code, so this file's own text carries none).
EXCEPTIONS: `process.env` reads (the rule's own exception); src/integrations/ (the generated client — platform files).
FIVE LENSES — security: none · performance: one syntax-tree pass over about a thousand files in the unit suite (TREE_SCAN_MS) · failure modes: an assertion that was wrong became a typed fallback in the kit ("", null, a skipped token) — each where the old code had already checked the bounds · consistency: the platform rule holds everywhere it is written, by one census · future growth: a new file starts at zero; a refactor lowers its file's count.
FORWARD-SCAN: turns 35–37 touch files on the allowlist; each lowers its line when it sheds an assertion (the stale line tells it to). REGISTER: row 56 added (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-k2.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: none in this turn (the census reads e2e/, it changes none). No browser run is owed (no product code changes); CI runs every test.
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-k2.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW or FILE block carries a non-null assertion (your platform rule; checked by the supervisor's script — and, from this turn, by CF-NN-1).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-k2.md, roadmap.md, AGENTS.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-k2.report.md (your completion report). Anything else is a STOP naming the file and why.
- The kit's own rule: .claude/hooks/* is the Claude Code executor's guard rails; this turn's edits to lib.ts and land.ts are copied from the brief like any other block, and EXH-1…24 (scripts/conformance/executor-hooks.test.ts) must stay green.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`).
- RED FIRST (G38): Part B shows CF-NN-1 failing on BASE's kit before Part C's edits.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox, and EXH-4 and EXH-21 have timed out under the full run's load and passed alone (INC-890; turns 34c-2 and 34c-3's reports); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Behaviour contract: no product behaviour changes. The kit reads, refuses and lands exactly as at BASE. The unit suite gains CF-NN-1/2. Nothing else changes.
- Knowledge K: K1 the census above; K2 the report lists (file:line) any non-null assertion the census does not see (a form it misses) and any file whose count looks wrong to you — listed, not changed; K3 the guard lands with the fix; K4–K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; CF-NN-1/2 are new; every other test unchanged.
- The reviewer: after THE CHECKS, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: run 40400996498 on BASE (turn 34c-3's landing) — queued when this brief was sent; green, or still running; a red there is read and named). Any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The census — BLOCK 1 (scripts/conformance/non-null.test.ts) and its allowlist — BLOCK 2 (scripts/conformance/non-null-allowlist.txt).
B2. Run `bunx vitest run scripts/conformance/non-null.test.ts` — the supervisor's run on BASE: `Tests  1 failed | 1 passed (2)`: CF-NN-1 (`expected '.claude/hooks/land.ts:219 uses a non-…' to be ''` — the kit's 22 named: land.ts :219 and lib.ts :64, :157, :177, :183, :187, :464, :570, :760, :792–:802 (six), :926, :927, :956, :960, :969, :974, :983) — paste the failure lines and the totals.

PART C — THE KIT.
C1. The kit's assertions become guards:
EDIT .claude/hooks/lib.ts #1
OLD-BEGIN
  for (let i = 0; i < g.length; i += 1) {
    const c = g[i]!;
    if (c === "*") {
OLD-END
NEW-BEGIN
  for (let i = 0; i < g.length; i += 1) {
    const c = g.charAt(i);
    if (c === "*") {
NEW-END
EDIT .claude/hooks/lib.ts #2
OLD-BEGIN
  const m = line.match(/(docs\/governance\/briefs\/[A-Za-z0-9._-]+\.md)/);
  return m ? m[1]! : null;
}
OLD-END
NEW-BEGIN
  const m = line.match(/(docs\/governance\/briefs\/[A-Za-z0-9._-]+\.md)/);
  return m?.[1] ?? null;
}
NEW-END
EDIT .claude/hooks/lib.ts #3
OLD-BEGIN
  if (m) {
    out.globs = m[1]!
      .split("\n")
OLD-END
NEW-BEGIN
  if (m) {
    out.globs = (m[1] ?? "")
      .split("\n")
NEW-END
EDIT .claude/hooks/lib.ts #4
OLD-BEGIN
  const b = text.match(/^BASE:\s*([0-9a-f]{7,40})\s*$/m);
  out.base = b ? b[1]! : null;
  // FLAGS: no-migration, no-new-string, no-package-change, no-agents-change  (a deliberate line, never prose)
OLD-END
NEW-BEGIN
  const b = text.match(/^BASE:\s*([0-9a-f]{7,40})\s*$/m);
  out.base = b?.[1] ?? null;
  // FLAGS: no-migration, no-new-string, no-package-change, no-agents-change  (a deliberate line, never prose)
NEW-END
EDIT .claude/hooks/lib.ts #5
OLD-BEGIN
  if (f) {
    out.flags = f[1]!
      .split(/[,\s]+/)
OLD-END
NEW-BEGIN
  if (f) {
    out.flags = (f[1] ?? "")
      .split(/[,\s]+/)
NEW-END
EDIT .claude/hooks/lib.ts #6
OLD-BEGIN
  while (i < n) {
    const c = cmd[i]!;
    const next = cmd[i + 1] ?? "";
OLD-END
NEW-BEGIN
  while (i < n) {
    const c = cmd.charAt(i);
    const next = cmd[i + 1] ?? "";
NEW-END
EDIT .claude/hooks/lib.ts #7
OLD-BEGIN
        j += 1;
        while (j < n && /[\d-]/.test(cmd[j]!)) j += 1;
        i = j;
OLD-END
NEW-BEGIN
        j += 1;
        while (j < n && /[\d-]/.test(cmd.charAt(j))) j += 1;
        i = j;
NEW-END
EDIT .claude/hooks/lib.ts #8
OLD-BEGIN
  for (let k = 0; k < toks.length; k += 1) {
    const t = toks[k]!;
    if (t.op === ">" || t.op === ">>") {
OLD-END
NEW-BEGIN
  for (let k = 0; k < toks.length; k += 1) {
    const t = toks[k];
    if (t === undefined) continue;
    if (t.op === ">" || t.op === ">>") {
NEW-END
EDIT .claude/hooks/lib.ts #9
OLD-BEGIN
      w += 1;
      while (
        w < words.length &&
        (words[w]!.v.startsWith("-") ||
          /^\d+[smhd]?$/.test(words[w]!.v) ||
          /^[A-Za-z_][A-Za-z0-9_]*=/.test(words[w]!.v))
      ) {
        const flag = words[w]!.v;
        w += 1;
OLD-END
NEW-BEGIN
      w += 1;
      // The word at an index as a string ("" past the end): no assertion, the bounds checked first.
      const wordAt = (index: number) => words[index]?.v ?? "";
      while (
        w < words.length &&
        (wordAt(w).startsWith("-") ||
          /^\d+[smhd]?$/.test(wordAt(w)) ||
          /^[A-Za-z_][A-Za-z0-9_]*=/.test(wordAt(w)))
      ) {
        const flag = wordAt(w);
        w += 1;
NEW-END
EDIT .claude/hooks/lib.ts #10
OLD-BEGIN
          w < words.length &&
          /^\S+$/.test(words[w]!.v) &&
          !/^[a-z]/.test(words[w]!.v)
        )
OLD-END
NEW-BEGIN
          w < words.length &&
          /^\S+$/.test(wordAt(w)) &&
          !/^[a-z]/.test(wordAt(w))
        )
NEW-END
EDIT .claude/hooks/lib.ts #11
OLD-BEGIN
      const t = args.findIndex((a) => a === "-t" || a === "--target-directory");
      if (t >= 0 && args[t + 1]) out.push(args[t + 1]!);
      else if (p.length >= 2) out.push(p[p.length - 1]!);
      break;
OLD-END
NEW-BEGIN
      const t = args.findIndex((a) => a === "-t" || a === "--target-directory");
      const target = t >= 0 ? args[t + 1] : undefined;
      const last = p[p.length - 1];
      if (target) out.push(target);
      else if (p.length >= 2 && last !== undefined) out.push(last);
      break;
NEW-END
EDIT .claude/hooks/lib.ts #12
OLD-BEGIN
      for (let i = 0; i < args.length; i += 1) {
        const a = args[i]!;
        if (a === "-o" || a === "--output" || a === "-O" || a === "--output-document")
OLD-END
NEW-BEGIN
      for (let i = 0; i < args.length; i += 1) {
        const a = args[i] ?? "";
        if (a === "-o" || a === "--output" || a === "-O" || a === "--output-document")
NEW-END
EDIT .claude/hooks/lib.ts #13
OLD-BEGIN
        if (a.startsWith("--output=") || a.startsWith("--output-document="))
          out.push(a.split("=")[1]!);
      }
OLD-END
NEW-BEGIN
        if (a.startsWith("--output=") || a.startsWith("--output-document="))
          out.push(a.split("=")[1] ?? "");
      }
NEW-END
EDIT .claude/hooks/lib.ts #14
OLD-BEGIN
        const c = args.findIndex((a) => a === "-C" || a === "--directory");
        out.push(c >= 0 && args[c + 1] ? args[c + 1]! : ".");
      }
OLD-END
NEW-BEGIN
        const c = args.findIndex((a) => a === "-C" || a === "--directory");
        const into = c >= 0 ? args[c + 1] : undefined;
        out.push(into ? into : ".");
      }
NEW-END
EDIT .claude/hooks/lib.ts #15
OLD-BEGIN
      const d = args.indexOf("-d");
      out.push(d >= 0 && args[d + 1] ? args[d + 1]! : ".");
      break;
OLD-END
NEW-BEGIN
      const d = args.indexOf("-d");
      const into = d >= 0 ? args[d + 1] : undefined;
      out.push(into ? into : ".");
      break;
NEW-END
EDIT .claude/hooks/lib.ts #16
OLD-BEGIN
      for (let i = 0; i < args.length; i += 1) {
        const a = args[i]!;
        if (a === "-e" || a === "-f" || a === "--expression" || a === "--file") {
OLD-END
NEW-BEGIN
      for (let i = 0; i < args.length; i += 1) {
        const a = args[i];
        if (a === undefined) continue;
        if (a === "-e" || a === "-f" || a === "--expression" || a === "--file") {
NEW-END
EDIT .claude/hooks/land.ts #1
OLD-BEGIN
const finalReport = lastCommitPaths.includes(rp.final) ? rp.final : undefined;
if (stopReport === undefined && finalReport === undefined) {
  fail(
OLD-END
NEW-BEGIN
const finalReport = lastCommitPaths.includes(rp.final) ? rp.final : undefined;
const reportFile = finalReport ?? stopReport;
if (reportFile === undefined) {
  fail(
NEW-END
EDIT .claude/hooks/land.ts #2
OLD-BEGIN
}
const reportFile = (finalReport ?? stopReport)!;
const reportText = readFileSync(join(PROJECT_DIR, reportFile), "utf8");
OLD-END
NEW-BEGIN
}
const reportText = readFileSync(join(PROJECT_DIR, reportFile), "utf8");
NEW-END
C2. Read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance` — every test passes, CF-NN-1/2 and EXH-1…24 among them (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34c-3: no stale failure tells; the strings layers' retry retired; rgb()'s alpha — turn 32b's reviewer)` becomes `docs/governance/briefs/foundations-turn-k2.md (Foundations turn K2: the kit's non-null assertions out; the platform rule's guard — INC-932)` (everything after it stays, as it is).
D2. These edits (AGENTS.md's Guards line; the register's row 56; the changelog; turn 34c-3 ticked with its closing run; this turn's own line):
EDIT AGENTS.md #1
OLD-BEGIN
- Guards: a guard is a scripts/conformance census (kit.ts; allowlist `key | reason | until`, stale/expired fail; wired.test.ts names its caller); every VOLATILE signed-in door names a caller gate or has its caller-gates-allowlist line; shell guards capture, then grep — never `| grep -q`.
OLD-END
NEW-BEGIN
- Guards: a guard is a scripts/conformance census (kit.ts; allowlist `key | reason | until`, stale/expired fail; wired.test.ts names its caller); every VOLATILE signed-in door names a caller gate or has its caller-gates-allowlist line; shell guards capture, then grep — never `| grep -q`; no file gains a non-null assertion (CF-NN-1: a file's count in non-null-allowlist.txt only falls).
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 55 | The project's public address, its publishable key and the session's storage names are read in one place, so every reader agrees: the client, the session clocks, the password check's second client, the language list, the root's loader and the photo origin (a second reading drifted — a local backend's address, a trailing slash, a browser pair without the server pair) | `src/lib/supabase-door.ts` — `projectEnv()` (the address and key as the client module reads them), `storedSessionKey()` (the client's own `sb-<ref>-auth-token`), `besideStoredSession(name)` (`sb-<ref>-<name>`: the session clocks), `neverReachedTheServer(error)` (auth-js's own test, by name) | `scripts/conformance/project-reads.test.ts` (CF-PROJECT-1: no browser or route file outside the door reads the address, the key or the storage name; CF-PROJECT-2: planted readers); SPK-1/2/3 (`src/features/session/session-policy.test.ts`) | `src/integrations/` (the generated client) and `src/server/` (the server's environment reader) are not browser code | a second project in the browser, a local backend, a new name kept beside the session | the session clocks read only this project's session — never any `sb-*-auth-token` in the browser; Foundations turn 34c-2 |

OLD-END
NEW-BEGIN
| 55 | The project's public address, its publishable key and the session's storage names are read in one place, so every reader agrees: the client, the session clocks, the password check's second client, the language list, the root's loader and the photo origin (a second reading drifted — a local backend's address, a trailing slash, a browser pair without the server pair) | `src/lib/supabase-door.ts` — `projectEnv()` (the address and key as the client module reads them), `storedSessionKey()` (the client's own `sb-<ref>-auth-token`), `besideStoredSession(name)` (`sb-<ref>-<name>`: the session clocks), `neverReachedTheServer(error)` (auth-js's own test, by name) | `scripts/conformance/project-reads.test.ts` (CF-PROJECT-1: no browser or route file outside the door reads the address, the key or the storage name; CF-PROJECT-2: planted readers); SPK-1/2/3 (`src/features/session/session-policy.test.ts`) | `src/integrations/` (the generated client) and `src/server/` (the server's environment reader) are not browser code | a second project in the browser, a local backend, a new name kept beside the session | the session clocks read only this project's session — never any `sb-*-auth-token` in the browser; Foundations turn 34c-2 |
| 56 | No code gains a TypeScript non-null assertion — the executor's platform rule: narrow with a guard or optional chaining (a `process.env` read excepted) | `scripts/conformance/non-null.test.ts` (`nonNullCensus`: every non-null assertion in src/ but src/integrations/, scripts/, e2e/ and .claude/hooks/) with its ratchet, `scripts/conformance/non-null-allowlist.txt` — one line per file, keyed `<file> (<count>)`, so a file that sheds one lowers its line (the old line goes stale and fails) and a file that gains one is named | CF-NN-1, CF-NN-2 | 143 files hold the 979 assertions written before the rule was enforced (INC-932), each at its count | a new file starts at zero; a refactor lowers its file's count | the kit (.claude/hooks) at zero since turn K2; Foundations turn K2 |

NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34c-3 (2026-10-26; the guard debt of turn 32b's reviewer, INC-918's last retry) — the overlay facades: a late failure of an older ask (a dialog or a menu asked again since) tells nobody and shows no notice, and a dialog's owner that closed it before its code failed hears no stale closing (OVF-21, OVF-22); an uncontrolled dialog's listener hears the failed opening (OVF-19); OVF-17 and OVF-18 read the trigger's closed state and the owner's last word. The strings layers' hook offers no retry — a failed download is the page's for its life, the shell's gate offers Refresh (PSL-3). The E2E colour reader reads rgb()'s alpha as it reads oklab()'s: a 10% wash is no red or gold fill (EC-6).
OLD-END
NEW-BEGIN
- Foundations turn 34c-3 (2026-10-26; the guard debt of turn 32b's reviewer, INC-918's last retry) — the overlay facades: a late failure of an older ask (a dialog or a menu asked again since) tells nobody and shows no notice, and a dialog's owner that closed it before its code failed hears no stale closing (OVF-21, OVF-22); an uncontrolled dialog's listener hears the failed opening (OVF-19); OVF-17 and OVF-18 read the trigger's closed state and the owner's last word. The strings layers' hook offers no retry — a failed download is the page's for its life, the shell's gate offers Refresh (PSL-3). The E2E colour reader reads rgb()'s alpha as it reads oklab()'s: a 10% wash is no red or gold fill (EC-6).

- Foundations turn K2 (2026-10-26; the kit cleanup) — the kit (.claude/hooks/lib.ts, land.ts) carries no non-null assertion: its 22 became guards, `charAt`, optional chaining and a typed report path (EXH-1…24 unchanged). The platform rule gets its guard: the non-null census (CF-NN-1/2) counts every non-null assertion in src/, scripts/, e2e/ and the kit, a `process.env` read excepted, and its ratchet allowlist holds each of the 143 files that still carry the 979 older ones at its count (INC-932) — a file's count only falls, the kit's stays at zero.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [x] Turn 34c-2 (docs/governance/briefs/foundations-turn-34c-2.md; no migration; Lovable) — the project's public address, its key and the session's storage names read in one place, the door (`projectEnv`, `storedSessionKey`, `besideStoredSession`; CF-PROJECT-1/2, register row 55): the session clocks (no own pattern, no "any sb-\*-auth-token" fallback, absent without a project; SPK-1/2/3), the password check's second client, the language list, the root's loader and the photo origin. INC-931 / DEC-273 — the sign-in and reset screens' mount read keeps an expired session whose refresh never reached the server (`neverReachedTheServer`; ASC-7); a refused refresh drops it. Final HEAD 9eeb83cc; CI run 40397087967: running when turn 34c-3's brief was sent (the supervisor reads it).
  - [ ] Turn 34c-3 (docs/governance/briefs/foundations-turn-34c-3.md; no migration; Lovable) — the guard debt of turn 32b's reviewer: the overlay facades tell no stale failure — an older ask's late failure says nothing, a dialog's owner that closed it meanwhile hears no closing (OVF-21, OVF-22), an uncontrolled dialog's listener hears the failed opening (OVF-19), OVF-17/18 read the trigger's closed state and the owner's last word; the strings layers' hook offers no retry (INC-918; PSL-3); the E2E colour reader reads rgb()'s alpha (EC-6).
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930 waits on Tesfaye's choice (a question in the tracker): an offline sign-out from a page whose marketplace code never downloaded either stays on that page, signed out, until the connection returns, or the marketplace's code is fetched for a signed-in visitor ahead of time (its size measured before the choice). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
OLD-END
NEW-BEGIN
  - [x] Turn 34c-2 (docs/governance/briefs/foundations-turn-34c-2.md; no migration; Lovable) — the project's public address, its key and the session's storage names read in one place, the door (`projectEnv`, `storedSessionKey`, `besideStoredSession`; CF-PROJECT-1/2, register row 55): the session clocks (no own pattern, no "any sb-\*-auth-token" fallback, absent without a project; SPK-1/2/3), the password check's second client, the language list, the root's loader and the photo origin. INC-931 / DEC-273 — the sign-in and reset screens' mount read keeps an expired session whose refresh never reached the server (`neverReachedTheServer`; ASC-7); a refused refresh drops it. Final HEAD 9eeb83cc; CI run 40397087967: running when turn 34c-3's brief was sent (the supervisor reads it).
  - [x] Turn 34c-3 (docs/governance/briefs/foundations-turn-34c-3.md; no migration; Lovable) — the guard debt of turn 32b's reviewer: the overlay facades tell no stale failure — an older ask's late failure says nothing, a dialog's owner that closed it meanwhile hears no closing (OVF-21, OVF-22), an uncontrolled dialog's listener hears the failed opening (OVF-19), OVF-17/18 read the trigger's closed state and the owner's last word; the strings layers' hook offers no retry (INC-918; PSL-3); the E2E colour reader reads rgb()'s alpha (EC-6). Final HEAD 83badbba; CI run 40400996498: queued when turn K2's brief was sent (the supervisor reads it).
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930 waits on Tesfaye's choice (a question in the tracker): an offline sign-out from a page whose marketplace code never downloaded either stays on that page, signed out, until the connection returns, or the marketplace's code is fetched for a signed-in visitor ahead of time (its size measured before the choice). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
  - [ ] Turn K2 (docs/governance/briefs/foundations-turn-k2.md; no migration; Lovable) — the kit's 22 non-null assertions (.claude/hooks/lib.ts, land.ts) become guards; the platform rule's guard: the non-null census (CF-NN-1/2) with its ratchet allowlist — 143 files hold the 979 older assertions at their counts (INC-932), a count only falls, the kit's stays at zero. INC-921 (the tree-scan time budget) stays on the kit's next turn.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-k2.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 324 files, 1987 tests, every one passed); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
c7d362c41e58acd7160eb26ade5c533314541cee75d42c1cc99fd9107d7a5e96  .claude/hooks/land.ts
a105f7ce8c31afe0918ec21580dc11260916ef579fd927107d793f693d2fec45  .claude/hooks/lib.ts
37ba8647f487755f480c533aa576edd9d7e0e5b055de191087d3cdbb35beb1ab  AGENTS.md
c5e67f2d7e6122564ce7a95405ac4296c512f386ecd108d44ecc92619231c62d  docs/_changelog.md
d13e4e18fb9db11a4b85777915cb8ea132eb7a1f1c3e0f68c9e897c3190bc340  docs/governance/mechanisms.md
a7476b04fd41e37cfb9878e7d6ec9f685b1fe03f0d6ffb0e5b2c943830c67dbd  scripts/conformance/non-null-allowlist.txt
50ecb1a826817d443e4c92d4b0c15ad18cd16ccf9a79de992b09946caab7fccd  scripts/conformance/non-null.test.ts

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-k2.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the red-first lines; the unit totals; the K2 lists (file:line); "none" for migrations, strings and product code; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): the platform rule's guard is a ratchet (each older file held at its count, INC-932) rather than one turn that rewrites 979 assertions across 143 files (most in e2e/ specs a single turn could not run); the kit is held at zero; a `process.env` read is excepted anywhere, as the rule excepts it in server handlers.

BLOCK 1 — FILE-BEGIN scripts/conformance/non-null.test.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * The executor's platform rule: "Never use TypeScript non-null assertions (`!`) — narrow with an
 * early-return guard or optional chaining instead. Sole exception: process.env['X']! reads inside
 * server handlers." The census counts every non-null assertion in the code the executor writes
 * (src/ but the generated client in src/integrations/, scripts/, e2e/, the kit's .claude/hooks/),
 * a `process.env` read excepted. A file may hold no more than its allowlist line says — the line's
 * key carries the count, so a file that sheds assertions must lower its line (a stale line fails)
 * and a file that gains one is named. The kit holds none (turn K2 took out its 22).
 */

type Finding = { file: string; line: number; what: string };

/** `process.env.X!` and `process.env["X"]!` — the rule's one exception. */
function isEnvRead(node: ts.Expression): boolean {
  const target = ts.isPropertyAccessExpression(node)
    ? node.expression
    : ts.isElementAccessExpression(node)
      ? node.expression
      : null;
  return (
    target !== null &&
    ts.isPropertyAccessExpression(target) &&
    ts.isIdentifier(target.expression) &&
    target.expression.text === "process" &&
    target.name.text === "env"
  );
}

/** Each file's non-null assertions, by line. */
export function nonNullCensus(files: string[]): Map<string, number[]> {
  const sites = new Map<string, number[]>();
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (!ts.isNonNullExpression(node) || isEnvRead(node.expression)) return;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      sites.set(file, [...(sites.get(file) ?? []), line]);
    });
  }
  return sites;
}

/** The census's keys: `<file> (<count>)` for every file that holds an assertion. */
export function nonNullKeys(sites: Map<string, number[]>): string[] {
  return [...sites].map(([file, lines]) => `${file} (${lines.length})`);
}

const ALLOWLIST = "scripts/conformance/non-null-allowlist.txt";

const domain = walkFiles(["src", "scripts", "e2e", ".claude/hooks"], {
  ext: ["ts", "tsx"],
  skip: /^src[\\/]integrations(?:[\\/]|$)/,
});

describe("no new non-null assertion (the executor's platform rule; turn K2)", () => {
  it(
    "CF-NN-1 every file holds no more non-null assertions than its allowlist line, and the kit none",
    () => {
      const sites = nonNullCensus(domain);
      const keys = nonNullKeys(sites);
      const allowed = readAllowlist(ALLOWLIST, keys);
      const findings: Finding[] = [];
      for (const [file, lines] of sites) {
        if (allowed.has(`${file} (${lines.length})`) && !file.startsWith(".claude/")) continue;
        for (const line of lines)
          findings.push({
            file,
            line,
            what: `uses a non-null assertion (${lines.length} in the file) — narrow with a guard or optional chaining`,
          });
      }
      const total = [...sites.values()].reduce((sum, lines) => sum + lines.length, 0);
      console.log(`[non-null] files read: ${domain.length}; assertions: ${total} in ${sites.size}`);
      expect(domain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-NN-2 the census names planted assertions and passes a guard, optional chaining and an environment read", () => {
    const dir = "node_modules/.cache/non-null";
    mkdirSync(dir, { recursive: true });
    const bad = `${dir}/nn-bad.ts`;
    const good = `${dir}/nn-good.ts`;
    try {
      // The mark is spelled by its code so this file's own text carries none (the brief checker reads it).
      const bang = String.fromCharCode(33);
      writeFileSync(
        bad,
        `export function f(a: { b?: string }, list: string[]) {\n  const head = list[0]${bang};\n  return a.b${bang}.length + head.length;\n}\n`,
      );
      writeFileSync(
        good,
        `export function g(a: { b?: string }, list: string[]) {\n  const head = list[0];\n  if (head === undefined) return 0;\n  const key = process.env["E2E_KEY"]${bang};\n  return (a.b?.length ?? 0) + head.length + key.length;\n}\n`,
      );
      const sites = nonNullCensus([bad, good]);
      expect([...sites]).toEqual([[bad, [2, 3]]]);
      expect(nonNullKeys(sites)).toEqual([`${bad} (2)`]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/non-null.test.ts

BLOCK 2 — FILE-BEGIN scripts/conformance/non-null-allowlist.txt
# The non-null census (scripts/conformance/non-null.test.ts, turn K2): one line per file that still holds
# non-null assertions written before the platform rule was enforced — key "<file> (<count>)" | reason | until.
# A file that sheds one lowers its count here (the old line goes stale and fails); none may rise.
e2e/ad-page-doors.spec.ts (9) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-attributes-editor.spec.ts (26) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-attributes-import.spec.ts (34) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-attributes-library.spec.ts (37) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-attributes-links.spec.ts (54) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-attributes-safety.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-categories-console.spec.ts (12) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-categories-home.spec.ts (7) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-categories-images.spec.ts (6) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-categories-lifecycle.spec.ts (29) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-countries.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-listings.spec.ts (11) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-locations.spec.ts (19) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-screening.spec.ts (20) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-shell.spec.ts (14) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-translations-data.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-translations-governance.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/admin-users.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/auth-reset.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/auth-signout.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/auth-signup.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/category-image-routes.spec.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
e2e/category-nav.spec.ts (9) | non-null assertions written before the platform rule was enforced | INC-932
e2e/feed-index.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/feed-route.spec.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
e2e/feed-screens.spec.ts (17) | non-null assertions written before the platform rule was enforced | INC-932
e2e/geo.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/global-setup.ts (4) | non-null assertions written before the platform rule was enforced | INC-932
e2e/helpers/net-retry.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/helpers/photos.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
e2e/helpers/totp.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
e2e/helpers/ui.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
e2e/helpers/users.ts (6) | non-null assertions written before the platform rule was enforced | INC-932
e2e/house-style.spec.ts (6) | non-null assertions written before the platform rule was enforced | INC-932
e2e/i18n-coverage.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/import-security.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/legal-accept.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/legal-doors.spec.ts (6) | non-null assertions written before the platform rule was enforced | INC-932
e2e/my-listings-ad.spec.ts (7) | non-null assertions written before the platform rule was enforced | INC-932
e2e/my-listings-page.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/nightly/auth-resend-exhaustion.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/phone-frame.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/photo-pipeline.spec.ts (84) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-category.spec.ts (15) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-details.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-finder.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-place.spec.ts (7) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-resets.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-specs.spec.ts (15) | non-null assertions written before the platform rule was enforced | INC-932
e2e/post-wizard-where.spec.ts (6) | non-null assertions written before the platform rule was enforced | INC-932
e2e/posting-routes-catalog.spec.ts (24) | non-null assertions written before the platform rule was enforced | INC-932
e2e/posting-routes-identity.spec.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
e2e/posting-routes.spec.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
e2e/shell-table-law.spec.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
e2e/shell.spec.ts (81) | non-null assertions written before the platform rule was enforced | INC-932
e2e/viewing-place.spec.ts (4) | non-null assertions written before the platform rule was enforced | INC-932
scripts/admin-tables.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
scripts/conformance/auth-answers.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
scripts/conformance/executor-hooks.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
scripts/conformance/kit-adoption.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
scripts/conformance/signed-in-routes.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
scripts/deny-tests/p1f-identity-unlink.ts (4) | non-null assertions written before the platform rule was enforced | INC-932
scripts/destructive-red.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
scripts/destructive-red.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
scripts/e2e-failure-report.ts (8) | non-null assertions written before the platform rule was enforced | INC-932
scripts/e2e-leases.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
scripts/e2e-migration-preflight.ts (10) | non-null assertions written before the platform rule was enforced | INC-932
scripts/e2e-select.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
scripts/feed-bench.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
scripts/feed-bench.ts (14) | non-null assertions written before the platform rule was enforced | INC-932
scripts/fixtures/photos/make.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
scripts/list-action-labels.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
scripts/test-ids.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
scripts/test-ids.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
src/components/app-shell.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/components/marketplace/listing-card.test.tsx (4) | non-null assertions written before the platform rule was enforced | INC-932
src/components/shell/category-glyphs.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/components/shell/data-table-pagination.test.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/components/shell/data-table.test.tsx (10) | non-null assertions written before the platform rule was enforced | INC-932
src/components/shell/location-data.ts (4) | non-null assertions written before the platform rule was enforced | INC-932
src/components/shell/location-selector-order.test.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/components/shell/location-selector.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/components/shell/panel-header.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/components/ui/strip-arrows.test.tsx (4) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-ai/ai-service.ts (8) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-ai/ai-spend-days.test.tsx (4) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-attributes/category-attributes-dialog.tsx (2) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-categories/categories-page.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-categories/category-image-variants.test.ts (6) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-categories/category-image-variants.ts (6) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-listings/listing-photos.test.tsx (15) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-locations/location-verb-dialogs.test.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin-screening/photo-changes.test.tsx (10) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin/audit/audit-service.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin/impersonation/impersonation-service.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/admin/users/admin-users-service.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/categories/category-tree.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/features/categories/category-tree.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/legal/legal-kinds.test.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/attribute-options.test.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/background-dialog.test.tsx (3) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/calling-codes.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/field.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/listing-preview.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/photo-edit.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/preview/photo-gallery.test.tsx (3) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/preview/photo-gallery.tsx (2) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/reset-scope.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/step-details.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/step-photos.tsx (2) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/step-review.tsx (1) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/step-where.test.tsx (29) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/step-where.tsx (9) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/use-draft.test.tsx (24) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/where-seed.test.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
src/features/posting/where-seed.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/i18n/locales/am-script.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/lib/refresh-after-write.test.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
src/lib/route-client.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/admin/attributes/export.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/admin/categories/export.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/admin/locations/export.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/listings/alias.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/listings/assist.ts (4) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/listings/background.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/listings/draft.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/listings/photos.$id.ts (7) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/listings/photos.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/listings/publish.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/media/photo-links.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/routes/api/upload/photo.ts (7) | non-null assertions written before the platform rule was enforced | INC-932
src/server/ai/gateway.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/server/catalog-find.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/server/imports/csv.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/server/imports/route.test.ts (2) | non-null assertions written before the platform rule was enforced | INC-932
src/server/media/background-route.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/server/media/background.test.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
src/server/media/background.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/server/media/policy.test.ts (11) | non-null assertions written before the platform rule was enforced | INC-932
src/server/media/strip.ts (44) | non-null assertions written before the platform rule was enforced | INC-932
src/styles.tokens.test.ts (5) | non-null assertions written before the platform rule was enforced | INC-932
src/test/e2e-net-retry.test.ts (1) | non-null assertions written before the platform rule was enforced | INC-932
src/test/pool-reset-map.test.ts (3) | non-null assertions written before the platform rule was enforced | INC-932
FILE-END scripts/conformance/non-null-allowlist.txt
```
