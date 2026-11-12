QUESTION — housekeeping-4 part C: the admin pages' first download grows when the admin navigation leaves the entry
DONE: parts A, B (STEPS 2, 3: commits 3eaa176a8, 5ff719dcb); part C built and measured in three shapes, NOT committed
LEFT: parts C, D, E; STEPS 6–8
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `db13e13b7df1639de3f2ab44bbe0332eba28a468` (short `db13e13`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T15:46:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43247042558
FILES:
docs/features/ad-page.md
docs/features/ci-guards.md
docs/features/design-foundation.md
docs/features/legal.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-4-ruling-1.md
docs/governance/briefs/housekeeping-4.md
docs/governance/reports/housekeeping-4.stop-1.md
docs/governance/reports/housekeeping-4.stop-2.md
docs/tracking/intentional-deletions.txt
eslint.config.js
public/i18n-usage.json
roadmap.md
scripts/conformance/briefs-allowlist.txt
scripts/conformance/format-allowlist.txt
scripts/conformance/kit.ts
scripts/conformance/lint-rules.test.ts
scripts/conformance/look-values-allowlist.txt
scripts/conformance/safe-href-allowlist.txt
scripts/conformance/safe-href.test.ts
scripts/conformance/script-text.test.ts
scripts/route-budgets.mjs
src/components/ui/chart.tsx
src/features/ad-page/contact.test.ts
src/features/ad-page/contact.ts
src/features/ad-page/json-ld.test.ts
src/features/ad-page/json-ld.ts
src/features/ad-page/maps-links.ts
src/features/ad-page/share-ad.tsx
src/features/admin/legal/legal-service.ts
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
src/routes/l.$slug.tsx
src/routes/legal.$kind.tsx
src/routes/privacy.tsx
src/routes/seller-name.test.ts
src/routes/terms.tsx

The brief's TOLERANCES make "a first-download growth beyond the two new modules' named bytes" a
STOP (DEC-355), and its concern 3 says "the admin pages pay nothing new (the module was theirs)".
Built and measured, Part C holds BC-16 and the first paint, and every public page falls by about
2.0 KiB; but every admin page GROWS by 0.8 to 1.7 KiB, depending on the shape. The question is
which shape, and how the admin ceilings move. Part C's code is not committed (a commit with the
budget step red would be red); it is kept under `/tmp/ethio-scratch/housekeeping-4/part-c-wip/`
(the files, and `tracked.diff`), and the tree is Part B's commit, clean.

## What was built (ruling 1 Q5)

- `src/components/shell/admin-nav-layer.ts` (new, the entry; outside `src/features/admin/`): the
  layer's shape (`AdminNavLayer`: the rail items, the sections with path, title key, permission and
  group, the groups, the alert labels, the alerts hook); the pure resolvers `sectionAt` and
  `groupAt`; the store (`provideAdminNav`, read by `useSyncExternalStore` with the same snapshot
  on the server and the client); the hook `useAdminNav()` — the layer when a matched route
  declares `staticData.adminNav` or the active panel is the admin panel, null otherwise; and the
  `StaticDataRouteOption` declaration of `adminNav`.
- `src/features/admin/nav-layer.ts` (new, on demand): `ADMIN_NAV_LAYER`, derived from
  `sections.ts`, `rail-items.ts` and `nav-alerts.ts` (never a second list); the module hands
  itself to the store when it runs.
- `src/routes/admin.tsx`: `staticData: { strings: ["admin", "member"], adminNav: true }`; the
  layout reads its section from `ADMIN_NAV_LAYER`, so the layout's code-split chunk carries the
  layer.
- `src/features/admin/sections.ts`: `sectionForPath` and `groupForPath` delegate to `sectionAt`
  and `groupAt` (one implementation).
