# Foundations — records turn R1: the block applier (register row 58), and the incident ledger's first half of the Foundations bundle, INC-847 … INC-900, imported word for word (G41): brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — RECORDS TURN R1 (2026-10-27; G41; register row 58, new; anchors located at e9ee79f7ae83011194ea424889f9f8c047884f7b). Two things. (1) A brief carries every new file as a FILE block and every change as an EDIT block, and until now the executor retyped each one with its editing tools — the whole text emitted a second time after STEP 0 saved it, and a long block retyped is a block at risk (INC-907's class). This turn lands one script that applies a brief's blocks exactly as written — scripts/brief/apply-blocks.ts, run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]` — and uses it for everything after its own two files. (2) The supervisor's running record holds every incident registered since the last records turn (2026-10-23, bundle 22's turn 31: "Numbering: next free INC-847."); the repository's ledger does not. This turn imports the first half — INC-847 … INC-900, registered 2026-10-24 → 2026-10-25 — word for word into docs/tracking/incidental-findings.md, in the ledger's own form, each entry as it stood when it was registered; INC-901 … INC-937, the later word and the watch list follow in records turn R2. With them: docs/features/e2e-harness.md names the route guard (turn 34d's reviewer, MINOR 6), the register gains row 58, and the roadmap ticks turn 34d (its executor named rightly — MINOR 7) and queues the route guard's follow-ups and INC-937. Tier B (a tooling script with its tests; records). No migration. No string. No package change. AGENTS.md unchanged. No file deleted. Base: dev e9ee79f7ae83011194ea424889f9f8c047884f7b (turn 34d's landing; CI run 40436029815 SUCCESS, main promoted). The executor is Claude Code (DEC-257). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0 (the brief and roadmap line 3); B — the block applier; C — the import, the docs and the roadmap (applied by it); THE CHECKS; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: e9ee79f7ae83011194ea424889f9f8c047884f7b
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
docs/tracking/incidental-findings.md
scripts/brief/apply-blocks.sh
scripts/brief/apply-blocks.test.ts
scripts/brief/apply-blocks.ts
SCOPE-END

THE SYSTEM (G0) — one concern, and a records import.
CONCERN: a brief's exact text reaches the tree exactly — every FILE block and every EDIT block lands byte for byte, in the order written, or nothing lands (register row 58, new).
MECHANISM: NONE YET — built in Part B as scripts/brief/apply-blocks.ts: `parseBlocks(brief)` (FILE-BEGIN <path> … FILE-END <path>; EDIT <path> #<n> with OLD-BEGIN/OLD-END and NEW-BEGIN/NEW-END; a block inside a FILE block is that file's text; a run-on block is refused), `applyBlocks(blocks, io, only)` (every new text built in memory first; an OLD text found 0 or 2+ times, a missing file, a path outside the repository or outside the brief's scope — the kit's own `scopeVerdict`, .claude/hooks/lib.ts — refuses and writes nothing), `main(argv)`; scripts/brief/apply-blocks.sh runs it (`bash scripts/*` is the kit's allowed form for a committed script; the kit refuses inline programs).
CONSUMERS: every brief's HOW TO WORK, both executors (Claude Code and Lovable). At BASE no script applies brief blocks: `git grep -l 'OLD-BEGIN' -- scripts .claude` prints nothing.
COVERED HERE: the applier, and this turn's own blocks after Part B's two files. LEFT: none — the next brief names it.
CONFORMANCE GUARD: scripts/brief/apply-blocks.test.ts — BA-1 (blocks in order; a block inside a FILE block is its text; a run-on block refused), BA-2 (a FILE, then EDITs on the text it left; only the paths named), BA-3 (one refusal writes nothing: an OLD text found 0 or 2 times, a missing file, `../` and an absolute path, a scope refusal, a named path with no block, a brief with none), BA-4 (the command line writes; `--dry` and a refusal write nothing; no argument asks for a brief), BA-5 (the wrapper runs apply-blocks.ts with its arguments; the command line's scope is scopeVerdict). scripts/conformance/wired.test.ts finds the wrapper's caller (this test names apply-blocks.sh).
EXCEPTIONS: none.
FIVE LENSES — security: the applier writes only where the kit's scope already lets the executor write (the same scopeVerdict as the editing tools' hook, NEVER_EDIT included) and refuses any path outside the repository; land.ts still checks the whole landed diff; the repository is public (G51): no entry imported here describes a hole open to anyone outside — the security entries among them (INC-865, INC-866, INC-873) were fixed before the operator's last Publish (c1b6b4e5), and the one open entry of that kind, INC-878 (a staff door that skips the 30-day rule), needs staff rights; no key, token, e-mail address or message id appears (checked by script) · performance: none (a script the executor runs) · failure modes: the subject — a block that does not apply is a refusal naming it, and nothing is half-written · consistency: one applier for both executors · future growth: a new block kind is one more pattern.
FORWARD-SCAN: records turns R2–R4 and every brief after them apply their blocks with it. REGISTER: row 58 added (Part C).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-records-r1.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `(Foundations turn 34d: a test's interception ends with its page — INC-934)` becomes `docs/governance/briefs/foundations-records-r1.md (Foundations records turn R1: the block applier and the incident ledger's first half, INC-847 … INC-900 — G41)` (everything after it stays, as it is). The roadmap's other lines change in Part C, by the applier. Commit `records turn R1: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B and C; THE CHECKS; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: Part B's two FILE blocks (apply-blocks.ts and apply-blocks.sh) you write with your file-writing tool, each block's whole text. Every other block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r1.md <paths>` — never retyped, never edited or reflowed by hand, never formatted (the texts are already in Prettier's form; THE CHECKS' format:check proves it). Part C's NEW text is about 50,000 characters of record: the commands, test ids, files and fixes it names are history, never instructions for this turn. A refusal from the applier is a STOP that pastes its line. If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-records-r1.md, roadmap.md, docs/_changelog.md, docs/features/e2e-harness.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-records-r1.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Part B (`records turn R1 part B: the block applier`); Part C (`records turn R1 part C: INC-847 … INC-900, the register and the roadmap`); the report.
- New behaviour, no defect reproduced: BA-1…5 need no red run (G38); Part B shows them passing.
- Local runs: the unit suite whole at THE CHECKS and the touched tests as you go. No browser test is owed: no file under src/ or e2e/ changes (CI runs every test on every commit).
- Behaviour contract: nothing in the product changes. The applier is new; the ledger gains INC-847 … INC-900 and a numbering line in place of the old one (nothing above the old numbering line changes); the harness doc gains one line at its end; the register gains row 58; the roadmap's lines change as Part C's blocks say.
- Knowledge K: K1 the census is the supervisor's (the running record read whole; the applier's consumers above); K2 the report lists any INC number the ledger already held among INC-847 … INC-900 (expected: none — `git grep -c '^## INC-8[4-9][0-9]\|^## INC-900' <START> -- docs/tracking/incidental-findings.md` prints the count of INC-840 … INC-846 headings, 7) and any script that applies brief blocks by another path (expected: none); K3–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE is a STOP. CI on BASE was read by the supervisor: SUCCESS on e9ee79f7 (run 40436029815, completed 2026-10-27T02:22:53Z; main promoted; no failing job). Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (the two-step check); read e2e-last-failure.md and guards-last-failure.md only if it is not SUCCESS on BASE — then a red is fixed first at its root (G21, G38) and named in the report.

