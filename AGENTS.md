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

- A new table, sequence or function of schema public is born closed to the browser roles: its migration names every GRANT it needs (a browser grant only with its line in scripts/public-surface-allowlist.txt), and every new function restates REVOKE … FROM PUBLIC in its own file (bundle 8).
- The database tool applies its input immediately: write and check a scratch migration, then submit FINAL text once, never a stub, comment or draft; remove scratch drafts before turn end (prevents comment-only applies, 2026-10-04/07).
- An action label that the label check flags (scripts/list-action-labels.test.ts) is shortened by a text the brief gives; the allowlist takes a key only with its reason.
- Text attributes are validated by preset allowlist (`attr_preset_ok`), never by free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys are refusals, defaults are omitted (DEC-050).
- A console save must never drop a field it does not show: editors round-trip every stored field of a record (INC-188).
- E2E tests that only need a signed-in account use `leaseUser()` (lane-scoped pool, reaped at lease); `createUser()` only for a brand-new identity or a target account. Why: deleted users still count as monthly active users (DEC-097).
- CI evidence: read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md first, then `e2e-last-failure.md` and `guards-last-failure.md` there; never dev/main copies or `git fetch origin ci-evidence`. Why: those copies are frozen or absent (DEC-098, S87).
- MARKET-NEUTRAL WORDING (DEC-094): UI strings and catalogue text (labels, options, helps) never name Ethiopia or any one country where the statement depends on the seller's or buyer's market; write it with the {country} token. Product and cultural facts (teff, the Ethiopian calendar, a brand's name) are not market statements.
- Lists read from the data API go through `readAllPages` (src/lib/read-all-pages.ts): ordered by a unique key, each page asked for after the last key it has. Why: 1,000-row caps and concurrent writes make positional paging lose or repeat rows (INC-452).
- Lint workflows with `actionlint -shellcheck= -pyflakes=`, as CI does (INC-457, INC-460). Why: rejected workflows lose evidence; local shellcheck varies.
- Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test`; they refuse targets other than ethio-staging, save CI's temporary backend `http://127.0.0.1:54321` under `E2E_LOCAL_BACKEND=1` (config in local-backend-proof.yml, never supabase/config.toml). Why: plain launches use production `.env` (INC-464, DEC-146, D228).
- Scanner output in CI logs and in the ci-evidence files is counts only, never a finding's file, line or rule id. Why: both are public; details belong in the Security tab (DEC-132 rule 2).
- Button and action labels are short: two or three words, no article, no bracketed remark, in every language; an explanation is written once, as help text, never inside a button (D81).
- A text a brief gives for a string is copied by key, character for character; no Amharic of your own for it. Why: prevents unapproved wording (bundle 7 turn 5).
- When a door gains a refusal, the census names every caller of the door and the order in which each caller reaches it. Why: a new refusal broke the import undo (INC-481).
- A map indexed by a key from outside (a URL, storage, a cookie, a database row) is read through `ownValue` (src/lib/own-key.ts), never `map[key]`. Why: inherited keys crashed the page (INC-485).
- Cut names use CutText; crowded-row captions use useLabelRoom on their own row; action-focus modality installs once at hydration (grapheme floors kept, no resize loops or duplicate listeners).
- Flake-fix proofs use manual Flake check, separate from CI/promotion: no local browsers (DEC-184).
- QR encoding stays in `src/server/qr.ts`; public QR routes check the id's shape without database reads; the marketplace guard keeps the encoder off first paint.
- Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts) — no 1-px border, state borders on top (the look law); one ☰ per width, top-left: below 768 it opens rail-menu, from 768 it folds the menu; md tables use `tbl-md:`. Why: D135, D115, D204.
- Legal (bundle 22): texts render only via `LegalText` (src/features/legal), never as HTML; facts are {{setting}} tokens from the version's frozen settings.
