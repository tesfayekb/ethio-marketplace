# Foundations — turn 30: speed S7 — the strings layers: strings a page does not show stay off its first download (D234, DEC-258): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 30 (2026-10-25; DEC-237; D234 — the operator: "it should be the fastest, lightweight … VERY IMPORTANT"; DEC-258 — the supervisor's decision under G17, reversible: DEC-231's admin strings layer becomes named strings layers; anchors located at a018721a). Tier A (the language layer every page reads; the admin gate's strings; the first-paint guards), as DEC-231's turn was. No migration. No new string. No package change. Two files deleted (B8). AGENTS.md: the Strings line (F6). Base: dev a018721a (turn 29's final commit c9da2fd9 plus your turn-30 stop report, which your completion report replaces). Checked by script against AGENTS.md and the platform rules you quoted: no new control (Try again is the shared Button); no map read by an outside key; no silent catch; no `!`; no `.first()` in e2e; browser tests only through `bun run e2e:local`. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — the strings layers (one batch); C — the tests; D — the first-paint guards; E — the browser; F — docs, register, changelog, AGENTS.md, the usage maps.
BASE: a018721a
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
scripts/conformance/strings-layers.ts
scripts/conformance/strings-layers.test.ts
scripts/conformance/kit-adoption-allowlist.txt
src/components/shell/strings-layers.ts
src/components/shell/strings-layers.test.ts
src/components/shell/strings-layer-gate.tsx
src/components/shell/strings-layer-gate.test.tsx
src/i18n/compiled-catalog.ts
src/i18n/compiled-catalog.test.ts
src/i18n/compiled-layer-loader.test.ts
src/i18n/provider.tsx
src/i18n/provider-layers.test.tsx
src/i18n/index.ts
src/i18n/locales/en.ts
src/i18n/locales/am.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-member.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-member.ts
src/routes/__root.tsx
src/routes/admin.tsx
src/routes/account.tsx
src/routes/account_.legal.tsx
src/routes/account_.legal_.$versionId.tsx
src/routes/account_.saved.tsx
src/routes/settings.tsx
src/routes/post.tsx
src/routes/post_.$listingId.tsx
src/routes/my-listings.tsx
src/routes/my-listings_.$listingId.tsx
src/routes/my-listings_.$listingId_.edit.tsx
src/routes/dev.primitives.tsx
src/routes/dev.style.tsx
src/routes/dev.tall.tsx
scripts/check-marketplace-imports.mjs
scripts/bundle-closure.mjs
scripts/check-bundle-size.mjs
scripts/route-budgets.mjs
e2e/i18n-layers.spec.ts
e2e/ad-page.spec.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: a string a page's screens never show is not part of that page's first download — it lives in a strings layer that the routes showing it declare, and it is loaded before those routes draw.
MECHANISM: DEC-231's admin layer, generalised. At BASE: compiled-catalog.ts :24-:73, provider.tsx :214-:217, :281-:288, :510-:613, :673-:687, routes/admin.tsx :46-:48 and :97-:124, src/i18n/locales/admin-layer.test.ts. After: `STRINGS_LAYERS` (admin, member), `compiledLayerLoader`, `layerOutcome`, `warmStringsLayers` (compiled-catalog.ts); per-layer `layerStates`, `requestStringsLayer`, `useStringsLayers` (provider.tsx); a route declares its screens' layers with `staticData: { strings: [...] }` (a layout's covers the routes under it), typed by the router's StaticDataRouteOption augmented in the NEW src/components/shell/strings-layers.ts (`declaredLayers`); ONE gate, the NEW `StringsLayerGate` (strings-layer-gate.tsx), wraps the root's Outlet and draws a declaring route once its layers are in; the root's beforeLoad starts the download on a navigation or a link's preload; the NEW census scripts/conformance/strings-layers.ts decides each key's file from the pages that can show it and replaces the admin-layer judge. The standard: message catalogues split by the screens that use them (i18next namespaces, FormatJS lazy messages).
CONSUMERS (at BASE): the provider's chain (provider.tsx :510-:613); the one useAdminStrings caller (routes/admin.tsx :11, :48; i18n/index.ts :4); the catalogue parts and joins (src/i18n/locales/en-base, en-admin, am-base, am-admin, en, am); the screens that show member strings — every requireSignedIn route except /legal/accept and /legal/publishing, settings.tsx and the three /dev pages (B2); the first-paint guards (check-marketplace-imports.mjs :24-:30; bundle-closure.mjs :113-:119; check-bundle-size.mjs :39; route-budgets.mjs); compiled-catalog.test.ts, compiled-admin-loader.test.ts, admin-layer.test.ts, kit-adoption-allowlist.txt :6.
COVERED HERE: every consumer above. LEFT: /legal/accept and /legal/publishing declare no layer (their strings stay in the base part with the public legal pages'); three admin screens import the whole catalogue to test a key or to sync it (src/features/admin-listings/listing-page.tsx :26, src/features/admin/roles/permission-matrix.tsx :7, src/features/admin/translations/languages-page.tsx :27-:28 — INC-902; their pages' ceilings rise, D4); 367 keys no file names (81 in the base part, 286 in the admin part) stay where they are — INC-903, a cleanup turn.
CONFORMANCE GUARD: scripts/conformance/strings-layers.test.ts — CF-SL-1 every catalogue key sits in the file the census names (proven on a planted misplaced key, C7), CF-SL-2 Amharic mirrors English file by file and the parts join to the whole catalogue, CF-SL-3 the declarations (posting and my listings load member; admin screens both, through the admin layout; the listings pages none), CF-SL-4/5 the census on planted trees (a type-only import, the root and a public page that imports a member file each keep a key in the base part), CF-SL-6 the whole tree read; the weight guard's FORBIDDEN_FILES and PUBLIC_MUST_STAY_LAZY (no layer on a public page's first download); e2e/i18n-layers.spec.ts SLE-1…3.
EXCEPTIONS: keys no page shows have no home of their own and stay where they are (the census's null; INC-903).
FIVE LENSES — security: no new input; the gate decides what text is drawn, never who may see a screen (requireSignedIn, the admin gate and RLS stay the authority) · performance: the supervisor's build — the entry 287.9 → 280.2 KiB, every page 7–11 KiB lighter (D3–D4), am-base about 11 KiB lighter; a member screen's strings download beside its code (lab: asked 5 ms after a client navigation, the spinner at 58 ms) · failure modes: a layer's English part fails → error line with Try again (F4); a language part fails → the layer in English (INC-816); no declaration → drawn at once · consistency: one gate for every layer and route; one census for every key · future growth: a new layer is one name in STRINGS_LAYERS, two catalogue files and the declarations; a new language adds its parts to the loaders.
FORWARD-SCAN: the wizard's growth (bundle 23, Stage 2) lands in the member layer by the census; "SSR renders the star language" reads the base part only. REGISTER: docs/governance/mechanisms.md row 19 (F2).

WHY
- Every page's first download carried 591 strings only signed-in screens show and 30 only admin screens show: about 8 KiB for every visitor, 11 KiB more for Amharic readers.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-30.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-30.md (Foundations turn 30: speed S7 — the strings layers: strings a page does not show stay off its first download — D234, DEC-258)` (everything after it stays); the line that begins "  - [ ] Turn 29 (docs/governance/briefs/foundations-turn-29.md" is replaced by these two lines:
  - [x] Turn 29 (docs/governance/briefs/foundations-turn-29.md; no migration) — speed S6: the server draws the listings pages' first cards and the browser keeps them (the hand-over read at once on arrival: HeldFirstPage); turn 28's two siblings onto feedPath and feedRouteOf; INC-901 (D234). Closure HEAD c9da2fd9; CI run 40234419925 green, AP-54 green in CI's lanes; in the sandbox against ethio-staging AP-54 failed both widths — its HTML check read another server render than the navigation it judged (INC-904, fixed in turn 30); unit 297 files / 1861 passed / 1 skipped.
  - [ ] Turn 30 (docs/governance/briefs/foundations-turn-30.md; no migration) — speed S7: the strings layers (DEC-258) — a route declares the strings its screens show, the shell's StringsLayerGate loads them before it draws; the member and admin strings off every page's first download (scripts/conformance/strings-layers.ts judges); the ceilings re-measured; AP-54 judges the navigation's own HTML (INC-904).
Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–F; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- PART B IS ONE BATCH: from B1 to B8 the tree does not build (the routes' declarations need the layer names, the loaders need the member files the mover writes). Write B1–B8 without stopping, run the mover at B5 as soon as B1 and B2 are in, and read /tmp/observability/build-errors.log only after B8. Every later part lands whole.
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn adds e2e/i18n-layers.spec.ts (read-only: no rows) and changes AP-54's HTML check (INC-904).
- Run no stateful git command. Every FILE block is the file's whole text (the mover's names its path outside the repository); every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text; copy them by script or your file-editing tool. The catalogue files are never edited by hand (G43): the mover moves whole entries, values untouched.
- THE FILES: the SCOPE block above, the two deletions of B8, plus docs/governance/briefs/foundations-turn-30.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/features/i18n-runtime.md, docs/features/ci-guards.md, docs/governance/mechanisms.md, AGENTS.md (F6 only), docs/governance/reports/foundations-turn-30.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (F7). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After each part (after B8 for Part B), read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched. D3–D4's ceilings are the supervisor's build of this change; CI's bundle-budget job judges them.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 time out in your sandbox (INC-890); LL-1 can hit its 5-second limit under the full suite (it passes alone); AP-54 can fail in your sandbox — your runs read ethio-staging over a slow path and a server render past the first page's 2-second deadline draws no card (INC-904; after E2 the failure says so). Do not change, skip or work around them; paste their failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407).
- Behaviour contract: every page shows what it shows today; a page that declares a layer shows the spinner until its strings are in (usually already in: the download starts with the navigation); the admin gate still shows "Checking your access…" and still sends a signed-out visitor or a regular user home. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every route whose screens show a member or admin string and declare no layer, every remaining reference to useAdminStrings, compiledAdminLoader or adminLayerOutcome (none may remain), and every file outside tests and scripts importing src/i18n/locales/en.ts or am.ts; K3 the census, its test and SLE-1…3 land with the mechanism; K4 no literal language code in src; K5, K6 do not arise.
- Tests (G27, G38): no real row (SLE-1…3 only read pages); no assertion loosened; the census is shown red on a planted misplaced key (C7) and put back; AP-54 keeps every assertion and gains the navigation's own HTML check.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on a018721a or on c9da2fd9, SUCCESS). A red on a018721a is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part B.

