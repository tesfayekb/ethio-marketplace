# Foundations turn CI-2 — ruling (saved exactly; sha256 caea75e35a5bbe9be6307609f5f2254127bbd6618c5fb15cb925799b123478f8)

````text
RULING — Foundations turn CI-2: BUILD `bun run checks` (CI-1 Part B), the shared section notice, and INC-998. Base: dev f9569298. Tier B (CI tooling). Lovable. Saved as docs/governance/briefs/foundations-turn-ci-2.md.

CI-1 VERIFIED (dev f9569298, fresh clone):
- INC-997 (D239 had put reader-failure on every page's first download) is fixed by loading it only when a read fails, with the provider's .catch. I registered it as INC-997.
- A2 INC-996: setAmharicAccount sets the account and the device, restored in afterEach; the census table is complete; the harness-doc line is in place.
- A3 INC-994: the img payload is proven literal, and FAIL finding: lines are proven by SCAN-EV-1/2.
- A4: the ten budget lines are accepted with their causes.
- A5 INC-995: each section has its own message, the job line sits inside NameChecks, and SNC-1/2 hold the new shape.
- Disposition: CLEAN pending CI on f9569298.

ONE DRIFT (G33): docs/governance/briefs/foundations-turn-ci-1.md holds a 4,400-character summary, not the 10,180-character text I sent. A brief or ruling the build follows is saved exactly as sent. The records turn restores CI-1's exact text. This ruling is saved exactly, proven by sha256 (step 0).

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines), byte for byte, as docs/governance/briefs/foundations-turn-ci-2.md, inside one fenced block. Copy it by script from this message; do not retype or shorten it.
- The sha256 of that text (from the first line after BEGIN through the last line before END, with a final newline) must equal the value on the line after END. If it does not, write it again until it does. Paste the sha256 in the report.
- Roadmap line 3 names this file. Add three lines: INC-997 (closed, CI-1); INC-998 (open, this turn); and "D239's account rule loads only once a session exists — the speed work, not built now". The last is a performance note: the rule weighs every page, public ones included, for signed-out visitors too.

CI FIRST: read the run on f9569298 when it lands, and fix any red first. Its likely reds are the eight NEAR pages from your report. The NEAR rule (R4 below) is in force from now: raise each NEAR page that grew in D239 or CI-1, with that cause.

RULINGS ON THE PART B PLAN (G17; your plan is approved with these):
R1. The production build runs in the script. It is the budget check's measuring instrument, the same `bun run build` that CI's budget job runs, and you have run it for the budget in every turn since INC-974.
    Typecheck is read from the platform harness's own verdict, not re-run. The harness already type-checks every change, and your platform's rule against running typechecks by hand stands.
    The script reads /tmp/observability/build-errors.log. It reports PASS only when that file is newer than the newest change to src/, e2e/ or scripts/ and holds no error. If the file is older or missing, it reports NOT RUN with the reason. It never reports PASS from an old verdict.
R2. Order: the script runs every check in CI's order and never stops at a FAIL. After any fix it runs again, whole, so the format check on that last run comes after the last change. That keeps Knowledge A6's "format:check LAST" intent.
    Knowledge v3.12 rewrites A6 around the script. The operator pastes it after this turn lands; until then, this ruling governs.
R3. Pinned downloads are allowed for actionlint, gitleaks and semgrep. Each uses the exact version and checksum that ci.yml pins, verified before use. Each is cached outside the repository (for example ~/.cache/ethio-checks) and never committed. Read each pin from ci.yml, never from a copy, so the guard sees one source.
    If a fetch or its checksum fails, that check reports NOT RUN with the reason. A tool that cannot be fetched at a pinned version is never replaced by an unpinned one.
R4. THE NEAR BAND: every page within 0.3 KiB of its line is listed as NEAR, with its growth against the turn's base build. A NEAR page that grew in the turn is raised in the same turn to its next whole KiB, with its cause in the comment. A page whose growth has no named cause is a STOP (G60).
    Tidy the joins in scripts/route-budgets.mjs while you are there: comments read "…lazy);/ 333.8". Each line becomes "measured (cause); was …".
R5. The unit step runs CI's own command (`bun run test:unit`) and is reported PASS, FAIL or NOT RUN like every other step. A step that fails in the sandbox and passes in CI is not tolerated as noise; that is INC-998 below.
R6. TCK-1…5 as planned, ids grep-checked free. TCK-1's allowlist lines read `step | reason | until`, and every line is reasoned. The guard is wired: scripts/conformance/wired.test.ts names its caller, a package.json script.
R7. AGENTS.md: the separate checks-before-a-turn-ends lines (eslint, format, unit, i18n:usage) become one line: "Before every push, run `bun run checks`; fix every FAIL and run it again whole; name every NOT RUN; the report pastes its last line." Stay inside AGENTS.md's size budget.
    docs/features/ci-status-reporter.md (or the CI doc that fits) gains a section on the script. Register row: "a CI check runs before the push" → scripts/ci/turn-checks.sh → TCK-1.

INC-995 FOLLOW-UP (your K2 2): the per-section notice is now three hand-rolled copies, each with its own state, setter and ActionMessage. Make it one mechanism, either a `useSectionNotice()` hook with a `<SectionNotice>` beside it, or ActionMessage taking a key and a tone. Move PhotoReviews, PhotoChanges and NameChecks onto it. SNC gains SNC-3: a section that holds its own notice state outside the mechanism fails. Prove SNC-3 on the planted current shape.

INC-998 (registered 13:5xZ): eight unit tests fail in your sandbox and pass in CI.
- NH-1, NH-2 and NH-3 depend on the sandbox's time zone.
- EXH-4, EXH-5, EXH-7, EXH-21 and LL-1 time out at 5 s under the full suite's load and pass alone.
With `bun run checks` this would print FAIL on every turn and teach everyone to ignore it. Fix at the root (G38):
- the NH tests pin their time zone themselves, so they pass in any zone;
- for each timing-out test, name the cause (for example a real child process, a whole-tree scan or real timers) and remove it: a scan reads only what it needs, a process is replaced by the function it runs, or fake timers are used.
A timeout is raised only with its named cause in the comment, never to pass. If the cause is the sandbox's worker count rather than a test, the unit step runs with CI's worker count, read from the same config, and the report says so.
Proof: the whole unit suite green in your sandbox, with its count pasted.

FIVE LENSES:
- Security: gitleaks runs before the push, from a pinned binary, and no secret is printed (counts only, as in CI).
- Performance: the script's time is measured and reported; the build and the unit suite dominate.
- Failure modes: a check that cannot run says NOT RUN with its reason, never PASS; an old typecheck verdict is NOT RUN.
- Consistency: one script, mirrored to ci.yml by TCK-1, its pins read from ci.yml.
- Future growth: a new CI job joins the script, or TCK-1 fails.

HOW TO WORK: CI FIRST; K1–K6; G60 (a red is a STOP only when it touches a path this turn changed; otherwise name it under Limits). Run `bun run checks` itself before the push and paste its last line. Run e2e/i18n-coverage.spec.ts whole again, both projects, 0 retries (the setAmharicAccount rename was not re-run). Push, and END THE TURN with the report:
- the CI line first;
- the step 0 sha256;
- each ruling, done or not done;
- the script's measured time and its last line;
- the unit count;
- the K2 list;
- the files from git diff --name-only f9569298.
````
