# Posting wizard (U6-C1a, steps 1–2)

Spec: `docs/governance/u6-posting-spec.md` §4 B2/C1, §12 D11/D12/D18.
Decisions: DEC-068 (residency from the edge), DEC-069 (the strip law),
DEC-072 (the assist). Acceptance: `PW-1`..`PW-4`, `PW-7`, `PW-8`.

What landed: the wizard shell, the draft (autosave, offline retry, resume) and
steps 1–2. Steps 3–8 are declared in the rail and say so in words on screen
(`post.stepLater`); C1b lands the specification form, title and description.

LAYOUT-1 keeps the compact phone header and adds a shared split layout at `lg`:
the form remains in a reading-width column, while a sticky aside shows all eight
steps with completion ticks, the chosen category, and a live listing preview
from step 4. `FormLayout` owns the safe-area-aware sticky Back/Next bar below
`md`; it is a normal footer on larger screens.

On phones, all eight steps stay in one horizontally scrollable row of labelled
pills. The current pill is filled and scrolled into view; completed pills carry a
tick and remain tappable.

## The screens

| Route        | Purpose                                                                              |
| ------------ | ------------------------------------------------------------------------------------ |
| `/post`      | Creates a draft. Public: a signed-out visitor sees a sign-in call, never a redirect. |
| `/post/<id>` | Resumes a draft. `noindex`. RLS decides ownership, never the URL.                    |

`src/routes/post_.$listingId.tsx` carries a TRAILING UNDERSCORE on the `post`
segment on purpose. Without it the flat-file convention makes `post.tsx` a
layout, and a wizard that renders no `<Outlet />` would silently show the create
screen at a draft's own address. The URL is unaffected.

## The draft (`src/features/posting/use-draft.ts`)

1. **Nothing is lost.** A save that cannot reach the server keeps the answers,
   says `post.save.unsaved` in words, and retries every 4 seconds; a `Try again`
   button is offered beside the caption. No field is cleared, no step rolls back,
   and success is never claimed (F4).
2. **One save at a time.** Typing debounces at 2 seconds, `Next` saves at once;
   both funnel through a single in-flight request carrying the LATEST answers, so
   the door can never apply an older payload after a newer one.
3. **The server owns `draft_step`.** The wizard proposes; the door's answer is
   what a resume trusts. A resume opens at the step AFTER the recorded one, never
   past what this landing can honestly render.
4. **A refusal is not a failure.** Refusals render beneath their named field and
   are not retried; only unreachability is.

## Step 1 — ONE control (D11, C1-R1)

The step is the TREE, with a filter box above it — not a search field beside a
separate "or browse" list. Typing narrows the visible tree in place and every hit
carries its full path, because "Doors & Windows" means little on its own. An empty
box is the tree at the level the seller stands on. Folders drill in with a chevron
and are never selectable; choosing a postable LEAF is the answer — the draft is
created and the wizard advances at once, with no confirmation screen. From step 2
onward the chosen category rides at the top of every step as a chip
("Construction Material › Doors & Windows · Change"), which is both the
confirmation and the way back.

### Where you are, and the way up (U6-C1-R3b-3d)

The level is named by tappable CRUMBS above the tree — "All categories › Vehicles ›
Cars" — and a tap on any crumb goes to that level; the crumb for the level you are
on takes no tap. "Up one level" is retired: BACK does it. Inside the tree Back
climbs one level, and only at the roots is it closed, because there is nothing
above them. The level list scrolls inside the card so Back and Next keep their
place in the sticky bar at every width (LAYOUT-1). PW-3 walks the crumbs and the
climb.

The tree also carries a category EVERYWHERE it is surfaced (INC-246). Surfacing is
a pointer, not a move, and the reader used to keep one parent per category — so a
leaf the marketplace rail showed under two roots could be reached under one of them
only. Every pointer row is now a branch; the PATH shown on the chip stays the first
pointer's, so a category has one well-defined trail to name. PW-36 surfaces a
scratch leaf under a scratch root and finds it in both places.

Search-to-leaf over the ONE shared tree reader
(`src/features/categories/category-tree.ts`, lifted out of the feed so both
consumers read the same rows). Search matches the active language's entity name
and the English name, and answers with POSTABLE LEAVES ONLY. Folders are
browsable and never selectable. Choosing a leaf creates the draft immediately —
that is what makes the seller's work recoverable — and reads
`get_posting_schema` to say how many details the next form will ask for.

## Step 2 — photos are OPTIONAL (B2, C1-R1)

