# Foundations turn L-2B — continuation stop 2

**CI:** latest completed evidence read at the raw ci-evidence addresses: `d7c8ba280c3c77d037e412c9920d48ed562a564f` — **SUCCESS**, run 40930015396. This is the completed run identified in the supplied b4250ca0 stop report, not a new CI verdict on this turn.

**Step 0:** `docs/governance/briefs/foundations-turn-l-2b.md` contains the ruling in one four-backtick fence. The enclosed bytes, with final newline, hash to `bacb2e283ebd245c54139248f55eb772bbc5386c0c23ad14b3e03ec29dd4d196` (matches). Roadmap line 3 names it. The crawler-language follow-up was added exactly as ruled. Original STRINGS unchanged; none imported yet.

## Three continuation lines

- Part 0: previously delivered and verified by the supervisor; unchanged this turn.
- Part A: not restored or re-laid; no new measurement or functionality delivered.
- Part B: not started; the base-first resolution is accepted, with no remaining language-rule conflict claimed.

## Initial checks, required before implementation

`bun run checks` was restarted first. The full unit phase returned **2224 passed, 4 failed, 5 skipped** across 372 files (367 passed, five failed files). Each failure was a timeout, including the DateField beforeAll hook; no failed assertion was reported. The five whole failed files were rerun without modification with two workers: **5 files passed, 60 tests passed**, 43.10 seconds. This is a targeted recheck, not a green whole-suite proof, and does not replace the required full checks rerun.

The component failure remains a FAIL in the initial checks. The command also runs the pinned Semgrep scan; its final status is recorded below once available. No source/spec/guard changes were made to mask these failures, raise timeouts or weaken assertions.

## Scope and remaining work

The platform time warning arrived during the required initial checks, before Part A restoration. This stop is earlier than the preferred Part-A-green split: that milestone has **not** been reached. Restore from the report appendix, merge reader helpers, update fixed-order mechanism/guard, measure every page against the 0.4 KiB tolerance, then run the whole suite/checks before proceeding to Part B. Part B's route equality table, 44 committed key readbacks, PGH tests, E2E and per-page weight evidence remain outstanding, not supplied as if delivered.

There is no new STOP-A per-chunk table: `/tmp/l-2b-before-client` preserves this turn's baseline client output only. The earlier withdrawn-layout table belongs to stop 1 and must not be represented as a measurement of the approved layout.

## K2

No new source census was completed. Previously reported tooling localeCompare sites and the E2E Segmenter oracle remain unchanged (stop 1). The database non-Latin fixed-order and category-name-title follow-ups remain on the roadmap.

## Changed this continuation

- docs/governance/briefs/foundations-turn-l-2b.md
- roadmap.md
- docs/governance/reports/foundations-turn-l-2b.stop-2.md

No app file, migration, dependency or secret changed. The platform manages commits; no manual push was run.

## Final initial-check verdict

`checks: 33 PASS · 1 FAIL · 21 NOT RUN · 1252s`

The one FAIL is the whole unit phase described above. Semgrep passed (360 seconds); first-paint budget passed, with 0 NEAR and none grew. No final whole-checks rerun could be completed before this time-limit stop.

### NOT RUN (21 steps)

- build-and-check › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
- component-tests › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
- bundle-budget › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
- semgrep › Upload SARIF  (0s) — GitHub's code-scanning upload, only GitHub can receive it
- semgrep › Warn: the SARIF upload failed  (0s) — answers the GitHub-only upload above
- dependency-audit › Install dependencies  (0s) — the advisory service it asks is not reachable from the sandbox; CI's verdict is the judge
- dependency-audit › Audit  (0s) — the advisory service it asks is not reachable from the sandbox; CI's verdict is the judge
- e2e-preflight › Cache bun install  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
- e2e-preflight › Bun cache hit?  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
- e2e-preflight › Install dependencies  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
- e2e-preflight › Migration parity preflight (staging)  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
- e2e › Download shard results  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
- e2e › Download job log tails  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
- e2e › Download error contexts  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
- e2e › Verify the downloaded artifacts belong to this attempt  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
- e2e › Publish merged E2E report  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
- e2e › Verdict  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
- promote › Promote token present (DEC-210)  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
- promote › Configure the actions bot  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
- promote › Fast-forward guard (ff-only law — never merge/rebase here)  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
- promote › Promote dev to main  (0s) — pushes main with the promote token; only CI promotes (DEC-020)

### Files relative to 5d61def7

- .lovable/plan.md
- docs/governance/briefs/foundations-turn-l-2.md
- docs/governance/briefs/foundations-turn-l-2b.md
- docs/governance/reports/foundations-turn-l-2.stop-1.md
- docs/governance/reports/foundations-turn-l-2b.stop-2.md
- docs/tracking/intentional-deletions.txt
- e2e/locale-format.spec.ts
- roadmap.md
- scripts/e2e-select.ts
