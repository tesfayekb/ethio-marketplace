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

## U6-A1 — the posting schema (2026-09-16)

Migrations `fd11c7ab` (mark `20260917000000`) and `7145d6e9` (mark
`20260917010000`). Still **no door**: `submit_listing`/`transition_listing` are
untouched here and A2 re-declares them whole over the new states.

### New columns

`categories`: `capabilities text[]` (DEC-052 allowlist — only `bookable` and
`map_pin` pass the CHECK), `default_price_period` (`once|hour|day|week|month|year`)
and `price_period_locked` (DEC-067). Their console cells ride A2's code turn.

`listings`: `price_period` (same set), `poster_expires_at`, `video_url` (CHECK:
a YouTube watch or youtu.be URL only), `cover_photo_id`, `contact_pref jsonb`,
`screening jsonb` and `search_tsv tsvector`.

### The search column

`listings_search_tsv_refresh` is a BEFORE INSERT OR UPDATE OF
`title, description, attributes` trigger: title weight `A`, description `B`, the
text values of `attributes` (strings, string arrays and an `other` record's
`text`) weight `C`, all through the `'simple'` dictionary — a language-aware
dictionary per listing language is U7's call. Index
`listings_search_tsv_idx` (GIN).

### The state set

`status` widens to
`draft | screening | active | reduced | rejected | held | expired | sold | removed`
(DEC-070). The machine that governs the moves lands with A2's
`transition_listing`.

### One resolution, two readers

`effective_category_links(p_category_id)` is the single resolution of the
effective attribute set — the nearest link along the PRIMARY lineage of
`category_tree_pointers` wins, exactly as the admin reader resolved it before.
It is `service_role`-only and NOT client-callable.
`admin_list_effective_category_links` was re-declared WHOLE (INC-183) over it:
same signature, same gate, same ordering. The migration proves the row sets are
identical for `houses`, `cars` and `apartments-condos` (0 differing rows) against
an inline copy of the previous CTE — the reader itself cannot be called inside a
migration, its gate needs a session.

### The public posting read

`get_posting_schema(p_category_id)` — STABLE definer, `anon` + `authenticated`,
**no `has_permission`** (a category is public knowledge). It refuses
`categoryNotFound`, `categoryInactive` and `categoryNotPostable`
(`allow_listings = false`) and returns

```text
{ category: { id, slug, name_en, price_enabled, default_price_period,
              price_period_locked, expiry_days, is_restricted, capabilities,
              illustration },
  attributes: [ { attribute_id, attr_key, attr_type, name_en, help_text_en,
                  is_required, display_order, card_rank, unit, min_bound,
                  max_bound, decimals, format, preset, max_length,
                  option_count, allow_other } ] }
```

Ordered by `display_order`. **Option lists are never included** (DEC-053) — only
the active count and whether an `other` option exists. Names in other languages
come from the entity bundle, never from this read.

`get_attribute_options(p_attribute_id)` returns the ACTIVE options in stored
order (`value`, `label_en`, and `label_am`/`parent`/`aliases`/`bounds`/`allowed`
only when stored) plus `version` for the route's ETag;
`get_attribute_options_version` answers the version alone. Both are `anon` +
`authenticated`. The route that serves them is A2's code turn.

### The one validation authority

`validate_listing_attributes(p_category_id, p_attrs, p_prior DEFAULT NULL)` —
STABLE definer, `authenticated` only (DEC-051). It answers
`{ ok: true, attrs }` or `{ ok: false, refusals: [ { attr_key, reason, detail? } ] }`.

`p_prior` is the third argument, defaulted so the two-argument call in the spec
still works: on an EDIT the door passes the listing's stored attributes, and an
option deactivated since then stays valid **while its value is unchanged**.

Refusal vocabulary: `unknownAttribute`, `required`, `badType`, `unknownOption`,
`inactiveOption`, `otherNeedsText`, `outOfBounds`, `badDecimals`, `badPreset`,
`tooLong`, `badMulti`, `dependentMissing`. Bounds resolve through
`attr_bound_value` (so `year`, `year±n` are live), and a selected option's
`bounds` fold onto the named sibling — tightest stated bound wins (DEC-050).
Presets follow `attr_preset_ok`'s allowlist: `digits:n`, `vin` (17 chars, no
I/O/Q), `plate-et`, `alnum:a-b`, `free:n`. Normalisation trims text, coerces a
number to its declared decimals and canonicalises `other` to
`{ value: 'other', text }` (text ≤ 120).

