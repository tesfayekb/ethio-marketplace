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
   what a resume trusts. A resume opens at the first unfinished step of the
   walk, never past what this landing can honestly render.
4. **A refusal is not a failure.** Refusals render beneath their named field and
   are not retried; only unreachability is.

**The order (D39, 2026-09-24).** The seller walks category → specifications →
photos → details → price → place → contact → review (`SEQUENCE` in `types.ts`);
the door's numbers do not move (`draft_step`, `p_step`, `post-step-<n>`: 1
category · 2 photos · 3 specifications · 4 details · … · 8 review). Next/Back,
both rails, the phone strip and "Step N of 8" read positions in the walk. One
predicate decides "finished": photos are finished when one is registered or the
draft reached details (`draft_step >= 4`), since photos are optional and never
door-recorded; every other step when `draft_step >= step`. A resume opens at the
first unfinished step, so an old-order draft at `draft_step 2` reopens on
specifications with its answers intact. Autosave is capped at the previous step
of the walk. Acceptance: `PW-54`.

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

D30/D33 — THE ORDER OF A LEVEL. A level reads: the host's OWN children first (a
primary pointer), then the GUESTS it surfaces, and any catch-all — a category whose
slug opens with `other-` — last of all, at every level and on the root rail.
Within each of those bands the order is the POINTER's `display_order`, then the
pointer's age, then the category's own display order, so a curator orders a guest
where they want it without touching the category it belongs to; a pointer with no
order of its own simply lands after the primaries. The crumb still names the
primary home (the first pointer), which is the trail the export writes. PW-47
seeds a host with two children of its own and a guest whose own order sorts it
first, asserts the level reads own-own-guest, and then reads a real host's level
read-only to assert its catch-all is last.

The tree is VERSION-KEYED, not pinned (INC-263). It used to be read once per visit
straight from the browser into a module cache with no expiry, so a curator's
categories import was invisible until the tab was closed — the console showed
baby-food under food-drink while the wizard's tree had neither the row nor the
re-parenting, an hour later. The tree now comes from `/api/categories/tree`, which
stamps it with `get_category_tree_version()` (an md5 over the categories and their
pointers: latest change, row count, live count, latest pointer, pointer count) and
serves that stamp as the ETag, allowing the browser 60 s with
`stale-while-revalidate`.

INC-265 — THE HOLD IS THE BODY, NEVER THE STAMP. The first landing also held the
STAMP for 15 s on each side of the wire: the route answered from its process-wide
cache without asking the database, and the reader trusted a held tree for the same
span without asking the route. On one process serving many readers — the built
node serve the suite runs, and equally a warm worker — a category created a moment
earlier was therefore absent from the tree for up to fifteen seconds, and this was
the DRIFT-class red on run 35691977174: 48 post-wizard failures whose category step
had no list for the scratch category the test had just seeded. The stamp is now
asked on EVERY request and EVERY mount (a short read-only read, and a 304 on the
wire); only the BODY — the two tree queries — is reused while the stamp is unmoved,
which is where the saving always was. An unmoved version hands back the SAME tree
object so nothing re-renders for nothing (I3), and a failed revalidation keeps the
last good tree rather than emptying a screen that had rows (F4). PW-46 opens the
wizard FIRST, creates a category with a secondary parent and finds it under both
roots after ONE return visit; PW-44 finds a surfaced host root on the FIRST load.
Both wait for the CLIENT-fed level list to render before counting, because the tree
read runs after hydration (J7) — but neither polls over repeated visits any more:
that polling was covering the staleness this fix removed.

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

Bundle 7 B1 (INC-451): a number answer and both ends of a settled range are written with grouping separators in the price's own form (`numberText` in attribute-display.ts, no rounding); a year, an option label, a text answer and the input box itself are not reformatted.

## Step 4 — title, description, and the assist (C1b)

The seller writes the title (≤120), the description and an optional YouTube
link. `post-assist` calls `/api/listings/assist` (DEC-072) with the category and
the answers from step 3; what comes back is a SUGGESTION dropped into both
fields as ordinary editable text, never an author — the seller's edit is what
saves.

Bundle 7 B3: when the leaf's first question is a required text question with no card rank, its trimmed answer leads the built title (up to 70 characters, cut at a whole word), and a choice whose label holds the `{country}` token is left out of the built title.

## Autosave is not an exam (INC-228, INC-227)

A save is never sent below step 1 (INC-465). The door refuses a step below 1, and two writers of the save queue could lower it to 0 (going back to step 1, and an edit made while step 1 is on screen). The floor sits in the one sender: a save queued below 1 is sent as step 1 when the draft has a category (the door judges the category only and stores the rest, as any autosave at the last completed step does); with no category it is not sent and stays queued for the next claim.

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

Bundle 7 B4: an autosave the server failed on (`doorError`) shows "Not saved yet", keeps its step queued and retries after RETRY_MS, at most three times for the same answers; an edit starts the count again, and every other refusal of an autosave stays silent.

## The save queue

Every save — the 2-second debounce, a tap, and `Next` — joins ONE chain. A
`Next` that arrives while an autosave is still in the air waits for it and then
sends the latest answers; a change made while a request was in flight stays
pending and runs again straight after. Before this, such a collision was dropped
on the floor: the seller's last edit never reached the door and the step did not
advance.

INC-366 — a `Next` is answered by ITS claim's verdict. When an autosave was in
the air, that autosave's follow-up pass carries the claim; if the door refuses
it, `saveAt` returns false even though its own run then finds nothing queued.
Before this, Next advanced past a refusal (PW-103).

INC-357 N1 — a single admissible "Other" keeps its write-in: the one-answer
fill compares the chosen value, so `{ value: "other", text }` is never flattened
back to `"other"` (PW-102). Tests: `e2e/post-wizard-details.spec.ts`.

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

