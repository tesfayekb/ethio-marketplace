# Handoff #4 — Thread 3 → Thread 4 (2026-08-05)

REPO STATE AT HANDOFF: HEAD `cd1e5dd` ("Fixed settings/marketplace sync"), CI fully
GREEN (all 8 jobs incl. E2E), main stable. INC ledger through INC-059. This is the
FOURTH handoff (prior: 2026-08-01 thread1, 2026-08-03 thread2, 2026-08-04 thread2-#2).

SUCCESSOR: run the §2 session-start ritual FIRST (fresh clone, read system-state.md →
this handoff → spec-ledger tail → git log; state HEAD/phase/next and confirm with the
operator). This handoff accelerates the ritual; the repo is the record. THEN read, in
order: docs/features/performance-strategy.md, docs/spec/posting-flow-spec.md,
docs/spec/posting-foundations-build-plan.md (all imported alongside this handoff).

---

## 1. WHERE THE PROJECT STANDS (one paragraph)

Phase 1 (Identity) is CLOSED. Phase 2 (Marketplace core) is OPEN with the data core
CLOSED (P2-a geography, P2-b categories, P2-c listings+seam+guard, P2-c-tier) and the
**design foundation + shell now DONE and formally closed** (this thread's main work).
The marketplace is a polished, tested, empty shell: nothing can be posted yet. The next
epoch — planned in exhaustive detail this thread — is **the posting system**, built
foundations-first (Phases A–E below), beginning with **A1: the real category tree +
attributes import**. That A1 spec is the immediate next action.

## 2. WHAT THIS THREAD ACCOMPLISHED (chronological)

### 2a. The design foundation + shell (the bulk of the thread)
Built, iterated (~10 correction rounds driven by the operator's exacting render-walks),
stabilized, and CLOSED:
- **Palette (LOCKED, do not re-open):** cool-slate neutral surfaces (#F6F7F9 page, white
  cards, #E8EBEF hairlines) + deep coffee-leaf green primary #1E5A43 + honey-gold #C98A2B
  accent (gold ONLY on logo-dot + Featured badge). Light + dark mode (data-mode flip,
  pre-paint script, persisted). All warm/cream tones PURGED. oklch tokens in
  src/styles.css with WCAG ratios documented (muted-grey darkened D-021; dark primary
  #7FC9A6).
- **Typography:** Inter (body) + Bricolage Grotesque (display) + Noto Sans Ethiopic
  (Ge'ez — MANDATORY, per-glyph fallback), display=swap, subset. Loaded in __root.tsx
  head() (no index.html — D-020).
- **Brand:** two-line logo lockup ("ethio.com" over width-fit "MARKETPLACE"), woven-
  diamond (tibeb) mark. **STANDING HARD RULE: religiously neutral geometry only — no
  cross/faith iconography of ANY tradition, ever.** Motif appears ONLY as logo + spinner
  + feed empty-state. Spinner = SELF-DRAWING diamond (operator's pick). Logo flagged for
  professional trademark clearance (EIPO+USPTO) pre-launch — launch-gate item.
- **Shell architecture (all landed and CI-tested):** one AppShell; corner-block grid
  (logo cell = rail-width × top-bar-height, continuous sidebar divider); vertical stack =
  top bar → panel tabs (signed-in only, symmetric tight spacing) → location-selector row
  (MARKETPLACE panel only) → clickable breadcrumbs (root "Home" = marketplace feed; panel
  segment only on non-marketplace panels; category path fully navigable) → body. Panel
  set is per-user (Marketplace always; My Listings + Account when signed in; Admin gated
  behind stubbed isAdmin=false — correctly absent for normal users). **Panel is DERIVED
  FROM THE ROUTE** (INC-058 fix — /settings shows the Account context; panel/route can
  never desync again).
- **Top bar:** minimal icons on phones (<md), FULL controls on tablet+ (md=768 — the
  operator explicitly wants iPads full, icons only on phones); search icon opens a
  full-width row BELOW the bar on mobile; language switcher = same affordance at all
  sizes showing the current language; theme toggle; avatar menu (account links +
  sign-out); rail-collapse toggle in the TOP BAR before search, md+ only (genuinely
  hidden on phones — the cn()/twMerge class-collision fix, INC-055); right cluster
  right-aligned (md:ms-auto).
- **Rail:** category tree on Marketplace (distinct lucide icons per category via slug
  map — no more all-Tag monotony), panel menu items elsewhere (all with icons);
  recursive submenus; optional desktop collapse to icons with hover tooltips +
  persistence (html[data-rail], pre-paint script); ADDITIONAL sign-out at rail bottom
  (account-menu sign-out retained — two ways); drawer on phones with centered logo.
- **Footer:** 3 equal centered columns (grid-cols-3), tight vertical rhythm with 44px
  tap targets preserved, centered © row.
- **Feed shape:** tier ordering LIVE (premium→featured→regular; listings.tier real),
  view_count ASC + published_at DESC seamed (view-tracking + location-scoping are
  pre-launch backend features); category filter live; location filter stubbed; category
  tree CACHED (module-level + inFlight dedupe, 44px skeletons — INC-057); soft-fail
  containment (a feed/data error can never cascade into auth again — INC-031 class).
- **CI guard suite grew to 8 jobs:** build/typecheck/lint, gitleaks, migration linter,
  string scan, listing-write seam guard, dependency audit, marketplace-weight guard,
  **first-paint bundle budget** (~156 KiB JS vs 320 ceiling — enforced). All green at
  handoff.

### 2b. Hard-won process lessons (successor MUST internalize)
- **"Green locally" ≠ green.** Lovable's sandbox cannot run the E2E suite (no staging
  creds). It repeatedly claimed green while CI was red — FIVE reds this thread (footer
  tap-target regression b679b88; a committed-WIP handback with stray pw.local.ts;
  stale-selector cascades; the mobile-toggle class collision 2ad6f6d). **CI is the only
  truth; verify every landing by fresh clone reading docs/tracking/ci-status.md with the
  two-step SHA check; never disposition on a stale status.**
- **The CI-status reporter STALENESS BUG IS STILL OPEN** — it repeatedly reported the
  previous commit's result during exactly the moments verification mattered.
  **QUEUED TASK (do early in thread 4): apply the regenerate-after-fetch fix (same as
  the nightly's INC-027) to the CI Status Reporter workflow.**
- Root-cause discipline held: every red was fixed at the cause (selector→DOM alignment,
  min-w-0 overflow, cn() class merge), never by weakening assertions.
- Operator render-walks catch what tests don't; reproduce their exact click path when
  they report a bug (the Settings-in-marketplace "leak" was a real route/panel desync,
  not a stale preview).

### 2c. The performance strategy (WRITTEN — docs/features/performance-strategy.md)
The systematic answer to the operator's repeated "is it fast?" concern. Key content:
what already protects perf (SSR, flat surfaces, font subsetting, bundle budget,
weight guard, indexed feed, category cache); the RISKS in priority order — **#1 IMAGES**
(3-5MB phone photos × 20 cards = unusable on Ethiopian mobile; the compression+EXIF-
strip+variants+lazy pipeline is the single biggest lever, lands as Phase B2), #2 feed
pagination, #3 data-fetch waterfalls (cache reference data, skeletons, soft-fail), #4
dependency creep (code-split heavy libs — the MAP must never touch the browse path);
honestly-deferred launch-gate items (Lighthouse/CWV gating, visual regression); the
real-device-on-3G test as the honest final check.

### 2d. The posting-system study (the thread's second half)
The operator walked Claude through the **complete Apex posting experience** via ~24
screenshots and then granted the **Apex repository** for direct study. Everything is
captured in two imported documents:
- **docs/spec/posting-flow-spec.md** — the full 8-step wizard in detail (Category-to-
  LEAF + advertising locations → Photos with AI category-default fallback → Specs+Tags
  from the leaf → Title/Description (AI-capable) → Pricing+Duration → Item location with
  map pin → Contact (account type, alias, methods, prefill) → Review+Preview+Publish),
  each step's data needs, exists-vs-must-build against our schema, and the foundations
  map (F1–F15).
- **docs/spec/posting-foundations-build-plan.md** — the FINAL plan: locked scope
  decisions, Apex findings, reconciliations, and the Phase A–E sequence.

### 2e. OPERATOR SCOPE DECISIONS (all LOCKED — do not re-ask)
1. **Category images:** AI-generated at category CREATE/EDIT (admin flow): AI produces
   candidates → ADMIN selects ONE → saved; that image is the fallback for photo-less
   listings in the category. Never per-user/per-listing.
2. **Title/description: MANUAL in v1**; AI Generate is a later pass (Phase E).
3. **Map pin: IN v1** (Mapbox/Leaflet, code-split to posting/detail routes only,
   token served server-side per Apex's get-mapbox-token pattern).
4. **Personal-only sellers in v1** (alias + contact methods); business/storefronts =
   their own later phase (REQ-008).
5. **No stock qty / SKU** — single-item classifieds v1.
6. **Screening = the THREE-TIER AI model (agreed verbatim):** AI confidently approves →
   auto-publish; AI confidently rejects (clear ToS: illegal goods, CSAM, weapons…) →
   auto-reject WITH APPEAL PATH; AI uncertain → small HUMAN REVIEW QUEUE. AI reviews
   EVERYTHING (text + images + conduct) with graduated enforcement. **Stated trajectory:
   tighten toward minimal/no human intervention as measured AI accuracy improves.**
Also locked earlier: posting can START from the Account panel (creates the My Listings
panel); manage always in My Listings; category source = the ethio.com/Apex taxonomy
(NEVER wait for WooCommerce); v1 = ONE country but MULTI region/city/subcity advertising
targets (multi-country + per-country pricing = v2); product location / account info /
alias / contacts are entered once and PREFILLED (editable) on subsequent posts.

### 2f. THE APEX REPOSITORY FINDINGS (studied directly; successor should re-clone)
**Repos for thread 4:** canonical = github.com/tesfayekb/ethio-marketplace (fresh-clone
ritual); reference = **github.com/tesfayekb/apex-marketplace** (the operator's earlier
build; same shadcn/Tailwind/Supabase stack; PROVEN reference for nearly everything we
must build — Lovable may also read it directly during execution, operator-approved).
Key assets found in Apex:
- **supabase/functions/ai-moderate-content** — the EXACT three-tier model
  (recommendation approve|flag|reject, confidence, requiresHumanReview, severity-graded
  flags, content-type-specific rule contexts) with ENTERPRISE hardening: prompt-injection
  defense (fuzzy/encoding/homograph/special-token), canary-token leak detection, output
  validation, rate limiting, threat logging, and a RULE-BASED FALLBACK when AI is down.
- **ai-moderate-image / ai-validate-media** — image screening.
- **ai-process-strike** — GRADUATED enforcement: minor/moderate/severe strikes → warning
  → strike → suspension → ban; TRUST SCORE (100 base, −5/−15/… per level); 90-day strike
  expiration; settings-configurable thresholds. Adopt this shape for D2.
- **generate-category-image** — Gemini-based, square watermark-free icons, WebP+PNG,
  card (512) + OG (1200×630) variants, batch mode for categories missing images.
- **get-mapbox-token** — server-side token delivery (key never in the client bundle).
- **The full wizard**: src/features/listings/components/wizard/ (ListingWizard shell,
  WizardNavigation/Progress, steps: CategoryStep, MediaStep, AttributesStep, ContentStep,
  PricingStep, LocationContactStep, ContactStep, ReviewStep; hooks useUnifiedValidation,
  useAIContentGeneration).
- Location functions (detect/validate/auto-add/process-location-request), account
  lifecycle (export-user-data, delete-user, de/reactivate-user), ai-validate-alias/
  business-name/category, ai-generate-seo, suggest-category-icon.
- AI provider: the Lovable AI gateway (OpenAI-compatible; LOVABLE_API_KEY/OPENAI_API_KEY).
**Reconciliations decided:** keep OUR pointer-based category tree (REQ-017; import the
taxonomy INTO it; leaf = no child pointers) vs Apex's parent_id+depth; every adapted
function must ALSO meet our standing rules (deny-by-default RLS, seam-only writes,
idempotent migrations, CI guards, Tier-A proof standards).

## 3. THE BUILD PLAN (Phases A–E; full detail in the build-plan doc)
- **A — Data foundations:** A1 category tree + attributes import (~112 cats to leaves,
  icons, image_url/og_image_url columns empty until C2) → A2 listing_locations
  (multi-region/city/subcity, one country) + submit_listing extension → A2b lat/lng +
  map_visible columns → A3 seller profile (alias, contact methods, default location,
  prefill).
- **B — The wizard:** B1 all 8 steps (manual content, map pin code-split, screening
  stub QUEUES) → B2 the IMAGE PIPELINE (DEC-009 closes; #1 perf lever) → B3 listing
  detail card + review/preview surfaces.
- **C — Admin categories console:** C1 REQUIRES SERVER-SIDE RBAC/RLS FIRST (law F3;
  real admin role in policies, not UI gating) then tree CRUD/attributes/visibility →
  C2 category-image generation (admin picks one of the AI candidates).
- **D — AI screening (Tier-A, its own careful build):** D1 moderation pipeline (three-
  tier, rule-based fallback, audit) filling the submit_listing seam (REQ-021) → D2
  graduated strikes/trust score → D3 admin review queue + appeals; instrument accuracy
  to tighten thresholds toward the minimal-intervention goal.
- **E — Enrichments:** AI title/description, in-wizard validators, storefronts,
  multi-country + per-country pricing, SEO/OG generation.
**OPERATOR ITEMS (spend/accounts — surface at the relevant spec, do not assume):**
AI provider account/keys (Lovable AI gateway vs direct); Mapbox account/token. Both
live in Supabase secrets only.

## 4. IMMEDIATE NEXT ACTION FOR THREAD 4
After the §2 ritual: **write the A1 spec** (category tree + attributes import — Pass-2,
operator approval, then the execution prompt). Everything downstream hangs on real leaf
categories. Then A2 → A2b → A3, serial discipline, one prompt in flight.

## 5. STANDING/QUEUED ITEMS (carry forward; none blocking A1)
- **CI-status-reporter regenerate-after-fetch fix** (third-strike staleness — do EARLY).
- Launch-gate (accumulating; see docs/governance/launch-gate.md): logo trademark
  clearance (EIPO+USPTO); Lighthouse/CWV gating; visual-regression testing; admin
  server-side RBAC before admin bodies (consumed by C1); Amharic native review (all
  name_am + flagged keys: tier.featured, navSection.system/moderation); leaked-password
  toggle (Supabase Pro); rotate both service-role keys; custom SMTP (Resend) on prod;
  production Google OAuth client + consent; Turnstile enable; Ethereal ephemeral-sink
  WATCH; redirect URLs → ethio.com at cutover; ECA registration at Ethiopia-entity
  milestone; INC-028 (duplicate update_updated_at_column in prod) at the P2 gate.
- Pre-launch backend features feeding the feed seams: view tracking (session-deduped,
  displayed + least-viewed-first ranking), location scoping (IP → city→region→country→
  world ladder; manual override; combines with category filter), real ranking function,
  feed pagination.
- Deferred-named: Telegram door (DEC-012), WooCommerce category import as later
  dedupe/repair (superseded for SEEDING by the Apex taxonomy decision, but the old-site
  user-list export for relaunch invite still stands).

## 6. OPERATOR WORKING STYLE (unchanged; respect it)
Exacting on visuals — expect render-walk corrections; reproduce their exact paths.
G17 bandwidth discipline: decide minor items, log, one line; only substantive decisions
(scope, security, spend, launch-gate, spec approvals) go to the operator. Prompts
INLINE between horizontal rules; operator-facing turns are numbered checklists leading
with the single action. Serial prompts; fresh-clone verification; never claim green
without CI. The operator says "proceed with your recommendation" when they trust the
reasoning — earn it with honest, grounded leans.