The migration proves every reason fires **exactly once** against scratch
definitions and links that are deleted again in the same block, and that the ok
path normalises.

### Revisions, verdicts, rate limits, residency facts

`listing_revisions` (`listing_id`, `seller_id`, `kind` = create/edit/state,
`before`, `after`, `actor`), `screening_verdicts` (`listing_id`, `tier`,
`verdict`, `confidence`, `flags`, `model`, `model_version`, `rationale`,
`reviewer`) and `rate_limits` (`key`, `action`, `window_start`, `count`) are
**service-only**: RLS enabled, one deny-all client policy, `GRANT ALL` to
`service_role` and an explicit `REVOKE ALL … FROM anon, authenticated` —
Supabase's default privileges on `public` hand a new table to the browser roles
at birth, and the migration's read-back refuses to pass until that is taken
back.

`consume_rate_limit(action, key, limit, window)` upserts the current window
bucket and answers `{ allowed, remaining, resets_at }`. **A refusal is an
answer, never an exception** — the caller renders it. Proof: a limit of 2 in a
one-minute window allows twice and refuses the third with `resets_at` in the
future.

`user_directory` gains `observed_country_code`, `observed_at` and `standing`
(DEC-068). `residency_country_for(user_id, request_country)` fills the
observation the FIRST time only (a fact, never rewritten), returns the stored
value forever after, and returns NULL when nothing is known — the caller refuses
`residencyUnknown`. Counsel's rule (Q-014) changes this one function.

### Permissions

`listings` gains `view`, `review` (step-up) and `enforce` (step-up); every
`listings:manage` grant is deleted. No role held `manage`, so nothing was
inherited — `review` and `enforce` start ungranted and are assigned in the roles
console. Their `admin.roles.perm.action.*` keys (EN + AM) ride A2's code turn (a
recorded D2 exception: this landing touches no `src/`).

## A2-M — the doors (2026-09-17)

Migrations: `20260917112956_9add760c…` (marks `20260917120000`) and
`20260917113152_479720fb…` (marks `20260917130000`).

### The draft door

```
submit_listing(p_listing_id, p_step, p_category_id, p_title, p_description,
               p_video_url, p_attributes, p_price_mode, p_price_amount,
               p_price_currency, p_price_period, p_poster_expires_at,
               p_coverage uuid[], p_contact_pref) RETURNS jsonb
```

`SECURITY DEFINER`, `authenticated`. The caller is the owner: `p_listing_id`
NULL creates, otherwise `seller_id = auth.uid()` or the door raises
`not your listing`. **Only a draft is writable here** — a published listing
edits through `edit_listing`.

Residency is a server fact (DEC-068): `home_country_code` is copied from
`user_directory.observed_country_code`, and a NULL observation is refused as
`residencyUnknown`. No client value is ever accepted.

`draft_step := greatest(stored, p_step)`; `draft_updated_at := now()` (D14).

**Step law (D12).** One validation authority,
`validate_listing_draft(uid, step, …)`, validates every step **≤ step**
strictly and tolerates the later ones empty. `publish_listing` and
`edit_listing` call it with step 8, so there is exactly one rule set.

| Step | Fields                    | Rules                                                                                                                                                                                                                                                                                                                                                   |
| ---- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | category                  | leaf, active, `allow_listings`, not catch-all                                                                                                                                                                                                                                                                                                           |
| 2    | photos                    | nothing — photos register through their own door                                                                                                                                                                                                                                                                                                        |
| 3    | attributes                | `validate_listing_attributes` (its refusals pass through verbatim)                                                                                                                                                                                                                                                                                      |
| 4    | title, description, video | title 1–120 after trim, description ≤ 5000, YouTube shape                                                                                                                                                                                                                                                                                               |
| 5    | price                     | mode ∈ fixed/negotiable/free/contact; amount > 0 and required for the first two, NULL for the others; currency ∈ `currencies`, defaulting to the seller's home-country currency; period ∈ once/hour/day/week/month/year and equal to the category default when `price_period_locked`; poster expiry NULL or between now + 1 day and now + `expiry_days` |
| 6    | coverage                  | every id an active place of ONE open market; per-level counts against the caller's plan (`free` for everyone in v1); the item's own place is `p_coverage[1]`; a sub-city or its city are both legal (D19)                                                                                                                                               |
| 7    | contact                   | `messages` always true; `phone`/`telegram`/`whatsapp` objects of `{show, value}` with validated handles; nothing else                                                                                                                                                                                                                                   |
| 8    | review                    | no fields of its own                                                                                                                                                                                                                                                                                                                                    |

