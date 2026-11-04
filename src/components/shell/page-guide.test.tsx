import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * P-1c turn (b) (D315) — the Guide of a page: a plain control on the first
 * paint, the sheet mounted on the first tap and kept, the parts grammar, the
 * route-form next link outside the admin shell. Seams as block-guide.test.tsx's;
 * the admin carrier answers null (no admin shell on a seller's or buyer's page).
 */
const state = vi.hoisted(() => ({ asked: [] as string[][], sheetDraws: 0 }));

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
      onClickCapture={(event) => event.preventDefault()}
    >
      {children}
    </a>
  ),
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => {
    throw new Error("no admin shell on a page");
  },
  useAdminShellIfAny: () => null,
}));
// The sheet module is what the first tap fetches: count its draws.
vi.mock("./guide-sheet", async () => {
  const real = await vi.importActual<typeof import("./guide-sheet")>("./guide-sheet");
  return {
    ...real,
    PageGuideSheet: (props: Parameters<typeof real.PageGuideSheet>[0]) => {
      state.sheetDraws += 1;
      return <real.PageGuideSheet {...props} />;
    },
  };
});

const { PageGuide } = await import("./page-guide");
type GuidePart = import("./page-guide").GuidePart;

const SPEC = { prefix: "post.edit", partsPrefix: "post", next: { to: "/my-listings" as const } };
const PARTS = [
  { key: "category", labelKey: "post.step.category" as const },
  { key: "photos", label: "Photos" },
];
/** A page that does not name its parts: lines only. */
const UNNAMED = [{ key: "category" }, { key: "photos" }];

function draw(current?: string, parts: readonly GuidePart[] = PARTS) {
  render(<PageGuide spec={SPEC} title="Change a live ad" parts={parts} current={current} />);
}

async function open() {
  fireEvent.click(screen.getByTestId("post-edit-guide"));
  return await screen.findByTestId("post-edit-guide-body");
}

beforeEach(() => {
  state.asked = [];
  state.sheetDraws = 0;
});

describe("PageGuide (D315)", () => {
  it("PG-1 first paint: the control alone — a button named Guide, a dialog popup, closed; no sheet module drawn", () => {
    draw();
    const control = screen.getByTestId("post-edit-guide");
    expect(control.getAttribute("aria-haspopup")).toBe("dialog");
    expect(control.getAttribute("aria-expanded")).toBe("false");
    expect(control.textContent).toContain("prim.guide.open");
    expect(screen.queryByTestId("post-edit-guide-sheet")).toBeNull();
    expect(state.sheetDraws).toBe(0);
    expect(state.asked).toEqual([]);
  });

  it("PG-2 the first tap mounts the sheet: Each part under the parts grammar, the lines from partsPrefix, the guide layer asked for", async () => {
    draw("photos");
    const body = await open();
    expect(screen.getByTestId("post-edit-guide").getAttribute("aria-expanded")).toBe("true");
    expect(state.asked.at(-1)).toEqual(["guide"]);
    const parts = [...body.querySelectorAll("h3")].map((heading) => heading.textContent);
    expect(parts).toEqual([
      "prim.guide.what",
      "prim.guide.parts",
      "prim.guide.how",
      "prim.guide.next",
    ]);
    expect(body.textContent).toContain("post.edit.guide.what");
    expect(body.textContent).toContain("post.edit.guide.how");
    const terms = [...body.querySelectorAll("dt")].map((term) => term.textContent);
    expect(terms).toEqual(["post.step.category", "Photos"]);
    const lines = [...body.querySelectorAll("dd")].map((line) => line.textContent);
    expect(lines).toEqual(["post.guide.part.category", "post.guide.part.photos"]);
    expect(screen.getByTestId("post-edit-guide-part-photos").getAttribute("aria-current")).toBe(
      "step",
    );
    expect(
      screen.getByTestId("post-edit-guide-part-category").getAttribute("aria-current"),
    ).toBeNull();
  });

  it("PG-4 parts the page does not name draw as a plain list of lines, the current one marked", async () => {
    draw("category", UNNAMED);
    const body = await open();
    expect(body.querySelector("dl")).toBeNull();
    const lines = [...body.querySelectorAll("ul > li")].map((line) => line.textContent);
    expect(lines).toEqual(["post.guide.part.category", "post.guide.part.photos"]);
    expect(screen.getByTestId("post-edit-guide-part-category").getAttribute("aria-current")).toBe(
      "step",
    );
  });

  it("PG-3 the next link is the route form, resolved with no admin shell; pressing it closes the sheet, which stays mounted shut", async () => {
    draw();
    const body = await open();
    expect(body.querySelectorAll("a").length).toBe(1);
    const next = screen.getByTestId("post-edit-guide-next");
    expect(next.getAttribute("href")).toBe("/my-listings");
    expect(next.textContent).toContain("post.edit.guide.next");
    const drawsAtOpen = state.sheetDraws;
    fireEvent.click(next);
    await waitFor(() => expect(screen.queryByTestId("post-edit-guide-body")).toBeNull());
    expect(screen.getByTestId("post-edit-guide").getAttribute("aria-expanded")).toBe("false");
    // Shut, not gone: the sheet module drew again with open=false (no second fetch, no "never").
    expect(state.sheetDraws).toBeGreaterThan(drawsAtOpen);
    await open();
    expect(screen.getByTestId("post-edit-guide").getAttribute("aria-expanded")).toBe("true");
  });
});
