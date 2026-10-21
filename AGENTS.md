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

- A new table, sequence or function of schema public is born closed to the browser roles: its migration names every GRANT it needs (a browser grant only with its line in scripts/public-surface-allowlist.txt), and every new function restates REVOKE … FROM PUBLIC in its own file (bundle 8). Owner writes to ads, photos and seller names pass the acceptance_guard trigger (DEC-216; takedowns pass); other signed-in write doors check acceptance or are in scripts/acceptance-doors-allowlist.txt (D227).
- The database tool applies its input immediately: write and check a scratch migration, then submit FINAL text once, never a stub, comment or draft; remove scratch drafts before turn end (no comment-only applies).
- Text attributes are validated by preset allowlist (`attr_preset_ok`), never by free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys are refusals, defaults are omitted (DEC-050).
- A console save must never drop a field it does not show: editors round-trip every stored field of a record (INC-188).
- E2E tests that only need a signed-in account use `leaseUser()` (lane-scoped pool, reaped at lease); `createUser()` only for a brand-new identity or a target account. Why: deleted users still count as monthly active users (DEC-097).
- CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md first, then e2e-last-failure.md and guards-last-failure.md; never dev/main copies or `git fetch origin ci-evidence` (frozen or absent; DEC-098, S87).
- MARKET-NEUTRAL WORDING (DEC-094): UI and catalogue text never name one country where the statement depends on the seller's or buyer's market; use the {country} token. Cultural facts (teff, the Ethiopian calendar, a brand's name) are not market statements.
- Data-API lists go through `readAllPages` (src/lib/read-all-pages.ts): keyset paging on a unique key; positional paging loses or repeats rows (INC-452).
- Lint workflows with `actionlint -shellcheck= -pyflakes=`, as CI does (INC-457, INC-460).
- Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test` (it would use production `.env`, INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`, https), which CI gates on via local-backend-proof.yml; never supabase/config.toml (D228).
- Scanner output in CI logs and ci-evidence is counts only, never a finding's file, line or rule id; details stay in the Security tab (DEC-132).
- Button and action labels: two or three words, no article, no bracketed remark, every language; an explanation goes once in help text, never in a button (D81). A label scripts/list-action-labels.test.ts flags takes the brief's shorter text; its allowlist takes a key only with a reason.
- A brief's text for a string is copied by key, character for character; no Amharic of your own (bundle 7 turn 5).
- When a door gains a refusal, the census names every caller and the order each reaches it (INC-481).
- A map indexed by an outside key (URL, storage, cookie, database row) is read through `ownValue` (src/lib/own-key.ts), never `map[key]` (INC-485).
- Cut names use CutText; crowded-row captions use useLabelRoom on their own row; action-focus modality installs once at hydration (grapheme floors kept, no resize loops or duplicate listeners).
- Flake-fix proofs use manual Flake check, separate from CI/promotion: no local browsers (DEC-184).
- Import previews in tests go through `withinPreviewBudget` (e2e/helpers/rate-window.ts); only IG-3 drives the limit; the budget is never raised (INC-792).
- QR encoding stays in `src/server/qr.ts`; public QR routes check the id's shape without database reads; the marketplace guard keeps the encoder off first paint.
- Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts): no 1-px border, state borders on top; one ☰ per width, top-left (below 768 it opens rail-menu, from 768 it folds the menu); md tables use `tbl-md:` (D135, D115, D204).
- Legal (bundle 22): texts render only via `LegalText` (src/features/legal), never as HTML; facts are {{setting}} tokens from the version's frozen settings.
- Page-wide data (the category tree) is one store readers subscribe to (`useSyncExternalStore`), never a per-mount copy (INC-788).
- Draft saves: a run armed before a Next never carries it; a follow-up is sent by the run that got the answer (INC-791).
