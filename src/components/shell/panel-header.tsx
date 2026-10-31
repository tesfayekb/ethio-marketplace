import { CutText } from "@/components/ui/cut-text";
import { BAND_LOOK, BAND_ROW, RAIL_HEADER } from "@/components/shell/band-row";
import { ChevronDown, Check } from "lucide-react";

import { useShell } from "@/components/shell-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSwitchPanel } from "@/components/shell/use-switch-panel";
import { panelsForUser } from "@/config/panels";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { OPEN_CONTROL } from "@/components/shell/menu-row";

/**
 * The PANEL IDENTITY BAND (U0d, INC-070 class rule 3).
 *
 * ONE component for every viewport: it names the ACTIVE panel and switches
 * panels through the same setActivePanel() the top tabs call, so the rail /
 * drawer stays open and the new panel's items appear in place. It supersedes
 * the drawer-only PanelSwitcher (deleted).
 *
 * D266: the rail surface and bottom groove; only height and heading match the bands.
 *
 * A user with a single visible panel (logged out) gets the heading with no
 * trigger — a one-option chooser is chrome with no choice in it.
 */
// D258 (R1d-c) — one band row tall (BAND_ROW), flush under the top bar, its label centred.
const BAND = `flex items-center px-2 ${BAND_ROW} ${RAIL_HEADER}`;

export function PanelHeader({ className }: { className?: string }) {
  const { t } = useI18n();
  const { auth, activePanel } = useShell();
  // U0e (INC-071): the same navigation helper the top tabs use. The drawer
  // stays OPEN through the navigation.
  const switchPanel = useSwitchPanel();
  const panels = panelsForUser(auth);
  const current = panels.find((p) => p.id === activePanel) ?? panels[0]!;
  const label = t(current.labelKey);

  if (panels.length < 2) {
    return (
      <div data-testid="panel-header" data-band-row="" className={cn(BAND, className)}>
        <h2 data-testid="panel-header-title" className={BAND_LOOK.heading}>
          <CutText text={label} />
        </h2>
      </div>
    );
  }

  return (
    <div data-testid="panel-header" data-band-row="" className={cn(BAND, className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            data-testid="panel-header-switcher"
            aria-label={t("shell.switchPanel")}
            className={`flex h-8 w-full items-center gap-2 rounded-md px-1 text-start text-base font-semibold text-foreground hover:bg-sidebar-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${OPEN_CONTROL}`}
          >
            <span data-testid="panel-header-title" className={BAND_LOOK.heading}>
              <CutText text={label} />
            </span>
            <ChevronDown className="ms-auto h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {/* INC-1027 — a radio group: the current panel is heard (aria-checked) and
              seen (LIST_ROW's checked state and the impl's tick). */}
          <DropdownMenuRadioGroup value={activePanel}>
            {panels.map((panel) => {
              const Icon = panel.icon;
              return (
                <DropdownMenuRadioItem
                  key={panel.id}
                  value={panel.id}
                  data-testid={`panel-header-option-${panel.id}`}
                  onSelect={() => switchPanel(panel.id)}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <CutText text={t(panel.labelKey)} />
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PanelHeader;
