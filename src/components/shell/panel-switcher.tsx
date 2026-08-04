import { ChevronDown } from "lucide-react";

import { useShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { panelsForUser } from "@/config/panels";
import { useI18n } from "@/i18n";

/**
 * Switches among the panels this user may see. Marketplace is always listed.
 * The active panel is CLIENT STATE (shell context) rather than a route segment —
 * simpler, and the non-Marketplace panels have no routes of their own yet.
 */
export function PanelSwitcher({ variant = "dropdown" }: { variant?: "dropdown" | "list" }) {
  const { t } = useI18n();
  const { auth, activePanel, setActivePanel } = useShell();
  const panels = panelsForUser(auth);
  const current = panels.find((p) => p.id === activePanel) ?? panels[0];

  if (variant === "list") {
    return (
      <ul className="flex flex-col gap-1" aria-label={t("shell.panelLabel")}>
        {panels.map((panel) => {
          const Icon = panel.icon;
          const active = panel.id === current.id;
          return (
            <li key={panel.id}>
              <button
                type="button"
                aria-current={active ? "true" : undefined}
                onClick={() => setActivePanel(panel.id)}
                className={
                  active
                    ? "flex min-h-11 w-full items-center gap-2 rounded-md bg-sidebar-accent px-3 text-sm font-medium text-sidebar-accent-foreground"
                    : "flex min-h-11 w-full items-center gap-2 rounded-md px-3 text-sm text-foreground hover:bg-muted"
                }
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{t(panel.labelKey)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" className="min-h-11 gap-2">
          <current.icon className="h-4 w-4" aria-hidden="true" />
          <span className="max-w-[10rem] truncate">{t(current.labelKey)}</span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {panels.map((panel) => {
          const Icon = panel.icon;
          return (
            <DropdownMenuItem key={panel.id} onSelect={() => setActivePanel(panel.id)}>
              <Icon className="me-2 h-4 w-4" aria-hidden="true" />
              {t(panel.labelKey)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PanelSwitcher;
