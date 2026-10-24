# Legal documents (Bundle 22, Stage 1, turn 1)

The legal documents' database: Terms, the Privacy Policy and the publishing statement, with numbered
versions, an admin-only change log, the legal settings, each person's acceptances and the legal e-mails
sent to him (the approved L1 v2 spec of 2026-10-04; brief
docs/governance/briefs/bundle-22-turn-1-v2.md). Admin › Legal is turn 2; /terms, /privacy, the acceptance screen and the person's legal history are turn 3; the publishing certification is turn 4.

## The model — five tables

- `legal_documents` — one row per kind and country. Kinds: `terms`, `privacy`, `publishing`, plus
  scratch kinds matching `^e2e-[a-z0-9-]{1,40}$` (test rows only). A NULL country is the global
  document. One document per kind and country; the kind and country are immutable once a version exists.
- `legal_versions` — numbered versions of a document: a label (1–60 chars, unique within the document),
  the English and Amharic bodies, the change log (staff-only), the material flag, the effective and
  publish times, who published and created it, and the settings snapshot. At most one open draft per
  document. A published row always carries both bodies, the material flag, both times and the snapshot.
- `legal_settings` — one row of legal facts (operator name and address, the legal and privacy e-mails,
  governing law, the providers list, the copyright agent, the liability limit, the notice, response and
  retention periods). Every fact in a document's text is a setting token `{{<setting>}}`; the row is
  frozen into each version's snapshot at publish.
- `legal_acceptances` — one row per person and version: when, the language shown, the 18+ statement
  (always true; the column carries no meaning when false), the sign-in method read from the session
  token, and the person's home country. No IP address is stored.
- `legal_notices` — one row per legal e-mail: the person, the version, the channel, the status, when,
  the provider's reference, the home country. The e-mail address itself is not stored.

Every table is closed to the browser roles (RLS deny policies on all four operations, service_role
only); all reads and writes go through the doors below.

## The rules

- A published version never changes and is never deleted, except that the service role may delete a
  published version of an `e2e-` scratch document (test cleanup).
- The first version of a document takes effect when it is published.
- A material change takes effect no earlier than the notice period (`legal_settings.notice_days`,
  30 days seeded); a non-material version takes effect when published.
- The change log is staff-only, forever: no reader door returns it.
- Past versions are staff-only, except that a person keeps every version he accepted or was sent a
  notice about, readable in full forever.
- An acceptance and a notice are final: they never change. They may still be deleted (user deletion,
  the pool reset).
- Acceptance is the caller's own: nobody can write another person's acceptance.
- The e-mail on a material change is recorded through `record_legal_notice` when the notifications
  work sends it; the acceptance screen is the notice until then.

## The doors

Reader doors:

| Door                                                               | Caller                                            | Refusals                                                                                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `legal_in_force(p_kind, p_country)`                                | anyone (anon + authenticated)                     | — (answers NULL when nothing is in force)                                                                                       |
| `legal_scheduled(p_kind, p_country)`                               | anyone (anon + authenticated)                     | — (NULL when no published version is ahead of its date)                                                                         |
| `my_legal_status(p_kinds)`                                         | signed in, own standing                           | not authenticated                                                                                                               |
| `accept_legal(p_version_ids, p_language, p_adult, p_data_consent)` | signed in, own rows                               | not authenticated, emptyList, adultRequired (until the 18+ statement is confirmed once), badLanguage, notInForce, notApplicable |
| `my_legal_history()`                                               | signed in, own rows                               | not authenticated                                                                                                               |
| `my_legal_version(p_version_id)`                                   | signed in; accepted, noticed or in-force versions | not authenticated, notYours                                                                                                     |
| `record_legal_notice(...)`                                         | service role only                                 | permission denied, notPublished                                                                                                 |

Staff doors (each checks its own permission through `has_permission`; the mutating ones also call
`require_step_up_if_needed('legal', <action>)`; every refusal of a missing or lesser caller is
`permission denied` or the step-up refusal; `e2e-` scratch documents follow the real kinds in the staff list):

| Door                                                                            | Permission                       | Refusals                                                                                                                               |
| ------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `admin_legal_documents()`                                                       | legal:view                       | —                                                                                                                                      |
| `admin_legal_version(p_version_id)`                                             | legal:view (change log included) | unknownVersion                                                                                                                         |
| `admin_save_legal_draft(...)`                                                   | legal:edit + step-up             | badValue:kind, badValue:country, labelRequired, labelTaken                                                                             |
| `admin_discard_legal_draft(p_version_id)`                                       | legal:edit + step-up             | unknownVersion, notDraft                                                                                                               |
| `admin_publish_legal_version(...)`                                              | legal:publish + step-up          | badValue:material, unknownVersion, notDraft, labelRequired, bothLanguages, changelogRequired, noticeTooShort, unknownFact, factMissing |
| `admin_legal_settings()`                                                        | legal:view                       | —                                                                                                                                      |
| `admin_set_legal_settings(p_settings)`                                          | legal:edit + step-up             | badValue:&lt;field&gt; (bad e-mail, out-of-range number, over-long text, unknown key)                                                  |
| `admin_user_legal_history(p_user_id)`                                           | profiles:view                    | unknownUser                                                                                                                            |
| `admin_export_legal_acceptances(p_version_id, p_after_at, p_after_id, p_limit)` | legal:export + step-up           | badValue:limit, badValue:after, unknownVersion                                                                                         |

