# f1-doors-5b — the census (STEP 1)

Base: dev 157d28bbd (ruling A item 3: the brief's `Base: dev 68b360fa1` reads 157d28bbd, the merge of
pull request #57). Branch `cursor/f1-doors-5b`. Every reading below was made in this turn: the last
declarations by the migration reader (`scripts/conformance/migration-reader.ts`), the live bodies,
grants, triggers and dials on the local proof stack (`bun run db:proof`, every migration of the base
applied), the callers by `rg` over `src/`, `e2e/` and `scripts/`. Scratch copies of the readings
live under `/tmp/ethio-scratch/f1-doors-5b-157d/` (the operator's to remove).

The decisions this census takes (DECIDE-AND-NAME) are numbered D1–D9 here and carried, with the same
numbers, into the migration stop report.

## consumers

Every door of the family. "md5" is `md5(replace(prosrc, chr(13), ''))` on the local proof stack; each
equals the twelve-digit prefix the supervisor read on ethio-staging. All seven are `SECURITY DEFINER`,
VOLATILE, `search_path=public`, and return `jsonb`; none changes its return type or argument list, so
no DROP (and no grant restatement) is needed.

### save_listing(text)

- Last declaration: `supabase/migrations/20261019223105_fee22f72…sql:275`; md5
  `cee7d6a6df902478859d12df6e8ac8f2`.
- Line (manifest.txt:251): `owner | authenticated | - | - | save | - | - | signal | - | -`.
- Gates today vs the line's promise:
  - no `door_context`: the legacy `'not authenticated'` RAISE;
  - deactivation only inside `rate_gate`, and only on a first save;
  - `save` is spent only when the ad is not yet saved, AFTER the row read;
  - the line promises the owner gate with `save`.
- Sentences and the code each becomes:
  - `'not authenticated'` → the gate's `notSignedIn`;
  - `'account is deactivated'` (from `rate_gate`) → the gate's `accountDeactivated`;
  - `'listingNotAvailable'` (a malformed id, or no public row) → `door_refuse('listingNotAvailable')`
    (reused);
  - returned `ownListing` → `door_refuse('ownListing')` (reused);
  - returned `rateLimited` + `resets_at` → the gate's `rateLimited`, which loses the reset time
    (INC-1170 widened, D5).
- Callers under `src/`:
  - `src/features/ad-page/save.ts:44` (`saveListing` → `toggle`), which reads `data.ok`,
    `data.reason` (`rateLimited` | `ownListing`) and `error.message.includes("listingNotAvailable")`;
  - through it, `src/routes/l.$slug.tsx:160` (`ownListing` → `setOwnAd`, `rateLimited` → its line,
    else `failed`) and `src/features/posting/preview/listing-detail.tsx:795–796` (the words
    `adPage.save.rateLimited` / `adPage.save.failed`).
- Callers under `e2e/`: AP-24, AP-25, AP-26, SAVED-1, the CG seed at `auth-caller-gates.spec.ts:116`
  (see `tests`).
- SQL callers: none (by `\m…\M` over every body, policy and view on the stack).

### unsave_listing(text)

- Last declaration: `20261023100132_a09c454f…sql:310`; md5 `12eb179b16ad8d1076a664f22d18d9a4`.
- Line (manifest.txt:268): `owner | authenticated | - | - | save | - | - | signal | - | -`.
- Gates today:
  - `'not authenticated'`, then `assert_caller_active()`;
  - no dial (the line names `save`; DEC-385: an unsave edits the caller's own saved list, so it gains
    `save`).
- Sentences:
  - `'not authenticated'` → `notSignedIn`;
  - `'account is deactivated'` → `accountDeactivated`;
  - `'listingNotAvailable'` (a malformed id, or no row in any status) →
    `door_refuse('listingNotAvailable')`.
- Callers:
  - `save.ts:46` (`unsaveListing`);
  - `l.$slug.tsx:160`;
  - `src/features/account/saved-page.tsx:55`, which reads `answer.ok` and logs a refusal.
- e2e: AP-24 (:649), CG-1 (`auth-caller-gates.spec.ts:182`).
- SQL callers: none.

### report_listing(text,text,text)

- Last declaration: `20261019223105_fee22f72…sql:317`; md5 `0d37fb1dfa3d5215e2ae184667e99c1a`.
- Line (manifest.txt:247): `owner | authenticated | - | - | report | - | - | signal | - | -`.
- Gates today: `'not authenticated'`; `report` is spent only after the reason, note, row, owner and
  open-report checks (the dial counts written rows only, AP-27's title).
- Sentences:
  - `'not authenticated'` → `notSignedIn`;
  - `'account is deactivated'` → `accountDeactivated`;
  - `'listingNotAvailable'` → `door_refuse('listingNotAvailable')`;
  - returned `badReason`, `noteTooLong`, `ownListing` and `alreadyReported` → `door_refuse` with the
    same code (each reused);
  - returned `rateLimited` + `resets_at` → the gate's `rateLimited` (D5).
- Callers:
  - `src/features/ad-page/report.ts` (`reportListing`): an error → `failed`; reads `data.reason`
    `alreadyReported` | `rateLimited` | `ownListing`;
  - `src/features/ad-page/report-ad.tsx:50–56` and `:98–101` (`adPage.report.already`,
    `adPage.report.rateLimited`, `adPage.report.failed`).
- e2e: AP-27, AP-28, AL-31 (`admin-listings.spec.ts:2076`, `:2085`).
- SQL callers: none.

### reveal_listing_contact(text)

- Last declaration: `20261019224505_a93ea697…sql:16`; md5 `46698ebc0e8620e075cbb360746d8675`.
- Line (manifest.txt:249): `owner | authenticated | - | - | contact_reveal | - | - | checks | - | -`.
- Gates today:
  - `'not authenticated'`;
  - row and status checks;
  - the acceptance check;
  - then, only on a non-owner's first reveal of the ad that day: the distinct-sellers ceiling
    (`contact_reveal_sellers`, read from `rate_dials` + `rate_overrides`, not spent), the new-account
    five, and `rate_gate('contact_reveal')` last.
- Sentences:
  - `'not authenticated'` → `notSignedIn`;
  - `'account is deactivated'` → `accountDeactivated`;
  - `'listingNotAvailable'` (a malformed id, no row, or a non-owner on an ad that is not active) →
    `door_refuse('listingNotAvailable')`;
  - returned `acceptanceRequired` → `door_refuse('acceptanceRequired')` (reused; it writes nothing);
  - returned `sellersCapReached` + `resets_at` STAYS a returned answer (D3): its `reveal_flags` upsert
    must commit, and a raise would roll it back;
  - the returned new-account `rateLimited` + `resets_at` (midnight UTC) STAYS returned (D3): a ceiling
    of the body, not a dial, whose reset time is the person's fact;
  - the returned `rate_gate` `rateLimited` → the gate's `rateLimited` (D5);
  - `'unknown rate dial: contact_reveal_sellers'` stays a plain RAISE (D8).
- Callers:
  - `src/features/ad-page/contact.ts:37` (`revealContact`): `error.message.includes("listingNotAvailable")`;
    reads returned `sellersCapReached` | `rateLimited` | `acceptanceRequired`;
  - `l.$slug.tsx:195–203` (`acceptanceRequired` → `certifyRefusal`);
  - `listing-detail.tsx:1520–1524` (`adPage.contact.sellersCap`, `adPage.contact.rateLimited`,
    `adPage.contact.failed`).
- e2e: AP-20, AP-21, AP-22, ML-4 (`my-listings-doors.spec.ts:421`, `:434`), LG-20
  (`legal-certify.spec.ts:781–788`).
- SQL callers: none; `mark_sold` (`20261115203600…sql:57`) and `public_listing_json` name it in
  comments only.

### user_set_viewing_location(uuid)

- Last declaration: `20261010065637_01da330c…sql:24`; md5 `c9764e258d14da9f84e83ef643d11379`.
- Line (manifest.txt:270): `owner | authenticated | - | - | viewing_place | - | - | account | - | -`.
- Gates today: `'not signed in'`, then `rate_gate('viewing_place')` (deactivation inside it), then the
  place.
- Sentences:
  - `'not signed in'` → `notSignedIn`;
  - `'account is deactivated'` → `accountDeactivated`;
  - returned `rateLimited` + `resets_at` → the gate's `rateLimited` (D5);
  - returned `placeNotOpen` → `door_refuse('placeNotOpen')` (it writes nothing);
  - `'no profile row'` → `door_refuse('noProfile')` (D7: a new code, drawn by no screen; the place
    carry logs it).
- Callers:
  - `src/components/shell/place-carry-service.ts` (`saveAccountPlace`) returns `error.message`, or
    `data.reason`, as `reason`;
  - `src/components/app-shell.tsx:264` logs `[location] the account place was not saved: <reason>`;
    no words are drawn.
- e2e: VIEWING (`viewing-place.spec.ts:86`), VP-5 (`:195`), and the refusals at `:137` and `:176–177`.
- SQL callers: none.

### accept_legal(uuid[],text,boolean,boolean)

- Last declaration: `20261028230748_23f4ae4e…sql:61`; md5 `750497f2b0710fc1b6fad10b6317d81a`.
- Line (manifest.txt:12): `owner | authenticated | - | - | legal_accept | - | - | legal | - | -`.
- Gates today: `'not authenticated'` → `assert_caller_active()` → `rate_gate('legal_accept')` (RAISE
  `'rateLimited'`); the law order already.
- Sentences:
  - `'not authenticated'` → `notSignedIn`;
  - `'account is deactivated'` → `accountDeactivated`;
  - RAISE `'rateLimited'` → the gate's `rateLimited` (same text);
  - RAISE `emptyList`, `adultRequired`, `badLanguage`, `notInForce` and `notApplicable` →
    `door_refuse` with the same code.
- The insert's `p_language IN ('en', 'am')` and `ELSE 'en'` become `public.language_code('base')` /
  `public.language_code('pair')` (D9; K4).
- Callers:
  - `src/features/legal/legal-reader.ts` (`acceptLegal` throws the error; `legalRefusal(error)` returns
    the message up to the first colon);
  - `src/features/legal/legal-accept-screen.tsx:192–197` (`=== "notInForce"` re-reads; otherwise
    `legal.accept.error`).
- e2e: LG-4, LG-5, LG-7, LG-8, LG-10, LG-11, LG-17, LG-23, LG-24, LG-25, LG-26, LG-27, LG-28, LG-31,
  LAC-4, CG-1 (`auth-caller-gates.spec.ts:184–186`).
- SQL callers: none.

### public_listing(text)

- Last declaration: `20261019223105_fee22f72…sql:177`; md5 `c81bde858ae7ae351040b2c6192dcf96`.
- Line (manifest.txt:242): `public-door | anon,authenticated | - | - | listing_read | - | - | helper | - | -`.
- Gates today:
  - a malformed id → NULL;
  - `rate_gate('listing_read')` (a no-op with no caller; deactivation inside it) → RAISE
    `'rateLimited'`;
  - the public predicate → NULL when absent.
- Sentences:
  - RAISE `'rateLimited'` → the gate's `rateLimited`;
  - `'account is deactivated'` → `accountDeactivated` (only a signed-in caller can meet it, as today);
  - NULL stays NULL ("not there" is data, not a refusal).
- Callers:
  - `src/server/ad-page.ts` (through `anonymousClient()`: an error throws `public_listing <message>`,
    logged `[ssr-error] /l…`);
  - `src/server/ad-photo.ts` (an error → 503);
  - the e2e ids AP-3, AP-4, AP-5, AP-6, AP-24 (:681), LG-22.
- SQL callers: none.

### The counters and the class

`count_listing_view(text,text,uuid)` (`20261019223105:208`, md5 `a73daf2044f2806d6b6c7705a657db9a`)
and `count_listing_share(text,text,text,uuid)` (`:238`, md5 `0bd42a9afd017dc2ce87daf588e5dd63`) are
service-role only and return boolean. Each:

- reads the listing by the public predicate with no lock (view :216, share :248);
- spends `consume_rate_limit`;
- then upserts `listing_counters` (view :231, share :260).

A listing deleted between the read and the insert raises 23503. `src/server/ad-view.ts` turns that
into `clientError("listingNotFound", 404)` with an `[ad-view]` info line (`MISSING_LINK = "23503"`);
`ad-share.ts` turns it into a server error. Their callers are `src/routes/api/listings/view.ts:30` and
`share.ts:29`.

The class census covers every function in `public` that names `listings` and INSERTs into a table with
a foreign key to `listings(id)`, read from the stack's catalogue and judged by its last body: the
first keyed insert, and what holds the row before it.

| function | last file:line | first keyed insert | verdict |
| --- | --- | --- | --- |
| count_listing_view | 20261019223105:208 | listing_counters@231 | fixed here (D1) |
| count_listing_share | 20261019223105:238 | listing_counters@260 | fixed here (D1) |
| save_listing | 20261019223105:275 | saved_listings@306 | fixed here (D1) |
| report_listing | 20261019223105:317 | listing_reports@358 | fixed here (D1) |
| reveal_listing_contact | 20261019224505:16 | contact_reveals@100 | fixed here (D1) |
| register_listing_photo | 20261107111341:41 | listing_photos@95 | fixed here (D1) |
| admin_edit_listing_core | 20261107125401:107 | listing_revisions@276 | safe: FOR UPDATE@160 |
| admin_move_listing_core | 20261115203200:41 | seller_notices@109 | safe: FOR UPDATE@66 |
| admin_set_listing_tier | 20261105080112:31 | listing_revisions@120 | safe: FOR SHARE@61, FOR UPDATE@65 |
| copy_my_listing | 20261115203800:73 | listing_locations@119 | safe: its own INSERT listings@103 |
| designation_sweep_core | 20261115203200:117 | listing_revisions@178 | safe: FOR UPDATE@157 |
| edit_listing | 20261107125400:183 | listing_locations@261 | safe: UPDATE listings@230 |
| edit_my_listing | 20261115204100:41 | listing_locations@226 | safe: FOR UPDATE@82 |
| feed_index_refresh | 20261108070500:42 | feed_index@82 | safe: FOR UPDATE@69 |
| mark_sold | 20261115203600:40 | listing_revisions@61 | safe: UPDATE listings@58 |
| publish_listing | 20261115203900:150 | listing_revisions@212 | safe: UPDATE listings@204 |
| relist_listing | 20261014194317:466 | listing_revisions@486 | safe: UPDATE listings@485 |
| remove_listing_photo | 20261115203300:93 | listing_photo_changes@117 | safe: UPDATE listings@111 |
| renew_listing | 20261115203700:41 | listing_revisions@88 | safe: UPDATE listings@78 |
| replace_listing_photo | 20261019140533:203 | listing_photos@257 | safe: FOR UPDATE@235 |
| set_listing_level | 20261115204000:40 | listing_revisions@103 | safe: FOR UPDATE@62 |
| set_listing_photos_soon | 20261115203800:38 | listing_revisions@59 | safe: FOR UPDATE@50 |
| set_listing_pin | 20261115203900:40 | listing_revisions@138 | safe: UPDATE listings@126 |
| set_listing_price | 20261107125401:36 | listing_revisions@97 | safe: UPDATE listings@77 |
| set_listing_reach | 20261115204000:128 | listing_revisions@181 | safe: FOR UPDATE@148 |
| set_listing_reserved | 20261115203600:74 | listing_revisions@101 | safe: UPDATE listings@97 |
| submit_listing | 20261115204200:37 | listing_locations@136 | safe: FOR UPDATE@63 |
| transition_listing_core | 20261115203100:45 | listing_revisions@231 | safe: UPDATE listings@171 |
| feed_reindex_enqueue_listings | 20261104153313:40 | feed_reindex_queue@49 | one statement; left (finding F1) |
| feed_reindex_enqueue_categories | 20261015023155:162 | feed_reindex_queue@178 | one statement; left (finding F1) |
| feed_reindex_enqueue_places | 20261015023155:193 | feed_reindex_queue@209 | one statement; left (finding F1) |

An `UPDATE listings` that matched the row holds it (FOR NO KEY UPDATE) against a DELETE until the end
of the transaction, so the rows marked "UPDATE listings" are safe. `move_listing_photo` and
`set_cover_photo` (the other F1-5a photo doors) insert nothing keyed to a listing.

**D1 — the form:** the read that precedes the keyed insert takes `FOR KEY SHARE`. The brief's other
form (one statement guarded by `EXISTS`) does not close the window. The foreign-key check runs at the
statement's end on a fresh snapshot, so a DELETE committed between the statement's snapshot and its
check still raises 23503. `FOR KEY SHARE` makes a concurrent DELETE wait. If the DELETE committed
first, the locked read re-checks the row and finds nothing. So the counters answer the quiet `false`,
the family's doors `listingNotAvailable`, and `register_listing_photo` its existing
`'listing not found'`. The feed enqueuers are this second form (an `INSERT … SELECT FROM listings`),
with that residual window; they are not this family and are left as finding F1.

**The order of the files:** no door of the family has a SQL caller, so there are no cores and no
callers to move first. The files are:

1. the race closed (the two counters and `register_listing_photo`, service-role bodies, no grant
   change);
2. the saves (`save_listing`, `unsave_listing`);
3. `report_listing`;
4. `reveal_listing_contact` (with `listing_reveal_count`'s grant, D6);
5. `user_set_viewing_location` and `accept_legal`;
6. `public_listing`.

No caller meets a returned refusal it did not meet before. Every SQL caller is none, and the browser
callers are the services above.

## callee-codes

| callee | refusals it can answer | what the door does |
| --- | --- | --- |
| `door_context('owner'/'public', NULL, NULL, <dial>)` | notSignedIn, accountDeactivated, rateLimited (owner and public forms never pass a permission, so never permissionDenied or stepUpRequired) | passes each as its own code through the shell |
| `rate_gate(text)` | 'account is deactivated', 'unknown rate dial: %' | no longer called by a body of the family: `door_context` spends the dial after its own deactivation check, so the door must not meet either |
| `assert_caller_active()` | 'account is deactivated' | removed from unsave and accept (the gate's deactivation replaces it) |
| `legal_acceptance_pending(uuid,uuid)` (reveal) | none (boolean) | — |
| `sold_cutoff()` (save, report, public, counters) | none | — |
| `get_location_tree(text)` (viewing) | none (set-returning read) | — |
| `public_listing_json(listings,uuid)` (public) | none (STABLE builder) | — |
| `consume_rate_limit(text,text,integer,interval)` (counters) | none (returns the verdict) | — |
| `legal_certify(uuid,uuid,text,uuid[],text)` (register_listing_photo, unchanged) | acceptanceRequired, certificationRequired, its own | passed as today (the photo route's mapping) |
| trigger `legal_acceptances_finality` (accept's insert) | acceptanceIsFinal, on UPDATE/DELETE only | must not meet: an INSERT … ON CONFLICT DO NOTHING never updates |
| trigger `acceptance_guard` on profiles (viewing's UPDATE) | acceptanceRequired, only when seller_alias / seller_type / business_name / contact_prefs change | must not meet: viewing changes viewing_location_id / _at only |
| trigger `profiles_default_location_check` (viewing) | 'default post location must be …', only when default_post_location_id changes | must not meet |
| trigger `profiles_status_guard` (viewing) | 'cannot deactivate …', only when account_status changes | must not meet |
| `listing_counters`, `saved_listings`, `listing_reports`, `contact_reveals`, `reveal_flags`, `legal_acceptances` | no triggers on the stack (`pg_trigger`, non-internal) | — |

## cell-meaning

Each dial below gives the work it rations and how often one person honestly does that work. The live
rows were read on the stack and equal the supervisor's ethio-staging reading.

- **`save` 200 a day.** Rations adding an ad to (and, from this turn, taking one off) the person's
  saved list. An honest shopper saves 5–30 ads on a busy day, and a save-then-unsave pair is two. Under
  D2 a repeat save of an ad already saved also counts. 200 holds; no cell change.
- **`unsave_listing` gains `save`** (DEC-385, the line stands). An unsave edits the same saved list a
  save does, so it is the same work under the same dial.
- **`report` 10 a day.** Rations reports of an ad to staff. An honest buyer reports 0–2 a day. Under
  D2 a refused attempt (own ad, already reported, bad reason, long note, an ad not there) counts once
  (INC-844). That is about ten honest mistakes a day, so 10 still holds; no cell change.
- **`contact_reveal` 30 a day.** Rations the taps that open a seller's contact. An honest buyer opens
  5–15 a day. Under D2 every tap counts, including a same-day re-open of the same ad and an owner
  opening his own (both were free). 30 still holds a busy honest day; no cell change, named at the
  stop.
- **`contact_reveal_sellers` 10 a day.** Not spent: the body reads it (`rate_dials` + the person's
  `rate_overrides`) as a ceiling on DISTINCT sellers reached in 24 hours. An honest buyer reaches 1–5
  sellers a day. It holds, and it stays in the body's order: the sellers ceiling, then the new-account
  five, with `contact_reveal` now spent at the gate before both (D2).
- **`viewing_place` 60 an hour.** Rations saving where the person browses. An honest person picks 1–5
  places in an hour. Holds.
- **`legal_accept` 60 an hour.** Rations one submit of the acceptance screen, however many documents
  it accepts (INC-951). An honest person submits 1–3 times. Holds.
- **`listing_read` 600 an hour.** Rations a signed-in caller's direct read of an ad. The ad page's
  server reads as the anonymous caller (`ad-page.ts` through `anonymousClient()`), so `door_context`
  spends nothing there (a dial is spent only when `uid IS NOT NULL`), as today. Honest browsing is
  50–200 ad pages an hour. Holds.

The acceptance cells, read against each body's guard today:

- `signal` (save, unsave, report): none of the three checks an acceptance. A buyer's signal is not held
  by one, and the shell keeps that.
- `checks` (reveal): the body names `legal_acceptance_pending(`; kept, now after the dial (the law
  order).
- `account` (viewing): `acceptance_guard` on profiles passes a viewing change, so no acceptance is
  owed.
- `legal` (accept): the acceptance itself.
- `helper` (public_listing): a read that owes none.

All five hold.

## definition

The family by the concern's definition is every signed-in door a BUYER calls on an ad or on his own
buying state, plus the public ad read and the acceptance a buyer owes before a reveal:
`save_listing`, `unsave_listing`, `report_listing`, `reveal_listing_contact`,
`user_set_viewing_location`, `accept_legal` and `public_listing`, plus the two service counters.

Against the plan's §5 row (`f1-doors.stop-1.md:480`) and this GO's list: the same seven, and the
counters by INC-786 and INC-821. Differences:

1. `listing_reveal_count(uuid)` is a buyer-family function the plan named through the door check's
   allowlist; it is settled here (D6).
2. `register_listing_photo` joins through the class census (D1), not as a door.
3. The buyer's readers (`listing_saved`, `my_saved_listings`, `my_viewing_location`,
   `listing_contact_refusals`) are F1-7's readers, untouched.

## tests

Each family's e2e ids by name, and the exact new expectation where a sentence becomes a code, an
answer's shape changes, or the door gains an effect. Every expectation below is taken from the new
body.

- **AP-20** (`ad-page-doors.spec.ts:388–441`): unchanged. `:435` expects `.error` to be
  `"listingNotAvailable"`; the shell's message is exactly the code. `:441`: anon has no grant, so
  `permission denied` still matches.
- **AP-21** (`:465–507`): `sellersCapReached` stays a returned answer at 200 with `resets_at`.
  Unchanged; every capped tap now also counts `contact_reveal` (D2), within 30.
- **AP-22** (`:539–550`): the new-account five stays a returned `rateLimited` with the midnight
  `resets_at`. Unchanged.
- **AP-24** (`:571–681`):
  - `:609`: `own.error` becomes `"ownListing"` and `own.data` null (it was data
    `{ok:false, reason:'ownListing'}`);
  - `:667`/`:672`: `toContain("listingNotAvailable")` holds;
  - `:574`'s repeat save stays `{ok:true, saved:true, count:1}` and now counts `save` (D2).
- **AP-25** (`:700–757`), under the `save` override `max_count 1` with the meter cleared:
  - `secondAd` stays ok;
  - `repeat` (`:749–751`) becomes `.error` `"rateLimited"` and `.data` null (a repeat save now counts,
    D2);
  - `third` (`:753–757`) becomes `.error` `"rateLimited"`, and its `resets_at` assertion is removed
    with a comment naming INC-1170 (D5).
- **AP-27** (`:774–861`):
  - the title's "the report dial counts written rows only" becomes "the report dial counts every
    signed-in attempt";
  - `:819–820` repeat → `.error` `"alreadyReported"`;
  - `:825–826` own → `"ownListing"`;
  - `:827–829` → `"badReason"`;
  - `:830–832` → `"noteTooLong"`;
  - `:853–858` limited → `.error` `"rateLimited"`, with the `resets_at` lines removed under INC-1170;
  - `:859–861` duplicate (after the override `max_count 2`) → `.error` `"rateLimited"`, because the
    dial now answers before the open-report check;
  - the `truth()` counts hold.
- **AP-28**, **AL-31**, **AP-26**, **SAVED-1**: success shapes unchanged.
- **AP-3**, **AP-4**, **AP-5**, **AP-6**, **AP-7**, **LG-22**: `public_listing` and the counters'
  success and NULL answers are unchanged. `:243`'s `'unknown share channel'` is unchanged (a
  service-only raise).
- **ML-4** (`my-listings-doors.spec.ts:434`): `listingNotAvailable` holds.
- **LG-20** (`legal-certify.spec.ts:785–787`): `refused.error` becomes `"acceptanceRequired"` and
  `refused.data` null (it was data).
- **LG-4** and **LG-23**: their `toContain("emptyList" | "adultRequired" | "badLanguage" |
  "notInForce" | "notApplicable")` assertions hold. LG-5, LG-7, LG-8, LG-10, LG-11, LG-17, LG-24,
  LG-25, LG-26, LG-27, LG-28, LG-31 and LAC-4: success unchanged.
- **CG-1** (`auth-caller-gates.spec.ts:182–186`): for `unsave_listing` and `accept_legal`, a
  deactivated caller's `.error.message` becomes `"accountDeactivated"` (it was
  `"account is deactivated"`).
- **VIEWING** (`viewing-place.spec.ts:86–177`):
  - `:137` `placeNotOpen` moves from `data.reason` to `.error`;
  - `:176–177` the third call's `rateLimited` moves to `.error`, with its `resets_at` assertion removed
    under INC-1170.
- **VP-5** (`:195`): anon has no grant; holds.

The unit tests of each client and server file:

- `src/features/ad-page/save.test.ts`, `contact.test.ts`, `report.test.ts`, `report-ad.test.tsx`,
  `reveal-intent.test.ts`, `count-view.test.ts`, `public-listing.test.ts`;
- `src/components/shell/place-carry.test.ts`;
- `src/features/legal/legal-reader.test.ts`, `legal-accept-screen.test.tsx`;
- `src/lib/refusal.test.ts`;
- `src/server/ad-page.test.ts`, `ad-view.test.ts`, `ad-share.test.ts`;
- `src/features/account/saved-channels.test.ts`.

The next free id of each family this turn may add to: AP-58, VP-12, LAC-7, SAVED-3, LG-34, CG-5.

## lists

- **The manifest** (`scripts/doors/manifest.txt`), the codes cell of each line:
  - :251 save → `listingNotAvailable,ownListing`;
  - :268 unsave → `listingNotAvailable`;
  - :247 report → `alreadyReported,badReason,listingNotAvailable,noteTooLong,ownListing`;
  - :249 reveal → `acceptanceRequired,listingNotAvailable`;
  - :270 viewing → `noProfile,placeNotOpen`;
  - :12 accept → `adultRequired,badLanguage,emptyList,notApplicable,notInForce`;
  - :242 public stays `-`.
  - Line :219 `listing_reveal_count(uuid)` goes with its grant (D6).
- **The door check's allowlist** (`scripts/doors/check-doors-allowlist.txt:6`): the line
  `grant-without-caller listing_reveal_count(uuid)` goes (D6).
- **The forms allowlist** (`scripts/conformance/forms-allowlist.txt:5`,
  `CF-FORM-1 src/features/ad-page/report-ad.tsx (2)`): untouched by the migration; STEP 3 changes no
  form in that file, so the count stands.
- **The public-surface allowlist** (`scripts/public-surface-allowlist.txt`): no new grant. The line for
  `listing_reveal_count` (:186) goes with its grant (D6); the other family lines (49, 82, 88, 90, 91,
  95, 102) stay.
- **The migration reader's computed-declaration list** (`["attr_import_plan","public_listing_json",
  "validate_listing_draft"]`): untouched; every body here is a literal declaration.
- **The shared-value tables** this family's tests write (`scripts/conformance/shared-value-tables.txt`):
  `rate_overrides` (AP-25, AP-27, VP), already carried as today; no new write.
- **The acceptance allowlist** (`scripts/acceptance-doors-allowlist.txt` lines 6, 95, 98, 100, 113,
  115): unchanged. Reveal names `legal_acceptance_pending(` itself (`checks`).
- **The door-answers census** (`scripts/conformance/door-answers.test.ts`): reveal still answers
  `'ok', false` (the two returned ceilings, D3), so its `arrayContaining(["publish_listing",
  "renew_listing", "reveal_listing_contact"])` holds. `report_listing` stays in its planted fixtures.
- **The register** (`docs/governance/mechanisms.md`): rows by the records turn (§14 of the report).

## old-file-readers

The command, `/tmp/ethio-scratch/f1-doors-5b-157d/oldreaders.sh` (each stem and door name, `rg -n
--fixed-strings -w` over `src e2e scripts`, generated types excluded), wrote 393 lines. The hits that
read a sentence this turn folds or an answer whose shape changes:

- `"account is deactivated"` (22 hits):
  - the e2e readers of the family's doors are `auth-caller-gates.spec.ts:182`, `:186` (CG-1, above);
  - `src/features/auth/deactivated.ts:38` (`isDeactivatedRefusal`) has no caller outside its test
    (finding F2);
  - the rest read the routes' own `{error:"account is deactivated"}` (`user-client.ts:234`,
    `posting-routes.spec.ts:1425–1436`, `attributes.options.test.ts:61`, `upstream.test.ts`) or other
    families' doors, none of them this family's.
- `"not authenticated"`, `"not signed in"`: no reader of this family's doors by text.
  `ad-page-doors.spec.ts:442` reads anon's `permission denied | not authenticated`, which holds.
- `listingNotAvailable`: `save.ts`, `contact.ts` (`includes`, removed in STEP 3), and the e2e `toBe` /
  `toContain` assertions, which hold.
- `ownListing`, `alreadyReported`, `badReason`, `noteTooLong`, `placeNotOpen`: `save.ts`, `report.ts`,
  `l.$slug.tsx:166`, `report-ad.tsx`, their unit tests, AP-24, AP-27, `viewing-place.spec.ts:137`.
- `acceptanceRequired`: `contact.ts:31/56`, `contact.test.ts:68–70`, `l.$slug.tsx:199`, LG-20 :787.
  The other hits belong to the posting and legal-certify doors, outside this family.
- `sellersCapReached`: `contact.ts`, `listing-detail.tsx:1520`, AP-21; the shape is unchanged.
- `resets_at`:
  - `ad-page-doors.spec.ts:757`, `:855` and `viewing-place.spec.ts:177` become INC-1170 removals;
  - `:477` and `:550` (AP-21, AP-22) hold;
  - `user-client.ts:287–369` belongs to the routes, outside this family.
- `notInForce` and the legal codes: `legal-accept-screen.tsx:192` (`legalRefusal(error) ===
  "notInForce"`) holds, because the message is exactly the code; LG-4 and LG-23 hold.
- `"no profile row"`: `e2e/helpers/account-language.ts:32`, the helper's own text (not a reader).
- `"unknown rate dial"`: 0 hits.

## second-readers

Every dynamic `import()`, `loadOnce` and `vi.mock` of a module this turn changes:

- `src/routes/l.$slug.tsx:36` imports `@/server/ad-page`;
- `src/routes/l.$id.photo[.]jpg.ts:25` imports `@/server/ad-photo`;
- `src/routes/api/listings/view.ts:30` imports `@/server/ad-view`;
- `share.ts:29` imports `@/server/ad-share`;
- `vi.mock("@/lib/supabase-door")` in `save.test.ts`, `contact.test.ts`, `report.test.ts`,
  `place-carry.test.ts` and `legal-reader.test.ts`;
- `vi.mock` of the server clients in `ad-page.test.ts`, `ad-view.test.ts` and `ad-share.test.ts`.

No `loadOnce` reaches these modules.

## chunk-graph

From my lock-exact build at the base (`bun run build`, then a closure walker over
`dist/client/.vite/manifest.json`, gzip bytes per chunk):

- `/l/$slug`: 75 chunks, among them `index-CzNFf0bM.js` 131 501, `l._slug-CakS0lVw.js` 4 383,
  `l._slug-V_U9irCJ.js` 366, `refusal-DtKBJHeK.js` 1 130, `report-DQo1oyXO.js` 427 and
  `save-CyI8ZyeT.js` 841;
- `/legal/accept`: 44 chunks, with `refusal-DtKBJHeK.js` 1 130;
- `/account_/saved`: 51 chunks, with `refusal` 1 130 and `save` 841;
- the entry (`__root__`): 30 chunks, `index-CzNFf0bM.js` 131 501, JS 203.7 KiB of 205.

`readRefusal` (`src/lib/refusal.ts`) is already in every one of these closures, so STEP 3's client
change adds the family's words to chunks already downloaded. The "after" numbers belong to STEP 5's
build.

## environments

- The local proof stack: I apply every file there (`bun run db:proof --fresh`).
- ethio-staging: the operator applies by pasting from the supervisor's message of links, or the
  supervisor applies through the connector for one or two files with no DROP (DEC-384). This turn has
  no DROP.
- ethio-prod: after the merge, behind the operator's approval.

The proofs' first run on a shared database is the staging apply.

## mechanisms

- **`door_context`** (`20261106051600_8b7c2e41…sql:39`), read whole:
  - the service role returns at once;
  - no uid and a class other than `public` → `notSignedIn`;
  - a uid that is deactivated → `accountDeactivated`;
  - a permission only when `p_resource` is given;
  - the dial through `rate_gate` only when `p_dial IS NOT NULL AND uid IS NOT NULL` → `rateLimited`
    (no detail; `v_ctx.resets_at` is held but not passed, INC-1170).
  - The owner form is `door_context('owner', NULL, NULL, <dial>)` and the public form is
    `door_context('public', NULL, NULL, <dial>)`.
- **`door_refuse`** (`20261106051500…sql:31`): a one-word camelCase code, P0D01, message
  `code[:detail]`.
- **`door_refused`** (`20261106051600…sql:128`):
  - it re-counts the dial for every code but the four gate codes (INC-844);
  - it meters `door_refusals`;
  - it sets the status (401, 403, 403, 428, 429, else 400);
  - it returns `{ok:false, code:'P0D01', message, details:null, hint:null, refusals:[{reason,
    detail}]}`, which supabase-js surfaces as `error.message = code[:detail]` (ruling 5a-3 §5).
- **`readRefusal`** (`src/lib/refusal.ts`, read whole): `readRefusal(input, family {words, sentences,
  generic}, known)` and `refusalText`.
- **The family's words** live today in `en-base.ts:196–224`, `:249` and `:730–732`, as the keys
  `adPage.save.*`, `adPage.report.*`, `adPage.contact.*` and `legal.accept.error`.
  - The mappings live in `l.$slug.tsx`, `report-ad.tsx`, `listing-detail.tsx:795–796`, `:1520–1524`
    and `legal-accept-screen.tsx:192–197`.
  - The place carry draws no words; it logs.
  - Where the family's words file goes (STEP 3, `src/lib/door-codes.ts` not grown, INC-1153):
    `src/features/ad-page/ad-page-refusals.ts` (save, report, contact); `legal-reader.ts`'s family
    (accept); the place carry's reason passed to its log as today.
  - Every code the shell answers maps to a key the screens already draw, so no new string is planned.
- **F1-5a's owner proofs** (`20261115203300_8ab7c960…sql:170–447`) are the pattern:
  - catalogue facts and the new md5;
  - scratch users in `auth.users` with `e2e-mig-…@example.invalid`;
  - the scratch market `'XZ'` (a recorded K4 proof exception) and `language_code('base')`;
  - a deactivated scratch user;
  - each refusal judged by the tuple `(message, refusals[0].reason, ok, response.status)`;
  - a snapshot of every scratch row before and after the refused calls;
  - the `rate_limits` tallies and the `door_refusals` delta;
  - a sentinel rollback; the mark last.

## first-download

From my build at the base (`bun run build && node scripts/check-bundle-size.mjs`: "Bundle budget OK";
the log is `/tmp/ethio-scratch/f1-doors-5b-157d/bundle-base.log`). The entry is JS 203.7 KiB of 205
and CSS 22.6 of 40. The family's pages:

- `/l/$slug` 255.6 of 257;
- `/account_/saved` 223.2 of 225;
- `/legal/accept` 214.7 of 217.

Every other page: `/account_/legal` 206.2/208, `/account_/legal_/$versionId` 206.9/209, `/admin`
208.1/210, `/admin/` 208.9/211, `/admin/ai` 299.3/303, `/admin/attributes` 316.4/318, `/admin/audit`
293.7/295, `/admin/categories` 347.0/348, `/admin/countries` 305.7/309, `/admin/images` 208.7/210,
`/admin/impersonation_/$sessionId` 291.4/293, `/admin/legal` 282.0/283, `/admin/legal_/$versionId`
279.1/280, `/admin/legal_/edit` 281.1/282, `/admin/listings` 325.9/329, `/admin/listings_/$listingId`
326.7/330, `/admin/listings_/$listingId_/edit` 411.1/412, `/admin/locations` 269.3/271,
`/admin/monetisation` 309.9/313, `/admin/places` 306.2/310, `/admin/roles` 292.7/294,
`/admin/roles_/$roleId` 273.5/274, `/admin/screening` 344.8/348, `/admin/translations` 303.8/305,
`/admin/translations_/$lang` 307.2/308, `/admin/users` 291.6/293, `/admin/users_/$userId` 289.6/291,
`/auth` 219.7/223, `/auth_/callback` 207.2/209, `/auth_/reset` 209.2/211, `/c/$slug` 225.0/227,
`/dev/primitives` 225.1/226, `/dev/style` 246.2/248, `/dev/tall` 204.0/206, `/legal/$kind`
208.4/210, `/legal/publishing` 209.2/211, `/my-listings` 311.0/315, `/my-listings_/$listingId`
321.2/323, `/my-listings_/$listingId_/edit` 403.3/404, `/post` 403.3/404, `/post_/$listingId`
403.2/404, `/privacy` 208.4/210, `/settings` 274.3/277, `/terms` 208.4/210 (KiB).

## premises

- **P1 — "a refused call writes no row and spends no dial"** (the security lens). It is wrong for
  refusals after the gate. `door_refused` re-counts the dial once for every code but the four gate
  codes (INC-844, the mechanism), and F1-5a's proofs assert exactly that. The proofs here assert:
  - no row for every refusal;
  - no dial for a gate refusal (signed out, deactivated);
  - one count for a refusal after the gate.
- **P2 — "`reveal_listing_contact` keeps both of its dials in the order its body has them" vs ruling 1
  §7** (the one law order: caller class → deactivation → permission → step-up → dial → acceptance →
  the work) **and the door check** (the line's dial in the FIRST `door_context` call). `contact_reveal`
  moves to the gate, before the row read and the acceptance check; the sellers ceiling and the
  new-account five keep their order inside the work (D2).
- **P3 — the brief's CONCERN order** ("row state, then dial" for save and report). It is replaced by
  ruling 1 §7's order, as F1-5a ruling 1 item 7 accepted for `remove_listing_photo` (D2).
- **P4 — "`FOR KEY SHARE` holds the listing row only for the counter's statement".** A row lock is held
  to the end of the transaction. Each counter is one PostgREST call, so its transaction is the call
  (one insert later). It conflicts only with a DELETE, a key UPDATE and `FOR UPDATE`. A seller's door
  that takes `FOR UPDATE` on the same ad waits for the counter's call, or the counter for it.
- **P5 — the `public_listing` dial for a signed-out caller.** Confirmed: `door_context` spends
  `p_dial` only when `uid IS NOT NULL` (read whole, above), so the server's anonymous read spends
  none, as `rate_gate` did.
- **P6 — the performance lens's measured cost.** Read on the stack: the current body, signed out, on an
  id no row holds, takes 17.7 / 11.9 / 10.5 µs a call over three runs of 2 000 calls (md5
  c81bde858ae7…). The "after" reading is taken on the new body at STEP 2 and reported at the stop.
- **P7 — "no DROP unless the return type or the argument list changes".** None changes; no DROP.
- **P8 — the brief's raised-text list**: it is complete for the seven bodies as the stack holds them.
  `'account is deactivated'` is also met by every one of them, through `rate_gate` or
  `assert_caller_active`.

## findings

- **F1 — the feed enqueuers' residual window.** `feed_reindex_enqueue_listings`
  (`20261104153313…sql:49`) and `feed_reindex_enqueue_categories` / `feed_reindex_enqueue_places`
  (`20261015023155…sql:178`, `:209`) are one `INSERT … SELECT FROM listings`. A listing deleted
  between the statement's snapshot and its foreign-key check raises 23503 in a job. They are not this
  family, so they are left for the records turn to queue.
- **F2 — `isDeactivatedRefusal`** (`src/features/auth/deactivated.ts:37`) has no caller outside its
  own test, and matches the sentence `'account is deactivated'` that the doors on the shell no longer
  answer (`accountDeactivated`). It is outside SCOPE.
- **F3 — `listing_reveal_count(uuid)`** (`20261003215007`) has an `authenticated` grant that no code,
  policy or body names (`rg` 4 hits: a comment, the generated types, the manifest, the allowlist).
  Settled here by D6.
- No security hole was found.

## queued

From `rg -n "F1-5b" docs/governance/briefs docs/governance/reports roadmap.md scripts/conformance
scripts/doors`:

- **Built here:**
  - `scripts/doors/check-doors-allowlist.txt:6` (`listing_reveal_count` revokes or names its caller,
    D6);
  - `f1-doors-ruling-1.md:24` (INC-786 / INC-821: `FOR KEY SHARE`, the quiet answer, the class census
    over save, report, reveal and the photo doors, D1);
  - `f1-doors-3.md:15` and `f1-doors-3.census.md:182` (`accept_legal`);
  - `f1-doors-1.stop-1.md:114` (`listing_reveal_count` → F1-5b);
  - `f1-doors.stop-1.md:480` (the family row);
  - `tests-ci.md:90` (the `callee-codes` item, answered above);
  - `f1-doors-5a.md:19` (F1-5a's owner proofs as the pattern).
- **Left:**
  - `f1-doors-4b.census.md:179`, `f1-doors-5a.census.md:544–545` and `f1-doors-4b.md:15` (the public
    place readers: F1-7's readers);
  - `f1-doors-5a.md:15` (the buyer's readers: F1-7);
  - `roadmap.md:10`, `:21` (order-of-work lines; this turn is their F1-5b step).

## The decisions, numbered

- **D1 — the race.** The read before each keyed insert takes `FOR KEY SHARE`, in the two counters,
  `save_listing`, `report_listing`, `reveal_listing_contact` and `register_listing_photo`. The
  `EXISTS` form is rejected, because the foreign-key check reads a fresh snapshot.
- **D2 — the gate order (ruling 1 §7, the door check).** Every door spends its line's dial in its one
  `door_context` call, before the row is read. Behaviour that changes:
  - a repeat save counts `save`;
  - every refused report counts `report`, so AP-27's "counts written rows only" ends;
  - every reveal tap counts `contact_reveal`, including a same-day re-open and the owner's own;
  - an unsave counts `save` (DEC-385).
- **D3 — reveal's two returned ceilings stay returned at 200**: `sellersCapReached` (its flag must
  commit) and the new-account `rateLimited` with the midnight reset time.
- **D4 — every returned refusal that writes nothing becomes `door_refuse` with the same code**:
  `ownListing`, `alreadyReported`, `badReason`, `noteTooLong`, `acceptanceRequired`, `placeNotOpen`.
- **D5 — INC-1170 widened.** `save_listing`, `report_listing`, `reveal_listing_contact` (its gate) and
  `user_set_viewing_location` answer the gate's `rateLimited` with no reset time, until F1-7. The
  `resets_at` assertions at `ad-page-doors.spec.ts:757`, `:855–858` and `viewing-place.spec.ts:177`
  are removed with INC-1170 named.
- **D6 — `listing_reveal_count(uuid)`**: no caller, so its browser grant is revoked
  (`REVOKE ALL … FROM PUBLIC, anon, authenticated`; `service_role` kept). Its manifest line, its
  public-surface line and its door-check allowlist line go.
- **D7 — `'no profile row'` → `noProfile`**, a new code drawn by no screen.
- **D8 — `'unknown rate dial: contact_reveal_sellers'`** stays a plain RAISE: a configuration guard
  (the dial row missing), never a refusal a person meets. A 400 with the raw text reaches no screen,
  because `contact.ts` maps any error to `failed`.
- **D9 — `accept_legal`'s K4 literals** become `public.language_code('base')` and
  `public.language_code('pair')`, the same values.
