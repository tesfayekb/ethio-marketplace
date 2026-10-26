# Foundations — turn 34c-5: completion report

Brief: `docs/governance/briefs/foundations-turn-34c-5.md`, sha256 `e5000c6d3eda790ff0cd68d48ef118ade02464a17afe0435906d8d4978a880a0`, 56420 bytes (matches).

## 1. Done by part

- Part A: done. HEAD `6b3a461d205dbe224a7071e9e639b700f7f8f9d9` = BASE (<START>).
- STEP 0: done.
- Part B: done; red first as specified.
- Part C (C1–C4): done; every block copied by script.
- Part D: done.
- THE CHECKS, THE END-TO-END CHECK, the reviewer: done.

## 2. Files (`git diff --name-only <START>`)

AGENTS.md, docs/_changelog.md, docs/governance/briefs/foundations-turn-34c-5.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-34c-5.report.md, roadmap.md, scripts/conformance/session-reads-allowlist.txt, scripts/conformance/session-reads.test.ts, scripts/conformance/vendor-seams-allowlist.txt, src/features/account/account-overview.tsx, src/features/auth/auth-client.test.ts, src/features/auth/auth-service.ts, src/features/auth/mfa/mfa-service.ts, src/features/posting/posting-service.ts, src/features/posting/pricing-data.test.ts, src/features/posting/pricing-data.ts, src/routes/settings.tsx, src/test/settings-messages.test.tsx.

## 3. CI (A1)

ci-status.md, first six lines:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `83badbbaa0fb59ee1485ccfcc173d61a162907ed` (short `83badbb`)
- Conclusion: **CANCELLED**
- Completed (UTC): 2026-10-26T21:22:50Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40400996498
```

The run on turn 34c-3's landing was cancelled, not failed. guards-last-failure.md for that run says "No failed build/guard jobs in this run." e2e-last-failure.md: `last E2E run 40392505916 passed`. Run 40403849904 on BASE was not yet published. No red was named, so nothing was fixed.

## 4. Behaviour contract, before → after (failed read only; a successful read is unchanged)

- **posting-service.ts**, readLastListingPlaces / readLastListingContact / readSellerLine / readSellerIdentity: failed read was "nobody signed in" → `signedInSellerId()` throws a ReaderError. readLastListingPlaces still answers null, now logged with `[post-where]`. readSellerIdentity no longer makes a `getUser()` server round trip.
- **pricing-data.ts** signedInId: failed read was "nobody signed in" → no prefill (new pricing test).
- **mfa-service.ts** isStepUpFresh: failed read → not fresh.
- **account-overview.tsx**: member since from the session; a failed read shows the load error. No `getUser()` round trip.
- **settings.tsx**: member since from the session; a failed read shows no member-since. Settings left the vendor-seams allowlist.
- **auth-service.ts**:
  - The commit poll treats a failed read as not committed yet, and the unused client parameter is gone.
  - `rehydrate` throws a failed read, so the screen answers "unavailable".
  - The verification landing answers `{ ok: false, unavailable: true }` (ASC-9).
  - The reset answers `auth.errorGeneric`, never `auth.errorResetLinkInvalid` (ASC-8).
  - currentPasswordProof keeps its `getUser()` (DEC-274, allowlist line).

## 5. Red first (B3, on BASE)

```
× ASC-8 a reset whose recovery session could not be read is not a dead link: the person tries again (INC-933)
× ASC-9 a verification landing whose session could not be read is unavailable, never a failed link (INC-933)
× CF-SESSION-3 nothing in the browser tree reads the session or the user around the door but its allowlist lines (INC-933)
AssertionError: expected 'src/features/account/account-overview…' to be '' // Object.is equality
AssertionError: expected { ok: false, …(1) } to deeply equal { ok: false, …(1) }
AssertionError: expected { ok: false, hadError: false } to deeply equal { ok: false, unavailable: true }
Tests  3 failed | 10 passed (13)
```

## 6. THE CHECKS

- Hash list `sha256sum -c`: all 15 OK.
- `git diff <START> --stat -- src/integrations supabase e2e`: empty.
- build-errors.log: `build OK`.
- `bun run lint`: `✖ 39 problems (0 errors, 39 warnings)`.
- C4 run: `Test Files 98 passed (98)`, `Tests 641 passed (641)`.
- `bun run test:unit`: `Test Files 324 passed (324)`, `Tests 1991 passed | 1 skipped (1992)`. No known-limit timeout fired this run.
- `bun run i18n:usage` then `git diff <START> --stat -- docs/generated public`: empty.
- `i18n:map-guard`: maps match.
- `check-hardcoded-strings.sh`: `findings: 0`.
- `bun run format:check`: run last, clean.

## 7. THE END-TO-END CHECK

(`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome`; both projects, fake mode, 0 retries.)

- e2e/auth-reset.spec.ts + e2e/auth-callback.spec.ts: `10 passed (32.1s)`; `[ssr-error]` 0.
- e2e/mfa-stepup.spec.ts + e2e/settings.spec.ts: `27 passed (2.0m)`; `[ssr-error]` 0.

## 8. K2 (who is signed in, read from somewhere other than the door)

These are listed only; none were changed.

- `useAuth()` user objects held by a screen, not a fresh read: src/components/app-shell.tsx:125, src/routes/settings.tsx:105, src/routes/l.$slug.tsx:102, src/features/posting/wizard.tsx:214, src/features/admin-listings/listings-page.tsx:114, src/features/admin-listings/listing-page.tsx:128. These are display-time state fed by use-auth, which itself reads the door.
- src/i18n/provider.tsx:279 reads `session?.user?.id` from the door's auth-change callback session.
- src/features/session/session-policy.ts:116 decodes the JWT payload (`atob`) for the session clocks' timing, not for identity.

## 9. Migrations and strings

None, none.

## 10. Reviewer

Verdict: READY. Each failed read now maps to the typed answer the brief names. Successful reads keep their old answers, and `user.created_at` and `user.id` are present on the session's user. In completeEmailVerification, the `!session &&` guard was removed safely: an earlier session already returned `{ ok: true }`, so reaching that line means no session was found.

MINOR: Account now waits for the local session read before starting its two server reads, as DEC-274's note decides. The read is local, so the delay is negligible.

No BLOCKER, no MAJOR.

## 11. Departures

None.

## 12. Limits

The harness runs builds and typechecks. CI on the final commit is the full proof. Run 40403849904 had not been published when the turn started.
