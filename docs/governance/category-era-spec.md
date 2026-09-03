# CATEGORY ERA — CONSOLIDATED PASS-2 SPEC (S34, v1)
2026-09-02 · Supervisor-authored · RATIFIED by operator 2026-09-02 · Supersedes the categories/attributes portion of the S34 U5 draft; Locations moves to its own era after C5 (operator directive 2026-09-02). Imported verbatim to `/docs/governance/category-era-spec.md` by docs prompt D0 on approval.

## 0 · Era shape
Serial steps, one prompt in flight: **D0** (governance import) → **C1** taxonomy migration → **C2** console + RBAC + visibility → **C3** attributes completion → **C4** tags → **C5** AI image pipeline → era gate (four-lens review, name_am column retirement on operator go). Every feature ships its E2E green before the era closes (G13/G15).

## 1 · Data model (consolidated deltas; all additive)
- `categories` gains: `visible_from timestamptz NULL`, `visible_until timestamptz NULL` (NULL = always), `is_catchall boolean default false`, `allow_listings boolean default true`, `image_thumb_url text`, `image_generation_prompt text`. Existing `image_url` (card 512), `og_image_url` (1200×630), `icon` reused. **Roots set `allow_listings=false`** (browse containers; posting is leaf-only). Catch-alls are postable leaves.
- New `category_country_exclusions (category_id, country_code, created_by, created_at, PK(category_id,country_code))` — denylist; empty = visible everywhere. Deny-all RLS; writes via audited definer RPCs only.
- **Visibility law** (single WHERE, evaluated in the tree RPC; no cron): visible ⇔ `is_active` ∧ window contains now ∧ no exclusion row for viewer country. Browse paths require full-path visibility; **posting is server-gated on visibility** (extends the deactivation guard in `submit_listing`); listing detail pages are never gated (merchandising, not access control — stated plainly).
- **Catch-all law**: exactly one `Other <Root>` per branching node (current tree: 14, at roots), `is_catchall=true`, sorted last, hidden from browse while empty (`EXISTS` on live listings — REQ-017 empty-depth law per-node), always poster-visible, inherits parent attributes, graduation via console reassign.
- Attributes: L1 core set seeded in C1 (`offer_type` on Real Estate + Cars/Buses/Trucks; type-collapse attrs per the target-taxonomy notes); full donor completion + **brand-as-attribute** (Make etc.) in C3. Money-typed attribute values: never floats (E4).
- Translations: names via `entity_translations` only; C1 seeds `am` rows — live-sourced → status **approved**, supervisor-draft (✎) → status **edited** (truthful provenance, INC-115). Any future language is a DB-only language per D3 — no code change. `name_am` columns retire at era gate: reader-switch prompt, then destructive drop with in-migration totality assertion (every active category has an approved `am` name) — executes only on explicit operator go.

## 2 · C1 — Taxonomy migration (Tier B, data-only + core attrs)
Executor census FIRST (current DB counts + apex donor counts, pasted). Then, from the ratified artifacts (`c1-target-taxonomy.md`, `c1-dispositions.csv`, `c1-current-prod-dispositions.csv`, committed to `/docs/spec/category-era/`):
- Seed/upsert the 113-node tree (names EN, slugs, icons, order, pointers incl. the 11 L2 extra paths), `ON CONFLICT` idempotent; per-row disposition for every pre-existing row (INC-066).
- Retire: `jobs` root + 6 children (`is_active=false`); no prescription-pharma or domestic-labor nodes exist to create (excluded by design, REQ-017).
- Seed `offer_type` + type-collapse attributes at the narrowest truthful nodes.
- Seed `entity_translations` am rows with provenance statuses above.
- In-migration proofs + live read-back: node/pointer/attribute counts, 13→14 root check, orphanless, `allow_listings` posture, sample deny (post-into-root refused), am coverage counts by status.

## 3 · C2 — Console, RBAC, visibility machinery (Tier A migration + Tier B UI ×2)
- **Triggers (overdue hardenings)**: pointer-cycle prevention; (locations ancestry trigger deferred to Locations era with its console).
- **Permissions (DEC-017 pattern)**: retire `categories:manage` by mapping to `categories:view / create / update / restructure(requires_step_up=true) / assets`; R2 table policies remapped in the same migration; admin granted all. Deny + step-up proofs per RPC.
- **Definer RPCs (F5 order, audited, EXPLAIN+index per E7)**: list/create/update/retire-with-reassign (refuses while active listings unless target given), add/remove/move pointer (step-up), reorder, set-window, set-country-exclusions, set-catchall-visibility-independent fields; `get_browse_tree(p_country)` public read.
- **UI (C7 DataTable, cardUntil='lg')**: flattened searchable roster (path, badges: 🕒 window state · 🌍 n excluded · catch-all · leaf/root), FormSection tabs **General** (name_en, slug, parent, icon with AI-suggest, flags) / **Visibility** (window pickers, country exclusions editor) / **Image** (C5 activates) — other-language names link to Translations→Data (single writer, D3). Reassign dialog. **Catch-all report tab**: per-catch-all listing counts + (post-D-phase) AI-suggested-category clustering for graduation decisions. Bulk = capped 25/run over the caller's permission, client-driven serial with progress (apex model).
- **Icon suggester** = first AI touch: text-only Gemini via TanStack **server route** (INC-096: no edge functions), 65-icon lucide allowlist, server-side validation + fallback; key server-env only (F1).

