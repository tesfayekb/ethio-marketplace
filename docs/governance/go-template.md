# The GO template and its census checklist

A GO (a task file for the executor) is written from this template, section by section, in this
order. Its census checklist is read by `scripts/conformance/briefs.test.ts` CF-BRIEF-15: the STEP 1
of the brief in force names every item below by its key word, or the STEP 1 or one of the brief's
rulings answers the item on a line `CENSUS-ITEM <key>: not applicable — <why>` (or `covered — …`,
`named …`). A new lesson is one new `CENSUS-ITEM` line here; the next GO must answer it. A brief
whose title says RECORDS TURN or RULES TURN (records-only or exact-copy-only) is exempt.

Before a GO is sent, the supervisor runs every law of `scripts/brief/go-laws.ts` on it against its
lock-exact clone:

```text
bun scripts/brief/check-go.ts <the GO's file> --root <the clone>
```

and the executor runs the same command at STEP 0 on the tree as saved, before any change, and pastes
its output into the census. The laws a GO is written to:

- A cited path in backticks exists, or its sentence says the turn makes it ("new", "created here",
  "built as", "built here", "(new)").
- A citation `path :N` with a backticked name beside it holds that name on line N (two lines either
  side for a comment above a declaration).
- A test id called new or free is used nowhere under src/, e2e/, scripts/.
- A count is written `COUNT: <n> := <command>` (a read-only shell line — rg, grep, find, ls, wc,
  sort, uniq, cut, head, tail, `python3 -c`, `bun -e`, `git` show/log/diff/ls-files; no `>`, no
  chain); a tolerance is written in words ("two lines").
- A configuration option is named `OPTION: <name> in <d.ts path>`; a claimed presence or absence is
  `ASSERT-PRESENT: <regex> in <path>` / `ASSERT-ABSENT: <regex> in <path>`.
- A dictated commit title is at most 72 characters.

## The GO, in order

````text
<TITLE LINE — what the turn does, in one sentence>. Base: dev <sha>

Stem: `<stem>` (brief `docs/governance/briefs/<stem>.md`; report `docs/governance/reports/<stem>.report.md`). Tier <A|B|C> (<why>). FLAGS: <no-migration, no-new-string, no-package-change, no-agents-change — each one the turn keeps>. <PLAN FIRST when the census stops once>.

PREVENTION (G70 — only when the turn fixes a recurrence): <the root cause> · Repository: <part> · Instructions: <rule> · Cursor rules: <rule or not needed> · Knowledge: <line or not needed>.

THE SYSTEM (G0)
CONCERN: <one sentence — what must behave the same everywhere>
MECHANISM: <path:line of the shared component / hook / utility / door / SQL function / constants module> | NONE YET — built in Part <x> as <path>, to <standard>
CONSUMERS (grep of <commit>, every one, tests and SQL included): <path:line> — uses | bypasses (<how>) …
COVERED HERE: <which bypasses move onto the mechanism, by part> | LEFT: <path:line — INC-### / roadmap line>
CONFORMANCE GUARD: <path> — enumerates <what>; fails on <the planted bypass>; allowlist <path> (reason + expiry per line); lands in Part <x>, the same turn as the mechanism
EXCEPTIONS: <allowlist line + reason + test/brief> | DEC-### | none
FIVE LENSES — security: <…> · performance: <…> · failure modes: <…> · consistency: <…> · future growth: <…>
FORWARD-SCAN: <the later REQs and register rows this design meets>. REGISTER: <the row cited, or a new row — "<concern>" → <mechanism> → <guard> → exceptions: <allowlist or none>>.

(one THE SYSTEM header per concern)

SCOPE, by area (the plan narrows it to files): <the folders the concern lives in, each source file's own tests included; the records files; what is read only>.

THE TURN, IN THIS ORDER
STEP 0 — on the lane: fetch, switch, `git status --short` empty. Save this brief byte for byte as `docs/governance/briefs/<stem>.md` (scripted copy, one fenced block; sha256 equal to the value after END BRIEF). Roadmap line 3: `The brief in force: docs/governance/briefs/<stem>.md (<what>). Previous: ` + the line as it stands after "The brief in force: ". Remove from `scripts/conformance/briefs-allowlist.txt` every line keyed to a brief other than this one. Run `bun scripts/brief/check-go.ts docs/governance/briefs/<stem>.md` on the tree as saved and paste its output. Commit `<stem>: task saved`.
STEP 1 — THE CENSUS (STOP at its end when the GO says PLAN FIRST). Answer every item by its key word, or write the line "CENSUS-ITEM <key>: not applicable — <why>":
<!-- CENSUS-ITEM: consumers -->
- consumers — every consumer by the concern's definition, across src/, e2e/, scripts/, supabase/, each file:line marked uses or bypasses.
<!-- CENSUS-ITEM: definition -->
- definition — the concern's consumers enumerated by its definition, not by the pattern a COUNT line counts; the difference listed (a COUNT is a floor, never the scope).
<!-- CENSUS-ITEM: tests -->
- tests — each consumer's own tests.
<!-- CENSUS-ITEM: lists -->
- lists — every list a new name must join: the allowlists, the manifests, the e2e selector's groups, the exact-list assertions (`toEqual([…])`, `toStrictEqual`, `toMatchObject` with a full key list), the register.
<!-- CENSUS-ITEM: old-file-readers -->
- old-file-readers — every guard, test, script or document that reads a moved or renamed name's OLD file or name by path or text.
<!-- CENSUS-ITEM: second-readers -->
- second-readers — every second reader of a moved export: a dynamic `import()`, `loadOnce`, a `vi.mock` factory.
<!-- CENSUS-ITEM: chunk-graph -->
- chunk-graph — the bundler's chunk graph when a module moves: the entry closure before and after.
<!-- CENSUS-ITEM: environments -->
- environments — the environments a build option reaches: client, ssr, nitro.
<!-- CENSUS-ITEM: mechanisms -->
- mechanisms — the mechanisms that already serve the concern, by file:line, read before anything is proposed.
<!-- CENSUS-ITEM: first-download -->
- first-download — the first-download table from the executor's own lock-exact build, before and after.
<!-- CENSUS-ITEM: premises -->
- premises — every premise of this GO the census finds wrong.
<!-- CENSUS-ITEM: findings -->
- findings — what the census finds beyond the task, file:line.
`docs/governance/reports/<stem>.stop-1.md`; STOP.
STEP 2 → <n> — <the parts, in order; each part's tests; each part's commit>.
STEP <n+1> — `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; `bun run checks`; `bun scripts/brief/check-go.ts docs/governance/briefs/<stem>.md` (its output pasted).
STEP <n+2> — commit by part, push, `gh pr checks <number> --watch --interval 60`; green on the last code commit → the comment per rule 00.
STEP <n+3> — the report, rule 60's fourteen headings; §14 Records word for word.

DECIDE-AND-NAME: <the questions the repository's laws already answer; the executor names each under §10 with its law and the work continues>.

RECORDS: <the DEC, INC status lines, register rows, changelog line and roadmap text the report's §14 carries, unnumbered>.

TOLERANCES (G60), by defect: <which red is a STOP (its failure names a path this turn changed), which is named under Limits; a local failure fixed at its cause, never retried or loosened>.

FINDINGS (G64): anything major beyond this task goes in §13 with file:line; a security hole is a STOP at once, described in the chat only.

LIMITS TO STATE: <what the executor cannot run here, and what is then the proof>.
````
