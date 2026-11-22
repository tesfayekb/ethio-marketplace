STOP — cursor-bundle-3 STEP 1: the census (PLAN FIRST)
DONE: STEP 0 (the brief saved by scripted copy, sha256 equal; roadmap line 3; check-go no finding), STEP 1 (the census, below)
LEFT: STEPS 2–8 (Parts 1–4, the records part)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `9d9748da37bdacda648d3f1a9888bf831dab8b07` (short `9d9748d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-22T10:44:50Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45013403588
FILES:
docs/governance/briefs/cursor-bundle-3.md
docs/governance/reports/cursor-bundle-3.stop-1.md
roadmap.md

The questions the supervisor's ruling answers are at the end (Q1–Q9). Q1 and Q2 are the STOP the
brief's TOLERANCES name: under one reading each, a new law finds a file of Lovable's lane at the
base.

## STEP 0

- Branch `cursor/bundle-3` from `origin/dev` = `9d9748da37bdacda648d3f1a9888bf831dab8b07` = the
  brief's base. `git status --short` was empty before the switch. BASE = HEAD, so no file
  changed between them.
- The brief arrived as `~/Downloads/cursor-bundle-3/cursor-bundle-3.md` and was copied with
  `cp`. `shasum -a 256` of the saved file is
  `859ebdb248296a81cbd25ff45c69e5676a733f2a3c33679d61baff4930a047c1`, equal to the carrier
  message's value, and `cmp` with the attachment is identical. It is saved byte for byte
  without a fence, as `cursor-bundle-2.md` was, because the brief says "byte for byte" and the
  carrier's sha256 is the file's own. Rule 00 step 2 and the go-template's STEP 0 say "one
  fenced block"; that difference is named here, not resolved by me.
- `roadmap.md` line 3 names the brief and keeps the rest of the line as "Previous: …".
  `bunx prettier --check roadmap.md` is clean.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-3.md`:

```text
[check-go] no finding
```

- `bunx vitest run scripts/conformance/briefs.test.ts`: 16 passed. Commit `ff66cd5bf
  cursor-bundle-3: task saved`.
- `scripts/conformance/briefs-allowlist.txt` holds no line, so the go-template's STEP 0 removal
  had nothing to remove.

## How the census was read

- The base is `9d9748da3`. Lovable's head is `origin/lovable/next` =
  `f1a5c10a8dadfc84d6022da027bb830d599aeb9b`, two commits on the base:
  - `ee7249846` Bundle 3 turn 1 (Part A, INC-1238);
  - `f1a5c10a8` the platform's plan note.
- Its diff from the base touches 21 files: `src/components/shell/` (6), eight table pages and
  their hooks, `src/components/app-shell.tsx`, `src/test/setup.ts`, and the two i18n usage maps.
- Every new law was run as a scratch census over a `git archive` of each head. The scripts and
  their outputs are in `/tmp/ethio-scratch/cursor-bundle-3/` (the operator's to remove):
  - `closure.ts`: the value-import closure of `overlays-impl.ts`;
  - `panels.ts`: DG-9, DG-10 and DG-11 within one file;
  - `wrappers.ts`: the panel wrappers' call sites;
  - `dropped.ts` and `dropped-wide.ts`: concern 3.
- Each is a floor: the findings below were then read by hand, file by file.

## The census items

- **consumers** (concern 1, by its definition: every file that draws a dialog, an alert dialog, a
  sheet, the staff shell or a table panel).
  - 52 non-test `.tsx` files under `src/` draw `DialogContent`, `AlertDialogContent`,
    `SheetContent` or `CategoryModal`.
  - 28 files draw `PanelBody` (27 consumers and the parts' own test), the same 28 at both heads.
  - 37 `CategoryModal` calls and 2 `ToolbarPanel` calls (`columns-button.tsx:55`,
    `filter-chips.tsx:93`). Every one passes `description` and `footer`, at both heads.
  - Every consumer of the anatomy takes the thin parts from `dialog-parts-facade.tsx`. The real
    `dialog-parts.tsx` is reached by value only by `overlays-impl.ts:17` and its own unit test
    (CF-OV-8, below).
  - Concern 2: the workflow `.github/workflows/lovable-branch-guard.yml:44` pipes the files API
    into the guard; `scripts/conformance/wired.test.ts:269-274` holds that call.
  - Readers of `scripts/check-bundle-size.mjs`:
    - `ci.yml:415` runs it;
    - `scripts/ci/turn-checks.ts:355,546` reads its printed sizes;
    - `turn-checks.test.ts:407`, `card-tiers.test.ts:320`, `budget-band.test.ts:50` and
      `wired.test.ts:291,298` read its text;
    - `lovable-branch-guard.test.ts:130` names it as a refused path;
    - `kit-adoption-allowlist.txt:10` names it.
  - Concern 3: 162 reads, below under dropped-errors.
- **definition**:
  - Concern 1 by its definition, not the COUNT: a panel is a modal content part (`DialogContent`,
    `AlertDialogContent`, `SheetContent`), a wrapper that draws one (`CategoryModal`,
    `ToolbarPanel`) or `PopoverContent variant="panel"`.
  - What a panel holds can be drawn in another file: a child component or a helper function in
    the same file. That is why DG-10 and DG-11 have two readings (Q1, Q2).
  - Concern 3 by its definition counts 162. A `const { data } =` pattern alone finds 107; the
    rest are `(await …).data` (25) and a held answer whose `.data` is read and `.error` never is
    (30).
- **tests**:
  - concern 1: `scripts/conformance/dialogs.test.ts` (CF-DIALOG-1, DG-1…7) and
    `scripts/conformance/overlays.test.ts` (CF-OV-1…6);
  - Part 3: `src/features/auth/mfa/step-up-dialog.test.tsx` (SUD-1, SUD-2), `step-up-gate.test.tsx`,
    `step-up-gate-offline.test.tsx` and `e2e/mfa-stepup.spec.ts` (MF-*);
  - concern 2: `scripts/ci/lovable-branch-guard.test.ts` (CF-LVB-1…14);
  - concern 3: `scripts/conformance/e2e-helpers.test.ts` (CF-HELPERS-1…9) and the
    `e2e/admin-categories-console.spec.ts` tests over its three sites.
- **lists**:
  - `scripts/conformance/dialogs-allowlist.txt`: empty; key `<file>#<rule>`.
  - `overlays.test.ts` `MAY_REACH`: CF-OV-8 adds `./dialog-parts` → `overlays-impl.ts`, or its own
    table.
  - `scripts/conformance/e2e-helpers-allowlist.txt`: 23 `project-name` lines today; its header
    names CF-HELPERS-1 → 3 and gains CF-HELPERS-10.
  - `wired.test.ts:282-283` (dialogs) and `:418-421` (e2e-helpers): their comments name the
    laws by number, and each new law extends its file.
  - `scripts/test-ids.test.ts` (TI-1): DG-8…11, CF-OV-7/8, CF-LVB-17/18 and CF-HELPERS-10 are
    free (check-go's law; `rg` agrees). DG-7 is taken.
  - The exact assertions over the guard's text:
    - `lovable-branch-guard.test.ts` CF-LVB-1's table row `:130`
      `["scripts/check-bundle-size.mjs", "scripts/** — the guards and tools (DEC-386"]` with the
      default patch `-a/+b`. Under DEC-425 that file is judged by content, so the row's expected
      text changes: Part 2 moves the row's case into CF-LVB-18 and names it.
    - `:373` and `:378` pin `rule_for`'s `scripts/*` text ("the two exceptions: a ceiling line,
      DEC-390; a removed allowlist line, DEC-396"). It stays unchanged unless the ruling wants
      DEC-425 named there (Q6).
  - Register rows 88 and 89 and the branch guard's row are the records part's.
  - `docs/features/ci-guards.md:1364` says "CF-LVB-1…14", and `design-foundation.md` holds the
    exceptions and the step-up line (Q7).
- **old-file-readers**: not applicable. No file or name moves or is renamed.
- **second-readers**: `step-up-dialog.test.tsx:12-22` mocks `@/components/ui/dialog` with six
  names. After Part 3 the dialog takes `PanelHeader`, `PanelBody` and `PanelFooter` from the
  facade, so the mock changes shape. That is named in the report with SUD-1 and SUD-2, and their
  assertions stay byte for byte. No `loadOnce` or dynamic `import()` reads a moved export.
  `step-up-gate.tsx:16-17` (`resilientLazy` over `import("./step-up-dialog")`) is unchanged.
- **chunk-graph**: no module moves. The entry's closure is unchanged by Part 3.
  `step-up-dialog.tsx` is on demand, and `dialog-parts-facade` is already its own chunk for the
  27 consumers. The gate's preload list for that import may gain the facade chunk's name on
  the 24 files' pages that draw `StepUpGate`; STEP 6 measures it. Parts 1, 2 and 4 change no
  `src/` file.
- **environments**: not applicable. No build option changes.
- **mechanisms** (read before any proposal):
  - `dialog-parts.tsx:117` `PanelBody`, with its `fill`, `flush` and `end` forms at :156-174;
  - `dialog-parts-look.ts:14` `BANDS_BODY`, :22 `BANDS_FILL` (holds `flex-1`, the fill form's,
    by design) and :24 `BANDS_END`;
  - `dialog-parts-facade.tsx` (the thin parts; `PanelBody` hands in `dialog.moreBelow`);
  - `overlays-impl.ts:17` `dialogParts`;
  - `dialog-rules.ts` and `dialog-opener.ts`, unread by the laws (their lens);
  - `category-modal.tsx:70` (`end={footer === undefined}`);
  - `toolbar-panel.tsx:74` (`end={isMobile && foot === null}`);
  - `dialog.tsx:66-69` (`layer`, INC-124) and `:72-74` (`bands`);
  - `overlays.test.ts` `overlayReaches` and `kit.ts` `readAllowlist` (an INC id as "until" has
    no date check, `:118`);
  - `lovable-branch-guard.sh:46-48` (`CEILINGS`, `CEILING_LINE`) and `exception_refusal`
    `:135-163`.
- **first-download** — before, from a lock-exact local build of the tree STEP 0 left
  (`bun install --frozen-lockfile`: no changes; `bun run build`; `node
  scripts/check-bundle-size.mjs`: "Bundle budget OK"):
  - JS 201.5 / 203 KiB; CSS 22.6 / 23 KiB.
  - The least room to a ceiling: CSS 0.4; `/admin/screening` 346.5 / 347 and `/auth_/reset`
    212.5 / 213 (0.5 each); `/dev/style` 259.4 / 260 (0.6); `/admin/audit` 292.3 / 293 and
    `/admin/locations` 267.3 / 268 (0.7).
  - No page sits inside the 0.3 KiB band today. The whole table is in `size.log` in the
    scratch folder.
  - After: STEP 6. Only Part 3 touches `src/`, and only an on-demand chunk; a growth on the
    gate's pages would be the preload list's (chunk-graph).
- **premises** — each premise found wrong or needing a ruling:
  1. "LEFT: nothing known" (concern 1). `docs/features/design-foundation.md:642-652` ("Cursor-owned
     completion") also queues these laws for this guard turn, which the six laws do not cover:
     held-only subjects with the Screening picture exception; red-focus safety; list-first
     Escape; empty-body omission. See queued and Q8.
  2. "none are expected" at the base. DG-9, DG-10 and DG-11 find files at the base: laws-at-base
     below.
  3. `src/test/setup.ts` :74 `loadOverlays` holds at both heads. Lovable's head changes
     `src/test/setup.ts`, but not line 74's call.
  4. Every cited anchor holds at the base: `BANDS_BODY` :14, `BANDS_END` :24, `PanelBody` :117,
     `dialogParts` :17, `CEILINGS` :46, `css` :69, `secondaryParentNames` :74, `DialogContent`
     :69, `DialogFooter` :118.
  5. INC-1245 has no allowlist line or test keyed to it today.
- **callee-codes**: not applicable. No door changes.
- **findings** (beyond the task, file:line):
  - `e2e/admin-categories-console.spec.ts:352` reads `id!`, a non-null assertion beside a covered
    site. CF-NN-1 counts it. Part 4's fix of `:349` keeps it unless the ruling says otherwise.
  - `src/components/shell/app-rail.tsx:1117` carries `aria-describedby={undefined}` without the
    `// Description exception:` mark. It is the non-modal phone menu (`modal={false}`), outside
    the panels by DG-1's own rule; DG-11 skips it on the same rule.
- **queued**:
  - `design-foundation.md:567-568` and `:644` ("The step-up dialog stays on its old frame until
    Cursor migrates it"): built here, Part 3.
  - `:645-650`, the law list: thin-only imports (CF-OV-8), no provider/door/query in the
    on-demand implementation (CF-OV-7), body-only scrolling and the cue (DG-8, DG-10), the last
    band's inset (DG-9) and the description exceptions (DG-11) are built here. Held-only subjects,
    red-focus safety, list-first Escape and empty-body omission are LEFT, unnamed by the brief
    (Q8).
  - `:651` ("the supervisor proves the static-closure law from each build's chunk record") is
    replaced by CF-OV-8 once it lands.
  - `cursor-bundle-2.md:19` ("the dialog guard's new laws (after Lovable's bundle 2 is merged)"):
    built here.

## laws-at-base and laws-at-lovable

Each law below gives the form I propose, what it reads, its planted bypass, and its findings at
the base (`9d9748da3`) and at Lovable's head (`f1a5c10a8`).

- **CF-OV-7** (`overlays.test.ts`).
  - Form: the value-import closure of `src/components/ui/overlays-impl.ts`. It follows `import`
    and `export … from` that are not type-only, resolves `@/` and relative paths, and leaves
    packages outside. No module in it may import `@/i18n` (or anything under `src/i18n/`), a door
    or a query module.
  - A door is `src/lib/supabase-door.ts`, `src/lib/route-client.ts`, `src/integrations/supabase/**`,
    `src/server/**` or a `*-service.ts`; a query module is `@tanstack/react-query` or a module
    that reaches it.
  - Planted: a module in the closure (a planted `dialog-parts.tsx` under a temp root) importing
    `@/i18n`, another importing `@/lib/supabase-door`, and a third `@tanstack/react-query`; a
    type-only import of `@/i18n` passes.
  - Base: 21 modules in the closure, no finding. Lovable: the same 21, no finding.
- **CF-OV-8** (`overlays.test.ts`).
  - Form: `src/components/ui/dialog-parts.tsx` is reached by value (`import`, `export … from`,
    `import()`) only by `overlays-impl.ts`. Type-only reaches pass. It reads `src`, `e2e` and
    `scripts`, as CF-OV-1 does.
  - Planted: a page importing `{ PanelBody } from "@/components/ui/dialog-parts"`, a primitive
    importing it relatively, and a dynamic `import()`. `import type * as Parts` passes.
  - Base and Lovable: one value reach beyond `overlays-impl.ts:17`, the parts' own unit test
    `src/components/ui/dialog-parts.test.tsx:16-24` (Q3). `dialog-parts-facade.tsx:4` and
    `category-modal-demand.test.tsx:7` are type-only and pass.
- **DG-8** (`dialogs.test.ts`).
  - Form: `dialog-parts-look.ts`'s `BANDS_BODY` holds `relative`, `grow`, `min-h-0` and
    `overflow-y-auto`, and not `flex-1`. `BANDS_BODY` is read only by `dialog-parts.tsx`'s
    `PanelBody`, so no other element of `src/` carries the body's form. `BANDS_FILL` (the `fill`
    form, `flex-1` by design) is outside it.
  - Planted: `BANDS_BODY` with `flex-1`, one without `relative`, and a second file reading
    `BANDS_BODY`.
  - Base and Lovable: no finding. `BANDS_BODY` is read only at `dialog-parts.tsx:172`.
- **DG-9** (`dialogs.test.ts`).
  - Form: every `<PanelBody>` among its parent's element children (through fragments,
    conditionals and `&&`). When no footer part (`PanelFooter`, `DialogFooter`,
    `AlertDialogFooter`, `SheetFooter`) follows it, it carries an `end` attribute. An expression
    (`end={footer === undefined}`) counts as carried. A body held in a variable
    (`toolbar-panel.tsx:74`) is judged where it is written: there it carries `end`.
  - Planted: a body with no footer and no `end` fails; the same with `end`, and one followed by
    a footer, pass.
  - Base: one finding, `src/features/posting/preview/listing-detail.tsx:1319`, the enlarged map's
    `<PanelBody fill>` with no footer and no `end`. It is outside my scope and outside Lovable's
    lane (Q4). Lovable: the same one.
- **DG-10** (`dialogs.test.ts`). A scroller is a class list holding
  `overflow(-x|-y)?-(auto|scroll)`. `LIST_SCROLLER` (`menu-row.ts:102`, the pickers' shared list
  popup: `filter-select.tsx:187`, `phone-number-field.tsx:307`, `step-pricing.tsx:509`) is not a
  scroller of its own by the brief. Two readings find different files (Q1):
  - (a) within one file, inside a panel's JSX: base `photo-gallery.tsx:443-452` (the viewer's
    thumbnail strip, `overflow-x-auto`, horizontal). Vertical only: nothing.
  - (b) by definition, rendered inside a panel from another file:
    - `src/features/admin-categories/category-form-fields.tsx:396`: vertical, `max-h-48
      overflow-y-auto`, inside `CategoryModal` at `category-dialogs.tsx:275-390`;
    - `src/features/posting/preview/photo-gallery.tsx:245`: horizontal on a phone, vertical from
      32rem, inside the preview sheet through `ListingDetail`;
    - `src/features/posting/preview/listing-detail.tsx:1098`: the section bar, horizontal;
    - and (a)'s `:452`.
  - Read and not inside a panel: `legal-text.tsx:101` (its two staff sites draw it outside the
    dialogs of their files), `languages-page.tsx:1042` and `language-picker.tsx:86` (an inline
    form), and `step-category.tsx:437`.
  - Planted: a `div` with `max-h-48 overflow-y-auto` inside a `DialogContent` fails;
    `LIST_SCROLLER` passes; the same outside a panel passes.
  - Lovable: the same findings; none is in its lane.
- **DG-11** (`dialogs.test.ts`).
  - Form: a panel has a description: a `DialogDescription`, `AlertDialogDescription`,
    `SheetDescription` or `<NS.Description>`; a wrapper call's `description=`; or the marked
    exception (`aria-describedby={undefined}` under a `// Description exception: <why>` line, at
    the four the feature doc names, `design-foundation.md:633-637`).
  - The marked four are `guide-sheet.tsx:84-85`, `preview-sheet.tsx:52-53`,
    `photo-gallery.tsx:380-381` and `listing-detail.tsx:1310-1311`.
  - Non-modal content (`modal={false}`) is skipped, as DG-1 skips it. Two readings (Q2):
    - (a) per panel element, within its file's JSX:
      - `src/components/shell/toolbar-panel.tsx:104`: `PopoverContent variant="panel"` draws its
        description as a `<p>` (:112-114), not a Description part. That is a file of Lovable's
        lane.
      - `src/routes/dev.style.tsx:926`, `:941`, `:959`: three specimens with no description.
      - `src/features/posting/map/map-pin-dropper.tsx:112` is a false positive of this reading:
        its description is drawn at `:370` in the body function the panel renders.
    - (b) per file: a file drawing a title part draws a description part or carries the mark.
      No finding.
  - Planted: a `DialogContent` with a title and no description fails; one with
    `aria-describedby={undefined}` and no mark fails; the marked form passes.
  - Lovable: the same as the base.
- **CF-LVB-17 and CF-LVB-18** (concern 2, `lovable-branch-guard.sh` and its test).
  - Form: `scripts/check-bundle-size.mjs` joins the exception files. Its changed lines must be
    exactly:
    - one `-  css: <n>,` and one `+  css: <m>,`;
    - at most one added comment line in DEC-296's form: `^  // DEC-296 \(.+\): .*CSS (local|CI)
      [0-9.]+ KiB.*; [0-9]+ → [0-9]+ = ceilingFor(Local)?\([0-9.]+\); was [0-9]+\.$`, with
      `<m>` and the `was` value agreeing with the `css` lines.
  - Any other changed line refuses, and so does the same line in another form (`css: 24, //`, a
    removed comment, a second comment, a changed `js:`).
  - Placement: the added comment's new-side line number, from its hunk header, falls between
    `const BUDGET_KIB = {` and the `js:` line of the base checkout's own file. A patchless file
    takes git's sides (DEC-398) by the same rule.
  - Planted (CF-LVB-18): the `js:` line; a `CANDIDATE_DIRS` line; the css line with a trailing
    comment; two comment lines; a comment outside the block; and CF-LVB-1's moved row.
  - Base and Lovable: not a tree law. Lovable's head changes no file under `scripts/`.
- **CF-HELPERS-10** (`e2e-helpers.test.ts`, concern 3).
  - Form: under `e2e/`, a read that takes `data` or `count` from an answer and never reads `error`:
    - an object binding `{ data… }` or `{ count… }` without `error`, in a declaration or a
      callback's parameter;
    - `(await …).data` or `.count`;
    - a held awaited value whose `.data` or `.count` is read while its `.error` is never read,
      nor the value passed whole to a call.
  - A test that asserts the refusal reads `error` by definition. The allowlist key would be
    `<file> drops-error (<n>)`, the count per file, so a site's removal makes the line stale
    (Q5).
  - Planted: each of the three forms fails; `{ data, error }` and a held value whose `.error` is
    asserted pass.
  - Base: 162 reads in 31 files, by dropped-errors below. Lovable: the same 162; its head changes
    no file under `e2e/`.

## step-up

- Today (`src/features/auth/mfa/step-up-dialog.tsx`), the unbanded frame:
  - `:69` `DialogContent` (`layer="top"`, `size="narrow"`, focus to the code input on open);
  - `:79-90` `DialogHeader` with the title and one of two `DialogDescription`s;
  - `:92-116` the code `Field`, a direct child of the content;
  - `:118-147` `DialogFooter` with Cancel and Confirm (or the settings link).
- What the anatomy asks:
  - `DialogContent bands`;
  - `PanelHeader` (from `dialog-parts-facade.tsx`) holding `DialogTitle` and the description;
  - `PanelBody` holding the `Field`, which draws no band in the no-factor mode, where the body is
    empty;
  - `PanelFooter` holding the two buttons;
  - `layer="top"`, the test ids, the words and the focus handler unchanged.
- Words: none missing. The title, both descriptions and the buttons are existing keys, and the
  one new visible word, the body's cue, is `dialog.moreBelow`, handed in by the facade's
  `PanelBody`.
- What reads its frame:
  - unit: `step-up-dialog.test.tsx` (SUD-1, SUD-2; its mock changes shape, second-readers);
    `step-up-gate.test.tsx:69` and `step-up-gate-offline.test.tsx:69` (absence only);
  - browser, by test id and visibility only, no frame structure:
    - `e2e/mfa-stepup.spec.ts` (`:115-122`, `:144-145`, `:177-181`, `:278`, `:306-309`,
      `:349-351`, `:376`, `:407-437`);
    - `e2e/helpers/ui.ts:1105-1122`, `:1197-1215` and `:1407`;
    - `e2e/helpers/countries.ts:141`;
    - `e2e/admin-listings.spec.ts:1924`, `admin-monetisation.spec.ts:1431`,
      `admin-screening.spec.ts:653,730`, `admin-translations-governance.spec.ts:1197` and
      `admin-categories-lifecycle.spec.ts:379,404`.
  - No spec asserts its bands. `e2e/dialogs.spec.ts`'s board (`:115-150`, `:633-687`) does not
    open it.
- After Part 3, DG-9 passes (a footer follows the body) and DG-11 passes (both modes draw a
  description).

## dropped-errors (concern 3), counted by file

162 reads in 31 files: 149 in 26 specs and 13 in 5 helpers. By form: 107 destructured, 25
`(await …).data`, 30 held. Three of them take `count` without `data`.

- 20 `e2e/admin-attributes-links.spec.ts`
- 15 `e2e/admin-listings.spec.ts`
- 15 `e2e/admin-categories-lifecycle.spec.ts`
- 15 `e2e/admin-attributes-import.spec.ts`
- 13 `e2e/ad-page-doors.spec.ts`
- 7 `e2e/admin-attributes-editor.spec.ts`
- 6 `e2e/helpers/posting.ts`
- 6 `e2e/admin-translations-data.spec.ts` (Lovable's lane)
- 6 `e2e/admin-attributes-library.spec.ts`
- 5 `e2e/my-listings-doors.spec.ts`
- 5 `e2e/legal-doors.spec.ts`
- 5 `e2e/category-image-routes.spec.ts`
- 5 `e2e/admin-translations-governance.spec.ts` (Lovable's lane)
- 5 `e2e/admin-screening.spec.ts` (Lovable's lane)
- 4 `e2e/import-security.spec.ts`
- 4 `e2e/admin-translations-console.spec.ts`
- 4 `e2e/admin-roles.spec.ts` (Lovable's lane)
- 3 `e2e/helpers/categories.ts`
- 3 `e2e/admin-categories-console.spec.ts`: `:77` (INC-1245's, in `secondaryParentNames` :74),
  `:349` (a poll of `category_country_exclusions`) and `:969` (`client.auth.getSession()`)
- 2 `e2e/post-wizard-bundle2.spec.ts`
- 2 `e2e/helpers/admin-attributes.ts`
- 2 `e2e/admin-users.spec.ts` (Lovable's lane)
- 2 `e2e/admin-locations.spec.ts`
- 1 each in `e2e/posting-routes.spec.ts`, `post-wizard-pricing.spec.ts`,
  `post-wizard-place.spec.ts`, `post-wizard-category.spec.ts`, `photo-pipeline.spec.ts`,
  `my-listings-ad.spec.ts`, `helpers/ui.ts` and `helpers/photos.ts`

COVERED by Part 4: the three sites of `e2e/admin-categories-console.spec.ts`, the one spec this
bundle touches. No spec asserts the step-up frame. LEFT on the allowlist with INC-1245 as its
expiry: 159 reads in 30 files.

- `e2e/helpers/ui.ts:1540` is a false positive of the scratch pattern (a locator's `evaluate`
  result) and is not counted.
- The four held reads the narrow pattern missed are counted: `admin-listings.spec.ts:287` and
  `my-listings-doors.spec.ts:390,395,540`, door answers read through local helpers.

## Questions for the ruling

- **Q1 (DG-10's reading; STOP by the TOLERANCES).**
  - (a), within one file, finds only `photo-gallery.tsx:452`, horizontal.
  - (b), by definition across files, finds `category-form-fields.tsx:396` (vertical),
    `photo-gallery.tsx:245`, `listing-detail.tsx:1098` and `:452`.
  - Does "a scroller" mean vertical only (then (a) finds nothing and (b) finds `:396` and
    `:245`'s 32rem form) or any axis?
  - None is in Lovable's lane, and none is in my scope: they are `src/features/admin-categories/`
    and `src/features/posting/preview/`. Each finding goes on `dialogs-allowlist.txt` with a
    reason and an expiry unless the ruling widens the scope or narrows the law.
- **Q2 (DG-11's reading; STOP by the TOLERANCES).**
  - (a), per panel, finds `toolbar-panel.tsx:104`, a file of Lovable's lane: its popover form
    draws the description as a `<p>`. It also finds `dev.style.tsx:926,941,959`, and
    misreads `map-pin-dropper.tsx`, which (a) must follow into the panel's body function.
  - (b), per file, finds nothing.
  - The brief says a law that finds a file of Lovable's lane at the base is a STOP. Which reading,
    and for (a), is `toolbar-panel.tsx:104` Lovable's to fix before its pull request (with its
    `<p>` as the description it is), and do the three specimens of `/dev/style` take allowlist
    lines?
- **Q3 (CF-OV-8 and the parts' own test).** `src/components/ui/dialog-parts.test.tsx:16-24`
  imports the real parts by value: it tests them, and `src/components/ui/` is read only for me.
  - The stricter reading (every file under `src`, `e2e`, `scripts`) finds it. An allowlist line
    needs an expiry, and this reach is permanent.
  - I propose the law names the parts' own test as its second reader, beside `overlays-impl.ts`,
    as `MAY_REACH` names one reader per module. Or does the ruling want a dated line?
- **Q4 (DG-9 and the enlarged map).** `listing-detail.tsx:1319` is a `fill` body with no footer
  and no `end` (`BANDS_FILL` then carries no bottom inset). Either the law exempts `fill` bodies
  (a map or a photo to the frame's edge), or the finding takes an allowlist line until that file
  is touched. It is outside my scope.
- **Q5 (CF-HELPERS-10's allowlist and Lovable's specs).**
  - 22 of the 159 left sites are in five specs of Lovable's lane: admin-screening,
    admin-translations-data, admin-translations-governance, admin-roles and admin-users.
  - Their lines would be keyed by file with a count, so Lovable's line edits there do not stale
    them; a removed read does.
  - Is a law that finds those files (expected output, by the brief's design of concern 3) inside
    the TOLERANCES' STOP, or does that line mean the dialog laws only?
  - And is a per-file line with its count the form, or one line per site (`<file>:<line>`), which
    every edit of those specs would stale?
- **Q6 (the guard's wording).**
  - `rule_for`'s `scripts/*` text and the header's Knowledge quote say "two exceptions …
    DEC-390 … DEC-396". Name DEC-425 there, which changes the two pinned texts at
    `lovable-branch-guard.test.ts:373,378`, or leave the text and name DEC-425 only in the new
    refusal?
  - CF-LVB-1's row `:130` must change in either case: the file now refuses by content, with the
    default `-a/+b` patch. I propose it moves into CF-LVB-18 with its refusal text.
- **Q7 (docs/features is read only).** Rule 10 says a structural change updates its feature doc
  in the same change. These lines become untrue:
  - `docs/features/design-foundation.md:567-568` and `:644` (the step-up dialog "pending
    Cursor's migration") and `:650-651` ("Until that guard lands …");
  - `docs/features/ci-guards.md:1364` ("CF-LVB-1…14") and the guard's section (DEC-425).
  - Does the ruling widen the scope to those lines, or do they go into the records package?
- **Q8 (the queued laws the brief leaves).** `design-foundation.md:645-650` queues four more laws
  for "Cursor's conformance-kit dialog guard turn": held-only subjects, red-focus safety,
  list-first Escape and empty-body omission. The brief builds six and says "LEFT: nothing known".
  Are those four left to a named later turn (and where is it recorded), or built here?
- **Q9 (the brief's fence).** The brief is saved unfenced, byte for byte, as bundle 2's was.
  Rule 00 step 2 and the go-template ask for one fenced block. Keep it, or re-save it fenced?

## Limits

- WebKit is not installed for my local runs; the WebKit lane in CI judges the step-up frame
  there.
- The E2E values were not read at this step: no browser test runs at a census.
- The census scripts read text and syntax, not the rendered tree. "Rendered inside a panel from
  another file" (DG-10 b) was read by hand for the candidates listed, and is a floor.
- The brief forbids a push between 13:00 UTC on a Sunday and the Feed bench's completed run.
  This stop is pushed before 13:00 UTC; if the clock passes that first, it waits, and the chat
  says so.
