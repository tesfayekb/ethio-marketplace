# System State

## Phases

- **Phase 0 (Foundation) — CLOSED 2026-07-29.** Docs foundation, CI guard skeleton,
  migration rulebook, migration 0001 (`public.countries`).
- **Phase 1 (Identity) — CLOSED 2026-08-04.**
  - P1-a identity schema (`user_directory`, `profiles`, signup trigger,
    `confirm_home_country`) — closed 2026-07-30; deny-proofs D1–D7.
  - P1-b i18n runtime (EN + AM, lazy locales, language switcher) — closed 2026-07-30.
  - P1-c email door (sign-up, sign-in, verification, callback, resend hardening) —
    closed 2026-07-30; E2E A/B/C classes.
  - P1-d Google door (minimal scopes, REQ-015 linking semantics, D-8/D-10 evidence) —
    closed 2026-08-03.
  - P1-f settings surface (identity summary, sign-in methods, last-method server
    guard, INC-024 ghost-door fix) — closed 2026-08-03.
  - P1-g gate (identity truth model, password recovery, prod RLS/ACL re-proof,
    enforcing dependency-audit gate, guard-proof fixture refresh) — closed 2026-08-04.
  - Deferred by DEC-012 to the **Additional auth doors** phase: Telegram door,
    device/session list, multi-door settings.
- **Phase 2 (marketplace core) — OPEN (2026-08-04).** Scope: listings, categories,
  geography per the GEO pre-decision (one canonical locations tree with `is_active` +
  RLS active-only visibility; the world list is an admin-side picking source, never a
  table), and the geo-scoped feed. Build order: geography → categories +
  attribute-builder → listings + lifecycle → screening gateway (seam-first, filled at
  P2-d) → feed/home → search → storefronts → messaging.
  - P2-a geography (`public.locations` tree, active-only RLS, shallow ET+US seed) —
    built 2026-08-04; applied to `ethio-prod`. Staging application is an operator
    checklist item, and staging parity is **UNPROVEN** (never read from here).
    See `docs/features/geography.md`.
  - P2-b categories + attribute schema (`public.categories`,
    `public.category_tree_pointers`, `public.category_attributes`; REQ-017 three-concept
    model, REQ-020 attributes, deny-by-default RLS, 12 real top-level starter seed +
    one illustrative Vehicles attribute set) — built 2026-08-04; applied to
    `ethio-prod`. Staging application is an operator checklist item. The authoritative
    WooCommerce import and the attribute-builder admin UI are named later tasks.
    See `docs/features/categories.md`.
  - P2-c listings core (`public.listings`, `public.listing_photos`;
    `submit_listing`/`transition_listing` as the sole write paths with the REQ-021
    screening pass-through stub; `expire_stale_listings` authored, schedule deferred;
    private strip-gated `listing-photos` bucket; deny-by-default RLS with active-only
    public read + seller-own; CI bypass guard proven in both directions) — built
    2026-08-04; applied to `ethio-prod`. Photos are stored but NOT surfaced until
    P2-c-photos ships the EXIF/GPS strip (DEC-009). Staging application (and creating the
    private bucket there) is an operator checklist item.
    See `docs/features/listings.md`.
  - Standing rule from 2026-08-04: **migrations must be idempotent** (guarded DDL,
    `DROP ... IF EXISTS` before `CREATE`, `ON CONFLICT DO NOTHING` seeds).
  - Queued for the P2 gate: INC-028 (duplicate `public.update_updated_at_column()`
    entry in `pg_proc`).
- **DEC-013 (2026-08-07):** marketplace epoch resequenced R→A→B→C→D→F→G; **Phase R (RBAC core) inserted before A1** and is the current build target; Discovery (F) and Contact (G) are named pre-launch phases; the governance 0–9 ladder remains the master map. See spec-ledger DEC-013 + docs/tracking/gap-register.md.
- **Phase R (RBAC core) — build COMPLETE 2026-08-09** (R1, R1a, R2, R2b, R3, R3a all CLEAN; CI green incl. RBAC E2E; four-lens review at docs/governance/reviews/phase-r-closeout.md). Gate stamps on the final staging proof-run paste. Next build target: A1 (category taxonomy + attributes import).
- **Phase A (data foundations) — build COMPLETE 2026-08-10** (A1, A1b, A2, A2b, A3 all CLEAN on prod; CI green throughout; four-lens review at docs/governance/reviews/phase-a-closeout.md). Gate stamps on the consolidated staging paste. Phase R gate STAMPED (staging proofs green, S27 addenda). Next build target: Phase B — posting wizard spec.
- **DEC-014 (2026-08-10):** Foundations-First Admin Epoch ratified — U0–U8 (admin shell, users, roles console, audit/security, locations, categories, attributes, tags, AI images) precede the wizard; wizard ships LAST. Current build target: U0 (admin shell & navigation). See spec-ledger DEC-014.
- **U0 (admin shell & navigation) — build COMPLETE 2026-08-16** (CI green e0af7bf; 17 shell laws with tests; sign-out hard reset + session policy Tier A; four-lens review at docs/governance/reviews/u0-closeout.md). Gate stamps on the operator's published-URL walk. Next build target: U1 Users.
- **U1 (Users) — COMPLETE 2026-08-19** (CI green 70f5176, 17/17 full suite; operator walk passed incl. step-up re-walk; four-lens review at docs/governance/reviews/u1-closeout.md; DEC-015 primitives + DEC-016 parity plan ratified). Next build target: U2 Roles & Permissions console.
- **U2 (Roles & Permissions) — COMPLETE 2026-08-22** (CI green 52e184b, 17/17; operator walk passed; four-lens review at docs/governance/reviews/u2-closeout.md; DEC-016 permissions registered). Next build target: U3 Audit & Security + guardrailed impersonation.
- **U2b + U3 (Assignable-scope · Audit & Security · Impersonation v1) — COMPLETE 2026-08-29** (production-build harness certified green, epoch closed at run 33228828535 under G22; operator walk passed; four-lens review at docs/governance/reviews/u3-closeout.md; DEC-017/018/019 shipped, DEC-020 ratified pending setup, DEC-021 registered → ACT-U3-1). Next build targets (operator-directed reorder 2026-08-29): **U4 Translations console**, then U5 Locations.
- **U4 Translations COMPLETE IN FULL (a–k) — 2026-09-02**; era reviews at reviews/u4-closeout.md (S32+S33). NEXT: **Category Era: D0 landed; next C1** — consumes entity_translations; spec ratified 2026-09-02 at /docs/governance/category-era-spec.md.



