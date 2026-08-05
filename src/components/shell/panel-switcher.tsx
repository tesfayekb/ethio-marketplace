import { useShell } from "@/components/app-shell";
import { panelsForUser } from "@/config/panels";
import { useI18n } from "@/i18n";

/**
 * Panel switching for the MOBILE DRAWER only.
 *
 * The desktop/bar dropdown variant is gone: panel switching in the chrome is
 * now the tab row (src/components/shell/panel-tabs.tsx). This list is what a
 * phone user sees inside the drawer, above the rail's items.
 */
export function PanelSwitcher({ variant = "list" }: { variant?: "list" }) {
  const { t } = useI18n();
  const { auth, activePanel, setActivePanel } = useShell();
  const panels = panelsForUser(auth);
  void variant;

  return (
    <ul className="flex flex-col gap-0.5" aria-label={t("shell.panelLabel")}>
      {panels.map((panel) => {
        const Icon = panel.icon;
        const active = panel.id === activePanel;
        return (
          <li key={panel.id}>
            <button
              type="button"
              aria-current={active ? "true" : undefined}
              onClick={() => setActivePanel(panel.id)}
              className={
                active
                  ? "flex min-h-11 w-full items-center gap-2 rounded-md bg-sidebar-accent px-3 text-sm font-medium text-sidebar-accent-foreground"
                  : "flex min-h-11 w-full items-center gap-2 rounded-md px-3 text-sm text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
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

export default PanelSwitcher;
