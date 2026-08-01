# E2E test harness (Playwright)

Status: **built, locally provable; CI acceptance pending operator secrets** (2026-08-01).
Approach frozen by `docs/decisions/e2e-testing-investigation.md`.

## What exists

| File                          | Role                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| `playwright.config.ts`        | Two viewport projects (360×740, 1280×800), `retries: 0`, `webServer` = Vite dev server  |
| `e2e/global-setup.ts`         | Mints ONE pre-confirmed user via the Supabase Admin API; writes `e2e/.state/` (ignored) |
| `e2e/global-teardown.ts`      | Deletes the user and verifies deletion                                                  |
| `e2e/smoke-auth-i18n.spec.ts` | The frozen first spec                                                                   |
| `.github/workflows/ci.yml`    | `e2e` job — cached Chromium, fresh build, report artifact on failure                    |

Scripts: `bun run test:e2e`, `bun run test:e2e:install`, `bun run serve:e2e`.

## Serving the app in CI — dev-server mode (Option B)

CI E2E runs against the **Vite dev server** (`vite dev`), not the Cloudflare-worker
production bundle. This is a deliberate, evidence-based choice:

- `vite preview` cannot serve this app — the TanStack preview plugin imports
  `dist/server/server.js`, while Nitro's `cloudflare-module` preset emits
  `dist/server/index.mjs`.
- Wrangler can serve the local build (`-c dist/server/wrangler.json`), but the GitHub
  runner's `bun run build` does **not** produce `dist/server/wrangler.json` — a debug
  step running after the build showed the file absent, and wrangler died with `ENOENT`.
  The production worker bundle therefore does not reproduce in CI.

Dev mode serves the same SSR app and exercises routing, i18n, auth and UI faithfully,
starts in seconds, and needs no production build. Production-Cloudflare-bundle behaviour
is verified separately by the post-deploy manual/staging smoke check
(investigation report §2). The `build-and-check` CI job still validates `bun run build`;
the `e2e` job no longer builds.

Command Playwright's `webServer` runs (180s timeout, `reuseExistingServer` locally):

```
bun run serve:e2e --port 4173   # vite dev --host 127.0.0.1 --strictPort
```

`url` / `baseURL` = `http://127.0.0.1:4173`.

## Target

**ethio-staging only** (`jatpuhfdjfzctjipklmk`). `e2e/global-setup.ts` hard-refuses to run when
`E2E_SUPABASE_URL` contains the ethio-prod ref, and also refuses when the URL is not the staging
ref — the harness can never write to production.

## Self-verifying setup (fail-fast)

`e2e/global-setup.ts` proves its own preconditions before any spec runs, so a broken environment
fails at setup with a named cause instead of a downstream test timeout on an empty `/auth` form:

1. **Preflight log** — prints `E2E_SUPABASE_URL` (non-secret), whether the service-role key is
   present and its length only (never the value), and whether the ref is staging. Throws if not
   staging.
2. **Create** — `admin.createUser({ email_confirm: true })`; throws immediately on any error or
   missing user id, quoting the Supabase message and status.
3. **Read-back** — `admin.getUserById`; throws if the user is absent or `email_confirmed_at`
   is unset (sign-in would fail).
4. **Only then** the credentials file is written and the suite proceeds.

Note: global-setup does not verify the `handle_new_user` trigger-created `profiles` row. The admin
Auth client uses the `sb_secret_` key, which is not the Postgres `service_role` role that bypasses
RLS, so a direct `profiles` read would be denied by the owner-only policy. Trigger correctness is
already deny-proved in P1-a (`scripts/deny-tests/phase1-identity.md`, D1–D7); the E2E test itself
exercises the profile read through the correct owner-authenticated path.

## Environment

| Name                            | Where                  | Notes                                                   |
| ------------------------------- | ---------------------- | ------------------------------------------------------- |
| `E2E_SUPABASE_URL`              | workflow env (literal) | Staging URL, non-secret                                 |
| `E2E_SUPABASE_PUBLISHABLE_KEY`  | Actions **variable**   | Publishable/anon key, non-secret                        |
| `E2E_SUPABASE_SERVICE_ROLE_KEY` | Actions **secret**     | Admin API only; setup/teardown, never a browser context |
| `E2E_USER_PASSWORD`             | optional               | Generated per run when unset (preferred)                |

## Test data isolation

Emails live in the reserved, non-deliverable namespace `e2e+<run-id>-<n>@ethio-e2e.invalid`.
One user per run, created and destroyed in the same run; `profiles` and `user_directory`
cascade from `auth.users`. No shared long-lived fixture user; tests mutate nothing they
did not create.

## Prerequisite: staging schema

The staging database must carry the same schema as ethio-prod (`countries`, `user_directory`,
`profiles`, `handle_new_user`, grants, RLS). Applying migrations to staging is an operator
step — see the changelog entry and the task hand-off; migrations remain append-only and
unchanged.

## Sign-in timing gate

After submitting the sign-in form the spec waits for the **Sign out** button to become
visible — the unconditional element of the signed-in header branch — before asserting
any identity. Sign-in is async, so asserting the display name straight after the click
raced the submit (mobile-360 runs first and lost the race; desktop won it). The gate uses
Playwright's built-in waiting only; there are no fixed sleeps.

## Pass bar (unchanged from the decision report)

Both viewport projects green in GitHub Actions on push to `main`; under 5 minutes added;
zero flakes across 3 consecutive runs at `retries: 0`; no secret in any log or artifact;
zero residual `e2e+%` users after the run; all existing CI gates still green.
