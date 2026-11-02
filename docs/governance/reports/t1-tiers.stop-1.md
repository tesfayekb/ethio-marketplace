MIGRATION — t1-tiers part B: the staff tier door (M1)
DONE: parts C, D, E, A; part B step M1 (file written, not applied)
LEFT: part B (M2 — `transition_listing` clears the tier on removal; the control, its strings and
e2e), THE CHECKS, THE BROWSER CHECK, THE SELF-REVIEW, THE REPORT
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `e5e191c638b1cc0aa11faeb7c7577680e752503f` (short `e5e191c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-02T04:21:14Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41386156268
FILES:
docs/_changelog.md
docs/features/design-foundation.md
docs/governance/briefs/t1-tiers.md
docs/governance/briefs/t1-tiers.ruling-1.md
docs/governance/mechanisms.md
e2e/press.spec.ts
e2e/sage-ad-page.spec.ts
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/conformance/card-tiers.test.ts
scripts/conformance/notice-dock.test.ts
scripts/conformance/press.test.ts
scripts/public-surface-allowlist.txt
src/components/shell/panel-header.tsx
src/features/admin-listings/listing-page.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/my-listings/my-listing-page.tsx
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail-tier.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-review.test.tsx
src/features/posting/step-review.tsx
src/features/posting/use-draft.ts
src/features/posting/use-edit-draft.ts
src/features/posting/wizard.tsx
src/i18n/locales/am-base.ts
src/lib/press.test.ts
src/lib/press.ts
src/routes/settings.tsx
supabase/migrations/20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql

## The file

- `supabase/migrations/20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql` — 15499 bytes,
  sha256 `348c91f788f47247fb31a236488d568f2c40b52f2f9f9ff04b93ac5b1708d172`.
- Mark `20261102200000` (ruling 1, answer 7: the filename stamp 20261102045918 is earlier than the
  mark, so the mark stands). Self-mark in the file, last statement.
- `origin/dev` is still `e5e191c6` (the base); no file in scope moved.

## What it creates

- `public.admin_set_listing_tier(p_listing_id uuid, p_tier text, p_reason text, p_note text
  DEFAULT NULL) RETURNS jsonb` — plpgsql, VOLATILE, SECURITY DEFINER, `search_path = public`.
  `REVOKE ALL … FROM PUBLIC, anon`; `GRANT EXECUTE … TO authenticated, service_role`. No table, no
  column, no trigger, no change to any existing function.
- Order inside (the staff listing doors' shape, INC-951 3b, as `admin_move_listing`): not signed
  in → `listings:enforce` (`permission denied`) → deactivated → the `staff_moderation` dial
  (`rateLimited`) → tier among premium, featured, regular (`unknown tier`) → the row `FOR UPDATE`,
  absent or a draft (`listing not found`) → the caller's own (`your own listing is changed the
  seller's way`) → removed (`a removed listing takes no tier`) → same tier (`nothing changed`) →
  reason among promotion, promotion_ended, other (`unknown reason`) → other without a note (`a note
  is required`) → a note over 500 characters (`the note is too long`) →
  `require_step_up_if_needed('listings','enforce')` → the write.
- The write: `listings.tier`; one `listing_revisions` row (kind `edit`, before `{"tier": old}`,
  after `{"tier": new}`, the actor); one `audit_log` row (`listing.admin_tier`, entity `listing`,
  meta `from`, `to`, `reason`, `note` with nulls stripped). Answer `{ok, from, to}`. No seller
  notice (ruling 1, answer 5). The feed index follows through the existing
  `feed_index_on_listing_update` trigger (no change to it).
- Departure from the plan, named: the plan placed the dial after the second factor. The file puts
  it where every staff listing door does (after the authority checks, before the door's rules),
  and the second factor after the rules, as `admin_move_listing` asks it. A refusal raises, so the
  dial's count rolls back with it (INC-844) — the proof's (g) counts on that.

## The proof (one sentinel block, scratch rows only, rolled back whole)

- (a) the header and the grants: SECURITY DEFINER, VOLATILE, `{search_path=public}`; no PUBLIC
  grantee, anon cannot execute, authenticated and service_role can; `listings:enforce` asks a
  second factor.
- (b) a scratch super admin with a scratch aal2 session, verified totp factor and totp amr sets an
  active scratch listing to Premium (reason promotion): the answer `{ok, from regular, to
  premium}`; the tier; exactly one revision with exactly that before and after; exactly one audit
  row with exactly that meta; the listing's feed-index rows exist, every one at rank 2.
- (c) a scratch user without `listings:enforce` → `permission denied`.
- (d) a removed listing → `a removed listing takes no tier`; a draft → `listing not found`.
- (e) `gold` → `unknown tier`; Premium again → `nothing changed`; reason `rules` → `unknown
  reason`; `other` with a blank note → `a note is required`.
- (f) the same super admin on an aal1 session → SQLSTATE `P0009` (the step-up refusal).
- After (c)–(f): the three tiers unchanged, still one revision and one audit row in all.
- (g) with the dial's override at 2: the second success (Regular, promotion_ended) answers `{ok,
  from premium, to regular}`; the third call → `rateLimited`; two revisions, two audit rows, tier
  regular, feed rank 0.
- Scratch rows: three `auth.users` (tag `e2e-t1-m1-<8 hex>`), a super_admin role row, an auth
  session, factor and amr claim, a `rate_overrides` row, a category and three listings. The only
  real row read is the first country code by order (for `home_country_code`), as the earlier
  listing proofs do.

## The guards (`bash scripts/check-migrations.sh`, this tree)

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```

- `scripts/public-surface-allowlist.txt` gains `admin_set_listing_tier | authenticated | …`.
- `scripts/acceptance-doors-allowlist.txt` gains `admin_set_listing_tier(uuid,text,text,text) |
  staff | …` (ruling 1, answer 6). The acceptance-doors guard runs against CI's temporary backend.
- Laws (`bunx vitest run scripts --maxWorkers=2`): 429 passed, 1 failed — NH-6, the macOS-only
  limit (its `date` ignores `TZDIR`), unchanged from parts C–A; CI is its proof.
- Expected after the merge until the file is applied: STAGING BEHIND for this file's mark.

apply cf2b45c5 → expect mark 20261102200000

Next after `continue`: M2 (`transition_listing` redeclared whole, `tier = 'regular'` on its two
removed updates, the md5 of its body with those insertions stripped pasted in stop 2), then stop.
