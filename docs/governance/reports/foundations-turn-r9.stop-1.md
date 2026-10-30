# Records turn R9 — stop 1

## CI line

Last completed run: 41087865312 on `aed7904b` — FAILURE: 2,274 passed, 0 failed; shard 5 had no results (its backend never started, INC-1018). The run on `8c48bb2a` (turn P0) had not completed when this turn read the evidence.

## Step 0

`docs/governance/briefs/foundations-turn-r9.md` sha256 `4d12d3fee04ce216bf02e79db29f0132b47a1e57bbef2076289e35dab7e3d95d` — matches the brief.

## Step 3

All twelve data files in /tmp/r9 matched their FILE lines (sha256 and byte count).

## Step 4 — the seven printed lines (all equal EXPECTED)

```
eea59f9d85fd52e6198b1ef5a010188d167a47d85c4a7def16c44e4e6bad2fca docs/tracking/incidental-findings.md
da3871e3fe6039d00cb3efe4591bd52443cf540e762f772554fc9197d8c66a07 docs/spec/spec-ledger.md
7559560058bffc477f2ee2dc69474e83d8d237f44783831708de56d102165ae0 docs/governance/instructions-amendments.md
6f3857a70fcc0d01c8850ac52c7c4510c6b82cebd73fb0a00ee9bb5ddfa76d0a docs/governance/system-state.md
dd197615b5c71f2419a3d7291160c957c4718d784bb4b9265179ea85e42a6ac1 docs/governance/handoffs/2026-10-30-foundations-r1-handover.md
5b177bd0f103b1cbc69f2d54d4a9d2457b2689954ffc2141ad2d2b0d2232f3ce roadmap.md
683ca3b0579c58340b0bb7b458a2b2d7507832ea0aeb28bef0a4815c39d4b86b docs/_changelog.md
```

## Checks — last line

```
checks: 28 PASS · 1 FAIL · 26 NOT RUN · 1115s
```

FAIL: Format check. `prettier --check` flags `roadmap.md`, one line (the imported INC-1017 line from roadmap-lines.md):

```
< - [ ] INC-1017 — format:check and format:write gain scripts/**, so the formatter covers every file the lint step judges
> - [ ] INC-1017 — format:check and format:write gain scripts/\*\*, so the formatter covers every file the lint step judges
```

Prettier escapes the bare `**` in Markdown. Lint, build and the bundle report are NOT RUN because they come after this step. The same format step will fail in CI on this push.

## Why STOP

The brief says to fix a red at its root, and also says never to edit or reformat the supervisor's text (step 5). Fixing this red needs one of two things, and both break step 5 or go outside scope:

1. Escape `scripts/\*\*` in the supervisor's roadmap line. This is a one-character record change, and roadmap.md's sha256 would no longer equal EXPECTED.
2. Name `roadmap.md` in `.prettierignore` (E5: each file named one by one). This is a config change the brief does not name.

The supervisor decides. The records stay exactly as imported, and nothing was changed by hand.

## K2

None. No app code changed. The same class: a supervisor record whose Markdown prettier rewrites (`**`, `_` and similar) fails format:check on import. No guard checks this in the import scripts.

## git diff --name-only 8c48bb2a

```
docs/_changelog.md
docs/governance/briefs/foundations-turn-r9.md
docs/governance/handoffs/2026-10-30-foundations-r1-handover.md
docs/governance/instructions-amendments.md
docs/governance/reports/foundations-turn-r9.stop-1.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
docs/tracking/incidental-findings.md
roadmap.md
```