**Refusal vocabulary** (`{ ok:false, refusals:[{field, reason, detail?}] }`; a
refusal writes nothing): `residencyUnknown`, `categoryNotPostable`, `required`,
`tooLong`, `badShape`, `badValue`, `notPositive`, `mustBeEmpty`,
`priceNotAllowed`, `unknownCurrency`, `periodLocked`, `posterExpiryTooSoon`,
`posterExpiryTooLate`, `unknownPlace`, `multipleMarkets`,
`coverageExceedsPlan:city|region|country`, `messagesRequired`,
`showNeedsValue`, `badHandle`, `unknownKey`, `renewNeedsActive`,
`renewTooSoon`. Ownership and lifecycle violations raise (`not your listing`,
`illegal transition: x -> y`, `reviewer only`, `enforcement only`).

Success returns `{ ok:true, listing_id, draft_step }`. Coverage replaces
`listing_locations` wholesale; every write appends a `listing_revisions` row
(`create`/`edit`) carrying the changed fields only.

`listings.location_id` is NULLable now, with
`listings_place_unless_draft CHECK (status = 'draft' OR location_id IS NOT NULL)`:
a draft exists before step 6 chooses the place, and nothing leaves `draft`
without one. The DEC-064 plan check replaces the blanket one-country trigger of
`20260810073508`, which is dropped.

### publish / edit — NAMED DEFERRAL

`publish_listing(id)` is owner-only, runs the full step-8 validation and sets
`status := 'screening'` with
`published_first_at := coalesce(published_first_at, now())`. **Nothing goes live
from an owner door.** Until the D1 screening gateway lands, a published listing
stays in `screening` and no visitor sees it — a named deferral, not a gap.

`edit_listing(…)` takes the same parameters without `p_step`, applies the full
validation to a published listing and returns it to `screening`: every edit is
re-screened.

### The state machine

`transition_listing(id, new_status)` over the nine states:

| From            | To                              | Who                                                                                                              |
| --------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| draft           | screening                       | owner (`publish_listing`)                                                                                        |
| screening       | active, reduced, rejected, held | gateway (`service_role`) or `listings:review`                                                                    |
| held            | active, reduced, rejected       | reviewer                                                                                                         |
| active, reduced | screening                       | owner (edit)                                                                                                     |
| active, reduced | sold, expired                   | owner                                                                                                            |
| rejected        | screening                       | owner (re-publish after an edit)                                                                                 |
| expired, sold   | screening                       | owner (`relist_listing`)                                                                                         |
| any             | removed                         | `listings:enforce` or the owner — except a listing rejected for a severe reason, which enforcement alone removes |

Promotion to `active`/`reduced` stamps `published_at`, `published_first_at` and
`expires_at = now() + expiry_days`. Every move writes a `state` revision.

