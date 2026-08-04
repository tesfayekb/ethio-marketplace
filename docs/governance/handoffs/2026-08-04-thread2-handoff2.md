# HANDOFF — ethio.com — 2026-08-04 — Thread 2 continuation (PHASE 1 CLOSED; Phase 2 spec NOT STARTED)

> HANDOFF IDENTITY (for disambiguation as more accumulate):
>
> - Handoff #: 3
> - Date: 2026-08-04
> - Author thread: "Thread 2 continuation" (P1-d through the Phase 1 gate)
> - Repo HEAD at handoff: to be RE-VERIFIED by fresh clone — do not trust any SHA quoted from chat.
> - Phase: Phase 1 (Identity) **CLOSED** 2026-08-04. Phase 2 (marketplace core) spec **NOT STARTED**.
> - Predecessors: handoff #1 (2026-08-01), handoff #2 (2026-08-03), both in this folder.

## 0. HOW TO USE THIS HANDOFF (successor thread, read first)

This handoff ACCELERATES orientation; it does NOT replace the §2 session-start ritual. Do the ritual FIRST:

1. `cd /tmp && rm -rf ethio && git clone https://github.com/tesfayekb/ethio-marketplace.git ethio`
2. Read: `docs/governance/system-state.md` → handoffs #1, #2, THIS one → tail of `docs/spec/spec-ledger.md` session log → tail of `docs/_changelog.md` → `git log --oneline -10`.
3. State to the operator: HEAD SHA, current phase, last closed step, next planned step — and ask for confirmation before proceeding.

The repo is authoritative. Chat memory is advisory. If this handoff and the repo disagree, the repo wins (and note the discrepancy).

## 1. WHAT CLOSED SINCE HANDOFF #2

### P1-d — Google door (closed 2026-08-03)

