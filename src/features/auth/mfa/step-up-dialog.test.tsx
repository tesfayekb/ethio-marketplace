import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

/**
 * DEC-339 wave 2 — THE STEP-UP CODE SITS IN THE ONE FIELD. The dialog's code control is a `Field`,
 * so a refusal is read by the two-factor family's words, drawn under the control in the person's
 * language, and the control is marked `aria-invalid` and names the refusal by `aria-describedby`
 * (WCAG 2.2 3.3.1). The dialog primitive is replaced by plain boxes: this test judges the
 * dialog's own content, not the overlay's download.
 */
vi.mock("@/components/ui/dialog", () => {
  const Box = ({ children }: { children?: ReactNode }) => <div>{children}</div>;
  return {
    Dialog: Box,
    DialogContent: Box,
    DialogDescription: ({
      children,
      role,
      "data-testid": testid,
    }: {
      children?: ReactNode;
      role?: string;
      "data-testid"?: string;
    }) => (
      <div role={role} data-testid={testid}>
        {children}
      </div>
    ),
    DialogTitle: Box,
  };
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, "data-testid": testid }: { children: ReactNode; "data-testid"?: string }) => (
    <a href="/settings" data-testid={testid}>
      {children}
    </a>
  ),
}));

const { StepUpDialog } = await import("./step-up-dialog");

function draw(
  refusal: { field: string; reason: string } | null,
  mode: "code" | "no-factor" | "read-failed" = "code",
  retry: () => Promise<void> = () => Promise.resolve(),
) {
  render(
    <StepUpDialog
      mode={mode}
      busy={false}
      refusal={refusal}
      submitCode={() => Promise.resolve(false)}
      retry={retry}
      close={() => undefined}
      unavailable={() => undefined}
    />,
  );
}

describe("the step-up dialog's code field (INC-1147 class 1)", () => {
  it("SUD-1 with no refusal the control is plain: no line, not invalid, required", () => {
    draw(null);
    const control = screen.getByTestId("step-up-code");
    expect(control.id).toBe("step-up-code");
    expect(control.getAttribute("aria-invalid")).toBeNull();
    expect(control.getAttribute("aria-required")).toBe("true");
    expect(screen.queryByTestId("step-up-error")).toBeNull();
  });

  it("SUD-2 a refusal is drawn under the control by the family's words, and the control names it", () => {
    draw({ field: "code", reason: "mfa_verification_failed" });
    const line = screen.getByTestId("step-up-error");
    expect(line.textContent).toBe("mfa.errorInvalidCode");
    expect(line.getAttribute("role")).toBe("alert");
    const control = screen.getByTestId("step-up-code");
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(control.getAttribute("aria-describedby")).toBe(line.id);
    // A refusal the family does not name reads its generic line, never the provider's text.
    document.body.innerHTML = "";
    draw({ field: "code", reason: "unknown" });
    expect(screen.getByTestId("step-up-error").textContent).toBe("mfa.errorGeneric");
  });
});

describe("the step-up dialog's modes (cursor-bundle-7a, INC-1299)", () => {
  it("SUD-3 a failed factor read says it failed with a Retry, never 'set up an authenticator'", () => {
    const retry = vi.fn(() => Promise.resolve());
    draw(null, "read-failed", retry);
    const line = screen.getByTestId("step-up-read-failed");
    expect(line.textContent).toBe("mfa.errorGeneric");
    expect(line.getAttribute("role")).toBe("alert");
    expect(screen.queryByTestId("step-up-no-factor")).toBeNull();
    expect(screen.queryByTestId("step-up-settings-link")).toBeNull();
    expect(screen.queryByTestId("step-up-code")).toBeNull();
    expect(document.body.textContent).not.toContain("mfa.stepUpNoFactorTitle");
    fireEvent.click(screen.getByTestId("step-up-retry"));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("SUD-4 a factor that is gone keeps the set-up explanation and its link, with no Retry", () => {
    draw(null, "no-factor");
    expect(screen.getByTestId("step-up-no-factor").textContent).toBe("mfa.stepUpNoFactorBody");
    expect(screen.getByTestId("step-up-settings-link")).toBeTruthy();
    expect(screen.queryByTestId("step-up-retry")).toBeNull();
    expect(screen.queryByTestId("step-up-read-failed")).toBeNull();
  });
});
