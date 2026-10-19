# Bundle 22 — Stage 1, turn 2 (v2): Admin › Legal — documents, drafts, the publish step and the legal facts — the user page's Legal card, and LegalText (M2): brief (saved unchanged, 2026-10-19)

```text
BUNDLE 22 — STAGE 1, TURN 2, v2 (2026-10-19; replaces bundle-22-turn-2.md, which was never saved: your rule "verify the request's central flow once end-to-end before concluding, in the state a real user would hit it" is now Part I, the end-to-end check, after the staging apply). Tier A (a staff door re-declared; the screens that publish the legal texts). ONE MIGRATION BY THE TOOL (M2, small, LAST). New strings (105 keys, EN+AM, given below). No package change. One AGENTS.md change (given below, exact). Base: dev 86fd282c (bundle 22 turn 1b). Parts, IN THIS ORDER: A — CI first; B — LegalText; C — Admin › Legal; D — the user page's Legal card; E — the strings; F — the tests; G — the docs, AGENTS.md, the selector and the roadmap; H — M2 (LAST: the tool applies it on ethio-prod the moment it is saved); the stop report with the apply line; after the operator's staging apply and "continue", I — the end-to-end check; then the final report.

WHY
- Stage 1 (the approved L1 v2 spec of 2026-10-04; the operator's rulings of 2026-10-19 02:2x local): staff write each legal document in numbered, named versions in English and Amharic with a change log only staff see; a published version is final; a material change takes effect no sooner than the notice period; every fact in the text is a setting, frozen into each version at publish. Turn 1 built the database and its doors; this turn builds the staff screens on them, so the operator can enter version 1 of the Terms and the Privacy Policy once its wording is approved (the curator's peer review, then the supervisor's redline — not in this turn). Nothing a visitor sees changes: /terms, /privacy, the 18+ acceptance at sign-in and the person's own legal history are turn 3, on LegalText built here.
- Turn 1's admin_legal_documents left out two fields the brief named (the publisher's display name and each version's number of acceptances) and leaves out scratch documents, so a screen test cannot find its own. M2 re-declares it whole with those three changes (Part H); nothing else in the database changes.
- The texts are Markdown (docs/spec/legal/*.md use # and ## headings, - lists, **bold**, pipe tables and one `code` span). No Markdown package is in the project and none is added (G42): LegalText is a small renderer of exactly that subset that never renders HTML.

STEP 0 — save this file (the attached bundle-22-turn-2-v2.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-2-v2.md and paste its sha256sum. roadmap.md: (1) line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-2-v2.md (bundle 22 — Stage 1, turn 2: Admin › Legal, the user page's Legal card and LegalText; M2). Next: Stage 1's turn 3 — /terms, /privacy, the 18+ acceptance at sign-in and the person's legal history;" keeping the rest of the line from "D199 (discount / sale)" on; (2) after the line that begins "  - [ ] Turn 1b (docs/governance/briefs/bundle-22-turn-1b.md", one new line:
  - [ ] Turn 2 (docs/governance/briefs/bundle-22-turn-2-v2.md; M2, mark 20261019220000) — Admin › Legal (the documents by kind and country, versions, drafts in English and Amharic with a staff-only change log, the publish step with the material choice and the notice period, the version view, the legal facts), the user page's Legal card, LegalText; the screens split in two: turn 3 /terms, /privacy, the 18+ acceptance and the person's legal history, turn 4 the publishing certification, turn 5 the banned-items and safety pages
Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B to G; the checks; Part H LAST; THE STOP REPORT with the apply line, and STOP; — the operator applies M2 on ethio-staging and sends "continue" —; Part I; THE FINAL REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git diff` and `git rev-parse` are fine.
- The end-to-end check (Part I) is your rule's check of the central flow, in the state a real user hits it: a real browser, signed in as the staging super admin with a second factor, against ethio-staging, through `bun run e2e:local` only (AGENTS.md: never plain `playwright test`; the wrapper checks the browser first and refuses any target outside ethio-staging). Never the preview signed in and never production: the admin screens need a super admin with a second factor, and the preview is production (no production sign-in). If the browser does not start (INC-506, open since 2026-10-08), Part I says what to do. Unit tests run locally, whole. Edit spec files by hand, never by search-and-replace (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared component or helper never changes its default (new behaviour is an option).
- Every legal test row is a scratch one, kind `e2e-…`, created and removed by the test; a test never writes legal_settings (it reads it) and never creates a document of a real kind (terms, privacy, publishing) (G27). A role's permissions are real reference rows: no test grants or removes one. Find a test's own rows by their kind, never by position on a page (G28).
- A string is copied from Part E by key, character for character; no Amharic of your own. No literal UI text.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1041 on 86fd282c (turn 1b) or, if it has not finished, run 1040 on 0c7d5c75 — say which. If the newest finished run is red in any test or job other than run 1040's migration linter and RL-1 (both fixed by turn 1b): read its body at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md or https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md, quote it in the report's first lines and fix it first, at its root cause (G21, G38).

PART B — LegalText (src/features/legal/; the area "legal" of scripts/e2e-select.ts already covers it).
B1. src/features/legal/legal-markdown.ts — a pure parser of the subset, no React: `parseLegal(text)` returns blocks; `legalHeadings(text)` returns the ## headings in order as { id, text } with id `s-1`, `s-2`, … (the same ids in both languages, so a table of contents links the same sections); `unknownTokens(text, facts)` returns the token names the text uses that the facts do not hold, each once, in order of first use. The subset, exactly:
  - a line "# x" is the title (h1), "## x" a section (h2, with its id), "### x" a sub-section (h3);
  - consecutive non-blank lines form one paragraph, joined by a space;
  - lines starting "- " are a bulleted list, lines starting "1. " (any number, a dot, a space) a numbered list; a following line indented by two or more spaces continues the item; one level only;
  - a pipe table: a row of cells between pipes, then a row of dashes and pipes, then rows; cells trimmed;
  - inline, in paragraphs, items, headings and cells: **bold**; `code`; [text](href) where href starts with https://, http://, mailto: or a single /, otherwise the whole thing is shown as plain text; a bare e-mail address becomes a mailto link; a bare https:// address becomes a link;
  - a token {{name}} (name: lower-case letters and _) is replaced by the fact of that name; a fact holding several lines is joined with ", "; a name the facts do not hold stays visible as the literal {{name}};
  - anything else, < and > included, is text.
