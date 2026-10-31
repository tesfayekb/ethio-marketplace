import { CutText } from "@/components/ui/cut-text";
import {
  BAND_LOOK,
  BAND_ROW,
  BAND_TRACK,
  BAND_SEGMENT,
  BAND_SEGMENT_CURRENT,
  BAND_SEGMENT_IDLE,
} from "@/components/shell/band-row";
import { useShell } from "@/components/shell-context";
import { useSwitchPanel } from "@/components/shell/use-switch-panel";
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
 * and the body. Emphasis is the locked green (pill + text); no new colour.
 */
export function PanelTabs() {
  const { t } = useI18n();
  const { auth, activePanel } = useShell();
  // U0e (INC-071): activation NAVIGATES, through the one shared helper the
  // rail/drawer switcher also calls — zero divergence between the two.
  const switchPanel = useSwitchPanel();
  const panels = panelsForUser(auth);

  if (!auth.isAuthenticated || panels.length < 2) return null;

  return (
    <div
      data-testid="panel-tabs"
      role="tablist"
      aria-label={t("shell.panelLabel")}
      // INC-056: the row used to scroll horizontally (`overflow-x-auto`), which
      // put a scrollbar under the tabs at phone widths. Tabs now SHARE the row:
      // each is `min-w-0 flex-none shrink` and its label truncates, so the set always fits
      // and no axis ever overflows.
      data-band-row=""
      className={cn(
        "hidden w-full min-w-0 items-center md:flex px-2 md:px-4",
        BAND_ROW,
        BAND_LOOK.row,
      )}
    >
      <div data-testid="panel-track" className={cn(BAND_TRACK, "min-w-0 shrink")}>
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
              onClick={() => switchPanel(panel.id)}
              className={cn(
                BAND_SEGMENT,
                "min-w-min flex-none justify-center gap-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? BAND_SEGMENT_CURRENT : cn(BAND_SEGMENT_IDLE, "hover:bg-muted"),
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <CutText text={t(panel.labelKey)} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PanelTabs;
