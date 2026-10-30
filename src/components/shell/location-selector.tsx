import { Button } from "@/components/ui/button";
import { BAND_LOOK, BAND_ROW } from "@/components/shell/band-row";
import { useRef } from "react";
import { useLabelRoom } from "@/components/ui/use-label-room";
import { CutText } from "@/components/ui/cut-text";
import { ChevronDown, MapPin } from "lucide-react";
import { sortPlacesByName } from "@/lib/place-order";

import { useShell, type LocationNode } from "@/components/shell-context";
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
  raised,
  onSelect,
}: {
  labelKey: MessageKey;
  options: Option[];
  selectedId: string | null;
  selectedName: string | null;
  raised: boolean;
  onSelect: (option: Option | null) => void;
}) {
  const { t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-testid={`location-level-${labelKey.split(".")[1]}`}
          aria-label={selectedName ? `${t(labelKey)}: ${selectedName}` : t(labelKey)}
          title={selectedName ?? undefined}
          data-location-raised={raised ? "true" : "false"}
          className={cn(
            "inline-flex h-7 min-w-min shrink items-center gap-0.5 md:gap-1 rounded-segment px-1.25 md:px-2.5 text-xs md:text-[13px] whitespace-nowrap",
            "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            raised
              ? "bg-card shadow-segment font-semibold text-nav-ink"
              : "bg-transparent font-medium text-foreground",
          )}
        >
          {/* The picker shows its OWN selection — never a second copy of an
              area label rendered elsewhere (INC-041). */}
          <CutText text={selectedName ?? t(labelKey)} />
          <ChevronDown
            data-row-arrow=""
            className="h-3.25 w-3.25 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
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
  const { t, entities, language } = useI18n();
  const {
    locationPath,
    setLocationPath,
    locationCountry,
    selectLocationCountry,
    guessInUse,
    accountPlace,
  } = useShell();
  const markets = useOpenMarkets();
  const tree = useCountryTree(locationCountry);
  // INC-211 — rows are used ONLY while they belong to the chosen market, so a
  // market switch never renders the previous market's levels.
  const treeNodes = tree.loadedCountry === locationCountry ? tree.nodes : [];

  // U4d — the shared resolver, never an inline language ternary (law B2).
  const treeName = (node: TreeNode) =>
    entityName(
      "location",
      { id: node.id, nameEn: node.nameEn ?? node.slug, nameAm: null },
      entities,
    );

  /**
   * INC-217 — A MARKET'S NAME IS ITS ANCHOR PLACE'S NAME, so it resolves through
   * the entity bundle exactly like every other place (law D3): the approved
   * Amharic row for the anchor names the market in Amharic, and `name_en` is the
   * fallback until one exists. A market with no anchor id keeps `name_en`.
   */
  const marketLabel = (market: { code: string; nameEn: string; anchorId: string | null }) =>
    market.anchorId === null
      ? market.nameEn
      : entityName(
          "location",
          { id: market.anchorId, nameEn: market.nameEn, nameAm: null },
          entities,
        );

  const marketOptions: Option[] = markets.markets.map((market) => ({
    id: market.code,
    name: marketLabel(market),
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
      const rows = treeNodes.filter(
        (node) => node.level === definition.level && node.parentId === parent.id,
      );
      if (rows.length === 0) break;
      const selected = locationPath[depth] ?? null;
      deeper.push({
        labelKey: definition.labelKey,
        depth,
        // Part D — A to Z by the shown name, in the reader's language.
        options: sortPlacesByName(
          rows.map((node) => ({
            id: node.id,
            name: treeName(node),
            node: asLocationNode(node),
          })),
          (option) => option.name,
          language,
        ),
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

  const rowRef = useRef<HTMLDivElement>(null);
  const longLabelRef = useRef<HTMLSpanElement>(null);
  const shortLabelRef = useRef<HTMLSpanElement>(null);
  useLabelRoom(
    rowRef,
    [longLabelRef, shortLabelRef],
    [
      selectedMarket === null ? null : marketLabel(selectedMarket),
      deeper.map((level) => level.selectedName ?? t(level.labelKey)).join("\u0000"),
      language,
      markets.isLoading,
      markets.failed,
      tree.failed,
    ],
    "[data-row-arrow]",
  );

  const failed = markets.failed || tree.failed;
  const isLoading = markets.isLoading;

  return (
    <div
      ref={rowRef}
      data-testid="location-row"
      data-area-source={guessInUse ? "guess" : "chosen"}
      data-account-place={accountPlace}
      role="group"
      aria-labelledby="location-row-label location-row-label-short"
      data-band-row=""
      className={cn(
        "flex w-full flex-nowrap items-center gap-x-0.5 md:gap-x-1 overflow-hidden px-2 md:px-4",
        BAND_ROW,
        BAND_LOOK.row,
      )}
    >
      <span
        ref={longLabelRef}
        id="location-row-label"
        className="hidden shrink-0 text-[13px] md:inline"
      >
        {t("location.rowLabel")}
      </span>
      <span
        ref={shortLabelRef}
        id="location-row-label-short"
        className="shrink-0 text-xs md:hidden"
      >
        {t("location.rowLabelShort")}
      </span>

      {isLoading ? (
        <span className="min-h-8 content-center text-sm text-muted-foreground">
          {t("common.loading")}
        </span>
      ) : failed ? (
        <span
          data-testid="location-error"
          className="min-h-8 content-center text-sm text-muted-foreground"
        >
          {t("location.readFailed")}
        </span>
      ) : marketOptions.length === 0 ? (
        <span className="min-h-8 content-center text-sm text-muted-foreground">
          {t("location.empty")}
        </span>
      ) : (
        <div
          data-testid="location-track"
          className="flex h-8.5 min-w-min shrink items-center rounded-track bg-track p-0.75 shadow-track"
        >
          <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <Picker
            labelKey="location.country"
            options={marketOptions}
            selectedId={selectedMarket?.code ?? null}
            selectedName={selectedMarket === null ? null : marketLabel(selectedMarket)}
            raised={selectedMarket !== null && !deeper.some((level) => level.selectedId !== null)}
            onSelect={(option) => selectLocationCountry(option?.id ?? null)}
          />
          {deeper.map((level) => (
            <Picker
              key={level.labelKey}
              labelKey={level.labelKey}
              options={level.options}
              selectedId={level.selectedId}
              selectedName={level.selectedName}
              raised={
                level.selectedId !== null &&
                !deeper.some((next) => next.depth > level.depth && next.selectedId !== null)
              }
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
        </div>
      )}
    </div>
  );
}

/** D214 — one warning line; the place name yields before either action does. */
export function PlaceNotice() {
  const { placeNotice } = useShell();
  const { t, entities } = useI18n();
  if (placeNotice === null) return null;
  const { node, switchTo, keep } = placeNotice;
  const name = entityName(
    "location",
    { id: node.id, nameEn: node.name_en, nameAm: node.name_am },
    entities,
  );
  return (
    <div
      data-testid="place-notice"
      role="status"
      className="flex h-8 min-w-0 flex-nowrap items-center gap-2 overflow-hidden bg-warning-soft px-2 text-sm text-warning md:px-4"
    >
      <CutText className="min-w-0 flex-1" text={t("location.noticeAsk").replace("{place}", name)} />
      <Button
        variant="ghost"
        size="sm"
        data-testid="place-notice-switch"
        onClick={switchTo}
        className="h-8 shrink-0 px-1 font-semibold text-warning underline"
      >
        {t("location.noticeSwitch")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        data-testid="place-notice-keep"
        onClick={keep}
        className="h-8 shrink-0 px-1 text-warning"
      >
        {t("location.noticeKeep")}
      </Button>
    </div>
  );
}

export default LocationSelector;