B2. src/features/legal/legal-text.tsx — `LegalText({ text, facts, toc? })` renders the blocks as React elements only — never dangerouslySetInnerHTML, never an HTML string — inside one root with data-testid="legal-text"; h2 elements carry their id; with `toc` it first renders the list of ## headings as links to #s-1 … (data-testid="legal-toc"); a link that leaves the site opens in a new tab with rel="noopener noreferrer"; an unknown token renders as its literal text in a span with data-testid="legal-unknown-token"; facts are read with `ownValue` (src/lib/own-key.ts — AGENTS.md: a map indexed by a key from outside). 360-first, logical CSS (RTL-safe), tables scroll sideways inside their own box on a phone, never the page.
B3. Unit tests (src/features/legal/legal-markdown.test.ts and legal-text.test.tsx): every rule of B1 one by one; the two drafts read from docs/spec/legal/terms-of-service-v1.en.md and privacy-policy-v1.en.md parse with 17 and 15 ## headings, in English and in Amharic alike (docs/spec/legal/*-v1.am.md), the policy's table rows intact; ids s-1… equal in the English and the Amharic of each; `<script>alert(1)</script>` and `<b>x</b>` render as text (no element created); a javascript: link and a data: link render as plain text; {{legal_email}} filled, {{nope}} reported by `unknownTokens` and shown literally; a providers fact on two lines joined with ", ".

PART C — ADMIN › LEGAL (the existing admin feature: src/features/admin/legal/; routes beside the other admin routes, named by their convention — e.g. admin.listings_.$listingId.tsx).
C1. The section. src/features/admin/sections.ts gains, after "translations": { id: "legal", path: "/admin/legal", permission: "legal:view", titleKey: "admin.section.legal.title", bodyKey: "admin.section.legal.body" } (no group); src/features/admin/rail-items.ts maps it to lucide's `Scale` icon. The admin layout's gate applies as for every section. Census, in the report: every test or unit test that counts or lists the admin sections or a super admin's admin rows — named, with its change (the role "admin" holds no legal permission, so RL-1 and the other admin-by-role tests see no new row; say so for each).
C2. /admin/legal (data-testid="legal-page"): the documents from admin_legal_documents and the facts from admin_legal_settings (react-query keys under the admin root, as src/features/admin-ai does).
  - Three cards in this order, one per real kind — Terms of Service, Privacy Policy, Publishing statement (legal.kind.*), data-testid="legal-kind-terms" / "legal-kind-privacy" / "legal-kind-publishing" — and, only when any exists, a fourth, "Other documents" (data-testid="legal-kind-other"), listing scratch documents by their raw kind.
  - In each card, one block per document (data-testid="legal-doc-<kind>-<country code or global>"): the global one first, titled "All countries", then each country document titled by the country's name, by code. A kind with no document shows "No version yet." and New version for all countries.
  - In each block: the version in force — the highest published version whose effective time has passed (data-testid="legal-in-force"): "Version n", its name, "In force", Material change or Correction, "Published {date} by {name}" (published_by_name; "Published {date}" when the name is absent), "Accepted by {count}"; a published version whose effective time is still ahead (data-testid="legal-scheduled"): "Takes effect {date}"; the draft (data-testid="legal-draft"): "Draft", its name, and Edit draft (data-testid="legal-edit-draft"); when there is no draft, New version (data-testid="legal-new-version"). History (data-testid="legal-history-toggle") opens every version newest first, each row (data-testid="legal-history-row", data-version="<n>") with its number, name, status (In force, Takes effect {date}, Replaced, Draft), date, and View (data-testid="legal-view-link") to /admin/legal/<version id>.
  - Under each real-kind card: Country version — a select of the countries (useCountries, src/features/admin/users/use-admin-users.ts :124; data-testid="legal-add-country-select") without a document of that kind yet — and Add country (data-testid="legal-add-country"), which opens the editor for that kind and country; its help admin.legal.addCountry.help.
  - The Legal facts card (Part C6).
  - Actions show only with their permission from the permissions the admin layout already reads (usePermissions): New version, Edit draft, Add country and Edit facts with legal:edit; Publish with legal:publish. The doors decide; the screen only hides.
C3. The editor, /admin/legal/edit?kind=<kind>&country=<code> (country absent = all countries; data-testid="legal-editor"). The kind must be terms, privacy, publishing or match ^e2e-[a-z0-9-]{1,40}$, the country two capital letters or absent; otherwise "This document does not exist." (data-testid="legal-bad-document").
  - It opens the document's draft when one exists (admin_legal_version on the draft's id); otherwise a new version, its English and Amharic text taken from the newest published version (admin_legal_version) with the note "Started from version {n}; change what is new." (data-testid="legal-prefilled-note"), its name and change log empty; for a document with no version, everything empty. Title: "{document}: draft" or "{document}: new version", where {document} is the kind's name, " · ", and the scope (All countries or the country's name).
  - Fields: Version name (data-testid="legal-field-label", 1–60 characters, help admin.legal.field.labelHelp); the language switch English / Amharic (data-testid="legal-tab-en" / "legal-tab-am"), each language with Write / Preview (data-testid="legal-mode-write" / "legal-mode-preview"); the text areas (data-testid="legal-field-body-en" / "legal-field-body-am", at most 200,000 characters, a count "{count} of {max} characters" under each, help admin.legal.field.bodyHelp); What changed (data-testid="legal-field-changelog", at most 10,000 characters, help admin.legal.field.changelogHelp).
  - Preview (data-testid="legal-preview") renders the text with LegalText and today's facts (admin_legal_settings); above it, when any, "Not among the Legal facts: {tokens}" (data-testid="legal-unknown-tokens").
  - Save draft (data-testid="legal-save-draft"), through the step-up gate (StepUpGate / its guard, src/features/auth/mfa/step-up-gate.tsx) → admin_save_legal_draft(kind, country, name, English, Amharic, change log — an empty change log is sent as an empty string) → "Draft saved." and the page now edits that draft. Discard draft (data-testid="legal-discard-draft", only when a saved draft exists) → a confirm "Discard this draft?" / admin.legal.discardBody (data-testid="legal-discard-confirm") → through the gate → admin_discard_legal_draft → "Draft discarded." → back to /admin/legal. Publish (data-testid="legal-publish") opens Part C4's dialog; it is disabled while the draft is unsaved or changed since its save, with "Save the draft before publishing." beside it. Back to Legal (data-testid="legal-back").
  - A door refusal is shown as its sentence: labelRequired, labelTaken, bothLanguages, changelogRequired, noticeTooShort (with the earliest date), notDraft → admin.legal.error.*; any other → admin.legal.error.generic; a text over its limit is refused on the screen with admin.legal.error.tooLong before any request.
