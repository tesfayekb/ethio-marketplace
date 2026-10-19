import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const read = vi.hoisted(() => vi.fn());
const lang = vi.hoisted(() => ({ value: "en" }));
vi.mock("./legal-reader", () => ({ myListingCertification: (id: string) => read(id) }));
vi.mock("@/i18n", async (original) => {
  const real = await original<typeof import("@/i18n")>();
  const { en } = await import("@/i18n/locales/en");
  return {
    ...real,
    useI18n: () => ({
      t: (key: string) => (en as Record<string, string>)[key] ?? key,
      language: lang.value,
    }),
  };
});
import { CertifyBlock } from "./certify-block";
import type { CertifyState } from "./certify-refusal";

const GLOBAL = {
  version_id: "v-global",
  kind: "e2e-pub-x",
  country_code: null,
  version: 1,
  label: "one",
  body_en: "Global English",
  body_am: "Global Amharic",
  settings_snapshot: {},
};
const KENYA = { ...GLOBAL, version_id: "v-ke", country_code: "KE", body_en: "Kenya English" };

function mount() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const reports: CertifyState[] = [];
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const view = render(<CertifyBlock listingId="l-1" onChange={(s) => reports.push(s)} />, {
    wrapper,
  });
  return { reports, view };
}
const last = (reports: CertifyState[]) => reports[reports.length - 1];

beforeEach(() => {
  read.mockReset();
  lang.value = "en";
});

describe("CertifyBlock (bundle 22 turn 4)", () => {
  it("renders nothing and reports none when no statement applies", async () => {
    read.mockResolvedValue({ statements: [], acceptance_pending: false });
    const { reports, view } = mount();
    await waitFor(() => expect(last(reports)?.state).toBe("none"));
    expect(view.container.innerHTML).toBe("");
    expect(read).toHaveBeenCalledWith("l-1");
  });
  it("renders two statements in order with the country heading, and one unticked tick", async () => {
    read.mockResolvedValue({ statements: [GLOBAL, KENYA], acceptance_pending: false });
    const { reports } = mount();
    await waitFor(() => expect(screen.getAllByTestId("certify-statement")).toHaveLength(2));
    const boxes = screen.getAllByTestId("certify-statement");
    expect(boxes.map((b) => b.getAttribute("data-country"))).toEqual(["global", "KE"]);
    expect(boxes[0]?.textContent).toContain("Global English");
    expect(boxes[1]?.textContent).toContain("For Kenya");
    expect(boxes[1]?.textContent).toContain("Kenya English");
    expect(last(reports)).toEqual({
      state: "ready",
      versionIds: ["v-global", "v-ke"],
      ticked: false,
      acceptancePending: false,
    });
    fireEvent.click(screen.getByTestId("certify-tick"));
    await waitFor(() => expect(last(reports)?.ticked).toBe(true));
  });
  it("shows body_am in Amharic", async () => {
    lang.value = "am";
    read.mockResolvedValue({ statements: [GLOBAL], acceptance_pending: false });
    mount();
    await waitFor(() =>
      expect(screen.getByTestId("certify-statement").textContent).toContain("Global Amharic"),
    );
  });
  it("shows the load error and reports error", async () => {
    read.mockRejectedValue(new Error("boom"));
    const { reports } = mount();
    await waitFor(() => expect(screen.getByTestId("certify-load-error")).toBeTruthy());
    expect(last(reports)?.state).toBe("error");
  });
});
