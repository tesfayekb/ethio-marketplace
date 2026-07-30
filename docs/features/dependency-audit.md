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
