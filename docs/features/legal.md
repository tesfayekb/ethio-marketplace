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

| Door                                               | Caller                                            | Refusals                                                                            |
| -------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `legal_in_force(p_kind, p_country)`                | anyone (anon + authenticated)                     | — (answers NULL when nothing is in force)                                           |
| `my_legal_status(p_kinds)`                         | signed in, own standing                           | not authenticated                                                                   |
| `accept_legal(p_version_ids, p_language, p_adult)` | signed in, own rows                               | not authenticated, emptyList, adultRequired, badLanguage, notInForce, notApplicable |
| `my_legal_history()`                               | signed in, own rows                               | not authenticated                                                                   |
| `my_legal_version(p_version_id)`                   | signed in; accepted, noticed or in-force versions | not authenticated, notYours                                                         |
| `record_legal_notice(...)`                         | service role only                                 | permission denied, notPublished                                                     |

Staff doors (each checks its own permission through `has_permission`; the mutating ones also call
`require_step_up_if_needed('legal', <action>)`; every refusal of a missing or lesser caller is
`permission denied` or the step-up refusal; `e2e-` scratch documents follow the real kinds in the staff list):

| Door                                      | Permission                       | Refusals                                                                                                     |
| ----------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `admin_legal_documents()`                 | legal:view                       | —                                                                                                            |
| `admin_legal_version(p_version_id)`       | legal:view (change log included) | unknownVersion                                                                                               |
| `admin_save_legal_draft(...)`             | legal:edit + step-up             | badValue:kind, badValue:country, labelRequired, labelTaken                                                   |
| `admin_discard_legal_draft(p_version_id)` | legal:edit + step-up             | unknownVersion, notDraft                                                                                     |
| `admin_publish_legal_version(...)`        | legal:publish + step-up          | badValue:material, unknownVersion, notDraft, labelRequired, bothLanguages, changelogRequired, noticeTooShort |
| `admin_legal_settings()`                  | legal:view                       | —                                                                                                            |
| `admin_set_legal_settings(p_settings)`    | legal:edit + step-up             | badValue:&lt;field&gt; (bad e-mail, out-of-range number, over-long text, unknown key)                        |
| `admin_user_legal_history(p_user_id)`     | profiles:view                    | unknownUser                                                                                                  |

The mutating staff doors write an audit row (`legal.draft_saved`, `legal.draft_discarded`,
`legal.published`, `legal.settings_set`).

## Permissions

The resource is `legal` with actions `view` (no second factor), `edit` and `publish` (fresh second
factor). No role holds any of them: the super admin holds every permission (`has_permission`).

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
  states, version links only when the viewer holds legal:view. Notices show Version n without a
  version name because the existing history door does not return one.

LegalText renders React nodes only, never HTML: h1–h3, paragraph lines joined by spaces, single-level
bullet/number lists with indented continuations, trimmed pipe tables, bold, inline code, safe explicit
links, bare https links and e-mail addresses. Tokens use own-key facts; multiline values join with
commas and unknown tokens stay literal. h2 ids `s-1` onward drive the optional contents list.
Phone tables scroll within their own box; external links use a new tab and noopener/noreferrer.

Next: turn 3 public Terms and Privacy, the 18+ acceptance at sign-in and the person's legal history.

Tests: LG-1…LG-10 exercise the doors; LGA-1…LGA-7 exercise Admin › Legal and the user card.
The phone-frame super admin route census includes `/admin/legal`.
