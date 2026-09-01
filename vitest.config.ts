import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * DEC-026 — COMPONENT TESTS.
 *
 * A deliberately SMALL runtime: React + jsdom + Testing Library, no TanStack
 * Start plugin, no nitro, no router codegen. Component tests exercise
 * PRESENTATION only; every data seam is mocked at its `*-service.ts` boundary,
 * so nothing here reaches Supabase, the network, or the build pipeline.
 *
 * The e2e suite keeps its own runner (Playwright): `include` therefore covers
 * `src/**` alone and `e2e/**` is excluded outright, so `bun run test:unit`
 * can never pick up a Playwright spec.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**", "dist/**", ".output/**"],
    restoreMocks: true,
  },
});
