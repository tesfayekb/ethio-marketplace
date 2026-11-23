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