Bundle 7 B2: while the currency list (and the phone-code list) is open, the current choice is drawn first with a check mark, whether or not it matches the search, and is not drawn twice.

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
off-site return · `PW-15` the entry lives in My Listings and not in Account, and
the shell keeps My Listings active (tab and menu) on `/post` and `/post/<id>` —
the shell's route→panel derivation owns `/post` (operator walk 2026-09-18).

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
- **A definition's own bound speaks the door's vocabulary (INC-288).**
  `resolveBound` (attribute-display.ts) resolves `min_bound` / `max_bound` as
  `attr_bound_value` does: a literal is itself, `year` is the current UTC year,
  `year+N` / `year-N` offset it, anything else is no bound. The year picker runs
  from the resolved floor (else 1900) to the resolved ceiling (else next year),
  with no clamp to next year when a later ceiling is stated. PW-25.
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
`save_posting_identity`'s `p_first_name`/`p_last_name`. Since M5 (bundle 4 step 22) the door refuses at
`p_step` 8 a seller with no public name and a person with no first name; a
named business passes. The door owns these rules — the screen mirrors them. The review's seller line shows the
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

## A changed answer resets only what depends on it (DEC-144 rule 1, Bundle 7 Part A)

One rule, one pure function: `src/features/posting/reset-scope.ts`
(`dependencyMap`, `resetAfterMove`), called by the details step's reconciliation.

**What "depends on" means.** Question D depends on question P when P's answer
decides something about D: D's list is folded under P (`parent`), an option of P
fills D (`facts`), sets D's bounds (`bounds`) or narrows D's list (`allowed`), or
D's condition names P (`visible_when`, either pair). The identity (card 1) is a
question like any other: it resets only what depends on it.

**The four cases**, for every D that depends on the moved P:

1. D is hidden under the new answer — D stores nothing.
2. The new option fills D (a fact) — D takes that value, marked as the form's.
3. D holds the form's untouched answer (an old prefill) — it goes with the old
   choice: back to the link default, or empty.
4. D holds the seller's own answer — kept when it still fits (in the new list,
   inside the new bounds; a multi-select keeps the picks that fit), cleared when
   it does not.

**Followed through.** When D itself changed, what depends on D is judged the same
way (brand → model → what the model filled). Every question that does not depend
on the moved answer is neither read nor written.

**Undo.** A pass that changed anything offers Undo for ten seconds, restoring the
answers as they stood before the move in one tap; an Undo of an identity move puts
the identity itself back. A hide made by the condition's own sweep as the answer
is chosen leaves the pass nothing to change, so it offers no Undo (PW-59).

- D25b (a make/identity change starts the whole form over) is retired by DEC-144.
- D46 (Undo after an identity reset restores the whole earlier form) is retired by DEC-144; Undo restores what the pass changed.
- D47 (the identity as the one whole-form root) is retired by DEC-144.
- DEC-139 is absorbed: its scoped resets are cases of the one rule.

Tests: `reset-scope.test.ts` (each clause on a scratch shape); PW-164 to PW-168,
with PW-59, PW-60, PW-163, PW-32 and PW-22 amended to the rule; PW-162 (e) proves a
basis emptied by a type's `allowed` list leaves no refusal on Specifications.

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

## An "Other" leaf is a posting target (D34)

A catch-all leaf (`is_catchall`, listings allowed, no children) is the answer a
seller reaches for when no named leaf fits, so it is selectable and postable.

Two places used to refuse it, and both dropped the exclusion in one landing:

- `isPostable` in `src/features/categories/category-tree.ts` is now
  `isLeaf && allowListings`. `isCatchall` stays, but only for BANDING (D30 puts
  an `other-` row last on its level) and for the admin filters — never as a
  posting ban.
- `validate_listing_draft` (Tier A, the only authority under F3) lost the
  `OR v_cat.is_catchall` disjunct from its step-1 gate. A FOLDER
  (`allow_listings` false) and a non-leaf still refuse `categoryNotPostable`.

PW-48 walks the whole flow on a scratch catch-all leaf and asserts the listing
reaches screening.

## A settled answer is a strip, not an input (D35)

When a chosen option's fact SETS a sibling and that option's `allowed` narrows
the sibling to that single value, the answer is no longer a question: the
specifications step renders one line — label, value, "Set by your choice" — and
spends no input on it. "Change" reveals the control, still narrowed and locked,
for the seller who wants to see it.

A PREFILL-ONLY fact (the fact writes, `allowed` stays open) keeps its normal
prefilled input and its "from the model" line: the seller still has a choice to
make. Stored values and the door's validation are identical in both shapes —
this is presentation only.

Tests: PW-35 (the settled shape, and Change bringing the locked picker back),
PW-49 (the prefill-only shape keeps its input and grows no strip).

Superseded on the form by D44 (2026-09-25): a settled answer is stored, not
rendered.

## A settled answer is stored, not rendered (D44, 2026-09-25)

When the chosen options leave exactly one admissible answer for a single-select
sibling and the reconciliation has written it, the specifications step renders
nothing for that row — no control, no strip, no "Change". The value still travels
in the draft, the review and the buyer preview still show it, and the door judges
it unchanged (F3). The D35 strip, its "Change" reveal and its two keys are retired.
A prefill-only fact keeps its input (PW-49 unchanged). Test: PW-35.

## Year labels under Amharic (D45, 2026-09-25)

One formatter, `yearLabel(year, lang, suffix)` in `attribute-display.ts`, labels
every `format = 'year'` value: under Amharic "<GC> · <GC−8>/<GC−7, two digits>
ዓ.ም" (a Gregorian year spans two Ethiopian years: 1 Jan – 10 Sep is GC−8, 11 Sep
– 31 Dec is GC−7), so 2027 reads "2027 · 2019/20 ዓ.ም"; elsewhere the bare year.
The year picker, the review line and the buyer preview all use it; the suffix is
the key `post.specs.yearEcSuffix`. The stored value is the Gregorian integer.
Test: PW-58.

## The identity starts the form over (D46, 2026-09-26)

