# ethio.com — Roadmap (canonical; maintained at gates)

Updated: 2026-09-02 (S33). This file is the single place future work lives; chat memory is advisory.

## Done (gate-sealed)

U0 identity/shell · U1 users+step-up · U2 roles/permissions (DEC-017) · U3 audit/impersonation · **U4 a–k Translations (S32+S33): DB-truth i18n, Google MT with sentinel-protected placeholders, entity/data layer with universe+AI+approve-all, per-device ★ default, hreflang, notes/used-on/length/ETag-bundles/export-import(undoable)/pseudo-loc, language lifecycle (guided add, order, delete)** · Harness era: DEC-019..030 (dev→promote-on-green, declared marks, fast lane, 2-worker→6-shard matrix + shared build, @global-state serial law, flake ledger, quality floor 025-027).

## Next (in order)

1. **U5 Categories & Locations (S34 spec first).** Import the real taxonomy from apex-marketplace (~112 categories to leaf depth, per-category icons + attribute definitions — the A1 plan): admin CRUD on categories/locations consuming entity_translations for names (name_am column retires into the entity layer); location tree Ethiopia-first (country→region→city, slugs, is_active) with diaspora countries seeded; attribute schema per category (types, required, filterable) mirroring apex's model where it fits mobile-first; browse nav + breadcrumbs already consume the translated names. Deliverables: migrations with proofs, admin consoles on the DataTable primitive (C7), E2E per feature, translations Data scope picks the new rows up automatically.
2. **U6 Posting (phases A–E, foundations-first as planned in the July arc):** A schema+draft lifecycle · B media pipeline — **Risk #1: images** (client compression, EXIF strip, variants, storage rules; budget: feed cards light on Ethiopian mobile) · C posting form (category-driven attributes, validation, translation-ready) · D REQ-021 AI screening gateway at submit · E my-listings management. Each phase: spec → approval → build → E2E → walk.
3. **U7 Browse/Feed:** geo-scoped feed (city→region→country→world auto-widen), search, filters from attributes, listing detail, storefront /@handle.
4. **U8 Messaging + seller contact channels;** notifications.
5. **Launch gate:** performance budgets, SEO/hreflang audit, security review closure (has_permission client grant ruling, 68 gated-definer warnings, leaked-password toggle), backup/restore drill, PII export/delete, legal pages.

## V2 / archived (return with DECs)

Payments/cart/checkout/payouts (v0.1 archive; DEC-001) · translation TM/glossary + ICU plurals + four-eyes + telemetry · entity MT engine (REQ-004) · Cursor as active second executor · DEC-023 local authed runs (plan-gated) · injection un-park (ACT-U4-6).

## Standing constraints

Lovable Cloud banned (portability) · palette locked (deep green #1E5A43, honey-gold accents; tibeb = neutral geometry only) · serial prompt discipline · kilobytes are the user's money.