PART B — THE STRINGS LAYERS (ONE BATCH, B1–B8).
B1. NEW scripts/conformance/strings-layers.ts (sha256 2cf556588dc208056a0ffdf0313d248a1cfc7cd0aa0dac21d79ccf94811dfc3f) — the census:
FILE-BEGIN scripts/conformance/strings-layers.ts
import { existsSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import { visitTs, walkFiles } from "./kit";

/**
 * DEC-258 (Foundations turn 30; DEC-231's admin-layer judge, generalised) —
 * WHICH STRINGS RIDE IN EVERY PAGE'S FIRST DOWNLOAD, AND WHICH IN A LAYER.
 *
 * A key's home follows from the pages that can show it:
 *  - the files that NAME it: every string literal equal to the key, and every
 *    literal or template head ending in "." that the key starts with (a key
 *    built as `post.error.${code}`), in src/ outside src/i18n/locales;
 *  - the PAGES that reach those files: each top-level route file under
 *    src/routes (React pages; the server routes under src/routes/api and the
 *    .ts handlers render no strings) and src/routes/__root.tsx — every page —
 *    walked through value imports, re-exports and import(); type-only imports
 *    are erased and not followed;
 *  - the LAYERS each page loads: the strings its route file declares
 *    (`staticData: { strings: [...] }`) and those of the layout routes above
 *    it (a route file whose name is a prefix of the page's, as written).
 * A key every one of whose pages loads a layer lives in the first such layer
 * of STRINGS_LAYERS; any other key a page shows stays in the base part. A key
 * no page shows (no file names it, or only files no page reaches) has no home
 * of its own: it stays in the file it is in.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
/** DEC-258 — the layers in their order (src/i18n/compiled-catalog.ts STRINGS_LAYERS). */
export const LAYERS = ["admin", "member"] as const;
export type Layer = (typeof LAYERS)[number];
export type Home = "base" | Layer;
const EVERY_PAGE = "__root";
const EXTENSIONS = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

/** The catalogue file of a home, per language (src/i18n/locales). */
export function catalogueFile(home: Home, language: "en" | "am"): string {
  return `${language}-${home}.ts`;
}

/** The keys of a catalogue file, in order, from its `"key":` entry lines (none when it is absent). */
export function catalogueKeys(root: string, file: string): string[] {
  const path = join(root, "src", "i18n", "locales", file);
  if (!existsSync(path)) return [];
  const source = readFileSync(path, "utf8");
  return [...source.matchAll(/^\s*"((?:[^"\\]|\\.)+)"\s*:/gm)].map((match) => match[1] as string);
}

function resolveImport(srcRoot: string, spec: string, fromFile: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = join(srcRoot, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;
  for (const ext of EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

type Scan = { imports: string[]; exact: string[]; prefixes: string[]; strings: string[] };

/** One file's value imports, its literals, and (for a route file) its declared strings. */
function scan(file: string): Scan {
  const out: Scan = { imports: [], exact: [], prefixes: [], strings: [] };
  const literal = (text: string) => (text.endsWith(".") ? out.prefixes : out.exact).push(text);
  visitTs(file, (node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.importClause;
      const typeOnly =
        clause !== undefined &&
        (clause.isTypeOnly ||
          (clause.name === undefined &&
            clause.namedBindings !== undefined &&
            ts.isNamedImports(clause.namedBindings) &&
            clause.namedBindings.elements.length > 0 &&
            clause.namedBindings.elements.every((element) => element.isTypeOnly)));
      if (!typeOnly) out.imports.push(node.moduleSpecifier.text);
      return;
    }
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier !== undefined &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      if (!node.isTypeOnly) out.imports.push(node.moduleSpecifier.text);
      return;
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] !== undefined &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      out.imports.push(node.arguments[0].text);
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent)) return;
      literal(node.text);
      return;
    }
    if (ts.isTemplateExpression(node)) {
      literal(node.head.text);
      return;
    }
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText() === "staticData" &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const property of node.initializer.properties) {
        if (
          ts.isPropertyAssignment(property) &&
          property.name.getText() === "strings" &&
          ts.isArrayLiteralExpression(property.initializer)
        ) {
          for (const element of property.initializer.elements) {
            if (ts.isStringLiteral(element)) out.strings.push(element.text);
          }
        }
      }
    }
  });
  return out;
}

export type StringsCensus = {
  /** Each page (route file stem, "__root" for every page) → the layers it loads. */
  pages: Map<string, Set<string>>;
  /** Each catalogue key → the files that name it (root-relative). */
  namedBy: Map<string, string[]>;
  /** Each catalogue key → the pages that reach a file naming it. */
  shownOn: Map<string, string[]>;
  /** Each catalogue key → where it belongs; null when no page shows it (it stays put). */
  home: Map<string, Home | null>;
  /** Files scanned. */
  scanned: number;
};

/** The census over a tree (the repository by default). */
export function stringsCensus(root = ROOT): StringsCensus {
  const srcRoot = join(root, "src");
  const routesRoot = join(srcRoot, "routes");
  const generated = join(routesRoot, "routeTree.gen.ts");
  const locales = join(srcRoot, "i18n", "locales");
  const files = walkFiles([srcRoot], { ext: ["ts", "tsx"], skipTests: true }).filter(
    (file) => file !== generated,
  );
  const scans = new Map<string, Scan>(files.map((file) => [file, scan(file)]));

  // Pages: the top-level React route files; each one's declared layers, then its layouts'.
  const pageFiles = files.filter((file) => dirname(file) === routesRoot && file.endsWith(".tsx"));
  const stemOf = (file: string) => basename(file).replace(/\.tsx$/, "");
  const declared = new Map<string, string[]>(
    pageFiles.map((file) => [stemOf(file), scans.get(file)?.strings ?? []]),
  );
  const pages = new Map<string, Set<string>>();
  for (const stem of declared.keys()) {
    const layers = new Set<string>();
    const segments = stem.split(".");
    for (let end = 1; end <= segments.length; end += 1) {
      for (const layer of declared.get(segments.slice(0, end).join(".")) ?? []) layers.add(layer);
    }
    pages.set(stem, layers);
  }

  // Which pages reach each file.
  const reachedBy = new Map<string, Set<string>>();
  for (const pageFile of pageFiles) {
    const page = stemOf(pageFile);
    const queue = [pageFile];
    const seen = new Set<string>();
    while (queue.length > 0) {
      const file = queue.pop() as string;
      if (seen.has(file)) continue;
      seen.add(file);
      const reached = reachedBy.get(file) ?? new Set<string>();
      reached.add(page);
      reachedBy.set(file, reached);
      for (const spec of scans.get(file)?.imports ?? []) {
        const next = resolveImport(srcRoot, spec, file);
        if (next !== null && next !== generated && !seen.has(next)) queue.push(next);
      }
    }
  }

  // Which files name each literal.
  const exact = new Map<string, Set<string>>();
  const prefixes: { prefix: string; file: string }[] = [];
  for (const [file, found] of scans) {
    if (file.startsWith(`${locales}/`)) continue;
    for (const text of found.exact) {
      const naming = exact.get(text) ?? new Set<string>();
      naming.add(file);
      exact.set(text, naming);
    }
    for (const prefix of new Set(found.prefixes)) prefixes.push({ prefix, file });
  }

  const keys = [
    ...catalogueKeys(root, "en-base.ts"),
    ...LAYERS.flatMap((layer) => catalogueKeys(root, catalogueFile(layer, "en"))),
  ];
  const namedBy = new Map<string, string[]>();
  const shownOn = new Map<string, string[]>();
  const home = new Map<string, Home | null>();
  for (const key of keys) {
    const naming = new Set(exact.get(key) ?? []);
    for (const { prefix, file } of prefixes) if (key.startsWith(prefix)) naming.add(file);
    const onPages = new Set<string>();
    for (const file of naming) for (const page of reachedBy.get(file) ?? []) onPages.add(page);
    namedBy.set(key, [...naming].map((file) => relative(root, file).split(sep).join("/")).sort());
    shownOn.set(key, [...onPages].sort());
    let where: Home | null = onPages.size === 0 ? null : "base";
    if (onPages.size > 0 && !onPages.has(EVERY_PAGE)) {
      for (const layer of LAYERS) {
        if ([...onPages].every((page) => pages.get(page)?.has(layer) === true)) {
          where = layer;
          break;
        }
      }
    }
    home.set(key, where);
  }
  return { pages, namedBy, shownOn, home, scanned: files.length };
}

/** Every key that sits in a file other than its home, one line each. */
export function misplaced(census: StringsCensus, root = ROOT): string[] {
  const lines: string[] = [];
  for (const sits of ["base", ...LAYERS] as Home[]) {
    for (const key of catalogueKeys(root, catalogueFile(sits, "en"))) {
      const belongs = census.home.get(key) ?? null;
      if (belongs === null || belongs === sits) continue;
      const pages = census.shownOn.get(key) ?? [];
      lines.push(
        `${key} — in ${catalogueFile(sits, "en")}, belongs in ${catalogueFile(belongs, "en")} (shown on: ${pages.length > 0 ? pages.join(", ") : "no page"})`,
      );
    }
  }
  return lines.sort();
}

// `bun run scripts/conformance/strings-layers.ts --print` — each key and its home, as JSON.
if (process.argv.includes("--print")) {
  const census = stringsCensus();
  console.log(JSON.stringify(Object.fromEntries(census.home), null, 1));
}
FILE-END scripts/conformance/strings-layers.ts
B2. The routes' declarations. In each of these thirteen files, directly above its one line that begins `  component: `, add exactly these two lines (two spaces of indent, as shown):
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
The files: src/routes/account.tsx, src/routes/account_.legal.tsx, src/routes/account_.legal_.$versionId.tsx, src/routes/account_.saved.tsx, src/routes/settings.tsx, src/routes/post.tsx, src/routes/post_.$listingId.tsx, src/routes/my-listings.tsx, src/routes/my-listings_.$listingId.tsx, src/routes/my-listings_.$listingId_.edit.tsx, src/routes/dev.primitives.tsx, src/routes/dev.style.tsx, src/routes/dev.tall.tsx. Then src/routes/admin.tsx, these edits (the admin layout declares admin and member; its own strings code goes to the shell's gate):
EDIT src/routes/admin.tsx #1
OLD-BEGIN
import { usePermissions } from "@/features/permissions/usePermissions";
import { useAdminStrings, useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";

OLD-END
NEW-BEGIN
import { usePermissions } from "@/features/permissions/usePermissions";
import { useI18n } from "@/i18n";

NEW-END
EDIT src/routes/admin.tsx #2
OLD-BEGIN
  }),
  component: AdminGate,
OLD-END
NEW-BEGIN
  }),
  // DEC-258 — the admin screens show the admin and member strings layers; the
  // shell's gate loads both before this layout draws.
  staticData: { strings: ["admin", "member"] },
  component: AdminGate,
NEW-END
EDIT src/routes/admin.tsx #3
OLD-BEGIN
  const pending = authLoading || loading;
  // DEC-231 — ask for the admin strings layer before any return; the gate
  // waits for it (its own waiting line rides in the first-paint part).
  const adminStrings = useAdminStrings();

OLD-END
NEW-BEGIN
  const pending = authLoading || loading;

NEW-END
EDIT src/routes/admin.tsx #4
OLD-BEGIN

  // DEC-231 — the admin strings layer failed to load: say so, with a retry;
  // the base strings still answer, so this line is never blank (F4).
  if (adminStrings.state === "failed") {
    return (
      <div
        role="alert"
        data-testid="admin-strings-failed"
        className="flex min-h-40 flex-col items-center justify-center gap-3 text-sm text-muted-foreground"
      >
        {t("auth.errorGeneric")}
        <Button data-testid="admin-strings-retry" onClick={adminStrings.retry}>
          {t("common.tryAgain")}
        </Button>
      </div>
    );
  }

  // The layer is on its way: the same waiting line as the permission read.
  if (adminStrings.state !== "ready") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-40 items-center justify-center text-sm text-muted-foreground"
      >
        {t("admin.loading")}
      </div>
    );
  }

  return (
OLD-END
NEW-BEGIN

  return (
NEW-END
B3. NEW src/components/shell/strings-layers.ts (sha256 ca7232b7cb1fa3583ac322aca9fbe640d3847521297c33b0a0abaa6b9e8ed408):
FILE-BEGIN src/components/shell/strings-layers.ts
import { STRINGS_LAYERS, type StringsLayer } from "@/i18n";

/**
 * DEC-258 — A ROUTE NAMES THE STRINGS LAYERS ITS SCREENS SHOW.
 *
 * `staticData: { strings: ["member"] }` on a route (or on a layout above it)
 * declares that its screens show that layer's keys; the shell's gate
 * (StringsLayerGate) loads every layer the matched routes declare before the
 * route draws, and the root's beforeLoad starts the download on a navigation
 * or a link's preload. scripts/conformance/strings-layers.ts decides which
 * keys live in which layer from these declarations.
 */
declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    /** The strings layers this route's screens show (DEC-258). */
    strings?: readonly StringsLayer[];
  }
}

