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

Follow Lovable Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits. Tables: RLS/policies/GRANTs in the same append-only migration. Integer money. Server/RLS alone authorizes. No silent catch-and-continue. Public pages: SSR, absolute canonical/og URLs.

- New tables, sequences and functions in schema public are born closed to browser roles: the migration names each GRANT (a browser grant needs its line in scripts/public-surface-allowlist.txt); each new function restates REVOKE … FROM PUBLIC (bundle 8). A finality trigger lets its own ON DELETE SET NULL keys through (INC-812). Owner writes to ads, photos and seller names pass the acceptance_guard trigger (DEC-216; takedowns pass); other signed-in write doors check acceptance or are in scripts/acceptance-doors-allowlist.txt (D227).
- The database tool applies its input at once: check a scratch copy, then submit FINAL text once (never a stub, comment or draft); remove scratch drafts.
- Text attributes are validated by preset allowlist (`attr_preset_ok`), never free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys refused, defaults omitted (DEC-050).
- A console save never drops a field it does not show: editors round-trip every stored field (INC-188).
- E2E tests needing only a signed-in account use `leaseUser()` (lane pool); `createUser()` only for a new identity or target account. Why: deleted users count as MAU (DEC-097).
- CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md, then e2e-last-failure.md and guards-last-failure.md; never dev/main copies or a git fetch of it (DEC-098, S87).
- Market-neutral wording (DEC-094): where a statement depends on the market, name no single country; use {country}. Cultural facts are not market statements.
- Data-API lists use `readAllPages`: keyset paging, never positional (INC-452).
- Lint workflows with `actionlint -shellcheck= -pyflakes=` as CI does (INC-457, INC-460).
- Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test` (production `.env`, INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`: https, hosted-like auth and mail), CI's only gate (local-backend-proof.yml, DEC-218); never supabase/config.toml (D228).
- CI: 16 test lanes, 1 worker each (DEC-232; DEC-230: workers collided).
- Scanner output in CI logs and ci-evidence: counts only; details in the Security tab (DEC-132).
- Action labels: two or three words, no article or bracketed remark, every language; explanations go in help text, never a button (D81). A label list-action-labels.test.ts flags takes the brief's shorter text; its allowlist needs a reason.
- A brief's string text is copied by key, character for character; no Amharic of your own (bundle 7 turn 5).
- A door's new refusal: the census names every caller and the order each reaches it (INC-481).
- A map indexed by an outside key is read through `ownValue`, never `map[key]` (INC-485).
- CutText for cut names; useLabelRoom per crowded row; action-focus modality installs once at hydration.
- Flake-fix proofs use manual Flake check, separate from CI/promotion: no local browsers (DEC-184).
- Import previews in tests use `withinPreviewBudget`; only IG-3 drives the limit, never raised (INC-792).
- QR: the encoder lives only in `src/server/qr.ts`, kept off first paint by a guard; public QR routes check the id's shape, no database read.
- Shell (bundle 21): cards take `CARD_SURFACE` (no 1-px border; state borders on top); one ☰ per width, top-left; md tables use `tbl-md:` (D135, D115, D204).
- Legal (bundle 22): texts render only via `LegalText`/`legalTextFor`, never as HTML; facts are {{setting}} tokens frozen per version; other languages are legal_version_texts rows (DEC-228); every agreement tick is `AgreeToDocument` (agree-to-document.tsx); its census test refuses another Checkbox under a legal key.
- Admin menu alerts (DEC-219): a section's `alert` (sections.ts) is read by `useNavAlerts` (nav-alerts.ts) as one server boolean; the rail draws a dot.
- Strings (DEC-231): keys only admin-only files use go in en-admin.ts/am-admin.ts (the admin gate loads them), others in en-base.ts/am-base.ts; en.ts/am.ts join them; admin-layer.test.ts judges.
- Dates and numbers: `formatLocale` (src/lib/format-locale.ts); names via catalogText, entityName, optionLabel; options translate as entity rows `option:<value>` beyond en/am (DEC-233, INC-820).
- Page-wide data (the category tree) is one subscribed store (`useSyncExternalStore`), never a per-mount copy (INC-788).
- Draft saves: a run armed before a Next never carries it; a follow-up is sent by the run that got the answer (INC-791).
- Guards (DEC-240/241, INC-832): every VOLATILE signed-in door names one of the four caller gates (scripts/caller-gates-allowlist.txt header) or has a line there `fn | reason | until`; shell guards capture, then grep — never `| grep -q`.
