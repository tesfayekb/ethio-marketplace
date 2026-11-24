# Account overview

Route: `/account`.

The Account panel opens on a responsive overview built with `PageShell wide`,
`PageHeader`, `ContentGrid`, and `Section`. The route uses the same D20 guard as
posting: a signed-out visitor is redirected before load to
`/auth?return=/account`, then returned after sign-in.

The profile card reads the signed-in user's existing RLS-protected profile row
and auth creation date. The listings card reads the owner's listing statuses
through the existing `seller_id = auth.uid()` policy and counts them locally.
Later word (bundle 16 turn 2, INC-469): the listings card reads the counts of
the six My listings groups from `my_listings`, shows the groups that hold ads
with the page's own words, and opens `/my-listings` (docs/features/my-listings.md).
Profile editing links to Settings; posting and sign-in security are quick
actions. The Account breadcrumb is `Home › Account`.

No owner read currently exists for saved listings or a notification feed. No
schema change is allowed in LAYOUT-1, so those cards render translated honest
empty captions rather than invented counts.

## Reading the list (INC-459)

The list is read whole, page by page, by key (`readAllPages`), and names are ordered by the one pinned collator (src/lib/name-collator.ts).

## The status read and the session store (cursor bundle 5; INC-1247, INC-1264, INC-1266)

Who is signed in comes from the shell's one session store, `useShell()` (fed by the single `useAuth()` call in `app-shell.tsx`): the nine screens that used to call `useAuth()` themselves read the store, and CF-SESSION-5 (scripts/conformance/session-reads.test.ts) fails a tenth.

The account's own status (display name and `account_status`) is read by `readAccountStatus` (src/features/auth/account-status.ts): the auth listener waits one macrotask, the session is read through the door (`currentSession`, its `failed` read), and no session means no read. A failed read keeps the person signed in and is named through `reportOnDemandFailure("the account's status", error)`, which offers the page's Refresh; it is never an account taken for active. Because `use-auth.ts` sits on every page's first download, this module imports nothing from `@/lib/reader-failure` (INC-1266): its `failed` answer carries the error as it arrived. Proofs: ACS-U5, ACS-U6 (use-auth.test.tsx), ACS-U7 (account-status.test.ts).

**An ended sign-in is said as ended (cursor bundle 6; INC-1274).** An auth action whose failed call says the session is gone — the client's missing-session error, `session_not_found`, `session_expired`, `refresh_token_not_found` or `refresh_token_already_used` (`sessionGone`, src/features/auth/session-end.ts; the codes read from the auth server's and auth-js's source) — answers `session.expired`, never "Something went wrong", and reports the end to the shell (`reportUnauthorised`), whose one verdict signs the page out with the sign-in-ended notice. Every action of `auth-service.ts` and the two-factor service (`mfa-service.ts`) reads its failure through `failure()`; the password change's proof asks the server for the user first, and a signed-in shell holding no user there is the same end (`reportSessionMissing`). A stored session removed by another tab raises no auth event in this one; the door's storage listener tells the shell (`onStoredSessionRemoved`), which ends the page's session once. Proofs: ACS-U8..U11, MSV-10, SEN-8, SBD-23; browser: ACS-E5 and ACS-E5b (`e2e/settings.spec.ts`).

**One listener for the sign-in events (INC-1268).** `useAuth()` is the only caller of `onAuthChange` (CF-SESSION-7). The language provider sits above the shell and subscribes to nothing: the shell writes who is signed in into it (`useAuthIdentityWriter`, src/i18n/i18n-context.ts) — `settled` once the session is known, `userId` the signed-in identity — and a 3-second watchdog lets the language reads proceed when no shell writes. The sign-in page's check-your-email view reads the same store through `useShell()`. Proofs: ILA-6, KAU-12.
