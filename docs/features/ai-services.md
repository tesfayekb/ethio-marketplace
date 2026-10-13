# AI services — switches, budgets and the meter (D158)

The operator's rule (D158, 2026-10-13): every AI feature has an on/off switch, a monthly budget and the spend so far; at its budget every feature switches itself off except photo screening, which only alerts; while photo screening is off, new photos are held for staff. INC-600 recorded that none of this existed. Bundle 13 builds it in three turns:

1. **Turn 1 (this page):** the doors and the server — the switches, the meter, the budgets' automatic switch-off, and a seller's daily limits.
2. **Turn 2:** the page, Admin › Services › AI (a card per feature: switch, budget, price, spend this month).
3. **Turn 3:** photos held for staff while photo screening is off. Until then the switch for photo screening cannot be turned off; its door refuses (`screeningStaysOn`).

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
- `admin_set_ai_feature(feature, enabled, budget_cents, unit_cost_microusd)` — `services:manage` and a fresh second factor. Refuses `screeningStaysOn` (photo screening off, until turn 3), `overBudget` (switching on a feature whose month's spend has reached the budget given — raise or clear the budget first), `unknownFeature`, and `badValue:enabled|budget|unitCost`. Writes `ai.feature_set` with the row before and after. Switching off records `off_reason = 'staff'`.
- The resource `services` has `view` (no second factor) and `manage` (a second factor). No role is granted them; the super admin holds every permission.

## The server (src/server/ai/meter.ts)

- `aiGate(feature, log)` asks the gate. A gate that cannot be read is **off** with the reason `unavailable` (fails closed, F4), and is logged.
- `recordAiSpend(feature, units, log)` writes the meter after the provider has answered. A failed write is logged on the server-error channel and never fails the caller, who already has the answer that was paid for.
- Fake mode is gated and metered like the provider, so a switch and a budget behave the same on ethio-staging.

What each route does when its feature is off:

| Route                                  | Off (`staff` / `budget`)                                                                                       | Switch unreadable                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `/api/upload/photo`                    | (cannot be off until turn 3)                                                                                   | `providerUnavailable`, with a retry |
| `/api/listings/assist`                 | refusal `featureOff` ("The writing help is switched off for now.") — asked before any dial, so no try is spent | `providerUnavailable`               |
| `/api/listings/identity` (a new name)  | the name is not asked about: saved unchecked and audited `alias.unchecked`, as when the provider cannot answer | the same                            |
| `/api/admin/categories/generate-image` | 409, stage `switched-off`                                                                                      | 503, stage `switched-off`           |
| `/api/admin/categories/suggest-icon`   | 409, stage `switched-off`                                                                                      | 503, stage `switched-off`           |
| `/api/translate` (POST)                | 409                                                                                                            | 503                                 |

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
- E2E (e2e/admin-services.spec.ts): SV-1 a seller is refused everywhere; SV-2 the super admin reads the six features and changes a scratch switch, and the door's refusals; SV-3 the meter on the app's own connection.
- Unit: AIM-1..AIM-4 (src/server/ai/meter.test.ts); AIM-5 (src/server/category-images/suggest-icon-route.test.ts, the icon route switched off and on).

## Not yet

- The page (turn 2) and photos held for staff (turn 3).
- E-mails to admins at 80 % and 100 %: the app has no e-mail sender of its own yet (DEC-091's sender); until one is chosen, the alerts are audit rows, shown on the page from turn 2.
- The provider walls (D158 item 5) are set in the operator's own provider accounts, outside the code.