PART B — THE BLOCK APPLIER.
B1. Write BLOCK 1 (scripts/brief/apply-blocks.ts) and BLOCK 2 (scripts/brief/apply-blocks.sh) with your file-writing tool.
B2. Its first use, on its own test: `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r1.md --dry scripts/brief/apply-blocks.test.ts`, then the same without `--dry` (paste both outputs: `FILE scripts/brief/apply-blocks.test.ts (<n> bytes)` and `applied 1 block(s) to 1 file(s)`).
B3. `bunx vitest run scripts/brief/apply-blocks.test.ts scripts/conformance/wired.test.ts scripts/conformance/non-null.test.ts` — paste the totals (the supervisor's run: 3 files, BA-1…5 among them, all passed). Commit Part B.

PART C — THE IMPORT, THE DOCS AND THE ROADMAP (by the applier).
C1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-records-r1.md --dry docs/tracking/incidental-findings.md docs/features/e2e-harness.md docs/governance/mechanisms.md docs/_changelog.md roadmap.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/features/e2e-harness.md #1` · `EDIT docs/governance/mechanisms.md #1` · `EDIT docs/_changelog.md #1` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `applied 6 block(s) to 5 file(s)`). The blocks:
EDIT docs/tracking/incidental-findings.md #1
OLD-BEGIN
Numbering: next free INC-847.
OLD-END
NEW-BEGIN
## INC-847 — My listings ("seller center") first shows "unable to load" with Try again, then loads a few seconds later (2026-10-24; Tier A — a signed-in reader's first load, F4; the operator's turn-32 walk, 22:29 local 10-23)

Defect: the operator: "clicking seller center initially says unable to load, error message with try again but after few seconds able to load". Evidence: read: /my-listings (beforeLoad awaits getSession, my-listings.tsx :14-:17; the page's query authKey("my-listings", …) without retry/enabled rules, my-listings-page.tsx :173-:190; readMyListings swallows the refusal — `if (error) return null`, my-listings.ts :236 — so the page throws "my_listings refused or malformed" and shows myListings.loadError + Retry (:690-:705) with no class word). Cause: HYPOTHESIS (G3) — an expired access token's first call after idle while auth-js refreshes (DEC-076's family) or a cold first request on the published host; the exact page and the refusal class are unread. Fix (turn 33): the reader throws a typed failure carrying status/code; the error state names the class in one word so the operator can report it; the census of readers that return null on error; the session-readiness rule is the Foundations door/QueryState mechanism. Class: a reader that drops the refusal's code (2 sites by this literal: my-listings.ts :236, posting-service.ts) and a signed-in query that fires before the session is proven fresh. Status (2026-10-24): OPEN.

## INC-848 — the published site answers 404 on /sitemap.xml and public/robots.txt names no sitemap (2026-10-24; Tier B — SEO, a launch-gate item; found by turn 33's A3)

Defect: as titled. Evidence: A3's finding; no route in src/routes; the search-engine rules R1–R9 of the ledger :2102 name a sitemap; A3's measurement: /sitemap.xml 404 .286/.484 s, /robots.txt .125/.144 s (399 B). Fix: not this bundle's work — the roadmap's before-launch list (an INC-848 line written by turn 33's Part F). Class: not in the record; mechanism: NONE YET (no sitemap route in src/routes, per the record). Status (2026-10-24): OPEN.

## INC-849 — a reader's contract change without its callers: readSellerIdentity now throws a ReaderError, and wizard.tsx :386 and step-review.tsx :271 call it with no catch (2026-10-24; Tier A — a reader's contract change without its callers; found by the executor in turn 33's continuation 1, listed as K2 siblings)

Defect: posting-service.ts :1140 readSellerIdentity now throws a ReaderError where it returned null; wizard.tsx :386 and step-review.tsx :271 call it with `void …then(...)` and no catch — an unhandled rejection on any door error; the executor listed them as K2 siblings "neither was changed" (the supervisor's ruling named "its caller" in the singular — S387, a partial census of the callers at ruling time). Evidence: the executor's K2 list at `34c0fa5a`. Fix: both callers catch in the same turn; class rule: null→throw lists every caller by grep and each lands its catch; the Foundations door mechanism returns a typed Result the compiler enforces. The null-on-error census (D2): remaining ad-page/save.ts:50, my-listings/my-listing.ts:342, posting-service.ts:569/600/608/658/690, pricing-data.ts:236; expected-null posting-service.ts:417, mfa-service.ts:139 → the Foundations door item (roadmap, F2). Class: null→throw without every caller's catch; concern (drafted from the fix's words, not stated in the record): a reader's failure reaches every caller as a typed failure; mechanism: readerFailure/ReaderError (src/lib/reader-failure.ts), then the Foundations door's typed Result (NONE YET). Status (2026-10-24): OPEN — turn 33's continuation 2.

## INC-850 — the legal draft editor reads its languages through useLanguages() → admin_list_languages() (translations:view): a legal-only editor cannot add a draft's optional texts (2026-10-24; Tier B — the same class as LGA-21's finding, the sibling the census found; found when the executor paused under G34 in turn 33's continuation 2)

Defect: legal-editor-form.tsx reads the languages a draft may take through useLanguages() → admin_list_languages() (translations:view) — a legal-only editor cannot add a draft's optional texts. Evidence: the executor's pause (G34): the ruling's "useLanguages leaves src/features/admin/legal/" also reaches legal-editor-form.tsx (the draft editor's optional texts), outside scope; M23's missing_languages exists per version, a draft has none. RULING: the editor keeps its reader this turn; the removal is the card and the version page. Fix: a legal door answers the languages a draft may take (the enabled admin languages, less en/am/zxa — e.g. carried by admin_legal_settings or a small reader granted with legal:edit), the editor reads it, and useLanguages leaves the legal feature entirely; a legal-only editor test proves it. Owed to the next legal turn; roadmap line in F2. Class: the same class as LGA-21's finding (the card's missing-language rule used useLanguages() → admin_list_languages() (translations:view), which a legal-only publisher lacks). Status (2026-10-24): OPEN — owed to the next legal turn.

## INC-851 — a language picked in the menu does not follow to a new tab when a device ★ is set (2026-10-24; Tier B — the language's reach; the operator's walk of turns 32–33b)

Defect: with a device ★ set (U4h: the account carry writes the star at the first sign-in), a language picked in the menu does not follow to a new tab — provider.tsx :425-:447 boots URL → star → stored, so the star (English) wins over the stored current choice (Amharic). By U4h's design the ★ is the device choice and the menu switch this tab's; the operator expected the switch to follow. Evidence: the walk's line 2 — "the Amharic page's link opens the new tab in ENGLISH". Fix: a product question put to the operator (G49): (b) the last language picked becomes the device's (and the signed-in account's) — recommended — or (a) keep the two-level design with a hint beside the ★. Class: not stated in the record at registration; its tier line names the concern — the language's reach. Status (2026-10-24): OPEN — decision pending (D237 reserved).

## INC-852 — ten routes carry their own signed-in door-step in three shapes (2026-10-24; Tier A — one mechanism per concern; found by the Foundations turn-1 brief's census)

Defect: ten routes carry their own signed-in door-step (`supabase.auth.getSession()` → redirect /auth?return) in three shapes — `== null` (account\_.saved.tsx :9, account\_.legal.tsx :9, account\_.legal\_.\$versionId.tsx :9), `(… ?? null) === null` (my-listings.tsx :16, my-listings\_.\$listingId.tsx :20, my-listings\_.\$listingId\_.edit.tsx :27, post.tsx :32, post\_.\$listingId.tsx :34, account.tsx :12), and legal.accept.tsx :16-:18 (a visitor sent to "/" with no way back); my-listings\_.\$listingId.tsx :21 builds the return path without encodeURIComponent. Evidence: grep beforeLoad/getSession in src/routes at `31f7b7f2`. Fix: requireSignedIn + CF-SIR census (Foundations turn 1 D1–D3). Class: concern "a signed-in screen's door-step"; mechanism src/lib/signed-in-route.ts (NONE YET before this turn). Status (2026-10-24): OPEN — Foundations turn 1.

## INC-853 — four hand-rolled anonymous REST clients in specs (2026-10-24; Tier B — K2 sibling, LEFT)

Defect: four hand-rolled anonymous REST clients in specs — e2e/ad-page-doors.spec.ts :30-:37 (restBase/answerOf), e2e/category-image-routes.spec.ts :41 (anonClient), e2e/account-saved.spec.ts :29, e2e/ad-page.spec.ts :536. Fix: the one helper `anonRpc` lands in e2e/helpers/session.ts this turn (D7) for LGC-6; the four move onto it in the e2e-helpers wave (roadmap line owed at the records turn). Class: concern "an anonymous REST call from a test"; mechanism e2e/helpers/session.ts anonRpc. Status (2026-10-24): OPEN — the e2e-helpers wave.

## INC-854 — two seedDocument helpers (2026-10-24; Tier B — K2 sibling, LEFT)

Defect: two seedDocument helpers — e2e/legal-pages.spec.ts (seedDocument(kind) → documentId + seedVersion) and e2e/legal-certify.spec.ts (seedDocument(s, kind, country, text)). Fix: one helper in e2e/helpers in the e2e-helpers wave. Class: concern "a scratch legal document in a test"; mechanism NONE YET. Status (2026-10-24): OPEN — the e2e-helpers wave.

## INC-855 — scripts/publish-evidence.selftest.sh is named by no workflow step, package.json script or test (2026-10-24; Tier B — INC-563's class)

Defect: scripts/publish-evidence.selftest.sh ("Run: bash scripts/publish-evidence.selftest.sh") is named by no workflow step, package.json script or test — a self-test nothing runs. Fix: GW-3 in scripts/shell-guards.test.ts (C6); wired.test.ts keeps the class closed. Class: concern "every guard has a caller"; mechanism scripts/conformance/wired.test.ts. Status (2026-10-24): OPEN — Foundations turn 1.

## INC-856 — guard debt: the route-boundary wave of the kit-adoption allowlist (2026-10-24; Tier B guard debt — the kit-adoption allowlist's three waves)

Defect: the walkers left on kit-adoption-allowlist.txt after turn 1, each line `until` its wave — INC-856: the route-boundary turn moves src/lib/error-text.test.ts, untrusted-text.test.ts, env-flags.test.ts, src/server/ai/meter.test.ts. Fix: each INC closes when its lines leave the allowlist (the test fails on a stale line). Class: G0.10 — the allowlist shrinks turn by turn, never partial coverage unlisted; concern (drafted from DEC-244, not stated in the record): one walker for every census guard; mechanism scripts/conformance/kit.ts (DEC-244). Status (2026-10-24): OPEN — the route-boundary turn.

## INC-857 — guard debt: the form-kit wave of the kit-adoption allowlist (2026-10-24; Tier B guard debt)

Defect: INC-857: the form-kit turn moves src/look-law.test.ts, scripts/admin-tables.ts, destructive-red.ts, list-action-labels.ts, src/features/legal/agree-to-document.test.tsx, use-legal-gate.test.tsx. Fix: closes when its lines leave the allowlist (the test fails on a stale line). Class: G0.10 (as INC-856); mechanism scripts/conformance/kit.ts. Status (2026-10-24): OPEN — the form-kit turn.

## INC-858 — guard debt: the door wave of the kit-adoption allowlist (2026-10-24; Tier B guard debt)

Defect: INC-858: the door turn moves scripts/e2e-leases.ts, test-ids.ts, check-root-routes.ts, src/lib/refresh-after-write.test.ts, src/i18n/locales/admin-layer.test.ts. Fix: closes when its lines leave the allowlist (the test fails on a stale line). Class: G0.10 (as INC-856); mechanism scripts/conformance/kit.ts. Status (2026-10-24): OPEN — the door turn.

## INC-859 — guard debt: the route-boundary wave "the posting and media routes" (2026-10-24; Tier A guard debt — a routes-allowlist.txt group `until` its INC; registered with Foundations turn 2's brief)

Defect: the posting and media routes (draft, identity, alias, assist, background, photos.\$id, share, view, upload/photo, media/photo-links; + the second clientAddress copy photo-links.ts :46-:52, the fromCursor copy seller.ts :16-:18) are not yet on defineRoute. Fix: closes when its lines leave routes-allowlist.txt and the ESLint ignore list (CF-RT-5 keeps the two equal). Class: guard debt of the route boundary (G54 a) — a routes-allowlist.txt group `until` its INC; mechanism src/server/route.ts defineRoute (Foundations turn 2). Status (2026-10-24): OPEN.

## INC-860 — guard debt: the route-boundary wave "the admin imports and exports" (2026-10-24; Tier A guard debt)

Defect: the admin imports and exports (4 import.ts, 3 export.ts) + src/server/imports/gate.ts (:85 JSON builder, :800 bearer read) + the four relay copies are not yet on the route mechanism. Fix: closes when its lines leave routes-allowlist.txt and the ESLint ignore list (CF-RT-5). Class: as INC-859; mechanism src/server/route.ts defineRoute. Status (2026-10-24): OPEN.

## INC-861 — guard debt: the route-boundary wave "the staff AI routes" (2026-10-24; Tier A guard debt)

Defect: the staff AI routes (translate, generate-image, suggest-icon) + src/server/category-images/gate.ts (:21/:48/:59) + the key-in-URL and the missing dials. Fix: closes when its lines leave routes-allowlist.txt and the ESLint ignore list (CF-RT-5). Class: as INC-859; mechanism src/server/route.ts defineRoute. Status (2026-10-24): OPEN.

## INC-862 — guard debt: the route-boundary wave "the public readers and small routes" (2026-10-24; Tier A guard debt)

Defect: the public readers and small routes (categories.tree, locations, locations.\$country, i18n.\$lang, feed, seller, attributes.\$id.options, catalog.find, geo, geo/search, geo/reverse, geo/outline, map/tiles, l.\$id.photo.jpg, l.\$id.qr.svg) + src/server/ad-photo.ts + geocode.ts's fetch onto upstream(). Fix: closes when its lines leave routes-allowlist.txt and the ESLint ignore list (CF-RT-5). Class: as INC-859; mechanism src/server/route.ts defineRoute + src/server/upstream.ts. Status (2026-10-24): OPEN.

## INC-863 — guard debt: the six createServerFn sites onto schema inputValidators (2026-10-24; Tier A guard debt)

Defect: the six createServerFn sites (\_\_root.tsx :94, l.\$slug.tsx :23, \$name.tsx :8, terms.tsx :6, privacy.tsx :6, legal.\$kind.tsx :10) are not yet on schema inputValidators. Fix: closes when its lines leave routes-allowlist.txt and the ESLint ignore list (CF-RT-5). Class: as INC-859; mechanism: schema inputValidators (the record's words at registration). Status (2026-10-24): OPEN.

## INC-864 — Foundations turn 1 put page-only code into two first-paint modules (2026-10-24; Tier B — the first-paint closure; CI on `93176317`, run 40075831535)

Defect: turn 1 put page-only code into two first-paint modules — `legalPageData` (and its ReaderError import from src/lib/reader-failure.ts, the module turn 33 moved off the first paint — S386) into src/features/legal/legal-reader.ts, and `signedInOnlyKind` + `shapedCountries` into legal-kinds.ts; both are imported by use-legal-gate.ts :6-:7 (the root's acceptance gate), so the chunks reader-failure (0.5 KiB), legal-kinds (0.7) and legal-reader (1.1) joined the closure. The brief (D4, D5) named those files without checking their place in the closure (S391). Evidence: run 40075831535 on `93176317`: FAILURE by the first-paint bundle budget alone — JS 306.2 KiB / 306 KiB; E2E 2,175 passed, 0 failed, 0 flaky. Fix (turn 2, Part A2): NEW src/features/legal/legal-page-data.ts takes the three exports; importers follow (legal.publishing.tsx, legal.\$kind.tsx, server/legal-page.ts, the mirror test); the guard: check-bundle-size.mjs MUST_STAY_LAZY = \[reader-failure, legal-page-data, zod\] — a chunk of that name in the closure fails the check (BC-5 planted) — the growth-proof form of the ceiling; AGENTS.md line 39 names the module. Class: concern "what the browser loads before paint"; mechanism scripts/check-bundle-size.mjs + bundle-closure.mjs (the ceiling) — gains the lazy-only list. Status (2026-10-24): OPEN — folded into the next turn's first part.

## INC-865 — `defineRoute` reads a request body before the caller's identity and standing are known (2026-10-24; Tier A — a mechanism defect, found before any consumer paid for it; found by the INC-859 wave census, re-read by the supervisor at `ee0cdc56`)

Defect: `defineRoute` reads a request body before the caller's identity and standing are known — a visitor's 64 KiB (or an upload's 2 MiB) is buffered before the 401; today's upload route answers 401 before a byte is read (upload/photo.ts :161-:181). Evidence: src/server/route.ts :157-:163 (readBounded, up to the ceiling) vs :165-:189 (the caller check); the comment at :234 "(4) the content type — before the body is read" is already false; the wave census /home/claude/b22/f3/study-inc859.md (435 lines). Fix: Foundations turn 3 Part A — step 2 keeps only the Content-Length header check; the counting read moves after the caller, the beforeParse dials and the content type; RT-1 keeps "reads nothing"; a new RT-11 proves a visitor's body is never read (a counting stream whose reader is asserted unread on a 401). Class: side effect (a buffered read, memory and time) before the authority — the order concern the mechanism exists to fix (G54 a); mechanism: defineRoute itself (register row 13). Status (2026-10-24): OPEN — Foundations turn 3.

## INC-866 — the identity route answers the model's free-text answer, unbounded, to the client (2026-10-24; Tier A; §7 "model answer unparsed"; registered before the fix)

Defect: src/routes/api/listings/identity.ts :207 answers `{field:"alias", reason:"aliasImitatesBrand", detail: answer.of.trim()}` — the model's free-text answer, unbounded, to the client. Evidence: read at `ee0cdc56` by the wave census and confirmed by the supervisor's grep. Fix: Foundations turn 3 D1 — `detail` bounded (`.slice(0, 200)`, the same bound photo evidence already carries, upload/photo.ts :441); the AI gateway (INC-861) later parses the answer against a schema. Class: a model answer shown without a schema (G54 b: an enum code, a bounded string or allowlisted bytes); mechanism: the AI gateway (NONE YET; register row for AI calls). Status (2026-10-24): OPEN — Foundations turn 3 D1.

## INC-867 — post\_.\$listingId.tsx imports posting-service.ts statically for beforeLoad, so posting-service has sat on the first paint (2026-10-24; Tier B performance, found by the guard — CI on `eefd1141`, run 40084153912)

Defect: src/routes/post\_.\$listingId.tsx :4 imports `readDraft, mayResumePosting` from posting-service.ts statically for `beforeLoad` (:30-:35); the route's critical module is in routeTree's static closure, so posting-service.ts (1,415 lines; imports reader-failure.ts :1, the Supabase client, door-queue, visible-when) has sat on the first paint since the route was written — the 306 KiB ceiling absorbed it; reader-failure, a shared chunk since turn 33's split, surfaced it by name. Evidence: run 40084153912 (completed 10:17:39Z) — "reader-failure-Cnr5tLrW.js must stay lazy (INC-864) but sits in the first-paint closure of index-DK3l1Tks.js". Census of the class at `eefd1141` (every route module whose beforeLoad/loader/validateSearch/loaderDeps uses a static @/features or @/server import): post\_.\$listingId.tsx (the instance); legal.accept.tsx :3-:4 (legal-reader, use-legal-gate — already first-paint through the root gate); post.tsx :3 (post-prefill → the category-tree store, first paint by design); legal.publishing.tsx (fixed turn 2); no other. Fix: turn 3 A1(b) — the on-demand import in beforeLoad; MUST_STAY_LAZY gains "posting-service"; BC-5 gains the name; the measured first-paint value after the fix recorded, the ceiling lowered at the records turn (G5: measured supersedes). Class (INC-864's): a loader's reader imported statically; mechanism: the bundle-closure guard (MUST_STAY_LAZY) — register row for the first paint. Status (2026-10-24): OPEN — Foundations turn 3 A1(b).

## INC-868 — the draft route's schema refuses a create call that omits `listingId` (2026-10-24; Tier A; found by CI, not shipped — main not promoted)

Defect: the draft route's schema refuses a create call that omits `listingId`: the test helpers create a draft WITHOUT a `listingId` key, and the brief's schema made it required (`listingId: z.string().nullable()` — present-or-null). Evidence: CI run 40087352763 on `3db3fd46` (11:07Z): FAILURE — 129 gating E2E failures, ONE cause; every failure carries `{"field":"listingId","reason":"badShape","detail":"invalid_type"}` from the draft route (234 occurrences; photo-pipeline 126, posting-routes 34, posting-routes-catalog 34, posting-routes-dials 32, post-wizard-category 4). Fix: `listingId: z.string().nullable().optional()`; the census of the seven schemas for any other required key that a caller may omit (identity, alias, assist, photos.\$id, share, view — read each caller set); class rule for briefs: a schema's required keys are derived from EVERY caller found by grep of the path string (src/\*\* and e2e/\*\*), not from the app client alone. Class: a schema written from one client's call site (use-draft.ts bodyFor) instead of from every caller (the e2e helpers, any API caller) — the route's accepted shape narrowed; mechanism: defineRoute's schemas (register row 13). Status (2026-10-24): OPEN — held for the running turn's end (G32), the first item of the next ruling.

## INC-869 — upstream() converted only `AbortError` to UpstreamTimeout; `AbortSignal.timeout()` rejects with a `TimeoutError` (2026-10-24; registered and fixed in the same landing — Foundations turn 3)

Defect: src/server/upstream.ts (turn 2) converted only `AbortError` to UpstreamTimeout, but `AbortSignal.timeout()` rejects with a `TimeoutError` DOMException — a deadline would have surfaced as a generic throw (500), not the labelled 503; UPS-2's stub threw AbortError, so the unit test proved the wrong thing. Evidence: AST-4 drove it (the executor, turn 3). Fix: upstream() treats `TimeoutError` as a timeout (a departure accepted in the turn-4 message). Class: a test fixture authored instead of captured from real tool output (Knowledge I1); mechanism: upstream() (register row 13). Status (2026-10-24): FIXED by the executor in Foundations turn 3 (`9aaf7db3`).

## INC-870 — the platform lost Foundations turn 6 (2026-10-24 14:28Z)

Defect: Lovable's turn 6 (finished 13:57Z, report: 16 files, all checks green) produced no edit and no commit. Evidence: list_edits newest = `7ba93fc3` (13:32Z); get_diff on the turn → "Message has no associated edit"; the executor's read-only check at 14:21Z: tree clean, HEAD `7ba93fc3`, all 16 files absent; the executor cites a Lovable platform incident earlier in the day (status.lovable.dev). Fix: turn 6 re-sent whole at 14:28Z; the brief is unchanged (sha e5c74495…); four pre-rulings from the lost report: charset and Vary on 304 accepted; cold 304 accepted; LOC-1 hash computed, not guessed; generic defineRoute\<…\> recognition deferred to turn 7. Cost: one lost turn (ESTIMATE ~35 min, plus credits). Class: concern "a turn's work reaches the repository". Mechanism: the supervisor's turn-end check, NOW STANDING: after agentFinished, list_edits must show a new edit (or get_diff on the message must resolve) before the report is trusted; a finished turn without an edit is answered with a read-only presence check, then a redo. Earlier relatives: the stranded side-branch turns (INC-359/373/376). Status (2026-10-24 14:28Z): OPEN — turn 6 re-sent whole (the redo).

## INC-871 — a request the client abandoned is logged as `[ssr-error] … HTTPError: The operation was aborted.` and answered with the 500 error page (2026-10-24; Tier B — the server's error census)

Defect: a request the client abandoned is logged as `[ssr-error] … HTTPError: The operation was aborted.` and answered with the 500 error page. Seen in turn 7's and turn 8's local runs on /api/media/photo-links, /api/feed and /api/listings/view (×7). Evidence: the executor's server logs; src/server.ts :25/:52-:74/:87-:98 log every swallowed or thrown error the same way. It pollutes DEC-083's \[ssr-error\] census. Fix: turn 9 Part B (ABT-1…3) — src/server.ts keyed on request.signal.aborted. Class: concern "a request whose client left"; mechanism: NONE YET → src/server.ts keyed on request.signal.aborted. Status (2026-10-24): OPEN — Foundations turn 9.

## INC-872 — i18n-coverage "the admin shell renders no English fallback": the page's declared language runs ahead of its text (2026-10-24 17:20Z; Tier B — i18n, accessibility; registered under the flake ledger rule ≥3 lines in 7 days)

Defect: i18n-coverage.spec.ts "the admin shell renders no English fallback" has five flaky lines (10-18, 10-22, 10-23 ×2, 10-24 on run 40107677718), four of them within 7 days. Evidence: the flaky bodies on ci-evidence (e2e-last-failure.md history) list the WHOLE chrome in English: admin.landing.title "Admin" (26×), panel.myListings, impersonation.profileTitle, nav.home, navSection.marketplace, shell.searchPlaceholder, footer.\* … while the test had already seen `<html lang="am">` (:237). So the page says it is Amharic while its text is English for a moment: the provider sets document lang/dir from `language` (provider.tsx :609-:613) before that language's messages are applied (the compiled/admin loads :575-:603 are async). Hypothesis (G3), not yet read through to the render: the `lang` attribute runs ahead of the rendered text. Fix: owed — its census and fix as turn 10's first part; the test must keep its assertion (G38: no loosening). Class: concern "the page's declared language equals the language its text is in" (WCAG 2.2 SC 3.1.1 — a screen reader voices English text with an Amharic voice during the gap); mechanism: NONE YET → the provider's single "applied language" state drives lang/dir; a test-visible ready signal follows from it. Status (2026-10-24): OPEN.

## INC-873 — the four import routes read, buffer and parse the request body before authorization (2026-10-24 20:05Z; Tier A — staff file doors; found by the INC-860 census)

Defect: the four import routes read, buffer and JSON-parse the request body after only a header-form check (gate.ts :799-:805). The caller is verified afterwards (gate.ts :862) and the family's permission only inside the door's RPC, so the parse, the digest and the meter slot run before authorization. A deactivated account gets 401, not 403. Translations' registry permission (`manage`) differs from its write door's (`update`). No service-role write precedes the authority (refresh helpers only after the caller-scoped RPC succeeded). Evidence: the INC-860 census (/home/claude/b22/f11/study-inc860.md, 462 lines; its line numbers for attributes/locations/translations imports and the attributes/locations exports were wrong — every anchor re-located by grep at `126fbb4c` before the brief, G16). Fix: authorizeImport (interim, turn 11) → defineRoute auth staff (turns 12–13). Public repo (G51): the brief words it as a build instruction; the detail lands in the records only after the fix is live. Class: concern "a staff file door authorizes before processing" (OWASP ASVS V4/V13); mechanism: authorizeImport (interim, turn 11) → defineRoute auth staff (turns 12–13). Also from the census, owed to turns 12–13: F3 raw Postgres message/detail passed to clients at 500 by all four relays (INC-447 class); F5 the in-memory import meter outside the dial registry; F7 check-import-gate.sh misses the location and undo writers; the client download and bearer copies (K2); translations' `refusals` dropped by its client. Status (2026-10-24): OPEN — Foundations turn 11.

## INC-874 — the import audit RPC checks `translations:manage` for the translations family while the registry and the write door use `translations:update` (2026-10-24 ~20:45Z; found in turn 11's report, departure 6)

Defect: the import audit RPC checks `translations:manage` for the translations family while the registry and the write door use `translations:update` (an operator holding update but not manage gets a refused audit after a successful import). Evidence: turn 11's report, departure 6; registry.ts :373-:374. Fix: turn 13 migration, applied on ethio-staging by the supervisor under DEC-246. Class: the staff file doors' permission — one permission per family, registry.ts; the audit function disagrees with the registry (the audit door is a second source). Status (2026-10-24): OPEN — turn 13.

## INC-875 — browser calls to server routes hand-build the session token header, the answer parse and download anchors in ~30 fetch sites (2026-10-24 ~21:58Z; registered from turn 12's K2)

Defect: browser calls to server routes read the session token, build the Authorization header, parse the answer and build download anchors by hand in ~30 fetch sites (11 hand-built bearers). Evidence: turn 12 K2 (client hand-built bearer headers — count-view.ts:31/:50, attributes-page.tsx:220, categories-page.tsx:294, category-images-service.ts:64, countries-page.tsx:110, locations-page.tsx:164, import-dialog.tsx:130, translations-service.ts:446/:510); grep of `258db949`. Fix: src/lib/route-client.ts (turn 13 Part D), guard RCG-1…3. Class: browser → route calls; mechanism NONE YET → src/lib/route-client.ts. Status (2026-10-24): OPEN.

## INC-876 — the AI gateway: every model call through aiCall (2026-10-25; guard debt; defined only in the numbering line of the 00:14Z entry)

Defect: not in the record as a Defect/Evidence entry — the record's only definition is the numbering line of 2026-10-25 00:14Z: "INC-876 = the AI gateway: every model call through aiCall". Fix: the AI gateway turns (turn 15 part 1, turn 16 part 2, turns 17–19). Class: not in the record; mechanism: aiCall (src/server/ai/gateway.ts, per the record's later lines). Status (2026-10-25): OPEN.

## INC-877 — not defined in the record (first named 2026-10-25 00:14Z)

Referenced only: the numbering line of 2026-10-25 00:14Z names INC-877 as the next free number; turn 16's final (`40c2687e`, 03:12Z) reads "vendor-seams allowlist 71 (61 Supabase, 8 Lovable, INC-877)". No Defect, Evidence or Class text for INC-877 is in the record (by its use, the vendor-seams allowlist's expiry marker under DEC-250 — stated here as the reference only).

## INC-878 — admin_update_profile changes profiles.home_country_code without user_directory and without the 30-day rule (2026-10-25 01:50Z; found by the residency code census)

Defect: admin_update_profile (migration 20261004011235_18556a32 :1007) updates profiles.home_country_code without updating user_directory and without the 30-day rule — the directory and the profile can disagree. Evidence: code census §3 (/home/claude/studies/residency/code-census.md). Fix: with the residency work (DEC-251). Class: the home-country record — one writer (change_home_country) — a second writer bypasses it. Status (2026-10-25): OPEN.

## INC-879 — the stand-in cut-out base64 moved into src/server/ai/tasks.ts was retyped (2026-10-25 04:15Z; executor slip, G43 class: exact bytes retyped)

Defect: the stand-in cut-out base64 moved into src/server/ai/tasks.ts was RETYPED — 1,340 chars vs 1,352 (line 11 lost "EcCDgQyYGAA5"); decodes to 1,004 bytes with failing PNG CRCs. Still present at `75f9954c`. Evidence: run 40158209070 on interim `9c9f54b7`: FAILURE — PP-30 (both projects; the background preview never drew) plus interim unit/i18n reds; ROOT CAUSE read by the supervisor in the clone. Fix: turn 18 A2 — copy by script from `40c2687e` background.ts:64-81; BGR-13 pins decoded sha256 ad185c1a…ea7c (1,013 B, 400x300, CRCs valid); AIG-35 pins the category fixture f394b3e5…761d (8,884 B, 1024x1024) for its move in turn 18. Class rule: a moved binary fixture is copied by script and pinned by decoded sha256. Class: exact bytes retyped (G43); mechanism: the scripted copy + the decoded-sha256 pin. Status (2026-10-25): OPEN — turn 17 disposition DRIFT, reconciled in turn 18 A2.

## INC-880 — unit tests reaching aiCall depend on the process env's provider key/stand-in flags (2026-10-25 04:38Z; found by CI run 40160443757)

Defect: unit tests reaching aiCall depend on the process env's provider key/stand-in flags. Evidence: CI run 40160443757 on `75f9954c`: Component tests PPOL-19 (expected held, got providerUnavailable): green in the sandbox, red in CI → likely a test that depends on the runner's environment (no GEMINI_API_KEY in CI; key-first order). Fix: census owed in turn 18; the test sets every variable it relies on (vi.stubEnv); guard AIG-36 (gateway.test.ts clears provider keys in beforeEach). Class: a unit test reads the runner's environment; mechanism: the test sets every variable it relies on (vi.stubEnv); guard AIG-36. Status (2026-10-25): OPEN — turn 18.

## INC-881 — scripts/conformance/executor-hooks.test.ts fails in Lovable's sandbox, whose git shim refuses stateful subcommands (2026-10-25 09:22Z; found at the executor-kit install)

Defect: scripts/conformance/executor-hooks.test.ts fails in Lovable's sandbox, whose git shim refuses stateful subcommands (add, commit, push) in every repository, including the test's scratch repos under /tmp; the executor re-ran it with PATH="/bin:\$PATH" and 18 passed. Evidence: Lovable's report of 2026-10-25 (beforeAll failure, then 18/18 with /bin/git). Fix: owed in the next brief that touches the kit — the test resolves the git it runs (or skips its git-dependent groups with a named reason under LOVABLE_SANDBOX); guard: the test itself. CI and Claude Code sessions are unaffected (no shim). Class: a test depends on the runner's environment (INC-880's sibling: the runner's git rather than its env vars); mechanism: the test resolves the git it runs. Status (2026-10-25): OPEN.

## INC-882 — the kit's permission list contradicts the protocol (2026-10-25 09:45Z; found by the first Claude Code smoke session)

Defect: the kit's permission list contradicts the protocol: `Bash(git switch dev*)` and `Bash(git merge *)` in deny refuse Part A's `git switch dev` and `git merge --ff-only origin/dev` (deny outranks allow); the Bash guard refuses `git switch dev 2>&1`; `2>/dev/null` counts as a write outside scope; the stop gate refuses an empty turn off dev. Evidence: the smoke session's words (session on branch claude/wizardly-goldberg-6tnkdy; STOP at Part A1, nothing committed, HEAD `37f691b4`; the stop gate refused three times; cost \$2 of the \$250 credit). Fix and guard: kit v1.1 — denies narrowed; guard regexes accept descriptor redirections; /dev/null etc. not writes; stop gate passes off dev with nothing of the turn; NEW EXH-16 runs every protocol command through the permission rules (Claude Code's pattern semantics, deny first) and the guard, and the forbidden list through the rules — proven RED on the v1 settings.json ("git switch dev → part "git switch dev" is DENIED by Bash(git switch dev\*)") and green on v1.1. Class: two layers that judge the same command disagree with the protocol (concern: every required command allowed by every layer; mechanism: row 37). Status (2026-10-25): OPEN — kit v1.1.

## INC-883 — a cloud session's clone can carry a stale local dev, so the session follows old kit files on disk (2026-10-25 10:16Z; found by the second smoke session)

Defect: a cloud session's clone can carry a stale local dev (here the commit dev had when the first session ran — an environment snapshot); `git switch dev` then checks out old kit files, and the session's permission rules and hooks follow the files on disk, so an old defect (INC-882) returns mid-session. Evidence: the second smoke's stop report (hold/executor-kit-install:docs/governance/reports/executor-smoke.stop-1.md; d3577dd, parked on hold/executor-kit-install — a branch that is NOT the session's own claude/… branch). Fix owed in kit v1.2 (mechanism, not instruction — the operator's directive): session-setup.ts runs `git fetch origin dev:dev` (fast-forward only, refused when local dev has its own commits) before the executor's first step, with an EXH test (a planted stale local dev is brought level; a local dev with its own commits is left and named); 00-executor-protocol.md Part A gains the step; the Bash guard refuses forced refspecs (`git fetch origin +dev:dev` passes v1.1). Interim (smoke only): the smoke brief's A1 runs `git fetch origin dev:dev` on the session branch before `git switch dev`. Turn 19 waits for v1.2. Class: the executor's local state diverges from origin before the turn starts (concern: the executor starts every turn on origin/dev's rules; mechanism: row 37's session setup). Status (2026-10-25): OPEN — kit v1.2.

## INC-884 — session-setup.ts installs only the Chromium headless shell while the harness's browser guard requires the full Chromium, and reports "installed" without re-checking (2026-10-25 10:35Z+; found by the third smoke session)

Defect: session-setup.ts installs only the Chromium headless shell (`--only-shell`) while the harness's browser guard (scripts/e2e-browser-guard.ts) requires `chromium.executablePath()` — the full Chromium for the pinned Playwright (chromium-1208) — and then reports "installed" without re-checking the guard's path (phantom success, F4 — the supervisor's own hook). Evidence: the third smoke's D2 ("\[e2e:browser-guard\] no usable browser at the resolved path: /opt/pw-browsers/chromium-1208/chrome-linux64/chrome" — /opt/pw-browsers holds chromium, chromium-1243, chromium_headless_shell-1208, chromium_headless_shell-1243) and SETUP line. Fix owed in kit v1.2: install `chromium` as CI does (full + shell), re-probe the guard's resolution after the install, and report the probe's result, never the installer's exit code. Class: a setup step's claim not proven by the check its consumer runs (concern: the session can run browser tests; mechanism: session-setup). Status (2026-10-25): OPEN — kit v1.2.

## INC-885 — translate.ts's flag read-back ignores an admin_list_translations error, so a failed read reports `flagged: 0` as success (2026-10-25 12:36Z; from turn 19 v2's report)

Defect: translate.ts's flag read-back ignores an admin_list_translations error, so a failed read reports `flagged: 0` as success (F4 phantom success; today's code, kept by turn 19's behaviour contract). Evidence: turn 19 v2 report §6 and §10 14(g). Fix: its own tracked item (a later Foundations turn). Class: a reader's door error silently defaulted (concern: no phantom success; mechanism: ReaderError / readFailure). Status (2026-10-25): OPEN.

## INC-886 — answer.ts has no worded refusal for 422/502/503, so three routes answer refusals as `ok({ error }, { status })` (2026-10-25 12:36Z; from turn 19 v2's report)

Defect: answer.ts has no worded refusal for 422/502/503, so translate.ts, suggest-icon.ts and generate-image.ts answer refusals as `ok({ error }, { status })`. Evidence: turn 19 v2 report §10 14(b). Fix: extend answer.ts, move the three. Class: one envelope (concern: route answers; mechanism: src/server/answer.ts clientError/serverError). Status (2026-10-25): OPEN.

## INC-887 — aiCall's audit input hash covers the task's rendered text only, so a field-less task hashes the same empty text on every call (2026-10-25 12:36Z; from turn 19 v2's report)

Defect: aiCall's audit input hash covers the task's rendered text only; a field-less task (translation) hashes the same empty text on every call, so the audit row cannot tell inputs apart. Evidence: turn 19 v2 report §12. Fix: hash the material for tasks without fields. Class: the audited AI call (mechanism: src/server/ai/gateway.ts + audit.ts). Status (2026-10-25): OPEN.

## INC-888 — deadline detection is copied locally in four places (2026-10-25 12:36Z; from turn 19 v2's report)

Defect: deadline detection is copied locally (gemini.ts :96/:210, photoroom.ts :73, google-translate.ts isDeadline, upstream.ts :37) — four copies of one concern. Evidence: turn 19 v2 report §10 14(a). Fix: a later gateway item. Class: one mechanism per concern (mechanism: src/server/upstream.ts — export its deadline classification). Status (2026-10-25): OPEN.

## INC-889 — the kit's Bash guard scheduling rule matches the word "at" after any whitespace (2026-10-25 12:52Z; from turn 19's report §10 item 12)

Defect: the kit's Bash guard scheduling rule (.claude/hooks/bash-guard.ts :164, ``(^|[\s;&|(\`])(crontab|at|systemctl|service|launchctl)\b``) matches the word "at" after any whitespace, so a heredoc or grep containing "at" is refused; in turn 19 two legitimate commands were refused and the executor made STEP 0's roadmap edits by scratchpad scripts instead of the editing tool. Evidence: turn 19 v2 report §10 item 12. Fix owed in kit v1.3 with EXH cases (`grep -n "look at" f` and a heredoc with "at" allowed; `at now + 1 minute`, `echo x | at now`, `crontab -e` refused) — via Lovable (the executor cannot edit .claude/\*\*). Class: a guard rule matching text instead of command position (concern: the Bash guard's command rules; mechanism: lib.ts commandSegments — judge each segment's first word). Status (2026-10-25): OPEN.

## INC-890 — EXH-17 exceeds vitest's default per-test timeout in Lovable's slower sandbox (2026-10-25 13:3xZ; found in turn 20)

Defect: scripts/conformance/executor-hooks.test.ts EXH-17 exceeds vitest's default per-test timeout in Lovable's slower sandbox (it creates two scratch clones with a pre-receive hook and runs land.ts twice); it passed in CI (component-tests SUCCESS on `454b5849`) and in the supervisor's scratch (≈1.1 s). Evidence: turn 20's unit run — 1,791 passed / 2 failed (SFN-3; EXH-17 timeout) / 1 skipped. Fix owed in kit v1.3 (via Lovable — .claude/\*\* and the kit test are the kit's): explicit per-test timeouts on the git-heavy EXH tests. Class: a test's runtime budget depends on its runner (INC-880/881's family); mechanism: not in the record beyond the explicit per-test timeouts. Status (2026-10-25): OPEN.

## INC-891 — the route-boundary ESLint block replaces the src-wide no-restricted-syntax options for every non-ignored route and server file (2026-10-25 13:4xZ; found at turn 20's verification)

Defect: the route-boundary ESLint block (eslint.config.js :99–:138, Foundations turn 2, DEC-237) sets `no-restricted-syntax` for src/routes/\*\* and src/server/\*\*; flat config REPLACES a rule's options per file, so the src-wide block's INC-815 selector (`instanceof Error`, :70) and DEC-025's typed-client selector stop applying to every non-ignored route and server file. Evidence: turn 20 moved the six route files into the block and \_\_root.tsx:185's INC-815 disable became "unused" (lint warning 41; Lovable read it as "after the fetch move" — the cause is the replacement); `instanceof Error` census in src/routes + src/server (tests excluded) = 2 lines, both carrying disables (\_\_root.tsx:186, answer.ts:139 — answer.ts is in the boundary ignores) → no live bypass today, the guard hole open since 2026-10-24. Fix owed: next Foundations turn. Class: a lint concern's selectors restated per block by hand (the INC-815 block at :78 already restates DEC-025's) — concern "lint rule composition"; mechanism NONE YET (one exported selector list per concern, each block composes the lists it owes) + a conformance test that every file class gets every selector it owes (ESLint's calculateConfigForFile). Status (2026-10-25): OPEN.

## INC-892 — upstream() writes `console.error` on every call, success included (2026-10-25 13:4xZ; observability/performance)

Defect (observability/performance): upstream() (src/server/upstream.ts:32) writes `console.error("[upstream] <label> <status> <ms>")` on EVERY call, success included; since turn 20 the root's language read runs through it, so every server-rendered document now emits one error-level line (`[upstream] ssr language gate 200 …` — seen in the turn's smoke logs). Fix owed with INC-891: success at info level (or only when slow/non-2xx); errors and timeouts stay console.error; UPS test pins it. Class: the one outside-call helper's log level — success lines at error level (turn 2's design; per-API-call before, per-document now); mechanism: src/server/upstream.ts. Status (2026-10-25): OPEN.

## INC-893 — unhandled abort stacks with `status 500` followed by `[client-aborted]` in Lovable's smoke run (2026-10-25 13:4xZ; observation, cause unread)

Defect: Lovable's smoke run (smoke-auth-i18n, passing) shows unhandled abort stacks with `status 500` followed by `[client-aborted]` on /api/categories/tree, /api/i18n/en, /api/feed and the root's /\_serverFn/… request at sign-out navigation; ABT-1/RT-20 say an abandoned handler logs only `[client-aborted]` and answers 499. Three of the four paths predate turn 20 → likely pre-existing (the framework's own abort log before the wrapper). Fix owed: a read-only reproduction against `454b5849` vs `88bfbc1b` in the next turn, then a disposition. Class: not in the record at registration. Status (2026-10-25): OPEN — observation.

## INC-894 — /auth/callback reads `window.location.search` inside a useState initializer, so every server render throws (2026-10-25 15:0xZ; found by the executor's K2 in turn 22's E2E)

Defect: src/routes/auth\_.callback.tsx :48-:50 reads `window.location.search` inside a useState initializer, so every SERVER render of /auth/callback throws "ReferenceError: window is not defined" — logged by TanStack's stream renderer as "Error in renderToReadableStream: …" (node_modules/@tanstack/react-router/dist/esm/ssr/renderRouterToStream.js :14-:16), which carries no `[ssr-error]` tag, so the DEC-083 server-error census never counted it (the page recovers on the client; PW-182 passes). Fix: turn 23 Part C — the callback reads the return path through the router (`useLocation({ select: l => l.searchStr })`); error-capture.ts tags a stream render error `[ssr-error] render` so the census counts every page that fails to server-render (ECAP-1). INC-893's downgrade rides the same part (ECAP-2/3). Class: (a) a browser global read during render — census of useState/useMemo/useRef initializers reading window/document/storage/navigator: this one site (grep at `7633438d`); (b) the framework's render errors bypass the census; mechanism: the router's location reader + error-capture.ts's render tag. Status (2026-10-25): OPEN — turn 23 Part C.

## INC-895 — the ad page downloads the posting doors for two pure shapers (2026-10-25 16:12; named among the "numbers to register in S1")

Defect: the ad page downloads the posting doors for two pure shapers. Evidence: the speed S1 prototype (/tmp/ethio-s1 at `7633438d`) — "pure schema shapers out of posting-service (ad page)". Fix: Speed S1 (Foundations turn 24). Class: not in the record; concern: what the browser loads before paint (by the S1 entry's context); mechanism: not in the record. Status (2026-10-25): registered with S1 (the record: "Numbers to register in S1").

## INC-896 — the category glyph map on every page's first download (2026-10-25 16:12; named among the "numbers to register in S1")

Defect: the category glyph map on every page's first download. Evidence: the speed S1 prototype — "loadOnce mechanism (glyphs, calendar, leaflet, phone parser)". Fix: Speed S1 (Foundations turn 24). Class: not in the record; mechanism: loadOnce (by the S1 prototype's text). Status (2026-10-25): registered with S1.

## INC-897 — on-demand imports outside loadOnce: a failed React.lazy chunk reaches the route's error boundary; leaflet.ts kept a failed download as a rejection for the visit (2026-10-25 16:12; named among the "numbers to register in S1")

Defect: on-demand imports outside loadOnce: a failed React.lazy chunk reaches the route's error boundary; leaflet.ts kept a failed download as a rejection for the visit. Evidence: the speed S1 prototype's on-demand-import census (OD-1…3, "INC-897 for the React.lazy siblings"). Fix: not stated at registration beyond that census line — the React.lazy siblings are INC-897's. Class: not in the record as a line; mechanism: loadOnce (the S1 prototype). Status (2026-10-25): OPEN.

## INC-898 — bare `abort@[native code]` stacks from the server's h3/rou3/srvx bundle during sign-out (2026-10-25 16:23; planned — "register as INC-898 at the next records turn")

Defect: K2 residual (turn 23 report §9): bare `abort@[native code]` stacks from dist/server/\_libs/h3+rou3+srvx.mjs:544 during sign-out remain beside the \[aborted\] warnings. Evidence: turn 23's report §9. Fix: not in the record. Class: log noise; the INC-893 class, another emitter. Status: planned — the record's numbering line reads "INC-898 planned for the h3 abort stacks"; its registration is owed to the records turn.

## INC-899 — raw `<button>` elements bypass the Button primitive (2026-10-25 16:54; found when turn 24 stopped before STEP 0)

Defect: raw `<button>` elements bypass the Button primitive — at `a5627d66`, 136 in 37 files outside src/components/ui (78 in src/features/posting; settings.tsx 16, auth.tsx 12, step-photos.tsx 10), no conformance guard. Evidence: `git grep -c "<button" origin/dev -- 'src/*.tsx' ':!src/components/ui/*' ':!*.test.tsx'`. Fix: the form kit (G54 c) moves them and lands a Button census guard; a field trigger styled as an input (date-field.tsx :80) or a tab trigger may be an allowlist line with its reason. Class: concern "an interactive control renders through the Button primitive"; mechanism: src/components/ui/button.tsx. Status (2026-10-25): OPEN.

## INC-900 — stored category pictures are PNG with a one-hour cache (2026-10-25 18:02; found by the speed baseline)

Defect: stored category pictures are PNG with a one-hour cache — on production 171 card objects averaging 127.5 KiB (storage.objects, cacheControl max-age=3600; buckets have no mime restriction), the baseline's ad-page LCP element being one of them. Evidence: the baseline (ad LCP 6008 ms — a category picture PNG, card-\*.png); turn 23's headers (card-\*.png 138,389 B `private, no-cache`, cf-cache-status DYNAMIC). Fix: turn 25 makes new ones WebP, cached a year; re-encoding the stored ones needs a staff re-cut action (new strings) or regeneration — Tesfaye's choice. Class: concern "a category picture a buyer downloads is small and kept by the phone"; mechanism: makeVariants + generateCategoryImage. Status (2026-10-25): OPEN.

Numbering: next free INC-901 — INC-901 … INC-937 are registered in the supervisor's running record (2026-10-24 → 2026-10-27) and land in records turn R2 with the later word and the watch list.
NEW-END
EDIT docs/features/e2e-harness.md #1
OLD-BEGIN
A test that refuses a chunk's download waits for the app's one reload for a failed chunk (src/lib/stale-chunk.ts, INC-640) and for the page it lands on before it types — the reload drops what was typed (`refuseScripts` and `openAfterTheOneReload`, e2e/helpers/on-demand.ts: SBE-4, SBE-5, ODE-1). Only a page's first failed download may reload it (turn 34b-1, INC-922), so a later failure on that page is answered on screen.
OLD-END
NEW-BEGIN
A test that refuses a chunk's download waits for the app's one reload for a failed chunk (src/lib/stale-chunk.ts, INC-640) and for the page it lands on before it types — the reload drops what was typed (`refuseScripts` and `openAfterTheOneReload`, e2e/helpers/on-demand.ts: SBE-4, SBE-5, ODE-1). Only a page's first failed download may reload it (turn 34b-1, INC-922), so a later failure on that page is answered on screen.

A route handler that fetches or reads the real answer goes through `whilePageLives` (e2e/helpers/route-guard.ts, INC-934): a request whose page has gone (a reload, a navigation, the test's end) ends there; every other error fails the test. CF-RG-1 (scripts/conformance/route-guard.test.ts) names a fetching handler outside it.
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 57 | A test's interception ends with its page: a route handler that fetches the real answer can outlive the page it serves (the app's one reload for a failed chunk, a navigation, the test's end), and Playwright then throws inside the handler — a test failed in its helper, not on the product (INC-934) | `e2e/helpers/route-guard.ts` — `whilePageLives(handler)` (a closed page or a disposed response ends the request; every other error throws) and `pageWentAway(error)` | `scripts/conformance/route-guard.test.ts` (CF-RG-1: every e2e `page.route` handler that calls its route's `fetch()` goes through whilePageLives, or its file's allowlist line holds it at its count; CF-RG-2: planted); RG-1/2 (`src/test/e2e-route-guard.test.ts`); ODE-1 | `scripts/conformance/route-guard-allowlist.txt` — e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2), e2e/post-wizard-specs.spec.ts (1), until INC-934: each moves when its file is next run whole (G37) | a new interception that reads the real answer wraps its handler once | the on-demand helper (refuseScripts) since turn 34d; Foundations turn 34d |

OLD-END
NEW-BEGIN
| 57 | A test's interception ends with its page: a route handler that fetches the real answer can outlive the page it serves (the app's one reload for a failed chunk, a navigation, the test's end), and Playwright then throws inside the handler — a test failed in its helper, not on the product (INC-934) | `e2e/helpers/route-guard.ts` — `whilePageLives(handler)` (a closed page or a disposed response ends the request; every other error throws) and `pageWentAway(error)` | `scripts/conformance/route-guard.test.ts` (CF-RG-1: every e2e `page.route` handler that calls its route's `fetch()` goes through whilePageLives, or its file's allowlist line holds it at its count; CF-RG-2: planted); RG-1/2 (`src/test/e2e-route-guard.test.ts`); ODE-1 | `scripts/conformance/route-guard-allowlist.txt` — e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2), e2e/post-wizard-specs.spec.ts (1), until INC-934: each moves when its file is next run whole (G37) | a new interception that reads the real answer wraps its handler once | the on-demand helper (refuseScripts) since turn 34d; Foundations turn 34d |
| 58 | A brief's exact text reaches the tree exactly: every new or rewritten file a brief carries (a FILE block) and every change (an EDIT block — its OLD text found exactly once, its NEW text) is applied by one script in the order written, never retyped by the executor; one refusal writes nothing (INC-907's class) | `scripts/brief/apply-blocks.ts` — `parseBlocks(brief)`, `applyBlocks(blocks, io, only)`; run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`; the scope is the kit's own `scopeVerdict` (.claude/hooks/lib.ts) | `scripts/brief/apply-blocks.test.ts` (BA-1…5: blocks in order, a block inside a FILE block is that file's text, a run-on block refused; a FILE then EDITs on its text; a refusal — an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope — writes nothing; the command line and `--dry`; the wrapper and the scope) | none | both executors (Claude Code and Lovable: a committed script, so neither retypes a block nor writes an inline program); a new block kind is one more pattern | Foundations records turn R1 (2026-10-27): its first use applied that turn's own test file and the incident ledger's import; every brief from R1 on names it in HOW TO WORK |

NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34d (2026-10-26; INC-934) — a test's interception ends with its page: e2e/helpers/route-guard.ts's `whilePageLives` ends a route handler whose page has gone (the app's one reload for a failed chunk closed it mid-fetch — ODE-1's "Target page, context or browser has been closed" and "Response has been disposed") and throws every other error; the on-demand helper's script refusal goes through it. CF-RG-1/2 name every e2e handler that fetches the real answer outside it — three spec files held at their counts until each is next run whole; RG-1/2 pin the helper. And K2's report: the non-null census counts a definite-assignment assertion (a `let` or a class field marked `!` before its type) as the same mark — 13 in three files, their allowlist counts raised to match (e2e/post-wizard-bundle2.spec.ts joins at 2); CF-NN-2 plants one.
OLD-END
NEW-BEGIN
- Foundations turn 34d (2026-10-26; INC-934) — a test's interception ends with its page: e2e/helpers/route-guard.ts's `whilePageLives` ends a route handler whose page has gone (the app's one reload for a failed chunk closed it mid-fetch — ODE-1's "Target page, context or browser has been closed" and "Response has been disposed") and throws every other error; the on-demand helper's script refusal goes through it. CF-RG-1/2 name every e2e handler that fetches the real answer outside it — three spec files held at their counts until each is next run whole; RG-1/2 pin the helper. And K2's report: the non-null census counts a definite-assignment assertion (a `let` or a class field marked `!` before its type) as the same mark — 13 in three files, their allowlist counts raised to match (e2e/post-wizard-bundle2.spec.ts joins at 2); CF-NN-2 plants one.

- Foundations records turn R1 (2026-10-27; G41; register row 58) — a brief's exact text reaches the tree exactly: scripts/brief/apply-blocks.ts (run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`) applies a brief's FILE and EDIT blocks in the order written — an OLD text found exactly once, a path inside the repository and the brief's scope (the kit's `scopeVerdict`), one refusal writes nothing — so neither executor retypes a block (BA-1…5). Applied by it, the incident ledger catches up with the supervisor's running record: INC-847 … INC-900 (the Foundations bundle's first half, registered 2026-10-24 → 2026-10-25) imported word for word into docs/tracking/incidental-findings.md; INC-901 … INC-937, the later word and the watch list follow in records turn R2. The E2E harness doc names the route guard (turn 34d).
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930 waits on Tesfaye's choice (a question in the tracker): an offline sign-out from a page whose marketplace code never downloaded either stays on that page, signed out, until the connection returns, or the marketplace's code is fetched for a signed-in visitor ahead of time (its size measured before the choice). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
OLD-END
NEW-BEGIN
  - [ ] Turn 34c-4 — the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2): sized by the tests the helper change reaches (the sign-in helpers reach most specs — G37), so the helper first, its callers after. INC-930 waits on Tesfaye's choice (a question in the tracker): an offline sign-out from a page whose marketplace code never downloaded either stays on that page, signed out, until the connection returns, or the marketplace's code is fetched for a signed-in visitor ahead of time (its size measured before the choice). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell. With it, turn 34d's reviewer's points on the route guard (e2e/helpers/route-guard.ts): it ends a request quietly only when the page is in fact closed (a disposed response on a live page is the test's own failure); it reads the error's text through errorText (INC-937); CF-RG-1 accepts `whilePageLives` by name only (a planted other wrapper is named) and its log line counts handlers, not files.
  - [ ] INC-937 — a caught error's text is read through `errorText` (src/lib/error-text.ts; rule 10 F4) in e2e/ and scripts/ as in src/: the census (src/lib/error-text.test.ts :113) reads the three folders, and the 40 hand reads (30 in 13 e2e files, 10 in 6 scripts files; the route guard's in turn 34c-4) move onto it, each left one an allowlist line with its reason and expiry.
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Turn 34d (docs/governance/briefs/foundations-turn-34d.md; no migration; Lovable) — INC-934: a test's interception ends with its page — e2e/helpers/route-guard.ts `whilePageLives` (a handler whose page has gone ends; every other error throws), the on-demand helper's script refusal through it (ODE-1's flake); CF-RG-1/2 hold e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2) and e2e/post-wizard-specs.spec.ts (1) at their counts until each is next run whole; RG-1/2.
OLD-END
NEW-BEGIN
  - [x] Turn 34d (docs/governance/briefs/foundations-turn-34d.md; no migration; the Claude Code executor) — INC-934: a test's interception ends with its page — e2e/helpers/route-guard.ts `whilePageLives` (a handler whose page has gone ends; every other error throws), the on-demand helper's script refusal through it (ODE-1's flake); CF-RG-1/2 hold e2e/shell.spec.ts (2), e2e/post-wizard-bundle2.spec.ts (2) and e2e/post-wizard-specs.spec.ts (1) at their counts until each is next run whole; RG-1/2. Final HEAD e9ee79f7; CI run 40436029815: SUCCESS; unit 326 files / 1996 tests; ODE-1 2 passed. Its reviewer's seven MINORs: 1 kept (a test's fake route); 2–5 to turn 34c-4; 6 the harness doc's line (records turn R1); 7 this line's executor, corrected in R1.
  - [ ] Records turn R1 (docs/governance/briefs/foundations-records-r1.md; no migration; the Claude Code executor; G41) — the block applier: scripts/brief/apply-blocks.ts, run as `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]` (register row 58: a brief's FILE and EDIT blocks applied by one script in the order written, never retyped; one refusal writes nothing; BA-1…5); and, applied by it, the incident ledger's first half of the Foundations bundle, INC-847 … INC-900, word for word from the supervisor's running record. INC-901 … INC-937, the later word and the watch list follow in records turn R2, then the decision ledger's block S77, system-state.md's position and the slips.
NEW-END
C2. `grep -c '^## INC-' docs/tracking/incidental-findings.md` — BASE's count (723) plus 54, 777; `grep -n '^## INC-847 \|^## INC-900 \|^Numbering: next free INC-901' docs/tracking/incidental-findings.md | cut -c1-60` — three lines, in that order; paste both. Commit Part C.

THE CHECKS (in this order; `bun .claude/hooks/land.ts` runs them again before it pushes): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-records-r1.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src e2e supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals); `bun run i18n:usage` (no change to either map); `bun run build`; `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
0a8bc5dff7c33c63692bb82c4141941de1359166233590d91151b177057bfcae  docs/_changelog.md
b314cd0e8837b90d240f738af8ffc31d62fe9a592cff4b8f2d456c4f5dd8206a  docs/features/e2e-harness.md
16f4e3a214739e78f0bbe93b4b383213b3c9c99d1ca787bd27e106d4eb902d38  docs/governance/mechanisms.md
80459052d0c657a161d21e8fd52214499019fb29e2d57a398b7a98f421f4023f  docs/tracking/incidental-findings.md
74f98398e7c1d7d51610de54865257e7e22bc494b21049aacc3a90ca9aeef8ed  scripts/brief/apply-blocks.sh
4ed7bda661119d601101329dbf46942f16524f6a627fafefbfaf5519c2fdc83e  scripts/brief/apply-blocks.test.ts
93d1d9188484bad119a6624ef2ebc2edbf01715a012556ab84493d909a4dfeaa  scripts/brief/apply-blocks.ts

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last code commit, in the FOREGROUND, and the turn waits for its answer (00-executor-protocol.md step 7; if the platform starts it in the background, wait for its answer and say so in the report); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR is fixed inside SCOPE when this brief's text allows it, otherwise listed under Departures for a ruling. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-records-r1.report.md, with the twelve headings of .claude/rules/60-report.md, each kept short: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract (3); the applier's consumers re-located at <START> (4); BA-1…5 and the unit totals (5); the K2 lines (6); BA and wired lines (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12); the reviewer's last line. Commit it (`records turn R1: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): the applier is its own script under scripts/brief/ run through a bash wrapper (the kit allows `bash scripts/*` and refuses inline programs), and its scope is the kit's own scopeVerdict, so it can write nothing the editing tools could not; it lands inside a records turn because its first use is that turn's import; the import is split across two records turns so each carrying message stays small; each entry is written as it stood at its registration and what became of it is the later word (R2); the text is written as the pinned Prettier formats it.

BLOCK 1 — scripts/brief/apply-blocks.ts:
FILE-BEGIN scripts/brief/apply-blocks.ts
/**
 * Register row 58 (Foundations records turn R1, 2026-10-27; INC-907's class) — A BRIEF'S EXACT TEXT
 * REACHES THE TREE EXACTLY. A brief carries every new or rewritten file as a FILE block and every change
 * as an EDIT block (its OLD text, found exactly once in the file, and its NEW text). The executor applies
 * them with this one script, never by retyping them:
 *
 *   bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]
 *
 * — every block of the brief in the order it is written, or only the blocks of the paths named. Every
 * block is checked before anything is written: a path outside the repository or outside the brief's
 * scope (the kit's own `scopeVerdict`), an OLD text found zero times or more than once, a brief with no
 * block for a named path. One refusal writes nothing. Each block prints one line; `--dry` writes nothing.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { PROJECT_DIR, scopeVerdict } from "../../.claude/hooks/lib";
import { errorText } from "../../src/lib/error-text";

export type Block =
  | { kind: "file"; path: string; text: string }
  | { kind: "edit"; path: string; n: number; old: string; next: string };

/** The answer of a scope check: the kit's `Verdict` shape. */
export type Allow = (path: string) => { ok: true } | { ok: false; reason: string };

export type Io = {
  read: (path: string) => string | null;
  write: (path: string, text: string) => void;
  allow: Allow;
};

export class ApplyRefused extends Error {}

const BLOCK_RX =
  /^FILE-BEGIN (\S+)\n([\s\S]*?)\nFILE-END \1$|^EDIT (\S+) #(\d+)\nOLD-BEGIN\n([\s\S]*?)\nOLD-END\nNEW-BEGIN\n([\s\S]*?)\nNEW-END$/gm;

const MARKER_RX =
  /^(OLD-BEGIN|OLD-END|NEW-BEGIN|NEW-END|FILE-BEGIN \S+|FILE-END \S+|EDIT \S+ #\d+)$/m;

/** Every FILE and EDIT block of a brief, in the order written (a block inside a FILE block is that file's text). */
export function parseBlocks(brief: string): Block[] {
  const blocks: Block[] = [];
  for (const m of brief.matchAll(BLOCK_RX)) {
    const [, filePath, fileText, editPath, n, old, next] = m;
    if (filePath !== undefined && fileText !== undefined) {
      blocks.push({ kind: "file", path: filePath, text: `${fileText}\n` });
    } else if (
      editPath !== undefined &&
      n !== undefined &&
      old !== undefined &&
      next !== undefined
    ) {
      // A marker line inside an EDIT's text means a block ran into the next one (an empty NEW is one blank line).
      if (MARKER_RX.test(old) || MARKER_RX.test(next)) {
        throw new ApplyRefused(
          `EDIT ${editPath} #${n}: malformed — a block marker inside its OLD or NEW text`,
        );
      }
      blocks.push({ kind: "edit", path: editPath, n: Number(n), old, next });
    }
  }
  return blocks;
}

function occurrences(text: string, part: string): number {
  if (part === "") return 0;
  let count = 0;
  for (let at = text.indexOf(part); at !== -1; at = text.indexOf(part, at + 1)) count += 1;
  return count;
}

function label(block: Block): string {
  return block.kind === "file" ? `FILE ${block.path}` : `EDIT ${block.path} #${String(block.n)}`;
}

/**
 * Applies the blocks (all, or those of `only`) in order. Nothing is written unless every block applies:
 * the files' new texts are built in memory first. Returns one line per block.
 */
export function applyBlocks(blocks: Block[], io: Io, only: string[] = []): string[] {
  for (const path of only) {
    if (!blocks.some((b) => b.path === path))
      throw new ApplyRefused(`the brief has no block for ${path}`);
  }
  const chosen = only.length === 0 ? blocks : blocks.filter((b) => only.includes(b.path));
  if (chosen.length === 0) throw new ApplyRefused("the brief has no FILE or EDIT block");
  const texts = new Map<string, string>();
  const lines: string[] = [];
  for (const block of chosen) {
    const { path } = block;
    if (path.startsWith("/") || path.split("/").includes("..")) {
      throw new ApplyRefused(`${label(block)}: the path is not inside the repository`);
    }
    const verdict = io.allow(path);
    if (!verdict.ok) throw new ApplyRefused(`${label(block)}: ${verdict.reason}`);
    if (block.kind === "file") {
      texts.set(path, block.text);
      lines.push(`${label(block)} (${String(Buffer.byteLength(block.text))} bytes)`);
      continue;
    }
    const current = texts.has(path) ? texts.get(path) : io.read(path);
    if (current === undefined || current === null) {
      throw new ApplyRefused(`${label(block)}: the file does not exist`);
    }
    const found = occurrences(current, block.old);
    if (found !== 1) {
      throw new ApplyRefused(
        `${label(block)}: its OLD text is found ${String(found)} times in the file (exactly once is required)`,
      );
    }
    const at = current.indexOf(block.old);
    texts.set(path, current.slice(0, at) + block.next + current.slice(at + block.old.length));
    lines.push(label(block));
  }
  for (const [path, text] of texts) io.write(path, text);
  lines.push(`applied ${String(chosen.length)} block(s) to ${String(texts.size)} file(s)`);
  return lines;
}

/** The command line: the saved brief, then `--dry` and the paths to apply (none: every block). */
export function main(argv: string[], root = PROJECT_DIR, allow: Allow = scopeVerdict): number {
  const [briefPath, ...rest] = argv;
  if (briefPath === undefined) {
    process.stderr.write(
      "usage: bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]\n",
    );
    return 2;
  }
  const dry = rest.includes("--dry");
  const only = rest.filter((a) => a !== "--dry");
  const io: Io = {
    read: (path) => {
      const abs = join(root, path);
      return existsSync(abs) ? readFileSync(abs, "utf8") : null;
    },
    write: (path, text) => {
      if (dry) return;
      const abs = join(root, path);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, text);
    },
    allow,
  };
  try {
    const brief = readFileSync(join(root, briefPath), "utf8");
    const lines = applyBlocks(parseBlocks(brief), io, only);
    process.stdout.write(`${lines.join("\n")}${dry ? "\n(dry run: nothing written)" : ""}\n`);
    return 0;
  } catch (error) {
    if (error instanceof ApplyRefused) {
      process.stderr.write(`APPLY REFUSED (nothing written): ${errorText(error)}\n`);
      return 1;
    }
    throw error;
  }
}

if (import.meta.main) process.exit(main(process.argv.slice(2)));
FILE-END scripts/brief/apply-blocks.ts

BLOCK 2 — scripts/brief/apply-blocks.sh:
FILE-BEGIN scripts/brief/apply-blocks.sh
#!/usr/bin/env bash
# Register row 58: a brief's FILE and EDIT blocks reach the tree exactly, applied by scripts/brief/apply-blocks.ts
# (never retyped). Usage: bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]
set -euo pipefail
exec bun "$(dirname "$0")/apply-blocks.ts" "$@"
FILE-END scripts/brief/apply-blocks.sh

BLOCK 3 — scripts/brief/apply-blocks.test.ts:
FILE-BEGIN scripts/brief/apply-blocks.test.ts
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { errorText } from "../../src/lib/error-text";
import { applyBlocks, ApplyRefused, main, parseBlocks, type Allow, type Io } from "./apply-blocks";

/**
 * Register row 58 (Foundations records turn R1) — a brief's FILE and EDIT blocks reach the tree exactly,
 * through scripts/brief/apply-blocks.sh (apply-blocks.ts): in order, all or none. The planted briefs are
 * built line by line, so this file holds no block of its own.
 */
const HERE = dirname(fileURLToPath(import.meta.url));
const fileBlock = (path: string, ...body: string[]) => [
  `FILE-BEGIN ${path}`,
  ...body,
  `FILE-END ${path}`,
];
const editBlock = (path: string, n: number, old: string[], next: string[]) => [
  `EDIT ${path} #${String(n)}`,
  "OLD-BEGIN",
  ...old,
  "OLD-END",
  "NEW-BEGIN",
  ...(next.length === 0 ? [""] : next),
  "NEW-END",
];
const brief = (...blocks: string[][]) =>
  ["# a brief", "", "```text", "prose", ...blocks.flatMap((b) => [...b, ""]), "```", ""].join("\n");

const everywhere: Allow = () => ({ ok: true });
type Memory = Io & { files: Map<string, string>; writes: () => number };
function memory(files: Record<string, string>, allow: Allow = everywhere): Memory {
  const state = new Map(Object.entries(files));
  let writes = 0;
  return {
    files: state,
    writes: () => writes,
    read: (path) => state.get(path) ?? null,
    write: (path, text) => {
      writes += 1;
      state.set(path, text);
    },
    allow,
  };
}

describe("the block applier (register row 58)", () => {
  it("BA-1 reads FILE and EDIT blocks in the order written; a block inside a FILE block is that file's text; a block that runs into the next is refused", () => {
    const inner = editBlock("b.txt", 1, ["x"], ["y"]);
    const blocks = parseBlocks(
      brief(
        fileBlock("a.txt", "one", "two"),
        editBlock("a.txt", 1, ["two"], []),
        fileBlock("c.md", ...inner),
      ),
    );
    expect(blocks).toEqual([
      { kind: "file", path: "a.txt", text: "one\ntwo\n" },
      { kind: "edit", path: "a.txt", n: 1, old: "two", next: "" },
      { kind: "file", path: "c.md", text: `${inner.join("\n")}\n` },
    ]);
    const runOn = ["EDIT a.txt #1", "OLD-BEGIN", "two", "OLD-END", "NEW-BEGIN", "NEW-END"];
    expect(() => parseBlocks(brief(runOn, editBlock("a.txt", 2, ["x"], ["y"])))).toThrow(
      "EDIT a.txt #1: malformed — a block marker inside its OLD or NEW text",
    );
  });

  it("BA-2 applies every block in order — a FILE, then EDITs on the text it left — or only the paths named", () => {
    const blocks = parseBlocks(
      brief(
        fileBlock("new.ts", "export const a = 1;", "export const b = 2;"),
        editBlock("new.ts", 1, ["export const b = 2;"], ["export const b = 3;"]),
        editBlock("old.md", 1, ["alpha"], ["alpha", "beta"]),
        editBlock("old.md", 2, ["beta"], ["gamma"]),
      ),
    );
    const io = memory({ "old.md": "# t\nalpha\nend\n" });
    expect(applyBlocks(blocks, io)).toEqual([
      "FILE new.ts (40 bytes)",
      "EDIT new.ts #1",
      "EDIT old.md #1",
      "EDIT old.md #2",
      "applied 4 block(s) to 2 file(s)",
    ]);
    expect(Object.fromEntries(io.files)).toEqual({
      "old.md": "# t\nalpha\ngamma\nend\n",
      "new.ts": "export const a = 1;\nexport const b = 3;\n",
    });
    const some = memory({ "old.md": "# t\nalpha\nend\n" });
    applyBlocks(blocks, some, ["old.md"]);
    expect(Object.fromEntries(some.files)).toEqual({ "old.md": "# t\nalpha\ngamma\nend\n" });
  });

  it("BA-3 one refusal writes nothing: an OLD text found 0 or 2 times, a missing file, a path outside the repository or the scope, a named path with no block", () => {
    const refuses = (
      b: string,
      files: Record<string, string>,
      only: string[] = [],
      allow: Allow = everywhere,
    ) => {
      const io = memory(files, allow);
      let message = "";
      try {
        applyBlocks(parseBlocks(b), io, only);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplyRefused);
        message = errorText(error);
      }
      expect(io.writes()).toBe(0);
      expect(Object.fromEntries(io.files)).toEqual(files);
      return message;
    };
    const first = fileBlock("ok.txt", "fine");
    expect(refuses(brief(first, editBlock("a.md", 1, ["gone"], ["x"])), { "a.md": "here\n" })).toBe(
      "EDIT a.md #1: its OLD text is found 0 times in the file (exactly once is required)",
    );
    expect(
      refuses(brief(first, editBlock("a.md", 1, ["twice"], ["x"])), { "a.md": "twice twice\n" }),
    ).toBe("EDIT a.md #1: its OLD text is found 2 times in the file (exactly once is required)");
    expect(refuses(brief(first, editBlock("none.md", 1, ["a"], ["b"])), {})).toBe(
      "EDIT none.md #1: the file does not exist",
    );
    expect(refuses(brief(first, fileBlock("../out.txt", "x")), {})).toBe(
      "FILE ../out.txt: the path is not inside the repository",
    );
    expect(refuses(brief(fileBlock("/etc/x", "x")), {})).toBe(
      "FILE /etc/x: the path is not inside the repository",
    );
    const outOfScope: Allow = (path) =>
      path === "ok.txt"
        ? { ok: true }
        : { ok: false, reason: `${path} is outside the brief's SCOPE` };
    expect(refuses(brief(first, fileBlock("src/x.ts", "x")), {}, [], outOfScope)).toBe(
      "FILE src/x.ts: src/x.ts is outside the brief's SCOPE",
    );
    expect(refuses(brief(first), {}, ["other.txt"])).toBe("the brief has no block for other.txt");
    expect(refuses("# no blocks\n", {})).toBe("the brief has no FILE or EDIT block");
  });

  it("BA-4 the command line writes the tree, writes nothing on --dry or a refusal, and asks for a brief", () => {
    const root = mkdtempSync(join(tmpdir(), "apply-blocks-"));
    mkdirSync(join(root, "docs"), { recursive: true });
    writeFileSync(join(root, "docs/a.md"), "start\n");
    writeFileSync(
      join(root, "b.md"),
      brief(
        fileBlock("docs/sub/new.md", "made"),
        editBlock("docs/a.md", 1, ["start"], ["changed"]),
      ),
    );
    expect(main(["b.md", "--dry"], root, everywhere)).toBe(0);
    expect(existsSync(join(root, "docs/sub/new.md"))).toBe(false);
    expect(readFileSync(join(root, "docs/a.md"), "utf8")).toBe("start\n");
    expect(main(["b.md"], root, everywhere)).toBe(0);
    expect(readFileSync(join(root, "docs/sub/new.md"), "utf8")).toBe("made\n");
    expect(readFileSync(join(root, "docs/a.md"), "utf8")).toBe("changed\n");
    writeFileSync(
      join(root, "c.md"),
      brief(fileBlock("docs/c.md", "c"), editBlock("docs/a.md", 1, ["start"], ["x"])),
    );
    expect(main(["c.md"], root, everywhere)).toBe(1);
    expect(existsSync(join(root, "docs/c.md"))).toBe(false);
    expect(main([], root, everywhere)).toBe(2);
  });

  it("BA-5 the wrapper runs apply-blocks.ts with its arguments, and the command line's scope is the kit's scopeVerdict", () => {
    const wrapper = readFileSync(join(HERE, "apply-blocks.sh"), "utf8");
    expect(wrapper).toContain('exec bun "$(dirname "$0")/apply-blocks.ts" "$@"');
    expect(wrapper).toContain("set -euo pipefail");
    const source = readFileSync(join(HERE, "apply-blocks.ts"), "utf8");
    expect(source).toContain(
      'import { PROJECT_DIR, scopeVerdict } from "../../.claude/hooks/lib";',
    );
    expect(source).toContain("allow: Allow = scopeVerdict");
  });
});
FILE-END scripts/brief/apply-blocks.test.ts
```
