# ethio.com — Posting Flow: Complete Specification & Foundations Map

Status: DRAFT for operator review. This captures the FULL posting experience (derived
from the Apex build the operator refined), maps every step to what it NEEDS, marks what
already exists vs. what must be built, and sets the build order per the operator's
directive: **identify and build ALL posting foundations first, then build the posting
flow step by step on top.**

Operator scope decisions locked:
- **Category source:** the ethio.com / Apex taxonomy (already available) — NEVER wait for
  a WooCommerce import. Use the real category tree we have.
- **v1 location:** ONE country, but MULTIPLE states/regions, MULTIPLE cities, and
  sub-cities selectable. Multi-COUNTRY is v2.
- **Prefill:** product location, business/account info, alias, and contact methods are
  entered the FIRST time and PREFILLED (editable) on subsequent posts.
- **Entry point:** posting starts from the Account panel (a user need not have the My
  Listings panel yet); posting CREATES that panel; management always lives in the panel.
- **Build everything except where "better improvement suggestions" are noted** — those are
  Claude's proposed enhancements for operator decision, not automatic.

---

## PART A — The entry model

- A user can **Start a listing from Account** (a "Post a listing" / "Start advertising"
  action) even before they have a My Listings panel.
- Completing (or starting) a post **grants the My Listings panel**. From then on the user
  can post from EITHER Account or the My Listings panel.
- **Managing** listings (edit, renew, mark sold, view stats) is ALWAYS in the My Listings
  panel.

---

## PART B — The 8-step wizard (the full flow)

A stepper (Category → Photos → Specs → Content → Pricing → Location → Contact → Review),
each step gated (can't advance until required fields for that step are valid). "Save draft"
and "Cancel" available throughout; "Back"/"Next" navigation.

### STEP 1 — Category (drill to a LEAF) + Advertising location

**Category (the ordering rationale):** category comes first because the chosen LEAF
category determines the specifications in Step 3. Selection **drills through subcategories
until a FINAL/LEAF category** is reached — you cannot advance on a mid-tree node. (Apex:
Electronics → TV & Video → … until leaf; "Select a final subcategory or choose 'Other'.")
The chosen leaf drives Steps 3 (specs), and the category's config drives Step 2 (default
image), Step 5 (price_enabled, expiry_days).

**Advertising location (v1: one country, multi state/city/subcity):** where the listing
should APPEAR in search — distinct from where the ITEM physically is (Step 6). v1 allows
one country but multiple regions, multiple cities, and sub-cities. (Apex shows multi-country
with "add city (1/5)" and "add another country" — the multi-country part is v2.)

NEEDS:
- The real category TREE with depth (leaf nodes) — **MUST BUILD** (see Foundation F1). The
  seeded tree is top-level only today.
- A listing↔locations relationship supporting MULTIPLE locations — **MUST BUILD** (F2).
  Current schema: listings.location_id is a SINGLE FK. Advertising-locations is a new
  many relationship.

### STEP 2 — Photos (with AI category default)

**The clever pattern:** every category has an **AI-generated, lightweight, theme-consistent
DEFAULT image**, generated ONCE at category-creation time in the admin panel and stored. A
user with no photo gets the clean category placeholder automatically; a user WITH photos
uploads here, and THIS is where **compression + resize + EXIF/GPS strip** happen. Primary
image + up to 4 additional; "Coming Soon" banner option; photo tips. (Apex screenshot: the
"Category placeholder — tap to replace" and "Listings with real photos get 3x more views".)

NEEDS:
- **listing_photos** table — **EXISTS** (with exif_stripped gate).
- **The image pipeline** — on-device compression + server EXIF/GPS strip + card-sized
  variants + lazy-load — **MUST BUILD** (F3). This is DEC-009 (hard gate) + the #1 perf
  lever from the performance strategy. Photos are stored-not-surfaced until it ships.
- **AI-generated category default images** — an admin-panel pipeline that generates a
  lightweight themed image per category at creation and stores it — **MUST BUILD** (F4).
  Depends on the admin panel (not built) + an image-generation integration.
  *Better-improvement note:* if AI image-gen proves heavy/costly, an alternative is a set
  of hand-designed themed category SVGs (zero-weight, on-brand) chosen per category — same
  UX (uniform placeholder), no AI dependency. Operator decision.

