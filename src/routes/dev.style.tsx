import { createFileRoute } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useState } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { DataTablePagination } from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
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
import { NativeSelect } from "@/components/ui/native-select";

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

const SAMPLE_ROWS = ["Alpha", "Beta", "Gamma"] as const;
const TONES: IconButtonTone[] = ["neutral", "danger", "success", "warning", "info"];
const PAGER_TOTAL = 300;
const COLOURS = ["Red", "Blue"] as const;
const SIZES = ["Small", "Large"] as const;

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
            <FiltersButton testid="style-filters" count={chips.length}>
              <label className="flex flex-col gap-1 text-sm">
                <span>{"Colour"}</span>
                <NativeSelect
                  data-testid="style-filters-colour"
                  value={colour}
                  onChange={(event) => setColour(event.target.value)}
                >
                  <option value="">{"Any"}</option>
                  {COLOURS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </NativeSelect>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>{"Size"}</span>
                <NativeSelect
                  data-testid="style-filters-size"
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                >
                  <option value="">{"Any"}</option>
                  {SIZES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </NativeSelect>
              </label>
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
