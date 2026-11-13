STOP — app-fixes STEP 1 (the census): a hit the brief did not anticipate (Part A needs a file outside SCOPE) and a premise the census proves wrong (Part F's cause)
DONE: STEP 0 (brief saved, sha256 equal; roadmap line 3; briefs allowlist emptied of the speed brief's line; check-go "no finding"; draft PR #39), STEP 1 (this census)
LEFT: parts A, B, C, D, E, F; steps 2–8
CI: dev 3e3a51a (PR #38's merge) — run 43472354920, Conclusion: **SUCCESS** (ci-status.md at the root, completed 2026-11-13T17:32:45Z). This lane: run 43473208330 on 872824a4d (STEP 0's push) in progress when this was written; no branches/cursor/app-fixes/ci-status.md yet.
FILES (git diff --name-only 3e3a51a, this lane's own; against the brief's 203907b3d the list adds PR #38's 48 paths, which the brief builds on):
docs/governance/briefs/app-fixes.md
docs/governance/reports/app-fixes.stop-1.md
roadmap.md
scripts/conformance/briefs-allowlist.txt

## The two questions

**Q1 — Part A needs `scripts/bundle-closure.test.ts`, which SCOPE does not name.** BC-16
(`scripts/bundle-closure.test.ts:328`, "the real allowlist is the impersonation three") asserts the
real `scripts/conformance/entry-admin-allowlist.txt` holds exactly the three impersonation modules,
each `until INC-1116`:

- `:360` `expect([...allowances.keys()].sort()).toEqual(impersonation)` (the three paths, `:351–355`)
- `:361` `for (const allowance of allowances.values()) expect(allowance.until).toBe("INC-1116")`

and `scripts/check-bundle-size.mjs` fails a stale line of that allowlist on the real build. Part A
moves the banner's view out of the entry (law 3), so its line goes stale and must leave the
allowlist; the check and End now stay in the entry (law 4), so their lines stay. Either way BC-16's
exact list changes. The file is under `scripts/` but SCOPE names only the ceilings file there and
`scripts/conformance/`. The only way around it would be to keep a file named
`impersonation-banner.tsx` in the entry as the static half and move the view to a new name — that
bends the design around the fence, so I did not take it.
Asked: (a) `scripts/bundle-closure.test.ts` (BC-16's real-allowlist assertion only) joins SCOPE;
(b) the reason and `until` of the lines that stay (proposed: `use-impersonation.ts` and
`impersonation-service.ts`, plus `impersonation-notice.tsx` if the plain notice lives beside them —
reason "the staff-only check and End now, reachable without the banner's chunk (DEC-372)", until
`DEC-372`), since INC-1116 is FIXED by this turn.

**Q2 — Part F's cause is another (the brief: "If the cause is another, STOP with the body").** The
body of TR-30 in run 43457682073 (ci-evidence `5dca665fd`,
`branches/cursor/speed/local-backend-last-failure.md:438`):

```text
Error: pseudo text never landed for admin.translations.title

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true|true"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

`"missing"` is the test's own word for NO ROW (`e2e/admin-translations-governance.spec.ts:1313`,
`if (!data) return "missing"`), not a row with status `missing`. Read from the tree:

1. The generator lists the TARGET language's own rows: `listTranslations({ lang: PSEUDO_LANG,
   status: "all", … })` (`use-translations.ts:340`) → `admin_list_translations`, whose rows are
   `FROM ui_translations t … WHERE t.lang_code = p_lang` (migration
   `20260901234603_74ae387b…sql:90–93`).
2. A language's rows are seeded only by the key sync, `admin_sync_ui_keys`, for languages that are
   `enabled_admin` at the time of the sync (`20261031013352_e1fda8f7…sql:102–106`); the generator's
   `ensurePseudoLanguage` (`translations-service.ts:1029`) calls `admin_upsert_language` and
   `admin_set_language_flags`, which seed none.
3. On CI's clean backend `zxa` does not exist until TR-30's own press creates it, so the list is
   empty: the loop breaks at once (`use-translations.ts:347`), writes nothing, and the summary shows
   `0` written, `0` failed — no `strings-pseudo-error`, as the run shows; the probe's row never
   exists.
4. On a seeded language the list does not move under the loop: status `all` keeps every row, the
   order is `ORDER BY f.key` (`…sql:106`), and the writer upserts the row it writes
   (`admin_machine_translation_core`, `20261028233839_7aad90ab…sql:653–658`), never adding or
   removing one. Offset paging there skips nothing; the hypothesis (rows moving between pages) is
   not the cause.

The brief's laws for Part F still cure the real cause if the one keyed read is of the BASE
language's keys: `fetchAllTranslationRows(<base>)` (`translations-service.ts:1095`,
`admin_export_translations` through `readAllPages`, keyed and ordered by `key`) returns every base
key with its source text whether or not `zxa` holds a row, and the writer creates the row.
Asked: (a) confirm that fix under the corrected cause; (b) where the base language's code comes
from (K4 — no literal): `BASE_LANGUAGE` (`src/i18n/provider`, re-exported by `src/i18n/index.ts:1`)
or the languages roster's `isBase` row (`translations-service.ts:31`); (c) the orphan rule: today's
read passes `p_orphaned: false` (`listTranslations` default `orphaned = false`,
`translations-service.ts:186`, `:196`), the export reads orphaned rows too — keep only
`orphaned === false`?; (d) the summary's named keys need words on screen, and FLAGS allow new keys
for concern 1 only: may the summary reuse `admin.translations.ai.failedList` (the AI bar's list of
failed keys, `ai-bulk-bar.tsx:327`), or is a key allowed?; (e) the decisive proof: TR-30 cannot run
alone on the local proof stack from this machine (`scripts/db-proof.sh` has no browser mode and its
keys are never printed), and on ethio-staging `zxa` already exists from earlier runs, so the run
there would not show this cause. Proposed instead: the generator's unit test red-first on the old
code (an empty target list writes nothing), and CI's serial lane with `@global-state` back
(INC-1135's re-entry) as the backend proof.

## The census (STEP 1, by key word)

### consumers

Concern 1 — `rg -n "ImpersonationBanner|useActiveImpersonation|getActiveImpersonation" src e2e`:

- `src/components/app-shell.tsx:44` import; `:928` `<ImpersonationBanner enabled />` for every
  signed-in person — bypasses (the defect: no staff gate)
- `src/features/admin/impersonation/impersonation-banner.tsx:15`, `:17`, `:58` — the mechanism
- `src/features/admin/impersonation/use-impersonation.ts:11`, `:23`, `:29` — the mechanism
- `src/features/admin/impersonation/impersonation-service.ts:67` — the door call
- `src/features/admin/impersonation/impersonation-view.tsx:24`, `:64` — uses (the admin view's own
  read, an admin page; unchanged)

Concern 2 — `rg -n "location\.reload\(|reloadOnStaleChunk|hearLeaving" src`:

- `src/lib/stale-chunk.ts:62`, `:87`, `:94`, `:99`, `:113` — the mechanism
- `src/routes/__root.tsx:4`, `:442` — the install
- `src/lib/stale-chunk.test.ts` (STC-1 → STC-6) — its tests
- `src/lib/error-page.ts:71` — the error page's own button (an allowlist line)
- `src/lib/on-demand-failure.ts:60` — `refreshPage`, the on-demand notice's cure (an allowlist line)
- `src/components/marketplace/feed.tsx:206` — the feed's retry button, `window.location.reload()`
  — NOT named by the brief; a third allowlist line (`refreshPage` is the shared cure; moving the feed
  onto it is outside SCOPE — K2)
- outside the repository: `@tanstack/react-router` 1.170.41
  `dist/esm/lazyRouteComponent.js` — reloads in render when `isModuleNotFoundError(error)` and
  `sessionStorage["tanstack_router_reload:" + error.message]` is unset — bypasses

Concern 3 — `rg -n "DialogContent|SheetContent|AlertDialogContent|PopoverContent" src --glob '!*.test.*'`
(38 files; the panels by file, before the change):

- returns the focus by a library trigger: `src/features/ad-page/report-ad.tsx` (DialogTrigger),
  `src/components/shell/toolbar-panel.tsx` (PopoverTrigger, SheetTrigger),
  `src/components/shell/block-guide.tsx` → `guide-sheet.tsx` (SheetTrigger), `src/routes/dev.style.tsx`
  (all three triggers)
- returns the focus by its own handler: `src/components/shell/guide-sheet.tsx:84` (the landing
  frame or `returnFocusTo`; falls through to the library when it has neither)
- returns the focus by `screenSized` (`dialog.tsx:141`): `src/features/posting/map/map-pin-dropper.tsx`,
  `src/features/posting/preview/photo-gallery.tsx`, `src/features/posting/preview/preview-sheet.tsx`
- does not (opened from state, no trigger, smaller than the screen): `share-ad.tsx`,
  `category-dialogs.tsx`, `legal-page.tsx`, `legal-publish-dialog.tsx`, `step-up-dialog.tsx`,
  `promote-sheet.tsx`, `background-dialog.tsx`, `photo-editor.tsx`, `listing-detail.tsx` (×2) —
  DialogContent; `name-checks.tsx`, `screening-page.tsx`, `legal-editor-form.tsx`, `ai-bulk-bar.tsx`,
  `approve-bar.tsx`, `delete-language-dialog.tsx`, `pseudo-bar.tsx`, `certify-confirm.tsx`,
  `my-listing-page.tsx`, `my-listings-page.tsx`, `category-move-dialog.tsx`,
  `src/routes/admin.listings_.$listingId_.edit.tsx` — AlertDialogContent; `history-drawer.tsx` —
  SheetContent
- the primitives themselves: `ui/dialog.tsx`, `ui/sheet.tsx`, `ui/alert-dialog.tsx`,
  `ui/dialog-primitive.tsx`, `ui/alert-dialog-primitive.tsx`, `ui/popover.tsx`,
  `ui/popover-impl.tsx`; `src/components/layout/layers.ts` (a comment)

Concern 4 — every picture through `src/components/ui/picture.tsx` (CF-PICTURE-1 → 3); one place.

Concern 5 — `rg -n "count_listing_view|countAdView" src`: `src/routes/api/listings/view.ts:30–31`
(the route) → `src/server/ad-view.ts:22`, `:40` (the door call, logs any error at `:49`);
`src/server/ad-view.test.ts` (VW-1 → VW-5); `src/integrations/supabase/types.ts:5588` (generated).

Concern 6 — `rg -n "offset" src/features/admin/translations` and `rg -n "readAllPages" src`:

- `use-translations.ts:334–364` — the generator: positional, writing — bypasses
- `ai-bulk-bar.tsx:122–137`, `:144–165` — positional READS, but each collects every page before any
  write (`run`, `:170`), so it does not write into the list it pages — bypasses the data-API law
  for a read; LEFT (K2) with a roadmap line, outside this defect's class
- `data-scope.tsx:124`, `strings-page.tsx:157`, `languages-page.tsx:580` — a console's page (one
  page shown, the DataTable's paging), not a loop
- `translations-service.ts:194`, `:662` — the list doors' offset parameter
- readAllPages users: `attributes-service.ts`, `categories-service.ts`, `locations-service.ts`,
  `translations-service.ts` (the export), `level-table-read.ts`, `src/routes/api/categories.tree.ts`

### definition

- Concern 1: the definition is "code that runs the active-session check or draws its notice" — the
  grep finds all of it; no difference.
- Concern 2: "every reload of the page" — the grep adds `feed.tsx:206`, which the brief's named
  sites leave out; outside the repository, the router library's.
- Concern 3: "every overlay that takes the focus" — the grep misses
  `src/components/shell/app-rail.tsx:1103–1152` (the phone menu, `DialogPrimitive.Content` by
  name): it returns the focus by its own `onCloseAutoFocus` to the ☰ (`[aria-controls="rail-menu"]`)
  — returns the focus; unchanged. DropdownMenu and Tooltip have library triggers (always asChild,
  DEC-259) — not changed.
- Concern 5: the definition adds the browser caller `src/features/ad-page/count-view.ts:22–31`
  (`callRoute("/api/listings/view")`, every answer ignored: "a counter never disturbs the page").
- Concern 6: "a loop that pages by position while it writes" across `src/`: only the generator.
  Other positional door calls (`impersonation-service.ts:103`, `my-listings.ts:251`,
  `admin-users-service.ts:86`, `audit-service.ts:62`, `use-screening.ts:178` `.range(`) serve one
  page of a table, not a write loop.

### tests

- Concern 1: no `src/components/app-shell.test.tsx` exists (the brief's "the shell's own test file");
  proposed: the gate as a pure function in `src/components/shell/impersonation-gate.ts` with its
  census in `src/components/shell/impersonation-gate.test.ts` (ids `IMPG-1…`, free). Browser: IMP-1,
  IMP-2, IMP-3, IMP-5 in `e2e/admin-audit.spec.ts` (7 tests; IMP-4 is gone, `:315`); IMP-6 is free.
  `e2e/i18n-sign-in-language.spec.ts:192–193` presses `impersonation-banner-end`.
- Concern 2: `src/lib/stale-chunk.test.ts` STC-1 → STC-6; CF-STALE-1 is free
  (`rg -n "CF-STALE-" scripts src` finds none).
- Concern 3: `src/components/ui/dialog-opener.test.tsx` DO-1 → DO-5 (next DO-6);
  `e2e/dialogs.spec.ts` (7 tests) DLG-E7, DLG-E8 (DLG-E4 in `e2e/overlays.spec.ts`); DLG-E9 is free.
- Concern 4: `src/components/ui/picture.test.tsx` PIC-1 → PIC-5 (next PIC-6).
- Concern 5: `src/routes/api/listings/view.test.ts` VWR-1, VWR-2 (next VWR-3);
  `src/server/ad-view.test.ts` VW-1 → VW-5.
- Concern 6: the generator has no unit test today (`usePseudoGenerate` is in no test file);
  `pseudo.test.ts` tests the transform; `translations-service.test.ts` TRS-*. `TR-30` at
  `e2e/admin-translations-governance.spec.ts:1267`.

### lists

- `scripts/conformance/entry-admin-allowlist.txt` — the three impersonation lines, until INC-1116;
  BC-16 in `scripts/bundle-closure.test.ts:328–363` asserts the exact three (Q1).
- `scripts/conformance/on-demand-failure-allowlist.txt` / `on-demand-failure.test.ts` (ODC-*): a new
  `resilientLazy` caller (the banner) is judged by ODC's census; the fallback is the plain notice, so
  the caller reports through `reportOnDemandFailure` (resilientLazy's default) or `inPlace`.
- `scripts/conformance/wired.test.ts` — CF-STALE-1's caller joins it.
- `scripts/conformance/lanes-allowlist.txt` — the `@global-state` line (INC-1135), Part F's re-entry.
- `scripts/route-budgets.mjs` / `scripts/check-bundle-size.mjs` — the ceilings; the entry is at
  204.5 / 205 KiB (below).
- `scripts/check-identity-tags.sh:25` — `impersonation-banner-end` is a mutating token (the test id
  must stay).
- `scripts/check-browse-imports.sh`, `scripts/check-marketplace-imports.mjs` — read `app-shell`'s
  imports (the RBAC seam stays off the marketplace path: the gate reads the shell's permission state,
  never `features/permissions`).
- `scripts/conformance/non-null-allowlist.txt` names `app-shell.tsx` (its count only falls).
- strings: zero new keys proposed for concern 1 — the plain notice reuses `impersonation.banner`,
  `impersonation.unknownTarget`, `impersonation.endNow` (`en-base.ts:455–458`, `am-base.ts:429–432`,
  the base layer, so any page can draw them); `docs/generated/i18n-usage.json` and
  `public/i18n-usage.json` follow any `t(` change.
- the register `docs/governance/mechanisms.md` — rows to §14 only (DEC-346).

### old-file-readers

- Concern 1: `app-shell.tsx:922–927` (the comment: "pinned to `true` while mounted");
  `impersonation-banner.tsx:7–14`; `use-impersonation.ts:18–22`;
  `docs/features/admin-audit-security.md`, `docs/features/admin-shell.md`,
  `docs/features/performance-strategy.md`; the allowlist's reasons.
- Concern 2: `stale-chunk.ts:1–32`; `docs/features/performance-strategy.md`,
  `docs/features/e2e-harness.md`, `docs/features/my-listings.md`.
- Concern 3: `dialog.tsx:138–141` ("a screen-sized surface … gives it back to what held it");
  `docs/features/design-foundation.md`, `docs/features/e2e-harness.md`.
- Concern 4: `picture.tsx:13–14`; `docs/features/design-foundation.md`, `docs/features/posting.md`.
- Concern 5: `ad-view.ts:16–21`; `docs/features/ad-page.md`, `docs/features/routes.md`.
- Concern 6: `use-translations.ts:316–323` ("read page by page through the ordinary list RPC");
  `docs/features/translations.md`, `docs/features/ci-local-backend.md` (the serial lane's note).

### second-readers

- the banner's test ids `impersonation-banner`, `-open`, `-end`: `e2e/admin-audit.spec.ts:224`,
  `:244`, `:246–247`, `:269`; `e2e/i18n-sign-in-language.spec.ts:192–193`;
  `scripts/check-identity-tags.sh:25`. The plain notice would carry `impersonation-banner` and
  `impersonation-banner-end` too, so the specs read either.
- the dialog's close handler: `guide-sheet.tsx:84` (an owner's handler), `app-rail.tsx:1149` (its
  own Content, not the shared one).
- the generator's summary `{ written, failed, total }`: `pseudo-bar.tsx:55–60`, `:114–118`
  (`strings-pseudo-summary`, `strings-pseudo-error`, read by TR-30).
- the view route's answer: `count-view.ts:22–31` (ignores it); `e2e/ad-page.spec.ts:228–240`,
  `:282–290` (a refused and an unknown id), `:653`, `:706` (waits for the POST).

### chunk-graph

This machine's build of 3e3a51a (`bun install --frozen-lockfile`, `bun run build`,
`dist/.chunk-modules.json`): `impersonation-banner.tsx`, `impersonation-service.ts` and
`use-impersonation.ts` are all in `index-_uRdNbI_.js`, the entry — every page downloads them;
`check-bundle-size`: "Admin code in the entry's closure: 3 module(s), each allowlisted (BC-16)".
After (proposed): `impersonation-banner.tsx` in its own on-demand chunk, fetched only by a staff
page with an active session; the hook, the two door calls and the plain notice stay in the entry.

### environments

- The permission read's failure: `usePermissions` returns `{ permissions, loading, error, has }`
  (`src/features/permissions/usePermissions.ts`); the shell's `PermissionsLoader`
  (`app-shell.tsx:87–97`) passes on only `permissions` and `loading` — it gains `failed`
  (`error !== null`). `loading` is `query.isLoading`; the shell's state starts `{ [], false }`, so
  the gate is off until the read settles for staff or fails.
- TR-30 alone: not on the local proof stack from this machine (Q2 e); on ethio-staging it runs by
  id (the E2E values are set; Docker answers outside the sandbox).
- The focus proof: jsdom for DO-*; DLG-E9 in `mobile-360`, `desktop-1280` and, tagged `@webkit`,
  `webkit-1280`, `webkit-390`.

### mechanisms (each read whole)

- `usePermissions` — read; the failure is `error`.
- `resilientLazy` — a failed download resolves to the caller's fallback component with the same
  props, reported or `inPlace`; the plain notice is that fallback (and the Suspense fallback while
  the chunk loads).
- `stale-chunk.ts` — `vite:preloadError` with the leaving mark. The seam question is answered NO:
  the code-splitter hard-wires `lazyRouteComponent` from `@tanstack/react-router`
  (`@tanstack/router-plugin` 1.168.42 `code-splitter/framework-options.js`, idents fixed; its options
  are `splitBehavior`, `defaultBehavior`, `deleteNodes`, `addHmr` — `core/config.js`); `createRouter`
  has no option the Lazy component reads before it reloads; and preventing Vite's event while
  leaving hands the library an undefined module (`__vitePreload`'s `handlePreloadError` returns
  undefined), a TypeError and the route's error page for a leave that did not happen. The only ways
  are a package patch, a dependency change, or writing `tanstack_router_reload:<message>` — Part B
  builds CF-STALE-1 only; INC-1128 stays OPEN for a package turn.
- `dialog.tsx` — `openerOf` and `onCloseAutoFocus`; Radix's modal content always prevents the
  close event and focuses `triggerRef.current` (`@radix-ui/react-dialog` `dist/index.mjs:146–148`);
  a trigger carries `aria-controls` = the content's `id` (`:70`, `:224`) — the test for "a library
  trigger of its own".
- `picture.tsx` — the failed and absent states draw `ImageOff` `aria-hidden` and drop `alt`. Proposed
  (DECIDE): the image role and label go on the empty-state box that fills the frame, not the frame
  itself, since an outer `role="img"` would make the caller's children (a ribbon, a badge)
  presentational.
- `read-all-pages.ts` — keyset by a unique key; throws on a failed page and on no progress.

### first-download

The before table is this machine's `node scripts/check-bundle-size.mjs` on 3e3a51a's build: entry JS
204.5 / 205 KiB, CSS 22.6 / 40; every page within its ceiling (e.g. `/` 226.1 / 227, `/l/$slug`
256.5 / 257, `/account` 266.8 / 268, `/admin/translations` 302.1 / 303). The full list is in the
report at the close. The entry has 0.5 KiB of room: the gate and the plain notice are new entry
code, and the banner's view leaves it.

### premises

1. Concern 6's HYPOTHESIS is wrong (Q2): the list does not move under the loop; the target
   language's rows do not exist on a clean backend.
2. "the shell's own test file": none exists (proposed above).
3. Concern 2's sites: three, not two (`feed.tsx:206`).
4. The brief's Base `203907b3d`: the lane starts at `3e3a51a` (PR #38's merge, as the brief says);
   the in-scope files PR #38 changed (`.github/workflows/local-backend-proof.yml`,
   `scripts/conformance/lanes-allowlist.txt`, `scripts/conformance/wired.test.ts`) match the brief's
   anchors (the serial lane's `--grep "@a11y" --workers=1` at `local-backend-proof.yml:795`).

### findings (rule 60 §13; none is a security hole)

- `src/components/marketplace/feed.tsx:206` — a plain page reload beside the shared cure
  (`refreshPage`, `on-demand-failure.ts:59`).
- `src/features/admin/translations/ai-bulk-bar.tsx:122–165` — positional reads of a list (the
  data-API law), not a write loop.
- `src/features/admin/translations/use-translations.ts:385` — `fetch("/i18n-usage.json")`, a bare
  fetch of a static asset (rule 10's "no fetch elsewhere"), outside this turn's concerns.
