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