C4. The publish dialog (data-testid="legal-publish-dialog"), titled "Publish {document}, version {n}", with "A published version is final: it can never be edited or deleted."
  - Version 1 of a document (no published version yet): "This is the first version: …" (data-testid="legal-publish-first-note") and no question; it publishes with p_material false and no date (in force at once).
  - Any later version: "What kind of change is this?" — Material change (data-testid="legal-publish-material", help admin.legal.publish.materialHelp with the notice days from the facts) or Correction (data-testid="legal-publish-correction", help admin.legal.publish.correctionHelp); neither is chosen at first and Publish stays disabled until one is. Material shows Takes effect on — a date input (data-testid="legal-publish-date"), its minimum and first value the earliest date, with "Earliest: {date}, the notice period from now.": the earliest date is the UTC calendar date of now + notice days; when the chosen date is the earliest date the request sends no date (the door then uses now + the notice period exactly); a later date is sent as that date at 00:00 UTC. This rule is a pure function with its unit test. Correction sends p_material false and no date.
  - Publish (data-testid="legal-publish-confirm"), through the step-up gate → admin_publish_legal_version → "Published. Version {n} can no longer be changed." → /admin/legal.
C5. The version view, /admin/legal/<version id> (data-testid="legal-version-view"): admin_legal_version; the title as C3 with "Version n · name"; its status, effective and publishing dates; What changed (staff only) (data-testid="legal-view-changelog"); English / Amharic (data-testid="legal-view-tab-en" / "legal-view-tab-am") rendered by LegalText with toc — a published version with its frozen facts (settings_snapshot), listed under "Facts frozen at publishing" (data-testid="legal-view-facts"); a draft with today's facts and admin.legal.view.draftFacts, and Edit draft. A published version shows no edit or discard action. An unknown id: "This version does not exist." (data-testid="legal-version-not-found").
C6. The Legal facts card (data-testid="legal-facts"), on /admin/legal under the kind cards: title, help admin.legal.facts.help; each of the 13 facts in the door's order (operator_name, operator_address, legal_email, privacy_email, governing_law, providers, copyright_agent, liability_limit_usd, notice_days, response_days, response_extra_days, deleted_ad_keep_months, dispute_keep_years): its label (admin.legal.fact.<name>), its value (data-testid="legal-fact-<name>"; "Not set" when empty) and its token {{<name>}} as code, so staff copy it into a text.
  - Edit facts (data-testid="legal-facts-edit") turns the card into a form: text inputs for the names, the two e-mails and the governing law; text areas for the address, the providers and the copyright agent; whole-number inputs for the numbers within the table's bounds (liability 0–1,000,000; notice 0–365; answer 1–90; extra 0–90; deleted ads 1–120 months; records 0–20 years). Each input data-testid="legal-fact-input-<name>", its error data-testid="legal-fact-error-<name>": "Required." (every text but the copyright agent), "Enter an e-mail address." (the two e-mails), "A whole number from {min} to {max}.". Save facts (data-testid="legal-facts-save") sends nothing while any field is in error; otherwise, through the step-up gate, admin_set_legal_settings with all 13 keys (the copyright agent empty = cleared) → "Legal facts saved." and the card reads again. Cancel (common.cancel; data-testid="legal-facts-cancel") restores the read-only card without a request.

PART D — THE USER PAGE'S LEGAL CARD (src/features/admin/users/user-detail.tsx, after the activity card, :357).
D1. A card "Legal" (data-testid="user-legal-card") from admin_user_legal_history(p_user_id) (profiles:view, which the page already requires): "Accepted" — one row per acceptance, newest first (data-testid="user-legal-acceptance"): the document (kind name · scope · Version n · name) and admin.users.legal.acceptedMeta with the date, the language shown (admin.legal.lang.en / .am), the sign-in method as stored, and the 18+ statement; "Legal e-mails" — one row per notice (data-testid="user-legal-notice"): the document and admin.users.legal.noticeMeta with Sent / Failed / Bounced. Empty: "Nothing accepted yet." (data-testid="user-legal-no-acceptances"), "No legal e-mail sent yet." (data-testid="user-legal-no-notices"). The version is a link to /admin/legal/<version id> only for a viewer holding legal:view; otherwise plain text.