## 4 · C3 — Attributes completion (Tier B)
Donor per-category attribute definitions imported to matching target nodes (types map 1:1, `select`→`single_select`; labels to `name_en`, `_am` fields NULL pending translation-era extension); **brand/make = attribute, never an entity** (ruling 2026-09-02); basic attribute CRUD tab on the category console (DataTable; create/edit/deactivate, option lists, required/filterable flags); inheritance walk already live. Read-back: per-node attribute counts, 3 spot EXPLAINs.

## 5 · C4 — Tags (Tier B, REQ-041)
`tags` + per-category suggestion lists, admin CRUD tab, poster-facing consumption deferred to posting era. Kept minimal by design.

## 6 · C5 — AI category images (Tier B build on Tier-A-verified route; A7 first-of-kind)
- **Three variants per node (operator directive)**: thumbnail (derived 128px), card (512, the REQ-019 photo-less listing fallback), large/OG (1200×630). One AI generation per node (card master, Gemini `gemini-2.5-flash-image`, **direct Google API — operator key in secret store, never chat**; Lovable gateway = one-line fallback); thumb downscaled from master; **OG composed programmatically** (icon on branded canvas — uniform, zero extra AI spend; apex's AI-OG kept as fallback recipe).
- Pipeline (apex-derived, palette **#1E5A43/#C98A2B**): master prompt (verbatim in the C5 prompt) → post-process (content-bounds crop → 80–85 % fill → center) → watermark six diagonal "ethio.com" behind-icon → upload `category-assets` bucket → write three URLs + persisted per-node custom prompt. Retry ×3, 429/402 surfaced (F4, no phantom success).
- **A7 spike is the gate**: one image generated + post-processed + uploaded through a cloudflare-module server route, CPU time measured, pre-committed judge: pure-JS/wasm processing fits Worker limits, else post-processing falls back to generation-time-only path or a named dependency decision. No batch code before the spike verdict.
- Console: Image tab (generate / custom prompt / preview / **accept gate** — nothing user-facing auto-publishes), missing-assets finder with select-missing, bulk cap 25.
- Ops: every batch run writes counts (REQ-032 heartbeat discipline); spend visibility = per-run generated/failed counts in the report.

## 7 · E2E & harness
Per-feature specs: `admin-categories.spec.ts` (roster/CRUD/deny/step-up/visibility badges), `admin-category-visibility.spec.ts` (window + exclusion behavior via fence country), `admin-attributes.spec.ts`, `admin-tags.spec.ts`, image-route smoke (mocked provider). J1–J8 apply; **DEC-031**: global-setup reaper gains scratch-category reap (`e2e-` slug prefix, 1 h) — named harness delta under G22, pre-committed rule.

## 8 · Plan updates carried by D0 (governance import prompt)
- Ledger S34 session entry; **REQ-017 amendments**: (a) Jobs/Tenders = "not a marketplace category; any future jobs offering is a separate product with its own spec"; (b) visibility dimensions law; (c) catch-all law; (d) L1 transaction-type/type-collapse law; (e) target tree adopted (counts advisory, tree is admin-dynamic). **REQ-020 note**: brand=attribute. **REQ-019 note**: three variants, card = fallback image. **DEC-031** reaper; **DEC-032** AI provider = direct Gemini, key = operator item (pre-C5); **DEC-033** era resequencing (Locations era follows C5; its ancestry trigger + console + diaspora seed move with it; the S34 U5-draft locations section is carried forward unchanged).
- Roadmap §Next rewritten to C-era; spec + the three ratified taxonomy artifacts imported under `/docs/spec/category-era/`; ACT backfill (ACT-U0-1, ACT-U3-1, ACT-U4-1..6 verbatim, OPEN); system-state lower half rewritten to current truth.
- **Forward-scan (restated for the consolidated design)**: REQ-005/023 feed seams consume `get_browse_tree(p_country)` — country exclusions + windows apply automatically; REQ-021 gateway untouched (admin surfaces); REQ-025 filters read C3 attribute flags; REQ-003 unchanged on public paths (tree RPC replaces the current list read 1:1, zero new deps, images lazy with dimensions per G2); REQ-012/033: categories/tags/exclusions remain global reference data (no partition column). No later-phase REQ contradicted; open seams named: posting-era fallback-image wiring, D-phase catch-all clustering, Locations era.

## 9 · Verification & tiering
C1/C3/C4/C5 Tier B with live read-backs; C2 migration Tier A (deny + step-up + trigger proofs, live read-back; "tests passed" never closes it). Apply-pairing on every migration report; banned-pattern + secrets sweep every verification; four-lens review at era gate. Operator walk checklists at 360/768/1280, publish-first (G14).
