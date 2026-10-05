Source: supervisor thread, turn 1109, Thu 2026-10-01 18:14 New York.
Status at 2026-10-05: DEC-098 stage 1 built (aeaf3d12, run 36935469464 green; ADOPT confirmed in turn 1118); stage 2 (remove the six evidence files from dev) is still open; the executor's git form of reading ci-evidence does not work from its sandbox (2026-10-05 finding: it must read the raw.githubusercontent.com URLs); batch 12 imported (81 changes) and walked 6 of 6; the repo holds DEC-098 lines in docs/features/ci-status-reporter.md, ci-guards.md, nightly-e2e.md and AGENTS.md, not this text.
Related: DEC-098, DEC-097, INC-377, INC-378, C27 batch 12, scripts/publish-evidence.sh.

**Batch 12 passes the audit, so import it.** Counts match the curator's (14 definitions changed; links 67 changed · 1,392 unchanged), no option breaks an importer limit, no new validation issue appears, and all six of the curator's walk steps hold against the merged data.

**Lovable's last turn is clean.** The INC-377/378 fix is on dev (`b26bb0b3`), CI is green, main is promoted, and there is no new side branch. That was the first fully green run with the account pool. The one flaky test (AT-47) signs in as the shared super admin, not a pooled account, so it does not count against the pool. Adoption now needs three consecutive green runs.

Do these in order:

1. **Lovable first** (it works while you import). Paste the block below, attach nothing, and send it.

---
```
DEC-098 — CI evidence moves off dev (stage 1 of 2). Tier B, CI infrastructure (closed surface; this DEC is the named change).

WHY: three CI reporters push "[skip ci]" commits to dev. When one lands during your turn, the platform parks your turn on a lovable-sync-<epoch> side branch (INC-359, INC-373, INC-376). After this change dev moves only when you push.

DECISION RULE (frozen now, judged by the supervisor): ADOPT if the first two CI runs after this landing each (a) put ci-status.md, guards-last-failure.md, e2e-last-failure.md and flake-ledger.md on branch ci-evidence, with ci-status.md naming that run's commit, (b) add no bot commit to dev, and (c) a green run still promotes main. Otherwise this commit is REVERTED. The two nightly files are judged at the next 06:00 UTC nightly.

SCOPE — you may touch only:
- .github/workflows/ci-status-report.yml — the "Commit and push" step of job `report`
- .github/workflows/ci.yml — the publish loop inside the step "Publish merged E2E report" (job "E2E (Playwright, ethio-staging)")
- .github/workflows/nightly-e2e.yml — the step "Write and push heartbeat"
- scripts/publish-evidence.sh (new), scripts/publish-evidence.selftest.sh (new)
- docs/features/ci-status-reporter.md, ci-guards.md, nightly-e2e.md, e2e-harness.md; docs/_changelog.md; AGENTS.md (one line); roadmap.md
Everything else is forbidden. In particular do NOT touch: the promote job, the sync-main job, triggers, concurrency, paths-ignore, .prettierignore, scripts/e2e-failure-report.ts, any test, any src file. Do NOT delete or edit the six evidence files on dev (stage 2 removes them after ADOPT).

CENSUS FIRST (state it in your report): every place in .github/ and scripts/ that pushes to a branch. I count three pushes to dev — ci-status-report.yml, ci.yml (E2E reporter), nightly-e2e.yml, each `git push origin HEAD:dev` — plus promote's `git push origin HEAD:main` and sync-main's force push, both unchanged. If you find another push to dev, stop and report before editing.

TASK
1. scripts/publish-evidence.sh "<commit message>" <file> [<file>...] — always called as `bash scripts/publish-evidence.sh`.
   - Each <file> is a path under docs/tracking/ in the current checkout; it is published at the same path on branch ci-evidence.
   - It works in a separate directory (worktree or temp clone). It never changes the current checkout and never pushes to dev or main.
   - If origin/ci-evidence does not exist, it creates it as an orphan branch seeded with the six files as they are on origin/dev (ci-status.md, guards-last-failure.md, e2e-last-failure.md, flake-ledger.md, nightly-status.md, nightly-last-failure.md), so the flake ledger keeps its history.
   - Three attempts: fetch ci-evidence, reset the work directory to it, copy the files in, commit only if something changed, push; on a rejected push, refetch and repeat. After three failures print a ::warning:: and exit 0. Same bot identity as today.
2. ci-status-report.yml: "Commit and push" publishes ci-status.md and guards-last-failure.md through the script. The checkout stays `ref: dev`.
3. ci.yml, "Publish merged E2E report": e2e-last-failure.md and flake-ledger.md are published through the script. The ledger stays append-only against the PUBLISHED copy: on every attempt the flake pass runs against the freshly fetched ci-evidence ledger (E2E_FLAKE_LEDGER is already read at scripts/e2e-failure-report.ts:2156), exactly as it runs against the freshly fetched dev copy today. The never-silent law stays: the reporter's exit code is re-raised after publication.
4. nightly-e2e.yml, "Write and push heartbeat": nightly-status.md is written as today; it and nightly-last-failure.md are published through the script.
5. scripts/publish-evidence.selftest.sh, run locally against a temporary bare repository, output pasted in your report: (a) the first call creates ci-evidence seeded from dev; (b) a second call with the same content makes no commit; (c) changed content makes exactly one commit on ci-evidence; (d) the dev and main SHAs are unchanged after all calls; (e) a push rejected once by a competing commit succeeds on retry and keeps the competing commit's content.
6. Docs: docs/features/ci-status-reporter.md gains one paragraph — evidence lives on branch ci-evidence at docs/tracking/<file>; read it with `git fetch origin ci-evidence && git show origin/ci-evidence:docs/tracking/ci-status.md`; the copies on dev are frozen until stage 2. Correct the lines in ci-guards.md, nightly-e2e.md and e2e-harness.md that say tracking commits land on dev. AGENTS.md: one line with the same read command. Changelog: one line.
7. roadmap.md: in the last queue line add "INC-374, INC-375" after "INC-371". Append a section "## DEC-098 (2026-10-01)" with "- [x] stage 1: reporters publish to ci-evidence" and "- [ ] stage 2 after ADOPT: remove the six evidence files from dev with their paths-ignore and .prettierignore lines; DEC-096 detector". INC-374 = option bounds accept `settled` (importer gate + engine; its spec arrives with its prompt). INC-375 = a price mode forced to Contact by a basis is released when the basis changes (step-pricing.tsx).

DO NOT
- leave any workflow pushing to dev;
- change what the reporters write, or make a failed publish a red job;
- add [skip ci] logic, new triggers or new jobs.

CAPABILITY (answer in your report): can your sandbox read another branch of this repository (`git fetch origin ci-evidence`)? If not, say so; nothing else changes.

BEFORE REPORTING: no database change and no spec is touched in this turn. Run typecheck, lint, format:check (roadmap.md included), unit tests and the self-test; parse the three workflow files as YAML and state that they load. Report only on green, in three lines: done · verified · next. List every file changed and confirm nothing outside scope.
```
---

