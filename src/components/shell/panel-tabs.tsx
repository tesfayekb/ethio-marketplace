import { useShell } from "@/components/app-shell";
import { panelsForUser } from "@/config/panels";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * The panel TABS row — band 2 of the shell's vertical stack.
 *
 * Replaces the old top-bar dropdown. Rendered ONLY when the user is signed in
 * AND has more than one panel; a logged-out visitor has Marketplace alone, so
 * a one-tab row would be chrome with no choice in it and the band is absent
 * entirely (the shell then closes the gap — see app-shell.tsx).
 *
 * Selecting a tab sets activePanel through useShell, which swaps BOTH the rail
 * and the body. Emphasis is the locked green (underline + text); no new colour.
 */
export function PanelTabs() {
  const { t } = useI18n();
  const { auth, activePanel, setActivePanel } = useShell();
  const panels = panelsForUser(auth);

  if (!auth.isAuthenticated || panels.length < 2) return null;

  return (
    <div
      data-testid="panel-tabs"
      role="tablist"
      aria-label={t("shell.panelLabel")}
      className="flex w-full items-stretch gap-1 overflow-x-auto border-b border-border bg-card px-3 lg:px-4"
    >
      {panels.map((panel) => {
        const Icon = panel.icon;
        const active = panel.id === activePanel;
        return (
          <button
            key={panel.id}
            type="button"
            role="tab"
            aria-selected={active}
            data-testid={`panel-tab-${panel.id}`}
            onClick={() => setActivePanel(panel.id)}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-3 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "border-primary font-medium text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">{t(panel.labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
}

export default PanelTabs;
