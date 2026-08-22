// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

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
  nitro: {
    preset: "cloudflare-module",
    output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
    cloudflare: { nodeCompat: true, deployConfig: true },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },

  vite: {
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
