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
hydration (SSR always renders `en` first to avoid a hydration mismatch). The
active language is mirrored onto `<html lang>`.

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
