# Listings (core + lifecycle + the screening seam)

Phase 2, feature P2-c. Schema, seam functions, private photo bucket, and a CI
bypass guard. **No `src/` code this task** — the post form is a sibling task.

## Tables

### `public.listings` — the central marketplace object (REQ-019)

| Column                  | Notes                                                       |
| ----------------------- | ----------------------------------------------------------- |
| id                      | uuid PK — the rateable-interaction anchor (REQ-011)         |
| seller_id               | uuid → `auth.users(id)`                                     |
| category_id             | uuid → `public.categories(id)`                              |
| location_id             | uuid → `public.locations(id)`                               |
| title / description     | text                                                        |
| attributes              | jsonb, validated against `category_attributes` (REQ-024)    |
| price_amount            | numeric(12,2) — never float (Rule E4); NULL allowed         |
| price_currency          | char(3); NULL iff `price_amount` is NULL                    |
| price_mode              | fixed / negotiable / free / contact (REQ-018)               |
| status                  | draft / active / expired / sold / removed (REQ-022)         |
| home_country_code       | char(2) → `countries.code` — partition seam (REQ-012)       |
| published_at            | set on first draft→active; feed recency (REQ-023)           |
| expires_at              | computed from `categories.expiry_days` at publish (REQ-022) |
| created_at / updated_at | timestamptz UTC; `updated_at` maintained by trigger         |

CHECKs: `(price_amount IS NULL) = (price_currency IS NULL)`;
`price_mode = 'free'` implies no amount; enumerated `price_mode` and `status`.

Indexes: partial `(status) WHERE status='active'`, `(seller_id)`,
`(category_id)`, `(location_id)`, `(published_at DESC)`, `(home_country_code)`.

### `public.listing_photos`

`id`, `listing_id` (cascade), `storage_path`, `display_order`,
`exif_stripped`, `created_at`. `UNIQUE (listing_id, display_order)`.

**`exif_stripped` is the DEC-009 gate.** A photo uploaded by a seller starts
`false` — raw, potentially carrying GPS/EXIF. It is **stored, not surfaced**.
The P2-c-photos pass ships the EXIF/GPS strip + on-device compress pipeline and
flips the flag to `true`; only then may any display layer show the photo. The
public read policy already enforces this, so a display bug cannot leak a raw
image to the public.

## The state machine (REQ-022)

```text
        ┌──────── renewal (resets expires_at) ────────┐
        │                                             │
        v                                             │
  draft ──> active ──────────────────────────────> active
    │         │  │  │
    │         │  │  └──> sold ──> removed
    │         │  └─────> expired ──> active (relist) | removed
    │         └────────> removed
    └──────────────────> removed
```

`removed` is terminal. Illegal moves (e.g. `sold → active`) are refused by
`transition_listing`.

## The two seam functions — the ONLY write paths

There is **no INSERT/UPDATE/DELETE policy and no write grant** on `listings`.
Deny-by-default at the table; the `SECURITY DEFINER` functions are the gate.

### `public.submit_listing(...) → uuid`

Create or edit. It:

1. asserts `auth.uid() = p_seller_id` (you submit only your own);
2. validates the category and location exist and are active, and the country exists;
3. refuses a price when the category disables pricing (REQ-018);
4. validates `attributes` against `category_attributes` — required keys present,
   `number`/`boolean`/`text`/`select` type conformance, and `select` values
   inside the declared options (see D-017 below);
5. **screening stub** — a marked pass-through where the REQ-021 AI gateway lands
   at P2-d, evaluated _before_ any row is written;
6. computes `expires_at` from the category's `expiry_days` when publishing, and
   sets `published_at` on first draft→active.

It accepts only `draft` or `active`; every other state change goes through
`transition_listing`.

### `public.transition_listing(listing_id, new_status)`

The only status-mutation path. Enforces the state machine above and asserts
caller ownership. `active → active` is a renewal and resets `expires_at`.

**Why one chokepoint (§7, anti-state-scatter):** screening (REQ-021) and the
lifecycle rules exist in exactly one place. Adding screening at P2-d introduces
zero new write paths to audit, and no client can invent a state transition.

Grants: `EXECUTE` to `authenticated` only; revoked from `PUBLIC`/`anon`.

## `public.expire_stale_listings()` — authored, not scheduled

Flips `active → expired` where `expires_at < now()`. Idempotent, safe to run
repeatedly. `EXECUTE` to `service_role` only. **Its schedule (pg_cron or an
external scheduler) is a named follow-up** — nothing calls it yet.

## RLS posture

`listings`:

- `listings_public_read` — SELECT TO `anon, authenticated` USING `status = 'active'`.
- `listings_seller_read` — SELECT TO `authenticated` USING `auth.uid() = seller_id`
  (a seller sees their own drafts, expired and sold rows).
- No write policy, `GRANT SELECT` only.

`listing_photos`:

- `listing_photos_public_read` — `exif_stripped` **and** an active parent listing.
- `listing_photos_seller_read` — the parent listing is the caller's.
- No write policy, `GRANT SELECT` only.

## Photo storage

Bucket `listing-photos`, **private** — no public read, no hotlinking. Objects
live at `<user_id>/<listing_id>/<file>`.

`storage.objects` policies: `authenticated` may INSERT and read/delete objects
whose first path segment is their own user id (**path-prefix ownership** — a
documented simplification of "own listing's path"; cross-user isolation is
absolute, per-listing correctness is the app's responsibility when writing the
path). Public SELECT is granted only for objects joined to a
`listing_photos` row that is `exif_stripped` with an active parent listing.

## Pricing (REQ-018)

`price_mode` carries the intent (`fixed`, `negotiable`, `free`, `contact`).
`price_amount`/`price_currency` are optional and must be NULL together; `free`
may never carry an amount. Categories with `price_enabled = false` reject any
amount at the seam.

## Partition seam (REQ-012 / DEC-008)

`listings` carries `home_country_code` exactly like `profiles` — listings are
user data and must partition cleanly for a future Ethiopia entity.

## Enforcement: the bypass guard

`scripts/check-listing-writes.sh` scans `src/` for
`from('listings').insert|update|delete|upsert` and fails on any hit. Legal
client mutations are `rpc('submit_listing')` and `rpc('transition_listing')`;
`.select` reads are fine. CI job **Listing-write seam guard (with self-test)**
runs it twice: against `src/` (must pass) and against
`scripts/fixtures/bad-listing-write-example.ts.txt` (must fail), so a broken
guard cannot silently pass.

## Named follow-ups

- **P2-c-photos** — EXIF/GPS strip + on-device compress; flips `exif_stripped`.
  No photo is surfaced before it ships (DEC-009).
- **P2-d** — REQ-021 screening gateway fills the stub; full attribute validation.
- **Expiry schedule** — wire `expire_stale_listings()` to pg_cron or an external
  scheduler.
- **Post form UI** — sibling task; no `src/` change here.

## Related

- `docs/features/categories.md` — `expiry_days`, `price_enabled`, attributes.
- `docs/features/geography.md` — `location_id` target.
- `docs/governance/migrations.md` — append-only + idempotent migration law.
