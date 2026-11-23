import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, it, vi } from "vitest";
import { ImpersonationStarter } from "./impersonation-starter";

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
vi.mock("./use-impersonation", () => ({
  useBeginImpersonation: () => ({ isPending: false, mutateAsync: vi.fn() }),
}));

it("the impersonation alert stays beside its reason in the panel body, not in its actions", () => {
  render(
    <ImpersonationStarter
      userId="scratch-user"
      guard={async (run) => run()}
      renderPanel={(body: ReactNode, footer: ReactNode) => (
        <div>
          <div data-testid="starter-body">{body}</div>
          <div data-testid="starter-footer">{footer}</div>
        </div>
      )}
    />,
  );
  fireEvent.change(screen.getByTestId("impersonation-reason"), { target: { value: "abc" } });
  fireEvent.click(screen.getByTestId("impersonation-begin"));
  const alert = screen.getByTestId("impersonation-error");
  expect(alert).toHaveTextContent("impersonation.reasonTooShort");
  expect(screen.getByTestId("starter-body")).toContainElement(alert);
  expect(screen.getByTestId("starter-footer")).not.toContainElement(alert);
  expect(screen.getByTestId("impersonation-reason")).toHaveAttribute(
    "aria-describedby",
    "impersonation-error",
  );
});
