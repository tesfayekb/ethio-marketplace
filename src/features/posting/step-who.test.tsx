import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useCallback, useState } from "react";
import { beforeEach, expect, it, vi } from "vitest";
import { StepWho } from "./step-who";
import { focusFirstRefusal } from "./field-refusals";
import { readFailed } from "@/lib/reader-failure";

const words = vi.hoisted(() => ({ real: false, amharic: false }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (words.real ? (ownValue(words.amharic ? am : en, key) ?? key) : key),
    language: words.amharic ? "am" : "en",
    entities: {},
  }),
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
const who = vi.hoisted(() => ({
  alias: "e2e_owner" as string | null,
  failure: null as unknown,
  saveReason: null as string | null,
  lastContact: null as Record<string, unknown> | null,
  reads: 0,
  suggest: null as null | (() => Promise<string[]>),
}));
vi.mock("./posting-service", () => ({
  readSellerIdentity: async () => {
    who.reads += 1;
    if (who.failure !== null) throw who.failure;
    return {
      alias: who.alias,
      sellerType: "person",
      businessName: null,
      firstName: "",
      lastName: "Owner",
      homeCountryCode: "ET",
      homeCountryConfirmed: true,
      contactPrefs: {},
    };
  },
  readSellerLine: async () => null,
  readCountries: async () => [],
  readLastListingContact: async () => who.lastContact,
  saveIdentity: async () =>
    who.saveReason === null
      ? { ok: true, refusals: [] }
      : { ok: false, refusals: [{ field: "seller_type", reason: who.saveReason }] },
  suggestAliases: () => (who.suggest === null ? Promise.resolve([]) : who.suggest()),
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

it("SWO-1 a refused home country still reaches its select through NativeSelect: aria-invalid, the form kit's red border, the step's message (turn S6-2)", async () => {
  let view: ReturnType<typeof render> | undefined;
  await act(async () => {
    view = render(
      <StepWho
        contactPref={{ messages: true }}
        refusals={[{ field: "home_country_code", reason: "required" }]}
        onChange={() => {}}
        onMissing={() => {}}
      />,
    );
  });
  const country = screen.getByTestId("post-who-country");
  await waitFor(() => expect(country).toBeDisabled());
  expect(country.tagName).toBe("SELECT");
  expect(country).toHaveAttribute("aria-invalid", "true");
  for (const cls of ["min-h-11", "bg-background", "border-destructive", "ring-destructive"])
    expect(country).toHaveClass(cls);
  for (const cls of ["shadow-xs", "bg-card", "disabled:opacity-50"])
    expect(country).not.toHaveClass(cls);
  expect(screen.getByTestId("post-who-country-refusal")).toHaveTextContent("post.refusal.required");
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

it("SWO-2 a failed ask for free names draws the failure notice with Retry, never no names (INC-1305)", async () => {
  who.alias = null;
  const asks: string[] = [];
  who.suggest = async () => {
    asks.push("ask");
    if (asks.length === 1) throw readFailed(new TypeError("Failed to fetch"));
    return ["abebe_k"];
  };
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
    const failed = await screen.findByTestId("post-who-alias-suggestions-failed");
    expect(failed).toHaveTextContent("post.who.aliasSuggestions");
    expect(screen.queryByTestId("post-who-alias-suggestions")).toBeNull();
    fireEvent.click(screen.getByTestId("post-who-alias-suggestions-failed-retry"));
    expect(await screen.findByTestId("post-who-alias-suggestion")).toHaveAttribute(
      "data-name",
      "abebe_k",
    );
    expect(screen.queryByTestId("post-who-alias-suggestions-failed")).toBeNull();
    expect(asks).toHaveLength(2);
    view?.unmount();
  } finally {
    who.alias = "e2e_owner";
    who.suggest = null;
  }
});

beforeEach(() => {
  words.real = false;
  words.amharic = false;
  who.failure = null;
  who.saveReason = null;
  who.lastContact = null;
  who.reads = 0;
});
it("UFW-33 a failed identity read says so and Retry reads it again uf:S7s7.1", async () => {
  words.real = true;
  who.failure = readFailed(new TypeError("Failed to fetch"));
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    render(<StepWho contactPref={{ messages: true }} refusals={[]} onChange={vi.fn()} />);
    const notice = await screen.findByTestId("post-who-read-failed");
    expect(notice).toHaveTextContent(en["post.who.readFailed"]);
    const retry = await screen.findByRole("button", { name: en["common.retry"] });
    expect(notice).toHaveAttribute("data-failure-reason", "network");
    who.failure = null;
    fireEvent.click(retry);
    expect(await screen.findByTestId("post-who-saved-alias")).toHaveTextContent("e2e_owner");
    expect(who.reads).toBe(2);
  } finally {
    log.mockRestore();
  }
});
it("UFW-34 person and business choices show a refused type in words uf:S7s7.3", async () => {
  words.real = true;
  who.saveReason = "badValue";
  render(<StepWho contactPref={{ messages: true }} refusals={[]} onChange={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: en["post.who.edit"] }));
  expect(screen.getByRole("radio", { name: en["post.who.typePerson"] })).toBeChecked();
  fireEvent.click(screen.getByRole("radio", { name: en["post.who.typeBusiness"] }));
  expect(await screen.findByTestId("post-who-type-refusal")).toHaveTextContent(
    en["post.refusal.badValue"],
  );
  expect(screen.getByRole("radio", { name: en["post.who.typeBusiness"] })).toBeChecked();
});
it("UFW-35 the alias shows checking then available for the checked answer uf:S7s7.6", async () => {
  words.real = true;
  render(<StepWho contactPref={{ messages: true }} refusals={[]} onChange={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: en["post.who.edit"] }));
  fireEvent.change(
    screen.getByRole("textbox", { name: (name) => name.startsWith(en["post.who.aliasLabel"]) }),
    { target: { value: "abebe_owner" } },
  );
  expect(screen.getByTestId("post-who-alias-checking")).toHaveTextContent(
    en["post.who.aliasChecking"],
  );
  expect(await screen.findByTestId("post-who-alias-ok")).toHaveTextContent(
    en["post.who.aliasAvailable"],
  );
});
it("UFW-36 a first alias shows the first-change rule uf:S7s7.7", async () => {
  words.real = true;
  who.alias = null;
  try {
    render(<StepWho contactPref={{ messages: true }} refusals={[]} onChange={vi.fn()} />);
    expect(await screen.findByTestId("post-who-alias-change-rule")).toHaveTextContent(
      en["post.who.aliasChangeFirst"],
    );
  } finally {
    who.alias = "e2e_owner";
  }
});
it("UFW-37 a failed phone download offers Refresh page uf:S7s7.10", async () => {
  words.real = true;
  phone.fails = true;
  refresh.calls = 0;
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    render(<StepWho contactPref={{ messages: true }} refusals={[]} onChange={vi.fn()} />);
    expect(await screen.findByTestId("post-who-phone-lib-failed")).toHaveTextContent(
      en["post.who.phoneLibFailed"],
    );
    fireEvent.click(screen.getByRole("button", { name: en["common.refreshPage"] }));
    expect(refresh.calls).toBe(1);
  } finally {
    phone.fails = false;
    log.mockRestore();
  }
});
it("UFW-38 carried contact is named on the contact screen uf:S7s7.11", async () => {
  words.real = true;
  who.lastContact = { messages: true, telegram: { show: true, value: "abebe_owner" } };
  const change = vi.fn();
  render(<StepWho contactPref={{ messages: true }} refusals={[]} onChange={change} />);
  expect(await screen.findByText(en["post.who.contactFromLastPost"])).toBeVisible();
  expect(change).toHaveBeenCalledWith(
    { messages: true, telegram: { show: true, value: "abebe_owner" } },
    true,
  );
});
it("UFW-39 a messages refusal has its catalogue words uf:S7s7.12", async () => {
  words.real = true;
  await act(async () => {
    render(
      <StepWho
        contactPref={{ messages: false }}
        refusals={[{ field: "messages", reason: "messagesRequired" }]}
        onChange={vi.fn()}
      />,
    );
  });
  expect(screen.getByTestId("post-who-messages-refusal")).toHaveTextContent(
    en["post.refusal.messagesRequired"],
  );
});
it("UFW-40 the contact screen uses the Amharic catalogue uf:S7s7.13", async () => {
  words.real = true;
  words.amharic = true;
  render(<StepWho contactPref={{ messages: true }} refusals={[]} onChange={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: am["post.who.edit"] }));
  expect(screen.getByRole("radio", { name: am["post.who.typePerson"] })).toBeVisible();
  expect(screen.getByRole("radio", { name: am["post.who.typeBusiness"] })).toBeVisible();
  if (am["post.who.typeLabel"] !== en["post.who.typeLabel"])
    expect(screen.queryByText(en["post.who.typeLabel"])).not.toBeInTheDocument();
});
