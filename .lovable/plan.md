# L-INC1193 — report (look only, nothing changed)

Branch: sandbox checkout at `72fb1d470` (= base). No file changed but this one.

## 1. The two pages (dev preview, http://localhost:8080, headless Chromium)

| Page | Renders? | Error |
|---|---|---|
| `/` | Draws (title "ethio.com — Ethiopia's marketplace", feed present) | throws once on load |
| `/l/canon-dslr-camera-rescvrjk6v` (first ad in the home feed) | Draws (h1 "Canon DSLR Camera") | throws once on load |

Both pages throw the same uncaught error (`pageerror`), then still draw:

```text
ReferenceError: Cannot access 'enBase' before initialization
    at http://localhost:8080/@oj-start/i18n-DGFBOVoF.js:335:22
```

That is the whole stack: one frame, at module top level (no caller frames).
Line 335 of that dev chunk is `src/i18n/provider.tsx`'s
`const enFirstPaint = enBase;`.

## 2. Cause: a cycle between two dev-server chunks, not between source modules

CF-CYCLE is right that `src/` has no module cycle. The cycle is made by the
`shared-shell` chunk group (vite.config.ts:64-71, DEC-362, client environment),
which the dev server (Rolldown full-bundle dev) also applies:

- `shared-shell-DWAw79N2.js` holds `src/i18n/locales/en-base.ts` (chunk line 1080,
  `const enBase = {` at 1084), `i18n-context.ts`, `entity.ts`, `compiled-catalog.ts`,
  and the three shell modules below.
- `src/i18n/index.ts` (the `@/i18n` barrel) and `src/i18n/provider.tsx` are NOT in the
  group, so they land in a separate chunk `i18n-DGFBOVoF.js`.
- `i18n-DGFBOVoF.js` line 8: `import { … jn as enBase … } from "./shared-shell-DWAw79N2.js";`
- `shared-shell-DWAw79N2.js` line 13: `import "./i18n-DGFBOVoF.js";` (side-effect import,
  because shared-shell modules import the barrel by value).

ESM evaluation order when the entry reaches shared-shell first:

```text
client-entry  -> shared-shell (starts; its imports run first)
shared-shell:13  import "./i18n-DGFBOVoF.js"     -> i18n chunk evaluates now
i18n:8           import {enBase} from shared-shell -> cycle; shared-shell body not run yet
i18n:335         const enFirstPaint = enBase      -> TDZ ReferenceError
```

## 3. The import chain (source)

1. `src/components/shell/on-demand-notice.tsx:9` — `import { useI18n } from "@/i18n";`
   (also `src/components/shell/offline-line.tsx:4` — same line, and
   `src/features/categories/category-tree.ts:11` — `import { entityName, type EntityBundle } from "@/i18n";`).
   All three are shared-shell members.
2. `src/i18n/index.ts:1` — `export { I18nProvider, LANGUAGE_STORAGE_KEY, BASE_LANGUAGE } from "./provider";`
3. `src/i18n/provider.tsx` (top level) — `const enFirstPaint = enBase;` reading
   `src/i18n/locales/en-base.ts`, which sits in shared-shell and has not run yet.

Other shared-shell members reaching `@/i18n` do so type-only
(`src/features/legal/legal-kinds.ts:2`, `src/lib/page-head.ts:2`, `i18n-context.ts:4`) and
are erased, so they add no edge.

Why the published site works: the production build orders/hoists the chunks
differently (and its budget census already runs on it); I did not build it here to confirm the
exact production order.

## 4. Narrowest fix

Make the three shared-shell members import the leaf modules that already live in
shared-shell, instead of the barrel. Shared-shell then no longer imports the i18n chunk;
the only edge left is i18n -> shared-shell, so no cycle.

| File | Change | May I edit? |
|---|---|---|
| `src/components/shell/on-demand-notice.tsx:9` | `import { useI18n } from "@/i18n/i18n-context";` | Yes (shell component, not on the never-touch list; not `app-shell.tsx`/`shell-context.ts`) |
| `src/components/shell/offline-line.tsx:4` | `import { useI18n } from "@/i18n/i18n-context";` | Yes |
| `src/features/categories/category-tree.ts:11` | `import { entityName, type EntityBundle } from "@/i18n/entity";` | Yes |

Confirmed exports: `useI18n` at `src/i18n/i18n-context.ts:68`; `entityName` at
`src/i18n/entity.ts:67`, `EntityBundle` at `src/i18n/entity.ts:26`. Same-path leaf imports are
already used elsewhere (`src/components/marketplace/feed.tsx`, `listing-card.tsx`,
`src/features/posting/wizard.tsx`).

No change to `vite.config.ts`, `scripts/route-budgets.mjs` (SHARED_SHELL_MODULES) or any
`src/lib/**` file. First-download effect: expected none (the modules stay in the same chunks;
one side-effect import line leaves shared-shell); the supervisor's size check confirms.

### Test consequence (must be ruled)
Two tests mock the barrel and would stop intercepting the new import path:
- `src/components/shell/on-demand-notice.test.tsx:14` — `vi.mock("@/i18n", …)`
- `src/components/shell/offline-line.test.tsx:6` — `vi.mock("@/i18n", …)`
Each needs its mock target changed to `"@/i18n/i18n-context"` (same factory, no assertion change).
`rail-first-paint.test.tsx:58` and `breadcrumbs.test.tsx:47` mock `@/i18n` with `original` spread;
they must be run to confirm they still pass.

### Tests covering the changed files
- on-demand-notice.tsx: `src/components/shell/on-demand-notice.test.tsx`, `scripts/conformance/on-demand-failure.test.ts`, `src/components/shell/rail-first-paint.test.tsx`
- offline-line.tsx: `src/components/shell/offline-line.test.tsx`, `src/components/shell/rail-first-paint.test.tsx`
- category-tree.ts: `src/features/categories/category-tree.test.ts`, plus its readers' tests (`feed.test.tsx`, `listing-card.test.tsx`, `similar-ads.test.tsx`, `seller-page.test.tsx`, `breadcrumbs.test.tsx`, `step-category-retry.test.tsx`, `recent-categories.test.ts`, `post-prefill.test.ts`, `listings-page.test.tsx`, `screening-decisions.test.tsx`, `use-monetisation-names.test.ts`, `src/lib/first-reads.test.ts`), and `scripts/bundle-closure.test.ts`
- Proof of the fix: reopen `/` and `/l/canon-dslr-camera-rescvrjk6v` in the preview; no `pageerror`.

### Guard gap (for the supervisor)
CF-CYCLE judges source modules only; a chunk-level cycle made by the codeSplitting group is
invisible to it. A guard (a shared-shell member importing, by value, a module outside the
group that imports back) would live under `scripts/**`, which is not mine.

## Findings
- `src/components/shell/on-demand-notice.tsx:9`, `src/components/shell/offline-line.tsx:4`,
  `src/features/categories/category-tree.ts:11`: value imports of the `@/i18n` barrel from
  shared-shell members, the cause of INC-1193.
