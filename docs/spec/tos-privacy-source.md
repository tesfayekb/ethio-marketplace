# ethio.com — Terms of Service & Privacy Policy SOURCE LEDGER
Version: v0.2 · 2026-07-29 · Status: LIVING DOCUMENT — grows with every REQ; becomes the source for lawyer-ready ToS + Privacy Policy before launch.
Rule: every new REQ with user-facing consequences adds its clause here in the same session (supervisor's job). Plain-language drafts; legal polish later.

## A. Terms of Service — clauses captured so far

**A1. What the service is (DEC-001):** a free classifieds marketplace connecting posters and viewers; ethio.com is an intermediary/venue, NOT a party to any transaction; no payments processed in v1; all dealings, payments, and deliveries are strictly between users.

**A2. Accounts (REQ-014/015/016):** sign-up via email, Google, or Telegram; email verification required before posting; users are responsible for securing their sign-in methods; adding/removing sign-in methods requires re-authentication; sessions expire after inactivity (~60 days); sensitive actions require fresh authentication.

**A3. Poster responsibility (REQ-028 — operator's core posture):** by posting, the user AFFIRMS the content violates no law and none of these terms; the poster is the author and bearer of responsibility for their content; the platform screens as an enforcement layer, not as an editor or endorser.

**A4. Prohibited content (REQ-028):** weapons/ammunition; illegal drugs; prescription medicines; sexual content/services; alcohol & tobacco; counterfeit goods; stolen goods; government documents; currency/gift-card trading; human-related services (organs, surrogacy brokering, trafficking-adjacent); endangered-wildlife products; hacking tools/malware; personal-data lists. PLUS per-country prohibitions ("khat rule"): content legal in one country may be prohibited for listings covering another; the country lists govern.

**A5. Screening & enforcement (REQ-009/010/011/028):** all content is screened automatically, including by AI; severe-category attempts freeze the account pending review; ordinary violations follow warn → demote → restrict → ban; attempted severe posts are retained as evidence; every rejection shows its reason and carries ONE appeal (deeper automated review; human escalation available on request — see B7); enforcement follows the person, not just the account (ban evasion via new accounts is itself a violation).

**A6. AI-assisted content (REQ-020):** the platform may offer AI-drafted titles/descriptions built ONLY from what the poster provided; the poster who accepts a draft adopts it as their own content and their responsibility (A3 applies).

**A7. Listings lifecycle (REQ-022):** listings expire per category defaults or poster-set dates; renewal is the poster's affirmation the item/service is still available; "sold" hides contact but keeps the post visible until expiry/removal; the platform may remove content that violates these terms at any time.

**A8. Pricing & currency (REQ-018):** the poster's stated currency and amount are the price of record; converted prices shown to viewers are APPROXIMATE conveniences, not offers; translations of user content are automatic and approximate — the original language text is authoritative (REQ-004).

**A9. Storefronts & handles (REQ-008/027):** handles are granted, not owned; impersonation of persons, brands, or institutions is prohibited; the platform may reclaim handles that infringe verified businesses or reserved names; verified badges require proof of identity; storefronts may be closed and reopened by their owner.

**A10. Messaging conduct (REQ-026/028):** in-app messaging cannot be disabled; harassment, spam, and scam solicitation are prohibited; users may block others; blocking is not appealable by the blocked party.

**A11. Assisted support (REQ-030 impersonation):** at a user's request, platform staff may view the user's account (excluding private message inbox) and assist with listing tasks on the user's behalf; such assistance is logged and attributed.

**A12. Promotion labeling (REQ-024):** promoted placements are labeled; in v1 promotion is free and granted at the platform's discretion.

**A13. Eligibility (operator decided 2026-07-29):** users must be **18 or older**; accounts of users found under 18 are closed. STILL OPEN: governing law & dispute venue; liability limitations & warranty disclaimers (lawyer-polish stage); notice-and-takedown process for IP complaints.

## B. Privacy Policy — clauses captured so far

**B1. What we collect (REQs 5/14/17/23):** account identifiers (email/Google/Telegram references, incl. Telegram-verified phone); profile data the user provides; listings and content; in-app messages; approximate location (IP-derived first guess, user-correctable — never precise GPS in v1); aggregate usage counters (category/listing views per region); device/session records; enforcement and consent records.

**B2. What we DON'T collect (REQ-005/019/021):** precise GPS location; photo hidden metadata (EXIF/GPS is STRIPPED from uploads — stated as a user protection); no SMS phone verification in v1.

**B3. Message visibility (REQ-026 — stated plainly):** in-app messages are NOT end-to-end encrypted; the platform can access them for safety screening and abuse-report handling; off-platform calls/texts/emails are invisible to the platform.

**B4. Public vs private (REQ-027):** listings and storefronts are public (and cached/served globally); users control their public presentation (anonymous display, chosen display names); the platform always knows the account behind a public face.

**B5. Where data lives (REQ-012/033/035):** users' personal data is stored in their home-country partition; Ethiopian users' personal data is stored in Ethiopia; public listing content is served globally; cross-border conversations (e.g., messaging a seller in another country) are stored in the seller's country — users are notified and asked for consent the FIRST time they start such a conversation, and consent is recorded (statutory basis: informed explicit consent per Proclamation 1321/2024 transfer conditions).

**B6. Your rights (REQ-012.4/035):** access, correction, deletion, export (portability), restriction, and objection — including objection to automated decisions with human review available on request; requests honored regardless of country, to the strictest applicable standard.

**B7. Automated decisions (REQ-011/028/035):** content and enforcement decisions are made by automated systems including AI; appeals trigger deeper review; human review available on request for enforcement actions.

**B8. Breach notification (REQ-035):** breaches are notified to the relevant authority and affected users within 72 hours of awareness (Ethiopian users: ECA per Proclamation 1321/2024).

**B9. Retention (Pass 2 to finalize):** expired/sold listings retained in seller dashboards; enforcement evidence retained per REQ-009; deletion requests honored with narrow legal carve-outs (e.g., minimal record of why an account was removed).

**B10. Security (REQ-021/029/030/032):** centralized input screening; encryption in transit and at rest; encrypted backups; access controls with audit logging; security contact: security@ethio.com.

**B11. OPEN — needs decision:** cookie/local-storage notice text; analytics disclosure specifics; data-sharing statement (v1: no sale of data, no third-party ad sharing — CONFIRM as policy); contact address for privacy requests.

## C. Consent capture points (build checklist)
1. Signup: ToS + Privacy acceptance (versioned, timestamped).
2. First post: A3 responsibility affirmation (per REQ-028, every post).
3. First cross-border conversation: B5 transfer consent (recorded).
4. Assisted support: A11 consent affirmation (admin-side checkbox, logged).
5. ToS updates: re-acceptance flow on material changes (versioned diffs kept).
