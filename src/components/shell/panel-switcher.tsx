import { ChevronDown, Check } from "lucide-react";

import { useShell } from "@/components/app-shell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { panelsForUser } from "@/config/panels";
import { useI18n } from "@/i18n";

/**
 * The MOBILE DRAWER's header (U0c).
 *
 * The drawer used to stack EVERY panel's name above the active panel's items,
 * which duplicated the top tab row and buried the items. It now names the
 * ACTIVE panel once, large, with a dropdown that switches panels through the
 * exact same setActivePanel() the top tabs call. The drawer stays open, so the
 * new panel's items appear in place.
 *
 * A user with a single visible panel (logged out) gets the heading with no
 * trigger — a one-option chooser is chrome with no choice in it.
 */
export function PanelSwitcher() {
  const { t } = useI18n();
  const { auth, activePanel, setActivePanel } = useShell();
  const panels = panelsForUser(auth);
  const current = panels.find((p) => p.id === activePanel) ?? panels[0]!;
  const label = t(current.labelKey);

  if (panels.length < 2) {
    return (
      <h2 data-testid="drawer-panel-title" className="px-1 text-lg font-semibold text-foreground">
        {label}
      </h2>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-testid="drawer-panel-switcher"
          aria-label={t("shell.switchPanel")}
          className="flex min-h-11 w-full items-center gap-2 rounded-md px-1 text-start text-lg font-semibold text-foreground hover:bg-sidebar-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span data-testid="drawer-panel-title" className="min-w-0 truncate">
            {label}
          </span>
          <ChevronDown className="ms-auto h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {panels.map((panel) => {
          const Icon = panel.icon;
          const active = panel.id === activePanel;
          return (
            <DropdownMenuItem
              key={panel.id}
              data-testid={`drawer-panel-option-${panel.id}`}
              onSelect={() => setActivePanel(panel.id)}
              className="min-h-11 gap-2"
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate">{t(panel.labelKey)}</span>
              {active ? <Check className="ms-auto h-4 w-4 shrink-0" aria-hidden="true" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PanelSwitcher;
