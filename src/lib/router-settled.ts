/**
 * INC-1013 — the router's first render, and the scroll restoration it runs, has settled.
 * src/router.tsx marks it; the E2E hydration contract (data-app-ready, src/routes/__root.tsx)
 * waits for it, so a scroll made after "ready" is never reset to the top by a late restore.
 */
export const ROUTER_SETTLED_EVENT = "ethio:router-settled";
