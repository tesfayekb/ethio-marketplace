import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ROUTER_SETTLED_EVENT } from "./lib/router-settled";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  // INC-1013 — the router restores (or resets) the window's scroll when its first render settles,
  // which can land after React's hydration effects. The E2E hydration contract (data-app-ready,
  // __root.tsx) waits for this mark so a scroll made after "ready" is never reset to the top.
  if (typeof window !== "undefined") {
    const off = router.subscribe("onRendered", () => {
      off();
      window.setTimeout(() => {
        document.documentElement.dataset["routerSettled"] = "1";
        window.dispatchEvent(new Event(ROUTER_SETTLED_EVENT));
      }, 0);
    });
  }

  return router;
};
