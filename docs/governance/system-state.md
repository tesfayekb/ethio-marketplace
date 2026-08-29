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



## The three standing supervisor reads

1. `docs/tracking/ci-status.md` — the two-step SHA check: read the file, then confirm
   its recorded commit matches the HEAD you cloned. A stale SHA means the verdict
   belongs to an older commit and proves nothing about the current one.
2. `docs/tracking/nightly-status.md` — the 48h staleness rule: a timestamp older than
   ~48 hours means the nightly schedule stopped, which is itself a failure.
3. **Guard Proof** (`.github/workflows/guard-proof.yml`) — dispatched and green at
   every phase gate; it proves the B-3 and C-4 guards fail against mutation fixtures,
   not merely that they pass on clean source.

## Standing environment facts

- Staging E2E mail sink: **Ethereal** (ruling R1). `E2E_EMAIL_SINK=1` gates the
  sign-up/recovery E2E cases.
- Production SMTP: Resend **test** domain until the launch-gate custom sending domain
  lands — only the account owner's address completes a real send today.
- Databases: `ethio-prod` (real) and `ethio-staging` (E2E target).

## Phase 2 progress

- P2-a geography — CLOSED
- P2-b categories + attributes — CLOSED
- P2-c listings core + screening seam — CLOSED
- P2-c-tier `listings.tier` (LIVE ranking lever) — CLOSED on `ethio-prod`;
  **pending operator apply on `ethio-staging`**
- Design foundation (AppShell, panels, tokens, typography, brand, feed shape) — CLOSED

Planning documents for the posting epoch (read in this order): `docs/features/performance-strategy.md`,
`docs/spec/posting-flow-spec.md`, `docs/spec/posting-foundations-build-plan.md`; thread context in
`docs/governance/handoffs/2026-08-05-thread3-handoff.md`.

Next: **P2-c-form** (the Post a Listing body on the My Listings panel), then view-tracking
and location-scoping with real ranking — the two pre-launch backend features that fill the
feed's documented seams.

## Governing instructions

Claude Project v1.4 (project settings; intent mirrored in `governance.md`). Lovable
Knowledge: v3.1 + H2 (`docs/governance/lovable-knowledge.md`).

Launch-gate items: see `docs/governance/launch-gate.md`.

Updated: 2026-08-05
