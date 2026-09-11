# ethio.com — Roadmap (canonical; maintained at gates)

Updated: 2026-09-02 (S33). This file is the single place future work lives; chat memory is advisory.

## Done (gate-sealed)

U0 identity/shell · U1 users+step-up · U2 roles/permissions (DEC-017) · U3 audit/impersonation · **U4 a–k Translations (S32+S33): DB-truth i18n, Google MT with sentinel-protected placeholders, entity/data layer with universe+AI+approve-all, per-device ★ default, hreflang, notes/used-on/length/ETag-bundles/export-import(undoable)/pseudo-loc, language lifecycle (guided add, order, delete)** · Harness era: DEC-019..030 (dev→promote-on-green, declared marks, fast lane, 2-worker→6-shard matrix + shared build, @global-state serial law, flake ledger, quality floor 025-027).

## Next (in order)

### Next 1 — CATEGORY ERA (S34, spec RATIFIED 2026-09-02 — /docs/governance/category-era-spec.md)

D0 governance import → C1 taxonomy migration (113-node ratified tree, /docs/spec/category-era/) → C2 console + granular RBAC + visibility machinery (time windows, country exclusions, catch-alls) → C3 attributes completion (brand=attribute) → C4 tags (REQ-041) → C5 AI category images (3 variants/node, direct Gemini, A7 spike-gated). Era gate: four-lens review + name_am(categories) retirement on operator go.

### Next 1b — ATTRIBUTE DEFINITION v2 (DEC-050, P1) + THE REMAINING CURATION PASSES (operator sequencing 2026-09-11; review: /docs/governance/reviews/attribute-system-deep-dive-2026-09-11.md)

Electronics import → DEC-050 Pass-2 spec → P1 landings (units, bounds, relative year tokens, option-conditioned bounds, option `active`/`aliases`, text presets, Amharic help text, `range` retired, option coverage) → backfill imports for Vehicles, Real Estate and Electronics → the eleven remaining passes curated with the new cells (Fashion · Home & Garden · Services · Travel & Accommodation · Construction Material · Beauty & Personal Care · Sports & Leisure · Agriculture & Farming · Babies & Kids · Pets & Animals · Commercial Equipment; residue folds in: Auto Services cards → Services, heavy-machinery models → Commercial Equipment / Vehicles delta). Runs before Next 2; the Locations spec is drafted in parallel and its build interleaves when the executor is free. Rationale: a vertical curated before P1 needs a backfill; one curated after fills the cells once, by the thread inside the domain.

### Next 2 — LOCATIONS ERA (DEC-033; carries the S34-U5-draft locations section unchanged)

Ethiopia-deep tree + diaspora seed, ancestry trigger, locations console, country activation — begins after C5 and Next 1b (operator sequencing 2026-09-11).

2. **U6 Posting (phases A–E, foundations-first as planned in the July arc):** A schema+draft lifecycle · B media pipeline — **Risk #1: images** (client compression, EXIF strip, variants, storage rules; budget: feed cards light on Ethiopian mobile) · C posting form (category-driven attributes, validation, translation-ready) · D REQ-021 AI screening gateway at submit · E my-listings management. Each phase: spec → approval → build → E2E → walk. U6-A also lands DEC-051 (the single listing-attribute validator and the `attrs` shape, `other` captured in it) and DEC-052's `capabilities` column.
3. **U7 Browse/Feed:** geo-scoped feed (city→region→country→world auto-widen), search, filters from attributes, listing detail, storefront /@handle.
4. **U8 Messaging + seller contact channels;** notifications.
4b. **Bookings era (DEC-052 module; candidate U9; request-only under DEC-001):** availability, reservations state machine, notifications, conversations, RLS per party — after U8; launch-gate placement decided at its spec.
5. **Launch gate:** performance budgets, SEO/hreflang audit, security review closure (has_permission client grant ruling, 68 gated-definer warnings, leaked-password toggle), backup/restore drill, PII export/delete, legal pages.

## V2 / archived (return with DECs)

Payments/cart/checkout/payouts (v0.1 archive; DEC-001) · translation TM/glossary + ICU plurals + four-eyes + telemetry · entity MT engine (REQ-004) · Cursor as active second executor · DEC-023 local authed runs (plan-gated) · injection un-park (ACT-U4-6).

## Standing constraints

Lovable Cloud banned (portability) · palette locked (deep green #1E5A43, honey-gold accents; tibeb = neutral geometry only) · serial prompt discipline · kilobytes are the user's money.