The door does not ask for a photo (`submit_listing` step 2 registers photos
through their own door and validates nothing here), so the step does not pretend
otherwise: it opens on the CATEGORY ILLUSTRATION as a stand-in ("this picture
will stand in until you add your own") and offers "Add photos" beside "Continue
without photos". The rules are stated before the picker, not after a rejection:
JPG, PNG or WebP · up to 6 MB each · at least 480 px wide · good light, plain
background, the whole item in frame. The YouTube link lives here too, beside the
photos it belongs with (moved off step 4), with the DEC-073 shape hint.

The device encodes before anything is sent: `createImageBitmap` with
`imageOrientation: "from-image"` (so a portrait phone photo is not served
sideways), a resize that never upscales, and WebP where the browser can encode
it, else JPEG at 0.82 — three variants (cover 1600, card 480, thumb 160).

Uploads are SEQUENTIAL and report real progress (`XMLHttpRequest`, because
`fetch` cannot report upload progress and a stuck tile is indistinguishable from
one still sending). A refused photo stays on screen with its reason in words so
it can be replaced rather than hunted for. The cover is the first registered
photo until the seller says otherwise. Stripping, caps and the policy pass are
the server's, not the device's — see `media-pipeline.md`.

## Tests (`e2e/post-wizard.spec.ts`)

`PW-1` shell · `PW-2` search-to-leaf creates the draft · `PW-3` a folder is never
selectable · `PW-4` a photo is prepared, stored stripped and removable · `PW-7`
resume, and only for its owner · `PW-8` an unreachable save keeps the answers.

Two harness facts worth keeping:

- **The edge speaks residency.** DEC-068 takes the country from the edge header,
  never the body. There is no Cloudflare in front of a local or CI run, so the
  spec supplies `cf-ipcountry` on the posting routes only — a blanket header is
  rejected by the font CDN's CORS preflight.
- Cleanup runs in an `afterEach` (INC-218): objects, listings, then the scratch
  category branch, so a body timeout still reaps.

## Step 3 — the specifications (C1b)

Nothing on this screen is authored. `get_posting_schema` names the details a
category asks for and each definition's `attr_type` chooses its control:

| `attr_type`     | control                                 | notes                                     |
| --------------- | --------------------------------------- | ----------------------------------------- |
| `text`          | single-line field                       | `max_length` said, preset shape hinted    |
| `number`        | numeric field                           | DEC-050 bounds and unit as HINTS          |
| `date`          | date field                              | —                                         |
| `boolean`       | attestation checkbox                    | never pre-ticked                          |
| `single_select` | native picker, options on the FIRST tap | DEC-053; `other` opens its own text field |
| `multi_select`  | the same lazy list as checkboxes        | "choose all that apply"                   |

Bounds, lengths and presets are guidance; `validate_listing_attributes` is the
authority (F3) and its refusal lands beneath the control that earned it. The
form reports the keys it renders upward, so a refusal naming a field that is NOT
on screen is still shown rather than swallowed (F4).

Review and buyer preview resolve stored option values to their language-aware
labels, append units to measured values, join multiple choices with commas, and
render booleans as Yes/No rather than raw storage values. Colour swatches resolve
from the stored value first and then from the stem after a parent prefix
(`dog_black` → `black`); patterned stems (`brindle`, `tabby`, `calico`,
`tricolour`, `multicolour`, `black_tan`) render as neutral patterned chips, and a
colour-like definition with no resolvable option renders no swatch tray.

## Step 4 — title, description, and the assist (C1b)

The seller writes the title (≤120), the description and an optional YouTube
link. `post-assist` calls `/api/listings/assist` (DEC-072) with the category and
the answers from step 3; what comes back is a SUGGESTION dropped into both
fields as ordinary editable text, never an author — the seller's edit is what
saves.

## Autosave is not an exam (INC-228, INC-227)

- An autosave sends `p_step = <last completed step>` — never the step being
  edited. A half-filled step is therefore never thrown back at a seller who is
  still typing.
- `Next` sends `p_step = <the step on screen>`: that is the only strict save, and
  its refusals are the only ones rendered. Strictness travels with the STEP that
  was claimed, so an autosave landing in between cannot consume it.
- "Not saved yet" belongs to TRANSPORT alone (network, 5xx). A refusal is never
  dressed as a failed save (F4).
- Autosave sends only when the serialised answers CHANGED since the last accepted
  save, and the dial is 600 saves an hour (`RATE_LIMIT_DRAFT_PER_HOUR`; the E2E
  build keeps 30 so PR-7 can reach the ceiling). On a `rateLimited` refusal
  autosave waits until `resets_at` and says so in words — `Next` still works, so
  the seller is never in a dead end.
- A required field carries its own primitive (`src/features/posting/field.tsx`):
  an asterisk when required and "Optional" otherwise, a red border with the
  message under the control on refusal, and a summary above Back/Next naming the
  refused fields BY LABEL, each a link that focuses its control. `Next` is never
  greyed out without that summary on screen.

## The save queue

Every save — the 2-second debounce, a tap, and `Next` — joins ONE chain. A
`Next` that arrives while an autosave is still in the air waits for it and then
sends the latest answers; a change made while a request was in flight stays
pending and runs again straight after. Before this, such a collision was dropped
on the floor: the seller's last edit never reached the door and the step did not
advance.

## Option-carried `facts` (D18, C1-R3a-2)

`get_attribute_options` projects `facts`, so the prefill is built: choosing an
option whose `facts` name sibling details fills those siblings in (only where
they are still empty) and marks each one "From the model — edit if different"
(`post-attr-from-model`). A fact may carry a BOUND instead of a value —
`{ year: { min: 1968 } }` — and that bound narrows the sibling's number control
in the CLIENT MIRROR only: `belowModelYear` / `aboveModelYear` are read on blur,
while `validate_listing_attributes` remains the authority (F3). Dependent lists
first follow explicit option `parent` cells and also accept the published
parent-prefixed stored-value shape (`byd_seagull` under `byd`), so a leaf surfaced
under another branch still narrows by the parent control linked on that leaf.
`PW-9` proves the prefill, `PW-25` the bound, and `PW-44` the surfaced leaf.

## Step 5 — the price (C2a)

Nothing here is authored either: `get_posting_schema` carries the category's own
pricing facts, and the screen obeys them.

| Fact                   | What the screen does                                                              |
| ---------------------- | --------------------------------------------------------------------------------- |
| `price_enabled=false`  | no price is asked at all; the step says so and moves on                           |
| `default_price_period` | the period the picker opens on                                                    |
| `price_period_locked`  | the period is shown as a FACT, with no picker to change it (DEC-067)              |
| `expiry_days`          | bounds the optional "until" date; beyond it the door refuses, under its own field |

The ORDER is mode → currency → amount → period, and the period line appears only
when the category lets the seller choose it (a locked period is a fact the buyer
reads on the card). The currency is ONE searchable select — type "birr" or "ETB",
arrow keys, enter — preselected from the saved posting currency, else the guess
market's own currency (`cf-ipcountry` → `countries.currency_code`, read through
the anon client), else ETB. There is no second currency box. A currency without an
amount is not a price: the pair travels to the door together or not at all, which
is what the `listings` price-pair rule requires. "Take it down on" left this step —
the active window is answered on REVIEW as "active from / until".