### STEP 3 — Specifications (from the leaf category) + Tags

The leaf category's **attributes render as form fields** — required ones (e.g. Screen Size,
Brand, Condition) must be filled; the category may allow additional optional attributes
(Display Type, Smart TV, Warranty). Plus category-relevant **suggested tags** (click to
add, e.g. Limited Edition, Free Shipping). Specs feed Step 4's AI and Step 3's searchability.

NEEDS:
- **category_attributes** (the spec schema) — **EXISTS** (attr_key/type/options/is_required).
- **Per-category attribute DATA** — each category needs its real attributes defined —
  **MUST BUILD** (F5). Only one illustrative set (Vehicles) is seeded today. This is the
  admin attribute-builder's output; for v1 we seed the real attributes per category via
  migration (like the starter category seed), builder-UI later.
- **Tags system** — a tags table + per-category suggested tags — **MUST BUILD** (F6).
- Listings store chosen attributes in **listings.attributes jsonb** — **EXISTS**, validated
  in submit_listing against category_attributes.

### STEP 4 — Title & Description (user / AI / combination)

Free-typed, AI-generated, or a mix. **AI reads the specs (and can scan the image) to
generate a true representation** — Apply Title / Apply Description / Apply All. (Apex:
"Iphone 60-69 Inch LCD TV - Good Condition" + a full description generated from the specs.)
Title ≤100 chars; description min 30, recommended 100-500.

NEEDS:
- Title/description columns — **EXIST** (listings.title, listings.description).
- **AI content generation** (specs→title/description; image→suggestion) — **MUST BUILD**
  (F7). No AI integration exists. Cost, latency, prompt-engineering, and a safety/screening
  pass (REQ-021) all apply. *Better-improvement note:* v1 could ship with MANUAL
  title/description (fields work now) and add the AI "Generate" button as its own pass —
  the flow is fully functional without AI. Strong recommendation given AI is net-new.

### STEP 5 — Pricing & duration (for priced categories)

Only for categories with **price_enabled**. Price + currency (currency follows the
advertising country; changeable). Stock qty, optional SKU, "on sale/discounted" toggle.
**Per-country pricing** in Apex (each advertising country its own price/currency) — v2,
since v1 is single-country. **Listing duration**: default from category.expiry_days (30),
max 60; shows the computed expiry date; "reminder 3 days before expiry".

NEEDS:
- price_amount/currency/mode — **EXIST**. expiry_days per category — **EXISTS**.
  expires_at computed at publish — **EXISTS** (submit_listing).
- **Stock qty / SKU / on-sale** — small additions if wanted — **MUST BUILD (minor)** (F8).
  *Better-improvement note:* classic classifieds often sell ONE item (no stock qty). v1
  could omit stock/SKU (single-item) and add them only if the product needs inventory
  selling. Operator decision.
- **Per-country pricing** — v2 (depends on multi-country, F2-extended).
- The scheduled **expire_stale_listings** job — authored, **scheduling MUST BUILD** (F9).

### STEP 6 — Item location (detailed, with map pin)

The ITEM's physical location — distinct from advertising location (Step 1). "Same as my
business location" default (prefilled, saved as default for future) OR "different location".
Country/region/city/subcity + optional street address. **Exact location:** "select my
location" (device GPS) or **pick on a map** (a zoomable Leaflet/Mapbox map, drop/drag a pin,
lat/lng captured, reverse-geocoded address shown) + a **"visible on listing" toggle** for
whether the pin shows publicly. (Apex screenshots: the pin modal + the inline mini-map.)

NEEDS:
- listings.location_id (the item's admin location) — **EXISTS** (single FK — correct for
  the item; item is in ONE place even though it advertises to many).
