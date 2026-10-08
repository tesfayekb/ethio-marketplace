# Launch-Gate Checklist (pre-real-users; none blocking current dev)

## Infrastructure / providers

- Custom SMTP sending domain in Resend (verify a domain; replace the test domain) — until then only the account-owner's address can complete signup or recovery.
- Cloudflare Turnstile account + enable the CAPTCHA toggle (DEC-010); test keys are already decided for staging.
- Production Google OAuth client + consent-screen verification — the current client is still in Testing mode, so only listed test users can complete the Google door.
- Update Supabase redirect URLs + Site URL from the Lovable preview/published URL to ethio.com at domain cutover.
- Dev/preview database separation — partially satisfied by ethio-staging; confirm the dev vs prod story before real users.
- Leaked-password protection toggle (Supabase Auth) — Pro-plan gated; enable on upgrade.
- Lovable project settings: Hide-badge ON, Visitor-analytics OFF (currently ON on the real project — square before launch), Auto-fix-security OFF (keep).
- ACT-U0-1: On Supabase Pro upgrade — set Sessions time-box to 7 days + inactivity timeout to 4 hours AND enable compromised-refresh-token detection, on ethio-prod AND ethio-staging. Until then the client session policy (U0k) is the effective enforcement.
- ACT-U3-1: DEC-021 full act-as impersonation builds in the Ops phase — prerequisite: the write-guard census across every user-writable table and RPC (impersonator_id refusal clause); requirement text in spec-ledger DEC-021 and docs/features/admin-audit-security.md.
- ACT-U4-1: entity machine translation rides the REQ-004 engine (deferred by design).
- ACT-U4-2: SSR inlining of the active language bundle (root loader) — client-merge limitation stands until then.
- Ops security review: has_permission client-callable for arbitrary targets (revoke candidate); 68 gated-definer linter warnings (ruling); leaked-password protection toggle.
- DNS cutover of ethio.com to this app behind the operator's Cloudflare zone: orange-cloud `ethio.com` and `www`, SSL/TLS mode checked (Full strict), Managed Transform "Add visitor location headers" ON (already on since 2026-09-16); acceptance = `/api/geo` answers `source: "cf-visitor"` with city and coordinates and the marketplace opens on the visitor's metro (DEC-063 amendment). Until then the guess is country-level. Rollback = grey-cloud both records.
- Partition rehearsal (REQ-033 amended 2026-09-16): ONE physical partition at launch; on staging, rehearse the Ethiopia split as a copy by predicate (`home_country_code = 'ET'`, media keys under `et/`) plus one storage-adapter entry and the partition function flip, and record the runbook — the in-country pair (database + object storage: Ethio Telecom Cloud if its S3 API checks out, else MinIO on Wingu/Raxio) is stood up on the licensing trigger, not before. Counsel (Q-014): photos as personal data; edge caching as transfer; ECA registration.
- Moderation go-live (docs/governance/moderation-design.md): the dials table seeded and reviewed; the weekly 50-item calibration sample scheduled with an owner; first-round appeals automated and tested; the admin notification on a disagreeing hold wired; the severe-category list ratified by the operator.
- Counsel (Q-014, DSA): whether the platform is an "online marketplace" under Art. 30 (off-platform contracts) and whether the micro-enterprise exemption applies; statement-of-reasons, notice-and-action, internal complaint and repeat-misuse suspension are built regardless; the business-seller traceability seam stays empty until ruled.

## Secrets

- Rotate ALL service-role keys that transited tooling: the ethio-staging key (held in GitHub Actions) and the ethio-prod key (held in the Lovable secret store). Precautionary but mandatory before real users.

## Re-run at launch, and after any Supabase Auth / GoTrue version change

- D-8 and D-10 manually against the production project, per docs/features/auth-google-door.md. The linking behaviour is a dependency's, not ours, and has no automated coverage.
- `scripts/deny-tests/p1f-identity-unlink.ts --recheck` (both phases) for INC-024. Our unlink-kills-password trigger mirrors GoTrue's own replace-path semantics; if the dependency starts nulling the password itself, or changes `auth.identities` deletion behaviour, the trigger must be re-verified.
- Guard Proof workflow, to confirm the B-3/C-4 fixtures still bite against the current auth surface.

