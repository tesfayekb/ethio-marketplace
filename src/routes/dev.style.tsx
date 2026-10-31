import { createFileRoute } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { DataTablePagination } from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { RowActions } from "@/components/shell/row-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton, type IconButtonTone } from "@/components/ui/icon-button";
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import type { ThemeName } from "@/lib/theme-resolver";
import type { THEMES } from "@/lib/themes";

/**
 * BUNDLE 9 A3 — THE HOUSE-STYLE FIXTURE.
 *
 * Shows every colour meaning, badge, button, shadow and corner of the house
 * style once, so e2e/house-style.spec.ts can judge overflow and contrast here.
 * Production-safe like /dev/primitives: no data access, no writes, noindex.
 * The strings below are FIXTURE DATA, never user-facing product copy.
 */

export const Route = createFileRoute("/dev/style")({
  head: () => ({
    meta: [
      { title: "House style check — ethio.com" },
      { name: "description", content: "Internal house-style reference page." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "House style check — ethio.com" },
      { property: "og:description", content: "Internal house-style reference page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: StyleFixture,
});

/* Static class strings so the build sees every utility. */
const MEANINGS = [
  {
    name: "primary",
    soft: "border-border bg-muted text-primary",
    solid: "bg-primary text-primary-foreground",
    text: "text-primary",
  },
  {
    name: "success",
    soft: "border-success-line bg-success-soft text-success",
    solid: "bg-success text-primary-foreground",
    text: "text-success",
  },
  {
    name: "warning",
    soft: "border-warning-line bg-warning-soft text-warning",
    solid: "bg-warning text-card",
    text: "text-warning",
  },
  {
    name: "info",
    soft: "border-info-line bg-info-soft text-info",
    solid: "bg-info text-card",
    text: "text-info",
  },
  {
    name: "destructive",
    soft: "border-destructive-line bg-destructive-soft text-destructive",
    solid: "bg-destructive text-destructive-foreground",
    text: "text-destructive",
  },
  {
    name: "neutral",
    soft: "border-border bg-neutral-soft text-neutral",
    solid: "bg-neutral text-card",
    text: "text-neutral",
  },
] as const;

const NEW_BADGES = ["success", "warning", "info", "danger", "neutral"] as const;
const OLD_BADGES = ["default", "secondary", "destructive", "outline"] as const;
const BUTTONS = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
const RADII = [
  { size: "sm", cls: "rounded-sm" },
  { size: "md", cls: "rounded-md" },
  { size: "lg", cls: "rounded-lg" },
  { size: "xl", cls: "rounded-xl" },
] as const;

/*
 * Turn SAGE-S0 (ruling 1) — the Sage grid: theme × mode × card type, fixture data only. Each
 * panel scopes its theme's tokens from THEMES (validated data, D250) on its own container, so
 * both modes show at once whatever the page's mode; S4 completes the cards (flag, ribbon).
 */
const CARD_TYPES = [
  ["regular", "bg-card shadow-card", "", "text-primary"],
  ["featured", "bg-tier-featured shadow-featured", "★ FEATURED", "text-tier-featured-ink"],
  ["premium", "bg-tier-premium shadow-premium", "★★ PREMIUM", "text-tier-premium-ink"],
] as const;
/** Fixture card words (a dev page, English only). */
const FIXTURE_TITLE = "Sample listing";
const FIXTURE_PLACE = "Bole, Addis Ababa";

/** The theme data arrives on demand: no page's first download carries it (DEC-296). */
const themesModule = loadOnce(() => import("@/lib/themes").then((module) => module.THEMES));

function themeScope(
  themes: typeof THEMES,
  name: ThemeName,
  mode: "light" | "dark",
): Record<string, string> {
  const set = { ...themes[name].light, ...(mode === "dark" ? themes[name].dark : {}) };
  return Object.fromEntries(Object.entries(set).map(([token, value]) => [`--${token}`, value]));
}

function SageGrid() {
  const [themes, setThemes] = useState(themesModule.ready);
  useEffect(() => {
    if (themes) return;
    themesModule.load().then(setThemes, (error: unknown) => {
      reportOnDemandFailure("the theme data", error);
    });
  }, [themes]);
  if (!themes) return null;
  const names = Object.keys(themes) as ThemeName[];
  return (
    <div data-testid="style-sage-grid" className="mt-4 flex flex-col gap-4">
      {names.flatMap((name) =>
        (["light", "dark"] as const).map((mode) => (
          <div
            key={`${name}-${mode}`}
            data-testid={`style-sage-${name}-${mode}`}
            data-theme={name}
            data-mode={mode}
            className={`${mode === "dark" ? "dark " : ""}rounded-card bg-background p-4 text-foreground`}
            style={themeScope(themes, name, mode)}
          >
            <div className="grid grid-cols-3 gap-3">
              {CARD_TYPES.map(([tier, surface, word, ink]) => (
                <div
                  key={tier}
                  data-testid={`style-card-${tier}-${mode}`}
                  className={`min-w-0 overflow-hidden rounded-card ${surface}`}
                >
                  <div className="aspect-[4/3] bg-photo-empty" />
                  <p className="truncate p-3 text-sm font-semibold">{FIXTURE_TITLE}</p>
                  <p className={`px-3 pb-3 text-xs font-extrabold uppercase ${ink}`}>
                    {word || FIXTURE_PLACE}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.keys(themes[name].dark)
                .filter((token) => !token.startsWith("lift-"))
                .map((token) => (
                  <div key={token} className="flex flex-col items-center gap-1 text-[11px]">
                    <span
                      className="block h-8 w-12 rounded-md shadow-tile"
                      style={{ background: `var(--${token})` }}
                    />
                    {token}
                  </div>
                ))}
            </div>
          </div>
        )),
      )}
    </div>
  );
}

/**
 * D262 (turn B1, DEC-314) — THE DARK-CARD CHOICE. Three candidate card sets (styles.css,
 * `.dark [data-card-candidate]`) on a dark page, each with a plain card (a photo stand-in), a
 * Premium, a Featured and a no-photo card. The operator picks one; e2e/dark-cards.spec.ts measures
 * each against its targets. Fixture data, English only; never on a public page.
 */
const CANDIDATES = ["a", "b", "c"] as const;
const CHOICE_CARDS = [
  ["plain", "bg-card shadow-card", "bg-secondary", "text-primary", ""],
  [
    "premium",
    "bg-tier-premium shadow-premium",
    "bg-photo-empty",
    "text-tier-premium-ink",
    "★★ PREMIUM",
  ],
  [
    "featured",
    "bg-tier-featured shadow-featured",
    "bg-photo-empty",
    "text-tier-featured-ink",
    "★ FEATURED",
  ],
  ["no-photo", "bg-card shadow-card", "bg-photo-empty", "text-primary", ""],
] as const;

function DarkCardChoice() {
  return (
    <div
      data-testid="style-dark-cards"
      className="dark mt-4 flex flex-col gap-4 rounded-card bg-background p-4 text-foreground"
    >
      {CANDIDATES.map((candidate) => (
        <div
          key={candidate}
          data-card-candidate={candidate}
          data-testid={`style-candidate-${candidate}`}
        >
          <p className="mb-2 text-sm font-semibold">{`Candidate ${candidate.toUpperCase()}`}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHOICE_CARDS.map(([kind, surface, well, ink, word]) => (
              <div
                key={kind}
                data-testid={`style-candidate-${candidate}-${kind}`}
                className={`min-w-0 overflow-hidden rounded-card text-card-foreground ${surface}`}
              >
                <div className={`aspect-[4/3] ${well}`} />
                <p className="truncate px-3 pt-3 text-sm font-semibold">{FIXTURE_TITLE}</p>
                <p className={`px-3 text-sm font-bold ${ink}`}>{word || "ETB 12,500"}</p>
                <p className="truncate px-3 pb-3 text-xs text-muted-foreground">{FIXTURE_PLACE}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const SAMPLE_ROWS = ["Alpha", "Beta", "Gamma"] as const;
const TONES: IconButtonTone[] = ["neutral", "danger", "success", "warning", "info"];
const PAGER_TOTAL = 300;
const COLOURS = ["Red", "Blue"] as const;
const SIZES = ["Small", "Large"] as const;
/** Fixture words (a dev page, English only). */
const COLOUR_LABEL = "Colour";
const SIZE_LABEL = "Size";
const ANY = "Any";

function StyleFixture() {
  const [last, setLast] = useState("");
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const chips = [
    ...(colour ? [{ key: "colour", label: colour, onRemove: () => setColour("") }] : []),
    ...(size ? [{ key: "size", label: size, onRemove: () => setSize("") }] : []),
  ];
  return (
    <PageShell as="main" data-testid="dev-style">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">{"House style"}</h1>
        <p className="text-sm text-muted-foreground">{"Secondary text on the page."}</p>

        <Section title={"Sage cards and tokens"} testid="style-sage">
          <SageGrid />
        </Section>

        <Section title={"Dark cards: pick one"} testid="style-dark-choice">
          <DarkCardChoice />
        </Section>

        <Section title={"Meanings"} testid="style-meanings">
          <div className="mt-4 flex flex-col gap-3">
            {MEANINGS.map((m) => (
              <div
                key={m.name}
                data-testid={`style-meaning-${m.name}`}
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <div className={`rounded-md border px-3 py-2 text-sm font-medium ${m.soft}`}>
                  {m.name}
                </div>
                <div className={`rounded-md px-3 py-2 text-sm font-medium ${m.solid}`}>
                  {m.name}
                </div>
                <div className={`rounded-md px-3 py-2 text-sm font-medium ${m.text}`}>{m.name}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title={"Badges"} testid="style-badges">
          <div className="mt-4 flex flex-wrap gap-2">
            {[...NEW_BADGES, ...OLD_BADGES].map((v) => (
              <Badge key={v} variant={v} data-testid={`style-badge-${v}`}>
                {v}
              </Badge>
            ))}
          </div>
        </Section>

        <Section title={"Buttons"} testid="style-buttons">
          <div className="mt-4 flex flex-col gap-3">
            {(["default", "touch"] as const).map((size) => (
              <div key={size} className="flex flex-wrap gap-2">
                {BUTTONS.map((v) => (
                  <Button key={v} variant={v} size={size}>
                    {v}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </Section>

        <Section title={"Shadows"} testid="style-shadows">
          <p className="mt-1 text-sm text-muted-foreground">{"Secondary text on a card."}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{"Menu"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>{"First item"}</DropdownMenuItem>
                <DropdownMenuItem>{"Second item"}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{"Dialog"}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{"Dialog"}</DialogTitle>
                <DialogDescription>{"A dialog carries the large shadow."}</DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </Section>

        <Section title={"Corners"} testid="style-radii">
          <div className="mt-4 flex flex-wrap gap-3">
            {RADII.map((r) => (
              <div
                key={r.size}
                data-testid={`style-radius-${r.size}`}
                className={`flex h-16 w-24 items-center justify-center border border-border bg-muted text-sm ${r.cls}`}
              >
                {r.size}
              </div>
            ))}
          </div>
        </Section>

        <Section title={"Row actions"} testid="style-row-actions">
          <ul className="mt-4 divide-y divide-border">
            {SAMPLE_ROWS.map((row, index) => (
              <li key={row} className="flex items-center justify-between gap-2 py-2 text-sm">
                <span>{row}</span>
                <RowActions
                  testid={`style-row-${index + 1}`}
                  name={row}
                  edit={{ label: "Edit", onSelect: () => setLast(`edit ${row}`) }}
                  remove={{ label: "Delete", onSelect: () => setLast(`delete ${row}`) }}
                  more={[
                    { key: "copy", label: "Copy", onSelect: () => setLast(`copy ${row}`) },
                    {
                      key: "erase",
                      label: "Erase",
                      tone: "danger",
                      onSelect: () => setLast(`erase ${row}`),
                    },
                  ]}
                />
              </li>
            ))}
          </ul>
          <p data-testid="style-row-last" className="mt-2 text-sm text-muted-foreground">
            {last}
          </p>
        </Section>

        <Section title={"Icon buttons"} testid="style-icon-buttons">
          <div className="mt-4 flex flex-wrap gap-2">
            {TONES.map((tone) => (
              <IconButton
                key={tone}
                data-testid={`style-icon-${tone}`}
                label={tone}
                tone={tone}
                icon={<Pencil />}
              />
            ))}
          </div>
        </Section>

        <Section title={"Pager"} testid="style-pager-section">
          <div className="mt-4">
            <DataTablePagination
              testid="style-pager"
              offset={offset}
              pageSize={pageSize}
              total={PAGER_TOTAL}
              onPrevious={() => setOffset((o) => Math.max(0, o - pageSize))}
              onNext={() => setOffset((o) => o + pageSize)}
              onPage={(index) => setOffset(index * pageSize)}
              pageSizeOptions={[10, 25, 50]}
              onPageSize={(next) => {
                setPageSize(next);
                setOffset(0);
              }}
            />
          </div>
        </Section>

        <Section title={"Filters"} testid="style-filters-section">
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {/* Bundle 11 V2 (INC-543) — each filter a row of pills, never a dropdown. */}
            <FiltersButton
              testid="style-filters"
              count={chips.length}
              state={`${colour}|${size}`}
              onClearAll={() => {
                setColour("");
                setSize("");
              }}
            >
              <FilterChoices
                testid="style-filters-colour"
                label={COLOUR_LABEL}
                value={colour}
                onChange={setColour}
                options={[
                  { value: "", label: ANY },
                  ...COLOURS.map((c) => ({ value: c, label: c })),
                ]}
              />
              <FilterChoices
                testid="style-filters-size"
                label={SIZE_LABEL}
                value={size}
                onChange={setSize}
                options={[{ value: "", label: ANY }, ...SIZES.map((c) => ({ value: c, label: c }))]}
              />
            </FiltersButton>
            <FilterChips
              testid="style-filters-chips"
              chips={chips}
              onClearAll={() => {
                setColour("");
                setSize("");
              }}
            />
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
