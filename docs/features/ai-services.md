# AI services — switches, budgets and the meter (D158)

The operator's rule (D158, 2026-10-13): every AI feature has an on/off switch, a monthly budget and the spend so far; at its budget every feature switches itself off except photo screening, which only alerts; while photo screening is off, new photos are held for staff. INC-600 recorded that none of this existed. Bundle 13 builds it in three turns:

1. **Turn 1:** the doors and the server — the switches, the meter, the budgets' automatic switch-off, and a seller's daily limits.
2. **Turn 5 (turns 2–4 were the operator's photo walk and its fixes):** the page, Admin › Services › AI — below.
3. **Turn 6:** photos held for staff while photo screening is off — below. Photo screening's switch may be turned off from this turn.

## The features

| Feature           | Where the paid call is                                            | Unit      | Starting price (ESTIMATE, staff edit it) |
| ----------------- | ----------------------------------------------------------------- | --------- | ---------------------------------------- |
| `photo_screen`    | `POST /api/upload/photo` (Gemini vision, three sizes in one call) | call      | $0.002                                   |
| `writing_helper`  | `POST /api/listings/assist` (Gemini text, up to three photos)     | call      | $0.003                                   |
| `name_check`      | `POST /api/listings/identity`, a new seller name (Gemini text)    | call      | $0.0003                                  |
| `category_images` | `POST` and the probe `GET /api/admin/categories/generate-image`   | call      | $0.04                                    |
| `category_icons`  | `POST /api/admin/categories/suggest-icon` (Gemini text)           | call      | $0.0003                                  |
| `translations`    | `POST /api/translate` (Google Translate)                          | character | $0.00002 ($20 per million characters)    |

Prices are kept in millionths of a dollar (`unit_cost_microusd`) and budgets in cents (`monthly_budget_cents`; empty = no budget). No budget is set by the migration: the operator sets them.

## The data

- `ai_features` — one row per feature: `enabled`, and when off its `off_reason` (`staff` or `budget`) and `off_at`; the budget; the unit and its price; the month's alert level (`alert_month`, `alert_level` 0, 80 or 100); `updated_at`, `updated_by`. A row named `e2e-…` is a test's scratch row: no code path names one, and the admin list leaves them out.
- `ai_spend_days` — per feature and UTC day: `calls`, `units`, `cost_microusd`.
- Both tables are closed to browser roles (RLS on, deny policies, no grants); only the doors below read or write them.

## The doors

- `ai_feature_gate(feature)` — service role only. `{ on, off_reason }`. A feature its budget switched off in an earlier month reads as on: each month's budget starts again.
- `ai_record_spend(feature, units)` — service role only. Adds one call and its units to today's row at the feature's price, then compares the month's spend with the budget: at 80 % and at 100 % it writes an audit row `ai.budget_alert` (once a level a month); at 100 % it switches the feature off (`ai.budget_off`) — every feature except `photo_screen`, which only alerts. A feature its budget switched off in an earlier month comes back on first (`ai.budget_on`).
- `admin_ai_features()` — `services:view`. Every feature with its state, budget, unit and price, and this month's spend, calls and units, today's calls and the month's alert level.
- `admin_set_ai_feature(feature, enabled, budget_cents, unit_cost_microusd)` — `services:manage` and a fresh second factor. Refuses `overBudget` (switching on a feature whose month's spend has reached the budget given — raise or clear the budget first), `unknownFeature`, and `badValue:enabled|budget|unitCost`. Writes `ai.feature_set` with the row before and after. Switching off records `off_reason = 'staff'`. Until turn 6 it also refused photo screening off (`screeningStaysOn`); turn 6 removed that refusal.
- The resource `services` has `view` (no second factor) and `manage` (a second factor). No role is granted them; the super admin holds every permission.

## The server (src/server/ai/meter.ts)

- `aiGate(feature, log)` asks the gate. A gate that cannot be read is **off** with the reason `unavailable` (fails closed, F4), and is logged.
- `recordAiSpend(feature, units, log)` writes the meter after the provider has answered. A failed write is logged on the server-error channel and never fails the caller, who already has the answer that was paid for.
- Fake mode is gated and metered like the provider, so a switch and a budget behave the same on ethio-staging.

What each route does when its feature is off:

| Route                                  | Off (`staff` / `budget`)                                                                                                                                                       | Switch unreadable                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `/api/upload/photo`                    | off by staff (turn 6): a draft's photo is held — stored `unscreened`, no pass, nothing metered; a live ad's photo is refused `screeningPaused`. A budget never switches it off | `providerUnavailable`, with a retry |
| `/api/listings/assist`                 | refusal `featureOff` ("The writing help is switched off for now.") — asked before any dial, so no try is spent                                                                 | `providerUnavailable`               |
| `/api/listings/identity` (a new name)  | the name is not asked about: saved unchecked and audited `alias.unchecked`, as when the provider cannot answer                                                                 | the same                            |
| `/api/admin/categories/generate-image` | 409, stage `switched-off`                                                                                                                                                      | 503, stage `switched-off`           |
| `/api/admin/categories/suggest-icon`   | 409, stage `switched-off`                                                                                                                                                      | 503, stage `switched-off`           |
| `/api/translate` (POST)                | 409                                                                                                                                                                            | 503                                 |

What is metered: one call per answer the provider gives (a photo's pass or refusal; a writing suggestion; a name check that answered; an image; an icon); for translations, the characters of every chunk the provider answered.

## A seller's daily limits (D158)

Over the hourly dials sit daily ones, each counted per seller by `consume_rate_limit` (and reset with a pooled test account, INC-377):

| Action   | Hourly (existing)                | Daily (new)                      |
| -------- | -------------------------------- | -------------------------------- |
| `upload` | `RATE_LIMIT_UPLOAD_PER_HOUR`, 60 | `RATE_LIMIT_UPLOAD_PER_DAY`, 200 |
| `assist` | `RATE_LIMIT_ASSIST_PER_HOUR`, 30 | `RATE_LIMIT_ASSIST_PER_DAY`, 60  |

The writing helper keeps its five tries per listing (`assist:listing`).

## Tests

- Migration proofs E1–E7 (headers, grants, closed tables, the seed and the permissions, the door bodies, the refusals with no caller and with a caller without the permission, and the meter on a scratch feature inside a block that rolls itself back).
- E2E (e2e/admin-services.spec.ts): SV-1 a seller is refused everywhere; SV-2 the super admin reads the six features and changes a scratch switch, and the door's refusals; SV-3 the meter on the app's own connection (INC-608: its audit rows are read by time, then by action — the alert and the switch-off one call writes share that call's instant).
- Unit: AIM-1..AIM-4 (src/server/ai/meter.test.ts); AIM-5 (src/server/category-images/suggest-icon-route.test.ts, the icon route switched off and on).

## The page — Admin › Services › AI (turn 5)

- **Where:** the admin menu's new group **Services** (`admin.nav.group.services`, glyph Plug) holds the section **AI** (`/admin/ai`, `services:view`, glyph Sparkles; src/routes/admin.ai.tsx). The group carries no permission of its own; the section keeps its gate (F3). DEC-091's other outside services join the group when they are built.
- **One read, one table** (src/features/admin-ai/ai-page.tsx, the coverage console's convention, on the agreed blocks of D118 / D128 — the header, the toolbar with a search and Columns, the row's Edit, the footer with the page size): `admin_ai_features()` in the order photo screening, writing help, seller-name check, category pictures, category icons, machine translation. Each row: the feature's name; its state — On, or Off with the reason and the day in its tip (switched off by staff; its budget reached, back on next month or when the budget is raised); this month's spend against the budget ("$1.23 of $5.00", or "· no budget"), with the alert of the month (80 % of budget; Budget reached); the calls this month and today (and, for machine translation, the characters); the price ("$0.003 a call"; "$20.00 per million characters"); the day it was last changed. Below 1024 px the rows are cards. A row the door answers out of shape refuses the whole read (F4): the page says it could not load.
- **Edit** (the row's one action, `services:manage` only): the switch, the monthly budget in dollars (empty = no budget) and the price (dollars a call, or dollars a million characters — the same number as millionths a character). The form checks both numbers against the door's ceilings first ($1,000,000 a month; $10 a call), then the save runs through the second factor (`StepUpGate`) and the door; its refusals are sentences (`overBudget`, `unknownFeature`, the bad values; no permission; no fresh code). Photo screening's switch can be turned off (turn 6); the form says what that does (`admin.ai.field.screeningOffNote`).
- **Money:** spends to the cent (under a cent reads "<$0.01"); budgets in cents; prices to the millionth (src/features/admin-ai/ai-service.ts).
- **Tests:** AIS-1..AIS-5 (the door's rows, the order, money, the form's fields, the refusals), AIF-1..AIF-3 (the form), AIP-1 (the page's cells and Edit only with `services:manage`), SV-4 (E2E, read only: the six rows by name with state, spend and price; the editor for photo screening; Cancel writes nothing — the real rows are never written, G27).

## Not yet

- When the screening gateway (REQ-021) is built: an ad it moves to live keeps its held photos held, because the approval trigger clears them on a person's decision only; how the gateway hands such an ad to staff is decided then.
- E-mails to admins at 80 % and 100 %: the app has no e-mail sender of its own yet (DEC-091's sender); until one is chosen, the alerts are audit rows, shown on the page from turn 2.
- The provider walls (D158 item 5) are set in the operator's own provider accounts, outside the code.

## Photos held for staff (turn 6, D158 item 3)

The operator's rule: while photo screening is off, photos are "saved, never shown to buyers, until staff approve"; posting keeps working. How staff approve (his answer of 2026-10-13): **with the ad** — every new ad already passes Admin › Screening, and approving the ad approves its held photos.

- **What an upload does** (`photoScreenPlan`, src/server/media/hold.ts; the route `/api/upload/photo`, step 6):
  - switch on → the policy pass, as before;
  - off by staff, on an ad whose next step is the screening queue (a draft, or a rejected ad sent again) → **held**: stored with `unscreened = true`, with no pass and nothing metered;
  - off by staff, on an ad that is live or past the queue (active, reduced, held by staff, expired) → refused `screeningPaused` ("Photo checking is paused, so this ad cannot take new photos right now."), because nothing would put the photo in front of staff;
  - a switch that cannot be read → `providerUnavailable` with a retry (fails closed). A budget never switches photo screening off.
- **The data.** `listing_photos.unscreened` (boolean, not null, default false). `register_listing_photo` takes `p_unscreened` (default false; service role only).
- **No buyer sees a held photo.** `listing_photos_public_read` leaves it out, so no visitor, signed in or not, gets its row or a link to it (`/api/media/photo-links` reads as the caller); `feed_page` never makes it a card's cover. The seller and staff still see it.
- **Approving the ad approves its photos.** A trigger on `listings` (`listing_photos_approved_with_ad`): when a person moves an ad from `screening` or `held` to `active` or `reduced`, its held photos are cleared and one audit row `listing.photos_approved` is written, `meta = {count, from, to}`, the reviewer as actor. `transition_listing` lets a signed-in person make that move only as a reviewer with a fresh second factor. A move with no session (a service caller) leaves the photos held.
- **What people see.** Staff: the screening preview says how many photos were not checked by AI and that approving the ad approves them (`admin.screening.unscreenedNote`), and the gallery marks each one "Not checked by AI" (`post.gallery.unscreened`). The seller: the photo step says the photos are saved and staff check them with the ad (`post.photos.heldNote`). The AI page: photo screening's switch can be turned off, with the note `admin.ai.field.screeningOffNote`.
- **Tests:** migration proofs A–G (structure, bodies, grants); PH-1..PH-3 (the plan), PU-5, GAL-5, AIS-5, AIF-2; E2E SC-18 (the preview's count; Approve clears the photo and writes one audit row with the reviewer; a buyer then reads it), SC-19 (a move with no session leaves it held: no buyer reads it, the feed's cover is the next photo, and the same row once cleared is read and is the cover), SV-2 and SV-4 (the refusal is gone; the switch is enabled and its note shown — read only, the real switch is never written, G27). The upload's held branch is proven by PH-1..PH-3 only: a browser test would have to switch the real photo screening row off, which no test may do (G27).
