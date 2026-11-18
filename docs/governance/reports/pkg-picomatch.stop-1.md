STOP — pkg-picomatch part STEP 1: no patched picomatch version exists
DONE: parts (none written; the package turn has no lettered parts), steps 0, 1 (census read, not yet written into a report)
LEFT: steps 2, 3, 4, 5 (override, checks, push and pull request, report)
CI: first six lines of the root ci-status.md (dev, the base; not this lane, which has not run yet):
# CI Status (auto-generated — do not edit by hand)

- Commit: `385003bd17b2806092bcab92b4b589ea308a4156` (short `385003b`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-18T00:23:51Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44204012123
FILES:
docs/governance/briefs/pkg-picomatch.md
roadmap.md
docs/governance/reports/pkg-picomatch.stop-1.md

The brief (THE SYSTEM, FIVE LENSES, failure modes) says: "if no patched version exists yet, STOP and
say so (never an ignore line)"; STEP 1 repeats it: "if no patched version exists, STOP". The census
shows none exists.

Evidence (commands run in this task, 2026-11-18):

1. `bun audit --audit-level=high` (bun 1.3.14): one high finding, exit non-zero.
   `picomatch  <=4.0.7`, paths through vite, vitest, @lovable.dev/vite-tanstack-config ›
   @tanstack/devtools-vite, @tanstack/react-start › @tanstack/start-plugin-core,
   @tanstack/router-plugin › @tanstack/router-utils and typescript-eslint › … › tinyglobby, all
   ending in fdir › picomatch. `1 vulnerabilities (1 high)`.
2. `bun audit --json`, picomatch entry: id 1247710, GHSA-fc5q-39xc-vjpf, severity high,
   `vulnerable_versions: "<=4.0.7"`, CVSS 7.5, CWE-1333. No patched version is printed.
3. `gh api /advisories/GHSA-fc5q-39xc-vjpf` (a read): published 2026-10-19T18:32:12Z, one
   vulnerability row for npm `picomatch`, `vulnerable_version_range: "<= 4.0.7"`,
   `first_patched_version: null`.
4. `bun info picomatch`: dist-tag `latest` is 4.0.7. Published versions are 1.x, 2.x through 2.3.2,
   3.0.0 through 3.0.2 and 4.0.0 through 4.0.7. The newest release is inside the affected range, so no
   override range (`^4.0.8` or any other) can resolve to a clean version, and a range that picks 2.x
   or 3.x is not a patch either (the advisory's affected range is `<= 4.0.7`, which includes them).

Premise found wrong: the brief names "the first version the advisory names as patched"; the advisory
names none. The brief's own wording makes this a STOP, not an ignore line, an allowlist entry or an
`overrides` entry that points at an affected version.

Other census facts for the report's §4 (read, not yet written there):
- Copies in `bun.lock`: top-level `picomatch@4.0.7` (bun.lock:1088); nested `picomatch@4.0.4`
  under `@tanstack/devtools-vite` (:1378), `tinyglobby` (:1442), `vitest` (:1448) and
  `@typescript-eslint/typescript-estree/tinyglobby` (:1538).
- Requirers and ranges: `@tanstack/start-plugin-core` `^4.0.7`, `@tanstack/devtools-vite` `^4.0.3`,
  `tinyglobby` `^4.0.4` (0.2.17 and the nested 0.2.16), `vite` `^4.0.5`, `vitest` `^4.0.3`,
  `unplugin` `^4.0.7`, and `fdir` as an optional peer `^3 || ^4`.
- `package.json` `overrides` holds eleven entries (:119–:131), none for picomatch.
- `rg -n 'picomatch' docs/governance roadmap.md` finds only this brief and roadmap line 3.
- Tier: a build tool's transitive dependency; no source file imports it.
- Base: the brief says `dev 143027fac`; `origin/dev` is `385003bd1` (PR #63). The files that changed
  (`docs/generated/i18n-usage.json`, `e2e/ad-page.spec.ts`, `public/i18n-usage.json`,
  `scripts/route-budgets.mjs`, `src/features/ad-page/save-intent.test.ts`,
  `src/features/ad-page/save-intent.ts`, `src/routes/l.$slug.tsx`) are outside this lane's scope.

What the audit job will do: it stays red on every branch until a patched picomatch is published (or
every requirer stops needing it); the audit gate's rule is "no advisory is ignored or allowlisted".

QUESTION for the supervisor — a ruling, one of:
(a) wait: this lane stays at this stop and is resumed (STEP 2 onward) when a patched picomatch version
    appears on the registry; `bun audit` is read again then;
(b) drop the lane: close this branch, and open lanes name the red under Limits (the brief's PREVENTION
    line);
(c) a different mechanism the supervisor names (for example a requirer's own update that drops
    picomatch, or an exception line with a DEC); the executor proposes none of these on its own.

Nothing was installed, no `package.json` or `bun.lock` change was made.