## Content / compliance

- Native-speaker review of all Amharic copy — auth, settings, and transactional emails (supervisor verified meaning only, not register/tone).
- EXIF strip live before any image-upload feature ships (DEC-009 — phase-gate, tracked here for visibility).
- ECA registration / Ethiopia data partition — Ethiopia-entity milestone (DEC-008), ~year 1.

## Brand

- **Professional trademark clearance of the ethio.com woven-diamond mark and wordmark before commercial use.** The mark in `src/components/brand/logo.tsx` is a WORKING logo and must not be represented as cleared.
- STANDING DESIGN RULE (not a gate item, recorded here for visibility): the tibeb motif is religiously neutral geometry only — no cross or faith iconography of any tradition, ever; it appears only as logo, spinner and empty-state mark. See `docs/features/panels.md`.
- Native-speaker review of the new shell/panel/feed Amharic copy is folded into the Content/compliance review above.

## WATCH

- Ethereal accounts are **ephemeral**. If staging E2E mail fails unexpectedly, re-create the Ethereal credentials FIRST — before diagnosing the app, the harness, or Supabase.

## Deferred quality gates (design foundation)

- [ ] **Lighthouse budget on the marketplace path.** The bundle-budget job
      measures bytes, which is a proxy. Real LCP/CLS/TBT on a throttled mobile
      profile has not been measured and must be before real users.
- [ ] **Visual-regression baselines for the shell.** Grid geometry, the logo
      FIT rule and dark mode are asserted numerically, which catches structural
      breakage but not visual drift (spacing, weight, colour). Screenshot
      baselines at 360/768/1280 in both modes are still owed.

## Handed forward from the translation era (S33)

- ACT-U4-4 (spec-lint sweep, 38 sites) · ACT-U4-5 (entity revisions/flags) · ACT-U4-6 (injection un-park per DEC-029) · ACT-U4-7 (spec split for shard balance) · ACT-U4-8 (import-batch history).
- Translation post-launch set: TM/glossary, ICU plural validation, four-eyes approval, missing-key telemetry, entity MT via REQ-004 (ACT-U4-1), SSR bundle inlining (ACT-U4-2), history chip polish (ACT-U4-3).

## Added 2026-10-05 (the lines the records of 2026-09-28 → 2026-10-05 owe this file; status as of dev = main `48d3c53b`)

Every line above stands as written; the status notes and new lines below come from the handoff `docs/governance/handoffs/2026-10-05-open-items-master.md` (section 3) and the ledger records landed with it. Launch means real users on ethio.com. The lawyer's review is NOT a launch blocker (standing ruling: counsel reviews at the Ethiopia-entity milestone); the supervisor's "lawyer's read before launch" of 2026-10-04 was withdrawn.

### Status notes on existing lines

- [x] EXIF strip (Content / compliance above) — DONE: `src/server/media/strip.ts`, confirmed real in the code census of 2026-10-04 (DEC-009, REQ-036).
- [x] Contact-permissions defect "must be closed before launch" — DONE: INC-389 fixed by bundle 3 (M1 and M1b; test PR-21).
- [x] "Tightening the alias rules before launch" — DONE: the seller-name rules DEC-107 built in bundle 3 (M2, M4, M4b, M4c).
- [ ] Leaked-password protection toggle — UNKNOWN: the line above says Pro-plan gated; the security census of 2026-09-28 (`docs/tracking/security-scan-2026-09-28.md`) lists "Leaked Password Protection Disabled" as a warning, and the record of 2026-09-29 says the toggle was then enabled by the operator; the line was never updated. Confirm on the Supabase Auth settings of ethio-prod.
- [ ] Ops security review — NOT DONE; the `has_permission` grant is INC-409 (SECURITY DEFINER, executable by every signed-in user, answers for any user id; used by 62 policies; a guard needs a census of its callers first; queued in the close-out bundle). The gated-definer linter warnings: 68 in the line above, later counted 161, 163 and 164 (no census explains the differences); the 2026-09-28 "by design" ruling rests on an audit that was promised and never run.
- [ ] DNS cutover of ethio.com (line above) — NOT DONE. With it, on the same day: the R9 redirects, the two 2020 pages coming down, the Cloudflare bot rule, the Supabase redirect URLs (all below and above). Until then the location guess is country-level.
- [ ] Re-run at launch: the Guard Proof workflow has not been dispatched since 2026-08-03 and must first be brought onto the current harness (ACT-C3-1) — NOT DONE.