- `src/config/panels.ts`: the admin panel's `items` is `[]`; `rail-items.ts` is no longer imported.
- `src/components/shell/app-rail.tsx`: `MenuNav` chooses; `AdminMenuNav` runs the layer's alerts
  hook in its own component (so the hook count never changes when the layer arrives);
  `PanelMenuNav` is the former body with its items and alerts as props.
- `src/components/shell/breadcrumbs.tsx`: the admin branch resolves its section and group from the
  layer; without it the trail is Home › Admin.

Why the first paint holds: the router loads every matched route's chunk before it draws, on the
server (SSR), before the client hydrates (router-core `load-client.js` `hydrate`: the committed
matches' `loadRouteChunk` is awaited before the first client render; `beforeLoad` is not re-run
there) and before a client navigation commits. The admin layout's chunk carries the layer, whose
module fills the store as it runs, so an admin page's crumbs and rail read it in the server's HTML
and in the first client render.

## Measurements (local lock-exact builds; `node scripts/check-bundle-size.mjs`; KiB gzipped)

Against Part B's build (`size-b.log`). Shape 1 is ruling 1's model as written (the shell also loads
the layer on demand); shape 2 drops that load (see the premise below), so the layer merges into
the admin layout's chunk; shape 3 is shape 2 plus an `admin-shell` Rolldown `codeSplitting` group in
`vite.config.ts` (measured in a scratch copy only — `vite.config.ts` is outside SCOPE) gathering
`sections.ts`, the layer, `rail-items.ts`, `nav-alerts.ts` and the 14 admin-only icons.

| | shape 1 | shape 2 | shape 3 |
| --- | --- | --- | --- |
| entry `index-*.js` (Part B: 129.2) | 127.2 | 127.1 | 127.1 |
| entry JS total (Part B: 206.5) | 204.5 | 204.4 | 204.4 |
| every other non-admin page | −2.0 to −2.2 | −2.1 to −2.3 | −2.1 to −2.2 |
| `/post`, `/post_/$listingId`, `/my-listings_/$listingId_/edit` (Part B: 401.3) | −1.4 to −1.5 | −1.4 to −1.5 | +1.7 to +1.8 |
| every admin page (26) | +1.4 to +1.7 | +1.2 to +1.5 | +0.8 to +0.9 |
| `/admin` (ceiling 208) | 209.1 — over | 208.8 — over | 208.3 — over |