The mutating staff doors write an audit row (`legal.draft_saved`, `legal.draft_discarded`,
`legal.published`, `legal.settings_set`); the export writes `legal.acceptances_exported` on its first page.

## Permissions

The resource is `legal` with actions `view` (no second factor), `edit`, `publish` and `export` (fresh
second factor; `export` since turn 12). No role holds any of them: the super admin holds every permission (`has_permission`).

## Admin › Legal (turn 2)

M2 v2 re-declares four doors whole: `admin_legal_documents` adds publisher names and acceptance counts
and lists scratch documents; `legal_in_force` answers a named scratch kind; `my_legal_status` returns
one version in force per applicable document and counts only material versions already in force
(INC-761); `admin_set_legal_settings` validates every number before writing and refuses invalid values
as `badValue:<key>` (INC-762). The roles matrix receives the supplied legal, edit and publish labels
in English and Amharic (INC-763). LG-5 proves the newest in-force version appears once, an accepted
document stays absent while a material version is ahead, and returns when a material version is in force.

- `/admin/legal`: three kind cards (`legal-kind-*`), global then country document blocks
  (`legal-doc-*`), current, scheduled and draft versions, newest-first history (`legal-history-*`),
  country creation and Legal facts (`legal-facts`, `legal-fact-*`). Scratch documents occupy Other documents.
- `/admin/legal/edit`: validated kind and country, draft or published-body prefill, bilingual write/preview,
  name and staff-only change log (`legal-field-*`, `legal-tab-*`, `legal-mode-*`, `legal-preview`).
  Save/discard/publish use the existing step-up gate; changed or unsaved drafts cannot publish.
  The editor form is separate from its data-loading wrapper. Fields lock throughout a save, including
  step-up; saved feedback is shown only while current values match the submitted snapshot.
  Publish and discard feedback is carried to the Legal page in validated navigation search.
- Publishing (`legal-publish-*`): first versions and corrections publish immediately with material false.
  Material changes begin unselected. The earliest choice is the UTC date of now plus the notice days;
  choosing it omits the date so the door uses the precise notice-period instant. Later choices send
  midnight UTC. Published versions are final.
- `/admin/legal/<version id>` (`legal-version-view`, `legal-view-*`): bilingual text, table of contents,
  staff change log and frozen publishing facts; drafts use current facts and offer permission-gated editing.
  Status uses the document's full version list, including Replaced.
- Facts edits send all 13 keys. Integer bounds: liability 0–1,000,000; notice 0–365; response 1–90;
  extra 0–90; deleted ads 1–120 months; disputes 0–20 years. Texts are required except the copyright
  agent; both e-mails are validated. Invalid forms send no request, Cancel restores read-only values.
- User detail (`user-legal-*`): newest-first acceptances and e-mail notices, named empty/error/loading
  states, version links only when the viewer holds legal:view.

LegalText renders React nodes only, never HTML: h1–h3, paragraph lines joined by spaces, single-level
bullet/number lists with indented continuations, trimmed pipe tables, bold, inline code, safe explicit
links, bare https links and e-mail addresses. Tokens use own-key facts; multiline values join with
commas and unknown tokens stay literal. h2 ids `s-1` onward drive the optional contents list.
Phone tables scroll within their own box; external links use a new tab and noopener/noreferrer.

Next: turn 3 public Terms and Privacy, the 18+ acceptance at sign-in and the person's legal history.

Tests: LG-1…LG-10 exercise the doors; LGA-1…LGA-7 exercise Admin › Legal and the user card.
The phone-frame super admin route census includes `/admin/legal`.

## Turn 3 — the public pages, the acceptance and the person's documents

- Routes: `/terms` and `/privacy` (public, SSR, canonical and og URLs from the root origin) show the
  version in force with its meta line, an English/Amharic switch, Print and the contents list; a
  published version ahead of its date (`legal_scheduled`) is announced with its date and can be shown
  instead. `/legal/terms` and `/legal/privacy` redirect there; `/legal/<e2e kind>` exists only in E2E
  builds (noindex); every other `/legal/<x>` is not found.
