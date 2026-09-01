# Dependency Audit Rulings

## 2026-07-30 Audit

### Findings

- 5 high-severity vulnerabilities reported.
- Single root cause: `brace-expansion` reachable only through the `eslint` devDependency chain:
  - `eslint@9` → `minimatch@3` → `brace-expansion@1.1.14`
- Nested `brace-expansion@5.0.5` exists under the `@typescript-eslint` dependency tree.

### Ruling

All findings are **accepted** under the `DEV-ONLY-ACCEPTED` rationale:

1. **Not in production tree.** `npm --omit=dev` shows zero copies of `brace-expansion`.
2. **Dormant.** The only consumer is `eslint .` running on our own trusted repository files in CI. No user input reaches glob expansion.
3. **No in-range patch.** The `brace-expansion` 1.x line used by `minimatch@3` has no available patch within the current semver range.
4. **Nested 5.x floor-bump blocked.** A targeted bump of the nested `brace-expansion@5.0.5` to `>=5.0.9` is not cleanly expressible on Bun (Bun rejects nested `resolutions`; the only flat form would force the entire `eslint` chain onto `brace-expansion@5.x`, which is a broad, risky change outside the safe envelope of this task).

Therefore, the nested 5.0.5 item is also accepted and tracked alongside the major toolchain upgrade.

### Deferred Tracked Tasks

1. `eslint` 9 → 10 major toolchain upgrade (flat-config breaking changes, full CI re-verify).
2. Add a CI dependency-audit gate on GitHub's hosted runner (the sandbox has no audit endpoint, so no standing gate exists today).

### Scope Note

No `package.json` or lockfile change was made for this task; only the audit record.

## Now enforced in CI (P1-g Step B/D, 2026-08-03)

The `dependency-audit` job in `.github/workflows/ci.yml` runs
`bun audit --audit-level=high` on every run and FAILS the build on high or
critical advisories — law H2, no known-error debt. It reports three outcomes,
not two: clean, findings, and _advisory service unreachable_. The last one fails
with its own distinct message, because a 404 from the advisory service is not a
clean bill of health. `bun audit` cannot reach that service from the build
sandbox, so CI is the authoritative run.

## 2026-08-04 Audit — 8 high findings, REMEDIATED (INC-025)

Three transitive dev/build-chain packages, cleared by `package.json` `overrides`:

```json
"overrides": {
  "brace-expansion": "^1.1.17",
  "postcss": ">=8.5.18",
  "js-yaml": ">=4.3.0"
}
```

Resolved: `brace-expansion@1.1.18`, `postcss@8.5.25`, `js-yaml@5.2.3`.

`brace-expansion` is pinned inside 1.x deliberately. The obvious flat floor
`>=1.1.17` resolves the entire tree to 5.x, whose API is incompatible with
`minimatch@3` — `eslint .` then dies with `TypeError: expand is not a function`.
Bun has no scoped/nested overrides, so 1.1.18 for everyone is the only expressible
fix that is both patched and working. This supersedes the INC-008 acceptance.

Zero runtime exposure: none of the three is in the production dependency tree.
Typecheck, lint, build and format:check all pass on the regenerated lockfile.
The clean-audit verdict itself comes only from CI — `bun audit` 404s in the sandbox.

## 2026-08-12 Audit — GHSA-2v37-7h3g-55p8 (nanoid), REMEDIATED

- Advisory: GHSA-2v37-7h3g-55p8, `nanoid` < 3.3.18 (predictable output).
- Path: `vite` → `postcss` → `nanoid` (transitive, build chain).
- Remediation: `package.json` `overrides` gains `"nanoid": "^3.3.18"`.
  The advisory's floor is `>=3.3.18`; the range is pinned inside 3.x because
  `postcss@8` requires `nanoid@^3.3.16` and a flat `>=3.3.18` resolves the tree
  to `nanoid@6`, a different (ESM-only) API. `3.3.18` is both patched and the
  only expressible working fix on Bun (no nested overrides).
- Resolved: `nanoid@3.3.18` in `bun.lock`.
- Verification: build green, typecheck/lint/format clean. `bun audit` cannot
  reach the advisory service from the build sandbox (404), so the clean-audit
  verdict comes from the CI `dependency-audit` job.

### Standing note

Transitive advisories are remediated by `overrides` in the same push that
detects them — never deferred, never accepted merely because the package is
not in the runtime tree (law H2).

## 2026-09-01 Audit — browserslist / update-browserslist-db, REMEDIATED

- Packages: `browserslist` (build-chain, reached through `vite` and
  `@babel/helper-compilation-targets`) and its `update-browserslist-db` CLI.
- Action: `bun update browserslist update-browserslist-db`. A version at or
  above the advisories' fix EXISTS, so the fix was LANDED — no ruling, no
  deferral (law H2).
- Resolved in `bun.lock`: `browserslist@4.28.8`, `update-browserslist-db@1.3.2`,
  `caniuse-lite@1.0.30001810`.
- Expressed as `package.json` `overrides`, not as direct dependencies. `bun
update` on a transitive package promotes it into `dependencies`, which would
  falsely declare a build-chain package as application code; the override form
  also pulls the NESTED `@babel/helper-compilation-targets` copy (previously
  pinned at 4.28.2) onto the same patched version, leaving exactly one
  `browserslist` in the tree.
- Verification: install clean, lockfile regenerated, typecheck/lint/build/
  format:check green. `bun audit` cannot reach the advisory service from the
  build sandbox (404), so the clean-audit verdict comes from the CI
  `dependency-audit` job — which fails on high/critical and treats a transport
  failure as its own distinct red, never as a pass.

### Ruling mechanism (restated)

There is no blanket skip and no `|| true`. When a fix version does NOT exist,
the finding is recorded here as a DATED ruling naming the package, the reason
it cannot be remediated ("build-time-only transitive; not in the shipped
bundle"), and an explicit RE-CHECK DATE (detection + 14 days); the CI gate then
points reviewers at this file. Nothing is accepted merely because it is not in
the runtime tree.
