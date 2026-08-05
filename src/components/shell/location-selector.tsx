import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { useShell } from "@/components/app-shell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * LOCATION SELECTOR — band 3 of the shell's vertical stack. BUILT-VISIBLE,
 * FILTERING STUBBED.
 *
 * What is real here: the cascade. The control reads the seeded
 * public.locations tree (country -> region -> city; `sub-city` is a FUTURE
 * level and simply does not render while no row carries it — graceful
 * degradation, not an error) and writes the chosen node into shell state, which
 * useFeed already accepts as `locationScope`.
 *
 * SEAM — the pre-launch location-scoping feature owns all of this (see
 * docs/features/location-scoping.md):
 *   - IP resolution of the visitor's starting area (today: a placeholder area),
 *   - the automatic city -> region -> country -> world WIDENING ladder,
 *   - actually narrowing the feed by the chosen scope.
 * The feed therefore does NOT yet change when you pick an area. Category
 * filtering (the other axis) IS live; the two combine structurally already,
 * because useFeed takes categoryId AND locationScope in the same query pass.
 */

type LocationRow = {
  id: string;
  name_en: string;
  name_am: string | null;
  level: string;
  parent_id: string | null;
};

const LEVELS: { level: string; labelKey: MessageKey }[] = [
  { level: "country", labelKey: "location.country" },
  { level: "region", labelKey: "location.region" },
  { level: "city", labelKey: "location.city" },
  { level: "sub_city", labelKey: "location.subCity" },
];

function useLocationTree() {
  const [rows, setRows] = useState<LocationRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    void Promise.resolve(
      supabase
        .from("locations")
        .select("id,name_en,name_am,level,parent_id")
        .eq("is_active", true)
        .order("name_en", { ascending: true }),
    )
      .then(({ data, error }) => {
        if (cancelled) return;
        // CONTAINMENT (INC-031 class): a geography read failure degrades this
        // band to its empty affordance; it never throws through the shell.
        setRows(error ? [] : ((data ?? []) as LocationRow[]));
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setRows([]);
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { rows, isLoading };
}

function LevelPicker({
  labelKey,
  options,
  selected,
  onSelect,
  language,
}: {
  labelKey: MessageKey;
  options: LocationRow[];
  selected: LocationRow | null;
  onSelect: (row: LocationRow | null) => void;
  language: string;
}) {
  const { t } = useI18n();
  const name = (row: LocationRow) =>
    language === "am" ? (row.name_am ?? row.name_en) : row.name_en;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-testid={`location-level-${labelKey.split(".")[1]}`}
          aria-label={t(labelKey)}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm",
            "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            selected
              ? "font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {/* The picker shows its OWN selection — never a second copy of an
              area label rendered elsewhere (INC-041). */}
          <span className="max-w-[9rem] truncate">{selected ? name(selected) : t(labelKey)}</span>
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
        <DropdownMenuItem onSelect={() => onSelect(null)}>{t("location.anyArea")}</DropdownMenuItem>
        {options.map((row) => (
          <DropdownMenuItem key={row.id} onSelect={() => onSelect(row)}>
            {name(row)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LocationSelector() {
  const { t, language } = useI18n();
  const { locationPath, setLocationPath } = useShell();
  const { rows, isLoading } = useLocationTree();

  /**
   * THE CASCADE — Country -> Region -> City -> Sub-city, nothing before it.
   *
   * Level N's options are the children of level N-1's SELECTION, so each level
   * renders only once its parent is chosen. A level with no rows (sub-city
   * today) is omitted entirely rather than rendered empty. The DEEPEST selected
   * level IS the chosen area — there is no separate area label to duplicate it.
   */
  const levels: {
    level: string;
    labelKey: MessageKey;
    depth: number;
    options: LocationRow[];
    selected: LocationRow | null;
  }[] = [];

  for (let depth = 0; depth < LEVELS.length; depth += 1) {
    const definition = LEVELS[depth]!;
    const parent = depth === 0 ? null : (locationPath[depth - 1] ?? null);
    // Beyond the first level, an unselected parent ends the cascade.
    if (depth > 0 && parent === null) break;
    const options = rows.filter(
      (row) => row.level === definition.level && (depth === 0 || row.parent_id === parent!.id),
    );
    if (options.length === 0) break;
    levels.push({
      level: definition.level,
      labelKey: definition.labelKey,
      depth,
      options,
      selected: locationPath[depth] ?? null,
    });
  }

  return (
    <div
      data-testid="location-row"
      className="flex w-full flex-wrap items-center gap-x-1 gap-y-0 border-b border-border bg-card px-3 py-1 md:px-4"
    >
      <span className="inline-flex min-h-11 shrink-0 items-center pe-1 text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="sr-only">{t("location.label")}</span>
      </span>

      {isLoading ? (
        <span className="min-h-11 content-center text-sm text-muted-foreground">
          {t("common.loading")}
        </span>
      ) : levels.length === 0 ? (
        <span className="min-h-11 content-center text-sm text-muted-foreground">
          {t("location.empty")}
        </span>
      ) : (
        levels.map((level) => (
          <LevelPicker
            key={level.level}
            labelKey={level.labelKey}
            options={level.options}
            selected={level.selected}
            language={language}
            onSelect={(row) =>
              // Choosing at depth N replaces that level and drops everything
              // below it — the cascade can never hold an orphaned child.
              // SEAM: this writes the scope only; feed-narrowing is the
              // pre-launch location-scoping feature.
              setLocationPath(
                row
                  ? [...locationPath.slice(0, level.depth), row]
                  : locationPath.slice(0, level.depth),
              )
            }
          />
        ))
      )}
    </div>
  );
}

export default LocationSelector;