2. **Import batch 12.** Upload `c27-b12-commercial-definitions.csv` and `c27-b12-commercial-links.csv` together. The preview must read **0 added · 81 changed · 1,392 unchanged · 0 refused**. If it reads anything else, stop and send me the preview. There is no Translations step and no Publish.

3. **Walk, six checks.** Start a new listing for each and stop at the Specifications step.
   1. **Agriculture › Animal Feed & Supplements**, Feed Type = Silage: Unit of Sale is prefilled Per Quintal, and there is no Feed Form row and no write-in box.
   2. **Commercial Equipment › Restaurant, Café & Bakery Equipment**, Type = Prep Table: no Brand row and no Power Source row. Choose a Condition and press Next; it moves on without asking for a brand.
   3. Same form, change Type to Commercial Dishwasher: Brand offers Berjaya · Fagor · Electrolux Professional · Bartscher · Other. There is no Power Source row, and Voltage and Rated Power are asked.
   4. **Medical, Dental & Lab Equipment**, Type = Consumables & PPE: no Brand row, no Power Source row, and Condition offers only Brand New · Open Box.
   5. **Industrial & Manufacturing Machinery**, Type = Industrial Welding Machine: Power Source is shown, prefilled Electric, with Electric · Diesel · Petrol · Other.
   6. **Other Commercial Equipment**: Power Source lists "No Power Needed" just before Other. Choose it: no write-in box and no Voltage row.

4. **Tell me the walk result and paste Lovable's report.**

My rulings on the curator's three questions (the curator message follows once the walk passes):
- **Brand on the 14 Commercial types:** stays hidden; no forced write-in.
- **The 19 rows still on Other:** fix TV, Tools, Injera Mitad, Beadwork and the 4 inert rows as the curator proposed. The nine Food rows stay as the one recorded exception: they were built on purpose, and a packaged product always has a producer to write in.
- **Made in at Office Furniture & Fittings:** yes, as an optional question after Colour, for the same types that ask Material.