### Legal (DEC-128, DEC-129, DEC-130 — 2026-10-04; drafts v1 pre-counsel in `docs/spec/legal/`)

- [ ] The legal pages `/terms` and `/privacy` and the acceptance at sign-in are LIVE (L1): versioned documents in the admin console, one required tick "I am 18 or older and I agree to the Terms and the Privacy Policy." for all three doors and existing accounts, the record per acceptance, the latest accepted versions on the profile row, the publishing certification on publish, edit and renew — NOT DONE (DEC-128, DEC-129; L1 is the first build after bundle 4).
- [ ] Every feature the legal texts describe is live, or its clause is removed, before version 1 is published — NOT DONE. The list (README of the drafts): versioned acceptance at sign-in; the publishing certification with country statements; the e-mail announcing a change; the sold / no-longer-available label, the seller's own list, the 12-month copy and timed erasure; in-app messages and blocking; the appeal of a rejection and review by a person on request; the steps of enforcement (warning, lower ranking, restriction, ban); converted prices and automatic translation of ads; promoted ads; help from staff inside an account; copy, export and deletion of a user's data on request; the security check at sign-up; also the Report button and the posting on ethio.com's own channels (DEC-129).
- [ ] The three mailboxes exist: legal@ethio.com and privacy@ethio.com (operator: "YES, WILL CREAT"), and security@ethio.com (named by the drafts and by clause B10; nobody was asked to create it) — NOT DONE (operator).
- [ ] The DMCA designated agent is registered with the United States Copyright Office — NOT DONE (operator, guided by the supervisor at launch-checklist time): 6 US dollars, renewed every three years; the form asks for a phone number, so a separate number that goes to voicemail is used there (no phone number is printed in the Terms); without the registration the protection United States law gives a platform against copyright claims over users' posts does not apply (DEC-129 records; Terms 15).
- [ ] The e-mail announcing a material change to the legal documents is live before the first material change after launch — NOT DONE (needs the notifications pipeline REQ-031 and the Resend sending domain above; until then the acceptance screen is the notice; DEC-129).
- [ ] Retention is LIVE (L2): the sold / no-longer-available ribbon 30 days, My ads 12 months, the deleted copy 12 months, case close + 3 years, account identity 12 months, technical records 12 months incl. the Supabase auth session and audit rows, the hold flag, the restricted audited archive, the purge job with a heartbeat — NOT DONE (DEC-130; built with the My ads screens after L1).
- [ ] The Report button on every ad (reasons incl. "appears to be under 18" and copyright; replaces the address in Terms 15; until built, reports go to legal@ethio.com) — NOT DONE (REQ-026; DEC-128).
- [ ] The "Your data" page (a copy or a deletion requested in the app, identity confirmed by a fresh sign-in; until built, by hand through privacy@ethio.com) — NOT DONE (REQ-012.4; the gap register's "GDPR export/deletion").
- [ ] The buyer safety line beside the seller's contact on every ad — "ethio.com does not verify sellers or ads. Inspect before you pay." — NOT DONE (the REQ-028 buyer banner; no such line in `en.ts`; built with L1, DEC-129).
- [ ] A United Kingdom children's access assessment within three months of opening the UK — NOT DONE; the supervisor drafts it (DEC-128).
- [ ] A re-check of the United Arab Emirates child digital safety law before its grace period ends (in force January 2026, one-year grace) — NOT DONE (supervisor; DEC-128).
- [ ] The counsel list of six, for the lawyer at the Ethiopia-entity milestone (NOT a launch blocker): the EU/UK → US data-transfer mechanism (the draft names none); which countries the sanctions line in Terms 2 closes; whether the liability limit and the warranty exclusion in Terms 12 must be printed more prominently for a United States court; whether California's privacy law applies; whether the copyright agent's phone number must also be printed on the site; how far the right in Terms 5 to act without notice holds for EU and UK users — NOT DONE. Also parked for counsel: an arbitration clause; whether a self-declaration meets Ethiopia's and Kenya's age wording; Ethiopia's one-year traffic-log rule (REQ-035 matrix); the DSA item Q-014 above now carries DEC-128's country-law notes.
- [ ] A native speaker has read the Amharic legal text (`docs/spec/legal/*.am.md`; the Content / compliance line above covers it), and the spelling of "Ethio.com LLC" matches the registration — NOT DONE (operator).
- [ ] Legal check before launch (operator): the consent wording of the contact switch under Ethiopia's Personal Data Protection Proclamation 1321/2024; the display of a previous seller name ("previously <old name>" for 365 days, DEC-107) against the right to erasure or correction — NOT DONE.
- [ ] The two 2020 pages (`/terms-of-use/`, `/privacy-policy/` on the old site) come down the day the new site replaces the old one; carried-over accounts accept version 1 at first sign-in — NOT DONE (with the DNS cutover).
- [ ] The "Prohibited & Restricted Items" policy (`c25-prohibited-restricted-items-policy-DRAFT.md`, EN/AM with a screening-term list) — NOT DONE: counsel review before publication; its screening terms, the alcohol word list of the C28 catering note and the gambling ban (operator "BAN THEM", 2026-10-04; REQ-028) feed the moderation build.

### Repository, hosting and search

- [ ] The repository goes PRIVATE at launch (DEC-116, 2026-10-03: public while building, "best to hold on that until launch") — NOT DONE. Order fixed: attach the repository to the supervisor's session first and test the access (the session reads it as a public visitor today), only then switch; decide the CI-minutes cost plan then (GitHub Actions is billed on a private repository — ESTIMATE about 160 billable minutes per completed run, about $0.96 a run, $300–600 a month at the pace of early October; GitHub's runners or a runner of our own, which is a harness change needing its own DEC under G22; the offer "full suite only on the last push of each turn" awaits the operator). Until then: a glance every week or two at GitHub Traffic (forks, stars, watchers, referring sites); the committed `.env` holds publishable values only (INC-000); detailed notes on an open security hole enter the repository only after the fix is live.
- [ ] Cloudflare AI-bot block and a rate rule once ethio.com points at the new app — NOT DONE; the executor's report on whether a bot filter can sit in front of the published site was promised to the operator and never asked of the executor (G25). `public/robots.txt` already refuses the AI training crawlers by name.
- [ ] Redirects from the old site (visibility rule R9, ACT-G3): the home page and `?lang=am` carry over; old category and business pages are mapped; gambling-spam and test pages answer "gone"; the executor platform's published address names ethio.com as the preferred address — NOT DONE. From the Search Console read of 2026-10-02: the six businesses whose old pages drew the search traffic (Qulubi International Mart, Selam Photo Studio, Ahadu Kitchen Appliance, Meskel Restaurant and Mart, Lion Insurance Tax Services, a traditional-cloth-to-order page) are the first to be invited back; shop pages need the business type and city in the title; Amharic category titles.
- [ ] Google Search Console: ownership of ethio.com is verified (2026-10-02, "Domain name provider" — a DNS record in the Cloudflare zone that must stay); the second Performance export (reminder 2026-10-05 08:36 local; the first covered only 30 May – 18 June 2025) is owed by the operator, and if the data stays thin the old site's top pages come from Cloudflare's traffic report; the robots.txt report is to be looked at; NO sitemap is submitted until the browse phase — NOT DONE (export, robots report, sitemap at U7).
- [ ] The installable PWA (REQ-039: manifest, icons, offline shell, the project's own "Install" button, an "Open in Chrome" nudge for the Telegram and Facebook in-app browsers, a one-line iPhone hint) "before launch" — NOT DONE (ESTIMATE one or two executor turns).
- [ ] Keep the promise "We email you when a message arrives" on the contact step, or remove the line — NOT DONE (messaging U8 and notifications REQ-031 are not built).
- [ ] Esri (map tiles): confirm business use on the free tier; the API key created 2026-09-30 expires at most one year later and nothing warns before it does until Admin › Services (DEC-091) exists — NOT DONE (operator). The earlier "Cloudflare-hosted maps before public launch" is superseded by the Esri decision.
- [ ] Supabase: keep the spend cap ON; the Fair Use Policy applies from 2026-11-01 (the E2E account pool must be adopted "well before November 1"); staging log volume 41.8 GB against 20 GB included (billed from early 2027; ESTIMATE about 11 US dollars a month) is to be trimmed before 2027 — NOT DONE.

### Catalogue, languages and harness

- [ ] A Tigrinya speaker checks the six catering aliases of the C28 note (ጸብሒ ደርሆ, ቅልዋ, ሓምሊ, ጣይታ, ሕምባሻ, taita) before they enter any file; by the same rule, a native-reader check of the Amharic catalogue labels and aliases owed since 2026-09-29/30 and of the C29/C30 names — NOT DONE (operator finds the speaker).
- [ ] A native proofread of the Amharic column of the reserved seller-names list (`docs/data/reserved-names-v3.csv`; 360 of 435 names are the curator's own renderings; the 223 Ethiopian rows first) — NOT DONE; the list is seeded and in use, corrections can be loaded later (no loading method is described).
- [ ] INC-409 — the `has_permission` permission check (see the Ops security review note above) — NOT DONE; close-out bundle.
- [ ] INC-433 — the non-monotonic migration mark is healed (M7's `20261005040000` sits below M6's `20261005100000`; until the heal `max(version)` on both databases misreads the state; the next migration carries the UPDATE form the preflight understands and the mark rule gains "and above the ledger's current newest mark") — NOT DONE (low; the next migration — the engine batch or L1's first).
- [ ] DEC-083 — the server-error census becomes GATING from 2026-10-12 (after five consecutive runs with zero off-allowlist SQL-class lines; from that date a new allowlist entry needs a DEC); "listing not found" is still OFF the allowlist with 8 lines on run 37264070069 (INC-398; the INC-323 target was 5 per run) — NOT DONE: rule on the lines before the date, or the first run after it is red.
- [ ] A Lighthouse LCP budget per page class on this list (promised 2026-09-28 — "rather than pretend it exists"; REQ-003, REQ-029) — NOT DONE; the deferred quality gate above measures bytes only.
- [ ] From the phase ladder's launch-gate line and the gap register, none built or decided: backup and restore drill; watchdogs; PII export and deletion (the Your data page above); SEO/hreflang audit; error monitoring; full 2FA step-up; the product-analytics decision; the currency-rate source (REQ-032, REQ-040, REQ-016/030, REQ-018, REQ-034/035) — NOT DONE.

## Added 2026-10-07 (the bundle 7 records turn)

- [ ] Opening a market includes approving that country's name in Translations in every language the site carries — the catalogue's `{country}` token prints that name (recorded 2026-10-06 on the operator's question about new markets) — NOT DONE; per market, at its opening.
- [x] Leaked-password protection on ethio-prod — ON since 2026-10-07 10:33Z (the operator's switch; the platform's linter had listed it as off). Re-read after any change of plan at the provider (the feature is a paid-plan feature) and at the launch round. ethio-staging: off by decision; the next bundle decides it with a rule.
- [ ] INC-480 and INC-482 (privileges hygiene found by M11's census and the third database lint; bodies in the Project record) — NOT DONE; the first migration of the next bundle, read back on ethio-prod before real users.
- [ ] The code-scanning list on GitHub is empty after Part H (101 open alerts on 2026-10-07 before it; the upload now carries 0 results), and push protection is decided (the supervisor's call of 2026-10-09) — NOT DONE; the operator's next read of the Security tab.

## Added 2026-10-08 (the bundle 8 records turn)

- [x] INC-480 and INC-482 (the line of 2026-10-07 above) — DONE: M14 on ethio-prod since 2026-10-07 22:22Z; read back there — postgres's default privileges in schema public hand nothing to the two browser roles, the third database lint counts 12 (the named doors), and the migration check refuses a new function without its REVOKE. Re-read at the launch round with the five lint counts.
- [ ] Every Amharic text of the interface has been read by a person who reads Amharic — the admin countries console's is unreadable in many places (INC-489) and the script guard sees code points, not words — NOT DONE; the full read of `src/i18n/locales/am.ts` is in the tidy-up round, and the public pages' texts are read first.
- [ ] After the last Publish before opening: "Sync keys" pressed and the live text store compared with the code (INC-488) — NOT DONE; at the launch round.
