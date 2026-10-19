# Bundle 22 — Stage 1, turn 3: /terms and /privacy, the 18+ acceptance at sign-in (a hard stop), the person's legal documents, the new legal facts and the publish check (M3a, M3b): brief (saved unchanged, 2026-10-19)

```text
BUNDLE 22 — STAGE 1, TURN 3 (2026-10-19). Tier A (the acceptance that every signed-in person passes; doors re-declared; a new public door). TWO MIGRATIONS BY THE TOOL (M3a, then M3b, LAST). New strings (56 keys, EN+AM, given below; one key removed). No package change. No AGENTS.md change. Base: dev 7779dfbb (bundle 22 turn 2). Parts, IN THIS ORDER: A — CI first; B — the reading and the gate; C — the public pages; D — the acceptance screen; E — the person's legal documents; F — the staff screens; G — the strings; H — the tests; I — the docs, the allowlist, the selector, the roadmap; J — M3a then M3b (LAST: the tool applies each on ethio-prod the moment it is saved); the stop report with the apply lines; after the operator's staging applies and "continue", K — the end-to-end check; then the final report.

WHY
- Stage 1 (the approved L1 v2 spec of 2026-10-04; DEC-128; DEC-204, the operator 2026-10-19 04:2x local): /terms and /privacy show the version in force; every signed-in person accepts the Terms and the Privacy Policy in force, with an 18+ statement, and — separately — consents to storage in the United States; each person keeps every version he accepted, and the legal e-mails sent to him, in his own account.
- The operator, 2026-10-19 05:0x local, on the acceptance: "can not signin without accepting terms of service and privacy policy- hard stop". A signed-in person with a document to accept sees only the acceptance screen: Agree and continue, or Sign out. There is no "Not now". The public pages and the sign-in pages stay reachable so he can read and leave.
- The operator, 05:2x local: sold and expired ads stay in the seller's list "12 months (DEC-130 as is)". DEC-129 says every period the texts quote is an admin setting, so M3a adds that period and two others the drafts quote (a closed account's identity, technical records), each 12 months, plus the company details, a legal phone and a security e-mail. The providers fact is no longer shown: the Privacy text names the providers in its own table. Its column stays (dropping it would be destructive).
- Turn 1's readers never returned a version's frozen facts, so a reader could not fill a text's tokens; M3a adds them. A version published with a token whose fact is empty would show a blank in a legal text; M3b refuses it.
- Nothing is published yet: no real document is in force on ethio-prod or ethio-staging, so the acceptance stays inert until the operator publishes version 1. Tests exercise it with scratch documents only. The server-side check that refuses publishing without a current acceptance comes with the publishing certification (turn 4), which re-declares the same doors.

STEP 0 — save this file (the attached bundle-22-turn-3.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-3.md and paste its sha256sum. roadmap.md: (1) line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-3.md (bundle 22 — Stage 1, turn 3: /terms, /privacy, the acceptance at sign-in as a hard stop, the person's legal documents, the new legal facts; M3a, M3b). Next: Stage 1's turn 4 — the publishing certification and the server-side acceptance check;" keeping the rest of the line from "D199 (discount / sale)" on; (2) after the line that begins "  - [ ] Turn 2 (docs/governance/briefs/bundle-22-turn-2-v2.md", one new line:
  - [ ] Turn 3 (docs/governance/briefs/bundle-22-turn-3.md; M3a mark 20261020020000, M3b mark 20261020030000) — /terms and /privacy, the acceptance at sign-in as a hard stop (two ticks: 18+ with the Terms and the Privacy Policy; storage in the United States), the person's legal documents in his account, six new legal facts, the publish check on facts, legal_scheduled; owed: the sold ad's 30 days become a listing setting the doors read and the Terms quote (today a fixed interval in the feed and ad doors)
Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B to I; the checks; Part J LAST; THE STOP REPORT with the two apply lines, and STOP; — the operator applies M3a and M3b on ethio-staging and sends "continue" —; Part K; THE FINAL REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git diff` and `git rev-parse` are fine.
- Part K is your rule's end-to-end check of the central flow, in the state a real user hits it, through `bun run e2e:local` only (AGENTS.md); never the preview signed in and never production. If the browser does not start (INC-506), Part K says what to do. Unit tests run locally, whole. Edit spec files by hand, never by search-and-replace (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared component or helper never changes its default (new behaviour is an option).
- Every legal test row is a scratch one, kind `e2e-…`, created and removed by the test; a test never writes legal_settings (it reads it) and never creates a document of a real kind (terms, privacy, publishing) (G27). Find a test's own rows by their kind, never by position on a page (G28). Leased accounts at most two per test (DEC-174).
- A string is copied from Part G by key, character for character; no Amharic of your own. No literal UI text.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1044 on 7779dfbb (turn 2's final commit), SUCCESS, with five flaky passes and nothing gating. If ci-status.md still shows run 1043 on ba263b88 (FAILURE: the commit before M2 v2, superseded by 1044), read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md instead: its first lines must say "last E2E run 39225541601 passed" for 7779dfbb; quote them and go on. If the newest finished run is red in any test or job: read its body at that address or at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md, quote it in the report's first lines and fix it first, at its root cause (G21, G38).

PART B — THE READING AND THE GATE (src/features/legal/).
B1. src/features/legal/legal-reader.ts — the browser's reads, each through `supabase.rpc`, each answer checked for shape (a wrong shape throws, as legal-service.ts does): `myLegalStatus(kinds)` (my_legal_status with p_kinds; an array of { kind, country_code, version_id, version, label, material, effective_at }); `acceptLegal({ versionIds, language, adult, dataConsent })` (accept_legal with p_version_ids, p_language, p_adult, p_data_consent); `myLegalHistory()` (my_legal_history: { acceptances, notices }, each acceptance with data_consent, each notice with label); `myLegalVersion(id)` (my_legal_version, with settings_snapshot). Types beside them. A refusal's sentence is the door's message up to its first colon, as legalErrorKey reads it.
B2. src/features/legal/legal-kinds.ts — pure functions with their unit tests: `legalRole(kind)` → "terms" for terms or a kind matching ^e2e-[a-z0-9-]*-terms$, "privacy" for privacy or ^e2e-[a-z0-9-]*-privacy$, otherwise "other" (the door's consent rule uses the same two patterns); `tickOneKey(roles)` → legal.accept.tick1.both when both terms and privacy are present, .terms or .privacy when only one is, .docs otherwise; `needsConsent(rows)` → true when any row's role is privacy; `gateKinds(extra)` → ["terms", "privacy"] followed by each entry of `extra` that matches ^e2e-[a-z0-9-]{1,40}$, at most four, never removing terms or privacy; `gateExempt(pathname)` → true for /legal/accept, /terms, /privacy, any path under /legal/, and /auth with any path under it; false for every other path ("/", /account, /my-listings, /post, /settings, /admin, a seller's page).
B3. src/features/legal/use-legal-gate.ts — `useLegalGate({ user, signingOut, pathname, search, navigate })`, called once from AppShell (src/components/app-shell.tsx, beside the INC-627 live guard, :764) with the values the shell already holds:
  - Active only while a user is signed in and not signing out. It reads `myLegalStatus(gateKinds(extra))` with react-query under [AUTH_DERIVED_ROOT, "legal", "status", user id, kinds] (so a sign-out purges it, as the other auth-derived reads), staleTime five minutes, no refetch on window focus. `extra` is `window.__ethioLegalKinds` read only when `isE2E` (src/lib/env-flags.ts — DEC-018: the flag is false in every production build, so production always asks for exactly terms and privacy); anything not an array of strings is ignored.
  - When the answer lists any document and `gateExempt(pathname)` is false: navigate, replacing the entry, to /legal/accept with search { next: pathname plus its search string }.
  - A failed read sends nobody anywhere: the doors stay the authority (the server check is turn 4), and a failed read must not lock every signed-in person out of the site. It logs one line, console.error("[client-error] legal gate read failed"), as src/i18n/provider.tsx:167 logs its own.
  - Its unit test covers: no read while signed out or signing out; the redirect with next for a non-exempt path; no redirect on an exempt path; no redirect on an empty answer or a failed read.
B4. Census, in the report: every test that signs a person in and asserts the page he lands on (the gate asks one extra read on such a page and redirects nobody while nothing of a real kind is in force — say so per file you checked); the routes that `gateExempt` lets through.

PART C — THE PUBLIC PAGES.
C1. src/server/legal-page.ts — `legalPage(kind)`: with `anonymousClient()` (src/server/supabase/user-client.ts, as src/server/seller-page.ts uses it) calls legal_in_force(p_kind) and legal_scheduled(p_kind) (no country: the pages show the document for all countries) and returns { inForce, scheduled }, each the door's object or null. A missing server environment or a door error logs one `[ssr-error] /<kind>` line and throws, so the page shows its error state, never a phantom "soon" (F4).
C2. src/features/legal/legal-document-page.tsx — `LegalDocumentPage({ kind, title, data })` (data-testid="legal-public-page"), 360-first, the page's text area marked data-print-root:
  - h1 = title. Nothing in force: "The {document} will be published here soon." (legal.page.none; {document} = the title; data-testid="legal-public-none").
  - In force: the meta line legal.page.meta (data-testid="legal-public-meta") with the version's number, name and effective date (dateStyle medium, in the page's language); the language switch, a two-button group labelled legal.lang.label — English / Amharic (legal.lang.en / legal.lang.am; data-testid="legal-public-lang-en" / "legal-public-lang-am"), the UI's language first selected; Print (legal.page.print; data-testid="legal-public-print") → window.print(); then LegalText with toc, the selected language's body and the version's settings_snapshot as facts.
  - A scheduled version: above the text, the notice legal.page.upcoming with its date (data-testid="legal-public-upcoming") and two buttons, legal.page.showCurrent (data-testid="legal-public-show-current", selected first) and legal.page.showUpcoming with its date (data-testid="legal-public-show-upcoming"), switching the text, meta and facts to that version.
  - Load error: legal.page.loadError (data-testid="legal-public-load-error").
C3. Routes: src/routes/terms.tsx and src/routes/privacy.tsx — a loader through createServerFn GET (as src/routes/$name.tsx does) calling legalPage("terms") / legalPage("privacy"); head(): title "Terms of Service — ethio.com" / "Privacy Policy — ethio.com", a one-line description, og:title, og:type website, og:url and the canonical link built from the root loader's origin exactly as src/routes/l.$slug.tsx:51-52 and its links line do (AGENTS.md: "Public pages: SSR, absolute canonical/og URLs"); component LegalDocumentPage with the title from legal.kind.terms / legal.kind.privacy. src/routes/legal.$kind.tsx — the test seam: terms and privacy redirect (301) to /terms and /privacy; a kind matching ^e2e-[a-z0-9-]{1,40}$ is served only when `isE2E` is true, titled by the raw kind, robots noindex; anything else, and any e2e kind when `isE2E` is false, is notFound(). Census in the report: scripts/check-root-routes.ts passes (terms, privacy and legal are site words).
C4. The footer (src/components/shell/app-footer.tsx): Terms and Privacy become links to /terms and /privacy (data-testid="footer-terms" / "footer-privacy"), with the same LINK class and the same 44-px target; About, Contact and Safety stay text; the comment says which items have routes. Census, in the report: every test that measures or counts the footer's items — e2e/shell.spec.ts FT-1 reads the rhythm of "h2, li > span" (:587) and the heights of "a, span.inline-flex" (:583): its rhythm selector becomes "h2, li > span, li > a" so the Legal column still measures its two items (the same assertions, now over links), and say so for every other file you checked.

PART D — THE ACCEPTANCE SCREEN, /legal/accept (src/routes/legal.accept.tsx, ssr false; src/features/legal/legal-accept-screen.tsx; data-testid="legal-accept-screen").
D1. beforeLoad: no session → redirect to "/". It reads `myLegalStatus(gateKinds(extra))` with the gate's query key (one read for both). An empty answer navigates, replacing, to `safeReturnPath(next)` (src/lib/return-path.ts) at once.
D2. The screen, 360-first, one column:
  - h1 legal.accept.title; the lead legal.accept.lead; the line legal.accept.liability.
  - One row per listed document (data-testid="legal-accept-doc", data-kind=<kind>): its name (legal.kind.* by legalRole: terms or privacy; the raw kind for "other"), for a country document " · " and the country's name from `new Intl.DisplayNames([language], { type: "region" })` (as src/features/posting/wizard.tsx:385 does), and legal.accept.version with its number and name; Read (legal.accept.read; data-testid="legal-accept-read") opens the version's text in place below the row (data-testid="legal-accept-text") through myLegalVersion — LegalText without toc, the UI language's body, the version's settings_snapshot as facts — and turns into Hide (legal.accept.hide); opening, closing and reading never clear a tick.
  - Tick 1 (a checkbox with its label; data-testid="legal-accept-adult"): the text tickOneKey gives. Tick 2 (data-testid="legal-accept-consent"), only when needsConsent: legal.accept.tick2. Both unticked at first; nothing ticks them for the person.
  - Agree and continue (legal.accept.submit; data-testid="legal-accept-submit") is disabled until tick 1, and tick 2 when shown, are ticked. It calls acceptLegal with every listed version id, the UI language, adult true and dataConsent = tick 2 (false when tick 2 is not shown). Success: the gate's query is set to an empty list and invalidated, then navigate, replacing, to safeReturnPath(next). The refusal notInForce: the list is read again and legal.accept.changed shows (data-testid="legal-accept-error"), the ticks cleared; any other refusal: legal.accept.error in the same element, the ticks kept.
  - Sign out (auth.signOut; data-testid="legal-accept-signout"): the shell's sign-out (useShell().requestSignOut), which lands on "/".
  - The note legal.accept.note under the buttons.
  - Loading: common.loading; a failed read: legal.accept.loadError with common.tryAgain (data-testid="legal-accept-load-error").
D3. Its unit test (React Testing Library, the readers mocked): the button disabled until the required ticks; tick 2 shown only with a privacy role; the call's arguments (versions, language, adult true, consent); Read keeps the ticks; notInForce clears them and shows the changed sentence; the empty answer navigates to next.

PART E — THE PERSON'S LEGAL DOCUMENTS.
E1. The account page (src/features/account/account-overview.tsx): a Section legal (account.legal.title; testid "account-legal-card") after the notifications card, with account.legal.body and a button account.legal.open linking /account/legal (data-testid="account-open-legal").
E2. /account/legal (src/routes/account_.legal.tsx, ssr false, beforeLoad as src/routes/account_.saved.tsx with return "/account/legal"; src/features/legal/my-legal-page.tsx; data-testid="my-legal-page"): h1 myLegal.title; from myLegalHistory:
  - myLegal.accepted: one row per acceptance, newest first (data-testid="my-legal-acceptance", data-version-id=<id>): the document's name as D2 builds it and legal.accept.version; myLegal.acceptedMeta with the date and the language shown (legal.lang.en / legal.lang.am); myLegal.adult; myLegal.consent when data_consent (data-testid="my-legal-consent"); Open (myLegal.open; data-testid="my-legal-open") to /account/legal/<version id>. Empty: myLegal.noAcceptances (data-testid="my-legal-no-acceptances").
  - myLegal.notices: one row per notice, newest first (data-testid="my-legal-notice"): the document, the version and its name, myLegal.noticeMeta with myLegal.status.<status> and the date; Open as above. Empty: myLegal.noNotices (data-testid="my-legal-no-notices").
  - Loading common.loading; error myLegal.loadError.
E3. /account/legal/<version id> (src/routes/account_.legal_.$versionId.tsx, ssr false, the same beforeLoad with its own return path; data-testid="my-legal-version"): myLegalVersion → the document's name, legal.accept.version, the language switch as C2 (data-testid="my-legal-lang-en" / "my-legal-lang-am"), Print (legal.page.print; data-testid="my-legal-print"), LegalText with toc and the version's settings_snapshot, its root marked data-print-root; Back (myLegal.back; data-testid="my-legal-back") to /account/legal. The refusal notYours or an unknown id: myLegal.notFound (data-testid="my-legal-not-found").
E4. Print: src/styles.css gains one rule, `@media print`, that hides everything except the element marked data-print-root and its contents and lets that element take the page width (the visibility pattern: body * hidden, [data-print-root] and its descendants visible, the root positioned at the top start of the page). Nothing else in styles.css changes.

PART F — THE STAFF SCREENS (src/features/admin/legal/).
F1. legal-service.ts: FACT_KEYS becomes, in this order: operator_name, operator_details, operator_address, legal_email, privacy_email, security_email, legal_phone, governing_law, copyright_agent, liability_limit_usd, notice_days, response_days, response_extra_days, listed_ad_keep_months, deleted_ad_keep_months, dispute_keep_years, account_keep_months, technical_keep_months (18; providers is no longer shown or sent). The refusals unknownFact and factMissing map to admin.legal.error.unknownFact and admin.legal.error.factMissing with {name} = the part after the colon.
F2. facts-validation.ts: listed_ad_keep_months, account_keep_months and technical_keep_months 1–120; operator_details, legal_phone and copyright_agent optional (empty is allowed; empty is sent as an empty string, which the door stores as nothing); legal_phone, when given, must match ^\+?[0-9][0-9 ()-]{4,37}[0-9]$ (admin.legal.facts.badPhone); security_email an e-mail like the other two; operator_details at most 2,000 characters. legal-facts-card.tsx: the address, the company details and the copyright agent are text areas; every new fact shows "Not set" when empty; the save sends the 18 keys.
F3. The editor's preview (legal-editor-form.tsx): beside "Not among the Legal facts", admin.legal.emptyFacts lists the tokens whose fact is empty today (data-testid="legal-empty-facts"), each once, in order of first use. The publish dialog shows the two new refusals as their sentences (legalErrorKey).
F4. legal-version-view.tsx lists the facts of FACT_KEYS (unchanged code; the list grows by F1).
F5. The user page's Legal card (user-legal-card.tsx): admin.users.legal.consent under an acceptance whose data_consent is true (data-testid="user-legal-consent"); a notice now shows its version's name, as an acceptance does (the door returns it; docs/features/legal.md's sentence that it cannot is removed).

PART G — THE STRINGS (56 keys; en.ts and am.ts, each key beside its neighbours of the same prefix; copied character for character; the key admin.legal.fact.providers is removed from both files; `bun run i18n:map-guard` must end "usage maps match the tree" — regenerate the usage maps with the project's own command if the guard asks).
{
 "legal.page.meta": {
  "en": "Version {n} · {label} · in force since {date}",
  "am": "ስሪት {n} · {label} · ከ{date} ጀምሮ በሥራ ላይ"
 },
 "legal.page.none": {
  "en": "The {document} will be published here soon.",
  "am": "{document} በቅርቡ እዚህ ይታተማል።"
 },
 "legal.page.upcoming": {
  "en": "A new version takes effect on {date}.",
  "am": "አዲስ ስሪት ከ{date} ጀምሮ ይሠራል።"
 },
 "legal.page.showCurrent": {
  "en": "Version in force",
  "am": "በሥራ ላይ ያለው ስሪት"
 },
 "legal.page.showUpcoming": {
  "en": "New version from {date}",
  "am": "ከ{date} ጀምሮ የሚሠራው አዲስ ስሪት"
 },
 "legal.page.print": {
  "en": "Print",
  "am": "ያትሙ"
 },
 "legal.page.loadError": {
  "en": "This page could not be loaded.",
  "am": "ይህን ገጽ መጫን አልተቻለም።"
 },
 "legal.lang.label": {
  "en": "Language",
  "am": "ቋንቋ"
 },
 "legal.lang.en": {
  "en": "English",
  "am": "እንግሊዝኛ"
 },
 "legal.lang.am": {
  "en": "Amharic",
  "am": "አማርኛ"
 },
 "legal.accept.title": {
  "en": "Before you continue",
  "am": "ከመቀጠልዎ በፊት"
 },
 "legal.accept.lead": {
  "en": "We have Terms of Service and a Privacy Policy. Please read them and accept to continue.",
  "am": "የአገልግሎት ውሎች እና የግላዊነት መመሪያ አሉን። እባክዎ ያንብቧቸው፤ ለመቀጠል ይቀበሏቸው።"
 },
 "legal.accept.liability": {
  "en": "The Terms limit our liability and set out your responsibility for your ads and deals (section 12).",
  "am": "ውሎቹ የእኛን ተጠያቂነት ይገድባሉ፤ ለማስታወቂያዎችዎ እና ለስምምነቶችዎ ያለብዎትን ኃላፊነትም ይገልጻሉ (ክፍል 12)።"
 },
 "legal.accept.version": {
  "en": "Version {n} · {label}",
  "am": "ስሪት {n} · {label}"
 },
 "legal.accept.read": {
  "en": "Read",
  "am": "ያንብቡ"
 },
 "legal.accept.hide": {
  "en": "Hide",
  "am": "ይደብቁ"
 },
 "legal.accept.tick1.both": {
  "en": "I am 18 or older and I agree to the Terms of Service and the Privacy Policy.",
  "am": "ዕድሜዬ 18 ወይም ከዚያ በላይ ነው፤ በአገልግሎት ውሎቹ እና በግላዊነት መመሪያው እስማማለሁ።"
 },
 "legal.accept.tick1.terms": {
  "en": "I am 18 or older and I agree to the Terms of Service.",
  "am": "ዕድሜዬ 18 ወይም ከዚያ በላይ ነው፤ በአገልግሎት ውሎቹ እስማማለሁ።"
 },
 "legal.accept.tick1.privacy": {
  "en": "I am 18 or older and I agree to the Privacy Policy.",
  "am": "ዕድሜዬ 18 ወይም ከዚያ በላይ ነው፤ በግላዊነት መመሪያው እስማማለሁ።"
 },
 "legal.accept.tick1.docs": {
  "en": "I am 18 or older and I agree to the documents above.",
  "am": "ዕድሜዬ 18 ወይም ከዚያ በላይ ነው፤ ከላይ ባሉት ሰነዶች እስማማለሁ።"
 },
 "legal.accept.tick2": {
  "en": "I agree that my data is stored and processed in the United States, as section 8 of the Privacy Policy explains.",
  "am": "የግላዊነት መመሪያው ክፍል 8 እንደሚያብራራው፣ መረጃዬ በአሜሪካ እንዲቀመጥ እና እንዲሠራበት እስማማለሁ።"
 },
 "legal.accept.submit": {
  "en": "Agree and continue",
  "am": "ተስማምቼ እቀጥላለሁ"
 },
 "legal.accept.note": {
  "en": "You cannot use your account until you accept. You can still browse ethio.com without signing in.",
  "am": "እስኪቀበሉ ድረስ መለያዎን መጠቀም አይችሉም። ሳይገቡ ግን ethio.com ላይ ማስታወቂያዎችን ማየት ይችላሉ።"
 },
 "legal.accept.error": {
  "en": "We could not record your acceptance. Try again.",
  "am": "መቀበልዎን መመዝገብ አልቻልንም። እንደገና ይሞክሩ።"
 },
 "legal.accept.changed": {
  "en": "The documents have just changed. Please read them again.",
  "am": "ሰነዶቹ አሁን ተለውጠዋል። እባክዎ እንደገና ያንብቧቸው።"
 },
 "legal.accept.loadError": {
  "en": "The documents could not be loaded.",
  "am": "ሰነዶቹን መጫን አልተቻለም።"
 },
 "account.legal.title": {
  "en": "Legal documents",
  "am": "ሕጋዊ ሰነዶች"
 },
 "account.legal.body": {
  "en": "The Terms and policies you accepted, and the legal e-mails we sent you.",
  "am": "የተቀበሏቸው ውሎች እና መመሪያዎች፣ እንዲሁም የላክንልዎ ሕጋዊ ኢሜይሎች።"
 },
 "account.legal.open": {
  "en": "Open",
  "am": "ይክፈቱ"
 },
 "myLegal.title": {
  "en": "My legal documents",
  "am": "የእኔ ሕጋዊ ሰነዶች"
 },
 "myLegal.accepted": {
  "en": "Accepted",
  "am": "የተቀበሏቸው"
 },
 "myLegal.notices": {
  "en": "Legal e-mails",
  "am": "ሕጋዊ ኢሜይሎች"
 },
 "myLegal.acceptedMeta": {
  "en": "Accepted {date} · shown in {language}",
  "am": "{date} ተቀብለዋል · በ{language} ታይቷል"
 },
 "myLegal.adult": {
  "en": "You confirmed you are 18 or older.",
  "am": "ዕድሜዎ 18 ወይም ከዚያ በላይ መሆኑን አረጋግጠዋል።"
 },
 "myLegal.consent": {
  "en": "You agreed to storage in the United States.",
  "am": "መረጃዎ በአሜሪካ እንዲቀመጥ ተስማምተዋል።"
 },
 "myLegal.noticeMeta": {
  "en": "E-mail {status} · {date}",
  "am": "ኢሜይል {status} · {date}"
 },
 "myLegal.status.sent": {
  "en": "sent",
  "am": "ተልኳል"
 },
 "myLegal.status.failed": {
  "en": "not delivered",
  "am": "አልደረሰም"
 },
 "myLegal.status.bounced": {
  "en": "returned",
  "am": "ተመልሷል"
 },
 "myLegal.noAcceptances": {
  "en": "You have not accepted any document yet.",
  "am": "እስካሁን ምንም ሰነድ አልተቀበሉም።"
 },
 "myLegal.noNotices": {
  "en": "No legal e-mail has been sent to you.",
  "am": "እስካሁን ሕጋዊ ኢሜይል አልተላከልዎትም።"
 },
 "myLegal.open": {
  "en": "Open",
  "am": "ይክፈቱ"
 },
 "myLegal.back": {
  "en": "Back to my legal documents",
  "am": "ወደ ሕጋዊ ሰነዶቼ ይመለሱ"
 },
 "myLegal.notFound": {
  "en": "This document is not available.",
  "am": "ይህ ሰነድ አይገኝም።"
 },
 "myLegal.loadError": {
  "en": "Your legal documents could not be loaded.",
  "am": "ሕጋዊ ሰነዶችዎን መጫን አልተቻለም።"
 },
 "admin.users.legal.consent": {
  "en": "Agreed to storage in the United States.",
  "am": "መረጃው በአሜሪካ እንዲቀመጥ ተስማምቷል።"
 },
 "admin.legal.fact.operator_details": {
  "en": "Company details: legal form, where registered, registration number",
  "am": "የኩባንያው ዝርዝር፦ ሕጋዊ ቅርጽ፣ የተመዘገበበት ቦታ፣ የምዝገባ ቁጥር"
 },
 "admin.legal.fact.security_email": {
  "en": "Security e-mail",
  "am": "የደኅንነት ጉዳዮች ኢሜይል"
 },
 "admin.legal.fact.legal_phone": {
  "en": "Phone for legal matters",
  "am": "የሕግ ጉዳዮች ስልክ"
 },
 "admin.legal.fact.listed_ad_keep_months": {
  "en": "Keep sold and expired ads in the seller's list, months",
  "am": "የተሸጡ እና ጊዜያቸው ያለፈ ማስታወቂያዎች በሻጩ ዝርዝር የሚቆዩበት ጊዜ፣ በወራት"
 },
 "admin.legal.fact.account_keep_months": {
  "en": "Keep a closed account's identity, months",
  "am": "የተዘጋ መለያ ማንነት የሚቆይበት ጊዜ፣ በወራት"
 },
 "admin.legal.fact.technical_keep_months": {
  "en": "Keep technical records, months",
  "am": "ቴክኒካዊ መዛግብት የሚቆዩበት ጊዜ፣ በወራት"
 },
 "admin.legal.facts.badPhone": {
  "en": "Enter a phone number: digits, spaces, + ( ) and -.",
  "am": "ስልክ ቁጥር ያስገቡ፦ አሃዞች፣ ክፍተቶች፣ + ( ) እና -።"
 },
 "admin.legal.error.unknownFact": {
  "en": "The text uses {name}, which is not a legal fact. Correct or remove it.",
  "am": "ጽሑፉ የሚጠቀመው {name} ሕጋዊ መረጃ አይደለም። ያርሙት ወይም ያስወግዱት።"
 },
 "admin.legal.error.factMissing": {
  "en": "The text uses {name}, which has no value. Fill it in Legal facts first.",
  "am": "ጽሑፉ የሚጠቀመው {name} ዋጋ የለውም። መጀመሪያ በሕጋዊ መረጃዎች ውስጥ ይሙሉት።"
 },
 "admin.legal.emptyFacts": {
  "en": "Facts with no value: {tokens}",
  "am": "ዋጋ የሌላቸው መረጃዎች፦ {tokens}"
 }
}

PART H — THE TESTS.
H1. Unit: Parts B2, B3, D3; F1's refusal mapping; F2's rules (each new key's bounds, the phone pattern, the optional texts, the security e-mail); C2's switches (the language and the scheduled version, with LegalText's output for each).
H2. e2e/legal-doors.spec.ts, after LG-10, each with its scratch documents removed in finally:
  - LG-11 accept_legal and the consent: two scratch documents `${RUN_TAG}-k-terms` and `${RUN_TAG}-k-privacy`, each v1 in force (the service client, as seedFixture does); a leased person: accepting both without p_data_consent is refused consentRequired, and with p_data_consent false the same; with true, both rows are written; through the service client, data_consent is true on the privacy row and false on the terms row; my_legal_history and the super admin's admin_user_legal_history both show the same two values; a notice recorded by record_legal_notice for the terms version shows the version's name (label) in both histories.
  - LG-12 the frozen facts and legal_scheduled: a scratch document with v1 in force whose settings_snapshot holds legal_email "frozen-one@example.invalid", and v2 published, material, effective in 30 days, settings_snapshot legal_email "frozen-two@example.invalid": anon legal_in_force answers v1 with its settings_snapshot and no changelog key; anon legal_scheduled answers v2 with its settings_snapshot and no changelog key; legal_scheduled for an unknown scratch kind answers null; a leased person's my_legal_version on v1 carries the same settings_snapshot.
  - LG-13 the new facts' refusals, the super admin with a fresh second factor: legal_phone "abc" → badValue:legal_phone; security_email "nope" → badValue:security_email; listed_ad_keep_months 0, account_keep_months 121 and technical_keep_months "x" → badValue:<that key>; after them, legal_settings' updated_at is unchanged (the service client). No test saves valid facts.
  - LG-14 publish refuses a token without a fact: the service client reads legal_settings and asserts that at least one of operator_details, legal_phone and copyright_agent is empty (the seeded state of ethio-staging; the test fails with that sentence otherwise) and picks the first empty one; a scratch draft whose English uses {{nope_fact}} → admin_publish_legal_version refuses unknownFact:nope_fact; its English changed (the service client) to use the empty fact → factMissing:<that fact>; changed to use {{legal_email}} only → published.
H3. e2e/legal-admin.spec.ts:
  - LGA-1: the facts card shows the 18 facts of F1 with values equal to legal_settings (empty as "Not set"), and no providers row.
  - LGA-2: the round trip keeps {{nope}} in the English text; Publish now shows the unknownFact sentence naming nope and the row stays a draft (the service client); the English text is then saved without {{nope}}; Publish → the first-version note → confirm → published, as before.
  - LGA-4: also legal_phone "abc" and listed_ad_keep_months 0 → their field errors; still no request (updated_at unchanged).
  - LGA-8 (new, after LGA-7) "the user page shows the storage consent": a leased person accepts a version of `scratch("h-privacy")` (a kind ending -privacy) with p_data_consent true — the spec's accept helper gains the consent as an option, default false, so LGA-7 is unchanged — → /admin/users/<id> shows one user-legal-acceptance holding user-legal-consent.
H4. e2e/legal-pages.spec.ts (NEW; area legal):
  - LGP-1 /terms and /privacy (nothing of a real kind is published on ethio-staging): each shows legal-public-page with its title and legal-public-none; from "/", the footer's footer-terms leads to /terms and footer-privacy to /privacy.
  - LGP-2 a scratch document's page /legal/<scratch kind> (the E2E build): v1 in force with an English text holding two ## headings and {{legal_email}}, an Amharic text, and settings_snapshot legal_email "frozen@example.invalid" → legal-public-meta reads "Version 1 · <its name>"; the contents list has two links; the frozen e-mail is shown (not today's fact); legal-public-lang-am shows the Amharic text; legal-public-print is visible. Then v2 published, material, effective in 30 days, with its own English text → legal-public-upcoming with v2's date; legal-public-show-upcoming shows v2's text; legal-public-show-current shows v1's again.
  - LGP-3 /legal/terms lands on /terms; /legal/not-a-kind shows the not-found page.
H5. e2e/legal-accept.spec.ts (NEW; area legal). Each test: its own scratch documents `${tag}-terms` and/or `${tag}-privacy` (a kind is at most 44 characters, the table's CHECK) with v1 in force (the service client); a leased person (`leaseUser()`, e2e/helpers/users.ts) signed in through `signInViaSession(page, email, password)` (e2e/helpers/ui.ts:502); AFTER the sign-in, `page.addInitScript` sets `window.__ethioLegalKinds` to the test's kinds; then the navigation the test names. Cleanup in finally: acceptances, then versions, then documents of the test's kinds.
  - LAC-1 the hard stop and the two ticks: go to /account → the URL becomes /legal/accept with next=/account; both documents listed; Agree disabled; tick 1 alone → still disabled; Read on the privacy row shows its text and the ticks stay; tick 2 → enabled → Agree → back on /account; the service client finds two acceptance rows for the person: adult_confirmed true, language en, data_consent true on the privacy row only; going to /my-listings now stays there.
  - LAC-2 only a terms document listed: tick 1 reads the Terms-only sentence; no tick 2; Agree → the one row with data_consent false.
  - LAC-3 the gate's exempt pages: with acceptance pending, /terms and /privacy stay where they are; /settings and /post redirect to /legal/accept; Sign out on the screen → signed out on "/", and no acceptance row exists for the person.
  - LAC-4 a material change: the person accepted v1 of a terms document (accept_legal through the door, as LG tests call it); a v2 published, material, effective in the past (the service client) → /account redirects to the screen listing that document with version 2; Agree → back on /account.
H6. e2e/legal-history.spec.ts (NEW; area legal):
  - LGH-1 the account card and the list: a leased person accepts a scratch terms version and a scratch privacy version with consent (accept_legal), and the service client records a notice for the terms version (record_legal_notice) → /account shows account-legal-card → account-open-legal → /account/legal shows two my-legal-acceptance rows, my-legal-consent on the privacy row only, and one my-legal-notice naming the version's name with "sent".
  - LGH-2 one version: my-legal-open on the terms row → /account/legal/<id> shows its text with the frozen e-mail of its settings_snapshot, the language switch and my-legal-print; my-legal-back returns to the list; /account/legal/<a published scratch version the person neither accepted nor was sent, still ahead of its date> shows my-legal-not-found.
  - LGH-3 a person with nothing: both empty states.
H7. Census, in the report: every test that names a fact key or counts the facts (LGA-1, LGA-4, LG-6 and any unit test) with its change; e2e/shell.spec.ts FT-1 (Part C4); every test that asserts the account page's cards (e2e/layout.spec.ts LY-5 reads only the profile card — say so).

PART I — THE DOCS, THE ALLOWLIST, THE SELECTOR, THE ROADMAP.
I1. docs/features/legal.md: a section "Turn 3 — the public pages, the acceptance and the person's documents" — the routes, the gate's rule (who, which kinds, the exempt pages, the failed read, isE2E's seam that only adds scratch kinds), the two ticks and what each records, the history pages and printing, the six new facts, legal_scheduled, the publish check on facts; the sentence "Notices show Version n without a version name because the existing history door does not return one." removed; a line: "Never publish a version of a real kind (terms, privacy) on ethio-staging: every E2E account would meet the acceptance screen." The doors table gains legal_scheduled and accept_legal's consentRequired; admin_publish_legal_version's refusals gain unknownFact and factMissing. docs/_changelog.md APPEND one line: "- 2026-10-19 — Bundle 22 (Stage 1) turn 3 (two migrations, M3a and M3b): /terms and /privacy with the version in force and the next one ahead of its date; the acceptance at sign-in as a hard stop (the operator: no use of an account without accepting), with the 18+ statement and a separate consent to storage in the United States; the person's legal documents in his account, printable; six new legal facts (company details, legal phone, security e-mail, and three 12-month periods); a version is never published with a token whose fact is empty; LG-11…LG-14, LGA-8, LGP-1…LGP-3, LAC-1…LAC-4, LGH-1…LGH-3."
I2. scripts/public-surface-allowlist.txt: after the line that begins "legal_in_force |", one new line, exactly:
legal_scheduled | the next legal version not yet in force is public ahead of its date (anon read); never the change log (B22 Stage 1 turn 3)
and the line that begins "accept_legal |" becomes, whole:
accept_legal | the caller accepts versions for himself; signed in, own rows only, adult statement and language required, and the separate storage consent for a Privacy Policy version
I3. scripts/e2e-select.ts, the area "legal": src becomes ["src/features/legal/**", "src/features/admin/legal/**", "src/routes/admin.legal*", "src/routes/legal.*", "src/routes/terms.tsx", "src/routes/privacy.tsx", "src/routes/account_.legal*", "src/server/legal-page.ts"]; specs unchanged (e2e/legal-*.spec.ts takes the three new files); the self-test passes.
I4. roadmap.md as STEP 0 says.

PART J — M3a THEN M3B, BY THE TOOL, LAST (the tool applies each on ethio-prod the moment it is saved, after the operator allows the "Modify Supabase database" dialog; M3b's first statement refuses unless M3a's mark is there). Before each: paste, from ethio-prod's read tool, the live argument list, provolatile, prosecdef and proconfig of every function the part re-declares (M3a: accept_legal, legal_in_force, my_legal_version, my_legal_history, admin_user_legal_history; M3b: admin_set_legal_settings, admin_publish_legal_version), each beside the file's (G39). Run `bash scripts/check-migrations.sh` and paste its last line ("Migration guard OK.") before each save. Then submit exactly this text for M3a, once (the supervisor applied both parts to a scratch PostgreSQL 16 holding turn 1's files and M2 v2, ran the proofs and the answers with a caller, and ran the repository's guards with both in place):
-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 3 — M3a (part 1 of 2): what the public pages, the acceptance screen and the
-- person's legal history need. Additive; every re-declared door keeps its header and body apart from the
-- named change. Part 2 (M3b) re-declares the settings and publish doors.
--  1. legal_settings gains six facts: operator_details (legal form, where registered, registration
--     number; empty until the operator fills it), legal_phone (empty until filled), security_email, and
--     three periods the texts quote, each 12 months as DEC-130 decided (the operator, 2026-10-19 05:2x
--     local: "12 months (DEC-130 as is)"): listed_ad_keep_months (a sold or expired ad in the seller's own
--     list), account_keep_months (a closed account's identity), technical_keep_months (technical records).
--     The providers fact is no longer shown or sent by the screens; its column stays (dropping it would
--     be destructive) and admin_set_legal_settings still accepts it.
--  2. legal_acceptances gains data_consent: the separate consent to storage in the United States, given
--     with the acceptance of a Privacy Policy version (DEC-204 (b)).
--  3. accept_legal gains p_data_consent (default false): a Privacy Policy version (kind privacy, or a
--     scratch kind ending in -privacy) is refused as consentRequired without it; the consent is recorded
--     on that version's row. The old three-argument door is dropped (its argument list changes).
--  4. legal_in_force and my_legal_version also return the version's settings_snapshot (the facts frozen
--     at publishing), so a reader fills the text's tokens with them.
--  5. legal_scheduled (new; anon and authenticated): the next published version of a document that has
--     not taken effect yet, with its text and frozen facts — the public pages show it ahead of its date.
--  6. my_legal_history and admin_user_legal_history also return data_consent on each acceptance and the
--     version's name on each notice.
-- Gated on M2 v2's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261019220000') THEN
    RAISE EXCEPTION 'bundle 22 turn 2 M2 v2 (mark 20261019220000) must be applied first';
  END IF;
END $$;

-- ===== 1 and 2 — the columns =====
ALTER TABLE public.legal_settings
  ADD COLUMN operator_details text NULL
    CONSTRAINT legal_settings_operator_details_check CHECK (operator_details IS NULL OR length(operator_details) <= 2000),
  ADD COLUMN legal_phone text NULL
    CONSTRAINT legal_settings_legal_phone_check CHECK (legal_phone IS NULL OR length(legal_phone) <= 40),
  ADD COLUMN security_email text NOT NULL DEFAULT 'security@ethio.com'
    CONSTRAINT legal_settings_security_email_check CHECK (length(security_email) <= 320),
  ADD COLUMN listed_ad_keep_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_listed_keep_check CHECK (listed_ad_keep_months BETWEEN 1 AND 120),
  ADD COLUMN account_keep_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_account_keep_check CHECK (account_keep_months BETWEEN 1 AND 120),
  ADD COLUMN technical_keep_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_technical_keep_check CHECK (technical_keep_months BETWEEN 1 AND 120);

ALTER TABLE public.legal_acceptances
  ADD COLUMN data_consent boolean NOT NULL DEFAULT false;

-- ===== 3 — accept_legal with the separate storage consent =====
DROP FUNCTION public.accept_legal(uuid[], text, boolean);

-- The caller accepts versions for himself: one row per version, with the language shown, the 18+
-- statement and the sign-in method read from the session token. No IP address is stored. A Privacy
-- Policy version needs the separate consent to storage in the United States (DEC-204 (b)), recorded on
-- its row.
CREATE FUNCTION public.accept_legal(p_version_ids uuid[], p_language text, p_adult boolean,
                                    p_data_consent boolean DEFAULT false)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_method  text;
  v_home    char(2);
  v_vid     uuid;
  v_v       public.legal_versions%ROWTYPE;
  v_privacy boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_version_ids IS NULL OR array_length(p_version_ids, 1) IS NULL THEN
    RAISE EXCEPTION 'emptyList';
  END IF;
  IF p_adult IS DISTINCT FROM true THEN RAISE EXCEPTION 'adultRequired'; END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    RAISE EXCEPTION 'badLanguage';
  END IF;
  IF p_data_consent IS DISTINCT FROM true AND EXISTS (
       SELECT 1 FROM public.legal_versions v
         JOIN public.legal_documents d ON d.id = v.document_id
        WHERE v.id = ANY (p_version_ids)
          AND (d.kind = 'privacy' OR d.kind ~ '^e2e-[a-z0-9-]*-privacy$')) THEN
    RAISE EXCEPTION 'consentRequired';
  END IF;
  v_method := coalesce(
    auth.jwt() -> 'app_metadata' ->> 'provider',
    (auth.jwt() -> 'amr' -> 0 ->> 'method'),
    'unknown');
  SELECT p.home_country_code INTO v_home FROM public.profiles p WHERE p.user_id = v_uid;
  FOREACH v_vid IN ARRAY p_version_ids LOOP
    SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = v_vid;
    IF NOT FOUND OR v_v.status <> 'published' OR v_v.effective_at > now() THEN
      RAISE EXCEPTION 'notInForce';
    END IF;
    IF EXISTS (SELECT 1 FROM public.legal_documents d
                WHERE d.id = v_v.document_id
                  AND d.country_code IS NOT NULL
                  AND d.country_code IS DISTINCT FROM v_home) THEN
      RAISE EXCEPTION 'notApplicable';
    END IF;
    SELECT (d.kind = 'privacy' OR d.kind ~ '^e2e-[a-z0-9-]*-privacy$') INTO v_privacy
      FROM public.legal_documents d WHERE d.id = v_v.document_id;
    INSERT INTO public.legal_acceptances
      (user_id, version_id, language, method, adult_confirmed, home_country_code, data_consent)
    VALUES (v_uid, v_vid, p_language, v_method, true, v_home, v_privacy AND p_data_consent IS TRUE)
    ON CONFLICT (user_id, version_id) DO NOTHING;
  END LOOP;
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.accept_legal(uuid[], text, boolean, boolean) TO service_role;

-- ===== 4 — the readers return the frozen facts =====
-- The version in force: the highest published version of the document for this kind and country whose
-- effective time has passed. The change log is never returned. Any kind the caller names is answered,
-- scratch kinds (e2e-...) included: on production none exists (INC-761). The facts frozen at publishing
-- come with it (M3).
CREATE OR REPLACE FUNCTION public.legal_in_force(p_kind text, p_country char(2) DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
             'version_id', v.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'version', v.version,
             'label', v.label,
             'body_en', v.body_en,
             'body_am', v.body_am,
             'material', v.material,
             'effective_at', v.effective_at,
             'published_at', v.published_at,
             'settings_snapshot', v.settings_snapshot)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = p_kind
       AND d.country_code IS NOT DISTINCT FROM p_country
       AND v.status = 'published'
       AND v.effective_at <= now()
     ORDER BY v.version DESC
     LIMIT 1);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_in_force(text, char) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.legal_in_force(text, char) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_in_force(text, char) TO service_role;

-- The whole text of a version the caller accepted, was sent a notice for, or that is in force. An
-- accepted version stays readable after newer versions replace it. The change log is never returned.
-- The facts frozen at publishing come with it (M3).
CREATE OR REPLACE FUNCTION public.my_legal_version(p_version_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_v   public.legal_versions%ROWTYPE;
  v_d   public.legal_documents%ROWTYPE;
  v_ok  boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id;
  IF NOT FOUND OR v_v.status <> 'published' THEN RAISE EXCEPTION 'notYours'; END IF;
  SELECT * INTO v_d FROM public.legal_documents d WHERE d.id = v_v.document_id;
  v_ok := v_v.effective_at <= now()
    OR EXISTS (SELECT 1 FROM public.legal_acceptances a WHERE a.user_id = v_uid AND a.version_id = v_v.id)
    OR EXISTS (SELECT 1 FROM public.legal_notices n WHERE n.user_id = v_uid AND n.version_id = v_v.id);
  IF NOT v_ok THEN RAISE EXCEPTION 'notYours'; END IF;
  RETURN jsonb_build_object(
    'version_id', v_v.id,
    'kind', v_d.kind,
    'country_code', v_d.country_code,
    'version', v_v.version,
    'label', v_v.label,
    'body_en', v_v.body_en,
    'body_am', v_v.body_am,
    'material', v_v.material,
    'effective_at', v_v.effective_at,
    'published_at', v_v.published_at,
    'settings_snapshot', v_v.settings_snapshot);
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_version(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_version(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_version(uuid) TO service_role;

-- ===== 5 — legal_scheduled =====
-- The next version of a document that is published but has not taken effect yet: the published version
-- of this kind and country whose effective time is still ahead and comes first. Public, as the version in
-- force is; the change log is never returned.
CREATE FUNCTION public.legal_scheduled(p_kind text, p_country char(2) DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
             'version_id', v.id,
             'kind', d.kind,
             'country_code', d.country_code,
             'version', v.version,
             'label', v.label,
             'body_en', v.body_en,
             'body_am', v.body_am,
             'material', v.material,
             'effective_at', v.effective_at,
             'published_at', v.published_at,
             'settings_snapshot', v.settings_snapshot)
      FROM public.legal_documents d
      JOIN public.legal_versions v ON v.document_id = d.id
     WHERE d.kind = p_kind
       AND d.country_code IS NOT DISTINCT FROM p_country
       AND v.status = 'published'
       AND v.effective_at > now()
     ORDER BY v.effective_at, v.version
     LIMIT 1);
END;
$$;
REVOKE ALL ON FUNCTION public.legal_scheduled(text, char) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.legal_scheduled(text, char) TO anon, authenticated;
GRANT ALL ON FUNCTION public.legal_scheduled(text, char) TO service_role;

-- ===== 6 — the histories =====
-- The caller's own legal history: his acceptances and the legal e-mails sent to him, newest first.
CREATE OR REPLACE FUNCTION public.my_legal_history()
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
  RETURN jsonb_build_object(
    'acceptances', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', a.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'accepted_at', a.accepted_at,
               'language', a.language,
               'method', a.method,
               'adult_confirmed', a.adult_confirmed,
               'data_consent', a.data_consent)
             ORDER BY a.accepted_at DESC)
        FROM public.legal_acceptances a
        JOIN public.legal_versions v ON v.id = a.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE a.user_id = v_uid), '[]'::jsonb),
    'notices', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', n.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'channel', n.channel,
               'status', n.status,
               'sent_at', n.sent_at)
             ORDER BY n.sent_at DESC)
        FROM public.legal_notices n
        JOIN public.legal_versions v ON v.id = n.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE n.user_id = v_uid), '[]'::jsonb));
