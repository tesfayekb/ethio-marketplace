# Auth-door E2E tests

Regression guards for everything the P1-c email door hardened. Tests only — no
app behaviour is changed by this suite.

## Case inventory

| ID  | Behaviour guarded                                                | Spec file                        |
| --- | ---------------------------------------------------------------- | -------------------------------- |
| A-1 | Sign-up reaches check-email and echoes the captured address      | `e2e/auth-signup.spec.ts`        |
| A-2 | Resend throttle engages (disabled control + cooldown copy)       | `e2e/auth-signup.spec.ts`        |
| A-3 | Per-visit resend limit (3) is reached and further sends refused  | `e2e/auth-signup.spec.ts`        |
| B-1 | Wrong password: error shown, no session                          | `e2e/auth-signin-errors.spec.ts` |
| B-2 | Unknown email: error shown, no session                           | `e2e/auth-signin-errors.spec.ts` |
| B-3 | Enumeration indistinguishability (identical text + controls)     | `e2e/auth-signin-errors.spec.ts` |
| B-4 | Unconfirmed account cannot sign in                               | `e2e/auth-signin-errors.spec.ts` |
| C-1 | A fresh confirmation link signs the user in                      | `e2e/auth-callback.spec.ts`      |
| C-2 | A replayed link fails honestly (no fabricated success)           | `e2e/auth-callback.spec.ts`      |
| C-3 | Already-confirmed user gets the honest already-confirmed surface | `e2e/auth-callback.spec.ts`      |
| C-4 | INC-010a: no arbitrary-recipient resend on the callback surface  | `e2e/auth-callback.spec.ts`      |

All assertions read the `en` locale catalog; no English literals are hard-coded
in the specs (translation law D1 applies to tests too).

## Mail sink for sign-up cases (A-1..A-3)

A-1..A-3 now run when the E2E job receives `E2E_EMAIL_SINK=1` (set as a repository variable). ethio-staging SMTP is configured to use a Mailtrap sandbox inbox, which accepts any recipient and delivers to no real mailbox; the staging email rate limit has been raised to 100/hr to cover repeated runs. Email CONTENT assertions (template correctness, Amharic translation of auth emails) are NOT yet covered and are a separate future decision — the sink makes them possible, but this task does not implement them.

**Sink status: CONFIRMED WORKING (2026-08-02, run 30732211479).** A-1 passed against
the real sign-up path and Mailtrap received genuine confirmation emails with a
functioning confirm link.

## Virtual-clock constraint (INC-015)

`page.clock.install()` must NOT be active while a Supabase request is in flight: it
freezes the timers supabase-js relies on, so the request never completes and the UI
shows no email, no cooldown, and no error. A-3 therefore completes sign-up on real
timers, installs the clock only after the check-email view is visible, and advances
the cooldown with `page.clock.fastForward()` (which skips time without running the
intervening timer callbacks) rather than `runFor()`.

## Open failure: A-2 (INC-016)

A-2's sign-up (-102) produced no email and no check-email view in the same run where
the identical A-1 path passed. A rate limiter is ruled out — the later -103 send
succeeded. Cause UNKNOWN, under investigation. Diagnostic assertions now surface the
app's own rendered error text (`role="alert"`) immediately after each sign-up submit
in this file, so the next run self-reports. A-2 remains a Phase 1 gate blocker.

## Viewport scoping

`playwright.config.ts` keeps both projects. The `desktop-1280` project carries a
`testIgnore` for the three new specs, so:

- `smoke-auth-i18n.spec.ts` — both viewports (layout/overflow is viewport-sensitive).
- `auth-signup`, `auth-signin-errors`, `auth-callback` — `mobile-360` only.

Rationale (operator ruling 2026-08-02): these are logic and error-path cases, not
layout cases. Running them twice doubles runtime and doubles the Supabase auth
calls without adding information.

## Resend throttle: UI-level assertion only

A-2 and A-3 assert the throttle where the user meets it — the control becomes
disabled and the cooldown copy renders. There is **no real-clock 60-second wait**
anywhere in the suite. A-3 advances the cooldown with Playwright's virtual clock
(`page.clock.install()` / `runFor`), which is fake-timer time, not wall time.

## Teardown contract: namespace sweep

`e2e/global-teardown.ts` no longer deletes one user. It:

1. Pages through `admin.listUsers()`.
2. Deletes every user whose email starts with `e2e+` **and** ends with
   `@ethio-e2e.invalid` **and** contains the current `runId` (persisted into the
   state file by `global-setup.ts`).
3. Also reaps namespace users older than 24h (orphans from crashed runs).
4. Re-lists and throws if any user from the current run survives.
5. Logs the deleted count.

Hard rule, asserted per user immediately before `deleteUser`: nothing outside the
`@ethio-e2e.invalid` namespace is ever deleted.

## generateLink technique

`e2e/helpers/users.ts` mints real confirmation links with
`admin.generateLink({ type: 'signup', ..., options: { redirectTo: <baseURL>/auth/callback } })`,
so C-1/C-2 exercise the true implicit-flow callback without any mail delivery.
This depends on the **staging project allow-listing** `<baseURL>/auth/callback`
(default `http://127.0.0.1:4173/auth/callback`) in Auth → URL Configuration. If
that entry is missing, Supabase rewrites the redirect and C-1 fails.

## Proving the guards bite

First CI run (30730144529): **10 of 13 cases GREEN**, including the B-3
enumeration-indistinguishability equality assertion and the C-4 INC-010a
arbitrary-recipient guard. A-1..A-3 did not pass — they are gated behind
`E2E_EMAIL_SINK=1` pending INC-013 (ethio-staging's Resend test domain rejects
non-owner recipients, so real sign-up cannot complete). They remain visible as
skipped in the run output.

The two proof-of-bite checks (temporarily breaking B-3 and C-4 and observing the
failures) are still **OUTSTANDING**; they must be run and their observed failure
messages recorded here before the Phase 1 gate closes.

Expected shapes:

- B-3 — `expect(received).toBe(expected)` on the two error strings.
- C-4 — `expect(locator).toHaveCount(0)` receiving `1` for `input[type="email"]`.

## Turnstile

Turnstile test-keys and the bot-defence cases land with P1-d (DEC-010); they are
deliberately absent here.