Four modes: a fixed price, a negotiable one, free, and "contact for a price".
`free` and `contact` hide the amount entirely — the door refuses an amount sent
with them, so offering one would be a trap. The currency picker is searchable
over the ISO table and opens on the seller's home market's currency (D13); left
alone, the door applies that same fallback itself.

## Step 6 — where it is (C2a, D19)

The editor stands on the SAME shell seam the browse picker uses
(`useOpenMarkets`, `useCountryTree`, the saved-area cookie and `/api/geo`) — one
tree reader, never a second. It opens on the seller's saved area, else the
guess, else their market, and the caption names what it pre-filled and why.

A city that carries sub-cities offers **All of &lt;city&gt;** first: whole-city
coverage is the CITY node itself, not a list of its children (D19). The plan
(DEC-064) is stated in words beside the list and enforced before a round trip is
spent — on the free plan a second place is refused on screen, and the door
refuses it again with `coverageExceedsPlan` if anything gets past.

A map pin is NOT part of this landing: `listing_locations.lat/lng` and
`map_visible` exist, and the pin editor arrives with the detail page.

## D20 — a session-gated page keeps the seller's intent

`/post` and `/post/<id>` are session-gated: a signed-out visitor is sent to
`/auth?return=<path>` and lands back where they were going. The return value is
accepted ONLY as a same-origin relative path — `https://evil…`, `//evil` and
anything carrying a backslash fall back to `/`. It is a redirect, not a card:
the old sign-in card is gone.

INC-224 (C2b): Google's door now carries the same intent. The return path rides
in the OAuth `redirectTo` URL's own query string (`oauthRedirectUrl`), not a
cookie, and the callback re-applies `safeReturnPath` before it navigates — a
tampered `return` is still only ever `/`. KNOWN LIMIT: the harness cannot drive
Google's consent screen, so the assertion on that arm is the unit-level shape of
`oauthRedirectUrl`, not an end-to-end walk; `PW-14` still walks the email door.

## The posting entry

"Post a listing" is My Listings' first item (`post-entry`), not Account's. My
Listings itself stays on the INC-071 grandfather (`homePath: null`): a panel with
a home activates by NAVIGATION, and the shell derives the active panel from
`/settings` and `/admin` only — pointing it at `/post` would open the wizard with
the marketplace rail beside it (INC-058). Its own page, and that mapping, arrive
with E1.

## Tests (C2a)

`PW-10` the locked period, the hidden amount and a refused expiry · `PW-11` the
prefilled market, "All of <city>" over a scratch region→city→sub-city chain, and
the plan cap, all against DB truth · `PW-14` D20 both ways, including a dropped
off-site return · `PW-15` the entry lives in My Listings and not in Account.

## Step 7 — who the buyer reaches (C2b, D17)

Identity lives on the PROFILE, not on the listing: alias, person-or-business,
business name and home country are read once (`readSellerIdentity`) and shown as
a confirmed block with "Change these" when they already exist, so a seller who
has posted before answers nothing. Only the channels belong to the listing
(`contact_pref`).

The alias is the DOOR's answer, never the screen's. The shape `^[a-z0-9_]{3,30}$`
is mirrored client-side so a plainly wrong alias costs no round trip, but the only
statement of availability is `save_posting_identity` itself, debounced 700 ms and
idempotent (claiming the alias you already hold is not `aliasTaken`). Reserved
names and case-insensitive collisions are the door's list, not the screen's.

Messages cannot be switched off — `listing_contact_refusals` requires them — so
the switch renders as a disabled, checked fact with a line saying why, never as a
control that refuses on submit. A channel is TWO answers, a value and "show it";
the handle shapes (`+2519…`, `@handle`) are hints, and the door validates them
(`badHandle`, `showNeedsValue`). A confirmed home country is locked
(`countryAlreadyConfirmed`); an unset one is filled from the saved-area cookie.

## Step 8 — review and publish (C2b)

The preview (`listing-preview.tsx`) is built from the DRAFT, never from a second
read, and its cover is the SERVER's first photo in the server's own order
(`card` ▸ `cover` ▸ `thumb`) — so what the seller reviews is what a buyer sees.
Publish calls `publish_listing`, which lands the listing in SCREENING and never
live: live is only ever reached through the D1 gateway (still deferred). A refusal
on any earlier answer is shown with a "Go to step N" button through one
`FIELD_STEPS` map, so nothing refuses in a place the seller cannot reach. An
unreachable publish keeps the answers and says so (F4). "In review" links to My
Listings' own wording; the page itself arrives with E1, so the link goes to the
feed until then.

## The upload blocker, and the retry law (PP-10)

CAUSE, from the published server's own log: every upload answered 500 with
`[ssr-error] /api/upload/photo Missing Supabase environment variable(s):
SUPABASE_SERVICE_ROLE_KEY` — the production runtime carried the key under a
different name only, so the registration client could not be built. Not
multipart: the route never reached the body. The binding was repaired; the route
and the multipart read are unchanged.

The tile's classification was the second half of the bug: a 500 is a failure to
REACH a verdict, a refusal IS a verdict, and the two must not share a path.

- a verdict → `refused`, its reason once, said to be final, NO retry offered;
- unreachable → ONE automatic second try, then `failed` with "couldn't send" and
  a manual retry in the seller's hands (nothing silent, nothing forever).

## Tests (C2b)

