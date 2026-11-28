#!/usr/bin/env bun
// DEC-115 — choose the e2e specs to run from the files a change touches.
//
// Input: files changed against a base commit (default: the merge-base with
// origin/main; --base <sha> for a whole bundle), plus uncommitted changes.
// Output: the e2e spec files to run, one per line, or ALL.
//
// Rules:
// - A changed spec selects itself.
// - A changed file under e2e/ that is not a spec selects every spec that
//   imports it, directly or through another helper.
// - A changed file under src/ that matches no area prints ALL, as does a
//   change to playwright.config.ts, e2e/global-setup.ts,
//   e2e/global-teardown.ts or scripts/serve-e2e-node.ts.
// - A migration selects the areas named on its header line
//   "-- e2e-areas: <area>[, <area>]"; a migration without that line
//   selects ALL.
//
// Modes:
//   (default)    print the spec list (or ALL)
//   --self-test  guard: every e2e/*.spec.ts is reachable from at least one
//                area, and an area whose spec glob matches nothing fails
//   --run        run e2e:local with the selector's list; when the selector
//                says ALL, print that and stop (CI carries the rest)
//   --repeat     DEC-283: print the specs the repeat lane repeats — every
//                changed spec still present and every spec importing a
//                changed e2e helper; never ALL (src/, migrations, the config
//                and the global setup are the other lanes' to judge);
//                changed specs first, then a changed helper's importers
//                (INC-967); `--repeat --ranks` prefixes each with its rank