- **Exact lat/lng + map-visibility columns** on listings — **MUST BUILD (minor)** (F10).
- **The map/pin picker** (Leaflet + a tile/geocoding provider) — **MUST BUILD** (F11). A
  map library is a heavy dependency and the tile/geocoding provider (Mapbox) is paid; the
  perf strategy flags map libs to keep OFF the first-paint path — so this loads only on the
  posting/detail routes, code-split. *Better-improvement note:* the map pin is a nice-to-
  have precision feature; v1 could ship with the admin location tree (country/region/city/
  subcity) + optional street address ONLY, and add the map-pin picker as its own later pass
  (it's the single heaviest dependency in the whole flow). Strong recommendation to defer
  the map to keep v1 lean and fast.
- **Prefill from last post / business location** — **MUST BUILD** (F12). Needs a
  "business/default location" on the profile (profiles.viewing_location exists but is a
  viewing hint; a dedicated default-post-location is cleaner).

### STEP 7 — Contact (account type, alias, contact methods)

Account type: **Personal or Business**. If Business: business/store name + a **store URL
slug** (ethio.com/your-store — the storefront seam, REQ-008). If Personal: optional **seller
alias** shown publicly instead of the real name (validated/approved). **Contact methods:**
in-app messaging always on (recommended); optional Phone, Email; **Website & social links**
(Facebook, YouTube, TikTok, Telegram, etc.). All PREFILLED on subsequent posts (editable).

NEEDS:
- **Seller alias** (validated, unique) — **MUST BUILD** (F13). Not in schema.
- **Per-listing / per-seller contact methods** — profiles.contact_prefs jsonb **EXISTS** as
  a seam; needs the real structure (which methods, phone, socials) — **MUST BUILD** (F13).
- **Account type (personal/business) + business/store name + store slug** — the storefront
  seam (REQ-008) — **MUST BUILD** (F14). Storefronts are a later phase; v1 needs at least
  the personal/business flag + alias, with full storefronts deferred.
  *Better-improvement note:* v1 could be PERSONAL-only (alias + contact methods), deferring
  the Business/store-URL/storefront path entirely to the storefront phase. The classic
  classifieds seller is an individual. Operator decision.
- Prefill on subsequent posts — **MUST BUILD** (F12, same prefill mechanism).

### STEP 8 — Review & Publish

A full **review** of every section (category & location, specs & tags, details, photos,
pricing, product location, contact) each with an **Edit** jump-back. A **"Preview: how your
listing will appear"** modal rendering the real listing-detail card (photo, price, seller,
description/specs/seller-info tabs, contact button). **Terms/Privacy agreement** checkbox.
"What happens next" (reviewed by team → notification → live within 24h → editable anytime).
**Publish** → calls submit_listing → screening (REQ-021) → active.