`PP-10` a verdict is shown once and offers no retry; a 5xx is tried exactly twice
and then hands a manual retry over · `PW-11` seeds its region→city chain through
the service client and waits for `/api/locations/ET` to serve it BEFORE opening
the wizard (J7) · `PW-12` messages disabled-and-checked, an alias shape refused
under its field, the door-confirmed alias and a shown phone read from DB truth ·
`PW-13` the preview carries the answered values, step 8 offers no Next, and
Publish lands `screening` in DB truth.

## U6-C1-R2 — the second operator walk

**Photos (step 2).** Nothing offers to skip: `Next` already carries a seller with
no photo. The rules are ONE line — `post.photos.helper`, "Up to <n> photos · JPG,
PNG or WebP · up to 6 MB · at least 480 px wide" — and `<n>` is one dial,
`MAX_PHOTOS_PER_LISTING` in `types.ts` (M-MAINT-2 will source it from the plan).
The stand-in illustration WALKS UP the tree: the chosen leaf's own picture, else
the nearest ancestor that has one, derived from the shared tree reader, so a leaf
seeded without an image still shows its family's picture (`PW-3`).

**Specifications (step 3).** Every field renders through the field primitive: an
asterisk when required, "Optional" otherwise, a SOFT red border on an empty
required field from the start and a full border with the door's message after a
refusal. INC-229: the answers live in the DRAFT, never in a step-local state that
dies on unmount, so `Back` shows what was typed (`PW-18`).

**Title and description (step 4) — DEC-072 in full.** The assist is given the
category path, the step-3 answers, the seller's own draft words and the first
three stored photos (card variants, fetched server-side and sent inline). The
prompt asks it to write to SELL — natural title, persuasive but truthful body,
the seller's own facts kept, nothing added that is not in the photos or the
details, ≤ 120 / ≤ 1200 characters. Each retry carries the previous suggestions
and asks for a different angle. The budget is the DOOR's:
`consume_rate_limit('assist:<listing id>', …, 5, '10 years')` — five per listing,
no schema change — and the remaining count is on screen. Suggestions arrive BESIDE
the fields as a history of up to five, each with "Use this one"; the seller's own
text is never overwritten without that tap (`PW-6`, `PW-19`).

**Price (step 5).** The currency control shows a chevron — the combobox
affordance the walk asked for. Nothing else changed.

**Where (step 6).** The item's own place is ALSO the default selling place: the
deepest place the cascade names lists itself under "Where this listing shows",
with `Remove` and "Add it back" so the automatic rule is never a trap. Changing
the cascade MOVES that automatic place rather than leaving a stale one to exhaust
the plan. Further places come from a second cascade within the plan, and the plan
counts what is used on screen. The automatic add is a DEBOUNCED save: the cascade
settles across three levels, and racing one write per level let an earlier place
land last (`PW-11`, `PW-20`).

**Who (step 7).** Each channel is one row: the value and its "Show on the
listing" switch side by side. The alias is SUGGESTED from the business name or
the account's display name with a "Use it" chip, and the identity door now runs
an IMITATION CHECK — one Gemini text call answering `{imitates, of}` — refusing
`aliasImitatesBrand` with the name it resembles. A checker that cannot answer
returns nothing: a broken check must never become an accidental ban list (F4).
Fake mode: an alias containing "cocacola" imitates (`PW-12`).

**Review (step 8).** A real review page: one section per step with the saved
values and an `Edit` link that returns to that step — and `Next` there comes back
to review rather than walking on. The preview sits beneath, then the active
window, then Publish (`PW-13`).

## Deferrals to M-MAINT-2

- per-link allowed options + default values
- plan photo cap
- seller first/last name
- the `pin` column: `validate_listing_attributes` refuses any key not in the
  effective links set, so a reserved `_pin` inside `attributes` would be refused.
  The map pin therefore needs its own column and the control is NOT shown yet.
- the facts prefill check (D18 / `PW-9`)

## Still deferred

The D18 facts prefill (`PW-9`) is NOT landed. The seam exists (option records may
carry `facts`, DEC-050), but reading them on the posting side needs the public
options projection to expose `facts` to an anon reader, which is a migration —
forbidden by this landing's brief. It says so on screen through `post.stepLater`.
The D1 screening gateway remains a named deferral.

## What M-MAINT-2 Part A gave the wizard

- The specification read (`get_posting_schema`) now carries, per attribute,
  `allowed_options` (NULL = every active option) and `default_value`, and a
  `plan` object with the caller's caps (`max_photos` plus the coverage caps) —
  one document, no second call for the photo limit.
- The map pin has its own columns and its own door (`set_listing_pin`), so the
  reserved-key problem is gone: the pin never travels inside `attributes`. The
  control itself rides C1-R3.
- The seller's first and last name are written by `save_posting_identity`.

Still deferred: the D18 facts prefill (`PW-9`), the links-file cells and their
Undo (M-MAINT-2 Part B), and the D1 screening gateway.

## U6-C1-R3a (part 1) — the third operator walk

- **The where step no longer waits on the prefill.** The region control used to
  be gated on the resolved market prefill, so a slow guess/saved-area read left
  `post-where-region` unrendered (PW-13/PW-20, twice on mobile). The cascade now
  renders as soon as the market's own tree nodes arrive; the country is seeded
  from the saved-area cookie, and the market prefill only writes when it names a
  DIFFERENT country. A market with no regions says so in its own caption
  (`post.where.noRegions`) rather than rendering nothing.
- **Validation everywhere, the doors still the authority (F3).**
  `src/features/posting/validate.ts` mirrors the doors' rules — phone/WhatsApp
  `^\+[0-9]{7,15}$`, Telegram `^@?[A-Za-z0-9_]{5,32}$`, the YouTube shape, text
  lengths, number bounds and decimals, the expiry window — and returns the SAME
  refusal vocabulary the doors use, so a message read on blur and a message read
  from a refusal are the same words. `mergeRefusals` lets the door's verdict win
  wherever both spoke. Nothing is decided on the client: a screen that passes
  its own check still asks the door on Next.
