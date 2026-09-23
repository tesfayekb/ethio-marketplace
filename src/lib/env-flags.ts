/**
 * DEC-018 — THE ONE E2E FLAG.
 *
 * CI now runs the PRODUCTION build (the dev SSR server left the pipeline with
 * INC-085d), so every test-only instrument that used to gate on
 * `import.meta.env.DEV` must gate on this flag instead — otherwise the E2E
 * build would ship without the hooks the suite depends on.
 *
 * PROD IS UNCHANGED: `VITE_E2E` is set ONLY by `bun run build:e2e` and the CI
 * E2E jobs. A normal `bun run build` leaves it empty, so `isE2E` is `false`
 * and every instrument compiles out exactly as it did under the DEV gate.
 */
/**
 * INC-270 — MODULE INIT MUST SURVIVE A NON-VITE LOADER. Playwright's own
 * TypeScript loader evaluates app modules in plain Node, where
 * `import.meta.env` does not exist: a spec that imports `src/i18n/provider.tsx`
 * reaches `auth-service` → `session-policy` → this file, and the bare
 * `import.meta.env.DEV` read threw "Cannot read properties of undefined
 * (reading 'DEV')" during test COLLECTION, so every shard produced zero tests.
 * The guard is the only change: under Vite both branches are still replaced
 * statically, so the built output (prod and `build:e2e`) is unchanged.
 */
export const isE2E: boolean =
  typeof import.meta.env === "undefined"
    ? false
    : import.meta.env.DEV || import.meta.env.VITE_E2E === "1";
