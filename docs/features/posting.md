# Posting wizard (U6-C1a, steps 1–2)

Spec: `docs/governance/u6-posting-spec.md` §4 B2/C1, §12 D11/D12/D18.
Decisions: DEC-068 (residency from the edge), DEC-069 (the strip law),
DEC-072 (the assist). Acceptance: `PW-1`..`PW-4`, `PW-7`, `PW-8`.

What landed: the wizard shell, the draft (autosave, offline retry, resume) and
steps 1–2. Steps 3–8 are declared in the rail and say so in words on screen
(`post.stepLater`); C1b lands the specification form, title and description.

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

## Deferral — option-carried `facts` (D18)

The prefill cannot be built yet: the DEC-050 option shape allowlist (`value`,
`label_en`, `label_am`, `parent`, `active`, `bounds`, `aliases`, `allowed`)
rejects a `facts` key, the public options read strips anything else, and the
validator never projects it. It needs a migration, which this brief forbids; so
`PW-9` is not written either — a test against an impossible shape would prove
nothing.

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
