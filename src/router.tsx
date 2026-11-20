import { createRouter } from "@tanstack/react-router";
import { sessionQueryClient } from "@/features/auth/session-end";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  // F1-7d (INC-1218) — an answer that ended the session is never retried, and reaches the shell.
  const queryClient = sessionQueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  // INC-085f + INC-1013 — the E2E hydration contract (data-app-ready) has one home: here.
  // onRendered fires from React's committed effects (so hydration has happened), and the
  // macrotask hop lets the router's own scroll restoration for that render finish first; a
  // scroll made after "ready" is never reset to the top. A crash before hydration leaves it unset.
  if (typeof window !== "undefined") {
    const off = router.subscribe("onRendered", () => {
      off();
      window.setTimeout(() => {
        document.documentElement.dataset["appReady"] = "1";
      }, 0);
    });
  }

  return router;
};
