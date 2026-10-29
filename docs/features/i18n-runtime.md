# Feature: i18n runtime (Phase 1 P1-b)

## Purpose

Translation-key system every screen depends on. Law D1: no user-visible literal
strings in components — everything resolves through `t(key)`.

## Files

- `src/i18n/types.ts` — `Messages` type, `Language` union, `SUPPORTED_LANGUAGES`.
- `src/i18n/locales/en.ts` — source of truth for the key set (English values).
- `src/i18n/locales/am.ts` — Amharic values, typed `Messages`.
- `src/i18n/provider.tsx` — `I18nProvider` + `useI18n()`.
- `src/i18n/index.ts` — public entry point.
- `src/components/language-switcher.tsx` — accessible EN / አማርኛ control.
- `src/components/app-header.tsx` — minimal header hosting the switcher.
- `src/routes/__root.tsx` — provider wrap + header on every page.

## Key-parity type trick

`en.ts` is `as const`. `types.ts` derives:

```ts
export type Messages = { [K in keyof typeof en]: string };
```

`am.ts` is annotated `const am: Messages`. A missing key is a compile error; an
unknown extra key is a compile error. Key parity is therefore enforced by
`bun run typecheck` in CI, not by review.

## Lazy loading

`en` is statically imported (default language, no round trip). Any other locale
is fetched through `import()` only when selected, so a browser downloads exactly
one locale file. English users never pay for Amharic bytes.

Selection persists in `localStorage` under `ethio.lang` and is restored after
hydration (SSR always renders `en` first to avoid a hydration mismatch).

**The declared language (INC-872, Foundations turn 10).** `<html lang|dir>`
follows the APPLIED catalog, never the selection: the provider's
`appliedLanguage` is set in the same update as the messages it describes, and
the one lang/dir effect keys on it (ILA-1…4). The server renders the base
catalog for every visitor, so the first byte declares the base language and its
direction from the gate rows (`serverShellLanguage`, ILA-5) — CHANGE (1); the
client switches both once the star language's catalog is applied. A failed
catalog load leaves both the text and the declaration in the base language.
Rendering the star language on the server is a roadmap study (Foundations #6).

## Adding a language later

1. Add the code to `SUPPORTED_LANGUAGES` in `src/i18n/types.ts`.
2. Add `src/i18n/locales/<code>.ts` typed `Messages` (typecheck enforces parity).
3. Register a loader entry in `provider.tsx`.
4. Add `language.<code>` label keys to every locale file.

Long term this is superseded by REQ-002 (translation dashboard): locale content
moves to an admin-managed surface, and these files become the fallback bundle.
No component change is required when that lands, because components only ever
call `t(key)`.

## Plural rules (flagged, not yet implemented)

Amharic, Afaan Oromo and Tigrinya do not share English plural categories. When
the first count-bearing string appears, `Messages` values must widen from
`string` to `string | Record<Intl.LDMLPluralRule, string>` and `t()` must accept
a count argument resolved via `Intl.PluralRules`. The current flat key structure
was chosen because it supports that widening without touching call sites.

## RTL

The header uses logical properties only (`ps-*`, `pe-*`), per law C5.

## The compiled-catalog lookup reads own keys only (Bundle 7 Part H1)

`compiledCatalogLoader(code)` (src/i18n/compiled-catalog.ts) answers a loader only for a code that is one of the registry's own keys; a code naming an inherited member (`toString`, `valueOf`) answers undefined, so the provider takes the "no compiled catalog" branch and the gate falls back to the base language. Lookups by an outside key elsewhere read through `ownValue` (src/lib/own-key.ts). Proven by src/test/own-key-sites.test.ts and IB-3 (e2e/i18n-bundle.spec.ts).

## The admin strings layer (DEC-231, bundle 22 turn 22)

The English and Amharic catalogues are each two files. en-base.ts / am-base.ts hold every key a visitor's page can show and ride in the first paint; en-admin.ts / am-admin.ts hold the admin.\* keys that only admin-only files use, and load when the admin gate asks (useAdminStrings) — the gate shows its waiting line until they are in, and an error line with Try again if they fail. en.ts / am.ts join both for tests, scripts and the strings console's sync. src/i18n/locales/admin-layer.test.ts decides which keys may live in the admin layer; the marketplace weight guard keeps the joins and the admin parts off the first paint. Measured at the split: the first paint 320.0 → 296.8 KiB.

## One language rule (DEC-229, bundle 22 turn 24)

Dates and numbers format with formatLocale(language) (src/lib/format-locale.ts): am-ET for Amharic, en-GB for English, the language's own code where the runtime knows it, else English. Names stored in English and Amharic columns go through catalogText, or entityName when the row is a category or place with its id, so a translation added in Admin › Translations shows in any language. An acceptance's or certification's language is named for any language from the public language list. The admin strings layer keeps its English part under a failed language part (INC-816).

## The strings layers (DEC-258, Foundations turn 30)

DEC-231's admin layer is now one of the named `STRINGS_LAYERS`: admin and member, each with English and Amharic files. The base part alone rides on every page's first download. A route declares the layers its screens show with `staticData: { strings: [...] }`; a layout's declaration covers the routes under it.

The root's `StringsLayerGate` asks through `useStringsLayers` and draws the route once every declared layer is ready. It shows a spinner while loading, or an error line with the shared Button's Try again action on failure. Each English part is kept under a failed language part (INC-816), so translated-layer failure leaves English text, never blank text. `useAdminStrings` is retired; the admin permission gate remains the authority for its screens.

`scripts/conformance/strings-layers.ts` decides each key's file from the pages that reach its readers and those pages' declarations. Keys no page shows stay where they are (INC-903). `en.ts` and `am.ts` join every part for tests, scripts and the strings console; the first paint reads only the base part.

## Formatter intents (INC-985, Foundations turn L-1)

Every date, time, relative time and number a reader sees is formatted by `src/lib/format.ts`
(`dateFormatter`/`formatDate`, `numberFormatter`/`formatNumber`, `formatRelative`), on
`formatLocale`, one cached instance per (intent, resolved locale, time zone). Date intents: `day`,
`dayFull`, `dayNumeric`, `dayMonth`, `dayTime`, `dayTimeNumeric`, `moment`, `dayTimeZone`,
`monthYear`, `weekdayNarrow`; number intents: `count`, `exact`. In a `LONG_MONTH_LANGUAGES`
language (Amharic) a month is always written in full and `dateStyle` medium/short is never used.
Locale tags, the fallback and the country/currency code shapes live only in `src/lib/locale.ts`.
CF-FMT-1 (`scripts/conformance/format.test.ts`) refuses a bypass; its allowlist holds only the
named exceptions (AI USD formatters, UI kit calendar/chart, `supportedLocalesOf`, e2e oracles).
Never-ending allowlist lines carry the review date 2027-04-30 (renewed with their reason or
removed then). The formatter rides a page's first download only where that page draws a date or a
number; `legalDate`/`legalMoment` live in `src/features/legal/legal-dates.ts`, apart from the
gate rules every page loads. LF-E1 (`e2e/locale-format.spec.ts`) proves an Amharic account's
full month on My listings.