- The gate (`useLegalGate`, called once by the shell): while a person is signed in and not signing out,
  it reads `my_legal_status` for terms and privacy; anything listed sends him, replacing the entry, to
  `/legal/accept?next=<path>`. Exempt: `/legal/accept`, `/terms`, `/privacy`, anything under `/legal/`
  and `/auth`. A failed read redirects nobody and logs `[client-error] legal gate read failed`; the
  doors stay the authority. Only E2E builds (`isE2E`) may add scratch kinds through
  `window.__ethioLegalKinds`; production asks for exactly terms and privacy.
- The acceptance screen: one row per listed version with Read/Hide in place; tick 1 is the 18+
  statement with the Terms and/or the Privacy Policy (recorded as `adult_confirmed`), tick 2 appears
  only for a Privacy Policy version and is the separate consent to storage in the United States
  (recorded as `data_consent`; the door refuses consentRequired without it). Sign out leaves without
  any record. A notInForce refusal re-reads the list and clears the ticks.
- `/account/legal` lists the person's acceptances (with consent) and legal e-mails, newest first;
  `/account/legal/<version id>` shows one version with its frozen facts, the language switch and Print.
  Printing shows only the element marked `data-print-root`.
- Six new facts: operator_details, security_email, legal_phone, listed_ad_keep_months,
  account_keep_months, technical_keep_months (18 in all; providers is no longer shown). Notices show
  their version's name.
- Publishing refuses a token that is not a fact (unknownFact:<name>) or whose fact is empty today
  (factMissing:<name>); the editor's preview lists the empty-fact tokens.
- Never publish a version of a real kind (terms, privacy) on ethio-staging: every E2E account would meet the acceptance screen.

## Turn 4 — the publishing statement and the certification