NEEDS:
- **submit_listing** (the write seam) — **EXISTS**, CI-guarded.
- **The review renderer + preview modal** — **MUST BUILD** (F15). Presentational; reads the
  draft state. The preview reuses the listing-detail card (which itself needs building —
  it's a Marketplace surface not yet made).
- **Screening (REQ-021)** — the submit_listing screening call is a **pass-through STUB
  today** — the real screening gateway is a later feature; v1 can publish through the stub
  (auto-approve) with screening filled later, OR ship a minimal manual-review queue.
  Operator decision on whether v1 needs real screening before public listings exist.

---

## PART C — Foundations to build FIRST (the operator's directive)

Per "identify what posting needs and build all that first, then build posting step by step,"
here are the foundations, grouped by whether they're TRULY required for a functioning v1
post vs. deferrable enrichments. Each becomes its own spec'd, CI-verified build.

### Tier 1 — REQUIRED for any functioning v1 post (build these first)
- **F1 — The real category tree with depth (leaves).** Seed the ethio.com/Apex taxonomy
  (multi-level to leaves) via migration. Without leaves there are no specs. HIGH priority.
- **F5 — Per-category attribute data.** Define each (leaf) category's real attributes
  (required + optional) via migration, using category_attributes. Specs depend on this.
- **F2 — Multi-location advertising (v1: one country, multi region/city/subcity).** A new
  listing↔advertising-locations relationship. Schema change.
- **F12 — Prefill mechanism** (default product location, business/account info, alias,
  contact methods on the profile, reused on subsequent posts).
- **F13 — Seller alias + contact-methods structure** (on profile).
- **F8/F10 (minor) — small listings columns** (stock/sku/on-sale if kept; exact lat/lng +
  map-visibility if the map is kept — but see F11 deferral).

### Tier 2 — Build with, or immediately after, the posting flow
- **F3 — The image pipeline** (compression + EXIF strip + variants). DEC-009 hard gate;
  photos stored-not-surfaced until it ships. The #1 perf lever.
- **F6 — Tags system.**
- **F9 — Expiry-sweep scheduling.**
- **F15 — Review renderer + preview modal + the listing-detail card** (the Marketplace
  detail surface, needed for the preview and for browsing).

### Tier 3 — Strong-recommendation DEFERRALS (enrichments, their own later passes)
These make the flow richer but the flow WORKS without them; each is net-new and heavy:
- **F7 — AI content generation** (title/description from specs, image scanning). Net-new AI
  integration, cost/latency/safety. v1 = manual title/description; add AI as its own pass.
- **F4 — AI category default images.** Depends on the admin panel + image-gen. v1 = hand-
  designed themed category SVGs (or a simple default), AI image-gen later.
- **F11 — The map/pin location picker.** Heaviest dependency (map lib + paid tiles/
  geocoding). v1 = admin location tree + street address; add the map pin later.
- **F14 — Business account type + storefronts** (store name, store URL). v1 = personal +
  alias; storefronts are their own phase (REQ-008).
- **Multi-country advertising + per-country pricing.** v2.
- **Real screening gateway (REQ-021).** Stub auto-approves in v1 (or a minimal manual
  queue); the real gateway is a later Tier-A feature.

**Also required regardless (cross-cutting):**
- **The admin panel** (needed for F4 AI images, F5/F6 attribute/tag management long-term,
  screening queue) — currently UI-gated placeholder; server-side RBAC/RLS required before
  admin bodies ship (launch-gate). For v1, F1/F5/F6 seed via MIGRATION so the admin panel
  isn't a blocker for posting itself.

---

## PART D — Proposed build sequence

1. **Foundations (Tier 1), each its own spec + migration:** F1 (category tree to leaves) →
   F5 (per-category attributes) → F2 (multi-location advertising schema) → F12/F13 (profile
   prefill: default location, alias, contact methods) → F8/F10 minor columns.
2. **The posting flow, step by step** on those foundations — starting with a v1 that uses
   manual title/description (no AI), themed default images (no AI image-gen), admin-tree
   location (no map pin), personal seller (no storefront), stub screening. A user can post
   a real listing end-to-end.
3. **Tier 2 alongside/after:** the image pipeline (F3), tags (F6), the listing-detail card +
   review/preview (F15), expiry scheduling (F9).
4. **Tier 3 enrichments, each its own pass:** AI content (F7), AI category images (F4), the
   map pin (F11), business/storefronts (F14), then v2 multi-country + per-country pricing,
   and the real screening gateway.

Each foundation and each step follows the Pass-2 process: spec → operator approval →
execution prompt → fresh-clone verification → CI green. Nothing is built before its own
spec is approved.

---

## PART E — Open decisions for the operator (the "better improvement" calls)

1. **AI in v1 or later?** Recommendation: title/description MANUAL in v1, AI "Generate" as
   its own later pass (AI is net-new; the flow works without it).
2. **Category default images:** AI-generated (needs admin + image-gen) vs. hand-designed
   themed SVGs in v1. Recommendation: themed SVGs in v1, AI image-gen later.
3. **Map pin in v1 or later?** Recommendation: DEFER — admin location tree + street address
   in v1; the map pin (heaviest dependency) as its own later pass.
4. **Personal-only v1, or personal + business/storefront?** Recommendation: personal +
   alias in v1; business/storefronts are their own phase.
5. **Stock qty / SKU:** keep (inventory selling) or omit (single-item classifieds) in v1?
   Recommendation: single-item v1, add inventory only if needed.
6. **Screening in v1:** stub auto-approve, minimal manual queue, or wait for the real
   gateway? Recommendation: decide based on comfort launching with un-screened public
   listings; a minimal manual queue is a reasonable middle path.

These are genuine product/scope decisions. The operator said "implement all except better
improvement suggestions" — the six above ARE the improvement suggestions, offered for
decision rather than assumed.