Supabase Google provider, minimal scopes only (`email`, `profile`, `openid`), Turnstile seam threaded (DEC-010). E2E G-1 intercepts OUR first authorization hop (not Supabase's redirect to Google) and asserts provider, redirect target and exact scope set; G-2 is the presence guard. Manual REQ-015 linking evidence recorded in `docs/features/auth-google-door.md`: **D-8** and **D-10** executed against prod; **D-9** deferred-named. The load-bearing finding is GoTrue's **replace-and-neutralize** behaviour on the email identity — signing in with Google against an existing verified email account replaces the identity relationship rather than adding a parallel one, which is precisely what later forced the truth model.

### INC-022 — country truth (closed 2026-08-03)

A census (not an assumption) found `handle_new_user()` fabricating `'US'` as a home-country sentinel for every signup. Migration corrects the function to `NULL` + `country_source = 'unknown'` and repairs the already-fabricated rows. This was the largest defect of the phase and it was found by census-before-build, not by testing.

### P1-f — settings surface (closed 2026-08-03)

Identity summary, sign-in methods list, server-enforced last-method guard, password change, email change, sign-out-other-devices. Deny tests **U-1** (server refuses unlinking the last identity), **U-2** (unlink/relink round trip), **U-3** — which found the **ghost door**: unlinking the `email` identity left `auth.users.encrypted_password` alive, i.e. a credential nothing displayed and nobody could manage. Fixed as **INC-024**: a trigger on `auth.identities` nulls the password when the email identity is removed, verified by `scripts/deny-tests/p1f-identity-unlink.ts --recheck` on both databases.

### P1-g — the Phase 1 gate (closed 2026-08-04)

- **Prod RLS/ACL re-proof**: signed out, `countries` reads and everything personal refuses (401/42501, functions included); signed in, cross-user reads return 0 rows and no UPDATE/DELETE grant exists on `profiles` at all.
- **Dependency-audit gate debut**: landed as an enforcing CI job that distinguishes clean / findings / *advisory service unreachable* (law F4). It failed on its first run against 8 real high findings — a gate proving itself — then went clean after same-major `overrides` on `brace-expansion` (pinned inside 1.x on purpose; a flat floor pulls 5.x and breaks `minimatch@3`/eslint), `postcss` and `js-yaml`. INC-025.
- **Recovery + truth model (R2)**: `public.has_password()` / `public.remove_own_password()`, the `/auth` forgot view and `/auth/reset` landing, reset request **neutral-always** (R4, B-3 class). E2E R-2, R-3, S-4.
- **R1 — staging sink moved Mailtrap → Ethereal**.
- **Probe retirement**: the recovery-identity probe workflow and script are deleted; its census question is answered and the invariant is now continuously guarded by E2E R-2/S-4. `E2E_SUPABASE_DB_URL` is dead — operator deletion item.
- **Fixture regeneration**: `c4-arbitrary-recipient.patch` still applies clean; `b3-enumeration.patch` regenerated against the moved auth surface, same mutation intent.

## 2. THE TRUTH MODEL, STATED PLAINLY (successor: internalize this)

**Sign-in methods = the password if one exists + the OAuth identities that exist.** Not "the identity rows." Identities alone were never the whole truth: GoTrue can hold a password with no `email` identity row, and can neutralize an identity while the credential survives. So the settings list asks `has_password()` directly and renders the password as its **own row**, and `remove_own_password()` can remove it — refusing only when it is the last way in. The ghost door was never "a password without an identity"; it was "a credential nothing displays and nobody can manage." The truth model closes that class by construction.

## 3. THE THREE STANDING READS (every session, every gate)

1. `docs/tracking/ci-status.md` — **two-step SHA check**: read the verdict, then confirm its commit equals the HEAD you cloned. A stale SHA proves nothing about current code.
2. `docs/tracking/nightly-status.md` — **48h staleness rule**: older than ~48 hours means the schedule stopped, which is a failure in itself.
3. **Guard Proof** — dispatched and green at every phase gate; it proves the guards FAIL against mutation fixtures, not merely that they pass.

## 4. ENVIRONMENT FACTS

- Staging E2E mail sink: **Ethereal** (R1), gated by `E2E_EMAIL_SINK=1`. **WATCH: Ethereal accounts are ephemeral** — if staging E2E mail fails unexpectedly, re-create the Ethereal credentials before diagnosing anything else.
- Production SMTP: Resend **test** domain until the launch-gate custom domain lands; only the owner's address completes a real send.
- **BOTH service-role keys are rotation-listed** at the launch gate: ethio-staging (in GitHub Actions) and ethio-prod (in the Lovable secret store).
- Databases: `ethio-prod` (real), `ethio-staging` (E2E target).

## 5. SUPERVISOR LESSONS CARRIED FORWARD

- **Traces before hypotheses.** Every defect this phase was closed by evidence — instrumented callbacks, admin-API scripts, JSON-parsed Playwright results — and every hour lost was lost to reasoning ahead of a trace.
- **UI-inferred server behaviour was wrong every time it was tried.** A disabled button, a rendered list, a success toast: none of them are authorization or state. Ask the server (law F3).
- **Census before build** caught the biggest defect of the phase (INC-022). Read the live schema and the live rows; never assume the migration you remember is the migration that ran.
- **Operator-bandwidth discipline (G17)** is the operating norm: batch operator actions, number them, never send a re-test without "publish first."

## 6. OPEN QUESTIONS AND OWNERS

**None blocking.** The sole next action is the **Phase 2 Pass-2 spec** (marketplace core: listings, categories, geography per the GEO pre-decision, feed) — supervisor-authored, operator-approved, in a new thread per the pipelined model.

Operator checklist still outstanding (non-blocking): delete the dead `E2E_SUPABASE_DB_URL` secret; keep the launch-gate list in `docs/governance/launch-gate.md` under review as Phase 2 adds surfaces.

--- END HANDOFF #3 (2026-08-04) ---