/** The layers a set of matched routes declare, in STRINGS_LAYERS order, each once. */
export function declaredLayers(
  staticData: readonly { strings?: readonly StringsLayer[] }[],
): StringsLayer[] {
  return STRINGS_LAYERS.filter((layer) =>
    staticData.some((data) => data.strings?.includes(layer) === true),
  );
}
FILE-END src/components/shell/strings-layers.ts
NEW src/components/shell/strings-layer-gate.tsx (sha256 e00d132b38b9b80410b6f76899ccdb015a5cae1c435807539b1ef4da0db68771):
FILE-BEGIN src/components/shell/strings-layer-gate.tsx
import { useMatches } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Spinner } from "@/components/brand/spinner";
import { Button } from "@/components/ui/button";
import { isStringsLayer, useI18n, useStringsLayers, type StringsLayer } from "@/i18n";

import { declaredLayers } from "./strings-layers";

/**
 * DEC-258 (DEC-231's admin gate, generalised) — THE ONE GATE FOR THE STRINGS
 * LAYERS. It wraps the routes' outlet in the shell: when the matched routes
 * declare layers (staticData.strings), it asks for them and draws the route
 * only once they are in — a waiting line meanwhile, an error line with Try
 * again if a load fails (F4: its own lines ride in the first paint, so it is
 * never blank). A page that declares none draws at once, unchanged.
 */
export function StringsLayerGate({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  // One string for the declared layers, so a new match list of the same layers re-renders nothing.
  const declared = useMatches({
    select: (matches) => declaredLayers(matches.map((match) => match.staticData)).join(","),
  });
  const layers: StringsLayer[] = declared.split(",").filter(isStringsLayer);
  const strings = useStringsLayers(layers);
  if (strings.state === "failed") {
    return (
      <div
        role="alert"
        data-testid="strings-layer-failed"
        className="flex min-h-40 flex-col items-center justify-center gap-3 text-sm text-muted-foreground"
      >
        {t("auth.errorGeneric")}
        <Button data-testid="strings-layer-retry" onClick={strings.retry}>
          {t("common.tryAgain")}
        </Button>
      </div>
    );
  }
  if (strings.state !== "ready") {
    return (
      <div data-testid="strings-layer-waiting" className="flex justify-center py-12">
        <Spinner label={t("common.loading")} />
      </div>
    );
  }
  return <>{children}</>;
}
FILE-END src/components/shell/strings-layer-gate.tsx
B4. src/i18n/compiled-catalog.ts, these edits (the layers, their loaders, the warm-up, layerOutcome):
EDIT src/i18n/compiled-catalog.ts #1
OLD-BEGIN
import { loadOnce } from "@/lib/load-once";
OLD-END
NEW-BEGIN
import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";
NEW-END
EDIT src/i18n/compiled-catalog.ts #2
OLD-BEGIN
/**
 * DEC-231 — the ADMIN layer rides apart from the first paint: the admin gate
 * asks for it (useAdminStrings), so its loaders are a second map. A compiled
 * admin layer is a PART of Messages; a language without one has none to load.
 */
const EN_ADMIN = loadOnce(() => import("./locales/en-admin").then((m) => m.enAdmin));
const AM_ADMIN = loadOnce(() => import("./locales/am-admin").then((m) => m.amAdmin));
const adminLoaders: Partial<Record<string, () => Promise<Partial<Messages>>>> = {
  en: () => EN_ADMIN.load(),
  am: () => AM_ADMIN.load(),
};

/**
OLD-END
NEW-BEGIN
/**
 * DEC-231, generalised by DEC-258 (Foundations turn 30) — THE STRINGS LAYERS.
 * A string only some screens show rides apart from the first paint: the routes
 * that show it declare its layer (`staticData: { strings: [...] }`), and the
 * shell's gate (StringsLayerGate) loads the declared layers before those
 * routes draw. A compiled layer is a PART of Messages; a language without one
 * has none to load. The order is the census's preference: a key every one of
 * whose pages loads both layers lives in the first
 * (scripts/conformance/strings-layers.ts).
 */
export const STRINGS_LAYERS = ["admin", "member"] as const;
export type StringsLayer = (typeof STRINGS_LAYERS)[number];

const EN_ADMIN = loadOnce(() => import("./locales/en-admin").then((m) => m.enAdmin));
const AM_ADMIN = loadOnce(() => import("./locales/am-admin").then((m) => m.amAdmin));
const EN_MEMBER = loadOnce(() => import("./locales/en-member").then((m) => m.enMember));
const AM_MEMBER = loadOnce(() => import("./locales/am-member").then((m) => m.amMember));
const layerLoaders: Record<
  StringsLayer,
  Partial<Record<string, () => Promise<Partial<Messages>>>>
> = {
  admin: { en: () => EN_ADMIN.load(), am: () => AM_ADMIN.load() },
  member: { en: () => EN_MEMBER.load(), am: () => AM_MEMBER.load() },
};

/** A layer name read from outside (a route's declaration joined into a key). */
export function isStringsLayer(value: string): value is StringsLayer {
  return (STRINGS_LAYERS as readonly string[]).includes(value);
}

/**
NEW-END
EDIT src/i18n/compiled-catalog.ts #3
OLD-BEGIN

/** The admin layer's loader, under the same own-key law as compiledCatalogLoader. */
export function compiledAdminLoader(code: string): (() => Promise<Partial<Messages>>) | undefined {
  return Object.prototype.hasOwnProperty.call(adminLoaders, code) ? adminLoaders[code] : undefined;
}
OLD-END
NEW-BEGIN

/** A layer's loader for a language, under the same own-key law as compiledCatalogLoader. */
export function compiledLayerLoader(
  layer: StringsLayer,
  code: string,
): (() => Promise<Partial<Messages>>) | undefined {
  const loaders = layerLoaders[layer];
  return Object.prototype.hasOwnProperty.call(loaders, code) ? loaders[code] : undefined;
}

/**
 * DEC-258 — start downloading the layers a route is about to show, for the
 * given languages (the root's beforeLoad, on a navigation or a link's
 * preload), so the gate seldom waits. Only a head start: the provider's load
 * reports and retries a failure.
 */
export function warmStringsLayers(layers: readonly StringsLayer[], codes: readonly string[]): void {
  for (const layer of layers) {
    for (const code of new Set(codes)) {
      compiledLayerLoader(layer, code)?.().catch((error: unknown) => {
        console.warn(`[i18n] warming the ${layer} strings for ${code} failed: ${errorText(error)}`);
      });
    }
  }
}
NEW-END
EDIT src/i18n/compiled-catalog.ts #4
OLD-BEGIN
/**
 * INC-816 (bundle 22 turn 24) — which admin parts apply after a load, and the
 * admin layer's state. `enAdmin` is the English admin part loaded this run or
 * kept from an earlier run (null when none was ever loaded); `langAdmin` is the
 * language's own admin part (null when it failed or the language has none).
 * With the English part in hand the layer is ready — a failed language part
 * leaves admin text in English, never blank. Without it the base applies alone
 * and the state is failed, unless it was already ready.
 */
export function adminLayerOutcome(input: {
  enAdmin: Partial<Messages> | null;
  langAdmin: Partial<Messages> | null;
  wasReady: boolean;
}): {
  enAdmin: Partial<Messages> | null;
  langAdmin: Partial<Messages> | null;
  state: "ready" | "failed";
} {
  if (input.enAdmin === null) {
    return { enAdmin: null, langAdmin: null, state: input.wasReady ? "ready" : "failed" };
  }
  return { enAdmin: input.enAdmin, langAdmin: input.langAdmin, state: "ready" };
}
OLD-END
NEW-BEGIN
/**
 * INC-816 (bundle 22 turn 24; every layer since DEC-258) — which parts of a
 * layer apply after a load, and the layer's state. `en` is the English part
 * loaded this run or kept from an earlier run (null when none was ever
 * loaded); `lang` is the language's own part (null when it failed or the
 * language has none). With the English part in hand the layer is ready — a
 * failed language part leaves the layer's text in English, never blank.
 * Without it the base applies alone and the state is failed, unless it was
 * already ready.
 */
export function layerOutcome(input: {
  en: Partial<Messages> | null;
  lang: Partial<Messages> | null;
  wasReady: boolean;
}): {
  en: Partial<Messages> | null;
  lang: Partial<Messages> | null;
  state: "ready" | "failed";
} {
  if (input.en === null) {
    return { en: null, lang: null, state: input.wasReady ? "ready" : "failed" };
  }
  return { en: input.en, lang: input.lang, state: "ready" };
}
NEW-END
src/i18n/provider.tsx, these edits (per-layer state and requests; the chain over every asked layer; useStringsLayers in place of useAdminStrings):
EDIT src/i18n/provider.tsx #1
OLD-BEGIN
import { enBase } from "./locales/en-base";
import { adminLayerOutcome, compiledAdminLoader, compiledCatalogLoader } from "./compiled-catalog";
import { type Language, type MessageKey, type Messages } from "./types";
OLD-END
NEW-BEGIN
import { enBase } from "./locales/en-base";
import {
  STRINGS_LAYERS,
  compiledCatalogLoader,
  compiledLayerLoader,
  isStringsLayer,
  layerOutcome,
  type StringsLayer,
} from "./compiled-catalog";
import { type Language, type MessageKey, type Messages } from "./types";
NEW-END
EDIT src/i18n/provider.tsx #2
OLD-BEGIN
 * DEC-231 — the English FIRST-PAINT part, typed as the full catalog so the
 * provider's state and fallback chain keep their shape. The admin.* keys are
 * undefined until the admin gate's layer loads; the gate waits for them (E4).
 */
OLD-END
NEW-BEGIN
 * DEC-231 — the English FIRST-PAINT part, typed as the full catalog so the
 * provider's state and fallback chain keep their shape. A layer's keys
 * (DEC-258: admin, member) are undefined until the layer loads; the shell's
 * gate waits for them before a route that declares the layer draws.
 */
NEW-END
EDIT src/i18n/provider.tsx #3
OLD-BEGIN
  setStar: (code: Language) => void;
  /** DEC-231 — the admin strings layer: idle until the admin gate asks for it. */
  adminStrings: "idle" | "loading" | "ready" | "failed";
  /** DEC-231 — ask for the admin strings layer; also the retry after a failure. */
  requestAdminStrings: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);
OLD-END
NEW-BEGIN
  setStar: (code: Language) => void;
  /** DEC-258 — each strings layer's state: idle until a route that shows it asks. */
  layerStates: Record<StringsLayer, LayerState>;
  /** DEC-258 — ask for a strings layer; also the retry after a failure. */
  requestStringsLayer: (layer: StringsLayer) => void;
};

/** DEC-258 — where a strings layer's load stands. */
export type LayerState = "idle" | "loading" | "ready" | "failed";

function everyLayer<T>(value: T): Record<StringsLayer, T> {
  return Object.fromEntries(STRINGS_LAYERS.map((layer) => [layer, value])) as Record<
    StringsLayer,
    T
  >;
}

const I18nContext = createContext<I18nValue | null>(null);
NEW-END
EDIT src/i18n/provider.tsx #4
OLD-BEGIN
  const [appliedLanguage, setAppliedLanguage] = useState<Language>(BASE_LANGUAGE);
  // DEC-231 — the admin strings layer loads only when the admin gate asks
  // (useAdminStrings). adminRequest is the retry counter: each request, first
  // or repeated, re-runs the load effect.
  const [adminStrings, setAdminStrings] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [adminRequest, setAdminRequest] = useState(0);
  const requestAdminStrings = useCallback(() => {
    setAdminRequest((n) => n + 1);
    setAdminStrings((current) => (current === "ready" ? current : "loading"));
  }, []);
