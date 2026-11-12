STOP — housekeeping-4 STEP 1: the census (PLAN FIRST); premises of concerns 1, 2, 3 and 4 read wrong on db13e13b7
DONE: STEP 0 (brief saved, sha256 equal; roadmap line 3; briefs-allowlist pruned; check-go; draft PR #35), STEP 1 (this census)
LEFT: parts A, B, C, D, E; STEPS 2–8
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `db13e13b7df1639de3f2ab44bbe0332eba28a468` (short `db13e13`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T15:46:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43247042558
FILES:
docs/governance/briefs/housekeeping-4.md
docs/governance/reports/housekeeping-4.stop-1.md
roadmap.md
scripts/conformance/briefs-allowlist.txt

The questions for ruling 1 are Q1–Q9 at the end. Nothing under `src/`, `scripts/` (but the briefs
allowlist) or `eslint.config.js` has been edited.

## STEP 0 record

- `git fetch origin dev main ci-evidence`; `git switch -c cursor/housekeeping-4 origin/dev`; head
  `db13e13b7df1639de3f2ab44bbe0332eba28a468` (= BASE; `git diff --name-only BASE..HEAD` empty);
  `git status --short` empty before and after the switch.
- Brief: scripted copy of the folder's `housekeeping-4.md` into one four-backtick block; sha256 of the
  fenced text `1fd3d3f2a70780e7e032c6f385138934836d138b5b94b412a507eb07de6fd23a` = the stated value
  (the brief holds no backtick fence: `grep -c` of three backticks → 0).
- Roadmap line 3 written by script (prefix + "Previous: " + the old line's text); `bunx prettier
  --check roadmap.md` → "All matched files use Prettier code style!".
- `scripts/conformance/briefs-allowlist.txt`: the one line keyed to `housekeeping-3c.md` removed (the
  header comments stay; the file says "Empty at birth").
- `bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-4.md` → `[check-go] no finding`.
- `bunx vitest run scripts --maxWorkers=2` → `Test Files 110 passed (110)`, `Tests 568 passed | 1
  skipped (569)`.
- Commit `35bdb293a housekeeping-4: task saved`; pushed; draft PR
  https://github.com/tesfayekb/ethio-marketplace/pull/35.
- CI for dev's head: ci-status.md above names db13e13b7, SUCCESS (the two-step read agrees);
  guards-last-failure.md "No failed build/guard jobs in this run"; e2e-last-failure.md "last E2E run
  43247042558 passed" on db13e13b7. Flake ledger read whole (1385 lines): 5 lines in the last seven
  days, five different tests, none at three.

## consumers

### Concern 1 — every non-literal `href` attribute and navigation sink under `src/` (tests excluded)

`rg -n "href=\{" src --glob '!*.test.*'` (13 hits) and the sinks grep (5 hits), each read:

| Site | Value | Source |
| --- | --- | --- |
| `src/features/legal/legal-text.tsx:17` | `node.href` | data: the legal markdown (`legal-markdown.ts:44` regex for `[label](href)` — https, **http**, mailto, root path; AND `:47–53`, bare `https://…` and bare e-mail addresses auto-linked with no scheme check beyond the match) |
| `src/features/legal/legal-text.tsx:61` | `` `#${h.id}` `` | **not in the brief**: a fragment from `parseLegal`'s own `s-<n>` ids (generated, not data text) |
| `src/features/legal/agree-to-document.tsx:63` | `links[role]` | constants `"/terms"`, `"/privacy"` (`auth.tsx:680`, `legal-accept-screen.tsx:152–154`) and `certify-block.tsx:90` — a root path `/legal/publishing?country=<codes>` whose codes are the server's `country_code` values joined unencoded (finding F3) |
| `src/features/posting/preview/listing-detail.tsx:838` | `placesMaps` | builder `webPlaceUrl(query)` (`maps-links.ts:49`), https, the place names `encodeURIComponent`-ed |
| `listing-detail.tsx:1324` | `mapMaps.web` | builder `webPinUrl(lat,lng)`, https, numbers |
| `listing-detail.tsx:1374` | `mapsChoice.app` | builder `appPlaceUrl` / `appPinUrl` — scheme **`comgooglemaps:`** (premise P1) |
| `listing-detail.tsx:1383` | `mapsChoice.web` | builder `webPlaceUrl` / `webPinUrl`, https |
| `listing-detail.tsx:1495` | `href` | builders `telegramHref` (https, `[A-Za-z0-9_]` only), `whatsappHref` (https, digits, encoded text), `telHref` (`tel:` + the seller's value with spaces removed — no other narrowing); typed absence exists: `href === null` renders `<span>{shown}</span>` (`:1503–1506`) |
| `src/features/ad-page/share-ad.tsx:115, :127, :139` | template literals | literal https host + `encodeURIComponent` parts |
| `share-ad.tsx:192` | `` `/l/${publicId}/qr.svg` `` | **not in the brief**: a root path with the ad's public id (the QR download) |
| `src/routes/__root.tsx:425` | `link.href` | `alternateLinks` (`:397–408`): `data.origin` + `data.path` — the request's own origin and pathname (`:213` server `url.origin`, `:334` client `window.location.origin`); **http** in local and CI browser runs (premise P2) |
| `src/lib/route-client.ts:132` | `anchor.href = href` | app-made object URL (`URL.createObjectURL(download)`, `:129`) → `appObjectUrl` |
| `src/features/admin/legal/legal-service.ts:449` | `anchor.href = href` | app-made object URL (`:447`) → `appObjectUrl` |
| `src/features/admin/translations/transfer-bar.tsx:84` | `anchor.href = url` | app-made object URL (`:83`) → `appObjectUrl` |
| `src/components/app-shell.tsx:706, :713` | `window.location.replace(SIGN_OUT_LANDING)` | a constant |

Beyond the brief's two greps (`rg -n "\bhref\b" src --glob '!*.test.*'`), navigation sinks whose
target comes from data, through the router's `href` option (premise P3):

| Site | Target | Mechanism today |
| --- | --- | --- |
| `src/routes/legal.accept.tsx:31` | `redirect({ href: safeReturnPath(search.next) })` | `src/lib/return-path.ts` (D20) |
| `src/features/legal/legal-accept-screen.tsx:84` | `navigate({ href: safeReturnPath(next) })` | D20 |
| `src/routes/auth_.callback.tsx:76, :100`; `src/routes/auth.tsx:171, :187` | `landAfterSignIn({ href: target })` → `use-legal-gate.ts:87` `navigate({ href })` | D20 (`target`/`afterSignIn` are `safeReturnPath` answers) |
| `src/routes/l.$slug.tsx:45` | `redirect({ href: answer.canonical })` | the server's own `/l/<slug>` |
| `src/routes/legal.$kind.tsx:35`, `src/routes/$name.tsx:30` | `redirect({ href: `/${params…}` })` | a root path from the route's own params |

Head-managed links (`head()` objects, not JSX attributes): `l.$slug.tsx:84`, `terms.tsx:33`,
`privacy.tsx:33` canonical `href: url` = the root origin + a server path; `l.$slug.tsx:67` og:image
from `doc.category.illustration_url` resolved by `new URL(…, origin)` (a meta `content`, not an href).
No `window.open`, no `location.assign`, no `setAttribute("href")`, no `formAction` (grep → none).

`<Link to={…}>` with a non-literal `to` (`rg -n "\bto=\{" src --glob '!*.test.*'`, 13 hits): every
one is an app path from a constant or the app's own config — `app-footer.tsx:79` (route list),
`app-rail.tsx:277, :377` (`PANELS` config), `listing-detail.tsx:927, :1431` (typed `"/auth"`,
`listing-detail.tsx:278, :283`), `breadcrumbs.tsx:294, :316, :411, :425` (sections and panels config),
`block-guide-sheet.tsx:108` (`resolveGuideNext`: a guide's constant or a section path),
`submenu-impl.tsx:387` (`submenu-levels.ts:39`, `rules.pageOf(child)?.path ?? "/"`, panels config),
`locations-overview.tsx:106`, `admin-nav.tsx:29` (sections). `navigate({ to: <non-literal> })`: the
sign-out constant and `use-switch-panel.ts:37` (a panel's home). `DataTable`'s `rowHref` answers a
typed `LinkProps` (`data-table.tsx:133`). **No `<Link to={<data>}>` exists.**

### Concern 2 — every inline script and `dangerouslySetInnerHTML` under `src/`

`rg -n "scripts: \[|dangerouslySetInnerHTML|<script|innerHTML|outerHTML|insertAdjacentHTML|document\.write" src --glob '!*.test.*'`
plus the `scripts:` arrays of every route's `head()`:

| Site | Text | Embedding |
| --- | --- | --- |
| `src/routes/__root.tsx:381` ← `src/providers/theme-provider.tsx:30` | `THEME_INIT_SCRIPT` | three `JSON.stringify` interpolations (alerts #434–#436, open, read by `gh api`) |
| `src/routes/l.$slug.tsx:85` ← `src/features/ad-page/json-ld.ts:20–28` | `adJsonLd(doc, url, image)` (`type: "application/ld+json"`) | **not in the brief** (premise P4): the seller's title and description, `JSON.stringify(…).replace(/</g, "\\u003c")` — a second, local version of the builder's concern (escapes `<` only) |
| `src/components/app-shell.tsx:934` ← `src/providers/rail-state.ts:20` | `RAIL_INIT_SCRIPT` | **not in the brief**: a constant template with no interpolation (the key is written as text; `pre-paint-scripts.test.ts` holds it equal to `RAIL_STORAGE_KEY`) |
| `src/components/ui/chart.tsx:73` | a `<style>` built from a chart id and config colours | **not in the brief**; CSS, not script; the file has **no importer** in `src`, `e2e` or `scripts` (`rg "ui/chart['\"]"` → none) and sits in no client chunk (finding F1) |

### Concern 3 — importers of `src/features/admin/sections.ts`, and the entry's admin modules

`rg` of static imports (no dynamic import of it exists): `src/routes/admin.tsx:9`,
`src/components/shell/breadcrumbs.tsx:18`, `src/features/admin-screening/screening-page.tsx:32`,
`src/features/admin/guide-next.ts:3`, `src/features/admin/rail-items.ts:26–33`,
`src/features/admin/use-admin-sections.ts:2`, `src/features/admin/section-page.tsx:4`,
`src/features/admin-listings/listings-page.tsx:33`; outside `src/`: `e2e/one-line-slots-admin.spec.ts:3`,
`e2e/admin-shell.spec.ts:8`, `e2e/admin-guides.spec.ts:3`, `scripts/conformance/admin-guides-read.ts:5`;
tests: `src/features/admin/guide-next.test.ts`.

From the chunk census of my build (`dist/.chunk-modules.json`), every module under
`src/features/admin/` in the ENTRY chunk `index-D-KuMat7.js` (242 modules — equal to ENTRY_CLOSURE's
`index` line), with the shell importer that pulls it in (premise P5):

| Module in the entry | Pulled in by | Standalone min+gzip (estimate) |
| --- | --- | --- |
| `src/features/admin/sections.ts` | `breadcrumbs.tsx:18` AND `src/config/panels.ts:37` → `rail-items.ts` | 0.74 KiB |
| `src/features/admin/rail-items.ts` | `src/config/panels.ts:37` (`ADMIN_NAV_ITEMS`, the admin panel's items in `PANELS`, `:138`) — and `breadcrumbs.tsx:17` imports `PANELS` | 0.68 KiB |
| `src/features/admin/nav-alerts.ts` | `src/components/shell/app-rail.tsx:53` | 0.43 KiB |
| `src/features/admin/impersonation/impersonation-banner.tsx` | `src/components/app-shell.tsx:44` | 0.73 KiB |
| `src/features/admin/impersonation/use-impersonation.ts` | the banner | 0.74 KiB |
| `src/features/admin/impersonation/impersonation-service.ts` | the hook | 0.74 KiB |

The estimates are each module minified and gzipped ALONE (`Bun.build` minify, imports external,
gzip level 9; script `/tmp/ethio-scratch/housekeeping-4/modsize.ts`); a module's real share of the
gzipped entry is smaller, and only a before/after build measures it. Elsewhere the admin modules sit
in admin chunks (`guide-next.ts` → `block-guide-sheet-*.js`, an on-demand chunk;
`use-admin-sections.ts` → `admin.index-*.js`; `section-page.tsx` → `admin.images-*.js`; the screening
and listings pages → their routes' chunks).

### Concern 4 — the two allowlist lines; D129 / D137

`scripts/public-surface-allowlist.txt:22` `transition_listing | authenticated | the status door,
restated by M5; owner, reviewer and enforcer checks inside` and `:54` `transition_listing |
authenticated | restated grant (not a new surface); L1 adds removed -> screening for enforcement with
a fresh second factor (D137)`. D129 (`docs/spec/spec-ledger.md:3317`): "Show number" in Screening's
preview asks for no second factor (`admin_reveal_listing_contact`); "Approve and Reject keep their
second factor (transition_listing unchanged)" (running record `:111`). D137 (`spec-ledger.md:3325`):
a removed listing is restored only to Waiting (screening), by an enforcer with step-up; a severe
removal by a super admin only. Still true on the tree: the latest definition
(`supabase/migrations/20261104124958_c072fd66-6ee4-46cd-a459-3e6fd577cff3.sql`) gates review moves
with `require_step_up_if_needed('listings','review')` (`:89`) and enforcement with `('listings',
'enforce')` (`:114`, `:148`). The reader is NOT in `check-migrations.sh`: the shell calls
`bun scripts/public-surface.ts --parse` (`check-migrations.sh:628`), and `parseSurface`
(`scripts/public-surface.ts:12–35`) reads every line with no duplicate check; it is also the live
lint's parser (`scripts/security-lints.ts`). Its tests: `scripts/public-surface.test.ts` (SLB-6,
SLB-7 and two untitled cases). The `scripts/fixtures/` files of this guard are `.sql` grants
(`bad-public-grant-example.sql`, `bad-public-grant-format-example.sql`), not allowlist texts.

### Part E — directives

`rg -n "@ts-expect-error|@ts-ignore|@ts-nocheck" src scripts e2e`: `src/server/ai/gateway.test.ts:407`
(`@ts-expect-error an unknown task id does not compile`) and `src/routeTree.gen.ts:3`
(`// @ts-nocheck`, generated by the router plugin, ESLint-ignored at `eslint.config.js:79`). No law
counts these directives today: `scripts/conformance/non-null.test.ts` (CF-NN-1, CF-NN-2) counts
non-null assertions only, and `eslint.config.js` sets no `ban-ts-comment`. `expectTypeOf` in the
tree: `gateway.test.ts:390, :399, :404` only. Installed `expect-type` 1.4.0 has `toExtend` (18
occurrences in its `index.d.ts`); `toMatchTypeOf` is its deprecated form. `aiCall` is
`aiCall<T extends TaskId>(taskId: T, …)` (`src/server/ai/gateway.ts:178`).

## definition

- Concern 1 (a link target that comes from data): by definition the legal markdown's links (both the
  bracket form and the auto-linked bare URL / e-mail), the contact builders' `tel:` (the seller's
  value), the maps builders (place names), the certify link's country codes, the share links' url
  and text, the QR download's public id, and the router navigations fed by `?next=` / `?return=`.
  Against the brief's list: `legal-text.tsx:61` and `share-ad.tsx:192` are attribute sites the list
  lacks (the lint selector as written would fire on both); the router `href:` sinks are the same
  concern served by ANOTHER mechanism (D20's `safeReturnPath`, same-origin root paths only) — the
  brief's lint selectors and CF-HREF census do not see them; the hreflang/canonical origin is the
  site's own, not data. The three download sinks are app-made object URLs.
- Concern 2 (a value embedded in script text): the theme script (constants) and `json-ld.ts`
  (seller text). `RAIL_INIT_SCRIPT` embeds no value; `chart.tsx` is a style, not a script, and dead.
- Concern 3 (admin-only code in the entry closure): six modules, four shell importers — not one.
- Concern 4 (a browser-callable object's allowlist line): `transition_listing` is the one duplicate
  name in the file (`rg -v '^\s*(#|$)'` of the file, first field, `sort | uniq -d` →
  `transition_listing` only).

## tests

Unit tests by their real names: `src/features/legal/legal-text.test.tsx`,
`src/features/legal/legal-markdown.test.ts`, `src/features/legal/agree-to-document.test.tsx`,
`src/features/legal/certify-block.test.tsx`; `src/features/posting/preview/listing-detail.test.tsx`
(asserts `comgooglemaps://…` at `:958`, `:969`), `listing-detail-map.test.tsx`,
`listing-detail-map-failed.test.tsx`, `listing-detail-tier.test.tsx`;
`src/features/ad-page/maps-links.test.ts` (asserts `comgooglemaps://…` at `:69`, `:75`),
`contact.test.ts`, `share-ad.test.tsx`, `json-ld.test.ts`; `src/routes/root-reads-once.test.ts`,
`src/routes/root-error.test.tsx`; `src/providers/theme-provider.test.ts`,
`src/providers/pre-paint-scripts.test.ts` (asserts the theme script's exact text
`var k=${JSON.stringify(THEME_STORAGE_KEY)};` — unchanged by `scriptLiteral` for `"ethio.theme"`,
which holds no escaped character); `src/lib/route-client.test.ts`, `src/lib/return-path.test.ts`;
`src/features/admin/legal/legal-service.test.ts`; **no test** for `transfer-bar.tsx` and **none** for
`breadcrumbs.tsx` (`rg -l "breadcrumbs" src --glob '*.test.*'` names none of its own);
`src/features/admin/rail-items.test.ts`, `src/features/admin/guide-next.test.ts`;
`src/server/ai/gateway.test.ts`; `scripts/conformance/lint-rules.test.ts` (CF-LINT-1…4),
`scripts/bundle-closure.test.ts` (BC-1…15), `scripts/public-surface.test.ts`,
`scripts/conformance/non-null.test.ts`, `scripts/conformance/wired.test.ts`.

E2E specs that exercise the sites (`rg -l` of their test ids): legal pages — `e2e/legal-pages.spec.ts`,
`legal-accept.spec.ts` (`:153`, `:155` assert `/terms`, `/privacy`), `legal-certify.spec.ts`
(`:566`, `:578` assert `/legal/publishing` and `?country=ET`), `legal-history.spec.ts`,
`legal-admin.spec.ts`; the ad page's contact, maps and share — `e2e/ad-page.spec.ts` (`:182`, `:197`
canonical; `:649` the WhatsApp share href; `:752` hrefs), `sage-ad-page.spec.ts`; breadcrumbs —
`e2e/breadcrumbs.spec.ts` (BR-*; `:215`, `:221` the admin crumbs), `shell-bands.spec.ts`,
`sage-bands.spec.ts`, `admin-shell.spec.ts`; hreflang — `e2e/shell.spec.ts` TR-28 (`:2508–2583`,
asserts every alternate `^https?://` on CI's `http://127.0.0.1` server); the downloads —
`admin-translations-console.spec.ts`, `legal-admin.spec.ts`. The three E2E values are set in this
environment (names tested, not values).

## lists

Every list a new name joins: `eslint.config.js` `RESTRICTED_SYNTAX` (a new list) AND every block
that sets `no-restricted-syntax` for `src/` files (`:120–131`, `:136–141`, `:149–171` — a later
block replaces the rule) AND `scripts/conformance/lint-rules.test.ts` `owedLists` (`:23–28`), or
CF-LINT-1 fails; `scripts/conformance/wired.test.ts` (only when the census is a non-test module under
`scripts/conformance/`); `scripts/conformance/safe-href-allowlist.txt` (new); `scripts/route-budgets.mjs`
— the public ceilings AND `SHARED_SHELL_MODULES` (`safe-href.ts` is imported by `route-client.ts`,
a `shared-shell` module, `route-budgets.mjs:221`, and by lazy chunks — the group's census fails by
name on an unlisted module or a new shared chunk joins ENTRY_CLOSURE; premise P6) AND
`ENTRY_CLOSURE.index`'s module count ("242 modules", measured 242); the register (§14);
`scripts/conformance/turn-checks-allowlist.txt` (nothing yet that cannot run locally); test-id
prefixes CF-HREF, CF-SCRIPT, BC-16 — free (`rg "CF-HREF-[0-9]|CF-SCRIPT-[0-9]|BC-16" scripts src e2e`
→ none outside the brief).

## old-file-readers

`docs/features/design-foundation.md:126, :310` (the pre-paint script); `docs/features/legal.md:266`
(the link-token grammar of `AgreeToDocument`); `docs/features/ad-page.md:51` (the contact links'
schemes); `docs/features/admin-shell.md:95–97, :127`, `admin-roles.md:57`, `admin-listings.md:156`,
`panels.md:184`, `translations.md:375` (the breadcrumbs as the admin seam);
`docs/features/ci-guards.md:65` (the public-surface guard, INC-443);
`docs/features/performance-strategy.md` (the entry's measurements, `:228–230`). Named, not edited:
`AGENTS.md` and `.cursor/rules/30-migrations.mdc` (the public-surface allowlist),
`.cursor/rules/10-code-laws.mdc` (the two new mechanisms, at rules turn 4).

## second-readers

`rg -n "import\(" src --glob '!*.test.*'` for the moved symbols: none of `sections`, `rail-items`,
`nav-alerts`, `guide-next` or the impersonation modules is imported dynamically; `breadcrumbs.tsx`
itself imports `./admin-detail-crumbs`, `./seller-crumbs` and `./ad-crumbs` on demand (`:52–77`),
unaffected.

## chunk-graph

Today: `sections.ts` in `index-*.js` (the entry), with `rail-items.ts`, `nav-alerts.ts` and the
three impersonation modules. After the brief's Part C as written (a context for the breadcrumbs only):
`sections.ts` STAYS in the entry through `config/panels.ts` → `rail-items.ts` (and `breadcrumbs.tsx`
still imports `PANELS`) — no fall. The two new modules: `script-literal.ts` would join `index`
(imported by `theme-provider.tsx`, an entry module); `safe-href.ts` would be imported by
`route-client.ts` (`shared-shell`), `__root.tsx` (`index`) if the hreflang site takes it, and the lazy
chunks `legal-text-*`, `listing-detail-*`, `share-price-text-*`, `agree-to-document-*`, `use-legal-*`,
`admin.translations_._lang-*` — so it lands in `shared-shell` only with a `SHARED_SHELL_MODULES`
line (P6). Their bytes are measured when written (Parts A and B).

## environments

The WHATWG `URL` is global in Bun, Node and every browser the app supports; neither new module reads
`document`. `appObjectUrl` checks the `blob:` scheme of its argument and needs no `window`. The
Playwright projects are `mobile-360`, `desktop-1280` and `email-serial` (`playwright.config.ts:55,
:62, :81`); the link proofs run on the first two.

## mechanisms

Read before any proposal: `legal-markdown.ts:22–55` (the regex at `:44` and the auto-link branch at
`:47–53`) with `legal-text.test.tsx` and `legal-markdown.test.ts`; `maps-links.ts` (no narrowing: the
query is encoded, lat/lng are numbers); `contact.ts:77–92` (Telegram and WhatsApp narrow by
character class; `telHref` only strips spaces); `src/lib/return-path.ts` (D20, the same concern for
navigations — narrower than `safeHref`: same-origin root paths only, so a return path through
`safeHref` would admit an `https:` redirect elsewhere); `src/lib/untrusted-text.ts` (D166 — a
person's words inside a model prompt; no bearing on link targets, which it neither cleans nor
checks); `theme-resolver.ts:72` (`storedThemeText` — the stored text, read by the script with
`JSON.parse`, not embedded); `json-ld.ts:28` (the local `<` escape); the chunk census
(`scripts/chunk-modules-plugin.mjs`, `scripts/bundle-closure.mjs`) and BC-14/15; the public-surface
reader (`scripts/public-surface.ts`) and its shell self-tests (`check-migrations.sh:638–665`);
`expectTypeOf` at `gateway.test.ts:390–406`.

## first-download

Lock-exact build at db13e13b7 + STEP 0: `bun install --frozen-lockfile` → "Checked 607 installs
across 700 packages (no changes)"; `bun run build` exit 0; `node scripts/check-bundle-size.mjs` →
"Bundle budget OK." The entry: JS 206.0 / 207 KiB, CSS 23.1 / 40 KiB; `index-D-KuMat7.js` 129.1 KiB,
`shared-shell--vANAw37.js` 29.2 KiB. Every page (gzipped, measured / ceiling):

```
227.0/228 /            225.1/233 /$name       268.3/269 /account     208.6/210 /account_/legal
209.3/210 /account_/legal_/$versionId          225.3/233 /account_/saved
207.0/208 /admin       207.8/209 /admin/      319.6/320 /admin/ai    332.8/334 /admin/attributes
292.6/294 /admin/audit 340.8/342 /admin/categories                   322.4/323 /admin/countries
207.6/209 /admin/images                       287.8/289 /admin/impersonation_/$sessionId
278.6/279 /admin/legal 276.0/277 /admin/legal_/$versionId            277.6/278 /admin/legal_/edit
344.2/345 /admin/listings                     346.5/354 /admin/listings_/$listingId
405.7/407 /admin/listings_/$listingId_/edit   267.7/269 /admin/locations
330.2/331 /admin/monetisation                 323.9/325 /admin/places
289.5/290 /admin/roles 270.3/271 /admin/roles_/$roleId               365.5/366 /admin/screening
300.3/301 /admin/translations                 303.9/305 /admin/translations_/$lang
289.6/290 /admin/users 284.7/286 /admin/users_/$userId               223.2/231 /auth
210.1/217 /auth_/callback                     212.1/219 /auth_/reset
227.0/228 /c/$slug     227.2/228 /dev/primitives                     247.9/249 /dev/style
206.4/207 /dev/tall    257.1/265 /l/$slug     210.7/212 /legal/$kind 217.7/219 /legal/accept
211.5/212 /legal/publishing                   314.9/316 /my-listings 322.7/324 /my-listings_/$listingId
400.7/402 /my-listings_/$listingId_/edit      400.7/402 /post        400.7/402 /post_/$listingId
210.7/212 /privacy     276.9/284 /settings    210.7/212 /terms
```

No page sits inside the 0.3 KiB band of its ceiling today; seven sit 0.4–0.5 KiB under it (an awk
over the table, `ceiling − measured ≤ 0.5`): `/admin/ai` 319.6/320, `/admin/legal` 278.6/279,
`/admin/legal_/edit` 277.6/278, `/admin/users` 289.6/290 (0.4); `/admin/roles` 289.5/290,
`/admin/screening` 365.5/366, `/legal/publishing` 211.5/212 (0.5). Any growth on the entry (the two
new modules, before the admin modules leave) moves every page; the plan measures Parts A and B on
their own and raises or lowers by DEC-296's form in the part that causes it. After Parts A → C: not measurable
before the code exists; measured per part.

## premises (wrong or incomplete on db13e13b7)

- P1 — the maps "open in app" links (`listing-detail.tsx:1374`, and `mapMaps.app` set at `:465`,
  `:470–473`) are `comgooglemaps://…` (`maps-links.ts:57–63`); `safeHref` as specified answers `null`
  for them, so the iOS home-screen choice would lose its app button. Two unit tests assert the
  scheme (`maps-links.test.ts:69, :75`; `listing-detail.test.tsx:958, :969`).
- P2 — the hreflang alternates (`__root.tsx:425`) are built from the request's own origin, `http:`
  in local and CI browser runs; through an `http:`-refusing `safeHref` every alternate disappears
  there and TR-28 (`e2e/shell.spec.ts:2508`) fails. The same holds for the canonical `head()` links
  if they joined.
- P3 — data-derived navigation exists beyond the two greps: the router's `href` option at
  `legal.accept.tsx:31`, `legal-accept-screen.tsx:84`, `use-legal-gate.ts:87` (via `auth.tsx`,
  `auth_.callback.tsx`), served by D20's `safeReturnPath`, which must stay the narrower rule for
  navigations.
- P4 — concern 2's "no other inline script": `l.$slug.tsx:85` (JSON-LD, seller text, `<` escaped
  locally), `app-shell.tsx:934` (`RAIL_INIT_SCRIPT`, no value embedded), `chart.tsx:73` (`<style>`,
  no importer).
- P5 — concern 3's single bypass: the entry carries six admin modules through four shell importers
  (`breadcrumbs.tsx`, `config/panels.ts`, `app-rail.tsx`, `app-shell.tsx`); a context for the
  breadcrumbs alone leaves `sections.ts` in the entry, and BC-16 as written ("no module under
  `src/features/admin/`") fails on the five others. Also: the context's hook cannot live in
  `src/features/admin/section-context.tsx` if `breadcrumbs.tsx` imports it — that file would itself
  be an entry module under `src/features/admin/`; the context and hook must sit outside that folder
  (e.g. `src/components/shell/`), the provider inside it.
- P6 — `safe-href.ts` imported by `route-client.ts` (a `shared-shell` module) needs a
  `SHARED_SHELL_MODULES` line in `scripts/route-budgets.mjs`, beyond "the budgets file for ceilings
  only".
- P7 — concern 4's reader is `scripts/public-surface.ts` `parseSurface` (with
  `scripts/public-surface.test.ts`), called by `check-migrations.sh:628` and by
  `scripts/security-lints.ts`; its guard's fixtures are SQL grants, so the duplicate's planted proof
  is a text in `public-surface.test.ts` (or a new allowlist-text fixture under `scripts/fixtures/`).
- P8 — Part E: no census of `@ts-*` directives exists to "prove `src/` has none left";
  `src/routeTree.gen.ts:3` carries the generated `@ts-nocheck`.
- Confirmed: `agree-to-document.tsx:63`'s href is a constant or the certify block's root path (not
  free data); all three download sinks carry app-made object URLs; no `<Link to={<data>}>`; BC-16 is
  the next free BC id; the line numbers of the brief's named sites hold on db13e13b7.

## findings

- F1 — `src/components/ui/chart.tsx` has no importer (and sits in no chunk); it carries a
  `dangerouslySetInnerHTML` `<style>`. Outside scope (`src/components/ui/`).
- F2 — `src/features/admin/translations/transfer-bar.tsx:83–88` repeats `saveTextFile`
  (`src/features/admin/legal/legal-service.ts:446–455`) — two local "save text as a file" helpers
  (K2), and `route-client.ts:128–139` a third shape for a fetched blob.
- F3 — `src/features/legal/certify-block.tsx:90–92` joins server `country_code` values into a query
  without encoding (a root path either way).
- F4 — `telHref` (`contact.ts:90–92`) narrows only spaces; whatever a seller stored follows `tel:`.
- F5 — one open code-scanning alert outside this turn's files is named to the supervisor in the
  chat (G51), not here.
- None of the reads above found a live hole in the sites this turn touches (the JSON-LD's `<`
  escape holds; every link scheme today is https, http (legal text only), mailto, tel or
  comgooglemaps; every download is an object URL the app made).

## The plan (pending ruling 1)

Part A: `src/lib/safe-href.ts` (`safeHref`, `appObjectUrl` in the same module — one concern, two
exports) and `src/lib/safe-href.test.ts`; `legal-markdown.ts` builds links only through `safeHref`
(the bracket form AND the auto-links), a `null` keeps the raw text (`{ type: "text", text: raw }`, as
today's refusal does); `legal-text.tsx:17` unchanged in shape, `:61` takes `safeHref(`#${h.id}`)`;
`agree-to-document.tsx:63` takes `safeHref(href)` with its existing text branch for `null`; the maps,
contact and share builders return `safeHref(…)` (typed `string | null`), each site's absence branch
renders the text without an anchor (the contact's `<span>` exists; the maps place line renders the
place names without a link; the map's "Open in maps" control is not drawn, as when `mapMaps` is
null; the share buttons are always https and keep their anchors); the three download sinks take
`appObjectUrl`; the lint selectors (`JSXAttribute[name.name='href'] > JSXExpressionContainer >
:not(Literal, TemplateLiteral[expressions.length=0], CallExpression[callee.name=/^(safeHref|appObjectUrl)$/])`
and `AssignmentExpression[left.property.name='href']:not([right.callee.name=/^(safeHref|appObjectUrl)$/])`,
both verified against the installed parser before landing) in a new `RESTRICTED_SYNTAX.safeHref`
list for non-test `src/` files, `owedLists` updated, CF-LINT-3's pattern extended with the planted
cases; `scripts/conformance/safe-href.test.ts` CF-HREF-1 → 3 with
`scripts/conformance/safe-href-allowlist.txt` (the sign-out constant's two lines; P2's and P3's
answers per ruling). Part B: `src/lib/script-literal.ts` + test (CF-SCRIPT-1 → 2); the theme
script's three interpolations; the census law in its own `scripts/conformance/script-text.test.ts`
(one guard per concern); `json-ld.ts` per Q4. Part C per Q5. Part D: `parseSurface` refuses a
repeated name ("public surface: repeated name <name> on line <n>"), proven in
`scripts/public-surface.test.ts`; the merged line: `transition_listing | authenticated | the status
door, restated by M5; owner, reviewer and enforcer checks inside; L1 adds removed -> screening for
enforcement with a fresh second factor (D137)`. Part E: `expectTypeOf<"unknown">().not.toExtend<Parameters<typeof aiCall>[0]>()`
(red-first by planting a real task id), and a directive law per Q8.

## Questions for ruling 1

- Q1 (P1) — the `comgooglemaps:` app links: (a) a DEC adds `comgooglemaps:` to `safeHref`'s scheme
  list (one line, its test) — recommended, the brief's own "a new scheme is one line with a DEC";
  (b) the app links stay outside `safeHref` with two allowlist lines (a constant scheme with encoded
  parts); (c) the app choice is dropped.
- Q2 (P2) — the hreflang (and canonical) links from the site's own origin: (a) not data-derived —
  `__root.tsx:425` takes an allowlist line with that reason — recommended; (b) `safeHref` gains an
  option admitting `http:` only for the page's own origin.
- Q3 (P3) — the router `href` navigations: (a) D20's `safeReturnPath` stays their mechanism, named
  as concern 1's navigation half in the register row and recognised by CF-HREF as a second allowed
  call — recommended; (b) out of concern 1, listed in §6 only.
- Q4 (P4) — `json-ld.ts:28` → `scriptLiteral` (adds `src/features/ad-page/json-ld.ts` and
  `json-ld.test.ts` to the files; recommended); `RAIL_INIT_SCRIPT` passes the law as a literal;
  `chart.tsx` — deleted with its `[intentional-delete]` line (scope widened), or left as F1.
- Q5 (P5) — concern 3: (a) widen Part C to every shell importer: the admin rail items, the nav
  alerts and the section resolver supplied by the admin layout (`config/panels.ts`,
  `app-rail.tsx`, `breadcrumbs.tsx`), the impersonation banner on demand through `resilientLazy`
  (`app-shell.tsx`), and BC-16 as written — files outside SCOPE: `src/config/panels.ts`,
  `src/components/app-shell.tsx`, `src/components/shell/app-rail.tsx`; (b) Part C moves `sections.ts`
  and `rail-items.ts` only (breadcrumbs + panels), BC-16 names those two, the banner and nav alerts
  become a finding; (c) Part C as briefed, with no expected fall. The context's hook lives outside
  `src/features/admin/` in every option.
- Q6 (P6) — a `SHARED_SHELL_MODULES` line (and, if the bundler names one, an `ENTRY_CLOSURE` line) in
  `scripts/route-budgets.mjs` for `src/lib/safe-href.ts`: allowed?
- Q7 (P7) — the duplicate refusal in `scripts/public-surface.ts` with its proof in
  `scripts/public-surface.test.ts`: inside "the migration linter's allowlist reader"?
- Q8 (P8) — the directive law: (a) CF-NN-3 in `scripts/conformance/non-null.test.ts` (no
  `@ts-expect-error` / `@ts-ignore` / `@ts-nocheck` under `src/` but the generated
  `src/routeTree.gen.ts`, planted case) — recommended; (b) ESLint `@typescript-eslint/ban-ts-comment`
  (touches `eslint.config.js`'s blocks and `lint-rules.test.ts`).
- Q9 — new unit tests for `breadcrumbs.tsx` (none exists) and `transfer-bar.tsx` (none exists):
  `src/components/shell/breadcrumbs.test.tsx` per the brief; a `transfer-bar.test.tsx` for its sink,
  or the census law alone proves it?
