QUESTION — housekeeping-1 STEP 1: the census, before any change (PLAN FIRST; ruling 1 wanted)
DONE: STEP 0 (brief saved, sha256 equal; roadmap line 3; commit 9de34f26c), STEP 1 (census, read only)
LEFT: parts A, D, C, B (STEPS 2 → 8)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `2b11a9d2943114859f22ac14cfc9ccf9f589ac54` (short `2b11a9d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-10T01:27:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42733115280
FILES:
docs/governance/briefs/housekeeping-1.md
docs/governance/reports/housekeeping-1.stop-1.md
roadmap.md

Base: dev 2b11a9d29 = `git rev-parse --short=9 origin/dev` after `git fetch` (dev did not move).
Branch `cursor/housekeeping` from origin/dev. Every line number below is at 2b11a9d29.

CI as read (raw ci-evidence, two-step check: run 42733115280 on 2b11a9d2943…, the base): SUCCESS;
guards-last-failure "No failed build/guard jobs in this run", no warning step; e2e-last-failure
"last E2E run 42733115280 passed", Flaky 0, errors outside any test none (18 of 18 results files,
18 of 18 logs read); local-backend-proof on the same commit, every lane listed applied 437/437,
Failed 0. Nothing red to fix first.

Brief: `/Users/tesfayemackbookpro/Downloads/housekeeping-1/housekeeping-1.md`, sha256
87262da339cd0c744e51510d5a0628f3650ca18ca770f8bd3779908e9922eb20 — equal to the GO's value; saved
by scripted copy into one four-backtick `text` fence, and the fenced text re-hashed to the same
value.

Scratch (the operator's to remove): /tmp/ethio-scratch/housekeeping-1/ (lint.txt, lint.json,
build-base.txt, budget-base.txt, importers.ts, dynamic.ts, brief-proto.ts). The base build's
output sits in the ignored `dist/` and `.output/`.

Machine: Darwin arm64 (`process.platform`/`process.arch` = `darwin arm64` under bun and node);
bun 1.3.14; `date` on PATH is GNU coreutils 9.12 (`/opt/homebrew/opt/coreutils/libexec/gnubin/date`,
ahead of `/bin/date`). E2E_SUPABASE_URL, E2E_SUPABASE_PUBLISHABLE_KEY and
E2E_SUPABASE_SERVICE_ROLE_KEY: each name set (values not read).

## (a) Part A — the checks runner, NH-6, `--no-tests`

### The pinned-asset steps (ci.yml, by their text)

Two steps download a pinned binary and run it; each declares a `*_SHA256` in its env:

| Step key | Env | Asset name as written | Fetch |
| --- | --- | --- | --- |
| `build-and-check › Workflow lint (actionlint, pinned)` (ci.yml :95–:116) | ACTIONLINT_VERSION 1.7.7, ACTIONLINT_SHA256 (:99–:100) | `tarball="actionlint_${ACTIONLINT_VERSION}_linux_amd64.tar.gz"` (:102) | `curl … releases/download/v${ACTIONLINT_VERSION}/$tarball` (:103–:104), `sha256sum -c` (:105), `tar -x … actionlint` (:106), runs `"$RUNNER_TEMP/actionlint"` (:107) |
| `secrets-scan › Secrets scan (gitleaks, pinned)` (ci.yml :188–:213) | GITLEAKS_VERSION 8.24.3, GITLEAKS_SHA256 (:192–:193) | `tarball="gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz"` (:195) | `with-deadline.sh 120 2 -- curl … releases/download/v${GITLEAKS_VERSION}/$tarball` (:196–:197), `sha256sum -c` (:198), `tar -x … gitleaks` (:199), runs `"$RUNNER_TEMP/gitleaks"` (:208) |

No other step downloads a binary: the semgrep job pins by `pip install "semgrep==${SEMGREP_VERSION}"`
(:378; a native wheel, job-level `SEMGREP_VERSION` only, no `_SHA256`) and its rules by a git commit
(:381–:394). The browser lanes are `e2e-lanes: uses: ./.github/workflows/local-backend-proof.yml`
(:519–:526), which has no steps the runner reads; `e2e`, `e2e-preflight`, `promote` and
`dependency-audit` are whole-job allowlist lines.

The two forms seen: `<os>_<arch>` with `linux_amd64` and `linux_x64`. The proposed platform table
(the reader matches `(linux|darwin|macos|windows)[_-](amd64|x64|x86_64|arm64|aarch64)` and the
rust-style `(x86_64|aarch64|arm64)-(?:unknown-)?(linux|darwin|apple-darwin)`): linux → `linux`,
darwin/macos → `darwin`, windows → `win32`; amd64/x64/x86_64 → `x64`, arm64/aarch64 → `arm64`. The
reader applies to a step whose env holds a `*_SHA256` key; the asset name is the `tarball="…"`
assignment, else the last segment of a `releases/download/…/<name>` URL, with `${X_VERSION}`
filled from the step's env for the message. A `*_SHA256` step whose name it cannot classify:
NOT RUN "pinned asset platform unknown: <name>".

Measured on this machine (the last local checks run, 2026-11-09, logs under
`~/.cache/ethio-checks/logs`): both checksums passed (`…_linux_amd64.tar.gz: OK`,
`…_linux_x64.tar.gz: OK`); `file` reads both extracted binaries as `ELF 64-bit LSB executable,
x86-64`; actionlint's step failed with "actionlint self-test: the bad fixture failed for another
reason" (its `lint` call hit `exec format error`), gitleaks' with `cannot execute binary file: Exec
format error`. So the runner must decide BEFORE the step runs (no download, no stand-in).

### Where the runner spawns each step (scripts/ci/turn-checks.ts)

- `planFrom` (:105–:123) reads every named step's `run`, merged env and deadline.
- The run loop (:447–:563): allowlist excuse (:451–:455) → conditional skip (:456) → earlier failure
  (:457–:466) → the local forms (Typecheck :467–:480, budget Build :481–:485, i18n drift
  :486–:497, semgrep venv :499–:503) → `text` (:504–:509, the secrets scan's local form and the unit
  step's worker bound) → `sh(text, …)` (:510–:515, `spawnSync("bash", ["-eo", "pipefail", "-c",
  cmd])` at :307) → R3 `fetchFailure` (:516, defined :250–:257) → the verdict line (:517–:535).
- The platform check goes between the conditional skip (:456) and the earlier-failure check, as a
  pure exported function `assetPlatform(step)` + `platformReason(step, {platform, arch})` so
  TCK-7 drives it with a planted step and a planted machine.

### NH-6 (scripts/ci/nightly-hour.test.ts :99–:113), verbatim assertion

```ts
const result = run(["schedule", SUMMER, "2026-07-15"], undefined, {
  TZDIR: dir,
  NIGHTLY_ZONE: undefined,
});
expect(result.code).toBe(2);
expect(result.out).toContain("::error title=nightly-hour::the America/New_York time zone");
expect(result.out).not.toContain("go=");
```

Run here: `bunx vitest run scripts/ci/nightly-hour.test.ts` → `× NH-6 …`, `AssertionError: expected
+0 to be 2`, `Tests  1 failed | 5 passed (6)`.

What this machine prints (pasted):

```
Nowhere/Unknown jan=+0000 jul=+0000
Etc/NoSuchZone jan=+0000 jul=+0000
America/New_York jan=-0500 jul=-0400
EST5EDT,M3.2.0,M11.1.0 jan=-0500 jul=-0400
--- TZDIR empty:
-0500
--- NH-6 form:
nightly-hour: "30 15 * * *" on 2026-07-15 is 11:30 in New York — this is the nightly's run
go=true
exit=0
--- NH-7 form:
::error title=nightly-hour::the America/New_York time zone does not resolve on this machine (no time-zone files?)
exit=2
```

(`TZ="$z" date -d 2026-01-15T12:00:00Z +%z`, the script's own probe at nightly-hour.sh :38–:39; NH-6
form = `env -u NIGHTLY_ZONE TZDIR=<empty dir> bash scripts/ci/nightly-hour.sh schedule "30 15 * *
*" 2026-07-15`; NH-7 form = `NIGHTLY_ZONE=Nowhere/Unknown bash scripts/ci/nightly-hour.sh schedule
"30 15 * * *" 2026-07-15`.) The premise holds: macOS libc ignores `TZDIR` (an empty one still
gives -0500), and an unknown `NIGHTLY_ZONE` reads as UTC (+0000), so the probe answers exit 2 with
the error title and no `go=`. NH-7 therefore passes on the base script as a positive control.

The error text names "America/New_York" even when `NIGHTLY_ZONE` names another zone (nightly-hour.sh
:40 is a literal) — see question Q2.

### How `bun run checks` takes arguments

`package.json` :27 `"checks": "bash scripts/ci/turn-checks.sh"`; turn-checks.sh :7 `exec bun
scripts/ci/turn-checks.ts "$@"` already forwards them (checked: `bun run typecheck --version`
reaches `tsc` and prints `Version 5.9.3`). turn-checks.ts reads no `process.argv` today (`rg -n
"process.argv"` — no hit; `main()` at :406). So `--no-tests` is a change to turn-checks.ts only; an
argument it does not know is refused (usage line, exit 2), never ignored.

### The vitest / playwright steps, by their text

| Step | Text | Test step? |
| --- | --- | --- |
| `laws-first › scripts/ tests first (INC-1030)` (turn-checks.ts :152–:160) | `bunx vitest run scripts --maxWorkers=2` | yes (says vitest) |
| `laws-first › changed folders' unit tests (INC-1030)` (:162–:170) | `bun scripts/ci/laws-changed.ts units` | yes, but its text does not say so (laws-changed.ts :102 spawns `bunx vitest run …`) |
| `component-tests › Component tests (vitest + RTL + jsdom)` (ci.yml :165–:166) | `bun run test:unit` → package.json :26 `"vitest run"` | yes through package.json |
| every other step | — | no; `build-and-check › e2e selector self-test` runs `scripts/e2e-select.ts --self-test` (:669, the area table only, no browser) |

No ci.yml step the runner reads runs playwright (`e2e:local`, `test:e2e` appear in no step).

## (b) Part B — the lint set

`bun run lint` at the base (lock-exact for the lint packages: eslint 9.39.4, eslint-plugin-react-
refresh 0.4.26, eslint-plugin-react-hooks 5.2.0, typescript-eslint 8.59.0 — installed = bun.lock):
exit 0, last line `✖ 46 problems (0 errors, 46 warnings)`. By script over `bunx eslint . -f json`:
`react-refresh/only-export-components` 44 warnings in **28** files; `react-hooks/exhaustive-deps` 1;
one unused directive (e2e/i18n-sign-in-language.spec.ts :193).

**Premise wrong (1):** `eslint.config.js` :113 ALREADY reads
`"react-refresh/only-export-components": ["warn", { allowConstantExport: true }]`. So none of the 44
is a literal constant (the option already lets those through), and Part B's EXCEPTIONS line has
nothing to add: the option stays as it is, and my plan adds no line to eslint.config.js (only its
comment, if the ruling wants the turn named there).
**Premise wrong (2):** 28 files, not 29 (`files 28` from the script; the supervisor's install was
not lock-exact).

### The 44, each with its kind, proposed home and importers

Importers = `rg`-equivalent script over src/, e2e/, scripts/ (named imports and re-exports resolved
from `@/` and relative paths), plus every `vi.mock` of the module that names the export, plus
dynamic and namespace imports (nine found, listed after the table). "drop export" = the name has no
importer outside its file, so the `export` keyword goes and nothing moves.

| Site | Export | Kind | Proposal | Importers outside the file |
| --- | --- | --- | --- | --- |
| src/components/searchable-picker.tsx:34 | placeList | function | → `src/components/picker-popup.ts` | searchable-picker.test.tsx |
| :77 | usePickerPlacement | hook | → picker-popup.ts | searchable-picker.test.tsx, posting/phone-number-field.tsx, posting/step-pricing.tsx |
| :162 | usePickerKeys | hook | → picker-popup.ts | the same three |
| :206 | pickerPopClass | function | → picker-popup.ts | ui/choice-list-look.test.tsx, phone-number-field.tsx, step-pricing.tsx |
| :211 | pickerGeometry | function | → picker-popup.ts | searchable-picker.test.tsx |
| src/components/shell/app-rail.tsx:96 | useFavouriteCategory | hook | → `src/components/shell/favourite-category.ts` | marketplace/feed.tsx |
| :148 | RailVariantContext | object (context) | → `src/components/shell/rail-variant.ts` | rail-first-paint.test.tsx :62 (dynamic `import("./app-rail")`) |
| src/components/shell/block-guide.tsx:16 | guideAnchor (re-export from ./guide-spec) | function | the re-export goes; data-table.tsx imports it from guide-spec.ts (no new module); the type re-exports stay as `export type` | shell/data-table.tsx |
| src/components/ui/badge.tsx:37 | badgeVariants | function (cva) | drop export | none |
| src/components/ui/button.tsx:64 | buttonVariants | function (cva) | → `src/components/ui/button-variants.ts` | ui/alert-dialog.tsx, ui/calendar.tsx, ui/dialog-look.test.tsx, ui/pagination.tsx |
| src/components/ui/form.tsx:163 | useFormField | hook | drop export | none |
| src/components/ui/one-line-slot.tsx:13 | splitAtSlot | function | → `src/components/ui/slot-split.ts` | one-line-slot.test.tsx |
| src/components/ui/overlay-facade.tsx:626 | askOverlays | function | → `src/components/ui/overlay-ask.ts` | shell/submenu/submenu-signal.ts |
| :632 | useOverlays (re-export of overlay-loader) | hook | the re-export goes; app-rail.tsx imports from overlay-loader.ts, as dropdown-menu.tsx :7 already does | shell/app-rail.tsx |
| src/components/ui/section-notice.tsx:19 | useSectionNotice | hook | → `src/components/ui/section-notice-state.ts` | admin-screening/name-checks.tsx, photo-changes.tsx, photo-reviews.tsx |
| src/components/ui/strip-arrows.tsx:141 | keepInStrip | function | → `src/components/ui/keep-in-strip.ts` | posting/preview/photo-gallery.tsx |
| src/components/ui/submenu-impl.tsx:72 | navLevelOf (+ type NavLevelRules) | function | → `src/components/ui/submenu-levels.ts`, on demand (Q11) | none by import; reached as `overlays.submenu.navLevelOf` (app-rail.tsx :922) through overlays-impl.ts :15 `export * as submenu` |
| src/components/ui/toggle.tsx:42 | toggleVariants | function (cva) | → `src/components/ui/toggle-variants.ts` | ui/toggle-group.tsx |
| src/features/ad-page/share-ad.tsx:25 | sharePriceText | function | → `src/features/ad-page/share-price-text.ts` | my-listings/my-listing-page.tsx, my-listings-page.tsx, posting/step-review.tsx, routes/l.$slug.tsx |
| src/features/admin-attributes/attribute-dialogs.tsx:73 | useAttributeError | hook | → `src/features/admin-attributes/attribute-error.ts` | category-attributes-dialog.tsx |
| src/features/admin-categories/category-form-fields.tsx:52 | emptyCategoryForm | function | → `src/features/admin-categories/category-form-values.ts` | category-dialogs.tsx |
| src/features/admin-categories/category-image-dialog.tsx:29 | useImageFailure | hook | drop export | none |
| src/features/admin-countries/country-dialogs.tsx:25 | useCountryError | hook | → `src/features/admin-countries/country-dialog-state.ts` | country-dialogs.test.tsx, country-editor.tsx, country-verb-dialogs.tsx |
| :172 | numberOrZero | function | → country-dialog-state.ts | country-editor.tsx |
| src/features/admin-locations/location-dialogs.tsx:39 | useLocationError | hook | → `src/features/admin-locations/location-dialog-state.ts` | location-editor.tsx, location-verb-dialogs.tsx, locations-service.test.ts |
| :118 | numberOrNull | function | → location-dialog-state.ts | location-editor.tsx |
| src/features/admin-locations/location-form-fields.tsx:36 | emptyLocationForm | function | → `src/features/admin-locations/location-form-values.ts` | location-dialogs.tsx |
| :49 | coordinatesRequired | function | → location-form-values.ts | location-dialogs.tsx, location-editor.tsx |
| src/features/admin/admin-context.tsx:32 | useAdminShell | hook | the PROVIDER moves instead (Q9): `AdminShellProvider` → `src/features/admin/admin-shell-provider.tsx`; the context and both hooks stay at admin-context.tsx | 23 importers + 4 `vi.mock` factories (monetisation-page.test.tsx :88, block-guide.test.tsx :54, ai-page.test.tsx :17, page-guide.test.tsx :45) |
| :44 | useAdminShellIfAny | hook | stays (as above) | shell/block-guide-sheet.tsx; mocked in block-guide.test.tsx, page-guide.test.tsx |
| src/features/posting/field.tsx:108 | stepOfField | function | → `src/features/posting/field-refusals.ts` (with its step map and `CONTROL_LESS_FIELDS`) | src/test/own-key-sites.test.ts |
| :133 | controlClass | function | → field-refusals.ts | step-details, step-photos, step-pricing, step-review, step-specifications, step-who (.tsx) |
| :272 | summaryRefusals | function | → field-refusals.ts | field.test.ts |
| :281 | focusFirstRefusal | function | → field-refusals.ts | step-who.test.tsx, wizard.tsx |
| :312 | summaryLabel | function | → field-refusals.ts | field.test.ts, src/test/own-key-sites.test.ts |
| src/features/posting/map/map-preview.tsx:44 | snap | function | → `src/features/posting/map/map-snap.ts` | map-large.tsx; mocked with `snap` in preview/listing-detail-map.test.tsx :53 (its mock changes shape: the `snap` entry leaves it) |
| src/features/posting/preview/listing-detail.tsx:171 | currentListingSection | function | → `src/features/posting/preview/listing-section.ts` | listing-detail.test.tsx |
| src/features/posting/step-pricing.tsx:86 | scaleAmount | function | → `src/features/posting/amount-scale.ts` | posting/map/outline.test.ts |
| src/features/posting/step-specifications.tsx:1944 | stepSpecificationsPure = { firstSentence, foldFact } | object | `firstSentence` and `foldFact` → `src/features/posting/spec-sentences.ts`; the object goes; the test imports the two functions | step-specifications.test.ts |
| src/features/posting/step-who.tsx:128 | sameChannels | function | → `src/features/posting/same-channels.ts` (its test is already `same-channels.test.ts`) | admin-listings/edit-listing.ts, posting/edit-step-changes.ts, posting/same-channels.test.ts |
| src/i18n/provider.tsx:82 | readDeviceStar | function | → `src/i18n/i18n-context.ts` (with `I18nContext`, `useI18n`, `useStringsLayers`; I18nProvider imports the context) | src/i18n/index.ts |
| :801 | useI18n | hook | → i18n-context.ts | src/i18n/index.ts (the app reaches it only through index.ts); dynamic `import("./provider")` in provider.test.tsx :50, provider-layers.test.tsx :59, provider-d239.test.tsx :42 |
| :815 | useStringsLayers | hook | → i18n-context.ts | src/i18n/index.ts; provider-layers.test.tsx :59 |
| src/providers/theme-provider.tsx:39 | useTheme | hook | → `src/providers/theme-context.ts` (with `ThemeContext`) | shell/theme-toggle.tsx |

Dynamic and namespace imports of these 28 files (all nine): block-guide.test.tsx :59 (BlockGuide),
overlay-facade-failure.test.tsx :63 (Button from ./button), map-offline.test.tsx :29 (MapPreview),
listing-detail.tsx :77 and step-where.tsx :61 (MapPreview, on demand), provider-d239.test.tsx :42,
provider-layers.test.tsx :59, provider.test.tsx :50 (I18nProvider, useI18n, useStringsLayers,
constants), rail-first-paint.test.tsx :62 (CategoryNav, RailVariantContext). No e2e spec and no
scripts/ file imports any of the 44 (the script's e2e/scripts column is empty for every row), so
no browser test is owed by a move.

### The `exhaustive-deps` site — listing-detail.tsx :369–:387

```ts
const [contactHighlight, setContactHighlight] = useState(false);
useEffect(() => {
  if (focusOnReturnDone.current) return;
  if (view.contact?.focusOnReturn !== true || view.contact.viewer !== "signedIn") return;
  const button = showContactRef.current;
  const card = typeof document === "undefined" ? null : document.getElementById("contact");
  if (button === null || card === null) return;
  focusOnReturnDone.current = true;
  …
  button.focus({ preventScroll: true });
  setContactHighlight(true);
  window.setTimeout(() => setContactHighlight(false), 3000);
});
```

Read: the effect has no list on purpose — it waits, render after render, for the Show-contact
button to mount, which happens inside `BuyerContact` (:1022–:1028, `showRef={showContactRef}`,
the button's `ref={showRef}` at :1479) only when the ad is not sold, the viewer is known and
`view.contact` is defined (:1013–:1021). The once-flag stops a loop today, but the effect runs on
every render for the page's life. A dependency list would have to restate those mount conditions.
Proposal (Q13): the highlight moves to the event that causes it — the button's arrival: a stable
`useCallback` ref (deps: `view.contact?.focusOnReturn`, `view.contact?.viewer`) that, once (the same
`focusOnReturnDone` flag, an equality-guarded write), scrolls the card, focuses the button and
starts the highlight; the timer is cleared on unmount. Its tests: listing-detail.test.tsx :720 and
:736 (`focusOnReturn: true`) stay green unchanged.

### The unused directive

e2e/i18n-sign-in-language.spec.ts :193 `// eslint-disable-next-line react-hooks/rules-of-hooks -- a
harness helper, not a React hook` above `await useJobSuperAdmin(page)`; eslint reports it unused
(the call sits in a test callback, where the rule does not fire). Removing it changes a spec file
(Q12).

### The first-download table at the base (my build)

`bun run build` (exit 0) then `node scripts/check-bundle-size.mjs` (exit 0, "Bundle budget OK."),
local build: entry `JS: 211.9 KiB / 215 KiB — ok`, `CSS: 23.1 KiB / 40 KiB — ok`. The files above
include first-paint modules every page carries (button.tsx, i18n/provider.tsx, overlay-facade.tsx,
app-rail.tsx; the entry closure lists `provider-780NTmw6.js` 16.3 KiB, `overlay-facade-BkBqpUsm.js`
3.6 KiB, `button-CKiB-hg1.js` 1.0 KiB), so every page is in play; the whole table:

```
    233.5 / 235 KiB  /
    231.4 / 233 KiB  /$name
    274.6 / 277 KiB  /account
    214.6 / 217 KiB  /account_/legal
    215.2 / 218 KiB  /account_/legal_/$versionId
    231.6 / 233 KiB  /account_/saved
    212.9 / 216 KiB  /admin
    213.7 / 216 KiB  /admin/
    326.5 / 329 KiB  /admin/ai
    339.8 / 342 KiB  /admin/attributes
    299.5 / 302 KiB  /admin/audit
    347.9 / 350 KiB  /admin/categories
    329.3 / 332 KiB  /admin/countries
    213.5 / 216 KiB  /admin/images
    294.2 / 298 KiB  /admin/impersonation_/$sessionId
    285.1 / 288 KiB  /admin/legal
    282.4 / 285 KiB  /admin/legal_/$versionId
    284.1 / 292 KiB  /admin/legal_/edit
    351.6 / 353 KiB  /admin/listings
    353.2 / 354 KiB  /admin/listings_/$listingId
    413.4 / 414 KiB  /admin/listings_/$listingId_/edit
    273.7 / 276 KiB  /admin/locations
    337.5 / 341 KiB  /admin/monetisation
    330.8 / 333 KiB  /admin/places
    296.2 / 299 KiB  /admin/roles
    276.6 / 279 KiB  /admin/roles_/$roleId
    372.6 / 374 KiB  /admin/screening
    307.1 / 310 KiB  /admin/translations
    310.7 / 313 KiB  /admin/translations_/$lang
    296.0 / 299 KiB  /admin/users
    291.3 / 294 KiB  /admin/users_/$userId
    229.6 / 231 KiB  /auth
    216.1 / 217 KiB  /auth_/callback
    218.0 / 219 KiB  /auth_/reset
    233.5 / 235 KiB  /c/$slug
    233.5 / 236 KiB  /dev/primitives
    254.4 / 256 KiB  /dev/style
    212.2 / 215 KiB  /dev/tall
    263.7 / 265 KiB  /l/$slug
    216.6 / 219 KiB  /legal/$kind
    223.6 / 226 KiB  /legal/accept
    217.4 / 220 KiB  /legal/publishing
    321.8 / 323 KiB  /my-listings
    329.8 / 331 KiB  /my-listings_/$listingId
    408.0 / 409 KiB  /my-listings_/$listingId_/edit
    407.9 / 409 KiB  /post
    407.9 / 409 KiB  /post_/$listingId
    216.6 / 219 KiB  /privacy
    283.2 / 284 KiB  /settings
    216.6 / 219 KiB  /terms
```

50 pages; none within 0.4 KiB of its ceiling (raw); the tightest are
`/admin/listings_/$listingId_/edit` 413.4 / 414 (0.6) and `/auth_/callback`, `/auth_/reset`,
`/settings`, `/admin/listings_/$listingId` (0.8–0.9). Part B's after-build is compared page by page
and chunk by chunk against this table (the base sizes are also cached by the runner).

## (c) Part C — where the brief in force is read, and the proposed text laws

- roadmap.md line 3 now reads `The brief in force: docs/governance/briefs/housekeeping-1.md (…).
  Previous: docs/governance/briefs/rules-3.md (…) …`.
- laws-changed.ts :47–:59 `turnBase`: `TURN_BASE` if set, else `roadmap.split("\n")[2]`, the FIRST
  `docs/governance/briefs/[\w.-]+\.md` on it, read, `/Base: dev ([0-9a-f]{7,40})\b/`; null when any
  link is missing.
- The same reading exists twice more: turn-checks.ts :342–:349 `briefBase` (same regexes) and
  `.claude/hooks/lib.ts` :150–:160 (`lines.find(/brief in force/i) ?? lines[2]`; outside scope, the
  other executor's). Proposal (Q7): one exported `briefInForce(roadmap): string | null` in
  laws-changed.ts, used by `turnBase`, by turn-checks.ts's `briefBase`, and by briefs.test.ts.
- The rulings: `docs/governance/briefs/<stem>-ruling-<n>.md` (e.g. rules-3-ruling-1.md); other
  siblings (`-amendment-1.md`, `-plan.md`, `-strings.json`) are not rulings and are not read.

Proposed laws (a prototype, scratch brief-proto.ts, was run on this brief and the eight newest brief
files):

- CF-BRIEF-1: the brief in force matches `/Base: dev [0-9a-f]{7,40}\b/`. Rulings are not held to it
  (their form is `Base: cursor/<branch> <sha>`).
- CF-BRIEF-2: sentences = the text split on newlines and on `(?<=[.;!?])\s+`. A finding is a
  sentence that matches `/\b(?:any red|any growth|at or below|must be green|zero failures)\b/i` AND
  `/\bSTOP\b/` AND not `/\b(?:never|not|no|none|forbidden|refuses)\b/i`. Read on the brief and each
  ruling.
- CF-BRIEF-3: the SCOPE section = the paragraph that begins with a line starting `SCOPE` (to the next
  blank line). Files = `(src|e2e|scripts)/…\.(ts|tsx|mjs|sh)` not followed by `/` or `*` (folders
  and globs are areas). Each named non-test file needs `<stem>.test.ts(x)` named in the same section;
  an e2e/ helper needs a `.spec.ts` named; a test or spec file needs nothing.
- CF-BRIEF-4: a fixture brief (`Base: dev …`, a line `Any red is a STOP.`, and `SCOPE:
  src/lib/x.ts, src/lib/y.ts`) yields one CF-BRIEF-2 finding and two CF-BRIEF-3 findings.

**Premise wrong (3) — this brief fails CF-BRIEF-2 as written.** The prototype finds one sentence:
`CF-BRIEF-4 — the self-test: a fixture brief with "any red is a STOP" and a bare single-file SCOPE
fails CF-BRIEF-2 and CF-BRIEF-3.` It holds "any red" and "STOP" and no negation word, so the window
rule does not skip it. (The CF-BRIEF-2 sentence itself is skipped: it holds "no" and "none".) With
phrases inside double quotes skipped as quotations, the prototype finds nothing in this brief, and
the planted unquoted `Any red is a STOP.` still fails (Q6). CF-BRIEF-1: pass. CF-BRIEF-3: pass (the
SCOPE names folders, `eslint.config.js`, `package.json` and a docs path; no single src/e2e/scripts
file). Of the eight newest other brief files, none has a SCOPE line, and none is the brief in force.

## (d) Part D — TCK-5 and R4

TCK-5 today (turn-checks.test.ts :134–:154), verbatim:

```ts
  it("TCK-5 the NEAR band lists each page within 0.3 KiB with its growth; a grown NEAR page is owed", () => {
    const now = pageSizes(
      [
        "Per-page first download (entry + the page's chunks, gzipped):",
        "    219.9 / 220 KiB  /",
        "    306.8 / 307 KiB  /admin/roles_/$roleId",
        "    300.0 / 304 KiB  /admin/users",
        "    277.0 / 277 KiB  /admin/legal",
      ].join("\n"),
    );
    const base = pageSizes(
      ["    219.4 / 220 KiB  /", "    277.0 / 277 KiB  /admin/legal"].join("\n"),
    );
    const near = nearBand(now, base);
    expect(near).toEqual([
      { page: "/", kib: 219.9, ceiling: 220, growth: 0.5 },
      { page: "/admin/legal", kib: 277, ceiling: 277, growth: 0 },
      { page: "/admin/roles_/$roleId", kib: 306.8, ceiling: 307, growth: null },
    ]);
    expect(nearOwed(near).map((n) => n.page)).toEqual(["/"]);
  });
```

R4's two print sites (turn-checks.ts): the NEAR lines :543–:550 (`  NEAR   <page>  <kib> / <ceiling>
KiB  +<growth> KiB since <sha>` or "growth unknown (no base build)") and the verdict :551–:562
(`verdict: base === null && now.size > 0 ? "NOT RUN" : owed.length > 0 ? "FAIL" : "PASS"`, reason
"<n> NEAR page(s) grew: raise each with its cause (…)"). The band itself: `nearBand` :280–:296 with
turn-checks.ts's own `NEAR_KIB = 0.3` (:49) on RAW sizes; `nearOwed` :299–:301.

**Premise wrong (4) — R4 is not what failed in D320.** The c3 report (p2-fold-c3.report.md :335–:345)
records that "the local check failed `/admin/screening` inside the NEAR band": 372.61 KiB, "with the
0.1 local allowance that left 0.29 KiB below 373". That is `scripts/check-bundle-size.mjs` :256–:268
— its own DEC-296 band (`nearFindings`, budget-band.mjs :41–:52, which adds `LOCAL_ALLOWANCE_KIB`
when `CI` is empty — the runner sets `CI: ""`, turn-checks.ts :430) printing "NEAR band failed
(DEC-296)" and `process.exit(1)`, so the step `bundle-budget › Check the first-paint budget` is the
FAIL. R4's raw band (373 − 372.61 = 0.39 > 0.3) would not even have listed the page. Turning R4's
FAIL into a NOTE alone does not reach D320's class. Also, R4's band is a second copy of DEC-296's
(K1): its own `NEAR_KIB`, and raw sizes where budget-band.mjs judges `judgedSize`. Proposal in Q5.

## (e) Every list a new name must join

- `scripts/conformance/wired.test.ts` CF-WIRED-1 (:73–:189): briefs.test.ts is a test, so it is not
  in the domain (`wiredDomain` :20–:45); the brief asks for a named line like the others (:105–:108's
  form: "briefs.test.ts CF-BRIEF-1…4 … is discovered by test:unit's scripts/**/*.test.ts" +
  `toContain("CF-BRIEF-4")`).
- `scripts/conformance/kit.test.ts` CF-KIT-7 (:135–:159): a `readAllowlist` caller's second argument
  must match `FINDING_NAMES` (:89, `findings?|found|…`); briefs.test.ts passes `findings…`, so
  `allowlist-keys-allowlist.txt` gains no line. Its law: `<file> | reason | until`, two lines today.
- New allowlist `scripts/conformance/briefs-allowlist.txt`: kit's grammar (`key | reason | until`,
  comment lines `#`), empty of lines at birth; key = `<brief file>: <phrase>` (proposed).
- Test ids (TI-1): `rg "\b(TCK-7|TCK-8|NH-7|CF-BRIEF-[0-9]|BRF-[0-9])\b" src e2e scripts` — no hit.
- `scripts/ci/turn-checks-allowlist.txt`: no new line (the platform reason is computed); `allowed()`
  keys are ci.yml's own step keys (allowlist-keys-allowlist.txt :4 already records why).
- `scripts/conformance/overlays.test.ts` `WATCHED` (:23–:24) and `MAY_REACH` (:27–:40), if navLevelOf
  moves to an on-demand module (Q11) — outside this brief's SCOPE.
- The e2e selector's area table: no spec moves or is added; i18n-sign-in-language.spec.ts is already
  covered (the selector's `--self-test` passes on the base in CI).
- `scripts/conformance/lint-rules.test.ts` reads eslint.config.js's blocks per file; no test pins
  the `lint` script's text or the react-refresh option (`rg "react-refresh|allowConstantExport|max-
  warnings|\"eslint \.\""` over src, e2e, scripts: one hit, the disable line in (g)).
- No exact-list assertion over turn-checks.ts's exports or the Step type was found beyond the
  turn-checks.test.ts imports (:7–:31), which gain the new names.

## (f) Premises found wrong (file:line)

1. `allowConstantExport: true` is already set (eslint.config.js :113); none of the 44 is a literal.
2. 28 files, not 29 (my lock-exact lint).
3. This brief fails CF-BRIEF-2 under the window rule as stated (its CF-BRIEF-4 sentence).
4. D320's FAIL was check-bundle-size.mjs's own local NEAR band (:256–:268, budget-band.mjs :41–:52),
   not R4 (turn-checks.ts :551–:562); R4's band is a raw-size copy of DEC-296's (:49, :280–:296).
5. The lint set is not the whole class: one existing `eslint-disable-next-line
   react-refresh/only-export-components` (src/features/admin-categories/category-dialogs.tsx :106,
   `useSubmitError`) hides a 45th site, and 29 `react-hooks/exhaustive-deps` disables hide that
   class (list in (g)). `--max-warnings 0` does not see a disabled line.

## (g) Findings beyond the task (rule 60 §13)

- **The refusal reader, five copies (K2, structural).** useAttributeError (attribute-dialogs.tsx
  :73), useCountryError (country-dialogs.tsx :25), useLocationError (location-dialogs.tsx :39),
  useImageFailure (category-image-dialog.tsx :29) and useSubmitError (category-dialogs.tsx :107):
  each reads a door's refusal into a screen message its own way. F2's form kit owns this concern;
  this turn only moves them. useAttributeError reads `(error as { message?: unknown }).message`
  (:84–:87) instead of `errorText` and shows the raw text when no key matches (:98), the "a client
  never sees a raw Postgres message" law's shape — staff-only screen; raised for F2.
- **Hidden exhaustive-deps sites (29 lines, 3 with a reason).** src/components/app-shell.tsx :781
  (`eslint-disable-line`); step-where.tsx :892, :949, :970, :1000, :1026, :1154, :1232, :1263, :1284;
  catalog-finder.ts :222; step-pricing.tsx :398; map-pin-dropper.tsx :311, :316; step-details.tsx
  :202 (reason); step-specifications.tsx :597, :1093; wizard.tsx :459, :520, :691, :853;
  phone-number-field.tsx :112, :129; screening-page.tsx :278, :293 (reasons); categories-page.tsx
  :330; category-image-dialog.tsx :234; strings-page.tsx :186; use-label-room.ts :42. Each is an
  effect the brief's own Part B calls "a real defect class"; none is in this brief. Raised for a
  planned turn (each needs its effect read).
- **Harness helpers named like hooks.** Five more `rules-of-hooks` disables in e2e (helpers/
  categories.ts :252, helpers/translations.ts :282, i18n-coverage.spec.ts :115, admin-roles.spec.ts
  :79, admin-audit.spec.ts :86) exist only because harness helpers start with `use…`
  (`useJobSuperAdmin`); a rename would retire them. Minor.
- **nightly-hour.sh needs GNU `date`.** `date -d` (:38–:39, :58) is GNU syntax; this Mac passes NH-1
  → NH-5 only because Homebrew coreutils' `date` is ahead of `/bin/date` on PATH. On a stock macOS,
  every NH test would fail for a machine reason the platform reader does not see. Raised; NH-7's
  design does not depend on it beyond what NH-1 → NH-5 already do.
- **Three readers of roadmap line 3** (turn-checks.ts :342, laws-changed.ts :47, .claude/hooks/lib.ts
  :150) — K2; Q7 folds the two in scope.
- **listing-detail.tsx :385** starts a 3-second timer with no clear on unmount (state set on an
  unmounted component is harmless in React 19, but the timer outlives the page) — folded into the
  exhaustive-deps fix if Q13 is approved.
- provider.tsx is 833 lines and app-rail.tsx 1,209, over the ~300-line split rule; the moves here
  shrink them slightly; not split here (A2).

## Questions for ruling 1

Q1 (NH-6 off Linux). The brief: NH-6's `TZDIR` form "runs where `TZDIR` governs" and "neither skips
with a notice — a test that cannot run on this platform is not a green". Proposed: NH-6 is
`it.runIf(process.platform === "linux")(…)` — vitest reports it SKIPPED on darwin (counted as
skipped, never as passed, no notice printed), and NH-7 carries the refusal on every platform.
Alternative: NH-6 on darwin asserts the zone DOES resolve with an empty `TZDIR` (a test of macOS,
not of the script). Which?

Q2 (NH-7's error text). nightly-hour.sh :40 names "America/New_York" whatever `NIGHTLY_ZONE` says.
(a) leave the script; NH-7 asserts `::error title=nightly-hour::`, "time zone does not resolve on
this machine", exit 2 and `not.toContain("go=")` (recommended: no script change); (b) :40 names
`${ZONE}` (NH-6 still reads "the America/New_York time zone", since its zone is the default).

Q3 (`--no-tests` and the laws). The scripts/ conformance censuses ARE vitest tests
(laws-first › scripts/ tests first). Under `--no-tests` the brief's rule makes them NOT RUN too, so
"every guard" means the ci.yml guard steps, not the conformance censuses. Confirm (recommended: as
written; the summary line names `--no-tests`), or keep the laws step running under `--no-tests`.

Q4 (which steps are test steps). Proposed: by text — `/\b(?:vitest|playwright)\b/` over the step's
text with every `bun run <script>` expanded through package.json's scripts (`test:unit` → `vitest
run`); `laws-changed.ts units` says neither word, so LAWS_CHANGED_UNITS carries an explicit mark
(`tests: true` on the runner's own Step) rather than a regex on its file name. Approve?

Q5 (DEC-361's reach). To reach D320's class with CI and the scripts unchanged: (a) R4 reads
budget-band.mjs (`NEAR_KIB`, `judgedSize` — the one band, K1) instead of its own copy, so it lists
the pages the budget script names; (b) the runner reads the budget step's output: when its only
failure section is "NEAR band failed (DEC-296)" (no "Per-page budget failed", no JS/CSS over its
ceiling), the step's verdict is PASS and each NEAR finding prints as R4's NOTE ("NEAR <page> <kib> /
<ceiling> KiB, grew +<delta> since <base sha> — CI's bundle-budget job judges; raise the line only
with a named cause"); any other failure is the step's FAIL as today. check-bundle-size.mjs,
budget-band.mjs and ci.yml stay byte-identical. And the no-base case: NOT RUN "NEAR: base not built
— CI judges" (recommended) or PASS? Approve (a) + (b), or R4 alone as written?

Q6 (CF-BRIEF-2 and quotations). (a) A phrase inside double quotes ("…" or “…”) is a quotation and
is skipped, beside the negation window (recommended; the cost: a brief could write `"any red" is a
STOP` and pass); (b) a birth line in briefs-allowlist.txt for housekeeping-1.md (the brief says
"empty at birth"); (c) widen the window with "fixture|planted". Which?

Q7 (one reader of line 3). Export `briefInForce(roadmap)` from laws-changed.ts and use it in
`turnBase`, turn-checks.ts's `briefBase` and briefs.test.ts (recommended), or only add briefs.test.ts
as a reader?

Q8 (CF-BRIEF-2/3 reach and the SCOPE law). As in (c): CF-BRIEF-1 on the brief only; CF-BRIEF-2 and
CF-BRIEF-3 on the brief and its `-ruling-<n>.md` files; the SCOPE paragraph and the test rule as
written there (test and spec files need nothing; `.txt`, `.json`, `.md`, `.sql`, `.yml` are not
"files" for the rule). Approve?

Q9 (direction of the admin-context move). Move `AdminShellProvider` (7 referencing files) to
admin-shell-provider.tsx and keep the context and both hooks at admin-context.tsx (28 referencing
files and 4 `vi.mock` factories untouched) — the same end state (each file exports one kind) with
the smaller diff (recommended). Or move the hooks as the brief's default form says.

Q10 (no-importer exports). badgeVariants, useFormField and useImageFailure have no importer outside
their file: drop the `export` (recommended) rather than make a module. Approve?

Q11 (navLevelOf stays on demand). It moves to `src/components/ui/submenu-levels.ts`; overlays-impl.ts
adds `export * as submenuLevels from "./submenu-levels"`; app-rail.tsx :922 calls
`overlays.submenuLevels.navLevelOf`. To keep it off the first download by law, overlays.test.ts's
`WATCHED` and `MAY_REACH` gain `submenu-levels` → overlays-impl.ts: that file is outside SCOPE. Allow
those two lines, or leave it unwatched (the budget check still weighs every page)?

Q12 (the spec directive). Removing e2e/i18n-sign-in-language.spec.ts :193 changes a spec. Rule 00
step 7 runs a changed spec whole (both projects, 0 retries) outside the sandbox; the brief says no
browser test is owed unless a moved export is e2e-imported (none is). The three E2E names are set.
Run that spec outside the sandbox, or CI's repeat lane is the proof?

Q13 (the effect fix). The callback-ref form in (b) (recommended), or a dependency list restating the
mount conditions (`view.contact`, the sold state, `channels.length`)?

Q14 (the 45th site). category-dialogs.tsx :106–:107 (`useSubmitError`, behind an existing
`eslint-disable-next-line react-refresh/only-export-components`): the same class and outside the
lint count; it is in `src/features/` (Part B's area, but not "a file the lint census names"). Move it
too (→ `src/features/admin-categories/category-submit-error.ts`, the disable line removed), or leave
it for F2?

Order after the ruling: Part A + D (turn-checks.ts, TCK-5 rewritten, TCK-7 and TCK-8 red-first,
NH-6/NH-7), then C (briefs.test.ts, CF-BRIEF-4's fixture red-first, wired.test.ts), then B (the
moves file by file, the effect, the directive, then `--max-warnings 0` last with the planted bypass
shown and discarded), each part closed by typecheck, `bunx vitest run scripts --maxWorkers=2` and
its touched tests.
