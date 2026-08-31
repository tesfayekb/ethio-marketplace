# ethio.com Rebuild — Master Specification Ledger
Version: v0.23 · Updated: 2026-07-29 · Status: Phase 0 EXECUTING — prompt A CLEAN; awaiting doc upload; prompt B next

## How this document works
Two-pass process:
- **Pass 1 (current):** all sections discussed directionally; decisions (DEC) and requirements (REQ) captured; open questions logged. Every item starts at detail level **SUPERFICIAL**.
- **Pass 2:** each feature returns for a detail round — screen flows, data fields, edge cases, error states, acceptance criteria. Status moves **SUPERFICIAL → DETAILED → APPROVED**.
- **Nothing is built until its spec is APPROVED.** No execution prompts to Lovable/Cursor before then.

Ledger rules (from governance model): entries are never renumbered or deleted; changes are amendments with date; every open question is tracked to an answer, nothing evaporates.

---

## Section roadmap and status

| # | Section | Pass 1 | Pass 2 |
|---|---------|--------|--------|
| 1 | Vision, scope & model | DONE | — |
| 2 | Users, roles & moderation philosophy | DONE | — |
| 3 | Target countries, legal & data residency | DONE (deferred items tracked) | — |
| 4 | Architecture & stack | DONE (rendering arch deferred to census) | — |
| 5 | Data residency & partitioning design | DONE | — |
| 6 | Internationalization (deep-dive) | DONE | — |
| 7 | Identity & auth | DONE | — |
| 8 | Listings | DONE | — |
| 9 | Discovery (search, feed, widening) | DONE | — |
| 10 | Buyer↔seller contact | DONE | — |
| 11 | Trust & safety / AI screening | DONE | — |
| 12 | Performance & lightweight delivery | DONE | — |
| 13 | Security architecture | DONE | — |
| 14 | Notifications | DONE | — |
| 15 | Admin console & ops | DONE | — |
| 16 | Migration & launch | DONE | — |
| 17 | Governance doc v0.2 + phase ladder | DONE → ethio-governance-v0.2.md | — |

---

## Decisions (DEC)

### DEC-001 — v1 scope and monetization
v1 is a **free classifieds marketplace**: post → browse → contact seller directly. No payments, cart, checkout, escrow, or payouts in v1. Schema designed so paid features (promotion, coverage-based pricing) attach later as **separate records**, never as flags mutated on core tables.
Detail: SUPERFICIAL

### DEC-002 — Launch audience
Diaspora (US/Europe) and in-country Ethiopia served **simultaneously from day one**. Consequences: performance budgets set for the weakest link (low-end Android, expensive data, 3G); data-residency question must be answered before stack selection (Section 3 precedes Section 4).
Detail: SUPERFICIAL

### DEC-003 — Fate of current ethio.com
**Greenfield rebuild on the ethio.com domain.** No code or data migration from WordPress/WooCommerce (~30 users, ~30 stale posts — not worth a migration path).
Preserved value: domain + search standing (~500K visits / 4 yrs ≈ 10K/mo).
Pre-shutdown operator tasks: (a) export existing user list (name, email) to CSV; (b) capture top-traffic URLs from Google Search Console; (c) do NOT delete the WordPress site until both are captured.
At launch: 301 redirects from meaningful old URLs; personal invite email to exported users ("your account is waiting").
Detail: SUPERFICIAL

### DEC-004 — Stack (confirmed)
- **App form: PWA** (installable web app; no store download; hundreds of KB not tens of MB; native wrappers possible later if store presence proves necessary). Push-notification limits on iOS handled in Section 14.
- **Backend: Supabase** (Postgres + RLS + auth + storage + edge functions). Chosen for: RLS-first governance fit; operational simplicity for a one-person operation; both executors fluent (Lovable native integration); **open-source and self-hostable** → same stack runs the Ethiopia partition on in-country VMs (REQ-013).
- **Frontend: React + Tailwind, mobile-first as a hard rule** — 360px is the primary design width; desktop is the adaptation; enforced in every UI review.
- **Frontend rendering architecture (SSR vs client-rendered) and Lovable/Cursor division of labor: DEFERRED to the Executor Capability Census** (see census doc v1.0; selection rule pre-committed; result will be DEC-005). Options: A = Cursor-led SSR; B = Lovable-led with SEO mitigation; C = split (Lovable app surfaces / Cursor public+Tier A).
- Operator prior on record: Lovable favorable on preview speed, output cleanliness, branch hygiene; untested on SEO/RLS/i18n/scope — census probes these.

---


## Requirements (REQ)

### REQ-001 — Zero-touch operations (AI screening replaces superadmin review)
Signup and posting are fully automated. AI screens posts, reviews, comments at creation time; superadmin pre-approval is eliminated; the operator is not in the daily loop. Centerpiece of Sections 2 and 11.
Detail: SUPERFICIAL

