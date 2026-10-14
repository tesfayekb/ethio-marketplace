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
