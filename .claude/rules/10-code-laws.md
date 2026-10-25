# 10 — Code laws (the constitution, by concern)

Every law names its mechanism (file) and, where one exists, the guard that fails when it is broken.
Before building or fixing anything: name the concern, find its mechanism in
`docs/governance/mechanisms.md` (a mechanism not in the register does not exist), use or extend it.
A second local version of a mechanism is a defect, not a shortcut.

## K — One mechanism per concern (G0)

- K1 Name the concern; find its shared mechanism (component, hook, utility, door, SQL function,
  constants module); extend it by a parameter, a row or a key — never fork it.
- K2 Your report lists every other place with the same concern that bypasses the mechanism
  (file:line), in scope or not; you fix only what the brief covers.
- K3 A new mechanism lands in the SAME landing as its conformance guard: a `scripts/conformance`
  census through `kit.ts` (allowlist grammar `key | reason | until`; stale or expired lines fail),
  proven on a planted bypass, with its caller named in `scripts/conformance/wired.test.ts`.
- K4 No literal language, country, currency or role code (`'am'`, `'ET'`, `'en-US'`, `"ETB"`) in app
  code or SQL outside the one constants module/function; a recorded exception is named inline.
  Market-neutral wording: a market-dependent statement names no single country — `{country}`.
- K5 Every call to an outside model or translation provider is `aiCall` (`src/server/ai/gateway.ts`)
  with a task in `src/server/ai/tasks.ts`: feature switch + budget (D158), the person's words only as
  quoted material under the one untrusted-text rule (D166, `src/lib/untrusted-text.ts`), output parsed
  against a schema (enum / bounded string / allowlisted bytes), never rendered as HTML or a URL, a
  deadline, an audit row written before a verdict about a person is acted on. Provider hosts, keys and
  stand-in flags live only under `src/server/ai/`; stand-ins only via `standInMode`
  (`src/server/stand-in.ts`, `isE2E && flag`); a missing key answers a refusal, never a stand-in.
  Guards: `src/server/ai/gateway.census.test.ts` (GWC), `src/server/stand-in.test.ts` (SIN).
- K6 Every server route parses input through the shared schema helper; every form through the shared
  field/validation primitive.

## Routes (G54 a) — `src/server/route.ts`

Every server endpoint is `defineRoute` with a `.strict()` zod shape from `src/lib/schemas/` (the UUID
regex only in `src/lib/schemas/primitives.ts`). The order is the law: body size ceiling → caller
(anon / optional / user / staff via `has_permission`) → content type → bounded read → strict UTF-8 →
schema → handler. Doors via `doorCall`; ownership via `ownListing` (a caller-scoped READ is never an
ownership check — INC-830); answers only via `src/server/answer.ts` (`ok`, `clientError`, `serverError`,
`stepUpRequired`, `download`, `bytes`, `clientAborted` 499); caches via `versionCache`; cursors via
`cursor.ts`; outside calls via `upstream()` with a deadline; read failures via `readFailure`; dials only
from `src/lib/dials.ts` declared in the spec or spent via `spend` (`src/server/dials.ts`); staff checks
via `callerHasPermission`; staff imports via `defineImportRoute` (`src/server/imports/route.ts`);
downloads via `download` + `imports/csv.ts`. No `request.json/formData/arrayBuffer/text`,
`new Response`, `createClient` or `fetch` anywhere else. A client sees ONE envelope and never a raw
Postgres or provider message (INC-447). A route's authority answers before ANY side effect: nothing is
deleted, written or sent upstream with the service role, and no dial is spent, until the caller-scoped
door has answered or ownership was asserted on a row read as the caller.
Guards: `scripts/conformance/routes.test.ts` (CF-RT), the ESLint route-boundary block, `dials.test.ts`,
`import-doors.test.ts`, `scripts/check-import-gate.sh`.

## Browser → route — `src/lib/route-client.ts`

Browser code calls our routes only through `callRoute` / `downloadRoute` / `uploadRoute` (session
attached, deadline, envelope, bytes, progress). No bearer builder, `access_token` read or bare `fetch`
of a route elsewhere; a 2xx payload is narrowed by a shape guard (`Record<string, unknown> | null`),
never a cast. Signed-in screens gate by `requireSignedIn` (`src/lib/signed-in-route.ts`), never their
own `getSession`. Guards: `route-client.test.ts` (RCG), `signed-in-routes.test.ts` (CF-SIR).

## No phantom success (F4)

A reader's door error is a typed `ReaderError` (`src/lib/reader-failure.ts`), never
`if (error) return null`. A caught error's text is read through `errorText` / `errorWithStack`
(`src/lib/error-text.ts`), never `instanceof Error`. Failures surface as translated messages and are
logged `[ssr-error] <path> <message>` (`[slow-rpc]` over 5 s). An errored permission check renders as
an error, never "no permission". A guarded action reports its result even after a step-up round-trip.
A failed gate fetch is logged and retried once, never silently defaulted. Missing data is a typed
absence: no sentinel defaults on identity, geography or screening paths (`user ?? guest`,
`country ?? 'ET'`, `score ?? 0`). Guards: `reader-failure.test.ts` census; ESLint INC-815.

## Authority (F3, F5)

The server (RLS / `has_permission(uuid,text,text)`) is the ONLY authority; UI hiding is convenience.
No client-asserted role, identity, geography or screening verdict. Every mutating RPC: gates
(permission → step-up → scope) → capture (old → new) → mutate; a refused attempt leaves no trace.
Step-up freshness comes from the token (aal2 + totp amr), never a client hint. Listing status is
mutated only inside its state machine (`submit_listing` / `transition_listing`), never scattered `if`s.
Guards: `check-listing-writes.sh`, `check-acceptance-doors.ts`, `check-caller-gates.ts`.

