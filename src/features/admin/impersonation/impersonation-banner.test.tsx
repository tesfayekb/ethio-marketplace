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
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a href="/">{children}</a>,
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./use-impersonation", () => ({
  useActiveImpersonation: () => ({
    data: { id: "s1", targetId: "u1", targetName: "Abebe", expiresAt: "2099-01-01T00:00:00Z" },
  }),
  useCountdown: () => "10:00",
  useEndImpersonation: () => ({ ...hooks.end, mutate: hooks.mutate }),
}));

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