END;
$$;
REVOKE ALL ON FUNCTION public.my_legal_history() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_legal_history() TO authenticated;
GRANT ALL ON FUNCTION public.my_legal_history() TO service_role;

-- One person's legal history for staff with profiles:view: his acceptances and the legal e-mails sent to
-- him, newest first.
CREATE OR REPLACE FUNCTION public.admin_user_legal_history(p_user_id uuid)
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
  IF NOT public.has_permission(v_uid, 'profiles', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = p_user_id) THEN
    RAISE EXCEPTION 'unknownUser';
  END IF;
  RETURN jsonb_build_object(
    'acceptances', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', a.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'accepted_at', a.accepted_at,
               'language', a.language,
               'method', a.method,
               'adult_confirmed', a.adult_confirmed,
               'data_consent', a.data_consent)
             ORDER BY a.accepted_at DESC)
        FROM public.legal_acceptances a
        JOIN public.legal_versions v ON v.id = a.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE a.user_id = p_user_id), '[]'::jsonb),
    'notices', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
               'version_id', n.version_id,
               'kind', d.kind,
               'country_code', d.country_code,
               'version', v.version,
               'label', v.label,
               'channel', n.channel,
               'status', n.status,
               'sent_at', n.sent_at)
             ORDER BY n.sent_at DESC)
        FROM public.legal_notices n
        JOIN public.legal_versions v ON v.id = n.version_id
        JOIN public.legal_documents d ON d.id = v.document_id
       WHERE n.user_id = p_user_id), '[]'::jsonb));
