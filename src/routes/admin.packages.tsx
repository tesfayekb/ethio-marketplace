import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * P-1b — Admin › Packages folded into Admin › Monetisation (D290): the old
 * address sends its reader on, with nothing of its own to draw.
 */
export const Route = createFileRoute("/admin/packages")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/monetisation", replace: true });
  },
});