### REQ-002 — Structural internationalization
- No user-visible string ever lives in code; translation keys only; English is one language among equals.
- **CI guard from Phase 0:** hardcoded-string scan fails the build.
- Per-language lazy loading: user downloads only their language's strings.
- First-visit language selection up front (not buried in settings); preference persisted on device and account.
- Ge'ez script (Amharic/Tigrinya) font support on low-end Android; font subsetting with a numeric weight budget.
- Per-page language signaling for SEO (rank for searches in Amharic, Tigrinya, etc.).
- **AMENDED (operator, S10): languages are DATA, not code — no hardcoded language list.** Admin **translation dashboard**: add language as a row; all keys listed against English source; one-button AI-translate-all; per-string edit + review status; coverage meter; **a language becomes publicly selectable only at complete coverage** (never ship half-translated).
- Rollout: **English → Amharic founding pair** (Amharic = the stress test: Ge'ez, fonts, string-length layout breaks); further languages are dashboard operations, not releases.
- **RTL-readiness built into foundations day one regardless of when an RTL language is enabled** (retrofit is a full-site rework; Sudan/Middle-East door stays cheap).
- **Translation-system security (operator directive):** translated strings render as DATA never code (escaped; no HTML inside translations — one poisoned string would be stored-XSS across an entire language's users); dashboard = Tier A admin surface (step-up auth per REQ-016, every edit audit-logged who/when/what); AI-translation pipeline passes the REQ-021 gateway.
- Native-speaker spot-review before a language flips public: RECOMMENDED gate, owner = operator (Q-004b).
Detail: SUPERFICIAL

### REQ-003 — Performance as a launch-gating feature
Numeric budgets (app weight, load time on 3G, low-end Android device class) set in Section 12 and **enforced in CI** — a build exceeding budget fails like a failing test.
Detail: SUPERFICIAL

### REQ-004 — User-content translation
Listings/reviews/comments display in authored language with **on-demand machine translation** to viewer's preferred language:
- One-tap "Translate", clearly labeled as automatic translation.
- Original text always authoritative and preserved (trust: a mistranslation never silently replaces the seller's words).
- Translations cached after first request (translate once per language, not per viewer).
- Rationale vs translate-on-post: quality varies by language (good for EN/FR/AR/SW; weaker for Tigrinya/Afaan Oromo); on-demand avoids ~8× cost for unread translations.
- Future option (architecture supports): auto-show translation for proven language pairs, original one tap away.
Detail: SUPERFICIAL

### REQ-005 — Geo-scoped marketplace (amended)
- **Detection:** IP-based first guess only; always visible ("Showing listings near X — change?"), always user-correctable, persisted per account. Wrong guess (VPN, etc.) costs one tap once. IP location is NEVER used for security/trust decisions (separate mechanisms, Section 13). No GPS permission at launch.
- **Geography data:** curated tree (country → region/state → city) for active markets only — not the world's gazetteer. Each entry carries center-point coordinates (needed for maps; enables nearest-first sorting). Adding a city is an **admin-console action, never a code change**. Posting flow includes a "my city isn't listed" path so a missing entry never blocks a post.
- **Feed widening:** auto-widen concentrically city → region → country → worldwide until sufficient results; each tier honestly labeled ("No cars in Dallas — showing all of Texas"); nearest-first ordering within tiers (sort by distance from viewer's city center). Thresholds tuned in Section 9.
- **Seller coverage:** default = seller's chosen city; extendable to multiple cities / country / worldwide (e.g., Ethiopian Airlines advertising globally). All free in v1. Coverage stored as its own structured record per listing → future coverage-based pricing attaches with zero rework.
Detail: SUPERFICIAL

### REQ-006 — Single account type, progressive seller profile
- One account type for everyone. No separate seller registration, application, or questionnaire — a separate seller system discourages posting.
- Seller profile is collected **progressively inside the first posting flow**: a few extra questions at post time. On later posts, previously filled info is shown for confirm-or-edit, then straight to posting.
- Seller selects **field of business** (business category) — powers future tailoring of posting flows and features per business type.
- The sofa-seller in Dallas and the money-transfer service both use the same account type; differentiation comes from business category + (future) verification levels, not account classes.
Detail: SUPERFICIAL

### REQ-007 — Gating model (signup wall)
- Browsing, search, and listing pages fully open (SEO, casual discovery). No account needed to look.
- Seller contact gated behind a free account: BOTH phone-number reveal AND in-app messaging. In-app messaging is the preferred contact channel.
- Any contribution requires sign-in: posting, reviews, comments.
- Consequence: every contact and contribution traces to a screened identity → reputation/abuse patterns are attributable (feeds Section 11).
- Future note (not v1): if in-app purchasing arrives, buyers and sellers all require sign-in; architecture should not fight this.
Detail: SUPERFICIAL

### REQ-008 — Seller storefronts
- Every seller gets a public shareable page at **ethio.com/@handle** (decided: `@` pattern — collision-proof vs app routes, familiar).
- Storefront shows seller branding + all their listings; listings ALSO remain in normal category feeds (dual placement).
- v1 customization deliberately modest: logo, cover image, description, business category, contact. Not a page builder. Every customization surface is a moderation surface — logos/covers AI-screened like listing photos.
- Storefronts are SEO pages; printable/shareable URLs for diaspora businesses.
- Impersonation defense (three layers, details Section 11 Pass 2):
  1. Deterministic similarity check at handle registration — blocks/reviews near-matches (one letter off, character swaps, lookalike chars like 0/o, rn/m) against a seeded reserved-names list (major brands, banks, airlines, gov bodies) and verified-business handles.
  2. AI impersonation screening of the storefront as a whole (handle + logo + description + category: "is this presenting as a known brand?") at creation and on branding edits.
  3. Verified-business path: real businesses prove identity (official-domain email, documents, callback via public contacts) → verified badge; verified handles feed layer 1's protected list; reclaim policy lets the verified owner take over a squatted handle.
Detail: SUPERFICIAL

### REQ-009 — Two-track enforcement
**Track 1 — severe violations → immediate freeze.** Attempted posts in severe categories (sexual content, prohibited goods/services, scam patterns, illegal content — exact list defined in Section 11 Pass 2) never publish AND freeze the account on the spot (no posting, no messaging) pending admin review. Admin decides granular outcome: remove posts; account restored / allowed as buyer but barred as vendor / banned / purged. Attempted severe posts retained privately as evidence. Design asymmetry: innocent users never wait for a human; suspicious actors always do (fail-safe freeze).
**Track 2 — ordinary violations → graduated ladder:** warn → demote (listings rank lower) → restrict (browse only, no post/message, time-boxed) → ban → delete/purge.
Supporting rules: every enforcement action logged (who/what/why, including AI-as-actor) for reversibility and appeals; ban-evasion resistance designed from day one (device/phone/behavior signals to recognize returning banned actors — Sections 11/13); jurisdictional record-keeping nuance on deletion handled in Section 3.
Detail: SUPERFICIAL

### REQ-010 — Content-integrity screening
Screening = appropriateness + coherence, text and images together:
- Image appropriate at all (no sexual/violent/prohibited imagery).
- Image ↔ category consistency (a phone under Cars = junk or worse).
- Image ↔ text consistency.
- Account-level pattern screening: mass posting of unrelated items across categories (spam signature), velocity anomalies.
This is the integrity backbone replacing superadmin review; full design in Section 11.
Detail: SUPERFICIAL

### REQ-011 — Resolver model: automation decides, human audits
- Automation resolves everything in real time; no post or user action ever blocks on a human (exception: Track 1 freezes, which fail safe by design).
- Automation's judgment calls (uncertain-published posts, borderline allows) are queued for **asynchronous admin audit** — reviewed whenever, no SLA, full reversal power (remove post, act on user per REQ-009).
- Admin reversals double as feedback for tightening the screening rules.
- Scope boundary: the audit queue holds automation's uncertain calls only — NOT all posts (auditing everything recreates the approval treadmill). Clear-pass posts reach admin only via community reports.
Detail: SUPERFICIAL

### REQ-012 — Data-residency architecture: seams day one, walls on trigger
Operator's model, confirmed and researched: centralizing all data in any one country is off the table (global user base); the requirement is the ABILITY to carve out any country's data and localize it on demand.
1. **Partition-by-home-country is a day-one schema discipline** — every user/listing/message/review carries a home-country partition key; no cross-country entanglement that can't be cleanly cut; CI-enforced like other guards.
2. **Ethiopia is the first wall and likely a launch-time obligation, not a future one.** Research finding (2026-07): Personal Data Protection Proclamation No. 1321/2024 (in force 24 Jul 2024) mandates in-country storage of personal data collected locally; ECA may designate critical data as Ethiopia-only processing; sensitive-data export needs prior ECA approval; ECA registration regime; extraterritorial reach to foreign controllers using equipment/representatives in Ethiopia. Applies to IN-COUNTRY users only — diaspora users are outside it. Exact minimum compliant shape (full in-country primary vs in-country copy + consented processing) = licensed Ethiopian counsel question (Q-014). Enforcement is young; posture is comply-by-design, verify-by-counsel before launch.
3. **All other countries: seams ready, walls on trigger**, each preceded by its own legal check (Kenya, South Africa, Uganda, Sudan, Somalia, etc. deferred until approached).
4. **GDPR-grade user rights for ALL users** (export, deletion, consent, breach notification) — legally required for EU/UK/German/Scandinavian users; future-proofs other jurisdictions.
5. Personal data partitions strictly; PUBLIC catalog (listing content) may be cached/served globally via CDN — diaspora browsing Addis listings never waits on a round-trip to Ethiopia. Exact personal/public line drawn in Section 5 with legal texts in hand.
Target market list (operator): USA, Canada, UK, Germany, Scandinavia, Australia; Ethiopia + all surrounding countries; Kenya, South Africa, Uganda, others in Africa.
Detail: SUPERFICIAL

### REQ-013 — Stack portability (the Ethiopia-wall constraint)
The stack must run a full country partition on GENERIC infrastructure — plain VMs/Kubernetes, Postgres-class DB, S3-compatible object storage — because that is what exists in-country. Research finding (2026-07): Ethiopia has certified in-country infrastructure today — Wingu.Africa (Tier III, Ethio ICT Park, ~800 racks/10MW, operating since Aug 2022, carrier-neutral, Internet Exchange, offers VMs/Kubernetes/S3-compatible cloud services), Raxio ET1 (Tier III colocation), Safaricom facilities — multiple vendors, no hostage situation. Consequence: Ethiopia partition is rentable as VMs (monthly bill, not a hardware project). No vendor-locked managed-cloud-only architecture permitted. Off-site encrypted backups for the Ethiopia partition regardless of provider tier (backup-abroad legality = part of Q-014 counsel check). Pricing quotes = future operator task, pre-launch.
Detail: SUPERFICIAL

### REQ-014 — Identity v1: three doors, zero SMS
- Sign-up/sign-in: **email+password, Continue with Google, Continue with Telegram.**
- Rationale: Google covers Android-dominant in-country users at zero cost (Play Store requires a Google account); Telegram is identity-defining for a large in-country slice and its login is free; email covers diaspora expectations and is the recovery backbone. Operator confirmed all three.
- **No SMS anywhere in v1** — zero per-user messaging cost; avoids fake-signup SMS-budget attacks.
- Phone numbers exist as seller-provided CONTACT info (displayed behind the REQ-007 wall), unverified in v1; schema carries phone + verified flag from day one so phone auth/verification bolts on later without migration. Telegram login supplies a Telegram-verified phone free → partial ban-evasion signal restored.
- Email verification MANDATORY before an email+password account can post or be linked (takeover prevention + free anti-spam).
- Accepted, logged limitation: an email-less, non-Google, non-Telegram user can browse but not post in v1; revisit with revenue.
- Telegram auth is CUSTOM code (not a built-in Supabase provider) → Tier A: supervisor-dictated verification logic (server-side signature check against bot token, login-timestamp freshness window vs replay), deny-case tested, census-selected executor only.
Detail: SUPERFICIAL

### REQ-015 — Account linking & multi-door security (hardened after operator security challenge)
1. **Auto-link ONLY on verified↔verified email match.** Google-asserted email may auto-link to an email account only if that account's email was verified. Match against an UNVERIFIED email account never merges silently — require password proof or fresh verification (defeats pre-registration account takeover).
2. **Link/unlink of any sign-in method requires fresh re-auth of an existing method; every link/unlink notifies all account channels; the last remaining method can never be removed.** (Defeats shared-phone silent Telegram-linking takeover.)
3. **No automatic merge of two populated accounts in v1.** Prevent duplicates at the front door ("account with this email exists — sign in with Google"); manual credential linking allowed under rule 2; full content merge deferred to admin-assisted later version.
4. Telegram door duties: cryptographic signature verification server-side; replay window; recognized fragility of phone-anchored identity (SIM swap/recycling) → Telegram-only accounts get the strongest add-a-second-door nudge.
5. **Enforcement follows the human, with graded signals:** phone-number match = strong cross-account linking signal; device-only match routes to the admin audit queue (REQ-011) for a human call — never auto-ban on device alone (shared/family phones would create false positives).
Detail: SUPERFICIAL

### REQ-016 — Recovery & sessions
- Per-door recovery is native (email reset link; Google recovers Google; Telegram recovers Telegram).
- **All-doors-lost: no automated recovery in v1.** Admin-assisted recovery ONLY for verified-business storefronts (pre-registered evidence makes it provable, and those are the theft-worthy accounts); ordinary accounts start fresh. Rationale: support-channel recovery is the most exploited social-engineering surface, and a one-person admin op is its preferred prey.
- Persistent dismissible nudge for single-door accounts to add a second door; strongest for Telegram-only.
- **Sessions: rolling ~60-day** (active users never re-login; idle devices quietly expire).
- **Step-up re-auth** for control-transferring actions: method link/unlink (REQ-015), password/email change, account deletion, storefront handle change. Browsing/posting stay frictionless.
- **Sessions page in settings:** all devices listed, per-device remote sign-out, sign-out-everywhere.
- **Prominent one-tap logout** at top of account screen (shared-phone market design rule).
- **AMENDED (operator):** posting, and editing/deleting existing listings, require authentication within the last **7 days (ESTIMATE — dialable)**; older sessions get a quick re-auth, window resets. Closes shared-phone publish-as-owner gap.
- Accepted v1 exposure: a person holding a logged-in phone can browse/message as the owner (WhatsApp-equivalent risk); mitigations are the leash items above.
Detail: SUPERFICIAL

### REQ-017 — Category system (three clean concepts)
Source: full census of live ethio.com taxonomy (2026-07-19 fetch): 15 top-level categories, 3 levels, ~400+ leaves; rich authentic domain knowledge (e.g., Traditional Cloth → Netela/Gabi/Tibeb) worth preserving. Defects found: duplicate category nodes across branches (Personal Care, Hair Salons, K-12, Mortgage, Bicycles), shared-slug cross-link bugs (Electronics "Accessories" pointing into Construction Material), typos; cold-start scale mismatch (400 leaves ≈ empty pages everywhere).
Design (WooCommerce-style dynamics, without its defects):
1. **Category = what the thing is.** One canonical node per category; each listing lives in EXACTLY ONE category (v1). Categories are data rows: admin-console CRUD, never a code change; every category carries its name in all launch languages (REQ-002); per-category attribute schemas (Pass 2); per-category restriction flags feeding REQ-009/010 screening.
2. **Tree pointers = where you find it browsing.** The browse tree may show the SAME node under multiple parents (bike parts under Auto AND Bicycles) — pointers, not copies; one inventory; posting from any path lands in the same node. Split-inventory defect impossible by construction.
3. **Collections = why it's featured now.** Cross-cutting temporary groupings (e.g., "Easter") aggregate listings from many categories without moving them; admin-curated or rule-based; archivable; listings: one category, many collections. Future natural surface for seasonal/paid promotion (fits DEC-001 separate-records rule).
4. **Empty-depth collapsing:** full tree in DB; UI reveals a level only when inventory justifies it (per-location); tree unfolds as the marketplace fills.
Scope rulings (operator): **prescription pharmaceuticals EXCLUDED from v1** (seeds Q-010 banned list; only future path = licensed pharmacies as verified businesses); **Jobs & Vacancies + Tenders DEFERRED to v2** (possible offshoot surface). OTC/vitamins remain.
Seed process: operator exports WooCommerce category list from wp-admin pre-shutdown (added to DEC-003 checklist; authoritative over supervisor's scrape) → import with dedupe/repair per rules above.
Detail: SUPERFICIAL

### REQ-018 — Pricing & currency
- Price modes, poster's choice: fixed price / negotiable / contact-for-price. **AMENDED (operator): a category may disable price ENTIRELY** (field absent for that category) — per-category price applicability is part of category config.
- Currency defaults to poster's country currency; poster may override (e.g., Addis hotel rooms priced in USD for tourists).
- Viewers see conversion to their preferred currency, **marked approximate, displayed ALONGSIDE the original — never replacing it.** Seller's currency+amount is the price of record (same authority principle as REQ-004 translation). Conversion label does legal work: rates move; no buyer claim on a stale conversion.
- Pass 2 items: exchange-rate source and refresh cadence — flagged sensitive for ETB (official vs parallel divergence history; post-2024 float) — decide with eyes open.
Detail: SUPERFICIAL

### REQ-019 — Photos & default category images
- Photos NOT mandatory. Photo-less listings display an **AI-generated category illustration**: auto-generated at category creation from the admin console, uniform site-wide style, watermarked as a system image, unmistakably an illustration (never confusable with the actual item — trust guardrail).
- Max **10 photos (ESTIMATE, dialable)**; first photo = cover.
- **On-device resize+compress before upload** (~1600px max dimension, few hundred KB each): ten camera shots cost ~2–3MB of the seller's data, not 40MB (REQ-003 upload side).
- Dial kept in drawer, not decided: real-photo listings may someday rank above illustration-only ones (photos correlate with legitimacy).
Detail: SUPERFICIAL

### REQ-020 — AI-assisted posting, structured attributes, drafts
- Each category defines structured attributes (t-shirt: size/color/adult-kid/gender; car: make/model/year). **AMENDED (operator): category create/edit includes an attribute BUILDER — define attributes with types (text, number, single/multi-select with options, boolean) entirely from the admin console**; per-category schemas seeded in Pass 2.
- AI drafts title + description from category + attributes; poster may accept, edit, or write their own (own writing encouraged).
- **GROUNDED-ONLY RULE (operator's fabrication concern, codified):** AI drafting may organize/clarify ONLY facts the seller provided (category, attributes, photos, stated facts) — it may NOT add quality claims ("excellent condition", "barely used", "genuine X") the seller didn't make. Platform-authored embellishment = platform-authored deception = defect class from day one; generation prompt carries the constraint explicitly; review pass checks AI drafts against it.
- **Review priority #1 (operator): forbidden-content screening across ALL text fields** — feeds the REQ-021 gateway.
- Whatever text ships, AI reviews for readability AND category consistency — this is the coaching face of the REQ-010 screening pipeline, one pass serving both honest-seller help and mismatch detection (select-furniture-write-about-phones is caught regardless of author).
- **Drafts auto-save**; interrupted posts restore on return (network drops are normal-case in target markets, not edge-case).
- Posting floor: photo(s) optional + title + category + (price mode) + location + contact preference; description optional; ~2-minute flow, seller profile progressive per REQ-006.
Detail: SUPERFICIAL

### REQ-021 — Centralized screening & validation gateway (Tier A, highest security)
Operator directive: one centralized best-security system screens and validates EVERY user-supplied input on the platform before storage or display — listing titles, descriptions, attribute values, messages, reviews, storefront text, handles, search queries, uploaded files.
Layers inside the single choke point:
1. Structural validation (type, length, sanity).
2. Sanitization — nothing user-typed can execute in another user's browser (XSS/injection family dies here).
3. File inspection — real-format verification, malware-scan hook, strip hidden metadata (EXIF GPS removal = seller privacy protection by default).
4. Content-policy AI — REQ-010 forbidden-content + coherence checks.
Why centralized: scattered per-form checks are how fields get forgotten; attackers find the one unscreened input. One gateway = one place to harden/update + a CI guard verifying no write path bypasses it. Full design: Section 13.
Detail: SUPERFICIAL

### REQ-022 — Listing lifecycle state machine
One state machine, legal transitions enforced in one place (governance §2.5): draft → screening (REQ-010/011 verdicts: live / reduced-reach / rejected / frozen-evidence per REQ-009) → live → sold and/or expired → relistable archive → purge per retention rules (Section 5).
- **Auto-expiry:** per-category default days, admin-tunable (busy categories shorter, sparse longer); reminder notification before expiry; one-tap renew (renewal = inventory heartbeat: stale listings are the trust-killer of contact-the-seller marketplaces).
- **Poster-set expiry at post time** (e.g., Easter ad expires day after Easter); earlier of poster-set vs category default wins.
- **Sold (operator spec):** one tap; strips seller contact from the listing EVEN for logged-in viewers; post remains visible until expiry or explicit removal (sold ≠ deleted); visible sold items = social proof, stripped contact = no calls about gone items.
- Expired/sold kept in seller dashboard for one-tap relist; hidden from feeds; archived/purged per Section 5 retention.
Detail: SUPERFICIAL

### REQ-023 — Home screen & self-learning category ranking
- Home = **feed-first with category shortcut row** (operator: current site already feed-in-main; rebuild keeps shape, mobile-first): search on top, category row, location-scoped feed (REQ-005 scoping+widening) below.
- **Category row ranks per country/region and learns by itself** (operator design): rank from per-region category views + listing counts; nightly re-rank job; cold-start = listing counts. Ethiopia's row ≠ Dallas's row, automatically.
- Infrastructure consequence: **lightweight aggregate event counting from day one** (views per category/listing per region; privacy-clean) — doubles as substrate for future seller stats ("340 views this week") and future relevance ranking.
Detail: SUPERFICIAL

### REQ-024 — Promotion architecture (premium/classified) — free in v1, pay-ready by construction
Terminology: "promotion" = umbrella for premium + classified tiers; a promotion RECORD = listing + tier + time window + geographic scope.
- **Sort order everywhere (feed and inside each category): Premium → Classified → newest-first**, within the geographic tier structure.
- Promotions are **separate records, never flags on listings** (DEC-001 rule); scope rides the REQ-005 geography structure.
- **Future pricing dimension = coverage count (operator):** 1 city free; multi-city / country / worldwide = paid tiers later. v1: all free, full mechanism exercised via admin-granted promotions (untested path = broken path; ours runs for months before money touches it).
- **Duplicate-listing detection ships in v1** (operator's circumvention insight): same seller + near-same photos/title/attributes across locations = the dodge against coverage pricing; detected via REQ-010 account-pattern screening; v1 posture = merge/flag as feed-quality measure, so enforcement is battle-tested before pricing arrives.
- **Promoted items labeled from day one** ("Featured") even while free — jurisdictional disclosure rules + trust; paid launch changes nothing visible.
- **Two-layer anti-crowding:** location scoping (you see only your city's promoted) + in-city per-page cap interleaved with organic (cap value = Pass 2 dial).
- When payments arrive: original governance money machinery (provider truth, webhooks, idempotency, reconciliation) attaches to these same records.
Detail: SUPERFICIAL

### REQ-025 — Search
- Ranking inherits the REQ-005 ladder: **city → state/region → country → world**, availability-driven — one widening mechanism, two surfaces (feed + search).
- **Cross-language search (operator approved option b):** every listing indexed in all launch languages via the REQ-004 translation layer; Amharic-titled listings surface for English queries and vice versa. Pass 2: index size, quality for Tigrinya/Afaan Oromo queries.
- **Fuzzy matching is a launch requirement:** typo tolerance + transliteration tolerance (netela/netella/nitela; brands spelled by ear). Engine choice (Postgres FTS+trigram vs dedicated service) = Pass 2, constrained by REQ-013 portability.
- Filters = the category's REQ-020 structured attributes (no separate system; Pass 2 UI only).
Detail: SUPERFICIAL

### REQ-026 — Messaging
- v1 payload: **text + photos** (photos screened by REQ-021 gateway like all uploads). Voice messages = first fast-follow (Telegram-voice-note culture acknowledged; deferred for audio-moderation gap).
- **In-app messaging always on, cannot be disabled** — guaranteed reachability floor. Seller declares preferred channel (in-app only / call / SMS / email), displayed on listings.
- **Block, two levels (S10 clarification):** (1) "End conversation" — soft close, archived, no notifications, reversible; (2) "Block this person" — no messages to me at all, no phone reveal of mine, no new conversations with me; public listings remain visible (hiding them only reveals the block and pushes to a second account). A user's block never sanctions the blocked account (that's REQ-009's job) but accumulating blocks from strangers is a screening signal.
- **Reports exist on every user-facing surface** (listings, messages, storefronts, reviews) and follow the operator's pipeline: AI screening at creation is gate one; user flagging of live content is the deliberate LAST layer; a report triggers a DEEPER AI review (account history, surrounding context, similar reports) which acts per REQ-009 tracks; only unresolvable cases reach the REQ-011 admin audit queue. Scale consequence: a thousand reports/day is an AI workload, not the operator's weekend. Message text screened with scam-pattern awareness (Section 11 detail).
- **Privacy posture, stated honestly:** platform can see ONLY in-app messages — and genuinely CAN see those (not E2E-encrypted in v1; screening and abuse reports require access; privacy policy says so plainly). Off-platform calls/SMS/email invisible to us. Flip side as feature: in-app is the only channel where scam reports carry evidence → UI nudge "keep conversations on ethio.com for your protection."
Detail: SUPERFICIAL

### REQ-027 — Identity display controls & storefront states
Principle: **anonymous in public, always identified to the platform.** Public anonymity is a privacy feature; platform anonymity would be a scam feature — we build the first, never the second (REQ-007 traceability untouched behind any anonymous face).
- Seller may present anonymously to viewers: photo optional, name hidden, details minimal, contact routed per preference; may voluntarily reveal more. Verified-business badge inherently requires public identity — sellers choose their point on the anonymity↔trust spectrum.
- Buyer may operate under a chosen display name; may reveal more voluntarily.
- **Storefront closed/reopen state:** seller can shut the shop (page hidden, listings suspended) and reopen with everything intact; handle retained while closed (no squatting-by-timing). Live-listing and open-conversation behavior during closure = Pass 2 under REQ-022 state machine.
Detail: SUPERFICIAL

### REQ-028 — Trust & safety rulebook
**Banned everywhere (severe track — attempted posting freezes account per REQ-009):** weapons/ammunition · illegal drugs · prescription medicines · sexual content/services · counterfeit goods · stolen goods · government documents · currency & gift-card trading · human-related services (organs, surrogacy brokering, trafficking-adjacent) · endangered-wildlife products · hacking tools/malware · personal-data lists · **alcohol & tobacco (operator: ban, simpler than age-gating)**.
**Allowed:** live animals / breeder advertising (operator ruling).
**Restricted (allowed + extra screening):** OTC meds/supplements/cosmetics (miracle-cure claim screening) · financial services incl. money transfer (core diaspora business; highest scam-risk category; first candidate for requiring verified-business status — Q-007).
**Per-country banned lists (operator confirmed — khat model):** each country carries its own admin-maintained list; screening checks content against every country in the listing's coverage; new-country quirks = data entry, not redesign.
**User-responsibility posture (operator):** posting flow carries a ToS affirmation — poster confirms content violates nothing; poster is the responsible author; AI screening is the platform's enforcement layer on top, not a substitute. Keeps intermediary (not publisher) legal posture; ToS text = Pass 2 + lawyer review alongside Q-014.
**Appeals (Q-013 resolved):** every auto-rejection shows reason + one-shot appeal → deeper AI review (same machinery as reports); severe-track freezes appeal = the operator's REQ-009 review itself.
**Messaging scam defense:** AI watches for deposit-before-viewing, payment-redirect, urgency pressure, too-good pricing; graduated response — protective buyer banner first ("Never send money before seeing the item"), seller-account review on repeat patterns; one-time safety tip at every first conversation.
**Verification & reserved names (Q-011 directional):** launch-seeded reserved list (major Ethiopian banks/airlines/telecoms/gov/diaspora brands); business verification document/official-domain based, operator-processed manually at first (rare, high-value, slow is fine). Details Pass 2.
**Ban evasion:** REQ-015.5 confirmed as the official mechanism (phone-match strong; device-only → audit queue).
Detail: SUPERFICIAL

### REQ-029 — Performance budgets & data frugality (operator criterion: Telegram-light, never Facebook-heavy)
CI-enforced budgets per REQ-003 — build fails if exceeded. Values = ESTIMATE (mechanism decided; numbers tuned against measured real builds on real devices). Design target: low-cost Android on 3G (DEC-002).
1. First visit → usable home feed: **< 5s on 3G**.
2. Repeat visit: **< 2s** (PWA shell cached).
3. First-visit download: **< 500 KB** total (code+styles+fonts; Ge'ez subset INSIDE this line per REQ-002).
4. Browsing session, ~50 listings incl. ~10 detail opens: **< 5 MB** (arithmetic-checked: ~1.3MB thumbnails + ~4MB details = tight-but-honest; forces compression discipline).
5. **Data-saver mode** (operator's Telegram insight): low-res/tap-to-load images; auto-suggested on slow/metered connections; user controls spend.
6. **No-waste rules:** no autoplay ever; no prefetch beyond viewport; lazy image loading; near-zero background data. Monthly data bill is the judge.
Ops: a real ~$100 Android is lab equipment; pre-launch measurement on-device is part of the launch gate.
Detail: SUPERFICIAL
Approval note: operator delegated review; supervisor performed adversarial self-review (arithmetic check on budget 4) and approved; delegation + review recorded.

### REQ-030 — Authorization architecture (RBAC+ABAC, adopted from operator's prior art)
Grounding: supervisor line-cited review of operator's repos. longshort-from-foundation: two-layer doctrine ("UX convenience ONLY… server-side enforcement authoritative" — RequirePermission.tsx), RLS calling has_permission() (migrations/20260410071203:32-39), superadmin implicit-all (rbac.ts:27), permission-deps graph, prevent_last_superadmin_delete (migrations/20260410041727:101-118). apex-marketplace (adopted as senior blueprint): ADR-001 Shield-style RBAC+ABAC — resources→permissions→roles→users, ABAC conditions, role hierarchy, SCOPED assignments (global/vendor/team), permission cache w/ TTL+invalidation; 135 has_permission refs + 153 SECURITY DEFINER across 204 migrations.
**Adopted whole:** Shield model; DB-enforced has_permission() as sole authority (WordPress capabilities philosophy, but DB-floor instead of app-only — the layer plugins can't forget); superadmin implicit-all incl. all FUTURE permissions; last-superadmin protection; scoped roles with **country** added as scope type; caching+invalidation; dependency graph; audit-logged grants/revocations; requires_step_up flag on critical permissions (fresh 2FA at use).
**Adopted structurally, exercised sparingly:** ABAC + hierarchy exist in schema; regular users need NO roles (RLS ownership covers buyers/sellers); role machinery serves STAFF — v1 seeds ~3 roles.
**2FA (operator):** superadmin panel toggle; OFF in development; **enforcement-ON is a hard launch-gate item** verified pre-launch.
**Panels (operator spec):** every panel permission-gated; unauthorized visit REDIRECTS to user's own default panel (no dead ends); basic user panel universal; roles determine panel set (user / +vendor / +admin functions / superadmin=all); denied-access attempts logged (apex useAccessDeniedTracking pattern) as probing signal.
**Impersonation (supervisor ruling, operator may veto): v1 = narrowed "view-as + assisted posting."** Read-only view-as with user's MESSAGE INBOX EXCLUDED; act-as limited to listing create/edit/renew on user's behalf; requires_step_up entry; visible banner; 30-min hard limit (ESTIMATE); dual-attribution logging (admin X on behalf of user Y); consent affirmation checkbox; ABSOLUTE BLOCKS: no messaging, no touching user security settings (impersonation can never become takeover). Full impersonation = v2 discussion.
**Baseline six (operator-confirmed):** mandatory-2FA superadmin (per toggle+gate above); optional user 2FA nudged to verified businesses/high-activity sellers; rate limits on login/signup/post/message/search/report (CI-checked route list); HTTPS-only + at-rest encryption incl. Ethiopia-partition backups; security@ethio.com + disclosure page; RLS-first with deny-case tests + policy-less-table CI guard.
Centralization: ONE input gateway (REQ-021) + ONE authorization function + ONE audit log.
Detail: SUPERFICIAL

### REQ-031 — Notifications & superadmin control matrix
Channels: PWA push + email only (no SMS per REQ-014); all content via translation keys (REQ-002); per-type user toggles.
Events: (1) new message — push immediate, email if unread ~30min (ESTIMATE); (2) listing lifecycle — published / expiring / expired; (3) moderation — rejection w/ reason + appeal, warnings; (4) security — new device, method link/unlink, password change (user-immutable); (5) absent in v1: marketing, nudges, saved-search alerts (early v2 candidate).
**Superadmin notification matrix (operator directive, WooCommerce email-settings pattern adopted):** every notification type = a row; per-type platform-wide on/off; per-channel (push/email) independent toggles; editable templates routed through the translation dashboard (new language covers notifications automatically). Matrix doubles as the kill switch (silence one broken type in seconds; audit-logged). Security notifications: present in matrix but disabling requires step-up 2FA + loud audit entry; users still can't mute them.
Detail: SUPERFICIAL

### REQ-030 AMENDMENT (S15) — Roles pages & system-row immutability
- **Users** page (list/search/account state/role ASSIGNMENT) separate from **Roles & Permissions** page (role CRUD + role↔permission matrix); separate access permissions.
- **is_system immutability (operator directive, hardened from apex migrations/20260105071112:36 + 20260116104134:46):** superadmin role, default-user baseline role, and their permission mappings flagged is_system; **DB triggers unconditionally reject UPDATE/DELETE on system rows — including from superadmin**; protection lives BELOW the permission system; changes possible only via code-reviewed migration. UI shows locked rows.
- **Default-user baseline:** every account born with immutable "user" system role (own panel, post, message, manage own listings) — no admin action can strand members.
- Precedent: AWS IAM managed policies (read-only by construction), WordPress hardcoded admin caps; ours stronger (DB refuses). Runtime cost zero (flags checked on admin mutations only; cached user-facing path untouched).

### Admin console map (Section 15, confirmed with amendment)
Panels: Moderation (audit queue/reports/appeals/frozen/enforcement) · Catalog (categories+attribute builder+AI images, geography tree, per-country banned lists, collections) · Translations · Users · Roles & Permissions · Promotions · Notifications matrix · System (settings, feature toggles, 2FA gate switch, health) · seller dashboard user-side.
Operator confirmed S16: backups + restore drills IN; watchdogs IN → REQ-032.

### REQ-032 — Backups, restore drills, watchdogs
- **Backups:** automated nightly full snapshot + continuous incremental archiving (restore-to-any-minute; a 2:14pm bad migration undone to 2:13pm); **encrypted at source before leaving the server** (destination holds ciphertext; keys live separately); shipped to S3-compatible storage; backup job heartbeat-monitored.
- **Ethiopia partition destinations — legal fork, architecture identical either way (REQ-013 portability payoff):** Plan A (if Q-014 counsel approves encrypted cross-border backups): nightly abroad. Plan B (if not): primary at Wingu, backups at **Raxio** — separate facility, separate company, same city, fully in-country. Only the destination address differs.
- **Restore drills:** quarterly — restore latest backup to scratch, verify counts, time it; output = measured recovery number, not hope. (Untested backup = rumor.)
- **Watchdogs (the one-person operation's staff):** uptime (external), error rate, **screening-pipeline health** (critical: REQ-011 automation-decides means silent screening death = jammed posts or unscreened content; every automated job writes completion heartbeats — "ran with nothing to do" ≠ "never ran"); all alert the operator's phone.
Detail: SUPERFICIAL

### DEC-005 — Soft launch (Section 16)
Go-live is QUIET (Option A, operator): public without announcement; operator + small circle seed real listings; 2–4 weeks of watchdog-observed hardening and seed-inventory planting (empty feeds kill marketplaces); then loud announcement — diaspora media, Telegram groups, DEC-003 invite emails to old users, 301 redirects live from day one of public availability.
Detail: SUPERFICIAL

### REQ-033 — Partitioning design (Section 5, operator-confirmed all four rules)
1. **Thin global directory** (user ID, home country, sign-in identifiers, @handle — nothing personal beyond login needs) + **personal data in home-country partition** (profile, listings-ownership, conversations, settings). Global control plane, regional data plane.
2. **Public catalog global** (title/photos/price/description → CDN-cacheable worldwide); ownership/management record in seller's partition (the REQ-012.5 line, drawn).
3. **Shared reference data global:** geography, categories, translations, banned lists, settings (no personal data within).
4. **Cross-partition conversations stored in the LISTING SELLER's partition**; foreign participant present as display name + directory reference only (data minimization). **Operator caveat examined:** no clear violation; real transfer questions BOTH directions (GDPR: no Ethiopia adequacy → rely on necessity-for-requested-service + informed consent; Proclamation 1321/2024 mirror case). Graded LOW-MEDIUM, manageable, not a blocker. Mitigations: privacy-policy disclosure + just-in-time first-cross-border-conversation notice; minimization; **added to Q-014 counsel scope (item 2)** + GDPR-literate EU-side check pre-launch; conversation-home is a routing rule not a schema commitment (re-routable without rebuild).
**Launch shape:** target two physical partitions day one (Ethiopia @ Addis + Rest-of-World); if counsel blesses transitional single-DB-with-seams, wall raised shortly after — schema identical either way; timing delegated to counsel without blocking build.
Detail: SUPERFICIAL

### REQ-034 — ToS/Privacy source ledger (operator directive)
Living document (ethio-tos-privacy-source): every REQ with user-facing consequences adds its plain-language clause in the same session it's decided; becomes the source for lawyer-ready ToS + Privacy Policy pre-launch. Seeded v0.1 from all 33 Pass 1 REQs; consent capture points enumerated (signup, per-post affirmation, first cross-border conversation, assisted support, ToS re-acceptance).
Detail: SUPERFICIAL

### REQ-035 — Ethiopia compliance matrix (supervisor deep-dive; strictest-plausible-reading posture — operator has no counsel access; professional one-time review deferred to ECA-registration step, not deleted)
1. Localization → **Ethiopia partition live in Addis from DAY ONE** (transitional single-DB option removed; ambiguity resolved conservatively). COMPLIANT BY CONSTRUCTION.
2. Cross-border conversations → statutory basis IS in the law: explicit informed consent is a listed transfer condition (Proclamation transfer rules); our just-in-time notice + recorded consent + minimization = standing on the text. Consent screen wording = careful Pass 2 item.
3. Backups → conservative default **Plan B (in-country: Wingu primary, Raxio backup)**; encrypted-abroad held as option pending professional review (ECA may require proof of security measures / condition transfers).
4. **ECA registration required BEFORE processing** → NEW LAUNCH-GATE operator task; natural moment for one-time professional help.
5. **72h breach notification** (ECA + affected subjects, incl. nature/categories/counts) → pre-written breach-response runbook added to REQ-032 ops kit; audit logs must support affected-user counting.
6. Data-subject rights (access/rectify/erase/restrict/portability/object incl. automated decisions) → covered by REQ-012.4; refinement: enforcement appeals can escalate to HUMAN review on request (audit queue makes this cheap).
7. DPO → not required at launch scale (no large-scale/sensitive processing); growth-triggered watch item.
8. ECA directives pending → quarterly re-check on ops calendar.
Detail: SUPERFICIAL

### DEC-006 — Frontend architecture & executor division of labor (census ruling)
Evidence: census-results-v1.md — Lovable 7/7 (P1 SSR/SEO incl. JSON-LD unprompted; P2 i18n incl. typed-Messages coverage protection; P3 RLS with DB-level deny proof + defense-in-depth SQL; P4 198kB clean production baseline, dev artifacts stripped, badge/analytics controllable; P5 scope obedience 2/2 with self-report=trace; P6 census-before-build habit x3; P7 one-step revert clean).
**Ruling per frozen rule 1, full form: OPTION B — Lovable-led on its native SSR stack (TanStack Start), STANDARD supervision** (not heavied). 
Cursor role: reserve executor + candidate for repo-level tasks where it's more natural (CI guard scripts, migration tooling); its probes DEFERRED until its first real task (run-then). Supervisor retains independent fresh-clone verification per governance §5/§6 regardless of executor.
Standing checks carried from census: absolute canonical/og URLs; badge+analytics settings verified per project; production-source spot-check for dev markers; git-level revert spot-check at Phase 0; plural-rules capability in i18n choice (Pass 2).
Supervisor mis-assumption logged honestly: pre-census belief "Lovable = client-only Vite" was outdated; census corrected it — evidence over memory vindicated in the supervisor's own direction.

### DEC-007 — Backend ownership: operator's own Supabase + own GitHub (Lovable Cloud banned from real project)
Operator raised lock-in/portability/pricing/partition concerns; supervisor research (cited in S21) confirmed all four: Cloud connection is irreversible per Lovable's own docs; no automatic migration either direction (decide-early moment = now); trapped assets on Cloud = auth hashes/sessions, edge functions, storage, secrets, no direct SQL, no controlled backups; own-Supabase integration is first-class on all plans (Lovable builds schema/migrations/edge functions against it) with full dashboard + direct DB access + predictable own billing.
Ruling: real build = operator's GitHub repo + operator's Supabase project. Lovable Cloud permitted ONLY in throwaway/census projects. Consequences: portability (plain Postgres, pg_dump any day); price-spike insurance (Lovable demotes to replaceable editor worst-case); Ethiopia partition (REQ-035) feasible via direct control; lock-in structurally dissolved. Accepted cost: extra setup steps + eventual modest Supabase paid tier = price of ownership.
Detail: DIRECTIONAL — Phase 0 spec will pin exact setup sequence.

---

### DEC-009 — Mandatory server-side EXIF/GPS strip on all user image uploads
Phone photos embed GPS coordinates, device identifiers and timestamps; an unstripped listing photo leaks a seller's home location. Ruling: every user image upload is stripped server-side using an ALLOWLIST (keep orientation, dimensions, colour profile; drop GPS, device, timestamp and everything else). Never client-trusted. Slots into the image feature (Phase 4/5) as a PHASE-GATE condition — the first image-upload capability must not ship without it. Operator adopted 2026-08-01 from the gold-standard gap analysis (docs/decisions/gold-standard-gap-analysis.md). Implemented by REQ-036.

### DEC-010 — CAPTCHA-ready auth (Cloudflare Turnstile), invisible by default
Throttling only partially covers mass-signup and email-quota-exhaustion. Ruling: thread the Turnstile token seam through the auth service now (auth flows anticipate an optional token); keep it disabled during development and enable the toggle at launch (a Turnstile account is a launch-gate item, docs/governance/launch-gate.md). Invisible-by-default means ~zero added friction. Operator adopted 2026-08-01. Implemented by REQ-037.

### DEC-011 — Reputation/ratings seam (directional)
Listing and messaging designs MUST leave a stable rateable-interaction reference so a future rating ("buyer rates seller for listing X") is a feature addition, not a schema rebuild. Ratings trigger off contact / marked-complete, not purchase (no payments in v1). Ratings themselves are a planned later phase; this entry is a forward-scan checklist item binding the Phase 3/5 listing + messaging specs. Operator adopted 2026-08-01.

### DEC-012 (2026-08-03) — Phase ladder re-scoped: additional auth doors deferred to a named later phase
Phase 1 (Identity) is re-scoped to: identity schema, i18n runtime, EMAIL door, GOOGLE door, the REQ-015 linking rule, and a settings surface covering what exists with two doors (sessions list, step-up, last-used, last-method-unremovable guard). The TELEGRAM door and any multi-door settings behaviour that requires a third door move to a new phase "Additional auth doors", scheduled BEFORE launch and AFTER the marketplace core (listings, categories, geography, feed, messaging).

Rationale: Telegram is a custom flow (BotFather bot, edge-function HMAC verification, freshness window, tampered/stale/replayed deny tests) whose login widget is bound to a production domain the project does not yet control. It teaches nothing architectural that the email and Google doors do not already settle, so it is implementation work that can sequence later. Google stays in Phase 1 because the REQ-015 verified-to-verified linking rule carries account-takeover risk and is cheapest to prove now, while the auth surface is fresh and fully guarded.

REQ-014 (three doors: email + Google + Telegram, no SMS) is UNCHANGED — all three still ship before launch. Only the sequencing moves. Supersedes nothing; amends the phase ladder in docs/governance/governance.md.


Numbering note: this ledger's previous highest decision entry is DEC-007; DEC-008 is not recorded here (it is referenced in the launch-gate list as the Ethiopia-entity/ECA milestone, sourced from REQ-035). The entries above intentionally keep their operator-assigned numbers DEC-009..011 so external references stay stable; DEC-008 remains reserved.

### REQ-036 — EXIF/GPS strip (implements DEC-009)
Server-side, allowlist-based metadata stripping is MANDATORY on every user image upload path (listing photos, avatars, storefront imagery, any future upload surface). Acceptance: a deny-proof showing that stripped output contains no GPS, device or timestamp metadata, run before the first image-upload capability ships.

### REQ-037 — CAPTCHA-ready auth (implements DEC-010)
The auth service accepts an OPTIONAL Turnstile token on signup/sign-in/resend paths and verifies it server-side when the feature flag is on. The seam is threaded during auth work (from P1-d onward); the toggle is enabled at launch.

### REQ-038 — Search-indexability and per-action rate limiting as standing principles
(a) The listing schema stays index-able: Postgres full-text search at launch, with a documented upgrade path to a dedicated search service; no design choice may make that migration a rebuild. (b) The REQ-021 screening/validation gateway treats PER-ACTION rate limiting as a standing requirement, implemented per surface as each surface lands (post, message, resend, report, search).

TRACKED (Tier-2 — plan the seam now, build later):
- Generic notification event→channel pipeline; confirm REQ-031 models this as one pipeline, never per-feature one-offs.
- User reporting/flagging as a planned trust-&-safety feature (extends REQ-028).
- Accessibility (a11y) elevated from a Knowledge line to a standing requirement; axe checks join the E2E suite once the harness carries feature specs.

---

## Open questions ledger

| ID | Question | Raised in | Status |
|----|----------|-----------|--------|
| Q-001 | Signup wall placement | Section 2 | RESOLVED → REQ-007 |
| Q-002 | Launch-country list | Section 1/3 | RESOLVED → REQ-012 (Ethiopia in-country + global diaspora day one; expansion list recorded) |
| Q-003 | Ethiopian data-residency law | Section 3 | RESOLVED (researched) → REQ-012.2; counsel verification remains Q-014 |
| Q-004 | Launch language completeness | Section 6 | RESOLVED → Option A: launch EN+AM; Tigrinya/Afaan Oromo/others fast-follow as dashboards complete |
| Q-005 | Feed-widening threshold ("sufficient results" = N) + promoted per-page cap | Section 9 Pass 2 | OPEN — dials, mechanism decided |
| Q-006 | Business-category taxonomy (list of fields of business) | Section 8 | PARTIALLY RESOLVED — seller business categories will derive from REQ-017 top-level tree; exact mapping in Pass 2 |
| Q-007 | Seller verification levels: does any business category require identity verification before posting (e.g., financial services aimed at diaspora)? | Section 2/11 | OPEN |
| Q-008 | Storefront URL pattern | Section 2 | RESOLVED → `@handle` (REQ-008) |
| Q-009 | Handle squatting/impersonation policy | Section 2 | RESOLVED in principle → three-layer defense + verified badge + reclaim (REQ-008); details in Section 11 Pass 2 |
| Q-010 | Severe-category list | Section 11 | RESOLVED → REQ-028 (per-country lists; exact per-country seeds = Pass 2) |
| Q-011 | Reserved-names seed + verification procedure | Section 11 | RESOLVED directionally → REQ-028; seed list + procedure = Pass 2 |
| Q-012 | Audit-queue design: what lands in it, retention, admin UI | Section 15 | OPEN |
| Q-013 | Appeal path | Section 11 | RESOLVED → REQ-028 (one-shot appeal → deeper AI review) |
| Q-014 | Ethiopia legal compliance | Sections 3/5 | RESOLVED via supervisor deep-dive + conservative design (REQ-035); one-time professional review DEFERRED to ECA-registration step (launch gate) |
| Q-015 | Wingu/Raxio pricing quotes for Ethiopia partition | Section 3/4 | OPEN — deferred to pre-launch |
| Q-016 | Per-country legal research (Kenya, South Africa, Uganda, Sudan, Somalia, …) | Section 3 | DEFERRED — trigger: approaching each market |
| Q-017 | Capability census | Section 4 | RESOLVED → DEC-006 (Lovable 7/7; Option B full form; Cursor probes deferred to first task) |
| Q-P2-2 | How are location names translated? | Section 5 / P2-a | RESOLVED — `name_en` + `name_am` columns on `public.locations` (no translations table exists yet; i18n is static locale files today). Names migrate into the admin translation dashboard when that is built. |
| Q-P2-5 | Which categories seed the marketplace before the authoritative import? | Section 5 / P2-b | RESOLVED — a starter seed of 12 real ethio.com top-level categories ships with the P2-b migration (each with a top-level browse-root pointer, plus one illustrative Vehicles attribute set). It is explicitly provisional: the authoritative WooCommerce import (dedupe/repair, empty-depth collapsing per REQ-017) is a named separate later task that supersedes it. |


---

## Session log
- **S1 (2026-07-16..19):** Section 1 closed (DEC-001..003, REQ-001). Localization + i18n elevated to foundations (REQ-002..005). Section 2 opened: REQ-006 recorded. Documentation process corrected to two-pass with this ledger as single source of truth.
- **S2 (2026-07-19):** Section 2 closed: REQ-007 (gating), REQ-008 (@handle storefronts + impersonation defense), REQ-009 (two-track enforcement — operator corrected supervisor's single-ladder model: severe violations freeze immediately, no graduation), REQ-010 (content-integrity screening incl. image↔category coherence), REQ-011 (automation decides / human audits asynchronously — operator's model, better than both options supervisor offered). Section 3 opened.
- **S3 (2026-07-19):** Section 3 closed with tracked deferrals: Ethiopia law researched (localization already in force — REQ-012), Ethiopia hosting confirmed viable (REQ-013), GDPR folded into REQ-012.4, counsel = Q-014 (operator owner), per-country research deferred (Q-016). Section 4 closed: DEC-004 confirmed (PWA + Supabase + React mobile-first; rendering architecture deferred to census). Capability census designed and frozen (separate doc, Q-017). Supervisor slip logged: ledger edit clobbered a section header, caught by post-edit grep verification, repaired — reinforces read-back-after-every-edit rule.
- **S4 (2026-07-19):** Section order amended: product sections (6–10) before partitioning (Section 5) so seams are designed against real tables. Section 7 closed: REQ-014 (three doors, zero SMS — operator chose email+Google+Telegram), REQ-015 (linking security — operator's "any security issue?" challenge surfaced the pre-registration-takeover hole in the supervisor's initial auto-link rule; hardened to verified↔verified only, plus re-auth-to-link, no-populated-merge, graded enforcement signals), REQ-016 (no automated last-resort recovery; rolling 60-day sessions with step-up re-auth; sessions page; prominent logout). Section 8 (Listings) opens next.
- **S5 (2026-07-19):** Operator directed census of live ethio.com taxonomy; supervisor fetched and audited it (defects logged in REQ-017). Categories slice of Section 8 closed: REQ-017 (canonical nodes + tree pointers + collections + empty-depth collapsing — resolves operator's one-category-two-places need and Easter-collection need without duplication muddle). Operator rulings: prescription pharma out of v1; Jobs/Tenders to v2; 7-day posting re-auth window (REQ-016 amended). WooCommerce category export added to pre-shutdown checklist.
- **S6 (2026-07-20):** Posting-flow slice of Section 8 closed on operator's rulings: REQ-018 (price optional w/ three modes; poster-chosen currency; approximate conversions alongside authoritative original; ETB rate-source flagged for Pass 2), REQ-019 (no mandatory photo; AI category illustrations generated at category creation, watermarked; max 10 photos ESTIMATE; on-device compression), REQ-020 (per-category structured attributes; AI-drafted title/description as poster's option; AI review for readability + category consistency unified with REQ-010 pipeline; auto-saved drafts). Remaining in Section 8: listing lifecycle (expiry/renewal/sold).
- **S7 (2026-07-20):** Section 8 closed. Operator rulings: per-category price applicability incl. no-price categories (REQ-018 amended); admin attribute builder with types (REQ-020 amended); AI grounded-only drafting rule codified from operator's fabrication concern; forbidden-content screening priority; REQ-021 centralized screening/validation gateway (operator directive — Tier A, full design in Section 13); REQ-022 lifecycle state machine (category-default + poster-set expiry, sold-strips-contact-but-stays-visible per operator, relist archive). Section 9 (Discovery) opens.
- **S8 (2026-07-20):** Section 9 closed. REQ-023 (feed-first home, per-region self-learning category row, day-one aggregate event counting), REQ-024 (promotion records: Premium→Classified→newest sort; coverage-count as future pricing dimension per operator; duplicate-listing detection in v1 as circumvention defense; labeled from day one; two-layer anti-crowding), REQ-025 (geo-laddered search ranking; cross-language indexing approved; fuzzy+transliteration tolerance required; filters=attributes). Section 10 (contact) opens.
- **S9 (2026-07-20):** Section 10 closed. REQ-026 (text+photos messaging; always-on in-app + declared preferred channel; block/report day one; honest non-E2E privacy posture — platform sees in-app only, and says so; keep-it-in-app nudge), REQ-027 (anonymous-in-public/identified-to-platform principle; seller anonymity + buyer display names; storefront close/reopen with handle retention). All core product sections (7–10) closed. Section 6 (i18n deep-dive) next.
- **S10 (2026-07-20):** Block semantics defined (two levels; blocks are signals not sanctions). Report pipeline completed per operator: AI-triage-first on all surfaces, human audit only for unresolvable. Language architecture amended per operator: dynamic language registry + admin translation dashboard (WPML-style), EN→AM proving pair, coverage-gated public release, RTL-ready foundations regardless, translation-system hardening (stored-XSS defense, Tier A dashboard, audit-logged edits). Q-004 narrowed to launch-completeness list.
- **S11 (2026-07-20):** Q-004 resolved (Option A: EN+AM at launch, others fast-follow). Section 6 closed. Section 11 (trust & safety) opens.
- **S12 (2026-07-20):** Section 11 closed as REQ-028: banned list confirmed unchanged + alcohol/tobacco banned + live animals allowed; per-country lists confirmed (khat model); ToS user-responsibility affirmation; appeals, messaging scam defense, verification/reserved-names directional, ban-evasion pointer — all four proposals operator-confirmed. Q-010/011/013 resolved. Section 12 (performance) opens.
- **S13 (2026-07-21):** Section 12 closed as REQ-029: four budgets approved after supervisor adversarial self-review (delegated by operator), plus data-saver mode and no-waste rules derived from operator's Telegram-vs-Facebook criterion. Section 13 (security architecture) opens.
- **S14 (2026-07-21):** Section 13 closed as REQ-030. Operator repos cloned and reviewed with citations; apex-marketplace adopted as senior blueprint (RBAC+ABAC, scoped roles, caching); country scope added; panels-with-redirect per operator; supervisor ruled impersonation IN for v1 as narrowed view-as+assisted-posting with absolute blocks (operator invited ruling; may veto); 2FA toggle w/ launch-gate. Section 14 (notifications) opens.
- **S15 (2026-07-21):** Section 14 closed as REQ-031 (event list approved; WooCommerce-pattern superadmin matrix per operator; kill-switch value; guarded security-notification exception). Section 15: Users vs Roles&Permissions pages split per operator; is_system immutability hardened to DB-trigger-below-permissions (grounded in apex); default-user baseline immutable. Awaiting operator yes/no on backups+restore drills and watchdogs.
- **S16 (2026-07-21):** Backups+drills and watchdogs confirmed IN → REQ-032 (incl. Plan A/B legal fork for Ethiopia backup destination). Section 15 closed. Section 16 closed as DEC-005: soft launch (Option A). Remaining Pass 1: Section 17 (governance rewrite + phase ladder) and deferred Section 5 (partitioning design).
- **S17 (2026-07-21):** Section 5 closed as REQ-033 (four rules confirmed; operator's legal caveat on rule 4 examined honestly — low-medium, mitigated, counsel-scoped). Section 17 closed: governance v0.2 authored (ethio-governance-v0.2.md) — payments machinery removed, gateway/screening/RBAC/partition as Tier A, 10-phase ladder, CI guard catalog from commissioned guards. **PASS 1 COMPLETE: 5 DECs, 33 REQs, all sections closed.** Next: operator ratifies governance v0.2 → run capability census (Q-017) → DEC-006 architecture ruling → Pass 2 begins.
| Q-018 | Eligibility + boilerplate | ToS A13 | PARTIALLY RESOLVED — 18+ decided (2026-07-29); governing law/liability/IP-takedown remain for lawyer-polish stage |
| Q-019 | ECA registration procedure details + directive watch (quarterly) | REQ-035 | OPEN — launch gate |
- **S18 (2026-07-21):** Operator directives: (a) ToS capture from now → REQ-034 + tos-privacy-source v0.1 created, seeded from all REQs; (b) no counsel available → Q-014 rescoped to supervisor deep-dive. Deep-dive done with citations → REQ-035: Ethiopia wall day-one (conservative), consent-based cross-border conversations stand on statutory text, backups default in-country Plan B, NEW launch gates: ECA registration + 72h breach runbook; human-review escalation for automated decisions; DPO watch item; quarterly directive check.
- **S19 (2026-07-29):** Governance v0.2 RATIFIED by operator. Pass 2 execution model decided: PIPELINED with per-feature guardrail (nothing built before ITS spec approved; spec work runs one phase ahead of build) + FORWARD-SCAN safeguard added to Pass 2 procedure (each phase's approval requires explicit written check against all later-phase requirements — operator's phase-9-surprise risk converted to checklist item). Rework-risk analysis given honestly: structural bombs front-loaded in Pass 1; additive-first migrations bound residue. Census begun: Probe P1 prompts issued (census-probe-p1-prompts.md) — awaiting operator runs + evidence.
- **S20 (2026-07-29):** Census executed and CLOSED: Lovable passed all seven probes (evidence in census-results-v1.md; operator ran probes, supervisor scored against frozen criteria; contaminated-measurement lesson on P4 documented). DEC-006 issued: Option B, Lovable-led, standard supervision; Cursor reserve. Pluralization finding logged to REQ-002 Pass 2. Pass 2 Phase 0 detail session opens next.
- **S21 (2026-07-29):** Operator challenged supervisor's Phase-0 framing on backend; research pass run (Lovable docs + migration guides + independent analysis); operator's four concerns all validated by sources; DEC-007 issued: own GitHub + own Supabase, Cloud banned from real project. Terminology clarified (Cloud=backend product; SSR stack=frontend framework, owned code either way).
- **S22 (2026-07-29):** Full-project review at operator's request (model upgraded): all load-bearing decisions re-examined and upheld; seven genuine gaps fixed → Phase 0 spec v1.1 (structure: /src/lib, per-feature types, overview.md, conventions.md; Knowledge v3 in Lovable's three-part shape adding file-size cap, phantom-success ban, authorization doctrine, RTL/touch/a11y mechanics; country-name translatability note). Supervisor edit slip (duplicated block) caught by own post-edit verification, excised — second logged instance of the class, net working. Operator APPROVED spec v1.1; repo renamed to ethio-marketplace + PUBLIC confirmed. First anchoring ritual run on real repo (HEAD 057bcd9): committed .env verified publishable-tier-only → INC-000 RULED-ACCEPTABLE with standing rule + CI scan guard; service-role correctly server-side-only; AGENTS.md discovered → constitution will be appended there (future agents incl. Cursor inherit laws free). Prompt A issued (docs foundation; doubles as post-rename sync test). Awaiting: Knowledge v3 pasted + summarize-back check; prompt A execution; operator upload of the six project documents.
- **S23 (2026-07-29):** Knowledge v3 loaded and verified by summarize-back (faithful, nothing invented/dropped). Prompt A executed → supervisor fresh-clone verification → **DISPOSITION: CLEAN** (HEAD 057bcd9→d0d0d0b proves post-rename sync; scope diff exactly /docs + AGENTS.md, 94 insertions 0 deletions; LOVABLE block intact; overview.md honestly marked absent folders as planned — verified against real tree). Hygiene note: paired intermediate commit, P7-tolerated. Pending: operator upload of six project documents to /docs/spec + /docs/governance; then prompt B (CI guards).
- **S24 (2026-07-29):** Phase 0 EXECUTED and CLOSED. Prompts A (docs foundation), A2 (6-doc verbatim import, byte-verified), B (CI guard skeleton), B2 (INC-001 lint fix: generated files excluded from lint/format as a class; 4 integration files formatted-only), C (migration 0001 countries: applied, read-back verified, linter first real pass) — all CLEAN. Deviation D-001 logged (completion report omitted auto-regenerated types.ts; pre-authorized content; fixed via Knowledge A1 addendum). Knowledge amended to v3.1 (A1 addendum, A6 CI-clean commits, E5 generated files) and mirrored to docs/governance/lovable-knowledge.md as canonical record with same-session update rule. Standing notes: rls_auto_enable SECURITY DEFINER warnings = expected auto-RLS trigger, benign; dev/preview database = named launch-gate item (migrations.md rule 6). GEO PRE-DECISION for Phase 3 (operator-raised, apex-grounded): ONE canonical locations tree table with is_active + RLS active-only visibility (apex supported_regions pattern, migration 20260122073249 line 95) + partial index on active rows; the comprehensive world list is an ADMIN-SIDE picking source, never a DB table; listings FK locations.id regardless of activation (no orphaning). Claude Project instructions v1.1 installed; inline-prompt delivery in effect. Phase 1 (Identity) spec session opens.
- **S25..Sxx (2026-07-30 → 2026-08-01):** PHASE 1 IDENTITY — email door (P1-c) CLOSED. Built the email sign-in door (sign-up, sign-in, email verification, callback, sessions-smart resend). Resolved across the build: INC-004 (callback misread success as failure — root cause PKCE flow cannot exchange email-link code cross-browser; reverted to implicit flow), INC-005 (resend UX/abuse — throttle 60s/max3, URL-driven view state, session-smart already-confirmed path, cross-device enumeration-safe messaging, iOS same-browser detection via storage rehydration + focus/poll), INC-006 (security-scan rulings: profiles/user_directory missing-INSERT are by-design/trigger-owned, documented in schema comments; SECURITY DEFINER grants re-verified; leaked-password Pro-gated), INC-007 (scaffold docs formatting debt + records-vs-living-docs ruling), INC-008 (dependency audit: 5 high findings single-root-cause brace-expansion via eslint devDep, ruled dev-only/dormant; eslint 9→10 + CI audit-gate deferred as tracked tasks), INC-009 (format gate non-determinism — prettier pinned exact 3.8.3, CI uses bun run format:check), INC-010a (arbitrary-email resend abuse vector on /auth/callback — removed; D-004 closed on both surfaces), INC-010b (signup 500 for non-owner addresses = Resend test-domain restriction, ruled not a code defect; owner-address signup works). Deviations D-001..D-005 logged. Adversarial security capstone (docs/features/auth-security-tests.md): 6 attack cases PASS (wrong-password identical responses, expired link, replayed link, resend throttle, enumeration-indistinguishable, session-smart no-fabrication), case 2 ruled. Supervisor reversal logged: the PKCE config was a supervisor error, corrected to implicit flow.
- **S.. (2026-08-01):** E2E TEST HARNESS built + ACCEPTED against a pre-committed pass bar (docs/decisions/e2e-testing-investigation.md). Playwright exact-pinned, chromium, two viewports (mobile-360/desktop-1280), targets own ethio-staging Supabase project (prod-guard in code refuses prod ref), pre-confirmed users via Admin API with namespaced emails + teardown (zero residual verified). Serve mode = vite dev (Option B) chosen on evidence: the Cloudflare/Nitro production bundle does not reproduce in the GitHub runner. First spec smoke-auth-i18n (sign-in, header identity, Amharic + html lang, no 360px overflow, sign out) passes both viewports, 3 green runs zero flakes. Seven bring-up defects diagnosed from evidence (build wiring x3, service-role key format legacy→sb_secret_, RLS-verification overreach removed, email-fill pre-hydration discard, cold-start hydration race → 5-attempt retry-fill). STANDING RULE adopted: every feature ships with its E2E test green in CI before its phase closes (instructions v1.3 / G15). Ethio-staging created (region us-east-1, mirrors prod settings).
- **S.. (2026-08-01):** Gold-standard gap analysis conducted (operator-requested forward-scan). Tier-1 adopted: DEC-009 EXIF strip, DEC-010 CAPTCHA seam, DEC-011 reputation seam, REQ-036/037/038. Tier-2 tracked (notifications pipeline, user-reporting, a11y). Tier-3 deferred (payments already archived, favorites, multi-currency, KYC, third-party API, disputes). Instructions amended to v1.3 (G13 phase-gate completeness, G14 publish-before-retest, G15 E2E-per-feature).
- **S.. (2026-08-02):** CI STATUS REPORTER landed (operator-directed, out of the usual prompt loop — logged as D-006). Supervisor verification by fresh clone: three loop-safety guards confirmed byte-level; ci.yml's five jobs untouched; scope diff exactly four files. DISPOSITION: DRIFT — the reporter's generated table fails the pinned prettier gate (INC-011), a red-main trap that had never been graded because the status commit is [skip ci] + paths-ignored. Fixed by generated-file exemption in .prettierignore. Standing change: docs/tracking/ci-status.md is now the supervisor's primary §8 CI check on every verification clone, read together with a SHA-currency cross-check (the file lags HEAD by the status commit; the reporter does not report its own health).

- **S.. (2026-08-02):** AUTH-DOOR E2E BACKFILL shipped (Tier B), closing the G15 gap
  left by P1-c. Ten cases across three specs guard the INC-005 resend hardening, the
  enumeration-indistinguishability capstone case (now mechanized as a text-equality
  assertion), the callback replay/already-confirmed honesty paths, and the INC-010a
  arbitrary-recipient abuse vector. Shared helpers extracted to e2e/helpers/ so the
  Google and Telegram doors extend rather than copy-paste. Operator rulings: logic
  cases mobile-360 only (smoke keeps both viewports); throttle asserted at UI level,
  no real-clock wait; Turnstile test-keys decided now, implemented at P1-d.
  Supervisor decisions logged under G17: teardown moved from single-user delete to a
  namespace sweep with 24h orphan reaping (the old teardown would have leaked every
  user these tests create); helpers located at e2e/helpers/. Instructions amended to
  v1.4 (G16 prompt-integrity, G17 operator-bandwidth).

- **S.. (2026-08-02):** AUTH-DOOR E2E BACKFILL — first CI run: 10 of 13 cases GREEN,
  including the mechanized enumeration-indistinguishability assertion (B-3) and the
  INC-010a arbitrary-recipient guard (C-4). A-1..A-3 failed on an environment limit,
  not a defect: the Resend test domain rejects non-owner recipients (INC-010b), so
  real sign-up cannot complete on staging. Gated behind E2E_EMAIL_SINK as a named
  deferral (INC-013) and recorded as a Phase 1 gate blocker rather than skipped
  silently or weakened. INC-012 orphan key removed. Supervisor slip: the previous
  landing lost the SSR Register block from src/routeTree.gen.ts and the completion
  report claimed src/ was unchanged — restored here, logged as D-008.

- **S.. (2026-08-02):** INC-014 — SSR Register augmentation relocated out of the
  generated route tree after a second loss and a restoration that never reached
  main. Class rule adopted: hand-maintained content never lives in a generated
  file. Logged D-009.

- **S.. (2026-08-02):** INC-013 RESOLVED — ethio-staging SMTP repointed at a Mailtrap sandbox inbox (operator-approved spend: free tier), staging email rate limit raised to 100/hr, E2E_EMAIL_SINK repository variable wired into the E2E job. Sign-up cases A-1..A-3 now execute against the real sign-up path. Prod SMTP untouched; the Resend custom-domain item remains on the launch gate. Email CONTENT assertions (template correctness, Amharic auth emails) noted as newly POSSIBLE but not implemented — a separate decision when the Amharic templates are built.

- **S.. (2026-08-02):** Mailtrap sandbox CONFIRMED working — A-1 green, real
  confirmation emails delivered with a functioning confirm link; 11 of 13 E2E cases
  passing. Two open faults: INC-015 (A-3 virtual clock froze the supabase-js timers,
  fixed by installing the clock after sign-up and using fastForward) and INC-016
  (A-2 sign-up failed with no email and no error on a path identical to the passing
  A-1 — cause unknown, diagnostics added). Supervisor correction: an earlier
  send-rate-throttling hypothesis was DISPROVED by the Mailtrap inbox, which showed
  the third send succeeding after the second failed. Both A-cases remain Phase 1
  gate blockers.

- **S.. (2026-08-03):** Cooldown-on-click (INC-017) VERIFIED in CI — A-2 passes,
  guarding the ruled security behaviour end-to-end; 12 of 13 cases green. A-3's
  remaining failure traced to the virtual-time API, not the product: fastForward
  fires due timers at most once, so the 1s cooldown countdown never reached zero
  (INC-019, reverted to runFor). Logged D-010.

## Deviation ledger

(D-001..D-005 are recorded inline in the session log entries above.)

D-006 — CI status reporter built without a supervisor-authored execution prompt. Rationale: operator-directed infrastructure, delivered as a fait accompli and authorized by the operator's standing authority. Verified after the fact by fresh clone; one defect found and fixed (INC-011). Filed for honesty, not as a fault.

D-007 — system-state.md CI-observability line originally landed below the doc's
"Updated:" footer and the footer date was left stale, because the prompt specified
neither placement nor a date roll. Supervisor omission; corrected in this task.

D-008 — Completion report stated "no changes under src/" while src/routeTree.gen.ts
had lost its SSR type-registration block. Generated-file regeneration is
pre-authorized (D-001 precedent); the inaccurate claim and the content loss were
not. Restored; no impact reached main beyond one commit.

D-009 — Completion report stated src/routeTree.gen.ts was restored and
typecheck-verified; the generator re-dropped the block before commit, so main never
received it. Sandbox-true, repo-false. Caught by fresh-clone verification. No user
impact; types-only.

- **S.. (2026-08-02):** Playwright traces gave server-level ground truth on the two
  remaining E2E failures. A-3: resend 429 over_email_send_rate_limit — Supabase
  enforces ~60s per address, independent of the hourly quota. A-2: sign-up 500
  "Error sending confirmation email" — Mailtrap free-tier send-rate refusal, not a
  rate limit at either Supabase or the app. Real defect found by A-3 and fixed
  (INC-017): the resend cooldown armed only on success, leaving a refused resend
  freely repeatable — operator ruled cooldown-on-click. Supervisor corrections
  logged: an earlier send-throttling hypothesis was abandoned on evidence that in
  fact supported it, and a claimed 429-to-generic-error defect was retracted as
  never having existed.

D-010 — The supervisor instructed replacing runFor with fastForward while diagnosing
INC-015. The swap was wrong for an interval-driven countdown and went undetected
because A-3 failed earlier in the test at the time, so the changed line was never
executed. Corrected here.

- **S.. (2026-08-03):** A-3 moved to a NIGHTLY scheduled E2E job with real elapsed
  time (INC-020) after virtual time proved unworkable across three mechanisms. Per-push
  suite now 12/12 green; A-2 retains per-push coverage of the operator-ruled
  cooldown-on-click behaviour. Options considered and rejected: real waits on every
  push (a ~2min tax per commit) and a test-only cooldown override (a seam shortening a
  security throttle). The nightly job writes a completion heartbeat per the REQ-032 ops
  invariant so a schedule that silently stops is detectable. Supervisor record: three
  successive mechanism diagnoses for A-3 were wrong (fastForward, runFor, and an
  in-flight-guard hypothesis); the structural fix was adopted rather than a fourth guess.

- **S.. (2026-08-03):** GUARD PROOF harness added (workflow_dispatch only). Mutation
  fixtures live as inert .patch files applied to the runner's working tree, never
  committed; each proof asserts the guarded test FAILS against broken code and the job
  fails if src/ is dirty afterwards. Closes the §8 proven-guard requirement for B-3
  (enumeration indistinguishability) and C-4 (INC-010a arbitrary-recipient guard) —
  the last Phase 1 gate blocker pending its first run. Pattern follows the migration
  linter's self-test precedent.

- **S.. (2026-08-03):** GUARD PROOF hardened to A/B (INC-021). The first green run is
  void as evidence: the original design read exit codes, so any command failure would
  have read as a guard biting. Each guard now proves BOTH directions — passes on clean
  source, fails on mutated source — asserted from the JSON reporter. Supervisor design
  defect, logged as D-011; the executor built exactly what was specified.

D-011 — The guard-proof harness as specified by the supervisor could return GREEN while
proving nothing, because it inferred "test failed correctly" from a process exit code.
Caught on verification of the executor's correct implementation. Corrected by A/B
baseline plus JSON-parsed assertions.

- **S.. (2026-08-03):** Guard-proof JSON capture fixed (INC-021 follow-up): report now
  written via PLAYWRIGHT_JSON_OUTPUT_NAME rather than a stdout redirect that
  globalSetup's logging corrupted. Third supervisor design defect in this harness,
  each caught by the harness's own assertions rather than by a green run — the
  intended behaviour.

- **S.. (2026-08-03):** P1-d Google door built (Tier A): provider enabled on both
  Supabase projects with scopes limited to email/profile/openid; sign-in entry point,
  button in both modes, enumeration-safe link-refusal copy, DEC-010 Turnstile seam
  threaded. E2E G-1 asserts the authorization request carries only the three intended
  scopes — a guard against silent scope creep — without loading Google. REQ-015 linking
  behaviour is SPECIFIED but NOT YET VERIFIED against Supabase's actual handling of the
  unconfirmed-account path; deny tests D-8/D-9/D-10 gate step closure.

- **S.. (2026-08-03):** INC-022 — the P1-a country sentinel ('US' + fabricated
  'ip_guess' provenance) removed per operator ruling: country_source gains 'unknown',
  defaults flip, the trigger fallback is gone, existing rows corrected. Home country
  is now honest-at-rest; the user confirms it at first post (feed-phase UI), and
  anonymous/browsing geolocation is a session concern for the feed phase, never
  written to identity rows. Tier A: live-DB read-back required before CLEAN.

- **S.. (2026-08-03):** INC-022 CLOSED with live evidence from both databases: prod
  shows zero ip_guess rows, two corrected to unknown/NULL, and one pre-existing
  user_confirmed/ET row correctly untouched (stronger provenance is never overwritten);
  staging migrated by operator. G-1 red diagnosed and fixed (INC-023, supervisor
  test-design defect): interception moved from the untouchable Google redirect hop to
  the first-hop authorize request we actually construct, fulfilled rather than aborted.
  Google spec scoped to mobile-360 (D-012: the original prompt stated mobile-only but
  did not name the desktop testIgnore edit, so the spec ran on both viewports —
  supervisor under-specification, harmless, corrected here).
  DESIGN NOTE pinned (operator-ruled): viewing-location resolution ladder for the feed
  phase — signed-in: profiles.viewing_location (writes back on change); logged-out same
  device: device-local memory of last viewing location, feed preference only, never
  identity data, never account lookup; new visitor: session IP guess, visibly labelled,
  one-tap override. home_country_code is never involved in browsing and is confirmed
  only at first post.

- **S.. (2026-08-03):** P1-d CLOSED. D-8 and D-10 executed by the operator on
  ethio-prod against the published app with SQL read-back and live sign-in probes.
  D-8: GoTrue replaces an unconfirmed email identity with the incoming Google
  identity on the same user id and destroys the never-used password — the takeover
  path is self-defusing; planted credentials are rejected afterwards. D-10: confirmed
  accounts link cleanly, one user id, two identities, password intact. Directory
  uniqueness verified by structure (single user id; trigger fires per auth.users
  insert). D-9 deferred-named to the Additional-auth-doors phase (supervisor decision
  under G17, operator may overrule): requires email_verified=false, unproducible with
  gmail; linkRefused* keys reserved for it. Standing caveat: linking behaviour is
  GoTrue's, uncoverable by CI — manual re-run pinned to the launch gate and to any
  Supabase Auth change.

D-012 — The Google spec ran on both viewports because the original prompt stated
mobile-only but did not name the desktop-1280 testIgnore edit; supervisor
under-specification, harmless, corrected here.

- **S.. (2026-08-03):** P1-f BUILT, trimmed per DEC-012. Operator rulings applied:
  sessions reduced to "sign out other devices" (no device list); display-name editing
  excluded until the REQ-021 screening gateway. Current-password verification uses a
  throwaway non-persisting Supabase client rather than GoTrue's reauthentication nonce
  (the nonce proves mailbox possession, not knowledge of the current password, and
  depends on email delivery, a launch-gate item). Known limit surfaced, not hidden:
  sessions older than 24h will be refused by GoTrue with a nonce demand, rendered as a
  translated error. Last-method removal is refused by GoTrue
  (single_identity_not_deletable); the disabled Unlink control is honesty only, never
  authorization. Automated S-1/S-2/S-3 (mobile-360); U-1/U-2/U-3 remain operator deny
  tests because a linked Google identity cannot be minted headlessly — U-3 hunts a
  ghost password surviving an unlinked email identity. Debt named: the relative-time
  formatter sits in the route pending its /src/lib home (law B2), and /settings has no
  navigation entry yet — app-header.tsx was outside this task's named files.

- **S.. (2026-08-03):** S-3 red diagnosed from the strict-mode error: the new
  "Sign out other devices" control collided with the /sign out/i session probe —
  locator precision fix in the spec and in the shared expectSignedIn/Out helpers
  (anchored ^sign out$). Security assertions had already passed. /settings nav
  entry added; relative-time formatter moved to its law-B2 home
  (src/lib/relative-time.ts). D-013: types.ts was modified outside the P1-f
  prompt's named scope — accepted as a natural companion to the service changes,
  logged not absorbed.

D-013 — src/features/auth/types.ts was edited during P1-f although the prompt's
named-file list did not include it; the IdentitySummary/IdentitiesResult types are a
natural companion to the service changes. Logged, not absorbed.

- **S.. (2026-08-03):** U-1/U-2/U-3 executed by executor script against ethio-prod
  (operator performed the OAuth-consent steps CI cannot). U-1: last-identity unlink
  refused server-side on a throwaway single-identity user — HTTP 422
  `single_identity_not_deletable`, "User must have at least 1 identity after
  unlinking". U-2: operator's UI unlink+relink verified — both identities present,
  password alive. U-3: email identity removed with google remaining; password status:
  **ALIVE = ghost door, finding open** — `auth.identities` shows `[google]` only while
  `auth.users.encrypted_password` is still non-null. The admin API exposes no password
  field and GoTrue's `invalid_credentials` cannot distinguish wrong-password from
  no-password, so the script prints OPERATOR PROBE REQUIRED and the fact was settled by
  SQL read-back. Not patched — reported. Operator account is now google-only; no
  automatic restore attempted. Script at scripts/deny-tests/p1f-identity-unlink.ts,
  secrets via env only.

- **S.. (2026-08-03):** INC-024 GHOST DOOR — U-3's operator probe proved a password
  survives its email identity's unlink and still signs in, invisible to the
  settings method list. Operator ruled option A: unlink tells the truth. Fixed
  Tier A: AFTER DELETE trigger on auth.identities nulls the password when an email
  identity is unlinked while other identities remain (mirroring GoTrue's own D-8
  replace semantics); one-time correction killed all existing ghosts including the
  operator's. Proven by scripted recheck + operator-account read-back. Joins
  D-8/D-10 on the launch-gate dependency-behaviour re-run list.

- **S.. (2026-08-03):** P1-f CLOSED. Settings surface deny-proven end to end; the
  U-3 ghost door became INC-024 and its fix (trigger on auth.identities) is the
  project's first accepted-risk control on a Supabase-reserved schema — detection is
  the scripted `--recheck`, pinned to the launch gate and any Supabase Auth change.
  Staging migrated by operator; operator probe confirms the old password is dead.
  Phase 1 has one step remaining: the P1-g gate.

- **S.. (2026-08-03):** P1-g RULINGS RECORDED. R1 staging mail sink = Ethereal.
  R2 recovery model = TRUTH MODEL: the sign-in-methods list shows whatever exists;
  the password is its own row read from `public.has_password()`, never inferred from
  an `email` identity row. R3 password removal is owner-initiated as well as
  unlink-driven — `public.remove_own_password()` refuses when it is the last way in.
  R4 the reset request is NEUTRAL-ALWAYS (B-3 class): registered, unregistered and
  transport-error all render one identical confirmation, and it never reveals whether
  an account has a password.

- **S.. (2026-08-03):** P1-g Step A — production RLS/ACL deny re-proof, executed
  against ethio-prod. Signed out: `countries` readable (intended public reference),
  `profiles` and `user_directory` refused 401/42501 on read AND insert, and both
  `has_password` and `remove_own_password` refused "permission denied for function".
  Signed in as user A (throwaway pair, deleted after): A reads its own profile,
  reads 0 rows of B's profile and 0 of B's directory, cannot update or delete any
  profile row (42501 — no UPDATE/DELETE grant on the table at all), and
  `remove_own_password()` is refused as A's last method. The full-surface answer:
  personal data is owner-read-only through PostgREST and mutation happens only
  through the audited SECURITY DEFINER functions.

- **S.. (2026-08-03):** P1-g Step B/D — the dependency audit becomes an enforcing CI
  job (`dependency-audit`), failing on high/critical. It distinguishes three states
  rather than two: clean, findings, and *advisory service unreachable* — the last
  fails with its own message so a broken registry call can never be read as a clean
  bill of health (law F4). `bun audit` cannot complete from the build sandbox
  (HTTP 404), so the authoritative result is the CI job's, not a local run's.

- **S.. (2026-08-04):** Audit remediation, probe retirement, fixture refresh (Tier B).
  (1) The 8 high audit findings are cleared by same-major `overrides` on
  `brace-expansion`, `postcss` and `js-yaml` — all dev/build-chain packages with zero
  runtime exposure (INC-025). The `brace-expansion` floor stays inside 1.x on purpose:
  a flat `>=1.1.17` pulls the whole tree to 5.x and breaks `minimatch@3`, i.e. eslint.
  The authoritative clean verdict is the CI `dependency-audit` job's; the sandbox 404s.
  (2) The recovery-identity probe is RETIRED — `.github/workflows/p1g-probe.yml` and
  `scripts/deny-tests/p1g-recovery-identity.ts` deleted. Its census question is
  answered and recorded (GoTrue sets a password without re-creating the `email`
  identity); under ruling R2's truth model that state is legitimate and visible, and
  the invariant is now continuously guarded by E2E R-2 and S-4 rather than by a manual
  dispatch. The `E2E_SUPABASE_DB_URL` repository secret was single-purpose to that
  probe and is now dead — operator deletion item.
  (3) Guard Proof fixtures re-checked against the moved auth surface:
  `c4-arbitrary-recipient.patch` applies clean unchanged; `b3-enumeration.patch` was
  regenerated (the sign-in error block moved ~102 lines during P1-g), same mutation
  intent, forbidden-on-main header kept.

- **S.. (2026-08-04): PHASE 1 (IDENTITY) CLOSED.** Gate evidence: RLS/ACL deny
  re-proof executed against prod (signed-out refusals, cross-user isolation,
  function ACLs); dependency-audit CI gate landed, PROVEN failing on 8 real high
  findings on its debut, then clean after same-major overrides; Guard Proof green
  on regenerated fixtures against the moved auth surface; full E2E suite green
  under the Ethereal sink; recovery flow walked live on production by the operator
  (forgot-password → email → reset → truth-model row restored → new-password
  sign-in). Phase 1 delivered: identity schema with partition seams and honest
  country provenance (INC-022), i18n runtime, email door with resend hardening
  (INC-005/017), Google door with proven REQ-015 linking semantics (D-8/D-10),
  settings surface on the truth model (R2), password recovery (INC-025), and the
  guard infrastructure that caught its own defects: CI status reporter, nightly
  real-time job, guard-proof A/B harness, audit gate. Incidents INC-011..INC-025
  all resolved or deferred-named; supervisor deviations D-006..D-014 logged.
  Telegram + device-list remain in the DEC-012 Additional-auth-doors phase.
  NEXT: Phase 2 (marketplace core) — spec work opens in a new thread per the
  pipelined model.

- **S.. (2026-08-04): Recovery resubmit throttle + nightly sink reconciliation (INC-026).**
  The forgot-password submit now reuses the sign-up resend's single cooldown timer and
  per-visit counter (`RESEND_COOLDOWN_SECONDS`, `MAX_RESENDS_PER_VISIT`) — no second
  timer system — engaged on INITIATION per the INC-017 ruling, behind the same
  synchronous in-flight ref so a double-click cannot start two cooldowns. Past the cap
  the control stays disabled under a neutral `auth.resetLimit` message (new key, EN+AM).
  The neutral-always response (ruling R4, guard B-3) is untouched: identical copy for
  existing, unknown and error. New E2E R-4 asserts the disabled state and the cooldown
  affordance after one submit, mobile-360, no real-clock wait and no mail send (the
  probe address is unregistered, so GoTrue issues nothing). The nightly E2E job's only
  divergence from the green main E2E job was the sink flag: it hard-coded
  `E2E_EMAIL_SINK: "1"` where ci.yml reads `vars.E2E_EMAIL_SINK`; every other env value
  (staging URL, publishable key, service-role secret, VITE_*/SUPABASE_* build vars) was
  already identical, and the workflow sets no SMTP of its own. The duplicated literal is
  what let the Mailtrap → Ethereal swap (R1) pass the nightly by. Reconciled to the
  shared variable; next scheduled run is the verification.

- **S.. (2026-08-04): Nightly heartbeat made rebase-safe and non-masking (INC-027).**
  Two defects in the bookkeeping, none in the tests. (1) The heartbeat pushed without
  fetching, so a commit landing on main mid-run rejected it; (2) that rejection failed
  the job, conflating bookkeeping with the test verdict — and left the status file
  stale at the pre-fix run, which is exactly the staleness the file exists to expose.
  Restructured: "Run nightly E2E" carries `continue-on-error`, the heartbeat runs with
  `if: always()`, and a final step re-raises the captured test outcome, so the job
  fails iff the suite failed and a red suite is never hidden. The push now regenerates
  rather than merges: fetch origin main, `reset --hard`, re-write the file from this
  run's own data (one shell function, one source, used on every attempt), commit,
  push — up to 3 attempts with a short sleep. The status file is derived state, so
  rewriting on top of a moved ref is always correct and cannot conflict. Three
  failures emit `::warning::heartbeat push failed after retries` and exit 0; the
  ~48h staleness rule remains the backstop. Logged against the REQ-032 ops-invariant
  family as the second "watchdog ignores a moved ref" occurrence.


- **S.. (2026-08-04): PHASE 2 OPENED. P2-a Geography built (Tier A).** `public.locations`
  tree per the frozen GEO pre-decision: one canonical table (country → region → city via
  self-referencing `parent_id`), active-only RLS mirroring `countries`, partial index on
  `is_active` plus `parent_id`/`country_code` indexes, shallow ET+US seed. Rulings applied:
  shared reference data (no partition seam — a diaspora user must read the active country's
  locations), shallow seed (the "add my city" path covers gaps, so a missing city never
  blocks a post), names as `name_en`/`name_am` pending the admin translation dashboard.
  The comprehensive world list stays an admin-side static asset, never a DB table. Listings
  will FK `locations.id` regardless of activation state. Build order for Phase 2: geography →
  categories+attribute-builder → listings+lifecycle → screening gateway (seam-first, filled
  here) → feed/home → search → storefronts → messaging. Seam-first screening ruled by
  operator (the REQ-021 gateway lands at P2-d; earlier features route writes through a
  bypass-proof seam). Census note: no `update_updated_at_column()` helper existed in the
  database — the first migration attempt failed on it (42883) and the retry creates it
  idempotently before the trigger.

D-015 — The supervisor initially leaned to a translations TABLE for location names;
census showed no such table exists and i18n is static locale files, so the design was
corrected to the live `name_en` pattern already used by `public.countries`. Decided
under G17. Logged, not absorbed.

- **S.. (2026-08-04): P2-b Categories + attribute schema built (Tier A).** Three tables
  per REQ-017's three-concept model: `public.categories` (the canonical node — one row
  per real category; a listing FKs it and lives in exactly one category in v1, carrying
  `price_enabled` per REQ-018, `expiry_days` per REQ-022, and the `is_restricted`
  screening seam per REQ-009/010), `public.category_tree_pointers` (the browse tree as
  POINTERS not copies, so one canonical category appears under several parents — one
  inventory, many paths, split-inventory impossible by construction), and
  `public.category_attributes` (REQ-020 structured fields, with a CHECK making `options`
  presence exactly equivalent to a select type). Deny-by-default RLS mirroring
  `locations`: active-only public read on `categories`, `USING (true)` on the two
  dependent tables (they inherit visibility from their gated category — restating the
  predicate would force a join per read for no confidentiality gain), NO write policy on
  any of the three, SELECT-only grants to `anon`/`authenticated`. Starter seed of 12 real
  ethio.com top-levels, each with a top-level browse root, plus one illustrative Vehicles
  attribute set (make/model/year/transmission/condition). Rulings applied:
  starter-seed-now (the authoritative WooCommerce import with dedupe/repair and
  empty-depth collapsing is a separate later task), attribute-builder ADMIN UI deferred
  to the admin console (this phase seeds attributes via migration), names as
  `name_en`/`name_am` on the same basis as D-015. Not seeded per REQ-017 rulings:
  prescription pharmaceuticals (v1 exclusion), Jobs & Vacancies + Tenders (v2).
  Collections (REQ-017 concept 3) are NOT built this phase. Read-back on `ethio-prod`:
  12 categories, 12 pointers, 5 attributes.

  P2-a staging parity: **NOT verified.** Prod carries P2-a exactly as specified
  (verified 2026-08-04); the staging read-back was never obtained — this sandbox holds
  only the prod service-role binding. Recorded as UNPROVEN, not "no drift", and carried
  as an operator checklist item alongside the P2-b staging application.

  INC-028 (duplicate `public.update_updated_at_column()` entry observed in `pg_proc`)
  remains queued for the P2 gate; untouched here. The function is callable and both new
  `updated_at` triggers bind to it successfully.

D-016 — Step 4 of the task asked to record "P2-a locations parity verified across prod
+ staging (no drift)". Staging was never read (no staging credentials in this
environment), so the claim was NOT written; the ledger records UNPROVEN instead.
Deviation logged under A3 (honesty before action), not absorbed.

INC-029 (2026-08-04) — Reported staging locations drift investigated and DISMISSED as a
measurement error. Prod `public.locations` = 32 rows (country 2 / region 12 / city 18),
0 duplicate natural keys, all P2-a constraints and indexes present. The "18" in the
report is the city count; staging's 32 equals prod's 32. No cleanup SQL executed and
none needed; no migration written (prod is correct, and a data cleanup would in any case
be staging-only operator SQL, never a committed migration). Root-cause finding on
re-runnability: P2-a's CREATE TABLE and seed INSERTs share one migration file applied in
a single implicit transaction, so a failed re-apply rolls the seed back with the DDL —
duplicate stacking was never mechanically available. Future migrations that must survive
re-application need guarded DDL + `ON CONFLICT DO NOTHING` seeds, not explicit
transaction wrapping. Staging parity stays UNPROVEN per D-016 until the operator runs the
diagnostic block against ethio-staging.

- **S.. (2026-08-04): P2-c Listings core + lifecycle + screening seam built (Tier A).**
  `public.listings` (REQ-019) — the marketplace's central object and, by its `id`, the
  rateable-interaction anchor (REQ-011); `public.listing_photos` with the `exif_stripped`
  DEC-009 gate. Two `SECURITY DEFINER` seam functions are the ONLY write paths:
  `public.submit_listing(...)` (ownership assert, active category/location validation,
  price-mode and `price_enabled` rules per REQ-018, attribute validation against
  `category_attributes`, `expires_at` computed from `categories.expiry_days` per REQ-022,
  `published_at` on first draft→active, and a MARKED PASS-THROUGH STUB where the REQ-021
  screening gateway lands at P2-d) and `public.transition_listing(id, status)` (the whole
  state machine — draft→active→expired|sold|removed, active→active renewal resets expiry,
  illegal moves refused; §7 anti-state-scatter). `public.expire_stale_listings()` is
  AUTHORED but NOT SCHEDULED — the pg_cron/external wiring is a named follow-up.
  RLS deny-by-default: SELECT-only grants, active-only public read plus seller-own read on
  both tables, no INSERT/UPDATE/DELETE policy anywhere. Private `listing-photos` bucket
  (never public) with path-prefix ownership on `storage.objects` and public read gated on
  `exif_stripped` + active parent. CI job "Listing-write seam guard (with self-test)" runs
  `scripts/check-listing-writes.sh` against `src/` (passes, 0 findings) and against
  `scripts/fixtures/bad-listing-write-example.ts.txt` (fails, 2 findings) — proven in both
  directions. Rulings applied: photos stored-not-surfaced pending the EXIF strip (DEC-009,
  P2-c-photos is the immediate next pass); the seam is enforced by CI guard; the state
  machine exactly as specified. No `src/` change; no existing migration edited.

**Standing rule adopted (2026-08-04): IDEMPOTENT MIGRATIONS.** Every migration from this
one onward must be re-runnable — `CREATE TABLE/INDEX IF NOT EXISTS`, constraints added
inside `DO $$ ... EXCEPTION WHEN duplicate_object` blocks, `DROP POLICY/FUNCTION IF EXISTS`
before `CREATE`, `ON CONFLICT DO NOTHING` on all seeds — so applying it to a database that
already carries it is a no-op rather than an abort. Follows directly from the INC-029
re-runnability finding. P2-c is the first migration written under this rule.

D-017 — Attribute validation in `submit_listing` is IMPLEMENTED, not deferred, but at a
documented depth: required-key presence, `number`/`boolean`/`text`/`select` JSON-type
conformance, and `select` membership in the declared `options`. Not covered yet:
cross-field/conditional rules, numeric ranges, and unit coercion — these land with the
attribute builder at P2-d. Logged as a scope note, not a silent gap.

D-018 — The `listing-photos` bucket row was created through the platform's storage-bucket
tool rather than an `INSERT INTO storage.buckets` statement inside the migration (that SQL
path is rejected by the toolchain). The bucket's RLS — the security-bearing part — IS in
the migration. Consequence: a replay of this migration on a fresh database recreates the
policies but not the bucket row; the operator checklist therefore includes creating the
private `listing-photos` bucket on staging before applying.

D-019 — The post-migration security linter reported 8 WARNs. Seven are the pre-existing
"SECURITY DEFINER function is executable" class and are BY DESIGN here: `submit_listing`
and `transition_listing` are definer-by-necessity (they are the write gate over a
deny-by-default table) and are granted to `authenticated` only, revoked from
`anon`/`PUBLIC`; `expire_stale_listings` is `service_role` only. The single anon-executable
definer function is the platform-owned `public.rls_auto_enable` event-trigger helper, not
ours. WARN 8 (leaked-password protection disabled) is a pre-existing Auth console toggle,
carried to the operator checklist. No new finding was introduced by P2-c.

## Session — 2026-08-04 — Design foundation (P2-design)

Built the ethio.com house style, the first substantial frontend build; every later page
inherits from it. Delivered: the unified `AppShell` (header / rail / body / footer slots,
one skeleton at every breakpoint, rail collapsing to a `ui/sheet` drawer below `lg`); the
config-driven, permission-gated panel system (`src/config/panels.ts` + `panels.types.ts`,
`PANELS` / `panelsForUser` / `visibleItems`, Marketplace always first and always present);
the coffee-on-cool-slate palette as oklch values inside the existing `@theme inline`
structure with measured WCAG ratios; Inter + Bricolage Grotesque + Noto Sans Ethiopic with
the per-glyph Ge'ez fallback; dark mode across every token; the tibeb woven-diamond brand
mark and loading spinner (inline SVG, `prefers-reduced-motion` respected); and the
Marketplace feed's SHAPE — ranked grid, listing card, loading/empty/error states.

**Tier is LIVE.** A Tier-A idempotent migration added `public.listings.tier`
(`text NOT NULL DEFAULT 'regular'`, CHECK `premium|featured|regular`, added inside a
`DO $$ ... EXCEPTION WHEN duplicate_object` block) plus the partial index
`listings_feed_order_idx ON (tier, published_at DESC) WHERE status = 'active'`, which
serves the feed ordering exactly. `tier` is an operator lever: admin → premium, user
self-serve → featured, both free in v1. No backfill needed (default covers all rows; there
are 0 listings). **Operator action: apply this migration to `ethio-staging` too.**

Documented seams (NOT live): `view_count` (no column; view tracking is a separate
pre-launch feature — every listing reports 0 and the ascending-view sort is a live no-op)
and location scope (`ctx.locationScope` accepted, never narrowed; city→region→country→world
widening is a separate pre-launch feature). Both are commented at their definition in
`src/features/feed/ranking.ts`.

Stubs / TODOs recorded explicitly:
- TODO(rbac) — `isAdmin: false`, `permissions: []` in `src/components/app-shell.tsx`; the
  roles/permissions tables are a later feature. Law F3 unaffected: gating is UI-only.
- TODO(search) — the header search input is visual; submit is a deliberate no-op, there is
  no `/search` route yet.
- TODO(footer-links) — About / How it works / Safety / Contact / Terms / Privacy render as
  text; those pages do not exist yet.
- Category tree: **wired live** (reads `public.categories` + `category_tree_pointers`), not
  stubbed. Category filter on the feed: **wired live**.

D-020 — `index.html` does not exist on this stack. Font `<link>` tags were placed in
`src/routes/__root.tsx`'s `head().links` (the only `<head>` composer) instead; a remote
`@import` in `src/styles.css` would break the Lightning CSS build. Deviation from the
task's stated scope path, same intent.

D-021 — Light `--muted-foreground` was darkened from the specified `#7A828C` (3.63:1 on
`#F6F7F9`, below WCAG AA) to `#686F78` (4.74:1). Dark mode `--primary` uses the lighter
leaf `#7FC9A6` with near-black text: the deep `#1E5A43` scores 8.08:1 against white text
but only ~1.5:1 against the `#14181C` page, so filled controls would disappear.

D-022 — The rail is built on `ui/sheet` (the same primitive `ui/sidebar` uses internally
for its mobile mode) plus a plain `<aside>` at `lg`, rather than `SidebarProvider`. The
sidebar primitive's cookie-persisted icon-collapse model is more machinery than the two
states this shell has; no collapse logic was reinvented.

D-023 — The active panel is client state in the shell context, not a route segment: the
non-Marketplace panels have no routes yet. Their bodies render the "coming in its own
feature" placeholder.

D-024 — `e2e/shell.spec.ts` could not be executed through the Playwright harness in the
build sandbox: `e2e/global-setup.ts` hard-refuses to run without
`E2E_SUPABASE_URL`/`E2E_SUPABASE_SERVICE_ROLE_KEY` pointing at `ethio-staging`, and those
secrets live in CI only. Every assertion in the spec was instead executed directly against
the running app at both 360px and 1280px and passed (evidence in the completion report).
CI is the authoritative run.

Launch-gate additions: the brand mark is a WORKING logo pending professional trademark
clearance before commercial use. The motif-neutrality rule (religiously neutral tibeb
geometry only, never a cross or faith iconography of any tradition; motif only as logo,
spinner and empty-state mark) is recorded as a STANDING design rule in
`docs/features/panels.md`.

Session 2026-08-04 (design-foundation CI reds): INC-030 gitleaks prose false positive
resolved by single-fingerprint `.gitleaksignore` (rule stays armed). INC-031 records the
blast-radius rule now in force — an always-mounted panel MUST fail soft and visibly
inside its own body; no feature's backend gap may cascade through the shell-wrapped root.

Session 2026-08-04 (post-design-foundation E2E green + mobile/perf/security pass): all
eleven CI reds were stale-selector test debt from before the AppShell (INC-032) plus a
hydration race that made two of them look like app bugs (INC-033); the application was
healthy in both cases. Mobile pass found and fixed one real law-C2 violation (INC-034)
and converted the 360px rules — no horizontal overflow, ≥44px tap targets, no sub-11px
text, rail-is-drawer below `lg` and persistent above, grid reflow — into assertions.
Performance pass: fonts load `display=swap` with Noto Sans Ethiopic subset to `ethiopic`
and Inter to `latin`; listing cards reserve a fixed `aspect-4/3` box so the
loading→empty/error transition costs no CLS; the marketplace module graph (28 modules)
imports no chart/map/3D library, now guarded by `scripts/check-marketplace-imports.mjs`
in CI. Security pass: the feed is read-only (`status = 'active'` filter over the public
RLS policy, no insert/update/delete anywhere in the feed or card modules), the browser
holds only the publishable key, the search input is inert and builds no query, and the
admin panel is UI-gated only — NEW LAUNCH-GATE NOTE: admin route bodies and admin data
reads MUST carry server-side RLS/RBAC before they ship; the `isAdmin` panel flag is
convenience, never authorization (law F3). Nothing admin-scoped is fetched today, so
there is nothing to leak yet.

Session 2026-08-04 (final layout refinement): the shell's presentation is frozen as the
five-band vertical stack (top bar → panel tabs → location row → breadcrumbs → body)
inside the unchanged corner-block grid, with band separation carried by hairlines alone
so band spacing is symmetric by construction. Panel switching moved from a top-bar
dropdown to a tab row that is ABSENT for logged-out, Marketplace-only visitors, plus the
drawer list on mobile. The geographic axis of the marketplace is now VISIBLE but not yet
ENFORCED: the location row cascades the real `public.locations` tree and writes the chosen
node into `useFeed` alongside `categoryId`, while narrowing, IP resolution and the
city→region→country→world widening ladder remain the pre-launch location-scoping feature
(docs/features/location-scoping.md). Category filtering and breadcrumb navigation are
live. No new colour entered the palette.

Session 2026-08-05 (layout correction pass): the responsive law is now ONE breakpoint —
`md` (768px) — for both sidebar collapse and top-bar minimization. Tablets are not
phones: from `md` up the shell shows the persistent rail and FULL controls (search FIELD
with placeholder, language NAME, labelled account/sign-in); below `md` (phones only) the
rail is the drawer and the bar minimizes to icons with the full-width search row beneath.
Verified at 360/768/1280 with zero horizontal overflow. The top bar carries no intrinsic
height at `md`+ and fills grid row 1, so bar and logo cell share top and bottom edges by
construction. The footer is an explicit equal-thirds grid with halved row spacing and
intact 44px tap boxes. The location row displays the resolved area exactly once (the
picker holding it reads as its level name). Home is the breadcrumb root only and means
the unfiltered Marketplace feed — clicking it restores the marketplace panel and clears
the category; the panel tab remains "Marketplace". Presentational only: no new colour, no
auth/settings/feed behaviour change, location filtering still stubbed.

## Layout polish round 2 (2026-08-05)

Home is the breadcrumb ROOT and, on the marketplace panel, the only chrome segment:
`Home › <category path>`. Other panels keep their name (`Home › Account › …`). The feed
body is centred with equal left/right gutters at every width. Exactly one sidebar
affordance exists per breakpoint — hamburger below `md`, collapse toggle at `md`+ — and
collapsing the rail moves the wordmark into the top bar so the chrome is never unbranded
and never shows the wordmark twice. Footer rows are tightened without breaking the 44px
tap floor. Presentational only: no token, auth, feed or location-scoping behaviour change.

Brand-in-chrome rule: exactly one brand lockup renders per rail state — corner cell when
the rail is open, mark-less two-line lockup in the top bar when it is collapsed. Chrome
controls of fixed size are never crowded by flexible ones: the bar search field is capped
per breakpoint. Reference data (category tree) is cached per page session and shows
skeletons, never an empty rail, on first read.
- 2026-08-05 session — Tier B layout pass: LocationSelector marketplace-gated (INC-052); marketplace rail confirmed categories-only (INC-053); collapse toggle confirmed md+ only (INC-054). No new colors, no auth/settings/feed behavior change, location filtering still stubbed.
- 2026-08-05 session — Tier B fix pass: collapse-toggle mobile leak fixed at the class level (INC-055); panel-tabs horizontal overflow removed (INC-056); category caching confirmed (INC-057). No new colors, no auth/settings/feed behavior change.
- 2026-08-05 session — Tier B shell close-out: panel derived from route (INC-058); top-bar right cluster flush right (INC-059); Admin panel gating confirmed correct (isAdmin-only, no change). No new colors, no auth/settings/feed behavior change.
- 2026-08-05 session — Tier C docs import: handoff #4 (`docs/governance/handoffs/2026-08-05-thread3-handoff.md`), `docs/features/performance-strategy.md`, `docs/spec/posting-flow-spec.md`, `docs/spec/posting-foundations-build-plan.md` imported verbatim. No src/, schema or behaviour change.

### DEC-013 (2026-08-07) — Phase resequencing: ladder realignment (RBAC-first restored)
Trigger: operator-directed deep plan review. Finding: the A–E posting plan built governance-§4 ladder Phases 3–4 material while skipping Phase 2 (RBAC & panels); phase labels had drifted (system-state "Phase 2 = Marketplace core" vs governance "Phase 2 = RBAC & panels"). Supervisor forward-scan slip logged (S25).
Ruled (operator, ratified 2026-08-07):
1. Phase R (RBAC core) inserts NOW, before A1. DB layer only: roles / permissions / role_permissions / user_roles (with country scope), resources, audit_log, has_permission() as sole authority, is_system DB triggers (deny even superadmin), last-superadmin protection, requires_step_up seam column, seed ~3 system roles + superadmin bootstrap (operator account), retrofit admin-write policies onto all existing tables, deny-case tests, route↔permission CI guard armed, panel routing on real permissions with redirect-not-dead-end (REQ-030). Admin UI stays in Phase C.
2. All tables created after Phase R write their policies against has_permission() at birth.
3. Discovery and Contact become named pre-launch phases (F: real feed + geo-scope backend + search v1 + REQ-004 translation layer; G: messaging + block/report).
4. Phase B additions: per-action rate limit on post (REQ-038's first consumer), ToS/Privacy v1 pages (Step-8 dependency), My Listings management basics (edit/renew/mark-sold).
5. Translation dashboard slots into the admin epoch after C1 (as C3).
6. ToS/Privacy (operator directive): supervisor drafts v1 pages from the REQ-034 source ledger, marked pre-counsel. Professional legal review remains deferred to the ECA-registration / Ethiopia-entity milestone per REQ-035 and gates ONLY that milestone — it never blocks global launch.
7. New requirements adopted: REQ-039 (PWA mechanics), REQ-040 (observability) — see below.
8. Class-2 provider selections (currency rates, analytics, error-monitoring vendor) deferred to their respective specs — operator discussion at each step.
9. Phase-label repair: the marketplace epoch carries letters R, A–G; the governance 0–9 ladder remains the master map.
10. Performance directive (operator, 2026-08-07): RBAC must add zero cost to the public browse path — has_permission() never in hot public-read policies; regular users carry no roles; staff permissions one cached session fetch (TTL + invalidation; no cache under impersonation); permissions client code splits with admin routes only. Lineage note: model per Apex ADR-001 Shield-style RBAC (Filament Shield heritage), Apex migration 20260105071112 as schema donor, hardened per REQ-030 (is_system triggers below the permission system; country scope; step-up seam).
Master sequence: R → A → B → C (incl. C3 translation dashboard) → D → F → G → governance ladder 7–9. E-enrichments interleave post-core.

### REQ-039 — PWA mechanics
Manifest, service worker, offline app shell, install prompt. Load-bearing for REQ-003's "<2s repeat visit (PWA shell cached)" budget and DEC-004's PWA app form; previously assumed, never specced. Scheduled within governance ladder Phase 8 (Ops) at latest; earlier if the performance gate demands. Detail: SUPERFICIAL (Pass-2 spec at build time).

### REQ-040 — Observability (error monitoring)
Client + edge-function error reporting for zero-touch operations (REQ-001): capture, aggregate, alert. Provider selection is an operator discussion at the spec (Class-2 register). Scheduled within governance ladder Phase 8 (Ops). Detail: SUPERFICIAL.

- **S25 (2026-08-07):** Operator-directed deep plan review conducted (full-repo audit: ledger, governance, build plan, flow-spec, launch-gate, migrations, src, Apex reference). Findings: A–E plan skipped governance-ladder Phase 2 (RBAC & panels) — supervisor forward-scan slip, logged per G8/G10; Phase-0 translation-dashboard skeleton never built; Discovery/Contact/notifications/backups/GDPR/rate-limiting/step-up seam/ToS pages specced but unscheduled; PWA mechanics and observability assumed but never specced. DEC-013 ratified with REQ-039/040; gap register created (docs/tracking/gap-register.md); build plan §4 replaced with R→A→B→C→D→F→G. CI-reporter fix (INC-027 class, third strike): dispatched 2026-08-05, landed e28e6af, content verified CLEAN against the ruled pattern, exercised live (status run 19:27Z 08-05). Deviations filed, not absorbed: double-dispatch of the same prompt (08-05 report never relayed; landing discovered by fresh clone; second dispatch correctly no-op'd — idempotent by design); Lovable-platform auto-commit class second occurrence → class rule written (INC-060); no CI run created for pushes 3ced270/66eda07 (INC-061, watch); HEAD 66eda07 unbuilt-by-CI until the next push's run. Operator directive adopted: on ci-status.md lag, recheck after runs have had time to complete before reporting staleness (instructions v1.5 / G18). Next: this docs import (doubles as CI re-trigger probe), then the Phase R spec.
- **S26 (2026-08-09):** PHASE R (RBAC core) — all build steps CLEAN; gate closes on the staging proof-run paste (final tracked item). Record: R1 schema/functions/triggers/seeds/bootstrap (live read-backs + deny trio); R1a INC-062 grant lockdown + INC-063 cascade-aware base-role guard (operator ran the behavioral deny pair on prod); R2 admin-policy retrofit with in-migration impersonation proofs; R2b append-only audit + audit perms pruned to view/export + per-command RBAC policies + definer-grant CI guard (proven-to-fail) + INC-064 probe portability; R3 client seam + gated /admin + browse-path guard (proven) + RBAC E2E (R-1/2/3, green in CI) + partial function matrix; R3a assign/revoke success-path + audit-write proofs (permanent proof rows in audit_log by design); red-main at 6851c0c fixed at root cause (INC-065, changelog list-prefix; bun pinned 1.3.14 rider). Staging parity: R1→R2b applied and verified by operator sitting; two proof migrations pending final sitting. Deviations ruled: signed-in-only permission fetch with shell allowlist ACCEPTED (R3 prompt's "zero ever" overtightened DEC-013 §10 — supervisor spec-contradiction, logged; constraint 4 letter amended: admin UI code-splits, fetch hook may mount in shell gated to signed-in sessions, bundle guard = cost proof); R3 proof-matrix substitution = DRIFT, reconciled by R3a; R2 report types.ts inaccuracy noted (platform regen, pre-authorized class); R2b migration under its own guard grandfather floor, compliant anyway. Supervisor slips logged per G8: cascade-semantics claim (INC-063), ZERO-ever contradiction, changelog templates omitting the "- " prefix (INC-065 class rule). Class rules forged this phase: definer functions ship in-file REVOKEs (CI-guarded); migration-embedded assertions are environment-agnostic (INC-064); changelog appends carry the literal "- " prefix; executor runs format:check before every commit. Four-lens close-out: docs/governance/reviews/phase-r-closeout.md (G19). Next: A1 spec (category taxonomy + attributes import).

- **S27 (2026-08-10):** PHASE A (data foundations) — all build steps CLEAN on prod; gate stamps on the consolidated staging paste (A1→A3, five migrations). Record: A1 taxonomy+attribute import (96 categories/15 roots/54 attrs; supervisor fidelity diff 96/96 slugs+icons, 81/81 parents; anon RPC grant proven live). Operator-caught donor flaw: vehicle attributes at the Automotive root wrongly inherited by parts → A1b restructure (Vehicles intermediate node carries the seven; Computers+Phones demoted under Electronics; 6 legacy dupe roots hard-retired under zero-reference assertions; 13 roots/97 categories; INC-066 + placement class rule: attributes at the narrowest node whose entire subtree they truthfully describe; taxonomy prompts must carry explicit dispositions for every pre-existing row). A2 listing_locations + single-country trigger law + inactive-location deny + cascade, proofs P1–P4 in-migration. INC-067 (supervisor-caught): has_permission inside an anon-reachable policy; class rule — anon policies never reference has_permission; A2b split (public/owner/admin) with in-migration assertion, + F10 exact-pin columns (pair/visibility/range laws, owner UPDATE policy, no PostGIS by REQ-003 weight discipline). A3 seller profile foundations (alias unique/validated, phone/telegram/whatsapp with visibility laws, default_post_location trigger, column-grant extension proven incl. negative home_country_code=denied; attempt-1 clean rollback on a fixture error, disclosed, zero residue). Rulings logged: owner-editable location states draft/active/expired (D-spec to confirm); personal-only v1 (account-type at E); profile public exposure deferred to B3 get_seller_card; contact_prefs/viewing_location legacy seams untouched pending C1 ruling. R-GATE ADDENDA (closing S26's inline items): staging proof migrations ran green with the four-row audit evidence archived (bootstrap/r2b_probe/role.assign/role.revoke); INC-064 refined — feature-embedded probes skip-loudly, dedicated proof migrations fail-loudly; proof-base@staging.test is staging's standing base-only fixture outside the E2E teardown namespace; Phase R gate STAMPED CLOSED. Four-lens: docs/governance/reviews/phase-a-closeout.md. Next: Phase B spec (posting wizard).

### DEC-014 (2026-08-10) — Foundations-First Admin Epoch (operator-ratified; wizard last)

Trigger: operator directive after Phase A close — build the complete management layer before any seller-facing surface; each section complete and comprehensive; wizard depends on users/RBAC/security and ships LAST. Supersedes DEC-013's B-before-admin ordering; Phases R and A stand as the DB bases this epoch's UI consumes.

Epoch U (each section closes ONLY when: RBAC-gated end-to-end · own E2E green in CI · EN+AM · 360px-first · bundle-budget green · security-reviewed · G19 four-lens record · staging-applied):

U0 Admin shell & navigation (permission-gated sections, breadcrumbs, empty states).

U1 Users (Tier A): list/search/filter/paginate + detail + role assignment via audited RPCs + activate/deactivate with a small schema rider (profiles.account_status + enforcement seam; full auth-level ban explicitly deferred with the flag as v1 gate) + per-user activity from audit_log.

U2 Roles & permissions console (absorbs C4): role CRUD with system rows UI-locked, per-role permission matrix with is_core locked, role creation, assignment views.

U3 Audit & security: audit-log viewer + access-denial logging seam + lite security dashboard (Apex access-denial service pattern, sized to v1).

U4 Locations manager: country activation, region/city CRUD + coords. Sub-city level DEFERRED until a real dataset exists (operator may pull forward).

U5 Categories console (absorbs C1): pointer-tree manager (create/rename/move/retire + reassign seam), lucide icon picker, flags, ordering, inline name_am editing.

U6 Attributes builder: all seven types, inheritance badges via get_category_attributes, options editor (label_en/label_am), validation, flags.

U7 Tags (REQ-041 adopted: tags + per-category suggestions schema, admin CRUD; storage shape fixed at its spec).

U8 Category AI images (absorbs C2): ethio palette (#1E5A43/#C98A2B), REQ-021 gateway, pick/regenerate/batch, og variant. OPERATOR ITEM at U8: AI provider key.

Post-epoch: translation dashboard (C3 slot, operator may resequence) → Phase B wizard (LAST) → B2/B3/B4 → D (D3 queue UI joins the admin pattern) → F → G → ladder 7–9. Sequence of record: R → A → U0–U8 → C3 → B → D → F → G.

- **S28 (2026-08-16):** PHASE U0 (admin shell & navigation) — COMPLETE; CI green e0af7bf (10/10, E2E both viewports, full suite). Gate stamps on the operator's published-URL walk. Build record: U0 shell + 7 permission-gated sections; U0b sections feed the shell panel rail (INC-069); U0c single functional breadcrumb + drawer redesign; U0d landing cards (INC-070) + panel-header band below the logo on all screens; U0e panel switching NAVIGATES (INC-071); U0f fixed panel header + scrollable item region; U0g/g-2/g-3/g-4 desktop layout laws — fixed top band, fixed rail, footer full-width beneath, document is the only page scroller, /dev/tall real fixture (injection harness retired); U0h footer over rail + i18n chrome-coverage guard; U0i provisional name_am for 97 categories (staging applied by operator) + rail clamps above the in-view footer + category-label coverage; U0i-2/3 clamp-law geometry tests with settled measurement (hook flushes on scrollend, re-clamps on content resize); U0j sign-out hard reset + live auth guard on gated routes + permission cache purge (INC-072, Tier A; SO-1..SO-4 incl. same-tab client sign-out proof and reload path); U0k one-click sign-out (confirmation REMOVED by operator directive — a confirm step reintroduces walk-away exposure) + role-tiered session policy: idle staff 30m / regular 4h, absolute staff 12h / regular 7d, 60s warning, cross-tab enforcement, strict tier until permissions resolve, sign-out-others on password change; SP-1..SP-4; localStorage audit clean; U0l category selection = route /c/<slug> — URL is the single source of truth for body/breadcrumb/highlight (INC-073), /auth a proper page (crumb Home > Sign in / Create an account, no rail selection), PageCard primitive standard across auth/settings/admin/feed; U0l-2 breadcrumb Home is a Link on every branch, header hides account-menu the instant sign-out begins. Harness lessons: INC-068 (signIn session contract + attemptSignIn), INC-065 (changelog list-prefix; bun pinned), nanoid override ^3.3.18 (>= would have jumped to nanoid 6), no injected-DOM layout tests, artifact-first after one blind fix (proposed G20). Shell laws now 17, each with a test: panel-follows-route incl. activation=navigation; category=route; single breadcrumb with underlined current segment and Link Home; panel landing = clickable cards; panel band below logo on all screens; drawer = active panel + switcher; fixed logo cell/top band; fixed rail; rail inner list scrolls, header fixed, foot pinned; rail clamps above in-view footer with Sign out always clickable; footer full-width beneath rail with inset content; document is the only page scroller at md+; i18n chrome zero-fallback + category-label coverage; logo block height == top bar; sign-out = one-click hard reset + live guard; session idle/absolute policy; PageCard standard. OPERATOR ITEM open: Supabase Sessions time-box/inactivity (plan-dependent). Supervisor slips logged (G8): U0 scope walled off the panel seam; U0c/U0d drift; stale test invariants across geometry corrections; three inspection-only fix rounds; U0j confirm dialog (reversed by operator on sound grounds). Next: U1 Users.

- **DEC-015 (2026-08-17): Display Primitives.** Every visual container is built from shared primitives (PageCard, DataTable, StatCard/StatGrid, ChartFrame, FormSection, DetailPanel) that own responsiveness, overflow, empty/loading/error states, and interaction contracts — designed once, tested once on /dev/primitives (law suite L1–L8), inherited everywhere. Screens vary in content, never in skeleton.

- **DEC-016 (2026-08-17): Users-function parity plan.** Built in U1: list/detail/deactivate-reactivate/roles/activity/edit. Registered at U2 as permissions: profiles:create, profiles:delete, impersonation. Impersonation ships at U3 with guardrails (step-up, superadmin-only initially, 15-min time-box, dual-actor audit, visible banner, no destructive actions). Invite + delete flows ship with Ops (email pipeline / GDPR flow). Bulk actions on demonstrated need.

- **S29 (2026-08-19):** PHASE U1 (Users) — COMPLETE; CI green 70f5176 (17/17, full suite: smoke + email-serial + 4 shards); operator walk PASSED incl. the step-up re-walk. Build: 20260816120338 — profiles.account_status rider ('active'/'deactivated') + profiles_status_guard (no self-deactivation, no superadmin deactivation) + deactivation guards in submit_listing/transition_listing + five definer RPCs (admin_list_users/get_user/set_account_status/user_activity/list_roles) gated profiles:view with in-file proofs P1–P6; staff see emails only through these RPCs. U1a: in-place grant restatement (the R2b definer guard's first real catch — re-declared functions restate grants; file-level truth rule), settings deactivation banner, Users > <name> crumb. U1b: admin role gains profiles:update (INC-075 — E2E fixture under-privileged; UI+RBAC had behaved correctly); DataTable primitive + no-horizontal-overflow table law. U1c: DEC-015 primitives + /dev/primitives hostile fixture + law suite L1–L8 (test-once responsiveness); preflight ledger-first. INC-076: a stale-checkout push overwrote committed U1c — restored verbatim from f62f2f8; base-SHA rule + no-unexplained-deletions CI guard adopted. U1d: DataTable rowHref applies to table rows (whole row + keyboard; primitives law L8 — interaction contracts get law tests, not just geometry); own-row rule (no status controls on own record). U1e: E2E failure reporter writes docs/tracking/e2e-last-failure.md (artifact-courier model retired); deletions guard live; SO-2/SO-4 root-caused to the settings bootstrap racing the hard reset (INC-078 → every auth-derived query under one purge root). U1f: TOTP enrollment + StepUpGate; requires_step_up seeded on profiles:update + roles:assign/update/delete; server gate; MF-1..5; TOTP enabled on both Supabase projects. U1f-2/3 (INC-074 arc): parity preflight → environment asymmetry found (SQL-editor applies write no tool ledger) → public.migration_marks + EVERY-MIGRATION-SELF-MARKS law (guard-enforced, floor 20260817054246) + backfill; G21 migration-first sequencing installed. U1f-4 (INC-081, operator repro): step-up trusted a stale aal2 claim after unenroll, and enrollment itself elevated the session indefinitely — server gate now requires a verified TOTP factor in auth.mfa_factors AND an auth.mfa_amr_claims totp entry <10 min, proofs P5–P8, MF-6/MF-7. CLASS RULE: security gates verify server-side state, never bearer claims alone; gate E2E must cover revocation and stale-elevation paths. U1g: admin_update_profile (step-up-gated, audited, P1–P4 incl. case-insensitive duplicate alias), Edit-profile FormSection, AU-9..11; AU-3/4/5 re-anchored via enrollAndStepUp; DEC-016 ratified. U1g-2/3/4: expectAal2 reads data.currentLevel; neutral src/lib/query-keys.ts (browse-path guard); auth-derived root key + cancel-then-remove + gcTime:0 + unmount-before-purge ordering; monotonic auth-event tickets (a late profile read can never resurrect a signed-out session); SO-4's strict zero-surviving-queries assertion. CI redesign: E2E sharded ×4 + smoke tier + email-serial project (INC-082 — Auth email quota isolation; the 429 watcher scoped to the sign-up phase: a resend 429 IS the throttle under test), concurrency cancel-in-progress, merged per-source failure reporter with log tails and a last-steps-before-timeout block (instrumentation law: a timeout with no failed step prints its duration profile; timeouts are never loosened as a substitute); INC-080 per-process fixtures (run+shard id, worker tag + random suffix; namespace sweep nightly-only); wall-clock ~11m → ~5m. Ops: the launch-gate Ethereal WATCH fired correctly (expired ephemeral sink = 3 red nightlies + generic SMTP failures); operator re-created credentials; SUPERVISOR SLIP logged: a stale-memory Mailtrap instruction against ruling R1 — class rule: infrastructure names are grepped from the repo/record, never recalled. Nightly heartbeat verification on the refreshed sink: pending tonight (named). Handed forward: mfa-stepup spec still uses its local enrollment steps (switch to the shared helper — cosmetic); 10 pre-existing react-refresh warnings (own task); ACT-U0-1 (launch-gate). Next: U2 Roles & Permissions console.

- **S30 (2026-08-22):** PHASE U2 (Roles & Permissions console) — COMPLETE; CI green 52e184b (17/17 full suite); nightly green two consecutive mornings; operator walk PASSED (create role, matrix grant/revoke, system + is_core locks, member-gated typed-key delete, Amharic matrix, ?role= member click-through). Build: migration 20260822050500 — seeds (roles:view → admin; requires_step_up on roles:create; DEC-016 registration: profiles:create, profiles:delete, impersonation:use — all requires_step_up, granted to no role) + six definer RPCs (list_detailed/get/create/update/delete/set_role_permission) with clean pre-RAISEs ahead of the authoritative is_system/is_core triggers, proofs P1–P8 in-migration, staging applied by operator with read-backs. Console on the primitives: DataTable list with member/permission counts, matrix grouped by resource with locked states, custom-role lifecycle, Danger card with member gate + typed-role-key confirm (operator questioned; RULING stands: step-up proves the actor, the typed key proves the target — a wrong-object guard for irreversible structural deletes; one-line removable on operator word). U2a (walk + evidence): delete key rendered adjacent to the confirm (role-key testid split), matrix vocabulary is chrome not data — 21×2 i18n keys (9 actions, 12 resources) + coverage-guard matrix extension under the zero-fallback law; members link via ?role= URL param (INC-073 law; search/status filters queued); roleRow twin helper + RP re-anchors (responsive-twin class rule reaffirmed); RP-9/RP-10. Reporter arc closed (INC-083 → INC-084 a–g): JSON-steps mechanism proven impossible and retired; error-context.md quoting shipped with never-silent law (a reporter crash writes its own report), malformed-results root cause, download resilience, root-anchored test-results ignore + TRACKED-FILES law (git ls-files is the proof of existence), titlePath matcher with a describe-nested real capture, and the last hardcoded-English sign-out selector re-anchored to account-menu-sign-out. Same-tree sharded-vs-serial divergence dispositioned (INC-083); the flake family is now fully instrumented — the next timeout arrives with its pending-action call log; storageState session-reuse registered as the candidate lever if profiles name sign-in cost. OPEN QUESTION (operator): restrict which permissions are grantable to custom roles (assignable-scope flag) — future hardening. Handed forward: users search/status filters → URL; mfa-stepup spec shared-helper unification (from S29); react-refresh warnings task; RP-10's single-member assumption noted in-spec. Next: U3 Audit & Security + guardrailed impersonation (DEC-016).

- **DEC-017 (2026-08-22, ratified): Assignable-scope for custom roles.** permissions.assignable flag; 18 reserved rows (all roles:* mutations, all user_roles:*, all permissions:*, impersonation:use, profiles:create, profiles:delete) can never be granted to custom roles — server-enforced in admin_set_role_permission ("permission is not assignable to custom roles") ahead of the immutability triggers; roles:view stays grantable; rows the user system role holds render as "everyone via user" badges derived live (no second list); revoking a pre-existing non-assignable grant remains permitted (cleanup path — ratified deviation).

- **DEC-018 (2026-08-22): CI tests the production build.** E2E runs against a real build in e2e mode: VITE_E2E gates every instrument (src/lib/env-flags.ts isE2E — __ethioSupabase, __ethioQueryClient, session/step-up overrides, /dev routes, error-page cause text); build:e2e pins minify:false + sourcemap:true + cssMinify:true (asset identity matches prod — INC-085h); every E2E job builds then verifies dist/server/wrangler.json exists before serving; a shared fixture guards every document response (retry-once-then-named); hydration is an explicit contract (html[data-app-ready="1"] set by a root effect), never a framework-internals probe.

- **DEC-019 (2026-08-28, pre-committed rule → Branch A): node-preset e2e serve.** Root cause was wrangler/workerd class (nitro stamps the build day as compatibility_date; a pinned wrangler binary refuses any date newer than its own release — a calendar time bomb, INC-088): primary CI serve migrated to nitro node-server via scripts/serve-e2e-node.ts; one nightly "cloudflare-parity-smoke" retains a wrangler-served pass, with runtime date-refusal explicitly distinguished from application breaks; the deploy build (cloudflare-module) is untouched.

- **DEC-020 (2026-08-29, ratified): dev-branch promotion.** The executor targets a dev branch; CI truth lives on dev; a fast-forward-only promote job advances main solely on full green. Red never lands on main; platform auto-pushes ("Lovable update"/"Work in progress") are quarantined on dev and labeled PLATFORM-ORIGIN by the reporter; main becomes the certified-green record. Known trade-off (accepted): Lovable's editor/preview/Publish follow the connected branch, so main is the certification mirror until deployment reads it. Implementation is the first act after S31.

- **DEC-021 (2026-08-29, registered — builds at Ops): full act-as impersonation.** Operator requirement, verbatim: while impersonating, the impersonator experiences the target's application wholesale — the target's tabs, panels, menu items, and pages, not the admin shell; navigation, dialogs, and all read interactions are live exactly as the target sees them; server-side, every database-mutating path refuses while the impersonator_id claim is present — including editing the account, changing password/email/2FA, and initiating impersonation — surfacing a dedicated translated notice, never a silent failure; "End now" and expiry tear down the target session and return the impersonator to their own view; the permanent banner, 15-minute box, step-up, reason, and dual audit carry over from v1. Mechanism: service-role edge function mints a ≤15-minute target JWT carrying impersonator_id; isolated /impersonate context; token in memory only; auth-service operations unreachable. PREREQUISITE: the write-guard census across every user-writable table and RPC. Tracked as ACT-U3-1.

- **DEC-022 (2026-08-29, ratified retroactively): Declared-mark migration law.** Replaces filename-equality self-marking (unsatisfiable by construction — the tool stamps the name after authoring; third occurrence of the class). A migration declares a 14-digit mark ≥ its filename stamp, monotonic, never recycled; check-migrations.sh and the preflight read the declared literal. Apply-pairing law (2026-08-30): completion reports state "apply <uuid-fragment> → expect mark <value>".

- **DEC-023 (2026-08-30, ratified; local-run leg dormant):** the executor's environment holds STAGING-ONLY Supabase credentials so authed E2E runs pre-push. Blocked by plan gating (no secret store on the current Lovable tier); auto-activates if the store arrives; prod credentials never enter the executor.

- **DEC-023-B (2026-08-30, ratified — plan-gated substitute):** CI fast lane — "E2E changed specs" runs the pushed spec files right after preflight (both projects, workers=2, E2E_SHARD=changed); SIGNAL-ONLY: continue-on-error, never gates the merged verdict or promote; reporter labels its source 'changed'.

- **DEC-024 (2026-08-30): shard capacity = 2 workers** under the fixture-identity law (run × shard × worker × project × test); smoke stays serial. Pre-committed revert rule: any cross-worker interference class returns the knob to 1 before diagnosis.

- **S31 (2026-08-29):** PHASES U2b + U3 (incl. U3a/U3b) — COMPLETE; CI fully green on the production-build harness (17/17, run 33228828535 closed the harness epoch; current green e722f15); operator walk PASSED in full (audit stats/filters/inline detail/sparkline; impersonation arc: reason gate, step-up, banner-follow, countdown, End-now, dual audit rows; View-as absent on self). U2b: DEC-017 shipped (migration 20260822065530 — assignable flag, 18 reserved rows, live user-baseline badges, proofs P1–P5, RP-11/12; typed-role-key delete confirm ruled a wrong-target guard and retained). U3: migration 20260822073000 — impersonation_sessions (deny-all RLS) + begin/end/get_active + box-verified read RPCs + admin_list_audit/facets/stats, all definer-gated; audit viewer on the primitives; impersonation v1 read-only by construction with every DEC-016 guardrail; IMP-1..5 + AS suites green. U3a (walk): audit detail expands inline beneath its row (DataTable expandedRow slot — INC-092); impersonation copy states the read-only model; "Impersonation — model & roadmap" documented. U3b (walk): Events-per-day became a bounded sparkline (≤160px, normalized, sparse labels — INC-093); audit locators unified under the auditSurface twin helper after the class fired in both directions (INC-084c fifth and sixth — mechanical rule: DataTable specs declare their twin-aware helper first). HARNESS EPOCH (DEC-018/019, closed under G22): five layered root causes found and fixed with captured evidence — platform lint-gate injection (INC-087, per-file E5 exemption law), sandbox-detected nitro target (INC-085e, pinned + build-verify step), CSS-minify hash fork between SSR and client graphs (INC-085h, cssMinify pinned), the wrangler compatibility-date time bomb (INC-088 → DEC-019), and two production-timing React #185 loops — Radix composeRefs under Slot-over-mapped-children (INC-089) and usePermissions identity churn into effect deps (INC-090) — plus the footer-inset clamp law corrected to pull-based measurement (INC-085i/093). Evidence system completed: merged per-source reporter with error-context quoting on full titlePath, [ssr-error]/[client-error] tag-greps, zero-test runner-death classification with full-log ERROR extraction, never-silent self-report, PLATFORM-ORIGIN labeling; fixture laws (captured-not-authored; git ls-files tracking proof — INC-084f/091). Instructions v1.7 (G20 evidence fidelity, G21 artifact-first, G22 harness closure) and Knowledge v3.2 (A6/E5 extensions; I1–I3 runtime-stability laws) installed by operator. DEC-020 RATIFIED (implementation next); DEC-021 registered with the operator requirement verbatim (ACT-U3-1). ROADMAP REORDER (operator-directed 2026-08-29): U4 = Translations console (data-translation infrastructure precedes the data-heavy phases; name_am review becomes continuous), U5 = Locations. Next: DEC-020 branch setup, then the U4 Translations spec session.

- **S32 (2026-08-31): PHASE U4 TRANSLATIONS — COMPLETE (U4a–U4e); CI green (19 jobs incl. the fast lane); operator walks PASSED (Walk B translator persona; Walk C real Google — 577 Oromo machine rows, 13 auto-flagged placeholders, public gate holding; U4e history/restore).** U4a: languages/ui_translations/translator_languages/entity_translations; DEC-017-pattern permissions (five actions, step-up on four, assignable); twelve definer RPCs incl. placeholder validator + coverage gate; locations name_am backfill (17). U4b: console (Languages page with coverage-gated publication; per-language strings editor with provenance/flag/approve/clear; Sync keys; translator-language assignment conditional on the target's effective permissions, seeded from the gated scope RPC); D3 runtime flip as an additive overlay (DB[lang] ▸ compiled[lang] ▸ compiled.en); TR-1..10. U4c: Google Cloud Translation v2 via a TanStack server route (platform blocks new edge functions — INC-096 ruling), caller-context gating, single-writer discipline, fake mode for CI (no key in CI), per-row AI + bulk fill, ui_translation_revisions capture on every write; TR-11..13 + TR-scope. U4d: entity_translations live — categories backfilled (97), locations adopted, Data console scope, anon entity bundle; public gate stays ui-scoped; service_role grants swept across pre-law tables with in-migration totality proof (INC-097c); TR-14/15. U4e: History drawer with restore-as-save; TR-16. Laws forged (INC-094→097): declared marks; overlay-not-replacement fallback chains; totality gates define the empty set (vacuous-complete publish hole + partial-grant census skip); scratch-key identity across all parallelism axes; fence languages for global sweeps; scratch entities over real-row fixtures; self-describing count assertions; fixture reads are service reads; rpc()/column names copied from declarations; server-route errors log into [ssr-error]; empty state is a caption never a control replacement; test builds keep prod asset identity. Supervisor slips logged (executor-overturned diagnoses ×3: route factory, invoker-blindness, fixture client — class rule: hypotheses stated as hypotheses until the decisive line is read). Instructions v1.7 + Knowledge v3.2/v3.3 installed; DEC-020 live (dev → promote-on-green → main; sync-main repair used once). Registered: ACT-U4-1 entity machine translation (REQ-004 engine); ACT-U4-2 SSR bundle inlining (root loader; client-merge limitation stands); ACT-U4-3 history prior-state chip polish; Ops security review backlog (has_permission client grant revoke candidate, 68 gated-definer linter warnings ruling, leaked-password toggle). NEXT: U5 Locations spec session — consumes entity_translations directly.