END;
$$;
REVOKE ALL ON FUNCTION public.admin_user_legal_history(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_user_legal_history(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_user_legal_history(uuid) TO service_role;

-- Proofs, with no caller and on scratch rows only (G39; the e2e-mig-m3a- kind is created and rolled back
-- here): the new columns and their defaults; the readers return the frozen facts; legal_scheduled answers
-- the version still ahead; every caller-bound door refuses a missing caller; headers and grants as
-- declared; the three-argument accept_legal is gone. Answers that need a person (the consent rule, the
-- histories) are proven by LG-11 and LG-12.
DO $$
DECLARE
  v_doc  uuid;
  v_ans  jsonb;
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  IF (SELECT column_default FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'legal_settings' AND column_name = 'security_email')
     IS DISTINCT FROM '''security@ethio.com''::text' THEN
    RAISE EXCEPTION 'proof failed: legal_settings.security_email default';
  END IF;
  IF (SELECT count(*) FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'legal_settings'
         AND column_name IN ('operator_details', 'legal_phone') AND is_nullable = 'YES') <> 2 THEN
    RAISE EXCEPTION 'proof failed: operator_details and legal_phone must be nullable';
  END IF;
  IF (SELECT count(*) FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'legal_settings'
         AND column_name IN ('listed_ad_keep_months', 'account_keep_months', 'technical_keep_months')
         AND column_default = '12' AND is_nullable = 'NO') <> 3 THEN
    RAISE EXCEPTION 'proof failed: the three periods must default to 12 and be required';
  END IF;
  IF (SELECT column_default FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'legal_acceptances' AND column_name = 'data_consent')
     IS DISTINCT FROM 'false' THEN
    RAISE EXCEPTION 'proof failed: legal_acceptances.data_consent default';
  END IF;
  BEGIN
    INSERT INTO public.legal_documents (kind) VALUES ('e2e-mig-m3a-proof') RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog,
                                       material, effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', 'e', 'a', 'c', false, now() - interval '2 days', now(),
            '{"legal_email": "one@example.invalid"}'::jsonb),
           (v_doc, 2, 'published', 'v2', 'e', 'a', 'c', true, now() + interval '40 days', now(),
            '{"legal_email": "two@example.invalid"}'::jsonb),
           (v_doc, 3, 'published', 'v3', 'e', 'a', 'c', true, now() + interval '30 days', now(),
            '{"legal_email": "three@example.invalid"}'::jsonb);
    v_ans := public.legal_in_force('e2e-mig-m3a-proof');
    IF v_ans IS NULL OR (v_ans ->> 'version')::int <> 1
       OR v_ans -> 'settings_snapshot' ->> 'legal_email' IS DISTINCT FROM 'one@example.invalid'
       OR v_ans ? 'changelog' THEN
      RAISE EXCEPTION 'proof failed: legal_in_force answered %', v_ans;
    END IF;
    v_ans := public.legal_scheduled('e2e-mig-m3a-proof');
    IF v_ans IS NULL OR (v_ans ->> 'version')::int <> 3
       OR v_ans -> 'settings_snapshot' ->> 'legal_email' IS DISTINCT FROM 'three@example.invalid'
       OR v_ans ? 'changelog' THEN
      RAISE EXCEPTION 'proof failed: legal_scheduled answered %', v_ans;
    END IF;
    IF public.legal_scheduled('e2e-mig-m3a-proof', 'ET') IS NOT NULL
       OR public.legal_scheduled('e2e-mig-m3a-none') IS NOT NULL THEN
      RAISE EXCEPTION 'proof failed: legal_scheduled answered a document that does not exist';
    END IF;
    RAISE EXCEPTION '__m3a_proof_rollback__';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> '__m3a_proof_rollback__' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.legal_documents WHERE kind LIKE 'e2e-mig-m3a-%') THEN
    RAISE EXCEPTION 'proof failed: the scratch document survived the rollback';
  END IF;
  IF to_regprocedure('public.accept_legal(uuid[], text, boolean)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof failed: the three-argument accept_legal still exists';
  END IF;
  FOR r IN SELECT * FROM (VALUES ('accept'), ('version'), ('history'), ('staff_history')) AS t(door) LOOP
    BEGIN
      IF r.door = 'accept' THEN
        PERFORM public.accept_legal(ARRAY[gen_random_uuid()], 'en', true, true);
      ELSIF r.door = 'version' THEN PERFORM public.my_legal_version(gen_random_uuid());
      ELSIF r.door = 'history' THEN PERFORM public.my_legal_history();
      ELSE PERFORM public.admin_user_legal_history(gen_random_uuid());
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.door;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  FOR r IN SELECT * FROM (VALUES
      ('public.accept_legal(uuid[], text, boolean, boolean)', 'v'::"char", false),
      ('public.legal_in_force(text, character)', 's'::"char", true),
      ('public.my_legal_version(uuid)', 's'::"char", false),
      ('public.legal_scheduled(text, character)', 's'::"char", true),
      ('public.my_legal_history()', 's'::"char", false),
      ('public.admin_user_legal_history(uuid)', 's'::"char", false)) AS t(sig, vol, anon_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') IS DISTINCT FROM r.anon_ok THEN
      RAISE EXCEPTION 'proof failed: % anon EXECUTE is not %', r.sig, r.anon_ok;
    END IF;
    IF NOT has_function_privilege('authenticated', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: authenticated may not execute %', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020020000') ON CONFLICT (version) DO NOTHING;
J1. Then submit exactly this text for M3b, once:
-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 3 — M3b (part 2 of 2): the settings and publish doors. Every re-declared door
-- keeps its header and body apart from the named change.
--  7. admin_set_legal_settings accepts the six new facts of M3a: the company details and the phone may be
--     empty (cleared), the phone is digits, spaces, + ( ) and -, the security e-mail is an e-mail, each
--     period a whole number of months from 1 to 120.
--  8. admin_publish_legal_version refuses a text that uses a token which is not a fact (unknownFact:<name>)
--     or whose fact is empty (factMissing:<name>), through legal_text_fact_problem (new; not granted to
--     the browser roles).
-- Gated on M3a's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020020000') THEN
    RAISE EXCEPTION 'bundle 22 turn 3 M3a (mark 20261020020000) must be applied first';
  END IF;
END $$;

-- ===== 7 — admin_set_legal_settings accepts the new facts =====
-- Set the legal settings: a full row; every field is validated, an unknown key is a refusal.
CREATE OR REPLACE FUNCTION public.admin_set_legal_settings(p_settings jsonb)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_before jsonb;
  v_after  public.legal_settings%ROWTYPE;
  v_key    text;
  v_text   text;
  v_num    integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  IF p_settings IS NULL OR jsonb_typeof(p_settings) <> 'object' THEN RAISE EXCEPTION 'badValue:settings'; END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key NOT IN ('operator_name','operator_address','legal_email','privacy_email','governing_law',
                     'providers','copyright_agent','liability_limit_usd','notice_days','response_days',
                     'response_extra_days','deleted_ad_keep_months','dispute_keep_years',
                     'operator_details','legal_phone','security_email','listed_ad_keep_months',
                     'account_keep_months','technical_keep_months') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months') THEN
      v_text := p_settings ->> v_key;
      IF v_text IS NULL OR v_text !~ '^[0-9]{1,7}$' THEN RAISE EXCEPTION 'badValue:%', v_key; END IF;
      v_num := v_text::integer;
      IF (v_key = 'liability_limit_usd' AND v_num > 1000000)
         OR (v_key = 'notice_days' AND v_num > 365)
         OR (v_key = 'response_days' AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'response_extra_days' AND v_num > 90)
         OR (v_key = 'deleted_ad_keep_months' AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'dispute_keep_years' AND v_num > 20)
         OR (v_key IN ('listed_ad_keep_months','account_keep_months','technical_keep_months')
             AND (v_num < 1 OR v_num > 120)) THEN
        RAISE EXCEPTION 'badValue:%', v_key;
      END IF;
    END IF;
  END LOOP;
  -- The new texts are checked before anything is written as well (M3).
  IF p_settings ? 'operator_details' AND length(coalesce(p_settings ->> 'operator_details', '')) > 2000 THEN
    RAISE EXCEPTION 'badValue:operator_details';
  END IF;
  IF p_settings ? 'legal_phone' AND coalesce(p_settings ->> 'legal_phone', '') <> ''
     AND (p_settings ->> 'legal_phone') !~ '^\+?[0-9][0-9 ()-]{4,37}[0-9]$' THEN
    RAISE EXCEPTION 'badValue:legal_phone';
  END IF;
  IF p_settings ? 'security_email'
     AND coalesce(p_settings ->> 'security_email', '') !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  IF p_settings ? 'security_email' AND length(p_settings ->> 'security_email') > 320 THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  SELECT to_jsonb(s) - 'id' - 'updated_by' INTO v_before FROM public.legal_settings s WHERE s.id FOR UPDATE;
  UPDATE public.legal_settings SET
    operator_name = CASE WHEN p_settings ? 'operator_name' THEN p_settings ->> 'operator_name' ELSE operator_name END,
    operator_address = CASE WHEN p_settings ? 'operator_address' THEN p_settings ->> 'operator_address' ELSE operator_address END,
    legal_email = CASE WHEN p_settings ? 'legal_email' THEN p_settings ->> 'legal_email' ELSE legal_email END,
    privacy_email = CASE WHEN p_settings ? 'privacy_email' THEN p_settings ->> 'privacy_email' ELSE privacy_email END,
    governing_law = CASE WHEN p_settings ? 'governing_law' THEN p_settings ->> 'governing_law' ELSE governing_law END,
    providers = CASE WHEN p_settings ? 'providers' THEN p_settings ->> 'providers' ELSE providers END,
    copyright_agent = CASE WHEN p_settings ? 'copyright_agent'
                           THEN NULLIF(p_settings ->> 'copyright_agent', '') ELSE copyright_agent END,
    liability_limit_usd = CASE WHEN p_settings ? 'liability_limit_usd'
                               THEN (p_settings ->> 'liability_limit_usd')::integer ELSE liability_limit_usd END,
    notice_days = CASE WHEN p_settings ? 'notice_days'
                       THEN (p_settings ->> 'notice_days')::integer ELSE notice_days END,
    response_days = CASE WHEN p_settings ? 'response_days'
                         THEN (p_settings ->> 'response_days')::integer ELSE response_days END,
    response_extra_days = CASE WHEN p_settings ? 'response_extra_days'
                               THEN (p_settings ->> 'response_extra_days')::integer ELSE response_extra_days END,
    deleted_ad_keep_months = CASE WHEN p_settings ? 'deleted_ad_keep_months'
                                  THEN (p_settings ->> 'deleted_ad_keep_months')::integer ELSE deleted_ad_keep_months END,
    dispute_keep_years = CASE WHEN p_settings ? 'dispute_keep_years'
                              THEN (p_settings ->> 'dispute_keep_years')::integer ELSE dispute_keep_years END,
    operator_details = CASE WHEN p_settings ? 'operator_details'
                            THEN NULLIF(btrim(coalesce(p_settings ->> 'operator_details', '')), '') ELSE operator_details END,
    legal_phone = CASE WHEN p_settings ? 'legal_phone'
                       THEN NULLIF(btrim(coalesce(p_settings ->> 'legal_phone', '')), '') ELSE legal_phone END,
    security_email = CASE WHEN p_settings ? 'security_email' THEN p_settings ->> 'security_email' ELSE security_email END,
    listed_ad_keep_months = CASE WHEN p_settings ? 'listed_ad_keep_months'
                                 THEN (p_settings ->> 'listed_ad_keep_months')::integer ELSE listed_ad_keep_months END,
    account_keep_months = CASE WHEN p_settings ? 'account_keep_months'
                               THEN (p_settings ->> 'account_keep_months')::integer ELSE account_keep_months END,
    technical_keep_months = CASE WHEN p_settings ? 'technical_keep_months'
                                 THEN (p_settings ->> 'technical_keep_months')::integer ELSE technical_keep_months END,
    updated_at = now(),
    updated_by = v_uid
   WHERE id
  RETURNING * INTO v_after;
  -- Per-field validation after assignment so the CHECK bounds and the text rules share one refusal shape.
  FOREACH v_text IN ARRAY ARRAY[v_after.legal_email, v_after.privacy_email] LOOP
    IF v_text IS NULL OR v_text !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN RAISE EXCEPTION 'badValue:email'; END IF;
  END LOOP;
  IF v_after.operator_name IS NULL OR length(btrim(v_after.operator_name)) = 0
     OR length(v_after.operator_name) > 2000 THEN RAISE EXCEPTION 'badValue:operator_name'; END IF;
  IF v_after.operator_address IS NULL OR length(btrim(v_after.operator_address)) = 0
     OR length(v_after.operator_address) > 2000 THEN RAISE EXCEPTION 'badValue:operator_address'; END IF;
  IF v_after.governing_law IS NULL OR length(btrim(v_after.governing_law)) = 0
     OR length(v_after.governing_law) > 2000 THEN RAISE EXCEPTION 'badValue:governing_law'; END IF;
  IF v_after.providers IS NULL OR length(btrim(v_after.providers)) = 0
     OR length(v_after.providers) > 2000 THEN RAISE EXCEPTION 'badValue:providers'; END IF;
  IF v_after.copyright_agent IS NOT NULL AND length(v_after.copyright_agent) > 2000 THEN
    RAISE EXCEPTION 'badValue:copyright_agent';
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.settings_set', 'legal_settings', 'settings',
          jsonb_build_object('before', v_before, 'after', to_jsonb(v_after) - 'id' - 'updated_by'));
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_set_legal_settings(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_legal_settings(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_legal_settings(jsonb) TO service_role;

-- ===== 8 — a published text never shows a token without its fact =====
-- The first problem with a text's tokens against a settings snapshot, or NULL: 'unknownFact:<name>' for a
-- token that is not a fact, 'factMissing:<name>' for a fact that is empty. Tokens are {{name}} with name
-- of lower-case letters and _, as LegalText reads them; names are checked in alphabetical order.
CREATE FUNCTION public.legal_text_fact_problem(p_text text, p_snapshot jsonb)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $$
  SELECT CASE WHEN NOT (coalesce(p_snapshot, '{}'::jsonb) ? t.name) THEN 'unknownFact:' || t.name
              ELSE 'factMissing:' || t.name END
    FROM (SELECT DISTINCT (regexp_matches(coalesce(p_text, ''), '\{\{([a-z_]+)\}\}', 'g'))[1] AS name) t
   WHERE NOT (coalesce(p_snapshot, '{}'::jsonb) ? t.name)
      OR p_snapshot ->> t.name IS NULL
      OR btrim(p_snapshot ->> t.name) = ''
   ORDER BY t.name
   LIMIT 1;
$$;
REVOKE ALL ON FUNCTION public.legal_text_fact_problem(text, jsonb) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_text_fact_problem(text, jsonb) TO service_role;

-- Publish a draft: both languages, a label and a change log are required. Version 1 and every non-material
-- version take effect now; a material version takes effect no earlier than the notice period. Every fact
-- in the text is a setting token, so the settings row is frozen into the version at publish; a token that
-- is not a fact, or whose fact is empty, is refused (M3).
CREATE OR REPLACE FUNCTION public.admin_publish_legal_version(
  p_version_id uuid,
  p_material boolean,
  p_effective_at timestamptz DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid       uuid := auth.uid();
  v_v         public.legal_versions%ROWTYPE;
  v_notice    integer;
  v_effective timestamptz;
  v_snapshot  jsonb;
  v_problem   text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'publish') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'publish');
  IF p_material IS NULL THEN RAISE EXCEPTION 'badValue:material'; END IF;
  SELECT * INTO v_v FROM public.legal_versions v WHERE v.id = p_version_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownVersion'; END IF;
  IF v_v.status <> 'draft' THEN RAISE EXCEPTION 'notDraft'; END IF;
  IF v_v.label IS NULL OR length(btrim(v_v.label)) NOT BETWEEN 1 AND 60 THEN
    RAISE EXCEPTION 'labelRequired';
  END IF;
  IF v_v.body_en IS NULL OR v_v.body_am IS NULL
     OR length(btrim(v_v.body_en)) = 0 OR length(btrim(v_v.body_am)) = 0 THEN
    RAISE EXCEPTION 'bothLanguages';
  END IF;
  IF v_v.changelog IS NULL OR length(btrim(v_v.changelog)) = 0 THEN
    RAISE EXCEPTION 'changelogRequired';
  END IF;
  SELECT s.notice_days INTO v_notice FROM public.legal_settings s WHERE s.id;
  SELECT to_jsonb(s) - 'id' - 'updated_at' - 'updated_by' INTO v_snapshot
    FROM public.legal_settings s WHERE s.id;
  v_problem := public.legal_text_fact_problem(v_v.body_en || E'\n' || v_v.body_am, v_snapshot);
  IF v_problem IS NOT NULL THEN RAISE EXCEPTION '%', v_problem; END IF;
  IF p_material THEN
    v_effective := coalesce(p_effective_at, now() + make_interval(days => v_notice));
    IF v_effective < now() + make_interval(days => v_notice) THEN
      RAISE EXCEPTION 'noticeTooShort';
    END IF;
  ELSE
    v_effective := coalesce(p_effective_at, now());
  END IF;
  UPDATE public.legal_versions
     SET status = 'published',
         material = p_material,
         effective_at = v_effective,
         published_at = now(),
         published_by = v_uid,
         settings_snapshot = v_snapshot
   WHERE id = v_v.id
  RETURNING * INTO v_v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.published', 'legal_version', v_v.id::text,
          jsonb_build_object('document_id', v_v.document_id, 'version', v_v.version,
                             'label', v_v.label, 'material', p_material, 'effective_at', v_effective));
  RETURN jsonb_build_object('version_id', v_v.id, 'effective_at', v_effective);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamptz) TO authenticated;
GRANT ALL ON FUNCTION public.admin_publish_legal_version(uuid, boolean, timestamptz) TO service_role;

-- Proofs, with no caller (G39): the token rule; the two caller-bound doors refuse a missing caller;
-- headers and grants as declared. Answers that need a person (the settings, the publish refusal) are
-- proven by LG-13 and LG-14.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  IF public.legal_text_fact_problem('a {{legal_email}} b', '{"legal_email": "x@example.invalid"}'::jsonb) IS NOT NULL
     OR public.legal_text_fact_problem('{{nope}} {{legal_email}}', '{"legal_email": "x@example.invalid"}'::jsonb)
        IS DISTINCT FROM 'unknownFact:nope'
     OR public.legal_text_fact_problem('{{legal_phone}}', '{"legal_phone": null}'::jsonb)
        IS DISTINCT FROM 'factMissing:legal_phone'
     OR public.legal_text_fact_problem('{{copyright_agent}}', '{"copyright_agent": "  "}'::jsonb)
        IS DISTINCT FROM 'factMissing:copyright_agent'
     OR public.legal_text_fact_problem('{{b_fact}} {{a_fact}}', '{}'::jsonb) IS DISTINCT FROM 'unknownFact:a_fact'
     OR public.legal_text_fact_problem('no tokens, {single} braces', '{}'::jsonb) IS NOT NULL THEN
    RAISE EXCEPTION 'proof failed: legal_text_fact_problem';
  END IF;
  FOR r IN SELECT * FROM (VALUES ('settings'), ('publish')) AS t(door) LOOP
    BEGIN
      IF r.door = 'settings' THEN PERFORM public.admin_set_legal_settings('{"legal_phone": "x"}'::jsonb);
      ELSE PERFORM public.admin_publish_legal_version(gen_random_uuid(), false);
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.door;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  FOR r IN SELECT * FROM (VALUES
      ('public.admin_set_legal_settings(jsonb)', 'v'::"char", true, true),
      ('public.admin_publish_legal_version(uuid, boolean, timestamp with time zone)', 'v'::"char", true, true),
      ('public.legal_text_fact_problem(text, jsonb)', 'i'::"char", false, false)) AS t(sig, vol, definer, auth_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM r.definer
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: anon may execute %', r.sig;
    END IF;
    IF has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok THEN
      RAISE EXCEPTION 'proof failed: % authenticated EXECUTE is not %', r.sig, r.auth_ok;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020030000') ON CONFLICT (version) DO NOTHING;
J2. After each apply, paste the read-back on ethio-prod: `select version from public.migration_marks where version = '<its mark>';` (20261020020000, then 20261020030000); after M3b, one aggregated select of provolatile, prosecdef and proconfig for legal_scheduled(text, character), accept_legal(uuid[], text, boolean, boolean) and legal_text_fact_problem(text, jsonb) (s, true, {search_path=public}; v, true, {search_path=public}; i, false, {search_path=public}). Regenerate src/integrations/supabase/types.ts if the tool changes it (accept_legal's new argument; legal_scheduled; the new columns).

PART K — THE END-TO-END CHECK (after the operator's "continue": M3a and M3b must be on ethio-staging first — the staging preflight refuses the browser tests until their marks are there).
K1. Run one file at a time, each whole, both projects, 0 retries: `bun run e2e:local -- e2e/legal-accept.spec.ts --retries=0`, then e2e/legal-history.spec.ts, e2e/legal-pages.spec.ts, e2e/legal-doors.spec.ts, e2e/legal-admin.spec.ts, e2e/shell.spec.ts. Paste each run's summary lines (passed, failed, skipped, flaky).
K2. A failure: read its error and its context, fix it at its root cause (G38), and run that file again whole; a fix in a shared file reruns every file of K1 that uses it. Name each failure and its fix in the final report.
K3. If the browser guard stops the run (no usable browser — INC-506), paste its message once and go on to the final report: CI on the final commit is then the proof.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bun run i18n:map-guard` "usage maps match the tree"; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bun run scripts/check-root-routes.ts` and its `--self-test`; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK".
SCOPE — these files only: the brief; src/features/legal/ (legal-reader.ts, legal-kinds.ts, use-legal-gate.ts, legal-document-page.tsx, legal-accept-screen.tsx, my-legal-page.tsx and the version view beside it, and their unit tests); src/server/legal-page.ts; src/routes/terms.tsx, privacy.tsx, legal.$kind.tsx, legal.accept.tsx, account_.legal.tsx, account_.legal_.$versionId.tsx; src/routeTree.gen.ts (regenerated); src/components/app-shell.tsx (the one call of B3 and its import); src/components/shell/app-footer.tsx; src/features/account/account-overview.tsx; src/styles.css (E4's rule only); src/features/admin/legal/ (legal-service.ts, facts-validation.ts, legal-facts-card.tsx, legal-editor-form.tsx, legal-publish-dialog.tsx, user-legal-card.tsx and their unit tests); src/i18n/locales/en.ts and am.ts (and the usage maps the guard regenerates); e2e/legal-doors.spec.ts; e2e/legal-admin.spec.ts; e2e/legal-pages.spec.ts, e2e/legal-accept.spec.ts, e2e/legal-history.spec.ts (new); e2e/shell.spec.ts (FT-1's selector only); any test B4's or H7's census must change (named with its reason); docs/features/legal.md; docs/_changelog.md; scripts/public-surface-allowlist.txt; scripts/e2e-select.ts; roadmap.md; the two migration files the tool writes; src/integrations/supabase/types.ts if the tool regenerates it; the files of an A1 fix (named with the failure it fixes); the files of a Part K fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change.
THE STOP REPORT (after Part J; then STOP): done or not done by part; A1's six lines with the run's number and commit (and A1's bodies, if any); <START>; B4's, C3's, C4's and H7's censuses; the strings — `git diff <START> -- src/i18n/locales/en.ts src/i18n/locales/am.ts` whole (every key with its English and Amharic, G43); `grep -n 'test("' e2e/legal-pages.spec.ts e2e/legal-accept.spec.ts e2e/legal-history.spec.ts` and `grep -n 'test("LG-1[1-4]' e2e/legal-doors.spec.ts` and `grep -n 'test("LGA-8' e2e/legal-admin.spec.ts` (describe the tests by those titles only); the checks; the live headers pasted before each save and each "Migration guard OK." line; each migration's file name and size in bytes; J2's read-backs; `git diff --name-only <START>`; anything not foreseen; and, last, the operator's staging lines, in this order: "apply <the uuid fragment of M3a's file name> → expect mark 20261020020000", then "apply <the uuid fragment of M3b's file name> → expect mark 20261020030000". Then STOP: the operator applies both on ethio-staging, reads each mark back and sends "continue".
THE FINAL REPORT (after Part K): K1's summary lines for each file, K2's failures and fixes, or K3's message; the checks again if Part K changed a file; `git diff --stat <START>`; `git diff --name-only <START>`; anything not foreseen. Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: a later migration that restores M2 v2's and turn 1's door texts whole and drops legal_scheduled and legal_text_fact_problem (forward only; the new columns stay); git revert of this turn's commits.
```