- **The identity route asks before it saves.** `/api/listings/identity` calls
  `listing_contact_refusals` BEFORE `save_posting_identity`, so a phone of
  "number" is refused `badHandle` on `contact_pref.phone` instead of being
  stored. Step 7 renders that refusal under the channel it names.
- **The summary speaks in labels (INC-231).** `RefusalSummary` lists a field by
  its LABEL, for the current step; a refusal naming a field of ANOTHER step
  reads "Fix <step>: <label>" and navigates there.
- **Title and description.** The suggestion list sits between the description
  field and the assist button, and the button carries the `Sparkles` icon.

Open from this walk (part 2): the DEC-050 option folds, the D18 facts prefill
(`PW-9`), the per-link `allowed_options`/`default_value` consumers, the fixed
illustration box, the currency law (seller's last listing → market, the open
markets' currencies with "More…"), and step 1's disabled Next with its caption.

## U6-C1-R3a-2 — the specification form, the picture and the price list

- **Option folds (DEC-050 `parent`).** A picker whose options hang under another
  picker's answer shows ONLY the options of the chosen parent. The schema read
  does not name the parent, so the seam discovers it structurally: a picker whose
  options carry `parent` values belongs to the earlier picker whose own option
  values contain them. With no parent answer the child is disabled and says
  "Choose <parent> first" (`post-attr-parent-first`); a child answer that no
  longer fits is cleared when the parent changes; a parent answer with no child
  options says so (`post-attr-no-options`). `PW-21`.
- **The link narrows and opens on a default (M-MAINT-2 §12, INC-245).**
  `allowed_options` from the link filters the shortlist further, and
  `default_value` is what an EMPTY field starts from — on the first render of the
  step and again wherever a make or model reset has just emptied the field, never
  over an answer that is there. The door's `optionNotAllowed` stays the authority.
  `PW-22`.
- **An option's `allowed` narrows its siblings (INC-244).** The same resolver that
  gathers bounds from every chosen option gathers `allowed` too: a sibling picker
  offers only the values the chosen options admit (intersected with the link's own
  shortlist), an answer outside them is cleared rather than left for the door, and a
  SINGLE admitted value is written and the control locked with a translated caption
  naming where the answer came from. `attr_allowed_check` and the publish door stay
  the authority (F3). `PW-35`.
- **A bound written as text is still a bound (INC-247).** A fact that arrives
  through the attributes FILE carries its numbers as the file wrote them
  (`{"min": "1968"}`), and the resolver used to read JSON numbers alone — so the
  model's floor was silently dropped and the year picker offered years the
  catalogue had already ruled out. Reproduced on the catalogue's own shape: the
  year linked at a SECTION and only inherited by the leaf, a three-level fold
  (brand → series → model), the bound on the MODEL option; the picker offered from
  **1900** (the definition's own minimum) instead of 2008. A bound now applies from
  whatever answer carries it, whatever link the bounded field came from and however
  deep the fold; a model with `min = max` pins the picker to that one year.
  `PW-25`.
- **A bound lives in `bounds`, not in `facts` (INC-249, R-SW).** DEC-050's option
  record keeps a bound in its OWN `bounds` object, BESIDE `facts` — the published
  site serves BYD Han as `{"facts": {…}, "bounds": {"year": {"min": 2020}}}` — and
  this screen read `facts` alone, so no real catalogue model bounded anything and a
  2020-only car still offered 1900. The client option shape now carries `bounds`,
  the resolver reads it first (a nested `facts` bound is still honoured for a file
  that writes one), and a bound also marks its field MODEL-DEPENDENT for D25/D25b.
  The fixture behind `PW-25` and `PW-32` is copied verbatim from the served payload,
  because the earlier fixture nested the bound inside `facts` — a shape the
  catalogue never writes — and so the test passed while production did not. `PW-25`.
- **A fact reaches a sibling the same selection unhides (INC-257).** Visibility is
  decided BEFORE a fact is applied, and against the answers as the current
  selection leaves them — because the very choice that carries a fact is often what
  puts its target on screen (Sports › Fitness › Treadmill says `power_source =
electric`, and Power Source is linked with
  `visible_when equipment_type = treadmill | exercise_bike | elliptical |
rowing_machine`). Judged against the PREVIOUS answers the target was still
  hidden, so the prefill was refused and the published listing showed Power Source
  empty, while facts to always-visible targets (dairy cow → per head, rebar → per
  quintal) worked. Two things were wrong and both are fixed here: the three passes
  that write answers on this step (the hidden-answer sweep, the reconciliation, the
  link defaults) all spread the `values` PROP, and React runs them in one commit —
  so the last writer erased the earlier one, and the voltage default (`220v`) wiped
  the power source it had just been given. Every pass now builds on the latest
  answers this screen knows, so they compose. The rule runs both ways: a target the
  choice unhid receives its prefill (and a default of its own once IT becomes
  asked), a target the choice hid stores nothing, and the patch is swept once at the
  end so nothing unasked leaves the step — the mirror of what the door drops (F3,
  D24). A link default is likewise only written into a field the seller is actually
  asked for. `PW-43`.
- **A category change clears the fold on screen too (INC-248).** When the new
  category still asks a picker the previous one asked, the picker shows "Choose":
  the door had already cleared the answer, and a control still displaying it was a
  phantom (F4). `PW-26`.
- **A fact never ticks an attestation (D27).** A boolean detail is the seller's
  statement, so what the catalogue knows about the model renders as a hint beside
  the UNTICKED box ("This model: <label>"), and the box carries the definition's own
  label. `PW-9`.
- **The cleared-answers notice is one line, and dismissible.** "Some answers didn't
  apply to <category> and were cleared: <labels>" (EN/AM), with Dismiss beside it.
- **A changed list is noticed (INC-243).** An option list is cached for sixty
  seconds with the definition's version as its ETag (`max-age=60,
stale-while-revalidate=300`), and the version is `md5(updated_at + active option
count)` over the definition row — which the attributes-file commit rewrites on
  every update, so a curator's edit reaches a seller's open form within the minute
  instead of the five it used to hold. Changing the category forgets the lists it
  held.
- **DEC-053 still holds.** A list is fetched on the tap that opens it. Only two
  things must be known BEFORE a tap — a fold (which exists only between two
  pickers) and a link default — so small lists are read up front only when the
  step has more than one picker or a default to apply; a lone small picker stays
  lazy, and a big preset always does.
- **The illustration fits its box.** A fixed 4:3 frame, at most 320×240, the
  picture `object-fit: contain` and centred, in the photos step and in the review
  preview — never stretched, never cropped. `PW-3`.
- **The currency law.** The default is the currency already on the draft, then
  the seller's OWN LAST LISTING's currency, then the guess market's currency,
  then `ETB`. The list opens SHORT: the currencies of the OPEN markets (at most
  15), the seller's own market's currency first and the rest in the rail's order,
  deduplicated, with a "More currencies…" row that reveals the full ISO list.
  `PW-17`.
- **Step 1 asks for a leaf.** Next is disabled until a leaf is chosen, with the
  caption "Choose a category to continue"; a keyboard seller who presses Enter
  gets the choice group outlined and a refusal beside it, cleared on choice.
- **Per-test sellers.** Every posting test that creates a draft mints its own
  seller, and `asEdge` also answers `/api/geo` with `cf-ipcountry: ET` so a test
  that asserts a market prefill established it itself (PW-11, PW-20; PW-20 also
  states the `ethio_area` cookie).

### Deferred to M-MAINT-3

D24 — CONDITIONAL ATTRIBUTES (a detail that only appears when another detail
holds a given value) needs a per-link condition in the schema, which is a
migration; the folds above are the option-level half of that idea, not a
substitute.

## U6-C1-R3b-1 — review, the buyer's eye, and the layers

**EDIT COMES HOME TWICE.** An Edit link on review opens the step it names and
that step carries a `Back to review` action (`post-back-to-review`): Next returns
to review after judging the step, Back returns without claiming anything. Both
use the secondary-button tokens, because a transparent outline on the card read
as disabled beside the filled Next.

**A CATEGORY CHANGE IS A RE-VALIDATION.** Choosing a different leaf on a draft
that already carries answers reads BOTH schemas — the old one only to LABEL what
is leaving — drops every attribute the new category never asks, and reopens the
specifications step with a notice (`post-category-changed`) that NAMES the
dropped details (`post-category-dropped`). Photos are never deleted: they are
FLAGGED for a re-check (`post-category-photos-recheck`), because the fit rule
runs again at publish (D21). Silence here would mean publishing facts under
labels the category never offered.

**THE DROP IS SAVED BY A REWIND, NOT A CLAIM.** `draft.saveAt` only ever RAISES
the step claim (INC-228), so a category change saves through `draft.rewindTo(1)`:
the claim falls back to step 1, where the door validates the category alone and
accepts the emptied attribute map. And the save reads its values from the values
REF, which is now advanced SYNCHRONOUSLY inside `change()` — a React state
updater runs at render, so a save fired in the same turn as the change used to
send the PREVIOUS answers and the dropped details travelled straight back into
the row (PW-26).

**PREVIEW AS BUYERS SEE IT.** `post-preview-open` opens a full-screen sheet
(`post-preview-sheet`, portalled, Escape closes, body scroll locked) rendering
the listing DETAIL: gallery or the ancestor illustration, title, price with
currency and period, the places, the details table BY LABEL, the description, the
seller block (alias, and the business name for a business) with the shown
channels, and the map area placeholder. It lives in
`src/features/posting/preview/` (`listing-detail.tsx` + `preview-sheet.tsx`) and
U7 MOUNTS THE SAME COMPONENTS on the public listing page — the wizard's preview
and the buyer's page cannot drift, because they are one component.

**THE LAYER ORDER IS DECLARED ONCE** in `src/components/layout/layers.ts`:
sticky action bar (`z-20`) < popover/listbox/menu (`z-40`) < sheet (`z-50`). Two
components each choosing `z-10` let source order decide, and the bar won — a
seller tapping a currency hit Next underneath it (LY-6).

**THE MOBILE STEP STRIP** (`post-step-strip`, `lg:hidden`) is the desktop rail
laid on its side: eight numbers, ticks behind, the current one LABELLED,
horizontally scrollable at 360. Only steps already reached are buttons; a step
with nothing to show is a plain number, never a tappable lie. The desktop aside
is unchanged.

**STEP 7 NAMES (D17).** First and last name sit above the seller type and reach
`save_posting_identity`'s `p_first_name`/`p_last_name`. A person must be named;
a business must carry a business name and may leave the names empty. The door
owns both rules — the screen mirrors them. The review's seller line shows the
business name (or the alias) before the channels.

### The plan document (D22) — both doors exist since M-MAINT-3

`get_posting_schema` returns `plan` = `{ plan, max_photos, max_cities,
max_regions, max_countries, allow_everywhere }` for the CALLER
(`plan_caps(seller_plan(auth.uid()))`; plans are not per-seller yet, so
`seller_plan` answers `free` for everyone). The Plans editor's write door
`admin_set_coverage_plan` now takes `p_max_photos smallint` (0..30, refusal
`badMaxPhotos`); an ABSENT cap means no change — the stored cap for an existing
plan, the column default for a new one. The photos step should therefore read
its cap from that ONE document instead of `MAX_PHOTOS_PER_LISTING`; that screen
change landed with R3b-2 Part 2a: the wizard holds the plan block from the same
schema read and hands `plan.max_photos` to the photos step and to the review's
step-2 line — `MAX_PHOTOS_PER_LISTING` is DELETED, there is no second dial. Until
the document arrives the caption is absent rather than quoting a cap nobody
granted (F4), and the upload door's own count stays the authority (F3). PW-29
asserts the caption follows the served document (plans are not per-seller, so it
cannot yet assert a per-seller cap); CV-7 round-trips a scratch plan's cap
through the Plans editor.

### Conditional questions (D24) — since M-MAINT-3

Every attribute row in the specification read carries `visible_when`: either
`null` or `{ "key": "<sibling attr_key in the same category>", "in": [ … ] }`
(at most eight values). The rule the wizard mirrors is the DOOR's:

- the condition is MET when the sibling's current answer is one of the listed
  values (a single value, one of a multi-select's values, or an `other`
  object's `value`);
- a question whose condition is NOT met is NOT ASKED and is never required —
  `validate_listing_attributes` treats it as absent, so it can never refuse
  `required` for a hidden question;
- an answer sent for a hidden question is DROPPED from the normalised attrs, so
  it is never stored. Changing the sibling back therefore never resurrects a
  stale answer from the row.

The FORM's half (R3b-2 Part 2a): visibility is recomputed on every change, a
question whose condition is unmet is not rendered, is not reported as a field the
step requires, and any answer it still holds is cleared from the draft — so
nothing unasked is ever sent. PW-28 walks petrol → no charging question →
electric → the question appears → petrol again → the answer is gone from the
screen AND from the row.

The screen must hide the control (not merely disable it) and keep sending
whatever the seller typed — the door decides what survives.

## INC-237 (R-CLEAN) — THE MARKET IS NEVER GUESSED FOR THE SELLER

The where step's market control used to fall back to the FIRST open market while
the prefill chain was still resolving, so a seller with a slow guess read saw a
market they never chose standing as their answer — and, because the cascade below
follows the market, a place in the wrong country one tap away.

The control now renders an unvalued **"Choose one"** option (`post.where.marketChoose`)
until the chain — the saved-area cookie, then the edge's guess (`/api/geo`,
DEC-068) — resolves a market that is OPEN. Only then does it take that market.
There is no first-option fallback. When the chain resolves to nothing, the
control stays on "Choose one" and says why in its own caption
(`post.where.marketUnresolved`, `post-where-market-unresolved`); a saved market
that is no longer open is cleared along with the cascade rather than left
standing.

PW-31 proves it: `/api/geo` is delayed three seconds, the select is asserted
EMPTY for those seconds and `ET` afterwards. The first open market in the rail's
order is AE, so a first-option fallback would fail the empty assertion.

PW-30 carries an EVIDENCED budget: the full eight-step walk was measured at 86 s
on mobile-360 under four workers, and `test.setTimeout` is twice that
measurement, stated in the test beside the number. Every read inside it is
bounded at 20 s and names the wait it lost.

## A model change resets what the model speaks about (D25, INC-240)

A detail the seller never typed but the chosen option supplied is held apart from
one the seller wrote: the form remembers WHAT IT PREFILLED, per detail. When a
parent option changes — make → model, model → its facts — every prefilled detail
the seller has not since edited is re-derived from the NEW option's facts, and a
detail the new option says nothing about goes EMPTY rather than keeping the
previous model's answer. Conditions re-evaluate and `allowed_options` re-narrow in
the same pass, so a value the new parent no longer offers is cleared.

**D25 (U6-C1-R3b-3b) REPLACES R3b-3a's survival rule for a MODEL-DEPENDENT
detail.** The walk showed why: a Golf's door count left standing under a Corolla
is a listing that lies, whoever typed it. So on a make or model change EVERY
detail that model speaks about — a fact it fills, a bound it sets (the year), a
condition it decides — is reset to the new option's prefill or to empty,
REGARDLESS of a seller edit; and a detail NO option anywhere names (mileage,
colour, condition, plate) keeps the seller's answer untouched.

The reset is never silent (F4): a translated caption names the new model and
offers Undo for ten seconds, restoring the previous answers in one tap. A
restored answer becomes the SELLER's — it is only handed back to the model when
it still matches the current fact — so the next reconciliation cannot overwrite
what the tap just restored. PW-32 walks all of it in one form: a typed year and a
prefilled body under one model, both re-derived under the next, the mileage
surviving, and Undo putting the previous answers back.

### A make change starts over (D25b)

The MAKE is the root of the cascade — the picker other pickers hang under which
hangs under nothing itself. Changing it does not adjust an item, it names a
DIFFERENT item, so every detail on the form clears and re-prefills from the new
make's own facts: the seller's answers included, mileage and colour and all. Only
the moved answer itself survives. The same ten-second Undo offer covers it.

A MODEL change keeps D25's narrower scope (the details some option speaks about).
A parent emptied by the narrowing pass — its own parent moved, or an Undo put back
an answer the new parent cannot hold — is NOT a new choice and cascades no second
reset, so an Undo is never undone by the pass that follows it. The model itself
cannot come back through Undo when the make moved: it hangs under the previous
make, and the narrowing clears what the new one cannot hold. PW-32 asserts that.

## A year is a picker, not a number box

A number detail declared `format = 'year'` renders as a select from its EFFECTIVE
floor up to next year, newest first, behind a "Choose" entry. The door's bounds
remain the authority (F3); the picker simply cannot reach outside them, so there is
no negative year and no free text.

**EFFECTIVE bounds come from every chosen option (INC-242).** A field's bounds are
its definition's own, narrowed by the `bounds` of EVERY option currently selected
anywhere on the form that names this field's key — not only the option it hangs
under. A floor written on the unit picker's option applies to the year although
the year depends on nothing; two floors intersect at the HIGHER one, never the
looser. One resolver serves the picker, the numeric field's `min`/`max`, the bounds
caption and the local judgement, so they cannot disagree. PW-25 proves it with the
floor on a sibling's option.

## A colour is seen, not read (D26)

A single-select detail whose key names a colour (`/colou?r/`) renders its options
as SWATCHES beside the picker: 44-pixel labelled buttons, each painted with the ink
the catalogue value stands for, the picker itself kept as the accessible control
and the door's vocabulary. The value→ink map is DATA in `colour-swatches.ts` (the
catalogue's own colour words), not theming — a design token cannot say what colour
a car is. A value the map says nothing about, `other` included, renders a NEUTRAL
RING rather than an invented colour (F4), and is still offered and still labelled.
A colour's options load eagerly, because the swatches ARE the control's face.
PW-34 asserts the painted swatch, the neutral one and that a tap answers the
detail.

## D28 / M-SWATCH — the catalogue may say the colour itself

A name lookup can only paint a colour it recognises, so an option gains an
OPTIONAL `swatch` cell that says what the colour IS, in exactly three spellings:
`#RRGGBB` (one ink), `#RRGGBB|#RRGGBB` (a two-tone, drawn as a diagonal half and
half) and `pattern:<tabby|brindle|calico|tricolour|multicolour|striped>` (a simple
patterned tile). `attr_option_shape` validates the cell at the door and refuses
anything else BY NAME (`badSwatch:red`, `badSwatch:#GGG`,
`badSwatch:pattern:plaid`, `badSwatch:empty`, `badSwatch:notString`);
`attr_option_norm_v2` carries it into the import DIFF, so a file whose only change
is a swatch plans as `changed` rather than reading as applied and landing nothing
(F4, the INC-239 law for `facts`); `get_attribute_options` projects it.

THE DECLARED CELL WINS, THE NAME IS THE FALLBACK: `optionSwatch()` reads the cell
first and only then the value's own stem (INC-259). An option that says nothing and
whose name means nothing renders NO tile, and a list where nothing resolves renders
no tray at all. PW-45 walks a scratch colour detail whose values are deliberately
not colour words and asserts the three tile kinds, the missing fourth, and that a
tap still answers the detail.

## INC-260 (follow-up) — whose list is this?

A dependent list finds its parent by COVERAGE, not by the first match. The
published Vehicle Hire leaf asks a vehicle-type question first, and that question
offers `other`; the car-model library files one model under a parent called `other`
too — so the type question looked like the model's parent and every make left the
list empty. The owner is now the candidate select that covers the MOST of the
list's parent values (an already-answered candidate breaking a tie), which at
Vehicle Hire is the make (43 of 45 parents) and never the type question (1 of 45).
PW-44 carries that shape: a decoy first question offering `other`, a model filed
under `other`, and the assertion that the stray model never joins a chosen make's
list.



## U6-C1-R3b-4 — the map pin

A pin is OPTIONAL for every category and it is NOT part of the draft's autosave:
it has its own four columns (`pin_lat`, `pin_lng`, `pin_precision`,
`street_address`) and its own door, `set_listing_pin`, which is owner-gated and
clears all four when it is called without coordinates. So the pin is saved when
the seller says Save, and removed when the seller says Remove — never as a side
effect of typing somewhere else.

**The control** (`src/features/posting/map/map-pin-dropper.tsx`) opens from the
where step behind "Add a map pin (optional)". It is a LAZY chunk: Leaflet is
dynamically imported, never statically, both because the package ships a UMD
build that touches `window` (SSR would crash on it) and because the marketplace
must not download a mapping library to show a feed. The first-paint budget guard
proves it stayed off the entry (`scripts/check-bundle-size.mjs`).

Inside it the seller can: search a place, tap or drag the marker, use the
browser's own location (a refusal is answered in words, never silence), switch
between the street and satellite layers (both attributions kept), edit the
street line the reverse geocoder filled, and choose between showing the exact
pin and showing an approximate area. Controls are 44 px and the map fits the
card at 360.

**The geocoder is ours, not the browser's.** `/api/geo/search` and
`/api/geo/reverse` are the only callers of Nominatim, in this order: a bearer
and a real user (never anonymous) → the dial
`consume_rate_limit('geocode', <user>, 60, '1 hour')` BEFORE any outbound call →
a 24-hour in-process cache keyed by the query → a shape of our own
(`label`/`lat`/`lng`, or a single `street`). A spent dial is the door's own
word, `rateLimited`. `E2E_FAKE_GEOCODE=1` answers from a fixed table so the
suite never depends on an upstream service.

**Approximate means approximate.** The buyer-facing still map
(`map-preview.tsx`) draws a 500 m circle around a centre SNAPPED to a 0.005°
grid for an approximate pin, and a marker only for an exact one — the exact
point of an approximate pin is never sent to the drawing, not merely hidden by it.

Tests: PW-37 (tap → `exact`, the row agrees with the screen), PW-38 (search →
the marker moves and the street line fills), PW-39 (`approx` → the preview draws
the circle and no marker), PW-40 (Remove clears all four columns), PW-41 (the
61st call in an hour is `rateLimited`).

## Catalog text language rule (R-HELP / INC-253)

Attribute labels, help text, option labels and units use one rule everywhere in
the wizard, review and buyer preview: `catalogText(en, am, lang)` returns the
non-empty Amharic value when the active language is Amharic, otherwise English.
The posting schema carries `name_am` and `help_text_am`; units currently have no
Amharic database column, so they deliberately take the English fallback branch.
PW-42 proves Amharic help and option labels as well as per-field English fallback.
