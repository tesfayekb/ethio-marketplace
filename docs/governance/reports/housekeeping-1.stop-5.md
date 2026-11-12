QUESTION — housekeeping-1 STEP 6: a machine-reason FAIL that none of (1)–(3) covers (a swept Semgrep rules cache)
DONE: STEP 0, STEP 1, parts A + D, C, B; rulings 1 → 4 saved; ruling 4 applied (64f80cf60); STEP 6 run twice
LEFT: STEP 6's verdict on this finding (below), STEP 7, STEP 8
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `bd095897c48f144def17ff67023e658432d1a8da` (short `bd09589`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-10T11:08:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42801234816
FILES:
docs/features/posting.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-1-ruling-1.md
docs/governance/briefs/housekeeping-1-ruling-2.md
docs/governance/briefs/housekeeping-1-ruling-3.md
docs/governance/briefs/housekeeping-1-ruling-4.md
docs/governance/briefs/housekeeping-1.md
docs/governance/reports/housekeeping-1.stop-1.md
docs/governance/reports/housekeeping-1.stop-2.md
docs/governance/reports/housekeeping-1.stop-3.md
docs/governance/reports/housekeeping-1.stop-4.md
docs/tracking/intentional-deletions.txt
e2e/i18n-sign-in-language.spec.ts
package.json
public/i18n-usage.json
roadmap.md
scripts/ci/laws-changed.ts
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/choice-lists.test.ts
scripts/conformance/overlays.test.ts
scripts/conformance/press.test.ts
scripts/conformance/visible-area.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/marketplace/feed.tsx
src/components/picker-popup.ts
src/components/searchable-picker.test.tsx
src/components/searchable-picker.tsx
src/components/shell/app-rail.tsx
src/components/shell/block-guide.tsx
src/components/shell/data-table.tsx
src/components/shell/favourite-category.ts
src/components/shell/rail-first-paint.test.tsx
src/components/shell/rail-variant.ts
src/components/shell/submenu/submenu-signal.ts
src/components/shell/theme-toggle.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/badge.tsx
src/components/ui/button-variants.ts
src/components/ui/button.tsx
src/components/ui/calendar.tsx
src/components/ui/choice-list-look.test.tsx
src/components/ui/dialog-look.test.tsx
src/components/ui/form.tsx
src/components/ui/keep-in-strip.ts
src/components/ui/one-line-slot.test.tsx
src/components/ui/one-line-slot.tsx
src/components/ui/overlay-ask.ts
src/components/ui/overlay-facade.tsx
src/components/ui/overlays-impl.ts
src/components/ui/pagination.tsx
src/components/ui/section-notice-state.ts
src/components/ui/section-notice.tsx
src/components/ui/slot-split.ts
src/components/ui/strip-arrows.tsx
src/components/ui/submenu-impl.tsx
src/components/ui/submenu-levels.ts
src/components/ui/toggle-group.tsx
src/components/ui/toggle-variants.ts
src/components/ui/toggle.tsx
src/features/ad-page/share-ad.tsx
src/features/ad-page/share-price-text.ts
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-attributes/attribute-error.ts
src/features/admin-attributes/category-attributes-dialog.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-categories/category-dialogs.test.tsx
src/features/admin-categories/category-dialogs.tsx
src/features/admin-categories/category-form-fields.tsx
src/features/admin-categories/category-form-values.ts
src/features/admin-categories/category-image-dialog.tsx
src/features/admin-categories/category-submit-error.ts
src/features/admin-countries/country-dialog-state.ts
src/features/admin-countries/country-dialogs.test.tsx
src/features/admin-countries/country-dialogs.tsx
src/features/admin-countries/country-editor.tsx
src/features/admin-countries/country-verb-dialogs.tsx
src/features/admin-listings/edit-listing.ts
src/features/admin-locations/location-dialog-state.ts
src/features/admin-locations/location-dialogs.tsx
src/features/admin-locations/location-editor.tsx
src/features/admin-locations/location-form-fields.tsx
src/features/admin-locations/location-form-values.ts
src/features/admin-locations/location-verb-dialogs.tsx
src/features/admin-locations/locations-service.test.ts
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/photo-changes.tsx
src/features/admin-screening/photo-reviews.tsx
src/features/admin/admin-context.tsx
src/features/admin/admin-shell-provider.tsx
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/posting/amount-scale.ts
src/features/posting/edit-step-changes.ts
src/features/posting/field-refusals.ts
src/features/posting/field.test.ts
src/features/posting/field.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/map-snap.ts
src/features/posting/map/outline.test.ts
src/features/posting/phone-number-field.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/listing-section.ts
src/features/posting/preview/photo-gallery.tsx
src/features/posting/same-channels.test.ts
src/features/posting/same-channels.ts
src/features/posting/spec-sentences.ts
src/features/posting/step-details.tsx
src/features/posting/step-photos.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-review.tsx
src/features/posting/step-specifications.test.ts
src/features/posting/step-specifications.tsx
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
src/features/posting/wizard.tsx
src/i18n/provider.tsx
src/providers/theme-context.ts
src/providers/theme-provider.tsx
src/routes/admin.tsx
src/routes/l.$slug.tsx
src/test/own-key-sites.test.ts

## What happened

STEP 6, first run on the final code tree (64f80cf60), `bun run checks`:

```
FAIL     laws-first › Semgrep ERROR on changed files, CI's pins (INC-1030)  (59s) — exit 7; log /Users/tesfayemackbookpro/.cache/ethio-checks/logs
checks (fast): 24 PASS · 1 FAIL · 423s
checks: 33 PASS · 1 FAIL · 24 NOT RUN · 478s
```

Its log:

```
[laws] changed files Semgrep judges: 114
[ERROR] No config given. Run with `--config auto` or see https://semgrep.dev/docs/running-rules/ for instructions on running with a specific config
```

## The cause (a machine reason, not the tree)

- `scripts/ci/laws-changed.ts` :115–:134 caches CI's pinned rules at
  `/tmp/semgrep-rules-a84ff9cc2453ca91d581380de4b8b3f272f6f4be` and fetches them only when
  `join(dir, "javascript")` does not exist (:116).
- On this computer that directory held its folder skeleton and no file at all:
  `find <dir> -type f | wc -l` printed `0`, and the `.yaml` count under `javascript/` and
  `typescript/` was `0`. The directory was created 2026-11-06; macOS's periodic `/tmp` sweep removes
  files left unread for three days and keeps the folders. With `javascript/` still present, :116
  skipped the fetch, both `--config` paths named empty folders, and Semgrep answered exit 7.
- One file reproduces it (`semgrep scan … --config <dir>/javascript --config <dir>/typescript
  src/features/posting/map/map-snap.ts` → the same `No config given`, exit 7), so no target of this
  lane causes it.
- The lane's own change to `laws-changed.ts` (Part A: `briefInForce`, :46–:51, and `turnBase` reading
  it) does not touch the Semgrep mode (`git diff 2b11a9d29 HEAD -- scripts/ci/laws-changed.ts`: two
  hunks, both in :43–:65).
