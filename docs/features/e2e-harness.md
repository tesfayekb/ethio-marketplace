# E2E test harness (Playwright)

Status: **built, locally provable; CI acceptance pending operator secrets** (2026-08-01).
Approach frozen by `docs/decisions/e2e-testing-investigation.md`.

## What exists

| File                          | Role                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| `playwright.config.ts`        | Two viewport projects (360×740, 1280×800), `retries: 0`, `webServer` = built app via wrangler |
| `e2e/global-setup.ts`         | Mints ONE pre-confirmed user via the Supabase Admin API; writes `e2e/.state/` (ignored)       |
| `e2e/global-teardown.ts`      | Deletes the user and verifies deletion                                                        |
| `e2e/smoke-auth-i18n.spec.ts` | The frozen first spec                                                                         |
| `.github/workflows/ci.yml`    | `e2e` job — cached Chromium, fresh build, report artifact on failure                          |

Scripts: `bun run test:e2e`, `bun run test:e2e:install`, `bun run preview:built`.

## Serving the production build in CI

`vite preview` cannot serve this app: the TanStack preview plugin imports
`dist/server/server.js`, while Nitro's `cloudflare-module` preset emits
`dist/server/index.mjs` (a Worker module). The build's own documented preview is wrangler.

Working command (verified locally, responds 200 on `/`):

```
bun run build
bun run preview:built --port 4173   # bunx wrangler@4.118.0 --cwd ./dist dev --ip 127.0.0.1
```

Playwright's `webServer` runs exactly this, with `url` = `http://127.0.0.1:4173`
(wrangler binds 127.0.0.1, not `localhost`/::1) and a 180s start timeout.

## Target

**ethio-staging only** (`jatpuhfdjfzctjipklmk`). `e2e/global-setup.ts` hard-refuses to run when
`E2E_SUPABASE_URL` contains the ethio-prod ref — the harness can never write to production.

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

## Pass bar (unchanged from the decision report)

Both viewport projects green in GitHub Actions on push to `main`; under 5 minutes added;
zero flakes across 3 consecutive runs at `retries: 0`; no secret in any log or artifact;
zero residual `e2e+%` users after the run; all existing CI gates still green.
