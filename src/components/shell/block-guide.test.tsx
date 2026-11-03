import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * P-1c (D313) — the Guide of an admin block: one control, one side sheet with
 * four fixed parts, one link; its texts the block's own keys under its prefix.
 * Seams: `@/i18n` (identity `t`; the guide layer answers ready at once),
 * `@tanstack/react-router` (a bare anchor for Link), the admin shell (the
 * caller's permissions).
 */
const state = vi.hoisted(() => ({
  permissions: ["packages:view", "countries:view"] as string[],
  asked: [] as string[][],
}));

vi.mock("@/i18n", () => ({
  STRINGS_LAYERS: ["admin", "member", "guide"],
  isStringsLayer: (value: string) => ["admin", "member", "guide"].includes(value),
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
  useStringsLayers: (layers: string[]) => {
    state.asked.push(layers);
    return { state: "ready" };
  },
}));
vi.mock("@tanstack/react-router", () => ({
  // The gate reads the route's declared layers; a bare tree declares none.
  useRouterState: ({ select }: { select: (routerState: { matches: unknown[] }) => unknown }) =>
    select({ matches: [] }),
  Link: ({
    to,
    hash,
    children,
    ...rest
  }: {
    to: string;
    hash?: string;
    children: ReactNode;
    [key: string]: unknown;
  }) => (
    <a
      href={hash === undefined ? to : `${to}#${hash}`}
      {...rest}
      // jsdom has no navigation: the sheet's own onClick still runs.
      onClickCapture={(event) => event.preventDefault()}
    >
      {children}
    </a>
  ),
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: state.permissions, accessDenied: false }),
}));

const { BlockGuide } = await import("./block-guide");

const SPEC = {
  prefix: "admin.monetisation.markets",
  next: { section: "monetisation" as const, block: "admin-monetisation-level" },
};
const COLUMNS = [
  { key: "market", label: "Market" },
  { key: "freeAds", label: "Free ads" },
];

function draw() {
  render(<BlockGuide spec={SPEC} title="Markets" columns={COLUMNS} />);
}

async function open() {
  fireEvent.click(screen.getByTestId("admin-monetisation-markets-guide"));
  return await screen.findByTestId("admin-monetisation-markets-guide-body");
}

beforeEach(() => {
  state.permissions = ["packages:view", "countries:view"];
  state.asked = [];
});

describe("BlockGuide (D313)", () => {
  it("BG-1 the control: named Guide, a dialog popup, closed; its testid from the block's anchor", () => {
    draw();
    const control = screen.getByTestId("admin-monetisation-markets-guide");
    expect(control.getAttribute("aria-haspopup")).toBe("dialog");
    expect(control.getAttribute("aria-expanded")).toBe("false");
    expect(control.textContent).toContain("prim.guide.open");
    expect(screen.queryByTestId("admin-monetisation-markets-guide-sheet")).toBeNull();
  });

  it("BG-2 opened: the sheet titled by the caption, the four parts in their fixed order, the guide layer asked for", async () => {
    draw();
    const body = await open();
    expect(
      screen.getByTestId("admin-monetisation-markets-guide").getAttribute("aria-expanded"),
    ).toBe("true");
    const sheet = screen.getByTestId("admin-monetisation-markets-guide-sheet");
    expect(within(sheet).getByRole("heading", { level: 2 }).textContent).toBe("Markets");
    const parts = [...body.querySelectorAll("h3")].map((heading) => heading.textContent);
    expect(parts).toEqual([
      "prim.guide.what",
      "prim.guide.columns",
      "prim.guide.how",
      "prim.guide.next",
    ]);
    expect(state.asked.at(-1)).toEqual(["guide"]);
    expect(body.textContent).toContain("admin.monetisation.markets.guide.what");
    expect(body.textContent).toContain("admin.monetisation.markets.guide.how");
  });

  it("BG-3 Each column: one line per visible column, in the table's order, its label the term and its key's text the line", async () => {
    draw();
    const body = await open();
    const terms = [...body.querySelectorAll("dt")].map((term) => term.textContent);
    const lines = [...body.querySelectorAll("dd")].map((line) => line.textContent);
    expect(terms).toEqual(["Market", "Free ads"]);
    expect(lines).toEqual([
      "admin.monetisation.markets.guide.col.market",
      "admin.monetisation.markets.guide.col.freeAds",
    ]);
  });

  it("BG-4 What to do next: ONE link, to the section's path with the block as the hash; pressing it closes the sheet", async () => {
    draw();
    const body = await open();
    const links = body.querySelectorAll("a");
    expect(links.length).toBe(1);
    const next = screen.getByTestId("admin-monetisation-markets-guide-next");
    expect(next.getAttribute("href")).toBe("/admin/monetisation#admin-monetisation-level");
    expect(next.textContent).toContain("admin.monetisation.markets.guide.next");
    fireEvent.click(next);
    await waitFor(() =>
      expect(screen.queryByTestId("admin-monetisation-markets-guide-body")).toBeNull(),
    );
  });

  it("BG-5 a next step the caller may not see leads to the admin landing, never a refused page", async () => {
    state.permissions = ["countries:view"];
    draw();
    await open();
    expect(screen.getByTestId("admin-monetisation-markets-guide-next").getAttribute("href")).toBe(
      "/admin",
    );
  });
});
