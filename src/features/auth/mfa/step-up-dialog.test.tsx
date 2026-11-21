import { render, screen } from "@testing-library/react";
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
    DialogDescription: Box,
    DialogFooter: Box,
    DialogHeader: Box,
    DialogTitle: Box,
  };
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a href="/settings">{children}</a>,
}));

const { StepUpDialog } = await import("./step-up-dialog");

function draw(refusal: { field: string; reason: string } | null) {
  render(
    <StepUpDialog
      mode="code"
      busy={false}
      refusal={refusal}
      submitCode={() => Promise.resolve(false)}
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
