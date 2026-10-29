# Foundations turn L-2: plan (country names, reader order, page titles)

Base dev 5d61def7. No migration. Request sha256 432b3d55… (supplied). CI on 5d61def7 is read first in the build turn; any red is fixed before anything else.

## 0. Part 0: three corrections (built first)

0.1 Selector (`scripts/e2e-select.ts` :150–:155). Remove the `locale-format` area. Add `e2e/locale-format.spec.ts` to the `my-listings` area's specs. With no area, `src/lib/format.ts`, `locale.ts` and `format-locale.ts` again select ALL. To show it: paste `bun scripts/e2e-select.ts --self-test` passing, and paste the output for a change to `src/lib/format.ts` (ALL). Add one self-test case to keep it that way: shared `src/lib` formatter → ALL.

0.2 LF-E1's afterEach (lines 30–36 currently write `preferred_language: null`). Before setting the value to `am` (line 54), read and keep the seller's prior `preferred_language`. afterEach writes back exactly that value, including NULL, and the comment at :19 is changed to match. If the read fails, the test fails (no default).

0.3 Red first (G38). Locally restore the My listings date code from e65a78e7 (`git show e65a78e7:<file>` into the working tree, never committed). Run `bun run e2e:local -- e2e/locale-format.spec.ts` on both projects with 0 retries and paste the failure line. Restore the fixed code (proved with `git diff --exit-code` on that file), run again, and paste the green summary.

## 1. Part A: locale-sensitive Intl APIs

Helpers, both in `src/lib/format.ts`, each cached per language:
- `formatCountryName(code, language)`: `Intl.DisplayNames([formatLocale(language)], {type:"region"})`. Returns `.of(code) ?? code`, and also returns `code` when `.of` throws on a malformed code. This matches today's behaviour.
- `collatorFor(language)`: moves from `src/lib/place-order.ts` :11–:20 into format.ts, keeping the same options (`sensitivity:"base"`, `numeric:true`) and now taking its locale from `formatLocale`. place-order.ts imports it. It is created in one place only. A `compareForReader(a,b,language)` wrapper is not added; callers use `collatorFor(l).compare`.

Site verdicts:

| Site | Verdict |
|---|---|
| legal-kinds.ts :63 | formatCountryName |
| legal-document-page.tsx :41, :130 | formatCountryName (through legal-dates.ts's slice so format.ts stays off the four legal pages; L-1's measurement repeated) |
| listing-page.tsx :884 | formatCountryName |
| wizard.tsx :423 | formatCountryName |
| calling-codes.ts :120 | formatCountryName |
| languages-page.tsx :62 | stays an allowlisted exception: a language's name in its own language is the autonym the admin is registering, not the reader's locale; a formatLocale fallback would give the wrong answer |
| place-order.ts sortPlacesByName | collatorFor (moved) |
| calling-codes.ts :113 | collatorFor(language).compare |
| step-who.tsx :653 | collatorFor(language).compare |
| name-collator.ts :6 | fixed order. It reproduces Postgres `ORDER BY name_en` under the database's collation for Latin names (the "server's order" Part H5 restores after optimistic edits). `"en"` moves to `locale.ts` as `FIXED_ORDER_LOCALE` with the H5 reason; compareNames stays the only fixed-order mechanism |
| location-data.ts :191 | fixed order → compareNames (mirrors the server's display_order, name_en) |
| categories-service.ts :271 | fixed order → compareNames |
| locations-service.ts :279 | fixed order → compareNames |
| locations-page.tsx :119 | fixed order → compareNames; :120 machine order |
| category-attributes-dialog.tsx :88 | reader order (shown label in the admin's language) → collatorFor |
| Machine order: attributes-service.ts :393, :597–:598, :662; locations-service.ts :111–:115; categories.tree.ts :91–:98; language-switcher.tsx :83; languages-page.tsx :76; legal-page.tsx :314; ai-service.ts :159 | plain code-point compare via one `compareCodes(a,b)` in `src/lib/compare-codes.ts` (`a<b?-1:a>b?1:0`). The census lists these sites as "machine order" |
| cut-text.tsx Segmenter | out of scope: grapheme segmentation does not depend on locale (`undefined` locale), and it gives the same result on server and browser for counting. Allowlisted with that reason so the guard can see it |

Guard: CF-FMT-1 widens to refuse `new Intl.DisplayNames`, `new Intl.Collator` and `Intl.Segmenter` outside format.ts / locale.ts (allowlist: languages-page :62, cut-text, UI-kit chart from L-1), and any `.localeCompare(x)` with fewer than two arguments, anywhere in `src`. Three planted bypasses (DisplayNames, Collator, bare localeCompare) each fail, in the existing planted-proof test form (CF-FMT-2 extended to cases a/b/c). Register row 16 and docs/features/i18n-runtime.md are updated.

## 2. Part B: page heads (INC-990)

API (`src/lib/page-head.ts`, pure, server-safe):
```text
pageHead({ language, catalog, title: HeadText, description: HeadText,
           suffix: "site"|"admin"|"none", og?: {url, image?, type},
           extra?: meta[]/links[] })  -> { meta, links }
HeadText = { key } | { key, value: string } | { data: string }
```
- `catalog` is the applied catalogue lookup (`DB[lang] ▸ compiled[lang] ▸ compiled.en`, D3). An unknown language falls back to en, and a missing am key falls back to en.
- Filling values until L-5: the pattern keys hold one `{name}` token, replaced by one internal `fillOne(pattern, value)` using `split("{name}").join(value)`. This avoids `$&` problems with `.replace`. The value is plain text and is never parsed. L-5 swaps only `fillOne` for `t(key, values)`, and the call sites do not change.
- og:title and og:description always equal the title and description. og:type, twitter:card, absolute og:url, image, hreflang and canonical come through `og`/`extra` unchanged, so G1 behaviour holds; today's root hreflang from the publication gate is untouched.
- `seller-head.ts` becomes a pageHead consumer (data name + `head.seller.description` pattern).

Language:
- Server: head() reads the language the root context already resolves from the cookie (DEC-287) and the applied catalogue for that route's layers. The router context passes them to head().
- Browser: head() re-runs when the router context's language changes (the switcher already invalidates context). If it does not, the switcher calls `router.invalidate()` after the catalogue is applied. Test PGH-E2 proves document.title changes without a navigation.

Where the keys live: admin heads in en-admin/am-admin (already loaded by admin.tsx), member heads in en-member/am-member, auth heads in the layer their routes declare. Public pages need only the two suffix/description patterns plus `head.home.title`, `head.home.description`, `head.category.description` and `head.ad.description`. Measurement: `scripts/check-bundle-size` before/after, per page, gzip. If base grows by more than 0.1 KiB on any page, the public keys move to a new `public-head` slice served in the SSR payload for public routes only. That is LEFT for a ruling, not built silently.

Route table (title / description; og = equal in every row):

| Route | Title | Description |
|---|---|---|
| __root | `head.site.name` (new) | `head.site.description` (new) |
| index | `head.home.title` (new) | `head.home.description` (new) |
| c.$slug | data: category name + site | `head.category.description` (new, {name}) |
| l.$slug | data: ad title + site | data: ad summary, else `head.ad.description` (new) |
| $name | data: seller name + site | `head.seller.description` (new, {name}) |
| legal.$kind, privacy, terms, legal.publishing | existing legal kind label key + site | existing legal summary key, else `head.legal.description` (new) |
| legal.accept | existing heading key + site | `head.member.description` (new, {name}) |
| auth, auth_.callback, auth_.reset | existing page heading keys + site | `head.member.description` |
| account, account_.legal, account_.legal_.$versionId, account_.saved, settings, my-listings, my-listings_.$listingId, my-listings_.$listingId_.edit, post, post_.$listingId | existing menu/heading key + site | `head.member.description` |
| admin | `head.admin.panel` (new) | `head.admin.description` (new, {name}) |
| 25 admin.* leaf routes | existing rail section label key (sections.ts) or page heading key + `head.admin.suffix` | `head.admin.description` |
| dev.primitives, dev.style, dev.tall | none: allowlisted, dev-only, unlisted (reason line) |

The build turn's first step is a per-route census of the exact existing key for each row, listed in the report. A row with no existing key gets a new key, named in the build ruling's string list before it is created.

Guard: CF-HEAD-1 is an AST census of every `head:` in src/routes and src/features/**/\*-head.ts. It fails when a string or template literal is the value of `title` or the `content` of description/og:title/og:description outside page-head.ts. The allowlist holds only dev.* routes. It is proven on a planted literal and wired in wired.test.ts.

## 3. New keys (English)

- head.site.suffix: "{name} — ethio.com"
- head.admin.suffix: "{name} — ethio.com Admin"
- head.site.name: "ethio.com"
- head.site.description: "Buy and sell with people near you on ethio.com."
- head.home.title: "ethio.com — the marketplace for {country} and beyond" (market-neutral; {country} is filled from the settings value, not a literal)
- head.home.description: "Browse ads near you and contact sellers on ethio.com."
- head.category.description: "Ads in {name} on ethio.com."
- head.ad.description: "An ad on ethio.com."
- head.seller.description: "Ads by {name} on ethio.com."
- head.legal.description: "Read this document on ethio.com."
- head.member.description: "{name} on ethio.com."
- head.admin.panel: "Admin — ethio.com"
- head.admin.description: "{name} in the ethio.com staff panel."

13 keys. The existing English for these titles is replaced (D5: new keys). The operator sends the Amharic by script (G43).

## 4. Tests (IDs grep-checked free at 5d61def7; PH- is taken, so PGH-)

Unit `src/lib/page-head.test.ts`:
- PGH-1: am catalogue gives Amharic title/description, and og is equal to them.
- PGH-2: a value `<img src=x onerror=alert(1)>` is kept literal in the title and og:title.
- PGH-3: a missing am key falls back to en.
- PGH-4: an unknown language (`xx`) falls back to en.
- PGH-5: a public head keeps an absolute og:url/og:image, and hreflang/canonical pass through unchanged.
- PGH-6: fillOne treats `$&` and `$1` in a value literally.

Format: FMT-9 formatCountryName (am, unknown code → code, malformed → code), FMT-10 collatorFor is cached once per language and orders am names, FMT-11 compareCodes is code-point order.

E2E `e2e/page-head.spec.ts`, both projects, 0 retries, by `bun run e2e:local`:
- PGH-E1: with the am cookie, the raw server HTML (`request.get`, no JS) has an Amharic `<title>` on `/`, a seeded J1 ad page and `/admin/categories`.
- PGH-E2: pick Amharic in the switcher and the title changes with the URL unchanged.
- The selector gets a `page-head` area.

All touched specs are run whole. The unit suite runs through `bun run checks`.

## 5. Conflicts

- Head data for public pages vs G60 0.1 KiB: possible. Measured, and if over, a ruling is needed (see above).
- `head()` receiving the catalogue: TanStack head() gets only `{params, loaderData, match}`. The language/catalogue must come through router context or loaderData. Using root loaderData can't be reached from a leaf, so router context is used. If context isn't re-read on invalidate, the fallback is a small client effect owned by page-head.ts (one mechanism).
- Market-neutral home title needs a `{country}` value: the settings read is already in root context, but a second value goes beyond `fillOne`'s one-token rule. Option: keep the home title country-free. A ruling is needed; my default is country-free.
- D5 retires no keys (titles were literals).
- No platform conflict found; no migration.

## 6. K2

- `seller-head.ts` builds English inline (INC-990's own copy), fixed here.
- `legal.$kind` title interpolates the raw URL param (`${params.kind}`), fixed by using the kind key.
- languages-page :62 and cut-text are allowlisted, not moved.
- Root `og:type` and others stay in __root as defaults.
- The 226 `.replace("{` sites remain for L-5.
- name-collator vs DB collation is not proven equal for non-Latin names (LEFT; database work for the operator).

## 7. Sizing

One turn: Part 0 + Part A (about 25 sites, 2 helpers, guard) + Part B (51 routes + seller head, builder, guard, 13 keys, 2 specs). ESTIMATE: 1 turn, band M–L. If the platform time limit cuts it, the split point is after Part A lands green (Part 0 + A = L-2a, B = L-2b).

LEFT: SQL language literals and INC-954 database copies; INC-999 proof fix; a public-head slice if base is over budget.