PART E — THE STRINGS (105 keys; en.ts and am.ts, each key beside its neighbours of the same prefix; copied character for character; `bun run i18n:map-guard` must end "usage maps match the tree" — regenerate the usage maps with the project's own command if the guard asks).
{
 "legal.kind.terms": {
  "en": "Terms of Service",
  "am": "የአገልግሎት ውሎች"
 },
 "legal.kind.privacy": {
  "en": "Privacy Policy",
  "am": "የግላዊነት መመሪያ"
 },
 "legal.kind.publishing": {
  "en": "Publishing statement",
  "am": "የማስታወቂያ ማረጋገጫ ቃል"
 },
 "admin.section.legal.title": {
  "en": "Legal",
  "am": "ሕጋዊ"
 },
 "admin.section.legal.body": {
  "en": "Terms, Privacy and the publishing statement in named versions, final once published, and the facts they quote.",
  "am": "ውሎች፣ ግላዊነት እና የማስታወቂያ ማረጋገጫ ቃል በስም በተሰየሙ ስሪቶች — ከታተሙ በኋላ አይለወጡም — እና የሚጠቅሷቸው መረጃዎች።"
 },
 "admin.legal.scope.global": {
  "en": "All countries",
  "am": "ሁሉም አገሮች"
 },
 "admin.legal.addCountry.label": {
  "en": "Country version",
  "am": "የአገር ስሪት"
 },
 "admin.legal.addCountry.action": {
  "en": "Add country",
  "am": "አገር ጨምር"
 },
 "admin.legal.addCountry.help": {
  "en": "A country version applies, together with the one for all countries, to people whose home country it is.",
  "am": "የአገር ስሪት ከሁሉም አገሮች ስሪት ጋር፣ ያ አገር የመኖሪያ አገራቸው ለሆኑ ሰዎች ይሠራል።"
 },
 "admin.legal.otherDocuments": {
  "en": "Other documents",
  "am": "ሌሎች ሰነዶች"
 },
 "admin.legal.status.inForce": {
  "en": "In force",
  "am": "በሥራ ላይ"
 },
 "admin.legal.status.scheduled": {
  "en": "Takes effect {date}",
  "am": "ከ{date} ጀምሮ ይሠራል"
 },
 "admin.legal.status.draft": {
  "en": "Draft",
  "am": "ረቂቅ"
 },
 "admin.legal.status.replaced": {
  "en": "Replaced",
  "am": "ተተክቷል"
 },
 "admin.legal.none": {
  "en": "No version yet.",
  "am": "እስካሁን ምንም ስሪት የለም።"
 },
 "admin.legal.version": {
  "en": "Version {n}",
  "am": "ስሪት {n}"
 },
 "admin.legal.change.material": {
  "en": "Material change",
  "am": "ዋና ለውጥ"
 },
 "admin.legal.change.correction": {
  "en": "Correction",
  "am": "እርማት"
 },
 "admin.legal.publishedOn": {
  "en": "Published {date}",
  "am": "{date} ታትሟል"
 },
 "admin.legal.publishedBy": {
  "en": "Published {date} by {name}",
  "am": "{date} በ{name} ታትሟል"
 },
 "admin.legal.acceptedBy": {
  "en": "Accepted by {count}",
  "am": "የተቀበሉ፦ {count}"
 },
 "admin.legal.action.newVersion": {
  "en": "New version",
  "am": "አዲስ ስሪት"
 },
 "admin.legal.action.editDraft": {
  "en": "Edit draft",
  "am": "ረቂቁን አርትዕ"
 },
 "admin.legal.action.view": {
  "en": "View",
  "am": "ተመልከት"
 },
 "admin.legal.action.history": {
  "en": "History",
  "am": "ታሪክ"
 },
 "admin.legal.action.saveDraft": {
  "en": "Save draft",
  "am": "ረቂቁን አስቀምጥ"
 },
 "admin.legal.action.discardDraft": {
  "en": "Discard draft",
  "am": "ረቂቁን ጣል"
 },
 "admin.legal.action.publish": {
  "en": "Publish",
  "am": "አትም"
 },
 "admin.legal.action.back": {
  "en": "Back to Legal",
  "am": "ወደ ሕጋዊ ተመለስ"
 },
 "admin.legal.action.editFacts": {
  "en": "Edit facts",
  "am": "መረጃዎቹን አርትዕ"
 },
 "admin.legal.action.saveFacts": {
  "en": "Save facts",
  "am": "መረጃዎቹን አስቀምጥ"
 },
 "admin.legal.action.write": {
  "en": "Write",
  "am": "ጻፍ"
 },
 "admin.legal.action.preview": {
  "en": "Preview",
  "am": "ቅድመ እይታ"
 },
 "admin.legal.editor.titleNew": {
  "en": "{document}: new version",
  "am": "{document}፦ አዲስ ስሪት"
 },
 "admin.legal.editor.titleDraft": {
  "en": "{document}: draft",
  "am": "{document}፦ ረቂቅ"
 },
 "admin.legal.field.label": {
  "en": "Version name",
  "am": "የስሪቱ ስም"
 },
 "admin.legal.field.labelHelp": {
  "en": "1 to 60 characters, not used by another version of this document — for example 2026-11.",
  "am": "ከ1 እስከ 60 ፊደላት፤ የዚህ ሰነድ ሌላ ስሪት ያልተጠቀመበት — ለምሳሌ 2026-11።"
 },
 "admin.legal.field.bodyEn": {
  "en": "English text",
  "am": "የእንግሊዝኛው ጽሑፍ"
 },
 "admin.legal.field.bodyAm": {
  "en": "Amharic text",
  "am": "የአማርኛው ጽሑፍ"
 },
 "admin.legal.field.bodyHelp": {
  "en": "Markdown: # and ## headings, lists with -, **bold** and tables. Write each fact as its token from Legal facts; it is filled in when the text is shown. The English text is the authoritative one.",
  "am": "ማርክዳውን፦ # እና ## ርዕሶች፣ በ - የሚጀምሩ ዝርዝሮች፣ **ደማቅ** እና ሰንጠረዦች። እያንዳንዱን መረጃ ከሕጋዊ መረጃዎች ባለው ምልክቱ ይጻፉ፤ ጽሑፉ ሲታይ ይሞላል። የእንግሊዝኛው ጽሑፍ ይጸናል።"
 },
 "admin.legal.field.changelog": {
  "en": "What changed",
  "am": "ምን ተለወጠ"
 },
 "admin.legal.field.changelogHelp": {
  "en": "Seen by staff only. Required to publish; final once published.",
  "am": "የሚታየው ለሠራተኞች ብቻ ነው። ለማተም ያስፈልጋል፤ ከታተመ በኋላ አይለወጥም።"
 },
 "admin.legal.count": {
  "en": "{count} of {max} characters",
  "am": "ከ{max} ፊደላት {count}"
 },
 "admin.legal.unknownTokens": {
  "en": "Not among the Legal facts: {tokens}",
  "am": "በሕጋዊ መረጃዎቹ ውስጥ የሉም፦ {tokens}"
 },
 "admin.legal.saved": {
  "en": "Draft saved.",
  "am": "ረቂቁ ተቀምጧል።"
 },
 "admin.legal.discardTitle": {
  "en": "Discard this draft?",
  "am": "ይህ ረቂቅ ይጣል?"
 },
 "admin.legal.discardBody": {
  "en": "Its text is lost; published versions are not touched.",
  "am": "ጽሑፉ ይጠፋል፤ የታተሙ ስሪቶች አይነኩም።"
 },
 "admin.legal.discarded": {
  "en": "Draft discarded.",
  "am": "ረቂቁ ተጥሏል።"
 },
 "admin.legal.saveFirst": {
  "en": "Save the draft before publishing.",
  "am": "ከማተምዎ በፊት ረቂቁን ያስቀምጡ።"
 },
 "admin.legal.prefilled": {
  "en": "Started from version {n}; change what is new.",
  "am": "ከስሪት {n} ተጀምሯል፤ አዲሱን ይለውጡ።"
 },
 "admin.legal.publish.title": {
  "en": "Publish {document}, version {n}",
  "am": "{document}፣ ስሪት {n} ማተም"
 },
 "admin.legal.publish.final": {
  "en": "A published version is final: it can never be edited or deleted.",
  "am": "የታተመ ስሪት የመጨረሻ ነው፦ ፈጽሞ ሊስተካከል ወይም ሊሰረዝ አይችልም።"
 },
 "admin.legal.publish.first": {
  "en": "This is the first version: it takes effect at once, and everyone is asked to accept it at their next sign-in.",
  "am": "ይህ የመጀመሪያው ስሪት ነው፦ ወዲያውኑ ይሠራል፤ ሁሉም በሚቀጥለው መግቢያቸው እንዲቀበሉት ይጠየቃሉ።"
 },
 "admin.legal.publish.question": {
  "en": "What kind of change is this?",
  "am": "ይህ ምን ዓይነት ለውጥ ነው?"
 },
 "admin.legal.publish.materialHelp": {
  "en": "It changes a right or a duty. Everyone is asked to accept it again; it takes effect no sooner than {days} days from now.",
  "am": "መብትን ወይም ግዴታን ይለውጣል። ሁሉም እንደገና እንዲቀበሉት ይጠየቃሉ፤ ከአሁን ጀምሮ ከ{days} ቀናት በፊት አይሠራም።"
 },
 "admin.legal.publish.correctionHelp": {
  "en": "Wording or spelling only; no right or duty changes. It takes effect at once; nobody is asked again.",
  "am": "የቃል ወይም የፊደል እርማት ብቻ፤ መብትም ግዴታም አይለወጥም። ወዲያውኑ ይሠራል፤ ማንም እንደገና አይጠየቅም።"
 },
 "admin.legal.publish.effective": {
  "en": "Takes effect on",
  "am": "የሚሠራበት ቀን"
 },
 "admin.legal.publish.earliest": {
  "en": "Earliest: {date}, the notice period from now.",
  "am": "ቀደም ብሎ ሊሆን የሚችለው፦ {date}፣ ከአሁን ጀምሮ የቅድሚያ ማሳወቂያ ጊዜው ሲያልቅ።"
 },
 "admin.legal.published": {
  "en": "Published. Version {n} can no longer be changed.",
  "am": "ታትሟል። ስሪት {n} ከእንግዲህ ሊለወጥ አይችልም።"
 },
 "admin.legal.view.changelog": {
  "en": "What changed (staff only)",
  "am": "ምን ተለወጠ (ለሠራተኞች ብቻ)"
 },
 "admin.legal.view.facts": {
  "en": "Facts frozen at publishing",
  "am": "ሲታተም የተቀመጡ መረጃዎች"
 },
 "admin.legal.view.draftFacts": {
  "en": "A draft shows today's facts; publishing freezes them.",
  "am": "ረቂቅ የዛሬዎቹን መረጃዎች ያሳያል፤ ሲታተም ይቀመጣሉ።"
 },
 "admin.legal.lang.en": {
  "en": "English",
  "am": "እንግሊዝኛ"
 },
 "admin.legal.lang.am": {
  "en": "Amharic",
  "am": "አማርኛ"
 },
 "admin.legal.notFound": {
  "en": "This version does not exist.",
  "am": "ይህ ስሪት የለም።"
 },
 "admin.legal.badDocument": {
  "en": "This document does not exist.",
  "am": "ይህ ሰነድ የለም።"
 },
 "admin.legal.facts.title": {
  "en": "Legal facts",
  "am": "ሕጋዊ መረጃዎች"
 },
 "admin.legal.facts.help": {
  "en": "Every fact the texts quote. A published version keeps the facts it went out with; a change here reaches the texts at their next version.",
  "am": "ጽሑፎቹ የሚጠቅሷቸው መረጃዎች በሙሉ። የታተመ ስሪት ሲታተም የነበሩትን መረጃዎች ይዞ ይቆያል፤ እዚህ የሚደረግ ለውጥ ጽሑፎቹን የሚደርሰው በሚቀጥለው ስሪታቸው ነው።"
 },
 "admin.legal.facts.notSet": {
  "en": "Not set",
  "am": "አልተሞላም"
 },
 "admin.legal.facts.saved": {
  "en": "Legal facts saved.",
  "am": "ሕጋዊ መረጃዎቹ ተቀምጠዋል።"
 },
 "admin.legal.facts.badEmail": {
  "en": "Enter an e-mail address.",
  "am": "የኢሜይል አድራሻ ያስገቡ።"
 },
 "admin.legal.facts.required": {
  "en": "Required.",
  "am": "ያስፈልጋል።"
 },
 "admin.legal.facts.range": {
  "en": "A whole number from {min} to {max}.",
  "am": "ከ{min} እስከ {max} ያለ ሙሉ ቁጥር።"
 },
 "admin.legal.fact.operator_name": {
  "en": "Operator's legal name",
  "am": "የድረ-ገጹ ባለቤት ሕጋዊ ስም"
 },
 "admin.legal.fact.operator_address": {
  "en": "Operator's address",
  "am": "የድረ-ገጹ ባለቤት አድራሻ"
 },
 "admin.legal.fact.legal_email": {
  "en": "Legal e-mail",
  "am": "የሕግ ጉዳዮች ኢሜይል"
 },
 "admin.legal.fact.privacy_email": {
  "en": "Privacy e-mail",
  "am": "የግላዊነት ጉዳዮች ኢሜይል"
 },
 "admin.legal.fact.governing_law": {
  "en": "Governing law",
  "am": "የሚገዛው ሕግ"
 },
 "admin.legal.fact.providers": {
  "en": "Service providers, one a line",
  "am": "አገልግሎት ሰጪዎች፣ በአንድ መስመር አንድ"
 },
 "admin.legal.fact.copyright_agent": {
  "en": "Copyright agent",
  "am": "የቅጂ መብት ወኪል"
 },
 "admin.legal.fact.liability_limit_usd": {
  "en": "Liability limit, US dollars",
  "am": "የተጠያቂነት ገደብ፣ በአሜሪካ ዶላር"
 },
 "admin.legal.fact.notice_days": {
  "en": "Notice period, days",
  "am": "የቅድሚያ ማሳወቂያ ጊዜ፣ በቀናት"
 },
 "admin.legal.fact.response_days": {
  "en": "Answer data requests within, days",
  "am": "የመረጃ ጥያቄዎች መልስ ጊዜ፣ በቀናት"
 },
 "admin.legal.fact.response_extra_days": {
  "en": "Extra time for complex requests, days",
  "am": "ለውስብስብ ጥያቄዎች ተጨማሪ ጊዜ፣ በቀናት"
 },
 "admin.legal.fact.deleted_ad_keep_months": {
  "en": "Keep deleted ads, months",
  "am": "የተሰረዙ ማስታወቂያዎች የሚቆዩበት ጊዜ፣ በወራት"
 },
 "admin.legal.fact.dispute_keep_years": {
  "en": "Keep records after a dispute closes, years",
  "am": "ክርክር ከተዘጋ በኋላ መዛግብት የሚቆዩበት ጊዜ፣ በዓመታት"
 },
 "admin.legal.error.labelRequired": {
  "en": "Give the version a name.",
  "am": "ለስሪቱ ስም ይስጡ።"
 },
 "admin.legal.error.labelTaken": {
  "en": "Another version of this document already has this name.",
  "am": "የዚህ ሰነድ ሌላ ስሪት ይህን ስም አስቀድሞ ይዟል።"
 },
 "admin.legal.error.bothLanguages": {
  "en": "Publishing needs both the English and the Amharic text.",
  "am": "ለማተም የእንግሊዝኛውም የአማርኛውም ጽሑፍ ያስፈልጋል።"
 },
 "admin.legal.error.changelogRequired": {
  "en": "Say what changed before publishing.",
  "am": "ከማተምዎ በፊት ምን እንደተለወጠ ይግለጹ።"
 },
 "admin.legal.error.noticeTooShort": {
  "en": "A material change cannot take effect before {date}.",
  "am": "ዋና ለውጥ ከ{date} በፊት ሊሠራ አይችልም።"
 },
 "admin.legal.error.notDraft": {
  "en": "This version is already published.",
  "am": "ይህ ስሪት አስቀድሞ ታትሟል።"
 },
 "admin.legal.error.tooLong": {
  "en": "Too long: at most {max} characters.",
  "am": "በጣም ረጅም ነው፦ ቢበዛ {max} ፊደላት።"
 },
 "admin.legal.error.load": {
  "en": "The legal documents could not be loaded.",
  "am": "ሕጋዊ ሰነዶቹን መጫን አልተቻለም።"
 },
 "admin.legal.error.generic": {
  "en": "That did not work. Try again.",
  "am": "አልተሳካም። እንደገና ይሞክሩ።"
 },
 "admin.users.legal.title": {
  "en": "Legal",
  "am": "ሕጋዊ"
 },
 "admin.users.legal.accepted": {
  "en": "Accepted",
  "am": "የተቀበላቸው"
 },
 "admin.users.legal.notices": {
  "en": "Legal e-mails",
  "am": "ሕጋዊ ኢሜይሎች"
 },
 "admin.users.legal.noAcceptances": {
  "en": "Nothing accepted yet.",
  "am": "እስካሁን የተቀበለው ነገር የለም።"
 },
 "admin.users.legal.noNotices": {
  "en": "No legal e-mail sent yet.",
  "am": "እስካሁን የተላከ ሕጋዊ ኢሜይል የለም።"
 },
 "admin.users.legal.acceptedMeta": {
  "en": "{date} · shown in {language} · signed in by {method} · 18 or older confirmed",
  "am": "{date} · በ{language} ታይቷል · በ{method} ገብቷል · ዕድሜው 18 ወይም ከዚያ በላይ መሆኑን አረጋግጧል"
 },
 "admin.users.legal.noticeMeta": {
  "en": "{date} · e-mail · {status}",
  "am": "{date} · ኢሜይል · {status}"
 },
 "admin.users.legal.status.sent": {
  "en": "Sent",
  "am": "ተልኳል"
 },
 "admin.users.legal.status.failed": {
  "en": "Failed",
  "am": "አልተሳካም"
 },
 "admin.users.legal.status.bounced": {
  "en": "Bounced",
  "am": "ተመልሷል"
 }
}

PART F — THE TESTS.
F1. Unit: Part B3; the publish-date rule of C4 (the earliest date across a UTC midnight; the earliest date sends no date; a later date sends 00:00 UTC; Correction and version 1 send false and no date); the refusal-to-sentence mapping of C3; the facts form's validation (each bound, both e-mails, the required texts, the optional agent).
F2. e2e/legal-doors.spec.ts, after LG-9: "LG-10 admin_legal_documents lists a scratch document with each version's publisher and acceptance count, newest version first, after the real kinds" — a scratch document; a draft saved and published through the doors by the super admin with a fresh second factor (`useJobSuperAdmin`, `superAdminToken`); a leased user accepts it; the super admin's admin_legal_documents holds the document (found by kind), its versions newest first, `published_by_name` equal to the super admin's display name read through the service client, `acceptances` 1; no document of a real kind appears after an e2e- one in the answer. Cleanup in finally.
F3. e2e/legal-admin.spec.ts (NEW; area "legal"), both projects, the super admin by `useJobSuperAdmin(page)` unless a test says otherwise, every document a scratch kind `${RUN_TAG}-x` (as legal-doors.spec.ts makes them), the cleanup in finally by the service client — acceptances and notices, then versions, then documents of that kind:
  - AL-1 /admin/legal shows the three kind cards in order and the Legal facts card whose 13 values equal legal_settings as the service client reads it (the empty agent as "Not set"); the super admin's admin menu has the Legal row (its link to /admin/legal); an admin by role (leaseUser + grantRole(…, "admin")) has none and /admin/legal shows the admin layout's existing not-permitted state (as the other admin specs assert it).
  - AL-2 the editor round trip: /admin/legal/edit?kind=<scratch> — a name, an English text with "## 1. First", "- an item" and {{legal_email}} and {{nope}}, an Amharic text, a change log; Save draft → one draft row with exactly those values (service client); Preview shows the h2 "1. First" and the legal e-mail read from legal_settings in place of the token, and lists "nope" in legal-unknown-tokens; Publish → the first-version note and no question → confirm → the row is published, material false, effective_at within two minutes of now; /admin/legal shows it in "Other documents" as In force with "Accepted by 0" and the super admin's display name.
  - AL-3 a material version: a published v1 seeded by the service client; New version opens with the English area equal to v1's body and the prefilled note; a new name, text and change log; Save draft; Publish → the question; Material change → the date input's minimum is the UTC date of now + notice_days (notice_days read from legal_settings); confirm with the earliest date → the row is published, material true, effective_at minus published_at equal to notice_days within two minutes; the block shows v1 In force and v2 "Takes effect {date}".
  - AL-4 the facts form refuses before any request: Edit facts → the legal e-mail field set to "not-an-email" and the notice period to 400 → Save facts → both field errors shown; legal_settings' updated_at unchanged (service client); Cancel → the read-only card with the old values. No test saves valid facts.
  - AL-5 the version view: a published scratch v1 seeded with a change log, an English and an Amharic body and a settings_snapshot holding legal_email "snapshot@example.invalid" whose English body uses {{legal_email}} → the change log shown; the English tab shows "snapshot@example.invalid" (the frozen fact, not today's); the Amharic tab shows the Amharic body; no Edit draft or Discard draft on the page.
  - AL-6 discard: a draft saved through the editor → Discard draft → confirm → back on /admin/legal; no draft row for the document (service client).
  - AL-7 the user page's Legal card: a leased person accepts a scratch version through accept_legal and has a notice recorded through record_legal_notice by the service client → /admin/users/<id> shows one user-legal-acceptance naming the scratch kind and the version's name, and one user-legal-notice reading Sent; a second leased person with neither shows both empty states.
  Leased accounts at most two per test (DEC-174). Part I runs the new and changed files locally; CI runs every file on the final commit.

PART G — THE DOCS, AGENTS.md, THE SELECTOR, THE ROADMAP.
G1. docs/features/legal.md: a section "Admin › Legal (turn 2)" — the screens, each test id family, the publish-date rule, the facts form's bounds, LegalText's subset (B1) and its rule never to render HTML; turn 3's screens named as next. docs/_changelog.md APPEND one line: "- 2026-10-19 — Bundle 22 (Stage 1) turn 2 (one migration, M2): Admin › Legal — the documents by kind and country with their versions, drafts in English and Amharic with a staff-only change log, the publish step (version 1 at once; a correction at once; a material change no sooner than the notice period), the version view with its frozen facts, the legal facts form; the user page's Legal card; LegalText, the Markdown subset renderer that never renders HTML; admin_legal_documents gains the publisher's name and the acceptance count and lists scratch documents; LG-10, AL-1…AL-7."
G2. AGENTS.md — the changes (a)–(h), each text found exactly once, nothing else changes (each new line is shown below indented by four spaces; the line itself starts at its "- "); after them the file's sha256 is 92ff814f0c94cdca5c1ef0ba092ebe23c7242ac340a755515574a434db2eab4b and the part after the LOVABLE block is 5,116 bytes (the budget is 5,120); prettier 3.8.3 passes it (the supervisor checked):
  (a) the blank lines after the line that begins "- A map indexed by a key from outside" are removed (four), so the file's last lines follow one another without a blank line;
  (b) the line that begins "- E2E tests that only need a signed-in account" becomes, whole:
    - E2E tests that only need a signed-in account use `leaseUser()` (lane-scoped pool, reaped at lease); `createUser()` only for a brand-new identity or a target account. Why: deleted users still count as monthly active users (DEC-097).
  (c) in the line that begins "- CI evidence: read", the text "Why: dev/main evidence freezes; bot commits strand dev; mirror lacks ci-evidence (DEC-098, S87)." becomes "Why: dev/main copies are frozen; your mirror lacks ci-evidence (DEC-098, S87).";
  (d) the line that begins "- Lint workflows" becomes, whole:
    - Lint workflows with `actionlint -shellcheck= -pyflakes=`, as CI does (INC-457, INC-460). Why: rejected workflows lose evidence; local shellcheck varies.
  (e) in the line that begins "- A text a brief gives for a string", the text "no Amharic of your own for a key the brief gives." becomes "no Amharic of your own for it.";
  (f) the line that begins "- Cut names use CutText" becomes, whole:
    - Cut names use CutText; crowded-row captions use useLabelRoom on their own row; action-focus modality installs once at hydration (grapheme floors kept, no resize loops or duplicate listeners).
  (g) the line that begins "- QR encoding stays" becomes, whole:
    - QR encoding stays in `src/server/qr.ts`; public QR routes check the id's shape without database reads; the marketplace guard forbids the encoder (no first-paint weight).
  (h) one line added at the end of the file:
    - Legal (bundle 22): texts render only via `LegalText` (src/features/legal), never as HTML; facts are {{setting}} tokens from the version's frozen settings.
G3. scripts/e2e-select.ts, the area "legal" (:98-:103): src becomes ["src/features/legal/**", "src/features/admin/legal/**", "src/routes/admin.legal*"] (the route files as their names turn out; every glob must match, the self-test says so); specs unchanged.
G4. roadmap.md as STEP 0 says.

PART H — M2, BY THE TOOL, LAST (the tool applies it on ethio-prod the moment it is saved, after the operator allows the "Modify Supabase database" dialog). Run `bash scripts/check-migrations.sh` with the text in place first and paste its last line ("Migration guard OK."); then submit exactly this text, once (the supervisor applied it to a scratch PostgreSQL 16 with the turn-1 tables and ran the proofs and the answer; the repository's guards pass with it):
-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 2 — M2: admin_legal_documents re-declared whole. Three changes, nothing else:
-- each version also carries the publisher's display name and its number of acceptances, and the list
-- includes scratch documents (kind e2e-...) so Admin › Legal's tests find their own; the real kinds come
-- first (terms, privacy, publishing), each global document before its country documents. Gated on bundle
-- 22 turn 1 part 2's mark; a migration is not DONE until its mark is read back from the live database.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261019210000') THEN
    RAISE EXCEPTION 'bundle 22 turn 1 part 2 (mark 20261019210000) must be applied first';
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.admin_legal_documents()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'document_id', d.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'versions', coalesce((
               SELECT jsonb_agg(jsonb_build_object(
                        'version_id', v.id,
                        'version', v.version,
                        'status', v.status,
                        'label', v.label,
                        'material', v.material,
                        'effective_at', v.effective_at,
                        'published_at', v.published_at,
                        'published_by_name', p.display_name,
                        'acceptances', (SELECT count(*) FROM public.legal_acceptances a
                                         WHERE a.version_id = v.id),
                        'created_at', v.created_at)
                      ORDER BY v.version DESC)
                 FROM public.legal_versions v
                 LEFT JOIN public.profiles p ON p.user_id = v.published_by
                WHERE v.document_id = d.id), '[]'::jsonb))
           ORDER BY array_position(ARRAY['terms', 'privacy', 'publishing'], d.kind) NULLS LAST,
                    d.kind, d.country_code NULLS FIRST)
      FROM public.legal_documents d), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_legal_documents() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_legal_documents() TO authenticated;
