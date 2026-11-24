import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
const refresh = vi.hoisted(() => ({ refreshPage: vi.fn() }));
vi.mock("@/lib/on-demand-failure", () => refresh);
vi.mock("@tanstack/react-router", () => ({
  useRouterState: ({ select }: { select: (s: { location: { href: string } }) => string }) =>
    select({ location: { href: `${window.location.pathname}${window.location.search}` } }),
  Link: ({
    to,
    search,
    children,
    ...rest
  }: {
    to: string;
    search?: Record<string, string>;
    children: React.ReactNode;
  }) => (
    <a href={search ? `${to}?${new URLSearchParams(search).toString()}` : to} {...rest}>
      {children}
    </a>
  ),
}));
import { FailureNotice } from "./failure-notice";
import { goneReading, rateReading } from "./failure-reason";

afterEach(() => vi.useRealTimers());

const network = new TypeError("Failed to fetch");
const server = Object.assign(new Error("boom"), { status: 500 });
const gone = Object.assign(new Error("listingNotAvailable"), { code: "P0D01", status: 400 });
const denied = Object.assign(new Error("permissionDenied"), { code: "P0D01", status: 403 });
const ended = Object.assign(new Error("JWT expired"), { status: 401 });

it("FN-U1 network: its words and Retry", () => {
  render(<FailureNotice error={network} testid="f" onRetry={() => {}} />);
  expect(screen.getByTestId("f")).toHaveTextContent("failure.network");
  expect(screen.getByTestId("f")).toHaveAttribute("role", "alert");
  expect(screen.getByTestId("f-retry")).toHaveTextContent("common.retry");
});

it("FN-U2 Retry calls the caller's refetch", () => {
  const onRetry = vi.fn();
  render(<FailureNotice error={server} testid="f" onRetry={onRetry} />);
  expect(screen.getByTestId("f")).toHaveTextContent("failure.server");
  fireEvent.click(screen.getByTestId("f-retry"));
  expect(onRetry).toHaveBeenCalledTimes(1);
});

it("FN-U3 gone and no access offer no Retry", () => {
  const { unmount } = render(<FailureNotice error={gone} testid="f" onRetry={() => {}} />);
  expect(screen.getByTestId("f")).toHaveTextContent("failure.gone");
  expect(screen.queryByTestId("f-retry")).toBeNull();
  expect(screen.getByTestId("f-exit")).toHaveAttribute("href", "/");
  unmount();
  render(<FailureNotice error={denied} testid="g" onRetry={() => {}} />);
  expect(screen.getByTestId("g")).toHaveTextContent("failure.noAccess");
  expect(screen.queryByTestId("g-retry")).toBeNull();
  expect(screen.getByTestId("g-back")).toHaveTextContent("failure.goBack");
});

it("FN-U4 Retry waits for the rate gate's reset time", () => {
  vi.useFakeTimers();
  const until = new Date(Date.now() + 60_000).toISOString();
  render(<FailureNotice reading={rateReading(until)} testid="f" onRetry={() => {}} />);
  expect(screen.getByTestId("f-retry")).toBeDisabled();
  act(() => vi.advanceTimersByTime(61_000));
  expect(screen.getByTestId("f-retry")).not.toBeDisabled();
});

it("FN-U4b a rate refusal with no time says 'in a little while' and Retry is enabled", () => {
  render(<FailureNotice reading={rateReading(undefined)} testid="f" onRetry={() => {}} />);
  expect(screen.getByTestId("f")).toHaveTextContent("failure.rateLimitedSoon");
  expect(screen.getByTestId("f-retry")).not.toBeDisabled();
});

it("FN-U5 an unreadable error draws the server words and Retry", () => {
  render(
    <FailureNotice
      error={{
        get message(): string {
          throw new Error("x");
        },
      }}
      testid="f"
      onRetry={() => {}}
    />,
  );
  expect(screen.getByTestId("f")).toHaveTextContent("failure.server");
  expect(screen.getByTestId("f-retry")).toBeInTheDocument();
});

it("FN-U6 the class and status never reach the words", () => {
  render(<FailureNotice error={server} testid="f" onRetry={() => {}} />);
  const box = screen.getByTestId("f");
  expect(box.textContent ?? "").not.toMatch(/\bserver \d|500/);
  expect(box).toHaveAttribute("data-failure-class", "server 500");
});

it("FN-U7 an ended sign-in links to sign in with the current path", () => {
  window.history.pushState({}, "", "/my-listings?x=1");
  render(<FailureNotice error={ended} testid="f" onRetry={() => {}} />);
  expect(screen.getByTestId("f")).toHaveTextContent("session.expired");
  expect(screen.getByTestId("f-sign-in")).toHaveAttribute(
    "href",
    "/auth?return=%2Fmy-listings%3Fx%3D1",
  );
  expect(screen.queryByTestId("f-retry")).toBeNull();
});

it("FN-U8 changed: its words and Reload, which calls the caller's refetch", () => {
  const onRetry = vi.fn();
  render(
    <FailureNotice
      error={Object.assign(new Error("x"), { status: 409 })}
      testid="f"
      onRetry={onRetry}
    />,
  );
  expect(screen.getByTestId("f")).toHaveTextContent("failure.changed");
  expect(screen.queryByTestId("f-retry")).toBeNull();
  fireEvent.click(screen.getByTestId("f-reload"));
  expect(onRetry).toHaveBeenCalledTimes(1);
});

it("FN-U9 step-up: its words and Reload, which reloads the page so its gate asks", () => {
  const onRetry = vi.fn();
  render(
    <FailureNotice
      error={Object.assign(new Error("x"), { status: 428 })}
      testid="f"
      onRetry={onRetry}
    />,
  );
  expect(screen.getByTestId("f")).toHaveTextContent("failure.stepUp");
  expect(screen.queryByTestId("f-retry")).toBeNull();
  fireEvent.click(screen.getByTestId("f-reload"));
  expect(refresh.refreshPage).toHaveBeenCalledTimes(1);
  expect(onRetry).not.toHaveBeenCalled();
});

it("FN-U10 a read that answered none: gone words and the way out, no Retry", () => {
  render(<FailureNotice reading={goneReading()} testid="f" onRetry={() => {}} />);
  expect(screen.getByTestId("f")).toHaveTextContent("failure.gone");
  expect(screen.getByTestId("f-exit")).toHaveAttribute("href", "/");
  expect(screen.queryByTestId("f-retry")).toBeNull();
});
