import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { IconButton, type IconButtonTone } from "./icon-button";

/** BUNDLE 9 B1 — the icon button is named, has no title, forwards its ref. */
describe("IconButton", () => {
  it("is named by its label and carries no title", () => {
    render(<IconButton label="Edit" icon={<svg />} />);
    const button = screen.getByRole("button", { name: "Edit" });
    expect(button).not.toHaveAttribute("title");
    expect(button).toHaveAttribute("type", "button");
  });

  it("forwards its ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} label="Edit" icon={<svg />} />);
    expect(ref.current).toBe(screen.getByRole("button", { name: "Edit" }));
  });

  it.each([
    ["neutral", "text-muted-foreground"],
    ["danger", "text-destructive"],
    ["success", "text-success"],
    ["warning", "text-warning"],
    ["info", "text-info"],
  ] as Array<[IconButtonTone, string]>)("tone %s carries %s", (tone, cls) => {
    render(<IconButton label={tone} tone={tone} icon={<svg />} />);
    expect(screen.getByRole("button", { name: tone })).toHaveClass(cls);
  });
});