The cause, read from the build's chunk record (`dist/.chunk-modules.json`) and each chunk's gzipped
size (shape 1): the admin modules left the entry (−2.0 KiB inside the 129 KiB entry) and arrived
as `nav-layer-*.js` (2016 B), `sections-*.js` (646 B — its own chunk because many admin chunks
import it) and four one-icon chunks shared with other admin pages (`image` 240 B, `languages`
242 B, `shield-check` 276 B, `users` + `scale` + `plug` 418 B) — about 3.8 KiB for the same code.
Small chunks compress worse than the same code inside the entry (the svg paths of lucide's icons
share the entry's dictionary); shape 3's single admin chunk still leaves +0.8 KiB of it.

Shape 3 as measured is unsound: its `admin-shell-*.js` chunk is imported by `guide-sheet-*.js`,
`block-guide-sheet-*.js` and `category-glyphs-*.js` too (they share some of the group's icons), so
the posting pages download it (+1.7 to +1.8 KiB, the admin sections with it) and the public pages'
on-demand glyph map would fetch it. A sound group would hold only modules no non-admin chunk
imports — the icons shared with those chunks left out — which moves it back toward shape 2.

BC-16 as ruling 1 words it holds in shape 2's build: the entry's chunks (`index-*.js`,
`shared-shell-*.js`) hold no module under `src/features/admin/` but
`impersonation/impersonation-banner.tsx`, `impersonation/impersonation-service.ts` and
`impersonation/use-impersonation.ts`.

The first paint, on shape 2 (an E2E build of the tree): `bun run e2e:local -- e2e/admin-shell.spec.ts
e2e/breadcrumbs.spec.ts --project=mobile-360 --project=desktop-1280 --retries=0` → 18 passed (1.3m),
0 failed (the admin crumbs, groups, rail items and their gates). Not yet run on any shape:
`rail-first-paint.test.tsx`, the new `breadcrumbs.test.tsx` (not written), BC-16's code and its
allowlist, the public ceilings' ratchet, `bunx vitest run scripts`.

## Premises the measurement or the census proves wrong

- P7 — concern 3: "the admin pages pay nothing new (the module was theirs)". Measured: +0.8 to
  +1.7 KiB on each of the 26 admin pages, by shape (above).
- P8 — ruling 1 Q5: "the shell loads [the layer] when a matched route asks for it or the active
  panel is the admin panel". The active panel is the admin panel only under `/admin`
  (`panelOf`, `src/components/shell/menu-current.ts` :71, read by `panelAt` in `app-shell.tsx`
  :583); the stored panel choice is only ever the marketplace (`setActivePanel` has one caller,
  `use-switch-panel.ts` :34, reached for a panel without a home path or the marketplace; the admin
  panel's home path is `/admin`, so choosing it navigates there). Under `/admin` the admin layout
  matches, and its chunk — carrying the layer — is always loaded before the shell draws. The
  shell's own on-demand load therefore never has work, and it costs +0.2 KiB on every admin page
  (shape 1 against shape 2: the layer becomes a chunk of its own because of the dynamic import).
  The hook's `asked` (a matched route declares it, or the panel is admin) stays either way.

## The question

Which shape lands, and how the admin ceilings move. The options as measured:

1. Shape 2 (the layer rides the admin layout's chunk; no on-demand load in the shell), the 26
   admin ceilings raised by DEC-296's form with the cause "INC-1042: the admin navigation off the
   entry, into the admin chunks (+1.2 to +1.5 KiB)", the public ceilings ratcheted down.
2. Shape 1 (ruling 1's model as written, with the on-demand load), the admin ceilings raised by
   +1.4 to +1.7 KiB likewise.
3. Shape 3: shape 2 plus an `admin-shell` chunking group — needs `vite.config.ts` in SCOPE and the
   group's module list with its census (the shared-shell group's form: a list in
   `scripts/route-budgets.mjs`, `moduleCensus` run for it by the budget step); admin +0.8 to +0.9
   as measured, but only after the shared icons leave the group (see above), which is not yet
   measured.
4. Part C does not land this turn (the entry keeps the admin navigation; BC-16 is not met).

## Finding (beyond the task; rule 60 §13)

- F6 — `e2e/shell.spec.ts` HM-2 (:4207) and HM-3 (:4237), mobile-360, fail locally against
  ethio-staging on the unchanged base `db13e13b7` (a copy of the base tree under
  `/tmp/ethio-scratch/housekeeping-4/base/`, `e2e-base-hm.log`), on Part A's commit and on Part
  B's tree alike, and pass on CI's temporary backend (dev's run on `db13e13b7` is green): after the
  test sets `<html dir="rtl">` directly, the page is laid out left to right when the menu is read.
  `src/i18n/provider.tsx` :740's effect writes `document.documentElement.dir` from the language
  gate's rows whenever `publicLanguages` or the applied language changes, so a gate answer that
  lands after `gotoReady` undoes the test's setting. Not this turn's files; not touched.

## Scratch (the operator's to remove)

`/tmp/ethio-scratch/housekeeping-4/`: `part-c-wip/` (shape 2's files and `tracked.diff`),
`admin-nav-layer.with-load.ts` (shape 1's shell module), `variant/` (the tree copy with shape 3's
`vite.config.ts`), `base/` (the base tree copy for F6), `kit-import.mjs` (a probe: Node 22 imports
`scripts/conformance/kit.ts`, for BC-16's allowlist through `readAllowlist`), and the logs
`build-c*.log`, `size-c*.log`, `e2e-b*.log`, `e2e-a-hm.log`, `e2e-base-hm.log`, `e2e-c.log`.
