STOP — housekeeping-1b step 2: P2 adopted: P3 failed the cold half (22 pages above P1 by 0.6 → 0.9 KiB, the rule allows 0.5); no ruling needed, building to P2
DONE: STEP 0, STEP 1 (stop 1 at c67861cbc), ruling 1 saved (`docs/governance/briefs/housekeeping-1b-ruling-1.md`, sha256 030ebf1a…abda equal to the carrier's; commit 68891b145), the P1 / P2 / P3 measurement and the stability proofs (this report)
LEFT: the group and the lists (commit 1), the guard (ENTRY_CLOSURE, the module census, BC-14, BC-15, `wired.test.ts`), the i18n split and the ratchet lines, STEPS 5 → 7
CI: head `c67861cbc` (stop 1): its run is the last completed on the lane; no push since. The lane's last code commit `55a296384` and the head `1df9c9ed0` are SUCCESS (stop 1 §CI).
FILES: `git diff --name-only c67861cbc` → `docs/governance/briefs/housekeeping-1b-ruling-1.md`, this report (the build's files follow, uncommitted until the first part commit)

# Housekeeping 1b — step 2: the frozen rule's measurement

All three shapes are built from the real tree (the files of this turn, with the i18n split of 2b5f7dc6f applied, lock-exact `node_modules`, `bun run build`, then the budget step), each by the same `vite.config.ts` with only the group fields below changed; the lane head's table is stop 1's. Scratch copies of the measurement scripts are under `/tmp/ethio-scratch/housekeeping-1b/` (the operator's to remove).

| shape | the group(s) | closure chunks (53 at the lane head) | entry JS (211.8 at the head) |
|---|---|---|---|
| P1 | `shared-shell` = the 45 `src/` modules, `includeDependenciesRecursively` default (true) | 21 | 203.2 KiB |
| P2 | `shared-shell` = the same 45, `includeDependenciesRecursively: false`, `entriesAware: false` | 31 | 206.0 KiB |
| P3 | P2's group (priority 100) + `vendor-shell` (priority 90) = the vendor modules the 45 import, 41 distinct files in 11 packages as ruling 1 names them (49 module records in the chunk: react-slot's one file is eight physical copies, see Findings), both `false` / `false` | 22 | 203.5 KiB |

**Cold first download, every page** (KiB gzipped, the budget step's column; in brackets the change against the lane head):

| page | base | P1 swept group | P2 one group | P3 two groups | P3 − P1 |
|---|---|---|---|---|---|
| `/` | 233.3 | 223.8 (-9.5) | 227 (-6.3) | 224.3 (-9.0) | +0.5 |
| `/$name` | 231.3 | 221.9 (-9.4) | 225 (-6.3) | 222.3 (-9.0) | +0.4 |
| `/account` | 274.4 | 265.1 (-9.3) | 268.2 (-6.2) | 265.6 (-8.8) | +0.5 |
| `/account_/legal` | 214.5 | 205.7 (-8.8) | 208.6 (-5.9) | 206.1 (-8.4) | +0.4 |
| `/account_/legal_/$versionId` | 215.1 | 206.3 (-8.8) | 209.2 (-5.9) | 206.7 (-8.4) | +0.4 |
| `/account_/saved` | 231.5 | 222 (-9.5) | 225.2 (-6.3) | 222.5 (-9.0) | +0.5 |
| `/admin` | 212.7 | 204.1 (-8.6) | 206.9 (-5.8) | 204.4 (-8.3) | +0.3 |
| `/admin/` | 213.6 | 204.9 (-8.7) | 207.7 (-5.9) | 205.2 (-8.4) | +0.3 |
| `/admin/ai` | 326.3 | 315.8 (-10.5) | 319.5 (-6.8) | 316.4 (-9.9) | +0.6 ✗ |
| `/admin/attributes` | 339.6 | 329 (-10.6) | 332.8 (-6.8) | 329.6 (-10.0) | +0.6 ✗ |
| `/admin/audit` | 299.3 | 288.9 (-10.4) | 292.6 (-6.7) | 289.5 (-9.8) | +0.6 ✗ |
| `/admin/categories` | 347.6 | 336.9 (-10.7) | 340.8 (-6.8) | 337.6 (-10.0) | +0.7 ✗ |
| `/admin/countries` | 329.1 | 318.5 (-10.6) | 322.3 (-6.8) | 319.2 (-9.9) | +0.7 ✗ |
| `/admin/images` | 213.4 | 204.7 (-8.7) | 207.5 (-5.9) | 205.1 (-8.3) | +0.4 |
| `/admin/impersonation_/$sessionId` | 294 | 284.3 (-9.7) | 287.7 (-6.3) | 284.9 (-9.1) | +0.6 ✗ |
| `/admin/legal` | 284.9 | 275.3 (-9.6) | 278.5 (-6.4) | 275.8 (-9.1) | +0.5 |
| `/admin/legal_/$versionId` | 282.2 | 272.8 (-9.4) | 275.9 (-6.3) | 273.2 (-9.0) | +0.4 |
| `/admin/legal_/edit` | 283.9 | 274.3 (-9.6) | 277.5 (-6.4) | 274.8 (-9.1) | +0.5 |
| `/admin/listings` | 351.4 | 340 (-11.4) | 344.1 (-7.3) | 340.8 (-10.6) | +0.8 ✗ |
| `/admin/listings_/$listingId` | 353 | 342.6 (-10.4) | 346.5 (-6.5) | 343.3 (-9.7) | +0.7 ✗ |
| `/admin/listings_/$listingId_/edit` | 413.4 | 401.3 (-12.1) | 405.7 (-7.7) | 402.1 (-11.3) | +0.8 ✗ |
| `/admin/locations` | 273.5 | 264.7 (-8.8) | 267.6 (-5.9) | 265.1 (-8.4) | +0.4 |
| `/admin/monetisation` | 337.3 | 326.2 (-11.1) | 330.1 (-7.2) | 326.9 (-10.4) | +0.7 ✗ |
| `/admin/places` | 330.6 | 320 (-10.6) | 323.9 (-6.7) | 320.7 (-9.9) | +0.7 ✗ |
| `/admin/roles` | 296 | 285.8 (-10.2) | 289.4 (-6.6) | 286.4 (-9.6) | +0.6 ✗ |
| `/admin/roles_/$roleId` | 276.4 | 267.1 (-9.3) | 270.2 (-6.2) | 267.5 (-8.9) | +0.4 |
| `/admin/screening` | 372.4 | 361.1 (-11.3) | 365.5 (-6.9) | 362 (-10.4) | +0.9 ✗ |
| `/admin/translations` | 306.9 | 296.6 (-10.3) | 300.2 (-6.7) | 297.3 (-9.6) | +0.7 ✗ |
| `/admin/translations_/$lang` | 310.5 | 300.1 (-10.4) | 303.8 (-6.7) | 300.8 (-9.7) | +0.7 ✗ |
| `/admin/users` | 295.8 | 286.1 (-9.7) | 289.5 (-6.3) | 286.7 (-9.1) | +0.6 ✗ |
| `/admin/users_/$userId` | 291.1 | 281.4 (-9.7) | 284.7 (-6.4) | 281.9 (-9.2) | +0.5 |
| `/auth` | 229.5 | 220 (-9.5) | 223.2 (-6.3) | 220.5 (-9.0) | +0.5 |
| `/auth_/callback` | 215.9 | 207.1 (-8.8) | 210 (-5.9) | 207.5 (-8.4) | +0.4 |
| `/auth_/reset` | 217.9 | 209 (-8.9) | 212 (-5.9) | 209.5 (-8.4) | +0.5 |
| `/c/$slug` | 233.3 | 223.8 (-9.5) | 227 (-6.3) | 224.3 (-9.0) | +0.5 |
| `/dev/primitives` | 233.3 | 223.8 (-9.5) | 227.1 (-6.2) | 224.3 (-9.0) | +0.5 |
| `/dev/style` | 254.3 | 244.3 (-10.0) | 247.9 (-6.4) | 244.5 (-9.8) | +0.2 |
| `/dev/tall` | 212.1 | 203.5 (-8.6) | 206.3 (-5.8) | 203.8 (-8.3) | +0.3 |
| `/l/$slug` | 263.6 | 253.5 (-10.1) | 257.1 (-6.5) | 253.6 (-10.0) | +0.1 |
| `/legal/$kind` | 216.5 | 207.8 (-8.7) | 210.7 (-5.8) | 208.2 (-8.3) | +0.4 |
| `/legal/accept` | 223.5 | 214.6 (-8.9) | 217.6 (-5.9) | 215.1 (-8.4) | +0.5 |
| `/legal/publishing` | 217.3 | 208.5 (-8.8) | 211.4 (-5.9) | 208.9 (-8.4) | +0.4 |
| `/my-listings` | 321.7 | 311 (-10.7) | 314.9 (-6.8) | 311.7 (-10.0) | +0.7 ✗ |
| `/my-listings_/$listingId` | 329.7 | 318.8 (-10.9) | 322.7 (-7.0) | 319.5 (-10.2) | +0.7 ✗ |
| `/my-listings_/$listingId_/edit` | 408 | 396.5 (-11.5) | 400.7 (-7.3) | 397.3 (-10.7) | +0.8 ✗ |
| `/post` | 408 | 396.4 (-11.6) | 400.7 (-7.3) | 397.2 (-10.8) | +0.8 ✗ |
| `/post_/$listingId` | 407.9 | 396.4 (-11.5) | 400.6 (-7.3) | 397.2 (-10.7) | +0.8 ✗ |
| `/privacy` | 216.5 | 207.7 (-8.8) | 210.7 (-5.8) | 208.2 (-8.3) | +0.5 |
| `/settings` | 283.1 | 273.6 (-9.5) | 276.8 (-6.3) | 274.2 (-8.9) | +0.6 ✗ |
| `/terms` | 216.5 | 207.7 (-8.8) | 210.7 (-5.8) | 208.1 (-8.4) | +0.4 |

Range against the lane head: P1 −8.6 … −12.1; P2 −5.8 … −7.7; P3 −8.3 … −11.3. **P3 against P1: +0.1 … +0.9; 22 of 52 pages are more than 0.5 KiB above P1** (the heavier signed-in and admin pages, +0.6 … +0.9).

**The stability proof** — build, change one listed `src/` module (`src/lib/own-key.ts`), build again, compare the hashed names of every chunk in the entry's closure (a chunk with no `src/` module is "vendor-only"; the file is restored after each shape):

| shape | closure chunks (vendor-only) | after a comment line | after a code change (`key.length >= 0 &&` in `ownValue`) |
|---|---|---|---|
| P1 | 21 (19) | 0 renamed (the minifier drops the comment: the output is byte-identical, so this step proves nothing alone) | **15 vendor-only chunks renamed** (useMatch, useMutation, useNavigate, useRouter, useRouterState, useSearch, useSelector, utils … ) + the entry and `shared-shell` |
| P2 | 31 (29) | 0 renamed | **0 vendor-only renamed**; the entry and `shared-shell` renamed (2) |
| P3 | 22 (20) | 0 renamed | **0 vendor-only renamed**; the entry and `shared-shell` renamed (2) |

So P1 is not vendor-stable (a src-only deploy renames fifteen vendor chunks); P2 and P3 are.

**THE RULE** (ruling 1 §1): P3 is adopted if its cold first download is within 0.5 KiB of P1's on every page AND its vendor chunks are stable. Stability: holds. Cold: fails — 22 pages are 0.6 … 0.9 KiB above P1 (the largest, `/admin/screening`, +0.9). **P2 adopted: P3 failed the cold half.** P2's own stability proof holds, so P1 is not reached. P2: 31 chunks, entry 206.0 KiB, every page −5.8 … −7.7 KiB against the lane head, vendor chunks stable.

## Findings from the measurement

1. **A literal by-package P3 grows the first paint.** I also built `vendor-shell` as ruling 1's wording reads, whole packages with no file lists: entry JS 211.8 → **263.6 KiB (+51.8)**, 58 chunks — lucide-react alone carries 224 icon modules, 69 of them in today's closure; query-core and react-query carry modules only a lazy screen uses. P3 as measured above therefore names files inside the packages that are not wholly in the closure (`files` in the list); that reading is the one the ruling's own "lucide-react's shared part" asks for.
2. **A key cannot tell eight copies of one file apart.** `node_modules/@radix-ui/react-slot/dist/index.mjs` is eight physical files (react-slot at the top and nested in tooltip, alert-dialog, collection, dialog, primitive, menu, popover, select). The record's key (`moduleKey`) drops the resolved folder above the last `node_modules`, so a list line names all eight. A shape that names vendor files by key captures every copy (P3: 8 records in one chunk). Leaving react-slot out of P3 made it worse (+0.7 … +1.4 KiB above P1), so the copies are not the cause of P3's cold gap; it is two chunks where P1 has one. Not acted on: P2 names no vendor file.
3. `tags: ['$initial']` (stop 1 finding 3) stays a finding: 2 chunks, 194.8 KiB, refused as the plan by ruling 1 §1 (one 1.35 MB cache unit changed by every deploy).
4. P2 fails the ratchet on **39 pages** (8 KiB or more under their ceilings; none over): those lines, and the entry's `BUDGET_KIB.js`, move in the ratchet commit (ruling 1 §3).

## What follows

The first part commit carries `vite.config.ts`'s group, `SHARED_SHELL_MODULES` (45 paths, a reason each), `moduleKey` and the build plugin (`scripts/chunk-modules-plugin.mjs`, written to `dist/.chunk-modules.json`, outside `dist/client/`; it survives nitro's build and is not in nitro's public-assets table), and the two `.d.mts` declarations `vite.config.ts` needs to import `.mjs` files under `tsc` (`scripts/route-budgets.d.mts`, `scripts/chunk-modules-plugin.d.mts`). `VENDOR_SHELL_PACKAGES` is not built (ruling 1 §4: "if P3"). Then the guard, the split, the ratchet.
