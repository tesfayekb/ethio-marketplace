# E2E testing — investigation report (scoping only, nothing built)

Date: 2026-08-01. Status: **report only** — no test code, no config, no dependencies added by this task.

Stack under test: TanStack Start (SSR) + React 19 + Tailwind v4, external Supabase (project ref
`zwmvxvzzvjvtdcfcwiuf`), deployed on Lovable, CI on GitHub Actions, package manager Bun, prettier
pinned exact at 3.8.3.

---

## 1. Tooling

**Recommendation: Playwright (`@playwright/test`), current 1.x line, exact-pinned like prettier.**

| Criterion            | Playwright                                                                                                                                                | Cypress                                                                                                       | Verdict    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- |
| SSR compatibility    | Framework-agnostic: drives a real browser against a real HTTP server. Sees the server-rendered HTML _and_ hydration. Can assert on the pre-hydration DOM. | Same in principle, but Cypress runs the test code _inside_ the page, which complicates SSR/hydration timing.  | Playwright |
| Bun compatibility    | Runs on its own Node-based runner; installs cleanly with `bun add -D`. The runner does not need Bun to execute tests, so no Bun/Node runtime friction.    | Also installs, but its binary + Electron bundle is heavier and its own runner is stricter about the Node env. | Playwright |
| GitHub Actions       | First-party `mcr.microsoft.com/playwright` image or `npx playwright install --with-deps chromium`; caching well documented; official CI recipes.          | Needs `cypress/github-action` or manual binary cache; larger cache.                                           | Playwright |
| Multi-viewport       | Native `projects` with per-project `viewport` — 360px mobile and desktop in one run, no plugin.                                                           | `cy.viewport()` per test; workable but not a first-class matrix.                                              | Playwright |
| Flakiness reputation | Auto-waiting on actionability + web-first assertions (`expect(locator).toHaveText`) + trace viewer; the low-flake default in 2026.                        | Historically more retry/`cy.wait` discipline required.                                                        | Playwright |
| Already in the loop  | The Lovable agent already drives Playwright for live verification of this project (auth deny-proofs, INC-005/INC-010 passes) — same tool, same selectors. | New tool, new idioms.                                                                                         | Playwright |

Other options considered and rejected: **WebdriverIO** (more config, no benefit here), **Puppeteer**
(no test runner, no multi-viewport projects, Chromium-only), **Vitest + Testing Library** (valuable
but it is component/unit testing — it cannot prove SSR routing, real navigation, or a real Supabase
session, so it complements rather than replaces E2E).

**Dealbreakers:** none for Playwright. Cypress has no hard dealbreaker either, but its in-page
runner plus a heavier CI footprint makes it the weaker fit; it is not recommended.

**Install shape (when we build it, not now)**

- `bun add -D @playwright/test@<exact>` — exact pin, matching the prettier precedent (INC-009: a
  floating version is a non-deterministic gate).
- Browser binaries are **not** in `node_modules`; they install separately (`bunx playwright install --with-deps chromium`)
  and must be cached in CI.
- Pin the browser channel too: one project, `chromium` only, to start. Adding WebKit/Firefox later
  is a config line, but each adds install time.
- Config lives in `playwright.config.ts`; test files in `e2e/` (kept out of `src/**` so the
  hardcoded-string scanner and the app tsconfig scope stay unaffected — needs a one-line
  `.prettierignore`/eslint scope review at build time).

---

## 2. CI execution

**Recommendation: a separate `e2e` job in `.github/workflows/ci.yml`, running against a
locally-served production build in the runner — not against the live published app.**

Proposed steps:

1. `actions/checkout@v4`
2. `oven-sh/setup-bun@v2`
3. `bun install --frozen-lockfile`
4. Cache `~/.cache/ms-playwright` keyed on the pinned Playwright version
5. `bunx playwright install --with-deps chromium` (cache hit → seconds; cold → ~40–60s)
6. `bun run build`
7. Playwright `webServer` config starts the built app (e.g. `bun run preview` / the Nitro output)
   on a local port and waits for readiness — no manual "start server & sleep" step
8. `bunx playwright test`
9. `actions/upload-artifact@v4` for the HTML report + traces **on failure only**

**Expected added runtime per run:** ~2.5–4 minutes for a small suite — roughly 30–60s browser
install (cached: ~10s), ~60–90s build (partly shared with the existing build job), ~30–60s for the
first handful of tests. Budget: **under 5 minutes added**, and treat exceeding it as a signal to
shard or trim.

