import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const status = vi.fn();
const accept = vi.fn();
const version = vi.fn();
const navigate = vi.fn();
vi.mock("./legal-reader", () => ({
  myLegalStatus: (k: string[]) => status(k),
  acceptLegal: (i: unknown) => accept(i),
  myLegalVersion: (id: string) => version(id),
  legalRefusal: (e: { message?: string }) => (e?.message ?? "").split(":")[0],
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
vi.mock("@/components/shell-context", () => ({ useShell: () => ({ requestSignOut: vi.fn() }) }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (k: string) => k, language: "en" }) }));
import { LegalAcceptScreen } from "./legal-accept-screen";

const row = (kind: string, id: string) => ({
  kind,
  country_code: null,
  version_id: id,
  version: 1,
  label: `${kind} one`,
  material: false,
  effective_at: "2026-10-01T00:00:00Z",
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
  it("needs both ticks with a privacy document, and sends versions, language, adult and consent", async () => {
    status.mockResolvedValue([row("terms", "t1"), row("privacy", "p1")]);
    accept.mockResolvedValue(undefined);
    mount();
    await screen.findAllByTestId("legal-accept-doc");
    expect(screen.getByText("legal.accept.tick1.both")).toBeInTheDocument();
    expect(submit()).toBeDisabled();
    fireEvent.click(screen.getByTestId("legal-accept-adult"));
    expect(submit()).toBeDisabled();
    fireEvent.click(screen.getByTestId("legal-accept-consent"));
    expect(submit()).toBeEnabled();
    fireEvent.click(submit());
    await waitFor(() =>
      expect(accept).toHaveBeenCalledWith({
        versionIds: ["t1", "p1"],
        language: "en",
        adult: true,
        dataConsent: true,
      }),
    );
    await waitFor(() => expect(navigate).toHaveBeenCalledWith({ href: "/account", replace: true }));
  });
  it("shows no second tick without a privacy document and sends consent false", async () => {
    status.mockResolvedValue([row("terms", "t1")]);
    accept.mockResolvedValue(undefined);
    mount();
    await screen.findByTestId("legal-accept-doc");
    expect(screen.queryByTestId("legal-accept-consent")).toBeNull();
    expect(screen.getByText("legal.accept.tick1.terms")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("legal-accept-adult"));
    fireEvent.click(submit());
    await waitFor(() =>
      expect(accept).toHaveBeenCalledWith(expect.objectContaining({ dataConsent: false })),
    );
  });
  it("keeps the ticks while a text is read", async () => {
    status.mockResolvedValue([row("privacy", "p1")]);
    version.mockResolvedValue({
      ...row("privacy", "p1"),
      body_en: "Hello text",
      body_am: "a",
      settings_snapshot: {},
    });
    mount();
    await screen.findByTestId("legal-accept-doc");
    fireEvent.click(screen.getByTestId("legal-accept-adult"));
    fireEvent.click(screen.getByTestId("legal-accept-consent"));
    fireEvent.click(screen.getByTestId("legal-accept-read"));
    expect(await screen.findByText("Hello text")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("legal-accept-read"));
    expect(submit()).toBeEnabled();
  });
  it("clears the ticks and shows the changed sentence on notInForce", async () => {
    status.mockResolvedValue([row("terms", "t1")]);
    accept.mockRejectedValue({ message: "notInForce" });
    mount();
    await screen.findByTestId("legal-accept-doc");
    fireEvent.click(screen.getByTestId("legal-accept-adult"));
    fireEvent.click(submit());
    expect(await screen.findByTestId("legal-accept-error")).toHaveTextContent(
      "legal.accept.changed",
    );
    expect(submit()).toBeDisabled();
    expect(status).toHaveBeenCalledTimes(2);
  });
  it("keeps the ticks on any other refusal", async () => {
    status.mockResolvedValue([row("terms", "t1")]);
    accept.mockRejectedValue({ message: "badLanguage" });
    mount();
    await screen.findByTestId("legal-accept-doc");
    fireEvent.click(screen.getByTestId("legal-accept-adult"));
    fireEvent.click(submit());
    expect(await screen.findByTestId("legal-accept-error")).toHaveTextContent("legal.accept.error");
    expect(submit()).toBeEnabled();
  });
  it("goes on to next when nothing is listed", async () => {
    status.mockResolvedValue([]);
    mount();
    await waitFor(() => expect(navigate).toHaveBeenCalledWith({ href: "/account", replace: true }));
  });
});