import { execSync } from "node:child_process";
import { appendFileSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import {
  chooseWeights,
  costPerTest,
  listedTests,
  medianCost,
  type ListedTest,
} from "./ci/lane-plan";
import type { Weights } from "./ci/lane-weights";
import { literal, pattern, type PatternPart } from "./lib/pattern";
import { idsIn, idsOfTitle } from "./test-ids";

export interface Area {
  name: string;
  src: string[];
  specs: string[];
}

// One table maps source areas (globs) to spec globs. Every e2e/*.spec.ts
// must be reachable from at least one area (enforced by --self-test).
export const AREAS: Area[] = [
  {
    name: "posting",
    src: [
      "src/features/posting/**",
      "src/routes/post.tsx",
      "src/routes/post_.$listingId.tsx",
      "src/routes/api/listings/**",
      "src/routes/api/geo/**",
      "src/routes/api/upload/**",
    ],
    specs: [
      "e2e/post-wizard-*.spec.ts",
      "e2e/posting-routes.spec.ts",
      "e2e/posting-routes-identity.spec.ts",
      "e2e/posting-routes-dials.spec.ts",
      "e2e/posting-routes-catalog.spec.ts",
      "e2e/photo-pipeline.spec.ts",
      "e2e/geo.spec.ts",
    ],
  },
  {
    name: "admin-categories",
    src: ["src/features/admin-categories/**", "src/routes/api/admin/categories/**"],
    specs: ["e2e/admin-categories-*.spec.ts", "e2e/category-image-routes.spec.ts"],
  },
  {
    name: "admin-attributes",
    src: [
      "src/features/admin-attributes/**",
      "src/routes/api/admin/attributes/**",
      "src/routes/api/attributes*",
    ],
    specs: ["e2e/admin-attributes-*.spec.ts"],
  },
  {
    name: "admin-locations",
    src: ["src/features/admin-locations/**", "src/routes/api/admin/locations/**"],
    specs: ["e2e/admin-locations.spec.ts", "e2e/locations-tree.spec.ts"],
  },
  {
    name: "admin-countries",
    src: ["src/features/admin-countries/**", "src/routes/api/admin/countries/**"],
    specs: ["e2e/admin-countries.spec.ts"],
  },
  {
    name: "admin-users",
    src: ["src/features/admin/users/**", "src/routes/api/admin/users/**"],
    specs: ["e2e/admin-users.spec.ts"],
  },
  {
    name: "admin-roles",
    src: ["src/features/admin-roles/**", "src/routes/api/admin/roles/**"],
    specs: ["e2e/admin-roles.spec.ts", "e2e/rbac.spec.ts"],
  },
  {
    // Bundle 22 (Stage 1) — the legal documents' database and, from turn 2, its screens.
    name: "legal",
    src: [
      "src/features/legal/**",
      "src/features/admin/legal/**",
      "src/routes/admin.legal*",
      "src/routes/legal.*",
      "src/routes/terms.tsx",
      "src/routes/privacy.tsx",
      "src/routes/account_.legal*",
      "src/server/legal-page.ts",
    ],
    specs: ["e2e/legal-*.spec.ts"],
  },
  {
    name: "admin-translations",
    src: ["src/features/admin-translations/**", "src/routes/api/admin/translations/**"],
    specs: ["e2e/admin-translations-*.spec.ts"],
  },
  {
    name: "admin-audit",
    src: ["src/features/admin-audit/**", "src/routes/api/admin/audit/**"],
    specs: ["e2e/admin-audit.spec.ts"],
  },
  {
    name: "admin-screening",
    // N1b-3c (INC-977) — the held names' queue and the re-check's line live on this page.
    src: [
      "src/routes/admin.screening.tsx",
      "src/features/admin-screening/**",
      "src/server/jobs/**",
    ],
    specs: [
      "e2e/admin-screening.spec.ts",
      "e2e/admin-screening-reject.spec.ts",
      "e2e/name-check-queue.spec.ts",
    ],
  },
  {
    // P-1b — Admin › Monetisation: the products, their perks and prices and
    // the markets; the two old addresses redirect here.
    name: "admin-monetisation",
    src: [
      "src/routes/admin.monetisation.tsx",
      "src/routes/admin.packages.tsx",
      "src/routes/admin.coverage.tsx",
      "src/features/admin-monetisation/**",
    ],
    specs: ["e2e/admin-monetisation.spec.ts", "e2e/admin-roles.spec.ts"],
  },
  {
    name: "admin-listings",
    src: ["src/routes/admin.listings*.tsx", "src/features/admin-listings/**"],
    specs: ["e2e/admin-listings.spec.ts"],
  },
  {
    // Bundle 16 (D138, D172–D177) — the seller's My listings page and its state doors.
    name: "my-listings",
    src: ["src/features/my-listings/**", "src/routes/my-listings*.tsx"],
    // LF-E1 (L-1, INC-985) drives My listings; the shared formatters match no area, so a
    // change to them selects ALL (L-2 Part 0.1, DEC-119).
    specs: ["e2e/my-listings*.spec.ts", "e2e/locale-format.spec.ts"],
  },
  {
    // Bundle 13 (D158) — the AI switches and meter (turn 1) and their page, /admin/ai (turn 5).
    name: "admin-services",
    src: ["src/server/ai/**", "src/routes/admin.ai.tsx", "src/features/admin-ai/**"],
    specs: ["e2e/admin-services.spec.ts", "e2e/admin-ai-calls.spec.ts"],
  },
  {
    name: "admin-imports",
    src: ["src/routes/api/admin/*/import*", "src/features/admin-*/**/*import*"],
    specs: ["e2e/import-security.spec.ts"],
  },
  {
    name: "admin-shell",
    src: ["src/features/admin/**", "src/routes/admin.tsx", "src/routes/api/admin/**"],
    specs: ["e2e/admin-shell.spec.ts", "e2e/one-line-slots-admin.spec.ts"],
  },
  {
    // P-1c (D313, D315) — the Guide: the admin blocks' table form, the people's pages' page
    // form, the one sheet, their contract, the route next and the guide strings layer
    // (one area for the one concern; renamed from admin-guides by ruling 3 of turn (b)).
    name: "guides",
    src: [
      "src/components/shell/block-guide*.tsx",
      "src/components/shell/page-guide.tsx",
      "src/components/shell/guide-sheet.tsx",
      "src/components/shell/guide-spec.ts",
      "src/components/shell/order-strip.tsx",
      "src/features/admin/guide-next.ts",
      "src/features/posting/wizard-guide.ts",
      "src/i18n/locales/*-guide.ts",
    ],
    specs: ["e2e/admin-guides.spec.ts", "e2e/user-guides.spec.ts"],
  },
  {
    name: "auth",
    src: ["src/features/auth/**", "src/routes/auth.tsx", "src/routes/api/auth/**"],
    specs: [
      "e2e/auth-*.spec.ts",
      "e2e/door-refusals.spec.ts",
      "e2e/mfa-stepup.spec.ts",
      "e2e/smoke-auth-i18n.spec.ts",
      "e2e/staff-gate.spec.ts",
      "e2e/supabase-door.spec.ts",
      "e2e/nightly/*.spec.ts",
    ],
  },
  {
    name: "shell",
    src: ["src/components/shell/**", "src/routes/__root.tsx"],
    specs: [
      "e2e/shell.spec.ts",
      "e2e/offline.spec.ts",
      "e2e/sage-shell.spec.ts",
      "e2e/sage-bands.spec.ts",
      "e2e/choice-lists.spec.ts",
      "e2e/shell-bands.spec.ts",
      "e2e/breadcrumbs.spec.ts",
      "e2e/phone-frame.spec.ts",
      "e2e/shell-table-law.spec.ts",
      "e2e/layout.spec.ts",
      "e2e/category-nav.spec.ts",
      "e2e/locations-tree.spec.ts",
      "e2e/viewing-place.spec.ts",
      "e2e/rail-first-paint.spec.ts",
      "e2e/one-line-slots.spec.ts",
      "e2e/admin-guides.spec.ts",
    ],
  },
  {
    // INC-911 (Foundations turn 34b-2) — a piece fetched on demand that fails to download says so.
    name: "on-demand",
    src: ["src/components/shell/on-demand-notice.tsx", "src/components/ui/overlay-*.ts*"],
    specs: ["e2e/on-demand-failure.spec.ts"],
  },
  {
    // DEC-459 (c) (cursor bundle 8a) — every page meets each failure of its reads and says so.
    name: "failure-crawl",
    src: [
      "src/components/shell/failure-notice.tsx",
      "src/lib/reader-failure.ts",
      "src/lib/route-client.ts",
      "src/test/provider-errors.ts",
    ],
    specs: ["e2e/failure-crawl-*.spec.ts"],
  },
  {
    // DEC-474 Part F (cursor bundle 8b) — a server failure on a page is reported once; a refusal never.
    name: "error-reports",
    src: [
      "src/lib/error-report.ts",
      "src/lib/error-report-send.ts",
      "src/lib/error-clean.ts",
      "src/lib/schemas/error-report.ts",
      "src/components/shell/failure-reason.ts",
      "src/routes/api/error-reports.ts",
      "src/server/error-reports.ts",
      // INC-1331 (cursor bundle 8c-1) — the staff pages that read the reports.
      "src/features/admin-errors/**",
      "src/lib/errors-search.ts",
      "src/routes/admin.errors.tsx",
      "src/routes/admin.errors_.$group.tsx",
    ],
    specs: ["e2e/error-reports.spec.ts", "e2e/admin-errors.spec.ts"],
  },
  {
    name: "components",
    src: ["src/components/**"],
    specs: ["e2e/primitives-law.spec.ts"],
  },
  {
    name: "i18n",
    src: ["src/i18n/**"],
    specs: ["e2e/i18n-*.spec.ts", "e2e/smoke-auth-i18n.spec.ts"],
  },
  {
    name: "settings",
    // INC-925 (Foundations turn 34w) — S-1 proves every door-step page; the shell's guard reads the list.
    src: [
      "src/routes/settings.tsx",
      "src/features/settings/**",
      "src/lib/signed-in-pages.ts",
      "src/lib/signed-in-route.ts",
      "src/components/app-shell.tsx",
    ],
    specs: ["e2e/settings.spec.ts"],
  },
  {
    name: "account",
    src: ["src/routes/account.tsx", "src/routes/account_.saved.tsx", "src/features/account/**"],
    specs: ["e2e/settings.spec.ts", "e2e/account-saved.spec.ts"],
  },
  {
    name: "feed",
    src: [
      "src/features/feed/**",
      "src/routes/api/feed.ts",
      "src/components/marketplace/**",
      "src/components/app-shell.tsx",
      "src/components/shell/breadcrumbs.tsx",
    ],
    specs: [
      "e2e/category-nav.spec.ts",
      "e2e/feed-index.spec.ts",
      "e2e/feed-route.spec.ts",
      "e2e/feed-screens.spec.ts",
      "e2e/shell.spec.ts",
      "e2e/breadcrumbs.spec.ts",
      "e2e/post-wizard-pricing.spec.ts",
      "e2e/viewing-place.spec.ts",
      "e2e/one-line-slots.spec.ts",
    ],
  },
  {
    name: "house-style",
    src: [
      "src/styles.css",
      "src/routes/dev.style.tsx",
      "src/components/ui/**",
      "src/components/shell/row-actions.tsx",
      "src/components/shell/filter-chips.tsx",
      "src/components/shell/data-table.tsx",
    ],
    specs: [
      "e2e/house-style.spec.ts",
      "e2e/overlays.spec.ts",
      "e2e/fonts.spec.ts",
      "e2e/dark-cards.spec.ts",
      "e2e/sage-cards.spec.ts",
      "e2e/one-line-slots.spec.ts",
      "e2e/one-line-slots-admin.spec.ts",
      "e2e/dialogs.spec.ts",
    ],
  },
  {
    // Turn SAGE-S4: the tier look, the flag, the satin ribbon and the invite card.
    name: "sage-tiers",
    src: [
      "src/components/marketplace/card-tier.ts",
      "src/components/marketplace/tier-flag.tsx",
      "src/components/marketplace/listing-card.tsx",
      "src/components/marketplace/listing-picture.tsx",
      "src/components/marketplace/ribbon-geometry.ts",
      "src/components/marketplace/invite-card.tsx",
      "src/styles.css",
      "src/lib/themes.ts",
      "src/routes/dev.style.tsx",
    ],
    specs: ["e2e/sage-tiers.spec.ts"],
  },
  {
    // Turn SAGE-S5: the buyer's ad page in the Sage look by tier.
    name: "sage-ad-page",
    src: [
      "src/components/marketplace/card-tier.ts",
      "src/components/marketplace/tier-flag.tsx",
      "src/components/marketplace/listing-picture.tsx",
      "src/components/marketplace/negotiable-badge.tsx",
      "src/components/shell/band-row.ts",
      "src/features/posting/preview/listing-detail.tsx",
      "src/features/posting/preview/listing-section.ts",
      "src/features/posting/preview/photo-gallery.tsx",
      "src/features/posting/preview/safety-box.tsx",
      "src/features/ad-page/**",
      "src/lib/visible-area.ts",
      "src/routes/l.*",
      "src/styles.css",
      "src/lib/themes.ts",
    ],
    specs: ["e2e/sage-ad-page.spec.ts"],
  },
  {
    name: "press",
    src: [
      "src/lib/press.ts",
      "src/components/shell/menu-row.ts",
      "src/components/shell/band-row.ts",
      "src/components/ui/button.tsx",
      "src/components/ui/button-variants.ts",
      "src/components/ui/tabs.tsx",
    ],
    specs: ["e2e/press.spec.ts"],
  },
  {
    name: "ad-page",
    src: [
      "src/routes/l.*",
      "src/server/qr.ts",
      "src/server/ad-page.ts",
      "src/server/ad-view.ts",
      "src/server/ad-photo.ts",
      "src/routes/api/listings/view.ts",
      "src/features/ad-page/**",
    ],
    specs: ["e2e/ad-page-routes.spec.ts", "e2e/ad-page*.spec.ts"],
  },
  {
    // N1b-2c (INC-977) — the hidden seller name: the seller page, its head, the owner's notice.
    name: "seller-name",
    src: [
      "src/routes/$name.tsx",
      "src/features/seller/**",
      "src/features/posting/seller-line.tsx",
      "src/server/seller-page.ts",
    ],
    specs: ["e2e/seller-name-hidden.spec.ts"],
  },
  {
    name: "routes",
    src: ["src/routes/**"],
    specs: ["e2e/a11y.spec.ts", "e2e/page-head.spec.ts"],
  },
  {
    // INC-1005, INC-1007 — an overlay never moves the page: the lock's neutralised
    // compensation (src/styles.css, no gutter), and the overlay primitives.
    name: "overlay-shift",
    src: [
      "src/styles.css",
      "src/components/ui/overlay-*.ts*",
      "src/components/ui/overlays-impl.ts",
      "src/components/ui/*-impl.ts*",
      "src/components/language-switcher.tsx",
    ],
    specs: ["e2e/overlay-shift.spec.ts"],
  },
  {
    // DEC-288 — the sub-menu mechanism: the side panel beside the rail (turn R1b).
    name: "submenu",
    src: [
      "src/components/shell/submenu/**",
      "src/components/ui/submenu-*.ts*",
      "src/components/shell/app-rail.tsx",
      "src/components/shell/favourite-category.ts",
      "src/components/shell/rail-variant.ts",
      // D248 — the one menu row look, shared by the rail and the panel.
      "src/components/shell/menu-row.ts",
      // D247 — the menu rows' fit-before-scroll rule lives in the stylesheet.
      "src/styles.css",
    ],
    specs: [
      "e2e/submenu.spec.ts",
      "e2e/submenu-touch.spec.ts",
      "e2e/overlay-shift.spec.ts",
      "e2e/menu-rows.spec.ts",
      "e2e/submenu-look.spec.ts",
    ],
  },
];

// Files whose change always selects the whole suite.
const ALWAYS_ALL = new Set([
  "playwright.config.ts",
  "e2e/global-setup.ts",
  "e2e/global-teardown.ts",
  "scripts/serve-e2e-node.ts",
]);

/** Minimal glob matcher: `**` crosses directories, `*` stays within one. */
export function globToRegExp(glob: string): RegExp {
  // Literal runs enter as escaped string parts, the stars as source parts.
  const parts: PatternPart[] = [];
  let run = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c !== "*") {
      run += c;
      continue;
    }
    parts.push(run);
    run = "";
    if (glob[i + 1] === "*") {
      parts.push(/.*/);
      i++;
      if (glob[i + 1] === "/") i++; // "**/" also matches zero directories
    } else {
      parts.push(/[^/]*/);
    }
  }
  parts.push(run);
  return pattern(["^", ...parts.slice(1).map(() => ""), "$"], ...parts);
}

