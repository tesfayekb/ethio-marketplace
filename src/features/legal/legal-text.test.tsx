import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LegalText } from "./legal-text";

describe("LegalText safety", () => {
  it("renders HTML only as text", () => {
    const { container } = render(
      <LegalText text={"<script>alert(1)</script>\n\n<b>x</b>"} facts={{}} />,
    );
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("b")).toBeNull();
    expect(screen.getByText("<script>alert(1)</script>")).toBeInTheDocument();
    expect(screen.getByText("<b>x</b>")).toBeInTheDocument();
  });
  it("does not turn javascript or data links into links", () => {
    const { container } = render(
      <LegalText text="[bad](javascript:alert) [data](data:text/html,x)" facts={{}} />,
    );
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(container.textContent).toBe("[bad](javascript:alert) [data](data:text/html,x)");
  });
  it("renders tokens safely, including multiline facts", () => {
    render(
      <LegalText
        text="{{legal_email}} {{nope}} {{providers}}"
        facts={{ legal_email: "legal@example.invalid", providers: "First\nSecond" }}
      />,
    );
    expect(screen.getByTestId("legal-unknown-token")).toHaveTextContent("{{nope}}");
    expect(screen.getByTestId("legal-text")).toHaveTextContent(
      "legal@example.invalid {{nope}} First, Second",
    );
  });
  it("uses matching h2 ids and toc targets", () => {
    render(<LegalText text={"## First\n\n## Second"} facts={{}} toc />);
    expect(screen.getByRole("heading", { name: "First" })).toHaveAttribute("id", "s-1");
    expect(screen.getByRole("link", { name: "Second" })).toHaveAttribute("href", "#s-2");
  });
  it("secures external links and keeps same-site links in this tab", () => {
    render(<LegalText text="[External](https://example.invalid) [Local](/terms)" facts={{}} />);
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    expect(screen.getByRole("link", { name: "External" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Local" })).not.toHaveAttribute("target");
  });
});