OLD-END
NEW-BEGIN
  const [appliedLanguage, setAppliedLanguage] = useState<Language>(BASE_LANGUAGE);
  // DEC-258 — a strings layer loads only when a route that shows it asks
  // (useStringsLayers, through the shell's gate). Each layer's request count is
  // its retry counter: each request, first or repeated, re-runs the load effect.
  const [layerStates, setLayerStates] = useState<Record<StringsLayer, LayerState>>(() =>
    everyLayer<LayerState>("idle"),
  );
  const [layerRequests, setLayerRequests] = useState<Record<StringsLayer, number>>(() =>
    everyLayer(0),
  );
  // A layer already in is not asked again: a screen that mounts later finds it ready.
  const layerStatesRef = useRef(layerStates);
  useEffect(() => {
    layerStatesRef.current = layerStates;
  }, [layerStates]);
  const requestStringsLayer = useCallback((layer: StringsLayer) => {
    if (layerStatesRef.current[layer] === "ready") return;
    setLayerRequests((current) => ({ ...current, [layer]: current[layer] + 1 }));
    setLayerStates((current) =>
      current[layer] === "ready" ? current : { ...current, [layer]: "loading" },
    );
  }, []);
NEW-END
EDIT src/i18n/provider.tsx #5
OLD-BEGIN
  const warnedMissingRef = useRef<Set<string>>(new Set());
  /** INC-816 — the English admin part, once loaded, is kept for later runs. */
  const enAdminRef = useRef<Partial<Messages> | null>(null);
  const { settled: authSettled, userId } = useAuthIdentity();
OLD-END
NEW-BEGIN
  const warnedMissingRef = useRef<Set<string>>(new Set());
  /** INC-816 — each layer's English part, once loaded, is kept for later runs. */
  const enLayersRef = useRef<Partial<Record<StringsLayer, Partial<Messages>>>>({});
  const { settled: authSettled, userId } = useAuthIdentity();
NEW-END
EDIT src/i18n/provider.tsx #6
OLD-BEGIN

  // Load the active locale only; the admin layer joins it once the gate asks.
  useEffect(() => {
    let cancelled = false;
    const wantAdmin = adminRequest > 0;

OLD-END
NEW-BEGIN

  // Load the active locale only; a strings layer joins it once a route asks.
  useEffect(() => {
    let cancelled = false;
    const wanted = STRINGS_LAYERS.filter((layer) => layerRequests[layer] > 0);

NEW-END
EDIT src/i18n/provider.tsx #7
OLD-BEGIN
     *
     *   en-base  ▸  en-admin  ▸  compiled[lang]  ▸  compiled[lang]-admin  ▸  DB[lang]
     *
     * (DEC-231: the two admin layers enter the chain only once the admin gate
     * asked for them; until then the first paint is en-base ▸ compiled[lang]
     * ▸ DB[lang]) so an empty, partial or failing bundle is INVISIBLE: the
     * compiled active catalog still answers every key, and compiled English
     * is the last resort.
     */
OLD-END
NEW-BEGIN
     *
     *   en-base  ▸  en-<layers>  ▸  compiled[lang]  ▸  compiled[lang]-<layers>  ▸  DB[lang]
     *
     * (DEC-231, DEC-258: a strings layer's two parts enter the chain only once
     * a route asked for it, in STRINGS_LAYERS order; until then the first
     * paint is en-base ▸ compiled[lang] ▸ DB[lang]) so an empty, partial or
     * failing bundle is INVISIBLE: the compiled active catalog still answers
     * every key, and compiled English is the last resort.
     */
NEW-END
EDIT src/i18n/provider.tsx #8
OLD-BEGIN
      compiled: Partial<Messages>,
      enAdmin: Partial<Messages> | null,
      langAdmin: Partial<Messages> | null,
    ) => {
      if (cancelled) return;
      const base = {
        ...enFirstPaint,
        ...(enAdmin ?? {}),
        ...compiled,
        ...(langAdmin ?? {}),
      } as Messages;
OLD-END
NEW-BEGIN
      compiled: Partial<Messages>,
      parts: { en: Partial<Messages> | null; lang: Partial<Messages> | null }[],
    ) => {
      if (cancelled) return;
      const merge = (pick: (part: (typeof parts)[number]) => Partial<Messages> | null) =>
        parts.reduce<Partial<Messages>>((all, part) => ({ ...all, ...(pick(part) ?? {}) }), {});
      const base = {
        ...enFirstPaint,
        ...merge((part) => part.en),
        ...compiled,
        ...merge((part) => part.lang),
      } as Messages;
NEW-END
EDIT src/i18n/provider.tsx #9
OLD-BEGIN
      if (cancelled) return;
      if (!wantAdmin) {
        applyWithBundle(compiled, null, null);
        return;
      }
      // INC-816 — two separate tries: the English admin part (kept once loaded)
      // and the language's own part; a failed language part never blanks admin text.
      let enAdmin: Partial<Messages> | null = enAdminRef.current;
      try {
        const enAdminLoader = compiledAdminLoader(BASE_LANGUAGE);
        const loaded = enAdminLoader ? await enAdminLoader() : {};
        enAdminRef.current = loaded;
        enAdmin = loaded;
      } catch (reason) {
        // F4 — never silent: the kept part, if any, still applies.
        console.error(`[i18n] admin strings for ${BASE_LANGUAGE} failed: ${errorText(reason)}`);
      }
      let langAdmin: Partial<Messages> | null = null;
      if (language !== BASE_LANGUAGE) {
        try {
          const langAdminLoader = compiledAdminLoader(language);
          langAdmin = langAdminLoader ? await langAdminLoader() : null;
        } catch (reason) {
          // F4 — never silent, never blank: the English admin part still applies.
          console.error(`[i18n] admin strings for ${language} failed: ${errorText(reason)}`);
        }
      }
      if (cancelled) return;
      const outcome = adminLayerOutcome({ enAdmin, langAdmin, wasReady: false });
      applyWithBundle(compiled, outcome.enAdmin, outcome.langAdmin);
      if (!cancelled) {
        setAdminStrings(
          (current) =>
            adminLayerOutcome({ enAdmin, langAdmin, wasReady: current === "ready" }).state,
        );
      }
    };
OLD-END
NEW-BEGIN
      if (cancelled) return;
      // INC-816 — per layer, two separate tries: the English part (kept once
      // loaded) and the language's own part; a failed language part never
      // blanks the layer's text.
      const loaded = await Promise.all(
        wanted.map(async (layer) => {
          let en: Partial<Messages> | null = enLayersRef.current[layer] ?? null;
          try {
            const enLoader = compiledLayerLoader(layer, BASE_LANGUAGE);
            const part = enLoader ? await enLoader() : {};
            enLayersRef.current[layer] = part;
            en = part;
          } catch (reason) {
            // F4 — never silent: the kept part, if any, still applies.
            console.error(
              `[i18n] ${layer} strings for ${BASE_LANGUAGE} failed: ${errorText(reason)}`,
            );
          }
          let lang: Partial<Messages> | null = null;
          if (language !== BASE_LANGUAGE) {
            try {
              const langLoader = compiledLayerLoader(layer, language);
              lang = langLoader ? await langLoader() : null;
            } catch (reason) {
              // F4 — never silent, never blank: the English part still applies.
              console.error(`[i18n] ${layer} strings for ${language} failed: ${errorText(reason)}`);
            }
          }
          return { layer, en, lang };
        }),
      );
      if (cancelled) return;
      applyWithBundle(
        compiled,
        loaded.map(({ en, lang }) => layerOutcome({ en, lang, wasReady: false })),
      );
      if (loaded.length === 0 || cancelled) return;
      setLayerStates((current) => {
        const next = { ...current };
        for (const { layer, en, lang } of loaded) {
          next[layer] = layerOutcome({ en, lang, wasReady: current[layer] === "ready" }).state;
        }
        return next;
      });
    };
NEW-END
EDIT src/i18n/provider.tsx #10
OLD-BEGIN
    };
  }, [language, authSettled, adminRequest]);

OLD-END
NEW-BEGIN
    };
  }, [language, authSettled, layerRequests]);

NEW-END
EDIT src/i18n/provider.tsx #11
OLD-BEGIN
      setStar,
      adminStrings,
      requestAdminStrings,
    }),
OLD-END
NEW-BEGIN
      setStar,
      layerStates,
      requestStringsLayer,
    }),
NEW-END
EDIT src/i18n/provider.tsx #12
OLD-BEGIN
      setStar,
      adminStrings,
      requestAdminStrings,
    ],
OLD-END
NEW-BEGIN
      setStar,
      layerStates,
      requestStringsLayer,
    ],
NEW-END
EDIT src/i18n/provider.tsx #13
OLD-BEGIN
/**
 * DEC-231 — the admin gate's ask for the admin strings layer: requests it
 * once on mount and reports where the load stands. retry asks again.
 */
export function useAdminStrings(): {
  state: "idle" | "loading" | "ready" | "failed";
  retry: () => void;
OLD-END
NEW-BEGIN
/**
 * DEC-258 (DEC-231's admin gate, generalised) — a screen's ask for the strings
 * layers it shows: requests each once on mount (and whenever the list
 * changes) and reports where the load stands — ready only when every layer is
 * in, failed when any failed. retry asks again for the layers not ready.
 */
export function useStringsLayers(layers: readonly StringsLayer[]): {
  state: LayerState;
  retry: () => void;
NEW-END
EDIT src/i18n/provider.tsx #14
OLD-BEGIN
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useAdminStrings must be used within <I18nProvider>");
  const { adminStrings, requestAdminStrings } = ctx;
  useEffect(() => {
    requestAdminStrings();
  }, [requestAdminStrings]);
  return { state: adminStrings, retry: requestAdminStrings };
}
OLD-END
NEW-BEGIN
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useStringsLayers must be used within <I18nProvider>");
  const { layerStates, requestStringsLayer } = ctx;
  // One string for the list, so a new array of the same layers asks nothing again.
  const asked = layers.join(",");
  useEffect(() => {
    for (const layer of asked.split(",")) {
      if (isStringsLayer(layer)) requestStringsLayer(layer);
    }
  }, [asked, requestStringsLayer]);
  const states = layers.map((layer) => layerStates[layer]);
  const state: LayerState = states.includes("failed")
    ? "failed"
    : states.every((one) => one === "ready")
      ? "ready"
      : "loading";
  const retry = useCallback(() => {
    for (const layer of asked.split(",")) {
      if (isStringsLayer(layer) && layerStates[layer] !== "ready") requestStringsLayer(layer);
    }
  }, [asked, layerStates, requestStringsLayer]);
  return { state, retry };
}
NEW-END
src/i18n/index.ts, these edits:
EDIT src/i18n/index.ts #1
OLD-BEGIN
  useAdminStrings,
OLD-END
NEW-BEGIN
  useStringsLayers,
NEW-END
EDIT src/i18n/index.ts #2
OLD-BEGIN
export type { PublicLanguage } from "./provider";
OLD-END
NEW-BEGIN
export type { LayerState, PublicLanguage } from "./provider";
export { STRINGS_LAYERS, isStringsLayer, type StringsLayer } from "./compiled-catalog";
NEW-END
B5. The mover — values moved by script, never retyped (G43). Write this file OUTSIDE the repository as /tmp/turn30/move-strings.ts (sha256 eb301960edd98401030861ab30e017632a2bbc8d7c103ac8845086073d303f53):
FILE-BEGIN /tmp/turn30/move-strings.ts
// DEC-258 (Foundations turn 30) — moves each catalogue entry to the file the strings-layers
// census names, values untouched (G43). Run once, from outside the repository:
//   bun /tmp/turn30/move-strings.ts <repo root>
// It rewrites src/i18n/locales/{en,am}-{base,admin,member}.ts; the joins are written by the brief.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? process.cwd();
const { stringsCensus, LAYERS } = await import(join(root, "scripts/conformance/strings-layers.ts"));

