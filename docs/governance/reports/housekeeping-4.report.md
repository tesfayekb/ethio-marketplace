# HOUSEKEEPING TURN 4 — the app code: one safe href for every data-derived link, one literal builder for inline script text, the admin sections off the public first download, the public-surface allowlist's duplicate, and the last `@ts-expect-error`. — report

Base: db13e13b7 · Final commit: 5b110a1ab · Brief: docs/governance/briefs/housekeeping-4.md (sha256 1fd3d3f2a70780e7e032c6f385138934836d138b5b94b412a507eb07de6fd23a)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 5b110a1

## 1. Done / not done, by part and step

- STEP 0 — done (`35bdb293a`): brief saved, sha256 equal; roadmap line 3; briefs-allowlist pruned; `check-go` → no finding; draft pull request [#35](https://github.com/tesfayekb/ethio-marketplace/pull/35).
- STEP 1 — the census, done; stop 1 (`441fec802`); ruling 1 (sha256 8c878055…, saved in Part A's commit).
- Part A — done (`3eaa176a8`): `src/lib/safe-href.ts` (`safeHref`, `siteHref`, `appObjectUrl`; DEC-370) and `src/lib/save-file.ts` (`saveBlobAs`, the one download); every data-derived link site through them; the router's `href` option through `safeReturnPath`; a seller name holding a path separator is a 404 before any redirect (INC-1117); `telHref` narrowed to digits and one leading `+`; `certify-block.tsx` encodes each country code; the lint list `RESTRICTED_SYNTAX.safeHref` (CF-LINT-5) and the type-checked census CF-HREF-1 → 3 with its allowlist.
- Part B — done (`5ff719dcb`): `src/lib/script-literal.ts`; the theme script's three interpolations and the ad page's structured data through it; the census law CF-SCRIPT-3 → 4 (`scripts/conformance/script-text.test.ts`); TP-4; `src/components/ui/chart.tsx` deleted (`[intentional-delete]`).
- Part C — done (`1ce3f7e8d`) after stop 2 (`a12ad4d5c`, ruling 2) and stop 3 (`99500dbe5`, ruling 3): the admin navigation layer, BC-16, BRC-1 → 3, the ceilings.
- Parts D and E — done (`5b110a1ab`): the allowlist's duplicate and SLB-8; the `expectTypeOf` proof and CF-NN-3; INC-1114's fix (ruling 3).
- STEP 6 — done (§5). STEP 7 — pushed once (`5b110a1ab`); CI in §11. STEP 8 — this report.

## 2. Files changed

`git diff --name-only db13e13b7` on the final commit (85 paths):

```
docs/features/ad-page.md
docs/features/admin-shell.md
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/design-foundation.md
docs/features/legal.md
docs/features/panels.md
docs/features/performance-strategy.md
docs/features/security-scanning.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-4-ruling-1.md
docs/governance/briefs/housekeeping-4-ruling-2.md
docs/governance/briefs/housekeeping-4-ruling-3.md
docs/governance/briefs/housekeeping-4.md
docs/governance/reports/housekeeping-4.stop-1.md
docs/governance/reports/housekeeping-4.stop-2.md
docs/governance/reports/housekeeping-4.stop-3.md
docs/tracking/intentional-deletions.txt
eslint.config.js
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.d.mts
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/ci/redact.test.ts
scripts/ci/redaction-rules.json
scripts/conformance/briefs-allowlist.txt
scripts/conformance/entry-admin-allowlist.txt
scripts/conformance/format-allowlist.txt
scripts/conformance/kit.ts
scripts/conformance/lint-rules.test.ts
scripts/conformance/look-values-allowlist.txt
scripts/conformance/non-null.test.ts
scripts/conformance/safe-href-allowlist.txt
scripts/conformance/safe-href.test.ts
scripts/conformance/script-text.test.ts
scripts/conformance/wired.test.ts
scripts/public-surface-allowlist.txt
scripts/public-surface.test.ts
scripts/public-surface.ts
scripts/route-budgets.mjs
src/components/shell/admin-nav-layer.ts
src/components/shell/app-rail.tsx
src/components/shell/breadcrumbs.test.tsx
src/components/shell/breadcrumbs.tsx
src/components/ui/chart.tsx
src/config/panels.ts
src/features/ad-page/contact.test.ts
src/features/ad-page/contact.ts
src/features/ad-page/json-ld.test.ts
src/features/ad-page/json-ld.ts
src/features/ad-page/maps-links.ts
src/features/ad-page/share-ad.tsx
src/features/admin/legal/legal-service.ts
src/features/admin/nav-alerts.ts
src/features/admin/nav-layer.ts
src/features/admin/sections.ts
src/features/admin/translations/transfer-bar.tsx
src/features/legal/agree-to-document.tsx
src/features/legal/certify-block.tsx
src/features/legal/legal-markdown.test.ts
src/features/legal/legal-markdown.ts
src/features/legal/legal-text.test.tsx
src/features/legal/legal-text.tsx
src/features/legal/use-legal-gate.ts
src/features/posting/preview/listing-detail.tsx
src/lib/route-client.ts
src/lib/safe-href.test.ts
src/lib/safe-href.ts
src/lib/save-file.test.ts
src/lib/save-file.ts
src/lib/script-literal.test.ts
src/lib/script-literal.ts
src/providers/theme-provider.test.ts
src/providers/theme-provider.tsx
src/routes/$name.tsx
src/routes/__root.tsx
src/routes/admin.tsx
src/routes/l.$slug.tsx
src/routes/legal.$kind.tsx
src/routes/privacy.tsx
src/routes/seller-name.test.ts
src/routes/terms.tsx
src/server/ai/gateway.test.ts
```

New files, each in `git ls-files` on the final commit: `src/lib/safe-href.ts`, `src/lib/safe-href.test.ts`, `src/lib/save-file.ts`, `src/lib/save-file.test.ts`, `src/lib/script-literal.ts`, `src/lib/script-literal.test.ts`, `src/components/shell/admin-nav-layer.ts`, `src/components/shell/breadcrumbs.test.tsx`, `src/features/admin/nav-layer.ts`, `src/routes/seller-name.test.ts`, `scripts/conformance/safe-href.test.ts`, `scripts/conformance/safe-href-allowlist.txt`, `scripts/conformance/script-text.test.ts`, `scripts/conformance/entry-admin-allowlist.txt`, the three rulings and three stop reports. Deleted: `src/components/ui/chart.tsx` (declared in `docs/tracking/intentional-deletions.txt` and in Part B's commit message).

## 3. Behaviour contract — answer tables before → after

| Function / screen | Before (db13e13b7) | After |
| --- | --- | --- |
| `parseLegal` (`legal-markdown.ts`) — a `[label](href)` link | linked when a regex matched `https?://`, `mailto:` or a root path (`http:` included) | linked when `safeHref` answers (https, mailto, tel, root path, fragment); `http:`, protocol-relative and other schemes stay text |
| `parseLegal` — a bare URL or e-mail | always a link | a link when `safeHref` answers, otherwise text |
| `LegalText` — the headings' index | `<a href="#s-n">` | the same when `safeHref` answers the fragment (always, for the generated ids) |
| `LegalText` — a link's `target="_blank"` | for `http(s)://` | for `https:` (the only absolute web scheme admitted) |
| `AgreeToDocument` | `href={links[role]}` | `href={safeHref(links[role])}`; a refused href draws the text |
| `CertifyBlock` publishing link | codes joined raw | each code `encodeURIComponent`-ed |
| `telegramHref`, `whatsappHref` | `string` | `SafeHref` or `null` (the same URLs for every valid input) |
| `telHref` | `tel:` + the value with spaces removed | `tel:` + one leading `+` and the digits; `null` under three digits (the existing `<span>` branch draws the number as text) |
| `webPlaceUrl`, `webPinUrl`, `appPlaceUrl`, `appPinUrl` | `string` | `SafeHref` or `null`; the app builders pass `{ app: true }`; `mapsPair` pairs web and app |
| share sheet (`share-ad.tsx`) | template-literal hrefs | the same URLs through `safeHref` |
| listing detail (`listing-detail.tsx`) | builder strings | the builders' `SafeHref`s; a `null` hides that control |
| downloads (`route-client.ts`, `legal-service.ts`, `transfer-bar.tsx`) | three local object-URL anchors | `saveBlobAs(blob, name)`; the same file, name and revoke |
| hreflang alternates (`__root.tsx`) | `origin + path` | `siteHref(origin, path)`; a link whose origin is not the page's own is left out |
| canonical links (`l.$slug.tsx`, `terms.tsx`, `privacy.tsx`) | `origin + path` | `siteHref(origin, path)` |
| `/$name` route | upper-case name → 301 to the lower-cased path; a name with `/` reached the router's refusal (an error page) | a name with `/`, `\` or an undecodable escape → 404 first (INC-1117); upper-case → 301 through `safeReturnPath` |
| `l.$slug.tsx`, `legal.$kind.tsx` redirects | `href` from the server's canonical or the params | the same through `safeReturnPath` |
| `landAfterSignIn` (`use-legal-gate.ts`) | `navigate({ href: target })` | `navigate({ href: safeReturnPath(target) })` (the callers already passed `safeReturnPath` answers) |
| `THEME_INIT_SCRIPT` | `JSON.stringify` interpolations | `scriptLiteral` (the same text for today's constants; `<`, `>`, `&`, U+2028, U+2029 escaped) |
| `adJsonLd` | `JSON.stringify(…).replace(/</g, …)` | `scriptLiteral(…)` (also escapes `>` and `&`) |
| shell rail, admin panel | items from `PANELS.admin.items` (the entry) | items and alerts from the admin navigation layer (the admin layout's chunk); the same rows, order, alerts and words |
| breadcrumbs, admin page | section and group from `sections.ts` (the entry) | from the layer; the same trail; without the layer, Home › Admin |
| `src/routes/admin.tsx` | section from `sectionForPath` | `sectionAt(ADMIN_NAV_LAYER.sections, pathname)`, the same section |
| `parseSurface` | duplicates accepted | a repeated name throws `public surface: repeated name <name> on line <n>` |
| `redaction-rules.json` `SUPABASE_KEY` | a key ending in `-` kept that `-` | masked whole |

No route's status, body keys or headers changed except `/$name`'s 404 (INC-1117, ruling 1 Q3).

## 4. Censuses

The full census is stop report 1 (`docs/governance/reports/housekeeping-4.stop-1.md`, §consumers → §findings), accepted whole by ruling 1. After the parts:

- Concern 1: CF-HREF-1 (`scripts/conformance/safe-href.test.ts`) reads every JSX `href`, `.href` sink, `location` sink, `head()` link `href` and router `href` option under `src/` on the type-checked program; it passes with two allowlist lines (§7).
- Concern 2: CF-SCRIPT-3 reads every head script, `dangerouslySetInnerHTML`, `<script>`/`<style>` child and script region of a string under `src/`; it passes with no allowlist.
- Concern 3: the build's chunk record (`dist/.chunk-modules.json`): the entry's closure holds three modules under `src/features/admin/`, the impersonation three; `src/features/admin/nav-layer.ts` is in the admin layout's chunk, `sections.ts` in its own chunk.
- Concern 4: `awk` of the allowlist's names: `transition_listing` was the only repeated name; after Part D, none.
- Part E: `rg -n "@ts-(expect-error|ignore|nocheck)" src scripts e2e` → `src/routeTree.gen.ts:3` only (generated, exempt).
- Ruling 3's census: `rg -n "NAV_ALERT_LABELS|alertLabels" e2e scripts src docs/features` → the rail, the shell module and the doc only.

## 5. Tests

New ids: SAFE-1 → 8 (`src/lib/safe-href.test.ts`); SVF-1, SVF-2 (`src/lib/save-file.test.ts`); CF-SCRIPT-1, CF-SCRIPT-2 (`src/lib/script-literal.test.ts`); CF-SCRIPT-3, CF-SCRIPT-4 (`scripts/conformance/script-text.test.ts`); CF-HREF-1 → 3 (`scripts/conformance/safe-href.test.ts`); CF-LINT-5 (`lint-rules.test.ts`); SNAME-1, SNAME-2 (`src/routes/seller-name.test.ts`); TP-4 (`theme-provider.test.ts`); BRC-1 → 3 (`src/components/shell/breadcrumbs.test.tsx`); BC-16 (`scripts/bundle-closure.test.ts`); SLB-8 (`scripts/public-surface.test.ts`); CF-NN-3 (`scripts/conformance/non-null.test.ts`). Untitled cases added: `telHref`'s digits (`contact.test.ts`), the cleartext and protocol-relative refusals (`legal-markdown.test.ts`, `legal-text.test.tsx`).

Changed assertions: `json-ld.test.ts` (the escape form of `scriptLiteral`); `legal-markdown.test.ts` (an `http:` link is text); `gateway.test.ts:407` (the directive becomes `expectTypeOf<"unknown">().not.toExtend<Parameters<typeof aiCall>[0]>()`); CF-REDACT-1 and CF-REDACT-3 gain two fixed probes (a key ending in `-`, one ending in `_`).

Red-first:
- `gateway.test.ts`: with `"name_check"` planted for `"unknown"`, `tsc --noEmit` fails at the line (`TS2554`); restored, it passes.
- CF-NN-3: with the base's `gateway.test.ts` restored, it names `src/server/ai/gateway.test.ts:407`.
- SLB-8: with the base's allowlist restored, it fails on the real list.
- BC-16: on the real build, the banner's allowlist line removed → the budget step fails by the module's path; restored → `Admin code in the entry's closure: 3 module(s), each allowlisted (BC-16) — ok`.
- BRC-2 and BRC-3 fail when the layer provides no sections; restored, they pass.
- CF-REDACT-1 and CF-REDACT-3 fail on the old rule (`"dash [masked key]-"`); after the fix they pass.

STEP 6 on the final tree:
- `bun run typecheck` → green (both projects, no output).
- `bun run lint` → green.
- `bunx vitest run scripts src --maxWorkers=2` → `Test Files 475 passed (475)`, `Tests 2991 passed | 1 skipped (2992)`.
- `bun run checks` fast line: `checks (fast): 26 PASS · 0 FAIL · 400s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`.
- `bun run checks` last line: `checks: 35 PASS · 0 FAIL · 24 NOT RUN · 456s`.
- NOT RUN:
  - `scope` (GitHub-only).
  - `actionlint` and `gitleaks` (pinned linux/x64 binaries; this machine is darwin/arm64).
  - Every "Install dependencies" step (already installed).
  - `dependency-audit` (the advisory service is not reachable).
  - `e2e-preflight` (staging credentials).
  - The `e2e` merge steps (GitHub artifacts).
  - `promote` (CI only).
  - The semgrep SARIF upload and its warning (GitHub-only).
- `bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-4.md --at db13e13b7` → `[check-go] no finding`.

The budget step on the final build (`node scripts/check-bundle-size.mjs`):
- `JS: 204.4 KiB / 205 KiB — ok`
- `CSS: 22.6 KiB / 40 KiB — ok`
- `Admin code in the entry's closure: 3 module(s), each allowlisted (BC-16) — ok`
- `Tier flag: card pages only (CF-TIER-3) — ok`
- `Bundle budget OK.`

First download, every page, KiB gzipped: Part B's build (`5ff719dcb`) against the final build. The ceiling column is each line's move in `scripts/route-budgets.mjs` (`ceilingForLocal(final)`, DEC-296). The last column is ruling 3's own effect, in exact bytes: the build of the same tree with the label map in the layer against the final build.

| Page | Part B (KiB) | Final (KiB) | Change | Ceiling | Ruling 3 (B) |
| --- | ---: | ---: | ---: | --- | ---: |
| `/` | 227.5 | 225.4 | −2.1 | 228 → 226 | -21 |
| `/$name` | 225.5 | 223.4 | −2.1 | 233 → 224 | -25 |
| `/account` | 268.7 | 266.6 | −2.1 | 270 → 268 | -25 |
| `/account_/legal` | 209.1 | 207.0 | −2.1 | 210 → 208 | -20 |
| `/account_/legal_/$versionId` | 209.8 | 207.6 | −2.2 | 211 → 209 | -20 |
| `/account_/saved` | 225.7 | 223.6 | −2.1 | 233 → 225 | -29 |
| `/admin` | 207.4 | 208.8 | +1.4 | 208 → 210 | -41 |
| `/admin/` | 208.2 | 209.6 | +1.4 | 209 → 211 | -40 |
| `/admin/ai` | 320.1 | 321.2 | +1.1 | 321 → 322 | -84 |
| `/admin/attributes` | 333.3 | 334.5 | +1.2 | 334 → 335 | -85 |
| `/admin/audit` | 293.1 | 294.3 | +1.2 | 294 → 295 | -74 |
| `/admin/categories` | 341.3 | 342.5 | +1.2 | 342 → 343 | -88 |
| `/admin/countries` | 322.9 | 324.0 | +1.1 | 324 → 325 | -77 |
| `/admin/images` | 208.1 | 209.4 | +1.3 | 209 → 210 | -43 |
| `/admin/impersonation_/$sessionId` | 288.3 | 289.4 | +1.1 | 289 → 290 | -64 |
| `/admin/legal` | 279.0 | 280.4 | +1.4 | 280 → 281 | -64 |
| `/admin/legal_/$versionId` | 276.4 | 277.8 | +1.4 | 277 → 279 | -60 |
| `/admin/legal_/edit` | 278.0 | 279.4 | +1.4 | 279 → 280 | -59 |
| `/admin/listings` | 344.7 | 345.8 | +1.1 | 346 → 347 | -107 |
| `/admin/listings_/$listingId` | 347.0 | 348.4 | +1.4 | 354 → 349 | -100 |
| `/admin/listings_/$listingId_/edit` | 406.3 | 407.7 | +1.4 | 407 → 409 | -97 |
| `/admin/locations` | 268.1 | 269.5 | +1.4 | 269 → 270 | -39 |
| `/admin/monetisation` | 330.7 | 331.8 | +1.1 | 332 → 333 | -87 |
| `/admin/places` | 324.4 | 325.6 | +1.2 | 325 → 327 | -73 |
| `/admin/roles` | 289.9 | 291.1 | +1.2 | 291 → 292 | -73 |
| `/admin/roles_/$roleId` | 270.7 | 272.1 | +1.4 | 272 → 273 | -55 |
| `/admin/screening` | 366.1 | 367.2 | +1.1 | 367 → 368 | -108 |
| `/admin/translations` | 300.8 | 301.9 | +1.1 | 302 → 303 | -72 |
| `/admin/translations_/$lang` | 304.3 | 305.4 | +1.1 | 305 → 306 | -77 |
| `/admin/users` | 290.1 | 291.2 | +1.1 | 291 → 292 | -71 |
| `/admin/users_/$userId` | 285.1 | 286.5 | +1.4 | 286 → 287 | -70 |
| `/auth` | 223.7 | 221.6 | −2.1 | 231 → 223 | -27 |
| `/auth_/callback` | 210.6 | 208.5 | −2.1 | 217 → 209 | -18 |
| `/auth_/reset` | 212.5 | 210.4 | −2.1 | 219 → 211 | -23 |
| `/c/$slug` | 227.5 | 225.4 | −2.1 | 228 → 226 | -21 |
| `/dev/primitives` | 227.6 | 225.3 | −2.3 | 229 → 226 | -42 |
| `/dev/style` | 248.4 | 246.1 | −2.3 | 249 → 247 | -47 |
| `/dev/tall` | 206.8 | 204.7 | −2.1 | 208 → 206 | -17 |
| `/l/$slug` | 257.7 | 255.6 | −2.1 | 265 → 257 | -46 |
| `/legal/$kind` | 211.2 | 209.1 | −2.1 | 212 → 210 | -23 |
| `/legal/accept` | 218.2 | 216.0 | −2.2 | 219 → 217 | -22 |
| `/legal/publishing` | 212.0 | 209.9 | −2.1 | 213 → 211 | -26 |
| `/my-listings` | 315.4 | 313.1 | −2.3 | 316 → 314 | -49 |
| `/my-listings_/$listingId` | 323.3 | 321.2 | −2.1 | 324 → 322 | -42 |
| `/my-listings_/$listingId_/edit` | 401.3 | 399.8 | −1.5 | 402 → 401 | -69 |
| `/post` | 401.3 | 399.8 | −1.5 | 402 → 401 | -72 |
| `/post_/$listingId` | 401.3 | 399.8 | −1.5 | 402 → 401 | -72 |
| `/privacy` | 211.2 | 209.1 | −2.1 | 212 → 210 | -24 |
| `/settings` | 277.4 | 275.3 | −2.1 | 284 → 276 | -37 |
| `/terms` | 211.2 | 209.1 | −2.1 | 212 → 210 | -25 |

The entry: `index-*.js` 129.2 → 127.1 KiB; the entry's JS 206.5 → 204.4 KiB (ceiling 207 → 205). Ruling 3's map in the shell: `index-*.js` 130,174 → 130,157 B (−17 B). The cause, chunk by chunk, as stop report 2 measured it on shape 1's build:
- The admin modules left the entry: −2.0 KiB inside the 129 KiB entry.
- They arrived as `nav-layer-*.js` (2,016 B), `sections-*.js` (646 B, its own chunk because many admin chunks import it), and four one-icon chunks shared with other admin pages: `image` (240 B), `languages` (242 B), `shield-check` (276 B), and `users` + `scale` + `plug` (418 B).
- About 3.8 KiB carries the same code, because small chunks compress worse than the entry.
- In shape 2 (landed) the layer merges into the admin layout's chunk, which saves the layer chunk's own overhead (shape 1 against shape 2: +0.2 KiB on every admin page).
- New entry and shared-shell code from Parts A and B, each module minified and gzipped alone: `safe-href.ts` 575 B and `save-file.ts` ~0.21 KiB in the shared-shell chunk; `script-literal.ts` 225 B in the entry. Their ceiling lines were raised in Parts A and B by DEC-296's form with that cause.

Browser tests (`bun run e2e:local`, `--project=mobile-360 --project=desktop-1280 --retries=0`, against ethio-staging):
- Part A — `legal-pages`, `legal-accept`, `legal-certify`, `legal-history`, `legal-admin`, `ad-page`, `sage-ad-page`, `admin-translations-console`, `seller-name-hidden`: `245 passed (13.7m)`, `15 skipped`; one `[ssr-error]` line (§13, F8).
- Part B — `sage-shell`, `shell`, `sage-ad-page`: `207 passed (7.0m)`, `2 failed`, `123 skipped`. The two failures are `shell.spec.ts` HM-2 and HM-3 on mobile-360. They also fail on the unchanged base against staging, and the supervisor registered them as INC-1118 (ruling 2).
- Part C final — `admin-shell`, `breadcrumbs`: `18 passed (1.3m)`, 0 `[ssr-error]`.
- The menu alert, `legal-admin.spec.ts --grep LGA-17`: `2 passed (11.9s)`, 0 `[ssr-error]`.

No `e2e/**` file changed (no J-audit line).

## 6. K2 — siblings that bypass the mechanism

- `safeHref`: `rg -n "href=\{|\.href\s*=|location\.(assign|replace|href)|redirect\(\{ href|navigate\(\{ href" src --glob '!*.test.*'` → every site through the mechanism or a literal, by CF-HREF-1. The two allowlisted sites are in §7. `app-shell.tsx` :706, :713's `window.location.replace(SIGN_OUT_LANDING)` is a constant.
- `scriptLiteral`: `RAIL_INIT_SCRIPT` (`src/providers/rail-state.ts`) is a literal with no interpolation; it passes the law.
- The admin navigation: the impersonation three (`src/features/admin/impersonation/*`) stay in the entry by ruling 1 (INC-1116).
- The redaction rules: the `JWT` rule (`scripts/ci/redaction-rules.json`) ends with `\b` over the same class `[A-Za-z0-9_-]+`. A token whose last segment ends in `-` keeps that `-` unmasked, and CF-REDACT-1's `jwt` probe is random (`part()`). This is the same class as INC-1114. Ruling 3 names the key rule only, so it is left (§13, F7).
- The download helper: `rg -n "createObjectURL" src --glob '!*.test.*'` → `src/lib/save-file.ts` only.

## 7. Allowlists and guards

| Allowlist | Before → after (lines) | Change |
| --- | --- | --- |
| `scripts/conformance/safe-href-allowlist.txt` | 0 → 2 (new) | `src/routes/__root.tsx links href appCss` and `… PHOTO_ORIGIN`, each with its reason, until 2027-05-12 |
| `scripts/conformance/entry-admin-allowlist.txt` | 0 → 3 (new) | the impersonation banner, its service and its hook, each until INC-1116 |
| `scripts/public-surface-allowlist.txt` | 190 → 189 | `transition_listing`'s two lines are one |
| `scripts/conformance/briefs-allowlist.txt` | 1 → 0 | STEP 0's prune |
| `scripts/conformance/format-allowlist.txt` | 11 → 10 | `chart.tsx`'s line, with the file |
| `scripts/conformance/look-values-allowlist.txt` | 10 → 9 | `chart.tsx`'s line, with the file |
| `docs/tracking/intentional-deletions.txt` | 68 → 69 | `src/components/ui/chart.tsx` |

New guards, each proven on a planted bypass:
- CF-HREF-1 → 3 and CF-LINT-5 (Part A).
- CF-SCRIPT-3 → 4 (Part B).
- BC-16 (Part C; `wired.test.ts` names it with the allowlist's path and `entryAdminViolations(`).
- SLB-8 (Part D).
- CF-NN-3 (Part E).

The briefs-allowlist line count stays 0.

## 8. Strings

None new or changed (FLAG no-new-string). `admin.nav.alert.legalReview` stays in `en-base.ts` / `am-base.ts`. By ruling 3 its one reference moved to the shell, and CF-SL-1 passes. Both usage maps regenerated (`bun run i18n:usage`: 1864 keys across 712 files) and committed.

## 9. Migrations

None (FLAG no-migration).

## 10. Departures

- Stops and rulings: stop 1 → ruling 1 (`docs/governance/briefs/housekeeping-4-ruling-1.md`); stop 2 → ruling 2 (`…-ruling-2.md`, sha256 d868c225…, Part C's commit); stop 3 → ruling 3 (`…-ruling-3.md`, sha256 523944ad…, Part C's commit). Each was saved by `cp` from the operator's attachment, with its sha256 equal.
- Part C's mechanism is ruling 2's shape 2. The brief's "the admin layout provides the section resolver" and its `section-context.tsx` were replaced by rulings 1 Q5 and 2: the admin navigation layer, `src/components/shell/admin-nav-layer.ts` + `src/features/admin/nav-layer.ts`.
- Ruling 3: the menu alert's label map moved to the shell (`src/features/admin/nav-alerts.ts` in scope by ruling 3), and INC-1114 was fixed in Part E (`scripts/ci/redaction-rules.json`, `scripts/ci/redact.test.ts`).
- The ceilings' numbers are the final build's, not stop 3's:
  - After ruling 3's change, the ceiling script was re-run on the final build (ruling 3: "the build's number supersedes").
  - Every page fell by 17 to 108 B. Two admin ceilings came one KiB lower than stop 3's: `/admin/categories` 344 → 343 and `/admin/users_/$userId` 288 → 287.
  - The final growth of the admin pages is +1.1 to +1.4 KiB, against ruling 2's "+1.2 to +1.5" and ruling 3's same band. The posting pages fall by 1.5 (ruling 3: "1.4 → 1.5").
  - The §14 records carry the final numbers in their brackets.
- Correction to stop report 2: the build has 25 admin pages, not 26 (ruling 3 corrects the record text).
- `scripts/conformance/kit.ts` (Part B) gained two shared helpers, `typedProgram` and `entryOfList`, so CF-HREF and CF-SCRIPT read one type-checked program, not two copies (K1). The brief's scope names `scripts/conformance/` with its new census tests, `wired.test.ts` and `non-null.test.ts`; the kit file is not in that list. MINOR, named here.
- `scripts/bundle-closure.d.mts` declares BC-16's two new functions. It is the typed face of `scripts/bundle-closure.mjs`, which the approved plan named.
- DECIDE-AND-NAME, decided:
  - A refused link draws its text; a refused control is not drawn.
  - The lint list is `RESTRICTED_SYNTAX.safeHref`, AST selectors on the JSX `href` attribute and `.href` assignments.
  - `appObjectUrl` lives in `safe-href.ts`.
  - The script-text law lives in `scripts/conformance/script-text.test.ts`.
  - The layer's files are `admin-nav-layer.ts` and `nav-layer.ts`.
  - BC-16 is the next free BC id.
  - The type proof is `expectTypeOf<"unknown">().not.toExtend<Parameters<typeof aiCall>[0]>()`.
  - The allowlist line keeps the plan's words.
- §14's records are copied by script from the saved brief and rulings (`/tmp/ethio-scratch/housekeeping-4/records.mjs`). Only the brackets are filled, and ruling 3's two stated corrections are applied to ruling 2's INC-1042 line. Where the verbatim text no longer matches what landed, for the records turn to judge:
  - The brief's register row for `safeHref` names "the sign-out constant" as the allowlist's exception. The allowlist holds the stylesheet address (`appCss`) and the photo origin's preconnect (`PHOTO_ORIGIN`) in `__root.tsx`. The sign-out landing is a constant at a `location.replace`, which CF-HREF-1 does not allowlist.
  - The brief's changelog line says "the admin layout provides the section resolver". The landed mechanism is ruling 2's navigation layer.
  - The changelog says the two modules are "in the entry": `script-literal.ts` is in the entry, `safe-href.ts` in the shared-shell chunk.
  - INC-1042's parenthetical ("the three posting pages by 1.4 → 1.5, the others by 2.0 → 2.3") is ruling 3's text. The final build measures 1.5 and 2.1 → 2.3, both inside those ranges.
- Parts D and E landed in one commit (`5b110a1ab`, "parts D and E"), not one each as ruling 1 item 12 says. Its title names both parts and claims only what happened. It was pushed, so it is not split. MINOR.
- Pushes: one push of the code after STEP 6 (ruling 1 item 12). The stops' own pushes are rule 00's.

## 11. CI

The base, read at the start of the turn and again at its end (`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `db13e13b7df1639de3f2ab44bbe0332eba28a468` (short `db13e13`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T15:46:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43247042558
```

Two-step: SUCCESS, and the commit equals `<BASE>` and `origin/dev` (`git rev-parse origin/dev` → `db13e13b7df1639de3f2ab44bbe0332eba28a468`). No red of an earlier turn to fix.

This pull request's run on the last code commit, read from the lane's own folder on ci-evidence (`git show origin/ci-evidence:docs/tracking/branches/cursor/housekeeping-4/ci-status.md | head -6`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `5b110a1abf7fda74e6a40e085e66d392819721e6` (short `5b110a1`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T18:33:37Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43276869146
```

The two facts STEP 7 asks for:
- The lane's folder `docs/tracking/branches/cursor/housekeeping-4/` exists, holding `ci-status.md`, `e2e-last-failure.md`, `guards-last-failure.md`, `local-backend-last-failure.md` and `local-backend-proof.md`.
- dev's root `ci-status.md` still names dev's head, `db13e13b7` (above), after this lane's run completed.

`gh pr checks 35` on `5b110a1ab`:
- 42 pass and 1 skipping (`Promote to main (fast-forward on green)`, which runs on `dev` only).
- All 19 E2E lanes passed: the 16 numbered lanes, smoke, e-mail and repeat (DEC-283, the changed specs repeated).
- CodeQL ran for javascript-typescript, python and actions (run 43276862841).

No red on any of this pull request's runs, and no re-run. The flake ledger, read whole (1385 lines), holds no line from run 43276869146, and no test has three or more lines in the last seven days.

The report's own push is docs-only (DEC-365). This branch's earlier docs-only push, stop report 3 (`99500dbe5`, run 43271363013), ran 18 jobs (15 success, 3 skipped), with `Scope (docs-only push, DEC-365)` green and no E2E lane. The report's push takes that path. Its run is not the judged one (rule 60), and it is not waited for.

## 12. Limits

- The browser tests ran locally against ethio-staging (E2E values set, checked by name). The repeat lane is CI's (DEC-283).
- `actionlint`, `gitleaks`, `dependency-audit`, `scope` and the GitHub-only steps did not run locally (§5); CI judges them.
- The code-scanning alerts cannot be shown fixed on this pull request:
  - On `dev`, #430 (`js/xss-through-dom`, `src/features/legal/legal-text.tsx:17`) and #434 → #436 (`js/bad-code-sanitization`, `src/providers/theme-provider.tsx:30`) read open.
  - This pull request's CodeQL scans (`refs/pull/35/head`; javascript-typescript on `5b110a1ab`, run 43276862841) hold 0 results and no instance of any of the four alerts.
  - But the scan of `35bdb293a`, a docs-only commit whose code is the base's, also holds 0 results and no instance. A pull request's scan here does not show these alerts at all, so their absence is not evidence.
  - DEC-370's frozen judge ("alert #430 reads fixed on the pull request's scan") is therefore unmet on this pull request. `dev`'s first scan after the merge judges it, and the brackets in §14 say so.
- The module byte figures in §5 are each module minified and gzipped alone (`Bun.build`), not its share of a chunk. The per-page and per-chunk figures are the budget step's own gzip.
- Scratch copies for the comparisons, the operator's to remove: `/tmp/ethio-scratch/housekeeping-4/` (`base/`, `variant/`, `pre3/` — the tree before ruling 3, built for the exact-byte comparison — `part-c-wip/`, the logs, `ratchet-c.mjs`, `ratchet-c-final.mjs`, `exact-bytes.mjs`, `modsize.ts`, `modbytes.ts`).

## 13. Findings

- F5 — INC-1115 (registered by the supervisor; no detail here, G51).
- F6 — INC-1118 (ruling 2): `e2e/shell.spec.ts` HM-2 and HM-3 against ethio-staging. They are red locally on the base and on this turn's trees and green on CI's temporary backend. Not this turn's files.
- F7 — the redaction rule `JWT` (`scripts/ci/redaction-rules.json`) ends with `\b` over `[A-Za-z0-9_-]+`, so a token whose last character is `-` keeps that one character outside the mask. CF-REDACT-1's `jwt` probe ends with a random character, so the probe fails about one run in 64, as INC-1114 did. Ruling 3 fixed the key rule only. The same one-line change (the trailing `\b` out) with a fixed probe is the cure.
- F8 — Part A's browser run logged `[ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"` once (`ad-page.spec.ts` around AP-14). A view counted for an ad the test had already removed is refused by the database and logged as a server error. A missing ad is an expected answer there, so the route could answer it as an absence (a 4xx) rather than an `[ssr-error]`. Not this turn's files.
- The brief's PREVENTION names rule 10 gaining the two mechanisms' names (`safeHref`, `scriptLiteral`) at rules turn 4. Not edited here (`.cursor/**`, `AGENTS.md`).
- The sandbox note: three script tests that create temporary git repositories or spawn the checks runner fail inside the editor's sandbox (GW-3, `check-go --at`, TCK-12). Run outside it, they pass (112 of 112 files). This is an environment fact, not a code finding.

## 14. Records

DEC — DEC-370 (the supervisor, 2026-11-12 1x:xx New York, under G17 — a security allowlist with no change to stored data; INC-826; the supervisor's read of ethio-prod by DEC-246: the three legal versions carry no markdown link of any scheme) — a link target that comes from data reaches the page only through `src/lib/safe-href.ts`, parsed by the WHATWG URL parser, never by a regex on the raw string: `safeHref` answers a normalised href for `https:`, `mailto:`, `tel:`, a root-relative path or a fragment and `null` for everything else (`http:`, `javascript:`, `data:`, `blob:`, `file:`, protocol-relative, unparsable); an app scheme of the module's `APP_SCHEMES` (`comgooglemaps:`) is admitted only for a caller that asks with `{ app: true }` — the maps builders alone; `siteHref` builds the site's own absolute links (hreflang, canonical) and answers only for the page's own origin; `appObjectUrl` accepts only the app's own `blob:` object URLs, used by the one download helper `src/lib/save-file.ts`; navigation targets pass D20's `safeReturnPath`, the concern's navigation half. A `null` renders the text without a link or the control undrawn — never a dead `#`. Guards: the two lint selectors and the AST census CF-HREF-1 → 3 (JSX `href`, `.href` sinks, a `head()` link's `href`, the router's `href` option) with a reasoned, expiring allowlist. Why: eight builders were eight allowlists and CodeQL's #430 could not be closed by evidence; one parser-based allowlist is OWASP ASVS V5.2.6's form. Frozen judge: adopted when alert #430 reads fixed on the pull request's scan [CodeQL javascript-typescript, run 43276862841 on 5b110a1ab: no instance, which is not proof — report §12; dev's first scan after the merge judges] and the e2e specs of the legal pages, the ad page's contact and maps links, the share sheet and TR-28 pass on the lanes; a stored link the allowlist newly refuses is a finding, not a widening — a new scheme enters by its own DEC.

INC — INC-826 — status line: FIXED (housekeeping turn 4) — DEC-370; `legal-markdown.ts`'s regex replaced; the eight sites through the mechanism; alert #430 [fixed at CodeQL javascript-typescript, run 43276862841 on 5b110a1ab: no instance, which is not proof — report §12; dev's first scan after the merge judges].

INC — INC-1042 — status line: FIXED (housekeeping turn 4) — the admin navigation (sections, rail items, nav alerts) leaves the entry as the admin navigation layer in the admin layout's chunk (`src/components/shell/admin-nav-layer.ts`, `src/features/admin/nav-layer.ts`); every non-admin page's first download falls by [1.5 → 2.3] KiB gzipped (the three posting pages by 1.4 → 1.5, the others by 2.0 → 2.3) and the 25 admin pages grow by [1.1 → 1.4] KiB (the same code in smaller chunks); BC-16; the impersonation three remain (INC-1116).

INC — INC-443 — status line: CLOSED (housekeeping turn 4) — the duplicate merged; the reader refuses duplicates (fixture).

INC — Alerts #434 → #436 — closed by Part B [fixed at CodeQL javascript-typescript, run 43276862841 on 5b110a1ab: no instance, which is not proof — report §12; dev's first scan after the merge judges].

INC — INC-1116 — the impersonation banner, its hook and its service ride every page's first download (`app-shell.tsx` :44), and the shell mounts the banner for every signed-in user (:928), so every signed-in visitor polls the active-session probe every 30 s and on every route change; found by housekeeping turn 4's chunk census. Class: admin-only code and an admin-only probe on the public path. Fix: a Tier A design the operator decides (who probes, when the banner's chunk loads, how a load failure shows) — its own turn; BC-16's allowlist carries the three modules until then. Status: OPEN.

INC — INC-1117 — `src/routes/$name.tsx` :29 redirects an upper-case name before it checks the name is one path segment, so a malformed name reaches the router's refusal of the redirect (an error page) instead of a 404; no redirect leaves the site. Fix: `notFound()` first; the redirect's href through `safeReturnPath` (housekeeping turn 4). Status: FIXED.

INC — INC-1114 — status line: FIXED (housekeeping turn 4) — the key rule no longer ends at a word boundary; fixed cases for a key ending in `-` or `_`.

register row — "a data-derived link is safe (DEC-370)" → src/lib/safe-href.ts → the lint selectors, CF-HREF-1 → 3 → exceptions: safe-href-allowlist.txt (the sign-out constant)

register row — "a value in inline script text is embedded safely" → src/lib/script-literal.ts → CF-SCRIPT-1 → 2 → exceptions: none

register row — "the public first download carries no admin code" → mechanism: `src/components/shell/admin-nav-layer.ts` + `src/features/admin/nav-layer.ts` (`staticData.adminNav` on the admin layout) → BC-16 → exceptions: the impersonation three (INC-1116)

register row — the public-surface allowlist's row → guard gains "no duplicate name".

changelog — 2026-11-1x housekeeping turn 4 (Opus 5.5): every data-derived link passes through one `safeHref` (DEC-370; INC-826 fixed; alert #430 closed; the lint selectors and CF-HREF-1 → 3); inline script text embeds values through one `scriptLiteral` (alerts #434 → #436 closed); the admin sections leave every public page's first download (INC-1042; the admin layout provides the section resolver; BC-16; the public ceilings down by [1.5 → 2.3] KiB); the public-surface allowlist names each surface once and its reader refuses a duplicate (INC-443 closed); the repository's last `@ts-expect-error` becomes an `expectTypeOf` proof. New product modules: safe-href.ts [575 bytes], script-literal.ts [225 bytes] in the entry; `siteHref` for the site's own links; one download helper (`src/lib/save-file.ts`); the ad page's structured data through `scriptLiteral`; the unused `ui/chart.tsx` removed; `telHref` narrowed to digits; a malformed seller name is a 404 before any redirect (INC-1117); CF-NN-3 (no `@ts-` directive in three trees).

roadmap — line 23 ("The housekeeping turn") gains "turn 4: INC-826 (DEC-370), INC-1042, INC-443 closed, alerts #430, #434–#436" (the records turn writes it — DEC-346).

roadmap — a performance line (the records turn writes): "an admin chunking group that holds only modules no non-admin chunk imports (shape 3, sound form) — measure against shape 2's +1.2 → 1.5 KiB"
