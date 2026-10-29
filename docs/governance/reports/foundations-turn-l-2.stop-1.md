# Foundations turn L-2 — stop 1

**CI:** newest completed run `d7c8ba28` (run 40930015396, 2026-10-29T18:42:19Z) — **SUCCESS**.
**Step 0:** ruling saved as `docs/governance/briefs/foundations-turn-l-2.md`, sha256 `064bedab26b8874e35a7c344e19800cf306a13a02474c7c6f77b1c08a035956d` (matches). STRINGS block extracted by script: sha256 `d41a33d0754356f636d2e70ac065f2aa9aceaebbfcc473276ecf632e9468ab0b`, 7889 bytes (matches). Roadmap line 3 names the brief; A3 and B1 roadmap lines added.

## Why this stops

Two STOPs, both the ruling's own conditions or a rule conflict. Part 0 has landed; Part A is withdrawn and its diff is kept below; Part B was not started.

### STOP A — A1's weight limit (measured)
Part A as built (the ruling's module layout: `country-name.ts`, `collator.ts`, `compare-codes.ts`, `FIXED_ORDER_LOCALE` in locale.ts) grows the first paint from **206.4 to 207.2 KiB** (+0.8 KiB; ceiling 207 → OVER). A1 allows at most +0.1 KiB. Measurement: `vite build` + `node scripts/check-bundle-size.mjs`, in a `git archive 5d61def7` tree and in the built tree. Per-chunk difference (gzip):

| Chunk | Before | After | Cause |
|---|---|---|---|
| collator | — | 0.2 | place-order.ts (shell location selector) imports the moved collator as its own chunk |
| country-name | — | 0.2 | legal-kinds.ts (every page) imports formatCountryName |
| format-locale | inlined | 0.2 | now shared by legal-dates, country-name and collator, so Vite splits it out |
| name-collator | not on first paint | 0.1 | location-data.ts (shell) moved to compareNames (a fixed order) |
| index | 122.9 | 123.0 | import wiring |
| post-prefill | 0.8 | 0.7 | — |

Most of the growth is per-chunk overhead, not code. Options for the ruling: (a) let `collator.ts` and `country-name.ts` share one first-paint module (for example `src/lib/reader-locale.ts`), expected about 0.3 KiB; (b) keep location-data.ts's fixed order on the shell without name-collator (a code-point tie-break on `nameEn` changes order only for case and accent ties); (c) raise the ceiling to 208 with this cause. No change was made without a ruling.

### STOP B — B4(a)/(b) conflict with INC-872 and D3 (rules beat briefs)
- The server draws every visitor's first paint in the base catalogue (`serverShellLanguage`, `src/i18n/server-shell-language.ts`; provider first state `BASE_LANGUAGE`, `src/i18n/provider.tsx:296,301`). The reader's catalogue (DB ▸ compiled, D3) is applied only in the browser.
- B4(a) asks for an Amharic `<title>` in the server's HTML. The server has no Amharic text without either:
  - reading `ui_translations`, which adds a request to every page and is refused by B1 ("a head never adds a request"); or
  - using the compiled `am` files on the server. An approved DB row then outranks them in the browser (D3), so the title flips after hydration whenever they differ, which B4(b) forbids. Shipping `am` text in the client's head data also costs the first paint.
- A head in the reader's language from the first byte is also a change to INC-872's ruling: the first byte declares the base language and `<html lang>` follows `appliedLanguage` (the Knowledge: `<html lang>` follows the applied catalog). A title in another language under `lang="en"` would mislabel the page.
- Options for the ruling: (1) the server's head uses the compiled catalogue of the star-cookie language, `<html lang>` follows it on the first byte (INC-872 amended), and D3's DB overlay of head keys is accepted as a possible re-title after hydration (B4(b) relaxed for that case only); (2) the head stays in the base language on the server and the client effect re-titles once the catalogue is applied (B4(a) dropped; titles in the reader's language for people, not crawlers); (3) a server read of only the head keys, version-cached (G1), as part of the existing SSR language context call (no new request, one wider query).

## Part 0 — done
- **0.1:** the `locale-format` area is removed and LF-E1 joins `my-listings`. `SHARED_SELECTS_ALL` (format.ts, locale.ts, format-locale.ts) is checked by `--self-test`. `bun scripts/e2e-select.ts --self-test` → `e2e-select self-test OK: every spec is reachable; every area glob matches.` `selectSpecs(["src/lib/format.ts"])` → `ALL`.
- **0.2:** LF-E1 reads the leased seller's `preferred_language` before setting `am`, and afterEach writes back exactly that value. A failed read fails the test.
- **0.3:** red first against e65a78e7's My listings date code, restored locally and never committed (`git diff --exit-code src/features/my-listings` clean after). Failure line on both projects: `Expected substring: "ሴፕቴምበር"` / `Received string: "መጀመሪያ የተለጠፈው፦ 15 ሴፕቴ 2026"`. Green on the fixed code: `✓ [desktop-1280] … LF-E1`, `✓ [mobile-360] … LF-E1`, `2 passed (23.1s)`, 0 retries.

## Part A — built, measured, withdrawn (STOP A)
A1–A5 were built and their tests passed before withdrawal: CF-FMT-1 widened, CF-FMT-2 cases a/b/c, FMT-9…11, the format test plus src/lib/posting/legal suites (48 files, 306 tests). This diff restores them after a ruling:

- **Machine-order kinds (A2):** link_id and id are uuids (lowercase hex); category_slug is a slug (lowercase ASCII, `-`); country_code and code are ISO codes (uppercase); created_at is an ISO timestamp; feature is a feature id (lowercase snake). All are single-case ASCII.
- **Departure (A1):** name-collator.ts keeps its `Intl.Collator`, behind an allowlist line, because it is the fixed-order mechanism and not reader order. It needs a ruling.

## Part B — not started (STOP B). No key added, no route changed.

## Files (git diff --name-only 5d61def7)
.lovable/plan.md (the plan written in plan mode), docs/governance/briefs/foundations-turn-l-2.md, docs/tracking/intentional-deletions.txt (the six withdrawn new files), e2e/locale-format.spec.ts, roadmap.md, scripts/e2e-select.ts, this report.

## K2
- `scripts/` has bare `localeCompare` sorts (e2e-failure-report.ts:946,962, admin-tables.ts:175, turn-checks.ts:221, destructive-red.ts:170, i18n-usage-map.ts:113). They are tooling, outside CF-FMT-1's src/ rule.
- `e2e/helpers/ui.ts:1457` uses Intl.Segmenter as a test oracle.

## Appendix — the withdrawn Part A diff
```diff
diff --git a/scripts/conformance/format-allowlist.txt b/scripts/conformance/format-allowlist.txt
index 6ba2607e..dd54bac1 100644
--- a/scripts/conformance/format-allowlist.txt
+++ b/scripts/conformance/format-allowlist.txt
@@ -8,3 +8,6 @@ e2e/legal-pages.spec.ts (2) | independent oracle: the test computes the expected
 e2e/my-listings-ad.spec.ts (1) | independent oracle: the test asserts a stored country code's shape with its own pattern, independently of the code under test (B3's reason; departure reported in L-1) | 2027-04-30
 e2e/post-wizard-resets.spec.ts (1) | independent oracle: the test asserts a currency code's shape with its own pattern, independently of the code under test (B3's reason; departure reported in L-1) | 2027-04-30
 e2e/posting-routes.spec.ts (1) | independent oracle: the test asserts a currency code's shape with its own pattern, independently of the code under test (B3's reason; departure reported in L-1) | 2027-04-30
+src/lib/name-collator.ts (1) | the fixed name order (Part H5, compareNames): one Intl.Collator pinned to FIXED_ORDER_LOCALE so a list put back in the server's order never depends on the admin's browser; not reader order (L-2 A3) | 2027-04-30
+src/features/admin/translations/languages-page.tsx (1) | the autonym: a language's name in its own language is the name the admin is registering, not the reader's locale; formatLocale's fallback would give a wrong name (L-2 A4) | 2027-04-30
+src/components/ui/cut-text.tsx (2) | grapheme counting with Intl.Segmenter(undefined): segmentation does not depend on the locale and counts the same on server and browser (L-2 A4) | 2027-04-30
diff --git a/scripts/conformance/format.test.ts b/scripts/conformance/format.test.ts
index 5bbce2e2..b89f5758 100644
--- a/scripts/conformance/format.test.ts
+++ b/scripts/conformance/format.test.ts
@@ -14,7 +14,11 @@ import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";
  *   - `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat` (constructed or read);
  *   - a `toLocaleString` / `toLocaleDateString` / `toLocaleTimeString` call;
  *   - a literal locale tag (`"am-ET"`, `"en-GB"`, `"en-US"` …);
- *   - the country-code shape `/^[A-Z]{2}$/` or the currency-code shape `/^[A-Z]{3}$/`.
+ *   - the country-code shape `/^[A-Z]{2}$/` or the currency-code shape `/^[A-Z]{3}$/`;
+ *   - (L-2 Part A) `Intl.DisplayNames` outside src/lib/country-name.ts, `Intl.Collator` outside
+ *     src/lib/collator.ts, `Intl.Segmenter` anywhere in src/ (tests may count graphemes as oracles), and a `localeCompare` with no
+ *     locale argument (the runtime's default locale differs between server and browser: reader
+ *     order is collatorFor, a fixed order compareNames, a machine order compareCodes).
  * A recorded exception is a line in format-allowlist.txt keyed `<file> (<findings>)` | reason | until.
  */
 type Finding = { file: string; line: number; what: string };
@@ -25,6 +29,13 @@ const TO_LOCALE = new Set(["toLocaleString", "toLocaleDateString", "toLocaleTime
 const LOCALE_TAG = /^[a-z]{2,3}-[A-Z]{2}$/;
 const CODE_SHAPE = /^\/\^\[A-Z\]\{[23]\}\$\/[a-z]*$/;
 const RULE = "(INC-985: use src/lib/format.ts / src/lib/locale.ts)";
+/** L-2 Part A — each locale-sensitive Intl API's one home. */
+const INTL_HOMES: Readonly<Record<string, string>> = {
+  DisplayNames: "src/lib/country-name.ts",
+  Collator: "src/lib/collator.ts",
+  Segmenter: "",
+};
+const ORDER_RULE = "(L-2: collatorFor / compareNames / compareCodes)";
 const ALLOWLIST = "scripts/conformance/format-allowlist.txt";
 
 export function formatFindings(files: string[], root: string): Finding[] {
@@ -41,6 +52,23 @@ export function formatFindings(files: string[], root: string): Finding[] {
         INTL.has(node.name.text)
       )
         found.push({ file: name, line: at(), what: `uses Intl.${node.name.text} ${RULE}` });
+      else if (
+        name.startsWith("src/") &&
+        ts.isPropertyAccessExpression(node) &&
+        ts.isIdentifier(node.expression) &&
+        node.expression.text === "Intl" &&
+        Object.prototype.hasOwnProperty.call(INTL_HOMES, node.name.text) &&
+        INTL_HOMES[node.name.text] !== name
+      )
+        found.push({ file: name, line: at(), what: `uses Intl.${node.name.text} ${ORDER_RULE}` });
+      else if (
+        name.startsWith("src/") &&
+        ts.isCallExpression(node) &&
+        ts.isPropertyAccessExpression(node.expression) &&
+        node.expression.name.text === "localeCompare" &&
+        node.arguments.length < 2
+      )
+        found.push({ file: name, line: at(), what: `localeCompare with no locale ${ORDER_RULE}` });
       else if (
         ts.isCallExpression(node) &&
         ts.isPropertyAccessExpression(node.expression) &&
@@ -103,8 +131,20 @@ describe("one formatter per intent, one locale module (CF-FMT-1)", () => {
           "const c = (1).toLocaleString();",
           "const d = /^[A-Z]{2}$/.test(code);",
           "const e = new Intl.RelativeTimeFormat(x);",
+          'const a2 = new Intl.DisplayNames(["am"], { type: "region" });',
+          'const b2 = new Intl.Collator("am");',
+          "const c2 = x.localeCompare(y);",
+          'const ok = x.localeCompare(y, "am");',
         ].join("\n"),
       );
+      writeFileSync(
+        join(root, "src", "lib", "country-name.ts"),
+        'export const n = new Intl.DisplayNames(["en"], { type: "region" });\n',
+      );
+      writeFileSync(
+        join(root, "src", "lib", "collator.ts"),
+        'export const c = new Intl.Collator("en");\n',
+      );
       writeFileSync(
         join(root, "src", "lib", "format.ts"),
         'export const f = new Intl.DateTimeFormat("en-GB");\n',
@@ -118,6 +158,9 @@ describe("one formatter per intent, one locale module (CF-FMT-1)", () => {
         "src/feature/page.tsx:3",
         "src/feature/page.tsx:4",
         "src/feature/page.tsx:5",
+        "src/feature/page.tsx:6",
+        "src/feature/page.tsx:7",
+        "src/feature/page.tsx:8",
       ]);
     } finally {
       rmSync(root, { recursive: true, force: true });
diff --git a/src/components/language-switcher.tsx b/src/components/language-switcher.tsx
index eb3dd379..07e87a00 100644
--- a/src/components/language-switcher.tsx
+++ b/src/components/language-switcher.tsx
@@ -11,6 +11,7 @@ import {
 import { useI18n } from "@/i18n";
 import type { Language } from "@/i18n/types";
 import { cn } from "@/lib/utils";
+import { compareCodes } from "@/lib/compare-codes";
 
 const LABEL_KEYS = {
   en: "language.english",
@@ -80,7 +81,7 @@ export function LanguageSwitcher({ className }: { className?: string }) {
           onValueChange={(code) => setStar(code as Language)}
         >
           {[...publicLanguages]
-            .sort((a, b) => a.sort - b.sort || a.code.localeCompare(b.code))
+            .sort((a, b) => a.sort - b.sort || compareCodes(a.code, b.code))
             .map((row) => {
               const key = LABEL_KEYS[row.code as keyof typeof LABEL_KEYS];
               return (
diff --git a/src/components/shell/location-data.ts b/src/components/shell/location-data.ts
index 33091cd9..4ee32e82 100644
--- a/src/components/shell/location-data.ts
+++ b/src/components/shell/location-data.ts
@@ -3,6 +3,7 @@ import { useEffect, useState } from "react";
 import { distanceKm } from "@/lib/geo-distance";
 import { callRoute } from "@/lib/route-client";
 import { UUID_RE } from "@/lib/uuid";
+import { compareNames } from "@/lib/name-collator";
 
 /**
  * LOCATIONS ERA L4b — THE SHELL'S GEOGRAPHY SEAM (B2: one utility, one concern).
@@ -188,7 +189,7 @@ export function parseMarkets(answer: Record<string, unknown> | null): OpenMarket
       displayOrder: Number(row.display_order ?? 0),
     }))
     .filter((row) => CODE_RE.test(row.code))
-    .sort((a, b) => a.displayOrder - b.displayOrder || a.nameEn.localeCompare(b.nameEn));
+    .sort((a, b) => a.displayOrder - b.displayOrder || compareNames(a.nameEn, b.nameEn));
 }
 
 async function fetchTree(country: string): Promise<TreeNode[]> {
diff --git a/src/features/admin-ai/ai-service.ts b/src/features/admin-ai/ai-service.ts
index 2b2f3bdb..c82ca5da 100644
--- a/src/features/admin-ai/ai-service.ts
+++ b/src/features/admin-ai/ai-service.ts
@@ -2,6 +2,7 @@ import type { MessageKey } from "@/i18n";
 import { supabase } from "@/integrations/supabase/client";
 import { ownValue } from "@/lib/own-key";
 import { ReaderError, readerFailure } from "@/lib/reader-failure";
+import { compareCodes } from "@/lib/compare-codes";
 
 /**
  * Bundle 13 turn 5 (D158) — THE AI SERVICES CONSOLE CLIENT SEAM.
@@ -156,7 +157,7 @@ export function aiFeaturesOf(payload: unknown): AiFeatureRow[] {
     return index === -1 ? AI_FEATURE_ORDER.length : index;
   };
   return (rows as AiFeatureRow[]).sort(
-    (a, b) => rank(a.feature) - rank(b.feature) || a.feature.localeCompare(b.feature),
+    (a, b) => rank(a.feature) - rank(b.feature) || compareCodes(a.feature, b.feature),
   );
 }
 
diff --git a/src/features/admin-attributes/attributes-service.ts b/src/features/admin-attributes/attributes-service.ts
index faf481c0..9765aa74 100644
--- a/src/features/admin-attributes/attributes-service.ts
+++ b/src/features/admin-attributes/attributes-service.ts
@@ -5,6 +5,7 @@ import type { Json } from "@/integrations/supabase/types";
 import type { NumberFieldsValue, TextFieldsValue } from "./components/attribute-v2-fields";
 import { PAGE_ROWS, readAllPages } from "@/lib/read-all-pages";
 import { compareNames } from "@/lib/name-collator";
+import { compareCodes } from "@/lib/compare-codes";
 
 /**
  * C3c — THE ATTRIBUTE LIBRARY client seam.
@@ -390,7 +391,7 @@ export async function listCategoryLinks(
     (a, b) =>
       Number(a.display_order ?? 0) - Number(b.display_order ?? 0) ||
       compareNames(a.name_en, b.name_en) ||
-      a.link_id.localeCompare(b.link_id),
+      compareCodes(a.link_id, b.link_id),
   );
   // The additive M2 cell may be absent until its final migration applies.
   return data.map((storedRow) => {
@@ -594,8 +595,8 @@ export async function listAttributeCategoriesPaged(pageRows: number): Promise<At
   const data = [...pages].sort(
     (a, b) =>
       compareNames(a.category_name_en, b.category_name_en) ||
-      a.category_slug.localeCompare(b.category_slug) ||
-      a.link_id.localeCompare(b.link_id),
+      compareCodes(a.category_slug, b.category_slug) ||
+      compareCodes(a.link_id, b.link_id),
   );
   return data.map((row) => ({
     linkId: row.link_id,
@@ -659,7 +660,7 @@ export async function listEffectiveCategoryLinks(
       Number(a.inherited) - Number(b.inherited) ||
       Number(a.display_order ?? 0) - Number(b.display_order ?? 0) ||
       compareNames(a.name_en, b.name_en) ||
-      a.link_id.localeCompare(b.link_id),
+      compareCodes(a.link_id, b.link_id),
   );
   // The additive M2 cell may be absent until its final migration applies.
   return data.map((storedRow) => {
diff --git a/src/features/admin-attributes/category-attributes-dialog.tsx b/src/features/admin-attributes/category-attributes-dialog.tsx
index 5fda5873..f7e0060e 100644
--- a/src/features/admin-attributes/category-attributes-dialog.tsx
+++ b/src/features/admin-attributes/category-attributes-dialog.tsx
@@ -33,6 +33,7 @@ import {
   useUnlinkAttribute,
   useUpdateAttributeLink,
 } from "./use-attributes";
+import { collatorFor } from "@/lib/collator";
 
 /**
  * C3c PART C — THE PER-CATEGORY LINK MANAGER.
@@ -52,7 +53,7 @@ export function CategoryAttributesDialog({
   guard: GuardFn;
   onClose: () => void;
 }) {
-  const { t } = useI18n();
+  const { t, language } = useI18n();
   // C3-UX-2 — linked names, the card caption and the picker all read the
   // translated label, with the EN definition name as fallback.
   const attributeLabel = useAttributeLabel();
@@ -85,7 +86,8 @@ export function CategoryAttributesDialog({
   const rows: AttributeLink[] = [...(links.data ?? [])].sort(
     (a, b) =>
       a.displayOrder - b.displayOrder ||
-      attributeLabel(a.attributeId, a.nameEn).localeCompare(
+      collatorFor(language).compare(
+        attributeLabel(a.attributeId, a.nameEn),
         attributeLabel(b.attributeId, b.nameEn),
       ),
   );
diff --git a/src/features/admin-categories/categories-service.ts b/src/features/admin-categories/categories-service.ts
index a6d6d311..be67f030 100644
--- a/src/features/admin-categories/categories-service.ts
+++ b/src/features/admin-categories/categories-service.ts
@@ -1,5 +1,6 @@
 import { supabase } from "@/integrations/supabase/client";
 import { PAGE_ROWS, readAllPages } from "@/lib/read-all-pages";
+import { compareNames } from "@/lib/name-collator";
 
 /**
  * C2-UI — the Categories console client seam.
@@ -268,7 +269,7 @@ export function toRoster(rows: CategoryRow[]): CategoryNode[] {
     byParent.set(row.parentId, bucket);
   }
   for (const bucket of byParent.values()) {
-    bucket.sort((a, b) => a.displayOrder - b.displayOrder || a.nameEn.localeCompare(b.nameEn));
+    bucket.sort((a, b) => a.displayOrder - b.displayOrder || compareNames(a.nameEn, b.nameEn));
   }
   const out: CategoryNode[] = [];
   const walk = (parentId: string | null, depth: number) => {
diff --git a/src/features/admin-listings/listing-page.tsx b/src/features/admin-listings/listing-page.tsx
index febd6310..b187ea91 100644
--- a/src/features/admin-listings/listing-page.tsx
+++ b/src/features/admin-listings/listing-page.tsx
@@ -50,6 +50,7 @@ import { errorText } from "@/lib/error-text";
 import { catalogText, entityName } from "@/i18n/entity";
 import { languageRowName } from "@/lib/format-locale";
 import { dateFormatter } from "@/lib/format";
+import { formatCountryName } from "@/lib/country-name";
 
 /**
  * Bundle 11, the Listings console, turn L3 (D134, D138, D139) — ONE LISTING'S
@@ -881,7 +882,6 @@ function CertificationsCard({ listingId }: { listingId: string }) {
   const { permissions } = useAdminShell();
   const mayViewLegal = permissions.includes("legal:view");
   const query = useAdminListingCertifications(listingId);
-  const regions = new Intl.DisplayNames([language], { type: "region" });
   const when = dateFormatter("dayTime", language, "UTC");
   const kindName = (kind: string) =>
     kind === "terms" || kind === "privacy" || kind === "publishing"
@@ -932,7 +932,7 @@ function CertificationsCard({ listingId }: { listingId: string }) {
                     kindName(v.kind),
                     v.countryCode === null
                       ? t("admin.legal.scope.global")
-                      : (regions.of(v.countryCode) ?? v.countryCode),
+                      : formatCountryName(v.countryCode, language),
                     t("admin.legal.version").replace("{n}", String(v.version)),
                     v.label,
                   ].join(" · ");
diff --git a/src/features/admin-locations/locations-page.tsx b/src/features/admin-locations/locations-page.tsx
index d0f85a31..656659a6 100644
--- a/src/features/admin-locations/locations-page.tsx
+++ b/src/features/admin-locations/locations-page.tsx
@@ -42,6 +42,8 @@ import {
   type LocationNode,
 } from "./locations-service";
 import { ADMIN_LOCATIONS_KEY, useAdminLocations, useAllCountries } from "./use-locations";
+import { compareCodes } from "@/lib/compare-codes";
+import { compareNames } from "@/lib/name-collator";
 
 /**
  * LOCATIONS ERA L2a-R — THE LOCATIONS CONSOLE, PART 1, RECONCILED.
@@ -116,8 +118,8 @@ export function AdminLocationsPage() {
     return [...rows].sort(
       (a, b) =>
         Number(b.isActive) - Number(a.isActive) ||
-        a.nameEn.localeCompare(b.nameEn) ||
-        a.code.localeCompare(b.code),
+        compareNames(a.nameEn, b.nameEn) ||
+        compareCodes(a.code, b.code),
     );
   }, [countries.data]);
 
diff --git a/src/features/admin-locations/locations-service.ts b/src/features/admin-locations/locations-service.ts
index 64472c0c..c6530e0d 100644
--- a/src/features/admin-locations/locations-service.ts
+++ b/src/features/admin-locations/locations-service.ts
@@ -3,6 +3,7 @@ import type { MessageKey } from "@/i18n";
 import { PAGE_ROWS, readAllPages } from "@/lib/read-all-pages";
 import { ownValue } from "@/lib/own-key";
 import { compareNames } from "@/lib/name-collator";
+import { compareCodes } from "@/lib/compare-codes";
 
 /**
  * LOCATIONS ERA L2a — THE LOCATIONS CONSOLE CLIENT SEAM.
@@ -108,11 +109,11 @@ export async function listLocations(
   // Sorted back to the door's own order: country, level, display order, name.
   const data = [...pages].sort(
     (a, b) =>
-      a.country_code.localeCompare(b.country_code) ||
+      compareCodes(a.country_code, b.country_code) ||
       (ownValue(LEVEL_RANK, a.level) ?? 3) - (ownValue(LEVEL_RANK, b.level) ?? 3) ||
       Number(a.display_order ?? 0) - Number(b.display_order ?? 0) ||
       compareNames(a.name_en, b.name_en) ||
-      a.id.localeCompare(b.id),
+      compareCodes(a.id, b.id),
   );
   return data.map((row) => ({
     id: row.id,
@@ -276,7 +277,7 @@ export function toRoster(rows: LocationRow[]): LocationNode[] {
       (a, b) =>
         levelRank(a.level) - levelRank(b.level) ||
         a.displayOrder - b.displayOrder ||
-        a.nameEn.localeCompare(b.nameEn),
+        compareNames(a.nameEn, b.nameEn),
     );
 
   const out: LocationNode[] = [];
diff --git a/src/features/admin/legal/legal-page.tsx b/src/features/admin/legal/legal-page.tsx
index b4257119..be95cef9 100644
--- a/src/features/admin/legal/legal-page.tsx
+++ b/src/features/admin/legal/legal-page.tsx
@@ -22,6 +22,7 @@ import {
 import { LegalFactsCard } from "./legal-facts-card";
 import { useLegalDocuments, useLegalSettings, useLegalVersion, useLegalWrites } from "./use-legal";
 import { dateFormatter } from "@/lib/format";
+import { compareCodes } from "@/lib/compare-codes";
 
 /** Bundle 22 turn 13 — the text in force, read in place (its facts as frozen at publishing). */
 function InForceText({ id }: { id: string }) {
@@ -311,7 +312,7 @@ export function LegalPage() {
           {LEGAL_KINDS.map((kind) => {
             const docs = (documents.data ?? [])
               .filter((doc) => doc.kind === kind)
-              .sort((a, b) => (a.country_code ?? "").localeCompare(b.country_code ?? ""));
+              .sort((a, b) => compareCodes(a.country_code ?? "", b.country_code ?? ""));
             const available = (countries.data ?? []).filter(
               (c) => !docs.some((doc) => doc.country_code === c.code),
             );
diff --git a/src/features/admin/translations/languages-page.tsx b/src/features/admin/translations/languages-page.tsx
index 0b482658..e5a7f55e 100644
--- a/src/features/admin/translations/languages-page.tsx
+++ b/src/features/admin/translations/languages-page.tsx
@@ -50,6 +50,7 @@ import {
   useTranslationStats,
   useUpsertLanguage,
 } from "./use-translations";
+import { compareCodes } from "@/lib/compare-codes";
 
 /** Provider codes can carry a region subtag (`zh-CN`); the roster stores them lowercased. */
 const LANGUAGE_CODE_RE = /^[a-z]{2,8}(-[a-z0-9]{2,8})?$/;
@@ -73,7 +74,7 @@ function nativeNameOf(code: string, fallback: string): string {
  * order from the one on screen.
  */
 function sortLanguages(data: LanguageRow[] | undefined): LanguageRow[] {
-  return [...(data ?? [])].sort((a, b) => a.sort - b.sort || a.code.localeCompare(b.code));
+  return [...(data ?? [])].sort((a, b) => a.sort - b.sort || compareCodes(a.code, b.code));
 }
 
 /**
diff --git a/src/features/legal/legal-document-page.tsx b/src/features/legal/legal-document-page.tsx
index 991471d0..36e1225c 100644
--- a/src/features/legal/legal-document-page.tsx
+++ b/src/features/legal/legal-document-page.tsx
@@ -6,6 +6,7 @@ import { useI18n } from "@/i18n";
 import { legalDate } from "./legal-dates";
 import { LegalText } from "./legal-text";
 import { legalTextFor, type PublicLegalVersion } from "./legal-reader";
+import { formatCountryName } from "@/lib/country-name";
 
 export type LegalPageAnswer = {
   inForce: PublicLegalVersion | null;
@@ -38,7 +39,7 @@ export function LegalDocumentPage({
           <p data-testid="legal-public-country" className="text-sm font-medium text-foreground">
             {t("legal.certify.forCountry").replace(
               "{country}",
-              new Intl.DisplayNames([language], { type: "region" }).of(countryCode) ?? countryCode,
+              formatCountryName(countryCode, language),
             )}
           </p>
         ) : null}
@@ -127,8 +128,7 @@ export function LegalDocumentPage({
               <p data-testid="legal-public-country" className="text-sm font-medium text-foreground">
                 {t("legal.certify.forCountry").replace(
                   "{country}",
-                  new Intl.DisplayNames([language], { type: "region" }).of(section.countryCode) ??
-                    section.countryCode,
+                  formatCountryName(section.countryCode, language),
                 )}
               </p>
               {section.data === null ? (
diff --git a/src/features/legal/legal-kinds.ts b/src/features/legal/legal-kinds.ts
index 02e89264..ecac913b 100644
--- a/src/features/legal/legal-kinds.ts
+++ b/src/features/legal/legal-kinds.ts
@@ -1,5 +1,6 @@
 import type { MessageKey } from "@/i18n";
 import { isCountryCode } from "@/lib/locale";
+import { formatCountryName } from "@/lib/country-name";
 
 /** Bundle 22 turn 3 — pure rules of the acceptance gate; turn 12 (DEC-206): one tick, the 18+ statement only the first time. */
 export type LegalRole = "terms" | "privacy" | "other";
@@ -59,8 +60,7 @@ export function legalDocName(
         ? t("legal.kind.privacy")
         : row.kind;
   if (!row.country_code) return name;
-  const country =
-    new Intl.DisplayNames([language], { type: "region" }).of(row.country_code) ?? row.country_code;
+  const country = formatCountryName(row.country_code, language);
   return `${name} · ${country}`;
 }
 
diff --git a/src/features/posting/calling-codes.ts b/src/features/posting/calling-codes.ts
index 4f4fcc38..b86f513f 100644
--- a/src/features/posting/calling-codes.ts
+++ b/src/features/posting/calling-codes.ts
@@ -8,6 +8,8 @@
  * seller typed into "+" code digits.
  */
 import { isCountryCode } from "@/lib/locale";
+import { collatorFor } from "@/lib/collator";
+import { formatCountryName } from "@/lib/country-name";
 const TABLE =
   "AD376 AE971 AF93 AG1 AI1 AL355 AM374 AO244 AR54 AS1 AT43 AU61 AW297 AX358 AZ994 " +
   "BA387 BB1 BD880 BE32 BF226 BG359 BH973 BI257 BJ229 BL590 BM1 BN673 BO591 BQ599 BR55 " +
@@ -110,18 +112,13 @@ export function orderCountries(
   const seen = new Set(first);
   const rest = [...known]
     .filter((iso) => !seen.has(iso))
-    .sort((a, b) => nameOf(a).localeCompare(nameOf(b), language));
+    .sort((a, b) => collatorFor(language).compare(nameOf(a), nameOf(b)));
   return [...first, ...rest];
 }
 
 /** The country name in the UI language; the ISO code when Intl has none. */
 export function countryDisplayName(iso: string, language: string): string {
-  try {
-    const names = new Intl.DisplayNames([language], { type: "region" });
-    return names.of(iso) ?? iso;
-  } catch {
-    return iso;
-  }
+  return formatCountryName(iso, language);
 }
 
 /**
diff --git a/src/features/posting/step-who.tsx b/src/features/posting/step-who.tsx
index 6d9c996f..7bb4939a 100644
--- a/src/features/posting/step-who.tsx
+++ b/src/features/posting/step-who.tsx
@@ -31,6 +31,7 @@ import { checkChannel, normalizeTelegram } from "./validate";
 import { dateFormatter } from "@/lib/format";
 import { logOnDemandFailure, refreshPage } from "@/lib/on-demand-failure";
 import { Button } from "@/components/ui/button";
+import { collatorFor } from "@/lib/collator";
 
 /**
  * U6-C2b — STEP 7: WHO IS SELLING, AND HOW A BUYER REACHES THEM (spec §4 B2).
@@ -650,7 +651,7 @@ export function StepWho({
     const marketCodes = new Set(markets.markets.map((market) => market.code));
     const rest = allCountries
       .filter((row) => !marketCodes.has(row.code))
-      .sort((a, b) => a.nameEn.localeCompare(b.nameEn, language));
+      .sort((a, b) => collatorFor(language).compare(a.nameEn, b.nameEn));
     return [
       ...markets.markets.map((market) => ({
         code: market.code,
diff --git a/src/features/posting/wizard.tsx b/src/features/posting/wizard.tsx
index bd3cb5b9..bb61743e 100644
--- a/src/features/posting/wizard.tsx
+++ b/src/features/posting/wizard.tsx
@@ -102,6 +102,7 @@ import {
   type CategoryFacts,
   type Refusal,
 } from "./types";
+import { formatCountryName } from "@/lib/country-name";
 
 /** D39 — the rails walk the seller's order; each entry keeps its door number. */
 const WALK = SEQUENCE.map((step) => STEPS[step - 1]);
@@ -419,12 +420,9 @@ function WizardShell({
         entities,
       );
     }
-    try {
-      const name = new Intl.DisplayNames([language], { type: "region" }).of(tokenCountry);
-      if (name !== undefined && name !== tokenCountry) return name;
-    } catch {
-      // An unknown code falls through to the market's own name or the fallback words.
-    }
+    // An unknown code comes back as itself and falls through to the market's own name.
+    const name = formatCountryName(tokenCountry, language);
+    if (name !== tokenCountry) return name;
     return market?.nameEn ?? fallbackCountry;
   }, [tokenCountry, openMarkets.markets, entities, language, fallbackCountry]);
   /** The {category:…} pointer the seller tapped, awaiting the move question. */
diff --git a/src/lib/collator.test.ts b/src/lib/collator.test.ts
new file mode 100644
index 00000000..f035254d
--- /dev/null
+++ b/src/lib/collator.test.ts
@@ -0,0 +1,17 @@
+import { describe, expect, it } from "vitest";
+import { collatorFor } from "./collator";
+
+describe("collatorFor (L-2 Part A)", () => {
+  it("FMT-10 one collator per locale, base sensitivity and numeric order", () => {
+    expect(collatorFor("en")).toBe(collatorFor("en"));
+    expect(collatorFor("xx")).toBe(collatorFor("en"));
+    expect(["b", "A", "a2", "a10"].sort(collatorFor("en").compare)).toEqual([
+      "A",
+      "a2",
+      "a10",
+      "b",
+    ]);
+    expect(collatorFor("en").compare("é", "e")).toBe(0);
+    expect(["ሐ", "ሀ"].sort(collatorFor("am").compare)).toEqual(["ሀ", "ሐ"]);
+  });
+});
diff --git a/src/lib/collator.ts b/src/lib/collator.ts
new file mode 100644
index 00000000..1fdc8312
--- /dev/null
+++ b/src/lib/collator.ts
@@ -0,0 +1,19 @@
+import { formatLocale } from "@/lib/format-locale";
+
+/**
+ * Foundations turn L-2 Part A (register row 16; moved from place-order.ts, INC-401) — READER
+ * ORDER: a list a person reads is ordered by the name shown, in the reader's language. The one
+ * Intl.Collator for reader order (CF-FMT-1), cached per locale, its locale from formatLocale.
+ * A fixed order is compareNames (name-collator.ts); a machine order is compareCodes.
+ */
+const collators = new Map<string, Intl.Collator>();
+
+export function collatorFor(language: string): Intl.Collator {
+  const tag = formatLocale(language);
+  let found = collators.get(tag);
+  if (found === undefined) {
+    found = new Intl.Collator(tag, { sensitivity: "base", numeric: true });
+    collators.set(tag, found);
+  }
+  return found;
+}
diff --git a/src/lib/compare-codes.test.ts b/src/lib/compare-codes.test.ts
new file mode 100644
index 00000000..ac44ca00
--- /dev/null
+++ b/src/lib/compare-codes.test.ts
@@ -0,0 +1,10 @@
+import { describe, expect, it } from "vitest";
+import { compareCodes } from "./compare-codes";
+
+describe("compareCodes (L-2 Part A2)", () => {
+  it("FMT-11 machine order is code-point order, never a locale's", () => {
+    expect(["b-1", "a_2", "a-2", "ab"].sort(compareCodes)).toEqual(["a-2", "a_2", "ab", "b-1"]);
+    expect(compareCodes("ET", "ET")).toBe(0);
+    expect(compareCodes("2026-10-01T00:00:00Z", "2026-09-30T23:59:59Z")).toBe(1);
+  });
+});
diff --git a/src/lib/compare-codes.ts b/src/lib/compare-codes.ts
new file mode 100644
index 00000000..aba54382
--- /dev/null
+++ b/src/lib/compare-codes.ts
@@ -0,0 +1,8 @@
+/**
+ * Foundations turn L-2 Part A2 — MACHINE ORDER: ids, codes, slugs, ISO timestamps and feature
+ * ids (single-case ASCII) compare by code point, the same on the server and in every browser,
+ * never through a locale (CF-FMT-1 refuses a localeCompare with no locale).
+ */
+export function compareCodes(a: string, b: string): number {
+  return a < b ? -1 : a > b ? 1 : 0;
+}
diff --git a/src/lib/country-name.test.ts b/src/lib/country-name.test.ts
new file mode 100644
index 00000000..decde832
--- /dev/null
+++ b/src/lib/country-name.test.ts
@@ -0,0 +1,12 @@
+import { describe, expect, it } from "vitest";
+import { formatCountryName } from "./country-name";
+
+describe("formatCountryName (L-2 Part A)", () => {
+  it("FMT-9 a country in the reader's language; an unknown or malformed code is the code", () => {
+    expect(formatCountryName("ET", "en")).toBe("Ethiopia");
+    expect(formatCountryName("ET", "am")).not.toBe("Ethiopia");
+    expect(formatCountryName("ET", "xx")).toBe("Ethiopia");
+    expect(formatCountryName("QQ", "en")).toBe("QQ");
+    expect(formatCountryName("not-a-code", "en")).toBe("not-a-code");
+  });
+});
diff --git a/src/lib/country-name.ts b/src/lib/country-name.ts
new file mode 100644
index 00000000..eb5601cd
--- /dev/null
+++ b/src/lib/country-name.ts
@@ -0,0 +1,32 @@
+import { formatLocale } from "@/lib/format-locale";
+
+/**
+ * Foundations turn L-2 Part A (register row 16) — A COUNTRY'S NAME IN THE READER'S LANGUAGE.
+ * The one Intl.DisplayNames of regions (CF-FMT-1), cached per locale, its locale from
+ * formatLocale. A code the runtime does not know, or a malformed one, is shown as the code
+ * itself. Its own small module: it rides pages that must not carry format.ts (L-2 A1).
+ */
+const regionNames = new Map<string, Intl.DisplayNames | null>();
+
+function namesFor(language: string): Intl.DisplayNames | null {
+  const tag = formatLocale(language);
+  let found = regionNames.get(tag);
+  if (found === undefined) {
+    try {
+      found = new Intl.DisplayNames([tag], { type: "region" });
+    } catch {
+      found = null;
+    }
+    regionNames.set(tag, found);
+  }
+  return found;
+}
+
+export function formatCountryName(code: string, language: string): string {
+  try {
+    return namesFor(language)?.of(code) ?? code;
+  } catch {
+    // RangeError: not a well-formed region code.
+    return code;
+  }
+}
diff --git a/src/lib/locale.ts b/src/lib/locale.ts
index c633f23c..d2bec5e8 100644
--- a/src/lib/locale.ts
+++ b/src/lib/locale.ts
@@ -24,6 +24,12 @@ export const FALLBACK_TAG = LOCALE_TAGS[FALLBACK_LANGUAGE] ?? "en-GB";
  */
 export const LONG_MONTH_LANGUAGES: ReadonlySet<string> = new Set(["am"]);
 
+/**
+ * Part H5 / L-2 A3 — the fixed name order's locale (name-collator.ts): a list put back in the
+ * server's order never depends on the language of the admin's browser.
+ */
+export const FIXED_ORDER_LOCALE = "en";
+
 /** A country code's shape (ISO 3166-1 alpha-2). */
 export const COUNTRY_CODE = /^[A-Z]{2}$/;
 /** A currency code's shape (ISO 4217 alpha-3). */
diff --git a/src/lib/name-collator.ts b/src/lib/name-collator.ts
index 21eda936..ab29e477 100644
--- a/src/lib/name-collator.ts
+++ b/src/lib/name-collator.ts
@@ -1,9 +1,11 @@
+import { FIXED_ORDER_LOCALE } from "@/lib/locale";
+
 /**
  * Part H5 — THE ONE NAME ORDER. Lists put back in the server's order compare
- * names with this collator, pinned to "en": the order of a list never depends
+ * names with this collator, pinned to FIXED_ORDER_LOCALE (locale.ts; it reproduces the server's ORDER BY name_en for Latin names): the order of a list never depends
  * on the language of the admin's browser.
  */
-export const NAME_COLLATOR = new Intl.Collator("en");
+export const NAME_COLLATOR = new Intl.Collator(FIXED_ORDER_LOCALE);
 
 export function compareNames(a: string, b: string): number {
   return NAME_COLLATOR.compare(a, b);
diff --git a/src/lib/place-order.ts b/src/lib/place-order.ts
index f28a0b35..851079e0 100644
--- a/src/lib/place-order.ts
+++ b/src/lib/place-order.ts
@@ -1,3 +1,5 @@
+import { collatorFor } from "@/lib/collator";
+
 /**
  * Bundle 3 Part D (INC-401) — PLACE LISTS FROM A TO Z.
  *
@@ -8,16 +10,6 @@
  *
  * Ties keep their incoming order (Array.prototype.sort is stable).
  */
-const collators = new Map<string, Intl.Collator>();
-
-function collatorFor(language: string): Intl.Collator {
-  let found = collators.get(language);
-  if (found === undefined) {
-    found = new Intl.Collator(language, { sensitivity: "base", numeric: true });
-    collators.set(language, found);
-  }
-  return found;
-}
 
 export function sortPlacesByName<T>(
   rows: readonly T[],
diff --git a/src/routes/api/categories.tree.ts b/src/routes/api/categories.tree.ts
index 7a0fc990..245f7a5a 100644
--- a/src/routes/api/categories.tree.ts
+++ b/src/routes/api/categories.tree.ts
@@ -5,6 +5,7 @@ import { defineRoute, type RouteContext } from "@/server/route";
 import { versionCache } from "@/server/version-cache";
 import { readAllPages } from "@/lib/read-all-pages";
 import { readFailed } from "@/lib/reader-failure";
+import { compareCodes } from "@/lib/compare-codes";
 
 /**
  * INC-263 — THE PUBLIC CATEGORY TREE, VERSION-KEYED.
@@ -88,14 +89,14 @@ async function handler(ctx: RouteContext): Promise<Response> {
           body: {
             version,
             nodes: [...nodes].sort(
-              (a, b) => a.display_order - b.display_order || a.id.localeCompare(b.id),
+              (a, b) => a.display_order - b.display_order || compareCodes(a.id, b.id),
             ),
             pointers: [...pointers]
               .sort(
                 (a, b) =>
                   a.display_order - b.display_order ||
-                  a.created_at.localeCompare(b.created_at) ||
-                  a.id.localeCompare(b.id),
+                  compareCodes(a.created_at, b.created_at) ||
+                  compareCodes(a.id, b.id),
               )
               .map(({ child_id, parent_id, display_order, is_primary }) => ({
                 child_id,
```