## Standing reads

Governing instructions: Claude supervisor v1.10 · Lovable Project Knowledge v3.8. Canonical truth: this file + /docs/spec/spec-ledger.md. Evidence channels: docs/tracking/ci-status.md (two-step SHA check), docs/tracking/e2e-last-failure.md, nightly-last-failure.md, flake-ledger.

## Environment

Prod = published site (human testers). Staging = ethio-staging (automated suite only; Ethereal SMTP sink, ephemeral). Branch law DEC-020: dev is the working branch; main promote-on-green only.

## Current position


(superseded 2026-09-25 — kept as the 2026-09-17 record) Current position: CURATION ERA CLOSED 2026-09-15 (docs/governance/reviews/curation-era-closeout-2026-09-15.md). LOCATIONS ERA CLOSED 2026-09-17 (docs/governance/reviews/locations-era-closeout-2026-09-17.md): every ISO country seeded, 18 markets open, Ethiopia deep (14 regions · 189 cities · 11 sub-cities), diaspora trees under 23 countries for the Ethiopian AND Eritrean community (ruling 2026-09-16), Eritrea seeded closed, the shell picker on cached routes with a country-level guess (city-level on the ethio.com cutover), the saved-area cookie, auto-select; DEC-062–066 and DEC-075 ratified; DEC-063 and REQ-033 amended; INC-201/202/204–214/216 CLOSED, INC-203 and INC-215 OPEN. U6 POSTING: spec v3 (S39 + §12 amendments D11–D18, 2026-09-17), moderation design of record docs/governance/moderation-design.md; A1 LANDED 2026-09-17 (fd11c7ab/7145d6e9: posting read, validation authority, capabilities, price period, search column, residency facts, revisions, verdicts, rate limits) + A1-R. Open: INC-186, INC-203, INC-215, ACT-C3-1, C3-UX-3/4/10, C4 tags (→ U7), the U7 rail flyout, the assets badge, the Eritrea market decision, Q-014 (residency, DSA), amendment proposals pending the operator (Knowledge v3.10, instructions v1.12). NEXT: U6-A2 (the draft door: submit_listing re-declared whole with step-level validation, server-derived residency, coverage against plans, price/period/currency laws, contact shape, revisions; publish/transition/renew/sold/relist/cover/photo doors; INC-215 fix; the categories-file cells for capabilities and default_price_period) → B1 → B2 → C1 → C2 → D1 → D2 → E1 → E2 → era gate.

Current position 2026-09-25 (dev `ca322796`, main promoted): U6 POSTING — A1, A2 (M+C), B1, B2, C1 (a/b + R1 → R3b-4), C2 (a/b) LANDED 2026-09-17 → 09-21 with the import cells (M-MAINT-2/3/3b, M-FACTS, M-ORDER, M-SHAPE, M-SWATCH) and the wizard rulings D24–D28, D30/D33 (reader half), D34, D35, D38–D41; D37-1 catalog finder LANDED 2026-09-24 (+ E1 corrective, INC-273); DEC-076 sign-in LANDED 2026-09-23. OPEN in U6: D1 screening gateway (publish defers to it), D2 admin review, E1 My Listings, E2 expiry job, the D30/D33 file-cell half, D31 (spec v1 for approval 2026-09-25 → DEC-079), D37-2/D37-3, D42 (backlog); era gate open. CATALOG: dependency passes cycles 1–17 complete over 17 roots; cycle 18 batches 1–2 (+ follow-ups, addenda) imported 2026-09-24/25; batch 3 (Commercial, Sports, Pets) chartered, batch 4 (Travel, Food) next; walks for batch 2 pending the operator. HARNESS: DEC-077 (photo reaper) and DEC-078 (flaky bodies) closed 2026-09-25; INC-218 step 3, INC-282–285 landed; INC-286/287 evidence-pending; shard DEC pending (6 → ~10 shards, rule: the slowest shard within 15 % of the mean over three green runs). LEDGERS: incidental-findings reconciled INC-217 → INC-287 (next free 288); DEC-079 reserved for D31. OPEN (carried): INC-186, INC-203, INC-218, INC-261/262/267 (importer census), ACT-C3-1, C3-UX-3/4/10, C4 tags (→ U7), the U7 rail flyout, the assets badge, the Eritrea market decision, Q-014. NEXT: D31-M (after approval) → D31-C → importer census/fixes (INC-261/262/267, INC-198/199) → shard DEC → cycle 18 batches 3–4 → U6 D1 → D2 → E1 → E2 → era gate. Amendment proposals pending the operator: instructions v1.13 (§8 flake-ledger read), Knowledge v3.11 (one local suite; identity picks; price basis).
