// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { realpathSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { chunkModulesPlugin, moduleKey } from "./scripts/chunk-modules-plugin.mjs";
import { sharedShellOwns } from "./scripts/route-budgets.mjs";

/**
 * DEC-019 — THE E2E SERVE RUNTIME IS NODE, THE DEPLOY TARGET STAYS CLOUDFLARE.
 *
 * INC-088: nitro stamps `compatibility_date` with the BUILD DAY. `wrangler dev`
 * runs a pinned workerd binary whose newest supported date is, by construction,
 * never newer than its release day — so on any day after the pinned wrangler's
 * release the local serve dies before the first request with
 * "This Worker requires compatibility date <today>, but the newest date
 * supported by this server binary is <yesterday>". That is a runtime-class
 * failure in wrangler/workerd, not in our code, so DEC-019's first branch
 * fires: CI serves the SAME built app through nitro's node-server preset, and
 * one nightly job keeps a wrangler-served parity smoke.
 *
 * The preset is still explicitly pinned (INC-085e's Implicit Detection Law) —
 * it is only selectable through NITRO_PRESET, which nothing but the e2e build
 * sets. An unset variable resolves to the deploy target, byte-identically.
 */
const NITRO_PRESET = process.env["NITRO_PRESET"] ?? "cloudflare-module";

/**
 * DEC-362 (housekeeping turn 1b, INC-1097) — THE FIRST-PAINT CLOSURE IS CHUNKED BY A
 * RULE. Before this, the bundler put a module every page needs into the entry, into
 * another shared chunk, or into a chunk of its own by which modules happened to reference
 * it, so moving an export between modules moved a visitor's first download (INC-1097:
 * +1 KiB on every page from one module split; P-1c b: +0.9 KiB).
 *
 * One Rolldown `output.codeSplitting` group, `shared-shell`, gathers the repository's own
 * modules every page downloads and a lazy chunk also imports (SHARED_SHELL_MODULES in
 * scripts/route-budgets.mjs — the one list, whose census the budget step runs against this
 * build, scripts/check-bundle-size.mjs). A module of a lazy feature (the map, the admin
 * sections, the overlay primitives) is never in the list, so it never rides the first
 * paint.
 *
 * `includeDependenciesRecursively: false` — the list names every module; a dependency a
 * module imports is not swept in behind its back. Swept in (the default), the vendor code
 * joined the chunk and every vendor chunk's file name changed with each src-only deploy
 * (measured at ruling 1 of housekeeping 1b: a returning phone would fetch React again);
 * left alone, the vendor chunks keep their names across such a deploy. A second group
 * for the vendor modules was measured and refused by the frozen rule (up to 0.9 KiB a
 * page above the swept shape). `entriesAware: false` — the client has one entry.
 *
 * SCOPE: the client environment only. A top-level `build` option reaches the `ssr` and
 * `nitro` environments too and reshapes the server bundle (measured: SSR chunks 277 →
 * 246); under `environments.client` the server and nitro partitions are byte-identical to
 * the build without the group. `rolldownOptions` is the spelling vite 8 keeps
 * (`rollupOptions` is its deprecated alias).
 */
const PROJECT_ROOT = realpathSync(process.cwd());
const FIRST_PAINT_GROUPS = [
  {
    name: "shared-shell",
    test: (id: string) => sharedShellOwns(moduleKey(id, PROJECT_ROOT)),
    priority: 100,
    includeDependenciesRecursively: false,
    entriesAware: false,
  },
];

export default defineConfig({
  // INC-085e — NITRO TARGET IS PINNED, NEVER ENVIRONMENT-DETECTED.
  // The wrapper only forces `preset: "cloudflare-module"`, the dist/ output
  // layout and `cloudflare.deployConfig` INSIDE the Lovable sandbox
  // (LOVABLE_SANDBOX/SANDBOX env). Outside it — i.e. in GitHub Actions — it
  // passes nitro nothing but `defaultPreset`, so the build emitted the nitro
  // default layout with no dist/server/wrangler.json and all six E2E jobs died
  // at the serve step with ENOENT while the build step stayed green.
  // These values are verbatim the sandbox branch's, so both environments now
  // resolve identically; the sandbox branch still overrides them with the same
  // constants, so pinning here changes nothing for the deployed build.
  // The wrapper's published `nitro` type is a narrowed subset (preset/output/
  // cloudflare only), so the pin is asserted through the wrapper's own option
  // type; nitro receives it verbatim (the wrapper spreads user nitro options).
  nitro: {
    preset: NITRO_PRESET,
    output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
    // DEC-019-B — WORKER COMPATIBILITY DATE IS PINNED, NEVER THE BUILD DAY.
    // Censused on the installed nitro (3.0.260603-beta): the option is
    // `compatibilityDate` on NitroConfig (string | per-platform object), and
    // the cloudflare preset writes it verbatim into dist/server/wrangler.json
    // as `compatibility_date` (unset resolves to "latest" = the build day —
    // INC-088/INC-111). Pinning it to a date the pinned wrangler (4.125.0 in
    // `serve:e2e:built:cloudflare`) supports makes the nightly parity smoke
    // actually boot workerd instead of refusing on a calendar boundary.
    // BUMP RULE: raise this pin only together with a wrangler that supports
    // the newer date, in ONE landing.
    compatibilityDate: "2026-08-27",
    // Cloudflare-only options belong to the cloudflare preset alone; nitro's
    // node-server target has no worker to configure.
    ...(NITRO_PRESET === "cloudflare-module"
      ? { cloudflare: { nodeCompat: true, deployConfig: true } }
      : {}),
  } as NonNullable<Parameters<typeof defineConfig>[0]>["nitro"],

  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },

  vite: {
    // DEC-362 — the build writes which modules each client chunk holds, beside (never inside)
    // the served client output, for the budget step's module census.
    plugins: [
      chunkModulesPlugin({
        file: resolve(PROJECT_ROOT, "dist", ".chunk-modules.json"),
        root: PROJECT_ROOT,
      }),
    ],
    environments: {
      client: {
        build: { rolldownOptions: { output: { codeSplitting: { groups: FIRST_PAINT_GROUPS } } } },
      },
    },

    // INC-085g — the e2e build is a test artifact; readability outranks size;
    // prod build untouched. Minified React errors ("Minified React error #185
    // … at si") name nothing; unminified they carry the component.
    //
    // INC-085h — CSS MINIFICATION IS NEVER PART OF THAT RELAXATION. `minify:
    // false` also switches CSS minification off, and the client and SSR
    // environments then emit styles.css with DIFFERENT content hashes: the SSR
    // graph printed /assets/styles-DmnTMSCG.css while the client build wrote
    // /assets/styles-B6HzPvrJ.css, so every e2e page loaded with a 404
    // stylesheet and no styles at all. Pinning `cssMinify: true` keeps the CSS
    // pipeline byte-identical to the prod build in both environments, so the
    // hash the server prints is the hash the client build emitted.
    ...(process.env["VITE_E2E"] === "1"
      ? { build: { minify: false as const, sourcemap: true, cssMinify: true as const } }
      : {}),

    define: {
      // DEC-018 — E2E MODE. The CI E2E jobs build with VITE_E2E=1 so the
      // production bundle carries the test instruments (src/lib/env-flags.ts).
      // A normal build leaves it "", so `isE2E` is false and every instrument
      // is dead code — the shipped bundle is unchanged.
      "import.meta.env.VITE_E2E": JSON.stringify(process.env["VITE_E2E"] ?? ""),
    },
  },
});
