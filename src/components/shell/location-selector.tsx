import { ChevronDown, MapPin } from "lucide-react";

import { useShell, type LocationNode } from "@/components/app-shell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  asLocationNode,
  useCountryTree,
  useOpenMarkets,
  type TreeNode,
} from "@/components/shell/location-data";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import type { MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * LOCATION SELECTOR — band 3 of the shell's vertical stack.
 *
 * L4b: the cascade reads the CACHED public routes, never the table —
 * `/api/locations` for the open markets and `/api/locations/<code>` for the
 * chosen market's visible tree (anchor first, `name_en` only). Names still
 * resolve through the entity bundle; a failed read renders the translated
 * caption beside the controls and never a blank picker (C4/F4).
 *
 * The levels come from the DATA: country → region → city → sub-city, one more
 * step exactly when a sub-city exists under the chosen city.
 *
 * SEAM (U7): choosing an area writes the scope and the saved-area cookie; the
 * feed's location axis is still stubbed, so listings do not narrow yet.
 */

const LEVELS: { level: string; labelKey: MessageKey }[] = [
  { level: "country", labelKey: "location.country" },
  { level: "region", labelKey: "location.region" },
  { level: "city", labelKey: "location.city" },
  { level: "sub_city", labelKey: "location.subCity" },
];

interface Option {
  id: string;
  name: string;
  node: LocationNode | null;
}

function Picker({
  labelKey,
  options,
  selectedId,
  selectedName,
  onSelect,
}: {
  labelKey: MessageKey;
  options: Option[];
  selectedId: string | null;
  selectedName: string | null;
  onSelect: (option: Option | null) => void;
}) {
  const { t } = useI18n();

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
            selectedId !== null
              ? "font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {/* The picker shows its OWN selection — never a second copy of an
              area label rendered elsewhere (INC-041). */}
          <span className="max-w-[9rem] truncate">{selectedName ?? t(labelKey)}</span>
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
        <DropdownMenuItem onSelect={() => onSelect(null)}>{t("location.anyArea")}</DropdownMenuItem>
        {options.map((option) => (
          <DropdownMenuItem key={option.id} onSelect={() => onSelect(option)}>
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LocationSelector() {
  const { t, entities } = useI18n();
  const {
    locationPath,
    setLocationPath,
    locationCountry,
    selectLocationCountry,
    guessInUse,
    guessNode,
  } = useShell();
  const markets = useOpenMarkets();
  const tree = useCountryTree(locationCountry);

  // U4d — the shared resolver, never an inline language ternary (law B2).
  const treeName = (node: TreeNode) =>
    entityName(
      "location",
      { id: node.id, nameEn: node.nameEn ?? node.slug, nameAm: null },
      entities,
    );

  const marketOptions: Option[] = markets.markets.map((market) => ({
    id: market.code,
    name: market.nameEn,
    node: null,
  }));

  const selectedMarket = markets.markets.find((market) => market.code === locationCountry) ?? null;

  /**
   * THE CASCADE below the country: level N's options are the children of level
   * N-1's SELECTION, so a level renders only once its parent is chosen and a
   * level with no rows (no sub-city under this city) is omitted entirely.
   */
  const deeper: {
    labelKey: MessageKey;
    depth: number;
    options: Option[];
    selectedId: string | null;
    selectedName: string | null;
  }[] = [];

  if (locationCountry !== null) {
    for (let depth = 1; depth < LEVELS.length; depth += 1) {
      const definition = LEVELS[depth]!;
      const parent = locationPath[depth - 1] ?? null;
      if (parent === null) break;
      const rows = tree.nodes.filter(
        (node) => node.level === definition.level && node.parentId === parent.id,
      );
      if (rows.length === 0) break;
      const selected = locationPath[depth] ?? null;
      deeper.push({
        labelKey: definition.labelKey,
        depth,
        options: rows.map((node) => ({
          id: node.id,
          name: treeName(node),
          node: asLocationNode(node),
        })),
        selectedId: selected?.id ?? null,
        selectedName: selected
          ? entityName(
              "location",
              { id: selected.id, nameEn: selected.name_en, nameAm: selected.name_am },
              entities,
            )
          : null,
      });
    }
  }

  const failed = markets.failed || tree.failed;
  const isLoading = markets.isLoading;

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
      ) : failed ? (
        <span
          data-testid="location-error"
          className="min-h-11 content-center text-sm text-muted-foreground"
        >
          {t("location.readFailed")}
        </span>
      ) : marketOptions.length === 0 ? (
        <span className="min-h-11 content-center text-sm text-muted-foreground">
          {t("location.empty")}
        </span>
      ) : (
        <>
          <Picker
            labelKey="location.country"
            options={marketOptions}
            selectedId={selectedMarket?.code ?? null}
            selectedName={selectedMarket?.nameEn ?? null}
            onSelect={(option) => selectLocationCountry(option?.id ?? null)}
          />
          {deeper.map((level) => (
            <Picker
              key={level.labelKey}
              labelKey={level.labelKey}
              options={level.options}
              selectedId={level.selectedId}
              selectedName={level.selectedName}
              onSelect={(option) =>
                // Choosing at depth N replaces that level and drops everything
                // below it — the cascade can never hold an orphaned child.
                setLocationPath(
                  option?.node
                    ? [...locationPath.slice(0, level.depth), option.node]
                    : locationPath.slice(0, level.depth),
                )
              }
            />
          ))}
          {guessInUse && guessNode !== null ? (
            <span
              data-testid="location-guess-caption"
              className="min-h-11 content-center ps-1 text-xs text-muted-foreground"
            >
              {/* L4b-2 — the caption names the RESOLVED node (a metro, a region
                  or the market), so `{area}` is a NEW key: the old `{country}`
                  one could be shadowed by an approved DB row (law D3). */}
              {t("location.guessAreaCaption").replace(
                "{area}",
                entityName(
                  "location",
                  { id: guessNode.id, nameEn: guessNode.name_en, nameAm: guessNode.name_am },
                  entities,
                ),
              )}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}

export default LocationSelector;