GRANT ALL ON FUNCTION public.admin_legal_documents() TO service_role;

-- Proofs, with no caller and on no row (G39): the door refuses a missing caller; its header attributes
-- and its grants are as declared. Its answer's contents are proven by LG-10 on scratch rows.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
BEGIN
  BEGIN
    PERFORM public.admin_legal_documents();
    RAISE EXCEPTION 'proof failed: a missing caller was answered';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
    FROM pg_proc p WHERE p.oid = 'public.admin_legal_documents()'::regprocedure;
  IF v_vol IS DISTINCT FROM 's' OR v_def IS DISTINCT FROM true
     OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
    RAISE EXCEPTION 'proof failed: header attributes changed (%, %, %)', v_vol, v_def, v_conf;
  END IF;
  IF has_function_privilege('anon', 'public.admin_legal_documents()', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof failed: anon may execute admin_legal_documents';
  END IF;
  IF NOT has_function_privilege('authenticated', 'public.admin_legal_documents()', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof failed: authenticated may not execute admin_legal_documents';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261019220000') ON CONFLICT (version) DO NOTHING;
H1. After the apply, paste the read-back on ethio-prod: `select version from public.migration_marks where version = '20261019220000';` and `select provolatile, prosecdef, proconfig from pg_proc where oid = 'public.admin_legal_documents()'::regprocedure;` (s, true, {search_path=public}). Regenerate src/integrations/supabase/types.ts if the tool changes it (the return type stays jsonb).

PART I — THE END-TO-END CHECK (after the operator's "continue": M2 must be on ethio-staging first — the staging preflight refuses the browser tests until its mark is there).
I1. Run one file at a time, each whole, both projects, 0 retries: `bun run e2e:local -- e2e/legal-admin.spec.ts --retries=0`, then `bun run e2e:local -- e2e/legal-doors.spec.ts --retries=0`, then `bun run e2e:local -- e2e/admin-users.spec.ts --retries=0` (the user page changed in Part D). Paste each run's summary lines (passed, failed, skipped, flaky).
I2. A failure: read its error and its context, fix it at its root cause (G38: no assertion loosened, no timeout raised, no retry added), and run that file again whole; a fix in a shared file reruns every file of I1 that uses it. Name each failure and its fix in the final report.
I3. If the browser guard stops the run (no usable browser — INC-506), paste its message once and go on to the final report: CI on the final commit is then the proof.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bun run i18n:map-guard` "usage maps match the tree"; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK".
SCOPE — these files only: the brief; src/features/legal/ (legal-markdown.ts, legal-text.tsx and their tests); src/features/admin/legal/ (the service, the hooks, the page, the editor, the publish dialog, the version view, the facts card, the publish-date rule, the user card and their unit tests); the new admin.legal route files; src/routeTree.gen.ts (regenerated); src/features/admin/sections.ts; src/features/admin/rail-items.ts; src/features/admin/users/user-detail.tsx; src/i18n/locales/en.ts and am.ts (and the usage maps the guard regenerates); e2e/legal-doors.spec.ts; e2e/legal-admin.spec.ts (new); any test C1's census must change (named with its reason); docs/features/legal.md; docs/_changelog.md; AGENTS.md; scripts/e2e-select.ts; roadmap.md; the migration file the tool writes; src/integrations/supabase/types.ts if the tool regenerates it; the files of an A1 fix (named with the failure it fixes); the files of a Part I fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change.
THE STOP REPORT (after Part H; then STOP): done or not done by part; A1's six lines with the run's number and commit (and A1's bodies, if any); <START>; C1's census; the strings — `git diff <START> -- src/i18n/locales/en.ts src/i18n/locales/am.ts` whole (every key with its English and Amharic, G43); AGENTS.md's sha256 and the bytes after the LOVABLE block; `grep -n 'test("' e2e/legal-admin.spec.ts` and `grep -n 'test("LG-10' e2e/legal-doors.spec.ts` (describe the tests by those titles only); the checks; the "Migration guard OK." line pasted before the save; the migration's file name and size in bytes; H1's read-backs; `git diff --name-only <START>`; anything not foreseen; and, last, the operator's staging line: "apply <the uuid fragment of the migration file name> → expect mark 20261019220000". Then STOP: the operator applies M2 on ethio-staging, reads its mark back and sends "continue".
THE FINAL REPORT (after Part I): I1's summary lines for each file, I2's failures and fixes, or I3's message; the checks again if Part I changed a file; `git diff --stat <START>`; `git diff --name-only <START>`; anything not foreseen. Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: a later migration that restores turn 1's admin_legal_documents whole (forward only); git revert of this turn's commits.
```