**Fresh build in CI vs. live published app**

| Target                              | Pros                                                                                                                                                 | Cons                                                                                                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fresh build in CI (**recommended**) | Tests the exact commit; blocks a bad merge _before_ deploy; hermetic; no dependence on Lovable deploy timing; no risk of testing a stale deployment. | Does not exercise the real CDN/edge/deploy path or real production env vars.                                                                                     |
| Live published app                  | Exercises the true production environment, real domain, real SSR edge runtime, real Supabase config (redirect URLs, SMTP).                           | Tests whatever is deployed, not the commit being pushed — a race; failures are unattributable; writes real data to the production Supabase; cannot gate a merge. |

**Ruling:** CI on push to `main` runs against the **fresh build**. The live app is checked by a
separate, manually triggered (or scheduled post-deploy) smoke run with a small read-only subset —
kept explicitly out of the merge gate. Note that the CI build still talks to the _real external
Supabase_ (there is no local Supabase in this project), which is exactly why §3 and §5 matter.

---

## 3. The auth/email problem

CI has no inbox, and (per INC-010b) the current sender is the Resend test domain, which only
delivers to the account owner. Email delivery therefore **cannot** be in the CI gate.

**Pattern: pre-confirmed test users minted via the Supabase Admin API, then deleted.**

- A global setup step (Playwright `globalSetup`, running in Node on the CI runner only) creates a
  service-role client and calls `auth.admin.createUser({ email, password, email_confirm: true })`.
  `email_confirm: true` marks the address confirmed at creation — no link, no inbox.
- The email is namespaced and unique per run, e.g. `e2e+<run_id>-<n>@ethio-e2e.invalid` (or a
  dedicated non-deliverable subdomain we own). Never a real user address.
- The `handle_new_user` trigger fires normally, so `user_directory` + `profiles` rows are created
  exactly as in production — post-confirmation state is genuinely representative.
- Tests then sign in through the **real UI** (`/auth`, email + password) — no session injection —
  so the sign-in form, session establishment, header state, and sign-out are all really exercised.
  Optionally, a `storageState` file captured once can skip re-login in later tests for speed.
- **Cleanup:** `globalTeardown` calls `auth.admin.deleteUser(id)` for every user created this run.
  `profiles`/`user_directory` cascade from `auth.users` on delete. Belt-and-braces: a periodic
  sweep that deletes any `auth.users` row whose email matches the `e2e+%@ethio-e2e.invalid` pattern
  and is older than 24h, so a cancelled/crashed run leaves no residue.

**What stays outside CI:** the delivery hop itself — Supabase → SMTP provider → inbox → link click
→ `/auth/callback`. That is a manual/staging check, and it is already the tracked custom-SMTP-domain
launch-gate item (INC-010b). The callback's _link-handling logic_ can still be tested in CI by
navigating to `/auth/callback` with synthetic query/hash params (error params, `token_hash`,
garbage) and asserting the three documented outcomes — everything except a genuinely emailed token.

---

## 4. What E2E can and cannot cover

**(a) Link routing / navigation — YES.** Click a real link, assert `page.url()` and a landing-page
role/heading. Also catches the class of bug we already hit (header "Sign in" landing in the wrong
mode) and flat-routing nesting mistakes (`auth_.callback`). Direct-navigation + reload assertions
prove SSR serves the route, not just the client router.

**(b) Mobile-first at 360px — YES, partially.** A Playwright project with
`viewport: { width: 360, height: 740 }` runs the whole suite at phone width. Assertable
mechanically: **no horizontal overflow** (`document.documentElement.scrollWidth <= clientWidth`),
**touch-target size** (bounding box ≥ 44×44 for primary actions), element visibility, and that
nothing depends on hover. Not assertable: whether the layout _looks_ right.

**(c) Multilingual — YES.** Click the language switcher, wait for the lazy Amharic bundle, assert a
specific Amharic string is rendered, and assert `<html lang>` flipped. Stronger still: assert
against the value read from the locale file rather than a literal, so the test tracks the source of
truth. A scan for untranslated leftovers (raw keys like `auth.signIn` visible in the DOM) is also
mechanical. The CI string-scanner already covers the static side; E2E covers the runtime side.

**(d) Functional flow integrity — YES.** Sign in → header shows the display name → navigate →
sign out → header returns to signed-out state. Real database, real RLS, real session. This is the
highest-value category and the main reason to build the harness.

**(e) LIMITS — stays manual, plainly:**

