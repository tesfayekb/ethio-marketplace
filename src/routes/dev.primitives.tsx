import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ChartFrame } from "@/components/shell/chart-frame";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { DetailPanel } from "@/components/shell/detail-panel";
import { FormField, FormSection } from "@/components/shell/form-section";
import { PageCard } from "@/components/shell/page-card";
import { StatCard, StatGrid } from "@/components/shell/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

/**
 * U1c — THE PRIMITIVES FIXTURE (DEC-015).
 *
 * Renders every display primitive with deliberately hostile data so the
 * primitives law suite (e2e/primitives-law.spec.ts) can test responsiveness
 * ONCE, here, instead of re-testing it on every feature screen.
 *
 * Production-safe like /dev/tall: no data access, no writes, noindex. The
 * strings below are FIXTURE DATA (never user-facing product copy); every
 * primitive's own empty/loading/error copy comes from i18n.
 */

type FixtureState = "default" | "empty" | "loading" | "error";

export const Route = createFileRoute("/dev/primitives")({
  validateSearch: (search: Record<string, unknown>): { state?: FixtureState; variant?: "lg" } => {
    const raw = String(search["state"] ?? "");
    const state = (["empty", "loading", "error"] as const).includes(raw as "empty")
      ? { state: raw as FixtureState }
      : {};
    return String(search["variant"] ?? "") === "lg" ? { ...state, variant: "lg" } : state;
  },
  head: () => ({
    meta: [
      { title: "Primitives check — ethio.com" },
      { name: "description", content: "Internal display-primitives reference page." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Primitives check — ethio.com" },
      { property: "og:description", content: "Internal display-primitives reference page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrimitivesFixture,
});

/* ------------------------------ fixture data ------------------------------ */

const LONG_EMAIL = "extremely.long.seller.address.for.layout@subdomain.example-marketplace.com";
const LONG_DESCRIPTION =
  "A deliberately long listing description used to prove that cells truncate with a title tooltip instead of stretching the table beyond its container width.";
const LONG_VALUE =
  "This value is three hundred characters long on purpose. A detail panel never truncates silently, because the value is the payload the operator came to read. It wraps across as many lines as it needs, at every viewport, in both light and dark mode, and it stays inside its card without any horizontal scrolling at all.";
const LONG_HELP =
  "This help text is two hundred characters long so the form grid is forced to wrap it rather than widen its column. Help text always sits under its control and never pushes the layout sideways at 360px.";
const LONG_LABEL = "Active sellers with a verified contact channel";
const CHIPS = Array.from({ length: 30 }, (_, index) => `chip-${index + 1}`);

type FixtureRow = {
  id: string;
  name: string;
  email: string;
  description: string;
  country: string;
  status: string;
  roles: string[];
  listings: number;
  views: number;
  joined: string;
  updated: string;
  handle: string;
};

const ROWS: FixtureRow[] = Array.from({ length: 6 }, (_, index) => ({
  id: `row-${index + 1}`,
  name: `Fixture Seller Number ${index + 1}`,
  email: LONG_EMAIL,
  description: LONG_DESCRIPTION,
  country: "ET",
  status: index % 2 === 0 ? "active" : "deactivated",
  roles: ["admin", "moderator", "seller"],
  listings: 12 * (index + 1),
  views: 1234 * (index + 1),
  joined: "2026-01-0" + String(index + 1),
  updated: "2026-08-1" + String(index + 1),
  handle: `@fixture-seller-${index + 1}`,
}));

const STATS: Array<{
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
}> = [
  { label: LONG_LABEL, value: "12,481", delta: "+4.2%", trend: "up" as const },
  { label: "Listings published this week", value: "3,204", delta: "-1.1%", trend: "down" as const },
  { label: "Messages sent", value: "88,102", delta: "0.0%", trend: "flat" as const },
  { label: "Average time to first reply", value: "3h 12m" },
  { label: "Storefronts created", value: "742", delta: "+11%", trend: "up" as const },
  { label: "Reports awaiting moderation", value: "19", delta: "+3", trend: "down" as const },
];

const PAIRS = [
  { label: "Seller alias", value: "fixture-seller" },
  { label: "Email", value: LONG_EMAIL },
  { label: "Home country", value: "ET" },
  { label: "Account status", value: <Badge variant="secondary">{"active"}</Badge> },
  {
    label: "Roles",
    value: (
      <span className="flex flex-wrap gap-1">
        {CHIPS.slice(0, 8).map((chip) => (
          <Badge key={chip} variant="outline">
            {chip}
          </Badge>
        ))}
      </span>
    ),
  },
  { label: "Notes", value: LONG_VALUE },
  { label: "Joined", value: "2026-01-01", hint: "UTC" },
  { label: "Last sign-in", value: "2026-08-16", hint: "UTC" },
  { label: "Listings", value: "128" },
  { label: "Storefront", value: "/@fixture-seller" },
];

const FIELDS = [
  "Display name",
  "Seller alias",
  "Email address",
  "Phone number",
  "Home country",
  "City",
  "Preferred contact channel",
  "Short bio",
];

/* -------------------------------- fixture -------------------------------- */

function PrimitivesFixture() {
  const { state = "default", variant } = Route.useSearch();
  const { t } = useI18n();
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const loading = state === "loading";
  const error = state === "error" ? new Error("fixture") : undefined;
  const rows = state === "empty" ? [] : ROWS;

  const columns: DataTableColumn<FixtureRow>[] = [
    {
      key: "name",
      header: "Name",
      priority: "primary",
      width: "w-[16%]",
      cell: (row) => (
        <span className="block truncate font-medium text-foreground" title={row.name}>
          {row.name}
        </span>
      ),
    },
    {
      key: "email",
      header: "Email",
      priority: "primary",
      width: "w-[20%]",
      cell: (row) => (
        <span className="block break-all text-muted-foreground" title={row.email}>
          {row.email}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      priority: "secondary",
      width: "w-[18%]",
      cell: (row) => (
        <span className="block truncate text-muted-foreground" title={row.description}>
          {row.description}
        </span>
      ),
    },
    {
      key: "chips",
      header: "Tags",
      priority: "secondary",
      width: "w-[14%]",
      cell: () => (
        <span className="flex flex-wrap gap-1">
          {CHIPS.map((chip) => (
            <Badge key={chip} variant="outline">
              {chip}
            </Badge>
          ))}
        </span>
      ),
    },
    {
      key: "country",
      header: "Country",
      priority: "secondary",
      width: "w-[6%]",
      cell: (row) => <span className="block text-muted-foreground">{row.country}</span>,
    },
    {
      key: "status",
      header: "Status",
      priority: "secondary",
      width: "w-[8%]",
      cell: (row) => (
        <Badge variant={row.status === "deactivated" ? "destructive" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "roles",
      header: "Roles",
      priority: "secondary",
      sortable: true,
      width: "w-[10%]",
      cell: (row) => (
        <span className="flex flex-wrap gap-1">
          {row.roles.map((role) => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </span>
      ),
    },
    {
      key: "listings",
      header: "Listings",
      priority: "detail",
      align: "end",
      width: "w-[6%]",
      cell: (row) => <span className="block tabular-nums">{row.listings}</span>,
    },
    {
      key: "views",
      header: "Views",
      priority: "detail",
      align: "end",
      width: "w-[6%]",
      cell: (row) => <span className="block tabular-nums">{row.views}</span>,
    },
    {
      key: "handle",
      header: "Storefront",
      priority: "detail",
      width: "w-[10%]",
      cell: (row) => <span className="block break-all text-muted-foreground">{row.handle}</span>,
    },
    {
      key: "joined",
      header: "Joined",
      priority: "detail",
      sortable: true,
      width: "w-[8%]",
      cell: (row) => <span className="block tabular-nums">{row.joined}</span>,
    },
    {
      key: "updated",
      header: "Updated",
      priority: "detail",
      width: "w-[8%]",
      cell: (row) => <span className="block tabular-nums">{row.updated}</span>,
    },
  ];

  /**
   * C7 / INC-130 + INC-135 — dense columns that DECLARE their min-widths, with
   * the numeric tail parked on the `wide` tier so the demo also exercises the
   * xl-only column class alongside the pinned first column.
   */
  const denseColumns: DataTableColumn<FixtureRow>[] = columns.map((column) => ({
    ...column,
    width: undefined,
    minWidth: column.priority === "primary" ? "min-w-56" : "min-w-40",
    priority:
      column.key === "views" || column.key === "updated" ? "wide" : column.priority,
  }));

  return (
    <div data-testid="prim-fixture" className="mx-auto w-full min-w-0 max-w-6xl space-y-6 pb-10">
      <PageCard testid="prim-page-card" className="min-w-0">
        <h1 className="min-w-0 break-words text-xl font-semibold text-foreground">
          {t("app.name")}
        </h1>
      </PageCard>

      <div data-testid="prim-stat-grid" className="min-w-0">
        <StatGrid>
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              trend={stat.trend}
              hint={stat.hint}
              loading={loading}
              testid={`prim-stat-tile-${index}`}
            />
          ))}
        </StatGrid>
      </div>

      <div data-testid="prim-chart-frame" className="min-w-0">
        <ChartFrame
          title={"Weekly listing volume"}
          description={"A full-width SVG sized by the frame, never by the window."}
          aspect="16/9"
          legend="bottom"
          legendContent={CHIPS.slice(0, 10).map((chip) => (
            <span key={chip} className="text-muted-foreground">
              {chip}
            </span>
          ))}
          loading={loading}
          empty={state === "empty"}
          error={error}
        >
          {({ width, height }) => (
            <svg width={width} height={height} role="presentation" className="block">
              <rect x={0} y={0} width={width} height={height} className="fill-muted" />
              <polyline
                points={Array.from({ length: 12 }, (_, index) => {
                  const x = (width / 11) * index;
                  const y = height - ((index * 7) % height);
                  return `${x},${y}`;
                }).join(" ")}
                className="fill-none stroke-primary"
                strokeWidth={2}
              />
            </svg>
          )}
        </ChartFrame>
      </div>

      <div data-testid="prim-form-section" className="min-w-0">
        <FormSection
          title={"Seller profile"}
          description={"Two columns from md, one column at 360."}
          columns={2}
          actions={
            <>
              <Button type="button" className="min-h-11">
                {t("common.save")}
              </Button>
              <Button type="button" variant="outline" className="min-h-11">
                {t("common.cancel")}
              </Button>
            </>
          }
        >
          {FIELDS.map((field, index) => (
            <FormField
              key={field}
              label={field}
              htmlFor={`prim-field-${index}`}
              help={index === 0 ? LONG_HELP : undefined}
              error={index === 1 ? "This alias is already taken." : undefined}
              full={index === FIELDS.length - 1}
            >
              <Input id={`prim-field-${index}`} defaultValue={""} />
            </FormField>
          ))}
        </FormSection>
      </div>

      <div data-testid="prim-detail-panel" className="min-w-0">
        <DetailPanel
          title={"Account detail"}
          pairs={state === "empty" ? [] : PAIRS}
          loading={loading}
          error={error}
        />
      </div>

      {/*
        C7 / INC-130 — the VARIANT demo. `?variant=lg` swaps the default table
        for a `cardUntil="lg"` + `minWidth` twin. It REPLACES rather than sits
        beside the default one on purpose: the law suite's L3 case locates the
        table with a bare `page.locator("table")`, and two DataTables on one
        page would turn that (unmodified, never-weakened) assertion into a
        strict-mode violation. One page, one table, two laws.
      */}
      <div data-testid="prim-data-table" className="min-w-0">
        <DataTable
          cardUntil={variant === "lg" ? "lg" : "md"}
          stickyFirstColumn={variant === "lg"}
          columns={variant === "lg" ? denseColumns : columns}
          rows={rows}
          rowKey={(row) => row.id}
          rowTestId={(row) => `prim-row-${row.id}`}
          rowHref={(row) => ({ to: "/c/$slug", params: { slug: row.id } })}
          caption={"Primitives fixture table"}
          loading={loading}
          loadingState={<p className="text-sm text-muted-foreground">{t("prim.state.loading")}</p>}
          error={error}
          errorState={<p className="text-sm text-destructive">{t("prim.state.error")}</p>}
          emptyState={<p className="text-sm text-muted-foreground">{t("prim.state.empty")}</p>}
          toolbar={
            <>
              <Input placeholder={t("admin.users.searchPlaceholder")} className="md:w-64" />
              <Button type="button" variant="outline" className="min-h-11">
                {t("prim.table.actions")}
              </Button>
            </>
          }
          rowActions={(row) => (
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              data-testid={`prim-action-${row.id}`}
            >
              {t("prim.table.actions")}
            </Button>
          )}
          selection={{
            selectedKeys: selected,
            onToggleRow: (row, isSelected) =>
              setSelected((prev) =>
                isSelected ? [...prev, row.id] : prev.filter((id) => id !== row.id),
              ),
            onToggleAll: (isSelected) => setSelected(isSelected ? ROWS.map((row) => row.id) : []),
          }}
          pagination={
            <DataTablePagination
              offset={offset}
              pageSize={ROWS.length}
              total={ROWS.length * 4}
              onPrevious={() => setOffset((prev) => Math.max(0, prev - ROWS.length))}
              onNext={() => setOffset((prev) => prev + ROWS.length)}
            />
          }
        />
      </div>
    </div>
  );
}
