import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { en } from "@/i18n/locales/en";
import { formatDate } from "@/lib/format";
import { ownValue } from "@/lib/own-key";

const calls: Array<{ name: string; args: unknown }> = [];
const answers: Record<string, Array<{ data: unknown; error: unknown }>> = {};

vi.mock("@/lib/supabase-door", () => ({
  rpc: async (name: string, args: unknown) => {
    calls.push({ name, args });
    const queue = answers[name] ?? [];
    const next = queue.length > 1 ? queue.shift() : queue[0];
    return next ?? { data: null, error: { message: "no answer queued" } };
  },
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));

import { PromoteSheet } from "./promote-sheet";

const UNTIL = "2026-11-20T10:00:00+00:00";
const level = (over: Record<string, unknown>) => ({
  name_am: null,
  current: false,
  below: false,
  days: 15,
  amount: 0,
  currency: "XTS",
  availability: "available",
  ...over,
});
/** promote_options' answer in the shape its jsonb_build_object writes (20261106233808). */
const options = (over: Record<string, unknown> = {}) => ({
  ok: true,
  status: "active",
  level: { key: "lvl-a", until: UNTIL, source: "launch" },
  country: "XZ",
  paidLevels: false,
  currency: "XTS",
  levels: [
    level({ key: "lvl-base", name_en: "Base", sort: 0, below: true, days: 30 }),
    level({ key: "lvl-a", name_en: "Level A", sort: 10, current: true }),
    level({ key: "lvl-b", name_en: "Level B", sort: 20, days: 20, amount: 7.25 }),
    level({ key: "lvl-c", name_en: "Level C", sort: 30, availability: "seasonEnded", days: null }),
    level({ key: "lvl-d", name_en: "Level D", sort: 40, availability: "notOffered", amount: null }),
  ],
  ...over,
});

function mount() {
  const onDone = vi.fn();
  const onOpenChange = vi.fn();
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrap = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  render(<PromoteSheet listingId="ad-1" open onOpenChange={onOpenChange} onDone={onDone} />, {
    wrapper: wrap,
  });
  return { onDone, onOpenChange };
}

const day = (value: string) => formatDate("day", value, "en");

beforeEach(() => {
  calls.length = 0;
  for (const key of Object.keys(answers)) delete answers[key];
});

describe("P-2 (b) the promote sheet (DEC-349)", () => {
  it("PMS-1 lists the door's levels: names, days, the launch line, the current named with its end, the lower not available", async () => {
    answers.promote_options = [{ data: options(), error: null }];
    mount();
    const current = await screen.findByTestId("promote-level-lvl-a");
    expect(calls[0]).toEqual({ name: "promote_options", args: { p_listing_id: "ad-1" } });
    expect(within(current).getByTestId("promote-current-lvl-a")).toHaveTextContent("Current level");
    expect(within(current).getByTestId("promote-until")).toHaveTextContent(`Until ${day(UNTIL)}`);
    const below = screen.getByTestId("promote-level-lvl-base");
    expect(within(below).getByTestId("promote-reason-lvl-base")).toHaveTextContent("Not available");
    expect(within(below).queryByRole("button")).toBeNull();
    const above = screen.getByTestId("promote-level-lvl-b");
    expect(above).toHaveTextContent("Level B");
    expect(above).toHaveTextContent("20 days · Free while the launch runs");
    expect(above).not.toHaveTextContent("7.25");
    expect(within(above).getByTestId("promote-choose-lvl-b")).toHaveTextContent("Choose level");
    expect(screen.queryByTestId("promote-empty")).toBeNull();
  });

  it("PMS-2 with paid levels on, each level shows the door's amount through the one money formatter", async () => {
    answers.promote_options = [{ data: options({ paidLevels: true }), error: null }];
    mount();
    const above = await screen.findByTestId("promote-level-lvl-b");
    expect(above).toHaveTextContent("20 days · 7.25 XTS");
    expect(screen.queryByText("Free while the launch runs")).toBeNull();
  });

  it("PMS-3 a level the ad cannot take shows the door's reason and no button", async () => {
    answers.promote_options = [{ data: options(), error: null }];
    mount();
    expect(await screen.findByTestId("promote-reason-lvl-c")).toHaveTextContent(
      "This level's season has ended.",
    );
    expect(screen.getByTestId("promote-reason-lvl-d")).toHaveTextContent(
      "This level has no price here yet.",
    );
    expect(screen.queryByTestId("promote-choose-lvl-c")).toBeNull();
    expect(screen.queryByTestId("promote-choose-lvl-d")).toBeNull();
  });

  it("PMS-4 choosing sets the level through set_listing_level and hands back the door's end", async () => {
    answers.promote_options = [{ data: options(), error: null }];
    answers.set_listing_level = [
      { data: { ok: true, level: "lvl-b", until: "2026-11-27T10:00:00+00:00" }, error: null },
    ];
    const { onDone, onOpenChange } = mount();
    fireEvent.click(await screen.findByTestId("promote-choose-lvl-b"));
    await waitFor(() => expect(onDone).toHaveBeenCalledWith("2026-11-27T10:00:00+00:00"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(calls.filter((call) => call.name === "set_listing_level")).toEqual([
      { name: "set_listing_level", args: { p_listing_id: "ad-1", p_level_key: "lvl-b" } },
    ]);
  });

  it("PMS-5 a refusal is named by its code (sameLevel with the end the fresh read gives), a sentence is door.refused", async () => {
    const LATER = "2026-12-09T10:00:00+00:00";
    answers.promote_options = [
      { data: options(), error: null },
      { data: options({ level: { key: "lvl-a", until: LATER, source: "launch" } }), error: null },
    ];
    answers.set_listing_level = [
      { data: null, error: { message: "sameLevel", code: "P0001" } },
      { data: null, error: { message: "account is deactivated", code: "P0001" } },
    ];
    const { onDone } = mount();
    fireEvent.click(await screen.findByTestId("promote-choose-lvl-b"));
    expect(await screen.findByTestId("promote-problem")).toHaveTextContent(
      `This ad already has this level until ${day(LATER)}.`,
    );
    expect(calls.filter((call) => call.name === "promote_options")).toHaveLength(2);
    fireEvent.click(screen.getByTestId("promote-choose-lvl-b"));
    await waitFor(() =>
      expect(screen.getByTestId("promote-problem")).toHaveTextContent("This request was refused."),
    );
    expect(onDone).not.toHaveBeenCalled();
  });

  it("PMS-6 a refused read is named, a failed one is the retry line, and nothing to choose is a caption beside the list", async () => {
    answers.promote_options = [
      { data: null, error: { message: "listingNotPlaced", code: "P0D01" } },
    ];
    mount();
    expect(await screen.findByTestId("promote-load-error")).toHaveTextContent(
      "Add the ad's place before promoting it.",
    );
    cleanup();

    answers.promote_options = [{ data: null, error: new TypeError("Failed to fetch") }];
    mount();
    expect(await screen.findByTestId("promote-load-error")).toHaveTextContent(
      "That did not work. Try again.",
    );
    cleanup();

    const top = options({
      level: { key: "lvl-b", until: null, source: "staff" },
      levels: [
        level({ key: "lvl-a", name_en: "Level A", sort: 10, below: true }),
        level({ key: "lvl-b", name_en: "Level B", sort: 20, current: true }),
      ],
    });
    answers.promote_options = [{ data: top, error: null }];
    mount();
    expect(await screen.findByTestId("promote-empty")).toHaveTextContent(
      "No higher level is offered for this ad.",
    );
    expect(screen.getByTestId("promote-level-lvl-b")).toBeInTheDocument();
    expect(screen.queryByTestId("promote-until")).toBeNull();
    expect(screen.queryByRole("button", { name: "Choose level" })).toBeNull();
  });
});