- **Visual "does it look good."** E2E asserts structure, not taste. Screenshot/visual-regression
  diffing can catch _unintended change_ but never judges quality, and it is notoriously flaky
  across font rendering on CI runners — not recommended for the gate.
- **iOS Safari quirks.** The exact class of bug behind the INC-005 fix (suspended background tabs,
  stale client memory, bfcache) is **not reproducible** in headless Chromium, and only partially in
  Playwright's WebKit — which is not Safari on a real iPhone. Real-device checks stay manual.
- **Real email delivery.** Out of scope for CI by design (§3).
- **Real production environment.** The CI build is not the deployed edge runtime (§2).
- **Performance/data-cost budgets, accessibility judgment, Amharic typography correctness.** Some
  a11y checks can be automated later (axe), but reading quality in Ge'ez script stays human.

---

## 5. Test data & secrets

Secrets CI would need, all as **GitHub Actions repository secrets — never in the repo, never in a
committed `.env`, never printed to logs** (law F1):

| Secret                          | Why                                               | Exposure                                                                                                                                                   |
| ------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SUPABASE_URL`                  | Target project                                    | Non-secret in practice, but keep it a CI variable                                                                                                          |
| `SUPABASE_PUBLISHABLE_KEY`      | Build-time client key                             | Publishable — safe                                                                                                                                         |
| `E2E_SUPABASE_SERVICE_ROLE_KEY` | Admin API: create/delete pre-confirmed test users | **Highest sensitivity.** Used only in `globalSetup`/`globalTeardown`, never in browser context, never in a test file that could log it. Masked by Actions. |
| `E2E_USER_PASSWORD`             | Password for minted test users                    | Generated per run is better than a stored constant                                                                                                         |

Isolation rules:

- Test emails live in one reserved namespace (`e2e+<run>@ethio-e2e.invalid`) so they are
  identifiable, un-deliverable, and sweepable.
- Every test user is created and destroyed inside a single run. No shared long-lived fixture user.
- Tests must never mutate rows they did not create. Any future listing/feed tests scope to
  test-owned rows and delete them in teardown.
- **Open risk to decide before building:** the CI run writes to the _production_ Supabase project,
  because there is no separate environment today. Two mitigations, in order of preference:
  (1) stand up a dedicated `ethio-staging` Supabase project for CI and point the E2E job at it;
  (2) accept production writes but confine them to the reserved namespace with guaranteed teardown.
  Option (1) is the correct long-term answer and should be a named prerequisite task.

---

## 6. Proposed decision rule (freeze before building)

**First test — one spec, `e2e/smoke-auth-i18n.spec.ts`, run in two viewport projects (360×740 and 1280×800):**

1. `globalSetup` mints a pre-confirmed user via the Admin API.
2. Navigate to `/` and assert the placeholder heading renders from server HTML.
3. Navigate to `/auth`; assert the **sign-in** form renders (not create-account) — the BUG 2c regression guard.
4. Sign in with the pre-confirmed credentials through the real form.
5. Assert the header shows the signed-in state with the user's display name.
6. Switch language to Amharic; assert a specific Amharic string from `am.ts` is rendered and `<html lang="am">`.
7. Assert **no horizontal overflow** at 360px (`scrollWidth <= clientWidth`) on `/` and `/auth`.
8. Sign out; assert the header returns to the signed-out state.
9. `globalTeardown` deletes the test user; a follow-up assertion confirms deletion.

**Pass bar — the harness is accepted only if ALL of the following hold:**

- The spec passes in GitHub Actions on push to `main`, in **both** viewport projects.
- Total added CI wall-clock is **under 5 minutes** (with the browser cache warm).
- **Zero flakes across 3 consecutive runs** on the same commit, with Playwright `retries: 0` for the
  acceptance measurement (retries may be enabled afterwards, but a green-only-with-retries harness
  fails this bar).
- No secret value appears in any log or artifact.
- Teardown leaves **zero** residual `e2e+%` users — verified by a direct query after the run.
- `bun run format:check`, `eslint`, `typecheck`, the migration guard, and the hardcoded-string scan
  all remain green with the harness in place (law H2 — no new known-error debt).

**Rejection triggers:** any flake in the 3-run window that is not attributable to a genuine app bug;
added runtime over 5 minutes; or a need to weaken an existing CI gate to accommodate the harness.

**Named prerequisite before the proof task:** decide the §5 open risk — dedicated staging Supabase
project versus namespaced writes against production. The harness should not be built until that is
ruled.
