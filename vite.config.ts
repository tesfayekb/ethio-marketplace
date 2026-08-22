// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    define: {
      // DEC-018 — E2E MODE. The CI E2E jobs build with VITE_E2E=1 so the
      // production bundle carries the test instruments (src/lib/env-flags.ts).
      // A normal build leaves it "", so `isE2E` is false and every instrument
      // is dead code — the shipped bundle is unchanged.
      "import.meta.env.VITE_E2E": JSON.stringify(process.env["VITE_E2E"] ?? ""),
    },
  },
});
