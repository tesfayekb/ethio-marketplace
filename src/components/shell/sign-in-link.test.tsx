import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

const at = vi.hoisted(() => ({ href: "/" }));
vi.mock("@tanstack/react-router", () => ({
  useRouterState: ({ select }: { select: (s: { location: { href: string } }) => string }) =>
    select({ location: { href: at.href } }),
  Link: ({
    to,
    search,
    children,
    ...rest
  }: {
    to: string;
    search?: Record<string, string>;
    children: React.ReactNode;
  }) => {
    const query = new URLSearchParams(search ?? {}).toString();
    return (
      <a href={query ? `${to}?${query}` : to} {...rest}>
        {children}
      </a>
    );
  },
}));
import { SignInLink } from "./sign-in-link";

it("SIL-U1 carries the page the person is on as its return", () => {
  at.href = "/my-listings?page=2";
  render(<SignInLink data-testid="s">x</SignInLink>);
  expect(screen.getByTestId("s")).toHaveAttribute(
    "href",
    `/auth?${new URLSearchParams({ return: "/my-listings?page=2" }).toString()}`,
  );
});

it("SIL-U2 carries no return on the sign-in page", () => {
  at.href = "/auth";
  render(<SignInLink data-testid="s">x</SignInLink>);
  expect(screen.getByTestId("s")).toHaveAttribute("href", "/auth");
});
