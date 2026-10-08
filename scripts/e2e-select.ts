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

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, posix } from "node:path";

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
    name: "admin-coverage",
    src: ["src/features/admin-coverage/**", "src/routes/api/admin/coverage/**"],
    specs: ["e2e/admin-coverage.spec.ts"],
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
    name: "admin-imports",
    src: ["src/routes/api/admin/*/import*", "src/features/admin-*/**/*import*"],
    specs: ["e2e/import-security.spec.ts"],
  },
  {
    name: "admin-shell",
    src: ["src/features/admin/**", "src/routes/admin.tsx", "src/routes/api/admin/**"],
    specs: ["e2e/admin-shell.spec.ts"],
  },
  {
    name: "auth",
    src: ["src/features/auth/**", "src/routes/auth.tsx", "src/routes/api/auth/**"],
    specs: [
      "e2e/auth-*.spec.ts",
      "e2e/mfa-stepup.spec.ts",
      "e2e/smoke-auth-i18n.spec.ts",
      "e2e/nightly/*.spec.ts",
    ],
  },
  {
    name: "shell",
    src: ["src/components/shell/**", "src/routes/__root.tsx"],
    specs: [
      "e2e/shell.spec.ts",
      "e2e/shell-table-law.spec.ts",
      "e2e/layout.spec.ts",
      "e2e/category-nav.spec.ts",
      "e2e/locations-tree.spec.ts",
    ],
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
    src: ["src/routes/settings.tsx", "src/features/settings/**"],
    specs: ["e2e/settings.spec.ts"],
  },
  {
    name: "account",
    src: ["src/routes/account.tsx", "src/features/account/**"],
    specs: ["e2e/settings.spec.ts"],
  },
  {
    name: "feed",
    src: ["src/features/feed/**"],
    specs: ["e2e/category-nav.spec.ts"],
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
    specs: ["e2e/house-style.spec.ts"],
  },
  {
    name: "routes",
    src: ["src/routes/**"],
    specs: ["e2e/a11y.spec.ts"],
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
  let out = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        out += ".*";
        i++;
        if (glob[i + 1] === "/") i++; // "**/" also matches zero directories
      } else {
        out += "[^/]*";
      }
    } else if ("\\^$.|?+()[]{}".includes(c)) {
      out += "\\" + c;
    } else {
      out += c;
    }
  }
  // Reviewed (DEC-153): every metacharacter of the glob is escaped above.
  // nosemgrep: detect-non-literal-regexp
  return new RegExp(`^${out}$`);
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

/** Files changed against the base commit, including uncommitted work. */
export function changedFiles(base?: string): string[] {
  const ref = base ?? execSync("git merge-base HEAD origin/main", { encoding: "utf8" }).trim();
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
  return problems;
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
