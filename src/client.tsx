import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

import { PLACED_DEADLINE_MS, whenStreamPlaced } from "@/lib/hydrate-when-placed";

/**
 * DEC-266 — the browser's entry: TanStack Start's own client entry
 * (@tanstack/react-start/dist/plugin/default-entry/client.tsx), with one change — it hydrates
 * once the server's first screen is placed (src/lib/hydrate-when-placed.ts, INC-913).
 */
void whenStreamPlaced().then((outcome) => {
  if (outcome === "deadline")
    console.error(
      `[client-error] the first screen was not placed ${PLACED_DEADLINE_MS / 1000} s after the page was read; hydrating anyway`,
    );
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
});
