import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";

const language = vi.hoisted(() => ({ value: "en" as "en" | "am" }));
const myLegalHistory = vi.hoisted(() => vi.fn());
const myLegalVersion = vi.hoisted(() => vi.fn());

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(language.value === "am" ? am : en, key) ?? key,
    language: language.value,
    entities: { map: {}, lang: language.value },
    publicLanguages: [],
  }),
}));
vi.mock("@/components/shell-context", () => ({ useShell: () => ({ user: { id: "member-1" } }) }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("./legal-reader", async (original) => ({
  ...(await original<typeof import("./legal-reader")>()),
  myLegalHistory,
  myLegalVersion,
}));

import { MyLegalPage } from "./my-legal-page";
import { MyLegalVersion } from "./my-legal-version";

const empty = { acceptances: [], notices: [] };
const versionId = "00000000-0000-4000-8000-000000000001";

function draw(component: ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{component}</QueryClientProvider>);
}

beforeEach(() => {
  language.value = "en";
  myLegalHistory.mockReset();
  myLegalVersion.mockReset();
});

describe("UF-1 the member's legal documents", () => {
  it("UFM-19 the legal list draws loading, its failed read, and Retry reads again uf:S13.1", async () => {
    myLegalHistory.mockRejectedValueOnce(readFailed("route 503", 503)).mockResolvedValueOnce(empty);
    draw(<MyLegalPage />);
    expect(screen.getByRole("status")).toHaveTextContent(en["common.loading"]);
    const failure = await screen.findByTestId("my-legal-failed");
    expect(failure).toHaveTextContent(en["myLegal.loadError"]);
    expect(failure).toHaveAttribute("data-failure-class", "server 503");
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(await screen.findByTestId("my-legal-no-acceptances")).toHaveTextContent(
      en["myLegal.noAcceptances"],
    );
    expect(myLegalHistory).toHaveBeenCalledTimes(2);
  });

  it("UFM-20 the legal list's own words are the Amharic catalogue's uf:S13.5", async () => {
    language.value = "am";
    myLegalHistory.mockResolvedValue(empty);
    draw(<MyLegalPage />);
    expect(await screen.findByTestId("my-legal-no-acceptances")).toHaveTextContent(
      am["myLegal.noAcceptances"],
    );
    const keys = [
      "myLegal.title",
      "myLegal.accepted",
      "myLegal.noAcceptances",
      "myLegal.notices",
      "myLegal.noNotices",
    ] as const;
    for (const key of keys) {
      expect(document.body.textContent).toContain(am[key]);
      if (am[key] !== en[key]) expect(document.body.textContent).not.toContain(en[key]);
    }
  });

  it("UFM-21 one version's failed read keeps its class and Retry reads again uf:S14.3", async () => {
    myLegalVersion.mockRejectedValue(readFailed("route 503", 503));
    draw(<MyLegalVersion versionId={versionId} />);
    const failure = await screen.findByTestId("my-legal-version-failed");
    expect(failure).toHaveTextContent(en["myLegal.loadError"]);
    expect(failure).toHaveAttribute("data-failure-class", "server 503");
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    await waitFor(() => expect(myLegalVersion).toHaveBeenCalledTimes(2));
    expect(myLegalVersion).toHaveBeenCalledWith(versionId);
  });

  it("UFM-22 one version's own words are the Amharic catalogue's uf:S14.5", async () => {
    language.value = "am";
    draw(<MyLegalVersion versionId="not-a-version" />);
    expect(screen.getByTestId("my-legal-not-found")).toHaveTextContent(am["myLegal.notFound"]);
    expect(screen.getByRole("link", { name: am["myLegal.back"] })).toHaveAttribute(
      "href",
      "/account/legal",
    );
    for (const key of ["myLegal.notFound", "myLegal.back"] as const) {
      if (am[key] !== en[key]) expect(document.body.textContent).not.toContain(en[key]);
    }
    expect(myLegalVersion).not.toHaveBeenCalled();
  });
});
