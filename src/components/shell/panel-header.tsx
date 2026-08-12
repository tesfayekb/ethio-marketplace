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
import { cn } from "@/lib/utils";

/**
 * The PANEL IDENTITY BAND (U0d, INC-070 class rule 3).
 *
 * ONE component for every viewport: it names the ACTIVE panel and switches
 * panels through the same setActivePanel() the top tabs call, so the rail /
 * drawer stays open and the new panel's items appear in place. It supersedes
 * the drawer-only PanelSwitcher (deleted).
 *
 * Surface token: bg-sidebar-accent/40 — the SIDEBAR token family, never
 * bg-muted (a content-surface token that reads as foreign grey against
 * bg-sidebar, INC-042). Subtle enough to be a band, not a selection.
 *
 * A user with a single visible panel (logged out) gets the heading with no
 * trigger — a one-option chooser is chrome with no choice in it.
 */
const BAND = "rounded-md bg-sidebar-accent/40 px-2 py-1";

export function PanelHeader({ className }: { className?: string }) {
  const { t } = useI18n();
  const { auth, activePanel, setActivePanel } = useShell();
  const panels = panelsForUser(auth);
  const current = panels.find((p) => p.id === activePanel) ?? panels[0]!;
  const label = t(current.labelKey);

  if (panels.length < 2) {
    return (
      <div data-testid="panel-header" className={cn(BAND, className)}>
        <h2 data-testid="panel-header-title" className="truncate text-base font-semibold">
          {label}
        </h2>
      </div>
    );
  }

  return (
    <div data-testid="panel-header" className={cn(BAND, className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            data-testid="panel-header-switcher"
            aria-label={t("shell.switchPanel")}
            className="flex min-h-11 w-full items-center gap-2 rounded-md px-1 text-start text-base font-semibold text-foreground hover:bg-sidebar-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span data-testid="panel-header-title" className="min-w-0 truncate">
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
                data-testid={`panel-header-option-${panel.id}`}
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
    </div>
  );
}

export default PanelHeader;