type Entry = { key: string; lines: string[]; blankBefore: boolean };
type Part = { head: string[]; entries: Entry[]; close: string };
const HOMES = ["base", ...LAYERS] as const;
type Home = (typeof HOMES)[number];
const locales = join(root, "src/i18n/locales");

function read(file: string): Part | null {
  const path = join(locales, file);
  if (!existsSync(path)) return null;
  const lines = readFileSync(path, "utf8").replace(/\n$/, "").split("\n");
  const open = lines.findIndex((line) => line.endsWith("= {"));
  const close = lines.length - 1;
  if (open < 0 || !/^\}( as const)?;$/.test(lines[close] ?? "")) throw new Error(`${file}: unexpected shape`);
  const entries: Entry[] = [];
  let pending: string[] = [];
  let blank = false;
  for (const line of lines.slice(open + 1, close)) {
    if (line.trim() === "") {
      blank = true;
      continue;
    }
    if (/^  (?:\/\/|\/\*.*\*\/$)/.test(line)) {
      if (pending.length === 0 && entries.length > 0 && blank) pending.push("\u0000blank");
      pending.push(line);
      blank = false;
      continue;
    }
    const start = /^  "((?:[^"\\]|\\.)+)"\s*:/.exec(line);
    if (start) {
      const blankBefore = blank || pending[0] === "\u0000blank";
      entries.push({
        key: start[1] as string,
        lines: [...pending.filter((text) => text !== "\u0000blank"), line],
        blankBefore,
      });
      pending = [];
      blank = false;
      continue;
    }
    if (/^    /.test(line) && entries.length > 0) {
      (entries[entries.length - 1] as Entry).lines.push(line);
      continue;
    }
    throw new Error(`${file}: unexpected line: ${line}`);
  }
  if (pending.length > 0) throw new Error(`${file}: a comment with no entry after it`);
  return { head: lines.slice(0, open + 1), entries, close: lines[close] as string };
}

function write(file: string, part: Part): void {
  const out = [...part.head];
  part.entries.forEach((entry, index) => {
    if (index > 0 && entry.blankBefore) out.push("");
    out.push(...entry.lines);
  });
  out.push(part.close);
  writeFileSync(join(locales, file), `${out.join("\n")}\n`);
}

const census = stringsCensus(root);
for (const language of ["en", "am"] as const) {
  const parts = new Map<Home, Part>();
  for (const home of HOMES) {
    const part = read(`${language}-${home}.ts`);
    if (part !== null) parts.set(home, part);
  }
  const fresh = (home: Home): Part => {
    const name = `${language}${home[0]?.toUpperCase()}${home.slice(1)}`;
    const en = `en${home[0]?.toUpperCase()}${home.slice(1)}`;
    return language === "en"
      ? { head: [`export const ${name} = {`], entries: [], close: "} as const;" }
      : {
          head: [
            `import type { ${en} } from "./en-${home}";`,
            "",
            `export const ${name}: { [K in keyof typeof ${en}]: string } = {`,
          ],
          entries: [],
          close: "};",
        };
  };
  const kept = new Map<Home, Entry[]>(HOMES.map((home) => [home, []]));
  const arriving = new Map<Home, Entry[]>(HOMES.map((home) => [home, []]));
  for (const home of HOMES) {
    for (const entry of parts.get(home)?.entries ?? []) {
      const target = census.home.get(entry.key) ?? home;
      (target === home ? kept : arriving).get(target)?.push(entry);
    }
  }
  for (const home of HOMES) {
    const part = parts.get(home) ?? fresh(home);
    const stay = kept.get(home) ?? [];
    const come = (arriving.get(home) ?? []).map((entry, index) =>
      index === 0 ? { ...entry, blankBefore: stay.length > 0 } : entry,
    );
    write(`${language}-${home}.ts`, { ...part, entries: [...stay, ...come] });
    console.log(`${language}-${home}.ts: ${stay.length} kept, ${come.length} arrived`);
  }
}
FILE-END /tmp/turn30/move-strings.ts
Run it from the repository's root: `bun /tmp/turn30/move-strings.ts "$PWD"`. It must print exactly these six lines (anything else is a STOP — paste it):
en-base.ts: 657 kept, 0 arrived
en-admin.ts: 1572 kept, 30 arrived
en-member.ts: 0 kept, 591 arrived
am-base.ts: 657 kept, 0 arrived
am-admin.ts: 1572 kept, 30 arrived
am-member.ts: 0 kept, 591 arrived
It writes src/i18n/locales/en-base.ts, en-admin.ts, en-member.ts (new), am-base.ts, am-admin.ts and am-member.ts (new); their sha256 must then equal THE CHECKS'. Delete /tmp/turn30 after THE CHECKS.
B6. src/i18n/locales/en.ts, replaced whole by this text (sha256 80490f52d786fed78524722737fa736ae4e01745588b6234b1a88ba1ecdbfd88):
FILE-BEGIN src/i18n/locales/en.ts
import { enAdmin } from "./en-admin";
import { enBase } from "./en-base";
import { enMember } from "./en-member";

// The whole English catalogue: the first-paint part and the strings layers (DEC-231, DEC-258); tests, scripts and the strings console read it, the first paint reads en-base.ts only.
export const en = { ...enBase, ...enAdmin, ...enMember } as const;

export default en;
FILE-END src/i18n/locales/en.ts
src/i18n/locales/am.ts, replaced whole by this text (sha256 f2eb7424b3040fbfa46ce02ee9c6cd997e689f79f92f410eb7ed5c41564e304e):
FILE-BEGIN src/i18n/locales/am.ts
import type { Messages } from "../types";
import { amAdmin } from "./am-admin";
import { amBase } from "./am-base";
import { amMember } from "./am-member";

export const am: Messages = { ...amBase, ...amAdmin, ...amMember };

export default am;
FILE-END src/i18n/locales/am.ts
B7. src/routes/__root.tsx, these edits (the gate around the Outlet; the root's beforeLoad starts a declared layer's download):
EDIT src/routes/__root.tsx #1
OLD-BEGIN
import { AppShell } from "../components/app-shell";
import { BASE_LANGUAGE, I18nProvider, useI18n, LANGUAGE_STAR_COOKIE } from "../i18n";
import { serverShellLanguage } from "../i18n/server-shell-language";
OLD-END
NEW-BEGIN
import { AppShell } from "../components/app-shell";
import { StringsLayerGate } from "../components/shell/strings-layer-gate";
import { declaredLayers } from "../components/shell/strings-layers";
import { BASE_LANGUAGE, I18nProvider, useI18n, LANGUAGE_STAR_COOKIE } from "../i18n";
import { warmStringsLayers } from "../i18n/compiled-catalog";
import { serverShellLanguage } from "../i18n/server-shell-language";
NEW-END
EDIT src/routes/__root.tsx #2
OLD-BEGIN
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // The origin/path are re-read on the client so a client-side navigation's
OLD-END
NEW-BEGIN
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // DEC-258 — a navigation (or a link's preload) to a route that declares
  // strings layers starts their download here, before the route's own code and
  // data arrive, so the shell's gate seldom waits.
  beforeLoad: ({ matches }) => {
    if (typeof window === "undefined") return;
    const layers = declaredLayers(matches.map((match) => match.staticData));
    if (layers.length > 0) {
      warmStringsLayers(layers, [BASE_LANGUAGE, document.documentElement.lang]);
    }
  },
  // The origin/path are re-read on the client so a client-side navigation's
NEW-END
EDIT src/routes/__root.tsx #3
OLD-BEGIN
          <AppShell>
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </AppShell>
OLD-END
NEW-BEGIN
          <AppShell>
            {/* DEC-258 — a route that declares strings layers draws once they are in. */}
            <StringsLayerGate>
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </StringsLayerGate>
          </AppShell>
