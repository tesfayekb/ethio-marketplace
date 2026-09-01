import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { AiBulkBar } from "./ai-bulk-bar";

/**
 * DEC-026 — INC-119 CLASS: a count whose SOURCE failed used to render as a
 * quiet "(0)", which reads to an operator as "there is nothing to do". Only a
 * `success` count may be shown as digits or believed when it is zero; every
 * other state renders pending/error and disables the action.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    // The real catalog interpolates `{count}`; the identity stub keeps the
    // placeholder so the component's own substitution stays observable.
    t: (key: string) => `${key} ({count})`,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

vi.mock("./translations-service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./translations-service")>()),
  listTranslations: vi.fn(),
  listEntityTranslations: vi.fn(),
  aiTranslate: vi.fn(),
  aiTranslateEntities: vi.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const guard: GuardFn = async (action) => {
  await action();
};

describe("AiBulkBar", () => {
  it("renders the digits and no error caption for a success count", () => {
    render(<AiBulkBar lang="am" untranslated={12} guard={guard} countState="success" />, {
      wrapper,
    });

    const start = screen.getByTestId("ai-bulk-start");
    expect(start).toBeEnabled();
    expect(start).toHaveTextContent("12");
    expect(start).toHaveAttribute("data-count-state", "success");
    expect(screen.queryByTestId("ai-bulk-count-error")).toBeNull();
  });

  it("never renders a zero for a pending count", () => {
    render(<AiBulkBar lang="am" untranslated={0} guard={guard} countState="pending" />, {
      wrapper,
    });

    const start = screen.getByTestId("ai-bulk-start");
    expect(start).toBeDisabled();
    expect(start).toHaveTextContent("admin.translations.ai.pending");
    expect(start.textContent ?? "").not.toContain("0");
  });

  for (const countState of ["error", "missing"] as const) {
    it(`never renders a zero for a ${countState} count, and says so`, () => {
      render(<AiBulkBar lang="am" untranslated={0} guard={guard} countState={countState} />, {
        wrapper,
      });

      const start = screen.getByTestId("ai-bulk-start");
      expect(start).toBeDisabled();
      expect(start.textContent ?? "").not.toContain("0");
      expect(screen.getByTestId("ai-bulk-count-error")).toBeVisible();
    });
  }

  it("disables the action on a believed zero without claiming an error", () => {
    render(<AiBulkBar lang="am" untranslated={0} guard={guard} countState="success" />, {
      wrapper,
    });

    expect(screen.getByTestId("ai-bulk-start")).toBeDisabled();
    expect(screen.queryByTestId("ai-bulk-count-error")).toBeNull();
  });
});