export function matches(glob: string, path: string): boolean {
  return globToRegExp(glob).test(path);
}

function walk(dir: string, base: string, out: string[]): void {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, posix.join(base, entry), out);
    else out.push(posix.join(base, entry));
  }
}

export function listSpecs(root = "."): string[] {
  const out: string[] = [];
  walk(join(root, "e2e"), "e2e", out);
  return out.filter((f) => f.endsWith(".spec.ts")).sort();
}

/** Map each e2e file to the e2e files it imports (relative imports only). */
export function e2eImportGraph(root = "."): Map<string, string[]> {
  const files: string[] = [];
  walk(join(root, "e2e"), "e2e", files);
  const graph = new Map<string, string[]>();
  for (const file of files) {
    const text = readFileSync(join(root, file), "utf8");
    const dir = posix.dirname(file);
    const deps: string[] = [];
    for (const m of text.matchAll(/from\s+["'](\.[^"']+)["']/g)) {
      let p = posix.normalize(posix.join(dir, m[1]));
      if (!p.endsWith(".ts") && !p.endsWith(".tsx")) p += ".ts";
      deps.push(p);
    }
    graph.set(file, deps);
  }
  return graph;
}

/** Every spec that imports `changed` directly or through another helper. */
export function specsImporting(
  changed: string,
  graph: Map<string, string[]>,
  specs: string[],
): string[] {
  const reverse = new Map<string, string[]>();
  for (const [file, deps] of graph) {
    for (const dep of deps) {
      if (!reverse.has(dep)) reverse.set(dep, []);
      reverse.get(dep)!.push(file);
    }
  }
  const seen = new Set<string>([changed]);
  const queue = [changed];
  const hit = new Set<string>();
  while (queue.length) {
    const cur = queue.pop()!;
    for (const importer of reverse.get(cur) ?? []) {
      if (seen.has(importer)) continue;
      seen.add(importer);
      queue.push(importer);
      if (importer.endsWith(".spec.ts")) hit.add(importer);
    }
  }
  return specs.filter((s) => hit.has(s));
}

