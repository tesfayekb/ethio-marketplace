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

Follow Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits. Server/RLS alone authorizes; signed-in screens gate by `requireSignedIn` (signed-in-route.ts), never their own getSession. No silent catch-and-continue: a reader's door error is a typed `ReaderError` (reader-failure.ts), never `if (error) return null`. Routes: `defineRoute` + a src/lib/schemas shape (`.strict()`), server functions `createServerFn().validator(<that shape>)` (server-fns.ts); doors via `doorCall`, ownership via `ownListing`, answers via answer.ts, caches via versionCache, cursors via cursor.ts, outside calls via `upstream()`; UUIDs only via src/lib/uuid.ts; dials only from src/lib/dials.ts, declared in the spec (`refuseAs` for a verdict) or spent via `spend` (src/server/dials.ts); read failures via `readFailure`; a client that left gets `clientAborted` 499; staff checks via `callerHasPermission`; downloads via `download` + imports/csv.ts; staff imports via `defineImportRoute` (imports/route.ts); browser calls via `callRoute`/`downloadRoute` (route-client.ts); no request.json/new Response/createClient/fetch elsewhere (routes.test.ts, ESLint).

- New tables, sequences and functions in public are born closed to browser roles: the migration names each GRANT (a browser grant needs its scripts/public-surface-allowlist.txt line); each new function restates REVOKE … FROM PUBLIC. A finality trigger lets its own ON DELETE SET NULL keys through. Owner writes to ads, photos and seller names pass acceptance_guard (takedowns pass); other signed-in write doors check acceptance or sit in scripts/acceptance-doors-allowlist.txt.
- The database tool applies its input at once: check a scratch copy, then submit FINAL text once (never a stub, comment or draft); remove the scratch.
- Text attributes: preset allowlist (`attr_preset_ok`), never free regex; option records: the strict shape `value, label_en, label_am, parent, active, bounds, aliases`, unknown keys refused, defaults omitted.
- A console save never drops a field it does not show: editors round-trip every stored field.
- CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md, e2e-last-failure.md, guards-last-failure.md; never dev/main copies or a git fetch of it.
- Market-neutral wording: a market-dependent statement names no single country — use {country}.
- Data-API lists use `readAllPages`: keyset paging, never positional.
- Lint workflows with `actionlint -shellcheck= -pyflakes=`.
- Browser tests start only with `bun run e2e:local` / `e2e:changed`, never plain `playwright test`; targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`); never supabase/config.toml.
- CI: 16 lanes, 1 worker each.
- Scanner output in CI logs/ci-evidence: counts only.
- Action labels: two or three words, no article or bracketed remark, every language; explanations in help text, never a button; a flagged label takes the brief's shorter text.
- A brief's string text is copied by key, character for character; no Amharic of your own.
- A door's new refusal: the census names every caller and the order each reaches it.
- A map indexed by an outside key is read through `ownValue`, never `map[key]`.
- CutText for cut names; useLabelRoom per crowded row.
- Flake-fix proofs use the manual Flake check, never local browsers.
- Import previews in tests use `withinPreviewBudget`; only IG-3 drives the limit, never raised.
- QR: the encoder lives only in `src/server/qr.ts`, off first paint (a guard); public QR routes check the id's shape, no DB read.
- Shell: cards take `CARD_SURFACE` (no 1-px border; state borders on top); one ☰ per width, top-left; md tables use `tbl-md:`.
- Legal: texts only via `LegalText`/`legalTextFor`, never HTML; facts are {{setting}} tokens frozen per version; other languages are legal_version_texts rows; every agreement tick is `AgreeToDocument` with `[text](role)` link tokens; page data via `legalPageData` (legal-page-data.ts), never on the first paint.
- AI: every model call is `aiCall` (src/server/ai/gateway.ts) with a task in tasks.ts; provider hosts, keys and stand-in flags live only under src/server/ai/ (GWC); stand-ins only via `standInMode` (src/server/stand-in.ts); vendors (Supabase, Lovable) only through their seams (vendor-seams.test.ts).
- Admin menu alerts: a section's `alert` (sections.ts) is read by `useNavAlerts`.
- Strings: keys only admin files use go in en-admin.ts/am-admin.ts, others in en-base.ts/am-base.ts; en.ts/am.ts join them; admin-layer.test.ts judges; `<html lang>` follows the applied catalog (`appliedLanguage`), never the selection.
- Dates/numbers: `formatLocale` (src/lib/format-locale.ts); names via catalogText, entityName, optionLabel; options translate as entity rows `option:<value>` beyond en/am.
- Page-wide data (the category tree) is one subscribed store, never a per-mount copy.
- Draft saves: a run armed before a Next never carries it; a follow-up is sent by the run that got the answer.
- Guards: a guard is a scripts/conformance census (kit.ts; allowlist `key | reason | until`, stale/expired fail; wired.test.ts names its caller); every VOLATILE signed-in door names a caller gate or has its caller-gates-allowlist line; shell guards capture, then grep — never `| grep -q`.
