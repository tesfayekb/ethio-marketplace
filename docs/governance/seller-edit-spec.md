# The seller's Edit, complete — spec v1 (D187; bundle 16 turns E2a and E2b)

Date: 2026-10-15. Base: dev a7485475. Author: the supervisor. Status: approved by the operator's answers (D187, 07:5x local) and his paste of the briefs.

## What the operator decided (D187)
1. The Edit page's boxes follow the posting form's order: Specifications → Photos → Title & description → Price → Place → Contact → Save.
2. Places are editable on Edit; a change applies at once (places are picked from a list, D177). Typed text (the written directions, the street line) goes to review.
3. Contact is editable per ad (the phones shown, WhatsApp, Telegram, messages, a second phone) and applies at once. Name, business name and home country stay in the profile.
4. The AI writing helper is offered on Edit as when posting; its text goes to review as free text.

## What exists today (dev a7485475; census of 2026-10-15)
- `edit_my_listing(p_listing_id, p_changes)` (20261015081040 :26–164): keys title, description, video_url, attributes, price_*; judged by `validate_listing_draft` at step 5 with no places and the ad's own contact; the review rule (D177); one revision. Refuses `contact_pref` and every other key ('not editable').
- `set_listing_pin` (20261006010039 :197–299): the pin, precision, zoom, street and directions, each call restating both text lines; statuses draft, active, reduced, rejected, held, expired — not closed; no review; one revision.
- `listing_locations` is written only by definer doors (submit_listing: drafts; edit_listing: the whole re-submit, always to screening; copy_my_listing). The feed index refreshes on listing_locations changes for active ads (20261009052418 :155–210) and on `location_id` changes (20261015023155 :143–159).
- The form (src/features/admin-listings/edit-form.tsx, `variant="seller"`): Photos → Title & description → Specifications → Price → Save. `editChanges` emits only the keys above.
- `StepWhere` (step-where.tsx :677–718) renders outside the wizard with `coverage`, `pin`, `listingId`; places go to the parent's `onChange`; the pin to `set_listing_pin` at once; street and directions to `set_listing_pin` on blur (`savePlaceText`).
- `StepWho` (step-who.tsx :132–164) renders outside the wizard; the channels go to the parent's `onChange`; the identity (alias, type, names, home country) commits to the profile through /api/listings/identity at once, as when posting. Its identity and channel parts are one component.
- `StepDetails` (step-details.tsx :67–103) renders the title, the description and the AI helper (`/api/listings/assist`; the ad's own 5-try budget, `assist:listing`); the route needs `listingId`, `categoryId`, `categoryPath`, the answers and up to 3 photo ids.

## Turn E2a — the door (Tier A; one migration)
A. `edit_my_listing`, redeclared whole from live with these changes:
  - the allowlist gains `coverage` (a JSON array of place ids), `contact_pref` (an object), `street_address` and `directions` (text or null);
  - the judge step is 7 when `contact_pref` is sent, 6 when `coverage` is sent, else 5 as today; `p_coverage` is the sent list, else the ad's current places (listing_locations by position); `p_contact_pref` the sent object, else the ad's own;
  - `coverage` applied at once: `listing_locations` rewritten in the sent order, `location_id` = the first place; `contact_pref` applied at once;
  - `street_address` and `directions` are sanitised as `set_listing_pin` does (control characters and angle brackets to spaces, 200 characters, `contactInNote` refused through the judge's shape — the door raises 'contactInNote' / 'streetTooLong' / 'directionsTooLong' as the pin door does); a change to either goes to review (D177), like a title change;
  - a changed place or contact never sends the ad to review; a rejected ad's edit still resubmits;
  - the revision's before/after gains `coverage` (the place ids in order) when it changed;
  - everything else byte for byte.
B. `set_listing_pin`, redeclared whole from live with one change: `closed` joins its statuses (INC-631: a closed ad is edited like a live one). Grants restated.
C. Proofs P1–P5 on scratch rows (a scratch country, region and city, active inside the block and removed at its end; a scratch seller row in `profiles`/`user_directory` is NOT made — the proofs run as a scratch uid with `request.jwt.claims` set and a scratch listing inserted directly): coverage applied with the first place as `location_id` and no review; contact applied with no review; a region-only place refused `cityRequired`; a changed directions line → review; `closed` accepted by the pin door; the old refusals ('not editable: category_id') kept.
Tests (Lovable): ML-12 gains cases: `{coverage: [region]}` → the judge's refusal; `{contact_pref: {…bad shape}}` → the contact refusal; ML-14 (new): coverage and contact applied at once (status unchanged, listing_locations and location_id as sent, contact_pref as sent, one revision with `coverage` in it); directions → status screening.

## Turn E2b — the form (Tier A: it writes places and contact; the screens Tier B)
- `edit-form.tsx`, seller variant, in the order of D187: Specifications → Photos → Title & description (StepDetails with the AI helper: `listingId`, `categoryId`, `categoryPath`, the current answers, `photoIds` the ad's first three) → Price → Place (StepWhere: `coverage`, `pin`, `listingId`, `ownPlace` null; places into the form's values; the pin through its own door at once; the text lines into the form's values through a new prop `textMode: "form"` with `onTextChange`, so they ride Save and go to review) → Contact (StepWho whole, as when posting: channels into the form's values; the identity block commits to the profile as it does when posting) → Save.
- `editChanges` emits `coverage` (when the list differs), `contact_pref` (when the channels differ, `sameChannels`), `street_address` and `directions` (when they differ).
- The admin variant keeps its order and boxes (D171); it gains nothing (staff change places and contact only through the seller's own account, never for them).
- The box descriptions say what applies at once and what goes to review: Place — "Places and the pin apply at once. A change to the written directions or street is reviewed first."; Contact — "Applies at once."; Title & description — as today.
- Known limit, stated: the street typed inside the map sheet rides with the pin (the pin door restates it), as when posting.
- Tests (Lovable): MLA-13 extended for the new order and the Place and Contact boxes; MLA-15 (new): add a second city and tick a channel, Save → the as-seen view shows both; type directions, Save → the ad is in review.
- Strings: the two box descriptions (en/am), nothing else.

## Not in this spec
- Staff editing a seller's places or contact (not asked).
- A second person's identity on an ad (the profile is the seller's).
- The category (D172: never).
