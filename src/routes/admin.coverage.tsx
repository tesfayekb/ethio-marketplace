import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * P-1b — Admin › Plans folded into Admin › Monetisation (its Posting caps
 * block, ruling 1 §3 d): the old address sends its reader on, with nothing of
 * its own to draw.
 */
export const Route = createFileRoute("/admin/coverage")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/monetisation", replace: true });
  },
});
