import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
import { StatCard } from "./stat-card";

it("SC-U1 a failed tile keeps its label and draws no number", () => {
  render(<StatCard testid="t" label="Keys" value={0} failed />);
  const tile = screen.getByTestId("t-failed");
  expect(tile).toHaveTextContent("Keys");
  expect(tile).toHaveTextContent("prim.stat.failed");
  expect(tile.textContent ?? "").not.toMatch(/\d/);
  expect(screen.queryByTestId("t")).toBeNull();
  expect(screen.queryByTestId("t-retry")).toBeNull();
});

it("SC-U2 a failed tile's Retry calls the caller's retry", () => {
  const onRetry = vi.fn();
  render(<StatCard testid="t" label="Keys" value={0} failed onRetry={onRetry} />);
  fireEvent.click(screen.getByTestId("t-retry"));
  expect(onRetry).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId("t-retry")).toHaveTextContent("common.retry");
});

it("SC-U3 loading comes before failed, and an answered tile draws its value", () => {
  const { rerender } = render(<StatCard testid="t" label="Keys" value={42} loading failed />);
  expect(screen.getByTestId("t-loading")).toBeInTheDocument();
  expect(screen.queryByTestId("t-failed")).toBeNull();
  rerender(<StatCard testid="t" label="Keys" value={42} />);
  expect(screen.getByTestId("t")).toHaveTextContent("42");
});
