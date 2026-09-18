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

## Step 1 — category (D11)

Search-to-leaf over the ONE shared tree reader
(`src/features/categories/category-tree.ts`, lifted out of the feed so both
consumers read the same rows). Search matches the active language's entity name
and the English name, and answers with POSTABLE LEAVES ONLY. Folders are
browsable and never selectable. Choosing a leaf creates the draft immediately —
that is what makes the seller's work recoverable — and reads
`get_posting_schema` to say how many details the next form will ask for.

## Step 2 — photos (B2)

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

## Still to come — C2b

Steps 7 (identity) and 8 (review and publish), the D18 facts prefill (`PW-9`),
and the categories-file cells (CT-x) are NOT in this landing and say so on
screen through `post.stepLater`.
