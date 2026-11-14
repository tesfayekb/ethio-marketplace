# forms-kit — Foundations 2, wave 1: one Field, one gate, one refusal reader, one parser — report

Base: dev 50ee2e698 (the lane began on `origin/dev` `b26e3b34f`, the merge of pull request #41, which differs from it only by records turn R14's files — `docs/**`, `roadmap.md`, `scripts/conformance/briefs-allowlist.txt`; §2 and §3 read from `b26e3b34f`) · Final commit: 2653e21ad · Brief: docs/governance/briefs/forms-kit.md (sha256 c8c2e4f378314670b55d18b939c055fcccace70f190f3aef1cf1b2c4dc54911d) · Ruling 1: docs/governance/reports/forms-kit.chat-ruling-1.md (§10)
Review: READY · 0 BLOCKER · 0 MAJOR · 6 MINOR · on 2653e21

dev's CI at the base: `b26e3b34f` SUCCESS, run 43553591107 (§11).

## 1. Done / not done, by part and step

| step | what | state | commit |
| --- | --- | --- | --- |
| STEP 0 | branch, brief saved (sha256 equal), the three plan files copied, roadmap line 3, check-go | done | `c526dd84b` |
| STEP 1 | the re-validation census (`docs/governance/reports/forms-kit.census.md`), the base build's sizes | done; no STOP case held | `2cd834e1d` |
| STEP 2 — Part A | the Field, the gate, the registry type, the reader (refusal-tail folded), the parser, the worder moved beside the reader (INC-1050), the one `Refusal` shape; unit tests | done | `8eb18dacd` |
| STEP 3 — Part B | `scripts/conformance/forms.test.ts` CF-FORM-1 → 5 (each on a planted bypass), `forms-allowlist.txt` (102 lines at the seed), `wired.test.ts` | done | `aad410a0f` |
| STEP 4 — Part C | posting's `field.tsx` a re-export plus posting's registry (`POSTING_FIELDS`); the wizard over the gate (`needsLeaf` reported as `category_id`); steps where, who, category, photos, pricing, review on the Field; the parser in the number boxes; `src/components/ui/form.tsx` deleted and declared | done | `e9889c0b9` |
| Part C, ruling 1 Q2 | the agreement tick (`agree-to-document.tsx`) on the Field; 24 `post.*` keys moved base → member by script, byte-identical | done | `834feb787` (ruling saved `58ff1094b`) |
| ceilings, ruling 1 Q1 | ten signed-in or staff pages raised by DEC-296's form, each cause named by chunk (DEC-355); no public page | done | `8afd2fa4d` |
| self-review fix | CF-FORM-4 follows a typed value through a variable; step-pricing's commission read through the parser | done | `2653e21ad` |
| STEP 5 | typecheck, lint, laws, unit tests, build and first-download table, `bun run checks`, e2e by id, check-go `--at`, self-review | done (§5) | — |
| STEP 6 | push once, draft pull request [#42](https://github.com/tesfayekb/ethio-marketplace/pull/42), CI | done (§11) | — |
| STEP 7 | this report | done | `forms-kit: report` |

LEFT (each named in §10 and §14): the map pin's two precision radios (an allowlist line, no wave named by the plan); the agreement tick's report to the wizard's gate (`certifyClosed` stays the wizard's own reading); `needsLeaf`'s `disabled` half on step 1 (PW-1 asserts `toBeDisabled`).

## 2. Files changed  (`git diff --name-only b26e3b34f`)

```
docs/features/forms.md
docs/features/posting.md
docs/generated/i18n-usage.json
docs/governance/briefs/f2-forms-ruling-1.md
docs/governance/briefs/f2-forms.md
docs/governance/briefs/forms-kit.md
docs/governance/reports/f2-forms.stop-1.md
docs/governance/reports/forms-kit.census.md
docs/governance/reports/forms-kit.chat-ruling-1.md
docs/tracking/intentional-deletions.txt
public/i18n-usage.json
roadmap.md
scripts/conformance/forms-allowlist.txt
scripts/conformance/forms.test.ts
scripts/conformance/forms.ts
scripts/conformance/non-null-allowlist.txt
scripts/conformance/wired.test.ts
scripts/route-budgets.mjs
src/components/forms/control-class.ts
src/components/forms/field-registry.ts
src/components/forms/field.test.tsx
src/components/forms/field.tsx
src/components/forms/required-mark.tsx
src/components/forms/reveal-control.ts
src/components/forms/use-form-gate.test.tsx
src/components/forms/use-form-gate.ts
src/components/ui/form.tsx
src/features/legal/agree-to-document.tsx
src/features/posting/amount-scale.ts
src/features/posting/door-error.ts
src/features/posting/field-refusals.ts
src/features/posting/field.tsx
src/features/posting/map/map-pin-dropper.tsx
src/features/posting/phone-number-field.tsx
src/features/posting/posting-service.ts
src/features/posting/refusal-text.ts
src/features/posting/step-category.tsx
src/features/posting/step-details.tsx
src/features/posting/step-photos.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-review.tsx
src/features/posting/step-specifications.tsx
src/features/posting/step-where.tsx
src/features/posting/step-who.tsx
src/features/posting/types.ts
src/features/posting/validate.ts
src/features/posting/wizard.tsx
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/lib/door-error.test.ts
src/lib/door-error.ts
src/lib/parse-input.test.ts
src/lib/parse-input.ts
src/lib/refusal-tail.ts
src/lib/refusal.test.ts
src/lib/refusal.ts
src/lib/whole-number.ts
src/server/answer.ts
src/server/door.ts
```

New files: 23, each tracked (`git diff --name-only --diff-filter=A b26e3b34f | xargs git ls-files --error-unmatch | wc -l` → 23). Deleted: `src/components/ui/form.tsx` (no importer; `[intentional-delete]` in `e9889c0b9`'s message and its line in `docs/tracking/intentional-deletions.txt`). Moved whole: `src/features/posting/door-error.test.ts` → `src/lib/door-error.test.ts` (R100). Every path is in SCOPE or the standing allowance; `src/i18n/locales/{en,am}-{base,member}.ts` beyond the one string by ruling 1 Q2 (§10).

## 3. Behaviour contract — before → after

| surface | at the base | now |
| --- | --- | --- |
| a posting answer's box (`post-field`) | posting's own Field: label, mark or "Optional", hint, refusal line; no `aria-invalid` / `aria-describedby` on the 16 controls inside it | the kit's Field: the same ids (`post-field`, `post-field-refusal`, `post-required-mark`, `data-field=<id>`), plus the aria pair on every control (`aria-invalid`, `aria-describedby="<id>-hint <id>-refusal"`, `aria-required`) and `data-form-field` on the box |
| a refusal's words on a posting field | `t(draftRefusalKey(reason))` | `refusalText(readRefusal(refusal, DRAFT_REFUSALS), t, values)`: the same key for every known reason; an unknown reason the same generic (`post.refusal.unknown`); the tail fills `{count}` / `{detail}` as before |
| the wizard's Next | a local mirror (`mirror`, `tried`) of the steps' missing answers; closed while any remain; a tap marks and moves to the first | the same, held by `useFormGate(draft.step, reveal)`; the tap is `gate.try()`; marks are `gate.marks` |
| step 1, no leaf chosen | Next `disabled`; Enter set `triedWithoutLeaf` (the finder outlined) | Next still `disabled` (PW-1); the gate also holds `category_id`, so the button carries `data-closed="1"`, and Enter marks it: the finder is outlined and the summary names "Category" (§10, MINOR) |
| steps where and who (18 bare controls) | label and control drawn by hand, two local `fieldClass` constants, refusals as loose lines | each control in the Field; `controlClass` from the kit; the place lines' `long` / `contact` refusals attached to their box (failed-save lines stay apart); optional ones say "Optional" (§10, MINOR) |
| step-category's search, the map pin's search | bare inputs | `role="searchbox"` (DEC-338, exempt by kind); the pin's street in the Field; its two precision radios unchanged |
| photos-soon tick, take-down switch, negotiable tick | bare | in the Field (`choice` / `inline`) with their old ids |
| the agreement tick (`/auth`, `/legal/accept`, the wizard's certify block) | its own box: `agree-to-document`, `agree-message` above the tick, `aria-describedby` on refusal, posting's `RequiredMark`, row scroll then focus | the kit's Field, `choice` layout, the same test ids and the same words (`message` through a one-word family); `revealControl` scrolls the same box (closest `[data-form-field]`) then focuses; no import from posting |
| number boxes (specifications, the commission percentage) | `Number(raw)` (`"1e3"` read as 1000; an empty box blurred judged as 0) | `numberOf(parseNumber(raw))`: a plain decimal or null (§10, MINOR) |
| `scaleAmount`, `wholeNumber` | regex and `Number` | the parser; same answers (`""` and `"."` are refused before the changed line; `wholeNumber` accepts exactly `-?\d+`) |
| a door exception's refusal (`src/server/door.ts`) | `doorRefusal` imported from `src/features/posting/door-error.ts` | the same function from `src/lib/door-error.ts`; the posting path re-exports it for the two listing routes; output unchanged (its tests moved whole) |
| `Refusal` (server answer and posting types) | two declarations | one, `src/lib/refusal.ts`, re-exported by both |
| strings | 24 `post.*` keys in the base layer (every page) | the same 24 keys, byte for byte, in the member layer (§8) |

Nothing else differs: the census of every consumer is `docs/governance/reports/forms-kit.census.md`; the unit suites of every touched file pass unchanged (§5).

## 4. Censuses

STEP 1's census: `docs/governance/reports/forms-kit.census.md` (246 controls in 75 consumer files; the e2e ids reading `post-field*`; the lists a new name joins). Turn-time greps:

- The strings law after the agreement left posting: `bunx vitest run scripts/conformance/strings-layers.test.ts` named exactly 24 keys (`post.details.{descriptionLabel,titleLabel,videoLabel}`, `post.price.{amountLabel,currencyLabel,expiryLabel,modeLabel,periodLabel}`, `post.refusalSummary`, `post.refusalSummary.elsewhere`, `post.step.{category,contact,details,photos,place,price,review,specifications}`, `post.who.{aliasLabel,businessLabel,channel.messages,countryLabel,firstNameLabel,lastNameLabel}`) — every one a label of posting's registry, carried to `/auth` and `/legal/accept` at the base only by `agree-to-document.tsx:3`'s import of posting's `field.tsx`.
- Specs reading a moved control's id (scratch scan of every spec body for `post-where-*`, `post-who-*`, `post-photos-soon`, `post-take-down-switch`, `post-price-negotiable`, `post-pin-street`, `agree-message`, `agree-to-document`, `post-required-mark`, `post-phone`, `-length-hint`): 11 specs, about 85 ids; none had an assertion changed.
- The parser: `rg -n "Number\(|parseInt\(|parseFloat\(" src/features/posting` — the remaining typed-control parse was `step-pricing.tsx:633` (fixed, §10); `step-specifications.tsx:1388` reads a year select's option value (a chosen value, not typed; CF-FORM-4 judges typed controls).
- The entry: `dist/.chunk-modules.json`'s `index-*.js` holds the same 228 modules at base and tree; none of this turn's files is among them.

## 5. Tests

Unit (added, Part A and C): FKF-1 → FKF-8 (`src/components/forms/field.test.tsx`; FKF-8 the `marked` parameter: a required answer whose mark clears stays `aria-required` and never says "Optional"), FKG-1 → FKG-4 (`use-form-gate.test.tsx`), RFR-1 → RFR-10 (`src/lib/refusal.test.ts`, with the folded refusal-tail cases and a planted Postgres sentence never rendered), PIP-1 → PIP-6 (`src/lib/parse-input.test.ts`). Guard: CF-FORM-1 → CF-FORM-5 in `scripts/conformance/forms.test.ts`, each with a planted bypass removed inside its own test (PPF-1); CF-FORM-4 gained the planted variable form (line 7) in the review fix, shown red on the tree first (`step-pricing.tsx:633` named) and green after the fix. No existing test's assertion changed; `door-error.test.ts` moved whole.

Totals on the final tree:
- `bunx vitest run src/features/posting src/features/legal src/components/forms src/i18n src/lib` → `Test Files 144 passed (144)` · `Tests 961 passed (961)`
- `bunx vitest run scripts --maxWorkers=2` → `Test Files 119 passed (119)` · `Tests 615 passed | 1 skipped (616)`
- `bun run typecheck` → clean (`tsc --noEmit && tsc --noEmit -p tsconfig.scripts.json`); `bun run lint` → clean (`--max-warnings 0`)
- `bun scripts/brief/check-go.ts docs/governance/briefs/forms-kit.md --at b26e3b34f` → `[check-go] no finding`

`bun run checks` (on `8afd2fa4d`, before the review fix; the fix was followed by typecheck, lint, its unit tests, the laws, its e2e ids and the first-download check):
- fast line: `checks (fast): 26 PASS · 0 FAIL · 423s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
- last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 492s`
- NOT RUN, each with the script's reason: scope › Decide whether the lanes run, scope › Index the code tree the lanes prove (GitHub-run artifacts only); build-and-check › Workflow lint (pinned linux/x64 actionlint, this machine darwin/arm64); build-and-check, component-tests, bundle-budget › Install dependencies (installed; a package change is its own turn); secrets-scan › Secrets scan (pinned linux/x64 gitleaks); dependency-audit › Install dependencies, › Audit (the advisory service is unreachable from here); e2e-preflight › Cache bun install, › Bun cache hit?, › Install dependencies, › Migration parity preflight (needs staging credentials the script never holds); e2e › Download shard results, › Download job log tails, › Download error contexts, › Verify the downloaded artifacts belong to this attempt, › Publish merged E2E report, › Verdict (GitHub artifacts); promote › Promote token present, › Configure the actions bot, › Fast-forward guard, › Promote dev to main (CI only, DEC-020); semgrep › Upload SARIF, › Warn: the SARIF upload failed (GitHub only).

E2E by id (`bun run e2e:local`, `--retries=0`, the E2E values set; no spec ran whole):
- the census's `tests` item — AL-21, MLA-13, PW-121, PW-78, PW-80, PW-10, PW-66, PW-68, PW-138, PW-162, PW-192, LY-6, PW-72, PW-79, PW-16, PW-18, PW-70, PW-75, PW-77, PW-191, A11Y-1, A11Y-2, LGC-1, LGC-2, LGC-5, PW-1, PP-11, PP-19, LAC-1, PW-99 in `mobile-360` and `desktop-1280`: `1 skipped` · `63 passed (3.8m)` (LY-6 is a 360-only test, skipped at 1280 by its own guard); every id ran in both projects (scratch check of the log).
- SU-5 (the sign-up tick; `auth-signup.spec.ts` runs only in the `email-serial` project by `playwright.config.ts:17,101`): `1 passed (6.5s)`.
- the review fix — PW-55, PW-58, PW-67 (the commission box) and PW-64 (the negotiable tick) in both projects: `8 passed (42.2s)`.
- `[ssr-error]` lines in the three logs: 0, 0, 0.
- CI's lanes run every spec on the pull request and the repeat lane the changed specs (none changed); the wider set of moved-control ids (§4) is CI's proof.

First download (`bun run build && node scripts/check-bundle-size.mjs`, local; base = a scratch build of `b26e3b34f` under `/tmp/ethio-scratch/forms-kit/base`, which reproduced the census's sizes exactly; final = `2653e21ad`): `Bundle budget OK.`, 0 NEAR. Every page, KiB gzip:

| page | base | final | change | ceiling | room |
|---|---|---|---|---|---|
| `/` | 225.4 | 225 | -0.4 | 227 | 2 |
| `/$name` | 223.4 | 223 | -0.4 | 225 | 2 |
| `/account` | 266.1 | 265.9 | -0.2 | 268 | 2.1 |
| `/account_/legal` | 206.4 | 206.3 | -0.1 | 208 | 1.7 |
| `/account_/legal_/$versionId` | 207.1 | 206.9 | -0.2 | 209 | 2.1 |
| `/account_/saved` | 223.6 | 223.2 | -0.4 | 225 | 1.8 |
| `/admin` | 208.3 | 208.1 | -0.2 | 210 | 1.9 |
| `/admin/` | 209.1 | 208.9 | -0.2 | 211 | 2.1 |
| `/admin/ai` | 322.9 | 323.8 | +0.9 | 325 (was 324) | 1.2 |
| `/admin/attributes` | 336.1 | 337 | +0.9 | 338 (was 337) | 1 |
| `/admin/audit` | 294.2 | 294 | -0.2 | 295 | 1 |
| `/admin/categories` | 344.1 | 345 | +0.9 | 346 (was 345) | 1 |
| `/admin/countries` | 325.7 | 326.5 | +0.8 | 327 | 0.5 |
| `/admin/images` | 208.9 | 208.7 | -0.2 | 210 | 1.3 |
| `/admin/impersonation_/$sessionId` | 291.7 | 291.6 | -0.1 | 293 | 1.4 |
| `/admin/legal` | 281.1 | 281 | -0.1 | 282 | 1 |
| `/admin/legal_/$versionId` | 278.1 | 278 | -0.1 | 279 | 1 |
| `/admin/legal_/edit` | 280.2 | 280 | -0.2 | 281 | 1 |
| `/admin/listings` | 348.3 | 348 | -0.3 | 349 | 1 |
| `/admin/listings_/$listingId` | 351.2 | 352.2 | +1 | 353 (was 352) | 0.8 |
| `/admin/listings_/$listingId_/edit` | 408.1 | 410.5 | +2.4 | 411 (was 410) | 0.5 |
| `/admin/locations` | 269.9 | 269.7 | -0.2 | 271 | 1.3 |
| `/admin/monetisation` | 333.5 | 333.2 | -0.3 | 334 | 0.8 |
| `/admin/places` | 327.3 | 328.1 | +0.8 | 329 (was 328) | 0.9 |
| `/admin/roles` | 292 | 291.8 | -0.2 | 293 | 1.2 |
| `/admin/roles_/$roleId` | 272.5 | 272.3 | -0.2 | 273 | 0.7 |
| `/admin/screening` | 368.2 | 369.2 | +1 | 370 (was 369) | 0.8 |
| `/admin/translations` | 303 | 302.8 | -0.2 | 304 | 1.2 |
| `/admin/translations_/$lang` | 306.4 | 306.2 | -0.2 | 307 | 0.8 |
| `/admin/users` | 292.1 | 291.9 | -0.2 | 293 | 1.1 |
| `/admin/users_/$userId` | 288.3 | 288.2 | -0.1 | 289 | 0.8 |
| `/auth` (public) | 220.5 | 219.5 | -1 | 223 | 3.5 |
| `/auth_/callback` | 207.4 | 207.2 | -0.2 | 209 | 1.8 |
| `/auth_/reset` | 209.3 | 209.2 | -0.1 | 211 | 1.8 |
| `/c/$slug` | 225.4 | 225 | -0.4 | 227 | 2 |
| `/dev/primitives` | 225.3 | 225.1 | -0.2 | 226 | 0.9 |
| `/dev/style` | 246.6 | 246.2 | -0.4 | 248 | 1.8 |
| `/dev/tall` | 204.2 | 204 | -0.2 | 206 | 2 |
| `/l/$slug` | 256 | 255.6 | -0.4 | 257 | 1.4 |
| `/legal/$kind` | 208.6 | 208.4 | -0.2 | 210 | 1.6 |
| `/legal/accept` | 215.5 | 214.5 | -1 | 217 | 2.5 |
| `/legal/publishing` | 209.3 | 209.2 | -0.1 | 211 | 1.8 |
| `/my-listings` | 313 | 311.1 | -1.9 | 315 | 3.9 |
| `/my-listings_/$listingId` | 321.7 | 319.7 | -2 | 323 | 3.3 |
| `/my-listings_/$listingId_/edit` | 400.3 | 402.7 | +2.4 | 404 (was 402) | 1.3 |
| `/post` | 400.3 | 402.6 | +2.3 | 404 (was 402) | 1.4 |
| `/post_/$listingId` | 400.3 | 402.6 | +2.3 | 403 (was 402) | 0.4 |
| `/privacy` | 208.6 | 208.4 | -0.2 | 210 | 1.6 |
| `/settings` | 274.5 | 274.3 | -0.2 | 277 | 2.7 |
| `/terms` | 208.6 | 208.4 | -0.2 | 210 | 1.6 |

Ruling 1 Q2's measure: `/auth` 220.5 → 219.5 (−1.0) and `/legal/accept` 215.5 → 214.5 (−1.0) — both fall. No public page's ceiling moved; every public page fell 0.1 – 0.4.

The causes, chunk by chunk (DEC-355; base → final gzip KiB, chunk names with their content hash stripped; the modules of each new chunk from `dist/.chunk-modules.json`):
- `refusal.js` (new, 1.1) = `src/lib/refusal.ts`, the one reader: on every page that draws a refusal (the public card pages carried posting's `refusal-text.js` 1.4 at the base, now `refusal.js` 1.1 — the reader replaced it there), and on the admin consoles through `src/lib/refusal-tail.ts`, which now imports it.
- `parse-input.js` (new, 0.3) = `src/lib/parse-input.ts`, the one parser: the wizard pages, and the admin listing, monetisation and screening pages through `amount-scale.ts` / `whole-number.ts`.
- `reveal-control.js` (new, 1.1) = `src/components/forms/field.tsx`, `required-mark.tsx`, `reveal-control.ts`, the one Field: the wizard pages, `/auth`, `/legal/accept`.
- `dialog-look.js` (new on `/auth` and `/legal/accept`, 0.9) = `src/components/ui/dialog-look.ts`, imported by the kit's `control-class.ts` for the dialog density (§13).
- `agree-to-document.js` 3.6 → 1.0 (`control-class.ts` + `agree-to-document.tsx`): posting's `field.tsx`, `field-refusals.ts`, `types.ts` and `src/lib/dials.ts` left it; on the wizard pages they sit in `location-details.js` 0.1 → 2.7 (with `field-registry.ts`), net 0 there; on `/auth` and `/legal/accept` they are gone.
- `wizard.js` 60.4 → 60.5: the steps on the Field. `posting-service.js` 4.7 → 4.6: its own `refusalsOf` went to the reader. `category-dialogs.js` 7.9 → 7.8: the folded tail.
- `shared-shell.js` 29.6 → 29.4 (every page): the 24 keys left the base strings layer.
- `index.js` 128.3 → 128.4 (every page; +80 bytes gzip, 433720 → 433936 raw): the same 228 modules; the bundler's preload table names the turn's new chunks and their content hashes.

The raised pages: admin consoles (`/admin/ai`, `/admin/attributes`, `/admin/categories`, `/admin/places`) = `refusal.js` +1.1, `category-dialogs.js` −0.1, `shared-shell.js` −0.2, `index.js` +0.1; `/admin/listings_/$listingId`, `/admin/screening` = the same plus `parse-input.js` +0.3 and `posting-service.js` −0.1; the wizard pages (`/post`, `/post_/$listingId`, `/my-listings_/$listingId_/edit`, `/admin/listings_/$listingId_/edit`) = `reveal-control.js` +1.1, `refusal.js` +1.1, `parse-input.js` +0.3, `wizard.js` +0.1, `agree-to-document.js` −2.6 with `location-details.js` +2.6, `posting-service.js` −0.1, `shared-shell.js` −0.2, `index.js` +0.1. Each line in `scripts/route-budgets.mjs` carries its cause and `ceilingForLocal(<size>)`. `/post_/$listingId` (402.6, ceiling 403) is outside the NEAR band by `nearFindings`' exact reading (the check printed no NEAR line), so DEC-296 does not move it.

## 6. K2 — siblings that bypass the mechanism

- The Field (CF-FORM-1), the mappers (CF-FORM-3), the parser (CF-FORM-4), the control class (CF-FORM-5), `<form noValidate>` (CF-FORM-2): every bypass in `src/` is a line of `scripts/conformance/forms-allowlist.txt` (89), each naming its wave — wave 2 `src/routes/auth.tsx`, `src/routes/auth_.reset.tsx`, the settings forms, `src/features/auth/mfa/step-up-dialog.tsx` and `mfa-service.ts`'s `failure`; wave 3 the admin consoles (`FormField`, `src/components/shell/form-section.tsx:26`, with its controls) and their 16 `*ErrorKey` mappers, 5 `*ErrorLine`s, 5 `use*Error`s; wave 4 the monetisation and import dialogs and `src/features/ad-page/report-ad.tsx`; and `src/features/posting/map/map-pin-dropper.tsx` (the precision radios).
- Grep run: `bun /tmp/ethio-scratch/forms-kit/diff-allow.ts` (the census against the allowlist: `listed 89 found 89`), and `rg -n "Number\(|parseInt\(|parseFloat\(" src/features/posting` (§4).
- `react-hook-form` and `@hookform/resolvers` (`package.json:82`, `:33`) have no importer in `src/` since `src/components/ui/form.tsx` went (`rg -l "react-hook-form|@hookform/resolvers" src` → none); removing them is a package change, its own turn (§13).

## 7. Allowlists and guards

- `scripts/conformance/forms-allowlist.txt`: 102 lines at the seed (`aad410a0f`: CF-FORM-1 57, CF-FORM-2 4, CF-FORM-3 32, CF-FORM-4 3, CF-FORM-5 6) → 89 at the end (CF-FORM-1 49, CF-FORM-2 4, CF-FORM-3 32, CF-FORM-4 1, CF-FORM-5 3). Part C retired 14 wave-1 lines (the five steps, the where/who `fieldClass` and parse lines, the agreement, the phone and the specifications lines) and rewrote one: `CF-FORM-1 src/features/posting/map/map-pin-dropper.tsx (1) | no wave named by the plan — the pin's two precision radios, drawn as list rows (no Field layout in that look yet) | DEC-339`. Every line's grammar is `key | reason | until`; stale and expired lines fail (CF-FORM-5b).
- `scripts/conformance/non-null-allowlist.txt`: 143 → 142 lines — `src/features/posting/field.tsx (1)` fell (the summary's `entry.owner!` became a narrowed `owner`).
- `scripts/conformance/forms.ts`: `CONTROL_TAGS` gained `PhoneNumberField`; `CONTROL_PRIMITIVES` gained `src/features/posting/phone-number-field.tsx` (a control primitive its caller draws inside a Field); CF-FORM-4 follows a value bound to a variable (`boundToValue`).
- Guard self-tests: CF-FORM-1 → 5 planted (6 tests), wired in `scripts/conformance/wired.test.ts`; `bunx vitest run scripts --maxWorkers=2` green (§5).

## 8. Strings

No new key and no changed text: the parser's refusal reuses `post.refusal.badType` (`PARSE_INVALID_KEY`); the agreement reads its screen's own `message` key.

Ruling 1 Q2's move — 24 keys from `en-base.ts` / `am-base.ts` to `en-member.ts` / `am-member.ts`, by the scratch script `/tmp/ethio-scratch/forms-kit/move-keys.ts` (each key's lines cut from the base file and appended before the member file's closing line). No key renamed, no text written. Proof: the removed and added lines are the same set byte for byte (`diff` of the sorted `-`/`+` lines of `git diff src/i18n/locales` → identical), and every value loaded from the modules hashes the same before (base layer) and after (member layer) — sha256 of the value, first 16 hex characters shown, the whole hashes in `/tmp/ethio-scratch/forms-kit/move-hash-{before,after}.log` (`diff` → identical):

| lang | key | before | after |
| --- | --- | --- | --- |
| en | `post.details.descriptionLabel` | 526e0087cc3f254d | 526e0087cc3f254d |
| en | `post.details.titleLabel` | 7e8cd2056da73a7f | 7e8cd2056da73a7f |
| en | `post.details.videoLabel` | feb99fde63461dfa | feb99fde63461dfa |
| en | `post.price.amountLabel` | 49e96d7cdf58069c | 49e96d7cdf58069c |
| en | `post.price.currencyLabel` | 3ac1a9ec4fa7a9fa | 3ac1a9ec4fa7a9fa |
| en | `post.price.expiryLabel` | 8239448aa1bd2dd7 | 8239448aa1bd2dd7 |
| en | `post.price.modeLabel` | 3d6af542770226bd | 3d6af542770226bd |
| en | `post.price.periodLabel` | 89ac4dc9eddfe4bb | 89ac4dc9eddfe4bb |
| en | `post.refusalSummary` | fa06ca818896a89b | fa06ca818896a89b |
| en | `post.refusalSummary.elsewhere` | 3d10f6d516ed1b44 | 3d10f6d516ed1b44 |
| en | `post.step.category` | 292c06f0045a45d0 | 292c06f0045a45d0 |
| en | `post.step.contact` | 2b5c3d26721ae9c3 | 2b5c3d26721ae9c3 |
| en | `post.step.details` | 679d5af5537ac303 | 679d5af5537ac303 |
| en | `post.step.photos` | 5e3147ab51e0084c | 5e3147ab51e0084c |
| en | `post.step.place` | e9463dccf0541a97 | e9463dccf0541a97 |
| en | `post.step.price` | 93c91c851e7acc17 | 93c91c851e7acc17 |
| en | `post.step.review` | aff0766a5290e117 | aff0766a5290e117 |
| en | `post.step.specifications` | 015b4e0a76e50458 | 015b4e0a76e50458 |
| en | `post.who.aliasLabel` | d2c1a7fa484b019f | d2c1a7fa484b019f |
| en | `post.who.businessLabel` | a921756ed1ccfa2a | a921756ed1ccfa2a |
| en | `post.who.channel.messages` | b72614a9cc443d5e | b72614a9cc443d5e |
| en | `post.who.countryLabel` | c19c7589f473f15e | c19c7589f473f15e |
| en | `post.who.firstNameLabel` | 702ef921ed1d89bf | 702ef921ed1d89bf |
| en | `post.who.lastNameLabel` | 7b4888049459f04a | 7b4888049459f04a |
| am | `post.details.descriptionLabel` | ddcce0c6cf49281b | ddcce0c6cf49281b |
| am | `post.details.titleLabel` | 4d628fd0735e2ce7 | 4d628fd0735e2ce7 |
| am | `post.details.videoLabel` | b28630e76f0d88c7 | b28630e76f0d88c7 |
| am | `post.price.amountLabel` | eac50c0903a61a35 | eac50c0903a61a35 |
| am | `post.price.currencyLabel` | 2413544440a42a0f | 2413544440a42a0f |
| am | `post.price.expiryLabel` | 5bfaa1196826b227 | 5bfaa1196826b227 |
| am | `post.price.modeLabel` | bb8c405a406b85b8 | bb8c405a406b85b8 |
| am | `post.price.periodLabel` | dc87eb89c02bfb15 | dc87eb89c02bfb15 |
| am | `post.refusalSummary` | a8f0c5c126a304f5 | a8f0c5c126a304f5 |
| am | `post.refusalSummary.elsewhere` | 58310ee9b03a8c16 | 58310ee9b03a8c16 |
| am | `post.step.category` | 9162dcc7d794473a | 9162dcc7d794473a |
| am | `post.step.contact` | 69239ed57b7b8958 | 69239ed57b7b8958 |
| am | `post.step.details` | ab0ce07455cb145c | ab0ce07455cb145c |
| am | `post.step.photos` | 02406033abf67748 | 02406033abf67748 |
| am | `post.step.place` | 3bf337a04f5daaaa | 3bf337a04f5daaaa |
| am | `post.step.price` | 042bbb0a087c4570 | 042bbb0a087c4570 |
| am | `post.step.review` | f4a980e76710c017 | f4a980e76710c017 |
| am | `post.step.specifications` | e8b11ef71c512705 | e8b11ef71c512705 |
| am | `post.who.aliasLabel` | ec44b988eb9d9b20 | ec44b988eb9d9b20 |
| am | `post.who.businessLabel` | 1900f9752f341224 | 1900f9752f341224 |
| am | `post.who.channel.messages` | fff0850e28345af1 | fff0850e28345af1 |
| am | `post.who.countryLabel` | 9ca34f4f022f0a84 | 9ca34f4f022f0a84 |
| am | `post.who.firstNameLabel` | 9a4e571d9cc457d5 | 9a4e571d9cc457d5 |
| am | `post.who.lastNameLabel` | f816f2a278a7591a | f816f2a278a7591a |

`bun run i18n:usage` was run after each key change and both maps (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`) are committed (`i18n usage map: 1859 keys across 724 files (439 dynamic call sites)`). No other guard objected to the move (strings-layers, am-script and the string scan pass), so ruling 1 Q2's fallback was not needed.

## 9. Migrations

none (FLAG no-migration; `git diff --name-only b26e3b34f -- supabase` → empty).

## 10. Departures

1. **Ruling 1** arrived in the chat as text, with no attachment and no stated sha256, and not in a ruling's `RULING — …` form. It is saved word for word as `docs/governance/reports/forms-kit.chat-ruling-1.md` (sha256 of its three lines `ed80ecbc08bc0c6f7be398730052a977ffd10ae8138f322cb84a9741a07fdc6c`). It is not under `docs/governance/briefs/` because CF-BRIEF-17 requires a ruling saved there to open with `RULING — …`, and the text may not be retyped (rule 00). It answered my question in the chat, which I raised before any code changed for it. Q1: the ceilings may move, each cause named by chunk (DEC-355), no public page raised. Q2: the scope widens to `src/i18n/locales/` for the move, by script, byte-identical.
2. **The brief's TOLERANCES** ("a page of the posting flow that grows by a named cause of at most one kibibyte moves its ceiling in the commit of the part that causes it"): the posting pages grew 2.3 – 2.4 KiB and the admin consoles 0.8 – 1.0 (the reader, Part A). Ruling 1 Q1 governs them; the ten raises are one commit (`8afd2fa4d`), each line with its cause (§5).
3. **The DECIDE-AND-NAME clause** ("If Part C cannot land whole without passing a ceiling … land Parts A and B and the steps that fit"): Parts A and B alone take five admin pages over (measured on a scratch build of `aad410a0f`), and every step of Part C shares posting's field re-export, so no part of C "fits" alone; I asked instead of backing Part C out, and ruling 1 Q1 answered.
4. **§2 reads from `b26e3b34f`**, the commit STEP 0 branched from, not the brief's `50ee2e698`: the two differ only by records turn R14's records files, which this lane did not change.
5. **The self-review's fix** (`2653e21ad`): CF-FORM-4 missed `Number(raw)` after `const raw = event.target.value` (`step-pricing.tsx:633`, the commission percentage). The guard now follows such a binding (planted, red on the tree first); the site reads through the parser. `"1e3"` typed there is now null (refused as missing by the mirror), where `Number` read 1000.
6. **`needsLeaf` folded half** (LEFT): step 1's leaf is the gate's `category_id`, but Next stays `disabled` while PW-1 asserts `toBeDisabled()` (no spec's assertion changes, ruling 1).
7. **`certifyClosed`** (LEFT): the agreement tick is on the Field, but its report to the wizard's gate is not made: CertifyBlock's own tried-tick counter is what LGC-1, LGC-2 and LGC-5 read, and the summary has no label for it.
8. **The map pin's two precision radios** (LEFT, an allowlist line): drawn as list rows; the Field has no layout for that look yet.
9. Behaviour differences the Field brings, each MINOR, none read by a spec's assertion (§5's runs):
   a. "Optional" now shows on the optional where/who answers (the sub-cities, directions, details, the channels, the names for a business).
   b. The place lines' `long` / `contact` refusals are `text-sm` in the Field (were `text-xs`) and are named by the box's `aria-describedby`.
   c. The specifications number box and the commission box read a plain decimal only (`"1e3"`, `"0x1F"`, `"Infinity"` are null).
   d. A blur on an empty specifications number box no longer judges 0 (which drew an out-of-bounds refusal for a blank).
   e. Step 1 with no leaf: the disabled Next also carries `data-closed="1"`, and Enter names "Category" in the refusal summary (the summary renders on every step, `wizard.tsx:1770`).
   f. The agreement's box carries the Field's `data-field` and `data-form-field` attributes.
10. **DECIDE-AND-NAME answers**: one file per control kind or fewer — the kit has one Field with three layouts (`stack`, `inline`, `choice`), no per-kind files; a family's code map reaches the reader as an argument (`RefusalFamily`), so the core imports no family; the gate's API is `missing`, `tried`, `marks`, `report(source, fields)`, `register(field, blank)`, `try()`, keyed by a scope (§2.3's shape plus `register` for a Field's own blank); the plan's `field-registry.ts` under posting became `POSTING_FIELDS` in `field-refusals.ts` (the registry type is the kit's `src/components/forms/field-registry.ts`); the census added `PhoneNumberField` as a control primitive and the step-photos tick, the take-down switch, the negotiable tick and the pin's street as wave-1 controls; no new string.

## 11. CI

The base, dev's root `ci-status.md` (two-step check: SUCCESS, and its commit is `origin/dev`'s `b26e3b34f`, unchanged through the turn):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `b26e3b34f373285d99fee9cf2a8425639f1f6f73` (short `b26e3b3`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-14T03:54:17Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43553591107
```

No red of an earlier turn to fix.

The pull request's run on the last code commit `2653e21ad` — run 43564873688, `completed` / `success` (`gh run list --branch cursor/forms-kit`); `gh pr checks 42`: 43 pass, 1 skipping (`Promote to main (fast-forward on green)`, which runs only on dev). No red in this pull request's runs; nothing re-run. The lane's `ci-status.md` (two-step check: SUCCESS, and its commit is `2653e21ad`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `2653e21ade01da83a412a2c8b5fbb970c47f76d9` (short `2653e21`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-14T06:21:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43564873688
```

## 12. Limits

- The pinned linux/x64 `actionlint` and `gitleaks` and the dependency audit do not run on this machine (darwin/arm64, advisory service unreachable): CI's jobs are their proof.
- The migration-parity preflight needs staging credentials the checks script never holds: CI's.
- The local browser runs were by id (§5); the other ~55 ids reading the moved controls (§4) and every other spec are CI's lanes' proof.
- Rendered look at 360 / 768 / 1024 / 1280 is the operator's walk; I verified by typecheck, tests and structure.
- Scratch copies made for comparison, the operator's to remove: `/tmp/ethio-scratch/forms-kit/base` (a build of `b26e3b34f`), `/tmp/ethio-scratch/forms-kit/ab` (a build of `aad410a0f`), and the scratch scripts and logs beside them.

## 13. Findings

1. **`dialog-look.js` (0.9 KiB) rides `/auth` and `/legal/accept`** for one constant: `src/components/forms/control-class.ts` imports `DIALOG_FIELD` from `src/components/ui/dialog-look.ts` for the `dialog` density, which the agreement tick never uses. Both pages still fall 1.0 KiB; splitting the density's constant out (or moving `DIALOG_FIELD` beside the kit) would take another 0.9 KiB off both. Inside scope only partly (`src/components/ui/dialog-look.ts` is outside), so raised here.
2. **`react-hook-form` and `@hookform/resolvers`** (`package.json:82`, `:33`) have no importer once `src/components/ui/form.tsx` is gone; nothing in the checks flags an unused dependency. A package change is its own turn.
3. **`src/components/ui/native-select.tsx:12`**'s comment still names the posting field's old local class; a stale comment, outside scope.
4. **`fill`** (`src/lib/refusal.ts`) replaces only the first occurrence of each `{name}`, as the posting `fill` it replaced did; a template repeating a placeholder keeps the second. Four catalogue values repeat one (`rg --pcre2 '\{([a-zA-Z]+)\}.*\{\1\}' src/i18n/locales`: `en-admin.ts:701` / `am-admin.ts:671` `{code}`, `en-admin.ts:941` / `am-admin.ts:896` `{detail}`); neither reaches `fill` today — the first is filled by `replaceAll` (`src/features/admin/translations/pseudo-bar.tsx:118`), the second by `fillRefusal`, which replaces every occurrence. A wave that moves either onto `refusalText(…, values)` needs `fill` to replace all; noted for wave 3.

## 14. Records

DEC — DEC-339 — status line: wave 1 BUILT in the forms-kit turn — the kit in `src/components/forms/`, the reader `src/lib/refusal.ts` and the parser `src/lib/parse-input.ts`, all built here, CF-FORM-1 → 5 [the allowlist: 102 lines at the seed, 89 at the end]; `needsLeaf` folded; the wizard's steps on the Field [all five steps and the agreement tick; LEFT: the map pin's two precision radios (an allowlist line), the agreement's report to the wizard's gate (`certifyClosed`), and step 1's `disabled` Next while PW-1 asserts it].

INC — INC-1050 — status line: FIXED in the forms-kit turn [8eb18dacd] — the worder sits beside the reader in `src/lib`; the server imports nothing from `src/features`.

INC — INC-1147 — status line: class 1 (a refusal shown as a generic failure) is held by CF-FORM-3's allowlist line for the two-factor service's mapper, until wave 2.

register row — "every control a person answers sits in the one Field and reports to the one gate" → `src/components/forms/` → CF-FORM-1, CF-FORM-2, CF-FORM-5 → exceptions: the allowlist (falling), DEC-337, DEC-338 · "a server refusal reaches the screen only through the one reader" → `src/lib/refusal.ts` → CF-FORM-3, the reader's branch tests → exceptions: the per-family mappers on the allowlist until their wave · "typed text and numbers pass the one parser" → `src/lib/parse-input.ts` → CF-FORM-4 → exceptions: the allowlist (falling). Row 14 is replaced by the first of these.

changelog — 2026-11-14 the forms-kit turn (Opus 5.5): the form kit's first build — one Field, one gate, one refusal reader over every server dialect, one parser, CF-FORM-1 → 5 with a falling allowlist; the posting wizard's steps on it; INC-1050 fixed.

roadmap — the waves' lines: wave 2 (auth, reset, settings, the two-factor mapper — Cursor), wave 3 (the admin consoles' forms and the per-family mappers), wave 4 (the monetisation and import dialogs); [wave 1 LEFT: the map pin's two precision radios onto the Field (a list-row layout); the agreement tick's report to the wizard's gate (`certifyClosed`); step 1's Next from `disabled` to drawn closed once PW-1 reads the closed look].
