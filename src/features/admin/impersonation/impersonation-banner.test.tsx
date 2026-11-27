import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, it, vi } from "vitest";

const hooks = vi.hoisted(() => ({
  end: {
    isError: true,
    isPending: false,
    error: { code: "P0001", message: "noActiveSession" } as unknown,
  },
  mutate: vi.fn(),
  session: {
    id: "s1",
    targetId: "u1",
    targetName: "Abebe",
    expiresAt: "2099-01-01T00:00:00Z",
  } as unknown,
  report: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: hooks.report }));
vi.mock("./use-impersonation", () => ({
  useActiveImpersonation: () => ({ data: hooks.session }),
  useCountdown: (at: string | undefined) => (at === undefined ? null : "10:00"),
  useEndImpersonation: () => ({ ...hooks.end, mutate: hooks.mutate }),
}));

import { loadFailureReader } from "@/components/shell/failure-reason";

import { ImpersonationBanner } from "./impersonation-banner";

it("IMBN-1 a failed End now on the bar says why in the door's words; a code the end has no words for reads its generic", async () => {
  const { rerender } = render(<ImpersonationBanner />);
  expect(await screen.findByText("impersonation.noneActive")).toHaveAttribute(
    "data-testid",
    "impersonation-banner-end-error",
  );
  hooks.end = { ...hooks.end, error: { code: "P0001", message: "sessionActive" } };
  rerender(<ImpersonationBanner />);
  expect(screen.getByTestId("impersonation-banner-end-error")).toHaveTextContent(
    "impersonation.error.endFailed",
  );
});

it("IMBN-2 a network failure of End now offers Retry, which ends the same session again", () => {
  hooks.end = { ...hooks.end, error: new TypeError("Failed to fetch") };
  render(<ImpersonationBanner />);
  expect(screen.getByTestId("impersonation-banner-end-error")).toHaveTextContent("failure.network");
  fireEvent.click(screen.getByTestId("impersonation-banner-end-error-retry"));
  expect(hooks.mutate).toHaveBeenCalledWith("s1");
});

it("IMBN-3 the bar, mounted with no session and no failure, sends no error report (INC-1319)", async () => {
  await loadFailureReader();
  hooks.report.mockClear();
  hooks.session = undefined;
  hooks.end = { isError: false, isPending: false, error: null };
  const { container, rerender } = render(<ImpersonationBanner />);
  rerender(<ImpersonationBanner />);
  expect(container).toBeEmptyDOMElement();
  expect(hooks.report).not.toHaveBeenCalled();
});
