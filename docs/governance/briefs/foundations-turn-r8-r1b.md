# Records turn R8, then turn R1b (brief, saved byte for byte)

````text
RECORDS TURN R8, THEN TURN R1b — the records of 29–30 October brought into the repository (G41), then the sub-menu mechanism of redesign Part 1. Base: dev 8e7feb84. Records: documents only. R1b: Tier B, no migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r8-r1b.md.

R1a-2 VERIFIED (dev 8e7feb84, fresh clone): step 0's sha256 06cdfe2c… matches; PGH-E2 ×12 is 24 passed, so INC-715's avoidance rule is retired (DEC-301, in this records turn); pickCity lives in e2e/helpers/posting.ts and the three walks are gone; the census of six spec files is in the report; INC-1005 is fixed in src/styles.css alone (the root's gutter and the lock's margin neutralised), measured red then green, with CF-SHIFT-1 and OVS-1/OVS-2; PW-37's tolerance is the screen's own claim (half its last place), recorded as INC-1006. CLEAN pending CI on 8e7feb84.

THE TURN, IN THIS ORDER
1. STEP 0: save this brief (the text between the message's BEGIN BRIEF and END BRIEF lines) byte for byte as docs/governance/briefs/foundations-turn-r8-r1b.md, in one fenced block, and prove its sha256 equals the value after END BRIEF. Do not edit roadmap.md, docs/_changelog.md or any other record yourself before step 4: the script writes them.
2. Read CI (the last completed run) and note it. A red is fixed after step 4, never before it: the records' sha256 values below assume dev 8e7feb84 unchanged.
3. Write each data file below to /tmp/r8/<name>, outside the repository, exactly: its content is every byte after the newline that ends its FILE line, up to the start of its END line — blank lines at its start or end included. Copy by script from this message; never retype. Check each file's sha256 and byte count against its FILE line, and write it again until both match; if a file still differs after a second write, STOP and report its name and the two values.
4. From the repository root run: `python3 /tmp/r8/r8_apply.py /tmp/r8 .` It changes or creates exactly eight paths, roadmap line 3 included. Every sha256 it prints must equal the EXPECTED list. A mismatch is a STOP: report the printed line and the expected one, and change nothing by hand.
5. These files are the supervisor's records, imported word for word (G11, G41). Never edit their text.
6. Then fix any CI red at its root.
7. Then PART A and PART B below.

EXPECTED (step 4)
6c0a80d8af380084dd560aa99790e08275bdbc9dc1369fbf5e34a8fd65e302e8 docs/tracking/incidental-findings.md
fdc2bea192bab2ac750e8d7314f8f899348996024f373e0ad78cd49230f60792 docs/spec/spec-ledger.md
d145afd02505a1d351fb09d2a1c2e305b48549445206ff2428333c0bfb6e90bd docs/governance/instructions-amendments.md
e08ff8a4b2e703f5fd7b4cfc3ab3a638c0719c3b0bcc05ca00700b8a59ef1bf8 docs/governance/lovable-knowledge.md
dddddc707094087465095c7693e7292bb536bb53c969a836338af747ca81e4f1 docs/governance/system-state.md
15aae672a070bbcf036ca7d090ad80eddd6d233a3cb33ae396d8eb1c41971346 docs/governance/handoffs/2026-10-30-foundations-j1-handover.md
28eac2d6b8190ccf3a0b747b87c74fef433a966904285444c882d3c45f4fa830 roadmap.md
f0f7edf956a329c94ed0542f81b81c4dab68ad99f8be32e5ce8831d054345f0a docs/_changelog.md

PART A — the small guards and a census (G0.4: a class fix carries its guard). These run first; each is quick.
A1. INC-1004's guard: a conformance census over e2e/ that fails when a spec waits by hand for the language menu to close around a switchLanguage call (getByRole("menu") with toHaveCount(0) next to switchLanguage). That wait lives only in switchLanguage. Prove it on a planted copy.
A2. INC-948's guard: a conformance census over e2e/ that fails when a spec walks the place step's region picker by itself (a loop selecting post-where-region values, or a bare count() on post-where-city options) instead of calling pickCity. Prove it on a planted copy of the old walk.
   - A1 and A2 may share one test file. Allowlist lines only with `key | reason | until`.
A3. INC-1006's census: every e2e site that compares a figure the screen rounds with a second rounding of its source (toFixed or Math.round on a stored value, compared with text read from the page). e2e/ad-page.spec.ts :1303 (the maps link's two-place pin) is the first to read: it is correct only if it uses the app's own rounding expression; if it does not, it compares the claim the screen makes, as PW-37 now does. List every site with its verdict.
A4. The register (docs/governance/mechanisms.md): one row for the overlay-shift rule (INC-1005; src/styles.css; CF-SHIFT-1) and one for the place pick in tests (pickCity; A2's guard).

PART B — R1b, as ruled in docs/governance/briefs/foundations-turn-r1a.md items 5–11 (D98's code read from a40e1247^, the overlay loader for on-demand code, rows 36–48 px on a fine pointer and at least 44 px on a coarse one, touch tests with hasTouch, the ‹ Main menu row, first-download growth up to 0.5 KiB with its cause and DEC-296's ceiling rule, the docs and the register row for the sub-menu mechanism). Read that file's Part 1 section by line range first; it governs.

SPLIT: if the platform's time limit nears, stop at a clean point with the checks green — after step 4, after Part A, or inside Part B — push, and report three lines (done, left, CI).

TESTS: each touched spec file whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37). The ids are grep-checked free.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r8-r1b.report.md:
- step 0's sha256;
- the CI line;
- the eight printed sha256 lines;
- Part A, item by item;
- Part B, item by item (foundations-turn-r1a.md items 5–11), with the per-page growth table;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only 8e7feb84.
````
