# ethio.com — Posting Foundations: Final Build Plan

Status: OPERATOR-DECIDED scope, informed by direct study of the Apex repository
(github.com/tesfayekb/apex-marketplace). This supersedes the open questions in
posting-flow-spec.md Part E — all six decisions are now made. This document is the
executable sequence.

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

## 4. The build sequence (foundations first, then the wizard, then AI)

Each item = its own Pass-2 spec → operator approval → execution prompt → fresh-clone
verification → CI green. Serial discipline throughout.

### PHASE A — Data foundations (no AI, no UI; migrations + seeds)
- **A1 (F1+F5): The real category tree + attributes.** Import the Apex/ethio.com taxonomy
  (~112 categories, multi-level to leaves) into our pointer model, with per-category
  lucide icons, and the real per-category attribute definitions. Adds `image_url` (card)
  + `og_image_url` columns (empty until A4 generates them). Leaf rule: only leaves accept
  listings.
- **A2 (F2): Multi-location advertising.** New `listing_locations` relationship (one
  country v1; multiple regions/cities/subcities). submit_listing extended to accept the
  set atomically.
- **A3 (F12+F13): Seller profile foundations.** Alias (validated, unique — later
  AI-validated via the ai-validate-alias pattern), contact-methods structure, default
  item location; all prefilled on subsequent posts. Personal-only.
- **A2b (F10 minor): listings exact-location columns** (lat/lng + map_visible) for the
  map pin.

### PHASE B — The posting wizard (v1, manual content, stub screening)
- **B1: Wizard shell + steps 1–8** adapted from the Apex wizard to our shell/panels/
  tokens/i18n (EN+AM): Category(leaf-gated)+AdvertisingLocations → Photos(category-image
  fallback; uploads stored behind the exif_stripped gate) → Specs(+tags if A-seeded) →
  Title/Description(manual) → Pricing+Duration → ItemLocation(+map pin, code-split) →
  Contact(prefill) → Review+Preview+Publish. Publish calls submit_listing; screening is
  the existing pass-through stub QUEUEING for Phase D. Full E2E per feature (G15).
- **B2 (F3): The image pipeline.** On-device compress/resize → upload → server EXIF/GPS
  strip → variants → exif_stripped=true → surfaceable. DEC-009 hard gate closes here;
  photos display in feed/detail only after this lands. The #1 perf lever.
- **B3 (F15): Listing detail card + review/preview** surfaces (needed by Step 8's preview
  and by the marketplace browse).

### PHASE C — Admin category console (needed for C→D)
- **C1: Admin categories body** (the first real admin panel feature): tree CRUD,
  add-subcategory, icons (with suggest-category-icon later), attribute management,
  visibility. REQUIRES server-side RBAC/RLS FIRST (the launch-gate law F3 item) — a
  real admin role, enforced in policies, not UI-gating. This is the admin panel's
  security foundation and gets Tier-A treatment.
- **C2 (F4): Category image generation.** The generate-category-image adaptation:
  admin triggers generation → AI produces candidates → admin SELECTS ONE → stored
  (WebP+PNG, card + OG variants) → used as the listing fallback. Batch mode for
  categories missing images. OPERATOR ITEM: AI provider account/key.

### PHASE D — The AI screening system (three-tier, Tier-A, its own careful build)
- **D1: The moderation pipeline** adapted from ai-moderate-content/-image with our
  hardening standards: text+image screening on every submission, three-tier routing
  (auto-approve / auto-reject-with-appeal / human queue), rule-based fallback when AI
  is down, full audit logging. Fills the submit_listing screening seam (REQ-021).
- **D2: Enforcement** adapted from ai-process-strike: graduated strikes, trust score,
  configurable thresholds, expiration; auto-actions at the severe end, human
  confirmation at the border; appeal path.
- **D3: The admin review queue + appeals UI** (small by design — only the ambiguous).
- Trajectory instrumentation: measure AI accuracy (overturn rates in the queue/appeals)
  so thresholds can be tightened toward the minimal-human-intervention goal.

### PHASE E — Enrichments (each its own pass, post-v1)
- AI title/description generation (ai-generate-listing-content adaptation).
- AI field validators in-wizard (alias, category suggestions).
- Business accounts / storefronts. Multi-country + per-country pricing (v2).
- SEO generation (ai-generate-seo), OG images, suggest-category-icon.

---

## 5. Standing requirements across every phase (operator directive)

Every step ships with: security (deny-by-default RLS, seam-only writes, secrets in
Supabase config only, prompt-injection defenses on all AI surfaces per the Apex
unified-security pattern), performance (code-split heavy deps, image discipline, bundle
budget green), and testing (its own E2E green in CI before the feature closes — G15).
No feature is built before ITS spec is approved. Lovable may additionally review the
Apex repo directly during execution (the operator has offered it as reference).

## 6. Immediate next action

Write the **A1 spec (category tree + attributes import)** — everything downstream hangs
