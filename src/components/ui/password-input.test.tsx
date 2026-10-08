import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { PasswordInput } from "./password-input";

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key }) }));

describe("PasswordInput", () => {
  it("preserves the input contract and toggles visibility without submitting", () => {
    const ref = createRef<HTMLInputElement>();
    const submit = vi.fn((event) => event.preventDefault());
    render(
      <form onSubmit={submit}>
        <PasswordInput ref={ref} id="secret" name="password" autoComplete="current-password" defaultValue="secret-value" className="w-full" />
        <button type="submit">Submit</button>
      </form>,
    );
    expect(ref.current).toHaveAttribute("id", "secret");
    expect(ref.current).toHaveAttribute("name", "password");
    expect(ref.current).toHaveAttribute("autocomplete", "current-password");
    expect(ref.current).toHaveAttribute("type", "password");
    expect(ref.current).toHaveClass("w-full", "pe-11");
    const toggle = screen.getByRole("button", { name: "auth.showPassword" });
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(toggle);
    expect(ref.current).toHaveAttribute("type", "text");
    expect(ref.current).toHaveValue("secret-value");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAccessibleName("auth.hidePassword");
    fireEvent.click(toggle);
    expect(ref.current).toHaveAttribute("type", "password");
    expect(submit).not.toHaveBeenCalled();
  });

  it("passes disabled through to both the input and its toggle", () => {
    const ref = createRef<HTMLInputElement>();
    render(<PasswordInput ref={ref} disabled />);
    expect(ref.current).toBeDisabled();
    expect(screen.getByTestId("password-toggle")).toBeDisabled();
  });
});