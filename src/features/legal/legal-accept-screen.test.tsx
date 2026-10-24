import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const status = vi.fn();
const accept = vi.fn();
const version = vi.fn();
const navigate = vi.fn();
vi.mock("./legal-reader", async (original) => ({
  ...(await original<typeof import("./legal-reader")>()),
  myLegalStatus: (k: string[]) => status(k),
  acceptLegal: (i: unknown) => accept(i),
  myLegalVersion: (id: string) => version(id),
  legalRefusal: (e: { message?: string }) => (e?.message ?? "").split(":")[0],
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
vi.mock("@/components/shell-context", () => ({ useShell: () => ({ requestSignOut: vi.fn() }) }));
vi.mock("@/i18n", async () => {
  const { en } = await import("@/i18n/locales/en");
  return {
    useI18n: () => ({
      t: (k: string) =>
        k.startsWith("legal.agree.") && k !== "legal.agree.required"
          ? ((en as Record<string, string>)[k] ?? k)
          : k,
      language: "en",
    }),
  };
});
import { LegalAcceptScreen } from "./legal-accept-screen";

const row = (kind: string, id: string, adult = false) => ({
  kind,
  country_code: null,
  version_id: id,
  version: 1,
  label: `${kind} one`,
  material: false,
  effective_at: "2026-10-01T00:00:00Z",
  adult_confirmed: adult,
});
function mount() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <LegalAcceptScreen userId="u1" kinds={["terms", "privacy"]} next="/account" />
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  status.mockReset();
  accept.mockReset();
  version.mockReset();
  navigate.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});
const submit = () => screen.getByTestId("legal-accept-submit");

describe("LegalAcceptScreen", () => {
  it("the first time: one tick with the 18+ statement; sends versions, language, adult true and no consent", async () => {
    status.mockResolvedValue([row("terms", "t1"), row("privacy", "p1")]);
    accept.mockResolvedValue(undefined);
    mount();
    await screen.findAllByTestId("legal-accept-doc");
    expect(screen.getByTestId("agree-to-document")).toBeInTheDocument();
    expect(screen.getAllByTestId("agree-link").map((a) => a.getAttribute("href"))).toEqual([
      "/terms",
      "/privacy",
    ]);
    expect(screen.getByTestId("legal-accept-signout")).toHaveTextContent("legal.accept.decline");
    // Turn 32 (D231): drawn closed, never disabled; a tap refuses and sends nothing.
    expect(submit()).toBeEnabled();
    expect(submit()).toHaveAttribute("data-closed", "1");
    fireEvent.click(submit());
    expect(screen.getByTestId("agree-message")).toHaveTextContent("legal.agree.required");
    expect(screen.getByTestId("legal-accept-tick")).toHaveAttribute("aria-invalid", "true");
    expect(accept).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId("legal-accept-tick"));
    expect(submit()).not.toHaveAttribute("data-closed");
    fireEvent.click(submit());
    await waitFor(() =>
      expect(accept).toHaveBeenCalledWith({
        versionIds: ["t1", "p1"],
        language: "en",
        adult: true,
        dataConsent: false,
      }),
    );
    await waitFor(() => expect(navigate).toHaveBeenCalledWith({ href: "/account", replace: true }));
  });
  it("after the 18+ statement was confirmed once: the new wording, and adult false", async () => {
    status.mockResolvedValue([row("terms", "t1", true)]);
    accept.mockResolvedValue(undefined);
    mount();
    await screen.findByTestId("legal-accept-doc");
    expect(screen.getByTestId("agree-to-document")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("legal-accept-tick"));
    fireEvent.click(submit());
    await waitFor(() =>
      expect(accept).toHaveBeenCalledWith(
        expect.objectContaining({ adult: false, dataConsent: false }),
      ),
    );
  });
  it("keeps the tick while a text is read", async () => {
    status.mockResolvedValue([row("privacy", "p1")]);
    version.mockResolvedValue({
      ...row("privacy", "p1"),
      body_en: "Hello text",
      body_am: "a",
      texts: {},
      settings_snapshot: {},
    });
    mount();
    await screen.findByTestId("legal-accept-doc");
    fireEvent.click(screen.getByTestId("legal-accept-tick"));
    fireEvent.click(screen.getByTestId("legal-accept-read"));
    expect(await screen.findByText("Hello text")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("legal-accept-read"));
    expect(submit()).not.toHaveAttribute("data-closed");
  });
  it("clears the tick and shows the changed sentence on notInForce", async () => {
    status.mockResolvedValue([row("terms", "t1")]);
    accept.mockRejectedValue({ message: "notInForce" });
    mount();
    await screen.findByTestId("legal-accept-doc");
    fireEvent.click(screen.getByTestId("legal-accept-tick"));
    fireEvent.click(submit());
    expect(await screen.findByTestId("legal-accept-error")).toHaveTextContent(
      "legal.accept.changed",
    );
    expect(submit()).toHaveAttribute("data-closed", "1");
    expect(status).toHaveBeenCalledTimes(2);
  });
  it("keeps the tick on any other refusal", async () => {
    status.mockResolvedValue([row("terms", "t1")]);
    accept.mockRejectedValue({ message: "badLanguage" });
    mount();
    await screen.findByTestId("legal-accept-doc");
    fireEvent.click(screen.getByTestId("legal-accept-tick"));
    fireEvent.click(submit());
    expect(await screen.findByTestId("legal-accept-error")).toHaveTextContent("legal.accept.error");
    expect(submit()).not.toHaveAttribute("data-closed");
  });
  it("goes on to next when nothing is listed", async () => {
    status.mockResolvedValue([]);
    mount();
    await waitFor(() => expect(navigate).toHaveBeenCalledWith({ href: "/account", replace: true }));
  });
});
