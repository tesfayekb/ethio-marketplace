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

Follow Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits. Server/RLS alone authorizes; signed-in screens (/legal/publishing too, D236) gate by `requireSignedIn` (signed-in-route.ts), never their own getSession. No silent catch-and-continue: a reader's door error is a typed `ReaderError` (reader-failure.ts), never `if (error) return null`. Routes: `defineRoute` + a src/lib/schemas shape (`.strict()`); doors via `doorCall`, ownership via `ownListing`, answers via answer.ts, outside calls via `upstream()`; dials declared in the spec (`refuseAs` for a posting verdict); no request.json/new Response/createClient/fetch elsewhere (routes.test.ts, ESLint).

- New tables, sequences and functions in public are born closed to browser roles: the migration names each GRANT (a browser grant needs its scripts/public-surface-allowlist.txt line); each new function restates REVOKE … FROM PUBLIC (bundle 8). A finality trigger lets its own ON DELETE SET NULL keys through (INC-812). Owner writes to ads, photos and seller names pass acceptance_guard (DEC-216; takedowns pass); other signed-in write doors check acceptance or sit in scripts/acceptance-doors-allowlist.txt (D227).
- The database tool applies its input at once: check a scratch copy, then submit FINAL text once (never a stub, comment or draft); remove the scratch.
- Text attributes: preset allowlist (`attr_preset_ok`), never free regex; option records: the strict shape `value, label_en, label_am, parent, active, bounds, aliases`, unknown keys refused, defaults omitted (DEC-050).
- A console save never drops a field it does not show: editors round-trip every stored field (INC-188).
- CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md, e2e-last-failure.md, guards-last-failure.md; never dev/main copies or a git fetch of it (S87).
- Market-neutral wording (DEC-094): a market-dependent statement names no single country — use {country}; cultural facts are not market statements.
- Data-API lists use `readAllPages`: keyset paging, never positional (INC-452).
- Lint workflows with `actionlint -shellcheck= -pyflakes=` as CI does (INC-457).
- Browser tests start only with `bun run e2e:local` / `e2e:changed`, never plain `playwright test` (INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1` — CI's only gate, local-backend-proof.yml, DEC-218); never supabase/config.toml (D228).
- CI: 16 lanes, 1 worker each (DEC-232).
- Scanner output in CI logs/ci-evidence: counts only; details in the Security tab (DEC-132).
- Action labels: two or three words, no article or bracketed remark, every language; explanations in help text, never a button (D81); a flagged label takes the brief's shorter text; the allowlist needs a reason.
- A brief's string text is copied by key, character for character; no Amharic of your own.
- A door's new refusal: the census names every caller and the order each reaches it (INC-481).
- A map indexed by an outside key is read through `ownValue`, never `map[key]` (INC-485).
- CutText for cut names; useLabelRoom per crowded row; action-focus modality installs once at hydration.
- Flake-fix proofs use manual Flake check, separate from CI/promotion: no local browsers (DEC-184).
- Import previews in tests use `withinPreviewBudget`; only IG-3 drives the limit, never raised (INC-792).
- QR: the encoder lives only in `src/server/qr.ts`, off first paint (a guard); public QR routes check the id's shape, no DB read.
- Shell (bundle 21): cards take `CARD_SURFACE` (no 1-px border; state borders on top); one ☰ per width, top-left; md tables use `tbl-md:` (D135).
- Legal: texts only via `LegalText`/`legalTextFor`, never HTML; facts are {{setting}} tokens frozen per version; other languages are legal_version_texts rows (DEC-228); every agreement tick is `AgreeToDocument` with `[text](role)` link tokens (D235); page data via `legalPageData` (legal-page-data.ts), never on the first paint.
- Admin menu alerts (DEC-219): a section's `alert` (sections.ts) is read by `useNavAlerts` as one server boolean; the rail draws a dot.
- Strings (DEC-231): keys only admin files use go in en-admin.ts/am-admin.ts, others in en-base.ts/am-base.ts; en.ts/am.ts join them; admin-layer.test.ts judges.
- Dates/numbers: `formatLocale` (src/lib/format-locale.ts); names via catalogText, entityName, optionLabel; options translate as entity rows `option:<value>` beyond en/am (DEC-233, INC-820).
- Page-wide data (the category tree) is one subscribed store, never a per-mount copy (INC-788).
- Draft saves: a run armed before a Next never carries it; a follow-up is sent by the run that got the answer (INC-791).
- Guards (DEC-240/241): a guard is a scripts/conformance census (kit.ts; allowlist `key | reason | until`, stale/expired fail; wired.test.ts names its caller); every VOLATILE signed-in door names a caller gate or has its caller-gates-allowlist line; shell guards capture, then grep — never `| grep -q`.