NEW-END
B8. Delete src/i18n/locales/admin-layer.test.ts (its judge is the census, C1) and src/i18n/compiled-admin-loader.test.ts (its loader is compiledLayerLoader, C2). scripts/conformance/kit-adoption-allowlist.txt, this edit (the deleted judge's stale allowance):
EDIT scripts/conformance/kit-adoption-allowlist.txt #1
OLD-BEGIN
src/lib/refresh-after-write.test.ts | guard not yet moved (door turn) | INC-858
src/i18n/locales/admin-layer.test.ts | guard not yet moved (door turn) | INC-858
scripts/e2e-select.ts | not a guard: picks the specs a run executes | DEC-244
OLD-END
NEW-BEGIN
src/lib/refresh-after-write.test.ts | guard not yet moved (door turn) | INC-858
scripts/e2e-select.ts | not a guard: picks the specs a run executes | DEC-244
NEW-END
Now read /tmp/observability/build-errors.log (see HOW TO WORK).

PART C — THE TESTS.
C1. NEW scripts/conformance/strings-layers.test.ts (sha256 c7bcd214588203139238a72677367c7ccd92073dd6baf12e7fbd137118abc07c):
FILE-BEGIN scripts/conformance/strings-layers.test.ts
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { STRINGS_LAYERS } from "../../src/i18n/compiled-catalog";
import { en } from "../../src/i18n/locales/en";
import { LAYERS, catalogueFile, catalogueKeys, misplaced, stringsCensus } from "./strings-layers";

/**
 * DEC-258 (Foundations turn 30; DEC-231's admin-layer judge, generalised) —
 * every catalogue key sits where the strings-layers census puts it: a key only
 * pages that load a layer can show lives in that layer, never in every page's
 * first download; a key any other page shows stays in the base part.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of files under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "strings-layers-"));
  temps.push(root);
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

const PLANTED = {
  "src/routes/__root.tsx": 'import "../features/shell";\nexport const Route = {};\n',
  "src/routes/index.tsx":
    'import { shared } from "../features/shared";\nimport type { Form } from "../features/form";\nexport const Route = { component: shared };\nexport type F = Form;\n',
  "src/routes/post.tsx":
    'import { form } from "../features/form";\nexport const Route = { staticData: { strings: ["member"] }, component: form };\n',
  "src/routes/admin.tsx":
    'export const Route = { staticData: { strings: ["admin", "member"] } };\nexport const t = "a.both";\n',
  "src/routes/admin.users.tsx": 'export const Route = {};\nexport const t = "a.admin";\n',
  "src/features/shell.tsx": 'export const shell = "a.shell";\n',
  "src/features/shared.tsx": 'export const shared = () => "a.shared";\n',
  "src/features/form.tsx":
    'export type Form = string;\nexport const form = (code: string) => ["a.form", `a.err.${code}`, "a.both"];\n',
  "src/i18n/locales/en-base.ts":
    'export const enBase = {\n  "a.shell": "x",\n  "a.shared": "x",\n  "a.form": "x",\n  "a.err.one": "x",\n  "a.both": "x",\n  "a.admin": "x",\n  "a.dead": "x",\n} as const;\n',
  "src/i18n/locales/en-admin.ts": "export const enAdmin = {} as const;\n",
  "src/i18n/locales/en-member.ts": "export const enMember = {} as const;\n",
};

describe("the strings layers (DEC-258)", () => {
  it("CF-SL-1 every catalogue key sits in the file the census names", () => {
    const census = stringsCensus(ROOT);
    console.log(
      `[strings-layers] scanned: ${census.scanned}, pages: ${census.pages.size}, keys: ${census.home.size}`,
    );
    expect(misplaced(census, ROOT)).toEqual([]);
  });

  it("CF-SL-2 Amharic mirrors English file by file, and the parts join to the whole catalogue", () => {
    const parts = (["base", ...LAYERS] as const).map((home) => ({
      en: catalogueKeys(ROOT, catalogueFile(home, "en")),
      am: catalogueKeys(ROOT, catalogueFile(home, "am")),
    }));
    for (const part of parts) expect(part.am.slice().sort()).toEqual(part.en.slice().sort());
    const all = parts.flatMap((part) => part.en);
    expect(new Set(all).size).toBe(all.length);
    expect(all.slice().sort()).toEqual(Object.keys(en).sort());
  });

  it("CF-SL-3 the routes' declarations: posting and my listings load member, admin screens both, the listings pages none", () => {
    const { pages } = stringsCensus(ROOT);
    expect(LAYERS).toEqual(STRINGS_LAYERS);
    expect([...(pages.get("post") ?? [])]).toEqual(["member"]);
    expect([...(pages.get("my-listings_.$listingId_.edit") ?? [])]).toEqual(["member"]);
    expect([...(pages.get("admin.users") ?? [])].sort()).toEqual(["admin", "member"]);
    expect([...(pages.get("admin.listings_.$listingId_.edit") ?? [])].sort()).toEqual([
      "admin",
      "member",
    ]);
    expect([...(pages.get("index") ?? [])]).toEqual([]);
    expect([...(pages.get("c.$slug") ?? [])]).toEqual([]);
    expect([...(pages.get("__root") ?? [])]).toEqual([]);
    for (const layers of pages.values()) {
      for (const layer of layers) expect(STRINGS_LAYERS as readonly string[]).toContain(layer);
    }
  });

  it("CF-SL-4 planted: a key only a member page shows belongs in the member part; a public page's, the root's and a type-only import's do not move it", () => {
    const root = tree(PLANTED);
    const census = stringsCensus(root);
    expect(Object.fromEntries(census.home)).toEqual({
      "a.shell": "base",
      "a.shared": "base",
      "a.form": "member",
      "a.err.one": "member",
      "a.both": "member",
      "a.admin": "admin",
      "a.dead": null,
    });
    expect(misplaced(census, root)).toEqual([
      "a.admin — in en-base.ts, belongs in en-admin.ts (shown on: admin.users)",
      "a.both — in en-base.ts, belongs in en-member.ts (shown on: admin, post)",
      "a.err.one — in en-base.ts, belongs in en-member.ts (shown on: post)",
      "a.form — in en-base.ts, belongs in en-member.ts (shown on: post)",
    ]);
  });

  it("CF-SL-5 planted: a public page that imports the member page's file keeps its keys in the base part", () => {
    const root = tree({
      ...PLANTED,
      "src/routes/index.tsx":
        'import { form } from "../features/form";\nexport const Route = { component: form };\n',
    });
    const census = stringsCensus(root);
    expect(census.home.get("a.form")).toBe("base");
    expect(census.home.get("a.err.one")).toBe("base");
    expect(census.shownOn.get("a.form")).toEqual(["index", "post"]);
  });

  it("CF-SL-6 the census reads the whole tree", () => {
    const census = stringsCensus(ROOT);
    expect(census.scanned).toBeGreaterThanOrEqual(500);
    expect(census.pages.size).toBeGreaterThanOrEqual(45);
    expect(census.home.size).toBe(Object.keys(en).length);
  });
});
FILE-END scripts/conformance/strings-layers.test.ts
C2. NEW src/i18n/compiled-layer-loader.test.ts (sha256 559ce6c172774f70ffc2ff2cba70958e93619c1573c1ca27ba5d5cbf9f265f08):
FILE-BEGIN src/i18n/compiled-layer-loader.test.ts
import { describe, expect, it } from "vitest";

import { STRINGS_LAYERS, compiledLayerLoader, isStringsLayer } from "./compiled-catalog";

/**
 * DEC-258 (DEC-231's admin loader, generalised) — each strings layer's loader
 * answers under the same own-key law as compiledCatalogLoader (Part H1): a
 * listed code gives its loader; an unlisted code, and a code naming an
 * inherited member, give undefined.
 */
describe("compiledLayerLoader (DEC-258)", () => {
  it("CLL-1 every layer gives a loader for en and am, undefined for om and constructor", () => {
    for (const layer of STRINGS_LAYERS) {
      expect(typeof compiledLayerLoader(layer, "en")).toBe("function");
      expect(typeof compiledLayerLoader(layer, "am")).toBe("function");
      expect(compiledLayerLoader(layer, "om")).toBeUndefined();
      expect(compiledLayerLoader(layer, "constructor")).toBeUndefined();
    }
  });

  it("CLL-2 the layers are admin then member; only their names are layers", () => {
    expect(STRINGS_LAYERS).toEqual(["admin", "member"]);
    expect(isStringsLayer("member")).toBe(true);
    expect(isStringsLayer("admin")).toBe(true);
    expect(isStringsLayer("base")).toBe(false);
    expect(isStringsLayer("")).toBe(false);
  });

  it("CLL-3 each layer's English and Amharic parts load, with the same keys", async () => {
    for (const layer of STRINGS_LAYERS) {
      const en = await compiledLayerLoader(layer, "en")?.();
      const am = await compiledLayerLoader(layer, "am")?.();
      expect(Object.keys(en ?? {}).length).toBeGreaterThan(0);
      expect(Object.keys(am ?? {}).sort()).toEqual(Object.keys(en ?? {}).sort());
    }
  });
});
FILE-END src/i18n/compiled-layer-loader.test.ts
C3. src/i18n/compiled-catalog.test.ts, replaced whole by this text (sha256 b6a34cbe524840ccc42e6a5c623f426110075e4ae24fd706b95a08d49e82f7cf):
FILE-BEGIN src/i18n/compiled-catalog.test.ts
import { describe, expect, it } from "vitest";

import { layerOutcome } from "./compiled-catalog";

/** INC-816 (bundle 22 turn 24; every strings layer since DEC-258) — the English part stays under a failed language part. */
describe("layerOutcome (INC-816, DEC-258)", () => {
  const en = { "admin.title": "Admin" } as never;
  const am = { "admin.title": "አስተዳዳሪ" } as never;

  it("both parts loaded apply both and the layer is ready", () => {
    expect(layerOutcome({ en, lang: am, wasReady: false })).toEqual({
      en,
      lang: am,
      state: "ready",
    });
  });

  it("a failed language part applies the English part only and the layer is ready", () => {
    expect(layerOutcome({ en, lang: null, wasReady: true })).toEqual({
      en,
      lang: null,
      state: "ready",
    });
  });

  it("a failed English part with none ever loaded applies the base and the layer fails", () => {
    expect(layerOutcome({ en: null, lang: am, wasReady: false })).toEqual({
      en: null,
      lang: null,
      state: "failed",
    });
  });

  it("a failed English part after an earlier success uses the kept part", () => {
    const kept = en;
    expect(layerOutcome({ en: kept, lang: null, wasReady: true })).toEqual({
      en: kept,
      lang: null,
      state: "ready",
    });
  });
});
FILE-END src/i18n/compiled-catalog.test.ts
C4. NEW src/components/shell/strings-layers.test.ts (sha256 9f833109c1f3a68d3db66afeb19c26a78bc38c2ab656745af98e1246f8bb3b3f):
FILE-BEGIN src/components/shell/strings-layers.test.ts
import { describe, expect, it } from "vitest";

import { declaredLayers } from "./strings-layers";

/** DEC-258 — the layers matched routes declare, in STRINGS_LAYERS order, each once. */
describe("declaredLayers (DEC-258)", () => {
  it("SLD-1 no declaration declares nothing", () => {
    expect(declaredLayers([{}, {}])).toEqual([]);
    expect(declaredLayers([])).toEqual([]);
  });

  it("SLD-2 a layout's and a page's declarations join, in the layers' order, each once", () => {
    expect(declaredLayers([{}, { strings: ["member", "admin"] }, { strings: ["member"] }])).toEqual(
      ["admin", "member"],
    );
  });

  it("SLD-3 a page alone declares its own layer", () => {
    expect(declaredLayers([{}, { strings: ["member"] }])).toEqual(["member"]);
  });
});
FILE-END src/components/shell/strings-layers.test.ts
C5. NEW src/components/shell/strings-layer-gate.test.tsx (sha256 c8c8f9aef4c777ecbd421c461d6c8045df01fcaef4fd1c09877a610ff853d99b):
FILE-BEGIN src/components/shell/strings-layer-gate.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-258 — the shell's one gate for the strings layers: a page that declares
 * none draws at once; a page that declares one waits for it, says so when it
 * fails (with Try again), and draws once it is in.
 */

const state = vi.hoisted(() => ({
  matches: [] as { staticData: { strings?: string[] } }[],
  layers: "loading" as "loading" | "ready" | "failed",
  asked: [] as string[][],
  retry: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  useMatches: ({ select }: { select: (matches: unknown[]) => unknown }) => select(state.matches),
}));
vi.mock("@/i18n", () => ({
  STRINGS_LAYERS: ["admin", "member"],
  isStringsLayer: (value: string) => value === "admin" || value === "member",
  useI18n: () => ({ t: (key: string) => key }),
  useStringsLayers: (layers: string[]) => {
    state.asked.push(layers);
    return { state: layers.length === 0 ? "ready" : state.layers, retry: state.retry };
  },
}));

const { StringsLayerGate } = await import("./strings-layer-gate");

function draw() {
  render(
    <StringsLayerGate>
      <p data-testid="route">route</p>
    </StringsLayerGate>,
  );
}

beforeEach(() => {
  state.matches = [];
  state.layers = "loading";
  state.asked = [];
  state.retry.mockReset();
});

describe("StringsLayerGate (DEC-258)", () => {
  it("SLG-1 a page that declares no layer draws at once and asks for none", () => {
    state.matches = [{ staticData: {} }, { staticData: {} }];
    draw();
    expect(screen.getByTestId("route")).toBeTruthy();
    expect(state.asked.every((layers) => layers.length === 0)).toBe(true);
  });

  it("SLG-2 a page that declares a layer waits for it: the waiting line, not the route", () => {
    state.matches = [{ staticData: {} }, { staticData: { strings: ["member"] } }];
    draw();
    expect(screen.getByTestId("strings-layer-waiting")).toBeTruthy();
    expect(screen.queryByTestId("route")).toBeNull();
    expect(state.asked.at(-1)).toEqual(["member"]);
  });

  it("SLG-3 a failed layer says so, with Try again that asks again", () => {
    state.matches = [{ staticData: { strings: ["admin", "member"] } }];
    state.layers = "failed";
    draw();
    expect(screen.getByTestId("strings-layer-failed").textContent).toContain("auth.errorGeneric");
    expect(screen.queryByTestId("route")).toBeNull();
    fireEvent.click(screen.getByTestId("strings-layer-retry"));
    expect(state.retry).toHaveBeenCalledTimes(1);
    expect(state.asked.at(-1)).toEqual(["admin", "member"]);
  });

  it("SLG-4 once the declared layers are in, the route draws", () => {
    state.matches = [{ staticData: {} }, { staticData: { strings: ["member"] } }];
    state.layers = "ready";
    draw();
    expect(screen.getByTestId("route")).toBeTruthy();
    expect(screen.queryByTestId("strings-layer-waiting")).toBeNull();
  });
});
FILE-END src/components/shell/strings-layer-gate.test.tsx
C6. NEW src/i18n/provider-layers.test.tsx (sha256 5d5dba648d4b6e9a1a0ee9063d3f9536a32b134dd5e5f608f070ca47ff4666fb):
FILE-BEGIN src/i18n/provider-layers.test.tsx
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import { enMember } from "./locales/en-member";
import type { MessageKey } from "./types";

/**
 * DEC-258 — a strings layer loads only when a screen asks for it, joins the
 * chain once its English part is in, and says "failed" (with a retry that asks
 * again) when that part does not arrive. The layer loaders are mocked with
 * promises settled by hand.
 */

const KEY = Object.keys(enMember)[0] as MessageKey;
const TEXT = (enMember as Record<string, string>)[KEY];

const loaders = vi.hoisted(() => ({
  calls: [] as string[],
  pending: new Map<
    string,
    { resolve: (value: Record<string, string>) => void; reject: (reason: unknown) => void }
  >(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    },
  },
}));
vi.mock("@/features/auth/auth-service", () => ({
  fetchPreferredLanguage: () => new Promise(() => undefined),
  savePreferredLanguage: () => Promise.resolve({ ok: true }),
}));
vi.mock("./bundle", () => ({
  fetchUiBundle: () => Promise.resolve({ bundle: null, reason: "test" }),
  fetchEntityBundle: () => Promise.resolve({ bundle: null, reason: "test" }),
}));
vi.mock("./compiled-catalog", async (importOriginal) => {
  const real = await importOriginal<typeof import("./compiled-catalog")>();
  return {
    ...real,
    compiledCatalogLoader: () => undefined,
    compiledLayerLoader: (layer: string, code: string) =>
      code === "en"
        ? () => {
            loaders.calls.push(layer);
            return new Promise<Record<string, string>>((resolve, reject) => {
              loaders.pending.set(layer, { resolve, reject });
            });
          }
        : undefined,
  };
});