Owner doors: `mark_sold` (state `sold`, `contact_pref` reduced to
`{"messages": true}`), `renew_listing` (active only, `expires_at` extended,
`renewed_count += 1`, refused as `renewTooSoon` inside seven days),
`relist_listing` (expired|sold → screening), `delete_draft` (draft only;
deletes the photo, coverage and revision rows — **the storage objects behind
them are A2-C/B1's concern**, this door owns rows).

### Photo doors

`listing_photos` gains `width`, `height`, `bytes`, `paths`.
`register_listing_photo(listing, photo, paths, width, height, bytes)` is
**service-only** (`GRANT` to `service_role` alone; a signed-in caller is
refused): only the strip route can attest `exif_stripped`. It appends at the
next `display_order` and adopts the first photo as the cover.
`set_cover_photo` and `remove_listing_photo` are owner doors; removing the
cover promotes the next photo.

### Reference data

`public.currencies` (`code`, `name_en`, `minor_units`) — 156 active ISO 4217
rows, RLS on with a public read policy, `SELECT` to `anon`/`authenticated`,
`ALL` to `service_role`, birth grants revoked first (INC-212). Every
`countries.currency_code` in use resolves against it (proven in-migration).

## A2-C — the posting routes (2026-09-17)

Every door of A2-M is reached through ONE route shape. The route owns three
things and no judgment: the dial, the residency FACT, and the translation of a
camelCase body into the door's `p_*` parameters. Validation, coverage, price and
contact laws stay in the door (F3), and a refusal comes back as the door's own
JSON at status 200 with `ok:false` — never HTML, never a 500 (F4).

### The shared user-scoped client

`src/server/supabase/user-client.ts` is the ONE construction of a request-scoped
Supabase client (B2/B3): the publishable key plus the request's `Authorization`
bearer, with `userId` resolved from `auth.getUser()`. It also carries the shared
`routeJson`, `refusal`, `logRouteError`, `readJsonBody`, `envDial` and
`consumeRate` helpers. `src/server/imports/gate.ts` now calls it at both of its
former inline sites; each gate keeps its own refusal wording and status, so the
import routes' behaviour is unchanged (the import-security suite is the proof).

### The routes

| Route | Door | Dial (env) | Default |
| --- | --- | --- | --- |
| `POST /api/listings/draft` | `submit_listing` | `RATE_LIMIT_DRAFT_PER_HOUR` | 30 / hour |
| `POST /api/listings/publish` | `publish_listing` | `RATE_LIMIT_POST_PER_DAY` | 10 / day |
| `POST /api/listings/identity` | `save_posting_identity` | `RATE_LIMIT_IDENTITY_PER_DAY` | 20 / day |
| `POST /api/listings/assist` | Gemini (DEC-072) | `RATE_LIMIT_ASSIST_PER_HOUR` | 30 / hour |
| `GET /api/attributes/<id>/options` | `get_attribute_options` | — (cached, anon) | — |

The dial runs FIRST on every POST, before a byte of the body is judged, so a
flood costs one counter row and never a validation pass (DEC-071). A refusal is
`{ ok:false, refusals:[{ field:"rate", reason:"rateLimited", detail:<resets_at> }] }`.

### Residency on draft (DEC-068)

The draft route calls `residency_country_for(userId, geoGuess(request).country)`
BEFORE the door. The country comes from the EDGE and never from the body; the
fact is granted once, so a later call from another country cannot move it. A null
answer leaves the fact unset and `submit_listing` refuses `residencyUnknown` by
itself — the route does not pre-empt that verdict.

### Assist (DEC-072)

One Gemini text call with the same server-side key name the category-image
pipeline uses (`GEMINI_API_KEY`, `GEMINI_TEXT_MODEL`), read inside the handler.
The prompt carries ONLY the facts the seller entered (category, attribute values,
optional photo facts) and forbids anything else: no invented condition,
measurement, price, contact detail or guarantee. The answer is JSON —
`{ title (≤ 120), description (≤ 1200) }` — in the requested locale, clamped
server-side. `E2E_FAKE_ASSIST=1` (or the harness-wide `E2E_FAKE_TRANSLATE=1`)
returns a deterministic pair built from the category slug and the attribute
values, so no test spends provider credit. A provider failure or an unusable
answer is `{ field:"assist", reason:"providerUnavailable" }` — never a drafted
guess.

### The lazy option list (DEC-053)

`GET /api/attributes/<id>/options` is anon-readable public reference data, served
through the publishable key. Freshness is three layers: the version from
`get_attribute_options_version` behind a 15 s in-process cache, that version AS
the ETag (a conditional repeat costs a 304), and
`public, max-age=300, stale-while-revalidate=3600` for the browser. An id no
attribute has is a 404, never an empty 200.

### Named deferrals

- The D1 MODERATION GATEWAY: `publish_listing` lands a listing in `screening`
  and the route marks where the gateway call will go. Nothing in A2-C can make a
  listing `active`.
- The categories file's `capabilities` / `default_price_period` cells wait for
  B1's migration turn, where the SQL planner is re-declared whole (INC-183).

### Proof

`e2e/posting-routes.spec.ts` PR-1..PR-8: residency written once from the edge,
the door's refusal structure at 200, publish landing in `screening` and never
`active` (DB truth), alias uniqueness case-insensitive, assist within the caps
from the facts alone, the options route's ETag and 304, the dial's named refusal
with `resets_at`, and 401 without a bearer on every POST route.
