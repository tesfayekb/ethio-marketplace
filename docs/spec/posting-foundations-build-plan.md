# ethio.com — Posting Foundations: Final Build Plan

> SUPERSESSION NOTE (2026-09-02): all category-system content in this plan (the A1 taxonomy/attribute import design, §2 category system, §3.1) is superseded by /docs/governance/category-era-spec.md and the ratified artifacts in /docs/spec/category-era/. Phases covering the posting flow itself remain current.

Status: OPERATOR-DECIDED scope, informed by direct study of the Apex repository
(github.com/tesfayekb/apex-marketplace). This supersedes the open questions in
posting-flow-spec.md Part E — all six decisions are now made. This document is the
executable sequence.
AMENDED 2026-08-07 by DEC-013: §4 replaced (R→A→B→C→D→F→G); §6 replaced. See spec-ledger DEC-013.

---

## 1. Final v1 scope (operator decisions, locked)

1. **Category images:** AI-generated at category CREATE/EDIT time (admin flow). The AI
   generates candidate images; the ADMIN selects and saves ONE per category. Every listing
   in that category without its own photo shows the category image. Not per-user, not
   per-listing. (Apex reference: `generate-category-image` edge function — Gemini-based,
   outputs WebP+PNG, batch mode for categories missing images, watermark-free square
   icons.)
2. **Title/description:** MANUAL in v1. The AI "Generate" button (Apex:
   `ai-generate-listing-content`) is a later pass.
3. **Map pin:** IN v1. (Apex reference: Mapbox via `get-mapbox-token` edge function +
   Leaflet UI.) Heavy dependency handled by code-splitting: the map loads ONLY on the
   posting/detail routes, never the browse path (bundle-budget + marketplace-weight guards
   enforce this).
4. **Sellers:** PERSONAL-only in v1 (alias + contact methods). Business accounts /
   storefronts / store URLs are their own later phase (REQ-008).
5. **Stock/SKU:** OMITTED. Single-item classifieds in v1.
6. **Screening:** the THREE-TIER AI model (operator-agreed):
   - AI confidently approves → auto-publish (the vast majority),
   - AI confidently rejects (clear ToS violations) → auto-reject WITH an appeal path,
   - AI uncertain → small human review queue.
   Trajectory: as the AI proves itself, the human queue narrows — the stated goal is
   minimal-to-no human intervention over time. AI reviews EVERYTHING: text, images, and
   user conduct, with graduated enforcement.

---

## 2. What the Apex repository provides (studied directly)

Apex is a production-grade reference for nearly every system we need. Key findings:

### The AI moderation pipeline (maps exactly to our three-tier model)
- `ai-moderate-content` — text+image moderation returning
  `recommendation: approve|flag|reject`, `confidence`, `requiresHumanReview`, severity-
  graded flags. Content-type-specific rule contexts (listing_title, description, review,
  message). **Heavily security-hardened**: prompt-injection detection (fuzzy matching,
  encoding attacks, Unicode homographs, special tokens), canary-token leak detection,
  output validation, rate limiting, threat-event logging, and a RULE-BASED FALLBACK when
  the AI is unavailable (graceful degradation — important).
- `ai-moderate-image` / `ai-validate-media` — image screening.
- `ai-validate-listing-content`, `ai-validate-alias`, `ai-validate-business-name`,
  `ai-validate-category` — field-level validators used inside the wizard.
- `ai-process-strike` — the ENFORCEMENT system: violations → strikes
  (minor/moderate/severe) → escalation (warning → strike → suspension → ban), with a
  TRUST SCORE (starts 100, deductions per strike level), strike EXPIRATION (90 days),
  and settings-configurable thresholds. This is graduated enforcement, far better than
  binary restriction, and matches the operator's "restrict users for violations" intent
  with built-in proportionality.
- AI provider: the Lovable AI gateway (OpenAI-compatible) via `LOVABLE_API_KEY` /
  `OPENAI_API_KEY`. Models are called through one shared layer.

### The posting wizard (the 8-step flow, working code)
- `src/features/listings/components/wizard/` — ListingWizard shell + WizardNavigation +
  WizardProgress + steps: CategoryStep, MediaStep, AttributesStep, ContentStep,
  PricingStep, LocationContactStep, ContactStep, ReviewStep. Plus hooks:
  `useUnifiedValidation`, `useAIContentGeneration`.

### Category system
- Self-referencing `parent_id` + auto-maintained `depth` column (trigger), ~112
  categories with per-category icons (lucide names + `suggest-category-icon` AI helper)
  and per-category AI images (card image 512×512 + social/OG image 1200×630, separate).
- Admin CRUD: add/edit/delete/deactivate, add-subcategory, missing-assets finder,
  SEO tab (meta title/description, Google product category), visibility tab.

### Supporting systems
- `get-mapbox-token` — server-side Mapbox token delivery (key never in client bundle).
- Location: `detect-location`, `validate-location`, `auto-add-location`,
  `process-location-request` (the "add my city" review flow), `seed-country-data`.
- `export-user-data`, `delete-user`, `deactivate/reactivate-user` — account lifecycle.

---

## 3. Reconciliations (Apex ≠ ethio; decisions for the specs)

1. **Category tree model.** Apex: self-referencing `parent_id` + `depth`. Ethio: canonical
   `categories` + `category_tree_pointers` (pointers-not-copies, REQ-017, chosen so one
   category can appear under multiple parents). RESOLUTION: keep OUR pointer model (it's
   deliberate and superior for browse), and import the Apex/ethio.com taxonomy INTO it —
   the seed writes canonical nodes + pointer edges. Leaf detection = "no child pointers".
