# Account overview

Route: `/account`.

The Account panel opens on a responsive overview built with `PageShell wide`,
`PageHeader`, `ContentGrid`, and `Section`. The route uses the same D20 guard as
posting: a signed-out visitor is redirected before load to
`/auth?return=/account`, then returned after sign-in.

The profile card reads the signed-in user's existing RLS-protected profile row
and auth creation date. The listings card reads the owner's listing statuses
through the existing `seller_id = auth.uid()` policy and counts them locally.
Profile editing links to Settings; posting and sign-in security are quick
actions. The Account breadcrumb is `Home › Account`.

No owner read currently exists for saved listings or a notification feed. No
schema change is allowed in LAYOUT-1, so those cards render translated honest
empty captions rather than invented counts.
