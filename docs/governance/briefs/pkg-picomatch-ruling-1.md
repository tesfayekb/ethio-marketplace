RULING — pkg-picomatch, stop 1: no patched picomatch exists; a recorded, expiring exception for this one advisory, built as a mechanism. Base: cursor/pkg-picomatch c2dd28604

PREVENTION (G70): the class — an advisory with no patched version turns the audit red on every branch, and the gate has no recorded way to hold an exception, so the only choices were an unrecorded ignore or every lane red. Repository: changed in this turn — the audit gate reads a list of recorded exceptions, each with its advisory, reason, expiry and decision, and fails on an expired, malformed or undecided line. Instructions: in force now — an audit exception is a decision of the operator's (a security trade-off, G17), recorded as a DEC with an expiry of at most 14 days, renewed only by a new DEC. Cursor rules: not needed (you stopped where the brief said). Knowledge: not needed.

THE SUPERVISOR'S CHECK of your premise: `npm view picomatch dist-tags` gives `latest: 4.0.7` (2026-11-18), inside the advisory's range `<= 4.0.7`; your `gh api` read gives no patched version. Premise confirmed. The supervisor's earlier build of dev (`dist/`) contains no picomatch code: it is a build and test tool only (vite, vitest, the TanStack Start plugin, unplugin, tinyglobby, the devtools), and every pattern it reads is one the repository writes.

THE OPERATOR'S DECISION (2026-11-18 05:1x New York, his answer to the supervisor's question): a two-week exception for GHSA-fc5q-39xc-vjpf, ending 2026-12-02, fixed properly the moment a patch is published. DEC-405.

THE SYSTEM (G0)
CONCERN: an advisory the gate does not fail on is a recorded, expiring decision, never a silent ignore.
MECHANISM: NONE YET — built here as `scripts/audit-exceptions.txt` (new), read by `scripts/audit-gate.sh`.
CONSUMERS: `scripts/audit-gate.sh` (CI's dependency-audit job, `.github/workflows/ci.yml` — unchanged, it already calls the script); `docs/features/dependency-audit.md`.
COVERED HERE: the gate and the list. LEFT: none.
CONFORMANCE GUARD: the list's own test, proven on planted lines (below); wired per G55.
EXCEPTIONS: none — the list IS the exception record.
FIVE LENSES — security: one advisory by its GHSA id only, never a package or a severity; expiry forced; every run prints a warning naming it · performance: none · failure modes: an expired, malformed or undecided line fails the gate; the transport retry is unchanged · consistency: the allowlist form of G55 (key | reason | until) · future growth: one line per advisory.

THE BUILD
1. `scripts/audit-exceptions.txt` (new): comment lines explain the form; one line in G55's form, with the decision named: `GHSA-fc5q-39xc-vjpf | picomatch <= 4.0.7: ReDoS through single-branch repeated extglobs; no patched version; a build and test tool only, reading patterns the repository writes; not in the built app | until 2026-12-02 | DEC-405`.
2. `scripts/audit-gate.sh`: before the audit, read the list. Any line that is expired (its date is before today, UTC), malformed (not four cells, an id not shaped `GHSA-xxxx-xxxx-xxxx`, a date not ISO), or missing its `DEC-` cell fails the gate with a message naming the line. Each valid line becomes one `--ignore=<id>` on the `bun audit` call and prints `::warning::` naming the advisory, its expiry and its DEC. Nothing else changes: the transport retry, and the immediate failure on any finding that is not listed. If the parsing is clearer in a small TypeScript module with its own test (for example `scripts/audit-exceptions.ts` (new)), build it that way and name it. Decide-and-name.
3. A PATCH ENDS THE EXCEPTION EARLY, where the tool can tell. Read `bun audit --json` for this advisory in the census. If it reports a patched range when one exists, the gate also fails a listed line whose advisory now has one. If it doesn't, the expiry alone governs; say so under Limits.
4. The test, proven on planted lines: a valid line passes and becomes its `--ignore`; an expired line fails; a malformed line fails; a line without a DEC fails; an advisory that is not listed still fails the gate. The test is wired per G55.
5. `docs/features/dependency-audit.md`: a short section on the exception list — its form, the 14-day ceiling, renewal only by a new DEC, and removal of the line in the package turn that applies the patch.
6. RESUME this lane's STEPS 3–5 with this change in place of STEP 2's override: `bun audit --audit-level=high` through the gate prints no failure (pasted); `bun run checks`; `bun scripts/brief/check-go.ts docs/governance/briefs/pkg-picomatch.md --at 143027fac`; ONE push; PR #65 marked ready; the report.

SCOPE is widened by this ruling to: `scripts/audit-gate.sh` and its test `scripts/audit-gate.test.ts` (new — step 4), `scripts/audit-exceptions.txt` (new), its parsing module and test if built (new), `scripts/conformance/wired.test.ts` for the wiring, and `docs/features/dependency-audit.md`. `package.json` and `bun.lock` stay unchanged. Never `.github/**`.

NUMBERS (assigned here; written only in the report's Records): DEC-405. INC-1194 (the advisory's red on every branch, registered by the supervisor on 2026-11-17) is closed by this turn's exception and stays open for the patch.

RECORDS TEXT (the report's §14, word for word, beside the brief's):
DEC — DEC-405 (the operator, 2026-11-18): GHSA-fc5q-39xc-vjpf (picomatch <= 4.0.7, ReDoS through single-branch repeated extglobs; no patched version published) is a recorded audit exception until 2026-12-02 — picomatch is a build and test tool only, reading patterns the repository writes, and is not in the built app; the exception list `scripts/audit-exceptions.txt` is the mechanism: one line per advisory, its reason, an expiry of at most 14 days and its DEC; an expired, malformed or undecided line fails the gate; renewed only by a new DEC; removed in the package turn that applies the patch.
INC — INC-1194: the dependency audit turned red on every branch on 2026-11-17 on GHSA-fc5q-39xc-vjpf, for which no patched picomatch exists; held by DEC-405's exception until 2026-12-02; closed when the patch is applied.
