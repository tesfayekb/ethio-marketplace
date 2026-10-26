import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useCallback, useState } from "react";
import { expect, it, vi } from "vitest";
import { StepWho } from "./step-who";
import { focusFirstRefusal } from "./field";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: {} }),
}));
vi.mock("@/i18n/entity", () => ({ entityName: () => "scratch" }));
vi.mock("@/components/shell/location-data", () => ({
  readAreaCookie: () => ({ country: "ET" }),
  useOpenMarkets: () => ({ markets: [] }),
}));
const phone = vi.hoisted(() => ({ fails: false }));
const refresh = vi.hoisted(() => ({ calls: 0 }));
vi.mock("./phone-parse", async (original) => ({
  ...(await original<typeof import("./phone-parse")>()),
  loadPhoneLib: async () => {
    if (phone.fails) throw new TypeError("Failed to fetch dynamically imported module");
    return null;
  },
}));
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  refreshPage: () => {
    refresh.calls += 1;
  },
}));
vi.mock("./posting-service", () => ({
  readSellerIdentity: async () => ({
    alias: "e2e_owner",
    sellerType: "person",
    businessName: null,
    firstName: "",
    lastName: "Owner",
    homeCountryCode: "ET",
    homeCountryConfirmed: true,
    contactPrefs: {},
  }),
  readSellerLine: async () => null,
  readCountries: async () => [],
  readLastListingContact: async () => null,
  saveIdentity: async () => ({ ok: true, refusals: [] }),
  suggestAliases: async () => [],
  checkAlias: async () => ({ ok: true, refusals: [] }),
  changeHomeCountry: async () => ({ ok: true, refusals: [] }),
}));

it("D231 the contact step closes Next until every required answer is given", async () => {
  HTMLElement.prototype.scrollIntoView = vi.fn();
  const contactPref = { messages: true };
  function Form() {
    const [missing, setMissing] = useState<string[]>([]);
    const [tried, setTried] = useState(false);
    const report = useCallback((fields: string[]) => setMissing(fields), []);
    const refusals = tried ? missing.map((field) => ({ field, reason: "required" })) : [];
    return (
      <>
        <StepWho
          contactPref={contactPref}
          refusals={refusals}
          onChange={() => {}}
          onMissing={report}
        />
        <button
          data-testid="contact-next"
          data-closed={missing.length > 0 ? "1" : "0"}
          onClick={() => {
            setTried(true);
            focusFirstRefusal(
              missing.map((field) => ({ field, reason: "required" })),
              7,
            );
          }}
        />
      </>
    );
  }
  let view: ReturnType<typeof render> | undefined;
  await act(async () => {
    view = render(<Form />);
  });
  const first = screen.getByTestId("post-who-first");
  await waitFor(() =>
    expect(screen.getByTestId("contact-next")).toHaveAttribute("data-closed", "1"),
  );
  fireEvent.click(screen.getByTestId("contact-next"));
  expect(first).toHaveAttribute("aria-invalid", "true");
  expect(first).toHaveClass("border-destructive");
  expect(first).toHaveFocus();
  fireEvent.change(first, { target: { value: "Abebe" } });
  await waitFor(() =>
    expect(screen.getByTestId("contact-next")).toHaveAttribute("data-closed", "0"),
  );
  expect(first).not.toHaveAttribute("aria-invalid");
  view?.unmount();
});

it("PLF-1 a phone library that cannot download says so in place and offers a refresh, not a retry (INC-911)", async () => {
  phone.fails = true;
  refresh.calls = 0;
  const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
  try {
    let view: ReturnType<typeof render> | undefined;
    await act(async () => {
      view = render(
        <StepWho
          contactPref={{ messages: true }}
          refusals={[]}
          onChange={() => {}}
          onMissing={() => {}}
        />,
      );
    });
    const failed = await screen.findByTestId("post-who-phone-lib-failed");
    expect(failed).toHaveTextContent("post.who.phoneLibFailed");
    const button = screen.getByTestId("post-who-phone-lib-refresh");
    expect(button).toHaveTextContent("common.refreshPage");
    expect(screen.queryByText("post.who.phoneLibRetry")).toBeNull();
    fireEvent.click(button);
    expect(refresh.calls).toBe(1);
    expect(log).toHaveBeenCalledWith(
      expect.stringContaining("[client-error] the phone library failed to load"),
    );
    view?.unmount();
  } finally {
    log.mockRestore();
    phone.fails = false;
  }
});
