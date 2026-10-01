# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36938569694 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36938569694
- Commit: `9a648c5c4e7aa575e1b625623eb3eee394f80506`
- Attempt: 1
- Written (UTC): 2026-10-01T23:18:40.247Z
- Post-test warnings: 16
- Flaky (passed on retry, DEC-030, non-gating): 2

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('translator-lang-am')
Expected: "true"
Received: "false"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('translator-lang-am')
    14 × locator resolved to <button value="on" type="button" role="checkbox" aria-checked="false" data-state="unchecked" id="translator-lang-am" data-testid="translator-lang-am" class="grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"></button>
       - unexpected value "false"

```

Context:

```text
          - listitem [ref=e232]:
            - generic [ref=e233]: About
          - listitem [ref=e234]:
            - generic [ref=e235]: How it works
      - navigation "Help" [ref=e236]:
        - heading "Help" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Safety
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Terms
          - listitem [ref=e248]:
            - generic [ref=e249]: Privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('translator-lang-am')
Expected: "true"
Received: "false"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('translator-lang-am')
    14 × locator resolved to <button value="on" type="button" role="checkbox" aria-checked="false" data-state="unchecked" id="translator-lang-am" data-testid="translator-lang-am" class="grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"></button>
       - unexpected value "false"

```

Context:

```text
          - listitem [ref=e342]:
            - generic [ref=e343]: About
          - listitem [ref=e344]:
            - generic [ref=e345]: How it works
      - navigation "Help" [ref=e346]:
        - heading "Help" [level=2] [ref=e347]
        - list [ref=e348]:
          - listitem [ref=e349]:
            - generic [ref=e350]: Safety
          - listitem [ref=e351]:
            - generic [ref=e352]: Contact
      - navigation "Legal" [ref=e353]:
        - heading "Legal" [level=2] [ref=e354]
        - list [ref=e355]:
          - listitem [ref=e356]:
            - generic [ref=e357]: Terms
          - listitem [ref=e358]:
            - generic [ref=e359]: Privacy
    - paragraph [ref=e361]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

103 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 3 | shard 3, shard 6 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-01T23:03:38.293Z | 11.0 min |
| email | 2026-10-01T23:03:46.648Z | 0.2 min |
| shard 1 | 2026-10-01T23:03:36.753Z | 14.7 min |
| shard 2 | 2026-10-01T23:03:48.191Z | 13.4 min |
| shard 3 | 2026-10-01T23:03:38.930Z | 10.1 min |
| shard 4 | 2026-10-01T23:03:49.254Z | 12.9 min |
| shard 5 | 2026-10-01T23:03:43.209Z | 12.4 min |
| shard 6 | 2026-10-01T23:03:47.586Z | 13.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 14.4 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 52 | 10.4 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 8.3 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 34 | 6.7 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 40 | 6.1 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 5.8 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 5.8 min | shard 1, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 5.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 5.7 min | smoke, shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 38 | 5.7 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 26 | 5.5 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 5.5 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 24 | 5.3 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 18 | 4.6 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 34 | 4.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 36 | 4.2 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 22 | 4.2 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 22 | 4.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 24 | 4.1 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 3.6 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 3.6 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 2.3 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 6 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.0 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 0.9 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `rbac.spec.ts` | 6 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.4 min | shard 3 |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 36.4 s |
| `admin-translations-console.spec.ts` › TR-10 translator card proves both permission states | desktop-1280 | 35.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 33.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 33.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 32.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 31.9 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 29.7 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 29.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 29.4 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 27.9 s |
| `admin-translations-console.spec.ts` › TR-10 translator card proves both permission states | mobile-360 | 27.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 27.6 s |