const AREAS_HEADER = /^\s*--\s*e2e-areas:\s*(.+)$/m;

export interface SelectOptions {
  root?: string;
  readFile?: (path: string) => string;
}

/**
 * The selector itself. Returns "ALL" or a sorted list of spec paths.
 * Pure: the changed-file list is given, so unit tests need no git.
 */
export function selectSpecs(changed: string[], opts: SelectOptions = {}): string[] | "ALL" {
  const root = opts.root ?? ".";
  const readFile = opts.readFile ?? ((p: string) => readFileSync(join(root, p), "utf8"));
  const specs = listSpecs(root);
  const selected = new Set<string>();

  for (const raw of changed) {
    const file = raw.replace(/^\.\//, "");
    if (ALWAYS_ALL.has(file)) return "ALL";

    if (file.startsWith("e2e/")) {
      if (file.endsWith(".spec.ts")) {
        selected.add(file);
      } else {
        for (const s of specsImporting(file, e2eImportGraph(root), specs)) selected.add(s);
      }
      continue;
    }

    if (/^supabase\/migrations\/[^/]+\.sql$/.test(file)) {
      const header = readFile(file).match(AREAS_HEADER);
      if (!header) return "ALL";
      for (const name of header[1].split(",").map((s) => s.trim())) {
        const area = AREAS.find((a) => a.name === name);
        if (!area) return "ALL"; // an unknown area name must never under-select
        for (const glob of area.specs) for (const s of specs) if (matches(glob, s)) selected.add(s);
      }
      continue;
    }

    if (file.startsWith("src/")) {
      const hits = AREAS.filter((a) => a.src.some((g) => matches(g, file)));
      if (hits.length === 0) return "ALL";
      for (const area of hits)
        for (const glob of area.specs) for (const s of specs) if (matches(glob, s)) selected.add(s);
      continue;
    }
    // Anything else (docs, scripts, config) selects nothing.
  }

  return [...selected].sort();
}

/**
 * DEC-283 — the repeat lane's selection, in two ranks (INC-967). Pure like
 * selectSpecs. Rank 1: every spec file the push changed itself and still
 * present. Rank 2: every spec that imports a changed e2e file that is not a
 * spec (and not a whole-suite harness file), transitively, and was not
 * changed itself. Each rank sorted; no spec twice; never "ALL".
 */
export type RankedSpec = { spec: string; rank: 1 | 2 };
export function repeatRanks(changed: string[], opts: { root?: string } = {}): RankedSpec[] {
  const root = opts.root ?? ".";
  const specs = listSpecs(root);
  const present = new Set(specs);
  const direct = new Set<string>();
  const importers = new Set<string>();
  let graph: Map<string, string[]> | undefined;
  for (const raw of changed) {
    const file = raw.replace(/^\.\//, "");
    if (!file.startsWith("e2e/") || ALWAYS_ALL.has(file)) continue;
    if (file.endsWith(".spec.ts")) {
      if (present.has(file)) direct.add(file);
      continue;
    }
    graph = graph ?? e2eImportGraph(root);
    for (const s of specsImporting(file, graph, specs)) importers.add(s);
  }
  return [
    ...[...direct].sort().map((spec): RankedSpec => ({ spec, rank: 1 })),
    ...[...importers]
      .filter((s) => !direct.has(s))
      .sort()
      .map((spec): RankedSpec => ({ spec, rank: 2 })),
  ];
}

/** The repeat lane's selection in rank order (rank 1, then rank 2). */
export function repeatSpecs(changed: string[], opts: { root?: string } = {}): string[] {
  return repeatRanks(changed, opts).map((r) => r.spec);
}

/**
 * DEC-283 — the repeat count's bounds: at most six repetitions, never below two (below two the plan
 * leaves tests out instead). The lane's global time cap is the budget plus this grace.
 */
export const REPEAT_MAX_EACH = 6;
export const REPEAT_MIN_EACH = 2;
export const REPEAT_CAP_GRACE_SECONDS = 120;

/** The Chromium pair every repeat runs on, and the project that lists the `@webkit` tests (a pair). */
const CHROMIUM_PROJECTS = ["mobile-360", "desktop-1280"];
const WEBKIT_LISTED = "webkit-1280";
const WEBKIT_PAIR = 2;

/**
 * INC-1333, INC-1311 — ONE TEST OF A REPEAT, costed in measured seconds. A test is one title in one
 * spec file; its cost for one repetition is, for each project the list shows it in, that file's
 * measured seconds in the project over its tests there (`costPerTest`, scripts/ci/lane-plan.ts),
 * summed. A file or project the weights lack costs the weights' median (`medianCost`), counted in
 * `atMedian`. The WebKit pair (the `@webkit` tests, listed under webkit-1280) is costed by the
 * file's mobile-360 measure, twice: the weights hold the Chromium pair only.
 */
export type RepeatUnit = {
  spec: string;
  title: string;
  ids: string[];
  serial: boolean;
  webkit: boolean;
  seconds: number;
  atMedian: number;
};

/**
 * The units of the planner's two lists (`playwright test --list --reporter=json`, local-backend-
 * proof.yml's select step): the parallel pass's tests (Chromium pair and webkit-1280, every
 * `@global-state` and `@a11y` test kept out) and the serial pass's (`@global-state`, Chromium pair).
 */
export function repeatUnits(
  parallel: readonly ListedTest[],
  serial: readonly ListedTest[],
  weights: Weights,
): RepeatUnit[] {
  const median = medianCost(weights);
  const units = new Map<string, RepeatUnit>();
  const add = (test: ListedTest, isSerial: boolean) => {
    const webkit = test.project === WEBKIT_LISTED;
    if (!webkit && !CHROMIUM_PROJECTS.includes(test.project)) return;
    const key = `${test.file}\0${test.title}`;
    const unit = units.get(key) ?? {
      spec: `e2e/${test.file}`,
      title: test.title,
      ids: idsOfTitle(test.title),
      serial: isSerial,
      webkit: false,
      seconds: 0,
      atMedian: 0,
    };
    const measured = costPerTest(weights, test.file, webkit ? "mobile-360" : test.project);
    const copies = webkit ? WEBKIT_PAIR : 1;
    unit.seconds += (measured ?? median) * copies;
    if (measured === null) unit.atMedian += copies;
    if (webkit) unit.webkit = true;
    units.set(key, unit);
  };
  for (const test of parallel) add(test, false);
  for (const test of serial) add(test, true);
  return [...units.values()];
}

export type RepeatChoice = {
  each: number;
  /** Specs repeated whole, in the selector's order. */
  whole: string[];
  /** Specs repeated by the ids of the tests the push changed: the ids taken, of how many tests. */
  byId: Array<{ spec: string; ids: string[]; taken: number; of: number }>;
  /** Tests left out, by spec in the selector's order (a spec repeated by id lists its rest). */
  left: Array<{ spec: string; tests: number }>;
  /** Tests of the selected specs, and the tests the plan repeats. */
  selected: number;
  repeated: number;
  /** Seconds one repetition of the repeated tests costs, at one worker. */
  seconds: number;
  webkit: number;
  serial: number;
  atMedian: { tests: number; specs: string[] };
  direct: { taken: number; all: number };
  helper: { taken: number; all: number };
};

/**
 * INC-1333, INC-1311 — THE REPEAT PLAN, in measured seconds. Every selected test at `each`
 * repetitions costs `each` × its seconds; the plan fits the chosen tests within `budget`.
 *
 * - When every selected test fits at two repetitions, all are repeated, `each` the most the budget
 *   allows (at most six).
 * - Otherwise, in the selector's order (rank 1, then rank 2), a spec that fits whole in what is left of
 *   the budget at two repetitions is repeated whole. A spec that does not fit has its tests whose
 *   ids stand on lines the push changed (`changedIds`) taken first, one by one while they fit; the
 *   rest of the spec, and a spec with no such test, is left out and named. A `@global-state` test
 *   runs in the serial pass, by file, so it repeats only with its spec whole.
 * - `each` then rises to what the chosen tests' seconds allow within the budget.
 */
export function planRepeat(input: {
  ranked: readonly RankedSpec[];
  units: readonly RepeatUnit[];
  budget: number;
  changedIds: ReadonlySet<string>;
}): RepeatChoice {
  const { ranked, units, budget, changedIds } = input;
  const bySpec = new Map<string, RepeatUnit[]>();
  for (const unit of units) bySpec.set(unit.spec, [...(bySpec.get(unit.spec) ?? []), unit]);
  const specs = ranked.filter((item) => bySpec.has(item.spec));
  const sum = (list: readonly RepeatUnit[]) =>
    list.reduce((total, unit) => total + unit.seconds, 0);
  const all = specs.flatMap((item) => bySpec.get(item.spec) ?? []);
  const total = sum(all);
  const eachAll =
    total > 0 ? Math.min(REPEAT_MAX_EACH, Math.floor(budget / total)) : REPEAT_MAX_EACH;

  const chosen: RepeatUnit[] = [];
  const choice: RepeatChoice = {
    each: REPEAT_MIN_EACH,
    whole: [],
    byId: [],
    left: [],
    selected: all.length,
    repeated: 0,
    seconds: 0,
    webkit: 0,
    serial: 0,
    atMedian: { tests: 0, specs: [] },
    direct: { taken: 0, all: specs.filter((item) => item.rank === 1).length },
    helper: { taken: 0, all: specs.filter((item) => item.rank === 2).length },
  };
  const capacity = budget / REPEAT_MIN_EACH;
  let used = 0;
  for (const item of specs) {
    const list = bySpec.get(item.spec) ?? [];
    let taken: RepeatUnit[] = [];
    if (eachAll >= REPEAT_MIN_EACH || used + sum(list) <= capacity + 1e-9) {
      taken = [...list];
      used += sum(list);
      choice.whole.push(item.spec);
    } else {
      for (const unit of list) {
        if (unit.serial || !unit.ids.some((id) => changedIds.has(id))) continue;
        if (used + unit.seconds > capacity + 1e-9) continue;
        taken.push(unit);
        used += unit.seconds;
      }
      if (taken.length > 0)
        choice.byId.push({
          spec: item.spec,
          ids: taken.flatMap((unit) => unit.ids),
          taken: taken.length,
          of: list.length,
        });
    }
    if (taken.length < list.length)
      choice.left.push({ spec: item.spec, tests: list.length - taken.length });
    if (taken.length > 0) (item.rank === 1 ? choice.direct : choice.helper).taken += 1;
    chosen.push(...taken);
  }
  choice.repeated = chosen.length;
  choice.seconds = sum(chosen);
  choice.webkit = chosen.filter((unit) => unit.webkit).length;
  choice.serial = chosen.filter((unit) => unit.serial).length;
  choice.atMedian.tests = chosen.reduce((count, unit) => count + unit.atMedian, 0);
  choice.atMedian.specs = [
    ...new Set(chosen.filter((unit) => unit.atMedian > 0).map((unit) => unit.spec)),
  ];
  choice.each =
    all.length === 0
      ? 0
      : eachAll >= REPEAT_MIN_EACH
        ? eachAll
        : choice.seconds > 0
          ? Math.min(
              REPEAT_MAX_EACH,
              Math.max(REPEAT_MIN_EACH, Math.floor(budget / choice.seconds)),
            )
          : REPEAT_MIN_EACH;
  return choice;
}

/** The mean cost of a repeated test, one repetition, in the summary's own form. */
export function meanSeconds(choice: RepeatChoice): string {
  return (choice.repeated > 0 ? choice.seconds / choice.repeated : 0).toFixed(1);
}

/**
 * The `--grep` that makes Playwright's run the plan's: a whole spec by its file name, a spec chosen
 * by id by each id taken, none matching beside a word character, a dot or a hyphen. (Playwright
 * matches `--grep` against the project, the file and the titles of a test; the positional files
 * keep the run to the chosen files.) Empty when nothing is chosen.
 */
export function repeatGrep(choice: RepeatChoice): string {
  const files = choice.whole.map(
    (spec) => pattern`(?<![\\w.-])${posix.basename(spec)}(?![\\w.-])`.source,
  );
  const ids = choice.byId.flatMap((item) =>
    item.ids.map((id) => pattern`(?<![\\w-])${id}(?![\\w-])`.source),
  );
  return [...files, ...ids].join("|");
}

/**
 * The lines the select step writes to the lane's evidence file (`local-backend-repeat.txt`), before
 * the WebKit and serial lines the workflow echoes. The summary keeps its grammar
 * (scripts/e2e-failure-report.ts REPEAT_SUMMARY, "at <x> s a test" the plan's mean cost of a
 * repeated test); the by-id and cost lines are new kinds, with their own prefixes.
 */
export function repeatEvidence(
  choice: RepeatChoice,
  context: { budget: number; weights: Weights; source: string },
): string[] {
  const { budget, weights, source } = context;
  const lines = choice.left.map((item) => `- Not repeated: ${item.spec} (${item.tests} tests)`);
  for (const item of choice.byId)
    lines.push(
      `- Repeat by id: ${item.spec} — ${item.ids.join(", ")} (${item.taken} of ${item.of} tests, the ids on lines this push changed)`,
    );
  const median = medianCost(weights).toFixed(1);
  lines.push(
    `- Repeat cost: weights from run ${weights.source.run} (${weights.source.date}), ${source}; mean ${meanSeconds(choice)} s a repeated test, ${choice.seconds.toFixed(1)} s a repetition at one worker; WebKit tests costed by their file's mobile-360 measure; ${choice.atMedian.tests} test-project measures at the weights' median ${median} s${choice.atMedian.specs.length > 0 ? ` (${choice.atMedian.specs.join(", ")})` : ""}`,
    repeatSummaryLine(choice, budget),
  );
  return lines;
}

/**
 * The summary line of the lane's selection file. Its grammar is the one the evidence reader parses
 * (scripts/e2e-failure-report.ts REPEAT_SUMMARY); "at <x> s a test" is the plan's mean cost of a
 * repeated test (the figure the lane once assumed is gone, INC-1333).
 */
export function repeatSummaryLine(choice: RepeatChoice, budget: number): string {
  return `- Repeat: each ${choice.each} on both projects; ${choice.selected} tests selected, ${choice.repeated} repeated; budget ${Math.round(budget)} s at ${meanSeconds(choice)} s a test; directly changed: ${choice.direct.taken} of ${choice.direct.all} repeated; importers of a changed helper: ${choice.helper.taken} of ${choice.helper.all}`;
}

/**
 * The variables the later steps of the repeat lane read (GITHUB_ENV). With nothing repeated only
 * the empty selection and the count are written, as the step always did.
 */
export function repeatEnv(
  choice: RepeatChoice,
  budget: number,
  units: readonly RepeatUnit[],
): string[] {
  if (choice.repeated === 0) return ["REPEAT_SPECS=", `REPEAT_TESTS=${choice.selected}`];
  const specs = [...choice.whole, ...choice.byId.map((item) => item.spec)];
  const serialSpecs = choice.whole.filter((spec) =>
    units.some((unit) => unit.spec === spec && unit.serial),
  );
  return [
    `REPEAT_WEBKIT_PROJECTS=${choice.webkit > 0 ? "--project=webkit-1280 --project=webkit-390" : ""}`,
    `REPEAT_SPECS=${specs.join(" ")}`,
    `REPEAT_SERIAL_SPECS=${serialSpecs.join(" ")}`,
    `REPEAT_GREP=${repeatGrep(choice)}`,
    `REPEAT_PARALLEL_TESTS=${choice.repeated - choice.serial}`,
    `REPEAT_SERIAL_TESTS=${choice.serial}`,
    `REPEAT_TESTS=${choice.selected}`,
    `REPEAT_EACH=${choice.each}`,
    `REPEAT_BUDGET_SECONDS=${Math.round(budget)}`,
    `REPEAT_GLOBAL_TIMEOUT_MS=${(Math.round(budget) + REPEAT_CAP_GRACE_SECONDS) * 1000}`,
  ];
}

/**
 * INC-1311 — the ids a push's changed lines carry: every id standing on a line a diff added, read
 * by the one id reader (`idsIn`, scripts/test-ids.ts) wherever it stands, so a changed row of a
 * table a spec builds its titles from (e2e/helpers/crawl-pages.ts) names its test as a changed
 * title does. `diff` is `git diff -U0` over e2e/; a file git does not track yet is passed whole as
 * `added`.
 */
export function changedIds(diff: string, added: readonly string[] = []): Set<string> {
  const ids = new Set<string>();
  const lines = [
    ...diff.split("\n").filter((line) => line.startsWith("+") && !line.startsWith("+++")),
    ...added.flatMap((text) => text.split("\n")),
  ];
  for (const line of lines)
    for (const use of idsIn("", line.replace(/^\+/, ""), { anywhere: true })) ids.add(use.id);
  return ids;
}

/** The commit changes are read against: `base`, else the merge-base with origin/main. */
function baseRef(base?: string): string {
  return base ?? execSync("git merge-base HEAD origin/main", { encoding: "utf8" }).trim();
}

/** Files changed against the base commit, including uncommitted work. */
export function changedFiles(base?: string): string[] {
  const ref = baseRef(base);
  const tracked = execSync(`git diff --name-only ${ref}`, { encoding: "utf8" });
  const untracked = execSync("git ls-files --others --exclude-standard", {
    encoding: "utf8",
  });
  return [
    ...new Set(
      [...tracked.split("\n"), ...untracked.split("\n")].map((s) => s.trim()).filter(Boolean),
    ),
  ].sort();
}

/** The ids on the lines changed under e2e/ against the base commit, uncommitted and untracked work included. */
function changedIdsAgainst(base?: string): Set<string> {
  const ref = baseRef(base);
  const diff = execSync(`git diff -U0 --no-color ${ref} -- e2e`, {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  const untracked = execSync("git ls-files --others --exclude-standard -- e2e", {
    encoding: "utf8",
  })
    .split("\n")
    .filter((file) => file.trim() !== "");
  return changedIds(
    diff,
    untracked.map((file) => readFileSync(file, "utf8")),
  );
}

/** Shared modules with many consumers: a change to one of them selects ALL. */
export const SHARED_SELECTS_ALL = [
  "src/lib/format.ts",
  "src/lib/locale.ts",
  "src/lib/format-locale.ts",
] as const;

/** Guard: every spec reachable from an area; every area glob matches. */
export function selfTest(root = "."): string[] {
  const specs = listSpecs(root);
  const problems: string[] = [];
  for (const spec of specs) {
    const reachable = AREAS.some((a) => a.specs.some((g) => matches(g, spec)));
    if (!reachable) problems.push(`spec not reachable from any area: ${spec}`);
  }
  for (const area of AREAS) {
    for (const glob of area.specs) {
      if (!specs.some((s) => matches(glob, s)))
        problems.push(`area "${area.name}" spec glob matches nothing: ${glob}`);
    }
  }
  // L-2 Part 0.1 — a shared formatter module is never narrowed to one spec.
  for (const shared of SHARED_SELECTS_ALL) {
    if (selectSpecs([shared], { root }) !== "ALL")
      problems.push(`shared module narrowed, must select ALL: ${shared}`);
  }
  return problems;
}

/**
 * `--repeat-plan` — the select step's plan (local-backend-proof.yml). Reads the ranks file
 * ("<spec> <rank>" lines), the two lists, the run's weights (`--weights`, `--weights-source`, as
 * scripts/ci/lane-plan.ts reads them) and the budget; appends the evidence lines to `--evidence` and
 * the lane's variables to `--env`; prints "<each> <webkit> <serial> <repeated>". A file that
 * cannot be read or a list of another shape is an error, never "nothing to repeat".
 */
function repeatPlanMain(args: string[], base?: string): void {
  const value = (name: string) => {
    const at = args.indexOf(name);
    return at >= 0 ? (args[at + 1] ?? "") : "";
  };
  const fail = (why: string): never => {
    console.error(`e2e-select: --repeat-plan ${why}`);
    process.exit(2);
  };
  const read = (name: string) => {
    const path = value(name);
    return path === "" ? fail(`needs ${name} <file>`) : readFileSync(path, "utf8");
  };
  const ranked = read("--ranks")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): RankedSpec => {
      const [spec = "", rank = ""] = line.trim().split(/\s+/);
      return { spec, rank: rank === "1" ? 1 : 2 };
    });
  const parallel = listedTests(read("--list")) ?? fail("--list is not a Playwright JSON list");
  const serial =
    listedTests(read("--serial-list")) ?? fail("--serial-list is not a Playwright JSON list");
  const budget = Number(value("--budget"));
  if (!Number.isFinite(budget) || budget <= 0) fail("needs --budget <seconds>");
  const evidence = value("--evidence") || fail("needs --evidence <file>");
  const env = value("--env") || fail("needs --env <file>");
  const weightsPath = value("--weights");
  let copy: string | null = null;
  let readLine = value("--weights-source");
  if (weightsPath !== "") {
    try {
      copy = readFileSync(weightsPath, "utf8");
    } catch {
      copy = "";
      readLine = `${weightsPath} could not be read`;
    }
  }
  const { weights, source } = chooseWeights(copy, readLine);
  const units = repeatUnits(parallel, serial, weights);
  const choice = planRepeat({ ranked, units, budget, changedIds: changedIdsAgainst(base) });
  appendFileSync(evidence, `${repeatEvidence(choice, { budget, weights, source }).join("\n")}\n`);
  appendFileSync(env, `${repeatEnv(choice, budget, units).join("\n")}\n`);
  console.log(`${choice.each} ${choice.webkit} ${choice.serial} ${choice.repeated}`);
}

function main(): void {
  const args = process.argv.slice(2);
  const baseIdx = args.indexOf("--base");
  const base = baseIdx >= 0 ? args[baseIdx + 1] : undefined;

  if (args.includes("--self-test")) {
    const problems = selfTest();
    if (problems.length) {
      console.error("e2e-select self-test FAILED:");
      for (const p of problems) console.error(`  - ${p}`);
      process.exit(1);
    }
    console.log("e2e-select self-test OK: every spec is reachable; every area glob matches.");
    return;
  }

  if (args.includes("--repeat-plan")) {
    repeatPlanMain(args, base);
    return;
  }

  if (args.includes("--repeat")) {
    // `--repeat --ranks` prints "<rank> <spec>" per line, in the same order.
    const ranked = repeatRanks(changedFiles(base));
    const withRanks = args.includes("--ranks");
    for (const r of ranked) console.log(withRanks ? `${r.rank} ${r.spec}` : r.spec);
    return;
  }

  const result = selectSpecs(changedFiles(base));

  if (args.includes("--run")) {
    if (result === "ALL") {
      console.log(
        "e2e-select: ALL — the change reaches the whole suite; run the bundle's own specs in parts. CI carries the rest.",
      );
      return;
    }
    if (result.length === 0) {
      console.log("e2e-select: no e2e specs selected by this change.");
      return;
    }
    console.log(`e2e-select: running ${result.length} spec(s):`);
    for (const s of result) console.log(`  ${s}`);
    execSync(`bun run e2e:local -- ${result.join(" ")}`, { stdio: "inherit" });
    return;
  }

  if (result === "ALL") console.log("ALL");
  else for (const s of result) console.log(s);
}

if (import.meta.main) main();