- `AttrDef.cardRank` carries `get_posting_schema`'s `card_rank` (no migration — the read already served it).
- The single_select detail with `cardRank === 1` is the leaf's identity. It joins both `parents` and `roots`, so changing it is a D25b root change: every other detail restarts (the seller's own answers included), the new option's facts and the link defaults (INC-245) fill what they fill, and the ten-second Undo offer names the new option.
- (Retired by DEC-144, Bundle 7 Part A — see "A changed answer resets only what depends on it".) Undo after an identity reset restored the answers as they stood before it — the previous identity and the details it had shown — from the last pass in which no parent moved. Other Undo offers are unchanged (a make change still keeps the new make).
- A card-2/3 change keeps D25's narrower scope. PW-59 proves both sides on scratch rows.
- D45 part 2: `attributeDisplayValue`'s `yearSuffix` is required, and the buyer sheet passes `post.specs.yearEcSuffix`; PW-58 reads the label in the sheet too.

## Only the identity restarts the form (D47, 2026-09-26)

(Retired by DEC-144, Bundle 7 Part A: there is no whole-form root any more.) The whole-form reset root was the leaf's identity (the card-1 select) and nothing else. INC-291: the old D25b rule also made every top fold owner a root, so a size-system change on clothing or shoes, or a make change at Vehicle Hire where make is not card 1, wiped the whole form. A fold owner that is not card 1 stays a D25 parent: its fold child is cleared by the narrowing pass, details its options speak about are re-derived, and the seller's own answers stay. The fold fixtures (seedFoldSet, seedDeepFoldSet, seedFactShiftSet) now link their make/brand as required card 1, the catalog's shape, so PW-32 and the INC-245 test keep their assertions. PW-60 proves a non-identity system change clears only its size and an identity change still restarts everything.

## Every row open (D41, 2026-09-24)

The specifications step shows every row the category asks, open, in `display_order`, with nothing behind a tap: sellers skipped the D36 "More details" expander, so the operator removed it (D41). The (i) help split (first sentence inline, the rest behind the tap) and D35's locked-fact strips are unchanged. History: D36 first hid a trailing run of optional rows, INC-269 restored display order and narrowed the cut, and INC-271 made the form publish `data-options="1"` once its option lists settle, a marker readers still wait on.

## D38 / D40 — category icons and the menu treatment in the picker

The step-1 picker renders the category's stored lucide name (projected by the tree read as `icon`) before its label through `categoryGlyphOrNull`: absent → no glyph, no gap; unknown → no glyph, logged once per name. Tiles and crumbs use the marketplace rail's hover and selected tokens (`sidebar-accent`), a visible focus ring, ≥44 px targets and logical properties; the chosen leaf carries `aria-current`. PW-52 proves a glyph for a folder with an icon name and none for a leaf without one.

## INC-277 — Back while the category filter holds a term

The wizard owns the category filter term beside the tree cursor. Back, in order: clears a non-empty filter (the level returns); climbs one level; leaves the step. Back is closed only at the roots with an empty filter. PW-53.

## D31-C — pricing basis in the wizard (DEC-079)

