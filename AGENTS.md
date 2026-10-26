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

Follow Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits. Server/RLS alone authorizes; signed-in screens gate by `requireSignedIn` (signed-in-route.ts) and are listed in `SIGNED_IN_PAGES` (signed-in-pages.ts, which the shell's guard reads), never their own getSession. No silent catch-and-continue: a reader's door error is a typed `ReaderError` (reader-failure.ts), never `if (error) return null`. Routes: `defineRoute` + a src/lib/schemas shape (`.strict()`), server functions `createServerFn().validator(<that shape>)` (server-fns.ts); doors via `doorCall`, ownership via `ownListing`, answers via answer.ts, caches via versionCache, cursors via cursor.ts, outside calls via `upstream()`; UUIDs only via src/lib/uuid.ts; dials only from src/lib/dials.ts, declared in the spec (`refuseAs` for a verdict) or spent via `spend` (src/server/dials.ts); read failures via `readFailure`; a client that left gets `clientAborted` 499; staff checks via `callerHasPermission`; downloads via `download` + imports/csv.ts; staff imports via `defineImportRoute` (imports/route.ts); browser calls via `callRoute`/`downloadRoute` (route-client.ts); no request.json/new Response/createClient/fetch elsewhere (routes.test.ts, ESLint).

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
- Strings (DEC-258): a key only routes declaring a layer show (`staticData: { strings: ["member"] }`; admin.tsx declares admin and member) lives in that layer's files (en-admin/am-admin, en-member/am-member), others in en-base.ts/am-base.ts; StringsLayerGate (src/components/shell/strings-layer-gate.tsx; declaredLayers in strings-layers.ts) loads a route's layers before it draws; en.ts/am.ts join them; scripts/conformance/strings-layers.ts judges; `<html lang>` follows the applied catalog (`appliedLanguage`), never the selection.
- Overlays (DEC-259, DEC-260): Tooltip, DropdownMenu, Dialog and AlertDialog are facades over overlay-facade.tsx (src/components/ui/tooltip.tsx, dropdown-menu.tsx, dialog-primitive.tsx — under dialog.tsx and sheet.tsx — and alert-dialog-primitive.tsx — under alert-dialog.tsx); their Radix code (the four impl files, re-exported by overlays-impl.ts) arrives on demand through overlay-loader.ts; their triggers are always asChild; nothing else imports @radix-ui/react-tooltip, @radix-ui/react-dropdown-menu, @radix-ui/react-dialog, @radix-ui/react-alert-dialog or the impl files by value; scripts/conformance/overlays.test.ts judges.
- Fonts (DEC-262): no page downloads a font; every family comes from src/styles.css's --font-sans / --font-display (the device's stack; Tailwind font-sans, font-display) — no web-font host, @font-face, font file or family by name anywhere else; scripts/conformance/fonts.test.ts judges.
- Supabase client (DEC-261): browser code a public page draws reaches it only through src/lib/supabase-door.ts (getSupabase, onAuthChange, currentSession, rpc — a signed-out visitor's database call is the anonymous call, no client); every reader of currentSession reads its `failed` — a failed read is unknown, never signed out (INC-914, CF-SESSION-1) — and browser code never reads `.auth.getSession()` or `.auth.getUser()` around it (CF-SESSION-3; an exception is an allowlist line with its DEC); the project's address and key and the session's storage names only through projectEnv, storedSessionKey and besideStoredSession (CF-PROJECT-1); route calls carry the bearer through src/lib/session-bearer.ts (never re-register the platform's auth-attacher); no public page's first download carries the client — check-bundle-size (MUST_NOT_CARRY) and the weight guard judge.
- Dates/numbers: `formatLocale` (src/lib/format-locale.ts); names via catalogText, entityName, optionLabel; options translate as entity rows `option:<value>` beyond en/am.
- Page-wide data (the category tree) is one subscribed store, never a per-mount copy.
- Draft saves: a run armed before a Next never carries it; a follow-up is sent by the run that got the answer.
- Guards: a guard is a scripts/conformance census (kit.ts; allowlist `key | reason | until`, stale/expired fail; wired.test.ts names its caller); every VOLATILE signed-in door names a caller gate or has its caller-gates-allowlist line; shell guards capture, then grep — never `| grep -q`; no file gains a non-null assertion (CF-NN-1: a file's count in non-null-allowlist.txt only falls).
- Speed (D234): each page's first-download ceiling lives in scripts/route-budgets.mjs; on-demand modules via `loadOnce` (src/lib/load-once.ts) and on-demand components via `resilientLazy` (src/lib/resilient-lazy.ts), never a bare React.lazy; a read every page makes is preloaded by `firstReadLinks` (src/lib/first-reads.ts) from its reader's own path builder; the listings pages' first feed page comes from the server in the page stream (`readFirstFeedPage`, src/server/first-screen.ts) as a `HeldFirstPage` (src/features/feed/held-first-page.ts, read at once on arrival): useFeed takes it once and the feed draws it until that read lands (`useHeldFirstPage`), so React keeps the server's cards; below-the-fold work via `useNearViewport` (src/lib/use-near-viewport.ts); glyphs via `useCategoryGlyphs`; the calendar (date-calendar.tsx) and schema shapers (posting/schema-shape.ts) stay off public pages.
- On-demand failures (INC-911): a piece fetched on demand whose download fails reports through `reportOnDemandFailure` (src/lib/on-demand-failure.ts) — the shell's one notice (`OnDemandNotice`) offers Refresh, or `LoadFailedHere` says it in the piece's own place; never a silent blank; scripts/conformance/on-demand-failure.test.ts judges every caller of an on-demand loader, its allowlist lines `file | reason | until`.
