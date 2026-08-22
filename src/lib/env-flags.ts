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
export const isE2E: boolean = import.meta.env.DEV || import.meta.env.VITE_E2E === "1";
