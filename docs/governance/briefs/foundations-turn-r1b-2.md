# Foundations turn R1b-2 (ruling, saved byte for byte)

````text
RULING — Foundations turn R1b, continue: the sub-menu mechanism (foundations-turn-r1a.md items 5–11). Base: dev 36c4a083. Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1b-2.md; roadmap line 3 names it beside foundations-turn-r1b.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1b-2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names both R1b files.

VERIFIED (dev 36c4a083, fresh clone): step 0's sha256 22cdbba1… matches. The gutter rule is gone from src/styles.css and the neutralised margin stays, with its comment naming INC-1007. CF-SHIFT-1 refuses a gutter, with three planted proofs. Register row 77 is updated. Your local run is 192 passed, 0 failed, with the nine tests and OVS green and no assertion changed. CLEAN pending CI on 36c4a083.

CI FIRST: read the last completed run. If it is the run on 36c4a083 and any of FT-1, SR-1, L1/L2, L3, PW-99 or OVS is still red, fix that first, at its root.

THE WORK: R1b, exactly as ruled in docs/governance/briefs/foundations-turn-r1a.md items 5–11, with the plan you wrote for it (.lovable/plan.md, Part 1). Read both by line range first; they govern. In short:
5. D98's code from `a40e1247^`, read by line range, reused where it fits, the files named in the report.
6. The panel, the safe triangle and the phone split load through the overlay loader (src/components/ui/overlay-loader.ts), never a second on-demand path; a failed download goes to the shell's one notice (INC-911).
7. Rows: 36–48 px with a fine pointer; at least 44 px with a coarse one; a list that cannot fit scrolls with its scrollbar visible.
8. Touch tests run in a context with hasTouch and a coarse pointer.
9. The ‹ Main menu row: removed where the panel replaces in-place drilling; a STOP for a ruling if a panel still needs it.
10. First download: growth up to 0.5 KiB per page with its cause, the ceiling raised by DEC-296's rule; more, or growth without a cause, is a STOP with the measurement.
11. Docs: docs/features/panels.md (D213 superseded by DEC-288), the changelog, and the register row for the sub-menu mechanism.
- The panel opens without moving the page, under the INC-1005 mechanism, and OVS gains a case for it.
- The conformance guard CF-SUB-1 and the unit and E2E tests as your plan lists them (ids grep-checked free).

ORDER: the mechanism and its guard first, then CategoryNav (the marketplace tree) on it. The admin groups, the account and seller panels and the phone split are R1c and R1d unless they fit this turn cleanly.

SPLIT: if the platform's time limit nears, stop at a clean point with the checks green, push, and report three lines (done, left, CI).

TESTS: each touched spec file whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37).

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1b-2.report.md:
- step 0's sha256;
- the CI line;
- items 5–11, each done or not, with what was read from a40e1247^;
- the per-page growth table;
- the tests and the unit count;
- the checks' last line;
- K2;
- git diff --name-only 36c4a083.
````
