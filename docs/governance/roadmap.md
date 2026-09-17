# ethio.com — Roadmap (canonical; maintained at gates)

Updated: 2026-09-02 (S33). This file is the single place future work lives; chat memory is advisory.

## Done (gate-sealed)

U0 identity/shell · U1 users+step-up · U2 roles/permissions (DEC-017) · U3 audit/impersonation · **U4 a–k Translations (S32+S33): DB-truth i18n, Google MT with sentinel-protected placeholders, entity/data layer with universe+AI+approve-all, per-device ★ default, hreflang, notes/used-on/length/ETag-bundles/export-import(undoable)/pseudo-loc, language lifecycle (guided add, order, delete)** · Harness era: DEC-019..030 (dev→promote-on-green, declared marks, fast lane, 2-worker→6-shard matrix + shared build, @global-state serial law, flake ledger, quality floor 025-027).

## Next (in order)

### Next 1 — CATEGORY ERA (S34, spec RATIFIED 2026-09-02 — /docs/governance/category-era-spec.md)

D0 governance import → C1 taxonomy migration (113-node ratified tree, /docs/spec/category-era/) → C2 console + granular RBAC + visibility machinery (time windows, country exclusions, catch-alls) → C3 attributes completion (brand=attribute) → C4 tags (REQ-041) → C5 AI category images (3 variants/node, direct Gemini, A7 spike-gated). Era gate: four-lens review + name_am(categories) retirement on operator go.

### Next 1b — ATTRIBUTE DEFINITION v2 (DEC-050, P1) + THE REMAINING CURATION PASSES (operator sequencing 2026-09-11; review: /docs/governance/reviews/attribute-system-deep-dive-2026-09-11.md)

Electronics import → DEC-050 Pass-2 spec → P1 landings (units, bounds, relative year tokens, option-conditioned bounds, option `active`/`aliases`, text presets, Amharic help text, `range` retired, option coverage) → backfill imports for Vehicles, Real Estate and Electronics → the eleven remaining passes curated with the new cells (Fashion · Home & Garden · Services · Travel & Accommodation · Construction Material · Beauty & Personal Care · Sports & Leisure · Agriculture & Farming · Babies & Kids · Pets & Animals · Commercial Equipment; residue folds in: Auto Services cards → Services, heavy-machinery models → Commercial Equipment / Vehicles delta). Runs before Next 2; the Locations spec is drafted in parallel and its build interleaves when the executor is free. Rationale: a vertical curated before P1 needs a backfill; one curated after fills the cells once, by the thread inside the domain.

### Next 2 — LOCATIONS ERA — CLOSED 2026-09-17 (spec /docs/governance/locations-era-spec.md; closeout /docs/governance/reviews/locations-era-closeout-2026-09-17.md; the curator's standing cadence continues quarterly and at every market opening)

G0 governance import → L1a schema + ancestry trigger + ancestor columns + country profile (DEC-055) + coverage_plans (DEC-064) + granular permissions + admin RPCs → L1b `locations` import family (countries + locations files, undoable) → L1c public per-country tree route (ETag) → L2 console (Tree · Countries · Coverage · Import/Export tabs, C7) + E2E + DEC-062 reaper delta → L3 curator files (countries, Ethiopia-deep, diaspora; Amharic approval) → L4a geo-guess A7 spike (DEC-063 judge) → L4b shell picker on the cached tree + saved-area cookie → era gate (four-lens review; name_am totality). Hands to U6: prefill order, the coverage editor bounded by coverage_plans, A2 trigger retirement, the "my city isn't listed" door; to U7: the stream (DEC-065), profile browse location, per-card place.

2. **U6 Posting (spec RATIFIED 2026-09-16 — /docs/governance/u6-posting-spec.md, S39; census and media-storage memo beside it):** G1 governance import → A1 schema (posting read, validation authority DEC-051, capabilities DEC-052, lazy options DEC-053, price period DEC-067, search column, residency facts DEC-068, revisions, verdicts, rate limits DEC-071) → A2 the draft door (`submit_listing` re-declared whole; server-derived residency; coverage counted against plans; A2 trigger retired) → B1 photo strip route + storage adapter on R2 (DEC-069/075) with the REQ-036 deny-proof → B2 on-device pipeline → C1 wizard steps 1–4 with AI assist (DEC-072) and the YouTube link (DEC-073) → C2 steps 5–8, autosave, review/publish → D1 screening gateway + states + rate limits (DEC-070) → D2 human review console → E1 My Listings → E2 expiry job + reminders + renew/relist → era gate. Home country and contact preference captured inside the first posting; tags at U7; brands as attributes; one physical partition at launch (REQ-033 amended).
3. **U7 Browse/Feed:** geo-scoped feed (city→region→country→world auto-widen), search, filters from attributes, listing detail, storefront /@handle.
4. **U8 Messaging + seller contact channels;** notifications.
4b. **Bookings era (DEC-052 module; candidate U9; request-only under DEC-001):** availability, reservations state machine, notifications, conversations, RLS per party — after U8; launch-gate placement decided at its spec.
5. **Launch gate:** performance budgets, SEO/hreflang audit, security review closure (has_permission client grant ruling, 68 gated-definer warnings, leaked-password toggle), backup/restore drill, PII export/delete, legal pages.

## V2 / archived (return with DECs)

Payments/cart/checkout/payouts (v0.1 archive; DEC-001) · translation TM/glossary + ICU plurals + four-eyes + telemetry · entity MT engine (REQ-004) · Cursor as active second executor · DEC-023 local authed runs (plan-gated) · injection un-park (ACT-U4-6).

## Standing constraints

Lovable Cloud banned (portability) · palette locked (deep green #1E5A43, honey-gold accents; tibeb = neutral geometry only) · serial prompt discipline · kilobytes are the user's money.
