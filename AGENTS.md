<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project constitution (all agents)

Follow Lovable Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits; search before creating; no duplicates. 360px-first, logical RTL CSS; no literal UI text (EN+AM keys). Tables: RLS/policies/GRANTs in the same append-only migration; personal data: home_country_code. UTC timestamps; integer money; no secrets in code/commits. Server/RLS alone authorizes. No silent catch-and-continue. Public pages: SSR, absolute canonical/og URLs. Structural edits update /docs/features/<name>.md + \_changelog.md together.

- New tables, sequences and functions in schema public are born closed to browser roles: the migration names each GRANT (a browser grant needs its line in scripts/public-surface-allowlist.txt); each new function restates REVOKE … FROM PUBLIC (bundle 8). A finality trigger lets its own ON DELETE SET NULL keys through (INC-812). Owner writes to ads, photos and seller names pass the acceptance_guard trigger (DEC-216; takedowns pass); other signed-in write doors check acceptance or are in scripts/acceptance-doors-allowlist.txt (D227).
- The database tool applies its input at once: check a scratch copy, then submit FINAL text once (never a stub, comment or draft); remove scratch drafts.
- Text attributes are validated by preset allowlist (`attr_preset_ok`), never free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys refused, defaults omitted (DEC-050).
- A console save never drops a field it does not show: editors round-trip every stored field (INC-188).
- E2E tests needing only a signed-in account use `leaseUser()` (lane pool, reaped at lease); `createUser()` only for a new identity or a target account. Why: deleted users count as MAU (DEC-097).
- CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md, then e2e-last-failure.md and guards-last-failure.md; never dev/main copies or a git fetch of it (DEC-098, S87).
- Market-neutral wording (DEC-094): where a statement depends on the market, name no single country; use {country}. Cultural facts (teff, the Ethiopian calendar, brands) are not market statements.
- Data-API lists use `readAllPages` (src/lib/read-all-pages.ts): keyset paging, never positional (INC-452).
- Lint workflows with `actionlint -shellcheck= -pyflakes=`, as CI does (INC-457, INC-460).
- Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test` (production `.env`, INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`: https, hosted-like auth and mail), CI's only gate (local-backend-proof.yml, DEC-218); never supabase/config.toml (D228).
- CI lanes run 2 test workers, smoke and email 1 (DEC-217); after INC-813 (DEC-230), cross-worker interference or a new flaky test returns them to 1. Why: one worker made a lane take 19 min.
- Scanner output in CI logs and ci-evidence is counts only; details in the Security tab (DEC-132).
- Action labels: two or three words, no article or bracketed remark, every language; explanations go in help text, never a button (D81). A label scripts/list-action-labels.test.ts flags takes the brief's shorter text; its allowlist needs a reason.
- A brief's string text is copied by key, character for character; no Amharic of your own (bundle 7 turn 5).
- When a door gains a refusal, the census names every caller and the order each reaches it (INC-481).
- A map indexed by an outside key is read through `ownValue` (src/lib/own-key.ts), never `map[key]` (INC-485).
- Cut names use CutText; crowded-row captions use useLabelRoom on their own row; action-focus modality installs once at hydration (grapheme floors kept, no resize loops or duplicate listeners).
- Flake-fix proofs use manual Flake check, separate from CI/promotion: no local browsers (DEC-184).
- Import previews in tests use `withinPreviewBudget` (e2e/helpers/rate-window.ts); only IG-3 drives the limit, never raised (INC-792).
- QR encoding stays in `src/server/qr.ts`; public QR routes check the id's shape without database reads; a guard keeps the encoder off first paint.
- Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts): no 1-px border, state borders on top; one ☰ per width, top-left (rail-menu below 768, folds the menu from 768); md tables use `tbl-md:` (D135, D115, D204).
- Legal (bundle 22): texts render only via `LegalText` (src/features/legal), never as HTML; facts are {{setting}} tokens from the version's frozen settings; reviews are rows of legal_reviews (DEC-219).
- Admin menu alerts (DEC-219): a section's `alert` (sections.ts) is read by `useNavAlerts` (src/features/admin/nav-alerts.ts) as one server boolean; the rail draws a dot. Why: one derived menu.
- Page-wide data (the category tree) is one subscribed store (`useSyncExternalStore`), never a per-mount copy (INC-788).
- Draft saves: a run armed before a Next never carries it; a follow-up is sent by the run that got the answer (INC-791).
