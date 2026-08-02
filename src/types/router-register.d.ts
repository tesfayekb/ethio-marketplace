// Hand-authored SSR type registration for TanStack Start (INC-014).
// This augmentation used to live in src/routeTree.gen.ts, which the TanStack
// Router plugin rewrites on every regeneration — dropping it each time.
// Class rule: hand-maintained content never lives in a generated file.

import type { getRouter } from "../router.tsx";
import type { startInstance } from "../start.ts";

declare module "@tanstack/react-start" {
  interface Register {
    ssr: true;
    router: Awaited<ReturnType<typeof getRouter>>;
    config: Awaited<ReturnType<typeof startInstance.getOptions>>;
  }
}