- **Which statements apply.** For an ad: the version in force of every Publishing statement for all countries, for each country the ad is shown in (its places and its main place), and for the seller's home country (`legal_publishing_set`). All countries first, then by country.
- **One tick.** Before Publish (the posting form's review step), before each save of the seller's edit form, and in the Renew confirmation (the ad's page and the list in My listings), the seller sees those statements (`CertifyBlock`, src/features/legal/certify-block.tsx) and one tick, "I certify the above." When no statement applies the block renders nothing and the screens work as before; the review step then shows the old statement line.
- **The server's exact-set check.** `publish_listing`, `edit_my_listing` and `renew_listing` take `p_certified uuid[]` and `p_language text` and call `legal_certify` after their own checks and before their first write: `acceptanceRequired` while a Terms or Privacy version is owed (the rule of `my_legal_status`), `certificationRequired` unless the certified ids are exactly the versions in force for the ad, `badLanguage` unless the language is a public one. With nothing in force nothing is recorded.
- **The record.** `listing_certifications`: the ad, the seller, the action (publish, edit, renew), the statement versions, the ad's countries, the language shown, the time, the seller's home country. Closed to the browser roles; final (no update); erased with its ad.
- **Staff never certify.** The three doors are the seller's own (`auth.uid()` is the seller); staff edit through their own door and certify nothing.
- **The screens' refusals.** `certifyRefusal` (src/features/legal/certify-refusal.ts): `acceptanceRequired` sends the seller to /legal/accept with the current path and search; `certificationRequired` re-reads the statements, clears the tick and says the statement changed.
- **The staff card.** The ad's admin page shows a Certifications card (`admin_listing_certifications`, listings:view): one row per certification, newest first, with the statements certified; a statement links to its version only for a viewer holding legal:view.
- **The E2E seams.** A scratch document of kind `e2e-pub-<the listing id without dashes>` applies to that one listing; `e2e-acc-<the listing id without dashes>` counts as an owed acceptance for that one listing. Neither exists on production; tests never create a document of a real kind.
- **Owed.** Nothing from turn 4 (photos and the contact reveal: turn 6).
- The acceptance gate (INC-769, INC-770): `LegalGate` (src/features/legal/legal-gate.tsx) is mounted by the shell only while a person is signed in, its query has `gcTime: 0`, and it reads the pathname and the search string from the router's one `state.location`.
- **Bulk Renew (turn 5).** A bulk Renew in My listings carries no certification: it renews every ticked ad no statement applies to and names the ads that need the statement ('Not renewed: … Each one needs your statement: renew it on its own.'), each then renewed on its own through the statement; an owed Terms or Privacy acceptance stops the set and opens the acceptance screen.
- **Once per ad (turn 6, DEC-205).** The tick is asked only while the ad holds no certification of exactly the statement versions now in force for it: at its first publish, and again only for a new version or a country with its own statement. legal_certify then asks for nothing and records nothing (legal_listing_certified); my_listing_certification answers no statements, so the screens show no block. This amends DEC-129's tick on every publish, edit and renew; the Terms and Privacy acceptance at sign-in is unchanged.
- **Photos (turn 6).** A photo added to or replaced on a published ad (any status but draft) is an edit: register_listing_photo and replace_listing_photo take p_certified and p_language and call legal_certify (action edit) before their first write; /api/upload/photo checks the same set first with the seller's my_listing_certification (refusals `legal` · `acceptanceRequired` or `certificationRequired`, 409) so a refused photo costs no screening call, and sends the ids in the multipart field `certified` (separated by commas) with `language`; the photos step of a seller's edit waits for the tick when one is owed ('Tick the statement below before you add or change a photo.'). Removing, moving and choosing the cover add no content and ask for nothing. A draft's photos are certified when it is published.
- **The contact reveal (turn 6).** reveal_listing_contact answers {ok: false, reason: acceptanceRequired} to a viewer, never the owner, who owes a Terms or Privacy acceptance; the ad page opens the acceptance screen.
- **What the statement and the acceptance do not cover (turn 7 rulings).** The map pin (`set_listing_pin`) and the photos-soon switch (`set_listing_photos_soon`) add no content and ask for no certification, as removing, moving and choosing the cover. Save, unsave, report, the saved reads and the view count do not check an owed acceptance: DEC-129 names posting, editing, renewing and contacting sellers as what an owed acceptance stops; browsing stays open and a report stays open as a safety tool.
- **Cleanup (turn 7).** e2e/legal-certify.spec.ts and e2e/legal-doors.spec.ts clean their scratch rows in afterEach, a hook that survives a test's timeout (Knowledge J3). LG-5's home-country reset and extra versions joined the afterEach in turn 9.

Publish no version of the Publishing statement before turn 4 is on production: the doors refuse every publish, edit and renew that does not carry the certification.

## Turn 8 — the sold ad's shown days as a setting

- **The setting.** legal_settings.sold_visible_days (default 30, 1 to 365), edited in Admin › Legal facts with the other periods; the Terms quote it as {{sold_visible_days}}; each published version freezes it (settings_snapshot).
- **The reads.** sold_visible_days() answers the number and sold_cutoff() now() minus that many days; both stable, security definer, executable by anon, authenticated and service_role (the public policies call sold_cutoff() for every reader).
- **Who reads it.** The policies listings_public_read, listing_photos_public_read and listing_locations_public_read; feed_index_refresh, feed_index_check, feed_index_check_sweep, feed_page, seller_feed_page, public_listing, count_listing_view, count_listing_share, save_listing, report_listing and my_saved_listings (each through `(SELECT public.sold_cutoff())`); the seller's ad page for its sentence.
- **A change of the setting.** Applies at once to the ad pages, saves, reports, counts and policies. The feed's index keeps what it holds: a shorter period takes ads out at the next sweep; a longer one shows again an ad already swept out only when that ad is next refreshed.
- **INC-777.** M8d restores reveal_listing_contact's 30-a-day refusal to answer the gate's own reset time.
- **INC-778 (turn 9).** M8a's admin_set_legal_settings had lost the trimming of operator_details and legal_phone (a transcription slip); M9 re-declares it from M8a's supplied text, so both are trimmed again.

## Turn 12 — one tick, the 18+ statement once, local times, and the export (DEC-206, D226)

- **One tick (DEC-206, DEC-208).** The acceptance screen has one tick. The first time a person accepts, it reads "I am 18 or older. I have read and agree to the Terms of Service and the Privacy Policy." (or the Terms-only, Privacy-only or other-documents form); after that, a new version asks only "I have read and agree to the updated Terms of Service and the updated Privacy Policy." (or its one-document form). Storage in the United States is covered by the Terms and the Privacy Policy themselves; there is no separate storage tick.
- **The 18+ statement once.** `my_legal_status` carries `adult_confirmed` on each row (true once any acceptance of the caller confirmed 18 or older); `accept_legal` refuses adultRequired only while no acceptance of the caller has confirmed it, records `adult_confirmed` as sent, and no longer refuses consentRequired (the constraint legal_acceptances_adult_check was dropped; the door enforces the rule). `p_data_consent` is still accepted and recorded for a Privacy Policy version when true; the screen sends false.
- **Decline.** The screen's second button reads "Decline, sign out"; until the person accepts, every page that is not exempt sends them back to the screen.
- **The open app.** The gate also reads again when the window regains focus once its answer is five minutes old, so a version that comes into force while the app is open brings the screen at the person's return.
- **Local times.** Every legal moment is stored in UTC and shown in the viewer's own time zone: `legalMoment` (date, time with seconds, and the zone named) on Account › Legal documents and Admin › Users › Legal; `legalDate` (date only) for the "in force from" dates.
- **Admin › Users › Legal.** Each acceptance shows its time with the zone, and "18 or older confirmed" only on the acceptance that confirmed it.
- **The export (D226).** `admin_export_legal_acceptances(p_version_id, p_after_at, p_after_id, p_limit)` (legal:export with a fresh second factor; granted to no role, so only the super admin holds it) answers the version, its kind and country, and up to `p_limit` (1 to 5,000; default 1,000) rows ordered by acceptance time: account id, accepted at, language, sign-in method, home country, 18+ confirmed, storage consent — never a name, e-mail or phone. `next` (at, id) is present when a page is full; the next page passes it as `p_after_at` and `p_after_id`. Only a published version can be exported. The first page writes the audit row `legal.acceptances_exported`. The Admin › Legal page's Export button comes in turn 13.

## Turn 13 — Admin › Legal made easy to use (D226)

- **Each document.** The version in force has Read / Hide (`legal-read`), which shows its text in place (`legal-read-text`) with the facts frozen at publishing. Every version is listed under its document under "All versions" (`legal-history`, rows `legal-history-row` with View); the History toggle is gone and its string `admin.legal.action.history` retired.
- **A version** (`/admin/legal/<id>`). Compare with previous (`legal-compare`, `legal-diff`): a line diff of the language shown, added and removed lines marked (`legal-diff-added`, `legal-diff-removed`; `legal-diff-none` when nothing changed). Download (`legal-download`): the language shown as `ethio-<kind>-<country or all>-v<n>-<language>.md` with the facts filled in (frozen facts for a published version, today's for a draft; an unknown or empty fact stays as written). Print (`legal-print`): only the version's header and text print.
- **Export acceptances** (`legal-export`; a published version, a caller holding `legal:export`): every page of `admin_export_legal_acceptances` through the step-up, saved as `ethio-<kind>-<country or all>-v<n>-acceptances.csv` with the columns account_id, accepted_at, language, method, home_country, adult_confirmed, data_consent — never a name or e-mail; a cell that starts like a formula gets a leading apostrophe. Each export writes one audit row (turn 12's door). `legal-export-done` says how many rows were saved.
- **The editor.** Each language's text can be filled from a .md or .txt file (`legal-import-en`, `legal-import-am`; at most 200,000 characters); the draft still has to be saved.
- **Dates.** Admin › Legal and the version view show dates in the viewer's own time zone (DEC-207); the publish dialog's earliest date stays in UTC.

## Turn 17 — no one escapes the acceptance (D227, DEC-215)

- **First account and each refusal.** SU-3 creates a brand-new account through the real sign-up form on staging, confirms only the mail-link step through the admin API, signs in through the form, meets acceptance first and at `/`, `/post` and `/account`, accepts, and reads exactly one acceptance per scratch version. LG-25 proves edit refuses without changing the listing or revisions; LG-26 proves renewal refuses without changing status or expiry; LG-27 proves a published ad's photo upload refuses without a new photo row. Each succeeds after acceptance, alongside LG-17 (publish) and LG-20 (contact). Scratch rows are removed in afterEach; photo storage objects are also removed, with errors reported.
- **DEC-215 — THE WRITE-DOOR GUARD, its rules fixed before any number:** every function in schema public that the role `authenticated` may EXECUTE, that is VOLATILE, returns no trigger and belongs to no extension, either names `legal_acceptance_pending(` or `legal_certify(` in its definition, or has one line in scripts/acceptance-doors-allowlist.txt with a class and its own reason. STABLE and IMMUTABLE functions cannot write and pass. A line whose function no longer exists, is not VOLATILE or now checks is stale and fails.
- **The classes, and only these:** `legal` (the acceptance doors themselves); `account` (the caller's own account, sign-in, security, preferences and privacy rights — they stay open while an acceptance is owed); `staff` (doors gated inside by a staff permission; staff meet the acceptance screen like everyone); `draft` (writes only the caller's own unpublished draft, which no one else sees; the publish door checks); `signal` (private buyer signals and safety reports: save, unsave, report — D227 keeps them open); `helper` (an internal check, rebuild or counter that changes nothing a person sees); `owed` (a door that creates or changes what other people can see and lacks the check — each names INC-807; turn 17b adds the check and removes the line).
- **The guard runs in CI's smoke lane against the temporary backend built from every migration, so it judges exactly what production carries.** It runs before browser tests; build-and-check runs the self-test, which names both the unchecked door and the absent stale allowance in its bad fixture.
- **Measured live census.** 247 callable functions, 116 VOLATILE: 4 check, 112 allowlisted — legal 1, account 8, staff 80, draft 3, signal 3, helper 5, owed 12. `seller_places` is the caller's private reusable posting preset, not the public listing's place.
- **INC-807, turn 17b.** The owed doors are `edit_listing`, `mark_sold`, `move_listing_photo`, `relist_listing`, `remove_listing_photo`, `save_posting_identity`, `set_cover_photo`, `set_listing_photos_soon`, `set_listing_pin`, `set_listing_price`, `set_listing_reserved`, `transition_listing` (exact signatures and individual reasons in the allowlist). Turn 17b adds their acceptance checks and removes their allowances; the same turn adds Admin › Legal's per-version accepted-account and signed-in-without-acceptance counts through a staff door.

## Turn 17b — the acceptance guard on the tables (DEC-216)

- **The operator's decision (2026-10-20 23:3x New York).** one guard on the tables — ads, ad photos and seller names — not a check in each door, so it covers these twelve and every door added later; and a person who owes the new terms can ALWAYS take their own ads down ("removing content is never blocked").
- **M13, mark 20261021180000.** `legal_acceptance_guard()` is SECURITY DEFINER, VOLATILE, with search_path pinned to public, closed to browser execution. `acceptance_guard` runs before each row write on listings and listing_photos (INSERT/UPDATE) and on profiles (UPDATE OF seller_alias, seller_type, business_name, contact_prefs), before every other BEFORE row trigger by name.
- **Held.** Only the signed-in person's own rows, only while acceptance is owed, only when changing what others see: a non-draft ad's content, price, pin, reserve, photo promise or reopening/publication; its photos; changed public seller identity. Refusal raises the existing `acceptanceRequired` code. The publish, edit_my_listing, renew, photo-route and contact-reveal checks remain.
- **Allowed.** Drafts that remain drafts; every step down to closed, removed, sold, expired or draft; photo removal and its cover/stamp-only listing change; unchanged identity; staff acting on another person's rows, service-role work and scheduled jobs with no caller. Taking down is never held.
- **Person seam.** `legal_acceptance_pending` is redeclared whole with the added scratch kind `e2e-acc-u<the user id without dashes>`, beside the listing seam. No real kind is published by tests; scratch documents, versions and acceptances are removed in afterEach.
- **Classes.** `guarded` — every write the door makes to public.listings, public.listing_photos or the seller columns of public.profiles passes the acceptance_guard trigger (DEC-216), which holds it while an acceptance is owed; the reason names DEC-216 and the test that proves it. `takedown` — the door takes content down (an ad closed, removed or sold, or a photo removed), which DEC-216 never holds; the reason names DEC-216 and the test that proves it. The guard requires DEC-216 and an LG test id for either class; its self-test refuses unchecked, absent and unproven-guarded fixtures. CI smoke also requires all three enabled table triggers.
- **Allowlist counts.** 112 allowances: legal 1, account 8, staff 80, draft 3, signal 3, helper 5, owed 0, guarded 10, takedown 2. The twelve owed doors are now covered (INC-807); Admin › Legal's per-version counts move to turn 17c, superseding turn 17's forecast above.
- **Proofs.** LG-28 refuses nine live-ad change doors and compares complete listing/photo/revision truth after each refusal; price succeeds after acceptance. LG-29 proves sold, closed, removed and photo removal while still owing, with no acceptance row for each ad's scratch version. LG-30 proves a draft's pin, photos-soon, cover and submit_listing title save change while owing. LG-31 proves changed public name refuses, unchanged identity passes, and a new name lands after acceptance. Scratch sellers are leased; photo objects and legal rows are cleaned in afterEach with errors surfaced.
- **S353 — supervisor's ruling (2026-10-21).** set_listing_price admits active, reduced and closed, never a draft; LG-30 uses the existing draft-save door instead. my_listing_certification intentionally refuses a removed ad, so LG-29's final owed proof uses service-client acceptance rows. M13 stays as applied; no new migration or weakened takedown assertion.

## Turn 17c — who signed in without accepting (D227 (3))

- **Production's check.** Tests never run on production. Admin › Legal now shows, beside each version's Accepted by count, how many accounts signed in after it took effect without accepting. A person who owes acceptance is stopped on every page (LAC-1); the number therefore includes people who signed in and left without agreeing, or anyone who escaped.
- **M14, mark 20261021200000.** `legal_signed_in_unaccepted(uuid)` is STABLE, SECURITY DEFINER, search_path public and closed to browser roles. `admin_legal_documents()` is redeclared whole with one added field, `signed_in_unaccepted`; its existing legal:view authorization remains.
- **Counted.** For a published version already in force of Terms, Privacy, or M13's person seam `e2e-acc-u<user id without dashes>`, accounts whose `auth.users.last_sign_in_at` is at or after its effective time and which have not accepted the version `legal_acceptance_pending` asks for at that version (the newest published material version, or version 1, up to it), or a later version. The document's country rule matches `legal_acceptance_pending`.
- **Not counted.** Drafts, scheduled versions, publishing and other scratch kinds return NULL; no count line is shown. Deleted accounts are absent. Last sign-in means a sign-in, not a visit: someone who stays signed in is counted only after signing in again.
- **LGA-15.** A leased person signs in afresh after the scratch person-seam version takes effect. Signed-in staff read Accepted by 0 and unaccepted 1; after the person accepts, the page reads Accepted by 1 and unaccepted 0. Another scratch kind has no count line. Scratch legal rows are removed in afterEach, including after a timeout.

## Turn 19 — the approved texts' periods become facts (DEC-221)

- **The operator's approval (2026-10-21 02:41 New York).** "Terms and Privacy draft- approved" — the redline "Terms and Privacy v2 — pre-counsel redline", revision 108. The texts are published as soon as they are ready, not held for launch. The approved "Steps outside the text" says: "With the legal texts' turn: the 6-month appeal window, the one-year claims limit and the 30 days to talk first become facts, like the others."
- **M15, mark 20261021210000.** Four integer facts join `legal_settings` and the facts card, after `sold_visible_days`: `appeal_months` defaults to 6, bounds 1–24; `claims_limit_months` defaults to 12, bounds 1–60; `talk_first_days` defaults to 30, bounds 1–90; `complaint_ack_days` defaults to 30, bounds 1–90. Terms §5 and Privacy §5 quote `{{appeal_months}}`; the Terms' main points and §14 quote `{{claims_limit_months}}`; Terms §14 quotes `{{talk_first_days}}`; Privacy §10 quotes `{{complaint_ack_days}}`. Publishing freezes these facts in the version's `settings_snapshot`, like every other fact (DEC-129).
- **Proof outlives claims.** `account_keep_months >= claims_limit_months`: a closed account's identity, with its acceptance proof, stays at least as long as the claims window (approved redline item 2). The facts card refuses a shorter identity period before a request; the whole redeclared `admin_set_legal_settings` refuses it as `badValue:account_keep_months` before saving or auditing; a table CHECK also enforces it.
- **Acceptance liability line.** New key `legal.accept.liabilityLimits`: "The Terms limit our liability, set a time limit for claims, and make you responsible for your ads and deals, including claims they cause against us. The main points are at the top of the Terms." No period is typed into the line. The approved English and Amharic are copied unchanged from the brief; `legal.accept.liability` is retired when unread (D5), leaving its database row for Admin › Translations' orphan retirement path. The paragraph has `legal-accept-liability`.
- **D1–D4.** Unit cases prove the four bounds/integer rules and identity shorter/equal to claims; the service case proves all 23 facts in order. LGA-1 reads all 23 from service-client truth, including the formerly omitted sold period. LGA-4 refuses appeal 0 and, separately, claims 24 with identity 12, then reads unchanged `updated_at` and restored card values; no test saves the real settings row. LAC-1 reads the new liability line while acceptance is owed, accepts scratch versions and reads back acceptance rows. Both complete staging spec files run on both projects without retries; scratch legal rows are cleaned in afterEach, including after a timeout.

## Turn 20 — review dates and the admin menu's mark (DEC-219); INC-812

- **The operator's decision (2026-10-21).** Admin › Legal shows each document's review due — every 6 months by default, a legal setting; "Reviewed — no change" is recorded with who, when and a note; a publish counts as a review; an overdue review shows on the admin menu.
- **M16, mark 20261022090000.** `legal_settings.review_months` (default 6, 1–24) is a fact: the facts card edits it and each published version freezes it. `legal_reviews` keeps each "Reviewed — no change" (document, who, when, note); it is final, closed to the browser roles and removed with its document. `legal_review_due(document)` is the later of the newest publish and the newest review, plus `review_months`; there is none while the document has no published version.
- **The doors.** `admin_mark_legal_reviewed(document, note)`: legal:edit and the step-up; refuses `nothingToReview` and `badValue:note`; audits `legal.reviewed`. `legal_review_overdue()`: true while a terms, privacy or publishing document (any country), or the caller's own `e2e-rev-u<id>` test document, is due; false without legal:view. `admin_legal_documents()` carries each document's `review`.
- **INC-812.** A finality trigger lets its own ON DELETE SET NULL keys through: deleting the account of someone who published or drafted a legal version sets `published_by` and `created_by` to NULL; every other change to a published version is still refused.
- **One language per page.** /terms, /privacy, /legal/<kind> and a person's own version page show the text in the site's language only, with no print button (the operator, 2026-10-21); staff pages keep both languages.
- **The house surfaces.** The acceptance screen sits in one PageCard; the public legal page's text, the person's two legal lists and his version's text each sit in a Section — like the account and settings pages (the operator, 2026-10-21: "All pages should have consistent designs and themes").
- **Tests.** LGA-16 (the review line, the dialog, the audit, the door's refusal), LGA-17 (overdue: the card and the menu's mark, cleared by a review; false without legal:view), LGA-18 (INC-812); unit cases for the 24 facts, the bound, reviewState and the menu item's alert.

## Every enabled language (bundle 22 turn 23, DEC-228)

English and Amharic stay columns of legal_versions and stay required to publish. Any other language's text is a row of legal_version_texts (one per version and language): a draft's rows are edited with the draft; a published version takes a translation through admin_add_legal_translation (legal:publish, step-up, the version's frozen facts checked), once per language, and the row is then final — the Terms say the English text applies where a translation differs. Every reader chooses its text with legalTextFor: the reader's language when the version has it, otherwise English with the line 'This text is not yet available in your language, so it is shown in English.' accept_legal records the language actually shown, version by version. Tests: LGA-19, LGA-20, LG-32 and the units of legalTextFor.

## Turn 32 — one agree-to-document component (D230, DEC-236, D231)

Every agreement to a document is `AgreeToDocument` (`src/features/legal/agree-to-document.tsx`): a controlled checkbox beside a sentence with the documents as links, the standard required styling (refused: aria-invalid, the message, data-refused), never disabled — the action is drawn closed (data-closed) and a tap marks the tick refused. Props: id, testId, sentence, links, checked, onCheckedChange, refused, message. Consumers: the sign-up form (auth.tsx), the acceptance screen (legal-accept-screen.tsx), the certify block (certify-block.tsx — review, seller edit, Renew). The census test (agree-to-document.test.tsx) refuses a `<Checkbox` beside a `legal.` key anywhere else.

The sign-up form's tick is recorded by the signup trigger (M21): the form sends metadata `legal_accept {version_ids, language, adult, data_consent}`; `handle_new_user` records one `legal_acceptances` row per version only for published, in-force, applicable gate-kind versions, with adult confirmation, the site's language (validated against enabled_public languages) and home_country_code null (no country_guess in a form sign-up); unexpected metadata warns and never blocks the signup.

The landing after a sign-in reads the gate first: `landAfterSignIn` (use-legal-gate.ts) sends a session with an owed acceptance to /legal/accept?next=… before the return path; its six callers (auth.tsx, auth*.callback.tsx, auth*.reset.tsx included) are censused by a unit test. The full-load limit: the server does not know the session, so a page load with an owed acceptance paints once before the gate redirects.

The publishing statement is a public page, /legal/publishing (?country= scopes the statement to a market), and the certification reads "I certify the [publishing statement]" in the link form. Admin › Legal's document card carries View (legal:view) and Add translation (legal:publish) for the version in force, the latter opening the version page with the translation panel open (INC-825).

### Turn 33 — inline agreement links and the legal translation door

`AgreeToDocument` renders translator-placed `[text](role)` tokens with the strict grammar `/\[([^\]\n]{1,120})\]\((terms|privacy|publishing)\)/g`. The screen supplies each role's URL; no URL comes from a translation. Unknown or malformed tokens remain text. The checkbox and sentence censuses cover both catalogues. Seven `legal.agree.*` keys replace the seven old sentences (first and updated, both/terms/privacy, and certify). Certification carries one publishing link; the publishing page shows the global statement and every applying country section.

M22 (mark 20261024180000) adds each list version's `languages`; M23 (mark 20261024190000) adds `missing_languages: {code, name_en}[]` to `admin_legal_documents()` and `admin_legal_version(uuid)`. Both fields are strictly parsed, including the empty set. The card names the missing languages and offers Add translation only to legal:publish; the version page's select reads the same door-owned rule. Arrival with `translate=1` puts the panel above the text, scrolls it into view and focuses the select, respecting reduced motion. LGA-21 uses a legal-only publisher and its own scratch language.

The draft editor is the one `useLanguages()` reader left: a draft has no version, while M23's `missing_languages` is per version. INC-850 moves its optional-text language list from `admin_list_languages` (translations:view) to a legal door next legal turn, with a legal-only editor proof.

INC-849: `readSellerIdentity` now throws a typed reader failure. Every caller was censused: the contact step, wizard home-country fallback, review, and the My listing query. The wizard logs the class and resets home to unknown; review records the failure and shows the contact-read sentence with its diagnostic class. When a reader changes from null to throw, every caller is listed and handles rejection in the same turn; the Foundations door Result replaces this manual rule with compiler enforcement.

## The publishing statement's audience (D236; Foundations turn 1)

The publishing statement is for signed-in people only. The doors are the authority: M24 (mark 20261024200000) makes `legal_in_force` and `legal_scheduled` refuse an anonymous caller (SQLSTATE 42501) when `public.legal_kind_signed_in_only(p_kind)` — the predicate `p_kind = 'publishing' OR p_kind ~ '^e2e-pub-'` — answers true; a public kind answers as before. The screen is convenience: `/legal/publishing` (src/routes/legal.publishing.tsx, `ssr: false`, noindex) gates by `requireSignedIn`, so a visitor goes to `/auth` with the way back (`?country=` and, under the E2E build, `?kind=` ride the return path). The scratch class `e2e-pub-*` lets the E2E proof read its own statements through the same loader path; the public route `/legal/$kind` answers notFound for a publishing-class kind. `legal-kinds.ts`'s `signedInOnlyKind` is the TypeScript mirror of the migration's predicate; the LK-mirror test reads the newest migration and refuses drift. LGC-6 proves the refusal (PostgREST maps the anon 42501 to HTTP 401), the redirect and the signed-in reads.