const { I18nProvider, useI18n, useStringsLayers } = await import("./provider");

function Probe({ ask }: { ask: boolean }) {
  const { t } = useI18n();
  return (
    <div>
      <p data-testid="text">{t(KEY) ?? ""}</p>
      {ask ? <Asker /> : null}
    </div>
  );
}

function Asker() {
  const member = useStringsLayers(["member"]);
  return (
    <>
      <p data-testid="state">{member.state}</p>
      <Button type="button" onClick={member.retry}>
        retry
      </Button>
    </>
  );
}

function mount(ask: boolean) {
  const tree = (asking: boolean) => (
    <I18nProvider>
      <Probe ask={asking} />
    </I18nProvider>
  );
  const view = render(tree(ask));
  return { again: (asking: boolean) => view.rerender(tree(asking)) };
}

beforeEach(() => {
  loaders.calls = [];
  loaders.pending.clear();
  window.localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(() => new Promise(() => undefined)),
  );
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("strings layers in the provider (DEC-258)", () => {
  it("PSL-1 a layer no screen asks for is never loaded, and its keys are absent", async () => {
    mount(false);
    await act(async () => undefined);
    expect(loaders.calls).toEqual([]);
    expect(screen.getByTestId("text").textContent).toBe("");
  });

  it("PSL-2 asked, the layer loads once: loading, then ready with its text applied", async () => {
    mount(true);
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    expect(screen.getByTestId("state").textContent).toBe("loading");
    expect(loaders.calls).toEqual(["member"]);
    await act(async () => {
      loaders.pending.get("member")?.resolve({ [KEY]: TEXT });
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("ready"));
    expect(screen.getByTestId("text").textContent).toBe(TEXT);
  });

  it("PSL-3 a failed English part fails the layer; Try again asks again and a later load is ready", async () => {
    mount(true);
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    await act(async () => {
      loaders.pending.get("member")?.reject(new Error("offline"));
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("failed"));
    expect(screen.getByTestId("text").textContent).toBe("");
    loaders.pending.clear();
    fireEvent.click(screen.getByRole("button", { name: "retry" }));
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    await act(async () => {
      loaders.pending.get("member")?.resolve({ [KEY]: TEXT });
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("ready"));
    expect(screen.getByTestId("text").textContent).toBe(TEXT);
  });

  it("PSL-4 a layer already in is not loaded again when a later screen asks for it", async () => {
    const view = mount(true);
    await waitFor(() => expect(loaders.pending.has("member")).toBe(true));
    await act(async () => {
      loaders.pending.get("member")?.resolve({ [KEY]: TEXT });
    });
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("ready"));
    view.again(false);
    view.again(true);
    await act(async () => undefined);
    expect(screen.getByTestId("state").textContent).toBe("ready");
    expect(loaders.calls).toEqual(["member"]);
  });
});
FILE-END src/i18n/provider-layers.test.tsx
C7. The planted proof (never saved): in src/i18n/locales/en-member.ts delete the line `  "settings.title": "Settings",` and add it to src/i18n/locales/en-base.ts directly after the line `  "app.name": "ethio.com",`; run `bunx vitest run scripts/conformance/strings-layers.test.ts -t "CF-SL-1"` — it must fail naming exactly `settings.title — in en-base.ts, belongs in en-member.ts (shown on: settings)`; paste that line; put both files back and check their sha256 against THE CHECKS'.

PART D — THE FIRST-PAINT GUARDS.
D1. scripts/check-marketplace-imports.mjs, this edit (the member parts never reach the first paint):
EDIT scripts/check-marketplace-imports.mjs #1
OLD-BEGIN
  "src/i18n/locales/am-base.ts",
];
OLD-END
NEW-BEGIN
  "src/i18n/locales/am-base.ts",
  "src/i18n/locales/en-member.ts",
  "src/i18n/locales/am-member.ts",
];
NEW-END
D2. scripts/bundle-closure.mjs, this edit (no layer chunk on a public page's first download):
EDIT scripts/bundle-closure.mjs #1
OLD-BEGIN
 * posting doors, the schema library, the calendar, the category glyph map and the
 * map library load only where their feature is used.
 */
OLD-END
NEW-BEGIN
 * posting doors, the schema library, the calendar, the category glyph map and the
 * map library load only where their feature is used; the strings layers (DEC-258)
 * load only where a route declares them.
 */
NEW-END
EDIT scripts/bundle-closure.mjs #2
OLD-BEGIN
  "leaflet",
];
OLD-END
NEW-BEGIN
  "leaflet",
  "en-member",
  "am-member",
  "en-admin",
  "am-admin",
];
NEW-END
D3. scripts/check-bundle-size.mjs, this edit (the entry's ceiling 291 → 284):
EDIT scripts/check-bundle-size.mjs #1
OLD-BEGIN
  js: 291,
OLD-END
NEW-BEGIN
  // DEC-258 (Foundations turn 30, 2026-10-25): the member strings left it (287.9 → 280.2 measured); the ceiling follows to 284.
  js: 284,
NEW-END
D4. scripts/route-budgets.mjs, replaced whole by this text (every page's line re-measured; three admin pages rise — INC-902) (sha256 dddfc4333beecdc95b763ce9d2c58c8504be476a56de4951d345551f5513d7e5):
FILE-BEGIN scripts/route-budgets.mjs
/**
 * D234 speed turn S1 — THE PER-PAGE FIRST-DOWNLOAD CEILINGS (KiB, gzip level 6),
 * read by scripts/check-bundle-size.mjs. Every page route the build's route
 * manifest names has one line here (server routes under /api/ have no page and
 * are left out by rule); a page with no line fails the guard, and so does a line
 * whose page is gone. `public` marks a page a visitor opens signed out: its
 * first download must also hold none of PUBLIC_MUST_STAY_LAZY
 * (scripts/bundle-closure.mjs).
 *
 * A RATCHET: each ceiling is the page's measured download plus 3 KiB of
 * build-to-build room, rounded up. A page that grows past its ceiling fails; a page that
 * shrinks 8 KiB or more below it fails too, until its ceiling is lowered in the
 * same commit — so every saving is kept. Raising a ceiling is a commit that says
 * why. Measured 2026-10-25 on the Foundations turn 30 build (DEC-258: the member strings
 * left every page's first download; the comment after each line). Three admin pages rose
 * (/admin/listings_/$listingId, /admin/roles_/$roleId, /admin/translations): each imports
 * the whole catalogue to test a key or to sync it, and its member part is now a chunk of
 * its own (INC-902).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 297, public: true }, // 293.7
  "/$name": { ceiling: 296, public: true }, // 292.4
  "/account": { ceiling: 289, public: false }, // 285.2
  "/account_/legal": { ceiling: 285, public: false }, // 282.0
  "/account_/legal_/$versionId": { ceiling: 287, public: false }, // 283.5
  "/account_/saved": { ceiling: 296, public: false }, // 292.4
  "/admin": { ceiling: 285, public: false }, // 281.2
  "/admin/": { ceiling: 285, public: false }, // 282.0
  "/admin/ai": { ceiling: 337, public: false }, // 333.4
  "/admin/attributes": { ceiling: 353, public: false }, // 349.7
  "/admin/audit": { ceiling: 313, public: false }, // 309.8
  "/admin/categories": { ceiling: 361, public: false }, // 357.9
  "/admin/countries": { ceiling: 343, public: false }, // 339.5
  "/admin/coverage": { ceiling: 335, public: false }, // 332.0
  "/admin/images": { ceiling: 285, public: false }, // 281.8
  "/admin/impersonation_/$sessionId": { ceiling: 314, public: false }, // 310.4
  "/admin/legal": { ceiling: 300, public: false }, // 296.2
  "/admin/legal_/$versionId": { ceiling: 299, public: false }, // 295.5
  "/admin/legal_/edit": { ceiling: 306, public: false }, // 302.5
  "/admin/listings": { ceiling: 359, public: false }, // 355.2
  "/admin/listings_/$listingId": { ceiling: 397, public: false }, // 393.5
  "/admin/listings_/$listingId_/edit": { ceiling: 421, public: false }, // 417.8
  "/admin/locations": { ceiling: 292, public: false }, // 288.4
  "/admin/places": { ceiling: 344, public: false }, // 340.7
  "/admin/roles": { ceiling: 311, public: false }, // 307.9
  "/admin/roles_/$roleId": { ceiling: 328, public: false }, // 324.9
  "/admin/screening": { ceiling: 380, public: false }, // 376.1
  "/admin/translations": { ceiling: 415, public: false }, // 411.1
  "/admin/translations_/$lang": { ceiling: 327, public: false }, // 323.3
  "/admin/users": { ceiling: 310, public: false }, // 306.4
  "/admin/users_/$userId": { ceiling: 306, public: false }, // 303.0
  "/auth": { ceiling: 296, public: true }, // 292.2
  "/auth_/callback": { ceiling: 285, public: true }, // 281.1
  "/auth_/reset": { ceiling: 287, public: true }, // 283.2
  "/c/$slug": { ceiling: 297, public: true }, // 293.7
  "/dev/primitives": { ceiling: 299, public: false }, // 295.6
  "/dev/style": { ceiling: 301, public: false }, // 297.7
  "/dev/tall": { ceiling: 284, public: false }, // 280.5
  "/l/$slug": { ceiling: 321, public: true }, // 317.2
  "/legal/$kind": { ceiling: 288, public: true }, // 284.1
  "/legal/accept": { ceiling: 295, public: false }, // 291.2
  "/legal/publishing": { ceiling: 288, public: true }, // 284.8
  "/my-listings": { ceiling: 334, public: false }, // 330.1
  "/my-listings_/$listingId": { ceiling: 337, public: false }, // 333.8
  "/my-listings_/$listingId_/edit": { ceiling: 416, public: false }, // 412.6
  "/post": { ceiling: 416, public: false }, // 412.6
  "/post_/$listingId": { ceiling: 416, public: false }, // 412.5
  "/privacy": { ceiling: 288, public: true }, // 284.1
  "/settings": { ceiling: 293, public: false }, // 289.6
  "/terms": { ceiling: 288, public: true }, // 284.1
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
FILE-END scripts/route-budgets.mjs

PART E — THE BROWSER.
E1. NEW e2e/i18n-layers.spec.ts (sha256 972e0d7ef5d57b66705d0830e396a347e27a124729994b6c0021fc62b9895131):
FILE-BEGIN e2e/i18n-layers.spec.ts
import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { gotoReady } from "./helpers/ui";

/**
 * DEC-258 (Foundations turn 30) — THE STRINGS LAYERS IN THE BROWSER. Every
 * page's first download carries only the base strings; a page whose route
 * declares a layer (staticData.strings) loads that layer's chunks and draws
 * its text once they are in. Read-only: no rows are written.
 */

/** The strings layers' chunks the page asks for, by name ("en-member", "am-admin", …). */
function layerChunks(page: Page): string[] {
  const asked: string[] = [];
  page.on("request", (request) => {
    const name = new URL(request.url()).pathname.split("/").pop() ?? "";
    const layer = /^((?:en|am)-(?:member|admin))-[^/]+\.js$/.exec(name);
    if (layer) asked.push(layer[1] as string);
  });
  return asked;
}

test.describe("STRINGS LAYERS — what a page's first download carries (DEC-258)", () => {
  test("SLE-1 the listings page asks for no strings layer", async ({ page }) => {
    const asked = layerChunks(page);
    await gotoReady(page, "/");
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
    expect(asked).toEqual([]);
  });

  test("SLE-2 a page that declares the member layer draws its strings once they are in", async ({
    page,
  }) => {
    const asked = layerChunks(page);
    await gotoReady(page, "/dev/primitives");
    await expect(page.getByTestId("prim-fixture")).toContainText(en["prim.table.actions"]);
    await expect(page.getByTestId("strings-layer-waiting")).toHaveCount(0);
    expect(asked).toContain("en-member");
    expect(asked).not.toContain("en-admin");
  });

  test("SLE-3 in Amharic the listings page asks for no layer, and a member page draws the Amharic text", async ({
    page,
  }) => {
    const asked = layerChunks(page);
    await gotoReady(page, "/?lang=am");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
    expect(asked).toEqual([]);
    await gotoReady(page, "/dev/primitives?lang=am");
    await expect(page.getByTestId("prim-fixture")).toContainText(am["prim.table.actions"]);
    expect(asked).toEqual(expect.arrayContaining(["en-member", "am-member"]));
  });
});
FILE-END e2e/i18n-layers.spec.ts
E2. e2e/ad-page.spec.ts, these edits (INC-904 — AP-54 judges the navigation's own server HTML; a separate request proved another render):
EDIT e2e/ad-page.spec.ts #1
OLD-BEGIN
    page,
    request,
  }) => {
OLD-END
NEW-BEGIN
    page,
  }) => {
NEW-END
EDIT e2e/ad-page.spec.ts #2
OLD-BEGIN
    for (const ad of ads) await seedPhotos(ad.id);
    // The page as the server sends it: the two cards are in its HTML.
    const html = await (await request.get(`/c/${seller.leafSlug}`)).text();
    expect(html.match(/data-testid="listing-card"/g) ?? []).toHaveLength(2);
    // A hydration failure is an uncaught error (React's #418-#425 in a production build).
OLD-END
NEW-BEGIN
    for (const ad of ads) await seedPhotos(ad.id);
    const path = `/c/${seller.leafSlug}`;
    // A hydration failure is an uncaught error (React's #418-#425 in a production build).
NEW-END
EDIT e2e/ad-page.spec.ts #3
OLD-BEGIN
    });
    await gotoReady(page, `/c/${seller.leafSlug}`);
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
OLD-END
NEW-BEGIN
    });
    // INC-904 — the page as the server sent it to this very navigation: the two cards are
    // in its HTML (a separate request proved another render, not the one judged below).
    const documentResponse = page.waitForResponse(
      (response) =>
        response.request().resourceType() === "document" &&
        new URL(response.url()).pathname === path,
    );
    await gotoReady(page, path);
    const html = await (await documentResponse).text();
    expect(html.match(/data-testid="listing-card"/g) ?? []).toHaveLength(2);
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
NEW-END

