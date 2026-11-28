import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { readFailed } from "@/lib/reader-failure";
import { acceptRefusalKey } from "./legal-accept-refusals";

/**
 * UF-1 Part 1 (DEC-493) — the acceptance screen's one-screen rows. Seams: the legal reader's
 * three calls, the router's navigate and the shell; the words are the real catalogues, and a
 * refusal's words come from the screen's own reader (acceptRefusalKey).
 */
const lang = vi.hoisted(() => ({ value: "en" as "en" | "am" }));
const reads = vi.hoisted(() => ({ status: vi.fn(), accept: vi.fn(), version: vi.fn() }));
vi.mock("./legal-reader", async (original) => ({
  ...(await original<typeof import("./legal-reader")>()),
  myLegalStatus: (kinds: string[]) => reads.status(kinds),
  acceptLegal: (input: unknown) => reads.accept(input),
  myLegalVersion: (id: string) => reads.version(id),
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
vi.mock("@/components/shell-context", () => ({ useShell: () => ({ requestSignOut: vi.fn() }) }));
vi.mock("@/i18n", async (original) => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { am: AM } = await import("@/i18n/locales/am");
  const { ownValue: own } = await import("@/lib/own-key");
  return {
    ...(await original<typeof import("@/i18n")>()),
    useI18n: () => ({
      t: (key: string) => own(lang.value === "am" ? AM : EN, key) ?? key,
      language: lang.value,
    }),
  };
});
import { LegalAcceptScreen } from "./legal-accept-screen";

const row = (kind: string, id: string) => ({
  kind,
  country_code: null,
  version_id: id,
  version: 1,
  label: `${kind} one`,
  material: false,
  effective_at: "2026-10-01T00:00:00Z",
  adult_confirmed: true,
});
function mount() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <LegalAcceptScreen userId="u1" kinds={["terms"]} next="/account" />
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  lang.value = "en";
  reads.status.mockReset();
  reads.accept.mockReset();
  reads.version.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("UF-1 the acceptance screen", () => {
  it("UFP-25 a document text that fails to load says so, and Retry reads it again uf:S5.3", async () => {
    reads.status.mockResolvedValue([row("terms", "t1")]);
    reads.version.mockRejectedValue(readFailed("route 503", 503));
    mount();
    fireEvent.click(await screen.findByRole("button", { name: en["legal.accept.read"] }));
    expect(await screen.findByTestId("legal-accept-version-failed")).toHaveTextContent(
      en["legal.accept.loadError"],
    );
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    await waitFor(() => expect(reads.version).toHaveBeenCalledTimes(2));
  });

  it("UFP-26 a refused acceptance shows the reader's words; notInForce unticks and reads the list again, another code keeps the tick uf:S5.5", async () => {
    for (const code of ["notInForce", "badLanguage"]) {
      reads.status.mockReset();
      reads.status.mockResolvedValue([row("terms", "t1")]);
      reads.accept.mockRejectedValue({ message: code });
      const { unmount } = mount();
      await screen.findByTestId("legal-accept-doc");
      fireEvent.click(screen.getByTestId("legal-accept-tick"));
      fireEvent.click(screen.getByTestId("legal-accept-submit"));
      expect(await screen.findByTestId("legal-accept-error")).toHaveTextContent(
        en[acceptRefusalKey({ message: code })],
      );
      if (code === "notInForce") {
        expect(screen.getByTestId("legal-accept-submit")).toHaveAttribute("data-closed", "1");
        expect(reads.status).toHaveBeenCalledTimes(2);
      } else {
        expect(screen.getByTestId("legal-accept-submit")).not.toHaveAttribute("data-closed");
      }
      unmount();
    }
  });

  it("UFP-27 a failed status read says so, and Retry reads it again uf:S5.6", async () => {
    reads.status.mockRejectedValueOnce(readFailed("route 503", 503));
    reads.status.mockResolvedValue([row("terms", "t1")]);
    mount();
    expect(await screen.findByTestId("legal-accept-load-error")).toHaveTextContent(
      en["legal.accept.loadError"],
    );
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(await screen.findByTestId("legal-accept-doc")).toBeInTheDocument();
    expect(reads.status).toHaveBeenCalledTimes(2);
  });

  it("UFP-28 in Amharic the acceptance screen's own words are the Amharic catalogue's uf:S5.11", async () => {
    lang.value = "am";
    reads.status.mockResolvedValue([row("terms", "t1")]);
    reads.accept.mockRejectedValue({ message: "notInForce" });
    mount();
    await screen.findByTestId("legal-accept-doc");
    fireEvent.click(screen.getByTestId("legal-accept-tick"));
    fireEvent.click(screen.getByTestId("legal-accept-submit"));
    await screen.findByTestId("legal-accept-error");
    const keys = [
      "legal.accept.title",
      "legal.accept.lead",
      "legal.accept.liabilityLimits",
      "legal.accept.read",
      "legal.accept.changed",
    ] as const;
    const text = document.body.textContent ?? "";
    for (const key of keys) {
      expect(text).toContain(am[key]);
      if (am[key] !== en[key]) expect(text).not.toContain(en[key]);
    }
  });
});
