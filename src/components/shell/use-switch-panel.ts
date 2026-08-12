import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { useShell } from "@/components/app-shell";
import { PANELS } from "@/config/panels";
import type { PanelId } from "@/config/panels.types";

/**
 * THE ONE panel-activation seam (U0e, INC-071 — extends INC-058).
 *
 * CLASS RULE: panel activation IS navigation. The shell derives `activePanel`
 * from the route, so setting state alone could never change what the body
 * renders. Every activation flow — the top tabs and the rail/drawer panel
 * header switcher — calls this helper, so the two can never diverge.
 *
 * A panel with a `homePath` navigates there. A panel whose route does not
 * exist yet (`homePath: null`, currently My Listings) is GRANDFATHERED onto
 * the legacy state path until its build lands.
 *
 * The drawer is NOT closed here: switching panels inside the drawer must leave
 * it open on the new panel's items (Radix's Sheet only closes when `navOpen`
 * is set false, which navigation alone does not do).
 */
export function useSwitchPanel(): (panel: PanelId) => void {
  const navigate = useNavigate();
  const { setActivePanel } = useShell();

  return useCallback(
    (panel: PanelId) => {
      const home = PANELS[panel].homePath;
      // INC-071 grandfather: no route yet, so state is the only lever. Delete
      // this branch when every panel carries a homePath.
      if (home === null || panel === "marketplace") {
        setActivePanel(panel);
        return;
      }
      void navigate({ to: home });
    },
    [navigate, setActivePanel],
  );
}
