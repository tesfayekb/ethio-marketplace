import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { ApproveAllBar } from "./approve-bar";

/**
 * DEC-026 — INC-095l CLASS: "an empty state is a caption BESIDE the controls,
 * never a replacement for them" (law C4). The expensive way to learn this was
 * an e2e run where the zero-count surface rendered a caption and dropped the
 * button, so every downstream locator missed. One render proves it here.
 *
 * Seams: `@/i18n` (identity `t`, so assertions read keys and no catalog is
 * loaded) and the service boundary `./translations-service` — the hooks are
 * real, but nothing they could call reaches Supabase.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

vi.mock("./translations-service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./translations-service")>()),
  approveAllTranslations: vi.fn(),
  approveAllEntityTranslations: vi.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const guard: GuardFn = async (action) => {
  await action();
};

describe("ApproveAllBar", () => {
  it("renders the control AND the zero caption together when nothing is reviewable", () => {
    render(<ApproveAllBar lang="am" reviewable={0} guard={guard} />, { wrapper });

    const start = screen.getByTestId("approve-all-start");
    expect(start).toBeVisible();
    expect(start).toBeDisabled();
    // The caption is BESIDE the control, not instead of it (C4 / INC-095l).
    expect(screen.getByTestId("approve-all-none")).toBeVisible();
  });

  it("renders an enabled control with the count and no zero caption", () => {
    render(<ApproveAllBar lang="am" reviewable={7} guard={guard} />, { wrapper });

    const start = screen.getByTestId("approve-all-start");
    expect(start).toBeEnabled();
    expect(start).toHaveTextContent("7");
    expect(screen.queryByTestId("approve-all-none")).toBeNull();
  });

  it("keeps the entity scope on its own testids so the twins never collide", () => {
    render(<ApproveAllBar lang="am" reviewable={0} guard={guard} scope="entity" />, { wrapper });

    expect(screen.getByTestId("entity-approve-all-start")).toBeVisible();
    expect(screen.getByTestId("entity-approve-all-none")).toBeVisible();
    expect(screen.queryByTestId("approve-all-start")).toBeNull();
  });
});