2. **Attributes.** Ethio's `category_attributes` schema already matches the need
   (attr_key/type/options/required). Seed the real per-category attribute data from the
   Apex taxonomy's attribute definitions.
3. **Security standards.** Apex's edge functions are strong; ours must ALSO pass our
   standing rules (deny-by-default RLS, seam-only writes, CI guards, secrets hygiene,
   idempotent migrations). Every adapted function gets our Tier-A treatment: behavioral
   proof + deny-case proof + live read-back.
4. **AI provider & spend.** Apex uses the Lovable AI gateway. Ethio must decide the
   provider account/keys (Lovable AI gateway vs direct OpenAI/Gemini/Anthropic keys) —
   an OPERATOR item (spend + account setup) surfaced at the AI-screening spec, not
   assumed. Keys live in Supabase secrets, never the client (get-mapbox-token pattern).
5. **Mapbox account.** The map needs a Mapbox token (paid tier at scale) — OPERATOR item
   at the F11 spec.

---

## 4. The build sequence (DEC-013: R → A → B → C → D → F → G)

Each item = its own Pass-2 spec → operator approval → execution prompt → fresh-clone
verification → CI green. Serial discipline throughout.

### PHASE R — RBAC core (Tier A; DB layer only, no admin UI) — DEC-013
Shield-lineage model per REQ-030 (Apex ADR-001 as direct reference — resources →
permissions → roles → users, Filament Shield heritage; Apex migration 20260105071112 as
schema donor): tables resources, permissions(resource_id, action), roles (priority,
is_system), role_permissions, user_roles (+country scope), audit_log; has_permission()
STABLE SECURITY DEFINER as sole authority; get_role_hierarchy(); is_system DB triggers
refusing UPDATE/DELETE even for superadmin; last-superadmin protection; requires_step_up
seam column; seed 3 system roles + superadmin bootstrap (operator account); retrofit
admin-write policies across all existing tables; deny-case tests; route↔permission CI
guard armed; panel routing on real permissions, redirect-not-dead-end.
HARD PERFORMANCE CONSTRAINTS (operator directive 2026-08-07):
(1) has_permission() never appears in hot public-read policies — the anonymous/regular
    browse path is unchanged byte-for-byte;
(2) regular users carry no roles (ownership RLS covers buyers/sellers);
(3) staff permissions = one cached session fetch (TTL + invalidate-on-role-change;
    no caching under impersonation);
(4) the permissions client module code-splits with admin routes — zero marketplace-bundle
    cost; browse-path files may not import permission hooks (CI-guarded).
Deliverables: migration set + seeds, deny-case proofs, live-DB read-back,
route↔permission guard green, panels wired to real permissions, audit_log receiving its
first entries. E2E: permission-denied redirect path.

### PHASE A — Data foundations (no AI, no UI; migrations + seeds)
Unchanged content: A1 (F1+F5) real category tree + attributes import → A2 (F2)
listing_locations → A2b (F10) exact-location columns → A3 (F12+F13) seller profile
foundations. All new tables write their policies against has_permission() at birth.

### PHASE B — The posting wizard (v1, manual content, stub screening)
B1 wizard steps 1–8 (as previously specified) → B2 (F3) image pipeline (DEC-009 gate
closes) → B3 (F15) listing detail card + review/preview → B4 (DEC-013): per-action rate
limit on post (REQ-038 first consumer) + ToS/Privacy v1 pages (Step-8 dependency,
pre-counsel per DEC-013 §6) + My Listings management basics (edit/renew/mark-sold).

### PHASE C — Admin epoch
C1 admin categories console (RBAC exists — Phase R) → C2 (F4) category image generation
(OPERATOR ITEM: AI provider account/key) → C3 translation dashboard (REQ-002 S10; Tier A
surface: step-up, audit-logged, AI pipeline through REQ-021) → C4 Users page + role
assignment (+narrow impersonation when ruled).

### PHASE D — The AI screening system (three-tier, Tier A)
Unchanged: D1 moderation pipeline (fills the submit_listing seam, REQ-021) → D2
enforcement (strikes, trust score) → D3 admin review queue + appeals. Trajectory
instrumentation toward minimal human intervention.

### PHASE F — Discovery (pre-launch, DEC-013)
Real feed + self-learning ranking (REQ-023); geo-scope backend for the location selector
(REQ-005); search v1 incl. cross-language via the REQ-004 translation layer; promotions
free-mode seam (REQ-024); SEO implementation items per gap register.

### PHASE G — Contact (pre-launch, DEC-013)
Messaging (REQ-026); block/report; scam defense per REQ-028.

### PHASE E — Enrichments (each its own pass; interleave after D)
AI title/description generation; AI field validators in-wizard; business accounts /
storefronts; multi-country + per-country pricing (v2); SEO generation extras.

Then governance ladder Phases 7–9 (i18n completion, Ops incl. REQ-031/032 + REQ-039
PWA + REQ-040 observability + GDPR rights, Hardening/launch) close out to launch.

## 5. Standing requirements across every phase (operator directive)

Every step ships with: security (deny-by-default RLS, seam-only writes, secrets in
Supabase config only, prompt-injection defenses on all AI surfaces per the Apex
unified-security pattern), performance (code-split heavy deps, image discipline, bundle
budget green), and testing (its own E2E green in CI before the feature closes — G15).
No feature is built before ITS spec is approved. Lovable may additionally review the
Apex repo directly during execution (the operator has offered it as reference).

## 6. Immediate next action

Write the **Phase R spec (RBAC core)** — DEC-013 §1. Everything downstream builds its
policies on it.