- A leaf with ONE `pricing_type-*` / `unit_of_sale-*` definition lets the seller's answer decide the price shape (`price-basis.ts` mirrors `price_shape_for_basis`; `price-basis.test.ts` pins the mirror to the SQL).
- Step 5: a derived period is never chosen — `post-price-period` is absent and `post-price-period-fixed` carries `data-period`; the amount label reads "Price per <basis option label>".
- Commission: `post-price-commission` takes a percent (0.01–100), stored as `listings.price_bp` (basis points); no currency, no amount. Never inferred from a null amount.
- Refusals `periodFollowsBasis`, `modeFollowsBasis`, `commissionNotOffered`, `priceBasisAmbiguous` show locally on blur and are repeated by the door.
- `publish_listing` re-checks the stored `price_bp`; `edit_listing` takes and writes `p_price_bp`.
- Tests: PW-55 (commission), PW-56 (hourly → per_month), PW-57 (per_quintal), PR-10 (the door's refusals by name; a 20000 bp is refused by `listings_price_bp_check`).

## TURN A — copy and refusal fixes (INC-297, INC-294, INC-301, D58)

- **INC-297** — a basis option label carries its own "per" ("Per Kg", "በኪሎ"). `basisNoun` (price-basis.ts) removes one leading "Per " or "በ"; the wizard derives the noun once and every template keeps its own "per". A label with neither prefix (a shape-only basis such as Quote or Commission) has no noun, so no "per" line is rendered.
- **INC-294** — `firstSentence` does not end a sentence after e.g / i.e / etc / vs / approx / cf; Amharic `።` is unchanged.
- **INC-301** — commission mode refuses an empty percentage (`price_bp` · `required` → "Enter your commission percentage.") and a value outside 1–10000 bp (`commissionRange`). The draft route maps the door's `listings_price_bp_check` error to `{ field: "price_bp", reason: "commissionRange" }`; every other door error is unchanged.
- **D58** — `useDraft.nextBlockedByTransport` is set by a strict (Next) save that ended unreachable and cleared by the next successful save or an edit; the wizard shows the "Not saved yet" caption under the Back/Next row (`post-next-unreachable`).

## D59 — a category change resets the category-shaped answers, with Undo (2026-09-27)

Choosing a different leaf on a draft resets, in one change, every answer the category shapes: all details (typed ones included — INC-248's chosen-option drop is subsumed), title, description, video link and price (mode back to the fresh-draft `fixed`, amount/currency/period/commission cleared). Photos, place and contact are never touched. One sentence (`post.category.changedReset`) with an Undo button (`post-category-reset-undo`, key `post.specs.resetUndo`) shows on the specifications step; the offer lives ten seconds from the change. Undo restores the snapshot (previous category included) in one change, then rewinds to step 1 and reopens specifications. `post.category.changedCleared` is retired.

INC-299 — the assist route's `triesLeft` is the `remaining` count of `consume_rate_limit`'s own answer; the route no longer reads `rate_limits`. INC-298 hygiene: the options cache is capped at 512 entries (least recently checked evicted), and import rate buckets idle over an hour are pruned.

## DEC-081 — Negotiable is a flag; the basis is judged on the price step (D62-1, 2026-09-28)

- `listings.price_negotiable` (boolean, default false) replaces the retired `negotiable` price mode; `listings_price_mode_check` allows `fixed`, `free`, `contact`, `commission` only. Existing negotiable rows (0 on production) became `fixed` (amount set) or `contact` with the flag.
- `validate_listing_draft`, `submit_listing`, `edit_listing` take `p_price_negotiable` LAST (default false); `publish_listing` passes the saved flag; the flag is forced false on `free` and `contact`; a basis answer `negotiable` sets it and prices as `fixed`.
- `validate_listing_attributes` takes `p_defer_keys`; before step 5 the pricing basis keys are deferred, and at step 5 a missing required basis is refused once (`{attr_key, required}`).
- `currencies.symbol` and `currencies.display_order` (seeded for 28 codes; others show the code, order 900).
- `impersonated_list_listings` returns `price_negotiable`. Route: `/api/listings/draft` sends `priceNegotiable === true`. Test PR-11. Mark 20260928040000.

## D62-2 — the price page (DEC-081, client half, 2026-09-28)

- **The basis is asked on the price step.** Step 3 draws the specifications form without the leaf's pricing-basis row (`exclude`); step 5 mounts the same form with `only=[basisKey]`, first on the page, so option loading, the door's refusal under the control and the answer shape are unchanged. The borrowed row runs no reconciliation and no link-default pass — step 3 owns those — so choosing a basis never restarts the other answers. Step 5's general refusal list omits the basis key (it is shown under its control).
- **Negotiable is a toggle, not a mode.** The modes are fixed · free · contact · commission (· the forced basis modes). "Price is negotiable" (`post.price.negotiableToggle`) shows for fixed and commission; choosing free or contact clears it, and the save sends `priceNegotiable` only for those two modes. A `negotiable` basis token turns the toggle on. `post.price.mode.negotiable` is retired.
- **The badge.** `NegotiableBadge` (listing-card.tsx, `price-negotiable-badge`) renders beside the price on the feed card, review summary, review preview, preview sheet and the impersonation listings table; the feed reads `price_negotiable`.
- **Currencies.** Rows carry `symbol` and `display_order`; each reads "CODE · symbol — name". The list and the short list open on the seller's home currency, then `display_order`, then code (ETB, USD, … for an Ethiopian seller). The preselect is saved → last listing → home → edge guess → ETB.
- **Proofs.** PW-63 (basis on step 5, refused there, shapes the period), PW-64 (flag stored, badge on review, contact clears it), PW-65 (home first, USD second, symbols); PW-55/56/57/58 answer the basis on step 5; unit: `orderCurrencies` / `currencyText`.

### DEC-081 hotfix — "negotiable" is an alias at every step (D62-1b, INC-309)

A pre-D62-2 client still sends `price_mode: "negotiable"`. `validate_listing_draft` resolved it only at step ≥ 5, so a save from steps 1–4 stored the raw mode and `listings_price_mode_check` threw; the route answered `field: "door"` with the raw message and the wizard printed it. Now (mark `20260928060000`) the door resolves the alias at the top of the function: `negotiable` → mode `fixed` with `price_negotiable = true`, at every step. The retired mode stays out of `PRICE_MODES` and the constraint. The draft route maps `listings_price_mode_check` to `{ field: "price_mode", reason: "badValue" }` and every other unmapped door exception to `{ field: "door", reason: "doorError", detail }`, which renders `post.refusal.doorError`. Proofs: P8/P9/P10 in the migration; PR-12, PW-66.

### D62-1c — refusal summary and test handler order (INC-311, INC-313)

- The refusal summary lists only refusals that name a control. Refusals against the request itself (`door`, `residency`, `id` — `CONTROL_LESS_FIELDS` in `field.tsx`) are left out; their words already render as post-refusal paragraphs.
- E2E rule: a test-level `page.route` on a path `asEdge` covers must `route.fallback()`, never `route.continue()`, or the edge country header is lost.

### D62-1d — a draft's percentage may be absent (INC-312)

Choosing the commission basis stores `price_mode = 'commission'` before the seller types the percentage; the step-4 autosave used to violate `listings_price_pair_check`. The constraint (mark `20260928090000`) is now `(price_mode = 'commission' AND price_amount IS NULL AND price_currency IS NULL) OR (price_mode <> 'commission' AND price_bp IS NULL AND ((price_amount IS NULL) = (price_currency IS NULL)))`. The step ≥ 5 door still refuses `{ price_bp, required }`, so nothing publishes without it. Proofs: P11–P13 + read-back in the migration; PW-67, PR-13.

- D62 / INC-315 — a strict (Next) save that is refused also drops the pinned step claim (`pendingStepRef`), so Back → Next from photos judges its own step instead of re-judging details (PW-68).

### INC-317 — a late writer is queued at the step on screen (2026-09-28)

- Mechanism: the price step's currency prefill resolves asynchronously and writes through `change()`. That callback closed over the step that created it, so an answer landing after a D59 rewind computed its autosave claim from the closed price step (`prevOf(5) = 4`).
- The queue kept the higher claim, and the next save went out at step 4 with the reset (empty) title, refused as `title required`; the wizard stayed put (the PW-61 flake).
- The one guard: `use-draft.ts` holds `stepRef`, set beside every `setStep` (`goTo` and the resume path); `change()` computes the backup step from `stepRef.current`, so a late write can never claim a later step.
- The late prefill write is kept on purpose: it mirrors into the wizard the currency the door itself fills at step 5, until INC-321 reads the door's answer back.
- PW-72 gates the seller-home read, resets the category, releases the read and asserts no save claims above step 3, then Next opens photos with no refusal.

### INC-321 — the door's answer carries the stored currency (2026-09-28)

- **Why:** at step 5 the door fills a missing currency from the seller's home and stores it, but `submit_listing` answered only `{ok, listing_id, draft_step}`, so the wizard's own copy stayed empty until the async prefill landed. A D59 Undo before that restored an amount with no currency and the step-1 save was refused (`listings_price_pair_check`).
- **Door:** `submit_listing` (migration `6b0f6ae1`, mark `20260928100000`, whole redeclaration) answers `price_currency` — the value on the stored row, the door's own home fill included; `null` when no price carries one.
- **Mirror rule:** `use-draft.ts` `pass()` fills `priceCurrency` from the answer only when the wizard's copy is empty. A mirror of what the door stored is never a new answer: no version bump, no pending step, no save-state change, no flush.
- **Tests:** PW-73 (home read gated throughout; the mirrored code survives a D59 reset + Undo); PR-14 (step-5 fixed without a currency answers a 3-letter code equal to the stored row).

### INC-320 / D70 / D71 (2026-09-28)

- **INC-320 — an answered big list is read up front.** DEC-053 amended: a list over `EAGER_OPTION_LIMIT` stays lazy, but a select that mounts WITH a stored answer requests its list once per key per mount (`step-specifications.tsx`, effect beside the eager one, keyed on which selects are answered), so the chosen option's label shows on re-entry instead of the placeholder. Test: PW-69 (210-model scratch list).
- **D70 — focus the first refused field.** After a strict refusal, `focusFirstRefusal` (`field.tsx`) keeps the control-bearing refusals this step owns and focuses the first in document order (block center); one effect in `wizard.tsx` keyed on `draft.refusals`. Control lookup also tries `post-<field>` and `post-attr-<key>`, the ids the steps use. Test: PW-70.
- **D71 — the category picker's soft border.** `post-category-group` wears `border-destructive/40` while no leaf is chosen and nothing is refused, full destructive after a refusal, none once chosen; `data-empty="1"/"0"`. Test: PW-71.
- **INC-325 — step strip focusable.** axe named `ol.-mx-1` (the mobile step strip) as `scrollable-region-focusable` on step 1 at mobile-360; the scroll container now takes `tabIndex={0}` with a focus ring.

### INC-329 / D72 (2026-09-29)

- **INC-329 — answers erased on Back.** The step-3 reconciliation builds its parent set from LOADED option lists (a picker joins once its options carry facts or bounds), but compared it with `parentsSeen` as if every parent had been seen on the first pass. A picker whose list arrived after the first pass therefore "moved" from empty to its stored answer, and the D25 reset erased what it governs (a model-bounded year has no fact, so it was deleted). Since INC-320 this fired on every Back for an answered big list. Rule: joining the parent set is not a move; only a changed answer resets — `movedKey` considers only keys already in the previous set. Test: PW-74, the round-trip law (identity, make → model with a year bound and a fact, required year, a fact-carrying small picker, colour, multi-select, boolean, number, text, "other" with text; Next to step 5, Back to step 3, then a tap on the model), run with a 3-option and a 210-option model list.
- **D72 — one required mark.** `RequiredMark` in `field.tsx` (visible `*`, screen-reader "Required", `data-testid="post-required-mark"`) is used by `Field` and by every required control whose label a step renders itself: the step-1 category filter label, the price-mode legend (step 5) and the place heading (step 6). Title, basis, amount and currency already render through `Field`; the door refuses nothing as `required` on step 7. Test: PW-75.

### INC-324 — a save racing a delete is "listing not found" (2026-09-29)

- `submit_listing` reads the draft `FOR UPDATE`; if the UPDATE still matches no row, the door raises `listing not found` before any revision write, so a null `listing_revisions.listing_id` can no longer occur. The route answers it as a 200 refusal (`doorError`). Proven by P17/P18 in-file and by PR-15.

### W4 — DEC-086 / DEC-085 / INC-331 / D1 / D2 (2026-09-29)

- **DEC-086 — the model question is required when it matters.** `validate_listing_draft` (migration `1dc182d8`, mark `20260929180000`) refuses `{attr_key, reason: "required"}` at step ≥ 3 for a dependent pick-list (`depends_on`) whose options carry `facts`, `allowed` or `bounds`, once its parent is answered and that answer offers two or more active child options (`other` counts and is a valid answer). The form mirrors it in `requiredByModel` (`step-specifications.tsx`): the required mark and the soft border show from the moment the rule applies. Honest limit: the posting read carries no `depends_on`, so the mirror resolves the parent structurally (the fold); the door decides (F3). Proofs: P19–P21 (migration), PR-16 (route).
- **DEC-085 — one admissible value is the answer.** When the chosen options leave a detail one value, the form writes it and hides the row: a pick-list with one allowed option (INC-244 fill, D44 hide) and now a number or year whose effective bounds have `min = max` (`pinnedNumber`). Yes/no pins are deferred to W4b. The stored value is shown on the review and judged by the door. Proof: PW-76 (brand → series → model; pinned pick-list, number and year hidden and stored; narrowed variant kept visible with its prefill; DB truth and review over Back/forward).
- **INC-331 — not reproduced.** PW-74 gained a prefilled, untouched, unpinned fact (`seats`); it survives the round trip in both list sizes on both projects, so no code change was made.
- **D1 — the category mark is on the list heading.** The optional search label is unmarked; `post-category-list-heading` carries `RequiredMark` only while no leaf is chosen, clearing with the soft border (also after Back). PW-75 updated.
- **D2 — the refused field arrives whole.** `focusElement` scrolls the field container (`scroll-mt-20`, label included) to the top, smoothly unless reduced motion is requested, then focuses the control with `preventScroll`. Proof: PW-77 (both motion settings, label below the sticky header).

### W5 — INC-336 / INC-332 / INC-323 / DEC-084 (2026-09-29)

- INC-336: a list above `EAGER_OPTION_LIMIT` (200, unchanged) is read once per key per mount the moment any other select on the step is answered; with no sibling answered nothing is read. The schema carries no parent link, so "any sibling answered" is the earliest point a parent can exist. Every behaviour reasoning over a dependent list — the fold, DEC-086's required mark and soft border, INC-244 fill-and-hide, the narrowing — then holds its rows. PW-78.
- INC-332: the action bar (`post-actions`) ignores the press on its buttons, so focus stays in the field until the click has registered; the click then blurs the field and its judgement shows. One rule for every on-blur field (details, price, who, specifications) and every bar layout. PW-79.
- INC-323: posting teardowns call `stopPageBeforePurge` (network quiet, then `about:blank`), so a save already in flight cannot reach a purged draft.

### W6 — INC-337 / INC-338 / DEC-064 amendment (2026-09-29)

- **Door** (migration `a3a572bf`, mark `20260929235900`): `validate_listing_draft`
  re-declared whole from 1dc182d8. Every coverage id must be a city or sub-city
  (`cityRequired`); sent places are judged at ANY step (a pre-step-6 save can no
  longer store an unchecked place); `required` stays at step 6+; `multipleMarkets`
  retired; G29 — `v_lands` now counts distinct countries (country-level nodes
  land in `v_anchors`). Proofs P22–P27.
- **Place step**: nested country → region → city boxes (R4); the heading's mark
  and the soft border stand until the item's city is chosen (R1); a refusal
  says "Choose a city." and scrolls to `post-coverage`; add buttons follow the
  plan from the schema (R5, INC-338 — `PLAN_CITIES` deleted); the draft's own
  saved places seed the cascade before the cookie/guess prefill.
- **Replaced behaviours** (named): the second "add another place" cascade and
  "add under" (→ the nested add buttons); remove / put back of the item's own
  place (→ changed, never removed, R1/R4); a region as the automatic place (→
  cities only, R2); the client-side "plan full" message (→ no button without room).
- **Tests**: PR-17, PW-80, PW-81 (cookie prefill, per the corrected R3), PW-82,
  `step-where.test.tsx`; PW-11, PW-20, PW-33 updated for R2/R4/R5.

### W6-R — INC-340 / INC-341 / INC-342 (2026-09-29)

- **INC-340.** a3a572bf could not apply on staging: its proofs borrowed real places and staging has no sub-city. Migration 13cb1b22 re-declares `validate_listing_draft` whole from a3a572bf (md5 64539a18…) and its proofs build two scratch markets on free ISO user-assigned codes picked at runtime; no reference place or country row is read (G27 for proofs). It inserts its own mark 20260930001000 and a3a572bf's 20260929235900, so on staging it replaces a3a572bf (the preflight accepts a file whose declared mark is in the ledger).
- **INC-341.** Step 6 counts distinct cities (`coalesce(city_id, id)`, so a sub-city is its own city), distinct `region_id` and distinct countries. Proofs P22–P29 (P28: two regions → `coverageExceedsPlan:region`; P29: a city and its own sub-city are one city).
- **INC-342.** `DESCRIPTION_MAX` in `step-details.tsx` is 5000, the door's cap; the AI assist keeps 1200 (DEC-072). Pinned by `step-details-limits.test.ts` and PR-18.
- PR-17 now seeds a scratch region → city → sub-city under ET instead of reading real places.

### W6b-1 — the place step is where the ad is shown (2026-09-30)

- Heading `post.where.showHeading` and intro `post.where.showIntro` (new keys, EN+AM); the old `itemLocation` / `alsoShownIn` / `defaultPlace*` / `why` / `refusal.multipleMarkets` keys are retired (D5).
- One radio, "Item or service is here" (`post.where.itemHere`), across every city box; exactly one is ticked. The ticked place is sent first in the coverage, so it becomes `listings.location_id` (a chosen sub-city is the ticked node). No door change.
- A city box appears only under a chosen region. Any city box may be removed while another remains; removing the ticked one moves the tick to the first remaining box and announces it (`post.where.itemMoved`, polite live region). A lone box offers no Remove.
- Prefill: the draft's own saved places (Back) → a NEW post's most recent OTHER non-draft listing (`readLastListingPlaces`, filtered by `seller_id` explicitly per INC-330; item place first, same market only, capped at the plan's city count) → saved-area cookie → location guess.
- Tests: `step-where.test.tsx` (tick, ordering, removal, region-gated city box, sub-city, last-post prefill); PW-83/PW-84 in `e2e/post-wizard-where.spec.ts`; PW-20 updated (lone box ticked, no Remove).

## W7 — the category finder on step 1 (D37-2) and asking again off the chosen path (INC-346)

- Typing two or more characters asks the catalog finder (`/api/catalog/find`, debounced 250 ms, the previous request aborted, `lang` = the active language). The local name match renders at once and stays as the fallback; when the finder fails or refuses, a translated "Showing name matches only." notice shows and the failure is logged (F4).
- Each finder hit carries its first fitting match as a line ("Size: M"), using the attribute's and option's own labels. Choosing a hit selects the leaf and carries its matches into the draft as prefills. Every pair is revalidated against the leaf's schema and current options first (`catalog-finder.ts`, forward-scan rule in catalog-finder.md); a pair that does not fit is dropped. The door still judges every answer.
- While a leaf is chosen, a level on its path shows the choice as selected and asks nothing. A level off the path shows the required mark, the soft border and "Current choice: <path>" with "Keep it", which returns to the chosen leaf. Next still accepts the current choice; choosing a new leaf replaces it.
- Proofs: PW-85, PW-86, PW-87 in `e2e/post-wizard-finder.spec.ts` (scratch leaves, attributes and options only).

## W6b-2 — price entry, the two place boxes, location details, and the map (2026-09-30)

- **A1/A2 — the amount.** The box's placeholder is "Enter amount" (no example
  number; the old `post.price.amountPlaceholder` key is retired). Beside it a
  scale — — · thousand · million — shifts the typed digits as a decimal
  STRING operation (`scaleAmount`, E4: 5.25 × million is exactly 5 250 000).
  The value sent is the full amount; a reopen shows it as a plain number with
  the scale at "—".
- **A3 — INC-347.** The price step's borrowed basis row (`only=[basisKey]`)
  skipped reconciliation, so a step-3 answer's `facts` / `allowed` for the
  basis never reached it (Milk kept the link default `per_kg`). The borrowed
  row now runs the two passes that apply to it: a value no longer offered is
  replaced by the fact (or cleared), and an empty row takes an offered fact. A
  value the seller chose that is still offered is never touched. PW-88.
- **B1 — two boxes.** "Where this ad is shown" (country → region → city boxes,
  the chosen list, the plan) and "Item / service location" (the ticked place's
  name, the map for `map_pin` categories only, and the location details).
- **B2 — the plan in one line:** "{used} of {max} cities · {regions}
  region(s)" with a Details toggle for the caption and the level counts.
- **B3 — location details** ("Building, floor, suite or directions. No phone
  numbers."), for every category, stored in `street_address` through
  `set_listing_pin` (re-declared in 60cedbed: a note without a pin is kept;
  Remove still clears all four columns; sanitised, ≤ 200). Saved on blur.
- **B4 — red per box:** a country box until its country is chosen, a region
  box until its region is, a city box until its city is (`data-red`). The
  heading's required mark still waits for a city (W6 R1).
- **C1/C2 — tiles.** `/api/map/tiles` names the provider: Esri (static
  streets; imagery + labels for satellite) with the server-held key
  `ESRI_API_KEY`, else OpenStreetMap. Three tile errors in a row, or one
  401/403/429, switch the session to OSM with a "backup map" note and one
  `[map] fallback provider=osm reason=<token>` server line. The key is
  referrer-restricted by Esri, so any other origin (local runs, staging
  preview) falls back — PW-92 proves the fallback path.
- **C3/C4 — the pin sheet.** Full screen at ≤ 640 px, a dialog above, with a
  sticky Save location / Cancel footer. The map opens on the ticked place:
  its outline from `/api/geo/outline` (our Nominatim pattern: caller check,
  dial, cache) fitted at maxZoom 14 (city) / 16 (sub-city), else a circle; a
  saved pin opens on the pin at 16. Tap drops, drag moves, search and My
  location move it; the reverse geocoder fills empty location details; a
  soft notice says when the pin is outside the ticked place.
- **C5 — numbers (staging build, 360 px, Slow 4G, same script before/after).**
  Before: step 6 20.3 s, map ready 3.9 s, first tile 5.8 s, Save below the
  fold after a tap. After: step 6 20.5 s, map ready 4.4 s, first tile 6.5 s
  (Esri 401 off-domain → OSM backup), Save on screen, pin saved. The step-6
  load time is the wizard's, not the map's, and is unchanged.
- Tests: PW-88–PW-92 in `e2e/post-wizard-where.spec.ts`; `map/outline.test.ts`
  (scale, point-in-outline, sanitiser). Scratch categories carry `map_pin` by
  default (`seedPostableCategory`), so the existing pin specs keep their map.

## Part D and Part A on screen (2026-10-02)

- Free-text answers (no preset, or a `free:` preset) and the location details are checked as typed by `contact-like.ts`, the one client mirror of `attr_contact_like`; identity presets are never checked. The door's refusal (`contactInText`, `contactInNote`) is the authority.
- A number answer outside its definition's own range is refused as typed with `outOfBounds`; option-narrowed ranges keep the model wording.

## Bundle 1 items 6–8 (2026-10-02)

- Cards print the listing's `price_period` with the preview's period keys; the feed read selects the column in its one query. A unit noun (per kg) on the card needs the basis label server-side and rides bundle 2.
- Choice answers are read through `answer-tokens.ts` only (Part O). A multi-choice Other is stored `{ value: "other", text }` inside the array, bare `"other"` while empty.
- An `otherNeedsText` refusal moves the field's id to the write-in, so Next focuses it (single and multi).
- INC-375 releases a forced Contact only when the basis changes while the price step is open; a goods basis changed on step 3 cannot tell a forced Contact from a chosen one without a stored flag.

## Place step layout (bundle 2 P1–P3)

Each region is a box inside its country box and each city a box inside its region box; every level steps in by the same amount. "Add city" closes its region box below its city boxes, "Add region" closes the country box below its region boxes, and "Add country" sits below the country boxes — no add control sits inside a box it adds a sibling of. In a city box the "the item or service is here" marker is on its own lower line, with Remove at the end of that line. Tests: PW-98, PW-99 (e2e), PW-110 (step-where.test.tsx).

## Phone country picker (bundle 2 Q1)

Phone and WhatsApp carry a country picker (names from Intl.DisplayNames, codes from `calling-codes.ts`): open markets first, then A–Z. It starts on the home country, else the posting market. Separators and leading zeros are removed; the saved value is `+` code digits; a `+`/`00` number moves the picker to the longest matching code, keeping the current country on a shared code. PW-111.

## Contact carried from the last post (bundle 2 Q3)

A new post whose draft holds no channel value opens the contact step with the channels (values and show switches) of the seller's last own post past the draft stage, written to the draft at once, with a line saying where they came from. A draft with its own channel value is never overwritten. PW-112.

## Phone field (bundle 2 walk defect B, 2026-10-03)

One bordered group `[flag +code ▾] | [number]` (`phone-number-field.tsx`), used for Phone, the second phone and WhatsApp. Closed, the picker shows only the emoji flag (`flagOf`) and the calling code; open, a searchable list (name in the UI language or code, `searchCountries`; open markets first; arrows, Enter, Escape) in the currency control's pattern. The number box keeps at least 160 px; when the row cannot also hold the "show" switch, the switch wraps to its own line. An empty, untouched box opens on the item place's country (`coverage[0]`, read by `readPlaceCountry`), else the seller's home country, else the posting market; a typed, picked or carried number keeps its own country; the second phone opens on the first phone's country. What is saved (E.164) and the door are unchanged. One shared picker for currency and country waits for the wizard bundle. Tests: PW-12/111, PW-112, PW-114, PW-122.

## Place boxes and phone hints (bundle 2 walk round 2, 2026-10-03)

W1: rows sharing a city draw ONE city box: the city picker, then one sub-city box per chosen sub-city (its picker, its "the item or service is here" tick, its Remove), then "Add sub-city" inside the city box. A city with no sub-cities, or with "All of <city>", keeps its tick and Remove on the city box. The saved rows, their order and the door are unchanged. W2: region, city and sub-city pickers leave out what another box at the same level holds (a box keeps its own value); "Add region/city/sub-city/country" are not drawn when nothing is left or the plan has no room. W3: the in-review screen offers "Post another ad", a fresh `/post` at step 1 with no draft carried. W4: the phone box shows the chosen country's example number as its placeholder and a hint line when the national digits fall outside the country's usual length (`phone-plans.ts`, a static table extracted from libphonenumber metadata via libphonenumber-js 1.11.18; no library ships). The hint blocks nothing. Tests: step-where.test.tsx (W1/W2), phone-plans.test.ts, PW-117, PW-123, PW-124.

## Bundle 4 — the price line, the deal lines and the one picker

- One price line (`price-line.ts`): a unit or a period reads "<amount> <currency> per <noun>" through `post.review.pricePer`; a one-off price prints the amount alone.
- Under the price, the size line and the terms lines (`deal-lines.ts`) read on review, in the buyer's preview and in the wizard's side preview. A choice whose option label is not held on screen prints nothing; a raw token is never printed.
- The currency box and the phone-country box share one picker (`src/components/searchable-picker.tsx`): arrows, Enter and Escape behave alike, and both lists open by the INC-280 rule (upward only when the room below is short and the room above is larger). What a search matches stays each list's own.

## Bundle 4 — the wizard as built (Parts A–G, 2026-10-05)

- **Order and price page.** Steps keep the brief's numbers; the price page is its own step after the specifications and draws the copies of the form the step-9 census lists (`bundle-4-census.md`). Price, unit/period and the deal lines read through `price-line.ts` and `deal-lines.ts` (above).
- **Title.** Built from the answers and editable; the assistant prompt strips price-like facts (PW-140).
- **Picture.** One listing picture with a fallback; "photos soon" is a ribbon and an action through `set_listing_photos_soon` (PW-141).
- **Lifetime.** An optional end date; the door applies the LEAST of the seller's date and the category's `expiry_days` on transition and renew; the hourly `listing-expiry-sweep` (`17 * * * *`) expires stale ads and writes one `listing_expiry_sweep_runs` row (PW-143, PR-25).
- **Place.** Changing the place follows step 17; a saved place (`seller_places`, its three doors, no client table access) is reusable on the next ad.
- **Contact step.** First and last name required for a person; public-name suggestions are asked on blur; the name and channels are saved on the profile and inherited by the next ad; one identity request when either changed, none when nothing did (PW-144). The account card shows them read-only.
- **The name-fold table.** `name_folds` (kind, fold) holds every protected word — site, role, function, category, place, country, brand, handle, exact_only, claim — so `alias_rule` and `business_name_rule` read by key. It is rebuilt by `name_folds_rebuild()` three ways: M5 built it; the hourly cron entry `name-folds-rebuild` (`41 * * * *`); and every import route that commits or undoes (attributes, categories, locations) through `refreshNameFoldsAfterCommit`, after the commit returns, a failure logged and never failing the import (INC-432; CT-35, AT-69, LT-15). **A name imported is protected at once; a name edited by hand in the admin console is protected within the hour.**
- **Catalogue tokens (Part G).** `{country}` draws in definition labels, help, option labels and units: the ad's first place ▸ the browsing market (area cookie) ▸ the confirmed home country ▸ "your country". `{category:<slug>}` draws in help text only, as a button with the category path; tapping asks before moving the ad (answers the target also asks are kept); a gone category draws nothing; in labels it never draws and never leaks braces. Admin screens keep raw tokens (PW-154–158).

## Bundle 5 — the unit's Amharic twin and the imitation gate (2026-10-05)

- **Unit in Amharic.** A number definition's `unit_am` prints in the specifications step, review, preview and detail under Amharic; the English `unit` prints when it is empty (PW-161).
- **Imitation gate (INC-442).** `/api/listings/identity` counts `identity:imitation` (20 per 24 hours, matching the live `identity` dial) before the paid imitation model call and answers `rate`/`rateLimited` with the reset as detail; the door keeps counting its own `identity` bucket (PR-26).

- Bundle 6 (INC-444, DEC-136): the seller doors edit_listing, transition_listing, renew_listing, set_listing_pin, mark_sold and relist_listing each call `rate_gate('revise')` (120 an hour per seller) after their caller checks and refuse with `rateLimited`.
- Bundle 6 (DEC-135): a draft save's transport call times out after 30 s (`SAVE_TIMEOUT_MS`); a timeout answers unreachable, the draft shows unsaved, and the next edit retries.

## Bundle 7 Part C–D (2026-10-07)

- Removed answers (C1): an answer whose question or option the catalogue removed is released on the next save (autosave and the strict save alike); a required question asks again. A key or option never held stays refused.
- Retired labels (D1, INC-466): the options route returns `retired` beside the offered list; Review, the preview, the wizard's basis caption and the details picker's current choice print a switched-off option's label (offered first, then retired). A retired option is never offered.
- "Used before" chips (D2): the category step asks `my_recent_categories` once on mount and draws at most two chips, each the exact leaf the seller published in; a tap selects it. Nothing is drawn while the read is pending, failed or empty.
- Place step seeding (D3, INC-473/474): a draft with places opens in its FIRST place's market; each place keeps its own country; a place the read did not return gets no row; before the seller acts, nothing writes the draft until every saved place is in a row. Places are read by `position`, then `created_at`, then `id`.
- Reset rule (D4): rule 2 takes a fact for D from the option now chosen in ANY question D depends on — the moved parent first, then the others in form order; rule 3 applies only when none states one. Red-first in unit case (x) and PW-174, then fixed.