## Strings (D1–D5, DEC-231)

No user-visible literal string: every string is a key from `src/i18n/locales/`. Keys only admin files
use go in `en-admin.ts` / `am-admin.ts`, others in `en-base.ts` / `am-base.ts`; `en.ts` / `am.ts`
join them (`admin-layer.test.ts` judges). Every new key ships EN + AM in the SAME change; a migration
registering a permission action ships its `admin.roles.perm.*` keys. The database is runtime truth
(`ui_translations`, `entity_translations`; overlay DB[lang] ▸ compiled[lang] ▸ compiled.en). D5: a
renamed string is a NEW key (the old one retired when unread); editing a compiled value never reaches
production. A brief's string text is copied by key, character for character; you write no Amharic of
your own; no unassigned or foreign-script code point in `am*.ts` values (`am-script.test.ts`).
`<html lang>` follows the applied catalogue. After touching any `t(` key, run `bun run i18n:usage` and
commit both maps. Guards: `check-hardcoded-strings.sh`, the i18n usage-map job.

## Locale, data, shell

Dates and numbers via `formatLocale` (`src/lib/format-locale.ts`); names via `catalogText`,
`entityName`, `optionLabel`; a map indexed by an outside key is read through `ownValue`
(`src/lib/own-key.ts`), never `map[key]`. Data-API lists use `readAllPages` (keyset, never
positional). Page-wide data (the category tree) is one subscribed store. Data tables render ONLY
through `DataTable` (`src/components/shell/data-table.tsx`; C7: priority tiers, `cardUntil='lg'` when
dense, `minWidth` only with a same-line `// C7-dense:` note, never `[object Object]`/`undefined`/`NaN`).
ONE CONSOLE SHAPE (C8): toolbar find/transfer groups as direct children, no labels above controls,
import/export in the toolbar scoped by its filter, no Tabs, one edit icon per row, verbs in the
editor's verb bar. Cards take `CARD_SURFACE`; one ☰ per width; `CutText` for cut names;
`useLabelRoom` per crowded row; action labels two or three words in every language, explanations in
help text; a destructive control is red; a console save round-trips every stored field it does not
show; menu alerts from a section's `alert` via `useNavAlerts`. Legal texts only via
`LegalText` / `legalTextFor`; agreement ticks only `AgreeToDocument`; page data via `legalPageData`.
Guards: `admin-tables.ts`, `list-action-labels.ts`, `destructive-red.ts`, `check-datatable-minwidth.sh`,
`look-law.test.ts`, `e2e/house-style.spec.ts`, the legal tests.

## Mobile-first UI (C1–C6)

Design at 360 px first; verify 360/768/1024/1280. Touch targets ≥ 44 px; primary actions near the
bottom; nothing relies on hover. Design-system tokens only (`styles.tokens.test.ts`). Every screen has
translated loading/empty/error states (an empty state is a caption beside the controls). RTL-safe:
logical properties only (`ms-`/`me-`/`ps-`/`pe-`/`text-start`). Accessibility basics; the `@a11y`
roster fails on serious/critical axe violations. Rendered-output acceptance belongs to the operator's
walk — you verify by typecheck, tests and structure.

## Reuse and layout (B1–B4, docs/conventions.md)

Search before creating any component, hook, utility, key or table, and say what you searched.
One utility per concern in `src/lib`; primitives in `src/components`; feature pieces in
`src/features/<name>/` (components/, hooks/, `<name>-service.ts`, types.ts); extend via props, never
copy; one component per file; kebab-case files, PascalCase components, `use-*` hooks; split a file over
~300 lines; translations one lazy file per language.

## Performance and SEO (G1–G2)

Public pages SSR with correct title/meta/og (absolute URLs), declared language, hreflang from the
publication gate; public-path DB work is version-cached; images lazy with dimensions; nothing heavy on
the first-paint path (charting, mapping, 3D, admin services, the RBAC seam, the QR encoder —
`src/server/qr.ts` only). No new dependency unless the brief names it, pinned (DEC-118); a package or
framework change is its own turn (G42). Guards: `marketplace-weight`, `bundle-budget`,
`browse-path-guard`, `dependency-audit`.

## Runtime stability (I1–I6)

Fixtures are captured from real tool output, never authored (I1). Ref contract: a Slot/asChild child
holds the ref; no inline state-writing refs on mapped children; ref-fed state uses stable callbacks +
equality-guarded writes. Hooks never return fresh `[]`/`{}` into dependency arrays; mirrored writers
are equality-guarded; measuring hooks never observe what they mutate. Auth-state callbacks never call
Supabase (hop a macrotask); first-frame Supabase reads belong to the auth flow; core auth code changes
only by DEC. Gate-list reads: a plain keyed anon fetch, `cache: "no-store"`, never cache-busted by
query params. Root providers render immediately and reconcile async; step-up dialogs on the top layer.

## Vendors (DEC-249, DEC-250)

New code reaches Supabase only through `src/integrations/supabase/**`, `src/server/supabase/**`,
`src/server/media/storage.ts` and `src/lib/route-client.ts`; no file names a Lovable package,
identifier or host; providers are the project's own adapters over `upstream()` — no vendor SDK.
Guard: `vendor-seams.test.ts` (VS).

## Documentation (H1–H2)

A structural change updates `docs/features/<name>.md` and appends one `docs/_changelog.md` line in the
same change (never renumber or delete); the register row (`docs/governance/mechanisms.md`) and the
roadmap line are updated in the turn's docs part. No known-error debt: every violation a check surfaces,
even pre-existing, is reported and fixed as its own tracked item, never deferred as "pre-existing".
Records (DEC/INC/handoffs) enter the repository only as word-for-word imports the supervisor hands you,
checked by sha256.
