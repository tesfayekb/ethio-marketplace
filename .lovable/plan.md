# LAYOUT-1 — Page layout primitives and adoption

## Goal

Replace the inherited 384px page constraint with a reusable, responsive layout family; adopt it on Settings, posting, and admin console frames; and add the signed-in Account overview.

## Design record and census

- Copy the uploaded memo byte-for-byte to `docs/governance/layout-primitives.md` before implementation edits.
- Preserve the shell `<main>` classes unchanged.
- Record the current census accurately: 24 source files match `PAGE_MAIN_CLASS|PageCard`, not the memo’s expected 17. Separate auth-family pages, shared primitive internals, development fixtures, and actual non-auth page adopters in the completion report.
- Record the second discrepancy: current production code has no `max-w-6xl` admin-console wrapper; only development fixtures match. Apply the memo’s full-width console rule at the shared admin/table page frame rather than inventing removals.

## Build

1. Add the seven typed layout primitives under `src/components/layout/`:
   - `PageShell` with narrow/reading/wide/full widths.
   - `PageHeader` with title, description, breadcrumb slot, desktop actions, and a safe-area-aware sticky mobile action bar.
   - `ContentGrid` plus typed item spans.
   - `Section` for titled content cards.
   - `FormLayout` with responsive field spans and mobile action footer.
   - `SplitLayout` with a sticky desktop aside and stacked/collapsible mobile behavior.
   - `Toolbar`, extracted as the single search/filter/action layout used by `DataTable`.
2. Deprecate `PAGE_MAIN_CLASS`; retain `PageCard` only for the auth family and primitive internals. Convert non-auth page-level uses to the new family without changing unrelated visual components that merely compose `PageCard` internally.
3. Convert Settings to `PageShell wide`, `PageHeader`, and a 1/2/3-column `ContentGrid` of `Section`s while preserving all auth behavior and existing selectors.
4. Convert the posting wizard to `PageShell full` + `SplitLayout`: a reading-width form column, desktop step rail with completion ticks/category, and live mini-preview from step 4. Keep the existing compact mobile header and put Back/Next in `FormLayout`’s sticky mobile footer.
5. Make admin list pages use the full-width page family and route all DataTable toolbars through the extracted `Toolbar`; no per-console width rule or second toolbar implementation.
6. Add `/account` with the existing D20 client-side session gate and translated loading/error/empty states. Build profile, owner-visible listing status counts, saved, notifications, and quick-action cards from existing RLS reads only. Where no read exists, render the specified honest empty card and document the gap.
7. Point the Account panel home and Overview item to `/account`; add unique route metadata and breadcrumb behavior.

## Translation and documentation

- Add every new visible string to English and Amharic together.
- Update Settings, Posting, and new Account feature documentation.
- Append the preserved changelog line exactly as the final changelog entry.
- Regenerate both committed i18n usage maps and allow the route tree generator to add `/account`.

## Proof

- Add `e2e/layout.spec.ts` with LY-1..5 using the existing pool-user and scratch-category helpers: width at desktop, no overflow at mobile, mobile-only sticky actions, desktop-only wizard aside, and Account navigation/profile.
- Run the requested local suite on both configured projects: layout, post wizard, shell, and Settings specs.
- Run TypeScript, ESLint, hardcoded-string, translation-map, marketplace-weight, and bundle guards; run formatting last.
- Report limitations first, the exact census and memo/code differences, all new and modified files, both-project summaries, J-audit, checks, and the requested published phone/wide-screen walk.

## Explicit limits

- No migration and no dependency.
- Saved and notification cards will use existing owner reads only; absent reads remain honest translated empty states.
- No marketplace or listing-detail redesign, no My Listings page, and no shell `<main>` class change.