PART F — DOCS.
F1. docs/features/i18n-runtime.md: a new section at the end, "## The strings layers (DEC-258, Foundations turn 30)": the admin layer is now one of named layers (admin, member), each two files; a route declares the layers its screens show (`staticData: { strings: [...] }`, a layout's covering the routes under it); StringsLayerGate asks for them through useStringsLayers and draws the route once they are in (spinner; error line with Try again; the English part kept under a failed language part, INC-816); useAdminStrings retired; scripts/conformance/strings-layers.ts decides each key's file; en.ts / am.ts join every part.
F2. docs/governance/mechanisms.md: the line that begins "| 19 |" is replaced by this line:
| 19 | A string a person reads is a key, loaded in the layer its screens need (DEC-231, DEC-258) | the catalogues en/am: the base part on every page's first download, and the strings layers `STRINGS_LAYERS` (admin, member; `src/i18n/compiled-catalog.ts`); a route declares the layers its screens show (`staticData: { strings: [...] }`), the shell's `StringsLayerGate` (`src/components/shell/strings-layer-gate.tsx`) loads them before the route draws and the root's beforeLoad starts the download (`warmStringsLayers`) | `scripts/conformance/strings-layers.test.ts` (CF-SL-1…6: every key in the file the census names — a key every one of whose pages loads a layer lives in it); the weight guard and PUBLIC_MUST_STAY_LAZY (no layer on a public page's first download); `e2e/i18n-layers.spec.ts` (SLE-1…3); the hard-coded-strings scan; the usage-map guard; the am-script guard (G43) | keys no page shows stay where they are (INC-903); three admin screens import the whole catalogue (INC-902) | a new layer is one name in STRINGS_LAYERS, its two catalogue files and the routes' declarations; a fifth language is DB-only until it has a catalogue | `t(key, values)` with plurals (the Foundations bundle); Foundations turn 30 |
F3. docs/features/performance-strategy.md: a new section at the end, "## 13. Strings a page does not show stay off its first download (D234, Foundations turn 30)": the layers and who declares them; the gate and the root's beforeLoad warm-up; the census and CF-SL-1; the supervisor's measures (591 keys to member, 30 to admin; the entry 287.9 → 280.2 KiB; every page 7–11 KiB lighter; am-base about 11 KiB lighter); next: the database client off the first paint (a Tier A study for the operator's decision).
F4. docs/features/ci-guards.md: a new section at the end, "## DEC-258 — the strings-layers census; the first-paint ceiling at 284 KiB": the census replaces admin-layer.test.ts (CF-SL-1, proven on C7's planted key; CF-SL-4/5 planted trees; CF-SL-2 the mirror); FORBIDDEN_FILES and PUBLIC_MUST_STAY_LAZY gain the layer files; the entry's ceiling 291 → 284 (280.2 measured), every page's line re-measured, three admin pages raised (INC-902).
F5. docs/_changelog.md: one entry "Foundations turn 30 (2026-10-25) — speed S7 (D234), DEC-258: the strings layers …" in the shape of turn 29's; at the end, roadmap.md's turn-30 line `[x]` with the final HEAD and the unit totals appended.
F6. AGENTS.md: replace the line that begins "- Strings: keys only admin files use" with exactly this one line (AGENTS.md then counts 7075 bytes by `wc -c AGENTS.md`):
- Strings (DEC-258): a key only routes declaring a layer show (`staticData: { strings: ["member"] }`; admin.tsx declares admin and member) lives in that layer's files (en-admin/am-admin, en-member/am-member), others in en-base.ts/am-base.ts; StringsLayerGate (src/components/shell/strings-layer-gate.tsx; declaredLayers in strings-layers.ts) loads a route's layers before it draws; en.ts/am.ts join them; scripts/conformance/strings-layers.ts judges; `<html lang>` follows the applied catalog (`appliedLanguage`), never the selection.
F7. `bun run i18n:usage` (expected: 1736 keys across 577 files (395 dynamic call sites) — the four new src files raise the scanned count; the gate's three keys move to every page) and `bun run i18n:map-guard` ("usage maps match the tree").

THE CHECKS (in this order): paste the sha256sum of every file this brief gives a sha256 for, and of these files, which then print exactly:
6ede62e76a047ea69ae27450b3ac71d3e607681600bbd2af2b5fb75c786da9e5  src/routes/admin.tsx
277ba572192c8e1b0f869c1ddd11700164bb5300f36313e41941a361b52c3670  src/i18n/compiled-catalog.ts
0701a7ed0cbf3a309911ab5a6cc82bd16fc9978e13ed7d19d6535d659d0eec8d  src/i18n/provider.tsx
dfa02f56fad3a99e2af320061679fc470d634ca1ddabfc418933ee320aeef274  src/i18n/index.ts
aedf5b642fe00d2f3e6d5ee12188e33ee48b295e9db7acbeba55f203adafdf15  src/routes/__root.tsx
f4b8574d572406ab33656b2ad8fc3600430af9b1523fe5338e8b05253d95596b  scripts/conformance/kit-adoption-allowlist.txt
9bd8496f6796668ee60f1f9fee25131571e0a4a64f1d8bbf1bb3abca615e33df  scripts/check-marketplace-imports.mjs
199d4c88d77b0269fcd4052183f92fef3a0626192371093fee3395cf4474cfb5  scripts/bundle-closure.mjs
3662936777913783ac0bfc90ea37f65d4032ba8261bebca65b34fd0e42854e10  scripts/check-bundle-size.mjs
7fef5ca1d0c1fbcae1cd58ecd69dac7834d47fa8df6cc5479f0797d561731be9  e2e/ad-page.spec.ts
d57c2c677c25bdc5abb8972e3b979b0b3ebb379f0a18ac056d44400a7bbf635b  src/i18n/locales/en-base.ts
1d7d8f005a52ffeb74f6869ca5442fcba6c0a70fb155e3451bd2c799935db032  src/i18n/locales/en-admin.ts
dd075f801411150cc846a74e8177a7cd5ae77f6092ffce87754371b6e05662c5  src/i18n/locales/en-member.ts
7cf35e0c5b3948a1bf6de11d790d94475454cb25abf6c182e1a6881ac66065fd  src/i18n/locales/am-base.ts
82f9293b80adf107bc267c9a6261fa356480f61d006a0bcda1b56d4427b49556  src/i18n/locales/am-admin.ts
58a696841c9214e5e829b6ea73e089d08a15f587dbb01ae49bacf3905db3c249  src/i18n/locales/am-member.ts
e811e2760a6e33667dfc928527399af1301efdb87b7baddbd8c9338eb9633606  AGENTS.md
and, for each of B2's thirteen route files, `git diff <START> -- <file>` showing only B2's two added lines
(a difference is fixed by re-copying, or re-running the mover on BASE's catalogue files, never by editing the expectation); the two deleted files absent; `grep -rn "useAdminStrings\|compiledAdminLoader\|adminLayerOutcome" src scripts e2e` (no line); `bun run lint` (paste the error and warning counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 300 files, 1875 tests — and the CF-SL-, CLL-, SLD-, SLG- and PSL- lines); /tmp/observability/build-errors.log read; `node scripts/check-marketplace-imports.mjs` (findings: 0); `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run scripts/e2e-select.ts --self-test` (OK); `bun run format:check` last.

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/i18n-layers.spec.ts whole; e2e/house-style.spec.ts whole (/dev/style); e2e/admin-shell.spec.ts whole; e2e/settings.spec.ts whole; e2e/my-listings-page.spec.ts `--grep "MLP-2 |MLP-3 "`; e2e/post-wizard-category.spec.ts `--grep "PW-1 |PW-2 "`; e2e/i18n-coverage.spec.ts `--grep "renders no English fallback"`; e2e/ad-page.spec.ts `--grep "AP-53 |AP-54 "` (AP-54: the known limit); paste every count line.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-30.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; the mover's six lines; every sha256 line of THE CHECKS; C7's red line; the K2 lists (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```