- The slow `semgrep` job is not exposed to this: the runner removes `/tmp/semgrep-rules` and fetches it
  again on every run (`scripts/ci/turn-checks.ts` :666).

## The proof that the tree is clean

The swept directory was MOVED (not deleted) to
`/tmp/ethio-scratch/housekeeping-1/swept-semgrep-rules-a84ff9cc` (the operator's to remove), and the
project's own step fetched CI's pinned archive again (`bun scripts/ci/laws-changed.ts semgrep`):
196 rule files under `javascript/` + `typescript/`, and

```
Ran 45 rules on 114 files: 0 findings.
```

exit 0. `bun run checks` then ran WHOLE again on the same tree (64f80cf60):

```
checks (fast): 25 PASS · 0 FAIL · 369s
checks: 34 PASS · 0 FAIL · 24 NOT RUN · 423s
```

The 24 NOT RUN, each with its reason, are unchanged from the first run: actionlint and gitleaks
("pinned binary linux/x64 (…); this machine darwin/arm64" — Part A's platform reader), Typecheck
("/tmp/observability/build-errors.log is missing"; `bun run typecheck` run on its own, exit 0), the
three Install steps, dependency-audit (2), e2e-preflight (4), the e2e merge steps (6), promote (4) and
the two SARIF-upload steps. Captures: `/tmp/ethio-scratch/housekeeping-1/checks-final.txt` (first run),
`checks-final-2.txt` (second), `laws-semgrep.txt`, `laws-semgrep-refetched.txt`.

## The CI red named above

`bd095897c` (stop 4's commit) fails `First-paint bundle budget (gzipped ceiling)` with
`Per-page budget failed (D234)` — the i18n split's overages stop 4 reported. Ruling 4's revert
(64f80cf60, not yet pushed) removes them: the local budget on the final tree is OK with 0 pages in the
NEAR band. This push carries it; the pull request's CI is its proof.

## The question

The brief, :14: "a step the census finds FAILing for a machine reason that none of (1)–(3) covers is a
STOP with its log, not a new allowlist line." This is such a step. The tree is clean and the machine
is whole again, but the cause stays in the code: `laws-changed.ts` :116 trusts a folder's presence as
the cache's validity, so the next `/tmp` sweep makes this step FAIL again with a message that names no
defect. Fixing it is a behaviour change no numbered part of this task names, so I have not written
one. Which ruling?

1. Continue: the finding goes to §13 (and §14 as an INC text you dictate) for a later turn; STEPS 7–8
   proceed on 64f80cf60 + this report.
2. Fix it in this lane (`scripts/ci/laws-changed.ts` is in the scope by area, `scripts/ci/`): the cache
   counts as present only when `javascript/` and `typescript/` each hold at least one `.yaml`,
   otherwise the step fetches again into the same directory. Its test joins
   `scripts/ci/turn-checks.test.ts`, which already imports `laws-changed.ts`'s readers (:1): an
   exported reader `rulesCached(dir)`, planted with a skeleton directory holding no `.yaml` (false,
   so the fetch runs) and a whole one (true, so it does not).
