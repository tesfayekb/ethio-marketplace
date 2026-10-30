# Turn P0 — Cursor's rules and the Sage designer's files — report

Base: dev aed7904b · Brief: docs/governance/briefs/foundations-turn-p0.md

## Step 0's sha256

`sha256sum docs/governance/briefs/foundations-turn-p0.md` →
`58fdb49e536a5fabdb17cf85d6c07508f167b7d6b298bb34e30e1f1492db5cac` — equals the value after END BRIEF. roadmap.md and docs/_changelog.md were not edited by hand; step 4's script wrote them.

## CI line

Last completed run, read at the raw ci-evidence addresses (two-step read: conclusion, then commit):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `aed7904b96eb30258824fc572ff0013e131728bb` (short `aed7904`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-30T16:33:14Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41087865312
```

Classification: e2e-last-failure.md for that run reads `Passed: 2274 · Skipped: 244 · Failed: 0`, gating failures 0; shard 5 has neither results nor a lane log because its temporary backend never started — the start log's error is `Error response from daemon: toomanyrequests: Data limit exceeded` (Docker Hub refused the image pulls). This is INC-1018, an infrastructure failure, not a code finding; the brief states there is nothing to fix and this turn's push runs CI again. No code red to fix (step 6: none).

## The nineteen printed sha256 lines (step 4)

`python3 /tmp/p0/p0_apply.py /tmp/p0 .` printed, each equal to the EXPECTED list:

```
f43711ddac11cd1e73b772e5be8a1ee6c42ea3db72fbcd273f76e2c3ef674865 .cursor/rules/00-protocol.mdc
fa35035b9f4121ed8796f76a9bb0fe0f96a6e489cbb948d57f596ba2a3b2b404 .cursor/rules/10-code-laws.mdc
9b3af9097c165fb4596994c8490d15a38179f865d3f71f7a6b19deb16dc33c39 .cursor/rules/20-tests.mdc
d4694030c861e17c098e55a7442532cb2a03e7a12ad0b321b9b5168f2c5315af .cursor/rules/30-migrations.mdc
883de7275d4d60d17cc7d8390a33d7a03780f7562d90016b8788f2c1570a76a0 .cursor/rules/40-ci-evidence.mdc
971378204213dc925194f7a13b6a2576677e90761ff7576d014eb5807001f7f2 .cursor/rules/50-security.mdc
f1acaa833430af5bf02ed9f45bef191e9c32f0ebd285fbbb11662e8cdd5041e1 .cursor/rules/60-report.mdc
814f2fecb7420e054b549535dff82e8f76bd6b5c918c2a79fae9dd40c5972a99 .cursor/rules/80-review.mdc
01df38865eeaaba363a008e95c5a279a3d1d41278b4a973a6570f12cdd12f2eb .cursor/environment.json
5f47e5260ae31cad2c815ebb26100ac0f7342c3f07d637ce39bbdbc222fa56ae docs/governance/sage/README.md
bc8f38b3f52d7f217bbf60ed0f3f0ba7de8f3d0d7a7999b082691e544ed825f8 docs/governance/sage/sage-tokens.css
944693249edefd538fad48aa55c25a7e0ec6f8b82c18fd49b3efc64fc420d61a docs/governance/sage/status-ribbon-gold.svg
2ed3fbc837197439412da7a86a7cf2c65835f4bae2b228bb43fcb5c4ecc6fdc4 docs/governance/sage/status-ribbon-pearl-dark.svg
a31d614a38a8bc79caf5f5fb29045588a44971c909625a69afd73c0c885ea0a9 docs/governance/sage/status-ribbon-pearl.svg
c30c320be1fe01660b7240081a02bc7eedfcfb0949f795049de87ad228f8d49e docs/governance/sage/status-ribbon-sage.svg
2f960ac1d9822bc076a3e4acd8a81408a14ee94b5344491e99a7a9e9c9f094f7 docs/governance/sage/tier-tab-featured.svg
93cdad812f6f1d05071729ff64b67f26b7cfaf4251d864e13c2166ae7fd24563 docs/governance/sage/tier-tab-premium.svg
fadd4f47f9a12af5d79522e02c125f67478880e1e3d108a4401f225ca1abdcb3 roadmap.md
5a76b36aebe2746466048c1e76c1b8e677a1e046b6ab10c2c803eb3772e00d08 docs/_changelog.md
```

Step 3's per-file checks before the run: every data file's sha256 and byte count matched its FILE line (18 files, 80,196 bytes total; verified with `sha256sum` and `wc -c` in /tmp/p0). The imported files were not edited or reformatted (step 5).

## The checks' last line

`bun run checks` once on the final tree:

```
checks: 34 PASS · 0 FAIL · 21 NOT RUN · 919s
```

NOT RUN are the usual environment-gated steps (among them: component-tests' install step — the sandbox's dependencies are already installed; the promote lane's two steps — only CI promotes, DEC-020; the browser/backend lanes that need staging or a temporary backend).

## K2

None. The turn imports documents and configuration only; no app code, no mechanism, no consumer changed. Basis: `git diff --name-only aed7904b` (below) lists only `.cursor/**`, `docs/**` and `roadmap.md`. The imported `.cursor/rules/*.mdc` bind Cursor, not this executor; they were read as data and change nothing in the project Knowledge or AGENTS.md.

## git diff --name-only aed7904b

```
.cursor/environment.json
.cursor/rules/00-protocol.mdc
.cursor/rules/10-code-laws.mdc
.cursor/rules/20-tests.mdc
.cursor/rules/30-migrations.mdc
.cursor/rules/40-ci-evidence.mdc
.cursor/rules/50-security.mdc
.cursor/rules/60-report.mdc
.cursor/rules/80-review.mdc
docs/_changelog.md
docs/governance/briefs/foundations-turn-p0.md
docs/governance/sage/README.md
docs/governance/sage/sage-tokens.css
docs/governance/sage/status-ribbon-gold.svg
docs/governance/sage/status-ribbon-pearl-dark.svg
docs/governance/sage/status-ribbon-pearl.svg
docs/governance/sage/status-ribbon-sage.svg
docs/governance/sage/tier-tab-featured.svg
docs/governance/sage/tier-tab-premium.svg
roadmap.md
```

(This report file itself is the twenty-first path, added after the diff above was captured.)

## Limits

- CI on this turn's push has not completed; the next run is the judge of INC-1018's recurrence.
- No browser tests were run: the turn changes no app code, so no spec file was touched or owed.
